import { getGenesisOneTtsSrc } from "./genesisOneTts";

function normalizeBookForRoute(book: string | null | undefined) {
  return String(book || "")
    .trim()
    .toLowerCase()
    .replace(/%20/g, " ")
    .replace(/\s+/g, " ");
}

export function getBibleChapterTtsSrc(
  book: string | null | undefined,
  chapter: number | string | null | undefined,
) {
  const normalizedBook = normalizeBookForRoute(book);
  const chapterNumber = Number(chapter);

  if (!normalizedBook || !Number.isFinite(chapterNumber) || chapterNumber <= 0) {
    return null;
  }

  const legacyGenesisSrc = getGenesisOneTtsSrc("verses", normalizedBook, chapterNumber);
  if (legacyGenesisSrc) {
    return legacyGenesisSrc;
  }

  return `/api/tts/bible-chapter?book=${encodeURIComponent(normalizedBook)}&chapter=${chapterNumber}&v=openai-cache-v1`;
}
