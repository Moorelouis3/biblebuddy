import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type AnswerSummary = {
  answer: string;
  count: number;
  percent: number;
};

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
    key: "age",
    title: "Age Range",
    field: "age_range",
    options: ["Under 18", "18-29", "30-49", "50+"],
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
  { key: "viewedQuestion3Age", eventName: "viewed_question_3_age", label: "Viewed Question 3 - Age" },
  { key: "question3Age", eventName: "completed_question_3_age", label: "Completed Question 3 - Age" },
  { key: "viewedQuestion4", eventName: "viewed_question_4", label: "Viewed Question 4" },
  { key: "question4", eventName: "completed_question_4", label: "Completed Question 4" },
  { key: "viewedQuestion5", eventName: "viewed_question_5", label: "Viewed Question 5" },
  { key: "question5", eventName: "completed_question_5", label: "Completed Question 5" },
  { key: "viewedLoading", eventName: "viewed_results_loading", label: "Viewed results loading" },
  { key: "viewedResults", eventName: "viewed_results_page", label: "Viewed results page" },
  { key: "reachedResults", eventName: "reached_results_page", label: "Reached results page" },
  { key: "clickedJourney", eventName: "clicked_yes_start_my_journey", label: "Clicked Yes, start my journey" },
  { key: "viewedAccount", eventName: "viewed_create_account_modal", label: "Viewed Create Account modal" },
  { key: "openedAccount", eventName: "opened_create_account_modal", label: "Opened Create Account modal" },
  { key: "createdAccount", eventName: "created_account_successfully", label: "Created account" },
] as const;

const PUBLIC_ONBOARDING_STEP_CONFIG = [
  { key: "intro", eventName: "viewed_onboarding_intro", label: "Intro opened" },
  { key: "question1", eventName: "viewed_question_1", label: "Question 1 viewed" },
  { key: "question2", eventName: "viewed_question_2", label: "Question 2 viewed" },
  { key: "question3", eventName: "viewed_question_3_age", label: "Question 3 viewed" },
  { key: "question4", eventName: "viewed_question_4", label: "Question 4 viewed" },
  { key: "question5", eventName: "viewed_question_5", label: "Question 5 viewed" },
  { key: "results", eventName: "viewed_results_page", label: "Results viewed" },
  { key: "account", eventName: "viewed_create_account_modal", label: "Account modal viewed" },
  { key: "signup", eventName: "created_account_successfully", label: "Account created" },
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
  const age = byKey.get("age");
  const time = byKey.get("time");
  const difficulty = byKey.get("difficulty");
  if (!goal || !experience || !age || !time || !difficulty) {
    return "Not enough new onboarding data yet to describe the average Bible Buddy user.";
  }

  return `The typical Bible Buddy user is ${age}, wants to ${goal.toLowerCase()}, is ${experience.toLowerCase()}, has about ${time.toLowerCase()} a day, and most often says ${difficulty.toLowerCase()}.`;
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
  const signups = steps.find((step) => step.eventName === "created_account_successfully")?.count || 0;

  return {
    cards: {
      visitors,
      signups,
      conversionRate: visitors > 0 ? Number(((signups / visitors) * 100).toFixed(1)) : 0,
    },
    steps,
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
  const finished = eventSessions.get("created_account_successfully")?.size || 0;

  return {
    started,
    finished,
    closedBeforeSignup: closedSessions.size,
    completionRate: started > 0 ? Number(((finished / started) * 100).toFixed(1)) : 0,
    steps,
  };
}

function summarizeSources(rows: Record<string, unknown>[]) {
  const signupRows = rows.filter((row) => row.event_name === "created_account_successfully");
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

export async function GET() {
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
    .select("goal, experience, age_range, time_commitment, difficulty, created_at");

  const { data: eventData, error: eventError } = await adminSupabase
    .from("landing_page_events")
    .select("event_name, session_id, source, created_at");

  const eventRows = eventError ? [] : ((eventData || []) as Record<string, unknown>[]);
  const funnel = summarizeFunnel(eventRows);
  const sources = summarizeSources(eventRows);
  const publicOnboardingFlow = summarizePublicOnboardingFlow(eventRows);

  if (error) {
    return NextResponse.json({
      totalResponses: 0,
      personaLine: "Run CREATE_LANDING_ONBOARDING_RESPONSES.sql to enable new onboarding analytics.",
      funnel,
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
    publicOnboardingFlow,
    sources,
    setupRequired: false,
    eventSetupRequired: Boolean(eventError),
    eventError: eventError?.message,
  });
}
