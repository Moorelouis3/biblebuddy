"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import LevelUpCelebration from "./LevelUpCelebration";

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
};

const LEVEL_SNAPSHOT_PREFIX = "bb:level-summary:v1";

export default function LevelProgressCard() {
  const [summary, setSummary] = useState<PointsSummary | null>(null);
  const [celebrating, setCelebrating] = useState(false);

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
              setSummary({ ...cached, leveledUp: false });
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
        try {
          window.localStorage.setItem(snapshotKey, JSON.stringify({ ...payload, leveledUp: false }));
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
          that all three stat cards share one row on a phone. */}
      <div
        className="flex min-w-0 items-center gap-1.5 rounded-2xl border border-[#ddd6f3] px-2.5 py-2.5 shadow-sm sm:gap-2.5 sm:px-4 sm:py-3"
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
      </div>

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
    </>
  );
}
