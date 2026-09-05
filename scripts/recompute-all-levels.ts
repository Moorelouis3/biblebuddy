/**
 * Recompute every user's points and level from the master_actions log
 * (2026-09-05, points & levels relaunch). Levels are floor-protected -
 * a recompute can only raise profile_stats.current_level, never lower it.
 *
 *   npx tsx scripts/recompute-all-levels.ts [--dry]
 */
import { config } from "dotenv";
import { existsSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { getLevelInfoWithLevelFloor } from "../lib/levelSystem";
import { computePointsFromActivity, streakBonusPointsFor, type PointsActionRow } from "../lib/pointsEngine";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const DRY = process.argv.includes("--dry");
const PAGE_SIZE = 1000;

type SocialRow = { user_id: string | null; parent_post_id?: string | null; created_at: string | null };

async function fetchAll<T>(fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>) {
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await fetchPage(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(error.message);
    rows.push(...(data || []));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return rows;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  console.log("Loading activity tables...");
  const [actions, groupPosts, groupLikes, profiles] = await Promise.all([
    fetchAll<PointsActionRow & { user_id: string | null }>((from, to) =>
      supabase.from("master_actions").select("user_id, action_type, action_label, created_at").order("created_at", { ascending: true }).range(from, to),
    ),
    fetchAll<SocialRow>((from, to) => supabase.from("group_posts").select("user_id, parent_post_id, created_at").range(from, to)),
    fetchAll<SocialRow>((from, to) => supabase.from("group_post_likes").select("user_id, created_at").range(from, to)),
    fetchAll<{ user_id: string; current_level: number | null; current_streak: number | null }>((from, to) =>
      supabase.from("profile_stats").select("user_id, current_level, current_streak").range(from, to),
    ),
  ]);
  console.log(`actions=${actions.length} posts=${groupPosts.length} likes=${groupLikes.length} profiles=${profiles.length}`);

  const actionsByUser = new Map<string, PointsActionRow[]>();
  for (const row of actions) {
    if (!row.user_id) continue;
    let list = actionsByUser.get(row.user_id);
    if (!list) actionsByUser.set(row.user_id, (list = []));
    list.push(row);
  }
  const postsByUser = new Map<string, SocialRow[]>();
  for (const row of groupPosts) {
    if (!row.user_id) continue;
    let list = postsByUser.get(row.user_id);
    if (!list) postsByUser.set(row.user_id, (list = []));
    list.push(row);
  }
  const likesByUser = new Map<string, SocialRow[]>();
  for (const row of groupLikes) {
    if (!row.user_id) continue;
    let list = likesByUser.get(row.user_id);
    if (!list) likesByUser.set(row.user_id, (list = []));
    list.push(row);
  }

  let updated = 0;
  let unchanged = 0;
  const levelHistogram = new Map<number, number>();

  for (const profile of profiles) {
    const userId = profile.user_id;
    const userPosts = postsByUser.get(userId) || [];
    const computed = computePointsFromActivity({
      actions: actionsByUser.get(userId) || [],
      groupRootPosts: userPosts.filter((row) => !row.parent_post_id),
      groupComments: userPosts.filter((row) => Boolean(row.parent_post_id)),
      groupLikesGiven: likesByUser.get(userId) || [],
      likesReceived: [],
      streakBonusPoints: streakBonusPointsFor(profile.current_streak),
    });
    const levelInfo = getLevelInfoWithLevelFloor(computed.totalPoints, profile.current_level);
    levelHistogram.set(levelInfo.level, (levelHistogram.get(levelInfo.level) ?? 0) + 1);

    const needsLevelWrite = (profile.current_level ?? 0) < levelInfo.level;
    if (!needsLevelWrite) {
      unchanged += 1;
      continue;
    }
    if (DRY) {
      updated += 1;
      continue;
    }
    const { error } = await supabase
      .from("profile_stats")
      .update({ current_level: levelInfo.level })
      .eq("user_id", userId);
    if (error) {
      console.error(`  ${userId}: ${error.message}`);
      continue;
    }
    updated += 1;
  }

  console.log(`${DRY ? "[dry] would update" : "updated"} ${updated} users, ${unchanged} already at level.`);
  console.log("Level distribution:");
  [...levelHistogram.entries()].sort((a, b) => a[0] - b[0]).forEach(([level, count]) => {
    console.log(`  L${String(level).padStart(2)}: ${count}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
