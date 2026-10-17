"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
  /**
   * Whether the apps are shielded right now.
   *
   * This strip used to be one thing: an invitation to set up a feature. Louis,
   * 2026-10-17, with eleven apps already locked: "the Bible Lock came up again
   * even when 11 apps are locked already - it should say unlock your phone by
   * completing a Bible Buddy task. This is wrong."
   *
   * He is right. Once the lock is on, the only thing worth saying is what gets
   * the phone back.
   */
  const [locked, setLocked] = useState(false);

  const read = useCallback(async () => {
    const status = await bibleLockStatus();
    // supported is false on the website, on Android, on iOS 15 and in any
    // installed build without the plugin, so the strip only exists where the
    // lock does.
    if (!status.supported) {
      setShow(false);
      return;
    }
    setLocked(status.locked);
    // The locked state always shows: dismissing an invitation is fair, but
    // somebody whose apps are shielded should always be able to see why.
    if (status.locked) {
      setShow(true);
      return;
    }
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // Private window, blocked storage: show it, that is the safe side here.
    }
    setShow(true);
  }, []);

  useEffect(() => {
    void read();
    // The lock lifts while the app is open, and comes back the next morning,
    // so the strip re-reads whenever the app comes back to the front.
    const onVisible = () => {
      if (document.visibilityState === "visible") void read();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("bb:bible-lock-lifted", read);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("bb:bible-lock-lifted", read);
    };
  }, [read]);

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
      {/* One line, at the very top of the dashboard, above the greeting
          (Louis, 2026-10-17: "like a lil banner strip there so people don't
          miss it"). It sits above everything, so it has to earn very little
          height - the full version of this pitch is the page it opens. */}
      <div className="flex items-center gap-3 rounded-2xl border border-[#d7e6fb] bg-[#eaf2fd] px-3 py-2.5 shadow-sm sm:gap-3.5 sm:px-4">
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-[#5ea2f5] to-[#2f7fe8] text-base shadow-sm shadow-[#2f7fe8]/25 sm:h-10 sm:w-10 sm:text-lg"
        >
          🔒
        </span>

        <div className="min-w-0 flex-1">
          <h2
            id="home-bible-lock-heading"
            className="text-sm font-black leading-tight text-[var(--bb-text-primary,#0f1f3a)] sm:text-base"
          >
            {locked ? "Apps locked" : "Bible Lock"}
          </h2>
          {/* The full line truncates on a 375px phone once the lock and the
              button have taken their share, and a sentence cut mid-word reads
              worse than a shorter one. */}
          <p className="truncate text-xs font-semibold leading-snug text-[#5b7395] sm:text-[13px]">
            {locked ? (
              "Finish a Bible Buddy task to unlock them."
            ) : (
              <>
                <span className="sm:hidden">Block apps until you read.</span>
                <span className="hidden sm:inline">Block distracting apps until you study the Bible.</span>
              </>
            )}
          </p>
        </div>

        {/* Room for the tiles only where there is room, and none of it is
            worth saying once the apps are already shielded. */}
        <div className={`items-center gap-1.5 ${locked ? "hidden" : "hidden lg:flex"}`}>
          <AppTile className="bg-[#111827] text-white">♪</AppTile>
          <AppTile className="bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">📷</AppTile>
          <AppTile className="bg-[#ff0033] text-white">▶</AppTile>
        </div>

        <Link
          href={locked ? "/reading" : "/bible-lock"}
          className="shrink-0 rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-3.5 py-2 text-xs font-black text-white shadow-sm shadow-[#2f7fe8]/25 transition hover:opacity-95 sm:px-5 sm:text-sm"
        >
          {locked ? "Read now →" : "Set Up →"}
        </Link>

        {/* No hiding it while the apps are shielded: somebody looking at a
            locked phone should always be able to find out why. */}
        {locked ? null : (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Hide this"
            className="hidden h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-black text-[#7c93b5] transition hover:bg-white/70 hover:text-[#44566f] sm:grid"
          >
            ✕
          </button>
        )}
      </div>
    </section>
  );
}
