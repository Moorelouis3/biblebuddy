/**
 * Fills the cover briefs for days the uploader has no wording for.
 *
 * Every Bible in One Year video takes its YouTube title and reading from
 * data/bible-year-cover-briefs.json. The file stopped at day 279, so the 74
 * finished renders for days 280 onward were refused at upload with "no cover
 * brief to build the wording from" (Louis, 2026-10-10: "the audio is made!!!
 * for them").
 *
 * Nothing is invented and no model is called. Each day's script already holds
 * the title Louis approved and the passages it reads, so the brief is taken
 * from the script the video was narrated from - which also guarantees the
 * YouTube title matches what the viewer actually hears.
 *
 *   npx tsx scripts/fill-bible-year-briefs.ts --from=280 --to=365
 *   npx tsx scripts/fill-bible-year-briefs.ts --dry-run
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";

const arg = (name: string, fallback?: string) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
};
const FROM = Number(arg("from", "280"));
const TO = Number(arg("to", "365"));
const DRY = process.argv.includes("--dry-run");

const REPO = process.cwd();
const WIRING = join(REPO, "scripts", "render-bible-year-day.ts");
const BRIEFS = join(REPO, "data", "bible-year-cover-briefs.json");

/** The script module a day is wired to, found the same way the renderer finds it. */
function scriptPathFor(day: number): string | null {
  const src = readFileSync(WIRING, "utf8").split(/\r?\n/);
  const row = src.find((l) => l.trim().startsWith(`${day}: `));
  if (!row) return null;
  const name = row.trim().slice(String(day).length + 2).replace(/,$/, "").trim();
  const imp = src.find((l) => l.startsWith("import") && l.includes(`{ ${name} }`));
  const rel = imp && imp.match(/from "([^"]+)"/);
  if (!rel) return null;
  return `${join(dirname(WIRING), rel[1])}.ts`;
}

/**
 * The reading, as a human would write it: "Matthew 18-20", "Malachi 4; Matthew 1-2".
 *
 * Built from the chapters the script actually quotes, grouped by book in the
 * order they appear, so a day spanning two books reads as two parts.
 */
function readingFrom(src: string): string {
  const order: string[] = [];
  const chapters = new Map<string, Set<number>>();
  const add = (book: string, chapter: number) => {
    const name = book.trim().replace(/\s+/g, " ");
    if (!chapters.has(name)) { chapters.set(name, new Set()); order.push(name); }
    chapters.get(name)!.add(chapter);
  };

  // Shape one: the chapter is written into the template, one helper per
  // chapter - `Matthew 18:${startVerse}-${endVerse}`.
  for (const m of src.matchAll(/reference:\s*[`"']([^`"']+)[`"']/g)) {
    const hit = /^([1-3]?\s*[A-Za-z ]+?)\s+(\d{1,3})\s*:/.exec(m[1]);
    if (hit) add(hit[1], Number(hit[2]));
  }

  // Shape two: one helper for the whole day with the chapter as an argument -
  // `Luke ${chapter}:${startVerse}-${endVerse}` called as g(1, 1, 25, [...]).
  // The chapters only exist at the call sites, so they are read from there.
  if (!order.length) {
    const generic = /const\s+(\w+)\s*=\s*\(\s*chapter\s*:/.exec(src);
    const bookName = /book:\s*"([^"]+)"/.exec(src);
    if (generic && bookName) {
      const fn = generic[1];
      const book = bookName[1].replace(/\b\w/g, (c) => c.toUpperCase());
      for (const call of src.matchAll(new RegExp(`\\b${fn}\\(\\s*(\\d{1,3})\\s*,`, 'g'))) {
        add(book, Number(call[1]));
      }
    }
  }
  const parts: string[] = [];
  for (const book of order) {
    const nums = [...chapters.get(book)!].sort((a, b) => a - b);
    const runs: string[] = [];
    let start: number | null = null;
    let prev: number | null = null;
    for (const n of nums) {
      if (start === null) { start = n; prev = n; continue; }
      if (n === prev! + 1) { prev = n; continue; }
      runs.push(start === prev ? `${start}` : `${start}-${prev}`);
      start = n; prev = n;
    }
    if (start !== null) runs.push(start === prev ? `${start}` : `${start}-${prev}`);
    parts.push(`${book} ${runs.join(", ")}`);
  }
  return parts.join("; ");
}

const file = JSON.parse(readFileSync(BRIEFS, "utf8"));
file.days = file.days || {};

const added: number[] = [];
const skipped: { day: number; why: string }[] = [];
for (let day = FROM; day <= TO; day++) {
  if (file.days[day]) continue;
  const path = scriptPathFor(day);
  if (!path) { skipped.push({ day, why: "no script wired" }); continue; }
  let src: string;
  try { src = readFileSync(path, "utf8"); } catch { skipped.push({ day, why: "script file missing" }); continue; }
  const title = (src.match(/\btitle:\s*"([^"]+)"/) || [])[1];
  if (!title) { skipped.push({ day, why: "script has no title" }); continue; }
  const reference = readingFrom(src);
  if (!reference) { skipped.push({ day, why: "could not read the passages" }); continue; }
  file.days[day] = {
    dayNumber: day,
    title,
    reference,
    brief: `Read ${reference}: ${title}.`,
    source: "script",
  };
  added.push(day);
}

console.log(`added ${added.length} brief(s)`);
if (added.length) {
  const show = added.slice(0, 5);
  for (const d of show) console.log(`  day ${d}: ${file.days[d].title} — ${file.days[d].reference}`);
}
if (skipped.length) {
  console.log(`skipped ${skipped.length}:`);
  for (const s of skipped.slice(0, 10)) console.log(`  day ${s.day}: ${s.why}`);
}
if (DRY) { console.log("dry run — nothing written"); process.exit(0); }
if (added.length) writeFileSync(BRIEFS, `${JSON.stringify(file, null, 2)}\n`);
console.log(DRY ? "" : "briefs written");
