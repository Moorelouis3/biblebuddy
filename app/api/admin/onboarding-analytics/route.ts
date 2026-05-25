import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

type JourneyWindowKey = "1h" | "24h" | "7d" | "30d";

type UpgradeActionRow = {
  user_id?: string | null;
  username?: string | null;
  action_label?: string | null;
  created_at?: string | null;
};

type BibleYearProgressRow = {
  user_id?: string | null;
  day_number?: number | null;
  reading_completed?: boolean | null;
  trivia_completed?: boolean | null;
  reflection_completed?: boolean | null;
  updated_at?: string | null;
};

type VisitorJourneyStatus =
  | "active"
  | "onboarding_only"
  | "day_1_in_progress"
  | "day_3_completed"
  | "created_account"
  | "upgraded"
  | "dropped_off";

type VisitorJourneyRow = {
  id: string;
  visitorLabel: string;
  sessionId: string;
  userId: string | null;
  userLabel: string;
  journeySelected: string;
  onboardingCompletedAt: string | null;
  startedDay1At: string | null;
  completedDay3At: string | null;
  createdAccountAt: string | null;
  upgradedAt: string | null;
  currentStatus: VisitorJourneyStatus;
  currentStatusLabel: string;
  source: string;
  referrer: string | null;
  lastActiveAt: string;
  lastEventName: string;
  dropoffStep: string;
  accountType: "guest" | "free" | "pro";
};

type AuthUserSummary = {
  id: string;
  email: string | null;
  createdAt: string | null;
  isAnonymous: boolean;
};

type ProfileSummary = {
  displayName: string;
  isPaid: boolean;
  registeredAt: string | null;
  convertedFromGuestAt: string | null;
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
  { key: "clickedStart", eventName: "clicked_start_journey", label: "Clicked Start Journey" },
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
  return raw === "1h" || raw === "7d" || raw === "30d" ? raw : "24h";
}

function getJourneyWindowMs(windowKey: JourneyWindowKey) {
  if (windowKey === "1h") return 60 * 60 * 1000;
  if (windowKey === "7d") return 7 * 24 * 60 * 60 * 1000;
  if (windowKey === "30d") return 30 * 24 * 60 * 60 * 1000;
  return 24 * 60 * 60 * 1000;
}

