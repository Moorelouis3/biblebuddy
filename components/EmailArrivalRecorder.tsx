"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/**
 * Counts a visit that came from an email link. Renders nothing.
 *
 * Replaces the SES click number, which was turned off on 2026-11-09 because
 * the only way SES could count a click was to rewrite every link through
 * awstrack.me - and that is what stopped email links opening the app. SES
 * counted the leaving; this counts the arriving, which is the better of the
 * two: a mail scanner fetches a link without running JavaScript, so it never
 * reaches this code, and the Capacitor shell loads these same pages, so an
 * arrival inside the app counts exactly like one in a browser.
 *
 * See docs/DEEP_LINKS.md.
 *
 * ONE REQUEST PER ARRIVAL. No polling, no retry, no interval. Three database
 * outages in October 2026 came from an eight-second poll in AppShell, and a
 * statistic is never worth another one.
 */

/** Already recorded this page load, for when sessionStorage is unavailable. */
const recordedInMemory = new Set<string>();

function alreadyRecorded(key: string): boolean {
  if (recordedInMemory.has(key)) return true;
  try {
    return window.sessionStorage.getItem(key) === "1";
  } catch {
    // Some in-app browsers throw on touching storage at all. A duplicate is
    // harmless here - reports count distinct sessions per campaign.
    return false;
  }
}

function markRecorded(key: string) {
  recordedInMemory.add(key);
  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    // Held in memory for this page load instead.
  }
}

/** A stable id per browser, so a reload is not counted as a second person. */
function arrivalSessionId(): string | null {
  const key = "bb:arrival-session-id";
  try {
    const existing = window.localStorage.getItem(key);
    if (existing) return existing;
    const next =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    window.localStorage.setItem(key, next);
    return next;
  } catch {
    return null;
  }
}

export default function EmailArrivalRecorder() {
  // Not useSearchParams: that forces every page under this layout into a
  // Suspense boundary to stay statically renderable. The pathname changing is
  // enough to re-run this, and the query string is read from the address bar
  // at that moment - which is also what survives the landing page's
  // router.replace("/dashboard") for a signed-in reader.
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let params: URLSearchParams;
    try {
      params = new URLSearchParams(window.location.search);
    } catch {
      return;
    }

    // Only arrivals from email. Everything else is somebody else's statistic.
    if ((params.get("utm_source") || "").toLowerCase() !== "email") return;

    const campaign = (params.get("utm_campaign") || "").trim().slice(0, 100) || null;
    const path = window.location.pathname || "/";
    const key = `bb:arrival:${campaign || "none"}:${path}`;
    if (alreadyRecorded(key)) return;

    // Marked before the request, not after. A failed write loses one number;
    // marking afterwards would re-send on every re-render while the request
    // is in flight.
    markRecorded(key);

    void (async () => {
      // Signed in or not, the arrival counts. The token only decides whether
      // it can be attributed to a person, and it is read from the session
      // rather than from anything in the link.
      let token: string | null = null;
      try {
        const { data } = await supabase.auth.getSession();
        token = data.session?.access_token || null;
      } catch {
        // Anonymous arrival.
      }

      // Absolute URL on purpose: under CapacitorHttp a relative-url fetch can
      // hang forever, which is why lib/nativePush.ts does the same.
      await fetch(`${window.location.origin}/api/email/arrival`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          campaign_id: campaign,
          page_path: path,
          session_id: arrivalSessionId(),
        }),
        // The landing page sends a signed-in reader straight to /dashboard, so
        // this request has to outlive the navigation that follows it.
        keepalive: true,
      });
    })().catch(() => {
      // Silent by design. A missed count must never surface to a reader.
    });
  }, [pathname]);

  return null;
}
