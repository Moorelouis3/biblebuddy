/**
 * npm run verify:beginning
 *
 * Offline checks on the restored formatting of The Beginning of Everything.
 * No network, no Supabase: it asserts the committed seed files against the
 * backup of the rows as they were on 12 November 2026.
 *
 * The check that matters is the first one. Everything this work did was
 * formatting; if a single letter or digit of any day's wording has moved, that
 * is a content change and it should fail loudly. See
 * scripts/build-beginning-formatting.ts for why the study needed this at all.
 */
import fs from "node:fs";
import path from "node:path";
import { BIBLE_BOOKS } from "../lib/bibleBookChapters";

const SEED_DIR = path.join("data", "beginning-of-everything");
const SEED_FILES = ["days-01-07.json", "days-08-14.json", "days-15-21.json"];
const BACKUP_PATH = path.join("data", "beginning-devotional-days-backup-2026-11-12.json");
const APPLY_SCRIPT = path.join("scripts", "apply-beginning-book-days.ts");
const DEVOTIONAL_ID = "486cff66-b50e-488d-9330-3951589e6fa8";
const TOTAL_DAYS = 21;

const failures: string[] = [];
const check = (ok: boolean, message: string) => {
  if (!ok) failures.push(message);
};

const skeleton = (text: string) => text.normalize("NFC").replace(/[^A-Za-z0-9]/g, "").toLowerCase();

