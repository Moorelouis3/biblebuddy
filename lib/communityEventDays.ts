import type { SupabaseClient } from "@supabase/supabase-js";

// Community event daily posts (2026-09-22, Wisdom of Proverbs).
// Each event day gets ONE group post in the Bible Buddy group. That post's
// replies ARE the day's discussion: the group feed and the devotional day page
// both show the same thread, so a comment made in either place shows in both.
// Mapping lives in public.community_event_day_posts (see
// ADD_COMMUNITY_EVENT_DAY_POSTS.sql); the daily cron writes it.

/** The only group Bible Buddy uses. */
export const BIBLE_BUDDY_GROUP_ID = "165bada5-0900-44f1-963b-54e86fe64b39";

export type EventDayPost = {
  event_slug: string;
  day_number: number;
  group_post_id: string;
  group_id: string;
  published_at: string;
};

export async function getEventDayPosts(client: SupabaseClient, eventSlug: string): Promise<EventDayPost[]> {
  const { data, error } = await client
    .from("community_event_day_posts")
    .select("event_slug, day_number, group_post_id, group_id, published_at")
    .eq("event_slug", eventSlug)
    .order("day_number", { ascending: true });
  if (error) return [];
  return (data || []) as EventDayPost[];
}

export async function getEventDayPost(
  client: SupabaseClient,
  eventSlug: string,
  dayNumber: number,
): Promise<EventDayPost | null> {
  const { data, error } = await client
    .from("community_event_day_posts")
    .select("event_slug, day_number, group_post_id, group_id, published_at")
    .eq("event_slug", eventSlug)
    .eq("day_number", dayNumber)
    .maybeSingle();
  if (error || !data) return null;
  return data as EventDayPost;
}

/** Link to a day's study inside the devotional. */
export function eventDayStudyPath(devotionalId: string, dayNumber: number) {
  return `/devotionals/${devotionalId}/day/${dayNumber}`;
}

/** Link to a day's discussion post in the Bible Buddy group feed. */
export function eventDayDiscussionPath(groupId: string, postId: string) {
  return `/study-groups/${groupId}/chat?post=${postId}`;
}
