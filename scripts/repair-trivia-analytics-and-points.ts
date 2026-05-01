import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

import { ACTION_TYPE } from "../lib/actionTypes";
import { calculateWeightedPoints, getLevelInfoFromPoints } from "../lib/levelSystem";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const dryRun = process.argv.includes("--dry-run");
const JESSICA_BONUS_ACTION_LABEL = "admin_bonus_points:1000:jessica-april-2026";

type TriviaActionRow = {
  id: string;
  user_id: string;
  action_type: string;
  action_label: string | null;
  created_at: string;
};

type TriviaProgressRow = {
  user_id: string;
  question_id: string;
};

const PAGE_SIZE = 1000;

type ProfileCountRow = {
  chapters_completed_count: number | null;
  notes_created_count: number | null;
  people_learned_count: number | null;
  places_discovered_count: number | null;
  keywords_mastered_count: number | null;
  devotional_days_completed_count: number | null;
};

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function getTotalActionsFromProfileCounts(counts: ProfileCountRow | null, triviaCorrectCount: number) {
  return (
    (counts?.chapters_completed_count || 0) +
    (counts?.notes_created_count || 0) +
    (counts?.people_learned_count || 0) +
    (counts?.places_discovered_count || 0) +
    (counts?.keywords_mastered_count || 0) +
    (counts?.devotional_days_completed_count || 0) +
    triviaCorrectCount
  );
}

function formatError(error: unknown) {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }

  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error);
  }

  return String(error);
}

function toTriviaActionLabel(questionId: string) {
  return questionId.replace(/(\w+)(\d+)/, "$1_$2");
}

async function fetchAllTriviaActions(): Promise<TriviaActionRow[]> {
  const rows: TriviaActionRow[] = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await supabase
      .from("master_actions")
      .select("id, user_id, action_type, action_label, created_at")
      .in("action_type", [ACTION_TYPE.trivia_question_answered, ACTION_TYPE.trivia_question_correct])
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(from, to);

    if (error) {
      throw error;
    }

    const page = (data || []) as TriviaActionRow[];
    rows.push(...page);

    if (page.length < PAGE_SIZE) {
      break;
    }
  }

  return rows;
}

async function fetchAllCorrectTriviaProgress(): Promise<TriviaProgressRow[]> {
  const rows: TriviaProgressRow[] = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await supabase
      .from("trivia_question_progress")
      .select("user_id, question_id")
      .eq("is_correct", true)
      .range(from, to);

    if (error) {
      throw error;
    }

    const page = (data || []) as TriviaProgressRow[];
    rows.push(...page);

    if (page.length < PAGE_SIZE) {
      break;
    }
  }

  return rows;
}

