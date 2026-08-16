import { GENESIS_ONE_PERSONAL_SECTIONS } from "./genesisOneSource";
import type { BibleReaderStudySection } from "./bibleReaderStudyNotes";

/**
 * Genesis 1's study sections, built from Genesis 1's own notes.
 *
 * lib/bibleReaderStudyNotes is the aggregator for the whole Bible. Importing
 * it pulls in 482 note files and emits a 33 MB chunk, and the bundler
 * preloads that chunk for any route that references it, even behind a dynamic
 * import. So the reader was paying for every chapter's notes before it could
 * show one verse of Genesis 1.
 *
 * lib/genesisOneSource is about 2,000 lines and holds only this chapter, so
 * reading from it directly is the difference between a 33 MB chunk and a
 * small one.
 *
 * The shaping below mirrors makePersonalPhraseSectionForBook in the
 * aggregator for the Genesis range, where phrase bodies are preserved exactly
 * as written rather than reformatted.
 */
export function getGenesisOneStudySections(): BibleReaderStudySection[] {
  return GENESIS_ONE_PERSONAL_SECTIONS.map((section) => ({
    book: "genesis",
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
