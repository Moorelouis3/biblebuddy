import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeCustomMemberBadge } from "@/lib/userBadges";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

type EditKind =
  | "article_comment"
  | "feed_post_comment"
  | "series_post_comment"
  | "series_reflection";

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
  const kind = body?.kind as EditKind;
  const commentId = typeof body?.commentId === "string" ? body.commentId : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";

  if (!kind || !commentId || !content) {
    return NextResponse.json({ error: "Missing comment details." }, { status: 400 });
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

  const isGlobalModerator = normalizeCustomMemberBadge(requesterProfile?.member_badge) === "moderator";
  const isAdmin = requester.email === ADMIN_EMAIL;

  if (kind === "article_comment") {
    const { data: target, error } = await supabaseAdmin
      .from("article_comments")
      .select("id, user_id")
      .eq("id", commentId)
      .maybeSingle();

    if (error || !target) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    if (!isAdmin && !isGlobalModerator && target.user_id !== requester.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("article_comments")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", commentId)
      .select("id, content, updated_at")
      .maybeSingle();

    if (updateError || !updated) {
      return NextResponse.json({ error: updateError?.message || "Could not update comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, comment: updated });
  }

  if (kind === "feed_post_comment") {
    const { data: target, error } = await supabaseAdmin
      .from("feed_post_comments")
      .select("id, user_id")
      .eq("id", commentId)
      .maybeSingle();

    if (error || !target) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    if (!isAdmin && !isGlobalModerator && target.user_id !== requester.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("feed_post_comments")
      .update({ content })
      .eq("id", commentId)
      .select("id, content, created_at")
      .single();

    if (updateError || !updated) {
      return NextResponse.json({ error: updateError?.message || "Could not save comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, comment: updated });
  }

  if (kind === "series_post_comment") {
    const { data: target, error } = await supabaseAdmin
      .from("group_series_post_comments")
      .select("id, user_id")
      .eq("id", commentId)
      .maybeSingle();

    if (error || !target) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    if (!isAdmin && !isGlobalModerator && target.user_id !== requester.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("group_series_post_comments")
      .update({ content })
      .eq("id", commentId)
      .select("id, content")
      .maybeSingle();

    if (updateError || !updated) {
      return NextResponse.json({ error: updateError?.message || "Could not update comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, comment: updated });
  }

  if (kind === "series_reflection") {
    const { data: target, error } = await supabaseAdmin
      .from("series_reflections")
      .select("id, user_id")
      .eq("id", commentId)
      .maybeSingle();

    if (error || !target) {
      return NextResponse.json({ error: "Reflection not found." }, { status: 404 });
    }

    if (!isAdmin && !isGlobalModerator && target.user_id !== requester.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("series_reflections")
      .update({ content })
      .eq("id", commentId)
      .select("id, content")
      .maybeSingle();

    if (updateError || !updated) {
      return NextResponse.json({ error: updateError?.message || "Could not update reflection." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, comment: updated });
  }

  return NextResponse.json({ error: "Unsupported comment type." }, { status: 400 });
}
