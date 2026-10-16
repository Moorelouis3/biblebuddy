import { supabase } from "./supabaseClient";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "./bibleInOneYearPlan";

export const BIBLE_YEAR_TOTAL_DAYS = 365;

/**
 * Where a reader is in Bible in One Year.
 *
 * Where you are is how FAR you have got, not the first day you skipped.
 *
 * Rachel Moore reported that twice: home said Day 29, her earliest gap, while
 * the plan itself opened Day 91, by which point she had read 85 days. Skipped
 * days stay open to catch up on; they just never drag the number backwards.
 *
 * This lived inline in HomeScreen with a comment warning that a third copy
 * should become a shared helper. The Library shelf was that third caller, so
 * here it is - one rule, one place.
 */
export type BibleYearPosition = {
  /** The day to open next. */
  planDay: number | null;
  planFinished: boolean;
  /** The furthest day actually finished, which differs from planDay - 1 for anyone who skipped. */
  highestReadDay: number;
};

export function calculateBibleYearPosition(
  rows: Array<{ day_number: number | string; reading_completed: boolean | null }> | null | undefined,
): BibleYearPosition {
  if (!Array.isArray(rows)) return { planDay: null, planFinished: false, highestReadDay: 0 };

  const readDays = new Set(
    rows.filter((row) => row.reading_completed === true).map((row) => Number(row.day_number)),
  );
  const highestRead = readDays.size ? Math.max(...readDays) : 0;
  const nextDay = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find(
    (d) => d.dayNumber > highestRead && !readDays.has(d.dayNumber),
  );

  return {
    planDay: nextDay ? nextDay.dayNumber : BIBLE_YEAR_TOTAL_DAYS,
    planFinished: !nextDay,
    highestReadDay: highestRead,
  };
}

/** The same position, fetched for a user. Returns the empty position when signed out. */
export async function fetchBibleYearPosition(userId: string | null): Promise<BibleYearPosition> {
  if (!userId) return { planDay: null, planFinished: false, highestReadDay: 0 };
  const { data, error } = await supabase
    .from("bible_year_day_progress")
    .select("day_number, reading_completed")
    .eq("user_id", userId);

  if (error) {
    console.error("[BIBLE YEAR] Could not load progress:", error.message);
    return { planDay: null, planFinished: false, highestReadDay: 0 };
  }
  return calculateBibleYearPosition(data as any);
}

/**
 * Where the Bible in One Year cover takes someone: the plan's own page, the
 * one the Plans tab always opened for it.
 *
 * Deliberately the series view and not `?view=bible-year&day=N`. That day URL
 * is what the old day rail linked to, and it does not survive a page load -
 * typed straight into the address bar it rewrites itself to /plan?solo=1 and
 * lands on whatever study was last open. Worth fixing on its own; until then
 * the cover uses the address that actually holds.
 */
export const BIBLE_YEAR_PLAN_HREF = "/plan?view=bible-year-series&solo=1";

export function bibleYearHref() {
  return BIBLE_YEAR_PLAN_HREF;
}
