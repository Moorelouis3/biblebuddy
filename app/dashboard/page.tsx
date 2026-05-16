
"use client";
export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import "../../styles/pulse.css";
import DashboardDailyWelcomeModal from "../../components/DashboardDailyWelcomeModal";
import LouisDailyTasksModal, { buildChooseDevotionalChecklistData, fetchLouisDailyChecklistData, type ChecklistData, type TaskState } from "../../components/LouisDailyTasksModal";
import { FeatureTourModal } from "../../components/FeatureTourModal";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { getBookTotalChapters, getCurrentBook, getCompletedChapters } from "../../lib/readingProgress";
import { getProfileStats, syncCurrentStreakToProfileStats } from "../../lib/profileStats";
import { getDailyRecommendation, type DailyRecommendation } from "../../lib/dailyRecommendation";
import { buildLouisRecommendationHandoff, storeLouisRouteHandoff } from "../../lib/louisRouteHandoff";
import {
  ensureLouisDailyTaskCycle,
  getBibleBuddyLocalDayKey,
  getLouisDailyTaskCycleStartedAt,
  hasLouisChapterJourneyBonusAwarded,
  hasSeenLouisChapterJourneyCelebration,
  hasActiveLouisDailyTaskCycle,
  rememberLouisChapterJourneyBonusAwarded,
  rememberLouisChapterJourneyCelebrationSeen,
  rememberLouisDailyTaskTarget,
} from "../../lib/louisDailyFlow";
import {
  canFreeUserUnlockChapter,
  formatFreePlanCountdown,
  getNextLocalDayStartMs,
  rememberFreeChapterUnlock,
} from "../../lib/freePlanGating";
import { LouisAvatar } from "../../components/LouisAvatar";
import { ModalShell } from "../../components/ModalShell";
import { triggerPoints } from "../../components/PointsPop";

import AdSlot from "../../components/AdSlot";
import { useFeatureRenderPriority } from "../../components/FeatureRenderPriorityContext";
import { ACTION_TYPE } from "../../lib/actionTypes";
import DashboardJourneyExperience from "../../components/DashboardJourneyExperience";
import DashboardDailyTaskCallout from "../../components/DashboardDailyTaskCallout";
import {
  buildPersistedFeatureTours,
  DEFAULT_FEATURE_TOURS,
  normalizeFeatureTours,
  type FeatureTourKey,
  type FeatureToursState,
} from "../../lib/featureTours";
import { LEVEL_DEFINITIONS, calculateWeightedPoints, getLevelInfoFromPoints } from "../../lib/levelSystem";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";
import { trackUserActivity } from "../../lib/trackUserActivity";

const JESSICA_BONUS_USER_ID = "66c16399-092a-43c0-96c0-e4de78c0debc";
const JESSICA_BONUS_ACTION_LABEL = "admin_bonus_points:1000:jessica-april-2026";
const JESSICA_BONUS_POPUP_KEY = "bb:bonus-popup:jessica-1000:v1";
const ZORIAN_USER_ID = "6ffe9dd2-884b-4a6b-8096-e9418dd56232";
const ZORIAN_RESTORATION_ACTION_LABEL = "admin_bonus_points:1000:zorian-login-restoration-may-2026";
const ZORIAN_RESTORATION_POPUP_KEY = "bb:bonus-popup:zorian-login-restoration-1000:v1";
const ENABLE_DAILY_DASHBOARD_WELCOME_FLOW = true;
const DASHBOARD_LOUIS_CHECKIN_COOLDOWN_MS = 4 * 60 * 60 * 1000;
const DAILY_TASK_SUMMARY_TIMEOUT_MS = 10000;

const MATTHEW_CHAPTERS = 28;
const TOTAL_ITEMS = MATTHEW_CHAPTERS + 1; // overview + 28 chapters

type BadgeTone = "blue" | "gold" | "green" | "pink" | "purple" | "red" | "teal" | "slate";

type BadgeProgress = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  levelLabel: string;
  xp: number;
  current: number;
  target: number;
  tone: BadgeTone;
  category: string;
};

type BadgeProgressInput = {
  currentStreak: number;
  totalPoints: number;
  chapterCompletions: number;
  bibleStudyIntroCompletions: number;
  bibleStudyDayCompletions: number;
  triviaAnswers: number;
  triviaCompletions: number;
  scrambledWordsAnswered: number;
  scrambledCompletions: number;
  notesReviewed: number;
  commentsPosted: number;
  likesGiven: number;
  tvVideosStarted: number;
  booksCompleted: number;
};

type BibleBookProgress = {
  book: string;
  completed: number;
  total: number;
  chapters: number[];
};

type DashboardAnimatedStats = {
  completion: number;
  grace: number;
  level: number;
  badges: number;
};

type DashboardLouisNudge = {
  id: string;
  eyebrow: string;
  title: string;
  lineOne: string;
  lineTwo: string;
  buttonText: string;
  action: "daily-tasks" | "route" | "dismiss";
  href?: string;
};

function withDashboardTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error(`${label} timed out`));
    }, timeoutMs);

    promise
      .then((value) => {
        window.clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error) => {
        window.clearTimeout(timeoutId);
        reject(error);
      });
  });
}

const BADGE_TONE_CLASSES: Record<BadgeTone, { tile: string; progress: string; glow: string }> = {
  blue: {
    tile: "border-[#8fc7ee] bg-gradient-to-br from-[#bfe5ff] to-[#5eaee6] text-[#123c63]",
    progress: "bg-[#7BAFD4]",
    glow: "shadow-[0_10px_28px_rgba(123,175,212,0.32)]",
  },
  gold: {
    tile: "border-[#ffd36a] bg-gradient-to-br from-[#fff3ae] to-[#f2b233] text-[#4c3100]",
    progress: "bg-[#f3bd3e]",
    glow: "shadow-[0_10px_28px_rgba(242,178,51,0.3)]",
  },
  green: {
    tile: "border-[#9fe6b8] bg-gradient-to-br from-[#c9f7d8] to-[#34c36f] text-[#0e4829]",
    progress: "bg-[#35c46f]",
    glow: "shadow-[0_10px_28px_rgba(52,195,111,0.28)]",
  },
  pink: {
    tile: "border-[#ffc0d6] bg-gradient-to-br from-[#ffdce9] to-[#f46fa0] text-[#651536]",
    progress: "bg-[#f46fa0]",
    glow: "shadow-[0_10px_28px_rgba(244,111,160,0.28)]",
  },
  purple: {
    tile: "border-[#d8c1ff] bg-gradient-to-br from-[#ede0ff] to-[#9b6cf4] text-[#35156d]",
    progress: "bg-[#9b6cf4]",
    glow: "shadow-[0_10px_28px_rgba(155,108,244,0.28)]",
  },
  red: {
    tile: "border-[#ffb2a7] bg-gradient-to-br from-[#ffd7d2] to-[#f45b4c] text-[#651a14]",
    progress: "bg-[#f45b4c]",
    glow: "shadow-[0_10px_28px_rgba(244,91,76,0.26)]",
  },
  teal: {
    tile: "border-[#99eadc] bg-gradient-to-br from-[#c9fff4] to-[#26bca5] text-[#0c4d44]",
    progress: "bg-[#26bca5]",
    glow: "shadow-[0_10px_28px_rgba(38,188,165,0.26)]",
  },
  slate: {
    tile: "border-[#cbd5e1] bg-gradient-to-br from-[#f1f5f9] to-[#94a3b8] text-[#1f2937]",
    progress: "bg-[#64748b]",
    glow: "shadow-[0_10px_28px_rgba(100,116,139,0.2)]",
  },
};

function getBadgeAwardLabel(badge: Pick<BadgeProgress, "id" | "xp">) {
  return `badge_earned:${badge.id}:${badge.xp}`;
}

function getLocalBadgeAwardKey(userId: string, badgeId: string) {
  return `bb:badge-awarded:${userId}:${badgeId}`;
}

function getPendingBadgeQueueKey(userId: string) {
  return `bb:pending-badge-queue:${userId}`;
}

function readPendingBadgeQueue(userId: string): BadgeProgress[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(getPendingBadgeQueueKey(userId)) || "[]");
    return Array.isArray(parsed) ? parsed.filter((badge) => badge?.id && badge?.title) as BadgeProgress[] : [];
  } catch {
    return [];
  }
}

function writePendingBadgeQueue(userId: string, badges: BadgeProgress[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getPendingBadgeQueueKey(userId), JSON.stringify(badges));
}

function getAwardedBadgeId(actionLabel: unknown) {
  if (typeof actionLabel !== "string") return null;
  return actionLabel.match(/^badge_earned:([^:]+):\d+$/)?.[1] ?? null;
}

function getBadgeBonusPoints(actionLabel: unknown) {
  if (typeof actionLabel !== "string") return 0;
  const match = actionLabel.match(/^badge_earned:[^:]+:(\d+)$/);
  return match ? Number(match[1]) || 0 : 0;
}

function getBadgeCompletionLine(description: string) {
  const trimmed = description.trim().replace(/\.$/, "");
  const replacements: Array<[RegExp, string]> = [
    [/^Complete\s+/i, "You completed "],
    [/^Read\s+/i, "You read "],
    [/^Finish\s+/i, "You finished "],
    [/^Review\s+/i, "You reviewed "],
    [/^Post\s+/i, "You posted "],
    [/^Show up\s+/i, "You showed up "],
    [/^Return\s+/i, "You returned "],
    [/^Reach\s+/i, "You reached "],
    [/^Stay connected\s+/i, "You stayed connected "],
    [/^Like\s+/i, "You liked "],
    [/^Start\s+/i, "You started "],
    [/^Earn\s+/i, "You earned "],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(trimmed)) {
      return `${trimmed.replace(pattern, replacement)}.`;
    }
  }

  return trimmed ? `${trimmed}.` : "You completed this badge task.";
}

function clampBadgeProgress(current: number, target: number) {
  if (!Number.isFinite(current)) return 0;
  return Math.max(0, Math.min(target, Math.floor(current)));
}

function buildBadgeProgress(input: BadgeProgressInput): BadgeProgress[] {
  const totalBibleStudyTasks =
    input.bibleStudyIntroCompletions +
    input.chapterCompletions +
    input.notesReviewed +
    input.triviaCompletions +
    input.scrambledCompletions;

  const makeBadge = ({
    id,
    title,
    category,
    emoji,
    label = "Badge",
    xp = 10,
    tone,
    current,
    target,
    description,
  }: {
    id: string;
    title: string;
    category: string;
    emoji: string;
    label?: string;
    xp?: number;
    tone: BadgeTone;
    current: number;
    target: number;
    description: string;
  }): BadgeProgress => ({
    id,
    title,
    description,
    emoji,
    levelLabel: label,
    xp,
    current,
    target,
    tone,
    category,
  });

  const badges: BadgeProgress[] = [
    makeBadge({
      id: "first-light",
      title: "First Light",
      category: "Bible Study",
      emoji: "🌅",
      tone: "gold",
      current: totalBibleStudyTasks,
      target: 1,
      description: "Complete your first Bible Study task and light the first spark.",
    }),
    makeBadge({
      id: "chapter-door",
      title: "Chapter Door",
      category: "Bible Study",
      emoji: "🚪",
      tone: "blue",
      current: input.bibleStudyIntroCompletions,
      target: 1,
      description: "Read your first chapter intro before stepping into the Scripture.",
    }),
    makeBadge({
      id: "open-scroll",
      title: "Open Scroll",
      category: "Reading",
      emoji: "📖",
      tone: "blue",
      current: input.chapterCompletions,
      target: 1,
      description: "Finish your first Bible chapter inside Bible Buddy.",
    }),
    makeBadge({
      id: "notes-lamp",
      title: "Notes Lamp",
      category: "Notes",
      emoji: "🪔",
      tone: "teal",
      current: input.notesReviewed,
      target: 1,
      description: "Review chapter notes for the first time and let the chapter get clearer.",
    }),
    makeBadge({
      id: "quick-recall",
      title: "Quick Recall",
      category: "Trivia",
      emoji: "🧠",
      tone: "pink",
      current: input.triviaAnswers,
      target: 1,
      description: "Answer your first trivia question and check what is sticking.",
    }),
    makeBadge({
      id: "word-lock",
      title: "Word Lock",
      category: "Scrambled",
      emoji: "🔐",
      tone: "purple",
      current: input.scrambledWordsAnswered,
      target: 1,
      description: "Solve your first Scrambled word and lock a chapter word into memory.",
    }),
    makeBadge({
      id: "ink-and-heart",
      title: "Ink & Heart",
      category: "Reflection",
      emoji: "✍️",
      tone: "gold",
      current: input.commentsPosted,
      target: 1,
      description: "Post your first reflection or comment and put thought into words.",
    }),
    makeBadge({
      id: "whole-chapter",
      title: "Whole Chapter",
      category: "Bible Study",
      emoji: "✅",
      tone: "green",
      xp: 15,
      current: input.bibleStudyDayCompletions,
      target: 1,
      description: "Complete every task for one chapter study from intro to reflection.",
    }),
    makeBadge({
      id: "steady-seven",
      title: "Steady Seven",
      category: "Streak",
      emoji: "🗓️",
      tone: "green",
      xp: 12,
      current: input.currentStreak,
      target: 7,
      description: "Show up to Bible Buddy for seven days straight.",
    }),
    makeBadge({
      id: "two-week-table",
      title: "Two Week Table",
      category: "Streak",
      emoji: "🍞",
      tone: "gold",
      xp: 15,
      current: input.currentStreak,
      target: 14,
      description: "Return for two straight weeks and build a steady place at the table.",
    }),
    makeBadge({
      id: "consistency-flame",
      title: "Consistency Flame",
      category: "Streak",
      emoji: "🔥",
      tone: "red",
      xp: 20,
      current: input.currentStreak,
      target: 30,
      description: "Reach a 30 day streak and prove the rhythm is becoming real.",
    }),
    makeBadge({
      id: "long-obedience",
      title: "Long Obedience",
      category: "Streak",
      emoji: "🛤️",
      tone: "slate",
      xp: 20,
      current: input.currentStreak,
      target: 60,
      description: "Stay connected for 60 days straight. This is the kind of steady that shapes a life.",
    }),
    makeBadge({
      id: "five-chapter-path",
      title: "Five Chapter Path",
      category: "Reading",
      emoji: "🧭",
      tone: "blue",
      current: input.chapterCompletions,
      target: 5,
      description: "Finish five Bible chapters and start seeing Scripture as a path, not a one-time stop.",
    }),
    makeBadge({
      id: "ten-chapter-builder",
      title: "Chapter Builder",
      category: "Reading",
      emoji: "🏗️",
      tone: "teal",
      current: input.chapterCompletions,
      target: 10,
      description: "Finish ten Bible chapters and build real reading momentum.",
    }),
    makeBadge({
      id: "proverbs-pathfinder",
      title: "Pathfinder",
      category: "Bible Study",
      emoji: "🥾",
      tone: "green",
      current: input.bibleStudyDayCompletions,
      target: 5,
      description: "Complete five full chapter studies and keep moving through the Bible Study path.",
    }),
    makeBadge({
      id: "study-arch",
      title: "Study Arch",
      category: "Bible Study",
      emoji: "🌉",
      tone: "purple",
      xp: 20,
      current: input.bibleStudyDayCompletions,
      target: 15,
      description: "Complete 15 full chapter studies and cross from starting into staying.",
    }),
    makeBadge({
      id: "deep-well",
      title: "Deep Well",
      category: "Notes",
      emoji: "💧",
      tone: "teal",
      current: input.notesReviewed,
      target: 10,
      description: "Review ten chapter note sections and keep drawing deeper understanding.",
    }),
    makeBadge({
      id: "margin-notes",
      title: "Margin Notes",
      category: "Notes",
      emoji: "📓",
      tone: "gold",
      xp: 15,
      current: input.notesReviewed,
      target: 25,
      description: "Review 25 chapter note sections and become someone who studies slowly.",
    }),
    makeBadge({
      id: "quiz-crown",
      title: "Quiz Crown",
      category: "Trivia",
      emoji: "👑",
      tone: "purple",
      xp: 15,
      current: input.triviaCompletions,
      target: 10,
      description: "Finish ten trivia rounds and sharpen your chapter recall.",
    }),
    makeBadge({
      id: "memory-keeper",
      title: "Memory Keeper",
      category: "Scrambled",
      emoji: "🧩",
      tone: "pink",
      xp: 15,
      current: input.scrambledCompletions,
      target: 10,
      description: "Finish ten Scrambled rounds and keep chapter words close.",
    }),
    makeBadge({
      id: "game-night",
      title: "Game Night",
      category: "Games",
      emoji: "🎮",
      tone: "green",
      xp: 20,
      current: input.triviaCompletions + input.scrambledCompletions,
      target: 25,
      description: "Complete 25 Bible game rounds across Trivia and Scrambled.",
    }),
    makeBadge({
      id: "encourager",
      title: "Encourager",
      category: "Community",
      emoji: "💙",
      tone: "blue",
      current: input.likesGiven,
      target: 3,
      description: "Like three posts or comments and help another Bible Buddy feel seen.",
    }),
    makeBadge({
      id: "table-talk",
      title: "Table Talk",
      category: "Community",
      emoji: "🗣️",
      tone: "purple",
      current: input.commentsPosted,
      target: 5,
      description: "Post five comments or replies and join the Bible Buddy conversation.",
    }),
    makeBadge({
      id: "watchtower",
      title: "Watchtower",
      category: "Bible Buddy TV",
      emoji: "📺",
      tone: "red",
      current: input.tvVideosStarted,
      target: 1,
      description: "Start your first Bible Buddy TV video and learn through story, teaching, or sermon.",
    }),
    makeBadge({
      id: "first-book-seal",
      title: "Book Seal",
      category: "Reading",
      emoji: "🏅",
      tone: "gold",
      xp: 20,
      current: input.booksCompleted,
      target: 1,
      description: "Finish your first complete Bible book and seal that milestone.",
    }),
    makeBadge({
      id: "three-book-shelf",
      title: "Three Book Shelf",
      category: "Reading",
      emoji: "📚",
      tone: "teal",
      xp: 20,
      current: input.booksCompleted,
      target: 3,
      description: "Finish three Bible books and start building a real Scripture shelf.",
    }),
    makeBadge({
      id: "small-but-steady",
      title: "Small But Steady",
      category: "Progress",
      emoji: "🌱",
      tone: "green",
      current: input.totalPoints,
      target: 250,
      description: "Earn 250 points through small faithful actions.",
    }),
    makeBadge({
      id: "thousand-stones",
      title: "Thousand Stones",
      category: "Progress",
      emoji: "🪨",
      tone: "slate",
      xp: 15,
      current: input.totalPoints,
      target: 1000,
      description: "Earn 1,000 Bible Buddy points, one study action at a time.",
    }),
    makeBadge({
      id: "full-rhythm",
      title: "Full Rhythm",
      category: "Bible Study",
      emoji: "🎵",
      tone: "blue",
      xp: 20,
      current: totalBibleStudyTasks,
      target: 50,
      description: "Complete 50 Bible Study tasks and let the rhythm settle in.",
    }),
  ];

  return badges.map((badge) => ({
    ...badge,
    current: clampBadgeProgress(badge.current, badge.target),
  }));
}

const BOOKS = [
  // Gospels & Acts
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  // Law (Torah)
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  // History
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
  // Wisdom & Poetry
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  // Major Prophets
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  // Minor Prophets
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
  // Paul's Letters
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
  // General Epistles
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  // Revelation
  "Revelation",
];

const TOTAL_BIBLE_CHAPTERS = BOOKS.reduce((total, book) => total + getBookTotalChapters(book), 0);

function getDashboardLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDashboardDayAbbr(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  return ["S", "M", "T", "W", "T", "F", "S"][date.getDay()] || "";
}

function buildLastSevenDashboardDays(activeDates: Set<string> = new Set()) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    const dateKey = getDashboardLocalDateKey(date);
    return {
      date: dateKey,
      completed: activeDates.has(dateKey),
      isToday: index === 6,
    };
  });
}

function getDashboardGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getFirstDashboardName(name: string) {
  const cleanName = name.trim();
  if (!cleanName || cleanName.toLowerCase() === "buddy") return "Buddy";
  return cleanName.split(/\s+/)[0] || "Buddy";
}

