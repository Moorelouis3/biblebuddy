import type { SupabaseClient } from "@supabase/supabase-js";
import { COMMUNITY_EVENTS, getCommunityEventState, isCommunityEventDayUnlocked, type CommunityEvent } from "@/lib/communityEvents";
import { BIBLE_BUDDY_GROUP_ID, eventDayStudyPath, type EventDayPost } from "@/lib/communityEventDays";
import { insertGroupPostWithRetry } from "@/lib/groupPostInsert";
import { getProverbsDailyPost, type ProverbsDailyPost } from "@/lib/proverbsDailyPosts";

// Community event daily post (2026-09-22, The Wisdom of Proverbs).
//
// Every morning of a live event, one post goes up as Louis in the Bible Buddy
// group. Its replies ARE the day's discussion (the devotional day page shows
// the same thread). The event's members get a notification: everyone on day 1,
// then only members who turned reminders on.
//
// Order matters when creating the post: the mapping row in
// community_event_day_posts goes in FIRST, with a pre-made post id, because
// notify_group_broadcast_post() skips any post listed there. Without that the
// post would notify all ~6,000 group members. If the post insert fails, the
// mapping row is removed again.
//
// Driven by app/api/cron/community-event-daily/route.ts. The runner lives here
// so it can be dry-run from a script against production data.

export const COMMUNITY_EVENT_TOTAL_DAYS = 31;

/** Category that shows on the group's main (home) feed: see HOME_FEED_CATEGORIES in app/study-groups/[id]/chat/page.tsx. */
export const COMMUNITY_EVENT_POST_CATEGORY = "general";

/** Existing group-post notification type, so the bell and push render it like any other group post. */
export const COMMUNITY_EVENT_NOTIFICATION_TYPE = "group_post";

export const SITE_URL = "https://www.mybiblebuddy.net";

const LOUIS_EMAIL = "moorelouis3@gmail.com";
const NOTIFY_CHUNK = 100;
const PAGE_SIZE = 1000;

/** Which daily-post content belongs to which event. */
const DAILY_POSTS_BY_EVENT: Record<string, (day: number) => ProverbsDailyPost | null> = {
  "wisdom-of-proverbs": getProverbsDailyPost,
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildPostTitle(entry: ProverbsDailyPost) {
  return `Day ${entry.day}: ${entry.title}`;
}

/**
 * The group post for one day. Stored as HTML paragraphs like everything
 * written in the app (<p>..</p>, an empty <p> for a blank line). The feed
 * turns "Proverbs 1:7" into a tappable verse link on its own.
 */
export function buildPostContent(entry: ProverbsDailyPost, totalDays = COMMUNITY_EVENT_TOTAL_DAYS) {
  const blank = "<p></p>";
  const content = [
    `<p><strong>Day ${entry.day} of ${totalDays} · Proverbs ${entry.chapter}</strong></p>`,
    blank,
    `<p>${escapeHtml(entry.summary)}</p>`,
    blank,
    `<p><em>&quot;${escapeHtml(entry.keyVerse.text)}&quot;</em></p>`,
    `<p>${escapeHtml(entry.keyVerse.reference)} (KJV)</p>`,
    blank,
    `<p><strong>Today's question:</strong> ${escapeHtml(entry.question)}</p>`,
    blank,
    `<p>Tap to open today's study, then share your answer below 👇</p>`,
  ].join("");

  return { title: buildPostTitle(entry), content };
}

/** Plain-text version of the same post, for the review doc and dry runs. */
export function buildPostPlainText(entry: ProverbsDailyPost, totalDays = COMMUNITY_EVENT_TOTAL_DAYS) {
  return [
    `Day ${entry.day} of ${totalDays} · Proverbs ${entry.chapter}`,
    "",
    entry.summary,
    "",
    `"${entry.keyVerse.text}"`,
    `${entry.keyVerse.reference} (KJV)`,
    "",
    `Today's question: ${entry.question}`,
    "",
    "Tap to open today's study, then share your answer below 👇",
  ].join("\n");
}

/**
 * Bell + push copy, stored the way group_post notifications already are
 * ("Louis Moore posted in ..."): the bell and the push trigger both strip the
 * leading actor name and show it as the sender, so people read
 * "Louis Moore posted Day 3 of The Wisdom of Proverbs: How to Trust in God's Wisdom".
 */
export function buildNotificationMessage(actorName: string, eventTitle: string, entry: ProverbsDailyPost) {
  return `${actorName} posted Day ${entry.day} of ${eventTitle}: ${entry.title}`;
}

export async function resolveLouis(supabase: SupabaseClient) {
  let userId = process.env.LOUIS_USER_ID || null;

  if (!userId) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      const response = await fetch(
        `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(`email=="${LOUIS_EMAIL}"`)}`,
        { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
      );
      if (response.ok) {
        const payload = await response.json();
        const found = (payload?.users ?? []).find(
          (user: { email?: string | null; id?: string | null }) => user.email?.toLowerCase() === LOUIS_EMAIL,
        );
        if (found?.id) userId = found.id as string;
      }
    }
  }

  if (!userId) {
    const { data } = await supabase
      .from("profile_stats")
      .select("user_id")
      .ilike("display_name", "Louis Moore")
      .maybeSingle();
    if (data?.user_id) userId = data.user_id as string;
  }

  if (!userId) throw new Error("Could not resolve Louis's user id for the daily post author.");

  const { data: profile } = await supabase
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", userId)
    .maybeSingle();
  const displayName = (profile?.display_name as string | null) || (profile?.username as string | null) || "Louis Moore";
  return { userId, displayName };
}

