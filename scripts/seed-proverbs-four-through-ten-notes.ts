import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { PROVERBS_FOUR_TO_TEN_NOTES } from "../lib/proverbsFourToTenNotes";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const rows = Object.entries(PROVERBS_FOUR_TO_TEN_NOTES).map(([chapter, notesText]) => ({
    book: "proverbs",
    chapter: Number(chapter),
    notes_text: notesText,
  }));

  const { error } = await supabase.from("bible_notes").upsert(rows, { onConflict: "book,chapter" });

  if (error) {
    console.error("Failed to seed Proverbs 4-10 notes:", error);
    process.exit(1);
  }

  console.log("Seeded deeper Proverbs 4-10 notes into bible_notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
