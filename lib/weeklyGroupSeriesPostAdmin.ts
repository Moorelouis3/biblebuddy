import type { SupabaseClient } from "@supabase/supabase-js";
import {
  type BibleStudySeriesSnapshot,
  buildBibleStudySaturdayPost,
  buildPrayerRequestSundayPost,
  buildUpdateMondayPost,
  buildWhoWasThisFridayPost,
  getBerlinDateKey,
} from "./groupRecurringSeries";
import {
  normalizeRecurringOverridePayload,
  type RecurringSeriesOverridePayload,
} from "./groupRecurringOverrides";
import { GROUP_SCHEDULE_TIME_ZONE } from "./groupScheduleTimeZone";
import { insertGroupPostWithRetry } from "./groupPostInsert";
const LOUIS_EMAIL = "moorelouis3@gmail.com";

export type WeeklySeriesKey =
  | "update_monday"
  | "who_was_this_friday"
  | "bible_study_saturday"
  | "prayer_request_sunday";

const SERIES_CONFIG: Record<
  WeeklySeriesKey,
  {
    weekday: "Mon" | "Fri" | "Sat" | "Sun";
    label: string;
    builder: (date: Date) => {
      seriesKey: string;
      weekKey: string;
      title: string;
      description: string | null;
      contentHtml: string;
    };
  }
> = {
  update_monday: {
    weekday: "Mon",
    label: "Update Monday",
    builder: buildUpdateMondayPost,
  },
  who_was_this_friday: {
    weekday: "Fri",
    label: "Who Was This Friday",
    builder: buildWhoWasThisFridayPost,
  },
  bible_study_saturday: {
    weekday: "Sat",
    label: "Bible Study Saturday",
    builder: buildBibleStudySaturdayPost,
  },
  prayer_request_sunday: {
    weekday: "Sun",
    label: "Prayer Request Sunday",
    builder: buildPrayerRequestSundayPost,
  },
};

function resolveSeriesStart(schedule: { start_at?: string | null; start_date?: string | null } | null | undefined) {
  if (!schedule) return null;
  if (schedule.start_at) return schedule.start_at;
  if (schedule.start_date) return `${schedule.start_date}T00:00:00`;
  return null;
}

async function loadBibleStudySeriesSnapshot(
  supabaseAdmin: SupabaseClient,
  groupId: string,
): Promise<BibleStudySeriesSnapshot | null> {
  const { data: currentSeries, error: currentSeriesError } = await supabaseAdmin
    .from("group_series")
    .select("id, title, total_weeks")
    .eq("group_id", groupId)
    .eq("is_current", true)
    .maybeSingle();

  if (currentSeriesError) {
    throw new Error(currentSeriesError.message || "Could not load current Bible study series.");
  }

  if (!currentSeries) return null;

  const { data: schedule, error: scheduleError } = await supabaseAdmin
    .from("series_schedules")
    .select("start_at, start_date")
    .eq("series_id", currentSeries.id)
    .maybeSingle();

  if (scheduleError) {
    throw new Error(scheduleError.message || "Could not load Bible study schedule.");
  }

  return {
    groupId,
    seriesTitle: currentSeries.title || "Bible Study",
    seriesStartAt: resolveSeriesStart(schedule),
    totalWeeks: currentSeries.total_weeks ?? null,
  };
}

async function resolveDisplayName(supabaseAdmin: SupabaseClient, userId: string) {
  const { data } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.display_name || data?.username || "Louis";
}

async function resolveActorUserId(supabaseAdmin: SupabaseClient, actorUserId?: string | null) {
  if (actorUserId) return actorUserId;

  if (process.env.LOUIS_USER_ID) {
    return process.env.LOUIS_USER_ID;
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      const response = await fetch(
        `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(`email=="${LOUIS_EMAIL}"`)}`,
        {
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
          },
        },
      );

      if (response.ok) {
        const payload = await response.json();
        const found = (payload?.users ?? []).find((user: { email?: string | null; id?: string | null }) =>
          user.email?.toLowerCase() === LOUIS_EMAIL,
        );
        if (found?.id) {
          return found.id;
        }
      }
    }
  } catch (_) {
    // Fall through to listUsers fallback.
  }

  const { data: louisUsers, error: louisError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (louisError) throw new Error(louisError.message || "Could not load Louis account.");
  const louis = louisUsers.users.find((user) => user.email?.toLowerCase() === LOUIS_EMAIL);
  if (!louis) throw new Error("Louis user could not be found.");
  return louis.id;
}

async function resolvePostOwnerUserId(
  supabaseAdmin: SupabaseClient,
  leaderUserId?: string | null,
  actorUserId?: string | null,
) {
  if (leaderUserId) return leaderUserId;
  return resolveActorUserId(supabaseAdmin, actorUserId);
}

