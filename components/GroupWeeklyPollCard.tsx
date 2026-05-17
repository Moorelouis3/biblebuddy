"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { WeeklyGroupPollOption } from "@/lib/groupWeeklyPoll";

type PollFeedSet = {
  id: string;
  group_id: string;
  options: WeeklyGroupPollOption[];
  intro: string | null;
  vote_counts: Record<string, number>;
  total_votes: number;
  current_user_vote: string | null;
};

type PollVoter = {
  user_id: string;
  display_name: string;
  profile_image_url: string | null;
};

export default function GroupWeeklyPollCard({
  pollSet,
  userId,
  compactResults = false,
  onOpen,
}: {
  pollSet: PollFeedSet;
  userId: string | null;
  compactResults?: boolean;
  onOpen?: () => void;
}) {
  const [currentVote, setCurrentVote] = useState<string | null>(pollSet.current_user_vote);
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>(pollSet.vote_counts);
  const [totalVotes, setTotalVotes] = useState<number>(pollSet.total_votes);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [votersByOption, setVotersByOption] = useState<Record<string, PollVoter[]>>({});

  useEffect(() => {
    let cancelled = false;

    async function loadVoters() {
      const { data: voteRows, error: voteError } = await supabase
        .from("weekly_group_poll_votes")
        .select("user_id, option_key, created_at")
        .eq("poll_id", pollSet.id)
        .order("created_at", { ascending: true });

      if (voteError || cancelled) return;

      const userIds = [...new Set((voteRows || []).map((row) => row.user_id).filter(Boolean))];
      const { data: profileRows } = userIds.length > 0
        ? await supabase
            .from("profile_stats")
            .select("user_id, display_name, username, profile_image_url")
            .in("user_id", userIds)
        : { data: [] as any[] };

      if (cancelled) return;

      const profileMap = new Map<string, PollVoter>();
      (profileRows || []).forEach((profile: any) => {
        profileMap.set(profile.user_id, {
          user_id: profile.user_id,
          display_name: profile.display_name || profile.username || "Buddy",
          profile_image_url: profile.profile_image_url || null,
        });
      });

      const nextMap: Record<string, PollVoter[]> = {};
      (voteRows || []).forEach((vote: any) => {
        nextMap[vote.option_key] ||= [];
        nextMap[vote.option_key].push(
          profileMap.get(vote.user_id) || {
            user_id: vote.user_id,
            display_name: "Buddy",
            profile_image_url: null,
          },
        );
      });

      setVotersByOption(nextMap);
    }

    void loadVoters();
    return () => {
      cancelled = true;
    };
  }, [pollSet.id, currentVote, totalVotes]);

  async function handleVote(optionKey: string) {
    if (compactResults && onOpen) {
      onOpen();
      return;
    }
    if (!userId || submitting) return;
    setSubmitting(optionKey);
    setError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch(`/api/groups/${pollSet.group_id}/weekly-poll/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          pollId: pollSet.id,
          optionKey,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not save your vote.");
      }

      setCurrentVote(payload.currentVote || optionKey);
      setVoteCounts(payload.voteCounts || {});
      setTotalVotes(typeof payload.totalVotes === "number" ? payload.totalVotes : 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your vote.");
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <div
      role={compactResults && onOpen ? "button" : undefined}
      tabIndex={compactResults && onOpen ? 0 : undefined}
      onClick={(event) => {
        event.stopPropagation();
        if (compactResults && onOpen) onOpen();
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (compactResults && onOpen && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen();
        }
      }}
      className={`rounded-2xl border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-4 ${compactResults && onOpen ? "cursor-pointer" : ""}`}
    >
      {pollSet.intro ? <p className="text-sm leading-relaxed text-[var(--bb-text-secondary,#4b5563)]">{pollSet.intro}</p> : null}
      <div className="mt-4 space-y-2.5">
        {pollSet.options.map((option) => {
          const count = voteCounts[option.key] || 0;
          const percent = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const selected = currentVote === option.key;
          const voters = votersByOption[option.key] || [];

          return (
            <button
              key={option.key}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                void handleVote(option.key);
              }}
              disabled={!userId || !!submitting}
              className={`relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition ${
                selected
                  ? "border-[var(--bb-accent)] bg-[var(--bb-accent-soft)]"
                  : "border-[var(--bb-card-border)] bg-[var(--bb-card)] hover:border-[var(--bb-accent)] hover:bg-[var(--bb-surface)]"
              } disabled:opacity-70`}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-r-xl bg-[var(--bb-accent-soft)] transition-all"
                style={{ width: `${currentVote ? percent : 0}%`, opacity: currentVote ? 1 : 0 }}
              />

              <div className="relative flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--bb-text-primary,#111827)]">{option.text}</p>
                  {currentVote ? (
                    <p className="mt-1 text-xs text-[var(--bb-text-secondary,#6b7280)]">
                      {count} vote{count === 1 ? "" : "s"}{selected ? " / your vote" : ""}
                    </p>
                  ) : null}
                </div>
                {currentVote ? <span className="text-xs font-semibold text-[var(--bb-text-secondary,#4b5563)]">{percent}%</span> : null}
              </div>

              {currentVote && voters.length ? (
                <div className="relative mt-3 flex items-center gap-1">
                  {voters.slice(0, compactResults ? 3 : 5).map((voter) => (
                    <div
                      key={voter.user_id}
                      title={voter.display_name}
                      className="h-7 w-7 overflow-hidden rounded-full border-2 border-[var(--bb-card,#ffffff)] bg-[var(--bb-surface-soft,#efe7db)]"
                    >
                      {voter.profile_image_url ? (
                        <img src={voter.profile_image_url} alt={voter.display_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-[var(--bb-accent,#8d5d38)]">
                          {voter.display_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  ))}
                  {voters.length > (compactResults ? 3 : 5) ? (
                    <span className="ml-1 text-[11px] font-semibold text-[var(--bb-text-secondary,#6b7280)]">
                      +{voters.length - (compactResults ? 3 : 5)}
                    </span>
                  ) : null}
                  {compactResults ? (
                    <span className="ml-2 text-[11px] font-semibold text-[var(--bb-text-secondary,#6b7280)]">
                      Open post to see all
                    </span>
                  ) : null}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-[var(--bb-text-secondary,#6b7280)]">
        {currentVote ? `${totalVotes} total vote${totalVotes === 1 ? "" : "s"} so far.` : "Vote in the poll and then share your reason in the comments."}
      </p>
      {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
