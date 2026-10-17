"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bibleLockStatus } from "@/lib/bibleLock";

/**
 * The way in to the Bible lock, on the dashboard (Louis, 2026-10-17: "I don't
 * see it as an option on the dashboard - how would we add that, like a
 * banner", then a mockup: lock tile, the line, the app tiles, Set Up).
 *
 * It only ever lived in Settings, and the Settings block renders nothing on a
 * device that cannot run it, so almost nobody knew the feature existed.
 *
 * This shows everywhere, because knowing it exists is the point - it is the
 * one thing in Bible Buddy that a website could not do, and somebody reading
 * on a laptop today is deciding whether the app is worth installing. The page
 * it opens is honest about needing an iPhone.
 *
 * The three tiles are the idea of distracting apps, not anybody's logo: a
 * note, a camera, a play button, in the colours those apps trained everyone
 * to read. Real marks would be somebody else's trademark sitting in a promo
 * on our dashboard, which is not a fight worth having at submission.
 *
 * It leaves once the lock is actually on, and once it is dismissed it stays
 * gone - a banner that keeps coming back is an advert.
 */

const DISMISS_KEY = "bb:bible-lock-banner-dismissed";

/** A stand-in app icon: the shape and colour, none of the branding. */
function AppTile({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-[11px] text-base shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}

export default function BibleLockBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // Private window, blocked storage: show it, that is the safe side here.
    }
    void bibleLockStatus().then((status) => {
      // Already locking? Then this is just noise on top of a thing that works.
      if (!cancelled && !status.locked) setShow(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function dismiss() {
    setShow(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Not remembering the dismissal is survivable; failing to close is not.
    }
  }

  if (!show) return null;

  return (
    <section aria-labelledby="home-bible-lock-heading">
      <div className="relative overflow-hidden rounded-3xl border border-[#d7e6fb] bg-[#eaf2fd] px-4 py-4 shadow-sm sm:px-5 sm:py-5">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Hide this"
          className="absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded-full text-xs font-black text-[#7c93b5] transition hover:bg-white/70 hover:text-[#44566f]"
        >
          ✕
        </button>

        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* The lock tile */}
          <span
            aria-hidden
            className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-gradient-to-b from-[#5ea2f5] to-[#2f7fe8] text-2xl shadow-md shadow-[#2f7fe8]/25 sm:h-16 sm:w-16 sm:rounded-[20px] sm:text-3xl"
          >
            🔒
          </span>

          <div className="min-w-0 flex-1 pr-6 sm:pr-0">
            <h2
              id="home-bible-lock-heading"
              className="text-lg font-black leading-tight text-[var(--bb-text-primary,#0f1f3a)] sm:text-xl"
            >
              Bible Lock
            </h2>
            <p className="mt-0.5 text-sm font-semibold leading-snug text-[#5b7395]">
              Block distracting apps until you study the Bible.
            </p>
          </div>

          {/* Wide screens get the whole row the mockup shows. */}
          <div className="hidden items-center gap-2 lg:flex">
            <AppTile className="bg-[#111827] text-white">♪</AppTile>
            <AppTile className="bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">📷</AppTile>
            <AppTile className="bg-[#ff0033] text-white">▶</AppTile>
            <AppTile className="bg-white/80 text-[#7c93b5]">···</AppTile>
          </div>

          <Link
            href="/bible-lock"
            className="hidden shrink-0 rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-6 py-3 text-sm font-black text-white shadow-md shadow-[#2f7fe8]/25 transition hover:opacity-95 sm:block"
          >
            Set Up →
          </Link>
        </div>

        {/* On a phone the row cannot hold the button, so it takes its own line. */}
        <Link
          href="/bible-lock"
          className="mt-3.5 block w-full rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-5 py-2.5 text-center text-sm font-black text-white shadow-md shadow-[#2f7fe8]/25 transition hover:opacity-95 sm:hidden"
        >
          Set Up →
        </Link>
      </div>
    </section>
  );
}
