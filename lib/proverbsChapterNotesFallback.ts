import { PROVERBS_ONE_NOTES } from "./proverbsOneNotes";
import { PROVERBS_TWO_NOTES } from "./proverbsTwoNotes";
import { PROVERBS_THREE_NOTES } from "./proverbsThreeNotes";

const PROVERBS_FALLBACK_NOTES: Record<number, string> = {
  1: PROVERBS_ONE_NOTES,
  2: PROVERBS_TWO_NOTES,
  3: PROVERBS_THREE_NOTES,
};

export function getProverbsChapterNotesFallback(book: string | null | undefined, chapter: number | null | undefined) {
  if (!book || !chapter) return null;
  if (book.toLowerCase().trim() !== "proverbs") return null;
  return PROVERBS_FALLBACK_NOTES[chapter] || null;
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
