import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BibleYearProgressRow = {
  user_id: string | null;
  day_number: number | null;
  reading_completed: boolean | null;
  study_notes_completed: boolean | null;
  trivia_completed: boolean | null;
  reflection_completed: boolean | null;
  updated_at: string | null;
};

type ActionRow = {
  user_id: string | null;
  action_type: string | null;
  action_label: string | null;
  created_at: string | null;
};

type ProfileRow = {
  user_id: string | null;
  username: string | null;
  display_name: string | null;
  is_paid: boolean | null;
  current_level: number | null;
  last_active_at?: string | null;
  last_active_date?: string | null;
  updated_at?: string | null;
  member_badge?: string | null;
};

type VideoHelpfulnessRow = {
  video_id: string | null;
  video_title: string | null;
  video_url: string | null;
  video_context: string | null;
  helpful: boolean | null;
  updated_at: string | null;
};

const BIBLE_YEAR_ACTIONS = [
  "bible_in_one_year_day_viewed",
  "bible_in_one_year_reading_completed",
  "bible_in_one_year_trivia_completed",
  "bible_in_one_year_reflection_completed",
];

const FREE_MODE_ACTIONS = [
  "chapter_completed",
  "reading_plan_chapter_completed",
  "chapter_notes_viewed",
  "trivia_chapter_completed",
  "scrambled_chapter_completed",
  "devotional_day_completed",
  "daily_reading_completed",
  "daily_trivia_completed",
  "daily_reflection_completed",
];

