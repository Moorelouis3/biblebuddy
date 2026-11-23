/**
 * Bible Clue Game, presented by Bible Buddy (approved for 1.0 on 2026-11-22).
 * Design, the 52-card Genesis roster and every rule live on the Louis OS
 * Notion page "Bible Clue Game — Presented by Bible Buddy".
 *
 * A card is plain data, so a new card (or a whole new book's deck) is a new
 * entry in lib/clueGame/decks/, never a change to the game.
 */

/** Player-facing: Person, Place, Keyword ("Things" was renamed 2026-11-22). */
export type ClueCategory = "person" | "place" | "keyword";

export type ClueRef = {
  /** As shown: "Genesis 6:13–18", "2 Peter 2:5". */
  label: string;
  /** The book as the Bible reader names it ("Genesis", "2 Peter"). */
  book: string;
  chapter: number;
  /** First and last verse shown when the reference is tapped. */
  verseStart: number;
  verseEnd: number;
};

export type Clue = {
  /** People speak in the first person ("I built..."); places and keywords too ("I was hidden..."). */
  text: string;
  ref: ClueRef;
};

export type ClueArt = {
  /** Transparent solid silhouette, shown while guessing. Missing → category silhouette. */
  mystery?: string;
  /** Full-colour illustration, shown at the reveal and on Study This Card. Missing → neutral fallback. */
  reveal?: string;
};

export type ClueCard = {
  /** Stable id, used in URLs, piles, challenges and logs. Never rename one in use. */
  id: string;
  /** Position in the numbered roster. */
  number: number;
  deck: string;
  category: ClueCategory;
  /** What the reveal shows. */
  answer: string;
  /** Other names and spellings that count as right (lib/clueGame/answer.ts). */
  accepted: string[];
  art: ClueArt;
  /**
   * Exactly five, hardest first: clues[0] is worth 5 points, clues[4] is
   * worth 1. Each clue noticeably easier than the one before; names that
   * give the answer away (Seth for Adam, ark for Noah) only in the low clues.
   */
  clues: [Clue, Clue, Clue, Clue, Clue];
  /**
   * Optional extra 5-point clues. A solo round may pick one; a shared
   * challenge locks the exact one everybody sees.
   */
  altTopClues?: Clue[];
  /** One short paragraph for Study This Card, ending with its references. */
  teaching: string;
  /**
   * The card's multiple-choice question (Louis, 2026-11-22: one short clue,
   * four choices, 10 seconds). Optional only while the deck is being filled.
   */
  quiz?: ClueQuiz;
  /** A verified existing Bible Buddy page for "Explore X's Story". */
  study?: { label: string; href: string };
};

export type ClueDeck = {
  id: string;
  name: string;
  /** Old or New Testament, for the deck picker. */
  testament: "old" | "new";
  /** Playable now; others show as Coming Soon. */
  available: boolean;
  /** Tile colour family. */
  color: string;
  cards: ClueCard[];
  /** The shared face-down back for the draw pile. */
  cardBack?: string;
  /** The picture on its Choose Your Deck tile. */
  tile?: string;
  /** The scene the game board floats over: portrait for phones, wide for desktop. */
  scene?: ClueScene;
};

export type ClueScene = { phone: string; desktop: string };

/**
 * One multiple-choice question: a short clue, four short choices (exactly one
 * right), and the reveal (a one-sentence explanation and the exact verse).
 * Written to be read on a phone in 10 seconds.
 */
export type ClueQuiz = {
  /** e.g. "I was Leah’s second son. Who am I?" (under ~90 characters). */
  question: string;
  /** Four choices, short (under ~24 characters each). */
  choices: [string, string, string, string];
  /** Index of the right choice in `choices` (the game shuffles the order). */
  answer: 0 | 1 | 2 | 3;
  /** One plain sentence shown at the reveal. */
  explanation: string;
  /** The exact verse(s) the question comes from. */
  ref: ClueRef;
};

/**
 * The question bank (Louis, 2026-11-22): about 24 questions per chapter, split
 * Beginner / Medium, so players can pick a book, chapters and a difficulty.
 * Each question can point at one of the deck's cards for its art (the mystery
 * silhouette and the reveal); questions without a card show a plain card.
 *
 * Levels (2026-11-23): "beginner" is shown as Easy (the id stays, it is in
 * saved challenges and rooms), then Medium, then Hard ("not super hard":
 * details a careful reader remembers, never trick questions). The target is
 * 15 of each per chapter.
 */
export type ClueLevel = "beginner" | "medium" | "hard";
export const LEVEL_LABEL: Record<ClueLevel, string> = { beginner: "Easy", medium: "Medium", hard: "Hard" };
export const CLUE_LEVELS: ClueLevel[] = ["beginner", "medium", "hard"];
export type ClueQuestion = {
  /** Stable id, e.g. "gen29-m-03". Never reuse one for a different question. */
  id: string;
  book: string;
  chapter: number;
  level: ClueLevel;
  /** What the right answer is: shown on the mystery card before the reveal. */
  category: ClueCategory;
  /** Short enough to read on a phone with the choices in 10 seconds. */
  question: string;
  choices: [string, string, string, string];
  /** Index of the right choice (the game shuffles the display order). */
  answer: 0 | 1 | 2 | 3;
  /** One plain sentence shown at the reveal. */
  explanation: string;
  /** The exact verse(s). */
  ref: ClueRef;
  /** A deck card whose art shows this answer, when there is one. */
  cardId?: string;
};
