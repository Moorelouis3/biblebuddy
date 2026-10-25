import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { resolveLouisUserId } from "@/lib/bugReports";

/**
 * The Inbox Watch routine's door into Louis's DMs (2026-10-25).
 *
 * Vickie James reported that 21 Women would not let her past day 1. The
 * message sat in Louis's DMs for hours and he found it himself, by chance.
 * Nothing watches that inbox - the Bug Fixer only ever looks at bug_reports,
 * and only twice a day - so "I need DMs and bugs being checked like hourly".
 *
 * Same shape as app/api/bug-reports/agent: the cloud routine's clone has no
 * Supabase keys, so it reads through here with BUG_AGENT_TOKEN. Reusing that
 * token rather than minting a second one is deliberate - one secret to rotate,
 * and both callers are the same trust level: Louis's own automation.
 *
 * READ ONLY, and only Louis's own conversations. There is no write path here
 * at all, and the query is anchored to conversations he is a participant in,
 * so this can never hand back two other members' private messages to each
 * other. That constraint is the whole security model of this file - if you
 * widen the query, you have broken it.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** How far back to look when the caller does not say. */
const DEFAULT_WINDOW_MINUTES = 90;
const MAX_WINDOW_MINUTES = 60 * 24 * 7;
const MAX_MESSAGES = 50;
/** Enough for the routine to triage without shipping whole conversations. */
const EXCERPT_CHARS = 600;

function authorized(request: NextRequest) {
  const expected = process.env.BUG_AGENT_TOKEN || "";
  const given = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!expected || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const admin = adminClient();
  const louisId = await resolveLouisUserId(admin);
  if (!louisId) {
    return NextResponse.json({ error: "Could not resolve the owner account." }, { status: 500 });
  }

  const requested = Number(new URL(request.url).searchParams.get("minutes"));
  const minutes = Number.isFinite(requested) && requested > 0
    ? Math.min(requested, MAX_WINDOW_MINUTES)
    : DEFAULT_WINDOW_MINUTES;
  const since = new Date(Date.now() - minutes * 60_000).toISOString();

  // Recent unread first, THEN keep only the ones in a conversation Louis is
  // part of.
  //
  // The obvious way round - list his conversations and filter messages by
  // those ids - does not work here: he is in 7,159 of them, and PostgREST
  // answers a URL carrying 7,159 UUIDs with a bare 400. Asking for the window
  // first keeps both queries small, because an hour of unread messages is a
  // handful of rows however many conversations exist.
  const { data: candidates, error } = await admin
    .from("messages")
    .select("id, conversation_id, sender_id, content, created_at, is_automated")
    .neq("sender_id", louisId)
    .is("read_at", null)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(MAX_MESSAGES * 4);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const candidateRows = candidates || [];
  if (!candidateRows.length) {
    return NextResponse.json({ window_minutes: minutes, unread_count: 0, automated_unread_count: 0, messages: [] });
  }

  // The participation check, and the only thing standing between this
  // endpoint and two other members' private messages. Never remove it.
  const { data: conversations, error: conversationError } = await admin
    .from("conversations")
    .select("id, user_id_1, user_id_2")
    .in("id", [...new Set(candidateRows.map((row) => row.conversation_id))]);

  if (conversationError) {
    return NextResponse.json({ error: conversationError.message }, { status: 500 });
  }

  const louisIsIn = new Set(
    (conversations || [])
      .filter((row) => row.user_id_1 === louisId || row.user_id_2 === louisId)
      .map((row) => row.id),
  );
  const rows = candidateRows.filter((row) => louisIsIn.has(row.conversation_id)).slice(0, MAX_MESSAGES);

  // The app's own automated DMs (welcome notes, nudges) are not somebody
  // waiting for an answer, so they are reported separately rather than
  // dropped - a flood of them is itself worth noticing.
  const all = rows || [];
  const fromPeople = all.filter((row) => row.is_automated !== true);

  const senderIds = [...new Set(fromPeople.map((row) => row.sender_id))];
  const names = new Map<string, string>();
  if (senderIds.length) {
    const { data: profiles } = await admin
      .from("profile_stats")
      .select("user_id, display_name, username")
      .in("user_id", senderIds);
    for (const profile of profiles || []) {
      names.set(profile.user_id, profile.display_name || profile.username || "Someone");
    }
  }

  const messages = fromPeople.map((row) => {
    const body = String(row.content || "").trim();
    return {
      id: row.id,
      from: names.get(row.sender_id) || "Someone",
      sender_id: row.sender_id,
      sent_at: row.created_at,
      conversation_id: row.conversation_id,
      // Where Louis opens it. Relative on purpose: the routine may be
      // reporting into a file rather than a browser.
      open_at: `/messages/${row.conversation_id}`,
      /** Reports arrive through the Report Problem card as a DM like any other. */
      looks_like_problem_report: /^problem report/i.test(body),
      excerpt: body.length > EXCERPT_CHARS ? `${body.slice(0, EXCERPT_CHARS - 1)}…` : body,
    };
  });

  return NextResponse.json({
    window_minutes: minutes,
    unread_count: messages.length,
    automated_unread_count: all.length - fromPeople.length,
    messages,
  });
}
