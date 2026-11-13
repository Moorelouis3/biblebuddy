/**
 * Put the book edition of The Obedience of Abraham live (2026-11-13).
 *
 *   npx tsx scripts/apply-abraham-book-days.ts --backup-only
 *   npx tsx scripts/apply-abraham-book-days.ts --dry
 *   npx tsx scripts/apply-abraham-book-days.ts
 *
 * Reads the 30 day files in data/abraham-book-days (written from the print
 * interior by scripts/build-abraham-book-days.mjs, which proves no word
 * differs from the book) and writes them to devotional_days for this one
 * study: the 15 rows that exist are updated in place by day number, days 16 to
 * 30 are inserted. It then sets the study itself to 30 days.
 *
 * Same job as scripts/apply-tempting-book-days.ts did for The Tempting of
 * Jesus, with two differences: the study grows, so rows are inserted as well
 * as updated; and nothing outside DEVOTIONAL_ID can be reached from here.
 *
 * WHAT IT REPLACES. An older 15-day study, one chapter of Genesis 11-25 a day,
 * about 1,300 characters each. Louis, 2026-11-13: "u used an old bible study
 * which is old and not up to date". The whole of it is saved first, in
 * data/abraham-devotional-days-backup-2026-11-13.json, and the script refuses
 * to run if that file cannot be written.
 *
 * WHAT IT DOES NOT TOUCH. devotional_progress. Eighteen accounts have rows
 * against this study from April and May 2026, when it was the old text. Those
 * are people's records and are left exactly as they are; whether an old
 * "day 1 complete" should count against the new Day 1 is Louis's call, not
 * this script's.
 *
 * These are database rows, not code: whatever this writes is live the moment
 * it finishes. There is no build to wait for.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

config({ path: ".env.local" });

const DEVOTIONAL_ID = "2c7641c1-0280-4847-b36e-e89004a58534"; // The Obedience of Abraham
const TITLE = "The Obedience of Abraham";
const TOTAL_DAYS = 30;
const DAYS_DIR = path.join("data", "abraham-book-days");
const BACKUP_PATH = path.join("data", "abraham-devotional-days-backup-2026-11-13.json");

const STUDY = {
  total_days: TOTAL_DAYS,
  subtitle: "A 30-Day Study of Genesis 9-25",
  // Built from the book's own welcome page.
  description:
    "A 30-day study of Genesis 9-25. This is not a character study about Abraham. It is a study about obedience. Walk through his story from the world starting over after the flood, to the moment God called him to leave everything he knew, to some of the most difficult decisions he would ever have to make.",
};

const DRY = process.argv.includes("--dry");
const BACKUP_ONLY = process.argv.includes("--backup-only");

type Day = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  reflection_question: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  bible_reading_start_verse: number | null;
  bible_reading_end_verse: number | null;
};

/**
 * `reading` is written the way the book prints it: "Genesis 9:1-19",
 * "Genesis 10", or across two chapters, "Genesis 11:31-12:3".
 *
 * A day row holds one chapter and one verse range. For the one reading that
 * crosses a chapter (Day 7, "Get Thee Out", Genesis 11:31-12:3) the row gets
 * the SECOND chapter's verses, 12:1-3, because that is the call the day is
 * named for; 11:31-32 is quoted in full in the day's own text.
 */
function parseReading(reading: string, file: string) {
  const m = reading.match(/^(.+?)\s+(\d+)(?::(\d+)(?:\s*-\s*(?:(\d+):)?(\d+))?)?$/);
  if (!m) throw new Error(`${file}: could not parse reading "${reading}"`);
  const [, book, chapter, start, endChapter, end] = m;
  if (endChapter && endChapter !== chapter) {
    return { book: book.trim(), chapter: Number(endChapter), start: 1, end: Number(end) };
  }
  return {
    book: book.trim(),
    chapter: Number(chapter),
    start: start ? Number(start) : null,
    end: end ? Number(end) : start ? Number(start) : null,
  };
}

