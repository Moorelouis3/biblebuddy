import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireOwner } from "@/lib/requireOwner";

// Louis's moderation queue (2026-09-21, App Store guideline 1.2): every
// buddy_reports row, newest first, with names, the reported content and a
// link to it. What was reported is encoded at the start of `reason`, e.g.
// "[group_post:<uuid>] Harassment or bullying — note". Older DM reports have
// no tag and a conversation_id instead.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ReportRow = {
  id: string;
  reporter_user_id: string;
  reported_user_id: string;
  conversation_id: string | null;
  reason: string;
  created_at: string;
};

type ParsedReason = { contentType: string; contentId: string | null; reason: string };

function parseReason(raw: string, conversationId: string | null): ParsedReason {
  const match = /^\[([a-z_]+)(?::([^\]]*))?\]\s*([\s\S]*)$/.exec(raw || "");
  if (match) return { contentType: match[1], contentId: match[2] || null, reason: match[3].trim() };
  return { contentType: conversationId ? "message" : "unknown", contentId: null, reason: (raw || "").trim() };
}

async function byIds<T extends { id: string }>(
  admin: SupabaseClient,
  table: string,
  columns: string,
  ids: string[],
): Promise<Map<string, T>> {
  const map = new Map<string, T>();
  if (ids.length === 0) return map;
  const { data, error } = await admin.from(table).select(columns).in("id", ids);
  if (error) {
    console.warn(`[ADMIN_REPORTS] Could not load ${table}:`, error.message);
    return map;
  }
  for (const row of (data || []) as unknown as T[]) map.set(row.id, row);
  return map;
}

const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(request: Request) {
  const denied = await requireOwner(request);
  if (denied) return denied;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data, error } = await admin
    .from("buddy_reports")
    .select("id, reporter_user_id, reported_user_id, conversation_id, reason, created_at")
    .order("created_at", { ascending: false })
    .limit(300);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const rows = (data || []) as ReportRow[];

  const parsed = rows.map((row) => ({ row, parsed: parseReason(row.reason, row.conversation_id) }));

  const userIds = [...new Set(rows.flatMap((row) => [row.reporter_user_id, row.reported_user_id]))];
  const profiles = new Map<string, { display_name: string | null; username: string | null; profile_image_url: string | null }>();
  if (userIds.length > 0) {
    const { data: profileRows } = await admin
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url")
      .in("user_id", userIds);
    for (const profile of profileRows || []) profiles.set(profile.user_id, profile);
  }

  const idsOf = (...types: string[]) =>
    [...new Set(parsed.filter((p) => types.includes(p.parsed.contentType) && p.parsed.contentId && UUID.test(p.parsed.contentId)).map((p) => p.parsed.contentId as string))];

  const [groupPosts, seriesComments, articleComments] = await Promise.all([
    byIds<{ id: string; group_id: string; parent_post_id: string | null; title: string | null; content: string | null }>(
      admin, "group_posts", "id, group_id, parent_post_id, title, content", idsOf("group_post", "group_comment"),
    ),
    byIds<{ id: string; post_id: string; content: string | null }>(
      admin, "group_series_post_comments", "id, post_id, content", idsOf("series_comment"),
    ),
    byIds<{ id: string; article_slug: string; content: string | null; is_deleted?: boolean | null }>(
      admin, "article_comments", "id, article_slug, content, is_deleted", idsOf("comment"),
    ),
  ]);

  const clip = (text: string | null | undefined) => {
    const plain = String(text || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return plain.length > 400 ? `${plain.slice(0, 400)}…` : plain;
  };

  const reports = parsed.map(({ row, parsed: p }) => {
    let contentLink: string | null = null;
    let contentPreview: string | null = null;
    let contentMissing = false;

    if ((p.contentType === "group_post" || p.contentType === "group_comment") && p.contentId) {
      const post = groupPosts.get(p.contentId);
      if (post) {
        contentLink =
          p.contentType === "group_post"
            ? `/study-groups/${post.group_id}/chat?post=${post.id}`
            : `/study-groups/${post.group_id}/chat?comment=${post.id}`;
        contentPreview = clip([post.title, post.content].filter(Boolean).join(" — "));
      } else contentMissing = true;
    } else if (p.contentType === "series_comment" && p.contentId) {
      const comment = seriesComments.get(p.contentId);
      if (comment) contentPreview = clip(comment.content);
      else contentMissing = true;
    } else if (p.contentType === "comment" && p.contentId) {
      const comment = articleComments.get(p.contentId);
      if (comment) {
        contentPreview = clip(comment.content) + (comment.is_deleted ? " (deleted)" : "");
        contentPreview = `${contentPreview} · on "${comment.article_slug}"`;
      } else contentMissing = true;
    } else if (p.contentType === "event_member" && p.contentId) {
      contentLink = `/events/${p.contentId}`;
    } else if (p.contentType === "message" && row.conversation_id) {
      contentPreview = `Direct message conversation ${row.conversation_id}`;
    }

    const reporter = profiles.get(row.reporter_user_id);
    const reported = profiles.get(row.reported_user_id);
    return {
      id: row.id,
      created_at: row.created_at,
      content_type: p.contentType,
      content_id: p.contentId,
      reason: p.reason,
      raw_reason: row.reason,
      conversation_id: row.conversation_id,
      content_link: contentLink,
      content_preview: contentPreview,
      content_missing: contentMissing,
      reporter: {
        user_id: row.reporter_user_id,
        name: reporter?.display_name || reporter?.username || "Unknown",
        image: reporter?.profile_image_url || null,
      },
      reported: {
        user_id: row.reported_user_id,
        name: reported?.display_name || reported?.username || "Unknown",
        image: reported?.profile_image_url || null,
      },
    };
  });

  return NextResponse.json({ reports });
}
