import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { COMMUNITY_MILESTONES, postMilestoneToWall } from "@/lib/communityMilestones";
import type { ActionType } from "@/lib/actionTypes";

/**
 * Post the caller's own recent milestones to the community wall.
 *
 * The same work /api/cron/community-milestones does, for one person, triggered
 * by their app rather than by a schedule.
 *
 * Why both: the cron is in vercel.json, deployed, and other crons on the same
 * secret are plainly running - 97 auto comment replies in six hours - yet
 * group_posts held zero milestone rows hours after twenty qualifying
 * completions. Something about that schedule is not firing and Vercel's logs
 * are not readable from here, so rather than keep guessing at it, the work no
 * longer depends on it. Whoever finishes something has an app open; that app
 * can ask.
 *
 * Safe to call on every app open. It only ever posts for the signed-in caller,
 * and postMilestoneToWall already refuses a repeat and caps each person at two
 * a day, so a hundred calls produce the same wall as one.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** A day, so somebody opening the app in the evening still gets the morning's. */
const LOOK_BACK_MS = 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  if (!token) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const authClient = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: authData } = await authClient.auth.getUser(token);
  const userId = authData.user?.id;
  // Only ever this person. Nothing in the request names anybody else.
  if (!userId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: actions, error } = await admin
    .from("master_actions")
    .select("action_type, action_label, created_at")
    .eq("user_id", userId)
    .in("action_type", [...COMMUNITY_MILESTONES])
    .gte("created_at", new Date(Date.now() - LOOK_BACK_MS).toISOString())
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!actions || actions.length === 0) return NextResponse.json({ ok: true, posted: 0 });

  const { data: profile } = await admin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", userId)
    .maybeSingle();
  const displayName = profile?.display_name || profile?.username || null;

  let posted = 0;
  const reasons: string[] = [];
  for (const row of actions) {
    const result = await postMilestoneToWall(admin, {
      userId,
      displayName,
      actionType: row.action_type as ActionType,
      actionLabel: row.action_label,
    });
    if (result.posted) posted += 1;
    else if (result.reason) reasons.push(result.reason);
    // The daily cap lives in postMilestoneToWall; once it bites, the rest of
    // this list would only repeat the same answer.
    if (result.reason === "daily cap") break;
  }

  return NextResponse.json({ ok: true, considered: actions.length, posted, reasons: reasons.slice(0, 5) });
}
