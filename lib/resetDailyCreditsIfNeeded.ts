import { supabase } from "./supabaseClient";

/**
 * Resets daily credits for free users if last_credit_reset is before today.
 * Only runs for free users (is_paid = false).
 * Uses a single atomic update to prevent race conditions.
 * Returns true if a reset occurred, false otherwise.
 */
export async function resetDailyCreditsIfNeeded(userId: string): Promise<boolean> {
  // Get today's date in YYYY-MM-DD (UTC)
  const today = new Date().toISOString().slice(0, 10);

  // Atomic update: only update if last_credit_reset < today and is_paid = false
  const { error, data } = await supabase.rpc("reset_daily_credits_if_needed", {
    p_user_id: userId,
    p_today: today,
  });

  if (error) {
    console.error("[CREDITS] Error resetting daily credits:", error);
    return false;
  }

  // data will be true if reset, false if not
  return !!data;
}
