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
export const targetFor = (book: string, chapter: number) => Math.min(15, Math.max(5, Math.ceil(versesIn(book, chapter) / 2)));
