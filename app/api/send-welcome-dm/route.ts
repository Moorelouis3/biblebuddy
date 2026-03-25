import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDirectMessagePreview, isMissingDirectMessageActionColumnError } from "@/lib/directMessageActions";

export const runtime = "nodejs";
// Give the function up to 30 seconds (Vercel Pro / Hobby max)
export const maxDuration = 30;

const LOUIS_EMAIL = "moorelouis3@gmail.com";
const MSG_DAY1 = `Hey, welcome to Bible Buddy 👋🏾

my name is Louis, I'm the one who built the app

I created Bible Buddy because I used to struggle to actually understand what I was reading in the Bible

I needed multiple things… notebooks, videos, searching stuff up… and I still had questions

so I made something simpler

Bible Buddy is built to help you understand what you're reading, not just go through it

take a look around and get familiar with everything`;

// ── Resolve Louis's user ID ───────────────────────────────────────────────
// Fastest path: LOUIS_USER_ID env var (set once in Vercel → zero DB calls).
// Fallback: scan profile_stats for the founder email's user_id via a
//           direct HTTP call to the Supabase auth admin endpoint (much
//           faster than fetching 1000+ users with listUsers).
async function resolveFounderId(supabaseUrl: string, serviceKey: string, db: any): Promise<string | null> {
  // 1. Env var — instant
  if (process.env.LOUIS_USER_ID) return process.env.LOUIS_USER_ID;

  // 2. Supabase auth REST API filtered by email — returns 1 user, not 1000
  try {
    const res = await fetch(
      `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(`email=="${LOUIS_EMAIL}"`)}`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    if (res.ok) {
      const json = await res.json();
      const found = (json?.users ?? []).find((u: any) => u.email === LOUIS_EMAIL);
      if (found?.id) return found.id;
    }
  } catch (_) {}

  // 3. Last resort: listUsers page 1 (Louis is an early user)
  try {
    const { data } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const found = (data?.users ?? []).find((u: any) => u.email === LOUIS_EMAIL);
    if (found?.id) return found.id;
  } catch (_) {}

  return null;
}

export async function POST(request: NextRequest) {
  let userId: string;
  let firstName: string | undefined;
  let lastName: string | undefined;
  try {
    const body = await request.json();
    userId = body.userId;
    firstName = body.firstName;
    lastName = body.lastName;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: "userId is required." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const db: any = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Set display_name in profile_stats
  const displayName = [firstName, lastName].filter(Boolean).join(" ").trim();
  if (displayName) {
    await db.from("profile_stats").upsert(
      { user_id: userId, display_name: displayName },
      { onConflict: "user_id" }
    );
  }

  // Check if day 1 already sent (do this before the expensive founder lookup)
  const { data: alreadySent } = await db
    .from("onboarding_dm_sent")
    .select("id")
    .eq("user_id", userId)
    .eq("day_number", 1)
    .maybeSingle();

  if (alreadySent) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  // Resolve Louis's user ID (fast path first)
  const louisId = await resolveFounderId(supabaseUrl, serviceKey, db);
  if (!louisId) {
    console.error("[WELCOME_DM] Founder account not found.");
    return NextResponse.json({ error: "Founder account not found." }, { status: 404 });
  }

  // Resolve Louis's display name
  const { data: louisProfile } = await db
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisId)
    .maybeSingle();
  const louisName = louisProfile?.display_name || louisProfile?.username || "Louis";

  // conversations table requires user_id_1 < user_id_2
  const [uid1, uid2] = louisId < userId ? [louisId, userId] : [userId, louisId];

  // Find or create conversation
  const { data: existingConvo } = await db
    .from("conversations")
    .select("id")
    .eq("user_id_1", uid1)
    .eq("user_id_2", uid2)
    .maybeSingle();

  let conversationId: string = existingConvo?.id;

  if (!conversationId) {
    const { data: newConvo, error: convoError } = await db
      .from("conversations")
      .insert({ user_id_1: uid1, user_id_2: uid2 })
      .select("id")
      .single();

    if (convoError || !newConvo) {
      console.error("[WELCOME_DM] Failed to create conversation:", convoError?.message);
      return NextResponse.json({ error: "Failed to create conversation." }, { status: 500 });
    }
    conversationId = newConvo.id;
  }

  const now = new Date().toISOString();
  const preview = getDirectMessagePreview(MSG_DAY1);

  // Insert message + update convo + upsert notification in parallel
  let msgResult = await db.from("messages").insert({
    conversation_id: conversationId,
    sender_id: louisId,
    content: MSG_DAY1,
    created_at: now,
  });

  if (isMissingDirectMessageActionColumnError(msgResult.error)) {
    msgResult = await db.from("messages").insert({
      conversation_id: conversationId,
      sender_id: louisId,
      content: MSG_DAY1,
      created_at: now,
    });
  }

  await db.from("conversations")
    .update({ last_message_at: now, last_message_preview: preview })
    .eq("id", conversationId);

  if (msgResult.error) {
    console.error("[WELCOME_DM] Failed to insert message:", msgResult.error.message);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  // Upsert notification
  const { data: existingNotif } = await db
    .from("notifications")
    .select("id")
    .eq("type", "direct_message")
    .eq("article_slug", `/messages/${conversationId}`)
    .eq("user_id", userId)
    .eq("is_read", false)
    .maybeSingle();

  if (existingNotif?.id) {
    await db
      .from("notifications")
      .update({ from_user_id: louisId, from_user_name: louisName, message: preview, created_at: now })
      .eq("id", existingNotif.id);
  } else {
    await db.from("notifications").insert({
      user_id: userId,
      type: "direct_message",
      from_user_id: louisId,
      from_user_name: louisName,
      article_slug: `/messages/${conversationId}`,
      message: preview,
      is_read: false,
      created_at: now,
    });
  }

  // Mark day 1 sent
  await db.from("onboarding_dm_sent").insert({ user_id: userId, day_number: 1 });

  return NextResponse.json({ ok: true });
}
