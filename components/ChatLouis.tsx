// components/ChatLouis.tsx
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LouisAvatar } from "./LouisAvatar";
import { supabase } from "../lib/supabaseClient";
import { FeatureTourModal } from "./FeatureTourModal";
import { buildPersistedFeatureTours, DEFAULT_FEATURE_TOURS, normalizeFeatureTours } from "../lib/featureTours";
import { useFeatureRenderPriority } from "./FeatureRenderPriorityContext";
import { getDailyRecommendation, type DailyRecommendation } from "../lib/dailyRecommendation";
import { buildLouisGuideChatMessage, getLouisPageGuide } from "../lib/louisGuidance";
import { getVerseIntro, getVerseOfTheDay, type VerseOfTheDayEntry } from "../lib/verseOfTheDay";
import { LOUIS_MOMENT_EVENT, type LouisMomentDetail, type LouisMomentReply } from "../lib/louisMoments";
import { syncCurrentStreakToProfileStats } from "../lib/profileStats";
import { consumeLouisRouteHandoff } from "../lib/louisRouteHandoff";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { ACTION_TYPE } from "@/lib/actionTypes";

type MessageRole = "user" | "assistant";

type Message = {
  role: MessageRole;
  content: string;
  serverMessageId?: string | null;
};

type LouisInboxMessageRow = {
  id: string;
  title: string | null;
  content: string;
  action_label: string | null;
  action_href: string | null;
  created_at: string;
  consumed_at: string | null;
  kind: string;
};

type QuickReplyAction =
  | "daily_good"
  | "daily_okay"
  | "daily_bad"
  | "daily_yes"
  | "daily_no"
  | "daily_verse"
  | "daily_verse_explain"
  | "daily_verse_skip"
  | "daily_recommendation"
  | "daily_continue"
  | "daily_talk"
  | "daily_intro_help"
  | "daily_intro_later"
  | "guide_show"
  | "guide_later"
  | "guide_question"
  | "daily_try_missing"
  | "open_devotionals"
  | "moment_navigate"
  | "moment_message"
  | "moment_close"
  | "recommendation_open"
  | "recommendation_question"
  | "recommendation_later";

type QuickReply = {
  id: string;
  label: string;
  action: QuickReplyAction;
  href?: string;
  message?: string;
};

type LouisLastActionSummary = {
  summary: string;
  followUp: string;
  continueLabel: string | null;
  continueHref: string | null;
};

type LouisActionRow = {
  action_type: string | null;
  action_label: string | null;
  created_at: string;
};

type LouisHabitNudge = {
  key: "group" | "trivia" | "tv" | "notes";
  summary: string;
  label: string;
  href: string;
};

type LouisJourneyStage =
  | "new_user"
  | "started_devotional"
  | "habit_building"
  | "expanding_features"
  | "community_engaged";

type LouisPrimaryDevotional = {
  id: string;
  title: string;
  dayNumber: number;
  totalDays: number;
};

type LouisFeatureRolloutState = {
  dashboard_intro_seen: boolean;
  devotionals_intro_seen: boolean;
  group_intro_seen: boolean;
  trivia_intro_seen: boolean;
  scrambled_intro_seen: boolean;
  tv_intro_seen: boolean;
  notes_intro_seen: boolean;
};

type LouisJourneyRecommendation = DailyRecommendation & {
  journeyType?:
    | "day1_devotional"
    | "day2_continue"
    | "day3_trivia"
    | "scrambled_expansion"
    | "reader_expansion"
    | "day7_group"
    | "notes_expansion"
    | "tv_expansion"
    | "generic";
};

type LouisConversationMemory = {
  summary: string | null;
  topic: string | null;
  resolved: boolean;
};

type LouisNewUserChallengeStep = "none" | "choose_devotional" | "choose_start_day" | "daily_track";

type LouisPromptMode = "default" | "yes_no" | "today_tomorrow";

type LouisPromptIntent = "none" | "new_user_challenge" | "verse_explain" | "page_guide";

type LouisDailyFlowType = "none" | "new_user" | "fell_off" | "active" | "devotional_start";

type LouisDailyMomentKind = "first" | "second";

type LouisDailyActionTarget = {
  key: string;
  kind: "devotional" | "reading" | "study" | "game" | "default";
  category: "devotional" | "reading" | "group" | "trivia" | "scrambled" | "tv" | "notes" | "profile" | "default";
  summaryLines: string[];
  whyLine: string;
  question: string;
  href: string | null;
  yesFollowUp: string;
  nextDevotionalDayNumber?: number | null;
};

type LouisActionPreference = "devotional" | "reading" | "group" | "trivia" | "scrambled" | "tv" | "notes";

type LouisBehaviorContext = {
  currentStreak: number;
  goal: string | null;
  primaryDevotional: LouisPrimaryDevotional | null;
  lastMasterActionSummary: LouisLastActionSummary | null;
  actionRows: LouisActionRow[];
  dashboardCardsOpened: string[];
  profileComplete: boolean;
  missingProfilePhoto: boolean;
  missingProfileBio: boolean;
  currentPollQuestion: string | null;
  hasAnsweredCurrentPoll: boolean;
  currentSeriesTitle: string | null;
  hasStartedCurrentSeries: boolean;
  strongestPreference: LouisActionPreference | null;
  leastUsedPreference: LouisActionPreference | null;
  lastTvLabel: string | null;
};

type LouisPageContext = {
  pathname: string;
  routeKind:
    | "dashboard"
    | "bible_home"
    | "bible_book"
    | "bible_chapter"
    | "devotionals_home"
    | "devotional_day"
    | "reading_plan"
    | "trivia"
    | "scrambled"
    | "group"
    | "tv"
    | "profile"
    | "other";
  book: string | null;
  chapter: number | null;
  verseReferenceHint: string | null;
  devotionalId: string | null;
  devotionalDay: number | null;
  notesForChapter: boolean;
  triviaContext: string | null;
  scrambledContext: string | null;
};

type LouisDirectRoute =
  | {
      href: string;
      reply: string;
    }
  | null;

type LouisInputPromptState = {
  mode: LouisPromptMode;
  intent: LouisPromptIntent;
  hint: string | null;
  hinted: boolean;
  userMessageCount: number;
};

const DEFAULT_LOUIS_FEATURE_ROLLOUT: LouisFeatureRolloutState = {
  dashboard_intro_seen: false,
  devotionals_intro_seen: false,
  group_intro_seen: false,
  trivia_intro_seen: false,
  scrambled_intro_seen: false,
  tv_intro_seen: false,
  notes_intro_seen: false,
};

const DEFAULT_LOUIS_INPUT_PROMPT: LouisInputPromptState = {
  mode: "default",
  intent: "none",
  hint: null,
  hinted: false,
  userMessageCount: 0,
};

const DAILY_LOUIS_FLOW_VERSION = "v3";

const LOUIS_OPENING_GREETINGS = [
  "How can I help you today?",
  "What can I do for you today?",
  "What do you need help with today?",
  "Tell me what you want to do and I'll help you get there.",
  "What are we working on today?",
  "How can I guide you right now?",
  "What do you want to open or understand today?",
  "I'm here.\n\nWhat do you need help with?",
  "Tell me where you want to go and I'll take you there.",
  "What can I help you find today?",
] as const;

const DASHBOARD_VERSE_MODAL_EVENT = "bb:dashboard-verse-modal-state";

// Type for SpeechRecognition (Web Speech API)
interface SpeechRecognitionResult {
  [key: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  [key: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

function getRecommendationSeenKey(userId: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `bb:louis:recommendation:${userId}:${today}`;
}

function getDailyGreetingSeenKey(userId: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `bb:louis:greeting:${DAILY_LOUIS_FLOW_VERSION}:${userId}:${today}`;
}

function parsePositiveInt(value: string | null | undefined) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function decodePathSegment(value: string | null | undefined) {
  if (!value) return null;
  return decodeURIComponent(value).replace(/-/g, " ");
}

function buildLouisPageContext(pathname: string | null | undefined, searchParams: URLSearchParams | null): LouisPageContext {
  const safePathname = pathname || "/";
  const segments = safePathname.split("/").filter(Boolean);
  const routeKind: LouisPageContext["routeKind"] = (() => {
    if (safePathname === "/dashboard") return "dashboard";
    if (safePathname === "/reading" || safePathname === "/Bible") return "bible_home";
    if (segments[0] === "reading" && segments[1] === "books" && segments[2]) return "bible_book";
    if (segments[0] === "Bible" && segments[1] && segments[2]) return "bible_chapter";
    if (safePathname === "/devotionals") return "devotionals_home";
    if (segments[0] === "devotionals" && segments[1]) return "devotional_day";
    if (segments[0] === "reading-plans" || segments[0] === "reading-plan") return "reading_plan";
    if (segments[0] === "bible-trivia") return "trivia";
    if (segments[0] === "scrambled") return "scrambled";
    if (segments[0] === "study-groups") return "group";
    if (segments[0] === "biblebuddy-tv") return "tv";
    if (segments[0] === "profile") return "profile";
    return "other";
  })();

  const bibleBookSegment =
    routeKind === "bible_book"
      ? segments[2]
      : routeKind === "bible_chapter"
        ? segments[1]
        : null;
  const book = decodePathSegment(bibleBookSegment);
  const chapter =
    routeKind === "bible_chapter"
      ? parsePositiveInt(segments[2])
      : routeKind === "reading_plan"
        ? parsePositiveInt(segments[2] ?? null)
        : null;
  const devotionalDay =
    routeKind === "devotional_day"
      ? parsePositiveInt(searchParams?.get("day"))
      : null;

  return {
    pathname: safePathname,
    routeKind,
    book,
    chapter,
    verseReferenceHint: book && chapter ? `${book} ${chapter}` : book,
    devotionalId: routeKind === "devotional_day" ? segments[1] ?? null : null,
    devotionalDay,
    notesForChapter:
      searchParams?.get("notes") === "1" ||
      safePathname.includes("/notes"),
    triviaContext:
      routeKind === "trivia"
        ? decodePathSegment(segments[1] ?? searchParams?.get("book") ?? null)
        : null,
    scrambledContext:
      routeKind === "scrambled"
        ? decodePathSegment(segments[1] ?? searchParams?.get("book") ?? null)
        : null,
  };
}

const BIBLE_BOOK_NAMES = [
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
] as const;

function normalizeForLouisMatch(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function toBibleBookSegment(book: string) {
  return encodeURIComponent(book.toLowerCase());
}

function toGameBookSlug(book: string) {
  if (book === "Song of Solomon") return "song-of-songs";
  return book.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function findBibleBookInText(text: string) {
  const normalizedText = normalizeForLouisMatch(text);
  const sortedBooks = [...BIBLE_BOOK_NAMES].sort((a, b) => normalizeForLouisMatch(b).length - normalizeForLouisMatch(a).length);

  for (const book of sortedBooks) {
    if (normalizedText.includes(normalizeForLouisMatch(book))) {
      return book;
    }
  }

  return null;
}

function buildDirectRouteFromMessage(message: string, currentPage: LouisPageContext): LouisDirectRoute {
  const trimmed = message.trim();
  const normalized = trimmed.toLowerCase();

  const simpleRoutes: Array<{ match: RegExp; href: string; reply: string }> = [
    { match: /\b(dashboard|home)\b/, href: "/dashboard", reply: "Okay.\n\nI’m taking you to the dashboard now." },
    { match: /\b(the )?bible( reader)?\b/, href: "/reading", reply: "Okay.\n\nI’m opening the Bible reader now." },
    { match: /\bdevotionals?\b/, href: "/devotionals", reply: "Okay.\n\nI’m taking you to the devotionals page now." },
    { match: /\b(reading plans?|plans?)\b/, href: "/reading-plans", reply: "Okay.\n\nI’m opening the reading plans now." },
    { match: /\b(group|bible study group|the group)\b/, href: "/study-groups", reply: "Okay.\n\nI’m taking you to The Bible Study Group now." },
    { match: /\b(tv|sermons?|bible buddy tv)\b/, href: "/biblebuddy-tv", reply: "Okay.\n\nI’m opening Bible Buddy TV now." },
    { match: /\b(profile)\b/, href: "/profile", reply: "Okay.\n\nI’m taking you to your profile now." },
    { match: /\b(settings?)\b/, href: "/settings", reply: "Okay.\n\nI’m opening settings now." },
    { match: /\b(study tools?|guided studies?)\b/, href: "/guided-studies", reply: "Okay.\n\nI’m taking you to the study tools now." },
    { match: /\b(trivia)\b/, href: "/bible-trivia", reply: "Okay.\n\nI’m opening Bible Trivia now." },
    { match: /\b(scrambled)\b/, href: "/bible-study-games/scrambled", reply: "Okay.\n\nI’m opening Scrambled now." },
  ];

  const wantsNavigation = /\b(show|open|take me|go to|bring me|load)\b/.test(normalized);
  const book = findBibleBookInText(trimmed);
  const chapterMatch = normalized.match(/\bchapter\s+(\d+)\b|\b(\d+)\b/);
  const chapter = chapterMatch ? Number.parseInt(chapterMatch[1] || chapterMatch[2], 10) : null;

  if (book && chapter && /\btrivia\b/.test(normalized)) {
    return {
      href: `/bible-trivia/${toGameBookSlug(book)}/${chapter}`,
      reply: `Okay.\n\nI’m opening ${book} ${chapter} trivia now.`,
    };
  }

  if (book && chapter && /\bscrambled\b/.test(normalized)) {
    return {
      href: `/bible-study-games/scrambled/${toGameBookSlug(book)}/${chapter}`,
      reply: `Okay.\n\nI’m opening ${book} ${chapter} scrambled now.`,
    };
  }

  if (book && chapter && /\b(notes|chapter notes)\b/.test(normalized)) {
    return {
      href: `/Bible/${toBibleBookSegment(book)}/${chapter}`,
      reply: `Okay.\n\nI’m opening ${book} ${chapter}.\n\nTap Chapter Notes on that page and you’ll be right where you need to be.`,
    };
  }

  if (book && chapter && wantsNavigation) {
    return {
      href: `/Bible/${toBibleBookSegment(book)}/${chapter}`,
      reply: `Okay.\n\nI’m opening ${book} ${chapter} now.`,
    };
  }

  if (!book && chapter && currentPage.book && /\btrivia\b/.test(normalized)) {
    return {
      href: `/bible-trivia/${toGameBookSlug(currentPage.book)}/${chapter}`,
      reply: `Okay.\n\nI’m opening ${currentPage.book} ${chapter} trivia now.`,
    };
  }

  if (!book && chapter && currentPage.book && /\bscrambled\b/.test(normalized)) {
    return {
      href: `/bible-study-games/scrambled/${toGameBookSlug(currentPage.book)}/${chapter}`,
      reply: `Okay.\n\nI’m opening ${currentPage.book} ${chapter} scrambled now.`,
    };
  }

  if (!book && chapter && currentPage.routeKind === "bible_chapter" && wantsNavigation) {
    return {
      href: `/Bible/${toBibleBookSegment(currentPage.book || "")}/${chapter}`,
      reply: `Okay.\n\nI’m opening ${currentPage.book} ${chapter} now.`,
    };
  }

  if (wantsNavigation) {
    for (const route of simpleRoutes) {
      if (route.match.test(normalized)) {
        return { href: route.href, reply: route.reply };
      }
    }
  }

  return null;
}

function getDailyGreetingShownAtKey(userId: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `bb:louis:greeting-at:${DAILY_LOUIS_FLOW_VERSION}:${userId}:${today}`;
}

function getDailySecondRecommendationSeenKey(userId: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `bb:louis:second:${DAILY_LOUIS_FLOW_VERSION}:${userId}:${today}`;
}

function getChatStorageKey(userId: string) {
  return `bb:louis:chat:${userId}`;
}

function getMemoryStorageKey(userId: string) {
  return `bb:louis:memory:${userId}`;
}

function getGuidePromptKey(userId: string, guideId: string) {
  return `bb:louis:guide-prompt:${userId}:${guideId}`;
}

function getGoalStorageKey() {
  return "bb_onboarding_goal";
}

function getRolloutStorageKey(userId: string) {
  return `bb:louis:rollout:${userId}`;
}

function getNewUserChallengeStorageKey(userId: string) {
  return `bb:louis:new-user-challenge:${userId}`;
}

function normalizeNewUserChallengeStep(value: string | null | undefined): LouisNewUserChallengeStep {
  if (value === "choose_devotional" || value === "choose_start_day" || value === "daily_track") {
    return value;
  }
  return "none";
}

function hasSeenGuidePrompt(userId: string, guideId: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getGuidePromptKey(userId, guideId)) === "1";
}

function hasSeenRecommendation(userId: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getRecommendationSeenKey(userId)) === "1";
}

function rememberRecommendationSeen(userId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getRecommendationSeenKey(userId), "1");
}

function hasSeenDailyGreeting(userId: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getDailyGreetingSeenKey(userId)) === "1";
}

function rememberDailyGreetingSeen(userId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getDailyGreetingSeenKey(userId), "1");
}

