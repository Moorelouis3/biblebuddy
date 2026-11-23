/**
 * How far the Bible Trivia Question Writer has got (Louis, 2026-11-23: "how
 * can i track this... i dont wanna forget about it"). A chapter is done when
 * it has 15 Easy, 15 Medium and 15 Hard questions (docs/TRIVIA_QUESTION_WRITER_AGENT.md).
 *
 * Read from books/index.json, which the writer regenerates on every chapter,
 * so the numbers are as of the last build. Shown on the admin dashboard's
 * Bible Trivia tab.
 */

import INDEX from "./bank/books/index.json";

type Index = Record<string, { name: string; order: number; chapters: Record<string, number[]> }>;

export const QUESTIONS_PER_LEVEL = 15;

const books = Object.values(INDEX as unknown as Index).sort((a, b) => a.order - b.order);
const all = books.flatMap((b) =>
  Object.entries(b.chapters)
    .map(([ch, counts]) => ({ book: b.name, chapter: Number(ch), counts }))
    .sort((x, y) => x.chapter - y.chapter),
);
const isDone = (c: number[]) => [0, 1, 2].every((i) => (c[i] || 0) >= QUESTIONS_PER_LEVEL);
const doneCount = all.filter((c) => isDone(c.counts)).length;
const next = all.find((c) => !isDone(c.counts));

export const TRIVIA_PROGRESS = {
  done: doneCount,
  total: all.length,
  /** The chapter the writer works on next, or null when every chapter is done. */
  next: next ? `${next.book} ${next.chapter}` : null,
  complete: !next,
  /** Books with every chapter done. */
  booksDone: books.filter((b) => Object.values(b.chapters).every(isDone)).map((b) => b.name),
};
