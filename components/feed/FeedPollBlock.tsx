"use client";

/**
 * The week's poll, drawn inside its own feed post.
 *
 * Louis, 2026-10-19: "the poll should be a full poll on the feed and it should
 * connect to it". The popup asks the same question and writes the same vote,
 * so whichever way somebody answers, there is one set of results and one place
 * to talk about it - the comments under this post.
 *
 * The poll itself is the row the weekly bank already produces; a post carries
 * its id in link_url (see lib/weeklyFeedPosts.ts).
 */

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { WeeklyGroupPollOption } from "@/lib/groupWeeklyPoll";

type PollRow = {
  id: string;
  group_id: string;
  question: string;
  options: WeeklyGroupPollOption[];
};

export default function FeedPollBlock({ pollId, userId }: { pollId: string; userId: string | null }) {
  const [poll, setPoll] = useState<PollRow | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

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

      const { data: votes } = await supabase
        .from("weekly_group_poll_votes")
        .select("user_id, option_key")
        .eq("poll_id", pollId);
      if (cancelled) return;

      const tally: Record<string, number> = {};
      for (const vote of votes || []) tally[vote.option_key] = (tally[vote.option_key] || 0) + 1;
      setCounts(tally);
      setTotal(votes?.length ?? 0);
      setMyVote(votes?.find((vote) => vote.user_id === userId)?.option_key ?? null);
    })();

    return () => {
      cancelled = true;
    };
  }, [pollId, userId]);

  const vote = useCallback(
    async (optionKey: string) => {
      if (!poll || myVote || busy) return;
      setBusy(optionKey);
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) return;
        const res = await fetch(`/api/groups/${poll.group_id}/weekly-poll/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ pollId: poll.id, optionKey }),
        });
        if (!res.ok) return;
        setMyVote(optionKey);
        setCounts((prev) => ({ ...prev, [optionKey]: (prev[optionKey] || 0) + 1 }));
        setTotal((prev) => prev + 1);
      } catch {
        // A vote that does not land leaves the options up rather than lying.
      } finally {
        setBusy(null);
      }
    },
    [busy, myVote, poll],
  );

  if (!poll) return null;

  return (
    <div className="mt-3 space-y-2">
      {poll.options.map((option) => {
        const count = counts[option.key] || 0;
        const share = total > 0 ? Math.round((count / total) * 100) : 0;
        const chosen = myVote === option.key;
        return (
          <button
            key={option.key}
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
              {myVote ? <span className="text-xs font-bold text-[#2f7fe8]">{share}%</span> : null}
            </span>
          </button>
        );
      })}
      <p className="pt-0.5 text-xs text-gray-400">
        {total === 0
          ? "Be the first to answer"
          : `${total} ${total === 1 ? "answer" : "answers"}${myVote ? " · thanks for voting" : ""}`}
      </p>
    </div>
  );
}
