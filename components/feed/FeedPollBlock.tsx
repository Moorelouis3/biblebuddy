"use client";

/**
 * The week's poll, drawn inside its own feed post.
 *
 * Louis, 2026-10-19: "the poll should be a full poll on the feed and it should
 * connect to it". The popup asks the same question and writes the same vote,
 * so whichever way somebody answers, there is one set of results and one place
 * to talk about it - the comments under this post.
 *
 * And the results say who voted for what, the way the group poll card already
 * does it (Louis, same day: "the results should show who voted what"): faces
 * under each answer once you have voted yourself, and a See who voted toggle
 * that spells out every name.
 *
 * The poll itself is the row the weekly bank already produces; a post carries
 * its id in link_url (see lib/weeklyFeedPosts.ts).
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { WeeklyGroupPollOption } from "@/lib/groupWeeklyPoll";

type PollRow = {
  id: string;
  group_id: string;
  question: string;
  options: WeeklyGroupPollOption[];
};

type Voter = {
  user_id: string;
  display_name: string;
  profile_image_url: string | null;
};

/** How many faces fit on one line before the rest become a +N. */
const FACES_SHOWN = 5;

function VoterFace({ voter, size = "h-7 w-7" }: { voter: Voter; size?: string }) {
  return (
    <span
      title={voter.display_name}
      className={`${size} -ml-1.5 inline-flex shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#eaf2ff] first:ml-0`}
    >
      {voter.profile_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={voter.profile_image_url} alt={voter.display_name} className="h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-[#2f7fe8]">
          {voter.display_name.charAt(0).toUpperCase()}
        </span>
      )}
    </span>
  );
}