async function syncExistingSeriesOwnership(
  supabaseAdmin: SupabaseClient,
  existingPostId: string | null | undefined,
  actorUserId: string,
  displayName: string,
) {
  if (!existingPostId) return false;

  const { data: existingPost } = await supabaseAdmin
    .from("group_posts")
    .select("id")
    .eq("id", existingPostId)
    .maybeSingle();

  if (!existingPost) return false;

  await supabaseAdmin
    .from("group_posts")
    .update({
      user_id: actorUserId,
      display_name: displayName,
    })
    .eq("id", existingPostId);

  return true;
}

function getBerlinDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: GROUP_SCHEDULE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    weekday: parts.weekday as "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun",
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

function isBerlinReleaseWindowOpen(seriesKey: WeeklySeriesKey, date: Date) {
  const berlin = getBerlinDateParts(date);
  const expectedWeekday = SERIES_CONFIG[seriesKey].weekday;
  if (berlin.weekday !== expectedWeekday) return false;
  if (berlin.hour > 18) return true;
  if (berlin.hour < 18) return false;
  if (berlin.minute > 0) return true;
  return berlin.minute === 0 && berlin.second >= 0;
}

export async function ensureWeeklyGroupSeriesPost(
  supabaseAdmin: SupabaseClient,
  groupId: string,
  seriesKey: WeeklySeriesKey,
  actorUserId?: string | null,
  now = new Date(),
  options: { force?: boolean } = {},
) {
  const { data: group, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name, leader_user_id")
    .eq("id", groupId)
    .maybeSingle();

  if (groupError) throw new Error(groupError.message || "Could not load study group.");
  if (!group) throw new Error("Study group not found.");

  if (!options.force && !isBerlinReleaseWindowOpen(seriesKey, now)) {
    return { ok: true, skipped: true as const, reason: "before_release_time" };
  }

  const bibleStudySnapshot =
    seriesKey === "bible_study_saturday"
      ? await loadBibleStudySeriesSnapshot(supabaseAdmin, groupId)
      : null;

  const series =
    seriesKey === "bible_study_saturday"
      ? buildBibleStudySaturdayPost(now, bibleStudySnapshot)
      : SERIES_CONFIG[seriesKey].builder(now);
  const weekKey = getBerlinDateKey(now);
  const { data: overrideRow } = await supabaseAdmin
    .from("group_recurring_post_overrides")
    .select("override_payload")
    .eq("group_id", groupId)
    .eq("schedule_key", seriesKey)
    .eq("week_key", weekKey)
    .maybeSingle();
  const seriesOverride = normalizeRecurringOverridePayload(
    seriesKey,
    overrideRow?.override_payload,
  ) as RecurringSeriesOverridePayload | null;
  const resolvedSeries = seriesOverride
    ? {
        ...series,
        title: seriesOverride.title,
        description: seriesOverride.description,
        contentHtml: seriesOverride.contentHtml,
      }
    : series;

  const resolvedActorUserId = await resolveActorUserId(supabaseAdmin, actorUserId);
  const postOwnerUserId = await resolvePostOwnerUserId(supabaseAdmin, group.leader_user_id, actorUserId);
  const displayName = await resolveDisplayName(supabaseAdmin, postOwnerUserId);

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("weekly_group_series_posts")
    .select("id, post_id, week_key")
    .eq("group_id", groupId)
    .eq("series_key", seriesKey)
    .eq("week_key", weekKey)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message || "Could not check Bible study post.");
  if (existing) {
    const existingPostStillPresent = await syncExistingSeriesOwnership(
      supabaseAdmin,
      existing.post_id,
      postOwnerUserId,
      displayName,
    );

    if (!existingPostStillPresent) {
      await supabaseAdmin.from("weekly_group_series_posts").delete().eq("id", existing.id);
    } else {
    await supabaseAdmin
      .from("weekly_group_series_posts")
      .update({ created_by: resolvedActorUserId })
      .eq("id", existing.id);
    return { ok: true, skipped: true as const, reason: "already_exists", postId: existing.post_id };
    }
  }

  const postId = await insertGroupPostWithRetry(supabaseAdmin, {
    group_id: groupId,
    user_id: postOwnerUserId,
    display_name: displayName,
    title: resolvedSeries.title,
    category: seriesKey,
    content: resolvedSeries.contentHtml,
  }, {
    skipInsertNotifications: true,
  });

  const { error: seriesError } = await supabaseAdmin
    .from("weekly_group_series_posts")
    .insert({
      group_id: groupId,
      post_id: postId,
      week_key: weekKey,
      series_key: seriesKey,
      subject_title: SERIES_CONFIG[seriesKey].label,
      title: resolvedSeries.title,
      description: resolvedSeries.description,
      content_html: resolvedSeries.contentHtml,
      created_by: resolvedActorUserId,
    });

  if (seriesError) {
    await supabaseAdmin.from("group_posts").delete().eq("id", postId);
    throw new Error(seriesError.message || "Could not save recurring group post.");
  }

  return { ok: true, skipped: false as const, postId, weekKey };
}
