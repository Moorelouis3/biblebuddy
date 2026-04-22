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
  pointsLabel: string;
  href: string | null;
  done: boolean;
  disabled?: boolean;
  completedAtLabel?: string | null;
};

type DevotionalRow = {
  id: string;
  title: string;
  total_days: number | null;
};

type DevotionalDayRow = {
  devotional_id: string;
  day_number: number;
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

export type ChecklistData = {
  title: string;
  streakLine: string;
  contextLine: string;
  timeLeftLabel: string;
  progressLabel: string;
  summaryLine: string;
  bonusLine: string;
  nextTaskTitle: string | null;
  tasks: TaskState[];
  completedCount: number;
  allDone: boolean;
  bonusAwarded: boolean;
};

const PREFERRED_DEVOTIONAL_MATCHERS = [/tempt/i, /joseph/i, /proverbs/i, /job/i, /moses/i];

function pickRecommendedDevotional(devotionals: DevotionalRow[]): DevotionalRow | null {
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

function formatCompletedAtLabel(iso: string | null | undefined) {
  if (!iso) return "Completed";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Completed";
  const today = new Date();
  const sameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  if (sameDay) return "Done today";
  return `Done ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

export async function fetchLouisDailyChecklistData(
  userId: string,
  currentStreak: number,
  cycleStartedAt: string,
): Promise<ChecklistData> {
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
    ? await supabase.from("devotionals").select("id, title, total_days").in("id", devotionalIds)
    : await supabase.from("devotionals").select("id, title, total_days").limit(30);

  if (devotionalsResponse.error) throw devotionalsResponse.error;

  const devotionals = (devotionalsResponse.data || []) as DevotionalRow[];
  const activeDevotional =
    devotionals.find((devotional) => {
      const maxDay = maxByDevotional.get(devotional.id) ?? 0;
      return maxDay < (devotional.total_days || 0);
    }) ?? pickRecommendedDevotional(devotionals);

  if (!activeDevotional) {
    throw new Error("No devotional is available for today's checklist.");
  }

  const nextDayNumber = (maxByDevotional.get(activeDevotional.id) ?? 0) + 1;

  const { data: dayRow, error: dayError } = await supabase
    .from("devotional_days")
    .select("devotional_id, day_number, bible_reading_book, bible_reading_chapter")
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

  const [todayProgressRes, actionsRes, bonusRes, completedChapterRes] = await Promise.all([
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
    supabase
      .from("completed_chapters")
      .select("id, completed_at")
      .eq("user_id", userId)
      .eq("book", day.bible_reading_book.toLowerCase().trim())
      .eq("chapter", day.bible_reading_chapter)
      .limit(1)
      .maybeSingle(),
  ]);

  if (todayProgressRes.error) throw todayProgressRes.error;
  if (actionsRes.error) throw actionsRes.error;
  if (bonusRes.error) throw bonusRes.error;
  if (completedChapterRes.error) throw completedChapterRes.error;

  const actionRows = actionsRes.data || [];
  const todayProgress = todayProgressRes.data as DevotionalProgressRow | null;
  const notesAction = actionRows.find(
    (row) =>
      (row.action_type === ACTION_TYPE.chapter_notes_reviewed ||
        row.action_type === ACTION_TYPE.chapter_notes_viewed) &&
      row.action_label === reviewOpenedLabel,
  );
  const triviaAction = hasTrivia
    ? actionRows.find(
        (row) =>
          row.action_type === ACTION_TYPE.trivia_chapter_completed &&
          String(row.action_label || "").toLowerCase().startsWith(chapterLabel.toLowerCase()),
      )
    : null;
  const scrambledAction = hasScrambled
    ? actionRows.find(
        (row) =>
          row.action_type === ACTION_TYPE.scrambled_chapter_completed &&
          String(row.action_label || "").toLowerCase().startsWith(chapterLabel.toLowerCase()),
      )
    : null;

  const devotionalDone = todayProgress?.is_completed === true;
  const readingDone =
    todayProgress?.reading_completed === true ||
    devotionalDone ||
    Boolean(completedChapterRes.data) ||
    actionRows.some((row) =>
      (row.action_type === ACTION_TYPE.devotional_bible_reading_opened &&
        row.action_label === `${activeDevotional.title} - Day ${nextDayNumber} - ${chapterLabel}`) ||
      ((row.action_type === ACTION_TYPE.chapter_completed || row.action_type === ACTION_TYPE.bible_chapter_viewed) &&
        String(row.action_label || "").toLowerCase() === chapterLabel.toLowerCase()),
    );
  const notesDone = Boolean(notesAction);
  const triviaDone = Boolean(triviaAction);
  const scrambledDone = Boolean(scrambledAction);

  const tasks: TaskState[] = [
    {
      kind: "devotional",
      title: `Do Day ${nextDayNumber} of ${activeDevotional.title}`,
      pointsLabel: "+5 pts",
      href: `/devotionals/${activeDevotional.id}?day=${nextDayNumber}&from=louis-daily-task`,
      done: devotionalDone,
      completedAtLabel: devotionalDone ? formatCompletedAtLabel(todayProgress?.completed_at) : null,
    },
    {
      kind: "reading",
      title: `Read ${chapterLabel}`,
      pointsLabel: "+5 pts",
      href: `/Bible/${encodeURIComponent(day.bible_reading_book)}/${day.bible_reading_chapter}?from=louis-daily-task`,
      done: readingDone,
      completedAtLabel: readingDone
        ? formatCompletedAtLabel(todayProgress?.completed_at || (completedChapterRes.data as { completed_at?: string | null } | null)?.completed_at)
        : null,
    },
    {
      kind: "notes",
      title: `Review ${chapterLabel} Notes`,
      pointsLabel: "+5 pts",
      href: `/Bible/${encodeURIComponent(day.bible_reading_book)}/${day.bible_reading_chapter}?notes=1&from=louis-daily-task`,
      done: notesDone,
      completedAtLabel: notesDone ? formatCompletedAtLabel(notesAction?.created_at) : null,
    },
    {
      kind: "trivia",
      title: hasTrivia ? `Play Trivia for ${chapterLabel}` : `Review ${chapterLabel} Notes Again`,
      pointsLabel: hasTrivia ? "Up to +5" : "+5 pts",
      href: hasTrivia
        ? `/bible-trivia/${triviaRouteSlug}/${day.bible_reading_chapter}?from=louis-daily-task`
        : `/Bible/${encodeURIComponent(day.bible_reading_book)}/${day.bible_reading_chapter}?notes=1&from=louis-daily-task`,
      done: hasTrivia ? triviaDone : notesDone,
      disabled: false,
      completedAtLabel: hasTrivia
        ? (triviaDone ? formatCompletedAtLabel(triviaAction?.created_at) : null)
        : (notesDone ? formatCompletedAtLabel(notesAction?.created_at) : null),
    },
    {
      kind: "scrambled",
      title: hasScrambled ? `Play Scrambled for ${chapterLabel}` : `Open ${chapterLabel} Again`,
      pointsLabel: hasScrambled ? "Up to +5" : "+5 pts",
      href: hasScrambled
        ? `/bible-study-games/scrambled/${resolvedBookKey}/${day.bible_reading_chapter}?from=louis-daily-task`
        : `/Bible/${encodeURIComponent(day.bible_reading_book)}/${day.bible_reading_chapter}?from=louis-daily-task`,
      done: hasScrambled ? scrambledDone : readingDone,
      disabled: false,
      completedAtLabel: hasScrambled
        ? (scrambledDone ? formatCompletedAtLabel(scrambledAction?.created_at) : null)
        : (readingDone
            ? formatCompletedAtLabel(todayProgress?.completed_at || (completedChapterRes.data as { completed_at?: string | null } | null)?.completed_at)
            : null),
    },
  ];

  const completedCount = tasks.filter((task) => task.done).length;
  const allDone = completedCount === tasks.length;
  const nextTaskTitle = tasks.find((task) => !task.done)?.title ?? null;
  let bonusAwarded = Boolean(bonusRes.data);

  if (allDone && !bonusAwarded) {
    await logActionToMasterActions(
      userId,
      ACTION_TYPE.louis_daily_task_bonus,
      buildTaskBonusLabel(activeDevotional.id, nextDayNumber, cycleStartedAt),
    );
    bonusAwarded = true;
  }

  return {
    title: "Daily Bible Task",
    streakLine:
      currentStreak > 0
        ? `You are on a ${currentStreak} day streak right now.`
        : "Today still counts. Let’s build momentum again.",
    contextLine: `${chapterLabel} is your focus right now.`,
    timeLeftLabel: formatCountdown(getLouisDailyTaskTimeLeftMs(userId)),
    progressLabel: `${completedCount} out of ${tasks.length} completed`,
    summaryLine:
      allDone
        ? "You completed all five tasks today."
        : completedCount === 0
          ? "You have 5 tasks waiting for you today."
          : `${completedCount} done, ${tasks.length - completedCount} left to go.`,
    bonusLine: bonusAwarded
      ? "Bonus locked in: +10 points."
      : "Complete all 5 for a +10 bonus.",
    nextTaskTitle,
    tasks,
    completedCount,
    allDone,
    bonusAwarded,
  };
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
  const [showHelp, setShowHelp] = useState(false);
  const [animatedDoneKinds, setAnimatedDoneKinds] = useState<Record<string, boolean>>({});

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
        const checklistData = await fetchLouisDailyChecklistData(userId, currentStreak, cycleStartedAt);
        if (cancelled) return;
        setAnimatedDoneKinds((prev) => {
          const next = { ...prev };
          checklistData.tasks.forEach((task) => {
            if (task.done && !prev[task.kind]) {
              next[task.kind] = true;
            }
          });
          return next;
        });
        setData(checklistData);
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
      <div className="relative my-6 w-full max-w-xl overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
        <button
          type="button"
          onClick={() => setShowHelp((prev) => !prev)}
          className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-sm font-bold text-[#5a76af] shadow-sm transition hover:text-[#2f4f89]"
          aria-label="How daily Bible task works"
        >
          ?
        </button>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-xl text-[#5a76af] transition hover:text-[#2f4f89]"
          aria-label="Close daily Bible task"
        >
          ×
        </button>

        <div className="bg-gradient-to-br from-[#edf5ff] via-[#f8fbff] to-[#eef7ff] px-5 pb-5 pt-6 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <LouisAvatar mood="wave" size={56} />
            <h2 className="mt-3 text-[1.8rem] font-bold text-[#21304f]">
              {data?.title || "Daily Bible Task"}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#465a85]">
              {data?.streakLine || "Building a real Bible habit happens one day at a time."}
            </p>
            <p className="mt-1 max-w-xl text-sm leading-6 text-[#6a7da8]">
              {data?.contextLine || "Today’s chapter is ready for you."}
            </p>
          </div>

          {showHelp ? (
            <div className="mt-4 rounded-[22px] border border-[#d7e4f7] bg-white/95 px-4 py-3 text-left shadow-sm">
              <p className="text-sm leading-6 text-[#51627f]">
                This is your 24-hour Bible checklist. Finish the five tasks anytime before the timer runs out. If you complete all five, you earn a +10 bonus.
              </p>
            </div>
          ) : null}

          <div className="mt-4 rounded-[22px] border border-[#d7e4f7] bg-white/95 px-4 py-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7190c7]">Time Left</p>
                <p className="mt-1 text-2xl font-bold text-[#21304f]">
                  {loading ? formatCountdown(timeLeftMs) : data?.timeLeftLabel || formatCountdown(timeLeftMs)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7190c7]">Progress</p>
                <p className="mt-1 text-base font-semibold text-[#21304f]">
                  {loading ? "0 out of 5 completed" : data?.progressLabel || "0 out of 5 completed"}
                </p>
              </div>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#dbe7fa]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7aa7df] to-[#9dc1ee] transition-all duration-500"
                style={{ width: `${loading ? 12 : completionPercent}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
              <p className="font-medium text-[#4f628c]">
                {loading ? "Building your checklist..." : data?.summaryLine || "Loading your progress..."}
              </p>
              <p className={`font-semibold ${data?.bonusAwarded ? "text-emerald-700" : "text-[#5a76af]"}`}>
                {loading ? "Complete all 5 for a +10 bonus." : data?.bonusLine || "Complete all 5 for a +10 bonus."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white px-5 pb-5 pt-4 sm:px-6">
          {loading ? (
            <div className="space-y-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="animate-pulse rounded-2xl border border-[#d7e4f7] bg-[#f5f8ff] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-4 w-40 rounded bg-[#d9e4f7]" />
                    <div className="h-6 w-20 rounded-full bg-[#e7eefb]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-4 py-5 text-sm text-red-700">
              {error}
            </div>
          ) : (
            <div className="space-y-2">
              {data?.tasks.map((task) => (
                <button
                  key={task.kind}
                  type="button"
                  onClick={() => handleOpenTask(task)}
                  disabled={task.disabled}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    task.done
                      ? `border-emerald-200 bg-emerald-50 ${animatedDoneKinds[task.kind] ? "animate-[pulse_0.9s_ease-out_1]" : ""}`
                      : task.disabled
                        ? "border-gray-200 bg-gray-100 text-gray-500 opacity-80"
                        : "border-[#d7e4f7] bg-[#f5f8ff] hover:border-[#bed0ee] hover:bg-[#edf4ff]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          task.done
                            ? "bg-emerald-600 text-white"
                            : task.disabled
                              ? "bg-gray-200 text-gray-500"
                              : "bg-white text-[#5a76af] ring-1 ring-[#d7e4f7]"
                        }`}
                      >
                        {task.done ? "✓" : "•"}
                      </div>
                      <p className="truncate text-base font-bold text-[#21304f]">{task.title}</p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                        task.done
                          ? "bg-emerald-100 text-emerald-800"
                          : task.disabled
                            ? "bg-gray-200 text-gray-500"
                            : "bg-[#dde8fb] text-[#5570a3]"
                      }`}
                    >
                      {task.pointsLabel}
                    </span>
                  </div>
                  {task.done && task.completedAtLabel ? (
                    <p className="mt-2 pl-11 text-xs font-medium text-emerald-700">
                      {task.completedAtLabel}
                    </p>
                  ) : null}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </ModalShell>
  );
}
