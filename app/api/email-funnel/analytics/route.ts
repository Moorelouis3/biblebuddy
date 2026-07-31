import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 30;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    // Get overall funnel stats
    const { data: totalSignups } = await supabaseAdmin
      .from("email_funnel_state")
      .select("id")
      .limit(1);

    const { count: totalCount } = await supabaseAdmin
      .from("email_funnel_state")
      .select("*", { count: "exact", head: true });

    // Get stats by day
    const dayStats: Record<number, any> = {};

    for (let day = 1; day <= 8; day++) {
      const { count: sent } = await supabaseAdmin
        .from("email_funnel_sends")
        .select("*", { count: "exact", head: true })
        .eq("email_day", day);

      dayStats[day] = { sent: sent || 0 };
    }

    // Get tier distribution
    const { data: tiers } = await supabaseAdmin
      .from("user_email_funnel_tier")
      .select("tier");

    const tierCounts = {
      power_user: 0,
      regular_user: 0,
      ghost: 0,
      unknown: 0,
    };

    for (const tier of tiers || []) {
      const t = tier.tier as keyof typeof tierCounts;
      if (t in tierCounts) {
        tierCounts[t]++;
      }
    }

    // Get upgrade stats
    const { count: upgradedCount } = await supabaseAdmin
      .from("email_funnel_state")
      .select("*", { count: "exact", head: true })
      .eq("is_pro", true);

    // Get completion stats
    const { count: completedCount } = await supabaseAdmin
      .from("email_funnel_state")
      .select("*", { count: "exact", head: true })
      .not("funnel_completed_at", "is", null);

    return NextResponse.json({
      ok: true,
      summary: {
        total_signups: totalCount || 0,
        completed_funnel: completedCount || 0,
        upgraded_count: upgradedCount || 0,
        upgrade_rate: totalCount ? ((upgradedCount || 0) / totalCount * 100).toFixed(2) + "%" : "0%",
      },
      by_day: dayStats,
      tier_distribution: tierCounts,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Analytics error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
