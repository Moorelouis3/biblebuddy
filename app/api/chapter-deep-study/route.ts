import { NextResponse } from "next/server";
import { getApprovedBibleYearDeepStudyMarkdownForChapter } from "../../../lib/bibleYearApprovedDeepStudy";

/**
 * The approved Bible in One Year deep study markdown for a chapter.
 *
 * This lives behind an API route because the helper reaches
 * lib/bibleYearDayOneDeepStudy, which reaches lib/bibleReaderStudyNotes and
 * its 482 note files. Referencing that from the reader, even through a
 * dynamic import, made the bundler preload a 33 MB chunk on every chapter
 * before a verse could show. Kept on the server it costs the reader nothing.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get("book") || "";
  const chapter = Number(searchParams.get("chapter"));

  if (!book || !Number.isFinite(chapter)) {
    return NextResponse.json({ error: "book and chapter are required" }, { status: 400 });
  }

  try {
    const markdown = getApprovedBibleYearDeepStudyMarkdownForChapter(book, chapter);
    return NextResponse.json(
      { markdown },
      {
        headers: {
          // Part of the build, so it cannot go stale between deploys.
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("[CHAPTER_DEEP_STUDY_API] Could not build markdown:", error);
    return NextResponse.json({ markdown: "" }, { status: 200 });
  }
}
