export type BibleChapterTtsTranslation = "kjv" | "web" | "asv";

function normalizeBookForRoute(book: string | null | undefined) {
  return String(book || "")
    .trim()
    .toLowerCase()
    .replace(/%20/g, " ")
    .replace(/\s+/g, " ");
}

function normalizeTranslation(
  translation: string | null | undefined,
): BibleChapterTtsTranslation {
  const normalized = String(translation || "").trim().toLowerCase();
  if (normalized === "web" || normalized === "asv") {
    return normalized;
  }
  return "kjv";
}

export function getBibleChapterTtsSrc(
  book: string | null | undefined,
  chapter: number | string | null | undefined,
  translation: string | null | undefined = "kjv",
) {
  const normalizedBook = normalizeBookForRoute(book);
  const chapterNumber = Number(chapter);
  // No narration exists for the German Bible. Without this the reader would
  // be handed the King James recording to play over Luther's text.
  if (String(translation || "").trim().toLowerCase() === "lut") return null;
  const normalizedTranslation = normalizeTranslation(translation);

  if (!normalizedBook || !Number.isFinite(chapterNumber) || chapterNumber <= 0) {
    return null;
  }

  return `/api/tts/bible-chapter?book=${encodeURIComponent(normalizedBook)}&chapter=${chapterNumber}&translation=${normalizedTranslation}&v=openai-cache-v2`;
}
