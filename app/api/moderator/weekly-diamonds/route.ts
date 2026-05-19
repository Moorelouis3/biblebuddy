import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeCustomMemberBadge } from "@/lib/userBadges";
import {
  ensureCurrentWeekModeratorPayouts,
  getCurrentUserModeratorPayout,
  getModeratorPayoutDashboard,
} from "@/lib/moderatorWeeklyDiamonds";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

function getServerClients(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    throw new Error("Server not configured.");
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";

  return {
    token,
    auth: createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } }),
    admin: createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } }),
  };
}

async function requireSignedInUser(request: NextRequest) {
  const clients = getServerClients(request);
  if (!clients.token) {
    return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }

  const { data, error } = await clients.auth.auth.getUser(clients.token);
  if (error || !data.user) {
    return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }

  const { data: profile } = await clients.admin
    .from("profile_stats")
    .select("member_badge")
    .eq("user_id", data.user.id)
    .maybeSingle();

  const isAdmin = data.user.email === ADMIN_EMAIL;
  const isModerator = normalizeCustomMemberBadge(profile?.member_badge) === "moderator";

  return {
    admin: clients.admin,
    requester: data.user,
    isAdmin,
    isModerator,
  };
}

export async function GET(request: NextRequest) {
  const auth = await requireSignedInUser(request);
  if ("error" in auth) return auth.error;

  if (!auth.isModerator && !auth.isAdmin) {
    return NextResponse.json({ ok: true, moderator: false, currentPayout: null });
  }

  await ensureCurrentWeekModeratorPayouts(auth.admin);

  const currentPayout = auth.isModerator
    ? await getCurrentUserModeratorPayout(auth.admin, auth.requester.id)
    : null;
  const { data: updatedProfile } = auth.isModerator
    ? await auth.admin
        .from("profile_stats")
        .select("diamonds_count, total_diamonds_earned")
        .eq("user_id", auth.requester.id)
        .maybeSingle()
    : { data: null };
  const dashboard = auth.isModerator || auth.isAdmin
    ? await getModeratorPayoutDashboard(auth.admin)
    : null;

  return NextResponse.json({
    ok: true,
    moderator: auth.isModerator,
    currentPayout,
    unseenPayout: currentPayout && !currentPayout.seenAt ? currentPayout : null,
    currentDiamonds: updatedProfile?.diamonds_count ?? null,
    totalDiamondsEarned: updatedProfile?.total_diamonds_earned ?? null,
    dashboard,
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireSignedInUser(request);
  if ("error" in auth) return auth.error;

  if (!auth.isModerator) {
    return NextResponse.json({ error: "Only moderators can mark moderator payouts seen." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const payoutId = typeof body?.payoutId === "string" ? body.payoutId : "";

  if (!payoutId) {
    return NextResponse.json({ error: "Missing payout id." }, { status: 400 });
  }

  const { error } = await auth.admin
    .from("moderator_weekly_diamond_payouts")
    .update({ seen_at: new Date().toISOString() })
    .eq("id", payoutId)
    .eq("user_id", auth.requester.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
