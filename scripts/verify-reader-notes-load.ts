/**
 * Offline checks that an Insight Card can always reach its full note.
 *
 *   npm run verify:reader-notes
 *
 * Same idiom as the other verify-* scripts: no network, no database, assert
 * against the real source text.
 *
 * These exist because of what was live until 2026-11-12. On the chapters with
 * a hand-built phrase map (Genesis 1, Proverbs 7-18) the reader returned before
 * fetching the notes, so:
 *
 *   - with Study Mode on, all 33 cards on Proverbs 9 rendered as a title and a
 *     first line and none of them could be opened (measured on production:
 *     0 of 33 tappable). Nothing loaded the notes until an underlined phrase in
 *     the verse itself happened to be tapped;
 *   - that first tap went to /api/study-notes, a server function that loads
 *     every note in the Bible to answer for one chapter (7.2s cold), through a
 *     relative-url fetch with no deadline, which inside the iOS app can simply
 *     never settle;
 *   - and when it failed, the card went back to title and first line with no
 *     sign anything was missing.
 *
 * No error was ever raised by any of it.
 */
import { readFileSync } from "fs";
import { strict as assert } from "assert";

const read = (p: string) => readFileSync(p, "utf8");
let checks = 0;
function check(label: string, fn: () => void) {
  fn();
  checks += 1;
  console.log(`  ok  ${label}`);
}

const reader = read("components/ChapterInsightReader.tsx");
const highlighter = read("components/VerseHighlighter.tsx");
const staticData = read("lib/chapterStaticData.ts");

console.log("\nThe reader fetches notes on arrival, for every chapter");

check("the reader loads the chapter's notes itself", () => {
  assert.ok(reader.includes("loadChapterStudySections(book, chapter)"));
});

check("a hand-built phrase map does not short-circuit the notes fetch", () => {
  // The old shape: `if (phrases.length) { setInsightPhrases(phrases); return; }`
  // sitting above the notes fetch in the same async function.
  assert.ok(!/setInsightPhrases\(phrases\);\s*return;/.test(reader));
});

check("the reader tells the highlighter while the notes are on their way", () => {
  assert.ok(reader.includes("studySectionsLoading={studySectionsLoading}"));
});

check("the chapters either side are fetched ahead", () => {
  assert.ok(reader.includes("prefetchChapterData(book, chapter + 1)"));
  assert.ok(reader.includes("prefetchChapterData(book, chapter - 1)"));
});

console.log("\nNothing in the reader calls the notes API with a bare fetch");

check("VerseHighlighter goes through loadChapterStudySections", () => {
  assert.ok(highlighter.includes("loadChapterStudySections(book, chapter)"));
  assert.ok(!highlighter.includes("fetch(\n        `/api/study-notes"));
  assert.ok(!/fetch\(\s*`\/api\/study-notes/.test(highlighter));
});

check("ChapterInsightReader does not either", () => {
  assert.ok(!/fetch\(\s*`\/api\/study-notes/.test(reader));
});

console.log("\nThe shared loader cannot hang");

check("static file first, the server function only as the fallback", () => {
  const body = staticData.slice(staticData.indexOf("export async function loadChapterStudySections"));
  assert.ok(body.indexOf("studyNotesStaticUrl(book, chapter)") < body.indexOf("/api/study-notes"));
});

check("every fetch is absolute and has a deadline", () => {
  const fetches = staticData.match(/await fetch\(/g) || [];
  const deadlines = staticData.match(/signal: deadline\(/g) || [];
  assert.equal(fetches.length, 2);
  assert.equal(deadlines.length, fetches.length);
  assert.ok(staticData.includes("fetch(key,"), "static fetch must use the absolute key");
  assert.ok(staticData.includes("absoluteUrl(`/api/study-notes"), "API fetch must be absolute");
});

check("a failure is null, never an empty list", () => {
  const body = staticData.slice(staticData.indexOf("export async function loadChapterStudySections"));
  assert.ok(!body.slice(0, body.indexOf("export function prefetchChapterData")).includes("return [];"));
});

console.log("\nA card never passes off a partial note as the whole one");

check("a card with no notes yet stays tappable", () => {
  assert.ok(highlighter.includes("const hasNote = paragraphs.length > 0 || loadingNote || failedNote;"));
});

check("loading and failure are both said in words", () => {
  assert.ok(highlighter.includes("Loading the full note"));
  assert.ok(highlighter.includes("The rest of this note did not load"));
});

console.log(`\n${checks} checks passed.\n`);
