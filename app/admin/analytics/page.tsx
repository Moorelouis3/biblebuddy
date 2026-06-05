"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "@/lib/bibleInOneYearPlan";
import { supabase } from "@/lib/supabaseClient";
import { applyAppThemeToDocument, readCachedAppTheme } from "@/lib/appThemes";
import { getCachedAdminAnalytics, loadAdminAnalytics } from "@/lib/adminAnalyticsPreload";

type JourneyWindow = "today" | "yesterday" | "24h" | "7d" | "30d" | "this_month" | "lifetime";
type AccountFilter = "all" | "guest" | "free" | "pro";
type AnalyticsView = "overview" | "bible-year" | "study-notes" | "traffic-sources";

type VisitorJourneyStatus =
  | "active"
  | "finished_onboarding"
  | "onboarding_only"
  | "day_1_in_progress"
  | "day_1_completed"
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
  timeline: Array<{
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
  }>;
  details: {
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
};

type VisitorJourneys = {
  rows: VisitorJourneyRow[];
  metrics: {
    totalVisitors: number;
    finishedOnboarding: number;
    startedDay1: number;
    completedDay1: number;
    createdFreeAccount: number;
    upgradedToPro: number;
    onboardingCompletionRate: number;
    day1StartRate: number;
    day1CompletionRate: number;
    freeAccountRate: number;
    proUpgradeRate: number;
  };
  sources: string[];
  journeys: string[];
  statuses: Array<{ key: VisitorJourneyStatus; label: string }>;
};

type ActiveUsersLast24Hours = {
  totalUsers: number;
  totalActions: number;
  rows: Array<{
    actorId: string;
    userId: string | null;
    sessionId: string | null;
    userLabel: string;
    totalActions: number;
    lastAction: string;
    lastActionDetail: string;
    lastActionAt: string;
    actions: Array<{
      id: string;
      actionType: string;
      title: string;
      detail: string;
      category: VisitorJourneyRow["timeline"][number]["category"];
      dayNumber: number | null;
      taskType: string | null;
      createdAt: string;
    }>;
  }>;
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

type StudyNotesUpgradeAnalytics = {
  totalViews: number;
  totalUpgradeClicks: number;
  totalStayFreeClicks: number;
  upgradeClickRate: number;
  stayFreeRate: number;
  days: Array<{
    dayNumber: number;
    views: number;
    upgradeClicks: number;
    stayFreeClicks: number;
    upgradeClickRate: number;
    stayFreeRate: number;
  }>;
};

type BibleYearDayAnalytics = {
  dayNumber: number;
  startedUsers: number;
  completedUsers: number;
  inProgressUsers: number;
  readingCompleted: number;
  triviaCompleted: number;
  reflectionCompleted: number;
  completionRate: number;
  lastActiveAt: string | null;
  users: Array<{
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
    completed: boolean;
    updatedAt: string | null;
  }>;
};

type HelpfulnessSummary = {
  yes: number;
  no: number;
  total: number;
  yesRate: number;
  noRate: number;
  verdict: string;
};

type AudioHelpfulnessAnalytics = {
  window: HelpfulnessSummary;
  lifetime: HelpfulnessSummary;
  topAudio: Array<{
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
  }>;
};

type AnalyticsResponse = {
  businessMetrics?: {
    totalUsers: number;
    registeredUsers: number;
    guestUsers: number;
    monthlySignups: number;
    previousMonthlySignups: number;
    monthlySignupChange: number;
    lifetimeSignups: number;
  };
  registeredUsers?: {
    total: number;
    withEmail: number;
    withoutEmail: number;
    guestAccounts: number;
    rows: Array<{
      id: string;
      displayName: string;
      email: string | null;
      accountType: "Email" | "No email" | "Guest";
      provider: string;
      createdAt: string | null;
      lastSignInAt: string | null;
    }>;
  };
  audioEngagement?: {
    totalPlays: number;
    uniqueListeners: number;
    totalMinutesPlayed: number;
    averageListeningMinutes: number;
    lessonCompletionRate: number;
    source: "audio_events" | "day_task_events";
    playDetails?: Array<{
      id: string;
      userId: string | null;
      userLabel: string;
      title: string;
      dayNumber: number | null;
      eventType: string;
      listenedSeconds: number;
      listenedLabel: string;
      playedAt: string | null;
    }>;
  };
  audioHelpfulness?: AudioHelpfulnessAnalytics;
  customerJourney?: {
    window: JourneyWindow;
    label: string;
    visits?: number;
    startClicks?: number;
    guestStarts?: number;
    freeAccounts?: number;
    proUpgrades?: number;
    guestToAccountRate?: number;
  };
  visitorJourneys?: VisitorJourneys;
  activeUsersLast24Hours?: ActiveUsersLast24Hours;
  bibleBuddyFunnelStages?: FunnelStageRow[];
  dayThreeUpgrade?: DayThreeUpgradeAnalytics;
  daySevenUpgrade?: DayThreeUpgradeAnalytics;
  studyNotesUpgrade?: StudyNotesUpgradeAnalytics;
  bibleYearDays?: BibleYearDayAnalytics[];
  studyNotes?: {
    totalOpens: number;
    totalInteractions: number;
    uniqueUsers: number;
    sectionOpens: number;
    chapterNoteOpens: number;
    phraseOpens: number;
    topSources: Array<{ source: string; opens: number }>;
    topNotes: Array<{ key: string; label: string; opens: number; uniqueUsers: number; lastOpenedAt: string | null }>;
    topPhrases: Array<{ key: string; label: string; sectionLabel: string; opens: number; uniqueUsers: number; lastOpenedAt: string | null }>;
    rows: Array<{
      id: string;
      userId: string | null;
      userLabel: string;
      eventType: string;
      eventLabel: string;
      noteTitle: string;
      phraseTitle: string;
      source: string;
      reference: string;
      sectionTitle: string;
      openedAt: string;
    }>;
  };
  trafficSources?: {
    totalVisitors: number;
    sources: Array<{
      source: string;
      visitors: number;
      signups: number;
      signupRate: number;
      percent: number;
      visitorRows?: Array<{
        actorId: string;
        visitorLabel: string;
        referrer: string | null;
        pagePath: string;
        landingUrl: string;
        firstSeenAt: string | null;
      }>;
    }>;
  };
  dataHealth?: Array<{
    key: string;
    severity: "warning" | "info";
    title: string;
    detail: string;
  }>;
  eventSetupRequired?: boolean;
  eventError?: string;
  error?: string;
};

type StripeRecentPayment = {
  id: string;
  amount: string;
  amountCents: number;
  currency: string;
  createdAt: string;
  customerEmail: string;
  customerName: string | null;
  plan: string;
  status: string;
  receiptUrl: string | null;
};

type StripeRevenueSummary = {
  currency: string;
  window?: JourneyWindow;
  label?: string;
  mrrCents: number;
  mrr: string;
  activeSubscriptions: number;
  monthlySubscriptions: number;
  trialingSubscriptions: number;
  totalSubscriptionsTracked: number;
  revenue30dCents: number;
  revenue30d: string;
  revenueRangeCents?: number;
  revenueRange?: string;
  oneTime30dCents: number;
  oneTime30d: string;
  oneTimeRangeCents?: number;
  oneTimeRange?: string;
  recentPayments: StripeRecentPayment[];
  updatedAt: string;
  error?: string;
};

const ANALYTICS_NAV_ITEMS: Array<{ key: AnalyticsView; label: string; helper: string }> = [
  { key: "overview", label: "Overview", helper: "Journey Tracker" },
  { key: "bible-year", label: "Bible in One Year", helper: "Day breakdowns" },
  { key: "study-notes", label: "Study Notes", helper: "Note opens" },
  { key: "traffic-sources", label: "Traffic Sources", helper: "Landing visitors" },
];

const WINDOW_OPTIONS: Array<{ key: JourneyWindow; label: string }> = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "24h", label: "Last 24 hours" },
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "this_month", label: "This month" },
  { key: "lifetime", label: "Lifetime" },
];

const STATUS_STYLES: Record<VisitorJourneyStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  finished_onboarding: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  onboarding_only: "bg-amber-50 text-amber-700 ring-amber-200",
  day_1_in_progress: "bg-blue-50 text-blue-700 ring-blue-200",
  day_1_completed: "bg-violet-50 text-violet-700 ring-violet-200",
  created_account: "bg-amber-50 text-amber-700 ring-amber-200",
  upgraded: "bg-orange-50 text-orange-700 ring-orange-200",
  dropped_off: "bg-rose-50 text-rose-700 ring-rose-200",
};

const TRAFFIC_SOURCE_COLORS = [
  "from-blue-500/18 to-cyan-400/10 text-blue-700 ring-blue-200",
  "from-emerald-500/18 to-teal-400/10 text-emerald-700 ring-emerald-200",
  "from-violet-500/18 to-fuchsia-400/10 text-violet-700 ring-violet-200",
  "from-amber-500/18 to-orange-400/10 text-amber-700 ring-amber-200",
  "from-rose-500/18 to-pink-400/10 text-rose-700 ring-rose-200",
  "from-slate-500/14 to-slate-400/8 text-slate-700 ring-slate-200",
];

function formatNumber(value: number) {
  return value.toLocaleString();
}

function shortId(value: string) {
  return value ? value.slice(0, 8) : "unknown";
}

