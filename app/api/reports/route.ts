import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// User reports for community content (2026-09-21, App Store guideline 1.2).
// Stored in buddy_reports; what was reported is encoded at the start of
// `reason`, e.g. "[group_post:<uuid>] Harassment or bullying — note".
// Louis reviews them at /admin/reports.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REPORT_CONTENT_TYPES = [
  "group_post",
  "group_comment",
  "series_comment",
  "comment",
  "profile",
  "event_member",
  "message",
] as const;

const REPORT_REASONS = [
  "Spam",
  "Harassment or bullying",
  "Hate speech",
  "Sexual content",
  "Violence or threats",
  "False information",
  "Something else",
];

const MAX_REPORTS_PER_HOUR = 30;

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  if (!token) return NextResponse.json({ error: "Please sign in to report." }, { status: 401 });

  const authClient = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: authData, error: authError } = await authClient.auth.getUser(token);
  const reporterId = authData.user?.id;
  if (authError || !reporterId) return NextResponse.json({ error: "Please sign in to report." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const reportedUserId = clean(body?.reportedUserId, 64);
  const contentType = clean(body?.contentType, 32);
  const contentId = clean(body?.contentId, 200).replace(/[\[\]]/g, "");
  const reason = clean(body?.reason, 60);
  const note = clean(body?.note, 1000);
  const conversationId = clean(body?.conversationId, 64) || null;

  if (!/^[0-9a-f-]{36}$/i.test(reportedUserId)) {
    return NextResponse.json({ error: "Missing the person being reported." }, { status: 400 });
  }
  if (reportedUserId === reporterId) {
    return NextResponse.json({ error: "You can't report yourself." }, { status: 400 });
  }
  if (!(REPORT_CONTENT_TYPES as readonly string[]).includes(contentType)) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
  }
  if (!REPORT_REASONS.includes(reason)) {
    return NextResponse.json({ error: "Pick a reason." }, { status: 400 });
  }
  if (conversationId && !/^[0-9a-f-]{36}$/i.test(conversationId)) {
    return NextResponse.json({ error: "Bad conversation id." }, { status: 400 });
  }

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await admin
    .from("buddy_reports")
    .select("id", { count: "exact", head: true })
    .eq("reporter_user_id", reporterId)
    .gte("created_at", since);
  if ((count ?? 0) >= MAX_REPORTS_PER_HOUR) {
    return NextResponse.json({ error: "You've sent a lot of reports. Please try again later." }, { status: 429 });
  }

  const tag = contentId ? `[${contentType}:${contentId}]` : `[${contentType}]`;
  const storedReason = `${tag} ${reason}${note ? ` — ${note}` : ""}`;

  const { error } = await admin.from("buddy_reports").insert({
    reporter_user_id: reporterId,
    reported_user_id: reportedUserId,
    conversation_id: conversationId,
    reason: storedReason,
  });
  if (error) {
    console.error("[REPORTS] Insert error:", error);
    return NextResponse.json({ error: "Could not send the report. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
