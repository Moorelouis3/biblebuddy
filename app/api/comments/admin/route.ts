import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeCustomMemberBadge } from "@/lib/userBadges";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

type CommentKind =
  | "article_comment"
  | "feed_post_comment"
  | "group_feed_comment"
  | "series_post_comment"
  | "series_reflection";

type AdminComment = {
  id: string;
  kind: CommentKind;
  source: string;
  sourceLabel: string;
  href: string;
  contextTitle: string;
  contextContent: string;
  userId: string | null;
  userName: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  rootId: string | null;
  isReply: boolean;
  replyCount: number;
  hasMyReply: boolean;
  isMine?: boolean;
};

function getServerClients(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    throw new Error("Server not configured.");
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";

  return {
    token,
    auth: createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } }),
    admin: createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } }),
  };
}

async function requireModerator(request: NextRequest) {
  const clients = getServerClients(request);
  if (!clients.token) {
    return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }

  const { data, error } = await clients.auth.auth.getUser(clients.token);
  if (error || !data.user) {
    return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }

  const { data: profile } = await clients.admin
    .from("profile_stats")
    .select("display_name, username, profile_image_url, member_badge")
    .eq("user_id", data.user.id)
    .maybeSingle();

  const isAdmin = data.user.email === ADMIN_EMAIL;
  const isModerator = normalizeCustomMemberBadge(profile?.member_badge) === "moderator";

  if (!isAdmin && !isModerator) {
    return { error: NextResponse.json({ error: "Forbidden." }, { status: 403 }) };
  }

  return {
    admin: clients.admin,
    requester: data.user,
    requesterName:
      profile?.display_name ||
      profile?.username ||
      data.user.user_metadata?.display_name ||
      data.user.user_metadata?.name ||
      "Bible Buddy",
    requesterImage: profile?.profile_image_url ?? null,
  };
}