function getDashboardStreakEncouragement(streak: number) {
  const safeStreak = Math.max(1, Math.floor(streak || 1));
  if (safeStreak === 1) return "Every good thing starts with day one.";
  if (safeStreak < 7) return "Keep showing up. This is how the rhythm starts.";
  if (safeStreak === 7) return "One full week. That is real momentum.";
  if (safeStreak < 15) return "You are building a steady Bible study habit.";
  if (safeStreak === 15) return "Keep going. Two more weeks and the fire badge is close.";
  if (safeStreak < 30) return `${30 - safeStreak} ${30 - safeStreak === 1 ? "day" : "days"} until the fire badge stays lit.`;
  return "Fire badge earned. Keep the flame moving.";
}

function buildDashboardNextStudyLine(checklistData: ChecklistData | null) {
  const tasks = checklistData?.tasks ?? [];
  const nextTask = tasks.find((task) => !task.done) ?? null;
  const chapterLabel =
    nextTask?.chapterLabel ||
    tasks.find((task) => task.chapterLabel)?.chapterLabel ||
    "today's chapter";

  if (checklistData?.allDone) {
    return `Great job. Start the next chapter study when you are ready.`;
  }

  if (!nextTask) {
    return `Let's start ${chapterLabel} today.`;
  }

  if (nextTask.kind === "devotional") return `Let's start ${chapterLabel} today.`;
  if (nextTask.kind === "reading") return `Let's read ${chapterLabel} today.`;
  if (nextTask.kind === "notes") return `Let's finish the notes for ${chapterLabel} today.`;
  if (nextTask.kind === "trivia") return `Let's finish trivia for ${chapterLabel} today.`;
  if (nextTask.kind === "scrambled") return `Let's finish the word game for ${chapterLabel} today.`;
  if (nextTask.kind === "reflection") return `Let's finish the reflection for ${chapterLabel} today.`;
  return `Let's finish ${chapterLabel} today.`;
}

