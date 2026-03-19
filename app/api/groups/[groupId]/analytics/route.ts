import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildGroupSchedule } from "@/lib/groupSchedule";
import type { BibleStudySeriesSnapshot } from "@/lib/groupRecurringSeries";

const ADMIN_EMAIL = "moorelouis3@gmail.com";
const BERLIN_TIME_ZONE = "Europe/Berlin";

function resolveSeriesStart(schedule: { start_at?: string | null; start_date?: string | null } | null | undefined) {
  if (!schedule) return null;
  if (schedule.start_at) return schedule.start_at;
  if (schedule.start_date) return `${schedule.start_date}T00:00:00`;
  return null;
}

function getBerlinDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BERLIN_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(date)
    .filter((part) => part.type !== "literal");

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value])) as Record<string, string>;
  return `${values.year}-${values.month}-${values.day}`;
}

function formatBerlinDayLabel(dateKey: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BERLIN_TIME_ZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${dateKey}T12:00:00Z`));
}

function buildDailySeries(
  rows: Array<{ created_at: string | null; user_id?: string | null }>,
) {
  const dailyMap = new Map<string, { total: number; users: Set<string> }>();

  rows.forEach((row) => {
    if (!row.created_at) return;
    const dateKey = getBerlinDateKey(new Date(row.created_at));
    const existing = dailyMap.get(dateKey) || { total: 0, users: new Set<string>() };
    existing.total += 1;
    if (row.user_id) existing.users.add(row.user_id);
    dailyMap.set(dateKey, existing);
  });

  return Array.from(dailyMap.entries())
    .map(([dateKey, value]) => ({
      dateKey,
      label: formatBerlinDayLabel(dateKey),
      total: value.total,
      uniqueVisitors: value.users.size,
    }))
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey));
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { groupId } = await context.params;

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);

  if (userError || !userData.user || userData.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: louisUser } = await supabaseAdmin.auth.admin.listUsers();
  const louisId =
    louisUser?.users?.find((user) => (user.email || "").toLowerCase() === ADMIN_EMAIL)?.id || null;

  const { data: group, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name, cover_emoji")
    .eq("id", groupId)
    .maybeSingle();

  if (groupError || !group) {
    return NextResponse.json({ error: "Study group not found." }, { status: 404 });
  }

  const now = new Date();
  const twentyFourHoursAgoIso = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgoIso = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const ninetyDaysAgoIso = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();

  const [
    feedViewActions,
    articleReadActions,
    bibleStudyCardOpenActions,
    groupPostIdsResult,
    postCountResult,
    commentCountResult,
    weeklyTriviaResult,
    weeklyPollResult,
    weeklyQuestionResult,
    currentSeriesResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("master_actions")
      .select("user_id, created_at")
      .eq("action_type", "study_group_feed_viewed")
      .eq("action_label", groupId),
    supabaseAdmin
      .from("master_actions")
      .select("user_id, created_at")
      .eq("action_type", "study_group_article_opened")
      .like("action_label", `${groupId}:%`),
    supabaseAdmin
      .from("master_actions")
      .select("user_id, created_at")
      .eq("action_type", "study_group_bible_study_card_opened")
      .eq("action_label", groupId)
      .gte("created_at", ninetyDaysAgoIso),
    supabaseAdmin
      .from("group_posts")
      .select("id")
      .eq("group_id", groupId),
    supabaseAdmin
      .from("group_posts")
      .select("id", { count: "exact", head: true })
      .eq("group_id", groupId)
      .is("parent_post_id", null),
    supabaseAdmin
      .from("group_posts")
      .select("id", { count: "exact", head: true })
      .eq("group_id", groupId)
      .not("parent_post_id", "is", null),
    supabaseAdmin
      .from("weekly_group_trivia_sets")
      .select("week_key, subject_title, created_at")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabaseAdmin
      .from("weekly_group_polls")
      .select("week_key, subject_title, question, created_at")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabaseAdmin
      .from("weekly_group_questions")
      .select("week_key, subject_title, prompt, created_at")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabaseAdmin
      .from("group_series")
      .select("id, title, total_weeks")
      .eq("group_id", groupId)
      .eq("is_current", true)
      .maybeSingle(),
  ]);

  let bibleStudySeriesSnapshot: BibleStudySeriesSnapshot | null = null;

  if (currentSeriesResult.data) {
    const { data: schedule } = await supabaseAdmin
      .from("series_schedules")
      .select("start_at, start_date")
      .eq("series_id", currentSeriesResult.data.id)
      .maybeSingle();

    bibleStudySeriesSnapshot = {
      groupId,
      seriesTitle: currentSeriesResult.data.title || "Bible Study Series",
      seriesStartAt: resolveSeriesStart(schedule),
      totalWeeks: currentSeriesResult.data.total_weeks ?? null,
    };
  }

  const uniqueFeedVisitors = new Set((feedViewActions.data || []).map((row) => row.user_id).filter(Boolean)).size;
  const uniqueArticleReaders = new Set((articleReadActions.data || []).map((row) => row.user_id).filter(Boolean)).size;
  const recentBibleStudyCardActions = (bibleStudyCardOpenActions.data || []).filter(
    (row) => new Date(row.created_at).getTime() >= new Date(twentyFourHoursAgoIso).getTime(),
  );
  const uniqueBibleStudyCardVisitors24h = new Set(recentBibleStudyCardActions.map((row) => row.user_id).filter(Boolean)).size;
  const groupPostIds = (groupPostIdsResult.data || []).map((row) => row.id);
  let likeCount = 0;
  let postRowsDetailed: Array<{ id: string; user_id: string | null; created_at: string | null; parent_post_id: string | null }> = [];
  let likeRowsDetailed: Array<{ user_id: string | null; created_at: string | null }> = [];

  if (groupPostIds.length > 0) {
    const [{ count }, detailedPostsResult, detailedLikesResult] = await Promise.all([
      supabaseAdmin
        .from("group_post_likes")
        .select("post_id", { count: "exact", head: true })
        .in("post_id", groupPostIds),
      supabaseAdmin
        .from("group_posts")
        .select("id, user_id, created_at, parent_post_id")
        .eq("group_id", groupId)
        .gte("created_at", ninetyDaysAgoIso),
      supabaseAdmin
        .from("group_post_likes")
        .select("user_id, created_at")
        .in("post_id", groupPostIds)
        .gte("created_at", ninetyDaysAgoIso),
    ]);
    likeCount = count || 0;
    postRowsDetailed = detailedPostsResult.data || [];
    likeRowsDetailed = detailedLikesResult.data || [];
  }

  const topLevelPostsDaily = buildDailySeries(postRowsDetailed.filter((row) => !row.parent_post_id));
  const commentsDaily = buildDailySeries(postRowsDetailed.filter((row) => !!row.parent_post_id));
  const likesDaily = buildDailySeries(likeRowsDetailed);
  const articleReadsDaily = buildDailySeries(articleReadActions.data || []);
  const bibleStudyCardDaily = buildDailySeries(bibleStudyCardOpenActions.data || []).map((entry) => ({
    dateKey: entry.dateKey,
    label: entry.label,
    totalClicks: entry.total,
    uniqueVisitors: entry.uniqueVisitors,
  }));

  const activeBuddyScoreMap = new Map<string, { posts: number; comments: number; likes: number }>();

  postRowsDetailed
    .filter((row) => row.user_id && row.created_at && new Date(row.created_at).getTime() >= new Date(thirtyDaysAgoIso).getTime())
    .forEach((row) => {
      const key = row.user_id as string;
      const existing = activeBuddyScoreMap.get(key) || { posts: 0, comments: 0, likes: 0 };
      if (row.parent_post_id) {
        existing.comments += 1;
      } else {
        existing.posts += 1;
      }
      activeBuddyScoreMap.set(key, existing);
    });

  likeRowsDetailed
    .filter((row) => row.user_id && row.created_at && new Date(row.created_at).getTime() >= new Date(thirtyDaysAgoIso).getTime())
    .forEach((row) => {
      const key = row.user_id as string;
      const existing = activeBuddyScoreMap.get(key) || { posts: 0, comments: 0, likes: 0 };
      existing.likes += 1;
      activeBuddyScoreMap.set(key, existing);
    });

  const topBuddyIds = Array.from(activeBuddyScoreMap.entries())
    .filter(([userId]) => userId !== louisId)
    .map(([userId, counts]) => ({
      userId,
      posts: counts.posts,
      comments: counts.comments,
      likes: counts.likes,
      score: counts.posts * 5 + counts.comments * 3 + counts.likes,
    }))
    .sort((a, b) => b.score - a.score || b.posts - a.posts || b.comments - a.comments || b.likes - a.likes)
    .slice(0, 10);

  const { data: topBuddyProfiles } = topBuddyIds.length
    ? await supabaseAdmin
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url, member_badge, is_paid")
        .in("user_id", topBuddyIds.map((entry) => entry.userId))
    : { data: [] as Array<any> };

  const mostActiveBuddies = topBuddyIds.map((entry, index) => {
    const profile = (topBuddyProfiles || []).find((row) => row.user_id === entry.userId);
    return {
      rank: index + 1,
      userId: entry.userId,
      displayName: profile?.display_name || profile?.username || "Buddy",
      profileImageUrl: profile?.profile_image_url ?? null,
      memberBadge: profile?.member_badge ?? null,
      isPaid: !!profile?.is_paid,
      posts: entry.posts,
      comments: entry.comments,
      likes: entry.likes,
      score: entry.score,
    };
  });

  return NextResponse.json({
    group: {
      id: group.id,
      name: group.name,
      coverEmoji: group.cover_emoji || "🤝",
    },
    metrics: {
      uniqueFeedVisitors,
      totalFeedVisits: feedViewActions.data?.length || 0,
      bibleStudyCardClicks24h: recentBibleStudyCardActions.length,
      uniqueBibleStudyCardVisitors24h,
      posts: postCountResult.count || 0,
      comments: commentCountResult.count || 0,
      likes: likeCount,
      articleReads: articleReadActions.data?.length || 0,
      uniqueArticleReaders,
    },
    latestDrops: {
      weeklyTrivia: weeklyTriviaResult.data || null,
      opinionWednesday: weeklyPollResult.data || null,
      truthThursday: weeklyQuestionResult.data || null,
    },
    charts: {
      bibleStudyCardDaily,
      postsDaily: topLevelPostsDaily,
      commentsDaily,
      likesDaily,
      articleReadsDaily,
    },
    mostActiveBuddies,
    schedule: buildGroupSchedule(new Date(), {
      bibleStudySeriesSnapshot,
    }),
  });
}
