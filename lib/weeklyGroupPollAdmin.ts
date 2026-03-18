import type { SupabaseClient } from "@supabase/supabase-js";
import { buildWeeklyGroupPoll } from "./groupWeeklyPoll";

const LOUIS_EMAIL = "moorelouis3@gmail.com";
const BERLIN_TIME_ZONE = "Europe/Berlin";

function getBerlinDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: BERLIN_TIME_ZONE,
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
  now = new Date(),
) {
  const { data: group, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name")
    .eq("id", groupId)
    .maybeSingle();

  if (groupError) throw new Error(groupError.message || "Could not load study group.");
  if (!group) throw new Error("Study group not found.");

  if (!["Bible Buddy Study Group", "Hope Nation"].includes(group.name)) {
    return { ok: true, skipped: true as const, reason: "not_official_group" };
  }

  if (!isBerlinReleaseWindowOpen(now)) {
    return { ok: true, skipped: true as const, reason: "before_release_time" };
  }

  const poll = buildWeeklyGroupPoll(now);

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("weekly_group_polls")
    .select("id, post_id, week_key")
    .eq("group_id", groupId)
    .eq("week_key", poll.weekKey)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message || "Could not check weekly poll.");
  if (existing) {
    return { ok: true, skipped: true as const, reason: "already_exists", postId: existing.post_id };
  }

  const { data: louisUsers, error: louisError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (louisError) throw new Error(louisError.message || "Could not load Louis account.");
  const louis = louisUsers.users.find((user) => user.email?.toLowerCase() === LOUIS_EMAIL);
  if (!louis) throw new Error("Louis account not found.");

  const content = "";

  const { data: post, error: postError } = await supabaseAdmin
    .from("group_posts")
    .insert({
      group_id: groupId,
      user_id: louis.id,
      display_name: "Louis",
      title: poll.question,
      category: "general",
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
      created_by: louis.id,
    });

  if (pollError) {
    await supabaseAdmin.from("group_posts").delete().eq("id", post.id);
    throw new Error(pollError.message || "Could not save weekly poll.");
  }

  return { ok: true, skipped: false as const, postId: post.id, weekKey: poll.weekKey };
}