export type CommunityEventDailyOptions = {
  dryRun: boolean;
  /** Manual day (only honoured with dryRun or force; the route enforces that). */
  dayOverride: number | null;
  force: boolean;
  now?: Date;
};

export type CommunityEventDailyResult = {
  event: string;
  phase: string;
  day: number | null;
  skipped?: string;
  post?: {
    action: "created" | "would_create" | "exists" | "repaired" | "would_repair";
    postId: string | null;
    title: string;
    category: string;
    linkUrl: string;
    preview?: string;
  };
  notifications?: {
    audience: "all_members" | "reminders_only" | "none";
    reason?: string;
    eligible: number;
    alreadyNotified: number;
    sent: number;
    wouldSend: number;
    sample?: { message: string; article_slug: string; type: string };
  };
  error?: string;
};

async function loadRecipients(supabase: SupabaseClient, eventSlug: string, remindersOnly: boolean) {
  const userIds: string[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    let query = supabase
      .from("community_event_members")
      .select("user_id")
      .eq("event_slug", eventSlug)
      .order("user_id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (remindersOnly) query = query.eq("reminders", true);
    const { data, error } = await query;
    if (error) throw new Error(`community_event_members: ${error.message}`);
    const rows = (data as Array<{ user_id: string }> | null) || [];
    rows.forEach((row) => userIds.push(row.user_id));
    if (rows.length < PAGE_SIZE) break;
  }
  return userIds;
}

async function loadAlreadyNotified(supabase: SupabaseClient, postId: string) {
  const notified = new Set<string>();
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("notifications")
      .select("user_id")
      .eq("post_id", postId)
      .eq("type", COMMUNITY_EVENT_NOTIFICATION_TYPE)
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`notifications: ${error.message}`);
    const rows = (data as Array<{ user_id: string }> | null) || [];
    rows.forEach((row) => notified.add(row.user_id));
    if (rows.length < PAGE_SIZE) break;
  }
  return notified;
}

async function publishDayPost(
  supabase: SupabaseClient,
  args: {
    eventSlug: string;
    day: number;
    postId: string;
    louis: { userId: string; displayName: string };
    title: string;
    content: string;
    linkUrl: string;
    mappingAlreadyExists: boolean;
  },
) {
  if (!args.mappingAlreadyExists) {
    // Mapping FIRST: this is what makes the broadcast trigger skip the post.
    const { error: mapError } = await supabase.from("community_event_day_posts").insert({
      event_slug: args.eventSlug,
      day_number: args.day,
      group_post_id: args.postId,
      group_id: BIBLE_BUDDY_GROUP_ID,
    });
    if (mapError) {
      // 23505 = another run got there first. Its post stands, never a second one.
      if (mapError.code === "23505") return { raced: true as const };
      throw new Error(`community_event_day_posts insert: ${mapError.message}`);
    }
  }

  try {
    await insertGroupPostWithRetry(
      supabase,
      {
        id: args.postId,
        group_id: BIBLE_BUDDY_GROUP_ID,
        user_id: args.louis.userId,
        display_name: args.louis.displayName,
        title: args.title,
        category: COMMUNITY_EVENT_POST_CATEGORY,
        content: args.content,
        link_url: args.linkUrl,
      },
      // Same as the other automated posts: skip insert-time fanout. The event
      // members are notified below instead.
      { skipInsertNotifications: true },
    );
  } catch (error) {
    if (!args.mappingAlreadyExists) {
      await supabase
        .from("community_event_day_posts")
        .delete()
        .eq("event_slug", args.eventSlug)
        .eq("day_number", args.day)
        .eq("group_post_id", args.postId);
    }
    throw error;
  }
  return { raced: false as const };
}

