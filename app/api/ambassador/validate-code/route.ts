import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";

  if (!code) {
    return NextResponse.json({ valid: false, error: "No code provided." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  // Look up the code in ambassador_profiles
  const { data, error } = await supabase
    .from("ambassador_profiles")
    .select("id, user_id, referral_code, is_active")
    .eq("referral_code", code)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ valid: false, error: "Code not found." });
  }

  if (!data.is_active) {
    return NextResponse.json({ valid: false, error: "This code is no longer active." });
  }

  return NextResponse.json({ valid: true, code: data.referral_code });
}
