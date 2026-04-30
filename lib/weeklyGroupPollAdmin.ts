import type { SupabaseClient } from "@supabase/supabase-js";
import { buildWeeklyGroupPoll } from "./groupWeeklyPoll";
import { GROUP_SCHEDULE_TIME_ZONE } from "./groupScheduleTimeZone";
const LOUIS_EMAIL = "moorelouis3@gmail.com";

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

  const { data: louisUsers, error: louisError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (louisError) throw new Error(louisError.message || "Could not load Louis account.");
  const louis = louisUsers.users.find((user) => user.email?.toLowerCase() === LOUIS_EMAIL);
  if (!louis) throw new Error("Louis account not found.");
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

async function syncExistingPollOwnership(
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
    weekday: parts.weekday,
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

function isBerlinReleaseWindowOpen(date: Date) {
  const berlin = getBerlinDateParts(date);
  if (berlin.weekday !== "Wed") return false;
  if (berlin.hour > 18) return true;
  if (berlin.hour < 18) return false;
  if (berlin.minute > 0) return true;
  return berlin.minute === 0 && berlin.second >= 0;
}

export async function ensureWeeklyGroupPollPost(
  supabaseAdmin: SupabaseClient,
  groupId: string,
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

  if (!options.force && !isBerlinReleaseWindowOpen(now)) {
    return { ok: true, skipped: true as const, reason: "before_release_time" };
  }

  const poll = buildWeeklyGroupPoll(now);

  const resolvedActorUserId = await resolveActorUserId(supabaseAdmin, actorUserId);
  const postOwnerUserId = await resolvePostOwnerUserId(supabaseAdmin, group.leader_user_id, actorUserId);
  const displayName = await resolveDisplayName(supabaseAdmin, postOwnerUserId);

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("weekly_group_polls")
    .select("id, post_id, week_key")
    .eq("group_id", groupId)
    .eq("week_key", poll.weekKey)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message || "Could not check weekly poll.");
  if (existing) {
    const existingPostStillPresent = await syncExistingPollOwnership(
      supabaseAdmin,
      existing.post_id,
      postOwnerUserId,
      displayName,
    );

    if (!existingPostStillPresent) {
      await supabaseAdmin.from("weekly_group_polls").delete().eq("id", existing.id);
    } else {
    await supabaseAdmin
      .from("weekly_group_polls")
      .update({ created_by: resolvedActorUserId })
      .eq("id", existing.id);
    return { ok: true, skipped: true as const, reason: "already_exists", postId: existing.post_id };
    }
  }

  const content = "";

  const { data: post, error: postError } = await supabaseAdmin
    .from("group_posts")
    .insert({
      group_id: groupId,
      user_id: postOwnerUserId,
      display_name: displayName,
      title: poll.question,
      category: "weekly_poll",
      content,
    })
    .select("id")
    .single();

  if (postError || !post) {
    throw new Error(postError?.message || "Could not create weekly poll post.");
  }

  const { error: pollError } = await supabaseAdmin
    .from("weekly_group_polls")
    .insert({
      group_id: groupId,
      post_id: post.id,
      week_key: poll.weekKey,
      poll_key: poll.pollKey,
      subject_title: poll.subjectTitle,
      question: poll.question,
      intro: poll.intro,
      options: poll.options,
      created_by: resolvedActorUserId,
    });

  if (pollError) {
    await supabaseAdmin.from("group_posts").delete().eq("id", post.id);
    throw new Error(pollError.message || "Could not save weekly poll.");
  }

  return { ok: true, skipped: false as const, postId: post.id, weekKey: poll.weekKey };
}
