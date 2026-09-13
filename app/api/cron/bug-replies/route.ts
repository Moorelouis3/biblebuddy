import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { resolveLouisUserId, sendBugReply } from "@/lib/bugReports";

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
    .in("status", ["fixed", "needs_louis", "not_a_bug", "duplicate"])
    .is("reply_sent_at", null)
    .eq("reply_hold", false)
    .not("reply_draft", "is", null)
    .not("reporter_user_id", "is", null)
    .lte("resolved_at", cutoff)
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
      sent += 1;
    } catch (sendError) {
      await admin.from("bug_reports").update({ reply_sent_at: null }).eq("id", bug.id);
      failures.push(`${bug.id}: ${sendError instanceof Error ? sendError.message : "failed"}`);
    }
  }

  return NextResponse.json({ ok: true, sent, failures });
}
