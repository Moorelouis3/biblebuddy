import type { SupabaseClient } from "@supabase/supabase-js";
import { buildWeeklyGroupTrivia } from "./groupWeeklyTrivia";
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

async function syncExistingTriviaOwnership(
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
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    weekday: parts.weekday,
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

function isBerlinReleaseWindowOpen(date: Date) {
  const berlin = getBerlinDateParts(date);
  if (berlin.weekday !== "Tue") return false;
  if (berlin.hour > 18) return true;
  if (berlin.hour < 18) return false;
  if (berlin.minute > 0) return true;
  return berlin.minute === 0 && berlin.second >= 0;
}

export async function ensureWeeklyGroupTriviaPost(
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

  const trivia = buildWeeklyGroupTrivia(now);

  const resolvedActorUserId = await resolveActorUserId(supabaseAdmin, actorUserId);
  const postOwnerUserId = await resolvePostOwnerUserId(supabaseAdmin, group.leader_user_id, actorUserId);
  const displayName = await resolveDisplayName(supabaseAdmin, postOwnerUserId);

  const { data: existingSet, error: existingError } = await supabaseAdmin
    .from("weekly_group_trivia_sets")
    .select("id, post_id, week_key")
    .eq("group_id", groupId)
    .eq("week_key", trivia.weekKey)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message || "Could not check weekly trivia.");
  if (existingSet) {
    const existingPostStillPresent = await syncExistingTriviaOwnership(
      supabaseAdmin,
      existingSet.post_id,
      postOwnerUserId,
      displayName,
    );

    if (!existingPostStillPresent) {
      await supabaseAdmin.from("weekly_group_trivia_sets").delete().eq("id", existingSet.id);
    } else {
    await supabaseAdmin
      .from("weekly_group_trivia_sets")
      .update({ created_by: resolvedActorUserId })
      .eq("id", existingSet.id);
    return { ok: true, skipped: true as const, reason: "already_exists", postId: existingSet.post_id };
    }
  }

  const content =
    `<p><strong>${trivia.subjectLine}</strong></p>` +
    `<p>${trivia.intro}</p>` +
    `<p>Tap into this week's 10-question Bible trivia, see your score, and compare with the group board below.</p>`;

  const { data: post, error: postError } = await supabaseAdmin
    .from("group_posts")
    .insert({
      group_id: groupId,
      user_id: postOwnerUserId,
      display_name: displayName,
      title: "Weekly Bible Trivia",
      category: "weekly_trivia",
      content,
    })
    .select("id")
    .single();

  if (postError || !post) {
    throw new Error(postError?.message || "Could not create weekly trivia post.");
  }

  const { error: setError } = await supabaseAdmin
    .from("weekly_group_trivia_sets")
    .insert({
      group_id: groupId,
      post_id: post.id,
      week_key: trivia.weekKey,
      subject_key: trivia.subjectKey,
      subject_title: trivia.subjectTitle,
      intro: trivia.intro,
      questions: trivia.questions,
      created_by: resolvedActorUserId,
    });

  if (setError) {
    await supabaseAdmin.from("group_posts").delete().eq("id", post.id);
    throw new Error(setError.message || "Could not save weekly trivia.");
  }

  return { ok: true, skipped: false as const, postId: post.id, weekKey: trivia.weekKey };
}
