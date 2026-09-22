"use client";

/**
 * One-time "New Book Live!" popup for The Wisdom of Proverbs (2026-09-22).
 *
 * Who sees it: people who signed up for the community study or opened the
 * Proverbs devotional - /api/popups/wisdom-book decides (and makes sure a
 * non-member has already had the JOIN popup, so two promos never stack).
 * Shown once per account: saved to user_popups_seen before it appears, same
 * as WisdomProverbsPopup. Stays off until the hardcover Amazon link is set in
 * lib/wisdomOfProverbsProducts.ts (?previewBooks=1 shows it early for testing).
 *
 * The artwork is Louis's (its X is drawn in; a real close button sits on it).
 * The real "See the Books" button opens the books page - never Amazon
 * directly, since there are three editions.
 * Tracking: wisdom_book_popup_impression / _dismissed / _clicked.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { lockDocumentScroll } from "../hooks/useDocumentScrollLock";
import { supabase } from "../lib/supabaseClient";
import { WISDOM_BOOKS_ON_SALE, WISDOM_BOOKS_PAGE_PATH } from "../lib/wisdomOfProverbsProducts";

const POPUP_ID = "wisdom_proverbs_book_2026";
const SHOW_DELAY_MS = 1500;
const EXCLUDED_PREFIXES = ["/start", "/events", "/books", "/login", "/signup", "/reset-password", "/admin", "/moderator-admin", "/onboarding"];

const localKey = (userId: string) => `bb-popup-done:${POPUP_ID}:${userId}`;

function track(eventName: string, userId: string, extra: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        user_id: userId,
        source: "book_popup",
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        metadata: { popup_id: POPUP_ID, ...extra },
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

export default function WisdomBookPopup({
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
  const pathRef = useRef(pathname);
  const blockedRef = useRef(blocked);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    pathRef.current = pathname;
    blockedRef.current = blocked;
  }, [pathname, blocked]);

  useEffect(() => {
    let preview = false;
    try {
      preview = new URLSearchParams(window.location.search).get("previewBooks") === "1";
    } catch {}
    if (!WISDOM_BOOKS_ON_SALE && !preview) return;
    try {
      if (window.localStorage.getItem(localKey(userId))) return;
    } catch {}

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    void (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) return;
        const res = await fetch("/api/popups/wisdom-book", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
        const payload = (await res.json()) as { eligible?: boolean };
        if (!payload.eligible) return;
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
        // Record "seen" on the account BEFORE showing, so it never repeats.
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
        track("wisdom_book_popup_impression", userId, { page: pathRef.current });
      };
      timer = setTimeout(attempt, 500);
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [userId]);

  const close = useCallback(
    (method: "close_button" | "escape" | "backdrop" | "not_now") => {
      setOpen(false);
      track("wisdom_book_popup_dismissed", userId, { method });
      restoreFocusRef.current?.focus?.();
    },
    [userId],
  );

  const seeBooks = useCallback(() => {
    track("wisdom_book_popup_clicked", userId);
    setOpen(false);
    router.push(`${WISDOM_BOOKS_PAGE_PATH}?src=book_popup`);
  }, [router, userId]);

  useEffect(() => {
    if (!open) return;
    return lockDocumentScroll('[aria-labelledby="wisdom-book-popup-title"]');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const focusables = () =>
      Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]") || []).filter(
        (el) => el.offsetParent !== null,
      );
    window.setTimeout(() => focusables().find((el) => el.dataset.primary === "true")?.focus(), 50);
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
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  const primaryButton = (
    <button
      type="button"
      data-primary="true"
      onClick={seeBooks}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#f5dfa0] to-[#cf9f45] py-4 text-[16px] font-black tracking-wide text-[#1c1307] shadow-lg transition hover:brightness-105 active:scale-[0.99] focus-visible:ring-4 focus-visible:ring-white"
    >
      SEE THE BOOKS <span aria-hidden="true">→</span>
    </button>
  );
  const notNow = (
    <button
      type="button"
      onClick={() => close("not_now")}
      className="mt-2 w-full py-2 text-sm font-bold text-white/70 transition hover:text-white"
    >
      Not now
    </button>
  );

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 p-3 backdrop-blur-[3px] sm:p-6"
      style={{ zIndex: 9995 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close("backdrop");
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wisdom-book-popup-title"
        className="relative w-full overflow-hidden rounded-[24px] bg-[#140d06] shadow-2xl sm:rounded-[28px]"
        style={{ maxWidth: "min(880px, calc((100dvh - 150px) * 1.4825))" }}
      >
        <h2 id="wisdom-book-popup-title" className="sr-only">
          New book live: The Wisdom of Proverbs, a 31-day study of the Book of Proverbs, now in print
        </h2>

        {/* Tablet / desktop artwork (1527x1030). Its X is drawn top-right. */}
        <div className="relative hidden sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/books/wisdom-of-proverbs/popup-desktop.webp"
            alt="New Book Live! The Wisdom of Proverbs, a 31-day study of the Book of Proverbs. Get the physical copy and take the study with you, while supporting Bible Buddy and helping keep it free for everyone."
            width={1527}
            height={1030}
            className="block h-auto w-full select-none"
            draggable={false}
          />
          <button
            type="button"
            onClick={() => close("close_button")}
            aria-label="Close"
            className="absolute right-[0.8%] top-[0.8%] h-[9.5%] w-[6.5%] rounded-full outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
          />
        </div>

        {/* Phone artwork (square). Its X is drawn top-right. */}
        <div className="relative sm:hidden" style={{ maxHeight: "calc(100dvh - 170px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/books/wisdom-of-proverbs/popup-mobile.webp"
            alt="New Book Live! The Wisdom of Proverbs, a 31-day study of the Book of Proverbs. Get the physical copy and take the study with you, while supporting Bible Buddy and helping keep it free for everyone."
            width={900}
            height={900}
            className="block h-auto w-full select-none"
            draggable={false}
          />
          <button
            type="button"
            onClick={() => close("close_button")}
            aria-label="Close"
            className="absolute right-[0.5%] top-[0.5%] h-[12%] w-[12%] rounded-full outline-none transition active:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
          />
        </div>

        <div className="border-t border-white/10 px-4 pb-3 pt-4 sm:px-6">
          {primaryButton}
          {notNow}
        </div>
      </div>
    </div>,
    document.body,
  );
}
