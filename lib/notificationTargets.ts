import type { SupabaseClient } from "@supabase/supabase-js";
import { COMMUNITY_EVENTS } from "./communityEvents";

/**
 * Where a group-era notification should actually land (Louis, 2026-10-25:
 * "the notifications on the iOS are showing my notifications that don't show
 * in the alerts at the top and they don't show on the feed either").
 *
 * WHAT WAS HAPPENING. Closing the group on 2026-10-18 hid ten notification
 * types from the bell, because tapping one could only lead back into a room
 * that no longer exists. Nothing hid them from PUSH: the trigger on
 * public.notifications queues a job for every row it sees, whatever its type.
 * So for a fortnight the phone buzzed 236 times for 29 people with alerts
 * that were not in the app when they opened it, and whose links redirected to
 * /bb-feed - which reads feed_posts and cannot find a group_posts id, so the
 * reader arrived at the top of the feed with no idea what had happened.
 *
 * WHAT IS ACTUALLY LEFT. Of those 236, 228 were about a community study:
 * "Louis posted Day 25 of The Wisdom of Proverbs", and people answering the
 * day's discussion question. Those have a perfectly good home - the day's
 * Discussion task - because the day's group post IS the discussion the
 * devotional day page shows. They were never dead, only misfiled.
 *
 * So this module answers one question for the bell, the click handler and the
 * push sender alike: does this notification point at a community study day,
 * and if so, where does it open? Anything that does not is genuinely orphaned
 * and stays hidden.
 */

/** Types the group and its weekly series wrote. */
export const GROUP_ERA_NOTIFICATION_TYPES = [
  "group_post",
  "buddy_posted",
  "group_post_liked",
  "group_post_commented",
  "group_post_replied",
  "group_reply_liked",
  "series_reflection",
  "series_reflection_liked",
  "series_reflection_reply_liked",
  "study_group_update",
] as const;

export type CommunityStudyTarget = {
  devotionalId: string;
  dayNumber: number;
  eventSlug: string;
};

/** The day's Discussion task, open and scrolled to. */
export function communityStudyDiscussionPath(target: CommunityStudyTarget) {
  return `/devotionals/${target.devotionalId}/day/${target.dayNumber}?task=discussion`;
}

/**
 * Group post id -> the community study day it belongs to.
 *
 * One query for the whole batch. Unknown ids are simply absent from the map,
 * which is the caller's signal that there is nowhere to send that one.
 */
export async function resolveCommunityStudyTargets(
  client: SupabaseClient,
  postIds: Array<string | null | undefined>,
): Promise<Map<string, CommunityStudyTarget>> {
  const ids = [...new Set(postIds.filter((id): id is string => Boolean(id)))];
  const result = new Map<string, CommunityStudyTarget>();
  if (ids.length === 0) return result;

  const devotionalBySlug = new Map(COMMUNITY_EVENTS.map((event) => [event.slug, event.devotionalId]));

  let rows: Array<{ group_post_id: string; event_slug: string; day_number: number }> = [];
  try {
    const { data } = await client
      .from("community_event_day_posts")
      .select("group_post_id, event_slug, day_number")
      .in("group_post_id", ids);
    rows = (data || []) as typeof rows;
  } catch {
    return result;
  }

  for (const row of rows) {
    const devotionalId = devotionalBySlug.get(row.event_slug);
    if (!devotionalId) continue;
    result.set(row.group_post_id, {
      devotionalId,
      dayNumber: row.day_number,
      eventSlug: row.event_slug,
    });
  }
  return result;
}

/**
 * Repair a stale deep link, given the targets already resolved.
 *
 * Push payloads carry whatever article_slug the database trigger wrote when
 * the notification was created, and two of those routes have since moved:
 *
 *  - /study-groups/<id>/chat?post=… redirects to /bb-feed, which cannot find
 *    a group_posts id. If the post is a community study day, the day's
 *    Discussion task is where the reply actually is.
 *  - /dashboard?view=group&post=… was the old in-dashboard feed view. The
 *    feed is its own page now, and it opens a post by id from the query
 *    string, so this only needs repointing.
 *
 * Anything else is returned untouched.
 */
export function repairNotificationUrl(
  url: string | null | undefined,
  postId: string | null | undefined,
  commentId: string | null | undefined,
  targets: Map<string, CommunityStudyTarget>,
): string | null {
  const raw = (url || "").trim();
  if (!raw) return null;

  const target = postId ? targets.get(postId) : undefined;
  if (target && raw.includes("/study-groups/")) {
    return communityStudyDiscussionPath(target);
  }

  if (raw.startsWith("/dashboard") && raw.includes("view=group")) {
    const params = new URLSearchParams();
    if (postId) params.set("post", postId);
    if (commentId) params.set("comment", commentId);
    const query = params.toString();
    return query ? `/bb-feed?${query}` : "/bb-feed";
  }

  return raw;
}
