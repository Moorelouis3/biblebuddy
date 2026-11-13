"use client";

/**
 * One-time "Make Scripture stick." popup for the two new games, Bible Memory
 * and Bible Word Search (Louis, 2026-11-13).
 *
 * Not a new system. It is the same mechanism as the study popups
 * (BeginningOfEverythingPopup, WisdomBookPopup): "shown" is saved to the
 * account in user_popups_seen under the popup id below the moment it appears,
 * so each person sees it once, on whichever device they open first;
 * localStorage is only a fast skip. It waits for a quiet moment - a real page,
 * no other popup, tab visible - and never stacks on another modal.
 *
 * Who sees it: every signed-in person, once. It does not appear on the Games
 * pages themselves: somebody already there has found them.
 *
 * Tracking goes through /api/landing-analytics with user_id:
 * new_games_popup_impression / _dismissed / _clicked (metadata.game says
 * which of the two was chosen).
 *
 * The look is Louis's mockup, the same day: a lavender Bible Memory card with
 * a small fill-in-the-blank preview and a sheep on a hill, and a light-blue
 * Word Search card with a letter grid. Everything in it is real text and real
 * buttons. The sheep, staff, hill and sparkles are inline SVG drawn for this
 * popup, so nothing is a flattened picture and nothing extra is downloaded.
 * Who sees it, how often, and how a dismissal is remembered did not change
 * with the redesign, and neither did the popup id: people who saw the first
 * version are not shown it again.
 *
 * To look at it without touching anyone's "seen" state, open any app page
 * with ?bb_preview=new_games. That shows it once for that page load, records
 * nothing and tracks nothing.
 *
 * The next announcement of this kind is a new POPUP_ID and new copy, not
 * another component.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { lockDocumentScroll } from "../hooks/useDocumentScrollLock";
import { supabase } from "../lib/supabaseClient";

const POPUP_ID = "new_games_2026_11";
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
  "/bible-study-games",
  "/bible-trivia",
];

const MEMORY = { key: "bible_memory", href: "/bible-study-games/memory" } as const;
const WORD_SEARCH = { key: "word_search", href: "/bible-study-games/word-search" } as const;
type Game = typeof MEMORY | typeof WORD_SEARCH;

const PREVIEW_PARAM = "bb_preview";
const PREVIEW_VALUE = "new_games";

/**
 * The address as it was when this file first loaded in the browser.
 *
 * The dashboard tidies its own query string before AppShell knows who is
 * signed in, which is before this popup mounts - so by the time the effect
 * runs, ?bb_preview=new_games has already been removed from the address bar.
 * Reading it once at load is the only moment it is reliably still there.
 */
const SEARCH_AT_LOAD = typeof window === "undefined" ? "" : window.location.search;

function previewRequested() {
  try {
    const wanted = (search: string) => new URLSearchParams(search).get(PREVIEW_PARAM) === PREVIEW_VALUE;
    return wanted(SEARCH_AT_LOAD) || wanted(window.location.search);
  } catch {
    return false;
  }
}

// The little letter grid on the Word Search card. GRACE is the found word.
const GRID_ROWS = ["PSALM", "FAITH", "GRACE", "TRUST", "JOYLO"];
const GRID_FOUND_ROW = 2;

const ENTRANCE_CSS = `
@media (prefers-reduced-motion: no-preference) {
  .bb-new-games-card { animation: bb-new-games-in 260ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  @keyframes bb-new-games-in {
    from { opacity: 0; transform: translateY(14px) scale(0.98); }
    to { opacity: 1; transform: none; }
  }
}
`;

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