async function runForEvent(
  supabase: SupabaseClient,
  event: CommunityEvent,
  options: CommunityEventDailyOptions,
  getLouis: () => Promise<{ userId: string; displayName: string }>,
): Promise<CommunityEventDailyResult> {
  const now = options.now ?? new Date();
  const state = getCommunityEventState(event, now);
  const liveDay = state.phase === "live" ? state.communityDay : null;
  const base: CommunityEventDailyResult = { event: event.slug, phase: state.phase, day: null };

  const getEntry = DAILY_POSTS_BY_EVENT[event.slug];
  if (!getEntry) return { ...base, skipped: "no daily posts configured for this event" };

  let day: number;
  if (options.dayOverride !== null) {
    day = options.dayOverride;
    if (day < 1 || day > event.totalDays) return { ...base, day, skipped: `day must be 1-${event.totalDays}` };
    // A real (forced) backfill may only post days people can already open.
    if (!options.dryRun && !isCommunityEventDayUnlocked(event, day, now)) {
      return { ...base, day, skipped: "that day is not unlocked yet, refusing to post it" };
    }
  } else {
    if (liveDay === null) return { ...base, skipped: `event is not live (${state.phase})` };
    day = liveDay;
  }
  base.day = day;

  const entry = getEntry(day);
  if (!entry) return { ...base, error: `no daily post written for day ${day}` };

  const studyPath = eventDayStudyPath(event.devotionalId, day);
  const linkUrl = `${SITE_URL}${studyPath}`;
  const { title, content } = buildPostContent(entry, event.totalDays);
  const louis = await getLouis();

  // 1. The post.
  const mapping = await getEventDayPostStrict(supabase, event.slug, day);
  let postId: string | null = mapping?.group_post_id ?? null;
  let action: NonNullable<CommunityEventDailyResult["post"]>["action"];

  if (mapping) {
    const { data: existingPost, error } = await supabase
      .from("group_posts")
      .select("id")
      .eq("id", mapping.group_post_id)
      .maybeSingle();
    if (error) throw new Error(`group_posts lookup: ${error.message}`);
    if (existingPost) {
      action = "exists";
    } else if (options.dryRun) {
      action = "would_repair";
    } else {
      // A mapping without its post (a failed insert whose cleanup also failed):
      // finish the job with the id the mapping already points at.
      await publishDayPost(supabase, {
        eventSlug: event.slug, day, postId: mapping.group_post_id, louis, title, content, linkUrl, mappingAlreadyExists: true,
      });
      action = "repaired";
    }
  } else if (options.dryRun) {
    action = "would_create";
  } else {
    const newId = crypto.randomUUID();
    const result = await publishDayPost(supabase, {
      eventSlug: event.slug, day, postId: newId, louis, title, content, linkUrl, mappingAlreadyExists: false,
    });
    if (result.raced) {
      const winner = await getEventDayPostStrict(supabase, event.slug, day);
      postId = winner?.group_post_id ?? null;
      action = "exists";
    } else {
      postId = newId;
      action = "created";
    }
  }

  const post: CommunityEventDailyResult["post"] = {
    action,
    postId,
    title,
    category: COMMUNITY_EVENT_POST_CATEGORY,
    linkUrl,
    preview: options.dryRun ? buildPostPlainText(entry, event.totalDays) : undefined,
  };

  // 2. Notifications. Only for the event's current day: a backfill of an
  // older day posts quietly. Deduped per post, so re-runs never double-notify
  // and a run that died halfway finishes the rest next time.
  const remindersOnly = day !== 1;
  const audience = remindersOnly ? "reminders_only" : "all_members";
  if (liveDay === null || day !== liveDay) {
    return {
      ...base,
      post,
      notifications:
        options.dryRun && options.dayOverride !== null
          ? await previewNotifications(supabase, event, entry, louis, audience, remindersOnly, postId, studyPath, "dry run for a day that is not today: shows who WOULD be notified if it were")
          : { audience: "none", reason: "not the event's current day", eligible: 0, alreadyNotified: 0, sent: 0, wouldSend: 0 },
    };
  }

  const recipients = (await loadRecipients(supabase, event.slug, remindersOnly)).filter((id) => id !== louis.userId);
  const already = postId ? await loadAlreadyNotified(supabase, postId) : new Set<string>();
  const pending = recipients.filter((id) => !already.has(id));
  const message = buildNotificationMessage(louis.displayName, event.title, entry);
  const sample = { message, article_slug: studyPath, type: COMMUNITY_EVENT_NOTIFICATION_TYPE };

  if (options.dryRun || !postId) {
    return {
      ...base,
      post,
      notifications: { audience, eligible: recipients.length, alreadyNotified: already.size, sent: 0, wouldSend: pending.length, sample },
    };
  }

  let sent = 0;
  const failures: string[] = [];
  for (let i = 0; i < pending.length; i += NOTIFY_CHUNK) {
    const rows = pending.slice(i, i + NOTIFY_CHUNK).map((userId) => ({
      user_id: userId,
      type: COMMUNITY_EVENT_NOTIFICATION_TYPE,
      from_user_id: louis.userId,
      from_user_name: louis.displayName,
      article_slug: studyPath,
      post_id: postId,
      comment_id: null,
      message,
      is_read: false,
    }));
    const { error } = await supabase.from("notifications").insert(rows);
    if (error) {
      failures.push(error.message);
      continue;
    }
    sent += rows.length;
  }

  return {
    ...base,
    post,
    notifications: { audience, eligible: recipients.length, alreadyNotified: already.size, sent, wouldSend: 0, sample },
    error: failures.length ? `notification insert failed for ${failures.length} chunk(s): ${failures[0]}` : undefined,
  };
}

