import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ACTION_POINT_WEIGHTS, getLevelInfoFromPoints } from "@/lib/levelSystem";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DAY_MS = 24 * 60 * 60 * 1000;
const TOP_BUDDIES_WINDOW_DAYS = 30;
const FRIEND_ACTIVITY_WINDOW_DAYS = 14;
const PAGE_SIZE = 1000;

type ProfileRow = {
  user_id: string;
  username: string | null;
  display_name: string | null;
  profile_image_url: string | null;
  current_level: number | null;
  current_streak: number | null;
  selected_streak_flame: string | null;
  is_paid: boolean | null;
  member_badge: string | null;
};

type ActionRow = {
  user_id: string | null;
  action_type: string | null;
  action_label: string | null;
  created_at: string | null;
};

type CompletedChapterRow = {
  user_id: string | null;
  completed_at: string | null;
};

type BuddyRow = {
  user_id_1: string | null;
  user_id_2: string | null;
};

type BuddyRequestRow = {
  sender_id: string | null;
  receiver_id: string | null;
};

type DeepStudySessionRow = {
  id: string | null;
  user_id: string | null;
  active_minutes: number | null;
  diamonds_earned: number | null;
  focus_score: number | null;
  chapters_studied: string[] | null;
  ended_at: string | null;
  started_at: string | null;
};

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

const COMPLETED_TASK_ACTIONS = Object.keys(BUDDY_SCORE_WEIGHTS);

const BUDDY_ACTIVITY_ACTIONS = [
  "chapter_completed",
  "reading_plan_chapter_completed",
  "chapter_notes_viewed",
  "chapter_notes_reviewed",
  "trivia_started",
  "trivia_question_answered",
  "trivia_question_correct",
  "trivia_chapter_completed",
  "scrambled_word_answered",
  "scrambled_chapter_completed",
  "devotional_day_completed",
  "devotional_reflection_saved",
  "louis_daily_task_bonus",
  "verse_highlighted",
  "understand_verse_of_the_day",
  "note_created",
  "person_learned",
  "place_discovered",
  "keyword_mastered",
  "badge_earned",
  "buddy_added",
  "feed_post_thought",
  "feed_post_prayer",
  "feed_post_prayer_request",
  "feed_post_photo",
  "feed_post_video",
  "feed_post_commented",
  "feed_post_replied",
  "bible_buddy_tv_video_started",
  "invite_buddy_opened",
  "dashboard_card_opened",
  "series_week_started",
  "series_week_notes_opened",
  "study_group_article_opened",
  "study_group_bible_study_card_opened",
];

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

function displayName(profile?: ProfileRow | null) {
  return profile?.display_name || profile?.username || "Bible Buddy";
}

function formatActivity(action: ActionRow) {
  const label = (action.action_label || "").replace(/\s+Review Opened$/i, "").trim();
  switch (action.action_type) {
    case "chapter_notes_viewed":
      return label ? `opened notes for ${label}` : "opened Bible study notes";
    case "trivia_started":
      return label ? `started trivia for ${label}` : "started Bible trivia";
    case "trivia_question_answered":
    case "trivia_question_correct":
      return label ? `answered trivia in ${label}` : "answered Bible trivia";
    case "scrambled_word_answered":
      return label ? `solved a Scrambled word in ${label}` : "solved a Scrambled word";
    case "devotional_day_completed":
      return label ? `completed ${label}` : "completed a Bible study day";
    case "chapter_completed":
    case "reading_plan_chapter_completed":
      return label ? `finished ${label}` : "finished a Bible chapter";
    case "chapter_notes_reviewed":
      return label ? `reviewed notes for ${label}` : "reviewed chapter notes";
    case "trivia_chapter_completed":
      return label ? `finished trivia for ${label}` : "finished chapter trivia";
    case "scrambled_chapter_completed":
      return label ? `finished Scrambled for ${label}` : "finished a Scrambled round";
    case "devotional_reflection_saved":
      return label ? `shared a reflection for ${label}` : "shared a reflection";
    case "louis_daily_task_bonus":
      return "completed all 6 Bible tasks";
    case "note_created":
      return "created a Bible note";
    case "verse_highlighted":
      return label ? `highlighted ${label}` : "highlighted a Bible verse";
    case "understand_verse_of_the_day":
      return "studied the verse of the day";
    case "person_learned":
      return label ? `learned about ${label}` : "learned about a Bible person";
    case "place_discovered":
      return label ? `discovered ${label}` : "discovered a Bible place";
    case "keyword_mastered":
      return label ? `mastered ${label}` : "mastered a Bible keyword";
    case "badge_earned":
      return label ? `earned the ${label} badge` : "earned a badge";
    case "buddy_added":
      return label ? `became Buddies with ${label}` : "added a Bible Buddy";
    case "invite_buddy_opened":
      return "opened their Bible Buddy invite";
    case "dashboard_card_opened":
      return label ? `opened ${label}` : "opened a dashboard card";
    case "series_week_started":
      return label ? `started ${label}` : "started a group Bible study";
    case "series_week_notes_opened":
    case "study_group_article_opened":
    case "study_group_bible_study_card_opened":
      return label ? `opened ${label}` : "opened a community Bible study";
    case "bible_buddy_tv_video_started":
      return label ? `watched ${label}` : "watched Bible Buddy TV";
    case "feed_post_commented":
    case "feed_post_replied":
      return "joined a community conversation";
    case "feed_post_thought":
    case "feed_post_prayer":
    case "feed_post_prayer_request":
      return "shared with the community";
    default:
      return label || "made progress in Bible Buddy";
  }
}

