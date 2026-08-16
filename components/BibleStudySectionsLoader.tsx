"use client";

import { useEffect } from "react";
import type { BibleReaderStudySection } from "../lib/bibleReaderStudyNotes";

/**
 * Fetches a chapter's study notes from the server.
 *
 * Nothing here imports lib/bibleReaderStudyNotes for its value, only its
 * type, which is erased at build time. That is the whole point: importing it
 * put all 482 note files, about 33 MB, into a JavaScript chunk that the
 * bundler preloaded on every chapter of the reader, before a single verse
 * could appear. The notes are data, so they come over the wire as data.
 */
export default function BibleStudySectionsLoader({
  book,
  chapter,
  onLoaded,
}: {
  book: string;
  chapter: number;
  onLoaded: (sections: BibleReaderStudySection[]) => void;
}) {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch(
          `/api/study-notes?book=${encodeURIComponent(book)}&chapter=${chapter}`,
        );
        if (!response.ok) throw new Error(`study notes responded ${response.status}`);

        const data = (await response.json()) as { sections?: BibleReaderStudySection[] };
        if (!cancelled) onLoaded(data.sections || []);
      } catch (error) {
        console.warn("[BIBLE_READER_NOTES] Could not load study sections:", error);
        if (!cancelled) onLoaded([]);
      }
    })();

    return () => {
      cancelled = true;
    };
    // onLoaded is a fresh closure each render; the chapter is what matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, chapter]);

  return null;
}
