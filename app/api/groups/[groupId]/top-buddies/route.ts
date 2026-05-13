import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getLiveStreakMapForUsers } from "@/lib/serverStreaks";
import { ACTION_POINT_WEIGHTS } from "@/lib/levelSystem";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";
const PAGE_SIZE = 1000;

type GroupMemberRow = {
  user_id: string | null;
  status: string | null;
};

type ProfileRow = {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  member_badge: string | null;
  is_paid: boolean | null;
  current_streak: number | null;
  current_level: number | null;
};

type ActionRow = {
  user_id: string | null;
  action_type: string | null;
  action_label: string | null;
  created_at: string | null;
};

type GroupPostRow = {
  id: string;
  user_id: string | null;
  created_at: string | null;
  parent_post_id: string | null;
};

type GroupLikeRow = {
  user_id: string | null;
  created_at: string | null;
};

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

function getManualBonusPoints(actionLabel: string | null) {
  const match = actionLabel?.match(/^admin_bonus_points:(\d+):/);
  return match ? Number(match[1]) || 0 : 0;
}

function getActionPoints(action: ActionRow) {
  if (!action.action_type) return 0;
  if (action.action_type === "scrambled_word_answered" && action.action_label?.includes("[no-point]")) return 0;
  return (ACTION_POINT_WEIGHTS[action.action_type as keyof typeof ACTION_POINT_WEIGHTS] ?? 0) + getManualBonusPoints(action.action_label);
}

function getWindowStart(scope: "week" | "allTime") {
  if (scope === "allTime") return null;
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
}

