"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalShell } from "./ModalShell";
import { supabase } from "../lib/supabaseClient";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "../lib/triviaCatalog";
import { getTriviaChapter } from "../lib/triviaGameData";
import { getScrambledChapter } from "../lib/scrambledGameData";
import { ACTION_TYPE } from "../lib/actionTypes";
import { logActionToMasterActions } from "../lib/actionRecorder";
import { getLouisDailyTaskTimeLeftMs } from "../lib/louisDailyFlow";
import { LouisAvatar } from "./LouisAvatar";

type TaskKind = "devotional" | "reading" | "notes" | "trivia" | "scrambled";

type TaskState = {
  kind: TaskKind;
  title: string;
  subtitle: string;
  pointsLabel: string;
  href: string | null;
  done: boolean;
  disabled?: boolean;
};

type DevotionalRow = {
  id: string;
  title: string;
  total_days: number | null;
};

type DevotionalDayRow = {
  devotional_id: string;
  day_number: number;
  day_title: string | null;
  bible_reading_book: string;
  bible_reading_chapter: number;
};

type DevotionalProgressRow = {
  devotional_id: string;
  day_number: number;
  is_completed: boolean | null;
  reading_completed: boolean | null;
  completed_at?: string | null;
};

type ChecklistData = {
  title: string;
  streakLine: string;
  introLine: string;
  timeLeftLabel: string;
  progressLabel: string;
  bonusLine: string;
  tasks: TaskState[];
  completedCount: number;
  allDone: boolean;
  bonusAwarded: boolean;
};

const PREFERRED_DEVOTIONAL_MATCHERS = [/tempt/i, /joseph/i, /proverbs/i, /job/i, /moses/i];

