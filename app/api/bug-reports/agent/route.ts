import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  BUG_STATUSES,
  FINISHED_BUG_STATUSES,
  MAX_FIX_ATTEMPTS,
  OPEN_BUG_STATUSES,
  bugAutomationPaused,
  bugNeedsApproval,
  logBugEvent,
  notifyLouisAboutBug,
  resolveLouisUserId,
} from "@/lib/bugReports";

// The Bug Fixer cloud routine's door into the tracker. Its clone has no
// Supabase keys, so it reads open bugs and writes back results through here,
// authenticated with BUG_AGENT_TOKEN. It can only touch bug_reports rows.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FINISHED = new Set<string>([...FINISHED_BUG_STATUSES, "needs_louis"]);

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

  // The kill switch. Paused hands out no work at all, so the routine wakes
  // up, finds nothing to do and goes back to sleep - no half-finished bug
  // left mid-fix, and no need to touch the schedule itself.
  if (await bugAutomationPaused(admin)) {
    return NextResponse.json({ paused: true, open: [], recentlyFinished: [] });
  }

  const { data: open, error } = await admin
    .from("bug_reports")
    .select(
      "id, source, status, severity, category, area, page, platform, message, error_details, occurrences, last_seen_at, reporter_name, diagnosis, steps_to_reproduce, attempts, created_at",
    )
    .in("status", OPEN_BUG_STATUSES)
    // A report that has already been picked up three times is not going to be
    // fixed by a fourth identical attempt; it waits for Louis instead.
    .lt("attempts", MAX_FIX_ATTEMPTS)
    .order("created_at", { ascending: true })
    .limit(25);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Recently finished ones too, so the agent can spot duplicates.
  const { data: recent } = await admin
    .from("bug_reports")
    .select("id, status, area, page, message, diagnosis, fix_summary, resolved_at")
    .not("status", "in", "(new,fixing)")
    .order("updated_at", { ascending: false })
    .limit(30);

  return NextResponse.json({ open: open || [], recentlyFinished: recent || [] });
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const id = String(body?.id || "");
  const status = String(body?.status || "");
  if (!id || !(BUG_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ error: "Need id and a valid status." }, { status: 400 });
  }

  const admin = adminClient();
  if (await bugAutomationPaused(admin)) {
    return NextResponse.json({ error: "Bug automation is paused.", paused: true }, { status: 423 });
  }

  const { data: bug } = await admin
    .from("bug_reports")
    .select("id, status, area, category, page, message, severity, diagnosis, fix_summary, attempts, approved_at")
    .eq("id", id)
    .maybeSingle();
  if (!bug) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const text = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : undefined);
  const now = new Date().toISOString();
  const patch: Record<string, unknown> = { status, updated_at: now };
  const fields: Array<[string, number]> = [
    ["diagnosis", 3000],
    ["fix_summary", 3000],
    ["fix_commit", 80],
    ["louis_action", 1000],
    ["reply_draft", 2000],
    // The triage the page shows, written by whoever worked the report.
    ["severity", 20],
    ["confidence", 20],
    ["steps_to_reproduce", 2000],
    ["steps_source", 20],
    ["expected_behavior", 1000],
    ["actual_behavior", 1000],
    ["tests_result", 2000],
    ["branch_name", 200],
    ["pr_url", 500],
    ["last_error", 1000],
  ];
  for (const [field, max] of fields) {
    const value = text(body[field], max);
    if (value !== undefined) patch[field] = value;
  }

  // Picking a report up counts as an attempt, whether or not it ends in a
  // fix. Three is the limit (see the GET), which is what stops a report
  // being chewed on twice a day for a fortnight.
  if (status === "fixing" && bug.status !== "fixing") {
    patch.attempts = (bug.attempts || 0) + 1;
  }

  /**
   * The gate.
   *
   * Everything above this line is the agent describing its own work. This is
   * the one judgement the agent does not get to make: whether a fix in a
   * risky area may be called done. The check runs on the merged picture -
   * what was already on the report plus what is being written now - and a
   * "fixed" that does not pass it becomes "awaiting approval" instead.
   */
  let escalation: { reason: string; risks: string[] } | null = null;
  if (status === "fixed" && !bug.approved_at) {
    const merged = {
      area: bug.area,
      category: bug.category,
      page: bug.page,
      message: bug.message,
      diagnosis: (patch.diagnosis as string) ?? bug.diagnosis,
      fix_summary: (patch.fix_summary as string) ?? bug.fix_summary,
      severity: (patch.severity as string) ?? bug.severity,
      confidence: patch.confidence as string | undefined,
      tests_result: patch.tests_result as string | undefined,
    };
    const verdict = bugNeedsApproval(merged);
    if (verdict.needed) {
      patch.status = "awaiting_approval";
      patch.needs_approval = true;
      patch.risk_areas = verdict.risks;
      if (!patch.louis_action) {
        patch.louis_action = `Check this fix before it goes out - it ${verdict.reason}.`;
      }
      escalation = { reason: verdict.reason || "needs a look", risks: verdict.risks };
    }
  }

  const finalStatus = String(patch.status);
  if (FINISHED.has(finalStatus)) patch.resolved_at = now;

  const { error } = await admin.from("bug_reports").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (bug.status !== finalStatus) {
    await logBugEvent(
      admin,
      id,
      "agent",
      escalation ? "escalated" : "status",
      escalation
        ? `Asked for approval instead of releasing: ${escalation.reason}.`
        : `Moved to ${finalStatus}.`,
      escalation ? { risks: escalation.risks, requested: status } : { from: bug.status, to: finalStatus },
    );
  }
  if (patch.fix_summary || patch.fix_commit) {
    await logBugEvent(admin, id, "agent", "fix_attempted", String(patch.fix_summary || "Change made."), {
      commit: patch.fix_commit ?? null,
      branch: patch.branch_name ?? null,
      pr: patch.pr_url ?? null,
    });
  }
  if (patch.tests_result) {
    await logBugEvent(admin, id, "agent", "tests", String(patch.tests_result));
  }

  if (escalation) {
    const louisUserId = await resolveLouisUserId(admin);
    if (louisUserId) {
      await notifyLouisAboutBug(
        admin,
        louisUserId,
        `Needs your approval - ${bug.area || "App"}: ${escalation.reason}`,
      );
    }
    return NextResponse.json({
      ok: true,
      status: "awaiting_approval",
      escalated: true,
      reason: escalation.reason,
      risks: escalation.risks,
      message:
        "This one touches an area that cannot be released without Louis. It is saved as awaiting approval - do not tell the reporter it is fixed.",
    });
  }

  if (FINISHED.has(finalStatus) && bug.status !== finalStatus) {
    const louisUserId = await resolveLouisUserId(admin);
    if (louisUserId) {
      const what = `${bug.area || "App"}: ${String(bug.message).split("\n")[0]}`;
      const lead =
        status === "fixed"
          ? "Bug fixed"
          : status === "needs_louis"
            ? "Bug needs you"
            : status === "duplicate"
              ? "Duplicate bug closed"
              : "Report closed (not a bug)";
      await notifyLouisAboutBug(admin, louisUserId, `${lead} - ${what}`);
    }
  }

  return NextResponse.json({ ok: true });
}
