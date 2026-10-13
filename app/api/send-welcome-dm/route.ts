import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDirectMessagePreview, isMissingDirectMessageActionColumnError } from "@/lib/directMessageActions";

export const runtime = "nodejs";
export const maxDuration = 30;

const LOUIS_EMAIL = "moorelouis3@gmail.com";
const WELCOME_MESSAGE = `Hey, welcome to Bible Buddy 👋

My name is Louis, and I'm the one who built the app.

I created Bible Buddy because I used to struggle to actually understand what I was reading in the Bible.

It often felt like I needed notebooks, videos, commentaries, and Google searches just to understand a few verses. Even then, I still had questions.

So I decided to build something simpler.

Bible Buddy was created to help both myself and others understand the Bible and build a consistent habit of reading God's Word every day.

The goal isn't just to help you read through the Bible.

The goal is to help you actually understand what you're reading while building a daily Bible habit that lasts.

Bible Buddy is currently in beta, which means we're still actively improving the app and adding new features.

Right now, Bible Buddy is not available in the App Store or Google Play Store.

However, you can save Bible Buddy directly to your phone and use it just like a normal app.

How To Save Bible Buddy On iPhone

1. Open Safari
2. Go to mybiblebuddy.net
3. Tap the three dots at the bottom of the screen
4. Tap Share
5. Tap Add to Home Screen
6. Bible Buddy will now appear on your home screen like a normal app

How To Save Bible Buddy On Android

1. Open Chrome
2. Go to mybiblebuddy.net
3. Tap the three dots in the top right corner
4. Tap Add to Home Screen or Install App
5. Bible Buddy will now appear on your home screen like a normal app

Once you've installed Bible Buddy, I encourage you to start Day 1 of the Bible in One Year journey.

The entire app is built around helping you understand Scripture one day at a time while building a consistent Bible reading habit.

And if you ever have any questions, feedback, suggestions, bug reports, or run into any problems, feel free to send me a message.

I personally read and reply to every message I receive.

I'm excited to have you here, and I look forward to studying through the Bible together with you 🙏`;

async function resolveFounderId(supabaseUrl: string, serviceKey: string, db: any): Promise<string | null> {
  if (process.env.LOUIS_USER_ID) return process.env.LOUIS_USER_ID;

  try {
    const res = await fetch(
      `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(`email=="${LOUIS_EMAIL}"`)}`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
    );

    if (res.ok) {
      const json = await res.json();
      const found = (json?.users ?? []).find((u: any) => u.email === LOUIS_EMAIL);
      if (found?.id) return found.id;
    }
  } catch (_) {}

  try {
    const { data } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const found = (data?.users ?? []).find((u: any) => u.email === LOUIS_EMAIL);
    if (found?.id) return found.id;
  } catch (_) {}

  return null;
}

async function claimWelcomeMessage(db: any, userId: string): Promise<boolean> {
  const now = new Date().toISOString();
  const { data, error } = await db
    .from("onboarding_dm_sent")
    .upsert(
      { user_id: userId, day_number: 1, sent_at: now },
      { onConflict: "user_id,day_number", ignoreDuplicates: true },
    )
    .select("user_id")
    .single();

  if (error) {
    if (error.code === "PGRST116") return false;
    console.error(`[WELCOME_DM] Failed to claim welcome message for ${userId}:`, error.message);
    return false;
  }

  return !!data;
}

async function releaseWelcomeClaim(db: any, userId: string) {
  const { error } = await db
    .from("onboarding_dm_sent")
    .delete()
    .eq("user_id", userId)
    .eq("day_number", 1);

  if (error) {
    console.error(`[WELCOME_DM] Failed to release welcome claim for ${userId}:`, error.message);
  }
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

  const displayName = [firstName, lastName].filter(Boolean).join(" ").trim();
  if (displayName) {
    await db.from("profile_stats").upsert({ user_id: userId, display_name: displayName }, { onConflict: "user_id" });
  }

  const claimed = await claimWelcomeMessage(db, userId);
  if (!claimed) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const louisId = await resolveFounderId(supabaseUrl, serviceKey, db);
  if (!louisId) {
    console.error("[WELCOME_DM] Founder account not found.");
    await releaseWelcomeClaim(db, userId);
    return NextResponse.json({ error: "Founder account not found." }, { status: 404 });
  }

  const { data: louisProfile } = await db
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisId)
    .maybeSingle();
  const louisName = louisProfile?.display_name || louisProfile?.username || "Louis";

  const [uid1, uid2] = louisId < userId ? [louisId, userId] : [userId, louisId];

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
      await releaseWelcomeClaim(db, userId);
      return NextResponse.json({ error: "Failed to create conversation." }, { status: 500 });
    }

    conversationId = newConvo.id;
  }

  const now = new Date().toISOString();
  const preview = getDirectMessagePreview(WELCOME_MESSAGE);

  let msgResult = await db.from("messages").insert({
    conversation_id: conversationId,
    sender_id: louisId,
    content: WELCOME_MESSAGE,
    created_at: now,
  });

  if (isMissingDirectMessageActionColumnError(msgResult.error)) {
    msgResult = await db.from("messages").insert({
      conversation_id: conversationId,
      sender_id: louisId,
      content: WELCOME_MESSAGE,
      created_at: now,
    });
  }

  await db.from("conversations").update({ last_message_at: now, last_message_preview: preview }).eq("id", conversationId);

  if (msgResult.error) {
    console.error("[WELCOME_DM] Failed to insert message:", msgResult.error.message);
    await releaseWelcomeClaim(db, userId);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

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

  return NextResponse.json({
    ok: true,
    sent: "welcome_only",
    followUpsDisabled: true,
  });
}
