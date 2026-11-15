"use client";

/**
 * Where somebody stands in this week's top ten, or null (Louis, 2026-11-15).
 *
 * Anybody in the top ten shows the Top Buddy label, ahead of whatever label
 * they normally have, for as long as they are there. When they drop out they
 * go back to their own label, or to none. Nothing is stored and nothing has to
 * be taken away: it is read from the board each time (lib/userBadges.ts
 * decides what the label says; this only supplies the rank).
 *
 * It is not a new ranking. It reads the board the Top Buddies card at the top
 * of the feed already shows - /api/groups/<community>/top-buddies, same
 * eligibility, same scoring - so the label and the card can never disagree.
 *
 * One request for the whole page, kept for ten minutes like the board itself.
 * If the board cannot be read, nobody is shown as top ten (they keep their own
 * label) and the next page tries again.
 */

import { useEffect, useState } from "react";
import { COMMUNITY_GROUP_ID } from "../../lib/communityMilestones";
import { supabase } from "../../lib/supabaseClient";

const KEEP_MS = 10 * 60 * 1000;
let loadedAt = 0;
let pending: Promise<Map<string, number>> | null = null;

function loadTopTen(): Promise<Map<string, number>> {
  if (pending && Date.now() - loadedAt < KEEP_MS) return pending;
  loadedAt = Date.now();
  pending = (async () => {
    const ranks = new Map<string, number>();
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      // Absolute URL: inside the iOS app a relative fetch can hang forever.
      const response = await fetch(`${window.location.origin}/api/groups/${COMMUNITY_GROUP_ID}/top-buddies?mode=fast&limit=10`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!response.ok) throw new Error(String(response.status));
      const json = (await response.json()) as { buddies?: unknown[]; weeklyBuddies?: unknown[] };
      const rows = (json.buddies || json.weeklyBuddies || []) as { userId?: string; user_id?: string; rank?: number }[];
      rows.slice(0, 10).forEach((row, index) => {
        const id = row.userId || row.user_id;
        if (id) ranks.set(id, Math.min(row.rank ?? index + 1, 10));
      });
      if (!ranks.size) throw new Error("empty");
    } catch {
      // Not remembered: the next ask tries again.
      loadedAt = 0;
    }
    return ranks;
  })();
  return pending;
}

export function useTopTenRank(userId: string): number | null {
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setRank(null);
    void loadTopTen().then((ranks) => {
      if (!cancelled) setRank(ranks.get(userId) ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return rank;
}
