/**
 * Apply the printed "21 Women of the Bible" book to the live Women of the Bible
 * devotional, the same way apply-tempting-book-days.ts applied the second
 * edition of The Tempting of Jesus.
 *
 *   npx tsx scripts/apply-women-book-days.ts data/women-book-days [--dry]
 *
 * The day files come out of the book itself - scripts/extract-book-days.mjs
 * reads them back off 21_Women_of_the_Bible_Interior.pdf - so the app and the
 * printed book end up carrying one text. The study in the app was 20,334 words
 * across 21 days; the book is 47,290, which is what this writes in.
 *
 * Every row it is about to touch is written to a backup file first.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

config({ path: ".env.local" });

const DEVOTIONAL_ID = "0a6d6ab9-03a3-4ac6-8a72-44f24f3be254";
const EXPECTED_DAYS = 21;
const DRY = process.argv.includes("--dry");
const dir = process.argv[2];

interface DayFile {
  day_number: number;
  day_title: string;
  devotional_text: string;
  reflection_question: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  bible_reading_start_verse: number | null;
  bible_reading_end_verse: number | null;
}

/**
 * `day-NN.md` = `---` frontmatter (key: value per line) then the markdown body.
 *
 * A reading is written the way the book prints it, which for this book is often
 * two passages: "Genesis 2:18-25 · Genesis 3:1-24". The columns only hold one,
 * so the first is what goes in; the full line stays visible in the body under
 * "Today's Reading".
 */
function parseDayFile(source: string, file: string): DayFile {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${file}: expected a --- frontmatter block at the top`);
  const [, head, body] = match;

  const meta: Record<string, string> = {};
  for (const line of head.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const at = line.indexOf(":");
    if (at === -1) throw new Error(`${file}: bad frontmatter line "${line}"`);
    meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }

  const reading = (meta.reading || "").split("·")[0].trim();
  const ref = reading.match(/^(.+?)\s+(\d+)(?::(\d+)(?:\s*[-–—]\s*(\d+))?)?$/);
  if (!ref) throw new Error(`${file}: could not parse reading "${meta.reading}"`);

  return {
    day_number: Number(meta.day),
    day_title: meta.title || "",
    devotional_text: body.trim(),
    reflection_question: meta.question || "",
    bible_reading_book: ref[1].trim(),
    bible_reading_chapter: Number(ref[2]),
    bible_reading_start_verse: ref[3] ? Number(ref[3]) : null,
    bible_reading_end_verse: ref[4] ? Number(ref[4]) : ref[3] ? Number(ref[3]) : null,
  };
}

async function main() {
  if (!dir || !fs.existsSync(dir)) throw new Error("Pass the directory holding day-NN.md files");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const files = fs.readdirSync(dir).filter((f) => /^day-\d{2}\.md$/.test(f)).sort();
  if (files.length !== EXPECTED_DAYS) throw new Error(`Expected ${EXPECTED_DAYS} day files, found ${files.length}`);

  const parsed = files.map((file) => parseDayFile(fs.readFileSync(path.join(dir, file), "utf8"), file));

  const seen = new Set<number>();
  for (const [index, day] of parsed.entries()) {
    const file = files[index];
    const text = day.devotional_text;
    if (!day.day_number || day.day_number < 1 || day.day_number > EXPECTED_DAYS || seen.has(day.day_number)) {
      throw new Error(`${file}: bad day number ${day.day_number}`);
    }
    if (day.day_title.length < 4) throw new Error(`${file}: missing title`);
    if (text.length < 6000) throw new Error(`${file}: body suspiciously short (${text.length} chars)`);
    if (!day.reflection_question.includes("?")) throw new Error(`${file}: reflection question looks wrong`);
    if (!day.bible_reading_book || !day.bible_reading_chapter) throw new Error(`${file}: missing reading`);
    if (!text.includes("## Today's Prayer")) throw new Error(`${file}: no prayer section`);
    if (!text.includes("## Today's Action")) throw new Error(`${file}: no action section`);
    seen.add(day.day_number);
  }

  if (DRY) {
    for (const day of parsed) {
      console.log(
        `[dry] Day ${String(day.day_number).padStart(2)}: "${day.day_title}" ` +
          `(${day.devotional_text.length} chars) ${day.bible_reading_book} ${day.bible_reading_chapter}` +
          `${day.bible_reading_start_verse ? `:${day.bible_reading_start_verse}-${day.bible_reading_end_verse}` : ""}`,
      );
    }
    console.log("Dry run complete.");
    return;
  }

  // Nothing is overwritten until the rows as they stand are on disk.
  const { data: before, error: readError } = await supabase
    .from("devotional_days")
    .select("*")
    .eq("devotional_id", DEVOTIONAL_ID)
    .order("day_number");
  if (readError) throw new Error(`backup read: ${readError.message}`);
  const backup = path.join("data", `women-devotional-days-backup-${new Date().toISOString().slice(0, 10)}.json`);
  fs.writeFileSync(backup, JSON.stringify(before, null, 2));
  console.log(`backed up ${before?.length ?? 0} rows -> ${backup}`);

  for (const day of parsed) {
    const { error, count } = await supabase
      .from("devotional_days")
      .update(
        {
          day_title: day.day_title,
          devotional_text: day.devotional_text,
          reflection_question: day.reflection_question,
          bible_reading_book: day.bible_reading_book,
          bible_reading_chapter: day.bible_reading_chapter,
          bible_reading_start_verse: day.bible_reading_start_verse,
          bible_reading_end_verse: day.bible_reading_end_verse,
        },
        { count: "exact" },
      )
      .eq("devotional_id", DEVOTIONAL_ID)
      .eq("day_number", day.day_number);
    if (error) throw new Error(`Day ${day.day_number}: ${error.message}`);
    if (count !== 1) throw new Error(`Day ${day.day_number}: expected to update 1 row, updated ${count}`);
    console.log(`updated Day ${String(day.day_number).padStart(2)}: ${day.day_title}`);
  }

  const description =
    "Twenty one women, twenty one days. From Eve in the garden to Martha and Mary in the house " +
    "at Bethany, these are the women God used to carry His story - and they were not on the " +
    "margins of it. Some are brave. Some are broken. Some did terrible things. Jezebel is here " +
    "and so is Delilah, and none of them are cleaned up for you. " +
    "Every day gives you the reading, what to watch for before you start, the woman's story told " +
    "straight, questions that are hard to dodge, one concrete action, and a prayer.";
  const { error: devotionalError } = await supabase
    .from("devotionals")
    .update({ description, subtitle: "A 21-Day Bible Buddy Study" })
    .eq("id", DEVOTIONAL_ID);
  if (devotionalError) throw new Error(`devotional description: ${devotionalError.message}`);
  console.log("updated devotional description + subtitle");
  console.log(`All ${EXPECTED_DAYS} days updated from the book.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
