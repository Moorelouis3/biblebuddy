import type { GenesisOnePhrase } from "./genesisOneStudyMode";

/**
 * Insight Cards, for any chapter.
 *
 * A chapter gets the Genesis 1 treatment the moment it appears in the
 * registry below with a phrase map. Nothing in the reader checks for a
 * particular book any more.
 *
 * See docs/INSIGHT_CARDS_STANDARD.md for what a chapter's map has to contain
 * and the coverage expected of it.
 *
 * The maps are loaded on demand, one chapter at a time, so adding chapters
 * never grows what a reader downloads.
 */

export type InsightCardPhrase = GenesisOnePhrase;

/** Key used throughout, so casing and spacing never matter. */
export function chapterKey(book: string | null | undefined, chapter: number | null | undefined) {
  return `${String(book || "").trim().toLowerCase().replace(/\s+/g, " ")}:${Number(chapter)}`;
}

/**
 * Chapters that have a phrase map, and how to load it.
 *
 * Add a chapter here and it gains Insight Cards. Nothing else needs editing.
 */
const INSIGHT_CARD_LOADERS: Record<string, () => Promise<InsightCardPhrase[]>> = {
  "genesis:1": () => import("./genesisOneStudyMode").then((m) => m.GENESIS_ONE_PHRASES),
  "proverbs:7": () => import("./proverbsSevenStudyMode").then((m) => m.PROVERBS_SEVEN_PHRASES),
  "proverbs:8": () => import("./proverbsEightStudyMode").then((m) => m.PROVERBS_EIGHT_PHRASES),
  "proverbs:9": () => import("./proverbsNineStudyMode").then((m) => m.PROVERBS_NINE_PHRASES),
  "proverbs:10": () => import("./proverbsTenStudyMode").then((m) => m.PROVERBS_TEN_PHRASES),
  "proverbs:11": () => import("./proverbsElevenStudyMode").then((m) => m.PROVERBS_ELEVEN_PHRASES),
  "proverbs:12": () => import("./proverbsTwelveStudyMode").then((m) => m.PROVERBS_TWELVE_PHRASES),
  "proverbs:13": () => import("./proverbsThirteenStudyMode").then((m) => m.PROVERBS_THIRTEEN_PHRASES),
  "proverbs:14": () => import("./proverbsFourteenStudyMode").then((m) => m.PROVERBS_FOURTEEN_PHRASES),
};

/** Cheap synchronous check, so a route can pick a reader without loading data. */
export function hasInsightCards(book: string | null | undefined, chapter: number | null | undefined) {
  return chapterKey(book, chapter) in INSIGHT_CARD_LOADERS;
}

/** The chapter's phrases, or an empty list if it has none yet. */
export async function loadInsightCards(
  book: string | null | undefined,
  chapter: number | null | undefined,
): Promise<InsightCardPhrase[]> {
  const loader = INSIGHT_CARD_LOADERS[chapterKey(book, chapter)];
  if (!loader) return [];

  try {
    return await loader();
  } catch (error) {
    console.warn("[INSIGHT_CARDS] Could not load phrases:", error);
    return [];
  }
}

/** Stable identity for one Insight Card, used as the open/closed key. */
export function insightCardKey(phrase: InsightCardPhrase) {
  return `${phrase.verse}:${phrase.noteTitle}`;
}

export {
  GENESIS_ONE_PHRASE_COLORS as INSIGHT_CARD_COLORS,
  getGenesisOnePhraseColor as getInsightCardColor,
  getPhraseDisplayTitle as getInsightCardTitle,
  extractPhraseNote,
  findPhraseNoteEntry,
  getPhraseNoteIcon,
} from "./genesisOneStudyMode";
