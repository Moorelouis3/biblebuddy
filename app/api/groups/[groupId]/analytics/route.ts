import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildGroupSchedule } from "@/lib/groupSchedule";

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

  if (userError || !userData.user || userData.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: group, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name, cover_emoji")
    .eq("id", groupId)
    .maybeSingle();

  if (groupError || !group) {
    return NextResponse.json({ error: "Study group not found." }, { status: 404 });
  }

  const [
    feedViewActions,
    articleReadActions,
    groupPostIdsResult,
    postCountResult,
    commentCountResult,
    weeklyTriviaResult,
    weeklyQuestionResult,
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
      .from("weekly_group_questions")
      .select("week_key, subject_title, prompt, created_at")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const uniqueFeedVisitors = new Set((feedViewActions.data || []).map((row) => row.user_id).filter(Boolean)).size;
  const uniqueArticleReaders = new Set((articleReadActions.data || []).map((row) => row.user_id).filter(Boolean)).size;
  const groupPostIds = (groupPostIdsResult.data || []).map((row) => row.id);
  let likeCount = 0;

  if (groupPostIds.length > 0) {
    const { count } = await supabaseAdmin
      .from("group_post_likes")
      .select("post_id", { count: "exact", head: true })
      .in("post_id", groupPostIds);
    likeCount = count || 0;
  }

  return NextResponse.json({
    group: {
      id: group.id,
      name: group.name,
      coverEmoji: group.cover_emoji || "🤝",
    },
    metrics: {
      uniqueFeedVisitors,
      totalFeedVisits: feedViewActions.data?.length || 0,
      posts: postCountResult.count || 0,
      comments: commentCountResult.count || 0,
      likes: likeCount,
      articleReads: articleReadActions.data?.length || 0,
      uniqueArticleReaders,
    },
    latestDrops: {
      weeklyTrivia: weeklyTriviaResult.data || null,
      truthThursday: weeklyQuestionResult.data || null,
    },
    schedule: buildGroupSchedule(),
  });
}
