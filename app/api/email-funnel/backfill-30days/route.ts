import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendFunnelEmailViaSysteme, recordEmailSent, updateEmailFunnelState } from "@/lib/emailFunnelHelpers";

export const runtime = "nodejs";
export const maxDuration = 120;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

// Backfill: Send Day 1 emails to all users who signed up in the last 30 days
export async function POST(request: NextRequest) {
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
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    console.log(`[EMAIL_FUNNEL] Backfilling Day 1 emails for signups from ${thirtyDaysAgo.toISOString()} to now`);

    // Get all users who signed up in the last 30 days
    const { data: recentSignups, error: signupError } = await supabaseAdmin
      .from("user_signups")
      .select("user_id, email")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .limit(5000);

    if (signupError) {
      return NextResponse.json({ error: signupError.message }, { status: 500 });
    }

    if (!recentSignups || recentSignups.length === 0) {
      return NextResponse.json({ ok: true, message: "No signups found in last 30 days", sent: 0 });
    }

    console.log(`[EMAIL_FUNNEL] Found ${recentSignups.length} signups from last 30 days`);

    // Get users who already received Day 1 email
    const { data: alreadySent } = await supabaseAdmin
      .from("email_funnel_sends")
      .select("user_id")
      .eq("email_day", 1)
      .in(
        "user_id",
        recentSignups.map((s) => s.user_id),
      );

    const alreadySentSet = new Set(alreadySent?.map((s) => s.user_id) || []);
    const toSend = recentSignups.filter((s) => !alreadySentSet.has(s.user_id));

    console.log(`[EMAIL_FUNNEL] Sending to ${toSend.length} users (${alreadySentSet.size} already sent)`);

    let successCount = 0;
    let failureCount = 0;
    const failures: Array<{ user_id: string; email: string; error: string }> = [];

    for (const signup of toSend) {
      // Create/update funnel state if not exists
      const { error: stateError } = await supabaseAdmin
        .from("email_funnel_state")
        .upsert(
          {
            user_id: signup.user_id,
            signup_timestamp: new Date().toISOString(), // Use now as backup
          },
          { onConflict: "user_id" },
        );

      if (stateError) {
        console.error(`[EMAIL_FUNNEL] Error creating funnel state for ${signup.user_id}:`, stateError);
        continue;
      }

      // Send Day 1 email
      const result = await sendFunnelEmailViaSysteme(signup.email, 1);

      if (result.ok) {
        await recordEmailSent(supabaseAdmin, signup.user_id, 1, undefined, result.response);
        await updateEmailFunnelState(supabaseAdmin, signup.user_id, {
          day1_sent_at: new Date().toISOString(),
        });
        successCount++;
      } else {
        failureCount++;
        failures.push({ user_id: signup.user_id, email: signup.email, error: result.error || "Unknown" });
      }
    }

    console.log(`[EMAIL_FUNNEL] Backfill complete: ${successCount} sent, ${failureCount} failed`);

    return NextResponse.json({
      ok: true,
      message: "Backfill complete",
      total_signups_in_30_days: recentSignups.length,
      already_sent: alreadySentSet.size,
      sent: successCount,
      failed: failureCount,
      failures: failures.slice(0, 10), // Return first 10 failures
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Backfill error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

