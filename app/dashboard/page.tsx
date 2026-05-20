
"use client";
export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
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
import StreakFlameEmoji from "../../components/StreakFlameEmoji";
import { ModalShell } from "../../components/ModalShell";
import { triggerPoints } from "../../components/PointsPop";

import AdSlot from "../../components/AdSlot";
import { useFeatureRenderPriority } from "../../components/FeatureRenderPriorityContext";
import { ACTION_TYPE } from "../../lib/actionTypes";
import DashboardJourneyExperience from "../../components/DashboardJourneyExperience";
import {
  buildPersistedFeatureTours,
  DEFAULT_FEATURE_TOURS,
  normalizeFeatureTours,
  type FeatureTourKey,
  type FeatureToursState,
} from "../../lib/featureTours";
import { LEVEL_DEFINITIONS, calculateWeightedPoints, getLevelInfoWithLevelFloor } from "../../lib/levelSystem";
import { TASK_XP, DIAMOND_REWARDS, estimateDiamondStashFromActions } from "../../lib/progressionRewards";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";
import { trackUserActivity } from "../../lib/trackUserActivity";
import { awardDiamonds } from "../../lib/diamondWallet";
import { applyAppThemeToDocument, APP_THEME_STORAGE_KEY, getAppTheme, normalizeAppThemeId, type AppThemeId } from "../../lib/appThemes";
import {
  BOOST_STORE_ITEMS,
  BUDDY_STORE_ITEMS,
  PREMIUM_SKIN_STORE_ITEMS,
  STREAK_FLAME_STORE_ITEMS,
  THEME_STORE_ITEMS,
  type BibleBuddyStoreItem,
} from "../../lib/bibleBuddyStore";
import {
  applyPremiumSkinToDocument,
  cachePremiumSkinForUser,
  clearLegacyPremiumSkinCache,
  formatPremiumSkinLockRemaining,
  getPremiumSkinLockRemainingMs,
  getPremiumSkinForLegacyFlame,
  getPremiumSkinForLegacyTheme,
  getPremiumSkin,
  normalizePremiumSkinId,
  readCachedPremiumSkin,
  type PremiumSkinId,
} from "../../lib/premiumSkins";
import {
  preloadActiveSkinAssets,
  preloadImage,
  preloadStoreSkinThumbnails,
  readPerformanceCache,
  scheduleIdleWork,
  writePerformanceCache,
} from "../../lib/appPerformance";
import { ACTIVE_STREAK_FLAME_STORAGE_KEY, getPremiumSkinFlameId, normalizeFlameCosmeticId, persistActiveStreakFlame } from "../../lib/flameCosmetics";
import {
  SELECTED_BUDDY_STORAGE_KEY,
  getBuddyAvatar,
  getBuddyPurchasePopupBody,
  getBuddySelectionPopupCopy,
  normalizeBuddyAvatarId,
  type BuddyAvatarId,
} from "../../lib/buddyAvatars";
import { getActivePopupFromQueue, markPopupShown, POPUP_QUEUE_PRIORITIES, type PopupQueueItem } from "../../lib/popupQueue";
import {
  DEEP_STUDY_DIAMONDS_PER_MINUTE,
  buildEmptyTaskBreakdown,
  getDeepStudyDailyStats,
  getDeepStudyHistoryKey,
  getDeepStudyLocalDayKey,
  getDeepStudyMultiplier,
  getDeepStudyRank,
  getDeepStudyStreak,
  loadDeepStudyHistory,
  saveDeepStudySession,
  type DeepStudySessionSummary,
  type DeepStudyTaskKind,
} from "../../lib/deepStudy";

function getLocalSkinLockedFlameId() {
  if (typeof window === "undefined") return null;
  const skinId = normalizePremiumSkinId(document.documentElement.dataset.bbSkin);
  return getPremiumSkinFlameId(skinId);
}

const JESSICA_BONUS_USER_ID = "66c16399-092a-43c0-96c0-e4de78c0debc";
const JESSICA_BONUS_ACTION_LABEL = "admin_bonus_points:8297:jessica-level-11-halfway-restoration-may-2026";
const JESSICA_BONUS_POPUP_KEY = "bb:bonus-popup:jessica-level-11-restored:v1";
const ZORIAN_USER_ID = "6ffe9dd2-884b-4a6b-8096-e9418dd56232";
const ZORIAN_RESTORATION_ACTION_LABEL = "admin_bonus_points:1000:zorian-login-restoration-may-2026";
const ZORIAN_RESTORATION_POPUP_KEY = "bb:bonus-popup:zorian-login-restoration-1000:v1";
const ENABLE_DAILY_DASHBOARD_WELCOME_FLOW = true;
const DASHBOARD_LOUIS_CHECKIN_COOLDOWN_MS = 60 * 60 * 1000;
const DAILY_TASK_SUMMARY_TIMEOUT_MS = 10000;
const MAX_BADGE_POPUPS_PER_SESSION = 3;
const MYSTERY_PRIZE_REWARDS = [100, 150, 200, 250, 300, 400, 500];
const DAILY_LOGIN_GIFT_MIN_DELAY_MS = 60 * 60 * 1000;
const BUDDY_SELECTION_DASHBOARD_HANDOFF_KEY = "bb:buddy-selection-dashboard-handoff";

const MATTHEW_CHAPTERS = 28;
const TOTAL_ITEMS = MATTHEW_CHAPTERS + 1; // overview + 28 chapters

function rollMysteryPrizeReward() {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    return MYSTERY_PRIZE_REWARDS[randomValues[0] % MYSTERY_PRIZE_REWARDS.length];
  }
  return MYSTERY_PRIZE_REWARDS[Math.floor(Math.random() * MYSTERY_PRIZE_REWARDS.length)];
}

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

type StorePurchaseRow = {
  id: string;
  item_id: string;
  item_kind: string;
  item_title: string;
  price_diamonds: number;
  created_at?: string | null;
};

type BadgePopupSeenRow = {
  badge_id: string;
};

type MysteryPrizeReveal = {
  status: "closed" | "opening" | "opened";
  reward: number;
};

type DailyLoginGiftReveal = {
  status: "closed" | "opening" | "opened";
  reward: number;
};

type ModeratorWeeklyPayoutReveal = {
  id: string;
  amount: number;
  paidAt: string;
  weekStart: string;
  kind?: "weekly" | "skin_bonus";
};

type StorePurchaseCongrats = {
  item: BibleBuddyStoreItem;
};

type SkinApplyPrompt = {
  item: BibleBuddyStoreItem;
};

type SkinAppliedCongrats = {
  skinName: string;
};

type StorePromoKind = "buddies" | "diamonds";
type DailyPopupStep = "streak" | "share_howto" | "mystery" | "invite_howto" | "store_buddies" | "bible_tip" | "store_diamonds";
type DeepStudyModeState = "idle" | "setup" | "active" | "complete" | "results" | "info";

type DeepStudyActiveSession = {
  id: string;
  plannedMinutes: number;
  shareDisplayMinutes?: number;
  startedAt: number;
  endsAt: number;
  lastTickAt: number;
  activeMs: number;
  awayMs: number;
  visibleMs: number;
  interruptions: number;
  interactions: number;
  lastInteractionAt: number;
  tasksCompleted: number;
  taskBreakdown: Record<DeepStudyTaskKind, number>;
  chaptersStudied: string[];
};

type DashboardLouisNudge = {
  id: string;
  category?: "progress" | "discovery" | "habit" | "bible_fact" | "share";
  eyebrow: string;
  title: string;
  lineOne: string;
  lineTwo: string;
  buttonText: string;
  action: "daily-tasks" | "route" | "dismiss" | "share-tab";
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
    tile: "border-[var(--bb-accent,#8fc7ee)] bg-[var(--bb-accent-soft,#eaf5ff)] text-[var(--bb-text-primary,#123c63)]",
    progress: "bg-[#7BAFD4]",
    glow: "shadow-[0_10px_28px_rgba(123,175,212,0.32)]",
  },
  gold: {
    tile: "border-[#ffd36a] bg-[#fff7df] text-[#4c3100]",
    progress: "bg-[#f3bd3e]",
    glow: "shadow-[0_10px_28px_rgba(242,178,51,0.3)]",
  },
  green: {
    tile: "border-[#9fe6b8] bg-[#e9fbef] text-[#0e4829]",
    progress: "bg-[#35c46f]",
    glow: "shadow-[0_10px_28px_rgba(52,195,111,0.28)]",
  },
  pink: {
    tile: "border-[#ffc0d6] bg-[#fff0f6] text-[#651536]",
    progress: "bg-[#f46fa0]",
    glow: "shadow-[0_10px_28px_rgba(244,111,160,0.28)]",
  },
  purple: {
    tile: "border-[#d8c1ff] bg-[#f4edff] text-[#35156d]",
    progress: "bg-[#9b6cf4]",
    glow: "shadow-[0_10px_28px_rgba(155,108,244,0.28)]",
  },
  red: {
    tile: "border-[#ffb2a7] bg-[#fff0ee] text-[#651a14]",
    progress: "bg-[#f45b4c]",
    glow: "shadow-[0_10px_28px_rgba(244,91,76,0.26)]",
  },
  teal: {
    tile: "border-[#99eadc] bg-[#e9fffa] text-[#0c4d44]",
    progress: "bg-[#26bca5]",
    glow: "shadow-[0_10px_28px_rgba(38,188,165,0.26)]",
  },
  slate: {
    tile: "border-[#cbd5e1] bg-[#f8fafc] text-[#1f2937]",
    progress: "bg-[#64748b]",
    glow: "shadow-[0_10px_28px_rgba(100,116,139,0.2)]",
  },
};

const BADGE_TONE_ACCENTS: Record<BadgeTone, string> = {
  blue: "#7BAFD4",
  gold: "#f3bd3e",
  green: "#35c46f",
  pink: "#f46fa0",
  purple: "#9b6cf4",
  red: "#f45b4c",
  teal: "#26bca5",
  slate: "#64748b",
};

function getBadgeAwardLabel(badge: Pick<BadgeProgress, "id" | "xp">) {
  return `badge_earned:${badge.id}:${badge.xp}`;
}

function getLocalBadgeAwardKey(userId: string, badgeId: string) {
  return `bb:badge-awarded:${userId}:${badgeId}`;
}

