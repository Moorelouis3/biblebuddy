import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const ANALYTICS_RESPONSE_CACHE_TTL_MS = 45 * 1000;
const NEW_USER_FIRST_THREE_DAYS_LOOKBACK_DAYS = 14;
const NEW_USER_FIRST_THREE_DAYS_ACTION_TYPES = [
  "user_signup",
  "bible_in_one_year_started",
  "bible_year_day_start_popup_viewed",
  "bible_year_day_start_popup_clicked",
  "bible_year_audio_played",
  "bible_year_audio_progress",
  "bible_year_audio_completed",
  "bible_year_task_started",
  "bible_year_task_completed",
  "bible_in_one_year_day_viewed",
  "bible_in_one_year_reading_completed",
  "bible_in_one_year_trivia_completed",
  "bible_in_one_year_reflection_completed",
  "follow_along_scripture_opened",
  "study_notes_viewed",
  "study_notes_section_opened",
  "chapter_notes_viewed",
  "chapter_notes_reviewed",
  "scrambled_chapter_opened",
  "scrambled_chapter_completed",
  "profile_creation_popup_completed",
  "profile_creation_popup_skipped",
] as const;

type AnalyticsResponseCacheEntry = {
  body: unknown;
  cachedAt: number;
};

const analyticsResponseCache = new Map<string, AnalyticsResponseCacheEntry>();

type AnswerSummary = {
  answer: string;
  count: number;
  percent: number;
};

type LandingActivityCategory =
  | "visits"
  | "guestStarts"
  | "accountsCreated"
  | "upgrades"
  | "onboarding"
  | "dropoff"
  | "other";

type LandingEventRow = {
  event_name?: string | null;
  session_id?: string | null;
  user_id?: string | null;
  source?: string | null;
  referrer?: string | null;
  page_path?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string | null;
};

type JourneyWindowKey = "today" | "yesterday" | "24h" | "7d" | "30d" | "this_month" | "lifetime";

type UpgradeActionRow = {
  user_id?: string | null;
  username?: string | null;
  action_label?: string | null;
  created_at?: string | null;
};

type StudyNotesActionRow = {
  user_id?: string | null;
  username?: string | null;
  action_type?: string | null;
  action_label?: string | null;
  event_metadata?: Record<string, unknown> | null;
  created_at?: string | null;
};

type HelpfulnessVoteRow = {
  video_id?: string | null;
  video_title?: string | null;
  video_url?: string | null;
  video_context?: string | null;
  helpful?: boolean | null;
  updated_at?: string | null;
};

type BibleYearTaskActionRow = {
  user_id?: string | null;
  action_type?: string | null;
  action_label?: string | null;
  created_at?: string | null;
};

type MasterActionFunnelRow = {
  user_id?: string | null;
  username?: string | null;
  session_id?: string | null;
  action_type?: string | null;
  action_label?: string | null;
  journey_day?: number | null;
  account_status?: string | null;
  event_metadata?: Record<string, unknown> | null;
  created_at?: string | null;
};

type VideoProgressAnalyticsRow = {
  user_id?: string | null;
  video_id?: string | null;
  current_time?: number | null;
  duration?: number | null;
  completed?: boolean | null;
  updated_at?: string | null;
};

type ActiveUserActionRow = {
  id: string;
  actionType: string;
  title: string;
  detail: string;
  category: VisitorJourneyTimelineEvent["category"];
  dayNumber: number | null;
  taskType: string | null;
  createdAt: string;
};

type ActiveUserLast24HoursRow = {
  actorId: string;
  userId: string | null;
  sessionId: string | null;
  userLabel: string;
  totalActions: number;
  lastAction: string;
  lastActionDetail: string;
  lastActionAt: string;
  actions: ActiveUserActionRow[];
};

type NewUserFirstThreeDaysRow = {
  userId: string;
  userLabel: string;
  signupAt: string;
  eligibleForThreeDayMetrics: boolean;
  firstAction: string;
  firstActionAt: string | null;
  day1Started: boolean;
  day1Completed: boolean;
  reachedDay2: boolean;
  reachedDay3: boolean;
  returnedNextDay: boolean;
  activeAfter72Hours: boolean;
  lastAction: string;
  lastActionAt: string | null;
  status: "activated" | "stalled" | "returned" | "dropped_off";
  statusLabel: string;
};

type NewUserFirstThreeDaysAnalytics = {
  totalNewAccounts: number;
  eligibleAccounts: number;
  stillMaturingAccounts: number;
  startedDay1: number;
  completedDay1: number;
  reachedDay2: number;
  reachedDay3: number;
  returnedNextDay: number;
  activeAfter72Hours: number;
  activationRate: number;
  day1CompletionRate: number;
  day2ReachRate: number;
  day3ReachRate: number;
  commonDropoffs: Array<{ key: string; label: string; count: number }>;
  rows: NewUserFirstThreeDaysRow[];
};

type FunnelStageRow = {
  key: string;
  label: string;
  users: number;
  conversionRate: number;
  dropoffRate: number;
  retentionRate: number;
  upgradeViews?: number;
  upgradeClicks?: number;
  continueFreeClicks?: number;
  successfulUpgrades?: number;
  upgradeClickRate?: number;
  upgradeSuccessRate?: number;
  continueFreeRate?: number;
};

type DayThreeUpgradeAnalytics = {
  views: number;
  upgradeClicks: number;
  continueFreeClicks: number;
  successfulUpgrades: number;
  upgradeClickRate: number;
  upgradeSuccessRate: number;
  continueFreeRate: number;
};

type StudyNotesUpgradeDayAnalytics = {
  dayNumber: number;
  views: number;
  upgradeClicks: number;
  stayFreeClicks: number;
  upgradeClickRate: number;
  stayFreeRate: number;
};

type StudyNotesUpgradeAnalytics = {
  totalViews: number;
  totalUpgradeClicks: number;
  totalStayFreeClicks: number;
  upgradeClickRate: number;
  stayFreeRate: number;
  days: StudyNotesUpgradeDayAnalytics[];
};

type BibleYearProgressRow = {
  user_id?: string | null;
  day_number?: number | null;
  reading_completed?: boolean | null;
  study_notes_completed?: boolean | null;
  trivia_completed?: boolean | null;
  reflection_completed?: boolean | null;
  updated_at?: string | null;
};

type BibleYearDayUserRow = {
  userId: string;
  userLabel: string;
  readingStarted: boolean;
  triviaStarted: boolean;
  reflectionStarted: boolean;
  readingCompleted: boolean;
  triviaCompleted: boolean;
  reflectionCompleted: boolean;
  task1StartEvent: string | null;
  task1FinishEvent: string | null;
  task2StartEvent: string | null;
  task2FinishEvent: string | null;
  task3StartEvent: string | null;
  task3FinishEvent: string | null;
  videoWatchedSeconds: number;
  videoDurationSeconds: number;
  videoWatchPercent: number;
  videoCompleted: boolean;
  completed: boolean;
  updatedAt: string | null;
};

type DataHealthWarning = {
  key: string;
  severity: "warning" | "info";
  title: string;
  detail: string;
};

type ParsedStudyNotesLabel = {
  source: string;
  sourceLabel: string;
  itemKey: string;
  itemTitle: string;
  contentLabel: string;
  sectionReference: string;
  sectionTitle: string;
};

type VisitorJourneyStatus =
  | "active"
  | "finished_onboarding"
  | "onboarding_only"
  | "day_1_in_progress"
  | "day_1_completed"
  | "created_account"
  | "upgraded"
  | "dropped_off";

type VisitorJourneyTimelineEvent = {
  id: string;
  title: string;
  eventName: string;
  category: "landing" | "onboarding" | "dashboard" | "bible_year" | "account" | "upgrade" | "trial" | "engagement" | "dropoff";
  status: "completed" | "active" | "warning" | "dropped";
  timestamp: string;
  detail: string;
  timeSinceFirstLabel: string | null;
  timeSincePreviousLabel: string | null;
  dayNumber: number | null;
  taskType: string | null;
};

type VisitorJourneyDetails = {
  visitorId: string;
  accountType: "guest" | "free" | "pro";
  trialStatus: string;
  badgeStatus: string;
  deviceType: string;
  country: string;
  source: string;
  firstVisitAt: string;
  totalTimeLabel: string;
  daysActive: number;
  currentStudy: string;
  currentDay: number | null;
  lastCompletedDay: number | null;
  streak: number | null;
  xp: number | null;
  level: number | null;
  dropoffReason: string;
};

type VisitorJourneyRow = {
  id: string;
  visitorLabel: string;
  sessionId: string;
  userId: string | null;
  userLabel: string;
  journeySelected: string;
  onboardingCompletedAt: string | null;
  startedDay1At: string | null;
  completedDay1At: string | null;
  createdAccountAt: string | null;
  upgradedAt: string | null;
  currentStatus: VisitorJourneyStatus;
  currentStatusLabel: string;
  source: string;
  referrer: string | null;
  lastActiveAt: string;
  lastEventName: string;
  timeSpentMs: number;
  timeSpentLabel: string;
  dropoffStep: string;
  accountType: "guest" | "free" | "pro";
  timeline: VisitorJourneyTimelineEvent[];
  details: VisitorJourneyDetails;
};

type AuthUserSummary = {
  id: string;
  email: string | null;
  createdAt: string | null;
  lastSignInAt: string | null;
  isAnonymous: boolean;
  providers: string[];
};

type ProfileSummary = {
  displayName: string;
  isPaid: boolean;
  registeredAt: string | null;
  convertedFromGuestAt: string | null;
  currentStreak: number | null;
  currentLevel: number | null;
  totalActions: number | null;
  memberBadge: string | null;
  proExpiresAt: string | null;
  updatedAt?: string | null;
};

type PaidProfileUpgradeRow = {
  user_id?: string | null;
  display_name?: string | null;
  username?: string | null;
  is_paid?: boolean | null;
  member_badge?: string | null;
  updated_at?: string | null;
};

type RegisteredUserAnalyticsRow = {
  id: string;
  displayName: string;
  email: string | null;
  accountType: "Email" | "No email" | "Guest";
  provider: string;
  createdAt: string | null;
  lastSignInAt: string | null;
};

type RegisteredUserAnalytics = {
  total: number;
  withEmail: number;
  withoutEmail: number;
  guestAccounts: number;
  rows: RegisteredUserAnalyticsRow[];
};

async function verifyOwner(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.toLowerCase().startsWith("bearer ") ? authHeader.slice(7) : "";

  if (!url || !anonKey || !token) return false;

  const authClient = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data, error } = await authClient.auth.getUser(token);
  if (error) return false;
  return data.user?.email === "moorelouis3@gmail.com";
}

const QUESTION_CONFIG = [
  {
    key: "goal",
    title: "Main Goal",
    field: "goal",
    options: [
      "Build a consistent habit",
      "Understand the Bible better",
      "Grow closer to God",
      "Study with other believers",
    ],
  },
  {
    key: "experience",
    title: "Bible Study Experience",
    field: "experience",
    options: ["I'm just getting started", "Less than 1 year", "1-3 years", "More than 3 years"],
  },
  {
    key: "studyFocus",
    title: "Study Focus",
    field: "study_focus",
    options: ["The whole Bible story", "A specific book of the Bible", "People in the Bible", "Wisdom for real life"],
  },
  {
    key: "time",
    title: "Daily Time Available",
    field: "time_commitment",
    options: ["15-20 minutes", "30 minutes", "45 minutes", "60+ minutes"],
  },
  {
    key: "difficulty",
    title: "Biggest Obstacle",
    field: "difficulty",
    options: [
      "I don't know where to start",
      "I don't understand what I read",
      "I struggle staying consistent",
      "I get distracted or too busy",
    ],
  },
] as const;

const FUNNEL_CONFIG = [
  { key: "visits", eventName: "landing_page_visit", label: "Landing page visits" },
  { key: "clickedStart", eventName: "clicked_start_journey", label: "Clicked Create Free Account" },
  { key: "startedOnboarding", eventName: "started_onboarding", label: "Started onboarding" },
  { key: "viewedIntro", eventName: "viewed_onboarding_intro", label: "Viewed onboarding intro" },
  { key: "viewedQuestion1", eventName: "viewed_question_1", label: "Viewed Question 1" },
  { key: "question1", eventName: "completed_question_1", label: "Completed Question 1" },
  { key: "viewedQuestion2", eventName: "viewed_question_2", label: "Viewed Question 2" },
  { key: "question2", eventName: "completed_question_2", label: "Completed Question 2" },
  { key: "viewedQuestion3Focus", eventName: "viewed_question_3_focus", label: "Viewed Question 3 - Study Focus" },
  { key: "question3Focus", eventName: "completed_question_3_focus", label: "Completed Question 3 - Study Focus" },
  { key: "viewedQuestion4", eventName: "viewed_question_4", label: "Viewed Question 4" },
  { key: "question4", eventName: "completed_question_4", label: "Completed Question 4" },
  { key: "viewedQuestion5", eventName: "viewed_question_5", label: "Viewed Question 5" },
  { key: "question5", eventName: "completed_question_5", label: "Completed Question 5" },
  { key: "viewedLoading", eventName: "viewed_results_loading", label: "Viewed results loading" },
  { key: "viewedResults", eventName: "viewed_results_page", label: "Viewed results page" },
  { key: "reachedResults", eventName: "reached_results_page", label: "Reached results page" },
  { key: "guestStart", eventName: "started_guest_journey", label: "Started Guest Journey" },
  { key: "viewedAccount", eventName: "viewed_create_account_modal", label: "Viewed Create Account modal" },
  { key: "openedAccount", eventName: "opened_create_account_modal", label: "Opened Create Account modal" },
  { key: "createdAccount", eventName: "created_free_account", label: "Created Free Account" },
] as const;

const PUBLIC_ONBOARDING_STEP_CONFIG = [
  { key: "intro", eventName: "viewed_onboarding_intro", label: "Intro opened" },
  { key: "question1", eventName: "viewed_question_1", label: "Question 1 viewed" },
  { key: "question2", eventName: "viewed_question_2", label: "Question 2 viewed" },
  { key: "question3", eventName: "viewed_question_3_focus", label: "Question 3 viewed" },
  { key: "question4", eventName: "viewed_question_4", label: "Question 4 viewed" },
  { key: "question5", eventName: "viewed_question_5", label: "Question 5 viewed" },
  { key: "results", eventName: "viewed_results_page", label: "Results viewed" },
  { key: "guest", eventName: "started_guest_journey", label: "Guest journey started" },
  { key: "account", eventName: "viewed_create_account_modal", label: "Account modal viewed" },
  { key: "signup", eventName: "created_free_account", label: "Account created" },
] as const;

function summarize(options: readonly string[], rows: Record<string, unknown>[], field: string) {
  const counts = new Map(options.map((option) => [option, 0]));

  for (const row of rows) {
    const answer = typeof row[field] === "string" ? row[field] as string : "";
    if (counts.has(answer)) {
      counts.set(answer, (counts.get(answer) || 0) + 1);
    }
  }

  const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);
  const answers: AnswerSummary[] = options.map((answer) => {
    const count = counts.get(answer) || 0;
    return {
      answer,
      count,
      percent: total > 0 ? Number(((count / total) * 100).toFixed(1)) : 0,
    };
  });
  const sorted = [...answers].sort((a, b) => b.count - a.count);

  return {
    total,
    answers,
    mostCommon: total > 0 ? sorted[0] ?? null : null,
    leastCommon: [...answers].filter((answer) => answer.count > 0).sort((a, b) => a.count - b.count)[0] ?? null,
  };
}

function buildPersonaLine(questions: Array<{ key: string; mostCommon: AnswerSummary | null }>) {
  const byKey = new Map(questions.map((question) => [question.key, question.mostCommon?.answer]));
  const goal = byKey.get("goal");
  const experience = byKey.get("experience");
  const studyFocus = byKey.get("studyFocus");
  const time = byKey.get("time");
  const difficulty = byKey.get("difficulty");
  if (!goal || !experience || !studyFocus || !time || !difficulty) {
    return "Not enough new onboarding data yet to describe the average Bible Buddy user.";
  }

  return `The typical Bible Buddy user wants to ${goal.toLowerCase()}, is ${experience.toLowerCase()}, wants to focus on ${studyFocus.toLowerCase()}, has about ${time.toLowerCase()} a day, and most often says ${difficulty.toLowerCase()}.`;
}

function summarizeFunnel(rows: Record<string, unknown>[]) {
  const eventSessions = new Map<string, Set<string>>();
  for (const row of rows) {
    const eventName = typeof row.event_name === "string" ? row.event_name : "";
    const sessionId = typeof row.session_id === "string" ? row.session_id : "";
    if (!eventName || !sessionId) continue;
    if (!eventSessions.has(eventName)) eventSessions.set(eventName, new Set());
    eventSessions.get(eventName)?.add(sessionId);
  }

  const steps = FUNNEL_CONFIG.map((step, index) => {
    const count = eventSessions.get(step.eventName)?.size || 0;
    const previousCount = index === 0 ? count : eventSessions.get(FUNNEL_CONFIG[index - 1].eventName)?.size || 0;
    return {
      key: step.key,
      eventName: step.eventName,
      label: step.label,
      count,
      stepConversion: index === 0 || previousCount === 0 ? 100 : Number(((count / previousCount) * 100).toFixed(1)),
    };
  });

  const visitors = steps[0]?.count || 0;
  const guestStarts = steps.find((step) => step.eventName === "started_guest_journey")?.count || 0;
  const accountsCreated = steps.find((step) => step.eventName === "created_free_account")?.count || 0;

  return {
    cards: {
      visitors,
      signups: accountsCreated,
      guestStarts,
      accountsCreated,
      conversionRate: visitors > 0 ? Number(((accountsCreated / visitors) * 100).toFixed(1)) : 0,
      landingToGuestRate: visitors > 0 ? Number(((guestStarts / visitors) * 100).toFixed(1)) : 0,
      guestToAccountRate: guestStarts > 0 ? Number(((accountsCreated / guestStarts) * 100).toFixed(1)) : 0,
    },
    steps,
  };
}

function summarizeGuestAccountFunnel(rows: Record<string, unknown>[]) {
  const windows = [
    { key: "24h", label: "Last 24 Hours", ms: 24 * 60 * 60 * 1000 },
    { key: "7d", label: "Last 7 Days", ms: 7 * 24 * 60 * 60 * 1000 },
    { key: "30d", label: "Last 30 Days", ms: 30 * 24 * 60 * 60 * 1000 },
  ];
  const now = Date.now();

  function countWindow(ms: number) {
    const since = now - ms;
    const guestSessions = new Set<string>();
    const accountSessions = new Set<string>();
    let guestEvents = 0;
    let accountEvents = 0;

    for (const row of rows) {
      const createdAt = typeof row.created_at === "string" ? new Date(row.created_at).getTime() : 0;
      if (!Number.isFinite(createdAt) || createdAt < since) continue;
      const eventName = typeof row.event_name === "string" ? row.event_name : "";
      const sessionId = typeof row.session_id === "string" ? row.session_id : "";
      if (eventName === "started_guest_journey") {
        guestEvents += 1;
        if (sessionId) guestSessions.add(sessionId);
      }
      if (eventName === "created_free_account" || eventName === "created_account_successfully") {
        accountEvents += 1;
        if (sessionId) accountSessions.add(sessionId);
      }
    }

    const guestStarts = guestSessions.size || guestEvents;
    const accountsCreated = accountSessions.size || accountEvents;
    return {
      guestStarts,
      accountsCreated,
      conversionRate: guestStarts > 0 ? Number(((accountsCreated / guestStarts) * 100).toFixed(1)) : 0,
    };
  }

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayRows = rows.filter((row) => typeof row.created_at === "string" && row.created_at.slice(0, 10) === todayKey);
  const today = {
    guestStarts: new Set(todayRows.filter((row) => row.event_name === "started_guest_journey").map((row) => row.session_id || row.user_id)).size,
    accountsCreated: new Set(todayRows.filter((row) => row.event_name === "created_free_account" || row.event_name === "created_account_successfully").map((row) => row.session_id || row.user_id)).size,
  };

  return {
    today: {
      ...today,
      conversionRate: today.guestStarts > 0 ? Number(((today.accountsCreated / today.guestStarts) * 100).toFixed(1)) : 0,
    },
    windows: windows.map((window) => ({ key: window.key, label: window.label, ...countWindow(window.ms) })),
  };
}

function getMasterActorId(row: MasterActionFunnelRow) {
  return row.user_id || row.session_id || "";
}