function getDashboardStudyCover(title: string | null | undefined) {
  if (title === "The Creation of the World") return "/creationoftheworld.png";
  if (title === "The Fall of Man") return "/thefallofman.png";
  if (title === "The Obedience of Abraham") return "/TheobedienceofAbraham.png";
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

function getDashboardStudySummary(title: string | null | undefined) {
  if (title === "The Creation of the World") return "Genesis 1-2: creation, Eden, purpose, rest, and relationship.";
  if (title === "The Fall of Man") return "Genesis 3-4: temptation, shame, Cain and Abel, exile, and hope.";
  if (title === "The Obedience of Abraham") return "Genesis 11-25: Abraham's call, waiting, covenant, testing, and legacy.";
  if (title === "The Rise of Esther") return "Esther 1-10: palace pressure, courage, providence, and reversal.";
  if (title === "The Courage of Daniel") return "Daniel 1-6: exile, courage, wisdom, prayer, pressure, and faith.";
  if (title === "The Testing of Joseph") return "Genesis 37-50: betrayal, waiting, wisdom, forgiveness, and God's hidden plan.";
  if (title === "The Wisdom of Proverbs") return "Chapter-by-chapter wisdom for speech, choices, discipline, and daily life.";
  return "Guided Bible study with reading, notes, games, and reflection.";
}

export default function DashboardPage() {
  // All useState declarations appear first, before any useEffect
  const router = useRouter();
  const { featureToursEnabled } = useFeatureRenderPriority();
  const [userName, setUserName] = useState<string>("buddy");
  const [userId, setUserId] = useState<string | null>(null);
  const [currentMatthewStep, setCurrentMatthewStep] = useState(0);
  const [totalCompletedChapters, setTotalCompletedChapters] = useState<number>(0);
  const [isLoadingBibleCompletion, setIsLoadingBibleCompletion] = useState(true);
  const [animatedDashboardStats, setAnimatedDashboardStats] = useState<DashboardAnimatedStats>({
    completion: 3,
    grace: 2,
    level: 4,
    badges: 6,
  });
  const [bibleBookProgress, setBibleBookProgress] = useState<BibleBookProgress[]>([]);
  const [currentBook, setCurrentBook] = useState<string | null>(null);
  const [isLoadingLevel, setIsLoadingLevel] = useState<boolean>(true);
  const [levelInfo, setLevelInfo] = useState<{
    level: number;
    levelName: string;
    identityText: string;
    encouragementText: string;
    totalPoints: number;
    levelStart: number;
    levelEnd: number;
    pointsToNextLevel: number;
    progressPercent: number;
  } | null>(null);
  const [showLevelInfoModal, setShowLevelInfoModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showGraceDaysInfoModal, setShowGraceDaysInfoModal] = useState(false);
  const [showBibleProgressModal, setShowBibleProgressModal] = useState(false);
  const [badgeProgress, setBadgeProgress] = useState<BadgeProgress[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<BadgeProgress | null>(null);
  const [earnedBadgeQueue, setEarnedBadgeQueue] = useState<BadgeProgress[]>([]);
  const [activeEarnedBadge, setActiveEarnedBadge] = useState<BadgeProgress | null>(null);
  const [showStreakBadgeModal, setShowStreakBadgeModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showVerseOfTheDayModal, setShowVerseOfTheDayModal] = useState(false);
  const [showStreakMotivationModal, setShowStreakMotivationModal] = useState(false);
  const [showStreakMotivationTaskPrompt, setShowStreakMotivationTaskPrompt] = useState(false);
  const [streakMotivationModalMode, setStreakMotivationModalMode] = useState<"daily" | "checkin">("daily");
  const [louisCheckInContextLine, setLouisCheckInContextLine] = useState<string | null>(null);
  const [louisDashboardNudge, setLouisDashboardNudge] = useState<DashboardLouisNudge | null>(null);
  const [pendingDailyStreakSequence, setPendingDailyStreakSequence] = useState(false);
  const [showLouisDailyTasksModal, setShowLouisDailyTasksModal] = useState(false);
  const [louisDailyTaskCycleStartedAt, setLouisDailyTaskCycleStartedAt] = useState<string | null>(null);
  const [showDailyTaskCelebrationModal, setShowDailyTaskCelebrationModal] = useState(false);
  const [pendingDailyTaskCelebrationModal, setPendingDailyTaskCelebrationModal] = useState(false);
  const [dailyTaskCelebrationJourneyKey, setDailyTaskCelebrationJourneyKey] = useState<string | null>(null);
  const [freeChapterGateLabel, setFreeChapterGateLabel] = useState<string | null>(null);
  const [freeChapterCountdown, setFreeChapterCountdown] = useState(() => formatFreePlanCountdown(getNextLocalDayStartMs() - Date.now()));
  const [showJessicaBonusModal, setShowJessicaBonusModal] = useState(false);
  const [hasJessicaBonusAward, setHasJessicaBonusAward] = useState(false);
  const [showZorianRestorationModal, setShowZorianRestorationModal] = useState(false);
  const [hasZorianRestorationAward, setHasZorianRestorationAward] = useState(false);
  const [isLoadingDailyTaskSummary, setIsLoadingDailyTaskSummary] = useState(true);
  const [dailyChecklistData, setDailyChecklistData] = useState<ChecklistData | null>(null);
  const [dailyTaskCompletedCount, setDailyTaskCompletedCount] = useState(0);
  const [dailyTaskTotalCount, setDailyTaskTotalCount] = useState(5);
  const [dailyTaskNextTitle, setDailyTaskNextTitle] = useState<string | null>(null);
  const [dailyTaskSummaryLine, setDailyTaskSummaryLine] = useState<string | null>(null);
  const [selectedDashboardTask, setSelectedDashboardTask] = useState<TaskState | null>(null);
  const [studySettingsOpenRequest, setStudySettingsOpenRequest] = useState(0);
  const [dashboardLastSevenDays, setDashboardLastSevenDays] = useState(buildLastSevenDashboardDays());
  const dailyTaskPopupOpenRef = useRef(false);
  const dailyChecklistDataRef = useRef<ChecklistData | null>(null);
  const dailyTaskSummaryLoadedKeyRef = useRef<string | null>(null);
  const dailyTaskSummaryInFlightRef = useRef<{ key: string; promise: Promise<void> } | null>(null);
  const chapterCelebrationTimerRef = useRef<number | null>(null);
  const chapterCelebrationScheduledKeyRef = useRef<string | null>(null);
  const pendingChapterCelebrationForceRef = useRef(false);
  const dailyStreakSequenceCheckRef = useRef<string | null>(null);
  const [dailyTaskTimeLeftLabel, setDailyTaskTimeLeftLabel] = useState<string | null>(null);
  const [motivationalMessage, setMotivationalMessage] = useState<string>("");
  const [proExpiresAt, setProExpiresAt] = useState<string | null>(null);
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [mobileAdDismissed, setMobileAdDismissed] = useState<boolean>(false);
  const [levelRefreshTick, setLevelRefreshTick] = useState(0);
  const [profile, setProfile] = useState<{ is_paid: boolean | null; daily_credits: number | null; last_active_date: string | null; verse_of_the_day_shown?: string | null; current_streak?: number | null; grace_days_count?: number | null; profile_image_url?: string | null; display_name?: string | null; username?: string | null } | null>(null);
  const [primaryRecommendation, setPrimaryRecommendation] = useState<DailyRecommendation | null>(null);
  const [featureTours, setFeatureTours] = useState<FeatureToursState>({ ...DEFAULT_FEATURE_TOURS });
  const [featureToursLoaded, setFeatureToursLoaded] = useState(false);
  const [activeTourKey, setActiveTourKey] = useState<FeatureTourKey | null>(null);
  const [pendingTourNavigation, setPendingTourNavigation] = useState<string | null>(null);
  const [isSavingFeatureTour, setIsSavingFeatureTour] = useState(false);
  const [showSwipeHintOverlay, setShowSwipeHintOverlay] = useState(false);
  const [isSavingSwipeHint, setIsSavingSwipeHint] = useState(false);
  const swipeHintTouchStartXRef = useRef<number | null>(null);
  const [isOwnerDashboard, setIsOwnerDashboard] = useState(false);
  const [dashboardStatsPane, setDashboardStatsPane] = useState<0 | 1>(0);
  const dashboardStatsTouchStartXRef = useRef<number | null>(null);
  const [ownerQuickStats, setOwnerQuickStats] = useState({
    signups24h: 0,
    activeUsers24h: 0,
    totalUsers: 0,
    upgrades24h: 0,
  });
  const [loadingOwnerQuickStats, setLoadingOwnerQuickStats] = useState(false);

  function getStreakMotivationSeenKey(currentUserId: string, dayKey: string) {
    return `bb:streak-motivation-seen:${currentUserId}:${dayKey}`;
  }

  function getDashboardDailySequenceSeenKey(currentUserId: string, dayKey: string) {
    return `bb:dashboard-daily-sequence-seen:${currentUserId}:${dayKey}`;
  }

  function getDashboardLouisCheckInLastShownKey(currentUserId: string) {
    return `bb:louis-dashboard-checkin-last-shown:${currentUserId}`;
  }

  function getDashboardLouisCheckInCountKey(currentUserId: string, dayKey: string) {
    return `bb:louis-dashboard-checkin-count:${currentUserId}:${dayKey}`;
  }

  function getDashboardBadgeLastShownKey(currentUserId: string) {
    return `bb:louis-dashboard-badge-last-shown:${currentUserId}`;
  }

  function getDashboardLouisNudgeRotationKey(currentUserId: string, dayKey: string) {
    return `bb:louis-dashboard-nudge-rotation:${currentUserId}:${dayKey}`;
  }

  function getStreakPointsShownKey(currentUserId: string, dayKey: string) {
    return `bb:streak-points-shown:${currentUserId}:${dayKey}`;
  }

  function getDailyStreakPopupActionLabel(dayKey: string) {
    return `daily_streak_popup_shown:${dayKey}`;
  }

  function getDailyStreakButtonText(streak: number) {
    const options = ["Let's go", "I'm ready", "Keep going", "Let's do it"];
    return options[Math.abs(Math.floor(streak)) % options.length];
  }

  function getBibleHabitStat(streak: number) {
    const stats = [
      "People who read Scripture weekly report lower stress and higher hope.",
      "Bible engagement is linked with lower anxiety and loneliness.",
      "Daily Bible readers are more likely to say God cares about their suffering.",
      "Reading Scripture four or more days a week is linked with less loneliness.",
      "Steady Bible reading helps people feel closer to God.",
    ];
    return stats[Math.abs(Math.floor(streak)) % stats.length];
  }

  function isRunningStandaloneApp() {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(display-mode: standalone)")?.matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  }

  function buildDashboardLouisNudgePool(): DashboardLouisNudge[] {
    const pool: DashboardLouisNudge[] = [
      {
        id: "bible-stat-consistency",
        eyebrow: "Bible Study Stat",
        title: "Small rhythms add up",
        lineOne: "People who engage Scripture several days a week report more peace and spiritual clarity.",
        lineTwo: "One short, focused moment can still move your faith forward today.",
        buttonText: "Got it",
        action: "dismiss",
      },
      {
        id: "study-tip-slow",
        eyebrow: "Bible Study Tip",
        title: "Read slower for one verse",
        lineOne: "Before you move on, ask what the verse shows about God, people, or wisdom.",
        lineTwo: "One clear sentence remembered is better than a whole chapter rushed.",
        buttonText: "Got it",
        action: "dismiss",
      },
      {
        id: "study-tip-reflect",
        eyebrow: "Bible Study Tip",
        title: "Write the one thing",
        lineOne: "After a chapter, write one thing that stood out and one thing you can practice today.",
        lineTwo: "Reflection turns reading into something you can actually carry.",
        buttonText: "Got it",
        action: "dismiss",
      },
      {
        id: "bible-fact-proverbs",
        eyebrow: "Bible Study Fact",
        title: "Proverbs trains decisions",
        lineOne: "Proverbs is not just clever sayings. It trains the heart to choose a wiser path.",
        lineTwo: "That is why small daily choices matter so much in this book.",
        buttonText: "Nice",
        action: "dismiss",
      },
      {
        id: "feature-change-buddy",
        eyebrow: "Feature Tip",
        title: "Choose your Buddy",
        lineOne: "You can unlock different Bible Buddy guides as your level grows.",
        lineTwo: "Pick the one that feels most encouraging for your study rhythm.",
        buttonText: "Change Buddy",
        action: "route",
        href: "/change-buddy",
      },
      {
        id: "feature-tv",
        eyebrow: "Feature Tip",
        title: "Try Bible Buddy TV",
        lineOne: "When you need a different kind of study moment, Bible Buddy TV has teaching and story content.",
        lineTwo: "It is a good way to keep learning when reading feels heavy.",
        buttonText: "Open TV",
        action: "route",
        href: "/biblebuddy-tv",
      },
      {
        id: "feature-community",
        eyebrow: "Feature Tip",
        title: "Join the conversation",
        lineOne: "The group feed is where Bible Buddies share thoughts, questions, and encouragement.",
        lineTwo: "A simple comment can help someone else keep going today.",
        buttonText: "Open Feed",
        action: "route",
        href: "/bb-feed",
      },
    ];

    if (typeof window !== "undefined" && "Notification" in window && Notification.permission !== "granted") {
      pool.push({
        id: "enable-notifications",
        eyebrow: "App Tip",
        title: "Turn on notifications",
        lineOne: "Notifications can remind you when there is a new message, nudge, or study moment.",
        lineTwo: "Tap the bell at the top of the app and enable alerts for this device.",
        buttonText: "Got it",
        action: "dismiss",
      });
    }

    if (!isRunningStandaloneApp()) {
      pool.push({
        id: "install-app",
        eyebrow: "App Tip",
        title: "Add Bible Buddy to your phone",
        lineOne: "Bible Buddy works best when it is saved like an app on your home screen.",
        lineTwo: "Use your browser menu and choose Add to Home Screen or Install App.",
        buttonText: "Got it",
        action: "dismiss",
      });
    }

    const isFreeUser = membershipStatus !== "pro" && profile?.is_paid !== true;
    if (isFreeUser) {
      pool.push({
        id: "upgrade-profile",
        eyebrow: "Upgrade Tip",
        title: "Unlock the full Bible Buddy experience",
        lineOne: "Pro removes ads and gives your profile the Pro Buddy badge.",
        lineTwo: "It also helps you keep more study momentum across Bible tasks, games, and notes.",
        buttonText: "See Upgrade",
        action: "route",
        href: "/upgrade",
      });
    }

    return pool;
  }

  function pickDashboardLouisNudge(currentUserId: string, dayKey: string) {
    const pool = buildDashboardLouisNudgePool();
    if (pool.length === 0) return null;
    const key = getDashboardLouisNudgeRotationKey(currentUserId, dayKey);
    const currentIndex = Number(window.localStorage.getItem(key) || "0");
    const selected = pool[Math.abs(currentIndex) % pool.length] ?? pool[0];
    window.localStorage.setItem(key, String(currentIndex + 1));
    return selected;
  }

  function getSwipeHintSeenKey(currentUserId: string) {
    return `bb:dashboard-swipe-hint-seen:${currentUserId}`;
  }

  function getStreakMotivation(streak: number) {
    const safeStreak = Math.max(0, Math.floor(streak));

    if (safeStreak === 30) {
      return {
        headline: "You earned the fire badge",
        body: getBibleHabitStat(safeStreak),
        followUp: "Let's keep going.",
      };
    }

    if (safeStreak === 0) {
      return {
        headline: "A fresh start",
        body: "You showed up today. That is the win.",
        followUp: "Let's keep going.",
      };
    }

    const exactDayMessages: Record<number, string> = {
      1: "Nice start. Day 1 counts.",
      2: "You came back. That matters.",
      3: "Three days in a row is a real start.",
      4: "Four days is momentum.",
      5: "Five days is strong. Keep it simple today.",
      6: "Six days. You are almost at a full week.",
      7: "One full week. Great job.",
      14: "Two full weeks. That is steady.",
      21: "Three weeks. You are building a real habit.",
      29: "One more day until the fire badge.",
    };

    if (exactDayMessages[safeStreak]) {
      return {
        headline: `${safeStreak} day streak`,
        body: exactDayMessages[safeStreak],
        followUp: "Let's keep going.",
      };
    }

    return {
      headline: `${safeStreak} day streak`,
      body: getBibleHabitStat(safeStreak),
      followUp: "Let's keep going.",
    };
  }

  function formatChapterForSpeech(chapterLabel: string | null | undefined) {
    if (!chapterLabel) return "today's chapter";
    const match = chapterLabel.match(/^(.+)\s+(\d+)$/);
    if (!match) return chapterLabel;
    return `${match[1]} chapter ${match[2]}`;
  }

  function getChapterPreviewLine(task: TaskState | null) {
    const book = String(task?.book || "").toLowerCase();
    const chapter = task?.chapter ?? null;

    if (book === "genesis" && chapter === 1) {
      return "Genesis 1 opens the Bible with God speaking creation into order, filling the world with life, and making humanity in His image.";
    }

    if (book === "genesis" && chapter === 2) {
      return "Genesis 2 slows down and brings us into Eden, where God forms humanity, gives purpose, and shows why relationship and rest matter.";
    }

    if (book === "genesis" && chapter === 3) {
      return "Genesis 3 shows temptation entering Eden, Adam and Eve hiding in shame, God confronting sin, and the first promise that evil will not win forever.";
    }

    if (book === "genesis" && chapter === 4) {
      return "Genesis 4 follows Cain and Abel as jealousy turns into violence, showing how quickly sin spreads through the human heart and the family.";
    }

    if (book === "genesis" && chapter === 39) {
      return "Joseph serves faithfully in Potiphar's house, refuses temptation, and stays faithful even after being falsely accused.";
    }

    if (book === "genesis" && chapter === 40) {
      return "Joseph listens to two troubled prisoners, interprets their dreams, and keeps trusting God while he is still waiting.";
    }

    if (book === "genesis" && chapter === 41) {
      return "Joseph is brought before Pharaoh, explains the dreams, and God lifts him from prison into leadership.";
    }

    if (book === "proverbs") {
      return "This chapter gives practical wisdom for walking with God, making better choices, and guarding your heart.";
    }

    return `This chapter is the focus for your Bible Study, reading, notes, trivia, and Scrambled.`;
  }

  function buildDailyStreakTaskIntro(checklistData: ChecklistData | null) {
    const readingTask = checklistData?.tasks.find((task) => task.kind === "reading") ?? null;
    const chapterLabel = readingTask?.chapterLabel || "today's chapter";
    const chapterText = formatChapterForSpeech(chapterLabel);
    const totalTasks = checklistData?.tasks.length || 6;
    const completedCount = checklistData?.completedCount ?? 0;
    const remainingCount = Math.max(totalTasks - completedCount, 0);

    if (checklistData?.allDone) {
      return {
        focusLine: `You finished ${chapterLabel}. When you are ready, start the next Bible Study chapter and keep building from here.`,
        previewLine: "",
        closingLine: "",
      };
    }

    if (completedCount === 0) {
      return {
        focusLine: `Let's dig into ${chapterText} today.`,
        previewLine: getChapterPreviewLine(readingTask),
        closingLine: "",
      };
    }

    if (remainingCount <= 2) {
      return {
        focusLine: `Let's finish the last ${remainingCount} task${remainingCount === 1 ? "" : "s"} for ${chapterLabel}.`,
        previewLine: getChapterPreviewLine(readingTask),
        closingLine: "",
      };
    }

    return {
      focusLine: `Let's continue with ${chapterText}. You have ${remainingCount} tasks left in this Bible Study chapter.`,
      previewLine: getChapterPreviewLine(readingTask),
      closingLine: "",
    };
  }

  function buildCompactDashboardCheckIn(checklistData: ChecklistData | null, currentUserName: string) {
    const firstName = currentUserName?.trim()?.split(/\s+/)[0] || "friend";
    const readingTask = checklistData?.tasks.find((task) => task.kind === "reading") ?? null;
    const nextTask = checklistData?.tasks.find((task) => !task.done && !task.disabled) ?? null;
    const chapterLabel = readingTask?.chapterLabel || nextTask?.chapterLabel || "your Bible Study chapter";
    const totalTasks = checklistData?.tasks.length || 6;
    const completedCount = checklistData?.completedCount ?? 0;
    const remainingCount = Math.max(totalTasks - completedCount, 0);

    if (checklistData?.allDone || remainingCount === 0) {
      return {
        greeting: `Hey ${firstName},`,
        mainLine: `${chapterLabel} is complete.`,
        helperLine: "Start the next Bible Study chapter when you are ready.",
      };
    }

    return {
      greeting: `Hey ${firstName},`,
      mainLine: `Let's continue with ${chapterLabel}.`,
      helperLine: `You still have ${remainingCount} task${remainingCount === 1 ? "" : "s"} to finish this chapter.${
        nextTask ? ` Next up: ${nextTask.title}.` : ""
      }`,
    };
  }

  function getRecentActivityLabel(actionType?: string | null, actionLabel?: string | null) {
    const label = String(actionLabel || "").trim();
    switch (actionType) {
      case ACTION_TYPE.devotional_day_completed:
        return "read a chapter intro";
      case ACTION_TYPE.chapter_completed:
      case ACTION_TYPE.reading_plan_chapter_completed:
      case ACTION_TYPE.bible_chapter_viewed:
        return label ? `read ${label.replace(/^Read\s+/i, "")}` : "read a Bible chapter";
      case ACTION_TYPE.chapter_notes_viewed:
      case ACTION_TYPE.chapter_notes_reviewed:
        return label ? `opened notes for ${label.replace(/\s+Review Opened$/i, "")}` : "opened chapter notes";
      case ACTION_TYPE.trivia_chapter_completed:
        return "finished a trivia round";
      case ACTION_TYPE.scrambled_chapter_completed:
        return "finished a Scrambled round";
      case ACTION_TYPE.feed_post_commented:
      case ACTION_TYPE.devotional_reflection_saved:
        return "shared a reflection";
      default:
        return label || null;
    }
  }

  function buildLouisCheckInContextLine(
    recentActions: Array<{ action_type?: string | null; action_label?: string | null }> | null,
    checklistData: ChecklistData | null,
    currentUserName: string,
  ) {
    const firstName = currentUserName?.trim()?.split(/\s+/)[0] || "friend";
    const recentLabels = (recentActions || [])
      .map((action) => getRecentActivityLabel(action.action_type, action.action_label))
      .filter(Boolean) as string[];
    const nextTask = checklistData?.tasks.find((task) => !task.done && !task.disabled) ?? null;
    const chapterLabel =
      checklistData?.tasks.find((task) => task.kind === "reading")?.chapterLabel ||
      nextTask?.chapterLabel ||
      "this chapter";

    if (recentLabels.length > 0 && nextTask) {
      return `Hey ${firstName}, last time you ${recentLabels[0]}. Let’s keep going with ${chapterLabel} and do ${nextTask.title}.`;
    }

    if (nextTask) {
      return `Hey ${firstName}, ${chapterLabel} is still waiting for you. Let’s take the next step and do ${nextTask.title}.`;
    }

    if (checklistData?.allDone) {
      return `Hey ${firstName}, you finished this chapter study. Start the next chapter when you are ready to keep moving.`;
    }

    return `Hey ${firstName}, welcome back. Let’s open Bible Buddy and keep building your Bible study rhythm.`;
  }

  useEffect(() => {
    if (!userId) return;

    void trackNavigationActionOnce({
      userId,
      username: userName,
      actionType: ACTION_TYPE.dashboard_viewed,
      actionLabel: "Dashboard",
      dedupeKey: "dashboard-viewed",
    }).catch((error) => {
      console.error("[NAV] Failed to track dashboard view:", error);
    });
  }, [userId, userName]);

  useEffect(() => {
    let cancelled = false;

    async function loadPrimaryRecommendation() {
      if (!userId) return;
      try {
        const recommendation = await getDailyRecommendation(userId);
        if (!cancelled) {
          setPrimaryRecommendation(recommendation);
        }
      } catch (error) {
        console.error("[DASHBOARD] Failed to load primary recommendation:", error);
        if (!cancelled) {
          setPrimaryRecommendation(null);
        }
      }
    }

    void loadPrimaryRecommendation();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const TOUR_COPY: Partial<Record<FeatureTourKey, { title: string; body: string }>> = {
    bible: {
      title: "Welcome to The Bible Section",
      body: "This is where you can start reading Scripture, follow reading plans, and explore books of the Bible.",
    },
    bible_buddy_tv: {
      title: "Welcome to Bible Buddy TV",
      body: "This is where you can watch Bible shows, movies, sermons, documentaries, and animation inside Bible Buddy.",
    },
    guided_studies: {
      title: "Welcome to Bible Study Tools",
      body: "This is where you can follow structured studies designed to help you understand Scripture step by step.",
    },
    bible_references: {
      title: "Welcome to Bible References",
      body: "This section helps you quickly explore people, places, and keywords to understand biblical context.",
    },
    bible_trivia: {
      title: "ðŸŽ® Welcome to Bible Study Games",
      body: "This is where you can reinforce what youâ€™ve learned through trivia and Scripture-based games like Scrambled.",
    },
    notes: {
      title: "Welcome to Notes",
      body: "Use this section to capture insights, organize your study thoughts, and keep track of what God is teaching you.",
    },
    chat_widget: {
      title: "Welcome to Chat with Louis",
      body: "This chat lets you ask Bible questions instantly while you study so you can stay focused in your reading flow. Louis has been carefully trained for hours on biblical content and designed to search Scripture, filter out nonsense, and prioritize clear, Scripture-grounded answers. Itâ€™s like having a Bible study partner built directly into your reading experience.",
    },
    bible_study_hub: {
      title: "Welcome to Bible Study Tools",
      body: "Join the discussion and explore the Bible by topic. Dive into insights, tools, and foundational studies to grow your understanding.",
    },
  };

  const DASHBOARD_TOUR_CONTENT = (
    <div className="space-y-5">
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        This is your home base inside Bible Buddy. Everything starts here.
      </p>

      <div className="space-y-5">
        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🏆 Your Level</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            The first card you have is your level. Everything you do inside Bible Buddy gives you points, and those points help you level up.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">📖 The Bible</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            This is your full Bible reader where you can highlight, save, and interact with the Word of God.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">👥 Bible Study Group</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            This is where you interact with other Bible Buddies inside of the app. We study the Bible together in the weekly series and daily conversations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🛠️ Bible Study Tools</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            This is where you can access all our Bible study tools, including Bible studies, reading plans, and keyword databases.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">📺 Bible Buddy TV</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            This is where you can stream Bible shows, movies, sermons, documentaries, and more.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🎮 Bible Study Games</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Play our Bible-based games, including trivia and Scrabble-style challenges.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🤝 Share Bible Buddy</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Do you think you know somebody else who would like to be a Bible Buddy? Then click this button to share the app with them.
          </p>
        </section>
      </div>

      <p className="text-sm md:text-[15px] font-medium text-gray-700 leading-7">
        👉 Just click one of the cards to start.
      </p>
    </div>
  );

  const BIBLE_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        ðŸ“– The Bible
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        This is where you read Scripture inside Bible Buddy.
        <br />
        Everything is designed to keep your reading, progress, and notes in one place.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ”¤ Choose Your Translation</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Select from three translations:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ WEB â€“ World English Bible</li>
          <li>â€¢ ASV â€“ American Standard Version</li>
          <li>â€¢ KJV â€“ King James Version</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">You can switch translations anytime while reading.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“š Browse the Books</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">You can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ View books in Biblical order</li>
          <li>â€¢ Or sort them Alphabetically</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Click any book to see its chapters.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“– Read a Chapter</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">When you open a chapter, youâ€™ll see:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ A short overview from Little Louis explaining whatâ€™s happening</li>
          <li>â€¢ The full chapter text</li>
          <li>â€¢ Verse numbers for easy reference</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Everything stays clean and distraction-free.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">â¬…ï¸âž¡ï¸ Navigate Easily</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Under each chapter you can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Go to the Previous or Next chapter</li>
          <li>â€¢ Return to the book overview</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ§  Go Deeper</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Below the chapter, you can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Tap â€œRead [Chapter] Notesâ€ for a full breakdown</li>
          <li>â€¢ Tap â€œTake Notesâ€ to write your own thoughts</li>
          <li>â€¢ Mark the chapter as Completed</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Completed chapters appear highlighted so you can track your progress.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ¤– Use Little Louis Anytime</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Tap the chat icon to ask questions about:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Scripture</li>
          <li>â€¢ History</li>
          <li>â€¢ Context</li>
          <li>â€¢ Meaning</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Your AI Bible Buddy is always available.</p>
      </section>
    </div>
  );

  const GUIDED_STUDIES_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        ðŸ”¨ Bible Study Tools
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Structured ways to go deeper in Scripture.
        <br />
        Choose the format that fits how you like to learn.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“– Bible Reading Plans</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Reading Plans guide you through Scripture in a structured order.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Instead of choosing randomly, you follow a clear path â€” whether thatâ€™s reading the entire Bible, focusing on specific themes, or moving through the story in a logical flow.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Pick a plan, follow the chapters, and let your progress build over time.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸŒ… Bible Studies</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Bible Studies are guided chapter-based studies.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Each Bible study includes:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ A selected passage</li>
          <li>â€¢ Reflection or explanation</li>
          <li>â€¢ Practical application</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Theyâ€™re designed to help you stay consistent and connect Scripture to everyday life.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸŽ¯ Choose Your Style</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Some days you may want structure.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Some days you may want reflection.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Some days you may want a focused tool to keep moving.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Bible Study Tools gives you flexible ways to keep studying.</p>
      </section>
    </div>
  );

  const BIBLE_REFERENCES_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        ðŸ“š Welcome to Bible References
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Most people understand the overall story of the Bible.
      </p>
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        But deep understanding comes from knowing the people, places, and key words behind the story.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ‘¤ People</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Explore thousands of biblical figures.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Learn:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Who they were</li>
          <li>â€¢ Where they lived</li>
          <li>â€¢ What role they played</li>
          <li>â€¢ How they connect to the bigger story</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Understanding the people brings Scripture to life.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“ Places</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">The Bible happened in real locations.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">See:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Cities</li>
          <li>â€¢ Regions</li>
          <li>â€¢ Nations</li>
          <li>â€¢ Geographic context</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Knowing where events happened helps you understand why they happened.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ”‘ Key Words</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Many powerful truths in Scripture depend on specific words.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Study:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Important biblical terms</li>
          <li>â€¢ Repeated themes</li>
          <li>â€¢ Cultural meanings</li>
          <li>â€¢ Original context</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          You cannot fully grasp the message if you donâ€™t understand the words.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ§  Go Deeper</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Bible References is your context engine.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">When something feels unclear, look it up.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Clarity leads to confidence.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Context leads to understanding.</p>
      </section>
    </div>
  );

  const BIBLE_TRIVIA_TOUR_CONTENT = (
    <div className="space-y-4">
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Test what you know, strengthen what you learn, and discover what you miss.
        Bible Study Games turns Scripture into active learning.
      </p>

      <section className="space-y-1.5">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Two different games</h2>
      </section>

      <section className="space-y-1.5">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Trivia</h3>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Use Trivia to test what you remember with questions from what you read in a flashcard-style Bible game.
        </p>
      </section>

      <section className="space-y-1.5">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Scrambled</h3>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Use Scrambled, a word-unscrambling game, to lock key chapter words into your memory.
        </p>
      </section>

      <section className="space-y-1.5">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Grow through repetition</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Use Bible Study Games after reading a chapter, finishing a book, or completing a study.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Learning happens best when you apply what you read.
        </p>
      </section>
    </div>
  );

  const NOTES_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        ðŸ“ Welcome to Notes
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">Reading Scripture is powerful.</p>
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">Writing it down makes it transformational.</p>
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Taking notes helps you slow down, reflect, and truly understand what youâ€™re reading.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">âœï¸ Why Notes Matter</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">When you write:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ You process Scripture more deeply</li>
          <li>â€¢ You remember what you study</li>
          <li>â€¢ You see patterns and connections</li>
          <li>â€¢ You build your own personal commentary over time</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Faith grows when reflection becomes intentional.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“š Two Ways to Take Notes</h2>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“– Guided Notes (GROW Method)</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Use the GROW method to structure your study:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ G â€” Get the passage</li>
          <li>â€¢ R â€” Research the context</li>
          <li>â€¢ O â€” Observe what stands out</li>
          <li>â€¢ W â€” Write your reflection</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          This helps you go deeper instead of just reading quickly.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ—’ Free Form Notes</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Prefer to write freely?</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">You can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Create personal reflections</li>
          <li>â€¢ Record prayers</li>
          <li>â€¢ Write sermon notes</li>
          <li>â€¢ Capture insights while reading</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          No structure required â€” just your thoughts and Scripture.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ” Your Notes Stay Organized</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Notes are connected to books and chapters so you can revisit them anytime.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Over time, this becomes your personal Bible study archive.
        </p>
      </section>
    </div>
  );

  // load user first name from Supabase
  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        setUserId(data.user.id);
        setIsOwnerDashboard(data.user.email === "moorelouis3@gmail.com");
        const meta: any = data.user.user_metadata || {};
        const first =
          meta.firstName ||
          meta.first_name ||
          (data.user.email ? data.user.email.split("@")[0] : null) ||
          "friend";

        setUserName(first);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    if (!isOwnerDashboard) return;

    async function loadOwnerQuickStats() {
      setLoadingOwnerQuickStats(true);
      try {
        const fromDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const [signupsResult, retentionResponse, upgradesResult, totalUsersResponse] = await Promise.all([
          supabase
            .from("user_signups")
            .select("id", { count: "exact", head: true })
            .gte("created_at", fromDate),
          fetch("/api/admin/retention"),
          supabase
            .from("master_actions")
            .select("id", { count: "exact", head: true })
            .eq("action_type", "user_upgraded")
            .gte("created_at", fromDate),
          fetch("/api/admin/total-users"),
        ]);

        if (signupsResult.error || !retentionResponse.ok || upgradesResult.error || !totalUsersResponse.ok) {
          console.error("[DASHBOARD_OWNER_STATS] Error loading quick stats:", {
            signupsError: signupsResult.error,
            retentionError: retentionResponse.ok ? null : retentionResponse.statusText,
            upgradesError: upgradesResult.error,
            totalUsersError: totalUsersResponse.ok ? null : totalUsersResponse.statusText,
          });
          setOwnerQuickStats({ signups24h: 0, activeUsers24h: 0, totalUsers: 0, upgrades24h: 0 });
          setLoadingOwnerQuickStats(false);
          return;
        }

        const totalUsersPayload = await totalUsersResponse.json();
        const retentionPayload = await retentionResponse.json();

        setOwnerQuickStats({
          signups24h: signupsResult.count ?? 0,
          activeUsers24h: retentionPayload.active24h ?? 0,
          totalUsers: totalUsersPayload.totalUsers ?? 0,
          upgrades24h: upgradesResult.count ?? 0,
        });
      } catch (error) {
        console.error("[DASHBOARD_OWNER_STATS] Unexpected error:", error);
        setOwnerQuickStats({ signups24h: 0, activeUsers24h: 0, totalUsers: 0, upgrades24h: 0 });
      }
      setLoadingOwnerQuickStats(false);
    }

    void loadOwnerQuickStats();
  }, [isOwnerDashboard]);

  function renderDashboardStatsRow() {
    const earnedBadgeCount = badgeProgress.filter((badge) => badge.current >= badge.target).length;
    const streakValue = Math.max(1, profile?.current_streak ?? 1);
    const bibleCompletionPercent = Math.max(
      0,
      Math.min(100, Math.round((totalCompletedChapters / Math.max(TOTAL_BIBLE_CHAPTERS, 1)) * 100)),
    );
    const displayedBibleCompletionPercent = isLoadingBibleCompletion
      ? animatedDashboardStats.completion
      : bibleCompletionPercent;
    const graceDaysLoading = !profile;
    const levelLoading = isLoadingLevel || !levelInfo;
    const badgesLoading = badgeProgress.length === 0;
    const greetingName = getFirstDashboardName(profile?.display_name || profile?.username || userName);
    const nextStudyLine = buildDashboardNextStudyLine(dailyChecklistData);
    const activeChapterFocusTask =
      dailyChecklistData?.tasks.find((task) => task.kind === "reading") ||
      dailyChecklistData?.tasks.find((task) => task.chapterLabel) ||
      null;
    const activeChapterLabel =
      activeChapterFocusTask?.chapterLabel ||
      "Your Chapter";
    const currentStudyTask = dailyChecklistData?.tasks.find((task) => task.kind === "devotional") ?? null;
    const currentStudyTitle = currentStudyTask?.devotionalTitle || null;
    const currentStudyCover = getDashboardStudyCover(currentStudyTitle);
    const streakFlameDuration = Math.max(0.85, 7 - Math.min(29, Math.max(0, streakValue)) * 0.2);
    const streakFlameClass =
      streakValue >= 30
        ? "streak-flame-earned"
        : "streak-flame-building";
    const nextLevelPercent = Math.max(0, Math.min(100, levelInfo?.progressPercent ?? 0));
    const personalStats = [
      {
        key: "completion",
        label: "Bible Progress",
        sublabel: "Overall",
        value: `${displayedBibleCompletionPercent}%`,
        icon: "📖",
        tones: "border-[#dbe7f4] bg-gradient-to-br from-white via-[#f8fbff] to-[#eef7ff]",
        onClick: () => setShowBibleProgressModal(true),
      },
      {
        key: "grace",
        label: "Grace Days",
        sublabel: "Available",
        value: graceDaysLoading
          ? animatedDashboardStats.grace
          : Math.max(0, Math.min(5, Number(profile?.grace_days_count ?? 0))),
        icon: "💎",
        tones: "border-[#dbe7f4] bg-gradient-to-br from-white via-[#f7fbff] to-[#edf6ff]",
        onClick: () => setShowGraceDaysInfoModal(true),
      },
      {
        key: "level",
        label: "Level",
        sublabel: `${levelInfo?.pointsToNextLevel ?? 0} XP to next level`,
        value: levelLoading ? animatedDashboardStats.level : levelInfo?.level ?? 1,
        icon: "🛡️",
        tones: "border-[#dbe7f4] bg-gradient-to-br from-white via-[#f8fbff] to-[#edf6ff]",
        onClick: openLevelInfoModal,
        progress: nextLevelPercent,
      },
      {
        key: "badges",
        label: "Badges Earned",
        sublabel: "",
        value: badgesLoading ? animatedDashboardStats.badges : earnedBadgeCount,
        icon: "🏅",
        tones: "border-[#dbe7f4] bg-gradient-to-br from-white via-[#f8fbff] to-[#fff6e8]",
        onClick: () => setShowBadgesModal(true),
      },
    ];

    const renderStatCards = (
      cards: Array<{
        key?: string;
        label: string;
        sublabel?: string;
        value: number | string;
        icon?: string;
        tones: string;
        onClick?: () => void;
        progress?: number;
      }>
    ) => (
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-2 rounded-[24px] border border-[#dbe7f4] bg-white/80 p-2 shadow-[0_12px_34px_rgba(38,63,99,0.08)] backdrop-blur">
        {cards.map((card) => {
          const CardTag = card.onClick ? "button" : "div";
          return (
            <CardTag
              key={card.key ?? card.label}
              type={card.onClick ? "button" : undefined}
              onClick={card.onClick}
              className={`min-h-[88px] rounded-[18px] border px-1.5 py-2 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition sm:min-h-[106px] sm:px-3 sm:py-3 ${card.onClick ? "hover:-translate-y-0.5 hover:shadow-md" : ""} ${card.tones}`}
            >
              <p className="text-base font-black leading-none text-gray-950 sm:text-2xl">
                <span className="mr-1 align-middle text-sm" aria-hidden="true">{card.icon}</span>
                <span>{card.value}</span>
              </p>
              <p className="mt-2 text-[9px] font-black leading-tight text-gray-800 sm:text-xs">
                {card.label}
              </p>
              {card.sublabel ? (
                <p className="mt-0.5 text-[8px] font-semibold leading-tight text-gray-500 sm:text-[10px]">
                  {card.sublabel}
                </p>
              ) : null}
              {typeof card.progress === "number" ? (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#dce8f7]">
                  <div className="h-full rounded-full bg-[#2f7fe8]" style={{ width: `${card.progress}%` }} />
                </div>
              ) : null}
            </CardTag>
          );
        })}
      </div>
    );

    const ownerAnalyticsStats = [
      { key: "signups", label: "Signups 24h", value: loadingOwnerQuickStats ? "..." : ownerQuickStats.signups24h, tones: "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100" },
      { key: "active", label: "Active 24h", value: loadingOwnerQuickStats ? "..." : ownerQuickStats.activeUsers24h, tones: "border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100" },
      { key: "upgrades", label: "Upgrades", value: loadingOwnerQuickStats ? "..." : ownerQuickStats.upgrades24h, tones: "border-emerald-200 bg-gradient-to-br from-white via-emerald-50 to-emerald-100" },
      { key: "total", label: "Total Users", value: loadingOwnerQuickStats ? "..." : ownerQuickStats.totalUsers, tones: "border-rose-200 bg-gradient-to-br from-white via-rose-50 to-rose-100" },
    ];

    const renderGreetingAndStreakCard = () => (
      <>
          <div className="mx-auto w-full max-w-xl px-1">
            <div className="min-w-0">
              <h1 className="text-2xl font-black leading-tight text-gray-950 sm:text-3xl">
                {getDashboardGreeting()}, {greetingName}
              </h1>
            </div>
            <div className="mt-2 overflow-hidden rounded-[18px] border border-[#dbe7f4] bg-white/90 px-3 py-2.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-[#eef6ff] shadow-sm">
                  {currentStudyCover ? (
                    <img src={currentStudyCover} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-xl" aria-hidden="true">
                      📖
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#2f7fe8]">
                    Current Study
                  </p>
                  <p className="mt-0.5 truncate text-sm font-black text-gray-950">
                    {currentStudyTitle || "Choose Your Bible Study"}
                  </p>
                  <p className="mt-0.5 truncate text-xs font-bold text-gray-600">
                    {activeChapterLabel}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-gray-500">
                    {getDashboardStudySummary(currentStudyTitle)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStudySettingsOpenRequest((value) => value + 1)}
                  className="shrink-0 rounded-full bg-[#f2f7ff] px-3 py-1.5 text-[11px] font-black text-[#2f7fe8] transition hover:bg-[#e7f1ff]"
                >
                  Change Study
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setStreakMotivationModalMode("daily");
              setShowStreakMotivationTaskPrompt(false);
              setShowStreakMotivationModal(true);
            }}
            className="mx-auto block w-full max-w-xl rounded-[22px] border border-[#e6edf7] bg-white p-3 text-left shadow-[0_10px_26px_rgba(38,63,99,0.08)] transition hover:shadow-md sm:p-3.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block text-3xl leading-none sm:text-4xl ${streakFlameClass}`}
                    style={{ animationDuration: `${streakFlameDuration}s` }}
                    aria-hidden="true"
                  >
                    🔥
                  </span>
                  <p className="text-xl font-black leading-none text-gray-950 sm:text-2xl">
                    {streakValue} day streak
                  </p>
                </div>
                <p className="mt-1 text-xs font-semibold leading-5 text-gray-500 sm:text-sm">
                  {getDashboardStreakEncouragement(streakValue)}
                </p>
              </div>
            </div>

            <div className="mx-auto mt-3 grid w-full grid-cols-7 gap-1.5">
              {dashboardLastSevenDays.map((day, index) => {
                const completedByStreak = index >= 7 - Math.min(7, streakValue);
                const isCompleted = day.completed || day.isToday || completedByStreak;
                return (
                <div
                  key={day.date}
                  className={`rounded-2xl px-1 py-1.5 text-center transition sm:py-2 ${
                    isCompleted ? "bg-[#eef6ff]" : "bg-[#f8fafc]"
                  } ${day.isToday ? "ring-2 ring-[#4B9CD3]/30" : ""}`}
                >
                  <p className={`mb-1.5 text-[10px] font-black sm:text-[11px] ${isCompleted ? "text-[#2f7fe8]" : "text-gray-500"}`}>
                    {getDashboardDayAbbr(day.date)}
                  </p>
                  <span
                    className={`mx-auto grid h-8 w-8 place-items-center rounded-full border text-sm font-black transition sm:h-9 sm:w-9 ${
                      isCompleted
                        ? day.isToday
                          ? "animate-pulse border-[#2f7fe8] bg-[#2f7fe8] text-white shadow-[0_0_0_6px_rgba(47,127,232,0.15)]"
                          : "border-[#2f7fe8] bg-[#2f7fe8] text-white shadow-sm"
                        : "border-[#d9e3ef] bg-white text-transparent"
                    }`}
                    aria-label={`${day.date} ${isCompleted ? "active" : "inactive"}`}
                  >
                    {isCompleted ? "✓" : "•"}
                  </span>
                </div>
                );
              })}
            </div>
          </button>
      </>
    );

    if (!isOwnerDashboard) {
      return (
        <div className="mb-4 space-y-4">
          {renderGreetingAndStreakCard()}
          {renderStatCards(personalStats)}
        </div>
      );
    }

    return (
      <div
        className="mb-4 space-y-4"
        onTouchStart={(event) => {
          dashboardStatsTouchStartXRef.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = dashboardStatsTouchStartXRef.current;
          dashboardStatsTouchStartXRef.current = null;
          if (startX === null) return;
          const endX = event.changedTouches[0]?.clientX ?? startX;
          const deltaX = endX - startX;
          if (Math.abs(deltaX) < 35) return;
          setDashboardStatsPane(deltaX < 0 ? 1 : 0);
        }}
      >
        {renderGreetingAndStreakCard()}
        <div className="mx-auto max-w-xl overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${dashboardStatsPane * 100}%)` }}
          >
            <div className="w-full shrink-0 px-0.5">
              {renderStatCards(personalStats)}
            </div>
            <div className="w-full shrink-0 px-0.5">
              <Link href="/admin/analytics" className="block">
                {renderStatCards(ownerAnalyticsStats)}
              </Link>
            </div>
          </div>
        </div>

      </div>
    );
  }

  useEffect(() => {
    async function loadFeatureTours() {
      if (!featureToursEnabled || !userId) return;

      const { data, error } = await supabase
        .from("profile_stats")
        .select("feature_tours")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("[FEATURE_TOURS] Error loading feature_tours:", error);
        setFeatureTours({ ...DEFAULT_FEATURE_TOURS });
        setFeatureToursLoaded(true);
        setPendingTourNavigation(null);
        return;
      }

      if (!data) {
        const { error: upsertError } = await supabase
          .from("profile_stats")
          .upsert(
            {
              user_id: userId,
              feature_tours: buildPersistedFeatureTours(),
            },
            { onConflict: "user_id" }
          );

        if (upsertError) {
          console.error("[FEATURE_TOURS] Error creating profile_stats row for tours:", upsertError);
        }

        setFeatureTours({ ...DEFAULT_FEATURE_TOURS });
        setFeatureToursLoaded(true);
        setPendingTourNavigation(null);
        return;
      }

      const normalizedFeatureTours = normalizeFeatureTours(data.feature_tours);
      setFeatureTours(normalizedFeatureTours);
      setFeatureToursLoaded(true);
    }

    loadFeatureTours();
  }, [featureToursEnabled, userId]);

  useEffect(() => {
    if (!featureToursEnabled) {
      setActiveTourKey(null);
      setPendingTourNavigation(null);
      setFeatureToursLoaded(false);
    }
  }, [featureToursEnabled]);

  useEffect(() => {
    if (!featureToursEnabled || !featureToursLoaded || activeTourKey || !userId) return;
    if (featureTours.dashboard !== true) {
      setPendingTourNavigation(null);
    }
  }, [activeTourKey, featureTours, featureToursEnabled, featureToursLoaded, userId]);

  async function handleTourUnderstand() {
    if (!activeTourKey || !userId) return;

    setIsSavingFeatureTour(true);

    const mergedFeatureTours = {
      ...featureTours,
      [activeTourKey]: true,
    };

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("[FEATURE_TOURS] Error updating feature_tours:", updateError);

      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
          },
          { onConflict: "user_id" }
        );

      if (upsertError) {
        console.error("[FEATURE_TOURS] Error upserting feature_tours:", upsertError);
        setIsSavingFeatureTour(false);
        return;
      }
    }

    setFeatureTours(mergedFeatureTours);
    const nextPath = pendingTourNavigation;
    setActiveTourKey(null);
    setPendingTourNavigation(null);
    setIsSavingFeatureTour(false);

    if (nextPath) {
      router.push(nextPath);
    }
  }

  function handleTourClose() {
    const nextPath = pendingTourNavigation;
    setActiveTourKey(null);
    setPendingTourNavigation(null);

    if (nextPath) {
      router.push(nextPath);
    }
  }

  const hasBlockingDashboardOverlay =
    showLevelInfoModal ||
    showStreakBadgeModal ||
    showBadgesModal ||
    Boolean(activeEarnedBadge) ||
    showCommunityModal ||
    showVerseOfTheDayModal ||
    showStreakMotivationModal ||
    showLouisDailyTasksModal ||
    showDailyTaskCelebrationModal ||
    showJessicaBonusModal ||
    showZorianRestorationModal ||
    Boolean(selectedDashboardTask) ||
    Boolean(activeTourKey) ||
    pendingDailyStreakSequence ||
    pendingDailyTaskCelebrationModal;

  useEffect(() => {
    if (!userId || typeof window === "undefined") return;
    const pendingBadges = readPendingBadgeQueue(userId);
    if (pendingBadges.length > 0) {
      setEarnedBadgeQueue((current) => {
        const existingIds = new Set(current.map((badge) => badge.id));
        const fresh = pendingBadges.filter((badge) => !existingIds.has(badge.id));
        return fresh.length ? [...current, ...fresh] : current;
      });
    }
  }, [userId]);

  useEffect(() => {
    if ((hasBlockingDashboardOverlay && !pendingDailyStreakSequence) || activeEarnedBadge || earnedBadgeQueue.length === 0) return;
    if (typeof window !== "undefined" && userId) {
      const lastCheckInShownAt = Number(window.localStorage.getItem(getDashboardLouisCheckInLastShownKey(userId)) || "0");
      const lastBadgeShownAt = Number(window.localStorage.getItem(getDashboardBadgeLastShownKey(userId)) || "0");
      const lastPopupShownAt = Math.max(lastCheckInShownAt, lastBadgeShownAt);
      if (lastPopupShownAt && Date.now() - lastPopupShownAt < DASHBOARD_LOUIS_CHECKIN_COOLDOWN_MS) {
        return;
      }
    }

    const [nextBadge, ...remainingBadges] = earnedBadgeQueue;
    setEarnedBadgeQueue(remainingBadges);
    setActiveEarnedBadge(nextBadge);
    setPendingDailyStreakSequence(false);
    setShowStreakMotivationModal(false);
    setShowStreakMotivationTaskPrompt(false);
    setLouisDashboardNudge(null);
    if (typeof window !== "undefined" && userId) {
      writePendingBadgeQueue(userId, remainingBadges);
      window.localStorage.setItem(getDashboardBadgeLastShownKey(userId), String(Date.now()));
      window.localStorage.setItem(getDashboardLouisCheckInLastShownKey(userId), String(Date.now()));
    }

    window.setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 78,
        origin: { y: 0.42 },
        colors: ["#7BAFD4", "#f7c948", "#22c55e", "#ffffff"],
      });
    }, 240);
  }, [activeEarnedBadge, earnedBadgeQueue, hasBlockingDashboardOverlay, pendingDailyStreakSequence, userId]);

  async function completeSwipeHint(options: { openExplore?: boolean } = {}) {
    if (isSavingSwipeHint) return;

    if (!userId) {
      setShowSwipeHintOverlay(false);
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(getSwipeHintSeenKey(userId), "1");
    }

    setShowSwipeHintOverlay(false);
    setIsSavingSwipeHint(true);

    const mergedFeatureTours = {
      ...featureTours,
      dashboard_swipe_hint: true,
    };
    setFeatureTours(mergedFeatureTours);

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("[SWIPE_HINT] Error updating feature_tours:", updateError);
      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
          },
          { onConflict: "user_id" },
        );

      if (upsertError) {
        console.error("[SWIPE_HINT] Error upserting feature_tours:", upsertError);
      }
    }

    setIsSavingSwipeHint(false);

    if (options.openExplore && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bb:dashboard-open-explore-page"));
    }
  }

  useEffect(() => {
    if (
      !userId ||
      !featureToursLoaded ||
      featureTours.dashboard_swipe_hint === true ||
      showSwipeHintOverlay ||
      hasBlockingDashboardOverlay ||
      isLoadingDailyTaskSummary ||
      typeof window === "undefined"
    ) {
      return;
    }

    if (window.localStorage.getItem(getSwipeHintSeenKey(userId)) === "1") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (window.localStorage.getItem(getSwipeHintSeenKey(userId)) === "1") return;
      setShowSwipeHintOverlay(true);
    }, 850);

    return () => window.clearTimeout(timer);
  }, [
    userId,
    featureToursLoaded,
    featureTours.dashboard_swipe_hint,
    showSwipeHintOverlay,
    hasBlockingDashboardOverlay,
    isLoadingDailyTaskSummary,
  ]);

  useEffect(() => {
    if (showSwipeHintOverlay && hasBlockingDashboardOverlay) {
      setShowSwipeHintOverlay(false);
    }
  }, [showSwipeHintOverlay, hasBlockingDashboardOverlay]);

  async function handleCardClick(
    event: MouseEvent<HTMLAnchorElement>,
    tourKey: FeatureTourKey | "bible_buddy_tv" | "bible_studies" | "recommendation",
    path: string
  ) {
    const dashboardCardLabelMap: Partial<Record<FeatureTourKey | "bible_buddy_tv" | "bible_studies" | "recommendation", string>> = {
      bible: "The Bible",
      bible_studies: "Bible Studies",
      bible_study_hub: "Bible Study Group",
      guided_studies: "Bible Study Tools",
      bible_buddy_tv: "Bible Buddy TV",
      bible_trivia: "Bible Study Games",
      recommendation: "Recommended For You",
    };

    if (userId) {
      const actionLabel = dashboardCardLabelMap[tourKey] || path;
      void trackNavigationActionOnce({
        userId,
        username: userName,
        actionType: ACTION_TYPE.dashboard_card_opened,
        actionLabel,
        dedupeKey: `dashboard-card:${actionLabel}`,
      }).catch((error) => {
        console.error("[NAV] Failed to track dashboard card click:", error);
      });
    }

    event.preventDefault();

    if (tourKey === "recommendation" && primaryRecommendation) {
      const handoff = await buildLouisRecommendationHandoff(primaryRecommendation);
      if (handoff) {
        storeLouisRouteHandoff(handoff);
      }
    }

    router.push(path);
  }

  // Load Pro expiration data
  useEffect(() => {
    // Temporarily disabled for dashboard stabilization
    setMembershipStatus(null);
    setProExpiresAt(null);
  }, []);

  // Update countdown timer in real-time
  useEffect(() => {
    if (membershipStatus !== "pro" || !proExpiresAt) {
      setDaysRemaining(null);
      return;
    }

    function updateCountdown() {
      if (!proExpiresAt) {
        setDaysRemaining(null);
        return;
      }
      const expirationDate = new Date(proExpiresAt);
      const now = new Date();
      const diffMs = expirationDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays > 0 ? diffDays : 0);
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [membershipStatus, proExpiresAt]);

  // Load level data based on total_actions (FAST - only queries total_actions)
  const refreshLevelData = useCallback(() => {
    setLevelRefreshTick((value) => value + 1);
  }, []);

  const openLevelInfoModal = useCallback(() => {
    refreshLevelData();
    setShowLevelInfoModal(true);
  }, [refreshLevelData]);

  useEffect(() => {
    let didCancel = false;
    async function loadLevelDataAndMaybeResetCredits() {
      if (!userId) {
        setIsLoadingLevel(false);
        return;
      }

      setIsLoadingLevel(true);
      try {
        const resetCreditsPromise = fetch("/api/reset-daily-credits", {
          method: "POST",
        })
          .then(async (resetRes) => {
            try {
              return (await resetRes.json()) as { ok: boolean; reset?: boolean; daily_credits?: number };
            } catch {
              return { ok: false } as { ok: boolean; reset?: boolean; daily_credits?: number };
            }
          })
          .catch((error) => {
            console.error("[DASHBOARD] Failed to reset daily credits:", error);
            return { ok: false } as { ok: boolean; reset?: boolean; daily_credits?: number };
          });

        const streakPromise = trackUserActivity(userId)
          .catch((error) => {
            console.error("[DASHBOARD] Failed to track daily login before streak sync:", error);
            return false;
          })
          .then(() => syncCurrentStreakToProfileStats(userId))
          .catch((error) => {
            console.error("[DASHBOARD] Failed to sync streak:", error);
            return null;
          });

        const { data, error } = await supabase
          .from("profile_stats")
          .select("total_actions, is_paid, daily_credits, last_active_date, verse_of_the_day_shown, current_streak, grace_days_count, profile_image_url, display_name, username")
          .eq("user_id", userId)
          .maybeSingle();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        const profileData = data;
        if (!didCancel) {
          setProfile({
            is_paid: profileData?.is_paid === true,
            daily_credits: typeof profileData?.daily_credits === "number" ? profileData.daily_credits : 0,
            last_active_date: profileData?.last_active_date ?? null,
            verse_of_the_day_shown: profileData?.verse_of_the_day_shown ?? null,
            current_streak: profileData?.current_streak ?? 0,
            grace_days_count: Math.max(0, Math.min(5, Number(profileData?.grace_days_count ?? 0))),
            profile_image_url: profileData?.profile_image_url ?? null,
            display_name: profileData?.display_name ?? null,
            username: profileData?.username ?? null,
          });
        }

        const [resetJson, streakData] = await Promise.all([resetCreditsPromise, streakPromise]);
        const resolvedCurrentStreak = streakData?.currentStreak ?? profileData?.current_streak ?? 0;
        if (!didCancel) {
          setProfile((current) => current ? {
            ...current,
            daily_credits:
              typeof resetJson.daily_credits === "number"
                ? resetJson.daily_credits
                : current.daily_credits,
            current_streak: resolvedCurrentStreak,
            grace_days_count: current.grace_days_count ?? 0,
          } : current);
        }

        await new Promise((resolve) => window.setTimeout(resolve, 350));
        if (didCancel) return;

        const [
          actionsResult,
          groupPostsResult,
          groupLikeGivenResult,
          feedPostsResult,
          peopleProgressResult,
          placesProgressResult,
          keywordsProgressResult,
        ] = await Promise.all([
          supabase
            .from("master_actions")
            .select("action_type, action_label, created_at")
            .eq("user_id", userId),
          supabase
            .from("group_posts")
            .select("id, parent_post_id, like_count")
            .eq("user_id", userId),
          supabase
            .from("group_post_likes")
            .select("post_id", { count: "exact", head: true })
            .eq("user_id", userId),
          supabase
            .from("feed_posts")
            .select("reaction_counts")
            .eq("user_id", userId),
          supabase
            .from("people_progress")
            .select("person_name", { count: "exact", head: true })
            .eq("user_id", userId),
          supabase
            .from("places_progress")
            .select("place_name", { count: "exact", head: true })
            .eq("user_id", userId),
          supabase
            .from("keywords_progress")
            .select("keyword_name", { count: "exact", head: true })
            .eq("user_id", userId),
        ]);

        const actionRows = actionsResult.data || [];
        const countActions = (...types: string[]) =>
          actionRows.filter((row) => types.includes(row?.action_type || "")).length;
        const activeLoginDates = new Set<string>();
        actionRows.forEach((row: { action_type?: string | null; created_at?: string | null }) => {
          if (row?.action_type !== ACTION_TYPE.user_login || !row.created_at) return;
          activeLoginDates.add(getDashboardLocalDateKey(new Date(row.created_at)));
        });
        activeLoginDates.add(getDashboardLocalDateKey(new Date()));
        if (!didCancel) {
          setDashboardLastSevenDays(buildLastSevenDashboardDays(activeLoginDates));
        }

        const adminBonusActionRows = actionRows.filter((row) =>
          row?.action_label === JESSICA_BONUS_ACTION_LABEL,
        );
        const zorianRestorationActionRows = actionRows.filter((row) =>
          row?.action_label === ZORIAN_RESTORATION_ACTION_LABEL,
        );
        if (!didCancel) {
          setHasJessicaBonusAward(adminBonusActionRows.length > 0);
          setHasZorianRestorationAward(zorianRestorationActionRows.length > 0);
        }

        const manualBonusPoints = actionRows.reduce((total, row) => {
          const adminMatch = typeof row?.action_label === "string"
            ? row.action_label.match(/^admin_bonus_points:(\d+):/)
            : null;
          return total + (adminMatch ? Number(adminMatch[1]) || 0 : 0) + getBadgeBonusPoints(row?.action_label);
        }, 0);

        const streakAwardedPoints = actionRows.reduce((total, row) => {
          const match = typeof row?.action_label === "string"
            ? row.action_label.match(/^streak_day:(\d+):\d{4}-\d{2}-\d{2}$/)
            : null;
          return total + (match ? Number(match[1]) || 0 : 0);
        }, 0);

        const duplicateEntityViewActionTypes = new Set<string>([
          ACTION_TYPE.person_viewed,
          ACTION_TYPE.place_viewed,
          ACTION_TYPE.keyword_viewed,
        ]);

        const actionTypes = actionRows
          .filter((row) => row?.action_label !== JESSICA_BONUS_ACTION_LABEL)
          .filter((row) => !duplicateEntityViewActionTypes.has(row?.action_type || ""))
          .filter((row) => {
            if (row?.action_type !== ACTION_TYPE.scrambled_word_answered) return true;
            return typeof row?.action_label === "string" ? !row.action_label.includes("[no-point]") : true;
          })
          .map((row) => row.action_type)
          .filter((actionType): actionType is string => typeof actionType === "string" && actionType !== "group_message_sent");

        const uniqueEntityPoints =
          (peopleProgressResult.count || 0) +
          (placesProgressResult.count || 0) +
          (keywordsProgressResult.count || 0);

        const groupPosts = groupPostsResult.data || [];
        const groupRootPostCount = groupPosts.filter((post) => !post.parent_post_id).length;
        const groupCommentCount = groupPosts.filter((post) => !!post.parent_post_id).length;
        const groupLikesReceivedCount = groupPosts.reduce((total, post) => total + (post.like_count || 0), 0);
        const groupLikeGivenCount = groupLikeGivenResult.count || 0;
        const feedLikesReceivedCount = (feedPostsResult.data || []).reduce((total, post) => {
          const reactionCounts = post.reaction_counts && typeof post.reaction_counts === "object"
            ? post.reaction_counts as Record<string, number>
            : {};
          return total + Object.values(reactionCounts).reduce((sum, count) => sum + (Number(count) || 0), 0);
        }, 0);

        const feedLikesGivenCount = countActions(ACTION_TYPE.feed_post_liked);
        const feedCommentCount = countActions(ACTION_TYPE.feed_post_commented, ACTION_TYPE.feed_post_replied);
        const bibleStudyIntroCompletions = countActions(ACTION_TYPE.devotional_day_completed);
        const chapterCompletions = countActions(ACTION_TYPE.chapter_completed, ACTION_TYPE.reading_plan_chapter_completed);
        const notesReviewed = countActions(ACTION_TYPE.chapter_notes_reviewed, ACTION_TYPE.chapter_notes_viewed);
        const triviaAnswers = countActions(ACTION_TYPE.trivia_question_answered, ACTION_TYPE.trivia_question_correct);
        const triviaCompletions = countActions(ACTION_TYPE.trivia_chapter_completed);
        const scrambledWordsAnswered = countActions(ACTION_TYPE.scrambled_word_answered);
        const scrambledCompletions = countActions(ACTION_TYPE.scrambled_chapter_completed);
        const tvVideosStarted = countActions(ACTION_TYPE.bible_buddy_tv_video_started, ACTION_TYPE.bible_buddy_tv_title_opened);
        const booksCompleted = countActions(ACTION_TYPE.book_completed);

        const weightedPoints = calculateWeightedPoints({
          actionTypes,
          groupRootPostCount,
          groupCommentCount,
          groupLikeGivenCount,
          likesReceivedCount: groupLikesReceivedCount + feedLikesReceivedCount,
          streakBonusPoints: streakAwardedPoints,
          manualBonusPoints,
        });

        const baseTotalPoints = weightedPoints.totalPoints + uniqueEntityPoints;
        const levelData = getLevelInfoFromPoints(baseTotalPoints);
        const { level, levelName, identityText, encouragementText, levelStart, levelEnd, progressPercent, totalPoints, pointsToNextLevel } = levelData;

        // Select random motivational message for this level
        const motivationalMessages: Record<number, string[]> = {
          1: [
            "Every journey starts with one step.",
            "You showed up. That matters.",
            "Small steps lead to lasting habits.",
          ],
          2: [
            "You're starting to find your rhythm.",
            "Consistency is forming.",
            "You're learning how this all fits together.",
          ],
          3: [
            "Great questions lead to deeper understanding.",
            "Your curiosity is a strength.",
            "You're learning to slow down and ask why.",
          ],
          4: [
            "You're connecting more than just verses.",
            "The Bible is becoming clearer.",
            "You're exploring with purpose.",
          ],
          5: [
            "You're seeing the bigger picture now.",
            "The story is starting to connect.",
            "You're building understanding, not just habits.",
          ],
          6: [
            "Your study is becoming intentional.",
            "Depth beats speed every time.",
            "You're growing steadily.",
          ],
          7: [
            "You notice what others might miss.",
            "Patterns are forming.",
            "Your understanding is maturing.",
          ],
          8: [
            "You're comfortable going deep.",
            "You've learned how to slow down.",
            "Depth is becoming natural.",
          ],
          9: [
            "You read with wisdom and awareness.",
            "Context matters â€” and you see it.",
            "Your understanding is strong.",
          ],
          10: [
            "You've built a solid foundation.",
            "Your study habits are deeply rooted.",
            "This is long-term growth.",
          ],
        };

        const messages = motivationalMessages[level] || motivationalMessages[1];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        const levelInfoData = {
          level,
          levelName,
          identityText,
          encouragementText,
          totalPoints,
          levelStart,
          levelEnd,
          pointsToNextLevel,
          progressPercent,
        };

        if (!didCancel) {
          setLevelInfo(levelInfoData);
          setMotivationalMessage(randomMessage);
          const nextBadgeProgress = buildBadgeProgress({
            currentStreak: resolvedCurrentStreak,
            totalPoints,
            chapterCompletions,
            bibleStudyIntroCompletions,
            bibleStudyDayCompletions: bibleStudyIntroCompletions,
            triviaAnswers,
            triviaCompletions,
            scrambledWordsAnswered,
            scrambledCompletions,
            notesReviewed,
            commentsPosted: groupCommentCount + feedCommentCount,
            likesGiven: groupLikeGivenCount + feedLikesGivenCount,
            tvVideosStarted,
            booksCompleted,
          });
          setBadgeProgress(nextBadgeProgress);

          const alreadyAwardedBadgeIds = new Set<string>(
            actionRows
              .map((row) => getAwardedBadgeId(row?.action_label))
              .filter((badgeId): badgeId is string => Boolean(badgeId))
          );
          if (typeof window !== "undefined") {
            nextBadgeProgress.forEach((badge) => {
              if (window.localStorage.getItem(getLocalBadgeAwardKey(userId, badge.id)) === "1") {
                alreadyAwardedBadgeIds.add(badge.id);
              }
            });
          }
          const newlyEarnedBadges = nextBadgeProgress.filter(
            (badge) => badge.current >= badge.target && !alreadyAwardedBadgeIds.has(badge.id)
          );

          if (newlyEarnedBadges.length > 0) {
            const queueEarnedBadges = () => {
              if (typeof window !== "undefined") {
                newlyEarnedBadges.forEach((badge) => {
                  window.localStorage.setItem(getLocalBadgeAwardKey(userId, badge.id), "1");
                });
              }

              setEarnedBadgeQueue((current) => {
                const pendingBadges = readPendingBadgeQueue(userId);
                const existingIds = new Set([...current, ...pendingBadges].map((badge) => badge.id));
                const activeId = activeEarnedBadge?.id ?? null;
                const freshBadges = newlyEarnedBadges.filter(
                  (badge) => badge.id !== activeId && !existingIds.has(badge.id)
                );
                if (!freshBadges.length) return current;
                const nextPendingBadges = [...pendingBadges, ...freshBadges];
                writePendingBadgeQueue(userId, nextPendingBadges);
                return [...current, ...freshBadges];
              });
              document.dispatchEvent(new CustomEvent("bb:points"));
            };

            supabase
              .from("master_actions")
              .insert(newlyEarnedBadges.map((badge) => ({
                user_id: userId,
                action_type: ACTION_TYPE.louis_daily_task_bonus,
                action_label: getBadgeAwardLabel(badge),
              })))
              .then(({ error: badgeAwardError }) => {
                if (didCancel) return;
                if (badgeAwardError) {
                  console.warn("[BADGES] Could not persist earned badges; showing local celebration instead.", badgeAwardError);
                }

                queueEarnedBadges();
              });
          }
        }

        // Write current_level back to profile_stats so other components can read it
        supabase
          .from("profile_stats")
          .update({ current_level: level })
          .eq("user_id", userId)
          .then(() => {});

      } catch (err) {
        if (!didCancel) {
          console.warn("Error loading level data:", err);
        }
      } finally {
        if (!didCancel) setIsLoadingLevel(false);
      }
    }
    loadLevelDataAndMaybeResetCredits();
    return () => {
      didCancel = true;
    };
  }, [userId, levelRefreshTick, isOwnerDashboard]);

  useEffect(() => {
    function handlePointsChange() {
      refreshLevelData();
    }

    function handleStudyProgressChange() {
      refreshLevelData();
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === "bb:last-study-progress-change") {
        refreshLevelData();
      }
    }

    if (typeof document !== "undefined") {
      document.addEventListener("bb:points", handlePointsChange as EventListener);
      document.addEventListener("bb:study-progress-changed", handleStudyProgressChange as EventListener);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("bb:study-progress-changed", handleStudyProgressChange as EventListener);
      window.addEventListener("storage", handleStorage);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("bb:points", handlePointsChange as EventListener);
        document.removeEventListener("bb:study-progress-changed", handleStudyProgressChange as EventListener);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("bb:study-progress-changed", handleStudyProgressChange as EventListener);
        window.removeEventListener("storage", handleStorage);
      }
    };
  }, [refreshLevelData]);

  useEffect(() => {
    if (typeof window === "undefined" || userId !== JESSICA_BONUS_USER_ID || !hasJessicaBonusAward) return;
    if (window.localStorage.getItem(JESSICA_BONUS_POPUP_KEY) === "1") return;
    setShowJessicaBonusModal(true);
  }, [hasJessicaBonusAward, userId]);

  useEffect(() => {
    if (typeof window === "undefined" || userId !== ZORIAN_USER_ID || !hasZorianRestorationAward) return;
    if (window.localStorage.getItem(ZORIAN_RESTORATION_POPUP_KEY) === "1") return;
    setShowZorianRestorationModal(true);
  }, [hasZorianRestorationAward, userId]);

  useEffect(() => {
    if (!userId || !profile) return;
    if (!ENABLE_DAILY_DASHBOARD_WELCOME_FLOW) {
      setShowVerseOfTheDayModal(false);
      setPendingDailyStreakSequence(false);
      return;
    }
    const today = getBibleBuddyLocalDayKey();
    const lastShownKey = getDashboardLouisCheckInLastShownKey(userId);
    const lastShownAt = Number(window.localStorage.getItem(lastShownKey) || "0");
    const checkInReady = !lastShownAt || Date.now() - lastShownAt >= DASHBOARD_LOUIS_CHECKIN_COOLDOWN_MS;
    setShowVerseOfTheDayModal(false);
    setPendingDailyStreakSequence(checkInReady);
  }, [userId, profile]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dispatchEvent(
      new CustomEvent("bb:dashboard-verse-modal-state", {
        detail: { open: showVerseOfTheDayModal },
      }),
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("bb:dashboard-verse-modal-state", {
          detail: { open: false },
        }),
      );
    };
  }, [showVerseOfTheDayModal]);

  useEffect(() => {
    if (!ENABLE_DAILY_DASHBOARD_WELCOME_FLOW) return;
    if (
      !userId ||
      !profile ||
      !pendingDailyStreakSequence ||
      showVerseOfTheDayModal ||
      activeEarnedBadge ||
      earnedBadgeQueue.length > 0 ||
      showLevelInfoModal ||
      showStreakBadgeModal ||
      showBadgesModal ||
      showCommunityModal ||
      showLouisDailyTasksModal ||
      showDailyTaskCelebrationModal ||
      showJessicaBonusModal ||
      showZorianRestorationModal ||
      Boolean(selectedDashboardTask) ||
      Boolean(activeTourKey) ||
      typeof window === "undefined"
    ) return;
    const cycleStartedAt = hasActiveLouisDailyTaskCycle(userId)
      ? getLouisDailyTaskCycleStartedAt(userId)
      : ensureLouisDailyTaskCycle(userId);
    if (!cycleStartedAt) {
      setPendingDailyStreakSequence(false);
      return;
    }

    const dayKey = getBibleBuddyLocalDayKey();
    const currentUserId = userId;
    const currentStreakForPopup = profile.current_streak ?? 0;
    const nowMs = Date.now();
    const seenKey = getStreakMotivationSeenKey(userId, dayKey);
    const dailySequenceSeenKey = getDashboardDailySequenceSeenKey(userId, dayKey);
    const dailyStreakAlreadySeenLocally =
      window.localStorage.getItem(seenKey) === "1" ||
      window.localStorage.getItem(dailySequenceSeenKey) === "1";
    const lastShownKey = getDashboardLouisCheckInLastShownKey(userId);
    const lastShownAt = Number(window.localStorage.getItem(lastShownKey) || "0");
    if (dailyStreakAlreadySeenLocally && lastShownAt && nowMs - lastShownAt < DASHBOARD_LOUIS_CHECKIN_COOLDOWN_MS) {
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
      setPendingDailyStreakSequence(false);
      dailyStreakSequenceCheckRef.current = null;
      return;
    }
    const checkKey = `${userId}:${Math.floor(nowMs / DASHBOARD_LOUIS_CHECKIN_COOLDOWN_MS)}`;
    if (dailyStreakSequenceCheckRef.current === checkKey) return;
    dailyStreakSequenceCheckRef.current = checkKey;

    let cancelled = false;
    if (window.localStorage.getItem(`bb:required-study-selection-active:${userId}`) === "1") {
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
      setPendingDailyStreakSequence(false);
      dailyStreakSequenceCheckRef.current = null;
      return;
    }
    if (window.localStorage.getItem(`bb:grace-days:reward-active:${userId}`) === "1") {
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
      setPendingDailyStreakSequence(false);
      dailyStreakSequenceCheckRef.current = null;
      return;
    }

    async function openDailyStreakPopupIfNeeded() {
      const popupActionLabel = getDailyStreakPopupActionLabel(dayKey);
      const { data: existingPopup, error: existingPopupError } = await supabase
        .from("master_actions")
        .select("id")
        .eq("user_id", currentUserId)
        .eq("action_type", ACTION_TYPE.louis_daily_message_shown)
        .eq("action_label", popupActionLabel)
        .limit(1)
        .maybeSingle();

      if (cancelled) return;

      const alreadyAwardedDailyStreakPopup = !existingPopupError && Boolean(existingPopup?.id);
      const recentActivitiesResult = await supabase
        .from("master_actions")
        .select("action_type, action_label, created_at")
        .eq("user_id", currentUserId)
        .order("created_at", { ascending: false })
        .limit(3);

      if (!cancelled) {
        setLouisCheckInContextLine(
          buildLouisCheckInContextLine(
            (recentActivitiesResult.data || []) as Array<{ action_type?: string | null; action_label?: string | null }>,
            dailyChecklistDataRef.current || dailyChecklistData,
            userName,
          ),
        );
      }

      if (!alreadyAwardedDailyStreakPopup) {
        const { error: insertPopupError } = await supabase
          .from("master_actions")
          .insert({
            user_id: currentUserId,
            action_type: ACTION_TYPE.louis_daily_message_shown,
            action_label: popupActionLabel,
            username: userName ?? null,
          });

        if (insertPopupError) {
          console.error("[DASHBOARD] Could not save daily streak popup state:", insertPopupError);
        }
      }

      if (cancelled) return;

      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
      setStreakMotivationModalMode(alreadyAwardedDailyStreakPopup ? "checkin" : "daily");
      setShowStreakMotivationTaskPrompt(!alreadyAwardedDailyStreakPopup);
      setLouisDashboardNudge(alreadyAwardedDailyStreakPopup ? pickDashboardLouisNudge(currentUserId, dayKey) : null);
      setShowStreakMotivationModal(true);
      const streakPointsShownKey = getStreakPointsShownKey(currentUserId, dayKey);
      if (!alreadyAwardedDailyStreakPopup && window.localStorage.getItem(streakPointsShownKey) !== "1") {
        const streakPoints = Math.min(30, Math.max(0, currentStreakForPopup));
        if (streakPoints > 0) {
          triggerPoints(streakPoints);
        }
        window.localStorage.setItem(streakPointsShownKey, "1");
      }
      window.localStorage.setItem(seenKey, "1");
      window.localStorage.setItem(dailySequenceSeenKey, "1");
      window.localStorage.setItem(lastShownKey, String(Date.now()));
      const countKey = getDashboardLouisCheckInCountKey(currentUserId, dayKey);
      const nextCount = Number(window.localStorage.getItem(countKey) || "0") + 1;
      window.localStorage.setItem(countKey, String(nextCount));
      setPendingDailyStreakSequence(false);
      dailyStreakSequenceCheckRef.current = null;
    }

    void openDailyStreakPopupIfNeeded();

    return () => {
      cancelled = true;
    };
  }, [
    activeEarnedBadge,
    activeTourKey,
    dailyChecklistData,
    earnedBadgeQueue.length,
    pendingDailyStreakSequence,
    profile,
    selectedDashboardTask,
    showBadgesModal,
    showCommunityModal,
    showDailyTaskCelebrationModal,
    showJessicaBonusModal,
    showLevelInfoModal,
    showLouisDailyTasksModal,
    showStreakBadgeModal,
    showVerseOfTheDayModal,
    showZorianRestorationModal,
    userId,
    userName,
  ]);

  useEffect(() => {
    if (!userId || typeof window === "undefined") return;
    const cycleStartedAt = getLouisDailyTaskCycleStartedAt(userId) ?? ensureLouisDailyTaskCycle(userId);
    if (cycleStartedAt) {
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
    }
  }, [userId]);

  useEffect(() => {
    setDailyTaskTimeLeftLabel(null);
  }, []);

  useEffect(() => {
    dailyTaskPopupOpenRef.current = Boolean(selectedDashboardTask) || showLouisDailyTasksModal;
  }, [selectedDashboardTask, showLouisDailyTasksModal]);

  useEffect(() => {
    if (!pendingDailyTaskCelebrationModal) return;
    setPendingDailyTaskCelebrationModal(false);
    pendingChapterCelebrationForceRef.current = false;
    setDailyTaskCelebrationJourneyKey(null);
    setShowDailyTaskCelebrationModal(false);
  }, [
    pendingDailyTaskCelebrationModal,
  ]);

  useEffect(() => {
    if (showDailyTaskCelebrationModal) {
      setShowDailyTaskCelebrationModal(false);
    }
  }, [
    showDailyTaskCelebrationModal,
  ]);

  const currentStreak = profile?.current_streak ?? 0;
  const dashboardChecklistData = useMemo(
    () => dailyChecklistData ?? buildChooseDevotionalChecklistData(userId || "dashboard-fallback"),
    [dailyChecklistData, userId],
  );
  const dashboardChecklistLoading = isLoadingDailyTaskSummary && Boolean(dailyChecklistData);
  const completedChapterLabel =
    dashboardChecklistData.tasks.find((task) => task.kind === "reading")?.chapterLabel ||
    dashboardChecklistData.tasks.find((task) => task.chapterLabel)?.chapterLabel ||
    "this chapter";
  const nextChapterLabel = (() => {
    const chapterTask = dashboardChecklistData.tasks.find((task) => task.book && task.chapter);
    if (!chapterTask?.book || !chapterTask.chapter || !dashboardChecklistData.nextJourneyTarget) return "the next chapter";
    return `${chapterTask.book} ${chapterTask.chapter + 1}`;
  })();

  useEffect(() => {
    if (!freeChapterGateLabel) return;
    const updateCountdown = () => {
      setFreeChapterCountdown(formatFreePlanCountdown(getNextLocalDayStartMs() - Date.now()));
    };
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 30000);
    return () => window.clearInterval(interval);
  }, [freeChapterGateLabel]);

  useEffect(() => {
    if (!showDailyTaskCelebrationModal) return;

    const timer = window.setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.62 },
        colors: ["#7BAFD4", "#9fce85", "#f6d365", "#ffffff"],
      });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [showDailyTaskCelebrationModal]);

  const loadDailyTaskSummary = useCallback(async (options: { force?: boolean; silent?: boolean } = {}) => {
    if (!userId) {
      setIsLoadingDailyTaskSummary(false);
      setDailyChecklistData(null);
      dailyChecklistDataRef.current = null;
      setDailyTaskCompletedCount(0);
      setDailyTaskTotalCount(5);
      setDailyTaskNextTitle(null);
      setDailyTaskSummaryLine(null);
      return;
    }

    const activeCycleStartedAt =
      louisDailyTaskCycleStartedAt ??
      (typeof window !== "undefined" ? ensureLouisDailyTaskCycle(userId) : null);

    if (activeCycleStartedAt && activeCycleStartedAt !== louisDailyTaskCycleStartedAt) {
      setLouisDailyTaskCycleStartedAt(activeCycleStartedAt);
    }

    if (!activeCycleStartedAt) {
      const fallbackData = buildChooseDevotionalChecklistData(userId);
      setIsLoadingDailyTaskSummary(false);
      setDailyChecklistData(fallbackData);
      dailyChecklistDataRef.current = fallbackData;
      setDailyTaskCompletedCount(fallbackData.completedCount);
      setDailyTaskTotalCount(fallbackData.tasks.length || 5);
      setDailyTaskNextTitle(fallbackData.nextTaskTitle);
      setDailyTaskSummaryLine(fallbackData.summaryLine);
      return;
    }

    const loadKey = `${userId}:${activeCycleStartedAt}:${currentStreak}`;

    if (dailyTaskSummaryInFlightRef.current?.key === loadKey) {
      return dailyTaskSummaryInFlightRef.current.promise;
    }

    if (!options.force && dailyTaskSummaryLoadedKeyRef.current === loadKey) {
      return;
    }

    const hasExistingChecklist = Boolean(dailyChecklistDataRef.current);
    if (!options.silent && !hasExistingChecklist) {
      setIsLoadingDailyTaskSummary(true);
    }

    const loadPromise = (async () => {
      const previousChecklistData = dailyChecklistDataRef.current;
      const checklistData = await withDashboardTimeout(
        fetchLouisDailyChecklistData(
          userId,
          currentStreak,
          activeCycleStartedAt,
        ),
        DAILY_TASK_SUMMARY_TIMEOUT_MS,
        "Dashboard Bible Study tasks",
      );
      setDailyChecklistData(checklistData);
      dailyChecklistDataRef.current = checklistData;
      setDailyTaskCompletedCount(checklistData.completedCount);
      setDailyTaskTotalCount(checklistData.tasks.length || 5);
      setDailyTaskNextTitle(checklistData.nextTaskTitle);
      setDailyTaskSummaryLine(checklistData.summaryLine);
      dailyTaskSummaryLoadedKeyRef.current = loadKey;

      if (
        previousChecklistData?.journeyKey &&
        previousChecklistData.journeyKey === checklistData.journeyKey &&
        !previousChecklistData.allDone &&
        checklistData.allDone
      ) {
        // The dashboard task area now handles chapter completion inline.
      }
    })();

    dailyTaskSummaryInFlightRef.current = { key: loadKey, promise: loadPromise };

    try {
      await loadPromise;
    } catch (error) {
      console.error("[DASHBOARD] Could not load daily task summary:", error);
      const fallbackData = buildChooseDevotionalChecklistData(userId);
      setDailyChecklistData(fallbackData);
      dailyChecklistDataRef.current = fallbackData;
      setDailyTaskCompletedCount(fallbackData.completedCount);
      setDailyTaskTotalCount(fallbackData.tasks.length || 5);
      setDailyTaskNextTitle(fallbackData.nextTaskTitle);
      setDailyTaskSummaryLine(fallbackData.summaryLine);
    } finally {
      if (dailyTaskSummaryInFlightRef.current?.key === loadKey) {
        dailyTaskSummaryInFlightRef.current = null;
      }
      setIsLoadingDailyTaskSummary(false);
    }
  }, [currentStreak, louisDailyTaskCycleStartedAt, userId]);

  useEffect(() => {
    void loadDailyTaskSummary();
  }, [loadDailyTaskSummary]);

  useEffect(() => {
    function refreshDailyTaskSummary() {
      void loadDailyTaskSummary({ force: true, silent: true });
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        refreshDailyTaskSummary();
      }
    }

    window.addEventListener("focus", refreshDailyTaskSummary);
    window.addEventListener("bb:daily-task-progress-updated", refreshDailyTaskSummary);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", refreshDailyTaskSummary);
      window.removeEventListener("bb:daily-task-progress-updated", refreshDailyTaskSummary);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loadDailyTaskSummary]);

  useEffect(() => {
    function handleOpenLevelInfo() {
      openLevelInfoModal();
    }

    function handleOpenStreakInfo() {
      setStreakMotivationModalMode("daily");
      setShowStreakMotivationTaskPrompt(false);
      setShowStreakMotivationModal(true);
    }

    function handleOpenDailyTasks() {
      if (userId) {
        const cycleStartedAt = getLouisDailyTaskCycleStartedAt(userId) ?? ensureLouisDailyTaskCycle(userId);
        if (cycleStartedAt) {
          setLouisDailyTaskCycleStartedAt(cycleStartedAt);
        }
      }
      setShowLouisDailyTasksModal(true);
    }

    window.addEventListener("bb:dashboard-open-level-info", handleOpenLevelInfo);
    window.addEventListener("bb:dashboard-open-streak-info", handleOpenStreakInfo);
    window.addEventListener("bb:dashboard-open-daily-tasks", handleOpenDailyTasks);

    return () => {
      window.removeEventListener("bb:dashboard-open-level-info", handleOpenLevelInfo);
      window.removeEventListener("bb:dashboard-open-streak-info", handleOpenStreakInfo);
      window.removeEventListener("bb:dashboard-open-daily-tasks", handleOpenDailyTasks);
    };
  }, [openLevelInfoModal, userId]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("bb:dashboard-stats-sync", {
        detail: {
          level: levelInfo?.level ?? 1,
          streak: profile?.current_streak ?? 0,
          graceDays: profile?.grace_days_count ?? 0,
        },
      }),
    );
  }, [levelInfo?.level, profile?.current_streak, profile?.grace_days_count]);

  useEffect(() => {
    function handleDashboardStatsSync(event: Event) {
      const customEvent = event as CustomEvent<{ streak?: number; graceDays?: number }>;
      const nextStreak = customEvent.detail?.streak;
      const nextGraceDays = customEvent.detail?.graceDays;
      if (typeof nextStreak !== "number" && typeof nextGraceDays !== "number") return;

      setProfile((current) => {
        if (!current) return current;
        const resolvedStreak =
          typeof nextStreak === "number" && nextStreak >= 0 ? nextStreak : current.current_streak;
        const resolvedGraceDays =
          typeof nextGraceDays === "number" && nextGraceDays >= 0
            ? Math.max(0, Math.min(5, nextGraceDays))
            : current.grace_days_count;

        if (resolvedStreak === current.current_streak && resolvedGraceDays === current.grace_days_count) {
          return current;
        }

        return {
          ...current,
          current_streak: resolvedStreak,
          grace_days_count: resolvedGraceDays,
        };
      });
    }

    window.addEventListener("bb:dashboard-stats-sync", handleDashboardStatsSync as EventListener);
    return () => window.removeEventListener("bb:dashboard-stats-sync", handleDashboardStatsSync as EventListener);
  }, []);

  // Load other dashboard data (separate, non-blocking)
  useEffect(() => {
    async function loadOtherDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoadingBibleCompletion(false);
        return;
      }

      try {
        // Get current active book (for other dashboard features)
        const activeBook = await getCurrentBook(user.id, BOOKS);
        setCurrentBook(activeBook);

        const progressRows = await Promise.all(
          BOOKS.map(async (book) => {
            const chapters = await getCompletedChapters(user.id, book);
            return {
              book,
              completed: chapters.length,
              total: getBookTotalChapters(book),
              chapters,
            };
          }),
        );
        setBibleBookProgress(progressRows);
        setTotalCompletedChapters(progressRows.reduce((sum, row) => sum + row.completed, 0));
      } catch (err) {
        console.warn("Error loading other dashboard data:", err);
      } finally {
        setIsLoadingBibleCompletion(false);
      }
    }

    loadOtherDashboardData();
  }, []);

  useEffect(() => {
    const shouldAnimate =
      isLoadingBibleCompletion ||
      !profile ||
      isLoadingLevel ||
      !levelInfo ||
      badgeProgress.length === 0;

    if (!shouldAnimate) return;

    const values: DashboardAnimatedStats[] = [
      { completion: 1, grace: 1, level: 2, badges: 3 },
      { completion: 4, grace: 3, level: 7, badges: 9 },
      { completion: 9, grace: 5, level: 4, badges: 12 },
      { completion: 2, grace: 0, level: 11, badges: 5 },
      { completion: 7, grace: 4, level: 6, badges: 16 },
      { completion: 3, grace: 2, level: 9, badges: 8 },
    ];
    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % values.length;
      setAnimatedDashboardStats(values[index]);
    }, 115);

    return () => window.clearInterval(timer);
  }, [badgeProgress.length, isLoadingBibleCompletion, isLoadingLevel, levelInfo, profile]);

  // subtitle for reading card (based on preloaded progress)
  const readingSubtitle = totalCompletedChapters === 0
    ? "Start your Bible reading plan here"
    : "Continue reading your Bible here";

  /**
   * FEATURE FLAG: Set to true to enable ads
   * 
   * To enable ads:
   * 1. Set ENABLE_ADS = true in this file
   * 2. Set ENABLE_ADS = true in components/AdSlot.tsx
   * 3. Add actual ad slot IDs from Google AdSense to the AdSlot components below
   * 4. Ensure Google AdSense script is loaded in app/layout.tsx (already added)
   * 
   * IMPORTANT: Ads are disabled by default. Only enable after:
   * - Getting approval from Google AdSense
   * - Testing thoroughly
   * - Ensuring ad slot IDs are correct
   * 
   * Ads will only show for:
   * - Logged-in users
   * - Free plan users (Pro users never see ads)
   */
  const ENABLE_ADS = false;

  // Determine if ads should be shown
  // Only show ads if:
  // - Feature flag is enabled
  // - User is logged in
  // - User is NOT a Pro member
  const shouldShowAds = ENABLE_ADS && userId && membershipStatus !== "pro";
  const inviteLink = typeof window !== "undefined" ? `${window.location.origin}/signup` : "https://www.biblebuddy.com/signup";
  const inviteText = "I've been using Bible Buddy to read and study the Bible. Come join me.";

  async function handleInviteBuddy() {
    if (userId) {
      void trackNavigationActionOnce({
        userId,
        username: userName,
        actionType: ACTION_TYPE.invite_buddy_opened,
        actionLabel: "Invite a Bible Buddy",
        dedupeKey: "dashboard-invite-buddy",
      }).catch((error) => {
        console.error("[NAV] Failed to track invite buddy click:", error);
      });
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Bible Buddy",
          text: inviteText,
          url: inviteLink,
        });
        return;
      } catch {
        // fall through to sms fallback
      }
    }

    if (typeof window !== "undefined") {
      window.location.href = `sms:?&body=${encodeURIComponent(`${inviteText} ${inviteLink}`)}`;
    }
  }

  function handleOpenDailyTasksModal() {
    const cycleStartedAt = userId
      ? getLouisDailyTaskCycleStartedAt(userId) ?? ensureLouisDailyTaskCycle(userId)
      : null;
    if (cycleStartedAt) {
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
    }
    setShowLouisDailyTasksModal(true);
  }

  function handleDailyJourneyTaskClick(task: TaskState) {
    if (task.disabled) return;
    setSelectedDashboardTask(task);
  }

  const exploreLinks = [
    {
      key: "bible",
      title: "The Bible",
      subtitle: "Read the complete Bible here",
      href: "/reading",
      eyebrow: "Scripture",
      emoji: "📖",
      accent: "border-blue-200 bg-blue-100",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible", "/reading"),
    },
    {
      key: "bible_studies",
      title: "Bible Studies",
      subtitle: "Guided chapter studies with reading, notes, games, and reflection",
      href: "/devotionals",
      eyebrow: "Chapter Journeys",
      emoji: "🌅",
      accent: "border-teal-200 bg-teal-100",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible_studies", "/devotionals"),
    },
    {
      key: "group",
      title: "Bible Study Group",
      subtitle: "Study the Bible with us",
      href: "/study-groups",
      eyebrow: "Community",
      emoji: "👥",
      accent: "border-[#b8ddb8] bg-[#d4ecd4]",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible_study_hub", "/study-groups"),
    },
    {
      key: "tools",
      title: "Bible Study Tools",
      subtitle: "A collection of Bible study tools",
      href: "/guided-studies",
      eyebrow: "Study Tools",
      emoji: "🛠️",
      accent: "border-[#e8aeb5] bg-[#f6d6d9]",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "guided_studies", "/guided-studies"),
    },
    {
      key: "tv",
      title: "Bible Buddy TV",
      subtitle: "Stream Bible shows, movies, sermons, and more",
      href: "/biblebuddy-tv",
      eyebrow: "Watch",
      emoji: "📺",
      accent: "border-violet-200 bg-[#efe7ff]",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible_buddy_tv", "/biblebuddy-tv"),
    },
    {
      key: "games",
      title: "Bible Study Games",
      subtitle: "Play our Bible-based games",
      href: "/bible-study-games",
      eyebrow: "Play",
      emoji: "🎮",
      accent: "border-emerald-200 bg-emerald-100",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible_trivia", "/bible-study-games"),
    },
    {
      key: "share",
      title: "Share Bible Buddy",
      subtitle: "Share by text, WhatsApp, or copy link.",
      href: "#share-bible-buddy",
      eyebrow: "Invite",
      emoji: "↗",
      accent: "border-gray-300 bg-gray-100",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        void handleInviteBuddy();
      },
    },
  ];

  const streakMotivation = getStreakMotivation(profile?.current_streak ?? 0);
  const dailyStreakButtonText = getDailyStreakButtonText(profile?.current_streak ?? 0);
  const dailyStreakTaskIntro = buildDailyStreakTaskIntro(dashboardChecklistData);
  const compactDashboardCheckIn = buildCompactDashboardCheckIn(dashboardChecklistData, userName);
  const displayedDashboardNudge = louisDashboardNudge ?? {
    id: "fallback-checkin",
    eyebrow: "Bible Study Check-In",
    title: compactDashboardCheckIn.greeting,
    lineOne: compactDashboardCheckIn.mainLine,
    lineTwo: compactDashboardCheckIn.helperLine,
    buttonText: "OK",
    action: "dismiss" as const,
  };

  function closeDashboardNudge() {
    setShowStreakMotivationModal(false);
    setShowStreakMotivationTaskPrompt(false);
    setLouisCheckInContextLine(null);
    setLouisDashboardNudge(null);
  }

  function handleDashboardNudgeAction() {
    const nudge = displayedDashboardNudge;
    closeDashboardNudge();

    if (nudge.action === "daily-tasks") {
      setShowLouisDailyTasksModal(true);
      return;
    }

    if (nudge.action === "route" && nudge.href) {
      router.push(nudge.href);
    }
  }

  function scheduleChapterCompleteCelebration(journeyKey: string | null | undefined, options?: { force?: boolean }) {
    if (!userId || !journeyKey) return;

    if (!hasLouisChapterJourneyBonusAwarded(userId, journeyKey)) {
      rememberLouisChapterJourneyBonusAwarded(userId, journeyKey);
      triggerPoints(10);
    }

    if (chapterCelebrationTimerRef.current !== null) {
      window.clearTimeout(chapterCelebrationTimerRef.current);
      chapterCelebrationTimerRef.current = null;
    }
    rememberLouisChapterJourneyCelebrationSeen(userId, journeyKey);
    pendingChapterCelebrationForceRef.current = false;
    chapterCelebrationScheduledKeyRef.current = null;
    setPendingDailyTaskCelebrationModal(false);
    setDailyTaskCelebrationJourneyKey(null);
    setShowDailyTaskCelebrationModal(false);
  }

  async function closeDailyTaskCelebrationModal(options?: { advanceToNextChapter?: boolean }) {
    const nextJourneyTarget = dailyChecklistDataRef.current?.nextJourneyTarget || dailyChecklistData?.nextJourneyTarget || null;

    if (userId && dailyTaskCelebrationJourneyKey) {
      rememberLouisChapterJourneyCelebrationSeen(userId, dailyTaskCelebrationJourneyKey);
    }
    pendingChapterCelebrationForceRef.current = false;
    setPendingDailyTaskCelebrationModal(false);
    setShowDailyTaskCelebrationModal(false);
    setDailyTaskCelebrationJourneyKey(null);
    chapterCelebrationScheduledKeyRef.current = null;

    if (!options?.advanceToNextChapter || !userId || !louisDailyTaskCycleStartedAt || !nextJourneyTarget) {
      return;
    }

    const nextChapterUnlockTarget = {
      ...nextJourneyTarget,
      chapterLabel: nextChapterLabel,
    };
    const isFreeUser = membershipStatus !== "pro" && profile?.is_paid !== true;
    if (isFreeUser && !canFreeUserUnlockChapter(userId, nextChapterUnlockTarget)) {
      setFreeChapterCountdown(formatFreePlanCountdown(getNextLocalDayStartMs() - Date.now()));
      setFreeChapterGateLabel(nextChapterLabel);
      return;
    }

    const { error } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          free_devotional_id: nextJourneyTarget.devotionalId,
          louis_primary_devotional_id: nextJourneyTarget.devotionalId,
          louis_primary_devotional_day: nextJourneyTarget.dayNumber,
        },
        { onConflict: "user_id" },
      );

    if (error) {
      console.error("[DASHBOARD] Could not load next chapter after chapter completion:", error);
      return;
    }

    await supabase.from("devotional_progress").upsert(
      {
        user_id: userId,
        devotional_id: nextJourneyTarget.devotionalId,
        day_number: nextJourneyTarget.dayNumber,
        is_completed: false,
        reading_completed: false,
      },
      { onConflict: "user_id,devotional_id,day_number" },
    );

    rememberLouisDailyTaskTarget(userId, louisDailyTaskCycleStartedAt, nextJourneyTarget);
    rememberFreeChapterUnlock(userId, nextChapterUnlockTarget);
    void loadDailyTaskSummary({ force: true, silent: true });
  }

  function handleDashboardTaskProgressUpdated(completedTask?: TaskState) {
    if (completedTask?.kind) {
      let completedJourneyKey: string | null | undefined = null;
      setDailyChecklistData((current) => {
        if (!current?.tasks.length) return current;
        const wasAllDone = current.allDone === true;

        let changed = false;
        const tasks = current.tasks.map((task) => {
          if (task.kind !== completedTask.kind || task.done) return task;
          changed = true;
          return {
            ...task,
            done: true,
            completedAtLabel: task.completedAtLabel || "Done today",
          };
        });

        if (!changed) return current;

        const completedCount = tasks.filter((task) => task.done).length;
        const nextTask = tasks.find((task) => !task.done && !task.disabled) ?? null;
        const nextTaskTitle = nextTask?.title ?? null;
        const summaryLine = `${completedCount} done. ${Math.max(tasks.length - completedCount, 0)} steps left in this chapter study.`;
        const nextChecklistData = {
          ...current,
          tasks,
          completedCount,
          allDone: completedCount >= tasks.length,
          nextTaskTitle,
          summaryLine,
        };

        dailyChecklistDataRef.current = nextChecklistData;
        setDailyTaskCompletedCount(completedCount);
        setDailyTaskTotalCount(tasks.length || 5);
        setDailyTaskNextTitle(nextTaskTitle);
        setDailyTaskSummaryLine(summaryLine);

        if (!wasAllDone && nextChecklistData.allDone) {
          completedJourneyKey = nextChecklistData.journeyKey;
        }

        return nextChecklistData;
      });

      if (completedJourneyKey) {
        // The dashboard task area now handles chapter completion inline.
      }
    }

    if (typeof window !== "undefined") {
      window.setTimeout(() => {
        void loadDailyTaskSummary({ force: true, silent: true });
      }, completedTask ? 650 : 150);
    } else {
      void loadDailyTaskSummary({ force: true, silent: true });
    }
  }

  useEffect(() => {
    return () => {
      if (chapterCelebrationTimerRef.current !== null) {
        window.clearTimeout(chapterCelebrationTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes streak-flame-build {
          0%, 58%, 100% {
            filter: grayscale(1);
            opacity: 0.45;
          }
          68%, 92% {
            filter: grayscale(0);
            opacity: 1;
          }
        }
        @keyframes streak-flame-earned {
          0%, 100% { transform: translateY(0) scale(1) rotate(-2deg); }
          35% { transform: translateY(-1px) scale(1.08) rotate(2deg); }
          70% { transform: translateY(0) scale(1.02) rotate(-1deg); }
        }
        .streak-flame-locked {
          filter: grayscale(1);
          opacity: 0.45;
        }
        .streak-flame-building {
          animation-name: streak-flame-build;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          filter: grayscale(1);
        }
        .streak-flame-earned {
          filter: grayscale(0);
          opacity: 1;
          animation: streak-flame-earned 1.15s ease-in-out infinite;
          transform-origin: center bottom;
        }
        @keyframes dashboard-diamond-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(47,127,232,0)); opacity: 0.88; }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 12px rgba(47,127,232,0.45)); opacity: 1; }
        }
        .dashboard-diamond-glow {
          display: inline-block;
          animation: dashboard-diamond-glow 2.2s ease-in-out infinite;
        }
        .bb-dashboard-dark .dashboard-shell {
          background: linear-gradient(180deg,#101827 0%,#172033 52%,#111827 100%);
        }
        .bb-dashboard-dark .dashboard-shell h1,
        .bb-dashboard-dark .dashboard-shell h2,
        .bb-dashboard-dark .dashboard-shell .text-gray-950,
        .bb-dashboard-dark .dashboard-shell .text-gray-900 {
          color: #f8fafc;
        }
        .bb-dashboard-dark .dashboard-shell .text-gray-800,
        .bb-dashboard-dark .dashboard-shell .text-gray-700,
        .bb-dashboard-dark .dashboard-shell .text-gray-600,
        .bb-dashboard-dark .dashboard-shell .text-gray-500 {
          color: #cbd5e1;
        }
      `}</style>
      <div className="dashboard-shell min-h-screen bg-[linear-gradient(180deg,#f5f8ff_0%,#eef4ff_45%,#fbf8ef_100%)] pb-12">
      {/* DESKTOP LAYOUT: Left Ad | Content | Right Ad */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 mt-4 gap-6">
        {/* LEFT AD SLOT (Desktop Only) */}
        {shouldShowAds && (
          <aside className="w-64 flex-shrink-0 sticky top-8 h-fit">
            <div className="mt-8">
              <AdSlot
                variant="vertical"
                format="300x250"
                className="sticky top-8"
              />
            </div>
          </aside>
        )}

        {/* MAIN CONTENT â€“ CENTERED COLUMN */}
        <div className="flex-1 max-w-2xl mx-auto">
        {renderDashboardStatsRow()}

        <DashboardJourneyExperience
          userId={userId}
          userName={userName}
          profile={profile}
          levelInfo={levelInfo}
          primaryRecommendation={primaryRecommendation}
          checklistData={dashboardChecklistData}
          isLoadingChecklist={dashboardChecklistLoading}
          dailyTaskTimeLeftLabel={dailyTaskTimeLeftLabel}
          membershipStatus={membershipStatus}
          daysRemaining={daysRemaining}
          exploreLinks={exploreLinks}
          onOpenLevelInfo={openLevelInfoModal}
          onOpenStreakInfo={() => {
            setStreakMotivationModalMode("daily");
            setShowStreakMotivationTaskPrompt(false);
            setShowStreakMotivationModal(true);
          }}
          onOpenDailyTasks={handleOpenDailyTasksModal}
          onTaskClick={handleDailyJourneyTaskClick}
          cycleStartedAt={louisDailyTaskCycleStartedAt}
          studySettingsOpenRequest={studySettingsOpenRequest}
          onDevotionalChanged={() => {
            void loadDailyTaskSummary({ force: true, silent: true });
          }}
        />
        </div>

        {/* RIGHT AD SLOT (Desktop Only) */}
        {shouldShowAds && (
          <aside className="w-64 flex-shrink-0 sticky top-8 h-fit">
            <div className="mt-8">
              <AdSlot
                variant="vertical"
                format="300x250"
                className="sticky top-8"
              />
            </div>
          </aside>
        )}
      </div>

      {/* MOBILE LAYOUT: Content Only (Ads shown at bottom) */}
      <div className="lg:hidden max-w-2xl mx-auto px-4 mt-4">
        {renderDashboardStatsRow()}

        <DashboardJourneyExperience
          userId={userId}
          userName={userName}
          profile={profile}
          levelInfo={levelInfo}
          primaryRecommendation={primaryRecommendation}
          checklistData={dashboardChecklistData}
          isLoadingChecklist={dashboardChecklistLoading}
          dailyTaskTimeLeftLabel={dailyTaskTimeLeftLabel}
          membershipStatus={membershipStatus}
          daysRemaining={daysRemaining}
          exploreLinks={exploreLinks}
          onOpenLevelInfo={openLevelInfoModal}
          onOpenStreakInfo={() => {
            setStreakMotivationModalMode("daily");
            setShowStreakMotivationTaskPrompt(false);
            setShowStreakMotivationModal(true);
          }}
          onOpenDailyTasks={handleOpenDailyTasksModal}
          onTaskClick={handleDailyJourneyTaskClick}
          cycleStartedAt={louisDailyTaskCycleStartedAt}
          studySettingsOpenRequest={studySettingsOpenRequest}
          onDevotionalChanged={() => {
            void loadDailyTaskSummary({ force: true, silent: true });
          }}
        />
      </div>

      {/* MOBILE BOTTOM AD BANNER (Fixed at bottom, above system UI) */}
      {shouldShowAds && !mobileAdDismissed && (
        <div 
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg"
          style={{
            paddingBottom: "env(safe-area-inset-bottom, 0)",
          }}
        >
          <div className="max-w-full mx-auto px-2 py-2 relative">
            {/* Dismiss Button */}
            <button
              onClick={() => setMobileAdDismissed(true)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 z-50 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Dismiss ad"
              title="Dismiss ad"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <AdSlot
              variant="horizontal"
              format="320x50"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Add bottom padding to mobile content when ad is shown (prevents content from being hidden behind ad) */}
      {shouldShowAds && !mobileAdDismissed && (
        <div className="lg:hidden h-20" />
      )}

      {false && showSwipeHintOverlay && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/62 px-6 text-white backdrop-blur-[2px]"
          role="button"
          tabIndex={0}
          aria-label="Swipe left to explore Bible Buddy features"
          onClick={() => void completeSwipeHint()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              void completeSwipeHint();
            }
          }}
          onTouchStart={(event) => {
            swipeHintTouchStartXRef.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = swipeHintTouchStartXRef.current;
            swipeHintTouchStartXRef.current = null;
            const endX = event.changedTouches[0]?.clientX ?? null;
            if (startX !== null && endX !== null && endX - startX < -35) {
              void completeSwipeHint({ openExplore: true });
            }
          }}
        >
          <style>{`
            @keyframes swipe-hint-hand-left {
              0% { opacity: 0; transform: translateX(34px) translateY(0) rotate(-8deg) scale(0.96); }
              14% { opacity: 1; }
              58% { opacity: 1; transform: translateX(-44px) translateY(0) rotate(-8deg) scale(1); }
              78%, 100% { opacity: 0; transform: translateX(-58px) translateY(0) rotate(-8deg) scale(0.98); }
            }

            @keyframes swipe-hint-arrow-left {
              0%, 100% { opacity: 0.55; transform: translateX(8px); filter: drop-shadow(0 0 8px rgba(123, 175, 212, 0.75)); }
              50% { opacity: 1; transform: translateX(-8px); filter: drop-shadow(0 0 16px rgba(123, 175, 212, 1)); }
            }

            @keyframes swipe-hint-fade {
              0% { opacity: 0; transform: translateY(8px) scale(0.98); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
          <div
            className="pointer-events-none flex w-full max-w-sm flex-col items-center text-center"
            style={{ animation: "swipe-hint-fade 420ms ease-out both" }}
          >
            <div className="mb-2 text-[15px] font-extrabold tracking-tight sm:text-lg">
              <span className="text-[#ffd84d]">Swipe</span> to explore
            </div>
            <p className="max-w-[17rem] text-xs font-medium leading-5 text-white/90 sm:text-sm">
              Swipe left to see all the other Bible Buddy features.
            </p>

            <div className="relative mt-5 h-24 w-56">
              <div
                className="absolute left-1/2 top-2 -translate-x-1/2 text-6xl font-black leading-none text-[#7BAFD4]"
                style={{ animation: "swipe-hint-arrow-left 1.15s ease-in-out 4" }}
                aria-hidden="true"
              >
                ←
              </div>
              <div
                className="absolute left-1/2 top-10 -translate-x-1/2 text-5xl leading-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)]"
                style={{ animation: "swipe-hint-hand-left 1.15s ease-in-out 4" }}
                aria-hidden="true"
              >
                👆
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#7BAFD4] shadow-[0_0_12px_rgba(123,175,212,0.95)]" />
              <span className="h-2 w-2 rounded-full bg-white/55" />
              <span className="h-2 w-2 rounded-full bg-white/55" />
            </div>
          </div>
        </div>
      )}

      {/* Level Info Modal */}
        <DashboardDailyWelcomeModal
          open={ENABLE_DAILY_DASHBOARD_WELCOME_FLOW && showVerseOfTheDayModal}
          onClose={() => {
            const today = getBibleBuddyLocalDayKey();
            setShowVerseOfTheDayModal(false);
            setProfile((prev) => (prev ? { ...prev, verse_of_the_day_shown: today } : prev));
            setPendingDailyStreakSequence(true);
          }}
        isReturningUser={true}
        userId={userId}
      />

        <ModalShell
          isOpen={ENABLE_DAILY_DASHBOARD_WELCOME_FLOW && showStreakMotivationModal && !showVerseOfTheDayModal}
          onClose={() => {
            setShowStreakMotivationModal(false);
            setShowStreakMotivationTaskPrompt(false);
            setLouisCheckInContextLine(null);
            setLouisDashboardNudge(null);
          }}
          backdropColor="bg-black/45"
        >
        <div className="mx-4 w-full max-w-sm overflow-hidden rounded-[24px] border border-[#d7e4f7] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#edf5ff] via-[#f8fbff] to-[#eef7ff] px-5 py-5 text-center">
            <div className="flex justify-center">
              <LouisAvatar mood={(profile?.current_streak ?? 0) >= 30 ? "stareyes" : "wave"} size={66} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#5f86bd]">
              {streakMotivationModalMode === "daily" ? "Daily Streak" : displayedDashboardNudge.eyebrow}
            </p>
            {streakMotivationModalMode === "checkin" ? (
              <>
                <h2 className="mt-3 text-3xl font-bold text-[#21304f]">
                  {displayedDashboardNudge.title}
                </h2>
                <div className="mx-auto mt-4 max-w-sm space-y-2 text-center">
                  <p className="text-base font-semibold leading-7 text-[#355487]">
                    {displayedDashboardNudge.lineOne}
                  </p>
                  <p className="text-sm leading-6 text-[#4f678e]">
                    {displayedDashboardNudge.lineTwo}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleDashboardNudgeAction}
                    className="inline-flex min-w-[140px] justify-center rounded-full bg-[#7BAFD4] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
                  >
                    {displayedDashboardNudge.buttonText}
                  </button>
                </div>
              </>
            ) : (
              <>
              <h2 className="mt-2 flex items-center justify-center gap-2 text-3xl font-bold text-[#21304f]">
                <span
                  className={`leading-none ${
                    (profile?.current_streak ?? 0) >= 30
                      ? "streak-flame-earned"
                      : (profile?.current_streak ?? 0) <= 1
                        ? "streak-flame-locked"
                        : "streak-flame-building"
                  }`}
                  style={{
                    animationDuration: `${Math.max(0.85, 7 - Math.min(29, Math.max(0, profile?.current_streak ?? 0)) * 0.2)}s`,
                  }}
                  aria-hidden="true"
                >
                  🔥
                </span>
                <span>{streakMotivation.headline}</span>
              </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#4f678e]">
              {streakMotivation.body}
            </p>
              {showStreakMotivationTaskPrompt && (
                <>
                  <p className="mx-auto mt-4 max-w-[17rem] text-sm font-black leading-6 text-[#355487]">
                      {dailyStreakTaskIntro.focusLine}
                  </p>
                  <div className="mt-5 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowStreakMotivationModal(false);
                        setShowStreakMotivationTaskPrompt(false);
                        setLouisCheckInContextLine(null);
                        setLouisDashboardNudge(null);
                      }}
                      className="inline-flex min-w-[140px] justify-center rounded-full bg-[#7BAFD4] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
                    >
                      {dailyStreakButtonText}
                    </button>
                  </div>
                </>
              )}
              </>
            )}
            </div>
          </div>
        </ModalShell>

      <LouisDailyTasksModal
        open={showLouisDailyTasksModal && !showVerseOfTheDayModal && !showStreakMotivationModal}
        onClose={() => {
          setShowLouisDailyTasksModal(false);
          void loadDailyTaskSummary({ force: true, silent: true });
        }}
        userId={userId}
        currentStreak={profile?.current_streak ?? 0}
        cycleStartedAt={louisDailyTaskCycleStartedAt}
      />

      <DashboardDailyTaskCallout
        task={selectedDashboardTask}
        userId={userId}
        onClose={() => setSelectedDashboardTask(null)}
        onProgressUpdated={handleDashboardTaskProgressUpdated}
      />

      <ModalShell
        isOpen={showBibleProgressModal}
        onClose={() => setShowBibleProgressModal(false)}
        backdropColor="bg-black/45"
      >
        {(() => {
          const bibleCompletionPercent = Math.max(
            0,
            Math.min(100, Math.round((totalCompletedChapters / Math.max(TOTAL_BIBLE_CHAPTERS, 1)) * 100)),
          );
          const rows = bibleBookProgress.length
            ? bibleBookProgress
            : BOOKS.map((book) => ({
                book,
                completed: 0,
                total: getBookTotalChapters(book),
                chapters: [] as number[],
              }));
          const sortedRows = [...rows].sort((a, b) => {
            const completedDifference = b.completed - a.completed;
            if (completedDifference !== 0) return completedDifference;

            const aPercent = a.completed / Math.max(a.total, 1);
            const bPercent = b.completed / Math.max(b.total, 1);
            const percentDifference = bPercent - aPercent;
            if (percentDifference !== 0) return percentDifference;

            return BOOKS.indexOf(a.book) - BOOKS.indexOf(b.book);
          });
          const completedBooks = rows.filter((row) => row.completed >= row.total).length;
          const inProgressBooks = rows.filter((row) => row.completed > 0 && row.completed < row.total).length;

          return (
            <div className="relative mx-3 my-5 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
              <div className="border-b border-[#dbe7f6] bg-gradient-to-br from-[#edf7ff] via-white to-[#fff7df] px-5 py-5 sm:px-7">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowBibleProgressModal(false)}
                    className="rounded-full px-2 py-1 text-2xl font-bold leading-none text-[#1f2a44] transition hover:bg-white"
                    aria-label="Close Bible progress"
                  >
                    ×
                  </button>
                </div>

                <div className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-sm">
                  <div className="text-center">
                    <p className="text-5xl font-black leading-none text-[#1f2a44]">{bibleCompletionPercent}%</p>
                    <p className="mt-1 text-sm font-bold text-[#5b6f92]">of the Bible completed</p>
                  </div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-[#7BAFD4] transition-all duration-500"
                      style={{ width: `${bibleCompletionPercent}%` }}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-black text-[#1f2a44]">
                    <div className="rounded-2xl bg-[#eef7ff] px-2 py-3">
                      <div className="text-xl">{completedBooks}</div>
                      <div className="mt-0.5 font-semibold text-[#5b6f92]">Books read</div>
                    </div>
                    <div className="rounded-2xl bg-[#fff3d7] px-2 py-3">
                      <div className="text-xl">{totalCompletedChapters}</div>
                      <div className="mt-0.5 font-semibold text-[#5b6f92]">Chapters read</div>
                    </div>
                    <div className="rounded-2xl bg-[#eefbf4] px-2 py-3">
                      <div className="text-xl">{inProgressBooks}</div>
                      <div className="mt-0.5 font-semibold text-[#5b6f92]">Books started</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {sortedRows.map((row) => {
                    const percent = Math.max(0, Math.min(100, Math.round((row.completed / Math.max(row.total, 1)) * 100)));
                    const isComplete = row.completed >= row.total;
                    const hasStarted = row.completed > 0;
                    const statusText = isComplete ? "Complete" : hasStarted ? "In progress" : "Not started";
                    const statusTone = isComplete
                      ? "bg-[#dff8e8] text-[#116b35]"
                      : hasStarted
                        ? "bg-[#fff3d7] text-[#8a5a00]"
                        : "bg-slate-100 text-slate-500";

                    return (
                      <div
                        key={row.book}
                        className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-black text-[#1f2a44]">{row.book}</h3>
                            <p className="mt-0.5 text-xs font-semibold text-[#5b6f92]">
                              {row.completed} of {row.total} chapters
                            </p>
                          </div>
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${statusTone}`}>
                            {statusText}
                          </span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${isComplete ? "bg-[#19c463]" : "bg-[#7BAFD4]"}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-[#5b6f92]">
                          <span>{percent}%</span>
                          <span>
                            {row.chapters.length > 0
                              ? `Ch. ${row.chapters.slice(0, 6).join(", ")}${row.chapters.length > 6 ? "..." : ""}`
                              : "No chapters yet"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </ModalShell>

      <ModalShell
        isOpen={showGraceDaysInfoModal}
        onClose={() => setShowGraceDaysInfoModal(false)}
        backdropColor="bg-black/45"
      >
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-[30px] border border-[#cfe3f5] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#eef7ff] via-white to-[#edf8ff] px-6 py-7 text-center">
            <div className="flex justify-center">
              <div className="relative rounded-full bg-[#e7f4ff] p-2 shadow-sm">
                <LouisAvatar mood="stareyes" size={72} />
                <span
                  className="absolute -right-1 -top-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md"
                  aria-hidden="true"
                >
                  💎
                </span>
              </div>
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#5f86bd]">
              Streak Protection
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#21304f]">Grace Days</h2>
            <div className="mt-5 space-y-4 text-left text-sm leading-6 text-[#4f678e]">
              <p>
                Grace Days are designed to give you grace while building your Bible habit.
              </p>
              <p>
                Life is not always predictable. Some days get busy. Emergencies happen. Schedules change.
              </p>
              <p>
                Instead of losing your streak instantly, Bible Buddy allows you to earn up to{" "}
                <span className="font-bold text-[#21304f]">5 Grace Days</span>.
              </p>
              <p>
                If you miss a day, a Grace Day can be used to continue your streak and keep your progress going.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-[#d7e8f8] bg-white/80 px-4 py-4 text-sm font-semibold leading-6 text-[#21304f] shadow-sm">
              The goal is not perfection. The goal is helping you build a long term relationship with God through consistency and grace.
            </div>
            <button
              type="button"
              onClick={() => setShowGraceDaysInfoModal(false)}
              className="mt-6 inline-flex min-w-[140px] justify-center rounded-full bg-[#7BAFD4] px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
            >
              Got it
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={Boolean(activeEarnedBadge)}
        onClose={() => setActiveEarnedBadge(null)}
        backdropColor="bg-black/45"
      >
        {activeEarnedBadge ? (() => {
          const tone = BADGE_TONE_CLASSES[activeEarnedBadge.tone];
          const completionLine = getBadgeCompletionLine(activeEarnedBadge.description);

          return (
            <div className="mx-4 w-full max-w-sm overflow-hidden rounded-[24px] border border-[#d7e4f7] bg-white shadow-2xl">
              <style>{`
                @keyframes badge-color-pop {
                  0% { filter: grayscale(1); transform: scale(0.82) rotate(-4deg); opacity: 0.75; }
                  55% { filter: grayscale(0.25); transform: scale(1.1) rotate(2deg); opacity: 1; }
                  100% { filter: grayscale(0); transform: scale(1) rotate(0deg); opacity: 1; }
                }
                @keyframes badge-earned-shine {
                  0% { transform: translateX(-130%) rotate(18deg); opacity: 0; }
                  35% { opacity: 0.75; }
                  100% { transform: translateX(150%) rotate(18deg); opacity: 0; }
                }
                @keyframes badge-float-spark {
                  0%, 100% { transform: translateY(0) scale(1); opacity: 0.55; }
                  50% { transform: translateY(-8px) scale(1.16); opacity: 1; }
                }
                .badge-color-pop { animation: badge-color-pop 900ms cubic-bezier(0.2, 0.9, 0.25, 1.15) both; }
                .badge-earned-shine { animation: badge-earned-shine 1150ms ease-out 280ms both; }
                .badge-float-spark { animation: badge-float-spark 1.7s ease-in-out infinite; }
              `}</style>
              <div className="relative overflow-hidden bg-gradient-to-br from-[#edf5ff] via-[#f8fbff] to-[#eef7ff] px-5 py-5 text-center">
                <div className="pointer-events-none absolute left-8 top-9 text-xl badge-float-spark">✦</div>
                <div className="pointer-events-none absolute right-10 top-16 text-lg badge-float-spark" style={{ animationDelay: "0.35s" }}>✧</div>
                <div className="pointer-events-none absolute bottom-16 left-12 text-lg badge-float-spark" style={{ animationDelay: "0.7s" }}>✦</div>

                <div className="flex justify-center">
                  <div className="relative rounded-full bg-white/75 p-1 shadow-sm">
                    <LouisAvatar mood="hands" size={66} />
                  </div>
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#5f86bd]">
                  Badge Unlocked
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-[#21304f]">You earned a new badge!</h2>

                <div className="mt-5 flex justify-center">
                  <div className={`badge-color-pop relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[28px] border-2 text-center ${tone.tile} ${tone.glow}`}>
                    <span className="text-6xl" aria-hidden="true">{activeEarnedBadge.emoji}</span>
                    <span className="badge-earned-shine pointer-events-none absolute inset-y-0 left-0 w-12 bg-white/70 blur-sm" />
                    <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#19c463] text-sm font-black text-white shadow-md">
                      ✓
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 text-2xl font-black text-[#21304f]">{activeEarnedBadge.title}</h3>
                <div className="mx-auto mt-4 flex max-w-sm items-start gap-3 rounded-2xl border border-[#d7e8f8] bg-white/80 px-4 py-3 text-left shadow-sm">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#19c463] text-xs font-black text-white">
                    ✓
                  </span>
                  <p className="text-sm font-semibold leading-6 text-[#536a8f]">
                    {completionLine}
                  </p>
                </div>
              </div>

              <div className="bg-white px-5 pb-5 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveEarnedBadge(null)}
                  className="w-full rounded-full bg-[#7BAFD4] px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
                >
                  Let’s go
                </button>
              </div>
            </div>
          );
        })() : null}
      </ModalShell>

      <ModalShell
        isOpen={showBadgesModal}
        onClose={() => {
          setSelectedBadge(null);
          setShowBadgesModal(false);
        }}
        backdropColor="bg-black/45"
      >
        <div className="relative mx-3 my-5 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
          <div className="border-b border-[#dbe7f6] bg-gradient-to-br from-[#edf5ff] via-white to-[#f4fbff] px-5 py-5 sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#e8f4ff] p-1 shadow-sm">
                  <LouisAvatar mood="stareyes" size={58} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5f86bd]">
                    Bible Buddy Badges
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#1f2a44]">Badge collection</h2>
                  <p className="mt-1 text-sm leading-5 text-[#5b6f92]">
                    {badgeProgress.filter((badge) => badge.current >= badge.target).length} of {badgeProgress.length} earned
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedBadge(null);
                  setShowBadgesModal(false);
                }}
                className="rounded-full px-2 py-1 text-2xl font-bold leading-none text-[#1f2a44] transition hover:bg-white"
                aria-label="Close badges"
              >
                ×
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#4f678e]">
              Each badge marks a real Bible Buddy moment: showing up, opening Scripture, finishing chapter studies, encouraging others, and growing one step at a time.
            </p>
          </div>

          <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {badgeProgress.map((badge) => {
                const isEarned = badge.current >= badge.target;
                const tone = BADGE_TONE_CLASSES[badge.tone];
                const progressPercent = Math.max(0, Math.min(100, Math.round((badge.current / badge.target) * 100)));

                return (
                  <button
                    key={badge.id}
                    type="button"
                    onClick={() => setSelectedBadge(badge)}
                    className={`group relative flex min-h-[198px] flex-col items-center rounded-[28px] border px-3 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:min-h-[220px] sm:px-4 ${
                      isEarned
                        ? "border-[#9fe6b8] bg-gradient-to-br from-[#f3fff7] via-[#e9fbef] to-[#d7f7e1]"
                        : "border-slate-200 bg-gradient-to-br from-white to-slate-50 opacity-90"
                    }`}
                  >
                    <span
                      className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
                        isEarned ? "bg-[#dff8e8] text-[#116b35]" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isEarned ? "Earned" : "Locked"}
                    </span>
                    <div
                      className={`relative mt-3 flex h-24 w-24 items-center justify-center rounded-[30px] border-2 text-center sm:h-28 sm:w-28 ${
                        isEarned ? `${tone.tile} ${tone.glow}` : "border-slate-200 bg-slate-100 text-slate-400 grayscale"
                      }`}
                    >
                      <span className="text-5xl sm:text-6xl" aria-hidden="true">
                        {badge.emoji}
                      </span>
                      {isEarned ? (
                        <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#19c463] text-sm font-black text-white shadow-md">
                          ✓
                        </span>
                      ) : (
                        <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-300 text-sm font-black text-white shadow-md">
                          ?
                        </span>
                      )}
                    </div>
                    <div className="mt-4 min-w-0">
                      <p className={`text-base font-black leading-tight sm:text-lg ${isEarned ? "text-[#1f2a44]" : "text-slate-500"}`}>
                        {badge.title}
                      </p>
                      <p className={`mx-auto mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
                        isEarned ? "bg-white/80 text-[#12723b]" : "bg-[#edf5ff] text-[#5f86bd]"
                      }`}>
                        {badge.category}
                      </p>
                      <p className={`mx-auto mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
                        isEarned ? "bg-[#e3f8ec] text-[#12723b]" : "bg-slate-100 text-slate-500"
                      }`}>
                        +{badge.xp} XP
                      </p>
                    </div>
                    <div className="mt-auto w-full pt-4">
                      <div className="mb-1 flex items-center justify-between text-[11px] font-black text-[#536a8f]">
                        <span>{isEarned ? "Unlocked" : "Progress"}</span>
                        <span>{badge.current}/{badge.target}</span>
                      </div>
                      <div className={`h-2 w-full overflow-hidden rounded-full ${isEarned ? "bg-[#c9efd5]" : "bg-[#d6e0ea]"}`}>
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isEarned ? tone.progress : "bg-[#8ea0b2]"}`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                    {isEarned ? (
                      <div
                        className="pointer-events-none absolute inset-x-5 top-4 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-80"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedBadge ? (() => {
            const isEarned = selectedBadge.current >= selectedBadge.target;
            const tone = BADGE_TONE_CLASSES[selectedBadge.tone];
            const progressPercent = Math.max(0, Math.min(100, Math.round((selectedBadge.current / selectedBadge.target) * 100)));

            return (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#172033]/35 px-4 backdrop-blur-sm">
                <div className={`w-full max-w-sm rounded-[30px] border p-5 text-center shadow-2xl ${
                  isEarned
                    ? "border-[#9fe6b8] bg-gradient-to-br from-[#f3fff7] via-white to-[#e6f9ed]"
                    : "border-[#d7e4f7] bg-white"
                }`}>
                  <button
                    type="button"
                    onClick={() => setSelectedBadge(null)}
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-700 transition hover:bg-slate-200"
                    aria-label="Close badge detail"
                  >
                    ×
                  </button>
                  <div className="mt-1 flex justify-center">
                    <div
                      className={`relative flex h-32 w-32 items-center justify-center rounded-[34px] border-2 text-center ${
                        isEarned ? `${tone.tile} ${tone.glow}` : "border-slate-200 bg-slate-100 text-slate-400 grayscale"
                      }`}
                    >
                      <span className="text-7xl" aria-hidden="true">{selectedBadge.emoji}</span>
                      <span className={`absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-sm font-black text-white shadow-md ${isEarned ? "bg-[#19c463]" : "bg-slate-300"}`}>
                        {isEarned ? "✓" : "?"}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#5f86bd]">{selectedBadge.category}</p>
                  <h3 className="mt-1 text-3xl font-black leading-tight text-[#1f2a44]">{selectedBadge.title}</h3>
                  <p className={`mx-auto mt-3 inline-flex rounded-full px-4 py-2 text-sm font-black ${
                    isEarned ? "bg-[#dff8e8] text-[#12723b]" : "bg-[#eaf7ff] text-[#315f7d]"
                  }`}>
                    +{selectedBadge.xp} XP
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#536a8f]">{selectedBadge.description}</p>
                  <div className={`mt-5 rounded-2xl p-4 ${isEarned ? "bg-white/80" : "bg-[#f4f8ff]"}`}>
                    <div className="flex items-center justify-between text-sm font-black text-[#24324b]">
                      <span>{isEarned ? "Badge unlocked" : "Progress"}</span>
                      <span>{selectedBadge.current}/{selectedBadge.target}</span>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#d6e0ea]">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${isEarned ? tone.progress : "bg-[#8ea0b2]"}`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBadge(null)}
                    className="mt-5 w-full rounded-full bg-[#7BAFD4] px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
                  >
                    Nice
                  </button>
                </div>
              </div>
            );
          })() : null}
        </div>
      </ModalShell>

      <ModalShell
        isOpen={false}
        onClose={() => void closeDailyTaskCelebrationModal()}
        backdropColor="bg-black/45"
      >
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#edf5ff] via-[#f8fbff] to-[#eef7ff] px-6 py-8 text-center">
            <div className="flex justify-center">
              <LouisAvatar mood="stareyes" size={72} />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-[#21304f]">Chapter Complete!</h2>
            <p className="mt-3 text-base font-semibold text-[#355487]">
              You completed {completedChapterLabel}.
            </p>
              <p className="mt-2 text-sm leading-6 text-[#58709d]">
                Great work. {nextChapterLabel} is ready when you are.
              </p>
            <button
              type="button"
              onClick={() => void closeDailyTaskCelebrationModal({ advanceToNextChapter: true })}
              className="mt-5 inline-flex rounded-full bg-[#7aa7df] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f93d3]"
            >
              OK
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={freeChapterGateLabel !== null}
        onClose={() => setFreeChapterGateLabel(null)}
        backdropColor="bg-black/55"
      >
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-[30px] border border-[#f0d7b3] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#fff8ef] via-white to-[#eef7ff] px-6 py-7 text-center">
            <div className="flex justify-center">
              <LouisAvatar mood="wave" size={72} />
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#2f7fe8]">Free Bible Buddy</p>
            <h2 className="mt-2 text-2xl font-black text-[#21304f]">Your next chapter opens soon</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#58709d]">
              Hey, as a free Bible Buddy, you get one new Bible study chapter each day.
            </p>
            <div className="mt-4 rounded-2xl bg-white/80 px-4 py-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5b6f92]">
                {freeChapterGateLabel || "Your next chapter"} opens in
              </p>
              <p className="mt-1 text-2xl font-black text-[#17213d]">{freeChapterCountdown}</p>
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-[#58709d]">
              Do not want to wait? Upgrade now for unlimited chapters.
            </p>
            <Link
              href="/upgrade"
              className="mt-5 inline-flex w-full justify-center rounded-full bg-[#7BAFD4] px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
            >
              Upgrade now
            </Link>
            <button
              type="button"
              onClick={() => setFreeChapterGateLabel(null)}
              className="mt-2 inline-flex w-full justify-center rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 transition hover:bg-gray-50"
            >
              Keep waiting
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={showJessicaBonusModal}
        onClose={() => {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(JESSICA_BONUS_POPUP_KEY, "1");
          }
          setShowJessicaBonusModal(false);
        }}
        backdropColor="bg-black/50"
      >
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#fff7d9] via-[#fffdf4] to-[#fff1c2] px-6 py-8 text-center">
            <div className="flex justify-center">
              <LouisAvatar mood="stareyes" size={72} />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-[#2b3550]">Hey Jessica</h2>
            <p className="mt-3 text-base leading-7 text-[#5b6480]">
              You have been awarded <span className="font-bold text-[#1f2937]">1000 bonus points</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.localStorage.setItem(JESSICA_BONUS_POPUP_KEY, "1");
                }
                setShowJessicaBonusModal(false);
              }}
              className="mt-6 inline-flex rounded-full bg-[#7aa7df] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f93d3]"
            >
              Close
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={showZorianRestorationModal}
        onClose={() => {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(ZORIAN_RESTORATION_POPUP_KEY, "1");
          }
          setShowZorianRestorationModal(false);
        }}
        backdropColor="bg-black/50"
      >
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#eef7ff] via-[#fffdf4] to-[#e8f5ec] px-6 py-8 text-center">
            <div className="flex justify-center">
              <LouisAvatar mood="hands" size={76} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#5f86bd]">
              Account Restored
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#2b3550]">Hey Zorian</h2>
            <p className="mt-3 text-base font-semibold leading-7 text-[#355487]">
              We are sorry you had trouble logging in.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5b6480]">
              Your streak has been restored, and we added{" "}
              <span className="font-black text-[#1f2937]">1000 bonus XP</span>{" "}
              to thank you for hanging in there with us.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.localStorage.setItem(ZORIAN_RESTORATION_POPUP_KEY, "1");
                }
                setShowZorianRestorationModal(false);
              }}
              className="mt-6 inline-flex rounded-full bg-[#7aa7df] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f93d3]"
            >
              Thank you
            </button>
          </div>
        </div>
      </ModalShell>

      {showLevelInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">How Levels Work in Bible Buddy</h2>
                <button
                  onClick={() => setShowLevelInfoModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6 text-gray-700">
                {isLoadingLevel ? (
                  <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Loading your latest level points...</p>
                  </div>
                ) : levelInfo ? (
                  <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-500">
                          Your Level
                        </p>
                        <h3 className="mt-1 text-2xl font-bold text-gray-900">
                          Level {levelInfo.level} Bible Buddy
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {levelInfo.totalPoints.toLocaleString()} total points
                        </p>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
                        {Math.round(levelInfo.progressPercent)}%
                      </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-full bg-blue-100">
                      <div
                        className="h-3 rounded-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${Math.max(0, Math.min(100, levelInfo.progressPercent))}%` }}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                      <p className="font-medium text-gray-700">
                        {levelInfo.pointsToNextLevel > 0
                          ? `${levelInfo.pointsToNextLevel.toLocaleString()} points until Level ${levelInfo.level + 1}`
                          : "You are at the top level right now."}
                      </p>
                      <p className="text-gray-500">
                        {levelInfo.levelStart.toLocaleString()}
                        {" - "}
                        {levelInfo.levelEnd.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : null}

                <p className="text-base leading-relaxed">
                  Bible Buddy isn't about competing with other people.
                  <br />
                  It's about understanding the Bible deeply, one step at a time, and being rewarded for showing up consistently.
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">What Counts as Progress?</h3>
                  <p className="mb-2">You earn weighted points across Bible Buddy, such as:</p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>📖 Finishing a Bible chapter, Bible study task, or reading plan chapter</li>
                    <li>🧠 Learning people, places, keywords, and taking notes</li>
                    <li>👥 Posting in the group, commenting, and joining community activity</li>
                    <li>❤️ Liking posts or comments, and earning likes from other Buddies</li>
                    <li>🔥 Keeping your streak alive by logging in each day</li>
                    <li>🎯 Trivia, study opens, highlights, and other meaningful app actions</li>
                  </ul>
                  <p className="mt-3 text-sm">Bigger study actions are worth more points than lighter actions like likes.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">How Points Work</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Higher-point actions</p>
                      <p>Finishing chapters, completing Bible studies, reading plans, learning references, and creating notes carry the most weight.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Mid-point actions</p>
                      <p>Posting in the study group, replying to people, opening studies, and community participation all help you level up too.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Lower-point actions</p>
                      <p>Likes still count, but they are worth less than finishing a real study action like a chapter or Bible study task.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Earned engagement counts too</p>
                      <p>If other Buddies like your posts or comments, that also gives you points because your activity is helping the community.</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                      <p className="font-semibold text-gray-900">Streak bonus points</p>
                      <p>
                        Every day you log in on a streak, you get bonus level points equal to that streak day.
                        Day 1 gives you 1 bonus point. Day 10 gives you 10 bonus points. Day 45 gives you 45 bonus points.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Why Levels Exist</h3>
                  <p className="mb-2">Levels help you:</p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>• See your personal growth over time</li>
                    <li>• Stay encouraged</li>
                    <li>• Build a deeper understanding of Scripture</li>
                  </ul>
                  <div className="mt-3 space-y-1 text-sm">
                    <p>❌ No leaderboards</p>
                    <p>❌ No competition</p>
                    <p>✅ Just your journey with God</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Bible Buddy Levels</h3>
                  <div className="space-y-3">
                    {LEVEL_DEFINITIONS.map((definition) => (
                      <div key={definition.level} className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-semibold text-gray-900">
                          Level {definition.level} Bible Buddy
                          {" "}
                          <span className="text-xs font-medium text-gray-500">
                            ({definition.minPoints.toLocaleString()} to {definition.maxPoints !== null ? definition.maxPoints.toLocaleString() : `${definition.minPoints.toLocaleString()}+`} pts)
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Final Encouragement</p>
                  <p className="text-sm text-blue-800">
                    There's no rush.
                    <br />
                    The goal isn't to finish fast - it's to understand deeply.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setShowLevelInfoModal(false)}
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showStreakBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white">
            <div className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Streak Badge</h2>
                <button
                  onClick={() => setShowStreakBadgeModal(false)}
                  className="text-2xl font-bold text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                  <span
                    className={`text-3xl ${(profile?.current_streak ?? 0) >= 30 ? "" : "grayscale opacity-60"}`}
                    aria-hidden="true"
                  >
                    🔥
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{profile?.current_streak ?? 0} Day Streak</p>
                    <p className="text-sm text-gray-600">
                      {profile?.current_streak ?? 0 >= 30 ? "You earned the fire badge." : "Keep logging in daily to unlock the fire badge."}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-7">
                  This is the streak badge. Hit <span className="font-semibold">30 days in a row</span> of logging in and you earn it.
                </p>

                <p className="text-sm leading-7">
                  Before 30 days, the fire stays gray. Once you reach 30 straight days, the badge turns fully active.
                </p>

                <p className="text-sm leading-7">
                  Your streak also gives you extra level points every day you keep it alive, so showing up daily helps you grow faster.
                </p>

                <button
                  onClick={() => setShowStreakBadgeModal(false)}
                  className="w-full rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTourKey && TOUR_COPY[activeTourKey] ? (
        <FeatureTourModal
          isOpen={true}
          title={TOUR_COPY[activeTourKey].title}
          body={TOUR_COPY[activeTourKey].body}
          content={activeTourKey === "dashboard" ? DASHBOARD_TOUR_CONTENT : undefined}
          primaryButtonText="I understand"
          variant="default"
          anchorRect={null}
          canAdvance={true}
          closeOnBackdrop={true}
          isSaving={isSavingFeatureTour}
          onClose={handleTourClose}
          onUnderstand={handleTourUnderstand}
        />
      ) : null}


    </div>
    </>
  );
}