function toDateKey(value: string | null) {
  return value ? value.slice(0, 10) : "";
}

function formatDeepStudyActivity(session: DeepStudySessionRow) {
  const minutes = Math.max(0, Number(session.active_minutes || 0));
  const chapter = Array.isArray(session.chapters_studied) && session.chapters_studied.length > 0
    ? session.chapters_studied[0]
    : null;
  const chapterText = chapter ? ` while studying ${chapter}` : "";
  return `finished ${minutes || "a"} minute${minutes === 1 ? "" : "s"} of Deep Study${chapterText}`;
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
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const topSinceIso = new Date(Date.now() - TOP_BUDDIES_WINDOW_DAYS * DAY_MS).toISOString();
  const friendSinceIso = new Date(Date.now() - FRIEND_ACTIVITY_WINDOW_DAYS * DAY_MS).toISOString();

  try {
    const [profiles, actions, completedChapters, buddyRows, buddyRequestRows] = await Promise.all([
      fetchPaged<ProfileRow>((from, to) =>
        supabaseAdmin
          .from("profile_stats")
          .select("user_id, username, display_name, profile_image_url, current_level, current_streak, selected_streak_flame, is_paid, member_badge")
          .range(from, to),
      ),
      fetchPaged<ActionRow>((from, to) =>
        supabaseAdmin
          .from("master_actions")
          .select("user_id, action_type, action_label, created_at")
          .in("action_type", BUDDY_ACTIVITY_ACTIONS)
          .gte("created_at", friendSinceIso)
          .order("created_at", { ascending: false })
          .range(from, to),
      ),
      fetchPaged<CompletedChapterRow>((from, to) =>
        supabaseAdmin
          .from("completed_chapters")
          .select("user_id, completed_at")
          .gte("completed_at", topSinceIso)
          .range(from, to),
      ),
      supabaseAdmin
        .from("buddies")
        .select("user_id_1, user_id_2")
        .or(`user_id_1.eq.${userData.user.id},user_id_2.eq.${userData.user.id}`),
      supabaseAdmin
        .from("buddy_requests")
        .select("sender_id, receiver_id")
        .eq("status", "accepted")
        .or(`sender_id.eq.${userData.user.id},receiver_id.eq.${userData.user.id}`),
    ]);

    const profileMap = new Map(profiles.map((profile) => [profile.user_id, profile]));
    const scoreMap = new Map<string, { score: number; taskCount: number; weightedXp: number; lastActionAt: string | null }>();
    const chapterActionKeys = new Set<string>();

    actions.forEach((action) => {
      if (!action.user_id || !action.action_type) return;
      if (!action.created_at || action.created_at < topSinceIso) return;
      if (action.action_type === "chapter_completed" || action.action_type === "reading_plan_chapter_completed") {
        chapterActionKeys.add(`${action.user_id}:${toDateKey(action.created_at)}`);
      }
      const current = scoreMap.get(action.user_id) || { score: 0, taskCount: 0, weightedXp: 0, lastActionAt: null };
      const taskScore = BUDDY_SCORE_WEIGHTS[action.action_type] || 0;
      if (taskScore <= 0) return;
      current.score += taskScore;
      current.weightedXp += ACTION_POINT_WEIGHTS[action.action_type as keyof typeof ACTION_POINT_WEIGHTS] ?? 0;
      current.taskCount += 1;
      if (!current.lastActionAt || (action.created_at && action.created_at > current.lastActionAt)) current.lastActionAt = action.created_at;
      scoreMap.set(action.user_id, current);
    });

    completedChapters.forEach((row) => {
      if (!row.user_id) return;
      const current = scoreMap.get(row.user_id) || { score: 0, taskCount: 0, weightedXp: 0, lastActionAt: null };
      if (!chapterActionKeys.has(`${row.user_id}:${toDateKey(row.completed_at)}`)) {
        current.score += BUDDY_SCORE_WEIGHTS.chapter_completed;
        current.taskCount += 1;
      }
      if (!current.lastActionAt || (row.completed_at && row.completed_at > current.lastActionAt)) current.lastActionAt = row.completed_at;
      scoreMap.set(row.user_id, current);
    });

    const topBuddies = Array.from(scoreMap.entries())
      .map(([userId, scoreData]) => {
        const profile = profileMap.get(userId);
        const fallbackLevel = getLevelInfoFromPoints(scoreData.weightedXp).level;
        return {
          userId,
          displayName: displayName(profile),
          username: profile?.username || null,
          profileImageUrl: profile?.profile_image_url || null,
          currentLevel: Math.max(1, profile?.current_level || fallbackLevel),
          currentStreak: profile?.current_streak || 0,
          selectedStreakFlame: profile?.selected_streak_flame || null,
          memberBadge: profile?.member_badge || null,
          isPaid: profile?.is_paid === true,
          score: Math.round(scoreData.score),
          taskCount: scoreData.taskCount,
          communityCount: 0,
          lastActionAt: scoreData.lastActionAt,
        };
      })
      .filter((buddy) => buddy.score > 0)
      .sort((a, b) => b.score - a.score || b.taskCount - a.taskCount || b.currentLevel - a.currentLevel)
      .slice(0, 10)
      .map((buddy, index) => ({ ...buddy, rank: index + 1 }));

    const buddyIds = new Set(
      ((buddyRows.data || []) as BuddyRow[])
        .map((row) => (row.user_id_1 === userData.user.id ? row.user_id_2 : row.user_id_1))
        .filter((id): id is string => typeof id === "string" && id.length > 0),
    );
    ((buddyRequestRows.data || []) as BuddyRequestRow[])
      .map((row) => (row.sender_id === userData.user.id ? row.receiver_id : row.sender_id))
      .filter((id): id is string => typeof id === "string" && id.length > 0)
      .forEach((id) => buddyIds.add(id));

    const buddyIdList = [...buddyIds];
    const { data: deepStudyRows } = buddyIdList.length > 0
      ? await supabaseAdmin
          .from("deep_study_sessions")
          .select("id, user_id, active_minutes, diamonds_earned, focus_score, chapters_studied, ended_at, started_at")
          .in("user_id", buddyIdList)
          .gte("ended_at", friendSinceIso)
          .order("ended_at", { ascending: false })
          .limit(30)
      : { data: [] as DeepStudySessionRow[] | null };

    const actionTimeline = actions
      .filter(
        (action) =>
          !!action.user_id &&
          buddyIds.has(action.user_id) &&
          !!action.action_type &&
          BUDDY_ACTIVITY_ACTIONS.includes(action.action_type) &&
          !!action.created_at &&
          action.created_at >= friendSinceIso,
      )
      .map((action) => {
        const profile = profileMap.get(action.user_id!);
        return {
          id: `${action.user_id}:${action.action_type}:${action.created_at}`,
          userId: action.user_id,
          displayName: displayName(profile),
          profileImageUrl: profile?.profile_image_url || null,
          actionText: formatActivity(action),
          createdAt: action.created_at,
          actionType: action.action_type,
        };
      });

    const deepStudyTimeline = ((deepStudyRows || []) as DeepStudySessionRow[])
      .filter((session) => session.user_id && buddyIds.has(session.user_id))
      .map((session) => {
        const profile = profileMap.get(session.user_id!);
        return {
          id: `deep-study:${session.id || session.user_id}:${session.ended_at || session.started_at}`,
          userId: session.user_id,
          displayName: displayName(profile),
          profileImageUrl: profile?.profile_image_url || null,
          actionText: formatDeepStudyActivity(session),
          createdAt: session.ended_at || session.started_at,
          actionType: "deep_study_session",
        };
      });

    const friendTimeline = [...actionTimeline, ...deepStudyTimeline]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 60);

    return NextResponse.json({
      topBuddies,
      friendTimeline,
      meta: {
        topWindowDays: TOP_BUDDIES_WINDOW_DAYS,
        friendWindowDays: FRIEND_ACTIVITY_WINDOW_DAYS,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("[BUDDIES_DASHBOARD] Could not load dashboard:", error);
    return NextResponse.json({ error: error?.message || "Could not load Buddies." }, { status: 500 });
  }
}
