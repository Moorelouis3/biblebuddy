"use client";

/**
 * One-time "Bible first. Apps after." popup announcing Bible Lock
 * (Louis, 2026-11-13).
 *
 * Switched on 2026-11-13, after Louis approved the preview. `ENABLED` below
 * is the one line that turns it off again.
 *
 * Not a new system. Same mechanism as NewGamesPopup and the study popups:
 * "shown" is saved to the account in user_popups_seen under the popup id the
 * moment it appears, localStorage is only a fast skip, it waits for a settled
 * page with no other modal, and it never stacks. The shell, the pill, the
 * close button, the card and the buttons are NewGamesPopup's, restyled for
 * one feature instead of two.
 *
 * Who sees it once it is on: only somebody who can actually use the lock and
 * has not set it up. That is decided by the device, through bibleLockStatus():
 * `supported` is true only inside the Bible Buddy app on an iPhone (iOS 16+)
 * whose build carries the plugin - never on the website, never on Android.
 * Announcing it anywhere else would promise a button that does nothing.
 * Somebody who has already chosen apps is not told about a feature they use.
 *
 * Every line of copy is something the feature does today - see
 * lib/bibleLock.ts, BibleLockSettings and BibleLockPage. If the lock changes,
 * change the words here with it.
 *
 * Tracking goes through /api/landing-analytics with user_id:
 * bible_lock_popup_impression / _dismissed / _clicked.
 *
 * To look at it on any device without touching anyone's "seen" state, open an
 * app page with ?bb_preview=bible_lock. That shows it once for that page
 * load, skips the device check, records nothing and tracks nothing.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { lockDocumentScroll } from "../hooks/useDocumentScrollLock";
import { bibleLockStatus } from "../lib/bibleLock";
import { supabase } from "../lib/supabaseClient";
import { Sparkle } from "./NewGamesPopup";

/** Louis approved the preview on 2026-11-13. Set to false to stop showing it. */
const ENABLED = true;

const POPUP_ID = "bible_lock_2026_11";
const DESTINATION = "/bible-lock";
const SHOW_DELAY_MS = 1500;
const EXCLUDED_PREFIXES = [
  "/start",
  "/events",
  "/login",
  "/signup",
  "/reset-password",
  "/admin",
  "/moderator-admin",
  "/onboarding",
  "/bible-lock",
  "/settings",
];

const PREVIEW_PARAM = "bb_preview";
const PREVIEW_VALUE = "bible_lock";

/** See NewGamesPopup: the dashboard strips its query string before we mount. */
const SEARCH_AT_LOAD = typeof window === "undefined" ? "" : window.location.search;

function previewRequested() {
  try {
    const wanted = (search: string) => new URLSearchParams(search).get(PREVIEW_PARAM) === PREVIEW_VALUE;
    return wanted(SEARCH_AT_LOAD) || wanted(window.location.search);
  } catch {
    return false;
  }
}

const ENTRANCE_CSS = `
@media (prefers-reduced-motion: no-preference) {
  .bb-bible-lock-card { animation: bb-bible-lock-in 260ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  @keyframes bb-bible-lock-in {
    from { opacity: 0; transform: translateY(14px) scale(0.98); }
    to { opacity: 1; transform: none; }
  }
}
`;

const HIGHLIGHTS = [
  {
    title: "You choose the apps",
    detail: "Pick them in Apple's own Screen Time picker. Bible Buddy never sees which ones.",
  },
  {
    title: "One Bible Buddy task unlocks them",
    detail: "A chapter, a devotional day, a trivia round, a note and more.",
  },
  {
    title: "Back on at midnight",
    detail: "They lock again each day. Unlock now is always one tap away.",
  },
] as const;

const localKey = (userId: string) => `bb-popup-done:${POPUP_ID}:${userId}`;

