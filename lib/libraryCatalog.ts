import { supabase } from "./supabaseClient";

/**
 * The Library catalog. Everything here comes from the `devotionals` table -
 * see ADD_LIBRARY_CATALOG_COLUMNS.sql, which moved visibility, covers,
 * categories, availability and the paperback link out of frontend constants
 * and into the row, so adding a twelfth study is a database edit and not a
 * code change.
 */

export type LibraryStudy = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  total_days: number;
  category: string | null;
  cover_image: string | null;
  is_published: boolean;
  available_from: string | null;
  paperback_url: string | null;
  sort_order: number | null;
};

export type StudyProgress = {
  /** Days the reader has finished. */
  completedDays: number;
  /** The day the Continue button should open: the first unfinished one. */
  nextDay: number;
  percent: number;
  isComplete: boolean;
  /** When they last touched it, for ordering Continue Studying. */
  lastActivityAt: string | null;
};

/**
 * Bible in One Year on the shelf.
 *
 * It is a reading plan, not a `devotionals` row, so it has no catalog record to
 * read. Louis, 2026-10-16: "add the bible in one year same way it is but just
 * push it behind a cover in the library, and when they click on that the same
 * pages load like it did before - no need to redesign, we just moved it."
 *
 * So this is a shelf entry and nothing more: the cover, the day count, and a
 * link to the plan pages that already exist. Nothing about the plan itself
 * changed.
 */
export const BIBLE_YEAR_SHELF_ID = "bible-in-one-year";
export const BIBLE_YEAR_SHELF_COVER = "/bible-in-one-year-cover.png";
export const BIBLE_YEAR_SHELF_TITLE = "Bible in One Year";
export const BIBLE_YEAR_SHELF_SUBTITLE = "A 365-Day Journey Through God's Word";

/** The filter pills. `null` category studies appear only under All Studies. */
export const LIBRARY_CATEGORIES: Array<{ value: string; label: string }> = [
  { value: "all", label: "All Studies" },
  { value: "genesis-series", label: "Genesis Series" },
  { value: "new-testament", label: "New Testament" },
  { value: "wisdom", label: "Wisdom" },
];

/** Published studies, in shelf order. Unpublished rows never leave the database. */
export async function fetchLibraryStudies(): Promise<LibraryStudy[]> {
  const { data, error } = await supabase
    .from("devotionals")
    .select("id,title,subtitle,description,total_days,category,cover_image,is_published,available_from,paperback_url,sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("title", { ascending: true });

  if (error) {
    console.error("[LIBRARY] Could not load studies:", error.message);
    return [];
  }
  return (data as LibraryStudy[]) || [];
}

export async function fetchStudyById(id: string): Promise<LibraryStudy | null> {
  const { data, error } = await supabase
    .from("devotionals")
    .select("id,title,subtitle,description,total_days,category,cover_image,is_published,available_from,paperback_url,sort_order")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[LIBRARY] Could not load study:", error.message);
    return null;
  }
  return (data as LibraryStudy) || null;
}

/**
 * Real progress, from devotional_progress. Never guessed: a study the reader
 * has not started simply has no rows and comes back at day 1 with 0 percent,
 * which is what keeps fake progress off the shelf.
 */
export async function fetchProgressByStudy(userId: string): Promise<Record<string, StudyProgress>> {
  const { data, error } = await supabase
    .from("devotional_progress")
    .select("devotional_id,day_number,is_completed,completed_at,created_at")
    .eq("user_id", userId);

  if (error) {
    console.error("[LIBRARY] Could not load progress:", error.message);
    return {};
  }

  const byStudy: Record<string, { days: Set<number>; last: string | null }> = {};
  for (const row of data || []) {
    const id = (row as any).devotional_id as string;
    if (!byStudy[id]) byStudy[id] = { days: new Set(), last: null };
    if ((row as any).is_completed) byStudy[id].days.add(Number((row as any).day_number));
    const stamp = ((row as any).completed_at || (row as any).created_at) as string | null;
    if (stamp && (!byStudy[id].last || stamp > byStudy[id].last!)) byStudy[id].last = stamp;
  }

  const out: Record<string, StudyProgress> = {};
  for (const [id, { days, last }] of Object.entries(byStudy)) {
    out[id] = {
      completedDays: days.size,
      // The first day they have not finished, so Continue never reopens a
      // finished day and never skips a gap left by reading out of order.
      nextDay: firstUnfinishedDay(days),
      percent: 0, // filled in by the caller, which knows total_days
      isComplete: false,
      lastActivityAt: last,
    };
  }
  return out;
}

function firstUnfinishedDay(completed: Set<number>) {
  let day = 1;
  while (completed.has(day)) day += 1;
  return day;
}

/** Percent and completion need total_days, which lives on the study row. */
export function withTotals(progress: StudyProgress | undefined, totalDays: number): StudyProgress {
  const base: StudyProgress = progress ?? {
    completedDays: 0,
    nextDay: 1,
    percent: 0,
    isComplete: false,
    lastActivityAt: null,
  };
  const percent = totalDays > 0 ? Math.min(100, Math.round((base.completedDays / totalDays) * 100)) : 0;
  return {
    ...base,
    percent,
    isComplete: totalDays > 0 && base.completedDays >= totalDays,
    nextDay: Math.min(base.nextDay, Math.max(1, totalDays)),
  };
}

/**
 * A future `available_from` marks when the study opens to new readers - the
 * 1 November slot on the shelf, say.
 *
 * It is not a lock on anyone already in it. Louis had finished all 21 days of
 * The Tempting of Jesus before it was given a November date, and the first cut
 * of this greyed it out and offered him "Read again" underneath a Coming Soon
 * badge at the same time. So a reader with any progress always sees their own
 * state; the date only speaks to people who have not started.
 */
/**
 * What time of day a study opens.
 *
 * available_from is a date column - it drops any time you write to it - so
 * the hour lives here. 11:00 is when Higher Hope was set to land (Louis,
 * 2026-10-18), and a study that opens at a stated hour rather than at
 * midnight is the one people can actually be waiting for.
 */
export const RELEASE_HOUR = 11;

/** The exact moment a study opens, or null if it is already out. */
export function releaseAt(study: LibraryStudy): Date | null {
  if (!study.available_from) return null;
  const start = new Date(`${study.available_from}T00:00:00`);
  start.setHours(RELEASE_HOUR, 0, 0, 0);
  return start;
}

/**
 * How long until it opens, as "6d 20h" / "20h 14m" / "14m".
 *
 * A date alone - "Starts 25 October" - is a fact you have to do arithmetic on.
 * A countdown is the same fact already answered, which is what Louis asked
 * for: "have it on the bookshelf as a countdown till next Sunday 11am for
 * its release."
 */
export function countdownTo(target: Date, now = new Date()): string | null {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return null;

  const minutes = Math.floor(ms / 60_000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export function availability(study: LibraryStudy, hasProgress = false, now = new Date()) {
  if (!study.available_from || hasProgress) return { comingSoon: false, label: null as string | null };
  const start = releaseAt(study);
  if (!start || start <= now) return { comingSoon: false, label: null };
  const remaining = countdownTo(start, now);
  return {
    comingSoon: true,
    label: remaining ? `Releases in ${remaining}` : null,
  };
}