function buildLeaderboard(options: {
  memberIds: string[];
  profiles: ProfileRow[];
  actions: ActionRow[];
  groupPosts: GroupPostRow[];
  groupLikes: GroupLikeRow[];
  louisId: string | null;
  scope: "week" | "allTime";
  liveStreakMap: Map<string, number>;
}) {
  const sinceIso = getWindowStart(options.scope);
  const memberSet = new Set(options.memberIds);
  const stats = new Map<string, { points: number; appXp: number; posts: number; comments: number; likes: number; actions: number }>();

  function ensure(userId: string) {
    let current = stats.get(userId);
    if (!current) {
      current = { points: 0, appXp: 0, posts: 0, comments: 0, likes: 0, actions: 0 };
      stats.set(userId, current);
    }
    return current;
  }

  options.memberIds.forEach((userId) => ensure(userId));

  options.actions.forEach((action) => {
    if (!action.user_id || !memberSet.has(action.user_id)) return;
    if (sinceIso && (!action.created_at || action.created_at < sinceIso)) return;
    if (action.action_type === "study_group_feed_viewed" && action.action_label?.startsWith("top_buddies_")) return;
    const current = ensure(action.user_id);
    const points = getActionPoints(action);
    current.points += points;
    current.appXp += points;
    current.actions += 1;
  });

  options.groupPosts.forEach((post) => {
    if (!post.user_id || !memberSet.has(post.user_id)) return;
    if (sinceIso && (!post.created_at || post.created_at < sinceIso)) return;
    const current = ensure(post.user_id);
    if (post.parent_post_id) {
      current.comments += 1;
      current.points += 3;
    } else {
      current.posts += 1;
      current.points += 5;
    }
  });

  options.groupLikes.forEach((like) => {
    if (!like.user_id || !memberSet.has(like.user_id)) return;
    if (sinceIso && (!like.created_at || like.created_at < sinceIso)) return;
    const current = ensure(like.user_id);
    current.likes += 1;
    current.points += 1;
  });

  const profileMap = new Map(options.profiles.map((profile) => [profile.user_id, profile]));

  return Array.from(stats.entries())
    .filter(([userId]) => userId !== options.louisId)
    .map(([userId, entry]) => {
      const profile = profileMap.get(userId);
      return {
        userId,
        displayName: profile?.display_name || profile?.username || "Buddy",
        profileImageUrl: profile?.profile_image_url ?? null,
        memberBadge: profile?.member_badge ?? null,
        isPaid: !!profile?.is_paid,
        currentStreak: options.liveStreakMap.get(userId) ?? profile?.current_streak ?? null,
        currentLevel: profile?.current_level ?? null,
        posts: entry.posts,
        comments: entry.comments,
        likes: entry.likes,
        appXp: entry.appXp,
        actions: entry.actions,
        score: Math.max(0, Math.round(entry.points)),
      };
    })
    .filter((buddy) => buddy.score > 0 || buddy.posts > 0 || buddy.comments > 0 || buddy.likes > 0)
    .sort((a, b) => b.score - a.score || b.appXp - a.appXp || b.posts - a.posts || b.comments - a.comments || b.likes - a.likes)
    .slice(0, 10)
    .map((buddy, index) => ({ ...buddy, rank: index + 1 }));
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
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: louisUser } = await supabaseAdmin.auth.admin.listUsers();
  const louisId =
    louisUser?.users?.find((user) => (user.email || "").toLowerCase() === ADMIN_EMAIL)?.id || null;

  const { data: membership } = await supabaseAdmin
    .from("group_members")
    .select("user_id")
    .eq("group_id", groupId)
    .eq("user_id", userData.user.id)
    .eq("status", "approved")
    .maybeSingle();

  if (!membership) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  try {
    const memberRows = await fetchPaged<GroupMemberRow>((from, to) =>
      supabaseAdmin
        .from("group_members")
        .select("user_id, status")
        .eq("group_id", groupId)
        .eq("status", "approved")
        .range(from, to),
    );

    const memberIds = Array.from(new Set(memberRows.map((row) => row.user_id).filter((id): id is string => Boolean(id))));
    if (!memberIds.length) {
      return NextResponse.json({
        buddies: [],
        weeklyBuddies: [],
        allTimeBuddies: [],
        engagement: { totalClicks: 0, uniqueClickers: 0 },
      });
    }

    const [profilesResult, actions, postRows] = await Promise.all([
      supabaseAdmin
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url, member_badge, is_paid, current_streak, current_level")
        .in("user_id", memberIds),
      fetchPaged<ActionRow>((from, to) => {
        const query = supabaseAdmin
          .from("master_actions")
          .select("user_id, action_type, action_label, created_at")
          .in("user_id", memberIds)
          .order("created_at", { ascending: false })
          .range(from, to);
        return query;
      }),
      fetchPaged<GroupPostRow>((from, to) => {
        const query = supabaseAdmin
          .from("group_posts")
          .select("id, user_id, created_at, parent_post_id")
          .eq("group_id", groupId)
          .range(from, to);
        return query;
      }),
    ]);

    if (profilesResult.error) throw profilesResult.error;

    const groupPostIds = postRows.map((row) => row.id);
    const likeRows = groupPostIds.length
        ? await fetchPaged<GroupLikeRow>((from, to) => {
          const query = supabaseAdmin
            .from("group_post_likes")
            .select("user_id, created_at")
            .in("post_id", groupPostIds)
            .range(from, to);
          return query;
        })
      : [];

    const liveStreakMap = await getLiveStreakMapForUsers(supabaseAdmin, memberIds);
    const profiles = (profilesResult.data || []) as ProfileRow[];
    const weeklyBuddies = buildLeaderboard({
      memberIds,
      profiles,
      actions,
      groupPosts: postRows,
      groupLikes: likeRows,
      louisId,
      scope: "week",
      liveStreakMap,
    });
    const allTimeBuddies = buildLeaderboard({
      memberIds,
      profiles,
      actions,
      groupPosts: postRows,
      groupLikes: likeRows,
      louisId,
      scope: "allTime",
      liveStreakMap,
    });

    const clickLabelPrefix = `top_buddies_card_opened:${groupId}`;
    const { data: clickRows, error: clickError } = await supabaseAdmin
      .from("master_actions")
      .select("user_id, created_at, username")
      .eq("action_type", "study_group_feed_viewed")
      .like("action_label", `${clickLabelPrefix}%`)
      .order("created_at", { ascending: false })
      .limit(200);

    if (clickError) throw clickError;

    const uniqueClickers = new Set((clickRows || []).map((row) => row.user_id).filter(Boolean));

    return NextResponse.json({
      buddies: weeklyBuddies,
      weeklyBuddies,
      allTimeBuddies,
      engagement: {
        totalClicks: clickRows?.length || 0,
        uniqueClickers: uniqueClickers.size,
      },
      scoring: {
        appXp: "Bible Buddy level XP earned from tracked actions",
        groupPost: 5,
        groupComment: 3,
        groupLike: 1,
        periodDays: 7,
      },
    });
  } catch (error: any) {
    console.error("[GROUP_TOP_BUDDIES] Could not load leaderboard:", error);
    return NextResponse.json({ error: error?.message || "Could not load top buddies." }, { status: 500 });
  }
}
