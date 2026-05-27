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
  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.toUpperCase().replace(/[^A-Z]/g, "") : "";

  if (code.length < 4 || code.length > 10) {
    return NextResponse.json({ error: "Code must be one word, 4-10 letters." }, { status: 400 });
  }

  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: existing } = await supabase
    .from("ambassador_profiles")
    .select("referral_code")
    .eq("user_id", userId)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: "Create your invite code first." }, { status: 400 });
  }

  const { data: referrals } = await supabase
    .from("ambassador_referrals")
    .select("id")
    .eq("ambassador_user_id", userId)
    .limit(1);

  if ((referrals || []).length > 0) {
    return NextResponse.json({ error: "Your code is locked after your first signup." }, { status: 400 });
  }

  const { error } = await supabase
    .from("ambassador_profiles")
    .update({ referral_code: code })
    .eq("user_id", userId);

  if (error) {
    const msg = error.message.includes("unique") ? "That code is already taken. Try another." : error.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  return NextResponse.json({ ok: true, referral_code: code });
}
