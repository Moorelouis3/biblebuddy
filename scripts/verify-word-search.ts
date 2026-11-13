/**
 * Bible Word Search: every word list and every generated grid, checked offline.
 *
 *   npm run verify:word-search
 *
 * No database and no network. The word lists are held against the King James
 * text in public/kjv, and the generator is run across many seeds for all 66
 * books. Data problems are collected and printed together, so one run shows
 * everything that needs fixing.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { BIBLE_BOOKS, getBookTotalChapters } from "../lib/bibleBookChapters";
import { WORD_SEARCH_BOOKS, getWordSearchBook } from "../lib/wordSearchData";
import {
  GRID_SIZE,
  cellsBetween,
  countOccurrences,
  generatePuzzle,
  isValidPuzzle,
  matchSelection,
  normalizeLetters,
  placementCells,
  snapEnd,
} from "../lib/wordSearchGame";

let passed = 0;
function check(label: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`ok ${label}`);
}

const root = path.resolve(__dirname, "..");
const chapterCache = new Map<string, Array<{ number: number; text: string }> | null>();
function kjv(slug: string, chapter: number) {
  const key = `${slug}/${chapter}`;
  if (!chapterCache.has(key)) {
    const file = path.join(root, "public", "kjv", slug, `${chapter}.json`);
    chapterCache.set(key, fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null);
  }
  return chapterCache.get(key) ?? null;
}

// Books too short to carry eight meaningful words. Everything else must.
const SHORT_BOOKS = new Set(["Obadiah", "Philemon", "2 John", "3 John", "Jude", "Haggai", "Lamentations", "Ruth", "Nahum", "2 Thessalonians"]);

check("all 66 books have a list, in canonical order", () => {
  assert.equal(WORD_SEARCH_BOOKS.length, 66);
  assert.deepEqual(WORD_SEARCH_BOOKS.map((entry) => entry.book), BIBLE_BOOKS);
  assert.equal(new Set(WORD_SEARCH_BOOKS.map((entry) => entry.slug)).size, 66);
  for (const entry of WORD_SEARCH_BOOKS) assert.equal(getWordSearchBook(entry.slug)?.book, entry.book);
  assert.equal(getWordSearchBook("song-of-solomon")?.book, "Song of Solomon");
  assert.equal(getWordSearchBook("nope"), null);
});

check("every list is the right size and every word fits the grid", () => {
  const problems: string[] = [];
  for (const entry of WORD_SEARCH_BOOKS) {
    const min = SHORT_BOOKS.has(entry.book) ? 5 : 8;
    if (entry.words.length < min || entry.words.length > 12) problems.push(`${entry.book}: ${entry.words.length} words`);
    const seen = new Set<string>();
    for (const word of entry.words) {
      if (word.letters !== normalizeLetters(word.label)) problems.push(`${entry.book} ${word.label}: letters mismatch`);
      if (word.letters.length < 3 || word.letters.length > GRID_SIZE) problems.push(`${entry.book} ${word.label}: ${word.letters.length} letters`);
      if (seen.has(word.letters)) problems.push(`${entry.book} ${word.label}: listed twice`);
      seen.add(word.letters);
      if (!word.explanation.trim() || word.explanation.length > 95) problems.push(`${entry.book} ${word.label}: explanation length ${word.explanation.length}`);
      if (!/[.?!'"]$/.test(word.explanation.trim())) problems.push(`${entry.book} ${word.label}: explanation has no closing punctuation`);
    }
  }
  assert.deepEqual(problems, []);
});

check("no word hides inside another word of the same book, forwards or backwards", () => {
  const problems: string[] = [];
  for (const entry of WORD_SEARCH_BOOKS) {
    for (const a of entry.words) {
      const reversed = a.letters.split("").reverse().join("");
      for (const b of entry.words) {
        if (a === b) continue;
        if (b.letters.includes(a.letters) || b.letters.includes(reversed)) problems.push(`${entry.book}: ${a.label} is inside ${b.label}`);
      }
    }
  }
  assert.deepEqual(problems, []);
});

check("every reference is a real verse in its own book, and the verse contains the word", () => {
  const problems: string[] = [];
  let total = 0;
  for (const entry of WORD_SEARCH_BOOKS) {
    for (const word of entry.words) {
      total += 1;
      if (!(word.chapter >= 1 && word.chapter <= getBookTotalChapters(entry.book))) {
        problems.push(`${word.reference} (${word.label}): no such chapter`);
        continue;
      }
      const chapter = kjv(entry.slug, word.chapter);
      const verse = chapter?.find((row) => row.number === word.verse);
      if (!verse) {
        problems.push(`${word.reference} (${word.label}): no such verse`);
        continue;
      }
      const text = verse.text.replace(/\s+/g, " ").toLowerCase();
      if (!text.includes(word.match.toLowerCase())) {
        problems.push(`${word.reference} (${word.label}): "${word.match}" is not in: ${verse.text.replace(/\s+/g, " ").slice(0, 110)}`);
      }
      if (word.reference !== `${entry.book} ${word.chapter}:${word.verse}`) problems.push(`${word.label}: reference text mismatch`);
    }
  }
  if (problems.length) console.log(problems.join("\n"));
  assert.equal(problems.length, 0, `${problems.length} of ${total} references failed`);
});

check("every book, forty seeds each: a valid 12x12 grid, each word exactly once, never the fallback", () => {
  let fallbacks = 0;
  let worstAttempt = 0;
  for (const entry of WORD_SEARCH_BOOKS) {
    const words = entry.words.map((word) => word.letters);
    for (let seed = 1; seed <= 40; seed += 1) {
      const puzzle = generatePuzzle(entry.slug, words, seed);
      assert.equal(puzzle.size, GRID_SIZE);
      assert.ok(isValidPuzzle(puzzle, words), `${entry.book} seed ${seed} is not valid`);
      for (const letters of words) assert.equal(countOccurrences(puzzle.grid, letters), 1, `${entry.book} ${letters} seed ${seed}`);
      for (const placement of puzzle.placements) {
        // The relaxed default: nothing reads backwards.
        assert.ok(placement.dCol === 1 || (placement.dCol === 0 && placement.dRow === 1), `${entry.book} ${placement.letters} reads backwards`);
        for (const cell of placementCells(placement)) {
          assert.ok(cell.row >= 0 && cell.row < GRID_SIZE && cell.col >= 0 && cell.col < GRID_SIZE);
        }
      }
      if (puzzle.fallback) fallbacks += 1;
      worstAttempt = Math.max(worstAttempt, puzzle.attempt);
    }
  }
  console.log(`   ${66 * 40} grids, fallbacks: ${fallbacks}, most attempts needed: ${worstAttempt + 1}`);
  assert.equal(fallbacks, 0);
});

check("the same book and seed always give the same grid; a new seed gives another", () => {
  for (const entry of WORD_SEARCH_BOOKS) {
    const words = entry.words.map((word) => word.letters);
    const first = generatePuzzle(entry.slug, words, 12345);
    const again = generatePuzzle(entry.slug, words, 12345);
    assert.deepEqual(first, again);
    const other = generatePuzzle(entry.slug, words, 54321);
    assert.notDeepEqual(first.grid, other.grid);
  }
});

check("selection: a drag snaps to a straight line and stops at the edge", () => {
  assert.deepEqual(snapEnd({ row: 5, col: 5 }, { row: 5, col: 9 }, 12), { row: 5, col: 9 });
  // A wobbly drag to the right still lands on the row.
  assert.deepEqual(snapEnd({ row: 5, col: 2 }, { row: 6, col: 9 }, 12), { row: 5, col: 9 });
  // Nearly diagonal becomes diagonal.
  assert.deepEqual(snapEnd({ row: 2, col: 2 }, { row: 6, col: 7 }, 12), { row: 7, col: 7 });
  // A diagonal that would leave the grid is cut short.
  assert.deepEqual(snapEnd({ row: 10, col: 2 }, { row: 11, col: 7 }, 12), { row: 10, col: 7 });
  assert.deepEqual(snapEnd({ row: 10, col: 8 }, { row: 11, col: 11 }, 12).row <= 11, true);
  assert.deepEqual(snapEnd({ row: 3, col: 3 }, { row: 3, col: 3 }, 12), { row: 3, col: 3 });
  for (let row = 0; row < 12; row += 1) {
    for (let col = 0; col < 12; col += 1) {
      const end = snapEnd({ row: 6, col: 6 }, { row, col }, 12);
      assert.ok(end.row >= 0 && end.row < 12 && end.col >= 0 && end.col < 12);
      assert.ok(cellsBetween({ row: 6, col: 6 }, end), "a snapped end is always on a straight line");
    }
  }
  assert.equal(cellsBetween({ row: 0, col: 0 }, { row: 2, col: 5 }), null);
  assert.equal(cellsBetween({ row: 0, col: 0 }, { row: 3, col: 3 })?.length, 4);
});

check("selection: a word is found from either end, and nothing else is", () => {
  const book = getWordSearchBook("genesis");
  assert.ok(book);
  const puzzle = generatePuzzle(book.slug, book.words.map((word) => word.letters), 7);
  for (const placement of puzzle.placements) {
    const cells = placementCells(placement);
    const first = cells[0];
    const last = cells[cells.length - 1];
    assert.equal(matchSelection(puzzle, first, last)?.letters, placement.letters);
    assert.equal(matchSelection(puzzle, last, first)?.letters, placement.letters);
    // One letter short is not the word.
    assert.equal(matchSelection(puzzle, first, cells[cells.length - 2]), null);
  }
});

check("labels with spaces keep their label and lose the space in the grid", () => {
  assert.equal(normalizeLetters("Red Sea"), "REDSEA");
  assert.equal(normalizeLetters("FIG TREE"), "FIGTREE");
  const exodus = getWordSearchBook("exodus");
  assert.equal(exodus?.words.find((word) => word.label === "RED SEA")?.letters, "REDSEA");
});

check("points: one action, scored once per book, registered everywhere it has to be", () => {
  const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
  assert.ok(read("lib/actionTypes.ts").includes('"word_search_book_completed"'));
  assert.match(read("lib/levelSystem.ts"), /word_search_book_completed: \d+/);
  const engine = read("lib/pointsEngine.ts");
  const unique = engine.slice(engine.indexOf("UNIQUE_PER_LABEL"), engine.indexOf("DAILY_CAPS"));
  assert.ok(unique.includes('"word_search_book_completed"'), "scored once per book, not per replay");
  assert.ok(read("supabase/migrations/20261113_word_search_progress.sql").includes("word_search_book_completed"));
});

console.log(`\n${passed} checks passed`);
