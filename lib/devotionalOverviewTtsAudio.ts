import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { generateOpenAiSpeech } from "./genesisOneTtsAudio";
import { cleanTextForTts } from "./ttsSpeechText";

export const DEVOTIONAL_OVERVIEW_TTS_BUCKET = "tts-audio";
export const DEVOTIONAL_OVERVIEW_TTS_CACHE_VERSION = "v1";
export const DEVOTIONAL_OVERVIEW_TTS_VOICE = "onyx";

type SupabaseAdmin = any;

export function createDevotionalOverviewTtsAdminClient() {
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

function normalizePathPart(value: string | number | null | undefined) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripOverviewDisplayOnlyHeading(text: string) {
  return String(text || "")
    .replace(/^Proverbs\s+1:\s*Wisdom Starts With Reverence\s*/i, "")
    .replace(/^📖\s*Day\s+\d+\s+of\s+The Wisdom of Proverbs\s*/i, "")
    .trim();
}

export async function getDevotionalOverviewSpeechText(
  devotionalId: string,
  dayNumber: number,
  supabase: SupabaseAdmin,
) {
  const { data, error } = await supabase
    .from("devotional_days")
    .select("day_title, devotional_text")
    .eq("devotional_id", devotionalId)
    .eq("day_number", dayNumber)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data?.devotional_text?.trim()) {
    throw new Error("Devotional overview text was not found.");
  }

  const title = data.day_title ? `${data.day_title}. ` : "";
  return cleanTextForTts(`${title}${stripOverviewDisplayOnlyHeading(data.devotional_text)}`);
}

export function getDevotionalOverviewTtsPath(devotionalId: string, dayNumber: number, text: string) {
  const devotionalKey = normalizePathPart(devotionalId) || "devotional";
  return `devotionals/${devotionalKey}/day-${dayNumber}/overview-${DEVOTIONAL_OVERVIEW_TTS_VOICE}-${DEVOTIONAL_OVERVIEW_TTS_CACHE_VERSION}-${speechTextHash(text)}.mp3`;
}

export async function downloadCachedDevotionalOverviewAudio(supabase: SupabaseAdmin, path: string) {
  const { data, error } = await supabase.storage.from(DEVOTIONAL_OVERVIEW_TTS_BUCKET).download(path);
  if (error || !data) return null;
  return data.arrayBuffer();
}

export async function uploadCachedDevotionalOverviewAudio(supabase: SupabaseAdmin, path: string, audio: Buffer) {
  const upload = await supabase.storage.from(DEVOTIONAL_OVERVIEW_TTS_BUCKET).upload(path, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });

  if (!upload.error) return;

  await supabase.storage.createBucket(DEVOTIONAL_OVERVIEW_TTS_BUCKET, { public: false }).catch(() => null);
  await supabase.storage.from(DEVOTIONAL_OVERVIEW_TTS_BUCKET).upload(path, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });
}

export async function ensureDevotionalOverviewTtsAudio(
  devotionalId: string,
  dayNumber: number,
  supabase: SupabaseAdmin,
  force = false,
) {
  const text = await getDevotionalOverviewSpeechText(devotionalId, dayNumber, supabase);
  const path = getDevotionalOverviewTtsPath(devotionalId, dayNumber, text);

  if (!force) {
    const cached = await downloadCachedDevotionalOverviewAudio(supabase, path);
    if (cached) return { audio: Buffer.from(cached), path, source: "cache" as const, textLength: text.length };
  }

  const audio = await generateOpenAiSpeech(text);
  await uploadCachedDevotionalOverviewAudio(supabase, path, audio);
  return { audio, path, source: "generated" as const, textLength: text.length };
}
