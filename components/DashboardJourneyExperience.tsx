"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LouisAvatar } from "./LouisAvatar";
import { ModalShell } from "./ModalShell";
import BibleReadingModal from "./BibleReadingModal";
import DashboardDailyTaskCallout from "./DashboardDailyTaskCallout";
import type { ChecklistData, TaskState } from "./LouisDailyTasksModal";
import type { DailyRecommendation } from "../lib/dailyRecommendation";
import { supabase } from "../lib/supabaseClient";
import { rememberLouisDailyTaskTarget } from "../lib/louisDailyFlow";
import { BIBLE_STUDY_SERIES_CATALOG } from "../lib/bibleStudiesCatalog";
import { getBookTotalChapters, getCompletedChapters } from "../lib/readingProgress";
import {
  canFreeUserUnlockChapter,
  formatFreePlanCountdown,
  getNextLocalDayStartMs,
  rememberFreeChapterUnlock,
  type FreeChapterUnlockTarget,
} from "../lib/freePlanGating";

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
  activeTask: TaskState | null;
  onActiveTaskClose: () => void;
  onActiveTaskProgressUpdated: (completedTask?: TaskState) => void;
  cycleStartedAt: string | null;
  studySettingsOpenRequest?: number;
  homeHeader?: ReactNode;
  onDevotionalChanged: () => void;
};

type DevotionalOption = {
  id: string;
  title: string;
  total_days: number | null;
};

type NextStudyRecommendation = {
  targetKey: string;
  devotionalId: string;
  dayNumber: number;
  title: string;
  subtitle: string;
  cover: string;
  description: string;
  chapterLabel: string;
  tasks: TaskState[];
};

const HIDDEN_STUDY_SWITCHER_TITLES = new Set([
  "The Tempting of Jesus",
  "The Disciples of Jesus",
  "Women of the Bible",
]);

function getDashboardStudyCover(title: string | null | undefined) {
  if (title === "The Creation of the World") return "/creationoftheworld.png";
  if (title === "The Fall of Man") return "/thefallofman.png";
  if (title === "The Flood of Noah") return "/Floodofnoah.png";
  if (title === "The Obedience of Abraham") return "/TheobedienceofAbraham.png";
  if (title === "The Promise Through Isaac") return "/ThePromiseThroughIsaac.png";
  if (title === "The Wrestling of Jacob") return "/TheWrestlingofJacob.png";
  if (title === "The Rise of Esther") return "/theriseofester.png";
  if (title === "The Courage of Daniel") return "/thecourageofdaniel.png";
  if (title === "The Testing of Joseph") return "/TheTestingofJospehnewcover.png";
  if (title === "The Wisdom of Proverbs") return "/Wisdomofproverbsnewcover.png";
  if (title === "The Heart of David") return "/heartofdaviddevotional.png";
  if (title === "The Faith of Job") return "/faithofjob.png";
  if (title === "The Calling of Moses") return "/callingofmosesdevotional.png";
  if (title === "The Transforming of Paul") return "/transformingofpauldevotional.png";
  return null;
}

function getDashboardStudySummary(title: string | null | undefined, totalDays: number | null | undefined) {
  if (title === "The Creation of the World") return "Study Genesis 1-2 through creation, Eden, image of God, purpose, rest, and relationship.";
  if (title === "The Fall of Man") return "Study Genesis 3-4 through temptation, shame, Cain and Abel, violence, exile, and hope.";
  if (title === "The Flood of Noah") return "Study Genesis 5-10 through death, corruption, judgment, Noah's obedience, covenant, and the nations.";
  if (title === "The Obedience of Abraham") return "Walk Genesis 11-25 through Abraham's call, waiting, covenant, testing, and legacy.";
  if (title === "The Promise Through Isaac") return "Study Genesis 26-27 through Isaac, wells, favoritism, Jacob, Esau, deception, and blessing.";
  if (title === "The Wrestling of Jacob") return "Study Genesis 28-36 through Bethel, Rachel, Leah, Laban, wrestling, Esau, renewal, and Edom.";
  if (title === "The Rise of Esther") return "Follow Esther 1-10 through palace pressure, hidden identity, courage, providence, and reversal.";
  if (title === "The Courage of Daniel") return "Study Daniel 1-6 through exile, courage, wisdom, prayer, pressure, and the lions' den.";
  if (title === "The Testing of Joseph") return "Walk Genesis 37-50 through betrayal, waiting, wisdom, forgiveness, and God's hidden plan.";
  if (title === "The Wisdom of Proverbs") return "Study Proverbs chapter by chapter for practical wisdom in speech, choices, discipline, and daily life.";
  return `${Math.max(1, totalDays || 1)} part Bible study designed to help you keep growing with structure and consistency.`;
}

function getBibleJourneyHandoff(title: string | null | undefined) {
  if (title === "The Creation of the World") {
    return {
      nextTitle: "The Fall of Man",
      subtitle: "Genesis 3-4",
      cover: "/thefallofman.png",
      description:
        "Next, Genesis 3-4 shows what happens when sin enters the story: temptation, shame, exile, Cain and Abel, and the first signs of humanity's need for redemption.",
    };
  }

  if (title === "The Fall of Man") {
    return {
      nextTitle: "The Flood of Noah",
      subtitle: "Genesis 5-10",
      cover: "/Floodofnoah.png",
      description:
        "Next, Genesis 5-10 shows death spreading through the generations, corruption filling the earth, Noah obeying God, the flood, covenant mercy, and the nations after judgment.",
    };
  }

  if (title === "The Obedience of Abraham") {
    return {
      nextTitle: "The Promise Through Isaac",
      subtitle: "Genesis 26-27",
      cover: "/ThePromiseThroughIsaac.png",
      description:
        "Next, Genesis 26-27 shows Isaac carrying Abraham's promise while wells, fear, favoritism, Jacob, Esau, deception, and blessing reshape the covenant family.",
    };
  }

  if (title === "The Promise Through Isaac") {
    return {
      nextTitle: "The Wrestling of Jacob",
      subtitle: "Genesis 28-36",
      cover: "/TheWrestlingofJacob.png",
      description:
        "Next, Genesis 28-36 follows Jacob fleeing, meeting God at Bethel, facing Laban's deception, building a complicated family, wrestling with God, and becoming Israel.",
    };
  }

  return null;
}

function getTaskStatusCopy(task: TaskState) {
  if (task.done) return task.completedAtLabel || "Completed";
  if (task.disabled) return "Finish the earlier task first.";
  return "Tap to continue";
}

function getTaskPillClasses(task: TaskState) {
  if (task.done) return "bg-green-100 text-green-700";
  if (task.disabled) return "bg-gray-200 text-gray-500";
  return "bg-gray-200 text-gray-600";
}