async function verifyOwner(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.toLowerCase().startsWith("bearer ") ? authHeader.slice(7) : "";

  if (!url || !anonKey || !token) return false;

  const authClient = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data, error } = await authClient.auth.getUser(token);
  if (error) return false;
  return data.user?.email === "moorelouis3@gmail.com";
}

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function countAuthUsers(url: string, serviceKey: string) {
  let totalUsers = 0;
  let page = 1;
  const perPage = 1000;

  while (page <= 50) {
    const response = await fetch(`${url}/auth/v1/admin/users?page=${page}&per_page=${perPage}`, {
      headers: {
        apiKey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch total users.");
    const json = await response.json();
    const users = Array.isArray(json.users) ? json.users : [];
    totalUsers += users.length;
    if (users.length < perPage) break;
    page += 1;
  }

  return totalUsers;
}

function uniqueCount(rows: Array<{ user_id: string | null }>) {
  return new Set(rows.map((row) => row.user_id).filter((id): id is string => Boolean(id))).size;
}

function percent(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}

function isWithinIsoWindow(value: string | null | undefined, startIso: string, endIso?: string | null) {
  if (!value) return false;
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return false;
  const start = new Date(startIso).getTime();
  const end = endIso ? new Date(endIso).getTime() : null;
  return time >= start && (end === null || time < end);
}

function isInternalUpgradeProfile(row: Pick<ProfileRow, "display_name" | "username" | "member_badge">) {
  const badge = (row.member_badge || "").trim().toLowerCase();
  const name = (row.display_name || row.username || "").trim().toLowerCase();
  return ["admin", "owner", "staff", "teacher", "internal"].includes(badge) || name === "louis" || name === "louis moore";
}

export async function GET(request: Request) {
  const owner = await verifyOwner(request);
  if (!owner) {
    return NextResponse.json({ error: "Owner analytics only." }, { status: 403 });
  }

  const supabase = createAdminClient();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabase || !url || !key) {
    return NextResponse.json({ error: "Admin analytics is not configured." }, { status: 500 });
  }

  const params = new URL(request.url).searchParams;
  const todayStart = params.get("todayStart") || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const todayEnd = params.get("todayEnd") || null;
  const activeSince = params.get("activeSince") || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const taskWindowStart = params.get("taskWindowStart") || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const since30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const [
      totalUsers,
      signupsResult,
      fallbackSignupsResult,
      upgradesResult,
      activeActionsResult,
      activeProfilesResult,
      bibleYearProgressResult,
      bibleYearActionsResult,
      freeModeActionsResult,
      profilesResult,
      videoHelpfulnessResult,
    ] = await Promise.all([
      countAuthUsers(url, key),
      supabase.from("user_signups").select("user_id").gte("created_at", todayStart).limit(250000),
      supabase.from("master_actions").select("user_id").eq("action_type", "user_signup").gte("created_at", todayStart).limit(250000),
      supabase.from("master_actions").select("user_id").eq("action_type", "user_upgraded").gte("created_at", todayStart).limit(250000),
      supabase.from("master_actions").select("user_id").gte("created_at", activeSince).limit(250000),
      supabase.from("profile_stats").select("user_id, last_active_at, last_active_date").or(`last_active_at.gte.${activeSince},last_active_date.gte.${activeSince.slice(0, 10)}`).limit(250000),
      supabase.from("bible_year_day_progress").select("user_id, day_number, reading_completed, study_notes_completed, trivia_completed, reflection_completed, updated_at").limit(250000),
      supabase.from("master_actions").select("user_id, action_type, action_label, created_at").in("action_type", BIBLE_YEAR_ACTIONS).gte("created_at", since30d).limit(250000),
      supabase.from("master_actions").select("user_id, action_type, action_label, created_at").in("action_type", FREE_MODE_ACTIONS).gte("created_at", since30d).limit(250000),
      supabase.from("profile_stats").select("user_id, username, display_name, is_paid, current_level, last_active_at, last_active_date, updated_at, member_badge").limit(250000),
      supabase.from("video_helpfulness_votes").select("video_id, video_title, video_url, video_context, helpful, updated_at").limit(250000),
    ]);

    const signupRows = (signupsResult.data || []) as Array<{ user_id: string | null }>;
    const fallbackSignupRows = (fallbackSignupsResult.data || []) as Array<{ user_id: string | null }>;
    const uniqueSignupCount = uniqueCount(signupsResult.error ? fallbackSignupRows : signupRows);

    const activeRows = [
      ...((activeActionsResult.data || []) as Array<{ user_id: string | null }>),
      ...((activeProfilesResult.data || []) as Array<{ user_id: string | null }>),
    ];

    const progressRows = (bibleYearProgressResult.data || []) as BibleYearProgressRow[];
    const bibleYearActions = (bibleYearActionsResult.data || []) as ActionRow[];
    const freeModeActions = (freeModeActionsResult.data || []) as ActionRow[];
    const profiles = (profilesResult.data || []) as ProfileRow[];
    const videoHelpfulnessRows = (videoHelpfulnessResult.data || []) as VideoHelpfulnessRow[];
    const profileByUser = new Map(profiles.filter((row) => row.user_id).map((row) => [row.user_id as string, row]));
    const upgradeUserIds = new Set<string>(
      ((upgradesResult.data || []) as Array<{ user_id?: string | null }>)
        .map((row) => row.user_id)
        .filter((id): id is string => Boolean(id)),
    );

    const progressByUser = new Map<string, BibleYearProgressRow[]>();
    for (const row of progressRows) {
      if (!row.user_id) continue;
      const current = progressByUser.get(row.user_id) || [];
      current.push(row);
      progressByUser.set(row.user_id, current);
    }

    const completedBibleYearTasks = progressRows.reduce(
      (sum, row) => sum + (row.reading_completed ? 1 : 0) + (row.study_notes_completed ? 1 : 0) + (row.trivia_completed ? 1 : 0) + (row.reflection_completed ? 1 : 0),
      0,
    );
    const completedBibleYearDays = progressRows.filter((row) => row.reading_completed && row.study_notes_completed && row.trivia_completed && row.reflection_completed).length;
    const bibleYearUsers = progressByUser.size;
    const activeBibleYearUsers7d = uniqueCount(progressRows.filter((row) => row.updated_at && row.updated_at >= since7d));

    const latestDayCounts = new Map<number, number>();
    let currentDayTotal = 0;
    for (const rows of progressByUser.values()) {
      const latestDay = Math.max(...rows.map((row) => Number(row.day_number || 0)));
      if (latestDay > 0) {
        latestDayCounts.set(latestDay, (latestDayCounts.get(latestDay) || 0) + 1);
        currentDayTotal += latestDay;
      }
    }

    const bibleYearActionsLast24h = bibleYearActions.filter((row) => row.created_at && row.created_at >= taskWindowStart);
    const isBibleYearCardAction = (row: ActionRow, card: "Video" | "Trivia" | "Summary") => {
      if (card === "Video") {
        return row.action_type === "bible_in_one_year_reading_completed" || Boolean(row.action_label?.match(/ (Video|Reading):/));
      }
      if (card === "Summary") {
        return row.action_type === "bible_in_one_year_reflection_completed" || Boolean(row.action_label?.match(/ (Summary|Reflection):/));
      }
      return row.action_type === "bible_in_one_year_trivia_completed" || Boolean(row.action_label?.includes(" Trivia:"));
    };
    const bibleYearTaskBreakdown = {
      video: bibleYearActionsLast24h.filter((row) => isBibleYearCardAction(row, "Video")).length,
      summary: bibleYearActionsLast24h.filter((row) => isBibleYearCardAction(row, "Summary")).length,
      trivia: bibleYearActionsLast24h.filter((row) => isBibleYearCardAction(row, "Trivia")).length,
    };

    const freeUsers30d = uniqueCount(freeModeActions);
    const freeUsers7d = uniqueCount(freeModeActions.filter((row) => row.created_at && row.created_at >= since7d));
    const freeActionsToday = freeModeActions.filter((row) => row.created_at && row.created_at >= todayStart).length;

    const topBibleYearUsers = [...progressByUser.entries()]
      .map(([userId, rows]) => {
        const profile = profileByUser.get(userId);
        const tasks = rows.reduce((sum, row) => sum + (row.reading_completed ? 1 : 0) + (row.study_notes_completed ? 1 : 0) + (row.trivia_completed ? 1 : 0) + (row.reflection_completed ? 1 : 0), 0);
        const daysDone = rows.filter((row) => row.reading_completed && row.study_notes_completed && row.trivia_completed && row.reflection_completed).length;
        const latestDay = Math.max(...rows.map((row) => Number(row.day_number || 0)));
        const sortedUpdates = rows.map((row) => row.updated_at || "").sort();
        const lastUpdated = sortedUpdates[sortedUpdates.length - 1] || null;
        return {
          userId,
          name: profile?.display_name || profile?.username || "Unknown user",
          currentDay: latestDay,
          completedDays: daysDone,
          completedTasks: tasks,
          isPaid: profile?.is_paid === true,
          lastUpdated,
        };
      })
      .sort((a, b) => b.completedTasks - a.completedTasks || b.currentDay - a.currentDay)
      .slice(0, 8);

    const videoHelpfulnessByVideo = new Map<
      string,
      {
        videoId: string;
        title: string;
        context: string;
        url: string;
        yes: number;
        no: number;
        latestVoteAt: string | null;
      }
    >();

    for (const row of videoHelpfulnessRows) {
      if (!row.video_id) continue;
      const current =
        videoHelpfulnessByVideo.get(row.video_id) ||
        {
          videoId: row.video_id,
          title: row.video_title || row.video_id,
          context: row.video_context || "unknown",
          url: row.video_url || "",
          yes: 0,
          no: 0,
          latestVoteAt: null,
        };
      if (row.helpful === true) current.yes += 1;
      if (row.helpful === false) current.no += 1;
      if (row.updated_at && (!current.latestVoteAt || row.updated_at > current.latestVoteAt)) {
        current.latestVoteAt = row.updated_at;
      }
      videoHelpfulnessByVideo.set(row.video_id, current);
    }

    const videoHelpfulnessVideos = [...videoHelpfulnessByVideo.values()]
      .map((video) => {
        const total = video.yes + video.no;
        const yesRate = percent(video.yes, total);
        return {
          ...video,
          total,
          yesRate,
          verdict: total === 0 ? "No votes" : yesRate >= 70 ? "Good" : yesRate >= 50 ? "Mixed" : "Needs work",
        };
      })
      .sort((a, b) => b.total - a.total || b.yesRate - a.yesRate);

    const videoHelpfulnessTotals = videoHelpfulnessVideos.reduce(
      (totals, video) => ({
        yes: totals.yes + video.yes,
        no: totals.no + video.no,
        total: totals.total + video.total,
      }),
      { yes: 0, no: 0, total: 0 },
    );

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      overview: {
        signupsToday: uniqueSignupCount,
        activeUsers: uniqueCount(activeRows),
        upgradesToday: upgradeUserIds.size,
        totalUsers,
      },
      modes: {
        bibleInOneYear: {
          users: bibleYearUsers,
          activeUsers7d: activeBibleYearUsers7d,
          completedTasks: completedBibleYearTasks,
          completedDays: completedBibleYearDays,
          averageCurrentDay: bibleYearUsers ? Math.round((currentDayTotal / bibleYearUsers) * 10) / 10 : 0,
          completionRate: percent(completedBibleYearDays, Math.max(progressRows.length, 1)),
          taskBreakdownLast24h: bibleYearTaskBreakdown,
          dayDistribution: [...latestDayCounts.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([day, users]) => ({ day, users })),
          topUsers: topBibleYearUsers,
        },
        freeMode: {
          activeUsers7d: freeUsers7d,
          activeUsers30d: freeUsers30d,
          actionsToday: freeActionsToday,
          actions30d: freeModeActions.length,
          chaptersCompleted30d: freeModeActions.filter((row) => row.action_type === "chapter_completed" || row.action_type === "reading_plan_chapter_completed").length,
          notesOpened30d: freeModeActions.filter((row) => row.action_type === "chapter_notes_viewed").length,
        },
      },
      videoHelpfulness: {
        yes: videoHelpfulnessTotals.yes,
        no: videoHelpfulnessTotals.no,
        total: videoHelpfulnessTotals.total,
        yesRate: percent(videoHelpfulnessTotals.yes, videoHelpfulnessTotals.total),
        verdict:
          videoHelpfulnessTotals.total === 0
            ? "No votes"
            : percent(videoHelpfulnessTotals.yes, videoHelpfulnessTotals.total) >= 70
              ? "Good"
              : percent(videoHelpfulnessTotals.yes, videoHelpfulnessTotals.total) >= 50
                ? "Mixed"
                : "Needs work",
        videos: videoHelpfulnessVideos.slice(0, 12),
      },
      errors: {
        signups: signupsResult.error?.message || fallbackSignupsResult.error?.message || null,
        activeUsers: activeActionsResult.error?.message || activeProfilesResult.error?.message || null,
        upgrades: upgradesResult.error?.message || null,
        bibleYear: bibleYearProgressResult.error?.message || bibleYearActionsResult.error?.message || null,
        freeMode: freeModeActionsResult.error?.message || null,
        videoHelpfulness: videoHelpfulnessResult.error?.message || null,
      },
    });
  } catch (error) {
    console.error("[JOURNEY_ANALYTICS] error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load journey analytics." }, { status: 500 });
  }
}
