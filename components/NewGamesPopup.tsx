"use client";

/**
 * One-time "2 New Game Modes" popup: Bible Memory and Bible Word Search
 * (Louis, 2026-11-13).
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

const GAMES = [
  {
    key: "bible_memory",
    href: "/bible-study-games/memory",
    icon: "🧠",
    tile: "#fef3c7",
    title: "Bible Memory",
    text: "Save a verse and learn it by heart with three short games.",
    cta: "Try Bible Memory",
  },
  {
    key: "word_search",
    href: "/bible-study-games/word-search",
    icon: "🔎",
    tile: "#dbeafe",
    title: "Bible Word Search",
    text: "A puzzle for every book of the Bible. Find its people, places and themes.",
    cta: "Try Word Search",
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

  useEffect(() => {
    pathRef.current = pathname;
    blockedRef.current = blocked;
  }, [pathname, blocked]);

  // Eligibility runs once per signed-in user per page load.
  useEffect(() => {
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
      track("new_games_popup_dismissed", userId, { method });
      restoreFocusRef.current?.focus?.();
    },
    [userId],
  );

  const openGame = useCallback(
    (game: (typeof GAMES)[number]) => {
      track("new_games_popup_clicked", userId, { game: game.key });
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
    const focusTimer = window.setTimeout(() => focusables()[0]?.focus(), 50);

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
      className="fixed inset-0 flex items-end justify-center bg-black/60 p-3 backdrop-blur-[2px] sm:items-center sm:p-6"
      style={{ zIndex: 9995 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close("backdrop");
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-games-popup-title"
        className="relative flex max-h-[calc(100dvh-24px)] w-full max-w-md flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl"
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-2 pt-5">
          <button
            type="button"
            onClick={() => close("close_button")}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-lg font-black text-gray-700"
          >
            ✕
          </button>

          <p className="inline-block rounded-full bg-[#ede9fe] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#5b21b6]">
            New in Bible Buddy
          </p>
          <h2 id="new-games-popup-title" className="mt-3 pr-10 text-[26px] font-black leading-tight text-gray-900">
            2 New Game Modes
          </h2>
          <p className="mt-1 text-[15px] font-semibold leading-snug text-gray-600">
            Two new ways to make what you read stick. Both are free, and both are in Games.
          </p>

          <ul className="mt-4 flex flex-col gap-3">
            {GAMES.map((game) => (
              <li key={game.key}>
                <button
                  type="button"
                  onClick={() => openGame(game)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3.5 text-left shadow-sm transition active:scale-[0.99] hover:border-blue-300"
                >
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl"
                    style={{ backgroundColor: game.tile }}
                    aria-hidden="true"
                  >
                    {game.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-black text-gray-900">{game.title}</span>
                    <span className="mt-0.5 block text-[13px] font-semibold leading-snug text-gray-600">{game.text}</span>
                    <span className="mt-1.5 block text-[13px] font-black text-blue-700">{game.cta} →</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0 px-5 pt-2" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <button
            type="button"
            onClick={() => close("later")}
            className="w-full rounded-xl px-4 py-3 text-sm font-black text-gray-500"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
