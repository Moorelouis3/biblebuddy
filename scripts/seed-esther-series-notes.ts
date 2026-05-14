import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { RISE_OF_ESTHER_DEEP_NOTES } from "../lib/riseOfEstherDeepNotes";
import { parseSeriesNotesToHTML } from "../lib/seriesNotesHtml";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const chapters = Array.from({ length: 10 }, (_, index) => index + 1);

const weekNotes = chapters.map((chapter, index) => ({
  week_number: index + 1,
  chapter,
  notes_text: RISE_OF_ESTHER_DEEP_NOTES[index],
}));

const rows = weekNotes.map((note) => ({
  series_key: "rise_of_esther",
  week_number: note.week_number,
  notes_text: note.notes_text,
  notes_html: parseSeriesNotesToHTML(note.notes_text),
}));

const bibleNoteRows = weekNotes.map((note) => ({
  book: "esther",
  chapter: note.chapter,
  notes_text: note.notes_text,
}));

async function main() {
  const { error } = await supabase
    .from("series_week_notes")
    .upsert(rows, { onConflict: "series_key,week_number" });

  if (error) {
    console.error("Failed to upsert Esther series notes:", error);
    process.exit(1);
  }

  const { error: bibleNotesError } = await supabase
    .from("bible_notes")
    .upsert(bibleNoteRows, { onConflict: "book,chapter" });

  if (bibleNotesError) {
    console.error("Failed to upsert Esther chapter notes:", bibleNotesError);
    process.exit(1);
  }

  console.log("Seeded Rise of Esther week notes 1-10 into series_week_notes and Esther 1-10 into bible_notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
