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
  void book;
  void chapter;
  return null;
}

export function getCanonicalBibleNotesBookKey(book: string | null | undefined) {
  return String(book || "")
    .trim()
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function getBibleNotesBookKeys(book: string | null | undefined) {
  const raw = String(book || "").trim();
  if (!raw) return [];

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  const spaced = decoded.replace(/-/g, " ").replace(/\s+/g, " ").trim();
  const lower = spaced.toLowerCase();
  const slug = lower.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const compact = lower.replace(/[^a-z0-9]/g, "");
  const title = spaced.replace(/\b\w/g, (char) => char.toUpperCase());

  return Array.from(new Set([lower, spaced, title, slug, compact].filter(Boolean)));
}

export async function fetchBibleChapterNotes(
  supabaseClient: any,
  book: string | null | undefined,
  chapter: number | null | undefined,
) {
  const chapterNum = Number(chapter);
  const bookKeys = getBibleNotesBookKeys(book);
  if (!supabaseClient || !bookKeys.length || !Number.isInteger(chapterNum) || chapterNum < 1) {
    return { data: null as { book?: string | null; notes_text?: string | null } | null, error: null };
  }

  const result = await supabaseClient
    .from("bible_notes")
    .select("book, notes_text")
    .eq("chapter", chapterNum)
    .in("book", bookKeys);

  if (result.error) {
    return { data: null, error: result.error };
  }

  const rows = Array.isArray(result.data) ? result.data : [];
  const canonical = getCanonicalBibleNotesBookKey(book);
  const compact = canonical.replace(/[^a-z0-9]/g, "");
  const row =
    rows.find((item: any) => String(item?.book || "").toLowerCase().trim() === canonical && item?.notes_text?.trim()) ||
    rows.find((item: any) => String(item?.book || "").toLowerCase().replace(/[^a-z0-9]/g, "") === compact && item?.notes_text?.trim()) ||
    rows.find((item: any) => item?.notes_text?.trim()) ||
    null;

  return { data: row, error: null };
}
