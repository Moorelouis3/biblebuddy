import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendFunnelEmailViaSysteme, recordEmailSent, updateEmailFunnelState } from "@/lib/emailFunnelHelpers";

export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

// This cron job runs every hour and sends pending emails for days 1-7
// (Days 4 and 8 are handled by their conditional routes)
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
    const results: Record<string, any> = {};

    // For each day 1-7, find users eligible for that day and send emails
    for (let day = 1; day <= 7; day++) {
      if (day === 4) {
        // Day 4 is conditional, skip here
        continue;
      }

      // Calculate hours since signup for this day
      const hoursSinceSignupMin = (day - 1) * 24;
      const hoursSinceSignupMax = day * 24;

      const dayStartDate = new Date(now.getTime() - hoursSinceSignupMax * 60 * 60 * 1000);
      const dayEndDate = new Date(now.getTime() - hoursSinceSignupMin * 60 * 60 * 1000);

      // Get users in the window who haven't received this email
      const { data: eligibleUsers, error: queryError } = await supabaseAdmin
        .from("email_funnel_state")
        .select("user_id")
        .gte("signup_timestamp", dayStartDate.toISOString())
        .lt("signup_timestamp", dayEndDate.toISOString())
        .is(`day${day}_sent_at`, null)
        .limit(100);

      if (queryError) {
        console.error(`[EMAIL_FUNNEL] Error querying day ${day} users:`, queryError);
        results[`day${day}`] = { error: queryError.message };
        continue;
      }

      if (!eligibleUsers || eligibleUsers.length === 0) {
        results[`day${day}`] = { sent: 0 };
        continue;
      }

      // Get user emails
      const { data: userSignups, error: signupError } = await supabaseAdmin
        .from("user_signups")
        .select("user_id, email")
        .in(
          "user_id",
          eligibleUsers.map((u) => u.user_id),
        );

      if (signupError) {
        console.error(`[EMAIL_FUNNEL] Error fetching signups for day ${day}:`, signupError);
        results[`day${day}`] = { error: signupError.message };
        continue;
      }

      let successCount = 0;
      let failureCount = 0;

      for (const signup of userSignups || []) {
        const result = await sendFunnelEmailViaSysteme(signup.email, day as any);

        if (result.ok) {
          await recordEmailSent(supabaseAdmin, signup.user_id, day as any, undefined, result.response);
          await updateEmailFunnelState(supabaseAdmin, signup.user_id, {
            [`day${day}_sent_at`]: new Date().toISOString(),
          });
          successCount++;
        } else {
          failureCount++;
        }
      }

      results[`day${day}`] = { sent: successCount, failed: failureCount };
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Cron error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

