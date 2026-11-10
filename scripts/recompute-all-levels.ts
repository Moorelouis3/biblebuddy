/**
 * Recompute every user's points and level from the master_actions log.
 *
 *   npx tsx scripts/recompute-all-levels.ts --dry     (writes nothing)
 *   npx tsx scripts/recompute-all-levels.ts           (writes)
 *
 * Levels are floor-protected: a recompute can only RAISE
 * profile_stats.current_level, never lower it. That floor is what makes the
 * 2026-11-10 twenty-level re-cut safe - without it exactly five users would
 * have dropped one level.
 *
 * Two things this fixes from the original version (2026-09-05):
 *
 *  - It iterated profile_stats, so the 562 users who have master_actions rows
 *    but no profile_stats row were never scored and never got a level at all
 *    (defect D4). It now drives from the union of both and upserts.
 *  - It now also sets level_celebrated = current_level for every row, so the
 *    ~1,153 users whose level rises in this run are NOT shown a level-up popup
 *    for a level they were silently given. Pass --no-seal to skip that, which
 *    you should only ever do if the column has already been seeded.
 *
 * Every read is paged at 1,000 rows because PostgREST caps every response at
 * 1,000 regardless of key, and every page checks `error` explicitly -
 * supabase-js resolves with {data: null, error} on a dropped connection rather
 * than throwing, so a short page could otherwise be mistaken for the end of the
 * table and half a user's history scored as all of it.
 */
import { config } from "dotenv";
import { existsSync } from "fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getLevelInfoWithLevelFloor, MAX_LEVEL } from "../lib/levelSystem";
import { computePointsFromActivity, streakBonusPointsFor, type PointsActionRow } from "../lib/pointsEngine";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const DRY = process.argv.includes("--dry");
const NO_SEAL = process.argv.includes("--no-seal");
const PAGE_SIZE = 1000;

type SocialRow = { user_id: string | null; parent_post_id?: string | null; created_at: string | null };
type ProfileRow = {
  user_id: string;
  current_level: number | null;
  current_streak: number | null;
  level_celebrated: number | null;
};

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

/**
 * Whether the migration has been applied, decided once at load.
 *
 * A dry run has to work BEFORE the migration, because the whole point of it is
 * to show the numbers so somebody can decide whether to migrate at all. So the
 * profile read asks for level_celebrated, and if the column is not there yet it
 * retries without it and carries on with the mark treated as unset. A live run
 * then refuses to proceed, because sealing is not optional.
 */
let hasCelebratedColumn = true;

// Same minimal-client idiom as lib/communityMilestones.ts: all this helper
// needs is .from(), and naming the full generic signature of createClient()
// here only couples the script to the supabase-js version.
type MinimalClient = Pick<SupabaseClient, "from">;

async function fetchProfiles(supabase: MinimalClient): Promise<ProfileRow[]> {
  try {
    return await fetchAll<ProfileRow>((from, to) =>
      supabase
        .from("profile_stats")
        .select("user_id, current_level, current_streak, level_celebrated")
        .range(from, to),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!/level_celebrated/.test(message)) throw error;
    hasCelebratedColumn = false;
    console.log("");
    console.log("  NOTE: profile_stats.level_celebrated does not exist yet.");
    console.log("  Run supabase/migrations/ADD_LEVEL_CELEBRATED_AND_MILESTONE_OPT_OUT.sql first.");
    console.log("  Continuing the dry run without it; the seal count below is what it WOULD write.");
    console.log("");
    const rows = await fetchAll<Omit<ProfileRow, "level_celebrated">>((from, to) =>
      supabase.from("profile_stats").select("user_id, current_level, current_streak").range(from, to),
    );
    return rows.map((row) => ({ ...row, level_celebrated: null }));
  }
}

function groupByUser<T extends { user_id: string | null }>(rows: T[]) {
  const map = new Map<string, T[]>();
  for (const row of rows) {
    if (!row.user_id) continue;
    let list = map.get(row.user_id);
    if (!list) map.set(row.user_id, (list = []));
    list.push(row);
  }
  return map;
}

