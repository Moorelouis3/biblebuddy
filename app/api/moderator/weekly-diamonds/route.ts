import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeCustomMemberBadge } from "@/lib/userBadges";
import {
  MODERATOR_WEEKLY_DIAMOND_AMOUNT,
  ensureCurrentWeekModeratorPayouts,
  getCurrentModeratorPayoutWeekStart,
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

function isMissingPayoutTableError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const maybeError = error as { code?: string; message?: string };
  return maybeError.code === "PGRST205" || /moderator_weekly_diamond_payouts/i.test(maybeError.message || "");
}

export async function GET(request: NextRequest) {
  const auth = await requireSignedInUser(request);
  if ("error" in auth) return auth.error;

  if (!auth.isModerator && !auth.isAdmin) {
    return NextResponse.json({ ok: true, moderator: false, currentPayout: null });
  }

  let payoutTableAvailable = true;
  await ensureCurrentWeekModeratorPayouts(auth.admin).catch((error) => {
    if (isMissingPayoutTableError(error)) {
      payoutTableAvailable = false;
      return;
    }
    throw error;
  });

  const canViewOwnPayout = auth.isModerator || auth.isAdmin;
  let currentPayout = null;
  if (canViewOwnPayout && payoutTableAvailable) {
    currentPayout = await getCurrentUserModeratorPayout(auth.admin, auth.requester.id);
  }
  if (canViewOwnPayout && !payoutTableAvailable && auth.isAdmin) {
    const weekStart = getCurrentModeratorPayoutWeekStart();
    const fallbackId = `admin-moderator-payout-preview:${weekStart}`;
    const { data: seenRow } = await auth.admin
      .from("user_badge_popups_seen")
      .select("shown_at")
      .eq("user_id", auth.requester.id)
      .eq("badge_id", fallbackId)
      .maybeSingle();
    currentPayout = {
      id: fallbackId,
      weekStart,
      amount: MODERATOR_WEEKLY_DIAMOND_AMOUNT,
      paidAt: new Date().toISOString(),
      seenAt: seenRow?.shown_at ?? null,
    };
  }
  const { data: updatedProfile } = canViewOwnPayout
    ? await auth.admin
        .from("profile_stats")
        .select("diamonds_count, total_diamonds_earned")
        .eq("user_id", auth.requester.id)
        .maybeSingle()
    : { data: null };
  const dashboard = (auth.isModerator || auth.isAdmin) && payoutTableAvailable
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

  if (!auth.isModerator && !auth.isAdmin) {
    return NextResponse.json({ error: "Only moderators can mark moderator payouts seen." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const payoutId = typeof body?.payoutId === "string" ? body.payoutId : "";

  if (!payoutId) {
    return NextResponse.json({ error: "Missing payout id." }, { status: 400 });
  }

  if (payoutId.startsWith("admin-moderator-payout-preview:")) {
    const { error } = await auth.admin.from("user_badge_popups_seen").upsert(
      {
        user_id: auth.requester.id,
        badge_id: payoutId,
        shown_at: new Date().toISOString(),
      },
      { onConflict: "user_id,badge_id" },
    );
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
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
