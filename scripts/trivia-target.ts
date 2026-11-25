/**
 * How many questions a chapter needs per level (2026-11-25).
 *
 * 15 Easy, 15 Medium, 15 Hard, but never more per level than half the
 * chapter's verses: an 8-verse chapter (Revelation 15) cannot give 45 real questions,
 * and padding it means fill-in-the-blank filler. Louis: "20 to 25 good real
 * questions are enough." Never under 5, so every level can still be played
 * (a game needs 5 questions, lib/clueGame/bank MIN_ROUND).
 */

import fs from "node:fs";
import path from "node:path";
import { kjvStaticUrl } from "../lib/chapterStaticData";
import { bookName } from "../lib/clueGame/bank";

const ROOT = path.resolve(__dirname, "..");
const cache = new Map<string, number>();

export function versesIn(book: string, chapter: number): number {
  const key = `${book}:${chapter}`;
  if (!cache.has(key)) {
    const file = path.join(ROOT, "public", kjvStaticUrl(bookName(book), chapter));
    const n = fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")) as unknown[]).length : 15;
    cache.set(key, n);
  }
  return cache.get(key)!;
}

// Half the verse count per level (about 1.5 questions per verse in all),
// between 5 and 15: a 30-verse chapter gets 15, a 14-verse letter gets 7.
// Tightened on 2026-11-25 after one per verse still forced repeats in 2 and 3 John.
/**
 * Chapters that are mostly a genealogy or a list of names and numbers: the
 * verse count overstates what a reader remembers, and filling them means
 * "who begat whom" lookups. They get the minimum, asked about the story parts
 * (2026-11-25, after Matthew 1 needed ten genealogy questions to reach 13).
 */
const LIST_CHAPTERS = new Set([
  "matthew:1",
  "1-chronicles:1", "1-chronicles:2", "1-chronicles:3", "1-chronicles:4", "1-chronicles:5",
  "1-chronicles:6", "1-chronicles:7", "1-chronicles:8", "1-chronicles:9",
  "ezra:2", "nehemiah:7", "nehemiah:10", "nehemiah:11", "nehemiah:12",
  // Jeremiah 52 retells 2 Kings 25 almost word for word.
  "jeremiah:52",
  // Ezekiel's temple measurements and the tribes' land portions.
  "ezekiel:40", "ezekiel:41", "ezekiel:42", "ezekiel:45", "ezekiel:48",
]);

/**
 * Proverbs is one-line sayings: 15 per level meant asking the second half of a
 * couplet already asked, or a single word from it. 10 per level at most
 * (2026-11-25), so every question is its own saying.
 */
const CAPS: Record<string, number> = { proverbs: 10 };

export const targetFor = (book: string, chapter: number) =>
  LIST_CHAPTERS.has(`${book}:${chapter}`) ? 5 :
  CAPS[book] ? Math.min(CAPS[book], Math.max(5, Math.ceil(versesIn(book, chapter) / 2))) : Math.min(15, Math.max(5, Math.ceil(versesIn(book, chapter) / 2)));
