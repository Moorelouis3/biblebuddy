import { GENESIS_ONE_KJV } from "./genesisOneText";

/**
 * Chapters whose King James text ships with the app.
 *
 * A bundled chapter paints the instant its code runs, with no network request
 * at all. Anything not listed here is fetched as normal, which is only
 * slightly slower and is what every chapter did before.
 *
 * This list is deliberately short. Bundling the whole Bible would be far
 * heavier than the wait it saves. It is for the chapters people open most.
 */
const BUNDLED: Record<string, Array<{ verse: number; text: string }>> = {
  "genesis:1": GENESIS_ONE_KJV,
};

export function getBundledChapter(
  book: string | null | undefined,
  chapter: number | null | undefined,
): Array<{ number: number; text: string }> {
  const key = `${String(book || "").trim().toLowerCase().replace(/\s+/g, " ")}:${Number(chapter)}`;
  const verses = BUNDLED[key];
  return verses ? verses.map((v) => ({ number: v.verse, text: v.text })) : [];
}
