/**
 * "Is this the first time this day was completed?", answered so that only one
 * caller can ever get yes.
 *
 * The three places that mark a study day complete (the day page, the study
 * page and the dashboard task) each read devotional_progress, saw "not done",
 * wrote it, and then logged a master_actions row, which awards XP and becomes
 * the Feed's Study Activity post. A double tap, a retry, or the same day open
 * on two phones could all read "not done" before either wrote, so the day was
 * logged twice (found 2026-11-21 while fixing the Feed flood).
 *
 * The claim is one conditional write: flip is_completed from not-true to true
 * and see whether a row came back, or, when there is no row yet, insert one,
 * which the (user_id, devotional_id, day_number) unique key lets only one
 * caller do. The loser gets firstTime: false and logs nothing. Callers still
 * write their other columns (reflection, reading) afterwards as before.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export async function claimDevotionalDayCompletion(
  supabase: Pick<SupabaseClient, "from">,
  key: { userId: string; devotionalId: string; dayNumber: number },
  completedAt: string = new Date().toISOString(),
): Promise<{ firstTime: boolean }> {
  const match = { user_id: key.userId, devotional_id: key.devotionalId, day_number: key.dayNumber };

  const { data: flipped, error: flipError } = await supabase
    .from("devotional_progress")
    .update({ is_completed: true, completed_at: completedAt })
    .match(match)
    .or("is_completed.is.null,is_completed.eq.false")
    .select("day_number");
  if (!flipError && flipped && flipped.length > 0) return { firstTime: true };

  if (!flipError) {
    // No unfinished row: either the day is already done, or there is no row.
    const { error: insertError } = await supabase
      .from("devotional_progress")
      .insert({ ...match, is_completed: true, completed_at: completedAt });
    if (!insertError) return { firstTime: true };
    if (insertError.code === "23505") return { firstTime: false }; // a row exists: done already, or another tap won
  }

  // The claim itself failed (connection, policy). Fall back to the old read so
  // a completion is not silently left unlogged.
  const { data: existing } = await supabase
    .from("devotional_progress")
    .select("is_completed")
    .match(match)
    .maybeSingle();
  return { firstTime: (existing as { is_completed?: boolean } | null)?.is_completed !== true };
}
