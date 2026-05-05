"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import BibleStudiesSeriesList from "@/components/BibleStudiesSeriesList";
import {
  ACTION_TYPE,
} from "../../lib/actionTypes";
import {
  BIBLE_STUDY_GROUP_ID,
  BIBLE_STUDY_SERIES_CATALOG,
  getBibleStudySeriesCover,
  normalizeBibleStudySeriesTitle,
} from "../../lib/bibleStudiesCatalog";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";
import { supabase } from "../../lib/supabaseClient";

type Series = {
  id: string;
  title: string;
  description: string | null;
  total_weeks: number;
  current_week: number;
  is_current: boolean;
  created_at: string;
};

function resolveSeriesStart(schedule: { start_at?: string | null; start_date?: string | null } | null | undefined) {
  if (!schedule) return null;
  if (schedule.start_at) return schedule.start_at;
  if (schedule.start_date) return `${schedule.start_date}T00:00:00`;
  return null;
}

function formatDateTimeLabel(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatCountdown(targetTs: number, nowTs: number) {
  const diff = Math.max(0, targetTs - nowTs);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function BibleStudiesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [currentSeriesTitle, setCurrentSeriesTitle] = useState<string | null>(null);
  const [currentSeriesStartAt, setCurrentSeriesStartAt] = useState<string | null>(null);
  const [nowTs, setNowTs] = useState(() => Date.now());

  useEffect(() => {
    const tick = window.setInterval(() => setNowTs(Date.now()), 60000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setUserId(user?.id ?? null);
      const meta: any = user?.user_metadata || {};
      setUsername(
        meta.firstName ||
          meta.first_name ||
          (user?.email ? user.email.split("@")[0] : null) ||
          null,
      );
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.guided_study_tool_opened,
      actionLabel: "Bible Studies Page",
      dedupeKey: "bible-studies-page-viewed",
    }).catch((error) => console.error("[NAV] Failed to track Bible Studies page view:", error));
  }, [userId, username]);

  useEffect(() => {
    let cancelled = false;

    async function loadSeries() {
      setLoadingSeries(true);

      const { data } = await supabase
        .from("group_series")
        .select("id, title, description, total_weeks, current_week, is_current, created_at")
        .eq("group_id", BIBLE_STUDY_GROUP_ID)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      const rows = (data || []) as Series[];
      setSeriesList(rows);

      const currentSeries = rows.find((series) => series.is_current) ?? rows[0] ?? null;
      setCurrentSeriesTitle(currentSeries?.title ?? null);

      if (currentSeries) {
        const { data: scheduleRow } = await supabase
          .from("series_schedules")
          .select("start_date, start_at")
          .eq("series_id", currentSeries.id)
          .maybeSingle();

        if (!cancelled) {
          setCurrentSeriesStartAt(resolveSeriesStart(scheduleRow));
        }
      } else {
        setCurrentSeriesStartAt(null);
      }

      if (!cancelled) {
        setLoadingSeries(false);
      }
    }

    void loadSeries();

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    const currentNormalized = normalizeBibleStudySeriesTitle(currentSeriesTitle);

    return BIBLE_STUDY_SERIES_CATALOG.map((series) => {
      const matchingSeries =
        seriesList.find(
          (row) => normalizeBibleStudySeriesTitle(row.title) === normalizeBibleStudySeriesTitle(series.title),
        ) ?? null;

      const isCurrent = currentNormalized === normalizeBibleStudySeriesTitle(series.title);
      const isPastStudy = normalizeBibleStudySeriesTitle(series.title) === "the temptation of jesus";
      const isNextStudy = normalizeBibleStudySeriesTitle(series.title) === "the wisdom of proverbs";

      let statusLabel = "Series";
      let statusTone: "current" | "upcoming" | "past" | "preview" | "locked" = "preview";
      let detail = series.description;
      let footerLeft: string | null = `${series.totalWeeks}-week Bible study`;
      let footerRight: string | null = null;

      if (isCurrent) {
        statusLabel = "Current Study";
        statusTone = "current";
        if (currentSeriesStartAt && new Date(currentSeriesStartAt).getTime() > nowTs) {
          detail = `Study starts in ${formatCountdown(new Date(currentSeriesStartAt).getTime(), nowTs)}${
            currentSeriesStartAt ? ` · ${formatDateTimeLabel(currentSeriesStartAt)}` : ""
          }`;
        } else if (matchingSeries) {
          detail = `${series.title} Week ${matchingSeries.current_week || 1} Now Live. Open your weekly Bible study and complete this week's lesson.`;
        } else {
          detail = `${series.title} is the current weekly Bible study series.`;
        }
        footerRight = "Now Live";
      } else if (isPastStudy) {
        statusLabel = "Past Study";
        statusTone = "past";
        footerRight = "Archive Series";
      } else if (isNextStudy) {
        statusLabel = "Next Bible Study";
        statusTone = "upcoming";
        footerRight = "Coming Next";
      } else {
        footerRight = "Bible Study Series";
      }

      return {
        key: series.key,
        title: series.title,
        subtitle: series.subtitle,
        coverSrc: getBibleStudySeriesCover(series.title),
        statusLabel,
        statusTone,
        detail,
        footerLeft,
        footerRight,
      };
    });
  }, [currentSeriesStartAt, currentSeriesTitle, nowTs, seriesList]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <nav className="text-sm text-gray-500">
          <Link href="/dashboard" className="transition hover:text-gray-700">Dashboard</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/guided-studies" className="transition hover:text-gray-700">Bible Study Tools</Link>
          <span className="mx-2">&gt;</span>
          <span className="font-medium text-gray-800">Bible Studies</span>
        </nav>

        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Weekly Bible Series</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Bible Studies</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
            This is the main Bible Studies hub for our weekly Bible series. Joseph, Jesus, and Proverbs all live here,
            and the current study updates as each new week comes out.
          </p>
        </div>

        <BibleStudiesSeriesList
          items={cards}
          loading={loadingSeries}
          emptyMessage="No Bible study series have been added yet."
        />
      </div>
    </div>
  );
}
