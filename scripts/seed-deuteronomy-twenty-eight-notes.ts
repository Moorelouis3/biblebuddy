import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { DEUTERONOMY_DEEP_NOTES } from "../lib/deuteronomyDeepNotes";

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
  const notesText = DEUTERONOMY_DEEP_NOTES[27];

  if (!notesText?.trim()) {
    console.error("Missing Deuteronomy 28 notes.");
    process.exit(1);
  }

  const { error } = await supabase.from("bible_notes").upsert(
    {
      book: "deuteronomy",
      chapter: 28,
      notes_text: notesText,
    },
    { onConflict: "book,chapter" },
  );

  if (error) {
    console.error("Failed to seed Deuteronomy 28 notes:", error);
    process.exit(1);
  }

  console.log("Seeded deeper Deuteronomy 28 notes into bible_notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
