"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

type DayStats = {
  day: number;
  label: string;
  sent: number;
  sent24h: number;
  opens: number;
  clicks: number;
  openRate: number;
  clickRate: number;
  recentSends: Array<{ email: string; sentAt: string; templateVersion: string | null }>;
};

type ApiResponse = {
  totals: {
    totalSent: number;
    sent24h: number;
    sent7d: number;
    uniqueRecipients: number;
    totalOpens: number;
    totalClicks: number;
    openRate: number;
    clickRate: number;
  };
  days: DayStats[];
  sendsByDate: Array<{ date: string; count: number }>;
  openClickTrackingLive: boolean;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDateTime(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function StatCard({ title, value, helper }: { title: string; value: string; helper?: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
      {helper ? <p className="mt-1 text-xs font-semibold text-slate-400">{helper}</p> : null}
    </div>
  );
}

export default function EmailAnalyticsPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        const user = authData.user;
        if (!user || (user.email || "").toLowerCase() !== ADMIN_EMAIL) {
          if (!cancelled) {
            setAuthorized(false);
            setData(null);
          }
          return;
        }
        if (!cancelled) setAuthorized(true);

        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("Missing admin session.");

        const response = await fetch("/api/admin/email-analytics", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json?.error || "Could not load email analytics.");
        if (!cancelled) setData(json);
      } catch (loadError: any) {
        if (!cancelled) {
          setError(loadError?.message || "Could not load email analytics.");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (authorized === false) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-slate-950">Not authorized</h1>
        <p className="mt-2 text-sm font-semibold text-slate-500">This page is for the Bible Buddy admin only.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white">
          Back home
        </Link>
      </main>
    );
  }

  const totals = data?.totals;
  const maxDateCount = Math.max(1, ...(data?.sendsByDate.map((d) => d.count) || [1]));

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-950">📧 Email Analytics</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            The 8-day email funnel — sends, opens, and clicks per day.
          </p>
        </div>
        <Link
          href="/admin/analytics"
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
        >
          ← All analytics
        </Link>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700 ring-1 ring-red-100">{error}</div>
      ) : null}

      <section className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard title="Total emails sent" value={loading ? "..." : formatNumber(totals?.totalSent || 0)} helper={`${formatNumber(totals?.uniqueRecipients || 0)} unique recipients`} />
        <StatCard title="Sent last 24h" value={loading ? "..." : formatNumber(totals?.sent24h || 0)} helper={`${formatNumber(totals?.sent7d || 0)} in the last 7 days`} />
        <StatCard title="Open rate" value={loading ? "..." : `${totals?.openRate ?? 0}%`} helper={`${formatNumber(totals?.totalOpens || 0)} opens tracked`} />
        <StatCard title="Click rate" value={loading ? "..." : `${totals?.clickRate ?? 0}%`} helper={`${formatNumber(totals?.totalClicks || 0)} clicks tracked`} />
      </section>

      {!loading && data && !data.openClickTrackingLive ? (
        <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-xs font-bold text-amber-700 ring-1 ring-amber-100">
          ⚠️ Open and click tracking is not wired up yet — Systeme.io tracks opens/clicks in its own dashboard. These
          numbers stay at 0% until we connect Systeme.io webhooks.
        </p>
      ) : null}

      <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-sm font-black uppercase tracking-wide text-slate-500">Sends — last 14 days</h2>
        <div className="mt-4 flex h-32 items-end gap-1.5">
          {(data?.sendsByDate || []).map((d) => (
            <div key={d.date} className="group relative flex-1">
              <div
                className="w-full rounded-t-md bg-blue-500 transition-colors group-hover:bg-blue-600"
                style={{ height: `${Math.max(3, (d.count / maxDateCount) * 112)}px` }}
              />
              <p className="mt-1 truncate text-center text-[9px] font-bold text-slate-400">{d.date.slice(5)}</p>
              <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100">
                {d.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-sm font-black uppercase tracking-wide text-slate-500">Funnel days</h2>
        {(data?.days || []).map((day) => {
          const expanded = openDay === day.day;
          return (
            <div key={day.day} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
              <button
                type="button"
                onClick={() => setOpenDay(expanded ? null : day.day)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-950">{day.label}</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-400">
                    {formatNumber(day.sent)} sent · {day.openRate}% open · {day.clickRate}% click
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  {day.sent24h > 0 ? (
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-black text-green-700 ring-1 ring-green-100">
                      +{formatNumber(day.sent24h)} today
                    </span>
                  ) : null}
                  <span className="text-lg font-black text-slate-400">{expanded ? "−" : "+"}</span>
                </div>
              </button>
              {expanded ? (
                <div className="border-t border-slate-100 px-5 py-4">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <StatCard title="Sent" value={formatNumber(day.sent)} />
                    <StatCard title="Last 24h" value={formatNumber(day.sent24h)} />
                    <StatCard title="Opens" value={`${formatNumber(day.opens)} (${day.openRate}%)`} />
                    <StatCard title="Clicks" value={`${formatNumber(day.clicks)} (${day.clickRate}%)`} />
                  </div>
                  {day.recentSends.length ? (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[480px] text-left text-sm">
                        <thead>
                          <tr className="text-xs font-black uppercase tracking-wide text-slate-400">
                            <th className="pb-2">Email</th>
                            <th className="pb-2">Sent at</th>
                            <th className="pb-2">Version</th>
                          </tr>
                        </thead>
                        <tbody>
                          {day.recentSends.map((send, index) => (
                            <tr key={`${send.email}-${index}`} className="border-t border-slate-50">
                              <td className="py-2 font-bold text-slate-800">{send.email}</td>
                              <td className="py-2 font-semibold text-slate-500">{formatDateTime(send.sentAt)}</td>
                              <td className="py-2 font-semibold text-slate-400">{send.templateVersion || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {day.sent > day.recentSends.length ? (
                        <p className="mt-2 text-xs font-semibold text-slate-400">
                          Showing the {day.recentSends.length} most recent of {formatNumber(day.sent)} sends.
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm font-semibold text-slate-400">No emails sent for this day yet.</p>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </section>
    </main>
  );
}
