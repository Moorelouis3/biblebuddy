import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ACTION_POINT_WEIGHTS, getLevelInfoFromPoints } from "@/lib/levelSystem";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";
const PAGE_SIZE = 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const TASK_ACTIONS = new Set([
  "devotional_day_completed",
  "chapter_completed",
  "chapter_notes_reviewed",
  "reading_plan_chapter_completed",
  "trivia_chapter_completed",
  "scrambled_chapter_completed",
  "louis_daily_task_bonus",
]);

const BIBLE_READING_ACTIONS = new Set([
  "chapter_completed",
  "reading_plan_chapter_completed",
]);

const COMMUNITY_ACTIONS = new Set([
  "feed_post_thought",
  "feed_post_prayer",
  "feed_post_prayer_request",
  "feed_post_photo",
  "feed_post_video",
  "feed_post_liked",
  "feed_post_commented",
  "feed_post_replied",
  "buddy_added",
  "study_group_feed_viewed",
  "study_group_article_opened",
  "study_group_bible_study_card_opened",
  "series_week_started",
]);

type ProfileRow = {
  user_id: string;
  username: string | null;
  display_name: string | null;
  profile_image_url: string | null;
  current_level: number | null;
  current_streak: number | null;
  chapters_completed_count: number | null;
  notes_created_count: number | null;
  people_learned_count: number | null;
  places_discovered_count: number | null;
  keywords_mastered_count: number | null;
  trivia_questions_answered: number | null;
  is_paid: boolean | null;
  member_badge: string | null;
  last_active_at: string | null;
  last_active_date: string | null;
  created_at: string | null;
};

type ActionRow = {
  user_id: string | null;
  action_type: string | null;
  action_label: string | null;
  created_at: string | null;
};

type MutableStats = {
  userId: string;
  totalActions: number;
  weightedXp: number;
  taskActions: number;
  bibleActions: number;
  notesReviewed: number;
  triviaAnswered: number;
  triviaCorrect: number;
  triviaCompleted: number;
  scrambledWords: number;
  scrambledCompleted: number;
  reflections: number;
  communityActions: number;
  groupPosts: number;
  groupComments: number;
  groupLikes: number;
  articleComments: number;
  lastActionAt: string | null;
  buddyScore: number;
};

function createStats(userId: string): MutableStats {
  return {
    userId,
    totalActions: 0,
    weightedXp: 0,
    taskActions: 0,
    bibleActions: 0,
    notesReviewed: 0,
    triviaAnswered: 0,
    triviaCorrect: 0,
    triviaCompleted: 0,
    scrambledWords: 0,
    scrambledCompleted: 0,
    reflections: 0,
    communityActions: 0,
    groupPosts: 0,
    groupComments: 0,
    groupLikes: 0,
    articleComments: 0,
    lastActionAt: null,
    buddyScore: 0,
  };
}

const BUDDY_SCORE_WEIGHTS: Record<string, number> = {
  devotional_day_completed: 10,
  chapter_completed: 10,
  reading_plan_chapter_completed: 10,
  chapter_notes_reviewed: 10,
  trivia_chapter_completed: 10,
  scrambled_chapter_completed: 10,
  devotional_reflection_saved: 10,
  louis_daily_task_bonus: 10,
};

const COMMUNITY_SCORE_WEIGHTS = {
  post: 5,
  comment: 5,
  articleComment: 5,
  like: 2,
  maxPosts: 20,
  maxComments: 30,
  maxArticleComments: 30,
  maxLikes: 10,
};

function getStats(map: Map<string, MutableStats>, userId: string) {
  let stats = map.get(userId);
  if (!stats) {
    stats = createStats(userId);
    map.set(userId, stats);
  }
  return stats;
}

function normalizeLimit(value: string | null) {
  const parsed = Number(value);
  if ([10, 20, 50, 100].includes(parsed)) return parsed;
  return 20;
}

function getSinceIso(windowValue: string | null) {
  if (windowValue === "7d") return getWeeklyBoardWindow().start;
  const now = Date.now();
  if (windowValue === "30d") return new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  if (windowValue === "90d") return new Date(now - 90 * 24 * 60 * 60 * 1000).toISOString();
  return null;
}

function getWeeklyBoardWindow(now = new Date()) {
  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const day = new Date(utcMidnight).getUTCDay();
  const daysSinceFriday = (day + 2) % 7;
  const startMs = utcMidnight - daysSinceFriday * DAY_MS;
  const endMs = startMs + 7 * DAY_MS;
  return {
    start: new Date(startMs).toISOString(),
    end: new Date(endMs).toISOString(),
  };
}

