import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { resolveLouisUserId } from "@/lib/bugReports";
import { BIBLE_BUDDY_USER_ID } from "@/lib/bibleBuddyAccount";
import { sendDirectMessage } from "@/lib/weeklyBibleReport";
import { OpenAiBudgetExceeded, assertOpenAiSpendAllowed, recordOpenAiSpend } from "@/lib/openAiBudget";
import {
  DM_FAQ_MIN_CONFIDENCE,
  DM_FAQ_MODEL,
  buildDmReply,
  classifierSystemPrompt,
  parseClassification,
  prefilterDm,
} from "@/lib/dmFaq/answer";

/**
 * Answers common DMs to Louis with the FAQ (Louis, 2026-11-15).
 *
 * Every 15 minutes. For each conversation where somebody has written to Louis
 * and is still waiting, it asks one question of gpt-4o-mini - which FAQ entry
 * is this, if any - and, when the answer is confident, sends that entry's
 * approved text as Louis with a button to the full answer. lib/dmFaq/answer.ts
 * explains why the model only ever picks and never writes.
 *
 * WHAT IT LEAVES ALONE, so Louis's inbox is never answered over his head:
 *   - a thread where Louis is already talking with the person by hand (he
 *     answered something of theirs in the last 3 days);
 *   - a message Louis has already answered by hand, or one newer than 10
 *     minutes (he may be typing) or older than 12 hours (too late to help);
 *   - problem reports, greetings, thanks, and long personal messages
 *     (prefilterDm, before any model call);
 *   - the Bible Buddy brand account and deleted accounts;
 *   - any conversation that got an automatic answer in the last 24 hours, and
 *     the same answer to the same person ever again - a second identical
 *     reply is what would read as a bot.
 *
 * It does NOT mark the person's message read. Louis still sees it; the thread
 * just shows that it has been answered. Its replies are flagged is_automated,
 * which keeps these threads out of his Primary tab until he writes himself.
 *
 * SWITCH: DM_FAQ_REPLIES. "off" stops it; "shadow" decides and logs but sends
 * nothing; anything else, including unset, runs. ?dryRun=1 does the same as
 * shadow for one run.
 *
 * Every decision is one landing_page_events row, event "dm_faq_decision",
 * with the message id, the outcome and the FAQ id - never the message text.
 * That row is also what stops a message being looked at twice.
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

  // Recent messages from anyone but Louis, then keep the ones in his threads.
  const { data: recent, error: recentError } = await admin
    .from("messages")
    .select("id, conversation_id, sender_id, content, created_at, is_automated")
    .neq("sender_id", louisId)
    .is("read_at", null)
    .gte("created_at", oldest)
    .lte("created_at", newest)
    .order("created_at", { ascending: false })
    .limit(300);
  if (recentError) return NextResponse.json({ error: recentError.message }, { status: 500 });
  const candidates = ((recent || []) as Array<Incoming & { is_automated: boolean | null }>).filter((m) => m.is_automated !== true);
  if (candidates.length === 0) return NextResponse.json({ mode: run, looked_at: 0 });

  const conversationIds = [...new Set(candidates.map((m) => m.conversation_id))];
  const { data: conversations } = await admin
    .from("conversations")
    .select("id, user_id_1, user_id_2")
    .in("id", conversationIds);
  const louisThreads = new Map<string, string>();
  for (const c of (conversations || []) as Array<{ id: string; user_id_1: string | null; user_id_2: string | null }>) {
    if (!c.user_id_1 || !c.user_id_2) continue; // a deleted account
    if (c.user_id_1 !== louisId && c.user_id_2 !== louisId) continue;
    const other: string = c.user_id_1 === louisId ? c.user_id_2 : c.user_id_1;
    if (other === louisId || other === BIBLE_BUDDY_USER_ID) continue;
    louisThreads.set(c.id, other);
  }

  // What has already been decided, and what was already sent.
  const since7d = new Date(now - 7 * 86_400_000).toISOString();
  const { data: decisions } = await admin
    .from("landing_page_events")
    .select("user_id, created_at, metadata")
    .eq("event_name", DECISION_EVENT)
    .gte("created_at", since7d)
    .limit(2000);
  const decided = new Set<string>();
  const sentToday = new Set<string>(); // conversation ids
  let modelCallsToday = 0;
  const dayAgo = now - 86_400_000;
  for (const row of (decisions || []) as Array<{ created_at: string; metadata: Record<string, unknown> | null }>) {
    const meta = row.metadata || {};
    if (typeof meta.message_id === "string") decided.add(meta.message_id);
    if (Date.parse(row.created_at) >= dayAgo) {
      if (meta.model_called === true) modelCallsToday += 1;
      if (meta.outcome === "sent" && typeof meta.conversation_id === "string") sentToday.add(meta.conversation_id);
    }
  }

  // One message per thread: the latest one still waiting.
  const latestPerThread = new Map<string, Incoming>();
  for (const m of candidates) {
    if (!louisThreads.has(m.conversation_id)) continue;
    if (!latestPerThread.has(m.conversation_id)) latestPerThread.set(m.conversation_id, m);
  }

  const openAiKey = process.env.OPENAI_API_KEY;
  const openai = openAiKey ? new OpenAI({ apiKey: openAiKey }) : null;
  const systemPrompt = classifierSystemPrompt();
  const results: Array<Record<string, unknown>> = [];
  let modelCallsThisRun = 0;

  for (const [conversationId, message] of latestPerThread) {
    if (decided.has(message.id)) continue;
    const otherId = louisThreads.get(conversationId)!;
    const base = { message_id: message.id, conversation_id: conversationId };

    // Louis has written since this message: he is handling it.
    const { data: later } = await admin
      .from("messages")
      .select("id")
      .eq("conversation_id", conversationId)
      .eq("sender_id", louisId)
      .gt("created_at", message.created_at)
      .limit(1);
    if ((later || []).length > 0) {
      await logDecision(admin, otherId, { ...base, outcome: "skip", reason: "louis_replied" });
      continue;
    }
    // Louis is already in a conversation with this person: he wrote by hand
    // in the last 3 days, answering something they had written him. An FAQ
    // answer dropped into that ("I did what you said but it still won't open
    // day 2") would talk over him. Found in the trial on real DMs, 15 Nov.
    const { data: thread } = await admin
      .from("messages")
      .select("sender_id, created_at, is_automated")
      .eq("conversation_id", conversationId)
      .lt("created_at", message.created_at)
      .order("created_at", { ascending: false })
      .limit(30);
    const rows = (thread || []) as Array<{ sender_id: string; created_at: string; is_automated: boolean | null }>;
    const louisByHand = rows.find(
      (row) => row.sender_id === louisId && row.is_automated !== true && Date.parse(row.created_at) >= now - 3 * 86_400_000,
    );
    if (louisByHand && rows.some((row) => row.sender_id !== louisId && row.created_at < louisByHand.created_at)) {
      await logDecision(admin, otherId, { ...base, outcome: "skip", reason: "in_conversation_with_louis" });
      continue;
    }
    if (sentToday.has(conversationId)) {
      await logDecision(admin, otherId, { ...base, outcome: "skip", reason: "answered_in_last_24h" });
      continue;
    }

    const filtered = prefilterDm(message.content || "");
    if (!filtered.ok) {
      await logDecision(admin, otherId, { ...base, outcome: "skip", reason: filtered.reason });
      results.push({ ...base, outcome: "skip", reason: filtered.reason });
      continue;
    }

    if (!openai) break;
    if (modelCallsThisRun >= MAX_MODEL_CALLS_PER_RUN || modelCallsToday >= MAX_MODEL_CALLS_PER_DAY) break;
    try {
      await assertOpenAiSpendAllowed(admin, "dm_faq_classify", { message_id: message.id });
    } catch (error) {
      if (error instanceof OpenAiBudgetExceeded) break;
      break;
    }

    modelCallsThisRun += 1;
    modelCallsToday += 1;
    let faqId: string | null = null;
    let confidence = 0;
    try {
      const completion = await openai.chat.completions.create({
        model: DM_FAQ_MODEL,
        temperature: 0,
        max_tokens: 40,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: filtered.text },
        ],
      });
      void recordOpenAiSpend(admin, "dm_faq_classify", {
        message_id: message.id,
        input_tokens: completion.usage?.prompt_tokens ?? null,
        output_tokens: completion.usage?.completion_tokens ?? null,
      });
      ({ faqId, confidence } = parseClassification(completion.choices[0]?.message?.content || ""));
    } catch (error) {
      console.error("[DM_FAQ] classify failed", error);
      await logDecision(admin, otherId, { ...base, outcome: "error", model_called: true });
      continue;
    }

    if (!faqId || confidence < DM_FAQ_MIN_CONFIDENCE) {
      await logDecision(admin, otherId, { ...base, outcome: "none", faq_id: faqId, confidence, model_called: true });
      results.push({ ...base, outcome: "none", faq_id: faqId, confidence });
      continue;
    }

    // The same answer to the same person, ever, would read as a bot.
    const { data: before } = await admin
      .from("landing_page_events")
      .select("id, metadata")
      .eq("event_name", DECISION_EVENT)
      .eq("user_id", otherId)
      .limit(200);
    const alreadySentThis = ((before || []) as Array<{ metadata: Record<string, unknown> | null }>).some(
      (row) => row.metadata?.outcome === "sent" && row.metadata?.faq_id === faqId,
    );
    if (alreadySentThis) {
      await logDecision(admin, otherId, { ...base, outcome: "skip", reason: "same_answer_sent_before", faq_id: faqId, confidence, model_called: true });
      continue;
    }

    const reply = buildDmReply(faqId);
    if (!reply) continue;

    if (run === "shadow") {
      await logDecision(admin, otherId, { ...base, outcome: "would_send", faq_id: faqId, confidence, model_called: true });
      results.push({ ...base, outcome: "would_send", faq_id: faqId, confidence });
      continue;
    }

    // Claimed before sending, so an overlapping run cannot send it twice.
    await logDecision(admin, otherId, { ...base, outcome: "sent", faq_id: faqId, confidence, model_called: true });
    const ok = await sendDirectMessage(admin, louisId, "Louis", otherId, reply.text, reply.action, { automated: true });
    if (!ok) {
      await logDecision(admin, otherId, { ...base, outcome: "send_failed", faq_id: faqId });
    } else {
      sentToday.add(conversationId);
    }
    results.push({ ...base, outcome: ok ? "sent" : "send_failed", faq_id: faqId, confidence });
  }

  return NextResponse.json({ mode: run, threads: latestPerThread.size, model_calls: modelCallsThisRun, results });
}
