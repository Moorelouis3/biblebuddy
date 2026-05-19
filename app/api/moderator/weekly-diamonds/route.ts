import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { normalizeCustomMemberBadge } from "@/lib/userBadges";
import {
  MODERATOR_WEEKLY_DIAMOND_AMOUNT,
  ensureCurrentWeekModeratorPayouts,
  getCurrentModeratorPayoutWeekStart,
  getCurrentUserModeratorPayout,
  getModeratorPayoutDashboard,
} from "@/lib/moderatorWeeklyDiamonds";

const ADMIN_EMAIL = "moorelouis3@gmail.com";
const MODERATOR_PAYOUT_POPUP_FIX_AT = "2026-05-19T18:51:57.000Z";
const MODERATOR_SKIN_SIGNING_BONUS_AMOUNT = 5000;
const MODERATOR_SKIN_SIGNING_BONUS_ID = "moderator-skin-signing-bonus-2026-05-19";
const MODERATOR_SKIN_SIGNING_BONUS_LABEL = "moderator_skin_signing_bonus:premium_skins:2026-05-19";
const MODERATOR_WEEKLY_FALLBACK_ID_PREFIX = "moderator-weekly-diamond-payout";

function shouldShowPayoutPopupAgain(seenAt: string | null | undefined) {
  if (!seenAt) return true;
  const seenMs = new Date(seenAt).getTime();
  const fixedMs = new Date(MODERATOR_PAYOUT_POPUP_FIX_AT).getTime();
  return Number.isFinite(seenMs) && seenMs < fixedMs;
}

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

