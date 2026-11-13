import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BIBLE_BUDDY_USER_ID } from "@/lib/bibleBuddyAccount";
import { normalizeCustomMemberBadge } from "@/lib/userBadges";
import { routeFeedPost } from "@/lib/autoComment/router";
import { pickPrepared } from "@/lib/autoComment/prepared";
import {
  AUTO_COMMENT_MAX_OUTPUT_TOKENS,
  AUTO_COMMENT_MODEL,
  autoCommentSystemPrompt,
  autoCommentUserPrompt,
  tidyDraft,
} from "@/lib/autoComment/prompt";
import { OpenAiBudgetExceeded, assertOpenAiSpendAllowed, recordOpenAiSpend } from "@/lib/openAiBudget";

/**
 * The feed's Auto Comment button (Louis, 2026-11-13).
 *
 * It DRAFTS. Nothing in this file writes a comment: it returns text for the
 * comment box, and the owner edits it and presses Post himself. There is no
 * cron, no background run and no way to call this without being signed in as
 * the owner or a moderator.
 *
 * Two kinds of draft, chosen by lib/autoComment/router.ts:
 *
 *   prepared  routine activity posts (a finished day, an unedited trivia
 *             share). No model, no cost, instant.
 *   ai        something a person actually wrote. One gpt-4o-mini call,
 *             about $0.00007.
 *
 * The existing /api/auto-reply is left as it is: it drafts replies to
 * COMMENTS (the Auto Reply button, the comments admin). This route is for a
 * first comment on a POST, which needs the post's real fields and routing the
 * comment route never had. Both are behind the same switch.
 *
 * SWITCH: AUTO_REPLY_DRAFTS=on. Anything else and this returns 503, which is
 * how it ships: off until Louis turns it on.
 *
 * SPENDING CONTROLS, for the ai path only:
 *   - the same post cannot be drafted by the model twice within a minute
 *     (a double tap, or two tabs);
 *   - at most MAX_AI_DRAFTS_PER_DAY a day, which at the rounded-up estimate
 *     is one cent;
 *   - the monthly OpenAI gate in lib/openAiBudget.ts, shared with Lil Louis
 *     and the audio Bible, has to agree;
 *   - output is capped at 120 tokens.
 *
 * Every draft, prepared or ai, is written to landing_page_events as
 * `auto_comment_draft`, so "is anybody using this?" has an answer next time.
 * The row records which post, which route and which kind - never the post's
 * text and never the draft.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";
const DRAFT_EVENT = "auto_comment_draft";
const MAX_AI_DRAFTS_PER_DAY = 50;
const SAME_POST_COOLDOWN_SECONDS = 60;

const DRAFTS_ON = (process.env.AUTO_REPLY_DRAFTS || "").toLowerCase() === "on";

function startOfUtcDay() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
}

/** What the requester has said lately, so a prepared line is not one he just used. */
async function recentlySaid(admin: SupabaseClient, requesterId: string, authorId: string): Promise<string[]> {
  const said: string[] = [];
  const { data: mine } = await admin
    .from("feed_post_comments")
    .select("content")
    .eq("user_id", requesterId)
    .order("created_at", { ascending: false })
    .limit(15);
  for (const row of mine || []) said.push(String(row.content ?? ""));

  // And anything already said under this person's recent posts, however long
  // ago: seeing the same line twice on your own wall is what reads as a bot.
  const { data: theirPosts } = await admin
    .from("feed_posts")
    .select("id")
    .eq("user_id", authorId)
    .order("created_at", { ascending: false })
    .limit(20);
  const postIds = (theirPosts || []).map((row) => String(row.id));
  if (postIds.length) {
    const { data: onTheirs } = await admin
      .from("feed_post_comments")
      .select("content")
      .eq("user_id", requesterId)
      .in("post_id", postIds)
      .limit(40);
    for (const row of onTheirs || []) said.push(String(row.content ?? ""));
  }
  return said;
}

async function logDraft(admin: SupabaseClient, requesterId: string, metadata: Record<string, unknown>) {
  await admin
    .from("landing_page_events")
    .insert({ event_name: DRAFT_EVENT, session_id: "auto_comment", user_id: requesterId, source: "app", metadata })
    .then(() => null, () => null);
}

