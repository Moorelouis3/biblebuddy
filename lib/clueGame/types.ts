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
};