function getDailyGreetingShownAt(userId: string) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(getDailyGreetingShownAtKey(userId));
}

function rememberDailyGreetingShownAt(userId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getDailyGreetingShownAtKey(userId), new Date().toISOString());
}

function hasSeenSecondRecommendation(userId: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getDailySecondRecommendationSeenKey(userId)) === "1";
}

function rememberSecondRecommendationSeen(userId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getDailySecondRecommendationSeenKey(userId), "1");
}

function getTimeOfDayGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function buildVerseExplanationMessage(verse: VerseOfTheDayEntry) {
  const sections = verse.explanationSections ?? [];
  const parts = sections
    .map((section) => {
      const heading = section.heading?.trim();
      const body = section.body?.trim();
      if (!body) return null;
      if (!heading) return body;
      return `${heading}: ${body}`;
    })
    .filter((value): value is string => Boolean(value));

  return [
    `Yeah, let me break that down a little more.`,
    `When you slow this verse down, here's the bigger picture.`,
    ...parts,
    `That’s why this verse is not just something to read. It’s something to carry with you today.`,
  ].join("\n\n");
}

function normalizeOnboardingGoal(value: string | null | undefined) {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();
  if (normalized === "understand_bible_better" || normalized === "understand the bible better") {
    return "understand_bible_better";
  }
  if (normalized === "build_bible_habit" || normalized === "build a habit of reading the bible") {
    return "build_bible_habit";
  }
  if (
    normalized === "stay_consistent" ||
    normalized === "stay consistent with devotionals and study plans"
  ) {
    return "stay_consistent";
  }
  if (normalized === "study_with_buddies" || normalized === "study with other bible buddies") {
    return "study_with_buddies";
  }
  return null;
}

function inferConversationTopic(message: string) {
  const text = message.toLowerCase();

  if (/(stress|overwhelmed|anxious|anxiety|worry|tired|burnout)/.test(text)) return "stress";
  if (/(temptation|lust|porn|sexual sin|adultery|addiction)/.test(text)) return "temptation";
  if (/(consisten|habit|discipline|keep showing up|streak)/.test(text)) return "consistency";
  if (/(understand|confused|meaning|explain|context|scripture)/.test(text)) return "understanding_scripture";
  if (/(sad|grief|depress|hurt|pain|lonely|broken)/.test(text)) return "pain";
  if (/(money|debt|budget|finance)/.test(text)) return "money";
  if (/(marriage|wife|husband|relationship|divorce)/.test(text)) return "relationships";
  if (/(angry|anger|forgive|forgiveness|resentment)/.test(text)) return "anger";
  return "general";
}

function summarizeConversationMemory(message: string) {
  const trimmed = message.trim();
  if (!trimmed) return null;
  return trimmed.length > 180 ? `${trimmed.slice(0, 177)}...` : trimmed;
}

function messageLooksResolved(message: string) {
  const text = message.toLowerCase();
  return /^(thanks|thank you|i'm good now|im good now|all good|never mind|nm|got it|that helps|okay thanks|ok thanks)/.test(
    text,
  );
}

function formatOnboardingGoal(goal: string | null | undefined) {
  switch (normalizeOnboardingGoal(goal)) {
    case "understand_bible_better":
      return "understand the Bible better";
    case "build_bible_habit":
      return "build a habit of reading the Bible";
    case "stay_consistent":
      return "stay consistent with devotionals and study plans";
    case "study_with_buddies":
      return "study with other Bible Buddies";
    default:
      return null;
  }
}

function buildNewUserChallengeLine(goal: string | null | undefined) {
  switch (normalizeOnboardingGoal(goal)) {
    case "build_bible_habit":
      return "You said you want to build a better Bible habit, and that's what I want to help you do.";
    case "understand_bible_better":
      return "You said you want to understand the Bible better, and that's what I want to help you do.";
    case "stay_consistent":
      return "You said you want to stay consistent, and that's what I want to help you do.";
    case "study_with_buddies":
      return "You said you want to study with other Bible Buddies, and that's what I want to help you do.";
    default:
      return "I want to help you build a real Bible habit in here, not just browse around once and disappear.";
  }
}

function toGoalHelpLine(goal: string | null | undefined) {
  switch (normalizeOnboardingGoal(goal)) {
    case "build_bible_habit":
      return "This will help you stay consistent every day";
    case "understand_bible_better":
      return "This will help you understand what you are reading";
    case "stay_consistent":
      return "This will help you stay consistent every day";
    case "study_with_buddies":
      return "This will help you grow closer to God";
    default:
      return "This will help you build a daily Bible habit";
  }
}

function normalizeFeatureRollout(value: unknown): LouisFeatureRolloutState {
  if (!value || typeof value !== "object") {
    return { ...DEFAULT_LOUIS_FEATURE_ROLLOUT };
  }

  const source = value as Record<string, unknown>;
  return {
    dashboard_intro_seen: source.dashboard_intro_seen === true,
    devotionals_intro_seen: source.devotionals_intro_seen === true,
    group_intro_seen: source.group_intro_seen === true,
    trivia_intro_seen: source.trivia_intro_seen === true,
    scrambled_intro_seen: source.scrambled_intro_seen === true,
    tv_intro_seen: source.tv_intro_seen === true,
    notes_intro_seen: source.notes_intro_seen === true,
  };
}

function getStreakCelebrationLine(currentStreak: number) {
  if (currentStreak <= 0) {
    return "This is a fresh start, and that's fine. Just do one real thing with God today and let that be enough.";
  }

  if (currentStreak === 1) {
    return "You're on day 1 right now, and that also means you just picked up 1 extra level point from your streak. Once you hit 30 days, you earn the fire and your habit really starts to feel real.";
  }

  if (currentStreak === 2) {
    return "This is your second day in a row. That's how a habit starts getting real, and your streak just gave you 2 extra level points today.";
  }

  if (currentStreak === 3) {
    return "You're on day 3 now. That's real momentum, not just a random check-in, and your streak just added 3 extra level points.";
  }

  if (currentStreak === 4) {
    return "Four days in a row is big. Most people talk about consistency, but this is what consistency actually looks like, and your streak just gave you 4 extra level points.";
  }

  if (currentStreak === 5) {
    return "Five straight days is strong. You're not just visiting Bible Buddy now. You're building something, and you just picked up 5 extra level points from your streak.";
  }

  if (currentStreak === 6) {
    return "Six days in a row is serious. You're close to a full week of showing up for your walk with God, and your streak just gave you 6 extra level points.";
  }

  if (currentStreak === 7) {
    return "A full week in a row is strong. That's how Bible study starts becoming part of your real life, and today your streak gave you 7 extra level points.";
  }

  if (currentStreak < 30) {
    return `You're on day ${currentStreak}, which means you just got ${currentStreak} extra level points from your streak today. Keep stacking days like this and the fire is coming.`;
  }

  return `You're on day ${currentStreak}, and you've already earned the fire. You also just picked up ${currentStreak} extra level points from your streak today. Now it's about protecting the habit and growing deeper.`;
}

function getDailyStreakMotivation(currentStreak: number) {
  if (currentStreak <= 0) {
    return "Today is a fresh start, so make it count.";
  }

  if (currentStreak >= 30) {
    if (currentStreak === 30) {
      return "You did it. 30 days in a row. That fire is yours now.";
    }
    return `You are on day ${currentStreak}. You built this habit. Stay on it.`;
  }

  if (currentStreak === 29) {
    return "One more day. Do not quit now.";
  }

  if (currentStreak >= 21) {
    return `You are on day ${currentStreak}. The fire is getting close now, so do not ease up.`;
  }

  if (currentStreak >= 11) {
    return `You are on day ${currentStreak}. You already built momentum. Protect it.`;
  }

  return `You are on day ${currentStreak}. You are building something now. Small days matter.`;
}

function getStreakIdentityLine(currentStreak: number) {
  if (currentStreak <= 0) {
    return "A fresh start still counts. Just do one real thing today.";
  }

  if (currentStreak === 30) {
    return "Most people never make it to 30 days. You did.";
  }

  if (currentStreak > 30) {
    return "This is not a random streak anymore. This is part of who you are now.";
  }

  if (currentStreak === 29) {
    return "You are one day away from the fire. Finish strong.";
  }

  if (currentStreak >= 21) {
    return "The fire badge is close now. Stay locked in.";
  }

  if (currentStreak >= 11) {
    return "Now it is about keeping the rhythm going.";
  }

  return "This is how a real habit gets built.";
}

function categoryForActionType(actionType: string | null | undefined): LouisActionPreference | null {
  switch (actionType) {
    case "devotional_day_completed":
    case "devotional_day_started":
    case "devotional_day_viewed":
      return "devotional";
    case "chapter_completed":
    case "reading_plan_chapter_completed":
    case "verse_highlighted":
    case "chapter_notes_viewed":
      return "reading";
    case "trivia_question_answered":
    case "trivia_started":
    case "trivia_chapter_completed":
      return "trivia";
    case "scrambled_word_answered":
    case "scrambled_chapter_completed":
      return "scrambled";
    case "bible_buddy_tv_video_started":
    case "bible_buddy_tv_title_opened":
    case "bible_buddy_tv_viewed":
      return "tv";
    case "study_group_feed_viewed":
    case "study_group_article_opened":
    case "study_group_bible_study_card_opened":
    case "series_week_started":
    case "group_message_sent":
    case "feed_post_thought":
    case "feed_post_prayer":
    case "feed_post_prayer_request":
    case "feed_post_photo":
    case "feed_post_video":
    case "feed_post_commented":
    case "feed_post_replied":
      return "group";
    case "person_learned":
    case "place_discovered":
    case "keyword_mastered":
    case "note_created":
      return "notes";
    default:
      return null;
  }
}

function getActionWindowCount(rows: LouisActionRow[], preference: LouisActionPreference, windowDays: number) {
  const threshold = Date.now() - windowDays * 86400000;
  return rows.reduce((count, row) => {
    const createdAt = new Date(row.created_at).getTime();
    if (Number.isNaN(createdAt) || createdAt < threshold) return count;
    return categoryForActionType(row.action_type) === preference ? count + 1 : count;
  }, 0);
}

function getStrongestAndWeakestPreferences(rows: LouisActionRow[]) {
  const preferences: LouisActionPreference[] = ["devotional", "reading", "group", "trivia", "scrambled", "tv", "notes"];
  const withCounts = preferences.map((preference) => ({
    preference,
    count14: getActionWindowCount(rows, preference, 14),
    count30: getActionWindowCount(rows, preference, 30),
  }));

  const strongest =
    withCounts
      .filter((entry) => entry.count14 > 0)
      .sort((a, b) => b.count14 - a.count14)[0]?.preference ?? null;

  const weakest =
    withCounts
      .filter((entry) => strongest !== entry.preference)
      .sort((a, b) => a.count30 - b.count30)[0]?.preference ?? null;

  return { strongestPreference: strongest, leastUsedPreference: weakest };
}

function buildFallbackTarget(goal: string | null, currentStreak: number): LouisDailyActionTarget {
  return {
    key: "fallback-devotional",
    kind: "devotional",
    category: "devotional",
    summaryLines: ["Your best move today is to start a devotional."],
    whyLine:
      currentStreak > 0
        ? "That keeps your streak moving and gives your Bible time some structure."
        : `${toGoalHelpLine(goal)} and gives you one clear place to start.`,
    question: "Ready to jump in?",
    href: "/devotionals",
    yesFollowUp: "Let's get you into a devotional and keep this moving.",
  };
}

