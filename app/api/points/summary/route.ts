import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getLevelInfoWithLevelFloor } from "@/lib/levelSystem";
import { computePointsFromActivity, streakBonusPointsFor, type PointsActionRow } from "@/lib/pointsEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 1000;

/**
 * Hard ceiling on rows read for one user, as a runaway guard only.
 *
 * This used to be 30,000, which one real account exceeded - 33,120 actions - so
 * its score was computed from the oldest 30,000 and the rest were dropped
 * silently (defect D3, docs/LEVELS_PROPOSAL_2026-11-10.md §1.7). Raised well
 * clear of the largest account. Cost is not a concern at this size: actions per
 * user are p50 = 4, p90 = 22, p99 = 315, so 23 users of 7,195 read more than
 * one page at all.
 */
const MAX_ACTION_ROWS = 120000;

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

type AdminClient = NonNullable<ReturnType<typeof createAdminClient>>;

async function fetchUserActions(supabase: AdminClient, userId: string) {
  const rows: PointsActionRow[] = [];
  for (let from = 0; from < MAX_ACTION_ROWS; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("master_actions")
      .select("action_type, action_label, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(error.message);
    rows.push(...((data as PointsActionRow[]) || []));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return rows;
}

/**
 * Page a user's rows out of a table.
 *
 * These two reads used to pass .limit(5000), which PostgREST silently caps at
 * 1,000 - so the limit was a lie. It affects nobody today (2,114 group_posts
 * and 3,007 group_post_likes in total, across all users), but a cap that lies
 * is a cap that will bite later.
 */
async function fetchAllForUser<T>(
  supabase: AdminClient,
  table: string,
  columns: string,
  userId: string,
  maxRows = 20000,
): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; from < maxRows; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .eq("user_id", userId)
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(error.message);
    rows.push(...((data as T[]) || []));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return rows;
}

type ProfileSummaryRow = {
  current_level: number | null;
  current_streak: number | null;
  level_celebrated: number | null;
  display_name: string | null;
};

/**
 * Read the profile, with or without the celebration column.
 *
 * profile_stats.level_celebrated arrives in
 * supabase/migrations/ADD_LEVEL_CELEBRATED_AND_MILESTONE_OPT_OUT.sql, and code
 * and migrations do not land at the same instant - this route shipped to
 * production on 2026-11-10 a few minutes before the migration was run, and
 * because the column was in the SELECT list, PostgREST failed the whole query
 * and the endpoint returned 500 for every user. The level card stops updating
 * for everybody when that happens.
 *
 * So the column is optional here: ask for it, and if it is not there yet, fall
 * back to the four columns that have always existed. A missing column means
 * level_celebrated is null, which means leveledUp is false - no popups until
 * the migration lands and the backfill seals the mark, which is exactly the
 * behaviour we want in that window anyway.
 *
 * An endpoint this central should not be able to 500 over a cache column.
 */
async function fetchProfile(
  supabase: AdminClient,
  userId: string,
): Promise<{ data: ProfileSummaryRow | null; error: { message: string } | null }> {
  const withColumn = await supabase
    .from("profile_stats")
    .select("current_level, current_streak, level_celebrated, display_name")
    .eq("user_id", userId)
    .maybeSingle();

  if (!withColumn.error) {
    return { data: (withColumn.data as ProfileSummaryRow) ?? null, error: null };
  }
  if (!/level_celebrated/.test(withColumn.error.message)) {
    return { data: null, error: withColumn.error };
  }

  const fallback = await supabase
    .from("profile_stats")
    .select("current_level, current_streak, display_name")
    .eq("user_id", userId)
    .maybeSingle();

  if (fallback.error) return { data: null, error: fallback.error };
  const row = fallback.data as Omit<ProfileSummaryRow, "level_celebrated"> | null;
  return { data: row ? { ...row, level_celebrated: null } : null, error: null };
}

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  const userId = userData?.user?.id;
  if (userError || !userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const [actions, groupRows, likeRows, profileRes] = await Promise.all([
      fetchUserActions(supabase, userId),
      fetchAllForUser<{ parent_post_id: string | null; created_at: string | null }>(
        supabase,
        "group_posts",
        "parent_post_id, created_at",
        userId,
      ),
      fetchAllForUser<{ created_at: string | null }>(supabase, "group_post_likes", "created_at", userId),
      fetchProfile(supabase, userId),
    ]);

    // supabase-js resolves with {data: null, error} on a dropped connection
    // rather than throwing, so the profile read is checked explicitly. A failed
    // read must not be treated as "this user has no level".
    if (profileRes.error) throw new Error(profileRes.error.message);

    const profile = profileRes.data;
    const storedLevel = profile?.current_level ?? null;

    const computed = computePointsFromActivity({
      actions,
      groupRootPosts: groupRows.filter((row) => !row.parent_post_id),
      groupComments: groupRows.filter((row) => Boolean(row.parent_post_id)),
      groupLikesGiven: likeRows,
      likesReceived: [],
      streakBonusPoints: streakBonusPointsFor(profile?.current_streak),
    });

    // Levels never go down: the stored level acts as a floor.
    const levelInfo = getLevelInfoWithLevelFloor(computed.totalPoints, storedLevel);
    const firstLevelAssignment = storedLevel === null || storedLevel < 1;

    // Cache the level for the group feed badges and leaderboards. total_points
    // is written only if the column exists (best-effort optional cache).
    if (levelInfo.level > (storedLevel ?? 0) || firstLevelAssignment) {
      const { error: levelWriteError } = await supabase
        .from("profile_stats")
        .upsert({ user_id: userId, current_level: levelInfo.level }, { onConflict: "user_id" });
      if (levelWriteError) console.error("[POINTS] Could not cache level:", levelWriteError.message);
    }
    await supabase
      .from("profile_stats")
      .update({ total_points: computed.totalPoints } as never)
      .eq("user_id", userId)
      .then(({ error }) => {
        if (error && !/total_points/.test(error.message)) {
          console.error("[POINTS] total_points cache write failed:", error.message);
        }
      });

    /**
     * Whether a celebration is owed, which is a question about durable state
     * and not about what happened in this request.
     *
     * This used to be `levelInfo.level > storedLevel`, computed in the same
     * request that banked the new level - so if the modal never rendered (the
     * user navigated away, the tab was backgrounded, the app was killed, the
     * fetch resolved after unmount) the level was already saved and the
     * celebration was lost for good, with nothing recording that it was owed
     * (defect D1).
     *
     * profile_stats.level_celebrated is the high-water mark of what the user
     * has actually been shown. The level is owed until the client acknowledges
     * it via POST /api/points/celebrated, so it survives reloads, devices, app
     * restarts and server retries. Two tabs will both show it and the second
     * acknowledgement is a no-op - showing good news twice is a far better
     * failure than never showing it (defect D2).
     *
     * Existing users are not greeted retroactively: the backfill sets
     * level_celebrated = current_level for every row, so the first celebration
     * anybody sees is for the first level earned after this ships.
     */
    const celebrated = profile?.level_celebrated ?? null;
    const leveledUp = typeof celebrated === "number" ? levelInfo.level > celebrated : false;

    /**
     * Seed the mark the first time we ever see this user, or the feature never
     * fires for them.
     *
     * null means "never celebrated", and leveledUp above is deliberately false
     * for null - that is what stopped the 2026-11-10 backfill greeting 1,153
     * existing users with a popup for a level they were silently given. The
     * backfill sealed every row that existed at the time.
     *
     * But nothing else writes this column. POST /api/points/celebrated only
     * runs after a popup has been shown, so a user created AFTER the backfill
     * would sit at null for ever: they would reach Level 2, 3, 10, and
     * leveledUp would stay false every time. The celebration would never fire
     * for anybody who joins from now on.
     *
     * So the first time a user is seen with no mark, it is set to the level
     * they already have and no popup is shown. That is the same baseline the
     * backfill established, applied one user at a time, and the next level they
     * actually earn is the first one they see.
     */
    if (celebrated === null) {
      const { error: seedError } = await supabase
        .from("profile_stats")
        .upsert({ user_id: userId, level_celebrated: levelInfo.level }, { onConflict: "user_id" });
      if (seedError) console.error("[POINTS] Could not seed level_celebrated:", seedError.message);
    }

    return NextResponse.json({
      totalPoints: levelInfo.totalPoints,
      studyPoints: computed.studyPoints,
      socialPoints: computed.socialPoints,
      bonusPoints: computed.bonusPoints,
      level: levelInfo.level,
      levelName: levelInfo.levelName,
      identityText: levelInfo.identityText,
      encouragementText: levelInfo.encouragementText,
      progressPercent: levelInfo.progressPercent,
      pointsToNextLevel: levelInfo.pointsToNextLevel,
      nextLevelName: levelInfo.nextLevel?.levelName ?? null,
      nextLevel: levelInfo.nextLevel?.level ?? null,
      previousLevel: storedLevel,
      displayName: profile?.display_name ?? null,
      levelCelebrated: celebrated,
      leveledUp,
    });
  } catch (error) {
    console.error("[POINTS] Failed to compute points summary:", error);
    return NextResponse.json({ error: "Could not compute points." }, { status: 500 });
  }
}
