"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Fragment, useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { LouisAvatar } from "./LouisAvatar";
import { ModalShell } from "./ModalShell";
import BibleReadingModal from "./BibleReadingModal";
import DashboardDailyTaskCallout, { DatabaseTermTakeover, type BibleDatabaseTerm } from "./DashboardDailyTaskCallout";
import ChapterNotesMarkdown from "./ChapterNotesMarkdown";
import BibleYearDeepStudySectionCards from "./BibleYearDeepStudySectionCards";
import BibleYearLessonAudioPlayer from "./BibleYearLessonAudioPlayer";
import BibleTopicsPanel from "./BibleTopicsPanel";
import VideoHelpfulPoll from "./VideoHelpfulPoll";
import StreakFlameEmoji from "./StreakFlameEmoji";
import CommentSection from "./comments/CommentSection";
import BibleStudiesLibraryPage from "../app/devotionals/page";
import BibleStudyDetailPage from "../app/devotionals/[id]/page";
import type { ChecklistData, TaskState } from "./LouisDailyTasksModal";
import type { DailyRecommendation } from "../lib/dailyRecommendation";
import { supabase } from "../lib/supabaseClient";
import { ACTION_TYPE, type ActionType } from "../lib/actionTypes";
import { trackDeepStudyInterestOnce, trackStudyNotesSectionOpened, trackStudyNotesViewed } from "../lib/deepStudyInterestTracking";
import { getBibleBuddyLocalDayKey, rememberLouisDailyTaskTarget } from "../lib/louisDailyFlow";
import { getBookTotalChapters, getCompletedChapters, markChapterDone } from "../lib/readingProgress";
import {
  canFreeUserUnlockChapter,
  formatFreePlanCountdown,
  getNextLocalDayStartMs,
  rememberFreeChapterUnlock,
  type FreeChapterUnlockTarget,
} from "../lib/freePlanGating";
import { TASK_REWARD_LABELS } from "../lib/progressionRewards";
import {
  bibleBuddyTvCategories,
  bibleBuddyTvTitles,
  type BibleBuddyTvEpisode,
  type BibleBuddyTvTitle,
} from "../lib/bibleBuddyTvContent";
import { awardBibleBuddyTvWatchOnce, buildBibleBuddyTvWatchRewardLabel } from "../lib/bibleBuddyTvRewards";
import { triggerPoints } from "./PointsPop";
import {
  SELECTED_BUDDY_STORAGE_KEY,
  getBuddyAvatar,
  normalizeBuddyAvatarId,
  type BuddyAvatarId,
} from "../lib/buddyAvatars";
import {
  GENESIS_BIBLE_IN_ONE_YEAR_SERIES,
  generateBibleInOneYearPlan,
  type GenesisBibleYearDay,
} from "../lib/bibleInOneYearPlan";
import type { BibleYearDailyLesson } from "../lib/bibleYearDailyLessons";
import type { BibleYearAudioDay } from "../lib/bibleYearAudio";
import { getBibleYearDayContent } from "../lib/bibleYearDaysContent";
import type { BibleYearDeepStudySection } from "../lib/bibleYearDayOneDeepStudy";
import { BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME } from "../lib/bibleYearDayOneDeepStudy";
import { cacheBibleYearOfflineTextPack } from "../lib/bibleYearOfflinePack";
import { BIBLE_YEAR_GENESIS_WEB_VERSES } from "../lib/bibleYearGenesisVerses";
import { BIBLE_READING_BACKGROUND_TRACKS, BIBLE_READING_BACKGROUND_VOLUME } from "../lib/bibleReadingBackgroundMusic";
import { resolveBibleReference } from "../lib/bibleTermResolver";
import { getKeywordPopupNotes, getPersonPopupNotes, getPlacePopupNotes } from "../lib/bibleNotes";
import { normalizePremiumSkinId } from "../lib/premiumSkins";

const BIBLE_BUDDY_3_MODE_GATE_STORAGE_KEY = "bb:3-study-mode-selected";
const BIBLE_BUDDY_3_EXISTING_USER_CUTOFF_MS = Date.parse("2026-05-17T00:00:00.000Z");
const DAY_ONE_STUDY_NOTES_GIFT_POPUP_ID = "bible-year:day-1-study-notes-gift";
const DAY_THREE_PRO_UPGRADE_PROMPT_ID = "bible-year:day-3-pro-upgrade";
const BIBLE_IN_ONE_YEAR_TOTAL_CHAPTERS = generateBibleInOneYearPlan().totalChapters;
type BibleYearDayCardKey = "reading" | "trivia" | "reflection";
type BibleYearCompletedCardsByDay = Record<number, Partial<Record<BibleYearDayCardKey, boolean>>>;
type BibleYearSeriesFilter = "all" | "current" | "completed";
type BibleYearMediaMode = "audio" | "video";
const BIBLE_YEAR_CARD_XP: Record<BibleYearDayCardKey, number> = {
  reading: 25,
  trivia: 20,
  reflection: 20,
};
const BIBLE_YEAR_CARD_ACTION_TYPE: Record<BibleYearDayCardKey, ActionType> = {
  reading: ACTION_TYPE.bible_in_one_year_reading_completed,
  trivia: ACTION_TYPE.bible_in_one_year_trivia_completed,
  reflection: ACTION_TYPE.bible_in_one_year_reflection_completed,
};
type BibleYearProgressRow = {
  day_number: number;
  reading_completed: boolean | null;
  trivia_completed: boolean | null;
  reflection_completed: boolean | null;
  created_at?: string | null;
};
type BibleYearTriviaQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  verse?: string;
  explanation: string;
};
const BIBLE_YEAR_DAY_CARD_KEYS: BibleYearDayCardKey[] = ["reading", "trivia", "reflection"];

function getDashboardLocalDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getStableBibleYearTriviaOptions(questionId: string, options: string[], answer: string) {
  if (options.length <= 1) return options;
  const hash = Array.from(questionId).reduce((total, char) => total + char.charCodeAt(0), 0);
  let shift = hash % options.length;
  if (options[0] === answer && shift === 0) {
    shift = (hash % (options.length - 1)) + 1;
  }
  return [...options.slice(shift), ...options.slice(0, shift)];
}

function getBibleYearTriviaFeedback(question: BibleYearTriviaQuestion, selectedAnswer: string | null) {
  if (!selectedAnswer) return question.explanation;
  const prefix = selectedAnswer === question.answer ? "Right." : "Not quite.";
  return `${prefix} ${question.explanation}`;
}

const STUDY_BOOK_BY_TITLE: Record<string, string> = {
  "The Creation of the World": "Genesis",
  "The Fall of Man": "Genesis",
  "The Flood of Noah": "Genesis",
  "The Obedience of Abraham": "Genesis",
  "The Promise Through Isaac": "Genesis",
  "The Wrestling of Jacob": "Genesis",
  "The Testing of Joseph": "Genesis",
  "The Deliverance of Moses": "Exodus",
  "The Covenant at Sinai": "Exodus",
  "The Presence of God": "Exodus",
  "Holiness Before God": "Leviticus",
  "The Wilderness Journey": "Numbers",
  "The Rebellion in the Wilderness": "Numbers",
  "The Promised Land Ahead": "Numbers",
  "The Rise of Esther": "Esther",
  "The Wisdom of Proverbs": "Proverbs",
  "The Courage of Daniel": "Daniel",
};

function BibleBookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
      <path d="M9 7h6" />
      <path d="M12 6v7" />
      <path d="M9 10h6" />
    </svg>
  );
}

const ChatLouis = dynamic(() => import("./ChatLouis").then((mod) => mod.ChatLouis), {
  ssr: false,
});

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
  selected_streak_flame?: string | null;
  selected_buddy_avatar?: string | null;
  diamonds_count?: number | null;
  profile_image_url?: string | null;
  display_name?: string | null;
  username?: string | null;
  created_at?: string | null;
  bible_year_started_at?: string | null;
  preferred_study_mode?: string | null;
} | null;

type BuddiesDashboardTopBuddy = {
  userId: string;
  displayName: string;
  username: string | null;
  profileImageUrl: string | null;
  currentLevel: number;
  currentStreak: number;
  selectedStreakFlame?: string | null;
  score: number;
  taskCount: number;
  communityCount: number;
  rank: number;
};

type BuddiesDashboardTimelineItem = {
  id: string;
  userId: string;
  displayName: string;
  profileImageUrl: string | null;
  actionText: string;
  createdAt: string | null;
  actionType: string | null;
};

type BuddiesDashboardPayload = {
  topBuddies: BuddiesDashboardTopBuddy[];
  friendTimeline: BuddiesDashboardTimelineItem[];
  meta?: {
    topWindowDays?: number;
    friendWindowDays?: number;
    generatedAt?: string;
  };
};

type ShareRewardsReferral = {
  referred_user_id: string;
  trial_started_at: string;
  trial_ends_at: string;
  username?: string | null;
  display_name?: string | null;
  profile_image_url?: string | null;
};

type ShareRewardsProfile = {
  referral_code: string;
  is_active: boolean;
  user_id: string;
};

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
  homePanelOverride?: ReactNode;
  deepStudyNode?: ReactNode;
  deepStudyFocusActive?: boolean;
  suppressCompletedTasksPanel?: boolean;
  onHomeReset?: () => void;
  onOpenStore?: () => void;
  onDashboardPageChange?: (pageKey: string) => void;
  onDevotionalChanged: () => void;
  isOwnerDashboard?: boolean;
  bibleYearReport?: BibleYearReport | null;
  bibleYearProgressReady?: boolean;
};

type BibleYearReport = {
  currentDay: number;
  currentDayPercent: number;
  currentDayCompletedChapters: number;
  currentDayTotalChapters: number;
  completedChapters: number;
  totalChapters: number;
  remainingChapters: number;
  overallPercent: number;
  currentStreak: number;
  allTimeStreak: number;
  statusLabel: string;
  statusDetail: string;
  statusDays?: number;
  statusDirection?: "ahead" | "behind" | "on-track";
  startDateLabel?: string;
  expectedFinishDateLabel?: string;
};

type DevotionalOption = {
  id: string;
  title: string;
  total_days: number | null;
};

type CurrentStudyChapter = {
  day_number: number;
  day_title: string | null;
  bible_reading_book: string | null;
  bible_reading_chapter: number | null;
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

const STUDY_SWITCHER_ORDER = [
  "The Creation of the World",
  "The Fall of Man",
  "The Flood of Noah",
  "The Obedience of Abraham",
  "The Promise Through Isaac",
  "The Wrestling of Jacob",
  "The Testing of Joseph",
  "The Deliverance of Moses",
  "The Covenant at Sinai",
  "The Presence of God",
  "Holiness Before God",
  "The Wilderness Journey",
  "The Rebellion in the Wilderness",
  "The Promised Land Ahead",
  "The Calling of Moses",
  "The Heart of David",
  "The Rise of Esther",
  "The Faith of Job",
  "The Wisdom of Proverbs",
  "The Courage of Daniel",
  "The Transforming of Paul",
];

const STUDY_SWITCHER_ORDER_INDEX = new Map(
  STUDY_SWITCHER_ORDER.map((title, index) => [title, index]),
);

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
  if (title === "The Deliverance of Moses") return "Walk Exodus 1-18 through Israel's slavery, Moses' calling, the plagues, Passover, the Red Sea, and God's provision in the wilderness.";
  if (title === "The Covenant at Sinai") return "Walk Exodus 19-24 through Mount Sinai, God's holiness, the Ten Commandments, covenant law, blood, worship, and Israel becoming God's covenant people.";
  if (title === "The Presence of God") return "Walk Exodus 25-40 through the tabernacle, priesthood, golden calf, intercession, covenant mercy, obedient construction, and God's glory filling the tabernacle.";
  if (title === "Holiness Before God") return "Walk Leviticus 1-27 through sacrifice, priesthood, atonement, clean and unclean, holy living, feasts, Jubilee, and covenant faithfulness before God.";
  if (title === "The Wilderness Journey") return "Walk Numbers 1-14 through the ordered camp, wilderness guidance, offerings, priestly blessing, complaint, leadership pressure, the spies, and the call to trust God between deliverance and promise.";
  if (title === "The Rebellion in the Wilderness") return "Walk Numbers 15-25 through rebellion, holiness, chosen priesthood, judgment, mercy, the bronze serpent, Balaam, blessing, compromise, and faithfulness in the wilderness.";
  if (title === "The Promised Land Ahead") return "Walk Numbers 26-36 through the new generation, inheritance, Joshua's commissioning, offerings, vows, justice, refuge, boundaries, and preparing to enter the promised land.";
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

  if (title === "The Flood of Noah") {
    return {
      nextTitle: "The Obedience of Abraham",
      subtitle: "Genesis 11-25",
      cover: "/TheobedienceofAbraham.png",
      description:
        "Next, Genesis 11-25 follows Abraham's call, waiting, covenant promises, family tension, testing, and the beginning of the covenant family.",
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

  if (title === "The Wrestling of Jacob") {
    return {
      nextTitle: "The Testing of Joseph",
      subtitle: "Genesis 37-50",
      cover: "/TheTestingofJospehnewcover.png",
      description:
        "Next, Genesis 37-50 follows Joseph through betrayal, waiting, prison, wisdom, forgiveness, family restoration, and God's hidden providence.",
    };
  }

  if (title === "The Testing of Joseph") {
    return {
      nextTitle: "The Deliverance of Moses",
      subtitle: "Exodus 1-18",
      cover: "/TheDeliveranceofMoses.png",
      description:
        "Next, Exodus 1-18 shows Israel in slavery, Moses being raised up, Pharaoh resisting God, the plagues, Passover, the Red Sea, and the first wilderness lessons after deliverance.",
    };
  }

  if (title === "The Deliverance of Moses") {
    return {
      nextTitle: "The Covenant at Sinai",
      subtitle: "Exodus 19-24",
      cover: "/TheCovenantatSinai.png",
      description:
        "Next, Exodus 19-24 brings Israel to Mount Sinai, where God descends in holiness, gives His commandments, forms the covenant, and teaches His rescued people how to live before Him.",
    };
  }

  if (title === "The Covenant at Sinai") {
    return {
      nextTitle: "The Presence of God",
      subtitle: "Exodus 25-40",
      cover: "/ThePresenceofGod.png",
      description:
        "Next, Exodus 25-40 shows the tabernacle instructions, the priesthood, the golden calf, Moses' intercession, covenant mercy, obedient construction, and God's glory filling the tabernacle.",
    };
  }

  if (title === "The Presence of God") {
    return {
      nextTitle: "Holiness Before God",
      subtitle: "Leviticus 1-27",
      cover: "/ThegolinessbeforeGod.png",
      description:
        "Next, Leviticus 1-27 teaches how a holy God dwells with His people through sacrifice, priesthood, atonement, clean and unclean, holy living, worship rhythms, Jubilee, and covenant faithfulness.",
    };
  }

  if (title === "Holiness Before God") {
    return {
      nextTitle: "The Wilderness Journey",
      subtitle: "Numbers 1-14",
      cover: "/Wildernessjourneycover.png",
      description:
        "Next, Numbers 1-14 moves Israel from Sinai into the wilderness, where God orders the camp, guides His people, provides blessing, exposes complaint, and calls them to trust Him when the promised land looks impossible.",
    };
  }

  if (title === "The Wilderness Journey") {
    return {
      nextTitle: "The Rebellion in the Wilderness",
      subtitle: "Numbers 15-25",
      cover: "/RebellionintheWilderness.png",
      description:
        "Next, Numbers 15-25 shows how rebellion grows in the wilderness, but God keeps revealing holiness, judgment, mercy, chosen leadership, surprising blessing, and the danger of compromise.",
    };
  }

  if (title === "The Rebellion in the Wilderness") {
    return {
      nextTitle: "The Promised Land Ahead",
      subtitle: "Numbers 26-36",
      cover: "/promieslandcover.png",
      description:
        "Next, Numbers 26-36 turns toward the promised land as the new generation is counted, inheritances are protected, Joshua is commissioned, worship rhythms are reviewed, and Israel prepares to enter with faithfulness.",
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
  if (task.done) return "bg-[#eaf5ff] text-[#2f6685]";
  if (task.disabled) return "bg-gray-200 text-gray-500";
  return "bg-gray-200 text-gray-600";
}

function getTaskCardCopy(task: TaskState, _index: number) {
  if (task.kind === "devotional") {
    const chapterLabel = task.chapterLabel || (task.book && task.chapter ? `${task.book} ${task.chapter}` : "");
    return {
      title: chapterLabel ? `Read the ${chapterLabel} Intro` : task.title || "Read Chapter Intro",
      subtitle:
        task.introSummary ||
        task.subtitle ||
        task.chapterTitle ||
        "Start with the big picture before you read the chapter.",
      emoji: "ðŸ“•",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "reading") {
    return {
      title: task.title,
      subtitle: task.subtitle || "Read today's Bible chapter and reflect on it.",
      emoji: "âœï¸",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "notes") {
    return {
      title: task.title,
      subtitle: "Read and study the notes to understand more deeply.",
      emoji: "ðŸ“",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "trivia") {
    return {
      title: task.title,
      subtitle: task.subtitle || "Test your understanding with 5 quick questions.",
      emoji: "ðŸ§ ",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "reflection") {
    const chapterLabel = task.chapterLabel || (task.book && task.chapter ? `${task.book} ${task.chapter}` : "this chapter");
    return {
      title: task.title || "Answer The Reflection Question",
      subtitle: task.subtitle || `Share what ${chapterLabel} is stirring in you.`,
      emoji: "Ã¢Å“ÂÃ¯Â¸Â",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  return {
    title: task.title,
    subtitle: "Unscramble words from today's chapter.",
    emoji: "ðŸ”¤",
    doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
    idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
  };
}

function getTaskStatusLine(task: TaskState) {
  if (task.done) return task.completedAtLabel || "Completed today";
  if (task.disabled) return "Locked";
  return "Not started";
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
      title: `Read the ${chapterLabel} Intro`,
      subtitle: "Start with the big picture before you read the chapter.",
      pointsLabel: TASK_REWARD_LABELS.intro,
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
      pointsLabel: TASK_REWARD_LABELS.reading,
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
      pointsLabel: TASK_REWARD_LABELS.notes,
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
      pointsLabel: TASK_REWARD_LABELS.trivia,
      timeEstimateLabel: "3 min",
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
      kind: "reflection",
      title: "Answer The Reflection Question",
      subtitle: `Share what ${chapterLabel} is stirring in you.`,
      pointsLabel: TASK_REWARD_LABELS.reflection,
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
  if (task.kind === "reading") return "\uD83D\uDCD6";
  if (task.kind === "notes") return "\uD83D\uDCDD";
  if (task.kind === "trivia") return "\uD83E\uDDE0";
  if (task.kind === "reflection") return "\u270D\uFE0F";
  return "\uD83D\uDD24";
}

function getDailyStudyCardClasses(allDone: boolean) {
  if (allDone) {
    return "border-[#b9dcf4] bg-gradient-to-br from-[#eaf5ff] via-[#f8fcff] to-[#dff0fb]";
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
    "You have done the study work. Now let's finish with reflection.",
    "One more round and the day is complete.",
    "You're close enough to see the finish.",
    "Let's land the plane with the final task.",
    "Last move. Keep the momentum for a few more minutes.",
    "You have one task left, and it keeps the chapter personal.",
    "Almost there. Let's wrap today's chapter study.",
    "The hard part is behind you. One final step remains.",
    "You're nearly done. Let's finish with reflection.",
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
  if (task.kind === "scrambled") return "reflection";
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
  homePanelOverride,
  deepStudyNode,
  deepStudyFocusActive = false,
  suppressCompletedTasksPanel = false,
  onHomeReset,
  onOpenStore,
  onDashboardPageChange,
  onDevotionalChanged,
  isOwnerDashboard = false,
  bibleYearReport,
  bibleYearProgressReady = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousDoneByKindRef = useRef<Record<string, boolean> | null>(null);
  const previousCompletedCountRef = useRef<number | null>(null);
  const previousJourneyKeyRef = useRef<string | null>(null);
  const autoOpenedCompletedBibleYearDayRef = useRef<number | null>(null);
  const dashboardHiddenAtRef = useRef<number | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [celebratingTasks, setCelebratingTasks] = useState<Record<string, number>>({});
  const [clearedDoneTaskKinds, setClearedDoneTaskKinds] = useState<Record<string, boolean>>({});
  const [progressCelebrationKey, setProgressCelebrationKey] = useState(0);
  const [showCompletionPanel, setShowCompletionPanel] = useState(false);
  const [suppressCompletionPanelForLoadedChapter, setSuppressCompletionPanelForLoadedChapter] = useState(false);
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
  const [showCurrentStudyDetails, setShowCurrentStudyDetails] = useState(false);
  const [currentStudyChapters, setCurrentStudyChapters] = useState<CurrentStudyChapter[]>([]);
  const [switchingStudyChapter, setSwitchingStudyChapter] = useState<number | null>(null);
  const [devotionalOptions, setDevotionalOptions] = useState<DevotionalOption[]>([]);
  const [selectedDevotionalId, setSelectedDevotionalId] = useState("");
  const [isLoadingDevotionalOptions, setIsLoadingDevotionalOptions] = useState(false);
  const [isSavingDevotional, setIsSavingDevotional] = useState(false);
  const [isResettingDevotional, setIsResettingDevotional] = useState(false);
  const [devotionalSettingsMessage, setDevotionalSettingsMessage] = useState<string | null>(null);
  const [freePlanGate, setFreePlanGate] = useState<{ kind: "chapter" | "study" | "bible-year-future"; chapterLabel?: string | null } | null>(null);
  const [freePlanCountdown, setFreePlanCountdown] = useState(() => formatFreePlanCountdown(getNextLocalDayStartMs() - Date.now()));
  const [embeddedBibleSelectedBook, setEmbeddedBibleSelectedBook] = useState<string | null>(null);
  const [embeddedBibleAlphabetical, setEmbeddedBibleAlphabetical] = useState(false);
  const [embeddedBibleCompletedChapters, setEmbeddedBibleCompletedChapters] = useState<number[]>([]);
  const [embeddedBibleReading, setEmbeddedBibleReading] = useState<{ book: string; chapter: number } | null>(null);
  const [embeddedBibleBookSearchOpen, setEmbeddedBibleBookSearchOpen] = useState(false);
  const [dashboardBibleSelectedBook, setDashboardBibleSelectedBook] = useState<string | null>(null);
  const [dashboardBibleSelectedChapter, setDashboardBibleSelectedChapter] = useState<number | null>(null);
  const [dashboardBibleCompletedChapters, setDashboardBibleCompletedChapters] = useState<number[]>([]);
  const [embeddedBibleChapterLoading, setEmbeddedBibleChapterLoading] = useState<string | null>(null);
  const [embeddedBibleSearchMessage, setEmbeddedBibleSearchMessage] = useState<string | null>(null);
  const [embeddedBibleStudyId, setEmbeddedBibleStudyId] = useState<string | null>(null);
  const [buddiesDashboard, setBuddiesDashboard] = useState<BuddiesDashboardPayload | null>(null);
  const [buddiesDashboardLoading, setBuddiesDashboardLoading] = useState(false);
  const [buddiesDashboardError, setBuddiesDashboardError] = useState<string | null>(null);
  const [embeddedTvSelection, setEmbeddedTvSelection] = useState<{
    title: BibleBuddyTvTitle;
    episode: BibleBuddyTvEpisode;
  } | null>(null);
  const [embeddedTvRewardMessage, setEmbeddedTvRewardMessage] = useState<string | null>(null);
  const [pendingStudyDashboardHandoff, setPendingStudyDashboardHandoff] = useState<{
    journeyKey: string;
    chapterLabel: string;
  } | null>(null);
  const [studyDashboardHandoffModal, setStudyDashboardHandoffModal] = useState<{
    chapterLabel: string;
    remainingTasks: number;
  } | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [shareRewardsProfile, setShareRewardsProfile] = useState<ShareRewardsProfile | null>(null);
  const [shareRewardsReferrals, setShareRewardsReferrals] = useState<ShareRewardsReferral[]>([]);
  const [shareRewardsLoading, setShareRewardsLoading] = useState(false);
  const [shareRewardsError, setShareRewardsError] = useState<string | null>(null);
  const [referralRewardModal, setReferralRewardModal] = useState<ShareRewardsReferral | null>(null);
  const [embeddedGameView, setEmbeddedGameView] = useState<"trivia" | "scrambled" | null>(null);
  const [studyModeGateDismissed, setStudyModeGateDismissed] = useState(true);
  const [freeStudyModeActive, setFreeStudyModeActive] = useState(false);
  const [bibleYearDashboardActive, setBibleYearDashboardActive] = useState(true);
  const [bibleYearSeriesActive, setBibleYearSeriesActive] = useState(false);
  const [bibleYearSeriesDetailDay, setBibleYearSeriesDetailDay] = useState<GenesisBibleYearDay | null>(null);
  const [bibleYearJourneyPreviewDay, setBibleYearJourneyPreviewDay] = useState<GenesisBibleYearDay | null>(null);
  const [selectedBibleYearSeriesDay, setSelectedBibleYearSeriesDay] = useState<GenesisBibleYearDay | null>(null);
  const [manualBibleYearStudyDayNumber, setManualBibleYearStudyDayNumber] = useState<number | null>(null);
  const [activeBibleYearDayCard, setActiveBibleYearDayCard] = useState<BibleYearDayCardKey | null>(null);
  const [bibleYearCompletedTasksExpandedDay, setBibleYearCompletedTasksExpandedDay] = useState<number | null>(null);
  const [bibleYearCompletionModalDay, setBibleYearCompletionModalDay] = useState<GenesisBibleYearDay | null>(null);
  const [bibleYearSeriesFilter, setBibleYearSeriesFilter] = useState<BibleYearSeriesFilter>("all");
  const [bibleYearCompletedCardsByDay, setBibleYearCompletedCardsByDay] = useState<BibleYearCompletedCardsByDay>({});
  const [bibleYearProgressLoaded, setBibleYearProgressLoaded] = useState(true);
  const [bibleYearTriviaAnswers, setBibleYearTriviaAnswers] = useState<Record<string, string>>({});
  const [bibleYearTriviaQuestionIndexByDay, setBibleYearTriviaQuestionIndexByDay] = useState<Record<number, number>>({});
  const [bibleYearTriviaResultsOpenByDay, setBibleYearTriviaResultsOpenByDay] = useState<Record<number, boolean>>({});
  const [continuingBibleYearDay, setContinuingBibleYearDay] = useState<number | null>(null);
  const [bibleYearPlanMenuOpen, setBibleYearPlanMenuOpen] = useState(false);
  const [bibleYearPlanOverviewOpen, setBibleYearPlanOverviewOpen] = useState(false);
  const [isResettingBibleYearPlan, setIsResettingBibleYearPlan] = useState(false);
  const [bibleYearPlanMessage, setBibleYearPlanMessage] = useState<string | null>(null);
  const [showBibleProgressDetails, setShowBibleProgressDetails] = useState(false);
  const [bibleYearOpenVerseBreakdownKey, setBibleYearOpenVerseBreakdownKey] = useState<string | null>(null);
  const [bibleYearSelectedTerm, setBibleYearSelectedTerm] = useState<BibleDatabaseTerm | null>(null);
  const [bibleYearTermBurstKey, setBibleYearTermBurstKey] = useState(0);
  const [bibleYearTermNotes, setBibleYearTermNotes] = useState<string | null>(null);
  const [bibleYearTermNotesError, setBibleYearTermNotesError] = useState<string | null>(null);
  const [bibleYearTermLoading, setBibleYearTermLoading] = useState(false);
  const [bibleYearPersistentVideoDay, setBibleYearPersistentVideoDay] = useState<number | null>(null);
  const [bibleYearFollowAlongOpenByDay, setBibleYearFollowAlongOpenByDay] = useState<Record<number, boolean>>({});
  const [bibleYearMediaModeByDay, setBibleYearMediaModeByDay] = useState<Record<number, BibleYearMediaMode>>({});
  const [bibleYearStudyNotesOpen, setBibleYearStudyNotesOpen] = useState(false);
  const [bibleYearDeepNotesOpen, setBibleYearDeepNotesOpen] = useState(false);
  const [bibleYearDayOneDeepNotesGiftOpen, setBibleYearDayOneDeepNotesGiftOpen] = useState(false);
  const [bibleYearDayOneStudyNotesGiftSeen, setBibleYearDayOneStudyNotesGiftSeen] = useState(false);
  const [bibleYearDeepNotesUpgradeOpen, setBibleYearDeepNotesUpgradeOpen] = useState(false);
  const [bibleYearDownloadUpgradeOpen, setBibleYearDownloadUpgradeOpen] = useState(false);
  const [bibleYearQuickUpgradeOpen, setBibleYearQuickUpgradeOpen] = useState(false);
  const [bibleYearQuickUpgradeContext, setBibleYearQuickUpgradeContext] = useState<"day3" | null>(null);
  const [bibleYearQuickUpgradeLoading, setBibleYearQuickUpgradeLoading] = useState<"monthly" | "yearly" | null>(null);
  const [bibleYearQuickUpgradeError, setBibleYearQuickUpgradeError] = useState<string | null>(null);
  const [bibleYearDayThreeProPrompt, setBibleYearDayThreeProPrompt] = useState<{ day: GenesisBibleYearDay; nextDay: GenesisBibleYearDay } | null>(null);
  const [bibleYearDayThreeProContinueTarget, setBibleYearDayThreeProContinueTarget] = useState<{ day: GenesisBibleYearDay; nextDay: GenesisBibleYearDay } | null>(null);
  const [bibleYearDayThreeProOpenSection, setBibleYearDayThreeProOpenSection] = useState("understand");
  const [bibleYearDownloadPrompt, setBibleYearDownloadPrompt] = useState<{ dayNumber: number; title: string; videoUrl: string } | null>(null);
  const [bibleYearCompletionAnimation, setBibleYearCompletionAnimation] = useState<{ dayNumber: number; card: BibleYearDayCardKey; nonce: number } | null>(null);
  const [bibleYearRewardToast, setBibleYearRewardToast] = useState<{ dayNumber: number; text: string; nonce: number } | null>(null);
  const bibleYearXpBackfillKeyRef = useRef("");
  const bibleYearReflectionSyncKeyRef = useRef("");
  const bibleYearJustCompletedDayRef = useRef<number | null>(null);
  const bibleYearTermTakeoverRef = useRef<HTMLDivElement | null>(null);
  const bibleYearTermReturnScrollYRef = useRef<number | null>(null);
  const completedBibleYearDays = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.filter((day) => {
    const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
    return completed.reading && completed.trivia && completed.reflection;
  });
  const computedBibleYearCurrentDay =
    GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => {
      const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
      return !(completed.reading && completed.trivia && completed.reflection);
    }) ||
    GENESIS_BIBLE_IN_ONE_YEAR_SERIES[GENESIS_BIBLE_IN_ONE_YEAR_SERIES.length - 1] ||
    null;
  const completedBibleYearChapters = completedBibleYearDays.reduce((sum, day) => sum + day.readings.length, 0);
  const computedBibleYearOverallPercent = BIBLE_IN_ONE_YEAR_TOTAL_CHAPTERS > 0
    ? Math.min(100, Math.round((completedBibleYearChapters / BIBLE_IN_ONE_YEAR_TOTAL_CHAPTERS) * 100))
    : 0;
  const expectedBibleYearFinishDate = (() => {
    const currentDayNumber = Math.max(1, computedBibleYearCurrentDay?.dayNumber ?? 1);
    const finishDate = new Date();
    finishDate.setHours(12, 0, 0, 0);
    finishDate.setDate(finishDate.getDate() + Math.max(0, 365 - currentDayNumber));
    return finishDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  })();
  const bibleYearSchedule = (() => {
    const rawStartDate = profile?.bible_year_started_at || profile?.created_at || null;
    const startDate = rawStartDate ? new Date(rawStartDate) : new Date();
    const validStartDate = Number.isNaN(startDate.getTime()) ? new Date() : startDate;
    const startDay = new Date(validStartDate);
    startDay.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysElapsed = Math.max(1, Math.floor((today.getTime() - startDay.getTime()) / 86400000) + 1);
    const expectedDay = Math.max(1, Math.min(365, daysElapsed));
    const completedDays = completedBibleYearDays.length;
    const targetCompletedDays = daysElapsed === 1 && completedDays === 0 ? 0 : daysElapsed;
    const statusDelta = completedDays - targetCompletedDays;
    const statusDirection: "ahead" | "behind" | "on-track" = statusDelta > 0 ? "ahead" : statusDelta < 0 ? "behind" : "on-track";
    const statusDays = Math.abs(statusDelta);
    const statusLabel =
      statusDirection === "ahead"
        ? `${statusDays} ${statusDays === 1 ? "day" : "days"} ahead`
        : statusDirection === "behind"
          ? `${statusDays} ${statusDays === 1 ? "day" : "days"} behind`
          : "On track";
    const statusDetail =
      statusDirection === "ahead"
        ? `You started on ${validStartDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}. Based on that start date, you would be on Day ${expectedDay}, and you have completed ${completedDays} days.`
        : statusDirection === "behind"
          ? `You started on ${validStartDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}. Based on that start date, Day ${expectedDay} is the target pace.`
          : `You started on ${validStartDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}. You are right on pace for today.`;
    const finishDate = new Date(startDay);
    finishDate.setDate(finishDate.getDate() + 364);
    return {
      expectedDay,
      statusLabel,
      statusDetail,
      statusDays,
      statusDirection,
      startDateLabel: validStartDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      expectedFinishDateLabel: finishDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
    };
  })();
  const effectiveBibleYearReport: BibleYearReport = bibleYearReport ?? {
    currentDay: computedBibleYearCurrentDay?.dayNumber ?? 1,
    currentDayPercent: 0,
    currentDayCompletedChapters: 0,
    currentDayTotalChapters: computedBibleYearCurrentDay?.readings.length ?? 0,
    completedChapters: completedBibleYearChapters,
    totalChapters: BIBLE_IN_ONE_YEAR_TOTAL_CHAPTERS,
    remainingChapters: Math.max(0, BIBLE_IN_ONE_YEAR_TOTAL_CHAPTERS - completedBibleYearChapters),
    overallPercent: computedBibleYearOverallPercent,
    currentStreak: Math.max(0, profile?.current_streak ?? 0),
    allTimeStreak: Math.max(0, profile?.current_streak ?? 0),
    statusLabel: bibleYearSchedule.statusLabel,
    statusDetail: bibleYearSchedule.statusDetail,
    statusDays: bibleYearSchedule.statusDays,
    statusDirection: bibleYearSchedule.statusDirection,
    startDateLabel: bibleYearSchedule.startDateLabel,
    expectedFinishDateLabel: bibleYearSchedule.expectedFinishDateLabel || expectedBibleYearFinishDate,
  };
  const [bibleYearOptionalDiscussionDay, setBibleYearOptionalDiscussionDay] = useState<number | null>(null);
  const [bibleYearReflectionPostedByDay, setBibleYearReflectionPostedByDay] = useState<Record<number, boolean>>({});
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const [dashboardGreeting, setDashboardGreeting] = useState("Good evening");
  const [isAnonymousGuest, setIsAnonymousGuest] = useState(false);
  const [protectJourneyPromptOpen, setProtectJourneyPromptOpen] = useState(false);
  const [guestInfoModalOpen, setGuestInfoModalOpen] = useState(false);
  const [guestAccountFormOpen, setGuestAccountFormOpen] = useState(false);
  const [guestAccountName, setGuestAccountName] = useState("");
  const [guestAccountEmail, setGuestAccountEmail] = useState("");
  const [guestAccountPassword, setGuestAccountPassword] = useState("");
  const [guestAccountProfileImageFile, setGuestAccountProfileImageFile] = useState<File | null>(null);
  const [guestAccountProfileImagePreview, setGuestAccountProfileImagePreview] = useState<string | null>(null);
  const [guestAccountLoading, setGuestAccountLoading] = useState(false);
  const [guestAccountMessage, setGuestAccountMessage] = useState<string | null>(null);

  const dashboardPageKeys = ["home", "buddy", "bible", "bible_studies", "bible_topics", "share", "analytics", "settings"] as const;
  type DashboardPageKey = (typeof dashboardPageKeys)[number];
  const safeActivePage = Math.max(0, Math.min(activePage, dashboardPageKeys.length - 1));
  const activePageKey = dashboardPageKeys[safeActivePage] ?? "home";
  const exploreLinkByKey = (key: string) => exploreLinks.find((link) => link.key === key) ?? null;
  const dashboardPageLinks = {
    bible_studies: exploreLinkByKey("bible_studies"),
    bible_topics: null,
    share: exploreLinkByKey("share"),
  };
  const [liveSelectedBuddyId, setLiveSelectedBuddyId] = useState<BuddyAvatarId | null>(null);

  useEffect(() => {
    setDashboardGreeting(getDashboardGreeting());
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadGuestStatus() {
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      const user = data.user as any;
      const anonymous = Boolean(user?.is_anonymous || user?.identities?.length === 0);
      setIsAnonymousGuest(anonymous);
      if (anonymous) {
        setGuestAccountName(profile?.display_name && profile.display_name !== "Bible Buddy Guest" ? profile.display_name : "");
      }
    }

    void loadGuestStatus();
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      void loadGuestStatus();
    });
    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, [profile?.display_name]);

  useEffect(() => {
    if (profile?.selected_buddy_avatar) {
      setLiveSelectedBuddyId(normalizeBuddyAvatarId(profile.selected_buddy_avatar));
    }
  }, [profile?.selected_buddy_avatar]);

  useEffect(() => {
    function handleOpenBibleYearProgress() {
      setActivePage(0);
      setBibleYearDashboardActive(true);
      setBibleYearSeriesActive(false);
      setSelectedBibleYearSeriesDay(null);
      setManualBibleYearStudyDayNumber(null);
      setActiveBibleYearDayCard(null);
      setShowCompletionPanel(false);
      setBibleYearPlanOverviewOpen(true);
      window.setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }

    window.addEventListener("bb:dashboard-open-bible-year-progress", handleOpenBibleYearProgress);
    return () => window.removeEventListener("bb:dashboard-open-bible-year-progress", handleOpenBibleYearProgress);
  }, []);

  useEffect(() => {
    function handleOpenGuestAccountForm() {
      window.localStorage.removeItem("bb:open-guest-account-form");
      setGuestInfoModalOpen(false);
      setProtectJourneyPromptOpen(false);
      setGuestAccountFormOpen(true);
    }

    if (window.localStorage.getItem("bb:open-guest-account-form") === "1") {
      handleOpenGuestAccountForm();
    }
    window.addEventListener("bb:open-guest-account-form", handleOpenGuestAccountForm);
    return () => window.removeEventListener("bb:open-guest-account-form", handleOpenGuestAccountForm);
  }, []);

  useEffect(() => {
    function loadSelectedBuddy(event?: Event) {
      const detailBuddyId = (event as CustomEvent<{ buddyId?: string }> | undefined)?.detail?.buddyId;
      const storedBuddyId =
        typeof window !== "undefined" ? window.localStorage.getItem(SELECTED_BUDDY_STORAGE_KEY) : null;
      const nextBuddyId = detailBuddyId || storedBuddyId || profile?.selected_buddy_avatar;
      setLiveSelectedBuddyId(nextBuddyId ? normalizeBuddyAvatarId(nextBuddyId) : null);
    }

    loadSelectedBuddy();
    window.addEventListener("bb:selected-buddy-avatar-changed", loadSelectedBuddy);
    window.addEventListener("storage", loadSelectedBuddy);
    return () => {
      window.removeEventListener("bb:selected-buddy-avatar-changed", loadSelectedBuddy);
      window.removeEventListener("storage", loadSelectedBuddy);
    };
  }, [profile?.selected_buddy_avatar]);

  const selectedBuddy = liveSelectedBuddyId ? getBuddyAvatar(liveSelectedBuddyId) : null;
  const shouldShowBibleBuddy3ModeGate =
    isOwnerDashboard &&
    !studyModeGateDismissed &&
    safeActivePage === 0 &&
    !bibleYearDashboardActive &&
    !bibleYearSeriesActive &&
    !homePanelOverride;
  const dashboardNavItems: Array<{
    key: DashboardPageKey;
    label: string;
    icon: ReactNode;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }> = [
    { key: "home", label: "Home", icon: "\u2302", href: "/dashboard" },
    { key: "bible", label: "Bible", icon: <BibleBookIcon />, href: "#bible-reader" },
    { key: "bible_studies", label: "Devotionals", icon: "\uD83C\uDF05", href: "/bible-studies" },
    { key: "bible_topics", label: "Bible Topics", icon: "\uD83D\uDCDA", href: "#bible-topics" },
    { key: "share", label: "Invite", icon: "\u2197", href: dashboardPageLinks.share?.href || "#share-bible-buddy", onClick: dashboardPageLinks.share?.onClick },
    ...(isOwnerDashboard ? [{ key: "analytics" as DashboardPageKey, label: "Analytics", icon: "\u25A3", href: "#analytics" }] : []),
    { key: "settings", label: "Settings", icon: "\u2699", href: "#settings" },
  ];
  const dashboardSecondaryNavItems: Array<{
    key: DashboardPageKey;
    label: string;
    icon: ReactNode;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }> = [
    {
      key: "buddy",
      label: selectedBuddy?.name || "Buddy",
      icon: (
        <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full">
          {selectedBuddy ? <LouisAvatar buddyId={selectedBuddy.id} mood="wave" size={38} /> : null}
        </span>
      ),
      href: "#lil-louis",
    },
  ];
  const activeDashboardNavItem = bibleYearSeriesActive
    ? { label: "Bible In One Year", icon: "ðŸ“–" }
    : bibleYearDashboardActive
    ? { label: "Home", icon: "\u2302" }
    : [...dashboardNavItems, ...dashboardSecondaryNavItems].find((item) => item.key === activePageKey) ?? dashboardNavItems[0];
  void activeDashboardNavItem;
  const homeTabActive = bibleYearDashboardActive || (!bibleYearSeriesActive && activePageKey === "home");
  const bibleTabActive = !bibleYearDashboardActive && !bibleYearSeriesActive && activePageKey === "bible";
  const chatTabActive = !bibleYearDashboardActive && !bibleYearSeriesActive && activePageKey === "buddy";
  const isPaidUser = profile?.is_paid === true || membershipStatus === "pro";

  const isChecklistSyncing = isLoadingChecklist || !checklistData;
  const visibleTasks = shouldShowBibleBuddy3ModeGate ? [] : checklistData?.tasks ?? [];
  const totalTasks = visibleTasks.length || 5;
  const completedTasks = checklistData?.completedCount ?? 0;
  const allDone = checklistData?.allDone ?? false;
  const canFreeUserChooseNewStudy = !isPaidUser && allDone && !checklistData?.nextJourneyTarget;

  const rememberReferralRewardSeen = useCallback((referral: ShareRewardsReferral | null) => {
    if (!userId || !referral || typeof window === "undefined") return;
    const key = `bb:share-reward-seen:${userId}`;
    const seen = new Set(
      JSON.parse(window.localStorage.getItem(key) || "[]").filter((value: unknown): value is string => typeof value === "string"),
    );
    seen.add(referral.referred_user_id);
    window.localStorage.setItem(key, JSON.stringify([...seen].slice(-100)));
  }, [userId]);

  const getReferralDisplayName = useCallback((referral: ShareRewardsReferral | null) => {
    return referral?.display_name || referral?.username || "Your friend";
  }, []);

  const maybeShowReferralRewardModal = useCallback((referrals: ShareRewardsReferral[]) => {
    if (!userId || typeof window === "undefined" || referralRewardModal || referrals.length === 0) return;
    const key = `bb:share-reward-seen:${userId}`;
    const seen = new Set(
      JSON.parse(window.localStorage.getItem(key) || "[]").filter((value: unknown): value is string => typeof value === "string"),
    );
    const newestUnseen = referrals.find((referral) => !seen.has(referral.referred_user_id));
    if (newestUnseen) setReferralRewardModal(newestUnseen);
  }, [referralRewardModal, userId]);

  const fetchShareRewards = useCallback(async (options?: { showLoading?: boolean; checkForNewReward?: boolean }) => {
    if (!userId) return;
    if (options?.showLoading) setShareRewardsLoading(true);
    setShareRewardsError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Sign in again to load Buddy Rewards.");

      const response = await fetch("/api/ambassador/rewards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || "Could not load Buddy Rewards.");

      const nextReferrals = (payload?.referrals || []) as ShareRewardsReferral[];
      setShareRewardsProfile(payload.profile as ShareRewardsProfile);
      setShareRewardsReferrals(nextReferrals);
      if (options?.checkForNewReward) {
        maybeShowReferralRewardModal(nextReferrals);
      }
    } catch (error: any) {
      setShareRewardsError(error?.message || "Could not load Buddy Rewards.");
    } finally {
      if (options?.showLoading) setShareRewardsLoading(false);
    }
  }, [maybeShowReferralRewardModal, userId]);

  useEffect(() => {
    document.documentElement.classList.add("bb-dashboard-stable-motion");
    return () => document.documentElement.classList.remove("bb-dashboard-stable-motion");
  }, []);

  useEffect(() => {
    if (!isOwnerDashboard || !userId) {
      setStudyModeGateDismissed(true);
      return;
    }

    const createdMs = profile?.created_at ? new Date(profile.created_at).getTime() : 0;
    const isExistingUser =
      Number.isFinite(createdMs) &&
      createdMs > 0 &&
      createdMs < BIBLE_BUDDY_3_EXISTING_USER_CUTOFF_MS;

    if (!isExistingUser) {
      setStudyModeGateDismissed(true);
      return;
    }

    const key = `${BIBLE_BUDDY_3_MODE_GATE_STORAGE_KEY}:${userId}`;
    setStudyModeGateDismissed(typeof window === "undefined" || window.localStorage.getItem(key) === "1");
  }, [isOwnerDashboard, profile?.created_at, userId]);

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
    if (activePageKey === "share" && userId) {
      void fetchShareRewards({ showLoading: true });
    }
  }, [activePageKey, fetchShareRewards, userId]);

  useEffect(() => {
    if (!userId || activePageKey !== "share") return;
    void fetchShareRewards({ checkForNewReward: true });

    const referralChannel = supabase
      .channel(`buddy-rewards:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ambassador_referrals",
          filter: `ambassador_user_id=eq.${userId}`,
        },
        () => {
          void fetchShareRewards({ checkForNewReward: true });
        },
      )
      .subscribe();

    const intervalId = window.setInterval(() => {
      void fetchShareRewards({ checkForNewReward: true });
    }, 30000);
    return () => {
      window.clearInterval(intervalId);
      void supabase.removeChannel(referralChannel);
    };
  }, [activePageKey, fetchShareRewards, userId]);

  const bibleYearCurrentDayReady = bibleYearProgressReady && bibleYearProgressLoaded;
  const activeBibleYearDashboardDay = bibleYearDashboardActive && bibleYearCurrentDayReady
    ? (() => {
        const builtBibleYearDays = GENESIS_BIBLE_IN_ONE_YEAR_SERIES;
        const reportedCurrentDayNumber = Number(effectiveBibleYearReport.currentDay);
        const boundedReportedDayNumber = Number.isFinite(reportedCurrentDayNumber)
          ? Math.max(
              builtBibleYearDays[0]?.dayNumber ?? 1,
              Math.min(reportedCurrentDayNumber, builtBibleYearDays[builtBibleYearDays.length - 1]?.dayNumber ?? reportedCurrentDayNumber),
            )
          : null;
        const reportedCurrentDay = boundedReportedDayNumber
          ? builtBibleYearDays.find((day) => day.dayNumber === boundedReportedDayNumber) ?? null
          : null;
        const firstIncompleteDay =
          builtBibleYearDays.find((day) => {
            const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
            return !(completed.reading && completed.trivia && completed.reflection);
          }) || null;
        const furthestCurrentDayNumber = Math.max(
          reportedCurrentDay?.dayNumber || 0,
          firstIncompleteDay?.dayNumber || 0,
        );
        const currentBibleYearDay =
          (furthestCurrentDayNumber
            ? builtBibleYearDays.find((day) => day.dayNumber === furthestCurrentDayNumber)
            : null) ||
          firstIncompleteDay ||
          reportedCurrentDay ||
          builtBibleYearDays[builtBibleYearDays.length - 1] ||
          null;

        const selectedDayIsBuilt = Boolean(
          selectedBibleYearSeriesDay &&
          builtBibleYearDays.some((day) => day.dayNumber === selectedBibleYearSeriesDay.dayNumber),
        );
        const shouldKeepJustCompletedDay = Boolean(
          selectedBibleYearSeriesDay &&
          selectedDayIsBuilt &&
          bibleYearJustCompletedDayRef.current === selectedBibleYearSeriesDay.dayNumber &&
          isBibleYearDayComplete(selectedBibleYearSeriesDay),
        );
        const shouldUseManualSelectedDay = Boolean(
          selectedBibleYearSeriesDay &&
          selectedDayIsBuilt &&
          manualBibleYearStudyDayNumber === selectedBibleYearSeriesDay.dayNumber,
        );

        return shouldKeepJustCompletedDay || shouldUseManualSelectedDay
          ? selectedBibleYearSeriesDay
          : currentBibleYearDay;
      })()
    : null;
  const bibleYearDashboardTasks = activeBibleYearDashboardDay
    ? buildBibleYearDayTasks(activeBibleYearDashboardDay)
    : null;
  const bibleYearStudyPlanMilestones = [
    { dayNumber: 1, label: "Creation" },
    { dayNumber: 2, label: "Fall of Man" },
    { dayNumber: 3, label: "Noah" },
    { dayNumber: 4, label: "Flood" },
    { dayNumber: 5, label: "Abraham" },
    { dayNumber: 6, label: "Lot" },
    { dayNumber: 7, label: "Covenant" },
    { dayNumber: 8, label: "Sodom" },
  ];
  const dashboardTaskSource = bibleYearDashboardTasks || visibleTasks;
  const nextTask = dashboardTaskSource.find((task) => !task.done) ?? null;
  const nextActionTaskIndex = dashboardTaskSource.findIndex((task) => !task.done);
  const nextActionTaskKind =
    nextActionTaskIndex >= 0 && dashboardTaskSource[nextActionTaskIndex] && !dashboardTaskSource[nextActionTaskIndex].disabled
      ? dashboardTaskSource[nextActionTaskIndex].kind
      : null;
  const currentDevotionalTask = visibleTasks.find((task) => task.kind === "devotional") ?? null;
  const currentDevotionalId = currentDevotionalTask?.devotionalId || "";
  const currentDevotionalTitle = currentDevotionalTask?.devotionalTitle || null;
  const currentStudyCover = getDashboardStudyCover(currentDevotionalTitle);
  const nextStudyHandoff = getBibleJourneyHandoff(currentDevotionalTitle);
  const dashboardCompletedTasks = bibleYearDashboardTasks ? bibleYearDashboardTasks.filter((task) => task.done).length : completedTasks;
  const dashboardTotalTasks = bibleYearDashboardTasks ? bibleYearDashboardTasks.length : totalTasks;
  const dashboardAllDone = bibleYearDashboardTasks ? bibleYearDashboardTasks.every((task) => task.done) : allDone;
  const remainingTasks = Math.max(dashboardTotalTasks - dashboardCompletedTasks, 0);

  useEffect(() => {
    if (!userId || !isAnonymousGuest || protectJourneyPromptOpen || guestAccountFormOpen) return;
    if (typeof window === "undefined") return;
    const dismissedKey = `bb:protect-journey-dismissed:${userId}`;
    if (window.localStorage.getItem(dismissedKey) === "1") return;

    const dayThree = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => day.dayNumber === 3);
    const bibleYearDayThreeComplete = Boolean(dayThree && isBibleYearDayComplete(dayThree));
    const devotionalDayThreeComplete = Boolean(currentDevotionalTask?.devotionalDayNumber === 3 && allDone);

    if (bibleYearDayThreeComplete || devotionalDayThreeComplete) {
      setProtectJourneyPromptOpen(true);
    }
  }, [
    allDone,
    bibleYearCompletedCardsByDay,
    currentDevotionalTask?.devotionalDayNumber,
    guestAccountFormOpen,
    isAnonymousGuest,
    protectJourneyPromptOpen,
    userId,
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentStudyChapters() {
      if (!currentDevotionalId || !showCurrentStudyDetails) {
        if (!showCurrentStudyDetails) setCurrentStudyChapters([]);
        return;
      }

      const { data, error } = await supabase
        .from("devotional_days")
        .select("day_number, day_title, bible_reading_book, bible_reading_chapter")
        .eq("devotional_id", currentDevotionalId)
        .order("day_number", { ascending: true });

      if (cancelled) return;
      if (error) {
        console.error("[DASHBOARD] Could not load current study chapters:", error);
        setCurrentStudyChapters([]);
        return;
      }

      setCurrentStudyChapters((data || []) as CurrentStudyChapter[]);
    }

    void loadCurrentStudyChapters();

    return () => {
      cancelled = true;
    };
  }, [currentDevotionalId, showCurrentStudyDetails]);

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
    allDone: dashboardAllDone,
    completedTasks: dashboardCompletedTasks,
    remainingTasks,
    totalTasks: dashboardTotalTasks,
    nextTask,
  });

  useEffect(() => {
    if (!bibleYearProgressLoaded) return;
    cacheBibleYearOfflineTextPack();
  }, [bibleYearProgressLoaded]);

  useEffect(() => {
    if (!activeBibleYearDashboardDay || typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const builtBibleYearDays = GENESIS_BIBLE_IN_ONE_YEAR_SERIES;
    const starterAudioUrls = builtBibleYearDays
      .filter((day) => day.dayNumber >= 1 && day.dayNumber <= 7)
      .map((day) => getBibleYearDayContent(day).audio?.apiSrc)
      .filter((url): url is string => Boolean(url));
    const currentAudioUrls = [0, 1, 2, 3]
      .map((offset) => builtBibleYearDays.find((day) => day.dayNumber === activeBibleYearDashboardDay.dayNumber + offset))
      .map((day) => (day ? getBibleYearDayContent(day).audio?.apiSrc : null))
      .filter((url): url is string => Boolean(url));
    const mediaUrls = Array.from(new Set([...starterAudioUrls, ...currentAudioUrls]));
    const urls = [
      "/dashboard",
      "/dashboard?view=bible-year",
      `/dashboard?view=bible-year&day=${activeBibleYearDashboardDay.dayNumber}`,
    ];

    navigator.serviceWorker.ready
      .then((registration) => {
        const target = registration.active || navigator.serviceWorker.controller;
        target?.postMessage({
          type: "CACHE_BIBLE_YEAR_OFFLINE",
          urls,
          mediaUrls,
        });
      })
      .catch((error) => {
        console.warn("[BIBLE_YEAR_OFFLINE] Could not start offline cache:", error);
      });
  }, [activeBibleYearDashboardDay?.dayNumber]);

  const streak = profile?.current_streak ?? 0;
  const skeletonTasks = [
    { emoji: "ðŸ“•", title: "Read Chapter Intro", subtitleWidth: "w-52" },
    { emoji: "âœï¸", title: "Read Chapter", subtitleWidth: "w-44" },
    { emoji: "ðŸ“", title: "Review Notes", subtitleWidth: "w-56" },
    { emoji: "ðŸ§ ", title: "Play Trivia", subtitleWidth: "w-48" },
    { emoji: "âœï¸", title: "Answer Reflection", subtitleWidth: "w-40" },
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
  const currentDashboardDayLabel = activeBibleYearDashboardDay
    ? `Day ${activeBibleYearDashboardDay.dayNumber}`
    : `Day ${currentDevotionalTask?.devotionalDayNumber || 1}`;
  const queueTasks = dashboardTaskSource.filter((task) => !task.done || celebratingTasks[task.kind]);
  const completedTrackerTasks = dashboardTaskSource.filter((task) => task.done && !celebratingTasks[task.kind]);
  const activeCompletedTrackerTask = activeTask
    ? completedTrackerTasks.find(
        (task) =>
          task.kind === activeTask.kind &&
          (task.href || "") === (activeTask.href || "") &&
          (task.chapterLabel || "") === (activeTask.chapterLabel || ""),
      ) ?? null
    : null;
  const baseDisplayTasks = bibleYearDashboardTasks || (isLoadingNextChapter && (preloadedNextChapter?.tasks.length || preloadedNextStudy?.tasks.length)
    ? preloadedNextChapter?.tasks.length
      ? preloadedNextChapter.tasks
      : preloadedNextStudy?.tasks || visibleTasks
    : visibleTasks);
  const displayTasks = bibleYearDashboardTasks
    ? bibleYearDashboardTasks.filter((task) => !task.done)
    : baseDisplayTasks.filter(
        (task) =>
          !task.done ||
          Boolean(celebratingTasks[task.kind]) ||
          Boolean(previousDoneByKindRef.current && !previousDoneByKindRef.current[task.kind]),
      );
  const hasClearableDoneTaskCards =
    suppressCompletionPanelForLoadedChapter &&
    !isLoadingNextChapter &&
    visibleTasks.some((task) => task.done && !clearedDoneTaskKinds[task.kind]) &&
    visibleTasks.some((task) => !task.done);
  const displayNextActionTaskIndex = displayTasks.findIndex((task) => !task.done);
  const displayNextActionTaskKind =
    displayNextActionTaskIndex >= 0 && displayTasks[displayNextActionTaskIndex] && !displayTasks[displayNextActionTaskIndex].disabled
      ? displayTasks[displayNextActionTaskIndex].kind
      : null;
  const estimatedStudyMinutes = displayTasks
    .filter((task) => !task.done)
    .reduce((total, task) => total + parseTaskEstimateMinutes(task.timeEstimateLabel), 0);
  const estimatedStudyTimeLabel = formatStudyEstimate(estimatedStudyMinutes);
  const studyProgressTotal = Math.max(bibleYearDashboardTasks ? 3 : 5, dashboardTaskSource.length || displayTasks.length || 0);
  const studyProgressCompleted = Math.min(
    studyProgressTotal,
    dashboardTaskSource.filter((task) => task.done).length,
  );
  const nextTaskDisplayIndex = nextTask ? dashboardTaskSource.findIndex((task) => task.kind === nextTask.kind) : -1;
  const nextTaskTitle = nextTask
    ? getTaskCardCopy(nextTask, nextTaskDisplayIndex >= 0 ? nextTaskDisplayIndex : 0).title
    : dashboardAllDone
      ? "Chapter Complete"
      : "Continue Your Study";
  const studyProgressMotivation = buildStudyProgressMotivation({
    allDone: dashboardAllDone,
    completedTasks: studyProgressCompleted,
    totalTasks: studyProgressTotal,
    nextTaskTitle,
    chapterLabel: activeChapterLabel,
  });
  const louisStudyContext = {
    studyTitle: currentDevotionalTitle,
    studySummary: currentStudySummary,
    chapterLabel: activeChapterLabel,
    chapterTitle: chapterTask?.chapterTitle || null,
    chapterTheme: chapterTask?.introSummary || devotionalTask?.introSummary || currentStudySummary || null,
    completedTasks: studyProgressCompleted,
    totalTasks: studyProgressTotal,
    allDone: dashboardAllDone,
    nextTaskTitle: dashboardAllDone ? null : nextTaskTitle,
    nextTaskKind: nextTask?.kind || null,
    unfinishedTasks: dashboardTaskSource
      .filter((task) => !task.done)
      .map((task, index) => getTaskCardCopy(task, index).title),
    finishedTasks: dashboardTaskSource
      .filter((task) => task.done)
      .map((task, index) => getTaskCardCopy(task, index).title),
  };
  const shouldShowCompletionPanel =
    !isChecklistSyncing &&
    !selectedBibleYearSeriesDay &&
    allDone &&
    queueTasks.length === 0 &&
    !isLoadingNextChapter &&
    !suppressCompletionPanelForLoadedChapter &&
    showCompletionPanel;
  const shouldHideCompletedChapterProgressCard =
    suppressCompletionPanelForLoadedChapter &&
    allDone &&
    !isLoadingNextChapter &&
    !shouldShowCompletionPanel;
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
    if (freePlanGate?.kind !== "chapter" && (isPaidUser || !selectedBibleYearSeriesDay || !dashboardAllDone)) return;
    const updateCountdown = () => {
      setFreePlanCountdown(formatFreePlanCountdown(getNextLocalDayStartMs() - Date.now()));
    };
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 30000);
    return () => window.clearInterval(interval);
  }, [dashboardAllDone, freePlanGate?.kind, isPaidUser, selectedBibleYearSeriesDay?.dayNumber]);

  useEffect(() => {
    if (!isPaidUser || !bibleYearDayOneDeepNotesGiftOpen) return;
    setBibleYearDayOneDeepNotesGiftOpen(false);
    setBibleYearDeepNotesUpgradeOpen(false);
    setBibleYearDeepNotesOpen(true);
  }, [bibleYearDayOneDeepNotesGiftOpen, isPaidUser]);

  useEffect(() => {
    let cancelled = false;

    async function loadDayOneStudyNotesGiftSeen() {
      if (!userId || isPaidUser) {
        setBibleYearDayOneStudyNotesGiftSeen(Boolean(isPaidUser));
        return;
      }

      const { data, error } = await supabase
        .from("user_popups_seen")
        .select("has_seen")
        .eq("user_id", userId)
        .eq("popup_id", DAY_ONE_STUDY_NOTES_GIFT_POPUP_ID)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        if (!/user_popups_seen|schema cache/i.test(error.message || "")) {
          console.warn("[POPUPS] Could not load Day 1 Study Notes gift popup state:", error.message);
        }
        setBibleYearDayOneStudyNotesGiftSeen(false);
        return;
      }

      setBibleYearDayOneStudyNotesGiftSeen(data?.has_seen === true);
    }

    void loadDayOneStudyNotesGiftSeen();

    return () => {
      cancelled = true;
    };
  }, [isPaidUser, userId]);

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
    if (!showDevotionalSettings && !embeddedBibleBookSearchOpen && !bibleYearSeriesActive) return;

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
        const options = ((data || []) as DevotionalOption[])
          .filter((option) => !HIDDEN_STUDY_SWITCHER_TITLES.has(option.title))
          .sort((a, b) => {
            const aOrder = STUDY_SWITCHER_ORDER_INDEX.get(a.title);
            const bOrder = STUDY_SWITCHER_ORDER_INDEX.get(b.title);

            if (aOrder !== undefined || bOrder !== undefined) {
              return (aOrder ?? Number.MAX_SAFE_INTEGER) - (bOrder ?? Number.MAX_SAFE_INTEGER);
            }

            return a.title.localeCompare(b.title);
          });
        setDevotionalOptions(options);
        setSelectedDevotionalId(currentDevotionalId || options[0]?.id || "");
      }

      setIsLoadingDevotionalOptions(false);
    }

    void loadDevotionalOptions();

    return () => {
      cancelled = true;
    };
  }, [showDevotionalSettings, embeddedBibleBookSearchOpen, bibleYearSeriesActive, currentDevotionalId]);

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
            preferred_study_mode: "devotional",
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
      setClearedDoneTaskKinds({});
      setPreloadedNextChapter(null);
      setPreloadedNextStudy(null);
      setIsNewChapterDropping(true);
      window.setTimeout(() => setIsNewChapterDropping(false), 1050);
    } else if (isLoadingNextChapter) {
      setIsLoadingNextChapter(false);
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
  }, [checklistData, isLoadingChecklist, isLoadingNextChapter]);

  useEffect(() => {
    if (!userId || typeof window === "undefined") return;
    const rawHandoff = window.localStorage.getItem(`bb:study-dashboard-handoff:${userId}`);
    if (!rawHandoff) return;

    try {
      const parsed = JSON.parse(rawHandoff) as {
        journeyKey?: string;
        chapterLabel?: string;
        createdAt?: number;
      };
      const isFresh = !parsed.createdAt || Date.now() - parsed.createdAt < 5 * 60 * 1000;
      if (!isFresh || !parsed.journeyKey || !parsed.chapterLabel) {
        window.localStorage.removeItem(`bb:study-dashboard-handoff:${userId}`);
        return;
      }

      setPendingStudyDashboardHandoff({
        journeyKey: parsed.journeyKey,
        chapterLabel: parsed.chapterLabel,
      });
      window.localStorage.removeItem(`bb:study-dashboard-handoff:${userId}`);
    } catch {
      window.localStorage.removeItem(`bb:study-dashboard-handoff:${userId}`);
    }
  }, [userId]);

  useEffect(() => {
    if (!pendingStudyDashboardHandoff || isLoadingChecklist || !checklistData?.journeyKey) return;
    if (checklistData.journeyKey !== pendingStudyDashboardHandoff.journeyKey) return;

    const remaining = checklistData.tasks.filter((task) => !task.done).length;
    setStudyDashboardHandoffModal({
      chapterLabel: pendingStudyDashboardHandoff.chapterLabel,
      remainingTasks: remaining,
    });
    setPendingStudyDashboardHandoff(null);
  }, [checklistData, isLoadingChecklist, pendingStudyDashboardHandoff]);

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
    if (!allDone) setSuppressCompletionPanelForLoadedChapter(false);
  }, [allDone, activeChapterLabel]);

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

  useEffect(() => {
    let cancelled = false;

    async function loadDashboardBibleProgress() {
      if (!userId || !dashboardBibleSelectedBook) {
        setDashboardBibleCompletedChapters([]);
        return;
      }

      try {
        const chapters = await getCompletedChapters(userId, dashboardBibleSelectedBook);
        if (!cancelled) setDashboardBibleCompletedChapters(chapters);
      } catch (error) {
        console.error("[DASHBOARD_BIBLE_READER] Could not load completed chapters:", error);
        if (!cancelled) setDashboardBibleCompletedChapters([]);
      }
    }

    void loadDashboardBibleProgress();

    return () => {
      cancelled = true;
    };
  }, [dashboardBibleSelectedBook, userId]);

  useEffect(() => {
    let cancelled = false;
    setBibleYearProgressLoaded(false);

    async function loadBibleYearProgress() {
      if (!userId) {
        setBibleYearCompletedCardsByDay({});
        setBibleYearProgressLoaded(true);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("bible_year_day_progress")
          .select("day_number, reading_completed, trivia_completed, reflection_completed, created_at")
          .eq("user_id", userId)
          .order("day_number", { ascending: true });

        if (error) throw error;

        if (!profile?.bible_year_started_at) {
          const progressRows = (data || []) as BibleYearProgressRow[];
          const earliestProgressDate = progressRows
            .map((row) => row.created_at ? new Date(row.created_at) : null)
            .filter((date): date is Date => Boolean(date && !Number.isNaN(date.getTime())))
            .sort((a, b) => a.getTime() - b.getTime())[0];
          const startDateKey = getDashboardLocalDateKey(earliestProgressDate || new Date());
          const nowIso = new Date().toISOString();
          const { error: startDateError } = await supabase
            .from("profile_stats")
            .upsert(
              {
                user_id: userId,
                bible_year_started_at: startDateKey,
                bible_year_launch_seen_at: nowIso,
                updated_at: nowIso,
              },
              { onConflict: "user_id" },
            );

          if (startDateError) {
            console.warn("[BIBLE_YEAR_PROGRESS] Could not save Bible in One Year start date:", startDateError);
          }
        }

        const next: BibleYearCompletedCardsByDay = {};
        ((data || []) as BibleYearProgressRow[]).forEach((row) => {
          next[row.day_number] = {
            reading: row.reading_completed === true,
            trivia: row.trivia_completed === true,
            reflection: row.reflection_completed === true,
          };
        });

        const actionTypes = Array.from(new Set([
          ...Object.values(BIBLE_YEAR_CARD_ACTION_TYPE),
          ACTION_TYPE.bible_in_one_year_day_viewed,
        ]));
        const { data: actionRows, error: actionError } = await supabase
          .from("master_actions")
          .select("action_type, action_label")
          .eq("user_id", userId)
          .in("action_type", actionTypes)
          .like("action_label", "Bible in One Year Day %");

        if (actionError) {
          console.warn("[BIBLE_YEAR_PROGRESS] Could not backfill Bible in One Year progress from actions:", actionError);
        }

        const cardLabelToKey: Record<string, BibleYearDayCardKey> = {
          Reading: "reading",
          Video: "reading",
          Trivia: "trivia",
          Reflection: "reflection",
          Summary: "reflection",
        };

        ((actionRows || []) as Array<{ action_label?: string | null }>).forEach((row) => {
          const match = (row.action_label || "").match(/^Bible in One Year Day (\d+) (Reading|Video|Trivia|Reflection|Summary):/);
          if (!match) return;
          const dayNumber = Number(match[1]);
          const card = cardLabelToKey[match[2]];
          if (!Number.isFinite(dayNumber) || !card) return;
          next[dayNumber] = {
            ...(next[dayNumber] || {}),
            [card]: true,
          };
        });

        if (!cancelled) {
          setBibleYearCompletedCardsByDay(next);
          setBibleYearProgressLoaded(true);
        }
      } catch (error) {
        console.error("[BIBLE_YEAR_PROGRESS] Could not load Bible in One Year progress:", error);
        if (!cancelled) {
          setBibleYearCompletedCardsByDay({});
          setBibleYearProgressLoaded(true);
        }
      }
    }

    void loadBibleYearProgress();

    return () => {
      cancelled = true;
    };
  }, [profile?.bible_year_started_at, userId]);

  function snapToPage(index: number) {
    const nextIndex = Math.max(0, Math.min(index, dashboardPageKeys.length - 1));
    const nextPageKey = dashboardPageKeys[nextIndex];
    setActivePage(nextIndex);
    if (nextPageKey) onDashboardPageChange?.(nextPageKey);
    window.setTimeout(() => {
      document
        .querySelector(`[data-dashboard-nav-key="${nextPageKey}"]`)
        ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, 0);
  }

  function clearBibleYearViews() {
    setBibleYearDashboardActive(false);
    setBibleYearSeriesActive(false);
    setBibleYearSeriesDetailDay(null);
    setBibleYearJourneyPreviewDay(null);
    setSelectedBibleYearSeriesDay(null);
    setManualBibleYearStudyDayNumber(null);
    setActiveBibleYearDayCard(null);
    setBibleYearCompletedTasksExpandedDay(null);
    setBibleYearCompletionModalDay(null);
    setBibleYearPlanMenuOpen(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("view");
      url.searchParams.delete("day");
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }

  function openPreferredHomeDashboard() {
    if (profile?.preferred_study_mode === "devotional") {
      clearBibleYearViews();
      setFreeStudyModeActive(false);
      setEmbeddedBibleBookSearchOpen(false);
      setEmbeddedBibleSelectedBook(null);
      setEmbeddedBibleStudyId(null);
      setDashboardMenuOpen(false);
      onHomeReset?.();
      snapToPage(0);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("view", "devotional");
        url.searchParams.delete("day");
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      }
      return;
    }

    openBibleYearDashboard();
  }

  function dismissProtectJourneyPrompt() {
    if (typeof window !== "undefined" && userId) {
      window.localStorage.setItem(`bb:protect-journey-dismissed:${userId}`, "1");
    }
    setProtectJourneyPromptOpen(false);
  }

  async function createAccountFromGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = guestAccountName.trim();
    const cleanEmail = guestAccountEmail.trim().toLowerCase();
    const cleanPassword = guestAccountPassword.trim();

    if (!cleanName || !cleanEmail || cleanPassword.length < 6 || !guestAccountProfileImageFile) {
      setGuestAccountMessage("Enter your name, email, password, and add a profile picture.");
      return;
    }

    setGuestAccountLoading(true);
    setGuestAccountMessage(null);

    try {
      let profileImageUrl: string | null = profile?.profile_image_url || null;
      if (userId && guestAccountProfileImageFile) {
        const ext = guestAccountProfileImageFile.name.split(".").pop() || "jpg";
        const path = `${userId}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, guestAccountProfileImageFile, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
        profileImageUrl = urlData.publicUrl;
      }

      const { data, error } = await supabase.auth.updateUser({
        email: cleanEmail,
        password: cleanPassword,
        data: {
          display_name: cleanName,
          first_name: cleanName.split(/\s+/)[0] || cleanName,
          full_name: cleanName,
          avatar_url: profileImageUrl,
        },
      });
      if (error) throw error;

      if (userId) {
        const nowIso = new Date().toISOString();
        const profileUpdate = await supabase
          .from("profile_stats")
          .upsert(
            {
              user_id: userId,
              display_name: cleanName,
              username: cleanName,
              profile_image_url: profileImageUrl,
              account_type: "registered",
              registered_at: nowIso,
              converted_from_guest_at: isAnonymousGuest ? nowIso : null,
              updated_at: nowIso,
            },
            { onConflict: "user_id" },
          );
        if (profileUpdate.error && /account_type|registered_at|converted_from_guest_at/i.test(profileUpdate.error.message || "")) {
          await supabase
            .from("profile_stats")
            .upsert(
              {
                user_id: userId,
                display_name: cleanName,
                username: cleanName,
                profile_image_url: profileImageUrl,
                updated_at: nowIso,
              },
              { onConflict: "user_id" },
            );
        } else if (profileUpdate.error) {
          throw profileUpdate.error;
        }
      }

      try {
        await fetch("/api/landing-analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_name: "created_free_account",
            session_id:
              typeof window !== "undefined"
                ? window.localStorage.getItem("bb:landing-session-id") || `account-${userId || Date.now()}`
                : `account-${userId || Date.now()}`,
            user_id: userId,
            source: "In App",
            referrer: null,
            page_path: typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/dashboard",
            metadata: { convertedFromGuest: isAnonymousGuest },
          }),
        });
      } catch (analyticsError) {
        console.error("[GUEST_ACCOUNT] Account conversion analytics failed:", analyticsError);
      }

      setIsAnonymousGuest(false);
      setProtectJourneyPromptOpen(false);
      setGuestInfoModalOpen(false);
      setGuestAccountFormOpen(false);
      setGuestAccountProfileImageFile(null);
      setGuestAccountProfileImagePreview(null);
      setGuestAccountPassword("");
      setGuestAccountMessage(
        data.user?.email_confirmed_at
          ? "Your account is ready. Your Bible journey is protected."
          : "Check your email to confirm your account. Your progress is still saved here.",
      );
      if (typeof window !== "undefined" && userId) {
        window.localStorage.setItem(`bb:protect-journey-dismissed:${userId}`, "1");
      }
    } catch (error) {
      console.error("[GUEST_ACCOUNT] Could not convert guest account:", error);
      setGuestAccountMessage(error instanceof Error ? error.message : "Could not create your account. Try again in a moment.");
    } finally {
      setGuestAccountLoading(false);
    }
  }

  function handleDashboardNavClick(index: number) {
    if (index === 0) {
      openPreferredHomeDashboard();
      return;
    }
    if (bibleYearDashboardActive || bibleYearSeriesActive) {
      clearBibleYearViews();
    }
    snapToPage(index);
  }

  function scrollBibleYearStudyAreaIntoView() {
    window.setTimeout(() => {
      document
        .querySelector("[data-bible-year-study-area]")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function openBibleYearDashboard() {
    bibleYearJustCompletedDayRef.current = null;
    const builtBibleYearDays = GENESIS_BIBLE_IN_ONE_YEAR_SERIES;
    const firstIncompleteDay =
      builtBibleYearDays.find((day) => {
        const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
        return !(completed.reading && completed.trivia && completed.reflection);
      }) || null;
    const reportedCurrentDayNumber = Number(effectiveBibleYearReport.currentDay);
    const boundedReportedDayNumber = Number.isFinite(reportedCurrentDayNumber)
      ? Math.max(
          builtBibleYearDays[0]?.dayNumber ?? 1,
          Math.min(reportedCurrentDayNumber, builtBibleYearDays[builtBibleYearDays.length - 1]?.dayNumber ?? reportedCurrentDayNumber),
        )
      : 0;
    const nextBibleYearDayNumber = Math.max(firstIncompleteDay?.dayNumber || 0, boundedReportedDayNumber || 0);
    const nextBibleYearDay =
      (nextBibleYearDayNumber
        ? builtBibleYearDays.find((day) => day.dayNumber === nextBibleYearDayNumber)
        : null) ||
      firstIncompleteDay ||
      builtBibleYearDays[builtBibleYearDays.length - 1] ||
      null;
    setBibleYearDashboardActive(true);
    setBibleYearSeriesActive(false);
    setBibleYearSeriesDetailDay(null);
    setBibleYearJourneyPreviewDay(null);
    setSelectedBibleYearSeriesDay(nextBibleYearDay);
    setManualBibleYearStudyDayNumber(null);
    setBibleYearCompletedTasksExpandedDay(null);
    setFreeStudyModeActive(false);
    setEmbeddedBibleBookSearchOpen(false);
    setEmbeddedBibleSelectedBook(null);
    setEmbeddedBibleStudyId(null);
    setDashboardMenuOpen(false);
    setBibleYearPlanMenuOpen(false);
    onHomeReset?.();
    snapToPage(0);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "bible-year");
      if (nextBibleYearDay) {
        url.searchParams.set("day", String(nextBibleYearDay.dayNumber));
      } else {
        url.searchParams.delete("day");
      }
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }

  function resetBibleYearDashboardToCurrentDay() {
    bibleYearJustCompletedDayRef.current = null;
    autoOpenedCompletedBibleYearDayRef.current = null;
    setBibleYearDashboardActive(true);
    setBibleYearSeriesActive(false);
    setBibleYearSeriesDetailDay(null);
    setBibleYearJourneyPreviewDay(null);
    setSelectedBibleYearSeriesDay(null);
    setManualBibleYearStudyDayNumber(null);
    setActiveBibleYearDayCard(null);
    setBibleYearCompletedTasksExpandedDay(null);
    setBibleYearPlanMenuOpen(false);
    setFreeStudyModeActive(false);
    setEmbeddedBibleBookSearchOpen(false);
    setEmbeddedBibleSelectedBook(null);
    setEmbeddedBibleStudyId(null);
    setActivePage(0);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "bible-year");
      url.searchParams.delete("day");
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }

  function openBibleYearDayOnDashboard(day: GenesisBibleYearDay, options: { markDone?: boolean; reviewCompleted?: boolean } = {}) {
    if (!freeUserCanOpenBibleYearDayTasks(day)) {
      setFreePlanGate({ kind: "bible-year-future", chapterLabel: `Day ${day.dayNumber}` });
      return;
    }
    setBibleYearDashboardActive(true);
    bibleYearJustCompletedDayRef.current = null;
    setBibleYearCompletionModalDay(null);
    setBibleYearSeriesActive(false);
    setBibleYearSeriesDetailDay(null);
    setBibleYearJourneyPreviewDay(null);
    setSelectedBibleYearSeriesDay(day);
    setManualBibleYearStudyDayNumber(day.dayNumber);
    setActiveBibleYearDayCard(null);
    setBibleYearCompletedTasksExpandedDay(options.reviewCompleted || isBibleYearDayComplete(day) ? day.dayNumber : null);
    if (options.markDone) {
      void markBibleYearDayCardsComplete(day, getBibleYearRequiredCardKeys(day));
    }
    setFreeStudyModeActive(false);
    setEmbeddedBibleBookSearchOpen(false);
    setEmbeddedBibleSelectedBook(null);
    setEmbeddedBibleStudyId(null);
    setDashboardMenuOpen(false);
    setBibleYearPlanMenuOpen(false);
    onHomeReset?.();
    snapToPage(0);
    if (options.reviewCompleted || isBibleYearDayComplete(day)) {
      scrollBibleYearStudyAreaIntoView();
    }
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "bible-year");
      url.searchParams.set("day", String(day.dayNumber));
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }

  function openBibleYearSeriesDashboard() {
    setBibleYearDashboardActive(false);
    setBibleYearSeriesActive(true);
    setBibleYearSeriesDetailDay(null);
    setBibleYearJourneyPreviewDay(null);
    setSelectedBibleYearSeriesDay(null);
    setManualBibleYearStudyDayNumber(null);
    setActiveBibleYearDayCard(null);
    setBibleYearCompletedTasksExpandedDay(null);
    setFreeStudyModeActive(false);
    setEmbeddedBibleBookSearchOpen(false);
    setEmbeddedBibleSelectedBook(null);
    setEmbeddedBibleStudyId(null);
    setDashboardMenuOpen(false);
    setBibleYearPlanMenuOpen(false);
    onHomeReset?.();
    snapToPage(0);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "bible-year-series");
      url.searchParams.delete("day");
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }

  function openBibleYearSeriesDayDetail(day: GenesisBibleYearDay) {
    setBibleYearDashboardActive(false);
    setBibleYearSeriesActive(true);
    setBibleYearSeriesDetailDay(day);
    setBibleYearJourneyPreviewDay(null);
    setSelectedBibleYearSeriesDay(null);
    setManualBibleYearStudyDayNumber(null);
    setActiveBibleYearDayCard(null);
    setBibleYearCompletedTasksExpandedDay(null);
    setDashboardMenuOpen(false);
    setBibleYearPlanMenuOpen(false);
    onHomeReset?.();
    snapToPage(0);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "bible-year-series");
      url.searchParams.set("day", String(day.dayNumber));
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }

  async function handleResetBibleYearPlan() {
    if (isResettingBibleYearPlan) return;

    const confirmed =
      typeof window === "undefined" ||
      window.confirm("Reset Bible in One Year back to Day 1? This clears the completed reading, trivia, and reflection checks.");

    if (!confirmed) return;

    setIsResettingBibleYearPlan(true);
    setBibleYearPlanMessage(null);

    try {
      const resetAt = new Date().toISOString();
      const resetStartDate = getDashboardLocalDateKey();
      if (userId) {
        const { error } = await supabase
          .from("bible_year_day_progress")
          .update({
            reading_completed: false,
            trivia_completed: false,
            reflection_completed: false,
            updated_at: resetAt,
          })
          .eq("user_id", userId);

        if (error) throw error;

        const { error: profileResetError } = await supabase
          .from("profile_stats")
          .upsert(
            {
              user_id: userId,
              bible_year_started_at: resetStartDate,
              bible_year_launch_seen_at: resetAt,
              bible_year_plan_reset_at: resetAt,
              updated_at: resetAt,
            },
            { onConflict: "user_id" },
          );

        if (profileResetError && !/bible_year_plan_reset_at/i.test(profileResetError.message || "")) {
          throw profileResetError;
        }
        if (profileResetError) {
          console.warn("[BIBLE_YEAR_PROGRESS] Reset completed, but profile reset tracking column is missing:", profileResetError.message);
        }
      }

      if (typeof window !== "undefined") {
        try {
          Object.keys(window.localStorage)
            .filter((key) => key.startsWith("bb:bible-year-audio-progress:"))
            .forEach((key) => window.localStorage.removeItem(key));
        } catch (storageError) {
          console.warn("[BIBLE_YEAR_PROGRESS] Could not clear local Bible in One Year playback progress:", storageError);
        }
      }

      const firstBibleYearDay =
        GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => day.dayNumber === 1) ||
        GENESIS_BIBLE_IN_ONE_YEAR_SERIES[0] ||
        null;

      setBibleYearCompletedCardsByDay({});
      bibleYearXpBackfillKeyRef.current = "";
      setBibleYearTriviaAnswers({});
      setBibleYearTriviaQuestionIndexByDay({});
      setBibleYearCompletedTasksExpandedDay(null);
      setActiveBibleYearDayCard(null);
      setBibleYearPersistentVideoDay(null);
      setBibleYearSeriesFilter("all");
      setBibleYearStudyNotesOpen(false);
      setBibleYearDeepNotesOpen(false);
      setBibleYearDeepNotesUpgradeOpen(false);
      setBibleYearSelectedTerm(null);
      setBibleYearTermNotes(null);
      setBibleYearTermNotesError(null);
      setBibleYearDashboardActive(true);
      bibleYearJustCompletedDayRef.current = null;
      setBibleYearSeriesActive(false);
      setBibleYearSeriesDetailDay(null);
      setBibleYearJourneyPreviewDay(null);
      setSelectedBibleYearSeriesDay(firstBibleYearDay);
      setManualBibleYearStudyDayNumber(null);
      setFreeStudyModeActive(false);
      setEmbeddedBibleBookSearchOpen(false);
      setEmbeddedBibleSelectedBook(null);
      setEmbeddedBibleStudyId(null);
      setDashboardMenuOpen(false);
      setBibleYearPlanMessage("Bible In One Year was reset back to Day 1.");
      onHomeReset?.();
      onDevotionalChanged();
      snapToPage(0);

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("view", "bible-year");
        if (firstBibleYearDay) {
          url.searchParams.set("day", String(firstBibleYearDay.dayNumber));
        } else {
          url.searchParams.delete("day");
        }
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      }
    } catch (error) {
      console.error("[BIBLE_YEAR_PROGRESS] Could not reset Bible in One Year plan:", error);
      setBibleYearPlanMessage("Could not reset Bible In One Year. Try again in a moment.");
    } finally {
      setIsResettingBibleYearPlan(false);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    if (view === "bible-year") {
      resetBibleYearDashboardToCurrentDay();
    } else if (view === "bible-year-series") {
      setBibleYearDashboardActive(false);
      setBibleYearSeriesActive(true);
      setBibleYearJourneyPreviewDay(null);
      const dayNumber = Number(params.get("day") || 0);
      const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((seriesDay) => seriesDay.dayNumber === dayNumber);
      if (day) setBibleYearSeriesDetailDay(day);
      setActivePage(0);
    } else if (view === "devotional") {
      setBibleYearDashboardActive(false);
      setBibleYearSeriesActive(false);
      setBibleYearSeriesDetailDay(null);
      setBibleYearJourneyPreviewDay(null);
      setSelectedBibleYearSeriesDay(null);
      setManualBibleYearStudyDayNumber(null);
      setActivePage(0);
    } else {
      setBibleYearDashboardActive(profile?.preferred_study_mode === "devotional" ? false : true);
      setBibleYearSeriesActive(false);
      setBibleYearSeriesDetailDay(null);
      setBibleYearJourneyPreviewDay(null);
      setSelectedBibleYearSeriesDay(null);
      setManualBibleYearStudyDayNumber(null);
      setActivePage(0);
    }
  }, [profile?.preferred_study_mode]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        resetBibleYearDashboardToCurrentDay();
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        dashboardHiddenAtRef.current = Date.now();
        return;
      }
      if (document.visibilityState !== "visible") return;

      const hiddenAt = dashboardHiddenAtRef.current;
      dashboardHiddenAtRef.current = null;
      if (hiddenAt && Date.now() - hiddenAt > 5000) {
        resetBibleYearDashboardToCurrentDay();
      }
    }

    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!bibleYearProgressLoaded || !bibleYearDashboardActive || !activeBibleYearDashboardDay) return;
    if (selectedBibleYearSeriesDay?.dayNumber === activeBibleYearDashboardDay.dayNumber) return;
    if (manualBibleYearStudyDayNumber && selectedBibleYearSeriesDay?.dayNumber === manualBibleYearStudyDayNumber) return;
    if (
      selectedBibleYearSeriesDay &&
      bibleYearJustCompletedDayRef.current === selectedBibleYearSeriesDay.dayNumber &&
      isBibleYearDayComplete(selectedBibleYearSeriesDay)
    ) {
      return;
    }

    setSelectedBibleYearSeriesDay(activeBibleYearDashboardDay);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "bible-year");
      url.searchParams.set("day", String(activeBibleYearDashboardDay.dayNumber));
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }, [
    activeBibleYearDashboardDay?.dayNumber,
    bibleYearDashboardActive,
    bibleYearProgressLoaded,
    manualBibleYearStudyDayNumber,
    selectedBibleYearSeriesDay?.dayNumber,
  ]);

  useEffect(() => {
    if (!bibleYearProgressLoaded || !bibleYearDashboardActive || !activeBibleYearDashboardDay) return;

    const activeDayNumber = activeBibleYearDashboardDay.dayNumber;
    if (!isBibleYearDayComplete(activeBibleYearDashboardDay)) {
      if (autoOpenedCompletedBibleYearDayRef.current === activeDayNumber) {
        autoOpenedCompletedBibleYearDayRef.current = null;
      }
      return;
    }

    if (bibleYearJustCompletedDayRef.current === activeDayNumber) return;
    if (bibleYearCompletedTasksExpandedDay === activeDayNumber) {
      autoOpenedCompletedBibleYearDayRef.current = activeDayNumber;
      return;
    }
    if (autoOpenedCompletedBibleYearDayRef.current === activeDayNumber) return;

    autoOpenedCompletedBibleYearDayRef.current = activeDayNumber;
    setBibleYearCompletedTasksExpandedDay(activeDayNumber);
  }, [
    activeBibleYearDashboardDay?.dayNumber,
    bibleYearCompletedCardsByDay,
    bibleYearCompletedTasksExpandedDay,
    bibleYearDashboardActive,
    bibleYearProgressLoaded,
  ]);

  useEffect(() => {
    setBibleYearSelectedTerm(null);
    setBibleYearTermNotes(null);
    setBibleYearTermNotesError(null);
    setBibleYearDeepNotesOpen(false);
    setBibleYearDeepNotesUpgradeOpen(false);
    const activeReadingDayNumber = selectedBibleYearSeriesDay?.dayNumber ?? activeBibleYearDashboardDay?.dayNumber;
    setBibleYearStudyNotesOpen(activeBibleYearDayCard === "reading" && activeReadingDayNumber !== undefined && activeReadingDayNumber <= 2);
  }, [activeBibleYearDashboardDay?.dayNumber, activeBibleYearDayCard, selectedBibleYearSeriesDay?.dayNumber]);

  function openInvitePage() {
    const shareIndex = dashboardPageKeys.indexOf("share");
    if (shareIndex < 0) return;
    clearBibleYearViews();
    setDashboardMenuOpen(false);
    snapToPage(shareIndex);
  }

  function openBibleReaderPage() {
    const bibleIndex = dashboardPageKeys.indexOf("bible");
    if (bibleIndex < 0) return;
    clearBibleYearViews();
    setDashboardMenuOpen(false);
    snapToPage(bibleIndex);
  }

  function openBuddyChatPage() {
    const buddyIndex = dashboardPageKeys.indexOf("buddy");
    if (buddyIndex < 0) return;
    clearBibleYearViews();
    setDashboardMenuOpen(false);
    snapToPage(buddyIndex);
  }

  function openSettingsPage() {
    const settingsIndex = dashboardPageKeys.indexOf("settings");
    if (settingsIndex < 0) return;
    clearBibleYearViews();
    setDashboardMenuOpen(false);
    snapToPage(settingsIndex);
  }

  useEffect(() => {
    function handleShowShareTab() {
      openInvitePage();
      window.setTimeout(() => {
        document
          .querySelector('[data-dashboard-nav-key="share"]')
          ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }, 80);
    }

    window.addEventListener("bb:dashboard-show-share-tab", handleShowShareTab);
    return () => window.removeEventListener("bb:dashboard-show-share-tab", handleShowShareTab);
  }, []);

  useEffect(() => {
    function handleShowSettingsTab() {
      if (typeof window !== "undefined") window.localStorage.removeItem("bb:dashboard-open-settings");
      openSettingsPage();
    }

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("bb:dashboard-community-target");
      if (window.localStorage.getItem("bb:dashboard-open-settings")) {
        window.setTimeout(() => handleShowSettingsTab(), 0);
      }
    }

    window.addEventListener("bb:dashboard-show-settings-tab", handleShowSettingsTab);
    return () => {
      window.removeEventListener("bb:dashboard-show-settings-tab", handleShowSettingsTab);
    };
  }, []);

  async function switchCurrentStudyChapter(dayNumber: number) {
    if (!userId || !currentDevotionalId || switchingStudyChapter) return;
    const currentDayNumber = currentDevotionalTask?.devotionalDayNumber ?? 1;
    if (!isOwnerDashboard && !isPaidUser && dayNumber > currentDayNumber) return;
    const targetChapter = currentStudyChapters.find((chapter) => chapter.day_number === dayNumber);
    if (!targetChapter) return;

    setSwitchingStudyChapter(dayNumber);
    setShowCurrentStudyDetails(false);
    setShowCompletionPanel(false);
    setSuppressCompletionPanelForLoadedChapter(true);
    setClearedDoneTaskKinds({});
    try {
      const { error } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: currentDevotionalId,
            louis_primary_devotional_id: currentDevotionalId,
            louis_primary_devotional_day: dayNumber,
          },
          { onConflict: "user_id" },
        );

      if (error) throw error;

      if (cycleStartedAt) {
        rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
          devotionalId: currentDevotionalId,
          dayNumber,
        });
      }

      onDevotionalChanged();
    } catch (error) {
      console.error("[DASHBOARD] Could not switch current study chapter:", error);
    } finally {
      setSwitchingStudyChapter(null);
    }
  }

  async function loadEmbeddedBibleStudyChapter({
    devotionalId,
    devotionalTitle,
    dayNumber,
    book,
    chapter,
  }: {
    devotionalId: string;
    devotionalTitle: string;
    dayNumber: number;
    book: string;
    chapter: number;
  }) {
    if (!userId || switchingStudyChapter) return;

    const chapterLabel = buildDashboardChapterLabel(book, chapter);
    const targetKey = `${devotionalId}:${dayNumber}`;
    const optimisticTasks = buildPreloadedNextChapterTasks({
      devotionalId,
      devotionalTitle,
      dayNumber,
      book,
      chapter,
    });

    setSwitchingStudyChapter(dayNumber);
    setEmbeddedBibleStudyId(null);
    setShowCompletionPanel(false);
    setSuppressCompletionPanelForLoadedChapter(true);
    setClearedDoneTaskKinds({});
    setPreloadedNextStudy(null);
    setPreloadedNextChapter({
      targetKey,
      chapterLabel,
      tasks: optimisticTasks,
    });
    setPendingStudyDashboardHandoff({
      journeyKey: targetKey,
      chapterLabel,
    });
    setStudyDashboardHandoffModal({
      chapterLabel,
      remainingTasks: optimisticTasks.length,
    });
    snapToPage(0);
    setIsLoadingNextChapter(true);

    try {
      const { error } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: devotionalId,
            louis_primary_devotional_id: devotionalId,
            louis_primary_devotional_day: dayNumber,
          },
          { onConflict: "user_id" },
        );

      if (error) throw error;

      if (cycleStartedAt) {
        rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
          devotionalId,
          dayNumber,
        });
      }

      onDevotionalChanged();
    } catch (error) {
      console.error("[DASHBOARD] Could not load embedded Bible study chapter:", error);
      setIsLoadingNextChapter(false);
    } finally {
      setSwitchingStudyChapter(null);
    }
  }

  async function loadBibleBookSearchChapter(book: string, chapter: number) {
    if (!userId || embeddedBibleChapterLoading) return;

    const chapterLabel = buildDashboardChapterLabel(book, chapter);
    setEmbeddedBibleChapterLoading(`${book}:${chapter}`);
    setEmbeddedBibleSearchMessage(null);

    try {
      const { data: matchingDays, error: dayError } = await supabase
        .from("devotional_days")
        .select("devotional_id, day_number, day_title, bible_reading_book, bible_reading_chapter")
        .eq("bible_reading_book", book)
        .eq("bible_reading_chapter", chapter)
        .order("day_number", { ascending: true });

      if (dayError) throw dayError;

      const firstDay = (matchingDays || [])[0] as
        | {
            devotional_id: string;
            day_number: number;
            bible_reading_book: string | null;
            bible_reading_chapter: number | null;
          }
        | undefined;

      if (!firstDay?.devotional_id || !firstDay.day_number) {
        setEmbeddedBibleSearchMessage(`${chapterLabel} is not connected to a Bible Study yet.`);
        return;
      }

      const { data: devotional, error: devotionalError } = await supabase
        .from("devotionals")
        .select("id, title")
        .eq("id", firstDay.devotional_id)
        .maybeSingle();

      if (devotionalError) throw devotionalError;
      if (!devotional?.id) {
        setEmbeddedBibleSearchMessage(`${chapterLabel} is not connected to a Bible Study yet.`);
        return;
      }

      setEmbeddedBibleBookSearchOpen(false);
      setEmbeddedBibleSelectedBook(null);
      await loadEmbeddedBibleStudyChapter({
        devotionalId: devotional.id,
        devotionalTitle: devotional.title,
        dayNumber: firstDay.day_number,
        book,
        chapter,
      });
    } catch (error) {
      console.error("[DASHBOARD] Could not load Bible search chapter:", error);
      setEmbeddedBibleSearchMessage(`Could not load ${chapterLabel}. Try again in a moment.`);
    } finally {
      setEmbeddedBibleChapterLoading(null);
    }
  }

  function handleClearDoneTaskCards() {
    const doneKinds = visibleTasks
      .filter((task) => task.done && !clearedDoneTaskKinds[task.kind])
      .map((task) => task.kind);
    if (!doneKinds.length) return;

    const celebrationId = Date.now();
    setCelebratingTasks((prev) => {
      const next = { ...prev };
      doneKinds.forEach((kind) => {
        next[kind] = celebrationId;
      });
      return next;
    });

    window.setTimeout(() => {
      setClearedDoneTaskKinds((prev) => {
        const next = { ...prev };
        doneKinds.forEach((kind) => {
          next[kind] = true;
        });
        return next;
      });
      setCelebratingTasks((prev) => {
        const next = { ...prev };
        doneKinds.forEach((kind) => {
          if (next[kind] === celebrationId) {
            delete next[kind];
          }
        });
        return next;
      });
    }, 840);
  }

  const getSlideClass = (index: number) =>
    `w-full shrink-0 transition-[height] duration-300 ${safeActivePage === index ? "" : "h-0 overflow-hidden"}`;
  const shouldRenderSlide = (index: number) => safeActivePage === index;
  const showOfficialHomeMission =
    bibleYearDashboardActive &&
    Boolean(activeBibleYearDashboardDay) &&
    !homePanelOverride &&
    !shouldShowCompletionPanel &&
    !deepStudyFocusActive;

  const studyProgressPercent = Math.round((studyProgressCompleted / Math.max(studyProgressTotal, 1)) * 100);
  const getFeaturePageBullets = (key: DashboardPageKey) => {
    switch (key) {
      case "bible_studies":
        return ["Follow guided chapter studies", "Keep moving through your Bible Study Journey", "Intro, reading, notes, trivia, and reflection"];
      case "share":
        return ["Invite a friend", "Share by text or WhatsApp", "Help someone start studying too"];
      default:
        return ["Keep building your daily rhythm", "Follow your next Bible step", "Grow one day at a time"];
    }
  };

  const renderEmbeddedBiblePage = () => {
    const studyOptionsWithBooks = devotionalOptions.filter((study) => STUDY_BOOK_BY_TITLE[study.title]);
    const availableBooks = Array.from(new Set(studyOptionsWithBooks.map((study) => STUDY_BOOK_BY_TITLE[study.title])))
      .filter(Boolean);
    const visibleBooks = embeddedBibleAlphabetical
      ? [...availableBooks].sort((a, b) => a.localeCompare(b))
      : availableBooks;
    const visibleStudies = embeddedBibleSelectedBook
      ? studyOptionsWithBooks.filter((study) => STUDY_BOOK_BY_TITLE[study.title] === embeddedBibleSelectedBook)
      : [];

    return (
      <section className="w-full px-1">
        <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
          <div className="bb-card min-h-[calc(100vh-210px)] rounded-[28px] border p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="bb-accent text-xs font-black uppercase tracking-[0.16em]">Scripture</p>
                <h2 className="bb-text-primary mt-1 text-3xl font-black leading-tight">
                  {embeddedBibleSelectedBook || "Choose a Bible book"}
                </h2>
                <p className="bb-text-secondary mt-2 text-sm font-semibold leading-6">
                  {embeddedBibleSelectedBook
                    ? "Pick one of the Bible Buddy studies available for this book."
                    : "Only books that already have Bible Buddy studies are shown here."}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
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
              {!freeStudyModeActive ? (
              <button
                type="button"
                onClick={() => {
                  setEmbeddedBibleBookSearchOpen(false);
                  setEmbeddedBibleSelectedBook(null);
                  setEmbeddedBibleSearchMessage(null);
                }}
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] text-xl font-black text-[var(--bb-text-secondary,#4b5563)] transition hover:bg-[var(--bb-card,#ffffff)] hover:text-[var(--bb-text-primary,#111827)]"
                aria-label="Close Bible book search"
              >
                Ã—
              </button>
              ) : null}
              </div>
            </div>

            {embeddedBibleSelectedBook ? (
              <div className="mt-5">
                <div className="grid gap-2">
                  {isLoadingDevotionalOptions ? (
                    <p className="bb-surface-soft rounded-2xl border px-4 py-4 text-sm font-black text-[var(--bb-text-secondary,#4b5563)]">
                      Loading studies...
                    </p>
                  ) : visibleStudies.length > 0 ? (
                    visibleStudies.map((study) => (
                      <button
                        key={study.id}
                        type="button"
                        onClick={() => {
                          setEmbeddedBibleStudyId(study.id);
                          setEmbeddedBibleBookSearchOpen(false);
                          setFreeStudyModeActive(true);
                        }}
                        className="bb-surface-soft rounded-2xl border px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-[var(--bb-accent)] hover:bg-[var(--bb-card,#ffffff)] hover:shadow-sm"
                      >
                        <span className="bb-text-primary block text-base font-black leading-tight">{study.title}</span>
                        <span className="bb-text-muted mt-1 block text-xs font-bold">
                          {study.total_days} chapter study
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="bb-surface-soft rounded-2xl border px-4 py-4 text-sm font-black text-[var(--bb-text-secondary,#4b5563)]">
                      No studies are available for this book yet.
                    </p>
                  )}
                </div>
                {embeddedBibleSearchMessage ? (
                  <p className="mt-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-3 text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]">
                    {embeddedBibleSearchMessage}
                  </p>
                ) : null}
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
                  {isLoadingDevotionalOptions ? (
                    <p className="bb-surface-soft col-span-full rounded-2xl border px-4 py-4 text-sm font-black text-[var(--bb-text-secondary,#4b5563)]">
                      Loading available books...
                    </p>
                  ) : (
                    visibleBooks.map((book) => {
                      const studyCount = studyOptionsWithBooks.filter((study) => STUDY_BOOK_BY_TITLE[study.title] === book).length;
                      return (
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
                            {studyCount} {studyCount === 1 ? "study" : "studies"}
                          </span>
                        </button>
                      );
                    })
                  )}
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
              <span className="ml-2" aria-hidden="true">â€º</span>
            </Link>
          </div>
        </div>
      </section>
    );
  };

  const renderEmbeddedBibleStudiesPage = () => (
    <section className="w-full px-1">
      <div className="mx-auto max-w-xl overflow-hidden rounded-[28px]">
        {embeddedBibleBookSearchOpen || (freeStudyModeActive && !embeddedBibleStudyId) ? (
          renderEmbeddedBiblePage()
        ) : embeddedBibleStudyId ? (
          <BibleStudyDetailPage
            devotionalIdOverride={embeddedBibleStudyId}
            embedded
            onBack={() => {
              setEmbeddedBibleStudyId(null);
              if (freeStudyModeActive) setEmbeddedBibleBookSearchOpen(true);
            }}
            onChapterSelect={(payload) => {
              void loadEmbeddedBibleStudyChapter(payload);
            }}
          />
        ) : (
          <BibleStudiesLibraryPage embedded onStudySelect={setEmbeddedBibleStudyId} />
        )}
      </div>
    </section>
  );

  const renderDashboardBibleReaderPage = () => {
    const selectedChapterCount = dashboardBibleSelectedBook ? getBookTotalChapters(dashboardBibleSelectedBook) : 0;
    const readerSrc =
      dashboardBibleSelectedBook && dashboardBibleSelectedChapter
        ? `/Bible/${encodeURIComponent(dashboardBibleSelectedBook)}/${dashboardBibleSelectedChapter}?dashboardEmbed=1&hideReaderChrome=1`
        : null;

    if (readerSrc && dashboardBibleSelectedBook && dashboardBibleSelectedChapter) {
      return (
        <section className="w-full pb-4">
          <div className="mx-auto w-full max-w-xl">
            <iframe
              key={readerSrc}
              src={readerSrc}
              title={`${dashboardBibleSelectedBook} ${dashboardBibleSelectedChapter} Bible reader`}
              className="block w-full border-0 bg-transparent"
              style={{ minHeight: "calc(100dvh - 116px)", height: "calc(100dvh - 116px)" }}
            />
          </div>
        </section>
      );
    }

    return (
      <section className="w-full px-1 pb-4">
        <div className="mx-auto flex max-w-xl flex-col gap-4">
          <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Bible Reader</p>
                <h2 className="mt-1 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
                  {dashboardBibleSelectedBook
                    ? dashboardBibleSelectedChapter
                      ? `${dashboardBibleSelectedBook} ${dashboardBibleSelectedChapter}`
                      : dashboardBibleSelectedBook
                    : "Choose a book"}
                </h2>
                <p className="mt-2 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#5f6368)]">
                  {!dashboardBibleSelectedBook
                    ? "Pick a Bible book, choose a chapter, then read it here in the middle column."
                    : !dashboardBibleSelectedChapter
                      ? "Choose a chapter to open the reader."
                      : "Highlight verses, use the Bible menu, and mark the chapter complete from the reader."}
                </p>
              </div>
              {dashboardBibleSelectedBook ? (
                <button
                  type="button"
                  onClick={() => {
                    setDashboardBibleSelectedBook(null);
                    setDashboardBibleSelectedChapter(null);
                    setDashboardBibleCompletedChapters([]);
                  }}
                  className="shrink-0 rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-2 text-xs font-black text-[var(--bb-accent,#2f7fe8)] transition hover:brightness-95"
                >
                  Books
                </button>
              ) : null}
            </div>
          </div>

          {!dashboardBibleSelectedBook ? (
            <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3 shadow-sm">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {DASHBOARD_BIBLE_BOOKS.map((bookName) => (
                  <button
                    key={bookName}
                    type="button"
                    onClick={() => {
                      setDashboardBibleSelectedBook(bookName);
                      setDashboardBibleSelectedChapter(null);
                    }}
                    className="min-h-[64px] rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-3 text-left text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-card,#ffffff)] hover:shadow-sm"
                  >
                    {bookName}
                  </button>
                ))}
              </div>
            </div>
          ) : !dashboardBibleSelectedChapter ? (
            <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDashboardBibleSelectedBook(null);
                    setDashboardBibleSelectedChapter(null);
                  }}
                  className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]"
                >
                  Back to books
                </button>
                <p className="text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                  {dashboardBibleCompletedChapters.length}/{selectedChapterCount} complete
                </p>
              </div>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-7">
                {Array.from({ length: selectedChapterCount }, (_, index) => index + 1).map((chapterNumber) => {
                  const completed = dashboardBibleCompletedChapters.includes(chapterNumber);
                  return (
                    <button
                      key={chapterNumber}
                      type="button"
                      onClick={() => setDashboardBibleSelectedChapter(chapterNumber)}
                      className={`aspect-square rounded-2xl border text-sm font-black transition ${
                        completed
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] text-[var(--bb-text-primary,#111827)] hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-card,#ffffff)]"
                      }`}
                      aria-label={`${dashboardBibleSelectedBook} chapter ${chapterNumber}${completed ? ", completed" : ""}`}
                    >
                      {chapterNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="-mx-4 overflow-hidden border-y border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:mx-0 sm:rounded-[28px] sm:border">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-3">
                <button
                  type="button"
                  onClick={() => setDashboardBibleSelectedChapter(null)}
                  className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-3 py-2 text-xs font-black text-[var(--bb-accent,#2f7fe8)] transition hover:brightness-95"
                >
                  Chapters
                </button>
                <p className="min-w-0 truncate text-sm font-black text-[var(--bb-text-primary,#111827)]">
                  {dashboardBibleSelectedBook} {dashboardBibleSelectedChapter}
                </p>
                <Link
                  href={`/Bible/${encodeURIComponent(dashboardBibleSelectedBook)}/${dashboardBibleSelectedChapter}`}
                  className="rounded-full bg-[var(--bb-button,#2f7fe8)] px-3 py-2 text-xs font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
                >
                  Open
                </Link>
              </div>
              {readerSrc ? (
                <iframe
                  key={readerSrc}
                  src={readerSrc}
                  title={`${dashboardBibleSelectedBook} ${dashboardBibleSelectedChapter} Bible reader`}
                  className="block w-full border-0 bg-[var(--bb-card,#ffffff)]"
                  style={{ minHeight: "calc(100dvh - 190px)", height: "calc(100dvh - 190px)" }}
                />
              ) : null}
            </div>
          )}
        </div>
      </section>
    );
  };

  function getBuddyInitial(name: string) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BB";
  }

  function formatBuddyTime(value: string | null) {
    if (!value) return "recently";
    const diffMs = Date.now() - new Date(value).getTime();
    if (!Number.isFinite(diffMs)) return "recently";
    const minutes = Math.max(1, Math.round(diffMs / 60000));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.round(hours / 24);
    return `${days}d ago`;
  }

  const renderEmbeddedBuddiesPage = () => (
    <section className="w-full px-1 pb-4">
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Buddies</p>
          <h2 className="mt-1 text-2xl font-black text-[var(--bb-text-primary,#111827)]">See what your Buddies have been doing</h2>
          <p className="mt-2 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#5f6368)]">
            A live rolling log of your Bible Buddy activity, your Buddies' progress, Deep Study sessions, notes, badges, games, and community activity.
          </p>
        </div>

        {buddiesDashboardLoading ? (
          <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--bb-surface-soft,#f3f4f6)]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-3/5 rounded-full bg-[var(--bb-surface-soft,#f3f4f6)]" />
                    <div className="h-3 w-2/5 rounded-full bg-[var(--bb-surface-soft,#f3f4f6)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : buddiesDashboardError ? (
          <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-6 text-center shadow-sm">
            <p className="text-lg font-black text-[var(--bb-text-primary,#111827)]">Buddies needs a refresh.</p>
            <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">{buddiesDashboardError}</p>
          </div>
        ) : (
          <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
              <h3 className="text-xl font-black text-[var(--bb-text-primary,#111827)]">Buddy activity</h3>
              <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">
                Updates from you and your personal Bible Buddies.
              </p>
              <div className="mt-4 max-h-[62dvh] space-y-3 overflow-y-auto pr-1">
                {(buddiesDashboard?.friendTimeline || []).map((item) => (
                  <div key={item.id} className="bb-skin-glow-card flex gap-3 rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface,#f8fbff)] p-3">
                    {item.profileImageUrl ? (
                      <img src={item.profileImageUrl} alt={item.displayName} loading="lazy" decoding="async" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                    ) : (
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] text-xs font-black text-[var(--bb-accent,#2f7fe8)]">
                        {getBuddyInitial(item.displayName)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">{item.displayName}</p>
                      <p className="mt-0.5 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#5f6368)]">{item.actionText}</p>
                      <p className="mt-1 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">{formatBuddyTime(item.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
              {!(buddiesDashboard?.friendTimeline || []).length ? (
                <div className="mt-4 rounded-[20px] bg-[var(--bb-surface,#f8fbff)] p-5 text-center">
                  <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">No Buddy activity yet.</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">Your Bible activity and your Buddies' activity will show here as soon as the master action log records it.</p>
                </div>
              ) : null}
            </div>
        )}
      </div>
    </section>
  );

  const renderEmbeddedSettingsPage = () => (
    <section className="-mx-4 w-[calc(100%+2rem)] sm:-mx-5 sm:w-[calc(100%+2.5rem)]">
      <iframe
        src="/settings?embedded=dashboard"
        title="Bible Buddy Settings"
        className="block w-full border-0 bg-[var(--bb-background,#f8fbff)]"
        style={{ minHeight: "calc(100dvh - 130px)", height: "calc(100dvh - 130px)" }}
      />
    </section>
  );

  const renderEmbeddedAnalyticsPage = () => (
    <section className="-mx-4 w-[calc(100%+2rem)] sm:-mx-5 sm:w-[calc(100%+2.5rem)]">
      <iframe
        src="/admin/analytics?embedded=dashboard"
        title="Bible Buddy Analytics"
        className="block w-full border-0 bg-[var(--bb-background,#f8fbff)]"
        style={{ minHeight: "calc(100dvh - 130px)", height: "calc(100dvh - 130px)" }}
      />
    </section>
  );

  const renderEmbeddedBuddyPage = () => (
    <section className="w-full px-1 pb-4">
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <ChatLouis displayMode="embedded" studyContext={louisStudyContext} />
      </div>
    </section>
  );

  function getTvEpisodeEmbedUrl(url?: string) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/);
    return match?.[1] ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null;
  }

  async function openEmbeddedTvEpisode(title: BibleBuddyTvTitle, episode: BibleBuddyTvEpisode) {
    setEmbeddedTvSelection({ title, episode });
    setEmbeddedTvRewardMessage(null);

    if (!userId || !episode.available) return;

    const categoryLabel = bibleBuddyTvCategories.find((category) => category.id === title.category)?.label || "Bible Buddy TV";
    const actionLabel = buildBibleBuddyTvWatchRewardLabel({
      categoryLabel,
      title: title.title,
      episodeLabel: episode.contentLabel || (title.contentType === "movie" ? "Movie" : `Episode ${episode.episodeNumber}`),
      episodeTitle: episode.title,
      episodeId: episode.id,
    });

    try {
      const result = await awardBibleBuddyTvWatchOnce({ userId, username: userName, actionLabel });
      if (result.awarded) {
        triggerPoints(10);
        setEmbeddedTvRewardMessage("+10 XP +1 diamond earned for watching.");
      } else {
        setEmbeddedTvRewardMessage("Already rewarded for this video.");
      }
    } catch (error) {
      console.error("[DASHBOARD TV] Could not award TV watch:", error);
    }
  }

  const renderEmbeddedTvPage = () => {
    const availableTitles = bibleBuddyTvTitles.filter((title) => title.episodes.some((episode) => episode.available));
    const featuredTitle = availableTitles[0] ?? bibleBuddyTvTitles[0];
    const featuredEpisode = featuredTitle?.episodes.find((episode) => episode.available) ?? featuredTitle?.episodes[0];
    const continueEpisodes = availableTitles
      .flatMap((title) =>
        title.episodes
          .filter((episode) => episode.available)
          .slice(0, 2)
          .map((episode) => ({ title, episode })),
      )
      .slice(0, 8);
    const sermonEpisodes = availableTitles
      .filter((title) => title.category === "sermons")
      .flatMap((title) => title.episodes.filter((episode) => episode.available).slice(0, 1).map((episode) => ({ title, episode })))
      .slice(0, 6);
    const storyEpisodes = availableTitles
      .filter((title) => title.category !== "sermons")
      .flatMap((title) => title.episodes.filter((episode) => episode.available).slice(0, 1).map((episode) => ({ title, episode })))
      .slice(0, 6);

    const renderEpisodeCard = ({ title, episode }: { title: BibleBuddyTvTitle; episode: BibleBuddyTvEpisode }) => (
      <button
        key={`${title.id}-${episode.id}`}
        type="button"
        onClick={() => void openEmbeddedTvEpisode(title, episode)}
        className="group w-[168px] shrink-0 overflow-hidden rounded-[18px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="relative aspect-video overflow-hidden bg-[var(--bb-surface-soft,#f8fbff)]">
          <img src={episode.thumbnail || title.poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
          <span className="absolute bottom-2 right-2 rounded-full bg-black/75 px-2 py-0.5 text-[10px] font-black text-white">{episode.duration}</span>
        </div>
        <div className="p-3">
          <p className="line-clamp-1 text-[11px] font-black uppercase tracking-[0.12em] text-[var(--bb-accent,#2f7fe8)]">{episode.contentLabel || title.badge}</p>
          <h3 className="mt-1 line-clamp-2 text-sm font-black leading-5 text-[var(--bb-text-primary,#111827)]">{episode.title}</h3>
          <p className="mt-1 line-clamp-1 text-xs font-semibold text-[var(--bb-text-secondary,#5f6368)]">{title.title}</p>
        </div>
      </button>
    );

    if (embeddedTvSelection) {
      const { title, episode } = embeddedTvSelection;
      const embedUrl = getTvEpisodeEmbedUrl(episode.youtubeUrl);
      return (
        <section className="w-full px-1">
          <div className="mx-auto max-w-xl pb-7">
            <div className="overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
              <div className="flex items-start justify-between gap-3 border-b border-[var(--bb-card-border,#dbe7f4)] px-4 py-4">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Now Playing</p>
                  <h2 className="mt-1 text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{episode.title}</h2>
                  <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#5f6368)]">{title.title} â€¢ {episode.duration}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmbeddedTvSelection(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface,#f8fbff)] text-lg font-black text-[var(--bb-text-primary,#111827)]"
                  aria-label="Close video"
                >
                  Ã—
                </button>
              </div>
              <div className="bg-black">
                {embedUrl ? (
                  <iframe
                    title={episode.title}
                    src={embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="aspect-video w-full border-0"
                  />
                ) : (
                  <div className="grid aspect-video place-items-center px-6 text-center text-white">
                    <p className="text-sm font-black">Video link coming soon.</p>
                  </div>
                )}
              </div>
              <div className="space-y-3 px-4 py-4">
                {embeddedTvRewardMessage ? (
                  <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-3 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
                    {embeddedTvRewardMessage}
                  </div>
                ) : null}
                <p className="text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#5f6368)]">{episode.summary}</p>
                <button
                  type="button"
                  onClick={() => setEmbeddedTvSelection(null)}
                  className="w-full rounded-full bg-[var(--bb-button,#2f7fe8)] px-5 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm"
                >
                  Back to TV
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="w-full px-1">
        <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
          {featuredTitle && featuredEpisode ? (
            <button
              type="button"
              onClick={() => void openEmbeddedTvEpisode(featuredTitle, featuredEpisode)}
              className="relative overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-black text-left shadow-[0_14px_36px_rgba(38,63,99,0.16)]"
            >
              <img src={featuredEpisode.thumbnail || featuredTitle.heroImage || featuredTitle.poster} alt="" loading="lazy" decoding="async" className="h-64 w-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/80">Bible Buddy TV</p>
                <h2 className="mt-1 text-3xl font-black leading-tight">{featuredTitle.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-white/85">{featuredEpisode.summary}</p>
                <span className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-black text-black">â–¶ Play</span>
              </div>
            </button>
          ) : null}

          <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-4 shadow-sm">
            <h2 className="text-xl font-black text-[var(--bb-text-primary,#111827)]">Watch next</h2>
            <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">Earn +10 XP and +1 diamond the first time you watch a video.</p>
            <div className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2">
              {continueEpisodes.map(renderEpisodeCard)}
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-4 shadow-sm">
            <h2 className="text-xl font-black text-[var(--bb-text-primary,#111827)]">Sermons</h2>
            <div className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2">
              {sermonEpisodes.map(renderEpisodeCard)}
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-4 shadow-sm">
            <h2 className="text-xl font-black text-[var(--bb-text-primary,#111827)]">Stories & documentaries</h2>
            <div className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2">
              {storyEpisodes.map(renderEpisodeCard)}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderEmbeddedGamesPage = () => {
    const triviaTask = visibleTasks.find((task) => task.kind === "trivia") ?? null;
    const gameCards = [
      {
        key: "trivia" as const,
        eyebrow: "Task 4",
        title: "Bible Trivia",
        subtitle: "Answer chapter questions and see what is sticking.",
        stat: "5 quick questions",
        href: triviaTask?.href || "/bible-trivia",
        button: triviaTask ? `Play ${triviaTask.chapterLabel || "Today's"} Trivia` : "Browse Trivia",
        icon: "ðŸ§ ",
      },
      {
        key: "scrambled" as const,
        eyebrow: "Task 5",
        title: "Reflection Review",
        subtitle: "Return to the day's reflection.",
        stat: "Daily response",
        href: "/dashboard",
        button: "Open Reflection",
        icon: "ðŸ”¤",
      },
    ].filter((game) => game.key !== "scrambled");
    const selectedGame = gameCards.find((game) => game.key === embeddedGameView) ?? null;

    return (
      <section className="w-full px-1">
        <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
          {!selectedGame ? (
            <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Play</p>
              <h2 className="mt-1 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Bible Games</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                Practice today&apos;s chapter with games that fit the Bible Study flow.
              </p>
              <div className="mt-5 grid gap-3">
                {gameCards.map((game) => (
                  <button
                    key={game.key}
                    type="button"
                    onClick={() => setEmbeddedGameView(game.key)}
                    className="group w-full rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] p-4 text-left transition hover:border-[var(--bb-accent,#7BAFD4)] hover:bg-[var(--bb-card,#ffffff)] hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--bb-accent-soft,#eaf5ff)] text-2xl transition group-hover:scale-105" aria-hidden="true">
                        {game.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">{game.eyebrow}</span>
                        <span className="mt-1 block text-lg font-black text-[var(--bb-text-primary,#111827)]">{game.title}</span>
                        <span className="mt-1 block text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">{game.subtitle}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-[var(--bb-card,#ffffff)] px-3 py-1 text-xs font-black text-[var(--bb-text-muted,#6b7280)] ring-1 ring-[var(--bb-card-border,#dbe7f4)]">
                        {game.stat}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)] sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Bible Game</p>
                  <h2 className="mt-1 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{selectedGame.title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">{selectedGame.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmbeddedGameView(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] text-xl font-black text-[var(--bb-text-secondary,#4b5563)] transition hover:bg-[var(--bb-card,#ffffff)] hover:text-[var(--bb-text-primary,#111827)]"
                  aria-label="Close game view"
                >
                  Ã—
                </button>
              </div>
              <div className="mt-5 rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--bb-accent-soft,#eaf5ff)] text-3xl" aria-hidden="true">{selectedGame.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">{selectedGame.stat}</p>
                    <p className="mt-1 text-xs font-bold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                      Use this after reading and notes to check your chapter understanding.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  <Link href={selectedGame.href} className="rounded-2xl bg-[var(--bb-button,#2f7fe8)] px-4 py-3 text-center text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95">
                    {selectedGame.button}
                  </Link>
                  <Link
                    href="/bible-trivia/books"
                    className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-center text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
                  >
                    Choose A Book
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };

  function rememberBibleBuddy3ModeChoice() {
    setStudyModeGateDismissed(true);
    if (typeof window !== "undefined" && userId) {
      window.localStorage.setItem(`${BIBLE_BUDDY_3_MODE_GATE_STORAGE_KEY}:${userId}`, "1");
    }
  }

  function chooseBibleBuddyStudyJourney() {
    rememberBibleBuddy3ModeChoice();
    setFreeStudyModeActive(false);
    setEmbeddedBibleBookSearchOpen(false);
    setEmbeddedBibleSelectedBook(null);
    setEmbeddedBibleStudyId(null);
    setActivePage(dashboardPageKeys.indexOf("bible_studies"));
  }

  function chooseFreeStudyMode() {
    rememberBibleBuddy3ModeChoice();
    setFreeStudyModeActive(true);
    setEmbeddedBibleStudyId(null);
    setEmbeddedBibleSelectedBook(null);
    setEmbeddedBibleSearchMessage(null);
    setEmbeddedBibleBookSearchOpen(true);
    setActivePage(dashboardPageKeys.indexOf("bible_studies"));
  }

  const renderBibleBuddy3ModeGate = () => (
    <section className="w-full px-1">
      <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
        <div className="overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
          <div className="bg-[var(--bb-surface-soft,#f8fbff)] px-5 py-6 text-center">
            <div className="flex justify-center">
              <LouisAvatar mood="wave" size={96} />
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Bible Buddy 3.0</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Bible Buddy 3.0 is now live.</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
              Please select your study mode so your dashboard can load the right Bible study experience.
            </p>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={chooseBibleBuddyStudyJourney}
              className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-5 text-left transition hover:-translate-y-0.5 hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-card,#ffffff)] hover:shadow-sm"
            >
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">Guided</span>
              <span className="mt-1 block text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Bible Buddy Study Journey</span>
              <span className="mt-2 block text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                Start from Genesis 1, The Creation of the World, and work through the Bible with story-based explanations, daily tasks, notes, trivia, and reflection.
              </span>
            </button>

            <button
              type="button"
              onClick={chooseFreeStudyMode}
              className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-5 text-left transition hover:-translate-y-0.5 hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-surface-soft,#f8fbff)] hover:shadow-sm"
            >
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">Explore</span>
              <span className="mt-1 block text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Free Study Mode</span>
              <span className="mt-2 block text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                Pick any Bible book and chapter when you want to study freely without following a guided journey.
              </span>
            </button>
          </div>

          <div className="border-t border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-4">
            <div className="flex items-center gap-3">
              <LouisAvatar mood="hands" size={46} />
              <p className="text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                We promise this will never happen again. We just had to move a lot around to make the new Bible Buddy 3.0 study system work right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderCurrentStudyHeader = () => {
    return (
      <div className="mx-auto w-full max-w-xl px-1">
        <div className="dashboard-current-study-card bb-skin-glow-card overflow-hidden rounded-[18px] border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_86%,transparent)] px-3 py-2.5 shadow-sm transition">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (!currentDevotionalId) return;
                setShowCurrentStudyDetails((current) => !current);
              }}
              disabled={!currentDevotionalId}
              aria-expanded={showCurrentStudyDetails}
              className="flex min-w-0 flex-1 items-center gap-3 text-left"
            >
              <span className="h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-[var(--bb-surface-soft,#eef6ff)] p-0.5 shadow-sm">
                {currentStudyCover ? (
                  <img src={currentStudyCover} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
                ) : (
                  <span className="grid h-full w-full place-items-center text-xl" aria-hidden="true">ðŸ“–</span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">
                  {bibleYearDashboardActive ? currentDashboardDayLabel : "Current Study"}
                </span>
                <span className="mt-0.5 block truncate text-sm font-black text-[var(--bb-text-primary,#111827)]">
                  {currentDevotionalTitle || "Choose Your Bible Study"}
                </span>
                <span className="mt-0.5 block truncate text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">{activeChapterLabel}</span>
                <span className="mt-0.5 block line-clamp-1 text-[11px] font-medium text-[var(--bb-text-muted,#6b7280)]">{currentStudySummary}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setShowJourneyHelp(false);
                if (isPaidUser || canFreeUserChooseNewStudy) {
                  setShowDevotionalSettings(true);
                } else {
                  setFreePlanGate({ kind: "study" });
                }
              }}
              className="shrink-0 rounded-full bg-[var(--bb-accent-soft,#f2f7ff)] px-3 py-1.5 text-[11px] font-black text-[var(--bb-accent,#2f7fe8)] transition hover:brightness-95"
            >
              Change Study
            </button>
          </div>

          {showCurrentStudyDetails && currentDevotionalId ? (
            <div className="dashboard-inline-task mt-3 border-t border-[var(--bb-card-border,#dbe7f4)] pt-3">
              <div className="grid gap-2">
                {currentStudyChapters.map((studyChapter) => {
                  const chapterLabel =
                    studyChapter.bible_reading_book && studyChapter.bible_reading_chapter
                      ? `${studyChapter.bible_reading_book} ${studyChapter.bible_reading_chapter}`
                      : studyChapter.day_title || `Chapter ${studyChapter.day_number}`;
                  const currentDayNumber = currentDevotionalTask?.devotionalDayNumber ?? 1;
                  const isCurrent = studyChapter.day_number === currentDayNumber;
                  const isPastOrCurrent = studyChapter.day_number <= currentDayNumber;
                  const isLocked = !isOwnerDashboard && !isPaidUser && !isPastOrCurrent;

                  return (
                    <button
                      key={studyChapter.day_number}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (isLocked) return;
                        if (isCurrent) {
                          setShowCurrentStudyDetails(false);
                          setSuppressCompletionPanelForLoadedChapter(true);
                          return;
                        }
                        void switchCurrentStudyChapter(studyChapter.day_number);
                      }}
                      disabled={isLocked || switchingStudyChapter !== null}
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                        isCurrent
                          ? "border-[var(--bb-accent)] bg-[var(--bb-accent-soft)]"
                          : isPastOrCurrent
                          ? "border-[#b9dcf4] bg-[#eaf5ff] hover:border-[#7BAFD4]"
                            : isLocked
                              ? "border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] opacity-70"
                              : "border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] hover:border-[var(--bb-accent)]"
                      } disabled:opacity-70`}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">{chapterLabel}</span>
                        <span className="mt-0.5 block text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                          {studyChapter.day_title || `Chapter ${studyChapter.day_number}`}
                        </span>
                      </span>
                      <span className={`shrink-0 text-xs font-black ${isPastOrCurrent && !isCurrent ? "text-[#2f6685]" : "text-[var(--bb-accent,#2f7fe8)]"}`}>
                        {isLocked ? "ðŸ”’" : isCurrent ? "Review" : switchingStudyChapter === studyChapter.day_number ? "Loading" : "Load"}
                      </span>
                    </button>
                  );
                })}
                {!currentStudyChapters.length ? (
                  <p className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-4 text-sm font-bold text-[var(--bb-text-muted,#6b7280)]">
                    Loading study chapters...
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  async function startBibleYearSeriesReading(day: GenesisBibleYearDay, readingIndex = 0) {
    const reading = day.readings[readingIndex] || day.readings[0];
    if (!reading) return;

    const devotional = devotionalOptions.find((option) => option.title === reading.studyTitle);
    if (!devotional) {
      setDevotionalSettingsMessage("This Genesis study is still loading. Try again in a moment.");
      return;
    }

    if (!isPaidUser && !canFreeUserChooseNewStudy && devotional.id !== currentDevotionalId) {
      setSelectedBibleYearSeriesDay(null);
      setManualBibleYearStudyDayNumber(null);
      setFreePlanGate({ kind: "study" });
      return;
    }

    setSelectedBibleYearSeriesDay(null);
    setManualBibleYearStudyDayNumber(null);
    await loadEmbeddedBibleStudyChapter({
      devotionalId: devotional.id,
      devotionalTitle: devotional.title,
      dayNumber: reading.studyDayNumber,
      book: reading.book,
      chapter: reading.chapter,
    });
  }

  function getBibleYearDailyLesson(dayNumber: number): BibleYearDailyLesson | null {
    const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((item) => item.dayNumber === dayNumber);
    return day ? getBibleYearDayContent(day).lesson : null;
  }

  function getBibleYearDayAudio(dayNumber: number): BibleYearAudioDay | null {
    const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((item) => item.dayNumber === dayNumber);
    return day ? getBibleYearDayContent(day).audio : null;
  }

  function getBibleYearLessonVerses(block: BibleYearDailyLesson["sections"][number]["verseBlock"]) {
    return (BIBLE_YEAR_GENESIS_WEB_VERSES[block.chapter] || []).filter(
      (verse) => verse.verse >= block.startVerse && verse.verse <= block.endVerse,
    );
  }

  function handleBibleYearDatabaseTermClick(event: MouseEvent<HTMLDivElement>) {
    const highlightElement = (event.target as HTMLElement).closest(".bible-highlight") as HTMLElement | null;
    if (!highlightElement) return;

    event.preventDefault();
    event.stopPropagation();

    const type = highlightElement.dataset.type as "people" | "places" | "keywords" | undefined;
    const term = highlightElement.dataset.term;
    if (!type || !term) return;

    bibleYearTermReturnScrollYRef.current = window.scrollY;
    setBibleYearTermBurstKey((current) => current + 1);
    setBibleYearSelectedTerm({ type, name: resolveBibleReference(type, term) });
  }

  useEffect(() => {
    let cancelled = false;

    async function loadBibleYearTermNotes() {
      if (!bibleYearSelectedTerm) return;
      setBibleYearTermLoading(true);
      setBibleYearTermNotes(null);
      setBibleYearTermNotesError(null);

      try {
        const notes =
          bibleYearSelectedTerm.type === "people"
            ? await getPersonPopupNotes(bibleYearSelectedTerm.name)
            : bibleYearSelectedTerm.type === "places"
              ? await getPlacePopupNotes(bibleYearSelectedTerm.name)
              : await getKeywordPopupNotes(bibleYearSelectedTerm.name);

        if (!cancelled) setBibleYearTermNotes(notes);
      } catch {
        if (!cancelled) setBibleYearTermNotesError("Could not load this word yet.");
      } finally {
        if (!cancelled) setBibleYearTermLoading(false);
      }
    }

    void loadBibleYearTermNotes();

    return () => {
      cancelled = true;
    };
  }, [bibleYearSelectedTerm]);

  function centerBibleYearTermTakeover(behavior: ScrollBehavior = "smooth") {
    const node = bibleYearTermTakeoverRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const centeredOffset = Math.max(12, (viewportHeight - rect.height) / 2);
    const nextTop = Math.max(0, window.scrollY + rect.top - centeredOffset);
    window.scrollTo({ top: nextTop, behavior });
  }

  useEffect(() => {
    if (!bibleYearSelectedTerm) return;
    let settleTimeout: number | null = null;
    const frame = window.requestAnimationFrame(() => {
      centerBibleYearTermTakeover("smooth");
      settleTimeout = window.setTimeout(() => centerBibleYearTermTakeover("smooth"), 120);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (settleTimeout !== null) window.clearTimeout(settleTimeout);
    };
  }, [bibleYearSelectedTerm, bibleYearTermLoading, bibleYearTermNotes]);

  function closeBibleYearTermTakeover() {
    setBibleYearSelectedTerm(null);
    setBibleYearTermNotes(null);
    setBibleYearTermNotesError(null);
    const returnScrollY = bibleYearTermReturnScrollYRef.current;
    if (typeof returnScrollY === "number") {
      window.requestAnimationFrame(() => window.scrollTo({ top: returnScrollY, behavior: "auto" }));
    }
  }

  function closeBibleYearReadingArticle() {
    setActiveBibleYearDayCard(null);
    setBibleYearStudyNotesOpen(false);
    setBibleYearDeepNotesOpen(false);
    setBibleYearDeepNotesUpgradeOpen(false);
    setBibleYearDownloadUpgradeOpen(false);
    setBibleYearQuickUpgradeOpen(false);
    setBibleYearQuickUpgradeContext(null);
    setBibleYearQuickUpgradeLoading(null);
    setBibleYearQuickUpgradeError(null);
    setBibleYearDownloadPrompt(null);
    setBibleYearOpenVerseBreakdownKey(null);
    setBibleYearSelectedTerm(null);
    setBibleYearTermNotes(null);
    setBibleYearTermNotesError(null);
  }

  function openBibleYearQuickUpgrade(context: "day3" | null = null) {
    setBibleYearDeepNotesUpgradeOpen(false);
    setBibleYearDownloadUpgradeOpen(false);
    setBibleYearQuickUpgradeError(null);
    setBibleYearQuickUpgradeContext(context);
    setBibleYearQuickUpgradeOpen(true);
  }

  function getDayThreeProPromptStorageKey() {
    return `${DAY_THREE_PRO_UPGRADE_PROMPT_ID}:${userId || "guest"}`;
  }

  async function hasSeenDayThreeProPrompt() {
    if (!userId) {
      if (typeof window === "undefined") return false;
      return window.localStorage.getItem(getDayThreeProPromptStorageKey()) === "seen";
    }

    try {
      const { data, error } = await supabase
        .from("master_actions")
        .select("id")
        .eq("user_id", userId)
        .eq("action_type", ACTION_TYPE.upgrade_popup_viewed)
        .eq("journey_day", 3)
        .eq("action_label", "Bible in One Year Day 3 Pro upgrade popup viewed")
        .limit(1);

      if (error) throw error;
      return Boolean(data?.length);
    } catch (error) {
      console.warn("[BIBLE_YEAR_DAY3_UPGRADE] Could not check prompt history:", error);
      return false;
    }
  }

  function rememberDayThreeProPromptSeen() {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(getDayThreeProPromptStorageKey(), "seen");
  }

  async function logDayThreeProPromptAction(actionType: ActionType, label: string) {
    if (!userId) return;
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const meta = user?.user_metadata || {};
      const username =
        meta.firstName ||
        meta.first_name ||
        (user?.email ? user.email.split("@")[0] : null) ||
        "User";
      await supabase.from("master_actions").insert({
        user_id: userId,
        username,
        action_type: actionType,
        action_label: label,
        journey_day: 3,
        account_status: isPaidUser ? "pro" : "free_or_guest",
        event_metadata: {
          plan: "bible_in_one_year",
          prompt: "day_3_pro_upgrade",
        },
      });
    } catch (error) {
      console.warn("[BIBLE_YEAR_DAY3_UPGRADE] Could not log prompt action:", error);
    }
  }

  async function openDayThreeProPrompt(day: GenesisBibleYearDay, nextDay: GenesisBibleYearDay) {
    if (isPaidUser) return false;
    if (await hasSeenDayThreeProPrompt()) return false;
    rememberDayThreeProPromptSeen();
    setBibleYearDayThreeProPrompt({ day, nextDay });
    setBibleYearDayThreeProContinueTarget({ day, nextDay });
    setBibleYearDayThreeProOpenSection("understand");
    void logDayThreeProPromptAction(ACTION_TYPE.upgrade_popup_viewed, "Bible in One Year Day 3 Pro upgrade popup viewed");
    return true;
  }

  function continueAfterDayThreeProPrompt() {
    const prompt = bibleYearDayThreeProPrompt || bibleYearDayThreeProContinueTarget;
    setBibleYearDayThreeProPrompt(null);
    setBibleYearDayThreeProContinueTarget(null);
    setBibleYearQuickUpgradeContext(null);
    setBibleYearQuickUpgradeOpen(false);
    setBibleYearQuickUpgradeError(null);
    if (!prompt) return;
    void handleContinueToNextBibleYearDay(prompt.day, prompt.nextDay);
  }

  function closeBibleYearQuickUpgrade() {
    if (bibleYearQuickUpgradeLoading) return;
    if (bibleYearQuickUpgradeContext === "day3") {
      void logDayThreeProPromptAction(ACTION_TYPE.upgrade_popup_dismissed, "Bible in One Year Day 3 Pro plan choices dismissed");
      continueAfterDayThreeProPrompt();
      return;
    }
    setBibleYearQuickUpgradeOpen(false);
    setBibleYearQuickUpgradeError(null);
    setBibleYearQuickUpgradeContext(null);
  }

  async function startBibleYearQuickUpgrade(plan: "monthly" | "yearly") {
    try {
      setBibleYearQuickUpgradeLoading(plan);
      setBibleYearQuickUpgradeError(null);
      const returnTo = bibleYearQuickUpgradeContext === "day3" ? "/dashboard?view=bible-year&day=4" : undefined;
      if (bibleYearQuickUpgradeContext === "day3") {
        void logDayThreeProPromptAction(ACTION_TYPE.upgrade_popup_cta_clicked, `Bible in One Year Day 3 Pro ${plan} checkout clicked`);
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan, returnTo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      if (!data.url) {
        throw new Error("Stripe did not return a checkout link.");
      }

      window.location.href = data.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setBibleYearQuickUpgradeError(message);
      setBibleYearQuickUpgradeLoading(null);
    }
  }

  async function resolveBibleYearStudyNotesPaidStatus() {
    if (isPaidUser) return true;
    if (!userId) return false;

    const { data, error } = await supabase
      .from("profile_stats")
      .select("is_paid")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.warn("[BIBLE_YEAR_STUDY_NOTES] Could not confirm paid status:", error.message);
      return false;
    }

    return data?.is_paid === true;
  }

  async function hasSeenDayOneStudyNotesGiftPopup() {
    if (!userId) return bibleYearDayOneStudyNotesGiftSeen;
    if (bibleYearDayOneStudyNotesGiftSeen) return true;

    const { data, error } = await supabase
      .from("user_popups_seen")
      .select("has_seen")
      .eq("user_id", userId)
      .eq("popup_id", DAY_ONE_STUDY_NOTES_GIFT_POPUP_ID)
      .maybeSingle();

    if (error) {
      if (!/user_popups_seen|schema cache/i.test(error.message || "")) {
        console.warn("[POPUPS] Could not verify Day 1 Study Notes gift popup state:", error.message);
      }
      return bibleYearDayOneStudyNotesGiftSeen;
    }

    const hasSeen = data?.has_seen === true;
    if (hasSeen) setBibleYearDayOneStudyNotesGiftSeen(true);
    return hasSeen;
  }

  async function markDayOneStudyNotesGiftPopupSeen() {
    setBibleYearDayOneStudyNotesGiftSeen(true);
    if (!userId) return;

    const now = new Date().toISOString();
    const { error } = await supabase
      .from("user_popups_seen")
      .upsert(
        {
          user_id: userId,
          popup_id: DAY_ONE_STUDY_NOTES_GIFT_POPUP_ID,
          has_seen: true,
          seen_at: now,
          updated_at: now,
        },
        { onConflict: "user_id,popup_id" },
      );

    if (error && !/user_popups_seen|schema cache/i.test(error.message || "")) {
      console.warn("[POPUPS] Could not save Day 1 Study Notes gift popup state:", error.message);
    }
  }

  async function openBibleYearDeepNotes(dayNumber?: number) {
    const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((item) => item.dayNumber === dayNumber) || selectedBibleYearSeriesDay || activeBibleYearDashboardDay;
    const trackingPayload = {
      userId,
      username: userName,
      source: "bible_in_one_year",
      sourceLabel: "Bible in One Year",
      itemKey: `day-${dayNumber || day?.dayNumber || "unknown"}`,
      itemTitle: day?.title || `Day ${dayNumber || "Unknown"}`,
      contentLabel: day ? `Day ${day.dayNumber} - ${day.title}` : `Day ${dayNumber || "Unknown"} Study Notes`,
    } as const;
    void trackDeepStudyInterestOnce(trackingPayload);

    const hasPaidAccess = await resolveBibleYearStudyNotesPaidStatus();

    if (hasPaidAccess) {
      setBibleYearDayOneDeepNotesGiftOpen(false);
      setBibleYearDeepNotesUpgradeOpen(false);
      void trackStudyNotesViewed(trackingPayload);
      setBibleYearDeepNotesOpen(true);
      return;
    }

    if (day?.dayNumber === 1) {
      const hasSeenGiftPopup = await hasSeenDayOneStudyNotesGiftPopup();
      if (hasSeenGiftPopup) {
        void trackStudyNotesViewed(trackingPayload);
        setBibleYearDeepNotesOpen(true);
        return;
      }

      void markDayOneStudyNotesGiftPopupSeen();
      setBibleYearDayOneDeepNotesGiftOpen(true);
      return;
    }

    setBibleYearDeepNotesUpgradeOpen(true);
  }

  function openBibleYearDayOneGiftDeepNotes() {
    const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((item) => item.dayNumber === 1);
    void trackStudyNotesViewed({
      userId,
      username: userName,
      source: "bible_in_one_year",
      sourceLabel: "Bible in One Year",
      itemKey: "day-1",
      itemTitle: day?.title || "Day 1",
      contentLabel: day ? `Day ${day.dayNumber} - ${day.title}` : "Day 1 Study Notes",
    });
    setBibleYearDayOneDeepNotesGiftOpen(false);
    setBibleYearDeepNotesUpgradeOpen(false);
    setBibleYearDeepNotesOpen(true);
  }

  function renderBibleYearDayOneDeepNotesGiftModal() {
    return (
      <ModalShell
        isOpen={Boolean(bibleYearDayOneDeepNotesGiftOpen && !isPaidUser)}
        onClose={() => setBibleYearDayOneDeepNotesGiftOpen(false)}
        backdropColor="bg-slate-950/72 backdrop-blur-md"
      >
        <div className="relative w-full max-w-[430px] overflow-hidden rounded-[34px] border border-[#ead7ae] bg-[radial-gradient(circle_at_84%_8%,rgba(246,180,75,0.26),transparent_34%),radial-gradient(circle_at_12%_0%,rgba(255,248,224,0.95),transparent_40%),linear-gradient(145deg,#fffaf1_0%,#fffdf8_52%,#fff4d8_100%)] px-5 pb-5 pt-6 text-center text-[#0f172a] shadow-[0_32px_90px_rgba(0,0,0,0.46),0_0_42px_rgba(246,180,75,0.22)] sm:px-6">
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#f6b44b]/20 blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute left-8 top-16 text-sm text-[#f6b44b]/70" aria-hidden="true">âœ¦</div>
          <div className="pointer-events-none absolute right-12 top-24 text-lg text-[#d89b28]/70" aria-hidden="true">âœ¦</div>
          <button
            type="button"
            onClick={() => setBibleYearDayOneDeepNotesGiftOpen(false)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[#ead7ae] bg-white/78 text-xl font-black text-[#0f172a] shadow-[0_8px_22px_rgba(15,23,42,0.12)] transition hover:bg-[#fff4d8]"
            aria-label="Close Day 1 Study Notes gift"
          >
            x
          </button>

          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#fff0cf] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#a66d00] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
            <span aria-hidden="true">ðŸŽ</span>
            <span>Bible Buddy Pro Gift</span>
          </div>

          <h2 className="mx-auto mt-5 max-w-sm font-serif text-[34px] font-black leading-[1.02] tracking-normal text-[#101828]">
            Day 1 Study Notes are <span className="text-[#b77900]">unlocked</span> for you
          </h2>

          <p className="mx-auto mt-4 max-w-[330px] text-[15px] font-semibold leading-6 text-[#48546a]">
            This is normally a Bible Buddy Pro feature, but Day 1 is a gift for starting your Bible in One Year journey.
          </p>
          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={openBibleYearDayOneGiftDeepNotes}
              className="w-full rounded-[24px] bg-[linear-gradient(135deg,#f7c35f,#d99a21_52%,#b87300)] px-5 py-4 text-center text-white shadow-[0_18px_34px_rgba(183,115,0,0.28)] transition hover:brightness-105"
            >
              <span className="block text-base font-black leading-tight">ðŸŽ Open My Free Day 1 Study Notes</span>
              <span className="mt-1 block text-xs font-semibold text-white/88">Your Day 1 Study Notes are unlocked</span>
            </button>
            <button
              type="button"
              onClick={() => setBibleYearDayOneDeepNotesGiftOpen(false)}
              className="w-full rounded-[24px] border border-[#9fc8ff] bg-white/82 px-5 py-3.5 text-center text-[#102033] shadow-[0_10px_22px_rgba(15,23,42,0.06)] transition hover:bg-[#f8fbff]"
            >
              <span className="block text-sm font-black leading-tight">Keep Reading Summary</span>
              <span className="mt-1 block text-xs font-semibold text-[#6b7280]">Continue with today&apos;s summary first</span>
            </button>
          </div>

          <p className="mx-auto mt-4 max-w-xs text-center text-[11px] font-bold leading-5 text-[#7b8497]">
            ðŸŽ Gift unlocks Day 1 Study Notes only. <span className="text-[#b77900]">Upgrade</span> anytime to unlock all Days.
          </p>
        </div>
      </ModalShell>
    );
  }

  function renderBibleYearDeepNotesUpgradeModal() {
    const upgradeFeatures = [
      {
        icon: "ðŸ“–",
        iconClass: "bg-[#eadcff] text-[#6d3fd1]",
        title: "Verse by verse breakdowns",
        description: "Understand difficult passages one section at a time.",
      },
      {
        icon: "ðŸº",
        iconClass: "bg-[#f5e3c3] text-[#9a6517]",
        title: "Cultural & historical context",
        description: "See what was happening in the world behind the verses.",
      },
      {
        icon: "ðŸ”",
        iconClass: "bg-[#dff0d8] text-[#3b7a39]",
        title: "Hebrew & Greek word studies",
        description: "Discover what key words and phrases originally meant.",
      },
      {
        icon: "ðŸ”—",
        iconClass: "bg-[#ddecff] text-[#2f6bcf]",
        title: "Themes & Scripture connections",
        description: "See how stories, ideas, and people connect across the Bible.",
      },
      {
        icon: "âœ¨",
        iconClass: "bg-[#ffefc2] text-[#b37a00]",
        title: "Bible Buddy Pro perks",
        description: "Unlock deeper Bible study notes, context, downloads, and study tools.",
      },
    ];

    return (
      <ModalShell isOpen={bibleYearDeepNotesUpgradeOpen} onClose={() => setBibleYearDeepNotesUpgradeOpen(false)}>
        <div className="relative w-full max-w-[420px] overflow-hidden rounded-[24px] border border-[#ead9bd] bg-[#fffdf8] px-4 py-4 text-center text-[#0f1b33] shadow-[0_20px_58px_rgba(15,23,42,0.28)]">
          <button
            type="button"
            onClick={() => setBibleYearDeepNotesUpgradeOpen(false)}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[#e7dccb] bg-white/90 text-lg font-black text-[#0f1b33] shadow-[0_6px_16px_rgba(15,23,42,0.12)] transition hover:bg-[#fff4dc]"
            aria-label="Close upgrade prompt"
          >
            x
          </button>

          <div className="pr-9 text-left sm:text-center">
            <h2 className="font-serif text-[26px] font-black leading-[1.02] tracking-normal text-[#0b162f] sm:text-[28px]">
              Don&apos;t just read.
              <span className="block">Finally <span className="text-[#2f7fe8]">understand.</span></span>
            </h2>
            <div className="mx-auto mt-1.5 h-1 w-36 rounded-full bg-[#8eb8ee] opacity-70 sm:w-44" aria-hidden="true" />
          </div>

          <div className="mx-auto mt-3 max-w-sm space-y-1.5 text-left text-[13px] font-semibold leading-5 text-[#263855] sm:text-center">
            <p>Bible Buddy Free helps you stay consistent.</p>
            <p>
              Bible Buddy Pro helps you <span className="font-black text-[#1f65c7]">understand Scripture more deeply</span> through guided explanations, cultural context, word studies, and verse by verse breakdowns.
            </p>
          </div>

          <div className="mt-3 rounded-[18px] border border-[#ead9bd] bg-white/72 px-3 py-2.5 text-left shadow-[0_8px_22px_rgba(102,65,12,0.07)]">
            <div className="grid gap-2">
              {upgradeFeatures.map((feature, index) => (
                <div key={feature.title} className={`flex gap-2.5 ${index > 0 ? "border-t border-[#eadfce] pt-2" : ""}`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-base ${feature.iconClass}`} aria-hidden="true">
                    {feature.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black leading-tight text-[#0b162f]">{feature.title}</span>
                    <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-[#3b4b66]">{feature.description}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid gap-2">
            <button
              type="button"
              onClick={() => openBibleYearQuickUpgrade()}
              className="flex w-full items-center justify-center gap-2.5 rounded-[17px] bg-[#2f7fe8] px-4 py-3 text-left text-white shadow-[0_12px_24px_rgba(47,127,232,0.24)] transition hover:brightness-105"
            >
              <span className="text-xl" aria-hidden="true">ðŸ‘‘</span>
              <span>
                <span className="block text-sm font-black leading-tight">Unlock Study Notes</span>
                <span className="mt-0.5 block text-[11px] font-semibold text-white/88">Start understanding Scripture more deeply</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setBibleYearDeepNotesUpgradeOpen(false)}
              className="rounded-[15px] border border-[#7aaaf3] bg-white/78 px-4 py-2 text-[#0f1b33] transition hover:bg-[#f4f8ff]"
            >
              <span className="block text-xs font-black leading-tight">Continue with Free Plan</span>
              <span className="mt-0.5 block text-[11px] font-semibold text-[#4c5d78]">Keep studying with the free plan</span>
            </button>
          </div>

          <p className="mt-3 text-[11px] font-semibold leading-4 text-[#61708a]">
            ðŸ”’ Cancel anytime. Upgrade in seconds. Secure and private.
          </p>
        </div>
      </ModalShell>
    );
  }

  function renderBibleYearQuickUpgradeModal() {
    return (
      <ModalShell isOpen={bibleYearQuickUpgradeOpen} onClose={closeBibleYearQuickUpgrade}>
        <div className="bb-skin-glow-card relative w-full max-w-md overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_38%,var(--bb-card-border,#dbe7f4))] bg-[radial-gradient(circle_at_18%_0%,color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,transparent),transparent_44%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_98%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_82%,transparent))] p-5 text-left text-[var(--bb-text-primary,#111827)] shadow-[0_28px_80px_rgba(0,0,0,0.45),0_0_38px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_22%,transparent)] backdrop-blur-xl">
          {bibleYearQuickUpgradeLoading ? (
            <div className="absolute inset-0 z-20 grid place-items-center bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_86%,transparent)] backdrop-blur-sm">
              <div className="flex w-[min(260px,80%)] flex-col items-center rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] px-5 py-5 text-center shadow-[0_18px_48px_rgba(15,23,42,0.18)]">
                <span className="h-9 w-9 animate-spin rounded-full border-4 border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,transparent)] border-t-[var(--bb-accent,#f6b44b)]" aria-hidden="true" />
                <span className="mt-3 text-sm font-black text-[var(--bb-text-primary,#111827)]">Opening Stripe</span>
                <span className="mt-1 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                  Taking you to the {bibleYearQuickUpgradeLoading === "monthly" ? "$4.99 monthly" : "$50 yearly"} checkout.
                </span>
              </div>
            </div>
          ) : null}
          <button
            type="button"
            onClick={closeBibleYearQuickUpgrade}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_76%,transparent)] text-xl font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_62%,transparent)] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close plan choices"
            disabled={Boolean(bibleYearQuickUpgradeLoading)}
          >
            x
          </button>
          <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,transparent)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">
            Bible Buddy Pro
          </div>
          <h2 className="mt-4 pr-10 text-2xl font-black leading-tight">Choose your Pro plan</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            Unlock Study Notes and start understanding Scripture more deeply. Cancel anytime.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => startBibleYearQuickUpgrade("monthly")}
              disabled={Boolean(bibleYearQuickUpgradeLoading)}
              className="relative flex min-h-28 w-full flex-col justify-between rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_30%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_84%,transparent)] px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_48%,transparent)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span>
                <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">Monthly</span>
                <span className="block text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">Flexible access</span>
              </span>
              <span className="mt-4 text-2xl font-black text-[var(--bb-accent,#f6b44b)]">$4.99</span>
            </button>
            <button
              type="button"
              onClick={() => startBibleYearQuickUpgrade("yearly")}
              disabled={Boolean(bibleYearQuickUpgradeLoading)}
              className="relative flex min-h-28 w-full flex-col justify-between overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_44%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-button,var(--bb-accent,#f6b44b))] px-4 py-4 text-left text-[var(--bb-button-text,#000000)] shadow-[0_0_28px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_32%,transparent)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span>
                <span className="block text-sm font-black">Yearly</span>
                <span className="block text-xs font-bold opacity-80">Best value</span>
              </span>
              <span className="mt-4 text-2xl font-black">$50</span>
            </button>
          </div>
          {bibleYearQuickUpgradeError ? (
            <p className="mt-3 rounded-2xl border border-red-400/35 bg-red-500/10 px-4 py-3 text-xs font-bold leading-5 text-red-200">
              {bibleYearQuickUpgradeError}
            </p>
          ) : null}
          <button
            type="button"
            onClick={closeBibleYearQuickUpgrade}
            disabled={Boolean(bibleYearQuickUpgradeLoading)}
            className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_80%,transparent)] px-5 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Keep Studying Free
          </button>
        </div>
      </ModalShell>
    );
  }

  function renderBibleYearDayThreeProUpgradePrompt() {
    const prompt = bibleYearDayThreeProPrompt;
    if (!prompt) return null;

    const sections = [
      {
        id: "understand",
        title: "Understand Scripture More Deeply",
        body: "Go beyond a quick read with clearer explanations, context, and guided notes that help the story make sense as you keep moving through Genesis and the rest of Scripture.",
      },
      {
        id: "offline",
        title: "Study Anywhere, Even Offline",
        body: "Keep your Bible study close when life gets busy. Pro is built for a steadier rhythm so you can keep learning even when your day is not perfect.",
      },
      {
        id: "devices",
        title: "Access on All Your Devices",
        body: "Your Bible journey stays connected across devices, so your progress, notes, and study flow are not trapped on one screen.",
      },
      {
        id: "progress",
        title: "Never Lose Your Progress",
        body: "Protect the momentum you just built. Your daily progress, streak, and Bible in One Year journey stay tied to your BibleBuddy account.",
      },
      {
        id: "tools",
        title: "Study Notes + Tools",
        body: "Unlock deeper study notes, stronger explanations, downloads, and focused tools that help you understand what you are reading instead of just checking off a task.",
      },
      {
        id: "personal",
        title: "Make It Your Own",
        body: "Shape BibleBuddy around the way you study with a more complete experience that feels personal, steady, and easier to come back to.",
      },
    ];

    function dismissDayThreePrompt(label: string) {
      void logDayThreeProPromptAction(ACTION_TYPE.upgrade_popup_dismissed, label);
      continueAfterDayThreeProPrompt();
    }

    return (
      <ModalShell
        isOpen={Boolean(prompt)}
        onClose={() => dismissDayThreePrompt("Bible in One Year Day 3 Pro upgrade popup closed")}
        backdropColor="bg-black/65"
        scrollable
        zIndex="z-[95]"
      >
        <div className="bb-skin-glow-card relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-[color-mix(in_srgb,var(--bb-accent,#4f8df7)_42%,var(--bb-card-border,#dbe7f4))] bg-[radial-gradient(circle_at_18%_0%,color-mix(in_srgb,var(--bb-accent,#4f8df7)_25%,transparent),transparent_42%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_98%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_86%,transparent))] p-5 text-left text-[var(--bb-text-primary,#111827)] shadow-[0_32px_90px_rgba(0,0,0,0.48),0_0_42px_color-mix(in_srgb,var(--bb-accent,#4f8df7)_24%,transparent)] backdrop-blur-xl sm:p-7">
          <button
            type="button"
            onClick={() => dismissDayThreePrompt("Bible in One Year Day 3 Pro upgrade popup closed")}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#4f8df7)_28%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_78%,transparent)] text-xl font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_62%,transparent)]"
            aria-label="Close Pro upgrade popup"
          >
            x
          </button>

          <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#4f8df7)_16%,transparent)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#4f8df7)]">
            Bible in One Year
          </div>
          <h2 className="mt-4 pr-10 text-3xl font-black leading-tight sm:text-4xl">
            Congratulations. You just finished Day 3.
          </h2>
          <p className="mt-3 text-base font-black leading-6 text-[var(--bb-text-primary,#111827)]">
            The habit of reading and understanding God's Word is starting to form.
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            This is the perfect time to protect your progress and go deeper in your Bible journey.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_70%,transparent)] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-text-secondary,#4b5563)]">Free</p>
              <p className="mt-2 text-lg font-black">Keep moving one day at a time.</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                Continue the Bible in One Year journey with your current daily flow.
              </p>
            </div>
            <div className="rounded-3xl border border-[color-mix(in_srgb,var(--bb-accent,#4f8df7)_42%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_64%,var(--bb-card,#ffffff))] p-4 shadow-[0_0_30px_color-mix(in_srgb,var(--bb-accent,#4f8df7)_18%,transparent)]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#4f8df7)]">Pro</p>
              <p className="mt-2 text-lg font-black">Protect the habit you are building.</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                Unlock deeper study tools, connected progress, and a more complete BibleBuddy experience.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            {sections.map((section) => {
              const isOpen = bibleYearDayThreeProOpenSection === section.id;
              return (
                <div
                  key={section.id}
                  className="overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#4f8df7)_22%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_78%,transparent)]"
                >
                  <button
                    type="button"
                    onClick={() => setBibleYearDayThreeProOpenSection(isOpen ? "" : section.id)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <span className="text-sm font-black text-[var(--bb-text-primary,#111827)]">{section.title}</span>
                    <span className="text-lg font-black text-[var(--bb-accent,#4f8df7)]" aria-hidden="true">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="border-t border-[color-mix(in_srgb,var(--bb-accent,#4f8df7)_16%,var(--bb-card-border,#dbe7f4))] px-4 pb-4 pt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                      {section.body}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() => {
                setBibleYearDayThreeProPrompt(null);
                openBibleYearQuickUpgrade("day3");
              }}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--bb-button,var(--bb-accent,#4f8df7))] px-5 py-4 text-base font-black text-[var(--bb-button-text,#ffffff)] shadow-[0_0_32px_color-mix(in_srgb,var(--bb-accent,#4f8df7)_32%,transparent)] transition hover:brightness-105"
            >
              Upgrade to BibleBuddy Pro
            </button>
            <button
              type="button"
              onClick={() => dismissDayThreePrompt("Bible in One Year Day 3 continued with free plan")}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_78%,transparent)] px-5 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
            >
              Continue with Free Plan
            </button>
          </div>
        </div>
      </ModalShell>
    );
  }

  function requestBibleYearVideoDownload(day: GenesisBibleYearDay, videoUrl: string | null | undefined) {
    if (!isPaidUser) {
      setBibleYearDownloadUpgradeOpen(true);
      return;
    }
    if (!videoUrl) return;
    setBibleYearDownloadPrompt({ dayNumber: day.dayNumber, title: day.title, videoUrl });
  }

  function confirmBibleYearVideoDownload() {
    if (!bibleYearDownloadPrompt || typeof document === "undefined") return;
    const anchor = document.createElement("a");
    anchor.href = bibleYearDownloadPrompt.videoUrl;
    anchor.download = `Bible-Buddy-Day-${bibleYearDownloadPrompt.dayNumber}-${bibleYearDownloadPrompt.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}.mp4`;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setBibleYearDownloadPrompt(null);
  }

  function formatBibleYearSpokenReference(block: BibleYearDailyLesson["sections"][number]["verseBlock"]) {
    if (block.startVerse === block.endVerse) return `Genesis ${block.chapter} verse ${block.startVerse}.`;
    return `Genesis ${block.chapter} verses ${block.startVerse} through ${block.endVerse}.`;
  }

  function getDayOneSpokenVerseLines(chapter: number, verseNumber: number) {
    const verse = BIBLE_YEAR_GENESIS_WEB_VERSES[chapter]?.find((item) => item.verse === verseNumber)?.text || "";

    if (chapter === 1) {
      switch (verseNumber) {
        case 3:
          return ["God said.", "Let there be light.", "And there was light."];
        case 6:
          return ["God said.", "Let there be an expanse in the middle of the waters, and let it divide the waters from the waters."];
        case 9:
          return ["God said.", "Let the waters under the sky be gathered together to one place, and let the dry land appear.", "And it was so."];
        case 11:
          return ["God said.", "Let the earth yield grass, herbs yielding seeds, and fruit trees bearing fruit after their kind, with their seeds in it, on the earth.", "And it was so."];
        case 14:
          return ["God said.", "Let there be lights in the expanse of the sky to divide the day from the night; and let them be for signs to mark seasons, days, and years."];
        case 15:
          return ["And let them be for lights in the expanse of the sky to give light on the earth.", "And it was so."];
        case 20:
          return ["God said.", "Let the waters abound with living creatures, and let birds fly above the earth in the open expanse of the sky."];
        case 22:
          return ["God blessed them, saying.", "Be fruitful, and multiply, and fill the waters in the seas, and let birds multiply on the earth."];
        case 24:
          return ["God said.", "Let the earth produce living creatures after their kind, livestock, creeping things, and animals of the earth after their kind.", "And it was so."];
        case 26:
          return ["God said.", "Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, over the birds of the sky, over the livestock, over all the earth, and over every creeping thing that creeps on the earth."];
        case 28:
          return ["God blessed them. God said to them.", "Be fruitful, multiply, fill the earth, and subdue it. Have dominion over the fish of the sea, over the birds of the sky, and over every living thing that moves on the earth."];
        case 29:
          return ["God said.", "Behold, I have given you every herb yielding seed, which is on the surface of all the earth, and every tree, which bears fruit yielding seed. It will be your food."];
        case 30:
          return ["To every animal of the earth, and to every bird of the sky, and to everything that creeps on the earth, in which there is life, I have given every green herb for food.", "And it was so."];
        default:
          return verse ? [verse] : [];
      }
    }

    if (chapter === 2) {
      switch (verseNumber) {
        case 16:
          return ["Yahweh God commanded the man, saying.", "You may freely eat of every tree of the garden."];
        case 17:
          return ["But you shall not eat of the tree of the knowledge of good and evil; for in the day that you eat of it, you will surely die."];
        case 18:
          return ["Yahweh God said.", "It is not good for the man to be alone. I will make him a helper comparable to him."];
        case 23:
          return ["The man said.", "This is now bone of my bones, and flesh of my flesh. She will be called woman, because she was taken out of Man."];
        default:
          return verse ? [verse] : [];
      }
    }

    return verse ? [verse] : [];
  }

  function getDayOneSpokenVerseCallouts(block: BibleYearDailyLesson["sections"][number]["verseBlock"]) {
    return Array.from(
      { length: block.endVerse - block.startVerse + 1 },
      (_, index) => block.startVerse + index,
    )
      .map((verseNumber) => {
        const lines = getDayOneSpokenVerseLines(block.chapter, verseNumber);
        if (!lines.length) return "";
        return `> **Genesis ${block.chapter}:${verseNumber}**\n>\n${lines.map((line) => `> ${line}`).join("\n>\n")}`;
      })
      .filter(Boolean)
      .join("\n\n");
  }

  function buildBibleYearSpokenScriptMarkdown(lesson: BibleYearDailyLesson) {
    const dayOneTeachingByReference: Record<string, string[]> = {
      "Genesis 1:1-5": [
        "Stay here for a second. Before anything exists, God is already there. He is not introduced like a character who walks onto the stage. He simply is.",
        "The earth is formless, empty, covered in darkness, and deep waters. But unfinished does not mean abandoned. God's Spirit is already hovering over the waters. Even before the world has shape, God's presence is near.",
        "Creation begins quietly, with a voice. God does not panic in darkness. He does not fight it. He speaks into it.",
        "Light enters the story before the sun and moon are ever named. Genesis is showing you that light does not ultimately come from created things. Light comes from God.",
        "Maybe you know what it feels like when life seems dark, unfinished, or hard to understand. Genesis starts here to remind you: darkness is not too much for God. Confusion is not stronger than His voice.",
      ],
      "Genesis 1:6-13": [
        "Now the world begins to take shape. Waters are separated. Sky opens. Seas gather. Dry ground appears.",
        "This is not random motion. This is God making room for life. Before He fills the world, He prepares the world.",
        "Then the earth starts to grow. Grass, plants, fruit trees, seeds. Life that can keep producing more life.",
        "Most things God grows start smaller than we expect. A seed is easy to overlook, but inside it is future provision, future fruit, future generations.",
      ],
      "Genesis 1:14-25": [
        "Now the sky fills with lights. Days can be counted. Seasons can be known. Years can be remembered.",
        "To the ancient world, the sun and moon were often treated like gods. Genesis quietly corrects that. They are not gods. They are lights in God's sky, serving the purpose He gives them.",
        "Then the waters move. The sky comes alive. Birds lift into the air. Sea creatures fill the deep. Animals begin moving across the land.",
        "The silence of the empty world is gone now. There is movement, sound, breath, rhythm, and life.",
      ],
      "Genesis 1:26-31": [
        "This is the moment the story has been building toward. Human beings are not accidents. You are not an accident.",
        "Before anyone measures your success, your beauty, your strength, your usefulness, or your past, Genesis says human worth starts with God.",
        "Male and female are both made in God's image. Both carry dignity. Both are blessed. Both are called into purpose.",
        "Dominion does not mean abuse. It means responsibility. Humanity is called to represent God's care inside God's creation.",
        "Before sin breaks anything, the world is blessed, ordered, alive, and full of purpose.",
      ],
      "Genesis 2:1-3": [
        "The story does not end with God rushing to the next thing. It ends with rest.",
        "God rests, not because He is tired, but because the work is complete. Creation has rhythm. Work and rest. Forming and filling. Speaking and delighting.",
        "The first thing called holy in the Bible is not a building. It is not an object. It is a day. Time with God is holy from the beginning.",
        "If your life feels like nonstop striving, Genesis gently pushes back. You were not created to hold everything together. Rest is trust. Rest is worship.",
      ],
      "Genesis 2:4-9": [
        "Now the camera moves closer. Genesis 1 gave us the wide view of creation. Genesis 2 brings us near enough to see dust, breath, garden, and relationship.",
        "God forms the man from the dust of the ground. That is humbling. We are not gods. We are creatures. We are connected to the earth.",
        "But then God breathes into him the breath of life. Humanity is dust touched by God. Fragile, but valuable. Humble, but alive with breath from the Creator.",
        "Then God plants a garden. Before there is a command, there is provision. Before there is a test, there is a home. Eden is beauty, safety, abundance, and peace.",
      ],
      "Genesis 2:10-17": [
        "The garden is full. Rivers flow. Precious materials are named. The world near God is supplied and alive.",
        "Then God gives the man work. That matters because work exists before sin. Meaningful responsibility is part of the good world.",
        "God also gives freedom before restriction. You may freely eat from every tree, except one.",
        "The story is not showing a stingy God. It is showing a generous God with a real boundary. The question is trust. Will humanity receive life from God, or try to define good and evil apart from Him?",
        "That question will carry us straight into the next day. But for now, feel the goodness of this moment. God gives life, place, food, work, freedom, and a clear word.",
      ],
      "Genesis 2:18-25": [
        "For the first time, God says something is not good. Not sin. Not rebellion. Aloneness.",
        "The man is surrounded by living creatures, but none of them correspond to him. None can meet him face to face as a true partner.",
        "So God causes a deep sleep to fall over the man, and He forms the woman. When the man sees her, the first human words recorded in Scripture are poetry.",
        "This is bone of my bones and flesh of my flesh. That is wonder. Recognition. Joy.",
        "And the chapter ends with a picture that almost feels hard to imagine now: naked and not ashamed. No hiding. No fear. No pretending. Fully known, fully safe, fully at peace.",
        "Before shame entered the story, there was peace.",
      ],
    };
    const dayOneDisplay: Record<string, { heading: string; teachingTitle: string; list?: string[] }> = {
      "Genesis 1:1-5": {
        heading: "ðŸŒŒ God Speaks Into the Beginning",
        teachingTitle: "ðŸ—£ï¸ God Is Already There",
        list: ["ðŸŒ‘ darkness is not too much for God", "ðŸ•Šï¸ God's Spirit is already near", "ðŸ’¡ light comes from His voice", "âš–ï¸ order begins with God speaking"],
      },
      "Genesis 1:6-13": {
        heading: "ðŸŒŠ God Forms a World That Can Hold Life",
        teachingTitle: "ðŸŒ God Makes Room for Life",
        list: ["ðŸŒŠ waters are separated", "â˜ï¸ sky opens", "ðŸŒ dry ground appears", "ðŸŒ± seeds carry future life"],
      },
      "Genesis 1:14-25": {
        heading: "âœ¨ God Fills the Sky, Waters, and Earth",
        teachingTitle: "ðŸ¦ Creation Comes Alive",
        list: ["â˜€ï¸ time has rhythm", "ðŸŒ™ lights serve God's purpose", "ðŸ‹ waters move with life", "ðŸ¦ birds fill the sky", "ðŸ¾ animals move across the land"],
      },
      "Genesis 1:26-31": {
        heading: "ðŸ‘¤ Humanity Is Made in God's Image",
        teachingTitle: "ðŸ‘‘ Human Life Has God-Given Worth",
        list: ["ðŸ‘¤ you are not an accident", "ðŸ’ male and female carry dignity", "ðŸŒ dominion means responsibility", "âœ¨ creation is very good"],
      },
      "Genesis 2:1-3": {
        heading: "ðŸ•Šï¸ God Rests and Makes Time Holy",
        teachingTitle: "ðŸ•¯ï¸ Rest Is Built Into Creation",
        list: ["âœ… the work is complete", "ðŸ“… time with God is holy", "ðŸ•Šï¸ rest is trust", "ðŸ™ rest is worship"],
      },
      "Genesis 2:4-9": {
        heading: "ðŸŒ¿ God Forms Humanity With Breath",
        teachingTitle: "ðŸŒ¬ï¸ Dust Touched by God",
        list: ["ðŸŒ humanity is formed from dust", "ðŸŒ¬ï¸ life comes from God's breath", "ðŸŒ³ Eden is prepared", "ðŸ¡ provision comes before the command"],
      },
      "Genesis 2:10-17": {
        heading: "ðŸ’§ Work, Freedom, and One Boundary",
        teachingTitle: "ðŸŽ The Question Is Trust",
        list: ["ðŸ’§ the garden is supplied", "ðŸ› ï¸ work is good before sin", "ðŸŒ³ freedom comes before restriction", "âš–ï¸ one boundary teaches trust"],
      },
      "Genesis 2:18-25": {
        heading: "ðŸ¤ God Creates Relationship",
        teachingTitle: "âœ¨ Fully Known and Not Ashamed",
        list: ["ðŸ¤ aloneness is not good", "ðŸ¾ animals are not enough", "ðŸ’ woman is formed for partnership", "âœ¨ no hiding, no fear, no shame"],
      },
    };
    const dayOneOpening = [
      "Hey. I am really glad you are here.",
      "Today is Day 1 of our journey through the Bible together.",
      "Before Abraham. Before Moses. Before David. Before Jesus. Before cities, war, pain, and shame. The story starts here.",
      "At the beginning.",
      "There was God.",
      "Today, we are stepping into the creation of the world. Not just to learn facts, but to walk through the opening scene of Scripture together.",
      "So take a breath. Let the noise settle for a moment. We are going back to the first page of the Bible.",
    ];
    const dayOneClosing = [
      "So this is where the Bible begins.",
      "Not with human achievement. Not with human failure. Not with a problem we have to solve.",
      "It begins with God creating, speaking, ordering, filling, blessing, resting, forming, breathing, planting, providing, and making room for relationship.",
      "This matters because the rest of the Bible is going to show us what happens when that good world is broken, and how far God will go to restore what was lost.",
      "But before we talk about the fall, before shame, hiding, violence, exile, covenant, sacrifice, kings, prophets, and redemption, you need to see the design.",
      "You were made by God. You were made in God's image. You were made for life with Him.",
      "And if you carry nothing else from Day 1, carry this: God is not afraid of darkness, emptiness, or disorder. He knows how to speak light into places that feel impossible.",
      "Tomorrow, we step into Genesis 3 and 4. The peace of Eden will be tested. Trust will break. Shame will enter. But even there, God will not disappear.",
      "For now, rest in the beginning.",
      "The world was made good.",
      "And you were made on purpose.",
    ];
    const dayTwoDisplay: Record<string, { heading: string; teachingTitle: string; list?: string[] }> = {
      "Genesis 3:1-5": {
        heading: "ðŸ The Lie Enters the Garden",
        teachingTitle: "ðŸ Has God Really Said?",
        list: ["ðŸŒ³ every tree was provision", "ðŸŽ one tree was boundary", "ðŸ the serpent made God sound restrictive", "ðŸ§  the lie was about trust"],
      },
      "Genesis 3:6-7": {
        heading: "ðŸ‘€ Shame Enters the Story",
        teachingTitle: "ðŸŽ Sin Looks Good Before It Hurts",
        list: ["ðŸƒ fig leaves", "ðŸ˜” shame", "ðŸ‘€ opened eyes", "ðŸ’” broken trust"],
      },
      "Genesis 3:8-13": {
        heading: "ðŸŒ³ God Comes Looking",
        teachingTitle: "â“ Where Are You?",
        list: ["ðŸ˜¨ fear enters", "ðŸŒ³ hiding begins", "ðŸ‘‰ blame spreads", "ðŸ’” relationship breaks"],
      },
      "Genesis 3:14-19": {
        heading: "âš–ï¸ Judgment and the First Promise",
        teachingTitle: "ðŸŒ± The First Gospel Promise",
        list: ["ðŸŒ¾ work becomes painful", "ðŸŒµ thorns grow", "ðŸ˜” relationships strain", "âš°ï¸ dust returns to dust", "ðŸŒ± promise still lives"],
      },
      "Genesis 3:20-24": {
        list: ["ðŸ§¥ God covers shame", "ðŸŒ³ Eden is guarded", "ðŸ”¥ the way back is blocked", "ðŸŒ± hope still moves forward"],
        heading: "ðŸ§¥ Mercy Outside Eden",
        teachingTitle: "ðŸ§¥ God Covers Them",
      },
      "Genesis 4:1-7": {
        heading: "ðŸ‘¶ Sin Moves Into the Family",
        teachingTitle: "ðŸ˜  Sin Crouches at the Door",
        list: ["ðŸ˜  anger", "ðŸ˜’ jealousy", "ðŸšª sin at the door", "âš ï¸ warning before destruction"],
      },
      "Genesis 4:8-16": {
        list: ["ðŸ©¸ blood cries", "ðŸŒ the ground witnesses", "ðŸš¶ Cain becomes a wanderer", "âš–ï¸ judgment comes", "ðŸ›¡ï¸ mercy still limits revenge"],
        heading: "ðŸ©¸ The First Murder",
        teachingTitle: "ðŸ©¸ Blood Cries From the Ground",
      },
      "Genesis 4:17-24": {
        heading: "ðŸ™ï¸ A Broken World Still Builds",
        teachingTitle: "ðŸ™ï¸ Culture and Corruption",
        list: ["ðŸ™ï¸ city", "ðŸŽ¶ music", "ðŸ”¨ tools", "ðŸ’” pride", "ðŸ©¸ violence"],
      },
      "Genesis 4:25-26": {
        list: ["ðŸŒ± another child", "ðŸ™ people call on Yahweh", "ðŸ•¯ï¸ hope continues", "âœï¸ the promise keeps moving"],
        heading: "ðŸŒ± Hope Keeps Moving",
        teachingTitle: "ðŸŒ± Another Seed",
      },
    };
    const dayThreeDisplay: Record<string, { heading: string; teachingTitle: string; list?: string[] }> = {
      "Genesis 5:1-5": {
        heading: "ðŸ§¬ Death Moves Through the Generations",
        teachingTitle: "ðŸ§¬ Still Made in God's Image",
        list: ["ðŸ§¬ made in God's image", "ðŸ‘¶ family line continues", "â³ long life is still temporary", "âš°ï¸ death has entered the story"],
      },
      "Genesis 5:6-20": {
        heading: "â³ The Same Sentence Keeps Falling",
        teachingTitle: "ðŸ”” The Bell of Death",
        list: ["ðŸ“œ names are remembered", "ðŸ‘¶ children are born", "âš°ï¸ death keeps repeating", "ðŸŒ± hope still moves through the family line"],
      },
      "Genesis 5:21-24": {
        heading: "ðŸš¶ Enoch Walked With God",
        teachingTitle: "ðŸš¶ A Different Ending",
        list: ["ðŸš¶ walking with God", "ðŸ•Šï¸ closeness with God", "ðŸŒ‘ faith in a dark world", "âœ¨ a different ending"],
      },
      "Genesis 5:25-32": {
        heading: "ðŸ‘¶ Noah Is Born Into a Tired World",
        teachingTitle: "ðŸ˜®â€ðŸ’¨ A World Looking for Relief",
        list: ["ðŸ˜®â€ðŸ’¨ tired world", "ðŸŒ¾ painful work", "ðŸŒ cursed ground", "ðŸ‘¶ Noah brings hope", "ðŸ›Ÿ God prepares preservation"],
      },
      "Genesis 6:1-8": {
        heading: "ðŸŒ‘ The Earth Becomes Corrupt",
        teachingTitle: "ðŸŒ‘ Corruption Reaches the Heart",
        list: ["ðŸŒ‘ corruption spreads", "ðŸ§  the heart turns evil", "ðŸ’” God grieves", "âš–ï¸ judgment is coming", "ðŸ›Ÿ Noah finds favor"],
      },
      "Genesis 6:9-13": {
        heading: "ðŸš¶ Noah Walked With God",
        teachingTitle: "ðŸ›¡ï¸ Different From His Generation",
        list: ["ðŸš¶ Noah walked with God", "ðŸŒ the world was corrupt", "ðŸ©¸ violence filled the earth", "ðŸ›¡ï¸ Noah lived differently", "ðŸ™ obedience starts with walking close"],
      },
      "Genesis 6:14-22": {
        heading: "ðŸ› ï¸ God Commands the Ark",
        teachingTitle: "ðŸ› ï¸ Faith Becomes Construction",
        list: ["ðŸ› ï¸ faith became work", "ðŸ“ obedience had details", "ðŸšª the ship had one door", "ðŸ›Ÿ God provided refuge", "âœ… Noah did what God commanded"],
      },
      "Genesis 7:1-10": {
        heading: "ðŸšª Come Into the Ark",
        teachingTitle: "ðŸšª The Place of Refuge",
        list: ["ðŸšª God calls Noah in", "ðŸ‘¨â€ðŸ‘©â€ðŸ‘¦ family enters together", "ðŸ˜ animals are preserved", "â³ seven days of waiting", "ðŸŒ§ï¸ judgment is near"],
      },
      "Genesis 7:11-16": {
        heading: "ðŸŒ§ï¸ The Flood Begins",
        teachingTitle: "ðŸŒ§ï¸ Creation Boundaries Break Open",
        list: ["ðŸŒ§ï¸ rain falls", "ðŸŒŠ the deep opens", "ðŸšª the door closes", "ðŸ›Ÿ God secures Noah", "âš–ï¸ judgment begins"],
      },
      "Genesis 7:17-24": {
        heading: "ðŸŒŠ The Waters Prevail",
        teachingTitle: "ðŸŒŠ The Same Water Judges and Carries",
        list: ["ðŸŒŠ waters rise", "â›°ï¸ mountains are covered", "âš–ï¸ judgment is real", "ðŸ›Ÿ the ark is lifted", "ðŸŒ± life is preserved"],
      },
    };

    const dayFourDisplay: Record<string, { heading: string; teachingTitle: string; list?: string[] }> = {
      "Genesis 8:1-5": {
        heading: "ðŸŒ¬ï¸ God Remembers Noah",
        teachingTitle: "ðŸŒˆ Mercy Begins to Move",
        list: ["ðŸ•Šï¸ God remembers Noah", "ðŸŒ¬ï¸ wind passes over the earth", "ðŸŒŠ waters begin to go down", "â›°ï¸ the ark rests", "ðŸŒ± hope returns in stages"],
      },
      "Genesis 8:6-12": {
        heading: "ðŸ•Šï¸ The Raven, the Dove, and the Olive Leaf",
        teachingTitle: "ðŸŒ¿ The First Sign of Life",
        list: ["ðŸªŸ Noah opens the window", "ðŸ¦ the raven goes out", "ðŸ•Šï¸ the dove searches for rest", "ðŸŒ¿ the olive leaf appears", "â³ Noah keeps waiting"],
      },
      "Genesis 8:13-19": {
        heading: "ðŸšª God Says Go Forth",
        teachingTitle: "ðŸš¶ Rescue Becomes Responsibility",
        list: ["ðŸŒ the ground is dry", "ðŸ—£ï¸ God speaks again", "ðŸšª Noah leaves the ark", "ðŸ¾ animals go out by kind", "ðŸŒ± life begins again"],
      },
      "Genesis 8:20-22": {
        heading: "ðŸ”¥ Worship After Rescue",
        teachingTitle: "ðŸ™ The First Act Is Worship",
        list: ["ðŸ”¥ Noah builds an altar", "ðŸ‘ clean animals are offered", "ðŸ™ rescue becomes worship", "ðŸŒ¾ seedtime and harvest continue", "â˜€ï¸ day and night shall not cease"],
      },
      "Genesis 9:1-7": {
        heading: "ðŸ©¸ Blessing, Blood, and Human Dignity",
        teachingTitle: "ðŸ‘¤ The Image of God Still Matters",
        list: ["ðŸ™Œ God blesses Noah", "ðŸŒ fill the earth", "ðŸ©¸ blood represents life", "ðŸ‘¤ people bear God's image", "âš–ï¸ violence is not normal"],
      },
      "Genesis 9:8-17": {
        heading: "ðŸŒˆ The Rainbow Covenant",
        teachingTitle: "â˜ï¸ Mercy in the Clouds",
        list: ["ðŸ¤ God establishes covenant", "ðŸ¾ every living creature is included", "ðŸŒˆ the bow is the sign", "â˜ï¸ clouds carry promise", "ðŸ•Šï¸ God remembers mercy"],
      },
      "Genesis 9:18-29": {
        heading: "ðŸ‡ Noah's Failure After the Flood",
        teachingTitle: "ðŸ§¥ Rescued People Still Need Grace",
        list: ["ðŸ‡ Noah plants a vineyard", "ðŸ˜” drunkenness brings shame", "ðŸ‘€ Ham exposes", "ðŸ§¥ Shem and Japheth cover", "âš°ï¸ Noah still dies"],
      },
      "Genesis 10:1-5": {
        heading: "ðŸ—ºï¸ The Nations After the Flood",
        teachingTitle: "ðŸŒ Families Become Peoples",
        list: ["ðŸ‘¨â€ðŸ‘¦ Noah's sons have sons", "ðŸ—ºï¸ lands are named", "ðŸ—£ï¸ tongues are named", "ðŸ˜ï¸ families spread", "ðŸŒ nations begin to form"],
      },
      "Genesis 10:6-20": {
        heading: "ðŸ™ï¸ Ham, Nimrod, and Early Kingdoms",
        teachingTitle: "ðŸ‘‘ Power Rises Again",
        list: ["ðŸ›ï¸ Egypt and Canaan appear", "ðŸ‘‘ Nimrod becomes mighty", "ðŸ™ï¸ Babel is named", "ðŸ° kingdoms begin", "âš ï¸ pride is already near"],
      },
      "Genesis 10:21-32": {
        heading: "ðŸŒ± Shem and the Line Toward Promise",
        teachingTitle: "ðŸ§µ The Story Moves Toward Abram",
        list: ["ðŸŒ± Shem's line continues", "ðŸ§µ Eber is highlighted", "ðŸŒ the earth is divided", "ðŸ—£ï¸ nations spread", "âœ¨ promise is getting closer"],
      },
    };
    const dayFiveDisplay: Record<string, { heading: string; teachingTitle: string; list?: string[] }> = {
      "Genesis 11:1-9": {
        heading: "ðŸ™ï¸ Babel Tries to Make a Name",
        teachingTitle: "ðŸ§± Pride Builds Without Trust",
        list: ["ðŸ§± bricks are made", "ðŸ™ï¸ a city rises", "ðŸ—¼ a tower reaches upward", "ðŸ‘‘ people seek a name", "ðŸŒ God scatters pride"],
      },
      "Genesis 11:10-32": {
        heading: "ðŸ§¬ The Story Narrows Toward Abram",
        teachingTitle: "ðŸ›¤ï¸ An Unfinished Road",
        list: ["ðŸ§¬ Shem's line continues", "ðŸ‘¤ Abram appears", "ðŸ’” Sarai is barren", "ðŸ›¤ï¸ the family moves toward Canaan", "â¸ï¸ the journey stops in Haran"],
      },
      "Genesis 12:1-3": {
        heading: "ðŸ“£ God Calls Abram",
        teachingTitle: "âœ¨ Promise Before the Map",
        list: ["ðŸ“£ God speaks", "ðŸ  Abram must leave", "ðŸŒ land is promised", "ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦ nation is promised", "âœ¨ all families will be blessed"],
      },
      "Genesis 12:4-9": {
        heading: "ðŸš¶ Abram Goes",
        teachingTitle: "â›º Obedience Starts Moving",
        list: ["ðŸš¶ Abram departs", "ðŸ‘¨â€ðŸ‘©â€ðŸ‘§ family comes with him", "â›º he enters Canaan", "ðŸ”¥ he builds altars", "ðŸ™ he calls on the LORD"],
      },
      "Genesis 12:10-20": {
        heading: "ðŸŒ¾ Fear Takes Abram to Egypt",
        teachingTitle: "ðŸ˜Ÿ Faith Still Needs Formation",
        list: ["ðŸŒ¾ famine comes", "ðŸ‡ªðŸ‡¬ Abram goes to Egypt", "ðŸ˜Ÿ fear takes over", "ðŸ‘‘ Sarai is taken", "ðŸ›¡ï¸ God protects the promise"],
      },
      "Genesis 13:1-7": {
        heading: "ðŸ”¥ Abram Returns to the Altar",
        teachingTitle: "ðŸ” Back to Worship",
        list: ["ðŸ‡ªðŸ‡¬ Abram leaves Egypt", "ðŸ”¥ he returns to the altar", "ðŸ‘ flocks increase", "âš ï¸ strife begins", "ðŸŒ the land feels crowded"],
      },
      "Genesis 13:8-13": {
        heading: "ðŸ‘€ Lot Chooses by Sight",
        teachingTitle: "ðŸ¤ Faith Does Not Have to Grab",
        list: ["ðŸ¤ Abram chooses peace", "ðŸ‘€ Lot looks outward", "ðŸŒ¿ the plain looks good", "ðŸ™ï¸ Lot moves toward Sodom", "âš ï¸ beauty can hide danger"],
      },
      "Genesis 13:14-18": {
        heading: "ðŸŒ„ God Repeats the Promise",
        teachingTitle: "ðŸŒ± Abram Receives What God Gives",
        list: ["ðŸŒ„ Abram lifts his eyes", "ðŸŒ land is promised", "ðŸŒ± descendants are promised", "ðŸš¶ Abram walks by faith", "ðŸ”¥ another altar is built"],
      },
    };
    const daySixDisplay: Record<string, { heading: string; teachingTitle: string; list?: string[] }> = {
      "Genesis 14:1-12": {
        heading: "âš”ï¸ War Reaches Lot",
        teachingTitle: "ðŸ™ï¸ Lot's Direction Becomes Dangerous",
        list: ["ðŸ‘‘ kings go to war", "ðŸ™ï¸ Sodom is pulled in", "â›“ï¸ Lot is captured", "ðŸ“¦ goods are taken", "âš ï¸ choices have consequences"],
      },
      "Genesis 14:13-16": {
        heading: "ðŸ›¡ï¸ Abram Rescues Lot",
        teachingTitle: "ðŸ’ª Faith Moves Toward Rescue",
        list: ["ðŸ“£ Abram hears", "ðŸ›¡ï¸ trained servants gather", "ðŸŒ™ night pursuit begins", "â›“ï¸ captives are freed", "ðŸ¤ Lot is brought back"],
      },
      "Genesis 14:17-20": {
        heading: "ðŸž Melchizedek Blesses Abram",
        teachingTitle: "ðŸ™Œ Victory Belongs to God Most High",
        list: ["ðŸž bread and wine appear", "ðŸ‘‘ Melchizedek blesses Abram", "ðŸ™Œ God Most High is praised", "ðŸ›¡ï¸ God delivered the victory", "ðŸ”Ÿ Abram gives a tenth"],
      },
      "Genesis 14:21-24": {
        heading: "ðŸš« Abram Refuses Sodom's Reward",
        teachingTitle: "ðŸ§­ Discernment After Victory",
        list: ["ðŸ™ï¸ Sodom offers goods", "âœ‹ Abram refuses", "ðŸ™Œ God gets the credit", "ðŸ§µ not even a thread is taken", "ðŸ§­ blessing must stay clean"],
      },
      "Genesis 15:1-6": {
        heading: "âœ¨ God Speaks to Abram's Fear",
        teachingTitle: "ðŸŒŒ Faith Under the Stars",
        list: ["ðŸ›¡ï¸ God is Abram's shield", "ðŸ’¬ Abram is honest", "ðŸ‘¶ the heir is promised", "ðŸŒŒ stars fill the sky", "âœ… Abram believes"],
      },
      "Genesis 15:7-11": {
        heading: "ðŸ•Šï¸ Abram Asks for Assurance",
        teachingTitle: "ðŸ¤ God Meets Honest Questions",
        list: ["ðŸœï¸ God remembers Ur", "â“ Abram asks how", "ðŸ covenant pieces are prepared", "ðŸ•Šï¸ birds come down", "â³ Abram waits"],
      },
      "Genesis 15:12-16": {
        heading: "ðŸŒ‘ God Tells Abram the Long Road",
        teachingTitle: "â³ Promise Does Not Mean Instant",
        list: ["ðŸŒ‘ darkness falls", "â›“ï¸ affliction is foretold", "âš–ï¸ God will judge", "ðŸš¶ descendants will return", "ðŸ•Šï¸ Abram will die in peace"],
      },
      "Genesis 15:17-21": {
        heading: "ðŸ”¥ God Makes Covenant",
        teachingTitle: "ðŸ”¥ God Carries the Promise",
        list: ["ðŸŒ‘ night comes", "ðŸ”¥ fire passes through", "ðŸ¤ covenant is made", "ðŸŒ land is promised", "ðŸ™Œ God binds Himself to His word"],
      },
    };
    const daySevenDisplay: Record<string, { heading: string; teachingTitle: string; list?: string[] }> = {
      "Genesis 16:1-3": {
        heading: "âš ï¸ Sarai Tries to Force the Promise",
        teachingTitle: "â³ Waiting Turns Into Control",
        list: ["ðŸ’” Sarai has no child", "ðŸ‘¤ Hagar is brought in", "â³ the promise feels delayed", "âš ï¸ control replaces trust", "ðŸ  the household is wounded"],
      },
      "Genesis 16:4-6": {
        heading: "ðŸ’” Hagar Is Mistreated",
        teachingTitle: "ðŸ•¯ï¸ Shortcuts Create Pain",
        list: ["ðŸ‘¶ Hagar conceives", "ðŸ’” contempt grows", "ðŸ˜  Sarai blames Abram", "ðŸšª Hagar flees", "âš ï¸ everyone is wounded"],
      },
      "Genesis 16:7-12": {
        heading: "ðŸ•Šï¸ God Finds Hagar",
        teachingTitle: "ðŸ‘€ God Sees the One Who Runs",
        list: ["ðŸœï¸ Hagar is in the wilderness", "ðŸ•Šï¸ the angel finds her", "ðŸ‘‚ God hears affliction", "ðŸ‘¶ Ishmael is named", "ðŸŒ± her future is spoken"],
      },
      "Genesis 16:13-16": {
        heading: "ðŸ‘€ The God Who Sees",
        teachingTitle: "ðŸ›Ÿ Seen in the Wilderness",
        list: ["ðŸ‘€ Hagar names God", "ðŸ’§ the well is remembered", "ðŸ‘¶ Ishmael is born", "â³ Abram is eighty-six", "ðŸ•Šï¸ God sees the wounded"],
      },
      "Genesis 17:1-8": {
        heading: "ðŸªª Abram Becomes Abraham",
        teachingTitle: "âœ¨ God Names the Future",
        list: ["â³ thirteen years pass", "ðŸ™‡ Abram falls down", "ðŸªª Abram gets a new name", "ðŸŒ nations are promised", "ðŸ¤ covenant is established"],
      },
      "Genesis 17:9-14": {
        heading: "âœ‚ï¸ The Covenant Sign",
        teachingTitle: "ðŸ¤ Promise Marked in the Flesh",
        list: ["ðŸ¤ covenant is kept", "âœ‚ï¸ circumcision is the sign", "ðŸ‘¶ eight days old is named", "ðŸ  the whole house is included", "âš ï¸ covenant is serious"],
      },
      "Genesis 17:15-22": {
        heading: "ðŸ‘‘ Sarah and Isaac Are Named",
        teachingTitle: "ðŸ˜‚ Laughter Meets Promise",
        list: ["ðŸªª Sarai becomes Sarah", "ðŸ‘¶ Isaac is promised", "ðŸ˜‚ Abraham laughs", "ðŸ™ Ishmael is blessed", "ðŸŽ¯ covenant goes through Isaac"],
      },
      "Genesis 17:23-27": {
        heading: "âœ… Abraham Obeys That Same Day",
        teachingTitle: "ðŸš¶ Covenant Faith Responds",
        list: ["âœ… Abraham obeys", "ðŸ‘¦ Ishmael is included", "ðŸ  the household follows", "ðŸ“… obedience happens that day", "ðŸ¤ promise becomes marked"],
      },
    };
    const dayEightDisplay: Record<string, { heading: string; teachingTitle: string; list?: string[] }> = {
      "Genesis 18:1-8": {
        heading: "ðŸ•ï¸ Abraham Welcomes the Visitors",
        teachingTitle: "ðŸ¤² Holy Attention at the Tent",
        list: ["ðŸ•ï¸ Abraham sits by the tent", "ðŸ‘€ three visitors appear", "ðŸƒ Abraham runs to welcome them", "ðŸž a meal is prepared", "âœ¨ promise comes near"],
      },
      "Genesis 18:9-15": {
        heading: "ðŸ˜‚ Sarah Hears the Promise",
        teachingTitle: "â“ Is Anything Too Hard for the LORD?",
        list: ["ðŸ‘‚ Sarah hears from the tent", "ðŸ˜‚ she laughs within herself", "â³ the promise has felt impossible", "â“ God asks the central question", "ðŸ‘¶ Isaac is still coming"],
      },
      "Genesis 18:16-21": {
        heading: "ðŸŒ† The Lord Looks Toward Sodom",
        teachingTitle: "âš–ï¸ God Sees What Is Grievous",
        list: ["ðŸŒ† Sodom comes into view", "ðŸ¤ Abraham is brought near", "ðŸ“£ the cry is great", "âš–ï¸ sin is grievous", "ðŸ‘ï¸ God judges with knowledge"],
      },
      "Genesis 18:22-33": {
        heading: "ðŸ™ Abraham Intercedes",
        teachingTitle: "âš–ï¸ Shall Not the Judge Do Right?",
        list: ["ðŸ™ Abraham draws near", "âš–ï¸ he asks about justice", "ðŸ”¢ fifty becomes ten", "ðŸ•Šï¸ mercy is sought", "ðŸ™‡ prayer stays humble"],
      },
      "Genesis 19:1-11": {
        heading: "ðŸŒƒ Sodom's Violence Is Exposed",
        teachingTitle: "ðŸšª A City Shows Its Heart",
        list: ["ðŸŒƒ angels enter Sodom", "ðŸšª Lot brings them inside", "âš ï¸ the city gathers", "ðŸ›¡ï¸ the visitors protect Lot", "ðŸ‘ï¸ blindness falls at the door"],
      },
      "Genesis 19:12-22": {
        heading: "ðŸ¤² Mercy Pulls Lot Out",
        teachingTitle: "ðŸƒ Do Not Linger in Judgment",
        list: ["ðŸ“£ Lot warns his family", "ðŸ˜¶ they think he is joking", "â³ Lot lingers", "ðŸ¤² mercy takes his hand", "ðŸƒ escape is commanded"],
      },
      "Genesis 19:23-29": {
        heading: "ðŸ”¥ Sodom and Gomorrah Fall",
        teachingTitle: "âš–ï¸ Judgment and Mercy Are Both Real",
        list: ["â˜€ï¸ Lot reaches Zoar", "ðŸ”¥ fire falls", "ðŸ§‚ Lot's wife looks back", "ðŸŒ«ï¸ smoke rises", "ðŸ¤² God remembers Abraham"],
      },
      "Genesis 19:30-38": {
        heading: "ðŸ’” Lot's Family After Sodom",
        teachingTitle: "ðŸšï¸ Rescue Does Not Erase Damage",
        list: ["â›°ï¸ Lot hides in a cave", "ðŸ’” fear remains", "ðŸ· sin continues", "ðŸ‘¶ Moab and Ammon begin", "âš ï¸ compromise leaves scars"],
      },
    };

    const sectionBlocks = lesson.sections
      .map((section) => {
        const display = lesson.dayNumber === 1
          ? dayOneDisplay[section.verseBlock.reference]
          : lesson.dayNumber === 2
            ? dayTwoDisplay[section.verseBlock.reference]
            : lesson.dayNumber === 3
              ? dayThreeDisplay[section.verseBlock.reference]
              : lesson.dayNumber === 4
                ? dayFourDisplay[section.verseBlock.reference]
                : lesson.dayNumber === 5
                  ? dayFiveDisplay[section.verseBlock.reference]
                  : lesson.dayNumber === 6
                    ? daySixDisplay[section.verseBlock.reference]
                    : lesson.dayNumber === 7
                      ? daySevenDisplay[section.verseBlock.reference]
                      : lesson.dayNumber === 8
                        ? dayEightDisplay[section.verseBlock.reference]
                        : null;
        const scripture = lesson.dayNumber === 1
          ? getDayOneSpokenVerseCallouts(section.verseBlock)
          : getBibleYearLessonVerses(section.verseBlock)
              .map((verse) => `> **Genesis ${section.verseBlock.chapter}:${verse.verse}**\n>\n> ${verse.text}`)
              .join("\n\n");
        const list = lesson.dayNumber > 2 && display?.list?.length ? `\n\n${display.list.join("\n")}` : "";
        const spokenTeaching =
          lesson.dayNumber === 1
            ? dayOneTeachingByReference[section.verseBlock.reference] || section.teaching
            : section.teaching;

        return `# ${display?.heading || section.heading}

## ${section.verseBlock.reference}

${scripture}

### ${display?.teachingTitle || section.heading}

${spokenTeaching.join("\n\n")}${list}`;
      })
      .join("\n\n");
    const opening = lesson.dayNumber === 1 ? dayOneOpening : [`Welcome to Day ${lesson.dayNumber} of the Bible In One Year journey: ${lesson.title}.`, ...lesson.opening];
    const closing = lesson.dayNumber === 1 ? dayOneClosing : lesson.closing;

    const titleBlock = lesson.dayNumber === 1 ? `# ${lesson.title}` : `# ${lesson.title}

# Day ${lesson.dayNumber} of the Bible In One Year Plan`;

    return `${titleBlock}

${opening.join("\n\n")}

${sectionBlocks}

# Final Thoughts

${closing.join("\n\n")}`;
  }

  function buildBibleYearLessonMarkdown(lesson: BibleYearDailyLesson) {
    const teachingByReference: Record<string, string> = {
      "Genesis 1:1-5": `### ðŸŒŒ God Is Before Creation

The story starts with God already there.

Not created.

Not explained.

Not fighting for control.

Just God, Creator over everything.

### ðŸŒ The Heavens and the Earth

This means the whole created order.

ðŸŒŒ everything above

ðŸŒ everything below

ðŸ‘ï¸ everything visible

ðŸ™ everything humans will live inside

The first verse puts everything under God's authority.

### ðŸŒŠ Formless and Empty

The earth is unshaped, unfilled, dark, and watery.

But unfinished does not mean abandoned.

Before the world looks complete, God's Spirit is already near.

### ðŸ—£ï¸ God Speaks Light

God says, "Let there be light," and light comes.

He does not fight the darkness.

He speaks, and creation responds.

Light appears before the sun and moon, so light comes from God, not from a sun god.

### âš–ï¸ God Brings Order

God separates light from darkness and names Day and Night.

Naming shows authority.

Separation shows order.

God is putting things where they belong.`,
      "Genesis 1:6-13": `### ðŸŒŠ Waters Are Given Boundaries

To ancient readers, deep waters could feel like danger and chaos.

Here, the waters do not rule themselves.

God gives them boundaries.

### ðŸŒ Dry Land Appears

God gathers the seas and lets dry land appear.

The world is becoming livable.

Life needs a place, so God prepares a place.

### ðŸŒ± Life Begins to Grow

Plants, trees, fruit, and seeds fill the earth.

The seed detail matters because God creates life that can keep producing life.

ðŸŒ± life can multiply

ðŸŽ food can be provided

ðŸŒ the earth can sustain creatures

â³ one generation can lead to another`,
      "Genesis 1:14-25": `### â˜€ï¸ The Lights Serve God's Order

The sun and moon are not gods.

They are lights in God's sky.

### ðŸ“… Time Has Rhythm

The lights mark days, seasons, and years.

God is making a world humans can live in, work in, rest in, and worship in.

ðŸ“… seasons for planting and harvesting

ðŸŒ™ days and nights for work and rest

â³ years for memory and history

ðŸ™ appointed times for worship

### ðŸ‹ The Waters, Sky, and Land Are Filled

God fills the waters, sky, and land with life.

Creation is no longer empty.

It is full, alive, layered, and blessed.`,
      "Genesis 1:26-31": `### ðŸ‘¤ Humans Reflect God

This is the high point of creation.

Human beings are made in God's image.

People are not accidents and not disposable.

### ðŸ’ Male and Female Share That Dignity

Male and female are both created in God's image.

Human worth is not based on power, gender, money, beauty, success, or strength.

Every person matters because every person is made by God.

### ðŸ‘‘ Dominion Means Stewardship

Dominion does not mean abuse.

It means responsibility.

Humans are called to care for God's world under God's authority.

ðŸ‘¤ every person has dignity

ðŸ‘‘ every person has responsibility

ðŸŒ creation is entrusted to human care

âœ¨ life is meant to reflect God's goodness

### âœ¨ Creation Is Very Good

Before sin enters the story, creation is good, human life is good, and God's purpose for the world is good.`,
      "Genesis 2:1-3": `### âœ… Creation Is Complete

God does not leave creation half done.

What He made has order, purpose, and goodness.

### ðŸ•Šï¸ God Rests

God rests because the work is complete.

Rest is built into creation before sin enters the world.

### ðŸ“… The Seventh Day Is Blessed

God sets the seventh day apart.

From the beginning, time with God can be holy.

ðŸ“… time can be set apart

ðŸ•Šï¸ rest belongs in human life

ðŸ™ worship grows from God's finished work

âœ¨ creation has rhythm, not endless striving`,
      "Genesis 2:4-9": `### ðŸŒ¿ The Story Moves Closer

The lesson slows down and focuses on human life with God.

### ðŸŒ Man Is Formed From Dust

God forms man from the dust.

That is humbling.

We are not gods.

We are physical, dependent, and connected to God's world.

### ðŸŒ¬ï¸ God Gives the Breath of Life

But humanity is not only dust.

God breathes life into the man.

We are dust touched by God: humble, valuable, and dependent.

### ðŸŒ³ Eden Is Prepared

God plants a garden and places the man there.

He prepares a home before He gives a command.

Eden is a picture of provision, beauty, purpose, and peace.`,
      "Genesis 2:10-17": `### ðŸ’§ Rivers Flow From Eden

The garden is abundance.

Water flows.

Precious materials are named.

Life near God is supplied.

### ðŸ› ï¸ Work Is Good

God gives the man work before sin enters the world.

So work itself is not the curse.

Meaningful responsibility is part of God's good design.

### ðŸŒ³ Freedom Comes First

God says the man may freely eat from every tree except one.

God gives abundance, then sets one boundary.

### âš–ï¸ The Command Teaches Trust

The tree introduces choice and trust.

Will humanity trust God's word about life and death?

ðŸŽ provision is generous

ðŸŒ³ boundaries are real

âš–ï¸ obedience matters

ðŸ™ trust is part of life with God`,
      "Genesis 2:18-25": `### ðŸ¤ The First Not Good

For the first time, God says something is not good.

Sin has not entered yet.

The problem is aloneness.

### ðŸ„ The Animals Are Named

The man names the animals, showing responsibility.

But none of them can answer his loneliness.

None is a suitable helper.

### ðŸ§© A Helper Fit for Him

Helper does not mean weak or lesser.

The point is partnership, not inferiority.

The man needs someone who corresponds to him.

### ðŸ’ Woman Is Made From Man

God makes woman from the man's side and brings her to him.

The man's response is joy: bone of my bones and flesh of my flesh.

### ðŸ§¬ One Flesh

Marriage is pictured as covenant closeness, loyalty, and shared life.

### âœ¨ No Shame Yet

The man and woman are naked and not ashamed.

No hiding.

No fear.

No guilt.

No pretending.

ðŸ‘¤ fully known

ðŸ¤ fully welcomed

ðŸ’ joined in covenant love

âœ¨ not yet covered by shame`,
    };

    if (lesson.dayNumber === 1 || lesson.dayNumber === 2 || lesson.dayNumber === 3 || lesson.dayNumber === 4 || lesson.dayNumber === 5 || lesson.dayNumber === 6 || lesson.dayNumber === 7 || lesson.dayNumber === 8) {
      return buildBibleYearSpokenScriptMarkdown(lesson);
    }

    const verseBlocks = lesson.sections
      .map((section) => {
        const verses = getBibleYearLessonVerses(section.verseBlock)
          .map((verse) => `> **${section.verseBlock.chapter}:${verse.verse}** ${verse.text}`)
          .join("\n\n");

        const customTeaching = lesson.dayNumber === 1 ? teachingByReference[section.verseBlock.reference] : null;

        return `# ${section.heading}

## ${section.verseBlock.reference}

${verses}

${customTeaching || section.teaching.join("\n\n")}`;
      })
      .join("\n\n");

    if (lesson.dayNumber !== 1) {
      return `# ${lesson.title}

# Day ${lesson.dayNumber} of the Bible In One Year Plan

${lesson.opening.join("\n\n")}

${verseBlocks}

# Final Thoughts

${lesson.closing.join("\n\n")}`;
    }

    return `# The Creation of the World

Genesis opens with God: already present, already powerful, already speaking.

Today we are reading every verse and slowing down just enough to understand the story.

## Why Day 1 Matters

ðŸŒŒ God creates before anything else exists.

ðŸ—£ï¸ Creation responds to God's voice.

ðŸŒŠ Darkness and emptiness become order and life.

ðŸ‘¤ Human beings carry God's image.

ðŸ•Šï¸ Rest, work, and relationship belong to God's good design.

âœ¨ Creation is good before the world is broken.

${verseBlocks}

# Final Thoughts

The Creation of the World shows us the world before the damage.

God creates, speaks, orders, fills, blesses, rests, forms, breathes, plants, provides, commands, and creates relationship.

Human life is not accidental. Work is not pointless. Rest is not optional. Relationship is not random.

Everything begins with God's good design.

# The Big Lesson

We were made by God, in God's image, for life with God.

Before we understand the fall, we need to understand creation.

Before we understand redemption, we need to understand what God made humanity for.`;
  }

  const bibleYearDayOneTrivia: BibleYearTriviaQuestion[] = [
    {
      id: "creator",
      question: "Who is already present before anything is created?",
      options: ["God", "Adam", "Moses"],
      answer: "God",
      verse: "Genesis 1:1",
      explanation: "Genesis begins with God already there. He is not created or introduced as part of creation. He is the Creator over everything.",
    },
    {
      id: "light",
      question: "What does God create first by speaking into the darkness?",
      options: ["Light", "Animals", "The garden"],
      answer: "Light",
      verse: "Genesis 1:3",
      explanation: "God says, Let there be light. Creation begins by His voice, showing that darkness is not stronger than God.",
    },
    {
      id: "image",
      question: "What does Genesis say human beings are made in?",
      options: ["God's image", "The angels' image", "The stars' image"],
      answer: "God's image",
      verse: "Genesis 1:26-27",
      explanation: "Human worth begins with God. Male and female are both made in His image, so every person carries God-given dignity.",
    },
    {
      id: "rest",
      question: "What does God do on the seventh day?",
      options: ["Rests", "Creates the sun", "Names the animals"],
      answer: "Rests",
      verse: "Genesis 2:1-3",
      explanation: "God rests because creation is complete, not because He is tired. Rest is built into creation from the beginning.",
    },
    {
      id: "alone",
      question: "What is the first thing God says is not good?",
      options: ["For the man to be alone", "The garden", "The animals"],
      answer: "For the man to be alone",
      verse: "Genesis 2:18",
      explanation: "Before sin enters the story, God says aloneness is not good. Humanity is made for relationship, partnership, and covenant love.",
    },
  ];

  const bibleYearTriviaByDay: Record<number, BibleYearTriviaQuestion[]> = {
    1: bibleYearDayOneTrivia,
    2: [
      {
        id: "day2-serpent",
        question: "What did the serpent question first in the garden?",
        options: ["God's word", "Adam's name", "The rivers of Eden"],
        answer: "God's word",
        verse: "Genesis 3:1",
        explanation: "The serpent begins by questioning what God said. The temptation starts by making God's clear word feel doubtful.",
      },
      {
        id: "day2-shame",
        question: "What did Adam and Eve do after their eyes were opened?",
        options: ["Covered themselves", "Built a city", "Named the animals"],
        answer: "Covered themselves",
        verse: "Genesis 3:7",
        explanation: "After sin, shame enters immediately. They sew fig leaves because they feel exposed and afraid.",
      },
      {
        id: "day2-covering",
        question: "What did God make for Adam and Eve?",
        options: ["Coats of skin", "A tower", "A harp"],
        answer: "Coats of skin",
        verse: "Genesis 3:21",
        explanation: "God gives them a better covering than fig leaves. Even after judgment, mercy is still present.",
      },
      {
        id: "day2-cain",
        question: "Who killed Abel?",
        options: ["Cain", "Seth", "Lamech"],
        answer: "Cain",
        verse: "Genesis 4:8",
        explanation: "Cain ignores God's warning about sin and murders his brother Abel in the field.",
      },
      {
        id: "day2-worship",
        question: "What began at the end of Genesis 4?",
        options: ["People calling on Yahweh's name", "The flood", "Israel entering Egypt"],
        answer: "People calling on Yahweh's name",
        verse: "Genesis 4:26",
        explanation: "Genesis 4 ends with hope. After sin and violence, people begin calling on the name of the LORD.",
      },
    ],
    3: [
      {
        id: "day3-noah",
        question: "Who found grace while the earth was becoming corrupt?",
        options: ["Noah", "Cain", "Pharaoh"],
        answer: "Noah",
        verse: "Genesis 6:8",
        explanation: "Noah finds grace in the eyes of the LORD while corruption is spreading across the earth.",
      },
      {
        id: "day3-ark",
        question: "What did God tell Noah to build?",
        options: ["An ark", "A tower", "A city"],
        answer: "An ark",
        verse: "Genesis 6:14",
        explanation: "God commands Noah to build an ark as the place of preservation through the coming flood.",
      },
      {
        id: "day3-corruption",
        question: "What filled the earth before the flood?",
        options: ["Violence and corruption", "Gold and silver", "Peace and rest"],
        answer: "Violence and corruption",
        verse: "Genesis 6:11-13",
        explanation: "The text says the earth was corrupt and filled with violence. That is why judgment is coming.",
      },
      {
        id: "day3-obeyed",
        question: "How did Noah respond to God's command?",
        options: ["He obeyed", "He ran away", "He laughed"],
        answer: "He obeyed",
        verse: "Genesis 6:22",
        explanation: "Noah does according to all that God commands him. Faith becomes obedience, not just agreement.",
      },
      {
        id: "day3-door",
        question: "What begins in Genesis 7?",
        options: ["The flood", "The Exodus", "The fall of Jericho"],
        answer: "The flood",
        verse: "Genesis 7:11-12",
        explanation: "Genesis 7 describes the waters breaking open and rain falling. The flood judgment begins.",
      },
    ],
    4: [
      {
        id: "day4-waters",
        question: "What happens to the flood waters in Genesis 8?",
        options: ["They recede", "They turn to blood", "They become fire"],
        answer: "They recede",
        verse: "Genesis 8:1-5",
        explanation: "God remembers Noah, sends wind over the earth, and the waters begin to go down.",
      },
      {
        id: "day4-altar",
        question: "What does Noah build after leaving the ark?",
        options: ["An altar", "A palace", "A prison"],
        answer: "An altar",
        verse: "Genesis 8:20",
        explanation: "Noah's first recorded act after rescue is worship. He builds an altar and offers sacrifice.",
      },
      {
        id: "day4-sign",
        question: "What sign is connected to God's covenant in Genesis 9?",
        options: ["The rainbow", "The burning bush", "The tablets"],
        answer: "The rainbow",
        verse: "Genesis 9:12-17",
        explanation: "God sets the bow in the clouds as the sign of His covenant mercy toward the earth.",
      },
      {
        id: "day4-image",
        question: "What does Genesis 9 repeat about human life?",
        options: ["People are made in God's image", "People are made of stone", "People cannot worship"],
        answer: "People are made in God's image",
        verse: "Genesis 9:6",
        explanation: "Genesis 9 repeats that humans bear God's image, so human life must be treated with serious dignity.",
      },
      {
        id: "day4-nations",
        question: "What does Genesis 10 trace?",
        options: ["The nations spreading", "The birth of Moses", "The walls of Jerusalem"],
        answer: "The nations spreading",
        verse: "Genesis 10:32",
        explanation: "Genesis 10 traces Noah's descendants as families, languages, lands, and nations spread after the flood.",
      },
    ],
    5: [
      {
        id: "day5-babel",
        question: "What did the people at Babel want to make for themselves?",
        options: ["A name", "An ark", "A golden calf"],
        answer: "A name",
        verse: "Genesis 11:4",
        explanation: "Babel is driven by pride and self-protection. They want to make a name for themselves instead of trusting God.",
      },
      {
        id: "day5-call",
        question: "What did God tell Abram to leave?",
        options: ["His country and father's house", "The ark", "Egypt forever"],
        answer: "His country and father's house",
        verse: "Genesis 12:1",
        explanation: "God calls Abram to leave what is familiar and go toward the land God will show him.",
      },
      {
        id: "day5-promise",
        question: "Who would be blessed through Abram according to Genesis 12?",
        options: ["All families of the earth", "Only Pharaoh", "Only Lot"],
        answer: "All families of the earth",
        verse: "Genesis 12:3",
        explanation: "God's promise to Abram is bigger than one family. Through him, blessing will reach all families of the earth.",
      },
      {
        id: "day5-egypt",
        question: "What pressure drove Abram down into Egypt?",
        options: ["Famine", "War with Jericho", "A flood"],
        answer: "Famine",
        verse: "Genesis 12:10",
        explanation: "A famine presses Abram into Egypt. The pressure exposes fear, but God still protects the promise.",
      },
      {
        id: "day5-lot",
        question: "What did Abram let Lot do in Genesis 13?",
        options: ["Choose the land first", "Build the tower", "Name Isaac"],
        answer: "Choose the land first",
        verse: "Genesis 13:8-11",
        explanation: "Abram chooses peace and lets Lot choose first. Lot chooses by sight, while Abram waits on God's promise.",
      },
    ],
    6: [
      {
        id: "day6-lot-captured",
        question: "Who was taken captive in Genesis 14?",
        options: ["Lot", "Isaac", "Pharaoh"],
        answer: "Lot",
        verse: "Genesis 14:12",
        explanation: "Lot is captured when war reaches Sodom. His nearness to Sodom places him in danger.",
      },
      {
        id: "day6-rescue",
        question: "What did Abram do when he heard Lot was captured?",
        options: ["He rescued him", "He built Babel", "He stayed in Egypt"],
        answer: "He rescued him",
        verse: "Genesis 14:14-16",
        explanation: "Abram gathers his trained men, pursues the captors, and brings Lot and the goods back.",
      },
      {
        id: "day6-melchizedek",
        question: "Who blessed Abram after the battle?",
        options: ["Melchizedek", "Cain", "Laban"],
        answer: "Melchizedek",
        verse: "Genesis 14:18-20",
        explanation: "Melchizedek, king of Salem and priest of God Most High, blesses Abram after the victory.",
      },
      {
        id: "day6-reward",
        question: "What did God call Himself to Abram in Genesis 15?",
        options: ["Abram's shield and reward", "Abram's enemy", "Abram's servant"],
        answer: "Abram's shield and reward",
        verse: "Genesis 15:1",
        explanation: "God speaks to Abram's fear by calling Himself Abram's shield and very great reward.",
      },
      {
        id: "day6-believed",
        question: "What did Abram do in Genesis 15:6?",
        options: ["Believed in the LORD", "Returned to Babel", "Rejected the promise"],
        answer: "Believed in the LORD",
        verse: "Genesis 15:6",
        explanation: "Abram believes the LORD, and it is counted to him for righteousness. Trust is central to the promise.",
      },
    ],
    7: [
      {
        id: "day7-hagar",
        question: "Who did Sarai give to Abram when she tried to force the promise?",
        options: ["Hagar", "Sarah", "Rebekah"],
        answer: "Hagar",
        verse: "Genesis 16:1-3",
        explanation: "Sarai gives Hagar to Abram because waiting feels impossible. It is a human shortcut around God's promise.",
      },
      {
        id: "day7-wilderness",
        question: "Where did the angel of the LORD find Hagar?",
        options: ["By a fountain in the wilderness", "Inside Babel", "On Mount Moriah"],
        answer: "By a fountain in the wilderness",
        verse: "Genesis 16:7",
        explanation: "The angel finds Hagar by a fountain in the wilderness, showing that God sees her in the place she runs to.",
      },
      {
        id: "day7-ishmael",
        question: "Why was Hagar's son called Ishmael?",
        options: ["Because the LORD heard her affliction", "Because Abraham built an ark", "Because Sarah laughed first"],
        answer: "Because the LORD heard her affliction",
        verse: "Genesis 16:11",
        explanation: "Ishmael's name is tied to hearing. God heard Hagar's affliction and spoke into her pain.",
      },
      {
        id: "day7-abraham",
        question: "What new name did God give Abram?",
        options: ["Abraham", "Israel", "Isaac"],
        answer: "Abraham",
        verse: "Genesis 17:5",
        explanation: "God renames Abram Abraham because he will become a father of many nations.",
      },
      {
        id: "day7-isaac",
        question: "Who did God say would carry the covenant promise?",
        options: ["Isaac", "Lot", "Pharaoh"],
        answer: "Isaac",
        verse: "Genesis 17:19-21",
        explanation: "God blesses Ishmael, but He specifically says the covenant promise will be established with Isaac.",
      },
    ],
    8: [
      {
        id: "day8-visitors",
        question: "How many men appeared to Abraham by the tent in Genesis 18?",
        options: ["Three", "One", "Twelve"],
        answer: "Three",
        verse: "Genesis 18:1-2",
        explanation: "Abraham lifts his eyes and sees three men standing nearby. Their visit brings the promise close again.",
      },
      {
        id: "day8-question",
        question: "What question does the LORD ask after Sarah laughs?",
        options: ["Is any thing too hard for the LORD?", "Where is Abel?", "Who touched my garment?"],
        answer: "Is any thing too hard for the LORD?",
        verse: "Genesis 18:14",
        explanation: "God answers Sarah's hidden laugh by reminding her that His promise is not limited by human impossibility.",
      },
      {
        id: "day8-intercession",
        question: "What city does Abraham intercede for?",
        options: ["Sodom", "Nineveh", "Jericho"],
        answer: "Sodom",
        verse: "Genesis 18:22-33",
        explanation: "Abraham pleads with the Lord over Sodom, asking whether the Judge of all the earth will do right.",
      },
      {
        id: "day8-lot",
        question: "Who was rescued from Sodom before judgment fell?",
        options: ["Lot", "Cain", "Laban"],
        answer: "Lot",
        verse: "Genesis 19:15-16",
        explanation: "Lot lingers, but the angels take his hand because the Lord is merciful to him.",
      },
      {
        id: "day8-wife",
        question: "What happened to Lot's wife when she looked back?",
        options: ["She became a pillar of salt", "She built an altar", "She entered the ark"],
        answer: "She became a pillar of salt",
        verse: "Genesis 19:26",
        explanation: "Lot's wife looks back and becomes a pillar of salt, showing the danger of clinging to what God is judging.",
      },
    ],
    9: [
      {
        id: "day9-abimelech",
        question: "To which king did Abraham say Sarah was his sister in Genesis 20?",
        options: ["Abimelech", "Pharaoh", "Melchizedek"],
        answer: "Abimelech",
        verse: "Genesis 20:2",
        explanation: "Abraham repeats an old fear in Gerar, and Abimelech king of Gerar takes Sarah before God intervenes.",
      },
      {
        id: "day9-isaac-born",
        question: "Who was born to Abraham and Sarah at the appointed time?",
        options: ["Isaac", "Jacob", "Ishmael"],
        answer: "Isaac",
        verse: "Genesis 21:1-3",
        explanation: "The Lord did for Sarah as He had spoken, and Isaac was born exactly as God promised.",
      },
      {
        id: "day9-hagar",
        question: "What did God open Hagar's eyes to see in the wilderness?",
        options: ["A well of water", "A ladder to heaven", "A burning bush"],
        answer: "A well of water",
        verse: "Genesis 21:19",
        explanation: "God hears the boy, opens Hagar's eyes, and provides water in the wilderness.",
      },
      {
        id: "day9-moriah",
        question: "What did the LORD provide on Mount Moriah instead of Isaac?",
        options: ["A ram", "A dove", "A jar of oil"],
        answer: "A ram",
        verse: "Genesis 22:13-14",
        explanation: "God stops Abraham and provides a ram caught in the thicket, so Abraham names the place The LORD will provide.",
      },
      {
        id: "day9-birthright",
        question: "What did Esau sell to Jacob for bread and lentil stew?",
        options: ["His birthright", "His tent", "His sandals"],
        answer: "His birthright",
        verse: "Genesis 25:29-34",
        explanation: "Esau treats his birthright lightly and sells it to Jacob for a meal.",
      },
    ],
    10: [
      { id: "day10-famine", question: "What challenge does Isaac face in Genesis 26?", options: ["A famine", "A flood", "A prison"], answer: "A famine", verse: "Genesis 26:1-3", explanation: "Isaac faces famine, and God tells him to stay in the land and trust the promise." },
      { id: "day10-sister", question: "What fear-based claim does Isaac make about Rebekah?", options: ["She is my sister", "She is my servant", "She is from Egypt"], answer: "She is my sister", verse: "Genesis 26:7", explanation: "Isaac repeats a fear pattern from Abraham's story." },
      { id: "day10-wells", question: "What does Isaac keep digging in Genesis 26?", options: ["Wells", "Graves", "Pits"], answer: "Wells", verse: "Genesis 26:18-22", explanation: "The wells show conflict, patience, and God making room for Isaac." },
      { id: "day10-blessing", question: "Who receives Isaac's blessing in Genesis 27?", options: ["Jacob", "Esau", "Laban"], answer: "Jacob", verse: "Genesis 27:27-29", explanation: "Jacob receives the blessing through deception." },
      { id: "day10-escape", question: "Why does Jacob need to leave home after the blessing?", options: ["Esau is angry", "Famine returns", "Isaac sends him to Egypt"], answer: "Esau is angry", verse: "Genesis 27:41-45", explanation: "Esau's anger rises after the stolen blessing, and Jacob is sent away." },
    ],
    11: [
      { id: "day11-leaves", question: "Why is Jacob sent away in Genesis 28?", options: ["To find a wife", "To build an ark", "To fight a king"], answer: "To find a wife", verse: "Genesis 28:1-2", explanation: "Isaac sends Jacob to find a wife from the family line." },
      { id: "day11-dream", question: "What does Jacob see in his dream at Bethel?", options: ["A ladder reaching to heaven", "A burning bush", "A rainbow"], answer: "A ladder reaching to heaven", verse: "Genesis 28:12", explanation: "Jacob sees a ladder with angels ascending and descending." },
      { id: "day11-promise", question: "What does God promise Jacob at Bethel?", options: ["Presence and return", "A throne in Egypt", "A boat"], answer: "Presence and return", verse: "Genesis 28:13-15", explanation: "God promises land, descendants, presence, and return." },
      { id: "day11-rachel", question: "Who does Jacob meet at the well in Genesis 29?", options: ["Rachel", "Rebekah", "Sarah"], answer: "Rachel", verse: "Genesis 29:9-11", explanation: "Jacob meets Rachel near the well in Haran." },
      { id: "day11-deceived", question: "Who deceives Jacob by giving him Leah first?", options: ["Laban", "Esau", "Abimelech"], answer: "Laban", verse: "Genesis 29:21-26", explanation: "Laban deceives Jacob, and Jacob experiences deception from the other side." },
    ],
    12: [
      { id: "day12-family", question: "What grows in Genesis 30 through family rivalry?", options: ["Jacob's household", "Noah's ark", "Sodom"], answer: "Jacob's household", verse: "Genesis 30:1-24", explanation: "Jacob's children are born in a painful and complicated family setting." },
      { id: "day12-flocks", question: "What increases for Jacob while he works under Laban?", options: ["His flocks", "His ships", "His city walls"], answer: "His flocks", verse: "Genesis 30:43", explanation: "God prospers Jacob even under Laban's pressure." },
      { id: "day12-return", question: "What does God tell Jacob to do in Genesis 31?", options: ["Return to the land of his fathers", "Stay with Laban forever", "Go to Egypt"], answer: "Return to the land of his fathers", verse: "Genesis 31:3", explanation: "God calls Jacob back toward the land of promise." },
      { id: "day12-pursues", question: "Who pursues Jacob after he leaves?", options: ["Laban", "Pharaoh", "Lot"], answer: "Laban", verse: "Genesis 31:22-23", explanation: "Laban pursues Jacob, but God warns him in a dream." },
      { id: "day12-boundary", question: "What do Jacob and Laban set up as a witness?", options: ["A heap of stones", "A golden calf", "A tower"], answer: "A heap of stones", verse: "Genesis 31:45-52", explanation: "The stones mark a covenant boundary between Jacob and Laban." },
    ],
    13: [
      { id: "day13-esau", question: "Who is Jacob afraid to meet in Genesis 32?", options: ["Esau", "Laban", "Abimelech"], answer: "Esau", verse: "Genesis 32:6-7", explanation: "Jacob hears Esau is coming with four hundred men and becomes afraid." },
      { id: "day13-prayer", question: "What does Jacob do with his fear?", options: ["He prays", "He builds Babel", "He hides in an ark"], answer: "He prays", verse: "Genesis 32:9-12", explanation: "Jacob brings his fear and God's promise into prayer." },
      { id: "day13-wrestles", question: "What happens to Jacob during the night?", options: ["He wrestles", "He sleeps in a boat", "He becomes king of Egypt"], answer: "He wrestles", verse: "Genesis 32:24", explanation: "Jacob wrestles through the night with a mysterious man." },
      { id: "day13-name", question: "What new name does Jacob receive?", options: ["Israel", "Isaac", "Edom"], answer: "Israel", verse: "Genesis 32:28", explanation: "Jacob is renamed Israel after wrestling and clinging for blessing." },
      { id: "day13-embrace", question: "How does Esau respond when he meets Jacob?", options: ["He embraces him", "He imprisons him", "He sells him"], answer: "He embraces him", verse: "Genesis 33:4", explanation: "The feared meeting becomes a surprising moment of mercy." },
    ],
    14: [
      { id: "day14-dinah", question: "Whose painful story opens Genesis 34?", options: ["Dinah", "Rachel", "Leah"], answer: "Dinah", verse: "Genesis 34:1-2", explanation: "Genesis 34 opens with Dinah and a painful account of violation and violence." },
      { id: "day14-bethel", question: "Where does God tell Jacob to return in Genesis 35?", options: ["Bethel", "Egypt", "Sodom"], answer: "Bethel", verse: "Genesis 35:1", explanation: "God calls Jacob back to Bethel to make an altar." },
      { id: "day14-idols", question: "What does Jacob tell his household to put away?", options: ["Foreign gods", "Wells", "Birthrights"], answer: "Foreign gods", verse: "Genesis 35:2", explanation: "Jacob calls his household to put away foreign gods before worship." },
      { id: "day14-benjamin", question: "Who is born as Rachel dies?", options: ["Benjamin", "Joseph", "Esau"], answer: "Benjamin", verse: "Genesis 35:16-18", explanation: "Rachel dies giving birth to Benjamin." },
      { id: "day14-esau-line", question: "Whose descendants are listed in Genesis 36?", options: ["Esau's", "Noah's", "Pharaoh's"], answer: "Esau's", verse: "Genesis 36:1", explanation: "Genesis 36 records Esau's descendants and prepares later Bible history." },
    ],
  };

  const bibleYearReflectionPromptByDay: Record<number, string> = {
    1: "What does it mean to you to be made in the image of God?",
    2: "Where do you notice hiding, blame, or anger in your own life?",
    3: "What does Noah's obedience teach you about following God when the world around you is drifting?",
    4: "What kind of new beginning are you asking God to help you walk into?",
    5: "Where is God asking you to obey, trust His promise, or stop grasping for control?",
    6: "Where do you need courage, discernment, or renewed trust in God's promise?",
    7: "Where are you tempted to force what God has promised, and where do you need to receive the identity God gives?",
    8: "Where do you need to take God's mercy, holiness, and warnings more seriously today?",
    9: "What part of Abraham's legacy challenges or encourages you most: waiting, testing, grief, guidance, or passing faith forward?",
    10: "Where do you see fear, favoritism, or deception causing damage in Genesis 26-27?",
    11: "What encourages you about God meeting Jacob on the road at Bethel?",
    12: "Where do you see God guiding Jacob through pressure and conflict?",
    13: "What stands out to you about Jacob wrestling, limping, and receiving a new name?",
    14: "What does Jacob returning to Bethel teach you about coming back to worship after brokenness?",
  };

  function getBibleYearDayTaskKey(task: TaskState) {
    const match = task.href?.match(/^#bible-year-day-\d+-(reading|trivia|reflection)$/);
    return (match?.[1] as BibleYearDayCardKey | undefined) || null;
  }

  function getBibleYearDayCompletedCount(day: GenesisBibleYearDay) {
    const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
    return getBibleYearRequiredCardKeys(day).filter((key) => completed[key]).length;
  }

  function isBibleYearDayComplete(day: GenesisBibleYearDay) {
    return getBibleYearDayCompletedCount(day) >= getBibleYearRequiredCardKeys(day).length;
  }

  function getBibleYearRequiredCardKeys(day: GenesisBibleYearDay) {
    if (!day) return BIBLE_YEAR_DAY_CARD_KEYS;
    return ["reading", "reflection", "trivia"] as BibleYearDayCardKey[];
  }

  function getBibleYearCardDisplayLabel(day: GenesisBibleYearDay, card: BibleYearDayCardKey) {
    if (card === "reading") return "video";
    if (card === "reflection") return "summary";
    return card;
  }

  function getCurrentBibleYearSeriesDayNumber(days = GENESIS_BIBLE_IN_ONE_YEAR_SERIES) {
    const reportedCurrentDayNumber = Number(effectiveBibleYearReport.currentDay);
    const nextDay = days.find((day) => !isBibleYearDayComplete(day)) || days[days.length - 1];
    if (!days.length) return 1;
    const minDay = days[0]?.dayNumber ?? 1;
    const maxDay = days[days.length - 1]?.dayNumber ?? reportedCurrentDayNumber;
    const nextIncompleteDayNumber = nextDay?.dayNumber || minDay;
    const boundedReportedDayNumber = Number.isFinite(reportedCurrentDayNumber)
      ? Math.max(minDay, Math.min(reportedCurrentDayNumber, maxDay))
      : minDay;
    return Math.max(boundedReportedDayNumber, nextIncompleteDayNumber);
  }

  function freeUserCanOpenBibleYearDayTasks(day: GenesisBibleYearDay) {
    return Boolean(day);
  }

  function isBibleYearDayVisuallyLocked(day: GenesisBibleYearDay) {
    return !isBibleYearDayComplete(day) && day.dayNumber !== getCurrentBibleYearSeriesDayNumber();
  }

  function isBibleYearTaskLockedForFree(day: GenesisBibleYearDay, card: BibleYearDayCardKey) {
    if (isBibleYearDayComplete(day)) return false;
    const requiredCardKeys = getBibleYearRequiredCardKeys(day);
    const cardIndex = requiredCardKeys.indexOf(card);
    if (cardIndex <= 0) return false;
    const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
    return requiredCardKeys.slice(0, cardIndex).some((previousCard) => completed[previousCard] !== true);
  }

  function getBibleYearLockedTaskTitle(day: GenesisBibleYearDay, card: BibleYearDayCardKey) {
    const requiredCardKeys = getBibleYearRequiredCardKeys(day);
    const cardIndex = requiredCardKeys.indexOf(card);
    const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
    const neededCard = requiredCardKeys.slice(0, cardIndex).find((previousCard) => completed[previousCard] !== true);
    if (!neededCard) return "Complete the task above to unlock this.";
    const displayLabel = getBibleYearCardDisplayLabel(day, neededCard);
    const label = displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1);
    return `Complete ${label} first.`;
  }

  function getBibleYearDayAction(day: GenesisBibleYearDay) {
    const completedCount = getBibleYearDayCompletedCount(day);
    if (completedCount <= 0) return { label: "Start", markDone: false };
    if (completedCount >= 3) return { label: "Review", markDone: true };
    return { label: "Finish", markDone: false };
  }

  function getBibleYearSeriesStatusLabel(day: GenesisBibleYearDay, isCurrent: boolean, isComplete: boolean, isLocked: boolean) {
    if (isComplete) return "Complete";
    if (isLocked) return "Locked";
    if (!isCurrent) return day.estimatedTime;

    const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
    const requiredCardKeys = getBibleYearRequiredCardKeys(day);
    const remaining = requiredCardKeys.filter((card) => completed[card] !== true);
    const doneCount = requiredCardKeys.length - remaining.length;
    if (remaining.length === requiredCardKeys.length) return `0/${requiredCardKeys.length} tasks done`;
    if (remaining.length === 2) {
      const labels = remaining.map((card) => getBibleYearCardDisplayLabel(day, card)).join(" + ");
      return `${labels} left`;
    }
    if (remaining[0] === "reflection") return "Summary left";
    if (remaining[0] === "trivia") return "Trivia left";
    if (remaining[0] === "reading") return "Video left";
    return `${doneCount}/${requiredCardKeys.length} tasks done`;
  }

  async function persistBibleYearDayProgress(dayNumber: number, cards: BibleYearDayCardKey[]) {
    if (!userId) return;

    const payload: Record<string, unknown> = {
      user_id: userId,
      day_number: dayNumber,
    };

    cards.forEach((card) => {
      payload[`${card}_completed`] = true;
    });

    const { error } = await supabase
      .from("bible_year_day_progress")
      .upsert(payload, { onConflict: "user_id,day_number" });

    if (error) throw error;
  }

  async function markBibleYearDayCoveredChaptersRead(day: GenesisBibleYearDay) {
    if (!userId || !day.readings.length) return;

    const coveredChapters = Array.from(
      new Map(day.readings.map((reading) => [`${reading.book.toLowerCase()}:${reading.chapter}`, reading])).values(),
    );

    const results = await Promise.allSettled(
      coveredChapters.map((reading) => markChapterDone(userId, reading.book, reading.chapter)),
    );
    const failures = results.filter((result) => result.status === "rejected");
    if (failures.length) {
      console.error("[BIBLE_YEAR_PROGRESS] Could not mark every covered chapter as read:", failures);
    }

    const { count, error: countError } = await supabase
      .from("completed_chapters")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (countError) {
      console.error("[BIBLE_YEAR_PROGRESS] Could not count completed chapters after Bible Year day:", countError);
      return;
    }

    const { error: statsError } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          chapters_completed_count: count || 0,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

    if (statsError) {
      console.error("[BIBLE_YEAR_PROGRESS] Could not sync profile chapter count after Bible Year day:", statsError);
    }
  }

  async function incrementProfileTotalActions() {
    if (!userId) return;

    const nowIso = new Date().toISOString();
    const today = getBibleBuddyLocalDayKey();

    const { data: currentStats, error: fetchError } = await supabase
      .from("profile_stats")
      .select("total_actions")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.warn("[PROFILE_STATS] Could not fetch total action count:", fetchError);
      return;
    }

    const nextTotalActions = Number(currentStats?.total_actions || 0) + 1;
    const updates = {
      user_id: userId,
      total_actions: nextTotalActions,
      last_active_at: nowIso,
      last_active_date: today,
      updated_at: nowIso,
    };

    const { error: writeError } = currentStats
      ? await supabase.from("profile_stats").update(updates).eq("user_id", userId)
      : await supabase.from("profile_stats").upsert(updates, { onConflict: "user_id" });

    if (writeError) {
      console.warn("[PROFILE_STATS] Could not update total action count:", writeError);
    }
  }

  function getBibleYearCardActionLabel(day: GenesisBibleYearDay, card: BibleYearDayCardKey) {
    const displayLabel = getBibleYearCardDisplayLabel(day, card);
    const cardLabel = displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1);
    return `Bible in One Year Day ${day.dayNumber} ${cardLabel}: ${day.title}`;
  }

  async function logBibleYearTaskStarted(day: GenesisBibleYearDay, card: BibleYearDayCardKey) {
    if (!userId) return;
    const actionLabel = `Bible in One Year Day ${day.dayNumber} ${getBibleYearCardDisplayLabel(day, card)} started: ${day.title}`;
    try {
      const { data: existing, error: existingError } = await supabase
        .from("master_actions")
        .select("id")
        .eq("user_id", userId)
        .eq("action_type", ACTION_TYPE.bible_year_task_started)
        .eq("action_label", actionLabel)
        .limit(1);
      if (existingError) throw existingError;
      if (existing && existing.length > 0) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      const meta = user?.user_metadata || {};
      const username =
        meta.firstName ||
        meta.first_name ||
        (user?.email ? user.email.split("@")[0] : null) ||
        "User";
      const insertPayload = {
        user_id: userId,
        username,
        action_type: ACTION_TYPE.bible_year_task_started,
        action_label: actionLabel,
        journey_day: day.dayNumber,
        account_status: isPaidUser ? "pro" : "free_or_guest",
        event_metadata: {
          plan: "bible_in_one_year",
          task: card,
          dayNumber: day.dayNumber,
          dayTitle: day.title,
        },
      };
      const { error: insertError } = await supabase.from("master_actions").insert(insertPayload);
      if (insertError) throw insertError;
    } catch (error) {
      console.warn("[BIBLE_YEAR_ANALYTICS] Could not log task start:", error);
    }
  }

  function getBibleYearReflectionSlug(day: GenesisBibleYearDay) {
    return `bible-in-one-year-day-${day.dayNumber}-${day.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  }

  function markBibleYearReflectionPosted(day: GenesisBibleYearDay) {
    setBibleYearReflectionPostedByDay((current) => ({
      ...current,
      [day.dayNumber]: true,
    }));
  }

  function getBibleYearDiscussionActionLabel(day: GenesisBibleYearDay) {
    return `Bible in One Year Day ${day.dayNumber} Discussion: ${day.title}`;
  }

  async function logBibleYearDiscussionParticipation(day: GenesisBibleYearDay) {
    if (!userId) return;
    const actionLabel = getBibleYearDiscussionActionLabel(day);
    try {
      const { data: existingReward, error: existingRewardError } = await supabase
        .from("master_actions")
        .select("id")
        .eq("user_id", userId)
        .eq("action_type", ACTION_TYPE.feed_post_commented)
        .eq("action_label", actionLabel)
        .limit(1);

      if (existingRewardError) {
        console.warn("[BIBLE_YEAR_DISCUSSION] Could not check discussion action:", existingRewardError);
        return;
      }
      if (existingReward && existingReward.length > 0) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      const meta = user?.user_metadata || {};
      const username =
        meta.firstName ||
        meta.first_name ||
        (user?.email ? user.email.split("@")[0] : null) ||
        "User";

      const { error: insertRewardError } = await supabase.from("master_actions").insert({
        user_id: userId,
        username,
        action_type: ACTION_TYPE.feed_post_commented,
        action_label: actionLabel,
      });

      if (insertRewardError) {
        console.warn("[BIBLE_YEAR_DISCUSSION] Could not save discussion action:", insertRewardError);
        return;
      }

      await incrementProfileTotalActions();
    } catch (error) {
      console.warn("[BIBLE_YEAR_DISCUSSION] Could not log discussion action:", error);
    }
  }

  async function ensureBibleYearCardActionLogged(day: GenesisBibleYearDay, card: BibleYearDayCardKey, showPoints = false) {
    if (!userId) return;
    const actionType = BIBLE_YEAR_CARD_ACTION_TYPE[card];
    const actionLabel = getBibleYearCardActionLabel(day, card);
    const { data, error } = await supabase
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .eq("action_type", actionType)
      .eq("action_label", actionLabel)
      .limit(1);

    if (error) throw error;
    if (data && data.length > 0) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const meta = user?.user_metadata || {};
    const username =
      meta.firstName ||
      meta.first_name ||
      (user?.email ? user.email.split("@")[0] : null) ||
      "User";

    const insertPayload = {
      user_id: userId,
      action_type: actionType,
      action_label: actionLabel,
      username,
    };
    const { error: insertError } = await supabase.from("master_actions").insert(insertPayload);
    if (insertError) throw insertError;
    await incrementProfileTotalActions();
    if (showPoints) triggerPoints(BIBLE_YEAR_CARD_XP[card]);
  }

  async function markBibleYearDayCardsComplete(day: GenesisBibleYearDay, cards: BibleYearDayCardKey[]) {
    const alreadyCompleted = bibleYearCompletedCardsByDay[day.dayNumber] || {};
    const newlyCompletedCards = cards.filter((card) => alreadyCompleted[card] !== true);
    const nextCompletedForDay = {
      ...alreadyCompleted,
      ...Object.fromEntries(cards.map((card) => [card, true])),
    };
    const dayWillBeFullyComplete = getBibleYearRequiredCardKeys(day).every((card) => nextCompletedForDay[card] === true);
    if (newlyCompletedCards.length > 0) {
      startBibleYearCompletionAnimation(day.dayNumber, newlyCompletedCards[0]);
    }
    if (dayWillBeFullyComplete) {
      setBibleYearCompletedTasksExpandedDay(null);
    }
    setBibleYearCompletedCardsByDay((current) => ({
      ...current,
      [day.dayNumber]: {
        ...(current[day.dayNumber] || {}),
        ...nextCompletedForDay,
      },
    }));
    setActiveBibleYearDayCard(null);
    if (dayWillBeFullyComplete) {
      bibleYearJustCompletedDayRef.current = day.dayNumber;
      setSelectedBibleYearSeriesDay(day);
      if (newlyCompletedCards.length > 0) {
        setBibleYearOptionalDiscussionDay(day.dayNumber);
      }
      setBibleYearCompletedTasksExpandedDay(null);
      setActiveBibleYearDayCard(null);
      setBibleYearJourneyPreviewDay(null);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("view", "bible-year");
        url.searchParams.set("day", String(day.dayNumber));
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      }
    }
    await persistBibleYearDayProgress(day.dayNumber, cards);
    if (dayWillBeFullyComplete) {
      await markBibleYearDayCoveredChaptersRead(day);
    }
    if (newlyCompletedCards.length > 0) {
      await Promise.all(newlyCompletedCards.map((card) => ensureBibleYearCardActionLogged(day, card, true)));
      onDevotionalChanged();
    }
  }

  function markBibleYearDayCardComplete(day: GenesisBibleYearDay, card: BibleYearDayCardKey) {
    void markBibleYearDayCardsComplete(day, [card]).catch((error) => {
      console.error("[BIBLE_YEAR_PROGRESS] Could not complete Bible in One Year card:", error);
    });
  }

  useEffect(() => {
    if (!userId) return;
    const visibleBibleYearDays = GENESIS_BIBLE_IN_ONE_YEAR_SERIES;
    const pendingReflectionDays = visibleBibleYearDays.filter((day) => day.dayNumber !== 1 && bibleYearCompletedCardsByDay[day.dayNumber]?.reflection !== true);
    if (!pendingReflectionDays.length) return;

    const syncKey = `${userId}:${pendingReflectionDays.map((day) => day.dayNumber).join(",")}`;
    if (bibleYearReflectionSyncKeyRef.current === syncKey) return;
    bibleYearReflectionSyncKeyRef.current = syncKey;

    const slugToDay = new Map(pendingReflectionDays.map((day) => [getBibleYearReflectionSlug(day), day]));
    async function syncSavedBibleYearReflections() {
      try {
        const { data, error } = await supabase
          .from("article_comments")
          .select("article_slug")
          .eq("user_id", userId)
          .eq("is_deleted", false)
          .in("article_slug", Array.from(slugToDay.keys()));
        if (error) {
          console.error("[BIBLE_YEAR_REFLECTION] Could not check saved reflections:", error);
          return;
        }
        const reflectedDays = Array.from(new Set((data || []).map((row) => slugToDay.get(row.article_slug)).filter(Boolean))) as GenesisBibleYearDay[];
        if (!reflectedDays.length) return;
        await Promise.allSettled(reflectedDays.map((day) => markBibleYearDayCardsComplete(day, ["reflection"])));
      } catch (error) {
        console.error("[BIBLE_YEAR_REFLECTION] Could not sync saved reflections:", error);
      }
    }

    void syncSavedBibleYearReflections();
  }, [bibleYearCompletedCardsByDay, userId]);

  useEffect(() => {
    if (!userId) return;
    const discussionDays = GENESIS_BIBLE_IN_ONE_YEAR_SERIES;
    const slugToDayNumber = new Map(discussionDays.map((day) => [getBibleYearReflectionSlug(day), day.dayNumber]));
    if (!slugToDayNumber.size) return;

    async function syncPostedBibleYearDiscussions() {
      try {
        const { data, error } = await supabase
          .from("article_comments")
          .select("article_slug")
          .eq("user_id", userId)
          .eq("is_deleted", false)
          .in("article_slug", Array.from(slugToDayNumber.keys()));

        if (error) {
          console.error("[BIBLE_YEAR_DISCUSSION] Could not check saved discussion posts:", error);
          return;
        }

        const postedDayNumbers = Array.from(new Set((data || []).map((row) => slugToDayNumber.get(row.article_slug)).filter(Boolean))) as number[];
        if (!postedDayNumbers.length) return;
        setBibleYearReflectionPostedByDay((current) => {
          const next = { ...current };
          postedDayNumbers.forEach((dayNumber) => {
            next[dayNumber] = true;
          });
          return next;
        });
      } catch (error) {
        console.error("[BIBLE_YEAR_DISCUSSION] Could not sync saved discussion posts:", error);
      }
    }

    void syncPostedBibleYearDiscussions();
  }, [userId]);

  function startBibleYearCompletionAnimation(dayNumber: number, card: BibleYearDayCardKey) {
    const nonce = Date.now();
    setBibleYearCompletionAnimation({ dayNumber, card, nonce });
    setBibleYearCompletedTasksExpandedDay(dayNumber);
    window.setTimeout(() => {
      setBibleYearCompletionAnimation((current) => current?.nonce === nonce ? null : current);
    }, 1200);
  }

  function showBibleYearRewardToast(dayNumber: number, text: string) {
    const nonce = Date.now();
    setBibleYearRewardToast({ dayNumber, text, nonce });
    window.setTimeout(() => {
      setBibleYearRewardToast((current) => current?.nonce === nonce ? null : current);
    }, 1800);
  }

  async function handleContinueToNextBibleYearDay(day: GenesisBibleYearDay, nextDay: GenesisBibleYearDay) {
    if (continuingBibleYearDay === day.dayNumber) return;
    if (day.dayNumber === 3 && !isPaidUser && await openDayThreeProPrompt(day, nextDay)) return;
    setContinuingBibleYearDay(day.dayNumber);
    try {
      setBibleYearCompletionModalDay(null);
      bibleYearJustCompletedDayRef.current = null;
      await markBibleYearDayCardsComplete(day, getBibleYearRequiredCardKeys(day));
      bibleYearJustCompletedDayRef.current = null;
      onDevotionalChanged();
      openBibleYearDayOnDashboard(nextDay);
    } catch (error) {
      console.error("[BIBLE_YEAR_PROGRESS] Could not continue to next Bible in One Year day:", error);
    } finally {
      setContinuingBibleYearDay(null);
    }
  }

  function handleBibleYearCompletionModalContinue(day: GenesisBibleYearDay) {
    const nextDay = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((seriesDay) => seriesDay.dayNumber === day.dayNumber + 1);
    if (nextDay) {
      void handleContinueToNextBibleYearDay(day, nextDay);
      return;
    }

    setBibleYearCompletionModalDay(null);
    openBibleYearSeriesDashboard();
  }

  useEffect(() => {
    if (!userId) return;
    const completedEntries = GENESIS_BIBLE_IN_ONE_YEAR_SERIES
      .flatMap((day) => {
        const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
        return getBibleYearRequiredCardKeys(day)
          .filter((card) => completed[card] === true)
          .map((card) => ({ day, card }));
      });
    if (!completedEntries.length) return;

    const backfillKey = completedEntries.map(({ day, card }) => `${day.dayNumber}:${card}`).join("|");
    if (bibleYearXpBackfillKeyRef.current === backfillKey) return;
    bibleYearXpBackfillKeyRef.current = backfillKey;

    void Promise.all(completedEntries.map(({ day, card }) => ensureBibleYearCardActionLogged(day, card, false)))
      .then(() => onDevotionalChanged())
      .catch((error) => console.error("[BIBLE_YEAR_PROGRESS] Could not backfill Bible in One Year XP:", error));
  }, [bibleYearCompletedCardsByDay, onDevotionalChanged, userId]);

  function getBibleYearReadingTaskSubtitle(day: GenesisBibleYearDay) {
    const subtitles: Record<number, string> = {
      1: "Watch God bring order from a formless world.",
      2: "See how sin fractures trust, peace, and purpose.",
      3: "Follow Noah as faith obeys before rain falls.",
      4: "See life restart after judgment covers the earth.",
      5: "Watch Abraham obey when God calls him out.",
      6: "See Lot rescued while Abram trusts God's promise.",
      7: "Watch God promise covenant life through Abraham's family.",
      8: "See mercy and judgment meet in Sodom's fall.",
    };

    return subtitles[day.dayNumber] || `Study ${day.reference || day.title} with focused Bible teaching.`;
  }

  function buildBibleYearDayTasks(day: GenesisBibleYearDay | null): TaskState[] {
    if (!day) return [];
    const dayLabel = `Day ${day.dayNumber}`;
    const completed = bibleYearCompletedCardsByDay[day.dayNumber] || {};
    return [
      {
        kind: "reading",
        title: "Watch Today's Scripture Video",
        subtitle: "Watch today's guided Scripture breakdown.",
        pointsLabel: "+25 XP",
        timeEstimateLabel: day.estimatedTime,
        href: `#bible-year-day-${day.dayNumber}-reading`,
        done: completed.reading === true,
        completedAtLabel: completed.reading ? "Done" : null,
        chapterLabel: dayLabel,
      },
      {
        kind: "reflection",
        title: "Read Today's Summary",
        subtitle: "Read today's summary to better understand the story and meaning of the passage.",
        pointsLabel: "+20 XP",
        timeEstimateLabel: "3 min",
        href: `#bible-year-day-${day.dayNumber}-reflection`,
        done: completed.reflection === true,
        completedAtLabel: completed.reflection ? "Done" : null,
        chapterLabel: dayLabel,
      },
      {
        kind: "trivia",
        title: "Answer Today's Trivia Questions",
        subtitle: "Test your understanding and reinforce what you learned today.",
        pointsLabel: "+20 XP",
        timeEstimateLabel: "3 min",
        href: `#bible-year-day-${day.dayNumber}-trivia`,
        done: completed.trivia === true,
        completedAtLabel: completed.trivia ? "Done" : null,
        chapterLabel: dayLabel,
      },
    ];
  }

  function getBibleYearDayDeepNotes(dayNumber: number) {
    const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((item) => item.dayNumber === dayNumber);
    const content = day ? getBibleYearDayContent(day) : null;
    return { markdown: content?.studyNotesMarkdown ?? null, sections: content?.studyNotesSections ?? null };
  }

  function getBibleYearFollowAlongChapters(day: GenesisBibleYearDay) {
    if (day.dayNumber < 1 || day.dayNumber > 8) return [];
    return day.readings
      .map((reading) => ({
        book: reading.book,
        chapter: reading.chapter,
        verses: BIBLE_YEAR_GENESIS_WEB_VERSES[reading.chapter] || [],
      }))
      .filter((chapter) => chapter.verses.length > 0);
  }

  function renderBibleYearFollowAlongScripture(day: GenesisBibleYearDay) {
    const chapters = getBibleYearFollowAlongChapters(day);
    if (!chapters.length) return null;

    const isOpen = Boolean(bibleYearFollowAlongOpenByDay[day.dayNumber]);
    return (
      <div className="mt-3">
        <button
          type="button"
          onClick={() => {
            setBibleYearFollowAlongOpenByDay((current) => ({
              ...current,
              [day.dayNumber]: !current[day.dayNumber],
            }));
          }}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_42%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_9%,var(--bb-card,#ffffff))] px-4 py-2.5 text-sm font-black text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_15%,var(--bb-card,#ffffff))]"
        >
          <span className="grid h-5 w-5 place-items-center rounded-md border border-current" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-sm border border-current border-r-0" />
          </span>
          <span>Follow Along in Scripture</span>
          <span className={`ml-auto text-base leading-none transition ${isOpen ? "rotate-180" : ""}`} aria-hidden="true">
            ^
          </span>
        </button>
        {isOpen ? (
          <section className="bible-year-follow-along-scroll mt-3 max-h-[420px] overflow-y-auto rounded-[18px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#111827)_78%,#020617)] p-4 text-left text-[var(--bb-text-primary,#fff7ed)] shadow-inner">
            <div className="space-y-7">
              {chapters.map((chapter) => (
                <article key={`${chapter.book}-${chapter.chapter}`} className="space-y-3">
                  <h3 className="font-serif text-2xl font-black tracking-wide text-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_82%,#ffffff)]">
                    {chapter.book} {chapter.chapter}
                  </h3>
                  <div className="space-y-3">
                    {chapter.verses.map((verse) => (
                      <p key={`${chapter.book}-${chapter.chapter}-${verse.verse}`} className="text-sm font-semibold leading-7 text-[var(--bb-text-secondary,#dbeafe)] sm:text-[15px]">
                        <sup className="mr-1 align-super text-[11px] font-black leading-none text-[var(--bb-accent,#2f7fe8)]">
                          {verse.verse}
                        </sup>
                        {verse.text}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    );
  }

  function renderBibleYearDayOneVideoTask(day: GenesisBibleYearDay) {
    const content = getBibleYearDayContent(day);
    const lesson = content.lesson;
    const audio = content.audio;
    const videoComplete = bibleYearCompletedCardsByDay[day.dayNumber]?.reading === true;
    const hasVideo = Boolean(audio?.videoSrc);
    const videoPlayerSrc = audio?.videoSrc
      ? `${audio.videoSrc}${audio.videoSrc.includes("?") ? "&" : "?"}autoplay=true&muted=false&preload=true&responsive=true`
      : null;
    const audioFirst = day.dayNumber >= 1 && day.dayNumber <= 8;
    const mediaMode = bibleYearMediaModeByDay[day.dayNumber] || (audioFirst ? "audio" : "video");
    const showVideo = Boolean(videoPlayerSrc && mediaMode === "video");
    const showAudio = Boolean(audio && !showVideo);

    return (
      <div className="px-4 pb-4">
        <style>{`
          @keyframes bible-year-deep-notes-dance {
            0%, 100% { transform: translateY(0) rotate(0deg) scale(1); box-shadow: 0 8px 18px rgba(47, 127, 232, 0.14); }
            25% { transform: translateY(-2px) rotate(-0.7deg) scale(1.01); box-shadow: 0 13px 26px rgba(47, 127, 232, 0.22); }
            50% { transform: translateY(0) rotate(0.6deg) scale(1.015); box-shadow: 0 10px 22px rgba(246, 180, 75, 0.22); }
            75% { transform: translateY(-1px) rotate(-0.35deg) scale(1.01); box-shadow: 0 13px 26px rgba(47, 127, 232, 0.20); }
          }
          .bible-year-deep-notes-dance {
            animation: bible-year-deep-notes-dance 2.2s ease-in-out infinite;
            transform-origin: center;
          }
          @media (prefers-reduced-motion: reduce) {
            .bible-year-deep-notes-dance { animation: none; }
          }
        `}</style>
        <div className="dashboard-inline-task rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">Task 1</p>
          <h2 className="mt-1 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
            {showVideo ? "Watch Today's Scripture Video" : "Listen To Today's Scripture Audio"}
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            {showVideo ? "Watch today's guided Scripture breakdown." : "Listen to today's guided Scripture reading and explanation."}
          </p>
          {showVideo && videoPlayerSrc ? (
            <div className="mt-4 overflow-hidden rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-black shadow-[0_18px_38px_rgba(14,26,58,0.18)]">
              <div className="relative aspect-video overflow-hidden bg-black">
                <iframe
                  src={videoPlayerSrc}
                  title={lesson?.title || day.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          ) : showAudio && audio ? (
            <div className="mt-4">
              <BibleYearLessonAudioPlayer
                audioSrc={audio.apiSrc}
                title={audio.title}
                durationLabel={audio.estimatedDuration}
                storagePath={audio.storagePath}
                userId={userId}
                videoId={`bible-year-day-${day.dayNumber}`}
                backgroundMusicSrcs={day.dayNumber === 8 || day.dayNumber === 9 ? BIBLE_READING_BACKGROUND_TRACKS : undefined}
                backgroundMusicVolume={BIBLE_READING_BACKGROUND_VOLUME}
              />
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] p-4 text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]">
              Today&apos;s audio/video lesson is being prepared. This day already uses the standard Day 1 task flow, and the media can drop into this same card when ready.
            </div>
          )}
          {hasVideo ? (
            <button
              type="button"
              onClick={() =>
                setBibleYearMediaModeByDay((current) => ({
                  ...current,
                  [day.dayNumber]: showVideo ? "audio" : "video",
                }))
              }
              className="mt-3 w-full rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_32%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-3 text-sm font-black text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
            >
              {showVideo ? "Check out the audio version" : "Watch the video instead"}
            </button>
          ) : null}
          {renderBibleYearFollowAlongScripture(day)}
          {showVideo && audio?.videoSrc ? (
            <VideoHelpfulPoll
              userId={userId}
              videoId={`bible-year-day-${day.dayNumber}`}
              videoTitle={lesson?.title || day.title}
              videoUrl={audio.videoSrc || ""}
              videoContext="bible_year"
            />
          ) : null}
          <button
            type="button"
            onClick={() => {
              if (videoComplete) return;
              setBibleYearDeepNotesOpen(false);
              setBibleYearPersistentVideoDay(null);
              markBibleYearDayCardComplete(day, "reading");
            }}
            disabled={videoComplete}
            className={`mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-center shadow-sm transition ${
              videoComplete
                ? "cursor-default border-emerald-300 bg-emerald-100 text-emerald-900"
                : "border-[var(--bb-button,#2f7fe8)] bg-[var(--bb-button,#2f7fe8)] text-[var(--bb-button-text,#ffffff)] hover:brightness-95"
            }`}
          >
            <span className="text-base font-black">{videoComplete ? "Lesson Complete" : showVideo ? "Mark Video Complete" : "Mark Audio Complete"}</span>
            <span className="rounded-full bg-white/18 px-2.5 py-1 text-xs font-black">+25 XP</span>
          </button>
        </div>
      </div>
    );
  }

  function renderBibleYearSummaryTask(day: GenesisBibleYearDay) {
    const summaryComplete = bibleYearCompletedCardsByDay[day.dayNumber]?.reflection === true;
    const summaryContent = getBibleYearDayContent(day).summary;
    const { markdown: deepNotesMarkdown, sections: deepStudySections } = getBibleYearDayDeepNotes(day.dayNumber);
    const trackSummaryStudyNotesSection = (section: BibleYearDeepStudySection) => {
      void trackStudyNotesSectionOpened({
        userId,
        username: userName,
        source: "bible_in_one_year",
        sourceLabel: "Bible in One Year",
        itemKey: `day-${day.dayNumber}`,
        itemTitle: day.title,
        contentLabel: `Day ${day.dayNumber} - ${day.title}`,
        sectionReference: section.reference,
        sectionTitle: section.title,
      });
    };
    const summaryHighlights = summaryContent.highlights;
    void summaryHighlights;
    const legacyDayOneHighlights = [
      ["âœ¨", "God speaks into darkness and brings light."],
      ["ðŸŒ", "God shapes the world into a home filled with life and purpose."],
      ["ðŸ‘¤", "Humanity is created in God's image with value, dignity, and meaning."],
      ["ðŸŒ±", "Eden shows work, rest, freedom, boundaries, and relationship with God."],
      ["ðŸ“–", "Creation reveals a God who brings order, beauty, and intentional design."],
    ];

    return (
      <div className="px-4 pb-4">
        <div className="px-1 pt-2">
          <div className="space-y-6">
            <section>
              {summaryContent.intro.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm font-semibold leading-7 text-[var(--bb-text-secondary,#4b5563)] first:mt-0">
                  {paragraph}
                </p>
              ))}
            </section>

            <section>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Key Highlights</p>
              <div className="mt-3 grid gap-3">
                {(day.dayNumber === 2
                  ? [
                      ["ðŸ", "The serpent questions God's word and makes distrust sound reasonable."],
                      ["ðŸŽ", "Adam and Eve disobey, and shame, fear, hiding, and blame enter the story."],
                      ["ðŸŒ±", "God judges sin, but also gives the first promise that evil will not win forever."],
                      ["ðŸ’”", "Cain's anger shows sin spreading from the garden into the family."],
                      ["âœ¨", "Seth's birth shows hope continuing even after heartbreak and loss."],
                    ]
                  : summaryHighlights
                ).map(([emoji, text]) => (
                  <div key={text} className="flex gap-3">
                    <span className="shrink-0 text-lg leading-6" aria-hidden="true">{emoji}</span>
                    <p className="text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-l-4 border-[var(--bb-success,#16a34a)] pl-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-success,#16a34a)]">Big Takeaway</p>
              <p className="mt-3 text-sm font-black leading-7 text-[var(--bb-text-primary,#111827)]">
                {summaryContent.takeaway}
              </p>
              <p className="mt-3 text-sm font-semibold leading-7 text-[var(--bb-text-secondary,#4b5563)]">
                {summaryContent.takeawaySupport}
              </p>
            </section>

            <div className="border-t border-[var(--bb-card-border,#dbe7f4)] pt-5">
              <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">{summaryContent.studyNotesCtaTitle || "Want to understand today's Scripture even deeper?"}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                {summaryContent.studyNotesCtaBody || "Open the Study Notes for verse-by-verse explanations, themes, context, and deeper study tools."}
              </p>
              {deepNotesMarkdown ? (
                <button
                  type="button"
                  onClick={() => openBibleYearDeepNotes(day.dayNumber)}
                  className="bible-year-deep-notes-dance mt-3 w-full rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_34%,var(--bb-card-border,#dbe7f4))] bg-[linear-gradient(135deg,var(--bb-card,#ffffff),color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_78%,var(--bb-card,#ffffff)))] px-4 py-3 text-sm font-black text-[var(--bb-accent,#2f7fe8)] shadow-sm transition hover:bg-[var(--bb-accent-soft,#eaf5ff)] hover:brightness-105"
                >
                  Open Study Notes
                </button>
              ) : null}
            </div>
          </div>

          {false && bibleYearDeepNotesOpen && deepNotesMarkdown ? (
            <div className="mt-4 overflow-hidden rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-[0_18px_42px_rgba(14,26,58,0.14)]">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#dbe7f4)] px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Day {day.dayNumber} Study Notes</p>
                  <p className="truncate text-lg font-black text-[var(--bb-text-primary,#111827)]">{day.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBibleYearDeepNotesOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] text-lg font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                  aria-label="Close study notes"
                >
                  x
                </button>
              </div>
              <div className="max-h-[58dvh] overflow-y-auto px-4 py-5">
                {deepStudySections ? (
                  <BibleYearDeepStudySectionCards
                    sections={deepStudySections || []}
                    activeReference={bibleYearOpenVerseBreakdownKey}
                    onActiveReferenceChange={setBibleYearOpenVerseBreakdownKey}
                    onSectionOpen={trackSummaryStudyNotesSection}
                    intro={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.intro : undefined}
                    closing={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.closing : undefined}
                    topId={`bible-year-day-${day.dayNumber}-summary-deep-study-top`}
                  />
                ) : (
                  <ChapterNotesMarkdown>{deepNotesMarkdown || ""}</ChapterNotesMarkdown>
                )}
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => {
              if (summaryComplete) return;
              markBibleYearDayCardComplete(day, "reflection");
            }}
            disabled={summaryComplete}
            className={`mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-center shadow-sm transition ${
              summaryComplete
                ? "cursor-default border-emerald-300 bg-emerald-100 text-emerald-900"
                : "border-[var(--bb-button,#2f7fe8)] bg-[var(--bb-button,#2f7fe8)] text-[var(--bb-button-text,#ffffff)] hover:brightness-95"
            }`}
          >
            <span className="text-base font-black">{summaryComplete ? "Summary Complete" : "Mark Summary Complete"}</span>
            <span className="rounded-full bg-white/18 px-2.5 py-1 text-xs font-black">+20 XP</span>
          </button>
        </div>

        <ModalShell isOpen={Boolean(bibleYearDeepNotesOpen && deepNotesMarkdown)} onClose={() => setBibleYearDeepNotesOpen(false)}>
          <div className="w-full max-w-xl overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] text-left text-[var(--bb-text-primary,#111827)] shadow-[0_24px_70px_rgba(14,26,58,0.22)]">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] px-4 py-3">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">Day {day.dayNumber} Study Notes</p>
                <p className="truncate text-lg font-black text-[var(--bb-text-primary,#111827)]">{day.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setBibleYearDeepNotesOpen(false)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_26%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-surface-soft,#f8fbff)] text-2xl font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                aria-label="Close study notes"
              >
                x
              </button>
            </div>
            <div className="bible-year-study-notes-scroll max-h-[72dvh] overflow-y-auto px-2 py-3 sm:px-4 sm:py-5" data-bible-year-deep-notes-scroll={`day-${day.dayNumber}-summary`}>
              {deepStudySections ? (
                <BibleYearDeepStudySectionCards
                  sections={deepStudySections || []}
                  activeReference={bibleYearOpenVerseBreakdownKey}
                  onActiveReferenceChange={setBibleYearOpenVerseBreakdownKey}
                  onSectionOpen={trackSummaryStudyNotesSection}
                  intro={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.intro : undefined}
                  closing={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.closing : undefined}
                  topId={`bible-year-day-${day.dayNumber}-summary-deep-study-top`}
                />
              ) : (
                <ChapterNotesMarkdown>{deepNotesMarkdown || ""}</ChapterNotesMarkdown>
              )}
            </div>
          </div>
        </ModalShell>

        {renderBibleYearDayOneDeepNotesGiftModal()}

        {renderBibleYearDeepNotesUpgradeModal()}
        {renderBibleYearQuickUpgradeModal()}
      </div>
    );
  }

  function renderBibleYearInlineTask(card: "reading" | "trivia" | "reflection", day: GenesisBibleYearDay) {
    if (card === "reading") {
      return renderBibleYearDayOneVideoTask(day);
    }

    if (card === "trivia") {
      const triviaQuestions = bibleYearTriviaByDay[day.dayNumber] || bibleYearDayOneTrivia;
      const correctTriviaCount = triviaQuestions.filter((item) => bibleYearTriviaAnswers[item.id] === item.answer).length;
      const answeredTriviaCount = triviaQuestions.filter((item) => Boolean(bibleYearTriviaAnswers[item.id])).length;
      const triviaCardComplete = bibleYearCompletedCardsByDay[day.dayNumber]?.trivia === true;
      const triviaResultsOpen = Boolean(bibleYearTriviaResultsOpenByDay[day.dayNumber]) || triviaCardComplete;
      const currentQuestionIndex = Math.min(
        bibleYearTriviaQuestionIndexByDay[day.dayNumber] || 0,
        triviaQuestions.length - 1,
      );
      const currentQuestion = triviaQuestions[currentQuestionIndex];
      const selectedAnswer = currentQuestion ? bibleYearTriviaAnswers[currentQuestion.id] : null;
      const selectedAnswerIsCorrect = Boolean(currentQuestion && selectedAnswer === currentQuestion.answer);
      const isLastTriviaQuestion = currentQuestionIndex >= triviaQuestions.length - 1;
      const resultPercent = triviaQuestions.length ? Math.round((correctTriviaCount / triviaQuestions.length) * 100) : 0;
      const missedQuestions = triviaQuestions.filter((item) => bibleYearTriviaAnswers[item.id] && bibleYearTriviaAnswers[item.id] !== item.answer);

      if (triviaResultsOpen) {
        return (
          <div className="px-4 pb-4">
            <div className="dashboard-inline-task rounded-[24px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_34%,var(--bb-card-border,#dbe7f4))] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_88%,transparent),color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_58%,transparent))] p-4 shadow-[0_16px_36px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_20%,transparent)]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Trivia Results</p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-4xl font-black leading-none text-[var(--bb-text-primary,#111827)]">{resultPercent}%</p>
                  <p className="mt-1 text-sm font-black text-[var(--bb-text-secondary,#4b5563)]">
                    {correctTriviaCount} of {triviaQuestions.length} right
                  </p>
                </div>
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[var(--bb-accent,#2f7fe8)] text-2xl text-[var(--bb-button-text,#ffffff)] shadow-[0_0_24px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_48%,transparent)]" aria-hidden="true">
                  {triviaCardComplete ? "✓" : "🎯"}
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {missedQuestions.length ? (
                  missedQuestions.map((item) => (
                    <div key={`missed-${item.id}`} className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-3">
                      <p className="text-sm font-black text-rose-950">{item.question}</p>
                      <p className="mt-1 text-xs font-bold text-rose-800">Correct answer: {item.answer}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-rose-800/80">{getBibleYearTriviaFeedback(item, bibleYearTriviaAnswers[item.id] || null)}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-3">
                    <p className="text-sm font-black text-emerald-950">Perfect round. You remembered the lesson well.</p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!triviaCardComplete) markBibleYearDayCardComplete(day, "trivia");
                  if (triviaCardComplete) setActiveBibleYearDayCard(null);
                  setBibleYearTriviaResultsOpenByDay((current) => ({ ...current, [day.dayNumber]: false }));
                }}
                className="mt-4 w-full rounded-2xl bg-[var(--bb-button,#2f7fe8)] px-5 py-3.5 text-base font-black text-[var(--bb-button-text,#ffffff)] shadow-[0_14px_30px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,transparent)] transition hover:brightness-95"
              >
                {triviaCardComplete ? "Close Results" : "Close Results and Complete Trivia"}
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="px-4 pb-4">
          <div className="dashboard-inline-task">
            <p className="text-sm font-black leading-6 text-[var(--bb-accent,#2f7fe8)]">
              {answeredTriviaCount === triviaQuestions.length
                ? `You got ${correctTriviaCount} of ${triviaQuestions.length} right.`
                : `Question ${currentQuestionIndex + 1} of ${triviaQuestions.length}`}
            </p>
            {currentQuestion ? (
              <div className="mt-4">
                <p className="text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">{currentQuestion.question}</p>
                <div className="mt-3 grid gap-2">
                  {getStableBibleYearTriviaOptions(currentQuestion.id, currentQuestion.options, currentQuestion.answer).map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = Boolean(selectedAnswer && option === currentQuestion.answer);
                    const isWrongSelection = Boolean(selectedAnswer && isSelected && option !== currentQuestion.answer);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setBibleYearTriviaAnswers((current) => ({ ...current, [currentQuestion.id]: option }))}
                        disabled={Boolean(selectedAnswer)}
                        className={`rounded-2xl border px-3 py-3 text-left text-sm font-bold transition ${
                          isCorrect
                            ? "border-emerald-400 bg-emerald-100 text-emerald-950"
                            : isWrongSelection
                              ? "border-rose-400 bg-rose-100 text-rose-950"
                            : "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-secondary,#4b5563)] hover:border-[var(--bb-accent,#2f7fe8)]"
                        } disabled:opacity-100`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {selectedAnswer ? (
                  <div className="mt-4 border-t border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_74%,transparent)] pt-4">
                    <p className={`text-sm font-black ${selectedAnswerIsCorrect ? "text-emerald-700" : "text-rose-700"}`}>
                      {selectedAnswerIsCorrect ? "Correct" : "Not quite"}
                    </p>
                    <p className="mt-2 text-sm font-black text-[var(--bb-text-primary,#111827)]">
                      Answer: {currentQuestion.answer}
                    </p>
                    {currentQuestion.verse ? (
                      <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-accent,#2f7fe8)]">
                        {currentQuestion.verse}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                      {getBibleYearTriviaFeedback(currentQuestion, selectedAnswer)}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  setBibleYearTriviaQuestionIndexByDay((current) => ({
                    ...current,
                    [day.dayNumber]: Math.max(0, currentQuestionIndex - 1),
                  }))
                }
                disabled={currentQuestionIndex === 0}
                className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-2.5 text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:border-[var(--bb-accent,#2f7fe8)] disabled:cursor-not-allowed disabled:opacity-45"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!selectedAnswer) return;
                  if (isLastTriviaQuestion) {
                    setBibleYearTriviaResultsOpenByDay((current) => ({ ...current, [day.dayNumber]: true }));
                    return;
                  }
                  setBibleYearTriviaQuestionIndexByDay((current) => ({
                    ...current,
                    [day.dayNumber]: Math.min(triviaQuestions.length - 1, currentQuestionIndex + 1),
                  }));
                }}
                disabled={!selectedAnswer}
                className="rounded-full bg-[var(--bb-button,#2f7fe8)] px-5 py-2.5 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isLastTriviaQuestion ? "See Results" : "Next"}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return renderBibleYearSummaryTask(day);
  }

  function renderBibleYearOptionalDiscussion(day: GenesisBibleYearDay) {
    const reflectionPrompt = bibleYearReflectionPromptByDay[day.dayNumber] || "What stood out to you from today's lesson?";

    return (
      <div className="mt-4 rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 text-left shadow-sm">
        <h3 className="mt-1 text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Join Day {day.dayNumber} Discussion</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
          Share a thought, read what others noticed, or simply keep going privately.
        </p>
        <div className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_22%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-surface-soft,#f8fbff)] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Reflection Question</p>
          <p className="mt-2 text-base font-black leading-6 text-[var(--bb-text-primary,#111827)]">{reflectionPrompt}</p>
        </div>
        <div className="mt-3 rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_10%,var(--bb-card,#ffffff))] px-4 py-3">
          <p className="text-sm font-black leading-5 text-[var(--bb-text-primary,#111827)]">
            Post your reflection when you are ready.
          </p>
          <p className="mt-1 text-xs font-bold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
            This keeps discussion tied to the daily Scripture instead of a separate community feed.
          </p>
        </div>
        <div className="mt-4">
          <CommentSection
            articleSlug={getBibleYearReflectionSlug(day)}
            headingText=""
            placeholderText="Respond to today's reflection question"
            submitButtonText="Send"
            variant="plain"
            onPosted={() => {
              markBibleYearReflectionPosted(day);
              void logBibleYearDiscussionParticipation(day);
            }}
            onUserHasPosted={() => markBibleYearReflectionPosted(day)}
          />
        </div>
      </div>
    );
  }

  function renderBibleYearReflectionReviewButton(day: GenesisBibleYearDay) {
    const reflectionPosted = bibleYearReflectionPostedByDay[day.dayNumber] === true;
    const discussionOpen = bibleYearOptionalDiscussionDay === day.dayNumber;

    return (
      <div className="rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 text-center shadow-sm">
        <button
          type="button"
          onClick={() => setBibleYearOptionalDiscussionDay((current) => current === day.dayNumber ? null : day.dayNumber)}
          className={
            reflectionPosted
              ? "w-full rounded-2xl border border-emerald-300 bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-600"
              : "w-full rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)] shadow-sm transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
          }
          aria-expanded={discussionOpen}
        >
          {reflectionPosted ? "Reflection Posted" : `Join Day ${day.dayNumber} Discussion`}
        </button>
        <p className="mt-2 text-xs font-bold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
          Click to open the reflection section.
        </p>
        {discussionOpen ? renderBibleYearOptionalDiscussion(day) : null}
      </div>
    );
  }

  function renderBibleYearCompletedDayPanel(day: GenesisBibleYearDay) {
    const nextDay = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((seriesDay) => seriesDay.dayNumber === day.dayNumber + 1);
    const usesSimpleDailyFlow = true;
    const reflectionPosted = bibleYearReflectionPostedByDay[day.dayNumber] === true;

    return (
      <div className="completion-panel-enter rounded-[26px] border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_88%,transparent)] p-5 text-center shadow-[0_16px_42px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,transparent)] backdrop-blur">
        <h2 className="text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
          {usesSimpleDailyFlow ? `Great job! You completed Day ${day.dayNumber}.` : `Congrats, you finished Day ${day.dayNumber}!`}
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
          {usesSimpleDailyFlow ? "Choose what you'd like to do next." : `You completed the reading, trivia, and reflection for ${day.title}.`}
        </p>

        {nextDay ? (
          freeUserCanOpenBibleYearDayTasks(nextDay) ? (
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => void handleContinueToNextBibleYearDay(day, nextDay)}
                disabled={continuingBibleYearDay === day.dayNumber}
                className="w-full rounded-2xl bg-[var(--bb-button,#2f7fe8)] px-5 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
              >
                {continuingBibleYearDay === day.dayNumber ? "Saving..." : `Continue to Day ${nextDay.dayNumber}${usesSimpleDailyFlow ? "" : ` "${nextDay.title}"`}`}
              </button>
              {usesSimpleDailyFlow ? (
                <button
                  type="button"
                  onClick={() => setBibleYearOptionalDiscussionDay((current) => current === day.dayNumber ? null : day.dayNumber)}
                  className={
                    reflectionPosted
                      ? "w-full rounded-2xl border border-emerald-300 bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-600"
                      : "w-full rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)] shadow-sm transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                  }
                  aria-expanded={bibleYearOptionalDiscussionDay === day.dayNumber}
                >
                  {reflectionPosted ? "Reflection Posted" : `Join Day ${day.dayNumber} Discussion`}
                </button>
              ) : null}
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#6b7280)]">Day {nextDay.dayNumber} opens in</p>
                <p className="mt-1 text-2xl font-black text-[var(--bb-text-primary,#111827)]">{freePlanCountdown}</p>
              </div>
              <Link
                href="/upgrade"
                className="inline-flex w-full justify-center rounded-2xl bg-[var(--bb-button,#2f7fe8)] px-5 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
              >
                Upgrade to Pro to skip ahead
              </Link>
            </div>
          )
        ) : (
          <button
            type="button"
            onClick={openBibleYearSeriesDashboard}
            className="mt-5 w-full rounded-2xl bg-[var(--bb-button,#2f7fe8)] px-5 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
          >
            Back to Plan
          </button>
        )}
        {usesSimpleDailyFlow && bibleYearOptionalDiscussionDay === day.dayNumber ? renderBibleYearOptionalDiscussion(day) : null}
      </div>
    );
  }

  function renderBibleYearCompletionModal() {
    if (!bibleYearCompletionModalDay) return null;

    const day = bibleYearCompletionModalDay;
    const nextDay = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((seriesDay) => seriesDay.dayNumber === day.dayNumber + 1);
    const continueLabel = nextDay ? `Continue to Day ${nextDay.dayNumber}` : "Finish Plan";

    return (
      <ModalShell isOpen={true} onClose={() => setBibleYearCompletionModalDay(null)} backdropColor="bg-black/70" closeOnBackdrop={false}>
        <div className="mx-4 w-full max-w-xl overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 shadow-2xl">
          <div className="rounded-[22px] bg-[var(--bb-accent-soft,#eaf5ff)] px-5 py-6 text-center">
            <div className="mx-auto mb-4 flex justify-center">
              <LouisAvatar mood="stareyes" size={104} />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Bible in One Year</p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
              You finished Day {day.dayNumber}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
              Reading, trivia, and summary are complete. Press Continue when you are ready to move forward.
            </p>
            <button
              type="button"
              onClick={() => handleBibleYearCompletionModalContinue(day)}
              disabled={continuingBibleYearDay === day.dayNumber}
              className="mt-6 w-full rounded-2xl bg-[var(--bb-button,#2f7fe8)] px-5 py-4 text-base font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
            >
              {continuingBibleYearDay === day.dayNumber ? "Saving..." : continueLabel}
            </button>
          </div>
        </div>
      </ModalShell>
    );
  }

  function renderBibleYearCompletedTasksPanel(day: GenesisBibleYearDay) {
    const completedTasksForDay = buildBibleYearDayTasks(day).filter((task) => task.done);
    const requiredTasksCount = getBibleYearRequiredCardKeys(day).length;
    const dayFullyComplete = completedTasksForDay.length >= requiredTasksCount;
    const isExpanded = bibleYearCompletedTasksExpandedDay === day.dayNumber;
    const isReceivingTask = !isExpanded && bibleYearCompletionAnimation?.dayNumber === day.dayNumber;
    const rewardToast = bibleYearRewardToast?.dayNumber === day.dayNumber ? bibleYearRewardToast : null;

    return (
      <div
        className={`relative rounded-2xl border backdrop-blur ${
          dayFullyComplete
            ? "bible-year-completed-tasks-celebrate overflow-visible border-emerald-400/70 bg-[linear-gradient(135deg,rgba(13,148,80,0.28),color-mix(in_srgb,var(--bb-card,#ffffff)_78%,transparent))] shadow-[0_0_28px_rgba(16,185,129,0.28),0_18px_44px_rgba(0,0,0,0.24)]"
            : "overflow-hidden border-[var(--bb-card-border,#b9dcf4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_82%,transparent)] shadow-[0_12px_30px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_14%,transparent)]"
        } ${isReceivingTask ? "bible-year-completed-tasks-receive" : ""}`}
        style={dayFullyComplete && isExpanded ? { animation: "none" } : undefined}
      >
        {isReceivingTask ? (
          <div className="task-smoke pointer-events-none absolute left-1/2 top-1/2 z-30" aria-hidden="true">
            <span className="absolute h-8 w-8 rounded-full bg-white/55 [--smoke-x:-44px] [--smoke-y:-20px]" />
            <span className="absolute h-7 w-7 rounded-full bg-emerald-100/50 [--smoke-x:38px] [--smoke-y:-24px]" />
            <span className="absolute h-6 w-6 rounded-full bg-white/45 [--smoke-x:-18px] [--smoke-y:32px]" />
            <span className="absolute h-7 w-7 rounded-full bg-emerald-200/45 [--smoke-x:30px] [--smoke-y:30px]" />
          </div>
        ) : null}
        {rewardToast ? (
          <div className="bible-year-reward-pop pointer-events-none absolute -top-4 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-300 px-4 py-2 text-xs font-black text-emerald-950 shadow-[0_0_28px_rgba(16,185,129,0.55)]">
            {rewardToast.text}
          </div>
        ) : null}
        {dayFullyComplete && !isExpanded ? (
          <>
            <div className="bible-year-completed-task-fireworks pointer-events-none absolute inset-0 z-0" aria-hidden="true">
              <span className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-emerald-300 [--fx-x:-34px] [--fx-y:-28px] [--fx-r:120deg]" />
              <span className="absolute left-[16%] top-[74%] h-2 w-3 rounded-sm bg-amber-300 [--fx-x:-46px] [--fx-y:26px] [--fx-r:-160deg]" />
              <span className="absolute left-[50%] top-[-4%] h-2 w-2 rounded-full bg-lime-300 [--fx-x:4px] [--fx-y:-42px] [--fx-r:190deg]" />
              <span className="absolute right-[12%] top-[16%] h-2 w-3 rounded-sm bg-cyan-300 [--fx-x:42px] [--fx-y:-32px] [--fx-r:-120deg]" />
              <span className="absolute right-[8%] top-[78%] h-3 w-2 rounded-sm bg-emerald-300 [--fx-x:48px] [--fx-y:28px] [--fx-r:170deg]" />
              <span className="absolute left-[72%] top-[54%] h-2 w-2 rounded-full bg-yellow-300 [--fx-x:26px] [--fx-y:46px] [--fx-r:-210deg]" />
            </div>
            <div className="bible-year-completed-task-stars pointer-events-none absolute inset-y-0 left-0 right-0 z-20" aria-hidden="true">
              <span className="absolute -left-2 top-3 text-[13px] text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">âœ¦</span>
              <span className="absolute left-7 -top-1 text-[9px] text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]">âœ§</span>
              <span className="absolute -left-3 bottom-4 text-[10px] text-white/95 drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]">âœ¦</span>
              <span className="absolute -right-2 top-4 text-[13px] text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">âœ¦</span>
              <span className="absolute right-8 -top-1 text-[9px] text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]">âœ§</span>
              <span className="absolute -right-3 bottom-3 text-[10px] text-white/95 drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]">âœ¦</span>
            </div>
          </>
        ) : null}
        <button
          type="button"
          onClick={() => {
            if (dayFullyComplete) {
              setBibleYearCompletedTasksExpandedDay((current) => current === day.dayNumber ? null : day.dayNumber);
              setActiveBibleYearDayCard(null);
              return;
            }
            setBibleYearCompletedTasksExpandedDay((current) => current === day.dayNumber ? null : day.dayNumber);
            setActiveBibleYearDayCard(null);
          }}
          className={`relative z-10 flex w-full items-center gap-3 px-4 py-3 text-left transition ${
            dayFullyComplete ? "hover:bg-emerald-400/10" : "hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_46%,transparent)]"
          }`}
          aria-expanded={isExpanded}
        >
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black ${
            dayFullyComplete ? "bg-emerald-400 text-emerald-950 shadow-[0_0_18px_rgba(16,185,129,0.65)]" : "bg-[var(--bb-accent-soft,#eaf5ff)] text-[var(--bb-accent,#2f7fe8)]"
          }`} aria-hidden="true">
            {dayFullyComplete ? "âœ“" : completedTasksForDay.length}
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block truncate text-sm font-black ${dayFullyComplete ? "text-emerald-950 dark:text-emerald-100" : "text-[var(--bb-text-primary,#111827)]"}`}>
              {dayFullyComplete ? `Day ${day.dayNumber} Complete` : "Completed Tasks"}
            </span>
            <span className={`mt-0.5 block text-[11px] font-bold ${dayFullyComplete ? "text-emerald-900 dark:text-emerald-100/85" : "text-[var(--bb-text-secondary,#2f6685)]"}`}>
              {dayFullyComplete ? "All tasks done" : `${completedTasksForDay.length} of ${requiredTasksCount} tasks done`}
            </span>
          </span>
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
            dayFullyComplete
              ? `border-emerald-300 text-emerald-950 ${isExpanded ? "rotate-180 bg-emerald-300" : "bg-emerald-200/80"}`
              : `border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,transparent)] text-[var(--bb-accent,#2f7fe8)] ${isExpanded ? "rotate-180 bg-[var(--bb-accent-soft,#eaf5ff)]" : "bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_78%,transparent)]"}`
          }`} aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
        {isExpanded ? (
        <div className={`relative z-10 grid gap-2 border-t px-3 pb-3 pt-3 ${dayFullyComplete ? "border-emerald-300/50" : "border-[var(--bb-card-border,#b9dcf4)]"}`}>
          {completedTasksForDay.length === 0 ? (
            <div className="rounded-xl border border-[color-mix(in_srgb,var(--bb-card-border,#b9dcf4)_70%,transparent)] bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_45%,transparent)] px-3 py-3">
              <p className="text-xs font-black text-[var(--bb-text-primary,#1f2937)]">0 completed yet</p>
              <p className="mt-1 text-[11px] font-bold leading-4 text-[var(--bb-text-muted,#6b7280)]">
                Finish a task above and it will move here.
              </p>
            </div>
          ) : null}
          {completedTasksForDay.map((task, index) => {
            const taskCard = getBibleYearDayTaskKey(task);
            const isActiveCompletedTask = taskCard ? activeBibleYearDayCard === taskCard : false;
            const taskCopy = getTaskCardCopy(task, index);
            return (
              <div
                key={`bible-year-completed-${task.kind}`}
                className={`overflow-hidden rounded-xl border transition ${
                  isActiveCompletedTask
                    ? "border-[var(--bb-accent,#2f7fe8)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_92%,var(--bb-accent-soft,#eaf5ff))] shadow-[0_10px_24px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,transparent)]"
                    : "border-[var(--bb-card-border,#b9dcf4)] bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_66%,transparent)] hover:border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_62%,transparent)] hover:bg-[var(--bb-accent-soft,#eaf5ff)] hover:shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!taskCard) return;
                    setActiveBibleYearDayCard((current) => {
                      const next = current === taskCard ? null : taskCard;
                      if (next) void logBibleYearTaskStarted(day, taskCard);
                      return next;
                    });
                  }}
                  className="group flex min-h-10 w-full items-center gap-2 px-3 py-2 text-left transition"
                  aria-expanded={isActiveCompletedTask}
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[var(--bb-button,var(--bb-accent,#7BAFD4))] text-[11px] font-black text-[var(--bb-button-text,#ffffff)] shadow-sm" aria-hidden="true">
                    âœ“
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-black text-[var(--bb-text-primary,#1f2937)]">
                    {taskCopy.title}
                  </span>
                  <span className="whitespace-nowrap text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                    {task.completedAtLabel || "Completed"}
                  </span>
                </button>
                {isActiveCompletedTask && taskCard ? (
                  <div className="border-t border-[var(--bb-card-border,#b9dcf4)] px-3 pb-3 pt-3">
                    {renderBibleYearInlineTask(taskCard, day)}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        ) : null}
      </div>
    );
  }

  function renderBibleYearHomeProgressSnapshot(day: GenesisBibleYearDay) {
    const report = effectiveBibleYearReport;
    const overallPercent = report?.overallPercent ?? 0;
    const expectedFinishDateLabel = report?.expectedFinishDateLabel ?? "Calculating";
    const startDateLabel = report?.startDateLabel ?? bibleYearSchedule.startDateLabel;
    const statusLabel = report?.statusLabel ?? "On pace";
    const statusMatch = statusLabel.match(/(\d+)\s+days?\s+(ahead|behind)/i);
    const statusDirection = report?.statusDirection ?? (statusMatch?.[2]?.toLowerCase() as "ahead" | "behind" | undefined) ?? "on-track";
    const statusDays = report?.statusDays ?? (statusMatch ? Number(statusMatch[1]) : 0);
    const statusStat = statusDirection === "ahead" && statusDays > 0
      ? {
          value: `+${statusDays} ${statusDays === 1 ? "day" : "days"}`,
          hint: "ahead",
        }
      : statusDirection === "behind" && statusDays > 0
      ? {
          value: `-${statusDays} ${statusDays === 1 ? "day" : "days"}`,
          hint: "behind",
        }
      : { value: "On track", hint: "today" };

    const snapshotStats = [
      { label: "Current Day", value: `${report?.currentDay ?? day.dayNumber}`, hint: "Today" },
      { label: "Status", value: statusStat.value, hint: statusStat.hint },
      { label: "Started", value: startDateLabel, hint: "Start date" },
      { label: "Finish", value: expectedFinishDateLabel, hint: "Expected" },
    ];

    return (
      <button
        type="button"
        onClick={() => setShowBibleProgressDetails(true)}
        data-bb-dashboard-tour="bible-progress"
        className="block w-full overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,var(--bb-card-border,#dbe7f4))] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--bb-card,#ffffff)_92%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_78%,transparent))] p-4 text-left shadow-[0_14px_34px_rgba(14,26,58,0.10),0_0_24px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_8%,transparent)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(14,26,58,0.14)]"
        aria-label="Open Bible progress details"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Bible Progress</p>
            <h1 className="mt-1 text-3xl font-black leading-none text-[var(--bb-text-primary,#111827)]">
              {overallPercent}% of the Bible studied
            </h1>
            <p className="mt-2 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
              You are on Day {report?.currentDay ?? day.dayNumber}. Finish today&apos;s 3 tasks to move forward.
            </p>
          </div>
          <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_26%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] text-[var(--bb-accent,#2f7fe8)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--bb-progress-track,#dbe7f4)]">
          <div
            className="h-full rounded-full bg-[var(--bb-progress-fill,var(--bb-accent,#2f7fe8))] transition-all duration-700"
            style={{ width: `${overallPercent}%` }}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {snapshotStats.map((stat) => (
            <div
              key={stat.label}
              className="min-h-[74px] rounded-2xl border border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_74%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_76%,transparent)] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[var(--bb-text-muted,#6b7280)]">{stat.label}</p>
              <p className="mt-1 break-words text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">{stat.value}</p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--bb-accent,#2f7fe8)]">{stat.hint}</p>
            </div>
          ))}
        </div>
      </button>
    );
  }

  function renderHomeSupportStatsStrip() {
    const currentStreak = effectiveBibleYearReport.currentStreak ?? Math.max(0, profile?.current_streak ?? 0);
    const streakLabel = `${currentStreak} ${currentStreak === 1 ? "Day" : "Days"}`;
    const lightThemeUsesClassicFlame =
      typeof document !== "undefined" &&
      document.documentElement.dataset.bbTheme === "light" &&
      normalizePremiumSkinId(document.documentElement.dataset.bbBasicSkin || document.documentElement.dataset.bbSkin) === "none";

    return (
      <section data-bb-dashboard-tour="daily-streak" className="overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,var(--bb-card-border,#dbe7f4))] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--bb-card,#ffffff)_94%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_78%,transparent))] p-5 shadow-[0_14px_34px_rgba(14,26,58,0.10),0_0_24px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_8%,transparent)] backdrop-blur-xl">
        <button
          type="button"
          onClick={onOpenStreakInfo}
          className="flex w-full items-center gap-4 text-left"
        >
          <span className="grid h-24 w-24 shrink-0 place-items-center rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_22%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_84%,transparent)] shadow-[0_10px_24px_rgba(14,26,58,0.08)]">
            <StreakFlameEmoji flameId={lightThemeUsesClassicFlame ? "default" : profile?.selected_streak_flame} currentStreak={currentStreak} size={66} title={`${currentStreak} day streak - tap to learn what the flame means`} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Daily Streak</span>
            <span className="mt-1 block text-4xl font-black leading-none text-[var(--bb-text-primary,#111827)]">{streakLabel}</span>
            <span className="mt-2 block text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
              Keep opening Scripture and building your daily rhythm.
            </span>
          </span>
        </button>
      </section>
    );
  }

  function renderBibleProgressDetailsModal() {
    const report = effectiveBibleYearReport;
    const currentStreak = report?.currentStreak ?? Math.max(0, profile?.current_streak ?? 0);
    const expectedFinishDateLabel = report?.expectedFinishDateLabel ?? "Calculating";
    const startDateLabel = report?.startDateLabel ?? bibleYearSchedule.startDateLabel;
    const overallPercent = Math.max(0, Math.min(100, Math.round(report?.overallPercent ?? 0)));
    const currentDay = Math.max(1, Math.min(365, report?.currentDay ?? getCurrentBibleYearSeriesDayNumber()));
    const dayProgressPercent = Math.max(0, Math.min(100, Math.round((currentDay / 365) * 100)));
    const remainingDays = Math.max(0, 365 - currentDay);
    const statusLabel = report?.statusLabel ?? "On track";
    const statusDirection = report?.statusDirection ?? "on-track";
    const progressMessages = overallPercent < 5
      ? ["You're building a daily habit of understanding God's Word.", "Your journey through Scripture is just beginning."]
      : overallPercent < 10
        ? ["Small daily steps lead to lasting spiritual growth.", "Keep going. Every day in God's Word matters."]
        : overallPercent < 20
          ? ["You're creating consistency that will transform your understanding of Scripture.", "Your Bible rhythm is getting stronger."]
          : overallPercent < 30
            ? ["You're moving deeper into God's Word one day at a time.", "Every chapter is helping the bigger story come alive."]
            : overallPercent < 40
              ? ["Your consistency is becoming a lifestyle.", "You're building a steady rhythm centered around Scripture."]
              : overallPercent < 50
                ? ["You've already gone farther than most people ever do.", "Stay with it. You're seeing more of the whole Bible story."]
                : overallPercent < 60
                  ? ["You're halfway through an incredible journey through Scripture.", "Halfway through, and still growing in God's Word."]
                  : overallPercent < 80
                    ? ["You're deep into the story of Scripture now.", "Your steady faithfulness is carrying you forward."]
                    : ["You're nearing the finish of a beautiful journey through God's Word.", "Keep showing up. The full story is coming together."];
    const topMessage = progressMessages[(currentDay + currentStreak) % progressMessages.length];
    const paceMessages =
      statusDirection === "ahead"
        ? ["Great job! You're ahead of schedule.", "Your consistency is paying off.", "You're building incredible momentum."]
        : statusDirection === "behind"
          ? ["A small step today gets you back on track.", "Consistency matters more than perfection.", "Keep going. Every day counts."]
          : ["You're making steady progress.", "You're right where you need to keep moving.", "Stay steady. The rhythm is working."];
    const paceMessage = paceMessages[(currentDay + overallPercent) % paceMessages.length];
    const bottomMessages = [
      "Stay consistent. God's Word changes lives.",
      "Every chapter brings deeper understanding.",
      "Small faithful steps create lasting transformation.",
      "You're building a rhythm centered around Scripture.",
      "Keep showing up. Growth happens daily.",
    ];
    const bottomMessage = bottomMessages[(currentStreak + currentDay) % bottomMessages.length];

    async function shareBibleYearProgress() {
      if (typeof window === "undefined") return;
      const shareText = `Here's my Bible in One Year progress on BibleBuddy.\n\n${overallPercent}% of the Bible studied\n${currentStreak} Day Streak\nDay ${currentDay} of 365\n\n${topMessage}\n\nGet your own journey started: mybiblebuddy.net`;
      const shareUrl = window.location.origin;
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share({ title: "My Bible in One Year Progress", text: shareText, url: shareUrl });
          return;
        } catch {
          // Fall through to clipboard.
        }
      }
      try {
        await navigator.clipboard?.writeText(`${shareText}\n${shareUrl}`);
      } catch {
        window.location.href = `sms:?&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
      }
    }

    return (
      <ModalShell
        isOpen={showBibleProgressDetails}
        onClose={() => setShowBibleProgressDetails(false)}
        backdropColor="bg-black/35"
        scrollable={true}
        zIndex="z-[75]"
      >
        <div className="w-full max-w-[460px] overflow-hidden rounded-[24px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-primary,#111827)] shadow-[0_20px_56px_rgba(14,26,58,0.16)]">
          <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-4 sm:px-5">
            <h2 className="text-lg font-black">Bible in One Year Progress</h2>
            <button
              type="button"
              onClick={() => setShowBibleProgressDetails(false)}
              className="grid h-8 w-8 place-items-center rounded-full text-xl font-light text-[var(--bb-text-secondary,#4b5563)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
              aria-label="Close progress details"
            >
              x
            </button>
          </div>

          <div className="grid gap-3 p-4 sm:p-5">
            <div className="grid items-center gap-4 rounded-[20px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_16%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_28%,var(--bb-card,#ffffff))] p-4 sm:grid-cols-[128px_1fr]">
              <div className="mx-auto grid h-32 w-32 place-items-center rounded-full" style={{ background: `conic-gradient(var(--bb-accent,#2f7fe8) ${overallPercent}%, var(--bb-progress-track,#e5e7eb) 0)` }}>
                <div className="grid h-[102px] w-[102px] place-items-center rounded-full bg-[var(--bb-card,#ffffff)] text-center shadow-inner">
                  <span>
                    <span className="block text-3xl font-black text-[var(--bb-accent,#2f7fe8)]">{overallPercent}%</span>
                    <span className="block text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">Studied</span>
                  </span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] text-3xl sm:mx-0" aria-hidden="true">🌱</div>
                <p className="mt-2 text-base font-black leading-6 text-[var(--bb-text-primary,#111827)]">{topMessage}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">Keep going. Every day matters.</p>
              </div>
            </div>

            <div className="rounded-[18px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_16%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_28%,var(--bb-card,#ffffff))] p-3">
              <div className="flex items-center gap-3">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] text-3xl" aria-hidden="true">🔥</span>
                <span className="min-w-0 flex-1">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#6b7280)]">Daily Streak</p>
                <span className="mt-0.5 block text-3xl font-black leading-none text-[var(--bb-accent,#2f7fe8)]">{currentStreak}</span>
                <span className="mt-0.5 block text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">{currentStreak === 1 ? "day" : "days"}</span>
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,transparent)] text-[var(--bb-accent,#2f7fe8)]" aria-hidden="true">📅</span>
              </div>
            </div>

            <div className="rounded-[20px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] p-4 shadow-[0_10px_24px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_7%,transparent)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-black text-[var(--bb-text-primary,#111827)]">Bible in One Year Progress</p>
                <p className="rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] px-2.5 py-1 text-[11px] font-black text-[var(--bb-accent,#2f7fe8)]">{statusLabel}</p>
              </div>
              <p className="mt-3 text-xl font-black text-[var(--bb-accent,#2f7fe8)]">Day {currentDay} of 365</p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--bb-progress-track,#dbe7f4)]">
                <div className="h-full rounded-full bg-[var(--bb-progress-fill,var(--bb-accent,#2f7fe8))]" style={{ width: `${dayProgressPercent}%` }} />
              </div>
              <p className="mt-2 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">{report?.statusDetail}</p>
              <div className="mt-2 flex items-center justify-between gap-3 text-xs font-semibold text-[var(--bb-text-secondary,#4b5563)]">
                <span>{dayProgressPercent}% completed</span>
                <span>{remainingDays} days remaining</span>
              </div>
              <div className="mt-3 rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_32%,var(--bb-card,#ffffff))] p-3">
                <div className="flex gap-2.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--bb-card,#ffffff)] text-xl" aria-hidden="true">🙂</span>
                  <span>
                    <span className="block text-sm font-black text-[var(--bb-accent,#2f7fe8)]">{paceMessage}</span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">Consistency today leads to transformation tomorrow.</span>
                  </span>
                </div>
              </div>
              <div className="mt-3 border-t border-[var(--bb-card-border,#dbe7f4)] pt-3 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
                Started: <span className="font-black text-[var(--bb-accent,#2f7fe8)]">{startDateLabel}</span>
              </div>
              <div className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
                Expected Finish: <span className="font-black text-[var(--bb-accent,#2f7fe8)]">{expectedFinishDateLabel}</span>
              </div>
            </div>

            <div className="rounded-[20px] border border-[color-mix(in_srgb,#f0b84d_26%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,#fff7e6_42%,var(--bb-card,#ffffff))] p-3">
              <div className="flex items-center gap-3">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] text-3xl" aria-hidden="true">🌱</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-black text-[var(--bb-text-primary,#111827)]">You're making progress!</span>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">{bottomMessage}</span>
                </span>
                <span className="text-3xl text-[#f0b84d]" aria-hidden="true">✦</span>
              </div>
            </div>

            <button type="button" onClick={shareBibleYearProgress} className="rounded-2xl bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-5 py-3.5 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-[0_12px_24px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_20%,transparent)] transition hover:brightness-95">
              Share Your Progress
            </button>
          </div>
        </div>
      </ModalShell>
    );
  }

  function renderDashboardTaskCards(tasksToRender: TaskState[]) {
    return tasksToRender.map((task, index) => {
      const originalTaskIndex = tasksToRender.findIndex((visibleTask) => visibleTask.kind === task.kind);
      const bibleYearTaskCard = activeBibleYearDashboardDay ? getBibleYearDayTaskKey(task) : null;
      const fixedBibleYearTaskIndex =
        activeBibleYearDashboardDay && bibleYearTaskCard
          ? getBibleYearRequiredCardKeys(activeBibleYearDashboardDay).indexOf(bibleYearTaskCard)
          : -1;
      const taskIndex = fixedBibleYearTaskIndex >= 0 ? fixedBibleYearTaskIndex : originalTaskIndex >= 0 ? originalTaskIndex : index;
      const taskCopy = getTaskCardCopy(task, taskIndex);
      const justCompleted = Boolean(task.done && previousDoneByKindRef.current && !previousDoneByKindRef.current[task.kind]);
      const isCelebrating = Boolean(celebratingTasks[task.kind]) || justCompleted;
      const isAbsorbingIntoCompletedTasks = Boolean(
        activeBibleYearDashboardDay &&
        bibleYearTaskCard &&
        bibleYearCompletionAnimation?.dayNumber === activeBibleYearDashboardDay.dayNumber &&
        bibleYearCompletionAnimation.card === bibleYearTaskCard,
      );
      const bibleYearOrderLocked = Boolean(
        activeBibleYearDashboardDay &&
        bibleYearTaskCard &&
        !task.done &&
        isBibleYearTaskLockedForFree(activeBibleYearDashboardDay, bibleYearTaskCard),
      );
      const isLockedByOrder =
        bibleYearOrderLocked ||
        (!activeBibleYearDashboardDay && !isPaidUser && !task.done && displayNextActionTaskIndex >= 0 && taskIndex > displayNextActionTaskIndex);
      const isCardDisabled = Boolean(task.disabled || isLockedByOrder);
      const isNextActionTask = task.kind === displayNextActionTaskKind && !isCardDisabled;
      const pointsPillLabel = task.pointsLabel;
      const activeTaskPrompt = null as ActiveTaskPrompt | null;
      const taskStatusLabel = getTaskStatusLine(task);
      const isActiveInlineTask = bibleYearTaskCard
        ? activeBibleYearDayCard === bibleYearTaskCard
        : activeTask?.kind === task.kind &&
          (activeTask.href || "") === (task.href || "") &&
          (activeTask.chapterLabel || "") === (task.chapterLabel || "");
      const keepBibleYearVideoMounted =
        bibleYearTaskCard === "reading" &&
        activeBibleYearDashboardDay?.dayNumber === bibleYearPersistentVideoDay &&
        !task.done;

      const taskShellClasses = activeBibleYearDashboardDay
        ? isCardDisabled
          ? "cursor-not-allowed border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_70%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_62%,transparent)] text-[var(--bb-text-secondary,#4b5563)] opacity-80"
          : isActiveInlineTask
            ? "border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_78%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_88%,transparent)] text-[var(--bb-text-primary,#111827)] shadow-[0_16px_34px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_20%,transparent)]"
            : "border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_82%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_74%,transparent)] text-[var(--bb-text-primary,#111827)] hover:border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_62%,transparent)] hover:bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_86%,transparent)] hover:shadow-md"
        : task.done
          ? "border-[#b9dcf4] bg-gradient-to-r from-[#eaf5ff] via-white to-[#e2f1fb] hover:bg-[#eaf5ff]"
          : isCardDisabled
            ? "cursor-not-allowed border-[#e2e8f0] bg-gradient-to-r from-white via-[#f7fbff] to-white text-gray-700 opacity-95"
            : isActiveInlineTask
              ? "border-[var(--bb-accent)] bg-[var(--bb-card)] text-[var(--bb-text-primary)] shadow-[0_16px_40px_rgba(38,63,99,0.16)]"
              : "border-[#dbe7f4] bg-gradient-to-r from-white via-[#fbfdff] to-white text-gray-700 hover:shadow-md";

      return (
      <div
        key={task.kind}
        className={`dashboard-task-shell relative w-full overflow-hidden rounded-[18px] border shadow-sm transition-all duration-300 ${
          isCelebrating ? "task-complete-pop" : ""
      } ${
          isAbsorbingIntoCompletedTasks ? "bible-year-task-absorbing" : ""
      } ${
          isNewChapterDropping ? "chapter-card-drop" : ""
        } ${
          !activeBibleYearDashboardDay && isNextActionTask && !isActiveInlineTask ? "next-task-pulse" : ""
        } ${
          activeBibleYearDashboardDay && !task.done && !isCardDisabled && !isActiveInlineTask ? "bible-year-task-soft-pulse" : ""
        } ${
          isActiveInlineTask ? "dashboard-task-shell-open" : ""
        } ${taskShellClasses}`}
        style={isNewChapterDropping ? { animationDelay: `${index * 85}ms` } : undefined}
      >
      <button
        type="button"
        onClick={() => {
          if (isCardDisabled) return;
          if (bibleYearTaskCard) {
            if (bibleYearTaskCard === "reading" && activeBibleYearDashboardDay) {
              setBibleYearPersistentVideoDay(activeBibleYearDashboardDay.dayNumber);
            }
            setActiveBibleYearDayCard((current) => current === bibleYearTaskCard ? null : bibleYearTaskCard);
            return;
          }
          onTaskClick(task);
        }}
        disabled={isCardDisabled}
        className="relative w-full px-3.5 py-3 text-left transition-all duration-300 sm:px-4"
        aria-expanded={isActiveInlineTask}
      >
        {isCardDisabled ? (
          <span
            className="absolute bottom-3 right-4 text-base opacity-70"
            aria-label="Locked"
            title={bibleYearOrderLocked && activeBibleYearDashboardDay && bibleYearTaskCard ? getBibleYearLockedTaskTitle(activeBibleYearDashboardDay, bibleYearTaskCard) : "Complete the task above to unlock this."}
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
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7BAFD4] text-xs font-black text-white ring-2 ring-white">
                âœ“
              </span>
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className={`text-[14px] font-bold leading-tight sm:text-[15px] ${activeBibleYearDashboardDay ? "text-[var(--bb-text-primary,#111827)]" : task.done ? "text-gray-950" : "text-gray-800"}`}>{taskCopy.title}</p>
                <p className={`mt-0.5 text-xs leading-4 sm:text-[13px] ${activeBibleYearDashboardDay ? "text-[var(--bb-text-secondary,#4b5563)]" : task.done ? "text-gray-700" : "text-gray-500"}`}>{taskCopy.subtitle}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
              <span className={`px-1 py-1 text-xs font-black ${activeBibleYearDashboardDay ? "text-[var(--bb-accent,#2f7fe8)]" : task.done ? "text-[#2f6685]" : "text-[#2f7fe8]"}`}>
                {pointsPillLabel}
              </span>
              <span className={`hidden ${
                task.done
                  ? "font-medium text-[#2f6685]"
                  : isNextActionTask
                    ? "start-here-flash text-gray-950 font-black tracking-wide"
                    : "font-medium text-gray-500"
              }`}>
                <span aria-hidden="true">{task.done ? "â–¡" : "â—‹"}</span>
                {task.done ? (
                  <span className="done-sparkle pointer-events-none absolute -inset-x-2 -top-3 flex justify-between text-[10px] text-amber-400" aria-hidden="true">
                    <span>âœ¦</span>
                    <span>âœ§</span>
                    <span>âœ¦</span>
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
            <div className={`mt-2 flex w-full items-center gap-3 ${activeBibleYearDashboardDay && bibleYearTaskCard ? "justify-between" : "justify-center"}`}>
              <p className="hidden">{taskCopy.subtitle}</p>
              {task.timeEstimateLabel && !(isActiveInlineTask && bibleYearTaskCard === "reading") ? (
                isCardDisabled && bibleYearOrderLocked && activeBibleYearDashboardDay && bibleYearTaskCard ? (
                  <p className="min-w-0 flex-1 truncate text-left text-[11px] font-black text-[var(--bb-text-secondary,#374151)]">
                    {getBibleYearLockedTaskTitle(activeBibleYearDashboardDay, bibleYearTaskCard)}
                  </p>
                ) :
                isActiveInlineTask && task.kind === "notes" && !task.done ? (
                  <p className="relative h-4 min-w-0 flex-1 text-left text-[11px] font-black text-[var(--bb-text-secondary,#374151)]">
                    <span className="task-estimate-primary absolute inset-0 whitespace-nowrap">
                      Takes about {task.timeEstimateLabel}
                    </span>
                    <span className="task-estimate-secondary absolute inset-0 whitespace-nowrap text-[var(--bb-accent,#2f7fe8)]">
                      Mark as completed below
                    </span>
                  </p>
                ) : (
                  <p className="min-w-0 flex-1 whitespace-nowrap text-left text-[11px] font-black text-[var(--bb-text-secondary,#374151)]">
                    Takes about {task.timeEstimateLabel}
                  </p>
                )
              ) : null}
              {activeBibleYearDashboardDay && bibleYearTaskCard ? (
                <span className="shrink-0 text-[11px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-primary,#111827)]">
                  Task {taskIndex + 1}
                </span>
              ) : null}
            </div>
          </div>
          {!isCardDisabled && !isActiveInlineTask ? (
            <span className="mt-5 shrink-0 text-xl leading-none text-[var(--bb-text-muted,#9ca3af)]" aria-hidden="true">â€º</span>
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
      {isActiveInlineTask || keepBibleYearVideoMounted ? (
        <div
          className={
            isActiveInlineTask
              ? "px-3.5 pb-3 sm:px-4"
              : "pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
          }
          aria-hidden={!isActiveInlineTask}
        >
          {bibleYearTaskCard && activeBibleYearDashboardDay ? (
            renderBibleYearInlineTask(bibleYearTaskCard, activeBibleYearDashboardDay)
          ) : (
            <DashboardDailyTaskCallout
              task={activeTask}
              userId={userId}
              onClose={onActiveTaskClose}
              onProgressUpdated={onActiveTaskProgressUpdated}
              variant="inline"
              enableDashboardSkip={isOwnerDashboard}
            />
          )}
        </div>
      ) : null}
      </div>
      );
    });
  }

  function renderBibleYearDashboardStudyArea(day: GenesisBibleYearDay, tasksToRender: TaskState[]) {
    const cover = day.coverImage || getDashboardStudyCover(day.readings[0]?.studyTitle || day.title);
    const readingSummary = day.reference || day.readings.map((reading) => `${reading.book} ${reading.chapter}`).join(", ");
    const activeTasksToRender = tasksToRender.filter((task) => !task.done);

    return (
      <section data-bible-year-study-area data-bb-dashboard-tour="study-tasks" className="dashboard-bible-year-study-area grid gap-3 rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3 shadow-[0_14px_34px_rgba(14,26,58,0.08)]">
        <div className="flex items-center gap-3 px-1 pb-1">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_32%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-accent-soft,#eaf5ff)] text-[var(--bb-accent,#2f7fe8)]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
              <path d="M8 7h8" />
              <path d="M8 11h6" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Today&apos;s Bible Study Task</p>
            <h2 className="mt-0.5 truncate text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">
              Day {day.dayNumber}: {day.title}
            </h2>
            <p className="mt-0.5 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
              {readingSummary}
            </p>
          </div>
        </div>
        <div
          className={`dashboard-current-study-card bb-skin-glow-card hidden relative rounded-[24px] border p-3 pr-12 backdrop-blur-xl ${
            dashboardAllDone
              ? "overflow-visible border-emerald-300 bg-[linear-gradient(135deg,rgba(5,150,105,0.58),rgba(6,78,59,0.56)),color-mix(in_srgb,var(--bb-card,#ffffff)_48%,transparent)] shadow-[0_0_0_2px_rgba(16,185,129,0.50),0_0_38px_rgba(16,185,129,0.55),0_20px_52px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(167,243,208,0.30)]"
              : "border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_72%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_86%,transparent)] shadow-[0_12px_30px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_12%,transparent)]"
          }`}
        >
          <div className="absolute right-3 top-3 z-20">
            <button
              type="button"
              onClick={() => {
                setBibleYearPlanMessage(null);
                setBibleYearPlanMenuOpen((open) => !open);
              }}
              className="grid h-8 w-8 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_36%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_82%,transparent)] text-[var(--bb-accent,#2f7fe8)] shadow-[0_8px_18px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_16%,transparent)] transition hover:scale-105 hover:bg-[var(--bb-accent-soft,#eaf5ff)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_42%,transparent)]"
              aria-label="Bible in One Year plan options"
              aria-expanded={bibleYearPlanMenuOpen}
              title="Plan options"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.04.04a2.15 2.15 0 0 1-3.04 3.04l-.04-.04a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.66V21.4a2.15 2.15 0 0 1-4.3 0v-.08a1.8 1.8 0 0 0-1.1-1.66 1.8 1.8 0 0 0-1.98.36l-.04.04a2.15 2.15 0 0 1-3.04-3.04l.04-.04A1.8 1.8 0 0 0 4.6 15a1.8 1.8 0 0 0-1.66-1.1H2.85a2.15 2.15 0 0 1 0-4.3h.08A1.8 1.8 0 0 0 4.6 8.5a1.8 1.8 0 0 0-.36-1.98l-.04-.04a2.15 2.15 0 0 1 3.04-3.04l.04.04a1.8 1.8 0 0 0 1.98.36 1.8 1.8 0 0 0 1.1-1.66V2.1a2.15 2.15 0 0 1 4.3 0v.08a1.8 1.8 0 0 0 1.1 1.66 1.8 1.8 0 0 0 1.98-.36l.04-.04a2.15 2.15 0 0 1 3.04 3.04l-.04.04a1.8 1.8 0 0 0-.36 1.98 1.8 1.8 0 0 0 1.66 1.1h.08a2.15 2.15 0 0 1 0 4.3h-.08A1.8 1.8 0 0 0 19.4 15Z" />
              </svg>
            </button>
            {bibleYearPlanMenuOpen ? (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_32%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_92%,rgba(0,0,0,0.58))] p-2 text-left shadow-[0_18px_38px_rgba(0,0,0,0.28),0_0_30px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_12%,transparent)] backdrop-blur-xl">
                <button
                  type="button"
                  onClick={openBibleYearSeriesDashboard}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_74%,transparent)]"
                >
                  <span>Change Plan</span>
                  <span aria-hidden="true" className="text-[var(--bb-accent,#2f7fe8)]">&gt;</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetBibleYearPlan}
                  disabled={isResettingBibleYearPlan}
                  className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-black text-[var(--bb-warning,#d97706)] transition hover:bg-[color-mix(in_srgb,var(--bb-warning,#d97706)_12%,transparent)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{isResettingBibleYearPlan ? "Resetting..." : "Reset Plan"}</span>
                  <span aria-hidden="true" className="text-xs text-[var(--bb-text-secondary,#4b5563)]">Day 1</span>
                </button>
                {bibleYearPlanMessage ? (
                  <p className="mt-2 rounded-xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,transparent)] bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_52%,transparent)] px-3 py-2 text-xs font-bold leading-4 text-[var(--bb-text-secondary,#4b5563)]">
                    {bibleYearPlanMessage}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <div className={`h-24 w-20 shrink-0 overflow-hidden rounded-2xl border p-1 shadow-[0_10px_24px_rgba(0,0,0,0.18)] ${
              dashboardAllDone
                ? "border-emerald-300/70 bg-emerald-950/30 shadow-[0_0_18px_rgba(16,185,129,0.34)]"
                : "border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_26%,transparent)] bg-[var(--bb-surface-soft,#f8fbff)]"
            }`}>
              {cover ? (
                <img src={cover} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
              ) : (
                <div className="grid h-full w-full place-items-center text-3xl">ðŸ“–</div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-[10px] font-black uppercase tracking-[0.16em] ${dashboardAllDone ? "text-emerald-300" : "text-[var(--bb-accent,#2f7fe8)]"}`}>
                Day {day.dayNumber}{dashboardAllDone ? " Complete" : ""}
              </p>
              <h2 className={`mt-1 text-xl font-black leading-tight sm:text-2xl ${dashboardAllDone ? "text-emerald-50" : "text-[var(--bb-text-primary,#111827)]"}`}>{day.title}</h2>
              <p className={`mt-1 text-xs font-semibold leading-5 ${dashboardAllDone ? "text-emerald-100/90" : "text-[var(--bb-text-secondary,#4b5563)]"}`}>
                Study {readingSummary} with scripture, teaching, trivia, and reflection.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 pb-24 sm:pb-0">
          {dashboardAllDone && bibleYearJustCompletedDayRef.current === day.dayNumber ? renderBibleYearCompletedDayPanel(day) : null}
          {dashboardAllDone && bibleYearJustCompletedDayRef.current !== day.dayNumber ? renderBibleYearReflectionReviewButton(day) : null}
          {activeTasksToRender.length ? (
            <div className="grid gap-3">
              {renderDashboardTaskCards(activeTasksToRender)}
            </div>
          ) : null}
          {renderBibleYearCompletedTasksPanel(day)}
        </div>
      </section>
    );
  }

  function renderBibleYearSeriesDayDetail(day: GenesisBibleYearDay) {
    const cover = day.coverImage || getDashboardStudyCover(day.readings[0]?.studyTitle || day.title);
    const detailAction = getBibleYearDayAction(day);
    const lockedFutureDay = isBibleYearDayVisuallyLocked(day);
    const detailReference =
      day.readings.length === 2
        ? `${day.readings[0].book} ${day.readings[0].chapter} & ${day.readings[1].chapter}`
        : day.reference;
    const totalStudyTime: Record<number, string> = {
      1: "about 24 min",
      2: "about 20 min",
      3: "about 20 min",
      4: "about 20-22 min",
      5: "about 16 min",
      6: "about 16 min",
      7: "about 14 min",
      8: "about 19 min",
    };
    const lessonSummaries: Record<number, string[]> = {
      1: [
        "Day 1 walks through Genesis 1 and 2 together: creation, light, order, humanity made in God's image, Eden, rest, work, and relationship. This is the foundation for the Bible In One Year journey.",
        "You will read the opening chapters as one flowing beginning: God forms the world, fills it with life, and places humanity inside His good creation with purpose.",
      ],
      2: [
        "Day 2 walks through Genesis 3 and 4 together: temptation, shame, blame, judgment, mercy, Cain and Abel, anger, exile, violence, and the first hints of hope.",
        "Genesis 3 shows how sin enters the human story and how God still comes looking for people who are hiding. Genesis 4 shows that brokenness spreads quickly, but God keeps speaking, warning, protecting, and leaving room for hope.",
      ],
      3: [
        "Day 3 walks through Genesis 5, 6, and 7 together: the generations from Adam to Noah, the earth filling with corruption, Noah finding grace, the ark being built, and the flood beginning.",
        "This day slows down over the long family line, the grief of a violent world, and the obedience of Noah before the rain ever starts falling.",
      ],
      4: [
        "Day 4 walks through Genesis 8, 9, and 10 together: the flood waters receding, Noah leaving the ark, the altar, God's covenant, the rainbow, Noah's failure, and the nations spreading across the earth.",
        "This day moves from judgment into mercy, showing a new beginning after the flood while still being honest about the human heart.",
      ],
      5: [
        "Day 5 walks through Genesis 11, 12, and 13 together: Babel, Abram's family line, God's call, famine, Egypt, Lot's choice, and God's repeated promise.",
        "This day begins Abraham's story by showing faith in motion, weakness under pressure, and the promise of God holding steady.",
      ],
      6: [
        "Day 6 walks through Genesis 14 and 15 together: Lot's capture, Abram's rescue, Melchizedek's blessing, Sodom's offer, Abram's faith, and God's covenant promise.",
        "This day shows courage in crisis, discernment after victory, and faith that believes God's word while still waiting for the promise.",
      ],
      7: [
        "Day 7 walks through Genesis 16 and 17 together: Hagar, waiting, human shortcuts, the God who sees, new names, circumcision, Isaac, and covenant promise.",
        "This day shows that forcing God's promise creates pain, but God's covenant faithfulness is still steady, personal, and clear.",
      ],
      8: [
        "Day 8 walks through Genesis 18, 19, and 20 together: Abraham welcoming the visitors, Sarah hearing the promise, Abraham interceding, Sodom and Gomorrah, Lot's rescue, and God protecting Sarah in Gerar.",
        "This day is heavy, but important. It shows that God's promise is still alive, prayer can draw near with bold humility, and mercy must never be treated lightly.",
      ],
    };
    const daySummary = lessonSummaries[day.dayNumber] || [day.summary];

    return (
      <section className="w-full px-1">
        <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
          <div className="bb-skin-glow-card overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
            <div className="relative min-h-[230px] overflow-hidden bg-[var(--bb-surface-soft,#f8fbff)]">
              {cover ? (
                <img src={cover} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.76))]" />
              <button
                type="button"
                onClick={openBibleYearSeriesDashboard}
                className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/35 text-2xl font-black leading-none text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-black/50"
                aria-label="Close day details"
              >
                x
              </button>
              <div className="relative flex min-h-[230px] flex-col justify-end p-4 text-white sm:p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/85">Day {day.dayNumber}</p>
                <h1 className="mt-1 text-3xl font-black leading-tight">{day.title}</h1>
                <p className="mt-1 text-sm font-bold text-white/85">{detailReference} - {totalStudyTime[day.dayNumber] || day.estimatedTime}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_72%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#0f172a)_92%,#050505)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">About Day {day.dayNumber}</p>
                <div className="mt-2 space-y-3 text-sm font-semibold leading-6 text-[color-mix(in_srgb,var(--bb-text-primary,#ffffff)_72%,#ffffff)]">
                  {daySummary.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    openBibleYearDayOnDashboard(day, { markDone: detailAction.markDone });
                  }}
                  className={`w-full rounded-2xl px-4 py-3 text-sm font-black shadow-sm transition active:scale-[0.98] ${
                    lockedFutureDay
                      ? "border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_82%,transparent)] text-[var(--bb-text-primary,#111827)] hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                      : "bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] hover:brightness-95"
                  }`}
                >
                  {lockedFutureDay ? "Open Bible Study" : detailAction.label}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function getBibleYearJourneyDayOverview(day: GenesisBibleYearDay) {
    const overviewByDay: Record<number, string> = {
      1: "Genesis 1-2 opens with God creating a good and ordered world. You see light, land, living creatures, humanity made in God's image, and Eden as the first picture of life with God. This day sets up the foundation for creation, purpose, work, rest, and relationship.",
      2: "Genesis 3-4 shows how sin enters the story and starts damaging what God made good. Adam and Eve hide, blame, and leave Eden, and Cain's anger turns into violence against Abel. This day explains why the Bible moves from a good creation into the need for rescue and hope.",
      3: "Genesis 5-7 follows the generations after Adam as the world becomes more corrupt and violent. Noah stands out by listening to God and building the ark before the flood begins. This day shows judgment coming, but also God preserving life through obedience and mercy.",
      4: "Genesis 8-10 shows the flood ending and life beginning again on the earth. Noah steps into a renewed world, worships God, and receives the rainbow as a covenant sign. This day is about a fresh start, the spread of nations, and the reminder that humanity still needs God.",
      5: "Genesis 11-13 moves from the Tower of Babel into the beginning of Abraham's story. People try to build their own name, but God calls Abram to follow His promise and become a blessing. This day starts the family line that will shape the rest of the Bible.",
      6: "Genesis 14-15 shows Abram rescuing Lot after war breaks out near Sodom. Abram meets Melchizedek, refuses a corrupt reward, and then hears God repeat the promise under the stars. This day is about courage, trust, and God confirming where Abram's future is headed.",
      7: "Genesis 16-17 follows the pressure of waiting when the promise still has not arrived. Hagar is mistreated but seen by God, and Abram receives a new name, a covenant sign, and the promise of Isaac. This day shows a family learning that God's timing cannot be forced.",
      8: "Genesis 18-19 moves between promise and judgment. Abraham welcomes mysterious visitors, Sarah hears that a son is coming, and Abraham pleads for Sodom before the city is destroyed. This day shows both God's patience and the seriousness of a world that rejects Him.",
      9: "Genesis 20-25 closes Abraham's journey with fear, promise, testing, loss, and legacy. Isaac is born, Abraham faces the test on Mount Moriah, Sarah dies, and Isaac receives a bride. This day shows the promise moving forward into the next generation.",
      10: "Genesis 26-27 follows Isaac's family as the covenant promise continues through weakness and conflict. Wells, fear, favoritism, deception, Jacob, and Esau all collide around the blessing. This day shows that God keeps His plan moving even through a complicated family.",
      11: "Genesis 28-29 begins Jacob's journey away from home. At Bethel, God meets him with a promise, and then Jacob enters years of labor, love, disappointment, and family complexity. This day shows Jacob starting to learn that God is with him outside familiar places.",
      12: "Genesis 30-31 follows Jacob's household as it grows through tension, rivalry, and pressure. Conflict with Laban increases, and Jacob finally leaves with his family and possessions. This day is about growth in a messy season and the courage to move when God says it is time.",
      13: "Genesis 32-33 brings Jacob to a moment of fear before meeting Esau again. He prays, wrestles through the night, receives a new name, and then walks into reconciliation. This day shows Jacob changed as he faces the brother he once wronged.",
      14: "Genesis 34-36 closes this part of Jacob's story with grief, violence, renewal, and loss. The family faces painful consequences, returns to Bethel, and continues forward through change. This day shows the covenant family still being shaped in the middle of real brokenness.",
      15: "Genesis 37-38 begins Joseph's story with dreams, jealousy, betrayal, and a pit. Joseph is sold away from his family, while Judah's story shows more family failure and hidden complexity. This day opens a new section where God is working even when everything looks wrong.",
      16: "Genesis 39-40 follows Joseph in Egypt through temptation, false accusation, prison, and forgotten service. He remains faithful when life is unfair and keeps using the gifts God gave him. This day shows hidden preparation before anyone can see what God is doing.",
      17: "Genesis 41-42 shows Joseph rising from prison to leadership in Egypt. Famine begins, and his brothers come looking for food without knowing they are standing before the one they betrayed. This day turns the story toward confrontation, mercy, and the beginning of family restoration.",
      18: "Genesis 43-44 follows Joseph's brothers as they return to Egypt under pressure. Fear, testing, mercy, and Judah's change all come to the surface. This day shows the family reaching a breaking point where old wounds can finally be faced.",
      19: "Genesis 45-46 brings the emotional reveal as Joseph tells his brothers who he is. Forgiveness, reunion, and relief reshape the family, and Jacob begins the journey down to Egypt. This day shows God preserving life through a story that once looked like loss.",
      20: "Genesis 47-48 follows Jacob's family settling in Egypt while famine continues around them. Joseph manages provision, Jacob nears the end of his life, and blessing is passed forward. This day shows God's promise continuing even while the family lives far from the land.",
      21: "Genesis 49-50 finishes Genesis with Jacob's final blessings, his burial, and Joseph's final words of forgiveness. The family remains in Egypt, but the promise is still alive and pointing ahead. This day closes Genesis with hope that God will keep carrying the story forward.",
    };

    if (overviewByDay[day.dayNumber]) {
      return overviewByDay[day.dayNumber];
    }

    const summary = day.summary.trim().replace(/\s+/g, " ");
    const cleanSummary = summary ? summary.replace(/[.?!]+$/, "") : "";
    const chapterText = day.reference || day.readings.map((reading) => `${reading.book} ${reading.chapter}`).join(", ");
    const lowerTitle = day.title.toLowerCase();

    return `${chapterText} focuses on ${lowerTitle} as the journey continues through Scripture. ${cleanSummary ? `${cleanSummary}.` : "This day gives a simple overview of the main events, people, and movement in the passage."} It helps you understand what is happening before you open the full Bible study.`;
  }

  function renderBibleYearJourneyInlinePreview(day: GenesisBibleYearDay) {
    const completedCount = getBibleYearDayCompletedCount(day);
    const totalCount = getBibleYearRequiredCardKeys(day).length;
    const isComplete = completedCount >= totalCount;
    const isCurrent = day.dayNumber === getCurrentBibleYearSeriesDayNumber();
    const isLocked = isBibleYearDayVisuallyLocked(day);
    const isInProgress = !isComplete && isCurrent && completedCount > 0;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const statusLabel = isComplete ? "Completed" : isLocked ? "Locked Study" : isCurrent ? (isInProgress ? "In Progress" : "Current Study") : "Past Study";
    const encouragement = isComplete
      ? "You completed this study. Review it anytime to strengthen your understanding."
      : isLocked
        ? "This day is locked in your journey order, but you can still open it on your dashboard."
        : "You're currently progressing through this study.";

    return (
      <div className="animate-[bb-soft-pop_220ms_ease-out] px-6 pb-5 pt-2 text-left sm:px-8">
          <div className="relative">
            <button
              type="button"
              onClick={() => setBibleYearJourneyPreviewDay(null)}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_58%,var(--bb-card,#ffffff))] text-lg font-black text-[var(--bb-accent,#2f7fe8)] shadow-sm transition hover:brightness-95"
              aria-label="Close journey day detail"
            >
              x
            </button>

            <div className="pr-11">
              <div className="flex flex-col gap-4 pr-10 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">
                      Day {day.dayNumber}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">
                      {statusLabel}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{day.title}</h3>
                  <p className="mt-1 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">{day.reference}</p>
                </div>
                <div className="hidden" aria-hidden="true">
                  {isComplete ? "âœ“" : isLocked ? "ðŸ”’" : "ðŸ“–"}
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">{getBibleYearJourneyDayOverview(day)}</p>
            </div>

            <div className="mt-5 space-y-4 border-t border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_16%,var(--bb-card-border,#dbe7f4))] pt-4">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span>
                    <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Your Progress</span>
                    <span className="mt-1 block text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]">{completedCount} of {totalCount} tasks completed</span>
                  </span>
                  <span className="text-lg font-black text-[var(--bb-accent,#2f7fe8)]">{progressPercent}%</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--bb-progress-track,#dbe7f4)]">
                  <div className="h-full rounded-full bg-[var(--bb-progress-fill,var(--bb-accent,#2f7fe8))] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-[var(--bb-card-border,#dbe7f4)] pt-4">
              <div>
                <p className="text-sm font-bold leading-6 text-[var(--bb-text-secondary,#4b5563)]">{encouragement}</p>
              </div>
            </div>
          </div>
      </div>
    );
  }

  const renderBibleYearSeriesPage = () => {
    const visibleSeriesDays = GENESIS_BIBLE_IN_ONE_YEAR_SERIES;
    const visibleChapterCount = visibleSeriesDays.reduce((total, day) => total + day.readings.length, 0);
    const currentSeriesDayNumber = getCurrentBibleYearSeriesDayNumber(visibleSeriesDays);
    const orderedSeriesDays = [...visibleSeriesDays].sort((a, b) => {
      const aComplete = isBibleYearDayComplete(a);
      const bComplete = isBibleYearDayComplete(b);
      if (a.dayNumber === currentSeriesDayNumber) return -1;
      if (b.dayNumber === currentSeriesDayNumber) return 1;
      if (aComplete !== bComplete) return aComplete ? 1 : -1;
      return a.dayNumber - b.dayNumber;
    });
    const filteredSeriesDays = orderedSeriesDays.filter((day) => {
      if (bibleYearSeriesFilter === "current") return day.dayNumber === currentSeriesDayNumber;
      if (bibleYearSeriesFilter === "completed") return isBibleYearDayComplete(day);
      return true;
    });
    if (bibleYearSeriesDetailDay) {
      return renderBibleYearSeriesDayDetail(bibleYearSeriesDetailDay);
    }

    return (
      <section className="w-full px-1">
        <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
          <div className="bb-skin-glow-card overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
            <div className="bg-[radial-gradient(circle_at_20%_0%,color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,transparent),transparent_44%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_86%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_72%,transparent))] px-4 pb-5 pt-5 sm:px-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Bible In One Year Reading Plan</p>
              <h1 className="mt-1 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Bible In One Year</h1>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                A reading plan that helps you study and understand God's Word while moving toward finishing the Bible in around a year.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] p-3 text-center">
                  <p className="text-lg font-black text-[var(--bb-text-primary,#111827)]">{visibleSeriesDays.length}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">days</p>
                </div>
                <div className="rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] p-3 text-center">
                  <p className="text-lg font-black text-[var(--bb-text-primary,#111827)]">{visibleChapterCount}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">chapters</p>
                </div>
                <div className="rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] p-3 text-center">
                  <p className="text-lg font-black text-[var(--bb-text-primary,#111827)]">Day {currentSeriesDayNumber}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">current</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-3 sm:p-4">
              <div className="rounded-[20px] border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_74%,transparent)] p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Filter</p>
                  <p className="text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">Current day stays first</p>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {[
                    ["all", "All"],
                    ["current", "Current"],
                    ["completed", "Done"],
                  ].map(([value, label]) => {
                    const active = bibleYearSeriesFilter === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setBibleYearSeriesFilter(value as BibleYearSeriesFilter)}
                        className={`rounded-full px-3 py-2 text-xs font-black transition ${
                          active
                            ? "bg-[var(--bb-accent,#2f7fe8)] text-[var(--bb-button-text,#ffffff)] shadow-sm"
                            : "bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-secondary,#4b5563)] hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {filteredSeriesDays.map((day) => {
                const cover = day.coverImage || getDashboardStudyCover(day.readings[0]?.studyTitle || day.title);
                const isCurrent = day.dayNumber === currentSeriesDayNumber;
                const isComplete = isBibleYearDayComplete(day);
                const isLocked = isBibleYearDayVisuallyLocked(day);
                const seriesStatusLabel = getBibleYearSeriesStatusLabel(day, isCurrent, isComplete, isLocked);
                const seriesReference =
                  day.readings.length === 2
                    ? `${day.readings[0].book} ${day.readings[0].chapter} & ${day.readings[1].chapter}`
                    : day.reference;
                return (
                  <button
                    key={day.dayNumber}
                    type="button"
                    onClick={() => {
                      if (isComplete) {
                        openBibleYearDayOnDashboard(day, { reviewCompleted: true });
                        return;
                      }
                      openBibleYearSeriesDayDetail(day);
                    }}
                    className={`w-full overflow-hidden rounded-[24px] border text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(0,0,0,0.16)] ${
                      isComplete
                        ? "border-emerald-300 bg-emerald-50"
                        : isCurrent
                        ? "border-[var(--bb-accent,#2f7fe8)] bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_64%,var(--bb-card,#ffffff))]"
                        : isLocked
                          ? "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] opacity-75"
                        : "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]"
                    }`}
                  >
                    <div className="flex gap-3 p-3">
                      <div className="h-24 w-[72px] min-w-[72px] overflow-hidden rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] shadow-sm">
                        {cover ? (
                          <img src={cover} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                        ) : (
                          <span className="grid h-full w-full place-items-center text-2xl" aria-hidden="true">ðŸ“–</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 py-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-full bg-[var(--bb-surface-soft,#f8fbff)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-accent,#2f7fe8)]">
                            Day {day.dayNumber}
                          </span>
                          <span className={`shrink-0 text-[11px] font-black ${isComplete ? "text-emerald-600" : "text-[var(--bb-text-muted,#6b7280)]"}`}>
                            {seriesStatusLabel}
                          </span>
                        </div>
                        <p className="mt-2 text-base font-black leading-tight text-[var(--bb-text-primary,#111827)]">{day.title}</p>
                        <p className="mt-0.5 text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]">{seriesReference}</p>
                        <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[var(--bb-text-muted,#6b7280)]">{day.summary}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderBibleYearDayModalBody = (day: GenesisBibleYearDay) => {
    const bibleYearLesson = getBibleYearDailyLesson(day.dayNumber);
    const bibleYearAudio = getBibleYearDayAudio(day.dayNumber);
    const readingCardComplete = bibleYearCompletedCardsByDay[day.dayNumber]?.reading === true;
    const modalAudioFirst = day.dayNumber >= 1 && day.dayNumber <= 8;
    const modalMediaMode = bibleYearMediaModeByDay[day.dayNumber] || (modalAudioFirst ? "audio" : "video");
    const modalVideoPlayerSrc = bibleYearAudio?.videoSrc
      ? `${bibleYearAudio.videoSrc}${bibleYearAudio.videoSrc.includes("?") ? "&" : "?"}autoplay=true&muted=false&preload=true&responsive=true`
      : null;
    const modalShowVideo = Boolean(modalVideoPlayerSrc && modalMediaMode === "video");

    if (bibleYearLesson) {
      return (
        <div className="space-y-3 px-4 py-4">
          {bibleYearAudio ? (
            <>
              {modalShowVideo && modalVideoPlayerSrc ? (
                <div>
                  <div className="overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_34%,var(--bb-card-border,#dbe7f4))] bg-black shadow-[0_18px_38px_rgba(14,26,58,0.18)]">
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <iframe
                        src={modalVideoPlayerSrc}
                        title={bibleYearLesson.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setBibleYearMediaModeByDay((current) => ({
                        ...current,
                        [day.dayNumber]: "audio",
                      }))
                    }
                    className="mt-3 w-full rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_32%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-3 text-sm font-black text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                  >
                    Check out the audio version
                  </button>
                </div>
              ) : (
                <>
                  <BibleYearLessonAudioPlayer
                    audioSrc={bibleYearAudio.apiSrc}
                    title={bibleYearAudio.title}
                    durationLabel={bibleYearAudio.estimatedDuration}
                    storagePath={bibleYearAudio.storagePath}
                    userId={userId}
                    videoId={`bible-year-day-${day.dayNumber}`}
                    backgroundMusicSrcs={day.dayNumber === 8 || day.dayNumber === 9 ? BIBLE_READING_BACKGROUND_TRACKS : undefined}
                    backgroundMusicVolume={BIBLE_READING_BACKGROUND_VOLUME}
                  />
                  {bibleYearAudio.videoSrc ? (
                    <button
                      type="button"
                      onClick={() =>
                        setBibleYearMediaModeByDay((current) => ({
                          ...current,
                          [day.dayNumber]: "video",
                        }))
                      }
                      className="w-full rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_32%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-3 text-sm font-black text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                    >
                      Watch the video instead
                    </button>
                  ) : null}
                </>
              )}
              <button
                type="button"
                onClick={() => {
                  if (readingCardComplete) return;
                  setBibleYearDeepNotesOpen(false);
                  markBibleYearDayCardComplete(day, "reading");
                  closeBibleYearReadingArticle();
                }}
                disabled={readingCardComplete}
                className={`w-full rounded-[24px] border px-4 py-4 text-left shadow-[0_14px_34px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,transparent)] transition ${
                  readingCardComplete
                    ? "cursor-default border-emerald-300 bg-emerald-50 text-emerald-950"
                    : "border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_42%,var(--bb-card-border,#dbe7f4))] bg-[linear-gradient(135deg,var(--bb-accent-soft,#eaf5ff),var(--bb-card,#ffffff))] text-[var(--bb-text-primary,#111827)] hover:scale-[1.01] hover:brightness-[1.02]"
                }`}
              >
                <span className="contents">
                  <span className={`hidden ${
                    readingCardComplete
                      ? "bg-emerald-400 text-emerald-950"
                      : "bg-[var(--bb-accent,#2f7fe8)] text-[var(--bb-button-text,#ffffff)]"
                  }`} aria-hidden="true">
                    âœ“
                  </span>
                  <span className="contents">
                    <span className="block text-base font-black leading-tight">
                      {readingCardComplete ? "Reading Completed" : "Mark Reading Completed"}
                    </span>
                    <span className="mt-1 block text-sm font-bold opacity-80">
                      {readingCardComplete ? "This reading task is done." : "Tap after you finish the video and lesson. +25 XP"}
                    </span>
                  </span>
                </span>
                <span className="rounded-full bg-black/12 px-2.5 py-1 text-xs font-black">+25 XP</span>
              </button>
            </>
          ) : null}

          <div className="overflow-hidden rounded-[26px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-sm">
            <button
              type="button"
              onClick={() => setBibleYearStudyNotesOpen((current) => !current)}
              data-bb-dashboard-tour="study-notes"
              className="flex w-full items-center justify-between gap-3 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_90%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_74%,transparent))] px-4 py-4 text-left transition hover:brightness-[1.02]"
              aria-expanded={bibleYearStudyNotesOpen}
            >
              <span className="min-w-0">
                <span className="block text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">Study Notes</span>
                <span className="mt-1 block text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                  {bibleYearStudyNotesOpen ? "Click to close" : "Click to read"}
                </span>
              </span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,transparent)] bg-[var(--bb-surface-soft,#f8fbff)] text-lg font-black text-[var(--bb-accent,#2f7fe8)] transition ${
                  bibleYearStudyNotesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                â†“
              </span>
            </button>
            {bibleYearStudyNotesOpen ? (
              <div className="border-t border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,var(--bb-card-border,#dbe7f4))] p-4">
                {bibleYearSelectedTerm ? (
                  <DatabaseTermTakeover
                    selectedTerm={bibleYearSelectedTerm}
                    termBurstKey={bibleYearTermBurstKey}
                    loadingTermNotes={bibleYearTermLoading}
                    termNotes={bibleYearTermNotes}
                    termNotesError={bibleYearTermNotesError}
                    onClose={closeBibleYearTermTakeover}
                    takeoverRef={bibleYearTermTakeoverRef}
                  />
                ) : (
                  <div onClick={handleBibleYearDatabaseTermClick}>
                    <ChapterNotesMarkdown>
                      {buildBibleYearLessonMarkdown(bibleYearLesson)}
                    </ChapterNotesMarkdown>
                  </div>
                )}

              </div>
            ) : null}
          </div>
          {!bibleYearSelectedTerm ? (
            <button
              type="button"
              onClick={() => {
                if (readingCardComplete) return;
                setBibleYearDeepNotesOpen(false);
                markBibleYearDayCardComplete(day, "reading");
                closeBibleYearReadingArticle();
              }}
              disabled={readingCardComplete}
              className={`w-full rounded-2xl px-4 py-3 text-sm font-black shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition ${
                readingCardComplete
                  ? "cursor-default border border-[color-mix(in_srgb,var(--bb-success,#16a34a)_34%,transparent)] bg-[color-mix(in_srgb,var(--bb-success,#16a34a)_20%,var(--bb-card,#ffffff))] text-[var(--bb-success,#16a34a)]"
                  : "bg-[var(--bb-button,#2f7fe8)] text-[var(--bb-button-text,#ffffff)] hover:brightness-95"
              }`}
            >
              {readingCardComplete ? "Completed" : "Mark Complete +25 XP"}
            </button>
          ) : null}
        </div>
      );
    }

    return (
      <div className="space-y-4 p-4">
        <div className="rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">Day {day.dayNumber} Reading Space</p>
          <h2 className="mt-1 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{day.title}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            This space is ready for the single flowing Bible In One Year lesson. The full lesson notes and audio will be added next.
          </p>
          <div className="mt-4 grid gap-2">
            {day.readings.map((reading) => (
              <div
                key={`${reading.book}-${reading.chapter}-space`}
                className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-3"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">
                  {reading.book} {reading.chapter}
                </p>
                <p className="mt-1 text-sm font-black text-[var(--bb-text-primary,#111827)]">{reading.studyTitle}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (readingCardComplete) return;
                markBibleYearDayCardComplete(day, "reading");
              }}
              disabled={readingCardComplete}
              className={`rounded-full px-6 py-3 text-sm font-black shadow-sm transition ${
                readingCardComplete
                  ? "cursor-default border border-[color-mix(in_srgb,var(--bb-success,#16a34a)_34%,transparent)] bg-[color-mix(in_srgb,var(--bb-success,#16a34a)_20%,var(--bb-card,#ffffff))] text-[var(--bb-success,#16a34a)]"
                  : "bg-[var(--bb-button,#2f7fe8)] text-[var(--bb-button-text,#ffffff)] hover:brightness-95"
              }`}
            >
              {readingCardComplete ? "Completed" : "Mark as Complete"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">Chapter task links</p>
          <div className="mt-3 grid gap-2">
            {day.readings.map((reading, index) => {
              const devotional = devotionalOptions.find((option) => option.title === reading.studyTitle);
              const isCurrentReading =
                currentDevotionalTitle === reading.studyTitle &&
                currentDevotionalTask?.devotionalDayNumber === reading.studyDayNumber;
              return (
                <button
                  key={`${reading.book}-${reading.chapter}`}
                  type="button"
                  onClick={() => void startBibleYearSeriesReading(day, index)}
                  disabled={isLoadingDevotionalOptions || switchingStudyChapter !== null || !devotional}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                    isCurrentReading
                      ? "border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-accent-soft,#eaf5ff)]"
                      : "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] hover:border-[var(--bb-accent,#2f7fe8)]"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">
                      Genesis {reading.chapter}
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                      {reading.studyTitle}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-black text-[var(--bb-accent,#2f7fe8)]">
                    {isCurrentReading ? "Current" : switchingStudyChapter === reading.studyDayNumber ? "Loading" : "Load"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">Coming next</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            Day {day.dayNumber} is set up for the new single-lesson format. The lesson notes, trivia questions, reflection prompt, and audio can drop into this same card flow.
          </p>
        </div>
      </div>
    );
  };

  function renderStandardBibleYearReadingPage(day: GenesisBibleYearDay) {
    const lesson = getBibleYearDailyLesson(day.dayNumber);
    const audio = getBibleYearDayAudio(day.dayNumber);
    if (!lesson || !audio) {
      return renderBibleYearDayOneVideoTask(day);
    }
    const readingCardComplete = bibleYearCompletedCardsByDay[day.dayNumber]?.reading === true;
    const videoPlayerSrc = audio.videoSrc
      ? `${audio.videoSrc}${audio.videoSrc.includes("?") ? "&" : "?"}autoplay=true&muted=false&preload=true&responsive=true`
      : null;
    const audioFirst = day.dayNumber >= 1 && day.dayNumber <= 8;
    const mediaMode = bibleYearMediaModeByDay[day.dayNumber] || (audioFirst ? "audio" : "video");
    const showVideo = Boolean(videoPlayerSrc && mediaMode === "video");
    const showAudio = !showVideo;
    const verseBreakdownSections = lesson.sections;
    const { markdown: deepNotesMarkdown, sections: deepStudySections } = getBibleYearDayDeepNotes(day.dayNumber);
    const hasDeepNotes = Boolean(deepNotesMarkdown);
    const deepNotesEyebrow = `Day ${day.dayNumber} Study Notes`;
    const deepNotesTitle = day.title;
    const useSectionDeepStudy = Boolean(deepStudySections);
    const trackBibleYearStudyNotesSection = (section: BibleYearDeepStudySection) => {
      void trackStudyNotesSectionOpened({
        userId,
        username: userName,
        source: "bible_in_one_year",
        sourceLabel: "Bible in One Year",
        itemKey: `day-${day.dayNumber}`,
        itemTitle: day.title,
        contentLabel: `Day ${day.dayNumber} - ${day.title}`,
        sectionReference: section.reference,
        sectionTitle: section.title,
      });
    };
    const overviewRecapByDay: Record<number, { intro: string; points: string[]; outro: string }> = {
      1: {
        intro: "Quick recap: Day 1 shows the world before anything is broken.",
        points: [
          "ðŸŒ… God speaks into darkness and brings light.",
          "ðŸŒ God shapes the world into a home for life.",
          "ðŸ‘‘ People are made in God's image with value and purpose.",
          "ðŸŒ¿ Eden shows work, rest, freedom, boundaries, and relationship.",
        ],
        outro: "Big takeaway: before the damage, God's design was good, beautiful, and full of life.",
      },
      2: {
        intro: "Quick recap: Day 2 shows what happens when trust breaks.",
        points: [
          "ðŸ The serpent questions God's word.",
          "ðŸŽ Adam and Eve disobey, then shame and hiding enter the story.",
          "ðŸŒ± God judges sin, but gives the first promise that evil will not win.",
          "ðŸ’” Cain's anger becomes murder, yet God keeps preserving hope through Seth.",
        ],
        outro: "Big takeaway: sin spreads fast, but God keeps pursuing, warning, covering, and keeping hope alive.",
      },
      3: {
        intro: "Quick recap: Day 3 shows a broken world getting darker, but not hopeless.",
        points: [
          "ðŸ§¬ Genesis 5 traces the family line from Adam to Noah.",
          "âš°ï¸ The phrase 'then he died' keeps reminding us that sin brought death.",
          "ðŸš¶ Enoch shows that people can still walk with God in a broken world.",
          "ðŸŒ§ï¸ Noah obeys, the flood begins, and God provides a refuge that carries life through judgment.",
        ],
        outro: "Big takeaway: judgment is real, but God's rescue is real too. The waters rise, but the refuge holds.",
      },
      4: {
        intro: "Quick recap: Day 4 shows life after the flood and hope after the storm.",
        points: [
          "ðŸŒŠ God remembers Noah, and the waters begin to go down.",
          "ðŸ•Šï¸ The dove returns with an olive leaf, showing restoration is starting.",
          "ðŸ”¥ Noah worships first after rescue, before rebuilding anything else.",
          "ðŸŒˆ God gives the rainbow covenant, but Noah's failure shows the world still needs deeper rescue.",
        ],
        outro: "Big takeaway: God is faithful after the storm. He restores, keeps His promise, and keeps moving the story toward Jesus.",
      },
      5: {
        intro: "Quick recap: Day 5 moves from Babel's pride to Abram's call.",
        points: [
          "Babel tries to build upward and make a name without trusting God.",
          "God narrows the story toward Abram and begins the promise family.",
          "Abram obeys, builds altars, and learns to walk by faith.",
          "Fear takes Abram to Egypt, but God still protects Sarai and the promise.",
          "Lot chooses by sight, while God reminds Abram that the promise still stands.",
        ],
        outro: "Big takeaway: you do not have to grasp for a name when God is the one carrying your story.",
      },
      6: {
        intro: "Quick recap: Day 6 shows Abram's faith under pressure.",
        points: [
          "War reaches Sodom, and Lot is taken captive.",
          "Abram moves with courage and rescues Lot.",
          "Melchizedek blesses Abram and points the victory back to God Most High.",
          "Abram refuses Sodom's reward so no corrupt city can claim credit for his blessing.",
          "God speaks to Abram's fear, Abram believes, and God confirms the promise by covenant.",
        ],
        outro: "Big takeaway: faith can fight for rescue, refuse compromise, ask honest questions, and still rest on God's promise.",
      },
    };
    const overviewRecap = overviewRecapByDay[day.dayNumber] || null;
    type VerseBreakdownNote = { title: string; icon: string; paragraphs: string[] };
    const dayOneVerseBreakdownNotes: Record<string, VerseBreakdownNote> = {
      "Genesis 1:1-5": {
        title: "God Makes Light",
        icon: "ðŸ’¡",
        paragraphs: [
          "Before anything was made, God was already there.",
          "The world was dark and empty, but God was not worried.",
          "God spoke, and light appeared.",
          "These verses show that God can bring light and order where there is darkness.",
        ],
      },
      "Genesis 1:6-13": {
        title: "God Makes a Place for Life",
        icon: "ðŸŒ",
        paragraphs: [
          "God separated the waters and made the sky.",
          "Then He gathered the seas and brought out dry land.",
          "Plants, trees, fruit, and seeds began to grow.",
          "God was making the earth ready for living things.",
        ],
      },
      "Genesis 1:14-25": {
        title: "God Fills the World",
        icon: "ðŸ¦",
        paragraphs: [
          "God put lights in the sky to mark days, seasons, and years.",
          "He filled the waters with sea creatures and the sky with birds.",
          "Then He made animals to live on the land.",
          "The empty world was now full of movement and life.",
        ],
      },
      "Genesis 1:26-31": {
        title: "People Are Made in God's Image",
        icon: "ðŸ‘‘",
        paragraphs: [
          "God made people in His image.",
          "That means every person has value because God made them.",
          "God blessed the man and woman and gave them work to do.",
          "After God made everything, He called it very good.",
        ],
      },
      "Genesis 2:1-3": {
        title: "God Rests",
        icon: "ðŸ•Šï¸",
        paragraphs: [
          "God finished making the heavens and the earth.",
          "Then He rested on the seventh day.",
          "God was not tired; His work was complete.",
          "This shows that rest is part of God's good plan.",
        ],
      },
      "Genesis 2:4-9": {
        title: "God Gives Life",
        icon: "ðŸŒ¬ï¸",
        paragraphs: [
          "God formed the man from the dust of the ground.",
          "Then God breathed life into him.",
          "The man became alive because life comes from God.",
          "God also planted a garden so the man had a good place to live.",
        ],
      },
      "Genesis 2:10-17": {
        title: "God Gives Work and a Rule",
        icon: "ðŸŒ³",
        paragraphs: [
          "God put the man in the garden to care for it.",
          "The man could eat from every tree except one.",
          "God gave lots of freedom, but He also gave one clear rule.",
          "The rule taught the man to trust and obey God.",
        ],
      },
      "Genesis 2:18-25": {
        title: "God Makes Woman",
        icon: "ðŸ¤",
        paragraphs: [
          "God said it was not good for the man to be alone.",
          "The animals were good, but none of them were the right partner for him.",
          "God made the woman and brought her to the man.",
          "They were together without shame, fear, or hiding.",
        ],
      },
    };
    const dayTwoVerseBreakdownNotes: Record<string, VerseBreakdownNote> = {
      "Genesis 3:1-5": {
        title: "The Serpent Lies",
        icon: "ðŸ",
        paragraphs: [
          "The serpent asked Eve if God really said not to eat from the tree.",
          "He made God's rule sound unfair.",
          "Eve started listening to the lie.",
          "These verses show how temptation tries to make us doubt God.",
        ],
      },
      "Genesis 3:6-7": {
        title: "Adam and Eve Disobey",
        icon: "ðŸŽ",
        paragraphs: [
          "Eve saw that the fruit looked good and ate it.",
          "She gave some to Adam, and he ate too.",
          "After they disobeyed God, they felt ashamed.",
          "Sin did not give them freedom; it made them want to hide.",
        ],
      },
      "Genesis 3:8-13": {
        title: "God Finds Them",
        icon: "ðŸ‘€",
        paragraphs: [
          "God came to the garden and called for Adam.",
          "Adam and Eve hid because they were afraid.",
          "When God asked what happened, Adam blamed Eve, and Eve blamed the serpent.",
          "Sin made them afraid of God and unkind to each other.",
        ],
      },
      "Genesis 3:14-19": {
        title: "God Gives Judgment and Hope",
        icon: "ðŸŒ±",
        paragraphs: [
          "God told the serpent, Eve, and Adam that sin would bring pain.",
          "Life would now be harder because they disobeyed.",
          "But God also promised that one day someone would crush the serpent.",
          "This was the first promise that God would rescue people.",
        ],
      },
      "Genesis 3:20-24": {
        title: "Adam and Eve Leave Eden",
        icon: "ðŸ§¥",
        paragraphs: [
          "Adam named his wife Eve, which points to life.",
          "God made clothes for Adam and Eve and covered them.",
          "Then God sent them out of the garden.",
          "Even outside Eden, God's promise of hope was still alive.",
        ],
      },
      "Genesis 4:1-7": {
        title: "Cain Gets Angry",
        icon: "ðŸ˜ ",
        paragraphs: [
          "Adam and Eve had two sons named Cain and Abel.",
          "Cain became angry when God accepted Abel's offering.",
          "God warned Cain that sin was waiting like danger at the door.",
          "Cain needed to choose what was right before his anger grew worse.",
        ],
      },
      "Genesis 4:8-16": {
        title: "Cain Kills Abel",
        icon: "ðŸ©¸",
        paragraphs: [
          "Cain did not listen to God's warning.",
          "He killed his brother Abel.",
          "God saw what Cain had done, even though Cain tried to hide it.",
          "God punished Cain, but He also protected him from being killed by others.",
        ],
      },
      "Genesis 4:17-24": {
        title: "People Build, but Sin Grows",
        icon: "ðŸ™ï¸",
        paragraphs: [
          "Cain's family built a city and made music and tools.",
          "People were still creative because they were made by God.",
          "But sin was also growing in people's hearts.",
          "Lamech even bragged about hurting others.",
        ],
      },
      "Genesis 4:25-26": {
        title: "Hope Continues",
        icon: "ðŸŒ±",
        paragraphs: [
          "Adam and Eve had another son named Seth.",
          "This showed that Abel's death was not the end of hope.",
          "God's promise was still moving forward.",
          "People began to call on the name of the Lord.",
        ],
      },
    };
    const dayThreeVerseBreakdownNotes: Record<string, VerseBreakdownNote> = {
      "Genesis 5:1-5": {
        title: "Death Enters the Family Record",
        icon: "âš°ï¸",
        paragraphs: [
          "Genesis 5 starts with Adam's family line.",
          "People are still made in God's likeness, so human life still matters.",
          "But Adam's life ends with the words, then he died.",
          "These verses show that sin has brought death into the human story.",
        ],
      },
      "Genesis 5:6-20": {
        title: "The Family Line Keeps Going",
        icon: "ðŸ§¬",
        paragraphs: [
          "This part repeats names, children, years, and death.",
          "The repetition helps us feel that every generation is touched by the fall.",
          "Even so, families keep growing and the story keeps moving.",
          "God is still carrying hope forward through ordinary family history.",
        ],
      },
      "Genesis 5:21-24": {
        title: "Enoch Walks With God",
        icon: "ðŸš¶",
        paragraphs: [
          "Enoch is different from the pattern around him.",
          "Instead of only saying he died, Genesis says he walked with God.",
          "Walking with God means living close to God and moving in His direction.",
          "Enoch shows that people can still live near God in a broken world.",
        ],
      },
      "Genesis 5:25-32": {
        title: "Noah Is Born Into a Tired World",
        icon: "ðŸ•Šï¸",
        paragraphs: [
          "Noah's name is connected to comfort and rest.",
          "His father hoped Noah would bring relief from painful work and the cursed ground.",
          "Noah would not remove the curse completely, but his life would become a turning point.",
          "God would use Noah to preserve life through judgment.",
        ],
      },
      "Genesis 6:1-8": {
        title: "The Earth Becomes Corrupt",
        icon: "ðŸŒ",
        paragraphs: [
          "Genesis 6 shows sin spreading across the earth.",
          "People's hearts and choices had become deeply evil.",
          "God was grieved by what humanity had become.",
          "But Noah found favor in Yahweh's eyes, which means grace was still present.",
        ],
      },
      "Genesis 6:9-13": {
        title: "Noah Walks With God",
        icon: "âœ¨",
        paragraphs: [
          "Noah lived in a violent and corrupt generation.",
          "But Noah's life moved in a different direction because he walked with God.",
          "The Bible calls him righteous and blameless among the people of his time.",
          "Noah shows that one person can follow God even when the world around them does not.",
        ],
      },
      "Genesis 6:14-22": {
        title: "God Tells Noah to Build",
        icon: "ðŸ› ï¸",
        paragraphs: [
          "God gave Noah clear instructions for building the ship.",
          "Noah's faith became practical through work, details, and obedience.",
          "God also promised to establish His covenant with Noah.",
          "Noah did everything God commanded before the flood was visible.",
        ],
      },
      "Genesis 7:1-10": {
        title: "Noah Enters the Ship",
        icon: "ðŸšª",
        paragraphs: [
          "God told Noah to come into the ship with his household.",
          "The ship was God's provided place of rescue.",
          "Noah obeyed and entered before the flood began.",
          "Faith sometimes means obeying God while you are still waiting to see what comes next.",
        ],
      },
      "Genesis 7:11-16": {
        title: "The Flood Begins",
        icon: "ðŸŒ§ï¸",
        paragraphs: [
          "The waters came from below and above.",
          "The world God had ordered in creation was now being overwhelmed by judgment.",
          "Noah, his family, and the animals entered the ship.",
          "Then Yahweh shut Noah in and secured the place of rescue.",
        ],
      },
      "Genesis 7:17-24": {
        title: "The Waters Rise",
        icon: "ðŸŒŠ",
        paragraphs: [
          "The flood waters rose and covered the earth.",
          "Outside the ship, the waters brought judgment.",
          "Inside the ship, the same waters lifted Noah and carried the rescue God provided.",
          "Genesis 7 is heavy, but it also shows that God preserves life through judgment.",
        ],
      },
    };
    const dayFourVerseBreakdownNotes: Record<string, VerseBreakdownNote> = {
      "Genesis 8:1-5": {
        title: "God Remembers Noah",
        icon: "ðŸŒ¬ï¸",
        paragraphs: [
          "God remembered Noah, which means God turned His faithful care toward him.",
          "The water started going down, and the ark came to rest.",
          "The mountaintops began to appear again.",
          "God was moving the story from judgment toward a new beginning.",
        ],
      },
      "Genesis 8:6-12": {
        title: "Noah Waits for a Sign",
        icon: "ðŸ•Šï¸",
        paragraphs: [
          "Noah sent out birds to see if the land was ready.",
          "The dove came back at first because there was nowhere to rest.",
          "Later the dove returned with an olive leaf.",
          "That little leaf showed that life was beginning again.",
        ],
      },
      "Genesis 8:13-19": {
        title: "God Says Go Out",
        icon: "ðŸšª",
        paragraphs: [
          "Noah saw the ground was dry, but he still waited for God's word.",
          "God told Noah, his family, and the animals to leave the ship.",
          "The animals went out by their families.",
          "God had rescued them so life could spread again on the earth.",
        ],
      },
      "Genesis 8:20-22": {
        title: "Noah Worships After Rescue",
        icon: "ðŸ”¥",
        paragraphs: [
          "Noah's first recorded action after leaving the ship was worship.",
          "He built an altar and gave offerings to God.",
          "God promised that the seasons and days would continue.",
          "This shows that rescue should lead our hearts back to worship.",
        ],
      },
      "Genesis 9:1-7": {
        title: "God Blesses Noah Again",
        icon: "ðŸ‘‘",
        paragraphs: [
          "God blessed Noah and his sons and told them to fill the earth.",
          "This sounds like the blessing God gave humanity in Genesis 1.",
          "God also said human life is sacred because people are made in His image.",
          "The new world must not be filled with violence like the old one.",
        ],
      },
      "Genesis 9:8-17": {
        title: "God Gives the Rainbow",
        icon: "ðŸŒˆ",
        paragraphs: [
          "God made a covenant with Noah, his family, and every living creature.",
          "The rainbow became the sign of God's promise.",
          "Storms would still come, but God promised not to flood the whole earth again.",
          "The rainbow reminds us that God's mercy stands over the world.",
        ],
      },
      "Genesis 9:18-29": {
        title: "Sin Still Remains",
        icon: "ðŸ‡",
        paragraphs: [
          "Genesis does not hide Noah's weakness after the flood.",
          "Noah got drunk, and shame entered the story again.",
          "The flood judged evil, but it did not remove sin from human hearts.",
          "This shows why the world still needs a deeper rescue.",
        ],
      },
      "Genesis 10:1-5": {
        title: "Families Spread Out",
        icon: "ðŸ—ºï¸",
        paragraphs: [
          "Genesis 10 begins showing how Noah's family spread across the earth.",
          "Japheth's line moved into different lands and coastlands.",
          "God sees nations, places, languages, and families.",
          "The Bible is showing how the world after the flood began to fill again.",
        ],
      },
      "Genesis 10:6-20": {
        title: "Kingdoms Begin to Rise",
        icon: "ðŸ™ï¸",
        paragraphs: [
          "Ham's family line includes important places like Egypt, Canaan, Babel, and Nineveh.",
          "Nimrod is described as a mighty man and kingdom builder.",
          "These names will matter later in the Bible story.",
          "Genesis is preparing us to see how nations can build with pride or stand under God.",
        ],
      },
      "Genesis 10:21-32": {
        title: "The Promise Line Keeps Moving",
        icon: "ðŸŒ±",
        paragraphs: [
          "Shem's family line becomes very important for the rest of Genesis.",
          "The promise story will move through Shem toward Abram.",
          "Genesis 10 ends with families, languages, lands, and nations.",
          "God's plan is still moving forward, even across the whole world.",
        ],
      },
    };
    const shareDayOne = async () => {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: `Bible In One Year: ${day.title}`,
          text: `Study ${day.reference} with Bible Buddy.`,
          url: typeof window !== "undefined" ? window.location.href : undefined,
        });
      }
    };
    const sectionDeepNotesFocus = useSectionDeepStudy && hasDeepNotes && Boolean(deepNotesMarkdown) && bibleYearDeepNotesOpen;

    if (!useSectionDeepStudy && hasDeepNotes && deepNotesMarkdown && bibleYearDeepNotesOpen) {
      return (
        <article className="mx-auto max-w-xl overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] text-left text-[var(--bb-text-primary,#111827)] shadow-[0_24px_70px_rgba(14,26,58,0.22)]">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] px-4 py-3">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">{deepNotesEyebrow}</p>
              <p className="truncate text-lg font-black text-[var(--bb-text-primary,#111827)]">{deepNotesTitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setBibleYearDeepNotesOpen(false)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_26%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-surface-soft,#f8fbff)] text-2xl font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
              aria-label="Close study notes"
            >
              Ã—
            </button>
          </div>
          <div className="px-4 pb-24 pt-5">
            <ChapterNotesMarkdown>{deepNotesMarkdown}</ChapterNotesMarkdown>
          </div>
        </article>
      );
    }

    return (
      <article className="relative mx-auto max-w-xl text-left text-[var(--bb-text-primary,#fff7ed)]">
        <section className="relative px-1 pb-1 pt-1">
          {showVideo && videoPlayerSrc ? (
            <div className="pt-0">
              <div className="overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_42%,transparent)] bg-[#070503] shadow-[0_24px_58px_rgba(0,0,0,0.42),0_0_34px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,transparent)]">
                <div className="relative aspect-video overflow-hidden bg-black">
                  <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.28)),linear-gradient(180deg,rgba(0,0,0,0.12),transparent_35%,rgba(0,0,0,0.22))]" aria-hidden="true" />
                  <iframe
                    src={videoPlayerSrc}
                    title={lesson.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>
              {audio.videoSrc ? (
                <button
                  type="button"
                  onClick={() =>
                    setBibleYearMediaModeByDay((current) => ({
                      ...current,
                      [day.dayNumber]: "audio",
                    }))
                  }
                  className="mt-3 w-full rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_36%,transparent)] bg-black/18 px-4 py-3 text-sm font-black text-[var(--bb-accent,#f6b44b)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,transparent)]"
                >
                  Check out the audio version
                </button>
              ) : null}
              {renderBibleYearFollowAlongScripture(day)}
              <VideoHelpfulPoll
                userId={userId}
                videoId={`bible-year-day-${day.dayNumber}`}
                videoTitle={lesson.title}
                videoUrl={audio.videoSrc || ""}
                videoContext="bible_year"
              />
              <button
                type="button"
                onClick={() => {
                  if (readingCardComplete) return;
                  setBibleYearDeepNotesOpen(false);
                  markBibleYearDayCardComplete(day, "reading");
                  closeBibleYearReadingArticle();
                }}
                disabled={readingCardComplete}
                className={`mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-center shadow-[0_0_30px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,transparent),0_18px_38px_rgba(0,0,0,0.28)] transition ${
                  readingCardComplete
                    ? "cursor-default border-emerald-400/70 bg-emerald-400 text-emerald-950"
                    : "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_70%,transparent)] bg-[var(--bb-accent,#f6b44b)] text-black hover:scale-[1.01] hover:brightness-105"
                }`}
              >
                <span className="contents">
                  <span className={`hidden ${
                    readingCardComplete
                      ? "bg-emerald-400 text-emerald-950"
                      : "bg-[var(--bb-accent,#f6b44b)] text-black"
                  }`} aria-hidden="true">
                    âœ“
                  </span>
                  <span className="contents">
                    <span className="block text-base font-black leading-tight">
                      {readingCardComplete ? "Reading Completed" : "Mark Reading Completed"}
                    </span>
                    <span className="hidden">
                      {readingCardComplete ? `Day ${day.dayNumber} reading is locked in.` : "Tap after you finish the video and lesson. +25 XP"}
                    </span>
                  </span>
                </span>
                <span className="rounded-full bg-black/12 px-2.5 py-1 text-xs font-black">+25 XP</span>
              </button>
            </div>
          ) : null}

          {showAudio ? (
            <div className="pt-0">
              <BibleYearLessonAudioPlayer
                audioSrc={audio.apiSrc}
                title={audio.title}
                durationLabel={audio.estimatedDuration}
                storagePath={audio.storagePath}
                userId={userId}
                videoId={`bible-year-day-${day.dayNumber}`}
                backgroundMusicSrcs={day.dayNumber === 8 || day.dayNumber === 9 ? BIBLE_READING_BACKGROUND_TRACKS : undefined}
                backgroundMusicVolume={BIBLE_READING_BACKGROUND_VOLUME}
              />
              {audio.videoSrc ? (
                <button
                  type="button"
                  onClick={() =>
                    setBibleYearMediaModeByDay((current) => ({
                      ...current,
                      [day.dayNumber]: "video",
                    }))
                  }
                  className="mt-3 w-full rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_36%,transparent)] bg-black/18 px-4 py-3 text-sm font-black text-[var(--bb-accent,#f6b44b)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,transparent)]"
                >
                  Watch the video instead
                </button>
              ) : null}
              {renderBibleYearFollowAlongScripture(day)}
              <button
                type="button"
                onClick={() => {
                  if (readingCardComplete) return;
                  setBibleYearDeepNotesOpen(false);
                  markBibleYearDayCardComplete(day, "reading");
                  closeBibleYearReadingArticle();
                }}
                disabled={readingCardComplete}
                className={`mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-center shadow-[0_0_30px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,transparent),0_18px_38px_rgba(0,0,0,0.28)] transition ${
                  readingCardComplete
                    ? "cursor-default border-emerald-400/70 bg-emerald-400 text-emerald-950"
                    : "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_70%,transparent)] bg-[var(--bb-accent,#f6b44b)] text-black hover:scale-[1.01] hover:brightness-105"
                }`}
              >
                <span className="block text-base font-black leading-tight">
                  {readingCardComplete ? "Reading Completed" : "Mark Audio Complete"}
                </span>
                <span className="rounded-full bg-black/12 px-2.5 py-1 text-xs font-black">+25 XP</span>
              </button>
            </div>
          ) : null}

          {false ? (
            <div className="-mx-2 relative z-30 mt-4 overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_36%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#140d09)_78%,rgba(0,0,0,0.72))] text-left text-[var(--bb-text-primary,#fff7ed)] shadow-[0_24px_70px_rgba(0,0,0,0.52)] backdrop-blur-xl [--bb-card-border:rgba(246,180,75,0.22)] [--bb-surface-soft:rgba(255,255,255,0.06)] [--bb-text-primary:#fff7ed] [--bb-text-secondary:#e7d4bd] sm:mx-0 sm:rounded-[28px]">
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#140d09)_82%,rgba(0,0,0,0.82))] px-3 py-3 backdrop-blur-xl sm:px-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">{deepNotesEyebrow}</p>
                  <p className="truncate text-lg font-black text-[var(--bb-text-primary,#fff7ed)]">{deepNotesTitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBibleYearDeepNotesOpen(false)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,transparent)] bg-black/24 text-2xl font-black text-[var(--bb-text-primary,#fff7ed)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)]"
                  aria-label="Close study notes"
                >
                  x
                </button>
              </div>
              <div className="bible-year-study-notes-scroll max-h-[calc(100dvh-260px)] min-h-[420px] overflow-y-auto px-4 py-5" data-bible-year-deep-notes-scroll="day-one">
                {deepStudySections ? (
                  <BibleYearDeepStudySectionCards
                    sections={deepStudySections || []}
                    activeReference={bibleYearOpenVerseBreakdownKey}
                    onActiveReferenceChange={setBibleYearOpenVerseBreakdownKey}
                    onSectionOpen={trackBibleYearStudyNotesSection}
                    intro={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.intro : undefined}
                    closing={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.closing : undefined}
                    topId={`bible-year-day-${day.dayNumber}-deep-study-top`}
                  />
                ) : (
                  <ChapterNotesMarkdown>{deepNotesMarkdown || ""}</ChapterNotesMarkdown>
                )}
              </div>
            </div>
          ) : null}

          {true ? (
          <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_22%,transparent)] bg-black/18">
            {[
              { label: "Favorite", premium: false, icon: "heart" },
              { label: "Download", premium: true, icon: "download", action: "download" },
              { label: "Share", premium: false, icon: "share", action: "share" },
            ].map((item, index) => {
              const disabled = (item.action === "download" && isPaidUser && !audio.videoSrc) || (item.action === "complete" && readingCardComplete);
              const isMarkComplete = item.action === "complete";
              return (
                <button
                  key={item.label}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    if (item.action === "complete" && !readingCardComplete) markBibleYearDayCardComplete(day, "reading");
                    if (item.action === "download") requestBibleYearVideoDownload(day, audio.videoSrc);
                    if (item.action === "share") void shareDayOne();
                  }}
                  className={`min-h-[78px] border-r border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)] px-1.5 py-3 text-center transition last:border-r-0 ${
                    isMarkComplete && !readingCardComplete
                      ? "bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,transparent)] shadow-[inset_0_0_22px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_26%,transparent),0_0_22px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_20%,transparent)]"
                      : disabled
                        ? "cursor-default opacity-80"
                        : "hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_10%,transparent)]"
                  }`}
                >
                  <span className={`mx-auto h-7 w-7 place-items-center text-[var(--bb-accent,#f6b44b)] ${item.icon === "search" ? "hidden" : "grid"}`} aria-hidden="true">
                    {item.icon === "heart" ? "â™¡" : item.icon === "download" ? "â†“" : item.icon === "lock" ? "â–¡" : item.icon === "check" ? "âœ“" : "â†‘"}
                  </span>
                  {item.icon === "search" ? (
                    <span className="mx-auto grid h-7 w-7 place-items-center text-[var(--bb-accent,#f6b44b)]" aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                    </span>
                  ) : null}
                  <span className="mt-1 block text-[11px] font-bold text-[var(--bb-text-primary,#fff7ed)] sm:text-xs">{item.label}</span>
                  {item.premium ? (
                    <span className="mt-1 inline-flex rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,transparent)] px-2 py-0.5 text-[9px] font-black text-[var(--bb-accent,#f6b44b)]">
                      {isPaidUser ? "Pro" : "Premium"}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          ) : null}

          {sectionDeepNotesFocus ? (
            <div className="relative z-30 mt-4 overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] text-left text-[var(--bb-text-primary,#111827)] shadow-[0_24px_70px_rgba(14,26,58,0.22)]">
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">{deepNotesEyebrow}</p>
                  <p className="truncate text-lg font-black text-[var(--bb-text-primary,#111827)]">{deepNotesTitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBibleYearDeepNotesOpen(false)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_26%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-surface-soft,#f8fbff)] text-2xl font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                  aria-label="Close study notes"
                >
                  x
                </button>
              </div>
              <div className="px-2 py-3 sm:px-4 sm:py-5" data-bible-year-deep-notes-scroll={`day-${day.dayNumber}`}>
                {deepStudySections ? (
                  <BibleYearDeepStudySectionCards
                    sections={deepStudySections || []}
                    activeReference={bibleYearOpenVerseBreakdownKey}
                    onActiveReferenceChange={setBibleYearOpenVerseBreakdownKey}
                    onSectionOpen={trackBibleYearStudyNotesSection}
                    intro={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.intro : undefined}
                    closing={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.closing : undefined}
                    topId={`bible-year-day-${day.dayNumber}-deep-study-top`}
                  />
                ) : (
                  <ChapterNotesMarkdown>{deepNotesMarkdown || ""}</ChapterNotesMarkdown>
                )}
              </div>
            </div>
          ) : null}
        </section>

        {!sectionDeepNotesFocus ? (
        <section className="mt-4 px-1">
          {true ? (
            <div className="rounded-[24px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_20%,transparent)] bg-black/12 p-4">
              <p className="text-xl font-black leading-tight text-[var(--bb-text-primary,#fff7ed)]">Today's Reading Recap</p>
              {overviewRecap ? (
                <div className="mt-3 grid gap-3">
                  <p className="text-sm font-bold leading-6 text-[var(--bb-text-secondary,#e7d4bd)]">{overviewRecap.intro}</p>
                  <div className="grid gap-2">
                    {overviewRecap.points.map((point) => (
                      <p
                        key={point}
                        className="rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)] bg-black/14 px-3 py-2 text-sm font-bold leading-5 text-[var(--bb-text-primary,#fff7ed)]"
                      >
                        {point}
                      </p>
                    ))}
                  </div>
                  <p className="rounded-2xl bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,transparent)] px-3 py-3 text-sm font-black leading-5 text-[var(--bb-accent,#f6b44b)]">
                    {overviewRecap.outro}
                  </p>
                </div>
              ) : (
              <div className="mt-3 grid gap-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#e7d4bd)]">
                {day.dayNumber === 2 ? (
                  <>
                    <p>Genesis 3-4 shows the Bible story turning from beauty to heartbreak.</p>
                    <p>The serpent questions God's word and makes disobedience sound like freedom.</p>
                    <p>Adam and Eve take the fruit, then shame, hiding, and blame enter the human story.</p>
                    <p>Even in judgment, God gives the first promise that evil will not win forever.</p>
                    <p>Genesis 4 shows sin moving from the garden into the family through Cain's anger and Abel's murder.</p>
                    <p>Day 2 teaches that sin spreads quickly, but God keeps speaking, covering, warning, and preserving hope.</p>
                  </>
                ) : (
                  <>
                    <p>{day.dayNumber === 1 ? "Genesis 1-2 introduces the whole Bible story by showing God as the Creator before anything else exists." : day.summary}</p>
                    <p>{day.dayNumber === 1 ? "God brings order to darkness, fills the world with life, and calls His creation good." : lesson.opening[0] || "This is the simple free overview for today's Bible In One Year reading."}</p>
                  </>
                )}
                {day.dayNumber === 1 ? (
                  <>
                    <p>Humanity is made in God's image, which means every person has value, purpose, and responsibility under God.</p>
                    <p>Genesis 2 zooms in on the garden, where God gives the man life, work, freedom, one boundary, and relationship.</p>
                    <p>Before sin enters the story, we see God's good design: worship, rest, work, beauty, trust, and life with Him.</p>
                  </>
                ) : null}
              </div>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setBibleYearStudyNotesOpen((current) => !current)}
                className="flex w-full items-center justify-between gap-4 py-2 text-left"
                aria-expanded={bibleYearStudyNotesOpen}
              >
                <span className="min-w-0">
                  <span className="block text-2xl font-black text-[var(--bb-text-primary,#fff7ed)]">Today's Reading Overview</span>
                </span>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_10%,transparent)] text-[var(--bb-text-primary,#fff7ed)] transition ${bibleYearStudyNotesOpen ? "rotate-180" : ""}`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>

              {false && bibleYearStudyNotesOpen ? (
            <div className="mt-2 grid gap-2">
              {verseBreakdownSections.map((section) => {
                const isOpen = bibleYearOpenVerseBreakdownKey === section.verseBlock.reference;
                const note =
                  day.dayNumber === 1
                    ? dayOneVerseBreakdownNotes[section.verseBlock.reference]
                    : day.dayNumber === 2
                      ? dayTwoVerseBreakdownNotes[section.verseBlock.reference]
                      : day.dayNumber === 3
                        ? dayThreeVerseBreakdownNotes[section.verseBlock.reference]
                        : day.dayNumber === 4
                          ? dayFourVerseBreakdownNotes[section.verseBlock.reference]
                          : undefined;
                const paragraphs = (note?.paragraphs || section.teaching).slice(0, 4);
                const noteIcon = note?.icon || "â€¢";
                return (
                  <div key={`expanded-${section.verseBlock.reference}`}>
                    <button
                      type="button"
                      onClick={() => setBibleYearOpenVerseBreakdownKey((current) => current === section.verseBlock.reference ? null : section.verseBlock.reference)}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition ${
                        isOpen
                          ? "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,transparent)] bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,transparent)]"
                          : "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,transparent)] bg-black/10 hover:border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,transparent)] hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_8%,transparent)]"
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,transparent)] text-sm">{noteIcon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-black text-[var(--bb-text-primary,#fff7ed)]">{section.verseBlock.reference}</span>
                        <span className="mt-0.5 block text-xs font-semibold text-[var(--bb-text-secondary,#e7d4bd)]">{section.heading}</span>
                      </span>
                      <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 text-[var(--bb-accent,#f6b44b)] transition ${isOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                    {isOpen ? (
                      <div className="pb-4 pl-11 pr-2 pt-3">
                        <p className="text-base font-black leading-tight text-[var(--bb-text-primary,#fff7ed)]">{note?.title || section.heading}</p>
                        <div className="mt-3 grid gap-3">
                          {paragraphs.map((paragraph) => (
                            <p key={paragraph} className="text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#e7d4bd)]">{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
              ) : null}
            </>
          )}

          {hasDeepNotes ? (
            <div className="mt-5 border-t border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,transparent)] pt-5">
              <div className="rounded-[24px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_26%,transparent)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent),rgba(0,0,0,0.16))] p-4 shadow-[0_0_28px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,transparent)]">
                <p className="text-xl font-black leading-tight text-[var(--bb-text-primary,#fff7ed)]">ðŸ“– Want to Go Deeper?</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#e7d4bd)]">
                  This was just a simple introduction to today's reading.
                </p>
                <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#e7d4bd)]">If you want to understand:</p>
                <div className="mt-2 grid gap-1.5 text-sm font-bold leading-6 text-[var(--bb-text-primary,#fff7ed)]">
                  <p>ðŸ“š the historical and cultural context</p>
                  <p>ðŸ§  the meaning behind important words and phrases</p>
                  <p>ðŸ” hidden connections throughout Scripture</p>
                  <p>ðŸ”¥ and how this chapter fits into God's bigger story</p>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#e7d4bd)]">
                  check out the Study Notes for today's study inside Bible Buddy.
                </p>
                <button
                  type="button"
                  onClick={() => openBibleYearDeepNotes(day.dayNumber)}
                  className="mt-4 w-full rounded-2xl bg-[var(--bb-accent,#f6b44b)] px-5 py-4 text-base font-black text-black shadow-[0_0_30px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_42%,transparent)] transition hover:brightness-105"
                >
                  Open Study Notes
                </button>
              </div>
              {false ? (
                <div className="mt-4 overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_36%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#140d09)_78%,rgba(0,0,0,0.72))] text-left text-[var(--bb-text-primary,#fff7ed)] shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl [--bb-card-border:rgba(246,180,75,0.22)] [--bb-surface-soft:rgba(255,255,255,0.06)] [--bb-text-primary:#fff7ed] [--bb-text-secondary:#e7d4bd]">
                  <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,transparent)] bg-[color-mix(in_srgb,var(--bb-card,#140d09)_82%,rgba(0,0,0,0.82))] px-4 py-3 backdrop-blur-xl">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">{deepNotesEyebrow}</p>
                      <p className="truncate text-lg font-black text-[var(--bb-text-primary,#fff7ed)]">{deepNotesTitle}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBibleYearDeepNotesOpen(false)}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,transparent)] bg-black/24 text-xl font-black text-[var(--bb-text-primary,#fff7ed)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)]"
                      aria-label="Close study notes"
                    >
                      x
                    </button>
                  </div>
                  <div className="max-h-[62dvh] overflow-y-auto px-4 py-5">
                    {deepStudySections ? (
                      <BibleYearDeepStudySectionCards
                        sections={deepStudySections || []}
                        activeReference={bibleYearOpenVerseBreakdownKey}
                        onActiveReferenceChange={setBibleYearOpenVerseBreakdownKey}
                        onSectionOpen={trackBibleYearStudyNotesSection}
                        intro={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.intro : undefined}
                        closing={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.closing : undefined}
                        topId={`bible-year-day-${day.dayNumber}-deep-study-inline-top`}
                      />
                    ) : (
                      <ChapterNotesMarkdown>{deepNotesMarkdown || ""}</ChapterNotesMarkdown>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
        ) : null}

        {!useSectionDeepStudy && hasDeepNotes && deepNotesMarkdown && bibleYearDeepNotesOpen ? (
          <div className="absolute inset-0 z-30 overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] shadow-[0_24px_70px_rgba(14,26,58,0.22)]">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] px-4 py-3">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">{deepNotesEyebrow}</p>
                <p className="truncate text-lg font-black text-[var(--bb-text-primary,#111827)]">{deepNotesTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setBibleYearDeepNotesOpen(false)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_26%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-surface-soft,#f8fbff)] text-2xl font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                aria-label="Close study notes"
              >
                Ã—
              </button>
            </div>
            <div className="bible-year-study-notes-scroll h-[calc(100%-68px)] overflow-y-auto px-4 py-5" data-bible-year-deep-notes-scroll="day-one">
              {deepStudySections ? (
                <BibleYearDeepStudySectionCards
                  sections={deepStudySections || []}
                  activeReference={bibleYearOpenVerseBreakdownKey}
                  onActiveReferenceChange={setBibleYearOpenVerseBreakdownKey}
                  onSectionOpen={trackBibleYearStudyNotesSection}
                  intro={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.intro : undefined}
                  closing={day.dayNumber === 1 ? BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME.closing : undefined}
                  topId={`bible-year-day-${day.dayNumber}-deep-study-top`}
                />
              ) : (
                <ChapterNotesMarkdown>{deepNotesMarkdown}</ChapterNotesMarkdown>
              )}
            </div>
          </div>
        ) : null}

        {renderBibleYearDayOneDeepNotesGiftModal()}

        {renderBibleYearDeepNotesUpgradeModal()}

        <ModalShell isOpen={false && bibleYearDeepNotesUpgradeOpen} onClose={() => setBibleYearDeepNotesUpgradeOpen(false)}>
          <div className="bb-skin-glow-card relative w-full max-w-md overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,var(--bb-card-border,#dbe7f4))] bg-[radial-gradient(circle_at_18%_0%,color-mix(in_srgb,var(--bb-accent,#f6b44b)_20%,transparent),transparent_44%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_96%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_78%,transparent))] p-5 text-left text-[var(--bb-text-primary,#111827)] shadow-[0_28px_80px_rgba(0,0,0,0.42),0_0_36px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,transparent)] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setBibleYearDeepNotesUpgradeOpen(false)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_76%,transparent)] text-[0px] font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_62%,transparent)]"
              aria-label="Close upgrade prompt"
            >
              <span className="text-xl">x</span>
              Ã—
            </button>
            <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,transparent)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">
              Bible Buddy Pro
            </div>
            <h2 className="mt-4 pr-10 text-2xl font-black leading-tight">Go deeper in God's Word</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
              Free helps you know God's Word. Pro helps you understand it deeper with the studies, context, and tools built for serious growth.
            </p>
            <div className="mt-4 grid gap-2 rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_22%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_72%,transparent)] p-4 text-sm font-bold leading-6 text-[var(--bb-text-primary,#111827)]">
              <p>Unlock every Bible In One Year Deep Note</p>
              <p>Get Hebrew word breakdowns and key phrase explanations</p>
              <p>See cultural, historical, and Scripture connections</p>
              <p>Download day study tools like videos and notes</p>
              <p>Receive deeper Bible study tools focused on Scripture and daily consistency</p>
            </div>
            <div className="hidden">
              <p>ðŸ“š Unlock every Bible in One Year Deep Note</p>
              <p>ðŸ§  Study key words and phrases with more depth</p>
              <p>ðŸ” See more connections across Scripture</p>
              <p>ðŸ”¥ Go beyond the intro and study the full teaching</p>
            </div>
            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={() => openBibleYearQuickUpgrade()}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--bb-button,var(--bb-accent,#f6b44b))] px-5 py-3 text-sm font-black text-[var(--bb-button-text,#000000)] shadow-[0_0_28px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_36%,transparent)] transition hover:brightness-105"
              >
                Upgrade and Go Deeper
              </button>
              <button
                type="button"
                onClick={() => setBibleYearDeepNotesUpgradeOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_80%,transparent)] px-5 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
              >
                Keep Studying Free
              </button>
            </div>
          </div>
        </ModalShell>

        <ModalShell isOpen={Boolean(bibleYearDownloadPrompt)} onClose={() => setBibleYearDownloadPrompt(null)}>
          <div className="bb-skin-glow-card relative w-full max-w-md overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,var(--bb-card-border,#dbe7f4))] bg-[radial-gradient(circle_at_18%_0%,color-mix(in_srgb,var(--bb-accent,#f6b44b)_20%,transparent),transparent_44%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_96%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_78%,transparent))] p-5 text-left text-[var(--bb-text-primary,#111827)] shadow-[0_28px_80px_rgba(0,0,0,0.42),0_0_36px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,transparent)] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setBibleYearDownloadPrompt(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_76%,transparent)] text-xl font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_62%,transparent)]"
              aria-label="Close download prompt"
            >
              x
            </button>
            <p className="pr-12 text-[11px] font-black uppercase tracking-[0.2em] text-amber-300">Premium Download</p>
            <h2 className="mt-2 pr-10 text-2xl font-black leading-tight">Download this Day {bibleYearDownloadPrompt?.dayNumber} video?</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-amber-50/86">
              This will start the download for {bibleYearDownloadPrompt?.title}. If your browser opens the video instead, use the browser save option from that page.
            </p>
            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={confirmBibleYearVideoDownload}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-300 px-5 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(251,191,36,0.38)] transition hover:brightness-105"
              >
                Yes, Download Video
              </button>
              <button
                type="button"
                onClick={() => setBibleYearDownloadPrompt(null)}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/14 bg-white/8 px-5 py-3 text-sm font-black text-white transition hover:bg-white/12"
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalShell>

        <ModalShell isOpen={bibleYearDownloadUpgradeOpen} onClose={() => setBibleYearDownloadUpgradeOpen(false)}>
          <div className="bb-skin-glow-card relative w-full max-w-md overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,var(--bb-card-border,#dbe7f4))] bg-[radial-gradient(circle_at_18%_0%,color-mix(in_srgb,var(--bb-accent,#f6b44b)_20%,transparent),transparent_44%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_96%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_78%,transparent))] p-5 text-left text-[var(--bb-text-primary,#111827)] shadow-[0_28px_80px_rgba(0,0,0,0.42),0_0_36px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,transparent)] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setBibleYearDownloadUpgradeOpen(false)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_76%,transparent)] text-[0px] font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_62%,transparent)]"
              aria-label="Close upgrade prompt"
            >
              <span className="text-xl">x</span>
              Ãƒâ€”
            </button>
            <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,transparent)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">
              Bible Buddy Pro
            </div>
            <h2 className="mt-4 pr-10 text-2xl font-black leading-tight">Take Bible study deeper</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
              Free helps you know God's Word. Pro helps you go deeper, keep lessons close, and grow with stronger study tools.
            </p>
            <div className="mt-4 grid gap-2 rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_22%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_72%,transparent)] p-4 text-sm font-bold leading-6 text-[var(--bb-text-primary,#111827)]">
              <p>Download Bible In One Year videos</p>
              <p>Download day study tools like videos and notes</p>
              <p>Unlock Study Notes with Hebrew, culture, history, and context</p>
              <p>Keep lessons close with downloadable study resources</p>
              <p>Get focused tools that help you understand Scripture and stay consistent</p>
            </div>
            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={() => openBibleYearQuickUpgrade()}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--bb-button,var(--bb-accent,#f6b44b))] px-5 py-3 text-sm font-black text-[var(--bb-button-text,#000000)] shadow-[0_0_28px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_36%,transparent)] transition hover:brightness-105"
              >
                Upgrade and Go Deeper
              </button>
              <button
                type="button"
                onClick={() => setBibleYearDownloadUpgradeOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_80%,transparent)] px-5 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
              >
                Keep Studying Free
              </button>
            </div>
          </div>
        </ModalShell>

        <ModalShell isOpen={bibleYearQuickUpgradeOpen} onClose={closeBibleYearQuickUpgrade}>
          <div className="bb-skin-glow-card relative w-full max-w-md overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_38%,var(--bb-card-border,#dbe7f4))] bg-[radial-gradient(circle_at_18%_0%,color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,transparent),transparent_44%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_98%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_82%,transparent))] p-5 text-left text-[var(--bb-text-primary,#111827)] shadow-[0_28px_80px_rgba(0,0,0,0.45),0_0_38px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_22%,transparent)] backdrop-blur-xl">
            {bibleYearQuickUpgradeLoading ? (
              <div className="absolute inset-0 z-20 grid place-items-center bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_86%,transparent)] backdrop-blur-sm">
                <div className="flex w-[min(260px,80%)] flex-col items-center rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] px-5 py-5 text-center shadow-[0_18px_48px_rgba(15,23,42,0.18)]">
                  <span className="h-9 w-9 animate-spin rounded-full border-4 border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,transparent)] border-t-[var(--bb-accent,#f6b44b)]" aria-hidden="true" />
                  <span className="mt-3 text-sm font-black text-[var(--bb-text-primary,#111827)]">Opening Stripe</span>
                  <span className="mt-1 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                    Taking you to the {bibleYearQuickUpgradeLoading === "monthly" ? "$4.99 monthly" : "$50 yearly"} checkout.
                  </span>
                </div>
              </div>
            ) : null}
            <button
              type="button"
              onClick={closeBibleYearQuickUpgrade}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_76%,transparent)] text-xl font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_62%,transparent)] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close plan choices"
              disabled={Boolean(bibleYearQuickUpgradeLoading)}
            >
              x
            </button>
            <div className="inline-flex rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,transparent)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#f6b44b)]">
              Bible Buddy Pro
            </div>
            <h2 className="mt-4 pr-10 text-2xl font-black leading-tight">Choose your Pro plan</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
              Unlock Study Notes, deeper explanations, downloads, and focused study tools. Cancel anytime.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => startBibleYearQuickUpgrade("monthly")}
                disabled={Boolean(bibleYearQuickUpgradeLoading)}
                className="relative flex min-h-28 w-full flex-col justify-between rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_30%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_84%,transparent)] px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_48%,transparent)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span>
                  <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">Monthly</span>
                  <span className="block text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">Flexible access</span>
                </span>
                <span className="mt-4 text-2xl font-black text-[var(--bb-accent,#f6b44b)]">$4.99</span>
              </button>
              <button
                type="button"
                onClick={() => startBibleYearQuickUpgrade("yearly")}
                disabled={Boolean(bibleYearQuickUpgradeLoading)}
                className="relative flex min-h-28 w-full flex-col justify-between overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_44%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-button,var(--bb-accent,#f6b44b))] px-4 py-4 text-left text-[var(--bb-button-text,#000000)] shadow-[0_0_28px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_32%,transparent)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span>
                  <span className="block text-sm font-black">Yearly</span>
                  <span className="block text-xs font-bold opacity-80">Best value</span>
                </span>
                <span className="mt-4 text-2xl font-black">$50</span>
              </button>
            </div>
            {bibleYearQuickUpgradeError ? (
              <p className="mt-3 rounded-2xl border border-red-400/35 bg-red-500/10 px-4 py-3 text-xs font-bold leading-5 text-red-200">
                {bibleYearQuickUpgradeError}
              </p>
            ) : null}
            <button
              type="button"
              onClick={closeBibleYearQuickUpgrade}
              disabled={Boolean(bibleYearQuickUpgradeLoading)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_80%,transparent)] px-5 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Keep Studying Free
            </button>
          </div>
        </ModalShell>
      </article>
    );
  }

  function renderBibleYearReadingArticlePage(day: GenesisBibleYearDay) {
    const bibleYearLesson = getBibleYearDailyLesson(day.dayNumber);
    if (bibleYearLesson) {
      return renderStandardBibleYearReadingPage(day);
    }

    return (
      <article className="bb-skin-glow-card overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
        <div className="relative bg-[radial-gradient(circle_at_18%_0%,color-mix(in_srgb,var(--bb-accent,#2f7fe8)_22%,transparent),transparent_42%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_88%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_68%,transparent))] px-4 pb-5 pt-5 sm:px-5">
          <button
            type="button"
            onClick={closeBibleYearReadingArticle}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_34%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_82%,transparent)] text-xl font-black text-[var(--bb-text-primary,#111827)] shadow-sm transition hover:scale-105"
            aria-label="Close reading"
          >
            Ã—
          </button>
          <p className="pr-12 text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Bible In One Year</p>
          <h1 className="mt-1 pr-12 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
            Day {day.dayNumber} - {day.title}
          </h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            {bibleYearLesson
              ? `${day.reference} with video, Scripture, and study notes.`
              : "Study today's reading and mark it complete when finished."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-1 text-[11px] font-black text-[var(--bb-text-primary,#111827)]">{day.estimatedTime}</span>
            <span className="rounded-full bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-1 text-[11px] font-black text-[var(--bb-text-primary,#111827)]">+25 XP</span>
          </div>
        </div>
        {renderBibleYearDayModalBody(day)}
      </article>
    );
  }

  const renderEmbeddedSharePage = () => {
    const inviteUserId = shareRewardsProfile?.user_id || userId;
    const shareUrl =
      inviteUserId && typeof window !== "undefined"
        ? `${window.location.origin}/signup?referrer=${encodeURIComponent(inviteUserId)}`
        : "https://thebiblestudybuddy.com/signup";
    const signupCount = shareRewardsReferrals.length;
    const earnedXp = signupCount * 250;
    const orderedShareRewardsReferrals = [...shareRewardsReferrals].sort(
      (a, b) => new Date(b.trial_started_at).getTime() - new Date(a.trial_started_at).getTime(),
    );
    const shareMessage = `Join me on Bible Buddy. It helps you know where to start, understand what you read, and stay consistent with Bible study. ${shareUrl}`;
    const copyInviteLink = async () => {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 1800);
    };
    const openNativeShare = async () => {
      if (navigator.share) {
        await navigator.share({ title: "Bible Buddy", text: "Join me on Bible Buddy.", url: shareUrl });
        return;
      }
      await copyInviteLink();
    };

    return (
      <section className="w-full px-1">
        <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
          <div className="overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
            <div className="bg-[radial-gradient(circle_at_18%_0%,color-mix(in_srgb,var(--bb-accent,#2f7fe8)_22%,transparent),transparent_42%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_82%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_62%,transparent))] px-4 pb-5 pt-5 sm:px-5">
              <div className="flex items-center gap-4">
                <div className="buddy-rewards-buddy shrink-0 overflow-visible">
                  {selectedBuddy ? <LouisAvatar buddyId={selectedBuddy.id} mood="wave" size={104} plain /> : <span className="block h-[104px] w-[104px]" aria-hidden="true" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Invite Bible Buddies</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#5f6368)]">
                    Invite friends to Bible Buddy and help them start reading Scripture consistently.
                  </p>
                  <p className="text-sm font-bold leading-5 text-[var(--bb-text-secondary,#5f6368)]">
                    For every person you get to sign up, you earn 250 XP points.
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-[var(--bb-accent,#2f7fe8)] px-3 py-1 text-xs font-black text-white">
                    +250 XP
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              {shareRewardsError ? (
                <p className="rounded-2xl bg-red-50 px-4 py-4 text-sm font-black text-red-600">{shareRewardsError}</p>
              ) : null}
                  <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">Your Invite Link</p>
                    <p className="mt-3 truncate rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-xs font-bold text-[var(--bb-text-secondary,#5f6368)]">
                      {shareUrl}
                    </p>
                    <p className="mt-2 text-xs font-bold leading-5 text-[var(--bb-text-muted,#6b7280)]">
                      Send it anywhere. When someone clicks your link and signs up, Bible Buddy credits the signup back to you.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <button
                      type="button"
                      onClick={copyInviteLink}
                      className="rounded-[22px] bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-5 py-4 text-center text-base font-black text-[var(--bb-button-text,#ffffff)] shadow-[0_14px_30px_rgba(0,0,0,0.16)] transition hover:brightness-95 active:scale-[0.98]"
                    >
                      {shareCopied ? "Link Copied" : "Copy Invite Link"}
                    </button>
                    <button
                      type="button"
                      onClick={openNativeShare}
                      className="rounded-[20px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-3.5 text-center text-sm font-black text-[var(--bb-text-primary,#111827)] shadow-sm transition hover:bg-[var(--bb-surface-soft,#f8fbff)] active:scale-[0.98]"
                    >
                      Send
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] p-3 text-center">
                      <p className="text-xl font-black text-[var(--bb-text-primary,#111827)]">{signupCount}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">signups</p>
                    </div>
                    <div className="rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] p-3 text-center">
                      <p className="text-xl font-black text-[var(--bb-text-primary,#111827)]">{earnedXp}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">XP earned</p>
                    </div>
                    <div className="rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] p-3 text-center">
                      <p className="text-xl font-black text-[var(--bb-text-primary,#111827)]">{signupCount}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">friends</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">Invite Database</p>
                        <p className="mt-1 text-sm font-bold text-[var(--bb-text-secondary,#5f6368)]">
                          {shareRewardsLoading ? "Checking for signups..." : "Every signup from your link appears here in order."}
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-1 text-xs font-black text-[var(--bb-text-secondary,#5f6368)]">{signupCount}</span>
                    </div>
                    {signupCount > 0 ? (
                      <div className="mt-3 max-h-80 space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
                        {orderedShareRewardsReferrals.map((referral) => {
                          const displayName = getReferralDisplayName(referral);
                          return (
                            <div key={referral.referred_user_id} className="flex items-center justify-between gap-3 rounded-xl bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-2">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-black text-[var(--bb-text-primary,#111827)]">{displayName}</p>
                                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--bb-text-muted,#6b7280)]">Signed up from your link</p>
                              </div>
                              <p className="shrink-0 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                                {new Date(referral.trial_started_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-3 rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-4 text-sm font-bold leading-5 text-[var(--bb-text-muted,#6b7280)]">
                        No signups yet. Share your invite link with someone who wants help starting and staying consistent with Bible study.
                      </p>
                    )}
                  </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  return (
    <div className="space-y-4 pb-[112px] lg:pb-4">
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

        @keyframes completion-side-firework {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2) rotate(0deg); }
          16% { opacity: 1; }
          76% { opacity: 0.85; }
          100% { opacity: 0; transform: translate(calc(-50% + var(--fx-x)), calc(-50% + var(--fx-y))) scale(1) rotate(var(--fx-r)); }
        }

        @keyframes bible-year-completed-tasks-celebrate {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 26px rgba(16, 185, 129, 0.25), 0 18px 44px rgba(0, 0, 0, 0.22);
          }
          50% {
            transform: scale(1.012);
            box-shadow: 0 0 42px rgba(16, 185, 129, 0.45), 0 22px 54px rgba(0, 0, 0, 0.28);
          }
        }

        @keyframes bible-year-completed-tasks-receive {
          0% { transform: scale(1); box-shadow: 0 12px 30px color-mix(in srgb, var(--bb-accent, #2f7fe8) 14%, transparent); }
          22% { transform: scale(1.055); box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.18), 0 0 38px rgba(16, 185, 129, 0.5), 0 18px 44px rgba(0, 0, 0, 0.26); }
          58% { transform: scale(0.985); }
          100% { transform: scale(1); }
        }

        @keyframes bible-year-task-absorbing {
          0% { opacity: 1; transform: translateY(0) scale(1); background: rgba(16, 185, 129, 0.18); }
          16% { opacity: 1; transform: translateY(0) scale(1.018) rotate(-0.6deg); border-color: rgba(52, 211, 153, 0.95); }
          30% { transform: translateY(0) scale(1.018) rotate(0.7deg); }
          48% { opacity: 0.94; transform: translateY(6px) scale(0.9); }
          78% { opacity: 0.24; transform: translateY(34px) scale(0.38); filter: blur(1.4px); }
          100% { opacity: 0; transform: translateY(48px) scale(0.24); filter: blur(2px); }
        }

        @keyframes bible-year-reward-pop {
          0% { opacity: 0; transform: translate(-50%, 10px) scale(0.86); }
          18% { opacity: 1; transform: translate(-50%, -2px) scale(1.06); }
          72% { opacity: 1; transform: translate(-50%, -8px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -16px) scale(0.94); }
        }

        @keyframes bible-year-completed-task-firework {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2) rotate(0deg); }
          18% { opacity: 1; }
          72% { opacity: 0.82; }
          100% { opacity: 0; transform: translate(calc(-50% + var(--fx-x)), calc(-50% + var(--fx-y))) scale(1.12) rotate(var(--fx-r)); }
        }

        @keyframes bible-year-completed-task-star-float {
          0%, 100% { opacity: 0.42; transform: translateY(0) scale(0.86) rotate(0deg); }
          50% { opacity: 1; transform: translateY(-5px) scale(1.12) rotate(12deg); }
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

        @keyframes bible-year-deep-notes-dance {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); box-shadow: 0 8px 18px rgba(47, 127, 232, 0.14); }
          10% { transform: translateX(-2px) translateY(-1px) rotate(-1deg) scale(1.01); box-shadow: 0 13px 26px rgba(47, 127, 232, 0.24); }
          20% { transform: translateX(2px) translateY(0) rotate(1deg) scale(1.015); box-shadow: 0 12px 24px rgba(246, 180, 75, 0.22); }
          30% { transform: translateX(-2px) translateY(-1px) rotate(-0.8deg) scale(1.012); }
          40% { transform: translateX(2px) translateY(0) rotate(0.8deg) scale(1.015); }
          50% { transform: translateX(0) translateY(-2px) rotate(0deg) scale(1.02); box-shadow: 0 16px 30px rgba(47, 127, 232, 0.28); }
          64%, 88% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
        }

          @keyframes bible-year-task-soft-pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 8px 20px color-mix(in srgb, var(--bb-accent, #2f7fe8) 8%, transparent);
              border-color: color-mix(in srgb, var(--bb-card-border, #dbe7f4) 82%, transparent);
            }
            50% {
              transform: scale(1.012);
              box-shadow:
                0 14px 30px color-mix(in srgb, var(--bb-accent, #2f7fe8) 18%, transparent),
                0 0 0 4px color-mix(in srgb, var(--bb-accent, #2f7fe8) 9%, transparent);
              border-color: color-mix(in srgb, var(--bb-accent, #2f7fe8) 38%, var(--bb-card-border, #dbe7f4));
            }
          }

        @keyframes bible-year-current-milestone {
          0%, 100% {
            transform: scale(1);
            box-shadow:
              0 0 0 0 color-mix(in srgb, var(--bb-accent, #2f7fe8) 42%, transparent),
              0 12px 26px color-mix(in srgb, var(--bb-accent, #2f7fe8) 24%, transparent);
          }
          50% {
            transform: scale(1.12);
            box-shadow:
              0 0 0 14px color-mix(in srgb, var(--bb-accent, #2f7fe8) 0%, transparent),
              0 18px 38px color-mix(in srgb, var(--bb-accent, #2f7fe8) 38%, transparent);
          }
        }

        @keyframes bible-year-current-milestone-ring {
          0% {
            opacity: 0.62;
            transform: scale(0.92);
          }
          70%, 100% {
            opacity: 0;
            transform: scale(1.72);
          }
        }

        @keyframes start-here-flash {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.45; transform: translateY(-1px); }
        }

        @keyframes task-estimate-primary {
          0%, 43% { opacity: 1; transform: translateY(0); }
          50%, 93% { opacity: 0; transform: translateY(-3px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes task-estimate-secondary {
          0%, 43% { opacity: 0; transform: translateY(3px); }
          50%, 93% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(3px); }
        }

        @keyframes buddy-rewards-bob {
          0%, 100% { transform: translateY(0) rotate(-1deg) scale(1); }
          45% { transform: translateY(-6px) rotate(1.5deg) scale(1.03); }
          70% { transform: translateY(-2px) rotate(0deg) scale(1.01); }
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
        .completion-side-firework span { animation: completion-side-firework 1.6s ease-out infinite; }
        .completion-side-firework span:nth-child(2) { animation-delay: 180ms; }
        .completion-side-firework span:nth-child(3) { animation-delay: 360ms; }
        .completion-side-firework span:nth-child(4) { animation-delay: 540ms; }
        .completion-side-firework span:nth-child(5) { animation-delay: 720ms; }
        .completion-side-firework span:nth-child(6) { animation-delay: 900ms; }
        .bible-year-completed-tasks-celebrate { animation: bible-year-completed-tasks-celebrate 2.4s ease-in-out infinite; }
        .bible-year-completed-tasks-receive { animation: bible-year-completed-tasks-receive 860ms cubic-bezier(0.18, 0.9, 0.18, 1.12) both; }
        .bible-year-task-absorbing { animation: bible-year-task-absorbing 860ms cubic-bezier(0.18, 0.9, 0.18, 1.08) both; pointer-events: none; }
        .bible-year-reward-pop { animation: bible-year-reward-pop 1.55s ease-out both; }
        .bible-year-completed-task-fireworks span { animation: bible-year-completed-task-firework 1.55s ease-out infinite; }
        .bible-year-completed-task-fireworks span:nth-child(2) { animation-delay: 160ms; }
        .bible-year-completed-task-fireworks span:nth-child(3) { animation-delay: 320ms; }
        .bible-year-completed-task-fireworks span:nth-child(4) { animation-delay: 480ms; }
        .bible-year-completed-task-fireworks span:nth-child(5) { animation-delay: 640ms; }
        .bible-year-completed-task-fireworks span:nth-child(6) { animation-delay: 800ms; }
        .bible-year-completed-task-stars span { animation: bible-year-completed-task-star-float 1.9s ease-in-out infinite; }
        .bible-year-completed-task-stars span:nth-child(2) { animation-delay: 180ms; }
        .bible-year-completed-task-stars span:nth-child(3) { animation-delay: 360ms; }
        .bible-year-completed-task-stars span:nth-child(4) { animation-delay: 540ms; }
        .bible-year-completed-task-stars span:nth-child(5) { animation-delay: 720ms; }
        .bible-year-completed-task-stars span:nth-child(6) { animation-delay: 900ms; }
        .chapter-card-drop { animation: chapter-card-drop 560ms cubic-bezier(0.2, 0.9, 0.18, 1.15) both; }
        @keyframes dashboard-task-extension-open {
          from { opacity: 0; transform: translateY(-8px); clip-path: inset(0 0 100% 0); }
          to { opacity: 1; transform: translateY(0); clip-path: inset(0 0 0 0); }
        }
        .dashboard-task-card-extension {
          animation: dashboard-task-extension-open 260ms cubic-bezier(0.16, 0.9, 0.22, 1) both;
        }
        .dashboard-task-shell-open {
          transform: translateY(-1px);
        }
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
        .bible-year-task-soft-pulse { animation: bible-year-task-soft-pulse 2.4s ease-in-out infinite; }
        .bible-year-deep-notes-dance {
          animation: bible-year-deep-notes-dance 1.85s ease-in-out infinite;
          transform-origin: center;
          will-change: transform, box-shadow;
        }
        .bible-year-current-milestone { animation: bible-year-current-milestone 1.2s ease-in-out infinite; }
        .bible-year-current-milestone::before {
          content: "";
          position: absolute;
          inset: -7px;
          border-radius: 999px;
          border: 2px solid color-mix(in srgb, var(--bb-accent, #2f7fe8) 72%, transparent);
          animation: bible-year-current-milestone-ring 1.2s ease-out infinite;
          pointer-events: none;
        }
        .bible-year-current-cover::before,
        .bible-year-current-cover::after {
          content: "";
          position: absolute;
          inset: -10px;
          border-radius: 18px;
          border: 2px solid color-mix(in srgb, var(--bb-accent, #2f7fe8) 62%, transparent);
          animation: bible-year-current-cover-rays 1.65s ease-out infinite;
          pointer-events: none;
        }
        .bible-year-current-cover::after {
          inset: -16px;
          animation-delay: 0.45s;
          opacity: 0.55;
        }
        @keyframes bible-year-current-cover-rays {
          0% { opacity: 0.72; transform: scale(0.88); }
          72%, 100% { opacity: 0; transform: scale(1.22); }
        }
        .bible-year-journey-scroll {
          scrollbar-width: thin;
          scrollbar-color:
            color-mix(in srgb, var(--bb-accent, #2f7fe8) 72%, var(--bb-card-border, #dbe7f4))
            color-mix(in srgb, var(--bb-card, #ffffff) 34%, transparent);
        }
        .bible-year-journey-scroll::-webkit-scrollbar {
          height: 12px;
        }
        .bible-year-journey-scroll::-webkit-scrollbar-track {
          border-radius: 999px;
          background: color-mix(in srgb, var(--bb-card, #ffffff) 34%, transparent);
          border: 1px solid color-mix(in srgb, var(--bb-card-border, #dbe7f4) 54%, transparent);
        }
        .bible-year-journey-scroll::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background:
            linear-gradient(90deg,
              color-mix(in srgb, var(--bb-accent, #2f7fe8) 76%, var(--bb-card, #ffffff)),
              color-mix(in srgb, var(--bb-accent, #2f7fe8) 46%, var(--bb-button, #2f7fe8))
            );
          border: 3px solid color-mix(in srgb, var(--bb-card, #ffffff) 40%, transparent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--bb-accent, #2f7fe8) 24%, transparent);
        }
        .bible-year-journey-scroll::-webkit-scrollbar-button {
          width: 0;
          height: 0;
          display: none;
        }
        .bible-year-study-notes-scroll {
          scrollbar-width: thin;
          scrollbar-color:
            color-mix(in srgb, var(--bb-accent, #2f7fe8) 64%, var(--bb-card-border, #dbe7f4))
            color-mix(in srgb, var(--bb-card, #ffffff) 72%, var(--bb-surface-soft, #f8fbff));
        }
        .bible-year-study-notes-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .bible-year-study-notes-scroll::-webkit-scrollbar-track {
          border-radius: 999px;
          background: color-mix(in srgb, var(--bb-card, #ffffff) 72%, var(--bb-surface-soft, #f8fbff));
          border-left: 1px solid color-mix(in srgb, var(--bb-card-border, #dbe7f4) 72%, transparent);
        }
        .bible-year-study-notes-scroll::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background:
            linear-gradient(180deg,
              color-mix(in srgb, var(--bb-accent, #2f7fe8) 76%, var(--bb-card, #ffffff)),
              color-mix(in srgb, var(--bb-accent, #2f7fe8) 48%, var(--bb-button, #2f7fe8))
            );
          border: 2px solid color-mix(in srgb, var(--bb-card, #ffffff) 74%, var(--bb-surface-soft, #f8fbff));
          box-shadow: 0 0 10px color-mix(in srgb, var(--bb-accent, #2f7fe8) 20%, transparent);
        }
        .bible-year-study-notes-scroll::-webkit-scrollbar-button {
          width: 0;
          height: 0;
          display: none;
        }
        .bible-year-follow-along-scroll {
          scrollbar-width: thin;
          scrollbar-color:
            color-mix(in srgb, var(--bb-accent, #2f7fe8) 76%, var(--bb-button, #2f7fe8))
            color-mix(in srgb, var(--bb-card, #111827) 74%, #020617);
        }
        .bible-year-follow-along-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .bible-year-follow-along-scroll::-webkit-scrollbar-track {
          border-radius: 999px;
          background:
            linear-gradient(180deg,
              color-mix(in srgb, var(--bb-card, #111827) 82%, #020617),
              color-mix(in srgb, var(--bb-surface-soft, #1f2937) 52%, #020617)
            );
          border-left: 1px solid color-mix(in srgb, var(--bb-accent, #2f7fe8) 20%, transparent);
        }
        .bible-year-follow-along-scroll::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background:
            linear-gradient(180deg,
              color-mix(in srgb, var(--bb-accent, #2f7fe8) 86%, #ffffff),
              color-mix(in srgb, var(--bb-button, #2f7fe8) 72%, #020617)
            );
          border: 2px solid color-mix(in srgb, var(--bb-card, #111827) 72%, #020617);
          box-shadow:
            0 0 12px color-mix(in srgb, var(--bb-accent, #2f7fe8) 34%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.22);
        }
        .bible-year-follow-along-scroll::-webkit-scrollbar-button {
          width: 0;
          height: 0;
          display: none;
        }
        .start-here-flash { animation: start-here-flash 1s ease-in-out infinite; }
        .task-estimate-primary { animation: task-estimate-primary 2.4s ease-in-out infinite; }
        .task-estimate-secondary { animation: task-estimate-secondary 2.4s ease-in-out infinite; }
        .buddy-rewards-buddy {
          animation: buddy-rewards-bob 3.2s ease-in-out infinite;
          transform-origin: center bottom;
          filter: drop-shadow(0 12px 18px rgba(38, 63, 99, 0.18));
        }
        .spark-a { --spark-x: -53px; --spark-y: -53px; }
        .spark-b { --spark-x: 23px; --spark-y: -70px; }
        .spark-c { --spark-x: 85px; --spark-y: -25px; }
        .spark-d { --spark-x: 53px; --spark-y: 43px; }
        .spark-e { --spark-x: -35px; --spark-y: 38px; }
        .bb-dashboard-stable-motion body::before,
        .bb-dashboard-stable-motion body::after {
          animation: none !important;
          opacity: 0 !important;
          content: none !important;
        }
        .bb-dashboard-stable-motion .next-task-pulse,
        .bb-dashboard-stable-motion .start-here-flash,
        .bb-dashboard-stable-motion .task-estimate-primary,
        .bb-dashboard-stable-motion .task-estimate-secondary,
        .bb-dashboard-stable-motion .buddy-rewards-buddy,
        .bb-dashboard-stable-motion .done-sparkle span,
        .bb-dashboard-stable-motion .completion-side-firework span,
        .bb-dashboard-stable-motion .chapter-confetti span,
        .bb-dashboard-stable-motion .chapter-firework-ring,
        .bb-dashboard-stable-motion .chapter-complete-fill,
        .bb-dashboard-stable-motion .progress-glow {
          animation: none !important;
        }
      `}</style>
      <div
        ref={containerRef}
        className="overflow-x-hidden overflow-y-visible [scrollbar-width:none] [touch-action:auto] [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${safeActivePage * 100}%)` }}
        >
        <div className={getSlideClass(0)}>
        <section className="w-full px-1">
          <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
            {shouldShowBibleBuddy3ModeGate ? (
              renderBibleBuddy3ModeGate()
            ) : bibleYearSeriesActive ? (
              renderBibleYearSeriesPage()
            ) : !bibleYearDashboardActive && selectedBibleYearSeriesDay && activeBibleYearDayCard === "reading" ? (
              renderBibleYearReadingArticlePage(selectedBibleYearSeriesDay)
            ) : (
              <>
            {!homePanelOverride && !deepStudyFocusActive && !showOfficialHomeMission ? (
              <div className="mx-auto w-full max-w-xl px-1">
                <h1 className="text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-3xl">
                  {dashboardGreeting}, {getFirstDashboardName(profile?.display_name || profile?.username || userName)}
                </h1>
              </div>
            ) : null}
            {isAnonymousGuest && !homePanelOverride && !deepStudyFocusActive ? (
              <button
                type="button"
                onClick={() => setGuestInfoModalOpen(true)}
                className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_34%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-accent-soft,#eaf5ff)] px-4 py-3 text-left shadow-sm transition hover:brightness-95"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">Create a Bible Buddy account for full features</span>
                  <span className="mt-0.5 block text-xs font-semibold text-[var(--bb-text-secondary,#4b5563)]">Save progress across devices and unlock community features.</span>
                </span>
                <span className="shrink-0 rounded-full bg-[var(--bb-button,#2f7fe8)] px-3 py-1.5 text-xs font-black text-[var(--bb-button-text,#ffffff)]">
                  Learn more
                </span>
              </button>
            ) : null}
            {!homePanelOverride && !deepStudyFocusActive && !showOfficialHomeMission ? homeHeader : null}
            {homePanelOverride ? (
              <div className="dashboard-inline-task">{homePanelOverride}</div>
            ) : null}
            {!homePanelOverride && !deepStudyFocusActive && !bibleYearDashboardActive && !shouldShowCompletionPanel && !selectedBibleYearSeriesDay ? renderCurrentStudyHeader() : null}
            {!homePanelOverride && !deepStudyFocusActive && !bibleYearDashboardActive && !shouldShowCompletionPanel && !shouldHideCompletedChapterProgressCard && !selectedBibleYearSeriesDay ? (
            <div
              className="bb-skin-glow-card rounded-[22px] border border-[#dbe7f4] bg-white p-3 shadow-[0_10px_28px_rgba(38,63,99,0.08)] transition"
            >
              <div className="mb-2">
                <div className="min-w-0">
                  <h2 className="min-w-0 whitespace-nowrap text-[clamp(16px,4.8vw,20px)] font-black leading-tight text-gray-950">
                    {nextTaskTitle}
                  </h2>
                  <p className="mt-0.5 text-[11px] font-bold leading-tight text-gray-500">
                    {estimatedStudyTimeLabel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(var(--bb-accent) ${studyProgressPercent}%, var(--bb-progress-track) 0)`,
                  }}
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--bb-card)] text-xs font-black text-[var(--bb-accent)]">
                    {studyProgressCompleted}/{studyProgressTotal}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-gray-950">{activeChapterLabel}</p>
                  <p className="mt-0.5 text-xs font-semibold leading-5 text-gray-500">{studyProgressMotivation}</p>
                </div>
                <span className="text-xl text-gray-400" aria-hidden="true">â€º</span>
              </div>
              {false ? (
                <div className="hidden">
                  <div className="mt-4 grid gap-2">
                    {currentStudyChapters.map((studyChapter) => {
                      const chapterLabel =
                        studyChapter.bible_reading_book && studyChapter.bible_reading_chapter
                          ? `${studyChapter.bible_reading_book} ${studyChapter.bible_reading_chapter}`
                          : studyChapter.day_title || `Chapter ${studyChapter.day_number}`;
                      const currentDayNumber = currentDevotionalTask?.devotionalDayNumber ?? 1;
                      const isCurrent = studyChapter.day_number === currentDayNumber;
                      const isUnlockedForFree = studyChapter.day_number <= currentDayNumber;
                      const isLocked = !isOwnerDashboard && !isPaidUser && !isUnlockedForFree;
                      const isPastOrCurrent = studyChapter.day_number <= currentDayNumber;

                      return (
                        <button
                          key={studyChapter.day_number}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            if (isLocked) return;
                            void switchCurrentStudyChapter(studyChapter.day_number);
                          }}
                          disabled={isCurrent || isLocked || switchingStudyChapter !== null}
                          className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                            isCurrent
                              ? "border-[var(--bb-accent)] bg-[var(--bb-accent-soft)]"
                              : isPastOrCurrent
                              ? "border-[#b9dcf4] bg-[#eaf5ff] hover:border-[#7BAFD4]"
                                : isLocked
                                  ? "border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] opacity-70"
                                  : "border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] hover:border-[var(--bb-accent)]"
                          } disabled:opacity-70`}
                        >
                          <span className="min-w-0">
                            <span className="bb-text-primary block text-sm font-black">{chapterLabel}</span>
                            <span className="bb-text-muted mt-0.5 block text-xs font-bold">
                              {studyChapter.day_title || `Chapter ${studyChapter.day_number}`}
                            </span>
                          </span>
                          <span className={`shrink-0 text-xs font-black ${isPastOrCurrent && !isCurrent ? "text-[#2f6685]" : "bb-accent"}`}>
                            {isLocked ? "ðŸ”’" : isCurrent ? "Review" : switchingStudyChapter === studyChapter.day_number ? "Loading" : "Load"}
                          </span>
                        </button>
                      );
                    })}
                    {!currentStudyChapters.length ? (
                      <p className="bb-text-muted rounded-2xl border border-[var(--bb-card-border)] bg-[var(--bb-surface-soft)] px-4 py-4 text-sm font-bold">
                        Loading study chapters...
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            ) : null}
            {!bibleYearDashboardActive && !homePanelOverride && !shouldShowCompletionPanel && deepStudyNode ? (
              <div className="dashboard-inline-deep-study mb-3 sm:mb-4">{deepStudyNode}</div>
            ) : null}
            {bibleYearDashboardActive && activeBibleYearDashboardDay && !homePanelOverride && !shouldShowCompletionPanel ? (
              <>
                {renderHomeSupportStatsStrip()}
                {renderBibleYearHomeProgressSnapshot(activeBibleYearDashboardDay)}
                <section data-bb-dashboard-tour="journey-map" className="dashboard-inline-task mb-3 overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent)_32%,transparent)] bg-[color-mix(in_srgb,var(--bb-card)_82%,transparent)] text-[var(--bb-text-primary)] shadow-[0_14px_34px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
                  <button
                    type="button"
                    onClick={openBibleYearSeriesDashboard}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[color-mix(in_srgb,var(--bb-accent-soft)_40%,transparent)]"
                    aria-expanded={true}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent)_34%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-accent-soft,#f2f7ff)] text-[var(--bb-accent,#2f7fe8)]">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
                        <path d="M8 7h8" />
                        <path d="M8 11h6" />
                      </svg>
                    </span>
                      <span className="min-w-0 flex-1">
                      <span className="mt-0.5 block text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">Journey Map</span>
                      <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                        {isOwnerDashboard
                          ? "Owner preview - every built day is unlocked"
                          : `Day ${effectiveBibleYearReport.currentDay ?? getCurrentBibleYearSeriesDayNumber()} - past days checked, today active, future days locked`}
                      </span>
                    </span>
                    <span className="shrink-0 text-[var(--bb-accent,#2f7fe8)] transition" aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                  </button>

                  {activeBibleYearDashboardDay ? (
                    <>
                    <div className="dashboard-inline-task border-t border-[var(--bb-card-border,#dbe7f4)] px-3 pb-3 pt-2 sm:px-4">
                      <div className="bible-year-journey-scroll overflow-x-auto px-1 pb-2 pt-4">
                        <div className="grid min-w-[720px] grid-cols-8 items-start gap-2">
                          {bibleYearStudyPlanMilestones.map((milestone, index) => {
                            const completed = bibleYearCompletedCardsByDay[milestone.dayNumber] || {};
                            const isComplete = Boolean(completed.reading && completed.trivia && completed.reflection);
                            const currentSeriesDayNumber = getCurrentBibleYearSeriesDayNumber();
                            const isCurrent = currentSeriesDayNumber === milestone.dayNumber;
                            const milestoneDay = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => day.dayNumber === milestone.dayNumber);
                            const isLocked = milestoneDay ? isBibleYearDayVisuallyLocked(milestoneDay) : true;
                            const isUnlocked = !isLocked;
                            const milestoneCover =
                              milestoneDay?.coverImage ||
                              getDashboardStudyCover(milestoneDay?.readings[0]?.studyTitle || milestoneDay?.title || milestone.label) ||
                              "/thefallofman.png";
                            const milestoneDayLabel = `Day ${milestone.dayNumber}`;
                            const isSelectedDetail = bibleYearJourneyPreviewDay?.dayNumber === milestone.dayNumber;

                            return (
                              <div key={milestone.dayNumber} className="relative px-1 text-center">
                                {index > 0 ? (
                                  <span
                                    className={`absolute left-[-50%] top-[45px] h-[2px] w-full ${
                                      isComplete
                                        ? "bg-emerald-400/80"
                                        : isCurrent
                                          ? "bg-[var(--bb-accent,#2f7fe8)]"
                                        : "bg-[var(--bb-card-border,#dbe7f4)]/75"
                                    }`}
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!milestoneDay) return;
                                    openBibleYearDayOnDashboard(milestoneDay, { reviewCompleted: isComplete });
                                    setBibleYearJourneyPreviewDay((current) =>
                                      current?.dayNumber === milestoneDay.dayNumber ? null : milestoneDay,
                                    );
                                  }}
                                  disabled={!milestoneDay}
                                  className={`relative z-10 mx-auto grid h-[82px] w-[62px] overflow-visible rounded-[15px] border bg-[var(--bb-card,#ffffff)] p-1 shadow-sm transition ${
                                    isSelectedDetail
                                      ? "border-[var(--bb-accent,#2f7fe8)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,transparent),0_0_28px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_38%,transparent)] ring-2 ring-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_30%,transparent)]"
                                      : isComplete
                                      ? "border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.42)] ring-2 ring-emerald-300/25"
                                      : isCurrent
                                        ? "bible-year-current-cover border-[var(--bb-accent,#2f7fe8)] shadow-[0_0_28px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_42%,transparent)] ring-2 ring-[color-mix(in_srgb,var(--bb-accent)_22%,transparent)]"
                                        : isUnlocked
                                          ? "border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_42%,var(--bb-card-border,#dbe7f4))] hover:border-[var(--bb-accent,#2f7fe8)]"
                                          : "border-[var(--bb-card-border,#dbe7f4)] opacity-80"
                                  }`}
                                  aria-label={`${milestoneDayLabel} ${isComplete ? "complete" : isCurrent ? "current day" : "locked"}`}
                                >
                                  <span className="relative block h-full w-full overflow-hidden rounded-[10px] bg-[var(--bb-surface-soft,#f4f8ff)]">
                                    <img
                                      src={milestoneCover}
                                      alt=""
                                      loading="lazy"
                                      decoding="async"
                                      className={`h-full w-full object-cover transition duration-300 ${
                                        isLocked ? "grayscale contrast-75 brightness-70 opacity-65" : "brightness-105"
                                      }`}
                                    />
                                    {isLocked ? <span className="absolute inset-0 bg-black/24" aria-hidden="true" /> : null}
                                  </span>
                                  <span
                                    className={`absolute -right-2 -top-2 z-20 grid h-6 w-6 place-items-center rounded-full text-[11px] font-black shadow-[0_6px_14px_rgba(0,0,0,0.22)] ${
                                      isComplete
                                        ? "bg-emerald-500 text-white shadow-[0_0_0_2px_rgba(6,78,59,0.95),0_0_18px_rgba(16,185,129,0.75)]"
                                        : isCurrent
                                          ? "border border-[var(--bb-card,#ffffff)] bg-[var(--bb-accent,#2f7fe8)] text-[var(--bb-button-text,#ffffff)]"
                                          : "border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-muted,#6b7280)]"
                                    }`}
                                    aria-hidden="true"
                                  >
                                    {isComplete ? "\u2713" : isCurrent ? "\u2022" : "\uD83D\uDD12"}
                                  </span>
                                </button>
                                <p className="mt-2 truncate text-[11px] font-black leading-tight text-[var(--bb-text-primary,#111827)]">{milestoneDayLabel}</p>
                                <p className={`mt-0.5 text-[10px] font-bold leading-tight ${
                                  isComplete
                                    ? "text-emerald-500"
                                    : isCurrent
                                      ? "text-[var(--bb-accent,#2f7fe8)]"
                                      : "text-[var(--bb-text-muted,#6b7280)]"
                                }`}>
                                  {isComplete ? "Complete" : isCurrent ? "Current Day" : "Locked"}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {bibleYearJourneyPreviewDay ? renderBibleYearJourneyInlinePreview(bibleYearJourneyPreviewDay) : null}
                    </div>
                    </>
                  ) : null}
                </section>

              </>
            ) : null}
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
                  âš™
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
                        <LouisAvatar mood={allDone ? "stareyes" : "wave"} size={68} />
                      </div>
                      <div className="min-w-0 flex-1 pr-8">
                        <p className="text-sm font-normal leading-6 text-gray-800">{louisMessage.focusLine}</p>
                      </div>
                    </div>

                    <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
                      <div
                        key={progressCelebrationKey}
                        className={`h-2.5 rounded-full transition-all duration-700 ${progressCelebrationKey > 0 ? "progress-glow" : ""} ${allDone ? "chapter-complete-fill bg-[#7BAFD4]" : "bg-[#d8aa57]"}`}
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
                        <LouisAvatar mood="wave" size={64} />
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
                      Ã—
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
                                    <img src={cover} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="grid h-full w-full place-items-center text-lg">ðŸ“–</div>
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
              </>
            )}

            {!bibleYearSeriesActive && !shouldShowBibleBuddy3ModeGate && !selectedBibleYearSeriesDay && (isChecklistSyncing || (isLoadingNextChapter && !preloadedNextChapter?.tasks.length && !preloadedNextStudy?.tasks.length)) ? (
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
                      <span className="text-xl leading-none text-gray-300" aria-hidden="true">â€º</span>
                    </div>
                  </div>
                </div>
              ))
            ) : bibleYearSeriesActive ? null : !bibleYearDashboardActive && !homePanelOverride && shouldShowCompletionPanel ? (
              <div className="completion-panel-enter relative overflow-hidden rounded-[28px] border border-[#dbe7f4] bg-white/90 px-5 pb-5 pt-7 text-center shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
                <div className="chapter-firework-ring pointer-events-none absolute left-1/2 top-16 h-24 w-24 rounded-full border-4 border-[#7BAFD4]/45" aria-hidden="true" />
                <div className="chapter-confetti pointer-events-none absolute left-1/2 top-16" aria-hidden="true">
                  <span className="absolute h-2 w-3 rounded-sm bg-amber-400 [--confetti-rotate:160deg] [--confetti-x:-104px] [--confetti-y:-78px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-sky-400 [--confetti-rotate:-120deg] [--confetti-x:86px] [--confetti-y:-92px]" />
                  <span className="absolute h-3 w-2 rounded-sm bg-[#7BAFD4] [--confetti-rotate:210deg] [--confetti-x:-72px] [--confetti-y:52px]" />
                  <span className="absolute h-2 w-3 rounded-sm bg-rose-400 [--confetti-rotate:-190deg] [--confetti-x:108px] [--confetti-y:36px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-violet-400 [--confetti-rotate:140deg] [--confetti-x:-28px] [--confetti-y:-118px]" />
                  <span className="absolute h-3 w-2 rounded-sm bg-lime-400 [--confetti-rotate:-155deg] [--confetti-x:30px] [--confetti-y:76px]" />
                  <span className="absolute h-2 w-3 rounded-sm bg-orange-400 [--confetti-rotate:190deg] [--confetti-x:-126px] [--confetti-y:4px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-cyan-400 [--confetti-rotate:-130deg] [--confetti-x:132px] [--confetti-y:-22px]" />
                </div>
                <div className="completion-side-firework pointer-events-none absolute left-12 top-24" aria-hidden="true">
                  <span className="absolute h-2 w-3 rounded-sm bg-amber-400 [--fx-r:140deg] [--fx-x:-42px] [--fx-y:-42px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-sky-400 [--fx-r:-160deg] [--fx-x:34px] [--fx-y:-50px]" />
                  <span className="absolute h-3 w-2 rounded-sm bg-[#7BAFD4] [--fx-r:210deg] [--fx-x:-28px] [--fx-y:42px]" />
                  <span className="absolute h-2 w-3 rounded-sm bg-rose-400 [--fx-r:-190deg] [--fx-x:48px] [--fx-y:24px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-violet-400 [--fx-r:120deg] [--fx-x:4px] [--fx-y:-64px]" />
                  <span className="absolute h-3 w-2 rounded-sm bg-lime-400 [--fx-r:-130deg] [--fx-x:10px] [--fx-y:54px]" />
                </div>
                <div className="completion-side-firework pointer-events-none absolute right-12 top-24" aria-hidden="true">
                  <span className="absolute h-2 w-3 rounded-sm bg-orange-400 [--fx-r:-150deg] [--fx-x:42px] [--fx-y:-42px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-cyan-400 [--fx-r:160deg] [--fx-x:-34px] [--fx-y:-50px]" />
                  <span className="absolute h-3 w-2 rounded-sm bg-[#7BAFD4] [--fx-r:-210deg] [--fx-x:28px] [--fx-y:42px]" />
                  <span className="absolute h-2 w-3 rounded-sm bg-rose-400 [--fx-r:190deg] [--fx-x:-48px] [--fx-y:24px]" />
                  <span className="absolute h-2 w-2 rounded-full bg-violet-400 [--fx-r:-120deg] [--fx-x:-4px] [--fx-y:-64px]" />
                  <span className="absolute h-3 w-2 rounded-sm bg-lime-400 [--fx-r:130deg] [--fx-x:-10px] [--fx-y:54px]" />
                </div>
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full">
                  <LouisAvatar mood="stareyes" size={114} />
                </div>
                {preloadedNextStudy ? (
                  <>
                    <p className="relative mt-4 text-2xl font-black text-gray-950">Bible Study Complete!</p>
                    <p className="mt-2 text-base font-bold text-gray-800">
                      You completed {currentDevotionalTitle || "this Bible study"}.
                    </p>
                    <div className="mx-auto mt-5 flex max-w-md items-stretch gap-3 rounded-2xl border border-[#dbe7f3] bg-white/85 p-2 text-left shadow-sm">
                      <div className="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f4f8ff] shadow-sm">
                        <img
                          src={preloadedNextStudy.cover}
                          alt={preloadedNextStudy.title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-center pr-2">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5e8eb0]">
                          Next Bible Plan
                        </p>
                        <p className="mt-1 text-2xl font-black leading-tight text-gray-950 sm:text-3xl">
                          {preloadedNextStudy.title}
                        </p>
                        <p className="mt-2 text-base font-black leading-5 text-gray-600 sm:text-lg">{preloadedNextStudy.subtitle}</p>
                      </div>
                    </div>
                    <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-6 text-gray-600">
                      {preloadedNextStudy.description}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="relative mt-4 text-2xl font-black text-gray-950">ðŸŽ‰ Congratulations!</p>
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
            ) : homePanelOverride ? null : (
              <>
              {suppressCompletionPanelForLoadedChapter && allDone ? (
                <div className="completion-panel-enter rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
                  <div className="flex items-start gap-3">
                    <div className="-ml-2 shrink-0">
                      <LouisAvatar mood="reading" size={114} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">
                        Chapter Review
                      </p>
                      <h3 className="mt-1 text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
                        All tasks for {activeChapterLabel} are done.
                      </h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#5f6368)]">
                        You can always review this chapter below in Completed Study Tasks. Tap any completed task to reopen the intro, Scripture, notes, trivia, or reflection.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
              {bibleYearDashboardActive && activeBibleYearDashboardDay ? (
                renderBibleYearDashboardStudyArea(activeBibleYearDashboardDay, displayTasks)
              ) : !bibleYearDashboardActive ? (
                <>
              {selectedBibleYearSeriesDay && dashboardAllDone && bibleYearJustCompletedDayRef.current === selectedBibleYearSeriesDay.dayNumber ? (
                renderBibleYearCompletedDayPanel(selectedBibleYearSeriesDay)
              ) : null}
              {selectedBibleYearSeriesDay && dashboardAllDone && bibleYearJustCompletedDayRef.current !== selectedBibleYearSeriesDay.dayNumber ? (
                renderBibleYearReflectionReviewButton(selectedBibleYearSeriesDay)
              ) : null}
              {displayTasks.map((task, index) => {
                const originalTaskIndex = displayTasks.findIndex((visibleTask) => visibleTask.kind === task.kind);
                const bibleYearTaskCard = selectedBibleYearSeriesDay ? getBibleYearDayTaskKey(task) : null;
                const fixedBibleYearTaskIndex =
                  selectedBibleYearSeriesDay && bibleYearTaskCard
                    ? getBibleYearRequiredCardKeys(selectedBibleYearSeriesDay).indexOf(bibleYearTaskCard)
                    : -1;
                const taskIndex = fixedBibleYearTaskIndex >= 0 ? fixedBibleYearTaskIndex : originalTaskIndex >= 0 ? originalTaskIndex : index;
                const taskCopy = getTaskCardCopy(task, taskIndex);
                const justCompleted = Boolean(task.done && previousDoneByKindRef.current && !previousDoneByKindRef.current[task.kind]);
                const isCelebrating = Boolean(celebratingTasks[task.kind]) || justCompleted;
                const bibleYearOrderLocked = Boolean(
                  selectedBibleYearSeriesDay &&
                  bibleYearTaskCard &&
                  !task.done &&
                  isBibleYearTaskLockedForFree(selectedBibleYearSeriesDay, bibleYearTaskCard),
                );
                const isLockedByOrder =
                  bibleYearOrderLocked ||
                  (!selectedBibleYearSeriesDay && !isPaidUser && !task.done && displayNextActionTaskIndex >= 0 && taskIndex > displayNextActionTaskIndex);
                const isCardDisabled = Boolean(task.disabled || isLockedByOrder);
                const isNextActionTask = task.kind === displayNextActionTaskKind && !isCardDisabled;
                const pointsPillLabel = task.pointsLabel;
                const activeTaskPrompt = null as ActiveTaskPrompt | null;
                const taskStatusLabel = getTaskStatusLine(task);
                const isActiveInlineTask = bibleYearTaskCard
                  ? activeBibleYearDayCard === bibleYearTaskCard
                  : activeTask?.kind === task.kind &&
                    (activeTask.href || "") === (task.href || "") &&
                    (activeTask.chapterLabel || "") === (task.chapterLabel || "");
                const keepBibleYearVideoMounted =
                  bibleYearTaskCard === "reading" &&
                  selectedBibleYearSeriesDay?.dayNumber === bibleYearPersistentVideoDay &&
                  !task.done;

                const taskShellClasses = task.done
                  ? "border-[#b9dcf4] bg-gradient-to-r from-[#eaf5ff] via-white to-[#e2f1fb] hover:bg-[#eaf5ff]"
                  : isCardDisabled
                    ? "cursor-not-allowed border-[#e2e8f0] bg-gradient-to-r from-white via-[#f7fbff] to-white text-gray-700 opacity-95"
                    : isActiveInlineTask
                      ? "border-[var(--bb-accent)] bg-[var(--bb-card)] text-[var(--bb-text-primary)] shadow-[0_16px_40px_rgba(38,63,99,0.16)]"
                      : "border-[#dbe7f4] bg-gradient-to-r from-white via-[#fbfdff] to-white text-gray-700 hover:shadow-md";

                return (
                <div
                  key={task.kind}
                  className={`dashboard-task-shell relative w-full overflow-hidden rounded-[18px] border shadow-sm transition-all duration-300 ${
                    isCelebrating ? "task-complete-pop" : ""
                  } ${
                    isNewChapterDropping ? "chapter-card-drop" : ""
                  } ${
                    isNextActionTask && !isActiveInlineTask ? "next-task-pulse" : ""
                  } ${
                    selectedBibleYearSeriesDay && bibleYearTaskCard && !task.done && !isCardDisabled && !isActiveInlineTask ? "bible-year-task-soft-pulse" : ""
                  } ${
                    isActiveInlineTask ? "dashboard-task-shell-open" : ""
                  } ${taskShellClasses}`}
                  style={isNewChapterDropping ? { animationDelay: `${index * 85}ms` } : undefined}
                >
                <button
                  type="button"
                  onClick={() => {
                    if (isCardDisabled) return;
                    if (bibleYearTaskCard) {
                      if (bibleYearTaskCard === "reading" && selectedBibleYearSeriesDay) {
                        setBibleYearPersistentVideoDay(selectedBibleYearSeriesDay.dayNumber);
                      }
                      setActiveBibleYearDayCard((current) => {
                        const next = current === bibleYearTaskCard ? null : bibleYearTaskCard;
                        if (next && selectedBibleYearSeriesDay) void logBibleYearTaskStarted(selectedBibleYearSeriesDay, bibleYearTaskCard);
                        return next;
                      });
                      return;
                    }
                    onTaskClick(task);
                  }}
                  disabled={isCardDisabled}
                  className="relative w-full px-3.5 py-3 text-left transition-all duration-300 sm:px-4"
                  aria-expanded={isActiveInlineTask}
                >
                  {isCardDisabled && !(selectedBibleYearSeriesDay && bibleYearTaskCard) ? (
                    <span
                      className="absolute bottom-3 right-4 text-base opacity-70"
                      aria-label="Locked"
                      title={bibleYearOrderLocked && selectedBibleYearSeriesDay && bibleYearTaskCard ? getBibleYearLockedTaskTitle(selectedBibleYearSeriesDay, bibleYearTaskCard) : "Complete the task above to unlock this."}
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
                        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7BAFD4] text-xs font-black text-white ring-2 ring-white">
                          âœ“
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
                        <span className={`px-1 py-1 text-xs font-black ${task.done ? "text-[#2f6685]" : "text-[#2f7fe8]"}`}>
                          {pointsPillLabel}
                        </span>
                        <span className={`hidden ${
                          task.done
                            ? "font-medium text-[#2f6685]"
                            : isNextActionTask
                              ? "start-here-flash text-gray-950 font-black tracking-wide"
                              : "font-medium text-gray-500"
                        }`}>
                          <span aria-hidden="true">{task.done ? "â–£" : "â—‹"}</span>
                          {task.done ? (
                            <span className="done-sparkle pointer-events-none absolute -inset-x-2 -top-3 flex justify-between text-[10px] text-amber-400" aria-hidden="true">
                              <span>âœ¦</span>
                              <span>âœ§</span>
                              <span>âœ¦</span>
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
                      <div className={`mt-2 flex w-full items-center gap-3 ${selectedBibleYearSeriesDay && bibleYearTaskCard ? "justify-between" : "justify-center"}`}>
                        <p className="hidden">{taskCopy.subtitle}</p>
                        {task.timeEstimateLabel ? (
                          isCardDisabled && bibleYearOrderLocked && selectedBibleYearSeriesDay && bibleYearTaskCard ? (
                            <p className="min-w-0 flex-1 truncate text-left text-[11px] font-black text-gray-700">
                              {getBibleYearLockedTaskTitle(selectedBibleYearSeriesDay, bibleYearTaskCard)}
                            </p>
                          ) :
                          isActiveInlineTask && task.kind === "notes" && !task.done ? (
                            <p className="relative h-4 min-w-0 flex-1 text-left text-[11px] font-black text-gray-700">
                              <span className="task-estimate-primary absolute inset-0 whitespace-nowrap">
                                Takes about {task.timeEstimateLabel}
                              </span>
                              <span className="task-estimate-secondary absolute inset-0 whitespace-nowrap text-[var(--bb-accent,#2f7fe8)]">
                                Mark as completed below
                              </span>
                            </p>
                          ) : (
                            <p className="min-w-0 flex-1 whitespace-nowrap text-left text-[11px] font-black text-gray-700">
                              Takes about {task.timeEstimateLabel}
                            </p>
                          )
                        ) : null}
                        {selectedBibleYearSeriesDay && bibleYearTaskCard ? (
                          <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-gray-950">
                            {isCardDisabled ? (
                              <span
                                className="text-sm leading-none opacity-75"
                                aria-label="Locked"
                                title={bibleYearOrderLocked ? getBibleYearLockedTaskTitle(selectedBibleYearSeriesDay, bibleYearTaskCard) : "Complete the task above to unlock this."}
                              >
                                {"\uD83D\uDD12"}
                              </span>
                            ) : null}
                            Task {taskIndex + 1}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {!isCardDisabled && !isActiveInlineTask ? (
                      <span className="mt-5 shrink-0 text-xl leading-none text-gray-400" aria-hidden="true">â€º</span>
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
                {isActiveInlineTask || keepBibleYearVideoMounted ? (
                  <div
                    className={
                      isActiveInlineTask
                        ? "px-3.5 pb-3 sm:px-4"
                        : "pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
                    }
                    aria-hidden={!isActiveInlineTask}
                  >
                    {bibleYearTaskCard && selectedBibleYearSeriesDay ? (
                      renderBibleYearInlineTask(bibleYearTaskCard, selectedBibleYearSeriesDay)
                    ) : (
                      <DashboardDailyTaskCallout
                        task={activeTask}
                        userId={userId}
                        onClose={onActiveTaskClose}
                        onProgressUpdated={onActiveTaskProgressUpdated}
                        variant="inline"
                        enableDashboardSkip={isOwnerDashboard}
                      />
                    )}
                  </div>
                ) : null}
                </div>
                );
              })}
              {selectedBibleYearSeriesDay ? renderBibleYearCompletedTasksPanel(selectedBibleYearSeriesDay) : null}
                </>
              ) : null}
              {hasClearableDoneTaskCards ? (
                <button
                  type="button"
                  onClick={handleClearDoneTaskCards}
                  className="mx-auto -mt-1 mb-1 block px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)] transition hover:brightness-75"
                >
                  Clear done Bible study task cards
                </button>
              ) : null}
              </>
            )}

            {!homePanelOverride &&
            !bibleYearSeriesActive &&
            !selectedBibleYearSeriesDay &&
            !suppressCompletedTasksPanel &&
            !shouldShowCompletionPanel &&
            !isLoadingNextChapter &&
            displayTasks.length < visibleTasks.length &&
            completedTrackerTasks.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-[var(--bb-card-border,#b9dcf4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_82%,transparent)] shadow-[0_12px_30px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_14%,transparent)] backdrop-blur">
                <button
                  type="button"
                  onClick={() => setCompletedTasksExpanded((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_70%,transparent)]"
                  aria-expanded={completedTasksExpanded}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-[var(--bb-text-primary,#111827)]">
                      Completed Study Tasks for {activeChapterLabel}
                    </p>
                    <p className="mt-0.5 text-[11px] font-bold text-[var(--bb-text-secondary,#2f6685)]">
                      {completedTrackerTasks.length} of {visibleTasks.length} tasks done
                    </p>
                  </div>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_26%,transparent)] bg-[var(--bb-accent-soft,#eaf5ff)] text-lg font-black text-[var(--bb-accent,#2f7fe8)] transition ${completedTasksExpanded ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    v
                  </span>
                </button>
                {completedTasksExpanded ? (
                <>
                <div className="grid gap-2 border-t border-[var(--bb-card-border,#b9dcf4)] px-3 pb-3 pt-3 sm:grid-cols-2">
                  {completedTrackerTasks.map((task) => {
                    const originalTaskIndex = visibleTasks.findIndex((visibleTask) => visibleTask.kind === task.kind);
                    const taskCopy = getTaskCardCopy(task, originalTaskIndex >= 0 ? originalTaskIndex : 0);
                    const isActiveCompletedTask =
                      activeTask?.kind === task.kind &&
                      (activeTask.href || "") === (task.href || "") &&
                      (activeTask.chapterLabel || "") === (task.chapterLabel || "");
                    return (
                      <div
                        key={`completed-${task.kind}`}
                        className={`overflow-hidden rounded-xl border transition ${
                          isActiveCompletedTask
                            ? "border-[var(--bb-accent,#2f7fe8)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_92%,var(--bb-accent-soft,#eaf5ff))] shadow-[0_10px_24px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,transparent)] sm:col-span-2"
                            : "border-[var(--bb-card-border,#b9dcf4)] bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_66%,transparent)] hover:border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_62%,transparent)] hover:bg-[var(--bb-accent-soft,#eaf5ff)] hover:shadow-sm"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onTaskClick(task)}
                          className="group flex min-h-10 w-full items-center gap-2 px-3 py-2 text-left transition"
                          aria-expanded={isActiveCompletedTask}
                        >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[var(--bb-button,var(--bb-accent,#7BAFD4))] text-[11px] font-black text-[var(--bb-button-text,#ffffff)] shadow-sm" aria-hidden="true">
                          âœ“
                        </span>
                        <span className="min-w-0 flex-1 truncate text-xs font-black text-[var(--bb-text-primary,#1f2937)]">
                          {taskCopy.title}
                        </span>
                        <span className="whitespace-nowrap text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                          {task.completedAtLabel || "Completed"}
                        </span>
                        <span className="hidden">
                          â€º
                        </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
                {activeCompletedTrackerTask ? (
                  <div className="border-t border-[var(--bb-card-border,#b9dcf4)] px-3 pb-3">
                    <DashboardDailyTaskCallout
                      task={activeTask}
                      userId={userId}
                      onClose={onActiveTaskClose}
                      onProgressUpdated={onActiveTaskProgressUpdated}
                      variant="inline"
                      enableDashboardSkip={isOwnerDashboard}
                    />
                  </div>
                ) : null}
                </>
                ) : null}
              </div>
            ) : null}

            {false && currentDevotionalTitle ? (
              <div className="overflow-hidden rounded-2xl border border-[#dbe7f4] bg-white/90 p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-20 w-14 shrink-0 overflow-hidden rounded-xl bg-[#eef6ff] shadow-sm">
                    {currentStudyCover ? (
                      <img src={currentStudyCover || undefined} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-2xl" aria-hidden="true">
                        ðŸ“–
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
          {shouldRenderSlide(1) ? renderEmbeddedBuddyPage() : null}
        </div>

        <div className={getSlideClass(2)}>
          {shouldRenderSlide(2) ? renderDashboardBibleReaderPage() : null}
        </div>

        <div className={getSlideClass(3)}>
          {shouldRenderSlide(3) ? renderEmbeddedBibleStudiesPage() : null}
        </div>

        <div className={getSlideClass(4)}>
          {shouldRenderSlide(4) ? <BibleTopicsPanel userId={userId} /> : null}
        </div>

        <div className={getSlideClass(5)}>
          {shouldRenderSlide(5) ? renderEmbeddedSharePage() : null}
        </div>

        <div className={getSlideClass(6)}>
          {shouldRenderSlide(6) && isOwnerDashboard ? renderEmbeddedAnalyticsPage() : null}
        </div>

        <div className={getSlideClass(7)}>
          {shouldRenderSlide(7) ? renderEmbeddedSettingsPage() : null}
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

      {!shouldShowBibleBuddy3ModeGate && !deepStudyFocusActive ? (
      <nav data-bb-dashboard-tour="bottom-menu" className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom,0px)+10px)] z-[90] mx-auto max-w-xl lg:sticky lg:bottom-2 lg:z-40">
        {dashboardMenuOpen ? (
          <div className="mb-2 rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]/95 p-2.5 shadow-[0_18px_46px_rgba(15,35,60,0.22)] backdrop-blur">
            <div className="mb-2 flex justify-center">
              <button
                type="button"
                data-dashboard-nav-key="bible-year"
                onClick={openPreferredHomeDashboard}
                className={`flex min-h-[82px] w-full max-w-[220px] flex-col items-center justify-center gap-1 rounded-[20px] px-4 py-3 text-center text-xs font-black transition ${
                  bibleYearDashboardActive
                    ? "bg-[var(--bb-accent-soft,rgba(47,127,232,0.12))] text-[var(--bb-text-primary,#111827)] ring-1 ring-[var(--bb-card-border,#dbe7f4)]"
                    : "text-[var(--bb-text-secondary,#4b5563)] hover:bg-[var(--bb-surface-soft,#f4f8ff)] hover:text-[var(--bb-text-primary,#111827)]"
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-xl ${
                    bibleYearDashboardActive ? "bg-[var(--bb-accent,#2f7fe8)] text-white shadow-sm" : "bg-[var(--bb-surface-soft,#f4f8ff)]"
                  }`}
                  aria-hidden="true"
                >
                  <BibleBookIcon />
                </span>
                <span className="leading-tight">Home</span>
              </button>
              <button
                type="button"
                data-dashboard-nav-key="bible-year-series"
                onClick={openBibleYearSeriesDashboard}
                className={`hidden min-h-[76px] flex-col items-center justify-center gap-1 rounded-[18px] px-2 py-2 text-center text-[10px] font-black transition ${
                  bibleYearSeriesActive
                    ? "bg-[var(--bb-accent-soft,rgba(47,127,232,0.12))] text-[var(--bb-text-primary,#111827)] ring-1 ring-[var(--bb-card-border,#dbe7f4)]"
                    : "text-[var(--bb-text-secondary,#4b5563)] hover:bg-[var(--bb-surface-soft,#f4f8ff)] hover:text-[var(--bb-text-primary,#111827)]"
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-xl ${
                    bibleYearSeriesActive ? "bg-[var(--bb-accent,#2f7fe8)] text-white shadow-sm" : "bg-[var(--bb-surface-soft,#f4f8ff)]"
                  }`}
                  aria-hidden="true"
                >
                  <BibleBookIcon />
                </span>
                <span className="leading-tight">Journey Map</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {dashboardNavItems.filter((item) => item.key !== "home" && item.key !== "share").map((item, index) => {
                const itemPageIndex = dashboardPageKeys.indexOf(item.key);
                const isActive = !bibleYearDashboardActive && !bibleYearSeriesActive && itemPageIndex === safeActivePage;
                return (
                  <Fragment key={item.key}>
                    <Link
                      data-dashboard-nav-key={item.key}
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        setDashboardMenuOpen(false);
                        handleDashboardNavClick(itemPageIndex);
                      }}
                      className={`flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-[18px] px-1.5 py-2 text-center text-[10px] font-black transition ${
                        isActive
                          ? "bg-[var(--bb-accent-soft,rgba(47,127,232,0.12))] text-[var(--bb-text-primary,#111827)] ring-1 ring-[var(--bb-card-border,#dbe7f4)]"
                          : "text-[var(--bb-text-secondary,#4b5563)] hover:bg-[var(--bb-surface-soft,#f4f8ff)] hover:text-[var(--bb-text-primary,#111827)]"
                      }`}
                    >
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full text-xl ${
                          isActive && item.key !== "buddy" ? "bg-[var(--bb-accent,#2f7fe8)] text-white shadow-sm" : "bg-[var(--bb-surface-soft,#f4f8ff)]"
                        }`}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className="leading-tight">{item.label}</span>
                    </Link>
                  </Fragment>
                );
              })}
              <button
                type="button"
                onClick={() => setDashboardMenuOpen(false)}
                className="hidden min-h-[72px] flex-col items-center justify-center gap-1 rounded-[18px] px-1.5 py-2 text-center text-[10px] font-black text-[var(--bb-text-secondary,#4b5563)] transition hover:bg-[var(--bb-surface-soft,#f4f8ff)] hover:text-[var(--bb-text-primary,#111827)]"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-full bg-[var(--bb-surface-soft,#f4f8ff)] text-xl"
                  aria-hidden="true"
                >
                  ðŸ’Ž
                </span>
                <span className="leading-tight">Store</span>
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5 border-t border-[var(--bb-card-border,#dbe7f4)] pt-2">
              {dashboardSecondaryNavItems.map((item) => {
                const itemPageIndex = dashboardPageKeys.indexOf(item.key);
                const isActive = !bibleYearDashboardActive && !bibleYearSeriesActive && itemPageIndex === safeActivePage;
                return (
                  <Link
                    key={item.key}
                    data-dashboard-nav-key={item.key}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      setDashboardMenuOpen(false);
                      handleDashboardNavClick(itemPageIndex);
                    }}
                    className={`flex min-h-[58px] items-center justify-center gap-2 rounded-[16px] px-2 py-2 text-center text-[10px] font-black transition ${
                      isActive
                        ? "bg-[var(--bb-accent-soft,rgba(47,127,232,0.12))] text-[var(--bb-text-primary,#111827)] ring-1 ring-[var(--bb-card-border,#dbe7f4)]"
                        : "text-[var(--bb-text-secondary,#4b5563)] hover:bg-[var(--bb-surface-soft,#f4f8ff)] hover:text-[var(--bb-text-primary,#111827)]"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg ${
                        isActive && item.key !== "buddy" ? "bg-[var(--bb-accent,#2f7fe8)] text-white shadow-sm" : "bg-[var(--bb-surface-soft,#f4f8ff)]"
                      }`}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <span className="min-w-0 truncate leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]/95 px-2 py-2 shadow-[0_12px_28px_rgba(38,63,99,0.16)] backdrop-blur">
          <div className="grid grid-cols-5 items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setDashboardMenuOpen(false);
                setShowBibleProgressDetails(true);
              }}
              className="flex h-14 flex-col items-center justify-center rounded-[18px] bg-[var(--bb-surface-soft,#f4f8ff)] text-[10px] font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-accent-soft,rgba(47,127,232,0.12))]"
              aria-label="Open Bible progress"
              data-dashboard-nav-key="progress-tab"
            >
              <span className="grid h-7 w-7 place-items-center" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19V5" />
                  <path d="M4 19h16" />
                  <path d="M8 16v-5" />
                  <path d="M12 16V8" />
                  <path d="M16 16v-3" />
                </svg>
              </span>
              <span>Progress</span>
            </button>

            <button
              type="button"
              onClick={openBibleReaderPage}
              className={`flex h-14 flex-col items-center justify-center rounded-[18px] text-[10px] font-black transition ${
                bibleTabActive
                  ? "bg-[var(--bb-accent-soft,rgba(47,127,232,0.14))] text-[var(--bb-accent,#2f7fe8)] ring-1 ring-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,transparent)]"
                  : "bg-[var(--bb-surface-soft,#f4f8ff)] text-[var(--bb-text-primary,#111827)] hover:bg-[var(--bb-accent-soft,rgba(47,127,232,0.12))]"
              }`}
              aria-label="Open Bible"
              data-dashboard-nav-key="bible-tab"
            >
              <span className={`grid h-7 w-7 place-items-center rounded-full ${bibleTabActive ? "bg-[var(--bb-accent,#2f7fe8)] text-white" : ""}`} aria-hidden="true">
                <BibleBookIcon />
              </span>
              <span>Bible</span>
            </button>

            <button
              type="button"
              onClick={openPreferredHomeDashboard}
              className={`flex h-14 flex-col items-center justify-center rounded-[18px] text-[10px] font-black transition ${
                homeTabActive
                  ? "bg-[var(--bb-accent-soft,rgba(47,127,232,0.14))] text-[var(--bb-accent,#2f7fe8)] ring-1 ring-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,transparent)]"
                  : "bg-[var(--bb-surface-soft,#f4f8ff)] text-[var(--bb-text-primary,#111827)] hover:bg-[var(--bb-accent-soft,rgba(47,127,232,0.12))]"
              }`}
              aria-label="Open Home"
              data-dashboard-nav-key="home-tab"
            >
              <span className={`grid h-7 w-7 place-items-center rounded-full text-lg ${homeTabActive ? "bg-[var(--bb-accent,#2f7fe8)] text-white" : ""}`} aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10.5 12 3l9 7.5" />
                  <path d="M5 10v10h14V10" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </span>
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={openBuddyChatPage}
              className={`flex h-14 flex-col items-center justify-center rounded-[18px] text-[10px] font-black transition ${
                chatTabActive
                  ? "bg-[var(--bb-accent-soft,rgba(47,127,232,0.14))] text-[var(--bb-accent,#2f7fe8)] ring-1 ring-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,transparent)]"
                  : "bg-[var(--bb-surface-soft,#f4f8ff)] text-[var(--bb-text-primary,#111827)] hover:bg-[var(--bb-accent-soft,rgba(47,127,232,0.12))]"
              }`}
              aria-label="Open BB Chat"
              data-dashboard-nav-key="bb-chat-tab"
            >
              <span className={`grid h-7 w-7 place-items-center rounded-full ${chatTabActive ? "bg-[var(--bb-accent,#2f7fe8)] text-white" : ""}`} aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M5 6.8A4.8 4.8 0 0 1 9.8 2h4.4A4.8 4.8 0 0 1 19 6.8v4.4a4.8 4.8 0 0 1-4.8 4.8h-3.1L6.8 20v-4.3A4.8 4.8 0 0 1 5 12V6.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M9 8h6M9 11h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span>BB Chat</span>
            </button>

            <button
              type="button"
              onClick={openInvitePage}
              className="flex h-14 flex-col items-center justify-center rounded-[18px] bg-[var(--bb-surface-soft,#f4f8ff)] text-[10px] font-black text-[var(--bb-text-primary,#111827)] shadow-[0_0_18px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_16%,transparent)] transition hover:bg-[var(--bb-accent-soft,rgba(47,127,232,0.12))] hover:shadow-[0_0_24px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_26%,transparent)]"
              aria-label="Invite friends to Bible Buddy"
            >
              <span className="grid h-7 w-7 place-items-center" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                  <path d="M21 3 10.6 13.4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m21 3-6.7 18-3.7-7.6L3 9.7 21 3Z" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>Invite</span>
            </button>
          </div>
        </div>
      </nav>
      ) : null}

      <nav className="hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 items-end gap-1 text-center">
          {[
            { label: "Home", href: "/dashboard", icon: "âŒ‚", active: true },
            { label: "Bible", href: "/reading", icon: "ðŸ“–" },
            { label: "Community", href: "/dashboard", icon: "ðŸ‘¥" },
            { label: "TV", href: "/biblebuddy-tv", icon: "â–¶" },
            { label: "Games", href: "/bible-study-games", icon: "ðŸŽ®" },
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

      <ModalShell
        isOpen={protectJourneyPromptOpen}
        onClose={dismissProtectJourneyPrompt}
        backdropColor="bg-slate-950/55"
        zIndex="z-[140]"
      >
        <div className="mx-4 w-full max-w-md rounded-[30px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-6 text-center shadow-[0_28px_80px_rgba(15,23,42,0.34)]">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[var(--bb-accent-soft,#eaf5ff)] text-[var(--bb-accent,#2f7fe8)] shadow-sm">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-5" />
            </svg>
          </div>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Free account</p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Protect your Bible journey.</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            You&apos;ve already started building a rhythm in God&apos;s Word. Create a free account to save your streak, sync progress across devices, and keep your journey backed up.
          </p>
          <div className="mt-5 grid gap-2 text-left">
            {["Save your streak", "Use Bible Buddy on phone and desktop", "Post reflections and keep notes permanently"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 rounded-2xl bg-[var(--bb-surface-soft,#f4f8ff)] px-4 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--bb-accent,#2f7fe8)] text-white" aria-hidden="true">âœ“</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() => {
                setProtectJourneyPromptOpen(false);
                setGuestAccountFormOpen(true);
              }}
              className="rounded-2xl bg-[var(--bb-accent,#2f7fe8)] px-5 py-4 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-[0_14px_30px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,transparent)]"
            >
              Create Free Account
            </button>
            <button
              type="button"
              onClick={dismissProtectJourneyPrompt}
              className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-4 text-sm font-black text-[var(--bb-text-secondary,#4b5563)]"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={guestInfoModalOpen}
        onClose={() => setGuestInfoModalOpen(false)}
        backdropColor="bg-slate-950/55"
        zIndex="z-[140]"
      >
        <div className="mx-4 w-full max-w-md rounded-[30px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-6 text-left shadow-[0_28px_80px_rgba(15,23,42,0.34)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Guest journey</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">You are using Bible Buddy as a guest.</h2>
            </div>
            <button type="button" onClick={() => setGuestInfoModalOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-[var(--bb-surface-soft,#f4f8ff)] text-lg font-black text-[var(--bb-text-secondary,#4b5563)]" aria-label="Close guest info">
              x
            </button>
          </div>
          <p className="mt-4 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            Your progress is saved on this device right now. Create a free account to become a Bible Buddy and keep your journey safe.
          </p>
          <div className="mt-4 grid gap-2 rounded-2xl bg-[var(--bb-surface-soft,#f4f8ff)] p-4 text-sm font-bold text-[var(--bb-text-primary,#111827)]">
            <p>Save progress across different devices.</p>
            <p>Comment on reflections and join discussions.</p>
            <p>Add your name and profile picture so other Buddies can recognize you.</p>
            <p>Recover your journey if you log out or switch browsers.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setGuestInfoModalOpen(false);
              setGuestAccountFormOpen(true);
            }}
            className="mt-5 w-full rounded-2xl bg-[var(--bb-accent,#2f7fe8)] px-5 py-4 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-[0_14px_30px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,transparent)]"
          >
            Create Account
          </button>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={guestAccountFormOpen}
        onClose={() => setGuestAccountFormOpen(false)}
        backdropColor="bg-slate-950/55"
        zIndex="z-[145]"
      >
        <form onSubmit={createAccountFromGuest} className="mx-4 w-full max-w-md rounded-[30px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-6 text-left shadow-[0_28px_80px_rgba(15,23,42,0.34)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Protect progress</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Create your free account.</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                Your guest progress stays attached to this journey.
              </p>
            </div>
            <button type="button" onClick={() => setGuestAccountFormOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-[var(--bb-surface-soft,#f4f8ff)] text-lg font-black text-[var(--bb-text-secondary,#4b5563)]" aria-label="Close account form">
              x
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f4f8ff)] px-4 py-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-[var(--bb-card,#ffffff)] text-xs font-black text-[var(--bb-text-muted,#6b7280)]">
                {guestAccountProfileImagePreview ? (
                  <img src={guestAccountProfileImagePreview} alt="" className="h-full w-full object-cover" />
                ) : (
                  "Photo"
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">Add profile picture</span>
                <span className="mt-0.5 block text-xs font-semibold text-[var(--bb-text-secondary,#4b5563)]">Required for comments and community features.</span>
              </span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setGuestAccountProfileImageFile(file);
                  setGuestAccountProfileImagePreview(file ? URL.createObjectURL(file) : null);
                }}
              />
            </label>
            <input
              value={guestAccountName}
              onChange={(event) => setGuestAccountName(event.target.value)}
              placeholder="Full name"
              className="w-full rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm font-bold text-[var(--bb-text-primary,#111827)] outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
              required
            />
            <input
              value={guestAccountEmail}
              onChange={(event) => setGuestAccountEmail(event.target.value)}
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm font-bold text-[var(--bb-text-primary,#111827)] outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
              required
            />
            <input
              value={guestAccountPassword}
              onChange={(event) => setGuestAccountPassword(event.target.value)}
              type="password"
              minLength={6}
              placeholder="Create password"
              className="w-full rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm font-bold text-[var(--bb-text-primary,#111827)] outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
              required
            />
            {guestAccountMessage ? (
              <p className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f4f8ff)] px-4 py-3 text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">
                {guestAccountMessage}
              </p>
            ) : null}
            <button type="submit" disabled={guestAccountLoading} className="rounded-2xl bg-[var(--bb-accent,#2f7fe8)] px-5 py-4 text-sm font-black text-[var(--bb-button-text,#ffffff)] disabled:opacity-60">
              {guestAccountLoading ? "Protecting..." : "Create Free Account"}
            </button>
          </div>
        </form>
      </ModalShell>

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

      {renderBibleProgressDetailsModal()}
      {renderBibleYearDayThreeProUpgradePrompt()}

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
                <LouisAvatar mood="wave" size={72} />
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
                          <img src={cover} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-lg">ðŸ“–</div>
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
        isOpen={studyDashboardHandoffModal !== null}
        onClose={() => setStudyDashboardHandoffModal(null)}
        backdropColor="bg-black/45"
        scrollable={false}
        zIndex="z-[95]"
      >
        <div className="mx-4 w-full max-w-md rounded-[30px] border border-[var(--bb-card-border,#cfe4f3)] bg-[var(--bb-card,#ffffff)] p-5 text-center shadow-2xl">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[var(--bb-surface-soft,#e8f4ff)] p-2 shadow-sm">
            <LouisAvatar mood="stareyes" size={108} />
          </div>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">
            Study Dashboard
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
            {studyDashboardHandoffModal?.chapterLabel || "This chapter"} has been set on your study dashboard.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#5f6368)]">
            You have {studyDashboardHandoffModal?.remainingTasks ?? 0} Bible study{" "}
            {(studyDashboardHandoffModal?.remainingTasks ?? 0) === 1 ? "task" : "tasks"} to complete.
          </p>
          <button
            type="button"
            onClick={() => {
              setStudyDashboardHandoffModal(null);
              snapToPage(0);
            }}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--bb-button,#2f7fe8)] px-5 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
          >
            Let&apos;s start
          </button>
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
              <LouisAvatar mood="wave" size={74} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f7fe8]">Free Bible Buddy</p>
              <h2 className="mt-1 text-xl font-black leading-tight text-gray-950">
                {freePlanGate?.kind === "study"
                  ? "One Bible study at a time"
                  : freePlanGate?.kind === "bible-year-future"
                    ? "Upgrade to see every day"
                    : "Your next chapter opens soon"}
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
          ) : freePlanGate?.kind === "bible-year-future" ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-semibold leading-6 text-gray-700">
                You can review days you already finished and continue your current Bible in One Year day for free.
              </p>
              <div className="rounded-2xl bg-[#f6f9ff] p-4 text-center">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5b6f92]">
                  {freePlanGate?.chapterLabel || "This future day"}
                </p>
                <p className="mt-1 text-2xl font-black text-[#17213d]">Locked</p>
              </div>
              <p className="text-sm font-semibold leading-6 text-gray-700">
                Upgrade to Pro to see and start all Bible in One Year studies ahead of schedule.
              </p>
            </div>
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
              {freePlanGate?.kind === "bible-year-future" ? "Stay on current day" : "Keep waiting"}
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={Boolean(referralRewardModal)}
        onClose={() => {
          rememberReferralRewardSeen(referralRewardModal);
          setReferralRewardModal(null);
        }}
        backdropColor="bg-black/55"
        zIndex="z-[80]"
      >
        {referralRewardModal ? (
          <div className="w-full max-w-sm overflow-hidden rounded-[28px] border border-[rgba(103,204,255,0.38)] bg-[rgba(5,18,34,0.94)] text-center text-[#f5fbff] shadow-[0_24px_70px_rgba(0,0,0,0.56),0_0_46px_rgba(93,214,255,0.18)] backdrop-blur-xl">
            <div className="relative overflow-hidden px-6 pb-6 pt-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(93,214,255,0.28),transparent_42%),linear-gradient(135deg,rgba(8,42,76,0.94),rgba(3,15,30,0.96)_56%,rgba(5,32,57,0.94))]" />
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(125,221,255,0.9),transparent)]" />
              <div className="relative mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border-4 border-[rgba(199,232,255,0.78)] bg-[rgba(31,84,132,0.38)] shadow-[0_0_34px_rgba(93,214,255,0.28)]">
                {referralRewardModal.profile_image_url ? (
                  <img
                    src={referralRewardModal.profile_image_url}
                    alt={getReferralDisplayName(referralRewardModal)}
                    className="h-full w-full object-cover"
                  />
                ) : selectedBuddy ? (
                  <LouisAvatar buddyId={selectedBuddy.id} mood="wave" size={96} />
                ) : (
                  <span className="block h-24 w-24" aria-hidden="true" />
                )}
              </div>
              <p className="relative mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#5dd6ff]">Buddy Rewards</p>
              <h2 className="relative mt-1 text-2xl font-black leading-tight text-white">
                {getReferralDisplayName(referralRewardModal)} signed up!
              </h2>
              <p className="relative mt-3 text-sm font-bold leading-6 text-[#c7e8ff]">
                You were credited 250 XP points for sharing Bible Buddy.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-[rgba(2,10,22,0.44)] px-6 py-5">
              <div className="rounded-2xl border border-[rgba(103,204,255,0.22)] bg-[rgba(199,232,255,0.09)] px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <p className="text-2xl font-black text-[#5dd6ff]">+250</p>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#91b9d4]">XP points</p>
              </div>
              <div className="rounded-2xl border border-[rgba(93,214,255,0.2)] bg-[rgba(47,154,255,0.12)] px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <p className="text-2xl font-black text-[#9ee7ff]">+250</p>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#91b9d4]">friends helped</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  rememberReferralRewardSeen(referralRewardModal);
                  setReferralRewardModal(null);
                }}
                className="col-span-2 mt-2 rounded-full bg-[#075aa8] px-4 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(7,90,168,0.36)] transition hover:bg-[#0b6fc8]"
              >
                Awesome
              </button>
            </div>
          </div>
        ) : null}
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
                Ã—
              </button>
            </div>

            <div className="space-y-6 text-gray-800">
              <div className="rounded-2xl border border-[#b8d9ef] bg-gradient-to-br from-[#f6fbff] via-white to-[#edf7ff] p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-full border border-white bg-white p-1 shadow-sm">
                    <LouisAvatar mood="wave" size={70} />
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
                <h3 className="text-lg font-bold text-gray-950">ðŸ”¥ Your Daily Streak</h3>
                <p className="mt-2 leading-7">
                  To keep your streak going, log in to Bible Buddy each day. The streak is about showing up consistently.
                </p>
                <p className="mt-2 leading-7">
                  You do not have to finish every chapter task in one day. The chapter study is where your Bible actions, task progress, points, and level growth happen.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-950">ðŸ“– Your Chapter Study</h3>
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
                    <p className="font-bold text-gray-950">1. ðŸ“• Bible Study Intro</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      This sets the scene for the chapter so you understand what you are about to read.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">2. âœï¸ Read The Chapter</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      This is the Scripture itself. Read slowly and let the chapter be the center of the study.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">3. ðŸ“ Chapter Notes</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Notes help you understand the chapter more deeply, verse by verse and section by section.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">4. ðŸ§  Trivia</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Trivia checks what is sticking from the chapter and helps you remember the story and details.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">5. Reflection</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Reflection gives you a place to answer the question and share what the chapter is doing in you.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">Bonus Reflection</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Reflection gives you a place to answer the question and share what the chapter is doing in you.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[#b9dcf4] bg-[#eaf5ff] p-4">
                <h3 className="text-lg font-bold text-gray-950">âœ… When A Chapter Is Complete</h3>
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
