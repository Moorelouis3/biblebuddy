import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ACTION_POINT_WEIGHTS, getLevelInfoFromPoints } from "@/lib/levelSystem";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DAY_MS = 24 * 60 * 60 * 1000;
const TOP_BUDDIES_WINDOW_DAYS = 30;
const FRIEND_ACTIVITY_WINDOW_DAYS = 45;
const PAGE_SIZE = 1000;

type ProfileRow = {
  user_id: string;
  username: string | null;
  display_name: string | null;
  profile_image_url: string | null;
  current_level: number | null;
  current_streak: number | null;
  is_paid: boolean | null;
  member_badge: string | null;
};

type ActionRow = {
  user_id: string | null;
  action_type: string | null;
  action_label: string | null;
  created_at: string | null;
};

type BuddyRow = {
  user_id_1: string | null;
  user_id_2: string | null;
};

const TASK_SCORE: Record<string, number> = {
  devotional_day_started: 1,
  devotional_day_viewed: 1,
  devotional_bible_reading_opened: 1,
  chapter_notes_viewed: 1,
  chapter_notes_reviewed: 1,
  trivia_started: 1,
  trivia_chapter_completed: 1,
  scrambled_chapter_opened: 1,
  scrambled_chapter_completed: 1,
  devotional_reflection_saved: 1,
  devotional_day_completed: 6,
  chapter_completed: 6,
  reading_plan_chapter_completed: 6,
  louis_daily_task_bonus: 6,
};

const TOP_BUDDY_TASK_ACTIONS = Object.keys(TASK_SCORE);

async function fetchPaged<T>(
  queryBuilder: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: any }>,
) {
  const rows: T[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await queryBuilder(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    const chunk = data || [];
    rows.push(...chunk);
    if (chunk.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return rows;
}

function displayName(profile?: ProfileRow | null) {
  return profile?.display_name || profile?.username || "Bible Buddy";
}

function formatActivity(action: ActionRow) {
  const label = (action.action_label || "").replace(/\s+Review Opened$/i, "").trim();
  switch (action.action_type) {
    case "chapter_completed":
    case "reading_plan_chapter_completed":
      return label ? `finished ${label}` : "finished a Bible chapter";
    case "chapter_notes_reviewed":
      return label ? `reviewed notes for ${label}` : "reviewed chapter notes";
    case "trivia_chapter_completed":
      return label ? `finished trivia for ${label}` : "finished chapter trivia";
    case "scrambled_chapter_completed":
      return label ? `finished Scrambled for ${label}` : "finished a Scrambled round";
    case "devotional_reflection_saved":
      return label ? `shared a reflection for ${label}` : "shared a reflection";
    case "louis_daily_task_bonus":
      return "completed all 6 Bible tasks";
    case "bible_buddy_tv_video_started":
      return label ? `watched ${label}` : "watched Bible Buddy TV";
    case "feed_post_commented":
    case "feed_post_replied":
      return "joined a community conversation";
    case "feed_post_thought":
    case "feed_post_prayer":
    case "feed_post_prayer_request":
      return "shared with the community";
    default:
      return label || "made progress in Bible Buddy";
  }
}

export async function GET(request: NextRequest) {
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

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const topSinceIso = new Date(Date.now() - TOP_BUDDIES_WINDOW_DAYS * DAY_MS).toISOString();
  const friendSinceIso = new Date(Date.now() - FRIEND_ACTIVITY_WINDOW_DAYS * DAY_MS).toISOString();

  try {
    const [profiles, actions, buddyRows] = await Promise.all([
      fetchPaged<ProfileRow>((from, to) =>
        supabaseAdmin
          .from("profile_stats")
          .select("user_id, username, display_name, profile_image_url, current_level, current_streak, is_paid, member_badge")
          .range(from, to),
      ),
      fetchPaged<ActionRow>((from, to) =>
        supabaseAdmin
          .from("master_actions")
          .select("user_id, action_type, action_label, created_at")
          .in("action_type", TOP_BUDDY_TASK_ACTIONS)
          .gte("created_at", topSinceIso)
          .order("created_at", { ascending: false })
          .range(from, to),
      ),
      supabaseAdmin
        .from("buddies")
        .select("user_id_1, user_id_2")
        .or(`user_id_1.eq.${userData.user.id},user_id_2.eq.${userData.user.id}`),
    ]);

    const profileMap = new Map(profiles.map((profile) => [profile.user_id, profile]));
    const scoreMap = new Map<string, { score: number; taskCount: number; weightedXp: number; lastActionAt: string | null }>();

    actions.forEach((action) => {
      if (!action.user_id || !action.action_type) return;
      const current = scoreMap.get(action.user_id) || { score: 0, taskCount: 0, weightedXp: 0, lastActionAt: null };
      const taskScore = TASK_SCORE[action.action_type] || 0;
      if (taskScore <= 0) return;
      current.score += taskScore;
      current.weightedXp += ACTION_POINT_WEIGHTS[action.action_type as keyof typeof ACTION_POINT_WEIGHTS] ?? 0;
      current.taskCount += taskScore;
      if (!current.lastActionAt || (action.created_at && action.created_at > current.lastActionAt)) current.lastActionAt = action.created_at;
      scoreMap.set(action.user_id, current);
    });

    const topBuddies = Array.from(scoreMap.entries())
      .map(([userId, scoreData]) => {
        const profile = profileMap.get(userId);
        const fallbackLevel = getLevelInfoFromPoints(scoreData.weightedXp).level;
        return {
          userId,
          displayName: displayName(profile),
          username: profile?.username || null,
          profileImageUrl: profile?.profile_image_url || null,
          currentLevel: Math.max(1, profile?.current_level || fallbackLevel),
          currentStreak: profile?.current_streak || 0,
          memberBadge: profile?.member_badge || null,
          isPaid: profile?.is_paid === true,
          score: Math.round(scoreData.score),
          taskCount: scoreData.taskCount,
          communityCount: 0,
          lastActionAt: scoreData.lastActionAt,
        };
      })
      .filter((buddy) => buddy.score > 0)
      .sort((a, b) => b.score - a.score || b.taskCount - a.taskCount || b.currentLevel - a.currentLevel)
      .slice(0, 10)
      .map((buddy, index) => ({ ...buddy, rank: index + 1 }));

    const buddyIds = new Set(
      ((buddyRows.data || []) as BuddyRow[])
        .map((row) => (row.user_id_1 === userData.user.id ? row.user_id_2 : row.user_id_1))
        .filter((id): id is string => typeof id === "string" && id.length > 0),
    );

    const friendTimeline = actions
      .filter((action) => !!action.user_id && buddyIds.has(action.user_id) && !!action.created_at && action.created_at >= friendSinceIso)
      .slice(0, 30)
      .map((action) => {
        const profile = profileMap.get(action.user_id!);
        return {
          id: `${action.user_id}:${action.action_type}:${action.created_at}`,
          userId: action.user_id,
          displayName: displayName(profile),
          profileImageUrl: profile?.profile_image_url || null,
          actionText: formatActivity(action),
          createdAt: action.created_at,
          actionType: action.action_type,
        };
      });

    return NextResponse.json({
      topBuddies,
      friendTimeline,
      meta: {
        topWindowDays: TOP_BUDDIES_WINDOW_DAYS,
        friendWindowDays: FRIEND_ACTIVITY_WINDOW_DAYS,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("[BUDDIES_DASHBOARD] Could not load dashboard:", error);
    return NextResponse.json({ error: error?.message || "Could not load Buddies." }, { status: 500 });
  }
}
