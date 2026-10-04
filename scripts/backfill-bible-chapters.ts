/**
 * Fill gaps in the `bible_chapters` table, which is where the Bible in One Year
 * renderer reads its Scripture (WEB) from.
 *
 * Numbers 13-23, 26, 27, 29 and 34-36 were simply never imported. Day 41 hit
 * Numbers 13, threw "No Scripture found", and because the batch runner used to
 * abort on the first failure, days 42-54 never rendered at all.
 *
 * 2026-10-04: the same thing happened again past Daniel, because the list below
 * only covered Genesis-Daniel - so a gap in any later book was invisible to this
 * script. Days 194 and 195 failed on Song of Solomon 3 and 8, and days 257-261,
 * 263-265 and 270 were about to fail on Hosea, Amos and Nahum. The list is now
 * all 66 books, so a gap anywhere is caught.
 *
 *   npx tsx scripts/backfill-bible-chapters.ts            # every gap it finds
 *   npx tsx scripts/backfill-bible-chapters.ts --book numbers
 *   npx tsx scripts/backfill-bible-chapters.ts --dry
 *
 * Only inserts what is missing, so it is safe to re-run.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const DRY = process.argv.includes("--dry");
const bookArgIndex = process.argv.indexOf("--book");
const ONLY_BOOK = bookArgIndex !== -1 ? (process.argv[bookArgIndex + 1] || "").toLowerCase() : "";

/**
 * Chapter counts, so a gap is any number in 1..count with no row.
 *
 * Keys MUST match how the table stores `book` - numbered books are spaced,
 * "1 samuel" not "1samuel". Getting this wrong reports every chapter of those
 * books as missing and would insert a full duplicate set. Every spelling below
 * was checked against the live table on 2026-10-04: all 66 resolve, and the
 * only gaps found were the 20 chapters listed in the header note.
 */
const CHAPTER_COUNTS: Record<string, number> = {
  genesis: 50, exodus: 40, leviticus: 27, numbers: 36, deuteronomy: 34,
  joshua: 24, judges: 21, ruth: 4, "1 samuel": 31, "2 samuel": 24,
  "1 kings": 22, "2 kings": 25, "1 chronicles": 29, "2 chronicles": 36,
  ezra: 10, nehemiah: 13, esther: 10, job: 42, psalms: 150, proverbs: 31,
  ecclesiastes: 12, "song of solomon": 8, isaiah: 66, jeremiah: 52,
  lamentations: 5, ezekiel: 48, daniel: 12, hosea: 14, joel: 3, amos: 9,
  obadiah: 1, jonah: 4, micah: 7, nahum: 3, habakkuk: 3, zephaniah: 3,
  haggai: 2, zechariah: 14, malachi: 4,
  matthew: 28, mark: 16, luke: 24, john: 21, acts: 28, romans: 16,
  "1 corinthians": 16, "2 corinthians": 13, galatians: 6, ephesians: 6,
  philippians: 4, colossians: 4, "1 thessalonians": 5, "2 thessalonians": 3,
  "1 timothy": 6, "2 timothy": 4, titus: 3, philemon: 1, hebrews: 13,
  james: 5, "1 peter": 5, "2 peter": 3, "1 john": 5, "2 john": 1,
  "3 john": 1, jude: 1, revelation: 22,
};

/** bible-api.com takes the same spaced form: "1 Samuel 3". */
function apiReference(book: string, chapter: number) {
  return `${book} ${chapter}`;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase credentials are required.");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const books = Object.entries(CHAPTER_COUNTS).filter(([b]) => !ONLY_BOOK || b === ONLY_BOOK);
  const gaps: Array<{ book: string; chapter: number }> = [];

  for (const [book, count] of books) {
    const { data, error } = await supabase.from("bible_chapters").select("chapter").ilike("book", book);
    if (error) throw new Error(`${book}: ${error.message}`);
    const have = new Set((data || []).map((r: any) => r.chapter));
    for (let c = 1; c <= count; c += 1) if (!have.has(c)) gaps.push({ book, chapter: c });
  }

  if (!gaps.length) {
    console.log("No gaps. Every chapter checked is present.");
    return;
  }

  console.log(`${gaps.length} missing chapter(s):`);
  for (const [book, list] of Object.entries(
    gaps.reduce<Record<string, number[]>>((acc, g) => {
      (acc[g.book] ||= []).push(g.chapter);
      return acc;
    }, {}),
  )) {
    console.log(`  ${book}: ${list.join(", ")}`);
  }
  if (DRY) return;

  let filled = 0;
  let failed = 0;

  for (const { book, chapter } of gaps) {
    const reference = apiReference(book, chapter);
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}?translation=web`);
      if (!res.ok) throw new Error(`bible-api.com returned ${res.status}`);
      const json: any = await res.json();
      if (!Array.isArray(json?.verses) || !json.verses.length) throw new Error("no verses in response");

      const { error } = await supabase.from("bible_chapters").insert({
        book,
        chapter,
        content_json: json,
      });
      if (error) throw new Error(error.message);

      filled += 1;
      console.log(`  ok   ${reference.padEnd(16)} ${json.verses.length} verses`);
    } catch (err) {
      failed += 1;
      console.log(`  FAIL ${reference.padEnd(16)} ${err instanceof Error ? err.message : String(err)}`);
    }
    // bible-api.com allows roughly 15 requests per 30 seconds.
    await new Promise((r) => setTimeout(r, 2100));
  }

  console.log(`\nfilled ${filled}, failed ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
