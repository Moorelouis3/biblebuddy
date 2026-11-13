"use client";

/**
 * Bible Word Search: saved progress (2026-11-13).
 *
 * One row per person per book in word_search_progress, written straight from
 * the browser under row-level security like bookmarks and Bible Memory. The
 * grid is not in the row - lib/wordSearchGame.ts rebuilds it from the seed.
 */

import { supabase } from "./supabaseClient";

export type WordSearchProgress = {
  book: string;
  seed: number;
  found: string[];
  completed_at: string | null;
  completions: number;
};

const COLUMNS = "book, seed, found, completed_at, completions";

function clean(row: Record<string, unknown>): WordSearchProgress {
  return {
    book: String(row.book),
    seed: Number(row.seed) || 1,
    found: Array.isArray(row.found) ? row.found.map(String) : [],
    completed_at: (row.completed_at as string | null) ?? null,
    completions: Number(row.completions) || 0,
  };
}

/**
 * Every book the person has opened. At most 66 rows.
 *
 * Throws when the read fails: "not started" on all 66 books must never be
 * what a dropped connection looks like.
 */
export async function listWordSearchProgress(userId: string): Promise<WordSearchProgress[]> {
  const { data, error } = await supabase.from("word_search_progress").select(COLUMNS).eq("user_id", userId).limit(100);
  if (error) throw new Error(error.message);
  return (data || []).map((row) => clean(row as Record<string, unknown>));
}

/** One book's row, or null when it has never been opened. Throws when the read fails. */
export async function getWordSearchProgress(userId: string, book: string): Promise<WordSearchProgress | null> {
  const { data, error } = await supabase
    .from("word_search_progress")
    .select(COLUMNS)
    .eq("user_id", userId)
    .eq("book", book)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? clean(data as Record<string, unknown>) : null;
}

/** Write the whole row for one book. Returns false when it did not save. */
export async function saveWordSearchProgress(userId: string, progress: WordSearchProgress): Promise<boolean> {
  const { error } = await supabase.from("word_search_progress").upsert(
    {
      user_id: userId,
      book: progress.book,
      seed: progress.seed,
      found: progress.found,
      completed_at: progress.completed_at,
      completions: progress.completions,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,book" },
  );
  return !error;
}
