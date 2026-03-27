import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { markUserAsPaidAndTrackUpgrade } from "@/lib/server/upgradeTracking";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";

  if (!code) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  // Authenticate the requesting user
  const cookieStore = await cookies();
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set() {},
        remove() {},
      },
    }
  );

  const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  // Validate code
  const { data: ambassador, error: lookupError } = await supabase
    .from("ambassador_profiles")
    .select("id, user_id, referral_code, is_active")
    .eq("referral_code", code)
    .maybeSingle();

  if (lookupError || !ambassador || !ambassador.is_active) {
    return NextResponse.json({ error: "Invalid or inactive code." }, { status: 400 });
  }

  // Ensure ambassador still has buddy_partner badge
  const { data: ambProfile } = await supabase
    .from("profile_stats")
    .select("member_badge")
    .eq("user_id", ambassador.user_id)
    .maybeSingle();

  if (ambProfile?.member_badge !== "buddy_partner") {
    return NextResponse.json({ error: "Invalid code." }, { status: 400 });
  }

  // Make sure this referred user hasn't already used a code
  const { data: existingReferral } = await supabase
    .from("ambassador_referrals")
    .select("id")
    .eq("referred_user_id", user.id)
    .maybeSingle();

  if (existingReferral) {
    return NextResponse.json({ error: "You have already used a referral code." }, { status: 400 });
  }

  // Also skip if already paid/pro permanently
  const { data: currentProfile } = await supabase
    .from("profile_stats")
    .select("is_paid, pro_expires_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (currentProfile?.is_paid && !currentProfile.pro_expires_at) {
    return NextResponse.json({ error: "You already have an active Pro subscription." }, { status: 400 });
  }

  const trialStartedAt = new Date();
  const trialEndsAt = new Date(trialStartedAt.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 days

  // Create referral record
  await supabase.from("ambassador_referrals").insert({
    ambassador_user_id: ambassador.user_id,
    referred_user_id: user.id,
    referral_code: code,
    trial_started_at: trialStartedAt.toISOString(),
    trial_ends_at: trialEndsAt.toISOString(),
  });

  // Grant 30-day Pro trial and log the upgrade event if this is a new paid conversion
  await markUserAsPaidAndTrackUpgrade({
    supabase,
    userId: user.id,
    source: "ambassador_trial",
    membershipStatus: "pro",
    proExpiresAt: trialEndsAt.toISOString(),
    actionLabel: "Ambassador 30-day Pro trial started",
  });

  return NextResponse.json({ success: true, trialEndsAt: trialEndsAt.toISOString() });
}
