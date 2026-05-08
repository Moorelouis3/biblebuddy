import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { extractCompactPopupMeaning } from "../lib/biblePopupContent";

const PEOPLE_NOTES: Array<{ term: string; notes: string }> = [
  {
    term: "Hur (Moses' assistant)",
    notes: `Hur stood beside Moses during critical moments in Israel's journey. When Moses grew tired during battle, Hur helped hold his hands up. This support allowed Israel to keep winning. He did not lead from the front, but his role was essential. Hur shows that strength is not always about position, but about support.`,
  },
  {
    term: "Angel of God",
    notes: `The Angel of God is a messenger sent with divine authority. In the Bible, this figure appears at key moments to guide or warn. He speaks with clarity and purpose. His presence shows that God is actively involved. The Angel of God reflects communication between heaven and earth.`,
  },
  {
    term: "Servant girl",
    notes: `A servant girl worked within a household and had a lower position. Even without status, she often witnessed important events. Her words sometimes revealed truth others ignored. She lived close to moments that mattered. A servant girl shows that influence is not always tied to position.`,
  },
];

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase env vars are missing.");
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  for (const item of PEOPLE_NOTES) {
    const normalized = item.term.toLowerCase().trim().replace(/\s+/g, " ");
    const notesText = extractCompactPopupMeaning("people", item.notes);

    const { error } = await supabase
      .from("bible_people_notes")
      .upsert(
        {
          person_name: normalized,
          notes_text: notesText,
        },
        { onConflict: "person_name" }
      );

    if (error) {
      throw new Error(`Failed for ${item.term}: ${error.message}`);
    }
  }

  console.log(`Seeded ${PEOPLE_NOTES.length} manual people popup notes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
