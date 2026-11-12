/**
 * Bible Memory: the promises the three games make, checked offline.
 *
 *   npm run verify:memory
 *
 * No database and no network. It plays real King James verses out of
 * public/kjv through lib/bibleMemoryGames.ts with a seeded shuffle, so a
 * failure is repeatable.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  MAX_LEVEL,
  ORDER_MAX_WORDS,
  SESSION_LENGTH,
  WELL_KNOWN_REFERENCES,
  buildFillQuestion,
  buildOrderQuestion,
  buildReferenceQuestion,
  buildSession,
  canonicalBookName,
  formatReference,
  isFillChoiceCorrect,
  isOrderCorrect,
  memoryLabel,
  nextLevel,
  normalizeWord,
  orderForPractice,
  summariseSession,
  tokenize,
  type MemoryVerse,
} from "../lib/bibleMemoryGames";
import { BIBLE_BOOKS, getBookTotalChapters } from "../lib/bibleBookChapters";

let passed = 0;
function check(label: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`ok ${label}`);
}

function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

const root = path.resolve(__dirname, "..");
function kjv(book: string, chapter: number): Array<{ number: number; text: string }> {
  const slug = book.toLowerCase().replace(/\s+/g, "-");
  return JSON.parse(fs.readFileSync(path.join(root, "public", "kjv", slug, `${chapter}.json`), "utf8"));
}

let nextId = 0;
function verse(book: string, chapter: number, number: number, extra: Partial<MemoryVerse> = {}): MemoryVerse {
  const row = kjv(book, chapter).find((entry) => entry.number === number);
  assert.ok(row, `${book} ${chapter}:${number} exists in public/kjv`);
  nextId += 1;
  return {
    id: `verse-${nextId}`,
    book,
    chapter,
    verse: number,
    verse_end: null,
    translation: "KJV",
    verse_text: row.text,
    level: 0,
    correct_count: 0,
    mistake_count: 0,
    last_practised_at: null,
    created_at: "2026-11-12T00:00:00.000Z",
    ...extra,
  };
}

const NOW = new Date("2026-11-12T12:00:00.000Z");
const daysAgo = (days: number) => new Date(NOW.getTime() - days * 86_400_000).toISOString();

// A spread of shapes: very short, very long, repeated words, heavy punctuation.
const SAMPLE: Array<[string, number, number]> = [
  ["John", 11, 35], // "Jesus wept."
  ["John", 3, 16],
  ["Psalms", 23, 1],
  ["Genesis", 1, 1],
  ["Esther", 8, 9], // the longest verse in the Bible
  ["Psalms", 136, 1],
  ["Ecclesiastes", 1, 2], // "vanity" five times
  ["Romans", 8, 28],
  ["1 Thessalonians", 5, 17], // "Pray without ceasing."
  ["Isaiah", 6, 3], // "Holy, holy, holy"
  ["Philippians", 4, 13],
  ["Proverbs", 3, 5],
];
const verses = SAMPLE.map(([book, chapter, number]) => verse(book, chapter, number));

check("book names: reader slugs and Daily Verse names land on one spelling", () => {
  assert.equal(canonicalBookName("genesis"), "Genesis");
  assert.equal(canonicalBookName("1 samuel"), "1 Samuel");
  assert.equal(canonicalBookName("song-of-solomon"), "Song of Solomon");
  assert.equal(canonicalBookName("Psalm"), "Psalms");
  for (const book of BIBLE_BOOKS) assert.equal(canonicalBookName(book.toLowerCase()), book);
});

check("references: a single verse and a Daily Verse range", () => {
  assert.equal(formatReference({ book: "John", chapter: 3, verse: 16, verse_end: null }), "John 3:16");
  assert.equal(formatReference({ book: "Psalms", chapter: 23, verse: 1, verse_end: 3 }), "Psalms 23:1-3");
});

check("tokens: every one carries letters, and line breaks inside a verse vanish", () => {
  for (const item of verses) {
    const tokens = tokenize(item.verse_text);
    assert.ok(tokens.length >= 2, `${formatReference(item)} has words`);
    for (const token of tokens) assert.ok(normalizeWord(token), `"${token}" has letters`);
    assert.ok(!tokens.join(" ").includes("\n"));
  }
});

check("fill in the blank: exactly one valid choice, four distinct choices, never a word from the verse", () => {
  for (let seed = 1; seed <= 200; seed += 1) {
    const rng = seeded(seed);
    for (const item of verses) {
      for (const level of [0, 1, 2, 3]) {
        const question = buildFillQuestion({ ...item, level }, verses.filter((other) => other.id !== item.id), rng);
        const inVerse = new Set(question.tokens.map(normalizeWord));
        assert.ok(question.blanks.length >= 1);
        assert.ok(question.blanks.length <= Math.min(3, level + 1), "more missing words only as the level rises");
        assert.ok(question.blanks.length < question.tokens.length, "the whole verse is never blank");
        for (const blank of question.blanks) {
          assert.equal(blank.choices.length, 4);
          assert.equal(new Set(blank.choices.map(normalizeWord)).size, 4, "no two choices are the same word");
          assert.equal(blank.choices.filter((choice) => isFillChoiceCorrect(blank, choice)).length, 1);
          assert.equal(normalizeWord(question.tokens[blank.index]), normalizeWord(blank.answer));
          for (const choice of blank.choices) {
            if (!isFillChoiceCorrect(blank, choice)) assert.ok(!inVerse.has(normalizeWord(choice)));
          }
          const capitals = blank.choices.map((choice) => /^[A-Z]/.test(choice));
          assert.ok(capitals.every((value) => value === capitals[0]), "a capital letter never singles out the answer");
        }
      }
    }
  }
});

check("fill in the blank: a blanked word appears once in its verse when the verse allows it", () => {
  const question = buildFillQuestion({ ...verse("John", 3, 16), level: 3 }, [], seeded(7));
  for (const blank of question.blanks) {
    const word = normalizeWord(blank.answer);
    assert.equal(question.tokens.filter((token) => normalizeWord(token) === word).length, 1);
  }
});

check("word order: long verses come in sections, the bank is the right words, and it starts out of order", () => {
  for (let seed = 1; seed <= 200; seed += 1) {
    const rng = seeded(seed);
    for (const item of verses) {
      const question = buildOrderQuestion(item, rng);
      assert.ok(question.words.length >= 1 && question.words.length <= ORDER_MAX_WORDS);
      assert.deepEqual(
        question.bank.map((tile) => normalizeWord(tile.word)).sort(),
        question.words.map(normalizeWord).sort(),
      );
      assert.equal(new Set(question.bank.map((tile) => tile.id)).size, question.bank.length);
      const whole = [question.before, question.answerText, question.after].filter(Boolean).join(" ");
      assert.equal(whole, tokenize(item.verse_text).join(" "), "before + part + after is the whole verse");
      const distinct = new Set(question.words.map(normalizeWord)).size;
      if (distinct > 1) assert.ok(!isOrderCorrect(question.bank.map((tile) => tile.word), question.words));
    }
  }
});

check("word order: repeated words, capitals and punctuation are never a wrong answer", () => {
  const holy = buildOrderQuestion(verse("Isaiah", 6, 3), seeded(3));
  assert.ok(isOrderCorrect(holy.words, holy.words));
  // Swap two identical words: still the same verse.
  const firstHoly = holy.words.findIndex((word) => normalizeWord(word) === "holy");
  const secondHoly = holy.words.findIndex((word, index) => index > firstHoly && normalizeWord(word) === "holy");
  if (firstHoly >= 0 && secondHoly >= 0) {
    const swapped = holy.words.slice();
    [swapped[firstHoly], swapped[secondHoly]] = [swapped[secondHoly], swapped[firstHoly]];
    assert.ok(isOrderCorrect(swapped, holy.words));
  }
  assert.ok(isOrderCorrect(["jesus", "WEPT"], ["Jesus", "wept"]));
  assert.ok(!isOrderCorrect(["wept", "Jesus"], ["Jesus", "wept"]));
  assert.ok(!isOrderCorrect(["Jesus"], ["Jesus", "wept"]));
});

check("match the reference: four real, distinct options, one right, none from the same chapter", () => {
  for (let seed = 1; seed <= 200; seed += 1) {
    const rng = seeded(seed);
    for (const item of verses) {
      for (const others of [[], verses.filter((other) => other.id !== item.id)]) {
        const question = buildReferenceQuestion(item, others, rng);
        assert.equal(question.options.length, 4);
        assert.equal(new Set(question.options).size, 4);
        assert.equal(question.options.filter((option) => option === question.answer).length, 1);
        for (const option of question.options) {
          if (option !== question.answer) assert.ok(!option.startsWith(`${item.book} ${item.chapter}:`));
        }
      }
    }
  }
});

check("match the reference: every spare reference is a real verse in public/kjv", () => {
  assert.ok(WELL_KNOWN_REFERENCES.length >= 20);
  for (const reference of WELL_KNOWN_REFERENCES) {
    const match = reference.match(/^(.+) (\d+):(\d+)$/);
    assert.ok(match, reference);
    const [, book, chapter, number] = match;
    assert.ok(BIBLE_BOOKS.includes(book), `${book} is a book`);
    assert.ok(Number(chapter) <= getBookTotalChapters(book));
    assert.ok(kjv(book, Number(chapter)).some((entry) => entry.number === Number(number)), reference);
  }
});

check("a session is five questions, and one saved verse is enough for one", () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const one = buildSession([verses[1]], NOW, seeded(seed));
    assert.equal(one.length, SESSION_LENGTH);
    assert.ok(one.every((question) => question.verseId === verses[1].id));
    assert.equal(new Set(one.map((question) => question.type)).size, 3, "all three games turn up");

    const many = buildSession(verses, NOW, seeded(seed));
    assert.equal(many.length, SESSION_LENGTH);
    assert.equal(new Set(many.map((question) => question.verseId)).size, SESSION_LENGTH);
  }
  assert.deepEqual(buildSession([], NOW), []);
});

check("review: shaky and overdue verses come first, rested ones last", () => {
  const fresh = verse("John", 3, 16);
  const failed = verse("Romans", 8, 28, { level: 0, last_practised_at: daysAgo(0.01) });
  const dueSoon = verse("Psalms", 23, 1, { level: 1, last_practised_at: daysAgo(2) });
  const resting = verse("Genesis", 1, 1, { level: 3, last_practised_at: daysAgo(1) });
  const overdue = verse("Proverbs", 3, 5, { level: 3, last_practised_at: daysAgo(8) });
  const order = orderForPractice([resting, overdue, dueSoon, failed, fresh], NOW).map((item) => item.id);
  assert.equal(order[order.length - 1], resting.id);
  assert.ok(order.indexOf(failed.id) < order.indexOf(dueSoon.id));
  assert.ok(order.indexOf(dueSoon.id) < order.indexOf(overdue.id));
  assert.ok(order.indexOf(overdue.id) < order.indexOf(resting.id));
});

check("labels stay modest: New, Practising, Ready for review - and nothing is ever called memorized", () => {
  assert.equal(memoryLabel({ level: 0, last_practised_at: null }, NOW), "New");
  assert.equal(memoryLabel({ level: 0, last_practised_at: daysAgo(0.01) }, NOW), "Practising");
  assert.equal(memoryLabel({ level: 1, last_practised_at: daysAgo(0.01) }, NOW), "Practising");
  assert.equal(memoryLabel({ level: 1, last_practised_at: daysAgo(1.5) }, NOW), "Ready for review");
  assert.equal(memoryLabel({ level: 3, last_practised_at: daysAgo(6) }, NOW), "Practising");
  assert.equal(memoryLabel({ level: 3, last_practised_at: daysAgo(7.5) }, NOW), "Ready for review");
  const source = fs.readFileSync(path.join(root, "lib", "bibleMemoryGames.ts"), "utf8");
  assert.ok(!/"Memori[sz]ed"|"Mastered"/.test(source));
});

check("levels: up one after a clean session, down one after a mistake, never outside 0 to 3", () => {
  assert.equal(nextLevel(0, false), 1);
  assert.equal(nextLevel(0, true), 0);
  assert.equal(nextLevel(2, true), 1);
  assert.equal(nextLevel(MAX_LEVEL, false), MAX_LEVEL);
  const [a, b, c] = [verse("John", 3, 16, { level: 1 }), verse("Romans", 8, 28, { level: 1 }), verse("Genesis", 1, 1)];
  const outcomes = summariseSession([a, b, c], [
    { verseId: a.id, correct: true },
    { verseId: a.id, correct: true },
    { verseId: b.id, correct: true },
    { verseId: b.id, correct: false },
  ]);
  assert.deepEqual(outcomes, [
    { verseId: a.id, correct: 2, mistakes: 0, level: 2 },
    { verseId: b.id, correct: 1, mistakes: 1, level: 0 },
  ]);
});

check("points: one capped action, registered everywhere it has to be", () => {
  const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
  assert.ok(read("lib/actionTypes.ts").includes('"bible_memory_session_completed"'));
  assert.match(read("lib/levelSystem.ts"), /bible_memory_session_completed: \d+/);
  assert.match(read("lib/pointsEngine.ts"), /bible_memory_session_completed: 2,/);
  assert.ok(read("supabase/migrations/20261112_memory_verses.sql").includes("bible_memory_session_completed"));
});

console.log(`\n${passed} checks passed`);