function track(eventName: string, userId: string, extra: Record<string, unknown> = {}) {
  try {
    // Absolute URL: inside the iOS app a relative fetch can hang forever.
    void fetch(`${window.location.origin}/api/landing-analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        user_id: userId,
        source: "popup",
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        metadata: { promotion_id: POPUP_ID, source: "popup", ...extra },
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

/** Another modal is up (they all lock body scroll or announce a dialog). */
function otherModalOpen() {
  return document.body.style.overflow === "hidden" || Boolean(document.querySelector('[aria-modal="true"]'));
}

export default function BibleLockPopup({
  userId,
  pathname,
  blocked,
}: {
  userId: string;
  pathname: string | null;
  /** AppShell's own modals (install ask, celebrations...) are open. */
  blocked: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathRef = useRef(pathname);
  const blockedRef = useRef(blocked);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const previewRef = useRef(false);

  useEffect(() => {
    pathRef.current = pathname;
    blockedRef.current = blocked;
  }, [pathname, blocked]);

  // Eligibility runs once per signed-in user per page load.
  useEffect(() => {
    // Preview: show it for this page load only. No "seen" write, no tracking.
    if (previewRequested()) {
      const previewTimer = setTimeout(() => {
        previewRef.current = true;
        restoreFocusRef.current = document.activeElement as HTMLElement | null;
        setOpen(true);
      }, 600);
      return () => clearTimeout(previewTimer);
    }

    if (!ENABLED) return;

    try {
      if (window.localStorage.getItem(localKey(userId))) return;
    } catch {
      // Storage blocked - the account check below still decides.
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    void (async () => {
      try {
        // The device decides first, and it costs no network: only a phone
        // that can run the lock, and has not set it up, hears about it.
        const status = await bibleLockStatus();
        if (cancelled || !status.supported || status.chosen > 0 || status.locked) return;

        const { data: seen, error: seenError } = await supabase
          .from("user_popups_seen")
          .select("id")
          .eq("user_id", userId)
          .eq("popup_id", POPUP_ID)
          .maybeSingle();
        // If the seen-state can't be read, don't risk showing it twice.
        if (seenError || seen) {
          if (seen) {
            try {
              window.localStorage.setItem(localKey(userId), "seen");
            } catch {}
          }
          return;
        }
      } catch {
        return;
      }

      let clearSince = 0;
      const attempt = async () => {
        if (cancelled) return;
        const clear = !isExcluded(pathRef.current) && !blockedRef.current && !otherModalOpen() && !document.hidden;
        if (!clear) clearSince = 0;
        else if (!clearSince) clearSince = Date.now();
        if (!clear || Date.now() - clearSince < SHOW_DELAY_MS) {
          timer = setTimeout(attempt, 1000);
          return;
        }
        // Record the impression on the account BEFORE showing, so a failed
        // write never leads to a repeat later.
        const now = new Date().toISOString();
        const { error: writeError } = await supabase.from("user_popups_seen").upsert(
          { user_id: userId, popup_id: POPUP_ID, has_seen: true, seen_at: now, updated_at: now },
          { onConflict: "user_id,popup_id", ignoreDuplicates: true },
        );
        if (writeError || cancelled) return;
        try {
          window.localStorage.setItem(localKey(userId), "seen");
        } catch {}
        restoreFocusRef.current = document.activeElement as HTMLElement | null;
        setOpen(true);
        track("bible_lock_popup_impression", userId, { page: pathRef.current });
      };
      timer = setTimeout(attempt, 500);
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [userId]);

  const close = useCallback(
    (method: "close_button" | "escape" | "backdrop" | "later") => {
      setOpen(false);
      if (!previewRef.current) track("bible_lock_popup_dismissed", userId, { method });
      restoreFocusRef.current?.focus?.();
    },
    [userId],
  );

  const setUp = useCallback(() => {
    if (!previewRef.current) track("bible_lock_popup_clicked", userId);
    setOpen(false);
    router.push(DESTINATION);
  }, [router, userId]);

  // Background scroll lock, shared with every other modal.
  useEffect(() => {
    if (!open) return;
    return lockDocumentScroll('[aria-labelledby="bible-lock-popup-title"]');
  }, [open]);

  // Escape and focus trap.
  useEffect(() => {
    if (!open) return;
    const focusables = () =>
      Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]") || []).filter(
        (el) => el.offsetParent !== null,
      );
    // Focus lands on the main button, not on Close.
    const focusTimer = window.setTimeout(() => (focusables()[1] ?? focusables()[0])?.focus({ preventScroll: true }), 50);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close("escape");
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(30,27,45,0.5)] backdrop-blur-md"
      style={{
        zIndex: 9995,
        paddingTop: "max(12px, env(safe-area-inset-top))",
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        paddingLeft: "max(12px, env(safe-area-inset-left))",
        paddingRight: "max(12px, env(safe-area-inset-right))",
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close("backdrop");
      }}
    >
      <style>{ENTRANCE_CSS}</style>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bible-lock-popup-title"
        aria-describedby="bible-lock-popup-sub"
        className="bb-bible-lock-card relative flex max-h-full w-full max-w-[460px] flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(31,20,70,0.35)]"
      >
        {/* Outside the scrolling area, so it stays in reach on a short phone. */}
        <button
          type="button"
          onClick={() => close("close_button")}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white text-[#111827] shadow-[0_4px_14px_rgba(60,40,120,0.22)] outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M3.5 3.5l11 11M14.5 3.5l-11 11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {/* Header, on a lavender wash that fades into the white card. */}
          <div
            className="px-5 pb-3.5 pt-5 sm:px-6"
            style={{ background: "linear-gradient(180deg, #e9defd 0%, #f3ecff 48%, #ffffff 100%)" }}
          >
            <div className="flex items-center gap-1.5 pr-14">
              <Sparkle color="#7c3aed" className="h-5 w-5 shrink-0 -rotate-12" />
              <p className="whitespace-nowrap rounded-full bg-[#dfcffb] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#5b21b6]">
                New in Bible Buddy
              </p>
            </div>
            <h2
              id="bible-lock-popup-title"
              className="mt-3 text-[30px] font-black leading-[1.08] tracking-tight text-[#14122b] sm:text-[34px]"
            >
              Bible first.{" "}
              <span className="whitespace-nowrap">
                Apps{" "}
                <span className="relative inline-block">
                  after.
                  <svg
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1.5 left-0 h-2 w-full"
                    aria-hidden="true"
                  >
                    <path d="M2 6 Q 50 1 98 6" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </h2>
            <p id="bible-lock-popup-sub" className="mt-2.5 text-[16px] font-semibold leading-snug text-[#4b5068]">
              Bible Lock keeps the apps that pull you away locked until you have spent time with God today.
            </p>
          </div>

          <div className="px-4 sm:px-5">
            {/* The feature card: what the lock looks like when it is on. */}
            <section
              aria-labelledby="bible-lock-popup-card-title"
              className="relative overflow-hidden rounded-[26px] border border-[#cfd2fb] p-4 shadow-[0_6px_18px_rgba(91,80,220,0.12)]"
              style={{ background: "linear-gradient(135deg, #f1eaff 0%, #e3e6ff 52%, #d9ecff 100%)" }}
            >
              <Sparkle color="#14b8a6" className="absolute right-4 top-4 h-4 w-4 rotate-12" />

              <div className="flex items-center gap-3 pr-6">
                <span
                  className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl bg-[#d9d4fb] text-[28px] shadow-inner"
                  aria-hidden="true"
                >
                  🔒
                </span>
                <div className="min-w-0">
                  <h3 id="bible-lock-popup-card-title" className="text-[21px] font-black leading-tight text-[#14122b]">
                    Bible Lock
                  </h3>
                  <p className="text-[14px] font-semibold leading-snug text-[#4b5068]">
                    You pick the apps. Today&apos;s Bible time opens them.
                  </p>
                </div>
              </div>

              {/* A small picture of the real thing: the apps you chose, held,
                  with the status line Settings shows, then what lifts it. The
                  tiles are stand-ins, the same ones the dashboard strip uses -
                  shapes and colours, nobody's logo. */}
              <div className="mt-3.5 rounded-2xl bg-white p-3 shadow-[0_4px_14px_rgba(60,60,160,0.14)]" aria-hidden="true">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
                  <LockedTile className="bg-[#111827] text-white">♪</LockedTile>
                  <LockedTile className="bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">📷</LockedTile>
                  <LockedTile className="bg-[#ff0033] text-white">▶</LockedTile>
                  <span className="ml-auto rounded-full bg-[#ede4ff] px-3 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-[#5b21b6] sm:hidden">
                    Locked
                  </span>
                  <p className="min-w-0 basis-full text-[13px] font-bold leading-snug text-[#14122b] sm:basis-0 sm:flex-1 sm:pl-1">
                    3 apps chosen.
                    <span className="font-semibold text-[#5b6079] sm:block"> Locked until today&apos;s reading is done.</span>
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-[#e8fbf3] px-3 py-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10b981] text-[12px] font-black text-white">
                    ✓
                  </span>
                  <p className="min-w-0 text-[13px] font-bold leading-snug text-[#0f5d45]">
                    Finish a chapter and they come back until midnight.
                  </p>
                </div>
              </div>
            </section>

            <ul className="mt-3.5 flex flex-col gap-2.5 px-1 pb-3.5">
              {HIGHLIGHTS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ede4ff] text-[13px] font-black text-[#6d28d9]"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <p className="min-w-0 text-[14px] leading-snug text-[#4b5068]">
                    <span className="block text-[15px] font-black text-[#14122b]">{item.title}</span>
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>

          </div>

        </div>

        {/* The main button and the way out stay put under the scrolling
            part, so on a short phone neither is ever below the fold. */}
        <div className="shrink-0 border-t border-[#efe9fb] bg-white px-4 pb-2 pt-3 sm:px-5">
          <button
            type="button"
            onClick={setUp}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-5 text-[17px] font-black text-white shadow-[0_8px_18px_rgba(109,40,217,0.35)] outline-none transition active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-[#c4b5fd]"
            style={{ background: "linear-gradient(180deg, #8b45f0 0%, #6d28d9 100%)" }}
          >
            Set up Bible Lock <span aria-hidden="true">→</span>
          </button>
          <p className="mt-3 flex items-center justify-center gap-3 text-[13px] font-bold text-[#3b3f58]">
            <span className="h-px w-8 bg-[#cdbff0]" aria-hidden="true" />
            <span className="text-center">
              100% FREE{" "}
              <span className="text-[#7c3aed]" aria-hidden="true">
                •
              </span>{" "}
              Unlock any time
            </span>
            <span className="h-px w-8 bg-[#cdbff0]" aria-hidden="true" />
          </p>
          <button
            type="button"
            onClick={() => close("later")}
            className="mx-auto block min-h-[44px] rounded-xl px-6 text-[15px] font-bold text-[#7b8094] outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** A stand-in app icon with a small padlock on its corner. */
function LockedTile({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className="relative shrink-0">
      <span className={`grid h-11 w-11 place-items-center rounded-[13px] text-[19px] opacity-90 shadow-sm ${className}`}>
        {children}
      </span>
      <span className="absolute -bottom-1.5 -right-1.5 grid h-[22px] w-[22px] place-items-center rounded-full bg-white text-[11px] shadow-[0_2px_6px_rgba(20,18,43,0.25)]">
        🔒
      </span>
    </span>
  );
}
