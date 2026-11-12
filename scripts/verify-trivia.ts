/**
 * Offline checks on the trivia question bank.
 *
 *   npm run verify:trivia
 *
 * No network, no database. It loads the real bank and asserts the things a
 * reader hit before the 2026-11-12 audit, when all 6,345 questions were read
 * against the King James text and 1,358 were corrected:
 *
 *   - "What did God tell Abram not to fear?" answered "Because God was his
 *     shield": a what-question with a because-answer (Genesis 15, found by
 *     Louis while studying);
 *   - the reference stripper eating ordinary words, so "Who died in Hebron at
 *     the age of 127?" was shown as "Who died?" (about 155 questions);
 *   - "Both A and B" / "All of the above" as the marked answer on 164 of the
 *     400 topic questions;
 *   - references pointing outside the question's own chapter.
 *
 * It cannot tell whether an answer is true. That took reading. It can stop
 * the mechanical faults from coming back.
 */
import { readFileSync } from "fs";
import { strict as assert } from "assert";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "../lib/triviaCatalog";
import { getTriviaBook, sanitizeTriviaQuestionText } from "../lib/triviaGameData";

let checks = 0;
function check(label: string, fn: () => void) {
  fn();
  checks += 1;
  console.log(`  ok  ${label}`);
}
const show = (list: string[]) => `${list.length}: ${list.slice(0, 8).join(" | ")}`;

const all: Array<{ id: string; book: string; chapter: number; question: string; options: string[]; correct: string; verse: string; explanation: string }> = [];
for (const config of CHAPTER_BASED_TRIVIA_BOOK_CONFIG) {
  const book = getTriviaBook(config.key);
  assert.ok(book, `no trivia for ${config.key}`);
  assert.equal(book.chapters.length, config.chapters, `${config.key} chapter count`);
  for (const chapter of book.chapters) {
    assert.equal(chapter.questions.length, 5, `${config.key} ${chapter.chapter} should have five questions`);
    for (const q of chapter.questions) {
      all.push({ id: q.id, book: config.key, chapter: chapter.chapter, question: q.question, options: q.options.map((o) => o.text), correct: q.correctAnswer, verse: q.verse, explanation: q.explanation });
    }
  }
}

console.log("\nThe bank is whole");

check("5,945 questions, five in every chapter of every book", () => {
  assert.equal(all.length, 5945);
});

check("every id is unique", () => {
  assert.equal(new Set(all.map((q) => q.id)).size, all.length);
});

check("four different options and a marked answer among them", () => {
  const bad = all.filter((q) => q.options.length !== 4 || new Set(q.options.map((o) => o.trim().toLowerCase())).size !== 4 || q.options.some((o) => !o.trim()) || !["A", "B", "C", "D"].includes(q.correct));
  assert.equal(bad.length, 0, show(bad.map((q) => q.id)));
});

check("every question has an explanation and a reference", () => {
  const bad = all.filter((q) => !q.explanation.trim() || !q.verse.trim());
  assert.equal(bad.length, 0, show(bad.map((q) => q.id)));
});

console.log("\nThe question and its answer fit together");

check("no what/who/where/when question is answered with a because", () => {
  const bad = all.filter((q) => /^(what|who|whom|where|when|which|how many)\b/i.test(q.question) && /^because\b/i.test(q.options["ABCD".indexOf(q.correct)]));
  assert.equal(bad.length, 0, show(bad.map((q) => q.id)));
});

check("no option is All of the above or Both A and B", () => {
  const bad = all.filter((q) => q.options.some((o) => /\b(all|none) of (the|these)\b|\bboth a and b\b/i.test(o)));
  assert.equal(bad.length, 0, show(bad.map((q) => q.id)));
});

check("the right answer is not parked on one letter", () => {
  // Until 2026-11-12 option B was correct on 5,076 of 5,945 questions, so a
  // player could score by always tapping the second answer. Positions are now
  // spread; sets in ascending numeric order were left in order.
  for (const letter of ["A", "B", "C", "D"]) {
    const share = all.filter((q) => q.correct === letter).length / all.length;
    assert.ok(share > 0.18 && share < 0.32, `${letter} is correct on ${(share * 100).toFixed(1)}% of questions`);
  }
});

console.log("\nWhat the player reads is a whole sentence");

check("the reference stripper leaves ordinary words alone", () => {
  assert.equal(sanitizeTriviaQuestionText("Who died in Hebron at the age of 127?"), "Who died in Hebron at the age of 127?");
  assert.equal(sanitizeTriviaQuestionText("What happened in these last days in Hebrews 1:2?"), "What happened in these last days?");
  assert.equal(sanitizeTriviaQuestionText("What is in the power of the tongue in Proverbs 18:21?"), "What is in the power of the tongue?");
});

check("and still strips every kind of reference", () => {
  assert.equal(sanitizeTriviaQuestionText("What does Jesus say repeatedly in Revelation 22:7,12,20?"), "What does Jesus say repeatedly?");
  assert.equal(sanitizeTriviaQuestionText("What repeated line appears in verses 3 and 5?"), "What repeated line appears?");
  assert.equal(sanitizeTriviaQuestionText("Who hindered Paul in 1 Thessalonians 2:18?"), "Who hindered Paul?");
  assert.equal(sanitizeTriviaQuestionText("What is said (Hebrews 2:1) here?"), "What is said here?");
  assert.equal(sanitizeTriviaQuestionText("What does John see in Revelation 4?"), "What does John see?");
});

check("no displayed question carries the scars of a stripped reference", () => {
  const bad = all.filter((q) => /[,;]\s*\d{1,2}\s*[?]|[A-Za-z]-\d+\b|\s[?]$|,\?$|\band \d+\?$/.test(q.question));
  assert.equal(bad.length, 0, show(bad.map((q) => `${q.id}: ${q.question}`)));
});

check("every question ends as a question or an instruction", () => {
  const bad = all.filter((q) => !/[?.]['"”]?$/.test(q.question));
  assert.equal(bad.length, 0, show(bad.map((q) => `${q.id}: ${q.question}`)));
});

check("no question is too short to mean anything", () => {
  const bad = all.filter((q) => q.question.split(/\s+/).length < 3);
  assert.equal(bad.length, 0, show(bad.map((q) => `${q.id}: ${q.question}`)));
});

console.log("\nReferences stay inside the chapter being played");

check("a chapter:verse reference names the question's own chapter", () => {
  const bad = all.filter((q) => {
    const m = /(\d+):\d+/.exec(q.verse);
    return m ? Number(m[1]) !== q.chapter : false;
  });
  assert.equal(bad.length, 0, show(bad.map((q) => `${q.id}: ${q.verse}`)));
});

console.log("\nThe four topic quizzes");

for (const topic of ["abraham", "moses", "jesus", "god"]) {
  check(`${topic}: 100 questions, none with a combined option`, () => {
    const source = readFileSync(`app/bible-trivia/${topic}/page.tsx`, "utf8");
    assert.equal((source.match(/correctAnswer: "/g) || []).length, 100);
    const combos = source.match(/text: "(?:Both A and B|All of the above|None of the above|Neither A nor B)"/gi) || [];
    assert.equal(combos.length, 0, `${combos.length} combined options left`);
  });
}

console.log(`\n${checks} checks passed.\n`);
