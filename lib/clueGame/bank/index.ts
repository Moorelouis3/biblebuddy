/**
 * The Bible Trivia question bank (the game was Bible Clue until 2026-11-23).
 *
 * Two sources, one registry:
 *  - Genesis 1-50 hand-written in TypeScript (bank/genesis-*.ts, 2026-11-22):
 *    about 12 Easy and 12 Medium per chapter, written to
 *    docs/clue-question-bank-brief.md and checked against public/kjv.
 *  - Every book as JSON in bank/books/<slug>.json (StoredQuestion). The old
 *    Bible Trivia questions were brought over by scripts/trivia-import-old.ts
 *    (5 per chapter, all 1,189 chapters); new questions are added to the
 *    same files, toward 15 Easy / 15 Medium / 15 Hard per chapter.
 *
 * books/index.json holds the counts per book, chapter and level, so the setup
 * screen knows what can be played without loading every book. The browser
 * loads a book's questions when it is picked (loadBook); the server loads all
 * of them (bank/all.ts). CLUE_BANK is the registry every match reads.
 *
 * Each question becomes a BankItem with its art resolved: when the right
 * answer is one of the Genesis deck's cards (cardId), the round shows that
 * card's mystery silhouette and reveal picture; otherwise a plain card.
 */

import type { BankItem, ClueSelection } from "../engine";
import { DEFAULT_CLUE_SETTINGS } from "../engine";
import { GENESIS_CARDS } from "../decks/genesis";
import { ref } from "../ref";
import { CLUE_LEVELS, LEVEL_LABEL, LEVEL_PICKER, type ClueCategory, type ClueLevel, type ClueQuestion } from "../types";
import { BANK_FILES } from "./files";
import { artFor } from "./art";
import BOOK_INDEX_JSON from "./books/index.json";
import { BOOK_LOADERS } from "./loaders";

/** One question as stored in bank/books/<slug>.json. */
export type StoredQuestion = {
  id: string;
  chapter: number;
  level: ClueLevel;
  category: ClueCategory;
  question: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
  /** "Exodus 3:14" or "Exodus 3:14–16". */
  ref: string;
  cardId?: string;
};

export type BookIndex = Record<string, { name: string; order: number; chapters: Record<string, [number, number, number]> }>;
/** Questions per book, chapter and level ([easy, medium, hard]), both sources together. */
export const BOOK_INDEX = BOOK_INDEX_JSON as unknown as BookIndex;

const CARDS = new Map(GENESIS_CARDS.map((c) => [c.id, c]));

function toItem(q: ClueQuestion): BankItem {
  const card = q.book === "genesis" && q.cardId ? CARDS.get(q.cardId) : undefined;
  // Not a deck card: its own art once made (docs/clue-card-art-needed.md), else
  // the chapter card. That art is Genesis art: other books show a plain card.
  const own = card || q.book !== "genesis" ? null : artFor(q.choices[q.answer], q.category, q.chapter);
  return {
    id: q.id,
    book: q.book,
    chapter: q.chapter,
    level: q.level,
    category: q.category,
    question: q.question,
    choices: q.choices,
    answer: q.answer,
    explanation: q.explanation,
    ref: q.ref,
    answerText: q.choices[q.answer],
    mystery: card?.art.mystery ?? own?.mystery,
    reveal: card?.art.reveal ?? own?.reveal,
    teaching: card?.teaching,
    study: card?.study,
  };
}

/** Every registered question, by id. Matches, rooms and challenges read this. */
export const CLUE_BANK = new Map<string, BankItem>();
const BY_BOOK = new Map<string, BankItem[]>();

function register(items: BankItem[]) {
  for (const it of items) {
    if (CLUE_BANK.has(it.id)) continue;
    CLUE_BANK.set(it.id, it);
    BY_BOOK.set(it.book, [...(BY_BOOK.get(it.book) || []), it]);
  }
}

/** The hand-written Genesis questions (always loaded). */
export const BANK_ITEMS: BankItem[] = BANK_FILES.flat().map(toItem);
register(BANK_ITEMS);

/** Stored questions of one book into the registry (used by loadBook and bank/all.ts). */
export function registerStored(book: string, list: StoredQuestion[]) {
  register(list.map((q) => toItem({ ...q, book, ref: ref(q.ref) })));
  loaded.add(book);
}

const loaded = new Set<string>();
const loading = new Map<string, Promise<BankItem[]>>();

/** A book's questions, once loaded. */
export const bookItems = (book: string): BankItem[] => BY_BOOK.get(book) || [];

