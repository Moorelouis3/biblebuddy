"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type VideoHelpfulPollProps = {
  userId?: string | null;
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  videoContext: "bible_year" | "bible_topics";
  mediaType?: "video" | "audio";
};

export default function VideoHelpfulPoll({
  userId,
  videoId,
  videoTitle,
  videoUrl,
  videoContext,
  mediaType = "video",
}: VideoHelpfulPollProps) {
  const [vote, setVote] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [dismissState, setDismissState] = useState<"visible" | "puffing" | "hidden">("visible");
  const storageKey = userId && videoId ? `bb:${mediaType}-helpful-vote:${userId}:${videoId}` : null;
  const mediaLabel = mediaType === "audio" ? "audio" : "video";

  useEffect(() => {
    const hasLocalVote = Boolean(storageKey && typeof window !== "undefined" && window.localStorage.getItem(storageKey));
    const resetTimer = window.setTimeout(() => {
      setDismissState(hasLocalVote ? "hidden" : "visible");
      setMessage(null);
      if (!userId || !videoId) setVote(null);
    }, 0);

    if (!userId || !videoId) {
      return () => window.clearTimeout(resetTimer);
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
      const savedVote = data?.helpful === true ? true : data?.helpful === false ? false : null;
      setVote(savedVote);
      if (savedVote !== null) {
        if (storageKey && typeof window !== "undefined") window.localStorage.setItem(storageKey, savedVote ? "yes" : "no");
        setDismissState("hidden");
      }
    }

    void loadVote();
    return () => {
      cancelled = true;
      window.clearTimeout(resetTimer);
    };
  }, [storageKey, userId, videoId]);

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
      if (storageKey && typeof window !== "undefined") window.localStorage.setItem(storageKey, nextVote ? "yes" : "no");
      setMessage(`Thanks. That helps us improve ${mediaLabel}.`);
      window.setTimeout(() => setDismissState("puffing"), 620);
      window.setTimeout(() => setDismissState("hidden"), 1280);
    }

    setSaving(false);
  }

  if (dismissState === "hidden") return null;

  function renderThumbIcon(kind: "up" | "down") {
    if (kind === "up") {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path d="M10 11V5.8c0-.9.3-1.7.9-2.4l.9-1.1c.3-.4.9-.4 1.3-.1.2.2.4.5.4.8v2.8h4.2c1 0 1.8.9 1.6 1.9l-1.1 7c-.1.8-.8 1.4-1.6 1.4H10m0-5H6.8c-.4 0-.8.4-.8.8v5.4c0 .4.4.8.8.8H10V11Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M14 13v5.2c0 .9-.3 1.7-.9 2.4l-.9 1.1c-.3.4-.9.4-1.3.1-.2-.2-.4-.5-.4-.8v-2.8H6.3c-1 0-1.8-.9-1.6-1.9l1.1-7c.1-.8.8-1.4 1.6-1.4H14m0 5h3.2c.4 0 .8-.4.8-.8V6.8c0-.4-.4-.8-.8-.8H14V13Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <div
      className={`video-helpful-poll relative mt-3 overflow-hidden rounded-2xl border px-3 py-3 ${
        mediaType === "audio"
          ? "mx-auto max-w-[430px] border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_78%,transparent)] bg-[color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_62%,transparent)]"
          : "border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_78%,transparent)] bg-[color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_62%,transparent)]"
      } ${
        dismissState === "puffing" ? "video-helpful-poll-puff" : ""
      }`}
    >
      <style jsx>{`
        @keyframes video-helpful-poll-collapse {
          0% { opacity: 1; transform: scale(1); max-height: 140px; margin-top: 0.75rem; filter: blur(0); }
          55% { opacity: 0.92; transform: scale(0.96); max-height: 140px; filter: blur(0.5px); }
          100% { opacity: 0; transform: scale(0.62); max-height: 0; margin-top: 0; padding-top: 0; padding-bottom: 0; filter: blur(5px); }
        }
        @keyframes video-helpful-smoke {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); filter: blur(0); }
          18% { opacity: 0.76; }
          100% { opacity: 0; transform: translate(calc(-50% + var(--smoke-x)), calc(-50% + var(--smoke-y))) scale(1.55); filter: blur(7px); }
        }
        .video-helpful-poll-puff {
          animation: video-helpful-poll-collapse 680ms ease-in forwards;
          transform-origin: center;
        }
        .video-helpful-poll-puff .video-helpful-smoke span {
          animation: video-helpful-smoke 760ms ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .video-helpful-poll-puff { animation-duration: 1ms; }
          .video-helpful-poll-puff .video-helpful-smoke span { animation-duration: 1ms; }
        }
      `}</style>
      {dismissState === "puffing" ? (
        <div className="video-helpful-smoke pointer-events-none absolute left-1/2 top-1/2 z-10" aria-hidden="true">
          <span className="absolute h-12 w-12 rounded-full bg-slate-200/60 [--smoke-x:-72px] [--smoke-y:-20px]" />
          <span className="absolute h-10 w-10 rounded-full bg-white/70 [--smoke-x:62px] [--smoke-y:-24px]" />
          <span className="absolute h-9 w-9 rounded-full bg-slate-300/45 [--smoke-x:-18px] [--smoke-y:42px]" />
          <span className="absolute h-8 w-8 rounded-full bg-slate-200/55 [--smoke-x:82px] [--smoke-y:30px]" />
          <span className="absolute h-7 w-7 rounded-full bg-white/75 [--smoke-x:-90px] [--smoke-y:34px]" />
        </div>
      ) : null}
      <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${mediaType === "audio" ? "sm:justify-between" : "sm:justify-between"}`}>
        {mediaType === "audio" ? (
          <div className="text-left">
            <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">Was this audio helpful?</p>
            <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#4b5563)]">Your feedback helps us improve.</p>
          </div>
        ) : (
          <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">
            Was this {mediaLabel} helpful?
          </p>
        )}
        <div className={`grid grid-cols-2 gap-2 ${mediaType === "audio" ? "sm:w-[164px]" : "sm:w-40"}`}>
          {[
            { label: "Yes", value: true, icon: "up" as const },
            { label: "No", value: false, icon: "down" as const },
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
                    : mediaType === "audio"
                      ? "border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-card,#ffffff)] text-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                      : "border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-primary,#111827)] hover:border-[var(--bb-accent,#2f7fe8)]"
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {mediaType === "audio" ? renderThumbIcon(option.icon) : null}
                  <span>{option.label}</span>
                </span>
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
