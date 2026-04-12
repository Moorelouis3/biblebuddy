import { getDirectMessagePreview, isMissingDirectMessageActionColumnError } from "@/lib/directMessageActions";

const LOUIS_EMAIL = "moorelouis3@gmail.com";
const MILLIS_PER_DAY = 24 * 60 * 60 * 1000;

export type WeeklyReportAction = {
  label: string;
  href: string;
};

type WeeklyActionRow = {
  user_id: string;
  action_type: string;
  action_label: string | null;
  created_at: string;
};

type ProfileRow = {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  bio: string | null;
  onboarding_completed?: boolean | null;
  current_streak?: number | null;
  current_level?: number | null;
  member_badge?: string | null;
  is_paid?: boolean | null;
};

type GroupMemberRow = {
  user_id: string;
  group_id: string;
};

type CurrentSeriesRow = {
  id: string;
  group_id: string;
  title: string | null;
};

type SeriesWeekProgressRow = {
  user_id: string;
  series_id: string;
  week_number: number;
  reading_completed: boolean | null;
  trivia_completed: boolean | null;
  reflection_posted: boolean | null;
};

type DevotionalProgressRow = {
  user_id: string;
  devotional_id: string;
  day_number: number;
};

type DevotionalRow = {
  id: string;
  title: string;
  total_days: number | null;
};

export type WeeklyBibleReport = {
  message: string;
  action: WeeklyReportAction | null;
  stats: {
    activeDays: number;
    totalActions: number;
    chaptersRead: number;
    triviaCompleted: number;
    scrambledCompleted: number;
    devotionalsCompleted: number;
  };
};

type Recommendation = {
  key: string;
  priority: number;
  line: string;
  action?: WeeklyReportAction | null;
};

