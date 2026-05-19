import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { CREATION_OF_WORLD_DEEP_NOTES } from "../lib/creationOfWorldDeepNotes";
import { FALL_OF_MAN_DEEP_NOTES } from "../lib/fallOfManDeepNotes";
import { FLOOD_OF_NOAH_DEEP_NOTES } from "../lib/floodOfNoahDeepNotes";
import { OBEDIENCE_OF_ABRAHAM_DEEP_NOTES } from "../lib/obedienceOfAbrahamDeepNotes";
import { PROMISE_THROUGH_ISAAC_DEEP_NOTES } from "../lib/promiseThroughIsaacDeepNotes";
import { WRESTLING_OF_JACOB_DEEP_NOTES } from "../lib/wrestlingOfJacobDeepNotes";
import { TESTING_OF_JOSEPH_DEEP_NOTES } from "../lib/testingOfJosephDeepNotes";
import { EXODUS_DEEP_NOTES } from "../lib/exodusDeepNotes";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type BibleNoteRow = {
  book: string;
  chapter: number;
  notes_text: string;
};

function rowsForRange(book: string, startChapter: number, notes: string[]): BibleNoteRow[] {
  return notes.map((notesText, index) => ({
    book,
    chapter: startChapter + index,
    notes_text: notesText,
  }));
}

function validateRows(rows: BibleNoteRow[], expected: { book: string; first: number; last: number }) {
  const missing = [];

  for (let chapter = expected.first; chapter <= expected.last; chapter += 1) {
    const row = rows.find((candidate) => candidate.book === expected.book && candidate.chapter === chapter);
    if (!row?.notes_text?.trim()) missing.push(`${expected.book} ${chapter}`);
  }

  if (missing.length > 0) {
    throw new Error(`Missing formatted notes for: ${missing.join(", ")}`);
  }
}

async function main() {
  const genesisRows = [
    ...rowsForRange("genesis", 1, CREATION_OF_WORLD_DEEP_NOTES),
    ...rowsForRange("genesis", 3, FALL_OF_MAN_DEEP_NOTES),
    ...rowsForRange("genesis", 5, FLOOD_OF_NOAH_DEEP_NOTES),
    ...rowsForRange("genesis", 11, OBEDIENCE_OF_ABRAHAM_DEEP_NOTES),
    ...rowsForRange("genesis", 26, PROMISE_THROUGH_ISAAC_DEEP_NOTES),
    ...rowsForRange("genesis", 28, WRESTLING_OF_JACOB_DEEP_NOTES),
    ...rowsForRange("genesis", 37, TESTING_OF_JOSEPH_DEEP_NOTES),
  ];
  const exodusRows = rowsForRange("exodus", 1, EXODUS_DEEP_NOTES);
  const rows = [...genesisRows, ...exodusRows];

  validateRows(rows, { book: "genesis", first: 1, last: 50 });
  validateRows(rows, { book: "exodus", first: 1, last: 40 });

  const { error } = await supabase.from("bible_notes").upsert(rows, { onConflict: "book,chapter" });

  if (error) throw error;

  const [{ count: genesisCount, error: genesisError }, { count: exodusCount, error: exodusError }] = await Promise.all([
    supabase.from("bible_notes").select("chapter", { count: "exact", head: true }).eq("book", "genesis").gte("chapter", 1).lte("chapter", 50),
    supabase.from("bible_notes").select("chapter", { count: "exact", head: true }).eq("book", "exodus").gte("chapter", 1).lte("chapter", 40),
  ]);

  if (genesisError) throw genesisError;
  if (exodusError) throw exodusError;

  console.log(`Seeded Genesis and Exodus chapter notes into bible_notes. Genesis: ${genesisCount}/50. Exodus: ${exodusCount}/40.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
