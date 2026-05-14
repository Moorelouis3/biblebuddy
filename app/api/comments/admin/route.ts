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
  userImage: string | null;
  userProfileHref: string | null;
  content: string;
  createdAt: string;
  parentId: string | null;
  rootId: string | null;
  isReply: boolean;
  replyCount: number;
  hasMyReply: boolean;
  isMine?: boolean;
};

type ProfileLite = {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
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

function bibleChapterReflectionContext(slug: string) {
  const sourceLabel = bibleChapterSlugToTitle(slug);
  return {
    sourceLabel,
    contextTitle: `${sourceLabel} Reflection Question`,
    contextContent: `Reflection question: What stands out to you most in ${sourceLabel}?`,
  };
}

const ARTICLE_PATH_BY_SLUG: Record<string, string> = {
  "favorite-book-of-the-bible": "/bible-study-hub/bible-insights/favorite-book-of-the-bible",
  "how-to-defend-the-bible": "/bible-study-hub/bible-insights/how-to-defend-the-bible",
  "what-is-the-bible": "/bible-study-hub/bible-insights/what-is-the-bible",
  "which-bible-character-relates": "/bible-study-hub/bible-insights/which-bible-character-relates",
  "why-so-many-bible-translations": "/bible-study-hub/bible-insights/why-so-many-bible-translations",
  "how-do-you-take-notes": "/bible-study-hub/bible-study-tips/how-do-you-take-notes",
  "what-keeps-you-consistent": "/bible-study-hub/bible-study-tips/what-keeps-you-consistent",
  "whats-your-best-study-tip": "/bible-study-hub/bible-study-tips/whats-your-best-study-tip",
  "favorite-bible-character": "/bible-study-hub/character-studies/favorite-bible-character",
  "most-misunderstood-character": "/bible-study-hub/character-studies/most-misunderstood-character",
  "who-do-you-relate-to": "/bible-study-hub/character-studies/who-do-you-relate-to",
  "what-does-being-christian-mean": "/bible-study-hub/christian-foundations/what-does-being-christian-mean",
  "what-does-following-jesus-look-like": "/bible-study-hub/christian-foundations/what-does-following-jesus-look-like",
  "what-is-heaven": "/bible-study-hub/christian-foundations/what-is-heaven",
  "what-is-hell": "/bible-study-hub/christian-foundations/what-is-hell",
  "what-is-your-testimony": "/bible-study-hub/christian-foundations/what-is-your-testimony",
  "why-so-many-denominations": "/bible-study-hub/christian-foundations/why-so-many-denominations",
};

function articleHrefFromSlug(slug: string) {
  if (!slug) return "/bible-study-hub";
  if (slug.startsWith("/")) return slug;
  return ARTICLE_PATH_BY_SLUG[slug] || `/bible-study-hub/${slug}`;
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

function todayKey(date = new Date(), timezoneOffsetMinutes = 0) {
  return new Date(date.getTime() - timezoneOffsetMinutes * 60000).toISOString().slice(0, 10);
}

function localDayUtcRange(timezoneOffsetMinutes = 0) {
  const localKey = todayKey(new Date(), timezoneOffsetMinutes);
  const [year, month, day] = localKey.split("-").map(Number);
  const start = new Date(Date.UTC(year, month - 1, day) + timezoneOffsetMinutes * 60000);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return { startIso: start.toISOString(), endIso: end.toISOString() };
}

function displayName(profile: Partial<ProfileLite> | null | undefined, fallback = "Bible Buddy") {
  return profile?.display_name || profile?.username || fallback;
}

function describeAction(actionType: string, actionLabel: string | null | undefined) {
  const label = actionLabel || "";
  const prettyLabel = label.replace(/^chapter:/i, "").replace(/^post:/i, "").replace(/_/g, " ").trim();

  if (actionType.includes("trivia")) return prettyLabel ? `finished trivia for ${prettyLabel}` : "finished a trivia round";
  if (actionType.includes("scrambled")) return prettyLabel ? `played Scrambled for ${prettyLabel}` : "played Scrambled";
  if (actionType.includes("chapter") && actionType.includes("completed")) return prettyLabel ? `finished ${prettyLabel}` : "finished a Bible chapter";
  if (actionType.includes("notes")) return prettyLabel ? `reviewed notes for ${prettyLabel}` : "reviewed Bible notes";
  if (actionType.includes("reflection")) return prettyLabel ? `posted a reflection for ${prettyLabel}` : "posted a reflection";
  if (actionType.includes("comment")) return prettyLabel ? `commented on ${prettyLabel}` : "posted a comment";
  if (actionType.includes("like")) return prettyLabel ? `liked ${prettyLabel}` : "liked something";
  if (actionType.includes("login")) return "opened Bible Buddy";
  return prettyLabel ? `${actionType.replace(/_/g, " ")}: ${prettyLabel}` : actionType.replace(/_/g, " ");
}

function buildStats(comments: AdminComment[], requesterId: string, allCommentsForReplyStats = comments, timezoneOffsetMinutes = 0) {
  const today = todayKey(new Date(), timezoneOffsetMinutes);
  const todayComments = comments.filter((comment) => todayKey(new Date(comment.createdAt), timezoneOffsetMinutes) === today);
  const myRepliesToday = allCommentsForReplyStats.filter((comment) => todayKey(new Date(comment.createdAt), timezoneOffsetMinutes) === today && comment.userId === requesterId && comment.isReply);
  const needsReply = comments.filter((comment) => !comment.isReply && comment.userId !== requesterId && !comment.hasMyReply);
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
  const timezoneOffsetMinutes = Number(request.nextUrl.searchParams.get("tzOffset") || 0);
  const buddyPage = Math.max(0, Number(request.nextUrl.searchParams.get("buddyPage") || 0));
  const buddyLimit = Math.min(Math.max(10, Number(request.nextUrl.searchParams.get("buddyLimit") || 20)), 50);
  const buddyFrom = buddyPage * buddyLimit;
  const buddyTo = buddyFrom + buddyLimit - 1;
  const todayRange = localDayUtcRange(timezoneOffsetMinutes);

  const [
    articleTopRes,
    articleReplyRes,
    feedTopRes,
    feedReplyRes,
    groupFeedRes,
    seriesPostTopRes,
    seriesPostReplyRes,
    reflectionTopRes,
    reflectionReplyRes,
  ] = await Promise.all([
    admin.from("article_comments").select("id, article_slug, user_id, user_name, content, parent_id, created_at").eq("is_deleted", false).is("parent_id", null).order("created_at", { ascending: false }).limit(limit),
    admin.from("article_comments").select("id, article_slug, user_id, user_name, content, parent_id, created_at").eq("is_deleted", false).not("parent_id", "is", null).order("created_at", { ascending: false }).limit(limit * 4),
    admin.from("feed_post_comments").select("id, post_id, user_id, parent_comment_id, content, created_at").is("parent_comment_id", null).order("created_at", { ascending: false }).limit(limit),
    admin.from("feed_post_comments").select("id, post_id, user_id, parent_comment_id, content, created_at").not("parent_comment_id", "is", null).order("created_at", { ascending: false }).limit(limit * 4),
    admin.from("group_posts").select("id, group_id, user_id, display_name, category, title, content, parent_post_id, created_at").not("parent_post_id", "is", null).order("created_at", { ascending: false }).limit(limit * 5),
    admin.from("group_series_post_comments").select("id, group_id, post_id, user_id, display_name, content, parent_comment_id, created_at").is("parent_comment_id", null).order("created_at", { ascending: false }).limit(limit),
    admin.from("group_series_post_comments").select("id, group_id, post_id, user_id, display_name, content, parent_comment_id, created_at").not("parent_comment_id", "is", null).order("created_at", { ascending: false }).limit(limit * 4),
    admin.from("series_reflections").select("id, series_id, week_number, user_id, display_name, content, parent_reflection_id, created_at").is("parent_reflection_id", null).order("created_at", { ascending: false }).limit(limit),
    admin.from("series_reflections").select("id, series_id, week_number, user_id, display_name, content, parent_reflection_id, created_at").not("parent_reflection_id", "is", null).order("created_at", { ascending: false }).limit(limit * 4),
  ]);

  const comments: AdminComment[] = [];

  [...(articleTopRes.data || []), ...(articleReplyRes.data || [])].forEach((row: any) => {
    const slug = row.article_slug || "";
    const isBibleChapter = slug.startsWith("bible-chapter-");
    const bibleContext = isBibleChapter ? bibleChapterReflectionContext(slug) : null;
    const sourceLabel = bibleContext?.sourceLabel ?? slugToTitle(slug);
    comments.push({
      id: row.id,
      kind: "article_comment",
      source: isBibleChapter ? "Bible Chapters" : "Articles",
      sourceLabel,
      href: isBibleChapter ? slug.replace(/^bible-chapter-/, "/Bible/").replace(/-(\d+)$/, "/$1") : articleHrefFromSlug(slug),
      contextTitle: bibleContext?.contextTitle ?? sourceLabel,
      contextContent: bibleContext?.contextContent ?? `This comment was posted under the article or discussion page: ${sourceLabel}.`,
      userId: row.user_id,
      userName: row.user_name || "Anonymous",
      userImage: null,
      userProfileHref: row.user_id ? `/profile/${row.user_id}` : null,
      content: row.content || "",
      createdAt: row.created_at,
      parentId: row.parent_id,
      rootId: row.article_slug,
      isReply: !!row.parent_id,
      replyCount: 0,
      hasMyReply: false,
    });
  });

  [...(feedTopRes.data || []), ...(feedReplyRes.data || [])].forEach((row: any) => {
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
      userImage: null,
      userProfileHref: row.user_id ? `/profile/${row.user_id}` : null,
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
      userImage: null,
      userProfileHref: row.user_id ? `/profile/${row.user_id}` : null,
      content: row.content || "",
      createdAt: row.created_at,
      parentId: row.parent_post_id,
      rootId: row.group_id,
      isReply: false,
      replyCount: 0,
      hasMyReply: false,
    });
  });

  [...(seriesPostTopRes.data || []), ...(seriesPostReplyRes.data || [])].forEach((row: any) => {
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
      userImage: null,
      userProfileHref: row.user_id ? `/profile/${row.user_id}` : null,
      content: row.content || "",
      createdAt: row.created_at,
      parentId: row.parent_comment_id,
      rootId: row.post_id,
      isReply: !!row.parent_comment_id,
      replyCount: 0,
      hasMyReply: false,
    });
  });

  [...(reflectionTopRes.data || []), ...(reflectionReplyRes.data || [])].forEach((row: any) => {
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
      userImage: null,
      userProfileHref: row.user_id ? `/profile/${row.user_id}` : null,
      content: row.content || "",
      createdAt: row.created_at,
      parentId: row.parent_reflection_id,
      rootId: row.series_id,
      isReply: !!row.parent_reflection_id,
      replyCount: 0,
      hasMyReply: false,
    });
  });

  const enrichedWithReplies = addReplyMetadata(comments, requester.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const visibleComments = enrichedWithReplies.filter((comment) => !comment.isReply).slice(0, limit);
  const feedPostIds = [...new Set(visibleComments.filter((comment) => comment.kind === "feed_post_comment" && comment.rootId).map((comment) => comment.rootId as string))];
  const groupParentIds = [...new Set(enrichedWithReplies.filter((comment) => comment.kind === "group_feed_comment" && comment.parentId).map((comment) => comment.parentId as string))];
  const seriesPostIds = [...new Set(visibleComments.filter((comment) => comment.kind === "series_post_comment" && comment.rootId).map((comment) => comment.rootId as string))];

  const [feedPostContext, groupPostContext, seriesPostContext] = await Promise.all([
    feedPostIds.length
      ? admin.from("feed_posts").select("id, title, content, post_type").in("id", feedPostIds)
      : Promise.resolve({ data: [] as any[] }),
    groupParentIds.length
      ? admin.from("group_posts").select("id, parent_post_id, category, title, content").in("id", groupParentIds)
      : Promise.resolve({ data: [] as any[] }),
    seriesPostIds.length
      ? admin.from("group_series_posts").select("id, title, content").in("id", seriesPostIds)
      : Promise.resolve({ data: [] as any[] }),
  ]);

  const feedMap = new Map((feedPostContext.data || []).map((row: any) => [row.id, row]));
  const groupMap = new Map((groupPostContext.data || []).map((row: any) => [row.id, row]));
  const seriesMap = new Map((seriesPostContext.data || []).map((row: any) => [row.id, row]));
  const topLevelVisibleComments = visibleComments.filter((comment) => {
    if (comment.kind !== "group_feed_comment" || !comment.parentId) return true;
    const parent = groupMap.get(comment.parentId);
    return !parent?.parent_post_id;
  });

  const withContext = topLevelVisibleComments.map((comment) => {
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
        isReply: Boolean(post?.parent_post_id),
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

  const visibleUserIds = [...new Set(withContext.map((comment) => comment.userId).filter(Boolean) as string[])];
  const { data: profileRows } = visibleUserIds.length
    ? await admin
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", visibleUserIds)
    : { data: [] as any[] };
  const profileMap = new Map((profileRows || []).map((profile: any) => [profile.user_id, profile]));
  const enrichedWithProfiles = withContext.map((comment) => {
    const profile = comment.userId ? profileMap.get(comment.userId) : null;
    return {
      ...comment,
      userName: profile?.display_name || profile?.username || comment.userName,
      userImage: profile?.profile_image_url || null,
      userProfileHref: comment.userId ? `/profile/${comment.userId}` : null,
    };
  });

  const normalizedForStats = enrichedWithReplies.map((comment) => {
    if (comment.kind !== "group_feed_comment" || !comment.parentId) return comment;
    const parent = groupMap.get(comment.parentId);
    return { ...comment, isReply: Boolean(parent?.parent_post_id) };
  });

  const [signupRes, actionRes, activeRes] = await Promise.all([
    admin
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url, created_at")
      .order("created_at", { ascending: false })
      .limit(12),
    admin
      .from("master_actions")
      .select("id, user_id, username, action_type, action_label, created_at")
      .gte("created_at", todayRange.startIso)
      .lt("created_at", todayRange.endIso)
      .order("created_at", { ascending: false })
      .limit(60),
    admin
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url, current_level, current_streak, total_actions, last_active_at, last_active_date", { count: "exact" })
      .order("total_actions", { ascending: false, nullsFirst: false })
      .range(buddyFrom, buddyTo),
  ]);

  const dashboardUserIds = [
    ...(signupRes.data || []).map((row: any) => row.user_id),
    ...(actionRes.data || []).map((row: any) => row.user_id),
    ...(activeRes.data || []).map((row: any) => row.user_id),
  ].filter(Boolean);
  const missingProfileIds = [...new Set(dashboardUserIds)].filter((id) => !profileMap.has(id));

  if (missingProfileIds.length > 0) {
    const { data: dashboardProfiles } = await admin
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url")
      .in("user_id", missingProfileIds);

    (dashboardProfiles || []).forEach((profile: any) => profileMap.set(profile.user_id, profile));
  }

  const hourlyActionCounts = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    count: 0,
  }));

  (actionRes.data || []).forEach((action: any) => {
    const actionDate = new Date(action.created_at);
    if (Number.isNaN(actionDate.getTime())) return;
    const localActionDate = new Date(actionDate.getTime() - timezoneOffsetMinutes * 60000);
    const hour = localActionDate.getUTCHours();
    if (hourlyActionCounts[hour]) hourlyActionCounts[hour].count += 1;
  });

  return NextResponse.json({
    moderator: {
      id: requester.id,
      name: auth.requesterName,
      image: auth.requesterImage,
    },
    comments: enrichedWithProfiles,
    recentSignups: (signupRes.data || []).map((row: any) => ({
      userId: row.user_id,
      name: displayName(row, "New Buddy"),
      image: row.profile_image_url || null,
      profileHref: `/profile/${row.user_id}`,
      createdAt: row.created_at,
    })),
    activityFeed: (actionRes.data || []).slice(0, 25).map((row: any) => {
      const profile = row.user_id ? profileMap.get(row.user_id) : null;
      const name = displayName(profile, row.username || "Bible Buddy");
      return {
        id: row.id,
        userId: row.user_id,
        name,
        image: profile?.profile_image_url || null,
        profileHref: row.user_id ? `/profile/${row.user_id}` : null,
        actionType: row.action_type,
        actionLabel: row.action_label,
        text: `${name} ${describeAction(row.action_type || "", row.action_label)}.`,
        createdAt: row.created_at,
      };
    }),
    hourlyActionCounts,
    activeBuddies: {
      page: buddyPage,
      pageSize: buddyLimit,
      total: activeRes.count ?? 0,
      rows: (activeRes.data || []).map((row: any, index: number) => ({
        rank: buddyFrom + index + 1,
        userId: row.user_id,
        name: displayName(row, "Bible Buddy"),
        image: row.profile_image_url || null,
        profileHref: `/profile/${row.user_id}`,
        level: row.current_level ?? 1,
        streak: row.current_streak ?? 0,
        totalActions: row.total_actions ?? 0,
        lastActiveAt: row.last_active_at || row.last_active_date || null,
      })),
    },
    stats: buildStats(normalizedForStats.filter((comment) => {
      if (comment.isReply) return false;
      if (comment.kind !== "group_feed_comment" || !comment.parentId) return true;
      const parent = groupMap.get(comment.parentId);
      return !parent?.parent_post_id;
    }), requester.id, normalizedForStats, timezoneOffsetMinutes),
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
