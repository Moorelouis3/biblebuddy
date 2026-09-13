import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BUG_STATUSES, resolveLouisUserId, sendBugReply } from "@/lib/bugReports";

// Louis's view of the bug tracker: everything reported, what the Bug Fixer
// found and changed, and the reply going back to the reporter - which he
// can edit, send now, or hold.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

async function requireLouis(request: NextRequest): Promise<{ admin: SupabaseClient } | NextResponse> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const auth = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await auth.auth.getUser(token);
  if (error || (data.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return { admin: createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } }) };
}

export async function GET(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { data, error } = await auth.admin
    .from("bug_reports")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bugs: data || [] });
}

export async function POST(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { admin } = auth;
  const body = await request.json().catch(() => null);
  const op = String(body?.op || "");
  const id = String(body?.id || "");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  try {
    if (op === "update") {
      const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (typeof body.status === "string") {
        if (!(BUG_STATUSES as readonly string[]).includes(body.status)) {
          return NextResponse.json({ error: "Unknown status." }, { status: 400 });
        }
        patch.status = body.status;
        patch.resolved_at = ["new", "fixing"].includes(body.status) ? null : new Date().toISOString();
      }
      for (const field of ["diagnosis", "fix_summary", "reply_draft", "louis_action"]) {
        if (typeof body[field] === "string") patch[field] = body[field];
      }
      if (typeof body.hold === "boolean") patch.reply_hold = body.hold;
      const { error } = await admin.from("bug_reports").update(patch).eq("id", id);
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true });
    }

    if (op === "send_reply") {
      const { data: bug } = await admin.from("bug_reports").select("*").eq("id", id).maybeSingle();
      if (!bug) return NextResponse.json({ error: "Not found." }, { status: 404 });
      if (!bug.reporter_user_id) return NextResponse.json({ error: "No reporter to reply to." }, { status: 400 });
      if (bug.reply_sent_at) return NextResponse.json({ error: "Reply already sent." }, { status: 409 });
      const content = String(body.content ?? bug.reply_draft ?? "").trim();
      if (!content) return NextResponse.json({ error: "Reply is empty." }, { status: 400 });
      const louisUserId = await resolveLouisUserId(admin);
      if (!louisUserId) throw new Error("Could not find Louis's account.");
      const conversationId = await sendBugReply(admin, {
        louisUserId,
        reporterUserId: bug.reporter_user_id,
        conversationId: bug.conversation_id,
        content,
      });
      await admin
        .from("bug_reports")
        .update({ reply_draft: content, reply_sent_at: new Date().toISOString(), conversation_id: conversationId })
        .eq("id", id);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown op." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed." }, { status: 500 });
  }
}