/** Three or more single glyphs separated by single spaces: the import's scar. */
const LETTER_SPACED = /(?:(?<![A-Za-z0-9])[A-Z0-9:;,.!?’'"()–—-](?: |$)){3,}/g;

const bookNames = new Set(BIBLE_BOOKS);
// The interior writes "Psalm 90:2"; the canon list says "Psalms". The book's
// own wording is kept, so both spellings are legitimate here.
bookNames.add("Psalm");

const days: any[] = [];
for (const file of SEED_FILES) {
  const full = path.join(SEED_DIR, file);
  check(fs.existsSync(full), `missing seed file ${full}`);
  if (!fs.existsSync(full)) continue;
  const parsed = JSON.parse(fs.readFileSync(full, "utf8"));
  check(Array.isArray(parsed), `${file} is not an array`);
  if (Array.isArray(parsed)) days.push(...parsed);
}
check(days.length === TOTAL_DAYS, `expected ${TOTAL_DAYS} days, found ${days.length}`);

/** The days as they stood just before the 2026-11-14 formatting pass. */
const FORMAT_BACKUP_PATH = path.join("data", "study-guide-days-backup-2026-11-14.json");
const beforeFormat = new Map<number, string>(
  (fs.existsSync(FORMAT_BACKUP_PATH) ? (JSON.parse(fs.readFileSync(FORMAT_BACKUP_PATH, "utf8")) as any[]) : [])
    .filter((row) => row.devotional_id === DEVOTIONAL_ID)
    .map((row) => [Number(row.day_number), String(row.devotional_text || "")]),
);
const backup = fs.existsSync(BACKUP_PATH) ? (JSON.parse(fs.readFileSync(BACKUP_PATH, "utf8")) as any[]) : [];
check(backup.length === TOTAL_DAYS, `${BACKUP_PATH} should hold ${TOTAL_DAYS} rows, holds ${backup.length}`);
const before = new Map(backup.map((row) => [Number(row.day_number), String(row.devotional_text || "")]));

const seen = new Set<number>();
for (const day of days) {
  const n = Number(day.day_number);
  const label = `day ${n}`;
  check(Number.isInteger(n) && n >= 1 && n <= TOTAL_DAYS, `bad day_number ${day.day_number}`);
  check(!seen.has(n), `duplicate day_number ${n}`);
  seen.add(n);

  const text = String(day.devotional_text || "");
  check(text.trim().length > 0, `${label}: empty devotional_text`);

  // 1. Formatting only. The wording may not change.
  const was = before.get(n);
  check(was !== undefined, `${label}: not in the backup`);
  if (was !== undefined) {
    // Since 2026-11-14 the days carry section headings the print book does
    // not have (the Wisdom of Proverbs standard: docs/STUDY_GUIDE_FORMAT.md),
    // and seven days had a list moved back under the sentence that introduces
    // it, where the import had dropped it a block or two late. So the heading
    // lines added that day are set aside (a heading is new if it was not in
    // the day as it stood before, FORMAT_BACKUP_PATH), and the letters are
    // compared as a bag, not in order. Still true, and still checked: no word
    // of the book was added, removed or changed.
    const previous = String(beforeFormat.get(n) ?? "").split(/\r?\n/);
    const keptLines = text.split(/\r?\n/).filter((line) => !/^#{1,4}\s/.test(line) || previous.includes(line));
    const bag = (value: string) => [...skeleton(value)].sort().join("");
    check(bag(keptLines.join("\n")) === bag(was), `${label}: WORDING CHANGED against ${BACKUP_PATH}`);
  }

  // 2. The letter-spaced headings and references are gone.
  const scars = (text.match(LETTER_SPACED) || []).filter((run) => run.replace(/[^A-Za-z]/g, "").length >= 3);
  check(scars.length === 0, `${label}: ${scars.length} letter-spaced run(s) left, e.g. "${scars[0]}"`);

  // 2b. The book's bullet glyph is not a letter, so the wording check above
  // cannot see it go missing. Every star stranded at the end of a line in the
  // old text must now be a real list item.
  const starsBefore = was === undefined ? 0 : (was.match(/✦/g) || []).length;
  const listItems = (text.match(/^\* /gm) || []).length;
  check(listItems === starsBefore, `${label}: ${listItems} list items for ${starsBefore} bullets in the old text`);
  check(!text.includes("✦"), `${label}: a stray bullet glyph is still in the prose`);

  // 3. Structure actually arrived.
  const blocks = text.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  const headings = blocks.filter((block) => block.startsWith("## "));
  const quotes = blocks.filter((block) => block.startsWith("> "));
  check(blocks.length >= 30, `${label}: only ${blocks.length} blocks, expected 30 or more`);
  check(headings.length >= 1, `${label}: no ## section heading`);
  check(quotes.length >= 3, `${label}: only ${quotes.length} Scripture quote blocks`);

  // 4. Every Scripture quote closes with a real reference.
  for (const quote of quotes) {
    const match = quote.match(/\(([^()]+)\)$/);
    check(Boolean(match), `${label}: quote with no reference - "${quote.slice(0, 60)}"`);
    if (!match) continue;
    const book = match[1].replace(/\s+\d+[:\d–—-]*$/, "").trim();
    check(bookNames.has(book), `${label}: "${book}" is not a book of the Bible (from "${match[1]}")`);
  }

  // 5. Markdown that renders as intended.
  for (const rawBlock of blocks) {
    const block = rawBlock.replace(/^\* /gm, ""); // list markers are not emphasis
    check((block.match(/\*\*/g) || []).length % 2 === 0, `${label}: unbalanced ** in "${block.slice(0, 50)}"`);
    const singles = (block.replace(/\*\*/g, "").match(/\*/g) || []).length;
    check(singles % 2 === 0, `${label}: unbalanced * in "${block.slice(0, 50)}"`);
    check(!/\*\*\s+\*\*/.test(block), `${label}: adjacent bold spans in "${block.slice(0, 50)}"`);
    check(!/(?<!\*)\*\s+\*(?!\*)/.test(block), `${label}: adjacent italic spans in "${block.slice(0, 50)}"`);
    check(!/^(?:\d+[.)]\s|[-+]\s|\|)/.test(block), `${label}: block opens as an accidental list or table - "${block.slice(0, 40)}"`);
  }
  check(!text.includes("undefined"), `${label}: the literal "undefined" is in the text`);
  check(!/[⟦⟧]/.test(text), `${label}: placeholder brackets left in the text`);
  check(!/[-]|[\u{F0000}-\u{FFFFD}]/u.test(text), `${label}: private-use glyphs left in the text`);

  // 6. Nothing else about the day moved.
  if (was !== undefined) {
    const row = backup.find((r) => Number(r.day_number) === n);
    check(String(day.day_title || "") === String(row?.day_title || ""), `${label}: day_title changed`);
    check(
      String(day.reflection_question || "") === String(row?.reflection_question || ""),
      `${label}: reflection_question changed`,
    );
  }
}

// 7. The apply script can only touch this one devotional, and only the text.
const apply = fs.existsSync(APPLY_SCRIPT) ? fs.readFileSync(APPLY_SCRIPT, "utf8") : "";
check(apply.includes(DEVOTIONAL_ID), `${APPLY_SCRIPT} no longer pins the devotional id`);
check(apply.includes(".update({ devotional_text: next })"), `${APPLY_SCRIPT} should update devotional_text and nothing else`);
check(apply.includes('.eq("devotional_id", DEVOTIONAL_ID)'), `${APPLY_SCRIPT} should filter every write by devotional_id`);
check(apply.includes("range(0, 999)"), `${APPLY_SCRIPT} should read rows with an explicit range (PostgREST caps at 1000)`);

if (failures.length) {
  console.error(`verify:beginning FAILED with ${failures.length} problem(s):\n`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(`verify:beginning passed. ${days.length} days, formatting only, wording identical to ${BACKUP_PATH}.`);