function readDays(): Day[] {
  const files = fs.readdirSync(DAYS_DIR).filter((f) => /^day-\d{2}\.md$/.test(f)).sort();
  if (files.length !== TOTAL_DAYS) throw new Error(`Expected ${TOTAL_DAYS} day files, found ${files.length}`);
  const seen = new Set<number>();
  return files.map((file) => {
    const source = fs.readFileSync(path.join(DAYS_DIR, file), "utf8");
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) throw new Error(`${file}: expected a --- frontmatter block at the top`);
    const meta: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
      if (!line.trim()) continue;
      const at = line.indexOf(":");
      if (at === -1) throw new Error(`${file}: bad frontmatter line "${line}"`);
      meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
    }
    const day = Number(meta.day);
    const text = match[2].trim();
    const title = (meta.title || "").trim();
    const question = (meta.question || "").trim();
    const reading = parseReading(meta.reading || "", file);

    if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS || seen.has(day)) throw new Error(`${file}: bad day ${meta.day}`);
    if (file !== `day-${String(day).padStart(2, "0")}.md`) throw new Error(`${file}: holds day ${day}`);
    if (title.length < 4) throw new Error(`${file}: missing title`);
    if (text.length < 6000) throw new Error(`${file}: devotional text suspiciously short (${text.length})`);
    if (question.length < 10 || !question.includes("?")) throw new Error(`${file}: reflection question looks wrong`);
    if (reading.book !== "Genesis" || reading.chapter < 9 || reading.chapter > 25) throw new Error(`${file}: reading out of range`);
    for (const section of ["## What To Watch For In Genesis", "## Reflection Questions", "## Today's One Thing", "## Today's Prayer"]) {
      if (!text.includes(section)) throw new Error(`${file}: no "${section}" section`);
    }
    if (!/^[A-Z“"]/.test(text)) throw new Error(`${file}: the first line does not start with a capital (lost drop cap?)`);
    seen.add(day);
    return {
      day_number: day,
      day_title: title,
      devotional_text: text,
      reflection_question: question,
      bible_reading_book: reading.book,
      bible_reading_chapter: reading.chapter,
      bible_reading_start_verse: reading.start,
      bible_reading_end_verse: reading.end,
    };
  });
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const days = readDays();

  const { data: study, error: studyError } = await supabase.from("devotionals").select("*").eq("id", DEVOTIONAL_ID).single();
  if (studyError || !study) throw new Error(`Could not read the study row: ${studyError?.message}`);
  if (study.title !== TITLE) throw new Error(`Wrong row: "${study.title}"`);

  const { data: existing, error: existingError } = await supabase
    .from("devotional_days")
    .select("*")
    .eq("devotional_id", DEVOTIONAL_ID)
    .order("day_number", { ascending: true });
  if (existingError || !existing) throw new Error(`Could not read the day rows: ${existingError?.message}`);

  // The backup is written once and never overwritten: a second run must not
  // replace the old study's text with a copy of the new one.
  if (!fs.existsSync(BACKUP_PATH)) {
    if (DRY) console.log(`[dry] would back up the study row and ${existing.length} day rows to ${BACKUP_PATH}`);
    else {
      fs.writeFileSync(BACKUP_PATH, JSON.stringify({ taken_at: new Date().toISOString(), devotional: study, days: existing }, null, 2));
      console.log(`Backed up the study row and ${existing.length} day rows to ${BACKUP_PATH}`);
    }
  } else {
    console.log(`Backup already exists at ${BACKUP_PATH}; leaving it as it is.`);
  }
  if (BACKUP_ONLY) return;

  const byNumber = new Map(existing.map((row) => [Number(row.day_number), row]));
  let updated = 0;
  let inserted = 0;
  for (const day of days) {
    const row = byNumber.get(day.day_number);
    const label = `Day ${String(day.day_number).padStart(2)} "${day.day_title}" ${day.bible_reading_book} ${day.bible_reading_chapter}` +
      `${day.bible_reading_start_verse ? `:${day.bible_reading_start_verse}-${day.bible_reading_end_verse}` : ""} (${day.devotional_text.length} chars)`;
    if (DRY) {
      console.log(`[dry] ${row ? "update" : "insert"} ${label}`);
      continue;
    }
    if (row) {
      const { error } = await supabase.from("devotional_days").update(day).eq("id", row.id).eq("devotional_id", DEVOTIONAL_ID);
      if (error) throw new Error(`Day ${day.day_number}: ${error.message}`);
      updated += 1;
    } else {
      const { error } = await supabase.from("devotional_days").insert({ devotional_id: DEVOTIONAL_ID, ...day });
      if (error) throw new Error(`Day ${day.day_number}: ${error.message}`);
      inserted += 1;
    }
    console.log(`${row ? "updated " : "inserted"} ${label}`);
  }

  const extra = existing.filter((row) => Number(row.day_number) > TOTAL_DAYS);
  if (extra.length) console.log(`Note: ${extra.length} existing rows are past day ${TOTAL_DAYS} and were left alone.`);

  if (DRY) {
    console.log(`[dry] would set the study to ${JSON.stringify(STUDY)}`);
    return;
  }
  const { error: updateStudyError } = await supabase.from("devotionals").update(STUDY).eq("id", DEVOTIONAL_ID);
  if (updateStudyError) throw new Error(`Study row: ${updateStudyError.message}`);

  // Read it back: what is in the table is the only thing worth reporting.
  const { data: after } = await supabase
    .from("devotional_days")
    .select("day_number, day_title, devotional_text")
    .eq("devotional_id", DEVOTIONAL_ID)
    .order("day_number", { ascending: true });
  const mismatched = days.filter((day) => {
    const row = (after || []).find((r) => Number(r.day_number) === day.day_number);
    return !row || row.day_title !== day.day_title || row.devotional_text !== day.devotional_text;
  });
  if (mismatched.length) throw new Error(`Read-back failed for days ${mismatched.map((d) => d.day_number).join(", ")}`);
  console.log(`\n${updated} updated, ${inserted} inserted. ${after?.length} day rows now, all 30 read back identical. Study set to ${TOTAL_DAYS} days.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
