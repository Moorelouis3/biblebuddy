import { NextRequest, NextResponse } from "next/server";
import {
  createDevotionalOverviewTtsAdminClient,
  ensureDevotionalOverviewTtsAudio,
} from "@/lib/devotionalOverviewTtsAudio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function audioResponse(bytes: ArrayBuffer | Buffer, source: "cache" | "generated", path: string) {
  return new NextResponse(bytes as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": source === "cache" ? "public, max-age=86400" : "no-store",
      "X-Bible-Buddy-TTS": source,
      "X-Bible-Buddy-TTS-Provider": "openai",
      "X-Bible-Buddy-TTS-Path": path,
    },
  });
}

export async function GET(request: NextRequest) {
  const devotionalId = request.nextUrl.searchParams.get("devotionalId");
  const dayNumber = Number(request.nextUrl.searchParams.get("day"));

  if (!devotionalId || !Number.isFinite(dayNumber) || dayNumber <= 0) {
    return NextResponse.json({ error: "Invalid devotional overview TTS request." }, { status: 400 });
  }

  const supabase = createDevotionalOverviewTtsAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase admin client is not configured." }, { status: 500 });
  }

  try {
    const result = await ensureDevotionalOverviewTtsAudio(devotionalId, dayNumber, supabase);
    return audioResponse(result.audio, result.source, result.path);
  } catch (error) {
    console.error("[DEVOTIONAL_OVERVIEW_TTS] Failed to load audio:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load devotional overview audio." },
      { status: 500 },
    );
  }
}
