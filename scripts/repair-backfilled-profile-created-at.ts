/**
 * Repair profile_stats.created_at for rows the level backfill created.
 *
 *   npx tsx scripts/repair-backfilled-profile-created-at.ts --dry
 *   npx tsx scripts/repair-backfilled-profile-created-at.ts
 *
 * What went wrong, 2026-11-10. scripts/recompute-all-levels.ts upserts a row
 * for every user who has master_actions, which was the point - 562 real users
 * had study history and no profile_stats row at all, so they had never been
 * scored (defect D4). But an upsert that INSERTS gets created_at from the
 * column default, now(), and lib/adminDashboard.ts treats
 * profile_stats.created_at as the signup date: "new users last 30 days"
 * (line 447), the signup cohort and its day-by-day retention curve (451, 567,
 * 578). So the dashboard shows ~562 signups on 10 November that did not happen,
 * and the cohort retention for that week is nonsense - those users look like
 * brand-new signups who were instantly, deeply active, because they have months
 * of history behind them.
 *
 * The repair. created_at is set to the user's earliest master_actions row,
 * which is the first time Bible Buddy saw them and the best available truth.
 * registered_at is deliberately left null: we do not know when or whether they
 * registered, and inventing that would be the same mistake again.
 *
 * Telling a backfilled row from a genuine new signup. Not by registered_at:
 * that column has not been written since 2026-10-06 and is null on every row in
 * this window, genuine or not. The signal is the gap between the user's first
 * master_actions row and the creation of their profile_stats row. A real signup
 * creates both within a couple of seconds (measured: gap 0.00 days); a
 * backfilled row sits months after a history that already existed. So only rows
 * whose first action predates the row by at least MIN_GAP_DAYS are touched,
 * which leaves the 24 genuine signups in that window alone.
 */
import { config } from "dotenv";
import { existsSync } from "fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const DRY = process.argv.includes("--dry");
const PAGE_SIZE = 1000;
/** The backfill ran on this day. Rows created from here on are suspects. */
const BACKFILL_DAY = "2026-11-10";
/**
 * How far a user's first action must predate their profile_stats row before we
 * call the row backfilled. A genuine signup writes both within seconds, so two
 * days is a wide margin on a boundary that is really measured in seconds.
 */
const MIN_GAP_DAYS = 2;
const DAY_MS = 86400000;

async function fetchAll<T>(
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
) {
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await fetchPage(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(error.message);
    rows.push(...(data || []));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return rows;
}

async function main(): Promise<number> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const supabase: SupabaseClient = createClient(url, key, { auth: { persistSession: false } });

  console.log(DRY ? "[DRY RUN - nothing will be written]" : "[LIVE - this writes to profile_stats]");

  const suspects = await fetchAll<{ user_id: string; created_at: string; registered_at: string | null }>((from, to) =>
    supabase
      .from("profile_stats")
      .select("user_id, created_at, registered_at")
      .gte("created_at", BACKFILL_DAY)
      .range(from, to),
  );
  console.log(`rows created on/after ${BACKFILL_DAY}: ${suspects.length}`);

  // Earliest action per user, read once over the whole log rather than per user.
  const firstAction = new Map<string, string>();
  const actions = await fetchAll<{ user_id: string | null; created_at: string | null }>((from, to) =>
    supabase.from("master_actions").select("user_id, created_at").order("created_at", { ascending: true }).range(from, to),
  );
  for (const a of actions) {
    if (!a.user_id || !a.created_at) continue;
    if (!firstAction.has(a.user_id)) firstAction.set(a.user_id, a.created_at);
  }

  const fixes: Array<{ user_id: string; created_at: string }> = [];
  let skippedGenuine = 0;
  let skippedNoHistory = 0;

  for (const row of suspects) {
    const first = firstAction.get(row.user_id);
    if (!first) {
      skippedNoHistory += 1;
      continue;
    }
    const gapDays = (Date.parse(row.created_at) - Date.parse(first)) / DAY_MS;
    if (gapDays < MIN_GAP_DAYS) {
      skippedGenuine += 1;
      continue;
    }
    fixes.push({ user_id: row.user_id, created_at: first });
  }

  console.log(`to repair: ${fixes.length}`);
  console.log(`left alone: ${skippedGenuine} genuine new signups (first action < ${MIN_GAP_DAYS}d before the row), ${skippedNoHistory} with no history at all`);

  if (fixes.length) {
    const byMonth = new Map<string, number>();
    for (const f of fixes) {
      const m = f.created_at.slice(0, 7);
      byMonth.set(m, (byMonth.get(m) ?? 0) + 1);
    }
    console.log("\ncreated_at moves back to:");
    [...byMonth.entries()].sort().forEach(([m, c]) => console.log(`  ${m}: ${c}`));
  }

  if (DRY || fixes.length === 0) return 0;

  let written = 0;
  let failures = 0;
  const BATCH = 500;
  console.log("");
  for (let i = 0; i < fixes.length; i += BATCH) {
    const slice = fixes.slice(i, i + BATCH);
    let lastError: string | null = null;
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      // created_at only. Uniform payload, same reason as the recompute script:
      // PostgREST builds one INSERT per batch from the union of the keys.
      const { error } = await supabase.from("profile_stats").upsert(slice, { onConflict: "user_id" });
      if (!error) {
        lastError = null;
        break;
      }
      lastError = error.message;
      if (attempt === 1) await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    if (lastError) {
      failures += slice.length;
      console.error(`  batch ${i}-${i + slice.length - 1} failed: ${lastError}`);
    } else {
      written += slice.length;
      process.stdout.write(`  ${written}/${fixes.length}\r`);
    }
  }
  console.log("");
  console.log(`repaired ${written} of ${fixes.length} rows.`);
  if (failures) {
    console.log(`FAILURES: ${failures}. Re-run - this script is idempotent.`);
    return 1;
  }
  return 0;
}

main()
  .then((code) => {
    if (code) process.exit(code);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
