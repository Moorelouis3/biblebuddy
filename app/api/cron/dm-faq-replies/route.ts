import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { resolveLouisUserId } from "@/lib/bugReports";
import { BIBLE_BUDDY_USER_ID } from "@/lib/bibleBuddyAccount";
import { sendDirectMessage } from "@/lib/weeklyBibleReport";
import { OpenAiBudgetExceeded, assertOpenAiSpendAllowed, recordOpenAiSpend } from "@/lib/openAiBudget";
import {
  DM_REPLY_MODEL,
  buildFaqReply,
  buildWrittenReply,
  dmSystemPrompt,
  dmUserPrompt,
  parseDmDecision,
  prefilterDm,
} from "@/lib/dmFaq/answer";

/**
 * Answers Louis's DMs automatically (Louis, 2026-11-15, widened 2026-11-17:
 * "i told you i wanted my dms to be automatically answered").
 *
 * Every 15 minutes. For each person who has written to Louis and is still
 * waiting, one gpt-4o-mini call decides (lib/dmFaq/answer.ts):
 *   faq    send the approved FAQ answer word for word, with a button;
 *   reply  send a short reply the model writes in Louis's voice;
 *   leave  send nothing - Louis answers it himself.
 * Replies go out as Louis with no "automatic" label (his call, 17 Nov).
 *
 * WHAT IT LEAVES ALONE:
 *   - a thread where Louis is already talking with the person by hand (he
 *     answered something of theirs in the last 3 days), or where he has
 *     written since the message;
 *   - messages newer than 10 minutes (he may be typing) or older than 12
 *     hours (too late to feel like a reply);
 *   - problem reports, crisis words, two-word messages, plain thanks
 *     (prefilterDm, before any model call);
 *   - the Bible Buddy brand account and deleted accounts;
 *   - any thread that got an automatic message in the last 24 hours, and the
 *     same FAQ answer to the same person ever again.
 *
 * Whether Louis has OPENED the message does not matter. The first version
 * only looked at unread messages, so anything he glanced at in the app was
 * skipped for good.
 *
 * It never marks anything read. Its messages are flagged is_automated, which
 * keeps these threads out of Louis's Primary tab until he writes himself.
 *
 * SWITCH: DM_FAQ_REPLIES. "off" stops it; "shadow" decides and logs but sends
 * nothing; anything else, including unset, runs. ?dryRun=1 is shadow for one
 * run.
 *
 * Every decision is a landing_page_events row, event "dm_faq_decision", with
 * the message ids, the outcome and the reason - never the message text. That
 * row is also what stops a message being looked at twice.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DECISION_EVENT = "dm_faq_decision";
const MIN_AGE_MINUTES = 10;
const MAX_AGE_HOURS = 12;
const MAX_MODEL_CALLS_PER_RUN = 15;
const MAX_MODEL_CALLS_PER_DAY = 40;

type Incoming = { id: string; conversation_id: string; sender_id: string; content: string | null; created_at: string };

function mode(request: NextRequest): "off" | "shadow" | "on" {
  const setting = (process.env.DM_FAQ_REPLIES || "").toLowerCase();
  if (setting === "off") return "off";
  if (setting === "shadow" || request.nextUrl.searchParams.get("dryRun") === "1") return "shadow";
  return "on";
}

async function logDecision(admin: SupabaseClient, userId: string | null, metadata: Record<string, unknown>) {
  await admin
    .from("landing_page_events")
    .insert({ event_name: DECISION_EVENT, session_id: "dm_faq", user_id: userId, source: "cron", metadata })
    .then(() => null, () => null);
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const run = mode(request);
  if (run === "off") return NextResponse.json({ disabled: true });

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const louisId = await resolveLouisUserId(admin);
  if (!louisId) return NextResponse.json({ error: "Could not find Louis's account." }, { status: 500 });

  const now = Date.now();
  const newest = new Date(now - MIN_AGE_MINUTES * 60_000).toISOString();
  const oldest = new Date(now - MAX_AGE_HOURS * 3_600_000).toISOString();

  // Recent messages from anyone but Louis, read or not; then keep his threads.
  const { data: recent, error: recentError } = await admin
    .from("messages")
    .select("id, conversation_id, sender_id, content, created_at, is_automated")
    .neq("sender_id", louisId)
    .gte("created_at", oldest)
    .lte("created_at", newest)
    .order("created_at", { ascending: true })
    .limit(500);
  if (recentError) return NextResponse.json({ error: recentError.message }, { status: 500 });
  const candidates = ((recent || []) as Array<Incoming & { is_automated: boolean | null }>).filter((m) => m.is_automated !== true);
  if (candidates.length === 0) return NextResponse.json({ mode: run, looked_at: 0 });

  const conversationIds = [...new Set(candidates.map((m) => m.conversation_id))];
  const louisThreads = new Map<string, string>();
  for (let i = 0; i < conversationIds.length; i += 100) {
    const { data: conversations } = await admin
      .from("conversations")
      .select("id, user_id_1, user_id_2")
      .in("id", conversationIds.slice(i, i + 100));
    for (const c of (conversations || []) as Array<{ id: string; user_id_1: string | null; user_id_2: string | null }>) {
      if (!c.user_id_1 || !c.user_id_2) continue; // a deleted account
      if (c.user_id_1 !== louisId && c.user_id_2 !== louisId) continue;
      const other: string = c.user_id_1 === louisId ? c.user_id_2 : c.user_id_1;
      if (other === louisId || other === BIBLE_BUDDY_USER_ID) continue;
      louisThreads.set(c.id, other);
    }
  }

  // What has already been decided, and what was already sent.
  const since7d = new Date(now - 7 * 86_400_000).toISOString();
  const { data: decisions } = await admin
    .from("landing_page_events")
    .select("created_at, metadata")
    .eq("event_name", DECISION_EVENT)
    .gte("created_at", since7d)
    .limit(3000);
  const decided = new Set<string>();
  const sentToday = new Set<string>(); // conversation ids
  let modelCallsToday = 0;
  const dayAgo = now - 86_400_000;
  for (const row of (decisions || []) as Array<{ created_at: string; metadata: Record<string, unknown> | null }>) {
    const meta = row.metadata || {};
    if (typeof meta.message_id === "string") decided.add(meta.message_id);
    if (Array.isArray(meta.message_ids)) for (const id of meta.message_ids) if (typeof id === "string") decided.add(id);
    if (Date.parse(row.created_at) >= dayAgo) {
      if (meta.model_called === true) modelCallsToday += 1;
      if (String(meta.outcome || "").startsWith("sent") && typeof meta.conversation_id === "string") {
        sentToday.add(meta.conversation_id);
      }
    }
  }

  // Everything each person sent that is still waiting, oldest first.
  const waiting = new Map<string, Incoming[]>();
  for (const m of candidates) {
    if (!louisThreads.has(m.conversation_id) || decided.has(m.id)) continue;
    const list = waiting.get(m.conversation_id) || [];
    list.push(m);
    waiting.set(m.conversation_id, list);
  }

  const openAiKey = process.env.OPENAI_API_KEY;
  const openai = openAiKey ? new OpenAI({ apiKey: openAiKey }) : null;
  const systemPrompt = dmSystemPrompt();
  const results: Array<Record<string, unknown>> = [];
  let modelCallsThisRun = 0;

  for (const [conversationId, messages] of waiting) {
    const latest = messages[messages.length - 1];
    const otherId = louisThreads.get(conversationId)!;
    const base = { message_id: latest.id, message_ids: messages.map((m) => m.id), conversation_id: conversationId };
    const skip = async (reason: string) => {
      await logDecision(admin, otherId, { ...base, outcome: "skip", reason });
      results.push({ conversation_id: conversationId, outcome: "skip", reason });
    };

    // Louis has written since the first waiting message: he is handling it.
    const { data: later } = await admin
      .from("messages")
      .select("id, is_automated")
      .eq("conversation_id", conversationId)
      .eq("sender_id", louisId)
      .gt("created_at", messages[0].created_at)
      .limit(5);
    if (((later || []) as Array<{ is_automated: boolean | null }>).some((row) => row.is_automated !== true)) {
      await skip("louis_replied");
      continue;
    }

    // Louis is already in a conversation with this person by hand: he answered
    // something of theirs in the last 3 days. An automatic reply dropped into
    // that ("I did what you said but it still won't open day 2") would talk
    // over him. Found in the trial on real DMs, 15 Nov.
    const { data: thread } = await admin
      .from("messages")
      .select("sender_id, created_at, is_automated")
      .eq("conversation_id", conversationId)
      .lt("created_at", messages[0].created_at)
      .order("created_at", { ascending: false })
      .limit(30);
    const rows = (thread || []) as Array<{ sender_id: string; created_at: string; is_automated: boolean | null }>;
    const louisByHand = rows.find(
      (row) => row.sender_id === louisId && row.is_automated !== true && Date.parse(row.created_at) >= now - 3 * 86_400_000,
    );
    if (louisByHand && rows.some((row) => row.sender_id !== louisId && row.created_at < louisByHand.created_at)) {
      await skip("in_conversation_with_louis");
      continue;
    }
    if (sentToday.has(conversationId)) {
      await skip("answered_in_last_24h");
      continue;
    }

    const filtered = prefilterDm(messages.map((m) => m.content || "").join("\n"));
    if (!filtered.ok) {
      await skip(filtered.reason);
      continue;
    }

    if (!openai) break;
    if (modelCallsThisRun >= MAX_MODEL_CALLS_PER_RUN || modelCallsToday >= MAX_MODEL_CALLS_PER_DAY) break;
    try {
      await assertOpenAiSpendAllowed(admin, "dm_auto_reply", { message_id: latest.id });
    } catch (error) {
      console.error("[DM_REPLY] spending not allowed", error instanceof OpenAiBudgetExceeded ? "budget reached" : error);
      break;
    }

    const { data: profile } = await admin
      .from("profile_stats")
      .select("display_name, username")
      .eq("user_id", otherId)
      .maybeSingle();
    const name = String((profile as { display_name?: string; username?: string } | null)?.display_name || "").trim();
    const firstName = name ? name.split(/\s+/)[0] : null;

    modelCallsThisRun += 1;
    modelCallsToday += 1;
    let decision;
    try {
      const completion = await openai.chat.completions.create({
        model: DM_REPLY_MODEL,
        temperature: 0.5,
        max_tokens: 450,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: dmUserPrompt(firstName, filtered.text) },
        ],
      });
      void recordOpenAiSpend(admin, "dm_auto_reply", {
        message_id: latest.id,
        input_tokens: completion.usage?.prompt_tokens ?? null,
        output_tokens: completion.usage?.completion_tokens ?? null,
      });
      decision = parseDmDecision(completion.choices[0]?.message?.content || "");
    } catch (error) {
      console.error("[DM_REPLY] model call failed", error);
      await logDecision(admin, otherId, { ...base, outcome: "error", model_called: true });
      continue;
    }

    if (decision.kind === "leave") {
      await logDecision(admin, otherId, { ...base, outcome: "leave", reason: decision.reason, model_called: true });
      results.push({ conversation_id: conversationId, outcome: "leave", reason: decision.reason });
      continue;
    }

    let reply = decision.kind === "faq" ? buildFaqReply(decision.faqId) : buildWrittenReply(decision.text);
    const faqId = decision.kind === "faq" ? decision.faqId : null;

    if (faqId) {
      // The same FAQ answer to the same person twice would read as a bot.
      const { data: before } = await admin
        .from("landing_page_events")
        .select("metadata")
        .eq("event_name", DECISION_EVENT)
        .eq("user_id", otherId)
        .limit(300);
      const repeated = ((before || []) as Array<{ metadata: Record<string, unknown> | null }>).some(
        (row) => String(row.metadata?.outcome || "").startsWith("sent") && row.metadata?.faq_id === faqId,
      );
      if (repeated) reply = null;
    }
    if (!reply) {
      await logDecision(admin, otherId, { ...base, outcome: "skip", reason: "same_faq_sent_before", faq_id: faqId, model_called: true });
      continue;
    }

    const outcome = faqId ? "sent_faq" : "sent_reply";
    if (run === "shadow") {
      await logDecision(admin, otherId, { ...base, outcome: `would_${outcome}`, faq_id: faqId, model_called: true });
      results.push({ conversation_id: conversationId, outcome: `would_${outcome}`, faq_id: faqId, text: reply.text });
      continue;
    }

    // Claimed before sending, so an overlapping run cannot send it twice.
    await logDecision(admin, otherId, { ...base, outcome, faq_id: faqId, model_called: true });
    const ok = await sendDirectMessage(admin, louisId, "Louis", otherId, reply.text, reply.action, { automated: true });
    if (ok) sentToday.add(conversationId);
    else await logDecision(admin, otherId, { ...base, outcome: "send_failed", faq_id: faqId });
    results.push({ conversation_id: conversationId, outcome: ok ? outcome : "send_failed", faq_id: faqId });
  }

  return NextResponse.json({ mode: run, threads: waiting.size, model_calls: modelCallsThisRun, results });
}
