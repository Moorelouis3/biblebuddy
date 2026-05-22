"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type VideoHelpfulPollProps = {
  userId?: string | null;
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  videoContext: "bible_year" | "bible_topics";
};

export default function VideoHelpfulPoll({
  userId,
  videoId,
  videoTitle,
  videoUrl,
  videoContext,
}: VideoHelpfulPollProps) {
  const [vote, setVote] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !videoId) {
      setVote(null);
      return;
    }

    let cancelled = false;
    async function loadVote() {
      const { data, error } = await supabase
        .from("video_helpfulness_votes")
        .select("helpful")
        .eq("user_id", userId)
        .eq("video_id", videoId)
        .maybeSingle();

      if (cancelled || error) return;
      setVote(data?.helpful === true ? true : data?.helpful === false ? false : null);
    }

    void loadVote();
    return () => {
      cancelled = true;
    };
  }, [userId, videoId]);

  async function submitVote(nextVote: boolean) {
    if (!userId || saving) {
      setMessage("Sign in to vote.");
      return;
    }

    setSaving(true);
    setMessage(null);
    setVote(nextVote);

    const { error } = await supabase.from("video_helpfulness_votes").upsert(
      {
        user_id: userId,
        video_id: videoId,
        video_title: videoTitle,
        video_url: videoUrl,
        video_context: videoContext,
        helpful: nextVote,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,video_id" },
    );

    if (error) {
      console.warn("[VIDEO_HELPFULNESS] Could not save video helpfulness vote:", error);
      setMessage("Could not save that vote yet.");
    } else {
      setMessage("Thanks. That helps us improve videos.");
    }

    setSaving(false);
  }

  return (
    <div className="mt-3 rounded-2xl border border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_78%,transparent)] bg-[color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_62%,transparent)] px-3 py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">Was this video helpful?</p>
        <div className="grid grid-cols-2 gap-2 sm:w-40">
          {[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ].map((option) => {
            const active = vote === option.value;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => void submitVote(option.value)}
                disabled={saving}
                className={`rounded-xl border px-3 py-2 text-xs font-black transition disabled:cursor-wait disabled:opacity-70 ${
                  active
                    ? "border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-accent,#2f7fe8)] text-[var(--bb-button-text,#ffffff)] shadow-sm"
                    : "border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-primary,#111827)] hover:border-[var(--bb-accent,#2f7fe8)]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
      {message ? (
        <p className="mt-2 text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">{message}</p>
      ) : null}
    </div>
  );
}
