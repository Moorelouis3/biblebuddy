import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getBibleBuddyTvTitle } from "@/lib/bibleBuddyTvContent";
import { ACTION_TYPE } from "@/lib/actionTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
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
  const showSlug = typeof body?.showSlug === "string" ? body.showSlug.trim() : "";
  const episodeId = typeof body?.episodeId === "string" ? body.episodeId.trim() : "";
  const userMessage = typeof body?.message === "string" ? body.message.trim() : "";

  if (!showSlug || !episodeId) {
    return NextResponse.json({ error: "Missing share details." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const tvTitle = getBibleBuddyTvTitle(showSlug);
  const episode = tvTitle?.episodes.find((item) => item.id === episodeId) ?? null;

  if (!tvTitle || !episode) {
    return NextResponse.json({ error: "That Bible Buddy TV video could not be found." }, { status: 404 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: primaryGroup, error: primaryGroupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name")
    .eq("name", "Bible Buddy Study Group")
    .maybeSingle();

  if (primaryGroupError) {
    return NextResponse.json({ error: primaryGroupError.message || "Could not load the study group." }, { status: 500 });
  }

  let targetGroup = primaryGroup;
  if (!targetGroup) {
    const { data: fallbackGroup, error: fallbackGroupError } = await supabaseAdmin
      .from("study_groups")
      .select("id, name")
      .eq("name", "Hope Nation")
      .maybeSingle();

    if (fallbackGroupError) {
      return NextResponse.json({ error: fallbackGroupError.message || "Could not load the study group." }, { status: 500 });
    }

    targetGroup = fallbackGroup;
  }

  if (!targetGroup) {
    return NextResponse.json({ error: "Official study group not found." }, { status: 404 });
  }

  const [{ data: membership, error: membershipError }, { data: profile, error: profileError }] = await Promise.all([
    supabaseAdmin
      .from("group_members")
      .select("role")
      .eq("group_id", targetGroup.id)
      .eq("user_id", userData.user.id)
      .eq("status", "approved")
      .maybeSingle(),
    supabaseAdmin
      .from("profile_stats")
      .select("display_name, username")
      .eq("user_id", userData.user.id)
      .maybeSingle(),
  ]);

  if (membershipError) {
    return NextResponse.json({ error: membershipError.message || "Could not verify group membership." }, { status: 500 });
  }

  if (profileError) {
    return NextResponse.json({ error: profileError.message || "Could not load your profile." }, { status: 500 });
  }

  if (!membership) {
    return NextResponse.json({ error: "Join the study group first to share Bible Buddy TV videos." }, { status: 403 });
  }

  const displayName =
    profile?.display_name ||
    profile?.username ||
    userData.user.user_metadata?.firstName ||
    userData.user.user_metadata?.first_name ||
    (userData.user.email ? userData.user.email.split("@")[0] : null) ||
    "Buddy";

  const contentLabel =
    episode.contentLabel || (tvTitle.contentType === "movie" ? "Movie" : `Episode ${episode.episodeNumber}`);
  const shareTitle = `📺 ${tvTitle.title} — ${contentLabel}: ${episode.title}`;
  const shareContent = [userMessage, episode.summary || tvTitle.logline || ""].filter(Boolean).join("\n\n");
  const linkUrl = `/biblebuddy-tv/shows/${tvTitle.slug}?episode=${encodeURIComponent(episode.id)}`;
  const mediaUrl = episode.thumbnail || tvTitle.heroImage || tvTitle.poster || null;

  const { data: newPost, error: insertError } = await supabaseAdmin
    .from("group_posts")
    .insert({
      group_id: targetGroup.id,
      user_id: userData.user.id,
      display_name: displayName,
      title: shareTitle,
      category: "general",
      content: shareContent,
      media_url: mediaUrl,
      link_url: linkUrl,
    })
    .select("id, user_id, display_name, title, category, content, like_count, is_pinned, created_at, parent_post_id, media_url, link_url")
    .single();

  if (insertError || !newPost) {
    return NextResponse.json({ error: insertError?.message || "Could not share this video right now." }, { status: 500 });
  }

  void supabaseAdmin.from("master_actions").insert({
    user_id: userData.user.id,
    username: displayName,
    action_type: ACTION_TYPE.group_message_sent,
    action_label: `Shared Bible Buddy TV: ${tvTitle.title} • ${episode.title}`,
  }).then(({ error }) => {
    if (error) {
      console.error("[TV_SHARE] Failed to record master action", error);
    }
  });

  return NextResponse.json({
    ok: true,
    post: {
      ...newPost,
      comment_count: 0,
      role: membership.role || "member",
      liked: false,
    },
    groupId: targetGroup.id,
  });
}
