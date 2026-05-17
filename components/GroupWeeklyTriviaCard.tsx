"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { SeriesTriviaQuestion } from "@/lib/seriesContent";

type WeeklyGroupTriviaSet = {
  id: string;
  week_key: string;
  subject_title: string;
  intro: string | null;
  questions: SeriesTriviaQuestion[];
};

type ScoreRow = {
  user_id: string;
  score: number;
  total_questions: number;
  completed_at: string;
};

type LeaderboardEntry = ScoreRow & {
  display_name: string;
  profile_image_url: string | null;
};

export default function GroupWeeklyTriviaCard({
  triviaSet,
  userId,
  onAfterComplete,
  compactBoard = false,
}: {
  triviaSet: WeeklyGroupTriviaSet;
  userId: string | null;
  onAfterComplete?: () => void;
  compactBoard?: boolean;
}) {
  const questions = triviaSet.questions;
  const totalQuestions = questions.length;
  const [phase, setPhase] = useState<"start" | "quiz" | "done">("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedCorrectCount, setEarnedCorrectCount] = useState(0);
  const [savedScore, setSavedScore] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingBoard, setLoadingBoard] = useState(true);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  const currentQuestion = questions[currentIndex];
  const userCompleted = savedScore !== null;

  async function loadLeaderboard() {
    setLoadingBoard(true);
    const { data: scores } = await supabase
      .from("weekly_group_trivia_scores")
      .select("user_id, score, total_questions, completed_at")
      .eq("trivia_set_id", triviaSet.id)
      .order("score", { ascending: false })
      .order("completed_at", { ascending: true });

    const scoreRows = (scores || []) as ScoreRow[];
    if (scoreRows.length === 0) {
      setEntries([]);
      setLoadingBoard(false);
      return;
    }

    const userIds = [...new Set(scoreRows.map((row) => row.user_id))];
    const { data: profiles } = await supabase
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url")
      .in("user_id", userIds);

    const profileMap = new Map(
      (profiles || []).map((profile: any) => [
        profile.user_id,
        {
          display_name: profile.display_name || profile.username || "Buddy",
          profile_image_url: profile.profile_image_url ?? null,
        },
      ]),
    );

    setEntries(
      scoreRows.map((row) => ({
        ...row,
        display_name: profileMap.get(row.user_id)?.display_name || "Buddy",
        profile_image_url: profileMap.get(row.user_id)?.profile_image_url || null,
      })),
    );
    setLoadingBoard(false);
  }

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      if (userId) {
        const { data: existing } = await supabase
          .from("weekly_group_trivia_scores")
          .select("score")
          .eq("trivia_set_id", triviaSet.id)
          .eq("user_id", userId)
          .maybeSingle();

        if (!cancelled && typeof existing?.score === "number") {
          setSavedScore(existing.score);
          setScore(existing.score);
          setPhase("done");
        }
      }

      if (!cancelled) {
        await loadLeaderboard();
      }
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [triviaSet.id, userId]);

  const yourRank = useMemo(() => {
    if (!userId) return null;
    const index = entries.findIndex((entry) => entry.user_id === userId);
    return index >= 0 ? index + 1 : null;
  }, [entries, userId]);

  async function saveScore(finalScore: number) {
    if (!userId) return;
    setSaving(true);
    await supabase
      .from("weekly_group_trivia_scores")
      .upsert(
        {
          trivia_set_id: triviaSet.id,
          user_id: userId,
          score: finalScore,
          total_questions: totalQuestions,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "trivia_set_id,user_id" },
      );
    setSavedScore(finalScore);
    setScore(finalScore);
    setPhase("done");
    setSaving(false);
    if (earnedCorrectCount > 0) {
      const { triggerPoints } = await import("@/components/PointsPop");
      triggerPoints(earnedCorrectCount);
    }
    await loadLeaderboard();
    onAfterComplete?.();
  }

  async function handleSelect(label: "A" | "B" | "C" | "D") {
    if (revealed) return;
    const isCorrect = label === currentQuestion.correctAnswer;
    setSelected(label);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (userId) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const meta = (user?.user_metadata ?? {}) as Record<string, string | undefined>;
        const username =
          meta.firstName || meta.first_name || (user?.email ? user.email.split("@")[0] : null) || "User";

        const response = await fetch("/api/trivia-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect,
            book: `weekly_group_${triviaSet.id}`,
          }),
        });

        const payload = (await response.json().catch(() => ({}))) as { awardedPoint?: boolean };
        if (!response.ok) {
          console.error("[GROUP TRIVIA] Failed to record trivia answer:", payload);
        } else if (payload.awardedPoint) {
          setEarnedCorrectCount((current) => current + 1);
        }
      } catch (error) {
        console.error("[GROUP TRIVIA] Error recording trivia answer:", error);
      }
    }

    setRevealed(true);
  }

  function handleNext() {
    if (currentIndex >= totalQuestions - 1) {
      const finalScore = score;
      void saveScore(finalScore);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
    setRevealed(false);
  }

  function optionClasses(label: "A" | "B" | "C" | "D") {
    if (!revealed) return "border-[var(--bb-card-border)] bg-[var(--bb-card)] hover:border-[var(--bb-accent)] hover:bg-[var(--bb-surface)]";
    if (label === currentQuestion.correctAnswer) return "border-[var(--bb-accent)] bg-[var(--bb-accent-soft)]";
    if (label === selected && label !== currentQuestion.correctAnswer) return "border-[#d88b8b] bg-[#fff4f4]";
    return "border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] opacity-60";
  }

  return (
    <div
      className="rounded-2xl border border-[var(--bb-card-border)] bg-[var(--bb-surface)] p-4"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--bb-accent)]">Weekly Bible Trivia</p>
          <h3 className="mt-1 text-lg font-bold text-[var(--bb-text-primary,#111827)]">{triviaSet.subject_title}</h3>
          {triviaSet.intro && <p className="mt-2 text-sm leading-relaxed text-[var(--bb-text-secondary,#4b5563)]">{triviaSet.intro}</p>}
        </div>
        <span className="rounded-full bg-[var(--bb-accent-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--bb-accent)]">
          10 Questions
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--bb-card-border,#e9e2d8)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
        {phase === "start" && (
          <div className="text-center">
            <p className="text-sm text-[var(--bb-text-secondary,#4b5563)]">Jump into this week's group trivia, then see how your score stacks up on the board.</p>
            <button
              type="button"
              disabled={!userId}
              onClick={() => setPhase("quiz")}
              className="mt-4 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "var(--bb-accent)" }}
            >
              {userId ? "Start Trivia" : "Sign in to play"}
            </button>
          </div>
        )}

        {phase === "quiz" && currentQuestion && (
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--bb-text-muted,#9ca3af)]">
                Question {currentIndex + 1} of {totalQuestions}
              </p>
              <p className="text-xs font-semibold text-[var(--bb-accent)]">{score} correct</p>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-[var(--bb-progress-track)]">
              <div
                className="h-full rounded-full bg-[var(--bb-progress-fill)] transition-all"
                style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
              />
            </div>
            <p className="text-base font-semibold leading-snug text-[var(--bb-text-primary,#111827)]">{currentQuestion.question}</p>
            <div className="mt-4 space-y-2">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleSelect(option.label)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${optionClasses(option.label)}`}
                >
                  <span className="mr-2 font-bold text-[var(--bb-text-secondary,#374151)]">{option.label}.</span>
                  <span className="text-[var(--bb-text-primary,#1f2937)]">{option.text}</span>
                </button>
              ))}
            </div>

            {revealed && (
              <div className="mt-4">
                <div className="rounded-2xl border border-[var(--bb-card-border,#e4edf3)] bg-[var(--bb-surface-soft,#f5fbff)] px-4 py-3 text-sm leading-relaxed text-[var(--bb-text-secondary,#466274)]">
                  <span className="font-semibold">Explanation:</span> {currentQuestion.explanation}
                </div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleNext}
                  className="mt-3 w-full rounded-xl px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "var(--bb-accent)" }}
                >
                  {saving
                    ? "Saving..."
                    : currentIndex >= totalQuestions - 1
                      ? "Finish & See Board"
                      : "Next Question"}
                </button>
              </div>
            )}
          </div>
        )}

        {phase === "done" && (
          <div>
            <div className="rounded-2xl bg-[var(--bb-accent-soft)] px-4 py-4 text-center">
              <p className="text-3xl">🏁</p>
              <p className="mt-2 text-xl font-bold text-[var(--bb-text-primary,#111827)]">{savedScore ?? score} / {totalQuestions}</p>
              <p className="mt-1 text-sm text-[var(--bb-text-secondary,#4b5563)]">
                {userCompleted ? "Nice work. Your score is locked in for this week's group board." : "Your score is ready."}
              </p>
              {yourRank && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--bb-accent)]">
                  Current Group Rank: #{yourRank}
                </p>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[var(--bb-text-primary,#111827)]">Group Trivia Board</p>
                <p className="text-xs text-[var(--bb-text-muted,#9ca3af)]">{entries.length} completed</p>
              </div>
              {loadingBoard ? (
                <p className="py-5 text-sm text-[var(--bb-text-muted,#9ca3af)]">Loading board...</p>
              ) : entries.length === 0 ? (
                <p className="py-5 text-sm text-[var(--bb-text-muted,#9ca3af)]">No scores yet. Be the first one on the board.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {entries.slice(0, compactBoard ? 3 : entries.length).map((entry, index) => {
                    const percent = Math.round((entry.score / Math.max(entry.total_questions, 1)) * 100);
                    return (
                      <div
                        key={`${entry.user_id}-${entry.completed_at}`}
                        className={`rounded-2xl border px-3 py-3 ${entry.user_id === userId ? "border-[var(--bb-accent)] bg-[var(--bb-accent-soft)]" : "border-[var(--bb-card-border)] bg-[var(--bb-card)]"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 text-center text-sm font-bold text-[var(--bb-text-secondary,#6b7280)]">#{index + 1}</div>
                          {entry.profile_image_url ? (
                            <img src={entry.profile_image_url} alt={entry.display_name} className="h-9 w-9 rounded-full object-cover" />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bb-accent-soft)] text-sm font-bold text-[var(--bb-accent)]">
                              {(entry.display_name || "B").charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[var(--bb-text-primary,#111827)]">
                              {entry.display_name}
                              {entry.user_id === userId ? " (You)" : ""}
                            </p>
                            <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--bb-progress-track,#ece7df)]">
                              <div className="h-full rounded-full bg-[var(--bb-progress-fill)]" style={{ width: `${percent}%` }} />
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-[var(--bb-text-primary,#111827)]">{entry.score}/{entry.total_questions}</p>
                            <p className="text-[11px] text-[var(--bb-text-muted,#9ca3af)]">{percent}%</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {compactBoard && entries.length > 3 ? (
                    <p className="px-1 pt-1 text-[11px] font-semibold text-[var(--bb-text-secondary,#6b7280)]">
                      Open post to see the full trivia board and everyone who finished.
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
