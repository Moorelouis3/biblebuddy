import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendFunnelEmailViaSysteme, recordEmailSent, updateEmailFunnelState } from "@/lib/emailFunnelHelpers";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

// Universal cron that sends all pending emails for days 1-3, 5-7
// (Days 4 and 8 are handled by conditional logic)
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
    const daysToProcess = [1, 2, 3, 5, 6, 7]; // Skip 4 and 8 (conditional)

    for (const day of daysToProcess) {
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
          await recordEmailSent(supabaseAdmin, signup.user_id, day, undefined, result.response);
          await updateEmailFunnelState(supabaseAdmin, signup.user_id, {
            [`day${day}_sent_at`]: new Date().toISOString(),
          });
          successCount++;
        } else {
          failureCount++;
        }
      }

      results[`day${day}`] = { sent: successCount, failed: failureCount, total: userSignups?.length || 0 };
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Send all cron error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function recordEmailSent(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  day: number,
  version?: string,
  response?: any,
): Promise<void> {
  await supabaseAdmin.from("email_funnel_sends").insert({
    user_id: userId,
    email_day: day,
    template_version: version ? `day${day}_version_${version}` : `day${day}`,
    systeme_io_response: response,
  });
}

async function updateEmailFunnelState(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  updates: Record<string, any>,
): Promise<void> {
  await supabaseAdmin
    .from("email_funnel_state")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("user_id", userId);
}
