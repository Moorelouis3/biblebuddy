"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { BADGE_TONE_CLASSES, type BadgeTone } from "@/lib/achievementBadges";
import { BADGE_ANNOUNCE_VISIBLE_MS } from "@/lib/badgeAnnouncements";

/**
 * "You earned a badge": one small card, for one badge, shown once.
 *
 * It appears when GET /api/points/summary reports badgeUnlocked. A badge
 * unlocks at most once every two hours, so there is never a stack of these.
 * The server goes on reporting a fresh unlock for ten minutes, in case the
 * first reply was lost, so the app keeps a note of which badges this device
 * has already announced: claimBadgeAnnouncement() in
 * lib/badgeAnnouncements.ts. Ask it before showing one.
 *
 * Deliberately not a modal. It does not dim the page, trap focus or need to be
 * dismissed before the reader can carry on: it sits above the bottom nav, says
 * what was earned, and leaves on its own. A level-up is the loud moment; a
 * badge is a quiet one.
 *
 * Portalled to <body> because the dashboard is laid out inside a track with a
 * CSS transform, and a transformed ancestor makes position: fixed measure from
 * that ancestor instead of the screen - which put modals thousands of pixels
 * off-screen there before.
 */

export type UnlockedBadge = {
  id: string;
  title: string;
  emoji: string;
  tone: BadgeTone;
  description: string;
  xp: number;
};

export default function BadgeUnlockedToast({
  badge,
  onDismiss,
  /** Hide the link when the reader is already on the levels page. */
  showLink = true,
}: {
  badge: UnlockedBadge;
  onDismiss: () => void;
  showLink?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(onDismiss, BADGE_ANNOUNCE_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [onDismiss, badge.id]);

  if (!mounted) return null;
  const tone = BADGE_TONE_CLASSES[badge.tone] ?? BADGE_TONE_CLASSES.gold;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-3 sm:bottom-8">
      <style>{`@keyframes bb-badge-rise{0%{transform:translateY(18px) scale(.96);opacity:0}100%{transform:translateY(0) scale(1);opacity:1}}`}</style>
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-3xl border p-4 shadow-xl motion-safe:animate-[bb-badge-rise_420ms_ease-out] ${tone.tile} ${tone.glow}`}
      >
        <span className="text-4xl leading-none" aria-hidden>
          {badge.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] opacity-70">Badge earned</p>
          <p className="text-lg font-black leading-tight">{badge.title}</p>
          <p className="mt-1 text-sm leading-snug">{badge.description}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-black">
            <span>+{badge.xp} XP</span>
            {showLink ? (
              <Link href="/levels" onClick={onDismiss} className="underline" style={{ color: "inherit" }}>
                See your badges
              </Link>
            ) : null}
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Close"
          className="-mr-1 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-black opacity-70 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current"
        >
          ×
        </button>
      </div>
    </div>,
    document.body,
  );
}
