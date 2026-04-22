import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { bibleBuddyTvTitles } from "@/lib/bibleBuddyTvContent";

type TimeFilter = "24h" | "7d" | "30d" | "1y" | "all";

function getFromDate(filter: TimeFilter): string | null {
  if (filter === "all") return null;

  const now = new Date();
  if (filter === "24h") {
    return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  }
  if (filter === "7d") {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  }
  if (filter === "30d") {
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  }
  return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
}

export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const adminSupabase = createClient(url, serviceKey);

  const rawFilter = request.nextUrl.searchParams.get("filter");
  const filter: TimeFilter =
    rawFilter === "24h" ||
    rawFilter === "7d" ||
    rawFilter === "30d" ||
    rawFilter === "1y" ||
    rawFilter === "all"
      ? rawFilter
      : "24h";

  const fromDate = getFromDate(filter);

  let query = adminSupabase
    .from("video_progress")
    .select("user_id, video_id, current_time, duration, completed, updated_at")
    .order("updated_at", { ascending: false });

  if (fromDate) {
    query = query.gte("updated_at", fromDate);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch video analytics." },
      { status: 500 }
    );
  }

  const episodeMap = new Map<
    string,
    { episodeTitle: string; seriesTitle: string; category: string }
  >();

  for (const title of bibleBuddyTvTitles) {
    for (const episode of title.episodes) {
      episodeMap.set(episode.id, {
        episodeTitle: episode.title,
        seriesTitle: title.title,
        category: title.category,
      });
    }
  }

  const rows = data || [];
  const uniqueViewers = new Set(
    rows
      .map((row) => row.user_id)
      .filter((userId): userId is string => typeof userId === "string" && userId.length > 0)
  );

  let totalMinutesPlayed = 0;
  let videosCompleted = 0;
  let percentAccumulator = 0;

  const videoMap = new Map<
    string,
    {
      videoId: string;
      episodeTitle: string;
      seriesTitle: string;
      category: string;
      viewers: Set<string>;
      started: number;
      completed: number;
      currentSecondsTotal: number;
      percentTotal: number;
      percentCount: number;
      lastWatchedAt: string | null;
    }
  >();

  for (const row of rows) {
    const duration = Number(row.duration ?? 0);
    const currentTime = Number(row.current_time ?? 0);
    const boundedPercent =
      duration > 0 ? Math.min(Math.max(currentTime / duration, 0), 1) : 0;

    totalMinutesPlayed += currentTime / 60;
    percentAccumulator += boundedPercent;

    if (row.completed) {
      videosCompleted += 1;
    }

    const mapped = episodeMap.get(row.video_id) ?? {
      episodeTitle: row.video_id,
      seriesTitle: "Unknown Title",
      category: "tv",
    };

    const existing = videoMap.get(row.video_id) ?? {
      videoId: row.video_id,
      episodeTitle: mapped.episodeTitle,
      seriesTitle: mapped.seriesTitle,
      category: mapped.category,
      viewers: new Set<string>(),
      started: 0,
      completed: 0,
      currentSecondsTotal: 0,
      percentTotal: 0,
      percentCount: 0,
      lastWatchedAt: null as string | null,
    };

    if (row.user_id) {
      existing.viewers.add(row.user_id);
    }
    existing.started += 1;
    existing.currentSecondsTotal += currentTime;
    existing.percentTotal += boundedPercent;
    existing.percentCount += 1;
    if (row.completed) {
      existing.completed += 1;
    }
    if (!existing.lastWatchedAt || row.updated_at > existing.lastWatchedAt) {
      existing.lastWatchedAt = row.updated_at;
    }

    videoMap.set(row.video_id, existing);
  }

  const topVideos = Array.from(videoMap.values())
    .map((video) => ({
      videoId: video.videoId,
      episodeTitle: video.episodeTitle,
      seriesTitle: video.seriesTitle,
      category: video.category,
      viewers: video.viewers.size,
      started: video.started,
      completed: video.completed,
      minutesPlayed: Number((video.currentSecondsTotal / 60).toFixed(1)),
      averageWatchPercent:
        video.percentCount > 0
          ? Number(((video.percentTotal / video.percentCount) * 100).toFixed(1))
          : 0,
      lastWatchedAt: video.lastWatchedAt,
    }))
    .sort((a, b) => {
      if (b.viewers !== a.viewers) return b.viewers - a.viewers;
      if (b.minutesPlayed !== a.minutesPlayed) return b.minutesPlayed - a.minutesPlayed;
      return b.completed - a.completed;
    })
    .slice(0, 12);

  return NextResponse.json({
    summary: {
      totalMinutesPlayed: Math.round(totalMinutesPlayed),
      uniqueViewers: uniqueViewers.size,
      videosStarted: rows.length,
      videosCompleted,
      averageWatchPercent:
        rows.length > 0 ? Math.round((percentAccumulator / rows.length) * 100) : 0,
      topVideos,
    },
  });
}