function pickRecommendedDevotional(
  devotionals: DevotionalRow[],
): DevotionalRow | null {
  if (!devotionals.length) return null;

  for (const matcher of PREFERRED_DEVOTIONAL_MATCHERS) {
    const match = devotionals.find((devotional) => matcher.test(devotional.title));
    if (match) return match;
  }

  return devotionals[0] ?? null;
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function normalizeBookKey(book: string) {
  const rawBookKey = book.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
  return rawBookKey === "songofsolomon" ? "songofsongs" : rawBookKey;
}

function buildChapterLabel(book: string, chapter: number) {
  return `${book} ${chapter}`;
}

function buildTaskBonusLabel(devotionalId: string, dayNumber: number, cycleStartedAt: string) {
  return `Louis Daily Task Bonus - ${devotionalId} - Day ${dayNumber} - ${cycleStartedAt}`;
}

export type LouisDailyTasksModalProps = {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  currentStreak: number;
  cycleStartedAt: string | null;
};

export default function LouisDailyTasksModal({
  open,
  onClose,
  userId,
  currentStreak,
  cycleStartedAt,
}: LouisDailyTasksModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ChecklistData | null>(null);
  const [timeLeftMs, setTimeLeftMs] = useState(0);

  useEffect(() => {
    if (!open || !userId) return;

    setTimeLeftMs(getLouisDailyTaskTimeLeftMs(userId));
    const interval = window.setInterval(() => {
      setTimeLeftMs(getLouisDailyTaskTimeLeftMs(userId));
    }, 30000);

    return () => window.clearInterval(interval);
  }, [open, userId]);

  useEffect(() => {
    let cancelled = false;

    async function loadChecklist() {
      if (!open || !userId || !cycleStartedAt) return;

      setLoading(true);
      setError(null);

      try {
        const { data: completedRows, error: completedError } = await supabase
          .from("devotional_progress")
          .select("devotional_id, day_number, is_completed, reading_completed, completed_at")
          .eq("user_id", userId)
          .eq("is_completed", true)
          .order("completed_at", { ascending: false });

        if (completedError) throw completedError;

        const maxByDevotional = new Map<string, number>();
        (completedRows || []).forEach((row: DevotionalProgressRow) => {
          const current = maxByDevotional.get(row.devotional_id) ?? 0;
          if (row.day_number > current) {
            maxByDevotional.set(row.devotional_id, row.day_number);
          }
        });

        const devotionalIds = [...new Set((completedRows || []).map((row: DevotionalProgressRow) => row.devotional_id))];
        const devotionalsResponse = devotionalIds.length > 0
          ? await supabase
              .from("devotionals")
              .select("id, title, total_days")
              .in("id", devotionalIds)
          : await supabase
              .from("devotionals")
              .select("id, title, total_days")
              .limit(30);

        if (devotionalsResponse.error) throw devotionalsResponse.error;

        const devotionals = (devotionalsResponse.data || []) as DevotionalRow[];
        const activeDevotional =
          devotionals.find((devotional) => {
            const maxDay = maxByDevotional.get(devotional.id) ?? 0;
            return maxDay < (devotional.total_days || 0);
          }) ??
          pickRecommendedDevotional(devotionals);

        if (!activeDevotional) {
          throw new Error("No devotional is available for today's checklist.");
        }

        const nextDayNumber = (maxByDevotional.get(activeDevotional.id) ?? 0) + 1;

        const { data: dayRow, error: dayError } = await supabase
          .from("devotional_days")
          .select("devotional_id, day_number, day_title, bible_reading_book, bible_reading_chapter")
          .eq("devotional_id", activeDevotional.id)
          .eq("day_number", nextDayNumber)
          .maybeSingle();

        if (dayError) throw dayError;
        if (!dayRow) {
          throw new Error("Could not find the next devotional day for this checklist.");
        }

        const day = dayRow as DevotionalDayRow;
        const chapterLabel = buildChapterLabel(day.bible_reading_book, day.bible_reading_chapter);
        const reviewOpenedLabel = `${chapterLabel} Review Opened`;
        const resolvedBookKey = normalizeBookKey(day.bible_reading_book);
        const triviaRouteSlug =
          CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((entry) => entry.key === resolvedBookKey)?.routeSlug ?? resolvedBookKey;
        const hasTrivia = Boolean(getTriviaChapter(resolvedBookKey, day.bible_reading_chapter));
        const hasScrambled = Boolean(getScrambledChapter(resolvedBookKey, day.bible_reading_chapter));

        const [todayProgressRes, actionsRes, bonusRes] = await Promise.all([
          supabase
            .from("devotional_progress")
            .select("devotional_id, day_number, is_completed, reading_completed, completed_at")
            .eq("user_id", userId)
            .eq("devotional_id", activeDevotional.id)
            .eq("day_number", nextDayNumber)
            .maybeSingle(),
          supabase
            .from("master_actions")
            .select("action_type, action_label, created_at")
            .eq("user_id", userId)
            .gte("created_at", cycleStartedAt)
            .order("created_at", { ascending: false }),
          supabase
            .from("master_actions")
            .select("id")
            .eq("user_id", userId)
            .eq("action_type", ACTION_TYPE.louis_daily_task_bonus)
            .eq("action_label", buildTaskBonusLabel(activeDevotional.id, nextDayNumber, cycleStartedAt))
            .limit(1)
            .maybeSingle(),
        ]);

        if (todayProgressRes.error) throw todayProgressRes.error;
        if (actionsRes.error) throw actionsRes.error;
        if (bonusRes.error) throw bonusRes.error;

        const actionRows = actionsRes.data || [];
        const todayProgress = todayProgressRes.data as DevotionalProgressRow | null;

        const devotionalDone = todayProgress?.is_completed === true;
        const readingDone =
          todayProgress?.reading_completed === true ||
          devotionalDone ||
          actionRows.some((row) =>
            (row.action_type === ACTION_TYPE.devotional_bible_reading_opened &&
              row.action_label === `${activeDevotional.title} - Day ${nextDayNumber} - ${chapterLabel}`) ||
            ((row.action_type === ACTION_TYPE.chapter_completed || row.action_type === ACTION_TYPE.bible_chapter_viewed) &&
              String(row.action_label || "").toLowerCase() === chapterLabel.toLowerCase()),
          );
        const notesDone = actionRows.some(
          (row) =>
            row.action_type === ACTION_TYPE.chapter_notes_viewed &&
            row.action_label === reviewOpenedLabel,
        );
        const triviaDone = hasTrivia
          ? actionRows.some(
              (row) =>
                row.action_type === ACTION_TYPE.trivia_chapter_completed &&
                String(row.action_label || "").toLowerCase().startsWith(chapterLabel.toLowerCase()),
            )
          : false;
        const scrambledDone = hasScrambled
          ? actionRows.some(
              (row) =>
                row.action_type === ACTION_TYPE.scrambled_chapter_completed &&
                String(row.action_label || "").toLowerCase().startsWith(chapterLabel.toLowerCase()),
            )
          : false;

        const tasks: TaskState[] = [
          {
            kind: "devotional",
            title: `Do Day ${nextDayNumber} of ${activeDevotional.title}`,
            subtitle: day.day_title?.trim()
              ? `Stay with ${day.day_title} and finish today’s devotional step.`
              : "Open your next devotional day and keep your rhythm moving.",
            pointsLabel: "+9 pts",
            href: `/devotionals/${activeDevotional.id}?day=${nextDayNumber}&from=louis-daily-task`,
            done: devotionalDone,
          },
          {
            kind: "reading",
            title: `Read ${chapterLabel}`,
            subtitle: `This is the Bible reading connected to Day ${nextDayNumber}.`,
            pointsLabel: "Habit step",
            href: `/Bible/${encodeURIComponent(day.bible_reading_book)}/${day.bible_reading_chapter}?from=louis-daily-task`,
            done: readingDone,
          },
          {
            kind: "notes",
            title: `Review ${chapterLabel} Notes`,
            subtitle: "Slow down and see what this chapter is actually saying.",
            pointsLabel: "+2 pts",
            href: `/Bible/${encodeURIComponent(day.bible_reading_book)}/${day.bible_reading_chapter}?notes=1&from=louis-daily-task`,
            done: notesDone,
          },
          {
            kind: "trivia",
            title: `Play Trivia for ${chapterLabel}`,
            subtitle: hasTrivia
              ? "Test what really stuck while the chapter is still fresh."
              : "Trivia is not ready for this chapter yet.",
            pointsLabel: hasTrivia ? "Up to +5" : "Soon",
            href: hasTrivia ? `/bible-trivia/${triviaRouteSlug}/${day.bible_reading_chapter}?from=louis-daily-task` : null,
            done: triviaDone,
            disabled: !hasTrivia,
          },
          {
            kind: "scrambled",
            title: `Play Scrambled for ${chapterLabel}`,
            subtitle: hasScrambled
              ? "Lock in the key words and ideas from the chapter."
              : "Scrambled is not ready for this chapter yet.",
            pointsLabel: hasScrambled ? "Up to +5" : "Soon",
            href: hasScrambled ? `/bible-study-games/scrambled/${resolvedBookKey}/${day.bible_reading_chapter}?from=louis-daily-task` : null,
            done: scrambledDone,
            disabled: !hasScrambled,
          },
        ];

        const completedCount = tasks.filter((task) => task.done).length;
        const allDone = completedCount === tasks.length;
        let bonusAwarded = Boolean(bonusRes.data);

        if (allDone && !bonusAwarded) {
          await logActionToMasterActions(
            userId,
            ACTION_TYPE.louis_daily_task_bonus,
            buildTaskBonusLabel(activeDevotional.id, nextDayNumber, cycleStartedAt),
          );
          bonusAwarded = true;
        }

        if (cancelled) return;

        setData({
          title: "This Is Your Daily Bible Task",
          streakLine:
            currentStreak > 0
              ? `Hey, you are on a ${currentStreak} day streak right now. Keep it moving.`
              : "Hey, today still counts. Let’s build momentum again.",
          introLine: `You have the next ${formatCountdown(getLouisDailyTaskTimeLeftMs(userId))} to work through these five steps. You do not need to rush them all right now.`,
          timeLeftLabel: formatCountdown(getLouisDailyTaskTimeLeftMs(userId)),
          progressLabel: `${completedCount} of ${tasks.length} completed`,
          bonusLine: bonusAwarded
            ? "All 5 are done. Your +10 bonus is locked in."
            : "Finish all 5 in this 24 hour window and you will pick up a +10 bonus.",
          tasks,
          completedCount,
          allDone,
          bonusAwarded,
        });
      } catch (loadError: any) {
        if (cancelled) return;
        console.error("[LOUIS_DAILY_TASKS] Could not build checklist:", loadError);
        setError(loadError?.message || "Could not load your daily Bible task right now.");
        setData(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadChecklist();

    return () => {
      cancelled = true;
    };
  }, [open, userId, currentStreak, cycleStartedAt]);

  const completionPercent = useMemo(() => {
    if (!data?.tasks.length) return 0;
    return Math.round((data.completedCount / data.tasks.length) * 100);
  }, [data]);

  function handleOpenTask(task: TaskState) {
    if (!task.href || task.disabled) return;
    onClose();
    router.push(task.href);
  }

  return (
    <ModalShell isOpen={open} onClose={onClose} backdropColor="bg-black/45" scrollable={true}>
      <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-[34px] border border-[#ead8bf] bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-xl text-[#8f6a3d] transition hover:text-[#5f4321]"
          aria-label="Close daily Bible task"
        >
          ×
        </button>

        <div className="bg-gradient-to-br from-[#fff8ee] via-[#fffdf8] to-[#f7efdf] px-6 pb-6 pt-7 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <LouisAvatar mood="wave" size={78} />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9a7341]">
              Little Louis
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#2f2418]">
              {data?.title || "This Is Your Daily Bible Task"}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#4c3a26]">
              {data?.streakLine || "Building a real Bible habit happens one day at a time."}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#6d5332]">
              {data?.introLine || "Loading your daily checklist..."}
            </p>
          </div>

          <div className="mt-6 rounded-[26px] border border-[#eadcc8] bg-white/95 px-5 py-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7341]">
                  Time Left
                </p>
                <p className="mt-1 text-2xl font-bold text-[#2f2418]">
                  {loading ? "Loading..." : data?.timeLeftLabel || formatCountdown(timeLeftMs)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7341]">
                  Progress
                </p>
                <p className="mt-1 text-base font-semibold text-[#2f2418]">
                  {loading ? "Building checklist..." : data?.progressLabel || "0 of 5 completed"}
                </p>
              </div>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#efe3cf]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#58a57a] to-[#7ac08b] transition-all duration-500"
                style={{ width: `${loading ? 12 : completionPercent}%` }}
              />
            </div>

            <p className={`mt-4 text-sm font-medium ${data?.bonusAwarded ? "text-emerald-700" : "text-[#7a5b34]"}`}>
              {loading ? "Getting your five tasks ready..." : data?.bonusLine}
            </p>
          </div>
        </div>

        <div className="bg-white px-6 pb-6 pt-5 sm:px-8">
          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="animate-pulse rounded-3xl border border-gray-100 bg-[#faf6ef] px-4 py-5">
                  <div className="h-4 w-32 rounded bg-[#eadcc8]" />
                  <div className="mt-3 h-3 w-full rounded bg-[#f1e7d8]" />
                  <div className="mt-2 h-3 w-3/4 rounded bg-[#f1e7d8]" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-4 py-5 text-sm text-red-700">
              {error}
            </div>
          ) : (
            <div className="space-y-3">
              {data?.tasks.map((task) => (
                <button
                  key={task.kind}
                  type="button"
                  onClick={() => handleOpenTask(task)}
                  disabled={task.disabled}
                  className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                    task.done
                      ? "border-emerald-200 bg-emerald-50"
                      : task.disabled
                        ? "border-gray-200 bg-gray-50 opacity-70"
                        : "border-[#eadcc8] bg-[#fffaf2] hover:border-[#d7bb95] hover:bg-[#fff6ea]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          task.done
                            ? "bg-emerald-600 text-white"
                            : "bg-white text-[#9a7341] ring-1 ring-[#eadcc8]"
                        }`}
                      >
                        {task.done ? "✓" : "•"}
                      </div>
                      <div>
                        <p className="text-base font-bold text-[#2f2418]">{task.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#6d5332]">{task.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        task.done
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-[#efe3cf] text-[#7a5b34]"
                      }`}>
                        {task.pointsLabel}
                      </span>
                      <span className={`text-xs font-semibold ${
                        task.done ? "text-emerald-700" : "text-[#8d7557]"
                      }`}>
                        {task.done ? "Completed" : task.disabled ? "Not ready" : "Open"}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </ModalShell>
  );
}
