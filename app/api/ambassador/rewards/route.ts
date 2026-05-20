import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function buildReferralCode(seed: string | null | undefined) {
  const letters = (seed || "BUDDY").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 7) || "BUDDY";
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let suffix = "";
  while ((letters + suffix).length < 10) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return (letters + suffix).slice(0, 10);
}

export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const supabaseAuth = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const userId = userData.user.id;
  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: profileStats } = await supabase
    .from("profile_stats")
    .select("username, display_name")
    .eq("user_id", userId)
    .maybeSingle();

  const { data: existingProfile, error: profileError } = await supabase
    .from("ambassador_profiles")
    .select("referral_code, is_active")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileError) {
    return NextResponse.json({ error: profileError.message || "Could not load Buddy Rewards." }, { status: 500 });
  }

  let rewardsProfile = existingProfile;
  if (!rewardsProfile) {
    const code = buildReferralCode(profileStats?.username ?? profileStats?.display_name);
    const { data: createdProfile, error: createError } = await supabase
      .from("ambassador_profiles")
      .insert({ user_id: userId, referral_code: code, is_active: true })
      .select("referral_code, is_active")
      .maybeSingle();

    if (createError) {
      return NextResponse.json({ error: createError.message || "Could not create Buddy Rewards profile." }, { status: 500 });
    }
    rewardsProfile = createdProfile;
  }

  const referralCode = rewardsProfile?.referral_code || "";
  const referralFilter = referralCode
    ? `ambassador_user_id.eq.${userId},referral_code.eq.${referralCode}`
    : `ambassador_user_id.eq.${userId}`;
  const { data: referralRows, error: referralError } = await supabase
    .from("ambassador_referrals")
    .select("ambassador_user_id, referred_user_id, referral_code, trial_started_at, trial_ends_at")
    .or(referralFilter)
    .order("trial_started_at", { ascending: false });

  if (referralError) {
    return NextResponse.json({ error: referralError.message || "Could not load signup log." }, { status: 500 });
  }

  const uniqueReferralRows = Array.from(
    new Map((referralRows || []).map((referral) => [referral.referred_user_id, referral])).values(),
  );
  const referredUserIds = uniqueReferralRows.map((referral) => referral.referred_user_id);
  const { data: referredProfiles } = referredUserIds.length
    ? await supabase
        .from("profile_stats")
        .select("user_id, username, display_name, profile_image_url")
        .in("user_id", referredUserIds)
    : { data: [] };

  const profileMap = new Map((referredProfiles || []).map((profile) => [profile.user_id, profile]));
  const referrals = uniqueReferralRows.map((referral) => {
    const referredProfile = profileMap.get(referral.referred_user_id);
    return {
      ...referral,
      username: referredProfile?.username ?? null,
      display_name: referredProfile?.display_name ?? null,
      profile_image_url: referredProfile?.profile_image_url ?? null,
    };
  });

  return NextResponse.json({
    profile: {
      referral_code: rewardsProfile?.referral_code || "",
      is_active: rewardsProfile?.is_active !== false,
      user_id: userId,
    },
    referrals,
  });
}
