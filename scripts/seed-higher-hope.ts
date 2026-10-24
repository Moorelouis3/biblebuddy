/**
 * Seed Higher Hope's days into devotional_days (2026-10-24).
 *
 * The study row already exists - Louis created it on 2026-10-18 with
 * total_days 60 and available_from 2026-10-25 - and had zero days in it, so
 * opening it would have shown an empty study. This is what fills it.
 *
 * Day content lives in data/higher-hope/days-*.json, one file per batch of
 * ten, so each batch is a readable diff in git rather than a wall of escaped
 * text inside a script. The script reads every file in that folder, sorts by
 * day_number and upserts. Re-running it is safe and idempotent: a day is
 * matched on (devotional_id, day_number), which is already a unique
 * constraint, so editing a file and re-running updates that day in place
 * rather than duplicating it.
 *
 * Usage:
 *   node --env-file=.env.local -r esbuild-register scripts/seed-higher-hope.ts
 *   npx tsx scripts/seed-higher-hope.ts          (needs the env vars exported)
 *
 * Add --check to print what is in the database without writing anything.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const DEVOTIONAL_ID = "170cb29a-39fc-47b7-9083-db1664df04f6";
const DAYS_DIR = join(process.cwd(), "data", "higher-hope");

type Day = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  bible_reading_start_verse?: number | null;
  bible_reading_end_verse?: number | null;
  reflection_question: string;
};

function loadDays(): Day[] {
  const files = readdirSync(DAYS_DIR).filter((f) => f.endsWith(".json")).sort();
  const days: Day[] = [];
  for (const file of files) {
    const parsed = JSON.parse(readFileSync(join(DAYS_DIR, file), "utf8"));
    if (!Array.isArray(parsed)) throw new Error(`${file} is not a JSON array`);
    days.push(...parsed);
  }
  days.sort((a, b) => a.day_number - b.day_number);

  // Fail loudly rather than seeding a study with a hole in it. A missing or
  // duplicated day number is the one error a reader would actually hit.
  const seen = new Set<number>();
  for (const day of days) {
    if (seen.has(day.day_number)) throw new Error(`day ${day.day_number} appears twice`);
    seen.add(day.day_number);
    if (!day.day_title?.trim()) throw new Error(`day ${day.day_number} has no title`);
    if (!day.devotional_text?.trim()) throw new Error(`day ${day.day_number} has no text`);
    if (!day.bible_reading_book?.trim()) throw new Error(`day ${day.day_number} has no reading`);
    if (!day.reflection_question?.trim()) throw new Error(`day ${day.day_number} has no question`);
  }
  return days;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  if (process.argv.includes("--check")) {
    const { data, error } = await db
      .from("devotional_days")
      .select("day_number, day_title, bible_reading_book, bible_reading_chapter")
      .eq("devotional_id", DEVOTIONAL_ID)
      .order("day_number");
    if (error) throw new Error(error.message);
    console.log(`${data.length} days live:`);
    for (const d of data) {
      console.log(`  ${String(d.day_number).padStart(2)} | ${d.day_title} | ${d.bible_reading_book} ${d.bible_reading_chapter}`);
    }
    const missing = Array.from({ length: 60 }, (_, i) => i + 1).filter(
      (n) => !data.some((d) => d.day_number === n),
    );
    console.log(missing.length ? `missing: ${missing.join(", ")}` : "all 60 days present");
    return;
  }

  const days = loadDays();
  console.log(`Loaded ${days.length} days from data/higher-hope/`);

  let written = 0;
  for (const day of days) {
    const { error } = await db.from("devotional_days").upsert(
      {
        devotional_id: DEVOTIONAL_ID,
        day_number: day.day_number,
        day_title: day.day_title,
        devotional_text: day.devotional_text,
        bible_reading_book: day.bible_reading_book,
        bible_reading_chapter: day.bible_reading_chapter,
        bible_reading_start_verse: day.bible_reading_start_verse ?? null,
        bible_reading_end_verse: day.bible_reading_end_verse ?? null,
        reflection_question: day.reflection_question,
      },
      { onConflict: "devotional_id,day_number" },
    );
    if (error) throw new Error(`day ${day.day_number}: ${error.message}`);
    written += 1;
    process.stdout.write(`\r  wrote day ${day.day_number} (${written}/${days.length})   `);
  }
  console.log(`\nDone. ${written} days written.`);

  const { count } = await db
    .from("devotional_days")
    .select("id", { count: "exact", head: true })
    .eq("devotional_id", DEVOTIONAL_ID);
  console.log(`devotional_days now holds ${count} rows for Higher Hope (target 60).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
