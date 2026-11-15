"use client";

/**
 * The tag and level beside a name on the feed (Louis, 2026-11-15: "the levels
 * and tags need to be shown on the feed also... like my teacher one and level").
 *
 * In order: the streak flame (a streak of 30 days or more, the same flame the
 * profile shows), the tag, the level, and Top 10 for anybody in this week's
 * top ten. The flame, tag and level are the components the profile and the
 * study comments already use - nothing new is drawn here, this only finds
 * out what to hand them. Top 10 is components/feed/TopTenBadge.tsx.
 *
 * The feed loads its authors in half a dozen different queries (posts, wall
 * posts, comments, new comments, the composer...), none of which ask for the
 * badge or the level. Rather than widen every one of them, each name asks
 * here, and the asks are gathered: every name that appears in the same moment
 * goes out as ONE request for all of them, and an answer is kept for the rest
 * of the page's life. A feed of fifty posts costs one small read, not fifty.
 *
 * A failed read shows no badges and is not remembered, so the next name to
 * ask tries again. It never shows a wrong badge.
 */

import { useEffect, useState } from "react";
import LevelBadge from "../LevelBadge";
import StreakFlameBadge from "../StreakFlameBadge";
import UserBadge from "../UserBadge";
import TopTenBadge from "./TopTenBadge";
import { supabase } from "../../lib/supabaseClient";

type Badges = {
  member_badge: string | null;
  is_paid: boolean | null;
  current_level: number | null;
  current_streak: number | null;
  selected_streak_flame: string | null;
  created_at: string | null;
};
const NONE: Badges = { member_badge: null, is_paid: null, current_level: null, current_streak: null, selected_streak_flame: null, created_at: null };

const known = new Map<string, Badges>();
const waiting = new Map<string, Set<(badges: Badges | null) => void>>();
let timer: ReturnType<typeof setTimeout> | null = null;

async function flush() {
  timer = null;
  const asked = new Map(waiting);
  waiting.clear();
  const ids = Array.from(asked.keys());
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100);
    const { data, error } = await supabase
      .from("profile_stats")
      .select("user_id, member_badge, is_paid, current_level, current_streak, selected_streak_flame, created_at")
      .in("user_id", batch);
    if (!error) {
      for (const id of batch) known.set(id, NONE);
      for (const row of data || []) {
        known.set(row.user_id as string, {
          member_badge: (row.member_badge as string | null) ?? null,
          is_paid: (row.is_paid as boolean | null) ?? null,
          current_level: (row.current_level as number | null) ?? null,
          current_streak: (row.current_streak as number | null) ?? null,
          selected_streak_flame: (row.selected_streak_flame as string | null) ?? null,
          created_at: (row.created_at as string | null) ?? null,
        });
      }
    }
    for (const id of batch) for (const tell of asked.get(id) || []) tell(known.get(id) ?? null);
  }
}

function ask(userId: string, tell: (badges: Badges | null) => void) {
  const listeners = waiting.get(userId) ?? new Set();
  listeners.add(tell);
  waiting.set(userId, listeners);
  if (!timer) timer = setTimeout(() => void flush(), 40);
  return () => {
    listeners.delete(tell);
  };
}

export default function AuthorBadges({ userId, className = "" }: { userId: string; className?: string }) {
  const [badges, setBadges] = useState<Badges | null>(() => known.get(userId) ?? null);

  useEffect(() => {
    const already = known.get(userId);
    if (already) {
      setBadges(already);
      return;
    }
    setBadges(null);
    return ask(userId, setBadges);
  }, [userId]);

  return (
    <span className={`inline-flex flex-wrap items-center gap-1 align-middle ${className}`.trim()}>
      {badges ? (
        <>
          <StreakFlameBadge currentStreak={badges.current_streak ?? 0} flameId={badges.selected_streak_flame ?? undefined} />
          <UserBadge customBadge={badges.member_badge} isPaid={badges.is_paid} joinedAt={badges.created_at} />
          <LevelBadge currentLevel={badges.current_level} />
        </>
      ) : null}
      <TopTenBadge userId={userId} />
    </span>
  );
}