export default function NewGamesPopup({
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

    try {
      if (window.localStorage.getItem(localKey(userId))) return;
    } catch {
      // Storage blocked - the account check below still decides.
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    void (async () => {
      try {
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

      // Let the app land first, then wait for a clear moment. A cheap local
      // check, no network, repeated until the page is settled.
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
        track("new_games_popup_impression", userId, { page: pathRef.current });
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
      if (!previewRef.current) track("new_games_popup_dismissed", userId, { method });
      restoreFocusRef.current?.focus?.();
    },
    [userId],
  );

  const openGame = useCallback(
    (game: Game) => {
      if (!previewRef.current) track("new_games_popup_clicked", userId, { game: game.key });
      setOpen(false);
      router.push(game.href);
    },
    [router, userId],
  );

  // Background scroll lock, shared with every other modal.
  useEffect(() => {
    if (!open) return;
    return lockDocumentScroll('[aria-labelledby="new-games-popup-title"]');
  }, [open]);

  // Escape and focus trap.
  useEffect(() => {
    if (!open) return;
    const focusables = () =>
      Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]") || []).filter(
        (el) => el.offsetParent !== null,
      );
    // Focus lands on the first game, not on Close: the first thing a keyboard
    // or screen-reader user meets should be what the popup is offering.
    const focusTimer = window.setTimeout(() => (focusables()[1] ?? focusables()[0])?.focus(), 50);

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
        aria-labelledby="new-games-popup-title"
        aria-describedby="new-games-popup-sub"
        className="bb-new-games-card relative flex max-h-full w-full max-w-[460px] flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(31,20,70,0.35)]"
      >
        {/* The close button is outside the scrolling area, so it stays in
            reach however far a short phone has to scroll. */}
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
              id="new-games-popup-title"
              className="mt-3 text-[30px] font-black leading-[1.08] tracking-tight text-[#14122b] sm:text-[34px]"
            >
              Make Scripture{" "}
              <span className="relative inline-block whitespace-nowrap">
                stick.
                <svg
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1.5 left-0 h-2 w-full"
                  aria-hidden="true"
                >
                  <path d="M2 6 Q 50 1 98 6" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p id="new-games-popup-sub" className="mt-2.5 text-[16px] font-semibold text-[#4b5068]">
              Two new games. More ways to grow.
            </p>
          </div>

          <div className="flex flex-col gap-3 px-4 sm:px-5">
            {/* Bible Memory */}
            <section
              aria-labelledby="new-games-memory-title"
              className="relative overflow-hidden rounded-[26px] border border-[#d9c8fb] p-4 shadow-[0_6px_18px_rgba(124,58,237,0.10)]"
              style={{ background: "linear-gradient(135deg, #f6efff 0%, #eadcff 100%)" }}
            >
              {/* Decoration sits under the content and gives way to the words,
                  never the other way round. On a phone it is drawn small
                  enough that the sheep stands clear of the button's right
                  edge; at the first size tried it was hidden behind it. */}
              <SheepScene className="pointer-events-none absolute bottom-0 right-0 hidden h-[96px] w-[128px] min-[360px]:block sm:h-[158px] sm:w-[212px]" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl bg-[#e2d0fb] text-[28px] shadow-inner"
                    aria-hidden="true"
                  >
                    🧠
                  </span>
                  <div className="min-w-0">
                    <h3 id="new-games-memory-title" className="text-[21px] font-black leading-tight text-[#14122b]">
                      Bible Memory
                    </h3>
                    <p className="text-[14px] font-semibold leading-snug text-[#4b5068]">Save a verse. Learn it by heart.</p>
                  </div>
                </div>

                {/* What the game looks like: a verse with one word to choose. */}
                <div className="mt-3.5" aria-hidden="true">
                  <p className="inline-flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-1 rounded-2xl bg-white px-3.5 py-2 text-[15px] font-bold text-[#14122b] shadow-[0_2px_8px_rgba(60,40,120,0.12)]">
                    <span>The LORD is my</span>
                    <span className="rounded-full bg-[#7c3aed] px-3 py-0.5 font-black text-white shadow-[0_2px_0_#5b21b6]">
                      shepherd
                    </span>
                    <span>.</span>
                  </p>
                  <div className="mt-2 flex gap-2 pl-6">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-[12px] font-bold text-[#8a8fa3]">protector</span>
                    <span className="rounded-full bg-white/70 px-3 py-1 text-[12px] font-bold text-[#8a8fa3]">teacher</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openGame(MEMORY)}
                  className="mt-3.5 inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-full px-5 text-[16px] font-black text-white shadow-[0_6px_14px_rgba(109,40,217,0.35)] outline-none transition active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-[#c4b5fd]"
                  style={{ background: "linear-gradient(180deg, #8b45f0 0%, #6d28d9 100%)" }}
                >
                  Try Bible Memory <span aria-hidden="true">→</span>
                </button>
              </div>
            </section>

            {/* Bible Word Search */}
            <section
              aria-labelledby="new-games-search-title"
              className="relative overflow-hidden rounded-[26px] border border-[#bfdcf8] p-4 shadow-[0_6px_18px_rgba(37,99,235,0.10)]"
              style={{ background: "linear-gradient(135deg, #eef7ff 0%, #d9ecff 100%)" }}
            >
              {/* Two layouts from one set of elements.
                  Phone: title across the top, then the description beside the
                  grid, then the button on its own line - at 320 to 390px
                  there is no room for a 21px title, a 200px button and the
                  grid side by side, and they collided when it was tried.
                  From 640px: the mockup's arrangement, words and button on
                  the left with the grid down the right. */}
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3">
                <div className="contents">
                  <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
                    <span
                      className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl bg-[#cfe6fb] text-[28px] shadow-inner"
                      aria-hidden="true"
                    >
                      🔎
                    </span>
                    <h3 id="new-games-search-title" className="min-w-0 text-[21px] font-black leading-[1.1] text-[#14122b]">
                      Bible Word Search
                    </h3>
                  </div>
                  <p className="col-start-1 mt-2 text-[14px] font-semibold leading-snug text-[#4b5068]">
                    66 books. A new way to explore each one.
                  </p>
                  <button
                    type="button"
                    onClick={() => openGame(WORD_SEARCH)}
                    className="col-span-2 mt-3.5 inline-flex min-h-[48px] items-center gap-2 justify-self-start whitespace-nowrap rounded-full px-5 text-[16px] font-black text-white sm:col-span-1 sm:col-start-1 shadow-[0_6px_14px_rgba(29,78,216,0.35)] outline-none transition active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-[#93c5fd]"
                    style={{ background: "linear-gradient(180deg, #2f6bf0 0%, #1d4ed8 100%)" }}
                  >
                    Try Word Search <span aria-hidden="true">→</span>
                  </button>
                </div>

                <div
                  className="relative col-start-2 row-start-2 mt-2 shrink-0 rounded-2xl bg-white p-2 shadow-[0_4px_14px_rgba(37,99,235,0.18)] sm:row-span-3 sm:row-start-1 sm:mt-0"
                  aria-hidden="true"
                >
                  <Sparkle color="#14b8a6" className="absolute -right-1 -top-3.5 h-4 w-4 rotate-12" />
                  <div className="grid gap-y-0.5">
                    {GRID_ROWS.map((row, rowIndex) => (
                      <div key={row} className={`grid grid-cols-5 rounded-md ${rowIndex === GRID_FOUND_ROW ? "bg-[#5eead4]" : ""}`}>
                        {row.split("").map((letter, index) => (
                          <span
                            key={index}
                            className={`grid h-[19px] w-[19px] place-items-center text-[12px] leading-none text-[#14122b] sm:h-[22px] sm:w-[22px] sm:text-[13px] ${
                              rowIndex === GRID_FOUND_ROW ? "font-black" : "font-bold"
                            }`}
                          >
                            {letter}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="px-5 pb-2.5 pt-3.5">
            <p className="flex items-center justify-center gap-3 text-[13px] font-bold text-[#3b3f58]">
              <span className="h-px w-8 bg-[#cdbff0]" aria-hidden="true" />
              <span className="text-center">
                100% FREE{" "}
                <span className="text-[#7c3aed]" aria-hidden="true">
                  •
                </span>{" "}
                Find both in Games
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
      </div>
    </div>,
    document.body,
  );
}

// ───────────────────────── artwork ─────────────────────────

/** Three short rays: the little "new!" mark beside the pill and the grid. */
function Sparkle({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M3 13l4-2M6 5l3 4M13 3l-1 5" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A sheep resting on a hill beside a shepherd's staff - Psalm 23, the verse
 * in the preview. Drawn as SVG so it scales with the card and costs no
 * request. Decoration only: hidden from screen readers.
 */
function SheepScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 182 136" className={className} aria-hidden="true" preserveAspectRatio="xMaxYMax meet">
      {/* clouds */}
      <g fill="#ffffff" opacity="0.95">
        <ellipse cx="78" cy="16" rx="13" ry="6" />
        <ellipse cx="86" cy="12" rx="8" ry="6" />
        <ellipse cx="40" cy="44" rx="10" ry="4.5" />
        <ellipse cx="46" cy="41" rx="6" ry="4.5" />
      </g>
      {/* hill */}
      <path d="M0 136 C 30 104, 78 84, 130 82 C 156 81, 172 86, 182 92 L182 136 Z" fill="#8fd16a" />
      <path d="M40 136 C 70 112, 110 98, 150 98 C 166 98, 176 101, 182 104 L182 136 Z" fill="#6fbf4d" />
      {/* staff */}
      <path
        d="M134 104 L134 36 C134 18, 160 18, 160 36 C160 44, 154 48, 149 46"
        fill="none"
        stroke="#a9713f"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M134 100 L134 40" fill="none" stroke="#c48a55" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* rock */}
      <path d="M140 136 C138 118, 152 108, 166 112 C177 115, 182 124, 182 136 Z" fill="#aab1c2" />
      <path d="M152 136 C152 124, 162 118, 172 122 C179 125, 182 130, 182 136 Z" fill="#8f97ab" />
      {/* sheep: wool */}
      <g fill="#fffaf2" stroke="#eadfce" strokeWidth="1.2">
        <circle cx="96" cy="92" r="15" />
        <circle cx="112" cy="88" r="16" />
        <circle cx="124" cy="98" r="13" />
        <circle cx="104" cy="104" r="14" />
        <circle cx="88" cy="103" r="11" />
        <circle cx="118" cy="107" r="11" />
        <circle cx="86" cy="78" r="10" />
        <circle cx="76" cy="82" r="7" />
        <circle cx="94" cy="74" r="7" />
      </g>
      {/* sheep: ear, face */}
      <ellipse cx="69" cy="94" rx="6" ry="4" fill="#f1c9ae" transform="rotate(-25 69 94)" />
      <ellipse cx="80" cy="96" rx="12.5" ry="11" fill="#f8dcc6" />
      <path d="M74 94 q3 -3 6 0" fill="none" stroke="#6b4a3a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M83 94 q3 -3 6 0" fill="none" stroke="#6b4a3a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M78 101 q3 2.5 6 0" fill="none" stroke="#6b4a3a" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="73" cy="99" r="2.2" fill="#f5b7a6" opacity="0.8" />
      <circle cx="89" cy="99" r="2.2" fill="#f5b7a6" opacity="0.8" />
      {/* grass */}
      <g fill="none" stroke="#4fa634" strokeWidth="2.4" strokeLinecap="round">
        <path d="M58 118 q-2 -9 -6 -12M58 118 q0 -10 2 -14M58 118 q4 -7 8 -9" />
        <path d="M126 122 q-2 -8 -5 -10M126 122 q1 -9 3 -12M126 122 q4 -6 7 -7" />
      </g>
    </svg>
  );
}
