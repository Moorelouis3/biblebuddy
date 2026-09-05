import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getLevelInfoWithLevelFloor } from "@/lib/levelSystem";
import { computePointsFromActivity, streakBonusPointsFor, type PointsActionRow } from "@/lib/pointsEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 1000;
const MAX_ACTION_ROWS = 30000;

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function fetchUserActions(supabase: NonNullable<ReturnType<typeof createAdminClient>>, userId: string) {
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
    const [actions, postsRes, likesRes, profileRes] = await Promise.all([
      fetchUserActions(supabase, userId),
      supabase.from("group_posts").select("parent_post_id, created_at").eq("user_id", userId).limit(5000),
      supabase.from("group_post_likes").select("created_at").eq("user_id", userId).limit(5000),
      supabase.from("profile_stats").select("current_level, current_streak").eq("user_id", userId).maybeSingle(),
    ]);

    const groupRows = (postsRes.data as Array<{ parent_post_id: string | null; created_at: string | null }> | null) || [];
    const profile = profileRes.data as { current_level: number | null; current_streak: number | null } | null;
    const storedLevel = profile?.current_level ?? null;

    const computed = computePointsFromActivity({
      actions,
      groupRootPosts: groupRows.filter((row) => !row.parent_post_id),
      groupComments: groupRows.filter((row) => Boolean(row.parent_post_id)),
      groupLikesGiven: (likesRes.data as Array<{ created_at: string | null }> | null) || [],
      likesReceived: [],
      streakBonusPoints: streakBonusPointsFor(profile?.current_streak),
    });

    // Levels never go down: the stored level acts as a floor.
    const levelInfo = getLevelInfoWithLevelFloor(computed.totalPoints, storedLevel);
    const leveledUp = typeof storedLevel === "number" && storedLevel >= 1 && levelInfo.level > storedLevel;
    const firstLevelAssignment = storedLevel === null || storedLevel < 1;

    // Cache the level for the group feed badges and leaderboards. total_points
    // is written only if the column exists (best-effort optional cache).
    if (leveledUp || firstLevelAssignment) {
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
      leveledUp,
    });
  } catch (error) {
    console.error("[POINTS] Failed to compute points summary:", error);
    return NextResponse.json({ error: "Could not compute points." }, { status: 500 });
  }
}
