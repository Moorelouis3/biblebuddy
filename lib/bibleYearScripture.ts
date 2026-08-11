import { createClient } from "@supabase/supabase-js";

export type ScriptureVerse = { verse: number; text: string };

/**
 * Scripture for the whole Bible lives in the `bible_chapters` table as
 * content_json.verses. The table has ~149 duplicated book+chapter rows (same
 * text, different created_at), so always collapse to one row per chapter.
 */
const cache = new Map<string, ScriptureVerse[]>();

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase credentials are required to read Scripture.");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

function normalizeVerseText(text: string) {
  return text
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchChapterVerses(book: string, chapter: number): Promise<ScriptureVerse[]> {
  const cacheKey = `${book.toLowerCase()}|${chapter}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const { data, error } = await admin()
    .from("bible_chapters")
    .select("content_json, created_at")
    .ilike("book", book)
    .eq("chapter", chapter);

  if (error) throw new Error(`Scripture lookup failed for ${book} ${chapter}: ${error.message}`);
  if (!data?.length) throw new Error(`No Scripture found for ${book} ${chapter}.`);

  // Duplicates carry identical text; take the row with the most verses, then oldest.
  const best = data
    .map((row) => (row.content_json as { verses?: Array<{ verse: number; text: string }> })?.verses || [])
    .filter((verses) => Array.isArray(verses) && verses.length > 0)
    .sort((a, b) => b.length - a.length)[0];

  if (!best) throw new Error(`Scripture row for ${book} ${chapter} has no verses array.`);

  const verses = best
    .map((v) => ({ verse: Number(v.verse), text: normalizeVerseText(String(v.text || "")) }))
    .filter((v) => Number.isInteger(v.verse) && v.text.length > 0)
    .sort((a, b) => a.verse - b.verse);

  cache.set(cacheKey, verses);
  return verses;
}

export async function fetchChapterRange(book: string, startChapter: number, endChapter: number) {
  const out: Array<{ chapter: number; verses: ScriptureVerse[] }> = [];
  for (let chapter = startChapter; chapter <= endChapter; chapter += 1) {
    out.push({ chapter, verses: await fetchChapterVerses(book, chapter) });
  }
  return out;
}