function getEventActorId(row: LandingEventRow) {
  return row.user_id || row.session_id || "";
}

function percent(part: number, whole: number) {
  return whole > 0 ? Number(((part / whole) * 100).toFixed(1)) : 0;
}

function parseBibleYearDayFromLabel(label: string) {
  const match = label.match(/Day\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

function getCanonicalBibleYearTaskEvent(dayNumber: number, taskNumber: number, status: "started" | "finished") {
  return `day_${dayNumber}_task_${taskNumber}_${status}`;
}

function getCanonicalEventNameFromAction(row: MasterActionFunnelRow, dayNumber: number, taskNumber: number | null) {
  const metadata = row.event_metadata && typeof row.event_metadata === "object" ? row.event_metadata : {};
  const canonical = typeof metadata.canonicalEventName === "string" ? metadata.canonicalEventName : "";
  if (canonical) return canonical;
  if (!dayNumber || !taskNumber) return null;
  if (row.action_type === "bible_year_task_started") return getCanonicalBibleYearTaskEvent(dayNumber, taskNumber, "started");
  if (row.action_type === "bible_in_one_year_reading_completed" && taskNumber === 1) return getCanonicalBibleYearTaskEvent(dayNumber, 1, "finished");
  if (row.action_type === "bible_in_one_year_reflection_completed" && taskNumber === 2) return getCanonicalBibleYearTaskEvent(dayNumber, 2, "finished");
  if (row.action_type === "bible_in_one_year_trivia_completed" && taskNumber === 3) return getCanonicalBibleYearTaskEvent(dayNumber, 3, "finished");
  return null;
}

function buildBibleBuddyFunnelStages(
  landingRows: LandingEventRow[],
  masterRows: MasterActionFunnelRow[],
  progressRows: BibleYearProgressRow[],
  dayThreeUpgrade: DayThreeUpgradeAnalytics,
  daySevenUpgrade: DayThreeUpgradeAnalytics,
) {
  const landingActorsByEvent = new Map<string, Set<string>>();
  for (const row of landingRows) {
    const eventName = row.event_name || "";
    const actorId = getEventActorId(row);
    if (!eventName || !actorId) continue;
    if (!landingActorsByEvent.has(eventName)) landingActorsByEvent.set(eventName, new Set());
    landingActorsByEvent.get(eventName)?.add(actorId);
  }

  const masterActorsByAction = new Map<string, Set<string>>();
  for (const row of masterRows) {
    const actionType = row.action_type || "";
    const actorId = getMasterActorId(row);
    if (!actionType || !actorId) continue;
    if (!masterActorsByAction.has(actionType)) masterActorsByAction.set(actionType, new Set());
    masterActorsByAction.get(actionType)?.add(actorId);
  }

  function mergeActors(eventNames: string[], actionTypes: string[] = []) {
    const merged = new Set<string>();
    for (const eventName of eventNames) {
      landingActorsByEvent.get(eventName)?.forEach((actor) => merged.add(actor));
    }
    for (const actionType of actionTypes) {
      masterActorsByAction.get(actionType)?.forEach((actor) => merged.add(actor));
    }
    return merged;
  }

  const accountCreatedActors = mergeActors(["created_free_account", "created_account_successfully"], ["user_signup"]);
  const startJourneyActors = mergeActors(["clicked_start_journey"], ["landing_cta_clicked"]);

  function completedDayActors(dayNumber: number) {
    const actors = new Set<string>();
    for (const row of masterRows) {
      if (row.action_type !== "bible_in_one_year_trivia_completed") continue;
      const day = Number(row.journey_day || parseBibleYearDayFromLabel(row.action_label || "") || 0);
      if (day !== dayNumber) continue;
      const actorId = getMasterActorId(row);
      if (actorId) actors.add(actorId);
    }
    return actors;
  }

  function startedDayActors(dayNumber: number) {
    const actors = new Set<string>();
    for (const row of masterRows) {
      const day = Number(row.journey_day || parseBibleYearDayFromLabel(row.action_label || "") || 0);
      if (day !== dayNumber) continue;
      if (row.action_type !== "bible_year_task_started") continue;
      const metadata = row.event_metadata && typeof row.event_metadata === "object" ? row.event_metadata : {};
      const task = typeof metadata.task === "string" ? metadata.task : "";
      const taskNumber = typeof metadata.taskNumber === "number" ? metadata.taskNumber : null;
      const label = String(row.action_label || "").toLowerCase();
      const isFirstTask = taskNumber === 1 || task === "reading" || label.includes("task 1 started") || label.includes("reading started") || label.includes("video started");
      if (!isFirstTask) continue;
      const actorId = getMasterActorId(row);
      if (actorId) actors.add(actorId);
    }
    return actors;
  }

  const stageSets = [
    { key: "landing", label: "Landing Page", actors: mergeActors(["landing_page_visit"], ["landing_page_visited"]) },
    { key: "clickedStart", label: "Create Free Account Clicks", actors: startJourneyActors },
    { key: "accountsCreated", label: "Accounts Created", actors: accountCreatedActors },
    { key: "startedOnboarding", label: "Onboarding Started", actors: mergeActors(["started_onboarding"], ["onboarding_intro_started"]) },
    { key: "finishedOnboarding", label: "Started Journey", actors: mergeActors(["started_guest_journey", "clicked_yes_start_my_journey"], ["onboarding_journey_started"]) },
    { key: "startedDay1", label: "Started Day 1", actors: startedDayActors(1) },
    { key: "completedDay1", label: "Completed Day 1", actors: completedDayActors(1) },
    { key: "startedDay2", label: "Started Day 2", actors: startedDayActors(2) },
    { key: "completedDay2", label: "Completed Day 2", actors: completedDayActors(2) },
    { key: "startedDay3", label: "Started Day 3", actors: startedDayActors(3) },
    { key: "completedDay3", label: "Completed Day 3", actors: completedDayActors(3) },
    { key: "day3UpgradeOffer", label: "Day 3 Upgrade Offer", actors: new Set<string>() },
    { key: "startedDay4", label: "Started Day 4", actors: startedDayActors(4) },
    { key: "completedDay4", label: "Completed Day 4", actors: completedDayActors(4) },
    { key: "startedDay5", label: "Started Day 5", actors: startedDayActors(5) },
    { key: "completedDay5", label: "Completed Day 5", actors: completedDayActors(5) },
    { key: "startedDay6", label: "Started Day 6", actors: startedDayActors(6) },
    { key: "completedDay6", label: "Completed Day 6", actors: completedDayActors(6) },
    { key: "startedDay7", label: "Started Day 7", actors: startedDayActors(7) },
    { key: "completedDay7", label: "Completed Day 7", actors: completedDayActors(7) },
    { key: "day7UpgradeOffer", label: "Day 7 Upgrade Offer", actors: new Set<string>() },
  ];

  const firstCount = stageSets[0]?.actors.size || 0;
  return stageSets.map((stage, index): FunnelStageRow => {
    const upgradeStats = stage.key === "day3UpgradeOffer" ? dayThreeUpgrade : stage.key === "day7UpgradeOffer" ? daySevenUpgrade : null;
    const rawUsers = upgradeStats ? upgradeStats.views : stage.actors.size;
    const previousStage = stageSets[index - 1];
    const previousUpgradeStats = previousStage?.key === "day3UpgradeOffer" ? dayThreeUpgrade : previousStage?.key === "day7UpgradeOffer" ? daySevenUpgrade : null;
    const previousCount = index === 0 ? rawUsers : previousUpgradeStats ? previousUpgradeStats.views : previousStage?.actors.size || 0;
    const users = rawUsers;
    return {
      key: stage.key,
      label: stage.label,
      users,
      conversionRate: index === 0 ? 100 : percent(users, previousCount),
      dropoffRate: index === 0 ? 0 : Number(Math.max(0, 100 - percent(users, previousCount)).toFixed(1)),
      retentionRate: index === 0 ? 100 : percent(users, firstCount),
      ...(upgradeStats
        ? {
          upgradeViews: upgradeStats.views,
          upgradeClicks: upgradeStats.upgradeClicks,
          continueFreeClicks: upgradeStats.continueFreeClicks,
          successfulUpgrades: upgradeStats.successfulUpgrades,
          upgradeClickRate: upgradeStats.upgradeClickRate,
          upgradeSuccessRate: upgradeStats.upgradeSuccessRate,
          continueFreeRate: upgradeStats.continueFreeRate,
        }
        : {}),
    };
  });
}

function buildDayUpgradeAnalytics(masterRows: MasterActionFunnelRow[], dayNumber: number): DayThreeUpgradeAnalytics {
  const viewedActors = new Set<string>();
  const upgradeClickActors = new Set<string>();
  const continueFreeActors = new Set<string>();
  const successfulUpgradeActors = new Set<string>();

  for (const row of masterRows) {
    const actorId = getMasterActorId(row);
    if (!actorId) continue;
    const actionType = row.action_type || "";
    const actionLabel = String(row.action_label || "");
    const metadata = row.event_metadata && typeof row.event_metadata === "object" ? row.event_metadata : {};
    const checkoutContext = typeof metadata.checkoutContext === "string" ? metadata.checkoutContext.toLowerCase() : "";
    const prompt = typeof metadata.prompt === "string" ? metadata.prompt.toLowerCase() : "";
    const day = Number(row.journey_day || parseBibleYearDayFromLabel(actionLabel) || 0);
    const lowerLabel = actionLabel.toLowerCase();
    const isDayUpgrade =
      (day === dayNumber && (lowerLabel.includes(`day ${dayNumber}`) || prompt.includes(`day_${dayNumber}`) || checkoutContext.includes(`day_${dayNumber}`))) ||
      checkoutContext === `day_${dayNumber}_upgrade_offer` ||
      prompt === `day_${dayNumber}_pro_upgrade`;
    if (!isDayUpgrade) continue;

    if (actionType === "upgrade_popup_viewed") viewedActors.add(actorId);
    if (actionType === "upgrade_popup_cta_clicked") upgradeClickActors.add(actorId);
    if (actionType === "user_upgraded") successfulUpgradeActors.add(actorId);
    if (actionType === "upgrade_popup_dismissed" && (lowerLabel.includes("continued with free plan") || lowerLabel.includes("skip onboarding") || lowerLabel.includes("upgrade skipped"))) {
      continueFreeActors.add(actorId);
    }
  }

  const views = viewedActors.size;
  const upgradeClicks = upgradeClickActors.size;
  const continueFreeClicks = continueFreeActors.size;
  const successfulUpgrades = successfulUpgradeActors.size;
  return {
    views,
    upgradeClicks,
    continueFreeClicks,
    successfulUpgrades,
    upgradeClickRate: percent(upgradeClicks, views),
    upgradeSuccessRate: percent(successfulUpgrades, Math.max(upgradeClicks, views)),
    continueFreeRate: percent(continueFreeClicks, views),
  };
}

function buildDayThreeUpgradeAnalytics(masterRows: MasterActionFunnelRow[]): DayThreeUpgradeAnalytics {
  return buildDayUpgradeAnalytics(masterRows, 3);
}

function buildStudyNotesUpgradeAnalytics(masterRows: MasterActionFunnelRow[]): StudyNotesUpgradeAnalytics {
  const dayStats = new Map<number, { views: number; upgradeClicks: number; stayFreeClicks: number }>();
  for (let day = 1; day <= 7; day += 1) {
    dayStats.set(day, { views: 0, upgradeClicks: 0, stayFreeClicks: 0 });
  }

  for (const row of masterRows) {
    const actionType = row.action_type || "";
    if (!["upgrade_popup_viewed", "upgrade_popup_cta_clicked", "upgrade_popup_dismissed"].includes(actionType)) continue;
    const actionLabel = String(row.action_label || "");
    const label = actionLabel.toLowerCase();
    const metadata = row.event_metadata && typeof row.event_metadata === "object" ? row.event_metadata : {};
    const prompt = typeof metadata.prompt === "string" ? metadata.prompt.toLowerCase() : "";
    const isStudyNotesUpgrade = prompt === "study_notes_upgrade" || label.includes("study notes");
    if (!isStudyNotesUpgrade) continue;

    const metadataDay = typeof metadata.dayNumber === "number" ? metadata.dayNumber : null;
    const day = Number(row.journey_day || metadataDay || parseBibleYearDayFromLabel(actionLabel) || 0);
    if (day < 1 || day > 7) continue;

    const stats = dayStats.get(day) || { views: 0, upgradeClicks: 0, stayFreeClicks: 0 };
    if (actionType === "upgrade_popup_viewed") stats.views += 1;
    if (actionType === "upgrade_popup_cta_clicked") stats.upgradeClicks += 1;
    if (actionType === "upgrade_popup_dismissed" && (label.includes("stayed free") || label.includes("continue") || label.includes("free plan"))) {
      stats.stayFreeClicks += 1;
    }
    dayStats.set(day, stats);
  }

  const days = Array.from(dayStats.entries()).map(([dayNumber, stats]) => ({
    dayNumber,
    views: stats.views,
    upgradeClicks: stats.upgradeClicks,
    stayFreeClicks: stats.stayFreeClicks,
    upgradeClickRate: percent(stats.upgradeClicks, stats.views),
    stayFreeRate: percent(stats.stayFreeClicks, stats.views),
  }));
  const totalViews = days.reduce((total, day) => total + day.views, 0);
  const totalUpgradeClicks = days.reduce((total, day) => total + day.upgradeClicks, 0);
  const totalStayFreeClicks = days.reduce((total, day) => total + day.stayFreeClicks, 0);
  return {
    totalViews,
    totalUpgradeClicks,
    totalStayFreeClicks,
    upgradeClickRate: percent(totalUpgradeClicks, totalViews),
    stayFreeRate: percent(totalStayFreeClicks, totalViews),
    days,
  };
}

function buildEventSessionMap(rows: Record<string, unknown>[]) {
  const eventSessions = new Map<string, Set<string>>();
  for (const row of rows) {
    const eventName = typeof row.event_name === "string" ? row.event_name : "";
    const sessionId = typeof row.session_id === "string" ? row.session_id : "";
    if (!eventName || !sessionId) continue;
    if (!eventSessions.has(eventName)) eventSessions.set(eventName, new Set());
    eventSessions.get(eventName)?.add(sessionId);
  }
  return eventSessions;
}

function isAccountEvent(eventName: string) {
  return eventName === "created_free_account" || eventName === "created_account_successfully";
}

function getJourneyWindowKey(request: Request): JourneyWindowKey {
  const raw = new URL(request.url).searchParams.get("window");
  return raw === "today" ||
    raw === "yesterday" ||
    raw === "24h" ||
    raw === "7d" ||
    raw === "30d" ||
    raw === "this_month" ||
    raw === "lifetime"
    ? raw
    : "today";
}

function getJourneyWindowMs(windowKey: JourneyWindowKey) {
  if (windowKey === "7d") return 7 * 24 * 60 * 60 * 1000;
  if (windowKey === "30d") return 30 * 24 * 60 * 60 * 1000;
  if (windowKey === "this_month" || windowKey === "lifetime") return Date.now();
  if (windowKey === "yesterday") return 2 * 24 * 60 * 60 * 1000;
  return 24 * 60 * 60 * 1000;
}

function getJourneyWindowLabel(windowKey: JourneyWindowKey) {
  if (windowKey === "today") return "Today";
  if (windowKey === "yesterday") return "Yesterday";
  if (windowKey === "7d") return "Last 7 days";
  if (windowKey === "30d") return "Last 30 days";
  if (windowKey === "this_month") return "This month";
  if (windowKey === "lifetime") return "Lifetime";
  return "Last 24 hours";
}

function getAnalyticsDateRange(windowKey: JourneyWindowKey) {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  if (windowKey === "today") {
    return { startIso: todayStart.toISOString(), endIso: null as string | null };
  }
  if (windowKey === "yesterday") {
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    return { startIso: yesterdayStart.toISOString(), endIso: todayStart.toISOString() };
  }
  if (windowKey === "7d") {
    return { startIso: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), endIso: null as string | null };
  }
  if (windowKey === "30d") {
    return { startIso: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(), endIso: null as string | null };
  }
  if (windowKey === "this_month") {
    return { startIso: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(), endIso: null as string | null };
  }
  if (windowKey === "lifetime") {
    return { startIso: "1970-01-01T00:00:00.000Z", endIso: null as string | null };
  }
  return { startIso: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), endIso: null as string | null };
}

function parseBibleYearDayFromVideoId(videoId: string | null | undefined) {
  if (!videoId) return 0;
  const match = videoId.match(/bible-year-free-day-(\d+)/i);
  return match ? Number(match[1] || 0) : 0;
}

function withinMs(leftIso: string | null | undefined, rightIso: string | null | undefined, ms: number) {
  const left = leftIso ? new Date(leftIso).getTime() : 0;
  const right = rightIso ? new Date(rightIso).getTime() : 0;
  return Number.isFinite(left) && Number.isFinite(right) && left > 0 && right > 0 && Math.abs(left - right) <= ms;
}

function isValidFreeAccountEvent(row: Record<string, unknown>, authByUserId: Map<string, AuthUserSummary>, profileByUserId: Map<string, ProfileSummary>) {
  const eventName = typeof row.event_name === "string" ? row.event_name : "";
  if (!isAccountEvent(eventName)) return false;

  const userId = typeof row.user_id === "string" ? row.user_id : "";
  if (!userId) return false;

  const authUser = authByUserId.get(userId);
  const profile = profileByUserId.get(userId);
  if (!authUser || authUser.isAnonymous || !authUser.email) return false;
  if (!profile?.displayName) return false;
  if (profile.isPaid) return false;

  const metadata = row.metadata && typeof row.metadata === "object" ? row.metadata as Record<string, unknown> : {};
  const eventAt = typeof row.created_at === "string" ? row.created_at : null;

  if (eventName === "created_free_account" && metadata.convertedFromGuest === true) {
    return true;
  }

  return (
    withinMs(eventAt, authUser.createdAt, 2 * 60 * 60 * 1000) ||
    withinMs(eventAt, profile.registeredAt, 2 * 60 * 60 * 1000) ||
    withinMs(eventAt, profile.convertedFromGuestAt, 2 * 60 * 60 * 1000)
  );
}

function filterRealAccountEvents(rows: Record<string, unknown>[], authByUserId: Map<string, AuthUserSummary>, profileByUserId: Map<string, ProfileSummary>) {
  return rows.filter((row) => {
    const eventName = typeof row.event_name === "string" ? row.event_name : "";
    return !isAccountEvent(eventName) || isValidFreeAccountEvent(row, authByUserId, profileByUserId);
  });
}

function isInternalAnalyticsProfile(profile?: ProfileSummary | null) {
  if (!profile) return false;
  const badge = (profile.memberBadge || "").trim().toLowerCase();
  const name = (profile.displayName || "").trim().toLowerCase();
  return (
    ["admin", "owner", "staff", "teacher", "internal"].includes(badge) ||
    name === "louis" ||
    name === "louis moore"
  );
}

function isInternalAnalyticsUser(userId: string | null | undefined, profileByUserId: Map<string, ProfileSummary>) {
  return Boolean(userId && isInternalAnalyticsProfile(profileByUserId.get(userId)));
}

function isOwnerAuthUser(userId: string | null | undefined, authByUserId: Map<string, AuthUserSummary>) {
  if (!userId) return false;
  return (authByUserId.get(userId)?.email || "").trim().toLowerCase() === "moorelouis3@gmail.com";
}

function isWithinAnalyticsWindow(value: string | null | undefined, startIso: string, endIso?: string | null) {
  if (!value) return false;
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return false;
  const start = new Date(startIso).getTime();
  const end = endIso ? new Date(endIso).getTime() : null;
  return time >= start && (end === null || time < end);
}

function isActiveUsersLast24NoiseAction(actionType: string | null | undefined) {
  const normalized = (actionType || "").trim().toLowerCase();
  return normalized === "landing_page_visit" || normalized === "landing_page_visited";
}