async function recalculateCurrentLevel(userId: string): Promise<number> {
  const [
    actionsResult,
    groupPostsResult,
    groupLikeGivenResult,
    feedPostsResult,
  ] = await Promise.all([
    supabase
      .from("master_actions")
      .select("action_type, action_label")
      .eq("user_id", userId),
    supabase
      .from("group_posts")
      .select("id, parent_post_id, like_count")
      .eq("user_id", userId),
    supabase
      .from("group_post_likes")
      .select("post_id", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("feed_posts")
      .select("reaction_counts")
      .eq("user_id", userId),
  ]);

  if (actionsResult.error) throw actionsResult.error;
  if (groupPostsResult.error) throw groupPostsResult.error;
  if (groupLikeGivenResult.error) throw groupLikeGivenResult.error;
  if (feedPostsResult.error) throw feedPostsResult.error;

  const adminBonusActionRows = (actionsResult.data || []).filter((row) =>
    row?.action_label === JESSICA_BONUS_ACTION_LABEL,
  );

  const manualBonusPoints = adminBonusActionRows.reduce((total, row) => {
    const match = typeof row?.action_label === "string"
      ? row.action_label.match(/^admin_bonus_points:(\d+):/)
      : null;
    return total + (match ? Number(match[1]) || 0 : 0);
  }, 0);

  const streakAwardedPoints = (actionsResult.data || []).reduce((total, row) => {
    const match = typeof row?.action_label === "string"
      ? row.action_label.match(/^streak_day:(\d+):\d{4}-\d{2}-\d{2}$/)
      : null;
    return total + (match ? Number(match[1]) || 0 : 0);
  }, 0);

  const actionTypes = (actionsResult.data || [])
    .filter((row) => row?.action_label !== JESSICA_BONUS_ACTION_LABEL)
    .filter((row) => {
      if (row?.action_type !== ACTION_TYPE.scrambled_word_answered) return true;
      return typeof row?.action_label === "string" ? !row.action_label.includes("[no-point]") : true;
    })
    .map((row) => row.action_type)
    .filter((actionType): actionType is string => typeof actionType === "string" && actionType !== "group_message_sent");

  const groupPosts = groupPostsResult.data || [];
  const groupRootPostCount = groupPosts.filter((post) => !post.parent_post_id).length;
  const groupCommentCount = groupPosts.filter((post) => !!post.parent_post_id).length;
  const groupLikesReceivedCount = groupPosts.reduce((total, post) => total + (post.like_count || 0), 0);
  const groupLikeGivenCount = groupLikeGivenResult.count || 0;
  const feedLikesReceivedCount = (feedPostsResult.data || []).reduce((total, post) => {
    const reactionCounts = post.reaction_counts && typeof post.reaction_counts === "object"
      ? post.reaction_counts as Record<string, number>
      : {};
    return total + Object.values(reactionCounts).reduce((sum, count) => sum + (Number(count) || 0), 0);
  }, 0);

  const weightedPoints = calculateWeightedPoints({
    actionTypes,
    groupRootPostCount,
    groupCommentCount,
    groupLikeGivenCount,
    likesReceivedCount: groupLikesReceivedCount + feedLikesReceivedCount,
    streakBonusPoints: streakAwardedPoints,
    manualBonusPoints,
  });

  return getLevelInfoFromPoints(weightedPoints.totalPoints).level;
}

async function main() {
  console.log(dryRun ? "[TRIVIA REPAIR] Running in dry-run mode." : "[TRIVIA REPAIR] Running live repair.");

  const [globalAnsweredResult, globalCorrectResult] = await Promise.all([
    supabase
      .from("master_actions")
      .select("id", { count: "exact", head: true })
      .eq("action_type", ACTION_TYPE.trivia_question_answered),
    supabase
      .from("master_actions")
      .select("id", { count: "exact", head: true })
      .eq("action_type", ACTION_TYPE.trivia_question_correct),
  ]);

  if (globalAnsweredResult.error) throw globalAnsweredResult.error;
  if (globalCorrectResult.error) throw globalCorrectResult.error;

  console.log(`[TRIVIA REPAIR] Global answered rows before repair: ${globalAnsweredResult.count || 0}.`);
  console.log(`[TRIVIA REPAIR] Global correct rows before repair: ${globalCorrectResult.count || 0}.`);

  const triviaActions = await fetchAllTriviaActions();

  const seenKeys = new Set<string>();
  const duplicateRows: TriviaActionRow[] = [];
  const impactedUsers = new Set<string>();

  for (const row of triviaActions) {
    const dedupeKey = `${row.user_id}::${row.action_type}::${row.action_label || ""}`;
    if (seenKeys.has(dedupeKey)) {
      duplicateRows.push(row);
      impactedUsers.add(row.user_id);
      continue;
    }
    seenKeys.add(dedupeKey);
  }

  const duplicateAnsweredCount = duplicateRows.filter((row) => row.action_type === ACTION_TYPE.trivia_question_answered).length;
  const duplicateCorrectCount = duplicateRows.filter((row) => row.action_type === ACTION_TYPE.trivia_question_correct).length;

  console.log(`[TRIVIA REPAIR] Found ${duplicateRows.length} duplicate trivia action rows.`);
  console.log(`[TRIVIA REPAIR] Duplicate answered rows: ${duplicateAnsweredCount}.`);
  console.log(`[TRIVIA REPAIR] Duplicate correct rows: ${duplicateCorrectCount}.`);
  console.log(`[TRIVIA REPAIR] Impacted users: ${impactedUsers.size}.`);

  const correctProgressRows = await fetchAllCorrectTriviaProgress();

  const existingCorrectKeys = new Set(
    triviaActions
      .filter((row) => row.action_type === ACTION_TYPE.trivia_question_correct)
      .map((row) => `${row.user_id}::${row.action_label || ""}`),
  );

  console.log(`[TRIVIA REPAIR] Existing correct key count: ${existingCorrectKeys.size}.`);
  if (existingCorrectKeys.size > 0) {
    console.log(`[TRIVIA REPAIR] Sample existing correct key: ${Array.from(existingCorrectKeys)[0]}`);
  }
  if (correctProgressRows.length > 0) {
    const sampleProgress = correctProgressRows[0];
    console.log(
      `[TRIVIA REPAIR] Sample progress key: ${sampleProgress.user_id}::${toTriviaActionLabel(sampleProgress.question_id)}`,
    );
  }

  const missingCorrectRows = correctProgressRows.filter((row) => {
    return !existingCorrectKeys.has(`${row.user_id}::${toTriviaActionLabel(row.question_id)}`);
  });

  const missingCorrectUsers = new Set(missingCorrectRows.map((row) => row.user_id));
  for (const userId of missingCorrectUsers) {
    impactedUsers.add(userId);
  }

  console.log(`[TRIVIA REPAIR] Missing correct rows to backfill: ${missingCorrectRows.length}.`);
  console.log(`[TRIVIA REPAIR] Users needing correct-point backfill: ${missingCorrectUsers.size}.`);

  if (!dryRun && duplicateRows.length > 0) {
    for (const ids of chunk(duplicateRows.map((row) => row.id), 500)) {
      const { error: deleteError } = await supabase
        .from("master_actions")
        .delete()
        .in("id", ids);

      if (deleteError) {
        throw deleteError;
      }
    }
    console.log("[TRIVIA REPAIR] Deleted duplicate trivia master_actions rows.");
  }

  if (!dryRun && missingCorrectRows.length > 0) {
    const userIds = Array.from(new Set(missingCorrectRows.map((row) => row.user_id)));
    const usernameMap = new Map<string, string>();

    for (const userIdChunk of chunk(userIds, 500)) {
      const { data: profiles, error: profilesError } = await supabase
        .from("profile_stats")
        .select("user_id, username, display_name")
        .in("user_id", userIdChunk);

      if (profilesError) {
        throw profilesError;
      }

      for (const profile of profiles || []) {
        const preferredName =
          (typeof profile.username === "string" && profile.username.trim()) ||
          (typeof profile.display_name === "string" && profile.display_name.trim()) ||
          "User";
        usernameMap.set(profile.user_id, preferredName);
      }
    }

    for (const rowChunk of chunk(missingCorrectRows, 500)) {
      const payload = rowChunk.map((row) => ({
        user_id: row.user_id,
        action_type: ACTION_TYPE.trivia_question_correct,
        action_label: toTriviaActionLabel(row.question_id),
        username: usernameMap.get(row.user_id) || "User",
      }));

      const { error: insertError } = await supabase
        .from("master_actions")
        .insert(payload);

      if (insertError) {
        throw insertError;
      }
    }

    console.log("[TRIVIA REPAIR] Backfilled missing trivia_question_correct rows.");
  }

  let syncedUsers = 0;
  for (const userId of impactedUsers) {
    try {
      console.log(`[TRIVIA REPAIR] Syncing user ${userId}...`);
      const [
        answeredCountResult,
        correctCountResult,
        profileCountsResult,
      ] = await Promise.all([
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("action_type", ACTION_TYPE.trivia_question_answered),
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("action_type", ACTION_TYPE.trivia_question_correct),
        supabase
          .from("profile_stats")
          .select("chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count, keywords_mastered_count, devotional_days_completed_count")
          .eq("user_id", userId)
          .limit(1),
      ]);

      if (answeredCountResult.error) {
        console.error(`[TRIVIA REPAIR] answeredCountResult error for ${userId}: ${formatError(answeredCountResult.error)}`);
        throw answeredCountResult.error;
      }
      if (correctCountResult.error) {
        console.error(`[TRIVIA REPAIR] correctCountResult error for ${userId}: ${formatError(correctCountResult.error)}`);
        throw correctCountResult.error;
      }
      if (profileCountsResult.error) {
        console.error(`[TRIVIA REPAIR] profileCountsResult error for ${userId}: ${formatError(profileCountsResult.error)}`);
        throw profileCountsResult.error;
      }

      const triviaQuestionsAnswered = answeredCountResult.count || 0;
      const triviaCorrectCount = correctCountResult.count || 0;
      const profileCounts = Array.isArray(profileCountsResult.data)
        ? (profileCountsResult.data[0] as ProfileCountRow | undefined) ?? null
        : null;
      const totalActions = getTotalActionsFromProfileCounts(profileCounts, triviaCorrectCount);
      let currentLevel: number | null = null;
      try {
        currentLevel = await recalculateCurrentLevel(userId);
      } catch (levelError) {
        console.warn(`[TRIVIA REPAIR] Could not recalculate current_level for ${userId}: ${formatError(levelError)}`);
      }

      console.log(
        `[TRIVIA REPAIR] ${userId}: answered=${triviaQuestionsAnswered}, correct=${triviaCorrectCount}, total_actions=${totalActions}, current_level=${currentLevel}`,
      );

      if (!dryRun) {
        const updatePayload: Record<string, string | number> = {
          user_id: userId,
          trivia_questions_answered: triviaQuestionsAnswered,
          trivia_correct_count: triviaCorrectCount,
          total_actions: totalActions,
          updated_at: new Date().toISOString(),
        };
        if (typeof currentLevel === "number") {
          updatePayload.current_level = currentLevel;
        }

        const { error: updateError } = await supabase
          .from("profile_stats")
          .upsert(
            updatePayload,
            { onConflict: "user_id" },
          );

        if (updateError) {
          throw updateError;
        }
      }

      syncedUsers += 1;
    } catch (error) {
      console.error(`[TRIVIA REPAIR] Failed while syncing user ${userId}: ${formatError(error)}`);
      throw error;
    }
  }

  console.log(`[TRIVIA REPAIR] Synced ${syncedUsers} impacted users.`);
  console.log("[TRIVIA REPAIR] Complete.");
}

main().catch((error) => {
  console.error("[TRIVIA REPAIR] Failed:", formatError(error));
  process.exit(1);
});
