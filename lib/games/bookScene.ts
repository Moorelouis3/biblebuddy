/**
 * The painted scene a game plays over, for any book and chapter of the Bible.
 *
 * One map for every game. Bible Trivia, Bible Word Search and Bible Memory all
 * read it, so a Match board imported for a new book shows up in all three at
 * once (moved here from lib/clueGame/catalog.ts on 2026-11-24).
 *
 * The scenes are the Bible Buddy Match board backgrounds (Louis, 2026-11-23:
 * "cant you use the Backgrounds from match also?"). Each book's boards are
 * matched to the story by their chapters, read from each board-config.json
 * scripture, as [from, to, board]. A chapter gets the board that covers it;
 * otherwise the nearest board before it; before the first board, the first.
 */

export type BookScene = { phone: string; desktop: string };

export const MATCH_SCENES: Record<string, Array<[number, number, number]>> = {
  genesis: [[4, 4, 3], [4, 4, 4], [6, 9, 5], [11, 11, 6], [21, 21, 7], [26, 26, 8], [33, 33, 9], [41, 45, 10], [46, 50, 11]],
  exodus: [[1, 2, 1], [3, 4, 2], [5, 7, 3], [7, 10, 4], [11, 13, 5], [13, 15, 6], [15, 18, 7], [19, 24, 8], [25, 31, 9], [32, 32, 10], [33, 34, 11], [35, 40, 12]],
  leviticus: [[1, 1, 1], [2, 3, 2], [8, 8, 3], [9, 9, 4], [11, 11, 5], [16, 16, 6], [19, 19, 7], [23, 23, 8], [25, 25, 9], [26, 26, 10]],
  numbers: [[1, 2, 1], [9, 10, 2], [11, 11, 3], [13, 14, 4], [16, 17, 5], [20, 20, 6], [21, 21, 7], [22, 24, 8], [27, 27, 9], [33, 34, 10]],
  deuteronomy: [[1, 3, 1], [4, 5, 2], [6, 6, 3], [7, 8, 4], [8, 8, 5], [26, 26, 6], [27, 30, 7], [31, 31, 8], [32, 32, 9], [34, 34, 10]],
  joshua: [[1, 1, 1], [2, 2, 2], [3, 3, 3], [4, 4, 4], [6, 6, 5], [8, 8, 6], [9, 9, 7], [10, 10, 8], [18, 19, 9], [24, 24, 10]],
  judges: [[2, 2, 1], [3, 3, 2], [4, 4, 3], [4, 5, 4], [6, 6, 5], [6, 6, 6], [7, 7, 7], [11, 11, 8], [14, 14, 9], [16, 16, 10]],
  ruth: [[1, 1, 1], [1, 1, 2], [1, 1, 3], [1, 1, 4], [1, 1, 5], [2, 2, 6], [2, 2, 7], [3, 3, 8], [4, 4, 9], [4, 4, 10]],
  "1-samuel": [[1, 1, 1], [1, 2, 2], [3, 3, 3], [6, 6, 4], [7, 7, 5], [9, 10, 6], [16, 16, 7], [17, 17, 8], [20, 20, 9], [24, 24, 10]],
  "2-samuel": [[1, 1, 1], [2, 2, 2], [5, 5, 3], [6, 6, 4], [7, 7, 5], [9, 9, 6], [12, 12, 7], [15, 15, 8], [19, 19, 9], [24, 24, 10]],
  // 1 Chronicles is left out on purpose: its backgrounds are being redone
  // (style audit, 2026-11-24). Add it here when the new art is imported.
};

/** "1 Samuel", "1-samuel", "Song of Solomon" -> "1-samuel", "song-of-solomon". */
export function bookSlug(book: string): string {
  return String(book || "").trim().toLowerCase().replace(/\s+/g, "-");
}

/** The Match board for a chapter of a book (see MATCH_SCENES). */
export function matchBoardFor(book: string, ch: number): number | null {
  const boards = MATCH_SCENES[bookSlug(book)];
  if (!boards) return null;
  const covers = boards.find(([lo, hi]) => ch >= lo && ch <= hi);
  if (covers) return covers[2];
  const before = boards.filter(([lo]) => lo <= ch).pop();
  return (before ?? boards[0])[2];
}

export function boardScene(book: string, board: number): BookScene {
  const dir = `/games/match/boards/${bookSlug(book)}-${String(board).padStart(2, "0")}`;
  return { phone: `${dir}/background-phone.webp`, desktop: `${dir}/background-desktop.webp` };
}

/**
 * Books with no Match boards yet get one of two calm landscapes with no
 * people in them, so a New Testament book never shows an Old Testament story.
 */
const PLAIN_SCENES: BookScene[] = [
  { phone: "/games/match/ui/eden-phone.webp", desktop: "/games/match/ui/eden-desktop.webp" },
  { phone: "/games/match/ui/creation-phone.webp", desktop: "/games/match/ui/creation-desktop.webp" },
];

export function bookScene(book: string, chapter = 1): BookScene {
  const board = matchBoardFor(book, chapter);
  if (board) return boardScene(book, board);
  const slug = bookSlug(book);
  let sum = 0;
  for (const ch of slug) sum += ch.charCodeAt(0);
  return PLAIN_SCENES[sum % PLAIN_SCENES.length];
}

/** True when the book has its own painted boards. */
export function hasOwnScene(book: string): boolean {
  return Boolean(MATCH_SCENES[bookSlug(book)]);
}
