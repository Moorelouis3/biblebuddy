import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { GENESIS_ONE_OFFICIAL_NOTES } from "../lib/genesisOneOfficialNotes";

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
  const { error } = await supabase.from("bible_notes").upsert(
    {
      book: "genesis",
      chapter: 1,
      notes_text: GENESIS_ONE_OFFICIAL_NOTES,
    },
    { onConflict: "book,chapter" },
  );

  if (error) throw error;

  const words = GENESIS_ONE_OFFICIAL_NOTES.trim().split(/\s+/).filter(Boolean).length;
  console.log(`Seeded official Genesis 1 notes into bible_notes. Words: ${words}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
