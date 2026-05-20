export type GenesisOneTtsKind = "intro" | "verses" | "notes";

function normalizeGenesisBook(book: string | null | undefined) {
  return String(book || "")
    .trim()
    .toLowerCase()
    .replace(/%20/g, " ")
    .replace(/[^a-z0-9]+/g, "");
}

export function isGenesisOne(book: string | null | undefined, chapter: number | string | null | undefined) {
  return normalizeGenesisBook(book) === "genesis" && Number(chapter) === 1;
}

export function isGenesisTwo(book: string | null | undefined, chapter: number | string | null | undefined) {
  return normalizeGenesisBook(book) === "genesis" && Number(chapter) === 2;
}

export function getGenesisOneTtsSrc(
  kind: GenesisOneTtsKind,
  book: string | null | undefined,
  chapter: number | string | null | undefined,
) {
  if (kind === "intro" && isGenesisTwo(book, chapter)) {
    return "/audio/genesis/2/intro-onyx-peaceful-rain-cinematic.mp3?v=peaceful-v1";
  }

  if (!isGenesisOne(book, chapter)) return null;
  return `/audio/genesis/1/${kind}-onyx-peaceful-rain-cinematic.mp3?v=peaceful-v1`;
}
