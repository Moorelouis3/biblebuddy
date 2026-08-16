import { NextResponse } from "next/server";
import { getBibleReaderStudySections } from "../../../lib/bibleReaderStudyNotes";

/**
 * Study notes for one chapter, as JSON.
 *
 * The notes are data, not code. Importing lib/bibleReaderStudyNotes from a
 * client component put all 482 note files, about 33 MB, into a JavaScript
 * chunk that the bundler then preloaded on every chapter of the reader. That
 * download happened before a single verse could appear.
 *
 * Served from here the notes stay on the server, and a chapter fetches only
 * its own handful of sections, when it actually needs them.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get("book") || "";
  const chapter = Number(searchParams.get("chapter"));

  if (!book || !Number.isFinite(chapter)) {
    return NextResponse.json({ error: "book and chapter are required" }, { status: 400 });
  }

  try {
    const sections = getBibleReaderStudySections(book, chapter);
    return NextResponse.json(
      { sections },
      {
        headers: {
          // The notes are part of the build, so they cannot go stale between
          // deploys. Let the browser and the edge keep them.
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("[STUDY_NOTES_API] Could not build sections:", error);
    return NextResponse.json({ sections: [] }, { status: 200 });
  }
}