async function main(): Promise<number> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  console.log(`${DRY ? "[DRY RUN - nothing will be written]" : "[LIVE - this writes to profile_stats]"}`);
  console.log("Loading activity tables...");

  const [actions, groupPosts, groupLikes, profiles] = await Promise.all([
    fetchAll<PointsActionRow & { user_id: string | null }>((from, to) =>
      supabase
        .from("master_actions")
        .select("user_id, action_type, action_label, created_at")
        .order("created_at", { ascending: true })
        .range(from, to),
    ),
    fetchAll<SocialRow>((from, to) =>
      supabase.from("group_posts").select("user_id, parent_post_id, created_at").range(from, to),
    ),
    fetchAll<SocialRow>((from, to) =>
      supabase.from("group_post_likes").select("user_id, created_at").range(from, to),
    ),
    fetchProfiles(supabase),
  ]);

  console.log(
    `actions=${actions.length} posts=${groupPosts.length} likes=${groupLikes.length} profiles=${profiles.length}`,
  );

  // A live run without the column would raise 1,153 levels and seal none of
  // them, and every one of those users would be shown a level-up popup for a
  // level they were silently given. Refuse rather than half-apply.
  if (!DRY && !hasCelebratedColumn && !NO_SEAL) {
    throw new Error(
      "profile_stats.level_celebrated does not exist. Run " +
        "supabase/migrations/ADD_LEVEL_CELEBRATED_AND_MILESTONE_OPT_OUT.sql before the live recompute, " +
        "or pass --no-seal if you have deliberately seeded the column another way.",
    );
  }

  const actionsByUser = groupByUser(actions);
  const postsByUser = groupByUser(groupPosts);
  const likesByUser = groupByUser(groupLikes);

  const profileByUser = new Map<string, ProfileRow>();
  for (const profile of profiles) profileByUser.set(profile.user_id, profile);

  /**
   * Every user with a profile_stats row OR any master_actions row.
   *
   * The second half is the D4 fix. 7,192 users have actions; 6,633 have a
   * profile row. Driving from profile_stats alone silently skipped 562 people
   * with real study history.
   */
  const allUserIds = new Set<string>([...profileByUser.keys(), ...actionsByUser.keys()]);
  const missingProfileRows = [...actionsByUser.keys()].filter((id) => !profileByUser.has(id)).length;
  console.log(`users to score: ${allUserIds.size} (with actions but no profile_stats row: ${missingProfileRows})`);

  type PendingWrite = { user_id: string; current_level: number; level_celebrated: number };
  const pending: PendingWrite[] = [];
  let levelsRaised = 0;
  let levelsUnchanged = 0;
  let sealed = 0;
  let failures = 0;
  const levelHistogram = new Map<number, number>();
  const before = new Map<number, number>();
  const wouldHaveDropped: Array<{ userId: string; stored: number; derived: number }> = [];

  for (const userId of allUserIds) {
    const profile = profileByUser.get(userId) ?? null;
    const storedLevel = profile?.current_level ?? null;
    const userPosts = postsByUser.get(userId) || [];

    const computed = computePointsFromActivity({
      actions: actionsByUser.get(userId) || [],
      groupRootPosts: userPosts.filter((row) => !row.parent_post_id),
      groupComments: userPosts.filter((row) => Boolean(row.parent_post_id)),
      groupLikesGiven: likesByUser.get(userId) || [],
      likesReceived: [],
      streakBonusPoints: streakBonusPointsFor(profile?.current_streak),
    });

    const flooredLevel = getLevelInfoWithLevelFloor(computed.totalPoints, storedLevel).level;
    const unflooredLevel = getLevelInfoWithLevelFloor(computed.totalPoints, null).level;

    const storedForStats = storedLevel && storedLevel >= 1 ? Math.min(storedLevel, MAX_LEVEL) : 1;
    before.set(storedForStats, (before.get(storedForStats) ?? 0) + 1);
    levelHistogram.set(flooredLevel, (levelHistogram.get(flooredLevel) ?? 0) + 1);
    if (unflooredLevel < storedForStats) {
      wouldHaveDropped.push({ userId, stored: storedForStats, derived: unflooredLevel });
    }

    const needsLevelWrite = (storedLevel ?? 0) < flooredLevel;
    // Seal the celebration mark so the raise above does not become a popup.
    const needsSeal = !NO_SEAL && (profile?.level_celebrated ?? null) !== flooredLevel;

    if (needsLevelWrite) levelsRaised += 1;
    else levelsUnchanged += 1;
    if (needsSeal) sealed += 1;

    if (DRY || (!needsLevelWrite && !needsSeal)) continue;

    /**
     * Queued and written in batches, not one request per user.
     *
     * The first live run on 2026-11-10 issued one upsert per user - 7,198
     * sequential requests - and 4,409 of them died with "TypeError: fetch
     * failed" partway through, leaving the backfill half applied. Batching
     * turns that into ~15 requests.
     *
     * The payload is UNIFORM on purpose: every row carries both columns, even
     * when only one of them changed. PostgREST builds one INSERT per batch from
     * the union of the keys it sees, so a batch where some rows omit
     * current_level would write NULL into current_level for those rows. Writing
     * the value we just computed is always correct, so there is no reason to
     * vary the shape.
     */
    pending.push({ user_id: userId, current_level: flooredLevel, level_celebrated: flooredLevel });
  }

  // Write in batches, with one retry per batch. A batch that still fails after
  // the retry is counted and named rather than swallowed.
  let written = 0;
  if (!DRY && pending.length > 0) {
    const BATCH = 500;
    console.log("");
    console.log(`Writing ${pending.length} rows in batches of ${BATCH}...`);
    for (let i = 0; i < pending.length; i += BATCH) {
      const slice = pending.slice(i, i + BATCH);
      let lastError: string | null = null;
      for (let attempt = 1; attempt <= 2; attempt += 1) {
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
        process.stdout.write(`  ${written}/${pending.length}\r`);
      }
    }
    console.log("");
  }

  console.log("");
  console.log(`${DRY ? "[dry] would raise" : "raised"} ${levelsRaised} levels, ${levelsUnchanged} already at level.`);
  console.log(`${DRY ? "[dry] would seal" : "sealed"} level_celebrated on ${sealed} rows (no retroactive popups).`);
  if (!DRY) console.log(`rows actually written: ${written} of ${pending.length}`);
  if (failures) {
    console.log("");
    console.log(`FAILURES: ${failures} rows could not be written.`);
    console.log("The distribution below is what was COMPUTED, not what is in the database.");
    console.log("Re-run this script - it is idempotent and will only write what is still missing.");
  }

  console.log("");
  console.log("Level distribution (before -> after):");
  for (let level = 1; level <= MAX_LEVEL; level += 1) {
    const b = before.get(level) ?? 0;
    const a = levelHistogram.get(level) ?? 0;
    if (b === 0 && a === 0) continue;
    const delta = a - b;
    console.log(
      `  L${String(level).padStart(2)}  ${String(b).padStart(5)} -> ${String(a).padStart(5)}  ${
        delta === 0 ? "" : delta > 0 ? `(+${delta})` : `(${delta})`
      }`,
    );
  }
  const above1Before = [...before.entries()].filter(([l]) => l > 1).reduce((s, [, c]) => s + c, 0);
  const above1After = [...levelHistogram.entries()].filter(([l]) => l > 1).reduce((s, [, c]) => s + c, 0);
  console.log(`  above L1: ${above1Before} -> ${above1After}`);

  console.log("");
  console.log(`Level falls: 0 (the floor is what guarantees this).`);
  console.log(`Users the floor protected: ${wouldHaveDropped.length}`);
  for (const row of wouldHaveDropped) {
    console.log(`  L${row.stored} would have become L${row.derived} without the floor`);
  }

  return failures > 0 ? 1 : 0;
}

main()
  .then((exitCode) => {
    // Exiting 0 after 4,409 failed writes is how the first live run looked like
    // a success. A partial backfill is a failure.
    if (exitCode) process.exit(exitCode);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
