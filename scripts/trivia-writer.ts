/**
 * Helper for the Bible Trivia question writer (docs/TRIVIA_QUESTION_WRITER_AGENT.md).
 *
 *   npx tsx scripts/trivia-writer.ts next [n]               the next n chapters (Bible order, Genesis 1 first)
 *                                                           that still lack 15 Easy / 15 Medium / 15 Hard
 *   npx tsx scripts/trivia-writer.ts check <book> <chapter> that chapter passes: 15+ per level, every
 *                                                           question sound, its verse real and in the chapter
 *   npx tsx scripts/trivia-writer.ts show <book> <chapter>  every question the chapter has now, by level
 *
 * Run `npx tsx scripts/trivia-import-old.ts --index` after editing a book file,
 * before `check`: the index is what the game's setup screen counts from.
 */

import fs from "node:fs";
import path from "node:path";
import { BOOK_INDEX, bookItems, booksWithQuestions } from "../lib/clueGame/bank";
import "../lib/clueGame/bank/all";
import { kjvStaticUrl } from "../lib/chapterStaticData";

import { targetFor } from "./trivia-target";

const LEVELS = ["beginner", "medium", "hard"] as const;
const LABEL = { beginner: "Easy", medium: "Medium", hard: "Hard" } as const;
const ROOT = path.resolve(__dirname, "..");
const [cmd, a, b] = process.argv.slice(2);

function need(book: string, ch: number) {
  const have = BOOK_INDEX[book]?.chapters?.[ch] ?? [0, 0, 0];
  const target = targetFor(book, ch);
  return have.map((n) => Math.max(0, target - n));
}

if (cmd === "next") {
  const wanted = Math.max(1, Number(a) || 1);
  const out: string[] = [];
  for (const { id, name } of booksWithQuestions()) {
    const chapters = Object.keys(BOOK_INDEX[id].chapters).map(Number).sort((x, y) => x - y);
    for (const ch of chapters) {
      const n = need(id, ch);
      if (n.some((x) => x > 0)) {
        const have = BOOK_INDEX[id].chapters[ch];
        out.push(`${id} ${ch}   (${name} ${ch}, target ${targetFor(id, ch)} per level: have Easy ${have[0]}, Medium ${have[1]}, Hard ${have[2]}; write Easy ${n[0]}, Medium ${n[1]}, Hard ${n[2]})`);
        if (out.length >= wanted) break;
      }
    }
    if (out.length >= wanted) break;
  }
  console.log(out.length ? out.join("\n") : "ALL DONE: every chapter has its Easy, Medium and Hard questions.");
} else if (cmd === "show") {
  const ch = Number(b);
  for (const lv of LEVELS) {
    const qs = bookItems(a).filter((q) => q.chapter === ch && q.level === lv);
    console.log(`\n== ${LABEL[lv]} (${qs.length}) ==`);
    for (const q of qs) console.log(`${q.id} [${q.ref.label}] ${q.question}  -> ${q.choices[q.answer]}  | ${q.choices.join(" / ")}`);
  }
} else if (cmd === "check") {
  const ch = Number(b);
  const problems: string[] = [];
  const index = BOOK_INDEX[a]?.chapters?.[ch];
  if (!index) problems.push(`${a} ${ch}: not in the index (run trivia-import-old.ts --index)`);
  const qs = bookItems(a).filter((q) => q.chapter === ch);
  LEVELS.forEach((lv, i) => {
    const n = qs.filter((q) => q.level === lv).length;
    const target = targetFor(a, ch);
    if (n < target) problems.push(`${LABEL[lv]}: ${n} questions, needs ${target}`);
    if (index && index[i] !== n) problems.push(`${LABEL[lv]}: the index says ${index[i]} but the files have ${n} (run --index)`);
  });
  const seenQ = new Set<string>();
  for (const q of qs) {
    const isNew = !q.id.startsWith("old-") && !/^gen\d+-[bm]-\d+$/.test(q.id);
    const where = `${q.id}`;
    if (new Set(q.choices.map((c) => c.trim().toLowerCase())).size !== 4) problems.push(`${where}: the four choices are not all different`);
    if (!(q.answer >= 0 && q.answer <= 3)) problems.push(`${where}: answer must be 0-3`);
    if (!q.explanation.trim()) problems.push(`${where}: no explanation`);
    if (q.ref.chapter !== ch) problems.push(`${where}: verse ${q.ref.label} is not in chapter ${ch}`);
    const file = path.join(ROOT, "public", kjvStaticUrl(q.ref.book, q.ref.chapter));
    if (!fs.existsSync(file)) problems.push(`${where}: no KJV file for ${q.ref.label}`);
    else {
      const verses = (JSON.parse(fs.readFileSync(file, "utf8")) as Array<{ number: number }>).map((v) => v.number);
      if (!verses.includes(q.ref.verseStart) || !verses.includes(q.ref.verseEnd)) problems.push(`${where}: ${q.ref.label} does not exist`);
    }
    const key = q.question.trim().toLowerCase();
    if (seenQ.has(key)) problems.push(`${where}: the same question twice in this chapter`);
    seenQ.add(key);
    if (isNew) {
      if (q.question.length > 130) problems.push(`${where}: question is ${q.question.length} characters; keep it under 130 (read on a phone in 10 seconds)`);
      if (q.choices.some((c) => c.length > 60)) problems.push(`${where}: a choice is over 60 characters`);
      if (q.choices.some((c) => /\b(all|none) of the above\b/i.test(c))) problems.push(`${where}: no "all/none of the above"`);
      if (q.explanation.length > 260) problems.push(`${where}: explanation over 260 characters; one plain sentence`);
    }
  }
  if (problems.length) {
    console.log(`FAIL ${a} ${ch}\n  ` + problems.join("\n  "));
    process.exit(1);
  }
  const counts = LEVELS.map((lv) => qs.filter((q) => q.level === lv).length);
  console.log(`ok ${a} ${ch}: Easy ${counts[0]}, Medium ${counts[1]}, Hard ${counts[2]}`);
} else {
  console.log("usage: next [n] | check <book> <chapter> | show <book> <chapter>");
  process.exit(1);
}
