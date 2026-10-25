#!/usr/bin/env node
/**
 * Fill a study's days from JSON on disk.
 *
 *   node --env-file=.env.local scripts/seed-study-days.mjs "<study title>" <data-dir>
 *   node --env-file=.env.local scripts/seed-study-days.mjs "<study title>" <data-dir> --check
 *
 * This is scripts/seed-higher-hope.ts with the study pulled out into an
 * argument. That one was written for a single book and then The Beginning of
 * Everything needed exactly the same thing a day later, which is the point at
 * which a copy becomes a liability. Use this for the next one; the Higher Hope
 * script still works and is left alone.
 *
 * Day content lives in <data-dir>/*.json, one file per batch, so each batch is
 * a readable diff in git rather than a wall of escaped text inside a script.
 * Every file in the folder is read, sorted by day_number and upserted.
 *
 * Re-running is safe: a day is matched on (devotional_id, day_number), which
 * is a unique constraint, so editing a file and re-running updates that day in
 * place rather than duplicating it.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const [, , TITLE, DIR, ...rest] = process.argv;
const CHECK = rest.includes("--check") || process.argv.includes("--check");
if (!TITLE || !DIR) {
  console.error('usage: seed-study-days.mjs "<study title>" <data-dir> [--check]');
  process.exit(1);
}

function loadDays() {
  const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
  const days = [];
  for (const file of files) {
    const parsed = JSON.parse(readFileSync(join(DIR, file), "utf8"));
    if (!Array.isArray(parsed)) throw new Error(`${file} is not a JSON array`);
    days.push(...parsed);
  }
  days.sort((a, b) => a.day_number - b.day_number);

  // Fail loudly rather than seeding a study with a hole in it. A missing or
  // duplicated day number is the one error a reader would actually hit.
  const seen = new Set();
  for (const day of days) {
    if (seen.has(day.day_number)) throw new Error(`day ${day.day_number} appears twice`);
    seen.add(day.day_number);
    if (!day.day_title?.trim()) throw new Error(`day ${day.day_number} has no title`);
    if (!day.devotional_text?.trim()) throw new Error(`day ${day.day_number} has no text`);
    if (!day.bible_reading_book?.trim()) throw new Error(`day ${day.day_number} has no reading`);
    if (!day.reflection_question?.trim()) throw new Error(`day ${day.day_number} has no question`);
  }
  for (let n = 1; n <= days.length; n += 1) {
    if (!seen.has(n)) throw new Error(`day ${n} is missing; days run 1 to ${days.length}`);
  }
  return days;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

const { data: studies, error: findError } = await db.from("devotionals").select("id, title, total_days").eq("title", TITLE);
if (findError) throw new Error(findError.message);
if (!studies.length) throw new Error(`No study called "${TITLE}".`);
if (studies.length > 1) throw new Error(`${studies.length} studies are called "${TITLE}".`);
const study = studies[0];

if (CHECK) {
  const { data, error } = await db
    .from("devotional_days")
    .select("day_number, day_title, bible_reading_book, bible_reading_chapter")
    .eq("devotional_id", study.id)
    .order("day_number");
  if (error) throw new Error(error.message);
  console.log(`${study.title}: ${data.length} days live (total_days ${study.total_days})`);
  for (const d of data) {
    console.log(`  ${String(d.day_number).padStart(2)} | ${d.day_title} | ${d.bible_reading_book} ${d.bible_reading_chapter}`);
  }
  const missing = Array.from({ length: study.total_days || data.length }, (_, i) => i + 1).filter(
    (n) => !data.some((d) => d.day_number === n),
  );
  console.log(missing.length ? `missing: ${missing.join(", ")}` : `all ${study.total_days} days present`);
  process.exit(0);
}

const days = loadDays();
console.log(`Loaded ${days.length} days from ${DIR} for "${study.title}"`);
if (study.total_days && study.total_days !== days.length) {
  throw new Error(`the row says total_days ${study.total_days} but ${days.length} days were loaded`);
}

let written = 0;
for (const day of days) {
  const { error } = await db.from("devotional_days").upsert(
    {
      devotional_id: study.id,
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

const { count } = await db
  .from("devotional_days")
  .select("id", { count: "exact", head: true })
  .eq("devotional_id", study.id);
console.log(`\nDone. ${written} written; devotional_days now holds ${count} rows for ${study.title}.`);
process.exit(0);
