import { supabase } from "./supabaseClient";

function normalizeHighlightBook(book: string) {
  return book.toLowerCase().trim().replace(/\s+/g, " ");
}

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

export async function upsertHighlight(book: string, chapter: number, verse: number, color: string) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;
  const bookKey = normalizeHighlightBook(book);
  await supabase
    .from("highlights")
    .upsert({ user_id: user.id, book: bookKey, chapter, verse, color }, { onConflict: "user_id,book,chapter,verse" });
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
