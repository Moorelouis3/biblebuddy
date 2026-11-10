import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { insertGroupPostWithRetry } from "@/lib/groupPostInsert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Posts one Bible insight into the Study Group feed, as Louis.
//
// Louis, 2026-11-11: "can we also add bible insigths to be posted as me on the
// feed in bible buddy also?"
//
// The nightly blog-group-post cron already does exactly this for articles, so
// this follows it rather than inventing anything: same group lookup, same
// author resolution, same insertGroupPostWithRetry, same skipInsertNotifications
// (insert-time notification fanout reliably statement-times-out on that table).
//
// What it deliberately does NOT have is its own dedupe memory. Content Buddy's
// publication table is keyed on (item_id, destination), so an insight reaches
// the feed once and only once, and the record of that lives beside the record
// of the same insight going to Skool and Substack. A second memory table here
// would be a second answer to the same question.

const LOUIS_EMAIL = "moorelouis3@gmail.com";

function isAuthorized(request: NextRequest) {
  const secret = process.env.SECOND_BRAIN_STATS_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

async function resolveLouisUserId(supabaseAdmin: SupabaseClient) {
  if (process.env.LOUIS_USER_ID) return process.env.LOUIS_USER_ID;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const response = await fetch(
      `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(`email=="${LOUIS_EMAIL}"`)}`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
    );
    if (response.ok) {
      const payload = await response.json();
      const found = (payload?.users ?? []).find(
        (user: { email?: string | null; id?: string | null }) => user.email?.toLowerCase() === LOUIS_EMAIL,
      );
      if (found?.id) return found.id as string;
    }
  }

  const { data } = await supabaseAdmin
    .from("profile_stats")
    .select("user_id, display_name")
    .ilike("display_name", "Louis Moore")
    .maybeSingle();
  if (data?.user_id) return data.user_id as string;

  throw new Error("Could not resolve Louis's user id for the group post author.");
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Posts written in the app are stored as HTML paragraphs, with an empty <p></p>
// for a blank line. The insight arrives as plain text with newlines, which the
// opened-post view would otherwise collapse into one block.
function textToHtml(content: string) {
  const trimmed = content.trim();
  if (/^\s*<(p|div|h[1-6]|ul|ol|blockquote)[\s>]/i.test(trimmed)) return trimmed;
  return trimmed
    .split("\n")
    .map((line) => line.trim())
    .map((line) => {
      if (!line) return "<p></p>";
      const bolded = escapeHtml(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      return `<p>${bolded}</p>`;
    })
    .join("");
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  let payload: { title?: string; content?: string; linkUrl?: string; dryRun?: boolean };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON." }, { status: 400 });
  }

  const title = (payload.title ?? "").trim();
  const content = (payload.content ?? "").trim();
  if (!title || !content) {
    return NextResponse.json({ error: "title and content are both required." }, { status: 400 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: groups, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name, created_at")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"])
    .order("created_at", { ascending: false });
  if (groupError) {
    return NextResponse.json({ error: groupError.message }, { status: 500 });
  }
  const targetGroup =
    groups?.find((row) => row.name === "Bible Buddy Study Group") ??
    groups?.find((row) => row.name === "Hope Nation") ??
    null;
  if (!targetGroup) {
    return NextResponse.json({ error: "Official study group not found." }, { status: 404 });
  }

  const louisUserId = await resolveLouisUserId(supabaseAdmin);
  const { data: profile } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisUserId)
    .maybeSingle();
  const displayName = profile?.display_name || profile?.username || "Louis Moore";

  if (payload.dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      groupId: targetGroup.id,
      groupName: targetGroup.name,
      author: displayName,
      title,
      contentHtmlPreview: textToHtml(content).slice(0, 400),
    });
  }

  try {
    const postId = await insertGroupPostWithRetry(
      supabaseAdmin,
      {
        group_id: targetGroup.id,
        user_id: louisUserId,
        display_name: displayName,
        title,
        category: "general",
        content: textToHtml(content),
        link_url: payload.linkUrl ?? null,
      },
      { skipInsertNotifications: true },
    );
    return NextResponse.json({ ok: true, postId, groupId: targetGroup.id, author: displayName });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "unknown" },
      { status: 500 },
    );
  }
}
