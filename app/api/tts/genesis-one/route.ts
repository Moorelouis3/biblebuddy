import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { GENESIS_ONE_OFFICIAL_NOTES } from "@/lib/genesisOneOfficialNotes";
import type { GenesisOneTtsKind } from "@/lib/genesisOneTts";
import { cleanTextForTts } from "@/lib/ttsSpeechText";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BUCKET = "tts-audio";
const CACHE_VERSION = "v3";
const VOICE = "onyx";
const KINDS: GenesisOneTtsKind[] = ["intro", "verses", "notes"];
const MAX_TTS_CHUNK_LENGTH = 3400;
type SupabaseAdmin = any;

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function audioResponse(bytes: ArrayBuffer | Buffer, source: "cache" | "generated") {
  return new NextResponse(bytes as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
      "X-Bible-Buddy-TTS": source,
      "X-Bible-Buddy-TTS-Provider": "openai",
    },
  });
}

function speechTextHash(text: string) {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

function normalizeBookKey(book: string | null | undefined) {
  return String(book || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

async function getIntroText(supabase: SupabaseAdmin) {
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id, title")
    .eq("title", "The Creation of the World")
    .maybeSingle();

  if (devotionalError) {
    throw new Error(devotionalError.message);
  }

  if (!devotional?.id) {
    throw new Error("The Creation of the World Bible Study was not found.");
  }

  const { data: row, error: dayError } = await supabase
    .from("devotional_days")
    .select("day_title, devotional_text, bible_reading_book, bible_reading_chapter")
    .eq("devotional_id", devotional.id)
    .eq("day_number", 1)
    .maybeSingle();

  if (dayError) {
    throw new Error(dayError.message);
  }

  if (!row?.devotional_text?.trim() || normalizeBookKey(row?.bible_reading_book) !== "genesis" || Number(row?.bible_reading_chapter) !== 1) {
    throw new Error("The Creation of the World Genesis 1 intro text was not found.");
  }

  return cleanTextForTts(`${row.day_title || "Genesis 1 Introduction"}. ${row.devotional_text}`);
}

async function getVersesText(supabase: SupabaseAdmin) {
  const { data } = await supabase
    .from("bible_chapters")
    .select("content_json")
    .eq("chapter", 1)
    .in("book", ["genesis", "Genesis"])
    .limit(1)
    .maybeSingle();

  const verses = ((data as any)?.content_json as any)?.verses;
  if (!Array.isArray(verses) || verses.length === 0) {
    throw new Error("Genesis 1 chapter text was not found.");
  }

  return cleanTextForTts(
    verses
      .map((verse: any) => {
        const number = verse?.verse ?? verse?.num ?? verse?.number;
        return `${number ? `${number}. ` : ""}${verse?.text || ""}`;
      })
      .join(" "),
  );
}

async function getNotesText() {
  return cleanTextForTts(GENESIS_ONE_OFFICIAL_NOTES);
}

async function getSpeechText(kind: GenesisOneTtsKind, supabase: SupabaseAdmin) {
  if (kind === "intro") return getIntroText(supabase);
  if (kind === "verses") return getVersesText(supabase);
  return getNotesText();
}

async function downloadCachedAudio(supabase: SupabaseAdmin, path: string) {
  const { data, error } = await supabase.storage.from(BUCKET).download(path);
  if (error || !data) return null;
  return data.arrayBuffer();
}

async function uploadCachedAudio(supabase: SupabaseAdmin, path: string, audio: Buffer) {
  const upload = await supabase.storage.from(BUCKET).upload(path, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });

  if (!upload.error) return;

  await supabase.storage.createBucket(BUCKET, { public: false }).catch(() => null);
  await supabase.storage.from(BUCKET).upload(path, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });
}

async function generateOpenAiSpeech(text: string) {
  const chunks = chunkSpeechInput(text);
  const audioChunks: Buffer[] = [];

  for (const chunk of chunks) {
    audioChunks.push(await generateOpenAiSpeechChunk(chunk));
  }

  return Buffer.concat(audioChunks);
}

function chunkSpeechInput(text: string) {
  if (text.length <= MAX_TTS_CHUNK_LENGTH) return [text];

  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    const next = `${current} ${trimmed}`.trim();
    if (next.length > MAX_TTS_CHUNK_LENGTH && current) {
      chunks.push(current);
      current = trimmed;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

async function generateOpenAiSpeechChunk(text: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const calmMaleInstructions =
    "Speak in a calm, warm, steady male Bible study narrator voice. Keep the tone peaceful, reverent, clear, and comforting. Use a gentle pace with natural pauses. Do not sound dramatic or theatrical.";

  const primary = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: VOICE,
      input: text,
      instructions: calmMaleInstructions,
      response_format: "mp3",
    }),
  });

  if (primary.ok) {
    return Buffer.from(await primary.arrayBuffer());
  }

  const fallback = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1-hd",
      voice: VOICE,
      input: text,
      response_format: "mp3",
    }),
  });

  if (!fallback.ok) {
    const message = await fallback.text().catch(() => "OpenAI TTS failed.");
    throw new Error(message || "OpenAI TTS failed.");
  }

  return Buffer.from(await fallback.arrayBuffer());
}

export async function GET(request: NextRequest) {
  const kind = request.nextUrl.searchParams.get("kind") as GenesisOneTtsKind | null;
  if (!kind || !KINDS.includes(kind)) {
    return NextResponse.json({ error: "Invalid Genesis 1 TTS kind." }, { status: 400 });
  }

  const supabase = adminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase admin client is not configured." }, { status: 500 });
  }

  try {
    const text = await getSpeechText(kind, supabase);
    const path = `genesis/1/${kind}-${VOICE}-${CACHE_VERSION}-${speechTextHash(text)}.mp3`;
    const cached = await downloadCachedAudio(supabase, path);
    if (cached) {
      return audioResponse(cached, "cache");
    }

    const audio = await generateOpenAiSpeech(text);
    await uploadCachedAudio(supabase, path, audio).catch((error) => {
      console.warn("[GENESIS_ONE_TTS] Could not cache generated audio:", error);
    });
    return audioResponse(audio, "generated");
  } catch (error) {
    console.error("[GENESIS_ONE_TTS] Failed to generate audio:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not generate Genesis 1 audio." },
      { status: 500 },
    );
  }
}
