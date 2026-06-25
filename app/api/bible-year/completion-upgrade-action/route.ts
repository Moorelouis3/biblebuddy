import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_ACTION_TYPES = new Set([
  "upgrade_popup_viewed",
  "upgrade_popup_dismissed",
  "upgrade_popup_cta_clicked",
]);

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const actionType = typeof body?.actionType === "string" ? body.actionType.trim() : "";
  const label = typeof body?.label === "string" ? body.label.trim() : "";
  const dayNumber = Number.isFinite(Number(body?.dayNumber)) ? Number(body.dayNumber) : null;
  const eventMetadata =
    body?.eventMetadata && typeof body.eventMetadata === "object" && !Array.isArray(body.eventMetadata)
      ? body.eventMetadata
      : {};

  if (!ALLOWED_ACTION_TYPES.has(actionType) || !label) {
    return NextResponse.json({ error: "Invalid action payload." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const currentUser = userData.user;
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: profile } = await supabaseAdmin
    .from("profile_stats")
    .select("username, is_paid")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  const meta = currentUser.user_metadata || {};
  const username =
    profile?.username ||
    meta.firstName ||
    meta.first_name ||
    (currentUser.email ? currentUser.email.split("@")[0] : null) ||
    "User";

  const payload = {
    user_id: currentUser.id,
    username,
    action_type: actionType,
    action_label: label,
    journey_day: dayNumber,
    account_status: profile?.is_paid ? "pro" : "free_or_guest",
    event_metadata: {
      plan: "bible_in_one_year",
      prompt: "bible_year_completion_upgrade",
      checkoutContext: "bible_year_completion_upgrade_offer",
      source: "bible_year_day_completion",
      dayNumber,
      label,
      ...eventMetadata,
    },
  };

  const { error: insertError } = await supabaseAdmin.from("master_actions").insert(payload);
  if (insertError) {
    return NextResponse.json({ error: insertError.message || "Could not log action." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
