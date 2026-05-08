"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LouisAvatar } from "./LouisAvatar";
import type { ChecklistData, TaskState } from "./LouisDailyTasksModal";
import type { DailyRecommendation } from "../lib/dailyRecommendation";
import { supabase } from "../lib/supabaseClient";
import { rememberLouisDailyTaskTarget } from "../lib/louisDailyFlow";

type LevelInfo = {
  level: number;
  levelName: string;
  identityText: string;
  encouragementText: string;
  totalPoints: number;
  levelStart: number;
  levelEnd: number;
  pointsToNextLevel: number;
  progressPercent: number;
};

type ProfileShape = {
  is_paid?: boolean | null;
  daily_credits?: number | null;
  last_active_date?: string | null;
  verse_of_the_day_shown?: string | null;
  current_streak?: number | null;
  profile_image_url?: string | null;
  display_name?: string | null;
  username?: string | null;
} | null;

type ExploreLink = {
  key: string;
  title: string;
  subtitle: string;
  href: string;
  accent: string;
  eyebrow: string;
  emoji: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type Props = {
  userId: string | null;
  userName: string;
  profile: ProfileShape;
  levelInfo: LevelInfo | null;
  primaryRecommendation: DailyRecommendation | null;
  checklistData: ChecklistData | null;
  isLoadingChecklist: boolean;
  dailyTaskTimeLeftLabel: string | null;
  membershipStatus: string | null;
  daysRemaining: number | null;
  exploreLinks: ExploreLink[];
  onOpenLevelInfo: () => void;
  onOpenStreakInfo: () => void;
  onOpenDailyTasks: () => void;
  onTaskClick: (task: TaskState) => void;
  cycleStartedAt: string | null;
  onDevotionalChanged: () => void;
};

type DevotionalOption = {
  id: string;
  title: string;
  total_days: number | null;
};

function getTaskStatusCopy(task: TaskState) {
  if (task.done) return task.completedAtLabel || "Completed";
  if (task.disabled) return "Finish the earlier task first.";
  return "Tap to continue";
}

function getTaskPillClasses(task: TaskState) {
  if (task.done) return "bg-green-100 text-green-700";
  if (task.disabled) return "bg-gray-200 text-gray-500";
  return "bg-[#dde8fb] text-[#5570a3]";
}

function getTaskCardCopy(task: TaskState, index: number) {
  const number = index + 1;

  if (task.kind === "devotional") {
    return {
      title: `${number}. ${task.title}`,
      subtitle: "Read today's devotional and prepare your heart.",
      emoji: "📕",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "reading") {
    return {
      title: `${number}. ${task.title}`,
      subtitle: "Read today's Bible chapter and reflect on it.",
      emoji: "✝️",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "notes") {
    return {
      title: `${number}. ${task.title}`,
      subtitle: "Read and study the notes to understand more deeply.",
      emoji: "📝",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "trivia") {
    return {
      title: `${number}. ${task.title}`,
      subtitle: "Test your understanding with 5 quick questions.",
      emoji: "🧠",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  return {
    title: `${number}. ${task.title}`,
    subtitle: "Unscramble words from today's chapter.",
    emoji: "🔤",
    doneAccent: "from-[#4fc877] to-[#34b866]",
    idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
  };
}

function getTaskStatusLine(task: TaskState) {
  if (task.done) return task.completedAtLabel || "Completed today";
  if (task.disabled) return "Locked";
  return "Not started";
}

function getDailyStudyCardClasses(allDone: boolean) {
  if (allDone) {
    return "border-green-200 bg-gradient-to-br from-[#ecfff2] via-[#f8fffb] to-[#e7f8ee]";
  }

  return "border-[#ecd8b2] bg-gradient-to-br from-[#fff6e8] via-[#fffaf2] to-[#fff2db]";
}

const louisProgressOpeners: Record<number, string[]> = {
  0: [
    "Let's start today with a steady first step.",
    "This is a good place to begin today's Bible rhythm.",
    "Start here and let the rest of the journey build from this.",
    "Let's open the day by slowing down with the devotional.",
    "First step for today: get your heart settled in the story.",
    "Let's begin clean and simple with today's devotional.",
    "This first task sets the tone for the whole Bible study flow.",
    "Start with the devotional and let the chapter come into focus.",
    "Let's ease into the Word with the first part of today's journey.",
    "A good day of study starts with one honest beginning.",
    "Let's get today's chapter journey moving with the devotional.",
    "Start here, take your time, and let the story breathe a little.",
    "The first task is ready, and this is where momentum starts.",
    "Let's begin with the devotional before we move into the chapter.",
    "Today's Bible study starts with preparing your heart.",
    "Open with the devotional and let it frame the rest of the tasks.",
    "Let's make the first move and start today's journey well.",
    "Begin here, then we will keep walking through the chapter together.",
    "This is the doorway into today's Bible study flow.",
    "Let's start with the devotional and build from there.",
  ],
  1: [
    "Great job getting started.",
    "Nice work finishing the first step.",
    "You're moving now, and the next step is clear.",
    "Good start. Let's keep the rhythm going.",
    "That first task is done, so let's build on it.",
    "You showed up and started well.",
    "Good momentum. Now let's take the chapter itself.",
    "That's the opening step finished.",
    "You're not just thinking about studying today, you're doing it.",
    "The devotional is behind you, and the chapter is ready.",
    "Strong start. Let's stay with the story.",
    "You have the setup now, so let's read the text.",
    "Good work. The next step brings you straight into Scripture.",
    "You started with the devotional, and now we keep going.",
    "Nice first move. Let's continue while the story is fresh.",
    "You have one task down and the day is taking shape.",
    "Good pace. Now let's move from devotional into the chapter.",
    "That's one completed step. Let's keep it simple and steady.",
    "You opened the door. Now let's walk into the chapter.",
    "Great start. The next task keeps today's focus grounded in Scripture.",
  ],
  2: [
    "Wow, you're on a roll.",
    "Nice work. The foundation is set now.",
    "You have the devotional and reading done, so let's go deeper.",
    "Good rhythm today. Now we slow down and understand more.",
    "You're halfway through the main study flow.",
    "Strong progress. The notes will help the chapter settle in.",
    "You're building real understanding now.",
    "That reading matters. Now let's unpack what you read.",
    "Good work staying with it.",
    "You have the text in front of you now, so let's study it closer.",
    "You're moving from reading into understanding.",
    "This is where the chapter starts to click.",
    "Nice pace. Let's make sure the meaning lands.",
    "You're doing more than checking boxes today.",
    "Great job. The next task helps connect the details.",
    "The story is open now, so let's look under the hood.",
    "You're doing well. Let's turn the reading into insight.",
    "Good progress. The notes are the next smart step.",
    "You have the chapter read. Now let's make it stick.",
    "You're building the kind of study habit that actually grows.",
  ],
  3: [
    "Okay, you're almost done for today.",
    "You're close now, so let's check your understanding.",
    "Great work. Now let's see what you remember.",
    "You have studied the chapter, so let's test it gently.",
    "This is the fun review step.",
    "You're three tasks in, and now it is time to lock it in.",
    "Nice work. A few questions will help the chapter stick.",
    "You're close to finishing today's journey.",
    "The reading and notes are done. Now let's practice recall.",
    "Good job staying with the flow.",
    "You're almost there. Let's turn study into memory.",
    "This next step helps you see what landed.",
    "Great pace. Let's check the chapter with a quick round.",
    "You have done the careful part. Now let's review it.",
    "Strong day so far. Let's keep the energy up.",
    "You're in the final stretch now.",
    "Good work. Let's see how much of the chapter is sticking.",
    "The chapter is fresh, so trivia is the right next move.",
    "You're nearly finished. Let's make the understanding active.",
    "Nice progress. Time to test what you just studied.",
  ],
  4: [
    "One more task to go.",
    "Final step for today.",
    "You're right at the finish line.",
    "Almost done. Let's finish strong.",
    "Last task, and today's Bible journey is complete.",
    "You're one step away from finishing all five.",
    "Great work. Let's close the loop.",
    "This is the final piece for today's chapter.",
    "You have done the study work. Now let's finish with the word game.",
    "One more round and the day is complete.",
    "You're close enough to see the finish.",
    "Let's land the plane with the final task.",
    "Last move. Keep the momentum for a few more minutes.",
    "You have one task left, and this is the fun one.",
    "Almost there. Let's wrap today's chapter journey.",
    "The hard part is behind you. One final step remains.",
    "You're nearly done. Let's finish with Scrambled.",
    "One more task, then the full daily flow is complete.",
    "This is the closing step for today's study.",
    "Finish strong with the final round.",
  ],
};

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickLouisProgressOpener(completedCount: number, seed: string) {
  const bucket = louisProgressOpeners[Math.max(0, Math.min(4, completedCount))] ?? louisProgressOpeners[0];
  return bucket[stableHash(seed) % bucket.length];
}

function getTaskNumberLabel(task: TaskState | null) {
  if (!task) return "the next task";
  if (task.kind === "devotional") return "task 1";
  if (task.kind === "reading") return "task 2";
  if (task.kind === "notes") return "task 3";
  if (task.kind === "trivia") return "task 4";
  return "task 5";
}

function getChapterFocusSummary(task: TaskState | null) {
  const book = (task?.book || "").toLowerCase().trim();
  const chapter = task?.chapter ?? null;
  const chapterLabel = task?.chapterLabel || (task?.book && task?.chapter ? `${task.book} ${task.chapter}` : "today's chapter");

  if (book === "genesis") {
    if (chapter === 37) return "Joseph's dreams, his brothers' jealousy, and the betrayal that sends him toward Egypt.";
    if (chapter === 38) return "Judah's family story, broken choices, and God's mercy in the middle of the mess.";
    if (chapter === 39) return "Joseph in Potiphar's house, where faithfulness is tested by temptation and injustice.";
    if (chapter === 40) return "Joseph in prison with the cupbearer and baker while he is still waiting on God.";
    if (chapter === 41) return "Joseph going from prison to Pharaoh as God turns hidden preparation into public purpose.";
    if (chapter === 42) return "Joseph's brothers coming to Egypt as guilt, famine, and God's long plan begin to surface.";
    if (chapter === 43) return "the brothers returning with Benjamin and facing mercy they do not yet understand.";
    if (chapter === 44) return "Judah being tested and offering himself in Benjamin's place.";
    if (chapter === 45) return "Joseph revealing who he is and forgiveness breaking into a painful family story.";
    if (chapter === 46) return "Jacob moving to Egypt and hearing God promise to stay with him.";
    if (chapter === 47) return "Joseph leading through famine and Israel settling in Egypt under God's provision.";
    if (chapter === 48) return "Jacob blessing Joseph's sons and trusting God's promise for the next generation.";
    if (chapter === 49) return "Jacob's final words over his sons and the future God is shaping for Israel.";
    if (chapter === 50) return "grief, forgiveness, and Joseph's confidence that God meant it for good.";
  }

  if (book === "proverbs") {
    if (chapter === 1) return "the start of wisdom and why the fear of the Lord comes first.";
    if (chapter === 2) return "searching for wisdom like treasure and letting God guard your path.";
    if (chapter === 3) return "trusting the Lord, walking humbly, and valuing wisdom more than riches.";
    if (chapter === 4) return "getting wisdom, staying on the right path, and guarding your heart.";
    if (chapter === 5) return "staying faithful and seeing where destructive desire really leads.";
    if (chapter === 6) return "diligence, pride, reckless choices, and the habits that can quietly hurt a life.";
    if (chapter === 7) return "how temptation pulls people in when they drift too close to danger.";
    if (chapter === 8) return "Wisdom calling out in the open and showing why she is worth seeking.";
    if (chapter === 9) return "the two invitations of Wisdom and Folly and which table you choose.";
    if (chapter === 10) return "the daily patterns that separate wisdom from foolishness.";
    if (chapter === 11) return "integrity, humility, generosity, and living honestly before God.";
    if (chapter === 12) return "correction, steady work, truth-telling, and words that heal.";
    if (chapter === 13) return "discipline, teachability, careful speech, and long-term wisdom.";
    if (chapter === 14) return "the way that seems right and why wisdom looks deeper than first impressions.";
    if (chapter === 15) return "gentle answers, teachable hearts, prayer, and wise speech.";
    if (chapter === 16) return "making plans while trusting that the Lord weighs motives and directs steps.";
    if (chapter === 17) return "family, friendship, conflict, restraint, and the wisdom relationships need.";
    if (chapter === 18) return "listening well, choosing humility, and using words that give life.";
    if (chapter === 19) return "patience, generosity, discipline, and God's purpose over human plans.";
    if (chapter === 20) return "work, conflict, counsel, honesty, and self-control in everyday life.";
    if (chapter === 21) return "the heart God weighs and the justice He values more than appearances.";
    if (chapter === 22) return "a good name, humility, training, generosity, and wise boundaries.";
    if (chapter === 23) return "appetite, envy, drunkenness, and desires that need wisdom's guardrails.";
    if (chapter === 24) return "refusing to envy evil and choosing counsel, courage, and faithful work.";
    if (chapter === 25) return "humility, patience, restraint, and words spoken at the right time.";
    if (chapter === 26) return "folly, laziness, meddling, gossip, and the discernment to know what to avoid.";
    if (chapter === 27) return "tomorrow, faithful friendship, correction, and careful stewardship.";
    if (chapter === 28) return "confession, justice, generosity, courage, and the difference between wickedness and righteousness.";
    if (chapter === 29) return "receiving correction and escaping the trap of fearing people more than God.";
    if (chapter === 30) return "Agur's humility, daily bread, and the wisdom God teaches through creation.";
    if (chapter === 31) return "wisdom that serves, speaks for the vulnerable, works faithfully, and fears the Lord.";
  }

  return `what God is showing you in ${chapterLabel}.`;
}

function buildTaskFocusLine(task: TaskState | null, remainingTasks: number) {
  if (!task) {
    return "Your next Bible step is ready whenever you are.";
  }

  const chapterLabel = task.chapterLabel || "today's chapter";
  const chapterSummary = getChapterFocusSummary(task);

  if (task.kind === "devotional") {
    return `Today's Bible study is built around ${chapterLabel}. This chapter is about ${chapterSummary}`;
  }

  if (task.kind === "reading") {
    return `Nice, the devotional is done. Now read ${chapterLabel} and stay with ${chapterSummary}`;
  }

  if (task.kind === "notes") {
    return `Good work getting the chapter read. Now review the notes so ${chapterSummary} starts to click.`;
  }

  if (task.kind === "trivia") {
    return `You have the reading and notes down. Play trivia for ${chapterLabel} and see what you remember.`;
  }

  return `One more task to go. Play Scrambled for ${chapterLabel} and finish today's Bible study.`;
}

function getShortTaskName(task: TaskState | null) {
  if (!task) return "today's last Bible study task";
  if (task.kind === "devotional") return "today's devotional";
  if (task.kind === "reading") return task.chapterLabel ? `reading ${task.chapterLabel}` : "today's chapter";
  if (task.kind === "notes") return task.chapterLabel ? `${task.chapterLabel} notes` : "today's notes";
  if (task.kind === "trivia") return "trivia";
  if (task.kind === "scrambled") return "Scrambled";
  return task.title;
}

function buildDailyStudySummaryLine({
  allDone,
  completedTasks,
  remainingTasks,
  totalTasks,
  timeLeftLabel,
  nextTask,
}: {
  allDone: boolean;
  completedTasks: number;
  remainingTasks: number;
  totalTasks: number;
  timeLeftLabel: string | null;
  nextTask: TaskState | null;
}) {
  if (allDone) {
    return timeLeftLabel
      ? `All ${totalTasks} tasks done. New tasks in ${timeLeftLabel}.`
      : `All ${totalTasks} tasks done.`;
  }

  const timePrefix = timeLeftLabel ? `You have ${timeLeftLabel}` : "You have time";

  if (remainingTasks <= 1) {
    return `${completedTasks} done. ${timePrefix} to finish ${getShortTaskName(nextTask)} today.`;
  }

  if (completedTasks === 0) {
    return `${timePrefix} for today's ${totalTasks} tasks.`;
  }

  return `${completedTasks} done. ${timePrefix} for the last ${remainingTasks} tasks today.`;
}

export default function DashboardJourneyExperience({
  userId,
  userName,
  profile,
  levelInfo,
  primaryRecommendation,
  checklistData,
  isLoadingChecklist,
  dailyTaskTimeLeftLabel,
  membershipStatus,
  daysRemaining,
  exploreLinks,
  onOpenLevelInfo,
  onOpenStreakInfo,
  onOpenDailyTasks,
  onTaskClick,
  cycleStartedAt,
  onDevotionalChanged,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousDoneByKindRef = useRef<Record<string, boolean> | null>(null);
  const previousCompletedCountRef = useRef<number | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [celebratingTasks, setCelebratingTasks] = useState<Record<string, number>>({});
  const [progressCelebrationKey, setProgressCelebrationKey] = useState(0);
  const [showDevotionalSettings, setShowDevotionalSettings] = useState(false);
  const [devotionalOptions, setDevotionalOptions] = useState<DevotionalOption[]>([]);
  const [selectedDevotionalId, setSelectedDevotionalId] = useState("");
  const [isLoadingDevotionalOptions, setIsLoadingDevotionalOptions] = useState(false);
  const [isSavingDevotional, setIsSavingDevotional] = useState(false);
  const [isResettingDevotional, setIsResettingDevotional] = useState(false);
  const [devotionalSettingsMessage, setDevotionalSettingsMessage] = useState<string | null>(null);

  const totalTasks = checklistData?.tasks.length ?? 5;
  const completedTasks = checklistData?.completedCount ?? 0;
  const allDone = checklistData?.allDone ?? false;
  const nextTask = checklistData?.tasks.find((task) => !task.done) ?? null;
  const nextActionTaskKind = checklistData?.tasks.find((task) => !task.done && !task.disabled)?.kind ?? null;
  const currentDevotionalTask = checklistData?.tasks.find((task) => task.kind === "devotional") ?? null;
  const currentDevotionalId = currentDevotionalTask?.devotionalId || "";
  const isPaidUser = profile?.is_paid === true;
  const remainingTasks = Math.max(totalTasks - completedTasks, 0);
  const dailyStudySummaryLine = buildDailyStudySummaryLine({
    allDone,
    completedTasks,
    remainingTasks,
    totalTasks,
    timeLeftLabel: dailyTaskTimeLeftLabel,
    nextTask,
  });
  const streak = profile?.current_streak ?? 0;
  const devotionalTask = checklistData?.tasks.find((task) => task.kind === "devotional") ?? null;
  const readingTask = checklistData?.tasks.find((task) => task.kind === "reading") ?? null;
  const greetingName = userName && userName !== "buddy" ? userName : "buddy";
  function buildLouisMessage() {
    const streakLine = `Hey ${greetingName}, you are on a ${streak} day streak.`;

    if (allDone) {
      return {
        streakLine,
        nextLine: "You finished all 5 of today’s Bible tasks. Great job showing up.",
      };
    }

    if (!nextTask) {
      return {
        streakLine,
        nextLine: "Your next Bible step is ready whenever you are.",
      };
    }

    if (nextTask.kind === "devotional") {
      return {
        streakLine,
        nextLine: `Let’s continue today with ${nextTask.title}.`,
      };
    }

    if (nextTask.kind === "reading") {
      return {
        streakLine,
        nextLine: devotionalTask?.done
          ? `Congrats on finishing ${devotionalTask.title}. Keep going and read ${readingTask?.chapterLabel || nextTask.title}.`
          : `Keep going and read ${readingTask?.chapterLabel || nextTask.title}.`,
      };
    }

    if (nextTask.kind === "notes") {
      return {
        streakLine,
        nextLine: `Great job reading ${readingTask?.chapterLabel || "today’s chapter"}. Keep going and review the notes next.`,
      };
    }

    if (nextTask.kind === "trivia") {
      return {
        streakLine,
        nextLine: `Nice work on the reading and notes. Keep going and finish the trivia for ${readingTask?.chapterLabel || "today’s chapter"}.`,
      };
    }

    return {
      streakLine,
      nextLine: `You are almost done. Finish ${nextTask.title} to complete today’s journey.`,
    };
  }

  function buildLouisNextStepMessage() {
    if (allDone) {
      return {
        focusLine: dailyTaskTimeLeftLabel
          ? `Great job showing up. Your next Bible study tasks start in ${dailyTaskTimeLeftLabel}.`
          : "Great job showing up. Your next Bible study tasks will unlock with the next daily cycle.",
      };
    }

    if (!nextTask) {
      return {
        focusLine: "Your next Bible step is ready whenever you are.",
      };
    }

    return {
      focusLine: buildTaskFocusLine(nextTask, remainingTasks),
    };
  }

  const louisMessage = buildLouisNextStepMessage();

  useEffect(() => {
    if (!showDevotionalSettings || !isPaidUser) return;

    let cancelled = false;

    async function loadDevotionalOptions() {
      setIsLoadingDevotionalOptions(true);
      setDevotionalSettingsMessage(null);

      const { data, error } = await supabase
        .from("devotionals")
        .select("id, title, total_days")
        .order("title", { ascending: true })
        .limit(100);

      if (cancelled) return;

      if (error) {
        console.error("[DASHBOARD] Could not load devotionals:", error);
        setDevotionalSettingsMessage("Louis could not load the devotional list. Try again in a moment.");
        setDevotionalOptions([]);
      } else {
        const options = (data || []) as DevotionalOption[];
        setDevotionalOptions(options);
        setSelectedDevotionalId(currentDevotionalId || options[0]?.id || "");
      }

      setIsLoadingDevotionalOptions(false);
    }

    void loadDevotionalOptions();

    return () => {
      cancelled = true;
    };
  }, [showDevotionalSettings, isPaidUser, currentDevotionalId]);

  async function handleSaveDevotionalSetting() {
    if (!userId || !cycleStartedAt || !selectedDevotionalId || !isPaidUser) return;

    const selected = devotionalOptions.find((devotional) => devotional.id === selectedDevotionalId);
    setIsSavingDevotional(true);
    setDevotionalSettingsMessage(null);

    try {
      const [{ data: progressRows, error: progressError }, { error: profileError }] = await Promise.all([
        supabase
          .from("devotional_progress")
          .select("day_number, is_completed")
          .eq("user_id", userId)
          .eq("devotional_id", selectedDevotionalId),
        supabase
          .from("profile_stats")
          .upsert({ user_id: userId, free_devotional_id: selectedDevotionalId }, { onConflict: "user_id" }),
      ]);

      if (progressError) throw progressError;
      if (profileError) throw profileError;

      const completedDays = (progressRows || [])
        .filter((row: { is_completed: boolean | null }) => row.is_completed === true)
        .map((row: { day_number: number }) => row.day_number);
      const maxCompletedDay = completedDays.length ? Math.max(...completedDays) : 0;
      const totalDays = Math.max(1, selected?.total_days || 1);
      const nextDay = Math.min(maxCompletedDay + 1, totalDays);

      rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
        devotionalId: selectedDevotionalId,
        dayNumber: nextDay,
      });

      setDevotionalSettingsMessage(`${selected?.title || "Your devotional"} is set for your daily tasks.`);
      onDevotionalChanged();
      window.setTimeout(() => setShowDevotionalSettings(false), 650);
    } catch (error) {
      console.error("[DASHBOARD] Could not save devotional setting:", error);
      setDevotionalSettingsMessage("Louis could not save that devotional. Try again in a moment.");
    } finally {
      setIsSavingDevotional(false);
    }
  }

  async function handleResetCurrentDevotional() {
    if (!userId || !currentDevotionalId || isResettingDevotional) return;

    setIsResettingDevotional(true);
    setDevotionalSettingsMessage(null);

    try {
      const { error } = await supabase
        .from("devotional_progress")
        .delete()
        .eq("user_id", userId)
        .eq("devotional_id", currentDevotionalId);

      if (error) throw error;

      if (cycleStartedAt) {
        rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
          devotionalId: currentDevotionalId,
          dayNumber: 1,
        });
      }

      setSelectedDevotionalId(currentDevotionalId);
      setDevotionalSettingsMessage("Louis reset this devotional back to Day 1.");
      onDevotionalChanged();
    } catch (error) {
      console.error("[DASHBOARD] Could not reset devotional:", error);
      setDevotionalSettingsMessage("Louis could not reset this devotional. Try again in a moment.");
    } finally {
      setIsResettingDevotional(false);
    }
  }

  useEffect(() => {
    if (!checklistData?.tasks.length || isLoadingChecklist) return;

    const currentDoneByKind = checklistData.tasks.reduce<Record<string, boolean>>((acc, task) => {
      acc[task.kind] = task.done;
      return acc;
    }, {});
    const previousDoneByKind = previousDoneByKindRef.current;
    const previousCompletedCount = previousCompletedCountRef.current;

    if (previousDoneByKind) {
      const newlyDoneKinds = checklistData.tasks
        .filter((task) => task.done && !previousDoneByKind[task.kind])
        .map((task) => task.kind);

      if (newlyDoneKinds.length > 0) {
        const celebrationId = Date.now();
        setCelebratingTasks((prev) => {
          const next = { ...prev };
          newlyDoneKinds.forEach((kind) => {
            next[kind] = celebrationId;
          });
          return next;
        });

        window.setTimeout(() => {
          setCelebratingTasks((prev) => {
            const next = { ...prev };
            newlyDoneKinds.forEach((kind) => {
              if (next[kind] === celebrationId) {
                delete next[kind];
              }
            });
            return next;
          });
        }, 1800);
      }
    }

    if (previousCompletedCount !== null && checklistData.completedCount > previousCompletedCount) {
      setProgressCelebrationKey((prev) => prev + 1);
    }

    previousDoneByKindRef.current = currentDoneByKind;
    previousCompletedCountRef.current = checklistData.completedCount;
  }, [checklistData, isLoadingChecklist]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleScroll() {
      const current = containerRef.current;
      if (!current) return;
      const width = current.clientWidth || 1;
      setActivePage(Math.round(current.scrollLeft / width));
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  function snapToPage(index: number) {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });
    setActivePage(index);
  }

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes task-complete-pop {
          0% { transform: scale(1); box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08); }
          28% { transform: scale(1.025); box-shadow: 0 16px 34px rgba(34, 185, 95, 0.22); }
          100% { transform: scale(1); box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08); }
        }

        @keyframes task-firework {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.25); }
          18% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--spark-x), var(--spark-y)) scale(1); }
        }

        @keyframes done-sparkle {
          0%, 100% { opacity: 0.35; transform: translateY(0) scale(0.85); }
          50% { opacity: 1; transform: translateY(-1px) scale(1.08); }
        }

        @keyframes progress-glow {
          0% { box-shadow: 0 0 0 rgba(159, 206, 133, 0); }
          35% { box-shadow: 0 0 18px rgba(159, 206, 133, 0.9); }
          100% { box-shadow: 0 0 0 rgba(159, 206, 133, 0); }
        }

        @keyframes next-task-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 0 rgba(123, 175, 212, 0.42);
            border-color: #b8d9ef;
          }
          50% {
            transform: scale(1.012);
            box-shadow: 0 12px 28px rgba(75, 156, 211, 0.2), 0 0 0 6px rgba(123, 175, 212, 0.16);
            border-color: #7BAFD4;
          }
        }

        .task-complete-pop { animation: task-complete-pop 850ms ease-out; }
        .task-firework span { animation: task-firework 900ms ease-out forwards; }
        .done-sparkle span { animation: done-sparkle 1.8s ease-in-out infinite; }
        .done-sparkle span:nth-child(2) { animation-delay: 0.45s; }
        .done-sparkle span:nth-child(3) { animation-delay: 0.9s; }
        .progress-glow { animation: progress-glow 950ms ease-out; }
        .next-task-pulse { animation: next-task-pulse 2.2s ease-in-out infinite; }
        .spark-a { --spark-x: -42px; --spark-y: -42px; }
        .spark-b { --spark-x: 18px; --spark-y: -56px; }
        .spark-c { --spark-x: 68px; --spark-y: -20px; }
        .spark-d { --spark-x: 42px; --spark-y: 34px; }
        .spark-e { --spark-x: -28px; --spark-y: 30px; }
      `}</style>
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <section className={`w-full shrink-0 snap-start px-1 ${activePage === 0 ? "" : "h-0 overflow-hidden"}`}>
          <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
            <div
              className={`relative w-full overflow-visible rounded-[26px] border text-left shadow-sm transition hover:shadow-md ${getDailyStudyCardClasses(allDone)}`}
            >
              {!isLoadingChecklist ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowDevotionalSettings((current) => !current);
                  }}
                  className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-[0px] text-gray-950 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]/35"
                  aria-label="Daily Bible Study settings"
                  title="Daily Bible Study settings"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.08A1.7 1.7 0 0 0 4.6 8a1.7 1.7 0 0 0-.34-1.87l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.7 1.7 0 0 0 8.96 3.6 1.7 1.7 0 0 0 10 2.04V2a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.7 1.7 0 0 0 19.4 8c.17.6.78 1.04 1.56 1.04H21a2 2 0 1 1 0 4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
                  </svg>
                  ⚙
                </button>
              ) : null}
              <button
                type="button"
                onClick={onOpenDailyTasks}
                className="w-full rounded-[26px] px-4 py-4 text-left"
              >
              {isLoadingChecklist ? (
                <>
                  <div className="mb-2 flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">Daily Bible Study</h2>
                    <div className="flex h-6 items-center gap-1">
                      <span className="animate-[bounce_1.4s_ease-in-out_infinite] text-2xl text-gray-500">.</span>
                      <span className="animate-[bounce_1.4s_ease-in-out_0.2s_infinite] text-2xl text-gray-500">.</span>
                      <span className="animate-[bounce_1.4s_ease-in-out_0.4s_infinite] text-2xl text-gray-500">.</span>
                    </div>
                  </div>
                  <div className="mb-3 h-3 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-1/3 animate-pulse rounded-full bg-[#9dc1ee]" />
                  </div>
                  <div className="h-4 w-48 rounded bg-gray-200" />
                </>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full border border-white/90 bg-white/80 p-1.5 shadow-sm">
                        <LouisAvatar mood={allDone ? "stareyes" : "wave"} size={46} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-6 text-gray-800">{louisMessage.focusLine}</p>
                      </div>
                    </div>

                    <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
                      <div
                        key={progressCelebrationKey}
                        className={`h-2.5 rounded-full transition-all duration-700 ${progressCelebrationKey > 0 ? "progress-glow" : ""} ${allDone ? "bg-[#9fce85]" : "bg-[#d8aa57]"}`}
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(100, Math.round((completedTasks / Math.max(totalTasks, 1)) * 100))
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="mt-2.5 text-[13px] sm:text-sm">
                      <p className="min-w-0 text-center font-bold text-gray-800">
                        {dailyStudySummaryLine}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              </button>

              {showDevotionalSettings ? (
                <div
                  className="absolute right-3 top-14 z-30 w-[min(22rem,calc(100vw-3rem))] rounded-2xl border border-[#cfe4f3] bg-white p-4 text-left shadow-xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-gray-950">Daily devotional</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Choose which devotional Louis uses for your daily task flow.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDevotionalSettings(false)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500 transition hover:bg-gray-200"
                      aria-label="Close devotional settings"
                    >
                      ×
                    </button>
                  </div>

                  {isPaidUser ? (
                    <div className="mt-4 space-y-3">
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                        Devotional
                      </label>
                      <select
                        value={selectedDevotionalId}
                        onChange={(event) => setSelectedDevotionalId(event.target.value)}
                        disabled={isLoadingDevotionalOptions || isSavingDevotional}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#7BAFD4] focus:ring-2 focus:ring-[#7BAFD4]/25 disabled:opacity-60"
                      >
                        {isLoadingDevotionalOptions ? (
                          <option>Loading devotionals...</option>
                        ) : (
                          devotionalOptions.map((devotional) => (
                            <option key={devotional.id} value={devotional.id}>
                              {devotional.title}
                            </option>
                          ))
                        )}
                      </select>
                      <p className="text-xs leading-5 text-gray-500">
                        Louis will continue from your next unfinished day in the devotional you choose.
                      </p>
                      {devotionalSettingsMessage ? (
                        <p className="rounded-xl bg-[#f4f9fd] px-3 py-2 text-xs font-medium text-[#315f7d]">
                          {devotionalSettingsMessage}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        onClick={handleSaveDevotionalSetting}
                        disabled={!selectedDevotionalId || isSavingDevotional || isLoadingDevotionalOptions || isResettingDevotional}
                        className="w-full rounded-full bg-[#7BAFD4] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSavingDevotional ? "Saving..." : "Set devotional"}
                      </button>
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
                        <p className="text-xs font-bold text-gray-900">Reset current devotional</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Start the devotional you are on back at Day 1. This clears devotional day progress for this study.
                        </p>
                        <button
                          type="button"
                          onClick={handleResetCurrentDevotional}
                          disabled={!currentDevotionalId || isSavingDevotional || isResettingDevotional}
                          className="mt-3 w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isResettingDevotional ? "Resetting..." : "Reset current devotional"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-[#f0d7b3] bg-[#fff8ef] p-4">
                      <p className="text-sm font-bold text-gray-950">Free devotional access</p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">
                        As a free user, you can use one devotional at a time. Upgrade to Pro to switch between every Bible Buddy devotional and keep exploring different studies.
                      </p>
                      <Link
                        href="/upgrade"
                        className="mt-4 inline-flex w-full justify-center rounded-full bg-[#7BAFD4] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
                      >
                        Upgrade for full access
                      </Link>
                      <div className="mt-4 rounded-2xl border border-[#ead7bd] bg-white/70 p-3">
                        <p className="text-xs font-bold text-gray-900">Reset current devotional</p>
                        <p className="mt-1 text-xs leading-5 text-gray-600">
                          Start the devotional you are on back at Day 1. This clears devotional day progress for this study.
                        </p>
                        {devotionalSettingsMessage ? (
                          <p className="mt-3 rounded-xl bg-[#f4f9fd] px-3 py-2 text-xs font-medium text-[#315f7d]">
                            {devotionalSettingsMessage}
                          </p>
                        ) : null}
                        <button
                          type="button"
                          onClick={handleResetCurrentDevotional}
                          disabled={!currentDevotionalId || isResettingDevotional}
                          className="mt-3 w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isResettingDevotional ? "Resetting..." : "Reset current devotional"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {isLoadingChecklist ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-4 w-44 rounded bg-[#d9e4f7]" />
                    <div className="h-7 w-16 rounded-full bg-[#e7eefb]" />
                  </div>
                </div>
              ))
            ) : (
              checklistData?.tasks.map((task, index) => {
                const taskCopy = getTaskCardCopy(task, index);
                const isCelebrating = Boolean(celebratingTasks[task.kind]);
                const isNextActionTask = task.kind === nextActionTaskKind;

                return (
                <button
                  key={task.kind}
                  type="button"
                  onClick={() => onTaskClick(task)}
                  disabled={task.disabled}
                  className={`relative w-full overflow-hidden rounded-xl border px-3.5 py-3.5 text-left shadow-sm transition sm:px-4 ${
                    isCelebrating ? "task-complete-pop" : ""
                  } ${
                    isNextActionTask ? "next-task-pulse" : ""
                  } ${
                    task.done
                      ? "border-green-200 bg-gradient-to-r from-green-50 via-white to-green-50 hover:bg-green-50"
                      : task.disabled
                        ? "border-gray-200 bg-gray-100 text-gray-400"
                        : "border-[#d8e4f6] bg-gradient-to-r from-white via-white to-[#f7fbff] hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-2xl shadow-sm ${
                        task.done ? taskCopy.doneAccent : taskCopy.idleAccent
                      }`}
                    >
                      <span className="drop-shadow-sm" aria-hidden="true">{taskCopy.emoji}</span>
                      {task.done ? (
                        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#22b95f] text-xs font-black text-white ring-2 ring-white">
                          ✓
                        </span>
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-bold leading-tight text-gray-950 sm:text-base">{taskCopy.title}</p>
                      <p className="mt-1 max-w-[18rem] text-xs leading-5 text-gray-700 sm:text-sm">{taskCopy.subtitle}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="flex flex-col items-end gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${getTaskPillClasses(task)}`}>
                          {task.pointsLabel}
                        </span>
                        <span className={`relative flex items-center gap-1 text-[11px] font-medium ${task.done ? "text-green-700" : "text-gray-500"}`}>
                          <span aria-hidden="true">{task.done ? "▣" : "○"}</span>
                          {task.done ? (
                            <span className="done-sparkle pointer-events-none absolute -inset-x-2 -top-3 flex justify-between text-[10px] text-amber-400" aria-hidden="true">
                              <span>✦</span>
                              <span>✧</span>
                              <span>✦</span>
                            </span>
                          ) : null}
                          {getTaskStatusLine(task)}
                        </span>
                      </div>
                      <span className="text-xl leading-none text-gray-400" aria-hidden="true">›</span>
                    </div>
                  </div>
                  {isCelebrating ? (
                    <div className="task-firework pointer-events-none absolute left-[52px] top-[48px]" aria-hidden="true">
                      <span className="spark-a absolute text-sm text-amber-400">✦</span>
                      <span className="spark-b absolute text-xs text-green-400">✧</span>
                      <span className="spark-c absolute text-sm text-sky-400">✦</span>
                      <span className="spark-d absolute text-xs text-amber-400">✧</span>
                      <span className="spark-e absolute text-sm text-green-400">✦</span>
                    </div>
                  ) : null}
                </button>
                );
              })
            )}

          </div>
        </section>

        <section className={`w-full shrink-0 snap-start px-1 ${activePage === 1 ? "" : "h-0 overflow-hidden"}`}>
              <div className="mx-auto flex max-w-xl flex-col gap-5">
            {membershipStatus === "pro" && daysRemaining !== null && daysRemaining > 0 ? (
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 shadow-sm">
                <p className="text-sm font-medium text-blue-800">
                  Pro expires in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
                </p>
              </div>
            ) : null}

            {exploreLinks.map((link) => (
              <Link key={link.key} href={link.href} onClick={link.onClick}>
                <div className={`cursor-pointer rounded-xl border p-5 shadow-sm transition hover:scale-[1.01] hover:shadow-md ${link.accent}`}>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {link.emoji} {link.title}
                  </h2>
                  <p className="mt-2 text-base leading-6 text-gray-700">{link.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          {[0, 1].map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => snapToPage(index)}
              className={`h-2.5 rounded-full transition-all ${
                activePage === index ? "w-10 bg-[#7BAFD4]" : "w-2.5 bg-[#cfe4f3]"
              }`}
              aria-label={index === 0 ? "Open Daily Bible Study" : "Open Explore"}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => snapToPage(0)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activePage === 0 ? "bg-[#7BAFD4] text-slate-950 shadow-sm" : "bg-white text-gray-700 shadow-sm"
            }`}
          >
            Daily Bible Study
          </button>
          <button
            type="button"
            onClick={() => snapToPage(1)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activePage === 1 ? "bg-[#7BAFD4] text-slate-950 shadow-sm" : "bg-white text-gray-700 shadow-sm"
            }`}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