async function previewNotifications(
  supabase: SupabaseClient,
  event: CommunityEvent,
  entry: ProverbsDailyPost,
  louis: { userId: string; displayName: string },
  audience: "all_members" | "reminders_only",
  remindersOnly: boolean,
  postId: string | null,
  studyPath: string,
  reason: string,
): Promise<NonNullable<CommunityEventDailyResult["notifications"]>> {
  const recipients = (await loadRecipients(supabase, event.slug, remindersOnly)).filter((id) => id !== louis.userId);
  const already = postId ? await loadAlreadyNotified(supabase, postId) : new Set<string>();
  return {
    audience,
    reason,
    eligible: recipients.length,
    alreadyNotified: already.size,
    sent: 0,
    wouldSend: recipients.filter((id) => !already.has(id)).length,
    sample: {
      message: buildNotificationMessage(louis.displayName, event.title, entry),
      article_slug: studyPath,
      type: COMMUNITY_EVENT_NOTIFICATION_TYPE,
    },
  };
}

/** Like getEventDayPost in communityEventDays, but a lookup error throws instead of reading as "no post yet". */
async function getEventDayPostStrict(supabase: SupabaseClient, eventSlug: string, day: number) {
  const { data, error } = await supabase
    .from("community_event_day_posts")
    .select("event_slug, day_number, group_post_id, group_id, published_at")
    .eq("event_slug", eventSlug)
    .eq("day_number", day)
    .maybeSingle();
  if (error) throw new Error(`community_event_day_posts: ${error.message}`);
  return (data as EventDayPost | null) ?? null;
}

export async function runCommunityEventDaily(supabase: SupabaseClient, options: CommunityEventDailyOptions) {
  let louisPromise: Promise<{ userId: string; displayName: string }> | null = null;
  const getLouis = () => (louisPromise ??= resolveLouis(supabase));

  const results: CommunityEventDailyResult[] = [];
  for (const event of COMMUNITY_EVENTS) {
    try {
      results.push(await runForEvent(supabase, event, options, getLouis));
    } catch (error) {
      results.push({
        event: event.slug,
        phase: getCommunityEventState(event, options.now ?? new Date()).phase,
        day: null,
        error: error instanceof Error ? error.message : "unknown error",
      });
    }
  }
  return results;
}
