import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getLiveStreakMapForUsers } from "@/lib/serverStreaks";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_req: NextRequest) {
  try {
    const body = await _req.json().catch(() => null);
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set() {},
          remove() {},
        },
      },
    );

    const userResp = await supabase.auth.getUser();
    const user = userResp?.data?.user;
    if (userResp?.error || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!serviceKey || !supabaseUrl) {
      return NextResponse.json({ error: "Server not configured." }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const targetUserId =
      typeof body?.userId === "string" && body.userId.trim().length > 0
        ? body.userId.trim()
        : user.id;
    const targetTimeZone =
      typeof body?.timeZone === "string" && body.timeZone.trim().length > 0
        ? body.timeZone.trim()
        : undefined;

    let existingProfileResponse = await supabaseAdmin
      .from("profile_stats")
      .select("current_streak, has_fire_streak_badge, fire_streak_awarded_at, grace_days_count, last_grace_day_earned_at")
      .eq("user_id", targetUserId)
      .maybeSingle();
    if (
      existingProfileResponse.error &&
      /grace_days_count|last_grace_day_earned_at/i.test(existingProfileResponse.error.message || "")
    ) {
      existingProfileResponse = await supabaseAdmin
        .from("profile_stats")
        .select("current_streak, has_fire_streak_badge, fire_streak_awarded_at")
        .eq("user_id", targetUserId)
        .maybeSingle();
    }

    const [liveStreakMap] = await Promise.all([
      getLiveStreakMapForUsers(supabaseAdmin, [targetUserId], 400, targetTimeZone),
    ]);
    const { data: existingProfile, error: existingProfileError } = existingProfileResponse;

    if (existingProfileError) {
      return NextResponse.json(
        { error: existingProfileError.message || "Could not load existing streak profile." },
        { status: 500 },
      );
    }

    const liveCurrentStreak = liveStreakMap.get(targetUserId) ?? 0;
    const storedCurrentStreak = Math.max(0, Number(existingProfile?.current_streak || 0));
    const currentStreak = Math.max(liveCurrentStreak, storedCurrentStreak);
    const nowIso = new Date().toISOString();
    const todayKey = new Intl.DateTimeFormat("en-CA", {
      timeZone: targetTimeZone || "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const hasFireStreakBadge =
      Boolean(existingProfile?.has_fire_streak_badge) ||
      currentStreak >= 30;
    const currentGraceDays = Math.max(0, Math.min(5, Number(existingProfile?.grace_days_count || 0)));
    const shouldEarnGraceDay =
      currentStreak > 0 &&
      currentStreak % 7 === 0 &&
      currentGraceDays < 5 &&
      existingProfile?.last_grace_day_earned_at !== todayKey;
    const graceDaysCount = shouldEarnGraceDay ? Math.min(5, currentGraceDays + 1) : currentGraceDays;

    const payload = {
      user_id: targetUserId,
      current_streak: currentStreak,
      grace_days_count: graceDaysCount,
      ...(shouldEarnGraceDay ? { last_grace_day_earned_at: todayKey } : {}),
      has_fire_streak_badge: hasFireStreakBadge,
      fire_streak_awarded_at: hasFireStreakBadge
        ? existingProfile?.fire_streak_awarded_at || nowIso
        : null,
      fire_streak_last_checked_at: nowIso,
      updated_at: nowIso,
    };

    let { error: updateError } = await supabaseAdmin
      .from("profile_stats")
      .upsert(payload, { onConflict: "user_id" });

    if (
      updateError &&
      /has_fire_streak_badge|fire_streak_awarded_at|fire_streak_last_checked_at|grace_days_count|last_grace_day_earned_at/i.test(updateError.message || "")
    ) {
      const legacyResponse = await supabaseAdmin
        .from("profile_stats")
        .upsert(
          {
            user_id: targetUserId,
            current_streak: currentStreak,
            updated_at: nowIso,
          },
          { onConflict: "user_id" },
        );
      updateError = legacyResponse.error;
    }

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message || "Could not save synced streak." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      streakData: {
        currentStreak,
        graceDaysCount,
        graceDayEarned: shouldEarnGraceDay,
        last7Days: [],
      },
    });
  } catch (error: any) {
    console.error("[api/streak/current] Unexpected error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to sync current streak." },
      { status: 500 },
    );
  }
}