function getTaskCardCopy(task: TaskState, _index: number) {
  if (task.kind === "devotional") {
    return {
      title: "Read Chapter Intro",
      subtitle: "Understand what you are about to read before you begin the chapter.",
      emoji: "📕",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "reading") {
    return {
      title: task.title,
      subtitle: "Read today's Bible chapter and reflect on it.",
      emoji: "✝️",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "notes") {
    return {
      title: task.title,
      subtitle: "Read and study the notes to understand more deeply.",
      emoji: "📝",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "trivia") {
    return {
      title: task.title,
      subtitle: "Test your understanding with 5 quick questions.",
      emoji: "🧠",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "reflection") {
    return {
      title: "Answer The Reflection Question",
      subtitle: "Share what this chapter is stirring in you.",
      emoji: "âœï¸",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  return {
    title: task.title,
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

function parseTaskEstimateMinutes(label: string | null | undefined) {
  if (!label) return 0;
  const hoursMatch = label.match(/(\d+(?:\.\d+)?)\s*h/i);
  const minutesMatch = label.match(/(\d+)\s*m/i);
  const plainNumberMatch = label.match(/(\d+)/);
  if (hoursMatch) {
    return Math.round(Number(hoursMatch[1]) * 60) + (minutesMatch ? Number(minutesMatch[1]) : 0);
  }
  if (minutesMatch) return Number(minutesMatch[1]);
  return plainNumberMatch ? Number(plainNumberMatch[1]) : 0;
}

function formatStudyEstimate(minutes: number) {
  if (minutes <= 0) return "Est Study Time: --";
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    return remaining ? `Est Study Time: ${hours}h ${remaining}m` : `Est Study Time: ${hours}h`;
  }
  return `Est Study Time: ${minutes} mins`;
}

function normalizeDashboardBookKey(book: string) {
  const rawBookKey = book.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
  return rawBookKey === "songofsolomon" ? "songofsongs" : rawBookKey;
}

function buildDashboardChapterLabel(book: string, chapter: number) {
  return `${book} ${chapter}`;
}

function buildPreloadedNextChapterTasks({
  devotionalId,
  devotionalTitle,
  dayNumber,
  book,
  chapter,
}: {
  devotionalId: string;
  devotionalTitle: string | null | undefined;
  dayNumber: number;
  book: string;
  chapter: number;
}): TaskState[] {
  const chapterLabel = buildDashboardChapterLabel(book, chapter);
  const bookKey = normalizeDashboardBookKey(book);

  return [
    {
      kind: "devotional",
      title: `Read Chapter Intro for ${chapterLabel}`,
      pointsLabel: "+5 pts",
      timeEstimateLabel: "2 min",
      href: `/bible-studies/${devotionalId}?day=${dayNumber}&from=louis-daily-task`,
      done: false,
      devotionalId,
      devotionalTitle,
      devotionalDayNumber: dayNumber,
      book,
      chapter,
      chapterLabel,
    },
    {
      kind: "reading",
      title: `Read ${chapterLabel}`,
      pointsLabel: "+5 pts",
      timeEstimateLabel: "4 min",
      href: `/Bible/${encodeURIComponent(book)}/${chapter}?from=louis-daily-task`,
      done: false,
      disabled: true,
      devotionalId,
      devotionalTitle,
      devotionalDayNumber: dayNumber,
      book,
      chapter,
      chapterLabel,
    },
    {
      kind: "notes",
      title: `Review ${chapterLabel} Notes`,
      pointsLabel: "+5 pts",
      timeEstimateLabel: "12 min",
      href: `/Bible/${encodeURIComponent(book)}/${chapter}?notes=1&from=louis-daily-task`,
      done: false,
      disabled: true,
      devotionalId,
      devotionalTitle,
      devotionalDayNumber: dayNumber,
      book,
      chapter,
      chapterLabel,
    },
    {
      kind: "trivia",
      title: `Play Trivia for ${chapterLabel}`,
      pointsLabel: "Up to +5",
      timeEstimateLabel: "4 min",
      href: `/bible-trivia/${bookKey}/${chapter}?from=louis-daily-task`,
      done: false,
      disabled: true,
      devotionalId,
      devotionalTitle,
      devotionalDayNumber: dayNumber,
      book,
      chapter,
      chapterLabel,
    },
    {
      kind: "scrambled",
      title: `Play Scrambled for ${chapterLabel}`,
      pointsLabel: "Up to +5",
      timeEstimateLabel: "4 min",
      href: `/bible-study-games/scrambled/${bookKey}/${chapter}?from=louis-daily-task`,
      done: false,
      disabled: true,
      devotionalId,
      devotionalTitle,
      devotionalDayNumber: dayNumber,
      book,
      chapter,
      chapterLabel,
    },
    {
      kind: "reflection",
      title: "Answer The Reflection Question",
      pointsLabel: "+5 pts",
      timeEstimateLabel: "3 min",
      href: `/bible-studies/${devotionalId}?day=${dayNumber}&from=louis-daily-task-reflection`,
      done: false,
      disabled: true,
      devotionalId,
      devotionalTitle,
      devotionalDayNumber: dayNumber,
      book,
      chapter,
      chapterLabel,
    },
  ];
}

type ActiveTaskPrompt = {
  lineOne: string;
  lineTwo: string;
};

const DASHBOARD_BIBLE_BOOKS = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

const DASHBOARD_BIBLE_BOOKS_PER_PAGE = 12;
const DASHBOARD_BIBLE_CHAPTERS_PER_PAGE = 16;

const activeTaskPrompts: ActiveTaskPrompt[] = [
  { lineOne: "This is next", lineTwo: "Open this task" },
  { lineOne: "Do this now", lineTwo: "Next task ready" },
  { lineOne: "Finish this one", lineTwo: "This task is open" },
  { lineOne: "Knock this out", lineTwo: "Start here next" },
  { lineOne: "This one now", lineTwo: "Your next task" },
  { lineOne: "Open this task", lineTwo: "Do this one next" },
  { lineOne: "Next task", lineTwo: "Start this one" },
  { lineOne: "Do this next", lineTwo: "This is the task" },
  { lineOne: "Start this one", lineTwo: "Next step ready" },
  { lineOne: "This is the one", lineTwo: "Tap to begin" },
  { lineOne: "Go here next", lineTwo: "This task is ready" },
  { lineOne: "Next step", lineTwo: "Do this task" },
  { lineOne: "Open next", lineTwo: "This task is active" },
  { lineOne: "Start here", lineTwo: "This one is next" },
  { lineOne: "Task ready", lineTwo: "Do this next" },
  { lineOne: "Take this one", lineTwo: "Next task open" },
  { lineOne: "Use this card", lineTwo: "This is next" },
  { lineOne: "Finish this task", lineTwo: "Open it now" },
  { lineOne: "Tap this one", lineTwo: "Next task ready" },
  { lineOne: "This card next", lineTwo: "Open to continue" },
  { lineOne: "Go to this", lineTwo: "Your next task" },
  { lineOne: "This task now", lineTwo: "Tap to start" },
  { lineOne: "Continue here", lineTwo: "This is next" },
  { lineOne: "Open and finish", lineTwo: "Current task" },
  { lineOne: "Do this card", lineTwo: "Next task active" },
  { lineOne: "Next one up", lineTwo: "Open this task" },
  { lineOne: "Start this task", lineTwo: "This is the one" },
  { lineOne: "Finish this step", lineTwo: "Next task ready" },
  { lineOne: "Move here next", lineTwo: "This task is open" },
  { lineOne: "Pick this one", lineTwo: "Current task" },
  { lineOne: "Do this step", lineTwo: "Open it now" },
  { lineOne: "Your next card", lineTwo: "Tap this one" },
  { lineOne: "Task is ready", lineTwo: "Start it now" },
  { lineOne: "Open this now", lineTwo: "Next task" },
  { lineOne: "This comes next", lineTwo: "Tap to continue" },
  { lineOne: "Current task", lineTwo: "Open this card" },
  { lineOne: "Next focus", lineTwo: "Do this one" },
  { lineOne: "Go in order", lineTwo: "This one is next" },
  { lineOne: "Finish next", lineTwo: "This task is ready" },
  { lineOne: "Open this step", lineTwo: "Do this next" },
  { lineOne: "This one first", lineTwo: "Next task active" },
  { lineOne: "Do this piece", lineTwo: "Current step" },
  { lineOne: "Tap to finish", lineTwo: "This task now" },
  { lineOne: "Begin this task", lineTwo: "Next step" },
  { lineOne: "Work this card", lineTwo: "This is next" },
];

const finalStretchTaskPrompts: Record<number, ActiveTaskPrompt[]> = {
  3: [
    { lineOne: "This is next", lineTwo: "Open this task" },
    { lineOne: "Do this now", lineTwo: "Next task ready" },
    { lineOne: "Open this task", lineTwo: "Do this one next" },
    { lineOne: "This one now", lineTwo: "Start here next" },
    { lineOne: "Next task", lineTwo: "Do this task" },
    { lineOne: "Take this one", lineTwo: "Current task" },
  ],
  2: [
    { lineOne: "This is next", lineTwo: "Open this task" },
    { lineOne: "Do this now", lineTwo: "Next task ready" },
    { lineOne: "Open this task", lineTwo: "Do this one next" },
    { lineOne: "This one now", lineTwo: "Start here next" },
    { lineOne: "Next task", lineTwo: "Do this task" },
    { lineOne: "Take this one", lineTwo: "Current task" },
  ],
  1: [
    { lineOne: "This is next", lineTwo: "Open this task" },
    { lineOne: "Do this now", lineTwo: "Next task ready" },
    { lineOne: "Open this task", lineTwo: "Finish this one" },
    { lineOne: "This one now", lineTwo: "Start here next" },
    { lineOne: "Current task", lineTwo: "Do this one" },
    { lineOne: "Take this one", lineTwo: "Open it now" },
  ],
};

function getActiveTaskPrompt(task: TaskState, remainingTasks: number, seed: string) {
  const finalStretchPrompts = remainingTasks <= 3 ? finalStretchTaskPrompts[remainingTasks] : null;
  const bucket = finalStretchPrompts?.length ? finalStretchPrompts : activeTaskPrompts;
  return bucket[stableHash(`${seed}:${task.kind}:${remainingTasks}`) % bucket.length];
}

function getTaskEmoji(task: TaskState) {
  if (task.kind === "devotional") return "\uD83D\uDCD5";
  if (task.kind === "reading") return "\u271D\uFE0F";
  if (task.kind === "notes") return "\uD83D\uDCDD";
  if (task.kind === "trivia") return "\uD83E\uDDE0";
  if (task.kind === "reflection") return "\u270D\uFE0F";
  return "\uD83D\uDD24";
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
    "Start here and let the rest of the Bible study build from this.",
    "Let's open the day by slowing down with the Bible study intro.",
    "First step for today: get your heart settled in the story.",
    "Let's begin clean and simple with today's Bible study intro.",
    "This first task sets the tone for the whole Bible study flow.",
    "Start with the Bible study intro and let the chapter come into focus.",
    "Let's ease into the Word with the first part of today's Bible study.",
    "A good day of study starts with one honest beginning.",
    "Let's get today's Bible study moving with the intro.",
    "Start here, take your time, and let the story breathe a little.",
    "The first task is ready, and this is where momentum starts.",
    "Let's begin with the Bible study intro before we move into the chapter.",
    "Today's Bible study starts with preparing your heart.",
    "Open with the Bible study intro and let it frame the rest of the tasks.",
    "Let's make the first move and start today's Bible study well.",
    "Begin here, then we will keep walking through the chapter together.",
    "This is the doorway into today's Bible study flow.",
    "Let's start with the Bible study intro and build from there.",
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
    "The Bible study intro is behind you, and the chapter is ready.",
    "Strong start. Let's stay with the story.",
    "You have the setup now, so let's read the text.",
    "Good work. The next step brings you straight into Scripture.",
    "You started with the Bible study intro, and now we keep going.",
    "Nice first move. Let's continue while the story is fresh.",
    "You have one task down and the day is taking shape.",
    "Good pace. Now let's move from the intro into the chapter.",
    "That's one completed step. Let's keep it simple and steady.",
    "You opened the door. Now let's walk into the chapter.",
    "Great start. The next task keeps today's focus grounded in Scripture.",
  ],
  2: [
    "Wow, you're on a roll.",
    "Nice work. The foundation is set now.",
    "You have the intro and reading done, so let's go deeper.",
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
    "You're close to finishing today's Bible study.",
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
    "Last task, and today's Bible study is complete.",
    "You're one step away from the final reflection.",
    "Great work. Let's close the loop.",
    "This is the final piece for today's chapter.",
    "You have done the study work. Now let's finish with the word game.",
    "One more round and the day is complete.",
    "You're close enough to see the finish.",
    "Let's land the plane with the final task.",
    "Last move. Keep the momentum for a few more minutes.",
    "You have one task left, and this is the fun one.",
    "Almost there. Let's wrap today's chapter study.",
    "The hard part is behind you. One final step remains.",
    "You're nearly done. Let's finish with Scrambled.",
    "One more task, then the full daily flow is complete.",
    "This is the closing step for today's study.",
    "Finish strong with the final round.",
  ],
  5: [
    "One more task to go.",
    "Final step for this chapter study.",
    "You're right at the finish line.",
    "Almost done. Let's finish with reflection.",
    "Last task, and this chapter study is complete.",
    "You're one step away from finishing all six.",
    "Great work. Let's close the loop with your reflection.",
    "This is the final piece for today's chapter.",
    "One reflection and the chapter study is complete.",
    "You're close enough to see the finish.",
    "Let's land this chapter with an honest thought.",
    "Last move. Take a minute and write what stood out.",
    "You have one task left, and this is where the study becomes personal.",
    "Almost there. Let's wrap today's chapter study.",
    "The hard part is behind you. One thoughtful response remains.",
    "You're nearly done. Let's finish with reflection.",
    "One more task, then the full chapter flow is complete.",
    "This is the closing step for the study.",
    "Finish strong with your reflection.",
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
  const bucket = louisProgressOpeners[Math.max(0, Math.min(5, completedCount))] ?? louisProgressOpeners[0];
  return bucket[stableHash(seed) % bucket.length];
}

function getTaskNumberLabel(task: TaskState | null) {
  if (!task) return "the next task";
  if (task.kind === "devotional") return "task 1";
  if (task.kind === "reading") return "task 2";
  if (task.kind === "notes") return "task 3";
  if (task.kind === "trivia") return "task 4";
  if (task.kind === "scrambled") return "task 5";
  return "task 6";
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
    return `Continue ${chapterLabel}. This chapter is about ${chapterSummary}`;
  }

  if (task.kind === "reading") {
    return `You've read the ${chapterLabel} intro. Now continue with ${chapterLabel} and stay with ${chapterSummary}`;
  }

  if (task.kind === "notes") {
    return `Good work getting the chapter read. Now review the notes so ${chapterSummary} starts to click.`;
  }

  if (task.kind === "trivia") {
    return `You have the reading and notes down. Play trivia for ${chapterLabel} and see what you remember.`;
  }

  if (task.kind === "scrambled") {
    return `You are almost done. Play Scrambled for ${chapterLabel} and let the chapter words stick.`;
  }

  return `One more task to go. Share your reflection for ${chapterLabel} and complete this chapter study.`;
}

const bibleStudyThemeMaps: Record<string, string[]> = {
  "the obedience of abraham": [
    "Abraham's family before the call",
    "God calling Abraham to leave what was familiar",
    "trusting God enough to let go",
    "courage for family",
    "God's promise under the stars",
    "waiting when impatience gets dangerous",
    "covenant, new names, and belonging to God",
    "the God who draws near",
    "mercy, judgment, and intercession",
    "old fears returning after real faith",
    "Isaac arriving after years of waiting",
    "Abraham's deepest test",
    "the Lord providing",
    "grief in the land of promise",
    "preparing for the next generation",
    "a life full of years",
    "faith that obeys without seeing the whole map",
    "believing the God who gives life",
    "faith that moves into action",
    "blessing beyond Abraham's lifetime",
    "a life marked by obedience",
  ],
  "the calling of moses": [
    "Moses' birth under threat",
    "Moses between Egypt and Israel",
    "Moses in the wilderness after failure",
    "God at the burning bush",
    "fear meeting God's call",
    "Moses returning to Egypt",
    "Pharaoh resisting God",
    "the plagues exposing false power",
    "Passover and rescue",
    "Israel leaving Egypt",
    "the Red Sea deliverance",
    "trust growing in the wilderness",
    "daily provision through manna",
    "water from the rock",
    "Sinai and covenant",
    "the golden calf and intercession",
    "God's presence going with His people",
    "leadership and shared burden",
    "obedience under pressure",
    "seeing the promised land",
    "Moses' life as a servant shaped by God's call",
  ],
  "the disciples of jesus": [
    "Jesus calling ordinary people",
    "Peter leaving the nets",
    "Andrew bringing others to Jesus",
    "James and John learning kingdom ambition",
    "Matthew leaving the tax booth",
    "Thomas bringing honest questions",
    "Philip learning to trust Jesus",
    "Nathanael being seen",
    "Simon laying down old loyalties",
    "Judas and the divided heart",
    "disciples in the storm",
    "Jesus feeding the crowds",
    "Peter confessing Christ",
    "a glimpse of glory",
    "the Last Supper and servant leadership",
    "Gethsemane and weakness",
    "Peter's denial",
    "restoration after failure",
    "the Great Commission",
    "the Spirit empowering witnesses",
    "following Jesus for a lifetime",
  ],
  "the faith of job": [
    "Job's faith before suffering",
    "loss without explanation",
    "honest grief before God",
    "friends who misunderstand pain",
    "wrestling with righteous suffering",
    "refusing shallow answers",
    "feeling unseen by God",
    "wisdom that cannot be bought",
    "remembering former days",
    "defending integrity",
    "Elihu entering the conversation",
    "God speaking from the whirlwind",
    "creation humbling certainty",
    "reverence beyond answers",
    "God confronting false comfort",
    "restoration after suffering",
    "faith through unanswered questions",
    "lament as real trust",
    "the limits of human wisdom",
    "God's greatness in suffering",
    "endurance that still worships",
  ],
  "the heart of david": [
    "David being chosen while overlooked",
    "the shepherd learning trust",
    "Goliath and courage rooted in God",
    "jealousy after victory",
    "David hunted but not abandoned",
    "Jonathan's friendship",
    "David in the wilderness",
    "strengthening himself in the Lord",
    "refusing revenge",
    "Abigail and wisdom in conflict",
    "trusting God's timing again",
    "David becoming king over Judah",
    "uniting the kingdom",
    "worship with abandon",
    "God's covenant promise",
    "David's fall",
    "repentance after sin",
    "mercy and consequences",
    "David fleeing Absalom",
    "praise after deliverance",
    "David's final charge and legacy",
  ],
  "the courage of daniel": [
    "faithfulness in a new world",
    "the God who reveals secrets",
    "faith inside the fire",
    "the king who had to look up",
    "the writing on the wall",
    "prayer above survival",
  ],
  "the rise of esther": [
    "exile before Esther",
    "God's people away from home",
    "return and rebuilding",
    "a royal feast and a queen removed",
    "Esther entering the palace",
    "Mordecai and hidden faithfulness",
    "Haman's pride rising",
    "a decree against God's people",
    "Esther facing her moment",
    "fasting before courage",
    "Esther entering the court",
    "Haman's plot turning",
    "the sleepless night",
    "honor coming to Mordecai",
    "Esther exposing Haman",
    "deliverance taking shape",
    "God's reversal of evil plans",
    "Purim and remembered rescue",
    "courage for such a time as this",
    "hidden providence",
    "Esther's rise and God's unseen hand",
  ],
  "the transforming of paul": [
    "Saul at Stephen's death",
    "Saul breathing threats",
    "Jesus meeting Saul on the road",
    "three days in the dark",
    "a changed man received by the church",
    "Paul set apart for the work",
    "driven out but still moving",
    "the fight for grace",
    "singing in prison",
    "reasoning in Athens",
    "the Lord saying do not be afraid",
    "revival and resistance in Ephesus",
    "Paul's farewell",
    "bound for Jerusalem",
    "Paul telling his story",
    "taking courage in custody",
    "two years waiting",
    "almost persuaded",
    "storm and shipwreck",
    "preaching in chains",
    "finishing the race",
  ],
  "women of the bible": [
    "women shaping God's story",
    "women before Jesus",
    "Jesus honoring and restoring women",
    "Eve and the first promise",
    "Sarah laughing at the impossible",
    "Hagar and the God who sees",
    "Rebekah choosing into God's story",
    "Rachel and Leah's pain",
    "Miriam leading worship",
    "Rahab's unlikely faith",
    "Deborah leading with courage",
    "Ruth's loyalty beyond loss",
    "Hannah praying through pain",
    "Bathsheba and grace beyond tragedy",
    "Esther stepping into courage",
    "Mary saying yes",
    "Mary Magdalene as first witness",
    "the woman at the well",
    "the woman who touched Jesus' robe",
    "Priscilla teaching with clarity",
    "what these women's lives mean",
  ],
  "the tempting of jesus": [
    "the enemy's tricks and Jesus' victory",
    "Jesus entering the wilderness",
    "why fighting temptation is hard",
    "the steps temptation takes",
    "Jesus at twelve",
    "hidden preparation",
    "John preparing the way",
    "Jesus' baptism",
    "the Trinity revealed",
    "the Spirit leading Jesus into wilderness",
    "stones into bread",
    "living by God's Word",
    "Israel's wilderness story",
    "how Jesus answers temptation",
    "all the kingdoms",
    "worshiping God only",
    "the pride of life",
    "refusing to test God",
    "power surrendered to purpose",
    "the armor of God",
    "never being alone in temptation",
  ],
  "the testing of joseph": [
    "Joseph's dreams and family jealousy",
    "Judah, Tamar, and the family line",
    "Joseph's faithfulness under temptation",
    "Joseph waiting in prison",
    "Joseph interpreting Pharaoh's dreams",
    "the brothers facing famine and guilt",
    "Benjamin and family pressure",
    "Judah offering himself",
    "Joseph revealing himself",
    "Jacob moving to Egypt",
    "Joseph leading through famine",
    "Jacob blessing Joseph's sons",
    "Jacob's final words",
    "Joseph forgiving what was meant for evil",
  ],
  "the wisdom of proverbs": [],
  "the gospel of luke": [
    "Luke's careful account of Jesus",
    "announcements of hope",
    "Jesus' birth and good news for the lowly",
    "Jesus growing in wisdom",
    "John preparing the way",
    "Jesus beginning His mission",
    "calling disciples and healing the broken",
    "the kingdom reversing expectations",
    "faith, forgiveness, and following Jesus",
    "Jesus sending His followers",
    "mercy like the Good Samaritan",
    "prayer, trust, and hearing Jesus",
    "repentance and readiness",
    "the lost being found",
    "costly discipleship",
    "the rich, the poor, and the kingdom",
    "Jesus on the road to Jerusalem",
    "Zacchaeus and salvation coming home",
    "Jesus entering Jerusalem",
    "the cross drawing near",
    "the risen Jesus opening eyes and Scripture",
  ],
  "ruth": [
    "loss in Bethlehem and Moab",
    "Ruth's loyal choice",
    "returning empty but not abandoned",
    "gleaning under God's providence",
    "Boaz noticing Ruth with kindness",
    "refuge under God's wings",
    "Naomi beginning to hope",
    "the threshing floor and courageous trust",
    "Boaz acting as redeemer",
    "a family line restored",
    "Ruth in David's story",
    "ordinary faithfulness becoming redemption",
  ],
};

function normalizeStudyTitle(value: string | null | undefined) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getStudyTheme(task: TaskState | null, offset = 0) {
  const studyKey = normalizeStudyTitle(task?.devotionalTitle || task?.devotionalId);
  const exactKey = Object.keys(bibleStudyThemeMaps).find((key) => studyKey === key || studyKey.includes(key) || key.includes(studyKey));
  if (!exactKey) return null;
  const themes = bibleStudyThemeMaps[exactKey];
  if (!themes.length) return null;
  const rawNumber = task?.devotionalDayNumber || task?.chapter || 1;
  const index = Math.max(0, Math.min(themes.length - 1, rawNumber - 1 + offset));
  return themes[index] || null;
}

function getChapterStudyTheme(task: TaskState | null) {
  const studyTheme = getStudyTheme(task);
  if (studyTheme) return studyTheme;

  const book = (task?.book || "").toLowerCase().trim();
  const chapter = task?.chapter ?? null;

  if (book === "proverbs") {
    if (chapter === 1) return "where wisdom begins and why reverence for the Lord comes first";
    if (chapter === 2) return "searching for wisdom like treasure";
    if (chapter === 3) return "trusting the Lord with your whole path";
    if (chapter === 4) return "guarding your heart and staying on wisdom's road";
    if (chapter === 5) return "faithfulness and the danger of destructive desire";
    if (chapter === 6) return "habits, warnings, and the small choices that shape a life";
    if (chapter === 7) return "recognizing temptation before it pulls you in";
    if (chapter === 8) return "Wisdom calling out in the open";
    if (chapter === 9) return "the two invitations every heart has to choose between";
    if (chapter === 10) return "the everyday difference between wisdom and foolishness";
    if (chapter === 11) return "integrity, humility, and generous living";
    if (chapter === 12) return "truthful words, teachability, and steady work";
    if (chapter === 13) return "discipline, patience, and long-term wisdom";
    if (chapter === 14) return "seeing beneath what only looks right";
    if (chapter === 15) return "gentle answers and a teachable heart";
    if (chapter === 16) return "planning with humility before the Lord";
    if (chapter === 17) return "wisdom inside family, friendship, and conflict";
    if (chapter === 18) return "the weight of words and the power of listening";
    if (chapter === 19) return "patience, generosity, and God's purpose";
    if (chapter === 20) return "self-control, counsel, and honest work";
    if (chapter === 21) return "the heart God weighs and the justice He loves";
    if (chapter === 22) return "a good name, humility, and wise boundaries";
    if (chapter === 23) return "desire, appetite, and the guardrails wisdom gives";
    if (chapter === 24) return "courage, counsel, and refusing to envy evil";
    if (chapter === 25) return "humility, restraint, and words spoken at the right time";
    if (chapter === 26) return "spotting folly before it spreads";
    if (chapter === 27) return "faithful friendship, correction, and careful stewardship";
    if (chapter === 28) return "confession, justice, courage, and righteousness";
    if (chapter === 29) return "receiving correction and fearing God more than people";
    if (chapter === 30) return "humility, daily bread, and wisdom in creation";
    if (chapter === 31) return "wisdom lived with strength, service, and fear of the Lord";
    return "wisdom for real life";
  }

  if (book === "genesis") {
    if (chapter === 37) return "Joseph's dreams and the family wound that begins his testing";
    if (chapter === 38) return "Judah, Tamar, and God's work inside a broken family line";
    if (chapter === 39) return "Joseph's faithfulness under temptation and injustice";
    if (chapter === 40) return "Joseph waiting faithfully in prison";
    if (chapter === 41) return "God lifting Joseph from prison into purpose";
    if (chapter === 42) return "the brothers facing famine, guilt, and Joseph without knowing it";
    if (chapter === 43) return "Benjamin, mercy, and the pressure building in Joseph's family";
    if (chapter === 44) return "Judah stepping forward when Benjamin is tested";
    if (chapter === 45) return "Joseph revealing himself and forgiveness breaking through";
    if (chapter === 46) return "Jacob moving toward Egypt with God's promise over him";
    if (chapter === 47) return "Joseph leading through famine while Israel settles in Egypt";
    if (chapter === 48) return "Jacob blessing the next generation";
    if (chapter === 49) return "Jacob's final words and the future of Israel";
    if (chapter === 50) return "forgiveness, grief, and God meaning it for good";
    return "God's faithful work through the Joseph story";
  }

  return task?.chapterLabel ? `what ${task.chapterLabel} is teaching` : "the next part of this Bible study";
}

function buildCompletedChapterMessage({
  completedChapterLabel,
  nextChapterLabel,
  chapterTask,
}: {
  completedChapterLabel: string;
  nextChapterLabel: string;
  chapterTask: TaskState | null;
}) {
  const currentTheme = getChapterStudyTheme(chapterTask);
  const nextTask =
    chapterTask
      ? ({
          ...chapterTask,
          chapter: chapterTask.chapter ? chapterTask.chapter + 1 : chapterTask.chapter,
          devotionalDayNumber: chapterTask.devotionalDayNumber ? chapterTask.devotionalDayNumber + 1 : chapterTask.devotionalDayNumber,
          chapterLabel: nextChapterLabel,
        } as TaskState)
      : null;
  const nextTheme = getChapterStudyTheme(nextTask);
  const variants = [
    `Congrats on finishing ${completedChapterLabel}. Are you ready to step into ${nextChapterLabel} and keep following ${nextTheme}?`,
    `You finished ${completedChapterLabel}, and that is real progress. When you are ready, ${nextChapterLabel} will keep building on ${nextTheme}.`,
    `Great work finishing ${completedChapterLabel}. The next chapter opens the door to ${nextTheme}, so start ${nextChapterLabel} when you are ready.`,
    `${completedChapterLabel} is complete. Nice work staying with ${currentTheme}; now ${nextChapterLabel} is ready to take you into ${nextTheme}.`,
    `That chapter study is finished. You walked through ${completedChapterLabel}, and ${nextChapterLabel} is ready when you want to keep going with ${nextTheme}.`,
    `Well done. ${completedChapterLabel} is behind you now, and ${nextChapterLabel} is waiting with more of ${nextTheme}.`,
  ];

  return variants[stableHash(`${completedChapterLabel}:${nextChapterLabel}`) % variants.length];
}

function getShortTaskName(task: TaskState | null) {
  if (!task) return "today's last Bible study task";
  if (task.kind === "devotional") return "today's chapter intro";
  if (task.kind === "reading") return task.chapterLabel ? `reading ${task.chapterLabel}` : "today's chapter";
  if (task.kind === "notes") return task.chapterLabel ? `${task.chapterLabel} notes` : "today's notes";
  if (task.kind === "trivia") return "trivia";
  if (task.kind === "scrambled") return "Scrambled";
  if (task.kind === "reflection") return task.chapterLabel ? `the ${task.chapterLabel} reflection` : "the reflection";
  return task.title;
}

function buildDailyStudySummaryLine({
  allDone,
  completedTasks,
  remainingTasks,
  totalTasks,
  nextTask,
}: {
  allDone: boolean;
  completedTasks: number;
  remainingTasks: number;
  totalTasks: number;
  nextTask: TaskState | null;
}) {
  if (allDone) {
    return `Chapter study complete.`;
  }

  if (remainingTasks <= 1) {
    return `${completedTasks} done. One step remains: ${getShortTaskName(nextTask)}.`;
  }

  if (completedTasks === 0) {
    return `Start this chapter study when you are ready.`;
  }

  return `${completedTasks} done. ${remainingTasks} steps left in this chapter study.`;
}

function buildStudyProgressMotivation({
  allDone,
  completedTasks,
  totalTasks,
  nextTaskTitle,
  chapterLabel,
}: {
  allDone: boolean;
  completedTasks: number;
  totalTasks: number;
  nextTaskTitle: string;
  chapterLabel: string;
}) {
  const safeTotal = Math.max(totalTasks, 1);
  const safeCompleted = Math.max(0, Math.min(completedTasks, safeTotal));
  const remaining = Math.max(safeTotal - safeCompleted, 0);
  const progressKey = `${chapterLabel}:${nextTaskTitle}:${safeCompleted}:${safeTotal}`;
  const pick = (lines: string[]) => lines[stableHash(progressKey) % lines.length];

  if (allDone || remaining === 0) {
    return pick([
      `${chapterLabel} is wrapped. Strong finish. The next chapter is ready when you are.`,
      `You finished every step for ${chapterLabel}. That is steady, faithful work.`,
      `Chapter complete. Take a breath, then keep the momentum moving when you are ready.`,
      `All ${safeTotal} tasks are done. You stayed with it all the way through.`,
    ]);
  }

  if (safeCompleted === 0) {
    return pick([
      `Start with ${nextTaskTitle}. One focused step gets ${chapterLabel} moving.`,
      `${chapterLabel} is waiting for you. Begin with ${nextTaskTitle} and build from there.`,
      `No rush. Open ${nextTaskTitle}, get one win, and let the chapter unfold.`,
      `Fresh chapter, fresh rhythm. ${nextTaskTitle} is the next right step.`,
    ]);
  }

  if (remaining === 1) {
    return pick([
      `You are one task away from finishing ${chapterLabel}. Bring it home with ${nextTaskTitle}.`,
      `Last step: ${nextTaskTitle}. You have carried this chapter well.`,
      `One more task closes the chapter. Finish strong with ${nextTaskTitle}.`,
      `Almost there. ${nextTaskTitle} is the final piece for ${chapterLabel}.`,
    ]);
  }

  if (safeCompleted <= 2) {
    return pick([
      `Keep going. ${remaining} tasks left to wrap up ${chapterLabel}.`,
      `Good start. Stay with ${nextTaskTitle}, then you will have ${remaining - 1} more to go.`,
      `You have momentum now. ${remaining} steps remain in this chapter study.`,
      `${safeCompleted} of ${safeTotal} done. Keep stacking small faithful wins.`,
    ]);
  }

  if (safeCompleted >= safeTotal - 2) {
    return pick([
      `You are deep into ${chapterLabel}. ${remaining} tasks left, and the finish line is close.`,
      `This is the home stretch. ${nextTaskTitle} keeps the chapter moving.`,
      `${safeCompleted} of ${safeTotal} complete. You have been locked in.`,
      `Almost finished. ${remaining} more focused steps will close this chapter.`,
    ]);
  }

  return pick([
    `${safeCompleted} of ${safeTotal} done. ${nextTaskTitle} is your next move.`,
    `You are halfway into the work. Keep your rhythm with ${nextTaskTitle}.`,
    `Nice progress. ${remaining} tasks remain for ${chapterLabel}.`,
    `You are building understanding one step at a time. Next up: ${nextTaskTitle}.`,
  ]);
}

export default function DashboardJourneyExperience({
  userId,
  userName,
  profile,
  levelInfo,
  primaryRecommendation,
  checklistData,
  isLoadingChecklist,
  membershipStatus,
  daysRemaining,
  exploreLinks,
  onOpenLevelInfo,
  onOpenStreakInfo,
  onOpenDailyTasks,
  onTaskClick,
  activeTask,
  onActiveTaskClose,
  onActiveTaskProgressUpdated,
  cycleStartedAt,
  studySettingsOpenRequest = 0,
  homeHeader,
  onDevotionalChanged,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swipeStartXRef = useRef<number | null>(null);
  const previousDoneByKindRef = useRef<Record<string, boolean> | null>(null);
  const previousCompletedCountRef = useRef<number | null>(null);
  const previousJourneyKeyRef = useRef<string | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [celebratingTasks, setCelebratingTasks] = useState<Record<string, number>>({});
  const [progressCelebrationKey, setProgressCelebrationKey] = useState(0);
  const [showCompletionPanel, setShowCompletionPanel] = useState(false);
  const [completedTasksExpanded, setCompletedTasksExpanded] = useState(false);
  const [isLoadingNextChapter, setIsLoadingNextChapter] = useState(false);
  const [isNewChapterDropping, setIsNewChapterDropping] = useState(false);
  const [preloadedNextChapter, setPreloadedNextChapter] = useState<{
    targetKey: string;
    chapterLabel: string;
    tasks: TaskState[];
  } | null>(null);
  const [preloadedNextStudy, setPreloadedNextStudy] = useState<NextStudyRecommendation | null>(null);
  const [showDevotionalSettings, setShowDevotionalSettings] = useState(false);
  const [showJourneyHelp, setShowJourneyHelp] = useState(false);
  const [devotionalOptions, setDevotionalOptions] = useState<DevotionalOption[]>([]);
  const [selectedDevotionalId, setSelectedDevotionalId] = useState("");
  const [isLoadingDevotionalOptions, setIsLoadingDevotionalOptions] = useState(false);
  const [isSavingDevotional, setIsSavingDevotional] = useState(false);
  const [isResettingDevotional, setIsResettingDevotional] = useState(false);
  const [devotionalSettingsMessage, setDevotionalSettingsMessage] = useState<string | null>(null);
  const [freePlanGate, setFreePlanGate] = useState<{ kind: "chapter" | "study"; chapterLabel?: string | null } | null>(null);
  const [freePlanCountdown, setFreePlanCountdown] = useState(() => formatFreePlanCountdown(getNextLocalDayStartMs() - Date.now()));
  const [embeddedBibleSelectedBook, setEmbeddedBibleSelectedBook] = useState<string | null>(null);
  const [embeddedBibleAlphabetical, setEmbeddedBibleAlphabetical] = useState(false);
  const [embeddedBibleCompletedChapters, setEmbeddedBibleCompletedChapters] = useState<number[]>([]);
  const [embeddedBibleReading, setEmbeddedBibleReading] = useState<{ book: string; chapter: number } | null>(null);
  const [embeddedStudyIdsByTitle, setEmbeddedStudyIdsByTitle] = useState<Record<string, string>>({});
  const [shareCopied, setShareCopied] = useState(false);

  const dashboardPageKeys = ["home", "bible", "bible_studies", "group", "tv", "games", "share"] as const;
  type DashboardPageKey = (typeof dashboardPageKeys)[number];
  const safeActivePage = Math.max(0, Math.min(activePage, dashboardPageKeys.length - 1));
  const exploreLinkByKey = (key: string) => exploreLinks.find((link) => link.key === key) ?? null;
  const dashboardPageLinks = {
    bible: exploreLinkByKey("bible"),
    bible_studies: exploreLinkByKey("bible_studies"),
    group: exploreLinkByKey("group"),
    tv: exploreLinkByKey("tv"),
    games: exploreLinkByKey("games"),
    share: exploreLinkByKey("share"),
  };
  const dashboardNavItems: Array<{
    key: DashboardPageKey;
    label: string;
    icon: string;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }> = [
    { key: "home", label: "Home", icon: "\u2302", href: "/dashboard" },
    { key: "bible", label: "The Bible", icon: "\uD83D\uDCD6", href: dashboardPageLinks.bible?.href || "/reading", onClick: dashboardPageLinks.bible?.onClick },
    { key: "bible_studies", label: "Bible Studies", icon: "\uD83C\uDF05", href: dashboardPageLinks.bible_studies?.href || "/bible-studies", onClick: dashboardPageLinks.bible_studies?.onClick },
    { key: "group", label: "Community", icon: "\uD83D\uDC65", href: dashboardPageLinks.group?.href || "/study-groups", onClick: dashboardPageLinks.group?.onClick },
    { key: "tv", label: "TV", icon: "\u25B6", href: dashboardPageLinks.tv?.href || "/biblebuddy-tv", onClick: dashboardPageLinks.tv?.onClick },
    { key: "games", label: "Games", icon: "\uD83C\uDFAE", href: dashboardPageLinks.games?.href || "/bible-study-games", onClick: dashboardPageLinks.games?.onClick },
    { key: "share", label: "Share", icon: "\u2197", href: dashboardPageLinks.share?.href || "#share-bible-buddy", onClick: dashboardPageLinks.share?.onClick },
  ];
  const isPaidUser = profile?.is_paid === true || membershipStatus === "pro";

  const isChecklistSyncing = isLoadingChecklist || !checklistData;
  const visibleTasks = checklistData?.tasks ?? [];
  const totalTasks = visibleTasks.length || 5;
  const completedTasks = checklistData?.completedCount ?? 0;
  const allDone = checklistData?.allDone ?? false;
  const canFreeUserChooseNewStudy = !isPaidUser && allDone && !checklistData?.nextJourneyTarget;

  useEffect(() => {
    if (studySettingsOpenRequest <= 0) return;
    setShowJourneyHelp(false);
    if (isPaidUser || canFreeUserChooseNewStudy) {
      setShowDevotionalSettings(true);
    } else {
      setFreePlanGate({ kind: "study" });
    }
  }, [canFreeUserChooseNewStudy, isPaidUser, studySettingsOpenRequest]);

  useEffect(() => {
    let cancelled = false;

    async function loadEmbeddedStudyIds() {
      const titles = BIBLE_STUDY_SERIES_CATALOG.map((study) => study.title);
      const { data, error } = await supabase
        .from("devotionals")
        .select("id, title")
        .in("title", titles);

      if (cancelled) return;
      if (error) {
        console.error("[DASHBOARD] Could not load embedded Bible Study links:", error);
        setEmbeddedStudyIdsByTitle({});
        return;
      }

      setEmbeddedStudyIdsByTitle(
        Object.fromEntries(
          ((data || []) as Array<{ id: string; title: string }>).map((study) => [study.title, study.id]),
        ),
      );
    }

    void loadEmbeddedStudyIds();

    return () => {
      cancelled = true;
    };
  }, []);

  const nextTask = visibleTasks.find((task) => !task.done) ?? null;
  const nextActionTaskIndex = visibleTasks.findIndex((task) => !task.done);
  const nextActionTaskKind =
    nextActionTaskIndex >= 0 && visibleTasks[nextActionTaskIndex] && !visibleTasks[nextActionTaskIndex].disabled
      ? visibleTasks[nextActionTaskIndex].kind
      : null;
  const currentDevotionalTask = visibleTasks.find((task) => task.kind === "devotional") ?? null;
  const currentDevotionalId = currentDevotionalTask?.devotionalId || "";
  const currentDevotionalTitle = currentDevotionalTask?.devotionalTitle || null;
  const currentStudyCover = getDashboardStudyCover(currentDevotionalTitle);
  const nextStudyHandoff = getBibleJourneyHandoff(currentDevotionalTitle);
  const remainingTasks = Math.max(totalTasks - completedTasks, 0);
  const completedChapterLabel =
    visibleTasks.find((task) => task.kind === "reading")?.chapterLabel ||
    visibleTasks.find((task) => task.chapterLabel)?.chapterLabel ||
    "this chapter";
  const nextChapterLabel = (() => {
    if (preloadedNextStudy?.chapterLabel) return preloadedNextStudy.chapterLabel;
    if (preloadedNextChapter?.chapterLabel) return preloadedNextChapter.chapterLabel;
    const chapterTask = visibleTasks.find((task) => task.book && task.chapter);
    if (!chapterTask?.book || !chapterTask.chapter || !checklistData?.nextJourneyTarget) return "the next chapter";
    return `${chapterTask.book} ${chapterTask.chapter + 1}`;
  })();
  const dailyStudySummaryLine = buildDailyStudySummaryLine({
    allDone,
    completedTasks,
    remainingTasks,
    totalTasks,
    nextTask,
  });
  const streak = profile?.current_streak ?? 0;
  const skeletonTasks = [
    { emoji: "📕", title: "Read Chapter Intro", subtitleWidth: "w-52" },
    { emoji: "✝️", title: "Read Chapter", subtitleWidth: "w-44" },
    { emoji: "📝", title: "Review Notes", subtitleWidth: "w-56" },
    { emoji: "🧠", title: "Play Trivia", subtitleWidth: "w-48" },
    { emoji: "🔤", title: "Play Scrambled", subtitleWidth: "w-52" },
    { emoji: "✍️", title: "Answer Reflection", subtitleWidth: "w-40" },
  ];
  const devotionalTask = visibleTasks.find((task) => task.kind === "devotional") ?? null;
  const readingTask = visibleTasks.find((task) => task.kind === "reading") ?? null;
  const chapterTask = readingTask || visibleTasks.find((task) => task.book && task.chapter) || null;
  const activeChapterLabel =
    isLoadingNextChapter && (preloadedNextChapter?.chapterLabel || preloadedNextStudy?.chapterLabel)
      ? preloadedNextChapter?.chapterLabel || preloadedNextStudy?.chapterLabel || "Your Chapter"
      : chapterTask?.chapterLabel ||
    visibleTasks.find((task) => task.chapterLabel)?.chapterLabel ||
    "Your Chapter";
  const currentChapterUnlockTarget: FreeChapterUnlockTarget | null =
    currentDevotionalId && currentDevotionalTask?.devotionalDayNumber
      ? {
          devotionalId: currentDevotionalId,
          dayNumber: currentDevotionalTask.devotionalDayNumber,
          chapterLabel: activeChapterLabel,
        }
      : null;
  const currentStudySummary = getDashboardStudySummary(currentDevotionalTitle, null);
  const queueTasks = visibleTasks.filter((task) => !task.done || celebratingTasks[task.kind]);
  const completedTrackerTasks = visibleTasks.filter((task) => task.done && !celebratingTasks[task.kind]);
  const displayTasks = isLoadingNextChapter && (preloadedNextChapter?.tasks.length || preloadedNextStudy?.tasks.length)
    ? preloadedNextChapter?.tasks.length
      ? preloadedNextChapter.tasks
      : preloadedNextStudy?.tasks || queueTasks
    : queueTasks;
  const displayNextActionTaskIndex = displayTasks.findIndex((task) => !task.done);
  const displayNextActionTaskKind =
    displayNextActionTaskIndex >= 0 && displayTasks[displayNextActionTaskIndex] && !displayTasks[displayNextActionTaskIndex].disabled
      ? displayTasks[displayNextActionTaskIndex].kind
      : null;
  const estimatedStudyMinutes = displayTasks
    .filter((task) => !task.done)
    .reduce((total, task) => total + parseTaskEstimateMinutes(task.timeEstimateLabel), 0);
  const estimatedStudyTimeLabel = formatStudyEstimate(estimatedStudyMinutes);
  const studyProgressTotal = Math.max(6, visibleTasks.length || displayTasks.length || 0);
  const studyProgressCompleted = Math.min(
    studyProgressTotal,
    visibleTasks.filter((task) => task.done).length,
  );
  const nextTaskDisplayIndex = nextTask ? visibleTasks.findIndex((task) => task.kind === nextTask.kind) : -1;
  const nextTaskTitle = nextTask
    ? getTaskCardCopy(nextTask, nextTaskDisplayIndex >= 0 ? nextTaskDisplayIndex : 0).title
    : allDone
      ? "Chapter Complete"
      : "Continue Your Study";
  const studyProgressMotivation = buildStudyProgressMotivation({
    allDone,
    completedTasks: studyProgressCompleted,
    totalTasks: studyProgressTotal,
    nextTaskTitle,
    chapterLabel: activeChapterLabel,
  });
  const shouldShowCompletionPanel =
    !isChecklistSyncing &&
    allDone &&
    queueTasks.length === 0 &&
    !isLoadingNextChapter &&
    showCompletionPanel;
  const greetingName = userName && userName !== "buddy" ? userName : "buddy";
  function buildLouisMessage() {
    const streakLine = `Hey ${greetingName}, you are on a ${streak} day streak.`;

    if (allDone) {
      return {
        streakLine,
        nextLine: "You finished every chapter task. Great job showing up.",
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
        nextLine: `Let's begin with the chapter intro so ${nextTask.chapterLabel || "today's chapter"} has context before you read.`,
      };
    }

    if (nextTask.kind === "reading") {
      return {
        streakLine,
        nextLine: devotionalTask?.done
          ? `The intro is done. Your next task is to read ${readingTask?.chapterLabel || nextTask.title}.`
          : `Your next task is to read ${readingTask?.chapterLabel || nextTask.title}.`,
      };
    }

    if (nextTask.kind === "notes") {
      return {
        streakLine,
        nextLine: `Reading is done. Your next task is to review the notes for ${readingTask?.chapterLabel || "today's chapter"}.`,
      };
    }

    if (nextTask.kind === "trivia") {
      return {
        streakLine,
        nextLine: `Notes are done. Your next task is trivia for ${readingTask?.chapterLabel || "today's chapter"}.`,
      };
    }

    return {
      streakLine,
      nextLine: `This is your next task: finish ${nextTask.title} to complete today's Bible study.`,
    };
  }

  function buildLouisNextStepMessage() {
    if (allDone) {
      return {
        focusLine: buildCompletedChapterMessage({
          completedChapterLabel,
          nextChapterLabel,
          chapterTask,
        }),
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
    if (!isPaidUser && currentChapterUnlockTarget && canFreeUserUnlockChapter(userId, currentChapterUnlockTarget)) {
      rememberFreeChapterUnlock(userId, currentChapterUnlockTarget);
    }
  }, [
    currentChapterUnlockTarget?.chapterLabel,
    currentChapterUnlockTarget?.dayNumber,
    currentChapterUnlockTarget?.devotionalId,
    isPaidUser,
    userId,
  ]);

  useEffect(() => {
    if (freePlanGate?.kind !== "chapter") return;
    const updateCountdown = () => {
      setFreePlanCountdown(formatFreePlanCountdown(getNextLocalDayStartMs() - Date.now()));
    };
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 30000);
    return () => window.clearInterval(interval);
  }, [freePlanGate?.kind]);

  function showFreeChapterLimit(target: FreeChapterUnlockTarget) {
    setFreePlanCountdown(formatFreePlanCountdown(getNextLocalDayStartMs() - Date.now()));
    setFreePlanGate({ kind: "chapter", chapterLabel: target.chapterLabel || "your next chapter" });
  }

  function freeUserCanStartChapter(target: FreeChapterUnlockTarget) {
    if (isPaidUser || canFreeUserUnlockChapter(userId, target)) return true;
    showFreeChapterLimit(target);
    return false;
  }

  useEffect(() => {
    if (!showDevotionalSettings) return;

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
        setDevotionalSettingsMessage("Louis could not load the Bible study list. Try again in a moment.");
        setDevotionalOptions([]);
      } else {
        const options = ((data || []) as DevotionalOption[]).filter(
          (option) => !HIDDEN_STUDY_SWITCHER_TITLES.has(option.title),
        );
        setDevotionalOptions(options);
        setSelectedDevotionalId(currentDevotionalId || options[0]?.id || "");
      }

      setIsLoadingDevotionalOptions(false);
    }

    void loadDevotionalOptions();

    return () => {
      cancelled = true;
    };
  }, [showDevotionalSettings, currentDevotionalId]);

  async function handleSaveDevotionalSetting() {
    if (!userId || !selectedDevotionalId) return;
    if (!isPaidUser && !canFreeUserChooseNewStudy && selectedDevotionalId !== currentDevotionalId) {
      setShowDevotionalSettings(false);
      setFreePlanGate({ kind: "study" });
      return;
    }

    const selected = devotionalOptions.find((devotional) => devotional.id === selectedDevotionalId);
    setIsSavingDevotional(true);
    setDevotionalSettingsMessage(null);

    try {
      const { data: progressRows, error: progressError } = await supabase
        .from("devotional_progress")
        .select("day_number, is_completed")
        .eq("user_id", userId)
        .eq("devotional_id", selectedDevotionalId);

      if (progressError) throw progressError;

      const completedDays = (progressRows || [])
        .filter((row: { is_completed: boolean | null }) => row.is_completed === true)
        .map((row: { day_number: number }) => row.day_number);
      const maxCompletedDay = completedDays.length ? Math.max(...completedDays) : 0;
      const totalDays = Math.max(1, selected?.total_days || 1);
      const nextDay = Math.min(maxCompletedDay + 1, totalDays);
      const nextTarget = {
        devotionalId: selectedDevotionalId,
        dayNumber: nextDay,
        chapterLabel: `${selected?.title || "Your Bible study"} chapter ${nextDay}`,
      };

      if (!isPaidUser && !freeUserCanStartChapter(nextTarget)) {
        setShowDevotionalSettings(false);
        return;
      }

      const { error: targetError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: selectedDevotionalId,
            louis_primary_devotional_id: selectedDevotionalId,
            louis_primary_devotional_day: nextDay,
          },
          { onConflict: "user_id" },
        );

      if (targetError) throw targetError;

      if (cycleStartedAt) {
        rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
          devotionalId: selectedDevotionalId,
          dayNumber: nextDay,
        });
      }
      rememberFreeChapterUnlock(userId, nextTarget);

      setDevotionalSettingsMessage(`${selected?.title || "Your Bible study"} is set for your daily tasks.`);
      onDevotionalChanged();
      window.setTimeout(() => setShowDevotionalSettings(false), 650);
    } catch (error) {
      console.error("[DASHBOARD] Could not save devotional setting:", error);
      setDevotionalSettingsMessage("Louis could not save that Bible study. Try again in a moment.");
    } finally {
      setIsSavingDevotional(false);
    }
  }

  async function handleResetCurrentDevotional() {
    const resetDevotionalId = selectedDevotionalId || currentDevotionalId;
    if (!userId || !resetDevotionalId || isResettingDevotional) return;

    setIsResettingDevotional(true);
    setDevotionalSettingsMessage(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("You need to be signed in to reset a Bible Study.");
      }

      const response = await fetch("/api/devotionals/reset-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ devotionalId: resetDevotionalId }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Could not reset this Bible Study.");
      }

      if (cycleStartedAt) {
        rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
          devotionalId: resetDevotionalId,
          dayNumber: 1,
        });
      }

      const { error: targetError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: resetDevotionalId,
            louis_primary_devotional_id: resetDevotionalId,
            louis_primary_devotional_day: 1,
          },
          { onConflict: "user_id" },
        );

      if (targetError) throw targetError;

      setSelectedDevotionalId(resetDevotionalId);
      setDevotionalSettingsMessage(`${result?.title || "This Bible Study"} was reset back to the beginning.`);
      onDevotionalChanged();
    } catch (error) {
      console.error("[DASHBOARD] Could not reset devotional:", error);
      setDevotionalSettingsMessage("Louis could not reset this Bible study. Try again in a moment.");
    } finally {
      setIsResettingDevotional(false);
    }
  }

  async function handleCompletedStudyAction() {
    if (!allDone) return;

    if (userId && cycleStartedAt && preloadedNextStudy?.devotionalId) {
      const nextTarget = {
        devotionalId: preloadedNextStudy.devotionalId,
        dayNumber: preloadedNextStudy.dayNumber,
        chapterLabel: preloadedNextStudy.chapterLabel,
      };
      if (!freeUserCanStartChapter(nextTarget)) return;

      setShowCompletionPanel(false);
      setIsLoadingNextChapter(true);
      setPreloadedNextChapter({
        targetKey: preloadedNextStudy.targetKey,
        chapterLabel: preloadedNextStudy.chapterLabel,
        tasks: preloadedNextStudy.tasks,
      });
      setIsNewChapterDropping(true);
      window.setTimeout(() => setIsNewChapterDropping(false), 1050);

      const { error } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: preloadedNextStudy.devotionalId,
            louis_primary_devotional_id: preloadedNextStudy.devotionalId,
            louis_primary_devotional_day: preloadedNextStudy.dayNumber,
          },
          { onConflict: "user_id" },
        );

      if (error) {
        console.error("[DASHBOARD] Could not sync next Bible Study:", error);
        setIsLoadingNextChapter(false);
        return;
      }

      await supabase.from("devotional_progress").upsert(
        {
          user_id: userId,
          devotional_id: preloadedNextStudy.devotionalId,
          day_number: preloadedNextStudy.dayNumber,
          is_completed: false,
          reading_completed: false,
        },
        { onConflict: "user_id,devotional_id,day_number" },
      );

      rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
        devotionalId: preloadedNextStudy.devotionalId,
        dayNumber: preloadedNextStudy.dayNumber,
      });
      rememberFreeChapterUnlock(userId, nextTarget);
      setShowDevotionalSettings(false);
      onDevotionalChanged();
      return;
    }

    if (userId && cycleStartedAt && checklistData?.nextJourneyTarget) {
      const nextTarget = {
        ...checklistData.nextJourneyTarget,
        chapterLabel: preloadedNextChapter?.chapterLabel || nextChapterLabel,
      };
      if (!freeUserCanStartChapter(nextTarget)) return;

      setShowCompletionPanel(false);
      setIsLoadingNextChapter(true);
      if (preloadedNextChapter?.tasks.length) {
        setIsNewChapterDropping(true);
        window.setTimeout(() => setIsNewChapterDropping(false), 1050);
      }
      const { error } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: checklistData.nextJourneyTarget.devotionalId,
            louis_primary_devotional_id: checklistData.nextJourneyTarget.devotionalId,
            louis_primary_devotional_day: checklistData.nextJourneyTarget.dayNumber,
          },
          { onConflict: "user_id" },
        );

      if (error) {
        console.error("[DASHBOARD] Could not sync next Bible Study chapter:", error);
        setIsLoadingNextChapter(false);
        return;
      }

      await supabase.from("devotional_progress").upsert(
        {
          user_id: userId,
          devotional_id: checklistData.nextJourneyTarget.devotionalId,
          day_number: checklistData.nextJourneyTarget.dayNumber,
          is_completed: false,
          reading_completed: false,
        },
        { onConflict: "user_id,devotional_id,day_number" },
      );

      rememberLouisDailyTaskTarget(userId, cycleStartedAt, checklistData.nextJourneyTarget);
      rememberFreeChapterUnlock(userId, nextTarget);
      setShowDevotionalSettings(false);
      onDevotionalChanged();
      return;
    }

    setShowJourneyHelp(false);
    setShowDevotionalSettings(true);
  }

  useEffect(() => {
    if (!checklistData?.tasks.length || isLoadingChecklist) return;

    const currentJourneyKey = checklistData.journeyKey || null;
    if (previousJourneyKeyRef.current && previousJourneyKeyRef.current !== currentJourneyKey) {
      setIsLoadingNextChapter(false);
      setShowCompletionPanel(false);
      setCompletedTasksExpanded(false);
      setPreloadedNextChapter(null);
      setPreloadedNextStudy(null);
      setIsNewChapterDropping(true);
      window.setTimeout(() => setIsNewChapterDropping(false), 1050);
    }
    previousJourneyKeyRef.current = currentJourneyKey;

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
        }, 840);
      }
    }

    if (previousCompletedCount !== null && checklistData.completedCount > previousCompletedCount) {
      setProgressCelebrationKey((prev) => prev + 1);
    }

    previousDoneByKindRef.current = currentDoneByKind;
    previousCompletedCountRef.current = checklistData.completedCount;
  }, [checklistData, isLoadingChecklist]);

  useEffect(() => {
    if (isChecklistSyncing || !allDone || queueTasks.length > 0 || isLoadingNextChapter) {
      setShowCompletionPanel(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowCompletionPanel(true);
    }, 70);

    return () => window.clearTimeout(timer);
  }, [allDone, isChecklistSyncing, isLoadingNextChapter, queueTasks.length]);

  useEffect(() => {
    const target = checklistData?.nextJourneyTarget;
    if (!allDone || !target) {
      setPreloadedNextChapter(null);
      return;
    }

    const targetKey = `${target.devotionalId}:${target.dayNumber}`;
    if (preloadedNextChapter?.targetKey === targetKey) return;
    const targetDevotionalId = target.devotionalId;
    const targetDayNumber = target.dayNumber;

    let cancelled = false;

    async function preloadNextChapter() {
      const { data, error } = await supabase
        .from("devotional_days")
        .select("bible_reading_book, bible_reading_chapter")
        .eq("devotional_id", targetDevotionalId)
        .eq("day_number", targetDayNumber)
        .maybeSingle();

      if (cancelled) return;
      if (error || !data) {
        if (error) console.error("[DASHBOARD] Could not preload next chapter cards:", error);
        return;
      }

      const book = String((data as any).bible_reading_book || "");
      const chapter = Number((data as any).bible_reading_chapter || 0);
      if (!book || !chapter) return;

      setPreloadedNextChapter({
        targetKey,
        chapterLabel: buildDashboardChapterLabel(book, chapter),
        tasks: buildPreloadedNextChapterTasks({
          devotionalId: targetDevotionalId,
          devotionalTitle: currentDevotionalTask?.devotionalTitle,
          dayNumber: targetDayNumber,
          book,
          chapter,
        }),
      });
    }

    void preloadNextChapter();

    return () => {
      cancelled = true;
    };
  }, [
    allDone,
    checklistData?.nextJourneyTarget?.devotionalId,
    checklistData?.nextJourneyTarget?.dayNumber,
    currentDevotionalTask?.devotionalTitle,
    preloadedNextChapter?.targetKey,
  ]);

  useEffect(() => {
    if (!allDone || checklistData?.nextJourneyTarget || !nextStudyHandoff) {
      setPreloadedNextStudy(null);
      return;
    }

    const handoff = nextStudyHandoff;
    const targetKey = `${currentDevotionalId || "current"}:${handoff.nextTitle}`;
    if (preloadedNextStudy?.targetKey === targetKey) return;

    let cancelled = false;

    async function preloadNextStudy() {
      const { data: devotional, error: devotionalError } = await supabase
        .from("devotionals")
        .select("id, title")
        .eq("title", handoff.nextTitle)
        .maybeSingle();

      if (cancelled) return;
      if (devotionalError || !devotional?.id) {
        if (devotionalError) console.error("[DASHBOARD] Could not preload next Bible Study:", devotionalError);
        return;
      }

      const { data: day, error: dayError } = await supabase
        .from("devotional_days")
        .select("bible_reading_book, bible_reading_chapter")
        .eq("devotional_id", devotional.id)
        .eq("day_number", 1)
        .maybeSingle();

      if (cancelled) return;
      if (dayError || !day) {
        if (dayError) console.error("[DASHBOARD] Could not preload next Bible Study chapter:", dayError);
        return;
      }

      const book = String((day as any).bible_reading_book || "");
      const chapter = Number((day as any).bible_reading_chapter || 0);
      if (!book || !chapter) return;

      setPreloadedNextStudy({
        targetKey,
        devotionalId: devotional.id,
        dayNumber: 1,
        title: handoff.nextTitle,
        subtitle: handoff.subtitle,
        cover: handoff.cover,
        description: handoff.description,
        chapterLabel: buildDashboardChapterLabel(book, chapter),
        tasks: buildPreloadedNextChapterTasks({
          devotionalId: devotional.id,
          devotionalTitle: handoff.nextTitle,
          dayNumber: 1,
          book,
          chapter,
        }),
      });
    }

    void preloadNextStudy();

    return () => {
      cancelled = true;
    };
  }, [
    allDone,
    checklistData?.nextJourneyTarget,
    currentDevotionalId,
    nextStudyHandoff?.nextTitle,
    preloadedNextStudy?.targetKey,
  ]);

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

  useEffect(() => {
    function handleOpenExplorePage() {
      snapToPage(1);
    }

    window.addEventListener("bb:dashboard-open-explore-page", handleOpenExplorePage);
    return () => window.removeEventListener("bb:dashboard-open-explore-page", handleOpenExplorePage);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadEmbeddedBibleProgress() {
      if (!userId || !embeddedBibleSelectedBook) {
        setEmbeddedBibleCompletedChapters([]);
        return;
      }

      try {
        const chapters = await getCompletedChapters(userId, embeddedBibleSelectedBook);
        if (!cancelled) setEmbeddedBibleCompletedChapters(chapters);
      } catch (error) {
        console.error("[DASHBOARD_BIBLE] Could not load completed chapters:", error);
        if (!cancelled) setEmbeddedBibleCompletedChapters([]);
      }
    }

    void loadEmbeddedBibleProgress();

    return () => {
      cancelled = true;
    };
  }, [embeddedBibleSelectedBook, userId]);

  function snapToPage(index: number) {
    const nextIndex = Math.max(0, Math.min(index, dashboardPageKeys.length - 1));
    setActivePage(nextIndex);
    window.setTimeout(() => {
      document
        .querySelector(`[data-dashboard-nav-key="${dashboardPageKeys[nextIndex]}"]`)
        ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, 0);
  }

  function handleSwipeStart(event: React.TouchEvent<HTMLDivElement>) {
    swipeStartXRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleSwipeEnd(event: React.TouchEvent<HTMLDivElement>) {
    const startX = swipeStartXRef.current;
    swipeStartXRef.current = null;
    if (startX === null) return;

    const endX = event.changedTouches[0]?.clientX ?? startX;
    const deltaX = endX - startX;
    if (Math.abs(deltaX) < 45) return;

    snapToPage(safeActivePage + (deltaX < 0 ? 1 : -1));
  }

  const getSlideClass = (index: number) =>
    `w-full shrink-0 transition-[height] duration-300 ${safeActivePage === index ? "" : "h-0 overflow-hidden"}`;

  const studyProgressPercent = Math.round((studyProgressCompleted / Math.max(studyProgressTotal, 1)) * 100);
  const getFeaturePageBullets = (key: DashboardPageKey) => {
    switch (key) {
      case "bible":
        return ["Read any Bible book", "Pick up where you left off", "Use Scripture with notes and study tools"];
      case "bible_studies":
        return ["Follow guided chapter studies", "Keep moving through your Bible Study Journey", "Intro, reading, notes, trivia, Scrambled, and reflection"];
      case "group":
        return ["Join Bible Buddy conversations", "Share reflections from your study", "Encourage other Bible Buddies"];
      case "tv":
        return ["Watch Bible teaching and shows", "Browse sermons and topics", "Learn when you want a video study moment"];
      case "games":
        return ["Play Bible Trivia", "Practice with Scrambled", "Review what you learned from each chapter"];
      case "share":
        return ["Invite a friend", "Share by text or WhatsApp", "Help someone start studying too"];
      default:
        return ["Keep building your daily rhythm", "Follow your next Bible step", "Grow one day at a time"];
    }
  };

  const renderEmbeddedBiblePage = () => {
    const visibleBooks = embeddedBibleAlphabetical
      ? [...DASHBOARD_BIBLE_BOOKS].sort((a, b) => a.localeCompare(b))
      : DASHBOARD_BIBLE_BOOKS;
    const selectedBookChapterCount = embeddedBibleSelectedBook ? getBookTotalChapters(embeddedBibleSelectedBook) : 0;
    const visibleChapters = embeddedBibleSelectedBook
      ? Array.from({ length: selectedBookChapterCount }, (_, index) => index + 1)
      : [];

    return (
      <section className="w-full px-1">
        <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
          <div className="bb-card min-h-[calc(100vh-210px)] rounded-[28px] border p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="bb-accent text-xs font-black uppercase tracking-[0.16em]">Scripture</p>
                <h2 className="bb-text-primary mt-1 text-3xl font-black leading-tight">
                  {embeddedBibleSelectedBook || "The Bible"}
                </h2>
                <p className="bb-text-secondary mt-2 text-sm font-semibold leading-6">
                  {embeddedBibleSelectedBook
                    ? `${selectedBookChapterCount} chapters. Pick one to read inside your dashboard.`
                    : "Choose a book and keep reading without leaving your dashboard."}
                </p>
              </div>
              {embeddedBibleSelectedBook ? (
                <button
                  type="button"
                  onClick={() => {
                    setEmbeddedBibleSelectedBook(null);
                  }}
                  className="bb-surface-soft bb-accent rounded-full border px-3 py-2 text-xs font-black transition hover:brightness-95"
                >
                  Books
                </button>
              ) : null}
            </div>

            {embeddedBibleSelectedBook ? (
              <div className="mt-5">
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {visibleChapters.map((chapter) => {
                    const isComplete = embeddedBibleCompletedChapters.includes(chapter);
                    return (
                      <button
                        key={chapter}
                        type="button"
                        onClick={() => setEmbeddedBibleReading({ book: embeddedBibleSelectedBook, chapter })}
                        className={`rounded-2xl border px-2 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 hover:shadow-sm ${
                          isComplete
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "bb-surface-soft bb-text-primary hover:border-[var(--bb-accent)]"
                        }`}
                      >
                        <span className="block text-lg">{chapter}</span>
                        <span className="bb-text-muted mt-1 block text-[10px] font-bold">
                          {isComplete ? "Done" : "Read"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-5">
                <label className="bb-surface-soft mb-4 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3">
                  <span className="bb-text-primary text-sm font-black">ABC order</span>
                  <input
                    type="checkbox"
                    checked={embeddedBibleAlphabetical}
                    onChange={(event) => setEmbeddedBibleAlphabetical(event.target.checked)}
                    className="h-5 w-5 accent-[var(--bb-accent)]"
                  />
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {visibleBooks.map((book) => (
                    <button
                      key={book}
                      type="button"
                      onClick={() => {
                        setEmbeddedBibleSelectedBook(book);
                      }}
                      className="bb-surface-soft rounded-2xl border px-3 py-3 text-left text-sm font-black transition hover:-translate-y-0.5 hover:border-[var(--bb-accent)] hover:shadow-sm"
                    >
                      <span className="bb-text-primary block leading-tight">{book}</span>
                      <span className="bb-text-muted mt-1 block text-[11px] font-bold">
                        {getBookTotalChapters(book)} chapters
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderDashboardFeaturePage = (
    key: DashboardPageKey,
    link: ExploreLink | null,
    fallback: { title: string; subtitle: string; href: string; emoji: string; eyebrow?: string },
  ) => {
    const card = link ?? {
      key: fallback.title,
      title: fallback.title,
      subtitle: fallback.subtitle,
      href: fallback.href,
      emoji: fallback.emoji,
      eyebrow: fallback.eyebrow || "Open",
      accent: "border-[#dbe7f4] bg-white",
      onClick: undefined,
    };
    const bullets = getFeaturePageBullets(key);

    return (
      <section className="w-full px-1">
        <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
          <div className={`min-h-[calc(100vh-210px)] rounded-[28px] border p-5 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] ${card.accent}`}>
            <div className="flex items-start gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-white/75 text-3xl shadow-sm" aria-hidden="true">
                {card.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f7fe8]">
                  {card.eyebrow}
                </p>
                <h2 className="mt-1 text-3xl font-black leading-tight text-gray-950">
                  {card.title}
                </h2>
                <p className="mt-3 text-base font-semibold leading-6 text-gray-700">
                  {card.subtitle}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {bullets.map((bullet, index) => (
                <div key={bullet} className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eef6ff] text-sm font-black text-[#2f7fe8]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-bold leading-5 text-gray-800">{bullet}</p>
                </div>
              ))}
            </div>

            {key === "bible_studies" && currentDevotionalTitle ? (
              <div className="mt-5 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f7fe8]">Current Study</p>
                <p className="mt-1 text-lg font-black text-gray-950">{currentDevotionalTitle}</p>
                <p className="mt-1 text-sm font-bold text-gray-600">{activeChapterLabel}</p>
              </div>
            ) : null}

            <Link
              href={card.href}
              onClick={card.onClick}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#2f7fe8] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#256fd1]"
            >
              Open {card.title}
              <span className="ml-2" aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>
    );
  };

  const renderEmbeddedBibleStudiesPage = () => (
    <section className="w-full px-1">
      <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
        <div className="bb-card rounded-[28px] border p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5">
          <div>
            <p className="bb-accent text-xs font-black uppercase tracking-[0.16em]">Chapter Journeys</p>
            <h2 className="bb-text-primary mt-1 text-3xl font-black leading-tight">Bible Studies</h2>
            <p className="bb-text-secondary mt-2 text-sm font-semibold leading-6">
              Choose a guided study and keep moving through Scripture in order.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {BIBLE_STUDY_SERIES_CATALOG.map((study) => {
              const studyId = embeddedStudyIdsByTitle[study.title];

              return (
                <Link
                  key={study.key}
                  href={studyId ? `/bible-studies/${studyId}` : "/bible-studies"}
                  className="bb-surface-soft group rounded-2xl border p-2 text-left transition hover:-translate-y-0.5 hover:border-[var(--bb-accent)] hover:shadow-sm"
                >
                  <div className="overflow-visible rounded-xl">
                    <img
                      src={study.image}
                      alt={`${study.title} cover`}
                      className="aspect-[3/4] w-full object-contain drop-shadow-sm transition group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="bb-text-primary mt-2 line-clamp-2 text-sm font-black leading-tight">{study.title}</p>
                  <p className="bb-accent mt-1 text-[11px] font-bold">{study.subtitle}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  const renderEmbeddedCommunityPage = () => (
    <section className="w-full px-1">
      <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
        <div className="rounded-[28px] border border-[#dbe7f4] bg-white p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f7fe8]">Community</p>
          <h2 className="mt-1 text-3xl font-black leading-tight text-gray-950">Study With Others</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
            Join the Bible Buddy community flow without leaving the dashboard shell.
          </p>
          <div className="mt-5 grid gap-3">
            {[
              ["Official Study Group", "Weekly Bible study posts, finishers, and discussion.", "/study-groups"],
              ["Bible Buddies", "See other Bible Buddies and keep growing together.", "/bible-buddies"],
              ["Messages", "Continue your faith conversations.", "/messages"],
            ].map(([title, subtitle, href]) => (
              <Link key={title} href={href} className="rounded-2xl border border-[#dbe7f4] bg-[#f8fbff] px-4 py-4 transition hover:border-[#7BAFD4] hover:bg-white hover:shadow-sm">
                <p className="text-base font-black text-gray-950">{title}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-gray-600">{subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderEmbeddedTvPage = () => (
    <section className="w-full px-1">
      <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
        <div className="rounded-[28px] border border-[#dbe7f4] bg-white p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f7fe8]">Watch</p>
          <h2 className="mt-1 text-3xl font-black leading-tight text-gray-950">Bible Buddy TV</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
            Pick a video study lane and keep learning from the dashboard.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Shows", "Bible stories and faith series.", "/biblebuddy-tv"],
              ["Sermons", "Teaching by topic.", "/biblebuddy-tv/sermons/faith"],
              ["Browse", "Find movies, shows, and lessons.", "/biblebuddy-tv"],
              ["Continue", "Open the TV library.", "/biblebuddy-tv"],
            ].map(([title, subtitle, href]) => (
              <Link key={title} href={href} className="rounded-2xl border border-[#dbe7f4] bg-[#f8fbff] px-4 py-4 transition hover:border-[#7BAFD4] hover:bg-white hover:shadow-sm">
                <p className="text-base font-black text-gray-950">{title}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-gray-600">{subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderEmbeddedGamesPage = () => (
    <section className="w-full px-1">
      <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
        <div className="rounded-[28px] border border-[#dbe7f4] bg-white p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f7fe8]">Play</p>
          <h2 className="mt-1 text-3xl font-black leading-tight text-gray-950">Bible Games</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
            Practice what you are learning with quick games.
          </p>
          <div className="mt-5 grid gap-3">
            {[
              ["Bible Trivia", "Test chapter knowledge and Bible memory.", "/bible-trivia"],
              ["Scrambled", "Unscramble words from Scripture.", "/bible-study-games/scrambled"],
              ["Game Hub", "Browse all Bible study games.", "/bible-study-games"],
            ].map(([title, subtitle, href]) => (
              <Link key={title} href={href} className="rounded-2xl border border-[#dbe7f4] bg-[#f8fbff] px-4 py-4 transition hover:border-[#7BAFD4] hover:bg-white hover:shadow-sm">
                <p className="text-base font-black text-gray-950">{title}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-gray-600">{subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderEmbeddedSharePage = () => {
    const shareUrl = "https://thebiblestudybuddy.com";
    return (
      <section className="w-full px-1">
        <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
          <div className="rounded-[28px] border border-[#dbe7f4] bg-white p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f7fe8]">Invite</p>
            <h2 className="mt-1 text-3xl font-black leading-tight text-gray-950">Share Bible Buddy</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
              Send Bible Buddy to someone who wants a clearer Bible study rhythm.
            </p>
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={async () => {
                  if (navigator.share) {
                    await navigator.share({ title: "Bible Buddy", url: shareUrl });
                    return;
                  }
                  await navigator.clipboard.writeText(shareUrl);
                  setShareCopied(true);
                  window.setTimeout(() => setShareCopied(false), 1800);
                }}
                className="rounded-2xl bg-[#2f7fe8] px-4 py-4 text-center text-sm font-black text-white shadow-sm transition hover:bg-[#256fd1]"
              >
                {shareCopied ? "Link Copied" : "Share or Copy Link"}
              </button>
              <Link href="/ambassador" className="rounded-2xl border border-[#dbe7f4] bg-[#f8fbff] px-4 py-4 transition hover:border-[#7BAFD4] hover:bg-white hover:shadow-sm">
                <p className="text-base font-black text-gray-950">Ambassador</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-gray-600">Invite people and help them start studying.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  };
  return (
    <div className="space-y-4 pb-4">
      <style>{`
        @keyframes task-complete-pop {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
            max-height: 220px;
            margin-bottom: 0;
            filter: blur(0);
            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
          }
          16% {
            opacity: 1;
            transform: scale(1.02) translateY(0);
            box-shadow: 0 18px 38px rgba(34, 185, 95, 0.28), 0 0 0 5px rgba(34, 185, 95, 0.1);
          }
          46% {
            opacity: 0.9;
            transform: scale(0.9) translateY(-3px);
            filter: blur(0.2px);
          }
          78% {
            opacity: 0;
            transform: scale(0.66) translateY(-12px);
            max-height: 220px;
            filter: blur(1.4px);
          }
          100% {
            opacity: 0;
            transform: scale(0.56) translateY(-18px);
            max-height: 0;
            margin-bottom: -16px;
            padding-top: 0;
            padding-bottom: 0;
            filter: blur(2px);
          }
        }

        @keyframes task-smoke-puff {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); filter: blur(0); }
          18% { opacity: 0.52; }
          100% { opacity: 0; transform: translate(calc(-50% + var(--smoke-x)), calc(-50% + var(--smoke-y))) scale(1.3); filter: blur(4px); }
        }

        @keyframes completion-panel-enter {
          0% { opacity: 0; transform: translateY(10px) scale(0.98); }
          72% { opacity: 1; transform: translateY(-2px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes chapter-confetti-pop {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2) rotate(0deg); }
          14% { opacity: 1; }
          100% { opacity: 0; transform: translate(calc(-50% + var(--confetti-x)), calc(-50% + var(--confetti-y))) scale(1) rotate(var(--confetti-rotate)); }
        }

        @keyframes chapter-firework-ring {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
          20% { opacity: 0.6; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.35); }
        }

        @keyframes chapter-card-drop {
          0% { opacity: 0; transform: translateY(-86px) scale(1.015); filter: blur(1px); }
          62% { opacity: 1; transform: translateY(7px) scale(0.995); filter: blur(0); }
          82% { transform: translateY(-3px) scale(1.004); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes impact-dust {
          0%, 48% { opacity: 0; transform: translateX(-50%) scaleX(0.2); }
          64% { opacity: 0.32; transform: translateX(-50%) scaleX(1); }
          100% { opacity: 0; transform: translateX(-50%) scaleX(1.35); }
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

        @keyframes chapter-complete-fill {
          0% { width: 0%; filter: brightness(1); }
          72% { width: 100%; filter: brightness(1.12); }
          100% { width: 100%; filter: brightness(1); }
        }

        @keyframes next-task-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 0 rgba(15, 23, 42, 0.16);
            border-color: #d1d5db;
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 16px 36px rgba(15, 23, 42, 0.16), 0 0 0 8px rgba(15, 23, 42, 0.08);
            border-color: #9ca3af;
          }
        }

        @keyframes start-here-flash {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.45; transform: translateY(-1px); }
        }

        .task-complete-pop {
          animation: task-complete-pop 760ms cubic-bezier(0.16, 0.9, 0.22, 1) forwards;
          transform-origin: center;
          pointer-events: none;
        }
        .task-smoke span { animation: task-smoke-puff 740ms ease-out forwards; }
        .completion-panel-enter { animation: completion-panel-enter 260ms cubic-bezier(0.16, 0.9, 0.22, 1) both; }
        .chapter-confetti span { animation: chapter-confetti-pop 920ms ease-out both; }
        .chapter-firework-ring { animation: chapter-firework-ring 780ms ease-out both; }
        .chapter-confetti span:nth-child(2) { animation-delay: 35ms; }
        .chapter-confetti span:nth-child(3) { animation-delay: 70ms; }
        .chapter-confetti span:nth-child(4) { animation-delay: 105ms; }
        .chapter-confetti span:nth-child(5) { animation-delay: 140ms; }
        .chapter-confetti span:nth-child(6) { animation-delay: 175ms; }
        .chapter-confetti span:nth-child(7) { animation-delay: 210ms; }
        .chapter-confetti span:nth-child(8) { animation-delay: 245ms; }
        .chapter-card-drop { animation: chapter-card-drop 560ms cubic-bezier(0.2, 0.9, 0.18, 1.15) both; }
        .chapter-card-drop::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 4px;
          width: 46%;
          height: 8px;
          border-radius: 999px;
          background: radial-gradient(ellipse at center, rgba(148, 163, 184, 0.32), rgba(148, 163, 184, 0));
          animation: impact-dust 560ms ease-out both;
          pointer-events: none;
        }
        .done-sparkle span { animation: done-sparkle 1.8s ease-in-out infinite; }
        .done-sparkle span:nth-child(2) { animation-delay: 0.45s; }
        .done-sparkle span:nth-child(3) { animation-delay: 0.9s; }
        .progress-glow { animation: progress-glow 950ms ease-out; }
        .chapter-complete-fill { animation: chapter-complete-fill 900ms ease-out; }
        .next-task-pulse { animation: next-task-pulse 1.9s ease-in-out infinite; }
        .start-here-flash { animation: start-here-flash 1s ease-in-out infinite; }
        .spark-a { --spark-x: -53px; --spark-y: -53px; }
        .spark-b { --spark-x: 23px; --spark-y: -70px; }
        .spark-c { --spark-x: 85px; --spark-y: -25px; }
        .spark-d { --spark-x: 53px; --spark-y: 43px; }
        .spark-e { --spark-x: -35px; --spark-y: 38px; }
      `}</style>
      <div
        ref={containerRef}
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleSwipeEnd}
        className="overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${safeActivePage * 100}%)` }}
        >
        <div className={getSlideClass(0)}>
        <section className="w-full px-1">
          <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
            {homeHeader}
            <div className="rounded-[24px] border border-[#dbe7f4] bg-white p-4 shadow-[0_12px_34px_rgba(38,63,99,0.08)]">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="min-w-0 whitespace-nowrap text-[clamp(16px,4.8vw,20px)] font-black leading-tight text-gray-950">
                    {nextTaskTitle}
                  </h2>
                  <p className="mt-1 text-[11px] font-bold leading-tight text-gray-500">
                    {estimatedStudyTimeLabel}
                  </p>
                </div>
                <div className="shrink-0 rounded-full bg-[#eef6ff] px-3 py-1.5 text-[11px] font-black text-[#2f7fe8]">
                  {studyProgressCompleted}/{studyProgressTotal}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(#2f7fe8 ${studyProgressPercent}%, #e6edf7 0)`,
                  }}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-black text-[#2f7fe8]">
                    {studyProgressCompleted}/{studyProgressTotal}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-gray-950">{activeChapterLabel}</p>
                  <p className="mt-0.5 text-xs font-semibold leading-5 text-gray-500">{studyProgressMotivation}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e6edf7]">
                      <div
                        className="h-full rounded-full bg-[#2f7fe8] transition-all duration-500"
                        style={{ width: `${studyProgressPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-gray-500">{studyProgressPercent}%</span>
                  </div>
                </div>
                <span className="text-xl text-gray-400" aria-hidden="true">›</span>
              </div>
            </div>
            {false ? (
            <div
              className={`relative w-full overflow-visible rounded-[26px] border text-left shadow-sm transition hover:shadow-md ${getDailyStudyCardClasses(allDone)}`}
            >
              {!isChecklistSyncing ? (
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
                onClick={() => {
                  if (isChecklistSyncing) return;
                  setShowDevotionalSettings(false);
                  setShowJourneyHelp(true);
                }}
                className="w-full rounded-[26px] px-4 py-4 text-left"
              >
              {isChecklistSyncing ? (
                <div className="animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/80 shadow-sm">
                      <div className="h-11 w-11 rounded-full bg-[#d7eaf7]" />
                    </div>
                    <div className="min-w-0 flex-1 pr-8">
                      <div className="mt-1 h-4 w-4/5 rounded-full bg-[#e7dcc8]" />
                      <div className="mt-3 h-4 w-3/5 rounded-full bg-[#e7dcc8]" />
                    </div>
                    <div className="h-5 w-5 rounded-full bg-[#eadfce]" />
                  </div>

                  <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-2.5 w-1/4 rounded-full bg-[#d8aa57]" />
                  </div>

                  <div className="mt-3 flex justify-center">
                    <div className="h-4 w-64 max-w-full rounded-full bg-[#e7dcc8]" />
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full border border-white/90 bg-white/80 p-1.5 shadow-sm">
                        <LouisAvatar mood={allDone ? "stareyes" : "wave"} size={46} />
                      </div>
                      <div className="min-w-0 flex-1 pr-8">
                        <p className="text-sm font-normal leading-6 text-gray-800">{louisMessage.focusLine}</p>
                      </div>
                    </div>

                    <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
                      <div
                        key={progressCelebrationKey}
                        className={`h-2.5 rounded-full transition-all duration-700 ${progressCelebrationKey > 0 ? "progress-glow" : ""} ${allDone ? "chapter-complete-fill bg-[#9fce85]" : "bg-[#d8aa57]"}`}
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
              {!isChecklistSyncing && allDone ? (
                <div className="px-4 pb-4">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      void handleCompletedStudyAction();
                    }}
                    className="w-full rounded-full bg-[#7BAFD4] px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3cc] focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]/35"
                  >
                    {checklistData?.nextJourneyTarget ? "Start next chapter" : "Pick a new Bible Study"}
                  </button>
                </div>
              ) : null}
              {showDevotionalSettings ? (
                <div
                  className="absolute right-3 top-14 z-30 w-[min(22rem,calc(100vw-3rem))] rounded-2xl border border-[#cfe4f3] bg-white p-4 text-left shadow-xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 rounded-full bg-[#e8f4ff] p-1 shadow-sm">
                        <LouisAvatar mood="wave" size={42} />
                      </div>
                      <div>
                      <p className="text-sm font-bold text-gray-950">Want to do a different Bible study?</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Pick the study you want Louis to keep on your dashboard.
                      </p>
                      </div>
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
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                        Bible Study
                      </p>
                      <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                        {isLoadingDevotionalOptions ? (
                          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-4 text-sm font-bold text-gray-500">
                            Loading Bible studies...
                          </div>
                        ) : (
                          devotionalOptions.map((devotional) => {
                            const cover = getDashboardStudyCover(devotional.title);
                            const selected = selectedDevotionalId === devotional.id;
                            return (
                              <button
                                key={devotional.id}
                                type="button"
                                onClick={() => setSelectedDevotionalId(devotional.id)}
                                className={`flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition ${
                                  selected
                                    ? "border-[#7BAFD4] bg-[#eef7ff] shadow-sm"
                                    : "border-gray-200 bg-white hover:border-[#b8d9ef] hover:bg-[#f7fbff]"
                                }`}
                              >
                                <div className="h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                                  {cover ? (
                                    <img src={cover} alt="" className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="grid h-full w-full place-items-center text-lg">📖</div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-black text-gray-950">{devotional.title}</p>
                                  <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-4 text-gray-500">
                                    {getDashboardStudySummary(devotional.title, devotional.total_days)}
                                  </p>
                                </div>
                              </button>
                            );
                          })
                        )}
                      </div>
                      <p className="text-xs leading-5 text-gray-500">
                        Louis will continue from your next unfinished chapter in the Bible study you choose.
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
                        {isSavingDevotional ? "Saving..." : "Set Bible Study"}
                      </button>
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
                        <p className="text-xs font-bold text-gray-900">Reset selected Bible Study</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Restart this Bible Study from the beginning. This only clears this study's progress.
                        </p>
                        <button
                          type="button"
                          onClick={handleResetCurrentDevotional}
                          disabled={!(selectedDevotionalId || currentDevotionalId) || isSavingDevotional || isResettingDevotional}
                          className="mt-3 w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isResettingDevotional ? "Resetting..." : "Reset selected Bible Study"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-[#f0d7b3] bg-[#fff8ef] p-4">
                      <p className="text-sm font-bold text-gray-950">Free Bible Study access</p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">
                        As a free user, you can use one Bible study at a time. Upgrade to Pro to switch between every Bible Buddy Bible study and keep exploring different studies.
                      </p>
                      <Link
                        href="/upgrade"
                        className="mt-4 inline-flex w-full justify-center rounded-full bg-[#7BAFD4] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
                      >
                        Upgrade for full access
                      </Link>
                      <div className="mt-4 rounded-2xl border border-[#ead7bd] bg-white/70 p-3">
                        <p className="text-xs font-bold text-gray-900">Reset current Bible Study</p>
                        <p className="mt-1 text-xs leading-5 text-gray-600">
                          Restart this Bible Study from the beginning. This only clears this study's progress.
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
                          {isResettingDevotional ? "Resetting..." : "Reset current Bible Study"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            ) : null}

            {isChecklistSyncing || (isLoadingNextChapter && !preloadedNextChapter?.tasks.length && !preloadedNextStudy?.tasks.length) ? (
              skeletonTasks.map((task, index) => (
                <div
                  key={task.title}
                  className={`relative rounded-xl border border-[#d8e4f6] bg-gradient-to-r from-white via-white to-[#f7fbff] px-3.5 py-3.5 shadow-sm sm:px-4 ${isLoadingNextChapter ? "chapter-card-drop" : ""}`}
                  style={isLoadingNextChapter ? { animationDelay: `${index * 90}ms` } : undefined}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d7eaff] to-[#eef6ff] text-2xl opacity-80 shadow-sm">
                      <span aria-hidden="true">{task.emoji}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-48 max-w-full rounded-full bg-[#d9e7f6]" />
                      <div className={`mt-2 h-3 max-w-full rounded-full bg-[#e8eef7] ${task.subtitleWidth}`} />
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="flex flex-col items-end gap-2">
                        <div className="h-7 w-16 rounded-full bg-[#dfeafe]" />
                        <div className="h-3 w-16 rounded-full bg-[#edf1f7]" />
                      </div>
                      <span className="text-xl leading-none text-gray-300" aria-hidden="true">›</span>
                    </div>
                  </div>
                </div>
              ))
            ) : shouldShowCompletionPanel ? (
              <div className="completion-panel-enter relative overflow-hidden px-5 py-7 text-center">
                <div className="chapter-firework-ring pointer-events-none absolute left-1/2 top-16 h-24 w-24 rounded-full border-4 border-emerald-300/45" aria-hidden="true" />
                <div className="chapter-confetti pointer-events-none absolute left-1/2 top-16" aria-hidden="true">
                  <span className="absolute h-2 w-3 rounded-sm bg-amber-400 [--confetti-rotate:160deg] [--confetti-x:-104px] [--confetti-y:-78px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-sky-400 [--confetti-rotate:-120deg] [--confetti-x:86px] [--confetti-y:-92px]" />
                  <span className="absolute h-3 w-2 rounded-sm bg-emerald-400 [--confetti-rotate:210deg] [--confetti-x:-72px] [--confetti-y:52px]" />
                  <span className="absolute h-2 w-3 rounded-sm bg-rose-400 [--confetti-rotate:-190deg] [--confetti-x:108px] [--confetti-y:36px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-violet-400 [--confetti-rotate:140deg] [--confetti-x:-28px] [--confetti-y:-118px]" />
                  <span className="absolute h-3 w-2 rounded-sm bg-lime-400 [--confetti-rotate:-155deg] [--confetti-x:30px] [--confetti-y:76px]" />
                  <span className="absolute h-2 w-3 rounded-sm bg-orange-400 [--confetti-rotate:190deg] [--confetti-x:-126px] [--confetti-y:4px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-cyan-400 [--confetti-rotate:-130deg] [--confetti-x:132px] [--confetti-y:-22px]" />
                </div>
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                  <LouisAvatar mood="stareyes" size={72} />
                </div>
                {preloadedNextStudy ? (
                  <>
                    <p className="relative mt-4 text-2xl font-black text-gray-950">Bible Study Complete!</p>
                    <p className="mt-2 text-base font-bold text-gray-800">
                      You completed {currentDevotionalTitle || "this Bible study"}.
                    </p>
                    <div className="mx-auto mt-5 flex max-w-md items-center gap-4 rounded-2xl border border-[#dbe7f3] bg-white/85 p-3 text-left shadow-sm">
                      <img
                        src={preloadedNextStudy.cover}
                        alt=""
                        className="h-20 w-16 shrink-0 rounded-xl object-cover shadow-sm"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5e8eb0]">
                          Next Bible Study
                        </p>
                        <p className="mt-1 text-lg font-black leading-tight text-gray-950">
                          {preloadedNextStudy.title}
                        </p>
                        <p className="text-sm font-bold text-gray-600">{preloadedNextStudy.subtitle}</p>
                      </div>
                    </div>
                    <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-6 text-gray-600">
                      {preloadedNextStudy.description}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="relative mt-4 text-2xl font-black text-gray-950">🎉 Congratulations!</p>
                    <p className="mt-2 text-base font-bold text-gray-800">You completed {completedChapterLabel}.</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-gray-500">
                      Ready to continue to {nextChapterLabel}?
                    </p>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => void handleCompletedStudyAction()}
                  className="mt-5 inline-flex min-w-40 justify-center rounded-full bg-[#7BAFD4] px-6 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3cc] focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]/35"
                >
                  {preloadedNextStudy ? `Start ${preloadedNextStudy.title}` : "Continue"}
                </button>
              </div>
            ) : (
              displayTasks.map((task, index) => {
                const originalTaskIndex = displayTasks.findIndex((visibleTask) => visibleTask.kind === task.kind);
                const taskIndex = originalTaskIndex >= 0 ? originalTaskIndex : index;
                const taskCopy = getTaskCardCopy(task, taskIndex);
                const isCelebrating = Boolean(celebratingTasks[task.kind]);
                const isLockedByOrder = !task.done && displayNextActionTaskIndex >= 0 && taskIndex > displayNextActionTaskIndex;
                const isCardDisabled = Boolean(task.disabled || isLockedByOrder);
                const isNextActionTask = task.kind === displayNextActionTaskKind && !isCardDisabled;
                const pointsPillLabel = task.pointsLabel;
                const activeTaskPrompt = null as ActiveTaskPrompt | null;
                const taskStatusLabel = getTaskStatusLine(task);
                const isActiveInlineTask =
                  activeTask?.kind === task.kind &&
                  (activeTask.href || "") === (task.href || "") &&
                  (activeTask.chapterLabel || "") === (task.chapterLabel || "");

                return (
                <div key={task.kind} className="w-full">
                <button
                  type="button"
                  onClick={() => {
                    if (isCardDisabled) return;
                    onTaskClick(task);
                  }}
                  disabled={isCardDisabled}
                  className={`relative w-full overflow-hidden rounded-[18px] border px-3.5 py-3 text-left shadow-sm transition-all duration-300 sm:px-4 ${
                    isCelebrating ? "task-complete-pop" : ""
                  } ${
                    isNewChapterDropping ? "chapter-card-drop" : ""
                  } ${
                    isNextActionTask ? "next-task-pulse" : ""
                  } ${
                    task.done
                      ? "border-green-200 bg-gradient-to-r from-green-50 via-white to-green-50 hover:bg-green-50"
                      : isCardDisabled
                        ? "cursor-not-allowed border-[#e2e8f0] bg-gradient-to-r from-white via-[#f7fbff] to-white text-gray-700 opacity-95"
                        : "border-[#dbe7f4] bg-gradient-to-r from-white via-[#fbfdff] to-white text-gray-700 hover:shadow-md"
                  }`}
                  style={isNewChapterDropping ? { animationDelay: `${index * 85}ms` } : undefined}
                >
                  {isCardDisabled ? (
                    <span
                      className="absolute bottom-3 right-4 text-base opacity-70"
                      aria-label="Locked"
                      title="Complete the task above to unlock this."
                    >
                      {"\uD83D\uDD12"}
                    </span>
                  ) : null}
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xl shadow-sm ${
                        task.done ? taskCopy.doneAccent : taskCopy.idleAccent
                      }`}
                    >
                      <span className={`drop-shadow-sm ${isCardDisabled ? "opacity-75" : ""}`} aria-hidden="true">{getTaskEmoji(task)}</span>
                      {task.done ? (
                        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#22b95f] text-xs font-black text-white ring-2 ring-white">
                          ✓
                        </span>
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className={`text-[14px] font-bold leading-tight sm:text-[15px] ${task.done ? "text-gray-950" : "text-gray-800"}`}>{taskCopy.title}</p>
                          <p className={`mt-0.5 text-xs leading-4 sm:text-[13px] ${task.done ? "text-gray-700" : "text-gray-500"}`}>{taskCopy.subtitle}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className={`px-1 py-1 text-xs font-black ${task.done ? "text-green-700" : "text-[#2f7fe8]"}`}>
                          {pointsPillLabel}
                        </span>
                        <span className={`hidden ${
                          task.done
                            ? "font-medium text-green-700"
                            : isNextActionTask
                              ? "start-here-flash text-gray-950 font-black tracking-wide"
                              : "font-medium text-gray-500"
                        }`}>
                          <span aria-hidden="true">{task.done ? "▣" : "○"}</span>
                          {task.done ? (
                            <span className="done-sparkle pointer-events-none absolute -inset-x-2 -top-3 flex justify-between text-[10px] text-amber-400" aria-hidden="true">
                              <span>✦</span>
                              <span>✧</span>
                              <span>✦</span>
                            </span>
                          ) : null}
                          {activeTaskPrompt ? (
                            <span className="flex flex-col items-end leading-tight">
                              <span>{activeTaskPrompt.lineOne}</span>
                              {activeTaskPrompt.lineTwo ? (
                                <span className="text-[10px] font-extrabold opacity-75">{activeTaskPrompt.lineTwo}</span>
                              ) : null}
                            </span>
                          ) : (
                            taskStatusLabel
                          )}
                        </span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-center">
                        <p className="hidden">{taskCopy.subtitle}</p>
                        {task.timeEstimateLabel ? (
                          <p className="whitespace-nowrap text-center text-[11px] font-black text-gray-700">
                            Takes about {task.timeEstimateLabel}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {!isCardDisabled ? (
                      <span className="mt-5 shrink-0 text-xl leading-none text-gray-400" aria-hidden="true">›</span>
                    ) : null}
                  </div>
                  {isCelebrating ? (
                    <div className="task-smoke pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
                      <span className="absolute h-8 w-8 rounded-full bg-slate-300/40 [--smoke-x:-42px] [--smoke-y:-20px]" />
                      <span className="absolute h-7 w-7 rounded-full bg-slate-300/35 [--smoke-x:34px] [--smoke-y:-24px]" />
                      <span className="absolute h-6 w-6 rounded-full bg-slate-400/25 [--smoke-x:-8px] [--smoke-y:18px]" />
                      <span className="absolute h-5 w-5 rounded-full bg-slate-300/30 [--smoke-x:54px] [--smoke-y:10px]" />
                    </div>
                  ) : null}
                </button>
                {isActiveInlineTask ? (
                  <DashboardDailyTaskCallout
                    task={activeTask}
                    userId={userId}
                    onClose={onActiveTaskClose}
                    onProgressUpdated={onActiveTaskProgressUpdated}
                    variant="inline"
                  />
                ) : null}
                </div>
                );
              })
            )}

            {!isLoadingNextChapter && completedTrackerTasks.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white/80 shadow-sm">
                <button
                  type="button"
                  onClick={() => setCompletedTasksExpanded((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-emerald-50/50"
                  aria-expanded={completedTasksExpanded}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-gray-950">
                      Completed Study Tasks for {activeChapterLabel}
                    </p>
                    <p className="mt-0.5 text-[11px] font-bold text-emerald-700">
                      {completedTrackerTasks.length} of {visibleTasks.length} tasks done
                    </p>
                  </div>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-lg font-black text-emerald-700 transition ${completedTasksExpanded ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    v
                  </span>
                </button>
                {completedTasksExpanded ? (
                <div className="grid gap-2 border-t border-emerald-100 px-3 pb-3 pt-3 sm:grid-cols-2">
                  {completedTrackerTasks.map((task) => {
                    const originalTaskIndex = visibleTasks.findIndex((visibleTask) => visibleTask.kind === task.kind);
                    const taskCopy = getTaskCardCopy(task, originalTaskIndex >= 0 ? originalTaskIndex : 0);
                    return (
                      <button
                        key={`completed-${task.kind}`}
                        type="button"
                        onClick={() => onTaskClick(task)}
                        className="group flex min-h-10 items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-left transition hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-sm"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-emerald-500 text-[11px] font-black text-white shadow-sm" aria-hidden="true">
                          ✓
                        </span>
                        <span className="min-w-0 flex-1 truncate text-xs font-black text-gray-800">
                          {taskCopy.title}
                        </span>
                        <span className="whitespace-nowrap text-[11px] font-bold text-gray-500">
                          {task.completedAtLabel || "Completed"}
                        </span>
                        <span className="hidden">
                          ›
                        </span>
                      </button>
                    );
                  })}
                </div>
                ) : null}
              </div>
            ) : null}

            {false && currentDevotionalTitle ? (
              <div className="overflow-hidden rounded-2xl border border-[#dbe7f4] bg-white/90 p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-20 w-14 shrink-0 overflow-hidden rounded-xl bg-[#eef6ff] shadow-sm">
                    {currentStudyCover ? (
                      <img src={currentStudyCover || undefined} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-2xl" aria-hidden="true">
                        📖
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#2f7fe8]">
                      Current Study
                    </p>
                    <p className="mt-1 truncate text-base font-black text-gray-950">
                      {currentDevotionalTitle}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-gray-600">
                      {activeChapterLabel}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-4 text-gray-500">
                      {currentStudySummary}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="hidden">
              <button
                type="button"
                onClick={() => {
                  setShowJourneyHelp(false);
                  setShowDevotionalSettings(true);
                }}
                className="text-sm font-black text-gray-950 transition hover:text-[#5f99bf]"
              >
                Set New Bible Study
              </button>
            </div>

          </div>
        </section>

        </div>

        <div className={getSlideClass(1)}>
          {renderEmbeddedBiblePage()}
        </div>

        <div className={getSlideClass(2)}>
          {renderEmbeddedBibleStudiesPage()}
        </div>

        <div className={getSlideClass(3)}>
          {renderEmbeddedCommunityPage()}
        </div>

        <div className={getSlideClass(4)}>
          {renderEmbeddedTvPage()}
        </div>

        <div className={getSlideClass(5)}>
          {renderEmbeddedGamesPage()}
        </div>

        <div className={getSlideClass(6)}>
          {renderEmbeddedSharePage()}
        </div>

        {false ? (
        <section className={`w-full shrink-0 snap-start px-1 ${activePage === 1 ? "" : "h-0 overflow-hidden"}`}>
              <div className="mx-auto flex max-w-xl flex-col gap-5">
            {membershipStatus === "pro" && (daysRemaining ?? 0) > 0 ? (
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 shadow-sm">
                <p className="text-sm font-medium text-blue-800">
                  Pro expires in {daysRemaining ?? 0} {daysRemaining === 1 ? "day" : "days"}
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
        ) : null}
        </div>
      </div>

      <nav className="sticky bottom-2 z-40 mx-auto max-w-xl rounded-[22px] border border-[#dbe7f4] bg-white/95 px-2 pb-1.5 pt-1.5 shadow-[0_12px_28px_rgba(38,63,99,0.14)] backdrop-blur">
        <div className="mx-auto mb-0.5 h-1 w-10 rounded-full bg-[#dbe7f4]" aria-hidden="true" />
        <div className="[scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-end gap-1 text-center">
          {dashboardNavItems.map((item, index) => {
            const isActive = index === safeActivePage;
            return (
              <Link
                key={item.key}
                data-dashboard-nav-key={item.key}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  snapToPage(index);
                }}
                className={`flex min-w-[96px] flex-col items-center justify-center gap-0.5 rounded-2xl px-3 py-1.5 text-[9px] font-black transition sm:min-w-[112px] sm:text-[10px] ${
                  isActive ? "text-[#2f7fe8]" : "text-gray-500 hover:bg-[#f4f8ff] hover:text-gray-900"
                }`}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-sm ${
                    isActive ? "bg-[#2f7fe8] text-white shadow-sm" : "bg-transparent"
                  }`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
          </div>
        </div>
      </nav>

      <nav className="hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 items-end gap-1 text-center">
          {[
            { label: "Home", href: "/dashboard", icon: "⌂", active: true },
            { label: "Bible", href: "/reading", icon: "📖" },
            { label: "Community", href: "/study-groups", icon: "👥" },
            { label: "TV", href: "/biblebuddy-tv", icon: "▶" },
            { label: "Games", href: "/bible-study-games", icon: "🎮" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl px-1.5 py-1.5 text-[10px] font-black transition ${
                item.active ? "text-[#2f7fe8]" : "text-gray-500 hover:bg-[#f4f8ff] hover:text-gray-900"
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-base ${
                  item.active ? "bg-[#2f7fe8] text-white shadow-sm" : "bg-transparent"
                }`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {embeddedBibleReading ? (
        <BibleReadingModal
          book={embeddedBibleReading.book}
          chapter={embeddedBibleReading.chapter}
          onClose={() => setEmbeddedBibleReading(null)}
          onMarkComplete={() => {
            setEmbeddedBibleCompletedChapters((previous) =>
              previous.includes(embeddedBibleReading.chapter)
                ? previous
                : [...previous, embeddedBibleReading.chapter].sort((a, b) => a - b),
            );
          }}
        />
      ) : null}

      <ModalShell
        isOpen={showDevotionalSettings}
        onClose={() => setShowDevotionalSettings(false)}
        backdropColor="bg-black/45"
        scrollable={true}
        zIndex="z-[80]"
      >
        <div className="mx-4 w-full max-w-md rounded-[28px] border border-[#cfe4f3] bg-white p-5 text-left shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="shrink-0 rounded-full bg-[#e8f4ff] p-1 shadow-sm">
                <LouisAvatar mood="wave" size={46} />
              </div>
              <div>
                <p className="text-base font-black text-gray-950">Want to do a different Bible study?</p>
                <p className="mt-1 text-xs font-medium leading-5 text-gray-500">
                  Pick the study you want Louis to keep on your dashboard.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowDevotionalSettings(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-500 transition hover:bg-gray-200"
              aria-label="Close Bible study settings"
            >
              x
            </button>
          </div>

          {isPaidUser || canFreeUserChooseNewStudy ? (
          <div className="mt-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
              Bible Study
            </p>
            <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
              {isLoadingDevotionalOptions ? (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-4 text-sm font-bold text-gray-500">
                  Loading Bible studies...
                </div>
              ) : devotionalOptions.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-4 text-sm font-bold text-gray-500">
                  No Bible studies found yet.
                </div>
              ) : (
                devotionalOptions.map((devotional) => {
                  const cover = getDashboardStudyCover(devotional.title);
                  const selected = selectedDevotionalId === devotional.id;
                  return (
                    <button
                      key={devotional.id}
                      type="button"
                      onClick={() => setSelectedDevotionalId(devotional.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition ${
                        selected
                          ? "border-[#7BAFD4] bg-[#eef7ff] shadow-sm"
                          : "border-gray-200 bg-white hover:border-[#b8d9ef] hover:bg-[#f7fbff]"
                      }`}
                    >
                      <div className="h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                        {cover ? (
                          <img src={cover} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-lg">📖</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-gray-950">{devotional.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-4 text-gray-500">
                          {getDashboardStudySummary(devotional.title, devotional.total_days)}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
            <p className="text-xs leading-5 text-gray-500">
              Louis will continue from your next unfinished chapter in the Bible study you choose.
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
              {isSavingDevotional ? "Saving..." : "Set Bible Study"}
            </button>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-bold text-gray-900">Reset selected Bible Study</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Restart this Bible Study from the beginning. This only clears this study's progress.
              </p>
              <button
                type="button"
                onClick={handleResetCurrentDevotional}
                disabled={!(selectedDevotionalId || currentDevotionalId) || isSavingDevotional || isResettingDevotional}
                className="mt-3 w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResettingDevotional ? "Resetting..." : "Reset selected Bible Study"}
              </button>
            </div>
          </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-[#f0d7b3] bg-[#fff8ef] p-4">
              <p className="text-sm font-bold text-gray-950">One active Bible study at a time</p>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                As a free Bible Buddy, you can follow one Bible study at a time. Finish your current study first, or upgrade to Pro to switch studies whenever you want.
              </p>
              <Link
                href="/upgrade"
                className="mt-4 inline-flex w-full justify-center rounded-full bg-[#7BAFD4] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
              >
                Upgrade for unlimited studies
              </Link>
            </div>
          )}
        </div>
      </ModalShell>

      <ModalShell
        isOpen={freePlanGate !== null}
        onClose={() => setFreePlanGate(null)}
        backdropColor="bg-black/55"
        scrollable={true}
        zIndex="z-[90]"
      >
        <div className="mx-4 w-full max-w-md rounded-[28px] border border-[#f0d7b3] bg-white p-5 text-left shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="shrink-0 rounded-full bg-[#e8f4ff] p-1 shadow-sm">
              <LouisAvatar mood="wave" size={48} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f7fe8]">Free Bible Buddy</p>
              <h2 className="mt-1 text-xl font-black leading-tight text-gray-950">
                {freePlanGate?.kind === "study" ? "One Bible study at a time" : "Your next chapter opens soon"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setFreePlanGate(null)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-500 transition hover:bg-gray-200"
              aria-label="Close free plan message"
            >
              x
            </button>
          </div>

          {freePlanGate?.kind === "study" ? (
            <p className="mt-4 text-sm font-semibold leading-6 text-gray-700">
              You can follow one Bible study at a time on the free plan. Finish your current study first, or upgrade to Pro to switch studies whenever you want.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-semibold leading-6 text-gray-700">
                Hey, as a free Bible Buddy, you get one new Bible study chapter each day.
              </p>
              <div className="rounded-2xl bg-[#f6f9ff] p-4 text-center">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5b6f92]">
                  {freePlanGate?.chapterLabel || "Your next chapter"} opens in
                </p>
                <p className="mt-1 text-2xl font-black text-[#17213d]">{freePlanCountdown}</p>
              </div>
              <p className="text-sm font-semibold leading-6 text-gray-700">
                Do not want to wait? Upgrade now and get unlimited chapters.
              </p>
            </div>
          )}

          <div className="mt-5 grid gap-2">
            <Link
              href="/upgrade"
              className="inline-flex w-full justify-center rounded-full bg-[#7BAFD4] px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
            >
              Upgrade now
            </Link>
            <button
              type="button"
              onClick={() => setFreePlanGate(null)}
              className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-black text-gray-700 transition hover:bg-gray-50"
            >
              Keep waiting
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={showJourneyHelp}
        onClose={() => setShowJourneyHelp(false)}
        backdropColor="bg-black/55"
        scrollable={true}
        zIndex="z-[70]"
      >
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
          <div className="p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-950">How Bible Study Works</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Bible Buddy is built for steady Bible study, not rushing through a timer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowJourneyHelp(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close Bible study help"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 text-gray-800">
              <div className="rounded-2xl border border-[#b8d9ef] bg-gradient-to-br from-[#f6fbff] via-white to-[#edf7ff] p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-full border border-white bg-white p-1 shadow-sm">
                    <LouisAvatar mood="wave" size={44} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4d88ad]">
                      The Big Idea
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-gray-950">
                      Your streak and your Bible study progress are connected, but they are not the same thing.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      Show up each day to keep your streak alive. Finish the chapter study when you are ready to move forward.
                    </p>
                  </div>
                </div>
              </div>

              <section>
                <h3 className="text-lg font-bold text-gray-950">🔥 Your Daily Streak</h3>
                <p className="mt-2 leading-7">
                  To keep your streak going, log in to Bible Buddy each day. The streak is about showing up consistently.
                </p>
                <p className="mt-2 leading-7">
                  You do not have to finish every chapter task in one day. The chapter study is where your Bible actions, task progress, points, and level growth happen.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-950">📖 Your Chapter Study</h3>
                <p className="mt-2 leading-7">
                  Your current chapter stays active until the chapter tasks are complete. If Proverbs 1 takes one day, great. If it takes a few days, or even a week, that is okay too.
                </p>
                <p className="mt-2 leading-7">
                  When you come back, Bible Buddy helps you continue where you left off instead of making you feel behind.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-950">The 6 Chapter Tasks</h3>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">1. 📕 Bible Study Intro</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      This sets the scene for the chapter so you understand what you are about to read.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">2. ✝️ Read The Chapter</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      This is the Scripture itself. Read slowly and let the chapter be the center of the study.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">3. 📝 Chapter Notes</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Notes help you understand the chapter more deeply, verse by verse and section by section.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">4. 🧠 Trivia</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Trivia checks what is sticking from the chapter and helps you remember the story and details.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">5. 🔤 Scrambled</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Scrambled reviews important words from the chapter in a quick, playful way.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">6. Reflection</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Reflection gives you a place to answer the question and share what the chapter is doing in you.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <h3 className="text-lg font-bold text-gray-950">✅ When A Chapter Is Complete</h3>
                <p className="mt-2 leading-7">
                  Once the chapter study is finished, Bible Buddy celebrates the completion and moves you to the next chapter. The goal is simple: keep showing up, keep learning, and keep moving forward at a healthy pace.
                </p>
              </section>
            </div>
          </div>
        </div>
      </ModalShell>
    </div>
  );
}

