import { NextRequest, NextResponse } from "next/server";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "@/lib/bibleInOneYearPlan";
import { DAY_SCRIPTS } from "@/lib/bibleYearDayScripts";

/**
 * A Bible in One Year day's lesson, for the days the app does not carry
 * (Louis, 2026-10-17: "someone told me day 106 don't work").
 *
 * They were right. BIBLE_YEAR_DAY_CONTENT stops at day 105, and the reader
 * needs a lesson AND an audio entry or it falls through to a different page -
 * so days 106 to 365 showed the wrong thing. The audio has existed the whole
 * time: all 365 folders are in the tts-audio bucket and the path is worked out
 * from the day number, not looked up.
 *
 * The writing exists too, as the narration scripts the audio was made from.
 * This turns one of those into the lesson shape the reader already knows.
 *
 * It is a route rather than an import because the scripts are about 2.5MB of
 * text across 364 modules. Pulling that into the dashboard bundle to reach one
 * day would make every page slower for everybody.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(text: string) {
  return text.replace(/\s*\[(pause|beat|music|sfx)[^\]]*\]\s*/gi, " ").replace(/\s+/g, " ").trim();
}

export async function GET(_request: NextRequest, context: { params: Promise<{ day: string }> }) {
  const { day } = await context.params;
  const dayNumber = Number(day);
  if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 365) {
    return NextResponse.json({ error: "Day must be 1 to 365." }, { status: 400 });
  }

  const script = DAY_SCRIPTS[dayNumber];
  if (!script) {
    return NextResponse.json({ error: "No script for that day." }, { status: 404 });
  }

  const planDay = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((item) => item.dayNumber === dayNumber);

  const lesson = {
    dayNumber,
    title: script.title,
    reference: planDay?.reference || script.blocks[0]?.reference || "",
    // The reader prints this beside the play button. The scripts do not carry
    // a duration, and guessing a precise one would be worse than a range.
    estimatedListenTime: "about 15 min",
    // opening and closing are [text, pauseMs] pairs - the pause is a direction
    // to the narrator and means nothing on screen.
    opening: script.opening.map(([text]) => clean(text)).filter(Boolean),
    sections: script.blocks.map((block) => ({
      heading: block.reference,
      // Exactly the shape the reader's verse lookup expects.
      verseBlock: {
        reference: block.reference,
        chapter: block.chapter,
        startVerse: block.startVerse,
        endVerse: block.endVerse,
      },
      teaching: block.teaching.map(clean).filter(Boolean),
    })),
    closing: script.closing.map(([text]) => clean(text)).filter(Boolean),
  };

  return NextResponse.json(
    { lesson },
    // The scripts only change when a day is rewritten, which is rare.
    { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } },
  );
}
