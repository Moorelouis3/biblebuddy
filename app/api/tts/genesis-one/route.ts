import { NextRequest, NextResponse } from "next/server";
import type { GenesisOneTtsKind } from "@/lib/genesisOneTts";
import {
  createGenesisOneTtsAdminClient,
  ensureGenesisOneTtsAudio,
  GENESIS_ONE_TTS_KINDS,
} from "@/lib/genesisOneTtsAudio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
  const kind = request.nextUrl.searchParams.get("kind") as GenesisOneTtsKind | null;
  if (!kind || !GENESIS_ONE_TTS_KINDS.includes(kind)) {
    return NextResponse.json({ error: "Invalid Genesis 1 TTS kind." }, { status: 400 });
  }

  const supabase = createGenesisOneTtsAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase admin client is not configured." }, { status: 500 });
  }

  try {
    const result = await ensureGenesisOneTtsAudio(kind, supabase);
    return audioResponse(result.audio, result.source, result.path);
  } catch (error) {
    console.error("[GENESIS_ONE_TTS] Failed to load audio:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load Genesis 1 audio." },
      { status: 500 },
    );
  }
}
