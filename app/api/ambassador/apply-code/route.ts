import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { markUserAsPaidAndTrackUpgrade } from "@/lib/server/upgradeTracking";
import { ACTION_TYPE } from "@/lib/actionTypes";

const REFERRAL_REWARD_DIAMONDS = 250;
const REFERRAL_REWARD_XP = 250;

function buildReferralCode(seed: string | null | undefined) {
  const letters = (seed || "BUDDY").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 7) || "BUDDY";
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let suffix = "";
  while ((letters + suffix).length < 10) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return (letters + suffix).slice(0, 10);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  const referrerUserId = typeof body?.referrerUserId === "string" ? body.referrerUserId.trim() : "";

  if (!code && !referrerUserId) {
    return NextResponse.json({ error: "No invite link provided." }, { status: 400 });
  }

  // Authenticate the requesting user. Some app paths use Supabase's browser
  // session token without a server-readable auth cookie, so support both.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const authResult = token
    ? await createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } }).auth.getUser(token)
    : await (async () => {
        const cookieStore = await cookies();
        const supabaseAuth = createServerClient(url, anonKey, {
          cookies: {
            get(name: string) { return cookieStore.get(name)?.value; },
            set() {},
            remove() {},
          },
        });
        return supabaseAuth.auth.getUser();
      })();

  const { data: { user }, error: authError } = authResult;
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  let ambassadorQuery = supabase
    .from("ambassador_profiles")
    .select("id, user_id, referral_code, is_active");

  ambassadorQuery = referrerUserId
    ? ambassadorQuery.eq("user_id", referrerUserId)
    : ambassadorQuery.eq("referral_code", code);

  let { data: ambassador, error: lookupError } = await ambassadorQuery.maybeSingle();

  if (!ambassador && referrerUserId && !lookupError) {
    const { data: referrerProfile } = await supabase
      .from("profile_stats")
      .select("username, display_name")
      .eq("user_id", referrerUserId)
      .maybeSingle();

    const { data: createdAmbassador, error: createAmbassadorError } = await supabase
      .from("ambassador_profiles")
      .insert({
        user_id: referrerUserId,
        referral_code: buildReferralCode(referrerProfile?.username ?? referrerProfile?.display_name),
        is_active: true,
      })
      .select("id, user_id, referral_code, is_active")
      .maybeSingle();

    if (!createAmbassadorError) {
      ambassador = createdAmbassador;
    }
  }

  if (lookupError || !ambassador || !ambassador.is_active) {
    return NextResponse.json({ error: "Invalid or inactive invite link." }, { status: 400 });
  }

  if (ambassador.user_id === user.id) {
    return NextResponse.json({ error: "You cannot use your own Buddy Rewards invite link." }, { status: 400 });
  }

  // Make sure this referred user hasn't already been credited to an invite.
  const { data: existingReferral } = await supabase
    .from("ambassador_referrals")
    .select("id")
    .eq("referred_user_id", user.id)
    .maybeSingle();

  if (existingReferral) {
    return NextResponse.json({ error: "You have already used an invite link." }, { status: 400 });
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
  const { error: referralError } = await supabase.from("ambassador_referrals").insert({
    ambassador_user_id: ambassador.user_id,
    referred_user_id: user.id,
    referral_code: ambassador.referral_code || "INVITE_LINK",
    trial_started_at: trialStartedAt.toISOString(),
    trial_ends_at: trialEndsAt.toISOString(),
  });

  if (referralError) {
    return NextResponse.json({ error: referralError.message || "Could not apply Buddy Rewards invite." }, { status: 400 });
  }

  const { data: referrerProfile } = await supabase
    .from("profile_stats")
    .select("user_id, username, display_name, diamonds_count, total_diamonds_earned")
    .eq("user_id", ambassador.user_id)
    .maybeSingle();

  const nextDiamonds = Math.max(0, Number(referrerProfile?.diamonds_count ?? 0)) + REFERRAL_REWARD_DIAMONDS;
  const nextTotalEarned = Math.max(0, Number(referrerProfile?.total_diamonds_earned ?? 0)) + REFERRAL_REWARD_DIAMONDS;
  await supabase
    .from("profile_stats")
    .upsert(
      {
        user_id: ambassador.user_id,
        diamonds_count: nextDiamonds,
        total_diamonds_earned: nextTotalEarned,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

  await supabase.from("master_actions").insert({
    user_id: ambassador.user_id,
    username: referrerProfile?.username || referrerProfile?.display_name || "Bible Buddy",
    action_type: ACTION_TYPE.referral_signup_reward,
    action_label: `Buddy Rewards invite signup (+${REFERRAL_REWARD_XP} XP, +${REFERRAL_REWARD_DIAMONDS} diamonds)`,
    created_at: trialStartedAt.toISOString(),
  });

  await supabase.from("notifications").insert({
    user_id: ambassador.user_id,
    type: "referral_signup_reward",
    from_user_id: user.id,
    from_user_name: "Buddy Rewards",
    article_slug: "/dashboard",
    message: `got you a new signup. You earned ${REFERRAL_REWARD_XP} XP and ${REFERRAL_REWARD_DIAMONDS} diamonds.`,
    is_read: false,
    created_at: trialStartedAt.toISOString(),
  });

  // Grant 30-day Pro trial and log the upgrade event if this is a new paid conversion.
  await markUserAsPaidAndTrackUpgrade({
    supabase,
    userId: user.id,
    source: "buddy_rewards_trial",
    membershipStatus: "pro",
    proExpiresAt: trialEndsAt.toISOString(),
    actionLabel: "Buddy Rewards 30-day Pro trial started",
  });

  return NextResponse.json({
    success: true,
    trialEndsAt: trialEndsAt.toISOString(),
    rewardDiamonds: REFERRAL_REWARD_DIAMONDS,
    rewardXp: REFERRAL_REWARD_XP,
  });
}
