import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { renderProverbsTwentyOneToThirtyOneNotes } from "../lib/proverbsTwentyOneToThirtyOneNotes";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type BibleApiVerse = {
  verse: number;
  text: string;
};

type BibleApiResponse = {
  verses?: BibleApiVerse[];
};

function cleanVerseText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchKjvVerses(chapter: number) {
  const url = `https://bible-api.com/proverbs%20${chapter}?translation=kjv`;
  let response: Response | null = null;

  for (let attempt = 1; attempt <= 8; attempt += 1) {
    response = await fetch(url);
    if (response.ok || response.status !== 429) break;
    await sleep(3000 * attempt);
  }

  if (!response) {
    throw new Error(`Failed to fetch Proverbs ${chapter} KJV text: no response`);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch Proverbs ${chapter} KJV text: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as BibleApiResponse;

  if (!payload.verses?.length) {
    throw new Error(`No verses returned for Proverbs ${chapter}.`);
  }

  return payload.verses.map((verse) => ({
    verse: verse.verse,
    text: cleanVerseText(verse.text),
  }));
}

async function main() {
  const rows = [];

  for (let chapter = 21; chapter <= 31; chapter += 1) {
    const verses = await fetchKjvVerses(chapter);
    rows.push({
      book: "proverbs",
      chapter,
      notes_text: renderProverbsTwentyOneToThirtyOneNotes(chapter, verses),
    });
    await sleep(1200);
  }

  const { error } = await supabase.from("bible_notes").upsert(rows, { onConflict: "book,chapter" });

  if (error) {
    console.error("Failed to seed Proverbs 21-31 notes:", error);
    process.exit(1);
  }

  console.log("Seeded deeper Proverbs 21-31 notes into bible_notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
