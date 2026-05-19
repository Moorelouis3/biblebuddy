"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { LouisAvatar } from "./LouisAvatar";
import { ModalShell } from "./ModalShell";
import BibleReadingModal from "./BibleReadingModal";
import DashboardDailyTaskCallout from "./DashboardDailyTaskCallout";
import BibleStudiesLibraryPage from "../app/devotionals/page";
import BibleStudyDetailPage from "../app/devotionals/[id]/page";
import type { ChecklistData, TaskState } from "./LouisDailyTasksModal";
import type { DailyRecommendation } from "../lib/dailyRecommendation";
import { supabase } from "../lib/supabaseClient";
import { rememberLouisDailyTaskTarget } from "../lib/louisDailyFlow";
import { getBookTotalChapters, getCompletedChapters } from "../lib/readingProgress";
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

const BIBLE_BUDDY_3_MODE_GATE_STORAGE_KEY = "bb:3-study-mode-selected";
const BIBLE_BUDDY_3_EXISTING_USER_CUTOFF_MS = Date.parse("2026-05-17T00:00:00.000Z");
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
  profile_image_url?: string | null;
  display_name?: string | null;
  username?: string | null;
  created_at?: string | null;
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
  suppressCompletedTasksPanel?: boolean;
  onHomeReset?: () => void;
  onDevotionalChanged: () => void;
  isOwnerDashboard?: boolean;
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
      emoji: "📕",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "reading") {
    return {
      title: task.title,
      subtitle: "Read today's Bible chapter and reflect on it.",
      emoji: "✝️",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "notes") {
    return {
      title: task.title,
      subtitle: "Read and study the notes to understand more deeply.",
      emoji: "📝",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "trivia") {
    return {
      title: task.title,
      subtitle: "Test your understanding with 5 quick questions.",
      emoji: "🧠",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "reflection") {
    const chapterLabel = task.chapterLabel || (task.book && task.chapter ? `${task.book} ${task.chapter}` : "this chapter");
    return {
      title: "Answer The Reflection Question",
      subtitle: `Share what ${chapterLabel} is stirring in you.`,
      emoji: "âœï¸",
      doneAccent: "from-[#b9dcf4] to-[#7BAFD4]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  return {
    title: task.title,
    subtitle: "Unscramble words from today's chapter.",
    emoji: "🔤",
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
  if (task.kind === "reading") return "\u271D\uFE0F";
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
  homePanelOverride,
  deepStudyNode,
  suppressCompletedTasksPanel = false,
  onHomeReset,
  onDevotionalChanged,
  isOwnerDashboard = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousDoneByKindRef = useRef<Record<string, boolean> | null>(null);
  const previousCompletedCountRef = useRef<number | null>(null);
  const previousJourneyKeyRef = useRef<string | null>(null);
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
  const [freePlanGate, setFreePlanGate] = useState<{ kind: "chapter" | "study"; chapterLabel?: string | null } | null>(null);
  const [freePlanCountdown, setFreePlanCountdown] = useState(() => formatFreePlanCountdown(getNextLocalDayStartMs() - Date.now()));
  const [embeddedBibleSelectedBook, setEmbeddedBibleSelectedBook] = useState<string | null>(null);
  const [embeddedBibleAlphabetical, setEmbeddedBibleAlphabetical] = useState(false);
  const [embeddedBibleCompletedChapters, setEmbeddedBibleCompletedChapters] = useState<number[]>([]);
  const [embeddedBibleReading, setEmbeddedBibleReading] = useState<{ book: string; chapter: number } | null>(null);
  const [embeddedBibleBookSearchOpen, setEmbeddedBibleBookSearchOpen] = useState(false);
  const [embeddedBibleChapterLoading, setEmbeddedBibleChapterLoading] = useState<string | null>(null);
  const [embeddedBibleSearchMessage, setEmbeddedBibleSearchMessage] = useState<string | null>(null);
  const [embeddedBibleStudyId, setEmbeddedBibleStudyId] = useState<string | null>(null);
  const [embeddedCommunityGroupId, setEmbeddedCommunityGroupId] = useState<string | null>(null);
  const [embeddedCommunityLoading, setEmbeddedCommunityLoading] = useState(false);
  const [embeddedCommunityError, setEmbeddedCommunityError] = useState<string | null>(null);
  const [embeddedCommunityHeight, setEmbeddedCommunityHeight] = useState(620);
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

  const dashboardPageKeys = ["home", "buddy", "bible_studies", "group", "buddies", "tv", "games", "share"] as const;
  type DashboardPageKey = (typeof dashboardPageKeys)[number];
  const safeActivePage = Math.max(0, Math.min(activePage, dashboardPageKeys.length - 1));
  const exploreLinkByKey = (key: string) => exploreLinks.find((link) => link.key === key) ?? null;
  const dashboardPageLinks = {
    bible_studies: exploreLinkByKey("bible_studies"),
    group: exploreLinkByKey("group"),
    tv: exploreLinkByKey("tv"),
    games: exploreLinkByKey("games"),
    share: exploreLinkByKey("share"),
  };
  const [liveSelectedBuddyId, setLiveSelectedBuddyId] = useState<BuddyAvatarId | null>(null);

  useEffect(() => {
    if (profile?.selected_buddy_avatar) {
      setLiveSelectedBuddyId(normalizeBuddyAvatarId(profile.selected_buddy_avatar));
    }
  }, [profile?.selected_buddy_avatar]);

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
    !homePanelOverride;
  const dashboardNavItems: Array<{
    key: DashboardPageKey;
    label: string;
    icon: ReactNode;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }> = [
    { key: "home", label: "Home", icon: "\u2302", href: "/dashboard" },
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
    { key: "bible_studies", label: "Bible Studies", icon: "\uD83C\uDF05", href: dashboardPageLinks.bible_studies?.href || "/bible-studies", onClick: dashboardPageLinks.bible_studies?.onClick },
    { key: "group", label: "Community", icon: "\uD83D\uDC65", href: dashboardPageLinks.group?.href || "/study-groups", onClick: dashboardPageLinks.group?.onClick },
    { key: "buddies", label: "Buddies", icon: "\uD83E\uDD1D", href: "#buddies" },
    { key: "tv", label: "TV", icon: "\u25B6", href: dashboardPageLinks.tv?.href || "/biblebuddy-tv", onClick: dashboardPageLinks.tv?.onClick },
    { key: "games", label: "Games", icon: "\uD83C\uDFAE", href: dashboardPageLinks.games?.href || "/bible-study-games", onClick: dashboardPageLinks.games?.onClick },
    { key: "share", label: "Share", icon: "\u2197", href: dashboardPageLinks.share?.href || "#share-bible-buddy", onClick: dashboardPageLinks.share?.onClick },
  ];
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
    let cancelled = false;

    async function loadCommunityGroup() {
      if (embeddedCommunityGroupId) return;
      setEmbeddedCommunityLoading(true);
      setEmbeddedCommunityError(null);

      try {
        const { data, error } = await supabase
          .from("study_groups")
          .select("id")
          .in("name", ["Bible Buddy Study Group", "Hope Nation"])
          .limit(1)
          .maybeSingle();

        if (cancelled) return;
        if (error || !data?.id) {
          setEmbeddedCommunityError("Community could not be loaded right now.");
          return;
        }

        setEmbeddedCommunityGroupId(data.id);
      } catch {
        if (!cancelled) setEmbeddedCommunityError("Community could not be loaded right now.");
      } finally {
        if (!cancelled) setEmbeddedCommunityLoading(false);
      }
    }

    if (dashboardPageKeys[safeActivePage] === "group") {
      void loadCommunityGroup();
    }

    return () => {
      cancelled = true;
    };
  }, [embeddedCommunityGroupId, safeActivePage]);

  useEffect(() => {
    let cancelled = false;

    async function loadBuddiesDashboard() {
      if (buddiesDashboard || buddiesDashboardLoading) return;
      setBuddiesDashboardLoading(true);
      setBuddiesDashboardError(null);

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("Sign in again to load Buddies.");

        const response = await fetch("/api/buddies/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload?.error || "Could not load Buddies.");
        if (!cancelled) setBuddiesDashboard(payload as BuddiesDashboardPayload);
      } catch (error: any) {
        if (!cancelled) setBuddiesDashboardError(error?.message || "Could not load Buddies.");
      } finally {
        if (!cancelled) setBuddiesDashboardLoading(false);
      }
    }

    if (dashboardPageKeys[safeActivePage] === "buddies") {
      void loadBuddiesDashboard();
    }

    return () => {
      cancelled = true;
    };
  }, [buddiesDashboard, buddiesDashboardLoading, safeActivePage]);

  useEffect(() => {
    if (dashboardPageKeys[safeActivePage] === "share" && userId) {
      void fetchShareRewards({ showLoading: true });
    }
  }, [fetchShareRewards, safeActivePage, userId]);

  useEffect(() => {
    if (!userId) return;
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
  }, [fetchShareRewards, userId]);

  useEffect(() => {
    function handleEmbeddedCommunityHeight(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; height?: number } | null;
      if (!data || data.type !== "bb-community-height") return;

      const nextHeight = Number(data.height);
      if (!Number.isFinite(nextHeight)) return;
      setEmbeddedCommunityHeight(Math.max(620, Math.ceil(nextHeight)));
    }

    window.addEventListener("message", handleEmbeddedCommunityHeight);
    return () => window.removeEventListener("message", handleEmbeddedCommunityHeight);
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
  const activeCompletedTrackerTask = activeTask
    ? completedTrackerTasks.find(
        (task) =>
          task.kind === activeTask.kind &&
          (task.href || "") === (activeTask.href || "") &&
          (task.chapterLabel || "") === (activeTask.chapterLabel || ""),
      ) ?? null
    : null;
  const baseDisplayTasks = isLoadingNextChapter && (preloadedNextChapter?.tasks.length || preloadedNextStudy?.tasks.length)
    ? preloadedNextChapter?.tasks.length
      ? preloadedNextChapter.tasks
      : preloadedNextStudy?.tasks || visibleTasks
    : visibleTasks;
  const displayTasks = baseDisplayTasks.filter(
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
  const studyProgressTotal = Math.max(5, visibleTasks.length || displayTasks.length || 0);
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
  const louisStudyContext = {
    studyTitle: currentDevotionalTitle,
    studySummary: currentStudySummary,
    chapterLabel: activeChapterLabel,
    chapterTitle: chapterTask?.chapterTitle || null,
    chapterTheme: chapterTask?.introSummary || devotionalTask?.introSummary || currentStudySummary || null,
    completedTasks: studyProgressCompleted,
    totalTasks: studyProgressTotal,
    allDone,
    nextTaskTitle: allDone ? null : nextTaskTitle,
    nextTaskKind: nextTask?.kind || null,
    unfinishedTasks: visibleTasks
      .filter((task) => !task.done)
      .map((task, index) => getTaskCardCopy(task, index).title),
    finishedTasks: visibleTasks
      .filter((task) => task.done)
      .map((task, index) => getTaskCardCopy(task, index).title),
  };
  const shouldShowCompletionPanel =
    !isChecklistSyncing &&
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
    if (!showDevotionalSettings && !embeddedBibleBookSearchOpen) return;

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
  }, [showDevotionalSettings, embeddedBibleBookSearchOpen, currentDevotionalId]);

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

  function snapToPage(index: number) {
    const nextIndex = Math.max(0, Math.min(index, dashboardPageKeys.length - 1));
    setActivePage(nextIndex);
    window.setTimeout(() => {
      document
        .querySelector(`[data-dashboard-nav-key="${dashboardPageKeys[nextIndex]}"]`)
        ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, 0);
  }

  function handleDashboardNavClick(index: number) {
    if (index === 0) {
      setFreeStudyModeActive(false);
      setEmbeddedBibleBookSearchOpen(false);
      setEmbeddedBibleSelectedBook(null);
      setEmbeddedBibleStudyId(null);
      onHomeReset?.();
    }
    snapToPage(index);
  }

  useEffect(() => {
    function handleShowShareTab() {
      const shareIndex = dashboardPageKeys.indexOf("share");
      if (shareIndex < 0) return;
      snapToPage(shareIndex);
      window.setTimeout(() => {
        document
          .querySelector('[data-dashboard-nav-key="share"]')
          ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }, 80);
    }

    window.addEventListener("bb:dashboard-show-share-tab", handleShowShareTab);
    return () => window.removeEventListener("bb:dashboard-show-share-tab", handleShowShareTab);
  }, []);

  async function switchCurrentStudyChapter(dayNumber: number) {
    if (!userId || !currentDevotionalId || switchingStudyChapter) return;
    const currentDayNumber = currentDevotionalTask?.devotionalDayNumber ?? 1;
    if (!isPaidUser && dayNumber > currentDayNumber) return;
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

  const studyProgressPercent = Math.round((studyProgressCompleted / Math.max(studyProgressTotal, 1)) * 100);
  const getFeaturePageBullets = (key: DashboardPageKey) => {
    switch (key) {
      case "bible_studies":
        return ["Follow guided chapter studies", "Keep moving through your Bible Study Journey", "Intro, reading, notes, trivia, and reflection"];
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
                ×
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
              <span className="ml-2" aria-hidden="true">›</span>
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
          <>
            <div className="mb-3 rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Bible Studies</p>
                  <h2 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#111827)]">Find a chapter by book</h2>
                  <p className="mt-1 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                    Search the Bible, pick a chapter, and load it into your study dashboard.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmbeddedBibleBookSearchOpen(true);
                    setEmbeddedBibleSearchMessage(null);
                  }}
                  className="shrink-0 rounded-full bg-[var(--bb-button,#2f7fe8)] px-4 py-3 text-xs font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
                >
                  Search by Bible book
                </button>
              </div>
            </div>
            <BibleStudiesLibraryPage embedded onStudySelect={setEmbeddedBibleStudyId} />
          </>
        )}
      </div>
    </section>
  );

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

  const renderCommunityLoadingSkeleton = () => (
    <div className="bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-5">
      <div className="rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <LouisAvatar mood="wave" size={44} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">Share something with the group</p>
            <p className="mt-1 h-3 w-4/5 rounded-full bg-[var(--bb-surface-soft,#f3f4f6)]" />
          </div>
          <span className="h-3 w-3 rounded-full bg-[var(--bb-accent,#2f7fe8)]" />
        </div>
      </div>

      <div className="mt-4 rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">
          <span>📌</span>
          <span>Pinned</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[var(--bb-accent-soft,#eaf5ff)]" />
          <div className="min-w-0 flex-1">
            <div className="h-3.5 w-40 rounded-full bg-[var(--bb-surface-soft,#f3f4f6)]" />
            <div className="mt-2 h-3 w-24 rounded-full bg-[var(--bb-surface-soft,#f3f4f6)]" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 w-11/12 rounded-full bg-[var(--bb-surface-soft,#f3f4f6)]" />
          <div className="h-4 w-4/5 rounded-full bg-[var(--bb-surface-soft,#f3f4f6)]" />
          <div className="h-4 w-2/3 rounded-full bg-[var(--bb-surface-soft,#f3f4f6)]" />
        </div>
      </div>

      <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#6b7280)]">
        Loading the latest posts...
      </p>
    </div>
  );

  const renderEmbeddedCommunityPage = () => (
    <section className="-mx-4 w-[calc(100%+2rem)] sm:-mx-5 sm:w-[calc(100%+2.5rem)]">
      <div className="bg-[var(--bb-background,#f8fbff)] pb-3">
        <div className="border-b border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 sm:px-5">
          <h2 className="text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Bible Buddy Community</h2>
          <p className="mt-1 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#5f6368)]">
            Connect with Bible Buddies across the world.
          </p>
        </div>

        {embeddedCommunityLoading ? (
          renderCommunityLoadingSkeleton()
        ) : embeddedCommunityError ? (
          <div className="grid min-h-[420px] place-items-center bg-[var(--bb-surface-soft,#f8fbff)] px-6 text-center">
            <div>
              <p className="text-lg font-black text-[var(--bb-text-primary,#111827)]">Community needs a refresh.</p>
              <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">{embeddedCommunityError}</p>
              <Link
                href="/study-groups"
                className="mt-5 inline-flex rounded-full bg-[var(--bb-button,#2f7fe8)] px-5 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)]"
              >
                Open Community
              </Link>
            </div>
          </div>
        ) : embeddedCommunityGroupId ? (
          <iframe
            key={embeddedCommunityGroupId}
            src={`/study-groups/${embeddedCommunityGroupId}/chat?embedded=dashboard&tab=home`}
            title="Bible Buddy Community"
            className="block w-full border-0 bg-[var(--bb-surface-soft,#f8fbff)]"
            scrolling="no"
            style={{ height: embeddedCommunityHeight, minHeight: "calc(100dvh - 130px)" }}
          />
        ) : (
          <div className="grid min-h-[520px] place-items-center bg-[var(--bb-surface-soft,#f8fbff)] px-6 text-center">
            <p className="text-sm font-black text-[var(--bb-text-secondary,#5f6368)]">Open Community from the menu to load the group.</p>
          </div>
        )}
      </div>
    </section>
  );

  const renderEmbeddedBuddiesPage = () => (
    <section className="w-full px-1 pb-4">
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Buddies</p>
          <h2 className="mt-1 text-2xl font-black text-[var(--bb-text-primary,#111827)]">Top Bible Buddies</h2>
          <p className="mt-2 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#5f6368)]">
            App-wide Top 10 based on Bible tasks finished in the last rolling {buddiesDashboard?.meta?.topWindowDays || 30} days.
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
          <>
            <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
              <div className="space-y-3">
                {(buddiesDashboard?.topBuddies || []).map((buddy) => (
                  <div key={buddy.userId} className="flex items-center gap-3 rounded-[20px] bg-[var(--bb-surface,#f8fbff)] p-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--bb-accent,#2f7fe8)] text-sm font-black text-[var(--bb-button-text,#ffffff)]">
                      #{buddy.rank}
                    </div>
                    {buddy.profileImageUrl ? (
                      <img src={buddy.profileImageUrl} alt={buddy.displayName} loading="lazy" decoding="async" className="h-11 w-11 shrink-0 rounded-full object-cover" />
                    ) : (
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
                        {getBuddyInitial(buddy.displayName)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-[var(--bb-text-primary,#111827)]">{buddy.displayName}</p>
                      <p className="mt-0.5 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                        L{buddy.currentLevel} - {buddy.taskCount} completed Bible tasks
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-black text-[var(--bb-text-primary,#111827)]">{buddy.score}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--bb-text-muted,#6b7280)]">score</p>
                    </div>
                  </div>
                ))}
              </div>
              {!(buddiesDashboard?.topBuddies || []).length ? (
                <p className="py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">No ranking activity yet.</p>
              ) : null}
            </div>

            <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm">
              <h3 className="text-xl font-black text-[var(--bb-text-primary,#111827)]">Your Buddies' Timeline</h3>
              <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">
                Completed Bible study tasks from your mutual Buddies.
              </p>
              <div className="mt-4 space-y-3">
                {(buddiesDashboard?.friendTimeline || []).map((item) => (
                  <div key={item.id} className="flex gap-3 rounded-[20px] bg-[var(--bb-surface,#f8fbff)] p-3">
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
                  <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">Add Buddies from profiles and their Bible task progress will show up here.</p>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
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
                  <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#5f6368)]">{title.title} • {episode.duration}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmbeddedTvSelection(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface,#f8fbff)] text-lg font-black text-[var(--bb-text-primary,#111827)]"
                  aria-label="Close video"
                >
                  ×
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
                <span className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-black text-black">▶ Play</span>
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
    const scrambledTask = visibleTasks.find((task) => task.kind === "scrambled") ?? null;
    const gameCards = [
      {
        key: "trivia" as const,
        eyebrow: "Task 4",
        title: "Bible Trivia",
        subtitle: "Answer chapter questions and see what is sticking.",
        stat: "5 quick questions",
        href: triviaTask?.href || "/bible-trivia",
        button: triviaTask ? `Play ${triviaTask.chapterLabel || "Today's"} Trivia` : "Browse Trivia",
        icon: "🧠",
      },
      {
        key: "scrambled" as const,
        eyebrow: "Task 5",
        title: "Scrambled",
        subtitle: "Unscramble Bible words so the chapter stays in your memory.",
        stat: "5 Scripture words",
        href: scrambledTask?.href || "/bible-study-games/scrambled",
        button: scrambledTask ? `Play ${scrambledTask.chapterLabel || "Today's"} Scrambled` : "Browse Scrambled",
        icon: "🔤",
      },
    ];
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
                  ×
                </button>
              </div>
              <div className="mt-5 rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--bb-accent-soft,#eaf5ff)] text-3xl" aria-hidden="true">{selectedGame.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">{selectedGame.stat}</p>
                    <p className="mt-1 text-xs font-bold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                      {embeddedGameView === "trivia"
                        ? "Use this after reading and notes to check your chapter understanding."
                        : "Use this after trivia to slow down and remember key Bible words."}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  <Link href={selectedGame.href} className="rounded-2xl bg-[var(--bb-button,#2f7fe8)] px-4 py-3 text-center text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95">
                    {selectedGame.button}
                  </Link>
                  <Link
                    href={embeddedGameView === "trivia" ? "/bible-trivia/books" : "/bible-study-games/scrambled/books"}
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
        <div className="bb-skin-glow-card overflow-hidden rounded-[18px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-3 py-2.5 shadow-sm transition">
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
              <span className="h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-[var(--bb-surface-soft,#eef6ff)] shadow-sm">
                {currentStudyCover ? (
                  <img src={currentStudyCover} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                ) : (
                  <span className="grid h-full w-full place-items-center text-xl" aria-hidden="true">📖</span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Current Study</span>
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
                  const isLocked = !isPaidUser && !isPastOrCurrent;

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
                        {isLocked ? "🔒" : isCurrent ? "Review" : switchingStudyChapter === studyChapter.day_number ? "Loading" : "Load"}
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

  const renderEmbeddedSharePage = () => {
    const inviteUserId = shareRewardsProfile?.user_id || userId;
    const shareUrl =
      inviteUserId && typeof window !== "undefined"
        ? `${window.location.origin}/signup?referrer=${encodeURIComponent(inviteUserId)}`
        : "https://thebiblestudybuddy.com/signup";
    const signupCount = shareRewardsReferrals.length;
    const earnedXp = signupCount * 250;
    const earnedDiamonds = signupCount * 250;
    const shareMessage = `Join me on Bible Buddy. It helps you know where to start, understand what you read, and stay consistent with Bible study. ${shareUrl}`;
    const encodedShareMessage = encodeURIComponent(shareMessage);
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
            <div className="bg-[linear-gradient(135deg,var(--bb-accent-soft,#eaf5ff),var(--bb-card,#ffffff)_62%,#fff7d7)] px-4 pb-5 pt-5 sm:px-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Buddy Rewards</p>
              <h2 className="mt-1 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Share Bible Buddy</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#5f6368)]">
                Share Bible Buddy with friends and earn XP points and diamonds.
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3 shadow-sm">
                <div className="buddy-rewards-buddy grid h-24 w-24 shrink-0 place-items-center overflow-visible">
                  {selectedBuddy ? <LouisAvatar buddyId={selectedBuddy.id} mood="wave" size={104} /> : <span className="block h-[104px] w-[104px]" aria-hidden="true" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-5 text-[var(--bb-text-secondary,#5f6368)]">
                    For every person you get to sign up, you earn 250 XP points and 250 diamonds.
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-[var(--bb-accent,#2f7fe8)] px-3 py-1 text-xs font-black text-white">
                    +250 XP +250 diamonds
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

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={copyInviteLink}
                      className="rounded-2xl bg-[var(--bb-accent,#2f7fe8)] px-3 py-3 text-center text-sm font-black text-white shadow-sm transition hover:opacity-90"
                    >
                      {shareCopied ? "Link Copied" : "Copy Invite Link"}
                    </button>
                    <button
                      type="button"
                      onClick={openNativeShare}
                      className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-3 py-3 text-center text-sm font-black text-[var(--bb-text-primary,#111827)] shadow-sm transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
                    >
                      Send to Anyone
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodedShareMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-[#bce8cf] bg-[#effff5] px-3 py-3 text-center text-sm font-black text-[#137a3a] transition hover:bg-white"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`sms:?&body=${encodedShareMessage}`}
                      className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-3 text-center text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-card,#ffffff)]"
                    >
                      SMS
                    </a>
                    <a
                      href={`mailto:?subject=Join me on Bible Buddy&body=${encodedShareMessage}`}
                      className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-3 text-center text-sm font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-card,#ffffff)]"
                    >
                      Email
                    </a>
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
                      <p className="text-xl font-black text-[var(--bb-text-primary,#111827)]">{earnedDiamonds}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">diamonds</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">Signup Log</p>
                        <p className="mt-1 text-sm font-bold text-[var(--bb-text-secondary,#5f6368)]">
                          {shareRewardsLoading ? "Checking for signups..." : "Every signup from your link appears here."}
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-1 text-xs font-black text-[var(--bb-text-secondary,#5f6368)]">{signupCount}</span>
                    </div>
                    {signupCount > 0 ? (
                      <div className="mt-3 space-y-2">
                        {shareRewardsReferrals.map((referral) => (
                          <div key={referral.referred_user_id} className="flex items-center justify-between rounded-xl bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-2">
                            <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">New Bible Buddy</p>
                            <p className="text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                              {new Date(referral.trial_started_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                        ))}
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

        @keyframes completion-side-firework {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2) rotate(0deg); }
          16% { opacity: 1; }
          76% { opacity: 0.85; }
          100% { opacity: 0; transform: translate(calc(-50% + var(--fx-x)), calc(-50% + var(--fx-y))) scale(1) rotate(var(--fx-r)); }
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
            ) : (
              <>
            {!homePanelOverride ? (
              <div className="mx-auto w-full max-w-xl px-1">
                <h1 className="text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-3xl">
                  {getDashboardGreeting()}, {getFirstDashboardName(profile?.display_name || profile?.username || userName)}
                </h1>
              </div>
            ) : null}
            {!homePanelOverride ? homeHeader : null}
            {homePanelOverride ? (
              <div className="dashboard-inline-task">{homePanelOverride}</div>
            ) : null}
            {!homePanelOverride && !shouldShowCompletionPanel ? renderCurrentStudyHeader() : null}
            {!homePanelOverride && !shouldShowCompletionPanel && !shouldHideCompletedChapterProgressCard ? (
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
                <span className="text-xl text-gray-400" aria-hidden="true">›</span>
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
                      const isLocked = !isPaidUser && !isUnlockedForFree;
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
                            {isLocked ? "🔒" : isCurrent ? "Review" : switchingStudyChapter === studyChapter.day_number ? "Loading" : "Load"}
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
            {!homePanelOverride && !shouldShowCompletionPanel && deepStudyNode ? (
              <div className="dashboard-inline-deep-study mb-3 sm:mb-4">{deepStudyNode}</div>
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
                                    <img src={cover} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
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
              </>
            )}

            {!shouldShowBibleBuddy3ModeGate && (isChecklistSyncing || (isLoadingNextChapter && !preloadedNextChapter?.tasks.length && !preloadedNextStudy?.tasks.length)) ? (
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
            ) : !homePanelOverride && shouldShowCompletionPanel ? (
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
                          Next Bible Series
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
              {displayTasks.map((task, index) => {
                const originalTaskIndex = displayTasks.findIndex((visibleTask) => visibleTask.kind === task.kind);
                const taskIndex = originalTaskIndex >= 0 ? originalTaskIndex : index;
                const taskCopy = getTaskCardCopy(task, taskIndex);
                const justCompleted = Boolean(task.done && previousDoneByKindRef.current && !previousDoneByKindRef.current[task.kind]);
                const isCelebrating = Boolean(celebratingTasks[task.kind]) || justCompleted;
                const isLockedByOrder = !isPaidUser && !task.done && displayNextActionTaskIndex >= 0 && taskIndex > displayNextActionTaskIndex;
                const isCardDisabled = Boolean(task.disabled || isLockedByOrder);
                const isNextActionTask = task.kind === displayNextActionTaskKind && !isCardDisabled;
                const pointsPillLabel = task.pointsLabel;
                const activeTaskPrompt = null as ActiveTaskPrompt | null;
                const taskStatusLabel = getTaskStatusLine(task);
                const isActiveInlineTask =
                  activeTask?.kind === task.kind &&
                  (activeTask.href || "") === (task.href || "") &&
                  (activeTask.chapterLabel || "") === (task.chapterLabel || "");

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
                    isActiveInlineTask ? "dashboard-task-shell-open" : ""
                  } ${taskShellClasses}`}
                  style={isNewChapterDropping ? { animationDelay: `${index * 85}ms` } : undefined}
                >
                <button
                  type="button"
                  onClick={() => {
                    if (isCardDisabled) return;
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
                        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7BAFD4] text-xs font-black text-white ring-2 ring-white">
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
                          isActiveInlineTask && task.kind === "notes" && !task.done ? (
                            <p className="relative h-4 w-56 text-center text-[11px] font-black text-gray-700">
                              <span className="task-estimate-primary absolute inset-0 whitespace-nowrap">
                                Takes about {task.timeEstimateLabel}
                              </span>
                              <span className="task-estimate-secondary absolute inset-0 whitespace-nowrap text-[var(--bb-accent,#2f7fe8)]">
                                Mark as completed below
                              </span>
                            </p>
                          ) : (
                            <p className="whitespace-nowrap text-center text-[11px] font-black text-gray-700">
                              Takes about {task.timeEstimateLabel}
                            </p>
                          )
                        ) : null}
                      </div>
                    </div>
                    {!isCardDisabled && !isActiveInlineTask ? (
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
                  <div className="px-3.5 pb-3 sm:px-4">
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
                </div>
                );
              })}
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
            !suppressCompletedTasksPanel &&
            !shouldShowCompletionPanel &&
            !isLoadingNextChapter &&
            displayTasks.length < visibleTasks.length &&
            completedTrackerTasks.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-[#b9dcf4] bg-white/80 shadow-sm">
                <button
                  type="button"
                  onClick={() => setCompletedTasksExpanded((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-[#eaf5ff]/70"
                  aria-expanded={completedTasksExpanded}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-gray-950">
                      Completed Study Tasks for {activeChapterLabel}
                    </p>
                    <p className="mt-0.5 text-[11px] font-bold text-[#2f6685]">
                      {completedTrackerTasks.length} of {visibleTasks.length} tasks done
                    </p>
                  </div>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eaf5ff] text-lg font-black text-[#2f6685] transition ${completedTasksExpanded ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    v
                  </span>
                </button>
                {completedTasksExpanded ? (
                <>
                <div className="grid gap-2 border-t border-[#b9dcf4] px-3 pb-3 pt-3 sm:grid-cols-2">
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
                            ? "border-[var(--bb-accent,#2f7fe8)] bg-white shadow-sm sm:col-span-2"
                            : "border-[#b9dcf4] bg-[#eaf5ff]/70 hover:border-[#7BAFD4] hover:bg-[#eaf5ff] hover:shadow-sm"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onTaskClick(task)}
                          className="group flex min-h-10 w-full items-center gap-2 px-3 py-2 text-left transition"
                          aria-expanded={isActiveCompletedTask}
                        >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#7BAFD4] text-[11px] font-black text-white shadow-sm" aria-hidden="true">
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
                      </div>
                    );
                  })}
                </div>
                {activeCompletedTrackerTask ? (
                  <div className="border-t border-[#b9dcf4] px-3 pb-3">
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
          {renderEmbeddedBuddyPage()}
        </div>

        <div className={getSlideClass(2)}>
          {renderEmbeddedBibleStudiesPage()}
        </div>

        <div className={getSlideClass(3)}>
          {renderEmbeddedCommunityPage()}
        </div>

        <div className={getSlideClass(4)}>
          {renderEmbeddedBuddiesPage()}
        </div>

        <div className={getSlideClass(5)}>
          {renderEmbeddedTvPage()}
        </div>

        <div className={getSlideClass(6)}>
          {renderEmbeddedGamesPage()}
        </div>

        <div className={getSlideClass(7)}>
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

      {!shouldShowBibleBuddy3ModeGate ? (
      <nav className="sticky bottom-2 z-40 mx-auto max-w-xl rounded-[22px] border border-[#dbe7f4] bg-white/95 px-2 pb-1.5 pt-1.5 shadow-[0_12px_28px_rgba(38,63,99,0.14)] backdrop-blur">
        <div className="mx-auto mb-0.5 h-1 w-10 rounded-full bg-[#dbe7f4]" aria-hidden="true" />
        <div className="[scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-end gap-0.5 text-center sm:min-w-0">
          {dashboardNavItems.map((item, index) => {
            const isActive = index === safeActivePage;
            return (
              <Link
                key={item.key}
                data-dashboard-nav-key={item.key}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleDashboardNavClick(index);
                }}
                className={`flex min-w-[68px] flex-col items-center justify-center gap-0.5 rounded-2xl px-1.5 py-1.5 text-[8.5px] font-black transition sm:min-w-[76px] sm:text-[9.5px] ${
                  isActive ? "text-[#2f7fe8]" : "text-gray-500 hover:bg-[#f4f8ff] hover:text-gray-900"
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full text-sm ${
                    isActive && item.key !== "buddy" ? "bg-[var(--bb-accent,#2f7fe8)] text-white shadow-sm" : "bg-transparent"
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
      ) : null}

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
                You were credited 250 XP points and 250 diamonds for sharing Bible Buddy.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-[rgba(2,10,22,0.44)] px-6 py-5">
              <div className="rounded-2xl border border-[rgba(103,204,255,0.22)] bg-[rgba(199,232,255,0.09)] px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <p className="text-2xl font-black text-[#5dd6ff]">+250</p>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#91b9d4]">XP points</p>
              </div>
              <div className="rounded-2xl border border-[rgba(93,214,255,0.2)] bg-[rgba(47,154,255,0.12)] px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <p className="text-2xl font-black text-[#9ee7ff]">+250</p>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#91b9d4]">diamonds</p>
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
                ×
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

              <section className="rounded-2xl border border-[#b9dcf4] bg-[#eaf5ff] p-4">
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
