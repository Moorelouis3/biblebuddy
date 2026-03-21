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
  const code = typeof body?.code === "string" ? body.code.toUpperCase().replace(/[^A-Z0-9]/g, "") : "";

  if (code.length < 4 || code.length > 16) {
    return NextResponse.json({ error: "Code must be 4–16 letters/numbers." }, { status: 400 });
  }

  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  // Verify they have the buddy_partner badge
  const { data: ps } = await supabase
    .from("profile_stats")
    .select("member_badge")
    .eq("user_id", userId)
    .maybeSingle();

  if (ps?.member_badge !== "buddy_partner") {
    return NextResponse.json({ error: "Not a Buddy Partner." }, { status: 403 });
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
