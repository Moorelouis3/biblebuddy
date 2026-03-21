import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOUIS_EMAIL = "moorelouis3@gmail.com";
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://biblebuddy.app").replace(/\/$/, "");
const DAY_MS = 24 * 60 * 60 * 1000;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

// ── Message templates ────────────────────────────────────────────────────────

const MSG_DAY1 = `Hey, welcome to Bible Buddy 👋🏾

my name is Louis, I'm the one who built the app

I created Bible Buddy because I used to struggle to actually understand what I was reading in the Bible

I needed multiple things… notebooks, videos, searching stuff up… and I still had questions

so I made something simpler

Bible Buddy is built to help you understand what you're reading, not just go through it

take a look around and get familiar with everything`;

const MSG_DAY2_PROFILE_DONE = (groupLink: string) =>
  `I see you got your profile set up 👀

that's perfect

next step, go check out the Bible Study Group

jump in here:
${groupLink}`;

const MSG_DAY2_NO_PROFILE = (profileLink: string) =>
  `Hey 👋🏾

quick reminder to set up your profile

it takes like 30 seconds

do that here:
${profileLink}`;

const MSG_DAY3_GROUP_VISITED = (studyLink: string) =>
  `I saw you checked out the Bible Study Group 👀

now go into the latest study and start with Week 1

start here:
${studyLink}`;

const MSG_DAY3_NO_GROUP = (groupLink: string) =>
  `Hey 👋🏾

the Bible Study Group is where everything comes together

jump in here:
${groupLink}`;

const MSG_DAY4_STUDY_STARTED =
  `I saw you started the study 👀

that's exactly how to use Bible Buddy`;

const MSG_DAY4_NO_STUDY = (studyLink: string) =>
  `Hey 👋🏾

if you're not sure where to start

go into the latest Bible study

start here:
${studyLink}`;

// ── DM sender ────────────────────────────────────────────────────────────────

