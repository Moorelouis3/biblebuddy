/**
 * The Bible Clue question bank (Louis, 2026-11-22): about 24 questions per
 * Genesis chapter, half Beginner and half Medium, written to
 * docs/clue-question-bank-brief.md and checked against public/kjv.
 *
 * Each question becomes a BankItem with its art resolved: when the right
 * answer is one of the deck's cards (cardId), the round shows that card's
 * mystery silhouette and reveal picture; otherwise a plain card with the
 * category.
 */

import type { BankItem, ClueSelection } from "../engine";
import { neededForMatch, poolForSelection } from "../engine";
import { GENESIS_CARDS } from "../decks/genesis";
import type { ClueQuestion } from "../types";
import { BANK_FILES } from "./files";

const CARDS = new Map(GENESIS_CARDS.map((c) => [c.id, c]));

function toItem(q: ClueQuestion): BankItem {
  const card = q.cardId ? CARDS.get(q.cardId) : undefined;
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
    mystery: card?.art.mystery,
    reveal: card?.art.reveal,
    teaching: card?.teaching,
    study: card?.study,
  };
}

export const BANK_ITEMS: BankItem[] = BANK_FILES.flat().map(toItem);
export const CLUE_BANK = new Map(BANK_ITEMS.map((q) => [q.id, q]));

/** Chapters of a book that have questions, in order. */
export function chaptersWithQuestions(book: string): number[] {
  return [...new Set(BANK_ITEMS.filter((q) => q.book === book).map((q) => q.chapter))].sort((a, b) => a - b);
}

/** How many questions a selection has, and whether it can fill a match plus a tiebreak. */
export function selectionStatus(sel: ClueSelection) {
  const count = poolForSelection(BANK_ITEMS, sel).length;
  const needed = neededForMatch();
  return { count, needed, enough: count >= needed };
}

export const DEFAULT_SELECTION: ClueSelection = { book: "genesis", chapters: "all", level: "beginner" };

/** A selection from anywhere (a request body, saved state) made safe: only real chapters and levels. */
export function cleanSelection(raw: unknown): ClueSelection {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const book = typeof r.book === "string" && chaptersWithQuestions(r.book).length ? r.book : "genesis";
  const level = r.level === "medium" ? "medium" : "beginner";
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

/** Plain words for a selection, e.g. "Genesis 29, 30 · Beginner". */
export function selectionLabel(sel: ClueSelection) {
  const book = sel.book.charAt(0).toUpperCase() + sel.book.slice(1);
  const chapters = sel.chapters === "all" ? "All chapters" : sel.chapters.length === 1 ? `Chapter ${sel.chapters[0]}` : `Chapters ${sel.chapters.join(", ")}`;
  return `${book} · ${chapters} · ${sel.level === "beginner" ? "Beginner" : "Medium"}`;
}
