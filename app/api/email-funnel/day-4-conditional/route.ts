import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendFunnelEmailViaSysteme,
  recordEmailSent,
  updateEmailFunnelState,
  getSignupTimestamp,
} from "@/lib/emailFunnelHelpers";

export const runtime = "nodejs";
export const maxDuration = 30;

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
    const userId = body.user_id;
    const userEmail = body.email;

    if (!userId || !userEmail) {
      return NextResponse.json({ error: "user_id and email required" }, { status: 400 });
    }

    // Get signup timestamp
    const signupDate = await getSignupTimestamp(supabaseAdmin, userId);
    if (!signupDate) {
      return NextResponse.json({ error: "Signup timestamp not found" }, { status: 400 });
    }

    // Check if already sent
    const { data: alreadySent } = await supabaseAdmin
      .from("email_funnel_sends")
      .select("id")
      .eq("user_id", userId)
      .eq("email_day", 4)
      .limit(1);

    if (alreadySent && alreadySent.length > 0) {
      return NextResponse.json({ ok: true, message: "Day 4 email already sent" });
    }

    // Single universal version -- Systeme.io's tag cap doesn't leave room
    // for per-tier A/B variants, so everyone gets the same Day 4 email.
    const version: "b" = "b";

    // Send email via systeme.io
    const result = await sendFunnelEmailViaSysteme(userEmail, 4, version);

    if (!result.ok) {
      console.error(`[EMAIL_FUNNEL] Day 4 send failed for user ${userId}:`, result.error);
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 },
      );
    }

    // Record the send
    await recordEmailSent(supabaseAdmin, userId, 4, version, result.response);

    // Update funnel state
    await updateEmailFunnelState(supabaseAdmin, userId, {
      day4_sent_at: new Date().toISOString(),
      day4_version: version,
    });

    return NextResponse.json({
      ok: true,
      user_id: userId,
      day: 4,
      version,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Day 4 error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
