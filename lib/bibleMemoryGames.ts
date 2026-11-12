/**
 * Bible Memory: the game rules, with nothing else in the file (2026-11-12).
 *
 * Everything here is a plain function of its inputs: no Supabase, no window,
 * no clock it did not get passed. That is what lets scripts/verify-memory.ts
 * play thousands of rounds offline and prove the three promises the games
 * make: one valid answer, repeated words never marked wrong, and no verse
 * called anything grander than it has earned.
 *
 * The saving and loading lives in lib/bibleMemory.ts.
 */

import { BIBLE_BOOKS } from "./bibleBookChapters";

export type MemoryVerse = {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  verse_end: number | null;
  translation: string;
  verse_text: string;
  level: number;
  correct_count: number;
  mistake_count: number;
  last_practised_at: string | null;
  created_at: string;
};

export type Rng = () => number;

export const SESSION_LENGTH = 5;
export const MAX_LEVEL = 3;

/**
 * Days a verse rests before it comes back, by level. Level 0 does not rest:
 * a verse somebody just got wrong should be in the very next session.
 */
export const REVIEW_WAIT_DAYS = [0, 1, 3, 7] as const;

const DAY_MS = 24 * 60 * 60 * 1000;

// ───────────────────────── references and text ─────────────────────────

/** "genesis", "1-samuel", "Psalm" -> "Genesis", "1 Samuel", "Psalms". */
export function canonicalBookName(input: string | null | undefined): string {
  const cleaned = String(input || "").trim().replace(/[-_]+/g, " ").replace(/\s+/g, " ");
  const lower = cleaned.toLowerCase();
  if (lower === "psalm") return "Psalms";
  if (lower === "song of songs") return "Song of Solomon";
  const hit = BIBLE_BOOKS.find((book) => book.toLowerCase() === lower);
  if (hit) return hit;
  return cleaned.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

export function formatReference(verse: Pick<MemoryVerse, "book" | "chapter" | "verse" | "verse_end">): string {
  const range = verse.verse_end && verse.verse_end > verse.verse ? `-${verse.verse_end}` : "";
  return `${verse.book} ${verse.chapter}:${verse.verse}${range}`;
}

/** The KJV files carry line breaks inside a verse. One line, single spaces. */
export function cleanVerseText(text: string | null | undefined): string {
  return String(text || "").replace(/\s+/g, " ").trim();
}

/** What two words are compared by: letters and digits only, lower case. */
export function normalizeWord(word: string): string {
  return word.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** The word as shown on a tile: its own letters, punctuation taken off the ends. */
export function displayWord(word: string): string {
  return word.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "");
}

/**
 * The verse as words, punctuation still attached. A scrap with no letters in
 * it (a lone dash) joins the word before it so it can never become a tile.
 */
export function tokenize(text: string): string[] {
  const tokens: string[] = [];
  for (const piece of cleanVerseText(text).split(" ")) {
    if (!piece) continue;
    if (!normalizeWord(piece) && tokens.length) {
      tokens[tokens.length - 1] = `${tokens[tokens.length - 1]} ${piece}`;
      continue;
    }
    if (normalizeWord(piece)) tokens.push(piece);
  }
  return tokens;
}

export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

// ───────────────────────── progress and review ─────────────────────────

export type MemoryLabel = "New" | "Practising" | "Ready for review";

function clampLevel(level: number) {
  return Math.min(MAX_LEVEL, Math.max(0, Math.round(Number(level) || 0)));
}

/** Has this verse rested long enough to be asked again? */
export function isDue(verse: Pick<MemoryVerse, "level" | "last_practised_at">, now: Date): boolean {
  if (!verse.last_practised_at) return true;
  const last = Date.parse(verse.last_practised_at);
  if (!Number.isFinite(last)) return true;
  return now.getTime() >= last + REVIEW_WAIT_DAYS[clampLevel(verse.level)] * DAY_MS;
}

/**
 * Deliberately modest. Nothing here says "memorized": a few right taps on a
 * multiple-choice screen is practice, not a verse known by heart.
 */
export function memoryLabel(verse: Pick<MemoryVerse, "level" | "last_practised_at">, now: Date): MemoryLabel {
  if (!verse.last_practised_at) return "New";
  if (clampLevel(verse.level) >= 1 && isDue(verse, now)) return "Ready for review";
  return "Practising";
}

/**
 * Which verses a session should ask about, most in need first: verses that
 * are due before verses still resting, then the shakiest, then the ones left
 * alone longest.
 */
export function orderForPractice(verses: readonly MemoryVerse[], now: Date): MemoryVerse[] {
  const lastTime = (verse: MemoryVerse) => (verse.last_practised_at ? Date.parse(verse.last_practised_at) || 0 : 0);
  return verses.slice().sort((a, b) => {
    const dueA = isDue(a, now) ? 0 : 1;
    const dueB = isDue(b, now) ? 0 : 1;
    if (dueA !== dueB) return dueA - dueB;
    if (clampLevel(a.level) !== clampLevel(b.level)) return clampLevel(a.level) - clampLevel(b.level);
    return lastTime(a) - lastTime(b);
  });
}

/** One clean session moves a verse up a level; any mistake moves it down one. */
export function nextLevel(level: number, hadMistake: boolean): number {
  return clampLevel(clampLevel(level) + (hadMistake ? -1 : 1));
}

// ───────────────────────── game 1: fill in the blank ─────────────────────────

export type FillBlank = {
  /** Position in `tokens`. */
  index: number;
  /** The missing word as it should be shown once revealed. */
  answer: string;
  /** Four words to choose from; exactly one matches the answer. */
  choices: string[];
};

export type FillQuestion = {
  type: "fill";
  verseId: string;
  reference: string;
  translation: string;
  tokens: string[];
  blanks: FillBlank[];
};

// Too small or too common to be worth asking for, and too easy to guess.
const SMALL_WORDS = new Set([
  "the", "and", "that", "unto", "with", "for", "but", "not", "his", "her", "him", "they", "them", "thee", "thou",
  "thy", "you", "your", "our", "are", "was", "were", "shall", "will", "have", "hath", "had", "from", "this", "all",
  "which", "who", "whom", "when", "then", "there", "their", "into", "upon", "also", "said", "saith", "what",
]);

// Real Bible words, used to fill out the choices when the person has not
// saved enough other verses to borrow from.
const SPARE_WORDS = [
  "mercy", "glory", "faith", "grace", "spirit", "kingdom", "heaven", "earth", "light", "truth", "peace", "heart",
  "strength", "righteousness", "salvation", "wisdom", "promise", "covenant", "blessing", "people", "servant",
  "shepherd", "mountain", "water", "bread", "voice", "morning", "children", "father", "house", "temple", "prayer",
  "praise", "commandment", "judgment", "hope", "love", "joy", "life", "word", "world", "name", "hand", "way",
];

function blankCountForLevel(level: number) {
  return clampLevel(level) + 1 > 3 ? 3 : clampLevel(level) + 1;
}

/**
 * Words safe to blank: they appear once in the verse, so a blank can only
 * mean one word. Falls back to shorter and then to any word, because "Jesus
 * wept." still deserves a question.
 */
function blankableIndexes(tokens: readonly string[]): number[] {
  const counts = new Map<string, number>();
  for (const token of tokens) counts.set(normalizeWord(token), (counts.get(normalizeWord(token)) || 0) + 1);
  const once = tokens.map((_, index) => index).filter((index) => counts.get(normalizeWord(tokens[index])) === 1);

  const strong = once.filter((index) => {
    const word = normalizeWord(tokens[index]);
    return word.length >= 4 && !SMALL_WORDS.has(word);
  });
  if (strong.length) return strong;
  const medium = once.filter((index) => normalizeWord(tokens[index]).length >= 3);
  if (medium.length) return medium;
  if (once.length) return once;
  return tokens.map((_, index) => index);
}

export function buildFillQuestion(
  verse: MemoryVerse,
  otherVerses: readonly MemoryVerse[],
  rng: Rng = Math.random,
): FillQuestion {
  const tokens = tokenize(verse.verse_text);
  const inThisVerse = new Set(tokens.map(normalizeWord));
  const candidates = blankableIndexes(tokens);
  const wanted = Math.min(blankCountForLevel(verse.level), candidates.length, Math.max(1, tokens.length - 1));
  const chosen = shuffle(candidates, rng).slice(0, Math.max(1, wanted)).sort((a, b) => a - b);

  // Wrong choices never come from this verse: a word that is printed on the
  // screen two lines up is a giveaway, and a word that fits the blank as well
  // as the answer would make two valid answers.
  const borrowed = otherVerses
    .flatMap((other) => tokenize(other.verse_text))
    .map(displayWord)
    .filter((word) => normalizeWord(word).length >= 4 && !SMALL_WORDS.has(normalizeWord(word)));
  const pool: string[] = [];
  const seen = new Set<string>();
  for (const word of [...shuffle(borrowed, rng), ...shuffle(SPARE_WORDS, rng)]) {
    const key = normalizeWord(word);
    if (!key || seen.has(key) || inThisVerse.has(key)) continue;
    seen.add(key);
    pool.push(word.toLowerCase());
  }

  const blanks = chosen.map((index, order) => {
    const answer = displayWord(tokens[index]);
    const wrong = pool.slice(order * 3, order * 3 + 3);
    // The pool is 40-odd words deep, so this only tops up in theory.
    for (const spare of pool) {
      if (wrong.length >= 3) break;
      if (!wrong.includes(spare)) wrong.push(spare);
    }
    // A capital letter must not point at the answer: if the missing word is
    // capitalised ("God", or the first word of the verse), so are the others.
    const capitalised = /^[A-Z]/.test(answer);
    const dressed = wrong.map((word) => (capitalised ? word.charAt(0).toUpperCase() + word.slice(1) : word));
    return { index, answer, choices: shuffle([answer, ...dressed], rng) };
  });

  return {
    type: "fill",
    verseId: verse.id,
    reference: formatReference(verse),
    translation: verse.translation,
    tokens,
    blanks,
  };
}

export function isFillChoiceCorrect(blank: FillBlank, choice: string): boolean {
  return normalizeWord(choice) === normalizeWord(blank.answer);
}

// ───────────────────────── game 2: put the words in order ─────────────────────────

export type OrderTile = { id: number; word: string };

export type OrderQuestion = {
  type: "order";
  verseId: string;
  reference: string;
  translation: string;
  /** The verse before and after the part being rebuilt, shown for context. */
  before: string;
  after: string;
  /** The part to rebuild, in the right order, with its punctuation. */
  answerText: string;
  /** The same words as tiles, in the right order. */
  words: string[];
  /** The tiles, shuffled. */
  bank: OrderTile[];
};

/** More than this many words and the verse is practised a section at a time. */
export const ORDER_MAX_WORDS = 12;

export function buildOrderQuestion(verse: MemoryVerse, rng: Rng = Math.random): OrderQuestion {
  const tokens = tokenize(verse.verse_text);
  let start = 0;
  let end = tokens.length;
  if (tokens.length > ORDER_MAX_WORDS) {
    const sections = Math.ceil(tokens.length / 10);
    const size = Math.ceil(tokens.length / sections);
    const section = Math.min(sections - 1, Math.floor(rng() * sections));
    start = section * size;
    end = Math.min(tokens.length, start + size);
  }

  const part = tokens.slice(start, end);
  const words = part.map(displayWord);
  const tiles = words.map((word, id) => ({ id, word }));

  // A shuffle that lands in the right order is not a question. Try again a
  // few times; a one-word section, or one made of the same word, stays as is.
  let bank = shuffle(tiles, rng);
  for (let attempt = 0; attempt < 8 && isOrderCorrect(bank.map((tile) => tile.word), words) && words.length > 1; attempt += 1) {
    bank = shuffle(tiles, rng);
  }
  if (words.length > 1 && isOrderCorrect(bank.map((tile) => tile.word), words)) bank = tiles.slice().reverse();

  return {
    type: "order",
    verseId: verse.id,
    reference: formatReference(verse),
    translation: verse.translation,
    before: tokens.slice(0, start).join(" "),
    after: tokens.slice(end).join(" "),
    answerText: part.join(" "),
    words,
    bank,
  };
}

/**
 * Compared word by word on letters alone, so "The" and "the" are the same
 * tile and it never matters which of two identical words went first.
 */
export function isOrderCorrect(placed: readonly string[], words: readonly string[]): boolean {
  if (placed.length !== words.length) return false;
  return placed.every((word, index) => normalizeWord(word) === normalizeWord(words[index]));
}

// ───────────────────────── game 3: match the reference ─────────────────────────

export type ReferenceQuestion = {
  type: "reference";
  verseId: string;
  translation: string;
  text: string;
  options: string[];
  answer: string;
};

// Real references, used as wrong choices when the person has not saved three
// other verses yet. Every one of these exists in the Bible.
export const WELL_KNOWN_REFERENCES = [
  "Genesis 1:1", "Exodus 20:12", "Joshua 1:9", "Psalms 23:1", "Psalms 46:10", "Psalms 119:105", "Proverbs 3:5",
  "Proverbs 22:6", "Isaiah 40:31", "Isaiah 41:10", "Jeremiah 29:11", "Micah 6:8", "Matthew 5:16", "Matthew 6:33",
  "Matthew 11:28", "Matthew 28:19", "Mark 10:27", "Luke 6:31", "John 1:1", "John 3:16", "John 14:6", "Acts 1:8",
  "Romans 3:23", "Romans 6:23", "Romans 8:28", "Romans 12:2", "1 Corinthians 13:4", "2 Corinthians 5:17",
  "Galatians 5:22", "Ephesians 2:8", "Philippians 4:13", "Colossians 3:23", "2 Timothy 1:7", "Hebrews 11:1",
  "James 1:5", "1 Peter 5:7", "1 John 4:19", "Revelation 3:20",
];

export function buildReferenceQuestion(
  verse: MemoryVerse,
  otherVerses: readonly MemoryVerse[],
  rng: Rng = Math.random,
): ReferenceQuestion {
  const answer = formatReference(verse);
  const sameChapter = `${verse.book} ${verse.chapter}:`;
  const wrong: string[] = [];
  const add = (reference: string) => {
    // Another verse from the same chapter is left out: when the saved verse is
    // a range, a neighbour could sit inside it and be right as well.
    if (reference === answer || reference.startsWith(sameChapter) || wrong.includes(reference)) return;
    wrong.push(reference);
  };
  for (const other of shuffle(otherVerses, rng)) add(formatReference(other));
  for (const reference of shuffle(WELL_KNOWN_REFERENCES, rng)) {
    if (wrong.length >= 3) break;
    add(reference);
  }

  return {
    type: "reference",
    verseId: verse.id,
    translation: verse.translation,
    text: cleanVerseText(verse.verse_text),
    options: shuffle([answer, ...wrong.slice(0, 3)], rng),
    answer,
  };
}

// ───────────────────────── a session ─────────────────────────

export type MemoryQuestion = FillQuestion | OrderQuestion | ReferenceQuestion;

const GAME_ORDER: Array<MemoryQuestion["type"]> = ["fill", "order", "reference"];

/**
 * Five questions. With five or more verses saved, the five most in need get
 * one each. With fewer, they take turns, and a verse that comes round again
 * meets a different game - so one saved verse is still a full session.
 */
export function buildSession(verses: readonly MemoryVerse[], now: Date, rng: Rng = Math.random): MemoryQuestion[] {
  if (!verses.length) return [];
  const ordered = orderForPractice(verses, now).slice(0, SESSION_LENGTH);
  const firstGame = Math.floor(rng() * GAME_ORDER.length);

  const questions: MemoryQuestion[] = [];
  for (let index = 0; index < SESSION_LENGTH; index += 1) {
    const verse = ordered[index % ordered.length];
    const others = verses.filter((other) => other.id !== verse.id);
    const game = GAME_ORDER[(firstGame + index) % GAME_ORDER.length];
    if (game === "fill") questions.push(buildFillQuestion(verse, others, rng));
    else if (game === "order") questions.push(buildOrderQuestion(verse, rng));
    else questions.push(buildReferenceQuestion(verse, others, rng));
  }
  return questions;
}

export type AnswerResult = { verseId: string; correct: boolean };

export type VerseOutcome = {
  verseId: string;
  correct: number;
  mistakes: number;
  level: number;
};

/** What a finished session does to each verse it touched. */
export function summariseSession(verses: readonly MemoryVerse[], results: readonly AnswerResult[]): VerseOutcome[] {
  const outcomes: VerseOutcome[] = [];
  for (const verse of verses) {
    const mine = results.filter((result) => result.verseId === verse.id);
    if (!mine.length) continue;
    const mistakes = mine.filter((result) => !result.correct).length;
    outcomes.push({
      verseId: verse.id,
      correct: mine.length - mistakes,
      mistakes,
      level: nextLevel(verse.level, mistakes > 0),
    });
  }
  return outcomes;
}
