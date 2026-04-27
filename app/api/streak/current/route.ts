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

    const [{ data: existingProfile, error: existingProfileError }, liveStreakMap] = await Promise.all([
      supabaseAdmin
        .from("profile_stats")
        .select("current_streak, has_fire_streak_badge, fire_streak_awarded_at")
        .eq("user_id", targetUserId)
        .maybeSingle(),
      getLiveStreakMapForUsers(supabaseAdmin, [targetUserId], 400, targetTimeZone),
    ]);

    if (existingProfileError) {
      return NextResponse.json(
        { error: existingProfileError.message || "Could not load existing streak profile." },
        { status: 500 },
      );
    }

    const currentStreak = liveStreakMap.get(targetUserId) ?? 0;
    const nowIso = new Date().toISOString();
    const hasFireStreakBadge =
      Boolean(existingProfile?.has_fire_streak_badge) ||
      currentStreak >= 30;

    const payload = {
      user_id: targetUserId,
      current_streak: currentStreak,
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
      /has_fire_streak_badge|fire_streak_awarded_at|fire_streak_last_checked_at/i.test(updateError.message || "")
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
