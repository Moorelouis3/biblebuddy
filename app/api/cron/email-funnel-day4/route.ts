import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  determineUserTier,
  checkIfUserIsPro,
  sendFunnelEmailViaSysteme,
  recordEmailSent,
  updateEmailFunnelState,
  getSignupTimestamp,
} from "@/lib/emailFunnelHelpers";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

// Send Day 4 conditional emails (72 hours after signup)
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
    // Day 4: 72-96 hours after signup
    const dayStartDate = new Date(now.getTime() - 96 * 60 * 60 * 1000);
    const dayEndDate = new Date(now.getTime() - 72 * 60 * 60 * 1000);

    // Get users who signed up in the right window and haven't received Day 4 yet
    const { data: eligibleUsers, error: queryError } = await supabaseAdmin
      .from("email_funnel_state")
      .select("user_id")
      .gte("signup_timestamp", dayStartDate.toISOString())
      .lt("signup_timestamp", dayEndDate.toISOString())
      .is("day4_sent_at", null)
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
    const versionBreakdown: Record<string, number> = { a: 0, a_pro: 0, b: 0, c: 0 };

    for (const signup of userSignups || []) {
      const signupDate = await getSignupTimestamp(supabaseAdmin, signup.user_id);
      if (!signupDate) {
        failureCount++;
        continue;
      }

      // Determine tier based on first 72 hours
      const tier = await determineUserTier(supabaseAdmin, signup.user_id, signupDate);
      const isPro = await checkIfUserIsPro(supabaseAdmin, signup.user_id);

      let version: "a" | "a_pro" | "b" | "c";

      if (tier === "power_user" && isPro) {
        version = "a_pro";
      } else if (tier === "power_user" && !isPro) {
        version = "a";
      } else if (tier === "regular_user") {
        version = "b";
      } else {
        version = "c";
      }

      const result = await sendFunnelEmailViaSysteme(signup.email, 4, version);

      if (result.ok) {
        await recordEmailSent(supabaseAdmin, signup.user_id, 4, version, result.response);
        await updateEmailFunnelState(supabaseAdmin, signup.user_id, {
          day4_sent_at: new Date().toISOString(),
          day4_version: version,
        });
        successCount++;
        versionBreakdown[version]++;
      } else {
        failureCount++;
      }
    }

    return NextResponse.json({
      ok: true,
      day: 4,
      sent: successCount,
      failed: failureCount,
      total: userSignups?.length || 0,
      versions: versionBreakdown,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Day 4 cron error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

