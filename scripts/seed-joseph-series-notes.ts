import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { parseSeriesNotesToHTML } from "../lib/seriesNotesHtml";
import { TESTING_OF_JOSEPH_WEEK_ONE_NOTES } from "../lib/testingOfJosephWeekOneNotes";
import { TESTING_OF_JOSEPH_WEEK_TWO_NOTES } from "../lib/testingOfJosephWeekTwoNotes";
import { TESTING_OF_JOSEPH_WEEK_THREE_NOTES } from "../lib/testingOfJosephWeekThreeNotes";
import { TESTING_OF_JOSEPH_WEEK_FOUR_NOTES } from "../lib/testingOfJosephWeekFourNotes";
import { TESTING_OF_JOSEPH_WEEK_FIVE_NOTES } from "../lib/testingOfJosephWeekFiveNotes";
import { TESTING_OF_JOSEPH_WEEK_SIX_NOTES } from "../lib/testingOfJosephWeekSixNotes";
import { TESTING_OF_JOSEPH_WEEK_SEVEN_NOTES } from "../lib/testingOfJosephWeekSevenNotes";
import { TESTING_OF_JOSEPH_WEEK_EIGHT_NOTES } from "../lib/testingOfJosephWeekEightNotes";
import { TESTING_OF_JOSEPH_WEEK_NINE_NOTES } from "../lib/testingOfJosephWeekNineNotes";
import { TESTING_OF_JOSEPH_WEEK_TEN_NOTES } from "../lib/testingOfJosephWeekTenNotes";
import { TESTING_OF_JOSEPH_WEEK_ELEVEN_NOTES } from "../lib/testingOfJosephWeekElevenNotes";
import { TESTING_OF_JOSEPH_WEEK_TWELVE_NOTES } from "../lib/testingOfJosephWeekTwelveNotes";
import { TESTING_OF_JOSEPH_WEEK_THIRTEEN_NOTES } from "../lib/testingOfJosephWeekThirteenNotes";
import { TESTING_OF_JOSEPH_WEEK_FOURTEEN_NOTES } from "../lib/testingOfJosephWeekFourteenNotes";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function normalizeNotes(value: string | string[]): string {
  return Array.isArray(value) ? value.join("\n\n") : value;
}

const weekNotes = [
  {
    week_number: 1,
    chapter: 37,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_ONE_NOTES),
  },
  {
    week_number: 2,
    chapter: 38,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_TWO_NOTES),
  },
  {
    week_number: 3,
    chapter: 39,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_THREE_NOTES),
  },
  {
    week_number: 4,
    chapter: 40,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_FOUR_NOTES),
  },
  {
    week_number: 5,
    chapter: 41,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_FIVE_NOTES),
  },
  {
    week_number: 6,
    chapter: 42,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_SIX_NOTES),
  },
  {
    week_number: 7,
    chapter: 43,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_SEVEN_NOTES),
  },
  {
    week_number: 8,
    chapter: 44,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_EIGHT_NOTES),
  },
  {
    week_number: 9,
    chapter: 45,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_NINE_NOTES),
  },
  {
    week_number: 10,
    chapter: 46,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_TEN_NOTES),
  },
  {
    week_number: 11,
    chapter: 47,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_ELEVEN_NOTES),
  },
  {
    week_number: 12,
    chapter: 48,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_TWELVE_NOTES),
  },
  {
    week_number: 13,
    chapter: 49,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_THIRTEEN_NOTES),
  },
  {
    week_number: 14,
    chapter: 50,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_FOURTEEN_NOTES),
  },
];

const rows = weekNotes.map((note) => ({
  series_key: "testing_of_joseph",
  week_number: note.week_number,
  notes_text: note.notes_text,
  notes_html: parseSeriesNotesToHTML(note.notes_text),
}));

const bibleNoteRows = weekNotes.map((note) => ({
  book: "genesis",
  chapter: note.chapter,
  notes_text: note.notes_text,
}));

async function main() {
  const { error } = await supabase
    .from("series_week_notes")
    .upsert(rows, { onConflict: "series_key,week_number" });

  if (error) {
    console.error("Failed to upsert Joseph series notes:", error);
    process.exit(1);
  }

  const { error: bibleNotesError } = await supabase
    .from("bible_notes")
    .upsert(bibleNoteRows, { onConflict: "book,chapter" });

  if (bibleNotesError) {
    console.error("Failed to upsert Joseph chapter notes:", bibleNotesError);
    process.exit(1);
  }

  console.log("Seeded Testing of Joseph week notes 1-14 into series_week_notes and Genesis 37-50 into bible_notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
