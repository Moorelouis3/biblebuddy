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

/** A study with a future available_from is on the shelf but not startable yet. */
export function availability(study: LibraryStudy, now = new Date()) {
  if (!study.available_from) return { comingSoon: false, label: null as string | null };
  const start = new Date(`${study.available_from}T00:00:00`);
  if (start <= now) return { comingSoon: false, label: null };
  return {
    comingSoon: true,
    label: `Starts ${start.toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`,
  };
}
