/**
 * Apply the new "The Tempting of Jesus" book content (second edition, 2026) to
 * the live devotional. Reads the 21 adapted day files produced from the book
 * interior and updates devotional_days in place - titles, devotional text,
 * reflection questions, and the reading assignment where the book changed it.
 *
 *   npx tsx scripts/apply-tempting-book-days.ts data/tempting-book-days [--dry]
 *
 * Each day is a `day-NN.md` file: a small `---` frontmatter block (title,
 * reading, question) followed by the devotional body as markdown. Markdown
 * rather than JSON so the bodies stay readable and reviewable in a diff.
 *
 * A full backup of the previous rows is in
 * data/tempting-devotional-days-backup-2026-10-16.json.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

config({ path: ".env.local" });

const DEVOTIONAL_ID = "86cc0f5e-5414-4691-8348-6a91c9354bde";
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
 * `reading` is written the way the book prints it, e.g. "1 John 2:15-17".
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

  const reading = meta.reading || "";
  // "1 John 2:15-17" / "Luke 4:1-13" / "Deuteronomy 6:16" / "Luke 4"
  const ref = reading.match(/^(.+?)\s+(\d+)(?::(\d+)(?:\s*[-–]\s*(\d+))?)?$/);
  if (!ref) throw new Error(`${file}: could not parse reading "${reading}"`);

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
  if (!dir || !fs.existsSync(dir)) throw new Error("Pass the directory holding day-NN.json files");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const files = fs.readdirSync(dir).filter((f) => /^day-\d{2}\.md$/.test(f)).sort();
  if (files.length !== EXPECTED_DAYS) throw new Error(`Expected ${EXPECTED_DAYS} day files, found ${files.length}`);

  const seen = new Set<number>();
  for (const file of files) {
    const raw = parseDayFile(fs.readFileSync(path.join(dir, file), "utf8"), file);
    const day = Number(raw.day_number);
    const title = String(raw.day_title || "").trim();
    const text = String(raw.devotional_text || "").trim();
    const question = String(raw.reflection_question || "").trim();
    const book = String(raw.bible_reading_book || "").trim();
    const chapter = Number(raw.bible_reading_chapter);
    const startVerse = raw.bible_reading_start_verse ?? null;
    const endVerse = raw.bible_reading_end_verse ?? null;

    if (!day || day < 1 || day > EXPECTED_DAYS || seen.has(day)) throw new Error(`${file}: bad day_number ${raw.day_number}`);
    if (title.length < 4) throw new Error(`${file}: missing title`);
    if (text.length < 2500) throw new Error(`${file}: devotional_text suspiciously short (${text.length})`);
    if (question.length < 10 || !question.includes("?")) throw new Error(`${file}: reflection_question looks wrong`);
    if (!book || !chapter) throw new Error(`${file}: missing bible reading`);
    if (!text.includes("## Today's Prayer")) throw new Error(`${file}: no prayer section`);
    if (!text.includes("## Today's One Thing")) throw new Error(`${file}: no action section`);
    seen.add(day);

    if (DRY) {
      console.log(
        `[dry] Day ${String(day).padStart(2)}: "${title}" (${text.length} chars) ` +
          `${book} ${chapter}${startVerse ? `:${startVerse}-${endVerse}` : ""} Q: ${question.slice(0, 50)}...`
      );
      continue;
    }
    const { error, count } = await supabase
      .from("devotional_days")
      .update(
        {
          day_title: title,
          devotional_text: text,
          reflection_question: question,
          bible_reading_book: book,
          bible_reading_chapter: chapter,
          bible_reading_start_verse: startVerse,
          bible_reading_end_verse: endVerse,
        },
        { count: "exact" }
      )
      .eq("devotional_id", DEVOTIONAL_ID)
      .eq("day_number", day);
    if (error) throw new Error(`Day ${day}: ${error.message}`);
    if (count !== 1) throw new Error(`Day ${day}: expected to update 1 row, updated ${count}`);
    console.log(`updated Day ${day}: ${title}`);
  }

  if (!DRY) {
    // The devotional's own framing takes the book's second-edition shape.
    const description =
      "Twenty one days in the wilderness with Jesus. The study moves in four parts: " +
      "know the enemy and the three tricks he has run since Eden, watch the preparation that " +
      "got Jesus ready, walk through the showdown itself with every Old Testament passage He " +
      "quoted, and finish with the victory - the five steps He used to fight, the armor God " +
      "hands you, and the promise that you are never alone in it. " +
      "Every day gives you the reading, what to watch for, questions that are hard to dodge, " +
      "one concrete action, and a prayer.";
    const { error } = await supabase
      .from("devotionals")
      .update({ description, subtitle: "A 21-Day Bible Buddy Study" })
      .eq("id", DEVOTIONAL_ID);
    if (error) throw new Error(`devotional description: ${error.message}`);
    console.log("updated devotional description + subtitle");
  }
  console.log(DRY ? "Dry run complete." : `All ${EXPECTED_DAYS} days updated from the book.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
