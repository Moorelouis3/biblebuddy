"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import LevelUpCelebration from "./LevelUpCelebration";
import BadgeUnlockedToast, { type UnlockedBadge } from "./levels/BadgeUnlockedToast";
import { claimBadgeAnnouncement, endBadgeAnnouncement } from "../lib/badgeAnnouncements";

// The home-screen face of the points relaunch (2026-09-05): a compact
// purple stat card (same family as the streak and Bible % cards beside it)
// showing the level and points to the next one, plus the level-up
// celebration modal when /api/points/summary reports a new level.
//
// The celebration itself moved out to components/LevelUpCelebration.tsx on
// 2026-11-10 (the approved Golden Badge design). This component keeps the one
// job it always had - fetch the summary once per mount and paint the stat card
// - and renders the celebration as a child when the API says one is owed. No
// extra request: the popup rides this same response.

type PointsSummary = {
  totalPoints: number;
  level: number;
  levelName: string;
  identityText: string;
  encouragementText: string;
  progressPercent: number;
  pointsToNextLevel: number;
  nextLevelName: string | null;
  nextLevel: number | null;
  previousLevel: number | null;
  displayName: string | null;
  levelCelebrated: number | null;
  leveledUp: boolean;
  /** Set on the one response that unlocked a badge. Never cached. */
  badgeUnlocked?: UnlockedBadge | null;
};

const LEVEL_SNAPSHOT_PREFIX = "bb:level-summary:v1";

export default function LevelProgressCard() {
  const [summary, setSummary] = useState<PointsSummary | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<UnlockedBadge | null>(null);
  const dismissBadge = useCallback(() => {
    setUnlockedBadge((shown) => {
      if (shown) endBadgeAnnouncement(shown.id);
      return null;
    });
  }, []);

  /**
   * Dismiss, then tell the server it has been shown.
   *
   * The modal closes immediately and the acknowledgement is fire-and-forget: if
   * the POST fails the level simply stays owed and the popup appears again next
   * time, which is the right way round for this to fail. The write itself is a
   * monotonic high-water mark, so a retry cannot double-fire it.
   */
  const dismissCelebration = useCallback(async () => {
    setCelebrating(false);
    const level = summary?.level;
    if (!level) return;
    try {
      const sessionData = await supabase.auth.getSession();
      const accessToken = sessionData.data.session?.access_token;
      if (!accessToken) return;
      await fetch("/api/points/celebrated", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ level }),
      });
      setSummary((prev) => (prev ? { ...prev, levelCelebrated: level, leveledUp: false } : prev));
    } catch (error) {
      console.error("[LEVEL] Could not record celebration:", error);
    }
  }, [summary?.level]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const sessionData = await supabase.auth.getSession();
        const accessToken = sessionData.data.session?.access_token;
        const sessionUserId = sessionData.data.session?.user?.id;
        if (!accessToken || !sessionUserId) return;

        // Paint instantly from the last computed summary; the fresh numbers
        // replace it quietly when the API answers (Louis, 2026-09-06:
        // "at least get the card to load from last level saved").
        const snapshotKey = `${LEVEL_SNAPSHOT_PREFIX}:${sessionUserId}`;
        try {
          const raw = window.localStorage.getItem(snapshotKey);
          if (raw) {
            const cached = JSON.parse(raw) as PointsSummary;
            if (cached && typeof cached.level === "number" && !cancelled) {
              setSummary({ ...cached, leveledUp: false, badgeUnlocked: null });
            }
          }
        } catch {
          // A broken snapshot just means we wait for the API like before.
        }

        const response = await fetch("/api/points/summary", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!response.ok) return;
        const payload = (await response.json()) as PointsSummary;
        if (cancelled) return;
        setSummary(payload);
        if (payload.leveledUp) setCelebrating(true);
        if (payload.badgeUnlocked && claimBadgeAnnouncement(sessionUserId, payload.badgeUnlocked.id)) {
          setUnlockedBadge(payload.badgeUnlocked);
        }
        try {
          window.localStorage.setItem(snapshotKey, JSON.stringify({ ...payload, leveledUp: false, badgeUnlocked: null }));
        } catch {
          // Storage full or blocked - fine, next load just waits again.
        }
      } catch (error) {
        console.error("[LEVEL] Could not load points summary:", error);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!summary) return null;

  return (
    <>
      {/* Purple, same family as the Study Group card below. Compact enough
          that all three stat cards share one row on a phone.

          It is a link to /levels (2026-11-13). Until then it was a plain div:
          it looked like the two cards beside it, which do things, and did
          nothing when tapped. A real <a> rather than an onClick so it works
          with touch, mouse, keyboard, middle-click and a screen reader with
          no extra code, and so the browser's back button brings you here. */}
      <Link
        href="/levels"
        aria-label={`Level ${summary.level}, ${summary.levelName}. ${summary.nextLevelName ? `${summary.pointsToNextLevel.toLocaleString()} XP to the next level` : "Top level"}. Open your levels and badges.`}
        className="flex min-w-0 items-center gap-1.5 rounded-2xl border border-[#ddd6f3] px-2.5 py-2.5 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#6d5bd0] focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] sm:gap-2.5 sm:px-4 sm:py-3"
        style={{
          backgroundColor: "#f5f2ff",
          backgroundImage: "url(/home-cards/bg-group.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
        title={`Level ${summary.level} - ${summary.levelName} · ${summary.totalPoints.toLocaleString()} points`}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6d5bd0] text-[10px] font-black text-white shadow-sm sm:h-7 sm:w-7 sm:text-[11px]">
          L{summary.level}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-black leading-tight text-[#2b2150] sm:text-xl">Level {summary.level}</p>
          <p className="truncate text-[10px] font-bold text-[#7c68b4] sm:text-[11px]">
            {summary.nextLevelName ? `${summary.pointsToNextLevel.toLocaleString()} to next` : "Top level!"}
          </p>
        </div>
      </Link>

      {celebrating ? (
        <LevelUpCelebration
          level={summary.level}
          totalPoints={summary.totalPoints}
          pointsToNextLevel={summary.pointsToNextLevel}
          nextLevelName={summary.nextLevelName}
          progressPercent={summary.progressPercent}
          displayName={summary.displayName}
          onDismiss={() => void dismissCelebration()}
        />
      ) : null}

      {/* One badge, quietly, and only once the level-up (if this same request
          also raised the level) has been closed: never two things at once. */}
      {unlockedBadge && !celebrating ? <BadgeUnlockedToast badge={unlockedBadge} onDismiss={dismissBadge} /> : null}
    </>
  );
}
