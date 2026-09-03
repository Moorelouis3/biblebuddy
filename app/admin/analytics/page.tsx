"use client";

/**
 * The slim admin overview (2026-09-03): six cards answering "are people
 * coming, are they staying, is what I built this week working". Revenue and
 * the onboarding-step funnel are gone from the front page on purpose - the
 * old full dashboard lives at /admin/analytics/full, and the other deep
 * dashboards keep their own subpages.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

type Overview = {
  generatedAt: string;
  signups: { today: number; week: number; bySource: Record<string, { today: number; week: number }> };
  activity: { activeToday: number; activeYesterday: number; streakThreePlus: number };
  bibleYear: { dayOpensToday: number; readingsCompletedToday: number };
  votd: { today: Record<string, number>; week: Record<string, number> };
  proverbsSignups: number;
  group: { postsToday: number };
  reports: { today: number; week: number };
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-gray-500">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Big({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-black leading-none text-gray-900">{value}</p>
      <p className="mt-1 text-xs font-bold text-gray-500">{label}</p>
    </div>
  );
}

function daysUntilOctoberFirst() {
  const berlinToday = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
  const [y, m, d] = berlinToday.split("-").map(Number);
  return Math.max(0, Math.round((Date.UTC(2026, 9, 1) - Date.UTC(y, m - 1, d)) / 86_400_000));
}

export default function AdminAnalyticsOverviewPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if ((userData.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
        setAuthorized(false);
        return;
      }
      setAuthorized(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token || "";
      try {
        const response = await fetch("/api/admin/dashboard-overview", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json?.error || "Could not load the overview.");
        setData(json);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Could not load the overview.");
      }
    })();
  }, []);

  if (authorized === false) return <div className="p-10 text-center font-bold">Not authorized.</div>;

  const votdWeek = data?.votd.week || {};
  const votdToday = data?.votd.today || {};
  const sources = Object.entries(data?.signups.bySource || {}).sort((a, b) => b[1].week - a[1].week);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-28">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Bible Buddy today</h1>
          <p className="mt-1 text-sm font-semibold text-gray-500">
            Coming, staying, and whether this week&apos;s work is working.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-black">
          {[
            ["Full analytics", "/admin/analytics/full"],
            ["Verse of the Day", "/admin/verse-of-the-day"],
            ["Journeys", "/admin/journey-analytics"],
            ["Email", "/admin/email-analytics"],
            ["Top Buddies", "/admin/top-buddies"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-gray-700 transition hover:bg-gray-50"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">{error}</div>
      ) : null}

      {!data && !error ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      ) : null}

      {data ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card title="New Bible Buddies">
            <div className="flex gap-8">
              <Big value={data.signups.today} label="today" />
              <Big value={data.signups.week} label="last 7 days" />
            </div>
            <div className="mt-3 grid gap-1">
              {sources.length ? (
                sources.map(([source, counts]) => (
                  <p key={source} className="flex justify-between text-sm font-bold text-gray-700">
                    <span className="capitalize">{source === "direct" ? "Untracked*" : source}</span>
                    <span>
                      {counts.today} today · {counts.week} wk
                    </span>
                  </p>
                ))
              ) : (
                <p className="text-sm font-semibold text-gray-400">No signups in the window.</p>
              )}
              <p className="mt-2 text-[11px] font-semibold leading-4 text-gray-400">
                *Untracked = the browser sent no referrer and the link had no tag. Pinterest and
                Facebook in-app browsers do this, so much of it is really them. Pins are UTM-tagged
                as of Sep 3 - watch Pinterest climb out of this bucket.
              </p>
            </div>
          </Card>

          <Card title="Coming back">
            <div className="flex gap-8">
              <Big value={data.activity.activeToday} label="active today" />
              <Big value={data.activity.activeYesterday} label="yesterday" />
              <Big value={data.activity.streakThreePlus} label="streak ≥ 3" />
            </div>
            <p className="mt-3 text-xs font-semibold text-gray-400">
              Active = profile touched that day. Streaks come from the streak system itself.
            </p>
          </Card>

          <Card title="Bible in One Year">
            <div className="flex gap-8">
              <Big value={data.bibleYear.dayOpensToday} label="people opened a day today" />
              <Big value={data.bibleYear.readingsCompletedToday} label="readings finished today" />
            </div>
          </Card>

          <Card title="Verse of the Day pilot">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm font-bold text-gray-700">
              {[
                ["Card views", "votd_card_impression"],
                ["Breakdown opens", "votd_breakdown_open"],
                ["Finished reading", "votd_breakdown_complete"],
                ["Bookmarks", "votd_bookmark"],
                ["Shares", "votd_share"],
                ["Opened in Bible", "votd_open_in_bible"],
              ].map(([label, key]) => (
                <p key={key} className="flex justify-between">
                  <span>{label}</span>
                  <span>
                    {votdToday[key] || 0} today · {votdWeek[key] || 0} wk
                  </span>
                </p>
              ))}
            </div>
          </Card>

          <Card title="Wisdom of Proverbs">
            <div className="flex gap-8">
              <Big value={data.proverbsSignups} label="signed up" />
              <Big value={daysUntilOctoberFirst()} label="days to October 1" />
            </div>
          </Card>

          <Card title="Group & problem reports">
            <div className="flex gap-8">
              <Big value={data.group.postsToday} label="group posts today" />
              <Big value={data.reports.today} label="reports today" />
              <Big value={data.reports.week} label="reports this week" />
            </div>
            <p className="mt-3 text-xs font-semibold text-gray-400">Reports land in your Messages either way.</p>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
