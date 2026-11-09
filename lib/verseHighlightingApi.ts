import { supabase } from "./supabaseClient";

/**
 * "Your highlights could not be loaded" and "you have not highlighted anything
 * in this chapter" are not the same sentence, and this file used to say the
 * second one for both. supabase-js returns { data: null, error } instead of
 * throwing, so a dropped connection came back as an empty list and a chapter
 * someone had marked up read as clean.
 *
 * Nothing was ever lost - the rows stayed in the database and came back on
 * the next successful load - but it looked exactly like loss, which for
 * somebody's own study notes is close enough to be the same bug.
 *
 * Reads throw now. Writes answer { ok } so the screen can put a colour back
 * where it was rather than leaving a highlight on a verse the database never
 * accepted.
 */
export class HighlightLoadError extends Error {
  constructor(what: string, cause: string) {
    super(`Could not load ${what}: ${cause}`);
    this.name = "HighlightLoadError";
  }
}

function normalizeHighlightBook(book: string) {
  return book.toLowerCase().trim().replace(/\s+/g, " ");
}

export type VerseHighlightRange = {
  id: string;
  verse: number;
  start_offset: number;
  end_offset: number;
  selected_text: string;
  color: string;
  note_text: string | null;
  note_updated_at: string | null;
};

export async function fetchHighlights(book: string, chapter: number) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return [];
  const bookKey = normalizeHighlightBook(book);
  const { data, error } = await supabase
    .from("highlights")
    .select("verse, color")
    .eq("user_id", user.id)
    .eq("book", bookKey)
    .eq("chapter", chapter);
  if (error) throw new HighlightLoadError("your highlights", error.message);
  return (data || []) as Array<{ verse: number; color: string }>;
}

export async function fetchHighlightRanges(book: string, chapter: number) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return [];
  const bookKey = normalizeHighlightBook(book);
  const { data, error } = await supabase
    .from("verse_highlight_ranges")
    .select("id, verse, start_offset, end_offset, selected_text, color, note_text, note_updated_at")
    .eq("user_id", user.id)
    .eq("book", bookKey)
    .eq("chapter", chapter)
    .order("verse", { ascending: true })
    .order("start_offset", { ascending: true });
  if (error) throw new HighlightLoadError("your verse notes", error.message);
  return (data || []) as VerseHighlightRange[];
}

export async function upsertHighlight(
  book: string,
  chapter: number,
  verse: number,
  color: string,
): Promise<{ ok: boolean }> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return { ok: false };
  const bookKey = normalizeHighlightBook(book);
  const { error } = await supabase
    .from("highlights")
    .upsert({ user_id: user.id, book: bookKey, chapter, verse, color }, { onConflict: "user_id,book,chapter,verse" });
  if (error) {
    console.error("[HIGHLIGHTS] Could not save highlight:", error.message);
    return { ok: false };
  }
  return { ok: true };
}

export async function upsertHighlightRange(
  book: string,
  chapter: number,
  range: {
    verse: number;
    start_offset: number;
    end_offset: number;
    selected_text: string;
    color: string;
  },
) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return null;
  const bookKey = normalizeHighlightBook(book);
  const { data, error } = await supabase
    .from("verse_highlight_ranges")
    .upsert(
      {
        user_id: user.id,
        book: bookKey,
        chapter,
        verse: range.verse,
        start_offset: range.start_offset,
        end_offset: range.end_offset,
        selected_text: range.selected_text,
        color: range.color,
      },
      { onConflict: "user_id,book,chapter,verse,start_offset,end_offset" },
    )
    .select("id, verse, start_offset, end_offset, selected_text, color, note_text, note_updated_at")
    .single();

  if (error) return null;
  return data as VerseHighlightRange;
}

export async function deleteHighlight(
  book: string,
  chapter: number,
  verse: number,
): Promise<{ ok: boolean }> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return { ok: false };
  const bookKey = normalizeHighlightBook(book);
  const { error } = await supabase
    .from("highlights")
    .delete()
    .eq("user_id", user.id)
    .eq("book", bookKey)
    .eq("chapter", chapter)
    .eq("verse", verse);
  if (error) {
    console.error("[HIGHLIGHTS] Could not remove highlight:", error.message);
    return { ok: false };
  }
  return { ok: true };
}

export async function deleteHighlightRange(rangeId: string) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;
  await supabase
    .from("verse_highlight_ranges")
    .delete()
    .eq("user_id", user.id)
    .eq("id", rangeId);
}

export async function updateHighlightRangeNote(rangeId: string, noteText: string | null) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return null;

  const normalizedNote = noteText?.trim() ? noteText.trim() : null;
  const { data, error } = await supabase
    .from("verse_highlight_ranges")
    .update({
      note_text: normalizedNote,
      note_updated_at: normalizedNote ? new Date().toISOString() : null,
    })
    .eq("user_id", user.id)
    .eq("id", rangeId)
    .select("id, verse, start_offset, end_offset, selected_text, color, note_text, note_updated_at")
    .single();

  if (error) return null;
  return data as VerseHighlightRange;
}
