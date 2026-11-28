/**
 * Put The Sons of Abraham in the app (2026-11-28).
 *
 *   npx tsx scripts/apply-sons-of-abraham-book-days.ts --dry
 *   npx tsx scripts/apply-sons-of-abraham-book-days.ts
 *
 * The sequel to The Obedience of Abraham: 21 days on Genesis 25-36. Reads the
 * day files in data/sons-of-abraham-book-days (written from the print interior
 * by `scripts/build-abraham-book-days.mjs <pdf> --out
 * data/sons-of-abraham-book-days --days 21 --write`, which proves no word
 * differs from the book) and writes them to devotional_days.
 *
 * The study row is created if it is not there yet, UNPUBLISHED: when it goes
 * on the shelf (is_published, available_from) is Louis's call and one row
 * edit. A row that already exists keeps its publish state, its date and its
 * paperback link; only the length, subtitle and description are set.
 *
 * Same job as scripts/apply-abraham-book-days.ts. Database rows, not code:
 * whatever this writes is there the moment it finishes.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

config({ path: ".env.local" });

const TITLE = "The Sons of Abraham";
const TOTAL_DAYS = 21;
const DAYS_DIR = path.join("data", "sons-of-abraham-book-days");

const STUDY = {
  total_days: TOTAL_DAYS,
  subtitle: "A 21-Day Study of Genesis 25-36",
  // Built from the book's own welcome page and back cover.
  description:
    "A 21-day study of Genesis 25-36. Ask most people how many sons Abraham had, and they will say two. The Bible names eight. Follow Abraham's family as it grows: Keturah's sons, Ishmael's twelve princes, Isaac, Jacob and Esau, and the God who was faithful to every branch of it.",
};

/** Only for a row this script creates. */
const NEW_ROW = {
  category: "genesis-series",
  cover_image: "/sons-of-abraham-cover.webp",
  is_published: false,
  sort_order: 7,
};

const DRY = process.argv.includes("--dry");

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
 * `reading` is written the way the book prints it: "Genesis 25:1-6", or
 * across two chapters, "Genesis 27:41-28:9".
 *
 * A day row holds one chapter and one verse range. A reading that crosses a
 * chapter (Days 9 and 13) gets the SECOND chapter's verses, the same rule
 * apply-abraham-book-days.ts uses; the first chapter's verses are quoted in
 * the day's own text.
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
    const text = match[2].replace(/\r\n/g, "\n").trim();
    const title = (meta.title || "").trim();
    const question = (meta.question || "").trim();
    const reading = parseReading(meta.reading || "", file);

    if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS || seen.has(day)) throw new Error(`${file}: bad day ${meta.day}`);
    if (file !== `day-${String(day).padStart(2, "0")}.md`) throw new Error(`${file}: holds day ${day}`);
    if (title.length < 4) throw new Error(`${file}: missing title`);
    if (text.length < 6000) throw new Error(`${file}: devotional text suspiciously short (${text.length})`);
    if (question.length < 10 || !question.includes("?")) throw new Error(`${file}: reflection question looks wrong`);
    // Day 21 steps back to the promise itself, Genesis 17:4-6.
    if (reading.book !== "Genesis" || reading.chapter < 17 || reading.chapter > 36) throw new Error(`${file}: reading out of range`);
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

  const found = await supabase.from("devotionals").select("*").eq("title", TITLE);
  if (found.error) throw new Error(`Could not read the study row: ${found.error.message}`);
  if ((found.data || []).length > 1) throw new Error(`More than one row is titled "${TITLE}"`);
  let study = found.data?.[0] ?? null;

  if (!study) {
    if (DRY) console.log(`[dry] would create the study row "${TITLE}", unpublished`);
    else {
      const created = await supabase.from("devotionals").insert({ title: TITLE, ...STUDY, ...NEW_ROW }).select("*").single();
      if (created.error || !created.data) throw new Error(`Could not create the study row: ${created.error?.message}`);
      study = created.data;
      console.log(`Created the study row ${study.id}, unpublished.`);
    }
  }
  const devotionalId: string | null = study?.id ?? null;

  const existing: Array<{ id: string; day_number: number }> = [];
  if (devotionalId) {
    const rows = await supabase.from("devotional_days").select("id, day_number").eq("devotional_id", devotionalId);
    if (rows.error) throw new Error(`Could not read the day rows: ${rows.error.message}`);
    existing.push(...(rows.data || []));
  }
  const byNumber = new Map(existing.map((row) => [Number(row.day_number), row]));

  let updated = 0;
  let inserted = 0;
  for (const day of days) {
    const row = byNumber.get(day.day_number);
    const label =
      `Day ${String(day.day_number).padStart(2)} "${day.day_title}" ${day.bible_reading_book} ${day.bible_reading_chapter}` +
      `${day.bible_reading_start_verse ? `:${day.bible_reading_start_verse}-${day.bible_reading_end_verse}` : ""} (${day.devotional_text.length} chars)`;
    if (DRY || !devotionalId) {
      console.log(`[dry] ${row ? "update" : "insert"} ${label}`);
      continue;
    }
    if (row) {
      const { error } = await supabase.from("devotional_days").update(day).eq("id", row.id).eq("devotional_id", devotionalId);
      if (error) throw new Error(`Day ${day.day_number}: ${error.message}`);
      updated += 1;
    } else {
      const { error } = await supabase.from("devotional_days").insert({ devotional_id: devotionalId, ...day });
      if (error) throw new Error(`Day ${day.day_number}: ${error.message}`);
      inserted += 1;
    }
    console.log(`${row ? "updated " : "inserted"} ${label}`);
  }

  if (DRY || !devotionalId) {
    console.log(`[dry] would set the study to ${JSON.stringify(STUDY)}`);
    return;
  }
  const { error: updateStudyError } = await supabase.from("devotionals").update(STUDY).eq("id", devotionalId);
  if (updateStudyError) throw new Error(`Study row: ${updateStudyError.message}`);

  // Read it back: what is in the table is the only thing worth reporting.
  const { data: after } = await supabase
    .from("devotional_days")
    .select("day_number, day_title, devotional_text")
    .eq("devotional_id", devotionalId)
    .order("day_number", { ascending: true });
  const mismatched = days.filter((day) => {
    const row = (after || []).find((r) => Number(r.day_number) === day.day_number);
    return !row || row.day_title !== day.day_title || row.devotional_text !== day.devotional_text;
  });
  if (mismatched.length) throw new Error(`Read-back failed for days ${mismatched.map((d) => d.day_number).join(", ")}`);
  console.log(`\n${updated} updated, ${inserted} inserted. ${after?.length} day rows now, all ${TOTAL_DAYS} read back identical. Study ${devotionalId}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