/** Load a book's questions into the registry (the browser calls this before a game). */
export function loadBook(book: string): Promise<BankItem[]> {
  if (loaded.has(book) || !BOOK_LOADERS[book]) return Promise.resolve(bookItems(book));
  if (!loading.has(book)) {
    loading.set(
      book,
      BOOK_LOADERS[book]().then((mod) => {
        registerStored(book, (mod.default || mod) as StoredQuestion[]);
        return bookItems(book);
      }),
    );
  }
  return loading.get(book)!;
}

/** Books that have questions, in Bible order. */
export function booksWithQuestions(): Array<{ id: string; name: string }> {
  return Object.entries(BOOK_INDEX)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([id, b]) => ({ id, name: b.name }));
}

export const bookName = (book: string) => BOOK_INDEX[book]?.name ?? book.charAt(0).toUpperCase() + book.slice(1);

/** Chapters of a book that have questions, in order. */
export function chaptersWithQuestions(book: string): number[] {
  const chapters = BOOK_INDEX[book]?.chapters || {};
  return Object.keys(chapters)
    .map(Number)
    .filter((n) => chapters[n].some((c) => c > 0))
    .sort((a, b) => a - b);
}

/** Questions a selection has at its level (from the index, so no book needs loading). */
export function selectionCount(sel: ClueSelection): number {
  const chapters = BOOK_INDEX[sel.book]?.chapters || {};
  const li = CLUE_LEVELS.indexOf(sel.level);
  return Object.entries(chapters)
    .filter(([n]) => sel.chapters === "all" || sel.chapters.includes(Number(n)))
    .reduce((sum, [, counts]) => sum + (LEVEL_PICKER ? counts[li] || 0 : counts.reduce((a, b) => a + (b || 0), 0)), 0);
}

/**
 * The fewest questions a game can have. A chapter with only a few questions
 * still plays (Louis, 2026-11-23: chapter trivia after every chapter): the
 * game is as long as the questions it has, up to 10, and a tie with no
 * question left is a shared win.
 */
export const MIN_ROUND = 5;

/** How many questions a selection has, how many a game will use, and whether it can be played. */
export function selectionStatus(sel: ClueSelection) {
  const count = selectionCount(sel);
  const round = Math.min(DEFAULT_CLUE_SETTINGS.roundSize, count);
  return { count, round, needed: MIN_ROUND, enough: count >= MIN_ROUND };
}

export const DEFAULT_SELECTION: ClueSelection = { book: "genesis", chapters: "all", level: "beginner" };

/** A selection from anywhere (a request body, saved state) made safe: only real books, chapters and levels. */
export function cleanSelection(raw: unknown): ClueSelection {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const book = typeof r.book === "string" && chaptersWithQuestions(r.book).length ? r.book : "genesis";
  const level: ClueLevel = r.level === "medium" || r.level === "hard" ? r.level : "beginner";
  const have = new Set(chaptersWithQuestions(book));
  const chapters = Array.isArray(r.chapters)
    ? [...new Set(r.chapters.map(Number).filter((n) => have.has(n)))].sort((a, b) => a - b)
    : [];
  return { book, level, chapters: chapters.length && chapters.length < have.size ? chapters : "all" };
}

/**
 * A room keeps its selection in clue_rooms.deck_ids (no migration): the book
 * first (it picks the scene and card back), then "level:<level>" and
 * "chapters:<all|1,2,3>".
 */
export function selectionToKeys(sel: ClueSelection): string[] {
  return [sel.book, `level:${sel.level}`, `chapters:${sel.chapters === "all" ? "all" : sel.chapters.join(",")}`];
}

export function selectionFromKeys(keys: string[] | null | undefined): ClueSelection {
  const list = keys || [];
  const book = list.find((k) => !k.includes(":")) || "genesis";
  const level = list.find((k) => k.startsWith("level:"))?.slice(6);
  const ch = list.find((k) => k.startsWith("chapters:"))?.slice(9);
  return cleanSelection({ book, level, chapters: !ch || ch === "all" ? "all" : ch.split(",") });
}

/** Chapters in short form: "25–36" for a run, "3, 7, 9" otherwise. */
function chapterList(chs: number[]) {
  const runs: string[] = [];
  for (let i = 0; i < chs.length; ) {
    let j = i;
    while (j + 1 < chs.length && chs[j + 1] === chs[j] + 1) j += 1;
    runs.push(j - i >= 2 ? `${chs[i]}–${chs[j]}` : chs.slice(i, j + 1).join(", "));
    i = j + 1;
  }
  return runs.join(", ");
}

/** Plain words for a selection, e.g. "Genesis 25–36 · Medium" or "1 Samuel · All chapters · Easy". */
export function selectionLabel(sel: ClueSelection) {
  const book = bookName(sel.book);
  const where = sel.chapters === "all" ? `${book} · All chapters` : `${book} ${chapterList(sel.chapters)}`;
  return LEVEL_PICKER ? `${where} · ${LEVEL_LABEL[sel.level]}` : where;
}
