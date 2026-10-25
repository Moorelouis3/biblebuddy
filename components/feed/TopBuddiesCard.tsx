"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

/**
 * Top Buddies, at the top of the feed.
 *
 * The ranking is not new and is not touched here: this reads the same board
 * the group card has always read, /api/groups/<id>/top-buddies, with the same
 * eligibility, the same scoring and the same tie-breaks. The only change
 * underneath was the board stopping at ten people - a display decision that
 * had settled into the data layer - so twenty can be asked for.
 *
 * Compact by default, because the thing below it is the feed: five faces in
 * one row that fits a phone without scrolling sideways, and a control that
 * opens the same card out to twenty in place. No modal, no inner scroll box;
 * the list pushes the posts down and the page scrolls as one.
 */

const TOP_100_LIMIT = 100;
const PREVIEW_COUNT = 5;
const EXPANDED_COUNT = 20;

/** Ten minutes, matching the board's own cache, so toggling never refetches. */
const CACHE_MS = 10 * 60 * 1000;

type Buddy = {
  userId: string;
  rank: number;
  displayName: string | null;
  username: string | null;
  profileImageUrl: string | null;
};

type RawBuddy = {
  userId?: string;
  user_id?: string;
  rank?: number;
  displayName?: string | null;
  display_name?: string | null;
  username?: string | null;
  profileImageUrl?: string | null;
  profile_image_url?: string | null;
};

function normalise(rows: RawBuddy[]): Buddy[] {
  return rows
    .map((row, index) => ({
      userId: row.userId || row.user_id || "",
      rank: row.rank ?? index + 1,
      displayName: row.displayName ?? row.display_name ?? null,
      username: row.username ?? null,
      profileImageUrl: row.profileImageUrl ?? row.profile_image_url ?? null,
    }))
    .filter((row) => row.userId);
}

