/**
 * Bible Trivia question store builder (2026-11-23).
 *
 *   npx tsx scripts/trivia-import-old.ts            bring the old Bible Trivia questions over, then rebuild
 *   npx tsx scripts/trivia-import-old.ts --index    only rebuild the index and loaders (after adding questions)
 *
 * The old Bible Trivia game (lib/triviaGameData.ts: 5 questions for every one
 * of the 1,189 chapters) was replaced by the Bible Clue game, renamed Bible
 * Trivia. This copies its questions into the new game's store,
 * lib/clueGame/bank/books/<slug>.json, as Easy ("beginner") questions with ids
 * old-<slug>-<chapter>-<n>. Re-running replaces only those old-* questions;
 * every other question in a book file (the hand-checked ones a writer adds
 * toward 15 Easy / 15 Medium / 15 Hard per chapter) is kept as it is.
 *
 * Then it rebuilds:
 *   books/index.json  questions per book, chapter and level, Genesis TS included
 *   loaders.ts        one dynamic import per book file (the browser loads a book when picked)
 *   all.ts            every book file registered (the server: rooms and challenges)
 *
 * A new question in a book file needs: a unique id, chapter, level
 * (beginner|medium|hard), category (person|place|keyword), question, four
 * different choices, answer (0-3), a one-sentence explanation, and ref
 * ("Book c:v" or "Book c:v–v") inside that chapter.
 */

import fs from "node:fs";
import path from "node:path";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "../lib/triviaCatalog";
import { getTriviaBook } from "../lib/triviaGameData";
import { CLUE_DECKS } from "../lib/clueGame/catalog";
import { BANK_FILES } from "../lib/clueGame/bank/files";
import { ref } from "../lib/clueGame/ref";
import type { ClueCategory, ClueLevel } from "../lib/clueGame/types";

type Stored = {
  id: string;
  chapter: number;
  level: ClueLevel;
  category: ClueCategory;
  question: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
  ref: string;
  cardId?: string;
};

const ROOT = path.resolve(__dirname, "..");
const BANK = path.join(ROOT, "lib/clueGame/bank");
const BOOKS = path.join(BANK, "books");
const LEVELS: ClueLevel[] = ["beginner", "medium", "hard"];
const indexOnly = process.argv.includes("--index");

const slugOf = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const readBook = (slug: string): Stored[] => {
  const f = path.join(BOOKS, `${slug}.json`);
  return fs.existsSync(f) ? (JSON.parse(fs.readFileSync(f, "utf8")) as Stored[]) : [];
};
const writeBook = (slug: string, list: Stored[]) => {
  list.sort((a, b) => a.chapter - b.chapter || LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level) || a.id.localeCompare(b.id, "en", { numeric: true }));
  fs.writeFileSync(path.join(BOOKS, `${slug}.json`), JSON.stringify(list, null, 1) + "\n");
};

/** "Genesis 2:8, 15" → "Genesis 2:8"; "Genesis 5" → "Genesis 5:1"; "Numbers 24:10-11,25" → "Numbers 24:10–11". */
function cleanRef(verse: string, book: string, chapter: number, oneChapter: boolean): string | null {
  let v = String(verse || "").trim().split(/[,;]/)[0].trim();
  // "Obadiah 3" in a one-chapter book is verse 3; elsewhere "Genesis 5" is the chapter.
  const bare = /^.+?\s+(\d+)$/.exec(v);
  if (bare) v = oneChapter ? `${book} 1:${bare[1]}` : `${v}:1`;
  v = v.replace(/\s*[-–—]\s*/g, "–");
  // The game's book name ("Psalm 23:1" → "Psalms 23:1"), so the verse sheet can open it.
  v = v.replace(/^.+?(?=\s+\d+:)/, book);
  try {
    ref(v);
    return v;
  } catch {
    try {
      const fallback = `${book} ${chapter}:1`;
      ref(fallback);
      return fallback;
    } catch {
      return null;
    }
  }
}

function category(q: string): ClueCategory {
  if (/^\s*(who|whom|whose)\b/i.test(q)) return "person";
  if (/^\s*where\b/i.test(q) || /\b(what|which) (city|town|place|land|mountain|river|country|valley|sea|region|wilderness)\b/i.test(q)) return "place";
  return "keyword";
}

const problems: string[] = [];
const order = new Map(CLUE_DECKS.map((d, i) => [d.id, { i, name: d.name }]));

