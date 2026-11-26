"use client";

/**
 * Bible Memory: saving, loading and removing verses (2026-11-12).
 *
 * One table, memory_verses, written straight from the browser under row-level
 * security, the same way bookmarks and highlights are. Every screen that can
 * add a verse (the Daily Verse card, its popup, the reader, the picker inside
 * Bible Memory) goes through here, and a window event keeps whichever of them
 * are on screen in step.
 *
 * The game rules are in lib/bibleMemoryGames.ts and never touch the database.
 */

import { supabase } from "./supabaseClient";
import { canonicalBookName, cleanVerseText, type MemoryVerse } from "./bibleMemoryGames";
import { trackFeatureEvent, type MemorySaveSource } from "./featureEvents";

const BASE_COLUMNS =
  "id, book, chapter, verse, verse_end, translation, verse_text, level, correct_count, mistake_count, last_practised_at, created_at";
// known_at arrived on 2026-11-26 (supabase/migrations/20261126_memory_verses_known.sql).
const COLUMNS = `${BASE_COLUMNS}, known_at`;

/** Far more than anyone will save, and under the 1,000-row response cap. */
const MAX_VERSES = 500;

const CHANGE_EVENT = "bb:memory-verses-changed";

export type MemoryVerseInput = {
  book: string;
  chapter: number;
  verse: number;
  verseEnd?: number | null;
  translation?: string | null;
  text: string;
  /** Which button saved it. Only used for the usage report, never stored on the verse. */
  source?: MemorySaveSource | null;
};

export type MemoryVerseKey = Omit<MemoryVerseInput, "text" | "source">;

function normaliseKey(input: MemoryVerseKey) {
  const verse = Number(input.verse);
  const verseEnd = Number(input.verseEnd);
  return {
    book: canonicalBookName(input.book),
    chapter: Number(input.chapter),
    verse,
    verse_end: Number.isFinite(verseEnd) && verseEnd > verse ? verseEnd : null,
    translation: String(input.translation || "KJV").trim().toUpperCase() || "KJV",
  };
}

function announce() {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

/** Subscribe to any save or removal made anywhere on the page. Returns unsubscribe. */
export function onMemoryVersesChange(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

/**
 * Everything the person has saved, newest first.
 *
 * Throws when the read fails. An empty list means "you have not saved a verse
 * yet", and a failed read must never be allowed to say that.
 */
export async function listMemoryVerses(userId: string): Promise<MemoryVerse[]> {
  const read = (columns: string) =>
    supabase
      .from("memory_verses")
      .select(columns)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(MAX_VERSES);
  let { data, error } = await read(COLUMNS);
  // 42703: the database does not have known_at yet. The verses must still
  // load; every one of them is simply still being learned.
  if (error && error.code === "42703") ({ data, error } = await read(BASE_COLUMNS));
  if (error) throw new Error(error.message);
  return ((data || []) as unknown as MemoryVerse[]).map((verse) => ({ ...verse, known_at: verse.known_at ?? null }));
}

/** The saved row's id, or null when this verse is not in the collection. */
export async function findMemoryVerseId(userId: string, input: MemoryVerseKey): Promise<string | null> {
  const key = normaliseKey(input);
  let query = supabase
    .from("memory_verses")
    .select("id")
    .eq("user_id", userId)
    .eq("book", key.book)
    .eq("chapter", key.chapter)
    .eq("verse", key.verse)
    .eq("translation", key.translation);
  query = key.verse_end === null ? query.is("verse_end", null) : query.eq("verse_end", key.verse_end);
  const { data, error } = await query.limit(1).maybeSingle();
  if (error) return null;
  return (data?.id as string | undefined) ?? null;
}

export type AddMemoryVerseResult = { status: "added" | "exists"; id: string | null } | { status: "error"; id: null };

/** Save a verse. Saving one that is already there is not an error. */
export async function addMemoryVerse(userId: string, input: MemoryVerseInput): Promise<AddMemoryVerseResult> {
  const key = normaliseKey(input);
  const text = cleanVerseText(input.text);
  if (!text || !key.book || !(key.chapter >= 1) || !(key.verse >= 1)) return { status: "error", id: null };

  const { data, error } = await supabase
    .from("memory_verses")
    .insert({ user_id: userId, ...key, verse_text: text })
    .select("id")
    .maybeSingle();

  if (error) {
    // 23505: the unique index says this verse, in this translation, is saved.
    if (error.code === "23505") return { status: "exists", id: await findMemoryVerseId(userId, input) };
    return { status: "error", id: null };
  }
  announce();
  // Counted only when a verse was really added, so a second tap on a saved
  // verse does not inflate the numbers.
  trackFeatureEvent("bible_memory_verse_saved", userId, {
    source: input.source || "unknown",
    book: key.book,
    translation: key.translation,
  });
  return { status: "added", id: (data?.id as string | undefined) ?? null };
}

export async function removeMemoryVerse(userId: string, id: string): Promise<boolean> {
  const { error } = await supabase.from("memory_verses").delete().eq("user_id", userId).eq("id", id);
  if (error) return false;
  announce();
  return true;
}

/**
 * "I know it" (known = true) moves a verse to the list the test draws from.
 * known = false sends it back to be learned again. Returns false when it did
 * not save.
 */
export async function setMemoryVerseKnown(userId: string, id: string, known: boolean): Promise<boolean> {
  const { error } = await supabase
    .from("memory_verses")
    .update({ known_at: known ? new Date().toISOString() : null })
    .eq("user_id", userId)
    .eq("id", id);
  if (error) return false;
  announce();
  return true;
}

export type MemoryProgressPatch = Partial<
  Pick<MemoryVerse, "level" | "correct_count" | "mistake_count" | "last_practised_at">
>;

/** Write progress for one verse. Returns false when it did not save. */
export async function saveMemoryProgress(userId: string, id: string, patch: MemoryProgressPatch): Promise<boolean> {
  const { error } = await supabase.from("memory_verses").update(patch).eq("user_id", userId).eq("id", id);
  return !error;
}
