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

const rows = [
  {
    series_key: "testing_of_joseph",
    week_number: 1,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_ONE_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_ONE_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 2,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_TWO_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_TWO_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 3,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_THREE_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_THREE_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 4,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_FOUR_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_FOUR_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 5,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_FIVE_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_FIVE_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 6,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_SIX_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_SIX_NOTES)),
  },
];

async function main() {
  const { error } = await supabase
    .from("series_week_notes")
    .upsert(rows, { onConflict: "series_key,week_number" });

  if (error) {
    console.error("Failed to upsert Joseph series notes:", error);
    process.exit(1);
  }

  console.log("Seeded Testing of Joseph week notes 1-6 into series_week_notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
