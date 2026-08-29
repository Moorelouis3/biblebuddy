import { NextRequest, NextResponse } from "next/server";
import {
  createBibleChapterTtsAdminClient,
  resolveBibleChapterTtsAudio,
} from "@/lib/bibleChapterTtsAudio";
import type { BibleChapterTtsTranslation } from "@/lib/bibleChapterTts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function audioResponse(bytes: ArrayBuffer | Buffer, source: string, path: string) {
  return new NextResponse(bytes as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": source.startsWith("cache") ? "public, max-age=86400" : "no-store",
      "X-Bible-Buddy-TTS": source,
      "X-Bible-Buddy-TTS-Provider": "openai",
      "X-Bible-Buddy-TTS-Path": path,
    },
  });
}

export async function GET(request: NextRequest) {
  const book = request.nextUrl.searchParams.get("book");
  const chapter = Number(request.nextUrl.searchParams.get("chapter"));
  const rawTranslation = request.nextUrl.searchParams.get("translation");
  const translation: BibleChapterTtsTranslation =
    rawTranslation === "web" || rawTranslation === "asv" ? rawTranslation : "kjv";

  if (!book || !Number.isFinite(chapter) || chapter <= 0) {
    return NextResponse.json({ error: "Invalid Bible chapter TTS request." }, { status: 400 });
  }

  const supabase = createBibleChapterTtsAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase admin client is not configured." }, { status: 500 });
  }

  try {
    const result = await resolveBibleChapterTtsAudio(book, chapter, translation, supabase);

    // Cached audio is handed off as a signed storage URL so the browser streams
    // it straight from Supabase - with range requests, so scrubbing works -
    // instead of pulling every megabyte back through this function on each play.
    if (result.url) {
      return NextResponse.redirect(result.url, {
        status: 302,
        headers: {
          "Cache-Control": "no-store",
          "X-Bible-Buddy-TTS": result.source,
          "X-Bible-Buddy-TTS-Provider": "openai",
          "X-Bible-Buddy-TTS-Path": result.path,
        },
      });
    }

    return audioResponse(result.audio!, result.source, result.path);
  } catch (error) {
    console.error("[BIBLE_CHAPTER_TTS] Failed to load audio:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load Bible chapter audio." },
      { status: 500 },
    );
  }
}
