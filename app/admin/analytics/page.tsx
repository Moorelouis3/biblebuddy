"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "@/lib/bibleInOneYearPlan";
import { supabase } from "@/lib/supabaseClient";
import { applyAppThemeToDocument } from "@/lib/appThemes";
import { DEFAULT_PREMIUM_SKIN_ID, applyPremiumSkinToDocument, readCachedPremiumSkin } from "@/lib/premiumSkins";

type JourneyWindow = "1h" | "24h" | "7d" | "30d";
type AccountFilter = "all" | "guest" | "free" | "pro";
type AnalyticsView = "overview" | "bible-year" | "study-notes";

type VisitorJourneyStatus =
  | "active"
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

type FunnelStageRow = {
  key: string;
  label: string;
  users: number;
  conversionRate: number;
  dropoffRate: number;
  retentionRate: number;
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
    readingCompleted: boolean;
    triviaCompleted: boolean;
    reflectionCompleted: boolean;
    completed: boolean;
    updatedAt: string | null;
  }>;
};

type AnalyticsResponse = {
  customerJourney?: {
    window: JourneyWindow;
    label: string;
  };
  visitorJourneys?: VisitorJourneys;
  bibleBuddyFunnelStages?: FunnelStageRow[];
  bibleYearDays?: BibleYearDayAnalytics[];
  studyNotes?: {
    totalOpens: number;
    uniqueUsers: number;
    sectionOpens: number;
    chapterNoteOpens: number;
    topSources: Array<{ source: string; opens: number }>;
    topNotes: Array<{ key: string; label: string; opens: number; uniqueUsers: number; lastOpenedAt: string | null }>;
    rows: Array<{
      id: string;
      userId: string | null;
      userLabel: string;
      eventType: string;
      eventLabel: string;
      noteTitle: string;
      source: string;
      reference: string;
      sectionTitle: string;
      openedAt: string;
    }>;
  };
  eventSetupRequired?: boolean;
  eventError?: string;
  error?: string;
};

const ANALYTICS_NAV_ITEMS: Array<{ key: AnalyticsView; label: string; helper: string }> = [
  { key: "overview", label: "Overview", helper: "Journey Tracker" },
  { key: "bible-year", label: "Bible in One Year", helper: "Day breakdowns" },
  { key: "study-notes", label: "Study Notes", helper: "Note opens" },
];

const WINDOW_OPTIONS: Array<{ key: JourneyWindow; label: string }> = [
  { key: "1h", label: "Last 1 hour" },
  { key: "24h", label: "Last 24 hours" },
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
];

const STATUS_STYLES: Record<VisitorJourneyStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  onboarding_only: "bg-slate-100 text-slate-700 ring-slate-200",
  day_1_in_progress: "bg-blue-50 text-blue-700 ring-blue-200",
  day_1_completed: "bg-violet-50 text-violet-700 ring-violet-200",
  created_account: "bg-amber-50 text-amber-700 ring-amber-200",
  upgraded: "bg-orange-50 text-orange-700 ring-orange-200",
  dropped_off: "bg-rose-50 text-rose-700 ring-rose-200",
};