function slugToTitle(slug: string) {
  const last = slug.split("/").filter(Boolean).pop() || slug || "Comment";
  return last.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function bibleChapterSlugToTitle(slug: string) {
  const match = slug.match(/^bible-chapter-(.+)-(\d+)$/);
  if (!match) return slugToTitle(slug);
  return `${slugToTitle(match[1])} ${match[2]}`;
}

function clipText(value: unknown, max = 700) {
  const normalized = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  return normalized.length > max ? `${normalized.slice(0, max).trim()}...` : normalized;
}

function addReplyMetadata(rows: AdminComment[], requesterId: string) {
  const replyMap = new Map<string, number>();
  const myReplyParentIds = new Set<string>();

  rows.forEach((row) => {
    if (!row.parentId) return;
    replyMap.set(row.parentId, (replyMap.get(row.parentId) || 0) + 1);
    if (row.userId === requesterId) myReplyParentIds.add(row.parentId);
  });

  return rows.map((row) => ({
    ...row,
    replyCount: replyMap.get(row.id) || 0,
    hasMyReply: myReplyParentIds.has(row.id),
    isMine: row.userId === requesterId,
  }));
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function buildStats(comments: AdminComment[], requesterId: string) {
  const today = todayKey();
  const todayComments = comments.filter((comment) => comment.createdAt?.slice(0, 10) === today);
  const myRepliesToday = todayComments.filter((comment) => comment.userId === requesterId && comment.isReply);
  const needsReply = comments.filter((comment) => comment.userId !== requesterId && !comment.hasMyReply);
  const bySource = comments.reduce<Record<string, number>>((acc, comment) => {
    acc[comment.source] = (acc[comment.source] || 0) + 1;
    return acc;
  }, {});

  return {
    total: comments.length,
    today: todayComments.length,
    myRepliesToday: myRepliesToday.length,
    needsReply: needsReply.length,
    bySource,
  };
}

export async function GET(request: NextRequest) {
  const auth = await requireModerator(request);
  if ("error" in auth) return auth.error;

  const { admin, requester } = auth;
  const limit = Math.min(Number(request.nextUrl.searchParams.get("limit") || 30), 100);

  const [
    articleRes,
    feedRes,
    groupFeedRes,
    seriesPostRes,
    reflectionRes,
  ] = await Promise.all([
    admin.from("article_comments").select("id, article_slug, user_id, user_name, content, parent_id, created_at").order("created_at", { ascending: false }).limit(limit),
    admin.from("feed_post_comments").select("id, post_id, user_id, parent_comment_id, content, created_at").order("created_at", { ascending: false }).limit(limit),
    admin.from("group_posts").select("id, group_id, user_id, display_name, category, content, parent_post_id, created_at").not("parent_post_id", "is", null).order("created_at", { ascending: false }).limit(limit),
    admin.from("group_series_post_comments").select("id, group_id, post_id, user_id, display_name, content, parent_comment_id, created_at").order("created_at", { ascending: false }).limit(limit),
    admin.from("series_reflections").select("id, series_id, week_number, user_id, display_name, content, parent_reflection_id, created_at").order("created_at", { ascending: false }).limit(limit),
  ]);

  const comments: AdminComment[] = [];

  (articleRes.data || []).forEach((row: any) => {
    const slug = row.article_slug || "";
    const isBibleChapter = slug.startsWith("bible-chapter-");
    const sourceLabel = isBibleChapter ? bibleChapterSlugToTitle(slug) : slugToTitle(slug);
    comments.push({
      id: row.id,
      kind: "article_comment",
      source: isBibleChapter ? "Bible Chapters" : "Articles",
      sourceLabel,
      href: isBibleChapter ? slug.replace(/^bible-chapter-/, "/Bible/").replace(/-(\d+)$/, "/$1") : slug || "/bible-study-hub",
      contextTitle: isBibleChapter ? `${sourceLabel} reflection` : sourceLabel,
      contextContent: isBibleChapter
        ? `This comment was posted under the Bible chapter reflection for ${sourceLabel}.`
        : `This comment was posted under the article or discussion page: ${sourceLabel}.`,
      userId: row.user_id,
      userName: row.user_name || "Anonymous",
      content: row.content || "",
      createdAt: row.created_at,
      parentId: row.parent_id,
      rootId: row.article_slug,
      isReply: !!row.parent_id,
      replyCount: 0,
      hasMyReply: false,
    });
  });

  (feedRes.data || []).forEach((row: any) => {
    comments.push({
      id: row.id,
      kind: "feed_post_comment",
      source: "Group Feed",
      sourceLabel: "Bible Buddy Feed",
      href: `/bb-feed?post=${row.post_id}&comment=${row.id}`,
      contextTitle: "Bible Buddy Feed post",
      contextContent: "",
      userId: row.user_id,
      userName: "Buddy",
      content: row.content || "",
      createdAt: row.created_at,
      parentId: row.parent_comment_id,
      rootId: row.post_id,
      isReply: !!row.parent_comment_id,
      replyCount: 0,
      hasMyReply: false,
    });
  });

  (groupFeedRes.data || []).forEach((row: any) => {
    comments.push({
      id: row.id,
      kind: "group_feed_comment",
      source: "Group Feed",
      sourceLabel: row.category || "Group conversation",
      href: `/study-groups/${row.group_id}/chat?post=${row.parent_post_id}&comment=${row.id}`,
      contextTitle: row.category || "Group conversation",
      contextContent: "",
      userId: row.user_id,
      userName: row.display_name || "Buddy",
      content: row.content || "",
      createdAt: row.created_at,
      parentId: row.parent_post_id,
      rootId: row.group_id,
      isReply: true,
      replyCount: 0,
      hasMyReply: false,
    });
  });

  (seriesPostRes.data || []).forEach((row: any) => {
    comments.push({
      id: row.id,
      kind: "series_post_comment",
      source: "Group Feed",
      sourceLabel: "Series post",
      href: `/study-groups/${row.group_id}/chat?seriesPost=${row.post_id}&comment=${row.id}`,
      contextTitle: "Bible study series post",
      contextContent: "",
      userId: row.user_id,
      userName: row.display_name || "Buddy",
      content: row.content || "",
      createdAt: row.created_at,
      parentId: row.parent_comment_id,
      rootId: row.post_id,
      isReply: !!row.parent_comment_id,
      replyCount: 0,
      hasMyReply: false,
    });
  });

  (reflectionRes.data || []).forEach((row: any) => {
    comments.push({
      id: row.id,
      kind: "series_reflection",
      source: "Bible Chapters",
      sourceLabel: `Week ${row.week_number || 1} reflection`,
      href: `/study-groups?comment=${row.id}`,
      contextTitle: `Bible study reflection, week ${row.week_number || 1}`,
      contextContent: "This comment was posted as a Bible study reflection.",
      userId: row.user_id,
      userName: row.display_name || "Buddy",
      content: row.content || "",
      createdAt: row.created_at,
      parentId: row.parent_reflection_id,
      rootId: row.series_id,
      isReply: !!row.parent_reflection_id,
      replyCount: 0,
      hasMyReply: false,
    });
  });

  const enriched = addReplyMetadata(comments, requester.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const visibleComments = enriched.slice(0, limit);
  const feedPostIds = [...new Set(visibleComments.filter((comment) => comment.kind === "feed_post_comment" && comment.rootId).map((comment) => comment.rootId as string))];
  const groupParentIds = [...new Set(visibleComments.filter((comment) => comment.kind === "group_feed_comment" && comment.parentId).map((comment) => comment.parentId as string))];
  const seriesPostIds = [...new Set(visibleComments.filter((comment) => comment.kind === "series_post_comment" && comment.rootId).map((comment) => comment.rootId as string))];

  const [feedPostContext, groupPostContext, seriesPostContext] = await Promise.all([
    feedPostIds.length
      ? admin.from("feed_posts").select("id, title, content, post_type").in("id", feedPostIds)
      : Promise.resolve({ data: [] as any[] }),
    groupParentIds.length
      ? admin.from("group_posts").select("id, category, title, content").in("id", groupParentIds)
      : Promise.resolve({ data: [] as any[] }),
    seriesPostIds.length
      ? admin.from("group_series_posts").select("id, title, content").in("id", seriesPostIds)
      : Promise.resolve({ data: [] as any[] }),
  ]);

  const feedMap = new Map((feedPostContext.data || []).map((row: any) => [row.id, row]));
  const groupMap = new Map((groupPostContext.data || []).map((row: any) => [row.id, row]));
  const seriesMap = new Map((seriesPostContext.data || []).map((row: any) => [row.id, row]));
  const withContext = visibleComments.map((comment) => {
    if (comment.kind === "feed_post_comment" && comment.rootId) {
      const post = feedMap.get(comment.rootId);
      return {
        ...comment,
        sourceLabel: post?.title || comment.sourceLabel,
        contextTitle: post?.title || post?.post_type || "Bible Buddy Feed post",
        contextContent: clipText(post?.content),
      };
    }

    if (comment.kind === "group_feed_comment" && comment.parentId) {
      const post = groupMap.get(comment.parentId);
      return {
        ...comment,
        sourceLabel: post?.title || post?.category || comment.sourceLabel,
        contextTitle: post?.title || post?.category || "Group Feed post",
        contextContent: clipText(post?.content),
      };
    }

    if (comment.kind === "series_post_comment" && comment.rootId) {
      const post = seriesMap.get(comment.rootId);
      return {
        ...comment,
        sourceLabel: post?.title || comment.sourceLabel,
        contextTitle: post?.title || "Bible study series post",
        contextContent: clipText(post?.content),
      };
    }

    return comment;
  });

  return NextResponse.json({
    comments: withContext,
    stats: buildStats(enriched, requester.id),
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireModerator(request);
  if ("error" in auth) return auth.error;

  const body = await request.json().catch(() => null);
  const kind = body?.kind as CommentKind;
  const targetId = typeof body?.targetId === "string" ? body.targetId : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";

  if (!kind || !targetId || !content) {
    return NextResponse.json({ error: "Missing reply details." }, { status: 400 });
  }

  const { admin, requester, requesterName, requesterImage } = auth;

  if (kind === "article_comment") {
    const { data: target } = await admin.from("article_comments").select("id, article_slug").eq("id", targetId).maybeSingle();
    if (!target) return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    const { data, error } = await admin.from("article_comments").insert({
      article_slug: target.article_slug,
      user_id: requester.id,
      user_name: requesterName,
      content,
      parent_id: target.id,
    }).select("id").maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, id: data?.id });
  }

  if (kind === "feed_post_comment") {
    const { data: target } = await admin.from("feed_post_comments").select("id, post_id").eq("id", targetId).maybeSingle();
    if (!target) return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    const { data, error } = await admin.from("feed_post_comments").insert({
      post_id: target.post_id,
      user_id: requester.id,
      parent_comment_id: target.id,
      content,
    }).select("id").maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const { count } = await admin.from("feed_post_comments").select("id", { count: "exact", head: true }).eq("post_id", target.post_id);
    await admin.from("feed_posts").update({ comment_count: count ?? 0 }).eq("id", target.post_id);
    return NextResponse.json({ ok: true, id: data?.id });
  }

  if (kind === "group_feed_comment") {
    const { data: target } = await admin.from("group_posts").select("id, group_id, category").eq("id", targetId).maybeSingle();
    if (!target) return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    const { data, error } = await admin.from("group_posts").insert({
      group_id: target.group_id,
      user_id: requester.id,
      display_name: requesterName,
      category: target.category,
      content,
      parent_post_id: target.id,
    }).select("id").maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, id: data?.id });
  }

  if (kind === "series_post_comment") {
    const { data: target } = await admin.from("group_series_post_comments").select("id, group_id, post_id").eq("id", targetId).maybeSingle();
    if (!target) return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    const { data, error } = await admin.from("group_series_post_comments").insert({
      post_id: target.post_id,
      group_id: target.group_id,
      user_id: requester.id,
      display_name: requesterName,
      content,
      parent_comment_id: target.id,
    }).select("id").maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const { count } = await admin.from("group_series_post_comments").select("id", { count: "exact", head: true }).eq("post_id", target.post_id);
    await admin.from("group_series_posts").update({ comment_count: count ?? 0 }).eq("id", target.post_id);
    return NextResponse.json({ ok: true, id: data?.id });
  }

  if (kind === "series_reflection") {
    const { data: target } = await admin.from("series_reflections").select("id, series_id, week_number").eq("id", targetId).maybeSingle();
    if (!target) return NextResponse.json({ error: "Reflection not found." }, { status: 404 });
    const { data, error } = await admin.from("series_reflections").insert({
      user_id: requester.id,
      series_id: target.series_id,
      week_number: target.week_number,
      content,
      display_name: requesterName,
      profile_image_url: requesterImage,
      parent_reflection_id: target.id,
    }).select("id").maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, id: data?.id });
  }

  return NextResponse.json({ error: "Unsupported comment type." }, { status: 400 });
}
