import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { resolveBadges } from "@/lib/badgeAwards";
import { computePointsFromActivity, streakBonusPointsFor, type PointsActionRow } from "@/lib/pointsEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Where the signed-in reader stands on every achievement badge. Read-only.
 *
 * Read by the levels page (components/levels/LevelsPage.tsx). It never unlocks
 * a badge: that happens in GET /api/points/summary, the one request the
 * dashboard already makes, so a badge unlocks where it can be announced and
 * two requests from one page cannot each unlock one. Both routes go through
 * resolveBadges() in lib/badgeAwards.ts with the same inputs, so the list here
 * and the XP there cannot disagree.
 */

const PAGE_SIZE = 1000;
const MAX_ACTION_ROWS = 120000;

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

type AdminClient = NonNullable<ReturnType<typeof createAdminClient>>;

/** Every row a user has in a table, a page at a time. A failed page is an error, never "no rows". */
async function fetchAllForUser<T>(supabase: AdminClient, table: string, columns: string, userId: string, orderBy?: string): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; from < MAX_ACTION_ROWS; from += PAGE_SIZE) {
    let query = supabase.from(table).select(columns).eq("user_id", userId);
    if (orderBy) query = query.order(orderBy, { ascending: true });
    const { data, error } = await query.range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...((data as T[]) || []));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return rows;
}

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  if (!supabase) return NextResponse.json({ error: "Server not configured." }, { status: 500 });

  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  const userId = userData?.user?.id;
  if (userError || !userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const [actions, groupRows, likeRows, profileRes] = await Promise.all([
      fetchAllForUser<PointsActionRow>(supabase, "master_actions", "action_type, action_label, created_at", userId, "created_at"),
      fetchAllForUser<{ parent_post_id: string | null; created_at: string | null }>(supabase, "group_posts", "parent_post_id, created_at", userId),
      fetchAllForUser<{ created_at: string | null }>(supabase, "group_post_likes", "created_at", userId),
      supabase.from("profile_stats").select("current_streak").eq("user_id", userId).maybeSingle(),
    ]);
    if (profileRes.error) throw new Error(`profile_stats: ${profileRes.error.message}`);

    const currentStreak = Number((profileRes.data as { current_streak: number | null } | null)?.current_streak) || 0;
    const groupRootPosts = groupRows.filter((row) => !row.parent_post_id);
    const groupComments = groupRows.filter((row) => Boolean(row.parent_post_id));

    const resolution = await resolveBadges({
      supabase,
      userId,
      actions,
      groupCommentCount: groupComments.length,
      groupLikeCount: likeRows.length,
      currentStreak,
      allowUnlock: false,
      // The same call, with the same inputs, that /api/points/summary makes.
      totalWith: (badgeBonusPoints) =>
        computePointsFromActivity({
          actions,
          groupRootPosts,
          groupComments,
          groupLikesGiven: likeRows,
          likesReceived: [],
          streakBonusPoints: streakBonusPointsFor(currentStreak),
          badgeBonusPoints,
        }).totalPoints,
    });

    const badges = resolution.statuses;
    return NextResponse.json({
      badges,
      earnedCount: badges.filter((badge) => badge.earned).length,
      readyCount: badges.filter((badge) => badge.ready).length,
      totalCount: badges.length,
      badgeXp: resolution.badgeBonusPoints,
    });
  } catch (error) {
    console.error("[BADGES] Failed to build badge summary:", error);
    return NextResponse.json({ error: "Could not load badges." }, { status: 500 });
  }
}