function summarizePublicOnboardingFlow(rows: Record<string, unknown>[]) {
  const eventSessions = buildEventSessionMap(rows);
  const closedSessions = eventSessions.get("closed_onboarding") || new Set<string>();

  const steps = PUBLIC_ONBOARDING_STEP_CONFIG.map((step, index) => {
    const reached = eventSessions.get(step.eventName)?.size || 0;
    const nextStep = PUBLIC_ONBOARDING_STEP_CONFIG[index + 1];
    const nextReached = nextStep ? eventSessions.get(nextStep.eventName)?.size || 0 : reached;
    const dropoffs = nextStep ? Math.max(0, reached - nextReached) : 0;
    return {
      key: step.key,
      eventName: step.eventName,
      label: step.label,
      reached,
      dropoffs,
      dropoffRate: reached > 0 ? Number(((dropoffs / reached) * 100).toFixed(1)) : 0,
      conversionToNext: reached > 0 ? Number(((nextReached / reached) * 100).toFixed(1)) : 0,
    };
  });

  const started = eventSessions.get("started_onboarding")?.size || 0;
  const finished = eventSessions.get("started_guest_journey")?.size || 0;

  return {
    started,
    finished,
    closedBeforeSignup: closedSessions.size,
    completionRate: started > 0 ? Number(((finished / started) * 100).toFixed(1)) : 0,
    steps,
  };
}