function formatNumber(value: number) {
  return value.toLocaleString();
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

function getRate(part: number, whole: number) {
  return whole > 0 ? Number(((part / whole) * 100).toFixed(1)) : 0;
}

function getFunnelHealth(rate: number) {
  if (rate < 10) {
    return {
      tone: "border [border-color:rgba(248,113,113,0.72)] [background:linear-gradient(135deg,rgba(127,29,29,0.88),rgba(248,113,113,0.24))] [box-shadow:0_0_0_1px_rgba(248,113,113,0.28),0_0_38px_rgba(248,113,113,0.42)] text-rose-50",
      label: "Needs fixing",
      message: `Landing to onboarding completion is ${rate}%. Under 10% means visitors are not making it through the first funnel step.`,
    };
  }
  if (rate < 20) {
    return {
      tone: "border [border-color:rgba(251,191,36,0.76)] [background:linear-gradient(135deg,rgba(120,53,15,0.88),rgba(251,191,36,0.26))] [box-shadow:0_0_0_1px_rgba(251,191,36,0.28),0_0_38px_rgba(251,191,36,0.42)] text-amber-50",
      label: "Normal range",
      message: `Landing to onboarding completion is ${rate}%. This is workable, but the landing page and questions can still be tightened.`,
    };
  }
  if (rate < 40) {
    return {
      tone: "border [border-color:rgba(52,211,153,0.78)] [background:linear-gradient(135deg,rgba(6,78,59,0.9),rgba(52,211,153,0.28))] [box-shadow:0_0_0_1px_rgba(52,211,153,0.32),0_0_42px_rgba(52,211,153,0.5)] text-emerald-50",
      label: "Doing good",
      message: `Landing to onboarding completion is ${rate}%. The page is doing good at getting visitors through onboarding.`,
    };
  }
  return {
    tone: "border [border-color:rgba(74,222,128,0.82)] [background:linear-gradient(135deg,rgba(20,83,45,0.92),rgba(74,222,128,0.32))] [box-shadow:0_0_0_1px_rgba(74,222,128,0.34),0_0_46px_rgba(74,222,128,0.54)] text-green-50",
    label: "Excellent funnel",
    message: `Landing to onboarding completion is ${rate}%. That is excellent. Protect what is working and improve the next step.`,
  };
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

function MiniCheck({ done, label }: { done: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${done ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-slate-100 text-slate-500 ring-slate-200"}`}>
      <span className={`grid h-4 w-4 place-items-center rounded-full text-[10px] ${done ? "bg-emerald-500 text-white" : "bg-slate-300 text-white"}`}>
        {done ? (
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3.5 8.2 2.7 2.6 6.3-6.6" />
          </svg>
        ) : "-"}
      </span>
      {label}
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

function Icon({ name }: { name: "visitors" | "check" | "book" | "flame" | "user" | "pro" | "search" | "filter" | "export" }) {
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
      "Created Free Account",
      "Started Trial",
      "Converted To Pro",
    ].map((label, index) => ({
      key: label.toLowerCase().replaceAll(" ", "-"),
      label,
      users: 0,
      conversionRate: index === 0 ? 100 : 0,
      dropoffRate: 0,
      retentionRate: index === 0 ? 100 : 0,
    }));

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <div className="overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-stretch gap-2">
          {visibleStages.map((stage, index) => {
            const percentTone =
              stage.conversionRate > 10
                ? "text-emerald-500"
                : stage.conversionRate > 0
                  ? "text-amber-400"
                  : "text-slate-500";
            return (
              <div key={stage.key} className="flex items-center gap-2">
                <div className="min-h-[96px] w-[142px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="min-h-9 text-xs font-black leading-4 text-slate-950">{stage.label}</p>
                  <p className="mt-2 text-2xl font-black leading-none text-slate-950">{formatNumber(stage.users)}</p>
                  {index > 0 ? (
                    <p className={`mt-2 text-sm font-black leading-none ${percentTone}`}>{stage.conversionRate}%</p>
                  ) : null}
                </div>
                {index < visibleStages.length - 1 ? (
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
    <div className="rounded-b-2xl border-x border-b border-blue-500/60 bg-[#071426] p-4 text-slate-100 shadow-[0_18px_46px_rgba(15,23,42,0.28)]">
      <section className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">User Journey Timeline</p>
              <h3 className="mt-1 text-xl font-black text-white">Everything this visitor has done</h3>
              <p className="mt-1 text-sm font-medium text-slate-400">Chronological funnel, task, account, trial, and upgrade behavior.</p>
            </div>
            <div className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm font-black text-blue-200">
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
                  <p className="mt-3 text-[11px] font-semibold text-slate-400">{formatDateTime(event.timestamp)}</p>
                  <p className="mt-2 text-sm font-black leading-5 text-white">{event.title}</p>
                  <p className="mt-1 text-[11px] font-semibold text-blue-200">{event.eventName}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{event.timeSincePreviousLabel || event.timeSinceFirstLabel || event.detail}</p>
                </div>
              )) : (
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-sm font-semibold text-slate-300">
                  No detailed events found for this visitor yet.
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-5">
            <div className="rounded-lg bg-white/[0.04] p-3">
              <p className="text-xs font-bold text-slate-400">Onboarding</p>
              <p className="mt-1 text-lg font-black text-white">{row.onboardingCompletedAt ? "Complete" : "Not complete"}</p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-3">
              <p className="text-xs font-bold text-slate-400">Current Day</p>
              <p className="mt-1 text-lg font-black text-white">{latestDay ? `Day ${latestDay}` : "None"}</p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-3">
              <p className="text-xs font-bold text-slate-400">Bible Tasks</p>
              <p className="mt-1 text-lg font-black text-white">{completedTasks}</p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-3">
              <p className="text-xs font-bold text-slate-400">Account</p>
              <p className="mt-1 text-lg font-black text-white">{details.accountType}</p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-3">
              <p className="text-xs font-bold text-slate-400">Next Action</p>
              <p className="mt-1 text-lg font-black text-white">{row.currentStatus === "dropped_off" ? "Re-engage" : "Keep going"}</p>
            </div>
          </div>
      </section>
    </div>
  );
}

export default function AnalyticsPage({ embedded = false }: { embedded?: boolean } = {}) {
  const [isOwner, setIsOwner] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [windowKey, setWindowKey] = useState<JourneyWindow>("24h");
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<VisitorJourneyStatus | "all">("all");
  const [accountFilter, setAccountFilter] = useState<AccountFilter>("all");
  const [activeView, setActiveView] = useState<AnalyticsView>("overview");
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [expandedVisitorId, setExpandedVisitorId] = useState<string | null>(null);

  useEffect(() => {
    const cachedSkin = readCachedPremiumSkin(null);
    applyAppThemeToDocument("light");
    applyPremiumSkinToDocument(cachedSkin === "none" ? DEFAULT_PREMIUM_SKIN_ID : cachedSkin);
  }, []);

  useEffect(() => {
    async function checkOwner() {
      const { data: userData } = await supabase.auth.getUser();
      setIsOwner(userData.user?.email === "moorelouis3@gmail.com");
      setAuthChecked(true);
    }
    void checkOwner();
  }, []);

  useEffect(() => {
    if (!authChecked || !isOwner) return;
    async function loadAnalytics() {
      setLoading(true);
      setError(null);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("Owner session expired. Please sign in again.");
        const response = await fetch(`/api/admin/onboarding-analytics?window=${windowKey}`, {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = (await response.json()) as AnalyticsResponse;
        if (!response.ok) throw new Error(json.error || "Could not load analytics.");
        setData(json);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Could not load analytics.");
      } finally {
        setLoading(false);
      }
    }
    void loadAnalytics();
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
  const landingStageUsers = bibleBuddyFunnelStages.find((stage) => stage.key === "landing")?.users ?? metrics.totalVisitors;
  const finishedOnboardingStageUsers = bibleBuddyFunnelStages.find((stage) => stage.key === "finishedOnboarding")?.users ?? metrics.finishedOnboarding;
  const landingToFinishedOnboardingRate = getRate(finishedOnboardingStageUsers, landingStageUsers);
  const funnelHealth = getFunnelHealth(landingToFinishedOnboardingRate);

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
      <div className={`flex ${embedded ? "min-h-0" : "min-h-screen"}`}>
        <aside className={`${embedded ? "hidden" : "hidden lg:flex"} w-64 shrink-0 flex-col border-r border-[var(--bb-card-border,#374151)] bg-[var(--bb-surface,#151b24)] px-5 py-6 text-[var(--bb-text-primary,#f9fafb)]`}>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-amber-400/50 bg-slate-900 text-sm font-black">BB</div>
            <div>
              <p className="text-lg font-black leading-none">BIBLE BUDDY</p>
              <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-slate-300">ANALYTICS</p>
            </div>
          </div>

          <nav className="mt-10 space-y-1">
            {ANALYTICS_NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveView(item.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                  activeView === item.key ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                <span className="grid h-5 w-5 place-items-center rounded-full border border-current text-[10px]">{item.label.slice(0, 1)}</span>
                <span>
                  <span className="block">{item.label}</span>
                  <span className="mt-0.5 block text-[11px] font-semibold text-slate-400">{item.helper}</span>
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-bold">Need help?</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">Track visitor source, funnel stage, account conversion, and Pro upgrades from one table.</p>
          </div>
        </aside>

        <main className={`min-w-0 flex-1 ${embedded ? "px-1 py-1" : "px-4 py-6 sm:px-6 lg:px-10"}`}>
          <div className="mb-5 rounded-xl border border-[var(--bb-card-border,#374151)] bg-[var(--bb-card,#19212c)] p-3 shadow-sm lg:hidden">
            <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--bb-text-muted,#9ca3af)]" htmlFor="analytics-mobile-view">
              Analytics Menu
            </label>
            <select
              id="analytics-mobile-view"
              value={activeView}
              onChange={(event) => setActiveView(event.target.value as AnalyticsView)}
              className="mt-2 h-11 w-full rounded-lg border border-[var(--bb-card-border,#374151)] bg-[var(--bb-surface,#151b24)] px-3 text-sm font-bold text-[var(--bb-text-primary,#f9fafb)] outline-none focus:border-[var(--bb-accent,#60a5fa)] focus:ring-4 focus:ring-[var(--bb-accent-soft,#27313d)]"
            >
              {ANALYTICS_NAV_ITEMS.map((item) => (
                <option key={item.key} value={item.key}>{item.label}</option>
              ))}
            </select>
          </div>

          <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--bb-text-primary,#f9fafb)]">
                {activeView === "overview" ? "Bible Buddy Funnel" : activeNavItem.label}
              </h1>
              <p className="mt-2 text-sm font-medium text-[var(--bb-text-secondary,#d1d5db)]">
                {activeView === "overview"
                  ? "See every visitor's path from landing page to guest, free account, and Pro."
                  : activeView === "bible-year"
                    ? "Open any day to see starts, task completion, users, and drop-off for that Bible study day."
                    : "See who opened study notes, which note they opened, and when they opened it."}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
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

          {activeView === "overview" ? (
          <>
          <FunnelFlowChart stages={bibleBuddyFunnelStages} />

          <section className={`mt-8 rounded-xl border px-5 py-4 shadow-sm ${funnelHealth.tone}`}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-start sm:gap-8">
              <p className="text-lg font-black">{funnelHealth.label}</p>
              <p className="text-sm font-bold text-left">{funnelHealth.message}</p>
            </div>
          </section>

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
                  {data?.bibleYearDays?.length || 0} days with progress
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
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Started</p>
                        <p className="mt-1 text-lg font-black text-slate-950">{startedUsers}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Complete</p>
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
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Reading task</p>
                            <p className="mt-1 text-2xl font-black text-slate-950">{day?.readingCompleted || 0}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Trivia task</p>
                            <p className="mt-1 text-2xl font-black text-slate-950">{day?.triviaCompleted || 0}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Reflection task</p>
                            <p className="mt-1 text-2xl font-black text-slate-950">{day?.reflectionCompleted || 0}</p>
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
                                <th className="px-4 py-3">Reading</th>
                                <th className="px-4 py-3">Trivia</th>
                                <th className="px-4 py-3">Reflection</th>
                                <th className="px-4 py-3">Day Status</th>
                                <th className="px-4 py-3">Updated</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {day?.users.length ? (
                                day.users.map((user) => (
                                  <tr key={`${planDay.dayNumber}-${user.userId}`} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-bold text-slate-900">{user.userLabel}</td>
                                    <td className="px-4 py-3"><MiniCheck done={user.readingCompleted} label={user.readingCompleted ? "Done" : "Open"} /></td>
                                    <td className="px-4 py-3"><MiniCheck done={user.triviaCompleted} label={user.triviaCompleted ? "Done" : "Open"} /></td>
                                    <td className="px-4 py-3"><MiniCheck done={user.reflectionCompleted} label={user.reflectionCompleted ? "Done" : "Open"} /></td>
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
          ) : (
          <section className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
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
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
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
                            <p className="font-bold text-slate-900">{row.noteTitle}</p>
                            <p className="mt-0.5 text-xs font-semibold text-slate-500">{row.reference || row.sectionTitle || "Study note"}</p>
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