async function ensureCurrentUserSkinSigningBonus(auth: Awaited<ReturnType<typeof requireSignedInUser>>) {
  if ("error" in auth || (!auth.isModerator && !auth.isAdmin)) return null;

  const { data: existingAction } = await auth.admin
    .from("master_actions")
    .select("id, created_at")
    .eq("user_id", auth.requester.id)
    .eq("action_label", MODERATOR_SKIN_SIGNING_BONUS_LABEL)
    .maybeSingle();

  if (!existingAction) {
    const { data: profile } = await auth.admin
      .from("profile_stats")
      .select("diamonds_count, total_diamonds_earned, username, display_name")
      .eq("user_id", auth.requester.id)
      .maybeSingle();

    const nextDiamonds = Math.max(0, Number(profile?.diamonds_count ?? 0)) + MODERATOR_SKIN_SIGNING_BONUS_AMOUNT;
    const nextTotalEarned = Math.max(0, Number(profile?.total_diamonds_earned ?? 0)) + MODERATOR_SKIN_SIGNING_BONUS_AMOUNT;

    await auth.admin
      .from("profile_stats")
      .upsert(
        {
          user_id: auth.requester.id,
          diamonds_count: nextDiamonds,
          total_diamonds_earned: nextTotalEarned,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

    await auth.admin.from("master_actions").insert({
      user_id: auth.requester.id,
      username: profile?.username || profile?.display_name || auth.requester.email || "Bible Buddy Moderator",
      action_type: "moderator_skin_signing_bonus",
      action_label: MODERATOR_SKIN_SIGNING_BONUS_LABEL,
      created_at: new Date().toISOString(),
    });
  }

  const { data: seenRow } = await auth.admin
    .from("user_badge_popups_seen")
    .select("shown_at")
    .eq("user_id", auth.requester.id)
    .eq("badge_id", MODERATOR_SKIN_SIGNING_BONUS_ID)
    .maybeSingle();

  return {
    id: MODERATOR_SKIN_SIGNING_BONUS_ID,
    weekStart: "Premium Skins",
    amount: MODERATOR_SKIN_SIGNING_BONUS_AMOUNT,
    paidAt: existingAction?.created_at || new Date().toISOString(),
    seenAt: seenRow?.shown_at ?? null,
    kind: "skin_bonus" as const,
  };
}

async function addDiamondsToProfile(
  admin: SupabaseClient,
  userId: string,
  amount: number,
) {
  const { data: profile } = await admin
    .from("profile_stats")
    .select("diamonds_count, total_diamonds_earned")
    .eq("user_id", userId)
    .maybeSingle();

  const nextDiamonds = Math.max(0, Number(profile?.diamonds_count ?? 0)) + amount;
  const nextTotalEarned = Math.max(0, Number(profile?.total_diamonds_earned ?? 0)) + amount;

  await admin
    .from("profile_stats")
    .upsert(
      {
        user_id: userId,
        diamonds_count: nextDiamonds,
        total_diamonds_earned: nextTotalEarned,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );
}

async function ensureCurrentUserWeeklyFallbackPayout(auth: Awaited<ReturnType<typeof requireSignedInUser>>) {
  if ("error" in auth || (!auth.isModerator && !auth.isAdmin)) return null;

  const weekStart = getCurrentModeratorPayoutWeekStart();
  const payoutId = `${MODERATOR_WEEKLY_FALLBACK_ID_PREFIX}:${weekStart}`;
  const actionLabel = `moderator_weekly_diamond_payout:${weekStart}:${MODERATOR_WEEKLY_DIAMOND_AMOUNT}`;

  const { data: existingAction } = await auth.admin
    .from("master_actions")
    .select("id, created_at")
    .eq("user_id", auth.requester.id)
    .eq("action_label", actionLabel)
    .maybeSingle();

  let paidAt = existingAction?.created_at || new Date().toISOString();

  if (!existingAction) {
    const { data: profile } = await auth.admin
      .from("profile_stats")
      .select("username, display_name")
      .eq("user_id", auth.requester.id)
      .maybeSingle();

    await addDiamondsToProfile(auth.admin, auth.requester.id, MODERATOR_WEEKLY_DIAMOND_AMOUNT);
    const { data: insertedAction } = await auth.admin
      .from("master_actions")
      .insert({
        user_id: auth.requester.id,
        username: profile?.username || profile?.display_name || auth.requester.email || "Bible Buddy Moderator",
        action_type: "trivia_question_answered",
        action_label: actionLabel,
        created_at: paidAt,
      })
      .select("created_at")
      .maybeSingle();
    paidAt = insertedAction?.created_at || paidAt;
  }

  const { data: seenRow } = await auth.admin
    .from("user_badge_popups_seen")
    .select("shown_at")
    .eq("user_id", auth.requester.id)
    .eq("badge_id", payoutId)
    .maybeSingle();

  return {
    id: payoutId,
    weekStart,
    amount: MODERATOR_WEEKLY_DIAMOND_AMOUNT,
    paidAt,
    seenAt: seenRow?.shown_at ?? null,
    kind: "weekly" as const,
  };
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
  const skinSigningBonus = await ensureCurrentUserSkinSigningBonus(auth);
  if (canViewOwnPayout && payoutTableAvailable) {
    currentPayout = await getCurrentUserModeratorPayout(auth.admin, auth.requester.id);
    if (skinSigningBonus && shouldShowPayoutPopupAgain(skinSigningBonus.seenAt)) currentPayout = skinSigningBonus;
  }
  if (canViewOwnPayout && !payoutTableAvailable) {
    currentPayout = await ensureCurrentUserWeeklyFallbackPayout(auth);
    if (skinSigningBonus && shouldShowPayoutPopupAgain(skinSigningBonus.seenAt)) currentPayout = skinSigningBonus;
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
    unseenPayout: currentPayout && shouldShowPayoutPopupAgain(currentPayout.seenAt) ? currentPayout : null,
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

  if (
    payoutId.startsWith("admin-moderator-payout-preview:") ||
    payoutId.startsWith(`${MODERATOR_WEEKLY_FALLBACK_ID_PREFIX}:`) ||
    payoutId === MODERATOR_SKIN_SIGNING_BONUS_ID
  ) {
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
