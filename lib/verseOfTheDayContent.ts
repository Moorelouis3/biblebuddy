"use client";

/**
 * Verse of the Day content system (2026-09-02).
 *
 * The scheduled entries live in verse_of_the_day_entries and are written by
 * the seed script / admin API only. The client reads the row matching the
 * USER'S local calendar date - RLS already refuses anything further out than
 * UTC+1 day, so nobody can pull tomorrow's verse early, and shared archive
 * links keep working because past approved rows stay readable.
 *
 * When today has no approved row (queue ran dry, table missing, network
 * down) callers fall back to the legacy deterministic pool in
 * lib/verseOfTheDay.ts, so the homepage card never breaks or goes blank.
 */

import { supabase } from "./supabaseClient";

export type VotdBackgroundTheme = "purple-sunrise" | "blue-sunrise" | "green-mountains" | "orange-night";

export type VerseOfTheDayEntry = {
  id: string;
  reference: string;
  book: string;
  chapter: number;
  verse_start: number;
  verse_end: number | null;
  translation: string;
  verse_text: string;
  scheduled_date: string;
  background_theme: VotdBackgroundTheme | null;
  title: string;
  author_section: string;
  context_section: string;
  meaning_section: string;
  application_section: string;
  takeaway: string;
  reflection_question: string;
  prayer: string | null;
};

export const VOTD_ENTRY_COLUMNS =
  "id, reference, book, chapter, verse_start, verse_end, translation, verse_text, scheduled_date, background_theme, title, author_section, context_section, meaning_section, application_section, takeaway, reflection_question, prayer";

/** Legacy dark art, kept only so the admin page's theme selector compiles. */
export const VOTD_BACKGROUNDS: Record<VotdBackgroundTheme, string> = {
  "purple-sunrise": "/verse-of-the-day/bg-purple-sunrise.jpg",
  "blue-sunrise": "/verse-of-the-day/bg-blue-sunrise.jpg",
  "green-mountains": "/verse-of-the-day/bg-green-mountains.jpg",
  "orange-night": "/verse-of-the-day/bg-orange-night.jpg",
};

/**
 * The pastel set (2026-09-03) - light skies designed for dark text, matching
 * the homepage's peach/mint/lavender system. Rotation is dayOfYear % 5 from
 * the entry's scheduled date, so everyone sees the same background all day
 * and it never shuffles on refresh.
 */
export const VOTD_PASTEL_BACKGROUNDS = [
  { name: "lavender-sunrise", src: "/verse-of-the-day/verse-bg-01-lavender-sunrise.jpg" },
  { name: "blue-morning", src: "/verse-of-the-day/verse-bg-02-blue-morning.jpg" },
  { name: "peach-dawn", src: "/verse-of-the-day/verse-bg-03-peach-dawn.jpg" },
  { name: "sage-mountains", src: "/verse-of-the-day/verse-bg-04-sage-mountains.jpg" },
  { name: "cream-gold-clouds", src: "/verse-of-the-day/verse-bg-05-cream-gold-clouds.jpg" },
] as const;

/** The user's local calendar date as YYYY-MM-DD. */
export function getVotdLocalDayKey(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/**
 * Background for an entry: dayOfYear % 5 into the pastel set, from the
 * entry's scheduled date - deterministic, stable for the whole day, same for
 * every viewer. (The per-entry background_theme column referred to the
 * retired dark set and is intentionally ignored since the 2026-09-03 pastel
 * redesign.)
 */
export function getVotdBackground(entry: Pick<VerseOfTheDayEntry, "background_theme" | "scheduled_date">) {
  const [y, m, d] = entry.scheduled_date.split("-").map(Number);
  const dayOfYear = Math.floor((Date.UTC(y, (m || 1) - 1, d || 1) - Date.UTC(y, 0, 1)) / 86_400_000) + 1;
  const background = VOTD_PASTEL_BACKGROUNDS[dayOfYear % VOTD_PASTEL_BACKGROUNDS.length];
  return { theme: background.name, src: background.src };
}

/** "TODAY · SEP 2" / "SEP 2" for archived days. */
export function formatVotdDateLabel(dateKey: string, todayKey = getVotdLocalDayKey()) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const label = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
    .format(new Date(Date.UTC(y, (m || 1) - 1, d || 1)))
    .toUpperCase();
  return dateKey === todayKey ? `TODAY · ${label}` : label;
}

export async function fetchVotdEntryByDate(dateKey: string): Promise<VerseOfTheDayEntry | null> {
  try {
    const { data, error } = await supabase
      .from("verse_of_the_day_entries")
      .select(VOTD_ENTRY_COLUMNS)
      .eq("scheduled_date", dateKey)
      .maybeSingle();
    if (error) return null;
    return (data as VerseOfTheDayEntry) || null;
  } catch {
    return null;
  }
}

/** Past entries, newest first, for the archive list. */
export async function fetchVotdArchive(beforeOrOnDateKey: string, limit = 30): Promise<VerseOfTheDayEntry[]> {
  try {
    const { data, error } = await supabase
      .from("verse_of_the_day_entries")
      .select(VOTD_ENTRY_COLUMNS)
      .lte("scheduled_date", beforeOrOnDateKey)
      .order("scheduled_date", { ascending: false })
      .limit(limit);
    if (error) return [];
    return (data as VerseOfTheDayEntry[]) || [];
  } catch {
    return [];
  }
}

export type VotdEngagement = {
  opened_at: string | null;
  completed_at: string | null;
  bookmarked: boolean;
  shared_at: string | null;
};

export async function fetchVotdEngagement(userId: string, entryId: string): Promise<VotdEngagement | null> {
  try {
    const { data } = await supabase
      .from("verse_of_the_day_engagement")
      .select("opened_at, completed_at, bookmarked, shared_at")
      .eq("user_id", userId)
      .eq("entry_id", entryId)
      .maybeSingle();
    return (data as VotdEngagement) || null;
  } catch {
    return null;
  }
}

export async function upsertVotdEngagement(
  userId: string,
  entryId: string,
  patch: Partial<{ opened_at: string; completed_at: string; bookmarked: boolean; bookmarked_at: string; shared_at: string }>,
) {
  try {
    await supabase.from("verse_of_the_day_engagement").upsert(
      { user_id: userId, entry_id: entryId, updated_at: new Date().toISOString(), ...patch },
      { onConflict: "user_id,entry_id" },
    );
  } catch {
    // Engagement writes must never break the reading experience.
  }
}

/** Fire-and-forget analytics through the existing landing-analytics pipe. */
export function trackVotdEvent(eventName: string, metadata: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        page_path: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer || null,
        metadata,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Never let analytics break the card.
  }
}

/** Share URL for an entry - the archived link keeps working after the day passes. */
export function getVotdShareUrl(dateKey: string) {
  return `https://www.mybiblebuddy.net/verse-of-the-day/${dateKey}`;
}
