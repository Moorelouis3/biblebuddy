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
  "proverbs:15": () => import("./proverbsFifteenStudyMode").then((m) => m.PROVERBS_FIFTEEN_PHRASES),
  "proverbs:16": () => import("./proverbsSixteenStudyMode").then((m) => m.PROVERBS_SIXTEEN_PHRASES),
  "proverbs:17": () => import("./proverbsSeventeenStudyMode").then((m) => m.PROVERBS_SEVENTEEN_PHRASES),
  "proverbs:18": () => import("./proverbsEighteenStudyMode").then((m) => m.PROVERBS_EIGHTEEN_PHRASES),
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

// ─── Derived maps: the Genesis 1 look for every chapter that has notes ────────
//
// A hand-built phrase map (above) is the gold standard, but most chapters do
// not have one. They do have notes, and every phrase note already carries the
// two things a card needs: a heading that is the KJV phrase (in Title Case)
// and a body whose first line makes a preview. What is missing is which verse
// the phrase sits under and the exact KJV characters to underline. Both can be
// recovered by searching the chapter text for the heading, so the map is
// derived here at read time, from the chapter's own sections and verses.
//
// Hand-built maps still win: a chapter in INSIGHT_CARD_LOADERS never derives.

type DerivableSection = {
  startVerse: number;
  endVerse: number;
  categories: Array<{ id: string; content: string[] }>;
};

type DerivableVerse = { number: number; text: string };

const DERIVE_LEADING_EMOJI_RUN = /^(?:[\p{Extended_Pictographic}️‍]+\s*)+/u;
const DERIVE_LEADING_EMOJI = /^([\p{Extended_Pictographic}](?:️|‍[\p{Extended_Pictographic}]️?)*)/u;

/**
 * Lower-case, straighten quotes, drop punctuation, collapse spaces — while
 * remembering, for every normalised character, where it came from in the
 * original string. That is what lets a match in normalised text be turned
 * back into the exact original substring to underline.
 */
function normalizeWithMap(input: string) {
  const straight = input.replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"');
  let out = "";
  const map: number[] = [];
  let lastWasSpace = true;
  for (let i = 0; i < straight.length; i += 1) {
    const ch = straight[i].toLowerCase();
    if (/[a-z0-9']/.test(ch)) {
      out += ch;
      map.push(i);
      lastWasSpace = false;
    } else if (!lastWasSpace) {
      out += " ";
      map.push(i);
      lastWasSpace = true;
    }
  }
  if (out.endsWith(" ")) {
    out = out.slice(0, -1);
    map.pop();
  }
  return { text: out, map };
}

function normalizePlain(input: string) {
  return normalizeWithMap(input).text;
}

/** Find `needle` (normalised) inside a verse and return the original substring. */
function findInVerse(verseText: string, needle: string): string | null {
  const normalized = normalizeWithMap(verseText);
  if (!needle) return null;
  // Whole-word match only, so "he" does not land inside "the".
  const pattern = new RegExp(`(^|\\s)${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=\\s|$)`);
  const match = pattern.exec(normalized.text);
  if (!match) return null;
  const start = match.index + match[1].length;
  const end = start + needle.length - 1;
  const origStart = normalized.map[start];
  const origEnd = normalized.map[end];
  if (origStart === undefined || origEnd === undefined) return null;
  return verseText.slice(origStart, origEnd + 1);
}

function cleanPreviewLine(line: string) {
  return line
    .replace(/\*\*/g, "")
    .replace(/^[-•*]\s+/, "")
    .replace(DERIVE_LEADING_EMOJI_RUN, "")
    .trim();
}

/**
 * Build the phrase map for a chapter from its notes and its verses.
 *
 * For each phrase note: the heading (minus emoji and quotes) is searched for
 * in the verses of its own section first, then the rest of the chapter. If
 * the whole heading is not found, shorter runs of its words are tried (from
 * the end, then from the start) down to three words, so "Without Form And
 * Void" still lands on "without form, and void". A phrase that cannot be
 * placed at all is pinned to the section's first verse with its heading as
 * the underline, so its card still lists in Study Mode.
 */
export function deriveInsightCards(sections: DerivableSection[], rawVerses: DerivableVerse[]): InsightCardPhrase[] {
  if (!sections.length || !rawVerses.length) return [];
  // The reader draws underlines on the verse with its whitespace collapsed
  // (see getVisibleVerseText), so match against that same shape. Fetched KJV
  // text carries line breaks inside verses; an underline copied from it would
  // otherwise miss by one newline.
  const verses = rawVerses.map((v) => ({ number: v.number, text: String(v.text || "").replace(/\s+/g, " ").trim() }));
  const byNumber = new Map(verses.map((v) => [v.number, v] as const));
  const ordered = [...sections].sort((a, b) => a.startVerse - b.startVerse);
  const phrases: InsightCardPhrase[] = [];
  const taken = new Set<string>();

  for (const section of ordered) {
    const entries = section.categories.find((category) => category.id === "key-phrases")?.content || [];
    const own: DerivableVerse[] = [];
    for (let n = section.startVerse; n <= section.endVerse; n += 1) {
      const v = byNumber.get(n);
      if (v) own.push(v);
    }
    const others = verses.filter((v) => v.number < section.startVerse || v.number > section.endVerse);
    const candidates = [...own, ...others];

    for (const entry of entries) {
      const lines = String(entry || "").split("\n");
      const firstLine = (lines[0] || "").trim();
      const icon = firstLine.match(DERIVE_LEADING_EMOJI)?.[1] || "💬";
      const noteTitle = firstLine
        .replace(DERIVE_LEADING_EMOJI_RUN, "")
        .replace(/^["“”']+|["“”']+$/g, "")
        .trim();
      if (!noteTitle) continue;

      const body = lines.slice(1).map((line) => line.trim()).filter(Boolean);
      const preview = cleanPreviewLine(body[0] || "");

      const words = normalizePlain(noteTitle).split(" ").filter(Boolean);
      if (!words.length) continue;
      const minWords = Math.min(3, words.length);

      let placed: { verse: number; underline: string } | null = null;
      // Longest runs first: whole heading, then trimmed from the end, then from the start.
      outer: for (let len = words.length; len >= minWords && !placed; len -= 1) {
        const starts = len === words.length ? [0] : [0, words.length - len];
        for (const startIdx of starts) {
          const needle = words.slice(startIdx, startIdx + len).join(" ");
          for (const verse of candidates) {
            const hit = findInVerse(verse.text, needle);
            if (hit && !taken.has(`${verse.number}:${hit.toLowerCase()}`)) {
              placed = { verse: verse.number, underline: hit };
              break outer;
            }
          }
        }
      }

      const verse = placed?.verse ?? own[0]?.number ?? section.startVerse;
      const underline = placed?.underline ?? noteTitle;
      taken.add(`${verse}:${underline.toLowerCase()}`);
      phrases.push({ verse, noteTitle, icon, underline, preview });
    }
  }

  return phrases.sort((a, b) => a.verse - b.verse);
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