function getJourneyWindowLabel(windowKey: JourneyWindowKey) {
  if (windowKey === "1h") return "Last 1 hour";
  if (windowKey === "7d") return "Last 7 days";
  if (windowKey === "30d") return "Last 30 days";
  return "Last 24 hours";
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
    const source = typeof row.source === "string" && row.source.trim() ? row.source.trim() : "Direct / Unknown";
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

function summarizeLandingWindow(rows: Record<string, unknown>[], windowKey: JourneyWindowKey) {
  const since = Date.now() - getJourneyWindowMs(windowKey);
  const recentRows = rows.filter((row) => {
    const createdAt = typeof row.created_at === "string" ? new Date(row.created_at).getTime() : 0;
    return Number.isFinite(createdAt) && createdAt >= since;
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
      category: "onboarding" as LandingActivityCategory,
      title: "Clicked Start Your Journey",
      detail: "Visitor opened the public onboarding flow.",
    };
  }
  if (eventName === "started_onboarding") {
    return {
      category: "onboarding" as LandingActivityCategory,
      title: "Started onboarding",
      detail: "Visitor began answering the onboarding questions.",
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
      title: "Guest finished onboarding",
      detail: "Guest entered BibleBuddy and started their journey.",
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
      title: "Guest became a free user",
      detail: "Guest protected their BibleBuddy journey by creating a free account.",
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
  const since = Date.now() - getJourneyWindowMs(windowKey);
  const validRows = rows
    .filter((row) => {
      const createdAt = typeof row.created_at === "string" ? new Date(row.created_at).getTime() : 0;
      return Number.isFinite(createdAt) && createdAt >= since;
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

  const entries = validRows.map((row, index) => {
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
      source: typeof row.source === "string" && row.source ? row.source : "Direct / Unknown",
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
    if (!lastRow?.created_at || completedEvents.has(lastRow.event_name || "")) return [];
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
      source: typeof lastRow.source === "string" && lastRow.source ? lastRow.source : "Direct / Unknown",
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
  if (/^(direct|direct \/ unknown|unknown|direct unknown)$/i.test(source)) return "Unknown";
  return source;
}

function getStatusLabel(status: VisitorJourneyStatus) {
  const labels: Record<VisitorJourneyStatus, string> = {
    active: "Active",
    onboarding_only: "Onboarding only",
    day_1_in_progress: "Day 1 in progress",
    day_3_completed: "Day 3 completed",
    created_account: "Created account",
    upgraded: "Upgraded",
    dropped_off: "Drop off",
  };
  return labels[status];
}

function buildVisitorJourneys(
  rows: LandingEventRow[],
  progressRows: BibleYearProgressRow[],
  upgradeRows: UpgradeActionRow[],
  profileByUserId: Map<string, string>,
  profileSummaryByUserId: Map<string, ProfileSummary>,
  windowKey: JourneyWindowKey,
) {
  const since = Date.now() - getJourneyWindowMs(windowKey);
  const validRows = rows
    .filter((row) => {
      const createdAt = typeof row.created_at === "string" ? new Date(row.created_at).getTime() : 0;
      return Number.isFinite(createdAt) && createdAt >= since;
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

  const rowsOut: VisitorJourneyRow[] = Array.from(sessions.entries()).map(([sessionId, sessionRows]) => {
    const firstRow = sessionRows[0];
    const lastRow = sessionRows[sessionRows.length - 1];
    const userId = sessionRows.map((row) => row.user_id).find((id): id is string => Boolean(id)) || null;
    const userLabel = userId ? profileByUserId.get(userId) || `User ${shortId(userId)}` : "Guest visitor";
    const eventNames = new Set(sessionRows.map((row) => row.event_name || ""));
    const userProgressRows = userId ? progressByUser.get(userId) || [] : [];
    const dayOneRows = userProgressRows.filter((row) => Number(row.day_number || 0) === 1);
    const dayThreeRows = userProgressRows.filter((row) => Number(row.day_number || 0) === 3);
    const dayOneStartedAt = dayOneRows.map((row) => row.updated_at).filter((value): value is string => Boolean(value)).sort()[0] || null;
    const dayThreeCompletedAt =
      dayThreeRows
        .filter((row) => row.reading_completed && row.trivia_completed && row.reflection_completed)
        .map((row) => row.updated_at)
        .filter((value): value is string => Boolean(value))
        .sort()
        .at(-1) || null;
    const accountEvent = sessionRows.find((row) => isAccountEvent(row.event_name || ""));
    const profile = userId ? profileSummaryByUserId.get(userId) : null;
    const createdAccountAt =
      accountEvent?.created_at ||
      profile?.convertedFromGuestAt ||
      profile?.registeredAt ||
      null;
    const upgradeAt = userId ? upgradeByUser.get(userId)?.created_at || null : null;
    const onboardingCompletedAt = sessionRows.find((row) => row.event_name === "started_guest_journey")?.created_at || null;
    const now = Date.now();
    const lastActiveAt = lastRow?.created_at || firstRow?.created_at || new Date().toISOString();
    const inactiveMs = now - new Date(lastActiveAt).getTime();

    let status: VisitorJourneyStatus = "active";
    if (upgradeAt) status = "upgraded";
    else if (dayThreeCompletedAt) status = "day_3_completed";
    else if (createdAccountAt) status = "created_account";
    else if (dayOneStartedAt) status = "day_1_in_progress";
    else if (onboardingCompletedAt) status = "active";
    else if (eventNames.has("started_onboarding") || eventNames.has("viewed_onboarding_intro")) status = "onboarding_only";
    if (!onboardingCompletedAt) {
      status = "dropped_off";
    } else if (!upgradeAt && !createdAccountAt && inactiveMs > 10 * 60 * 1000) {
      status = "dropped_off";
    }

    const accountType: VisitorJourneyRow["accountType"] = upgradeAt || profile?.isPaid ? "pro" : createdAccountAt ? "free" : "guest";
    const lastInfo = lastRow ? getLandingActivityInfo(lastRow) : null;

    return {
      id: sessionId,
      visitorLabel: `Visitor #${getVisitorNumber(sessionId || userId || lastActiveAt)}`,
      sessionId,
      userId,
      userLabel,
      journeySelected: getJourneyLabelFromEvents(sessionRows),
      onboardingCompletedAt,
      startedDay1At: dayOneStartedAt,
      completedDay3At: dayThreeCompletedAt,
      createdAccountAt,
      upgradedAt: upgradeAt,
      currentStatus: status,
      currentStatusLabel: getStatusLabel(status),
      source: normalizeJourneySource(firstRow?.source),
      referrer: typeof firstRow?.referrer === "string" && firstRow.referrer ? firstRow.referrer : null,
      lastActiveAt,
      lastEventName: lastRow?.event_name || "",
      dropoffStep: lastInfo?.title || "Unknown",
      accountType,
    };
  }).sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());

  const totalVisitors = rowsOut.length;
  const finishedOnboarding = rowsOut.filter((row) => Boolean(row.onboardingCompletedAt)).length;
  const startedDay1 = rowsOut.filter((row) => Boolean(row.startedDay1At)).length;
  const completedDay3 = rowsOut.filter((row) => Boolean(row.completedDay3At)).length;
  const createdFreeAccount = rowsOut.filter((row) => Boolean(row.createdAccountAt)).length;
  const upgradedToPro = rowsOut.filter((row) => Boolean(row.upgradedAt)).length;

  return {
    rows: rowsOut.slice(0, 500),
    metrics: {
      totalVisitors,
      finishedOnboarding,
      startedDay1,
      completedDay3,
      createdFreeAccount,
      upgradedToPro,
      onboardingCompletionRate: totalVisitors > 0 ? Number(((finishedOnboarding / totalVisitors) * 100).toFixed(1)) : 0,
      day1StartRate: totalVisitors > 0 ? Number(((startedDay1 / totalVisitors) * 100).toFixed(1)) : 0,
      day3CompletionRate: totalVisitors > 0 ? Number(((completedDay3 / totalVisitors) * 100).toFixed(1)) : 0,
      freeAccountRate: totalVisitors > 0 ? Number(((createdFreeAccount / totalVisitors) * 100).toFixed(1)) : 0,
      proUpgradeRate: totalVisitors > 0 ? Number(((upgradedToPro / totalVisitors) * 100).toFixed(1)) : 0,
    },
    sources: Array.from(new Set(rowsOut.map((row) => row.source))).sort(),
    journeys: ["Bible in One Year"],
    statuses: ([
      "active",
      "onboarding_only",
      "day_1_in_progress",
      "day_3_completed",
      "created_account",
      "upgraded",
      "dropped_off",
    ] as VisitorJourneyStatus[]).map((key) => ({ key, label: getStatusLabel(key) })),
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
        isAnonymous: Boolean(user?.is_anonymous) || (!user?.email && identities.length === 0),
      });
    }

    if (usersById.size >= targetSet.size) break;
    hasMore = users.length === perPage;
    page += 1;
  }

  return usersById;
}

export async function GET(request: Request) {
  const owner = await verifyOwner(request);
  if (!owner) {
    return NextResponse.json({ error: "Owner analytics only." }, { status: 403 });
  }

  const journeyWindow = getJourneyWindowKey(request);
  const journeySinceIso = new Date(Date.now() - getJourneyWindowMs(journeyWindow)).toISOString();
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

  const { data, error } = await adminSupabase
    .from("landing_onboarding_responses")
    .select("goal, experience, study_focus, time_commitment, difficulty, created_at");

  const { data: eventData, error: eventError } = await adminSupabase
    .from("landing_page_events")
    .select("event_name, session_id, user_id, source, referrer, page_path, metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(1500);

  const eventRows = eventError ? [] : ((eventData || []) as Record<string, unknown>[]);
  const landingEventRows = eventRows as LandingEventRow[];
  const { data: upgradeData } = await adminSupabase
    .from("master_actions")
    .select("user_id, username, action_label, created_at")
    .eq("action_type", "user_upgraded")
    .gte("created_at", journeySinceIso)
    .order("created_at", { ascending: false })
    .limit(200);
  const upgradeRows = (upgradeData || []) as UpgradeActionRow[];

  const eventUserIds = Array.from(new Set([
    ...landingEventRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
    ...upgradeRows.map((row) => row.user_id).filter((userId): userId is string => Boolean(userId)),
  ]));
  const profileByUserId = new Map<string, string>();
  const profileSummaryByUserId = new Map<string, ProfileSummary>();
  if (eventUserIds.length > 0) {
    const { data: profileRows } = await adminSupabase
      .from("profile_stats")
      .select("user_id, display_name, username, is_paid, registered_at, converted_from_guest_at")
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
      });
    }
  }
  const authSummaryByUserId = await loadAuthUserSummaries(url, serviceKey, eventUserIds);
  const validEventRows = filterRealAccountEvents(eventRows, authSummaryByUserId, profileSummaryByUserId);
  const validLandingEventRows = validEventRows as LandingEventRow[];
  const { data: bibleYearProgressData } = eventUserIds.length > 0
    ? await adminSupabase
        .from("bible_year_day_progress")
        .select("user_id, day_number, reading_completed, trivia_completed, reflection_completed, updated_at")
        .in("user_id", eventUserIds)
        .limit(250000)
    : { data: [] as BibleYearProgressRow[] };
  const bibleYearProgressRows = (bibleYearProgressData || []) as BibleYearProgressRow[];
  const funnel = summarizeFunnel(validEventRows);
  const sources = summarizeSources(validEventRows);
  const publicOnboardingFlow = summarizePublicOnboardingFlow(validEventRows);
  const landingLast24h = summarizeLandingLast24Hours(validEventRows);
  const guestAccountFunnel = summarizeGuestAccountFunnel(validEventRows);
  const windowSummary = summarizeLandingWindow(validEventRows, journeyWindow);
  const landingActivityLog = [
    ...buildLandingActivityLog(validLandingEventRows, profileByUserId, journeyWindow),
    ...buildUpgradeActivityLog(upgradeRows, profileByUserId),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 180);
  const visitorJourneys = buildVisitorJourneys(
    validLandingEventRows,
    bibleYearProgressRows,
    upgradeRows,
    profileByUserId,
    profileSummaryByUserId,
    journeyWindow,
  );
  const proUpgrades = new Set(upgradeRows.map((row) => row.user_id).filter(Boolean)).size;
  const customerJourney = {
    window: journeyWindow,
    label: getJourneyWindowLabel(journeyWindow),
    visits: windowSummary.visits,
    guestStarts: windowSummary.guestStarts || 0,
    freeAccounts: windowSummary.accountsCreated || windowSummary.signups || 0,
    proUpgrades,
    guestToAccountRate: windowSummary.guestToAccountRate || 0,
  };

  if (error) {
    return NextResponse.json({
      totalResponses: 0,
      personaLine: "Run CREATE_LANDING_ONBOARDING_RESPONSES.sql to enable new onboarding analytics.",
      funnel,
      landingLast24h,
      customerJourney,
      guestAccountFunnel,
      landingActivityLog,
      visitorJourneys,
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

  return NextResponse.json({
    totalResponses: rows.length,
    personaLine: buildPersonaLine(questions),
    questions,
    funnel,
    landingLast24h,
    customerJourney,
    guestAccountFunnel,
    landingActivityLog,
    visitorJourneys,
    publicOnboardingFlow,
    sources,
    setupRequired: false,
    eventSetupRequired: Boolean(eventError),
    eventError: eventError?.message,
  });
}
