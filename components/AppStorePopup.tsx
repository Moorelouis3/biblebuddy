"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { APP_STORE_ID } from "../lib/appReviewPrompt";
import { isIOS, isStandalone } from "../lib/installEnvironment";
import { isNativeApp } from "../lib/nativeApp";

/**
 * "You're on an iPhone - get the real app."
 *
 * Louis, 2026-11-02: "I want a person who logs in on mobile and has an
 * iPhone to get a pop up to download the iOS app." The two asks that already
 * existed are both the wrong shape for that - the slim dashboard banner is
 * easy to scroll past, and the other popup only fires after somebody
 * finishes a reading, which most people never reach in their first session.
 * This one meets them on the way in.
 *
 * Its own storage key, deliberately separate from the Add to Home Screen
 * bookkeeping: somebody who said "no" to a home-screen bookmark months ago
 * has not said no to the actual app, and dismissing this should not silence
 * that one either.
 *
 * It never appears inside the native app (you already have it), on anything
 * that is not an iPhone or iPad, or once the listing id is cleared.
 */

const STORAGE_KEY = "bb:appstore-popup";
/** "Not now" is not "never" - it comes back, but not soon enough to nag. */
const LATER_DAYS = 5;
/** Let the page settle first; a modal over a half-drawn dashboard reads as an error. */
const DELAY_MS = 2500;

type Decision = "pending" | "later" | "never";

function readState(): { decision: Decision; at: number } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { decision: "pending", at: 0 };
    const [decision, at] = raw.split(":");
    return { decision: (decision as Decision) || "pending", at: Number(at) || 0 };
  } catch {
    return { decision: "pending", at: 0 };
  }
}

function writeState(decision: Decision) {
  try {
    window.localStorage.setItem(STORAGE_KEY, `${decision}:${Date.now()}`);
  } catch {
    // Private mode. Worst case it asks again next visit, which is survivable.
  }
}

type Session = { userId: string; accessToken: string };

/** Analytics, matching the events the App tab reads. Fire and forget. */
async function log(actionType: string, actionLabel: string) {
  try {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;
    await supabase.from("master_actions").insert({
      user_id: user.id,
      action_type: actionType,
      action_label: actionLabel,
      event_metadata: { surface: "appstore_popup", store: "ios", placement: "login_popup" },
    });
  } catch {
    // Never let measurement break the thing being measured.
  }
}

/**
 * The tap, logged so it survives leaving the page.
 *
 * The ordinary client does an async insert, and tapping this link navigates
 * to the App Store immediately - on iOS that hands off to another app and
 * the request is very likely cancelled mid-flight. Which would lose exactly
 * the number this popup exists to produce. `keepalive` is the browser
 * guarantee that an in-flight POST completes after the page goes away, so
 * the session is captured up front, while the popup is merely open, and the
 * click itself only fires an already-prepared request.
 */
function logTapBeacon(session: Session | null) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!session || !url || !anon) return;
  try {
    void fetch(`${url}/rest/v1/master_actions`, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        apikey: anon,
        Authorization: `Bearer ${session.accessToken}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        user_id: session.userId,
        action_type: "appstore_popup_clicked",
        action_label: "App Store popup tapped",
        event_metadata: { surface: "appstore_popup", store: "ios", placement: "login_popup" },
      }),
    });
  } catch {
    // ignore
  }
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" className="h-6 w-6 shrink-0 fill-current">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

export default function AppStorePopup({ enabled }: { enabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!APP_STORE_ID) return;
    // Already in the real app, or on anything that is not an iPhone/iPad.
    if (isNativeApp() || !isIOS()) return;
    // Launched from a home-screen icon: they have already committed to a
    // shortcut, and interrupting that with a different install is rude.
    if (isStandalone()) return;

    const { decision, at } = readState();
    if (decision === "never") return;
    if (decision === "later" && Date.now() - at < LATER_DAYS * 86_400_000) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      void log("appstore_popup_shown", "App Store popup shown");
      // Prepared now so the tap has nothing left to await.
      void supabase.auth.getSession().then(({ data }) => {
        const u = data.session;
        if (u?.user?.id && u.access_token) setSession({ userId: u.user.id, accessToken: u.access_token });
      });
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [enabled]);

  if (!open) return null;

  const close = (decision: Decision, action: string, label: string) => {
    writeState(decision);
    setOpen(false);
    void log(action, label);
  };

  return (
    <div
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/60 px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Get Bible Buddy on the App Store"
    >
      <div className="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl">
        <img
          src="/icons/icon-192.png"
          alt=""
          width={64}
          height={64}
          className="mx-auto h-16 w-16 rounded-[18px] shadow-[0_6px_18px_rgba(14,26,58,0.28)]"
        />
        <h2 className="mt-3 text-xl font-black text-gray-950">Bible Buddy is on the App Store</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
          You&apos;re on an iPhone - get the real app. It&apos;s free, your streak and
          progress come with you, and it opens straight to today&apos;s reading.
        </p>

        <a
          href={`https://apps.apple.com/app/id${APP_STORE_ID}`}
          onClick={() => {
            logTapBeacon(session);
            writeState("never");
            setOpen(false);
          }}
          className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#07162f] px-5 py-3.5 text-white transition hover:opacity-90"
        >
          <AppleGlyph />
          <span className="text-left leading-none">
            <span className="block text-[0.66rem] font-semibold">Download on the</span>
            <span className="mt-0.5 block text-[1.05rem] font-black leading-none">App Store</span>
          </span>
        </a>

        <button
          type="button"
          onClick={() => close("later", "appstore_popup_later", "App Store popup - not now")}
          className="mt-2 w-full rounded-2xl px-5 py-2.5 text-sm font-bold text-gray-500 transition hover:text-gray-700"
        >
          Not now
        </button>
        <button
          type="button"
          onClick={() => close("never", "appstore_popup_never", "App Store popup dismissed forever")}
          className="mt-1 w-full px-5 py-1 text-xs font-semibold text-gray-400 transition hover:text-gray-600"
        >
          Don&apos;t show this again
        </button>
      </div>
    </div>
  );
}
