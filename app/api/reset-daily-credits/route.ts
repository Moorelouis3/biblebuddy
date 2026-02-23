import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
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
      }
    );

    // Get authenticated user
    const userResp = await supabase.auth.getUser();
    const user = userResp?.data?.user;
    if (userResp?.error || !user) {
      console.error("[reset-daily-credits] Auth error", userResp?.error);
      return NextResponse.json({ ok: false, error: "Unauthorized", details: userResp?.error }, { status: 401 });
    }

    // Get profile_stats for user
    const profileResp = await supabase
      .from("profile_stats")
      .select("is_paid, daily_credits, last_credit_reset")
      .eq("user_id", user.id)
      .single();
    const profile = profileResp?.data;
    if (profileResp?.error || !profile) {
      console.error("[reset-daily-credits] Profile error", profileResp?.error, profileResp);
      return NextResponse.json({ ok: false, error: "Profile not found", details: profileResp?.error, supabase: profileResp }, { status: 404 });
    }

    // Only reset for free users
    if (profile.is_paid === true) {
      return NextResponse.json({ ok: true, reset: false, daily_credits: profile.daily_credits });
    }

    const today = new Date().toISOString().slice(0, 10);
    const lastReset = profile.last_credit_reset;
    // If no reset needed, return
    if (lastReset && lastReset >= today) {
      return NextResponse.json({ ok: true, reset: false, daily_credits: profile.daily_credits });
    }

    // Reset needed: update row
    const updateResp = await supabase
      .from("profile_stats")
      .update({
        daily_credits: 5, // or whatever the default is
        last_credit_reset: today,
      })
      .eq("user_id", user.id)
      .select("daily_credits")
      .single();

    if (updateResp?.error) {
      console.error("[reset-daily-credits] Update error", updateResp?.error, updateResp);
      return NextResponse.json({ ok: false, error: updateResp?.error?.message || "Update failed", details: updateResp?.error, supabase: updateResp }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      reset: true,
      daily_credits: updateResp?.data?.daily_credits ?? profile.daily_credits,
      supabase: {
        userResp,
        profileResp,
        updateResp,
      },
    });
  } catch (err: any) {
    console.error("[reset-daily-credits] Uncaught error", err?.stack || err);
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error", stack: err?.stack || err }, { status: 500 });
  }
}
