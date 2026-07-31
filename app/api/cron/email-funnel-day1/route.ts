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

// Send Day 1 (welcome) emails to users who signed up in the last 24 hours
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
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get users who signed up in the last 24 hours and haven't received Day 1 yet
    const { data: eligibleUsers, error: queryError } = await supabaseAdmin
      .from("email_funnel_state")
      .select("user_id")
      .gte("signup_timestamp", oneDayAgo.toISOString())
      .is("day1_sent_at", null)
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

    for (const signup of userSignups || []) {
      const result = await sendFunnelEmailViaSysteme(signup.email, 1);

      if (result.ok) {
        await recordEmailSent(supabaseAdmin, signup.user_id, 1, undefined, result.response);
        await updateEmailFunnelState(supabaseAdmin, signup.user_id, {
          day1_sent_at: new Date().toISOString(),
        });
        successCount++;
      } else {
        failureCount++;
      }
    }

    return NextResponse.json({
      ok: true,
      day: 1,
      sent: successCount,
      failed: failureCount,
      total: userSignups?.length || 0,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Day 1 cron error:", message);
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
