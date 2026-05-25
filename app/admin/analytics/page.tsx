"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type JourneyWindow = "1h" | "24h" | "7d" | "30d";
type AccountFilter = "all" | "guest" | "free" | "pro";

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

type VisitorJourneys = {
  rows: VisitorJourneyRow[];
  metrics: {
    totalVisitors: number;
    finishedOnboarding: number;
    startedDay1: number;
    completedDay3: number;
    createdFreeAccount: number;
    upgradedToPro: number;
    onboardingCompletionRate: number;
    day1StartRate: number;
    day3CompletionRate: number;
    freeAccountRate: number;
    proUpgradeRate: number;
  };
  sources: string[];
  journeys: string[];
  statuses: Array<{ key: VisitorJourneyStatus; label: string }>;
};

type AnalyticsResponse = {
  customerJourney?: {
    window: JourneyWindow;
    label: string;
  };
  visitorJourneys?: VisitorJourneys;
  eventSetupRequired?: boolean;
  eventError?: string;
  error?: string;
};

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
  day_3_completed: "bg-violet-50 text-violet-700 ring-violet-200",
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

export default function AnalyticsPage() {
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
  const metrics = journeys?.metrics || {
    totalVisitors: 0,
    finishedOnboarding: 0,
    startedDay1: 0,
    completedDay3: 0,
    createdFreeAccount: 0,
    upgradedToPro: 0,
    onboardingCompletionRate: 0,
    day1StartRate: 0,
    day3CompletionRate: 0,
    freeAccountRate: 0,
    proUpgradeRate: 0,
  };

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
        row.referrer || "",
      ].some((value) => value.toLowerCase().includes(cleanSearch));
    });
  }, [accountFilter, rows, search, sourceFilter, statusFilter]);

  function exportCsv() {
    const headers = [
      "Visitor",
      "Onboarding Completed",
      "Started Day 1",
      "Completed Day 3",
      "Created Account",
      "Upgraded To Pro",
      "Current Status",
      "Source",
      "Last Active",
      "Dropoff Step",
    ];
    const csvRows = filteredRows.map((row) => [
      row.visitorLabel,
      row.onboardingCompletedAt || "",
      row.startedDay1At || "",
      row.completedDay3At || "",
      row.createdAccountAt || "",
      row.upgradedAt || "",
      row.currentStatusLabel,
      row.source,
      row.lastActiveAt,
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
    return <div className="min-h-screen bg-slate-50 p-10 text-slate-700">Checking analytics access...</div>;
  }

  if (!isOwner) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-950">Owner analytics only</h1>
          <p className="mt-2 text-sm text-slate-600">This dashboard is only available to the Bible Buddy owner account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#0d1117] px-5 py-6 text-white lg:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-amber-400/50 bg-slate-900 text-sm font-black">BB</div>
            <div>
              <p className="text-lg font-black leading-none">BIBLE BUDDY</p>
              <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-slate-300">ANALYTICS</p>
            </div>
          </div>

          <nav className="mt-10 space-y-1">
            {[
              "Overview",
              "User Journey",
              "Engagement",
              "Retention",
              "Funnel",
              "Conversions",
              "Drop-offs",
              "Accounts",
              "Content",
              "Settings",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                  item === "User Journey" ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                <span className="grid h-5 w-5 place-items-center rounded-full border border-current text-[10px]">{item.slice(0, 1)}</span>
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-bold">Need help?</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">Track visitor source, funnel stage, account conversion, and Pro upgrades from one table.</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">Journey Tracker</h1>
              <p className="mt-2 text-sm font-medium text-slate-600">See every visitor&apos;s journey from first visit to conversion.</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                value={windowKey}
                onChange={(event) => setWindowKey(event.target.value as JourneyWindow)}
                className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                {WINDOW_OPTIONS.map((option) => (
                  <option key={option.key} value={option.key}>{option.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
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

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <MetricCard label="Total Visitors" value={metrics.totalVisitors} percent={100} icon="visitors" tone="bg-blue-50 text-blue-600" />
            <MetricCard label="Finished Onboarding" value={metrics.finishedOnboarding} percent={metrics.onboardingCompletionRate} icon="check" tone="bg-emerald-50 text-emerald-600" />
            <MetricCard label="Started Day 1" value={metrics.startedDay1} percent={metrics.day1StartRate} icon="book" tone="bg-violet-50 text-violet-600" />
            <MetricCard label="Completed Day 3" value={metrics.completedDay3} percent={metrics.day3CompletionRate} icon="flame" tone="bg-rose-50 text-rose-600" />
            <MetricCard label="Created Account" value={metrics.createdFreeAccount} percent={metrics.freeAccountRate} icon="user" tone="bg-amber-50 text-amber-600" />
            <MetricCard label="Upgraded To Pro" value={metrics.upgradedToPro} percent={metrics.proUpgradeRate} icon="pro" tone="bg-orange-50 text-orange-600" />
          </section>

          <section className="mt-8 rounded-xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-200 p-4">
              <div className="grid gap-3 xl:grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr_auto]">
                <label className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="search" /></span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by visitor #, user, source, or status..."
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
              <table className="min-w-[1080px] w-full border-collapse text-left">
                <thead className="bg-slate-50 text-xs font-bold text-slate-700">
                  <tr>
                    <th className="w-10 px-4 py-4"><span className="block h-4 w-4 rounded border border-slate-300" /></th>
                    <th className="px-4 py-4">Visitor #</th>
                    <th className="px-4 py-4">Onboarding Completed</th>
                    <th className="px-4 py-4">Started Day 1</th>
                    <th className="px-4 py-4">Completed Day 3</th>
                    <th className="px-4 py-4">Account Created</th>
                    <th className="px-4 py-4">Pro</th>
                    <th className="px-4 py-4">Current Status</th>
                    <th className="px-4 py-4">Source</th>
                    <th className="px-4 py-4">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-12 text-center text-sm font-semibold text-slate-500">Loading visitor journeys...</td>
                    </tr>
                  ) : filteredRows.length ? (
                    filteredRows.map((row) => (
                      <tr key={row.id} className="transition hover:bg-slate-50">
                        <td className="px-4 py-4 align-middle"><span className="block h-4 w-4 rounded border border-slate-300" /></td>
                        <td className="px-4 py-4 align-middle">
                          <div className="font-bold text-slate-900">{row.visitorLabel}</div>
                          <div className="mt-0.5 text-xs font-medium text-slate-500">{row.userLabel}</div>
                        </td>
                        <td className="px-4 py-4 align-middle"><OnboardingCell value={row.onboardingCompletedAt} /></td>
                        <td className="px-4 py-4 align-middle"><StepCell value={row.startedDay1At} /></td>
                        <td className="px-4 py-4 align-middle"><StepCell value={row.completedDay3At} /></td>
                        <td className="px-4 py-4 align-middle"><StepCell value={row.createdAccountAt} emptyLabel="Not yet" successLabel={formatDateTime(row.createdAccountAt)} /></td>
                        <td className="px-4 py-4 align-middle"><StepCell value={row.upgradedAt} emptyLabel="Not yet" successLabel={row.upgradedAt ? "Upgraded" : undefined} /></td>
                        <td className="px-4 py-4 align-middle">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${STATUS_STYLES[row.currentStatus]}`}>
                            {row.currentStatusLabel}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <div className="font-semibold text-slate-800">{row.source}</div>
                          {row.referrer ? <div className="mt-0.5 max-w-[180px] truncate text-xs text-slate-500">{row.referrer}</div> : null}
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <div className="font-semibold text-slate-800">{formatLastActive(row.lastActiveAt)}</div>
                          <div className="mt-0.5 text-xs text-slate-500">{row.dropoffStep}</div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="px-4 py-12 text-center text-sm font-semibold text-slate-500">No journeys match these filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <p>Showing {filteredRows.length} of {rows.length} visitors</p>
              <p className="font-medium">Rows per page: 500 max from API</p>
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
        </main>
      </div>
    </div>
  );
}
