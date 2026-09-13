import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BUG_STATUSES, notifyLouisAboutBug, resolveLouisUserId } from "@/lib/bugReports";

// The Bug Fixer cloud routine's door into the tracker. Its clone has no
// Supabase keys, so it reads open bugs and writes back results through here,
// authenticated with BUG_AGENT_TOKEN. It can only touch bug_reports rows.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FINISHED = new Set(["fixed", "needs_louis", "not_a_bug", "duplicate"]);

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
  const { data: open, error } = await admin
    .from("bug_reports")
    .select(
      "id, source, status, category, area, page, message, error_details, occurrences, last_seen_at, reporter_name, diagnosis, created_at",
    )
    .in("status", ["new", "fixing"])
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
  const { data: bug } = await admin.from("bug_reports").select("id, status, area, message").eq("id", id).maybeSingle();
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
  ];
  for (const [field, max] of fields) {
    const value = text(body[field], max);
    if (value !== undefined) patch[field] = value;
  }
  if (FINISHED.has(status)) patch.resolved_at = now;

  const { error } = await admin.from("bug_reports").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (FINISHED.has(status) && bug.status !== status) {
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
