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
  {
    series_key: "testing_of_joseph",
    week_number: 7,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_SEVEN_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_SEVEN_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 8,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_EIGHT_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_EIGHT_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 9,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_NINE_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_NINE_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 10,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_TEN_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_TEN_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 11,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_ELEVEN_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_ELEVEN_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 12,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_TWELVE_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_TWELVE_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 13,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_THIRTEEN_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_THIRTEEN_NOTES)),
  },
  {
    series_key: "testing_of_joseph",
    week_number: 14,
    notes_text: normalizeNotes(TESTING_OF_JOSEPH_WEEK_FOURTEEN_NOTES),
    notes_html: parseSeriesNotesToHTML(normalizeNotes(TESTING_OF_JOSEPH_WEEK_FOURTEEN_NOTES)),
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

  console.log("Seeded Testing of Joseph week notes 1-14 into series_week_notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