function summarizeSources(rows: Record<string, unknown>[]) {
  const signupRows = rows.filter((row) => row.event_name === "created_free_account" || row.event_name === "created_account_successfully");
  const sessionsBySource = new Map<string, Set<string>>();

  for (const row of signupRows) {
    const source = typeof row.source === "string" && row.source.trim() ? row.source.trim().replace(/^Direct \/ Unknown$/i, "Direct") : "Direct";
    const sessionId = typeof row.session_id === "string" ? row.session_id : "";
    if (!sessionId) continue;
    if (!sessionsBySource.has(source)) sessionsBySource.set(source, new Set());
    sessionsBySource.get(source)?.add(sessionId);
  }

  const total = Array.from(sessionsBySource.values()).reduce((sum, sessions) => sum + sessions.size, 0);
  return Array.from(sessionsBySource.entries())
    .map(([source, sessions]) => ({
      source,
      signups: sessions.size,
      percent: total > 0 ? Number(((sessions.size / total) * 100).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.signups - a.signups);
}

function summarizeTrafficSources(rows: LandingEventRow[]) {
  const landingRows = rows
    .filter((row) => row.event_name === "landing_page_visit" || row.event_name === "landing_page_visited")
    .sort((a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime());
  const signupRows = rows
    .filter((row) => row.event_name === "created_free_account" || row.event_name === "created_account_successfully")
    .sort((a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime());
  const firstVisitByActor = new Map<string, LandingEventRow>();

  for (const row of landingRows) {
    const actorId = getEventActorId(row);
    if (!actorId || firstVisitByActor.has(actorId)) continue;
    firstVisitByActor.set(actorId, row);
  }

  const sourceCounts = new Map<string, number>();
  const signupCounts = new Map<string, number>();
  const visitorsBySource = new Map<string, Array<{
    actorId: string;
    visitorLabel: string;
    referrer: string | null;
    pagePath: string;
    landingUrl: string;
    firstSeenAt: string | null;
  }>>();
  for (const row of firstVisitByActor.values()) {
    const source = typeof row.source === "string" && row.source.trim() ? row.source.trim().replace(/^Direct \/ Unknown$/i, "Direct") : "Direct";
    const actorId = getEventActorId(row);
    const referrer = typeof row.referrer === "string" && row.referrer.trim() ? row.referrer.trim() : null;
    const pagePath = typeof row.page_path === "string" && row.page_path.trim() ? row.page_path.trim() : "/";
    const landingUrl = pagePath.startsWith("http") ? pagePath : `https://thebiblestudybuddy.com${pagePath.startsWith("/") ? pagePath : `/${pagePath}`}`;
    sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
    if (!visitorsBySource.has(source)) visitorsBySource.set(source, []);
    visitorsBySource.get(source)?.push({
      actorId,
      visitorLabel: row.user_id ? `User ${shortId(row.user_id)}` : `Session ${shortId(row.session_id || actorId)}`,
      referrer,
      pagePath,
      landingUrl,
      firstSeenAt: row.created_at || null,
    });
  }

  const signedUpActors = new Set<string>();
  for (const row of signupRows) {
    const actorId = getEventActorId(row);
    if (!actorId || signedUpActors.has(actorId)) continue;
    signedUpActors.add(actorId);

    const sessionId = typeof row.session_id === "string" ? row.session_id : "";
    const userId = typeof row.user_id === "string" ? row.user_id : "";
    const firstVisit = firstVisitByActor.get(actorId) || (sessionId ? firstVisitByActor.get(sessionId) : undefined) || (userId ? firstVisitByActor.get(userId) : undefined);
    const rawSource = firstVisit?.source || row.source;
    const source = typeof rawSource === "string" && rawSource.trim() ? rawSource.trim().replace(/^Direct \/ Unknown$/i, "Direct") : "Direct";
    signupCounts.set(source, (signupCounts.get(source) || 0) + 1);
    if (!sourceCounts.has(source)) sourceCounts.set(source, 0);
  }

  const totalVisitors = firstVisitByActor.size;
  const sources = Array.from(sourceCounts.entries())
    .map(([source, visitors]) => ({
      source,
      visitors,
      signups: signupCounts.get(source) || 0,
      signupRate: percent(signupCounts.get(source) || 0, visitors),
      percent: percent(visitors, totalVisitors),
      visitorRows: (visitorsBySource.get(source) || [])
        .sort((a, b) => (b.firstSeenAt || "").localeCompare(a.firstSeenAt || ""))
        .slice(0, 100),
    }))
    .sort((a, b) => b.visitors - a.visitors || a.source.localeCompare(b.source));

  return {
    totalVisitors,
    sources,
  };
}

function buildAnalyticsDataHealthWarnings(
  bibleYearDays: ReturnType<typeof buildBibleYearDayAnalytics>,
  trafficSources: ReturnType<typeof summarizeTrafficSources>,
): DataHealthWarning[] {
  const warnings: DataHealthWarning[] = [];
  const missingTaskStarts = bibleYearDays.reduce((total, day) => {
    return total + day.users.filter((user) =>
      (user.readingCompleted && !user.readingStarted) ||
      (user.reflectionCompleted && !user.reflectionStarted) ||
      (user.triviaCompleted && !user.triviaStarted)
    ).length;
  }, 0);
  if (missingTaskStarts > 0) {
    warnings.push({
      key: "bible-year-finished-without-start",
      severity: "warning",
      title: `${missingTaskStarts} task completions are missing a matching start event`,
      detail: "A task was finished, but the matching day_X_task_Y_started event was not found for that same person.",
    });
  }

  const missingDayOneStarts = bibleYearDays
    .find((day) => day.dayNumber === 1)
    ?.users.filter((user) => user.completed && !user.readingStarted).length || 0;
  if (missingDayOneStarts > 0) {
    warnings.push({
      key: "day-1-complete-without-task-1-start",
      severity: "warning",
      title: `${missingDayOneStarts} Day 1 completions are missing day_1_task_1_started`,
      detail: "Finished Day 1 is based on day_1_task_3_finished, but day_1_task_1_started was not found for those people.",
    });
  }

  const missingSourceRows = trafficSources.sources.reduce((total, source) => {
    return total + (source.visitorRows || []).filter((row) => !row.referrer && source.source === "Unknown").length;
  }, 0);
  if (missingSourceRows > 0) {
    warnings.push({
      key: "missing-source-referrer",
      severity: "info",
      title: `${missingSourceRows} landing visitors have unknown source/referrer`,
      detail: "Add or preserve UTM/referrer values to make traffic source reporting more useful.",
    });
  }

  return warnings;
}

function summarizeAudioEngagement(
  masterRows: MasterActionFunnelRow[],
  bibleYearDays: ReturnType<typeof buildBibleYearDayAnalytics>,
  profileByUserId: Map<string, string>,
) {
  const audioRows = masterRows.filter((row) =>
    row.action_type === "bible_year_audio_played" ||
    row.action_type === "bible_year_audio_progress" ||
    row.action_type === "bible_year_audio_completed"
  );
  const totalPlays = audioRows.filter((row) => row.action_type === "bible_year_audio_played").length ||
    bibleYearDays.reduce((total, day) => total + day.startedUsers, 0);
  const uniqueListeners = new Set(
    (audioRows.length ? audioRows : bibleYearDays.flatMap((day) => day.users))
      .map((row) => "userId" in row ? row.userId : getMasterActorId(row))
      .filter(Boolean)
  ).size;
  const totalSecondsPlayed = audioRows.reduce((total, row) => total + getAudioSeconds(row), 0);
  const completedLessons = audioRows.filter((row) => row.action_type === "bible_year_audio_completed").length ||
    bibleYearDays.reduce((total, day) => total + day.completedUsers, 0);
  const playDetails = audioRows.length
    ? Array.from(
        audioRows.reduce((map, row) => {
          const actorId = getMasterActorId(row);
          const dayNumber = typeof row.journey_day === "number" ? row.journey_day : parseBibleYearDayFromLabel(row.action_label || "");
          const key = `${actorId || "unknown"}:${row.session_id || "no-session"}:${dayNumber || "no-day"}:${row.action_label || "audio"}`;
          const current = map.get(key);
          const seconds = getAudioSeconds(row);
          const createdAt = row.created_at || null;
          if (!current) {
            map.set(key, {
              id: key,
              userId: row.user_id || null,
              userLabel: row.user_id ? profileByUserId.get(row.user_id) || row.username || `User ${shortId(row.user_id)}` : row.username || "Guest listener",
              title: row.action_label || (dayNumber ? `Day ${dayNumber} audio` : "Bible year audio"),
              dayNumber,
              eventType: row.action_type || "audio",
              listenedSeconds: seconds,
              listenedLabel: seconds > 0 ? formatDuration(seconds * 1000) : "Not tracked",
              playedAt: createdAt,
            });
          } else {
            current.listenedSeconds = Math.max(current.listenedSeconds, seconds);
            current.listenedLabel = current.listenedSeconds > 0 ? formatDuration(current.listenedSeconds * 1000) : "Not tracked";
            if (createdAt && (!current.playedAt || createdAt > current.playedAt)) current.playedAt = createdAt;
            if (row.action_type === "bible_year_audio_completed") current.eventType = row.action_type;
          }
          return map;
        }, new Map<string, {
          id: string;
          userId: string | null;
          userLabel: string;
          title: string;
          dayNumber: number | null;
          eventType: string;
          listenedSeconds: number;
          listenedLabel: string;
          playedAt: string | null;
        }>())
      ).map(([, detail]) => detail)
        .sort((a, b) => (b.playedAt || "").localeCompare(a.playedAt || ""))
        .slice(0, 500)
    : bibleYearDays
        .flatMap((day) =>
          day.users
            .filter((user) => user.readingStarted || user.readingCompleted)
            .map((user) => ({
              id: `${user.userId}:day-${day.dayNumber}`,
              userId: user.userId,
              userLabel: user.userLabel,
              title: `Day ${day.dayNumber} audio lesson`,
              dayNumber: day.dayNumber,
              eventType: user.readingCompleted ? "day_task_finished" : "day_task_started",
              listenedSeconds: 0,
              listenedLabel: "Needs audio tracking",
              playedAt: user.updatedAt,
            }))
        )
        .sort((a, b) => (b.playedAt || "").localeCompare(a.playedAt || ""))
        .slice(0, 500);

  return {
    totalPlays,
    uniqueListeners,
    totalMinutesPlayed: Math.round(totalSecondsPlayed / 60),
    averageListeningMinutes: totalPlays > 0 && totalSecondsPlayed > 0 ? Number((totalSecondsPlayed / 60 / totalPlays).toFixed(1)) : 0,
    lessonCompletionRate: percent(completedLessons, totalPlays),
    source: audioRows.length ? "audio_events" : "day_task_events",
    playDetails,
  };
}

function buildHelpfulnessSummary(rows: HelpfulnessVoteRow[]) {
  const yes = rows.filter((row) => row.helpful === true).length;
  const no = rows.filter((row) => row.helpful === false).length;
  const total = yes + no;
  const yesRate = percent(yes, total);
  const noRate = percent(no, total);
  return {
    yes,
    no,
    total,
    yesRate,
    noRate,
    verdict: total === 0 ? "No votes yet" : yesRate >= 80 ? "Very helpful" : yesRate >= 60 ? "Helpful" : yesRate >= 40 ? "Mixed" : "Needs work",
  };
}

function buildAudioHelpfulnessAnalytics(windowRows: HelpfulnessVoteRow[], lifetimeRows: HelpfulnessVoteRow[]) {
  const topAudio = Array.from(
    windowRows.reduce((map, row) => {
      const audioId = (row.video_id || "audio:unknown").replace(/^audio:/, "");
      const current = map.get(audioId) || {
        audioId,
        title: row.video_title || titleFromSlug(audioId) || "Audio lesson",
        context: row.video_context || "bible_year",
        url: row.video_url || "",
        yes: 0,
        no: 0,
        total: 0,
        yesRate: 0,
        noRate: 0,
        verdict: "No votes yet",
        latestVoteAt: null as string | null,
      };
      if (row.helpful === true) current.yes += 1;
      if (row.helpful === false) current.no += 1;
      current.total = current.yes + current.no;
      current.yesRate = percent(current.yes, current.total);
      current.noRate = percent(current.no, current.total);
      current.verdict = current.total === 0 ? "No votes yet" : current.yesRate >= 80 ? "Very helpful" : current.yesRate >= 60 ? "Helpful" : current.yesRate >= 40 ? "Mixed" : "Needs work";
      if (row.updated_at && (!current.latestVoteAt || row.updated_at > current.latestVoteAt)) current.latestVoteAt = row.updated_at;
      map.set(audioId, current);
      return map;
    }, new Map<string, {
      audioId: string;
      title: string;
      context: string;
      url: string;
      yes: number;
      no: number;
      total: number;
      yesRate: number;
      noRate: number;
      verdict: string;
      latestVoteAt: string | null;
    }>()),
  )
    .map(([, row]) => row)
    .sort((a, b) => b.total - a.total || b.yesRate - a.yesRate || (b.latestVoteAt || "").localeCompare(a.latestVoteAt || ""))
    .slice(0, 20);

  return {
    window: buildHelpfulnessSummary(windowRows),
    lifetime: buildHelpfulnessSummary(lifetimeRows),
    topAudio,
  };
}

function summarizeLandingWindow(rows: Record<string, unknown>[], windowKey: JourneyWindowKey) {
  const range = getAnalyticsDateRange(windowKey);
  const since = new Date(range.startIso).getTime();
  const before = range.endIso ? new Date(range.endIso).getTime() : null;
  const recentRows = rows.filter((row) => {
    const createdAt = typeof row.created_at === "string" ? new Date(row.created_at).getTime() : 0;
    return Number.isFinite(createdAt) && createdAt >= since && (!before || createdAt < before);
  });
  const visitSessions = new Set<string>();
  const guestSessions = new Set<string>();
  const accountSessions = new Set<string>();
  let visitEvents = 0;
  let guestEvents = 0;
  let accountEvents = 0;

  for (const row of recentRows) {
    const eventName = typeof row.event_name === "string" ? row.event_name : "";
    const sessionId = typeof row.session_id === "string" ? row.session_id : "";
    if (eventName === "landing_page_visit") {
      visitEvents += 1;
      if (sessionId) visitSessions.add(sessionId);
    }
    if (eventName === "created_free_account" || eventName === "created_account_successfully") {
      accountEvents += 1;
      if (sessionId) accountSessions.add(sessionId);
    }
    if (eventName === "started_guest_journey") {
      guestEvents += 1;
      if (sessionId) guestSessions.add(sessionId);
    }
  }

  const visits = visitSessions.size || visitEvents;
  const guestStarts = guestSessions.size || guestEvents;
  const accountsCreated = accountSessions.size || accountEvents;

  return {
    visits,
    signups: accountsCreated,
    guestStarts,
    accountsCreated,
    conversionRate: visits > 0 ? Number(((accountsCreated / visits) * 100).toFixed(1)) : 0,
    landingToGuestRate: visits > 0 ? Number(((guestStarts / visits) * 100).toFixed(1)) : 0,
    guestToAccountRate: guestStarts > 0 ? Number(((accountsCreated / guestStarts) * 100).toFixed(1)) : 0,
    rawVisitEvents: visitEvents,
    rawGuestEvents: guestEvents,
    rawSignupEvents: accountEvents,
  };
}

function summarizeAcquisitionWindow(
  landingRows: LandingEventRow[],
  masterRows: MasterActionFunnelRow[],
  windowKey: JourneyWindowKey,
) {
  const range = getAnalyticsDateRange(windowKey);
  const since = new Date(range.startIso).getTime();
  const before = range.endIso ? new Date(range.endIso).getTime() : null;
  const inWindow = (createdAtValue: string | null | undefined) => {
    const createdAt = createdAtValue ? new Date(createdAtValue).getTime() : 0;
    return Number.isFinite(createdAt) && createdAt >= since && (!before || createdAt < before);
  };

  const visitActors = new Set<string>();
  const startActors = new Set<string>();
  const accountActors = new Set<string>();
  let visitEvents = 0;
  let startEvents = 0;
  let accountEvents = 0;

  for (const row of landingRows) {
    if (!inWindow(row.created_at)) continue;
    const eventName = row.event_name || "";
    const actorId = getEventActorId(row);

    if (eventName === "landing_page_visit" || eventName === "landing_page_visited") {
      visitEvents += 1;
      if (actorId) visitActors.add(actorId);
    }

    if (eventName === "clicked_start_journey") {
      startEvents += 1;
      if (actorId) startActors.add(actorId);
    }

    if (eventName === "created_free_account" || eventName === "created_account_successfully") {
      accountEvents += 1;
      if (actorId) accountActors.add(actorId);
    }
  }

  for (const row of masterRows) {
    if (!inWindow(row.created_at)) continue;
    const actionType = row.action_type || "";
    const actorId = getMasterActorId(row);

    if (actionType === "landing_page_visited") {
      visitEvents += 1;
      if (actorId) visitActors.add(actorId);
    }

    if (actionType === "landing_cta_clicked") {
      startEvents += 1;
      if (actorId) startActors.add(actorId);
    }

    if (actionType === "user_signup") {
      accountEvents += 1;
      if (actorId) accountActors.add(actorId);
    }
  }

  const visits = visitActors.size || visitEvents;
  const startClicks = startActors.size || startEvents;
  const accountsCreated = accountActors.size || accountEvents;

  return {
    visits,
    signups: accountsCreated,
    guestStarts: startClicks,
    startClicks,
    accountsCreated,
    conversionRate: visits > 0 ? Number(((accountsCreated / visits) * 100).toFixed(1)) : 0,
    landingToGuestRate: visits > 0 ? Number(((startClicks / visits) * 100).toFixed(1)) : 0,
    guestToAccountRate: startClicks > 0 ? Number(((accountsCreated / startClicks) * 100).toFixed(1)) : 0,
    rawVisitEvents: visitEvents,
    rawGuestEvents: startEvents,
    rawSignupEvents: accountEvents,
  };
}

function summarizeLandingLast24Hours(rows: Record<string, unknown>[]) {
  return summarizeLandingWindow(rows, "24h");
}

function formatSessionDuration(ms: number) {
  if (!Number.isFinite(ms) || ms < 60 * 1000) return "under 1 min";
  const minutes = Math.round(ms / (60 * 1000));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
}

function shortId(value: string) {
  return value.length > 8 ? value.slice(0, 8) : value;
}

function decodeLabelPart(value: string | null | undefined) {
  try {
    return decodeURIComponent(value || "");
  } catch {
    return value || "";
  }
}

function parseStudyNotesLabel(label: string | null | undefined): ParsedStudyNotesLabel | null {
  const viewIndex = label?.indexOf("study_notes_view:v1|") ?? -1;
  const sectionIndex = label?.indexOf("study_notes_section_open:v1|") ?? -1;
  const structuredIndex = viewIndex >= 0 ? viewIndex : sectionIndex;
  if (!label || structuredIndex === -1) return null;
  const structuredLabel = label.slice(structuredIndex);

  const data = new Map<string, string>();
  for (const part of structuredLabel.split("|").slice(1)) {
    const separatorIndex = part.indexOf("=");
    if (separatorIndex === -1) continue;
    data.set(part.slice(0, separatorIndex), part.slice(separatorIndex + 1));
  }

  return {
    source: decodeLabelPart(data.get("source")),
    sourceLabel: decodeLabelPart(data.get("sourceLabel")),
    itemKey: decodeLabelPart(data.get("itemKey")),
    itemTitle: decodeLabelPart(data.get("itemTitle")),
    contentLabel: decodeLabelPart(data.get("contentLabel")),
    sectionReference: decodeLabelPart(data.get("sectionReference")),
    sectionTitle: decodeLabelPart(data.get("sectionTitle")),
  };
}

function getMetadataText(metadata: Record<string, unknown> | null | undefined, key: string) {
  const value = metadata?.[key];
  return typeof value === "string" ? value : "";
}

function isReaderPhraseOpen(row: StudyNotesActionRow) {
  return getMetadataText(row.event_metadata, "kind") === "reader_phrase_opened";
}

function titleFromSlug(value: string) {
  const bibleReferenceMatch = value.match(/^([a-z]+)(\d+)-(\d+)-(\d+)$/i);
  if (bibleReferenceMatch) {
    const book = bibleReferenceMatch[1].charAt(0).toUpperCase() + bibleReferenceMatch[1].slice(1);
    return `${book} ${bibleReferenceMatch[2]}:${bibleReferenceMatch[3]}-${bibleReferenceMatch[4]}`;
  }

  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseReaderStudyNotesLabel(label: string | null | undefined) {
  const rawLabel = label || "";
  const sectionMatch = rawLabel.match(/opened\s+([a-z0-9-]+)\s+notes opened/i);
  const phraseMatch = rawLabel.match(/opened\s+([a-z0-9-]+)\s+([a-z0-9-]+)\s+opened/i);
  return {
    sectionKey: sectionMatch?.[1] || phraseMatch?.[1] || "",
    phraseKey: phraseMatch?.[2] || "",
  };
}

function getQuestionLabel(eventName: string) {
  if (eventName.includes("question_1")) return "Question 1";
  if (eventName.includes("question_2")) return "Question 2";
  if (eventName.includes("question_3")) return "Question 3";
  if (eventName.includes("question_4")) return "Question 4";
  if (eventName.includes("question_5")) return "Question 5";
  return "";
}

function getLandingActivityInfo(row: LandingEventRow) {
  const eventName = row.event_name || "";
  const metadata = row.metadata && typeof row.metadata === "object" ? row.metadata : {};
  const answer = typeof metadata.answer === "string" ? metadata.answer : "";
  const route = typeof metadata.studyRoute === "string" ? metadata.studyRoute : "";
  const selectedTime = typeof metadata.selectedTime === "string" ? metadata.selectedTime : "";
  const recommendationDays = typeof metadata.recommendationDays === "number" ? metadata.recommendationDays : null;
  const questionLabel = getQuestionLabel(eventName);

  if (eventName === "landing_page_visit") {
    return {
      category: "visits" as LandingActivityCategory,
      title: "Visited landing page",
      detail: "A visitor landed on BibleBuddy.",
    };
  }
  if (eventName === "clicked_start_journey") {
    return {
      category: "guestStarts" as LandingActivityCategory,
      title: "Clicked Create Free Account",
      detail: "Visitor clicked the main landing page CTA.",
    };
  }
  if (eventName === "started_onboarding") {
    return {
      category: "guestStarts" as LandingActivityCategory,
      title: "Clicked Create Free Account",
      detail: "Visitor moved from the landing page toward signup.",
    };
  }
  if (eventName.startsWith("viewed_question_")) {
    return {
      category: "onboarding" as LandingActivityCategory,
      title: `Viewed ${questionLabel || "an onboarding question"}`,
      detail: "Visitor reached this onboarding step.",
    };
  }
  if (eventName.startsWith("completed_question_")) {
    return {
      category: "onboarding" as LandingActivityCategory,
      title: `Answered ${questionLabel || "an onboarding question"}`,
      detail: answer ? `Answer: ${answer}` : "Visitor answered this onboarding question.",
    };
  }
  if (eventName === "viewed_results_loading") {
    return {
      category: "onboarding" as LandingActivityCategory,
      title: "Reached recommendation loading",
      detail: "Visitor finished the questions and waited for their result.",
    };
  }
  if (eventName === "viewed_results_page" || eventName === "reached_results_page") {
    const pieces = [
      route ? `Recommended path: ${route}` : "",
      selectedTime ? `Daily time: ${selectedTime}` : "",
      recommendationDays ? `Estimated days: ${recommendationDays}` : "",
    ].filter(Boolean);
    return {
      category: "onboarding" as LandingActivityCategory,
      title: "Viewed recommendation results",
      detail: pieces.length ? pieces.join(" | ") : "Visitor saw their recommended BibleBuddy path.",
    };
  }
  if (eventName === "started_guest_journey") {
    return {
      category: "guestStarts" as LandingActivityCategory,
      title: "Clicked Create Free Account",
      detail: "Visitor entered BibleBuddy and started their journey.",
    };
  }
  if (eventName === "viewed_create_account_modal" || eventName === "opened_create_account_modal") {
    return {
      category: "onboarding" as LandingActivityCategory,
      title: "Saw create account prompt",
      detail: "Guest was shown the option to protect their progress.",
    };
  }
  if (eventName === "created_free_account" || eventName === "created_account_successfully") {
    return {
      category: "accountsCreated" as LandingActivityCategory,
      title: "Created account",
      detail: "Visitor created a Bible Buddy account.",
    };
  }
  if (eventName === "closed_onboarding") {
    return {
      category: "dropoff" as LandingActivityCategory,
      title: "Closed onboarding",
      detail: "Visitor left the onboarding flow before starting a journey.",
    };
  }

  return {
    category: "other" as LandingActivityCategory,
    title: eventName ? eventName.replaceAll("_", " ") : "Landing event",
    detail: "Tracked landing page activity.",
  };
}

function buildLandingActivityLog(rows: LandingEventRow[], profileByUserId: Map<string, string>, windowKey: JourneyWindowKey) {
  const range = getAnalyticsDateRange(windowKey);
  const since = new Date(range.startIso).getTime();
  const before = range.endIso ? new Date(range.endIso).getTime() : null;
  const validRows = rows
    .filter((row) => {
      const createdAt = typeof row.created_at === "string" ? new Date(row.created_at).getTime() : 0;
      return Number.isFinite(createdAt) && createdAt >= since && (!before || createdAt < before);
    })
    .sort((a, b) => {
      const left = typeof a.created_at === "string" ? new Date(a.created_at).getTime() : 0;
      const right = typeof b.created_at === "string" ? new Date(b.created_at).getTime() : 0;
      return left - right;
    });

  const sessions = new Map<string, LandingEventRow[]>();
  for (const row of validRows) {
    const sessionId = typeof row.session_id === "string" && row.session_id ? row.session_id : `no-session-${row.created_at || Math.random()}`;
    if (!sessions.has(sessionId)) sessions.set(sessionId, []);
    sessions.get(sessionId)?.push(row);
  }

  const seenAccountEvents = new Set<string>();
  const dedupedRows = validRows.filter((row) => {
    if (!isAccountEvent(row.event_name || "")) return true;
    const userId = typeof row.user_id === "string" && row.user_id ? row.user_id : "";
    const sessionId = typeof row.session_id === "string" && row.session_id ? row.session_id : "";
    const accountKey = userId || sessionId;
    if (!accountKey) return true;
    if (seenAccountEvents.has(accountKey)) return false;
    seenAccountEvents.add(accountKey);
    return true;
  });

  const entries = dedupedRows.map((row, index) => {
    const sessionId = typeof row.session_id === "string" && row.session_id ? row.session_id : "";
    const sessionRows = sessionId ? sessions.get(sessionId) || [] : [];
    const firstRow = sessionRows[0];
    const lastRow = sessionRows.at(-1);
    const createdAt = typeof row.created_at === "string" ? new Date(row.created_at).getTime() : 0;
    const firstAt = firstRow?.created_at ? new Date(firstRow.created_at as string).getTime() : createdAt;
    const previousRow = sessionRows
      .filter((sessionRow) => {
        const time = typeof sessionRow.created_at === "string" ? new Date(sessionRow.created_at).getTime() : 0;
        return time < createdAt;
      })
      .at(-1);
    const previousAt = previousRow?.created_at ? new Date(previousRow.created_at as string).getTime() : 0;
    const info = getLandingActivityInfo(row);
    const userId = typeof row.user_id === "string" && row.user_id ? row.user_id : null;
    const userLabel = userId ? profileByUserId.get(userId) || `User ${shortId(userId)}` : `Guest session ${shortId(sessionId || "unknown")}`;

    return {
      id: `${row.event_name || "event"}-${row.created_at || index}-${sessionId || index}`,
      category: info.category,
      eventName: row.event_name || "",
      title: info.title,
      detail: info.detail,
      timestamp: row.created_at || new Date().toISOString(),
      source: typeof row.source === "string" && row.source ? row.source.replace(/^Direct \/ Unknown$/i, "Direct") : "Direct",
      pagePath: typeof row.page_path === "string" && row.page_path ? row.page_path : "/",
      referrer: typeof row.referrer === "string" && row.referrer ? row.referrer : null,
      sessionId,
      sessionLabel: sessionId ? `Session ${shortId(sessionId)}` : "No session",
      userId,
      userLabel,
      journeyStart: firstRow ? getLandingActivityInfo(firstRow).title : info.title,
      journeyEnd: lastRow ? getLandingActivityInfo(lastRow).title : info.title,
      timeSinceLandingLabel: createdAt && firstAt && createdAt > firstAt ? `${formatSessionDuration(createdAt - firstAt)} after landing` : null,
      timeSincePreviousLabel: createdAt && previousAt && createdAt > previousAt ? `${formatSessionDuration(createdAt - previousAt)} after previous step` : null,
    };
  });

  const completedEvents = new Set(["started_guest_journey", "created_free_account", "created_account_successfully"]);
  const dropoffEntries = Array.from(sessions.entries()).flatMap(([sessionId, sessionRows]) => {
    const lastRow = sessionRows.at(-1);
    if (!lastRow?.created_at || sessionRows.some((row) => completedEvents.has(row.event_name || ""))) return [];
    const firstAt = sessionRows[0]?.created_at ? new Date(sessionRows[0].created_at as string).getTime() : 0;
    const lastAt = new Date(lastRow.created_at).getTime();
    const lastInfo = getLandingActivityInfo(lastRow);
    const userId = typeof lastRow.user_id === "string" && lastRow.user_id ? lastRow.user_id : null;
    const userLabel = userId ? profileByUserId.get(userId) || `User ${shortId(userId)}` : `Guest session ${shortId(sessionId)}`;
    return [{
      id: `dropoff-${sessionId}-${lastRow.created_at}`,
      category: "dropoff" as LandingActivityCategory,
      eventName: "inferred_dropoff",
      title: "Likely dropped off",
      detail: `Last seen: ${lastInfo.title}. Session lasted about ${formatSessionDuration(Math.max(0, lastAt - firstAt))}.`,
      timestamp: lastRow.created_at,
      source: typeof lastRow.source === "string" && lastRow.source ? lastRow.source.replace(/^Direct \/ Unknown$/i, "Direct") : "Direct",
      pagePath: typeof lastRow.page_path === "string" && lastRow.page_path ? lastRow.page_path : "/",
      referrer: typeof lastRow.referrer === "string" && lastRow.referrer ? lastRow.referrer : null,
      sessionId,
      sessionLabel: `Session ${shortId(sessionId)}`,
      userId,
      userLabel,
      journeyStart: sessionRows[0] ? getLandingActivityInfo(sessionRows[0]).title : "Visited landing page",
      journeyEnd: lastInfo.title,
      timeSinceLandingLabel: lastAt && firstAt && lastAt > firstAt ? `${formatSessionDuration(lastAt - firstAt)} after landing` : null,
      timeSincePreviousLabel: null,
    }];
  });

  return [...entries, ...dropoffEntries]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 150);
}

function buildUpgradeActivityLog(rows: UpgradeActionRow[], profileByUserId: Map<string, string>) {
  return rows.map((row, index) => {
    const userId = typeof row.user_id === "string" && row.user_id ? row.user_id : null;
    const userLabel = userId ? profileByUserId.get(userId) || `User ${shortId(userId)}` : row.username || "BibleBuddy user";
    return {
      id: `upgrade-${userId || index}-${row.created_at || index}`,
      category: "upgrades" as LandingActivityCategory,
      eventName: "user_upgraded",
      title: "Upgraded to Pro",
      detail: row.action_label || "User upgraded to Pro.",
      timestamp: row.created_at || new Date().toISOString(),
      source: "BibleBuddy app",
      pagePath: "/",
      referrer: null,
      sessionId: userId || "",
      sessionLabel: userId ? `User ${shortId(userId)}` : "No session",
      userId,
      userLabel,
      journeyStart: "Free account",
      journeyEnd: "Upgraded to Pro",
      timeSinceLandingLabel: null,
      timeSincePreviousLabel: null,
    };
  });
}

function getVisitorNumber(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 1000000;
  }
  return String(hash || 1).padStart(6, "0");
}

function getJourneyLabelFromEvents(rows: LandingEventRow[]) {
  return "Bible in One Year";
}

function normalizeJourneySource(value: unknown) {
  const source = typeof value === "string" ? value.trim() : "";
  if (!source) return "Unknown";
  const lower = source.toLowerCase();
  if (/^(direct|direct \/ unknown|unknown|direct unknown)$/i.test(source)) return "Unknown";
  if (lower.includes("instagram")) return "Instagram";
  if (lower.includes("facebook") || lower.includes("fb.")) return "Facebook";
  if (lower.includes("threads")) return "Threads";
  if (lower.includes("youtube") || lower.includes("youtu.be")) return "YouTube";
  if (lower.includes("google")) return "Google";
  if (lower.includes("tiktok")) return "TikTok";
  if (lower.includes("email")) return "Email";
  if (lower.includes("bing")) return "Bing";
  try {
    const host = new URL(source).hostname.replace(/^www\./, "");
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("facebook")) return "Facebook";
    if (host.includes("threads")) return "Threads";
    if (host.includes("youtube") || host.includes("youtu.be")) return "YouTube";
    if (host.includes("google")) return "Google";
    return host.split(".")[0]?.replace(/^\w/, (char) => char.toUpperCase()) || "Unknown";
  } catch {
    return source.replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

function formatDuration(ms: number) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 5) return "<5 sec";
  if (seconds < 60) return `${seconds} sec`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return remainingSeconds ? `${minutes}m ${remainingSeconds}s` : `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours} hr`;
}

function getAudioSeconds(row: MasterActionFunnelRow) {
  const metadata = row.event_metadata && typeof row.event_metadata === "object" ? row.event_metadata : {};
  const rawSeconds =
    metadata.secondsPlayed ??
    metadata.listenedSeconds ??
    metadata.currentTime ??
    metadata.current_time ??
    metadata.positionSeconds ??
    metadata.position ??
    metadata.durationSeconds ??
    metadata.duration_seconds ??
    0;
  const seconds = Number(rawSeconds);
  return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
}

function formatTimelineDelta(ms: number) {
  if (!Number.isFinite(ms) || ms <= 0) return null;
  if (ms < 5000) return "a few seconds later";
  return `${formatDuration(ms)} later`;
}

function getLandingStepStatusLabel(sessionRows: LandingEventRow[], finishedOnboarding: boolean) {
  if (finishedOnboarding) return "Started journey";
  const eventNames = sessionRows.map((row) => row.event_name || "");
  const names = new Set(eventNames);
  if (
    names.has("clicked_start_journey") ||
    names.has("started_onboarding") ||
    names.has("viewed_onboarding_intro") ||
    eventNames.some((name) => name.startsWith("viewed_question_") || name.startsWith("completed_question_")) ||
    names.has("viewed_results_page") ||
    names.has("reached_results_page") ||
    names.has("viewed_results_loading")
  ) return "Clicked Create Free Account";
  return "Just visited";
}

function isLandingVisitEvent(eventName: string) {
  return eventName === "landing_page_visit" || eventName === "landing_page_visited";
}

function getLastMeaningfulLandingRow(sessionRows: LandingEventRow[]) {
  return [...sessionRows].reverse().find((row) => !isLandingVisitEvent(row.event_name || "")) || sessionRows[0] || null;
}

function getMasterActionCategory(actionType: string): VisitorJourneyTimelineEvent["category"] {
  if (actionType.includes("upgrade") || actionType === "user_upgraded") return "upgrade";
  if (actionType.includes("trial")) return "trial";
  if (actionType.includes("bible_year") || actionType.includes("bible_in_one_year")) return "bible_year";
  if (actionType.includes("dashboard")) return "dashboard";
  if (actionType.includes("signup") || actionType.includes("profile_creation")) return "account";
  if (actionType.includes("onboarding") || actionType.includes("landing")) return "onboarding";
  return "engagement";
}

function getTaskTypeFromAction(action: MasterActionFunnelRow) {
  const metadata = action.event_metadata && typeof action.event_metadata === "object" ? action.event_metadata : {};
  const task = typeof metadata.task === "string" ? metadata.task : "";
  if (task) return task;
  const label = action.action_label || "";
  if (/video|reading/i.test(label)) return "video";
  if (/notes|review/i.test(label)) return "notes";
  if (/trivia/i.test(label)) return "trivia";
  if (/scrambled/i.test(label)) return "scrambled";
  if (/summary|reflection|discussion/i.test(label)) return "summary";
  return null;
}

function getMasterActionTitle(action: MasterActionFunnelRow) {
  const actionType = action.action_type || "";
  const label = action.action_label || "";
  const day = Number(action.journey_day || parseBibleYearDayFromLabel(label) || 0);
  const task = getTaskTypeFromAction(action);
  if (actionType === "bible_year_task_started") return task ? `Started ${task} task` : `Started Day ${day || ""} task`.trim();
  if (actionType === "bible_in_one_year_reading_completed") return "Completed video / reading task";
  if (actionType === "bible_in_one_year_trivia_completed") return "Completed trivia";
  if (actionType === "bible_in_one_year_reflection_completed") return "Completed day summary";
  if (actionType === "dashboard_tour_started") return "Started dashboard walkthrough";
  if (actionType === "dashboard_tour_completed") return "Finished dashboard walkthrough";
  if (actionType === "dashboard_tour_skipped") return "Skipped dashboard walkthrough";
  if (actionType === "bible_year_day_start_popup_clicked") return "Clicked Start Day 1";
  if (actionType === "follow_along_scripture_opened") return "Opened Follow Along in Scripture";
  if (actionType === "free_account_popup_viewed") return "Saw free account popup";
  if (actionType === "free_account_popup_skipped") return "Skipped free account popup";
  if (actionType === "profile_creation_popup_completed") return "Completed profile popup";
  if (actionType === "profile_creation_popup_skipped") return "Skipped profile popup";
  if (actionType === "upgrade_popup_viewed") return "Saw upgrade popup";
  if (actionType === "upgrade_popup_cta_clicked") return "Clicked upgrade button";
  if (actionType === "upgrade_popup_dismissed") return "Dismissed upgrade popup";
  if (actionType === "trial_popup_viewed") return "Saw trial popup";
  if (actionType === "trial_started") return "Started trial";
  if (actionType === "trial_canceled") return "Canceled trial";
  if (actionType === "trial_converted") return "Converted after trial";
  if (actionType === "user_signup") return "Created free account";
  if (actionType === "user_upgraded") return "Converted to Pro";
  if (actionType === "chapter_notes_viewed" || actionType === "study_notes_viewed") return "Opened study notes";
  if (actionType === "study_notes_section_opened") return "Opened study note section";
  if (actionType === "chapter_notes_reviewed") return "Completed notes task";
  if (actionType === "scrambled_chapter_opened") return "Started scrambled";
  if (actionType === "scrambled_chapter_completed") return "Completed scrambled";
  return actionType ? actionType.replaceAll("_", " ") : "Tracked action";
}

function getMasterActionDetail(action: MasterActionFunnelRow) {
  const label = action.action_label || "";
  const day = Number(action.journey_day || parseBibleYearDayFromLabel(label) || 0);
  const task = getTaskTypeFromAction(action);
  const pieces = [
    day ? `Day ${day}` : "",
    task ? `Task: ${task}` : "",
    label && !label.startsWith("BibleBuddy Funnel") ? label : "",
  ].filter(Boolean);
  return pieces.length ? pieces.join(" | ") : "Tracked in the master action log.";
}

function buildActiveUsersLast24Hours(masterRows: MasterActionFunnelRow[], profileByUserId: Map<string, string>) {
  const rowsByActor = new Map<string, {
    userId: string | null;
    sessionId: string | null;
    userLabel: string;
    actions: ActiveUserActionRow[];
  }>();

  for (const row of masterRows) {
    const createdAt = row.created_at || "";
    if (!createdAt) continue;

    const userId = row.user_id || null;
    const sessionId = row.session_id || null;
    const actorId = userId || sessionId || `${row.username || "unknown"}-${createdAt}`;
    const userLabel = userId
      ? profileByUserId.get(userId) || row.username || `User ${shortId(userId)}`
      : row.username || (sessionId ? `Guest ${shortId(sessionId)}` : "Unknown visitor");

    const current = rowsByActor.get(actorId) || {
      userId,
      sessionId,
      userLabel,
      actions: [],
    };

    current.actions.push({
      id: `${row.action_type || "action"}-${createdAt}-${current.actions.length}`,
      actionType: row.action_type || "tracked_action",
      title: getMasterActionTitle(row),
      detail: getMasterActionDetail(row),
      category: getMasterActionCategory(row.action_type || ""),
      dayNumber: Number(row.journey_day || parseBibleYearDayFromLabel(row.action_label || "") || 0) || null,
      taskType: getTaskTypeFromAction(row),
      createdAt,
    });
    rowsByActor.set(actorId, current);
  }

  const rows = Array.from(rowsByActor.entries())
    .map(([actorId, value]) => {
      const actions = value.actions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      const lastAction = actions[0];
      return {
        actorId,
        userId: value.userId,
        sessionId: value.sessionId,
        userLabel: value.userLabel,
        totalActions: actions.length,
        lastAction: lastAction?.title || "No action",
        lastActionDetail: lastAction?.detail || "",
        lastActionAt: lastAction?.createdAt || "",
        actions: actions.slice(0, 100),
      };
    })
    .sort((a, b) => b.lastActionAt.localeCompare(a.lastActionAt))
    .slice(0, 250);

  return {
    totalUsers: rows.length,
    totalActions: rows.reduce((sum, row) => sum + row.totalActions, 0),
    rows,
  };
}

function isBibleYearDayAction(row: MasterActionFunnelRow, dayNumber: number) {
  const day = Number(row.journey_day || parseBibleYearDayFromLabel(row.action_label || "") || 0);
  if (!day && dayNumber === 1 && isUnlabeledDayOneStartAction(row)) return true;
  return day === dayNumber;
}

function isUnlabeledDayOneStartAction(row: MasterActionFunnelRow) {
  const actionType = row.action_type || "";
  const hasDay = Boolean(Number(row.journey_day || parseBibleYearDayFromLabel(row.action_label || "") || 0));
  if (hasDay) return false;
  return (
    actionType === "bible_in_one_year_started" ||
    actionType === "bible_in_one_year_day_viewed" ||
    actionType === "bible_year_day_start_popup_clicked" ||
    actionType === "bible_year_audio_played" ||
    actionType === "bible_year_audio_progress" ||
    actionType === "bible_year_audio_completed"
  );
}

function isBibleYearStartedAction(row: MasterActionFunnelRow, dayNumber: number) {
  if (!isBibleYearDayAction(row, dayNumber)) return false;
  return (
    row.action_type === "bible_in_one_year_started" ||
    row.action_type === "bible_year_day_start_popup_clicked" ||
    row.action_type === "bible_year_task_started" ||
    row.action_type === "bible_in_one_year_day_viewed" ||
    row.action_type === "bible_year_audio_played" ||
    row.action_type === "bible_year_audio_progress" ||
    row.action_type === "bible_year_audio_completed"
  );
}

function isBibleYearCompletedAction(row: MasterActionFunnelRow, dayNumber: number) {
  if (!isBibleYearDayAction(row, dayNumber)) return false;
  return (
    row.action_type === "bible_year_task_completed" ||
    row.action_type === "bible_in_one_year_reading_completed" ||
    row.action_type === "bible_in_one_year_trivia_completed" ||
    row.action_type === "bible_in_one_year_reflection_completed"
  );
}

function buildNewUserFirstThreeDaysAnalytics(
  masterRows: MasterActionFunnelRow[],
  profileByUserId: Map<string, string>,
): NewUserFirstThreeDaysAnalytics {
  const nowMs = Date.now();
  const signupByUser = new Map<string, MasterActionFunnelRow>();
  for (const row of masterRows) {
    if (row.action_type !== "user_signup" || !row.user_id || !row.created_at) continue;
    const current = signupByUser.get(row.user_id);
    if (!current || (row.created_at || "") < (current.created_at || "")) signupByUser.set(row.user_id, row);
  }

  const actionsByUser = new Map<string, MasterActionFunnelRow[]>();
  for (const row of masterRows) {
    if (!row.user_id || !row.created_at) continue;
    const rows = actionsByUser.get(row.user_id) || [];
    rows.push(row);
    actionsByUser.set(row.user_id, rows);
  }

  const rows = Array.from(signupByUser.values()).map((signup) => {
    const userId = signup.user_id || "";
    const signupAtMs = signup.created_at ? new Date(signup.created_at).getTime() : 0;
    const dayOneEndsAt = signupAtMs + 24 * 60 * 60 * 1000;
    const dayThreeEndsAt = signupAtMs + 72 * 60 * 60 * 1000;
    const eligibleForThreeDayMetrics = Number.isFinite(signupAtMs) && nowMs >= dayThreeEndsAt;
    const userActions = (actionsByUser.get(userId) || [])
      .filter((row) => {
        const createdAt = row.created_at ? new Date(row.created_at).getTime() : 0;
        return Number.isFinite(createdAt) && createdAt >= signupAtMs;
      })
      .sort((a, b) => (a.created_at || "").localeCompare(b.created_at || ""));
    const firstThreeDayActions = userActions.filter((row) => {
      const createdAt = row.created_at ? new Date(row.created_at).getTime() : 0;
      return Number.isFinite(createdAt) && createdAt <= dayThreeEndsAt;
    });
    const meaningfulActions = firstThreeDayActions.filter((row) => row.action_type !== "user_signup");
    const firstAction = meaningfulActions[0] || null;
    const lastAction = meaningfulActions[meaningfulActions.length - 1] || firstAction;
    const day1Completed = firstThreeDayActions.some((row) => isBibleYearCompletedAction(row, 1));
    const day1Started = day1Completed || firstThreeDayActions.some((row) => isBibleYearStartedAction(row, 1));
    const reachedDay2 = firstThreeDayActions.some((row) => isBibleYearStartedAction(row, 2) || isBibleYearCompletedAction(row, 2));
    const reachedDay3 = firstThreeDayActions.some((row) => isBibleYearStartedAction(row, 3) || isBibleYearCompletedAction(row, 3));
    const returnedNextDay = meaningfulActions.some((row) => {
      const createdAt = row.created_at ? new Date(row.created_at).getTime() : 0;
      return Number.isFinite(createdAt) && createdAt >= dayOneEndsAt && createdAt <= dayThreeEndsAt;
    });
    const activeAfter72Hours = userActions.some((row) => {
      const createdAt = row.created_at ? new Date(row.created_at).getTime() : 0;
      return row.action_type !== "user_signup" && Number.isFinite(createdAt) && createdAt >= dayThreeEndsAt;
    });
    const status: NewUserFirstThreeDaysRow["status"] = reachedDay3 || day1Completed
      ? "activated"
      : returnedNextDay || reachedDay2
        ? "returned"
        : day1Started || meaningfulActions.length
          ? "stalled"
          : "dropped_off";

    return {
      userId,
      userLabel: profileByUserId.get(userId) || signup.username || `User ${shortId(userId)}`,
      signupAt: signup.created_at || "",
      eligibleForThreeDayMetrics,
      firstAction: firstAction ? getMasterActionTitle(firstAction) : "No action after signup",
      firstActionAt: firstAction?.created_at || null,
      day1Started,
      day1Completed,
      reachedDay2,
      reachedDay3,
      returnedNextDay,
      activeAfter72Hours,
      lastAction: lastAction ? getMasterActionTitle(lastAction) : "No action after signup",
      lastActionAt: lastAction?.created_at || null,
      status,
      statusLabel: status === "activated" ? "Activated" : status === "returned" ? "Returned" : status === "stalled" ? "Stalled" : "Dropped Off",
    };
  }).sort((a, b) => (b.signupAt || "").localeCompare(a.signupAt || ""));

  const totalNewAccounts = rows.length;
  const eligibleRows = rows.filter((row) => row.eligibleForThreeDayMetrics);
  const eligibleAccounts = eligibleRows.length;
  const stillMaturingAccounts = totalNewAccounts - eligibleAccounts;
  const startedDay1 = eligibleRows.filter((row) => row.day1Started).length;
  const completedDay1 = eligibleRows.filter((row) => row.day1Completed).length;
  const reachedDay2 = eligibleRows.filter((row) => row.reachedDay2).length;
  const reachedDay3 = eligibleRows.filter((row) => row.reachedDay3).length;
  const returnedNextDay = eligibleRows.filter((row) => row.returnedNextDay).length;
  const activeAfter72Hours = eligibleRows.filter((row) => row.activeAfter72Hours).length;

  return {
    totalNewAccounts,
    eligibleAccounts,
    stillMaturingAccounts,
    startedDay1,
    completedDay1,
    reachedDay2,
    reachedDay3,
    returnedNextDay,
    activeAfter72Hours,
    activationRate: percent(startedDay1, eligibleAccounts),
    day1CompletionRate: percent(completedDay1, eligibleAccounts),
    day2ReachRate: percent(reachedDay2, eligibleAccounts),
    day3ReachRate: percent(reachedDay3, eligibleAccounts),
    commonDropoffs: [
      { key: "maturing", label: "Still inside first 72 hours", count: stillMaturingAccounts },
      { key: "no_action", label: "Signed up but did nothing", count: eligibleRows.filter((row) => row.status === "dropped_off").length },
      { key: "started_not_finished", label: "Started Day 1 but did not finish", count: eligibleRows.filter((row) => row.day1Started && !row.day1Completed).length },
      { key: "finished_not_returned", label: "Finished Day 1 but did not return", count: eligibleRows.filter((row) => row.day1Completed && !row.returnedNextDay).length },
      { key: "returned_not_day2", label: "Returned but did not reach Day 2", count: eligibleRows.filter((row) => row.returnedNextDay && !row.reachedDay2).length },
    ],
    rows: rows.slice(0, 100),
  };
}

function buildTimelineEvent(
  base: Omit<VisitorJourneyTimelineEvent, "timeSinceFirstLabel" | "timeSincePreviousLabel">,
  firstTime: number,
  previousTime: number | null,
): VisitorJourneyTimelineEvent {
  const time = new Date(base.timestamp).getTime();
  return {
    ...base,
    timeSinceFirstLabel: Number.isFinite(time) && Number.isFinite(firstTime) && time > firstTime ? `${formatDuration(time - firstTime)} after landing` : null,
    timeSincePreviousLabel: previousTime && Number.isFinite(time) && time > previousTime ? formatTimelineDelta(time - previousTime) : null,
  };
}

function getJourneyDisplaySource(row: LandingEventRow | undefined) {
  const primary = normalizeJourneySource(row?.source);
  if (primary !== "Unknown") return primary;
  return normalizeJourneySource(row?.referrer);
}

function getStatusLabel(status: VisitorJourneyStatus) {
  const labels: Record<VisitorJourneyStatus, string> = {
    active: "Active",
    finished_onboarding: "Started journey",
    onboarding_only: "Clicked Create Free Account",
    day_1_in_progress: "Started Day 1",
    day_1_completed: "Day 1 completed",
    created_account: "Created account",
    upgraded: "Upgraded",
    dropped_off: "Drop off",
  };
  return labels[status];
}

function buildVisitorJourneys(
  rows: LandingEventRow[],
  progressRows: BibleYearProgressRow[],
  taskActionRows: BibleYearTaskActionRow[],
  masterRows: MasterActionFunnelRow[],
  upgradeRows: UpgradeActionRow[],
  profileByUserId: Map<string, string>,
  profileSummaryByUserId: Map<string, ProfileSummary>,
  windowKey: JourneyWindowKey,
) {
  const range = getAnalyticsDateRange(windowKey);
  const since = new Date(range.startIso).getTime();
  const before = range.endIso ? new Date(range.endIso).getTime() : null;
  const validRows = rows
    .filter((row) => {
      const createdAt = typeof row.created_at === "string" ? new Date(row.created_at).getTime() : 0;
      return Number.isFinite(createdAt) && createdAt >= since && (!before || createdAt < before);
    })
    .sort((a, b) => {
      const left = typeof a.created_at === "string" ? new Date(a.created_at).getTime() : 0;
      const right = typeof b.created_at === "string" ? new Date(b.created_at).getTime() : 0;
      return left - right;
    });

  const progressByUser = new Map<string, BibleYearProgressRow[]>();
  for (const row of progressRows) {
    if (!row.user_id) continue;
    const current = progressByUser.get(row.user_id) || [];
    current.push(row);
    progressByUser.set(row.user_id, current);
  }

  const taskActionsByUser = new Map<string, BibleYearTaskActionRow[]>();
  for (const row of taskActionRows) {
    if (!row.user_id) continue;
    const current = taskActionsByUser.get(row.user_id) || [];
    current.push(row);
    taskActionsByUser.set(row.user_id, current);
  }

  const masterActionsByUser = new Map<string, MasterActionFunnelRow[]>();
  const masterActionsBySession = new Map<string, MasterActionFunnelRow[]>();
  for (const row of masterRows) {
    if (row.user_id) {
      const current = masterActionsByUser.get(row.user_id) || [];
      current.push(row);
      masterActionsByUser.set(row.user_id, current);
    }
    if (row.session_id) {
      const current = masterActionsBySession.get(row.session_id) || [];
      current.push(row);
      masterActionsBySession.set(row.session_id, current);
    }
  }

  const upgradeByUser = new Map<string, UpgradeActionRow>();
  for (const row of upgradeRows) {
    if (!row.user_id) continue;
    const current = upgradeByUser.get(row.user_id);
    if (!current || (row.created_at || "") > (current.created_at || "")) {
      upgradeByUser.set(row.user_id, row);
    }
  }

  const sessions = new Map<string, LandingEventRow[]>();
  for (const row of validRows) {
    const sessionId = typeof row.session_id === "string" && row.session_id ? row.session_id : `no-session-${row.user_id || row.created_at || Math.random()}`;
    if (!sessions.has(sessionId)) sessions.set(sessionId, []);
    sessions.get(sessionId)?.push(row);
  }

  const guestNumberBySession = new Map<string, number>();
  Array.from(sessions.entries())
    .map(([sessionId, sessionRows]) => ({
      sessionId,
      completedAt: sessionRows.find((row) => row.event_name === "started_guest_journey")?.created_at || null,
    }))
    .filter((item): item is { sessionId: string; completedAt: string } => Boolean(item.completedAt))
    .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
    .forEach((item, index) => {
      guestNumberBySession.set(item.sessionId, index + 1);
    });

  const rowsOut: VisitorJourneyRow[] = Array.from(sessions.entries()).map(([sessionId, sessionRows]) => {
    const firstRow = sessionRows[0];
    const lastRow = sessionRows[sessionRows.length - 1];
    const userId = sessionRows.map((row) => row.user_id).find((id): id is string => Boolean(id)) || null;
    const userLabel = userId ? profileByUserId.get(userId) || `User ${shortId(userId)}` : "Guest visitor";
    const eventNames = new Set(sessionRows.map((row) => row.event_name || ""));
    const relatedMasterRows = [
      ...(masterActionsBySession.get(sessionId) || []),
      ...(userId ? masterActionsByUser.get(userId) || [] : []),
    ].filter((row, index, allRows) => {
      const key = `${row.action_type || ""}-${row.action_label || ""}-${row.created_at || ""}`;
      return allRows.findIndex((candidate) => `${candidate.action_type || ""}-${candidate.action_label || ""}-${candidate.created_at || ""}` === key) === index;
    });
    const userProgressRows = userId ? progressByUser.get(userId) || [] : [];
    const userTaskActionRows = userId ? taskActionsByUser.get(userId) || [] : [];
    const dayOneRows = userProgressRows.filter((row) => Number(row.day_number || 0) === 1);
    const dayOneStartedAt =
      userTaskActionRows
        .filter((row) =>
          row.action_label?.startsWith("Bible in One Year Day 1 Video:") ||
          row.action_label?.startsWith("Bible in One Year Day 1 Reading:") ||
          /^Day\s+1\s+Task\s+1\s+started/i.test(row.action_label || "")
        )
        .map((row) => row.created_at)
        .filter((value): value is string => Boolean(value))
        .sort()[0] || null;
    const completedProgressRows = userProgressRows.filter((row) => row.reading_completed && row.study_notes_completed && row.trivia_completed && row.reflection_completed);
    const completedDayNumbers = completedProgressRows
      .map((row) => Number(row.day_number || 0))
      .filter((day) => day > 0);
    const lastCompletedDay = completedDayNumbers.length ? Math.max(...completedDayNumbers) : null;
    const lastCompletedDayRow = lastCompletedDay ? completedProgressRows.find((row) => Number(row.day_number || 0) === lastCompletedDay) : null;
    const dayOneCompletedAt = completedProgressRows
      .filter((row) => Number(row.day_number || 0) === 1)
      .map((row) => row.updated_at)
      .filter((value): value is string => Boolean(value))
      .sort()
      .at(-1) || null;
    const lastCompletedDayAt = lastCompletedDayRow?.updated_at || dayOneCompletedAt;
    const accountEvent = sessionRows.find((row) => isAccountEvent(row.event_name || ""));
    const profile = userId ? profileSummaryByUserId.get(userId) : null;
    const createdAccountAt =
      accountEvent?.created_at ||
      profile?.convertedFromGuestAt ||
      profile?.registeredAt ||
      null;
    const upgradeAt = userId ? upgradeByUser.get(userId)?.created_at || null : null;
    const onboardingCompletedAt = sessionRows.find((row) => row.event_name === "started_guest_journey")?.created_at || null;
    const dashboardCompletedRow = relatedMasterRows
      .filter((row) => row.action_type === "dashboard_tour_completed" && row.created_at)
      .sort((a, b) => new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime())
      .at(-1);
    const dashboardCompletedAt = dashboardCompletedRow?.created_at || null;
    const lastActiveAt = lastRow?.created_at || firstRow?.created_at || new Date().toISOString();
    const firstActiveAt = firstRow?.created_at || lastActiveAt;
    const timeSpentMs = Math.max(0, new Date(lastActiveAt).getTime() - new Date(firstActiveAt).getTime());
    const landingStepStatusLabel = getLandingStepStatusLabel(sessionRows, false);
    const hasOnboardingProgress = landingStepStatusLabel !== "Just visited";

    let status: VisitorJourneyStatus = "active";
    if (upgradeAt) status = "upgraded";
    else if (lastCompletedDayAt) status = "day_1_completed";
    else if (createdAccountAt) status = "created_account";
    else if (dayOneStartedAt) status = "day_1_in_progress";
    else if (dashboardCompletedAt || onboardingCompletedAt) status = "finished_onboarding";
    else if (hasOnboardingProgress) status = "onboarding_only";
    if (!dashboardCompletedAt && !onboardingCompletedAt && !hasOnboardingProgress) {
      status = "dropped_off";
    }

    const accountType: VisitorJourneyRow["accountType"] = upgradeAt || profile?.isPaid ? "pro" : createdAccountAt ? "free" : "guest";
    const lastInfo = lastRow ? getLandingActivityInfo(lastRow) : null;
    const lastMeaningfulLandingRow = getLastMeaningfulLandingRow(sessionRows);
    const lastMeaningfulLandingInfo = lastMeaningfulLandingRow ? getLandingActivityInfo(lastMeaningfulLandingRow) : lastInfo;
    const stepStatusLabel = status === "dropped_off" || status === "onboarding_only"
      ? landingStepStatusLabel
      : getStatusLabel(status);
    const currentMilestoneTitle =
      upgradeAt ? "Converted to Pro" :
      lastCompletedDay ? `Day ${lastCompletedDay} completed` :
      createdAccountAt ? "Created free account" :
      dayOneStartedAt ? "Started Day 1" :
      dashboardCompletedAt || onboardingCompletedAt ? "Started journey" :
      status === "dropped_off" ? stepStatusLabel || lastMeaningfulLandingInfo?.title || "Unknown" :
      getStatusLabel(status);
    const currentEventName =
      upgradeAt ? "user_upgraded" :
      lastCompletedDay ? `day_${lastCompletedDay}_completed` :
      createdAccountAt ? "created_account_successfully" :
      dayOneStartedAt ? "bible_year_task_started" :
      dashboardCompletedAt || onboardingCompletedAt ? "started_journey" :
      lastMeaningfulLandingRow?.event_name || lastRow?.event_name || "";
    const guestNumber = guestNumberBySession.get(sessionId);
    let keptLandingVisit = false;
    const timelineLandingRows = sessionRows.filter((row) => {
      if (!isLandingVisitEvent(row.event_name || "")) return true;
      if (keptLandingVisit) return false;
      keptLandingVisit = true;
      return true;
    });
    const rawTimeline = [
      ...timelineLandingRows
        .filter((row) => {
          const eventName = row.event_name || "";
          return eventName === "landing_page_visit" ||
            eventName === "clicked_start_journey" ||
            eventName === "started_onboarding" ||
            eventName === "viewed_onboarding_intro" ||
            eventName === "started_guest_journey" ||
            isAccountEvent(eventName);
        })
        .map((row, index) => {
        const info = getLandingActivityInfo(row);
        const eventName = row.event_name || "";
        const isStartClick = eventName === "clicked_start_journey" || eventName === "started_onboarding" || eventName === "viewed_onboarding_intro" || eventName === "started_guest_journey";
        const title = isStartClick ? "Clicked Create Free Account" : isAccountEvent(eventName) ? "Created account" : info.title;
        return {
          id: `landing-${row.event_name || "event"}-${row.created_at || index}`,
          title,
          eventName: eventName === "started_guest_journey" ? "clicked_start_journey" : eventName,
          category: row.event_name === "landing_page_visit" ? "landing" as const : isAccountEvent(eventName) ? "account" as const : "landing" as const,
          status: info.category === "dropoff" ? "dropped" as const : "completed" as const,
          timestamp: row.created_at || new Date().toISOString(),
          detail: isStartClick ? "Visitor clicked Create Free Account." : isAccountEvent(eventName) ? "Visitor created a Bible Buddy account." : info.detail,
          dayNumber: null,
          taskType: null,
        };
      }),
      ...relatedMasterRows
        .filter((row) => ![
          "landing_page_visited",
          "landing_cta_clicked",
          "onboarding_intro_viewed",
          "onboarding_intro_started",
          "onboarding_intro_skipped",
          "onboarding_question_completed",
          "onboarding_results_viewed",
          "onboarding_journey_started",
        ].includes(row.action_type || ""))
        .filter((row) => {
          if (row.action_type === "user_upgraded") return true;
          if (row.action_type !== "user_signup") return false;
          return !accountEvent;
        })
        .map((row, index) => {
          const actionType = row.action_type || "";
          const dayNumber = Number(row.journey_day || parseBibleYearDayFromLabel(row.action_label || "") || 0);
          const category = getMasterActionCategory(actionType);
          const status: VisitorJourneyTimelineEvent["status"] =
            actionType.includes("dismissed") || actionType.includes("skipped") ? "warning" : "completed";
          return {
            id: `master-${actionType}-${row.created_at || index}`,
            title: getMasterActionTitle(row),
            eventName: actionType,
            category,
            status,
            timestamp: row.created_at || new Date().toISOString(),
            detail: getMasterActionDetail(row),
            dayNumber: dayNumber || null,
            taskType: getTaskTypeFromAction(row),
          };
        }),
      ...completedProgressRows
        .filter((row) => row.reading_completed && row.study_notes_completed && row.trivia_completed && row.reflection_completed)
        .filter((row) => Number(row.day_number || 0) >= 1 && Number(row.day_number || 0) <= 7)
        .map((row) => ({
          id: `progress-day-complete-${row.day_number}-${row.updated_at || row.user_id}`,
          title: `Finished Day ${row.day_number}`,
          eventName: `day_${row.day_number}_completed`,
          category: "bible_year" as const,
          status: "completed" as const,
          timestamp: row.updated_at || new Date().toISOString(),
          detail: `Day ${row.day_number} completed.`,
          dayNumber: Number(row.day_number || 0) || null,
          taskType: "day_complete",
        })),
    ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    const timelineFirstTime = rawTimeline[0]?.timestamp ? new Date(rawTimeline[0].timestamp).getTime() : new Date(firstActiveAt).getTime();
    let timelinePreviousTime: number | null = null;
    const timeline = rawTimeline.map((event) => {
      const built = buildTimelineEvent(event, timelineFirstTime, timelinePreviousTime);
      const eventTime = new Date(event.timestamp).getTime();
      if (Number.isFinite(eventTime)) timelinePreviousTime = eventTime;
      return built;
    });
    const startedDayNumbers = userProgressRows
      .map((row) => Number(row.day_number || 0))
      .filter((day) => day > 0);
    const currentDay = startedDayNumbers.length ? Math.max(...startedDayNumbers) : lastCompletedDay;
    const trialActive = profile?.memberBadge === "pro_trial" || Boolean(profile?.proExpiresAt && new Date(profile.proExpiresAt).getTime() > Date.now());
    const details: VisitorJourneyDetails = {
      visitorId: onboardingCompletedAt && guestNumber ? `Bible Buddy Guest #${guestNumber}` : `Drop off ${shortId(sessionId)}`,
      accountType,
      trialStatus: trialActive ? "Active trial" : profile?.proExpiresAt ? "Trial expired" : "No trial",
      badgeStatus: profile?.memberBadge || (profile?.isPaid ? "pro" : "none"),
      deviceType: "Unknown",
      country: "Unknown",
      source: getJourneyDisplaySource(firstRow),
      firstVisitAt: firstActiveAt,
      totalTimeLabel: formatDuration(timeSpentMs),
      daysActive: Math.max(1, Math.ceil(Math.max(0, new Date(lastActiveAt).getTime() - new Date(firstActiveAt).getTime()) / (24 * 60 * 60 * 1000))),
      currentStudy: "Bible in One Year",
      currentDay,
      lastCompletedDay,
      streak: profile?.currentStreak ?? null,
      xp: profile?.totalActions ?? null,
      level: profile?.currentLevel ?? null,
      dropoffReason: status === "dropped_off" ? stepStatusLabel : "Still moving",
    };

    return {
      id: sessionId,
      visitorLabel: onboardingCompletedAt && guestNumber ? `Bible Buddy Guest #${guestNumber}` : "Drop off",
      sessionId,
      userId,
      userLabel,
      journeySelected: getJourneyLabelFromEvents(sessionRows),
      onboardingCompletedAt,
      startedDay1At: dayOneStartedAt,
      completedDay1At: dayOneCompletedAt,
      createdAccountAt,
      upgradedAt: upgradeAt,
      currentStatus: status,
      currentStatusLabel: lastCompletedDay ? `Day ${lastCompletedDay} completed` : stepStatusLabel,
      source: getJourneyDisplaySource(firstRow),
      referrer: typeof firstRow?.referrer === "string" && firstRow.referrer ? firstRow.referrer : null,
      lastActiveAt,
      lastEventName: currentEventName,
      timeSpentMs,
      timeSpentLabel: formatDuration(timeSpentMs),
      dropoffStep: currentMilestoneTitle,
      accountType,
      timeline,
      details,
    };
  }).sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());

  const totalVisitors = rowsOut.length;
  const finishedOnboarding = rowsOut.filter((row) => Boolean(row.onboardingCompletedAt)).length;
  const startedDay1 = rowsOut.filter((row) => Boolean(row.startedDay1At)).length;
  const completedDay1 = rowsOut.filter((row) => Boolean(row.completedDay1At)).length;
  const createdAccountActors = new Set(
    rowsOut
      .filter((row) => Boolean(row.createdAccountAt))
      .map((row) => row.userId || row.sessionId)
      .filter(Boolean),
  );
  const createdFreeAccount = createdAccountActors.size;
  const upgradedToPro = rowsOut.filter((row) => Boolean(row.upgradedAt)).length;

  return {
    rows: rowsOut.slice(0, 100),
    metrics: {
      totalVisitors,
      finishedOnboarding,
      startedDay1,
      completedDay1,
      createdFreeAccount,
      upgradedToPro,
      onboardingCompletionRate: totalVisitors > 0 ? Number(((finishedOnboarding / totalVisitors) * 100).toFixed(1)) : 0,
      day1StartRate: finishedOnboarding > 0 ? Number(((startedDay1 / finishedOnboarding) * 100).toFixed(1)) : 0,
      day1CompletionRate: finishedOnboarding > 0 ? Number(((completedDay1 / finishedOnboarding) * 100).toFixed(1)) : 0,
      freeAccountRate: totalVisitors > 0 ? Number(((createdFreeAccount / totalVisitors) * 100).toFixed(1)) : 0,
      proUpgradeRate: totalVisitors > 0 ? Number(((upgradedToPro / totalVisitors) * 100).toFixed(1)) : 0,
    },
    sources: Array.from(new Set(rowsOut.map((row) => row.source))).sort(),
    journeys: ["Bible in One Year"],
    statuses: ([
      "active",
      "finished_onboarding",
      "onboarding_only",
      "day_1_in_progress",
      "day_1_completed",
      "created_account",
      "upgraded",
      "dropped_off",
    ] as VisitorJourneyStatus[]).map((key) => ({ key, label: getStatusLabel(key) })),
  };
}

function buildBibleYearDayAnalytics(
  _progressRows: BibleYearProgressRow[],
  masterRows: MasterActionFunnelRow[],
  videoProgressRows: VideoProgressAnalyticsRow[],
  profileByUserId: Map<string, string>,
) {
  const dayActors = new Map<number, Map<string, {
    userId: string;
    userLabel: string;
    readingStarted: boolean;
    triviaStarted: boolean;
    reflectionStarted: boolean;
    readingCompleted: boolean;
    triviaCompleted: boolean;
    reflectionCompleted: boolean;
    task1StartEvent: string | null;
    task1FinishEvent: string | null;
    task2StartEvent: string | null;
    task2FinishEvent: string | null;
    task3StartEvent: string | null;
    task3FinishEvent: string | null;
    videoWatchedSeconds: number;
    videoDurationSeconds: number;
    videoCompleted: boolean;
    updatedAt: string | null;
  }>>();

  function getOrCreateDayActor(dayNumber: number, actorId: string, row: MasterActionFunnelRow) {
    const actors = dayActors.get(dayNumber) || new Map<string, {
      userId: string;
      userLabel: string;
      readingStarted: boolean;
      triviaStarted: boolean;
      reflectionStarted: boolean;
      readingCompleted: boolean;
      triviaCompleted: boolean;
      reflectionCompleted: boolean;
      task1StartEvent: string | null;
      task1FinishEvent: string | null;
      task2StartEvent: string | null;
      task2FinishEvent: string | null;
      task3StartEvent: string | null;
      task3FinishEvent: string | null;
      videoWatchedSeconds: number;
      videoDurationSeconds: number;
      videoCompleted: boolean;
      updatedAt: string | null;
    }>();
    const existing = actors.get(actorId);
    if (existing) return existing;

    const next = {
      userId: actorId,
      userLabel: profileByUserId.get(actorId) || row.username || `User ${shortId(actorId)}`,
      readingStarted: false,
      triviaStarted: false,
      reflectionStarted: false,
      readingCompleted: false,
      triviaCompleted: false,
      reflectionCompleted: false,
      task1StartEvent: null,
      task1FinishEvent: null,
      task2StartEvent: null,
      task2FinishEvent: null,
      task3StartEvent: null,
      task3FinishEvent: null,
      videoWatchedSeconds: 0,
      videoDurationSeconds: 0,
      videoCompleted: false,
      updatedAt: null,
    };
    actors.set(actorId, next);
    dayActors.set(dayNumber, actors);
    return next;
  }

  for (const row of masterRows) {
    const actionLabel = String(row.action_label || "");
    const label = actionLabel.toLowerCase();
    const metadata = row.event_metadata && typeof row.event_metadata === "object" ? row.event_metadata : {};
    const task = typeof metadata.task === "string" ? metadata.task.toLowerCase() : "";
    const dayNumber = Number(row.journey_day || parseBibleYearDayFromLabel(actionLabel) || 0);
    if (!dayNumber) continue;
    const actorId = getMasterActorId(row);
    if (!actorId) continue;
    const actor = getOrCreateDayActor(dayNumber, actorId, row);
    if (!actor.updatedAt || (row.created_at || "") > actor.updatedAt) actor.updatedAt = row.created_at || null;

    const taskNumber = typeof metadata.taskNumber === "number" ? metadata.taskNumber : null;
    const startedTaskNumber =
      taskNumber ||
      (label.includes("task 1 started") ? 1 : null) ||
      (label.includes("task 2 started") ? 2 : null) ||
      (label.includes("task 3 started") ? 3 : null);
    if (row.action_type === "bible_year_task_started") {
      if (startedTaskNumber === 1 || task === "reading" || label.includes("reading started") || label.includes("video started")) {
        actor.readingStarted = true;
        actor.task1StartEvent = getCanonicalEventNameFromAction(row, dayNumber, 1);
      }
      if (startedTaskNumber === 2 || task === "reflection" || label.includes("summary") || label.includes("study notes")) {
        actor.reflectionStarted = true;
        actor.task2StartEvent = getCanonicalEventNameFromAction(row, dayNumber, 2);
      }
      if (startedTaskNumber === 3 || task === "trivia" || label.includes("trivia started")) {
        actor.triviaStarted = true;
        actor.task3StartEvent = getCanonicalEventNameFromAction(row, dayNumber, 3);
      }
    }
    if (row.action_type === "bible_in_one_year_reading_completed") {
      actor.readingCompleted = true;
      actor.task1FinishEvent = getCanonicalEventNameFromAction(row, dayNumber, 1);
    }
    if (row.action_type === "bible_in_one_year_trivia_completed") {
      actor.triviaCompleted = true;
      actor.task3FinishEvent = getCanonicalEventNameFromAction(row, dayNumber, 3);
    }
    if (row.action_type === "bible_in_one_year_reflection_completed") {
      actor.reflectionCompleted = true;
      actor.task2FinishEvent = getCanonicalEventNameFromAction(row, dayNumber, 2);
    }
  }

  for (const row of videoProgressRows) {
    const dayNumber = parseBibleYearDayFromVideoId(row.video_id);
    if (!dayNumber) continue;
    const actorId = typeof row.user_id === "string" ? row.user_id : "";
    if (!actorId) continue;

    const actor = getOrCreateDayActor(dayNumber, actorId, {
      user_id: actorId,
      username: profileByUserId.get(actorId) || `User ${shortId(actorId)}`,
      created_at: row.updated_at || null,
    });

    const watchedSeconds = Number(row.current_time ?? 0);
    const durationSeconds = Number(row.duration ?? 0);
    const updatedAt = row.updated_at || null;

    actor.videoWatchedSeconds = Math.max(actor.videoWatchedSeconds, Number.isFinite(watchedSeconds) ? watchedSeconds : 0);
    actor.videoDurationSeconds = Math.max(actor.videoDurationSeconds, Number.isFinite(durationSeconds) ? durationSeconds : 0);
    actor.videoCompleted = actor.videoCompleted || row.completed === true;
    actor.readingStarted = actor.readingStarted || actor.videoWatchedSeconds > 0;
    actor.task1StartEvent = actor.task1StartEvent || `youtube_watch_day_${dayNumber}`;
    if (!actor.updatedAt || (updatedAt || "") > actor.updatedAt) actor.updatedAt = updatedAt;
  }

  return Array.from(dayActors.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([dayNumber, actorMap]) => {
      const actorRows = Array.from(actorMap.values());
      actorRows.forEach((row) => {
        if ((row.readingCompleted || row.triviaCompleted) && !row.readingStarted) {
          row.readingStarted = true;
          row.task1StartEvent = row.task1StartEvent || row.task1FinishEvent || `day_${dayNumber}_task_1_started_inferred`;
        }
        if ((row.reflectionCompleted || row.triviaCompleted) && !row.reflectionStarted) {
          row.reflectionStarted = true;
          row.task2StartEvent = row.task2StartEvent || row.task2FinishEvent || `day_${dayNumber}_task_2_started_inferred`;
        }
        if (row.triviaCompleted && !row.triviaStarted) {
          row.triviaStarted = true;
          row.task3StartEvent = row.task3StartEvent || row.task3FinishEvent || `day_${dayNumber}_task_3_started_inferred`;
        }
      });
      const users: BibleYearDayUserRow[] = actorRows
        .map((row) => ({
          userId: row.userId,
          userLabel: row.userLabel,
          readingStarted: row.readingStarted,
          triviaStarted: row.triviaStarted,
          reflectionStarted: row.reflectionStarted,
          readingCompleted: row.readingCompleted,
          triviaCompleted: row.triviaCompleted,
          reflectionCompleted: row.reflectionCompleted,
          task1StartEvent: row.task1StartEvent,
          task1FinishEvent: row.task1FinishEvent,
          task2StartEvent: row.task2StartEvent,
          task2FinishEvent: row.task2FinishEvent,
          task3StartEvent: row.task3StartEvent,
          task3FinishEvent: row.task3FinishEvent,
          videoWatchedSeconds: row.videoWatchedSeconds,
          videoDurationSeconds: row.videoDurationSeconds,
          videoWatchPercent:
            row.videoDurationSeconds > 0
              ? Number(Math.min(100, (row.videoWatchedSeconds / row.videoDurationSeconds) * 100).toFixed(1))
              : 0,
          videoCompleted: row.videoCompleted,
          completed: row.triviaCompleted,
          updatedAt: row.updatedAt,
        }))
        .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""))
        .slice(0, 75);

      const startedUsers = actorRows.filter((row) => row.readingStarted).length;
      const readingCompleted = actorRows.filter((row) => row.readingCompleted).length;
      const triviaCompleted = actorRows.filter((row) => row.triviaCompleted).length;
      const reflectionCompleted = actorRows.filter((row) => row.reflectionCompleted).length;
      const videoWatchUsers = actorRows.filter((row) => row.videoWatchedSeconds > 0).length;
      const videoCompletedUsers = actorRows.filter((row) => row.videoCompleted).length;
      const totalWatchSeconds = actorRows.reduce((total, row) => total + row.videoWatchedSeconds, 0);
      const completedUsers = triviaCompleted;
      const lastActiveAt = actorRows
        .map((row) => row.updatedAt || "")
        .filter(Boolean)
        .sort()
        .at(-1) || null;

      return {
        dayNumber,
        startedUsers,
        completedUsers,
        inProgressUsers: Math.max(0, startedUsers - completedUsers),
        readingCompleted,
        triviaCompleted,
        reflectionCompleted,
        videoWatchUsers,
        videoCompletedUsers,
        totalWatchSeconds,
        averageWatchSeconds: videoWatchUsers > 0 ? Math.round(totalWatchSeconds / videoWatchUsers) : 0,
        completionRate: startedUsers > 0 ? Number(Math.min(100, (completedUsers / startedUsers) * 100).toFixed(1)) : 0,
        lastActiveAt,
        users,
      };
    });
}

function buildStudyNotesAnalytics(rows: StudyNotesActionRow[], profileByUserId: Map<string, string>) {
  const noteCounts = new Map<string, { label: string; opens: number; users: Set<string>; lastOpenedAt: string | null }>();
  const phraseCounts = new Map<string, { label: string; sectionLabel: string; opens: number; users: Set<string>; lastOpenedAt: string | null }>();
  const sourceCounts = new Map<string, number>();

  const activity = rows
    .filter((row) => row.created_at)
    .map((row, index) => {
      const parsed = parseStudyNotesLabel(row.action_label);
      const metadata = row.event_metadata || {};
      const readerLabel = parseReaderStudyNotesLabel(row.action_label);
      const phraseOpen = isReaderPhraseOpen(row);
      const rawLabel = row.action_label || "Study notes";
      const metadataSectionTitle = getMetadataText(metadata, "sectionTitle");
      const metadataSectionReference = getMetadataText(metadata, "sectionReference");
      const metadataPhraseTitle = getMetadataText(metadata, "phraseTitle");
      const metadataPhraseKey = getMetadataText(metadata, "phraseKey");
      const noteTitle =
        metadataSectionTitle ||
        parsed?.sectionTitle ||
        parsed?.contentLabel ||
        parsed?.itemTitle ||
        (readerLabel.sectionKey ? titleFromSlug(readerLabel.sectionKey) : rawLabel);
      const noteKey = metadataSectionReference || parsed?.sectionReference || parsed?.itemKey || readerLabel.sectionKey || noteTitle;
      const phraseTitle = metadataPhraseTitle || (readerLabel.phraseKey ? titleFromSlug(readerLabel.phraseKey) : "");
      const phraseKey = metadataPhraseKey || readerLabel.phraseKey || "";
      const source = getMetadataText(metadata, "sourceLabel") || parsed?.sourceLabel || parsed?.source || "Bible study notes";
      const userId = row.user_id || "";
      const userLabel = userId ? profileByUserId.get(userId) || row.username || `User ${shortId(userId)}` : row.username || "Unknown user";
      const openedAt = row.created_at || new Date().toISOString();

      if (phraseOpen && phraseTitle) {
        const phraseSummary = phraseCounts.get(`${noteKey}:${phraseKey || phraseTitle}`) || {
          label: phraseTitle,
          sectionLabel: noteTitle,
          opens: 0,
          users: new Set<string>(),
          lastOpenedAt: null,
        };
        phraseSummary.opens += 1;
        if (userId) phraseSummary.users.add(userId);
        if (!phraseSummary.lastOpenedAt || openedAt > phraseSummary.lastOpenedAt) phraseSummary.lastOpenedAt = openedAt;
        phraseCounts.set(`${noteKey}:${phraseKey || phraseTitle}`, phraseSummary);
      } else {
        const noteSummary = noteCounts.get(noteKey) || { label: noteTitle, opens: 0, users: new Set<string>(), lastOpenedAt: null };
        noteSummary.opens += 1;
        if (userId) noteSummary.users.add(userId);
        if (!noteSummary.lastOpenedAt || openedAt > noteSummary.lastOpenedAt) noteSummary.lastOpenedAt = openedAt;
        noteCounts.set(noteKey, noteSummary);
      }

      sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);

      return {
        id: `${row.action_type || "study_notes"}-${openedAt}-${userId || index}`,
        userId: userId || null,
        userLabel,
        eventType: row.action_type || "study_notes_viewed",
        eventLabel: phraseOpen ? "Phrase opened" : row.action_type === "study_notes_section_opened" ? "Section opened" : "Study notes opened",
        noteTitle,
        phraseTitle: phraseOpen ? phraseTitle : "",
        source,
        reference: metadataSectionReference || parsed?.sectionReference || parsed?.itemKey || readerLabel.sectionKey || "",
        sectionTitle: metadataSectionTitle || parsed?.sectionTitle || "",
        openedAt,
      };
    })
    .sort((a, b) => b.openedAt.localeCompare(a.openedAt));

  const noteOpenRows = activity.filter((row) => row.eventLabel !== "Phrase opened");
  const phraseOpenRows = activity.filter((row) => row.eventLabel === "Phrase opened");
  const topNotes = Array.from(noteCounts.entries())
    .map(([key, value]) => ({
      key,
      label: value.label,
      opens: value.opens,
      uniqueUsers: value.users.size,
      lastOpenedAt: value.lastOpenedAt,
    }))
    .sort((a, b) => b.opens - a.opens || (b.lastOpenedAt || "").localeCompare(a.lastOpenedAt || ""))
    .slice(0, 20);

  const topPhrases = Array.from(phraseCounts.entries())
    .map(([key, value]) => ({
      key,
      label: value.label,
      sectionLabel: value.sectionLabel,
      opens: value.opens,
      uniqueUsers: value.users.size,
      lastOpenedAt: value.lastOpenedAt,
    }))
    .sort((a, b) => b.opens - a.opens || (b.lastOpenedAt || "").localeCompare(a.lastOpenedAt || ""))
    .slice(0, 20);

  return {
    totalOpens: noteOpenRows.length,
    totalInteractions: activity.length,
    uniqueUsers: new Set(activity.map((row) => row.userId).filter(Boolean)).size,
    sectionOpens: noteOpenRows.filter((row) => row.eventType === "study_notes_section_opened").length,
    chapterNoteOpens: noteOpenRows.filter((row) => row.eventType === "chapter_notes_viewed").length,
    phraseOpens: phraseOpenRows.length,
    topSources: Array.from(sourceCounts.entries()).map(([source, opens]) => ({ source, opens })).sort((a, b) => b.opens - a.opens).slice(0, 8),
    topNotes,
    topPhrases,
    rows: activity.slice(0, 250),
  };
}

