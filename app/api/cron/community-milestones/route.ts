import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { COMMUNITY_MILESTONES, postMilestoneToWall } from "@/lib/communityMilestones";
import type { ActionType } from "@/lib/actionTypes";

/**
 * Put recent milestones on the community wall.
 *
 * **Why a sweep and not a hook.** The obvious place to announce a completion is
 * where it is recorded - except that there is no such place. Seven call sites
 * across five files write these rows straight into master_actions without
 * going through recordAction: DashboardJourneyExperience for Bible in One Year
 * days, DashboardDailyTaskCallout and three paths inside the devotional pages
 * for study days, FullChapterReader for finished books. Teaching all seven is
 * how the Bible lock was broken for months this morning - six screens finished
 * a chapter and only the seventh knew to lift it. Reading master_actions
 * afterwards is the one approach that cannot be bypassed by an eighth.
 *
 * It also means this works for completions recorded by anything at all,
 * including server routes and anything written later.
 *
 * Runs every fifteen minutes, looks back an hour. The overlap is deliberate: a
 * missed run or a slow write should be picked up next time, and posting twice
 * is prevented by the wall itself rather than by this window being exact.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Comfortably wider than the fifteen-minute schedule. */
const LOOK_BACK_MS = 60 * 60 * 1000;
/** A ceiling, so one catch-up day cannot flood the wall in a single run. */
const MAX_POSTS_PER_RUN = 12;

export async function GET(request: NextRequest) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // ?dryRun=1 says what it would post and writes nothing.
  const dryRun = new URL(request.url).searchParams.get("dryRun") === "1";
  const since = new Date(Date.now() - LOOK_BACK_MS).toISOString();

  const { data: actions, error } = await admin
    .from("master_actions")
    .select("user_id, action_type, action_label, created_at")
    .in("action_type", [...COMMUNITY_MILESTONES])
    .gte("created_at", since)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (actions || []).filter((row) => row.user_id);
  if (rows.length === 0) {
    return NextResponse.json({ ok: true, considered: 0, posted: 0, dryRun });
  }

  // One lookup for every name, rather than one per milestone.
  const userIds = [...new Set(rows.map((row) => row.user_id as string))];
  const { data: profiles } = await admin
    .from("profile_stats")
    .select("user_id, display_name, username")
    .in("user_id", userIds);
  const nameOf = new Map(
    (profiles || []).map((p) => [p.user_id, p.display_name || p.username || null] as const),
  );

  const results: Array<{ user: string; type: string; posted: boolean; reason?: string }> = [];
  let posted = 0;

  for (const row of rows) {
    if (posted >= MAX_POSTS_PER_RUN) break;

    const userId = row.user_id as string;
    const actionType = row.action_type as ActionType;

    if (dryRun) {
      results.push({ user: nameOf.get(userId) || userId, type: actionType, posted: false, reason: "dry run" });
      continue;
    }

    const result = await postMilestoneToWall(admin, {
      userId,
      displayName: nameOf.get(userId) ?? null,
      actionType,
      actionLabel: row.action_label,
    });
    if (result.posted) posted += 1;
    results.push({ user: nameOf.get(userId) || userId, type: actionType, ...result });
  }

  return NextResponse.json({ ok: true, considered: rows.length, posted, dryRun, results });
}
