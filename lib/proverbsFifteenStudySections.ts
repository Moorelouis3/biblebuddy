import { PROVERBS_FIFTEEN_PERSONAL_SECTIONS } from "./proverbsFifteenSource";
import type { BibleReaderStudySection } from "./bibleReaderStudyNotes";

/**
 * Proverbs 15's study sections, built from Proverbs 15's own notes.
 *
 * Mirrors lib/genesisOneStudySections.ts. lib/bibleReaderStudyNotes is the
 * aggregator for the whole Bible, so nothing the reader loads may import it
 * directly. lib/proverbsFifteenSource holds only this chapter, so reading from
 * it directly keeps this chapter's data small.
 */
export function getProverbsFifteenStudySections(): BibleReaderStudySection[] {
  return PROVERBS_FIFTEEN_PERSONAL_SECTIONS.map((section) => ({
    book: "proverbs",
    chapter: section.chapter,
    startVerse: section.startVerse,
    endVerse: section.endVerse,
    reference: section.reference,
    title: section.title,
    icon: section.icon,
    summary: "",
    preserveExactPhraseFormatting: true,
    categories: [
      {
        id: "key-phrases",
        icon: "💬",
        title: "Key Phrases",
        content: section.phrases.map(([heading, body]) => `${heading}\n\n${body}`),
      },
    ],
  }));
}
