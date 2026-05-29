import { supabase } from "./supabaseClient";

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
  if (error) return [];
  return data as Array<{ verse: number; color: string }>;
}

export async function fetchHighlightRanges(book: string, chapter: number) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return [];
  const bookKey = normalizeHighlightBook(book);
  const { data, error } = await supabase
    .from("verse_highlight_ranges")
    .select("id, verse, start_offset, end_offset, selected_text, color")
    .eq("user_id", user.id)
    .eq("book", bookKey)
    .eq("chapter", chapter)
    .order("verse", { ascending: true })
    .order("start_offset", { ascending: true });
  if (error) return [];
  return data as VerseHighlightRange[];
}

export async function upsertHighlight(book: string, chapter: number, verse: number, color: string) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;
  const bookKey = normalizeHighlightBook(book);
  await supabase
    .from("highlights")
    .upsert({ user_id: user.id, book: bookKey, chapter, verse, color }, { onConflict: "user_id,book,chapter,verse" });
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
    .select("id, verse, start_offset, end_offset, selected_text, color")
    .single();

  if (error) return null;
  return data as VerseHighlightRange;
}

export async function deleteHighlight(book: string, chapter: number, verse: number) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;
  const bookKey = normalizeHighlightBook(book);
  await supabase
    .from("highlights")
    .delete()
    .eq("user_id", user.id)
    .eq("book", bookKey)
    .eq("chapter", chapter)
    .eq("verse", verse);
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
