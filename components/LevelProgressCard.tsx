"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// The home-screen face of the points relaunch (2026-09-05): a compact
// purple stat card (same family as the streak and Bible % cards beside it)
// showing the level and points to the next one, plus the level-up
// celebration modal when /api/points/summary reports a new level.

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
  leveledUp: boolean;
};

const LEVEL_SNAPSHOT_PREFIX = "bb:level-summary:v1";

export default function LevelProgressCard() {
  const [summary, setSummary] = useState<PointsSummary | null>(null);
  const [celebrating, setCelebrating] = useState(false);

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
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Level up"
        >
          <div className="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#6d5bd0] text-2xl font-black text-white shadow-lg">
              L{summary.level}
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-widest text-[#6d5bd0]">Level up!</p>
            <h2 className="mt-1 text-2xl font-black text-gray-950">{summary.levelName}</h2>
            <p className="mt-2 text-sm font-semibold text-gray-600">{summary.identityText}</p>
            <p className="mt-3 rounded-2xl bg-[#f5f2ff] px-4 py-3 text-sm font-bold text-gray-800">
              {summary.encouragementText}
            </p>
            <button
              type="button"
              onClick={() => setCelebrating(false)}
              className="mt-5 w-full rounded-2xl bg-gray-950 px-5 py-3 text-sm font-black transition hover:opacity-90"
              style={{ color: "#ffffff" }}
            >
              Keep going
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
