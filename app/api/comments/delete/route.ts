import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeCustomMemberBadge } from "@/lib/userBadges";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

type DeleteKind =
  | "article_comment"
  | "feed_post_comment"
  | "group_feed_comment"
  | "series_post_comment"
  | "series_reflection";

type DeletionLogInput = {
  kind: DeleteKind;
  commentId: string;
  content?: string | null;
  authorUserId?: string | null;
  authorName?: string | null;
  sourceLabel?: string | null;
  contextTitle?: string | null;
  deletedIds: string[];
};

async function logModeratorDeletion(
  supabaseAdmin: any,
  input: DeletionLogInput,
  moderator: { id: string; name: string },
) {
  const { error } = await (supabaseAdmin as any).from("moderator_deleted_comments").insert({
    comment_id: input.commentId,
    comment_kind: input.kind,
    source_label: input.sourceLabel ?? null,
    context_title: input.contextTitle ?? null,
    content: input.content ?? null,
    author_user_id: input.authorUserId ?? null,
    author_name: input.authorName ?? null,
    deleted_by: moderator.id,
    deleted_by_name: moderator.name,
    deleted_ids: input.deletedIds,
  });
  if (error) {
    console.warn("[COMMENTS_DELETE] Could not log moderator deletion:", error.message);
  }
}

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
  const kind = body?.kind as DeleteKind;
  const commentId = typeof body?.commentId === "string" ? body.commentId : "";

  if (!kind || !commentId) {
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
  const moderatorName =
    typeof requester.user_metadata?.display_name === "string"
      ? requester.user_metadata.display_name
      : typeof requester.user_metadata?.name === "string"
        ? requester.user_metadata.name
        : requester.email || "Moderator";

  if (kind === "article_comment") {
    const { data: target, error } = await supabaseAdmin
      .from("article_comments")
      .select("id, article_slug, user_id, user_name, content")
      .eq("id", commentId)
      .maybeSingle();

    if (error || !target) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    if (!isAdmin && !isGlobalModerator && target.user_id !== requester.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { data: replies } = await supabaseAdmin
      .from("article_comments")
      .select("id")
      .eq("parent_id", commentId);

    const deletedIds = [commentId, ...(replies || []).map((row) => row.id)];
    if (isAdmin || isGlobalModerator) {
      await logModeratorDeletion(
        supabaseAdmin,
        {
          kind,
          commentId,
          content: target.content,
          authorUserId: target.user_id,
          authorName: target.user_name,
          sourceLabel: target.article_slug,
          contextTitle: target.article_slug,
          deletedIds,
        },
        { id: requester.id, name: moderatorName },
      );
    }
    const { error: deleteError } = await supabaseAdmin
      .from("article_comments")
      .delete()
      .in("id", deletedIds);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message || "Could not delete comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, deletedIds });
  }

  if (kind === "feed_post_comment") {
    const { data: target, error } = await supabaseAdmin
      .from("feed_post_comments")
      .select("id, user_id, post_id, content")
      .eq("id", commentId)
      .maybeSingle();

    if (error || !target) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    if (!isAdmin && !isGlobalModerator && target.user_id !== requester.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { data: replies } = await supabaseAdmin
      .from("feed_post_comments")
      .select("id")
      .eq("parent_comment_id", commentId);

    const deletedIds = [commentId, ...(replies || []).map((row) => row.id)];
    if (isAdmin || isGlobalModerator) {
      await logModeratorDeletion(
        supabaseAdmin,
        {
          kind,
          commentId,
          content: target.content,
          authorUserId: target.user_id,
          sourceLabel: "Bible Buddy Feed",
          contextTitle: `Feed post ${target.post_id}`,
          deletedIds,
        },
        { id: requester.id, name: moderatorName },
      );
    }
    const { error: deleteError } = await supabaseAdmin
      .from("feed_post_comments")
      .delete()
      .in("id", deletedIds);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message || "Could not delete comment." }, { status: 500 });
    }

    const { count } = await supabaseAdmin
      .from("feed_post_comments")
      .select("id", { count: "exact", head: true })
      .eq("post_id", target.post_id);

    await supabaseAdmin
      .from("feed_posts")
      .update({ comment_count: count ?? 0 })
      .eq("id", target.post_id);

    return NextResponse.json({ ok: true, deletedIds, nextCommentCount: count ?? 0 });
  }

  if (kind === "group_feed_comment") {
    const { data: target, error } = await supabaseAdmin
      .from("group_posts")
      .select("id, user_id, group_id, parent_post_id, display_name, category, title, content")
      .eq("id", commentId)
      .maybeSingle();

    if (error || !target) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    if (!target.parent_post_id) {
      return NextResponse.json({ error: "Only comments can be deleted here." }, { status: 400 });
    }

    const { data: membership } = await supabaseAdmin
      .from("group_members")
      .select("role")
      .eq("group_id", target.group_id)
      .eq("user_id", requester.id)
      .eq("status", "approved")
      .maybeSingle();

    const canModerateGroup = membership?.role === "leader" || membership?.role === "moderator";
    if (!isAdmin && !isGlobalModerator && !canModerateGroup && target.user_id !== requester.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { data: replies } = await supabaseAdmin
      .from("group_posts")
      .select("id")
      .eq("parent_post_id", commentId);

    const deletedIds = [commentId, ...(replies || []).map((row) => row.id)];
    if (isAdmin || isGlobalModerator || canModerateGroup) {
      await logModeratorDeletion(
        supabaseAdmin,
        {
          kind,
          commentId,
          content: target.content,
          authorUserId: target.user_id,
          authorName: target.display_name,
          sourceLabel: target.category,
          contextTitle: target.title || target.category,
          deletedIds,
        },
        { id: requester.id, name: moderatorName },
      );
    }

    await supabaseAdmin.from("group_post_likes").delete().in("post_id", deletedIds);
    const { error: deleteError } = await supabaseAdmin
      .from("group_posts")
      .delete()
      .in("id", deletedIds);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message || "Could not delete comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, deletedIds });
  }

  if (kind === "series_post_comment") {
    const { data: target, error } = await supabaseAdmin
      .from("group_series_post_comments")
      .select("id, user_id, group_id, post_id, display_name, content")
      .eq("id", commentId)
      .maybeSingle();

    if (error || !target) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    const { data: membership } = await supabaseAdmin
      .from("group_members")
      .select("role")
      .eq("group_id", target.group_id)
      .eq("user_id", requester.id)
      .eq("status", "approved")
      .maybeSingle();

    const canModerateGroup = membership?.role === "leader" || membership?.role === "moderator";
    if (!isAdmin && !isGlobalModerator && !canModerateGroup && target.user_id !== requester.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { data: replies } = await supabaseAdmin
      .from("group_series_post_comments")
      .select("id")
      .eq("parent_comment_id", commentId);

    const deletedIds = [commentId, ...(replies || []).map((row) => row.id)];
    if (isAdmin || isGlobalModerator || canModerateGroup) {
      await logModeratorDeletion(
        supabaseAdmin,
        {
          kind,
          commentId,
          content: target.content,
          authorUserId: target.user_id,
          authorName: target.display_name,
          sourceLabel: "Series post",
          contextTitle: `Series post ${target.post_id}`,
          deletedIds,
        },
        { id: requester.id, name: moderatorName },
      );
    }

    await supabaseAdmin.from("group_series_comment_likes").delete().in("comment_id", deletedIds);
    const { error: deleteError } = await supabaseAdmin
      .from("group_series_post_comments")
      .delete()
      .in("id", deletedIds);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message || "Could not delete comment." }, { status: 500 });
    }

    const { count } = await supabaseAdmin
      .from("group_series_post_comments")
      .select("id", { count: "exact", head: true })
      .eq("post_id", target.post_id);

    await supabaseAdmin
      .from("group_series_posts")
      .update({ comment_count: count ?? 0 })
      .eq("id", target.post_id);

    return NextResponse.json({ ok: true, deletedIds, nextCommentCount: count ?? 0 });
  }

  if (kind === "series_reflection") {
    const { data: target, error } = await supabaseAdmin
      .from("series_reflections")
      .select("id, user_id, series_id, week_number, display_name, content")
      .eq("id", commentId)
      .maybeSingle();

    if (error || !target) {
      return NextResponse.json({ error: "Reflection not found." }, { status: 404 });
    }

    if (!isAdmin && !isGlobalModerator && target.user_id !== requester.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { data: replies } = await supabaseAdmin
      .from("series_reflections")
      .select("id")
      .eq("parent_reflection_id", commentId);

    const deletedIds = [commentId, ...(replies || []).map((row) => row.id)];
    if (isAdmin || isGlobalModerator) {
      await logModeratorDeletion(
        supabaseAdmin,
        {
          kind,
          commentId,
          content: target.content,
          authorUserId: target.user_id,
          authorName: target.display_name,
          sourceLabel: `Week ${target.week_number || 1} reflection`,
          contextTitle: `Series reflection ${target.series_id}`,
          deletedIds,
        },
        { id: requester.id, name: moderatorName },
      );
    }

    await supabaseAdmin.from("series_reflection_likes").delete().in("reflection_id", deletedIds);
    const { error: deleteError } = await supabaseAdmin
      .from("series_reflections")
      .delete()
      .in("id", deletedIds);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message || "Could not delete reflection." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, deletedIds });
  }

  return NextResponse.json({ error: "Unsupported comment type." }, { status: 400 });
}
