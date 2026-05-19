import { PROVERBS_ONE_NOTES } from "./proverbsOneNotes";
import { PROVERBS_TWO_NOTES } from "./proverbsTwoNotes";
import { PROVERBS_THREE_NOTES } from "./proverbsThreeNotes";
import { GENESIS_ONE_OFFICIAL_NOTES } from "./genesisOneOfficialNotes";
import { GENESIS_TWO_OFFICIAL_NOTES } from "./genesisTwoOfficialNotes";
import { GENESIS_THREE_OFFICIAL_NOTES } from "./genesisThreeOfficialNotes";
import { GENESIS_FOUR_OFFICIAL_NOTES } from "./genesisFourOfficialNotes";

const PROVERBS_FALLBACK_NOTES: Record<number, string> = {
  1: PROVERBS_ONE_NOTES,
  2: PROVERBS_TWO_NOTES,
  3: PROVERBS_THREE_NOTES,
};

export function getProverbsChapterNotesFallback(book: string | null | undefined, chapter: number | null | undefined) {
  if (!book || !chapter) return null;
  const bookKey = book.toLowerCase().trim();
  if (bookKey === "genesis" && chapter === 1) return GENESIS_ONE_OFFICIAL_NOTES;
  if (bookKey === "genesis" && chapter === 2) return GENESIS_TWO_OFFICIAL_NOTES;
  if (bookKey === "genesis" && chapter === 3) return GENESIS_THREE_OFFICIAL_NOTES;
  if (bookKey === "genesis" && chapter === 4) return GENESIS_FOUR_OFFICIAL_NOTES;
  if (bookKey !== "proverbs") return null;
  return PROVERBS_FALLBACK_NOTES[chapter] || null;
}

export async function getChapterNotesFallback(book: string | null | undefined, chapter: number | null | undefined) {
  return getProverbsChapterNotesFallback(book, chapter);
}

export async function withNotesTimeout<T>(request: PromiseLike<T>, timeoutMs = 6500): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      Promise.resolve(request),
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error("Notes request timed out.")), timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}
