import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BUG_STATUSES, logBugEvent, resolveLouisUserId, sendBugReply } from "@/lib/bugReports";

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

  const bugs = data || [];
  const ids = bugs.map((bug) => bug.id);

  // The history and everyone who reported it, in the same payload: the page
  // is one screen and should not have to ask three times.
  const [{ data: events }, { data: reporters }, { data: automation }] = await Promise.all([
    ids.length
      ? auth.admin
          .from("bug_report_events")
          .select("id, bug_id, at, actor, kind, detail, meta")
          .in("bug_id", ids)
          .order("at", { ascending: true })
          .limit(2000)
      : Promise.resolve({ data: [] as unknown[] }),
    ids.length
      ? auth.admin
          .from("bug_report_reporters")
          .select("bug_id, reporter_user_id, reporter_name, conversation_id, ack_sent_at, reply_sent_at")
          .in("bug_id", ids)
      : Promise.resolve({ data: [] as unknown[] }),
    auth.admin.from("bug_automation").select("paused, paused_at, paused_by, note").eq("id", true).maybeSingle(),
  ]);

  return NextResponse.json({
    bugs,
    events: events || [],
    reporters: reporters || [],
    automation: automation || { paused: false },
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { admin } = auth;
  const body = await request.json().catch(() => null);
  const op = String(body?.op || "");
  const id = String(body?.id || "");

  // The one op that is about the whole loop rather than a single report.
  if (op === "automation") {
    const paused = Boolean(body?.paused);
    const now = new Date().toISOString();
    const { error } = await admin.from("bug_automation").upsert({
      id: true,
      paused,
      paused_at: paused ? now : null,
      paused_by: paused ? ADMIN_EMAIL : null,
      note: typeof body?.note === "string" ? body.note.slice(0, 500) : null,
      updated_at: now,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, paused });
  }

  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  try {
    if (op === "approve" || op === "reject") {
      const approving = op === "approve";
      const now = new Date().toISOString();
      const note = typeof body.note === "string" ? body.note.slice(0, 1000) : null;
      const patch: Record<string, unknown> = approving
        ? {
            // Approved means "you may release this" - the status goes back to
            // the agent's hands so the next run can finish and the reply can
            // go out after the deploy, exactly like a routine fix.
            approved_at: now,
            approved_by: ADMIN_EMAIL,
            rejected_at: null,
            rejection_note: null,
            needs_approval: false,
            status: "fixing",
            resolved_at: null,
            updated_at: now,
          }
        : {
            rejected_at: now,
            rejection_note: note,
            approved_at: null,
            needs_approval: false,
            status: "needs_louis",
            louis_action: note || "Rejected - decide what should happen instead.",
            updated_at: now,
          };
      const { error } = await admin.from("bug_reports").update(patch).eq("id", id);
      if (error) throw new Error(error.message);
      await logBugEvent(
        admin,
        id,
        "louis",
        approving ? "approved" : "rejected",
        approving ? "Approved for release." : `Rejected${note ? `: ${note}` : "."}`,
      );
      return NextResponse.json({ ok: true });
    }

    if (op === "mark_duplicate") {
      const of = String(body.duplicateOf || "");
      if (!of) return NextResponse.json({ error: "Missing the report it duplicates." }, { status: 400 });
      const now = new Date().toISOString();
      const { error } = await admin
        .from("bug_reports")
        .update({ duplicate_of: of, status: "duplicate", resolved_at: now, updated_at: now })
        .eq("id", id);
      if (error) throw new Error(error.message);
      await logBugEvent(admin, id, "louis", "duplicate", `Marked as a duplicate of ${of}.`);
      return NextResponse.json({ ok: true });
    }

    if (op === "retry") {
      const now = new Date().toISOString();
      const { error } = await admin
        .from("bug_reports")
        .update({ status: "new", attempts: 0, last_error: null, resolved_at: null, updated_at: now })
        .eq("id", id);
      if (error) throw new Error(error.message);
      await logBugEvent(admin, id, "louis", "retry", "Put back in the queue for another attempt.");
      return NextResponse.json({ ok: true });
    }

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
      if (typeof body.status === "string") {
        await logBugEvent(admin, id, "louis", "status", `Set to ${body.status}.`);
      }
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
      await logBugEvent(admin, id, "louis", "replied", content.slice(0, 500));
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown op." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed." }, { status: 500 });
  }
}
