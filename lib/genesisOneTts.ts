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

export function getGenesisOneTtsSrc(
  kind: GenesisOneTtsKind,
  book: string | null | undefined,
  chapter: number | string | null | undefined,
) {
  if (!isGenesisOne(book, chapter)) return null;
  return `/api/tts/genesis-one?kind=${kind}`;
}
