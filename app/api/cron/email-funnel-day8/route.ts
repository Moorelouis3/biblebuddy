import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  determineUserTier,
  checkIfUserIsPro,
  sendFunnelEmailViaSysteme,
  recordEmailSent,
  updateEmailFunnelState,
  getSignupTimestamp,
  updateUserTier,
} from "@/lib/emailFunnelHelpers";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

// Send Day 8 conditional emails (168 hours / 7 days after signup)
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
    const now = new Date();
    // Day 8: 168-192 hours (7-8 days) after signup
    const dayStartDate = new Date(now.getTime() - 192 * 60 * 60 * 1000);
    const dayEndDate = new Date(now.getTime() - 168 * 60 * 60 * 1000);

    // Get users who signed up in the right window and haven't received Day 8 yet
    const { data: eligibleUsers, error: queryError } = await supabaseAdmin
      .from("email_funnel_state")
      .select("user_id")
      .gte("signup_timestamp", dayStartDate.toISOString())
      .lt("signup_timestamp", dayEndDate.toISOString())
      .is("day8_sent_at", null)
      .limit(500);

    if (queryError) {
      return NextResponse.json({ error: queryError.message }, { status: 500 });
    }

    if (!eligibleUsers || eligibleUsers.length === 0) {
      return NextResponse.json({ ok: true, sent: 0 });
    }

    // Get user emails
    const { data: userSignups } = await supabaseAdmin
      .from("user_signups")
      .select("user_id, email")
      .in(
        "user_id",
        eligibleUsers.map((u) => u.user_id),
      );

    let successCount = 0;
    let failureCount = 0;
    const tierBreakdown: Record<string, number> = { power_user: 0, regular_user: 0, ghost: 0 };
    // Single universal version -- Systeme.io's tag cap doesn't leave room
    // for per-tier A/B variants. Tier is still computed and stored below
    // for reporting; it just no longer picks the email.
    const version: "b" = "b";

    for (const signup of userSignups || []) {
      const signupDate = await getSignupTimestamp(supabaseAdmin, signup.user_id);
      if (!signupDate) {
        failureCount++;
        continue;
      }

      const tier = await determineUserTier(supabaseAdmin, signup.user_id, signupDate);
      const isPro = await checkIfUserIsPro(supabaseAdmin, signup.user_id);

      const result = await sendFunnelEmailViaSysteme(signup.email, 8, version);

      if (result.ok) {
        await recordEmailSent(supabaseAdmin, signup.user_id, 8, version, result.response);
        await updateEmailFunnelState(supabaseAdmin, signup.user_id, {
          day8_sent_at: new Date().toISOString(),
          day8_version: version,
          funnel_completed_at: new Date().toISOString(),
          is_pro: isPro,
          tier_at_completion: tier,
        });
        await updateUserTier(supabaseAdmin, signup.user_id, tier);

        successCount++;
        tierBreakdown[tier]++;
      } else {
        failureCount++;
      }
    }

    return NextResponse.json({
      ok: true,
      day: 8,
      sent: successCount,
      failed: failureCount,
      total: userSignups?.length || 0,
      tiers: tierBreakdown,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Day 8 cron error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

