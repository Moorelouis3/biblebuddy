import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { logBugEvent, resolveLouisUserId, sendBugReply } from "@/lib/bugReports";

// Sends the Bug Fixer's replies to the people who reported bugs. Runs at
// 08:45 and 16:45 UTC, after the 08:00/16:00 Deploy routine has put the
// fixes live, so nobody is told "fixed" before it actually is. Louis can
// edit a reply or hold it at /admin/bugs any time before then.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const dryRun = request.nextUrl.searchParams.get("dryRun") === "1";

  // Finished at least 30 minutes ago, so a fix from this morning's run has
  // been through a deploy and Louis had a window to look.
  const cutoff = new Date(Date.now() - 30 * 60_000).toISOString();
  const { data: ready, error } = await admin
    .from("bug_reports")
    .select("id, reporter_user_id, conversation_id, reply_draft")
    // needs_info is in here because it is a question, not a claim: "can you
    // tell me what you tapped?" should reach people the same day. Anything
    // still awaiting approval is deliberately absent - nobody is told a fix
    // is out before Louis has let it out.
    .in("status", ["fixed", "needs_louis", "not_a_bug", "duplicate", "cannot_reproduce", "needs_info", "closed"])
    .is("reply_sent_at", null)
    .eq("reply_hold", false)
    .not("reply_draft", "is", null)
    .not("reporter_user_id", "is", null)
    // Finished ones wait for the deploy that carries the fix; a question
    // for the reporter has nothing to wait for, so needs_info goes as soon
    // as it is written (resolved_at is null on those by design).
    .or(`resolved_at.lte.${cutoff},status.eq.needs_info`)
    .limit(50);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (dryRun) return NextResponse.json({ ok: true, wouldSend: ready?.length || 0 });

  const louisUserId = await resolveLouisUserId(admin);
  if (!louisUserId) return NextResponse.json({ error: "No Louis account." }, { status: 500 });

  let sent = 0;
  const failures: string[] = [];
  for (const bug of ready || []) {
    const content = String(bug.reply_draft || "").trim();
    if (!content) continue;
    // Claim first so an overlapping run can never double-send.
    const { data: claimed } = await admin
      .from("bug_reports")
      .update({ reply_sent_at: new Date().toISOString() })
      .eq("id", bug.id)
      .is("reply_sent_at", null)
      .select("id")
      .maybeSingle();
    if (!claimed) continue;
    try {
      const conversationId = await sendBugReply(admin, {
        louisUserId,
        reporterUserId: bug.reporter_user_id,
        conversationId: bug.conversation_id,
        content,
      });
      await admin.from("bug_reports").update({ conversation_id: conversationId }).eq("id", bug.id);
      await logBugEvent(admin, bug.id, "system", "replied", content.slice(0, 500));
      sent += 1;

      // Everyone else who reported the same thing hears it too. The tracker
      // folds repeats into one row, and before bug_report_reporters existed
      // the second and third person were simply never told (2026-10-23).
      const { data: others } = await admin
        .from("bug_report_reporters")
        .select("id, reporter_user_id, conversation_id, reply_sent_at")
        .eq("bug_id", bug.id)
        .is("reply_sent_at", null);
      for (const other of others || []) {
        if (!other.reporter_user_id || other.reporter_user_id === bug.reporter_user_id) continue;
        try {
          const thread = await sendBugReply(admin, {
            louisUserId,
            reporterUserId: other.reporter_user_id,
            conversationId: other.conversation_id,
            content,
          });
          await admin
            .from("bug_report_reporters")
            .update({ reply_sent_at: new Date().toISOString(), conversation_id: thread })
            .eq("id", other.id);
          sent += 1;
        } catch {
          // One person's thread failing must not stop the others.
        }
      }
    } catch (sendError) {
      await admin.from("bug_reports").update({ reply_sent_at: null }).eq("id", bug.id);
      failures.push(`${bug.id}: ${sendError instanceof Error ? sendError.message : "failed"}`);
    }
  }

  return NextResponse.json({ ok: true, sent, failures });
}