function formatDateTime(value: string | null) {
  if (!value) return "Not started";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not started";
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatLastActive(value: string) {
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return "Unknown";
  const diff = Date.now() - time;
  const minutes = Math.max(0, Math.round(diff / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function formatEventTitle(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatListenDuration(seconds: number) {
  if (!seconds || seconds < 1) return "Not tracked";
  if (seconds < 60) return `${Math.round(seconds)} sec`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return remainingSeconds ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
}

function getRate(part: number, whole: number) {
  return whole > 0 ? Number(((part / whole) * 100).toFixed(1)) : 0;
}

function StepCell({ value, successLabel, emptyLabel = "Not started" }: { value: string | null; successLabel?: string; emptyLabel?: string }) {
  if (!value) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <span className="grid h-4 w-4 place-items-center rounded-full border border-slate-300 text-[10px]">-</span>
        {emptyLabel}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800">
      <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-[10px] text-white">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3.5 8.2 2.7 2.6 6.3-6.6" />
        </svg>
      </span>
      {successLabel || formatDateTime(value)}
    </span>
  );
}

type TaskStatus = "not_started" | "started" | "finished";

function getTaskStatus(started: boolean, finished: boolean): TaskStatus {
  if (finished) return "finished";
  if (started) return "started";
  return "not_started";
}

type JourneyPerformanceDay = {
  dayNumber: number;
  title: string;
  reference: string;
  plays: number;
  uniqueListeners: number;
  avgListenTimeLabel: string;
  completionRate: number;
  completedUsers: number;
  notesOpened: number;
  triviaStarted: number;
  triviaCompleted: number;
  reflectionOpened: number;
  reflectionSubmitted: number;
  replays: number;
  trend: number[];
};

function getStageUsers(stages: FunnelStageRow[], key: string) {
  return stages.find((stage) => stage.key === key)?.users || 0;
}

function getJourneyDayLabel(dayNumber: number, title: string) {
  return `Day ${dayNumber}: ${title}`;
}

function buildJourneyPerformanceDays(days: BibleYearDayAnalytics[] | undefined): JourneyPerformanceDay[] {
  const dayMap = new Map((days || []).map((day) => [day.dayNumber, day]));
  return GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((planDay) => {
    const day = dayMap.get(planDay.dayNumber);
    const users = day?.users || [];
    const plays = day?.startedUsers || users.filter((user) => user.readingStarted || user.readingCompleted).length;
    const completedUsers = day?.completedUsers || users.filter((user) => user.completed).length;
    const notesOpened = users.filter((user) => user.reflectionStarted || user.reflectionCompleted).length;
    const triviaStarted = users.filter((user) => user.triviaStarted || user.triviaCompleted).length;
    const triviaCompleted = day?.triviaCompleted || users.filter((user) => user.triviaCompleted).length;
    const reflectionSubmitted = users.filter((user) => user.reflectionCompleted).length;
    const trendBase = Math.max(1, plays, completedUsers);
    return {
      dayNumber: planDay.dayNumber,
      title: planDay.title,
      reference: planDay.reference,
      plays,
      uniqueListeners: plays,
      avgListenTimeLabel: "Tracking soon",
      completionRate: day?.completionRate || getRate(completedUsers, plays),
      completedUsers,
      notesOpened,
      triviaStarted,
      triviaCompleted,
      reflectionOpened: notesOpened,
      reflectionSubmitted,
      replays: 0,
      trend: [0.22, 0.44, 0.31, 0.58, 0.46, 0.74, Math.min(1, (plays || completedUsers || 0) / trendBase)],
    };
  });
}

function MiniTaskStatus({ status, evidence }: { status: TaskStatus; evidence: string | null }) {
  const styles: Record<TaskStatus, string> = {
    not_started: "bg-slate-100 text-slate-500 ring-slate-200",
    started: "bg-blue-50 text-blue-700 ring-blue-200",
    finished: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };
  const iconStyles: Record<TaskStatus, string> = {
    not_started: "bg-slate-300 text-white",
    started: "bg-blue-500 text-white",
    finished: "bg-emerald-500 text-white",
  };
  const labels: Record<TaskStatus, string> = {
    not_started: "Not started",
    started: "Started",
    finished: "Finished",
  };
  return (
    <span className="inline-flex flex-col gap-1">
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${styles[status]}`}>
        <span className={`grid h-4 w-4 place-items-center rounded-full text-[10px] ${iconStyles[status]}`}>
          {status === "finished" ? (
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3.5 8.2 2.7 2.6 6.3-6.6" />
            </svg>
          ) : status === "started" ? ">" : "-"}
        </span>
        {labels[status]}
      </span>
      {evidence ? <span className="font-mono text-[10px] font-bold text-slate-500">{evidence}</span> : null}
    </span>
  );
}

function OnboardingCell({ value }: { value: string | null }) {
  if (!value) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700">
        <span className="grid h-4 w-4 place-items-center rounded-full bg-rose-100 text-[10px] ring-1 ring-rose-200">x</span>
        Not finished
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800">
      <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-[10px] text-white">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3.5 8.2 2.7 2.6 6.3-6.6" />
        </svg>
      </span>
      {formatDateTime(value)}
    </span>
  );
}

function Icon({ name }: { name: "visitors" | "check" | "book" | "flame" | "user" | "pro" | "search" | "filter" | "export" | "play" | "headphones" | "spark" | "arrow" }) {
  const common = "h-5 w-5";
  if (name === "check") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /><circle cx="12" cy="12" r="9" /></svg>;
  }
  if (name === "book") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" /></svg>;
  }
  if (name === "flame") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4 0 7-2.8 7-6.8 0-2.6-1.4-5-4.3-7.2.1 2.5-.7 3.9-2.2 4.6.2-3.3-1.2-6.1-4.1-8.6.2 3.5-1.2 5.4-2.5 7.2A7.2 7.2 0 0 0 5 15.2C5 19.2 8 22 12 22Z" /></svg>;
  }
  if (name === "user") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
  }
  if (name === "pro") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></svg>;
  }
  if (name === "search") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
  }
  if (name === "filter") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></svg>;
  }
  if (name === "export") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12" /><path d="m7 8 5-5 5 5" /><path d="M5 15v4h14v-4" /></svg>;
  }
  if (name === "play") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 5v14l11-7-11-7Z" /></svg>;
  }
  if (name === "headphones") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14a9 9 0 0 1 18 0" /><path d="M5 14v5a2 2 0 0 0 2 2h1v-7H5Z" /><path d="M19 14v5a2 2 0 0 1-2 2h-1v-7h3Z" /></svg>;
  }
  if (name === "spark") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></svg>;
  }
  if (name === "arrow") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
  }
  return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
}

function MetricCard({
  label,
  value,
  percent,
  icon,
  tone,
}: {
  label: string;
  value: number;
  percent: number;
  icon: "visitors" | "check" | "book" | "flame" | "user" | "pro";
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
      <div className="flex items-center gap-4">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tone}`}>
          <Icon name={icon} />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold leading-none text-slate-950">{formatNumber(value)}</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">{label}</p>
          <p className={`mt-1 text-xs font-semibold ${percent > 0 ? "text-emerald-600" : "text-slate-500"}`}>
            {percent}% of visitors
          </p>
        </div>
      </div>
    </div>
  );
}

function FunnelFlowChart({ stages }: { stages: FunnelStageRow[] }) {
  const visibleStages = stages.length
    ? stages
    : [
      "Landing Page",
      "Started Onboarding",
      "Finished Onboarding",
      "Started Day 1",
      "Completed Day 1",
      "Started Day 2",
      "Completed Day 2",
      "Started Day 3",
      "Completed Day 3",
      "Day 3 Upgrade Offer",
      "Started Day 4",
      "Completed Day 4",
      "Started Day 5",
      "Completed Day 5",
      "Started Day 6",
      "Completed Day 6",
      "Started Day 7",
      "Completed Day 7",
      "Day 7 Upgrade Offer",
    ].map((label, index) => ({
      key: label.toLowerCase().replaceAll(" ", "-"),
      label,
      users: 0,
      conversionRate: index === 0 ? 100 : 0,
      dropoffRate: 0,
      retentionRate: index === 0 ? 100 : 0,
    }));
  const compactStages = visibleStages.reduce<Array<FunnelStageRow & { completedUsers?: number; completedConversionRate?: number }>>((acc, stage, index) => {
    const dayMatch = stage.label.match(/^Started Day (\d+)$/);
    const nextStage = visibleStages[index + 1];
    if (dayMatch && nextStage?.label === `Completed Day ${dayMatch[1]}`) {
      acc.push({
        ...stage,
        label: `Day ${dayMatch[1]}`,
        completedUsers: nextStage.users,
        completedConversionRate: nextStage.conversionRate,
      });
      return acc;
    }
    if (stage.label.match(/^Completed Day \d+$/)) return acc;
    acc.push(stage);
    return acc;
  }, []);

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <div className="overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-stretch gap-2">
          {compactStages.map((stage, index) => {
            const percentTone =
              stage.conversionRate > 10
                ? "text-emerald-500"
                : stage.conversionRate > 0
                  ? "text-amber-400"
                  : "text-slate-500";
            const completedPercentTone =
              (stage.completedConversionRate || 0) > 10
                ? "text-emerald-500"
                : (stage.completedConversionRate || 0) > 0
                  ? "text-amber-400"
                  : "text-slate-500";
            return (
              <div key={stage.key} className="flex items-center gap-2">
                <div className="min-h-[96px] w-[142px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="min-h-9 text-xs font-black leading-4 text-slate-950">{stage.label}</p>
                  {stage.key === "day3UpgradeOffer" || stage.key === "day7UpgradeOffer" ? (
                    <>
                      <p className="mt-2 text-2xl font-black leading-none text-slate-950">{formatNumber(stage.upgradeViews || stage.users || 0)}</p>
                      <div className="mt-2 grid grid-cols-3 gap-1 text-[10px] font-black leading-tight">
                        <span className="text-cyan-500">{formatNumber(stage.upgradeClicks || 0)} click</span>
                        <span className="text-emerald-500">{formatNumber(stage.successfulUpgrades || 0)} paid</span>
                        <span className="text-amber-400">{formatNumber(stage.continueFreeClicks || 0)} free</span>
                      </div>
                    </>
                  ) : typeof stage.completedUsers === "number" ? (
                    <>
                      <p className="mt-2 text-2xl font-black leading-none text-slate-950">
                        {formatNumber(stage.users)} <span className="text-slate-400">/</span> {formatNumber(stage.completedUsers)}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-[11px] font-black leading-none">
                        <span className={percentTone}>{stage.conversionRate}% start</span>
                        <span className="text-slate-300">|</span>
                        <span className={completedPercentTone}>{stage.completedConversionRate || 0}% done</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-2xl font-black leading-none text-slate-950">{formatNumber(stage.users)}</p>
                      {index > 0 ? (
                    <p className={`mt-2 text-sm font-black leading-none ${percentTone}`}>{stage.conversionRate}%</p>
                      ) : null}
                    </>
                  )}
                </div>
                {index < compactStages.length - 1 ? (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-400">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AudioOverviewMetricCard({
  title,
  value,
  change,
  helper,
  icon,
}: {
  title: string;
  value: number;
  change: string;
  helper: string;
  icon: "visitors" | "play" | "user" | "headphones";
}) {
  return (
    <div className="rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-accent,#2f7fe8)]">
          <Icon name={icon} />
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-black text-emerald-200">
          {change}
        </span>
      </div>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#64748b)]">{title}</p>
      <p className="mt-2 text-3xl font-black leading-none text-[var(--bb-text-primary,#101827)]">{formatNumber(value)}</p>
      <p className="mt-2 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#334155)]">{helper}</p>
    </div>
  );
}

function FounderMetricCard({
  title,
  value,
  helper,
  icon,
  accent = "text-cyan-200",
}: {
  title: string;
  value: string;
  helper: string;
  icon: "visitors" | "play" | "user" | "headphones" | "pro" | "spark" | "check";
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
      <div className={`grid h-10 w-10 place-items-center rounded-lg border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] ${accent}`}>
        <Icon name={icon} />
      </div>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#64748b)]">{title}</p>
      <p className="mt-2 text-3xl font-black leading-none text-[var(--bb-text-primary,#101827)]">{value}</p>
      <p className="mt-2 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#334155)]">{helper}</p>
    </div>
  );
}

function MobileHighlightCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: "visitors" | "play" | "user" | "headphones" | "pro" | "spark" | "check";
}) {
  return (
    <div className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-4 shadow-[0_14px_34px_rgba(15,23,42,0.10)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-text-muted,#64748b)]">{label}</p>
          <p className="mt-2 text-2xl font-black leading-none text-[var(--bb-text-primary,#101827)]">{value}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,var(--bb-card-border,#d8e3ec))] bg-[var(--bb-accent-soft,#e6f1ff)] text-[var(--bb-accent,#2f7fe8)]">
          <Icon name={icon} />
        </span>
      </div>
      <p className="mt-3 text-xs font-bold leading-5 text-[var(--bb-text-secondary,#334155)] opacity-80">{helper}</p>
    </div>
  );
}

function MobileAnalyticsHighlights({
  windowKey,
  setWindowKey,
  data,
  stripeRevenue,
  stripeRevenueLoading,
  loading,
  totalUsers,
  moneyEarned,
  upgrades,
  landingViews,
  signups,
  dayPlays,
}: {
  windowKey: JourneyWindow;
  setWindowKey: (value: JourneyWindow) => void;
  data: AnalyticsResponse | null;
  stripeRevenue: StripeRevenueSummary | null;
  stripeRevenueLoading: boolean;
  loading: boolean;
  totalUsers: number;
  moneyEarned: string;
  upgrades: number;
  landingViews: number;
  signups: number;
  dayPlays: number;
}) {
  const windowLabel = data?.customerJourney?.label || WINDOW_OPTIONS.find((option) => option.key === windowKey)?.label || "Selected range";

  return (
    <section className="mt-5 space-y-4 md:hidden">
      <div className="rounded-[24px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-4 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#2f7fe8)]">Analytics</p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-[var(--bb-text-primary,#101827)]">Bible Buddy today</h2>
            <p className="mt-1 text-xs font-bold text-[var(--bb-text-secondary,#334155)] opacity-80">{windowLabel}</p>
          </div>
          <select
            value={windowKey}
            onChange={(event) => setWindowKey(event.target.value as JourneyWindow)}
            className="h-10 max-w-[150px] rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-3 text-xs font-black text-[var(--bb-text-primary,#101827)] outline-none focus:border-[var(--bb-accent,#2f7fe8)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#e6f1ff)]"
            aria-label="Analytics timeframe"
          >
            {WINDOW_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 text-sm font-bold text-[var(--bb-text-secondary,#334155)]">
          Loading analytics...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <MobileHighlightCard
            label="Total Users"
            value={formatNumber(totalUsers)}
            helper="Registered plus guest users."
            icon="visitors"
          />
          <MobileHighlightCard
            label="Money Earned"
            value={stripeRevenueLoading ? "..." : moneyEarned}
            helper="Stripe cash for this time frame."
            icon="pro"
          />
          <MobileHighlightCard
            label="Upgrades"
            value={formatNumber(upgrades)}
            helper="People who upgraded to Pro."
            icon="spark"
          />
          <MobileHighlightCard
            label="Landing Views"
            value={formatNumber(landingViews)}
            helper="Unique landing page visitors."
            icon="user"
          />
          <MobileHighlightCard
            label="Sign Ups"
            value={formatNumber(signups)}
            helper="Accounts created."
            icon="check"
          />
          <MobileHighlightCard
            label="Day Plays"
            value={formatNumber(dayPlays)}
            helper="Daily lesson starts."
            icon="play"
          />
        </div>
      )}

      {stripeRevenue?.mrr ? (
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,var(--bb-card-border,#d8e3ec))] bg-[var(--bb-accent-soft,#e6f1ff)] p-4 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
          MRR: {stripeRevenue.mrr}
        </div>
      ) : null}
    </section>
  );
}

function FounderFunnelSection({
  landingVisitors,
  startClicks,
  signups,
  rows,
}: {
  landingVisitors: number;
  startClicks: number;
  signups: number;
  rows: VisitorJourneyRow[];
}) {
  const [openDetail, setOpenDetail] = useState<"clickedStart" | "accountsCreated" | null>(null);
  const startRate = getRate(startClicks, landingVisitors);
  const signupRate = getRate(signups, startClicks);
  const overallRate = getRate(signups, landingVisitors);
  const steps = [
    { key: "landing", label: "Landing Page Visitors", value: landingVisitors, rate: null, clickable: false },
    { key: "clickedStart", label: "Start Journey Clicks", value: startClicks, rate: `${startRate}% from visitors`, clickable: true },
    { key: "accountsCreated", label: "Accounts Created", value: signups, rate: `${signupRate}% from clicks`, clickable: true },
    { key: "overall", label: "Overall Conversion", value: `${overallRate}%`, rate: "landing page to account", clickable: false },
  ];
  const startRows = rows
    .map((row) => ({
      row,
      event: row.timeline.find((event) =>
        event.eventName === "clicked_start_journey" ||
        event.eventName === "started_guest_journey" ||
        event.eventName === "started_onboarding" ||
        event.title === "Clicked Start Journey"
      ),
    }))
    .filter((item) => item.event)
    .sort((a, b) => (b.event?.timestamp || "").localeCompare(a.event?.timestamp || ""));
  const accountRows = rows
    .map((row) => ({
      row,
      event: row.timeline.find((event) => event.category === "account" || event.eventName === "created_free_account" || event.eventName === "created_account_successfully"),
    }))
    .filter((item) => item.row.createdAccountAt || item.event)
    .sort((a, b) => ((b.event?.timestamp || b.row.createdAccountAt || "")).localeCompare(a.event?.timestamp || a.row.createdAccountAt || ""));
  const detailRows = openDetail === "clickedStart" ? startRows : openDetail === "accountsCreated" ? accountRows : [];
  const detailTitle = openDetail === "clickedStart" ? "Start Journey Clicks Detail" : "Accounts Created Detail";

  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">User Acquisition Funnel</p>
      <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">Where people are dropping off</h2>
      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {steps.map((step, index) => (
          <Fragment key={step.label}>
            <button
              type="button"
              disabled={!step.clickable}
              onClick={() => {
                if (!step.clickable) return;
                setOpenDetail((current) => current === step.key ? null : step.key as "clickedStart" | "accountsCreated");
              }}
              className={`rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-5 text-left ${step.clickable ? "cursor-pointer transition hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-accent-soft,#e6f1ff)]" : "cursor-default"}`}
              aria-expanded={step.clickable ? openDetail === step.key : undefined}
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-text-muted,#64748b)]">{step.label}</p>
              <p className="mt-3 text-3xl font-black text-[var(--bb-text-primary,#101827)]">{typeof step.value === "number" ? formatNumber(step.value) : step.value}</p>
              {step.rate ? <p className="mt-2 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">{step.rate}</p> : <p className="mt-2 text-sm font-semibold text-[var(--bb-text-muted,#64748b)]">unique visitors</p>}
              {step.clickable ? (
                <p className="mt-3 text-xs font-black text-[var(--bb-text-secondary,#334155)]">
                  {openDetail === step.key ? "Hide table" : "Show people"}
                </p>
              ) : null}
            </button>
            {step.clickable && openDetail === step.key ? (
              <div className="overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] lg:hidden">
                <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
                  <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">{detailTitle}</p>
                  <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(detailRows.length)} rows</p>
                </div>
                <div className="max-h-[420px] overflow-y-auto">
                  {detailRows.length ? detailRows.map(({ row, event }) => (
                    <div key={`mobile-${openDetail}-${row.id}-${event?.id || row.createdAccountAt || row.lastActiveAt}`} className="border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 py-3 last:border-b-0">
                      <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">{row.userLabel || row.visitorLabel || "Unknown"}</p>
                      <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">{event?.title || (openDetail === "accountsCreated" ? "Created account" : "Clicked Start Journey")}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-[var(--bb-text-muted,#64748b)]">
                        <span>{row.accountType}</span>
                        <span>{row.source || "Unknown"}</span>
                        <span>{formatDateTime(event?.timestamp || (openDetail === "accountsCreated" ? row.createdAccountAt : row.startedDay1At) || row.lastActiveAt)}</span>
                      </div>
                    </div>
                  )) : (
                    <p className="px-4 py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No detail rows found for this metric yet.</p>
                  )}
                </div>
              </div>
            ) : null}
            {index < steps.length - 1 ? (
              <div className="hidden place-items-center text-[var(--bb-text-muted,#64748b)] lg:grid">
                <Icon name="arrow" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
      {openDetail ? (
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] lg:block">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
            <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">{detailTitle}</p>
            <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(detailRows.length)} rows shown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[920px] w-full border-collapse text-left text-sm">
              <thead className="bg-[var(--bb-surface-soft,#eef4f8)] text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">
                <tr>
                  <th className="px-4 py-3">Who</th>
                  <th className="px-4 py-3">Account</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
                {detailRows.length ? detailRows.map(({ row, event }) => (
                  <tr key={`${openDetail}-${row.id}-${event?.id || row.createdAccountAt || row.lastActiveAt}`} className="bg-[var(--bb-card,#ffffff)]">
                    <td className="px-4 py-3">
                      <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.userLabel || row.visitorLabel || "Unknown"}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#64748b)]">{row.userId ? shortId(row.userId) : row.sessionId ? shortId(row.sessionId) : row.visitorLabel}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-2.5 py-1 text-xs font-black text-[var(--bb-text-primary,#101827)]">
                        {row.accountType}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{row.source || "Unknown"}</td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-[var(--bb-text-primary,#101827)]">{event?.title || (openDetail === "accountsCreated" ? "Created account" : "Clicked Start Journey")}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#64748b)]">{event?.eventName || row.lastEventName}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{formatDateTime(event?.timestamp || (openDetail === "accountsCreated" ? row.createdAccountAt : row.startedDay1At) || row.lastActiveAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-black ring-1 ${STATUS_STYLES[row.currentStatus]}`}>
                        {row.currentStatusLabel}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center font-semibold text-[var(--bb-text-secondary,#334155)]">No detail rows found for this metric yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ListeningMetricsSection({ audio }: { audio: AnalyticsResponse["audioEngagement"] | undefined }) {
  const [showPlayDetails, setShowPlayDetails] = useState(false);
  const [showUniqueListeners, setShowUniqueListeners] = useState(false);
  const metrics = audio || {
    totalPlays: 0,
    uniqueListeners: 0,
    totalMinutesPlayed: 0,
    averageListeningMinutes: 0,
    lessonCompletionRate: 0,
    source: "day_task_events" as const,
    playDetails: [],
  };
  const playDetails = metrics.playDetails || [];
  const uniqueListenerRows = Array.from(
    playDetails.reduce((map, row) => {
      const key = row.userId || row.userLabel || row.id;
      const current = map.get(key);
      if (!current) {
        map.set(key, { ...row, playCount: 1 });
      } else {
        current.playCount += 1;
        current.listenedSeconds = Math.max(current.listenedSeconds, row.listenedSeconds);
        current.listenedLabel = current.listenedSeconds > 0 ? formatListenDuration(current.listenedSeconds) : current.listenedLabel;
        if ((row.playedAt || "") > (current.playedAt || "")) current.playedAt = row.playedAt;
      }
      return map;
    }, new Map<string, (typeof playDetails)[number] & { playCount: number }>()),
  ).map(([, row]) => row);
  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">Listening Metrics</p>
          <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">Are people actually listening?</h2>
        </div>
        <p className="text-sm font-bold text-[var(--bb-text-muted,#64748b)]">
          {metrics.source === "audio_events" ? "Using audio events" : "Using day-start events until audio duration tracking is live"}
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <button type="button" onClick={() => setShowPlayDetails((current) => !current)} className="text-left" aria-expanded={showPlayDetails}>
          <FounderMetricCard title="Total Plays" value={formatNumber(metrics.totalPlays)} helper={`${showPlayDetails ? "Hide" : "Show"} who listened, what they played, and how long.`} icon="play" />
        </button>
        {showPlayDetails ? (
          <div className="overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:hidden">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
              <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Total Plays Detail</p>
              <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(playDetails.length)} rows</p>
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              {playDetails.length ? playDetails.map((row) => (
                <div key={`mobile-play-${row.id}`} className="border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 py-3 last:border-b-0">
                  <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">{row.userLabel || "Unknown"}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">{row.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-[var(--bb-text-muted,#64748b)]">
                    {row.dayNumber ? <span>Day {row.dayNumber}</span> : null}
                    <span>{row.listenedLabel}</span>
                    <span>{formatDateTime(row.playedAt)}</span>
                  </div>
                </div>
              )) : (
                <p className="px-4 py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No play detail rows found yet.</p>
              )}
            </div>
          </div>
        ) : null}
        <button type="button" onClick={() => setShowUniqueListeners((current) => !current)} className="text-left" aria-expanded={showUniqueListeners}>
          <FounderMetricCard title="Unique Listeners" value={formatNumber(metrics.uniqueListeners)} helper={`${showUniqueListeners ? "Hide" : "Show"} individual users who listened.`} icon="headphones" />
        </button>
        {showUniqueListeners ? (
          <div className="overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:hidden">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
              <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Unique Listeners Detail</p>
              <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(uniqueListenerRows.length)} rows</p>
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              {uniqueListenerRows.length ? uniqueListenerRows.map((row) => (
                <div key={`mobile-listener-${row.userId || row.userLabel || row.id}`} className="border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 py-3 last:border-b-0">
                  <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">{row.userLabel || "Unknown"}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">{row.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-[var(--bb-text-muted,#64748b)]">
                    <span>{formatNumber(row.playCount)} plays</span>
                    <span>{row.listenedLabel}</span>
                    <span>{formatDateTime(row.playedAt)}</span>
                  </div>
                </div>
              )) : (
                <p className="px-4 py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No unique listener rows found yet.</p>
              )}
            </div>
          </div>
        ) : null}
        <FounderMetricCard title="Minutes Played" value={formatNumber(metrics.totalMinutesPlayed)} helper="Total tracked listening minutes." icon="spark" />
        <FounderMetricCard title="Avg Listen Time" value={`${metrics.averageListeningMinutes}m`} helper="Average minutes per session." icon="visitors" />
        <FounderMetricCard title="Completion Rate" value={`${metrics.lessonCompletionRate}%`} helper="Lessons completed from plays." icon="check" />
      </div>
      {showPlayDetails ? (
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:block">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
            <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Total Plays Detail</p>
            <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(playDetails.length)} rows shown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[820px] w-full border-collapse text-left text-sm">
              <thead className="bg-[var(--bb-surface-soft,#eef4f8)] text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">
                <tr>
                  <th className="px-4 py-3">Who</th>
                  <th className="px-4 py-3">Listened / Watched</th>
                  <th className="px-4 py-3">How Long</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
                {playDetails.length ? playDetails.map((row) => (
                  <tr key={row.id} className="bg-[var(--bb-card,#ffffff)]">
                    <td className="px-4 py-3 font-bold text-[var(--bb-text-primary,#101827)]">{row.userLabel || "Unknown"}</td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.title}</div>
                      {row.dayNumber ? <div className="mt-0.5 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">Day {row.dayNumber}</div> : null}
                    </td>
                    <td className="px-4 py-3 font-black text-[var(--bb-accent,#2f7fe8)]">{row.listenedLabel}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{formatEventTitle(row.eventType)}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{formatDateTime(row.playedAt)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center font-semibold text-[var(--bb-text-secondary,#334155)]">No play detail rows found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {showUniqueListeners ? (
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:block">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
            <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Unique Listeners Detail</p>
            <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(uniqueListenerRows.length)} rows shown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full border-collapse text-left text-sm">
              <thead className="bg-[var(--bb-surface-soft,#eef4f8)] text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">
                <tr>
                  <th className="px-4 py-3">Who</th>
                  <th className="px-4 py-3">Latest Lesson</th>
                  <th className="px-4 py-3">Plays</th>
                  <th className="px-4 py-3">Longest Listen</th>
                  <th className="px-4 py-3">Last Listened</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
                {uniqueListenerRows.length ? uniqueListenerRows.map((row) => (
                  <tr key={`listener-${row.userId || row.userLabel || row.id}`} className="bg-[var(--bb-card,#ffffff)]">
                    <td className="px-4 py-3 font-bold text-[var(--bb-text-primary,#101827)]">{row.userLabel || "Unknown"}</td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.title}</div>
                      {row.dayNumber ? <div className="mt-0.5 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">Day {row.dayNumber}</div> : null}
                    </td>
                    <td className="px-4 py-3 font-black text-[var(--bb-accent,#2f7fe8)]">{formatNumber(row.playCount)}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{row.listenedLabel}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{formatDateTime(row.playedAt)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center font-semibold text-[var(--bb-text-secondary,#334155)]">No unique listener rows found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AudioHelpfulnessSection({
  audioHelpfulness,
  windowLabel,
}: {
  audioHelpfulness: AnalyticsResponse["audioHelpfulness"] | undefined;
  windowLabel: string;
}) {
  const [showTopAudio, setShowTopAudio] = useState(false);
  const metrics = audioHelpfulness || {
    window: { yes: 0, no: 0, total: 0, yesRate: 0, noRate: 0, verdict: "No votes yet" },
    lifetime: { yes: 0, no: 0, total: 0, yesRate: 0, noRate: 0, verdict: "No votes yet" },
    topAudio: [],
  };
  const topAudio = metrics.topAudio || [];

  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">Audio Helpfulness</p>
          <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">Was the audio helpful?</h2>
        </div>
        <p className="text-sm font-bold text-[var(--bb-text-muted,#64748b)]">
          {windowLabel} plus lifetime yes/no totals.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <button type="button" onClick={() => setShowTopAudio((current) => !current)} className="text-left" aria-expanded={showTopAudio}>
          <FounderMetricCard title="Audio Votes" value={formatNumber(metrics.window.total)} helper={`${showTopAudio ? "Hide" : "Show"} top voted audio lessons for this time frame.`} icon="headphones" />
        </button>
        {showTopAudio ? (
          <div className="overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:hidden">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
              <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Top Audio Votes</p>
              <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(topAudio.length)} rows</p>
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              {topAudio.length ? topAudio.map((row, index) => (
                <div key={`mobile-audio-helpful-${row.audioId}`} className="border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 py-3 last:border-b-0">
                  <p className="text-xs font-black text-[var(--bb-accent,#2f7fe8)]">#{index + 1}</p>
                  <p className="mt-1 text-sm font-black text-[var(--bb-text-primary,#101827)]">{row.title}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">
                    {formatNumber(row.yes)} yes / {formatNumber(row.no)} no / {row.yesRate}% helpful
                  </p>
                  <p className="mt-1 text-xs font-bold text-[var(--bb-text-muted,#64748b)]">{row.verdict} - last {formatDateTime(row.latestVoteAt)}</p>
                </div>
              )) : (
                <p className="px-4 py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No audio helpfulness votes in this time frame yet.</p>
              )}
            </div>
          </div>
        ) : null}
        <FounderMetricCard title="Yes Votes" value={formatNumber(metrics.window.yes)} helper={`${metrics.window.yesRate}% helpful in this time frame.`} icon="check" accent="text-emerald-200" />
        <FounderMetricCard title="No Votes" value={formatNumber(metrics.window.no)} helper={`${metrics.window.noRate}% not helpful in this time frame.`} icon="spark" accent="text-rose-200" />
        <FounderMetricCard title="Helpful %" value={`${metrics.window.yesRate}%`} helper={metrics.window.verdict} icon="pro" accent="text-amber-200" />
        <FounderMetricCard title="Lifetime" value={`${metrics.lifetime.yesRate}%`} helper={`${formatNumber(metrics.lifetime.yes)} yes / ${formatNumber(metrics.lifetime.no)} no from ${formatNumber(metrics.lifetime.total)} total votes.`} icon="play" />
      </div>

      {showTopAudio ? (
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:block">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
            <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Top 20 Audio Helpfulness Votes</p>
            <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(topAudio.length)} rows shown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[820px] w-full border-collapse text-left text-sm">
              <thead className="bg-[var(--bb-surface-soft,#eef4f8)] text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">
                <tr>
                  <th className="px-4 py-3">Audio</th>
                  <th className="px-4 py-3">Yes</th>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Helpful %</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Latest Vote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
                {topAudio.length ? topAudio.map((row) => (
                  <tr key={`audio-helpful-${row.audioId}`} className="bg-[var(--bb-card,#ffffff)]">
                    <td className="px-4 py-3">
                      <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.title}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">{row.context}</div>
                    </td>
                    <td className="px-4 py-3 font-black text-emerald-700">{formatNumber(row.yes)}</td>
                    <td className="px-4 py-3 font-black text-rose-700">{formatNumber(row.no)}</td>
                    <td className="px-4 py-3 font-black text-[var(--bb-accent,#2f7fe8)]">{row.yesRate}%</td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{row.verdict}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{formatDateTime(row.latestVoteAt)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center font-semibold text-[var(--bb-text-secondary,#334155)]">No audio helpfulness votes in this time frame yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function RegisteredUsersDetailSection({ users }: { users: AnalyticsResponse["registeredUsers"] | undefined }) {
  const [open, setOpen] = useState(false);
  const rows = users?.rows || [];

  return (
    <div className="mt-5 rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full flex-col gap-3 px-4 py-4 text-left sm:flex-row sm:items-center sm:justify-between"
        aria-expanded={open}
      >
        <div>
          <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Total Users Detail</p>
          <p className="mt-1 text-xs font-bold text-[var(--bb-text-secondary,#334155)]">
            Includes email accounts, no-email accounts, guest accounts, and every registered auth user.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-3 py-1.5 text-xs font-black text-[var(--bb-text-primary,#101827)]">
          {open ? "Hide table" : "Show table"}
          <span>{open ? "-" : "+"}</span>
        </span>
      </button>
      {open ? (
        <div className="border-t border-[var(--bb-card-border,#d8e3ec)]">
          <div className="grid gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-4 text-sm sm:grid-cols-4">
            <div><span className="font-black">{formatNumber(users?.total || 0)}</span> total</div>
            <div><span className="font-black">{formatNumber(users?.withEmail || 0)}</span> with email</div>
            <div><span className="font-black">{formatNumber(users?.withoutEmail || 0)}</span> without email</div>
            <div><span className="font-black">{formatNumber(users?.guestAccounts || 0)}</span> guest accounts</div>
          </div>
          <div className="max-h-[520px] overflow-auto">
            <table className="min-w-[920px] w-full border-collapse text-left text-sm">
              <thead className="sticky top-0 bg-[var(--bb-surface-soft,#eef4f8)] text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Account</th>
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Last Sign In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
                {rows.length ? rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3">
                      <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.displayName}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#64748b)]">{shortId(row.id)}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{row.email || "No email"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-2.5 py-1 text-xs font-black text-[var(--bb-text-primary,#101827)]">
                        {row.accountType}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{row.provider || "Unknown"}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{formatDateTime(row.createdAt)}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{formatDateTime(row.lastSignInAt)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center font-semibold text-[var(--bb-text-secondary,#334155)]">No registered users loaded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StudyNotesMetricsSection({ studyNotes }: { studyNotes: AnalyticsResponse["studyNotes"] | undefined }) {
  const [showTopNotes, setShowTopNotes] = useState(false);
  const [showTopPhrases, setShowTopPhrases] = useState(false);
  const metrics = studyNotes || {
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
  };

  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">Study Notes Metrics</p>
          <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">What notes are people opening?</h2>
        </div>
        <p className="text-sm font-bold text-[var(--bb-text-muted,#64748b)]">
          Section opens cost credits. Phrase opens track interest inside the note.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <button type="button" onClick={() => setShowTopNotes((current) => !current)} className="text-left" aria-expanded={showTopNotes}>
          <FounderMetricCard title="Notes Opened" value={formatNumber(metrics.totalOpens)} helper={`${showTopNotes ? "Hide" : "Show"} top 20 opened note sections.`} icon="spark" />
        </button>
        {showTopNotes ? (
          <div className="overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:hidden">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
              <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Top 20 Notes Opened</p>
              <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(metrics.topNotes.length)} rows</p>
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              {metrics.topNotes.length ? metrics.topNotes.map((note, index) => (
                <div key={`mobile-note-${note.key}`} className="border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 py-3 last:border-b-0">
                  <p className="text-xs font-black text-[var(--bb-accent,#2f7fe8)]">#{index + 1}</p>
                  <p className="mt-1 text-sm font-black text-[var(--bb-text-primary,#101827)]">{note.label}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">
                    {formatNumber(note.opens)} opens • {formatNumber(note.uniqueUsers)} users • last {note.lastOpenedAt ? formatDateTime(note.lastOpenedAt) : "unknown"}
                  </p>
                </div>
              )) : (
                <p className="px-4 py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No note opens yet.</p>
              )}
            </div>
          </div>
        ) : null}
        <button type="button" onClick={() => setShowTopPhrases((current) => !current)} className="text-left" aria-expanded={showTopPhrases}>
          <FounderMetricCard title="Phrase Opens" value={formatNumber(metrics.phraseOpens)} helper={`${showTopPhrases ? "Hide" : "Show"} top 20 clicked key phrases.`} icon="spark" />
        </button>
        {showTopPhrases ? (
          <div className="overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:hidden">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
              <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Top 20 Key Phrases Opened</p>
              <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(metrics.topPhrases.length)} rows</p>
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              {metrics.topPhrases.length ? metrics.topPhrases.map((phrase, index) => (
                <div key={`mobile-phrase-${phrase.key}`} className="border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 py-3 last:border-b-0">
                  <p className="text-xs font-black text-[var(--bb-accent,#2f7fe8)]">#{index + 1}</p>
                  <p className="mt-1 text-sm font-black text-[var(--bb-text-primary,#101827)]">{phrase.label}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">
                    {phrase.sectionLabel} • {formatNumber(phrase.opens)} opens • {formatNumber(phrase.uniqueUsers)} users
                  </p>
                </div>
              )) : (
                <p className="px-4 py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No phrase opens yet.</p>
              )}
            </div>
          </div>
        ) : null}
        <FounderMetricCard title="Unique Readers" value={formatNumber(metrics.uniqueUsers)} helper="Users who opened notes or phrases." icon="visitors" />
        <FounderMetricCard title="Section Opens" value={formatNumber(metrics.sectionOpens)} helper="Credit-spending Bible reader note opens." icon="check" />
        <FounderMetricCard title="All Interactions" value={formatNumber(metrics.totalInteractions)} helper="Notes plus phrase clicks." icon="play" />
      </div>

      {showTopNotes ? (
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:block">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
            <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Top 20 Notes Opened</p>
            <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(metrics.topNotes.length)} rows</p>
          </div>
          <div className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
            {metrics.topNotes.length ? metrics.topNotes.map((note, index) => (
              <div key={note.key} className="grid gap-2 bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm sm:grid-cols-[44px_1fr_auto] sm:items-center">
                <p className="font-black text-[var(--bb-accent,#2f7fe8)]">#{index + 1}</p>
                <div className="min-w-0">
                  <p className="font-black text-[var(--bb-text-primary,#101827)]">{note.label}</p>
                  <p className="mt-0.5 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">
                    {formatNumber(note.uniqueUsers)} users • last {note.lastOpenedAt ? formatDateTime(note.lastOpenedAt) : "unknown"}
                  </p>
                </div>
                <p className="text-lg font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(note.opens)}</p>
              </div>
            )) : (
              <p className="px-4 py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No note opens yet.</p>
            )}
          </div>
        </div>
      ) : null}

      {showTopPhrases ? (
        <div className="mt-5 hidden overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] md:block">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3">
            <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Top 20 Key Phrases Opened</p>
            <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{formatNumber(metrics.topPhrases.length)} rows</p>
          </div>
          <div className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
            {metrics.topPhrases.length ? metrics.topPhrases.map((phrase, index) => (
              <div key={phrase.key} className="grid gap-2 bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm sm:grid-cols-[44px_1fr_auto] sm:items-center">
                <p className="font-black text-[var(--bb-accent,#2f7fe8)]">#{index + 1}</p>
                <div className="min-w-0">
                  <p className="font-black text-[var(--bb-text-primary,#101827)]">{phrase.label}</p>
                  <p className="mt-0.5 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">
                    {phrase.sectionLabel} • {formatNumber(phrase.uniqueUsers)} users • last {phrase.lastOpenedAt ? formatDateTime(phrase.lastOpenedAt) : "unknown"}
                  </p>
                </div>
                <p className="text-lg font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(phrase.opens)}</p>
              </div>
            )) : (
              <p className="px-4 py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No phrase opens yet.</p>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ActiveUsersLast24HoursSection({ report }: { report: ActiveUsersLast24Hours | undefined }) {
  const [expandedActorId, setExpandedActorId] = useState<string | null>(null);
  const rows = report?.rows || [];

  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">Active Users</p>
          <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">What users did in the last 24 hours</h2>
        </div>
        <div className="rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-2 text-sm font-black text-[var(--bb-text-primary,#101827)]">
          {formatNumber(report?.totalUsers || 0)} users • {formatNumber(report?.totalActions || 0)} actions
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)]">
        <div className="hidden grid-cols-[1.2fr_1.5fr_0.6fr_0.8fr] gap-3 border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)] md:grid">
          <span>User</span>
          <span>Last action</span>
          <span>Total</span>
          <span>When</span>
        </div>

        <div className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
          {rows.length ? rows.map((row) => {
            const isOpen = expandedActorId === row.actorId;
            return (
              <div key={row.actorId} className="bg-[var(--bb-card,#ffffff)]">
                <button
                  type="button"
                  onClick={() => setExpandedActorId((current) => current === row.actorId ? null : row.actorId)}
                  className="grid w-full gap-3 px-4 py-4 text-left transition hover:bg-[var(--bb-surface-soft,#eef4f8)] md:grid-cols-[1.2fr_1.5fr_0.6fr_0.8fr] md:items-center"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-[var(--bb-text-primary,#101827)]">{row.userLabel}</p>
                    <p className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#64748b)]">
                      {row.userId ? `User ${shortId(row.userId)}` : row.sessionId ? `Guest ${shortId(row.sessionId)}` : shortId(row.actorId)}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-[var(--bb-text-primary,#101827)]">{row.lastAction}</p>
                    <p className="mt-0.5 truncate text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">{row.lastActionDetail || "Tracked action"}</p>
                  </div>
                  <p className="text-sm font-black text-[var(--bb-accent,#2f7fe8)]">{formatNumber(row.totalActions)}</p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-[var(--bb-text-secondary,#334155)]">{formatLastActive(row.lastActionAt)}</p>
                    <span className={`grid h-8 w-8 place-items-center rounded-full bg-[var(--bb-accent-soft,#e6f1ff)] text-[var(--bb-accent,#2f7fe8)] transition ${isOpen ? "rotate-90" : ""}`}>
                      <Icon name="arrow" />
                    </span>
                  </div>
                </button>

                {isOpen ? (
                  <div className="border-t border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-4">
                    <div className="space-y-3">
                      {row.actions.map((action) => (
                        <div key={action.id} className="rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 py-3">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">{action.title}</p>
                              <p className="mt-1 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#334155)]">{action.detail}</p>
                              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">{formatEventTitle(action.actionType)}</p>
                            </div>
                            <div className="shrink-0 text-left sm:text-right">
                              <p className="text-xs font-black text-[var(--bb-accent,#2f7fe8)]">{formatDateTime(action.createdAt)}</p>
                              {action.dayNumber ? <p className="mt-1 text-xs font-semibold text-[var(--bb-text-muted,#64748b)]">Day {action.dayNumber}</p> : null}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          }) : (
            <p className="px-4 py-8 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No user actions tracked in the last 24 hours yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function StripeRevenueSection({
  revenue,
  loading,
  error,
}: {
  revenue: StripeRevenueSummary | null;
  loading: boolean;
  error: string | null;
}) {
  const [recentPaymentsOpen, setRecentPaymentsOpen] = useState(false);
  const cards = revenue
    ? [
        {
          label: "MRR",
          value: revenue.mrr,
          helper: "Live monthly recurring revenue from active Stripe subscriptions.",
          icon: "pro" as const,
        },
        {
          label: "Monthly Subs",
          value: formatNumber(revenue.monthlySubscriptions),
          helper: `${formatNumber(revenue.activeSubscriptions)} active paid subscriptions total.`,
          icon: "user" as const,
        },
        {
          label: `${revenue.label || "Selected"} Revenue`,
          value: revenue.revenueRange || revenue.revenue30d,
          helper: "Captured Stripe payments for the selected date range.",
          icon: "spark" as const,
        },
        {
          label: "Lifetime / One-Time",
          value: revenue.oneTimeRange || revenue.oneTime30d,
          helper: "One-time payments captured in the selected date range.",
          icon: "check" as const,
        },
      ]
    : [];

  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">Stripe Revenue</p>
          <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">Money coming in</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#334155)]">
            Live Stripe numbers for MRR, monthly subscriptions, one-time payments, and recent successful charges.
          </p>
        </div>
        <div className="rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-2 text-sm font-black text-[var(--bb-text-primary,#101827)]">
          {revenue?.updatedAt ? `Updated ${formatDateTime(revenue.updatedAt)}` : "Live from Stripe"}
        </div>
      </div>

      {loading ? (
        <div className="mt-5 rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-5 text-sm font-bold text-[var(--bb-text-secondary,#334155)]">
          Loading Stripe revenue...
        </div>
      ) : error ? (
        <div className="mt-5 rounded-xl border border-amber-300/35 bg-amber-400/10 p-5 text-sm font-bold leading-6 text-amber-100">
          {error}
        </div>
      ) : revenue ? (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, index) => {
              const isMrrCard = index === 0;
              const CardTag = isMrrCard ? "button" : "div";
              return (
              <CardTag
                key={card.label}
                type={isMrrCard ? "button" : undefined}
                onClick={isMrrCard ? () => setRecentPaymentsOpen((current) => !current) : undefined}
                 className={`rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 text-left shadow-[0_14px_34px_rgba(15,23,42,0.08)] ${
                   isMrrCard ? "transition hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-accent-soft,#e6f1ff)]" : ""
                 }`}
                aria-expanded={isMrrCard ? recentPaymentsOpen : undefined}
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-accent,#2f7fe8)]">
                  <Icon name={card.icon} />
                </div>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#64748b)]">{card.label}</p>
                <p className="mt-2 text-3xl font-black leading-none text-[var(--bb-text-primary,#101827)]">{card.value}</p>
                <p className="mt-2 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#334155)]">{card.helper}</p>
                {isMrrCard ? (
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2f7fe8)]">
                    {recentPaymentsOpen ? "Hide recent payments" : "Click to show recent payments"}
                  </p>
                ) : null}
              </CardTag>
            );
            })}
          </div>

          {recentPaymentsOpen ? (
          <div className="mt-6 rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)]">
            <div className="flex flex-col gap-2 border-b border-[var(--bb-card-border,#d8e3ec)] p-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Recent Payments</p>
                <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">Newest successful Stripe charges.</p>
              </div>
              <p className="text-xs font-bold text-[var(--bb-text-muted,#64748b)]">
                {formatNumber(revenue.trialingSubscriptions)} trialing subscriptions
              </p>
            </div>
            <div className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
              {revenue.recentPayments.length ? revenue.recentPayments.map((payment) => (
                <div key={payment.id} className="grid gap-3 p-4 text-sm sm:grid-cols-[1.1fr_0.8fr_0.5fr_0.6fr] sm:items-center">
                  <div className="min-w-0">
                    <p className="truncate font-black text-[var(--bb-text-primary,#101827)]">{payment.customerName || payment.customerEmail}</p>
                    <p className="mt-1 truncate text-xs font-semibold text-[var(--bb-text-muted,#64748b)]">{payment.customerEmail}</p>
                  </div>
                  <div>
                    <p className="font-black text-[var(--bb-accent,#2f7fe8)]">{payment.amount}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">{payment.plan}</p>
                  </div>
                  <p className="font-semibold text-[var(--bb-text-secondary,#334155)]">{formatDateTime(payment.createdAt)}</p>
                  {payment.receiptUrl ? (
                    <a
                      href={payment.receiptUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex justify-start font-black text-[var(--bb-accent,#2f7fe8)] underline-offset-4 hover:underline sm:justify-end"
                    >
                      Receipt
                    </a>
                  ) : (
                    <span className="font-semibold text-[var(--bb-text-muted,#64748b)] sm:text-right">No receipt</span>
                  )}
                </div>
              )) : (
                <div className="p-5 text-sm font-bold text-[var(--bb-text-secondary,#334155)]">No successful payments found yet.</div>
              )}
            </div>
          </div>
          ) : null}
        </>
      ) : (
        <div className="mt-5 rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-5 text-sm font-bold text-[var(--bb-text-secondary,#334155)]">
          Stripe revenue has not loaded yet.
        </div>
      )}
    </section>
  );
}

function MiniWaveform({ values }: { values: number[] }) {
  return (
    <div className="flex h-10 items-end gap-1">
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className="w-1.5 rounded-full bg-gradient-to-t from-cyan-400/35 to-emerald-300"
          style={{ height: `${Math.max(16, Math.min(100, value * 100))}%` }}
        />
      ))}
    </div>
  );
}

function JourneyPerformanceCard({
  day,
  onOpen,
}: {
  day: JourneyPerformanceDay;
  onOpen: (day: JourneyPerformanceDay) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(day)}
      className="group rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-4 text-left shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-accent-soft,#e6f1ff)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Day {day.dayNumber}</p>
          <h3 className="mt-1 truncate text-base font-black text-[var(--bb-text-primary,#101827)]">{day.title}</h3>
          <p className="mt-0.5 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">{day.reference}</p>
        </div>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-text-secondary,#334155)] transition group-hover:text-[var(--bb-accent,#2f7fe8)]">
          <Icon name="arrow" />
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">Plays</p>
          <p className="mt-1 text-xl font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(day.plays)}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">Avg Listen</p>
          <p className="mt-1 text-sm font-black text-[var(--bb-text-primary,#101827)]">{day.avgListenTimeLabel}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">Complete</p>
          <p className="mt-1 text-xl font-black text-[var(--bb-accent,#2f7fe8)]">{day.completionRate}%</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4 border-t border-[var(--bb-card-border,#d8e3ec)] pt-4">
        <MiniWaveform values={day.trend} />
        <p className="text-right text-xs font-bold leading-5 text-[var(--bb-text-secondary,#334155)]">
          {formatNumber(day.uniqueListeners)} listeners<br />
          {formatNumber(day.completedUsers)} finished
        </p>
      </div>
    </button>
  );
}

function JourneyDayDetailPanel({
  day,
  onClose,
}: {
  day: JourneyPerformanceDay | null;
  onClose: () => void;
}) {
  if (!day) return null;
  const stats = [
    { label: "Total Plays", value: formatNumber(day.plays) },
    { label: "Unique Listeners", value: formatNumber(day.uniqueListeners) },
    { label: "Average Listen Time", value: day.avgListenTimeLabel },
    { label: "Completion Rate", value: `${day.completionRate}%` },
  ];
  const engagement = [
    { label: "Notes Opened", value: day.notesOpened },
    { label: "Trivia Started", value: day.triviaStarted },
    { label: "Trivia Completed", value: day.triviaCompleted },
    { label: "Reflection Opened", value: day.reflectionOpened },
    { label: "Reflection Submitted", value: day.reflectionSubmitted },
    { label: "Replays", value: day.replays },
  ];
  return (
    <div className="fixed inset-0 z-[140] flex justify-end bg-black/55 backdrop-blur-sm">
      <aside className="h-full w-full max-w-lg overflow-y-auto border-l border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-6 text-[var(--bb-text-primary,#101827)] shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Lesson Details</p>
            <h2 className="mt-2 text-2xl font-black">{getJourneyDayLabel(day.dayNumber, day.title)}</h2>
            <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">{day.reference}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-3 py-2 text-sm font-black text-[var(--bb-text-secondary,#334155)] transition hover:bg-[var(--bb-accent-soft,#e6f1ff)]">
            Close
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--bb-text-muted,#64748b)]">{stat.label}</p>
              <p className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#64748b)]">Engagement Breakdown</p>
              <h3 className="mt-1 text-lg font-black text-[var(--bb-text-primary,#101827)]">Deeper study actions</h3>
            </div>
            <MiniWaveform values={day.trend} />
          </div>
          <div className="mt-5 space-y-3">
            {engagement.map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-[var(--bb-card-border,#d8e3ec)] pb-3 last:border-0 last:pb-0">
                <span className="text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">{item.label}</span>
                <span className="text-sm font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(item.value)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-4">
          <p className="text-sm font-black text-[var(--bb-accent,#2f7fe8)]">Audio tracking note</p>
          <p className="mt-2 text-sm leading-6 text-[var(--bb-text-secondary,#334155)]">
            Plays and completions are using the Bible journey task events available now. Average listen duration, replays, and drop-off points are ready in the UI and need dedicated audio progress events to become exact.
          </p>
        </div>
      </aside>
    </div>
  );
}

function AllJourneyDaysExplorer({
  days,
  expandedDay,
  onToggleDay,
}: {
  days: JourneyPerformanceDay[];
  expandedDay: number;
  onToggleDay: (dayNumber: number) => void;
}) {
  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">All Bible In One Year Days</p>
          <h2 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#101827)]">Click a day to open its stats</h2>
        </div>
        <p className="text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">{formatNumber(days.length)} day cards</p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {days.map((day) => {
          const expanded = expandedDay === day.dayNumber;
          return (
            <div key={day.dayNumber} className="overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)]">
              <button
                type="button"
                onClick={() => onToggleDay(expanded ? 0 : day.dayNumber)}
                className="w-full p-4 text-left transition hover:bg-[var(--bb-accent-soft,#e6f1ff)]"
                aria-expanded={expanded}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Day {day.dayNumber}</p>
                    <h3 className="mt-1 truncate text-base font-black text-[var(--bb-text-primary,#101827)]">{day.title}</h3>
                    <p className="mt-0.5 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">{day.reference}</p>
                  </div>
                  <span className="text-xl font-black text-[var(--bb-text-muted,#64748b)]">{expanded ? "-" : "+"}</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">Started</p>
                    <p className="mt-1 text-xl font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(day.plays)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">Finished</p>
                    <p className="mt-1 text-xl font-black text-[var(--bb-accent,#2f7fe8)]">{formatNumber(day.completedUsers)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">Rate</p>
                    <p className="mt-1 text-xl font-black text-[var(--bb-text-primary,#101827)]">{day.completionRate}%</p>
                  </div>
                </div>
              </button>

              {expanded ? (
                <div className="border-t border-[var(--bb-card-border,#d8e3ec)] p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["Unique listeners", day.uniqueListeners],
                      ["Avg listen time", day.avgListenTimeLabel],
                      ["Notes opened", day.notesOpened],
                      ["Trivia started", day.triviaStarted],
                      ["Trivia completed", day.triviaCompleted],
                      ["Reflection submitted", day.reflectionSubmitted],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">{label}</p>
                        <p className="mt-1 font-black text-[var(--bb-text-primary,#101827)]">{typeof value === "number" ? formatNumber(value) : value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AudioJourneyFunnel({
  landingVisitors,
  startClicks,
  signups,
  dayOnePlays,
}: {
  landingVisitors: number;
  startClicks: number;
  signups: number;
  dayOnePlays: number;
}) {
  const steps = [
    { label: "Landing Page Visitors", value: landingVisitors },
    { label: "Start Your Journey Clicks", value: startClicks },
    { label: "Signups Completed", value: signups },
    { label: "Day 1 Plays", value: dayOnePlays },
  ];
  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Journey Funnel</p>
          <h2 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#101827)]">From first visit to first listen</h2>
        </div>
        <p className="text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">Simple progression, no event dump.</p>
      </div>
      <div className="mt-6 grid gap-3 lg:grid-cols-4">
        {steps.map((step, index) => {
          const previous = index === 0 ? step.value : steps[index - 1]?.value || 0;
          const rate = index === 0 ? 100 : getRate(step.value, previous);
          return (
            <div key={step.label} className="relative rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-4">
              {index < steps.length - 1 ? <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-muted,#64748b)] lg:grid"><Icon name="arrow" /></span> : null}
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">{step.label}</p>
              <p className="mt-3 text-3xl font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(step.value)}</p>
              <p className="mt-2 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">{rate}% from previous</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StudyNotesUpgradeCard({ stats }: { stats?: StudyNotesUpgradeAnalytics }) {
  const [expanded, setExpanded] = useState(false);
  const days = stats?.days?.length ? stats.days : Array.from({ length: 7 }, (_, index) => ({
    dayNumber: index + 1,
    views: 0,
    upgradeClicks: 0,
    stayFreeClicks: 0,
    upgradeClickRate: 0,
    stayFreeRate: 0,
  }));

  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="flex w-full flex-col gap-3 p-4 text-left sm:flex-row sm:items-center sm:justify-between"
        aria-expanded={expanded}
      >
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">Study Notes Upgrade</p>
          <h2 className="mt-1 text-lg font-black text-slate-950">Days 1-7 upgrade popup</h2>
          <p className="mt-1 text-xs font-semibold text-slate-500">Tap to see each day&apos;s views, upgrade clicks, and stayed free clicks.</p>
        </div>
        <div className="grid w-full gap-2 sm:w-auto sm:min-w-[430px] sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">Views</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{formatNumber(stats?.totalViews || 0)}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">Upgrade</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{formatNumber(stats?.totalUpgradeClicks || 0)}</p>
            <p className="text-[11px] font-black text-emerald-700">{stats?.upgradeClickRate || 0}%</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-amber-700">Stayed Free</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{formatNumber(stats?.totalStayFreeClicks || 0)}</p>
            <p className="text-[11px] font-black text-amber-700">{stats?.stayFreeRate || 0}%</p>
          </div>
        </div>
      </button>

      {expanded ? (
        <div className="border-t border-slate-200 px-4 pb-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="py-3">Day</th>
                  <th className="py-3">Views</th>
                  <th className="py-3">Upgrade Clicked</th>
                  <th className="py-3">Stayed Free</th>
                  <th className="py-3">Upgrade Rate</th>
                  <th className="py-3">Free Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-bold text-slate-900">
                {days.map((day) => (
                  <tr key={day.dayNumber}>
                    <td className="py-3">Day {day.dayNumber}</td>
                    <td className="py-3">{formatNumber(day.views)}</td>
                    <td className="py-3 text-emerald-600">{formatNumber(day.upgradeClicks)}</td>
                    <td className="py-3 text-amber-600">{formatNumber(day.stayFreeClicks)}</td>
                    <td className="py-3">{day.upgradeClickRate}%</td>
                    <td className="py-3">{day.stayFreeRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function TrafficSourcesView({ report }: { report?: AnalyticsResponse["trafficSources"] }) {
  const sources = report?.sources || [];
  const totalVisitors = report?.totalVisitors || 0;
  const totalSignups = sources.reduce((sum, source) => sum + source.signups, 0);
  const [selectedSource, setSelectedSource] = useState<(typeof sources)[number] | null>(null);
  const selectedRows = selectedSource?.visitorRows || [];

  return (
    <section className="mt-8 space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Landing Page Traffic</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Traffic Sources</h2>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Based on unique people/sessions that reached the landing page in the selected time window.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Landing Visitors</p>
              <p className="mt-1 text-3xl font-black text-slate-950">{formatNumber(totalVisitors)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Sign Ups</p>
              <p className="mt-1 text-3xl font-black text-slate-950">{formatNumber(totalSignups)}</p>
            </div>
          </div>
        </div>
      </div>

      {sources.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sources.map((source, index) => {
            const color = TRAFFIC_SOURCE_COLORS[index % TRAFFIC_SOURCE_COLORS.length];
            return (
              <button
                key={source.source}
                type="button"
                onClick={() => setSelectedSource(source)}
                className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${color} bg-white p-5 text-left shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xl font-black text-slate-950">{source.source}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{formatNumber(source.visitors)} landing visitors</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-700">{formatNumber(source.signups)} sign ups</p>
                  </div>
                  <div className="rounded-full bg-white/80 px-3 py-1 text-sm font-black shadow-sm">
                    {source.percent}%
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-black text-slate-700">
                  <div className="rounded-lg bg-white/70 px-3 py-2 ring-1 ring-slate-200">
                    <p className="uppercase tracking-[0.12em] text-slate-500">Signup Rate</p>
                    <p className="mt-1 text-base text-slate-950">{source.signupRate}%</p>
                  </div>
                  <div className="rounded-lg bg-white/70 px-3 py-2 ring-1 ring-slate-200">
                    <p className="uppercase tracking-[0.12em] text-slate-500">Sign Ups</p>
                    <p className="mt-1 text-base text-slate-950">{formatNumber(source.signups)}</p>
                  </div>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/70 ring-1 ring-slate-200">
                  <div className="h-full rounded-full bg-current transition-all" style={{ width: `${Math.min(100, Math.max(0, source.percent))}%` }} />
                </div>
                <p className="mt-3 text-xs font-black text-slate-700">Click to see referrers</p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-black text-slate-950">No landing page traffic yet</p>
          <p className="mt-2 text-sm font-medium text-slate-600">When visitors reach the landing page, sources like Threads, Instagram, Google, YouTube, and Direct will show here.</p>
        </div>
      )}

      {selectedSource ? (
        <div className="fixed inset-0 z-[120] flex items-end justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm sm:items-center">
          <div className="max-h-[84vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">Traffic Source</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">{selectedSource.source}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {formatNumber(selectedSource.visitors)} landing visitors, {formatNumber(selectedSource.signups)} sign ups in this window
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSource(null)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            <div className="max-h-[64vh] overflow-y-auto px-5 py-4">
              {selectedRows.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                      <tr>
                        <th className="py-3 pr-4">Visitor</th>
                        <th className="py-3 pr-4">Came From</th>
                        <th className="py-3 pr-4">Landing Link</th>
                        <th className="py-3">First Seen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
                      {selectedRows.map((row) => (
                        <tr key={`${row.actorId}-${row.firstSeenAt || ""}`}>
                          <td className="py-3 pr-4 align-top">
                            <p className="font-black text-slate-950">{row.visitorLabel}</p>
                            <p className="mt-0.5 text-xs text-slate-500">{shortId(row.actorId)}</p>
                          </td>
                          <td className="max-w-[280px] py-3 pr-4 align-top">
                            {row.referrer ? (
                              <a href={row.referrer} target="_blank" rel="noreferrer" className="break-all text-blue-700 underline decoration-blue-300 underline-offset-2">
                                {row.referrer}
                              </a>
                            ) : (
                              <span className="text-slate-500">No referrer captured</span>
                            )}
                          </td>
                          <td className="max-w-[260px] py-3 pr-4 align-top">
                            <a href={row.landingUrl} target="_blank" rel="noreferrer" className="break-all text-slate-800 underline decoration-slate-300 underline-offset-2">
                              {row.pagePath || row.landingUrl}
                            </a>
                          </td>
                          <td className="whitespace-nowrap py-3 align-top text-slate-600">{row.firstSeenAt ? formatDateTime(row.firstSeenAt) : "Unknown"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm font-bold text-slate-500">No visitor rows captured for this source.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function TimelineStatusIcon({ status }: { status: VisitorJourneyRow["timeline"][number]["status"] }) {
  const styles = {
    completed: "bg-emerald-500 text-white shadow-[0_0_24px_rgba(16,185,129,0.36)]",
    active: "bg-blue-500 text-white shadow-[0_0_24px_rgba(59,130,246,0.4)]",
    warning: "bg-amber-400 text-slate-950 shadow-[0_0_24px_rgba(251,191,36,0.38)]",
    dropped: "bg-rose-500 text-white shadow-[0_0_24px_rgba(244,63,94,0.38)]",
  };
  return (
    <span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-black ${styles[status]}`}>
      {status === "completed" ? (
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3.5 8.2 2.7 2.6 6.3-6.6" />
        </svg>
      ) : status === "warning" ? "!" : status === "dropped" ? "x" : "•"}
    </span>
  );
}

function UserJourneyTimeline({ row }: { row: VisitorJourneyRow }) {
  const details = row.details;
  const timeline = row.timeline || [];
  const completedTasks = timeline.filter((event) => event.category === "bible_year" && event.status === "completed").length;
  const latestDay = details.currentDay || details.lastCompletedDay || 0;

  return (
    <div className="rounded-b-2xl border-x border-b border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-surface-soft,#eef4f8)] p-4 text-[var(--bb-text-primary,#101827)] shadow-[0_18px_46px_rgba(15,23,42,0.12)]">
      <section className="rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">User Journey Timeline</p>
              <h3 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#101827)]">Everything this visitor has done</h3>
              <p className="mt-1 text-sm font-medium text-[var(--bb-text-secondary,#334155)]">Landing page, signup, and Bible in One Year progress.</p>
            </div>
            <div className="rounded-lg bg-[var(--bb-accent-soft,#e6f1ff)] px-3 py-2 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
              Total Journey Time: {details.totalTimeLabel}
            </div>
          </div>

          <div className="mt-5 overflow-x-auto pb-2">
            <div className="flex min-w-[900px] items-start">
              {timeline.length ? timeline.map((event, index) => (
                <div key={event.id} className="relative min-w-[150px] flex-1 px-2 text-center">
                  {index < timeline.length - 1 ? <span className="absolute left-1/2 top-[18px] h-0.5 w-full bg-blue-400/30" /> : null}
                  <div className="relative z-10 mx-auto w-fit">
                    <TimelineStatusIcon status={event.status} />
                  </div>
                  <p className="mt-3 text-[11px] font-semibold text-[var(--bb-text-muted,#64748b)]">{formatDateTime(event.timestamp)}</p>
                  <p className="mt-2 text-sm font-black leading-5 text-[var(--bb-text-primary,#101827)]">{event.title}</p>
                  <p className="mt-1 text-[11px] font-semibold text-[var(--bb-accent,#2f7fe8)]">{event.eventName}</p>
                  <p className="mt-2 text-xs leading-5 text-[var(--bb-text-secondary,#334155)]">{event.timeSincePreviousLabel || event.timeSinceFirstLabel || event.detail}</p>
                </div>
              )) : (
                <div className="rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-5 text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">
                  No detailed events found for this visitor yet.
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-3 border-t border-[var(--bb-card-border,#d8e3ec)] pt-4 sm:grid-cols-5">
            <div className="rounded-lg bg-[var(--bb-surface-soft,#eef4f8)] p-3">
              <p className="text-xs font-bold text-[var(--bb-text-muted,#64748b)]">Start Journey</p>
              <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#101827)]">{row.timeline.some((event) => event.title === "Clicked Start Journey") ? "Clicked" : "Not clicked"}</p>
            </div>
            <div className="rounded-lg bg-[var(--bb-surface-soft,#eef4f8)] p-3">
              <p className="text-xs font-bold text-[var(--bb-text-muted,#64748b)]">Current Day</p>
              <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#101827)]">{latestDay ? `Day ${latestDay}` : "None"}</p>
            </div>
            <div className="rounded-lg bg-[var(--bb-surface-soft,#eef4f8)] p-3">
              <p className="text-xs font-bold text-[var(--bb-text-muted,#64748b)]">Days Complete</p>
              <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#101827)]">{completedTasks}</p>
            </div>
            <div className="rounded-lg bg-[var(--bb-surface-soft,#eef4f8)] p-3">
              <p className="text-xs font-bold text-[var(--bb-text-muted,#64748b)]">Account</p>
              <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#101827)]">{details.accountType}</p>
            </div>
            <div className="rounded-lg bg-[var(--bb-surface-soft,#eef4f8)] p-3">
              <p className="text-xs font-bold text-[var(--bb-text-muted,#64748b)]">Next Action</p>
              <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#101827)]">{row.currentStatus === "dropped_off" ? "Re-engage" : "Keep going"}</p>
            </div>
          </div>
      </section>
    </div>
  );
}

function VisitorJourneyTableSection({
  loading,
  journeys,
  rows,
  filteredRows,
  search,
  setSearch,
  sourceFilter,
  setSourceFilter,
  statusFilter,
  setStatusFilter,
  accountFilter,
  setAccountFilter,
  expandedVisitorId,
  setExpandedVisitorId,
}: {
  loading: boolean;
  journeys: VisitorJourneys | undefined;
  rows: VisitorJourneyRow[];
  filteredRows: VisitorJourneyRow[];
  search: string;
  setSearch: (value: string) => void;
  sourceFilter: string;
  setSourceFilter: (value: string) => void;
  statusFilter: VisitorJourneyStatus | "all";
  setStatusFilter: (value: VisitorJourneyStatus | "all") => void;
  accountFilter: AccountFilter;
  setAccountFilter: (value: AccountFilter) => void;
  expandedVisitorId: string | null;
  setExpandedVisitorId: (value: string | null | ((current: string | null) => string | null)) => void;
}) {
  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="border-b border-[var(--bb-card-border,#d8e3ec)] p-4">
        <div className="mb-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Visitor Tracker</p>
          <h2 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#101827)]">Visitor journey table</h2>
          <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">The original visitor list is back, under the day cards.</p>
        </div>
        <div className="grid gap-3 xl:grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr_auto]">
          <label className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--bb-text-muted,#64748b)]"><Icon name="search" /></span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by guest, drop off, source, action, or status..."
              className="h-11 w-full rounded-lg border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] pl-11 pr-3 text-sm font-medium text-[var(--bb-text-primary,#101827)] outline-none transition placeholder:text-[var(--bb-text-muted,#64748b)] focus:border-[var(--bb-accent,#2f7fe8)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#e6f1ff)]"
            />
          </label>

          <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)} className="h-11 rounded-lg border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-3 text-sm font-semibold text-[var(--bb-text-primary,#101827)] outline-none focus:border-[var(--bb-accent,#2f7fe8)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#e6f1ff)]">
            <option value="all">All Sources</option>
            {(journeys?.sources || []).map((source) => <option key={source} value={source}>{source}</option>)}
          </select>

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as VisitorJourneyStatus | "all")} className="h-11 rounded-lg border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-3 text-sm font-semibold text-[var(--bb-text-primary,#101827)] outline-none focus:border-[var(--bb-accent,#2f7fe8)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#e6f1ff)]">
            <option value="all">All Statuses</option>
            {(journeys?.statuses || []).map((status) => <option key={status.key} value={status.key}>{status.label}</option>)}
          </select>

          <select value={accountFilter} onChange={(event) => setAccountFilter(event.target.value as AccountFilter)} className="h-11 rounded-lg border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-3 text-sm font-semibold text-[var(--bb-text-primary,#101827)] outline-none focus:border-[var(--bb-accent,#2f7fe8)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#e6f1ff)]">
            <option value="all">All Accounts</option>
            <option value="guest">Guests</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSourceFilter("all");
              setStatusFilter("all");
              setAccountFilter("all");
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 text-sm font-semibold text-[var(--bb-text-primary,#101827)] transition hover:bg-[var(--bb-accent-soft,#e6f1ff)]"
          >
            <Icon name="filter" />
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse text-left">
          <thead className="border-b border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] text-xs font-bold text-[var(--bb-text-secondary,#334155)]">
            <tr>
              <th className="w-10 px-4 py-4"><span className="block h-4 w-4 rounded border border-[var(--bb-card-border,#d8e3ec)]" /></th>
              <th className="px-4 py-4">Visitor Numbers</th>
              <th className="px-4 py-4">Last Active</th>
              <th className="px-4 py-4">Last Action</th>
              <th className="px-4 py-4">Time Spent</th>
              <th className="px-4 py-4">Current Status</th>
              <th className="px-4 py-4">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--bb-card-border,#d8e3ec)] text-sm">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">Loading visitor journeys...</td>
              </tr>
            ) : filteredRows.length ? (
              filteredRows.map((row) => {
                const isExpanded = expandedVisitorId === row.id;
                return (
                  <Fragment key={row.id}>
                    <tr
                      className={`cursor-pointer transition ${isExpanded ? "bg-[var(--bb-accent-soft,#e6f1ff)]" : "hover:bg-[var(--bb-surface-soft,#eef4f8)]"}`}
                      onClick={() => setExpandedVisitorId((current) => current === row.id ? null : row.id)}
                    >
                      <td className="px-4 py-4 align-middle">
                        <span className={`grid h-5 w-5 place-items-center rounded border text-[10px] font-black ${isExpanded ? "border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-accent,#2f7fe8)] text-[var(--bb-button-text,#ffffff)]" : "border-[var(--bb-card-border,#d8e3ec)] text-[var(--bb-text-muted,#64748b)]"}`}>
                          {isExpanded ? "-" : "+"}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.visitorLabel}</div>
                        {row.userId && row.userLabel !== "Guest visitor" ? (
                          <div className="mt-0.5 text-xs font-medium text-[var(--bb-text-secondary,#334155)]">{row.userLabel}</div>
                        ) : null}
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="font-bold text-[var(--bb-text-primary,#101827)]">{formatLastActive(row.lastActiveAt)}</div>
                        <div className="mt-0.5 text-xs font-medium text-[var(--bb-text-secondary,#334155)]">{formatDateTime(row.lastActiveAt)}</div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.dropoffStep || "Unknown"}</div>
                        <div className="mt-0.5 text-xs font-medium text-[var(--bb-text-secondary,#334155)]">{row.lastEventName || "No event name"}</div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.timeSpentLabel || "Unknown"}</div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${STATUS_STYLES[row.currentStatus]}`}>
                          {row.currentStatusLabel}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="font-semibold text-[var(--bb-text-primary,#101827)]">{row.source}</div>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr>
                        <td colSpan={7} className="p-0">
                          <UserJourneyTimeline row={row} />
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">No journeys match these filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-[var(--bb-card-border,#d8e3ec)] px-4 py-4 text-sm text-[var(--bb-text-secondary,#334155)] sm:flex-row sm:items-center sm:justify-between">
        <p>Showing {filteredRows.length} of {rows.length} visitors</p>
        <p className="font-medium">Rows per page: 100</p>
      </div>
    </section>
  );
}

function AnalyticsPageContent({ embedded = false }: { embedded?: boolean } = {}) {
  const [isOwner, setIsOwner] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [windowKey, setWindowKey] = useState<JourneyWindow>("today");
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stripeRevenue, setStripeRevenue] = useState<StripeRevenueSummary | null>(null);
  const [stripeRevenueLoading, setStripeRevenueLoading] = useState(false);
  const [stripeRevenueError, setStripeRevenueError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<VisitorJourneyStatus | "all">("all");
  const [accountFilter, setAccountFilter] = useState<AccountFilter>("all");
  const [activeView, setActiveView] = useState<AnalyticsView>("overview");
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [expandedVisitorId, setExpandedVisitorId] = useState<string | null>(null);
  const [selectedJourneyDay, setSelectedJourneyDay] = useState<JourneyPerformanceDay | null>(null);
  const [showAllJourneyDays, setShowAllJourneyDays] = useState(false);
  const [expandedJourneyPerformanceDay, setExpandedJourneyPerformanceDay] = useState(0);

  useEffect(() => {
    applyAppThemeToDocument(readCachedAppTheme(null));
  }, []);

  useEffect(() => {
    async function checkOwner() {
      const { data: userData } = await supabase.auth.getUser();
      applyAppThemeToDocument(readCachedAppTheme(userData.user?.id || null));
      setIsOwner(userData.user?.email === "moorelouis3@gmail.com");
      setAuthChecked(true);
    }
    void checkOwner();
  }, []);

  useEffect(() => {
    if (!authChecked || !isOwner) return;
    async function loadAnalytics() {
      const cached = getCachedAdminAnalytics<AnalyticsResponse>(windowKey);
      if (cached) {
        setData(cached);
        setLoading(false);
      } else {
        setLoading(true);
      }
      setError(null);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("Owner session expired. Please sign in again.");
        const json = await loadAdminAnalytics<AnalyticsResponse>(windowKey, token, { force: Boolean(cached) });
        setData(json);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Could not load analytics.");
      } finally {
        setLoading(false);
      }
    }
    void loadAnalytics();
  }, [authChecked, isOwner, windowKey]);

  useEffect(() => {
    if (!authChecked || !isOwner) return;
    async function loadStripeRevenue() {
      setStripeRevenueLoading(true);
      setStripeRevenueError(null);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("Owner session expired. Please sign in again.");
        const response = await fetch(`/api/admin/stripe-revenue?window=${windowKey}`, {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = (await response.json()) as StripeRevenueSummary;
        if (!response.ok) throw new Error(json.error || "Could not load Stripe revenue.");
        setStripeRevenue(json);
      } catch (loadError) {
        setStripeRevenueError(loadError instanceof Error ? loadError.message : "Could not load Stripe revenue.");
      } finally {
        setStripeRevenueLoading(false);
      }
    }
    void loadStripeRevenue();
  }, [authChecked, isOwner, windowKey]);

  const journeys = data?.visitorJourneys;
  const rows = journeys?.rows || [];
  const activeNavItem = ANALYTICS_NAV_ITEMS.find((item) => item.key === activeView) || ANALYTICS_NAV_ITEMS[0];
  const bibleYearDaysByNumber = useMemo(() => {
    return new Map((data?.bibleYearDays || []).map((day) => [day.dayNumber, day]));
  }, [data?.bibleYearDays]);
  const metrics = journeys?.metrics || {
    totalVisitors: 0,
    finishedOnboarding: 0,
    startedDay1: 0,
    completedDay1: 0,
    createdFreeAccount: 0,
    upgradedToPro: 0,
    onboardingCompletionRate: 0,
    day1StartRate: 0,
    day1CompletionRate: 0,
    freeAccountRate: 0,
    proUpgradeRate: 0,
  };
  const bibleBuddyFunnelStages = data?.bibleBuddyFunnelStages || [];
  const businessMetrics = data?.businessMetrics || {
    totalUsers: rows.length,
    registeredUsers: 0,
    guestUsers: 0,
    monthlySignups: 0,
    previousMonthlySignups: 0,
    monthlySignupChange: 0,
    lifetimeSignups: 0,
  };
  const landingStageUsers = bibleBuddyFunnelStages.find((stage) => stage.key === "landing")?.users ?? metrics.totalVisitors;
  const journeyPerformanceDays = useMemo(() => buildJourneyPerformanceDays(data?.bibleYearDays), [data?.bibleYearDays]);
  const startJourneyClicks = getStageUsers(bibleBuddyFunnelStages, "clickedStart") || data?.customerJourney?.startClicks || data?.customerJourney?.guestStarts || 0;
  const signupsCompleted = getStageUsers(bibleBuddyFunnelStages, "accountsCreated") || data?.customerJourney?.freeAccounts || metrics.createdFreeAccount || 0;
  const activeListeners = new Set(
    (data?.bibleYearDays || [])
      .flatMap((day) => day.users)
      .filter((user) => user.readingStarted || user.readingCompleted)
      .map((user) => user.userId),
  ).size;
  const dayOnePlays = journeyPerformanceDays.find((day) => day.dayNumber === 1)?.plays || 0;
  const mobileMoneyEarned = stripeRevenue?.revenueRange || stripeRevenue?.revenue30d || "$0";
  const mobileUpgrades = data?.customerJourney?.proUpgrades || metrics.upgradedToPro || 0;
  const mobileDayPlays = data?.audioEngagement?.totalPlays || journeyPerformanceDays.reduce((total, day) => total + day.plays, 0);

  const filteredRows = useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (sourceFilter !== "all" && row.source !== sourceFilter) return false;
      if (statusFilter !== "all" && row.currentStatus !== statusFilter) return false;
      if (accountFilter !== "all" && row.accountType !== accountFilter) return false;
      if (!cleanSearch) return true;
      return [
        row.visitorLabel,
        row.userLabel,
        row.source,
        row.currentStatusLabel,
        row.dropoffStep,
        row.lastEventName,
        row.referrer || "",
      ].some((value) => value.toLowerCase().includes(cleanSearch));
    });
  }, [accountFilter, rows, search, sourceFilter, statusFilter]);

  function exportCsv() {
    const headers = [
      "Visitor",
      "Last Active",
      "Last Action",
      "Time Spent",
      "Current Status",
      "Source",
      "Dropoff Step",
    ];
    const csvRows = filteredRows.map((row) => [
      row.visitorLabel,
      row.lastActiveAt,
      row.dropoffStep,
      row.timeSpentLabel,
      row.currentStatusLabel,
      row.source,
      row.dropoffStep,
    ]);
    const csv = [headers, ...csvRows]
      .map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bible-buddy-journeys-${windowKey}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!authChecked) {
    return <div className={`${embedded ? "min-h-[420px]" : "min-h-screen"} bg-[var(--bb-background,#0e1218)] p-10 text-[var(--bb-text-secondary,#d1d5db)]`}>Checking analytics access...</div>;
  }

  if (!isOwner) {
    return (
      <div className={`grid ${embedded ? "min-h-[420px]" : "min-h-screen"} place-items-center bg-[var(--bb-background,#0e1218)] p-6`}>
        <div className="max-w-md rounded-2xl border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] p-6 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[var(--bb-text-primary,#f9fafb)]">Owner analytics only</h1>
          <p className="mt-2 text-sm text-[var(--bb-text-secondary,#d1d5db)]">This dashboard is only available to the Bible Buddy owner account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bb-analytics-page ${embedded ? "min-h-0" : "min-h-screen"} bg-[var(--bb-background,#0e1218)] text-[var(--bb-text-primary,#f9fafb)]`}>
      <div className={embedded ? "min-h-0" : "min-h-screen"}>
        <main className={`min-w-0 ${embedded ? "px-1 py-1" : "px-4 py-6 sm:px-6 lg:px-10"}`}>
          <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--bb-text-primary,#f9fafb)]">
                {activeView === "overview" ? "Audio Journey Analytics" : activeNavItem.label}
              </h1>
              <p className="mt-2 text-sm font-medium text-[var(--bb-text-secondary,#d1d5db)]">
                {activeView === "overview"
                  ? "See discovery, signups, listening, and Bible journey progression at a glance."
                  : activeView === "bible-year"
                    ? "Open any day to see starts, task completion, users, and drop-off for that Bible study day."
                    : activeView === "traffic-sources"
                      ? "See which sources are bringing people to the Bible Buddy landing page."
                      : "See who opened study notes, which note they opened, and when they opened it."}
              </p>
            </div>

            <div className="hidden flex-col gap-2 md:flex md:flex-row">
              <select
                id="analytics-view"
                value={activeView}
                onChange={(event) => setActiveView(event.target.value as AnalyticsView)}
                className="h-11 min-w-[190px] rounded-lg border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] px-4 text-sm font-semibold text-[var(--bb-text-primary,#f9fafb)] shadow-sm outline-none transition focus:border-[var(--bb-accent,#60a5fa)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#27313d)]"
                aria-label="Analytics view"
              >
                {ANALYTICS_NAV_ITEMS.map((item) => (
                  <option key={item.key} value={item.key}>{item.label}</option>
                ))}
              </select>
              <select
                value={windowKey}
                onChange={(event) => setWindowKey(event.target.value as JourneyWindow)}
                className="h-11 rounded-lg border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] px-4 text-sm font-semibold text-[var(--bb-text-primary,#f9fafb)] shadow-sm outline-none transition focus:border-[var(--bb-accent,#60a5fa)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#27313d)]"
              >
                {WINDOW_OPTIONS.map((option) => (
                  <option key={option.key} value={option.key}>{option.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] px-4 text-sm font-semibold text-[var(--bb-text-primary,#f9fafb)] shadow-sm transition hover:brightness-110"
              >
                <Icon name="export" />
                Export
              </button>
            </div>
          </header>

          {error ? (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{error}</div>
          ) : null}

          {data?.eventSetupRequired ? (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
              Landing event tracking needs setup: {data.eventError || "landing_page_events is not available yet."}
            </div>
          ) : null}

          {activeView !== "overview" && data?.dataHealth?.length ? (
            <section className="mt-6 grid gap-3 lg:grid-cols-2">
              {data.dataHealth.map((warning) => (
                <div
                  key={warning.key}
                  className={`rounded-xl border p-4 text-sm shadow-sm ${
                    warning.severity === "warning"
                      ? "border-amber-300 bg-amber-50 text-amber-900"
                      : "border-blue-200 bg-blue-50 text-blue-900"
                  }`}
                >
                  <p className="font-black">{warning.title}</p>
                  <p className="mt-1 font-semibold leading-5 opacity-80">{warning.detail}</p>
                </div>
              ))}
            </section>
          ) : null}

          {activeView === "overview" ? (
            <MobileAnalyticsHighlights
              windowKey={windowKey}
              setWindowKey={setWindowKey}
              data={data}
              stripeRevenue={stripeRevenue}
              stripeRevenueLoading={stripeRevenueLoading}
              loading={loading}
              totalUsers={businessMetrics.totalUsers}
              moneyEarned={mobileMoneyEarned}
              upgrades={mobileUpgrades}
              landingViews={landingStageUsers}
              signups={signupsCompleted}
              dayPlays={mobileDayPlays}
            />
          ) : null}

          {activeView === "overview" ? (
            <section className="mt-5 space-y-5 md:hidden">
              <FounderFunnelSection
                landingVisitors={landingStageUsers}
                startClicks={startJourneyClicks}
                signups={signupsCompleted}
                rows={rows}
              />
              <ListeningMetricsSection audio={data?.audioEngagement} />
              <AudioHelpfulnessSection
                audioHelpfulness={data?.audioHelpfulness}
                windowLabel={data?.customerJourney?.label || WINDOW_OPTIONS.find((option) => option.key === windowKey)?.label || "Selected range"}
              />
              <StudyNotesMetricsSection studyNotes={data?.studyNotes} />
              <ActiveUsersLast24HoursSection report={data?.activeUsersLast24Hours} />
            </section>
          ) : null}

          {activeView === "overview" ? (
          <section className="mt-6 hidden space-y-8 md:block">
            <div className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">Founder Dashboard</p>
                  <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">Users, signups, revenue, and momentum</h2>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#334155)]">
                    The first screen answers the business questions: how many people are here, how many are signing up, and how much money is coming in.
                  </p>
                </div>
                <div className="rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-2 text-sm font-black text-[var(--bb-text-primary,#101827)]">
                  {data?.customerJourney?.label || WINDOW_OPTIONS.find((option) => option.key === windowKey)?.label}
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <FounderMetricCard
                  title="Total Users"
                  value={formatNumber(businessMetrics.totalUsers)}
                  helper="All registered Bible Buddy accounts."
                  icon="visitors"
                />
                <FounderMetricCard
                  title="Monthly Signups"
                  value={`+${formatNumber(businessMetrics.monthlySignups)}`}
                  helper={`${businessMetrics.monthlySignupChange >= 0 ? "+" : ""}${formatNumber(businessMetrics.monthlySignupChange)} vs previous month.`}
                  icon="user"
                />
                <FounderMetricCard
                  title="Audio Plays"
                  value={formatNumber(data?.audioEngagement?.totalPlays || 0)}
                  helper="How many Bible Buddy audio lessons were played."
                  icon="play"
                />
                <FounderMetricCard
                  title="Revenue"
                  value={stripeRevenue?.revenueRange || stripeRevenue?.revenue30d || "$0"}
                  helper={`Cash collected ${stripeRevenue?.label?.toLowerCase() || "for selected range"}. MRR: ${stripeRevenue?.mrr || "$0"}.`}
                  icon="pro"
                  accent="text-amber-200"
                />
              </div>
              <RegisteredUsersDetailSection users={data?.registeredUsers} />
            </div>

            <FounderFunnelSection
              landingVisitors={landingStageUsers}
              startClicks={startJourneyClicks}
              signups={signupsCompleted}
              rows={rows}
            />

            <ListeningMetricsSection audio={data?.audioEngagement} />

            <AudioHelpfulnessSection
              audioHelpfulness={data?.audioHelpfulness}
              windowLabel={data?.customerJourney?.label || WINDOW_OPTIONS.find((option) => option.key === windowKey)?.label || "Selected range"}
            />

            <StudyNotesMetricsSection studyNotes={data?.studyNotes} />

            <ActiveUsersLast24HoursSection report={data?.activeUsersLast24Hours} />

            <StripeRevenueSection
              revenue={stripeRevenue}
              loading={stripeRevenueLoading}
              error={stripeRevenueError}
            />

            <section>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">Journey Performance</p>
                  <h2 className="mt-1 text-2xl font-black text-[var(--bb-text-primary,#101827)]">Audio engagement by day</h2>
                  <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#334155)]">Click a day to see the lesson detail panel.</p>
                </div>
                <p className="text-sm font-bold text-[var(--bb-text-muted,#64748b)]">Plays use Day task-start events until dedicated audio events are live.</p>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {journeyPerformanceDays.slice(0, 3).map((day) => (
                  <JourneyPerformanceCard key={day.dayNumber} day={day} onOpen={setSelectedJourneyDay} />
                ))}
                <button
                  type="button"
                  onClick={() => setShowAllJourneyDays((current) => !current)}
                  className="group rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-4 text-left shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-accent-soft,#e6f1ff)]"
                  aria-expanded={showAllJourneyDays}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Bible In One Year</p>
                      <h3 className="mt-1 text-base font-black text-[var(--bb-text-primary,#101827)]">View all days</h3>
                      <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">Open every day as cards, then click a day for its stats.</p>
                    </div>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-text-secondary,#334155)]">
                      {showAllJourneyDays ? "-" : "+"}
                    </span>
                  </div>
                  <p className="mt-5 text-3xl font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(journeyPerformanceDays.length)}</p>
                  <p className="mt-2 text-sm font-bold text-[var(--bb-accent,#2f7fe8)]">day cards available</p>
                </button>
              </div>
            </section>

            {showAllJourneyDays ? (
              <AllJourneyDaysExplorer
                days={journeyPerformanceDays}
                expandedDay={expandedJourneyPerformanceDay}
                onToggleDay={setExpandedJourneyPerformanceDay}
              />
            ) : null}

            <VisitorJourneyTableSection
              loading={loading}
              journeys={journeys}
              rows={rows}
              filteredRows={filteredRows}
              search={search}
              setSearch={setSearch}
              sourceFilter={sourceFilter}
              setSourceFilter={setSourceFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              accountFilter={accountFilter}
              setAccountFilter={setAccountFilter}
              expandedVisitorId={expandedVisitorId}
              setExpandedVisitorId={setExpandedVisitorId}
            />

            <AudioJourneyFunnel
              landingVisitors={landingStageUsers}
              startClicks={startJourneyClicks}
              signups={signupsCompleted}
              dayOnePlays={dayOnePlays}
            />
            <JourneyDayDetailPanel day={selectedJourneyDay} onClose={() => setSelectedJourneyDay(null)} />
          </section>
          ) : false ? (
          <>
          <FunnelFlowChart stages={bibleBuddyFunnelStages} />

          <section className="mt-8 rounded-xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-200 p-4">
              <div className="grid gap-3 xl:grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr_auto]">
                <label className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="search" /></span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by guest, drop off, source, action, or status..."
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)} className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100">
                  <option value="all">All Sources</option>
                  {(journeys?.sources || []).map((source) => <option key={source} value={source}>{source}</option>)}
                </select>

                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as VisitorJourneyStatus | "all")} className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100">
                  <option value="all">All Statuses</option>
                  {(journeys?.statuses || []).map((status) => <option key={status.key} value={status.key}>{status.label}</option>)}
                </select>

                <select value={accountFilter} onChange={(event) => setAccountFilter(event.target.value as AccountFilter)} className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100">
                  <option value="all">All Accounts</option>
                  <option value="guest">Guests</option>
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                </select>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSourceFilter("all");
                    setStatusFilter("all");
                    setAccountFilter("all");
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  <Icon name="filter" />
                  Reset
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[920px] w-full border-collapse text-left">
                <thead className="bg-slate-50 text-xs font-bold text-slate-700">
                  <tr>
                    <th className="w-10 px-4 py-4"><span className="block h-4 w-4 rounded border border-slate-300" /></th>
                    <th className="px-4 py-4">Visitor Numbers</th>
                    <th className="px-4 py-4">Last Active</th>
                    <th className="px-4 py-4">Last Action</th>
                    <th className="px-4 py-4">Time Spent</th>
                    <th className="px-4 py-4">Current Status</th>
                    <th className="px-4 py-4">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-sm font-semibold text-slate-500">Loading visitor journeys...</td>
                    </tr>
                  ) : filteredRows.length ? (
                    filteredRows.map((row) => {
                      const isExpanded = expandedVisitorId === row.id;
                      return (
                      <Fragment key={row.id}>
                      <tr
                        className={`cursor-pointer transition ${isExpanded ? "bg-blue-50" : "hover:bg-slate-50"}`}
                        onClick={() => setExpandedVisitorId((current) => current === row.id ? null : row.id)}
                      >
                        <td className="px-4 py-4 align-middle">
                          <span className={`grid h-5 w-5 place-items-center rounded border text-[10px] font-black ${isExpanded ? "border-blue-500 bg-blue-500 text-white" : "border-slate-300 text-slate-400"}`}>
                            {isExpanded ? "-" : "+"}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <div className="font-bold text-slate-900">{row.visitorLabel}</div>
                          {row.userId && row.userLabel !== "Guest visitor" ? (
                            <div className="mt-0.5 text-xs font-medium text-slate-500">{row.userLabel}</div>
                          ) : null}
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <div className="font-bold text-slate-900">{formatLastActive(row.lastActiveAt)}</div>
                          <div className="mt-0.5 text-xs font-medium text-slate-500">{formatDateTime(row.lastActiveAt)}</div>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <div className="font-bold text-slate-900">{row.dropoffStep || "Unknown"}</div>
                          <div className="mt-0.5 text-xs font-medium text-slate-500">{row.lastEventName || "No event name"}</div>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <div className="font-bold text-slate-900">{row.timeSpentLabel || "Unknown"}</div>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${STATUS_STYLES[row.currentStatus]}`}>
                            {row.currentStatusLabel}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <div className="font-semibold text-slate-800">{row.source}</div>
                        </td>
                      </tr>
                      {isExpanded ? (
                        <tr>
                          <td colSpan={7} className="p-0">
                            <UserJourneyTimeline row={row} />
                          </td>
                        </tr>
                      ) : null}
                      </Fragment>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-sm font-semibold text-slate-500">No journeys match these filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <p>Showing {filteredRows.length} of {rows.length} visitors</p>
              <p className="font-medium">Rows per page: 100</p>
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-slate-950">Tracking Model</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Every landing event is grouped by session, then connected to user progress after a guest or account user is created.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-slate-950">Funnel Meaning</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Guest is top of funnel, free account is middle of funnel, and Pro is bottom of funnel.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-slate-950">Next Data Layer</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Long term, use one event table with visitor_id, session_id, user_id, event_name, properties, and indexed timestamps.</p>
            </div>
          </section>
          </>
          ) : activeView === "bible-year" ? (
          <section className="mt-8 rounded-xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-200 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Daily Study Analytics</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">Bible in One Year day rows</h2>
                  <p className="mt-2 text-sm font-medium text-slate-600">Click a day to expand the task and user details for that reading.</p>
                </div>
                <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  {data?.bibleYearDays?.length || 0} days with activity
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((planDay) => {
                const day = bibleYearDaysByNumber.get(planDay.dayNumber);
                const isExpanded = expandedDay === planDay.dayNumber;
                const startedUsers = day?.startedUsers || 0;
                const completedUsers = day?.completedUsers || 0;
                const inProgressUsers = day?.inProgressUsers || 0;
                return (
                  <div key={planDay.dayNumber}>
                    <button
                      type="button"
                      onClick={() => setExpandedDay(isExpanded ? 0 : planDay.dayNumber)}
                      className="grid w-full gap-3 px-5 py-4 text-left transition hover:bg-slate-50 lg:grid-cols-[120px_1.4fr_120px_120px_120px_120px_40px] lg:items-center"
                    >
                      <div>
                        <p className="text-sm font-black text-slate-950">Day {planDay.dayNumber}</p>
                        <p className="text-xs font-semibold text-slate-500">{planDay.reference}</p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-950">{planDay.title}</p>
                        <p className="mt-1 line-clamp-1 text-sm text-slate-500">{planDay.summary}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Task 1 clicked</p>
                        <p className="mt-1 text-lg font-black text-slate-950">{startedUsers}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Finished day</p>
                        <p className="mt-1 text-lg font-black text-emerald-700">{completedUsers}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">In Progress</p>
                        <p className="mt-1 text-lg font-black text-blue-700">{inProgressUsers}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Rate</p>
                        <p className="mt-1 text-lg font-black text-slate-950">{day?.completionRate || 0}%</p>
                      </div>
                      <div className="text-right text-xl font-black text-slate-400">{isExpanded ? "-" : "+"}</div>
                    </button>

                    {isExpanded ? (
                      <div className="bg-slate-50 px-5 pb-5">
                        <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 lg:grid-cols-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Task 1 Video done</p>
                            <p className="mt-1 text-2xl font-black text-slate-950">{day?.readingCompleted || 0}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Task 2 Summary done</p>
                            <p className="mt-1 text-2xl font-black text-slate-950">{day?.reflectionCompleted || 0}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Task 3 Trivia done</p>
                            <p className="mt-1 text-2xl font-black text-slate-950">{day?.triviaCompleted || 0}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Last activity</p>
                            <p className="mt-1 text-sm font-bold text-slate-800">{day?.lastActiveAt ? formatDateTime(day.lastActiveAt) : "No activity yet"}</p>
                          </div>
                        </div>

                        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                          <table className="min-w-[760px] w-full text-left text-sm">
                            <thead className="bg-white text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                              <tr>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Task 1 Scripture Video</th>
                                <th className="px-4 py-3">Task 2 Summary</th>
                                <th className="px-4 py-3">Task 3 Trivia</th>
                                <th className="px-4 py-3">Day Status</th>
                                <th className="px-4 py-3">Updated</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {day?.users.length ? (
                                day.users.map((user) => (
                                  <tr key={`${planDay.dayNumber}-${user.userId}`} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold text-slate-900">{user.userLabel}</td>
                                    <td className="px-4 py-3"><MiniTaskStatus status={getTaskStatus(user.readingStarted, user.readingCompleted)} evidence={user.task1FinishEvent || user.task1StartEvent} /></td>
                                    <td className="px-4 py-3"><MiniTaskStatus status={getTaskStatus(user.reflectionStarted, user.reflectionCompleted)} evidence={user.task2FinishEvent || user.task2StartEvent} /></td>
                                    <td className="px-4 py-3"><MiniTaskStatus status={getTaskStatus(user.triviaStarted, user.triviaCompleted)} evidence={user.task3FinishEvent || user.task3StartEvent} /></td>
                                    <td className="px-4 py-3">
                                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${user.completed ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-blue-50 text-blue-700 ring-blue-200"}`}>
                                        {user.completed ? "Complete" : "In progress"}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-slate-600">{user.updatedAt ? formatDateTime(user.updatedAt) : "Unknown"}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6} className="px-4 py-8 text-center font-semibold text-slate-500">No tracked progress for this day yet.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
          ) : activeView === "traffic-sources" ? (
            <TrafficSourcesView report={data?.trafficSources} />
          ) : (
          <section className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-5">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Total opens</p>
                <p className="mt-2 text-3xl font-black text-slate-950">{formatNumber(data?.studyNotes?.totalOpens || 0)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Unique users</p>
                <p className="mt-2 text-3xl font-black text-slate-950">{formatNumber(data?.studyNotes?.uniqueUsers || 0)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Section opens</p>
                <p className="mt-2 text-3xl font-black text-slate-950">{formatNumber(data?.studyNotes?.sectionOpens || 0)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Chapter note opens</p>
                <p className="mt-2 text-3xl font-black text-slate-950">{formatNumber(data?.studyNotes?.chapterNoteOpens || 0)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Phrase opens</p>
                <p className="mt-2 text-3xl font-black text-slate-950">{formatNumber(data?.studyNotes?.phraseOpens || 0)}</p>
              </div>
            </div>

            <StudyNotesMetricsSection studyNotes={data?.studyNotes} />

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black text-slate-950">Top Study Notes</h2>
                <div className="mt-4 space-y-3">
                  {(data?.studyNotes?.topNotes || []).length ? data?.studyNotes?.topNotes.map((note) => (
                    <div key={note.key} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">{note.label}</p>
                        <p className="mt-0.5 text-xs font-semibold text-slate-500">{note.uniqueUsers} users • last {note.lastOpenedAt ? formatDateTime(note.lastOpenedAt) : "unknown"}</p>
                      </div>
                      <p className="shrink-0 text-lg font-black text-slate-950">{note.opens}</p>
                    </div>
                  )) : <p className="text-sm font-semibold text-slate-500">No study note opens in this window yet.</p>}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black text-slate-950">Top Key Phrases</h2>
                <div className="mt-4 space-y-3">
                  {(data?.studyNotes?.topPhrases || []).length ? data?.studyNotes?.topPhrases.map((phrase) => (
                    <div key={phrase.key} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">{phrase.label}</p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-slate-500">{phrase.sectionLabel}</p>
                      </div>
                      <p className="shrink-0 text-lg font-black text-slate-950">{phrase.opens}</p>
                    </div>
                  )) : <p className="text-sm font-semibold text-slate-500">No key phrase opens in this window yet.</p>}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black text-slate-950">Top Sources</h2>
                <div className="mt-4 space-y-3">
                  {(data?.studyNotes?.topSources || []).length ? data?.studyNotes?.topSources.map((source) => (
                    <div key={source.source} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-3 py-3">
                      <p className="truncate text-sm font-bold text-slate-900">{source.source}</p>
                      <p className="shrink-0 text-lg font-black text-slate-950">{source.opens}</p>
                    </div>
                  )) : <p className="text-sm font-semibold text-slate-500">No source data in this window yet.</p>}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <div className="border-b border-slate-200 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Study Notes Activity</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">Every note open</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-[880px] w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    <tr>
                      <th className="px-4 py-4">User</th>
                      <th className="px-4 py-4">Study Note</th>
                      <th className="px-4 py-4">Source</th>
                      <th className="px-4 py-4">Action</th>
                      <th className="px-4 py-4">Opened</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center font-semibold text-slate-500">Loading study note activity...</td>
                      </tr>
                    ) : data?.studyNotes?.rows.length ? (
                      data.studyNotes.rows.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50">
                          <td className="px-4 py-4 font-bold text-slate-900">{row.userLabel}</td>
                          <td className="px-4 py-4">
                            <p className="font-bold text-slate-900">{row.phraseTitle || row.noteTitle}</p>
                            <p className="mt-0.5 text-xs font-semibold text-slate-500">{row.reference || row.sectionTitle || "Study note"}</p>
                            {row.phraseTitle ? <p className="mt-0.5 text-xs font-semibold text-slate-500">Inside: {row.noteTitle}</p> : null}
                          </td>
                          <td className="px-4 py-4 font-semibold text-slate-700">{row.source}</td>
                          <td className="px-4 py-4">
                            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-200">{row.eventLabel}</span>
                          </td>
                          <td className="px-4 py-4 font-semibold text-slate-700">{formatDateTime(row.openedAt)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center font-semibold text-slate-500">No study note opens match this time window yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return <AnalyticsPageContent />;
}
