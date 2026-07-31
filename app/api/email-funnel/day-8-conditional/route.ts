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
      .eq("email_day", 8)
      .limit(1);

    if (alreadySent && alreadySent.length > 0) {
      return NextResponse.json({ ok: true, message: "Day 8 email already sent" });
    }

    // Determine user tier based on full 7 days
    const tier = await determineUserTier(supabaseAdmin, userId, signupDate);
    const isPro = await checkIfUserIsPro(supabaseAdmin, userId);

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

    // Send email via systeme.io
    const result = await sendFunnelEmailViaSysteme(userEmail, 8, version);

    if (!result.ok) {
      console.error(`[EMAIL_FUNNEL] Day 8 send failed for user ${userId}:`, result.error);
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 },
      );
    }

    // Record the send
    await recordEmailSent(supabaseAdmin, userId, 8, version, result.response);

    // Update funnel state and mark as complete
    await updateEmailFunnelState(supabaseAdmin, userId, {
      day8_sent_at: new Date().toISOString(),
      day8_version: version,
      funnel_completed_at: new Date().toISOString(),
      is_pro: isPro,
      tier_at_completion: tier,
    });

    // Update user tier
    await updateUserTier(supabaseAdmin, userId, tier);

    return NextResponse.json({
      ok: true,
      user_id: userId,
      day: 8,
      version,
      tier,
      is_pro: isPro,
      funnel_complete: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Day 8 error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
