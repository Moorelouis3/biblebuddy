import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendFunnelEmailViaSysteme,
  recordEmailSent,
  updateEmailFunnelState,
  getSignupTimestamp,
} from "@/lib/emailFunnelHelpers";

export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

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
    const body = await request.json();
    const { day } = body;

    if (!day || day < 1 || day > 7) {
      return NextResponse.json({ error: "day must be 1-7" }, { status: 400 });
    }

    // Calculate the time window for this day
    const now = new Date();
    const hoursSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60));

    // Each day covers a 24-hour window
    // Day 1: 0-24 hours
    // Day 2: 24-48 hours, etc.
    const dayStartHours = (day - 1) * 24;
    const dayEndHours = day * 24;

    // Get all users who signed up in the right window
    const dayStartDate = new Date(now.getTime() - dayEndHours * 60 * 60 * 1000);
    const dayEndDate = new Date(now.getTime() - dayStartHours * 60 * 60 * 1000);

    console.log(
      `[EMAIL_FUNNEL] Sending Day ${day} emails for signups between ${dayStartDate.toISOString()} and ${dayEndDate.toISOString()}`,
    );

    // Get users who haven't received this day's email yet
    const { data: signups, error: signupError } = await supabaseAdmin
      .from("user_signups")
      .select("user_id, email")
      .gte("created_at", dayStartDate.toISOString())
      .lt("created_at", dayEndDate.toISOString())
      .limit(1000);

    if (signupError) {
      console.error("[EMAIL_FUNNEL] Error fetching signups:", signupError);
      return NextResponse.json({ error: signupError.message }, { status: 500 });
    }

    if (!signups || signups.length === 0) {
      return NextResponse.json({ ok: true, message: "No signups found for this day" });
    }

    // Filter out users who already received this email
    const { data: alreadySent, error: sentError } = await supabaseAdmin
      .from("email_funnel_sends")
      .select("user_id")
      .eq("email_day", day)
      .in(
        "user_id",
        signups.map((s) => s.user_id),
      );

    if (sentError) {
      console.error("[EMAIL_FUNNEL] Error checking sent emails:", sentError);
      return NextResponse.json({ error: sentError.message }, { status: 500 });
    }

    const alreadySentSet = new Set(alreadySent?.map((s) => s.user_id) || []);
    const toSend = signups.filter((s) => !alreadySentSet.has(s.user_id));

    console.log(
      `[EMAIL_FUNNEL] Sending Day ${day} to ${toSend.length}/${signups.length} users (${alreadySent?.length} already sent)`,
    );

    let successCount = 0;
    let failureCount = 0;
    const failures: Array<{ user_id: string; email: string; error: string }> = [];

    // Send emails
    for (const signup of toSend) {
      const result = await sendFunnelEmailViaSysteme(signup.email, day as any);

      if (result.ok) {
        await recordEmailSent(supabaseAdmin, signup.user_id, day as any, undefined, result.response);

        const stateKey = `day${day}_sent_at`;
        await updateEmailFunnelState(supabaseAdmin, signup.user_id, {
          [stateKey]: new Date().toISOString(),
        });

        successCount++;
      } else {
        failureCount++;
        failures.push({ user_id: signup.user_id, email: signup.email, error: result.error || "Unknown" });
      }
    }

    return NextResponse.json({
      ok: true,
      day,
      sent: successCount,
      failed: failureCount,
      total: toSend.length,
      failures: failures.slice(0, 10), // Return first 10 failures
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Send day error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function updateEmailFunnelState(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  updates: Record<string, any>,
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("email_funnel_state")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("user_id", userId);

  if (error) {
    console.error("[EMAIL_FUNNEL] Error updating funnel state:", error);
  }
}
