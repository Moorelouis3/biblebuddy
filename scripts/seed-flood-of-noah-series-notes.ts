import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { FLOOD_OF_NOAH_DEEP_NOTES } from "../lib/floodOfNoahDeepNotes";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const chapters = [5, 6, 7, 8, 9, 10];

const weekNotes = chapters.map((chapter, index) => ({
  week_number: index + 1,
  chapter,
  notes_text: FLOOD_OF_NOAH_DEEP_NOTES[index],
}));

const bibleNoteRows = weekNotes.map((note) => ({
  book: "genesis",
  chapter: note.chapter,
  notes_text: note.notes_text,
}));

async function main() {
  const { error: bibleNotesError } = await supabase
    .from("bible_notes")
    .upsert(bibleNoteRows, { onConflict: "book,chapter" });

  if (bibleNotesError) {
    console.error("Failed to upsert Genesis 5-10 chapter notes:", bibleNotesError);
    process.exit(1);
  }

  console.log("Seeded Flood of Noah Genesis 5-10 Bible Study notes into bible_notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
