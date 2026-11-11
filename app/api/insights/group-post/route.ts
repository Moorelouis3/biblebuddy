import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Posts one Bible insight into the Study Group feed, as Louis.
//
// Louis, 2026-11-11: "can we also add bible insigths to be posted as me on the
// feed in bible buddy also?"
//
// One row in feed_posts, owned by Louis. The study group it used to post to no
// longer exists - see the note above the insert.
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

  const louisUserId = await resolveLouisUserId(supabaseAdmin);
  const { data: profile } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisUserId)
    .maybeSingle();
  const displayName = profile?.display_name || profile?.username || "Louis Moore";

  // The feed, as Louis, and nothing else.
  //
  // Louis, 2026-11-11: "not the study group!!! we dont have a study group
  // anymore its just the FEED!!!!!"
  //
  // This used to write a group_posts row and let insertGroupPostWithRetry
  // mirror it into the feed. That mirror is deliberately authored by the Bible
  // Buddy brand account - the right call in October, when every automatic post
  // carried Louis's face and the wall read as one man talking to himself. But
  // the study group is gone, the feed is the destination rather than a copy of
  // one, and he wants his own insights under his own name.
  //
  // So: one row, in feed_posts, owned by him. No group row, because there is
  // no group to own it.
  //
  // The feed has no title column, so the title becomes the first line of the
  // body - the same shape feedBodyFromGroupPost produced for the mirror.
  const feedBody = `${title}\n\n${content}`.trim();

  if (payload.dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      destination: "feed",
      author: displayName,
      authorUserId: louisUserId,
      title,
      bodyPreview: feedBody.slice(0, 400),
    });
  }

  try {
    const postId = crypto.randomUUID();
    const { error } = await supabaseAdmin.from("feed_posts").insert({
      id: postId,
      user_id: louisUserId,
      post_type: "thought",
      content: feedBody,
      media_url: null,
      link_url: payload.linkUrl ?? null,
      visibility: "community",
      reaction_counts: {},
      comment_count: 0,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, postId, destination: "feed", author: displayName });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "unknown" },
      { status: 500 },
    );
  }
}
