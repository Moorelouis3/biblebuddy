import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const supabaseAuth = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user || userData.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  // Get all ambassador profiles
  const { data: ambassadors } = await supabase
    .from("ambassador_profiles")
    .select("id, user_id, referral_code, is_active, created_at")
    .order("created_at", { ascending: false });

  if (!ambassadors || ambassadors.length === 0) {
    return NextResponse.json({ ambassadors: [] });
  }

  const ambassadorUserIds = ambassadors.map((a) => a.user_id);

  // Get profile info for all ambassadors
  const { data: profiles } = await supabase
    .from("profile_stats")
    .select("user_id, username, display_name, profile_image_url")
    .in("user_id", ambassadorUserIds);

  const profileMap = new Map((profiles || []).map((p) => [p.user_id, p]));

  // Get all referrals grouped by ambassador
  const { data: referrals } = await supabase
    .from("ambassador_referrals")
    .select("ambassador_user_id, referred_user_id, referral_code, trial_started_at, trial_ends_at")
    .in("ambassador_user_id", ambassadorUserIds)
    .order("trial_started_at", { ascending: false });

  const referralsByAmbassador = new Map<string, typeof referrals>();
  (referrals || []).forEach((r) => {
    const list = referralsByAmbassador.get(r.ambassador_user_id) ?? [];
    list.push(r);
    referralsByAmbassador.set(r.ambassador_user_id, list);
  });

  // Get usernames for referred users
  const allReferredIds = (referrals || []).map((r) => r.referred_user_id);
  const { data: referredProfiles } = allReferredIds.length > 0
    ? await supabase
        .from("profile_stats")
        .select("user_id, username, display_name, profile_image_url")
        .in("user_id", allReferredIds)
    : { data: [] };

  const referredProfileMap = new Map((referredProfiles || []).map((p) => [p.user_id, p]));

  const result = ambassadors.map((amb) => {
    const profile = profileMap.get(amb.user_id);
    const myReferrals = (referralsByAmbassador.get(amb.user_id) ?? []).map((r) => {
      const rp = referredProfileMap.get(r.referred_user_id);
      return {
        referred_user_id: r.referred_user_id,
        username: rp?.username ?? rp?.display_name ?? "Unknown",
        profile_image_url: rp?.profile_image_url ?? null,
        trial_started_at: r.trial_started_at,
        trial_ends_at: r.trial_ends_at,
      };
    });

    return {
      user_id: amb.user_id,
      referral_code: amb.referral_code,
      is_active: amb.is_active,
      created_at: amb.created_at,
      username: profile?.username ?? profile?.display_name ?? "Unknown",
      display_name: profile?.display_name ?? profile?.username ?? "Unknown",
      profile_image_url: profile?.profile_image_url ?? null,
      total_referrals: myReferrals.length,
      referrals: myReferrals,
    };
  });

  return NextResponse.json({ ambassadors: result });
}
