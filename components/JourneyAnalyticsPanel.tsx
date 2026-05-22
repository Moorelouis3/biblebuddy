"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";

type JourneyAnalyticsPayload = {
  generatedAt: string;
  overview: {
    signupsToday: number;
    activeUsers: number;
    upgradesToday: number;
    totalUsers: number;
  };
  modes: {
    bibleInOneYear: {
      users: number;
      activeUsers7d: number;
      completedTasks: number;
      completedDays: number;
      averageCurrentDay: number;
      completionRate: number;
      taskBreakdownToday: {
        reading: number;
        trivia: number;
        reflection: number;
      };
      dayDistribution: Array<{ day: number; users: number }>;
      topUsers: Array<{
        userId: string;
        name: string;
        currentDay: number;
        completedDays: number;
        completedTasks: number;
        isPaid: boolean;
        lastUpdated: string | null;
      }>;
    };
    freeMode: {
      activeUsers7d: number;
      activeUsers30d: number;
      actionsToday: number;
      actions30d: number;
      chaptersCompleted30d: number;
      notesOpened30d: number;
    };
  };
  videoHelpfulness: {
    yes: number;
    no: number;
    total: number;
    yesRate: number;
    verdict: string;
    videos: Array<{
      videoId: string;
      title: string;
      context: string;
      url: string;
      yes: number;
      no: number;
      total: number;
      yesRate: number;
      verdict: string;
      latestVoteAt: string | null;
    }>;
  };
  errors?: Record<string, string | null>;
};

const OWNER_EMAIL = "moorelouis3@gmail.com";

function formatNumber(value: number) {
  return Number(value || 0).toLocaleString();
}

function formatDateTime(value?: string | null) {
  if (!value) return "No update";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function startOfLocalDayIso() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="rounded-[18px] border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-card,#10243a)]/92 p-4 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#5ac8fa)]">{label}</p>
      <p className="mt-2 text-3xl font-black leading-none text-[var(--bb-text-primary,#f8fbff)]">{value}</p>
      <p className="mt-2 text-xs font-bold leading-5 text-[var(--bb-text-secondary,#b7c8dd)]">{detail}</p>
    </div>
  );
}

function ModeCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[22px] border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-card,#10243a)]/92 p-4 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#5ac8fa)]">Mode</p>
      <h2 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#f8fbff)]">{title}</h2>
      <p className="mt-1 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#b7c8dd)]">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function JourneyAnalyticsPanel({ embedded = false }: { embedded?: boolean }) {
  const [isOwner, setIsOwner] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [data, setData] = useState<JourneyAnalyticsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams({
      todayStart: startOfLocalDayIso(),
      activeSince: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    });
    return params.toString();
  }, []);

  useEffect(() => {
    async function loadOwner() {
      const { data: userData } = await supabase.auth.getUser();
      setIsOwner(userData.user?.email === OWNER_EMAIL);
      setAuthChecked(true);
    }

    void loadOwner();
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    if (!isOwner) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadAnalytics() {
      setLoading(true);
      setError(null);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        const response = await fetch(`/api/admin/journey-analytics?${query}`, {
          cache: "no-store",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload?.error || "Could not load journey analytics.");
        if (!cancelled) setData(payload as JourneyAnalyticsPayload);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load journey analytics.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadAnalytics();
    return () => {
      cancelled = true;
    };
  }, [authChecked, isOwner, query]);

  const shellClass = embedded
    ? "w-full pb-28 text-[var(--bb-text-primary,#f8fbff)]"
    : "min-h-screen bg-slate-950 px-4 py-5 text-white";

  if (!authChecked || loading) {
    return (
      <main className={shellClass}>
        <div className="mx-auto max-w-5xl rounded-[22px] border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-card,#10243a)]/92 p-6 shadow-sm">
          <p className="text-sm font-black text-[var(--bb-text-secondary,#b7c8dd)]">Loading journey analytics...</p>
        </div>
      </main>
    );
  }

  if (!isOwner) {
    return (
      <main className={shellClass}>
        <div className="mx-auto max-w-5xl rounded-[22px] border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-card,#10243a)]/92 p-6 shadow-sm">
          <p className="text-sm font-black text-[var(--bb-text-primary,#f8fbff)]">Owner analytics only.</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className={shellClass}>
        <div className="mx-auto max-w-5xl rounded-[22px] border border-red-300/60 bg-red-950/35 p-6 shadow-sm">
          <p className="text-sm font-black text-red-100">{error || "Analytics did not load."}</p>
        </div>
      </main>
    );
  }

  const bibleYear = data.modes.bibleInOneYear;
  const freeMode = data.modes.freeMode;
  const videoHelpfulness = data.videoHelpfulness;
  const maxDayUsers = Math.max(1, ...bibleYear.dayDistribution.map((item) => item.users));

  return (
    <main className={shellClass}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <section className="rounded-[26px] border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-card,#10243a)]/92 p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#5ac8fa)]">Owner Analytics</p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-[var(--bb-text-primary,#f8fbff)]">Journey Analytics</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#b7c8dd)]">
            Bible-first analytics for signups, active users, upgrades, and how people move through Bible In One Year.
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Signups" value={formatNumber(data.overview.signupsToday)} detail="New users today" />
          <StatCard label="Active Users" value={formatNumber(data.overview.activeUsers)} detail="Active in the last 24 hours" />
          <StatCard label="Upgrades" value={formatNumber(data.overview.upgradesToday)} detail="Paid upgrades today" />
          <StatCard label="Total Users" value={formatNumber(data.overview.totalUsers)} detail="All registered accounts" />
        </section>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <ModeCard title="Bible In One Year" subtitle="Tracks day progress, task completion, and where people are in the plan.">
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Users" value={formatNumber(bibleYear.users)} detail="Started this mode" />
              <StatCard label="Active 7d" value={formatNumber(bibleYear.activeUsers7d)} detail="Touched the plan this week" />
              <StatCard label="Avg Day" value={bibleYear.averageCurrentDay} detail="Average latest day reached" />
            </div>

            <div className="mt-4 rounded-2xl border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-surface-soft,#0a1b2e)]/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black text-[var(--bb-text-primary,#f8fbff)]">Today's task movement</p>
                <p className="text-xs font-bold text-[var(--bb-text-secondary,#b7c8dd)]">{formatNumber(bibleYear.completedTasks)} lifetime tasks complete</p>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {[
                  ["Reading", bibleYear.taskBreakdownToday.reading],
                  ["Trivia", bibleYear.taskBreakdownToday.trivia],
                  ["Reflection", bibleYear.taskBreakdownToday.reflection],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-card,#10243a)] px-3 py-3">
                    <p className="text-xs font-black text-[var(--bb-text-secondary,#b7c8dd)]">{label}</p>
                    <p className="mt-1 text-2xl font-black text-[var(--bb-text-primary,#f8fbff)]">{formatNumber(Number(value))}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-surface-soft,#0a1b2e)]/70 p-4">
              <p className="text-sm font-black text-[var(--bb-text-primary,#f8fbff)]">Current day distribution</p>
              <div className="mt-3 space-y-2">
                {bibleYear.dayDistribution.length ? (
                  bibleYear.dayDistribution.map((item) => (
                    <div key={item.day} className="grid grid-cols-[62px_1fr_42px] items-center gap-2">
                      <p className="text-xs font-black text-[var(--bb-text-secondary,#b7c8dd)]">Day {item.day}</p>
                      <div className="h-2 overflow-hidden rounded-full bg-white/15">
                        <div className="h-full rounded-full bg-[var(--bb-accent,#5ac8fa)]" style={{ width: `${Math.max(8, (item.users / maxDayUsers) * 100)}%` }} />
                      </div>
                      <p className="text-right text-xs font-black text-[var(--bb-text-secondary,#b7c8dd)]">{item.users}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-semibold text-[var(--bb-text-secondary,#b7c8dd)]">No Bible In One Year progress yet.</p>
                )}
              </div>
            </div>
          </ModeCard>

          <ModeCard title="Free Mode" subtitle="Tracks Bible activity outside the one-year plan.">
            <div className="grid gap-3">
              <StatCard label="Active 7d" value={formatNumber(freeMode.activeUsers7d)} detail="Used free Bible actions this week" />
              <StatCard label="Actions Today" value={formatNumber(freeMode.actionsToday)} detail="Free mode Bible actions today" />
              <StatCard label="Chapters 30d" value={formatNumber(freeMode.chaptersCompleted30d)} detail="Chapters completed in 30 days" />
              <StatCard label="Notes 30d" value={formatNumber(freeMode.notesOpened30d)} detail="Chapter notes opened in 30 days" />
            </div>
          </ModeCard>
        </div>

        <section className="rounded-[22px] border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-card,#10243a)]/92 p-4 shadow-sm">
          <h2 className="text-xl font-black text-[var(--bb-text-primary,#f8fbff)]">Bible In One Year user movement</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--bb-card-border,#2b4f74)]">
            <div className="grid grid-cols-[1.2fr_54px_64px_82px] bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-secondary,#b7c8dd)] sm:grid-cols-[1.2fr_70px_90px_110px]">
              <p>User</p>
              <p>Day</p>
              <p>Tasks</p>
              <p>Updated</p>
            </div>
            {bibleYear.topUsers.length ? (
              bibleYear.topUsers.map((user) => (
                <div key={user.userId} className="grid grid-cols-[1.2fr_54px_64px_82px] items-center border-t border-[var(--bb-card-border,#2b4f74)] px-3 py-3 text-sm sm:grid-cols-[1.2fr_70px_90px_110px]">
                  <p className="min-w-0 truncate font-black text-[var(--bb-text-primary,#f8fbff)]">{user.name}</p>
                  <p className="font-bold text-[var(--bb-text-secondary,#b7c8dd)]">{user.currentDay}</p>
                  <p className="font-bold text-[var(--bb-text-secondary,#b7c8dd)]">{user.completedTasks}</p>
                  <p className="truncate text-xs font-bold text-[var(--bb-text-secondary,#b7c8dd)]">{formatDateTime(user.lastUpdated)}</p>
                </div>
              ))
            ) : (
              <div className="border-t border-[var(--bb-card-border,#2b4f74)] px-3 py-4 text-sm font-semibold text-[var(--bb-text-secondary,#b7c8dd)]">No Bible In One Year users yet.</div>
            )}
          </div>
        </section>

        <section className="rounded-[22px] border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-card,#10243a)]/92 p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#5ac8fa)]">Video Helpfulness</p>
              <h2 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#f8fbff)]">Was this video helpful?</h2>
              <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#b7c8dd)]">Simple Yes vs No feedback across Bible In One Year and Bible Topics videos.</p>
            </div>
            <div className="rounded-2xl border border-[var(--bb-card-border,#2b4f74)] bg-[var(--bb-surface-soft,#0a1b2e)]/70 px-4 py-3 text-right">
              <p className="text-3xl font-black text-[var(--bb-text-primary,#f8fbff)]">{videoHelpfulness.yesRate}%</p>
              <p className="text-xs font-black text-[var(--bb-text-secondary,#b7c8dd)]">{videoHelpfulness.verdict}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <StatCard label="Yes" value={formatNumber(videoHelpfulness.yes)} detail="Helpful votes" />
            <StatCard label="No" value={formatNumber(videoHelpfulness.no)} detail="Not helpful votes" />
            <StatCard label="Total" value={formatNumber(videoHelpfulness.total)} detail="All video votes" />
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--bb-card-border,#2b4f74)]">
            <div className="grid grid-cols-[1.3fr_58px_58px_72px] bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--bb-text-secondary,#b7c8dd)] sm:grid-cols-[1.5fr_72px_72px_88px]">
              <p>Video</p>
              <p>Yes</p>
              <p>No</p>
              <p>Avg</p>
            </div>
            {videoHelpfulness.videos.length ? (
              videoHelpfulness.videos.map((video) => (
                <div key={video.videoId} className="grid grid-cols-[1.3fr_58px_58px_72px] items-center border-t border-[var(--bb-card-border,#2b4f74)] px-3 py-3 text-sm sm:grid-cols-[1.5fr_72px_72px_88px]">
                  <div className="min-w-0">
                    <p className="truncate font-black text-[var(--bb-text-primary,#f8fbff)]">{video.title}</p>
                    <p className="mt-0.5 truncate text-[11px] font-bold capitalize text-[var(--bb-text-secondary,#b7c8dd)]">{video.context.replace("_", " ")}</p>
                  </div>
                  <p className="font-bold text-[var(--bb-text-secondary,#b7c8dd)]">{video.yes}</p>
                  <p className="font-bold text-[var(--bb-text-secondary,#b7c8dd)]">{video.no}</p>
                  <p className="text-xs font-black text-[var(--bb-text-primary,#f8fbff)]">{video.yesRate}% {video.verdict}</p>
                </div>
              ))
            ) : (
              <div className="border-t border-[var(--bb-card-border,#2b4f74)] px-3 py-4 text-sm font-semibold text-[var(--bb-text-secondary,#b7c8dd)]">No video helpfulness votes yet.</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
