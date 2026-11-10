import { NextRequest, NextResponse } from "next/server";
import { getBibleReaderStudySections } from "@/lib/bibleReaderStudyNotes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// The chapter study notes, for Content Buddy.
//
// Louis, 2026-11-10: "Add the authenticated Bible Buddy insights endpoint so
// Content Buddy can access the existing chapter notes reliably from Railway."
//
// The notes live in lib/bibleReaderStudyNotes.ts - 791KB importing 1,285
// per-chapter source files - and they are resolved at build time, so there is
// no file Railway could read even if it had the repo. Content Buddy's
// bibleChapterNotes.js currently gets at them by shelling out to `npx tsx`
// against the repo folder on Louis's PC, which works at his desk and nowhere
// else, and not at all at 3am.
//
// This calls getBibleReaderStudySections - the very function the Bible Reader
// itself calls - so what ends up on Skool and Substack is exactly what a real
// user sees in the app, not a second parse of the same source that could drift
// away from it.

// Same shared secret as /api/stats/second-brain, and the same fail-CLOSED
// rule: with no secret configured this is unreachable rather than open. The
// cron routes deliberately fail open because a missing secret there only means
// a post goes out; here it would mean handing the whole notes library to
// anyone who asked.
function isAuthorized(request: NextRequest) {
  const secret = process.env.SECOND_BRAIN_STATS_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const book = request.nextUrl.searchParams.get("book");
  const chapterRaw = request.nextUrl.searchParams.get("chapter");
  if (!book || !chapterRaw) {
    return NextResponse.json(
      { error: "Pass book and chapter, e.g. ?book=Joshua&chapter=6." },
      { status: 400 },
    );
  }

  const chapter = Number(chapterRaw);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > 150) {
    return NextResponse.json({ error: "chapter must be a whole number." }, { status: 400 });
  }

  // getBibleReaderStudySections normalises the book name itself, so "joshua",
  // "Joshua" and "1 samuel" all land in the same place.
  const sections = getBibleReaderStudySections(book, chapter);

  // An empty result is a real answer, not an error: 1,285 chapters are covered
  // and the rest are not written yet. Content Buddy needs to tell those apart
  // so it can move to the next chapter instead of retrying this one forever.
  return NextResponse.json({
    book,
    chapter,
    covered: sections.length > 0,
    sections: sections.map((section) => ({
      reference: section.reference,
      title: section.title,
      icon: section.icon,
      summary: section.summary,
      startVerse: section.startVerse,
      endVerse: section.endVerse,
      categories: (section.categories ?? []).map((category) => ({
        id: category.id,
        icon: category.icon,
        title: category.title,
        content: category.content,
        list: category.list ?? false,
      })),
    })),
  });
}
