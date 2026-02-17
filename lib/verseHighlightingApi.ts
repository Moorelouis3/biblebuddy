import { supabase } from "./supabaseClient";

export async function fetchHighlights(book: string, chapter: number) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return [];
  const { data, error } = await supabase
    .from("highlights")
    .select("verse, color")
    .eq("user_id", user.id)
    .eq("book", book)
    .eq("chapter", chapter);
  if (error) return [];
  return data as Array<{ verse: number; color: string }>;
}

export async function upsertHighlight(book: string, chapter: number, verse: number, color: string) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;
  await supabase
    .from("highlights")
    .upsert({ user_id: user.id, book, chapter, verse, color }, { onConflict: "user_id,book,chapter,verse" });
}

export async function deleteHighlight(book: string, chapter: number, verse: number) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;
  await supabase
    .from("highlights")
    .delete()
    .eq("user_id", user.id)
    .eq("book", book)
    .eq("chapter", chapter)
    .eq("verse", verse);
}
