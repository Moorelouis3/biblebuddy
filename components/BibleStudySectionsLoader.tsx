"use client";

import { useEffect } from "react";
import { getBibleReaderStudySections, type BibleReaderStudySection } from "../lib/bibleReaderStudyNotes";

/**
 * Loads the whole-Bible study notes for a chapter.
 *
 * This exists purely to keep `lib/bibleReaderStudyNotes` out of the reader's
 * module graph. That aggregator pulls in 482 note files and builds a 33 MB
 * chunk, and the bundler preloads it for any route whose code references it,
 * even behind a dynamic import. Genesis 1 was paying for every other
 * chapter's notes before it could show a single verse.
 *
 * The reader pulls this component in with next/dynamic and only renders it
 * for chapters that actually need the aggregator, so Genesis 1, which reads
 * from its own small notes file, never requests the chunk at all.
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
    onLoaded(getBibleReaderStudySections(book, chapter));
    // onLoaded is a fresh closure each render; the chapter is what matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, chapter]);

  return null;
}
