import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { runCommunityEventDaily } from "@/lib/communityEventDailyPost";

// Community event daily post (2026-09-22, The Wisdom of Proverbs, Oct 1-31).
// Runs at 10:00 UTC = 6:00 a.m. US Eastern in October (EDT). For each live
// event it posts that day's study post as Louis in the Bible Buddy group and
// notifies the event's members (day 1: everyone, after that: reminders on).
// All the logic is in lib/communityEventDailyPost.ts.
//
//   ?dryRun=1              no writes, returns what it would do
//   ?dryRun=1&day=N        preview any day
//   ?day=N&force=1         manual backfill of an already unlocked day
//                          (notifies only if N is today's community day)
//
// Idempotent: one post per (event, day) via community_event_day_posts, and
// notifications are deduped per post, so re-runs never double-post or
// double-notify.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured, refusing to run." }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const params = request.nextUrl.searchParams;
  const dryRun = params.get("dryRun") === "1";
  const force = params.get("force") === "1";
  const dayParam = params.get("day");
  let dayOverride: number | null = null;
  if (dayParam !== null) {
    if (!dryRun && !force) {
      return NextResponse.json({ error: "?day=N needs dryRun=1 or force=1." }, { status: 400 });
    }
    dayOverride = Number(dayParam);
    if (!Number.isInteger(dayOverride) || dayOverride < 1) {
      return NextResponse.json({ error: "?day must be a positive whole number." }, { status: 400 });
    }
  }

  try {
    const results = await runCommunityEventDaily(supabase, { dryRun, dayOverride, force });
    const failed = results.some((result) => result.error);
    if (failed) console.error("[COMMUNITY_EVENT_DAILY] Finished with errors:", JSON.stringify(results));
    return NextResponse.json({ ok: !failed, dryRun, results }, { status: failed ? 500 : 200 });
  } catch (error) {
    console.error("[COMMUNITY_EVENT_DAILY] Failed:", error);
    return NextResponse.json({ error: "Community event daily post failed." }, { status: 500 });
  }
}
