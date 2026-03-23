import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const LOUIS_EMAIL = "moorelouis3@gmail.com";
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://biblebuddy.app").replace(/\/$/, "");

const MSG_DAY1 = `Hey, welcome to Bible Buddy 👋🏾

my name is Louis, I'm the one who built the app

I created Bible Buddy because I used to struggle to actually understand what I was reading in the Bible

I needed multiple things… notebooks, videos, searching stuff up… and I still had questions

so I made something simpler

Bible Buddy is built to help you understand what you're reading, not just go through it

take a look around and get familiar with everything`;

export async function POST(request: NextRequest) {
  let userId: string;
  try {
    const body = await request.json();
    userId = body.userId;
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

  // Resolve Louis's user ID
  const { data: authData, error: authError } = await db.auth.admin.listUsers({ perPage: 1000 });
  if (authError) {
    return NextResponse.json({ error: "Could not list auth users." }, { status: 500 });
  }
  const louisAuthUser = authData.users.find((u: any) => u.email === LOUIS_EMAIL);
  if (!louisAuthUser) {
    return NextResponse.json({ error: "Founder account not found." }, { status: 404 });
  }
  const louisId = louisAuthUser.id;

  // Resolve Louis's display name
  const { data: louisProfile } = await db
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisId)
    .maybeSingle();
  const louisName = louisProfile?.display_name || louisProfile?.username || "Louis";

  // Check if day 1 already sent
  const { data: alreadySent } = await db
    .from("onboarding_dm_sent")
    .select("id")
    .eq("user_id", userId)
    .eq("day_number", 1)
    .maybeSingle();

  if (alreadySent) {
    return NextResponse.json({ ok: true, skipped: true });
  }

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
  const preview = MSG_DAY1.slice(0, 120);

  // Insert the message
  const { error: msgError } = await db.from("messages").insert({
    conversation_id: conversationId,
    sender_id: louisId,
    content: MSG_DAY1,
    created_at: now,
  });

  if (msgError) {
    console.error("[WELCOME_DM] Failed to insert message:", msgError.message);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  // Update conversation metadata
  await db
    .from("conversations")
    .update({ last_message_at: now, last_message_preview: preview })
    .eq("id", conversationId);

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
