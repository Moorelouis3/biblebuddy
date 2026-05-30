import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeCustomMemberBadge } from "@/lib/userBadges";

const ADMIN_EMAIL = "moorelouis3@gmail.com";
const MANAGED_HOME_FEED_CATEGORIES = new Set([
  "weekly_trivia",
  "weekly_poll",
  "weekly_question",
  "update_monday",
  "who_was_this_friday",
  "bible_study_saturday",
  "prayer_request_sunday",
]);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params;
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

  const body = await request.json().catch(() => null);
  const postId = typeof body?.postId === "string" ? body.postId : "";
  const nextTitle = typeof body?.title === "string" ? body.title.trim() : null;
  const nextContent = typeof body?.content === "string" ? body.content.trim() : "";

  if (!groupId || !postId || !nextContent) {
    return NextResponse.json({ error: "Missing edit details." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const requester = userData.user;
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: requesterProfile } = await supabaseAdmin
    .from("profile_stats")
    .select("member_badge")
    .eq("user_id", requester.id)
    .maybeSingle();

  const isAdmin = requester.email === ADMIN_EMAIL;
  const isGlobalModerator = normalizeCustomMemberBadge(requesterProfile?.member_badge) === "moderator";

  const { data: targetPost, error: postError } = await supabaseAdmin
    .from("group_posts")
    .select("id, user_id, group_id, parent_post_id, media_url, link_url, category")
    .eq("id", postId)
    .eq("group_id", groupId)
    .maybeSingle();

  if (postError || !targetPost) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  const { data: membership } = await supabaseAdmin
    .from("group_members")
    .select("role")
    .eq("group_id", groupId)
    .eq("user_id", requester.id)
    .eq("status", "approved")
    .maybeSingle();

  const canModerateGroup = membership?.role === "leader" || membership?.role === "moderator";
  const isManagedHomeFeedPost = MANAGED_HOME_FEED_CATEGORIES.has(targetPost.category ?? "");

  if (isManagedHomeFeedPost && !isAdmin && !isGlobalModerator && !canModerateGroup) {
    return NextResponse.json({ error: "Only the group leader can edit this post." }, { status: 403 });
  }

  if (!isManagedHomeFeedPost && !isAdmin && !isGlobalModerator && !canModerateGroup && targetPost.user_id !== requester.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const updatePayload = targetPost.parent_post_id
    ? { content: nextContent }
    : { title: nextTitle || null, content: nextContent };

  const { data: updatedPost, error: updateError } = await supabaseAdmin
    .from("group_posts")
    .update(updatePayload)
    .eq("id", postId)
    .eq("group_id", groupId)
    .select("id, title, content, parent_post_id")
    .single();

  if (updateError || !updatedPost) {
    return NextResponse.json({ error: updateError?.message || "Could not save your edit." }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    post: updatedPost,
  });
}