export async function POST(request: NextRequest) {
  if (!DRAFTS_ON) {
    return NextResponse.json({ error: "Auto Comment is turned off.", disabled: true }, { status: 503 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const postId = typeof body?.postId === "string" ? body.postId.trim() : "";
  const turn = Number.isInteger(body?.turn) ? Math.max(0, Number(body.turn)) : 0;
  if (!postId) return NextResponse.json({ error: "Missing post." }, { status: 400 });

  const authClient = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData, error: userError } = await authClient.auth.getUser(token);
  if (userError || !userData.user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const requesterId = userData.user.id;

  const admin: SupabaseClient = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: profile } = await admin.from("profile_stats").select("member_badge").eq("user_id", requesterId).maybeSingle();
  const isAdmin = (userData.user.email || "").toLowerCase() === ADMIN_EMAIL;
  const isModerator = normalizeCustomMemberBadge(profile?.member_badge) === "moderator";
  if (!isAdmin && !isModerator) {
    return NextResponse.json({ error: "Auto Comment is only available to admins and moderators." }, { status: 403 });
  }

  // The post is read here, from the database, not taken from the browser:
  // what gets routed and sent to a model is what is actually stored.
  const { data: post, error: postError } = await admin
    .from("feed_posts")
    .select("id, user_id, post_type, content, verse_ref, verse_text")
    .eq("id", postId)
    .maybeSingle();
  if (postError) return NextResponse.json({ error: "Could not load that post." }, { status: 500 });
  if (!post) return NextResponse.json({ error: "That post no longer exists." }, { status: 404 });

  const decision = routeFeedPost(
    {
      user_id: String(post.user_id),
      post_type: post.post_type as string | null,
      content: post.content as string | null,
      verse_ref: post.verse_ref as string | null,
      verse_text: post.verse_text as string | null,
    },
    [requesterId, BIBLE_BUDDY_USER_ID],
  );

  if (decision.route === "none") {
    return NextResponse.json({ route: "none", reply: "", message: decision.reason });
  }

  if (decision.route === "prepared") {
    const avoid = await recentlySaid(admin, requesterId, String(post.user_id)).catch(() => [] as string[]);
    const reply = pickPrepared(decision.kind, decision.fields, { seed: postId, avoid, turn });
    await logDraft(admin, requesterId, { post_id: postId, route: "prepared", kind: decision.kind });
    return NextResponse.json({ route: "prepared", kind: decision.kind, reply });
  }

  // ---- ai ----
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) return NextResponse.json({ error: "Server not configured for AI drafts." }, { status: 500 });

  // Both checks read the same rows. If the ledger cannot be read, the monthly
  // gate below still stands between this and an open-ended bill.
  const { data: todays, error: todaysError } = await admin
    .from("landing_page_events")
    .select("created_at, metadata")
    .eq("event_name", DRAFT_EVENT)
    .gte("created_at", startOfUtcDay())
    .limit(1000);
  if (!todaysError) {
    const aiToday = (todays || []).filter((row) => (row.metadata as { route?: string } | null)?.route === "ai");
    const cooldownStart = Date.now() - SAME_POST_COOLDOWN_SECONDS * 1000;
    const justDrafted = aiToday.some(
      (row) =>
        (row.metadata as { post_id?: string } | null)?.post_id === postId && Date.parse(String(row.created_at)) >= cooldownStart,
    );
    if (justDrafted) {
      return NextResponse.json(
        { error: "A draft for this post was made a moment ago. Give it a minute before asking for another." },
        { status: 429 },
      );
    }
    if (aiToday.length >= MAX_AI_DRAFTS_PER_DAY) {
      return NextResponse.json(
        { error: `Today's limit of ${MAX_AI_DRAFTS_PER_DAY} AI drafts has been reached. Prepared replies still work.` },
        { status: 429 },
      );
    }
  }

  try {
    await assertOpenAiSpendAllowed(admin, "feed_auto_comment_draft", { post_id: postId });
  } catch (error) {
    if (error instanceof OpenAiBudgetExceeded) {
      return NextResponse.json({ error: "This month's OpenAI budget has been reached, so no AI draft was made." }, { status: 429 });
    }
    return NextResponse.json({ error: "AI drafts are not allowed right now." }, { status: 503 });
  }

  // Claimed before the call, so a second tap that arrives while the first is
  // still waiting on OpenAI is caught by the cooldown above.
  await logDraft(admin, requesterId, { post_id: postId, route: "ai", careful: decision.careful, model: AUTO_COMMENT_MODEL });

  try {
    const openai = new OpenAI({ apiKey: openAiKey });
    const completion = await openai.chat.completions.create({
      model: AUTO_COMMENT_MODEL,
      temperature: 0.7,
      max_tokens: AUTO_COMMENT_MAX_OUTPUT_TOKENS,
      messages: [
        { role: "system", content: autoCommentSystemPrompt(decision.careful) },
        { role: "user", content: autoCommentUserPrompt(decision) },
      ],
    });
    void recordOpenAiSpend(admin, "feed_auto_comment_draft", {
      post_id: postId,
      input_tokens: completion.usage?.prompt_tokens ?? null,
      output_tokens: completion.usage?.completion_tokens ?? null,
    });

    const reply = tidyDraft(completion.choices[0]?.message?.content || "", decision.careful, decision.text);
    if (!reply) return NextResponse.json({ error: "Could not write a draft for this post." }, { status: 500 });
    return NextResponse.json({ route: "ai", careful: decision.careful, reply });
  } catch (error) {
    console.error("[AUTO_COMMENT] draft failed", error);
    return NextResponse.json({ error: "Could not write a draft right now." }, { status: 500 });
  }
}
