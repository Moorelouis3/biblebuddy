import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * One gate in front of everything that spends OpenAI money (Louis,
 * 2026-11-05, on topping the account up with $10 and wanting it to last a
 * month).
 *
 * There was already a good daily ceiling on text-to-speech in
 * lib/ttsGenerationGuard.ts, written the day an open endpoint could have been
 * looped for $500. What there was not is a figure in dollars, or anything at
 * all in front of Lil Louis. Sixty chapters a day at about fourteen cents is
 * roughly $250 a month: safe from a stranger with a script, nowhere near
 * $10.
 *
 * So this counts money rather than requests, over a calendar month, and it is
 * the only thing that can say yes. Two features are allowed to ask. Anything
 * else is rejected by name, server-side, whatever the caller looks like -
 * which is the point, because the old answer to "is that feature off?" was an
 * environment variable somebody had to remember not to set.
 *
 * WHERE THE LEDGER LIVES. landing_page_events, the same table the TTS guard
 * already writes to. Not a new table on purpose: no migration to run before
 * this protects anything, and the spend shows up where Louis already reads
 * events. The cost of that choice is that the ledger is an estimate - we
 * record what we expect a request to cost, not what OpenAI later bills - so
 * treat the numbers here as a budget, never as an invoice. The real figure is
 * on the OpenAI dashboard.
 *
 * WHAT THIS IS NOT. It is not a hard cap on the account. A request already in
 * flight when the budget runs out still completes and is still billed, and
 * several arriving in the same instant can each read the same under-budget
 * total. The margin that leaves is small - one TTS generation is cents - but
 * it is not zero. A real hard cap has to come from OpenAI's own project
 * limits.
 */

/** The only two features allowed to spend. Anything else is refused by name. */
export const BILLABLE_FEATURES = ["little_louis_reply", "bible_text_to_speech"] as const;
export type BillableFeature = (typeof BILLABLE_FEATURES)[number];

/** $10 a month, Louis's figure. */
export const OPENAI_MONTHLY_BUDGET_USD = 10;

/** Logged loudly as the month's estimate crosses each one. */
export const OPENAI_BUDGET_WARNING_THRESHOLDS = [5, 7.5, 9];

export const OPENAI_SPEND_EVENT = "openai_spend";
export const OPENAI_BLOCKED_EVENT = "openai_spend_blocked";

/**
 * What we expect a request to cost, in dollars.
 *
 * TTS: $0.14 for a Bible chapter is the figure the TTS guard already works
 * from, and it matches the $0.027 a minute Louis read off the OpenAI
 * dashboard against chapters of four to six minutes.
 *
 * Lil Louis: gpt-4o-mini at $0.15 per million input tokens and $0.60 per
 * million output. The system prompt is long and max_tokens is 2000, so about
 * 4k in and rarely more than 1k out - call it a tenth of a cent, and round up,
 * because being wrong here should cost us budget rather than cost Louis money.
 */
export const ESTIMATED_COST_USD: Record<BillableFeature, number> = {
  little_louis_reply: 0.002,
  bible_text_to_speech: 0.14,
};

export class OpenAiBudgetExceeded extends Error {
  constructor(readonly feature: string, readonly spentUsd: number) {
    super(`OpenAI budget reached for ${feature}`);
    this.name = "OpenAiBudgetExceeded";
  }
}

export class OpenAiFeatureNotAllowed extends Error {
  constructor(readonly feature: string) {
    super(`${feature} is not allowed to call OpenAI`);
    this.name = "OpenAiFeatureNotAllowed";
  }
}

export function isBillableFeature(feature: string): feature is BillableFeature {
  return (BILLABLE_FEATURES as readonly string[]).includes(feature);
}

function startOfMonthUtc() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

/**
 * This calendar month's estimated spend, or null if the ledger cannot be read.
 *
 * Null is deliberately different from zero: the caller treats "cannot read"
 * as "do not block", because a hiccup in an analytics table should not take
 * Lil Louis and every Listen button down with it. The per-feature limits in
 * lib/ttsGenerationGuard.ts still apply underneath.
 */
export async function monthlySpendUsd(admin: SupabaseClient): Promise<number | null> {
  const { data, error } = await admin
    .from("landing_page_events")
    .select("metadata")
    .eq("event_name", OPENAI_SPEND_EVENT)
    .gte("created_at", startOfMonthUtc())
    .limit(5000);
  if (error || !data) return null;
  return data.reduce((sum, row) => {
    const cost = Number((row.metadata as { cost_usd?: unknown } | null)?.cost_usd);
    return sum + (Number.isFinite(cost) ? cost : 0);
  }, 0);
}

/**
 * Called immediately before anything billable. Returns normally to mean
 * "spend it"; throws otherwise.
 */
export async function assertOpenAiSpendAllowed(
  admin: SupabaseClient,
  feature: string,
  meta: Record<string, unknown> = {},
): Promise<void> {
  if (!isBillableFeature(feature)) {
    await recordBlocked(admin, feature, "feature_not_allowed", meta);
    throw new OpenAiFeatureNotAllowed(feature);
  }

  const spent = await monthlySpendUsd(admin);
  if (spent === null) return;

  const next = spent + ESTIMATED_COST_USD[feature];
  if (next > OPENAI_MONTHLY_BUDGET_USD) {
    await recordBlocked(admin, feature, "monthly_budget", { ...meta, spent_usd: spent });
    throw new OpenAiBudgetExceeded(feature, spent);
  }

  const crossed = OPENAI_BUDGET_WARNING_THRESHOLDS.filter((t) => spent < t && next >= t);
  for (const threshold of crossed) {
    console.warn(
      `[OPENAI_BUDGET] estimated spend has passed $${threshold} of $${OPENAI_MONTHLY_BUDGET_USD} this month`,
    );
  }
}

/** Called once the paid request has actually been made. */
export async function recordOpenAiSpend(
  admin: SupabaseClient,
  feature: BillableFeature,
  meta: Record<string, unknown> = {},
): Promise<void> {
  await admin
    .from("landing_page_events")
    .insert({
      event_name: OPENAI_SPEND_EVENT,
      session_id: feature,
      source: "openai",
      // Never the prompt, never the reply, never a key: this is a cost ledger.
      metadata: { feature, cost_usd: ESTIMATED_COST_USD[feature], ...meta },
    })
    .then(() => null, () => null);
}

async function recordBlocked(
  admin: SupabaseClient,
  feature: string,
  reason: string,
  meta: Record<string, unknown>,
): Promise<void> {
  await admin
    .from("landing_page_events")
    .insert({
      event_name: OPENAI_BLOCKED_EVENT,
      session_id: feature.slice(0, 64),
      source: "openai",
      metadata: { feature, reason, ...meta },
    })
    .then(() => null, () => null);
}
