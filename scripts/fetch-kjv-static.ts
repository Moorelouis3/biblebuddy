/**
 * One-off: fetch every KJV chapter from bible-api.com (the same source the
 * reader has always used, so the verse text is identical character for
 * character and saved highlights keep their offsets) and write it as static
 * JSON under public/kjv/<book-slug>/<chapter>.json.
 *
 * Served from the CDN, a chapter's text then arrives as fast as Genesis 1's
 * bundled text, with no third-party request in the reader's critical path.
 *
 * Safe to re-run: chapters that already exist are skipped.
 *   npx tsx scripts/fetch-kjv-static.ts
 */
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOOKS: Array<[string, number]> = [
  ["Genesis", 50], ["Exodus", 40], ["Leviticus", 27], ["Numbers", 36], ["Deuteronomy", 34],
  ["Joshua", 24], ["Judges", 21], ["Ruth", 4], ["1 Samuel", 31], ["2 Samuel", 24],
  ["1 Kings", 22], ["2 Kings", 25], ["1 Chronicles", 29], ["2 Chronicles", 36], ["Ezra", 10],
  ["Nehemiah", 13], ["Esther", 10], ["Job", 42], ["Psalms", 150], ["Proverbs", 31],
  ["Ecclesiastes", 12], ["Song of Solomon", 8], ["Isaiah", 66], ["Jeremiah", 52], ["Lamentations", 5],
  ["Ezekiel", 48], ["Daniel", 12], ["Hosea", 14], ["Joel", 3], ["Amos", 9],
  ["Obadiah", 1], ["Jonah", 4], ["Micah", 7], ["Nahum", 3], ["Habakkuk", 3],
  ["Zephaniah", 3], ["Haggai", 2], ["Zechariah", 14], ["Malachi", 4], ["Matthew", 28],
  ["Mark", 16], ["Luke", 24], ["John", 21], ["Acts", 28], ["Romans", 16],
  ["1 Corinthians", 16], ["2 Corinthians", 13], ["Galatians", 6], ["Ephesians", 6], ["Philippians", 4],
  ["Colossians", 4], ["1 Thessalonians", 5], ["2 Thessalonians", 3], ["1 Timothy", 6], ["2 Timothy", 4],
  ["Titus", 3], ["Philemon", 1], ["Hebrews", 13], ["James", 5], ["1 Peter", 5],
  ["2 Peter", 3], ["1 John", 5], ["2 John", 1], ["3 John", 1], ["Jude", 1], ["Revelation", 22],
];

const slugOf = (book: string) => book.toLowerCase().trim().replace(/\s+/g, "-");
const OUT = join(process.cwd(), "public", "kjv");

async function fetchChapter(book: string, chapter: number) {
  const reference = `${book.toLowerCase().replace(/\s+/g, "+")}+${chapter}`;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(`https://bible-api.com/${reference}?translation=kjv`);
      if (response.status === 429) throw new Error("rate limited");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = (await response.json()) as { verses?: Array<{ verse: number; text: string }> };
      if (!data.verses?.length) throw new Error("no verses");
      return data.verses.map((v) => ({ number: v.verse, text: v.text.trim() }));
    } catch (error) {
      if (attempt === 4) throw error;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  throw new Error("unreachable");
}

async function main() {
  const jobs: Array<[string, number]> = [];
  for (const [book, count] of BOOKS) for (let c = 1; c <= count; c += 1) jobs.push([book, c]);
  let done = 0;
  let skipped = 0;
  const failures: string[] = [];
  const CONCURRENCY = 1;
  let cursor = 0;
  async function worker() {
    while (cursor < jobs.length) {
      const [book, chapter] = jobs[cursor++];
      const dir = join(OUT, slugOf(book));
      const file = join(dir, `${chapter}.json`);
      if (existsSync(file)) { skipped += 1; continue; }
      try {
        const verses = await fetchChapter(book, chapter);
        mkdirSync(dir, { recursive: true });
        writeFileSync(file, JSON.stringify(verses));
        done += 1;
        if (done % 50 === 0) console.log(`fetched ${done}, skipped ${skipped}, failures ${failures.length}`);
      } catch (error) {
        failures.push(`${book} ${chapter}: ${error instanceof Error ? error.message : String(error)}`);
      }
      await new Promise((r) => setTimeout(r, 2100)); // bible-api.com allows ~15 requests per 30s
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`DONE fetched=${done} skipped=${skipped} failures=${failures.length}`);
  for (const f of failures) console.log("FAIL", f);
  if (failures.length) process.exitCode = 1;
}

void main();
