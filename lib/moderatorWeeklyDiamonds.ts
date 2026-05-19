import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeCustomMemberBadge } from "./userBadges";

export const MODERATOR_WEEKLY_DIAMOND_AMOUNT = 1000;

export type ModeratorPayoutSummary = {
  userId: string;
  name: string;
  image: string | null;
  profileHref: string;
  currentDiamonds: number;
  totalDiamondsEarned: number;
  lastPaidAt: string | null;
  lastWeekStart: string | null;
  totalPaid: number;
  payoutCount: number;
};

export type ModeratorCurrentPayout = {
  id: string;
  weekStart: string;
  amount: number;
  paidAt: string;
  seenAt: string | null;
};

type ModeratorProfileRow = {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  member_badge: string | null;
  diamonds_count: number | null;
  total_diamonds_earned: number | null;
};

type ModeratorPayoutRow = {
  id: string;
  user_id: string;
  week_start: string;
  amount: number;
  paid_at: string;
  seen_at: string | null;
};

export function getCurrentModeratorPayoutWeekStart(now = new Date()) {
  const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = utcDate.getUTCDay();
  const daysSinceMonday = (day + 6) % 7;
  utcDate.setUTCDate(utcDate.getUTCDate() - daysSinceMonday);
  return utcDate.toISOString().slice(0, 10);
}

function moderatorName(profile: Pick<ModeratorProfileRow, "display_name" | "username">) {
  return profile.display_name || profile.username || "Bible Buddy Moderator";
}

async function getModeratorProfiles(admin: SupabaseClient) {
  const { data, error } = await admin
    .from("profile_stats")
    .select("user_id, display_name, username, profile_image_url, member_badge, diamonds_count, total_diamonds_earned")
    .eq("member_badge", "moderator");

  if (error) throw error;

  return ((data || []) as ModeratorProfileRow[]).filter(
    (profile) => normalizeCustomMemberBadge(profile.member_badge) === "moderator",
  );
}

async function awardModeratorDiamonds(admin: SupabaseClient, profile: ModeratorProfileRow, amount: number) {
  const nextDiamonds = Math.max(0, Number(profile.diamonds_count ?? 0)) + amount;
  const nextTotalEarned = Math.max(0, Number(profile.total_diamonds_earned ?? 0)) + amount;

  const { error } = await admin
    .from("profile_stats")
    .update({
      diamonds_count: nextDiamonds,
      total_diamonds_earned: nextTotalEarned,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", profile.user_id);

  if (error) throw error;
}

export async function ensureCurrentWeekModeratorPayouts(admin: SupabaseClient) {
  const weekStart = getCurrentModeratorPayoutWeekStart();
  const moderators = await getModeratorProfiles(admin);
  const paidUserIds: string[] = [];

  for (const moderator of moderators) {
    const { data: existing, error: existingError } = await admin
      .from("moderator_weekly_diamond_payouts")
      .select("id")
      .eq("user_id", moderator.user_id)
      .eq("week_start", weekStart)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existing) continue;

    const { data: inserted, error: insertError } = await admin
      .from("moderator_weekly_diamond_payouts")
      .insert({
        user_id: moderator.user_id,
        week_start: weekStart,
        amount: MODERATOR_WEEKLY_DIAMOND_AMOUNT,
      })
      .select("id")
      .maybeSingle();

    if (insertError) {
      if (insertError.code === "23505") continue;
      throw insertError;
    }

    if (!inserted) continue;
    await awardModeratorDiamonds(admin, moderator, MODERATOR_WEEKLY_DIAMOND_AMOUNT);
    paidUserIds.push(moderator.user_id);
  }

  return { weekStart, paidUserIds };
}

export async function getModeratorPayoutDashboard(admin: SupabaseClient) {
  const moderators = await getModeratorProfiles(admin);
  const moderatorIds = moderators.map((moderator) => moderator.user_id);

  const { data: payoutRows, error: payoutError } = moderatorIds.length
    ? await admin
        .from("moderator_weekly_diamond_payouts")
        .select("id, user_id, week_start, amount, paid_at, seen_at")
        .in("user_id", moderatorIds)
        .order("paid_at", { ascending: false })
    : { data: [] as ModeratorPayoutRow[], error: null };

  if (payoutError) throw payoutError;

  const payoutsByUser = new Map<string, ModeratorPayoutRow[]>();
  ((payoutRows || []) as ModeratorPayoutRow[]).forEach((payout) => {
    payoutsByUser.set(payout.user_id, [...(payoutsByUser.get(payout.user_id) || []), payout]);
  });

  const moderatorsSummary: ModeratorPayoutSummary[] = moderators.map((moderator) => {
    const payouts = payoutsByUser.get(moderator.user_id) || [];
    const lastPayout = payouts[0] || null;
    return {
      userId: moderator.user_id,
      name: moderatorName(moderator),
      image: moderator.profile_image_url || null,
      profileHref: `/profile/${moderator.user_id}`,
      currentDiamonds: Math.max(0, Number(moderator.diamonds_count ?? 0)),
      totalDiamondsEarned: Math.max(0, Number(moderator.total_diamonds_earned ?? 0)),
      lastPaidAt: lastPayout?.paid_at ?? null,
      lastWeekStart: lastPayout?.week_start ?? null,
      totalPaid: payouts.reduce((sum, payout) => sum + Math.max(0, Number(payout.amount ?? 0)), 0),
      payoutCount: payouts.length,
    };
  });

  return {
    amount: MODERATOR_WEEKLY_DIAMOND_AMOUNT,
    weekStart: getCurrentModeratorPayoutWeekStart(),
    moderators: moderatorsSummary,
    totalPaidAllTime: moderatorsSummary.reduce((sum, moderator) => sum + moderator.totalPaid, 0),
  };
}

export async function getCurrentUserModeratorPayout(admin: SupabaseClient, userId: string): Promise<ModeratorCurrentPayout | null> {
  const weekStart = getCurrentModeratorPayoutWeekStart();
  const { data, error } = await admin
    .from("moderator_weekly_diamond_payouts")
    .select("id, week_start, amount, paid_at, seen_at")
    .eq("user_id", userId)
    .eq("week_start", weekStart)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as Pick<ModeratorPayoutRow, "id" | "week_start" | "amount" | "paid_at" | "seen_at">;
  return {
    id: row.id,
    weekStart: row.week_start,
    amount: Math.max(0, Number(row.amount ?? 0)),
    paidAt: row.paid_at,
    seenAt: row.seen_at,
  };
}