/** Gold, silver, bronze, then the quiet grey everybody else gets. */
function rankStyle(rank: number): { background: string; color: string; border: string } {
  if (rank === 1) return { background: "#fdf2cd", color: "#8a6a00", border: "#f2dd9a" };
  if (rank === 2) return { background: "#eef1f4", color: "#5b6672", border: "#dde3e9" };
  if (rank === 3) return { background: "#fae6d8", color: "#9a5527", border: "#f0d2bd" };
  return { background: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
}

function shortName(buddy: Buddy) {
  const full = (buddy.displayName || buddy.username || "Bible Buddy").trim();
  return full.split(/\s+/)[0] || full;
}

function fullName(buddy: Buddy) {
  return (buddy.displayName || buddy.username || "Bible Buddy").trim();
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Face({ buddy, size }: { buddy: Buddy; size: number }) {
  const name = fullName(buddy);
  if (buddy.profileImageUrl) {
    return (
      <img
        src={buddy.profileImageUrl}
        alt=""
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="flex items-center justify-center rounded-full font-black text-white"
      style={{ width: size, height: size, backgroundColor: "#2f7fe8", fontSize: size / 2.8 }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export default function TopBuddiesCard({
  groupId,
  /**
   * Rank only this person's buddies (Louis, 2026-10-25).
   *
   * The server does it, not this component. Filtering the top 100 here was
   * the first attempt and it only works for someone with thousands of
   * buddies: with five, almost none of them are in the global top 100, so
   * the board came back empty. ?buddiesOf= filters a much deeper ranking and
   * renumbers it, so it is a real leaderboard of your buddies rather than
   * the community board with people removed.
   */
  buddiesOf = null,
}: {
  groupId: string;
  buddiesOf?: string | null;
}) {
  const [buddies, setBuddies] = useState<Buddy[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const loadedAt = useRef(0);

  const load = useCallback(async () => {
    // Already have a board, and it is not stale: toggling must not refetch.
    if (buddies && Date.now() - loadedAt.current < CACHE_MS) return;
    setFailed(false);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token;
      const response = await fetch(`/api/groups/${groupId}/top-buddies?mode=fast&limit=${TOP_100_LIMIT}${buddiesOf ? `&buddiesOf=${buddiesOf}` : ""}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!response.ok) throw new Error(String(response.status));
      const json = await response.json();
      const rows = normalise((json.buddies || json.weeklyBuddies || []) as RawBuddy[]);
      /**
       * Empty means different things on the two boards.
       *
       * An empty COMMUNITY board is suspicious - thousands of people, a week
       * of activity, nobody on it - so that stays an error worth retrying.
       * An empty BUDDIES board is ordinary: someone with four buddies who all
       * had a quiet week. Treating that as a failure put "Top Buddies could
       * not load" in front of them, which is both wrong and alarming.
       */
      if (rows.length === 0 && !buddiesOf) throw new Error("empty");
      setBuddies(rows);
      loadedAt.current = Date.now();
    } catch {
      setFailed(true);
    }
  }, [groupId, buddies, buddiesOf]);

  useEffect(() => {
    void load();
    // Once, on mount. load() guards its own staleness.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (failed) {
    return (
      <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#f4dcc8] bg-[#fff3e6] px-4 py-3 shadow-sm">
        <p className="text-sm font-bold text-gray-500">Top Buddies could not load.</p>
        <button
          type="button"
          onClick={() => { setBuddies(null); loadedAt.current = 0; void load(); }}
          className="rounded-full border border-[#dbe7f4] px-3 py-1 text-xs font-black"
          style={{ color: "#2f7fe8" }}
        >
          Try again
        </button>
      </div>
    );
  }

  if (!buddies) {
    return (
      <div className="mb-3 rounded-2xl border border-[#f4dcc8] bg-[#fff3e6] p-4 shadow-sm" aria-busy="true">
        <div className="h-4 w-32 animate-pulse rounded bg-[#f3ddc6]" />
        <div className="mt-4 flex justify-between">
          {Array.from({ length: PREVIEW_COUNT }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 animate-pulse rounded-full bg-[#f3ddc6]" />
              <div className="h-2.5 w-10 animate-pulse rounded bg-[#f3ddc6]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // A buddies board with nobody on it: say so, rather than showing an empty
  // trophy card or the error above.
  if (buddiesOf && buddies.length === 0) {
    return (
      <div className="mb-3 rounded-2xl border border-[#f4dcc8] bg-[#fff3e6] px-4 py-3 shadow-sm">
        <p className="text-[15px] font-black text-[#5b3a21]">🏆 Top Buddies · yours</p>
        <p className="mt-1 text-sm font-medium text-[#8a6a4e]">
          None of your buddies have been active this week yet.
        </p>
      </div>
    );
  }

  const ranked = buddies;
  const listed = ranked.slice(0, showAll ? TOP_100_LIMIT : EXPANDED_COUNT);
  const preview = ranked.slice(0, PREVIEW_COUNT);

  return (
    <section
      aria-labelledby="top-buddies-heading"
      className="bb-community-panel relative mb-3 overflow-hidden rounded-2xl border border-[#f4dcc8] shadow-sm"
      style={{
        backgroundColor: "#fff3e6",
        backgroundImage: "url(/home-cards/bg-trivia.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "left bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 id="top-buddies-heading" className="flex items-center gap-2 px-4 pt-3 text-[15px] font-black text-[#5b3a21]">
        <span aria-hidden>🏆</span> {buddiesOf ? "Top Buddies · yours" : "Top Buddies"}
      </h2>

      {expanded ? (
        <ol className="mt-2">
          {listed.map((buddy) => {
            const style = rankStyle(buddy.rank);
            return (
              <li key={buddy.userId} className="border-t border-[#f4dcc8]/60 first:border-t-0">
                <Link
                  href={`/profile/${buddy.userId}`}
                  className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-white/50"
                >
                  <span
                    className="flex h-7 w-9 flex-shrink-0 items-center justify-center rounded-full border text-xs font-black"
                    style={{ backgroundColor: style.background, color: style.color, borderColor: style.border }}
                  >
                    #{buddy.rank}
                  </span>
                  <Face buddy={buddy} size={32} />
                  <span className="min-w-0 flex-1 truncate text-sm font-bold text-[#4a3524]">{fullName(buddy)}</span>
                  <span aria-hidden className="flex-shrink-0 text-gray-300">›</span>
                </Link>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="mt-3 flex items-start justify-between gap-1 px-3">
          {preview.map((buddy) => {
            const style = rankStyle(buddy.rank);
            return (
              <Link
                key={buddy.userId}
                href={`/profile/${buddy.userId}`}
                className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1 transition hover:bg-white/50"
              >
                <span className="relative">
                  <Face buddy={buddy} size={52} />
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border px-1.5 text-[10px] font-black"
                    style={{ backgroundColor: style.background, color: style.color, borderColor: style.border }}
                  >
                    #{buddy.rank}
                  </span>
                </span>
                <span className="mt-1 w-full truncate text-center text-xs font-black text-[#5b3a21]">
                  {shortName(buddy)}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-2 flex flex-col items-center gap-2 border-t border-[#f4dcc8]/60 px-4 py-2.5">
        <button
          type="button"
          onClick={() => { setExpanded((value) => !value); setShowAll(false); }}
          aria-expanded={expanded}
          aria-controls="top-buddies-heading"
          className="text-sm font-black transition"
          style={{ color: "#2f7fe8" }}
        >
          {expanded ? "Hide rankings ˄" : "View rankings ˅"}
        </button>

        {/* Top 100 opens here rather than on a rankings page: the only full
            board in the app is /admin/top-buddies, which is gated to Louis's
            own email, so a link would be a locked door for everybody else. */}
        {expanded && !showAll && ranked.length > EXPANDED_COUNT ? (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-sm font-black transition"
            style={{ color: "#2f7fe8" }}
          >
            View Top 100 →
          </button>
        ) : null}
      </div>
    </section>
  );
}
