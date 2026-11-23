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
 * with a calm middle where the question sits. Which one follows the first
 * chapter played, so a chapter keeps its scene. Genesis keeps its campsite.
 */
const MATCH_SCENES: Record<string, number> = {
  exodus: 12,
  leviticus: 10,
  numbers: 10,
  deuteronomy: 10,
  joshua: 10,
  judges: 10,
  ruth: 10,
  "1-samuel": 10,
};

/** The board scene for a game, from its selection keys (book, level, chapters). */
export const sceneFor = (deckIds: string[] | undefined): ClueScene => {
  const keys = deckIds || [];
  const book = keys.find((k) => !k.includes(":"));
  const boards = book ? MATCH_SCENES[book] : undefined;
  if (book && boards) {
    const ch = Number(keys.find((k) => k.startsWith("chapters:"))?.slice(9).split(",")[0]) || 1;
    const n = String(((ch - 1) % boards) + 1).padStart(2, "0");
    const dir = `/games/match/boards/${book}-${n}`;
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
