"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "@/lib/bibleInOneYearPlan";
import { supabase } from "@/lib/supabaseClient";
import { applyAppThemeToDocument, readCachedAppTheme } from "@/lib/appThemes";
import { getCachedAdminAnalytics, getCachedAdminAnalyticsOverview, loadAdminAnalytics } from "@/lib/adminAnalyticsPreload";

type JourneyWindow = "today" | "yesterday" | "24h" | "7d" | "30d" | "90d" | "this_month" | "lifetime";
type AccountFilter = "all" | "guest" | "free" | "pro";
type AnalyticsView = "overview" | "bible-year" | "study-notes" | "traffic-sources";
type SimpleAnalyticsMetric = "overview" | "revenue" | "signups" | "upgrades" | "completion_popup";

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

type CompletionUpgradeAnalytics = {
  totalViews: number;
  totalCloses: number;
  totalUpgradeClicks: number;
  totalLifetimeClicks: number;
  totalMonthlyClicks: number;
  totalContinueFreeClicks: number;
  totalSuccessfulUpgrades: number;
  closeRate: number;
  upgradeClickRate: number;
  upgradeRate: number;
  upgradeFromClickRate: number;
  series: {
    views: Array<{ label: string; value: number }>;
    closes: Array<{ label: string; value: number }>;
    upgradeClicks: Array<{ label: string; value: number }>;
    lifetimeClicks: Array<{ label: string; value: number }>;
    monthlyClicks: Array<{ label: string; value: number }>;
    continueFreeClicks: Array<{ label: string; value: number }>;
    successfulUpgrades: Array<{ label: string; value: number }>;
  };
  comparisons: {
    views: { current: number; previous: number; change: number };
    closes: { current: number; previous: number; change: number };
    upgradeClicks: { current: number; previous: number; change: number };
    lifetimeClicks: { current: number; previous: number; change: number };
    monthlyClicks: { current: number; previous: number; change: number };
    continueFreeClicks: { current: number; previous: number; change: number };
    successfulUpgrades: { current: number; previous: number; change: number };
  };
};

type BibleYearDayAnalytics = {
  dayNumber: number;
  startedUsers: number;
  completedUsers: number;
  inProgressUsers: number;
  readingCompleted: number;
  triviaCompleted: number;
  reflectionCompleted: number;
  videoWatchUsers: number;
  videoCompletedUsers: number;
  totalWatchSeconds: number;
  averageWatchSeconds: number;
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
    videoWatchedSeconds: number;
    videoDurationSeconds: number;
    videoWatchPercent: number;
    videoCompleted: boolean;
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
  partial?: boolean;
  simpleSeries?: {
    signups: Array<{ label: string; value: number }>;
    upgrades: Array<{ label: string; value: number }>;
  };
  simpleComparisons?: {
    signups: { current: number; previous: number; change: number };
    upgrades: { current: number; previous: number; change: number };
  };
  businessMetrics?: {
    totalUsers: number;
    registeredUsers: number;
    guestUsers: number;
    monthlySignups: number;
    previousMonthlySignups: number;
    monthlySignupChange: number;
    lifetimeSignups: number;
  };
  activitySummary?: {
    activeUsers: number;
    totalActions: number;
    daysCompleted: number;
    landingConversionRate: number;
    landingVisitors: number;
    signups: number;
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
  newUserFirstThreeDays?: {
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
    rows: Array<{
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
    }>;
  };
  visitorJourneys?: VisitorJourneys;
  activeUsersLast24Hours?: ActiveUsersLast24Hours;
  bibleBuddyFunnelStages?: FunnelStageRow[];
  dayThreeUpgrade?: DayThreeUpgradeAnalytics;
  daySevenUpgrade?: DayThreeUpgradeAnalytics;
  studyNotesUpgrade?: StudyNotesUpgradeAnalytics;
  completionUpgrade?: CompletionUpgradeAnalytics;
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

type AnalyticsDrilldownKind = "active_users" | "actions" | "signups" | "days_completed";

type AnalyticsDrilldownResponse = {
  error?: string;
  window: JourneyWindow;
  activeUsers: Array<{
    actorId: string;
    userId: string | null;
    userLabel: string;
    streak: number;
    currentDay: number | null;
    totalActions: number;
    lifetimeActions: number;
    accountType: string;
    lastAction: string;
    lastActiveAt: string;
  }>;
  actions: Array<{
    id: string;
    userId: string | null;
    userLabel: string;
    actionType: string;
    actionTitle: string;
    detail: string;
    dayNumber: number | null;
    createdAt: string;
  }>;
  signups: Array<{
    userId: string;
    userLabel: string;
    source: string;
    currentDay: number;
    accountType: string;
    createdAt: string;
  }>;
  daysCompleted: Array<{
    id: string;
    userId: string | null;
    userLabel: string;
    dayNumber: number | null;
    streak: number;
    createdAt: string;
  }>;
};

type AnalyticsActionRow = AnalyticsDrilldownResponse["actions"][number];

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
  yearlySubscriptions?: number;
  trialingSubscriptions: number;
  totalSubscriptionsTracked: number;
  revenue30dCents: number;
  revenue30d: string;
  revenueRangeCents?: number;
  revenueRange?: string;
  monthlyRevenueRangeCents?: number;
  monthlyRevenueRange?: string;
  lifetimeRevenueRangeCents?: number;
  lifetimeRevenueRange?: string;
  yearlyRevenueRangeCents?: number;
  yearlyRevenueRange?: string;
  monthlySignupsRange?: number;
  lifetimeSignupsRange?: number;
  lifetimeCustomers?: number;
  monthlyRevenueSeries?: Array<{
    month: string;
    label: string;
    monthly: number;
    lifetime: number;
    total: number;
  }>;
  oneTime30dCents: number;
  oneTime30d: string;
  oneTimeRangeCents?: number;
  oneTimeRange?: string;
  series?: Array<{ label: string; value: number }>;
  comparison?: { current: number; previous: number; change: number };
  upgradesRange?: number;
  upgradeSeries?: Array<{ label: string; value: number }>;
  upgradeComparison?: { current: number; previous: number; change: number };
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
  { key: "90d", label: "Last 90 days" },
  { key: "this_month", label: "This month" },
  { key: "lifetime", label: "Lifetime" },
];

const SIMPLE_METRIC_OPTIONS: Array<{ key: SimpleAnalyticsMetric; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "revenue", label: "Revenue" },
  { key: "signups", label: "Signups" },
  { key: "upgrades", label: "Upgrades" },
  { key: "completion_popup", label: "Completion Popup" },
];

