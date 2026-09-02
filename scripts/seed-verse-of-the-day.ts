/**
 * Seed the first-month Verse of the Day pilot into verse_of_the_day_entries.
 *
 * The breakdown content lives in data/verse-of-the-day/. The KJV verse text
 * is NOT hand copied there - this script fetches it from bible-api.com
 * (translation=kjv, the same source the Bible reader falls back to) so
 * Scripture always matches the real KJV.
 *
 *   npx tsx scripts/seed-verse-of-the-day.ts --start 2026-09-02
 *   npx tsx scripts/seed-verse-of-the-day.ts --start 2026-09-02 --dry
 *
 * Upserts on scheduled_date, so re-running is safe. Backgrounds rotate
 * purple-sunrise, blue-sunrise, green-mountains, orange-night; the admin
 * page can override any of them afterwards.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { INITIAL_VERSE_BREAKDOWNS } from "../data/verse-of-the-day/index";

config({ path: ".env.local" });

const DRY = process.argv.includes("--dry");
const startArg = process.argv.indexOf("--start");
const START_DATE = startArg !== -1 ? process.argv[startArg + 1] : "";

const BACKGROUND_ROTATION = ["purple-sunrise", "blue-sunrise", "green-mountains", "orange-night"] as const;

function addDays(isoDate: string, days: number) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().slice(0, 10);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchKjvText(book: string, chapter: number, verseStart: number, verseEnd?: number) {
  const range = verseEnd ? `${verseStart}-${verseEnd}` : `${verseStart}`;
  const url = `https://bible-api.com/${encodeURIComponent(book)}+${chapter}:${range}?translation=kjv`;
  // bible-api rate limits around 15 quick requests - back off and retry.
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url);
    if (res.status === 429) {
      console.log(`  rate limited, waiting ${attempt * 15}s...`);
      await sleep(attempt * 15_000);
      continue;
    }
    if (!res.ok) throw new Error(`bible-api ${res.status} for ${url}`);
    const json = (await res.json()) as { verses?: Array<{ text: string }> };
    if (!json.verses?.length) throw new Error(`No verses returned for ${url}`);
    return json.verses
      .map((v) => v.text.replace(/\s+/g, " ").trim())
      .join(" ")
      .trim();
  }
  throw new Error(`bible-api kept rate limiting for ${url}`);
}

async function main() {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(START_DATE)) {
    throw new Error("Pass --start YYYY-MM-DD (the scheduled date of day 1)");
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const { data: existingRows } = await supabase
    .from("verse_of_the_day_entries")
    .select("scheduled_date, reference");
  const existing = new Map((existingRows || []).map((row) => [row.scheduled_date as string, row.reference as string]));

  for (let i = 0; i < INITIAL_VERSE_BREAKDOWNS.length; i++) {
    const seed = INITIAL_VERSE_BREAKDOWNS[i];
    const scheduledDate = addDays(START_DATE, i);
    if (existing.get(scheduledDate) === seed.reference) {
      console.log(`skip ${scheduledDate} ${seed.reference} (already seeded)`);
      continue;
    }
    await sleep(1500);
    const verseText = await fetchKjvText(seed.book, seed.chapter, seed.verseStart, seed.verseEnd);
    const row = {
      reference: seed.reference,
      book: seed.book,
      chapter: seed.chapter,
      verse_start: seed.verseStart,
      verse_end: seed.verseEnd ?? null,
      translation: "KJV",
      verse_text: verseText,
      scheduled_date: scheduledDate,
      background_theme: BACKGROUND_ROTATION[i % BACKGROUND_ROTATION.length],
      title: seed.title,
      author_section: seed.author,
      context_section: seed.context,
      meaning_section: seed.meaning,
      application_section: seed.application,
      takeaway: seed.takeaway,
      reflection_question: seed.reflection,
      prayer: seed.prayer ?? null,
      status: "approved",
      updated_at: new Date().toISOString(),
      edited_by: "seed-script",
    };
    if (DRY) {
      console.log(`[dry] ${scheduledDate} ${seed.reference} (${row.background_theme}) "${verseText.slice(0, 60)}..."`);
      continue;
    }
    const { error } = await supabase
      .from("verse_of_the_day_entries")
      .upsert(row, { onConflict: "scheduled_date" });
    if (error) throw new Error(`${seed.reference}: ${error.message}`);
    console.log(`seeded ${scheduledDate} ${seed.reference} (${row.background_theme})`);
  }
  console.log(`Done: ${INITIAL_VERSE_BREAKDOWNS.length} entries from ${START_DATE}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
