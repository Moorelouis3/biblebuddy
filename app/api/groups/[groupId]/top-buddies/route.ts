import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ACTION_POINT_WEIGHTS, getLevelInfoFromPoints } from "@/lib/levelSystem";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 1000;
const LEADERBOARD_CACHE_MS = 10 * 60 * 1000;

let leaderboardCache: {
  expiresAt: number;
  weeklyBuddies: ReturnType<typeof buildLeaderboard>;
  allTimeBuddies: ReturnType<typeof buildLeaderboard>;
} | null = null;

type ProfileRow = {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  member_badge: string | null;
  is_paid: boolean | null;
  current_streak: number | null;
  current_level: number | null;
  chapters_completed_count: number | null;
  notes_created_count: number | null;
  people_learned_count: number | null;
  places_discovered_count: number | null;
  keywords_mastered_count: number | null;
  trivia_questions_answered: number | null;
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

type GroupPostRow = {
  id: string;
  user_id: string | null;
  created_at: string | null;
  parent_post_id: string | null;
};

type GroupLikeRow = {
  user_id: string | null;
  created_at: string | null;
};

type CompletedChapterRow = {
  user_id: string | null;
  completed_at: string | null;
};

type ArticleCommentRow = {
  user_id: string | null;
  article_slug: string | null;
  created_at: string | null;
};

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

function getManualBonusPoints(actionLabel: string | null) {
  const match = actionLabel?.match(/^admin_bonus_points:(\d+):/);
  return match ? Number(match[1]) || 0 : 0;
}

function getActionPoints(action: ActionRow) {
  if (!action.action_type) return 0;
  if (action.action_type === "scrambled_word_answered" && action.action_label?.includes("[no-point]")) return 0;
  return (ACTION_POINT_WEIGHTS[action.action_type as keyof typeof ACTION_POINT_WEIGHTS] ?? 0) + getManualBonusPoints(action.action_label);
}

function getWindowStart(scope: "week" | "allTime") {
  if (scope === "allTime") return null;
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
}

function safeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function buildLeaderboard(options: {
  profiles: ProfileRow[];
  actions: ActionRow[];
  completedChapters: CompletedChapterRow[];
  articleComments: ArticleCommentRow[];
  groupPosts: GroupPostRow[];
  groupLikes: GroupLikeRow[];
  scope: "week" | "allTime";
}) {
  const sinceIso = getWindowStart(options.scope);
  const stats = new Map<string, {
    points: number;
    appXp: number;
    posts: number;
    comments: number;
    likes: number;
    actions: number;
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
    articleComments: number;
  }>();

  function ensure(userId: string) {
    let current = stats.get(userId);
    if (!current) {
      current = {
        points: 0,
        appXp: 0,
        posts: 0,
        comments: 0,
        likes: 0,
        actions: 0,
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
        articleComments: 0,
      };
      stats.set(userId, current);
    }
    return current;
  }

  options.profiles.forEach((profile) => {
    if (profile.user_id) ensure(profile.user_id);
  });

  options.actions.forEach((action) => {
    if (!action.user_id || !action.action_type) return;
    if (sinceIso && (!action.created_at || action.created_at < sinceIso)) return;
    if (action.action_type === "study_group_feed_viewed" && action.action_label?.startsWith("top_buddies_")) return;
    const current = ensure(action.user_id);
    const points = getActionPoints(action);
    current.points += points;
    current.appXp += points;
    current.actions += 1;
    if (TASK_ACTIONS.has(action.action_type)) current.taskActions += 1;
    if (BIBLE_READING_ACTIONS.has(action.action_type)) current.bibleActions += 1;
    if (COMMUNITY_ACTIONS.has(action.action_type)) current.communityActions += 1;
    if (action.action_type === "chapter_notes_reviewed") current.notesReviewed += 1;
    if (action.action_type === "trivia_question_answered") current.triviaAnswered += 1;
    if (action.action_type === "trivia_question_correct") current.triviaCorrect += 1;
    if (action.action_type === "trivia_chapter_completed") current.triviaCompleted += 1;
    if (action.action_type === "scrambled_word_answered") current.scrambledWords += 1;
    if (action.action_type === "scrambled_chapter_completed") current.scrambledCompleted += 1;
    if (action.action_type === "devotional_reflection_saved") current.reflections += 1;
  });

  options.completedChapters.forEach((row) => {
    if (!row.user_id) return;
    if (sinceIso && (!row.completed_at || row.completed_at < sinceIso)) return;
    ensure(row.user_id).bibleActions += 1;
  });

  options.articleComments.forEach((comment) => {
    if (!comment.user_id) return;
    if (sinceIso && (!comment.created_at || comment.created_at < sinceIso)) return;
    const current = ensure(comment.user_id);
    current.articleComments += 1;
    current.communityActions += 1;
    if ((comment.article_slug || "").startsWith("bible-chapter-")) current.reflections += 1;
  });

  options.groupPosts.forEach((post) => {
    if (!post.user_id) return;
    if (sinceIso && (!post.created_at || post.created_at < sinceIso)) return;
    const current = ensure(post.user_id);
    if (post.parent_post_id) {
      current.comments += 1;
      current.points += 3;
    } else {
      current.posts += 1;
      current.points += 5;
    }
  });

  options.groupLikes.forEach((like) => {
    if (!like.user_id) return;
    if (sinceIso && (!like.created_at || like.created_at < sinceIso)) return;
    const current = ensure(like.user_id);
    current.likes += 1;
    current.points += 1;
  });

  const profileMap = new Map(options.profiles.map((profile) => [profile.user_id, profile]));

  return Array.from(stats.entries())
    .map(([userId, entry]) => {
      const profile = profileMap.get(userId);
      const fallbackLevel = getLevelInfoFromPoints(entry.appXp).level;
      const currentLevel = Math.max(1, profile?.current_level || fallbackLevel);
      const chaptersRead = Math.max(entry.bibleActions, safeNumber(profile?.chapters_completed_count));
      const triviaAnswered = Math.max(entry.triviaAnswered, safeNumber(profile?.trivia_questions_answered));
      const notesReviewed = entry.notesReviewed + safeNumber(profile?.notes_created_count);
      const communityScore = entry.communityActions + entry.posts * 2 + entry.comments + entry.articleComments;
      const taskScore = entry.taskActions + entry.triviaCompleted + entry.scrambledCompleted;
      const learningScore =
        chaptersRead * 8 +
        notesReviewed * 5 +
        triviaAnswered +
        entry.triviaCorrect * 2 +
        entry.scrambledWords * 2 +
        entry.reflections * 8;
      const score = Math.round(
        entry.appXp +
          currentLevel * 75 +
          taskScore * 10 +
          learningScore +
          communityScore * 4 +
          safeNumber(profile?.current_streak) * 5,
      );

      return {
        userId,
        displayName: profile?.display_name || profile?.username || "Buddy",
        username: profile?.username || null,
        profileImageUrl: profile?.profile_image_url ?? null,
        memberBadge: profile?.member_badge ?? null,
        isPaid: !!profile?.is_paid,
        currentStreak: profile?.current_streak ?? null,
        currentLevel,
        posts: entry.posts,
        comments: entry.comments,
        likes: entry.likes,
        appXp: entry.appXp,
        actions: entry.actions,
        score: Math.max(0, score),
      };
    })
    .filter((buddy) => buddy.score > 0 || buddy.posts > 0 || buddy.comments > 0 || buddy.likes > 0)
    .sort((a, b) => b.score - a.score || b.appXp - a.appXp || b.posts - a.posts || b.comments - a.comments || b.likes - a.likes)
    .slice(0, 10)
    .map((buddy, index) => ({ ...buddy, rank: index + 1 }));
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
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

  const { groupId } = await context.params;

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: groupRow, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id")
    .eq("id", groupId)
    .maybeSingle();

  if (groupError) {
    console.error("[GROUP_TOP_BUDDIES] Could not verify group:", groupError);
    return NextResponse.json({ error: "Could not verify group." }, { status: 500 });
  }
  if (!groupRow) {
    return NextResponse.json({ error: "Group not found." }, { status: 404 });
  }

  try {
    let weeklyBuddies = leaderboardCache?.weeklyBuddies || null;
    let allTimeBuddies = leaderboardCache?.allTimeBuddies || null;

    if (!leaderboardCache || leaderboardCache.expiresAt <= Date.now()) {
      const [profiles, actions, completedChapters, articleComments, postRows, likeRows] = await Promise.all([
        fetchPaged<ProfileRow>((from, to) =>
          supabaseAdmin
            .from("profile_stats")
            .select("user_id, display_name, username, profile_image_url, member_badge, is_paid, current_streak, current_level, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count, keywords_mastered_count, trivia_questions_answered, last_active_at, last_active_date, created_at")
            .order("last_active_at", { ascending: false, nullsFirst: false })
            .range(from, to),
        ),
        fetchPaged<ActionRow>((from, to) =>
          supabaseAdmin
            .from("master_actions")
            .select("user_id, action_type, action_label, created_at")
            .order("created_at", { ascending: false })
            .range(from, to),
        ),
        fetchPaged<CompletedChapterRow>((from, to) =>
          supabaseAdmin.from("completed_chapters").select("user_id, completed_at").range(from, to),
        ),
        fetchPaged<ArticleCommentRow>((from, to) =>
          supabaseAdmin.from("article_comments").select("user_id, article_slug, created_at").eq("is_deleted", false).range(from, to),
        ),
        fetchPaged<GroupPostRow>((from, to) =>
          supabaseAdmin
            .from("group_posts")
            .select("id, user_id, created_at, parent_post_id")
            .range(from, to),
        ),
        fetchPaged<GroupLikeRow>((from, to) =>
          supabaseAdmin.from("group_post_likes").select("user_id, created_at").range(from, to),
        ),
      ]);

      weeklyBuddies = buildLeaderboard({
        profiles,
        actions,
        completedChapters,
        articleComments,
        groupPosts: postRows,
        groupLikes: likeRows,
        scope: "week",
      });
      allTimeBuddies = buildLeaderboard({
        profiles,
        actions,
        completedChapters,
        articleComments,
        groupPosts: postRows,
        groupLikes: likeRows,
        scope: "allTime",
      });

      leaderboardCache = {
        expiresAt: Date.now() + LEADERBOARD_CACHE_MS,
        weeklyBuddies,
        allTimeBuddies,
      };
    }

    weeklyBuddies = weeklyBuddies || [];
    allTimeBuddies = allTimeBuddies || [];
    if (weeklyBuddies.length === 0 && allTimeBuddies.length > 0) {
      weeklyBuddies = allTimeBuddies;
    }

    const clickLabelPrefix = `top_buddies_card_opened:${groupId}`;
    const { data: clickRows, error: clickError } = await supabaseAdmin
      .from("master_actions")
      .select("user_id, created_at, username")
      .eq("action_type", "study_group_feed_viewed")
      .like("action_label", `${clickLabelPrefix}%`)
      .order("created_at", { ascending: false })
      .limit(200);

    if (clickError) throw clickError;

    const uniqueClickers = new Set((clickRows || []).map((row) => row.user_id).filter(Boolean));

    return NextResponse.json({
      buddies: weeklyBuddies,
      weeklyBuddies,
      allTimeBuddies,
      engagement: {
        totalClicks: clickRows?.length || 0,
        uniqueClickers: uniqueClickers.size,
      },
      scoring: {
        appXp: "Bible Buddy level XP earned from tracked actions",
        groupPost: 5,
        groupComment: 3,
        groupLike: 1,
        periodDays: 7,
      },
    });
  } catch (error: any) {
    console.error("[GROUP_TOP_BUDDIES] Could not load leaderboard:", error);
    return NextResponse.json({ error: error?.message || "Could not load top buddies." }, { status: 500 });
  }
}