async function sendDM(
  supabaseAdmin: ReturnType<typeof createClient>,
  louisId: string,
  louisName: string,
  userId: string,
  message: string,
): Promise<boolean> {
  try {
    // conversations table requires user_id_1 < user_id_2
    const [uid1, uid2] = louisId < userId ? [louisId, userId] : [userId, louisId];

    // Find or create the conversation
    const { data: existingConvo } = await supabaseAdmin
      .from("conversations")
      .select("id")
      .eq("user_id_1", uid1)
      .eq("user_id_2", uid2)
      .maybeSingle();

    let conversationId: string = existingConvo?.id;

    if (!conversationId) {
      const { data: newConvo, error: convoError } = await supabaseAdmin
        .from("conversations")
        .insert({ user_id_1: uid1, user_id_2: uid2 })
        .select("id")
        .single();

      if (convoError || !newConvo) {
        console.error("[ONBOARDING_DM] Failed to create conversation:", convoError?.message);
        return false;
      }
      conversationId = newConvo.id;
    }

    const now = new Date().toISOString();
    const preview = message.slice(0, 120);

    // Insert the message
    const { error: msgError } = await supabaseAdmin.from("messages").insert({
      conversation_id: conversationId,
      sender_id: louisId,
      content: message,
      created_at: now,
    });

    if (msgError) {
      console.error("[ONBOARDING_DM] Failed to insert message:", msgError.message);
      return false;
    }

    // Update conversation metadata
    await supabaseAdmin
      .from("conversations")
      .update({ last_message_at: now, last_message_preview: preview })
      .eq("id", conversationId);

    // Upsert notification so it surfaces in the bell / badge
    const { data: existingNotif } = await supabaseAdmin
      .from("notifications")
      .select("id")
      .eq("type", "direct_message")
      .eq("article_slug", `/messages/${conversationId}`)
      .eq("user_id", userId)
      .eq("is_read", false)
      .maybeSingle();

    if (existingNotif?.id) {
      await supabaseAdmin
        .from("notifications")
        .update({ from_user_id: louisId, from_user_name: louisName, message: preview, created_at: now })
        .eq("id", existingNotif.id);
    } else {
      await supabaseAdmin.from("notifications").insert({
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

    return true;
  } catch (err: any) {
    console.error("[ONBOARDING_DM] Unexpected error sending DM:", err?.message);
    return false;
  }
}

// ── Cron handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // ── Resolve Louis's user ID ──────────────────────────────────────────────
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers({
    perPage: 1000,
  });
  if (authError) {
    return NextResponse.json({ error: "Could not list auth users." }, { status: 500 });
  }
  const louisAuthUser = authData.users.find((u: any) => u.email === LOUIS_EMAIL);
  if (!louisAuthUser) {
    return NextResponse.json({ error: "Founder account not found." }, { status: 404 });
  }
  const louisId = louisAuthUser.id;

  // Resolve Louis's display name
  const { data: louisProfile } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisId)
    .maybeSingle();
  const louisName = louisProfile?.display_name || louisProfile?.username || "Louis";

  // ── Resolve study group deep link ────────────────────────────────────────
  const { data: groups } = await supabaseAdmin
    .from("study_groups")
    .select("id, name")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"]);

  const targetGroup =
    groups?.find((g: any) => g.name === "Bible Buddy Study Group") ??
    groups?.find((g: any) => g.name === "Hope Nation") ??
    null;

  const groupLink = targetGroup
    ? `${APP_URL}/study-groups/${targetGroup.id}/chat`
    : `${APP_URL}/study-groups`;
  const profileLink = `${APP_URL}/settings`;
  const studyLink = groupLink; // the latest study lives inside the group

  // ── Load already-sent records ────────────────────────────────────────────
  const { data: allSent } = await supabaseAdmin
    .from("onboarding_dm_sent")
    .select("user_id, day_number, sent_at");

  const sentByDay = (day: number) =>
    new Map<string, Date>(
      (allSent || [])
        .filter((r: any) => r.day_number === day)
        .map((r: any) => [r.user_id, new Date(r.sent_at)]),
    );

  const day1Sent = sentByDay(1);
  const day2Sent = sentByDay(2);
  const day3Sent = sentByDay(3);
  const day4Sent = sentByDay(4);

  const now = Date.now();
  const stats = { day1: 0, day2: 0, day3: 0, day4: 0, errors: 0 };

  // ── Day 1 — send as soon as a new user appears in profile_stats ──────────
  // Window: signed up within the last 7 days and day 1 not yet sent
  const sevenDaysAgo = new Date(now - 7 * DAY_MS).toISOString();
  const { data: newProfiles } = await supabaseAdmin
    .from("profile_stats")
    .select("user_id")
    .gte("created_at", sevenDaysAgo)
    .neq("user_id", louisId);

  for (const row of newProfiles || []) {
    if (day1Sent.has(row.user_id)) continue;

    const ok = await sendDM(supabaseAdmin, louisId, louisName, row.user_id, MSG_DAY1);
    if (ok) {
      await supabaseAdmin
        .from("onboarding_dm_sent")
        .insert({ user_id: row.user_id, day_number: 1 });
      stats.day1++;
    } else {
      stats.errors++;
    }
  }

  // ── Day 2 — 24h after day 1, branch on profile completion ───────────────
  for (const [userId, day1SentAt] of day1Sent) {
    if (day2Sent.has(userId)) continue;
    if (now - day1SentAt.getTime() < DAY_MS) continue;

    const { data: profile } = await supabaseAdmin
      .from("profile_stats")
      .select("onboarding_completed, display_name")
      .eq("user_id", userId)
      .maybeSingle();

    const profileDone =
      profile?.onboarding_completed === true || !!(profile?.display_name?.trim());
    const msg = profileDone
      ? MSG_DAY2_PROFILE_DONE(groupLink)
      : MSG_DAY2_NO_PROFILE(profileLink);

    const ok = await sendDM(supabaseAdmin, louisId, louisName, userId, msg);
    if (ok) {
      await supabaseAdmin
        .from("onboarding_dm_sent")
        .insert({ user_id: userId, day_number: 2 });
      stats.day2++;
    } else {
      stats.errors++;
    }
  }

  // ── Day 3 — 24h after day 2, branch on group visit ───────────────────────
  for (const [userId, day2SentAt] of day2Sent) {
    if (day3Sent.has(userId)) continue;
    if (now - day2SentAt.getTime() < DAY_MS) continue;

    const { data: groupVisit } = await supabaseAdmin
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .eq("action_type", "study_group_feed_viewed")
      .limit(1)
      .maybeSingle();

    const msg = groupVisit
      ? MSG_DAY3_GROUP_VISITED(studyLink)
      : MSG_DAY3_NO_GROUP(groupLink);

    const ok = await sendDM(supabaseAdmin, louisId, louisName, userId, msg);
    if (ok) {
      await supabaseAdmin
        .from("onboarding_dm_sent")
        .insert({ user_id: userId, day_number: 3 });
      stats.day3++;
    } else {
      stats.errors++;
    }
  }

  // ── Day 4 — 24h after day 3, branch on study started ────────────────────
  for (const [userId, day3SentAt] of day3Sent) {
    if (day4Sent.has(userId)) continue;
    if (now - day3SentAt.getTime() < DAY_MS) continue;

    const { data: studyAction } = await supabaseAdmin
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .in("action_type", ["series_week_started", "study_group_bible_study_card_opened"])
      .limit(1)
      .maybeSingle();

    const msg = studyAction
      ? MSG_DAY4_STUDY_STARTED
      : MSG_DAY4_NO_STUDY(studyLink);

    const ok = await sendDM(supabaseAdmin, louisId, louisName, userId, msg);
    if (ok) {
      await supabaseAdmin
        .from("onboarding_dm_sent")
        .insert({ user_id: userId, day_number: 4 });
      stats.day4++;
    } else {
      stats.errors++;
    }
  }

  return NextResponse.json({
    ok: true,
    sent: stats,
    timestamp: new Date().toISOString(),
  });
}
