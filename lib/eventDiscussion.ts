import type { SupabaseClient } from "@supabase/supabase-js";
import { getEventDayPosts, type EventDayPost } from "./communityEventDays";

// Devotional <-> community event wiring (2026-09-22). When a devotional runs as
// a community event, each day's discussion is the replies on that day's post
// in the Bible Buddy group (see lib/communityEventDays.ts). Days with no post
// yet keep the old article_comments discussion so early starters are never
// blocked.

export const WISDOM_OF_PROVERBS_DEVOTIONAL_ID = "c0ca300a-c0e9-47b8-84c5-99aca743a203";

const DEVOTIONAL_EVENT_SLUGS: Record<string, string> = {
  [WISDOM_OF_PROVERBS_DEVOTIONAL_ID]: "wisdom-of-proverbs",
};

/** The community event slug a devotional belongs to, or null. */
export function eventSlugForDevotional(devotionalId: string | null | undefined): string | null {
  if (!devotionalId) return null;
  return DEVOTIONAL_EVENT_SLUGS[devotionalId] ?? null;
}

/** All published day posts for a devotional's event, keyed by day number. */
export async function getDevotionalEventDayPostMap(
  client: SupabaseClient,
  devotionalId: string | null | undefined,
): Promise<Map<number, EventDayPost>> {
  const slug = eventSlugForDevotional(devotionalId);
  if (!slug) return new Map();
  const posts = await getEventDayPosts(client, slug);
  return new Map(posts.map((post) => [post.day_number, post]));
}

/**
 * Day numbers where the user replied in that day's group thread - either a
 * direct reply to the day post, or a reply to someone's comment under it.
 */
export async function getEventDiscussedDayNumbers(
  client: SupabaseClient,
  dayPosts: Map<number, EventDayPost>,
  userId: string | null | undefined,
): Promise<Set<number>> {
  const result = new Set<number>();
  if (!userId || dayPosts.size === 0) return result;

  const dayByPostId = new Map<string, number>();
  dayPosts.forEach((post, dayNumber) => dayByPostId.set(post.group_post_id, dayNumber));
  const dayPostIds = [...dayByPostId.keys()];

  const [{ data: ownDirect }, { data: topLevelComments }] = await Promise.all([
    client
      .from("group_posts")
      .select("parent_post_id")
      .eq("user_id", userId)
      .in("parent_post_id", dayPostIds),
    client
      .from("group_posts")
      .select("id, parent_post_id")
      .in("parent_post_id", dayPostIds),
  ]);

  (ownDirect || []).forEach((row: { parent_post_id: string | null }) => {
    const dayNumber = row.parent_post_id ? dayByPostId.get(row.parent_post_id) : undefined;
    if (dayNumber != null) result.add(dayNumber);
  });

  const commentToDay = new Map<string, number>();
  (topLevelComments || []).forEach((row: { id: string; parent_post_id: string | null }) => {
    const dayNumber = row.parent_post_id ? dayByPostId.get(row.parent_post_id) : undefined;
    if (dayNumber != null) commentToDay.set(row.id, dayNumber);
  });

  if (commentToDay.size > 0) {
    const { data: ownNested } = await client
      .from("group_posts")
      .select("parent_post_id")
      .eq("user_id", userId)
      .in("parent_post_id", [...commentToDay.keys()]);
    (ownNested || []).forEach((row: { parent_post_id: string | null }) => {
      const dayNumber = row.parent_post_id ? commentToDay.get(row.parent_post_id) : undefined;
      if (dayNumber != null) result.add(dayNumber);
    });
  }

  return result;
}

/** User ids (with earliest reply time) who replied directly to a day post. */
export async function getEventDayRepliers(
  client: SupabaseClient,
  groupPostId: string,
): Promise<Array<{ user_id: string; created_at: string | null }>> {
  const { data } = await client
    .from("group_posts")
    .select("user_id, created_at")
    .eq("parent_post_id", groupPostId)
    .order("created_at", { ascending: false })
    .limit(1000);
  return (data || []) as Array<{ user_id: string; created_at: string | null }>;
}