if (!indexOnly) {
  fs.mkdirSync(BOOKS, { recursive: true });
  // Answers already in the hand-written Genesis questions, per chapter: an old
  // question asking the same thing is left out.
  const genesisAnswers = new Map<number, Set<string>>();
  for (const q of BANK_FILES.flat()) {
    if (!genesisAnswers.has(q.chapter)) genesisAnswers.set(q.chapter, new Set());
    genesisAnswers.get(q.chapter)!.add(norm(q.choices[q.answer]));
  }
  let total = 0;
  let skipped = 0;
  for (const cfg of CHAPTER_BASED_TRIVIA_BOOK_CONFIG) {
    const book = getTriviaBook(cfg.key);
    if (!book) {
      problems.push(`${cfg.title}: no old trivia`);
      continue;
    }
    // The old catalog calls it "Song of Songs"; the game's deck is song-of-solomon.
    const slug = cfg.title === "Song of Songs" ? "song-of-solomon" : slugOf(cfg.title);
    if (!order.has(slug)) problems.push(`${cfg.title}: "${slug}" is not a deck id`);
    const kept = readBook(slug).filter((q) => !q.id.startsWith("old-"));
    const fresh: Stored[] = [];
    for (const pack of book.chapters) {
      pack.questions.forEach((q, n) => {
        const choices = q.options.map((o) => o.text.trim()) as [string, string, string, string];
        const answer = q.options.findIndex((o) => o.label === q.correctAnswer) as 0 | 1 | 2 | 3;
        const id = `old-${slug}-${pack.chapter}-${n + 1}`;
        if (choices.length !== 4 || new Set(choices.map(norm)).size !== 4 || answer < 0) {
          problems.push(`${id}: choices not four different ones`);
          return;
        }
        if (slug === "genesis" && genesisAnswers.get(pack.chapter)?.has(norm(choices[answer]))) {
          skipped += 1;
          return;
        }
        const r = cleanRef(q.verse, order.get(slug)?.name ?? cfg.title, pack.chapter, cfg.chapters === 1);
        if (!r) {
          problems.push(`${id}: reference "${q.verse}" unusable`);
          return;
        }
        fresh.push({
          id,
          chapter: pack.chapter,
          level: "beginner",
          category: category(q.question),
          question: q.question.trim(),
          choices,
          answer,
          explanation: (q.explanation || "").trim(),
          ref: r,
        });
      });
    }
    total += fresh.length;
    writeBook(slug, [...kept, ...fresh]);
  }
  console.log(`Imported ${total} old questions (${skipped} Genesis ones left out as repeats of the hand-written bank).`);
}

/* ---------- index, loaders, server registry ---------- */

const files = fs.readdirSync(BOOKS).filter((f) => f.endsWith(".json") && f !== "index.json").map((f) => f.replace(/\.json$/, ""));
const index: Record<string, { name: string; order: number; chapters: Record<string, [number, number, number]> }> = {};
const add = (slug: string, chapter: number, level: ClueLevel) => {
  const meta = order.get(slug);
  index[slug] ??= { name: meta?.name ?? slug, order: meta?.i ?? 999, chapters: {} };
  const c = (index[slug].chapters[chapter] ??= [0, 0, 0]);
  c[LEVELS.indexOf(level)] += 1;
};
for (const q of BANK_FILES.flat()) add(q.book, q.chapter, q.level);
const ids = new Set(BANK_FILES.flat().map((q) => q.id));
for (const slug of files) {
  for (const q of readBook(slug)) {
    if (ids.has(q.id)) problems.push(`${slug}: id ${q.id} used twice`);
    ids.add(q.id);
    if (!LEVELS.includes(q.level)) problems.push(`${q.id}: level ${q.level}`);
    add(slug, q.chapter, q.level);
  }
}
fs.writeFileSync(path.join(BOOKS, "index.json"), JSON.stringify(index) + "\n");

const sorted = files.sort((a, b) => (order.get(a)?.i ?? 999) - (order.get(b)?.i ?? 999));
const ident = (slug: string) => "b_" + slug.replace(/-/g, "_");
fs.writeFileSync(
  path.join(BANK, "loaders.ts"),
  `// Generated by scripts/trivia-import-old.ts. Do not edit by hand.\n// One dynamic import per book: the browser loads a book's questions when it is picked.\n\n` +
    `export const BOOK_LOADERS: Record<string, () => Promise<{ default: unknown }>> = {\n` +
    sorted.map((s) => `  "${s}": () => import("./books/${s}.json"),\n`).join("") +
    `};\n`,
);
fs.writeFileSync(
  path.join(BANK, "all.ts"),
  `// Generated by scripts/trivia-import-old.ts. Do not edit by hand.\n// Every book's questions in the registry, for the server (rooms, challenges).\n\n` +
    `import { registerStored, type StoredQuestion } from "./index";\n` +
    sorted.map((s) => `import ${ident(s)} from "./books/${s}.json";\n`).join("") +
    `\n` +
    sorted.map((s) => `registerStored("${s}", ${ident(s)} as unknown as StoredQuestion[]);\n`).join("") +
    `\nexport const ALL_BOOKS_LOADED = true;\n`,
);

const totals = Object.values(index).reduce(
  (t, b) => {
    for (const c of Object.values(b.chapters)) c.forEach((n, i) => (t[i] += n));
    return t;
  },
  [0, 0, 0],
);
console.log(`Index: ${Object.keys(index).length} books, Easy ${totals[0]}, Medium ${totals[1]}, Hard ${totals[2]}.`);
if (problems.length) console.log(`Problems (${problems.length}):\n  ` + problems.slice(0, 60).join("\n  "));