export default function FeedPollBlock({ pollId, userId }: { pollId: string; userId: string | null }) {
  const [poll, setPoll] = useState<PollRow | null>(null);
  const [voters, setVoters] = useState<Record<string, Voter[]>>({});
  const [total, setTotal] = useState(0);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [showNames, setShowNames] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * `justVoted` is the option this person has just chosen, if they have.
   *
   * Without it this reload could UNDO a vote that had been saved perfectly
   * well (Louis, 2026-10-25: "the poll question doesn't accept my vote when
   * I use my burner account"). The row was in the table every time; the vote
   * came back from the server, this read ran a moment later, and anything
   * that stopped it seeing the new row - a read that lands before the write
   * is visible, a read that comes back empty - set myVote to null and put
   * the unanswered options straight back on screen. Clicking again just
   * rewrote the same row, so it never looked any different.
   *
   * The popup asking the same question never had this, because it sets the
   * answer and stops. Now so does this: the reload may add other people's
   * faces, and may not take your own answer away.
   */
  const loadVotes = useCallback(async (justVoted?: string) => {
    const { data: votes } = await supabase
      .from("weekly_group_poll_votes")
      .select("user_id, option_key, created_at")
      .eq("poll_id", pollId)
      .order("created_at", { ascending: true });
    if (!votes) return;

    const ids = [...new Set(votes.map((vote) => vote.user_id).filter(Boolean))];
    const { data: profiles } = ids.length
      ? await supabase
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url")
          .in("user_id", ids)
      : { data: [] };

    const byId = new Map<string, Voter>();
    for (const profile of profiles || []) {
      byId.set(profile.user_id, {
        user_id: profile.user_id,
        display_name: profile.display_name || profile.username || "Buddy",
        profile_image_url: profile.profile_image_url || null,
      });
    }

    const next: Record<string, Voter[]> = {};
    for (const vote of votes) {
      (next[vote.option_key] ||= []).push(
        byId.get(vote.user_id) || { user_id: vote.user_id, display_name: "Buddy", profile_image_url: null },
      );
    }

    setVoters(next);
    setTotal(votes.length);
    setMyVote(votes.find((vote) => vote.user_id === userId)?.option_key ?? justVoted ?? null);
  }, [pollId, userId]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { data: row } = await supabase
        .from("weekly_group_polls")
        .select("id, group_id, question, options")
        .eq("id", pollId)
        .maybeSingle();
      if (cancelled || !row) return;
      setPoll(row as PollRow);
      await loadVotes();
    })();

    return () => {
      cancelled = true;
    };
  }, [loadVotes, pollId]);

  const vote = useCallback(
    async (optionKey: string) => {
      if (!poll || myVote || busy) return;
      setBusy(optionKey);
      setError(null);
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) {
          setError("Sign in again to answer this one.");
          return;
        }
        const res = await fetch(`/api/groups/${poll.group_id}/weekly-poll/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ pollId: poll.id, optionKey }),
        });
        if (!res.ok) {
          // Say so. This used to return in silence, so a poll that was
          // refusing votes looked exactly like a poll being ignored, and
          // there was nothing on screen or in the console to tell anyone
          // which it was.
          const detail = (await res.json().catch(() => null)) as { error?: string } | null;
          setError(detail?.error || "That did not save. Try again in a moment.");
          return;
        }
        // Reload so the new face appears with everyone else's and the counts
        // cannot drift apart - but tell it what was just chosen, so a read
        // that misses the fresh row cannot take the answer back off screen.
        setMyVote(optionKey);
        await loadVotes(optionKey);
      } catch {
        setError("That did not save. Try again in a moment.");
      } finally {
        setBusy(null);
      }
    },
    [busy, loadVotes, myVote, poll],
  );

  const anyNames = useMemo(() => Object.values(voters).some((list) => list.length > 0), [voters]);

  if (!poll) return null;

  return (
    <div className="mt-3 space-y-2">
      {poll.options.map((option) => {
        const list = voters[option.key] || [];
        const count = list.length;
        const share = total > 0 ? Math.round((count / total) * 100) : 0;
        const chosen = myVote === option.key;
        return (
          <div key={option.key}>
            <button
              type="button"
              disabled={Boolean(myVote) || Boolean(busy) || !userId}
              onClick={() => void vote(option.key)}
              className={`relative w-full overflow-hidden rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
                chosen
                  ? "border-[#2f7fe8] text-gray-900"
                  : myVote
                    ? "border-gray-200 text-gray-500"
                    : "border-gray-200 text-gray-800 hover:border-[#2f7fe8] hover:bg-[#f5f9ff]"
              }`}
            >
              {myVote ? (
                <span aria-hidden className="absolute inset-y-0 left-0 bg-[#eaf2ff]" style={{ width: `${share}%` }} />
              ) : null}
              <span className="relative flex items-center justify-between gap-3">
                <span>{option.text}</span>
                {myVote ? (
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {/* The faces of the people who picked this one. */}
                    {count > 0 ? (
                      <span className="flex items-center">
                        {list.slice(0, FACES_SHOWN).map((voter) => (
                          <VoterFace key={voter.user_id} voter={voter} size="h-6 w-6" />
                        ))}
                        {count > FACES_SHOWN ? (
                          <span className="ml-1 text-[11px] font-semibold text-gray-500">
                            +{count - FACES_SHOWN}
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                    <span className="text-xs font-bold text-[#2f7fe8]">{share}%</span>
                  </span>
                ) : null}
              </span>
            </button>

            {/* Every name, once somebody asks for them. */}
            {myVote && showNames && count > 0 ? (
              <p className="mt-1 px-1 text-xs leading-relaxed text-gray-500">
                {list
                  .map((voter) => (voter.user_id === userId ? "You" : voter.display_name))
                  .join(", ")}
              </p>
            ) : null}
          </div>
        );
      })}

      {error ? (
        <p role="status" className="px-1 text-xs font-semibold text-[#b42318]">
          {error}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-0.5">
        <p className="text-xs text-gray-400">
          {total === 0
            ? "Be the first to answer"
            : `${total} ${total === 1 ? "answer" : "answers"}${myVote ? " · thanks for voting" : ""}`}
        </p>
        {myVote && anyNames ? (
          <button
            type="button"
            onClick={() => setShowNames((prev) => !prev)}
            className="text-xs font-semibold text-[#2f7fe8] transition hover:underline"
          >
            {showNames ? "Hide names" : "See who voted"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