async function loadAuthUserSummaries(url: string, serviceKey: string, targetUserIds: string[]) {
  const targetSet = new Set(targetUserIds);
  const usersById = new Map<string, AuthUserSummary>();
  if (targetSet.size === 0) return usersById;

  let page = 1;
  const perPage = 1000;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${url}/auth/v1/admin/users?page=${page}&per_page=${perPage}`, {
      headers: {
        apiKey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });

    if (!response.ok) break;
    const json = await response.json();
    const users = Array.isArray(json.users) ? json.users : [];

    for (const user of users) {
      const id = typeof user?.id === "string" ? user.id : "";
      if (!id || !targetSet.has(id)) continue;
      const identities = Array.isArray(user?.identities) ? user.identities : [];
      usersById.set(id, {
        id,
        email: typeof user?.email === "string" && user.email ? user.email : null,
        createdAt: typeof user?.created_at === "string" ? user.created_at : null,
        lastSignInAt: typeof user?.last_sign_in_at === "string" ? user.last_sign_in_at : null,
        isAnonymous: Boolean(user?.is_anonymous) || (!user?.email && identities.length === 0),
        providers: identities
          .map((identity: { provider?: unknown }) => typeof identity?.provider === "string" ? identity.provider : "")
          .filter(Boolean),
      });
    }

    if (usersById.size >= targetSet.size) break;
    hasMore = users.length === perPage;
    page += 1;
  }

  return usersById;
}

async function loadAllAuthUserSummaries(url: string, serviceKey: string) {
  const users: AuthUserSummary[] = [];
  let page = 1;
  const perPage = 1000;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${url}/auth/v1/admin/users?page=${page}&per_page=${perPage}`, {
      headers: {
        apiKey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });

    if (!response.ok) break;
    const json = await response.json();
    const pageUsers = Array.isArray(json.users) ? json.users : [];

    for (const user of pageUsers) {
      const id = typeof user?.id === "string" ? user.id : "";
      if (!id) continue;
      const identities = Array.isArray(user?.identities) ? user.identities : [];
      const appProvider = typeof user?.app_metadata?.provider === "string" ? user.app_metadata.provider : "";
      const providers = Array.from(new Set([
        appProvider,
        ...identities.map((identity: { provider?: unknown }) => typeof identity?.provider === "string" ? identity.provider : ""),
      ].filter(Boolean)));
      users.push({
        id,
        email: typeof user?.email === "string" && user.email ? user.email : null,
        createdAt: typeof user?.created_at === "string" ? user.created_at : null,
        lastSignInAt: typeof user?.last_sign_in_at === "string" ? user.last_sign_in_at : null,
        isAnonymous: Boolean(user?.is_anonymous) || (!user?.email && identities.length === 0),
        providers,
      });
    }

    hasMore = pageUsers.length === perPage;
    page += 1;
  }

  return users;
}

