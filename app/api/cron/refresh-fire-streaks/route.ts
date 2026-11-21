import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Ends streaks that are certainly over. Nothing else.
 *
 * WHY IT IS THIS SMALL (2026-11-21). This used to recount every streak from
 * master_actions on America/New_York days and write the result back. Two
 * things were wrong with that:
 *
 * 1. Two clocks. The app recounts on the reader's OWN clock every time they do
 *    anything (lib/profileStats.ts -> /api/streak/current with the phone's
 *    time zone). Louis's only activity on 17 Nov was 03:14-05:18 in Berlin,
 *    which is still 16 Nov in New York, so this job made his 320-day streak
 *    a 4-day one. The two writers fought over the same number.
 * 2. It only ever saw 1,000 of 7,366 profiles (the PostgREST row cap), so
 *    most accounts were never refreshed at all.
 *
 * What the job is still needed for: someone who stops opening the app never
 * triggers their own recount, so their old streak would sit on their profile,
 * in the feed and on leaderboards forever. That is all this does now.
 *
 * The rule: no activity at all for 48 hours means a whole calendar day was
 * missed in EVERY time zone (any 48-hour stretch contains a full local day),
 * so the streak is over wherever they live. Anything less certain is left to
 * the reader's own recount.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PAGE = 1000;
const QUIET_MS = 48 * 3_600_000;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
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

  try {
    const cutoffIso = new Date(Date.now() - QUIET_MS).toISOString();

    // Everyone with a streak showing whose last recorded activity is older
    // than the cutoff. Paged: the table is several thousand rows.
    const candidates: string[] = [];
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await admin
        .from("profile_stats")
        .select("user_id")
        .gt("current_streak", 0)
        .or(`last_active_at.is.null,last_active_at.lt.${cutoffIso}`)
        .order("user_id")
        .range(from, from + PAGE - 1);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      for (const row of data || []) if (row.user_id) candidates.push(row.user_id as string);
      if (!data || data.length < PAGE) break;
    }

    // last_active_at is a convenience column; the activity tables are the
    // truth. Anyone with a single row in either since the cutoff keeps their
    // streak for their own recount to settle.
    const recent = new Set<string>();
    for (let i = 0; i < candidates.length; i += 150) {
      const ids = candidates.slice(i, i + 150);
      for (const table of ["master_actions", "app_logins"] as const) {
        for (let from = 0; ; from += PAGE) {
          const { data, error } = await admin
            .from(table)
            .select("user_id")
            .in("user_id", ids)
            .gte("created_at", cutoffIso)
            .order("user_id")
            .range(from, from + PAGE - 1);
          if (error) return NextResponse.json({ error: error.message }, { status: 500 });
          for (const row of data || []) if (row.user_id) recent.add(row.user_id as string);
          if (!data || data.length < PAGE) break;
        }
      }
    }

    const ended = candidates.filter((id) => !recent.has(id));
    const nowIso = new Date().toISOString();
    for (let i = 0; i < ended.length; i += 150) {
      const { error } = await admin
        .from("profile_stats")
        .update({
          current_streak: 0,
          has_fire_streak_badge: false,
          fire_streak_awarded_at: null,
          fire_streak_last_checked_at: nowIso,
          updated_at: nowIso,
        })
        .in("user_id", ended.slice(i, i + 150));
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      checked: candidates.length,
      stillActive: candidates.length - ended.length,
      ended: ended.length,
      timestamp: nowIso,
    });
  } catch (error: unknown) {
    console.error("[REFRESH_FIRE_STREAKS] Route failed:", error);
    return NextResponse.json({ error: "Failed to refresh streaks." }, { status: 500 });
  }
}