function buildBehaviorRecommendations(context: LouisBehaviorContext) {
  const candidates: Array<LouisDailyActionTarget & { score: number; secondOnly?: boolean }> = [];

  if (context.primaryDevotional) {
    const nextDay = Math.min(
      context.primaryDevotional.dayNumber + 1,
      context.primaryDevotional.totalDays || context.primaryDevotional.dayNumber + 1,
    );
    candidates.push({
      key: `devotional-next-${context.primaryDevotional.id}-${nextDay}`,
      kind: "devotional",
      category: "devotional",
      score: 10 + (context.strongestPreference === "devotional" ? 8 : 0) + (context.currentStreak > 0 ? 7 : 0),
      summaryLines: [`Your best move today is to finish day ${nextDay} of ${context.primaryDevotional.title}.`],
      whyLine: `${toGoalHelpLine(context.goal)} and keeps your habit moving.`,
      question: "Ready to jump in?",
      href: `/devotionals/${context.primaryDevotional.id}?day=${nextDay}&from=louis-daily`,
      yesFollowUp: `Let's get you into day ${nextDay} and keep your rhythm going.`,
      nextDevotionalDayNumber: nextDay,
    });
  }

  if (context.lastMasterActionSummary?.continueHref) {
    const href = context.lastMasterActionSummary.continueHref;
    const isBible = href.includes("/Bible/") || href === "/reading";
    const isGroup = href.includes("/study-groups");
    const isGame = href.includes("/bible-trivia") || href.includes("/scrambled") || href.includes("/bible-study-games");

    candidates.push({
      key: `resume-${href}`,
      kind: isBible ? "reading" : isGroup ? "study" : isGame ? "game" : "default",
      category: isBible ? "reading" : isGroup ? "group" : isGame ? "trivia" : "default",
      score: 10 + (isBible && context.strongestPreference === "reading" ? 8 : 0) + (isGroup ? 6 : 0),
      summaryLines: [
        context.lastMasterActionSummary.continueLabel
          ? `Your best move today is to ${context.lastMasterActionSummary.continueLabel.toLowerCase()}.`
          : "Your best move today is to pick up where you left off.",
      ],
      whyLine: "You already did the hard part by starting, so finishing this is the easiest win today.",
      question: isBible ? "Want to keep reading?" : isGroup ? "Want to keep going there?" : "Want to pick that back up?",
      href,
      yesFollowUp: "Perfect. Pick up where you left off and keep the momentum alive.",
    });
  }

  if (context.strongestPreference === "trivia") {
    candidates.push({
      key: "trivia-habit",
      kind: "game",
      category: "trivia",
      score: 8 + (context.currentStreak > 0 ? 7 : 0),
      summaryLines: ["Your best move today is a Bible trivia round."],
      whyLine: "You keep coming back to trivia, so let it reinforce what you have been learning.",
      question: "Want to test yourself?",
      href: "/bible-trivia",
      yesFollowUp: "Let's run a quick trivia round and lock it in.",
    });
  }

  if (context.strongestPreference === "tv") {
    candidates.push({
      key: "tv-habit",
      kind: "default",
      category: "tv",
      score: 8,
      summaryLines: [`Your best move today is one sermon in Bible Buddy TV${context.lastTvLabel ? ` that fits with ${context.lastTvLabel}.` : "."}`],
      whyLine: "That matches the teaching content you already spend time with in here.",
      question: "Want to watch it now?",
      href: "/biblebuddy-tv",
      yesFollowUp: "Let's get you into Bible Buddy TV and keep you growing.",
    });
  }

  if (context.currentPollQuestion && !context.hasAnsweredCurrentPoll) {
    candidates.push({
      key: "group-poll",
      kind: "study",
      category: "group",
      score: 6 + (context.strongestPreference === "group" ? 8 : 0),
      summaryLines: ["Your best move today is to vote in the Bible Study Group poll."],
      whyLine: `The group is talking about ${context.currentPollQuestion}, and being part of that keeps you connected.`,
      question: "Want to go vote?",
      href: "/study-groups",
      yesFollowUp: "Let's head into the group and get your vote in.",
    });
  }

  if (context.currentSeriesTitle && !context.hasStartedCurrentSeries) {
    candidates.push({
      key: "group-series",
      kind: "study",
      category: "group",
      score: 6 + (context.strongestPreference === "group" ? 8 : 0),
      summaryLines: [`Your best move today is to start week 1 of ${context.currentSeriesTitle}.`],
      whyLine: "The Bible Study Group is one of the best ways to stay consistent because you are not doing this alone.",
      question: "Want to jump in?",
      href: "/study-groups",
      yesFollowUp: "Let's get you into the group series and start from week 1.",
    });
  }

  if (context.leastUsedPreference === "scrambled") {
    candidates.push({
      key: "discover-scrambled",
      kind: "game",
      category: "scrambled",
      score: 4,
      secondOnly: true,
      summaryLines: ["I want to push you a little further with Scrambled today."],
      whyLine: "It is quick, it is fun, and it helps you remember what you have been reading.",
      question: "Want to try it?",
      href: "/bible-study-games",
      yesFollowUp: "Let's open Bible Study Games and get into Scrambled.",
    });
  }

  if (context.leastUsedPreference === "notes") {
    candidates.push({
      key: "discover-notes",
      kind: "default",
      category: "notes",
      score: 4,
      secondOnly: true,
      summaryLines: ["I want to push you a little deeper with the study tools today."],
      whyLine: "That is where people, places, keywords, and notes start making the Bible feel clearer.",
      question: "Want to go deeper?",
      href: "/guided-studies",
      yesFollowUp: "Let's open the study tools and go deeper today.",
    });
  }

  if (context.missingProfilePhoto || context.missingProfileBio) {
    candidates.push({
      key: context.missingProfilePhoto ? "profile-photo" : "profile-bio",
      kind: "default",
      category: "profile",
      score: 3,
      secondOnly: true,
      summaryLines: [
        context.missingProfilePhoto
          ? "I want you to add a profile picture today."
          : "I want you to finish your profile bio today.",
      ],
      whyLine:
        "Let people know who they are studying with. That makes the community side of Bible Buddy feel real.",
      question: context.missingProfilePhoto ? "Want to upload one now?" : "Want to finish that now?",
      href: "/profile",
      yesFollowUp: "Let's clean up your profile and make it feel complete.",
    });
  }

  const ranked = candidates.sort((a, b) => b.score - a.score);
  const primary = ranked.find((candidate) => !candidate.secondOnly) ?? buildFallbackTarget(context.goal, context.currentStreak);
  const secondary =
    ranked.find((candidate) => candidate.key !== primary.key && candidate.secondOnly) ??
    ranked.find((candidate) => candidate.key !== primary.key && candidate.category === "group") ??
    ranked.find((candidate) => candidate.key !== primary.key) ??
    null;

  return { primary, secondary };
}

function buildHabitNudgeFromCards(openedCards: string[]): LouisHabitNudge | null {
  const seen = new Set(openedCards);

  if (!seen.has("Bible Study Group")) {
    return {
      key: "group",
      summary:
        "I've noticed you haven't tried the Bible Study Group yet. You do not have to study alone in here.",
      label: "Try the group",
      href: "/study-groups",
    };
  }

  if (!seen.has("Bible Study Games")) {
    return {
      key: "trivia",
      summary:
        "You've been showing up, but you still haven't tried Bible Study Games. That's one of the easiest ways to lock in what you're learning.",
      label: "Try Bible Study Games",
      href: "/bible-study-games",
    };
  }

  if (!seen.has("Bible Buddy TV")) {
    return {
      key: "tv",
      summary:
        "You still haven't tried Bible Buddy TV. If you want something easier to ease into today, that could be a good move.",
      label: "Try Bible Buddy TV",
      href: "/biblebuddy-tv",
    };
  }

  if (!seen.has("Bible Study Tools")) {
    return {
      key: "notes",
      summary:
        "You haven't opened the study tools yet. That's where devotionals, reading plans, and the deeper study side of Bible Buddy really opens up.",
      label: "Open study tools",
      href: "/guided-studies",
    };
  }

  return null;
}

function renderLouisGuideContent(_guide?: unknown) {
  return null;
}

function getEncodedBibleHref(book: string, chapter: number) {
  return `/Bible/${encodeURIComponent(book)}/${chapter}`;
}

function summarizeLastMasterAction(action: {
  action_type?: string | null;
  action_label?: string | null;
} | null): LouisLastActionSummary | null {
  if (!action?.action_type) return null;

  const label = action.action_label?.trim();

  if (action.action_type === "chapter_completed" || action.action_type === "reading_plan_chapter_completed") {
    const match = label?.match(/^(.+?)\s+(\d+)$/);
    if (match) {
      const book = match[1];
      const chapter = Number.parseInt(match[2], 10);
      if (!Number.isNaN(chapter)) {
        const nextChapter = chapter + 1;
        return {
          summary: `Last time you were in ${book} ${chapter}.`,
          followUp: `Do you want to continue with ${book} ${nextChapter}?`,
          continueLabel: `Continue ${book} ${nextChapter}`,
          continueHref: getEncodedBibleHref(book, nextChapter),
        };
      }
    }
  }

  if (action.action_type === "devotional_day_completed" && label) {
    return {
      summary: `Last time you were in ${label}.`,
      followUp: "Do you want to keep going with that devotional?",
      continueLabel: "Open devotionals",
      continueHref: "/devotionals",
    };
  }

  if (action.action_type === "series_week_started" && label) {
    return {
      summary: `Last time you were in ${label}.`,
      followUp: "Do you want to continue?",
      continueLabel: "Open Bible Study Series",
      continueHref: "/study-groups",
    };
  }

  if (
    action.action_type === "bible_buddy_tv_video_started" ||
    action.action_type === "bible_buddy_tv_title_opened"
  ) {
    return {
      summary: label ? `Last time you were watching ${label}.` : "Last time you were in Bible Buddy TV.",
      followUp: "Do you want to pick that back up?",
      continueLabel: "Open Bible Buddy TV",
      continueHref: "/biblebuddy-tv",
    };
  }

  if (action.action_type === "trivia_question_answered") {
    return {
      summary: label ? `Last time you were working through ${label}.` : "Last time you were in Bible Trivia.",
      followUp: "Do you want to jump back into Bible Trivia?",
      continueLabel: "Open Bible Trivia",
      continueHref: "/bible-trivia",
    };
  }

  if (action.action_type === "scrambled_word_answered" || action.action_type === "scrambled_chapter_completed") {
    return {
      summary: label ? `Last time you were playing ${label}.` : "Last time you were in Scrambled.",
      followUp: "Do you want to go back there?",
      continueLabel: "Open Bible Study Games",
      continueHref: "/bible-study-games",
    };
  }

  if (action.action_type === "dashboard_card_opened" && label) {
    const href =
      label === "The Bible"
        ? "/reading"
        : label === "Bible Study Group"
          ? "/study-groups"
          : label === "Bible Study Tools"
            ? "/guided-studies"
            : label === "Bible Buddy TV"
              ? "/biblebuddy-tv"
              : label === "Bible Study Games"
                ? "/bible-study-games"
                : null;

    return {
      summary: `Last time you opened ${label}.`,
      followUp: "Do you want to go back there today?",
      continueLabel: href ? `Open ${label}` : null,
      continueHref: href,
    };
  }

  if (label) {
    return {
      summary: `Last time you were in ${label}.`,
      followUp: "Do you want to pick that back up?",
      continueLabel: null,
      continueHref: null,
    };
  }

  return null;
}

function parseDevotionalDayLabel(label: string | null | undefined) {
  if (!label) return null;
  const match = label.match(/^(.*?)\s*-\s*Day\s+(\d+)$/i);
  if (!match) return null;
  const dayNumber = Number.parseInt(match[2], 10);
  if (Number.isNaN(dayNumber)) return null;
  return {
    title: match[1].trim(),
    dayNumber,
  };
}

function deriveLouisJourneyStage({
  devotionalDayCount,
  currentStreak,
  hasGroupActivity,
  featureFamiliesUsed,
}: {
  devotionalDayCount: number;
  currentStreak: number;
  hasGroupActivity: boolean;
  featureFamiliesUsed: number;
}): LouisJourneyStage {
  if (hasGroupActivity) return "community_engaged";
  if (currentStreak >= 7 || featureFamiliesUsed >= 3) return "expanding_features";
  if (devotionalDayCount >= 3 || currentStreak >= 3) return "habit_building";
  if (devotionalDayCount >= 1) return "started_devotional";
  return "new_user";
}

