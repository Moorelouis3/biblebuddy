import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { ActionType } from "./actionTypes";

interface ProfileStatsRow {
  is_paid: boolean | null;
  daily_credits: number | null;
  last_credit_reset: string | null;
}

export interface ConsumeCreditResult {
  ok: boolean;
  reason?: "no_credits" | "missing_profile" | "config" | "error";
  dailyCredits?: number;
}

function getSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !url) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function toDateString(value: string | null): string | null {
  if (!value) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
}

export async function consumeCredit(
  userId: string,
  actionType: ActionType
): Promise<ConsumeCreditResult> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    console.error("[CONSUME_CREDIT] Supabase service role key or URL not configured");
    return { ok: false, reason: "config" };
  }

  const { data: profileStats, error: fetchError } = await supabaseAdmin
    .from("profile_stats")
    .select("is_paid, daily_credits, last_credit_reset")
    .eq("user_id", userId)
    .maybeSingle<ProfileStatsRow>();

  if (fetchError) {
    console.error("[CONSUME_CREDIT] Error fetching profile_stats:", fetchError);
    return { ok: false, reason: "error" };
  }

  if (!profileStats) {
    console.error("[CONSUME_CREDIT] No profile_stats row for user:", userId);
    return { ok: false, reason: "missing_profile" };
  }

  if (profileStats.is_paid) {
    const { error: actionError } = await supabaseAdmin
      .from("master_actions")
      .insert({
        user_id: userId,
        action_type: actionType,
      });

    if (actionError) {
      console.error("[CONSUME_CREDIT] Error logging master_actions:", actionError);
      return { ok: false, reason: "error" };
    }

    return { ok: true };
  }

  const today = new Date().toISOString().slice(0, 10);
  const lastReset = toDateString(profileStats.last_credit_reset);
  let dailyCredits = profileStats.daily_credits ?? 0;

  if (!lastReset || lastReset < today) {
    dailyCredits = 5;
    const { error: resetError } = await supabaseAdmin
      .from("profile_stats")
      .update({
        daily_credits: dailyCredits,
        last_credit_reset: today,
      })
      .eq("user_id", userId);

    if (resetError) {
      console.error("[CONSUME_CREDIT] Error resetting credits:", resetError);
      return { ok: false, reason: "error" };
    }
  }

  if (dailyCredits <= 0) {
    return { ok: false, reason: "no_credits", dailyCredits };
  }

  dailyCredits -= 1;
  const { error: creditError } = await supabaseAdmin
    .from("profile_stats")
    .update({
      daily_credits: dailyCredits,
    })
    .eq("user_id", userId);

  if (creditError) {
    console.error("[CONSUME_CREDIT] Error decrementing credits:", creditError);
    return { ok: false, reason: "error" };
  }

  const { error: actionError } = await supabaseAdmin
    .from("master_actions")
    .insert({
      user_id: userId,
      action_type: actionType,
    });

  if (actionError) {
    console.error("[CONSUME_CREDIT] Error logging master_actions:", actionError);
    return { ok: false, reason: "error" };
  }

  return { ok: true, dailyCredits };
}
