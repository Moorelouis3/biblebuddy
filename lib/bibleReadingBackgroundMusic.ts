export const BIBLE_READING_BACKGROUND_TRACKS = [
  "/audio/background/bible-reading-1.mp3",
  "/audio/background/bible-reading-2.mp3",
  "/audio/background/bible-reading-3.mp3",
  "/audio/background/bible-reading-4.mp3",
  "/audio/background/bible-reading-5.mp3",
];

export const BIBLE_READING_BACKGROUND_VOLUME = 0.1;

function normalizeBook(book: string | null | undefined) {
  return String(book || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

export function getBibleReadingBackgroundTracks(book: string | null | undefined, chapter: number | string | null | undefined) {
  if (normalizeBook(book) === "genesis" && Number(chapter) === 1) {
    return BIBLE_READING_BACKGROUND_TRACKS;
  }
  return undefined;
}