function buildLouisJourneyRecommendation({
  currentStreak,
  goal,
  primaryDevotional,
  stage,
  hasTriedTrivia,
  hasTriedScrambled,
  hasTriedGroup,
  hasTriedTv,
  hasTriedNotes,
}: {
  currentStreak: number;
  goal: string | null;
  primaryDevotional: LouisPrimaryDevotional | null;
  stage: LouisJourneyStage;
  hasTriedTrivia: boolean;
  hasTriedScrambled: boolean;
  hasTriedGroup: boolean;
  hasTriedTv: boolean;
  hasTriedNotes: boolean;
}): LouisJourneyRecommendation | null {
  const formattedGoal = formatOnboardingGoal(goal);

  if (!primaryDevotional) {
    return {
      greeting: "Let's build this the right way.",
      contextLine: formattedGoal
        ? `You told me you want to ${formattedGoal}.`
        : "The best way to get real traction in Bible Buddy is to start with one structured habit.",
      recommendationLine:
        "Pick one devotional and let me walk you through it day by day. You do one thing a day, and I will help with the rest.",
      primaryButtonText: "Start a devotional",
      primaryButtonHref: "/devotionals",
      level: 1,
      cardTitle: "Start With A Devotional",
      cardSubtitle: "One daily track is the easiest way to build real momentum.",
      cardEyebrow: "Louis Recommends",
      cardTheme: "blue",
      recommendationKey: "louis-journey-day1-devotional",
      category: "devotional",
      journeyType: "day1_devotional",
    };
  }

  if (currentStreak === 2 || (stage === "started_devotional" && primaryDevotional.dayNumber <= 2)) {
    const nextDay = Math.min(primaryDevotional.dayNumber + 1, primaryDevotional.totalDays || primaryDevotional.dayNumber + 1);
    return {
      greeting: "This is how habits actually start.",
      contextLine: `Yesterday you finished day ${primaryDevotional.dayNumber} of ${primaryDevotional.title}.`,
      recommendationLine: `Come back to ${primaryDevotional.title} and do day ${nextDay}. Keep it simple and protect the streak.`,
      primaryButtonText: `Start day ${nextDay}`,
      primaryButtonHref: `/devotionals/${primaryDevotional.id}`,
      level: 1,
      cardTitle: `Keep Going With ${primaryDevotional.title}`,
      cardSubtitle: `Day ${nextDay} is the right next move.`,
      cardEyebrow: "Day 2",
      cardTheme: "blue",
      recommendationKey: `louis-journey-day2-${primaryDevotional.id}-${nextDay}`,
      category: "devotional",
      journeyType: "day2_continue",
    };
  }

  if (primaryDevotional.dayNumber >= 3 && !hasTriedTrivia) {
    const isJoseph = /joseph/i.test(primaryDevotional.title);
    return {
      greeting: "You're building something now.",
      contextLine: `You finished day ${primaryDevotional.dayNumber} of ${primaryDevotional.title}.`,
      recommendationLine: isJoseph
        ? "That part of Joseph's story connects back to Genesis 37. A trivia game is a good way to lock it in."
        : "Before you move on, reinforce what you just learned with a quick trivia round.",
      primaryButtonText: isJoseph ? "Open Joseph trivia" : "Open Bible trivia",
      primaryButtonHref: isJoseph ? "/bible-trivia/joseph" : "/bible-trivia",
      level: 1,
      cardTitle: "Reinforce What You Just Learned",
      cardSubtitle: "Trivia is a strong next step after devotional day 3.",
      cardEyebrow: "Day 3",
      cardTheme: "gold",
      recommendationKey: `louis-journey-day3-trivia:${primaryDevotional.id}:${primaryDevotional.dayNumber}`,
      category: "trivia",
      journeyType: "day3_trivia",
    };
  }

  if (hasTriedTrivia && !hasTriedScrambled && primaryDevotional.dayNumber >= 3) {
    return {
      greeting: "Let's lock it in one more way.",
      contextLine: `You already reinforced ${primaryDevotional.title} with trivia.`,
      recommendationLine:
        "Now hit Scrambled and make yourself remember it from another angle. That's how this starts sticking for real.",
      primaryButtonText: "Open Scrambled",
      primaryButtonHref: "/bible-study-games",
      level: 1,
      cardTitle: "Follow Trivia With Scrambled",
      cardSubtitle: "Use another quick game to help it stick.",
      cardEyebrow: "Reinforcement",
      cardTheme: "gold",
      recommendationKey: `louis-journey-scrambled:${primaryDevotional.id}:${primaryDevotional.dayNumber}`,
      category: "general",
      journeyType: "scrambled_expansion",
    };
  }

  if (
    normalizeOnboardingGoal(goal) === "understand_bible_better" &&
    primaryDevotional.dayNumber >= 1 &&
    !hasTriedNotes
  ) {
    return {
      greeting: "Let's take it one layer deeper.",
      contextLine: `You said you want to understand the Bible better, and ${primaryDevotional.title} is already moving.`,
      recommendationLine:
        "Spend a little time in the Bible reader or study side of the app today. Read the chapter behind what you just learned and let the notes and context help it click.",
      primaryButtonText: "Open the Bible",
      primaryButtonHref: "/reading",
      level: 1,
      cardTitle: "Read The Chapter Behind It",
      cardSubtitle: "Use the Bible reader and notes to deepen understanding.",
      cardEyebrow: "Understanding",
      cardTheme: "blue",
      recommendationKey: `louis-journey-reader:${primaryDevotional.id}:${primaryDevotional.dayNumber}`,
      category: "bible",
      journeyType: "reader_expansion",
    };
  }

  if (
    ((normalizeOnboardingGoal(goal) === "study_with_buddies" && currentStreak >= 3) ||
      currentStreak >= 7 ||
      stage === "expanding_features") &&
    !hasTriedGroup
  ) {
    return {
      greeting: "You've got a real base now.",
      contextLine:
        normalizeOnboardingGoal(goal) === "study_with_buddies" && currentStreak < 7
          ? "You said you wanted to study with other Bible Buddies, and you've got enough momentum now to add community."
          : "Seven days in a row is not random anymore. That is consistency.",
      recommendationLine:
        "You do not have to do this alone. Check out the Bible Study Group and see the current weekly series and daily discussion flow.",
      primaryButtonText: "Show me the group",
      primaryButtonHref: "/study-groups",
      level: 1,
      cardTitle: "Try The Bible Study Group",
      cardSubtitle: "This is the right time to add community to your rhythm.",
      cardEyebrow: "Day 7",
      cardTheme: "green",
      recommendationKey: "louis-journey-day7-group",
      category: "group",
      journeyType: "day7_group",
    };
  }

  if (normalizeOnboardingGoal(goal) === "understand_bible_better" && !hasTriedNotes) {
    return {
      greeting: "Let's help the Word stick more clearly.",
      contextLine: "You said you want to understand the Bible better.",
      recommendationLine:
        "Spend a little time with the study notes, people, places, and keyword side of Bible Buddy. That is where understanding really starts opening up.",
      primaryButtonText: "Open study tools",
      primaryButtonHref: "/guided-studies",
      level: 2,
      cardTitle: "Go Deeper Into Understanding",
      cardSubtitle: "Notes and context are the next step for clarity.",
      cardEyebrow: "Next Step",
      cardTheme: "purple",
      recommendationKey: "louis-journey-notes-expansion",
      category: "general",
      journeyType: "notes_expansion",
    };
  }

  if (currentStreak >= 5 && !hasTriedTv) {
    return {
      greeting: "You might want an easier learning lane today.",
      contextLine: "Bible Buddy TV is good when you want to stay in the app but change the pace a little.",
      recommendationLine:
        "Try a sermon, documentary, or Bible show in Bible Buddy TV and let it reinforce what you're already learning.",
      primaryButtonText: "Open Bible Buddy TV",
      primaryButtonHref: "/biblebuddy-tv",
      level: 2,
      cardTitle: "Try Bible Buddy TV",
      cardSubtitle: "A good secondary lane once the habit is forming.",
      cardEyebrow: "Expansion",
      cardTheme: "blue",
      recommendationKey: "louis-journey-tv-expansion",
      category: "general",
      journeyType: "tv_expansion",
    };
  }

  return null;
}

