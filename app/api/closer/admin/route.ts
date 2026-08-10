import { NextRequest, NextResponse } from "next/server";
import { getCloserSupabase, loadCloserConfig } from "@/lib/closer/config";
import { getCredentialSource, getMissingMetaEnv } from "@/lib/closer/meta";
import type { CloserEventRow } from "@/lib/closer/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Password comes from the environment and is compared on the server. The page
// never ships it to the browser; the browser sends what the user typed and
// this decides.
function isAuthorized(request: NextRequest) {
  const expected = process.env.CLOSER_ADMIN_PASSWORD;
  if (!expected) return false;
  const provided = request.headers.get("x-closer-password") || "";
  if (provided.length !== expected.length) return false;
  // Constant time compare so the endpoint does not leak the password length
  // or prefix through response timing.
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  return mismatch === 0;
}

export async function GET(request: NextRequest) {
  if (!process.env.CLOSER_ADMIN_PASSWORD) {
    return NextResponse.json({ error: "CLOSER_ADMIN_PASSWORD is not set." }, { status: 500 });
  }
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const supabase = getCloserSupabase();
  if (!supabase) return NextResponse.json({ error: "Storage is not configured." }, { status: 500 });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [{ data: eventData }, { data: todayData }, config] = await Promise.all([
    supabase
      .from("closer_events")
      .select("id, platform, comment_id, post_id, commenter_handle, commenter_id, comment_text, matched_trigger, status, detail, dry_run, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase.from("closer_events").select("status").gte("created_at", startOfDay.toISOString()).limit(5000),
    loadCloserConfig(supabase),
  ]);

  const events = (eventData || []) as CloserEventRow[];
  const today = (todayData || []) as Array<{ status: string }>;

  const counts = {
    dmsSent: today.filter((row) => row.status === "dm_sent").length,
    fallbacksPosted: today.filter((row) => row.status === "dm_failed_fallback_posted").length,
    publicReplies: today.filter((row) => row.status === "public_reply_sent").length,
    errors: today.filter((row) => row.status === "error").length,
    skipped: today.filter((row) => row.status.startsWith("skipped")).length,
    total: today.length,
  };

  const [missingEnv, credentialSource] = await Promise.all([getMissingMetaEnv(), getCredentialSource()]);

  return NextResponse.json({
    events,
    counts,
    config: { dryRun: config.dryRun, hourlyCap: config.hourlyCap, triggerWords: config.triggerWords },
    missingEnv,
    credentialSource,
  });
}

// Flips dry run. Live sending is a real world action, so it is deliberately
// the only thing this endpoint can change.
export async function POST(request: NextRequest) {
  if (!process.env.CLOSER_ADMIN_PASSWORD) {
    return NextResponse.json({ error: "CLOSER_ADMIN_PASSWORD is not set." }, { status: 500 });
  }
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const supabase = getCloserSupabase();
  if (!supabase) return NextResponse.json({ error: "Storage is not configured." }, { status: 500 });

  let body: { dryRun?: unknown };
  try {
    body = (await request.json()) as { dryRun?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  if (typeof body.dryRun !== "boolean") {
    return NextResponse.json({ error: "dryRun must be true or false." }, { status: 400 });
  }

  const { error } = await supabase
    .from("closer_config")
    .update({ dry_run: body.dryRun, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, dryRun: body.dryRun });
}
