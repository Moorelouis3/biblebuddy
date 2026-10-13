"use client";

/**
 * One-time "The Wisdom of Proverbs has started" popup (2026-09-22).
 * For members of the community study who have not started the devotional
 * yet, once the study is live (from Oct 1). /api/popups/proverbs-launch
 * decides; shown once per account (user_popups_seen). "Start Day 1" opens the
 * devotional's first day - everyone starts at Day 1 and goes at their own pace.
 * ?previewBooks=1 is NOT used here; ?previewLaunch=1 shows it early for testing.
 *
 * Only one promo popup per visit: whichever of this and the book popup shows
 * first sets PROMO_VISIT_KEY in sessionStorage and the other waits.
 * Tracking: proverbs_launch_popup_impression / _dismissed / _clicked.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { lockDocumentScroll } from "../hooks/useDocumentScrollLock";
import { supabase } from "../lib/supabaseClient";
import { getCommunityEvent } from "../lib/communityEvents";
import { eventDayStudyPath } from "../lib/communityEventDays";

export const PROMO_VISIT_KEY = "bb:promo-popup-this-visit";
const POPUP_ID = "wisdom_proverbs_launch_2026";
const EVENT_SLUG = "wisdom-of-proverbs";
const SHOW_DELAY_MS = 1500;
const EXCLUDED_PREFIXES = ["/start", "/events", "/books", "/devotionals", "/login", "/signup", "/reset-password", "/admin", "/moderator-admin", "/onboarding"];

const localKey = (userId: string) => `bb-popup-done:${POPUP_ID}:${userId}`;

function track(eventName: string, userId: string, extra: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        user_id: userId,
        source: "launch_popup",
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        metadata: { popup_id: POPUP_ID, event_slug: EVENT_SLUG, ...extra },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics never blocks the popup.
  }
}

function isExcluded(pathname: string | null) {
  return !pathname || EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function otherModalOpen() {
  return document.body.style.overflow === "hidden" || Boolean(document.querySelector('[aria-modal="true"]'));
}

function promoAlreadyShownThisVisit() {
  try {
    return Boolean(window.sessionStorage.getItem(PROMO_VISIT_KEY));
  } catch {
    return false;
  }
}

export default function ProverbsLaunchPopup({
  userId,
  pathname,
  blocked,
}: {
  userId: string;
  pathname: string | null;
  blocked: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(1);
  const pathRef = useRef(pathname);
  const blockedRef = useRef(blocked);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const event = getCommunityEvent(EVENT_SLUG);

  useEffect(() => {
    pathRef.current = pathname;
    blockedRef.current = blocked;
  }, [pathname, blocked]);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(localKey(userId))) return;
    } catch {}
    let preview = false;
    try {
      preview = new URLSearchParams(window.location.search).get("previewLaunch") === "1";
    } catch {}

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    void (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) return;
        const res = await fetch(`/api/popups/proverbs-launch${preview ? "?preview=1" : ""}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const payload = (await res.json()) as { eligible?: boolean; day?: number };
        if (!payload.eligible || cancelled) return;
        setDay(payload.day || 1);
      } catch {
        return;
      }

      let clearSince = 0;
      const attempt = async () => {
        if (cancelled) return;
        if (promoAlreadyShownThisVisit()) return; // try again next visit
        const clear = !isExcluded(pathRef.current) && !blockedRef.current && !otherModalOpen() && !document.hidden;
        if (!clear) clearSince = 0;
        else if (!clearSince) clearSince = Date.now();
        if (!clear || Date.now() - clearSince < SHOW_DELAY_MS) {
          timer = setTimeout(attempt, 1000);
          return;
        }
        const now = new Date().toISOString();
        const { error: writeError } = await supabase.from("user_popups_seen").upsert(
          { user_id: userId, popup_id: POPUP_ID, has_seen: true, seen_at: now, updated_at: now },
          { onConflict: "user_id,popup_id", ignoreDuplicates: true },
        );
        if (writeError || cancelled) return;
        try {
          window.localStorage.setItem(localKey(userId), "seen");
          window.sessionStorage.setItem(PROMO_VISIT_KEY, POPUP_ID);
        } catch {}
        restoreFocusRef.current = document.activeElement as HTMLElement | null;
        setOpen(true);
        track("proverbs_launch_popup_impression", userId, { page: pathRef.current });
      };
      timer = setTimeout(attempt, 500);
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [userId]);

  const close = useCallback(
    (method: "not_now" | "escape" | "backdrop" | "close_button") => {
      setOpen(false);
      track("proverbs_launch_popup_dismissed", userId, { method });
      restoreFocusRef.current?.focus?.();
    },
    [userId],
  );

  const start = useCallback(() => {
    track("proverbs_launch_popup_clicked", userId, { day });
    setOpen(false);
    if (event) router.push(eventDayStudyPath(event.devotionalId, 1));
  }, [day, event, router, userId]);

  useEffect(() => {
    if (!open) return;
    return lockDocumentScroll('[aria-labelledby="proverbs-launch-title"]');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("[data-primary='true']")?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close("escape");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open || !event) return null;

  const headline = day <= 1 ? "It starts today!" : `Day ${day} is live!`;
  const body =
    day <= 1
      ? "The Wisdom of Proverbs community study begins today. Open Day 1, read Proverbs 1, and share what stood out in today's discussion in the Bible Buddy group."
      : `The group is on Day ${day}, and it's not too late. Start with Day 1 and go at your own pace. Every day has its own discussion in the Bible Buddy group.`;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[3px]"
      style={{ zIndex: 9995 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close("backdrop");
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="proverbs-launch-title"
        className="relative w-full max-w-md overflow-hidden rounded-[26px] text-white shadow-2xl"
        style={{ background: "linear-gradient(160deg, #120b05 0%, #22160a 60%, #2f1e0e 100%)" }}
      >
        <button
          type="button"
          onClick={() => close("close_button")}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-lg font-bold text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
        >
          ✕
        </button>
        <div className="px-6 pb-6 pt-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e3b964]">The Wisdom of Proverbs · October 1–31</p>
          <h2 id="proverbs-launch-title" className="mt-3 text-[2rem] font-bold leading-tight" style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: "#f6ecd8" }}>
            {headline}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-6 text-[#eadcc2]">{body}</p>
          <blockquote className="mx-auto mt-5 max-w-sm rounded-2xl border border-[#e3b964]/35 bg-white/5 px-4 py-3">
            <p className="text-[15px] italic leading-snug text-[#f1dfb8]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              “The fear of the Lord is the beginning of wisdom.”
            </p>
            <p className="mt-1 text-[11px] font-bold tracking-[0.2em] text-[#e3b964]">PROVERBS 9:10</p>
          </blockquote>
          <button
            type="button"
            data-primary="true"
            onClick={start}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#f5dfa0] to-[#cf9f45] py-4 text-[16px] font-black tracking-wide text-[#1c1307] shadow-lg transition hover:brightness-105 active:scale-[0.99] focus-visible:ring-4 focus-visible:ring-white"
          >
            START DAY 1 <span aria-hidden="true">→</span>
          </button>
          <button type="button" onClick={() => close("not_now")} className="mt-2 w-full py-2 text-sm font-bold text-white/70 hover:text-white">
            Not now
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
