import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

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

  const thirtyDaysAgoIso = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { data: postRows, error: postError } = await supabaseAdmin
    .from("group_posts")
    .select("id, user_id, created_at, parent_post_id")
    .eq("group_id", groupId)
    .gte("created_at", thirtyDaysAgoIso);

  if (postError) {
    return NextResponse.json({ error: postError.message || "Could not load group posts." }, { status: 500 });
  }

  const groupPostIds = (postRows || []).map((row) => row.id);
  const { data: likeRows, error: likeError } = groupPostIds.length
    ? await supabaseAdmin
        .from("group_post_likes")
        .select("user_id, created_at")
        .in("post_id", groupPostIds)
        .gte("created_at", thirtyDaysAgoIso)
    : { data: [], error: null };

  if (likeError) {
    return NextResponse.json({ error: likeError.message || "Could not load group likes." }, { status: 500 });
  }

  const scoreMap = new Map<string, { posts: number; comments: number; likes: number }>();

  (postRows || []).forEach((row) => {
    if (!row.user_id) return;
    const existing = scoreMap.get(row.user_id) || { posts: 0, comments: 0, likes: 0 };
    if (row.parent_post_id) {
      existing.comments += 1;
    } else {
      existing.posts += 1;
    }
    scoreMap.set(row.user_id, existing);
  });

  (likeRows || []).forEach((row) => {
    if (!row.user_id) return;
    const existing = scoreMap.get(row.user_id) || { posts: 0, comments: 0, likes: 0 };
    existing.likes += 1;
    scoreMap.set(row.user_id, existing);
  });

  const ranked = Array.from(scoreMap.entries())
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

  const { data: profiles } = ranked.length
    ? await supabaseAdmin
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url, member_badge, is_paid, current_streak, current_level")
        .in("user_id", ranked.map((entry) => entry.userId))
    : { data: [] as Array<any> };

  const buddies = ranked.map((entry, index) => {
    const profile = (profiles || []).find((row) => row.user_id === entry.userId);
    return {
      rank: index + 1,
      userId: entry.userId,
      displayName: profile?.display_name || profile?.username || "Buddy",
      profileImageUrl: profile?.profile_image_url ?? null,
      memberBadge: profile?.member_badge ?? null,
      isPaid: !!profile?.is_paid,
      currentStreak: profile?.current_streak ?? null,
      currentLevel: profile?.current_level ?? null,
      posts: entry.posts,
      comments: entry.comments,
      likes: entry.likes,
      score: entry.score,
    };
  });

  return NextResponse.json({
    buddies,
    scoring: {
      postsWeight: 5,
      commentsWeight: 3,
      likesWeight: 1,
      periodDays: 30,
    },
  });
}
