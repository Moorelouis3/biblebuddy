import { createHash } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * A daily ceiling on NEW text-to-speech audio (Louis, 2026-11-02).
 *
 * Why this exists: /api/tts/bible-chapter took no account and no limit. An
 * anonymous request for a chapter nobody had listened to yet generated it and
 * billed us, so a loop over 1,201 chapters x 3 translations was roughly $500
 * that anyone on the internet could spend. Real use is about three chapters a
 * day.
 *
 * What it does NOT touch: audio that already exists. Every chapter rendered so
 * far keeps playing for everyone, signed-in or not, capped or not. Only a
 * genuine cache miss - the moment money is about to be spent - passes through
 * here. The offline render scripts do not call this at all; a bulk render is a
 * deliberate decision, not an accident.
 *
 * The counter lives in landing_page_events rather than a new table so this
 * ships without a migration, and so the generations show up in the same place
 * as every other event Louis already reads.
 */

/** Worst case per day at ~$0.14 a chapter: about $8. */
export const TTS_GLOBAL_DAILY_CAP = 60;
/** One client. Observed real use is 3/day across everybody. */
export const TTS_CLIENT_DAILY_CAP = 10;

export const TTS_GENERATED_EVENT = "tts_audio_generated";
export const TTS_BLOCKED_EVENT = "tts_audio_blocked";

export class TtsGenerationBlocked extends Error {
  constructor(readonly reason: string) {
    super(reason);
    this.name = "TtsGenerationBlocked";
  }
}

/**
 * Who asked, as a hash. The raw IP is never stored - this only has to be
 * stable for a day so one caller cannot take the whole allowance.
 */
export function ttsClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(`tts:${ip}`).digest("hex").slice(0, 16);
}

/**
 * A browser on our own site, or the native shell. A bare `curl` loop is
 * neither: it sends no Sec-Fetch-Site and no Referer.
 *
 * Deliberately generous - a wrong "no" here costs a reader their audio, so
 * every blocked request is logged with its reason and can be read back out of
 * landing_page_events if real people are being caught.
 */
export function isOwnClient(request: Request) {
  // The Capacitor shell, which sets this marker on every request it makes.
  if ((request.headers.get("user-agent") || "").includes("BibleBuddyApp")) return true;

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin" || fetchSite === "same-site") return true;

  const referer = request.headers.get("referer") || "";
  if (!referer) return false;
  try {
    const host = new URL(referer).hostname;
    return (
      host === "mybiblebuddy.net" ||
      host.endsWith(".mybiblebuddy.net") ||
      host === "localhost" ||
      host.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

function startOfTodayUtc() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
}

async function countToday(admin: SupabaseClient, clientKey?: string) {
  let query = admin
    .from("landing_page_events")
    .select("*", { count: "exact", head: true })
    .eq("event_name", TTS_GENERATED_EVENT)
    .gte("created_at", startOfTodayUtc());
  if (clientKey) query = query.eq("metadata->>client", clientKey);
  const { count, error } = await query;
  // Failing closed here would silence every "Listen" button the first time the
  // analytics table hiccuped. The caller still has the same-origin check.
  if (error) return null;
  return count ?? 0;
}

/**
 * Called immediately before any paid generation. Throws TtsGenerationBlocked
 * to stop it; returning normally means spend the money.
 */
export async function assertTtsGenerationAllowed(
  admin: SupabaseClient,
  request: Request,
  kind: string,
) {
  const clientKey = ttsClientKey(request);

  const deny = async (reason: string) => {
    await admin
      .from("landing_page_events")
      .insert({
        event_name: TTS_BLOCKED_EVENT,
        session_id: clientKey,
        source: "tts",
        page_path: new URL(request.url).pathname,
        metadata: { kind, client: clientKey, reason },
      })
      .then(() => null, () => null);
    throw new TtsGenerationBlocked(reason);
  };

  if (!isOwnClient(request)) await deny("not_own_client");

  const [globalCount, clientCount] = await Promise.all([countToday(admin), countToday(admin, clientKey)]);
  if (globalCount !== null && globalCount >= TTS_GLOBAL_DAILY_CAP) await deny("global_daily_cap");
  if (clientCount !== null && clientCount >= TTS_CLIENT_DAILY_CAP) await deny("client_daily_cap");

  return clientKey;
}

/** Called once the audio exists, so tomorrow's count is right. */
export async function recordTtsGeneration(
  admin: SupabaseClient,
  request: Request,
  kind: string,
  path: string,
) {
  await admin
    .from("landing_page_events")
    .insert({
      event_name: TTS_GENERATED_EVENT,
      session_id: ttsClientKey(request),
      source: "tts",
      page_path: new URL(request.url).pathname,
      metadata: { kind, client: ttsClientKey(request), path },
    })
    .then(() => null, () => null);
}

/** The guard a TTS lib calls around its generate step. */
export type TtsGuard = {
  before: () => Promise<unknown>;
  after: (path: string) => Promise<unknown>;
};

export function buildTtsGuard(admin: SupabaseClient, request: Request, kind: string): TtsGuard {
  return {
    before: () => assertTtsGenerationAllowed(admin, request, kind),
    after: (path: string) => recordTtsGeneration(admin, request, kind, path),
  };
}