function toSentenceCaseList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function formatCount(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function getDisplayName(profile: ProfileRow | null | undefined) {
  return profile?.display_name?.trim() || profile?.username?.trim() || "friend";
}

function getFirstName(profile: ProfileRow | null | undefined) {
  const display = getDisplayName(profile);
  return display.split(/\s+/)[0] || "friend";
}

export function getWeekKey(anchorDate = new Date()) {
  const utc = new Date(Date.UTC(anchorDate.getUTCFullYear(), anchorDate.getUTCMonth(), anchorDate.getUTCDate()));
  const day = utc.getUTCDay();
  const diffToMonday = (day + 6) % 7;
  utc.setUTCDate(utc.getUTCDate() - diffToMonday);
  return utc.toISOString().slice(0, 10);
}

function formatWeekRange(weekStart: string) {
  const start = new Date(`${weekStart}T00:00:00.000Z`);
  const end = new Date(start.getTime() + 6 * MILLIS_PER_DAY);
  const startLabel = start.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  const endLabel = end.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  return `${startLabel} to ${endLabel}`;
}

export async function resolveFounderId(supabaseUrl: string, serviceKey: string, db: any): Promise<string | null> {
  if (process.env.LOUIS_USER_ID) return process.env.LOUIS_USER_ID;

  try {
    const response = await fetch(
      `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(`email=="${LOUIS_EMAIL}"`)}`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
    );
    if (response.ok) {
      const json = await response.json();
      const found = (json?.users ?? []).find((user: any) => user.email === LOUIS_EMAIL);
      if (found?.id) return found.id;
    }
  } catch {}

  try {
    const { data } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const found = (data?.users ?? []).find((user: any) => user.email === LOUIS_EMAIL);
    if (found?.id) return found.id;
  } catch {}

  return null;
}

export async function sendDirectMessage(
  db: any,
  louisId: string,
  louisName: string,
  userId: string,
  message: string,
  action?: WeeklyReportAction | null,
): Promise<boolean> {
  try {
    const [uid1, uid2] = louisId < userId ? [louisId, userId] : [userId, louisId];
    const { data: existingConvo } = await db
      .from("conversations")
      .select("id")
      .eq("user_id_1", uid1)
      .eq("user_id_2", uid2)
      .maybeSingle();

    let conversationId: string = existingConvo?.id;

    if (!conversationId) {
      const { data: newConvo, error: convoError } = await db
        .from("conversations")
        .insert({ user_id_1: uid1, user_id_2: uid2 })
        .select("id")
        .single();

      if (convoError || !newConvo) {
        console.error("[WEEKLY_REPORT] Failed to create conversation:", convoError?.message);
        return false;
      }
      conversationId = newConvo.id;
    }

    const now = new Date().toISOString();
    const preview = getDirectMessagePreview(message, action?.label ?? null, action?.href ?? null);
    const insertPayload: Record<string, unknown> = {
      conversation_id: conversationId,
      sender_id: louisId,
      content: message,
      created_at: now,
    };

    if (action?.label && action?.href) {
      insertPayload.action_label = action.label;
      insertPayload.action_href = action.href;
    }

    let { error: messageError } = await db.from("messages").insert(insertPayload);

    if (messageError && isMissingDirectMessageActionColumnError(messageError)) {
      ({ error: messageError } = await db.from("messages").insert({
        conversation_id: conversationId,
        sender_id: louisId,
        content: message,
        created_at: now,
      }));
    }

    if (messageError) {
      console.error("[WEEKLY_REPORT] Failed to insert message:", messageError.message);
      return false;
    }

    await db
      .from("conversations")
      .update({ last_message_at: now, last_message_preview: preview })
      .eq("id", conversationId);

    const { data: existingNotif } = await db
      .from("notifications")
      .select("id")
      .eq("type", "direct_message")
      .eq("article_slug", `/messages/${conversationId}`)
      .eq("user_id", userId)
      .eq("is_read", false)
      .maybeSingle();

    if (existingNotif?.id) {
      await db
        .from("notifications")
        .update({ from_user_id: louisId, from_user_name: louisName, message: preview, created_at: now })
        .eq("id", existingNotif.id);
    } else {
      await db.from("notifications").insert({
        user_id: userId,
        type: "direct_message",
        from_user_id: louisId,
        from_user_name: louisName,
        article_slug: `/messages/${conversationId}`,
        message: preview,
        is_read: false,
        created_at: now,
      });
    }

    return true;
  } catch (error: any) {
    console.error("[WEEKLY_REPORT] Unexpected error sending DM:", error?.message);
    return false;
  }
}

export async function claimWeeklyReport(db: any, userId: string, weekKey: string): Promise<boolean> {
  const now = new Date().toISOString();
  const { data, error } = await db
    .from("weekly_bible_report_sent")
    .upsert(
      { user_id: userId, week_key: weekKey, sent_at: now },
      { onConflict: "user_id,week_key", ignoreDuplicates: true },
    )
    .select("user_id")
    .single();

  if (error) {
    if (error.code === "PGRST116") return false;
    console.error(`[WEEKLY_REPORT] Failed to claim week ${weekKey} for ${userId}:`, error.message);
    throw error;
  }

  return !!data;
}

export async function releaseWeeklyClaim(db: any, userId: string, weekKey: string) {
  const { error } = await db
    .from("weekly_bible_report_sent")
    .delete()
    .eq("user_id", userId)
    .eq("week_key", weekKey);

  if (error) {
    console.error(`[WEEKLY_REPORT] Failed to release claim ${weekKey} for ${userId}:`, error.message);
  }
}

export async function fetchRecentActions(db: any, sinceIso: string): Promise<WeeklyActionRow[]> {
  const actions: WeeklyActionRow[] = [];
  const pageSize = 1000;

  for (let from = 0; ; from += pageSize) {
    const to = from + pageSize - 1;
    const { data, error } = await db
      .from("master_actions")
      .select("user_id, action_type, action_label, created_at")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    if (!data?.length) break;

    actions.push(...(data as WeeklyActionRow[]));
    if (data.length < pageSize) break;
  }

  return actions;
}

async function fetchProfileRows(db: any, userIds: string[]) {
  const rows: ProfileRow[] = [];
  for (const chunk of chunkArray(userIds, 250)) {
    const { data, error } = await db
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url, bio, onboarding_completed, current_streak, current_level, member_badge, is_paid")
      .in("user_id", chunk);
    if (error) throw error;
    rows.push(...((data as ProfileRow[]) ?? []));
  }
  return new Map(rows.map((row) => [row.user_id, row]));
}

async function fetchPushSubscriptionUsers(db: any, userIds: string[]) {
  const rows: Array<{ user_id: string }> = [];
  for (const chunk of chunkArray(userIds, 250)) {
    const { data, error } = await db
      .from("push_subscriptions")
      .select("user_id")
      .in("user_id", chunk);
    if (error) throw error;
    rows.push(...((data as Array<{ user_id: string }>) ?? []));
  }
  return new Set(rows.map((row) => row.user_id));
}

async function fetchDevotionalProgress(db: any, userIds: string[]) {
  const rows: DevotionalProgressRow[] = [];
  for (const chunk of chunkArray(userIds, 250)) {
    const { data, error } = await db
      .from("devotional_progress")
      .select("user_id, devotional_id, day_number")
      .eq("is_completed", true)
      .in("user_id", chunk);
    if (error) throw error;
    rows.push(...((data as DevotionalProgressRow[]) ?? []));
  }
  return rows;
}

async function fetchGroupMembers(db: any, userIds: string[]) {
  const rows: GroupMemberRow[] = [];
  for (const chunk of chunkArray(userIds, 250)) {
    const { data, error } = await db
      .from("group_members")
      .select("user_id, group_id")
      .eq("status", "approved")
      .in("user_id", chunk);
    if (error) throw error;
    rows.push(...((data as GroupMemberRow[]) ?? []));
  }
  return rows;
}

async function fetchCurrentSeries(db: any, groupIds: string[]) {
  const rows: CurrentSeriesRow[] = [];
  for (const chunk of chunkArray(groupIds, 250)) {
    const { data, error } = await db
      .from("group_series")
      .select("id, group_id, title")
      .eq("is_current", true)
      .in("group_id", chunk);
    if (error) throw error;
    rows.push(...((data as CurrentSeriesRow[]) ?? []));
  }
  return rows;
}

async function fetchSeriesProgress(db: any, userIds: string[], seriesIds: string[]) {
  const rows: SeriesWeekProgressRow[] = [];
  for (const userChunk of chunkArray(userIds, 120)) {
    for (const seriesChunk of chunkArray(seriesIds, 120)) {
      const { data, error } = await db
        .from("series_week_progress")
        .select("user_id, series_id, week_number, reading_completed, trivia_completed, reflection_posted")
        .in("user_id", userChunk)
        .in("series_id", seriesChunk);
      if (error) throw error;
      rows.push(...((data as SeriesWeekProgressRow[]) ?? []));
    }
  }
  return rows;
}

async function fetchDevotionalRows(db: any, devotionalIds: string[]) {
  if (!devotionalIds.length) return new Map<string, DevotionalRow>();
  const rows: DevotionalRow[] = [];
  for (const chunk of chunkArray(devotionalIds, 250)) {
    const { data, error } = await db
      .from("devotionals")
      .select("id, title, total_days")
      .in("id", chunk);
    if (error) throw error;
    rows.push(...((data as DevotionalRow[]) ?? []));
  }
  return new Map(rows.map((row) => [row.id, row]));
}

type WeeklyContext = {
  profileMap: Map<string, ProfileRow>;
  pushSubscriptionUsers: Set<string>;
  devotionalProgressByUser: Map<string, DevotionalProgressRow[]>;
  devotionalsById: Map<string, DevotionalRow>;
  currentSeriesByUser: Map<string, { groupId: string; seriesId: string; title: string | null }>;
  seriesProgressByUser: Map<string, SeriesWeekProgressRow[]>;
};

export async function buildWeeklyContext(db: any, userIds: string[]): Promise<WeeklyContext> {
  const [profileMap, pushSubscriptionUsers, devotionalProgressRows, groupMembers] = await Promise.all([
    fetchProfileRows(db, userIds),
    fetchPushSubscriptionUsers(db, userIds),
    fetchDevotionalProgress(db, userIds),
    fetchGroupMembers(db, userIds),
  ]);

  const devotionalIds = [...new Set(devotionalProgressRows.map((row) => row.devotional_id))];
  const devotionalsById = await fetchDevotionalRows(db, devotionalIds);
  const devotionalProgressByUser = new Map<string, DevotionalProgressRow[]>();
  for (const row of devotionalProgressRows) {
    const bucket = devotionalProgressByUser.get(row.user_id) ?? [];
    bucket.push(row);
    devotionalProgressByUser.set(row.user_id, bucket);
  }

  const groupIds = [...new Set(groupMembers.map((row) => row.group_id))];
  const currentSeriesRows = groupIds.length ? await fetchCurrentSeries(db, groupIds) : [];
  const currentSeriesByGroup = new Map(currentSeriesRows.map((row) => [row.group_id, row]));
  const currentSeriesByUser = new Map<string, { groupId: string; seriesId: string; title: string | null }>();
  for (const membership of groupMembers) {
    const currentSeries = currentSeriesByGroup.get(membership.group_id);
    if (!currentSeries || currentSeriesByUser.has(membership.user_id)) continue;
    currentSeriesByUser.set(membership.user_id, {
      groupId: membership.group_id,
      seriesId: currentSeries.id,
      title: currentSeries.title,
    });
  }

  const seriesIds = [...new Set([...currentSeriesByUser.values()].map((row) => row.seriesId))];
  const seriesProgressRows = seriesIds.length ? await fetchSeriesProgress(db, userIds, seriesIds) : [];
  const seriesProgressByUser = new Map<string, SeriesWeekProgressRow[]>();
  for (const row of seriesProgressRows) {
    const bucket = seriesProgressByUser.get(row.user_id) ?? [];
    bucket.push(row);
    seriesProgressByUser.set(row.user_id, bucket);
  }

  return {
    profileMap,
    pushSubscriptionUsers,
    devotionalProgressByUser,
    devotionalsById,
    currentSeriesByUser,
    seriesProgressByUser,
  };
}

function getActiveDevotional(progressRows: DevotionalProgressRow[], devotionalsById: Map<string, DevotionalRow>) {
  const maxByDevotional = new Map<string, number>();
  for (const row of progressRows) {
    const currentMax = maxByDevotional.get(row.devotional_id) ?? 0;
    if (row.day_number > currentMax) {
      maxByDevotional.set(row.devotional_id, row.day_number);
    }
  }

  for (const [devotionalId, maxDay] of maxByDevotional) {
    const devotional = devotionalsById.get(devotionalId);
    if (!devotional) continue;
    if (!devotional.total_days || maxDay < devotional.total_days) {
      return {
        devotional,
        nextDay: maxDay + 1,
      };
    }
  }

  return null;
}

function getSeriesRecommendation(
  userId: string,
  currentSeriesByUser: WeeklyContext["currentSeriesByUser"],
  seriesProgressByUser: WeeklyContext["seriesProgressByUser"],
) {
  const currentSeries = currentSeriesByUser.get(userId);
  if (!currentSeries) return null;

  const progressRows = (seriesProgressByUser.get(userId) ?? []).filter((row) => row.series_id === currentSeries.seriesId);
  if (!progressRows.length) {
    return {
      action: { label: "Open Bible Study Group", href: `/study-groups/${currentSeries.groupId}/series` },
      line: `Jump into ${currentSeries.title || "the current Bible study"} and start with Week 1 so you do not miss the story flow or the group conversation.`,
    };
  }

  const progressMap = new Map<number, { reading: boolean; trivia: boolean; reflection: boolean }>();
  for (const row of progressRows) {
    progressMap.set(row.week_number, {
      reading: row.reading_completed === true,
      trivia: row.trivia_completed === true,
      reflection: row.reflection_posted === true,
    });
  }

  for (let week = 1; week <= 12; week++) {
    const progress = progressMap.get(week);
    const complete = !!(progress?.reading && progress?.trivia && progress?.reflection);
    if (!complete) {
      return {
        action: { label: `Continue Week ${week}`, href: `/study-groups/${currentSeries.groupId}/series` },
        line: `Your next clean step in ${currentSeries.title || "the current Bible study"} is Week ${week}. That will keep you lined up with the group.`,
      };
    }
  }

  return null;
}

function pickRecommendations(
  userId: string,
  profile: ProfileRow | undefined,
  actions: WeeklyActionRow[],
  context: WeeklyContext,
) {
  const actionCounts = new Map<string, number>();
  for (const action of actions) {
    actionCounts.set(action.action_type, (actionCounts.get(action.action_type) ?? 0) + 1);
  }

  const recommendations: Recommendation[] = [];
  const hasDisplayName = !!(profile?.display_name?.trim() || profile?.username?.trim());
  const hasPhoto = !!profile?.profile_image_url;
  const hasBio = !!profile?.bio?.trim();
  const missingProfileBits = [
    hasDisplayName ? null : "your name",
    hasPhoto ? null : "a profile photo",
    hasBio ? null : "a short bio",
  ].filter(Boolean) as string[];

  if (missingProfileBits.length > 0 || profile?.onboarding_completed !== true) {
    recommendations.push({
      key: "profile",
      priority: 100,
      line: `Finish your profile by adding ${toSentenceCaseList(missingProfileBits.length ? missingProfileBits : ["the last missing details"])} so Bible Buddy feels more personal and people recognize you right away.`,
      action: { label: "Finish Profile", href: "/settings" },
    });
  }

  if (!context.pushSubscriptionUsers.has(userId)) {
    recommendations.push({
      key: "notifications",
      priority: 96,
      line: "Turn on notifications so you do not miss new messages, study updates, or the moments when the app is trying to pull you back into Scripture.",
      action: { label: "Open Settings", href: "/settings" },
    });
  }

  const devotionalProgress = context.devotionalProgressByUser.get(userId) ?? [];
  const activeDevotional = getActiveDevotional(devotionalProgress, context.devotionalsById);
  if (activeDevotional) {
    recommendations.push({
      key: "devotional-continue",
      priority: 92,
      line: `Keep your devotional momentum going with Day ${activeDevotional.nextDay} of ${activeDevotional.devotional.title}.`,
      action: { label: `Continue ${activeDevotional.devotional.title}`, href: `/devotionals/${activeDevotional.devotional.id}` },
    });
  } else if ((actionCounts.get("devotional_day_completed") ?? 0) === 0) {
    recommendations.push({
      key: "devotional-start",
      priority: 89,
      line: "Start a devotional this week if you want a simple guided way to stay consistent instead of deciding from scratch what to read every day.",
      action: { label: "Start a Devotional", href: "/devotionals" },
    });
  }

  const seriesRecommendation = getSeriesRecommendation(userId, context.currentSeriesByUser, context.seriesProgressByUser);
  if (seriesRecommendation) {
    recommendations.push({
      key: "series",
      priority: 87,
      line: seriesRecommendation.line,
      action: seriesRecommendation.action,
    });
  }

  if ((actionCounts.get("chapter_completed") ?? 0) === 0) {
    recommendations.push({
      key: "read",
      priority: 86,
      line: "You were in the app this week, but you did not finish a Bible chapter yet. Reading one chapter is still the fastest way to move your understanding forward.",
      action: { label: "Open The Bible", href: "/reading" },
    });
  }

  if ((actionCounts.get("trivia_chapter_completed") ?? 0) === 0) {
    recommendations.push({
      key: "trivia",
      priority: 84,
      line: "Try a chapter trivia quiz after you read. It is one of the easiest ways to make sure the chapter actually stayed with you.",
      action: { label: "Take Trivia", href: "/bible-trivia/books" },
    });
  }

  if ((actionCounts.get("scrambled_chapter_completed") ?? 0) === 0) {
    recommendations.push({
      key: "scrambled",
      priority: 82,
      line: "Play one Scrambled round this week. It is a light way to lock Bible words from the chapter into your memory.",
      action: { label: "Play Scrambled", href: "/bible-study-games/scrambled/books" },
    });
  }

  if ((actionCounts.get("chapter_notes_reviewed") ?? 0) === 0 && (actionCounts.get("chapter_completed") ?? 0) > 0) {
    recommendations.push({
      key: "review",
      priority: 80,
      line: "Open a chapter review after you read so you do not just finish the chapter and move on without slowing down to understand it.",
      action: { label: "Open The Bible", href: "/reading" },
    });
  }

  if ((actionCounts.get("note_created") ?? 0) === 0 && (actionCounts.get("verse_highlighted") ?? 0) === 0) {
    recommendations.push({
      key: "notes",
      priority: 78,
      line: "Capture at least one note or highlight this week. Writing something down is usually where the chapter starts becoming your own.",
      action: { label: "Open Notes", href: "/notes" },
    });
  }

  if ((actionCounts.get("feed_post_commented") ?? 0) === 0 && (actionCounts.get("group_message_sent") ?? 0) === 0) {
    recommendations.push({
      key: "community",
      priority: 74,
      line: "Say something in the study group this week. Even one comment can turn Bible Buddy from a tool into an actual community for you.",
      action: { label: "Open Study Group", href: "/study-groups" },
    });
  }

  recommendations.sort((a, b) => b.priority - a.priority);
  const uniqueRecommendations: Recommendation[] = [];
  const seen = new Set<string>();
  for (const recommendation of recommendations) {
    if (seen.has(recommendation.key)) continue;
    seen.add(recommendation.key);
    uniqueRecommendations.push(recommendation);
    if (uniqueRecommendations.length === 3) break;
  }

  return uniqueRecommendations;
}

export function buildWeeklyReportForUser(
  userId: string,
  actions: WeeklyActionRow[],
  context: WeeklyContext,
  weekKey: string,
): WeeklyBibleReport {
  const profile = context.profileMap.get(userId);
  const firstName = getFirstName(profile);
  const activeDays = new Set(actions.map((action) => action.created_at.slice(0, 10))).size;
  const count = (actionType: string) => actions.filter((action) => action.action_type === actionType).length;

  const chaptersRead = count("chapter_completed");
  const devotionalsCompleted = count("devotional_day_completed");
  const triviaCompleted = count("trivia_chapter_completed");
  const scrambledCompleted = count("scrambled_chapter_completed");
  const peopleLearned = count("person_learned");
  const placesLearned = count("place_discovered");
  const keywordsLearned = count("keyword_mastered");
  const notesCreated = count("note_created");
  const highlights = count("verse_highlighted");
  const chapterReviews = count("chapter_notes_reviewed");
  const commentsPosted = count("feed_post_commented");
  const repliesPosted = count("feed_post_replied");
  const groupMessages = count("group_message_sent");

  const statLines = [
    chaptersRead ? `- You finished ${formatCount(chaptersRead, "Bible chapter")}.` : null,
    devotionalsCompleted ? `- You completed ${formatCount(devotionalsCompleted, "devotional day")}.` : null,
    chapterReviews ? `- You reviewed ${formatCount(chapterReviews, "chapter review")}.` : null,
    triviaCompleted ? `- You finished ${formatCount(triviaCompleted, "trivia chapter")}.` : null,
    scrambledCompleted ? `- You finished ${formatCount(scrambledCompleted, "Scrambled chapter")}.` : null,
    peopleLearned || placesLearned || keywordsLearned
      ? `- You explored ${toSentenceCaseList([
          peopleLearned ? formatCount(peopleLearned, "person") : "",
          placesLearned ? formatCount(placesLearned, "place") : "",
          keywordsLearned ? formatCount(keywordsLearned, "keyword") : "",
        ].filter(Boolean))}.`
      : null,
    notesCreated || highlights
      ? `- You made ${toSentenceCaseList([
          notesCreated ? formatCount(notesCreated, "note") : "",
          highlights ? formatCount(highlights, "verse highlight") : "",
        ].filter(Boolean))}.`
      : null,
    commentsPosted || repliesPosted || groupMessages
      ? `- You showed up in community with ${toSentenceCaseList([
          commentsPosted ? formatCount(commentsPosted, "comment") : "",
          repliesPosted ? formatCount(repliesPosted, "reply") : "",
          groupMessages ? formatCount(groupMessages, "message") : "",
        ].filter(Boolean))}.`
      : null,
    `- You were active on ${formatCount(activeDays, "day")} this week and logged ${formatCount(actions.length, "action")}.`,
    profile?.current_streak ? `- Your current streak is ${formatCount(profile.current_streak, "day")}.` : null,
    profile?.current_level ? `- You are holding Level ${profile.current_level}${profile.member_badge ? ` with the ${profile.member_badge} badge` : ""}.` : null,
  ].filter(Boolean) as string[];

  const recommendations = pickRecommendations(userId, profile, actions, context);
  const encouragementLine =
    chaptersRead + devotionalsCompleted + triviaCompleted + scrambledCompleted >= 3
      ? "You put in real reps this week, and that kind of consistency does add up."
      : "Even a small week still matters, because it keeps you connected to Scripture instead of drifting away from it.";

  const message = [
    `Hey ${firstName},`,
    "",
    `I wanted to send you your Bible Buddy weekly report for ${formatWeekRange(weekKey)}.`,
    "",
    "Here is what you did this week:",
    ...statLines,
    "",
    encouragementLine,
    "",
    "My 3 recommendations for your next step:",
    ...(recommendations.length
      ? recommendations.map((recommendation, index) => `${index + 1}. ${recommendation.line}`)
      : [
          "1. Open the Bible and finish one chapter.",
          "2. Take the trivia quiz for that chapter.",
          "3. Play one Scrambled round so the chapter sticks a little better.",
        ]),
    "",
    "Keep going.",
    "Louis",
  ].join("\n");

  return {
    message,
    action: recommendations[0]?.action ?? null,
    stats: {
      activeDays,
      totalActions: actions.length,
      chaptersRead,
      triviaCompleted,
      scrambledCompleted,
      devotionalsCompleted,
    },
  };
}