async function buildRegisteredUserAnalytics(
  adminSupabase: SupabaseClient,
  authUsers: AuthUserSummary[],
): Promise<RegisteredUserAnalytics> {
  const profilesByUserId = new Map<string, { displayName: string; accountType: string | null }>();
  const userIds = authUsers.map((user) => user.id).filter(Boolean);

  for (let index = 0; index < userIds.length; index += 500) {
    const batch = userIds.slice(index, index + 500);
    const { data: profiles } = await adminSupabase
      .from("profile_stats")
      .select("user_id, display_name, username, account_type")
      .in("user_id", batch);

    for (const profile of (profiles || []) as Array<{ user_id?: unknown; display_name?: unknown; username?: unknown; account_type?: unknown }>) {
      const userId = typeof profile.user_id === "string" ? profile.user_id : "";
      if (!userId) continue;
      const displayName = typeof profile.display_name === "string" ? profile.display_name.trim() : "";
      const username = typeof profile.username === "string" ? profile.username.trim() : "";
      profilesByUserId.set(userId, {
        displayName: displayName || username || `User ${shortId(userId)}`,
        accountType: typeof profile.account_type === "string" ? profile.account_type : null,
      });
    }
  }

  const rows = authUsers
    .map((user) => {
      const profile = profilesByUserId.get(user.id);
      const accountType: RegisteredUserAnalyticsRow["accountType"] =
        profile?.accountType === "guest" || user.isAnonymous ? "Guest" : user.email ? "Email" : "No email";
      return {
        id: user.id,
        displayName: profile?.displayName || (user.email ? user.email.split("@")[0] : `User ${shortId(user.id)}`),
        email: user.email,
        accountType,
        provider: user.providers.length ? user.providers.join(", ") : accountType,
        createdAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
      };
    })
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

  return {
    total: authUsers.length,
    withEmail: rows.filter((row) => Boolean(row.email)).length,
    withoutEmail: rows.filter((row) => !row.email).length,
    guestAccounts: rows.filter((row) => row.accountType === "Guest").length,
    rows,
  };
}