const SIMPLE_WINDOW_OPTIONS: Array<{ key: JourneyWindow; label: string }> = [
  { key: "today", label: "Today" },
  { key: "7d", label: "7 Days" },
  { key: "30d", label: "30 Days" },
  { key: "90d", label: "90 Days" },
  { key: "lifetime", label: "All Time" },
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

function getAdminActionColorClass(actionType: string) {
  if (actionType.includes("completed") || actionType.includes("upgraded")) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (actionType.includes("opened") || actionType.includes("viewed") || actionType.includes("read")) return "bg-blue-50 text-blue-700 ring-blue-200";
  if (actionType.includes("posted") || actionType.includes("created") || actionType.includes("added") || actionType.includes("sent")) return "bg-violet-50 text-violet-700 ring-violet-200";
  if (actionType.includes("liked") || actionType.includes("comment") || actionType.includes("reply")) return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-slate-50 text-slate-700 ring-slate-200";
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
      uniqueListeners: day?.videoWatchUsers || plays,
      avgListenTimeLabel: formatListenDuration(day?.averageWatchSeconds || 0),
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

function Icon({ name }: { name: "visitors" | "check" | "book" | "flame" | "user" | "pro" | "search" | "filter" | "export" | "play" | "headphones" | "spark" | "arrow" | "analytics" }) {
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
  if (name === "analytics") {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5V5.5" /><path d="M4 19.5h16" /><path d="m7 14 3-3 3 2 4-5" /></svg>;
  }
  return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
}

function formatMoneyValue(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getSimpleMetricSeries(
  metric: Exclude<SimpleAnalyticsMetric, "overview">,
  data: AnalyticsResponse | null,
  stripeRevenue: StripeRevenueSummary | null,
) {
  if (metric === "revenue") return stripeRevenue?.series || [];
  if (metric === "signups") return data?.simpleSeries?.signups || [];
  if (metric === "upgrades") return stripeRevenue?.upgradeSeries || data?.simpleSeries?.upgrades || [];
  return data?.completionUpgrade?.series.views || [];
}

function getSimpleMetricTotal(
  metric: Exclude<SimpleAnalyticsMetric, "overview">,
  data: AnalyticsResponse | null,
  stripeRevenue: StripeRevenueSummary | null,
) {
  if (metric === "revenue") {
    return stripeRevenue?.revenueRange || stripeRevenue?.revenue30d || "$0";
  }
  if (metric === "signups") {
    const total = (data?.simpleSeries?.signups || []).reduce((sum, point) => sum + point.value, 0);
    const fallback = data?.customerJourney?.freeAccounts || data?.visitorJourneys?.metrics?.createdFreeAccount || 0;
    return formatNumber(total || fallback);
  }
  if (metric === "completion_popup") {
    return formatNumber(data?.completionUpgrade?.totalViews || 0);
  }
  if (typeof stripeRevenue?.upgradesRange === "number") return formatNumber(stripeRevenue.upgradesRange);
  const total = (data?.simpleSeries?.upgrades || []).reduce((sum, point) => sum + point.value, 0);
  const fallback = data?.customerJourney?.proUpgrades || data?.visitorJourneys?.metrics?.upgradedToPro || 0;
  return formatNumber(total || fallback);
}

function getSimpleMetricTitle(metric: Exclude<SimpleAnalyticsMetric, "overview">) {
  if (metric === "revenue") return "Revenue";
  if (metric === "signups") return "Signups";
  if (metric === "completion_popup") return "Completion Popup";
  return "Upgrades";
}

function getSimpleMetricHelper(metric: Exclude<SimpleAnalyticsMetric, "overview">) {
  if (metric === "revenue") return "Cash collected in the selected timeframe.";
  if (metric === "signups") return "New accounts created in the selected timeframe.";
  if (metric === "completion_popup") return "How often the free completion upgrade prompt was shown.";
  return "Users who upgraded to Pro in the selected timeframe.";
}

function getSimpleMetricAccent(metric: Exclude<SimpleAnalyticsMetric, "overview">) {
  if (metric === "revenue") return "text-blue-600 bg-blue-50 ring-blue-100";
  if (metric === "signups") return "text-emerald-600 bg-emerald-50 ring-emerald-100";
  if (metric === "completion_popup") return "text-amber-600 bg-amber-50 ring-amber-100";
  return "text-violet-600 bg-violet-50 ring-violet-100";
}

function getSimpleMetricGranularity(windowKey: JourneyWindow) {
  if (windowKey === "today") return "Hourly";
  if (windowKey === "7d" || windowKey === "30d") return "Daily";
  if (windowKey === "90d") return "Weekly";
  return "Monthly";
}

function getComparisonLabel(windowKey: JourneyWindow) {
  if (windowKey === "today") return "vs previous day";
  if (windowKey === "7d") return "vs previous 7 days";
  if (windowKey === "30d") return "vs previous 30 days";
  if (windowKey === "90d") return "vs previous 90 days";
  return "";
}

function ComparisonChip({ change, label }: { change: number; label: string }) {
  const positive = change >= 0;
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-black ring-1 ${positive ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : "bg-rose-50 text-rose-700 ring-rose-100"}`}>
      <span>{positive ? "↑" : "↓"}</span>
      <span>{Math.abs(change).toFixed(1)}%</span>
      {label ? <span className="font-semibold opacity-80">{label}</span> : null}
    </div>
  );
}

function SimpleAnalyticsKpiCard({
  title,
  value,
  helper,
  accent = "blue",
  comparison,
  comparisonLabel,
  onClick,
  active = false,
}: {
  title: string;
  value: string;
  helper: string;
  accent?: "blue" | "green" | "violet";
  comparison?: number | null;
  comparisonLabel?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const accentStyles =
    accent === "green"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : accent === "violet"
        ? "bg-violet-50 text-violet-700 ring-violet-100"
        : "bg-blue-50 text-blue-700 ring-blue-100";

  const content = (
    <>
      <div className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] ring-1 ${accentStyles}`}>
        {title}
      </div>
      <p className="mt-4 text-4xl font-black tracking-tight text-[var(--bb-text-primary,#101827)]">{value}</p>
      {typeof comparison === "number" && comparisonLabel ? (
        <div className="mt-3">
          <ComparisonChip change={comparison} label={comparisonLabel} />
        </div>
      ) : null}
      <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#64748b)]">{helper}</p>
      {onClick ? <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-blue-600">View details</p> : null}
    </>
  );

  const className = `w-full rounded-[24px] border bg-[var(--bb-card,#ffffff)] p-5 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${active ? "border-blue-500 ring-4 ring-blue-100" : "border-[var(--bb-card-border,#d8e3ec)]"}`;
  return onClick ? (
    <button type="button" onClick={onClick} className={`${className} transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_20px_48px_rgba(37,99,235,0.14)]`} aria-expanded={active}>
      {content}
    </button>
  ) : <div className={className}>{content}</div>;
}

function AnalyticsDrilldownPanel({
  kind,
  data,
  loading,
  error,
  onClose,
}: {
  kind: AnalyticsDrilldownKind;
  data: AnalyticsDrilldownResponse | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
}) {
  const config = {
    active_users: { title: "Active Users", subtitle: "Everyone with at least one tracked action in this timeframe." },
    actions: { title: "Master Actions", subtitle: "The complete tracked activity feed for this timeframe." },
    signups: { title: "Signups", subtitle: "Who joined, where they came from, and where they are now." },
    days_completed: { title: "Days Completed", subtitle: "Every Bible in One Year completion recorded in this timeframe." },
  }[kind];
  const rowCount = kind === "active_users" ? data?.activeUsers.length : kind === "actions" ? data?.actions.length : kind === "signups" ? data?.signups.length : data?.daysCompleted.length;

  return (
    <section className="overflow-hidden rounded-[26px] border border-blue-200 bg-white shadow-[0_20px_52px_rgba(15,23,42,0.10)]">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Details</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{config.title}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-600">{config.subtitle}</p>
        </div>
        <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 text-xl font-black text-slate-700" aria-label="Close details">×</button>
      </div>

      {loading ? <p className="px-5 py-12 text-center text-sm font-bold text-slate-600">Loading details...</p> : null}
      {error ? <p className="m-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p> : null}

      {!loading && !error ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            {kind === "active_users" ? (
              <>
                <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500"><tr><th className="px-5 py-3">User</th><th className="px-4 py-3">Streak</th><th className="px-4 py-3">BIOY Day</th><th className="px-4 py-3">Actions</th><th className="px-4 py-3">Last Action</th><th className="px-5 py-3">Last Active</th></tr></thead>
                <tbody className="divide-y divide-slate-200">{data?.activeUsers.map((row) => <tr key={row.actorId}><td className="px-5 py-4"><p className="font-black text-slate-950">{row.userLabel}</p><p className="text-xs font-semibold text-slate-500">{row.accountType}</p></td><td className="px-4 py-4 font-bold">{row.streak} days</td><td className="px-4 py-4 font-bold">{row.currentDay ? `Day ${row.currentDay}` : "—"}</td><td className="px-4 py-4"><p className="font-black text-blue-600">{row.totalActions}</p><p className="text-xs text-slate-500">{row.lifetimeActions} lifetime</p></td><td className="px-4 py-4 font-semibold">{row.lastAction}</td><td className="px-5 py-4 font-semibold">{formatDateTime(row.lastActiveAt)}</td></tr>)}</tbody>
              </>
            ) : null}
            {kind === "actions" ? (
              <>
                <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500"><tr><th className="px-5 py-3">User</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">Details</th><th className="px-4 py-3">Day</th><th className="px-5 py-3">Time</th></tr></thead>
                <tbody className="divide-y divide-slate-200">{data?.actions.map((row) => <tr key={row.id}><td className="px-5 py-4 font-black text-slate-950">{row.userLabel}</td><td className="px-4 py-4 font-bold">{row.actionTitle}</td><td className="max-w-[300px] px-4 py-4 text-slate-600">{row.detail}</td><td className="px-4 py-4 font-semibold">{row.dayNumber ? `Day ${row.dayNumber}` : "—"}</td><td className="px-5 py-4 font-semibold">{formatDateTime(row.createdAt)}</td></tr>)}</tbody>
              </>
            ) : null}
            {kind === "signups" ? (
              <>
                <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500"><tr><th className="px-5 py-3">User</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">BIOY Day</th><th className="px-4 py-3">Account</th><th className="px-5 py-3">Signed Up</th></tr></thead>
                <tbody className="divide-y divide-slate-200">{data?.signups.map((row) => <tr key={row.userId}><td className="px-5 py-4 font-black text-slate-950">{row.userLabel}</td><td className="px-4 py-4 font-semibold">{row.source}</td><td className="px-4 py-4 font-bold">Day {row.currentDay}</td><td className="px-4 py-4 font-semibold">{row.accountType}</td><td className="px-5 py-4 font-semibold">{formatDateTime(row.createdAt)}</td></tr>)}</tbody>
              </>
            ) : null}
            {kind === "days_completed" ? (
              <>
                <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500"><tr><th className="px-5 py-3">User</th><th className="px-4 py-3">Completed Day</th><th className="px-4 py-3">Current Streak</th><th className="px-5 py-3">Completed At</th></tr></thead>
                <tbody className="divide-y divide-slate-200">{data?.daysCompleted.map((row) => <tr key={row.id}><td className="px-5 py-4 font-black text-slate-950">{row.userLabel}</td><td className="px-4 py-4 font-black text-blue-600">{row.dayNumber ? `Day ${row.dayNumber}` : "Unknown"}</td><td className="px-4 py-4 font-semibold">{row.streak} days</td><td className="px-5 py-4 font-semibold">{formatDateTime(row.createdAt)}</td></tr>)}</tbody>
              </>
            ) : null}
          </table>
          {!rowCount ? <p className="px-5 py-12 text-center text-sm font-bold text-slate-500">No records in this timeframe.</p> : null}
        </div>
      ) : null}
    </section>
  );
}

function SimpleAnalyticsChart({
  points,
  valueFormatter,
}: {
  points: Array<{ label: string; value: number }>;
  valueFormatter?: (value: number) => string;
}) {
  if (!points.length) {
    return (
      <div className="flex h-[220px] items-center justify-center rounded-[22px] border border-dashed border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#f8fbff)] text-sm font-semibold text-[var(--bb-text-secondary,#64748b)]">
        No data yet for this timeframe.
      </div>
    );
  }

  const width = 680;
  const height = 220;
  const leftPad = 14;
  const rightPad = 14;
  const topPad = 22;
  const bottomPad = 34;
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const stepX = points.length === 1 ? 0 : (width - leftPad - rightPad) / (points.length - 1);
  const coordinates = points.map((point, index) => {
    const x = leftPad + index * stepX;
    const normalized = point.value / maxValue;
    const y = topPad + (1 - normalized) * (height - topPad - bottomPad);
    return { ...point, x, y };
  });
  const linePath = coordinates.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${coordinates[coordinates.length - 1]?.x ?? leftPad} ${height - bottomPad} L ${coordinates[0]?.x ?? leftPad} ${height - bottomPad} Z`;
  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks }, (_, index) => Math.round((maxValue / (yTicks - 1)) * (yTicks - 1 - index)));

  return (
    <div className="overflow-hidden rounded-[24px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <div className="h-[260px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none" role="img" aria-label="Analytics chart">
          <defs>
            <linearGradient id="analytics-area-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          {tickValues.map((tick, index) => {
            const y = topPad + (index / (tickValues.length - 1 || 1)) * (height - topPad - bottomPad);
            return (
              <g key={`${tick}-${index}`}>
                <line x1={leftPad} x2={width - rightPad} y1={y} y2={y} stroke="#dbe7f3" strokeDasharray="4 6" />
                <text x={0} y={y + 4} fontSize="12" fill="#7c8aa5">
                  {valueFormatter ? valueFormatter(tick) : formatNumber(tick)}
                </text>
              </g>
            );
          })}
          <path d={areaPath} fill="url(#analytics-area-gradient)" />
          <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {coordinates.map((point) => (
            <g key={`${point.label}-${point.x}`}>
              <circle cx={point.x} cy={point.y} r="6.5" fill="#2563eb" />
              <circle cx={point.x} cy={point.y} r="3" fill="#ffffff" />
            </g>
          ))}
          {coordinates.map((point) => (
            <text key={`label-${point.label}`} x={point.x} y={height - 8} textAnchor="middle" fontSize="12" fill="#64748b">
              {point.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function SimpleAnalyticsOverviewChart({
  title,
  value,
  points,
  loading,
  valueFormatter,
}: {
  title: string;
  value: string;
  points: Array<{ label: string; value: number }>;
  loading: boolean;
  valueFormatter?: (value: number) => string;
}) {
  const width = 320;
  const height = 120;
  const pad = 10;
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const stepX = points.length <= 1 ? 0 : (width - pad * 2) / (points.length - 1);
  const coordinates = points.map((point, index) => ({
    ...point,
    x: pad + index * stepX,
    y: pad + (1 - point.value / maxValue) * (height - pad * 2),
  }));
  const linePath = coordinates.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = coordinates.length
    ? `${linePath} L ${coordinates[coordinates.length - 1].x} ${height - pad} L ${coordinates[0].x} ${height - pad} Z`
    : "";
  const gradientId = `overview-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;

  return (
    <section className="rounded-[24px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-4 shadow-[0_14px_34px_rgba(15,23,42,0.07)]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">{title}</p>
          <p className="mt-1 text-3xl font-black text-[var(--bb-text-primary,#101827)]">{loading ? "..." : value}</p>
        </div>
        {points.length ? (
          <p className="text-xs font-bold text-[var(--bb-text-secondary,#64748b)]">
            Peak {valueFormatter ? valueFormatter(maxValue) : formatNumber(maxValue)}
          </p>
        ) : null}
      </div>
      <div className="mt-3 h-[140px]">
        {points.length ? (
          <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none" role="img" aria-label={`${title} trend chart`}>
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <line x1={pad} x2={width - pad} y1={height - pad} y2={height - pad} stroke="#dbe7f3" strokeWidth="1" />
            <path d={areaPath} fill={`url(#${gradientId})`} />
            <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {coordinates.map((point) => <circle key={`${title}-${point.label}`} cx={point.x} cy={point.y} r="4" fill="#2563eb" />)}
          </svg>
        ) : (
          <div className="grid h-full place-items-center rounded-[18px] bg-[var(--bb-surface-soft,#f8fbff)] text-sm font-bold text-[var(--bb-text-secondary,#64748b)]">
            No data in this timeframe.
          </div>
        )}
      </div>
      {points.length ? (
        <div className="mt-1 flex justify-between text-xs font-semibold text-[var(--bb-text-secondary,#64748b)]">
          <span>{points[0]?.label}</span>
          <span>{points[points.length - 1]?.label}</span>
        </div>
      ) : null}
    </section>
  );
}

function SimpleAnalyticsChartCard({
  metric,
  windowKey,
  value,
  points,
  loading,
  comparison,
}: {
  metric: Exclude<SimpleAnalyticsMetric, "overview">;
  windowKey: JourneyWindow;
  value: string;
  points: Array<{ label: string; value: number }>;
  loading: boolean;
  comparison?: number | null;
}) {
  const accentClass = getSimpleMetricAccent(metric);
  const granularity = getSimpleMetricGranularity(windowKey);
  const timeframeLabel = SIMPLE_WINDOW_OPTIONS.find((option) => option.key === windowKey)?.label || "Selected timeframe";

  return (
    <section className="rounded-[28px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_46px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-[var(--bb-text-secondary,#64748b)]">{getSimpleMetricTitle(metric)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-[44px] font-black leading-none tracking-tight text-[var(--bb-text-primary,#101827)]">
              {loading ? "..." : value}
            </p>
            {typeof comparison === "number" ? <ComparisonChip change={comparison} label={getComparisonLabel(windowKey)} /> : null}
          </div>
          <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#64748b)]">
            {getSimpleMetricHelper(metric)}
          </p>
          <p className="mt-1 text-sm text-[var(--bb-text-muted,#94a3b8)]">
            {timeframeLabel}
          </p>
        </div>
        <div className="shrink-0 rounded-[18px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm font-bold text-[var(--bb-text-primary,#101827)] shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
          {granularity}
        </div>
      </div>
      <div className="mt-5">
        <SimpleAnalyticsChart points={points} valueFormatter={metric === "revenue" ? formatMoneyValue : undefined} />
      </div>
    </section>
  );
}

function RevenueAnalyticsSection({
  revenue,
  loading,
}: {
  revenue: StripeRevenueSummary | null;
  loading: boolean;
}) {
  const points = revenue?.monthlyRevenueSeries || [];
  const width = 780;
  const height = 300;
  const left = 54;
  const baseline = 244;
  const chartHeight = 190;
  const barWidth = 34;
  const step = (width - left - 26) / Math.max(points.length, 1);
  const maxValue = Math.max(1, ...points.map((point) => point.total));
  const gridValues = [maxValue, maxValue / 2, 0];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <SimpleAnalyticsKpiCard
          title="Overall Revenue"
          value={loading ? "..." : revenue?.revenueRange || "$0"}
          helper="Bible Buddy revenue in this timeframe"
          accent="blue"
        />
        <SimpleAnalyticsKpiCard
          title="Monthly Signups"
          value={loading ? "..." : formatNumber(revenue?.monthlySignupsRange || 0)}
          helper={`${formatNumber(revenue?.monthlySubscriptions || 0)} active monthly subscribers`}
          accent="green"
        />
        <SimpleAnalyticsKpiCard
          title="Lifetime Signups"
          value={loading ? "..." : formatNumber(revenue?.lifetimeSignupsRange || 0)}
          helper={`${formatNumber(revenue?.lifetimeCustomers || 0)} lifetime customers overall`}
          accent="violet"
        />
      </div>

      <section className="rounded-[28px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-4 shadow-[0_18px_46px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--bb-text-secondary,#64748b)]">Revenue by Month</p>
            <p className="mt-1 text-3xl font-black tracking-tight text-[var(--bb-text-primary,#101827)]">Last 12 months</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[var(--bb-text-secondary,#64748b)]">
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-blue-600" />Monthly</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-violet-500" />Lifetime</span>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto pb-2">
          {loading ? (
            <div className="grid h-[300px] min-w-[680px] place-items-center rounded-[18px] bg-[var(--bb-surface-soft,#f8fbff)] text-sm font-bold text-[var(--bb-text-secondary,#64748b)]">Loading revenue...</div>
          ) : (
            <svg viewBox={`0 0 ${width} ${height}`} className="h-[300px] min-w-[700px] w-full" role="img" aria-label="Monthly and lifetime revenue stacked by month">
              {gridValues.map((value, index) => {
                const y = baseline - (value / maxValue) * chartHeight;
                return (
                  <g key={value}>
                    <line x1={left} x2={width - 16} y1={y} y2={y} stroke="#dbe7f3" strokeDasharray={index === 2 ? "0" : "5 5"} />
                    <text x={left - 8} y={y + 4} textAnchor="end" fill="#64748b" fontSize="11" fontWeight="700">{formatMoneyValue(value)}</text>
                  </g>
                );
              })}
              {points.map((point, index) => {
                const x = left + index * step + (step - barWidth) / 2;
                const monthlyHeight = (point.monthly / maxValue) * chartHeight;
                const lifetimeHeight = (point.lifetime / maxValue) * chartHeight;
                return (
                  <g key={point.month}>
                    <rect x={x} y={baseline - monthlyHeight} width={barWidth} height={monthlyHeight} rx="5" fill="#2563eb" />
                    <rect x={x} y={baseline - monthlyHeight - lifetimeHeight} width={barWidth} height={lifetimeHeight} rx="5" fill="#8b5cf6" />
                    {point.total > 0 ? <text x={x + barWidth / 2} y={Math.max(14, baseline - monthlyHeight - lifetimeHeight - 8)} textAnchor="middle" fill="#101827" fontSize="11" fontWeight="800">{formatMoneyValue(point.total)}</text> : null}
                    <text x={x + barWidth / 2} y={baseline + 24} textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="700">{point.label}</text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-[18px] bg-blue-50 px-4 py-3">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">Monthly Revenue</p>
            <p className="mt-1 text-xl font-black text-slate-950">{loading ? "..." : revenue?.monthlyRevenueRange || "$0"}</p>
          </div>
          <div className="rounded-[18px] bg-violet-50 px-4 py-3">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-violet-700">Lifetime Revenue</p>
            <p className="mt-1 text-xl font-black text-slate-950">{loading ? "..." : revenue?.lifetimeRevenueRange || "$0"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function CompletionPopupBreakdownChartCard({
  title,
  helper,
  value,
  points,
  loading,
  comparison,
}: {
  title: string;
  helper: string;
  value: string;
  points: Array<{ label: string; value: number }>;
  loading: boolean;
  comparison?: number | null;
}) {
  return (
    <section className="rounded-[24px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">{title}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="text-3xl font-black leading-none tracking-tight text-[var(--bb-text-primary,#101827)]">
              {loading ? "..." : value}
            </p>
            {typeof comparison === "number" ? <ComparisonChip change={comparison} label="vs previous" /> : null}
          </div>
          <p className="mt-2 text-xs font-semibold text-[var(--bb-text-secondary,#64748b)]">{helper}</p>
        </div>
      </div>
      <div className="mt-4">
        <SimpleAnalyticsChart points={points} />
      </div>
    </section>
  );
}

function CompletionPopupAnalyticsSection({
  stats,
  windowKey,
  loading,
}: {
  stats: CompletionUpgradeAnalytics | undefined;
  windowKey: JourneyWindow;
  loading: boolean;
}) {
  const comparison = stats?.comparisons.views.change ?? null;
  return (
    <div className="space-y-4">
      <SimpleAnalyticsChartCard
        metric="completion_popup"
        windowKey={windowKey}
        value={loading ? "..." : formatNumber(stats?.totalViews || 0)}
        points={stats?.series.views || []}
        loading={loading}
        comparison={windowKey === "lifetime" ? null : comparison}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <CompletionPopupBreakdownChartCard
          title="Lifetime CTA"
          value={loading ? "..." : formatNumber(stats?.totalLifetimeClicks || 0)}
          helper="Tapped $49.99 lifetime"
          points={stats?.series.lifetimeClicks || []}
          loading={loading}
          comparison={windowKey === "lifetime" ? null : stats?.comparisons.lifetimeClicks.change ?? null}
        />
        <CompletionPopupBreakdownChartCard
          title="Monthly CTA"
          value={loading ? "..." : formatNumber(stats?.totalMonthlyClicks || 0)}
          helper="Tapped $4.99 monthly"
          points={stats?.series.monthlyClicks || []}
          loading={loading}
          comparison={windowKey === "lifetime" ? null : stats?.comparisons.monthlyClicks.change ?? null}
        />
        <CompletionPopupBreakdownChartCard
          title="Continue Free"
          value={loading ? "..." : formatNumber(stats?.totalContinueFreeClicks || 0)}
          helper="Went on to the next day free"
          points={stats?.series.continueFreeClicks || []}
          loading={loading}
          comparison={windowKey === "lifetime" ? null : stats?.comparisons.continueFreeClicks.change ?? null}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SimpleAnalyticsKpiCard
          title="Shown"
          value={loading ? "..." : formatNumber(stats?.totalViews || 0)}
          helper="Popup impressions"
          accent="blue"
        />
        <SimpleAnalyticsKpiCard
          title="Closed"
          value={loading ? "..." : formatNumber(stats?.totalCloses || 0)}
          helper={`${stats?.closeRate ?? 0}% of views`}
          accent="violet"
        />
        <SimpleAnalyticsKpiCard
          title="Upgrade Clicks"
          value={loading ? "..." : formatNumber(stats?.totalUpgradeClicks || 0)}
          helper={`${stats?.upgradeClickRate ?? 0}% clicked upgrade`}
          accent="green"
        />
        <SimpleAnalyticsKpiCard
          title="Paid Upgrades"
          value={loading ? "..." : formatNumber(stats?.totalSuccessfulUpgrades || 0)}
          helper={`${stats?.upgradeFromClickRate ?? 0}% of clicks converted`}
          accent="blue"
        />
        <SimpleAnalyticsKpiCard
          title="Lifetime Clicks"
          value={loading ? "..." : formatNumber(stats?.totalLifetimeClicks || 0)}
          helper="Tapped $49.99 lifetime"
          accent="violet"
        />
        <SimpleAnalyticsKpiCard
          title="Monthly Clicks"
          value={loading ? "..." : formatNumber(stats?.totalMonthlyClicks || 0)}
          helper="Tapped $4.99 monthly"
          accent="blue"
        />
        <SimpleAnalyticsKpiCard
          title="Continue Free"
          value={loading ? "..." : formatNumber(stats?.totalContinueFreeClicks || 0)}
          helper="Went to the next day free"
          accent="green"
        />
      </div>
    </div>
  );
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
  simpleMetric,
  setSimpleMetric,
  data,
  businessMetrics,
  stripeRevenue,
  stripeRevenueLoading,
  loading,
}: {
  windowKey: JourneyWindow;
  setWindowKey: (value: JourneyWindow) => void;
  simpleMetric: SimpleAnalyticsMetric;
  setSimpleMetric: (value: SimpleAnalyticsMetric) => void;
  data: AnalyticsResponse | null;
  businessMetrics: AnalyticsResponse["businessMetrics"] | null | undefined;
  stripeRevenue: StripeRevenueSummary | null;
  stripeRevenueLoading: boolean;
  loading: boolean;
}) {
  const totalUsersLabel = formatNumber(businessMetrics?.totalUsers || 0);
  const revenueLabel = stripeRevenue?.revenueRange || stripeRevenue?.revenue30d || "$0";
  const signupsSeriesTotal = (data?.simpleSeries?.signups || []).reduce((sum, point) => sum + point.value, 0);
  const upgradesSeriesTotal = (data?.simpleSeries?.upgrades || []).reduce((sum, point) => sum + point.value, 0);
  const signupsFallbackTotal = data?.customerJourney?.freeAccounts || data?.visitorJourneys?.metrics?.createdFreeAccount || 0;
  const upgradesFallbackTotal = data?.customerJourney?.proUpgrades || data?.visitorJourneys?.metrics?.upgradedToPro || 0;
  const signupsLabel = formatNumber(signupsSeriesTotal || signupsFallbackTotal);
  const upgradesLabel = formatNumber(stripeRevenue?.upgradesRange ?? (upgradesSeriesTotal || upgradesFallbackTotal));
  const chartSeries = simpleMetric === "overview" ? [] : getSimpleMetricSeries(simpleMetric, data, stripeRevenue);
  const comparisonLabel = getComparisonLabel(windowKey);
  const signupComparison = data?.simpleComparisons?.signups?.change;
  const upgradesComparison = stripeRevenue?.upgradeComparison?.change ?? data?.simpleComparisons?.upgrades?.change;
  const revenueComparison = stripeRevenue?.comparison?.change;

  return (
    <section className="mt-5 space-y-4 md:hidden">
      <SimpleAnalyticsKpiCard
        title="Total Users (All Time)"
        value={loading ? "..." : totalUsersLabel}
        helper="Registered + guest users"
      />

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2">
          <span className="block text-sm font-bold text-[var(--bb-text-primary,#101827)]">Metric</span>
          <select
            value={simpleMetric}
            onChange={(event) => setSimpleMetric(event.target.value as SimpleAnalyticsMetric)}
            className="h-14 w-full rounded-[18px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 text-base font-semibold text-[var(--bb-text-primary,#101827)] shadow-[0_12px_30px_rgba(15,23,42,0.06)] outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          >
            {SIMPLE_METRIC_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>{option.label}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="block text-sm font-bold text-[var(--bb-text-primary,#101827)]">Timeframe</span>
          <select
            value={windowKey}
            onChange={(event) => setWindowKey(event.target.value as JourneyWindow)}
            className="h-14 w-full rounded-[18px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 text-base font-semibold text-[var(--bb-text-primary,#101827)] shadow-[0_12px_30px_rgba(15,23,42,0.06)] outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          >
            {SIMPLE_WINDOW_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 text-sm font-bold text-[var(--bb-text-secondary,#334155)]">
          Loading analytics...
        </div>
      ) : simpleMetric === "overview" ? (
        <div className="grid gap-3">
          <SimpleAnalyticsKpiCard
            title="Signups"
            value={signupsLabel}
            helper="Accounts created in this timeframe"
            accent="green"
            comparison={windowKey === "lifetime" ? null : signupComparison}
            comparisonLabel={windowKey === "lifetime" ? "" : comparisonLabel}
          />
          <SimpleAnalyticsKpiCard
            title="Revenue"
            value={stripeRevenueLoading ? "..." : revenueLabel}
            helper="Stripe cash collected in this timeframe"
            accent="blue"
            comparison={windowKey === "lifetime" ? null : revenueComparison}
            comparisonLabel={windowKey === "lifetime" ? "" : comparisonLabel}
          />
          <SimpleAnalyticsKpiCard
            title="Upgrades"
            value={upgradesLabel}
            helper="Users who upgraded to Pro"
            accent="violet"
            comparison={windowKey === "lifetime" ? null : upgradesComparison}
            comparisonLabel={windowKey === "lifetime" ? "" : comparisonLabel}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {simpleMetric === "revenue" ? (
            <RevenueAnalyticsSection revenue={stripeRevenue} loading={stripeRevenueLoading} />
          ) : simpleMetric === "completion_popup" ? (
            <CompletionPopupAnalyticsSection
              stats={data?.completionUpgrade}
              windowKey={windowKey}
              loading={loading}
            />
          ) : (
            <SimpleAnalyticsChartCard
              metric={simpleMetric}
              windowKey={windowKey}
              value={getSimpleMetricTotal(simpleMetric, data, stripeRevenue)}
              points={chartSeries}
              loading={loading || stripeRevenueLoading}
              comparison={windowKey === "lifetime" ? null : simpleMetric === "signups" ? signupComparison : upgradesComparison}
            />
          )}
          {simpleMetric !== "completion_popup" && simpleMetric !== "revenue" ? (
            <div className="grid grid-cols-3 gap-3">
              <SimpleAnalyticsKpiCard
                title="Signups"
                value={signupsLabel}
                helper={windowKey === "lifetime" ? "All signups" : comparisonLabel}
                accent="green"
                comparison={windowKey === "lifetime" ? null : signupComparison}
                comparisonLabel=""
              />
              <SimpleAnalyticsKpiCard
                title="Revenue"
                value={stripeRevenueLoading ? "..." : revenueLabel}
                helper={windowKey === "lifetime" ? "All revenue" : comparisonLabel}
                accent="blue"
                comparison={windowKey === "lifetime" ? null : revenueComparison}
                comparisonLabel=""
              />
              <SimpleAnalyticsKpiCard
                title="Upgrades"
                value={upgradesLabel}
                helper={windowKey === "lifetime" ? "All upgrades" : comparisonLabel}
                accent="violet"
                comparison={windowKey === "lifetime" ? null : upgradesComparison}
                comparisonLabel=""
              />
            </div>
          ) : null}
        </div>
      )}

      <Link
        href="/admin/analytics/advanced"
        className="flex min-h-[64px] w-full items-center justify-between rounded-[22px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-5 py-4 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition hover:border-blue-300 hover:bg-[var(--bb-surface-soft,#f8fbff)]"
      >
        <span>
          <span className="block text-lg font-black text-[var(--bb-text-primary,#101827)]">View Advanced Analytics</span>
          <span className="mt-1 block text-sm font-semibold text-[var(--bb-text-secondary,#64748b)]">Funnels, cohorts, retention, traffic sources, and detailed reports</span>
        </span>
        <span className="text-blue-600"><Icon name="arrow" /></span>
      </Link>
    </section>
  );
}

function FounderFunnelSection({
  landingVisitors,
  signups,
  rows,
}: {
  landingVisitors: number;
  signups: number;
  rows: VisitorJourneyRow[];
}) {
  const [openDetail, setOpenDetail] = useState<"accountsCreated" | null>(null);
  const overallRate = getRate(signups, landingVisitors);
  const steps = [
    { key: "landing", label: "Landing Page Visitors", value: landingVisitors, rate: null, clickable: false },
    { key: "accountsCreated", label: "Accounts Created", value: signups, rate: `${overallRate}% from visitors`, clickable: true },
    { key: "overall", label: "Overall Conversion", value: `${overallRate}%`, rate: "landing page to account", clickable: false },
  ];
  const accountRows = rows
    .map((row) => ({
      row,
      event: row.timeline.find((event) => event.category === "account" || event.eventName === "created_free_account" || event.eventName === "created_account_successfully"),
    }))
    .filter((item) => item.row.createdAccountAt || item.event)
    .sort((a, b) => ((b.event?.timestamp || b.row.createdAccountAt || "")).localeCompare(a.event?.timestamp || a.row.createdAccountAt || ""));
  const detailRows = openDetail === "accountsCreated" ? accountRows : [];
  const detailTitle = "Accounts Created Detail";

  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">User Acquisition Funnel</p>
      <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">Where people are dropping off</h2>
      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {steps.map((step, index) => (
          <Fragment key={step.label}>
            <button
              type="button"
              disabled={!step.clickable}
              onClick={() => {
                if (!step.clickable) return;
                setOpenDetail((current) => current === step.key ? null : "accountsCreated");
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
                      <p className="mt-1 text-xs font-semibold text-[var(--bb-text-secondary,#334155)]">{event?.title || "Created account"}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-[var(--bb-text-muted,#64748b)]">
                        <span>{row.accountType}</span>
                        <span>{row.source || "Unknown"}</span>
                        <span>{formatDateTime(event?.timestamp || row.createdAccountAt || row.lastActiveAt)}</span>
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
                      <div className="font-bold text-[var(--bb-text-primary,#101827)]">{event?.title || "Created account"}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#64748b)]">{event?.eventName || row.lastEventName}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{formatDateTime(event?.timestamp || row.createdAccountAt || row.lastActiveAt)}</td>
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

function NewUserFirstThreeDaysSection({ report }: { report: AnalyticsResponse["newUserFirstThreeDays"] | undefined }) {
  const rows = report?.rows || [];
  const [showRows, setShowRows] = useState(false);
  const metrics = [
    { label: "New Accounts", value: report?.totalNewAccounts || 0, helper: "Created in this window." },
    { label: "Eligible 72h Cohort", value: report?.eligibleAccounts || 0, helper: `${report?.stillMaturingAccounts || 0} still maturing.` },
    { label: "Started Day 1", value: report?.startedDay1 || 0, helper: `${report?.activationRate || 0}% of eligible accounts.` },
    { label: "Reached Day 3", value: report?.reachedDay3 || 0, helper: `${report?.day3ReachRate || 0}% of eligible accounts.` },
  ];
  const statusStyles: Record<string, string> = {
    activated: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    returned: "bg-blue-50 text-blue-700 ring-blue-200",
    stalled: "bg-amber-50 text-amber-700 ring-amber-200",
    dropped_off: "bg-rose-50 text-rose-700 ring-rose-200",
  };

  return (
    <section className="rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2f7fe8)]">New User First 3 Days</p>
          <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#101827)]">What new accounts do after signup</h2>
          <p className="mt-1 text-sm font-bold text-[var(--bb-text-secondary,#334155)]">
            Uses a rolling 14-day signup backfill from master actions. Rates only count accounts at least 72 hours old, so brand-new users do not drag down Day 2 or Day 3.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowRows((current) => !current)}
          className="w-fit rounded-full border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] px-4 py-2 text-xs font-black text-[var(--bb-text-primary,#101827)]"
          aria-expanded={showRows}
        >
          {showRows ? "Hide users" : "Show users"}
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-text-muted,#64748b)]">{metric.label}</p>
            <p className="mt-2 text-3xl font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(metric.value)}</p>
            <p className="mt-2 text-sm font-bold text-[var(--bb-accent,#2f7fe8)]">{metric.helper}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-4">
          <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">First 3-day movement</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {[
              ["Completed Day 1", report?.completedDay1 || 0, `${report?.day1CompletionRate || 0}%`],
              ["Returned", report?.returnedNextDay || 0, "24-72h"],
              ["Reached Day 2", report?.reachedDay2 || 0, `${report?.day2ReachRate || 0}%`],
              ["Active 72h+", report?.activeAfter72Hours || 0, "after signup"],
            ].map(([label, value, helper]) => (
              <div key={label} className="rounded-lg bg-[var(--bb-card,#ffffff)] p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">{label}</p>
                <p className="mt-1 text-xl font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(Number(value))}</p>
                <p className="mt-1 text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{helper}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-4">
          <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">Common drop-off points</p>
          <div className="mt-3 space-y-2">
            {(report?.commonDropoffs || []).map((dropoff) => (
              <div key={dropoff.key} className="flex items-center justify-between gap-3 rounded-lg bg-[var(--bb-card,#ffffff)] px-3 py-2">
                <p className="text-xs font-bold text-[var(--bb-text-secondary,#334155)]">{dropoff.label}</p>
                <p className="text-sm font-black text-[var(--bb-text-primary,#101827)]">{formatNumber(dropoff.count)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showRows ? (
        <div className="mt-5 overflow-hidden rounded-xl border border-[var(--bb-card-border,#d8e3ec)]">
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full border-collapse text-left text-sm">
              <thead className="bg-[var(--bb-surface-soft,#eef4f8)] text-xs font-black uppercase tracking-[0.12em] text-[var(--bb-text-muted,#64748b)]">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Signup</th>
                  <th className="px-4 py-3">Cohort</th>
                  <th className="px-4 py-3">First Action</th>
                  <th className="px-4 py-3">Day 1</th>
                  <th className="px-4 py-3">Day 2</th>
                  <th className="px-4 py-3">Day 3</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--bb-card-border,#d8e3ec)]">
                {rows.length ? rows.map((row) => (
                  <tr key={`${row.userId}-${row.signupAt}`} className="bg-[var(--bb-card,#ffffff)]">
                    <td className="px-4 py-3">
                      <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.userLabel}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#64748b)]">{shortId(row.userId)}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--bb-text-secondary,#334155)]">{formatDateTime(row.signupAt)}</td>
                    <td className="px-4 py-3 font-black text-[var(--bb-text-primary,#101827)]">{row.eligibleForThreeDayMetrics ? "72h eligible" : "Still maturing"}</td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-[var(--bb-text-primary,#101827)]">{row.firstAction}</div>
                      <div className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#64748b)]">{row.firstActionAt ? formatDateTime(row.firstActionAt) : "No action tracked"}</div>
                    </td>
                    <td className="px-4 py-3 font-black text-[var(--bb-text-primary,#101827)]">{row.day1Completed ? "Completed" : row.day1Started ? "Started" : "No"}</td>
                    <td className="px-4 py-3 font-black text-[var(--bb-text-primary,#101827)]">{row.reachedDay2 ? "Reached" : "No"}</td>
                    <td className="px-4 py-3 font-black text-[var(--bb-text-primary,#101827)]">{row.reachedDay3 ? "Reached" : "No"}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-black ring-1 ${statusStyles[row.status] || statusStyles.stalled}`}>
                        {row.statusLabel}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center font-semibold text-[var(--bb-text-secondary,#334155)]">No new account rows found for this window yet.</td>
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
  signups,
  dayOnePlays,
}: {
  landingVisitors: number;
  signups: number;
  dayOnePlays: number;
}) {
  const steps = [
    { label: "Landing Page Visitors", value: landingVisitors },
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
      <div className="mt-6 grid gap-3 lg:grid-cols-3">
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

          <div className="mt-5 grid gap-3 border-t border-[var(--bb-card-border,#d8e3ec)] pt-4 sm:grid-cols-4">
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

function AnalyticsPageContent({ embedded = false, legacy = false }: { embedded?: boolean; legacy?: boolean } = {}) {
  const [isOwner, setIsOwner] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [windowKey, setWindowKey] = useState<JourneyWindow>("today");
  const [simpleMetric, setSimpleMetric] = useState<SimpleAnalyticsMetric>("overview");
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
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
  const [drilldownKind, setDrilldownKind] = useState<AnalyticsDrilldownKind | null>(null);
  const [drilldownData, setDrilldownData] = useState<AnalyticsDrilldownResponse | null>(null);
  const [drilldownLoading, setDrilldownLoading] = useState(false);
  const [drilldownError, setDrilldownError] = useState<string | null>(null);
  const [adminActionLog, setAdminActionLog] = useState<AnalyticsActionRow[]>([]);
  const [loadingAdminActionLog, setLoadingAdminActionLog] = useState(false);
  const [adminActionLogError, setAdminActionLogError] = useState<string | null>(null);

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
      if (!legacy) {
        const cachedFull = getCachedAdminAnalytics<AnalyticsResponse>(windowKey);
        const cachedOverview = getCachedAdminAnalyticsOverview<AnalyticsResponse>(windowKey);
        if (cachedFull || cachedOverview) {
          setData(cachedFull || cachedOverview);
          setLoading(false);
          setDetailsLoading(true);
        } else {
          setLoading(true);
          setDetailsLoading(false);
        }
        setError(null);
        try {
          const { data: sessionData } = await supabase.auth.getSession();
          const token = sessionData.session?.access_token;
          if (!token) throw new Error("Owner session expired. Please sign in again.");
          const json = await loadAdminAnalytics<AnalyticsResponse>(windowKey, token);
          setData(json);
        } catch (loadError) {
          setError(loadError instanceof Error ? loadError.message : "Could not load analytics.");
        } finally {
          setLoading(false);
          setDetailsLoading(false);
        }
        return;
      }
      const cachedFull = getCachedAdminAnalytics<AnalyticsResponse>(windowKey);
      const cachedOverview = getCachedAdminAnalyticsOverview<AnalyticsResponse>(windowKey);
      if (cachedFull || cachedOverview) {
        setData(cachedFull || cachedOverview);
        setLoading(false);
      } else {
        setLoading(true);
      }
      setDetailsLoading(Boolean(cachedOverview && !cachedFull));
      setError(null);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("Owner session expired. Please sign in again.");
        if (!cachedFull) {
          const overview = await loadAdminAnalytics<AnalyticsResponse>(windowKey, token, {
            force: Boolean(cachedOverview),
            mode: "overview",
          });
          setData((current) => current || overview);
          setLoading(false);
          setDetailsLoading(true);
        }
        const json = await loadAdminAnalytics<AnalyticsResponse>(windowKey, token, { force: Boolean(cachedFull) });
        setData(json);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Could not load analytics.");
      } finally {
        setLoading(false);
        setDetailsLoading(false);
      }
    }
    void loadAnalytics();
  }, [authChecked, isOwner, legacy, windowKey]);

  useEffect(() => {
    if (!authChecked || !isOwner) return;
    void loadAdminActionLog();
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

  useEffect(() => {
    setDrilldownKind(null);
    setDrilldownData(null);
    setDrilldownError(null);
  }, [windowKey]);

  async function openDrilldown(kind: AnalyticsDrilldownKind) {
    if (drilldownKind === kind && drilldownData) {
      setDrilldownKind(null);
      return;
    }
    setDrilldownKind(kind);
    setDrilldownLoading(true);
    setDrilldownError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Owner session expired. Please sign in again.");
      const response = await fetch(`/api/admin/analytics-drilldown?window=${windowKey}`, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json() as AnalyticsDrilldownResponse;
      if (!response.ok) throw new Error(json.error || "Could not load analytics details.");
      setDrilldownData(json);
    } catch (loadError) {
      setDrilldownError(loadError instanceof Error ? loadError.message : "Could not load analytics details.");
    } finally {
      setDrilldownLoading(false);
    }
  }

  async function loadAdminActionLog() {
    setLoadingAdminActionLog(true);
    setAdminActionLogError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Owner session expired. Please sign in again.");
      const response = await fetch(`/api/admin/analytics-drilldown?window=${windowKey}`, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json() as AnalyticsDrilldownResponse;
      if (!response.ok) throw new Error(json.error || "Could not load action log.");
      setAdminActionLog(json.actions.slice(0, 60));
    } catch (loadError) {
      setAdminActionLogError(loadError instanceof Error ? loadError.message : "Could not load action log.");
      setAdminActionLog([]);
    } finally {
      setLoadingAdminActionLog(false);
    }
  }

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
  const activitySummary = data?.activitySummary || {
    activeUsers: 0,
    totalActions: 0,
    daysCompleted: 0,
    landingConversionRate: 0,
    landingVisitors: 0,
    signups: 0,
  };
  const landingStageUsers = bibleBuddyFunnelStages.find((stage) => stage.key === "landing")?.users ?? metrics.totalVisitors;
  const journeyPerformanceDays = useMemo(() => buildJourneyPerformanceDays(data?.bibleYearDays), [data?.bibleYearDays]);
  const signupsCompleted = getStageUsers(bibleBuddyFunnelStages, "accountsCreated") || data?.customerJourney?.freeAccounts || metrics.createdFreeAccount || 0;
  const activeListeners = new Set(
    (data?.bibleYearDays || [])
      .flatMap((day) => day.users)
      .filter((user) => user.readingStarted || user.readingCompleted)
      .map((user) => user.userId),
  ).size;
  const dayOnePlays = journeyPerformanceDays.find((day) => day.dayNumber === 1)?.plays || 0;

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
    return <div className={`${embedded ? "min-h-[420px] rounded-[28px] border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] p-6" : "min-h-screen bg-[var(--bb-background,#0e1218)] p-10"} text-[var(--bb-text-secondary,#d1d5db)]`}>Checking analytics access...</div>;
  }

  if (!isOwner) {
    return (
      <div className={`grid ${embedded ? "min-h-[420px]" : "min-h-screen"} ${embedded ? "" : "bg-[var(--bb-background,#0e1218)]"} place-items-center p-6`}>
        <div className="max-w-md rounded-2xl border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] p-6 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[var(--bb-text-primary,#f9fafb)]">Owner analytics only</h1>
          <p className="mt-2 text-sm text-[var(--bb-text-secondary,#d1d5db)]">This dashboard is only available to the Bible Buddy owner account.</p>
        </div>
      </div>
    );
  }

  if (!legacy) {
    const totalUsersLabel = formatNumber(businessMetrics.totalUsers || 0);
    const revenueLabel = stripeRevenue?.revenueRange || stripeRevenue?.revenue30d || "$0";
    const signupsSeriesTotal = (data?.simpleSeries?.signups || []).reduce((sum, point) => sum + point.value, 0);
    const upgradesSeriesTotal = (data?.simpleSeries?.upgrades || []).reduce((sum, point) => sum + point.value, 0);
    const signupsFallbackTotal = data?.customerJourney?.freeAccounts || metrics.createdFreeAccount || 0;
    const upgradesFallbackTotal = data?.customerJourney?.proUpgrades || metrics.upgradedToPro || 0;
    const signupsLabel = formatNumber(signupsSeriesTotal || signupsFallbackTotal);
    const upgradesLabel = formatNumber(stripeRevenue?.upgradesRange ?? (upgradesSeriesTotal || upgradesFallbackTotal));
    const chartSeries = simpleMetric === "overview" ? [] : getSimpleMetricSeries(simpleMetric, data, stripeRevenue);
    const comparisonLabel = getComparisonLabel(windowKey);
    const signupComparison = data?.simpleComparisons?.signups?.change;
    const upgradesComparison = stripeRevenue?.upgradeComparison?.change ?? data?.simpleComparisons?.upgrades?.change;
    const revenueComparison = stripeRevenue?.comparison?.change;

    return (
      <div className={`bb-analytics-page ${embedded ? "min-h-0" : "min-h-screen bg-[var(--bb-background,#f4f8fc)]"} text-[var(--bb-text-primary,#101827)]`}>
        <div className={embedded ? "min-h-0" : "min-h-screen"}>
          <main className={`min-w-0 ${embedded ? "rounded-[28px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 py-5 shadow-[0_18px_46px_rgba(15,23,42,0.10)] sm:px-5" : "mx-auto max-w-5xl px-4 py-6 sm:px-6"}`}>
            <div className="space-y-5">
              <div className="border-b border-[var(--bb-card-border,#e5edf5)] pb-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(180deg,#f8fbff_0%,#edf4ff_100%)] text-blue-600 ring-1 ring-blue-100 shadow-[0_10px_26px_rgba(37,99,235,0.10)]">
                    <Icon name="analytics" />
                  </div>
                  <div>
                    <h1 className="text-[42px] font-black leading-none tracking-tight text-[var(--bb-text-primary,#101827)] sm:text-[48px]">Analytics</h1>
                    <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#64748b)]">Users, signups, revenue, and upgrades at a glance.</p>
                  </div>
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</div>
              ) : null}

              <SimpleAnalyticsKpiCard
                title="Total Users (All Time)"
                value={loading ? "..." : totalUsersLabel}
                helper="Registered + guest users"
              />

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-2">
                  <span className="block text-sm font-bold text-[var(--bb-text-primary,#101827)]">Overview</span>
                  <select
                    value={simpleMetric}
                    onChange={(event) => setSimpleMetric(event.target.value as SimpleAnalyticsMetric)}
                    className="h-14 w-full rounded-[18px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 text-base font-semibold text-[var(--bb-text-primary,#101827)] shadow-[0_12px_30px_rgba(15,23,42,0.06)] outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  >
                    {SIMPLE_METRIC_OPTIONS.map((option) => (
                      <option key={option.key} value={option.key}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="block text-sm font-bold text-[var(--bb-text-primary,#101827)]">Timeframe</span>
                  <select
                    value={windowKey}
                    onChange={(event) => setWindowKey(event.target.value as JourneyWindow)}
                    className="h-14 w-full rounded-[18px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-4 text-base font-semibold text-[var(--bb-text-primary,#101827)] shadow-[0_12px_30px_rgba(15,23,42,0.06)] outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  >
                    {SIMPLE_WINDOW_OPTIONS.map((option) => (
                      <option key={option.key} value={option.key}>{option.label}</option>
                    ))}
                  </select>
                </label>
              </div>

              {simpleMetric === "overview" ? (
                <>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <SimpleAnalyticsKpiCard
                    title="Signups"
                    value={loading ? "..." : signupsLabel}
                    helper="Accounts created in this timeframe"
                    accent="green"
                    comparison={windowKey === "lifetime" ? null : signupComparison}
                    comparisonLabel={windowKey === "lifetime" ? "" : comparisonLabel}
                    onClick={() => void openDrilldown("signups")}
                    active={drilldownKind === "signups"}
                  />
                  <SimpleAnalyticsKpiCard
                    title="Revenue"
                    value={stripeRevenueLoading ? "..." : revenueLabel}
                    helper="Stripe cash collected in this timeframe"
                    accent="blue"
                  />
                  <SimpleAnalyticsKpiCard
                    title="Upgrades"
                    value={loading ? "..." : upgradesLabel}
                    helper="Users who upgraded to Pro"
                    accent="violet"
                    comparison={windowKey === "lifetime" ? null : upgradesComparison}
                    comparisonLabel={windowKey === "lifetime" ? "" : comparisonLabel}
                  />
                  <SimpleAnalyticsKpiCard
                    title="Landing Page Views"
                    value={loading ? "..." : formatNumber(landingStageUsers)}
                    helper="Unique landing page visitors"
                    accent="blue"
                  />
                  <SimpleAnalyticsKpiCard
                    title="Active Users"
                    value={loading ? "..." : formatNumber(activitySummary.activeUsers)}
                    helper="People with at least one action in this timeframe"
                    accent="green"
                    onClick={() => void openDrilldown("active_users")}
                    active={drilldownKind === "active_users"}
                  />
                  <SimpleAnalyticsKpiCard
                    title="Action Log"
                    value={loading ? "..." : formatNumber(activitySummary.totalActions)}
                    helper="All tracked actions in this timeframe"
                    accent="blue"
                    onClick={() => void openDrilldown("actions")}
                    active={drilldownKind === "actions"}
                  />
                  <SimpleAnalyticsKpiCard
                    title="Days Completed"
                    value={loading ? "..." : formatNumber(activitySummary.daysCompleted)}
                    helper="Bible in One Year day completions in this timeframe"
                    accent="violet"
                    onClick={() => void openDrilldown("days_completed")}
                    active={drilldownKind === "days_completed"}
                  />
                  <SimpleAnalyticsKpiCard
                    title="Landing Conversion"
                    value={loading ? "..." : `${activitySummary.landingConversionRate}%`}
                    helper="Landing page visitors who became signups"
                    accent="green"
                  />
                </div>
                <div className="grid gap-3 lg:grid-cols-3">
                  <SimpleAnalyticsOverviewChart
                    title="Signup Trend"
                    value={loading ? "..." : signupsLabel}
                    points={data?.simpleSeries?.signups || []}
                    loading={loading}
                  />
                  <SimpleAnalyticsOverviewChart
                    title="Revenue Trend"
                    value={stripeRevenueLoading ? "..." : revenueLabel}
                    points={stripeRevenue?.series || []}
                    loading={stripeRevenueLoading}
                    valueFormatter={formatMoneyValue}
                  />
                  <SimpleAnalyticsOverviewChart
                    title="Upgrade Trend"
                    value={stripeRevenueLoading ? "..." : upgradesLabel}
                    points={stripeRevenue?.upgradeSeries || data?.simpleSeries?.upgrades || []}
                    loading={stripeRevenueLoading || loading}
                  />
                </div>

                <section className="rounded-[28px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] p-5 shadow-[0_18px_46px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--bb-text-secondary,#64748b)]">Action Log</p>
                      <h2 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#101827)]">All users, recent activity</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => void openDrilldown("actions")}
                      className="inline-flex h-11 items-center justify-center rounded-2xl border border-[var(--bb-card-border,#d8e3ec)] bg-white px-4 text-sm font-semibold text-[var(--bb-text-primary,#101827)] shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      View all actions
                    </button>
                  </div>
                  {loadingAdminActionLog ? (
                    <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-600">Loading action log...</p>
                  ) : adminActionLogError ? (
                    <p className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-5 text-sm font-semibold text-rose-700">{adminActionLogError}</p>
                  ) : adminActionLog.length === 0 ? (
                    <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-600">No tracked actions in this timeframe.</p>
                  ) : (
                    <div className="mt-5 grid gap-2">
                      {adminActionLog.slice(0, 12).map((action) => (
                        <div key={action.id} className={`rounded-3xl border p-4 ${getAdminActionColorClass(action.actionType)} ring-1 ring-inset`}>
                          <p className="text-sm font-semibold text-[var(--bb-text-primary,#101827)]">{action.userLabel} {action.actionTitle}</p>
                          <p className="mt-1 text-xs text-[var(--bb-text-secondary,#64748b)]">{action.detail} | {formatDateTime(action.createdAt)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
                </>
              ) : (
                simpleMetric === "revenue" ? (
                  <RevenueAnalyticsSection revenue={stripeRevenue} loading={stripeRevenueLoading} />
                ) : simpleMetric === "completion_popup" ? (
                  <CompletionPopupAnalyticsSection
                    stats={data?.completionUpgrade}
                    windowKey={windowKey}
                    loading={loading}
                  />
                ) : (
                  <SimpleAnalyticsChartCard
                    metric={simpleMetric}
                    windowKey={windowKey}
                    value={getSimpleMetricTotal(simpleMetric, data, stripeRevenue)}
                    points={chartSeries}
                    loading={loading || stripeRevenueLoading}
                    comparison={windowKey === "lifetime" ? null : simpleMetric === "signups" ? signupComparison : upgradesComparison}
                  />
                )
              )}

              {simpleMetric === "overview" && drilldownKind ? (
                <AnalyticsDrilldownPanel
                  kind={drilldownKind}
                  data={drilldownData}
                  loading={drilldownLoading}
                  error={drilldownError}
                  onClose={() => setDrilldownKind(null)}
                />
              ) : null}

              <Link
                href="/admin/analytics/advanced"
                className="flex min-h-[64px] w-full items-center justify-between rounded-[22px] border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-card,#ffffff)] px-5 py-4 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition hover:border-blue-300 hover:bg-[var(--bb-surface-soft,#f8fbff)]"
              >
                <span>
                  <span className="block text-lg font-black text-[var(--bb-text-primary,#101827)]">View Advanced Analytics</span>
                  <span className="mt-1 block text-sm font-semibold text-[var(--bb-text-secondary,#64748b)]">Funnels, cohorts, retention, traffic sources, and detailed reports</span>
                </span>
                <span className="text-blue-600"><Icon name="arrow" /></span>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`bb-analytics-page ${embedded ? "min-h-0" : "min-h-screen bg-[var(--bb-background,#0e1218)]"} text-[var(--bb-text-primary,#f9fafb)]`}>
      <div className={embedded ? "min-h-0" : "min-h-screen"}>
        <main className={`min-w-0 ${embedded ? "rounded-[28px] border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] px-4 py-4 shadow-[0_18px_46px_rgba(0,0,0,0.18)] sm:px-5" : "px-4 py-6 sm:px-6 lg:px-10"}`}>
          {embedded ? (
            <div className="mb-4 flex flex-col gap-3 border-b border-[var(--bb-card-border,#374151)] pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#60a5fa)]">Analytics</p>
                  <h1 className="mt-1 text-2xl font-black tracking-tight text-[var(--bb-text-primary,#f9fafb)]">
                    {activeView === "overview" ? "Audio Journey Analytics" : activeNavItem.label}
                  </h1>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <select
                  id="analytics-view-embedded"
                  value={activeView}
                  onChange={(event) => setActiveView(event.target.value as AnalyticsView)}
                  className="h-11 min-w-0 rounded-lg border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] px-4 text-sm font-semibold text-[var(--bb-text-primary,#f9fafb)] shadow-sm outline-none transition focus:border-[var(--bb-accent,#60a5fa)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#27313d)]"
                  aria-label="Analytics view"
                >
                  {ANALYTICS_NAV_ITEMS.map((item) => (
                    <option key={item.key} value={item.key}>{item.label}</option>
                  ))}
                </select>
                <select
                  value={windowKey}
                  onChange={(event) => setWindowKey(event.target.value as JourneyWindow)}
                  className="h-11 min-w-0 rounded-lg border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] px-4 text-sm font-semibold text-[var(--bb-text-primary,#f9fafb)] shadow-sm outline-none transition focus:border-[var(--bb-accent,#60a5fa)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#27313d)]"
                  aria-label="Analytics timeframe"
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
            </div>
          ) : null}
          <header className={`${embedded ? "hidden" : "flex"} flex-col gap-4 lg:flex-row lg:items-start lg:justify-between`}>
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

          {detailsLoading || data?.partial ? (
            <div className="mt-6 rounded-xl border border-[var(--bb-card-border,#d8e3ec)] bg-[var(--bb-surface-soft,#eef4f8)] p-4 text-sm font-bold text-[var(--bb-text-secondary,#334155)]">
              Overview loaded. Detailed tables are loading in the background.
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
              simpleMetric={simpleMetric}
              setSimpleMetric={setSimpleMetric}
              data={data}
              businessMetrics={businessMetrics}
              stripeRevenue={stripeRevenue}
              stripeRevenueLoading={stripeRevenueLoading}
              loading={loading}
            />
          ) : null}

          {activeView === "overview" ? (
            <section className="mt-5 space-y-5 md:hidden">
              <FounderFunnelSection
                landingVisitors={landingStageUsers}
                signups={signupsCompleted}
                rows={rows}
              />
              <NewUserFirstThreeDaysSection report={data?.newUserFirstThreeDays} />
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
              signups={signupsCompleted}
              rows={rows}
            />

            <NewUserFirstThreeDaysSection report={data?.newUserFirstThreeDays} />

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
              loading={loading || detailsLoading}
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
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">YouTube viewers</p>
                            <p className="mt-1 text-2xl font-black text-slate-950">{day?.videoWatchUsers || 0}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Avg watch time</p>
                            <p className="mt-1 text-2xl font-black text-slate-950">{formatListenDuration(day?.averageWatchSeconds || 0)}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">95% watched</p>
                            <p className="mt-1 text-2xl font-black text-slate-950">{day?.videoCompletedUsers || 0}</p>
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
                                    <td className="px-4 py-3">
                                      <div className="space-y-1.5">
                                        <MiniTaskStatus status={getTaskStatus(user.readingStarted, user.readingCompleted)} evidence={user.task1FinishEvent || user.task1StartEvent} />
                                        <p className="text-xs font-semibold text-slate-500">
                                          {user.videoWatchedSeconds > 0
                                            ? `${formatListenDuration(user.videoWatchedSeconds)} watched${user.videoWatchPercent > 0 ? ` (${user.videoWatchPercent}%)` : ""}`
                                            : "No YouTube watch tracked"}
                                        </p>
                                      </div>
                                    </td>
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

export default function AnalyticsPage({ embedded = false, legacy = false }: { embedded?: boolean; legacy?: boolean }) {
  return <AnalyticsPageContent embedded={embedded} legacy={legacy} />;
}