async function fetchPaged<T>(
  queryBuilder: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: any }>,
) {
  const rows: T[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await queryBuilder(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    const chunk = data || [];
    rows.push(...chunk);
    if (chunk.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return rows;
}

function safeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user || (userData.user.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const url = new URL(request.url);
  const limit = normalizeLimit(url.searchParams.get("limit"));
  const windowValue = url.searchParams.get("window");
  const sinceIso = getSinceIso(windowValue);
  const untilIso = windowValue === "7d" ? getWeeklyBoardWindow().end : null;

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const [profiles, actions, completedChapters, articleComments, groupPosts, groupLikes] = await Promise.all([
      fetchPaged<ProfileRow>((from, to) =>
        supabaseAdmin
          .from("profile_stats")
          .select(
            "user_id, username, display_name, profile_image_url, current_level, current_streak, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count, keywords_mastered_count, trivia_questions_answered, is_paid, member_badge, last_active_at, last_active_date, created_at",
          )
          .order("last_active_at", { ascending: false, nullsFirst: false })
          .range(from, to),
      ),
      fetchPaged<ActionRow>((from, to) => {
        let query = supabaseAdmin
          .from("master_actions")
          .select("user_id, action_type, action_label, created_at")
          .order("created_at", { ascending: false })
          .range(from, to);
        if (sinceIso) query = query.gte("created_at", sinceIso);
        if (untilIso) query = query.lt("created_at", untilIso);
        return query;
      }),
      fetchPaged<{ user_id: string | null }>((from, to) => {
        let query = supabaseAdmin.from("completed_chapters").select("user_id, completed_at").range(from, to);
        if (sinceIso) query = query.gte("completed_at", sinceIso);
        if (untilIso) query = query.lt("completed_at", untilIso);
        return query;
      }),
      fetchPaged<{ user_id: string | null; article_slug: string | null; created_at: string | null }>((from, to) => {
        let query = supabaseAdmin
          .from("article_comments")
          .select("user_id, article_slug, created_at")
          .eq("is_deleted", false)
          .range(from, to);
        if (sinceIso) query = query.gte("created_at", sinceIso);
        if (untilIso) query = query.lt("created_at", untilIso);
        return query;
      }),
      fetchPaged<{ user_id: string | null; parent_post_id: string | null; created_at: string | null }>((from, to) => {
        let query = supabaseAdmin.from("group_posts").select("user_id, parent_post_id, created_at").range(from, to);
        if (sinceIso) query = query.gte("created_at", sinceIso);
        if (untilIso) query = query.lt("created_at", untilIso);
        return query;
      }),
      fetchPaged<{ user_id: string | null; created_at: string | null }>((from, to) => {
        let query = supabaseAdmin.from("group_post_likes").select("user_id, created_at").range(from, to);
        if (sinceIso) query = query.gte("created_at", sinceIso);
        if (untilIso) query = query.lt("created_at", untilIso);
        return query;
      }),
    ]);

    const statsMap = new Map<string, MutableStats>();

    profiles.forEach((profile) => {
      if (profile.user_id) getStats(statsMap, profile.user_id);
    });

    actions.forEach((action) => {
      if (!action.user_id || !action.action_type) return;
      const stats = getStats(statsMap, action.user_id);
      stats.totalActions += 1;
      stats.weightedXp += ACTION_POINT_WEIGHTS[action.action_type as keyof typeof ACTION_POINT_WEIGHTS] ?? 0;
      stats.buddyScore += BUDDY_SCORE_WEIGHTS[action.action_type] || 0;
      if (TASK_ACTIONS.has(action.action_type)) stats.taskActions += 1;
      if (BIBLE_READING_ACTIONS.has(action.action_type)) stats.bibleActions += 1;
      if (COMMUNITY_ACTIONS.has(action.action_type)) stats.communityActions += 1;
      if (action.action_type === "chapter_notes_reviewed") stats.notesReviewed += 1;
      if (action.action_type === "trivia_question_answered") stats.triviaAnswered += 1;
      if (action.action_type === "trivia_question_correct") stats.triviaCorrect += 1;
      if (action.action_type === "trivia_chapter_completed") stats.triviaCompleted += 1;
      if (action.action_type === "scrambled_word_answered") stats.scrambledWords += 1;
      if (action.action_type === "scrambled_chapter_completed") stats.scrambledCompleted += 1;
      if (action.action_type === "devotional_reflection_saved") stats.reflections += 1;
      if (!stats.lastActionAt || (action.created_at && action.created_at > stats.lastActionAt)) {
        stats.lastActionAt = action.created_at;
      }
    });

    completedChapters.forEach((row) => {
      if (!row.user_id) return;
      getStats(statsMap, row.user_id).bibleActions += 1;
    });

    articleComments.forEach((comment) => {
      if (!comment.user_id) return;
      const stats = getStats(statsMap, comment.user_id);
      stats.articleComments += 1;
      stats.communityActions += 1;
      if ((comment.article_slug || "").startsWith("bible-chapter-")) {
        stats.reflections += 1;
        stats.taskActions += 1;
        stats.buddyScore += BUDDY_SCORE_WEIGHTS.devotional_reflection_saved;
      }
    });

    groupPosts.forEach((post) => {
      if (!post.user_id) return;
      const stats = getStats(statsMap, post.user_id);
      if (post.parent_post_id) stats.groupComments += 1;
      else stats.groupPosts += 1;
      stats.communityActions += 1;
    });

    groupLikes.forEach((like) => {
      if (!like.user_id) return;
      const stats = getStats(statsMap, like.user_id);
      stats.groupLikes += 1;
      stats.communityActions += 1;
    });

    const profileMap = new Map(profiles.map((profile) => [profile.user_id, profile]));
    const buddies = Array.from(statsMap.values())
      .map((stats) => {
        const profile = profileMap.get(stats.userId);
        const fallbackLevel = getLevelInfoFromPoints(stats.weightedXp).level;
        const currentLevel = Math.max(1, profile?.current_level || fallbackLevel);
        const chaptersRead = Math.max(stats.bibleActions, safeNumber(profile?.chapters_completed_count));
        const triviaAnswered = Math.max(stats.triviaAnswered, safeNumber(profile?.trivia_questions_answered));
        const notesReviewed = stats.notesReviewed + safeNumber(profile?.notes_created_count);
        const communityScore =
          Math.min(stats.groupPosts, COMMUNITY_SCORE_WEIGHTS.maxPosts) * COMMUNITY_SCORE_WEIGHTS.post +
          Math.min(stats.groupComments, COMMUNITY_SCORE_WEIGHTS.maxComments) * COMMUNITY_SCORE_WEIGHTS.comment +
          Math.min(stats.articleComments, COMMUNITY_SCORE_WEIGHTS.maxArticleComments) * COMMUNITY_SCORE_WEIGHTS.articleComment +
          Math.min(stats.groupLikes, COMMUNITY_SCORE_WEIGHTS.maxLikes) * COMMUNITY_SCORE_WEIGHTS.like;
        const score = Math.round(stats.buddyScore + communityScore);
        const bibleTaskCount = stats.taskActions + stats.reflections;

        return {
          userId: stats.userId,
          displayName: profile?.display_name || profile?.username || "Bible Buddy",
          username: profile?.username || null,
          profileImageUrl: profile?.profile_image_url || null,
          memberBadge: profile?.member_badge || null,
          isPaid: !!profile?.is_paid,
          currentLevel,
          currentStreak: profile?.current_streak || 0,
          weightedXp: stats.weightedXp,
          score,
          totalActions: stats.totalActions,
          tasksDone: bibleTaskCount,
          chaptersRead,
          notesReviewed,
          triviaAnswered,
          triviaCorrect: stats.triviaCorrect,
          triviaCompleted: stats.triviaCompleted,
          scrambledWords: stats.scrambledWords,
          scrambledCompleted: stats.scrambledCompleted,
          reflections: stats.reflections,
          communityEngagement: communityScore,
          scoreBreakdown: {
            bibleTasks: stats.buddyScore,
            community: communityScore,
            xpTieBreaker: 0,
          },
          groupPosts: stats.groupPosts,
          groupComments: stats.groupComments,
          groupLikes: stats.groupLikes,
          articleComments: stats.articleComments,
          peopleLearned: safeNumber(profile?.people_learned_count),
          placesDiscovered: safeNumber(profile?.places_discovered_count),
          keywordsMastered: safeNumber(profile?.keywords_mastered_count),
          lastActiveAt: stats.lastActionAt || profile?.last_active_at || profile?.last_active_date || null,
          joinedAt: profile?.created_at || null,
        };
      })
      .filter((buddy) => buddy.totalActions > 0 || buddy.weightedXp > 0)
      .sort((a, b) => b.score - a.score || b.tasksDone - a.tasksDone || b.communityEngagement - a.communityEngagement || b.currentLevel - a.currentLevel)
      .slice(0, limit)
      .map((buddy, index) => ({ ...buddy, rank: index + 1 }));

    const totals = {
      usersRanked: statsMap.size,
      totalActions: buddies.reduce((sum, buddy) => sum + buddy.totalActions, 0),
      totalTasks: buddies.reduce((sum, buddy) => sum + buddy.tasksDone, 0),
      totalCommunity: buddies.reduce((sum, buddy) => sum + buddy.communityEngagement, 0),
      topScore: buddies[0]?.score || 0,
    };

    return NextResponse.json({
      buddies,
      totals,
      scoring: {
        summary:
          "Top Buddies are based mostly on Bible study tasks: reading intros, Bible chapters, notes, trivia rounds, Scrambled rounds, and reflections. Community posts and replies count too, but they are worth about half as much and have caps.",
        weights: {
          introCompleted: 10,
          chapterRead: 10,
          notesCompleted: 10,
          triviaCompleted: 10,
          scrambledCompleted: 10,
          reflection: 10,
          post: 5,
          comment: 5,
          like: 2,
          maxCommunityComments: COMMUNITY_SCORE_WEIGHTS.maxComments,
          maxCommunityLikes: COMMUNITY_SCORE_WEIGHTS.maxLikes,
        },
      },
    });
  } catch (error: any) {
    console.error("[TOP_BUDDIES_ADMIN] Could not load top buddies:", error);
    return NextResponse.json({ error: error?.message || "Could not load top buddies." }, { status: 500 });
  }
}
