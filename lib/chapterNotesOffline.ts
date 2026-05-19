import { getChapterNotesFallback } from "./proverbsChapterNotesFallback";

const CHAPTER_NOTES_CACHE_PREFIX = "bb:chapter-notes:v1";

function normalizeBookKey(book: string | null | undefined) {
  return String(book || "").toLowerCase().trim();
}

export function getChapterNotesCacheKey(book: string | null | undefined, chapter: number | null | undefined) {
  return `${CHAPTER_NOTES_CACHE_PREFIX}:${normalizeBookKey(book)}:${chapter || ""}`;
}

export function getCachedChapterNotes(book: string | null | undefined, chapter: number | null | undefined) {
  if (typeof window === "undefined" || !book || !chapter) return null;

  try {
    const cached = window.localStorage.getItem(getChapterNotesCacheKey(book, chapter));
    return cached?.trim() || null;
  } catch {
    return null;
  }
}

export function cacheChapterNotes(book: string | null | undefined, chapter: number | null | undefined, notes: string | null | undefined) {
  if (typeof window === "undefined" || !book || !chapter || !notes?.trim()) return;

  try {
    window.localStorage.setItem(getChapterNotesCacheKey(book, chapter), notes);
  } catch {
    // Storage can be full or blocked. Notes still work from the database/fallback.
  }
}

export async function getOfflineChapterNotes(book: string | null | undefined, chapter: number | null | undefined) {
  return getCachedChapterNotes(book, chapter) || (await getChapterNotesFallback(book, chapter));
}