function getLocalBadgePopupSeenKey(userId: string, badgeId: string) {
  return `bb:badge-popup-seen:${userId}:${badgeId}`;
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
  // Gospels & Acts
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
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

function getDashboardStreakHeadline(streak: number) {
  const safeStreak = Math.max(1, Math.floor(streak || 1));
  const dayKey = getBibleBuddyLocalDayKey();
  const [year, month, day] = dayKey.split("-").map(Number);
  const dayIndex = Math.floor(Date.UTC(year, month - 1, day) / 86400000);
  const phrases = [
    "studying the Bible",
    "reading His Word",
    "digging into Scripture",
    "walking through the Bible",
    "opening Scripture",
    "growing in the Word",
    "meeting God in Scripture",
    "building a Bible habit",
  ];
  return `${safeStreak} ${safeStreak === 1 ? "day" : "days"} ${phrases[Math.abs(dayIndex) % phrases.length]}`;
}

function formatDeepStudyTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function darkenHexColor(hex: string, amount = 0.28) {
  const cleaned = hex.replace("#", "").trim();
  if (!/^[0-9a-f]{6}$/i.test(cleaned)) return "#1f2937";
  const channels = [0, 2, 4].map((index) => parseInt(cleaned.slice(index, index + 2), 16));
  const next = channels
    .map((channel) => Math.max(0, Math.min(255, Math.round(channel * (1 - amount)))))
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("");
  return `#${next}`;
}

function normalizeDeepStudyTaskKind(kind: string | null | undefined): DeepStudyTaskKind | null {
  if (kind === "devotional" || kind === "reading" || kind === "notes" || kind === "trivia" || kind === "scrambled" || kind === "reflection") {
    return kind;
  }
  return null;
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
  if (title === "The Flood of Noah") return "/Floodofnoah.png";
  if (title === "The Obedience of Abraham") return "/TheobedienceofAbraham.png";
  if (title === "The Promise Through Isaac") return "/ThePromiseThroughIsaac.png";
  if (title === "The Wrestling of Jacob") return "/TheWrestlingofJacob.png";
  if (title === "The Rise of Esther") return "/theriseofester.png";
  if (title === "The Courage of Daniel") return "/thecourageofdaniel.png";
  if (title === "The Testing of Joseph") return "/TheTestingofJospehnewcover.png";
  if (title === "The Deliverance of Moses") return "/TheDeliveranceofMoses.png";
  if (title === "The Covenant at Sinai") return "/TheCovenantatSinai.png";
  if (title === "The Presence of God") return "/ThePresenceofGod.png";
  if (title === "Holiness Before God") return "/ThegolinessbeforeGod.png";
  if (title === "The Wilderness Journey") return "/Wildernessjourneycover.png";
  if (title === "The Rebellion in the Wilderness") return "/RebellionintheWilderness.png";
  if (title === "The Promised Land Ahead") return "/promieslandcover.png";
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
  if (title === "The Flood of Noah") return "Genesis 5-10: death, corruption, Noah, the flood, covenant, and nations.";
  if (title === "The Obedience of Abraham") return "Genesis 11-25: Abraham's call, waiting, covenant, testing, and legacy.";
  if (title === "The Promise Through Isaac") return "Genesis 26-27: Isaac, wells, favoritism, Jacob, Esau, deception, and blessing.";
  if (title === "The Wrestling of Jacob") return "Genesis 28-36: Bethel, Rachel, Leah, Laban, wrestling, Esau, renewal, and Edom.";
  if (title === "The Rise of Esther") return "Esther 1-10: palace pressure, courage, providence, and reversal.";
  if (title === "The Courage of Daniel") return "Daniel 1-6: exile, courage, wisdom, prayer, pressure, and faith.";
  if (title === "The Testing of Joseph") return "Genesis 37-50: betrayal, waiting, wisdom, forgiveness, and God's hidden plan.";
  if (title === "The Deliverance of Moses") return "Exodus 1-18: slavery, Moses' calling, plagues, Passover, the Red Sea, and wilderness provision.";
  if (title === "The Covenant at Sinai") return "Exodus 19-24: Mount Sinai, holiness, commandments, covenant, blood, and worship.";
  if (title === "The Presence of God") return "Exodus 25-40: tabernacle, priesthood, intercession, covenant mercy, and God's glory.";
  if (title === "Holiness Before God") return "Leviticus 1-27: sacrifice, priesthood, atonement, holy living, feasts, and covenant faithfulness.";
  if (title === "The Wilderness Journey") return "Numbers 1-14: ordered camp, wilderness guidance, priestly blessing, complaint, spies, fear, and faith.";
  if (title === "The Rebellion in the Wilderness") return "Numbers 15-25: rebellion, holiness, priesthood, judgment, mercy, Balaam, blessing, and compromise.";
  if (title === "The Promised Land Ahead") return "Numbers 26-36: new generation, inheritance, Joshua, offerings, vows, justice, refuge, and promised land preparation.";
  if (title === "The Wisdom of Proverbs") return "Chapter-by-chapter wisdom for speech, choices, discipline, and daily life.";
  return "Guided Bible study with reading, notes, trivia, and reflection.";
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
  const [showBibleProgressPanel, setShowBibleProgressPanel] = useState(false);
  const [bibleBrowserSelectedBook, setBibleBrowserSelectedBook] = useState<string | null>(null);
  const [bibleBrowserAlphabetical, setBibleBrowserAlphabetical] = useState(false);
  const [bibleBrowserReading, setBibleBrowserReading] = useState<{ book: string; chapter: number } | null>(null);
  const bibleProgressPanelRef = useRef<HTMLElement | null>(null);
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
  const [seenBadgePopupIds, setSeenBadgePopupIds] = useState<Set<string>>(new Set());
  const [badgePopupSeenLoaded, setBadgePopupSeenLoaded] = useState(false);
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
  const dailyTaskRefreshLastRunRef = useRef(0);
  const [dailyTaskTimeLeftLabel, setDailyTaskTimeLeftLabel] = useState<string | null>(null);
  const [motivationalMessage, setMotivationalMessage] = useState<string>("");
  const [proExpiresAt, setProExpiresAt] = useState<string | null>(null);
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [mobileAdDismissed, setMobileAdDismissed] = useState<boolean>(false);
  const [levelRefreshTick, setLevelRefreshTick] = useState(0);
  const [profile, setProfile] = useState<{ is_paid: boolean | null; daily_credits: number | null; last_active_date: string | null; verse_of_the_day_shown?: string | null; current_streak?: number | null; grace_days_count?: number | null; diamonds_count?: number | null; selected_streak_flame?: string | null; selected_buddy_avatar?: string | null; active_premium_skin?: string | null; active_premium_skin_selected_at?: string | null; daily_login_gift_last_visit_at?: string | null; daily_login_gift_last_shown_date?: string | null; profile_image_url?: string | null; display_name?: string | null; username?: string | null; created_at?: string | null } | null>(null);
  const [buddySelectionWelcome, setBuddySelectionWelcome] = useState<{ buddyId: BuddyAvatarId; buddyName: string } | null>(null);
  const [showDiamondStore, setShowDiamondStore] = useState(false);
  const [storePurchases, setStorePurchases] = useState<StorePurchaseRow[]>([]);
  const [activePremiumSkinId, setActivePremiumSkinId] = useState<PremiumSkinId>("none");
  const [dashboardThemeId, setDashboardThemeId] = useState<AppThemeId>(() => (
    typeof window === "undefined"
      ? "light"
      : normalizeAppThemeId(window.localStorage.getItem(APP_THEME_STORAGE_KEY) || window.localStorage.getItem("bb:dashboard-theme"))
  ));
  const [storeLoading, setStoreLoading] = useState(false);
  const [storeBuyingId, setStoreBuyingId] = useState<string | null>(null);
  const [storeMessage, setStoreMessage] = useState<string | null>(null);
  const [storePurchaseCongrats, setStorePurchaseCongrats] = useState<StorePurchaseCongrats | null>(null);
  const [skinApplyPrompt, setSkinApplyPrompt] = useState<SkinApplyPrompt | null>(null);
  const [skinAppliedCongrats, setSkinAppliedCongrats] = useState<SkinAppliedCongrats | null>(null);
  const [activeStorePromo, setActiveStorePromo] = useState<StorePromoKind | null>(null);
  const [mysteryPrizeReveal, setMysteryPrizeReveal] = useState<MysteryPrizeReveal | null>(null);
  const mysteryPrizeAwardingRef = useRef(false);
  const [dailyLoginGiftReveal, setDailyLoginGiftReveal] = useState<DailyLoginGiftReveal | null>(null);
  const dailyLoginGiftAwardingRef = useRef(false);
  const dailyLoginGiftCheckRef = useRef<string | null>(null);
  const [moderatorWeeklyPayoutReveal, setModeratorWeeklyPayoutReveal] = useState<ModeratorWeeklyPayoutReveal | null>(null);
  const moderatorWeeklyPayoutCheckRef = useRef<string | null>(null);
  const [deepStudyMode, setDeepStudyMode] = useState<DeepStudyModeState>("idle");
  const [deepStudySelectedMinutes, setDeepStudySelectedMinutes] = useState(5);
  const [deepStudyActiveSession, setDeepStudyActiveSession] = useState<DeepStudyActiveSession | null>(null);
  const [deepStudyResults, setDeepStudyResults] = useState<DeepStudySessionSummary | null>(null);
  const [deepStudyHistory, setDeepStudyHistory] = useState<DeepStudySessionSummary[]>([]);
  const [deepStudyShareBusy, setDeepStudyShareBusy] = useState(false);
  const [showDeepStudyUpgradeModal, setShowDeepStudyUpgradeModal] = useState(false);
  const [deepStudyNow, setDeepStudyNow] = useState(Date.now());
  const deepStudyFinalizingRef = useRef(false);
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
  const [badgePopupsShownThisSession, setBadgePopupsShownThisSession] = useState(0);

  const dashboardStatsCacheKey = userId ? `bb:dashboard-stats-cache:${userId}` : null;
  const storePurchasesCacheKey = userId ? `store-purchases:${userId}` : null;

  const prefetchChecklistRoutes = useCallback((checklistData: ChecklistData) => {
    scheduleIdleWork(() => {
      const likelyRoutes = checklistData.tasks
        .filter((task) => !task.done && task.href)
        .map((task) => task.href as string)
        .slice(0, 4);

      if (checklistData.nextJourneyTarget) {
        likelyRoutes.push(`/bible-studies/${checklistData.nextJourneyTarget.devotionalId}/day/${checklistData.nextJourneyTarget.dayNumber}`);
      }

      Array.from(new Set(likelyRoutes)).forEach((href) => {
        try {
          router.prefetch(href);
        } catch {
          // Prefetch is an optimization only; navigation still works without it.
        }
      });
    }, 1600);
  }, [router]);

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

  function getDailyLoginGiftLastVisitKey(currentUserId: string) {
    return `bb:daily-login-gift:last-visit:${currentUserId}`;
  }

  function getDailyLoginGiftShownKey(currentUserId: string, dayKey: string) {
    return `bb:daily-login-gift:shown:${currentUserId}:${dayKey}`;
  }

  function getDailyLoginGiftFirstUseKey(currentUserId: string, dayKey: string) {
    return `bb:daily-login-gift:first-use:${currentUserId}:${dayKey}`;
  }

  function getDailyPopupStepKey(currentUserId: string, dayKey: string) {
    return `bb:daily-popup-step:${currentUserId}:${dayKey}`;
  }

  function getDailyPopupLastShownKey(currentUserId: string, dayKey: string) {
    return `bb:daily-popup-last-shown:${currentUserId}:${dayKey}`;
  }

  function getDailyPopupSessionKey(currentUserId: string, dayKey: string) {
    return `bb:daily-popup-session:${currentUserId}:${dayKey}`;
  }

  function getDailyPopupStep(index: number): DailyPopupStep {
    const steps: DailyPopupStep[] = ["streak", "share_howto", "mystery", "invite_howto", "store_buddies", "bible_tip", "store_diamonds"];
    return steps[Math.abs(index) % steps.length];
  }

  function getDashboardLouisNudgeRotationKey(currentUserId: string, dayKey: string) {
    return `bb:louis-dashboard-nudge-rotation:${currentUserId}:${dayKey}`;
  }

  function getBibleTipPopupRotationKey(currentUserId: string) {
    return `bb:bible-tip-popup-rotation:${currentUserId}`;
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
    const selectedBuddyName = getBuddyAvatar(normalizeBuddyAvatarId(profile?.selected_buddy_avatar)).name;
    const pool: DashboardLouisNudge[] = [
      {
        id: "how-to-share-bible-buddy",
        category: "share",
        eyebrow: "Share Bible Buddy",
        title: "How to share Bible Buddy",
        lineOne: "Scroll the bottom dashboard menu until you see Share, then tap it to open your invite page.",
        lineTwo: "Use your special invite link so Bible Buddy can track real signups and credit your rewards.",
        buttonText: "Show Share Tab",
        action: "share-tab",
      },
      {
        id: "how-to-invite-bible-buddies",
        category: "share",
        eyebrow: "Invite Bible Buddies",
        title: "How to invite Bible Buddies",
        lineOne: "Open the Share tab, send your invite link by text, WhatsApp, email, or copy it for anywhere else.",
        lineTwo: "When someone signs up from your link, they appear in your signup log and you can receive XP and diamonds.",
        buttonText: "Open Share",
        action: "share-tab",
      },
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

    const compactCheckIn = buildCompactDashboardCheckIn(dailyChecklistData, userName);
    pool.push(
      {
        id: "progress-current-study",
        category: "progress",
        eyebrow: "Progress Check",
        title: dailyChecklistData?.allDone ? "Chapter wrapped" : "Your chapter is waiting",
        lineOne: dailyChecklistData?.allDone ? "You finished every task for this chapter. That is real Bible habit work." : compactCheckIn.mainLine,
        lineTwo: dailyChecklistData?.allDone ? "When you are ready, start the next chapter and keep the story moving." : compactCheckIn.helperLine,
        buttonText: dailyChecklistData?.allDone ? "Review Tasks" : "Keep Going",
        action: "daily-tasks",
      },
      {
        id: "progress-xp-next-level",
        category: "progress",
        eyebrow: "XP Progress",
        title: levelInfo ? `${levelInfo.pointsToNextLevel} XP to go` : "XP is stacking",
        lineOne: levelInfo ? `You are level ${levelInfo.level}. Every Bible task pushes you closer to the next level.` : "Every Bible task helps your level move forward.",
        lineTwo: "Small wins count here. Intro, reading, notes, trivia, and reflection all build momentum.",
        buttonText: "Keep Building",
        action: "daily-tasks",
      },
      {
        id: "progress-diamonds",
        category: "progress",
        eyebrow: "Diamond Stash",
        title: `${Math.max(0, Number(profile?.diamonds_count ?? 0))} diamonds saved`,
        lineOne: "Diamonds are your reward currency. You earn them by finishing real Bible study work.",
        lineTwo: "Stack enough and you can unlock themes, flames, boosts, and future Bible Buddies.",
        buttonText: "Open Store",
        action: "dismiss",
      },
    );

    [
      ["discovery-store", "Your diamonds have a purpose", "Tap your diamond card to open the Bible Buddy Store.", "Themes, flames, boosts, and Bible Buddies live there as unlocks."],
      ["discovery-bible-studies", "Bible Studies are the main path", "Bible Buddy is built around chapter studies, not random devotionals.", "Pick the next chapter and follow the five-task rhythm."],
      ["discovery-search-by-book", "Search by Bible book", "Inside Bible Studies, you can search by book and load a chapter onto your dashboard.", "It is the fast way to jump to a specific chapter."],
      ["discovery-keywords", "Tap the underlined words", "People, places, and keywords can open a quick meaning card while you read.", "That helps the Bible feel less confusing in the moment."],
      ["discovery-lil-louis", `${selectedBuddyName} knows your study`, `Use the ${selectedBuddyName} tab when you want help with your current chapter or next task.`, "Your Bible Buddy is built to guide the Bible habit first."],
      ["discovery-community", "Community is part of the habit", "The Community tab lets you share thoughts, ask questions, and encourage other Bible Buddies.", "One honest comment can help somebody else keep going."],
      ["discovery-games", "Games help it stick", "Trivia and Scrambled are not filler.", "They help you remember what you just studied."],
      ["discovery-tv", "Use TV when reading feels heavy", "Bible Buddy TV gives you a different way to keep learning.", "It is good for days when you need a lighter lane."],
      ["discovery-themes", "Themes make it yours", "Unlocked themes can change the whole app feel across your account.", "Buy one in the store, then switch it from settings."],
      ["discovery-flames", "Your streak flame can change", "Store flames let your dashboard fire match the style you unlock.", "It is a cosmetic reward for showing up."],
      ["discovery-badges", "Badges mark real wins", "Badges are earned from real actions like reading, notes, games, comments, and streaks.", "They are separate achievement celebrations."],
      ["discovery-reflection", "Reflection finishes the chapter", "The reflection question helps you turn reading into a response.", "It asks what the chapter is stirring in you."],
      ["discovery-notes", "Deep notes slow the chapter down", "Chapter notes explain context, culture, meaning, and key verses.", "Use them before trivia so the details are fresh."],
      ["discovery-progress-card", "The progress card tells the truth", "Your dashboard shows what chapter you are on and how many tasks are done.", "If you are unsure what to do next, start there."],
      ["discovery-paid-flex", "Pro gives freer movement", "Free users follow the task order. Pro users can move through cards more freely.", "The structure still helps, but Pro gives more control."],
      ["discovery-profile", "Your profile tells your story", "Your name, picture, level, badges, and streak help the community feel real.", "A complete profile makes Bible Buddy feel personal."],
      ["discovery-chapter-order", "The story is ordered", "Bible Studies walk through Scripture like a connected story.", "Creation, Fall, Noah, Abraham, Jacob, Joseph, Moses, Sinai."],
      ["discovery-completed-tasks", "Completed tasks can reopen", "When a task is done, you can still reopen it from completed tasks.", "That lets you review anytime."],
      ["discovery-study-dashboard", "The dashboard is your study home", "When you choose a chapter, it loads into the study dashboard.", "Open, continue, finish, celebrate."],
      ["discovery-perfect-trivia", "Perfect trivia matters", "Perfect trivia rounds can become part of future streaks and rewards.", "It gives you a reason to read carefully."],
    ].forEach(([id, title, lineOne, lineTwo]) => pool.push({ id, category: "discovery", eyebrow: "Discovery", title, lineOne, lineTwo, buttonText: "Got it", action: "dismiss" }));

    [
      ["study-task-dont-just-read", "Do not just read the chapter", "Study it with the Bible tasks.", "The intro, chapter, notes, trivia, and reflection work together so the chapter actually lands."],
      ["study-task-notes-make-sense", "Do not skip chapter notes", "That is where a lot of the chapter starts to make sense.", "The notes explain people, places, context, and meaning before you move on."],
      ["study-task-five-tasks", "Do all 5 tasks", "The five-task chapter flow is built to help you really understand.", "Reading starts the chapter, but review and reflection help it stay with you."],
      ["study-task-intro-first", "Start with the intro", "The intro gives you the map before you walk into the chapter.", "A little context can make the whole reading feel clearer."],
      ["study-task-read-then-notes", "Read, then study", "Read the chapter first, then let the notes slow it down.", "That order helps you see the Bible itself before the explanation."],
      ["study-task-trivia-review", "Trivia is review", "Trivia is not just a game.", "It checks what stuck after the chapter and shows what you may want to revisit."],
      ["study-task-scrambled-memory", "Scrambled helps memory", "Word games train your attention after you read.", "That makes names, themes, and Bible ideas easier to remember."],
      ["study-task-reflect-last", "Finish with reflection", "Reflection is where the study becomes personal.", "Ask what God is showing you and what one response should look like today."],
      ["study-task-one-chapter", "One chapter is enough", "You do not have to rush through a lot of Bible at once.", "One chapter studied well can build more than five chapters skimmed fast."],
      ["study-task-current-card", "Use the current study card", "Your current study card tells you exactly where to continue.", "If you feel lost, start there."],
      ["study-task-progress", "Watch the task count", "The task count shows how much of the chapter study is done.", "Try to close the loop before jumping to something new."],
      ["study-task-dont-wander", "Do not wander today", "Pick the next study task and stay with it.", "Structure helps when your brain wants to bounce around."],
      ["study-task-chapter-context", "Context matters", "A chapter makes more sense when you know what came before it.", "That is why the studies move like a story, not random pieces."],
      ["study-task-review-before-next", "Review before the next chapter", "Before moving forward, check the notes or games once more.", "A quick review makes the next chapter easier to understand."],
      ["study-task-small-win", "Grab the next small win", "Even one Bible task is progress.", "Open the next card, finish it, and let that count."],
      ["study-task-read-carefully", "Read carefully, not quickly", "The goal is not to beat the app.", "The goal is to understand what Scripture is saying."],
      ["study-task-notes-before-games", "Notes before games", "The games work better after chapter notes.", "You will remember more because the details have already been explained."],
      ["study-task-finish-loop", "Close the study loop", "Reading, notes, review, and reflection all have a job.", "Together they turn a chapter into a real study session."],
      ["study-task-questions", "Bring your questions", "If something confuses you, that is not a problem.", "Use the notes, Buddy help, and community to work through it."],
      ["study-task-understanding", "Understanding grows slowly", "Some chapters make sense piece by piece.", "Keep showing up, and the connections start to build."],
      ["feature-community-world", "Study with Bible Buddies around the world", "Community is where you can post, ask, pray, and encourage.", "You are not the only one trying to stay consistent."],
      ["feature-community-check", "Have you checked Community?", "The Community tab is for Bible thoughts, questions, prayer, and encouragement.", "A simple comment can help somebody keep going."],
      ["feature-share-notes", "Share what stood out", "You do not need a perfect post.", "Share one line from your study and let the community grow around Scripture."],
      ["feature-buddy-switch", "Pick the Buddy that helps you", "Your Bible Buddy can match the kind of encouragement you need.", "Change your Buddy in settings when you want a different feel."],
      ["feature-store-customize", "Use diamonds for customization", "Diamonds are there so consistency can unlock something fun.", "Themes, flames, Buddies, and boosts make the app feel more personal."],
      ["feature-tv-visual", "Try Bible Buddy TV", "Some days visual learning helps the Bible click.", "Use TV when you want to keep learning but need a different lane."],
      ["feature-games-retention", "Use games after reading", "Games help you remember what you studied.", "They are best after the chapter and notes."],
      ["feature-profile-progress", "Your profile shows your rhythm", "Levels, XP, badges, and streaks show the story of your consistency.", "Small daily actions become visible over time."],
      ["feature-progress-bible", "Tap Bible Progress", "Bible Progress lets you open books and chapters again.", "Use it when you want to review or continue through Scripture."],
      ["feature-dashboard-home", "Dashboard is home base", "Your dashboard gathers the chapter, tasks, streak, rewards, and Buddy.", "When you do not know where to go, go home and continue the next task."],
      ["habit-open-first", "Open before you feel ready", "Most habits start before motivation shows up.", "Open the chapter first. The feeling usually follows the first small step."],
      ["habit-two-minutes", "Two minutes still counts", "If the day is packed, do the chapter intro and keep the rhythm alive.", "Short faithful moments are better than waiting for perfect time."],
      ["habit-dont-rush", "Do not rush the chapter", "The goal is not speed. The goal is understanding and consistency.", "Move through the five tasks like reps, not like a race."],
      ["habit-one-task", "One task breaks the wall", "When you do not feel like studying, finish only the next task.", "One card completed often turns into real momentum."],
      ["habit-streak-mercy", "Consistency needs grace", "A streak is a tool, not a chain.", "Show up honestly, and use Grace Days when life gets loud."],
      ["habit-same-place", "Use the same place", "Opening Bible Buddy from the same spot each day trains your brain.", "The easier the start, the stronger the habit."],
      ["habit-after-breakfast", "Attach it to a real moment", "Bible habits grow faster when they attach to something you already do.", "Try after breakfast, bedtime, or right after work."],
      ["habit-before-scroll", "Scripture before scrolling", "Give God the first few focused minutes before the noise gets loud.", "Even one chapter task can reset the direction of the day."],
      ["habit-review-notes", "Review before moving on", "A quick notes review makes the chapter easier to remember later.", "Understanding grows when you return to what you just read."],
      ["habit-say-it-out-loud", "Say one line out loud", "Reading one verse out loud can slow your mind down.", "It turns the chapter from screen text into something you hear."],
      ["habit-question", "Ask one better question", "Try asking: What does this show about God?", "One strong question can open a chapter more than ten rushed answers."],
      ["habit-trivia-after-notes", "Notes before trivia", "Play trivia after the notes so your memory has something to grab.", "That makes the game feel fair and helps the chapter stick."],
      ["habit-finish-loop", "Close the loop", "The reflection task finishes the chapter loop.", "It turns information into a response from your own heart."],
      ["habit-missed-day", "Missed days are not the end", "A missed day is not failure. It is just the next place to restart.", "Come back simple. Open the next task and keep moving."],
      ["habit-tiny-win", "Collect the tiny win", "Do the next card, earn the XP, and let that small win matter.", "Big Bible habits are built from small honest reps."],
      ["habit-community", "Share one sentence", "You do not need a perfect post to join the community.", "One honest sentence about the chapter can help somebody else."],
      ["habit-no-guilt", "No guilt loop", "Bible Buddy should pull you forward, not shame you backward.", "Start with the next task and let grace set the tone."],
      ["habit-keep-place", "Keep your place", "The current study card keeps your chapter ready for you.", "You do not have to remember where you left off. Just continue."],
      ["habit-pray-first", "Pray before the task", "Before reading, ask God to help you understand one true thing.", "That simple prayer can change how you read."],
      ["habit-stack-week", "Stack a week", "Seven honest check-ins can change how normal Bible study feels.", "Do today's piece. Let tomorrow worry about tomorrow."],
      ["tip-read-for-god", "Look for God first", "Before asking what the chapter says about you, ask what it shows about God.", "That keeps study from becoming only advice and helps you worship while you learn."],
      ["tip-underline-why", "Ask why the detail is there", "When a name, place, or repeated phrase shows up, slow down and ask why God included it.", "Small details often carry the meaning of the whole chapter."],
      ["tip-one-verse-deep", "Go deep on one verse", "Pick one verse from the chapter and sit with it for a full minute.", "Ask what it says, what it means, and what response it calls for."],
      ["tip-read-before-opinion", "Read before reacting", "Some Bible chapters feel hard at first, but do not judge them too quickly.", "Read the full chapter, then let the notes help you understand the context."],
      ["tip-watch-repetition", "Watch repeated words", "Repeated words are like signposts in Scripture.", "If a chapter repeats a phrase, God may be helping you see the main idea."],
      ["tip-find-the-turn", "Find the turning point", "Most chapters have a moment where the story shifts.", "Look for the verse where a choice, command, warning, or promise changes the direction."],
      ["tip-before-after", "Ask what changed", "After reading, ask what is different at the end of the chapter than at the beginning.", "That one question helps you follow the movement of the story."],
      ["tip-character-choice", "Notice the choices", "Look at what each person does, says, fears, or trusts.", "Bible study gets clearer when you pay attention to the choices people make."],
      ["tip-god-action", "Circle what God does", "When you read, notice every action God takes.", "The Bible is not mainly about heroes. It is about the Lord leading, judging, rescuing, and keeping promise."],
      ["tip-promises-warnings", "Separate promises and warnings", "Ask which lines comfort, which lines command, and which lines warn.", "That keeps you from turning every verse into the same kind of lesson."],
      ["tip-context-neighbors", "Check the neighbor chapters", "If a chapter feels confusing, look at the chapter before it and after it.", "The Bible often explains itself through the flow of the surrounding story."],
      ["tip-notes-with-question", "Open notes with one question", "Before opening chapter notes, name the thing you do not understand yet.", "You will read with more focus when you are looking for a real answer."],
      ["tip-trivia-missed", "Use missed trivia as a study guide", "A wrong answer is not failure.", "It shows exactly what to review before moving to the next chapter."],
      ["tip-scramble-names", "Scramble helps with Bible names", "Names and places can feel hard to remember.", "Word games give your brain another way to recognize them later."],
      ["tip-reflection-specific", "Make reflection specific", "Instead of writing, 'I need to do better,' name one real next step.", "Specific reflection turns Bible study into practice."],
      ["tip-prayer-response", "Turn one lesson into prayer", "After the chapter, pray one sentence from what you learned.", "Bible study becomes personal when truth turns into conversation with God."],
      ["tip-dont-skip-hard", "Do not skip hard chapters", "Hard chapters often teach holiness, justice, patience, or trust.", "Let Bible Buddy walk you through them instead of jumping away."],
      ["tip-law-grace", "Read law chapters slowly", "Old Testament laws can feel strange, but they reveal God's holiness and care for community life.", "Ask what the law protected, taught, or exposed."],
      ["tip-gospel-thread", "Look for the bigger story", "Ask how this chapter fits creation, fall, promise, rescue, covenant, kingdom, exile, or redemption.", "That helps the Bible feel like one story instead of scattered pieces."],
      ["tip-application-small", "Keep application small", "A good Bible response does not have to be dramatic.", "One honest act of obedience today is better than a huge vague plan."],
      ["tip-study-not-mood", "Do not wait for the mood", "A Bible habit grows when you show up before you feel inspired.", "Open the next task and let the Word start working on your attention."],
      ["tip-read-aloud-hard", "Read hard verses out loud", "When a verse feels dense, hearing it can help your mind slow down.", "Out-loud reading catches words your eyes may skip."],
      ["tip-write-summary", "Write a 10-word summary", "After reading, try to summarize the chapter in ten words.", "That simple limit forces you to find the main point."],
      ["tip-main-tension", "Find the tension", "Ask what problem, conflict, fear, sin, or question the chapter is dealing with.", "Once you find the tension, the lesson usually becomes clearer."],
      ["tip-mercy-judgment", "Notice mercy and judgment", "Many chapters hold both together.", "God's justice shows sin is serious, and His mercy shows He still makes a way forward."],
      ["tip-community-question", "Post one question", "If the chapter confused you, ask the community one clear question.", "Someone else may need that same answer too."],
      ["tip-buddy-help", "Ask your Buddy for the next step", "When you feel stuck, use your Bible Buddy as a guide, not just a mascot.", "Ask what to focus on in the chapter you are studying."],
      ["tip-review-tomorrow", "Review tomorrow before starting", "Before opening the next chapter, reread yesterday's final thought or reflection.", "It helps the story connect instead of starting cold."],
      ["tip-study-chain", "Build a chapter chain", "Each chapter is a link in the bigger story.", "When you finish, ask how this chapter connects to the one before it."],
      ["tip-no-perfect-notes", "Your notes do not need to be perfect", "Write honest notes, not fancy notes.", "The goal is understanding Scripture, not sounding impressive."],
      ["tip-find-command", "Look for one command", "If the chapter gives a command, ask what obedience would look like in real life.", "Commands are not just information. They invite response."],
      ["tip-find-warning", "Respect the warning", "Warnings in Scripture are gifts, not interruptions.", "They show where sin leads before we have to learn it the hard way."],
      ["tip-find-comfort", "Receive the comfort", "Some verses are meant to steady you.", "Do not rush past comfort just because you are used to being strong."],
      ["tip-study-with-pen", "Study with a pen mindset", "Even if you type, read like you are ready to mark what matters.", "Active reading helps the chapter stick."],
      ["tip-one-name", "Learn one name", "If a chapter has lots of names, choose one and learn why that person matters.", "One clear name is better than twenty blurred names."],
      ["tip-one-place", "Learn one place", "Bible places are not random scenery.", "A place can carry memory, promise, failure, or worship."],
      ["tip-slow-ending", "Do not rush the ending", "The final verses often show the point of the chapter.", "Slow down at the end and ask what the chapter wants you to carry."],
      ["tip-start-clean", "Start with a clean question", "Try asking, 'Lord, what do You want me to see here?'", "A simple prayer can turn reading from a task into a meeting place."],
      ["tip-repeat-tomorrow", "Repeat the habit tomorrow", "Bible growth is rarely one giant moment.", "It is the repeated return that reshapes how you think and live."],
      ["tip-understanding-over-checkmark", "Understanding over checkmarks", "The task list is there to guide you, not rush you.", "Use each card to understand the chapter better."],
    ].forEach(([id, title, lineOne, lineTwo]) => pool.push({ id, category: "habit", eyebrow: "Habit Builder", title, lineOne, lineTwo, buttonText: "Got it", action: "dismiss" }));

    [
      ["fact-genesis", "Genesis means beginning", "Genesis opens with origins: creation, humanity, sin, promise, covenant, and family lines.", "It sets the foundation for the whole Bible story."],
      ["fact-exodus", "Exodus means going out", "Exodus tells how God brings Israel out of slavery and forms them as His covenant people.", "Deliverance comes before Sinai."],
      ["fact-sinai", "Sinai is a turning point", "At Sinai, rescued people learn what it means to belong to a holy God.", "The mountain moves the story from escape into covenant identity."],
      ["fact-tabernacle", "The tabernacle means God dwells", "The tabernacle shows that God wants to dwell among His people.", "Its design teaches holiness, access, sacrifice, and presence."],
      ["fact-leviticus", "Leviticus is about holiness", "Leviticus is not random rules.", "It teaches how a holy God lives among a covenant people."],
      ["fact-covenant", "Covenant means committed relationship", "A covenant is more than a contract.", "It is a serious relationship with promises and responsibilities."],
      ["fact-passover", "Passover remembers rescue", "Passover helped Israel remember that God delivered them from judgment and slavery.", "The meal turned history into worship and identity."],
      ["fact-manna", "Manna trained trust", "Manna was daily bread in the wilderness.", "It taught Israel to trust God one day at a time."],
      ["fact-joseph", "Joseph connects Genesis to Exodus", "Joseph's story explains how Jacob's family ends up in Egypt.", "That sets the stage for Moses and deliverance."],
      ["fact-abraham", "Abraham carries promise", "God promises Abraham land, descendants, blessing, and a family line.", "That promise drives the Bible story forward."],
      ["fact-jacob", "Jacob becomes Israel", "Jacob's new name marks identity and destiny.", "The family story becomes the nation story."],
      ["fact-sacrifice", "Sacrifice teaches access", "In the Old Testament, sacrifice showed that approaching God was serious.", "It taught sin, cleansing, worship, gratitude, and fellowship."],
      ["fact-priesthood", "Priests represented the people", "Priests served at the altar and helped Israel approach God.", "Their role showed both God's holiness and His mercy."],
      ["fact-sabbath", "Sabbath is trust", "Sabbath was not only rest.", "It was a weekly act of trust in God as provider."],
      ["fact-image", "Humans bear God's image", "Genesis says humanity is made in the image of God.", "That gives people dignity, purpose, and responsibility."],
      ["fact-eden", "Eden is temple-like", "Eden is more than a garden scene.", "It is a place of God's presence, human vocation, and holy order."],
      ["fact-genealogies", "Genealogies carry story", "Bible genealogies are not filler.", "They preserve identity, promise, memory, and direction."],
      ["fact-wilderness", "The wilderness tests trust", "The wilderness is where Israel learns dependence after rescue.", "Freedom from Egypt still has to become faith in God."],
      ["fact-law", "Law follows rescue", "God gives commandments after He rescues Israel.", "Obedience responds to grace; it does not create rescue."],
      ["fact-connected-story", "The Bible is one connected story", "The chapters are not isolated pieces.", "Creation, fall, promise, rescue, covenant, kingdom, exile, and redemption connect."],
    ].forEach(([id, title, lineOne, lineTwo]) => pool.push({ id, category: "bible_fact", eyebrow: "Bible Fact", title, lineOne, lineTwo, buttonText: "Nice", action: "dismiss" }));

    [
      ["invite-earn-rewards", "Invite new Bible Buddies", "When someone joins from your invite link, you earn XP and diamonds.", "Sharing Bible Buddy can help your friends study and help your progress grow too."],
      ["invite-share-link", "Your invite link is ready", "Send your Bible Buddy link to someone who wants to understand Scripture better.", "Every real signup from your link can add rewards to your account."],
      ["invite-friend-start", "Help a friend start", "Somebody you know may not know where to begin in the Bible.", "Invite them so they can start with guided tasks instead of guessing."],
      ["invite-community-growth", "Grow the Bible Buddy family", "The more people studying, posting, and encouraging, the stronger the community feels.", "Your invite link helps bring new Bible Buddies in."],
      ["invite-reward-reminder", "Invites can reward you", "Bible Buddy rewards real referrals with XP and diamonds.", "Share your link, then check your Share tab to see your signups."],
      ["invite-diamonds", "Earn diamonds by sharing", "Diamonds are not only from study tasks.", "Inviting a friend who signs up can add more diamonds to your stash."],
      ["invite-xp", "Earn XP by sharing", "Helping someone start their Bible habit counts.", "Invite friends and watch your XP rewards grow when they join."],
      ["invite-no-code", "No code needed", "Just use your invite link.", "Bible Buddy tracks who came from your link so you can get credit."],
      ["invite-one-person", "Think of one person", "Who needs a simple place to start with the Bible?", "Send them your invite link today and help them take the first step."],
      ["invite-study-together", "Study with someone you know", "Bible study is easier when you are not doing it alone.", "Invite a friend and encourage each other through the chapter tasks."],
      ["community-world", "Bible Buddies are everywhere", "Community lets you study with people beyond your own circle.", "Post one thought and join what God is teaching others too."],
      ["community-encourage", "Encourage one Bible Buddy", "A like, comment, or reply can help somebody keep going.", "Community is part of the habit, not just a side page."],
      ["community-question", "Ask the question", "If a chapter confuses you, someone else may be wondering too.", "Post a question in Community and learn together."],
      ["community-testimony", "Share what clicked", "When a chapter starts making sense, share the moment.", "Your simple testimony can make Scripture feel reachable for someone else."],
      ["community-not-perfect", "Posts do not need to be perfect", "One honest sentence is enough.", "Tell the community what stood out from your study today."],
      ["share-tab-tracker", "Check your Share tab", "Your Share tab tracks signups, XP earned, and diamonds earned.", "That is where your invite rewards live."],
      ["share-after-study", "Share after you study", "After finishing a chapter, invite someone to start their own Bible habit.", "Your consistency can become encouragement for them."],
      ["feature-settings-buddy", "Your Buddy can change", "Settings lets you choose which Bible Buddy shows across the app.", "Pick the guide that feels right for your study rhythm."],
      ["feature-flame-style", "Your flame can match you", "Bought flame colors show up wherever your streak flame appears.", "Set your active flame in Settings after you unlock one."],
      ["feature-store-check", "The store has more than themes", "Themes, flames, Bible Buddies, boosts, and rewards all live in the store.", "Spend diamonds when you want to customize your Bible Buddy experience."],
    ].forEach(([id, title, lineOne, lineTwo]) =>
      pool.push({ id, category: "habit", eyebrow: "App Feature", title, lineOne, lineTwo, buttonText: "Got it", action: "dismiss" }),
    );

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
    const dayNumber = Number(dayKey.replace(/\D/g, "").slice(-2) || "0");
    const categoryOrder: Array<NonNullable<DashboardLouisNudge["category"]>> =
      dayNumber % 4 === 0
        ? ["progress", "discovery", "habit", "bible_fact"]
        : dayNumber % 4 === 1
          ? ["discovery", "progress", "habit", "bible_fact"]
          : dayNumber % 4 === 2
            ? ["habit", "progress", "discovery", "bible_fact"]
            : ["bible_fact", "progress", "discovery", "habit"];
    const selectedCategory =
      categoryOrder.find((category) => pool.some((item) => (item.category ?? "discovery") === category)) ?? "discovery";
    const categoryPool = pool.filter((item) => (item.category ?? "discovery") === selectedCategory);
    const key = getDashboardLouisNudgeRotationKey(currentUserId, dayKey);
    const currentIndex = Number(window.localStorage.getItem(key) || "0");
    const selected = categoryPool[Math.abs(currentIndex) % categoryPool.length] ?? pool[0];
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

  const selectedBuddyNameForTour = getBuddyAvatar(normalizeBuddyAvatarId(profile?.selected_buddy_avatar)).name;

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
      title: `Welcome to Chat with ${selectedBuddyNameForTour}`,
      body: `This chat lets you ask Bible questions instantly while you study so you can stay focused in your reading flow. ${selectedBuddyNameForTour} is designed to search Scripture, filter out nonsense, and prioritize clear, Scripture-grounded answers. It is like having a Bible study partner built directly into your reading experience.`,
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
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">👥 Community</h2>
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
          <li>â€¢ A short overview from {selectedBuddyNameForTour} explaining whatâ€™s happening</li>
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
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ¤– Use {selectedBuddyNameForTour} Anytime</h2>
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
    function applyDashboardUser(user: {
      id: string;
      email?: string | null;
      user_metadata?: Record<string, unknown> | null;
    }) {
      setUserId(user.id);
      setIsOwnerDashboard(user.email === "moorelouis3@gmail.com");
      const meta: any = user.user_metadata || {};
      const first =
        meta.firstName ||
        meta.first_name ||
        (user.email ? user.email.split("@")[0] : null) ||
        "friend";

      setUserName(first);
    }

    async function loadUser() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) {
        applyDashboardUser(sessionData.session.user);
        return;
      }

      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        applyDashboardUser(data.user);
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
    const earnedBadges = badgeProgress.filter((badge) => badge.current >= badge.target);
    const earnedBadgeCount = earnedBadges.length;
    const latestBadge = earnedBadges[earnedBadges.length - 1] ?? badgeProgress[0] ?? null;
    const streakValue = Math.max(1, profile?.current_streak ?? 1);
    const bibleCompletionPercent = Math.max(
      0,
      Math.min(100, Math.round((totalCompletedChapters / Math.max(TOTAL_BIBLE_CHAPTERS, 1)) * 100)),
    );
    const displayedBibleCompletionPercent = isLoadingBibleCompletion
      ? animatedDashboardStats.completion
      : bibleCompletionPercent;
    const diamondsLoading = !profile;
    const levelLoading = isLoadingLevel || !levelInfo;
    const badgesLoading = badgeProgress.length === 0;
    const streakFlameDuration = Math.max(0.85, 7 - Math.min(29, Math.max(0, streakValue)) * 0.2);
    const streakFlameClass =
      streakValue >= 30
        ? "streak-flame-earned"
        : "streak-flame-building";
    const nextLevelPercent = Math.max(0, Math.min(100, levelInfo?.progressPercent ?? 0));
    const visibleOwnerDiamondTotal = 10000;
    const personalStats = [
      {
        key: "completion",
        label: "Bible Progress",
        sublabel: "Overall",
        value: `${displayedBibleCompletionPercent}%`,
        icon: "📖",
        tones: "border-[var(--bb-card-border)] bg-[var(--bb-card)]",
        onClick: () => {
          setShowDiamondStore(false);
          setShowBibleProgressPanel(true);
          setBibleBrowserSelectedBook(null);
        },
      },
      {
        key: "diamonds",
        label: "Diamonds",
        sublabel: "In your stash",
        value: diamondsLoading
          ? animatedDashboardStats.grace
          : isOwnerDashboard
            ? visibleOwnerDiamondTotal.toLocaleString()
            : Math.max(0, Number(profile?.diamonds_count ?? 0)).toLocaleString(),
        icon: "💎",
        tones: "border-[var(--bb-card-border)] bg-[var(--bb-card)]",
        onClick: openDiamondStore,
      },
      {
        key: "level",
        label: "Level",
        sublabel: "",
        value: levelLoading ? animatedDashboardStats.level : levelInfo?.level ?? 1,
        icon: "🛡️",
        tones: "border-[var(--bb-card-border)] bg-[var(--bb-card)]",
        onClick: openLevelInfoModal,
      },
      {
        key: "badges",
        label: "Badges Earned",
        sublabel: "",
        value: badgesLoading ? animatedDashboardStats.badges : earnedBadgeCount,
        icon: "🏅",
        tones: "border-[var(--bb-card-border)] bg-[var(--bb-card)]",
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
      }>
    ) => (
      <div className="bb-skin-glow-card mx-auto grid max-w-xl grid-cols-4 gap-1.5 rounded-[22px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-1.5 shadow-[0_12px_34px_rgba(38,63,99,0.08)] backdrop-blur sm:gap-2 sm:p-2">
        {cards.map((card) => {
          const CardTag = card.onClick ? "button" : "div";
          return (
            <CardTag
              key={card.key ?? card.label}
              type={card.onClick ? "button" : undefined}
              onClick={card.onClick}
              className={`bb-skin-glow-tile flex min-h-[68px] flex-col rounded-[16px] border px-1.5 py-2 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition sm:min-h-[82px] sm:px-2.5 sm:py-2.5 ${card.onClick ? "hover:-translate-y-0.5 hover:shadow-md" : ""} ${card.tones}`}
            >
              <p className="text-base font-black leading-none text-gray-950 sm:text-xl">
                <span className="mr-1 align-middle text-sm" aria-hidden="true">{card.icon}</span>
                <span>{card.value}</span>
              </p>
              <p className="mt-1.5 text-[9px] font-black leading-tight text-gray-800 sm:text-[11px]">
                {card.label}
              </p>
              {card.sublabel ? (
                <p className="mt-0.5 text-[8px] font-semibold leading-tight text-gray-500 sm:text-[10px]">
                  {card.sublabel}
                </p>
              ) : null}
            </CardTag>
          );
        })}
        {cards.some((card) => card.key === "level") ? (
          <button
            type="button"
            onClick={openLevelInfoModal}
            className="bb-skin-glow-tile col-span-4 rounded-2xl border border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] px-3 py-1.5 text-left transition hover:bg-[var(--bb-card)] hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-black text-[var(--bb-accent)]">
                {levelInfo?.pointsToNextLevel ?? 0} XP to next level
              </p>
              <p className="text-[11px] font-black text-[var(--bb-text-secondary)]">
                {Math.round(nextLevelPercent)}%
              </p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--bb-progress-track)]">
              <div className="h-full rounded-full bg-[var(--bb-progress-fill)] transition-all duration-500" style={{ width: `${nextLevelPercent}%` }} />
            </div>
          </button>
        ) : null}
      </div>
    );

    const currentLevel = levelLoading ? animatedDashboardStats.level : levelInfo?.level ?? 1;
    const currentLevelTitle = levelInfo?.levelName || "Faithful Beginner";
    const currentXp = levelInfo?.totalPoints ?? 0;
    const nextLevelXp = levelInfo?.pointsToNextLevel ?? 0;
    const diamondValue = diamondsLoading
      ? animatedDashboardStats.grace
      : isOwnerDashboard
        ? visibleOwnerDiamondTotal.toLocaleString()
        : Math.max(0, Number(profile?.diamonds_count ?? 0)).toLocaleString();
    const journeyTitle = currentBook ? `${currentBook} Journey` : "Bible Journey";
    const chaptersLabel = `${totalCompletedChapters.toLocaleString()} of ${TOTAL_BIBLE_CHAPTERS.toLocaleString()} chapters`;
    const skinWorldClass = activePremiumSkinId === "none" ? "skin-world-default" : `skin-world-${activePremiumSkinId}`;

    const renderPremiumProgressionBoard = () => (
      <section className={`premium-stats-board ${skinWorldClass} mx-auto max-w-xl`} aria-label="Bible Buddy progression">
        <style jsx>{`
          .premium-stats-board {
            --premium-aura: var(--bb-accent);
            --premium-card: color-mix(in srgb, var(--bb-card) 88%, transparent);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .premium-stat-card {
            position: relative;
            overflow: hidden;
            border: 1px solid color-mix(in srgb, var(--bb-card-border) 82%, var(--bb-accent));
            background:
              radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--premium-aura) 24%, transparent), transparent 34%),
              linear-gradient(145deg, color-mix(in srgb, var(--premium-card) 92%, transparent), color-mix(in srgb, var(--bb-surface) 70%, transparent));
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.16),
              0 14px 34px rgba(0,0,0,0.18),
              0 0 28px color-mix(in srgb, var(--premium-aura) 16%, transparent);
            color: var(--bb-text-primary);
            isolation: isolate;
          }
          .premium-stat-card::before {
            content: "";
            position: absolute;
            inset: -35%;
            z-index: -1;
            background:
              radial-gradient(circle, color-mix(in srgb, var(--premium-aura) 20%, transparent) 0 1px, transparent 2px),
              linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.12), transparent 58%);
            background-size: 34px 34px, 100% 100%;
            opacity: 0.72;
            animation: premium-stat-drift 16s ease-in-out infinite alternate;
          }
          .premium-level-card {
            grid-column: span 2;
            min-height: 168px;
            border-radius: 26px;
            padding: 18px;
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.18),
              0 18px 48px rgba(0,0,0,0.24),
              0 0 42px color-mix(in srgb, var(--premium-aura) 28%, transparent);
          }
          .premium-mini-card {
            min-height: 132px;
            border-radius: 22px;
            padding: 14px;
          }
          .premium-xp-ring {
            width: 86px;
            height: 86px;
            border-radius: 999px;
            display: grid;
            place-items: center;
            background:
              radial-gradient(circle, color-mix(in srgb, var(--bb-card) 88%, #07101c) 0 54%, transparent 56%),
              conic-gradient(var(--premium-aura) ${nextLevelPercent}%, color-mix(in srgb, var(--bb-progress-track) 82%, transparent) 0);
            box-shadow: 0 0 26px color-mix(in srgb, var(--premium-aura) 42%, transparent);
          }
          .premium-xp-fill {
            width: ${nextLevelPercent}%;
            background: linear-gradient(90deg, color-mix(in srgb, var(--premium-aura) 62%, white), var(--bb-progress-fill));
          }
          .premium-orb {
            display: grid;
            place-items: center;
            width: 46px;
            height: 46px;
            border-radius: 18px;
            background: radial-gradient(circle at 35% 20%, rgba(255,255,255,0.55), color-mix(in srgb, var(--premium-aura) 72%, #111827));
            color: var(--bb-button-text);
            box-shadow: 0 0 22px color-mix(in srgb, var(--premium-aura) 40%, transparent);
          }
          .skin-world-blue-storm { --premium-aura: #5DD6FF; }
          .skin-world-midnight-garden { --premium-aura: #AFCF7A; }
          .skin-world-lavender-prayer { --premium-aura: #CFAEFF; }
          .skin-world-ruby-village { --premium-aura: #FF735F; }
          .skin-world-slow-mornings { --premium-aura: #F5B25B; }
          .skin-world-morning-mercy { --premium-aura: #E99265; }
          .skin-world-carolina-coastline { --premium-aura: #7BAFD4; }
          .skin-world-angel-wings { --premium-aura: #8DDCFF; }
          @keyframes premium-stat-drift {
            from { transform: translate3d(-2%, -1%, 0) rotate(0deg); opacity: 0.52; }
            to { transform: translate3d(2%, 1%, 0) rotate(4deg); opacity: 0.82; }
          }
          @media (prefers-reduced-motion: reduce) {
            .premium-stat-card::before { animation: none; }
          }
        `}</style>

        <button type="button" onClick={openLevelInfoModal} className="premium-stat-card premium-level-card text-left transition hover:-translate-y-0.5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--bb-accent)]">Level Identity</p>
              <div className="mt-2 flex items-baseline gap-3">
                <p className="text-6xl font-black leading-none text-[var(--bb-text-primary)]">{currentLevel}</p>
                <div className="min-w-0">
                  <p className="text-lg font-black leading-tight text-[var(--bb-text-primary)]">{currentLevelTitle}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-[var(--bb-text-secondary)]">
                    {nextLevelXp > 0 ? `${nextLevelXp.toLocaleString()} XP until the next rank` : "Next rank unlocked"}
                  </p>
                </div>
              </div>
            </div>
            <div className="premium-xp-ring shrink-0">
              <div className="text-center">
                <p className="text-sm font-black text-[var(--bb-text-primary)]">{Math.round(nextLevelPercent)}%</p>
                <p className="text-[9px] font-black uppercase text-[var(--bb-text-muted)]">XP</p>
              </div>
            </div>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--bb-progress-track)]">
            <div className="premium-xp-fill h-full rounded-full transition-all duration-500" />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-[11px] font-black text-[var(--bb-text-secondary)]">
            <span>{currentXp.toLocaleString()} total XP</span>
            <span>Unlocks grow with your rhythm</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setShowDiamondStore(false);
            setShowBibleProgressPanel(true);
            setBibleBrowserSelectedBook(null);
          }}
          className="premium-stat-card premium-mini-card text-left transition hover:-translate-y-0.5"
        >
          <span className="premium-orb text-lg font-black" aria-hidden="true">B</span>
          <p className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent)]">Scripture Path</p>
          <p className="mt-1 text-lg font-black leading-tight text-[var(--bb-text-primary)]">{journeyTitle}</p>
          <p className="mt-1 text-sm font-black text-[var(--bb-text-primary)]">{displayedBibleCompletionPercent}% complete</p>
          <p className="mt-1 text-[11px] font-bold leading-4 text-[var(--bb-text-secondary)]">{chaptersLabel}. One chapter at a time.</p>
        </button>

        <button type="button" onClick={openDiamondStore} className="premium-stat-card premium-mini-card text-left transition hover:-translate-y-0.5">
          <span className="premium-orb text-lg font-black" aria-hidden="true">D</span>
          <p className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent)]">Stash</p>
          <p className="mt-1 text-2xl font-black leading-none text-[var(--bb-text-primary)]">{diamondValue}</p>
          <p className="mt-2 text-[11px] font-bold leading-4 text-[var(--bb-text-secondary)]">Save for skins, drops, and special editions.</p>
        </button>

        <button type="button" onClick={() => setShowBadgesModal(true)} className="premium-stat-card premium-mini-card col-span-2 text-left transition hover:-translate-y-0.5">
          <div className="flex items-center gap-3">
            <span className="premium-orb text-xl" aria-hidden="true">{latestBadge?.emoji ?? "B"}</span>
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent)]">Latest Badge</p>
              <p className="mt-1 text-lg font-black leading-tight text-[var(--bb-text-primary)]">
                {badgesLoading ? `${animatedDashboardStats.badges} badges loading` : latestBadge?.title ?? "First Badge Waiting"}
              </p>
              <p className="mt-1 text-xs font-bold leading-5 text-[var(--bb-text-secondary)]">
                {latestBadge?.description ?? `${earnedBadgeCount} badges earned. Keep building your Bible Buddy story.`}
              </p>
            </div>
          </div>
          <div className="mt-3 inline-flex rounded-full border border-[var(--bb-card-border)] bg-[var(--bb-accent-soft)] px-3 py-1 text-[11px] font-black text-[var(--bb-text-primary)]">
            View All Badges
          </div>
        </button>
      </section>
    );

    const ownerAnalyticsStats = [
      { key: "signups", label: "Signups 24h", value: loadingOwnerQuickStats ? "..." : ownerQuickStats.signups24h, tones: "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100" },
      { key: "active", label: "Active 24h", value: loadingOwnerQuickStats ? "..." : ownerQuickStats.activeUsers24h, tones: "border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100" },
      { key: "upgrades", label: "Upgrades", value: loadingOwnerQuickStats ? "..." : ownerQuickStats.upgrades24h, tones: "border-emerald-200 bg-gradient-to-br from-white via-emerald-50 to-emerald-100" },
      { key: "total", label: "Total Users", value: loadingOwnerQuickStats ? "..." : ownerQuickStats.totalUsers, tones: "border-rose-200 bg-gradient-to-br from-white via-rose-50 to-rose-100" },
    ];

    const renderGreetingAndStreakCard = () => (
      <>
          <button
            type="button"
            onClick={() => {
              setStreakMotivationModalMode("daily");
              setShowStreakMotivationTaskPrompt(false);
              setShowStreakMotivationModal(true);
            }}
            className="bb-dashboard-streak-card bb-skin-glow-card mx-auto block w-full max-w-xl rounded-[22px] border border-[#e6edf7] bg-white p-3 text-left shadow-[0_10px_26px_rgba(38,63,99,0.08)] transition hover:shadow-md sm:p-3.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <span className={streakFlameClass} style={{ animationDuration: `${streakFlameDuration}s` }} aria-hidden="true">
                    <StreakFlameEmoji
                      flameId={
                        getPremiumSkinFlameId(activePremiumSkinId) ?? profile?.selected_streak_flame
                      }
                      size={42}
                      title={getDashboardStreakHeadline(streakValue)}
                    />
                  </span>
                  <p className="text-xl font-black leading-none text-gray-950 sm:text-2xl">
                    {getDashboardStreakHeadline(streakValue)}
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
                  className={`bb-dashboard-streak-day rounded-2xl px-1 py-1.5 text-center transition sm:py-2 ${
                    isCompleted ? "bg-[#eef6ff]" : "bg-[#f8fafc]"
                  } ${day.isToday ? "ring-2 ring-[#4B9CD3]/30" : ""}`}
                >
                  <p className={`bb-dashboard-streak-day-label mb-1.5 text-[10px] font-black sm:text-[11px] ${isCompleted ? "text-[#2f7fe8]" : "text-gray-500"}`}>
                    {getDashboardDayAbbr(day.date)}
                  </p>
                  <span
                    className={`bb-dashboard-streak-check mx-auto grid h-8 w-8 place-items-center rounded-full border text-sm font-black transition sm:h-9 sm:w-9 ${
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
        <div className="space-y-4">
          {renderGreetingAndStreakCard()}
          {renderStatCards(personalStats)}
        </div>
      );
    }

    return (
      <div
        className="space-y-4"
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

  function renderBibleProgressPanel() {
    const bibleCompletionPercent = Math.max(
      0,
      Math.min(100, Math.round((totalCompletedChapters / Math.max(TOTAL_BIBLE_CHAPTERS, 1)) * 100)),
    );
    const progressRows = bibleBookProgress.length
      ? bibleBookProgress
      : BOOKS.map((book) => ({
          book,
          completed: 0,
          total: getBookTotalChapters(book),
          chapters: [] as number[],
        }));
    const progressByBook = new Map(progressRows.map((row) => [row.book, row]));
    const visibleBooks = bibleBrowserAlphabetical ? [...BOOKS].sort((a, b) => a.localeCompare(b)) : BOOKS;
    const selectedProgress = bibleBrowserSelectedBook ? progressByBook.get(bibleBrowserSelectedBook) : null;
    const selectedTotal = bibleBrowserSelectedBook ? getBookTotalChapters(bibleBrowserSelectedBook) : 0;
    const selectedCompleted = new Set(selectedProgress?.chapters || []);
    const openBibleReader = (book: string, chapter: number) => {
      setBibleBrowserReading({ book, chapter });
      window.setTimeout(() => {
        bibleProgressPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    };

    if (bibleBrowserReading) {
      const readerBookSlug = encodeURIComponent(bibleBrowserReading.book.toLowerCase().trim());
      const readerSrc = `/Bible/${readerBookSlug}/${bibleBrowserReading.chapter}?dashboardEmbed=1&hideReaderChrome=1`;

      return (
        <section
          ref={bibleProgressPanelRef}
          className="overflow-hidden rounded-[28px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)]"
        >
          <iframe
            key={`${bibleBrowserReading.book}:${bibleBrowserReading.chapter}:dashboard-full-reader`}
            src={readerSrc}
            title={`${bibleBrowserReading.book} ${bibleBrowserReading.chapter} full Bible reader`}
            className="h-[calc(100vh-145px)] min-h-[780px] w-full border-0 bg-[var(--bb-card)]"
          />
        </section>
      );
    }

    return (
      <section
        ref={bibleProgressPanelRef}
        className="rounded-[28px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent)]">Bible Progress</p>
            <h2 className="mt-1 text-2xl font-black leading-tight text-[var(--bb-text-primary)]">
              {bibleBrowserSelectedBook || "Choose a Bible book"}
            </h2>
            <p className="mt-2 text-sm font-semibold leading-5 text-[var(--bb-text-secondary)]">
              {bibleBrowserSelectedBook
                ? "Pick a chapter to open the Bible reader. Finished chapters are already marked."
                : "Tap a book, then choose a chapter. Books are in Bible order by default."}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {bibleBrowserSelectedBook ? (
              <button
                type="button"
                onClick={() => setBibleBrowserSelectedBook(null)}
                className="rounded-full border border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] px-3 py-2 text-xs font-black text-[var(--bb-accent)] transition hover:brightness-95"
              >
                Books
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setShowBibleProgressPanel(false);
                setBibleBrowserSelectedBook(null);
              }}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] text-xl font-black text-[var(--bb-text-secondary)] transition hover:bg-[var(--bb-card)]"
              aria-label="Close Bible"
            >
              ×
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-3xl font-black leading-none text-[var(--bb-text-primary)]">{bibleCompletionPercent}%</p>
              <p className="mt-1 text-xs font-bold text-[var(--bb-text-muted)]">Bible completed</p>
            </div>
            <div className="text-right text-xs font-black text-[var(--bb-text-secondary)]">
              <p>{totalCompletedChapters} / {TOTAL_BIBLE_CHAPTERS}</p>
              <p className="mt-1 font-bold text-[var(--bb-text-muted)]">chapters finished</p>
            </div>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[var(--bb-progress-track,#dbe7f4)]">
            <div
              className="h-full rounded-full bg-[var(--bb-accent,#2f7fe8)] transition-all duration-500"
              style={{ width: `${bibleCompletionPercent}%` }}
            />
          </div>
        </div>

        {bibleBrowserSelectedBook ? (
          <div className="mt-5">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {Array.from({ length: selectedTotal }, (_, index) => index + 1).map((chapter) => {
                const done = selectedCompleted.has(chapter);
                return (
                  <button
                    key={chapter}
                    type="button"
                    onClick={() => openBibleReader(bibleBrowserSelectedBook, chapter)}
                    className={`min-h-[72px] rounded-2xl border px-2 py-3 text-center transition hover:-translate-y-0.5 hover:shadow-sm ${
                      done
                        ? "border-[#9be7b0] bg-[#eafbf0] text-[#116b35]"
                        : "border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] text-[var(--bb-text-primary)] hover:border-[var(--bb-accent)]"
                    }`}
                  >
                    <span className="block text-lg font-black">{chapter}</span>
                    <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.08em]">
                      {done ? "Done" : "Open"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <label className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] px-4 py-3">
              <span className="text-sm font-black text-[var(--bb-text-primary)]">ABC order</span>
              <input
                type="checkbox"
                checked={bibleBrowserAlphabetical}
                onChange={(event) => setBibleBrowserAlphabetical(event.target.checked)}
                className="h-5 w-5 accent-[var(--bb-accent)]"
              />
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {visibleBooks.map((book) => {
                const progress = progressByBook.get(book);
                const total = progress?.total ?? getBookTotalChapters(book);
                const completed = progress?.completed ?? 0;
                const complete = completed >= total;
                return (
                  <button
                    key={book}
                    type="button"
                    onClick={() => setBibleBrowserSelectedBook(book)}
                    className={`rounded-2xl border px-3 py-3 text-left transition hover:-translate-y-0.5 hover:border-[var(--bb-accent)] hover:shadow-sm ${
                      complete ? "border-[#9be7b0] bg-[#eafbf0]" : "border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)]"
                    }`}
                  >
                    <span className="block text-sm font-black leading-tight text-[var(--bb-text-primary)]">{book}</span>
                    <span className="mt-1 block text-[11px] font-bold text-[var(--bb-text-muted)]">
                      {completed} of {total} chapters
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>
    );
  }

  function renderDiamondStorePanel() {
    const ownerHasUnlimitedDiamonds = isOwnerDashboard;
    const visibleOwnerDiamondTotal = 10000;
    const diamondCount = ownerHasUnlimitedDiamonds ? visibleOwnerDiamondTotal : Math.max(0, Number(profile?.diamonds_count ?? 0));
    const ownedItemIds = new Set(storePurchases.map((purchase) => purchase.item_id));

    const renderMysteryRevealPanel = () => {
      if (!mysteryPrizeReveal) return null;
      const isClosed = mysteryPrizeReveal.status === "closed";
      const isOpening = mysteryPrizeReveal.status === "opening";
      const isOpened = mysteryPrizeReveal.status === "opened";

      return (
        <section className="mt-5 overflow-hidden rounded-[28px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-5 text-center shadow-[0_18px_46px_rgba(38,63,99,0.14)]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent)]">Mystery Prize</p>
          <h3 className="mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary)]">
            {isOpened ? "You opened the box!" : "Tap the box"}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary)]">
            {isOpened
              ? "Your diamond gift has been added to your stash."
              : "One mystery gift is waiting. Open it and see what BibleBuddy drops into your stash."}
          </p>

          <button
            type="button"
            disabled={!isClosed}
            onClick={() => void handleOpenMysteryPrize()}
            className="group relative mx-auto mt-7 grid min-h-[210px] w-full max-w-sm place-items-center overflow-hidden rounded-[28px] border border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] p-6 transition hover:-translate-y-1 hover:shadow-xl disabled:cursor-default disabled:hover:translate-y-0"
          >
            <span className="absolute left-8 top-8 h-3 w-3 rounded-full bg-[var(--bb-accent)] opacity-70 animate-ping" />
            <span className="absolute right-10 top-12 h-4 w-4 rounded-full bg-yellow-300 opacity-80 animate-pulse" />
            <span className="absolute bottom-10 left-12 h-4 w-4 rounded-full bg-sky-300 opacity-80 animate-bounce" />
            <span className="absolute bottom-12 right-14 h-3 w-3 rounded-full bg-pink-300 opacity-80 animate-ping" />
            <span
              className={`relative text-[7.5rem] leading-none drop-shadow-lg transition duration-500 ${
                isClosed ? "animate-bounce group-hover:scale-110" : isOpening ? "scale-125 rotate-6 animate-pulse" : "scale-110"
              }`}
              aria-hidden="true"
            >
              {isOpened ? "💎" : "🎁"}
            </span>
            {isOpening ? (
              <span className="absolute inset-x-10 top-1/2 h-20 -translate-y-1/2 rounded-full bg-[var(--bb-accent-soft)] blur-2xl animate-pulse" />
            ) : null}
          </button>

          {isOpened ? (
            <div className="mx-auto mt-6 max-w-sm rounded-[24px] border border-[var(--bb-card-border)] bg-[var(--bb-accent-soft)] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-text-muted)]">Gift unlocked</p>
              <p className="mt-1 text-5xl font-black text-[var(--bb-text-primary)]">
                +{mysteryPrizeReveal.reward.toLocaleString()}
              </p>
              <p className="mt-1 text-sm font-black text-[var(--bb-accent)]">diamonds</p>
            </div>
          ) : (
            <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-text-muted)]">
              {isOpening ? "Opening..." : "Tap to open"}
            </p>
          )}

          {isOpened ? (
            <button
              type="button"
              onClick={() => setMysteryPrizeReveal(null)}
              className="mt-6 w-full max-w-sm rounded-full bg-[var(--bb-button)] px-6 py-3 text-sm font-black text-[var(--bb-button-text)] shadow-sm transition hover:brightness-95"
            >
              Keep Shopping
            </button>
          ) : null}
        </section>
      );
    };

    const getStoreButtonContent = (item: BibleBuddyStoreItem, owned: boolean) => {
      if (item.comingSoon) return "Soon";
      if (owned && !item.repeatable) return item.themeId || item.skinId || item.flameId ? "Use" : "Owned";
      return (
        <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
          <span>BUY</span>
          <span>{item.price.toLocaleString()}</span>
          <span aria-hidden="true">{"\uD83D\uDC8E"}</span>
        </span>
      );
    };

    const getBuddyIdFromStoreItem = (item: BibleBuddyStoreItem) => {
      if (item.id === "buddy-lil-louis") return "louis";
      return item.id.replace("buddy-", "");
    };

    const renderStoreActionButton = (item: BibleBuddyStoreItem, owned: boolean, className = "") => {
      const canBuy = !item.comingSoon && (item.repeatable || !owned);
      const isSelectableOwned = owned && !item.repeatable && Boolean(item.themeId || item.skinId || item.flameId);
      return (
        <button
          type="button"
          disabled={storeBuyingId === item.id || item.comingSoon || (!canBuy && !isSelectableOwned)}
          onClick={() => void handleStorePurchase(item)}
          className={`inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${
            owned && !item.repeatable
              ? "border border-white/70 bg-white/80 text-[var(--bb-text-primary)] shadow-sm hover:bg-white"
              : "bg-[#050505] text-white shadow-sm hover:brightness-110"
          } ${className}`}
        >
          {storeBuyingId === item.id ? "Buying..." : getStoreButtonContent(item, owned)}
        </button>
      );
    };

    const renderThemeCard = (item: BibleBuddyStoreItem) => {
      const owned = item.price === 0 || ownedItemIds.has(item.id);
      return (
        <article
          key={item.id}
          className="relative min-h-[132px] overflow-hidden rounded-[18px] border border-white/70 p-2 text-center shadow-[0_10px_24px_rgba(38,63,99,0.10)]"
          style={{ background: `linear-gradient(145deg, ${item.accent}24, #ffffff 72%)` }}
        >
          {owned ? (
            <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-black text-[var(--bb-text-primary)] shadow-sm">
              ✓
            </span>
          ) : null}
          <button type="button" onClick={() => void handleStorePurchase(item)} className="block w-full">
            <span className="mx-auto mt-3 block h-12 w-12 rounded-full shadow-[inset_0_4px_10px_rgba(255,255,255,0.55),0_6px_12px_rgba(0,0,0,0.18)]" style={{ background: item.accent }} />
            <h4 className="mt-3 truncate text-sm font-black text-[var(--bb-text-primary)]">{item.title}</h4>
          </button>
          <div className="mt-2">{renderStoreActionButton(item, owned, "w-full bg-white/90 text-[var(--bb-text-primary)]")}</div>
        </article>
      );
    };

    const renderFlameCard = (item: BibleBuddyStoreItem) => {
      const owned = item.price === 0 || ownedItemIds.has(item.id);
      const active = item.flameId && normalizeFlameCosmeticId(profile?.selected_streak_flame) === item.flameId;
      return (
        <article
          key={item.id}
          className={`relative min-h-[140px] overflow-hidden rounded-[18px] border p-2 text-center shadow-[0_10px_24px_rgba(38,63,99,0.10)] ${
            active ? "border-[var(--bb-accent)] ring-2 ring-[var(--bb-accent-soft)]" : "border-white/70"
          }`}
          style={{ background: `linear-gradient(145deg, ${item.accent}20, #ffffff 74%)` }}
        >
          {active ? (
            <span className="absolute right-2 top-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-[#050505] text-xs font-black text-white shadow-sm">
              ✓
            </span>
          ) : null}
          <button type="button" onClick={() => void handleStorePurchase(item)} className="block w-full">
            <span className="mx-auto mt-5 grid h-16 w-16 place-items-center rounded-3xl bg-white/70 shadow-inner">
              <StreakFlameEmoji flameId={item.flameId} size={48} title={item.title} />
            </span>
            <h4 className="mt-2 min-h-[34px] text-xs font-black leading-4 text-[var(--bb-text-primary)]">{item.title}</h4>
          </button>
          <div className="mt-2">{renderStoreActionButton(item, owned, "w-full bg-white/90 text-[var(--bb-text-primary)]")}</div>
        </article>
      );
    };

    const renderPremiumSkinCard = (item: BibleBuddyStoreItem) => {
      const owned = item.price === 0 || ownedItemIds.has(item.id);
      const active = item.skinId && activePremiumSkinId === item.skinId;
      const skin = getPremiumSkin(item.skinId);
      const previewTags =
        item.skinId === "midnight-garden"
          ? ["Moonlight", "Lanterns", "Mist"]
          : item.skinId === "lavender-prayer"
            ? ["Moonlight", "Candles", "Stars"]
            : item.skinId === "ruby-village"
              ? ["Ruby Sky", "Castle", "Embers"]
              : item.skinId === "slow-mornings"
                ? ["Rain", "Coffee", "Candlelight"]
                : item.skinId === "morning-mercy"
                  ? ["Sunrise", "Flowers", "Peace"]
                  : item.skinId === "carolina-coastline"
                    ? ["Lighthouse", "Waves", "Mist"]
                    : item.skinId === "angel-wings"
                      ? ["Wings", "Light Rays", "Peace"]
                : ["Storm", "Glow", "Mist"];
      const skinMotionClass =
        item.skinId === "midnight-garden"
          ? "bb-store-skin-card--garden"
          : item.skinId === "lavender-prayer"
            ? "bb-store-skin-card--lavender"
            : item.skinId === "ruby-village"
              ? "bb-store-skin-card--ruby"
              : item.skinId === "slow-mornings"
                ? "bb-store-skin-card--mornings"
                : item.skinId === "morning-mercy"
                  ? "bb-store-skin-card--mercy"
                  : item.skinId === "carolina-coastline"
                    ? "bb-store-skin-card--coastline"
                    : item.skinId === "angel-wings"
                      ? "bb-store-skin-card--angel"
                : "bb-store-skin-card--storm";
      const skinBadge =
        item.skinId === "slow-mornings" || item.skinId === "morning-mercy" || item.skinId === "carolina-coastline" || item.skinId === "angel-wings"
          ? "New"
          : item.skinId === "ruby-village"
            ? "Popular"
            : item.skinId === "blue-storm"
              ? "New"
              : item.skinId === "lavender-prayer"
                ? "New"
                : "Premium";
      const accent = skin?.palette.accent ?? item.accent;
      return (
        <article
          key={item.id}
          className={`bb-store-skin-card ${skinMotionClass} relative min-h-[320px] overflow-hidden rounded-[22px] border text-white shadow-[0_18px_42px_rgba(8,34,66,0.30)] ${
            active ? "ring-2" : "border-white/25"
          }`}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(2,8,18,0.02) 0%, rgba(2,10,24,0.18) 42%, rgba(2,10,24,0.82) 100%), url(${item.imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderColor: active ? accent : undefined,
            boxShadow: active ? `0 0 0 1px ${accent}, 0 18px 42px rgba(8,34,66,0.3)` : undefined,
          }}
        >
          <span className="bb-store-skin-motion bb-store-skin-motion-a" aria-hidden="true" />
          <span className="bb-store-skin-motion bb-store-skin-motion-b" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                item.skinId === "midnight-garden"
                  ? "radial-gradient(circle at 52% 12%, rgba(255,246,204,0.28), transparent 28%), radial-gradient(circle at 18% 36%, rgba(215,184,107,0.2), transparent 28%), linear-gradient(135deg,rgba(8,18,22,0.12),rgba(4,10,16,0.76))"
                  : item.skinId === "lavender-prayer"
                    ? "radial-gradient(circle at 52% 12%, rgba(245,220,255,0.34), transparent 30%), radial-gradient(circle at 18% 40%, rgba(233,190,255,0.2), transparent 28%), linear-gradient(135deg,rgba(28,18,44,0.12),rgba(14,8,27,0.76))"
                    : item.skinId === "ruby-village"
                      ? "radial-gradient(circle at 52% 10%, rgba(255,192,106,0.3), transparent 28%), radial-gradient(circle at 18% 34%, rgba(255,93,72,0.22), transparent 30%), linear-gradient(135deg,rgba(65,12,18,0.18),rgba(18,5,8,0.78))"
                      : item.skinId === "slow-mornings"
                        ? "radial-gradient(circle at 56% 14%, rgba(255,210,138,0.28), transparent 30%), radial-gradient(circle at 18% 40%, rgba(245,178,91,0.18), transparent 28%), linear-gradient(135deg,rgba(62,38,24,0.14),rgba(22,13,8,0.76))"
                        : item.skinId === "morning-mercy"
                          ? "radial-gradient(circle at 54% 12%, rgba(255,230,164,0.34), transparent 30%), radial-gradient(circle at 18% 38%, rgba(255,178,150,0.2), transparent 28%), linear-gradient(135deg,rgba(255,238,219,0.1),rgba(97,49,32,0.62))"
                          : item.skinId === "carolina-coastline"
                            ? "radial-gradient(circle at 54% 12%, rgba(220,243,255,0.3), transparent 30%), radial-gradient(circle at 18% 38%, rgba(123,175,212,0.22), transparent 28%), linear-gradient(135deg,rgba(7,24,43,0.16),rgba(4,14,27,0.76))"
                            : item.skinId === "angel-wings"
                              ? "radial-gradient(circle at 50% 12%, rgba(255,255,255,0.38), transparent 28%), radial-gradient(circle at 60% 24%, rgba(246,211,133,0.26), transparent 32%), linear-gradient(180deg,rgba(141,220,255,0.04),rgba(4,18,38,0.78))"
                      : "radial-gradient(circle at 18% 12%,rgba(93,214,255,0.34),transparent 34%),linear-gradient(135deg,rgba(9,24,52,0.2),rgba(4,11,24,0.78))",
            }}
          />
          <div
            className="pointer-events-none absolute -right-10 top-4 h-28 w-28 rounded-full blur-2xl"
            style={{
              backgroundColor:
                item.skinId === "midnight-garden"
                  ? "rgba(215,184,107,0.22)"
                  : item.skinId === "lavender-prayer"
                    ? "rgba(207,174,255,0.24)"
                    : item.skinId === "ruby-village"
                      ? "rgba(255,115,95,0.26)"
                      : item.skinId === "slow-mornings"
                        ? "rgba(245,178,91,0.26)"
                        : item.skinId === "morning-mercy"
                          ? "rgba(244,179,95,0.26)"
                          : item.skinId === "carolina-coastline"
                            ? "rgba(123,175,212,0.26)"
                            : item.skinId === "angel-wings"
                              ? "rgba(246,211,133,0.28)"
                      : "rgba(125,211,252,0.25)",
            }}
          />
          <span
            className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-[0_8px_18px_rgba(0,0,0,0.24)]"
            style={{ backgroundColor: active ? accent : `${accent}cc` }}
          >
            {skinBadge}
          </span>
          {active ? (
            <span
              className="absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-950 shadow-[0_0_22px_rgba(93,214,255,0.45)]"
              style={{ backgroundColor: accent }}
            >
              Active
            </span>
          ) : owned ? (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-950">
              Owned
            </span>
          ) : null}
          <button type="button" onClick={() => void handleStorePurchase(item)} className="relative block min-h-[250px] w-full p-4 text-left">
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-[1.7rem] font-black leading-none !text-white drop-shadow sm:text-3xl">{item.title}</h4>
              <p className="mt-2 max-w-sm text-sm font-bold leading-5 !text-white/90">{item.subtitle}</p>
            </div>
          </button>
          <div className="relative border-t border-white/15 bg-black/34 p-4 backdrop-blur-md">
            <div className="mb-3 grid grid-cols-3 gap-2 text-center">
              {previewTags.map((tag) => (
                <span key={tag} className="rounded-2xl border border-white/15 bg-white/10 px-2 py-2 text-[10px] font-black uppercase tracking-wide !text-white/90">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-lg font-black !text-white">
                <span aria-hidden="true">💎</span>
                {item.price.toLocaleString()}
              </span>
              {renderStoreActionButton(item, owned, "min-w-[120px] rounded-full border border-white/30 bg-white/18 px-5 py-3 !text-white shadow-[0_0_24px_rgba(255,255,255,0.12)] backdrop-blur-md hover:bg-white/26")}
            </div>
          </div>
        </article>
      );
    };

    const renderPremiumSkinsStoreSection = () => (
      <section className="mt-6">
        <style>{`
          @keyframes bb-store-skin-drift {
            0% { transform: translate3d(-6%, 4%, 0) rotate(0deg); opacity: 0.45; }
            50% { opacity: 0.85; }
            100% { transform: translate3d(8%, -5%, 0) rotate(7deg); opacity: 0.5; }
          }
          @keyframes bb-store-skin-pulse {
            0%, 100% { transform: scale(0.92); opacity: 0.34; }
            50% { transform: scale(1.08); opacity: 0.72; }
          }
          @keyframes bb-store-storm-flash {
            0%, 58%, 63%, 100% { opacity: 0; transform: translateY(-3%) scaleY(0.96); }
            59% { opacity: 0.88; transform: translateY(0) scaleY(1); }
            61% { opacity: 0.22; }
            62% { opacity: 0.7; }
          }
          @keyframes bb-store-lantern-flicker {
            0%, 100% { opacity: 0.36; transform: scale(0.94); }
            48% { opacity: 0.72; transform: scale(1.08); }
            55% { opacity: 0.46; }
            62% { opacity: 0.82; transform: scale(1.04); }
          }
          @keyframes bb-store-particle-rise {
            0% { transform: translate3d(0, 28%, 0); opacity: 0; }
            22% { opacity: 0.58; }
            100% { transform: translate3d(10%, -34%, 0); opacity: 0; }
          }
          .bb-store-skin-card {
            background-position: center;
            isolation: isolate;
            transition: transform 180ms ease, filter 180ms ease, box-shadow 180ms ease;
          }
          .bb-store-skin-card::before,
          .bb-store-skin-card::after {
            content: "";
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 2;
          }
          .bb-store-skin-card:hover {
            transform: translateY(-3px);
            filter: brightness(1.05);
          }
          .bb-store-skin-motion {
            pointer-events: none;
            position: absolute;
            inset: auto;
            z-index: 3;
            border-radius: 999px;
            filter: blur(16px);
            mix-blend-mode: screen;
          }
          .bb-store-skin-motion-a {
            left: -16%;
            top: 10%;
            width: 70%;
            height: 42%;
            animation: bb-store-skin-drift 7s ease-in-out infinite alternate;
          }
          .bb-store-skin-motion-b {
            right: -14%;
            bottom: 20%;
            width: 52%;
            height: 36%;
            animation: bb-store-skin-pulse 4.8s ease-in-out infinite;
          }
          .bb-store-skin-card--storm .bb-store-skin-motion-a,
          .bb-store-skin-card--storm .bb-store-skin-motion-b { background: rgba(93, 214, 255, 0.52); }
          .bb-store-skin-card--garden .bb-store-skin-motion-a,
          .bb-store-skin-card--garden .bb-store-skin-motion-b { background: rgba(175, 207, 122, 0.46); }
          .bb-store-skin-card--lavender .bb-store-skin-motion-a,
          .bb-store-skin-card--lavender .bb-store-skin-motion-b { background: rgba(207, 174, 255, 0.5); }
          .bb-store-skin-card--ruby .bb-store-skin-motion-a,
          .bb-store-skin-card--ruby .bb-store-skin-motion-b { background: rgba(255, 115, 95, 0.5); }
          .bb-store-skin-card--mornings .bb-store-skin-motion-a,
          .bb-store-skin-card--mornings .bb-store-skin-motion-b { background: rgba(245, 178, 91, 0.48); }
          .bb-store-skin-card--mercy .bb-store-skin-motion-a,
          .bb-store-skin-card--mercy .bb-store-skin-motion-b { background: rgba(244, 179, 95, 0.46); }
          .bb-store-skin-card--coastline .bb-store-skin-motion-a,
          .bb-store-skin-card--coastline .bb-store-skin-motion-b { background: rgba(123, 175, 212, 0.5); }
          .bb-store-skin-card--angel .bb-store-skin-motion-a,
          .bb-store-skin-card--angel .bb-store-skin-motion-b { background: rgba(141, 220, 255, 0.48); }
          .bb-store-skin-card--storm::before {
            background:
              linear-gradient(115deg, transparent 0 44%, rgba(210, 246, 255, 0.92) 45%, rgba(93, 214, 255, 0.2) 46%, transparent 49%),
              linear-gradient(78deg, transparent 0 58%, rgba(210, 246, 255, 0.62) 59%, transparent 61%);
            filter: blur(0.3px);
            animation: bb-store-storm-flash 5.2s ease-in-out infinite;
          }
          .bb-store-skin-card--storm::after {
            background: linear-gradient(110deg, transparent 0%, rgba(230, 248, 255, 0.18) 44%, transparent 76%);
            filter: blur(3px);
            animation: bb-store-skin-drift 8s ease-in-out infinite alternate;
          }
          .bb-store-skin-card--garden::before,
          .bb-store-skin-card--lavender::before {
            background: radial-gradient(circle at 70% 18%, rgba(255, 244, 204, 0.34), transparent 17%);
            animation: bb-store-lantern-flicker 4.6s ease-in-out infinite;
          }
          .bb-store-skin-card--ruby::before {
            background:
              radial-gradient(circle at 20% 74%, rgba(255, 192, 106, 0.24), transparent 18%),
              radial-gradient(circle at 70% 58%, rgba(255, 115, 95, 0.18), transparent 18%);
            animation: bb-store-particle-rise 5.8s ease-in-out infinite;
          }
          .bb-store-skin-card--mornings::before {
            background:
              radial-gradient(circle at 56% 16%, rgba(255, 210, 138, 0.26), transparent 20%),
              repeating-linear-gradient(108deg, rgba(255, 232, 190, 0.08) 0 1px, transparent 1px 28px);
            animation: bb-store-lantern-flicker 5.8s ease-in-out infinite;
          }
          .bb-store-skin-card--mornings::after {
            background:
              linear-gradient(115deg, transparent 0%, rgba(255, 244, 222, 0.16) 46%, transparent 76%);
            filter: blur(3px);
            animation: bb-store-skin-drift 9s ease-in-out infinite alternate;
          }
          .bb-store-skin-card--mercy::before {
            background:
              radial-gradient(circle at 55% 14%, rgba(255, 230, 164, 0.3), transparent 22%),
              radial-gradient(circle at 20% 40%, rgba(255, 178, 150, 0.18), transparent 20%);
            animation: bb-store-lantern-flicker 5.4s ease-in-out infinite;
          }
          .bb-store-skin-card--mercy::after {
            background:
              radial-gradient(circle at 18% 24%, rgba(255, 182, 170, 0.22) 0 2px, transparent 4px),
              linear-gradient(115deg, transparent 0%, rgba(255, 248, 236, 0.18) 46%, transparent 76%);
            background-size: 150px 190px, 100% 100%;
            filter: blur(2px);
            animation: bb-store-skin-drift 8.5s ease-in-out infinite alternate;
          }
          .bb-store-skin-card--coastline::before {
            background:
              radial-gradient(circle at 58% 14%, rgba(220, 243, 255, 0.28), transparent 22%),
              linear-gradient(105deg, transparent 0%, rgba(166, 216, 244, 0.16) 48%, transparent 78%);
            animation: bb-store-lantern-flicker 5.8s ease-in-out infinite;
          }
          .bb-store-skin-card--coastline::after {
            background:
              repeating-linear-gradient(104deg, rgba(200, 230, 247, 0.1) 0 1px, transparent 1px 34px),
              linear-gradient(115deg, transparent 0%, rgba(166, 216, 244, 0.16) 46%, transparent 76%);
            background-size: 220px 280px, 100% 100%;
            filter: blur(2.5px);
            animation: bb-store-skin-drift 9s ease-in-out infinite alternate;
          }
          .bb-store-skin-card--angel::before {
            background:
              radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.36), transparent 22%),
              radial-gradient(circle at 58% 24%, rgba(246, 211, 133, 0.24), transparent 26%),
              linear-gradient(102deg, transparent 0%, rgba(220, 245, 255, 0.2) 48%, transparent 76%);
            animation: bb-store-lantern-flicker 6s ease-in-out infinite;
          }
          .bb-store-skin-card--angel::after {
            background:
              radial-gradient(circle at 24% 28%, rgba(255, 255, 255, 0.22) 0 1.5px, transparent 3px),
              repeating-linear-gradient(112deg, rgba(255, 255, 255, 0.1) 0 1px, transparent 1px 38px),
              linear-gradient(180deg, transparent 0%, rgba(3, 17, 36, 0.18) 72%, rgba(3, 17, 36, 0.42) 100%);
            background-size: 180px 220px, 240px 300px, 100% 100%;
            filter: blur(2px);
            animation: bb-store-skin-drift 10s ease-in-out infinite alternate;
          }
        `}</style>
        <div className="overflow-hidden rounded-[28px] border border-rose-100 bg-[linear-gradient(135deg,rgba(255,231,231,0.9),rgba(255,246,246,0.72))] p-4 shadow-[0_18px_42px_rgba(153,27,27,0.08)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] bg-[linear-gradient(135deg,#8f1022,#d93d4e)] text-3xl shadow-[0_12px_24px_rgba(153,27,27,0.22)]" aria-hidden="true">
                ✦
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a41225]">Cinematic Themes</p>
                <h3 className="text-2xl font-black leading-tight text-[#4a1117]">Premium Skins</h3>
                <p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-[#6e3036]">
                  Immersive Bible Buddy atmospheres with animated lighting, premium cards, and skin-wide styling.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#a41225] px-5 py-3 text-sm font-black text-white shadow-[0_12px_24px_rgba(164,18,37,0.22)]">
              All skins 1,000 💎
            </span>
          </div>
        </div>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a41225]">Premium Skins</p>
            <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary)]">Choose a cinematic environment for prayer, study, and focus.</p>
          </div>
        </div>
        <div className="mt-3 grid gap-4 lg:grid-cols-2">{PREMIUM_SKIN_STORE_ITEMS.map(renderPremiumSkinCard)}</div>
      </section>
    );

    const renderBuddyStoreCard = (item: BibleBuddyStoreItem) => {
      const owned = item.price === 0 || ownedItemIds.has(item.id);
      const active = normalizeBuddyAvatarId(profile?.selected_buddy_avatar) === getBuddyIdFromStoreItem(item);
      return (
        <article
          key={item.id}
          className={`relative flex min-h-[226px] flex-col overflow-hidden rounded-[22px] border bg-[var(--bb-card)] shadow-[0_12px_30px_rgba(38,63,99,0.12)] sm:min-h-[270px] ${
            active ? "border-[var(--bb-accent)] ring-2 ring-[var(--bb-accent-soft)]" : "border-[var(--bb-card-border)]"
          }`}
        >
          {active ? (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-[#050505] px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
              Active
            </span>
          ) : null}
          <div
            className="flex h-[130px] items-end justify-center overflow-hidden bg-[var(--bb-surface-soft)] px-0 sm:h-[170px]"
          >
            <img
              src={item.imageSrc || "/Newlouiswave.png"}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="h-[190px] w-[128%] max-w-none translate-y-8 object-contain object-bottom sm:h-[258px] sm:w-[124%] sm:translate-y-12"
            />
          </div>
          <div className="mt-auto border-t border-[var(--bb-card-border)] bg-[var(--bb-card)] p-2 text-center sm:p-2.5">
            <h4 className="text-[15px] font-black leading-tight text-[var(--bb-text-primary)] sm:text-base">{item.title}</h4>
            <p className="mt-0.5 min-h-[28px] text-[11px] font-bold leading-4 text-[var(--bb-text-secondary)] sm:text-xs">{item.subtitle}</p>
            <div className="mt-1.5">{renderStoreActionButton(item, owned, "w-full")}</div>
          </div>
        </article>
      );
    };

    const renderBoostCard = (item: BibleBuddyStoreItem) => {
      const owned = item.price === 0 || ownedItemIds.has(item.id);
      return (
        <article
          key={item.id}
          className="flex min-h-[150px] flex-col justify-between rounded-[22px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-3xl shadow-inner"
              style={{ background: `${item.accent}22`, color: item.accent }}
              aria-hidden="true"
            >
              {item.emoji}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-black leading-tight text-[var(--bb-text-primary)]">{item.title}</h4>
              <p className="mt-1 text-xs font-semibold leading-5 text-[var(--bb-text-secondary)]">{item.subtitle}</p>
            </div>
          </div>
          <div className="mt-3">{renderStoreActionButton(item, owned, "w-full")}</div>
        </article>
      );
    };

    const renderStoreSection = (
      icon: string,
      title: string,
      subtitle: string,
      priceLabel: string | null,
      children: ReactNode,
    ) => (
      <section className="mt-6">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              <h3 className="text-xl font-black text-[var(--bb-text-primary)]">{title}</h3>
            </div>
            <p className="mt-1 text-sm font-semibold leading-5 text-[var(--bb-text-secondary)]">{subtitle}</p>
          </div>
          {priceLabel ? (
            <span className="shrink-0 rounded-full bg-[var(--bb-surface-soft)] px-4 py-2 text-sm font-black text-[var(--bb-text-primary)]">
              {priceLabel} 💎
            </span>
          ) : null}
        </div>
        {children}
      </section>
    );

    return (
      <section className="rounded-[30px] border border-[var(--bb-card-border)] bg-[var(--bb-surface)] p-4 shadow-[0_18px_48px_rgba(38,63,99,0.14)]">
        <div className="p-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-text-primary)]">Bible Buddy Store</p>
              <h2 className="mt-3 text-4xl font-black leading-none text-[var(--bb-text-primary)]">Customize your journey</h2>
              <p className="mt-3 max-w-xl text-base font-semibold leading-7 text-[var(--bb-text-secondary)]">
                Unlock new styles, Bible Buddies, boosts, and rewards as you grow your habit.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDiamondStore(false)}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border)] bg-[var(--bb-card)] text-3xl font-black leading-none text-[var(--bb-text-primary)] shadow-sm transition hover:scale-105"
              aria-label="Close store"
            >
              ×
            </button>
          </div>

          <div
            className="sticky top-2 z-10 mt-5 overflow-hidden rounded-[24px] p-5 text-white shadow-[0_18px_42px_rgba(37,99,235,0.30)]"
            style={{ background: "linear-gradient(135deg, #0c2f86 0%, #1d4ed8 54%, #102064 100%)" }}
          >
            <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
            <div className="pointer-events-none absolute right-8 top-4 text-6xl opacity-40" aria-hidden="true">💎</div>
            <div className="pointer-events-none absolute bottom-4 right-24 text-3xl opacity-60" aria-hidden="true">💎</div>
            <div className="relative flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15 text-4xl shadow-inner" aria-hidden="true">
                💎
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] !text-white/80">Your stash</p>
                <p className="mt-1 text-3xl font-black leading-none !text-white">
                  {diamondCount.toLocaleString()}
                </p>
                <p className="mt-2 max-w-md text-sm font-bold leading-5 !text-white/85">
                  Earn diamonds by completing studies, streaks, trivia, and daily tasks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {mysteryPrizeReveal ? (
          renderMysteryRevealPanel()
        ) : (
          <>
            {storeLoading ? (
              <div className="mt-5 rounded-2xl border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-4 text-center text-sm font-black text-[var(--bb-text-secondary)]">
                Loading store...
              </div>
            ) : null}
            {storeMessage ? (
              <div className="mt-5 rounded-2xl border border-[var(--bb-card-border)] bg-[var(--bb-accent-soft)] p-4 text-sm font-black text-[var(--bb-text-primary)]">
                {storeMessage}
              </div>
            ) : null}

            {renderPremiumSkinsStoreSection()}
            {false ? renderStoreSection(
              "🎨",
              "Themes",
              "Choose a style that fits your journey.",
              "500",
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">{THEME_STORE_ITEMS.map(renderThemeCard)}</div>,
            ) : null}
            {false ? renderStoreSection(
              "🔥",
              "30 Day Streak Flames",
              "Match your streak fire to your favorite theme.",
              "250",
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{STREAK_FLAME_STORE_ITEMS.map(renderFlameCard)}</div>,
            ) : null}
            {renderStoreSection(
              "👥",
              "Bible Buddies",
              "Unlock the Buddy voice you want guiding your habit.",
              "750",
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">{BUDDY_STORE_ITEMS.map(renderBuddyStoreCard)}</div>,
            )}
            {renderStoreSection(
              "⚡",
              "Boosts & Items",
              "Helpful items to power up your Bible habit.",
              null,
              <div className="grid gap-3 sm:grid-cols-3">{BOOST_STORE_ITEMS.map(renderBoostCard)}</div>,
            )}

            <button
              type="button"
              onClick={() => setShowDiamondStore(false)}
              className="mt-6 w-full rounded-full bg-[var(--bb-button)] px-6 py-3 text-sm font-black text-[var(--bb-button-text)] shadow-sm transition hover:brightness-95"
            >
              Close Store
            </button>
          </>
        )}
      </section>
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
    Boolean(moderatorWeeklyPayoutReveal) ||
    Boolean(selectedDashboardTask) ||
    Boolean(activeTourKey) ||
    Boolean(activeStorePromo) ||
    pendingDailyStreakSequence ||
    pendingDailyTaskCelebrationModal;

  useEffect(() => {
    if (!userId || typeof window === "undefined") return;
    if (!badgePopupSeenLoaded) return;
    const pendingBadges = readPendingBadgeQueue(userId);
    if (pendingBadges.length > 0) {
      setEarnedBadgeQueue((current) => {
        const existingIds = new Set(current.map((badge) => badge.id));
        const fresh = pendingBadges.filter((badge) => !existingIds.has(badge.id) && !seenBadgePopupIds.has(badge.id));
        return fresh.length ? [...current, ...fresh] : current;
      });
    }
  }, [badgePopupSeenLoaded, seenBadgePopupIds, userId]);

  useEffect(() => {
    if (!userId) {
      setSeenBadgePopupIds(new Set());
      setBadgePopupSeenLoaded(false);
      return;
    }

    let cancelled = false;
    setBadgePopupSeenLoaded(false);

    async function loadSeenBadgePopups() {
      const localSeen = new Set<string>();
      if (typeof window !== "undefined") {
        for (let index = 0; index < window.localStorage.length; index += 1) {
          const key = window.localStorage.key(index);
          const prefix = `bb:badge-popup-seen:${userId}:`;
          if (key?.startsWith(prefix) && window.localStorage.getItem(key) === "1") {
            localSeen.add(key.slice(prefix.length));
          }
        }
      }

      const { data, error } = await supabase
        .from("user_badge_popups_seen")
        .select("badge_id")
        .eq("user_id", userId);

      if (cancelled) return;

      if (error) {
        if (!/user_badge_popups_seen/i.test(error.message || "")) {
          console.warn("[BADGES] Could not load seen badge popups:", error.message);
        }
        setSeenBadgePopupIds(localSeen);
        setBadgePopupSeenLoaded(true);
        return;
      }

      const dbSeen = new Set((data || []).map((row: BadgePopupSeenRow) => row.badge_id).filter(Boolean));
      setSeenBadgePopupIds(new Set([...Array.from(localSeen), ...Array.from(dbSeen)]));
      setBadgePopupSeenLoaded(true);
    }

    void loadSeenBadgePopups();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!userId || moderatorWeeklyPayoutCheckRef.current === userId) return;
    moderatorWeeklyPayoutCheckRef.current = userId;

    let cancelled = false;

    async function loadModeratorWeeklyPayout() {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token || "";
      if (!token) return;

      const response = await fetch("/api/moderator/weekly-diamonds", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || cancelled || !payload?.unseenPayout) return;

          const payout = payload.unseenPayout;
          const amount = Math.max(0, Number(payout.amount ?? 0));
          setModeratorWeeklyPayoutReveal({
            id: payout.id,
            amount,
            paidAt: payout.paidAt,
            weekStart: payout.weekStart,
            kind: payout.kind === "skin_bonus" ? "skin_bonus" : "weekly",
          });
      setProfile((current) =>
        current
          ? {
              ...current,
              diamonds_count:
                typeof payload.currentDiamonds === "number"
                  ? Math.max(0, Number(payload.currentDiamonds))
                  : current.diamonds_count,
            }
          : current,
      );
    }

    void loadModeratorWeeklyPayout();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!badgePopupSeenLoaded) return;
    if (hasBlockingDashboardOverlay || activeEarnedBadge || earnedBadgeQueue.length === 0) return;
    if (badgePopupsShownThisSession >= MAX_BADGE_POPUPS_PER_SESSION) return;

    const unseenQueue = earnedBadgeQueue.filter((badge) => !seenBadgePopupIds.has(badge.id));
    if (unseenQueue.length !== earnedBadgeQueue.length) {
      setEarnedBadgeQueue(unseenQueue);
      if (typeof window !== "undefined" && userId) {
        writePendingBadgeQueue(userId, unseenQueue);
      }
      return;
    }

    const [nextBadge, ...remainingBadges] = unseenQueue;
    setEarnedBadgeQueue(remainingBadges);
    setActiveEarnedBadge(nextBadge);
    setSeenBadgePopupIds((current) => new Set([...Array.from(current), nextBadge.id]));
    setBadgePopupsShownThisSession((current) => current + 1);
    setPendingDailyStreakSequence(false);
    setShowStreakMotivationModal(false);
    setShowStreakMotivationTaskPrompt(false);
    setLouisDashboardNudge(null);
    if (typeof window !== "undefined" && userId) {
      writePendingBadgeQueue(userId, remainingBadges);
      window.localStorage.setItem(getLocalBadgePopupSeenKey(userId, nextBadge.id), "1");
      window.localStorage.setItem(getDashboardBadgeLastShownKey(userId), String(Date.now()));
    }

    if (userId) {
      supabase
        .from("user_badge_popups_seen")
        .upsert(
          {
            user_id: userId,
            badge_id: nextBadge.id,
            shown_at: new Date().toISOString(),
          },
          { onConflict: "user_id,badge_id" },
        )
        .then(({ error }) => {
          if (error && !/user_badge_popups_seen/i.test(error.message || "")) {
            console.warn("[BADGES] Could not persist seen badge popup:", error.message);
          }
        });
    }

    window.setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 78,
        origin: { y: 0.42 },
        colors: ["#7BAFD4", "#f7c948", "#22c55e", "#ffffff"],
      });
    }, 240);
  }, [activeEarnedBadge, badgePopupSeenLoaded, badgePopupsShownThisSession, earnedBadgeQueue, hasBlockingDashboardOverlay, pendingDailyStreakSequence, seenBadgePopupIds, userId]);

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
      bible_study_hub: "Community",
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

  const loadStorePurchases = useCallback(async () => {
    if (!userId) return;
    if (storePurchasesCacheKey) {
      const cachedPurchases = readPerformanceCache<StorePurchaseRow[]>(storePurchasesCacheKey);
      if (cachedPurchases) {
        setStorePurchases(cachedPurchases);
      }
    }
    setStoreLoading(true);
    const { data, error } = await supabase
      .from("user_store_purchases")
      .select("id,item_id,item_kind,item_title,price_diamonds,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[STORE] Could not load purchases:", error.message);
      setStoreMessage("The store is almost ready. Run the store purchases migration if this keeps showing.");
      setStoreLoading(false);
      return;
    }

    const purchases = (data || []) as StorePurchaseRow[];
    setStorePurchases(purchases);
    if (storePurchasesCacheKey) {
      writePerformanceCache(storePurchasesCacheKey, purchases, 1000 * 60 * 60 * 12);
    }
    setStoreLoading(false);
  }, [storePurchasesCacheKey, userId]);

  const openDiamondStore = useCallback(() => {
    setShowDiamondStore(true);
    setStoreMessage(null);
    preloadStoreSkinThumbnails();
    void loadStorePurchases();
  }, [loadStorePurchases]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("openStore") !== "1") return;
    openDiamondStore();
    params.delete("openStore");
    const nextQuery = params.toString();
    const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [openDiamondStore]);

  const resetDashboardHomePanel = useCallback(() => {
    setShowDiamondStore(false);
    setShowBibleProgressPanel(false);
    setBibleBrowserSelectedBook(null);
    setBibleBrowserReading(null);
    setActiveStorePromo(null);
    setStorePurchaseCongrats(null);
    setMysteryPrizeReveal(null);
    setDailyLoginGiftReveal(null);
    setModeratorWeeklyPayoutReveal(null);
    setBuddySelectionWelcome(null);
    setSelectedDashboardTask(null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("bb:dashboard-store-state", { detail: { open: showDiamondStore } }));
    return () => {
      window.dispatchEvent(new CustomEvent("bb:dashboard-store-state", { detail: { open: false } }));
    };
  }, [showDiamondStore]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function loadDashboardTheme(event?: Event) {
      const customEvent = event as CustomEvent<{ themeId?: string }> | undefined;
      setDashboardThemeId(
        normalizeAppThemeId(
          customEvent?.detail?.themeId ||
            window.localStorage.getItem(APP_THEME_STORAGE_KEY) ||
            window.localStorage.getItem("bb:dashboard-theme"),
        ),
      );
    }

    loadDashboardTheme();
    window.addEventListener("bb:app-theme-purchased", loadDashboardTheme);
    window.addEventListener("storage", loadDashboardTheme);
    return () => {
      window.removeEventListener("bb:app-theme-purchased", loadDashboardTheme);
      window.removeEventListener("storage", loadDashboardTheme);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function loadPremiumSkin(event?: Event) {
      const customEvent = event as CustomEvent<{ skinId?: string }> | undefined;
      const skinId = normalizePremiumSkinId(
        customEvent?.detail?.skinId ||
          readCachedPremiumSkin(userId) ||
          document.documentElement.dataset.bbSkin ||
          "none",
      );
      setActivePremiumSkinId(skinId);
      applyPremiumSkinToDocument(skinId);
      preloadActiveSkinAssets(skinId);
    }

    loadPremiumSkin();
    window.addEventListener("bb:premium-skin-changed", loadPremiumSkin);
    window.addEventListener("storage", loadPremiumSkin);
    return () => {
      window.removeEventListener("bb:premium-skin-changed", loadPremiumSkin);
      window.removeEventListener("storage", loadPremiumSkin);
    };
  }, [userId]);

  async function applyPurchasedTheme(themeId: AppThemeId) {
    const mappedSkinId = getPremiumSkinForLegacyTheme(themeId);
    if (mappedSkinId !== "none") {
      const applied = await applyPurchasedPremiumSkin(mappedSkinId);
      if (!applied) return;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(APP_THEME_STORAGE_KEY, themeId);
      window.localStorage.setItem("bb:dashboard-theme", themeId === "dark" ? "dark" : "light");
      window.dispatchEvent(new CustomEvent("bb:app-theme-purchased", { detail: { themeId } }));
    }
    if (mappedSkinId === "none") {
      applyAppThemeToDocument(themeId);
    }
    if (userId) {
      const { error } = await supabase.from("profile_stats").update({ app_theme: themeId }).eq("user_id", userId);
      if (error) console.warn("[STORE] Theme saved locally, but profile update failed:", error.message);
    }
  }

  async function canUsePremiumSkin(skinId: PremiumSkinId) {
    if (skinId === "none" || isOwnerDashboard || !userId) return true;
    const storeItem = PREMIUM_SKIN_STORE_ITEMS.find((item) => item.skinId === skinId);
    if (!storeItem) return false;
    if (storePurchases.some((purchase) => purchase.item_id === storeItem.id)) return true;
    const { data, error } = await supabase
      .from("user_store_purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("item_id", storeItem.id)
      .maybeSingle();
    return !error && Boolean(data);
  }

  async function getPremiumSkinLockMessage(nextSkinId: PremiumSkinId) {
    if (!userId || isOwnerDashboard) return null;
    const currentSkin = normalizePremiumSkinId(profile?.active_premium_skin ?? activePremiumSkinId);
    const currentSelectedAt = profile?.active_premium_skin_selected_at ?? null;
    let remainingMs = getPremiumSkinLockRemainingMs(currentSkin, currentSelectedAt, nextSkinId);
    if (remainingMs > 0) {
      return `Keep ${getPremiumSkin(currentSkin)?.name || "your current skin"} for ${formatPremiumSkinLockRemaining(remainingMs)} before choosing another skin.`;
    }

    const { data, error } = await supabase
      .from("profile_stats")
      .select("active_premium_skin, active_premium_skin_selected_at")
      .eq("user_id", userId)
      .maybeSingle();
    if (error && /active_premium_skin_selected_at/i.test(error.message || "")) return null;
    if (error) {
      console.warn("[STORE] Could not verify Premium Skin lock:", error.message);
      return "I could not verify your skin lock yet. Try again in a moment.";
    }
    const dbSkin = normalizePremiumSkinId(data?.active_premium_skin);
    remainingMs = getPremiumSkinLockRemainingMs(dbSkin, data?.active_premium_skin_selected_at, nextSkinId);
    if (remainingMs <= 0) return null;
    return `Keep ${getPremiumSkin(dbSkin)?.name || "your current skin"} for ${formatPremiumSkinLockRemaining(remainingMs)} before choosing another skin.`;
  }

  async function applyPurchasedPremiumSkin(skinId: PremiumSkinId) {
    const normalizedSkinId = normalizePremiumSkinId(skinId);
    const lockMessage = await getPremiumSkinLockMessage(normalizedSkinId);
    if (lockMessage) {
      setStoreMessage(lockMessage);
      return false;
    }
    const selectedAt = new Date().toISOString();
    if (typeof window !== "undefined") {
      cachePremiumSkinForUser(userId, normalizedSkinId, { markSelected: true });
      window.dispatchEvent(new CustomEvent("bb:premium-skin-changed", { detail: { skinId: normalizedSkinId } }));
    }
    setActivePremiumSkinId(normalizedSkinId);
    setProfile((current) => current ? { ...current, active_premium_skin: normalizedSkinId, active_premium_skin_selected_at: selectedAt } : current);
    applyPremiumSkinToDocument(normalizedSkinId);
    preloadActiveSkinAssets(normalizedSkinId);
    if (userId) {
      const { error } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            active_premium_skin: normalizedSkinId,
            active_premium_skin_selected_at: selectedAt,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );
      if (error && !/active_premium_skin/i.test(error.message || "")) {
        console.warn("[STORE] Premium Skin saved locally, but profile update failed:", error.message);
      }
    }
    const matchingFlame = getPremiumSkinFlameId(normalizedSkinId);
    if (matchingFlame) {
      await applyPurchasedFlame(matchingFlame);
    }
    return true;
  }

  function promptToApplyPremiumSkin(item: BibleBuddyStoreItem) {
    if (!item.skinId) return;
    setStorePurchaseCongrats(null);
    setSkinApplyPrompt({ item });
  }

  async function confirmApplyPremiumSkin() {
    const item = skinApplyPrompt?.item;
    if (!item?.skinId) return;
    setStoreBuyingId(item.id);
    setStoreMessage(null);
    const applied = await applyPurchasedPremiumSkin(item.skinId);
    setStoreBuyingId(null);
    if (!applied) return;
    setSkinApplyPrompt(null);
    setShowDiamondStore(false);
    setSkinAppliedCongrats({ skinName: item.title });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bb:skin-applied-confirmation", item.title);
    }
  }

  async function applyPurchasedFlame(flameId: string) {
    const normalizedFlameId = normalizeFlameCosmeticId(flameId);
    const currentSkinId =
      activePremiumSkinId !== "none"
        ? activePremiumSkinId
        : normalizePremiumSkinId(typeof document !== "undefined" ? document.documentElement.dataset.bbSkin : null);
    const mappedSkinId = currentSkinId === "none" ? getPremiumSkinForLegacyFlame(normalizedFlameId) : "none";
    if (mappedSkinId !== "none") {
      await applyPurchasedPremiumSkin(mappedSkinId);
      return;
    }
    const skinLockedFlame = getPremiumSkinFlameId(currentSkinId);
    if (skinLockedFlame) {
      if (typeof window !== "undefined") {
        const persistedSkinFlame = persistActiveStreakFlame(skinLockedFlame);
        window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId: persistedSkinFlame } }));
      }
      setProfile((current) => current ? { ...current, selected_streak_flame: skinLockedFlame } : current);
      if (userId) {
        const { error } = await supabase
          .from("profile_stats")
          .update({ selected_streak_flame: skinLockedFlame, updated_at: new Date().toISOString() })
          .eq("user_id", userId);
        if (error) console.warn("[STORE] Skin flame saved locally, but profile update failed:", error.message);
      }
      return;
    }
    if (typeof window !== "undefined") {
      const persistedFlame = persistActiveStreakFlame(normalizedFlameId);
      window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId: persistedFlame } }));
    }
    setProfile((current) => current ? { ...current, selected_streak_flame: normalizedFlameId } : current);
    if (userId) {
      const { error } = await supabase
        .from("profile_stats")
        .update({ selected_streak_flame: normalizedFlameId })
        .eq("user_id", userId);
      if (error) console.warn("[STORE] Flame saved locally, but profile update failed:", error.message);
    }
  }

  async function applyPurchasedBuddyFromItem(item: BibleBuddyStoreItem) {
    if (item.kind !== "buddy") return;
    const buddyId = normalizeBuddyAvatarId(item.id === "buddy-lil-louis" ? "louis" : item.id.replace("buddy-", ""));
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, buddyId);
      window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed", { detail: { buddyId } }));
    }
    setProfile((current) => current ? { ...current, selected_buddy_avatar: buddyId } : current);
    if (userId) {
      const { error } = await supabase
        .from("profile_stats")
        .update({ selected_buddy_avatar: buddyId, updated_at: new Date().toISOString() })
        .eq("user_id", userId);
      if (error) console.warn("[STORE] Buddy saved locally, but profile update failed:", error.message);
    }
  }

  async function handleUsePurchasedStoreItem(item: BibleBuddyStoreItem) {
    if (item.themeId) {
      await applyPurchasedTheme(item.themeId);
      setStoreMessage(`${item.title} is now active.`);
    } else if (item.skinId) {
      promptToApplyPremiumSkin(item);
    } else if (item.flameId) {
      await applyPurchasedFlame(item.flameId);
      setStoreMessage(`${item.title} is now active.`);
    } else if (item.kind === "buddy") {
      await applyPurchasedBuddyFromItem(item);
      setStoreMessage(`${item.title} is your Bible Buddy now.`);
    }
    setStorePurchaseCongrats(null);
  }

  async function handleOpenMysteryPrize() {
    if (!userId || !mysteryPrizeReveal || mysteryPrizeReveal.status !== "closed" || mysteryPrizeAwardingRef.current) return;

    mysteryPrizeAwardingRef.current = true;
    setStoreMessage(null);
    setMysteryPrizeReveal((current) => current ? { ...current, status: "opening" } : current);

    window.setTimeout(async () => {
      const reward = mysteryPrizeReveal.reward;
      const awarded = await awardDiamonds(userId, reward);

      if (awarded <= 0) {
        setStoreMessage("The mystery box could not add diamonds yet. Try opening it again in a moment.");
        setMysteryPrizeReveal((current) => current ? { ...current, status: "closed" } : current);
        mysteryPrizeAwardingRef.current = false;
        return;
      }

      setProfile((current) =>
        current
          ? {
              ...current,
              diamonds_count: Math.max(0, Number(current.diamonds_count ?? 0)) + awarded,
            }
          : current,
      );
      setMysteryPrizeReveal((current) => current ? { ...current, status: "opened" } : current);
      confetti({ particleCount: 90, spread: 72, origin: { y: 0.6 } });
      mysteryPrizeAwardingRef.current = false;
    }, 650);
  }

  async function handleOpenDailyLoginGift() {
    if (!userId || !dailyLoginGiftReveal || dailyLoginGiftReveal.status !== "closed" || dailyLoginGiftAwardingRef.current) return;

    dailyLoginGiftAwardingRef.current = true;
    setDailyLoginGiftReveal((current) => current ? { ...current, status: "opening" } : current);

    window.setTimeout(async () => {
      const reward = dailyLoginGiftReveal.reward;
      const awarded = await awardDiamonds(userId, reward);

      if (awarded <= 0) {
        setDailyLoginGiftReveal((current) => current ? { ...current, status: "closed" } : current);
        dailyLoginGiftAwardingRef.current = false;
        return;
      }

      setProfile((current) =>
        current
          ? {
              ...current,
              diamonds_count: Math.max(0, Number(current.diamonds_count ?? 0)) + awarded,
            }
          : current,
      );
      setDailyLoginGiftReveal((current) => current ? { ...current, status: "opened" } : current);
      confetti({ particleCount: 80, spread: 68, origin: { y: 0.62 } });
      dailyLoginGiftAwardingRef.current = false;
    }, 650);
  }

  async function acknowledgeModeratorWeeklyPayout() {
    const payout = moderatorWeeklyPayoutReveal;
    setModeratorWeeklyPayoutReveal(null);
    if (!payout) return;

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token || "";
    if (!token) return;

    await fetch("/api/moderator/weekly-diamonds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ payoutId: payout.id }),
    }).catch((error) => {
      console.warn("[MODERATOR_PAYOUT] Could not mark payout popup seen:", error);
    });
  }

  async function handleStorePurchase(item: BibleBuddyStoreItem) {
    if (!userId) {
      setStoreMessage("Sign in first so BibleBuddy can save what you buy.");
      return;
    }
    if (item.comingSoon) {
      setStoreMessage(`${item.title} is coming soon.`);
      return;
    }

    const alreadyOwned = storePurchases.some((purchase) => purchase.item_id === item.id);
    if (alreadyOwned && !item.repeatable) {
      if (item.themeId) {
        await applyPurchasedTheme(item.themeId);
        setStoreMessage(`${item.title} is now active.`);
      } else if (item.skinId) {
        promptToApplyPremiumSkin(item);
      } else if (item.flameId) {
        await applyPurchasedFlame(item.flameId);
        setStoreMessage(`${item.title} is now active.`);
      } else if (item.kind === "buddy") {
        await applyPurchasedBuddyFromItem(item);
        setStoreMessage(`${item.title} is your Bible Buddy now.`);
      } else {
        setStoreMessage(`You already own ${item.title}.`);
      }
      return;
    }

    setStoreBuyingId(item.id);
    setStoreMessage(null);

    const ownerHasUnlimitedDiamonds = isOwnerDashboard;
    const currentDiamonds = Math.max(0, Number(profile?.diamonds_count ?? 0));
    if (!ownerHasUnlimitedDiamonds && currentDiamonds < item.price) {
      setStoreMessage(`You need ${(item.price - currentDiamonds).toLocaleString()} more diamonds for ${item.title}.`);
      setStoreBuyingId(null);
      return;
    }

    const { data: statsRow, error: statsError } = await supabase
      .from("profile_stats")
      .select("diamonds_count")
      .eq("user_id", userId)
      .maybeSingle();

    if (statsError) {
      const missingDiamondsColumn = /diamonds_count/i.test(statsError.message || "");
      setStoreMessage(
        missingDiamondsColumn
          ? "The diamond stash column is missing. Run ADD_DIAMONDS_TO_PROFILE_STATS.sql in Supabase."
          : "I could not check your diamond stash. Try again in a moment.",
      );
      setStoreBuyingId(null);
      return;
    }

    if (!statsRow) {
      const { error: createStatsError } = await supabase
        .from("profile_stats")
        .upsert({ user_id: userId, diamonds_count: currentDiamonds }, { onConflict: "user_id" });
      if (createStatsError) {
        setStoreMessage("I could not create your diamond stash. Try again in a moment.");
        setStoreBuyingId(null);
        return;
      }
    }

    const serverDiamonds = Math.max(0, Number(statsRow?.diamonds_count ?? currentDiamonds));
    if (!ownerHasUnlimitedDiamonds && serverDiamonds < item.price) {
      setProfile((current) => current ? { ...current, diamonds_count: serverDiamonds } : current);
      setStoreMessage(`You need ${(item.price - serverDiamonds).toLocaleString()} more diamonds for ${item.title}.`);
      setStoreBuyingId(null);
      return;
    }

    const nextDiamonds = ownerHasUnlimitedDiamonds ? serverDiamonds : serverDiamonds - item.price;
    const profileUpdate: Record<string, number> = { diamonds_count: nextDiamonds };
    let previousGraceDays = Math.max(0, Number(profile?.grace_days_count ?? 0));
    if (item.id === "boost-extra-grace-day") {
      const { data: graceRow, error: graceError } = await supabase
        .from("profile_stats")
        .select("grace_days_count")
        .eq("user_id", userId)
        .maybeSingle();

      if (graceError) {
        setStoreMessage("Grace Days are not ready yet. Run ADD_GRACE_DAYS_TO_PROFILE_STATS.sql in Supabase.");
        setStoreBuyingId(null);
        return;
      }

      previousGraceDays = Math.max(0, Number(graceRow?.grace_days_count ?? profile?.grace_days_count ?? 0));
      profileUpdate.grace_days_count = Math.min(5, previousGraceDays + 1);
    }

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update(profileUpdate)
      .eq("user_id", userId);

    if (updateError) {
      setStoreMessage("The purchase did not go through. Your diamonds were not spent.");
      setStoreBuyingId(null);
      return;
    }

    const mysteryReward = item.kind === "mystery" ? rollMysteryPrizeReward() : null;

    const { error: purchaseError } = await supabase.from("user_store_purchases").insert({
      user_id: userId,
      item_id: item.id,
      item_kind: item.kind,
      item_title: item.title,
      price_diamonds: item.price,
      reward_payload: {
        themeId: item.themeId ?? null,
        skinId: item.skinId ?? null,
        flameId: item.flameId ?? null,
        repeatable: item.repeatable ?? false,
        mysteryReward,
      },
    });

    if (purchaseError) {
      console.warn("[STORE] Purchase saved to wallet but not purchase history:", purchaseError.message);
      await supabase
        .from("profile_stats")
        .update({
          diamonds_count: serverDiamonds,
          ...(typeof profileUpdate.grace_days_count === "number" ? { grace_days_count: previousGraceDays } : {}),
        })
        .eq("user_id", userId);
      setProfile((current) =>
        current
          ? {
            ...current,
            diamonds_count: serverDiamonds,
              grace_days_count: typeof profileUpdate.grace_days_count === "number" ? previousGraceDays : current.grace_days_count,
            }
          : current,
      );
      setStoreMessage("The store needs the new purchase-history migration before checkout can work.");
      setStoreBuyingId(null);
      return;
    } else if (!mysteryReward) {
      setStoreMessage(`${item.title} added to your account.`);
    }

    if (item.themeId) {
      await applyPurchasedTheme(item.themeId);
    }
    if (item.skinId) {
      setStoreMessage(`${item.title} is unlocked. Choose Use it when you are ready to set it on your dashboard.`);
    }
    if (item.flameId) {
      await applyPurchasedFlame(item.flameId);
    }

    setProfile((current) =>
      current
        ? {
            ...current,
            diamonds_count: nextDiamonds,
            grace_days_count:
              typeof profileUpdate.grace_days_count === "number"
                ? profileUpdate.grace_days_count
                : current.grace_days_count,
            selected_streak_flame:
              getPremiumSkinFlameId(activePremiumSkinId) ??
              (item.flameId ? normalizeFlameCosmeticId(item.flameId) : current.selected_streak_flame),
          }
        : current,
    );

    window.dispatchEvent(new CustomEvent("bb:dashboard-stats-sync", {
      detail: {
        graceDays: profileUpdate.grace_days_count,
      },
    }));

    await loadStorePurchases();
    if (mysteryReward) {
      setMysteryPrizeReveal({ status: "closed", reward: mysteryReward });
      setStoreMessage(null);
    } else {
      setStorePurchaseCongrats({ item });
    }
    setStoreBuyingId(null);
  }

  useEffect(() => {
    if (!dashboardStatsCacheKey || typeof window === "undefined") return;
    const cached = readPerformanceCache<{
      profile?: typeof profile;
      levelInfo?: typeof levelInfo;
      badgeProgress?: BadgeProgress[];
      totalCompletedChapters?: number;
      bibleBookProgress?: BibleBookProgress[];
      currentBook?: string | null;
      activePremiumSkinId?: PremiumSkinId;
      dashboardThemeId?: AppThemeId;
    }>(dashboardStatsCacheKey) ?? (() => {
      try {
        return JSON.parse(window.localStorage.getItem(dashboardStatsCacheKey) || "null") as {
          profile?: typeof profile;
          levelInfo?: typeof levelInfo;
          badgeProgress?: BadgeProgress[];
          totalCompletedChapters?: number;
          bibleBookProgress?: BibleBookProgress[];
          currentBook?: string | null;
          activePremiumSkinId?: PremiumSkinId;
          dashboardThemeId?: AppThemeId;
        } | null;
      } catch {
        return null;
      }
    })();
    if (!cached) return;

    if (cached.profile) {
      const cachedSkinId = normalizePremiumSkinId(cached.activePremiumSkinId ?? activePremiumSkinId);
      const skinLockedFlame = getPremiumSkinFlameId(cachedSkinId) ?? getLocalSkinLockedFlameId();
      setProfile({
        ...cached.profile,
        selected_streak_flame: skinLockedFlame ?? cached.profile.selected_streak_flame,
      });
      if (skinLockedFlame) {
        persistActiveStreakFlame(skinLockedFlame);
      }
    }
    if (cached.levelInfo) {
      setLevelInfo(cached.levelInfo);
      setIsLoadingLevel(false);
    }
    if (Array.isArray(cached.badgeProgress) && cached.badgeProgress.length) {
      setBadgeProgress(cached.badgeProgress);
    }
    if (typeof cached.totalCompletedChapters === "number") {
      setTotalCompletedChapters(cached.totalCompletedChapters);
      setIsLoadingBibleCompletion(false);
    }
    if (Array.isArray(cached.bibleBookProgress)) setBibleBookProgress(cached.bibleBookProgress);
    if (typeof cached.currentBook === "string" || cached.currentBook === null) setCurrentBook(cached.currentBook);
    if (cached.activePremiumSkinId) setActivePremiumSkinId(normalizePremiumSkinId(cached.activePremiumSkinId));
    if (cached.dashboardThemeId) setDashboardThemeId(normalizeAppThemeId(cached.dashboardThemeId));
  }, [dashboardStatsCacheKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const appliedSkinName = window.localStorage.getItem("bb:skin-applied-confirmation");
    if (!appliedSkinName) return;
    window.localStorage.removeItem("bb:skin-applied-confirmation");
    setSkinAppliedCongrats({ skinName: appliedSkinName });
  }, []);

  useEffect(() => {
    if (!dashboardStatsCacheKey || typeof window === "undefined") return;
    const hasUsefulStats = Boolean(profile || levelInfo || badgeProgress.length || totalCompletedChapters > 0 || bibleBookProgress.length);
    if (!hasUsefulStats) return;
    writePerformanceCache(dashboardStatsCacheKey, {
      profile,
      levelInfo,
      badgeProgress,
      totalCompletedChapters,
      bibleBookProgress,
      currentBook,
      activePremiumSkinId,
      dashboardThemeId,
    }, 1000 * 60 * 60 * 18);
  }, [activePremiumSkinId, badgeProgress, bibleBookProgress, currentBook, dashboardStatsCacheKey, dashboardThemeId, levelInfo, profile, totalCompletedChapters]);

  useEffect(() => {
    let didCancel = false;
    async function loadLevelDataAndMaybeResetCredits() {
      if (!userId) {
        setIsLoadingLevel(false);
        return;
      }

      if (!levelInfo) setIsLoadingLevel(true);
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

        let { data, error } = await supabase
          .from("profile_stats")
          .select("total_actions, current_level, is_paid, daily_credits, last_active_date, verse_of_the_day_shown, current_streak, grace_days_count, diamonds_count, selected_streak_flame, selected_buddy_avatar, active_premium_skin, active_premium_skin_selected_at, app_theme, daily_login_gift_last_visit_at, daily_login_gift_last_shown_date, profile_image_url, display_name, username, created_at")
          .eq("user_id", userId)
          .maybeSingle();

        if (error && /active_premium_skin_selected_at/i.test(error.message || "")) {
          const fallback = await supabase
            .from("profile_stats")
            .select("total_actions, current_level, is_paid, daily_credits, last_active_date, verse_of_the_day_shown, current_streak, grace_days_count, diamonds_count, selected_streak_flame, selected_buddy_avatar, active_premium_skin, app_theme, daily_login_gift_last_visit_at, daily_login_gift_last_shown_date, profile_image_url, display_name, username, created_at")
            .eq("user_id", userId)
            .maybeSingle();
          data = fallback.data as typeof data;
          error = fallback.error;
        } else if (error && /(diamonds_count|selected_streak_flame|selected_buddy_avatar|active_premium_skin|app_theme|daily_login_gift_last_visit_at|daily_login_gift_last_shown_date)/i.test(error.message || "")) {
          const fallback = await supabase
            .from("profile_stats")
            .select("total_actions, current_level, is_paid, daily_credits, last_active_date, verse_of_the_day_shown, current_streak, grace_days_count, profile_image_url, display_name, username, created_at")
            .eq("user_id", userId)
            .maybeSingle();
          data = fallback.data as typeof data;
          error = fallback.error;
        }

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        const profileData = data;
        const todayKey = getBibleBuddyLocalDayKey();
        const nowIso = new Date().toISOString();
        const nowMs = Date.now();
        const dailyGiftShownKey = getDailyLoginGiftShownKey(userId, todayKey);
        const localLastVisitKey = getDailyLoginGiftLastVisitKey(userId);
        const dailyGiftFirstUseKey = getDailyLoginGiftFirstUseKey(userId, todayKey);
        let firstUseAt =
          typeof window !== "undefined" ? window.localStorage.getItem(dailyGiftFirstUseKey) : null;
        if (!firstUseAt && typeof window !== "undefined") {
          firstUseAt = nowIso;
          window.localStorage.setItem(dailyGiftFirstUseKey, firstUseAt);
        }
        const firstUseMs = firstUseAt ? new Date(firstUseAt).getTime() : nowMs;
        const hasWaitedSinceFirstUse =
          Number.isFinite(firstUseMs) &&
          firstUseMs > 0 &&
          nowMs - firstUseMs >= DAILY_LOGIN_GIFT_MIN_DELAY_MS;
        const dailyGiftAlreadyShown =
          profileData?.daily_login_gift_last_shown_date === todayKey ||
          (typeof window !== "undefined" && window.localStorage.getItem(dailyGiftShownKey) === "1");
        const shouldShowDailyLoginGift = !dailyGiftAlreadyShown && hasWaitedSinceFirstUse;

        if (typeof window !== "undefined") {
          window.localStorage.setItem(localLastVisitKey, nowIso);
        }
        const { error: dailyGiftVisitError } = await supabase
          .from("profile_stats")
          .update({
            daily_login_gift_last_visit_at: nowIso,
            ...(shouldShowDailyLoginGift ? { daily_login_gift_last_shown_date: todayKey } : {}),
          })
          .eq("user_id", userId);

        if (dailyGiftVisitError && !/(daily_login_gift_last_visit_at|daily_login_gift_last_shown_date)/i.test(dailyGiftVisitError.message || "")) {
          console.warn("[DAILY_LOGIN_GIFT] Could not update login gift tracking:", dailyGiftVisitError.message);
        }
        if (shouldShowDailyLoginGift && typeof window !== "undefined") {
          window.localStorage.setItem(dailyGiftShownKey, "1");
        }

        if (!didCancel) {
          const localSelectedBuddy =
            typeof window !== "undefined" ? window.localStorage.getItem(SELECTED_BUDDY_STORAGE_KEY) : null;
          const localSelectedFlame =
            typeof window !== "undefined" ? window.localStorage.getItem(ACTIVE_STREAK_FLAME_STORAGE_KEY) : null;
          const dbSelectedFlame = normalizeFlameCosmeticId(profileData?.selected_streak_flame);
          const hasActiveSkinColumn = Boolean(profileData && "active_premium_skin" in profileData);
          const dbActiveSkin = normalizePremiumSkinId(hasActiveSkinColumn ? profileData?.active_premium_skin : null);
          const legacyMappedSkin =
            getPremiumSkinForLegacyTheme(profileData?.app_theme) !== "none"
              ? getPremiumSkinForLegacyTheme(profileData?.app_theme)
              : getPremiumSkinForLegacyFlame(profileData?.selected_streak_flame);
          const candidateActiveSkin = hasActiveSkinColumn ? dbActiveSkin : legacyMappedSkin;
          const resolvedActiveSkin = await canUsePremiumSkin(candidateActiveSkin) ? candidateActiveSkin : "none";
          clearLegacyPremiumSkinCache();
          cachePremiumSkinForUser(userId, resolvedActiveSkin);
          setActivePremiumSkinId(resolvedActiveSkin);
          applyPremiumSkinToDocument(resolvedActiveSkin);
          preloadActiveSkinAssets(resolvedActiveSkin);
          const skinFlame = getPremiumSkinFlameId(resolvedActiveSkin);
          const resolvedSelectedFlame = skinFlame ?? (dbSelectedFlame !== "default" ? dbSelectedFlame : normalizeFlameCosmeticId(localSelectedFlame));
          if (skinFlame) persistActiveStreakFlame(skinFlame);
          if (candidateActiveSkin !== resolvedActiveSkin && dbActiveSkin !== "none") {
            void supabase
              .from("profile_stats")
              .update({ active_premium_skin: "none", updated_at: new Date().toISOString() })
              .eq("user_id", userId);
          } else if (resolvedActiveSkin !== "none" && dbActiveSkin !== resolvedActiveSkin) {
            void supabase
              .from("profile_stats")
              .upsert(
                { user_id: userId, active_premium_skin: resolvedActiveSkin, active_premium_skin_selected_at: profileData?.active_premium_skin_selected_at ?? new Date().toISOString(), updated_at: new Date().toISOString() },
                { onConflict: "user_id" },
              );
          }
          if (skinFlame && dbSelectedFlame !== skinFlame) {
            void supabase
              .from("profile_stats")
              .update({ selected_streak_flame: skinFlame, updated_at: new Date().toISOString() })
              .eq("user_id", userId);
          }
          setProfile({
            is_paid: profileData?.is_paid === true,
            daily_credits: typeof profileData?.daily_credits === "number" ? profileData.daily_credits : 0,
            last_active_date: profileData?.last_active_date ?? null,
            verse_of_the_day_shown: profileData?.verse_of_the_day_shown ?? null,
            current_streak: profileData?.current_streak ?? 0,
            grace_days_count: Math.max(0, Math.min(5, Number(profileData?.grace_days_count ?? 0))),
            diamonds_count: typeof profileData?.diamonds_count === "number" ? Math.max(0, profileData.diamonds_count) : null,
            selected_streak_flame: resolvedSelectedFlame,
            selected_buddy_avatar: normalizeBuddyAvatarId(profileData?.selected_buddy_avatar || localSelectedBuddy),
            daily_login_gift_last_visit_at: nowIso,
            daily_login_gift_last_shown_date: shouldShowDailyLoginGift ? todayKey : profileData?.daily_login_gift_last_shown_date ?? null,
            profile_image_url: profileData?.profile_image_url ?? null,
            display_name: profileData?.display_name ?? null,
            username: profileData?.username ?? null,
            created_at: profileData?.created_at ?? null,
          });
          if (shouldShowDailyLoginGift && dailyLoginGiftCheckRef.current !== dailyGiftShownKey) {
            dailyLoginGiftCheckRef.current = dailyGiftShownKey;
            setDailyLoginGiftReveal({ status: "closed", reward: rollMysteryPrizeReward() });
          }
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
            diamonds_count: current.diamonds_count ?? null,
            selected_streak_flame: current.selected_streak_flame ?? "default",
            selected_buddy_avatar: current.selected_buddy_avatar ?? "louis",
          } : current);
        }

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
        const storedCurrentLevel =
          typeof profileData?.current_level === "number" && profileData.current_level > 0
            ? profileData.current_level
            : 1;
        const levelData = getLevelInfoWithLevelFloor(baseTotalPoints, storedCurrentLevel);
        const { level, levelName, identityText, encouragementText, levelStart, levelEnd, progressPercent, totalPoints, pointsToNextLevel } = levelData;
        const estimatedDiamondStash = estimateDiamondStashFromActions(actionRows, level);

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
          setProfile((current) =>
            current
              ? {
                  ...current,
                  diamonds_count:
                    typeof current.diamonds_count === "number"
                      ? current.diamonds_count
                      : estimatedDiamondStash,
                }
              : current,
          );
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
              if (window.localStorage.getItem(getLocalBadgePopupSeenKey(userId, badge.id)) === "1") {
                alreadyAwardedBadgeIds.add(badge.id);
              }
            });
          }
          const newlyEarnedBadges = nextBadgeProgress.filter(
            (badge) => badge.current >= badge.target && !alreadyAwardedBadgeIds.has(badge.id) && !seenBadgePopupIds.has(badge.id)
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
                  (badge) => badge.id !== activeId && !existingIds.has(badge.id) && !seenBadgePopupIds.has(badge.id)
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
          .update({ current_level: Math.max(storedCurrentLevel, level) })
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
  }, [userId, levelRefreshTick, isOwnerDashboard, seenBadgePopupIds]);

  useEffect(() => {
    if (!userId || typeof window === "undefined") return;
    const dayKey = getBibleBuddyLocalDayKey();
    const shownKey = getDailyLoginGiftShownKey(userId, dayKey);
    if (profile?.daily_login_gift_last_shown_date === dayKey || window.localStorage.getItem(shownKey) === "1") return;

    const firstUseKey = getDailyLoginGiftFirstUseKey(userId, dayKey);
    let firstUseAt = window.localStorage.getItem(firstUseKey);
    if (!firstUseAt) {
      firstUseAt = new Date().toISOString();
      window.localStorage.setItem(firstUseKey, firstUseAt);
    }

    const firstUseMs = new Date(firstUseAt).getTime();
    if (!Number.isFinite(firstUseMs) || firstUseMs <= 0) return;

    const openGift = () => {
      if (window.localStorage.getItem(shownKey) === "1") return;
      window.localStorage.setItem(shownKey, "1");
      setProfile((current) => current ? { ...current, daily_login_gift_last_shown_date: dayKey } : current);
      setDailyLoginGiftReveal({ status: "closed", reward: rollMysteryPrizeReward() });
      void supabase
        .from("profile_stats")
        .update({
          daily_login_gift_last_shown_date: dayKey,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
    };

    const remainingMs = firstUseMs + DAILY_LOGIN_GIFT_MIN_DELAY_MS - Date.now();
    if (remainingMs <= 0) {
      openGift();
      return;
    }

    const timeoutId = window.setTimeout(openGift, remainingMs);
    return () => window.clearTimeout(timeoutId);
  }, [profile?.daily_login_gift_last_shown_date, userId]);

  useEffect(() => {
    function handleDiamondsAwarded(event: Event) {
      const detail = (event as CustomEvent<{ amount?: number; diamonds?: number }>).detail;
      if (!detail) return;

      setProfile((current) =>
        current
          ? {
              ...current,
              diamonds_count:
                typeof detail.diamonds === "number"
                  ? Math.max(0, detail.diamonds)
                  : Math.max(0, Number(current.diamonds_count ?? 0)) + Math.max(0, Number(detail.amount ?? 0)),
            }
          : current,
      );
    }

    window.addEventListener("bb:diamonds-awarded", handleDiamondsAwarded);
    return () => window.removeEventListener("bb:diamonds-awarded", handleDiamondsAwarded);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function handleStreakFlameChanged(event: Event) {
      const customEvent = event as CustomEvent<{ flameId?: string }>;
      const skinLockedFlame = getLocalSkinLockedFlameId();
      const nextFlameId = skinLockedFlame ?? normalizeFlameCosmeticId(
        customEvent.detail?.flameId || window.localStorage.getItem(ACTIVE_STREAK_FLAME_STORAGE_KEY),
      );
      persistActiveStreakFlame(nextFlameId);
      setProfile((current) => current ? { ...current, selected_streak_flame: nextFlameId } : current);
    }

    window.addEventListener("bb:streak-flame-changed", handleStreakFlameChanged);
    return () => window.removeEventListener("bb:streak-flame-changed", handleStreakFlameChanged);
  }, []);

  useEffect(() => {
    const buddy = getBuddyAvatar(normalizeBuddyAvatarId(profile?.selected_buddy_avatar));
    preloadImage(buddy.profileImage, "high");
  }, [profile?.selected_buddy_avatar]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(BUDDY_SELECTION_DASHBOARD_HANDOFF_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as { buddyId?: string; buddyName?: string; createdAt?: number };
      const createdAt = Number(parsed.createdAt || 0);
      if (createdAt && Date.now() - createdAt > 5 * 60 * 1000) {
        window.localStorage.removeItem(BUDDY_SELECTION_DASHBOARD_HANDOFF_KEY);
        return;
      }
      const buddyId = normalizeBuddyAvatarId(parsed.buddyId);
      const buddy = getBuddyAvatar(buddyId);
      window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, buddyId);
      window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed", { detail: { buddyId } }));
      setBuddySelectionWelcome({
        buddyId,
        buddyName: parsed.buddyName || buddy.name,
      });
      setProfile((current) => current ? { ...current, selected_buddy_avatar: buddyId } : current);
    } catch {
      // Ignore malformed handoffs and clear them so they do not keep retrying.
    } finally {
      window.localStorage.removeItem(BUDDY_SELECTION_DASHBOARD_HANDOFF_KEY);
    }
  }, []);

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
    setShowVerseOfTheDayModal(false);
    setPendingDailyStreakSequence(true);
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
      buddySelectionWelcome ||
      activeEarnedBadge ||
      earnedBadgeQueue.length > 0 ||
      dailyLoginGiftReveal ||
      moderatorWeeklyPayoutReveal ||
      storePurchaseCongrats ||
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
      Boolean(activeStorePromo) ||
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
    const stepKey = getDailyPopupStepKey(userId, dayKey);
    const lastShownKey = getDailyPopupLastShownKey(userId, dayKey);
    const stepIndex = Number(window.localStorage.getItem(stepKey) || "0");
    const dailyPopupStep = getDailyPopupStep(stepIndex);
    const lastShownAt = Number(window.localStorage.getItem(lastShownKey) || "0");
    const popupCooldownMs = dailyPopupStep === "mystery" ? DAILY_LOGIN_GIFT_MIN_DELAY_MS : DASHBOARD_LOUIS_CHECKIN_COOLDOWN_MS;
    const dailyPopupQueueItem: PopupQueueItem = {
      popup_id: `dashboard:${dailyPopupStep}:${dayKey}`,
      type: dailyPopupStep === "store_buddies" || dailyPopupStep === "store_diamonds" ? "store_promo" : "daily_guidance",
      priority:
        dailyPopupStep === "store_buddies" || dailyPopupStep === "store_diamonds"
          ? POPUP_QUEUE_PRIORITIES.storePromo
          : POPUP_QUEUE_PRIORITIES.dailyGuidance,
      user_id: userId,
      cooldown: popupCooldownMs,
    };
    if (!getActivePopupFromQueue([dailyPopupQueueItem], nowMs)) {
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
      setPendingDailyStreakSequence(false);
      dailyStreakSequenceCheckRef.current = null;
      return;
    }
    if (stepIndex > 0 && lastShownAt && nowMs - lastShownAt < popupCooldownMs) {
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

    function markDailyPopupShown() {
      window.localStorage.setItem(stepKey, String(stepIndex + 1));
      window.localStorage.setItem(lastShownKey, String(Date.now()));
      window.localStorage.setItem(getDashboardLouisCheckInLastShownKey(currentUserId), String(Date.now()));
      markPopupShown(dailyPopupQueueItem);
      setPendingDailyStreakSequence(false);
      dailyStreakSequenceCheckRef.current = null;
    }

    function openNextDailyPopup() {
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);

      if (dailyPopupStep === "mystery") {
        const dailyGiftShownKey = getDailyLoginGiftShownKey(currentUserId, dayKey);
        const dailyGiftFirstUseKey = getDailyLoginGiftFirstUseKey(currentUserId, dayKey);
        let firstUseAt = window.localStorage.getItem(dailyGiftFirstUseKey);
        if (!firstUseAt) {
          firstUseAt = new Date().toISOString();
          window.localStorage.setItem(dailyGiftFirstUseKey, firstUseAt);
        }
        const firstUseMs = new Date(firstUseAt).getTime();
        const hasWaitedSinceFirstUse =
          Number.isFinite(firstUseMs) &&
          firstUseMs > 0 &&
          Date.now() - firstUseMs >= DAILY_LOGIN_GIFT_MIN_DELAY_MS;
        const dailyGiftAlreadyShown =
          profile?.daily_login_gift_last_shown_date === dayKey ||
          window.localStorage.getItem(dailyGiftShownKey) === "1";
        if (dailyGiftAlreadyShown) {
          markDailyPopupShown();
          return true;
        }
        if (!hasWaitedSinceFirstUse) {
          setPendingDailyStreakSequence(false);
          dailyStreakSequenceCheckRef.current = null;
          return true;
        }

        window.localStorage.setItem(dailyGiftShownKey, "1");
        setDailyLoginGiftReveal({ status: "closed", reward: rollMysteryPrizeReward() });
        setProfile((current) => current ? { ...current, daily_login_gift_last_shown_date: dayKey } : current);
        void supabase
          .from("profile_stats")
          .update({
            daily_login_gift_last_shown_date: dayKey,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", currentUserId);
        markDailyPopupShown();
        return true;
      }

      if (dailyPopupStep === "store_buddies" || dailyPopupStep === "store_diamonds") {
        setActiveStorePromo(dailyPopupStep === "store_buddies" ? "buddies" : "diamonds");
        markDailyPopupShown();
        return true;
      }

      if (dailyPopupStep === "share_howto" || dailyPopupStep === "invite_howto") {
        const sharePopupId = dailyPopupStep === "share_howto" ? "how-to-share-bible-buddy" : "how-to-invite-bible-buddies";
        const selectedTip = buildDashboardLouisNudgePool().find((item) => item.id === sharePopupId) ?? pickDashboardLouisNudge(currentUserId, dayKey);
        setStreakMotivationModalMode("checkin");
        setShowStreakMotivationTaskPrompt(false);
        setLouisDashboardNudge(selectedTip);
        setShowStreakMotivationModal(true);
        markDailyPopupShown();
        return true;
      }

      if (dailyPopupStep === "bible_tip") {
        const tips = buildDashboardLouisNudgePool().filter(
          (item) =>
            item.action === "dismiss" &&
            (item.category === "habit" || item.category === "bible_fact" || item.category === "share" || item.eyebrow.toLowerCase().includes("tip")),
        );
        const rotationKey = getBibleTipPopupRotationKey(currentUserId);
        const tipRotationIndex = Number(window.localStorage.getItem(rotationKey) || "0");
        const selectedTip = tips[Math.abs(tipRotationIndex) % Math.max(tips.length, 1)] ?? pickDashboardLouisNudge(currentUserId, dayKey);
        window.localStorage.setItem(rotationKey, String(tipRotationIndex + 1));
        setStreakMotivationModalMode("checkin");
        setShowStreakMotivationTaskPrompt(false);
        setLouisDashboardNudge(selectedTip);
        setShowStreakMotivationModal(true);
        markDailyPopupShown();
        return true;
      }

      return false;
    }

    async function openDailyStreakPopupIfNeeded() {
      if (dailyPopupStep !== "streak" && openNextDailyPopup()) return;

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
      window.localStorage.setItem(getStreakMotivationSeenKey(currentUserId, dayKey), "1");
      window.localStorage.setItem(getDashboardDailySequenceSeenKey(currentUserId, dayKey), "1");
      const countKey = getDashboardLouisCheckInCountKey(currentUserId, dayKey);
      const nextCount = Number(window.localStorage.getItem(countKey) || "0") + 1;
      window.localStorage.setItem(countKey, String(nextCount));
      markDailyPopupShown();
    }

    void openDailyStreakPopupIfNeeded();

    return () => {
      cancelled = true;
    };
  }, [
    activeEarnedBadge,
    activeTourKey,
    activeStorePromo,
    buddySelectionWelcome,
    dailyChecklistData,
    dailyLoginGiftReveal,
    moderatorWeeklyPayoutReveal,
    earnedBadgeQueue.length,
    pendingDailyStreakSequence,
    profile,
    selectedDashboardTask,
    storePurchaseCongrats,
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
  const dashboardTheme = getAppTheme(dashboardThemeId);
  const activePremiumSkin = getPremiumSkin(activePremiumSkinId);
  const deepStudyButtonColor = activePremiumSkin?.palette.accent || darkenHexColor(dashboardTheme.button || dashboardTheme.accent, dashboardTheme.id === "black" ? 0 : 0.2);
  const isDeepStudyPaidUser = membershipStatus === "pro" || profile?.is_paid === true;
  const deepStudyTodayKey = getDeepStudyLocalDayKey();
  const deepStudyStreak = getDeepStudyStreak(deepStudyHistory, deepStudyTodayKey);
  const deepStudyMultiplier = getDeepStudyMultiplier(deepStudyStreak);
  const deepStudyTodayStats = getDeepStudyDailyStats(deepStudyHistory, deepStudyTodayKey);
  const deepStudyYesterdayStats = getDeepStudyDailyStats(deepStudyHistory, (() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return getDeepStudyLocalDayKey(date);
  })());
  const deepStudyWeekStats = (() => {
    const cutoff = Date.now() - 6 * 24 * 60 * 60 * 1000;
    const weekSessions = deepStudyHistory.filter((session) => new Date(session.startedAt).getTime() >= cutoff);
    const totalMinutes = weekSessions.reduce((sum, session) => sum + session.activeMinutes, 0);
    const weightedFocus = weekSessions.reduce((sum, session) => sum + session.activeMinutes * session.focusScore, 0);
    return {
      sessions: weekSessions.length,
      totalMinutes,
      averageFocus: totalMinutes > 0 ? Math.round(weightedFocus / totalMinutes) : 0,
      diamondsEarned: weekSessions.reduce((sum, session) => sum + session.diamondsEarned, 0),
    };
  })();
  const deepStudyTotalMinutes = deepStudyHistory.reduce((sum, session) => sum + session.activeMinutes, 0);
  const deepStudyDurationOptions = [
    ...(isOwnerDashboard ? [{ minutes: 1, label: "1 minute test", shareDisplayMinutes: 30 }] : []),
    { minutes: 5, label: "5 minutes" },
    ...(isDeepStudyPaidUser ? [{ minutes: 10, label: "10 minutes" }] : []),
    { minutes: 15, label: "15 minutes" },
    { minutes: 20, label: "20 minutes" },
    { minutes: 30, label: "30 minutes" },
    ...(isDeepStudyPaidUser ? [{ minutes: 45, label: "45 minutes" }, { minutes: 60, label: "60 minutes" }] : []),
  ];
  const selectedDeepStudyDuration =
    deepStudyDurationOptions.find((option) => option.minutes === deepStudySelectedMinutes) ?? deepStudyDurationOptions[0];

  useEffect(() => {
    const allowedMinutes = [
      ...(isOwnerDashboard ? [1] : []),
      5,
      ...(isDeepStudyPaidUser ? [10] : []),
      15,
      20,
      30,
      ...(isDeepStudyPaidUser ? [45, 60] : []),
    ];
    if (!allowedMinutes.includes(deepStudySelectedMinutes)) {
      setDeepStudySelectedMinutes(5);
    }
  }, [deepStudySelectedMinutes, isDeepStudyPaidUser, isOwnerDashboard]);

  useEffect(() => {
    if (!userId) {
      setDeepStudyHistory([]);
      return;
    }
    setDeepStudyHistory(loadDeepStudyHistory(userId));
  }, [userId]);

  useEffect(() => {
    if (!userId || typeof window === "undefined") return;
    const currentUserId = userId;
    function handleStorage(event: StorageEvent) {
      if (event.key === getDeepStudyHistoryKey(currentUserId)) {
        setDeepStudyHistory(loadDeepStudyHistory(currentUserId));
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [userId]);

  useEffect(() => {
    if (!deepStudyActiveSession) return;

    function markInteraction() {
      const now = Date.now();
      setDeepStudyActiveSession((current) =>
        current
          ? {
              ...current,
              interactions: current.interactions + 1,
              lastInteractionAt: now,
            }
          : current,
      );
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        setDeepStudyActiveSession((current) =>
          current ? { ...current, interruptions: current.interruptions + 1 } : current,
        );
      } else {
        markInteraction();
      }
    }

    const events: Array<keyof WindowEventMap> = ["click", "keydown", "touchstart", "scroll"];
    events.forEach((eventName) => window.addEventListener(eventName, markInteraction, { passive: true }));
    window.addEventListener("blur", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, markInteraction));
      window.removeEventListener("blur", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [deepStudyActiveSession?.id]);

  useEffect(() => {
    if (!deepStudyActiveSession) return;
    const interval = window.setInterval(() => {
      const now = Date.now();
      setDeepStudyNow(now);
      setDeepStudyActiveSession((current) => {
        if (!current) return current;
        const elapsed = Math.max(0, now - current.lastTickAt);
        const visible = document.visibilityState === "visible" && document.hasFocus();
        const recentlyEngaged = now - current.lastInteractionAt <= 120000;
        const active = visible && recentlyEngaged;
        return {
          ...current,
          lastTickAt: now,
          activeMs: current.activeMs + (active ? elapsed : 0),
          awayMs: current.awayMs + (active ? 0 : elapsed),
          visibleMs: current.visibleMs + (visible ? elapsed : 0),
        };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [deepStudyActiveSession?.id]);

  useEffect(() => {
    if (!deepStudyActiveSession || deepStudyFinalizingRef.current) return;
    if (deepStudyNow >= deepStudyActiveSession.endsAt) {
      void finishDeepStudySession(false);
    }
  }, [deepStudyActiveSession, deepStudyNow]);

  function startDeepStudySession(minutes: number, shareDisplayMinutes?: number) {
    const now = Date.now();
    setDeepStudyResults(null);
    setDeepStudyActiveSession({
      id: `deep-study-${userId || "anon"}-${now}`,
      plannedMinutes: minutes,
      shareDisplayMinutes,
      startedAt: now,
      endsAt: now + minutes * 60 * 1000,
      lastTickAt: now,
      activeMs: 0,
      awayMs: 0,
      visibleMs: 0,
      interruptions: 0,
      interactions: 1,
      lastInteractionAt: now,
      tasksCompleted: 0,
      taskBreakdown: buildEmptyTaskBreakdown(),
      chaptersStudied: [],
    });
    setDeepStudyMode("active");
    setDeepStudyNow(now);
  }

  async function finishDeepStudySession(stoppedEarly = false) {
    if (!userId || !deepStudyActiveSession || deepStudyFinalizingRef.current) return;
    deepStudyFinalizingRef.current = true;
    const endedAtMs = Date.now();
    const activeMinutes = Math.max(0, Math.ceil(deepStudyActiveSession.activeMs / 60000));
    const awayMinutes = Math.max(0, Math.ceil(deepStudyActiveSession.awayMs / 60000));
    const engagementScore = Math.min(20, deepStudyActiveSession.interactions * 1.4 + deepStudyActiveSession.tasksCompleted * 6);
    const visibleRatio = Math.max(0, Math.min(1, deepStudyActiveSession.visibleMs / Math.max(1, endedAtMs - deepStudyActiveSession.startedAt)));
    const interruptionPenalty = Math.min(25, deepStudyActiveSession.interruptions * 5);
    const focusScore = Math.max(
      35,
      Math.min(100, Math.round(visibleRatio * 72 + engagementScore - interruptionPenalty)),
    );
    const historyBeforeSave = loadDeepStudyHistory(userId);
    const dayKey = getDeepStudyLocalDayKey(new Date(deepStudyActiveSession.startedAt));
    const optimisticStreak = getDeepStudyStreak([
      {
        id: deepStudyActiveSession.id,
        userId,
        dayKey,
        startedAt: new Date(deepStudyActiveSession.startedAt).toISOString(),
        endedAt: new Date(endedAtMs).toISOString(),
        plannedMinutes: deepStudyActiveSession.plannedMinutes,
        shareDisplayMinutes: deepStudyActiveSession.shareDisplayMinutes,
        stoppedEarly,
        activeMinutes,
        awayMinutes,
        interruptions: deepStudyActiveSession.interruptions,
        interactions: deepStudyActiveSession.interactions,
        tasksCompleted: deepStudyActiveSession.tasksCompleted,
        taskBreakdown: deepStudyActiveSession.taskBreakdown,
        chaptersStudied: deepStudyActiveSession.chaptersStudied,
        focusScore,
        multiplier: 1,
        streak: 1,
        diamondsEarned: 0,
        themeId: dashboardTheme.id,
        skinId: activePremiumSkinId,
      },
      ...historyBeforeSave,
    ], dayKey);
    const multiplier = getDeepStudyMultiplier(optimisticStreak);
    const diamondsEarned = Math.max(0, Math.floor(activeMinutes * DEEP_STUDY_DIAMONDS_PER_MINUTE * multiplier * (focusScore / 100)));

    const summary: DeepStudySessionSummary = {
      id: deepStudyActiveSession.id,
      userId,
      dayKey,
      startedAt: new Date(deepStudyActiveSession.startedAt).toISOString(),
      endedAt: new Date(endedAtMs).toISOString(),
      plannedMinutes: deepStudyActiveSession.plannedMinutes,
      shareDisplayMinutes: deepStudyActiveSession.shareDisplayMinutes,
      stoppedEarly,
      activeMinutes,
      awayMinutes,
      interruptions: deepStudyActiveSession.interruptions,
      interactions: deepStudyActiveSession.interactions,
      tasksCompleted: deepStudyActiveSession.tasksCompleted,
      taskBreakdown: deepStudyActiveSession.taskBreakdown,
      chaptersStudied: deepStudyActiveSession.chaptersStudied,
      focusScore,
      multiplier,
      streak: optimisticStreak,
      diamondsEarned,
      themeId: dashboardTheme.id,
      skinId: activePremiumSkinId,
    };

    setDeepStudyResults(summary);
    setDeepStudyActiveSession(null);
    setDeepStudyMode("complete");

    const awarded = await awardDiamonds(userId, diamondsEarned);
    const savedSummary = { ...summary, diamondsEarned: awarded };
    saveDeepStudySession(savedSummary);
    setDeepStudyHistory(loadDeepStudyHistory(userId));
    setProfile((current) =>
      current
        ? {
            ...current,
            diamonds_count: Math.max(0, Number(current.diamonds_count ?? 0)) + awarded,
          }
        : current,
    );

    void supabase.from("deep_study_sessions").insert({
      id: savedSummary.id,
      user_id: userId,
      day_key: savedSummary.dayKey,
      planned_minutes: savedSummary.plannedMinutes,
      active_minutes: savedSummary.activeMinutes,
      away_minutes: savedSummary.awayMinutes,
      interruptions: savedSummary.interruptions,
      interactions: savedSummary.interactions,
      tasks_completed: savedSummary.tasksCompleted,
      task_breakdown: savedSummary.taskBreakdown,
      chapters_studied: savedSummary.chaptersStudied,
      focus_score: savedSummary.focusScore,
      multiplier: savedSummary.multiplier,
      deep_study_streak: savedSummary.streak,
      diamonds_earned: savedSummary.diamondsEarned,
      started_at: savedSummary.startedAt,
      ended_at: savedSummary.endedAt,
    }).then(({ error }) => {
      if (error && !/deep_study_sessions/i.test(error.message || "")) {
        console.warn("[DEEP_STUDY] Session saved locally, but database history failed:", error.message);
      }
    });

    setDeepStudyResults(savedSummary);
    deepStudyFinalizingRef.current = false;
  }

  function recordDeepStudyTaskCompletion(task: TaskState) {
    const taskKind = normalizeDeepStudyTaskKind(task.kind);
    if (!taskKind) return;
    const chapterLabel = task.chapterLabel || (task.book && task.chapter ? `${task.book} ${task.chapter}` : null);
    setDeepStudyActiveSession((current) => {
      if (!current) return current;
      return {
        ...current,
        tasksCompleted: current.tasksCompleted + 1,
        interactions: current.interactions + 3,
        lastInteractionAt: Date.now(),
        taskBreakdown: {
          ...current.taskBreakdown,
          [taskKind]: current.taskBreakdown[taskKind] + 1,
        },
        chaptersStudied: chapterLabel && !current.chaptersStudied.includes(chapterLabel)
          ? [...current.chaptersStudied, chapterLabel]
          : current.chaptersStudied,
      };
    });
  }
  const dashboardChecklistLoading = isLoadingDailyTaskSummary && Boolean(dailyChecklistData);
  const completedChapterLabel =
    dashboardChecklistData.tasks.find((task) => task.kind === "reading")?.chapterLabel ||
    dashboardChecklistData.tasks.find((task) => task.chapterLabel)?.chapterLabel ||
    "this chapter";
  const buddyWelcomeStudyTitle =
    dashboardChecklistData.tasks.find((task) => task.devotionalTitle)?.devotionalTitle ||
    dashboardChecklistData.title ||
    "your current Bible study";
  const buddySelectionCopy = buddySelectionWelcome
    ? getBuddySelectionPopupCopy(buddySelectionWelcome.buddyId, { studyTitle: buddyWelcomeStudyTitle })
    : null;
  const purchasedBuddyId =
    storePurchaseCongrats?.item.kind === "buddy"
      ? normalizeBuddyAvatarId(storePurchaseCongrats.item.id === "buddy-lil-louis" ? "louis" : storePurchaseCongrats.item.id.replace("buddy-", ""))
      : null;
  const dashboardRewardPopupQueue: PopupQueueItem[] = [
    ...(storePurchaseCongrats
      ? [{ popup_id: "dashboard:reward:store-purchase", type: "reward" as const, priority: POPUP_QUEUE_PRIORITIES.reward + 40, user_id: userId, payload: storePurchaseCongrats }]
      : []),
    ...(dailyLoginGiftReveal
      ? [{ popup_id: "dashboard:reward:daily-login-gift", type: "reward" as const, priority: POPUP_QUEUE_PRIORITIES.reward + 30, user_id: userId, payload: dailyLoginGiftReveal }]
      : []),
    ...(moderatorWeeklyPayoutReveal
      ? [{ popup_id: "dashboard:reward:moderator-weekly-payout", type: "reward" as const, priority: POPUP_QUEUE_PRIORITIES.reward + 28, user_id: userId, payload: moderatorWeeklyPayoutReveal }]
      : []),
    ...(activeEarnedBadge
      ? [{ popup_id: `dashboard:reward:badge:${activeEarnedBadge.id}`, type: "reward" as const, priority: POPUP_QUEUE_PRIORITIES.reward + 20, user_id: userId, payload: activeEarnedBadge }]
      : []),
    ...(buddySelectionWelcome
      ? [{ popup_id: "dashboard:reward:buddy-selection", type: "reward" as const, priority: POPUP_QUEUE_PRIORITIES.reward + 10, user_id: userId, payload: buddySelectionWelcome }]
      : []),
  ];
  const activeDashboardRewardPopup = getActivePopupFromQueue(dashboardRewardPopupQueue);
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

    const cachedChecklist = readPerformanceCache<ChecklistData>(`daily-task-summary:${loadKey}`);
    if (!options.force && cachedChecklist) {
      setIsLoadingDailyTaskSummary(false);
      setDailyChecklistData(cachedChecklist);
      dailyChecklistDataRef.current = cachedChecklist;
      setDailyTaskCompletedCount(cachedChecklist.completedCount);
      setDailyTaskTotalCount(cachedChecklist.tasks.length || 5);
      setDailyTaskNextTitle(cachedChecklist.nextTaskTitle);
      setDailyTaskSummaryLine(cachedChecklist.summaryLine);
      prefetchChecklistRoutes(cachedChecklist);
    }

    const hasExistingChecklist = Boolean(dailyChecklistDataRef.current);
    if (!options.silent && !hasExistingChecklist) {
      setIsLoadingDailyTaskSummary(true);
    }

    const loadPromise = (async () => {
      const previousChecklistData = dailyChecklistDataRef.current;
      const checklistData = await Promise.race<ChecklistData>([
        fetchLouisDailyChecklistData(
          userId,
          currentStreak,
          activeCycleStartedAt,
        ),
        new Promise<ChecklistData>((resolve) => {
          window.setTimeout(() => {
            console.warn("[DASHBOARD] Daily task summary was slow; showing fallback tasks.");
            resolve(previousChecklistData ?? buildChooseDevotionalChecklistData(userId));
          }, DAILY_TASK_SUMMARY_TIMEOUT_MS);
        }),
      ]);
      setDailyChecklistData(checklistData);
      dailyChecklistDataRef.current = checklistData;
      setDailyTaskCompletedCount(checklistData.completedCount);
      setDailyTaskTotalCount(checklistData.tasks.length || 5);
      setDailyTaskNextTitle(checklistData.nextTaskTitle);
      setDailyTaskSummaryLine(checklistData.summaryLine);
      dailyTaskSummaryLoadedKeyRef.current = loadKey;
      writePerformanceCache(`daily-task-summary:${loadKey}`, checklistData, 1000 * 60 * 60 * 10);
      prefetchChecklistRoutes(checklistData);

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
      const message = error instanceof Error ? error.message : String(error);
      if (message.toLowerCase().includes("timed out")) {
        console.warn("[DASHBOARD] Daily task summary was slow; showing fallback tasks.", error);
      } else {
        console.error("[DASHBOARD] Could not load daily task summary:", error);
      }
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
  }, [currentStreak, louisDailyTaskCycleStartedAt, prefetchChecklistRoutes, userId]);

  useEffect(() => {
    void loadDailyTaskSummary();
  }, [loadDailyTaskSummary]);

  useEffect(() => {
    function refreshDailyTaskSummary() {
      const now = Date.now();
      if (now - dailyTaskRefreshLastRunRef.current < 15000) return;
      dailyTaskRefreshLastRunRef.current = now;
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
    setSelectedDashboardTask((current) => {
      const isSameTask =
        current?.kind === task.kind &&
        (current.href || "") === (task.href || "") &&
        (current.chapterLabel || "") === (task.chapterLabel || "");
      return isSameTask ? null : task;
    });
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
      subtitle: "Guided chapter studies with reading, notes, trivia, and reflection",
      href: "/bible-studies",
      eyebrow: "Chapter Journeys",
      emoji: "🌅",
      accent: "border-teal-200 bg-teal-100",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible_studies", "/bible-studies"),
    },
    {
      key: "group",
      title: "Community",
      subtitle: "Study, pray, ask questions, and grow with Bible Buddies",
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
  const dashboardNudgeTone = (() => {
    const category = displayedDashboardNudge.category ?? "discovery";
    if (category === "habit") {
      return {
        icon: "📖",
        glow: "from-[#eaf6ff] via-white to-[#fff4d8]",
        badge: "bg-[#fff4d8] text-[#8a5a00] border-[#f1d892]",
        tile: "bg-[#fff4d8]",
        button: "bg-[#f5c542] text-[#1f2a44] hover:bg-[#efbd2d]",
      };
    }
    if (category === "bible_fact") {
      return {
        icon: "💡",
        glow: "from-[#eefbf4] via-white to-[#edf7ff]",
        badge: "bg-[#e7f8ee] text-[#116b35] border-[#bfe8cc]",
        tile: "bg-[#e7f8ee]",
        button: "bg-[#34c77b] text-white hover:bg-[#2fb870]",
      };
    }
    if (category === "share") {
      return {
        icon: "↗",
        glow: "from-[#eef7ff] via-white to-[#edfdf7]",
        badge: "bg-[#eaf5ff] text-[#155e91] border-[#bfe1f7]",
        tile: "bg-[#eaf5ff]",
        button: "bg-[#2f7fe8] text-white hover:bg-[#256fd1]",
      };
    }
    if (category === "progress") {
      return {
        icon: "✨",
        glow: "from-[#eef4ff] via-white to-[#f2ecff]",
        badge: "bg-[#edf2ff] text-[#3f5fa8] border-[#c9d7ff]",
        tile: "bg-[#edf2ff]",
        button: "bg-[#7BAFD4] text-slate-950 hover:bg-[#6aa3cc]",
      };
    }
    return {
      icon: "🧭",
      glow: "from-[#f3f7ff] via-white to-[#eefbf4]",
      badge: "bg-[#edf7ff] text-[#346792] border-[#c8dfef]",
      tile: "bg-[#edf7ff]",
      button: "bg-[#7BAFD4] text-slate-950 hover:bg-[#6aa3cc]",
    };
  })();

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
      return;
    }

    if (nudge.action === "share-tab") {
      window.dispatchEvent(new CustomEvent("bb:dashboard-show-share-tab"));
    }
  }

  function scheduleChapterCompleteCelebration(journeyKey: string | null | undefined, options?: { force?: boolean }) {
    if (!userId || !journeyKey) return;

    if (!hasLouisChapterJourneyBonusAwarded(userId, journeyKey)) {
      rememberLouisChapterJourneyBonusAwarded(userId, journeyKey);
      triggerPoints(TASK_XP.chapterBonus);
      void awardDiamonds(userId, DIAMOND_REWARDS.fullChapter);
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
      if (deepStudyActiveSession) {
        recordDeepStudyTaskCompletion(completedTask);
      }
      setSelectedDashboardTask(null);
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

  async function buildDeepStudyShareImage(summary: DeepStudySessionSummary) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is unavailable.");
    const skin = getPremiumSkin(summary.skinId);
    const theme = skin?.palette ?? getAppTheme(summary.themeId);
    const accent = theme.accent;
    const darkAccent = darkenHexColor(accent, 0.34);
    const displayMinutes = summary.shareDisplayMinutes ?? summary.activeMinutes;

    if (skin) {
      try {
        const image = await loadCanvasImage(skin.backgroundImage);
        const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        ctx.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      } catch {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, theme.background);
        gradient.addColorStop(1, theme.surfaceSoft);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.fillStyle = "rgba(0,0,0,0.42)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, summary.themeId === "dark" || summary.themeId === "black" ? "#101827" : theme.background);
      gradient.addColorStop(1, summary.themeId === "dark" || summary.themeId === "black" ? "#172033" : theme.surfaceSoft);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const glow = ctx.createRadialGradient(540, 430, 80, 540, 430, 620);
    glow.addColorStop(0, `${accent}66`);
    glow.addColorStop(0.54, `${accent}20`);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = skin ? "rgba(4, 10, 22, 0.62)" : "rgba(255,255,255,0.78)";
    roundRect(ctx, 82, 150, 916, 1398, 68);
    ctx.fill();
    ctx.strokeStyle = skin ? `${accent}AA` : `${accent}72`;
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.fillStyle = `${accent}2D`;
    roundRect(ctx, 135, 205, 810, 410, 46);
    ctx.fill();
    ctx.strokeStyle = `${accent}66`;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = skin ? theme.accent : darkAccent;
    ctx.font = "900 34px Arial";
    ctx.textAlign = "center";
    ctx.fillText("DEEP STUDY COMPLETE", 540, 300);

    ctx.fillStyle = theme.textPrimary;
    ctx.font = "900 72px Arial";
    wrapCanvasText(ctx, "I just studied the Bible for", 540, 405, 780, 80);
    ctx.font = "900 118px Arial";
    ctx.fillText(`${displayMinutes} minute${displayMinutes === 1 ? "" : "s"}`, 540, 560);

    const rows = [
      ["Focus score", `${summary.focusScore}%`],
      ["Deep Study streak", `${summary.streak} day${summary.streak === 1 ? "" : "s"}`],
      ["Tasks completed", String(summary.tasksCompleted)],
      ["Diamonds earned", `+${summary.diamondsEarned}`],
    ];
    rows.forEach(([label, value], index) => {
      const x = index % 2 === 0 ? 135 : 555;
      const y = 720 + Math.floor(index / 2) * 190;
      ctx.fillStyle = skin ? "rgba(255,255,255,0.11)" : `${accent}22`;
      roundRect(ctx, x, y, 390, 145, 34);
      ctx.fill();
      ctx.fillStyle = theme.textSecondary;
      ctx.font = "800 26px Arial";
      ctx.textAlign = "center";
      ctx.fillText(label.toUpperCase(), x + 195, y + 48);
      ctx.fillStyle = skin ? theme.textPrimary : darkAccent;
      ctx.font = "900 46px Arial";
      ctx.fillText(value, x + 195, y + 105);
    });

    ctx.fillStyle = skin ? "rgba(255,255,255,0.1)" : `${accent}18`;
    roundRect(ctx, 135, 1132, 810, 178, 42);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.fillStyle = theme.textPrimary;
    ctx.font = "800 42px Arial";
    wrapCanvasText(ctx, "Building a Bible habit one focused session at a time.", 540, 1210, 720, 52);

    ctx.fillStyle = skin ? theme.accent : darkAccent;
    ctx.font = "900 42px Arial";
    ctx.fillText("Start your own study rhythm", 540, 1418);
    ctx.fillStyle = theme.textPrimary;
    ctx.font = "900 54px Arial";
    ctx.fillText("MyBibleBuddy.net", 540, 1492);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not generate share image."));
      }, "image/png");
    });
  }

  function loadCanvasImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not load share card background."));
      image.src = src;
    });
  }

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

  function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(" ");
    let line = "";
    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, y);
        line = word;
        y += lineHeight;
      } else {
        line = testLine;
      }
    });
    if (line) ctx.fillText(line, x, y);
  }

  async function shareDeepStudyResults(summary: DeepStudySessionSummary, target: "share" | "save" = "share") {
    if (deepStudyShareBusy) return;
    setDeepStudyShareBusy(true);
    try {
      const blob = await buildDeepStudyShareImage(summary);
      const file = new File([blob], "bible-buddy-deep-study.png", { type: "image/png" });
      if (target === "share" && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Bible Buddy Deep Study",
          text: "Deep Study Complete",
          files: [file],
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "bible-buddy-deep-study.png";
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("[DEEP_STUDY] Could not share results:", error);
    } finally {
      setDeepStudyShareBusy(false);
    }
  }

  function renderDeepStudyCard() {
    if (deepStudyMode === "active" && deepStudyActiveSession) {
      const secondsLeft = Math.max(0, Math.ceil((deepStudyActiveSession.endsAt - deepStudyNow) / 1000));
      const activeMinutes = Math.ceil(deepStudyActiveSession.activeMs / 60000);
      return (
        <div className="rounded-[26px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-5 text-center shadow-[0_14px_34px_rgba(38,63,99,0.12)]">
          <p className="text-5xl font-black leading-none text-[var(--bb-text-primary)]">{formatDeepStudyTime(secondsLeft)}</p>
          <p className="mt-2 text-sm font-black text-[var(--bb-accent)]">left</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-black">
            <div className="rounded-2xl bg-[var(--bb-surface-soft)] px-2 py-2 leading-tight">⏳ {activeMinutes}m focused time</div>
            <div className="rounded-2xl bg-[var(--bb-surface-soft)] px-2 py-2 leading-tight">✅ {deepStudyActiveSession.tasksCompleted} tasks done</div>
            <div className="rounded-2xl bg-[var(--bb-surface-soft)] px-2 py-2 leading-tight">📖 {deepStudyActiveSession.chaptersStudied.length} chapters studied</div>
          </div>
          <p className="mt-3 text-xs font-semibold text-[var(--bb-text-muted)]">Stay with Scripture to maximize rewards.</p>
          <button
            type="button"
            onClick={() => void finishDeepStudySession(true)}
            disabled={deepStudyFinalizingRef.current}
            className="mt-4 w-full rounded-full border border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] px-5 py-3 text-sm font-black text-[var(--bb-text-primary)] transition hover:bg-white disabled:opacity-60"
          >
            {deepStudyFinalizingRef.current ? "Stopping..." : "Stop"}
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => setDeepStudyMode("setup")}
        className="group relative block w-full overflow-hidden rounded-[28px] border border-white/30 px-6 py-7 text-center text-white ring-2 ring-white/15 transition duration-200 hover:-translate-y-1 hover:brightness-105 active:translate-y-1"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${deepStudyButtonColor} 76%, white) 0%, ${deepStudyButtonColor} 54%, color-mix(in srgb, ${deepStudyButtonColor} 70%, black) 100%)`,
          boxShadow: `
            0 9px 0 color-mix(in srgb, ${deepStudyButtonColor} 60%, black),
            0 18px 34px color-mix(in srgb, ${deepStudyButtonColor} 32%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.36),
            inset 0 -10px 18px rgba(0,0,0,0.2)
          `,
        }}
      >
        <span className="pointer-events-none absolute inset-x-4 top-2 h-8 rounded-full bg-white/20 blur-md transition group-hover:bg-white/25" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.32),transparent_36%)]" aria-hidden="true" />
        <p className="relative text-3xl font-black leading-tight drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]">Deep Study Mode</p>
      </button>
    );
  }

  function renderDeepStudyCardStyles() {
    return (
      <style>{`
        .bb-deep-study-entry::before,
        .bb-deep-study-entry::after,
        .bb-deep-study-focus-panel::before,
        .bb-deep-study-focus-panel::after {
          content: "";
          position: absolute;
          pointer-events: none;
          inset: 0;
        }
        .bb-deep-study-entry::before,
        .bb-deep-study-focus-panel::before {
          background:
            radial-gradient(circle at 14% 18%, color-mix(in srgb, var(--bb-accent) 34%, transparent), transparent 30%),
            radial-gradient(circle at 92% 16%, color-mix(in srgb, var(--bb-accent-soft) 44%, transparent), transparent 32%),
            linear-gradient(135deg, color-mix(in srgb, var(--bb-card) 58%, transparent), rgba(8, 10, 16, 0.18));
          opacity: 0.95;
        }
        .bb-deep-study-entry::after,
        .bb-deep-study-focus-panel::after {
          background:
            radial-gradient(circle, rgba(255,255,255,0.58) 0 1px, transparent 1.5px) 8% 20% / 74px 74px,
            radial-gradient(circle, color-mix(in srgb, var(--bb-accent) 48%, transparent) 0 1px, transparent 1.6px) 52% 30% / 92px 92px;
          animation: bb-deep-study-stars 12s linear infinite;
          opacity: 0.42;
        }
        .bb-deep-study-glow {
          position: absolute;
          inset: auto 10% -28px 12%;
          height: 62px;
          border-radius: 999px;
          background: radial-gradient(circle, color-mix(in srgb, var(--bb-accent) 54%, transparent), transparent 70%);
          filter: blur(18px);
          animation: bb-deep-study-glow 5.8s ease-in-out infinite;
        }
        .bb-deep-study-bible {
          position: relative;
          z-index: 1;
          display: grid;
          min-height: 104px;
          place-items: center;
          border-radius: 999px;
          background:
            radial-gradient(circle at 50% 58%, color-mix(in srgb, var(--bb-accent) 34%, transparent), transparent 66%);
          opacity: 0.98;
        }
        .bb-deep-study-bible-emoji {
          display: none;
        }
        .bb-deep-study-bible-image {
          position: relative;
          z-index: 1;
          width: 116px;
          height: auto;
          max-width: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 18px color-mix(in srgb, var(--bb-accent) 62%, transparent));
        }
        .bb-deep-study-book {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 102px;
          height: 64px;
          filter: drop-shadow(0 0 18px color-mix(in srgb, var(--bb-accent) 62%, transparent));
          transform: perspective(120px) rotateX(12deg);
          opacity: 0.96;
        }
        .bb-deep-study-book span {
          border: 1px solid color-mix(in srgb, var(--bb-accent) 30%, rgba(255,255,255,0.72));
          background:
            repeating-linear-gradient(180deg, rgba(65, 43, 28, 0.14) 0 1px, transparent 1px 7px),
            linear-gradient(135deg, rgba(255,255,255,0.94), color-mix(in srgb, var(--bb-accent-soft) 28%, rgba(255,255,255,0.84)));
          box-shadow: inset 0 -10px 16px rgba(91,33,182,0.18);
        }
        .bb-deep-study-book::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 5px;
          bottom: 3px;
          width: 2px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--bb-accent) 34%, rgba(71, 45, 26, 0.42));
          transform: translateX(-50%);
        }
        .bb-deep-study-book span:first-child {
          border-radius: 12px 4px 8px 14px;
          transform: skewY(-8deg);
        }
        .bb-deep-study-book span:nth-child(2) {
          border-radius: 4px 12px 14px 8px;
          transform: skewY(8deg);
        }
        .bb-deep-study-smoke {
          position: absolute;
          bottom: 40px;
          width: 18px;
          height: 42px;
          border-radius: 999px;
          background: linear-gradient(to top, transparent, color-mix(in srgb, var(--bb-accent) 32%, transparent), rgba(255,255,255,0));
          filter: blur(5px);
          animation: bb-deep-study-smoke 4.8s ease-in-out infinite;
        }
        .bb-deep-study-smoke-one { left: 30px; }
        .bb-deep-study-smoke-two { right: 26px; animation-delay: 1.6s; }
        .bb-deep-study-spark {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: white;
          box-shadow: 0 0 12px color-mix(in srgb, var(--bb-accent) 80%, transparent);
          animation: bb-deep-study-twinkle 2.6s ease-in-out infinite;
        }
        .bb-deep-study-spark-one { left: 20px; top: 16px; }
        .bb-deep-study-spark-two { right: 18px; top: 28px; animation-delay: 1.2s; }
        .bb-deep-study-moon {
          position: relative;
          width: 19px;
          height: 19px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: color-mix(in srgb, var(--bb-accent) 18%, #ffffff);
          box-shadow: 0 0 20px color-mix(in srgb, var(--bb-accent) 70%, transparent);
        }
        .bb-deep-study-moon::after {
          content: "";
          position: absolute;
          inset: -1px -3px 1px 6px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--bb-background) 88%, #05070b);
        }
        .bb-deep-study-portal {
          animation: bb-deep-study-portal 4.8s ease-in-out infinite;
        }
        .bb-deep-study-arrow {
          position: relative;
          display: block;
          width: 15px;
          height: 15px;
        }
        .bb-deep-study-arrow::before {
          content: "";
          position: absolute;
          inset: 2px 1px 2px 0;
          border-top: 3px solid currentColor;
          border-right: 3px solid currentColor;
          transform: rotate(45deg);
          border-radius: 2px;
        }
        .bb-deep-study-arrow::after {
          content: "";
          position: absolute;
          left: 1px;
          top: 6px;
          width: 12px;
          height: 3px;
          border-radius: 999px;
          background: currentColor;
        }
        .bb-deep-study-orbit {
          position: absolute;
          inset: -32% 16% auto;
          height: 170px;
          border-radius: 999px;
          background: radial-gradient(circle, color-mix(in srgb, var(--bb-accent) 26%, transparent), transparent 64%);
          filter: blur(10px);
          animation: bb-deep-study-glow 6s ease-in-out infinite;
        }
        @keyframes bb-deep-study-stars {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-28px, -42px, 0); }
        }
        @keyframes bb-deep-study-glow {
          0%, 100% { opacity: 0.6; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes bb-deep-study-smoke {
          0% { opacity: 0; transform: translateY(12px) scale(0.82); }
          38% { opacity: 0.88; }
          100% { opacity: 0; transform: translateY(-28px) scale(1.2); }
        }
        @keyframes bb-deep-study-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.82); }
          50% { opacity: 1; transform: scale(1.28); }
        }
        @keyframes bb-deep-study-portal {
          0%, 100% { box-shadow: 0 0 22px rgba(168,85,247,0.3), inset 0 0 18px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 38px rgba(216,180,254,0.52), inset 0 0 24px rgba(255,255,255,0.16); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bb-deep-study-entry::after,
          .bb-deep-study-focus-panel::after,
          .bb-deep-study-glow,
          .bb-deep-study-smoke,
          .bb-deep-study-spark,
          .bb-deep-study-portal,
          .bb-deep-study-orbit {
            animation: none !important;
          }
        }
        @media (max-width: 480px) {
          .bb-deep-study-entry {
            grid-template-columns: 96px 1fr 36px !important;
            gap: 8px !important;
            border-radius: 22px !important;
            padding: 12px 10px !important;
          }
          .bb-deep-study-bible {
            min-height: 82px !important;
          }
          .bb-deep-study-bible-emoji {
            font-size: 72px !important;
          }
          .bb-deep-study-bible-image {
            width: 94px !important;
          }
          .bb-deep-study-book {
            width: 86px !important;
            height: 54px !important;
          }
          .bb-deep-study-smoke {
            bottom: 28px !important;
            height: 30px !important;
          }
          .bb-deep-study-smoke-one { left: 18px !important; }
          .bb-deep-study-smoke-two { right: 16px !important; }
          .bb-deep-study-portal {
            height: 34px !important;
            width: 34px !important;
          }
          .bb-deep-study-title {
            font-size: 1.35rem !important;
            line-height: 1.05 !important;
          }
          .bb-deep-study-entry [class*="tracking-[0.2em]"] {
            margin-top: 8px !important;
            padding: 6px 10px !important;
            font-size: 10px !important;
            letter-spacing: 0.14em !important;
          }
          .bb-deep-study-copy-extra {
            display: none !important;
          }
        }
        html[data-bb-skin]:not([data-bb-skin="none"]) .bb-dashboard-streak-card {
          border-color: color-mix(in srgb, var(--bb-accent) 42%, transparent) !important;
          background: color-mix(in srgb, var(--bb-card) 84%, transparent) !important;
          box-shadow:
            0 16px 34px rgba(0, 0, 0, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
        }
        html[data-bb-skin]:not([data-bb-skin="none"]) .bb-dashboard-streak-card p {
          color: var(--bb-text-primary) !important;
        }
        html[data-bb-skin]:not([data-bb-skin="none"]) .bb-dashboard-streak-card .bb-dashboard-streak-day {
          border: 1px solid color-mix(in srgb, var(--bb-accent) 24%, transparent);
          background: color-mix(in srgb, var(--bb-surface-soft) 72%, transparent) !important;
        }
        html[data-bb-skin]:not([data-bb-skin="none"]) .bb-dashboard-streak-card .bb-dashboard-streak-day-label {
          color: color-mix(in srgb, var(--bb-accent) 82%, #ffffff) !important;
        }
        html[data-bb-skin]:not([data-bb-skin="none"]) .bb-dashboard-streak-card .bb-dashboard-streak-check {
          border-color: color-mix(in srgb, var(--bb-accent) 72%, transparent) !important;
          background: color-mix(in srgb, var(--bb-accent) 72%, #07100f) !important;
          color: var(--bb-button-text) !important;
          box-shadow: 0 0 18px color-mix(in srgb, var(--bb-accent) 34%, transparent) !important;
        }
      `}</style>
    );
  }

  function renderDeepStudyCinematicCard() {
    if (deepStudyMode === "active" && deepStudyActiveSession) {
      const secondsLeft = Math.max(0, Math.ceil((deepStudyActiveSession.endsAt - deepStudyNow) / 1000));
      const activeMinutes = Math.floor(deepStudyActiveSession.activeMs / 60000);
      return (
        <>
          <div className="bb-deep-study-focus-panel relative overflow-hidden rounded-[30px] border border-[color-mix(in_srgb,var(--bb-accent)_34%,transparent)] bg-[color-mix(in_srgb,var(--bb-card)_78%,transparent)] p-5 text-center text-[var(--bb-text-primary)] shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-7">
            <div className="bb-deep-study-orbit" aria-hidden="true" />
            <p className="relative text-xs font-black uppercase tracking-[0.28em] text-[var(--bb-accent)]">Focus mode active</p>
            <p className="relative mt-3 text-5xl font-black leading-none text-[var(--bb-text-primary)] drop-shadow-[0_0_24px_color-mix(in_srgb,var(--bb-accent)_56%,transparent)]">{formatDeepStudyTime(secondsLeft)}</p>
            <p className="relative mt-2 text-sm font-black text-[var(--bb-text-secondary)]">remaining</p>
            <div className="relative mt-5 grid grid-cols-3 gap-2 text-xs font-black">
              <div className="rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent)_24%,transparent)] bg-[var(--bb-surface-soft)] px-2 py-3 leading-tight text-[var(--bb-text-primary)] backdrop-blur-md">{activeMinutes}m focused</div>
              <div className="rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent)_24%,transparent)] bg-[var(--bb-surface-soft)] px-2 py-3 leading-tight text-[var(--bb-text-primary)] backdrop-blur-md">{deepStudyActiveSession.tasksCompleted} tasks</div>
              <div className="rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent)_24%,transparent)] bg-[var(--bb-surface-soft)] px-2 py-3 leading-tight text-[var(--bb-text-primary)] backdrop-blur-md">{deepStudyActiveSession.chaptersStudied.length} chapters</div>
            </div>
            <p className="relative mt-4 text-xs font-semibold text-[var(--bb-text-secondary)]">Stay with Scripture. The dashboard is quiet while you study.</p>
            <button
              type="button"
              onClick={() => void finishDeepStudySession(true)}
              disabled={deepStudyFinalizingRef.current}
              className="relative mt-5 w-full rounded-full border border-[color-mix(in_srgb,var(--bb-accent)_32%,transparent)] bg-[var(--bb-surface-soft)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--bb-text-primary)] transition hover:brightness-110 disabled:opacity-60"
            >
              {deepStudyFinalizingRef.current ? "Stopping..." : "Stop"}
            </button>
          </div>
          {renderDeepStudyCardStyles()}
        </>
      );
    }

    return (
      <>
        <button
          type="button"
          onClick={() => setDeepStudyMode((current) => current === "setup" ? "idle" : "setup")}
          aria-expanded={deepStudyMode === "setup" || deepStudyMode === "info"}
          className="bb-deep-study-entry group relative grid w-full grid-cols-[82px_1fr_42px] items-center gap-3 overflow-hidden rounded-[24px] border border-[color-mix(in_srgb,var(--bb-accent)_34%,transparent)] bg-[color-mix(in_srgb,var(--bb-card)_78%,transparent)] px-3 py-3 text-left text-[var(--bb-text-primary)] shadow-[0_14px_34px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--bb-accent)_60%,transparent)] hover:brightness-110 active:translate-y-0 sm:grid-cols-[104px_1fr_48px] sm:px-4 sm:py-3.5"
        >
          <span className="bb-deep-study-glow" aria-hidden="true" />
          <span className="bb-deep-study-bible" aria-hidden="true">
            <img src="/openbible.png" alt="" className="bb-deep-study-bible-image" draggable={false} />
            <span className="bb-deep-study-smoke bb-deep-study-smoke-one" />
            <span className="bb-deep-study-smoke bb-deep-study-smoke-two" />
            <span className="bb-deep-study-spark bb-deep-study-spark-one" />
            <span className="bb-deep-study-spark bb-deep-study-spark-two" />
          </span>
          <span className="relative min-w-0">
            <span className="flex items-center gap-2">
              <span className="bb-deep-study-title text-lg font-black leading-tight text-[var(--bb-text-primary)] drop-shadow-[0_0_18px_color-mix(in_srgb,var(--bb-accent)_48%,transparent)] sm:text-xl">Deep Study Mode</span>
            </span>
            <span className="mt-0.5 block text-sm font-bold leading-5 text-[var(--bb-text-secondary)]">Quiet focus for Scripture.</span>
          </span>
          <span className="bb-deep-study-portal relative grid h-11 w-11 place-items-center justify-self-end rounded-full border border-[color-mix(in_srgb,var(--bb-accent)_38%,transparent)] bg-[var(--bb-surface-soft)] text-xl font-black text-[var(--bb-text-primary)] shadow-[0_0_26px_color-mix(in_srgb,var(--bb-accent)_36%,transparent),inset_0_0_18px_rgba(255,255,255,0.1)] sm:h-14 sm:w-14">
            <span className={`bb-deep-study-arrow transition-transform ${deepStudyMode === "setup" || deepStudyMode === "info" ? "rotate-90" : ""}`} aria-hidden="true" />
          </span>
        </button>
        {deepStudyMode === "setup" || deepStudyMode === "info" ? renderDeepStudySetup() : null}
        {renderDeepStudyCardStyles()}
      </>
    );
  }

  function renderDeepStudySetup() {
    return (
      <section className="dashboard-inline-task mt-3 w-full rounded-[24px] border border-[color-mix(in_srgb,var(--bb-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--bb-card)_76%,transparent)] p-4 text-[var(--bb-text-primary)] shadow-[0_14px_34px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="block">
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent)]">Focus time</span>
            <select
              value={deepStudySelectedMinutes}
              onChange={(event) => setDeepStudySelectedMinutes(Number(event.target.value))}
              className="mt-2 w-full rounded-[18px] border border-[color-mix(in_srgb,var(--bb-accent)_30%,transparent)] bg-[var(--bb-surface-soft)] px-4 py-3 text-sm font-black text-[var(--bb-text-primary)] outline-none"
            >
              {deepStudyDurationOptions.map((option) => (
                <option key={`${option.minutes}:${option.label}`} value={option.minutes}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => startDeepStudySession(selectedDeepStudyDuration.minutes, selectedDeepStudyDuration.shareDisplayMinutes)}
            className="rounded-[18px] bg-[var(--bb-button)] px-6 py-3 text-sm font-black text-[var(--bb-button-text)] shadow-sm transition hover:brightness-95"
          >
            Start
          </button>
        </div>
        {!isDeepStudyPaidUser ? (
          <div className="mt-3 rounded-[18px] bg-[var(--bb-surface-soft)] px-4 py-3 text-xs font-bold leading-5 text-[var(--bb-text-secondary)]">
            <p>Upgrade unlocks 10, 45, and 60 minute focus sessions.</p>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setDeepStudyMode((current) => current === "info" ? "setup" : "info")}
          className="mt-3 text-left text-xs font-black text-[var(--bb-accent)]"
        >
          View Deep Study History!
        </button>
        {deepStudyMode === "info" ? renderDeepStudyHistoryInline() : null}
      </section>
    );
  }

  function renderDeepStudyHistoryInline() {
    const rank = getDeepStudyRank(deepStudyTodayStats.totalMinutes, deepStudyTodayStats.averageFocus, deepStudyStreak);
    return (
      <div className="mt-4 rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent)_26%,transparent)] bg-[color-mix(in_srgb,var(--bb-surface-soft)_74%,transparent)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Today", `${deepStudyTodayStats.totalMinutes}m`, `${deepStudyTodayStats.sessions} sessions`],
            ["This Week", `${deepStudyWeekStats.totalMinutes}m`, `${deepStudyWeekStats.sessions} sessions`],
            ["Streak", `${deepStudyStreak} days`, `${deepStudyMultiplier}x multiplier`],
            ["Total Focus", `${deepStudyTotalMinutes}m`, rank],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-[18px] bg-[color-mix(in_srgb,var(--bb-card)_76%,transparent)] p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted)]">{label}</p>
              <p className="mt-1 text-lg font-black text-[var(--bb-text-primary)]">{value}</p>
              <p className="mt-1 text-[11px] font-bold text-[var(--bb-text-secondary)]">{detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm font-black text-[var(--bb-text-primary)]">Recent Deep Study Sessions</p>
        <div className="mt-3 space-y-2">
          {deepStudyHistory.slice(0, 5).map((session) => (
            <div key={session.id} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 rounded-2xl bg-[color-mix(in_srgb,var(--bb-card)_78%,transparent)] px-4 py-3 text-xs font-bold text-[var(--bb-text-secondary)]">
              <span className="truncate text-[var(--bb-text-primary)]">{session.dayKey}</span>
              <span>{session.activeMinutes}m</span>
              <span>{session.focusScore}%</span>
              <span>{session.tasksCompleted} tasks</span>
            </div>
          ))}
          {!deepStudyHistory.length ? <p className="rounded-2xl bg-[color-mix(in_srgb,var(--bb-card)_78%,transparent)] px-4 py-4 text-sm font-bold text-[var(--bb-text-muted)]">No Deep Study sessions yet.</p> : null}
        </div>
      </div>
    );
  }

  function renderDeepStudyResults() {
    if (!deepStudyResults) return null;
    const breakdownRows = Object.entries(deepStudyResults.taskBreakdown).filter(([, count]) => count > 0);
    return (
      <section className="mx-auto w-full max-w-xl overflow-hidden rounded-[30px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] shadow-[0_16px_40px_rgba(38,63,99,0.12)]">
        <div className="relative px-6 py-7 text-center">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-300" />
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent)]">Deep Study Mode Results</p>
          <h2 className="mt-3 text-4xl font-black text-[var(--bb-text-primary)]">+{deepStudyResults.diamondsEarned}</h2>
          <p className="mt-1 text-sm font-black text-[var(--bb-accent)]">diamonds earned</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-left text-sm font-bold">
            <div className="rounded-[20px] bg-[var(--bb-surface-soft)] p-4"><p className="text-[10px] uppercase tracking-[0.16em] text-[var(--bb-text-muted)]">Focused</p><p className="mt-1 text-xl font-black">{deepStudyResults.activeMinutes}m</p></div>
            <div className="rounded-[20px] bg-[var(--bb-surface-soft)] p-4"><p className="text-[10px] uppercase tracking-[0.16em] text-[var(--bb-text-muted)]">Away</p><p className="mt-1 text-xl font-black">{deepStudyResults.awayMinutes}m</p></div>
            <div className="rounded-[20px] bg-[var(--bb-surface-soft)] p-4"><p className="text-[10px] uppercase tracking-[0.16em] text-[var(--bb-text-muted)]">Focus Score</p><p className="mt-1 text-xl font-black">{deepStudyResults.focusScore}%</p></div>
            <div className="rounded-[20px] bg-[var(--bb-surface-soft)] p-4"><p className="text-[10px] uppercase tracking-[0.16em] text-[var(--bb-text-muted)]">Multiplier</p><p className="mt-1 text-xl font-black">{deepStudyResults.multiplier}x</p></div>
          </div>
          <div className="mt-4 rounded-[22px] bg-[var(--bb-surface-soft)] p-4 text-left">
            <p className="text-sm font-black text-[var(--bb-text-primary)]">{deepStudyResults.tasksCompleted} tasks completed</p>
            <p className="mt-1 text-xs font-semibold text-[var(--bb-text-muted)]">{deepStudyResults.chaptersStudied.length ? deepStudyResults.chaptersStudied.join(", ") : "No chapter task completed this session."}</p>
            {breakdownRows.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {breakdownRows.map(([kind, count]) => <span key={kind} className="rounded-full bg-white px-3 py-1 text-xs font-black">{kind}: {count}</span>)}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => void shareDeepStudyResults(deepStudyResults)}
            disabled={deepStudyShareBusy}
            className="mt-6 w-full rounded-[24px] bg-[var(--bb-button)] px-6 py-5 text-lg font-black text-[var(--bb-button-text)] shadow-[0_12px_28px_rgba(38,63,99,0.22)] transition hover:brightness-95 disabled:opacity-70"
          >
            {deepStudyShareBusy ? "Preparing Share Card..." : "Share My Results"}
          </button>
          <button type="button" onClick={() => setDeepStudyMode("idle")} className="mt-3 w-full rounded-full border border-[var(--bb-card-border)] bg-white px-5 py-3 text-sm font-black text-[var(--bb-text-primary)]">
            Done
          </button>
        </div>
      </section>
    );
  }

  function renderDeepStudyComplete() {
    if (!deepStudyResults) return null;
    const stoppedEarly = Boolean(deepStudyResults.stoppedEarly);
    const didGood = deepStudyResults.focusScore >= 60 || deepStudyResults.activeMinutes >= Math.max(1, Math.floor(deepStudyResults.plannedMinutes * 0.5));
    return (
      <section className="mx-auto w-full max-w-xl overflow-hidden rounded-[30px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] shadow-[0_16px_40px_rgba(38,63,99,0.12)]">
        <div className="px-6 py-8 text-center">
          <div className="flex justify-center">
            <LouisAvatar mood={didGood ? "stareyes" : "wave"} size={138} />
          </div>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent)]">Bible Buddy</p>
          <h2 className="mt-2 text-3xl font-black text-[var(--bb-text-primary)]">{stoppedEarly ? "You stopped early." : "Hey, you did it."}</h2>
          <p className="mt-3 text-base font-semibold leading-7 text-[var(--bb-text-secondary)]">
            {stoppedEarly
              ? `You still get credit for the ${deepStudyResults.activeMinutes} focused minute${deepStudyResults.activeMinutes === 1 ? "" : "s"} you completed.`
              : `You made it through another Deep Study run${didGood ? ", and you did good." : "."}`}
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-muted)]">
            Let&apos;s see your results.
          </p>
          <button
            type="button"
            onClick={() => setDeepStudyMode("results")}
            className="mt-6 w-full rounded-full bg-[var(--bb-button)] px-6 py-3.5 text-sm font-black text-[var(--bb-button-text)] shadow-sm transition hover:brightness-95"
          >
            OK
          </button>
        </div>
      </section>
    );
  }

  function renderDeepStudyInfo() {
    const rank = getDeepStudyRank(deepStudyTodayStats.totalMinutes, deepStudyTodayStats.averageFocus, deepStudyStreak);
    return (
      <section className="mx-auto w-full max-w-xl rounded-[30px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-6 shadow-[0_16px_40px_rgba(38,63,99,0.12)]">
        <button type="button" onClick={() => setDeepStudyMode(deepStudyResults ? "results" : "setup")} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-[var(--bb-surface-soft)] text-xl font-black">x</button>
        <h2 className="mt-2 text-3xl font-black text-[var(--bb-text-primary)]">Deep Study Mode</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary)]">A calm focus timer for intentional Bible study. It rewards focused minutes, not rushing.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            ["Today", `${deepStudyTodayStats.totalMinutes}m`, `${deepStudyTodayStats.sessions} sessions`],
            ["Yesterday", `${deepStudyYesterdayStats.totalMinutes}m`, `${deepStudyYesterdayStats.averageFocus}% focus`],
            ["This Week", `${deepStudyWeekStats.totalMinutes}m`, `${deepStudyWeekStats.sessions} sessions`],
            ["Total Focus", `${deepStudyTotalMinutes}m`, rank],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-[22px] bg-[var(--bb-surface-soft)] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted)]">{label}</p>
              <p className="mt-1 text-xl font-black text-[var(--bb-text-primary)]">{value}</p>
              <p className="mt-1 text-xs font-bold text-[var(--bb-text-secondary)]">{detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary)]">
          <div className="rounded-[22px] bg-[var(--bb-surface-soft)] p-4"><b className="text-[var(--bb-text-primary)]">Current Streak:</b> {deepStudyStreak} days, {deepStudyMultiplier}x multiplier.</div>
          <div className="rounded-[22px] bg-[var(--bb-surface-soft)] p-4"><b className="text-[var(--bb-text-primary)]">Focus:</b> Bible Buddy looks at visible app time, interruptions, task completion, and steady interaction. It is not trying to catch you. It gently rewards focus.</div>
        </div>
        <div className="mt-5">
          <p className="text-sm font-black text-[var(--bb-text-primary)]">Recent Deep Study Sessions</p>
          <div className="mt-3 space-y-2">
            {deepStudyHistory.slice(0, 5).map((session) => (
              <div key={session.id} className="flex items-center justify-between rounded-2xl bg-[var(--bb-surface-soft)] px-4 py-3 text-sm font-bold">
                <span>{session.dayKey}</span>
                <span>{session.activeMinutes}m</span>
                <span>{session.focusScore}%</span>
                <span>{session.tasksCompleted} tasks</span>
              </div>
            ))}
            {!deepStudyHistory.length ? <p className="rounded-2xl bg-[var(--bb-surface-soft)] px-4 py-4 text-sm font-bold text-[var(--bb-text-muted)]">No Deep Study sessions yet.</p> : null}
          </div>
        </div>
      </section>
    );
  }

  function renderDashboardHomePanelOverride() {
    if (showDiamondStore) return renderDiamondStorePanel();
    if (showBibleProgressPanel) return renderBibleProgressPanel();
    if (deepStudyMode === "complete") return renderDeepStudyComplete();
    if (deepStudyMode === "results") return renderDeepStudyResults();
    return undefined;
  }

  function renderStorePromoModal() {
    if (!activeStorePromo) return null;

    const buddyPromos = BUDDY_STORE_ITEMS.filter((item) => item.id !== "buddy-lil-louis");
    const closePromo = () => setActiveStorePromo(null);
    const shopPromo = () => {
      setActiveStorePromo(null);
      setShowDiamondStore(true);
      void loadStorePurchases();
    };

    if (activeStorePromo === "buddies") {
      return (
        <ModalShell isOpen={true} onClose={closePromo} zIndex="z-[120]" backdropColor="bg-black/70" scrollable>
          <div className="w-full max-w-xl overflow-hidden rounded-[30px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] shadow-2xl">
            <div className="relative overflow-hidden bg-[var(--bb-card)] px-6 pb-7 pt-5">
              <button
                type="button"
                onClick={closePromo}
                className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-[var(--bb-card-border)] bg-[var(--bb-card)] text-xl font-black text-[var(--bb-text-secondary)] shadow-sm"
                aria-label="Close Buddy promo"
              >
                x
              </button>
              <div className="mt-1 flex justify-center">
                <LouisAvatar mood="wave" size={132} />
              </div>
              <p className="mt-3 text-center text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent)]">👥 New Bible Buddies</p>
              <h2 className="mt-2 text-center text-3xl font-black leading-tight text-[var(--bb-text-primary)] sm:text-4xl">Pick the voice that helps you keep showing up</h2>
              <p className="mx-auto mt-3 max-w-md text-center text-sm font-semibold leading-6 text-[var(--bb-text-secondary)]">
                Unlock a new Bible Buddy and switch your study coach anytime. Same Bible habit, different encouragement style.
              </p>

              <div className="mt-5 grid gap-3">
                {buddyPromos.map((buddy) => (
                  <div key={buddy.id} className="flex items-center gap-3 rounded-[22px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-3 shadow-sm">
                    <img src={buddy.imageSrc} alt={buddy.title} loading="lazy" decoding="async" className="h-16 w-16 rounded-2xl object-cover" />
                    <div className="min-w-0">
                      <p className="text-base font-black text-[var(--bb-text-primary)]">{buddy.title}</p>
                      <p className="text-xs font-semibold leading-5 text-[var(--bb-text-secondary)]">{buddy.subtitle}</p>
                      <p className="mt-1 text-xs font-black text-[var(--bb-accent)]">{buddy.price.toLocaleString()} diamonds</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={shopPromo}
                className="mt-5 w-full rounded-full bg-[var(--bb-button)] px-6 py-3 text-sm font-black text-[var(--bb-button-text)] shadow-sm transition hover:brightness-95"
              >
                Shop Bible Buddies
              </button>
            </div>
          </div>
        </ModalShell>
      );
    }

    const rewardTiles = [
      { title: "Themes", text: "Change the whole app feel.", icon: "🎨", color: "#7BAFD4" },
      { title: "Flames", text: "Make your streak fire yours.", icon: <StreakFlameEmoji flameId="blue" size={30} />, color: "#38BDF8" },
      { title: "Buddies", text: "Unlock new study voices.", icon: "👥", color: "#DB2777" },
      { title: "Boosts", text: "Protect streaks and chase rewards.", icon: "⚡", color: "#B7791F" },
    ];

    return (
      <ModalShell isOpen={true} onClose={closePromo} zIndex="z-[120]" backdropColor="bg-black/70" scrollable>
        <div className="w-full max-w-xl overflow-hidden rounded-[30px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] shadow-2xl">
          <div className="relative overflow-hidden bg-[var(--bb-card)] px-6 pb-7 pt-5">
            <button
              type="button"
              onClick={closePromo}
              className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-[var(--bb-card-border)] bg-[var(--bb-card)] text-xl font-black text-[var(--bb-text-secondary)] shadow-sm"
              aria-label="Close store promo"
            >
              x
            </button>
            <div className="mt-1 flex justify-center">
              <LouisAvatar mood="stareyes" size={132} />
            </div>
            <p className="mt-3 text-center text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent)]">💎 Diamond Store</p>
            <h2 className="mt-2 text-center text-3xl font-black leading-tight text-[var(--bb-text-primary)] sm:text-4xl">Spend diamonds. Build your setup.</h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm font-semibold leading-6 text-[var(--bb-text-secondary)]">
              Your Bible study work turns into diamonds. Use them on themes, flame colors, Bible Buddies, boosts, and more rewards coming next.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {rewardTiles.map((tile) => (
                <div key={tile.title} className="rounded-[22px] border border-[var(--bb-card-border)] bg-[var(--bb-card)] p-3 shadow-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl text-2xl" style={{ backgroundColor: `${tile.color}22`, color: tile.color }}>
                    {tile.icon}
                  </div>
                  <p className="mt-3 text-sm font-black text-[var(--bb-text-primary)]">{tile.title}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[var(--bb-text-secondary)]">{tile.text}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={shopPromo}
              className="mt-5 w-full rounded-full bg-[var(--bb-button)] px-6 py-3 text-sm font-black text-[var(--bb-button-text)] shadow-sm transition hover:brightness-95"
            >
              Open Diamond Store
            </button>
          </div>
        </div>
      </ModalShell>
    );
  }

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
        html[data-bb-skin="blue-storm"] .dashboard-shell {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          z-index: 0;
          background:
            radial-gradient(ellipse at 50% 88%, rgba(31, 84, 132, 0.3), transparent 46%),
            linear-gradient(180deg, rgba(2, 9, 20, 0.04) 0%, rgba(3, 12, 28, 0.22) 34%, rgba(7, 20, 38, 0.74) 100%),
            url("/skins/Bluestormskin.png") center top / cover no-repeat,
            #071426 !important;
        }
        html[data-bb-skin="midnight-garden"] .dashboard-shell {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          z-index: 0;
          background:
            radial-gradient(circle at 52% 9%, rgba(255, 246, 209, 0.22), transparent 23%),
            radial-gradient(circle at 18% 34%, rgba(215, 184, 107, 0.14), transparent 30%),
            radial-gradient(ellipse at 50% 88%, rgba(70, 101, 43, 0.22), transparent 46%),
            linear-gradient(180deg, rgba(4, 8, 12, 0.01) 0%, rgba(5, 12, 16, 0.16) 38%, rgba(14, 31, 18, 0.78) 100%),
            url("/skins/MidnightGarden.png") center top / cover no-repeat,
            #07100f !important;
        }
        html[data-bb-skin="lavender-prayer"] .dashboard-shell {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          z-index: 0;
          background:
            radial-gradient(circle at 52% 9%, rgba(245, 220, 255, 0.2), transparent 24%),
            radial-gradient(circle at 18% 34%, rgba(245, 203, 255, 0.12), transparent 30%),
            linear-gradient(180deg, rgba(18, 10, 32, 0.01) 0%, rgba(20, 12, 38, 0.18) 40%, rgba(11, 6, 22, 0.74) 100%),
            url("/skins/LavenderPrayerSkin.png") center top / cover no-repeat,
            #130d1f !important;
        }
        html[data-bb-skin="ruby-village"] .dashboard-shell {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          z-index: 0;
          background:
            radial-gradient(circle at 52% 9%, rgba(255, 192, 106, 0.2), transparent 24%),
            radial-gradient(circle at 18% 34%, rgba(255, 93, 72, 0.14), transparent 30%),
            linear-gradient(180deg, rgba(36, 6, 9, 0.01) 0%, rgba(45, 8, 12, 0.2) 40%, rgba(12, 3, 5, 0.76) 100%),
            url("/skins/RubyVillage.png") center top / cover no-repeat,
            #120507 !important;
        }
        html[data-bb-skin="slow-mornings"] .dashboard-shell {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          z-index: 0;
          background:
            radial-gradient(circle at 54% 10%, rgba(255, 210, 138, 0.22), transparent 24%),
            radial-gradient(circle at 22% 34%, rgba(245, 178, 91, 0.12), transparent 30%),
            radial-gradient(ellipse at 50% 88%, rgba(148, 91, 45, 0.26), transparent 46%),
            linear-gradient(180deg, rgba(22, 13, 8, 0.01) 0%, rgba(32, 19, 12, 0.16) 38%, rgba(26, 15, 10, 0.78) 100%),
            var(--bb-skin-bg-image-mobile),
            #170f0a !important;
          background-position: center top;
          background-size: cover;
          background-repeat: no-repeat;
        }
        html[data-bb-skin="morning-mercy"] .dashboard-shell {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          z-index: 0;
          background:
            radial-gradient(circle at 52% 10%, rgba(255, 230, 164, 0.24), transparent 24%),
            radial-gradient(circle at 22% 34%, rgba(255, 178, 150, 0.14), transparent 30%),
            radial-gradient(ellipse at 50% 88%, rgba(255, 203, 169, 0.28), transparent 46%),
            linear-gradient(180deg, rgba(255, 247, 234, 0.02) 0%, rgba(255, 229, 207, 0.14) 38%, rgba(255, 238, 219, 0.74) 100%),
            var(--bb-skin-bg-image-mobile),
            #fff3e3 !important;
          background-position: center top;
          background-size: cover;
          background-repeat: no-repeat;
        }
        html[data-bb-skin="blue-storm"] .dashboard-shell::before,
        html[data-bb-skin="blue-storm"] .dashboard-shell::after,
        html[data-bb-skin="midnight-garden"] .dashboard-shell::before,
        html[data-bb-skin="midnight-garden"] .dashboard-shell::after,
        html[data-bb-skin="lavender-prayer"] .dashboard-shell::before,
        html[data-bb-skin="lavender-prayer"] .dashboard-shell::after,
        html[data-bb-skin="ruby-village"] .dashboard-shell::before,
        html[data-bb-skin="ruby-village"] .dashboard-shell::after {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        html[data-bb-skin="slow-mornings"] .dashboard-shell::before,
        html[data-bb-skin="slow-mornings"] .dashboard-shell::after {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        html[data-bb-skin="morning-mercy"] .dashboard-shell::before,
        html[data-bb-skin="morning-mercy"] .dashboard-shell::after {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        html[data-bb-skin="blue-storm"] .dashboard-shell::before {
          background:
            radial-gradient(circle at 48% 20%, rgba(168, 230, 255, 0.16), transparent 20%),
            radial-gradient(circle at 62% 30%, rgba(68, 166, 255, 0.1), transparent 30%);
          mix-blend-mode: screen;
          animation: bb-blue-storm-lightning 9s ease-in-out infinite;
        }
        html[data-bb-skin="blue-storm"] .dashboard-shell::after {
          background:
            radial-gradient(circle at 10% 22%, rgba(155, 220, 255, 0.06), transparent 34%),
            radial-gradient(circle at 88% 18%, rgba(93, 214, 255, 0.07), transparent 32%);
          filter: blur(3px);
          opacity: 0.28;
          animation: bb-blue-storm-mist 18s ease-in-out infinite alternate;
        }
        html[data-bb-skin="midnight-garden"] .dashboard-shell::before {
          background:
            radial-gradient(circle at 50% 8%, rgba(255, 246, 209, 0.3), transparent 19%),
            radial-gradient(circle at 22% 38%, rgba(215, 184, 107, 0.16), transparent 28%),
            linear-gradient(90deg, transparent 0%, rgba(175, 207, 122, 0.06) 48%, transparent 78%);
          mix-blend-mode: screen;
          animation: bb-midnight-garden-moonlight 16s ease-in-out infinite;
        }
        html[data-bb-skin="midnight-garden"] .dashboard-shell::after {
          background:
            radial-gradient(circle at 12% 20%, rgba(175, 207, 122, 0.1), transparent 34%),
            radial-gradient(circle at 88% 24%, rgba(215, 184, 107, 0.1), transparent 32%),
            linear-gradient(115deg, transparent 0%, rgba(238, 229, 190, 0.08) 48%, transparent 76%);
          filter: blur(2px);
          opacity: 0.82;
          animation: bb-midnight-garden-mist 24s ease-in-out infinite alternate;
        }
        html[data-bb-skin="lavender-prayer"] .dashboard-shell::before {
          background:
            radial-gradient(circle at 50% 8%, rgba(250, 230, 255, 0.34), transparent 20%),
            radial-gradient(circle at 22% 38%, rgba(245, 203, 255, 0.16), transparent 28%),
            linear-gradient(90deg, transparent 0%, rgba(207, 174, 255, 0.08) 48%, transparent 78%);
          mix-blend-mode: screen;
          animation: bb-lavender-prayer-moonlight 17s ease-in-out infinite;
        }
        html[data-bb-skin="lavender-prayer"] .dashboard-shell::after {
          background:
            radial-gradient(circle at 12% 20%, rgba(207, 174, 255, 0.12), transparent 34%),
            radial-gradient(circle at 88% 24%, rgba(245, 203, 255, 0.1), transparent 32%),
            linear-gradient(115deg, transparent 0%, rgba(255, 245, 255, 0.08) 48%, transparent 76%);
          filter: blur(2px);
          opacity: 0.82;
          animation: bb-lavender-prayer-mist 25s ease-in-out infinite alternate;
        }
        html[data-bb-skin="ruby-village"] .dashboard-shell::before {
          background:
            radial-gradient(circle at 50% 8%, rgba(255, 192, 106, 0.34), transparent 20%),
            radial-gradient(circle at 22% 38%, rgba(255, 93, 72, 0.16), transparent 28%),
            linear-gradient(90deg, transparent 0%, rgba(255, 115, 95, 0.08) 48%, transparent 78%);
          mix-blend-mode: screen;
          animation: bb-ruby-village-ember 16s ease-in-out infinite;
        }
        html[data-bb-skin="ruby-village"] .dashboard-shell::after {
          background:
            radial-gradient(circle at 12% 20%, rgba(255, 115, 95, 0.12), transparent 34%),
            radial-gradient(circle at 88% 24%, rgba(255, 192, 106, 0.1), transparent 32%),
            linear-gradient(115deg, transparent 0%, rgba(255, 219, 180, 0.08) 48%, transparent 76%);
          filter: blur(2px);
          opacity: 0.84;
          animation: bb-ruby-village-mist 24s ease-in-out infinite alternate;
        }
        html[data-bb-skin="slow-mornings"] .dashboard-shell::before {
          background:
            radial-gradient(circle at 52% 9%, rgba(255, 210, 138, 0.28), transparent 20%),
            radial-gradient(circle at 22% 38%, rgba(245, 178, 91, 0.14), transparent 28%),
            linear-gradient(90deg, transparent 0%, rgba(255, 244, 222, 0.07) 48%, transparent 78%);
          mix-blend-mode: screen;
          animation: bb-slow-mornings-candle 15s ease-in-out infinite;
        }
        html[data-bb-skin="slow-mornings"] .dashboard-shell::after {
          background:
            repeating-linear-gradient(108deg, rgba(255, 232, 190, 0.1) 0 1px, transparent 1px 28px),
            radial-gradient(circle at 12% 20%, rgba(245, 178, 91, 0.1), transparent 34%),
            linear-gradient(115deg, transparent 0%, rgba(255, 244, 222, 0.09) 48%, transparent 76%);
          background-size: 180px 260px, 100% 100%, 100% 100%;
          filter: blur(1.2px);
          opacity: 0.74;
          animation: bb-slow-mornings-steam 26s ease-in-out infinite alternate;
        }
        html[data-bb-skin="morning-mercy"] .dashboard-shell::before {
          background:
            radial-gradient(circle at 52% 9%, rgba(255, 230, 164, 0.34), transparent 20%),
            radial-gradient(circle at 22% 38%, rgba(255, 178, 150, 0.14), transparent 28%),
            linear-gradient(90deg, transparent 0%, rgba(255, 248, 236, 0.1) 48%, transparent 78%);
          mix-blend-mode: screen;
          animation: bb-morning-mercy-sunrise 16s ease-in-out infinite;
        }
        html[data-bb-skin="morning-mercy"] .dashboard-shell::after {
          background:
            radial-gradient(circle at 18% 24%, rgba(255, 182, 170, 0.32) 0 2px, transparent 4px),
            radial-gradient(circle at 72% 34%, rgba(244, 179, 95, 0.22) 0 1.6px, transparent 3px),
            linear-gradient(115deg, transparent 0%, rgba(255, 248, 236, 0.12) 48%, transparent 76%);
          background-size: 150px 190px, 230px 260px, 100% 100%;
          filter: blur(1px);
          opacity: 0.64;
          animation: bb-morning-mercy-petals 24s ease-in-out infinite alternate;
        }
        html[data-bb-skin="blue-storm"] .dashboard-shell > * {
          position: relative;
          z-index: 1;
        }
        html[data-bb-skin="midnight-garden"] .dashboard-shell > * {
          position: relative;
          z-index: 1;
        }
        html[data-bb-skin="lavender-prayer"] .dashboard-shell > * {
          position: relative;
          z-index: 1;
        }
        html[data-bb-skin="ruby-village"] .dashboard-shell > * {
          position: relative;
          z-index: 1;
        }
        html[data-bb-skin="slow-mornings"] .dashboard-shell > * {
          position: relative;
          z-index: 1;
        }
        html[data-bb-skin="morning-mercy"] .dashboard-shell > * {
          position: relative;
          z-index: 1;
        }
        html[data-bb-skin="blue-storm"] .bb-blue-storm-stage {
          position: relative;
          isolation: isolate;
          padding-top: clamp(18px, 3vw, 34px);
          overflow: hidden;
          border-top-left-radius: clamp(26px, 4vw, 44px);
          border-top-right-radius: clamp(26px, 4vw, 44px);
          border-bottom-left-radius: clamp(26px, 4vw, 44px);
          border-bottom-right-radius: clamp(26px, 4vw, 44px);
          border-top: 1px solid rgba(145, 226, 255, 0.26);
          border-bottom: 1px solid rgba(145, 226, 255, 0.22);
          box-shadow:
            0 -10px 38px rgba(93, 214, 255, 0.16),
            0 14px 42px rgba(0, 10, 30, 0.42),
            0 0 42px rgba(0, 10, 30, 0.34);
        }
        html[data-bb-skin="blue-storm"] .bb-blue-storm-mobile-stage {
          margin-top: 0 !important;
          padding-top: 22px !important;
          padding-bottom: 28px !important;
        }
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage {
          position: relative;
          isolation: isolate;
          padding-top: clamp(18px, 3vw, 34px);
          overflow: hidden;
          border-radius: clamp(26px, 4vw, 44px);
          border-top: 1px solid rgba(215, 184, 107, 0.28);
          border-bottom: 1px solid rgba(155, 205, 98, 0.24);
          background:
            radial-gradient(circle at 52% 9%, rgba(255, 246, 209, 0.18), transparent 24%),
            radial-gradient(ellipse at 50% 88%, rgba(70, 101, 43, 0.3), transparent 46%),
            linear-gradient(180deg, rgba(4, 8, 12, 0.02) 0%, rgba(5, 12, 16, 0.14) 38%, rgba(14, 31, 18, 0.8) 100%),
            url("/skins/MidnightGarden.png") center top / cover no-repeat,
            #07100f;
          box-shadow:
            0 -10px 38px rgba(215, 184, 107, 0.12),
            0 14px 42px rgba(1, 7, 8, 0.44),
            0 0 42px rgba(144, 190, 84, 0.12),
            inset 0 0 36px rgba(215, 184, 107, 0.08);
        }
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-mobile-stage {
          margin-top: 0 !important;
          padding-top: 22px !important;
          padding-bottom: 28px !important;
        }
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage {
          position: relative;
          isolation: isolate;
          padding-top: clamp(18px, 3vw, 34px);
          overflow: hidden;
          border-radius: clamp(26px, 4vw, 44px);
          border-top: 1px solid rgba(240, 200, 255, 0.3);
          border-bottom: 1px solid rgba(207, 174, 255, 0.24);
          background:
            radial-gradient(circle at 52% 9%, rgba(250, 230, 255, 0.22), transparent 24%),
            radial-gradient(ellipse at 50% 88%, rgba(91, 68, 126, 0.28), transparent 46%),
            linear-gradient(180deg, rgba(18, 10, 32, 0.02) 0%, rgba(20, 12, 38, 0.16) 38%, rgba(25, 16, 42, 0.78) 100%),
            url("/skins/LavenderPrayerSkin.png") center top / cover no-repeat,
            #130d1f;
          box-shadow:
            0 -10px 38px rgba(245, 203, 255, 0.14),
            0 14px 42px rgba(10, 4, 22, 0.44),
            0 0 42px rgba(207, 174, 255, 0.12),
            inset 0 0 36px rgba(245, 203, 255, 0.08);
        }
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-mobile-stage {
          margin-top: 0 !important;
          padding-top: 22px !important;
          padding-bottom: 28px !important;
        }
        html[data-bb-skin="ruby-village"] .bb-blue-storm-stage {
          position: relative;
          isolation: isolate;
          padding-top: clamp(18px, 3vw, 34px);
          overflow: hidden;
          border-radius: clamp(26px, 4vw, 44px);
          border-top: 1px solid rgba(255, 115, 95, 0.3);
          border-bottom: 1px solid rgba(255, 192, 106, 0.22);
          background:
            radial-gradient(circle at 52% 9%, rgba(255, 192, 106, 0.2), transparent 24%),
            radial-gradient(ellipse at 50% 88%, rgba(120, 34, 30, 0.3), transparent 46%),
            linear-gradient(180deg, rgba(36, 6, 9, 0.02) 0%, rgba(45, 8, 12, 0.16) 38%, rgba(44, 9, 13, 0.78) 100%),
            url("/skins/RubyVillage.png") center top / cover no-repeat,
            #120507;
          box-shadow:
            0 -10px 38px rgba(255, 192, 106, 0.14),
            0 14px 42px rgba(12, 3, 5, 0.46),
            0 0 42px rgba(255, 93, 72, 0.12),
            inset 0 0 36px rgba(255, 192, 106, 0.08);
        }
        html[data-bb-skin="ruby-village"] .bb-blue-storm-mobile-stage {
          margin-top: 0 !important;
          padding-top: 22px !important;
          padding-bottom: 28px !important;
        }
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage {
          position: relative;
          isolation: isolate;
          padding-top: clamp(18px, 3vw, 34px);
          overflow: hidden;
          border-radius: clamp(26px, 4vw, 44px);
          border-top: 1px solid rgba(245, 178, 91, 0.3);
          border-bottom: 1px solid rgba(255, 210, 138, 0.22);
          background:
            radial-gradient(circle at 54% 9%, rgba(255, 210, 138, 0.2), transparent 24%),
            radial-gradient(ellipse at 50% 88%, rgba(148, 91, 45, 0.3), transparent 46%),
            linear-gradient(180deg, rgba(22, 13, 8, 0.02) 0%, rgba(32, 19, 12, 0.16) 38%, rgba(39, 24, 17, 0.78) 100%),
            var(--bb-skin-bg-image-mobile),
            #170f0a;
          background-position: center top;
          background-size: cover;
          background-repeat: no-repeat;
          box-shadow:
            0 -10px 38px rgba(255, 210, 138, 0.14),
            0 14px 42px rgba(18, 10, 5, 0.46),
            0 0 42px rgba(245, 178, 91, 0.12),
            inset 0 0 36px rgba(255, 210, 138, 0.08);
        }
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-mobile-stage {
          margin-top: 0 !important;
          padding-top: 22px !important;
          padding-bottom: 28px !important;
        }
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage {
          position: relative;
          isolation: isolate;
          padding-top: clamp(18px, 3vw, 34px);
          overflow: hidden;
          border-radius: clamp(26px, 4vw, 44px);
          border-top: 1px solid rgba(233, 146, 101, 0.3);
          border-bottom: 1px solid rgba(244, 179, 95, 0.22);
          background:
            radial-gradient(circle at 52% 9%, rgba(255, 230, 164, 0.22), transparent 24%),
            radial-gradient(ellipse at 50% 88%, rgba(255, 203, 169, 0.3), transparent 46%),
            linear-gradient(180deg, rgba(255, 247, 234, 0.02) 0%, rgba(255, 229, 207, 0.14) 38%, rgba(255, 238, 219, 0.74) 100%),
            var(--bb-skin-bg-image-mobile),
            #fff3e3;
          background-position: center top;
          background-size: cover;
          background-repeat: no-repeat;
          box-shadow:
            0 -10px 38px rgba(244, 179, 95, 0.14),
            0 14px 42px rgba(120, 70, 40, 0.24),
            0 0 42px rgba(233, 146, 101, 0.12),
            inset 0 0 36px rgba(255, 230, 164, 0.1);
        }
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-mobile-stage {
          margin-top: 0 !important;
          padding-top: 22px !important;
          padding-bottom: 28px !important;
        }
        html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::before,
        html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::after,
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::before,
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::after,
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::before,
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::after,
        html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::before,
        html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::before,
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::before,
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::before {
          background:
            radial-gradient(circle at 51% 8%, rgba(184, 235, 255, 0.18), transparent 16%),
            radial-gradient(circle at 68% 24%, rgba(58, 166, 255, 0.1), transparent 26%);
          mix-blend-mode: screen;
          animation: bb-blue-storm-lightning 9s ease-in-out infinite;
        }
        html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 12% 18%, rgba(148, 216, 255, 0.06), transparent 32%);
          filter: blur(3px);
          opacity: 0.24;
          animation: bb-blue-storm-mist 18s ease-in-out infinite alternate;
        }
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::before {
          background:
            radial-gradient(circle at 50% 8%, rgba(255, 246, 209, 0.32), transparent 18%),
            radial-gradient(circle at 70% 26%, rgba(215, 184, 107, 0.18), transparent 26%),
            linear-gradient(90deg, transparent 0%, rgba(175, 207, 122, 0.08) 48%, transparent 76%);
          mix-blend-mode: screen;
          animation: bb-midnight-garden-moonlight 16s ease-in-out infinite;
        }
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 14% 18%, rgba(175, 207, 122, 0.12), transparent 32%),
            linear-gradient(115deg, transparent 0%, rgba(238, 229, 190, 0.1) 48%, transparent 76%);
          filter: blur(2px);
          opacity: 0.86;
          animation: bb-midnight-garden-mist 24s ease-in-out infinite alternate;
        }
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::before {
          background:
            radial-gradient(circle at 50% 8%, rgba(255, 238, 255, 0.36), transparent 18%),
            radial-gradient(circle at 70% 26%, rgba(245, 203, 255, 0.2), transparent 26%),
            linear-gradient(90deg, transparent 0%, rgba(207, 174, 255, 0.1) 48%, transparent 76%);
          mix-blend-mode: screen;
          animation: bb-lavender-prayer-moonlight 17s ease-in-out infinite;
        }
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 14% 18%, rgba(207, 174, 255, 0.12), transparent 32%),
            linear-gradient(115deg, transparent 0%, rgba(255, 245, 255, 0.1) 48%, transparent 76%);
          filter: blur(2px);
          opacity: 0.86;
          animation: bb-lavender-prayer-mist 25s ease-in-out infinite alternate;
        }
        html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::before {
          background:
            radial-gradient(circle at 50% 8%, rgba(255, 205, 124, 0.34), transparent 18%),
            radial-gradient(circle at 70% 26%, rgba(255, 93, 72, 0.2), transparent 26%),
            linear-gradient(90deg, transparent 0%, rgba(255, 115, 95, 0.1) 48%, transparent 76%);
          mix-blend-mode: screen;
          animation: bb-ruby-village-ember 16s ease-in-out infinite;
        }
        html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 14% 18%, rgba(255, 115, 95, 0.12), transparent 32%),
            linear-gradient(115deg, transparent 0%, rgba(255, 219, 180, 0.1) 48%, transparent 76%);
          filter: blur(2px);
          opacity: 0.86;
          animation: bb-ruby-village-mist 24s ease-in-out infinite alternate;
        }
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::before {
          background:
            radial-gradient(circle at 54% 8%, rgba(255, 210, 138, 0.34), transparent 18%),
            radial-gradient(circle at 70% 26%, rgba(245, 178, 91, 0.18), transparent 26%),
            linear-gradient(90deg, transparent 0%, rgba(255, 244, 222, 0.09) 48%, transparent 76%);
          mix-blend-mode: screen;
          animation: bb-slow-mornings-candle 15s ease-in-out infinite;
        }
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::after {
          background:
            repeating-linear-gradient(108deg, rgba(255, 232, 190, 0.1) 0 1px, transparent 1px 28px),
            radial-gradient(circle at 14% 18%, rgba(245, 178, 91, 0.12), transparent 32%),
            linear-gradient(115deg, transparent 0%, rgba(255, 244, 222, 0.1) 48%, transparent 76%);
          background-size: 180px 260px, 100% 100%, 100% 100%;
          filter: blur(1.2px);
          opacity: 0.78;
          animation: bb-slow-mornings-steam 26s ease-in-out infinite alternate;
        }
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::before {
          background:
            radial-gradient(circle at 52% 8%, rgba(255, 230, 164, 0.36), transparent 18%),
            radial-gradient(circle at 70% 26%, rgba(255, 178, 150, 0.18), transparent 26%),
            linear-gradient(90deg, transparent 0%, rgba(255, 248, 236, 0.1) 48%, transparent 76%);
          mix-blend-mode: screen;
          animation: bb-morning-mercy-sunrise 16s ease-in-out infinite;
        }
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 18% 24%, rgba(255, 182, 170, 0.3) 0 2px, transparent 4px),
            radial-gradient(circle at 72% 34%, rgba(244, 179, 95, 0.2) 0 1.6px, transparent 3px),
            linear-gradient(115deg, transparent 0%, rgba(255, 248, 236, 0.12) 48%, transparent 76%);
          background-size: 150px 190px, 230px 260px, 100% 100%;
          filter: blur(1px);
          opacity: 0.68;
          animation: bb-morning-mercy-petals 24s ease-in-out infinite alternate;
        }
        html[data-bb-skin="blue-storm"] .bb-blue-storm-stage > *,
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage > *,
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage > *,
        html[data-bb-skin="ruby-village"] .bb-blue-storm-stage > * {
          position: relative;
          z-index: 1;
        }
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage > * {
          position: relative;
          z-index: 1;
        }
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage > * {
          position: relative;
          z-index: 1;
        }
        html[data-bb-skin="blue-storm"] .dashboard-shell::after,
        html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 12% 18%, rgba(148, 216, 255, 0.055), transparent 32%),
            radial-gradient(circle at 86% 22%, rgba(93, 214, 255, 0.045), transparent 34%) !important;
          background-size: 100% 100%, 100% 100%;
          filter: blur(3px);
          opacity: 0.22;
          animation: bb-blue-storm-mist 20s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="midnight-garden"] .dashboard-shell::after,
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 12% 18%, rgba(198, 255, 139, 0.6) 0 1.5px, transparent 3px),
            radial-gradient(circle at 78% 30%, rgba(255, 224, 132, 0.52) 0 1.5px, transparent 3px),
            radial-gradient(ellipse at 18% 78%, rgba(175, 207, 122, 0.12), transparent 36%),
            linear-gradient(105deg, transparent 0%, rgba(215, 184, 107, 0.1) 42%, transparent 72%) !important;
          background-size: 92px 116px, 136px 152px, 100% 100%, 100% 100%;
          filter: blur(0.8px);
          opacity: 0.72;
          animation: bb-dashboard-fireflies 13s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="lavender-prayer"] .dashboard-shell::after,
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 20% 24%, rgba(255, 244, 255, 0.75) 0 1px, transparent 2.5px),
            radial-gradient(circle at 72% 16%, rgba(207, 174, 255, 0.58) 0 1.5px, transparent 3px),
            radial-gradient(ellipse at 50% 82%, rgba(207, 174, 255, 0.18), transparent 42%),
            linear-gradient(115deg, transparent 0%, rgba(255, 245, 255, 0.12) 48%, transparent 76%) !important;
          background-size: 88px 96px, 144px 138px, 100% 100%, 100% 100%;
          filter: blur(1px);
          opacity: 0.78;
          animation: bb-dashboard-lavender-stars 16s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="ruby-village"] .dashboard-shell::after,
        html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 18% 24%, rgba(255, 255, 255, 0.72) 0 1px, transparent 2.4px),
            radial-gradient(circle at 76% 34%, rgba(255, 244, 220, 0.58) 0 1.2px, transparent 2.8px),
            radial-gradient(circle at 42% 16%, rgba(255, 192, 106, 0.24) 0 1.6px, transparent 4px),
            repeating-linear-gradient(98deg, transparent 0 58px, rgba(255, 219, 180, 0.06) 58px 60px, transparent 60px 110px),
            radial-gradient(ellipse at 50% 88%, rgba(255, 93, 72, 0.16), transparent 42%) !important;
          background-size: 150px 190px, 220px 260px, 180px 220px, 260px 100%, 100% 100%;
          filter: blur(0.45px);
          opacity: 0.64;
          animation: bb-dashboard-ruby-sparkles 18s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="blue-storm"] .dashboard-shell::before,
        html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::before {
          animation: bb-dashboard-storm-flash 10s ease-in-out infinite !important;
        }
        html[data-bb-skin="midnight-garden"] .dashboard-shell::before,
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::before {
          animation: bb-dashboard-forest-wind 18s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="lavender-prayer"] .dashboard-shell::before,
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::before {
          animation: bb-dashboard-prayer-fog 20s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="ruby-village"] .dashboard-shell::before,
        html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::before {
          animation: bb-dashboard-heat-pulse 13s ease-in-out infinite !important;
        }
        html[data-bb-skin="slow-mornings"] .dashboard-shell::after,
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::after {
          background:
            repeating-linear-gradient(108deg, rgba(255, 232, 190, 0.1) 0 1px, transparent 1px 28px),
            radial-gradient(circle at 18% 24%, rgba(255, 210, 138, 0.24) 0 2px, transparent 4px),
            radial-gradient(circle at 72% 34%, rgba(245, 178, 91, 0.16) 0 1.5px, transparent 3px),
            linear-gradient(115deg, transparent 0%, rgba(255, 244, 222, 0.1) 48%, transparent 76%) !important;
          background-size: 180px 260px, 160px 190px, 220px 250px, 100% 100%;
          filter: blur(1.1px);
          opacity: 0.72;
          animation: bb-dashboard-slow-rain 18s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="slow-mornings"] .dashboard-shell::before,
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::before {
          animation: bb-dashboard-candle-steam 19s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="morning-mercy"] .dashboard-shell::after,
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::after {
          background:
            radial-gradient(circle at 18% 24%, rgba(255, 182, 170, 0.34) 0 2px, transparent 4px),
            radial-gradient(circle at 72% 34%, rgba(244, 179, 95, 0.22) 0 1.6px, transparent 3px),
            radial-gradient(circle at 44% 18%, rgba(255, 230, 164, 0.16), transparent 24%),
            linear-gradient(115deg, transparent 0%, rgba(255, 248, 236, 0.12) 48%, transparent 76%) !important;
          background-size: 150px 190px, 230px 260px, 100% 100%, 100% 100%;
          filter: blur(1px);
          opacity: 0.62;
          animation: bb-dashboard-mercy-petals 18s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="morning-mercy"] .dashboard-shell::before,
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::before {
          animation: bb-dashboard-mercy-sunrise 17s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="carolina-coastline"] .dashboard-shell::after,
        html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage::after {
          background:
            repeating-linear-gradient(104deg, rgba(200, 230, 247, 0.08) 0 1px, transparent 1px 34px),
            radial-gradient(circle at 18% 24%, rgba(123, 175, 212, 0.16), transparent 34%),
            linear-gradient(115deg, transparent 0%, rgba(166, 216, 244, 0.12) 48%, transparent 76%) !important;
          background-size: 220px 280px, 100% 100%, 100% 100%;
          filter: blur(1.4px);
          opacity: 0.68;
          animation: bb-dashboard-carolina-mist 20s ease-in-out infinite alternate !important;
        }
        html[data-bb-skin="carolina-coastline"] .dashboard-shell::before,
        html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage::before {
          background:
            radial-gradient(circle at 52% 8%, rgba(220, 243, 255, 0.24), transparent 18%),
            radial-gradient(circle at 70% 26%, rgba(123, 175, 212, 0.16), transparent 26%),
            linear-gradient(90deg, transparent 0%, rgba(166, 216, 244, 0.1) 48%, transparent 76%) !important;
          mix-blend-mode: screen;
          animation: bb-dashboard-carolina-light 18s ease-in-out infinite alternate !important;
        }
        @keyframes bb-dashboard-storm-rain {
          from { background-position: 0 -180px, 0 -260px, 0 0, 0 0; transform: translate3d(-1%, -1%, 0); }
          to { background-position: -120px 360px, -180px 520px, 0 0, 0 0; transform: translate3d(1%, 1%, 0); }
        }
        @keyframes bb-dashboard-storm-flash {
          0%, 82%, 100% { opacity: 0.08; filter: brightness(1); }
          86% { opacity: 0.22; filter: brightness(1.08); }
          88% { opacity: 0.06; filter: brightness(0.98); }
          91% { opacity: 0.14; filter: brightness(1.04); }
        }
        @keyframes bb-dashboard-fireflies {
          from { background-position: 0 0, 36px 22px, 0 0, 0 0; transform: translate3d(-1%, 1%, 0); }
          to { background-position: 28px -34px, -24px 42px, 0 0, 0 0; transform: translate3d(1.5%, -1%, 0); }
        }
        @keyframes bb-dashboard-forest-wind {
          from { transform: translate3d(-1.5%, 0, 0) skewX(-1deg); opacity: 0.52; }
          to { transform: translate3d(1.5%, -0.5%, 0) skewX(1deg); opacity: 0.82; }
        }
        @keyframes bb-dashboard-lavender-stars {
          from { background-position: 0 0, 26px 10px, 0 0, 0 0; transform: translate3d(-1%, 0, 0); }
          to { background-position: 20px -24px, -28px 34px, 0 0, 0 0; transform: translate3d(1%, -1%, 0); }
        }
        @keyframes bb-dashboard-prayer-fog {
          from { transform: translate3d(-1%, 0, 0) scale(1); opacity: 0.54; }
          to { transform: translate3d(1%, -1%, 0) scale(1.03); opacity: 0.82; }
        }
        @keyframes bb-dashboard-embers {
          from { background-position: 0 60px, 30px 80px, 0 0, 0 0; transform: translate3d(0, 1%, 0); }
          to { background-position: 24px -120px, -34px -160px, 60px 0, 0 0; transform: translate3d(0, -1%, 0); }
        }
        @keyframes bb-dashboard-ruby-sparkles {
          from { background-position: 0 58px, 40px 80px, -18px 40px, 0 0, 0 0; transform: translate3d(-0.4%, 0.5%, 0); opacity: 0.5; }
          to { background-position: 22px -120px, -36px -150px, 28px -92px, 44px 0, 0 0; transform: translate3d(0.5%, -0.7%, 0); opacity: 0.72; }
        }
        @keyframes bb-dashboard-heat-pulse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.5; filter: blur(0); }
          50% { transform: translate3d(0.8%, -0.5%, 0) scale(1.025); opacity: 0.82; filter: blur(0.6px); }
        }
        @keyframes bb-dashboard-slow-rain {
          from { background-position: 0 -80px, 0 30px, 28px 60px, 0 0; transform: translate3d(-0.8%, 0.4%, 0); }
          to { background-position: -80px 260px, 18px -70px, -26px -90px, 0 0; transform: translate3d(0.8%, -0.8%, 0); }
        }
        @keyframes bb-dashboard-candle-steam {
          from { transform: translate3d(-1%, 0.2%, 0) scale(1); opacity: 0.48; filter: blur(0); }
          to { transform: translate3d(1%, -1%, 0) scale(1.03); opacity: 0.76; filter: blur(0.5px); }
        }
        @keyframes bb-dashboard-mercy-petals {
          from { background-position: 0 40px, 34px 62px, 0 0, 0 0; transform: translate3d(-0.8%, 0.4%, 0); }
          to { background-position: 26px -90px, -36px -120px, 0 0, 0 0; transform: translate3d(0.8%, -0.8%, 0); }
        }
        @keyframes bb-dashboard-mercy-sunrise {
          from { transform: translate3d(-0.8%, 0, 0) scale(1); opacity: 0.42; filter: brightness(1); }
          to { transform: translate3d(0.8%, -0.5%, 0) scale(1.025); opacity: 0.74; filter: brightness(1.06); }
        }
        @keyframes bb-dashboard-carolina-mist {
          from { background-position: 0 -80px, 0 0, 0 0; transform: translate3d(-0.8%, 0.4%, 0); }
          to { background-position: -90px 220px, 0 0, 0 0; transform: translate3d(0.8%, -0.8%, 0); }
        }
        @keyframes bb-dashboard-carolina-light {
          from { transform: translate3d(-0.8%, 0, 0) scale(1); opacity: 0.36; filter: brightness(1); }
          to { transform: translate3d(0.8%, -0.5%, 0) scale(1.02); opacity: 0.68; filter: brightness(1.08); }
        }
        html[data-bb-perf-reduce="true"] .dashboard-shell::before,
        html[data-bb-perf-reduce="true"] .dashboard-shell::after,
        html[data-bb-perf-reduce="true"] .bb-blue-storm-stage::before,
        html[data-bb-perf-reduce="true"] .bb-blue-storm-stage::after {
          animation: none !important;
        }
        @media (max-width: 1023px) {
          html[data-bb-skin="blue-storm"] .dashboard-shell,
          html[data-bb-skin="midnight-garden"] .dashboard-shell,
          html[data-bb-skin="lavender-prayer"] .dashboard-shell,
          html[data-bb-skin="ruby-village"] .dashboard-shell,
          html[data-bb-skin="slow-mornings"] .dashboard-shell,
          html[data-bb-skin="morning-mercy"] .dashboard-shell,
          html[data-bb-skin="carolina-coastline"] .dashboard-shell {
            background: transparent !important;
            background-color: transparent !important;
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-mobile-stage,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-mobile-stage,
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-mobile-stage,
          html[data-bb-skin="ruby-village"] .bb-blue-storm-mobile-stage,
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-mobile-stage,
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-mobile-stage,
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-mobile-stage {
            margin-top: 0 !important;
            padding-top: 8px !important;
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
            border-top: 0 !important;
            border-left-color: transparent !important;
            border-right-color: transparent !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
            box-shadow: none !important;
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-mobile-stage::before,
          html[data-bb-skin="blue-storm"] .bb-blue-storm-mobile-stage::after,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-mobile-stage::before,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-mobile-stage::after,
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-mobile-stage::before,
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-mobile-stage::after,
          html[data-bb-skin="ruby-village"] .bb-blue-storm-mobile-stage::before,
          html[data-bb-skin="ruby-village"] .bb-blue-storm-mobile-stage::after,
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-mobile-stage::before,
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-mobile-stage::after,
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-mobile-stage::before,
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-mobile-stage::after,
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-mobile-stage::before,
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-mobile-stage::after {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          html[data-bb-skin="blue-storm"] .dashboard-shell {
            background:
              radial-gradient(circle at 50% -10%, rgba(34, 105, 166, 0.22), transparent 28%),
              linear-gradient(90deg, #06111f 0%, #081a2d 28%, #081a2d 72%, #06111f 100%),
              #061322 !important;
          }
          html[data-bb-skin="midnight-garden"] .dashboard-shell {
            background:
              radial-gradient(circle at 50% -10%, rgba(115, 128, 75, 0.18), transparent 28%),
              linear-gradient(90deg, #050b0d 0%, #081316 28%, #081316 72%, #050b0d 100%),
              #07100f !important;
          }
          html[data-bb-skin="lavender-prayer"] .dashboard-shell {
            background:
              radial-gradient(circle at 50% -10%, rgba(117, 84, 156, 0.2), transparent 28%),
              linear-gradient(90deg, #0e0819 0%, #171024 28%, #171024 72%, #0e0819 100%),
              #130d1f !important;
          }
          html[data-bb-skin="ruby-village"] .dashboard-shell {
            background:
              radial-gradient(circle at 50% -10%, rgba(148, 40, 32, 0.22), transparent 28%),
              linear-gradient(90deg, #100405 0%, #22080c 28%, #22080c 72%, #100405 100%),
              #120507 !important;
          }
          html[data-bb-skin="slow-mornings"] .dashboard-shell {
            background:
              radial-gradient(circle at 50% -10%, rgba(148, 91, 45, 0.22), transparent 28%),
              linear-gradient(90deg, #120b07 0%, #21140d 28%, #21140d 72%, #120b07 100%),
              #170f0a !important;
          }
          html[data-bb-skin="morning-mercy"] .dashboard-shell {
            background:
              radial-gradient(circle at 50% -10%, rgba(244, 179, 95, 0.22), transparent 28%),
              linear-gradient(90deg, #fff0dc 0%, #ffe7d3 28%, #ffe7d3 72%, #fff0dc 100%),
              #fff3e3 !important;
          }
          html[data-bb-skin="carolina-coastline"] .dashboard-shell {
            background:
              radial-gradient(circle at 50% -10%, rgba(123, 175, 212, 0.22), transparent 28%),
              linear-gradient(90deg, #03101d 0%, #061a30 28%, #061a30 72%, #03101d 100%),
              #04111f !important;
          }
          html[data-bb-skin="blue-storm"] .dashboard-shell::before,
          html[data-bb-skin="blue-storm"] .dashboard-shell::after,
          html[data-bb-skin="midnight-garden"] .dashboard-shell::before,
          html[data-bb-skin="midnight-garden"] .dashboard-shell::after,
          html[data-bb-skin="lavender-prayer"] .dashboard-shell::before,
          html[data-bb-skin="lavender-prayer"] .dashboard-shell::after,
          html[data-bb-skin="ruby-village"] .dashboard-shell::before,
          html[data-bb-skin="ruby-village"] .dashboard-shell::after {
            display: none;
          }
          html[data-bb-skin="slow-mornings"] .dashboard-shell::before,
          html[data-bb-skin="slow-mornings"] .dashboard-shell::after {
            display: none;
          }
          html[data-bb-skin="morning-mercy"] .dashboard-shell::before,
          html[data-bb-skin="morning-mercy"] .dashboard-shell::after,
          html[data-bb-skin="carolina-coastline"] .dashboard-shell::before,
          html[data-bb-skin="carolina-coastline"] .dashboard-shell::after {
            display: none;
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-desktop-layout {
            margin-top: 0 !important;
            padding-top: 42px !important;
            padding-bottom: 42px !important;
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage {
            min-height: calc(100vh - 84px);
            overflow: hidden;
            border-top-left-radius: 38px;
            border-top-right-radius: 38px;
            border-bottom-left-radius: 38px;
            border-bottom-right-radius: 38px;
            border-top: 1px solid rgba(145, 226, 255, 0.28);
            border-bottom: 1px solid rgba(145, 226, 255, 0.24);
            border-left: 1px solid rgba(103, 204, 255, 0.22);
            border-right: 1px solid rgba(103, 204, 255, 0.22);
            background:
              radial-gradient(ellipse at 50% 86%, rgba(31, 84, 132, 0.36), transparent 44%),
              linear-gradient(180deg, rgba(2, 9, 20, 0.02) 0%, rgba(3, 12, 28, 0.1) 42%, rgba(7, 20, 38, 0.76) 100%),
              url("/skins/Bluestormskin.png") center top / 100% auto no-repeat,
              #071426;
            box-shadow:
              0 -12px 44px rgba(93, 214, 255, 0.18),
              0 18px 54px rgba(0, 9, 24, 0.56),
              -34px 0 48px rgba(2, 10, 22, 0.58),
              34px 0 48px rgba(2, 10, 22, 0.58),
              0 0 34px rgba(93, 214, 255, 0.2),
              inset 0 0 48px rgba(93, 214, 255, 0.1);
          }
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage {
            min-height: calc(100vh - 84px);
            overflow: hidden;
            border-radius: 38px;
            border: 1px solid rgba(155, 205, 98, 0.32);
            background:
              radial-gradient(circle at 52% 8%, rgba(255, 246, 209, 0.2), transparent 19%),
              radial-gradient(ellipse at 50% 86%, rgba(70, 101, 43, 0.34), transparent 44%),
              linear-gradient(180deg, rgba(4, 8, 12, 0.01) 0%, rgba(5, 12, 16, 0.08) 42%, rgba(14, 31, 18, 0.74) 100%),
              url("/skins/MidnightGarden.png") center top / 100% auto no-repeat,
              #07100f;
            box-shadow:
              0 -12px 44px rgba(215, 184, 107, 0.12),
              0 18px 54px rgba(1, 7, 8, 0.58),
              -34px 0 48px rgba(2, 8, 9, 0.62),
              34px 0 48px rgba(2, 8, 9, 0.62),
              0 0 34px rgba(175, 207, 122, 0.14),
              inset 0 0 48px rgba(215, 184, 107, 0.08);
          }
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage .bb-card,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage .bb-surface,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage .bg-white {
            background:
              linear-gradient(135deg, rgba(24, 53, 28, 0.84), rgba(10, 24, 16, 0.84)) !important;
            border-color: rgba(155, 205, 98, 0.4) !important;
          }
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage {
            min-height: calc(100vh - 84px);
            overflow: hidden;
            border-radius: 38px;
            border: 1px solid rgba(207, 174, 255, 0.26);
            background:
              radial-gradient(circle at 52% 8%, rgba(250, 230, 255, 0.24), transparent 20%),
              radial-gradient(ellipse at 50% 86%, rgba(91, 68, 126, 0.34), transparent 44%),
              linear-gradient(180deg, rgba(18, 10, 32, 0.01) 0%, rgba(20, 12, 38, 0.08) 42%, rgba(25, 16, 42, 0.72) 100%),
              url("/skins/LavenderPrayerSkin.png") center top / 100% auto no-repeat,
              #130d1f;
            box-shadow:
              0 -12px 44px rgba(245, 203, 255, 0.14),
              0 18px 54px rgba(10, 4, 22, 0.58),
              -34px 0 48px rgba(10, 4, 22, 0.62),
              34px 0 48px rgba(10, 4, 22, 0.62),
              0 0 34px rgba(207, 174, 255, 0.16),
              inset 0 0 48px rgba(245, 203, 255, 0.08);
          }
          html[data-bb-skin="ruby-village"] .bb-blue-storm-stage {
            min-height: calc(100vh - 84px);
            overflow: hidden;
            border-radius: 38px;
            border: 1px solid rgba(255, 115, 95, 0.3);
            background:
              radial-gradient(circle at 52% 8%, rgba(255, 192, 106, 0.2), transparent 20%),
              linear-gradient(180deg, rgba(36, 6, 9, 0.01) 0%, rgba(45, 8, 12, 0.09) 42%, rgba(12, 3, 5, 0.58) 100%),
              url("/skins/RubyVillage.png") center top / 100% auto no-repeat,
              #120507;
            box-shadow:
              0 -12px 44px rgba(255, 192, 106, 0.14),
              0 18px 54px rgba(12, 3, 5, 0.62),
              -34px 0 48px rgba(12, 3, 5, 0.66),
              34px 0 48px rgba(12, 3, 5, 0.66),
              0 0 34px rgba(255, 93, 72, 0.16),
              inset 0 0 48px rgba(255, 192, 106, 0.08);
          }
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage {
            min-height: calc(100vh - 84px);
            overflow: hidden;
            border-radius: 38px;
            border: 1px solid rgba(245, 178, 91, 0.3);
            background:
              radial-gradient(circle at 54% 8%, rgba(255, 210, 138, 0.22), transparent 20%),
              radial-gradient(ellipse at 50% 86%, rgba(148, 91, 45, 0.34), transparent 44%),
              linear-gradient(180deg, rgba(22, 13, 8, 0.01) 0%, rgba(32, 19, 12, 0.08) 42%, rgba(26, 15, 10, 0.72) 100%),
              var(--bb-skin-bg-image-desktop),
              #170f0a;
            background-position: center top;
            background-size: 100% auto;
            background-repeat: no-repeat;
            box-shadow:
              0 -12px 44px rgba(255, 210, 138, 0.14),
              0 18px 54px rgba(18, 10, 5, 0.6),
              -34px 0 48px rgba(18, 10, 5, 0.64),
              34px 0 48px rgba(18, 10, 5, 0.64),
              0 0 34px rgba(245, 178, 91, 0.16),
              inset 0 0 48px rgba(255, 210, 138, 0.08);
          }
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage {
            min-height: calc(100vh - 84px);
            overflow: hidden;
            border-radius: 38px;
            border: 1px solid rgba(233, 146, 101, 0.3);
            background:
              radial-gradient(circle at 52% 8%, rgba(255, 230, 164, 0.24), transparent 20%),
              radial-gradient(ellipse at 50% 86%, rgba(255, 203, 169, 0.34), transparent 44%),
              linear-gradient(180deg, rgba(255, 247, 234, 0.02) 0%, rgba(255, 229, 207, 0.08) 42%, rgba(255, 238, 219, 0.7) 100%),
              var(--bb-skin-bg-image-desktop),
              #fff3e3;
            background-position: center top;
            background-size: 100% auto;
            background-repeat: no-repeat;
            box-shadow:
              0 -12px 44px rgba(244, 179, 95, 0.14),
              0 18px 54px rgba(120, 70, 40, 0.24),
              -34px 0 48px rgba(255, 224, 202, 0.4),
              34px 0 48px rgba(255, 224, 202, 0.4),
              0 0 34px rgba(233, 146, 101, 0.16),
              inset 0 0 48px rgba(255, 230, 164, 0.1);
          }
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage {
            min-height: calc(100vh - 84px);
            overflow: hidden;
            border-radius: 38px;
            border: 1px solid rgba(123, 175, 212, 0.34);
            background:
              radial-gradient(circle at 52% 8%, rgba(220, 243, 255, 0.22), transparent 20%),
              radial-gradient(ellipse at 50% 86%, rgba(56, 129, 177, 0.34), transparent 44%),
              linear-gradient(180deg, rgba(4, 17, 31, 0.01) 0%, rgba(6, 21, 39, 0.08) 42%, rgba(4, 13, 24, 0.72) 100%),
              var(--bb-skin-bg-image-desktop),
              #04111f;
            background-position: center top;
            background-size: 100% auto;
            background-repeat: no-repeat;
            box-shadow:
              0 -12px 44px rgba(166, 216, 244, 0.14),
              0 18px 54px rgba(0, 8, 20, 0.62),
              -34px 0 48px rgba(0, 8, 20, 0.66),
              34px 0 48px rgba(0, 8, 20, 0.66),
              0 0 34px rgba(123, 175, 212, 0.16),
              inset 0 0 48px rgba(166, 216, 244, 0.08);
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage > div:first-child {
            padding-top: 0;
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-mobile-stage {
            margin-top: 0 !important;
            padding-top: 22px !important;
            padding-bottom: 28px !important;
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::before,
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::after,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::before,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::after,
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::before,
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::after,
          html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::before,
          html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::before {
            background:
              radial-gradient(circle at 51% 8%, rgba(184, 235, 255, 0.14), transparent 16%),
              radial-gradient(circle at 68% 24%, rgba(58, 166, 255, 0.08), transparent 26%);
            mix-blend-mode: screen;
            animation: bb-blue-storm-lightning 9s ease-in-out infinite;
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::after {
            background:
              radial-gradient(circle at 12% 18%, rgba(148, 216, 255, 0.05), transparent 32%);
            filter: blur(3px);
            opacity: 0.22;
            animation: bb-blue-storm-mist 18s ease-in-out infinite alternate;
          }
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::before {
            background:
              radial-gradient(circle at 50% 8%, rgba(255, 246, 209, 0.3), transparent 18%),
              radial-gradient(circle at 70% 26%, rgba(215, 184, 107, 0.16), transparent 26%),
              linear-gradient(90deg, transparent 0%, rgba(175, 207, 122, 0.06) 48%, transparent 76%);
            mix-blend-mode: screen;
            animation: bb-midnight-garden-moonlight 16s ease-in-out infinite;
          }
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::after {
            background:
              radial-gradient(circle at 14% 18%, rgba(175, 207, 122, 0.1), transparent 32%),
              linear-gradient(115deg, transparent 0%, rgba(238, 229, 190, 0.08) 48%, transparent 76%);
            filter: blur(2px);
            opacity: 0.82;
            animation: bb-midnight-garden-mist 24s ease-in-out infinite alternate;
          }
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::before {
            background:
              radial-gradient(circle at 50% 8%, rgba(255, 238, 255, 0.34), transparent 18%),
              radial-gradient(circle at 70% 26%, rgba(245, 203, 255, 0.18), transparent 26%),
              linear-gradient(90deg, transparent 0%, rgba(207, 174, 255, 0.08) 48%, transparent 76%);
            mix-blend-mode: screen;
            animation: bb-lavender-prayer-moonlight 17s ease-in-out infinite;
          }
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::after {
            background:
              radial-gradient(circle at 14% 18%, rgba(207, 174, 255, 0.1), transparent 32%),
              linear-gradient(115deg, transparent 0%, rgba(255, 245, 255, 0.09) 48%, transparent 76%);
            filter: blur(2px);
            opacity: 0.84;
            animation: bb-lavender-prayer-mist 25s ease-in-out infinite alternate;
          }
          html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::before {
            background:
              radial-gradient(circle at 50% 8%, rgba(255, 205, 124, 0.32), transparent 18%),
              radial-gradient(circle at 70% 26%, rgba(255, 93, 72, 0.18), transparent 26%),
              linear-gradient(90deg, transparent 0%, rgba(255, 115, 95, 0.08) 48%, transparent 76%);
            mix-blend-mode: screen;
            animation: bb-ruby-village-ember 16s ease-in-out infinite;
          }
          html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::after {
            background:
              radial-gradient(circle at 18% 24%, rgba(255, 255, 255, 0.7) 0 1px, transparent 2.4px),
              radial-gradient(circle at 76% 34%, rgba(255, 244, 220, 0.56) 0 1.2px, transparent 2.8px),
              radial-gradient(circle at 42% 16%, rgba(255, 192, 106, 0.2) 0 1.6px, transparent 4px),
              linear-gradient(115deg, transparent 0%, rgba(255, 219, 180, 0.08) 48%, transparent 76%);
            background-size: 150px 190px, 220px 260px, 180px 220px, 100% 100%;
            filter: blur(0.5px);
            opacity: 0.66;
            animation: bb-dashboard-ruby-sparkles 18s ease-in-out infinite alternate;
          }
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::before {
            background:
              radial-gradient(circle at 54% 8%, rgba(255, 210, 138, 0.32), transparent 18%),
              radial-gradient(circle at 70% 26%, rgba(245, 178, 91, 0.18), transparent 26%),
              linear-gradient(90deg, transparent 0%, rgba(255, 244, 222, 0.08) 48%, transparent 76%);
            mix-blend-mode: screen;
            animation: bb-dashboard-candle-steam 19s ease-in-out infinite alternate;
          }
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::after {
            background:
              repeating-linear-gradient(108deg, rgba(255, 232, 190, 0.08) 0 1px, transparent 1px 28px),
              radial-gradient(circle at 14% 18%, rgba(245, 178, 91, 0.1), transparent 32%),
              linear-gradient(115deg, transparent 0%, rgba(255, 244, 222, 0.08) 48%, transparent 76%);
            background-size: 180px 260px, 100% 100%, 100% 100%;
            filter: blur(1.2px);
            opacity: 0.74;
            animation: bb-dashboard-slow-rain 18s ease-in-out infinite alternate;
          }
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::before {
            background:
              radial-gradient(circle at 52% 8%, rgba(255, 230, 164, 0.34), transparent 18%),
              radial-gradient(circle at 70% 26%, rgba(255, 178, 150, 0.18), transparent 26%),
              linear-gradient(90deg, transparent 0%, rgba(255, 248, 236, 0.1) 48%, transparent 76%);
            mix-blend-mode: screen;
            animation: bb-dashboard-mercy-sunrise 17s ease-in-out infinite alternate;
          }
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::after {
            background:
              radial-gradient(circle at 18% 24%, rgba(255, 182, 170, 0.28) 0 2px, transparent 4px),
              radial-gradient(circle at 72% 34%, rgba(244, 179, 95, 0.18) 0 1.6px, transparent 3px),
              linear-gradient(115deg, transparent 0%, rgba(255, 248, 236, 0.1) 48%, transparent 76%);
            background-size: 150px 190px, 230px 260px, 100% 100%;
            filter: blur(1px);
            opacity: 0.66;
            animation: bb-dashboard-mercy-petals 18s ease-in-out infinite alternate;
          }
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage::before,
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage::before {
            background:
              radial-gradient(circle at 52% 8%, rgba(220, 243, 255, 0.3), transparent 18%),
              radial-gradient(circle at 70% 26%, rgba(123, 175, 212, 0.18), transparent 26%),
              linear-gradient(90deg, transparent 0%, rgba(166, 216, 244, 0.1) 48%, transparent 76%);
            mix-blend-mode: screen;
            animation: bb-dashboard-carolina-light 18s ease-in-out infinite alternate;
          }
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage::after {
            background:
              repeating-linear-gradient(104deg, rgba(200, 230, 247, 0.08) 0 1px, transparent 1px 34px),
              radial-gradient(circle at 14% 18%, rgba(123, 175, 212, 0.1), transparent 32%),
              linear-gradient(115deg, transparent 0%, rgba(166, 216, 244, 0.1) 48%, transparent 76%);
            background-size: 220px 280px, 100% 100%, 100% 100%;
            filter: blur(1.4px);
            opacity: 0.72;
            animation: bb-dashboard-carolina-mist 20s ease-in-out infinite alternate;
          }
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage > *,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage > *,
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage > *,
          html[data-bb-skin="ruby-village"] .bb-blue-storm-stage > * {
            position: relative;
            z-index: 1;
          }
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage > * {
            position: relative;
            z-index: 1;
          }
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage > * {
            position: relative;
            z-index: 1;
          }
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage > * {
            position: relative;
            z-index: 1;
          }
        }
        html[data-bb-skin="blue-storm"] .dashboard-shell,
        html[data-bb-skin="midnight-garden"] .dashboard-shell,
        html[data-bb-skin="lavender-prayer"] .dashboard-shell,
        html[data-bb-skin="ruby-village"] .dashboard-shell,
        html[data-bb-skin="blue-storm"] .bb-blue-storm-stage,
        html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage,
        html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage,
        html[data-bb-skin="ruby-village"] .bb-blue-storm-stage,
        html[data-bb-skin="slow-mornings"] .dashboard-shell,
        html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage,
        html[data-bb-skin="morning-mercy"] .dashboard-shell,
        html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage,
        html[data-bb-skin="carolina-coastline"] .dashboard-shell,
        html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage {
          overflow: visible !important;
        }
        @media (max-width: 1023px) {
          .dashboard-shell,
          .bb-blue-storm-stage,
          .bb-blue-storm-mobile-stage {
            overflow-x: hidden !important;
            overflow-y: visible !important;
            min-height: auto !important;
            animation: none !important;
          }
          html[data-bb-skin="blue-storm"] .dashboard-shell,
          html[data-bb-skin="midnight-garden"] .dashboard-shell,
          html[data-bb-skin="lavender-prayer"] .dashboard-shell,
          html[data-bb-skin="ruby-village"] .dashboard-shell,
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage,
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage,
          html[data-bb-skin="ruby-village"] .bb-blue-storm-stage,
          html[data-bb-skin="slow-mornings"] .dashboard-shell,
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage,
          html[data-bb-skin="morning-mercy"] .dashboard-shell,
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage,
          html[data-bb-skin="carolina-coastline"] .dashboard-shell,
          html[data-bb-skin="carolina-coastline"] .bb-blue-storm-stage {
            isolation: auto !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          html[data-bb-skin="blue-storm"] .dashboard-shell::before,
          html[data-bb-skin="blue-storm"] .dashboard-shell::after,
          html[data-bb-skin="midnight-garden"] .dashboard-shell::before,
          html[data-bb-skin="midnight-garden"] .dashboard-shell::after,
          html[data-bb-skin="lavender-prayer"] .dashboard-shell::before,
          html[data-bb-skin="lavender-prayer"] .dashboard-shell::after,
          html[data-bb-skin="ruby-village"] .dashboard-shell::before,
          html[data-bb-skin="ruby-village"] .dashboard-shell::after,
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::before,
          html[data-bb-skin="blue-storm"] .bb-blue-storm-stage::after,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::before,
          html[data-bb-skin="midnight-garden"] .bb-blue-storm-stage::after,
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::before,
          html[data-bb-skin="lavender-prayer"] .bb-blue-storm-stage::after,
          html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::before,
          html[data-bb-skin="ruby-village"] .bb-blue-storm-stage::after,
          html[data-bb-skin="slow-mornings"] .dashboard-shell::before,
          html[data-bb-skin="slow-mornings"] .dashboard-shell::after,
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::before,
          html[data-bb-skin="slow-mornings"] .bb-blue-storm-stage::after,
          html[data-bb-skin="morning-mercy"] .dashboard-shell::before,
          html[data-bb-skin="morning-mercy"] .dashboard-shell::after,
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::before,
          html[data-bb-skin="morning-mercy"] .bb-blue-storm-stage::after {
            display: none !important;
            animation: none !important;
          }
        }
        @keyframes dashboard-inline-task-slide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashboard-inline-reader-slide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dashboard-inline-task {
          animation: dashboard-inline-task-slide 260ms ease-out both;
        }
        .dashboard-inline-reader {
          animation: dashboard-inline-reader-slide 260ms ease-out both;
        }
      `}</style>
      <div className="dashboard-shell min-h-screen bg-[linear-gradient(180deg,#f5f8ff_0%,#eef4ff_45%,#fbf8ef_100%)] pb-12">
      {/* DESKTOP LAYOUT: Left Ad | Content | Right Ad */}
      <div className="bb-blue-storm-desktop-layout hidden lg:flex max-w-7xl mx-auto px-4 mt-4 lg:mt-0 lg:py-4 gap-6">
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
        <div className="bb-blue-storm-stage flex-1 max-w-2xl mx-auto">
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
          activeTask={selectedDashboardTask}
          onActiveTaskClose={() => setSelectedDashboardTask(null)}
          onActiveTaskProgressUpdated={handleDashboardTaskProgressUpdated}
          cycleStartedAt={louisDailyTaskCycleStartedAt}
          studySettingsOpenRequest={studySettingsOpenRequest}
          homeHeader={renderDashboardStatsRow()}
          homePanelOverride={renderDashboardHomePanelOverride()}
          deepStudyNode={renderDeepStudyCinematicCard()}
          suppressCompletedTasksPanel={showBibleProgressPanel || deepStudyMode === "complete" || deepStudyMode === "results" || deepStudyMode === "info"}
          onHomeReset={resetDashboardHomePanel}
          isOwnerDashboard={isOwnerDashboard}
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
      <div className="bb-blue-storm-mobile-stage bb-blue-storm-stage lg:hidden max-w-2xl mx-auto px-4 mt-4">
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
          activeTask={selectedDashboardTask}
          onActiveTaskClose={() => setSelectedDashboardTask(null)}
          onActiveTaskProgressUpdated={handleDashboardTaskProgressUpdated}
          cycleStartedAt={louisDailyTaskCycleStartedAt}
          studySettingsOpenRequest={studySettingsOpenRequest}
          homeHeader={renderDashboardStatsRow()}
          homePanelOverride={renderDashboardHomePanelOverride()}
          deepStudyNode={renderDeepStudyCinematicCard()}
          suppressCompletedTasksPanel={showBibleProgressPanel || deepStudyMode === "complete" || deepStudyMode === "results" || deepStudyMode === "info"}
          onHomeReset={resetDashboardHomePanel}
          isOwnerDashboard={isOwnerDashboard}
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

      {renderStorePromoModal()}

      <ModalShell
        isOpen={showDeepStudyUpgradeModal}
        onClose={() => setShowDeepStudyUpgradeModal(false)}
        backdropColor="bg-black/55"
      >
        <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
          <div className="px-6 py-7 text-center sm:px-8">
            <div className="flex justify-center">
              <LouisAvatar mood="wave" size={128} />
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Deep Study Pro</p>
            <h2 className="mt-2 text-3xl font-black text-[var(--bb-text-primary,#21304f)]">More Study Time Options</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#58709d)]">
              Upgrade to unlock the 5, 10, 45, and 60 minute Deep Study options.
            </p>
            <Link
              href="/upgrade"
              className="mt-5 inline-flex w-full justify-center rounded-full bg-[var(--bb-button,#7BAFD4)] px-5 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
            >
              Upgrade to Pro
            </Link>
            <button
              type="button"
              onClick={() => setShowDeepStudyUpgradeModal(false)}
              className="mt-2 inline-flex w-full justify-center rounded-full border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] px-5 py-3 text-sm font-black text-[var(--bb-text-primary,#21304f)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
            >
              Not now
            </button>
          </div>
        </div>
      </ModalShell>

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
      <ModalShell
        isOpen={activeDashboardRewardPopup?.popup_id === "dashboard:reward:buddy-selection"}
        onClose={() => setBuddySelectionWelcome(null)}
        backdropColor="bg-black/45"
      >
        {buddySelectionWelcome ? (
          <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
            <div className="bg-[var(--bb-card,#ffffff)] px-6 py-8 text-center sm:px-8">
              <div className="flex justify-center">
                <LouisAvatar buddyId={buddySelectionWelcome.buddyId} mood="wave" size={142} />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#5f86bd)]">
                {buddySelectionCopy?.eyebrow || `${buddySelectionWelcome.buddyName} is ready`}
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#21304f)] sm:text-4xl">
                {buddySelectionCopy?.title || "New Bible Buddy selected"}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-base font-semibold leading-7 text-[var(--bb-text-secondary,#355487)]">
                {buddySelectionCopy?.body || `I am looking forward to studying ${buddyWelcomeStudyTitle} with you.`}
              </p>
              <button
                type="button"
                onClick={() => setBuddySelectionWelcome(null)}
                className="mt-6 w-full max-w-sm rounded-full bg-[var(--bb-button,#7BAFD4)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#0f172a)] shadow-sm transition hover:brightness-95"
              >
                OK
              </button>
            </div>
          </div>
        ) : null}
      </ModalShell>

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
        isOpen={activeDashboardRewardPopup?.popup_id === "dashboard:reward:moderator-weekly-payout"}
        onClose={() => void acknowledgeModeratorWeeklyPayout()}
        backdropColor="bg-black/45"
        zIndex="z-[220]"
        scrollable
      >
        {moderatorWeeklyPayoutReveal ? (
          <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#f1d99f)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
            <div className="relative overflow-hidden px-6 py-8 text-center sm:px-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(255,192,106,0.34),transparent_55%)]" />
              <div className="relative flex justify-end">
                <button
                  type="button"
                  onClick={() => void acknowledgeModeratorWeeklyPayout()}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/85 text-xl font-black text-[var(--bb-text-secondary,#516784)] shadow-sm transition hover:brightness-95"
                  aria-label="Close moderator payout message"
                >
                  x
                </button>
              </div>

              <div className="relative mx-auto mt-1 grid h-28 w-28 place-items-center rounded-full border border-[#f1d99f] bg-[#fff7df] shadow-[0_18px_40px_rgba(154,97,21,0.2)]">
                <span className="text-5xl" aria-hidden="true">💎</span>
              </div>

              <p className="relative mt-5 text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#9a6115)]">
                Moderator weekly pay
              </p>
              <h2 className="relative mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#21304f)] sm:text-4xl">
                {moderatorWeeklyPayoutReveal.kind === "skin_bonus"
                  ? `Premium skins are here. Here is ${moderatorWeeklyPayoutReveal.amount.toLocaleString()} diamonds.`
                  : `You have been paid ${moderatorWeeklyPayoutReveal.amount.toLocaleString()} diamonds`}
              </h2>
              <p className="relative mx-auto mt-3 max-w-sm text-base font-semibold leading-7 text-[var(--bb-text-secondary,#58709d)]">
                {moderatorWeeklyPayoutReveal.kind === "skin_bonus"
                  ? "Thanks for being a moderator. Here is some loot to test and purchase the new premium skins."
                  : "Thank you for being a Bible Buddy moderator this week. The diamonds are already in your stash."}
              </p>

              <div className="relative mt-6 grid grid-cols-2 gap-2.5">
                <div className="rounded-[20px] border border-[var(--bb-card-border,#f1d99f)] bg-[var(--bb-surface-soft,#fff7df)] px-3 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#8a6115)]">Reward</p>
                  <p className="mt-1 text-2xl font-black text-[var(--bb-text-primary,#21304f)]">+{moderatorWeeklyPayoutReveal.amount.toLocaleString()}</p>
                  <p className="text-xs font-black text-[var(--bb-accent,#9a6115)]">Diamonds</p>
                </div>
                <div className="rounded-[20px] border border-[var(--bb-card-border,#f1d99f)] bg-[var(--bb-surface-soft,#fff7df)] px-3 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#8a6115)]">Week</p>
                  <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#21304f)]">
                    {moderatorWeeklyPayoutReveal.kind === "skin_bonus" ? "Signing Bonus" : moderatorWeeklyPayoutReveal.weekStart}
                  </p>
                  <p className="text-xs font-black text-[var(--bb-accent,#9a6115)]">
                    {moderatorWeeklyPayoutReveal.kind === "skin_bonus" ? "Test" : "Paid"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => void acknowledgeModeratorWeeklyPayout()}
                className="relative mt-6 w-full max-w-sm rounded-full bg-[var(--bb-button,#7BAFD4)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#0f172a)] shadow-sm transition hover:brightness-95"
              >
                Awesome
              </button>
            </div>
          </div>
        ) : null}
      </ModalShell>

      <ModalShell
        isOpen={Boolean(skinApplyPrompt)}
        onClose={() => setSkinApplyPrompt(null)}
        backdropColor="bg-black/50"
      >
        {skinApplyPrompt ? (
          <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
            <div className="relative overflow-hidden px-6 pb-7 pt-5 text-center sm:px-8">
              <div
                className="absolute inset-x-0 top-0 h-36"
                style={{ background: `linear-gradient(135deg, ${skinApplyPrompt.item.accent}30, transparent)` }}
                aria-hidden="true"
              />
              <div className="relative mx-auto mt-4 h-36 w-36 overflow-hidden rounded-[28px] border border-white/30 bg-cover bg-center shadow-[0_20px_46px_rgba(0,0,0,0.22)]" style={{ backgroundImage: `url(${skinApplyPrompt.item.imageSrc})` }} />
              <p className="relative mt-5 text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#2563eb)]">Set dashboard skin?</p>
              <h2 className="relative mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#21304f)]">
                Use {skinApplyPrompt.item.title} on your dashboard?
              </h2>
              <p className="relative mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#58709d)]">
                This will save {skinApplyPrompt.item.title} as your active Bible Buddy skin and send you back to the dashboard.
              </p>
              <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setSkinApplyPrompt(null)}
                  className="rounded-full border border-[var(--bb-card-border,#d7e4f7)] bg-white px-6 py-3 text-sm font-black text-[var(--bb-text-primary,#21304f)] shadow-sm transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
                >
                  No, keep shopping
                </button>
                <button
                  type="button"
                  onClick={() => void confirmApplyPremiumSkin()}
                  disabled={storeBuyingId === skinApplyPrompt.item.id}
                  className="rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 disabled:opacity-60"
                >
                  {storeBuyingId === skinApplyPrompt.item.id ? "Applying..." : "Yes, apply it"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </ModalShell>

      <ModalShell
        isOpen={Boolean(skinAppliedCongrats)}
        onClose={() => setSkinAppliedCongrats(null)}
        backdropColor="bg-black/45"
      >
        {skinAppliedCongrats ? (
          <div className="mx-4 w-full max-w-md overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
            <div className="px-6 py-7 text-center">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#2563eb)]">Skin applied</p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#21304f)]">
                {skinAppliedCongrats.skinName} is live.
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#58709d)]">
                Your dashboard has been updated with your new Bible Buddy skin.
              </p>
              <button
                type="button"
                onClick={() => setSkinAppliedCongrats(null)}
                className="mt-6 w-full rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
              >
                OK
              </button>
            </div>
          </div>
        ) : null}
      </ModalShell>

      <ModalShell
        isOpen={activeDashboardRewardPopup?.popup_id === "dashboard:reward:store-purchase"}
        onClose={() => setStorePurchaseCongrats(null)}
        backdropColor="bg-black/45"
      >
        {storePurchaseCongrats ? (
          <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
            <div className="relative overflow-hidden px-6 pb-7 pt-5 text-center sm:px-8">
              <div
                className="absolute inset-x-0 top-0 h-32"
                style={{ background: `linear-gradient(135deg, ${storePurchaseCongrats.item.accent}26, transparent)` }}
                aria-hidden="true"
              />
              <div className="relative flex justify-end">
                <button
                  type="button"
                  onClick={() => setStorePurchaseCongrats(null)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/85 text-xl font-black text-[var(--bb-text-secondary,#516784)] shadow-sm transition hover:brightness-95"
                  aria-label="Close purchase message"
                >
                  x
                </button>
              </div>
              <div className="relative mx-auto mt-1 grid h-36 w-36 place-items-center rounded-full bg-white shadow-[0_16px_36px_rgba(38,63,99,0.16)]">
                {storePurchaseCongrats.item.kind === "buddy" ? (
                  <LouisAvatar
                    buddyId={normalizeBuddyAvatarId(storePurchaseCongrats.item.id === "buddy-lil-louis" ? "louis" : storePurchaseCongrats.item.id.replace("buddy-", ""))}
                    mood="reading"
                    size={124}
                  />
                ) : storePurchaseCongrats.item.flameId ? (
                  <StreakFlameEmoji flameId={storePurchaseCongrats.item.flameId} size={82} title={storePurchaseCongrats.item.title} />
                ) : storePurchaseCongrats.item.skinId && storePurchaseCongrats.item.imageSrc ? (
                  <span
                    className="h-full w-full rounded-full border border-sky-200/60 bg-cover bg-center shadow-[0_0_26px_rgba(93,214,255,0.38)]"
                    style={{ backgroundImage: `url(${storePurchaseCongrats.item.imageSrc})` }}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="text-6xl" aria-hidden="true">{storePurchaseCongrats.item.emoji}</span>
                )}
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#2563eb)]">
                Purchase complete
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#21304f)]">
                Congrats on {storePurchaseCongrats.item.title}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#58709d)]">
                {storePurchaseCongrats.item.kind === "buddy"
                  ? getBuddyPurchasePopupBody(purchasedBuddyId)
                  : storePurchaseCongrats.item.themeId || storePurchaseCongrats.item.skinId || storePurchaseCongrats.item.flameId
                    ? `${storePurchaseCongrats.item.title} is unlocked and ready to use.`
                    : `${storePurchaseCongrats.item.title} has been added to your account.`}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {storePurchaseCongrats.item.themeId || storePurchaseCongrats.item.skinId || storePurchaseCongrats.item.flameId || storePurchaseCongrats.item.kind === "buddy" ? (
                  <button
                    type="button"
                    onClick={() => void handleUsePurchasedStoreItem(storePurchaseCongrats.item)}
                    className="rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 active:scale-[0.98]"
                  >
                    {storePurchaseCongrats.item.kind === "buddy" ? "Set as default" : "Use it"}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setStorePurchaseCongrats(null)}
                  className="rounded-full border border-[var(--bb-card-border,#d7e4f7)] bg-white px-6 py-3 text-sm font-black text-[var(--bb-text-primary,#21304f)] shadow-sm transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
                >
                  {"That's awesome"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </ModalShell>

      <ModalShell
        isOpen={
          activeDashboardRewardPopup?.popup_id === "dashboard:reward:daily-login-gift" &&
          !storePurchaseCongrats &&
          !showVerseOfTheDayModal &&
          !showStreakMotivationModal &&
          earnedBadgeQueue.length === 0 &&
          !showLevelInfoModal &&
          !showStreakBadgeModal &&
          !showBadgesModal &&
          !showCommunityModal &&
          !showLouisDailyTasksModal &&
          !showDailyTaskCelebrationModal &&
          !showJessicaBonusModal &&
          !showZorianRestorationModal &&
          !selectedDashboardTask &&
          !activeTourKey
        }
        onClose={() => setDailyLoginGiftReveal(null)}
        backdropColor="bg-black/50"
      >
        {dailyLoginGiftReveal ? (
          <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
            <div className="bg-[var(--bb-card,#ffffff)] px-6 py-7 text-center sm:px-8">
              <button
                type="button"
                onClick={() => setDailyLoginGiftReveal(null)}
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bb-surface-soft,#f8fbff)] text-xl font-black text-[var(--bb-text-secondary,#516784)] shadow-sm transition hover:brightness-95"
                aria-label="Close daily gift"
              >
                ×
              </button>
              <div className="mt-1 flex justify-center">
                <LouisAvatar mood={dailyLoginGiftReveal.status === "opened" ? "stareyes" : "wave"} size={138} />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#5f86bd)]">
                🎁 Daily Login Gift
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#21304f)] sm:text-4xl">
                {dailyLoginGiftReveal.status === "opened" ? "Gift opened!" : "Welcome back again"}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#58709d)]">
                {dailyLoginGiftReveal.status === "opened"
                  ? "Your free mystery diamonds were added to your stash."
                  : "You came back after today's first Bible Buddy session, so a free mystery gift is ready for you."}
              </p>

              <button
                type="button"
                disabled={dailyLoginGiftReveal.status !== "closed"}
                onClick={() => void handleOpenDailyLoginGift()}
                className="group relative mx-auto mt-6 grid min-h-[180px] w-full max-w-sm place-items-center overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-surface-soft,#f8fbff)] p-5 transition hover:-translate-y-1 hover:shadow-xl disabled:cursor-default disabled:hover:translate-y-0"
              >
                <span className="absolute left-8 top-7 h-3 w-3 rounded-full bg-[#7BAFD4] opacity-70 animate-ping" />
                <span className="absolute right-9 top-10 h-4 w-4 rounded-full bg-yellow-300 opacity-80 animate-pulse" />
                <span className="absolute bottom-9 left-12 h-4 w-4 rounded-full bg-sky-300 opacity-80 animate-bounce" />
                <span
                  className={`relative text-[6.5rem] leading-none drop-shadow-lg transition duration-500 ${
                    dailyLoginGiftReveal.status === "closed"
                      ? "animate-bounce group-hover:scale-110"
                      : dailyLoginGiftReveal.status === "opening"
                        ? "scale-125 rotate-6 animate-pulse"
                        : "scale-110"
                  }`}
                  aria-hidden="true"
                >
                  {dailyLoginGiftReveal.status === "opened" ? "💎" : "🎁"}
                </span>
              </button>

              {dailyLoginGiftReveal.status === "opened" ? (
                <div className="mx-auto mt-5 max-w-sm rounded-[24px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-surface-soft,#f8fbff)] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-text-muted,#5b6f92)]">Gift unlocked</p>
                  <p className="mt-1 text-5xl font-black text-[var(--bb-text-primary,#21304f)]">+{dailyLoginGiftReveal.reward.toLocaleString()}</p>
                  <p className="mt-1 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">diamonds</p>
                </div>
              ) : (
                <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-text-muted,#5b6f92)]">
                  {dailyLoginGiftReveal.status === "opening" ? "Opening..." : "Tap to open"}
                </p>
              )}

              {dailyLoginGiftReveal.status === "opened" ? (
                <button
                  type="button"
                  onClick={() => setDailyLoginGiftReveal(null)}
                  className="mt-5 w-full max-w-sm rounded-full bg-[var(--bb-button,#7BAFD4)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#0f172a)] shadow-sm transition hover:brightness-95"
                >
                  Nice
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </ModalShell>

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
        <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
          <div className="relative overflow-hidden bg-[var(--bb-card,#ffffff)] px-6 pb-7 pt-5 text-center sm:px-8">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowStreakMotivationModal(false);
                  setShowStreakMotivationTaskPrompt(false);
                  setLouisCheckInContextLine(null);
                  setLouisDashboardNudge(null);
                }}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--bb-surface-soft,#f8fbff)] text-xl font-black leading-none text-[var(--bb-text-secondary,#516784)] shadow-sm transition hover:brightness-95"
                aria-label="Close popup"
              >
                ×
              </button>
            </div>
            <div className="mt-1 flex justify-center">
              <LouisAvatar mood={(profile?.current_streak ?? 0) >= 30 ? "stareyes" : "wave"} size={138} />
            </div>
            <div className="mt-3 flex justify-center">
              <p className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${dashboardNudgeTone.badge}`}>
                {streakMotivationModalMode === "daily" ? "🔥 Daily Streak" : `${dashboardNudgeTone.icon} ${displayedDashboardNudge.eyebrow}`}
              </p>
            </div>
            {streakMotivationModalMode === "checkin" ? (
              <>
                <h2 className="mt-4 text-center text-[2rem] font-black leading-[1.05] text-[var(--bb-text-primary,#21304f)] sm:text-4xl">
                  {displayedDashboardNudge.title}
                </h2>
                <div className="mt-4 space-y-3 rounded-[24px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-surface-soft,#f8fbff)] p-4 text-left shadow-sm">
                  <p className="text-[15px] font-bold leading-6 text-[var(--bb-text-primary,#29466f)]">
                    {displayedDashboardNudge.lineOne}
                  </p>
                  <p className="text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#5b6f92)]">
                    {displayedDashboardNudge.lineTwo}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleDashboardNudgeAction}
                    className={`inline-flex min-w-[160px] justify-center rounded-full px-5 py-3 text-sm font-black shadow-sm transition ${dashboardNudgeTone.button}`}
                  >
                    {displayedDashboardNudge.buttonText}
                  </button>
                </div>
              </>
            ) : (
              <>
              <h2 className="mt-4 flex items-center justify-center gap-2 text-3xl font-black text-[var(--bb-text-primary,#21304f)] sm:text-4xl">
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
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4f678e)]">
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
        open={showLouisDailyTasksModal && !showVerseOfTheDayModal && !showStreakMotivationModal && !dailyLoginGiftReveal && !moderatorWeeklyPayoutReveal && !buddySelectionWelcome && !activeStorePromo}
        onClose={() => {
          setShowLouisDailyTasksModal(false);
          void loadDailyTaskSummary({ force: true, silent: true });
        }}
        userId={userId}
        currentStreak={profile?.current_streak ?? 0}
        cycleStartedAt={louisDailyTaskCycleStartedAt}
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
              <div className="border-b border-[var(--bb-card-border,#dbe7f6)] bg-[var(--bb-card,#ffffff)] px-5 py-5 sm:px-7">
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
        <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#cfe3f5)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
          <div className="bg-[var(--bb-card,#ffffff)] px-6 py-7 text-center sm:px-8">
            <div className="flex justify-center">
              <LouisAvatar mood="stareyes" size={138} />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#5f86bd]">
              💎 Streak Protection
            </p>
            <h2 className="mt-2 text-3xl font-black text-[var(--bb-text-primary,#21304f)] sm:text-4xl">Grace Days</h2>
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
            <div className="mt-6 rounded-2xl border border-[var(--bb-card-border,#d7e8f8)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-4 text-sm font-semibold leading-6 text-[var(--bb-text-primary,#21304f)] shadow-sm">
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
        isOpen={activeDashboardRewardPopup?.popup_id?.startsWith("dashboard:reward:badge:") === true}
        onClose={() => setActiveEarnedBadge(null)}
        backdropColor="bg-black/45"
      >
        {activeEarnedBadge ? (() => {
          const tone = BADGE_TONE_CLASSES[activeEarnedBadge.tone];
          const accent = BADGE_TONE_ACCENTS[activeEarnedBadge.tone];
          const completionLine = getBadgeCompletionLine(activeEarnedBadge.description);

          return (
            <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
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
              <div className="relative overflow-hidden px-6 pb-7 pt-5 text-center sm:px-8">
                <div
                  className="absolute inset-x-0 top-0 h-32"
                  style={{ background: `linear-gradient(135deg, ${accent}2f, transparent)` }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute left-9 top-20 text-lg badge-float-spark" style={{ color: accent }}>✦</div>
                <div className="pointer-events-none absolute right-11 top-28 text-base badge-float-spark" style={{ animationDelay: "0.35s", color: accent }}>✧</div>

                <div className="relative flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveEarnedBadge(null)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/85 text-xl font-black text-[var(--bb-text-secondary,#516784)] shadow-sm transition hover:brightness-95"
                    aria-label="Close badge message"
                  >
                    x
                  </button>
                </div>

                <div className="relative mx-auto mt-1 grid h-36 w-36 place-items-center rounded-full bg-white shadow-[0_16px_36px_rgba(38,63,99,0.16)]">
                  <div className={`badge-color-pop relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[28px] border-2 text-center ${tone.tile} ${tone.glow}`}>
                    <span className="text-6xl" aria-hidden="true">{activeEarnedBadge.emoji}</span>
                    <span className="badge-earned-shine pointer-events-none absolute inset-y-0 left-0 w-12 bg-white/70 blur-sm" />
                    <span className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[#19c463] text-sm font-black text-white shadow-md">
                      ✓
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#5f86bd)]">
                  Badge unlocked
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#21304f)]">
                  Congrats on {activeEarnedBadge.title}
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#58709d)]">
                  {completionLine}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  <div className="rounded-[20px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#5b6f92)]">Reward</p>
                    <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#21304f)]">+{activeEarnedBadge.xp}</p>
                    <p className="text-xs font-black text-[var(--bb-accent,#2f7fe8)]">XP</p>
                  </div>
                  <div className="rounded-[20px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#5b6f92)]">Tier</p>
                    <p className="mt-1 truncate text-sm font-black text-[var(--bb-text-primary,#21304f)]">{activeEarnedBadge.levelLabel}</p>
                  </div>
                  <div className="rounded-[20px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#5b6f92)]">Category</p>
                    <p className="mt-1 truncate text-sm font-black text-[var(--bb-text-primary,#21304f)]">{activeEarnedBadge.category}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveEarnedBadge(null);
                      setSelectedBadge(activeEarnedBadge);
                      setShowBadgesModal(true);
                    }}
                    className="rounded-full bg-[var(--bb-button,#7BAFD4)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#0f172a)] shadow-sm transition hover:brightness-95 active:scale-[0.98]"
                  >
                    View Badge
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveEarnedBadge(null)}
                    className="rounded-full border border-[var(--bb-card-border,#d7e4f7)] bg-white px-6 py-3 text-sm font-black text-[var(--bb-text-primary,#21304f)] shadow-sm transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
                  >
                    Let&apos;s go
                  </button>
                </div>
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
          <div className="border-b border-[var(--bb-card-border,#dbe7f6)] bg-[var(--bb-card,#ffffff)] px-5 py-5 sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <LouisAvatar mood="stareyes" size={112} />
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
                        ? "border-[#9fe6b8] bg-[#e9fbef]"
                        : "border-slate-200 bg-white opacity-90"
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
                        className="pointer-events-none absolute inset-x-5 top-4 h-px bg-white/80 opacity-80"
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
                    ? "border-[#9fe6b8] bg-[#f3fff7]"
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
        <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
          <div className="bg-[var(--bb-card,#ffffff)] px-6 py-8 text-center sm:px-8">
            <div className="flex justify-center">
              <LouisAvatar mood="stareyes" size={138} />
            </div>
            <h2 className="mt-4 text-3xl font-black text-[var(--bb-text-primary,#21304f)] sm:text-4xl">🎉 Chapter Complete!</h2>
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
        <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#f0d7b3)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
          <div className="bg-[var(--bb-card,#ffffff)] px-6 py-7 text-center sm:px-8">
            <div className="flex justify-center">
              <LouisAvatar mood="wave" size={138} />
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">📖 Free Bible Buddy</p>
            <h2 className="mt-2 text-3xl font-black text-[var(--bb-text-primary,#21304f)]">Your next chapter opens soon</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#58709d]">
              Hey, as a free Bible Buddy, you get one new Bible study chapter each day.
            </p>
            <div className="mt-4 rounded-2xl border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-4 shadow-sm">
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
        <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
          <div className="bg-[var(--bb-card,#ffffff)] px-6 py-8 text-center sm:px-8">
            <div className="flex justify-center">
              <LouisAvatar mood="stareyes" size={138} />
            </div>
            <h2 className="mt-4 text-3xl font-black text-[var(--bb-text-primary,#2b3550)] sm:text-4xl">Hey Jessica</h2>
            <p className="mt-3 text-base leading-7 text-[#5b6480]">
              Your <span className="font-bold text-[#1f2937]">Level 11 has been reinstated</span>.
            </p>
            <p className="mt-2 text-base leading-7 text-[#5b6480]">
              You are now halfway to Level 12. Thanks for helping moderate Bible Buddy.
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
        <div className="mx-4 w-full max-w-lg overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] shadow-2xl">
          <div className="bg-[var(--bb-card,#ffffff)] px-6 py-8 text-center sm:px-8">
            <div className="flex justify-center">
              <LouisAvatar mood="hands" size={138} />
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.24em] text-[var(--bb-accent,#5f86bd)]">
              ✨ Account Restored
            </p>
            <h2 className="mt-3 text-3xl font-black text-[var(--bb-text-primary,#2b3550)] sm:text-4xl">Hey Zorian</h2>
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
                  <div className="rounded-2xl border border-[var(--bb-card-border,#bfdbfe)] bg-[var(--bb-surface-soft,#eff6ff)] p-4 shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Loading your latest XP...</p>
                  </div>
                ) : levelInfo ? (
                  <div className="rounded-2xl border border-[var(--bb-card-border,#bfdbfe)] bg-[var(--bb-surface-soft,#eff6ff)] p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-500">
                          Your Level
                        </p>
                        <h3 className="mt-1 text-2xl font-bold text-gray-900">
                          Level {levelInfo.level} Bible Buddy
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {levelInfo.totalPoints.toLocaleString()} total XP
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
                          ? `${levelInfo.pointsToNextLevel.toLocaleString()} XP until Level ${levelInfo.level + 1}`
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
                      <p className="font-semibold text-gray-900">Streak bonus XP</p>
                      <p>
                        Every day you log in on a streak, you get bonus XP equal to that streak day.
                        Day 1 gives you 1 bonus XP. Day 10 gives you 10 bonus XP. Day 45 gives you 45 bonus XP.
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
                            ({definition.minPoints.toLocaleString()} to {definition.maxPoints !== null ? definition.maxPoints.toLocaleString() : `${definition.minPoints.toLocaleString()}+`} XP)
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
                  Your streak also gives you extra XP every day you keep it alive, so showing up daily helps you grow faster.
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


