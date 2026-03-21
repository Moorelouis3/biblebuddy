import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
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

  // Verify they have the buddy_partner badge
  const { data: ps } = await supabase
    .from("profile_stats")
    .select("member_badge, username, display_name")
    .eq("user_id", userId)
    .maybeSingle();

  if (ps?.member_badge !== "buddy_partner") {
    return NextResponse.json({ error: "Not a Buddy Partner." }, { status: 403 });
  }

  // Check if profile already exists
  const { data: existing } = await supabase
    .from("ambassador_profiles")
    .select("referral_code, is_active")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ referral_code: existing.referral_code, is_active: existing.is_active });
  }

  // Create it
  const base = ((ps.username ?? ps.display_name ?? "BUDDY").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8));
  const suffix = String(Math.floor(Math.random() * 90) + 10);
  const code = base + suffix;

  const { data: created, error: insertError } = await supabase
    .from("ambassador_profiles")
    .insert({ user_id: userId, referral_code: code, is_active: true })
    .select("referral_code, is_active")
    .maybeSingle();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ referral_code: created?.referral_code, is_active: created?.is_active });
}
