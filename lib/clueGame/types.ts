/**
 * Bible Clue Game, presented by Bible Buddy (approved for 1.0 on 2026-11-22).
 * Design and the full 52-card Genesis roster live on the Louis OS Notion page
 * "Bible Clue Game — Presented by Bible Buddy".
 *
 * A card is plain data, so a new card (or a whole new book's deck) is a new
 * entry in lib/clueGame/decks/, never a change to the game.
 */

export type ClueCategory = "person" | "place" | "thing";

export type ClueRef = {
  /** As printed on the card: "Genesis 6:13–18", "2 Peter 2:5". */
  label: string;
  /** The book as the Bible reader names it ("Genesis", "2 Peter"). */
  book: string;
  chapter: number;
  /** First and last verse shown when the reference is tapped. */
  verseStart: number;
  verseEnd: number;
};

export type Clue = {
  /** Written in the subject's own voice for people ("I built..."). */
  text: string;
  ref: ClueRef;
};

export type ClueCard = {
  /** Stable id, used in URLs, piles and match logs. Never rename one in use. */
  id: string;
  /** Position in the printed deck. */
  number: number;
  deck: string;
  category: ClueCategory;
  /** What the reveal shows. */
  answer: string;
  /**
   * Other spellings and names that count as right. The answer itself always
   * counts; matching ignores case, punctuation and a leading "the"
   * (lib/clueGame/answer.ts).
   */
  accepted: string[];
  /** The card front, shown only at the reveal. */
  art: string;
  /**
   * Exactly five, hardest first: clues[0] is worth 5 points, clues[4] is
   * worth 1. Clue-writing rule: plain words, the high clues are hard through
   * the detail they ask you to recognise, and giveaway words (ark, flood...)
   * are kept for the 1-point clue.
   */
  clues: [Clue, Clue, Clue, Clue, Clue];
};

export type ClueDeck = {
  id: string;
  name: string;
  /** The deck's table colour family (Genesis is green). */
  theme: "genesis";
  cards: ClueCard[];
};
