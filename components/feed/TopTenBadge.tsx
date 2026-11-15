"use client";

/**
 * A small "Top 10" badge beside the name of anybody in this week's top ten
 * (Louis, 2026-11-15: "can we give the top 10 members a lil badge also").
 *
 * It is not a new ranking. It reads the board the Top Buddies card at the top
 * of the feed already shows - /api/groups/<community>/top-buddies, same
 * eligibility, same scoring - and marks whoever is in its first ten. So the
 * badge and the card can never disagree, and it moves by itself as the board
 * does: nobody is handed it and nobody has to take it away.
 *
 * (There is also a stored "Top Buddy" label Louis can give by hand. That one
 * is a decision; this one is arithmetic.)
 *
 * One request for the whole page, kept for ten minutes like the board itself.
 * If the board cannot be read, no badge is shown and the next page tries again.
 */

import { useEffect, useRef, useState } from "react";
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
        if (id) ranks.set(id, row.rank ?? index + 1);
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

export default function TopTenBadge({ userId, className = "" }: { userId: string; className?: string }) {
  const [rank, setRank] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadTopTen().then((ranks) => {
      if (!cancelled) setRank(ranks.get(userId) ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!open) return;
    const outside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [open]);

  if (!rank || rank > 10) return null;

  return (
    <span ref={rootRef} className={`relative inline-flex ${className}`.trim()}>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen((was) => !was);
        }}
        aria-label={`Number ${rank} on this week's Top Buddies`}
        className="inline-flex items-center gap-1 rounded-full bg-[#fdf2cd] px-2 py-0.5 text-xs font-bold text-[#8a6a00] transition hover:opacity-90"
      >
        <span aria-hidden="true">🏆</span>
        <span>Top 10</span>
      </button>
      {open ? (
        <span className="absolute left-0 top-full z-30 mt-2 block w-60 rounded-2xl border border-[#f2dd9a] bg-[#fffaf0] p-3 text-left shadow-xl">
          <span className="block text-sm font-semibold text-gray-900">#{rank} this week</span>
          <span className="mt-1 block text-xs leading-5 text-gray-600">
            One of the ten most active Bible Buddies this week. The board is at the top of the feed and changes as people study.
          </span>
        </span>
      ) : null}
    </span>
  );
}
