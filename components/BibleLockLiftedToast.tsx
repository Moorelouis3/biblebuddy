"use client";

import { useEffect, useState } from "react";

/**
 * "Your phone is yours again" - said on whatever screen finished the reading.
 *
 * The dashboard strip can only speak when somebody is looking at the dashboard,
 * and nobody finishes a chapter there. Louis, 2026-10-17, after locking his
 * apps and reading Leviticus 22 in the reader: "it said locked, I finished a
 * chapter, no pop up, no new banner, no apps unlocked, nothing."
 *
 * Seven different screens can finish a chapter and more can finish a devotional
 * day, a trivia chapter or a reflection. Rather than teach each one to
 * celebrate, this listens once, at the top of the app, for the event every
 * unlock fires (see announceBibleLockLifted in lib/bibleLock.ts).
 *
 * It leaves on its own after six seconds, because it is news and not a dialog -
 * nothing is waiting on an answer, and a reader who is mid-chapter should not
 * have to dismiss anything to carry on.
 */

const VISIBLE_MS = 6000;

export default function BibleLockLiftedToast() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onLifted = () => {
      setShown(true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setShown(false), VISIBLE_MS);
    };

    window.addEventListener("bb:bible-lock-lifted", onLifted);
    return () => {
      window.removeEventListener("bb:bible-lock-lifted", onLifted);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!shown) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      // Above the tab bar, clear of the home indicator, and never under the
      // notch: the lock screens phones, so this is only ever read on one.
      className="pointer-events-none fixed inset-x-3 z-[70] flex justify-center"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)" }}
    >
      <div className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border border-[#bfe4cd] bg-[#eafaf0] px-4 py-3 shadow-lg shadow-[#15502f]/10">
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-[#58c98a] to-[#2f8f5b] text-base shadow-sm"
        >
          🔓
        </span>
        <div className="min-w-0">
          <p className="text-sm font-black leading-tight text-[#15502f]">Apps unlocked</p>
          <p className="text-xs font-semibold leading-snug text-[#3d7a57]">
            Today&apos;s reading is done. They lock again tomorrow.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShown(false)}
          aria-label="Hide this"
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-black text-[#5f9b7b] transition hover:bg-white/70 hover:text-[#15502f]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
