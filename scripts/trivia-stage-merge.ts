/**
 * Merge staged Bible Trivia questions into the book files (2026-11-25).
 *
 *   npx tsx scripts/trivia-stage-merge.ts <dir> --dry    check every staged chapter, change nothing
 *   npx tsx scripts/trivia-stage-merge.ts <dir>          check, then write the passing ones into
 *                                                        lib/clueGame/bank/books/<book>.json
 *
 * When several writers work at once, each writes one file per chapter into a
 * staging folder instead of editing a book file:
 *
 *   <dir>/<book>-<chapter>.json   { "remove": ["old-…", …], "add": [ { …question… }, … ] }
 *
 * "remove" drops weak existing questions of that chapter (only ids in the book
 * file, never the hand-written Genesis .ts ones); "add" uses the format in
 * docs/TRIVIA_QUESTION_WRITER_AGENT.md. After merging, run
 * `npx tsx scripts/trivia-import-old.ts --index` and
 * `npx tsx scripts/trivia-writer.ts check <book> <chapter>`.
 */

import fs from "node:fs";
import path from "node:path";
import { ref } from "../lib/clueGame/ref";
import { kjvStaticUrl } from "../lib/chapterStaticData";
import { BANK_FILES } from "../lib/clueGame/bank/files";

type Q = {
  id: string;
  chapter: number;
  level: "beginner" | "medium" | "hard";
  category: "person" | "place" | "keyword";
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  ref: string;
  cardId?: string;
};

const ROOT = path.resolve(__dirname, "..");
const BOOKS = path.join(ROOT, "lib/clueGame/bank/books");
const [dir, flag] = process.argv.slice(2);
const dry = flag === "--dry";
const LEVELS = ["beginner", "medium", "hard"] as const;
import { targetFor } from "./trivia-target";

const allIds = new Set<string>(BANK_FILES.flat().map((q) => q.id));
for (const f of fs.readdirSync(BOOKS)) if (f.endsWith(".json") && f !== "index.json") for (const q of JSON.parse(fs.readFileSync(path.join(BOOKS, f), "utf8")) as Q[]) allIds.add(q.id);

let failed = 0;
let merged = 0;
const files = fs.readdirSync(dir).filter((f) => /^[a-z0-9-]+-\d+\.json$/.test(f)).sort();
for (const f of files) {
  const m = /^(.+)-(\d+)\.json$/.exec(f)!;
  const book = m[1];
  const ch = Number(m[2]);
  const problems: string[] = [];
  let staged: { remove?: string[]; add?: Q[] };
  try {
    staged = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  } catch (e) {
    console.log(`FAIL ${f}: not valid JSON (${(e as Error).message})`);
    failed += 1;
    continue;
  }
  const bookFile = path.join(BOOKS, `${book}.json`);
  if (!fs.existsSync(bookFile)) {
    console.log(`FAIL ${f}: no book file ${book}.json`);
    failed += 1;
    continue;
  }
  const current = JSON.parse(fs.readFileSync(bookFile, "utf8")) as Q[];
  const remove = new Set(staged.remove || []);
  for (const id of remove) if (!current.some((q) => q.id === id && q.chapter === ch)) problems.push(`remove ${id}: not a question of ${book} ${ch} in ${book}.json`);
  const add = staged.add || [];
  const kjvFile = (label: string) => {
    const r = ref(label);
    return { r, file: path.join(ROOT, "public", kjvStaticUrl(r.book, r.chapter)) };
  };
  const seen = new Set<string>();
  for (const q of add) {
    const w = q.id || "(no id)";
    if (!q.id || allIds.has(q.id) || seen.has(q.id)) problems.push(`${w}: id missing or already used`);
    seen.add(q.id);
    if (q.chapter !== ch) problems.push(`${w}: chapter ${q.chapter}, file is chapter ${ch}`);
    if (!LEVELS.includes(q.level)) problems.push(`${w}: level must be beginner, medium or hard`);
    if (!["person", "place", "keyword"].includes(q.category)) problems.push(`${w}: category`);
    if (!Array.isArray(q.choices) || q.choices.length !== 4 || new Set(q.choices.map((c) => String(c).trim().toLowerCase())).size !== 4) problems.push(`${w}: four different choices`);
    if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3)) problems.push(`${w}: answer 0-3`);
    if (!q.question || q.question.length > 130) problems.push(`${w}: question missing or over 130 characters`);
    if ((q.choices || []).some((c) => String(c).length > 60)) problems.push(`${w}: a choice over 60 characters`);
    if ((q.choices || []).some((c) => /\b(all|none) of the above\b/i.test(String(c)))) problems.push(`${w}: no all/none of the above`);
    if (!q.explanation || q.explanation.length > 260) problems.push(`${w}: explanation missing or over 260 characters`);
    try {
      const { r, file } = kjvFile(q.ref);
      if (r.chapter !== ch) problems.push(`${w}: ref ${q.ref} is not in chapter ${ch}`);
      if (!fs.existsSync(file)) problems.push(`${w}: no KJV file for ${q.ref}`);
      else {
        const verses = (JSON.parse(fs.readFileSync(file, "utf8")) as Array<{ number: number }>).map((v) => v.number);
        if (!verses.includes(r.verseStart) || !verses.includes(r.verseEnd)) problems.push(`${w}: ${q.ref} does not exist`);
      }
    } catch {
      problems.push(`${w}: ref "${q.ref}" is not "Book c:v" or "Book c:v–v"`);
    }
  }
  const after = [...current.filter((q) => !(q.chapter === ch && remove.has(q.id))), ...add];
  const gen = book === "genesis" ? BANK_FILES.flat().filter((q) => q.chapter === ch) : [];
  const texts = new Set<string>();
  for (const q of [...after.filter((q) => q.chapter === ch), ...gen]) {
    const k = q.question.trim().toLowerCase();
    if (texts.has(k)) problems.push(`the question "${q.question}" is in ${book} ${ch} twice`);
    texts.add(k);
  }
  LEVELS.forEach((lv) => {
    const n = after.filter((q) => q.chapter === ch && q.level === lv).length + gen.filter((q) => q.level === lv).length;
    const target = targetFor(book, ch);
    if (n < target) problems.push(`${lv}: ${n} after merging, needs ${target}`);
  });
  if (problems.length) {
    failed += 1;
    console.log(`FAIL ${f}\n  ` + problems.slice(0, 25).join("\n  "));
    continue;
  }
  for (const q of add) allIds.add(q.id);
  if (!dry) {
    fs.writeFileSync(bookFile, JSON.stringify(after, null, 1) + "\n");
    merged += 1;
  }
  console.log(`ok ${f}: +${add.length}, -${remove.size}`);
}
console.log(dry ? `checked ${files.length}, ${failed} failing` : `merged ${merged}, ${failed} failing`);
process.exit(failed ? 1 : 0);
