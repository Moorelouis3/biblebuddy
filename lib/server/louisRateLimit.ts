import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Safety net for the Louis / BB Chat endpoint.
 *
 * This is NOT a product limit. Over 30 days, 19 people out of 4,171 accounts
 * sent 272 messages in total.
 *
 * The ceilings are set from the real data rather than guessed. Across 90 days
 * the busiest single day by any human was 35 messages (Jose, twice). The
 * second-heaviest user peaked at 17. So 75 leaves double the headroom over the
 * heaviest day ever recorded, and 30 covers a guest studying hard before they
 * make an account.
 *
 * They exist because /api/chat had no authentication whatsoever: no token, no
 * user id, nothing. Anyone who found the URL could hammer it and spend the
 * project's OpenAI credit. Guests being able to reach it made that worse. A bot
 * does thousands, so these still stop abuse dead.
 *
 * If a real user ever hits one of these, the limit is wrong, not the user.
 * Raise it.
 */

export const LOUIS_DAILY_LIMIT_REGISTERED = 75;
export const LOUIS_DAILY_LIMIT_GUEST = 30;

export type LouisRateResult =
  | { allowed: true; used: number; limit: number }
  | { allowed: false; reason: "no_session" | "over_limit"; used?: number; limit?: number };

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * How many messages this user has sent to Louis since midnight UTC.
 *
 * Counts `louis_user_message_sent` in master_actions, which the client already
 * writes for every message — so no new table and no new write path.
 */
export async function checkLouisRateLimit(
  userId: string | null,
  isGuest: boolean,
): Promise<LouisRateResult> {
  if (!userId) return { allowed: false, reason: "no_session" };

  const db = admin();
  // Without the service role key we cannot count. Fail open rather than take
  // the feature away from everyone over a misconfiguration.
  if (!db) {
    console.warn("[LOUIS_LIMIT] No service role key — skipping rate limit");
    return { allowed: true, used: 0, limit: -1 };
  }

  const limit = isGuest ? LOUIS_DAILY_LIMIT_GUEST : LOUIS_DAILY_LIMIT_REGISTERED;
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const { count, error } = await db
    .from("master_actions")
    .select("user_id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("action_type", "louis_user_message_sent")
    .gte("created_at", startOfDay.toISOString());

  if (error) {
    console.error("[LOUIS_LIMIT] Count failed, allowing through:", error.message);
    return { allowed: true, used: 0, limit };
  }

  const used = count ?? 0;
  if (used >= limit) {
    console.warn(`[LOUIS_LIMIT] ${userId} hit the ${limit}/day ceiling (${used} used)`);
    return { allowed: false, reason: "over_limit", used, limit };
  }

  return { allowed: true, used, limit };
}

/** Shown when someone somehow reaches the ceiling. */
export function louisLimitMessage(isGuest: boolean) {
  return isGuest
    ? "You have done a lot of chatting today. Create a free Bible Buddy account and you get a much higher daily limit — and your progress is saved across devices."
    : "You have reached today's chat limit. It resets at midnight. Everything else in Bible Buddy is still open — go read a chapter and I will be here tomorrow.";
}
