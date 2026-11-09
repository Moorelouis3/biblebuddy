/**
 * Stop emailing every address that has bounced.
 *
 * Louis, 2026-11-09: "fix this and stop eamiling them after 2 strikes actually
 * 1 strike if its biunced thatex dont want emails move on".
 *
 * `app/api/webhooks/ses/route.ts` now suppresses on the first bounce, so
 * nothing new slips through. This is the catch-up for everything that already
 * bounced while only Permanent bounces were being acted on.
 *
 * Measured on 2026-11-09 before the change: 1,762 bounce events over 90 days
 * from 308 distinct addresses, 1,454 of them to an address that had already
 * bounced at least once, and only 80 of the 308 ever suppressed. Those repeats
 * are the bounce rate - 2.68% over 30 days, 3.29% over the last day, against
 * an AWS cut-off of 5% where sending gets reviewed or stopped.
 *
 * Reads `email_events`, writes `email_suppressions`. It only ever adds
 * suppressions; it never deletes one, never touches `email_subscribers`, and
 * never sends anything.
 *
 * Dry run by default - it prints what it would do and writes nothing:
 *
 *   npx tsx scripts/suppress-bounced-addresses.ts
 *   npx tsx scripts/suppress-bounced-addresses.ts --apply
 *
 * Options:
 *   --apply        actually write the suppressions
 *   --days=N       only look at bounces in the last N days (default: all)
 *   --strikes=N    only suppress after N bounces (default: 1, Louis's rule)
 *
 * To undo one: delete its row from `email_suppressions`. The `detail` column
 * carries the SES bounce type, so Transient suppressions can be told apart
 * from Permanent ones afterwards.
 */

import { config } from "dotenv";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
config({ path: ".env" });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const APPLY = process.argv.includes("--apply");
const DAYS = numberFlag("--days=", 0);
const STRIKES = Math.max(1, numberFlag("--strikes=", 1));

function numberFlag(prefix: string, fallback: number): number {
  const arg = process.argv.find((a) => a.startsWith(prefix));
  if (!arg) return fallback;
  const value = Number(arg.slice(prefix.length));
  return Number.isFinite(value) ? value : fallback;
}

type BounceRow = { email: string | null; occurred_at: string; campaign_id: string | null };

/**
 * PostgREST caps every response at 1000 rows whatever the limit says, so a
 * plain select silently tells you there are 1000 bounces when there are
 * thousands. Everything here pages.
 */
async function pageAll<T>(
  db: SupabaseClient,
  table: string,
  columns: string,
  build: (q: ReturnType<ReturnType<SupabaseClient["from"]>["select"]>) => typeof q,
  orderBy: string,
): Promise<T[]> {
  const out: T[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await build(db.from(table).select(columns)).order(orderBy).range(from, from + PAGE - 1);
    // supabase-js hands back {data: null, error} rather than throwing, so a
    // dropped connection looks exactly like "no more rows" unless this is here.
    if (error) throw new Error(`${table}: ${error.message}`);
    const rows = (data || []) as T[];
    out.push(...rows);
    if (rows.length < PAGE) return out;
  }
}

async function main() {
  const db = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const since = DAYS > 0 ? new Date(Date.now() - DAYS * 86_400_000).toISOString() : null;

  const bounces = await pageAll<BounceRow>(
    db,
    "email_events",
    "email, occurred_at, campaign_id",
    (q) => {
      const base = q.eq("event_type", "bounce");
      return since ? base.gte("occurred_at", since) : base;
    },
    "occurred_at",
  );

  const strikes = new Map<string, number>();
  const lastSeen = new Map<string, string>();
  for (const row of bounces) {
    const email = (row.email || "").trim().toLowerCase();
    if (!email) continue;
    strikes.set(email, (strikes.get(email) || 0) + 1);
    lastSeen.set(email, row.occurred_at);
  }

  const candidates = [...strikes.entries()].filter(([, n]) => n >= STRIKES).map(([email]) => email);

  // Which are already suppressed. `in` on a long list is one URL, and a URL
  // has a length limit, so this goes in chunks.
  const already = new Set<string>();
  for (let i = 0; i < candidates.length; i += 200) {
    const chunk = candidates.slice(i, i + 200);
    const { data, error } = await db.from("email_suppressions").select("email").in("email", chunk);
    if (error) throw new Error(`email_suppressions: ${error.message}`);
    for (const row of data || []) already.add((row.email || "").toLowerCase());
  }

  const toSuppress = candidates.filter((email) => !already.has(email));

  console.log(`bounce events read      : ${bounces.length}${since ? ` (last ${DAYS} days)` : " (all time)"}`);
  console.log(`distinct addresses      : ${strikes.size}`);
  console.log(`at or past ${STRIKES} strike(s) : ${candidates.length}`);
  console.log(`already suppressed      : ${candidates.length - toSuppress.length}`);
  console.log(`to suppress now         : ${toSuppress.length}`);

  const repeats = bounces.length - strikes.size;
  console.log(
    `\n${repeats} of those ${bounces.length} bounces went to an address that had already bounced.\n` +
      `That is the share of the bounce rate this removes.`,
  );

  if (!toSuppress.length) {
    console.log("\nNothing to do.");
    return;
  }

  if (!APPLY) {
    console.log("\nDRY RUN - nothing written. Re-run with --apply to write these suppressions.");
    console.log("First few, by strike count:");
    for (const email of [...toSuppress].sort((a, b) => (strikes.get(b) || 0) - (strikes.get(a) || 0)).slice(0, 10)) {
      console.log(`  ${strikes.get(email)}x  ${mask(email)}  last ${lastSeen.get(email)?.slice(0, 10)}`);
    }
    return;
  }

  let written = 0;
  for (let i = 0; i < toSuppress.length; i += 100) {
    const chunk = toSuppress.slice(i, i + 100).map((email) => ({
      email,
      reason: "bounce" as const,
      detail: `backfill 2026-11-09: ${strikes.get(email)} bounce(s) on record, last ${lastSeen.get(email)?.slice(0, 10)}`,
    }));
    const { error } = await db.from("email_suppressions").upsert(chunk, { onConflict: "email", ignoreDuplicates: false });
    if (error) throw new Error(`suppress chunk at ${i}: ${error.message}`);
    written += chunk.length;
  }
  console.log(`\nSuppressed ${written} addresses. They will not be emailed again.`);
}

/** Addresses are printed masked - this prints to a terminal and to logs. */
function mask(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "***";
  const head = user.slice(0, 2);
  return `${head}${"*".repeat(Math.max(1, user.length - 2))}@${domain}`;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
