/**
 * Every Bible book as a Bible Clue Game deck (Louis, 2026-11-22: "one deck
 * entry for each of the 66 Bible books, grouped by Old Testament and New
 * Testament"). Only books with finished cards are playable; the rest show as
 * Coming Soon. Genesis is the Beta deck.
 */

import { GENESIS_CARDS } from "./decks/genesis";
import type { ClueCard, ClueDeck, ClueScene } from "./types";

const OLD = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
];
const NEW = [
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
];

/** Tile colours cycle so neighbouring books differ, like the mockup. */
const COLORS = ["#1d5a37", "#1d3f7a", "#7a1f24", "#4a2a7a", "#7a5a1d", "#1d6a6a"];

const slug = (book: string) => book.toLowerCase().replace(/\s+/g, "-");

const TILE_ART = new Set(["genesis", "exodus", "leviticus", "numbers", "deuteronomy", "joshua"]);

const PLAYABLE: Record<string, ClueCard[]> = { genesis: GENESIS_CARDS };

/**
 * Each book sets its own board scene; the board layout is shared (Louis,
 * 2026-11-22). Genesis is the Beersheba campsite: tents and the well.
 */
const SCENES: Record<string, ClueScene> = {
  genesis: { phone: "/games/clue/scenes/genesis-beersheba-phone.webp", desktop: "/games/clue/scenes/genesis-beersheba-desktop.webp" },
};

export const CLUE_DECKS: ClueDeck[] = [...OLD.map((b) => [b, "old"] as const), ...NEW.map((b) => [b, "new"] as const)].map(
  ([book, testament], i) => {
    const id = slug(book);
    const cards = PLAYABLE[id] || [];
    return {
      id,
      name: book,
      testament,
      available: cards.length >= 10,
      color: id === "genesis" ? "#1d5a37" : COLORS[i % COLORS.length],
      cards,
      cardBack: id === "genesis" ? "/games/clue/genesis/art/card-back.webp" : undefined,
      // Tile pictures made so far (Drive "Bible Clue Game → UI"); others show a book.
      tile: TILE_ART.has(id) ? `/games/clue/ui/deck-${id}.webp` : undefined,
      scene: SCENES[id],
    };
  },
);

export const deckById = (id: string) => CLUE_DECKS.find((d) => d.id === id);

/**
 * Each book its own scene (Louis, 2026-11-23: "a different scene for each
 * book"): the Bible Buddy Match board backgrounds, painted for these books,
 * with a calm middle where the question sits. Genesis too (Louis: "cant you
 * use the Backgrounds from match also?").
 *
 * Matched to the story (Louis: "u can match what we have"): each board's
 * chapters, read from its board-config.json scripture, as [from, to, board].
 * A chapter gets the board that covers it; otherwise the nearest board before
 * it in the story; before the first board, the first. Genesis 1-3 and 12-20
 * etc. have no board of their own, so they borrow the one before.
 */
const MATCH_SCENES: Record<string, Array<[number, number, number]>> = {
  genesis: [[4, 4, 3], [4, 4, 4], [6, 9, 5], [11, 11, 6], [21, 21, 7], [26, 26, 8], [33, 33, 9], [41, 45, 10], [46, 50, 11]],
  exodus: [[1, 2, 1], [3, 4, 2], [5, 7, 3], [7, 10, 4], [11, 13, 5], [13, 15, 6], [15, 18, 7], [19, 24, 8], [25, 31, 9], [32, 32, 10], [33, 34, 11], [35, 40, 12]],
  leviticus: [[1, 1, 1], [2, 3, 2], [8, 8, 3], [9, 9, 4], [11, 11, 5], [16, 16, 6], [19, 19, 7], [23, 23, 8], [25, 25, 9], [26, 26, 10]],
  numbers: [[1, 2, 1], [9, 10, 2], [11, 11, 3], [13, 14, 4], [16, 17, 5], [20, 20, 6], [21, 21, 7], [22, 24, 8], [27, 27, 9], [33, 34, 10]],
  deuteronomy: [[1, 3, 1], [4, 5, 2], [6, 6, 3], [7, 8, 4], [8, 8, 5], [26, 26, 6], [27, 30, 7], [31, 31, 8], [32, 32, 9], [34, 34, 10]],
  joshua: [[1, 1, 1], [2, 2, 2], [3, 3, 3], [4, 4, 4], [6, 6, 5], [8, 8, 6], [9, 9, 7], [10, 10, 8], [18, 19, 9], [24, 24, 10]],
  judges: [[2, 2, 1], [3, 3, 2], [4, 4, 3], [4, 5, 4], [6, 6, 5], [6, 6, 6], [7, 7, 7], [11, 11, 8], [14, 14, 9], [16, 16, 10]],
  ruth: [[1, 1, 1], [1, 1, 2], [1, 1, 3], [1, 1, 4], [1, 1, 5], [2, 2, 6], [2, 2, 7], [3, 3, 8], [4, 4, 9], [4, 4, 10]],
  "1-samuel": [[1, 1, 1], [1, 2, 2], [3, 3, 3], [6, 6, 4], [7, 7, 5], [9, 10, 6], [16, 16, 7], [17, 17, 8], [20, 20, 9], [24, 24, 10]],
};

/** The Match board for a chapter of a book (see MATCH_SCENES). */
export function matchBoardFor(book: string, ch: number): number | null {
  const boards = MATCH_SCENES[book];
  if (!boards) return null;
  const covers = boards.find(([lo, hi]) => ch >= lo && ch <= hi);
  if (covers) return covers[2];
  const before = boards.filter(([lo]) => lo <= ch).pop();
  return (before ?? boards[0])[2];
}

/** The board scene for a game, from its selection keys (book, level, chapters). */
export const sceneFor = (deckIds: string[] | undefined): ClueScene => {
  const keys = deckIds || [];
  const book = keys.find((k) => !k.includes(":"));
  // The first chapter played; All Chapters starts the book.
  const ch = Number(keys.find((k) => k.startsWith("chapters:"))?.slice(9).split(",")[0]) || 1;
  const board = book ? matchBoardFor(book, ch) : null;
  if (book && board) {
    const dir = `/games/match/boards/${book}-${String(board).padStart(2, "0")}`;
    return { phone: `${dir}/background-phone.webp`, desktop: `${dir}/background-desktop.webp` };
  }
  return keys.map((id) => deckById(id)?.scene).find(Boolean) || SCENES.genesis;
};

/** Every playable card, by id. Ids are unique across decks (prefix new decks' ids if a name repeats). */
export const ALL_CLUE_CARDS = new Map<string, ClueCard>(
  CLUE_DECKS.flatMap((d) => d.cards).map((c) => [c.id, c] as const),
);

/** The pool for a selection of decks (only playable ones count). */
export function poolFor(deckIds: string[]): ClueCard[] {
  return deckIds.flatMap((id) => {
    const deck = deckById(id);
    return deck?.available ? deck.cards : [];
  });
}

export function deckLabel(deckIds: string[]): string {
  const names = deckIds.map((id) => deckById(id)?.name).filter(Boolean) as string[];
  if (names.length === 0) return "Genesis";
  if (names.length <= 2) return names.join(" & ");
  return `${names.length} books`;
}
