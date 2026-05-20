import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { GENESIS_ONE_OFFICIAL_NOTES } from "./genesisOneOfficialNotes";
import type { GenesisOneTtsKind } from "./genesisOneTts";
import { cleanTextForTts } from "./ttsSpeechText";

export const GENESIS_ONE_TTS_BUCKET = "tts-audio";
export const GENESIS_ONE_TTS_CACHE_VERSION = "v3";
export const GENESIS_ONE_TTS_VOICE = "onyx";
export const GENESIS_ONE_TTS_KINDS: GenesisOneTtsKind[] = ["intro", "verses", "notes"];

const MAX_TTS_CHUNK_LENGTH = 3400;
type SupabaseAdmin = any;

export function createGenesisOneTtsAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
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

  if (devotionalError) throw new Error(devotionalError.message);
  if (!devotional?.id) throw new Error("The Creation of the World Bible Study was not found.");

  const { data: row, error: dayError } = await supabase
    .from("devotional_days")
    .select("day_title, devotional_text, bible_reading_book, bible_reading_chapter")
    .eq("devotional_id", devotional.id)
    .eq("day_number", 1)
    .maybeSingle();

  if (dayError) throw new Error(dayError.message);

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

export async function getGenesisOneSpeechText(kind: GenesisOneTtsKind, supabase: SupabaseAdmin) {
  if (kind === "intro") return getIntroText(supabase);
  if (kind === "verses") return getVersesText(supabase);
  return getNotesText();
}

export function getGenesisOneTtsPath(kind: GenesisOneTtsKind, text: string) {
  return `genesis/1/${kind}-${GENESIS_ONE_TTS_VOICE}-${GENESIS_ONE_TTS_CACHE_VERSION}-${speechTextHash(text)}.mp3`;
}

export async function downloadCachedGenesisOneAudio(supabase: SupabaseAdmin, path: string) {
  const { data, error } = await supabase.storage.from(GENESIS_ONE_TTS_BUCKET).download(path);
  if (error || !data) return null;
  return data.arrayBuffer();
}

export async function uploadCachedGenesisOneAudio(supabase: SupabaseAdmin, path: string, audio: Buffer) {
  const upload = await supabase.storage.from(GENESIS_ONE_TTS_BUCKET).upload(path, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });

  if (!upload.error) return;

  await supabase.storage.createBucket(GENESIS_ONE_TTS_BUCKET, { public: false }).catch(() => null);
  await supabase.storage.from(GENESIS_ONE_TTS_BUCKET).upload(path, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });
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
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

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
      voice: GENESIS_ONE_TTS_VOICE,
      input: text,
      instructions: calmMaleInstructions,
      response_format: "mp3",
    }),
  });

  if (primary.ok) return Buffer.from(await primary.arrayBuffer());

  const fallback = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1-hd",
      voice: GENESIS_ONE_TTS_VOICE,
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

export async function generateOpenAiSpeech(text: string) {
  const chunks = chunkSpeechInput(text);
  const audioChunks: Buffer[] = [];

  for (const chunk of chunks) {
    audioChunks.push(await generateOpenAiSpeechChunk(chunk));
  }

  return Buffer.concat(audioChunks);
}

export async function ensureGenesisOneTtsAudio(kind: GenesisOneTtsKind, supabase: SupabaseAdmin, force = false) {
  const text = await getGenesisOneSpeechText(kind, supabase);
  const path = getGenesisOneTtsPath(kind, text);

  if (!force) {
    const cached = await downloadCachedGenesisOneAudio(supabase, path);
    if (cached) return { audio: Buffer.from(cached), path, source: "cache" as const, textLength: text.length };
  }

  const audio = await generateOpenAiSpeech(text);
  await uploadCachedGenesisOneAudio(supabase, path, audio);
  return { audio, path, source: "generated" as const, textLength: text.length };
}
