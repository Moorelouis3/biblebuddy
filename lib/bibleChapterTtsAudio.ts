import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { cleanTextForTts } from "./ttsSpeechText";

export const BIBLE_CHAPTER_TTS_BUCKET = "tts-audio";
export const BIBLE_CHAPTER_TTS_CACHE_VERSION = "v1";
export const BIBLE_CHAPTER_TTS_VOICE = "onyx";
export const BIBLE_CHAPTER_TTS_KIND = "verses";

const MAX_TTS_CHUNK_LENGTH = 3400;
type SupabaseAdmin = any;

type BibleChapterVerse = {
  verse?: number | string | null;
  num?: number | string | null;
  number?: number | string | null;
  text?: string | null;
};

function normalizeBookForDb(book: string | null | undefined) {
  return String(book || "")
    .trim()
    .toLowerCase()
    .replace(/%20/g, " ")
    .replace(/\s+/g, " ");
}

function normalizeBookForPath(book: string | null | undefined) {
  return normalizeBookForDb(book).replace(/[^a-z0-9]+/g, "");
}

function displayBookName(book: string | null | undefined) {
  return normalizeBookForDb(book)
    .split(" ")
    .filter(Boolean)
    .map((word) => (/^\d+$/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
}

function speechTextHash(text: string) {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

export function createBibleChapterTtsAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
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
    "Speak in a calm, warm, steady male Bible study narrator voice. Keep the tone peaceful, reverent, clear, and comforting. Use a gentle pace with natural pauses. Do not read verse numbers. Read the chapter as flowing Scripture, not as a numbered list.";

  const primary = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: BIBLE_CHAPTER_TTS_VOICE,
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
      voice: BIBLE_CHAPTER_TTS_VOICE,
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

async function generateOpenAiSpeech(text: string) {
  const chunks = chunkSpeechInput(text);
  const audioChunks: Buffer[] = [];

  for (const chunk of chunks) {
    audioChunks.push(await generateOpenAiSpeechChunk(chunk));
  }

  return Buffer.concat(audioChunks);
}

function getBookQueryVariants(book: string) {
  const normalized = normalizeBookForDb(book);
  const display = displayBookName(book);
  const compact = normalized.replace(/\s+/g, "");
  return Array.from(new Set([normalized, display, compact])).filter((value): value is string => Boolean(value));
}

export async function getBibleChapterSpeechText(book: string, chapter: number, supabase: SupabaseAdmin) {
  const variants = getBookQueryVariants(book);

  const { data, error } = await supabase
    .from("bible_chapters")
    .select("content_json")
    .eq("chapter", chapter)
    .in("book", variants)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const verses = ((data as any)?.content_json as any)?.verses as BibleChapterVerse[] | undefined;
  if (!Array.isArray(verses) || verses.length === 0) {
    throw new Error(`${displayBookName(book)} ${chapter} chapter text was not found.`);
  }

  const text = verses
    .map((verse) => String(verse?.text || "").trim())
    .filter(Boolean)
    .join(" ");

  const cleaned = cleanTextForTts(text);
  if (!cleaned) {
    throw new Error(`${displayBookName(book)} ${chapter} chapter text was empty.`);
  }

  return cleaned;
}

export function getBibleChapterTtsPath(book: string, chapter: number, text: string) {
  return `bible/${normalizeBookForPath(book)}/${chapter}/${BIBLE_CHAPTER_TTS_KIND}-${BIBLE_CHAPTER_TTS_VOICE}-${BIBLE_CHAPTER_TTS_CACHE_VERSION}-${speechTextHash(text)}.mp3`;
}

export async function downloadCachedBibleChapterAudio(supabase: SupabaseAdmin, path: string) {
  const { data, error } = await supabase.storage.from(BIBLE_CHAPTER_TTS_BUCKET).download(path);
  if (error || !data) return null;
  return data.arrayBuffer();
}

export async function uploadCachedBibleChapterAudio(supabase: SupabaseAdmin, path: string, audio: Buffer) {
  const upload = await supabase.storage.from(BIBLE_CHAPTER_TTS_BUCKET).upload(path, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });

  if (!upload.error) return;

  await supabase.storage.createBucket(BIBLE_CHAPTER_TTS_BUCKET, { public: false }).catch(() => null);
  await supabase.storage.from(BIBLE_CHAPTER_TTS_BUCKET).upload(path, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });
}

export async function ensureBibleChapterTtsAudio(book: string, chapter: number, supabase: SupabaseAdmin, force = false) {
  const text = await getBibleChapterSpeechText(book, chapter, supabase);
  const path = getBibleChapterTtsPath(book, chapter, text);

  if (!force) {
    const cached = await downloadCachedBibleChapterAudio(supabase, path);
    if (cached) {
      return { audio: Buffer.from(cached), path, source: "cache" as const, textLength: text.length };
    }
  }

  const audio = await generateOpenAiSpeech(text);
  await uploadCachedBibleChapterAudio(supabase, path, audio);
  return { audio, path, source: "generated" as const, textLength: text.length };
}
