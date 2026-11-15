import type { SupabaseClient } from "@supabase/supabase-js";
import type { PointsActionRow } from "@/lib/pointsEngine";

/**
 * Every master_actions row a person has, for scoring their level and badges.
 *
 * Shared by GET /api/points/summary and GET /api/badges/summary, which each
 * had their own copy that read the rows a thousand at a time, ONE PAGE AFTER
 * ANOTHER. PostgREST will not return more than 1,000 rows per request, so the
 * pages are unavoidable; waiting for each before asking for the next is not.
 * Louis's own account has 10,884 rows: eleven round trips in a row, in both
 * routes, every time the dashboard or the Levels page opened - and it only
 * gets longer the more somebody studies (audit, 2026-11-15: "the more and
 * bigger it gets, the longer it takes to load").
 *
 * Now the first page comes back with the total, and the remaining pages are
 * asked for together. Same rows, same order, one wait instead of eleven.
 *
 * Ordered by created_at and then id, so two rows written in the same instant
 * cannot swap places between pages and be counted twice or missed.
 *
 * A failed page throws. It must never look like "this person did nothing".
 */
const PAGE_SIZE = 1000;
const MAX_ACTION_ROWS = 120000;
/** Pages asked for at once. Enough for 8,000 rows a wave without flooding the pool. */
const PAGES_AT_ONCE = 8;

const COLUMNS = "action_type, action_label, created_at";

export async function fetchUserActionRows(supabase: SupabaseClient, userId: string): Promise<PointsActionRow[]> {
  const page = (from: number) =>
    supabase
      .from("master_actions")
      .select(COLUMNS, from === 0 ? { count: "exact" } : undefined)
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

  const first = await page(0);
  if (first.error) throw new Error(`master_actions: ${first.error.message}`);
  const rows: PointsActionRow[] = [...(((first.data as unknown) as PointsActionRow[]) || [])];
  if (rows.length < PAGE_SIZE) return rows;

  // No total (it should always be there): fall back to "keep going until a
  // short page", which is what this did before.
  const total = Math.min(first.count ?? MAX_ACTION_ROWS, MAX_ACTION_ROWS);
  const offsets: number[] = [];
  for (let from = PAGE_SIZE; from < total; from += PAGE_SIZE) offsets.push(from);

  for (let i = 0; i < offsets.length; i += PAGES_AT_ONCE) {
    const wave = await Promise.all(offsets.slice(i, i + PAGES_AT_ONCE).map(page));
    let short = false;
    for (const result of wave) {
      if (result.error) throw new Error(`master_actions: ${result.error.message}`);
      const data = ((result.data as unknown) as PointsActionRow[]) || [];
      rows.push(...data);
      if (data.length < PAGE_SIZE) short = true;
    }
    if (short) break;
  }
  return rows;
}
