"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ModalShell } from "./ModalShell";
import { supabase } from "../lib/supabaseClient";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "../lib/triviaCatalog";
import { getTriviaChapter } from "../lib/triviaGameData";
import { getScrambledChapter } from "../lib/scrambledGameData";
import { ACTION_TYPE } from "../lib/actionTypes";
import {
  getLouisDailyTaskTarget,
  getLouisDailyTaskTimeLeftMs,
  hasLouisDailyTaskBonusAwarded,
  hasSeenLouisDailyTaskCelebration,
  rememberLouisDailyTaskBonusAwarded,
  rememberLouisDailyTaskCelebrationSeen,
  rememberLouisDailyTaskTarget,
} from "../lib/louisDailyFlow";
import { LouisAvatar } from "./LouisAvatar";
import { triggerPoints } from "./PointsPop";

type TaskKind = "devotional" | "reading" | "notes" | "trivia" | "scrambled";

type TaskState = {
  kind: TaskKind;
  title: string;
  pointsLabel: string;
  href: string | null;
  done: boolean;
  disabled?: boolean;
  completedAtLabel?: string | null;
  book?: string | null;
  chapter?: number | null;
  chapterLabel?: string | null;
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
  const recommendedDevotional =
    devotionals.find((devotional) => {
      const maxDay = maxByDevotional.get(devotional.id) ?? 0;
      return maxDay < (devotional.total_days || 0);
    }) ?? pickRecommendedDevotional(devotionals);

  if (!recommendedDevotional) {
    throw new Error("No devotional is available for today's checklist.");
  }

  const storedTarget = getLouisDailyTaskTarget(userId, cycleStartedAt);
  const activeDevotional =
    (storedTarget
      ? devotionals.find((devotional) => devotional.id === storedTarget.devotionalId) ?? null
      : null) ?? recommendedDevotional;

  const nextDayNumber =
    storedTarget?.devotionalId === activeDevotional.id
      ? storedTarget.dayNumber
      : (maxByDevotional.get(activeDevotional.id) ?? 0) + 1;

  if (!storedTarget || storedTarget.devotionalId !== activeDevotional.id || storedTarget.dayNumber !== nextDayNumber) {
    rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
      devotionalId: activeDevotional.id,
      dayNumber: nextDayNumber,
    });
  }

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

  const [todayProgressRes, actionsRes, completedChapterRes, notesHistoryRes] = await Promise.all([
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
      .from("completed_chapters")
      .select("id, completed_at")
      .eq("user_id", userId)
      .eq("book", day.bible_reading_book.toLowerCase().trim())
      .eq("chapter", day.bible_reading_chapter)
      .limit(1)
      .maybeSingle(),
    supabase
      .from("master_actions")
      .select("action_type, action_label, created_at")
      .eq("user_id", userId)
      .in("action_type", [ACTION_TYPE.chapter_notes_reviewed, ACTION_TYPE.chapter_notes_viewed])
      .eq("action_label", reviewOpenedLabel)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (todayProgressRes.error) throw todayProgressRes.error;
  if (actionsRes.error) throw actionsRes.error;
  if (completedChapterRes.error) throw completedChapterRes.error;
  if (notesHistoryRes.error) throw notesHistoryRes.error;

  const actionRows = actionsRes.data || [];
  const todayProgress = todayProgressRes.data as DevotionalProgressRow | null;
  const notesAction =
    notesHistoryRes.data ||
    actionRows.find(
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
      book: day.bible_reading_book,
      chapter: day.bible_reading_chapter,
      chapterLabel,
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
      book: day.bible_reading_book,
      chapter: day.bible_reading_chapter,
      chapterLabel,
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
  const bonusAwarded = allDone || hasLouisDailyTaskBonusAwarded(userId, cycleStartedAt);

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
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedNotesTask, setSelectedNotesTask] = useState<TaskState | null>(null);
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [notesError, setNotesError] = useState<string | null>(null);
  const [notesMarkedComplete, setNotesMarkedComplete] = useState(false);

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

  useEffect(() => {
    if (!open || !userId || !cycleStartedAt || !data?.allDone) return;

    if (!hasLouisDailyTaskBonusAwarded(userId, cycleStartedAt)) {
      rememberLouisDailyTaskBonusAwarded(userId, cycleStartedAt);
      triggerPoints(10);
    }

    if (!hasSeenLouisDailyTaskCelebration(userId, cycleStartedAt)) {
      rememberLouisDailyTaskCelebrationSeen(userId, cycleStartedAt);
      setShowCelebration(true);
    }
  }, [open, userId, cycleStartedAt, data]);

  function handleOpenTask(task: TaskState) {
    if (!task.href || task.disabled) return;
    if (task.kind === "notes" && task.book && task.chapter) {
      setSelectedNotesTask(task);
      setNotesText("");
      setNotesError(null);
      setNotesMarkedComplete(false);
      return;
    }
    onClose();
    router.push(task.href);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadNotes() {
      if (!selectedNotesTask?.book || !selectedNotesTask.chapter) return;

      setNotesLoading(true);
      setNotesError(null);

      try {
        const bookKey = selectedNotesTask.book.toLowerCase().trim();
        const chapterNum = Number(selectedNotesTask.chapter);

        const { data: cached } = await supabase
          .from("bible_notes")
          .select("notes_text")
          .eq("book", bookKey)
          .eq("chapter", chapterNum)
          .maybeSingle();

        if (cached?.notes_text && cached.notes_text.trim().length > 0) {
          if (!cancelled) setNotesText(cached.notes_text);
          return;
        }

        const prompt = `You are Little Louis. Generate beginner friendly notes for ${selectedNotesTask.book} chapter ${chapterNum} using this exact template and rules.

TEMPLATE
# 🧠 Big Idea of the Chapter
One short paragraph explaining the heart of the chapter in simple English.

# 🎬 What's Happening…
Include three or four cinematic story movements. Each movement follows:
[Emoji] **Story Moment Title** (ALWAYS bold the story moment title with **)
A short paragraph of three to four sentences explaining what happens and why it matters. Smooth, simple, friendly language.

# 📌 Key Themes
List two or three themes. Each theme is one short sentence.

# 🔗 Connections to the Bigger Story
One or two simple connections to prophecy, covenant, or Jesus mission. Beginner friendly.

# 🙌 Simple Life Application
A short paragraph of three to four sentences explaining what this chapter shows about God and what the reader is invited to believe or do.

# 🏁 One Sentence Summary
A final strong sentence that captures the message.

RULES
DO NOT include a top-level header. Start directly with "# 🧠 Big Idea of the Chapter".
No hyphens anywhere. No deep theology. Keep it cinematic, warm, simple.`;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
        });

        if (!response.ok) throw new Error("Failed to generate notes");
        const json = await response.json();
        let generated = (json?.reply as string) ?? "";
        if (!generated.trim()) throw new Error("Empty response from AI");
        generated = generated.replace(/-/g, " ");

        await supabase.from("bible_notes").upsert(
          { book: bookKey, chapter: chapterNum, notes_text: generated },
          { onConflict: "book,chapter" },
        );

        const { data: saved } = await supabase
          .from("bible_notes")
          .select("notes_text")
          .eq("book", bookKey)
          .eq("chapter", chapterNum)
          .maybeSingle();

        if (!cancelled) setNotesText(saved?.notes_text ?? generated);
      } catch (error: any) {
        console.error("[LOUIS_DAILY_TASKS] Could not load notes:", error);
        if (!cancelled) {
          setNotesError(error?.message || "Couldn't load the chapter notes.");
        }
      } finally {
        if (!cancelled) {
          setNotesLoading(false);
        }
      }
    }

    void loadNotes();

    return () => {
      cancelled = true;
    };
  }, [selectedNotesTask]);

  async function markNotesTaskComplete(task: TaskState) {
    if (!userId || !task.book || !task.chapter || notesMarkedComplete) return;

    const reviewOpenedLabel = `${task.chapterLabel || `${task.book} ${task.chapter}`} Review Opened`;

    await supabase.from("master_actions").insert({
      user_id: userId,
      action_type: ACTION_TYPE.chapter_notes_viewed,
      action_label: reviewOpenedLabel,
    });

    const { data: existingReviewed } = await supabase
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .eq("action_type", ACTION_TYPE.chapter_notes_reviewed)
      .eq("action_label", reviewOpenedLabel)
      .limit(1)
      .maybeSingle();

    if (!existingReviewed) {
      const { error: insertErr } = await supabase.from("master_actions").insert({
        user_id: userId,
        action_type: ACTION_TYPE.chapter_notes_reviewed,
        action_label: reviewOpenedLabel,
      });
      if (!insertErr) triggerPoints(2);
    }

    setNotesMarkedComplete(true);
    setData((prev) => {
      if (!prev) return prev;
      const updatedTasks = prev.tasks.map((existingTask) =>
        existingTask.kind === "notes"
          ? { ...existingTask, done: true, completedAtLabel: "Done today" }
          : existingTask,
      );
      const completedCount = updatedTasks.filter((existingTask) => existingTask.done).length;
      const allDone = completedCount === updatedTasks.length;

      return {
        ...prev,
        tasks: updatedTasks,
        completedCount,
        allDone,
        nextTaskTitle: updatedTasks.find((existingTask) => !existingTask.done)?.title ?? null,
        progressLabel: `${completedCount} out of ${updatedTasks.length} completed`,
        summaryLine: allDone
          ? "You completed all five tasks today."
          : completedCount === 0
            ? "You have 5 tasks waiting for you today."
            : `${completedCount} done, ${updatedTasks.length - completedCount} left to go.`,
        bonusLine: allDone || prev.bonusAwarded ? "Bonus locked in: +10 points." : prev.bonusLine,
        bonusAwarded: allDone || prev.bonusAwarded,
      };
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bb:daily-task-progress-updated"));
    }
  }

  async function handleCloseNotesModal() {
    const closingTask = selectedNotesTask;
    const shouldMarkComplete = Boolean(notesText.trim());
    setSelectedNotesTask(null);
    setNotesText("");
    setNotesError(null);
    setNotesLoading(false);
    if (closingTask && shouldMarkComplete) {
      await markNotesTaskComplete(closingTask);
    }
  }

  return (
    <ModalShell isOpen={open} onClose={onClose} backdropColor="bg-black/45" scrollable={true}>
      <div className="relative my-6 w-full max-w-xl overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
        {showCelebration ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 px-6 text-center backdrop-blur-[1px]">
            <div className="w-full max-w-md rounded-[28px] border border-[#d7e4f7] bg-gradient-to-br from-[#edf5ff] via-[#f8fbff] to-[#eef7ff] px-6 py-8 shadow-xl">
              <div className="flex justify-center">
                <LouisAvatar mood="wave" size={64} />
              </div>
              <h3 className="mt-4 text-3xl font-bold text-[#21304f]">Congrats!</h3>
              <p className="mt-3 text-base font-semibold text-[#355487]">
                You completed today&apos;s Bible task.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#58709d]">
                All 5 tasks are complete and your +10 bonus is locked in for this 24-hour cycle.
              </p>
              <button
                type="button"
                onClick={() => setShowCelebration(false)}
                className="mt-5 inline-flex rounded-full bg-[#7aa7df] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f93d3]"
              >
                OK
              </button>
            </div>
          </div>
        ) : null}
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
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#6a7da8]">
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
            <p className="text-center text-base font-semibold text-[#21304f]">
              {loading
                ? `You have ${formatCountdown(timeLeftMs)} to complete all tasks.`
                : `You have ${data?.timeLeftLabel || formatCountdown(timeLeftMs)} to complete all tasks.`}
            </p>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#dbe7fa]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7aa7df] to-[#9dc1ee] transition-all duration-500"
                style={{ width: `${loading ? 12 : completionPercent}%` }}
              />
            </div>
            <div className="mt-3 text-center text-sm">
              <p className="font-medium text-[#4f628c]">
                {loading ? "Building your checklist..." : data?.summaryLine || "Loading your progress..."}
              </p>
              <p className={`mt-1 font-semibold ${data?.bonusAwarded ? "text-emerald-700" : "text-[#5a76af]"}`}>
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

      <ModalShell
        isOpen={selectedNotesTask !== null}
        onClose={() => {
          void handleCloseNotesModal();
        }}
        backdropColor="bg-black/55"
        scrollable
      >
        <div className="relative my-6 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-lg">📝</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Chapter Notes</p>
                <h2 className="text-base font-bold text-gray-900">{selectedNotesTask?.chapterLabel || "Notes"}</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                void handleCloseNotesModal();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
              aria-label="Close notes"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[85vh] overflow-y-auto px-6 py-5 pb-8">
            {notesLoading ? (
              <div className="flex flex-col items-center gap-4 py-12">
                <div style={{ animation: "bounce 1s infinite" }}>
                  <LouisAvatar mood="think" size={60} />
                </div>
                <p className="text-sm text-gray-400 italic animate-pulse">Little Louis is preparing your notes…</p>
              </div>
            ) : notesError ? (
              <div className="py-10 text-center">
                <p className="text-sm text-red-500">{notesError}</p>
              </div>
            ) : (
              <div className="max-w-none space-y-5 text-gray-800">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mt-6 mb-2 text-xl font-bold text-gray-900 first:mt-0">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mt-5 mb-2 text-lg font-bold text-gray-900">{children}</h2>
                    ),
                    p: ({ children }) => (
                      <p className="text-[15px] leading-relaxed text-gray-700">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900">{children}</strong>
                    ),
                    li: ({ children }) => (
                      <li className="ml-4 list-disc text-[15px] leading-relaxed text-gray-700">{children}</li>
                    ),
                  }}
                >
                  {notesText}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </ModalShell>
    </ModalShell>
  );
}