export function ChatLouis() {
  const { featureToursEnabled } = useFeatureRenderPriority();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPageGuide = useMemo(() => getLouisPageGuide(pathname), [pathname]);
  const louisPageContext = useMemo(
    () => buildLouisPageContext(pathname, searchParams),
    [pathname, searchParams],
  );
  const todayVerse = useMemo(() => getVerseOfTheDay(), []);
  const todayVerseIntro = useMemo(() => getVerseIntro(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [louisUserId, setLouisUserId] = useState<string | null>(null);
  const [louisFeatureTours, setLouisFeatureTours] = useState({ ...DEFAULT_FEATURE_TOURS });
  const [louisRecommendation, setLouisRecommendation] = useState<LouisJourneyRecommendation | null>(null);
  const [hasUnseenRecommendation, setHasUnseenRecommendation] = useState(false);
  const [hasUnseenDailyGreeting, setHasUnseenDailyGreeting] = useState(false);
  const [hasUnseenSecondRecommendation, setHasUnseenSecondRecommendation] = useState(false);
  const [lastMasterActionSummary, setLastMasterActionSummary] = useState<LouisLastActionSummary | null>(null);
  const [habitNudge, setHabitNudge] = useState<LouisHabitNudge | null>(null);
  const [primaryDailyActionTarget, setPrimaryDailyActionTarget] = useState<LouisDailyActionTarget | null>(null);
  const [secondaryDailyActionTarget, setSecondaryDailyActionTarget] = useState<LouisDailyActionTarget | null>(null);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [onboardingGoal, setOnboardingGoal] = useState<string | null>(null);
  const [bibleExperienceLevel, setBibleExperienceLevel] = useState<string | null>(null);
  const [louisJourneyStage, setLouisJourneyStage] = useState<LouisJourneyStage>("new_user");
  const [primaryDevotional, setPrimaryDevotional] = useState<LouisPrimaryDevotional | null>(null);
  const [conversationMemory, setConversationMemory] = useState<LouisConversationMemory>({
    summary: null,
    topic: null,
    resolved: true,
  });
  const [louisFeatureRollout, setLouisFeatureRollout] = useState<LouisFeatureRolloutState>({
    ...DEFAULT_LOUIS_FEATURE_ROLLOUT,
  });
  const [newUserChallengeStep, setNewUserChallengeStep] = useState<LouisNewUserChallengeStep>("none");
  const [dailyFlowType, setDailyFlowType] = useState<LouisDailyFlowType | "second_layer">("none");
  const [selectedDevotionalForChallenge, setSelectedDevotionalForChallenge] = useState<{
    id: string;
    title: string;
    totalDays: number;
  } | null>(null);
  const [userProfileImageUrl, setUserProfileImageUrl] = useState<string | null>(null);
  const [hasLouisHistory, setHasLouisHistory] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [pendingMomentReplies, setPendingMomentReplies] = useState<QuickReply[]>([]);
  const [louisInputPrompt, setLouisInputPrompt] = useState<LouisInputPromptState>(DEFAULT_LOUIS_INPUT_PROMPT);
  const [pendingInboxMessageIds, setPendingInboxMessageIds] = useState<string[]>([]);
  const [pendingRouteHandoff, setPendingRouteHandoff] = useState(false);
  const [isDashboardVerseModalOpen, setIsDashboardVerseModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 1280, height: 800 });
  
  // Dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const showLouisGuideModal = false;
  const louisGuideView: "intro" | "tour" | "recommendation" = "intro";
  const showChatTourModal = false;
  const isSavingChatTour = false;
  const setLouisGuideView = (_value: "intro" | "tour" | "recommendation") => {};
  const setShowChatTourModal = (_value: boolean) => {};
  const userInitial = useMemo(() => {
    const lastUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content?.trim();
    if (lastUserMessage) return lastUserMessage.charAt(0).toUpperCase();
    const trimmed = input.trim();
    if (trimmed) return trimmed.charAt(0).toUpperCase();
    return "Y";
  }, [input, messages]);

  // Format voice text with paragraph breaks
  function formatVoiceText(text: string, prevText: string): string {
    // Clean up the text
    let formatted = text.trim();
    
    // Add double line break after periods, exclamation marks, or question marks
    // This creates natural paragraph breaks
    formatted = formatted.replace(/([.!?])\s+/g, "$1\n\n");
    
    // Combine with previous text
    if (prevText.trim()) {
      // Add a space if previous text doesn't end with newline
      const separator = prevText.trimEnd().endsWith("\n") ? "" : " ";
      return prevText + separator + formatted;
    }
    
    return formatted;
  }

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncViewport = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser doesn't support speech recognition - silently fail
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening until stopped
    recognition.interimResults = true; // Show interim results as user speaks
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let fullTranscript = "";
      
      // With continuous=true, collect ALL results from the beginning
      // The results array contains all results accumulated so far
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        fullTranscript += transcript;
      }
      
      // Update input with all accumulated text
      if (fullTranscript.trim()) {
        setInput(() => {
          // Format the full accumulated transcript
          return formatVoiceText(fullTranscript.trim(), "");
        });
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // Handle errors silently
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // With continuous=true, onend fires when recognition stops
      // Only stop if user explicitly stopped (not if recognition ended automatically)
      if (isListening) {
        // Restart if still listening (handles automatic stops in continuous mode)
        try {
          recognition.start();
        } catch (err) {
          // Silently handle restart errors (might already be starting)
          setIsListening(false);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  // Initialize audio visualization
  useEffect(() => {
    if (typeof window === "undefined") return;

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      // AudioContext not available - silently fail
      return;
    }

    return () => {
      // Cleanup on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      analyserRef.current = null;
    };
  }, []);

  // Handle audio visualization
  useEffect(() => {
    if (!isListening) {
      // Stop visualization
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setAudioLevels([]);
      return;
    }

    // Start audio visualization
    async function startVisualization() {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 32; // Small for performance
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        // Animation loop
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        function animate() {
          if (!analyserRef.current || !isListening) {
            return;
          }

          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Extract 5 bars from the frequency data
          const barCount = 5;
          const step = Math.floor(dataArray.length / barCount);
          const levels: number[] = [];
          
          for (let i = 0; i < barCount; i++) {
            const index = i * step;
            levels.push(dataArray[index] / 255); // Normalize to 0-1
          }
          
          setAudioLevels(levels);
          animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();
      } catch (err) {
        // Silently fail if audio access denied or unavailable
        console.error("Audio visualization error:", err);
      }
    }

    startVisualization();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setAudioLevels([]);
    };
  }, [isListening]);

  // Handle listening state changes
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        // Already started or other error - silently handle
        setIsListening(false);
      }
    } else {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Clean up when chat closes
  useEffect(() => {
    if (!isOpen && isListening) {
      setIsListening(false);
    }
  }, [isOpen, isListening]);

  useEffect(() => {
    setIsOpen(false);
    setQuickReplies([]);
    clearLouisInputPrompt();
  }, [pathname]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  useEffect(() => {
    if (!louisUserId || typeof window === "undefined") return;
    window.localStorage.setItem(getChatStorageKey(louisUserId), JSON.stringify(messages.slice(-40)));

    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
    if (!latestUserMessage) return;

    window.localStorage.setItem(
      getMemoryStorageKey(louisUserId),
      JSON.stringify({
        lastUserMessage: latestUserMessage.content,
        lastUserAt: new Date().toISOString(),
      }),
    );
  }, [messages, louisUserId]);

  useEffect(() => {
    let cancelled = false;

    async function loadLouisContext() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        setLouisUserId(null);
        setLouisFeatureTours({ ...DEFAULT_FEATURE_TOURS });
        setLouisRecommendation(null);
        setLastMasterActionSummary(null);
        setHabitNudge(null);
        setCurrentStreak(0);
        setOnboardingGoal(null);
        setBibleExperienceLevel(null);
        setUserFirstName(null);
        setLouisJourneyStage("new_user");
        setPrimaryDevotional(null);
        setConversationMemory({ summary: null, topic: null, resolved: true });
        setLouisFeatureRollout({ ...DEFAULT_LOUIS_FEATURE_ROLLOUT });
        setUserProfileImageUrl(null);
        setPendingInboxMessageIds([]);
        setHasUnseenRecommendation(false);
        return;
      }

      setLouisUserId(user.id);

      const authFirstName =
        typeof user.user_metadata?.first_name === "string"
          ? user.user_metadata.first_name.trim()
          : typeof user.user_metadata?.name === "string"
            ? user.user_metadata.name.trim().split(/\s+/)[0] || null
            : null;

      if (typeof window !== "undefined") {
        try {
          const storedMessages = window.localStorage.getItem(getChatStorageKey(user.id));
          const parsedMessages = storedMessages ? (JSON.parse(storedMessages) as Message[]) : [];
          setMessages(parsedMessages);
          setHasLouisHistory(parsedMessages.length > 0);
        } catch {
          setMessages([]);
          setHasLouisHistory(false);
        }

        setOnboardingGoal(normalizeOnboardingGoal(window.localStorage.getItem(getGoalStorageKey())));
        try {
          const storedRollout = window.localStorage.getItem(getRolloutStorageKey(user.id));
          setLouisFeatureRollout(normalizeFeatureRollout(storedRollout ? JSON.parse(storedRollout) : null));
        } catch {
          setLouisFeatureRollout({ ...DEFAULT_LOUIS_FEATURE_ROLLOUT });
        }
      }

      const [{ data: profileStats, error: profileError }, streakData] = await Promise.all([
        supabase
          .from("profile_stats")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
        syncCurrentStreakToProfileStats(user.id),
      ]);

      if (cancelled) return;

      if (profileError) {
        console.error("[LOUIS] Error loading profile context:", profileError);
        setLouisFeatureTours({ ...DEFAULT_FEATURE_TOURS });
        setCurrentStreak(streakData.currentStreak ?? 0);
        setLastActiveDate(null);
        setUserProfileImageUrl(null);
        setBibleExperienceLevel(null);
        setIsPaidUser(false);
        setUserFirstName(authFirstName);
      } else {
        setLouisFeatureTours(normalizeFeatureTours(profileStats?.feature_tours));
        setCurrentStreak(streakData.currentStreak);
        setLastActiveDate(profileStats?.last_active_date ?? null);
        setUserProfileImageUrl(profileStats?.profile_image_url ?? null);
        setBibleExperienceLevel(profileStats?.bible_experience_level ?? null);
        setIsPaidUser(profileStats?.is_paid === true);
        setUserFirstName(
          typeof profileStats?.display_name === "string" && profileStats.display_name.trim()
            ? profileStats.display_name.trim().split(/\s+/)[0]
            : typeof profileStats?.username === "string" && profileStats.username.trim()
              ? profileStats.username.trim().split(/\s+/)[0]
              : authFirstName,
        );
        setConversationMemory({
          summary: profileStats?.louis_last_conversation_summary ?? null,
          topic: profileStats?.louis_last_conversation_topic ?? null,
          resolved: profileStats?.louis_last_conversation_resolved ?? true,
        });
        setOnboardingGoal(
          normalizeOnboardingGoal(profileStats?.onboarding_goal) ??
            (typeof window !== "undefined"
              ? normalizeOnboardingGoal(window.localStorage.getItem(getGoalStorageKey()))
              : null),
        );
        if (profileStats?.louis_feature_rollout) {
          const nextRollout = normalizeFeatureRollout(profileStats.louis_feature_rollout);
          setLouisFeatureRollout(nextRollout);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(getRolloutStorageKey(user.id), JSON.stringify(nextRollout));
          }
        }
      }

      const { data: louisInboxRows, error: louisInboxError } = await supabase
        .from("louis_inbox_messages")
        .select("id, title, content, action_label, action_href, created_at, consumed_at, kind")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(25);

      if (!cancelled) {
        if (louisInboxError) {
          console.warn("[LOUIS] Could not load Louis inbox messages:", louisInboxError.message);
          setPendingInboxMessageIds([]);
        } else {
          const inboxRows = (louisInboxRows ?? []) as LouisInboxMessageRow[];
          setMessages((prev) => {
            const merged = mergeServerMessages(prev, inboxRows).slice(-60);
            setHasLouisHistory(merged.length > 0);
            return merged;
          });
          setPendingInboxMessageIds(
            inboxRows.filter((row) => !row.consumed_at).map((row) => row.id),
          );
        }
      }

      const shouldLoadRecommendation = pathname === "/dashboard";
      if (!shouldLoadRecommendation) {
        setLouisRecommendation(null);
        setLastMasterActionSummary(null);
        setHabitNudge(null);
        setPrimaryDevotional(null);
        setPrimaryDailyActionTarget(null);
        setSecondaryDailyActionTarget(null);
        setHasUnseenRecommendation(false);
        setHasUnseenDailyGreeting(false);
        setHasUnseenSecondRecommendation(false);
        return;
      }

      const { data: actionRows } = await supabase
        .from("master_actions")
        .select("action_type, action_label, created_at")
        .eq("user_id", user.id)
        .not("action_type", "in", '("user_login","dashboard_viewed","bible_buddy_tv_viewed","bible_buddy_tv_title_opened")')
        .order("created_at", { ascending: false })
        .limit(120);

      if (!cancelled) {
        const lastMeaningfulAction =
          actionRows?.find((row) => Boolean(row?.action_type && row?.action_label)) ??
          actionRows?.[0] ??
          null;
        setLastMasterActionSummary(summarizeLastMasterAction(lastMeaningfulAction));
      }

      const { data: dashboardCardRows } = await supabase
        .from("master_actions")
        .select("action_label")
        .eq("user_id", user.id)
        .eq("action_type", "dashboard_card_opened")
        .limit(50);

      const [
        { data: devotionalProgressRows },
        { data: currentPollRow },
        { data: currentSeriesRow },
      ] = await Promise.all([
        supabase
          .from("devotional_progress")
          .select("devotional_id, day_number, completed_at")
          .eq("user_id", user.id)
          .eq("is_completed", true)
          .order("completed_at", { ascending: false })
          .limit(20),
        supabase
          .from("weekly_group_polls")
          .select("id, question, subject_title, group_id")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("group_series")
          .select("id, title")
          .eq("is_current", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

      const { data: currentPollVoteRows } =
        currentPollRow?.id
          ? await supabase
              .from("weekly_group_poll_votes")
              .select("id")
              .eq("poll_id", currentPollRow.id)
              .eq("user_id", user.id)
              .limit(1)
          : { data: [] as Array<{ id: string }> };

      let nextPrimaryDevotional: LouisPrimaryDevotional | null = null;
      const devotionalIds = Array.from(
        new Set((devotionalProgressRows ?? []).map((row) => row.devotional_id).filter(Boolean)),
      );

      if (devotionalIds.length > 0) {
        const { data: devotionalRows } = await supabase
          .from("devotionals")
          .select("id, title, total_days")
          .in("id", devotionalIds);

        const devotionalMap = new Map(
          (devotionalRows ?? []).map((row) => [row.id, row]),
        );
        const latestProgress = devotionalProgressRows?.[0];
        if (latestProgress) {
          const matchingDevotional = devotionalMap.get(latestProgress.devotional_id);
          if (matchingDevotional) {
            nextPrimaryDevotional = {
              id: matchingDevotional.id,
              title: matchingDevotional.title,
              dayNumber: latestProgress.day_number,
              totalDays: matchingDevotional.total_days ?? latestProgress.day_number,
            };
          }
        }
      }

      if (!cancelled) {
        setPrimaryDevotional(nextPrimaryDevotional);
      }

      let suppressLevel1 = false;
      if (profileStats?.level_1_skipped_date) {
        const skippedDate = new Date(profileStats.level_1_skipped_date);
        const diffDays = Math.floor((Date.now() - skippedDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 3) suppressLevel1 = true;
      }

      const actionTypeSet = new Set((actionRows ?? []).map((row) => row.action_type ?? ""));
      const featureFamiliesUsed = new Set<string>();
      if (nextPrimaryDevotional) featureFamiliesUsed.add("devotional");
      if (actionTypeSet.has("chapter_completed") || actionTypeSet.has("reading_plan_chapter_completed")) featureFamiliesUsed.add("bible");
      if (actionTypeSet.has("trivia_question_answered") || actionTypeSet.has("trivia_chapter_completed")) featureFamiliesUsed.add("trivia");
      if (actionTypeSet.has("scrambled_word_answered") || actionTypeSet.has("scrambled_chapter_completed")) featureFamiliesUsed.add("scrambled");
      if (actionTypeSet.has("bible_buddy_tv_video_started") || actionTypeSet.has("bible_buddy_tv_title_opened")) featureFamiliesUsed.add("tv");
      if (
        actionTypeSet.has("study_group_feed_viewed") ||
        actionTypeSet.has("study_group_article_opened") ||
        actionTypeSet.has("study_group_bible_study_card_opened")
      ) {
        featureFamiliesUsed.add("group");
      }
      if (
        actionTypeSet.has("person_learned") ||
        actionTypeSet.has("place_discovered") ||
        actionTypeSet.has("keyword_mastered") ||
        actionTypeSet.has("note_created")
      ) {
        featureFamiliesUsed.add("notes");
      }

      const nextJourneyStage =
        (profileStats?.louis_journey_stage as LouisJourneyStage | null) ??
        deriveLouisJourneyStage({
          devotionalDayCount: devotionalProgressRows?.length ?? 0,
          currentStreak: profileStats?.current_streak ?? 0,
          hasGroupActivity: featureFamiliesUsed.has("group"),
          featureFamiliesUsed: featureFamiliesUsed.size,
        });

      if (!cancelled) {
        setLouisJourneyStage(nextJourneyStage);
      }

      const nextHabitNudge = buildHabitNudgeFromCards(
        (dashboardCardRows ?? [])
          .map((row) => row.action_label)
          .filter((label): label is string => typeof label === "string" && label.length > 0),
      );

      const dashboardCardsOpened = (dashboardCardRows ?? [])
        .map((row) => row.action_label)
        .filter((label): label is string => typeof label === "string" && label.length > 0);

      const { strongestPreference, leastUsedPreference } = getStrongestAndWeakestPreferences(
        (actionRows ?? []) as LouisActionRow[],
      );

      const behaviorTargets = buildBehaviorRecommendations({
        currentStreak: streakData.currentStreak ?? 0,
        goal:
          normalizeOnboardingGoal(profileStats?.onboarding_goal) ??
          normalizeOnboardingGoal(
            typeof window !== "undefined" ? window.localStorage.getItem(getGoalStorageKey()) : null,
          ),
        primaryDevotional: nextPrimaryDevotional,
        lastMasterActionSummary: summarizeLastMasterAction(
          actionRows?.find((row) => Boolean(row?.action_type && row?.action_label)) ?? actionRows?.[0] ?? null,
        ),
        actionRows: (actionRows ?? []) as LouisActionRow[],
        dashboardCardsOpened,
        profileComplete: Boolean(profileStats?.profile_image_url && profileStats?.bio?.trim()),
        missingProfilePhoto: !Boolean(profileStats?.profile_image_url),
        missingProfileBio: !Boolean(profileStats?.bio?.trim()),
        currentPollQuestion: currentPollRow?.subject_title || currentPollRow?.question || null,
        hasAnsweredCurrentPoll: Boolean(currentPollVoteRows && currentPollVoteRows.length > 0),
        currentSeriesTitle: currentSeriesRow?.title ?? null,
        hasStartedCurrentSeries: actionTypeSet.has("series_week_started") || actionTypeSet.has("study_group_bible_study_card_opened"),
        strongestPreference,
        leastUsedPreference,
        lastTvLabel:
          actionRows?.find(
            (row) => row.action_type === "bible_buddy_tv_video_started" || row.action_type === "bible_buddy_tv_title_opened",
          )?.action_label ?? null,
      });

      const journeyRecommendation =
        buildLouisJourneyRecommendation({
          currentStreak: profileStats?.current_streak ?? 0,
          goal:
            normalizeOnboardingGoal(profileStats?.onboarding_goal) ??
            normalizeOnboardingGoal(
              typeof window !== "undefined" ? window.localStorage.getItem(getGoalStorageKey()) : null,
            ),
          primaryDevotional: nextPrimaryDevotional,
          stage: nextJourneyStage,
          hasTriedTrivia: featureFamiliesUsed.has("trivia"),
          hasTriedScrambled: featureFamiliesUsed.has("scrambled"),
          hasTriedGroup: featureFamiliesUsed.has("group"),
          hasTriedTv: featureFamiliesUsed.has("tv"),
          hasTriedNotes: featureFamiliesUsed.has("notes"),
        }) ?? (await getDailyRecommendation(user.id, suppressLevel1));

      if (!cancelled) {
        setHabitNudge(nextHabitNudge);
        setPrimaryDailyActionTarget(behaviorTargets.primary);
        setSecondaryDailyActionTarget(behaviorTargets.secondary);
      }

      if (!cancelled && profileStats) {
        const desiredRollout = {
          ...normalizeFeatureRollout(profileStats?.louis_feature_rollout),
          dashboard_intro_seen:
            normalizeFeatureRollout(profileStats?.louis_feature_rollout).dashboard_intro_seen ||
            louisFeatureTours.dashboard === true,
          devotionals_intro_seen:
            normalizeFeatureRollout(profileStats?.louis_feature_rollout).devotionals_intro_seen ||
            Boolean(nextPrimaryDevotional),
          trivia_intro_seen:
            normalizeFeatureRollout(profileStats?.louis_feature_rollout).trivia_intro_seen ||
            featureFamiliesUsed.has("trivia"),
          scrambled_intro_seen:
            normalizeFeatureRollout(profileStats?.louis_feature_rollout).scrambled_intro_seen ||
            featureFamiliesUsed.has("scrambled"),
          group_intro_seen:
            normalizeFeatureRollout(profileStats?.louis_feature_rollout).group_intro_seen ||
            featureFamiliesUsed.has("group"),
          tv_intro_seen:
            normalizeFeatureRollout(profileStats?.louis_feature_rollout).tv_intro_seen ||
            featureFamiliesUsed.has("tv"),
          notes_intro_seen:
            normalizeFeatureRollout(profileStats?.louis_feature_rollout).notes_intro_seen ||
            featureFamiliesUsed.has("notes"),
        };
        setLouisFeatureRollout(desiredRollout);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(getRolloutStorageKey(user.id), JSON.stringify(desiredRollout));
        }
        void supabase
          .from("profile_stats")
          .update({
            louis_journey_stage: nextJourneyStage,
            louis_primary_devotional_id: nextPrimaryDevotional?.id ?? null,
            louis_primary_devotional_day: nextPrimaryDevotional?.dayNumber ?? 0,
            louis_last_feature_nudge: nextHabitNudge?.key ?? null,
            louis_feature_rollout: desiredRollout,
          })
          .eq("user_id", user.id)
          .then(({ error }) => {
            if (error) {
              console.warn("[LOUIS] Journey profile update skipped:", error.message);
            }
          });
      }
      if (cancelled) return;

      setLouisRecommendation(journeyRecommendation);
      setHasUnseenRecommendation(false);
      setHasUnseenDailyGreeting(!hasSeenDailyGreeting(user.id));
      const firstShownAt = getDailyGreetingShownAt(user.id);
      const secondReady =
        Boolean(firstShownAt) &&
        !hasSeenSecondRecommendation(user.id) &&
        Boolean(behaviorTargets.secondary) &&
        Date.now() - new Date(firstShownAt as string).getTime() >= 6 * 60 * 60 * 1000;
      setHasUnseenSecondRecommendation(secondReady);
    }

    void loadLouisContext();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleVerseModalState(event: Event) {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail;
      setIsDashboardVerseModalOpen(detail?.open === true);
    }

    window.addEventListener(DASHBOARD_VERSE_MODAL_EVENT, handleVerseModalState as EventListener);
    return () => window.removeEventListener(DASHBOARD_VERSE_MODAL_EVENT, handleVerseModalState as EventListener);
  }, []);

  useEffect(() => {
    if (!louisUserId || typeof window === "undefined") return;
    setNewUserChallengeStep(
      normalizeNewUserChallengeStep(window.localStorage.getItem(getNewUserChallengeStorageKey(louisUserId))),
    );
  }, [louisUserId, pathname]);

  useEffect(() => {
    let cancelled = false;

    async function loadSelectedDevotionalForChallenge() {
      const parts = pathname.split("/").filter(Boolean);
      if (parts[0] !== "devotionals" || !parts[1]) {
        if (!cancelled) setSelectedDevotionalForChallenge(null);
        return;
      }

      const devotionalId = parts[1];
      const { data, error } = await supabase
        .from("devotionals")
        .select("id, title, total_days")
        .eq("id", devotionalId)
        .maybeSingle();

      if (cancelled) return;

      if (error || !data) {
        setSelectedDevotionalForChallenge(null);
        return;
      }

      setSelectedDevotionalForChallenge({
        id: data.id,
        title: data.title,
        totalDays: data.total_days ?? 21,
      });
    }

    void loadSelectedDevotionalForChallenge();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const hasPendingPageGuide = Boolean(
    featureToursEnabled &&
      currentPageGuide &&
      louisFeatureTours[currentPageGuide.featureKey] !== true,
  );

  const hasPendingDevotionalChallengePrompt =
    pathname === "/devotionals" &&
    newUserChallengeStep === "choose_devotional" &&
    !primaryDevotional;

  const hasPendingDevotionalStartPrompt = Boolean(
    pathname.startsWith("/devotionals/") &&
      selectedDevotionalForChallenge &&
      !primaryDevotional &&
      (newUserChallengeStep === "choose_devotional" || newUserChallengeStep === "choose_start_day"),
  );

  const hasPendingLouisMoment =
    pendingInboxMessageIds.length > 0 ||
    pendingRouteHandoff ||
    hasPendingPageGuide ||
    hasPendingDevotionalChallengePrompt ||
    hasPendingDevotionalStartPrompt ||
    (pathname === "/dashboard" && (hasUnseenDailyGreeting || hasUnseenSecondRecommendation));

  const emptyStatePrompt = louisInputPrompt.mode === "today_tomorrow"
    ? "Type today or tomorrow."
    : louisInputPrompt.mode === "yes_no"
      ? "Type yes or no."
      : hasPendingDevotionalStartPrompt
    ? "Type today or tomorrow."
    : hasPendingDevotionalChallengePrompt || (pathname === "/dashboard" && (hasUnseenDailyGreeting || hasUnseenSecondRecommendation))
      ? "Type yes or no."
      : "Ask me a question about your Bible reading.";

  const inputPlaceholder = louisInputPrompt.mode === "today_tomorrow"
    ? "Type today or tomorrow..."
    : louisInputPrompt.mode === "yes_no"
      ? "Type yes or no..."
      : hasPendingDevotionalStartPrompt
    ? "Type today or tomorrow..."
    : hasPendingDevotionalChallengePrompt || (pathname === "/dashboard" && (hasUnseenDailyGreeting || hasUnseenSecondRecommendation))
      ? "Type yes or no..."
      : "Talk to Louis...";

  function formatInboxMessage(row: LouisInboxMessageRow) {
    const actionLine =
      row.action_label && row.action_href ? `\n\n👉 ${row.action_label}: ${row.action_href}` : "";
    const titleLine = row.title ? `${row.title}\n\n` : "";
    return `${titleLine}${row.content}${actionLine}`.trim();
  }

  function mergeServerMessages(existingMessages: Message[], inboxRows: LouisInboxMessageRow[]) {
    const existingIds = new Set(
      existingMessages.map((message) => message.serverMessageId).filter((value): value is string => Boolean(value)),
    );

    const nextMessages = [...existingMessages];
    for (const row of inboxRows) {
      if (existingIds.has(row.id)) continue;
      nextMessages.push({
        role: "assistant",
        content: formatInboxMessage(row),
        serverMessageId: row.id,
      });
    }

    return nextMessages;
  }

  function appendAssistantMessage(content: string) {
    setMessages((prev) => [...prev, { role: "assistant", content }]);
    void logLouisAction(ACTION_TYPE.louis_ai_message_sent, toLouisLogLabel(content));
  }

  function appendUserMessage(content: string) {
    setMessages((prev) => [...prev, { role: "user", content }]);
    void logLouisAction(ACTION_TYPE.louis_user_message_sent, toLouisLogLabel(content));
  }

  function toLouisLogLabel(content: string, maxLength = 180) {
    return content.replace(/\s+/g, " ").trim().slice(0, maxLength);
  }

  async function logLouisAction(actionType: typeof ACTION_TYPE[keyof typeof ACTION_TYPE], label?: string | null) {
    if (!louisUserId) return;
    try {
      await logActionToMasterActions(louisUserId, actionType, label ?? null);
    } catch (error) {
      console.warn("[LOUIS] Could not log action:", actionType, error);
    }
  }

  function isDailyLouisMessage(content: string) {
    return (
      content.includes("Would you like to start a devotional?") ||
      content.includes("Today is your first day") ||
      content.includes("Today is a new start") ||
      content.includes("You have not been here in") ||
      (content.includes("You are on a ") && content.includes(" day streak")) ||
      content.includes("Ready for the next day?") ||
      content.includes("Do you want to continue?") ||
      content.includes("Want to play again?")
    );
  }

  function removeLatestDailyLouisMessage() {
    setMessages((prev) => {
      const next = [...prev];
      for (let index = next.length - 1; index >= 0; index -= 1) {
        const message = next[index];
        if (message.role === "assistant" && isDailyLouisMessage(message.content)) {
          next.splice(index, 1);
          break;
        }
      }
      return next;
    });
  }

  function getUserMessageCount() {
    return messages.filter((message) => message.role === "user").length;
  }

  function clearLouisInputPrompt() {
    setLouisInputPrompt(DEFAULT_LOUIS_INPUT_PROMPT);
  }

  function setTypedReplyPrompt(mode: LouisPromptMode, intent: LouisPromptIntent, hint: string | null) {
    setLouisInputPrompt({
      mode,
      intent,
      hint,
      hinted: false,
      userMessageCount: getUserMessageCount(),
    });
  }

  function toggleListening() {
    setIsListening((prev) => !prev);
  }

  async function markCurrentGuideSeen() {
    if (!louisUserId || !currentPageGuide) return;

    const mergedFeatureTours = {
      ...louisFeatureTours,
      [currentPageGuide.featureKey]: true,
    };

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
      })
      .eq("user_id", louisUserId);

    if (updateError) {
      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: louisUserId,
            feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
          },
          { onConflict: "user_id" },
        );

      if (upsertError) {
        console.error("[LOUIS] Error saving page guide state:", upsertError);
        return;
      }
    }

    setLouisFeatureTours(mergedFeatureTours);
  }

  async function markChatWidgetSeen() {
    if (!louisUserId) return;

    const mergedFeatureTours = {
      ...louisFeatureTours,
      chat_widget: true,
    };

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
      })
      .eq("user_id", louisUserId);

    if (updateError) {
      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: louisUserId,
            feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
          },
          { onConflict: "user_id" },
        );

      if (upsertError) {
        console.error("[LOUIS] Error saving chat widget state:", upsertError);
        return;
      }
    }

    setLouisFeatureTours(mergedFeatureTours);
  }

  function markRecommendationSeenLocal() {
    if (!louisUserId) return;
    rememberRecommendationSeen(louisUserId);
    setHasUnseenRecommendation(false);
  }

  function markDailyGreetingSeenLocal() {
    if (!louisUserId) return;
    rememberDailyGreetingSeen(louisUserId);
    rememberDailyGreetingShownAt(louisUserId);
    setHasUnseenDailyGreeting(false);
    persistLouisProfile({ louis_last_check_in_at: new Date().toISOString() });
  }

  function markSecondRecommendationSeenLocal() {
    if (!louisUserId) return;
    rememberSecondRecommendationSeen(louisUserId);
    setHasUnseenSecondRecommendation(false);
  }

  function rememberGuidePromptShown() {
    if (!louisUserId || !currentPageGuide || typeof window === "undefined") return;
    window.localStorage.setItem(getGuidePromptKey(louisUserId, currentPageGuide.id), "1");
  }

  function persistLouisProfile(values: Record<string, unknown>) {
    if (!louisUserId) return;
    void supabase
      .from("profile_stats")
      .update(values)
      .eq("user_id", louisUserId)
      .then(({ error }) => {
        if (error) {
          console.warn("[LOUIS] Profile update skipped:", error.message);
        }
      });
  }

  function markInboxMessagesSeen() {
    if (!louisUserId || pendingInboxMessageIds.length === 0) return;

    const ids = [...pendingInboxMessageIds];
    setPendingInboxMessageIds([]);
    void supabase
      .from("louis_inbox_messages")
      .update({ consumed_at: new Date().toISOString() })
      .eq("user_id", louisUserId)
      .in("id", ids)
      .then(({ error }) => {
        if (error) {
          console.warn("[LOUIS] Could not mark inbox messages as seen:", error.message);
        }
      });
  }

  function persistNewUserChallengeStep(step: LouisNewUserChallengeStep) {
    setNewUserChallengeStep(step);
    if (!louisUserId || typeof window === "undefined") return;
    window.localStorage.setItem(getNewUserChallengeStorageKey(louisUserId), step);
  }

  function markRolloutSeenLocal(key: keyof LouisFeatureRolloutState) {
    if (!louisUserId || typeof window === "undefined") return;
    const nextRollout = {
      ...louisFeatureRollout,
      [key]: true,
    };
    setLouisFeatureRollout(nextRollout);
    window.localStorage.setItem(getRolloutStorageKey(louisUserId), JSON.stringify(nextRollout));
    persistLouisProfile({ louis_feature_rollout: nextRollout });
  }

  function seedQuickReplies(nextReplies: QuickReply[]) {
    setQuickReplies(nextReplies);
    if (nextReplies.length === 0) {
      clearLouisInputPrompt();
      return;
    }

    const replyIds = nextReplies.map((reply) => reply.id);
    const labels = nextReplies.map((reply) => reply.label.toLowerCase());
    const hasTodayTomorrow = labels.some((label) => label.includes("today")) && labels.some((label) => label.includes("tomorrow"));
    const hasVerseExplain = replyIds.some((id) => id === "verse-explain");
    const hasGuidePrompt = replyIds.some((id) => id.startsWith("guide-"));

    if (hasTodayTomorrow) {
      setTypedReplyPrompt(
        "today_tomorrow",
        "none",
        "You can just type today or tomorrow and I'll help you from there.",
      );
      return;
    }

    if (hasVerseExplain) {
      setTypedReplyPrompt(
        "yes_no",
        "verse_explain",
        "You can talk to me right here. If you want me to go deeper on the verse, just type yes or no.",
      );
      return;
    }

    if (hasGuidePrompt) {
      setTypedReplyPrompt(
        "yes_no",
        "page_guide",
        "If you want me to walk you through this page, just type yes or no.",
      );
      return;
    }

    clearLouisInputPrompt();
  }

  function getGuideQuickReplies(): QuickReply[] {
    return [
      { id: "guide-show", label: "Yes, show me", action: "guide_show" },
      { id: "guide-question", label: "I have a question", action: "guide_question" },
      { id: "guide-later", label: "Not right now", action: "guide_later" },
    ];
  }

  function getDailyActionTarget(momentKind: LouisDailyMomentKind = "first"): LouisDailyActionTarget {
    if (momentKind === "second" && secondaryDailyActionTarget) {
      return secondaryDailyActionTarget;
    }

    if (primaryDailyActionTarget) {
      return primaryDailyActionTarget;
    }

    return buildFallbackTarget(onboardingGoal, currentStreak);
  }

  function buildDailyConversationMessage(momentKind: LouisDailyMomentKind = "first") {
    const name = userFirstName || "there";
    const daysSinceLastActive = (() => {
      if (!lastActiveDate) return null;
      const today = new Date();
      const lastActive = new Date(`${lastActiveDate}T12:00:00`);
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const lastDate = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
      return Math.max(0, Math.round((todayDate.getTime() - lastDate.getTime()) / 86400000));
    })();
    const target = getDailyActionTarget(momentKind);

    if (pathname === "/dashboard" && (!hasLouisHistory || louisJourneyStage === "new_user") && !primaryDevotional) {
      setDailyFlowType("new_user");
      return [
        `Hey ${name} 👋`,
        "Welcome to Bible Buddy",
        "Today is your first day",
        "Let’s start your streak",
        onboardingGoal ? `You said you want to ${formatOnboardingGoal(onboardingGoal)}` : "",
        onboardingGoal ? "The best way to do that is to stay consistent daily" : "",
        "I recommend starting with a devotional",
        "It is a short daily reading",
        "that helps you stay structured and build a habit",
        "Would you like to start a devotional?",
      ].filter(Boolean).join("\n\n");
    }

    if (momentKind === "second") {
      setDailyFlowType("second_layer");
      return [
        `Welcome back again, ${name}.`,
        "You already handled your main step today.",
        getStreakIdentityLine(currentStreak),
        ...target.summaryLines,
        target.whyLine,
        target.question,
      ].join("\n\n");
    }

    if ((daysSinceLastActive ?? 0) >= 3) {
      setDailyFlowType("fell_off");
      return [
        `Welcome back ${name} 👋`,
        `You have not been here in ${daysSinceLastActive} days`,
        "But that is okay",
        "Today is a new start",
        "God gives us a new day",
        "Let’s use this one",
        ...target.summaryLines,
        target.whyLine,
        target.question,
      ].join("\n\n");
    }

    setDailyFlowType("active");
    return [
      `Good to see you ${name} 👋`,
      getDailyStreakMotivation(currentStreak),
      ...target.summaryLines,
      target.whyLine,
      target.question,
    ].join("\n\n");
  }

  async function beginDailyConversation(momentKind: LouisDailyMomentKind = "first") {
    const dailyConversationMessage = buildDailyConversationMessage(momentKind);

    if (momentKind === "first" && hasUnseenDailyGreeting) {
      markDailyGreetingSeenLocal();
    }
    if (momentKind === "second") {
      markSecondRecommendationSeenLocal();
      persistLouisProfile({ louis_last_recommendation_at: new Date().toISOString() });
    } else {
      persistLouisProfile({ louis_last_check_in_at: new Date().toISOString() });
    }

    removeLatestDailyLouisMessage();
    appendAssistantMessage(dailyConversationMessage);
    void logLouisAction(ACTION_TYPE.louis_daily_message_shown, toLouisLogLabel(dailyConversationMessage));
    seedQuickReplies([
      { id: "daily-yes", label: "Yes", action: "daily_yes" },
      { id: "daily-no", label: "No", action: "daily_no" },
    ]);
    setTypedReplyPrompt("yes_no", "none", "You can type yes or no, or tap the buttons.");
  }

  async function beginPageGuideConversation() {
    if (!currentPageGuide) return;

    await markCurrentGuideSeen();
    appendAssistantMessage(
      buildLouisGuideChatMessage(currentPageGuide, {
        firstName: userFirstName,
        isPaidUser,
      }),
    );
    clearLouisInputPrompt();
  }

  async function startPageGuideConversation() {
    if (!currentPageGuide) return;

    await markCurrentGuideSeen();
    appendAssistantMessage(
      buildLouisGuideChatMessage(currentPageGuide, {
        firstName: userFirstName,
        isPaidUser,
      }),
    );
    clearLouisInputPrompt();
  }

  async function shareRecommendationInChat(preface?: string) {
    if (!louisRecommendation) return;

    markRecommendationSeenLocal();
    persistLouisProfile({
      louis_last_recommendation_key: louisRecommendation.recommendationKey,
      louis_last_recommendation_at: new Date().toISOString(),
    });
    if (louisRecommendation.journeyType === "day7_group") {
      markRolloutSeenLocal("group_intro_seen");
    } else if (louisRecommendation.journeyType === "day3_trivia") {
      markRolloutSeenLocal("trivia_intro_seen");
    } else if (louisRecommendation.journeyType === "scrambled_expansion") {
      markRolloutSeenLocal("scrambled_intro_seen");
    } else if (louisRecommendation.journeyType === "tv_expansion") {
      markRolloutSeenLocal("tv_intro_seen");
    } else if (louisRecommendation.journeyType === "reader_expansion") {
      markRolloutSeenLocal("notes_intro_seen");
    } else if (louisRecommendation.journeyType === "notes_expansion") {
      markRolloutSeenLocal("notes_intro_seen");
    }
    appendAssistantMessage(
      `${preface ? `${preface}\n\n` : ""}${louisRecommendation.greeting}\n\n${louisRecommendation.contextLine}\n\nHere's what I think you should do next:\n\n${louisRecommendation.recommendationLine}`,
    );
    seedQuickReplies([
      {
        id: "recommendation-open",
        label: louisRecommendation.primaryButtonText,
        action: "recommendation_open",
      },
      { id: "recommendation-question", label: "Tell me more", action: "recommendation_question" },
      { id: "recommendation-later", label: "Maybe later", action: "recommendation_later" },
    ]);
  }

  async function shareVerseOfTheDayInChat() {
    appendAssistantMessage(
      `${todayVerseIntro}\n\n${todayVerse.reference}\n\n${todayVerse.text}\n\n${todayVerse.subtitle}\n\nDo you want me to explain this verse a little more?`,
    );
    setTypedReplyPrompt(
      "yes_no",
      "verse_explain",
      "You can talk to me. If you want me to explain the verse, just type yes or no.",
    );
  }

  async function shareDailyRecommendationAfterVerse(preface?: string) {
    if (louisRecommendation) {
      await shareRecommendationInChat(
        preface ?? `You're on day ${currentStreak}. Keep that streak alive by doing this next.`,
      );
      return;
    }

    if (lastMasterActionSummary) {
      appendAssistantMessage(
        `${preface ?? `You're on day ${currentStreak}. Keep that streak alive by doing this next.`}\n\n${lastMasterActionSummary.summary}\n\n${lastMasterActionSummary.followUp}`,
      );
      seedQuickReplies(
        [
          lastMasterActionSummary.continueLabel && lastMasterActionSummary.continueHref
            ? { id: "verse-continue-last", label: lastMasterActionSummary.continueLabel, action: "daily_continue" as const }
            : null,
          { id: "verse-rec-fallback", label: "Today's verse again", action: "daily_verse" as const },
          { id: "verse-talk-fallback", label: "Let's talk", action: "daily_talk" as const },
        ].filter(Boolean) as QuickReply[],
      );
      return;
    }

    if (habitNudge) {
      appendAssistantMessage(
        `${preface ?? `You're on day ${currentStreak}. Keep that streak alive by doing this next.`}\n\n${habitNudge.summary}`,
      );
      seedQuickReplies([
        { id: "verse-nudge", label: habitNudge.label, action: "daily_try_missing" as const },
        { id: "verse-talk-fallback", label: "Let's talk", action: "daily_talk" as const },
      ]);
    }
  }

  async function handleQuickReply(reply: QuickReply) {
    setQuickReplies([]);

    if (["daily_good", "daily_okay", "daily_no", "daily_verse", "daily_recommendation", "daily_continue"].includes(reply.action)) {
      const nextMemory = { ...conversationMemory, resolved: true };
      setConversationMemory(nextMemory);
      persistLouisProfile({ louis_last_conversation_resolved: true });
    }

    switch (reply.action) {
      case "daily_yes":
        if (dailyFlowType === "new_user") {
          markRolloutSeenLocal("devotionals_intro_seen");
          appendAssistantMessage("Perfect\n\nI’m sending you to the devotional page now");
          clearLouisInputPrompt();
          setIsOpen(false);
          router.push("/devotionals");
          break;
        }
        if (dailyFlowType === "devotional_start" && selectedDevotionalForChallenge) {
          appendAssistantMessage("Let’s start Day 1");
          clearLouisInputPrompt();
          setIsOpen(false);
          router.push(`/devotionals/${selectedDevotionalForChallenge.id}`);
          break;
        }
        {
          const dailyTarget = getDailyActionTarget(dailyFlowType === "second_layer" ? "second" : "first");
          if (dailyTarget.href) {
          if (dailyTarget.kind !== "devotional") {
            appendAssistantMessage(dailyTarget.yesFollowUp);
          }
          clearLouisInputPrompt();
          setIsOpen(false);
          router.push(dailyTarget.href as string);
          }
        }
        break;
      case "daily_no":
        appendAssistantMessage(
          dailyFlowType === "new_user"
            ? "Alright\n\nFeel free to explore around\n\nIf you want structure or direction\n\njust come back and I will guide you"
            : dailyFlowType === "fell_off"
              ? "All good\n\nIf you want help getting back on track\n\nI am here"
              : dailyFlowType === "second_layer"
                ? "All good\n\nThat can wait for later\n\nI will be here if you want another push."
              : dailyFlowType === "devotional_start"
                ? "No problem\n\nPick another devotional if you want\n\nI will be here"
                : "No problem\n\nCome back when you are ready\n\nI will be here",
        );
        clearLouisInputPrompt();
        break;
      case "daily_verse":
        await shareVerseOfTheDayInChat();
        break;
      case "daily_verse_explain":
        appendAssistantMessage(buildVerseExplanationMessage(todayVerse));
        await shareDailyRecommendationAfterVerse(
          `And look, you're on day ${currentStreak}. Keep that streak alive by doing this today.`,
        );
        break;
      case "daily_verse_skip":
        await shareDailyRecommendationAfterVerse(
          `Alright. You're on day ${currentStreak}. Keep that streak alive by doing this today.`,
        );
        break;
      case "daily_recommendation":
        await shareRecommendationInChat("Here’s what I think would be good for you today.");
        break;
      case "daily_continue":
        if (lastMasterActionSummary?.continueHref) {
          router.push(lastMasterActionSummary.continueHref);
        }
        break;
      case "daily_try_missing":
        if (habitNudge?.href) {
          router.push(habitNudge.href);
        }
        break;
      case "daily_talk":
        appendAssistantMessage("I'm here.\n\nTell me what's going on, and I'll help you sort through it.");
        break;
      case "daily_intro_help":
        if (currentPageGuide) {
          await markCurrentGuideSeen();
          appendAssistantMessage(
            buildLouisGuideChatMessage(currentPageGuide, {
              firstName: userFirstName,
              isPaidUser,
            }),
          );
          seedQuickReplies([
            pathname === "/dashboard"
              ? { id: "guide-start-devotional", label: "Let's start with a devotional", action: "open_devotionals" }
              : { id: "guide-follow-up", label: "I have a question", action: "guide_question" },
            pathname === "/dashboard"
              ? { id: "guide-follow-up-question", label: "I have a question", action: "guide_question" }
              : null,
            louisRecommendation
              ? { id: "guide-then-rec", label: "What do you recommend?", action: "daily_recommendation" }
              : { id: "guide-later-2", label: "That helps", action: "guide_later" },
          ].filter(Boolean) as QuickReply[]);
        }
        break;
      case "daily_intro_later":
        appendAssistantMessage("No problem.\n\nWhenever you're ready, tap me and I'll help you out.");
        break;
      case "guide_show":
        if (currentPageGuide) {
          await markCurrentGuideSeen();
          appendAssistantMessage(
            buildLouisGuideChatMessage(currentPageGuide, {
              firstName: userFirstName,
              isPaidUser,
            }),
          );
          seedQuickReplies([
            { id: "guide-follow-up", label: "I have a question", action: "guide_question" },
            pathname === "/dashboard" && louisRecommendation
              ? { id: "guide-then-rec", label: "What do you recommend?", action: "daily_recommendation" }
              : { id: "guide-later-2", label: "That helps", action: "guide_later" },
          ]);
        }
        break;
      case "guide_later":
        if (hasPendingPageGuide) {
          await markCurrentGuideSeen();
        }
        appendAssistantMessage("No problem.\n\nIf you want help with this page later, just tap me and ask.");
        break;
      case "guide_question":
        if (hasPendingPageGuide) {
          await markCurrentGuideSeen();
        }
        appendAssistantMessage(
          currentPageGuide
            ? "What do you want help with on this page?"
            : "What do you want help with?",
        );
        break;
      case "open_devotionals":
        markRolloutSeenLocal("devotionals_intro_seen");
        router.push("/devotionals");
        break;
      case "moment_navigate":
        if (reply.href) {
          router.push(reply.href);
        }
        break;
      case "moment_message":
        if (reply.message) {
          appendAssistantMessage(reply.message);
        }
        break;
      case "moment_close":
        setIsOpen(false);
        break;
      case "recommendation_open":
        if (reply.id === "verse-open-page") {
          router.push("/verse-of-the-day");
        } else if (louisRecommendation) {
          router.push(louisRecommendation.primaryButtonHref);
        }
        break;
      case "recommendation_question":
        appendAssistantMessage("Ask me anything about that recommendation and I'll break it down for you.");
        break;
      case "recommendation_later":
        appendAssistantMessage("That's fine.\n\nIf you want the recommendation later, just ask me and I'll bring it back up.");
        break;
      default:
        break;
    }
  }

  async function handleChatButtonClick() {
    if (pathname === "/dashboard" && isDashboardVerseModalOpen) {
      return;
    }

    const hadPendingRouteHandoff = pendingRouteHandoff;
    const unreadMomentReplies = pendingMomentReplies;
    setIsOpen(true);
    setQuickReplies([]);
    setPendingRouteHandoff(false);
    markInboxMessagesSeen();

    if (featureToursEnabled && louisFeatureTours.chat_widget !== true) {
      void markChatWidgetSeen();
    }

    const latestMessage = messages[messages.length - 1];

    if (pendingInboxMessageIds.length > 0) {
      return;
    }

    if (hasPendingPageGuide && currentPageGuide) {
      await markCurrentGuideSeen();
      appendAssistantMessage(
        buildLouisGuideChatMessage(currentPageGuide, {
          firstName: userFirstName,
          isPaidUser,
        }),
      );
      clearLouisInputPrompt();
      return;
    }

    if (hadPendingRouteHandoff && unreadMomentReplies.length > 0) {
      setQuickReplies(unreadMomentReplies);
      setPendingMomentReplies([]);
      const labels = unreadMomentReplies.map((reply) => reply.label.toLowerCase());
      if (labels.includes("yes") && labels.includes("no")) {
        setTypedReplyPrompt("yes_no", "none", "You can type yes or no, or tap the buttons.");
      }
      return;
    }

    if (hadPendingRouteHandoff) {
      return;
    }

    if (pathname === "/dashboard" && (hasUnseenDailyGreeting || hasUnseenSecondRecommendation)) {
      const momentKind: LouisDailyMomentKind = hasUnseenDailyGreeting ? "first" : "second";
      const dailyConversationMessage = buildDailyConversationMessage(momentKind);

      if (latestMessage?.role === "assistant" && latestMessage.content === dailyConversationMessage) {
        if (pathname === "/dashboard" && (!hasLouisHistory || louisJourneyStage === "new_user") && !primaryDevotional) {
          setTypedReplyPrompt(
            "yes_no",
            "none",
            "You can answer me right here. Just type yes or no.",
          );
        }
        return;
      }

      await beginDailyConversation(momentKind);
      return;
    }

    if (hasPendingDevotionalChallengePrompt) {
      appendAssistantMessage(
        "This is the devotional page\n\nPick one devotional\n\nto get started\n\nTake your time and choose one\n\nthat stands out to you",
      );
      return;
    }

    if (hasPendingDevotionalStartPrompt && selectedDevotionalForChallenge) {
      setDailyFlowType("devotional_start");
      persistNewUserChallengeStep("choose_start_day");
      appendAssistantMessage(
        `Good choice\n\n${selectedDevotionalForChallenge.title}\n\n${toGoalHelpLine(onboardingGoal)}\n\nReady to start Day 1?`,
      );
      seedQuickReplies([
        { id: "devotional-start-yes", label: "Yes", action: "daily_yes" },
        { id: "devotional-start-no", label: "No", action: "daily_no" },
      ]);
      setTypedReplyPrompt("yes_no", "none", "You can type yes or no, or tap the buttons.");
      return;
    }

    const openingIndex =
      Math.abs(
        [...`${pathname}-${messages.length}-${new Date().getMinutes()}`].reduce(
          (sum, char) => sum + char.charCodeAt(0),
          0,
        ),
      ) % LOUIS_OPENING_GREETINGS.length;

    appendAssistantMessage(LOUIS_OPENING_GREETINGS[openingIndex]);
  }

  async function handleLouisGuideSecondary() {}

  async function handleLouisGuideClose() {}

  async function handleLouisGuidePrimary() {}

  async function handleChatTourUnderstand() {}

  async function handleStructuredLouisInput(trimmed: string) {
    const normalized = trimmed.trim().toLowerCase();
    if (louisInputPrompt.intent === "verse_explain" && (normalized === "yes" || normalized === "no")) {
      clearLouisInputPrompt();
      if (normalized === "yes") {
        appendAssistantMessage(buildVerseExplanationMessage(todayVerse));
        await shareDailyRecommendationAfterVerse(
          `And look, you're on day ${currentStreak}. Keep that streak alive by doing this today.`,
        );
      } else {
        await shareDailyRecommendationAfterVerse(
          `Alright. You're on day ${currentStreak}. Keep that streak alive by doing this today.`,
        );
      }
      return true;
    }

    if (louisInputPrompt.mode === "yes_no" && (normalized === "yes" || normalized === "no")) {
      if (normalized === "yes") {
        clearLouisInputPrompt();
        await handleQuickReply({ id: "typed-yes", label: "Yes", action: "daily_yes" });
      } else {
        clearLouisInputPrompt();
        await handleQuickReply({ id: "typed-no", label: "No", action: "daily_no" });
      }
      return true;
    }

    return false;
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextConversationMemory: LouisConversationMemory = {
      summary: summarizeConversationMemory(trimmed),
      topic: inferConversationTopic(trimmed),
      resolved: messageLooksResolved(trimmed),
    };

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages: Message[] = [...messages, userMessage];

    setMessages(newMessages);
    void logLouisAction(ACTION_TYPE.louis_user_message_sent, toLouisLogLabel(trimmed));
    setQuickReplies([]);
    clearLouisInputPrompt();
    setInput("");
    setIsSending(true);
    setConversationMemory(nextConversationMemory);
    persistLouisProfile({
      louis_last_conversation_summary: nextConversationMemory.summary,
      louis_last_conversation_topic: nextConversationMemory.topic,
      louis_last_conversation_resolved: nextConversationMemory.resolved,
    });

    if (await handleStructuredLouisInput(trimmed)) {
      setIsSending(false);
      return;
    }

    const directRoute = buildDirectRouteFromMessage(trimmed, louisPageContext);
    if (directRoute) {
      appendAssistantMessage(directRoute.reply);
      setIsSending(false);
      setIsOpen(false);
      router.push(directRoute.href);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          pageContext: {
            ...louisPageContext,
            ...(currentPageGuide
              ? {
                  guideId: currentPageGuide.id,
                  title: currentPageGuide.title,
                }
              : {}),
          },
          louisContext: {
            isFirstTimeLouis: !hasLouisHistory,
            currentStreak,
            onboardingGoal,
            bibleExperienceLevel,
            louisJourneyStage,
            primaryDevotionalTitle: primaryDevotional?.title ?? null,
            primaryDevotionalDay: primaryDevotional?.dayNumber ?? null,
            lastConversationTopic: nextConversationMemory.topic,
            lastConversationSummary: nextConversationMemory.summary,
            lastConversationResolved: nextConversationMemory.resolved,
            hasPendingPageGuide,
            pageGuideTitle: currentPageGuide?.title ?? null,
            lastActionSummary: lastMasterActionSummary?.summary ?? null,
            lastActionFollowUp: lastMasterActionSummary?.followUp ?? null,
            habitNudge: habitNudge?.summary ?? null,
            recommendationLine: louisRecommendation?.recommendationLine ?? null,
            recommendationHref: louisRecommendation?.primaryButtonHref ?? null,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply ?? "Sorry, I did not understand that.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      void logLouisAction(
        ACTION_TYPE.louis_ai_message_sent,
        toLouisLogLabel(assistantMessage.content),
      );
    } catch (err) {
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, something went wrong. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      void logLouisAction(
        ACTION_TYPE.louis_ai_message_sent,
        toLouisLogLabel(errorMessage.content),
      );
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Send on Enter (without Shift), otherwise allow normal textarea behavior
    if (e.key === "Enter" && !e.shiftKey && !isSending) {
      e.preventDefault();
      handleSend();
    }
  }

  // Dragging handlers (mouse + touch via Pointer Events)
  function handlePointerDown(e: React.PointerEvent<HTMLElement>) {
    // Only left button for mouse; allow all touch pointers
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  useEffect(() => {
    if (!isDragging) return;

    function handlePointerMove(e: PointerEvent) {
      e.preventDefault();
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }

    function handlePointerUp() {
      setIsDragging(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = window.requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ block: "end" });
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) return;
    void logLouisAction(ACTION_TYPE.louis_opened, pathname);
  }, [isOpen, pathname, louisUserId]);

  useEffect(() => {
    if (!isOpen || louisInputPrompt.mode === "default" || louisInputPrompt.hinted || !louisInputPrompt.hint) {
      return;
    }

    if (input.trim().length > 0) {
      return;
    }

    const currentUserMessageCount = messages.filter((message) => message.role === "user").length;
    if (currentUserMessageCount > louisInputPrompt.userMessageCount) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const latestUserCount = messages.filter((message) => message.role === "user").length;
      if (latestUserCount > louisInputPrompt.userMessageCount || input.trim().length > 0) {
        return;
      }

      const hintMessage = louisInputPrompt.hint;
      if (!hintMessage) {
        return;
      }

      appendAssistantMessage(hintMessage);
      setLouisInputPrompt((prev) => ({ ...prev, hinted: true }));
    }, 60000);

    return () => window.clearTimeout(timeout);
  }, [input, isOpen, louisInputPrompt, messages]);

  useEffect(() => {
    const handoff = consumeLouisRouteHandoff(pathname);
    if (!handoff?.message) return;

    appendAssistantMessage(handoff.message);
    void logLouisAction(
      ACTION_TYPE.louis_route_handoff_shown,
      toLouisLogLabel(`${pathname} ${handoff.message}`),
    );
    seedQuickReplies([]);
    setPendingRouteHandoff(true);
  }, [pathname]);

  useEffect(() => {
    function onLouisMoment(event: Event) {
      const detail = (event as CustomEvent<LouisMomentDetail>).detail;
      if (!detail?.message) return;

      const mappedReplies = (detail.replies ?? []).map((reply: LouisMomentReply) => ({
        id: reply.id,
        label: reply.label,
        action: reply.close ? "moment_close" : reply.href ? "moment_navigate" : "moment_message",
        href: reply.href,
        message: reply.message,
      })) as QuickReply[];

      appendAssistantMessage(detail.message);
      seedQuickReplies(mappedReplies);
      setPendingMomentReplies(mappedReplies);
      const labels = mappedReplies.map((reply) => reply.label.toLowerCase());
      if (labels.includes("yes") && labels.includes("no")) {
        setTypedReplyPrompt("yes_no", "none", "You can type yes or no, or tap the buttons.");
      }
      if (detail.openMode === "badge" && !isOpen) {
        setPendingRouteHandoff(true);
        return;
      }
      setIsOpen(true);
    }

    document.addEventListener(LOUIS_MOMENT_EVENT, onLouisMoment);
    return () => document.removeEventListener(LOUIS_MOMENT_EVENT, onLouisMoment);
  }, [isOpen]);

  const bubbleStyle =
    position.x === 0 && position.y === 0
      ? {
          position: "fixed" as const,
          bottom: "1rem",
          right: "1rem",
        }
      : {
          position: "fixed" as const,
          left: `${position.x}px`,
          top: `${position.y}px`,
        };

  const panelWidth = 360;
  const panelHeight = 500;
  const viewportPadding = 16;
  const bubbleSize = 80;
  const customPanelLeft =
    position.x === 0
      ? null
      : Math.min(
          Math.max(position.x + bubbleSize - panelWidth, viewportPadding),
          Math.max(viewportPadding, viewportSize.width - panelWidth - viewportPadding),
        );
  const customPanelTop =
    position.y === 0
      ? null
      : Math.min(
          Math.max(position.y - panelHeight + bubbleSize, viewportPadding),
          Math.max(viewportPadding, viewportSize.height - panelHeight - viewportPadding),
        );
  const panelStyle =
    position.x === 0 && position.y === 0
      ? {
          position: "fixed" as const,
          bottom: "6rem",
          right: "1rem",
        }
      : {
          position: "fixed" as const,
          left: `${customPanelLeft ?? viewportPadding}px`,
          top: `${customPanelTop ?? viewportPadding}px`,
        };

  const isLouisActive = hasPendingLouisMoment;
  const bubbleOuterSize = isLouisActive ? "h-20 w-20" : "h-16 w-16";
  const avatarSize = isLouisActive ? 64 : 52;

  return (
    <>
      {/* Floating avatar button */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onClick={async (e) => {
            if (!isDragging) {
              await handleChatButtonClick();
            }
          }}
          onPointerDown={handlePointerDown}
          style={{
            ...bubbleStyle,
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
          className={`z-[70] rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
            hasPendingLouisMoment ? "animate-[bounce_1.25s_ease-in-out_infinite]" : "scale-95"
          }`}
          aria-label="Chat with Louis"
        >
          <div className={`relative ${bubbleOuterSize} rounded-full flex items-center justify-center ${isLouisActive ? "bg-sky-100/80" : "bg-black/5 grayscale"}`}>
            {hasPendingLouisMoment ? (
              <>
                <span className="absolute inset-0 rounded-full border-4 border-sky-300/70 animate-ping [animation-duration:1.15s]" />
                <span className="absolute -right-1 top-0 rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                  New
                </span>
              </>
            ) : null}
            <LouisAvatar mood="bible" size={avatarSize} />
          </div>
        </button>
      )}

      {/* Chat panel - Medium size */}
      {isOpen && (
        <div
          ref={panelRef}
          style={{
            ...panelStyle,
            cursor: isDragging ? "grabbing" : "default",
          }}
          className="z-[70] w-[360px] h-[500px] rounded-t-2xl bg-white border border-gray-200 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div 
            className="px-4 py-2.5 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-2xl cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
            onPointerDown={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest("button")) {
                return; // Don't drag if clicking close button
              }
              handlePointerDown(e);
            }}
          >
            <div className="flex items-center gap-2">
              <LouisAvatar mood="bible" size={28} />
              <span className="text-sm font-semibold text-gray-900">Chat with Louis</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-base leading-none"
              onPointerDown={(e) => e.stopPropagation()}
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-white"
          >
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-xs text-gray-500 text-center">
                  {emptyStatePrompt}
                </p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "flex items-end justify-end gap-2.5"
                    : "flex items-end justify-start gap-2.5"
                }
              >
                {m.role === "assistant" ? (
                  <div className="shrink-0">
                    <div className="overflow-hidden rounded-full border border-sky-100 bg-white p-0.5 shadow-sm">
                      <LouisAvatar mood="bible" size={30} />
                    </div>
                  </div>
                ) : null}
                <div className={m.role === "user" ? "max-w-[78%] text-right" : "max-w-[78%]"}>
                  <div className={m.role === "user" ? "mb-1 text-[10px] font-medium text-slate-500" : "mb-1 text-[10px] font-medium text-slate-500"}>
                    {m.role === "user" ? "You" : "Louis"}
                  </div>
                  <div
                    className={
                      m.role === "user"
                        ? "inline-block rounded-[22px] rounded-br-md border border-[#b8d9ef] bg-[#7BAFD4] px-3.5 py-2.5 text-left text-slate-950 shadow-sm"
                        : "inline-block rounded-[22px] rounded-bl-md border border-gray-200 bg-white px-3.5 py-2.5 text-gray-800 shadow-sm"
                    }
                  >
                    <p className="text-xs whitespace-pre-line leading-relaxed break-words">
                      {m.content}
                    </p>
                  </div>
                </div>
                {m.role === "user" ? (
                  userProfileImageUrl ? (
                    <img
                      src={userProfileImageUrl}
                      alt="Your profile picture"
                      className="h-8 w-8 shrink-0 rounded-full border border-[#b8d9ef] object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#b8d9ef] bg-[#e8f3fb] text-[11px] font-semibold text-[#214761] shadow-sm">
                      {userInitial}
                    </div>
                  )
                ) : null}
              </div>
            ))}
            {isSending ? (
              <div className="flex items-end justify-start gap-2.5">
                <div className="shrink-0">
                  <div className="overflow-hidden rounded-full border border-sky-100 bg-white p-0.5 shadow-sm">
                    <LouisAvatar mood="bible" size={30} />
                  </div>
                </div>
                <div className="max-w-[78%]">
                  <div className="mb-1 text-[10px] font-medium text-slate-500">Louis</div>
                  <div className="inline-flex items-center gap-1 rounded-[22px] rounded-bl-md border border-gray-200 bg-white px-3.5 py-3 text-gray-800 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                    <span className="ml-2 text-[11px] text-slate-500">Louis is typing...</span>
                  </div>
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          {quickReplies.length > 0 ? (
            <div className="border-t border-gray-200 bg-white px-3 py-3">
              <div className={`gap-2 ${quickReplies.length === 1 ? "flex justify-end" : "grid grid-cols-2"}`}>
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    type="button"
                    onClick={() => void handleQuickReply(reply)}
                    className={
                      reply.label === "Yes"
                        ? "w-full rounded-lg bg-[#6fb48b] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#5ea27a]"
                        : reply.label === "No"
                          ? "w-full rounded-lg bg-[#e98585] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#d96d6d]"
                          : "rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                    }
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Input area */}
          <div 
            className="border-t border-gray-200 px-3 py-2.5 bg-gray-50 rounded-b-2xl"
          >
            <div className="flex gap-2 items-end">
              <div className="flex-1 flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={inputPlaceholder}
                  rows={1}
                  className="flex-1 text-xs border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none min-h-[36px] max-h-[120px] overflow-y-auto"
                />
                {isListening && audioLevels.length > 0 && (
                  <div className="flex items-end gap-0.5 h-8 pb-1">
                    {audioLevels.map((level, index) => (
                      <div
                        key={index}
                        className="w-1 bg-red-500 rounded-full transition-all duration-75"
                        style={{
                          height: `${Math.max(level * 24, 4)}px`,
                          minHeight: "4px",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={toggleListening}
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                }`}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 9a1 1 0 10-2 0v2a1 1 0 102 0V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={handleSend}
                disabled={isSending || !input.trim()}
                className="text-xs font-semibold bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {false && (currentPageGuide || louisRecommendation) && (
        <FeatureTourModal
          isOpen={showLouisGuideModal}
          title={
            louisGuideView === "recommendation"
              ? louisRecommendation?.cardTitle || "Louis has your next step"
              : currentPageGuide?.title || "Louis has something for you"
          }
          body={
            louisGuideView === "recommendation"
              ? louisRecommendation?.contextLine || ""
              : ""
          }
          content={
            louisGuideView === "recommendation" ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3">
                  <p className="text-sm font-semibold text-sky-900">
                    {louisRecommendation?.greeting || "Hereâ€™s what I noticed today."}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-gray-600 md:text-[15px]">
                    {louisRecommendation?.contextLine}
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-gray-900 md:text-lg">Here&apos;s what I think you should do next</h2>
                  <p className="text-sm leading-7 text-gray-600 md:text-[15px]">
                    {louisRecommendation?.recommendationLine}
                  </p>
                </div>
              </div>
            ) : louisGuideView === "tour" && currentPageGuide ? (
              renderLouisGuideContent(currentPageGuide)
            ) : currentPageGuide ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3">
                  <p className="text-sm leading-7 text-gray-600 md:text-[15px]"></p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await markCurrentGuideSeen();
                    setLouisGuideView("tour");
                  }}
                  className="rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
                >
                  Take the tour
                </button>
              </div>
            ) : undefined
          }
          primaryButtonText={
            louisGuideView === "recommendation"
              ? louisRecommendation?.primaryButtonText || "Open it"
              : "I get it"
          }
          secondaryButtonText="Ask Louis"
          onSecondary={() => {
            void handleLouisGuideSecondary();
          }}
          onClose={() => {
            void handleLouisGuideClose();
          }}
          onUnderstand={() => {
            void handleLouisGuidePrimary();
          }}
        />
      )}

      {false && featureToursEnabled && (
        <FeatureTourModal
          isOpen={showChatTourModal}
          title="Welcome to Chat with Louis"
          body=""
          content={
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Welcome to Chat with Louis
              </h1>

              <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                This section helps you ask Bible questions instantly while you study so you can stay focused in your reading flow.
              </p>

              <section className="space-y-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ’¬ Ask Questions Anytime</h2>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  While reading Scripture, you can open Chat with Louis and ask:
                </p>
                <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
                  <li>â€¢ What does this verse mean?</li>
                  <li>â€¢ Who is this person?</li>
                  <li>â€¢ What is the historical context?</li>
                  <li>â€¢ How does this connect to the rest of the Bible?</li>
                </ul>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  You never have to leave your study flow.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“– Scripture Focused Answers</h2>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  Louis has been carefully trained on biblical content and designed to:
                </p>
                <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
                  <li>â€¢ Search Scripture</li>
                  <li>â€¢ Filter out nonsense</li>
                  <li>â€¢ Prioritize clear, Scripture grounded answers</li>
                </ul>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  The goal is clarity, not confusion.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ§  Study Without Breaking Flow</h2>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  Instead of switching apps or searching the internet, your study partner is built directly into BibleBuddy.
                </p>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">Stay focused.</p>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">Dig deeper.</p>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">Keep reading.</p>
              </section>
            </div>
          }
          isSaving={isSavingChatTour}
          onClose={() => setShowChatTourModal(false)}
          onUnderstand={handleChatTourUnderstand}
        />
      )}
    </>
  );
}

