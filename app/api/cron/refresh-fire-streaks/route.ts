import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getLiveStreakMapForUsers } from "@/lib/serverStreaks";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const { data: profileRows, error: profileError } = await supabaseAdmin
      .from("profile_stats")
      .select("user_id, current_streak, has_fire_streak_badge, fire_streak_awarded_at");

    if (profileError) {
      return NextResponse.json({ error: profileError.message || "Could not load profile stats." }, { status: 500 });
    }

    const allProfiles = (profileRows || []) as Array<{
      user_id: string;
      current_streak?: number | null;
      has_fire_streak_badge?: boolean | null;
      fire_streak_awarded_at?: string | null;
    }>;

    const candidateProfiles = allProfiles.filter((profile) => Boolean(profile.user_id));
    const candidateUserIds = candidateProfiles.map((profile) => profile.user_id);
    const liveStreakMap = await getLiveStreakMapForUsers(supabaseAdmin, candidateUserIds, 400);
    const nowIso = new Date().toISOString();

    let updated = 0;
    let withFireBadge = 0;

    for (const profile of candidateProfiles) {
      const liveCurrentStreak = liveStreakMap.get(profile.user_id) ?? 0;
      const hasFireStreakBadge = liveCurrentStreak >= 30;
      const fireStreakAwardedAt =
        hasFireStreakBadge
          ? profile.fire_streak_awarded_at || nowIso
          : null;

      const shouldUpdate =
        (profile.current_streak ?? 0) !== liveCurrentStreak ||
        Boolean(profile.has_fire_streak_badge) !== hasFireStreakBadge ||
        (profile.fire_streak_awarded_at ?? null) !== fireStreakAwardedAt;

      if (!shouldUpdate) continue;

      const { error: updateError } = await supabaseAdmin
        .from("profile_stats")
        .update({
          current_streak: liveCurrentStreak,
          has_fire_streak_badge: hasFireStreakBadge,
          fire_streak_awarded_at: fireStreakAwardedAt,
          fire_streak_last_checked_at: nowIso,
          updated_at: nowIso,
        })
        .eq("user_id", profile.user_id);

      if (updateError) {
        if (/has_fire_streak_badge|fire_streak_awarded_at|fire_streak_last_checked_at/i.test(updateError.message || "")) {
          return NextResponse.json(
            { error: "Fire streak columns are missing. Run scripts/add-fire-streak-profile-fields.sql first." },
            { status: 500 },
          );
        }

        return NextResponse.json({ error: updateError.message || "Could not refresh fire streaks." }, { status: 500 });
      }

      updated += 1;
    }

    candidateProfiles.forEach((profile) => {
      const liveCurrentStreak = liveStreakMap.get(profile.user_id) ?? profile.current_streak ?? 0;
      if (liveCurrentStreak >= 30) {
        withFireBadge += 1;
      }
    });

    return NextResponse.json({
      ok: true,
      usersScanned: candidateProfiles.length,
      updated,
      withFireBadge,
      timestamp: nowIso,
    });
  } catch (error: any) {
    console.error("[REFRESH_FIRE_STREAKS] Route failed:", error);
    return NextResponse.json({ error: "Failed to refresh fire streaks." }, { status: 500 });
  }
}