function getCachedAnalyticsResponse(cacheKey: string) {
  const entry = analyticsResponseCache.get(cacheKey);
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > ANALYTICS_RESPONSE_CACHE_TTL_MS) {
    analyticsResponseCache.delete(cacheKey);
    return null;
  }
  return entry.body;
}

function cacheAnalyticsResponse(cacheKey: string, body: unknown) {
  analyticsResponseCache.set(cacheKey, {
    body,
    cachedAt: Date.now(),
  });
}

function cachedAnalyticsJson(cacheKey: string, body: unknown) {
  cacheAnalyticsResponse(cacheKey, body);
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
      "X-BibleBuddy-Analytics-Cache": "miss",
    },
  });
}

async function buildOverviewAnalyticsResponse(
  adminSupabase: SupabaseClient,
  url: string,
  serviceKey: string,
  journeyWindow: JourneyWindowKey,
) {
  const { startIso, endIso } = getAnalyticsDateRange(journeyWindow);
  const allAuthUsers = await loadAllAuthUserSummaries(url, serviceKey);
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
  const monthlySignups = allAuthUsers.filter((user) => {
    const createdAt = user.createdAt ? new Date(user.createdAt).getTime() : 0;
    return Number.isFinite(createdAt) && createdAt >= thisMonthStart && createdAt < nextMonthStart;
  }).length;
  const previousMonthlySignups = allAuthUsers.filter((user) => {
    const createdAt = user.createdAt ? new Date(user.createdAt).getTime() : 0;
    return Number.isFinite(createdAt) && createdAt >= previousMonthStart && createdAt < thisMonthStart;
  }).length;
  const registeredUsers = {
    total: allAuthUsers.length,
    withEmail: allAuthUsers.filter((user) => Boolean(user.email)).length,
    withoutEmail: allAuthUsers.filter((user) => !user.email).length,
    guestAccounts: allAuthUsers.filter((user) => user.isAnonymous).length,
    rows: [],
  };
  const businessMetrics = {
    totalUsers: registeredUsers.total,
    registeredUsers: registeredUsers.withEmail,
    guestUsers: registeredUsers.guestAccounts,
    monthlySignups,
    previousMonthlySignups,
    monthlySignupChange: monthlySignups - previousMonthlySignups,
    lifetimeSignups: registeredUsers.total,
  };

  let landingQuery = adminSupabase
    .from("landing_page_events")
    .select("event_name, session_id, user_id, created_at")
    .gte("created_at", startIso)
    .order("created_at", { ascending: false })
    .limit(50000);
  if (endIso) landingQuery = landingQuery.lt("created_at", endIso);
  const { data: landingData } = await landingQuery;
  const landingRows = (landingData || []) as LandingEventRow[];

  let masterQuery = adminSupabase
    .from("master_actions")
    .select("user_id, session_id, action_type, action_label, journey_day, created_at")
    .in("action_type", [
      "landing_page_visited",
      "landing_cta_clicked",
      "user_signup",
      "user_upgraded",
      "bible_year_audio_played",
      "bible_year_task_started",
      "bible_year_task_completed",
      "bible_in_one_year_reading_completed",
      "bible_in_one_year_trivia_completed",
      "bible_in_one_year_reflection_completed",
    ])
    .gte("created_at", startIso)
    .order("created_at", { ascending: false })
    .limit(50000);
  if (endIso) masterQuery = masterQuery.lt("created_at", endIso);
  const { data: masterData } = await masterQuery;
  const masterRows = (masterData || []) as MasterActionFunnelRow[];
  let paidProfilesQuery = adminSupabase
    .from("profile_stats")
    .select("user_id, display_name, username, is_paid, member_badge, updated_at")
    .eq("is_paid", true)
    .gte("updated_at", startIso)
    .limit(50000);
  if (endIso) paidProfilesQuery = paidProfilesQuery.lt("updated_at", endIso);
  const { data: paidProfilesData } = await paidProfilesQuery;
  const paidProfileUpgradeRows = (paidProfilesData || []) as PaidProfileUpgradeRow[];
  const { data: allUpgradeActionData } = await adminSupabase
    .from("master_actions")
    .select("user_id")
    .eq("action_type", "user_upgraded")
    .limit(250000);
  const allUpgradeUserIds = new Set(
    ((allUpgradeActionData || []) as Array<{ user_id?: string | null }>)
      .map((row) => row.user_id)
      .filter((userId): userId is string => Boolean(userId)),
  );
  const firstThreeDaysSinceIso = new Date(Date.now() - NEW_USER_FIRST_THREE_DAYS_LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { data: firstThreeDaysData } = await adminSupabase
    .from("master_actions")
    .select("user_id, username, session_id, action_type, action_label, journey_day, account_status, event_metadata, created_at")
    .in("action_type", [...NEW_USER_FIRST_THREE_DAYS_ACTION_TYPES])
    .gte("created_at", firstThreeDaysSinceIso)
    .order("created_at", { ascending: false })
    .limit(50000);
  const firstThreeDayRows = (firstThreeDaysData || []) as MasterActionFunnelRow[];
  const windowSummary = summarizeAcquisitionWindow(landingRows, masterRows, journeyWindow);
  const proUpgradeUsers = new Set(
    masterRows
      .filter((row) => row.action_type === "user_upgraded")
      .map((row) => row.user_id)
      .filter((userId): userId is string => Boolean(userId)),
  );
  paidProfileUpgradeRows
    .filter((row) => row.user_id && row.is_paid === true)
    .filter((row) => isWithinAnalyticsWindow(row.updated_at || null, startIso, endIso))
    .filter((row) => {
      const badge = (row.member_badge || "").trim().toLowerCase();
      const name = (row.display_name || row.username || "").trim().toLowerCase();
      return !["admin", "owner", "staff", "teacher", "internal"].includes(badge) && name !== "louis" && name !== "louis moore";
    })
    .filter((row) => !allUpgradeUserIds.has(row.user_id as string))
    .forEach((row) => proUpgradeUsers.add(row.user_id as string));
  const proUpgrades = proUpgradeUsers.size;
  const audioRows = masterRows.filter((row) => row.action_type === "bible_year_audio_played" || row.action_type === "bible_year_task_started");
  const uniqueAudioActors = new Set(audioRows.map((row) => getMasterActorId(row)).filter(Boolean));
  const newUserFirstThreeDays = buildNewUserFirstThreeDaysAnalytics(firstThreeDayRows, new Map());
  const landingUsers = windowSummary.visits;
  const signupUsers = windowSummary.accountsCreated || windowSummary.signups || 0;
  const conversionRate = landingUsers > 0 ? Number(((signupUsers / landingUsers) * 100).toFixed(1)) : 0;
  const bibleBuddyFunnelStages: FunnelStageRow[] = [
    { key: "landing", label: "Landing Page", users: landingUsers, conversionRate: 100, dropoffRate: 0, retentionRate: 100 },
    { key: "accountsCreated", label: "Accounts Created", users: signupUsers, conversionRate, dropoffRate: Math.max(0, Number((100 - conversionRate).toFixed(1))), retentionRate: conversionRate },
  ];

  return {
    totalResponses: 0,
    personaLine: "Overview loaded first. Full analytics are loading in the background.",
    questions: [],
    businessMetrics,
    registeredUsers,
    audioEngagement: {
      totalPlays: audioRows.length,
      uniqueListeners: uniqueAudioActors.size,
      totalMinutesPlayed: 0,
      averageListeningMinutes: 0,
      lessonCompletionRate: 0,
      source: "day_task_events",
      playDetails: [],
    },
    customerJourney: {
      window: journeyWindow,
      label: getJourneyWindowLabel(journeyWindow),
      visits: landingUsers,
      startClicks: windowSummary.startClicks || 0,
      guestStarts: windowSummary.guestStarts || 0,
      freeAccounts: signupUsers,
      proUpgrades,
      guestToAccountRate: windowSummary.guestToAccountRate || 0,
    },
    visitorJourneys: {
      rows: [],
      metrics: {
        totalVisitors: landingUsers,
        finishedOnboarding: 0,
        startedDay1: 0,
        completedDay1: 0,
        createdFreeAccount: signupUsers,
        upgradedToPro: proUpgrades,
        onboardingCompletionRate: 0,
        day1StartRate: 0,
        day1CompletionRate: 0,
        freeAccountRate: conversionRate,
        proUpgradeRate: signupUsers > 0 ? Number(((proUpgrades / signupUsers) * 100).toFixed(1)) : 0,
      },
      sources: [],
      journeys: [],
      statuses: [],
    },
    bibleBuddyFunnelStages,
    newUserFirstThreeDays,
    activeUsersLast24Hours: { totalUsers: 0, totalActions: 0, rows: [] },
    bibleYearDays: [],
    studyNotes: {
      totalOpens: 0,
      totalInteractions: 0,
      uniqueUsers: 0,
      sectionOpens: 0,
      chapterNoteOpens: 0,
      phraseOpens: 0,
      topSources: [],
      topNotes: [],
      topPhrases: [],
      rows: [],
    },
    setupRequired: false,
    eventSetupRequired: false,
    partial: true,
  };
}

export async function GET(request: Request) {
  const owner = await verifyOwner(request);
  if (!owner) {
    return NextResponse.json({ error: "Owner analytics only." }, { status: 403 });
  }

  const journeyWindow = getJourneyWindowKey(request);
  const requestUrl = new URL(request.url);
  const mode = requestUrl.searchParams.get("mode") === "overview" ? "overview" : "full";
  const cacheKey = `onboarding:${mode}:${journeyWindow}`;
  const cachedResponse = getCachedAnalyticsResponse(cacheKey);
  if (cachedResponse) {
    return NextResponse.json(cachedResponse, {
      headers: {
        "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
        "X-BibleBuddy-Analytics-Cache": "hit",
      },
    });
  }

  const { startIso: journeySinceIso, endIso: journeyBeforeIso } = getAnalyticsDateRange(journeyWindow);
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !url) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const adminSupabase = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  if (mode === "overview") {
    const overview = await buildOverviewAnalyticsResponse(adminSupabase, url, serviceKey, journeyWindow);
    return cachedAnalyticsJson(cacheKey, overview);
  }

  const allAuthUsers = await loadAllAuthUserSummaries(url, serviceKey);
  const registeredUserAnalytics = await buildRegisteredUserAnalytics(adminSupabase, allAuthUsers);
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
  const monthlySignups = allAuthUsers.filter((user) => {
    const createdAt = user.createdAt ? new Date(user.createdAt).getTime() : 0;
    return Number.isFinite(createdAt) && createdAt >= thisMonthStart && createdAt < nextMonthStart;
  }).length;
  const previousMonthlySignups = allAuthUsers.filter((user) => {
    const createdAt = user.createdAt ? new Date(user.createdAt).getTime() : 0;
    return Number.isFinite(createdAt) && createdAt >= previousMonthStart && createdAt < thisMonthStart;
  }).length;
  const businessMetrics = {
    totalUsers: registeredUserAnalytics.total,
    registeredUsers: registeredUserAnalytics.withEmail,
    guestUsers: registeredUserAnalytics.guestAccounts,
    monthlySignups,
    previousMonthlySignups,
    monthlySignupChange: monthlySignups - previousMonthlySignups,
    lifetimeSignups: registeredUserAnalytics.total,
  };

  const { data, error } = await adminSupabase
    .from("landing_onboarding_responses")
    .select("goal, experience, study_focus, time_commitment, difficulty, created_at");

  let landingQuery = adminSupabase
    .from("landing_page_events")
    .select("event_name, session_id, user_id, source, referrer, page_path, metadata, created_at")
    .gte("created_at", journeySinceIso)
    .order("created_at", { ascending: false })
    .limit(250000);
  if (journeyBeforeIso) landingQuery = landingQuery.lt("created_at", journeyBeforeIso);
  const { data: eventData, error: eventError } = await landingQuery;

  const eventRows = eventError ? [] : ((eventData || []) as Record<string, unknown>[]);
  const landingEventRows = eventRows as LandingEventRow[];
  let upgradeQuery = adminSupabase
    .from("master_actions")
    .select("user_id, username, action_label, created_at")
    .eq("action_type", "user_upgraded")
    .gte("created_at", journeySinceIso)
    .order("created_at", { ascending: false })
    .limit(200);
  if (journeyBeforeIso) upgradeQuery = upgradeQuery.lt("created_at", journeyBeforeIso);
  const { data: upgradeData } = await upgradeQuery;
  const upgradeRows = (upgradeData || []) as UpgradeActionRow[];
  let paidProfilesUpgradeQuery = adminSupabase
    .from("profile_stats")
    .select("user_id, display_name, username, is_paid, member_badge, updated_at")
    .eq("is_paid", true)
    .gte("updated_at", journeySinceIso)
    .order("updated_at", { ascending: false })
    .limit(50000);
  if (journeyBeforeIso) paidProfilesUpgradeQuery = paidProfilesUpgradeQuery.lt("updated_at", journeyBeforeIso);
  const { data: paidProfilesUpgradeData } = await paidProfilesUpgradeQuery;
  const paidProfileUpgradeRows = (paidProfilesUpgradeData || []) as PaidProfileUpgradeRow[];
  const { data: allUpgradeActionData } = await adminSupabase
    .from("master_actions")
    .select("user_id")
    .eq("action_type", "user_upgraded")
    .limit(250000);
  const allUpgradeUserIds = new Set(
    ((allUpgradeActionData || []) as Array<{ user_id?: string | null }>)
      .map((row) => row.user_id)
      .filter((userId): userId is string => Boolean(userId)),
  );
  let studyNotesQuery = adminSupabase
    .from("master_actions")
    .select("user_id, username, action_type, action_label, event_metadata, created_at")
    .in("action_type", ["study_notes_viewed", "study_notes_section_opened", "chapter_notes_viewed"])
    .gte("created_at", journeySinceIso)
    .order("created_at", { ascending: false })
    .limit(1000);
  if (journeyBeforeIso) studyNotesQuery = studyNotesQuery.lt("created_at", journeyBeforeIso);
  const { data: studyNotesActionData } = await studyNotesQuery;
  const studyNotesActionRows = (studyNotesActionData || []) as StudyNotesActionRow[];

  let audioHelpfulnessQuery = adminSupabase
    .from("video_helpfulness_votes")
    .select("video_id, video_title, video_url, video_context, helpful, updated_at")
    .like("video_id", "audio:%")
    .gte("updated_at", journeySinceIso)
    .order("updated_at", { ascending: false })
    .limit(250000);
  if (journeyBeforeIso) audioHelpfulnessQuery = audioHelpfulnessQuery.lt("updated_at", journeyBeforeIso);
  const { data: audioHelpfulnessVoteData, error: audioHelpfulnessError } = await audioHelpfulnessQuery;
  const audioHelpfulnessRows = audioHelpfulnessError ? [] : ((audioHelpfulnessVoteData || []) as HelpfulnessVoteRow[]);
  const { data: audioHelpfulnessLifetimeData, error: audioHelpfulnessLifetimeError } = await adminSupabase
    .from("video_helpfulness_votes")
    .select("video_id, video_title, video_url, video_context, helpful, updated_at")
    .like("video_id", "audio:%")
    .order("updated_at", { ascending: false })
    .limit(250000);
  const audioHelpfulnessLifetimeRows = audioHelpfulnessLifetimeError ? [] : ((audioHelpfulnessLifetimeData || []) as HelpfulnessVoteRow[]);

  let bibleYearTaskQuery = adminSupabase
    .from("master_actions")
    .select("user_id, action_type, action_label, created_at")
    .in("action_type", ["bible_in_one_year_reading_completed", "bible_year_task_started"])
    .gte("created_at", journeySinceIso)
    .order("created_at", { ascending: true })
    .limit(250000);
  if (journeyBeforeIso) bibleYearTaskQuery = bibleYearTaskQuery.lt("created_at", journeyBeforeIso);
  const { data: bibleYearTaskActionData } = await bibleYearTaskQuery;
  const bibleYearTaskActionRows = (bibleYearTaskActionData || []) as BibleYearTaskActionRow[];

  let masterFunnelRows: MasterActionFunnelRow[] = [];
  const masterFunnelActionTypes = [
    "landing_page_visited",
    "landing_cta_clicked",
    "onboarding_intro_viewed",
    "onboarding_intro_started",
    "onboarding_intro_skipped",
    "onboarding_question_completed",
    "onboarding_results_viewed",
    "onboarding_journey_started",
    "dashboard_tour_started",
    "dashboard_tour_completed",
    "dashboard_tour_skipped",
    "bible_year_day_start_popup_viewed",
    "bible_year_day_start_popup_clicked",
    "bible_year_audio_played",
    "bible_year_audio_progress",
    "bible_year_audio_completed",
    "bible_year_task_started",
    "bible_year_task_completed",
    "follow_along_scripture_opened",
    "free_account_popup_viewed",
    "free_account_popup_skipped",
    "bible_in_one_year_day_viewed",
    "bible_in_one_year_reading_completed",
    "bible_in_one_year_trivia_completed",
    "bible_in_one_year_reflection_completed",
    "profile_creation_popup_completed",
    "profile_creation_popup_skipped",
    "upgrade_popup_viewed",
    "upgrade_popup_cta_clicked",
    "upgrade_popup_dismissed",
    "trial_popup_viewed",
    "trial_started",
    "trial_canceled",
    "trial_converted",
    "user_signup",
    "user_upgraded",
  ];
  let masterFunnelQuery = adminSupabase
    .from("master_actions")
    .select("user_id, username, session_id, action_type, action_label, journey_day, account_status, event_metadata, created_at")
    .in("action_type", masterFunnelActionTypes)
    .gte("created_at", journeySinceIso)
    .order("created_at", { ascending: false })
    .limit(250000);
  if (journeyBeforeIso) masterFunnelQuery = masterFunnelQuery.lt("created_at", journeyBeforeIso);
  const { data: masterFunnelData, error: masterFunnelError } = await masterFunnelQuery;
  if (masterFunnelError) {
    let fallbackMasterFunnelQuery = adminSupabase
      .from("master_actions")
      .select("user_id, username, action_type, action_label, created_at")
      .in("action_type", masterFunnelActionTypes)
      .gte("created_at", journeySinceIso)
      .order("created_at", { ascending: false })
      .limit(250000);
    if (journeyBeforeIso) fallbackMasterFunnelQuery = fallbackMasterFunnelQuery.lt("created_at", journeyBeforeIso);
    const { data: fallbackMasterFunnelData } = await fallbackMasterFunnelQuery;
    masterFunnelRows = (fallbackMasterFunnelData || []) as MasterActionFunnelRow[];
  } else {
    masterFunnelRows = (masterFunnelData || []) as MasterActionFunnelRow[];
  }

  const firstThreeDaysSinceIso = new Date(Date.now() - NEW_USER_FIRST_THREE_DAYS_LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { data: firstThreeDaysData, error: firstThreeDaysError } = await adminSupabase
    .from("master_actions")
    .select("user_id, username, session_id, action_type, action_label, journey_day, account_status, event_metadata, created_at")
    .in("action_type", [...NEW_USER_FIRST_THREE_DAYS_ACTION_TYPES])
    .gte("created_at", firstThreeDaysSinceIso)
    .order("created_at", { ascending: false })
    .limit(50000);
  let firstThreeDayRows = firstThreeDaysError ? [] : ((firstThreeDaysData || []) as MasterActionFunnelRow[]);

  const activeSinceIso = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  let activeUsersLast24Rows: MasterActionFunnelRow[] = [];
  const { data: activeUsersLast24Data, error: activeUsersLast24Error } = await adminSupabase
    .from("master_actions")
    .select("user_id, username, session_id, action_type, action_label, journey_day, account_status, event_metadata, created_at")
    .gte("created_at", activeSinceIso)
    .order("created_at", { ascending: false })
    .limit(10000);
  if (!activeUsersLast24Error) {
    activeUsersLast24Rows = (activeUsersLast24Data || []) as MasterActionFunnelRow[];
  }

  const { startIso: videoSinceIso, endIso: videoBeforeIso } = getAnalyticsDateRange(journeyWindow);
  let videoProgressQuery = adminSupabase
    .from("video_progress")
    .select("user_id, video_id, current_time, duration, completed, updated_at")
    .like("video_id", "bible-year-free-day-%")
    .gte("updated_at", videoSinceIso)
    .order("updated_at", { ascending: false })
    .limit(250000);
  if (videoBeforeIso) videoProgressQuery = videoProgressQuery.lt("updated_at", videoBeforeIso);
  const { data: videoProgressData } = await videoProgressQuery;
  const videoProgressRows = (videoProgressData || []) as VideoProgressAnalyticsRow[];

  const eventUserIds = Array.from(new Set([
    ...landingEventRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
    ...upgradeRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
    ...studyNotesActionRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
    ...bibleYearTaskActionRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
    ...masterFunnelRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
    ...firstThreeDayRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
    ...activeUsersLast24Rows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
    ...videoProgressRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
  ]));
  const profileByUserId = new Map<string, string>();
  const profileSummaryByUserId = new Map<string, ProfileSummary>();
  if (eventUserIds.length > 0) {
    const { data: profileRows } = await adminSupabase
      .from("profile_stats")
      .select("user_id, display_name, username, is_paid, registered_at, converted_from_guest_at, current_streak, current_level, total_actions, member_badge, pro_expires_at")
      .in("user_id", eventUserIds);

    for (const profile of profileRows || []) {
      const userId = typeof profile.user_id === "string" ? profile.user_id : "";
      if (!userId) continue;
      const displayName = typeof profile.display_name === "string" ? profile.display_name.trim() : "";
      const username = typeof profile.username === "string" ? profile.username.trim() : "";
      const name = displayName || username;
      profileByUserId.set(userId, name || `User ${shortId(userId)}`);
      profileSummaryByUserId.set(userId, {
        displayName: name,
        isPaid: Boolean(profile.is_paid),
        registeredAt: typeof profile.registered_at === "string" ? profile.registered_at : null,
        convertedFromGuestAt: typeof profile.converted_from_guest_at === "string" ? profile.converted_from_guest_at : null,
        currentStreak: typeof profile.current_streak === "number" ? profile.current_streak : null,
        currentLevel: typeof profile.current_level === "number" ? profile.current_level : null,
        totalActions: typeof profile.total_actions === "number" ? profile.total_actions : null,
        memberBadge: typeof profile.member_badge === "string" ? profile.member_badge : null,
        proExpiresAt: typeof profile.pro_expires_at === "string" ? profile.pro_expires_at : null,
      });
    }
  }
  const authSummaryByUserId = await loadAuthUserSummaries(url, serviceKey, eventUserIds);
  const validEventRows = filterRealAccountEvents(eventRows, authSummaryByUserId, profileSummaryByUserId);
  const validLandingEventRows = validEventRows as LandingEventRow[];
  const masterUserIds = Array.from(new Set(masterFunnelRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId))));
  const missingMasterProfileUserIds = masterUserIds.filter((userId) => !profileSummaryByUserId.has(userId));
  if (missingMasterProfileUserIds.length > 0) {
    const { data: masterProfileRows } = await adminSupabase
      .from("profile_stats")
      .select("user_id, display_name, username, is_paid, current_streak, current_level, total_actions, member_badge, pro_expires_at")
      .in("user_id", missingMasterProfileUserIds.slice(0, 5000));

    for (const profile of masterProfileRows || []) {
      const userId = typeof profile.user_id === "string" ? profile.user_id : "";
      if (!userId) continue;
      const displayName = typeof profile.display_name === "string" ? profile.display_name.trim() : "";
      const username = typeof profile.username === "string" ? profile.username.trim() : "";
      profileSummaryByUserId.set(userId, {
        displayName: displayName || username || `User ${shortId(userId)}`,
        isPaid: Boolean(profile.is_paid),
        registeredAt: null,
        convertedFromGuestAt: null,
        currentStreak: typeof profile.current_streak === "number" ? profile.current_streak : null,
        currentLevel: typeof profile.current_level === "number" ? profile.current_level : null,
        totalActions: typeof profile.total_actions === "number" ? profile.total_actions : null,
        memberBadge: typeof profile.member_badge === "string" ? profile.member_badge : null,
        proExpiresAt: typeof profile.pro_expires_at === "string" ? profile.pro_expires_at : null,
      });
    }
  }
  masterFunnelRows = masterFunnelRows.filter(
    (row) => !isInternalAnalyticsUser(row.user_id, profileSummaryByUserId) && !isOwnerAuthUser(row.user_id, authSummaryByUserId),
  );
  firstThreeDayRows = firstThreeDayRows.filter(
    (row) => !isInternalAnalyticsUser(row.user_id, profileSummaryByUserId) && !isOwnerAuthUser(row.user_id, authSummaryByUserId),
  );
  activeUsersLast24Rows = activeUsersLast24Rows.filter(
    (row) =>
      !isActiveUsersLast24NoiseAction(row.action_type) &&
      !isInternalAnalyticsUser(row.user_id, profileSummaryByUserId) &&
      !isOwnerAuthUser(row.user_id, authSummaryByUserId),
  );
  const { data: allBibleYearProgressData } = await adminSupabase
    .from("bible_year_day_progress")
    .select("user_id, day_number, reading_completed, study_notes_completed, trivia_completed, reflection_completed, updated_at")
    .limit(250000);
  const allBibleYearProgressRows = ((allBibleYearProgressData || []) as BibleYearProgressRow[])
    .filter((row) => !isInternalAnalyticsUser(row.user_id, profileSummaryByUserId));
  const eventUserIdSet = new Set(eventUserIds);
  const bibleYearProgressRows = allBibleYearProgressRows.filter((row) => row.user_id && eventUserIdSet.has(row.user_id));

  const progressUserIds = Array.from(new Set(allBibleYearProgressRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId))));
  if (progressUserIds.length > 0) {
    const missingProfileUserIds = progressUserIds.filter((userId) => !profileByUserId.has(userId));
    if (missingProfileUserIds.length > 0) {
      const { data: progressProfileRows } = await adminSupabase
        .from("profile_stats")
        .select("user_id, display_name, username")
        .in("user_id", missingProfileUserIds.slice(0, 5000));

      for (const profile of progressProfileRows || []) {
        const userId = typeof profile.user_id === "string" ? profile.user_id : "";
        if (!userId) continue;
        const displayName = typeof profile.display_name === "string" ? profile.display_name.trim() : "";
        const username = typeof profile.username === "string" ? profile.username.trim() : "";
        profileByUserId.set(userId, displayName || username || `User ${shortId(userId)}`);
      }
    }
  }

  const studyNotes = buildStudyNotesAnalytics(studyNotesActionRows, profileByUserId);
  const audioHelpfulness = buildAudioHelpfulnessAnalytics(audioHelpfulnessRows, audioHelpfulnessLifetimeRows);
  const windowBibleYearProgressRows = allBibleYearProgressRows.filter((row) => {
    const updatedAt = typeof row.updated_at === "string" ? new Date(row.updated_at).getTime() : 0;
    return Number.isFinite(updatedAt) && updatedAt >= new Date(journeySinceIso).getTime();
  });
  const bibleYearDays = buildBibleYearDayAnalytics(windowBibleYearProgressRows, masterFunnelRows, videoProgressRows, profileByUserId);
  const audioEngagement = summarizeAudioEngagement(masterFunnelRows, bibleYearDays, profileByUserId);
  const dayThreeUpgrade = buildDayThreeUpgradeAnalytics(masterFunnelRows);
  const daySevenUpgrade = buildDayUpgradeAnalytics(masterFunnelRows, 7);
  const studyNotesUpgrade = buildStudyNotesUpgradeAnalytics(masterFunnelRows);
  const activeUsersLast24Hours = buildActiveUsersLast24Hours(activeUsersLast24Rows, profileByUserId);
  const newUserFirstThreeDays = buildNewUserFirstThreeDaysAnalytics(firstThreeDayRows, profileByUserId);
  const bibleBuddyFunnelStages = buildBibleBuddyFunnelStages(validLandingEventRows, masterFunnelRows, windowBibleYearProgressRows, dayThreeUpgrade, daySevenUpgrade);
  const funnel = summarizeFunnel(validEventRows);
  const sources = summarizeSources(validEventRows);
  const trafficSources = summarizeTrafficSources(validLandingEventRows);
  const dataHealth = buildAnalyticsDataHealthWarnings(bibleYearDays, trafficSources);
  const publicOnboardingFlow = summarizePublicOnboardingFlow(validEventRows);
  const landingLast24h = summarizeLandingLast24Hours(validEventRows);
  const guestAccountFunnel = summarizeGuestAccountFunnel(validEventRows);
  const windowSummary = summarizeAcquisitionWindow(validLandingEventRows, masterFunnelRows, journeyWindow);
  const landingActivityLog = [
    ...buildLandingActivityLog(validLandingEventRows, profileByUserId, journeyWindow),
    ...buildUpgradeActivityLog(upgradeRows, profileByUserId),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 180);
  const visitorJourneys = buildVisitorJourneys(
    validLandingEventRows,
    bibleYearProgressRows,
    bibleYearTaskActionRows,
    masterFunnelRows,
    upgradeRows,
    profileByUserId,
    profileSummaryByUserId,
    journeyWindow,
  );
  const proUpgradeUsers = new Set(
    upgradeRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
  );
  paidProfileUpgradeRows
    .filter((row) => row.user_id && row.is_paid === true)
    .filter((row) => !isOwnerAuthUser(row.user_id || null, authSummaryByUserId))
    .filter((row) =>
      !isInternalAnalyticsProfile({
        displayName: (row.display_name || row.username || "").trim(),
        isPaid: true,
        registeredAt: null,
        convertedFromGuestAt: null,
        currentStreak: null,
        currentLevel: null,
        totalActions: null,
        memberBadge: typeof row.member_badge === "string" ? row.member_badge : null,
        proExpiresAt: null,
        updatedAt: typeof row.updated_at === "string" ? row.updated_at : null,
      }),
    )
    .filter((row) => !allUpgradeUserIds.has(row.user_id as string))
    .forEach((row) => proUpgradeUsers.add(row.user_id as string));
  const proUpgrades = proUpgradeUsers.size;
  const customerJourney = {
    window: journeyWindow,
    label: getJourneyWindowLabel(journeyWindow),
    visits: windowSummary.visits,
    startClicks: windowSummary.startClicks || 0,
    guestStarts: windowSummary.guestStarts || 0,
    freeAccounts: windowSummary.accountsCreated || windowSummary.signups || 0,
    proUpgrades,
    guestToAccountRate: windowSummary.guestToAccountRate || 0,
  };

  if (error) {
    return cachedAnalyticsJson(cacheKey, {
      totalResponses: 0,
      personaLine: "Run CREATE_LANDING_ONBOARDING_RESPONSES.sql to enable new onboarding analytics.",
      funnel,
      landingLast24h,
      businessMetrics,
      registeredUsers: registeredUserAnalytics,
      audioEngagement,
      audioHelpfulness,
      customerJourney,
      guestAccountFunnel,
      landingActivityLog,
      visitorJourneys,
      bibleBuddyFunnelStages,
      newUserFirstThreeDays,
      dayThreeUpgrade,
      daySevenUpgrade,
      studyNotesUpgrade,
      bibleYearDays,
      studyNotes,
      activeUsersLast24Hours,
      trafficSources,
      dataHealth,
      publicOnboardingFlow,
      sources,
      eventSetupRequired: Boolean(eventError),
      questions: QUESTION_CONFIG.map((question) => ({
        key: question.key,
        title: question.title,
        ...summarize(question.options, [], question.field),
      })),
      setupRequired: true,
      error: error.message,
    });
  }

  const rows = (data || []) as Record<string, unknown>[];
  const questions = QUESTION_CONFIG.map((question) => ({
    key: question.key,
    title: question.title,
    ...summarize(question.options, rows, question.field),
  }));

  return cachedAnalyticsJson(cacheKey, {
    totalResponses: rows.length,
    personaLine: buildPersonaLine(questions),
    questions,
    funnel,
    landingLast24h,
    businessMetrics,
    registeredUsers: registeredUserAnalytics,
    audioEngagement,
    audioHelpfulness,
    customerJourney,
    guestAccountFunnel,
    landingActivityLog,
    visitorJourneys,
    bibleBuddyFunnelStages,
    newUserFirstThreeDays,
    dayThreeUpgrade,
    daySevenUpgrade,
    studyNotesUpgrade,
    bibleYearDays,
    studyNotes,
    activeUsersLast24Hours,
    trafficSources,
    dataHealth,
    publicOnboardingFlow,
    sources,
    setupRequired: false,
    eventSetupRequired: Boolean(eventError),
    eventError: eventError?.message,
  });
}
