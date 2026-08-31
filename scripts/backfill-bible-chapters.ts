/**
 * Fill gaps in the `bible_chapters` table, which is where the Bible in One Year
 * renderer reads its Scripture (WEB) from.
 *
 * Numbers 13-23, 26, 27, 29 and 34-36 were simply never imported. Day 41 hit
 * Numbers 13, threw "No Scripture found", and because the batch runner used to
 * abort on the first failure, days 42-54 never rendered at all.
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
 * books as missing and would insert a full duplicate set.
 */
const CHAPTER_COUNTS: Record<string, number> = {
  genesis: 50, exodus: 40, leviticus: 27, numbers: 36, deuteronomy: 34,
  joshua: 24, judges: 21, ruth: 4, "1 samuel": 31, "2 samuel": 24,
  "1 kings": 22, "2 kings": 25, "1 chronicles": 29, "2 chronicles": 36,
  ezra: 10, nehemiah: 13, esther: 10, job: 42, psalms: 150, proverbs: 31,
  ecclesiastes: 12, isaiah: 66, jeremiah: 52, ezekiel: 48, daniel: 12,
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
