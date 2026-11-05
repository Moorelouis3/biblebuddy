import { createHash } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  assertOpenAiSpendAllowed,
  OpenAiBudgetExceeded,
  OpenAiFeatureNotAllowed,
  recordOpenAiSpend,
} from "@/lib/openAiBudget";

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

/**
 * Twelve a day at ~$0.14 is about $1.70, and the month's budget in
 * lib/openAiBudget.ts stops it long before thirty such days.
 *
 * It was 60, chosen when the only question was "can a stranger with a loop
 * bankrupt us" - $8 a day is a fine answer to that and a terrible one to
 * "make $10 last a month" (2026-11-05). This is the daily shape of the
 * spending; the dollar ceiling is the real limit, and it is enforced below.
 * Observed real use is about three chapters a day across everybody, so twelve
 * still leaves four times the headroom.
 */
export const TTS_GLOBAL_DAILY_CAP = 12;
/** One client. Observed real use is 3/day across everybody. */
export const TTS_CLIENT_DAILY_CAP = 4;

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

  // The month's dollars, on top of the day's counts. This is also where a
  // kind that is not Bible audio gets refused by name rather than by an
  // environment variable somebody has to remember - see lib/openAiBudget.ts.
  try {
    await assertOpenAiSpendAllowed(admin, featureForKind(kind), { kind, client: clientKey });
  } catch (error) {
    if (error instanceof OpenAiBudgetExceeded) await deny("monthly_budget");
    if (error instanceof OpenAiFeatureNotAllowed) await deny("feature_not_allowed");
    throw error;
  }

  return clientKey;
}

/**
 * Which billable feature a TTS kind belongs to.
 *
 * "bible-chapter" and "study-notes" (Genesis 1) are Scripture read aloud,
 * which is the approved feature. "devotional-overview" is not Scripture, it
 * is a devotional summary, and it is outside the two features Louis approved
 * on 2026-11-05 - so it maps to a name the budget gate does not recognise and
 * is refused. The route and its cache are untouched: every overview already
 * generated still plays, and putting it back is one line here.
 */
function featureForKind(kind: string): string {
  if (kind === "bible-chapter" || kind === "study-notes") return "bible_text_to_speech";
  return `tts_${kind.replace(/[^a-z0-9]+/gi, "_")}`;
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

  // The same generation, in dollars, so the month's budget knows about it.
  // Only the approved feature reaches this line: anything else was refused
  // before the audio was made.
  const feature = featureForKind(kind);
  if (feature === "bible_text_to_speech") {
    await recordOpenAiSpend(admin, feature, { kind, path });
  }
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
