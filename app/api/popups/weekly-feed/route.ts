import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getPollWeekKey } from "@/lib/groupWeeklyPoll";
import {
  getPrayerWeekKey,
  weeklyPopupDayId,
  weeklyPopupId,
  type WeeklyFeedPopupKind,
} from "@/lib/weeklyFeedPopups";
import { ensureWeeklyPollFeedPost, findPrayerThreadPost } from "@/lib/weeklyFeedPosts";
import { ensureWeeklyGroupPollPost } from "@/lib/weeklyGroupPollAdmin";

/**
 * Eligibility for the two weekly feed nudges (2026-10-18).
 *
 * ?kind=prayer -> has this person been asked for a prayer request this week?
 * ?kind=poll   -> have they been shown this week's poll, and what is it?
 *
 * Both are remembered as a row in user_popups_seen under a week-stamped
 * popup_id, the same way the daily study nudge remembers its day, so a person
 * sees each one once a week on any device - and showing either one writes a
 * day row as well, so only one of them can land on a given day.
 *
 * Neither popup asks anyone to write a post. Each points at the post that is
 * already pinned on the feed - the weekly prayer thread, and the week's poll -
 * because the answers belong together under one post, not in fifty.
 *
 * The poll itself is the one the group poll bank is already rotating through.
 * It is ensured here rather than waited for, because the weekly cron writes it
 * into the official study group and that group is closed to readers now - the
 * row and its options are still exactly what we want to ask.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OFFICIAL_GROUP_NAMES = ["Bible Buddy Study Group", "Hope Nation"];

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceKey) return NextResponse.json({ eligible: false });

  const params = new URL(request.url).searchParams;
  const kind = params.get("kind") === "poll" ? "poll" : ("prayer" as WeeklyFeedPopupKind);

  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7) : "";
  if (!token) return NextResponse.json({ eligible: false }, { status: 401 });

  const authClient = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData } = await authClient.auth.getUser(token);
  const userId = userData.user?.id;
  if (!userId) return NextResponse.json({ eligible: false }, { status: 401 });

  const weekKey = kind === "poll" ? getPollWeekKey() : getPrayerWeekKey();
  const popupId = weeklyPopupId(kind, weekKey);
  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const dayId = weeklyPopupDayId();
  const { data: seen, error: seenError } = await admin
    .from("user_popups_seen")
    .select("popup_id")
    .eq("user_id", userId)
    .in("popup_id", [popupId, dayId]);
  // If the seen-state cannot be read, say no rather than risk asking twice.
  if (seenError || seen?.length) return NextResponse.json({ eligible: false });

  if (kind === "prayer") {
    // People comment under the prayer thread that is already posted - one
    // post a week, with everybody's requests under it. They do not each start
    // a post of their own (Louis, 2026-10-19: "I don't need 50 different
    // posts saying hey can you pray for me"). This finds the newest prayer
    // prompt the Bible Buddy account has posted, so next week's thread takes
    // over on its own.
    const thread = await findPrayerThreadPost(admin);

    return NextResponse.json({
      eligible: true,
      kind,
      popupId,
      dayId,
      weekKey,
      threadPostId: thread?.id ?? null,
    });
  }

  const { data: groups } = await admin
    .from("study_groups")
    .select("id, name, leader_user_id, created_at")
    .in("name", OFFICIAL_GROUP_NAMES)
    .order("created_at", { ascending: false });
  const group =
    groups?.find((row) => row.name === OFFICIAL_GROUP_NAMES[0]) ?? groups?.find((row) => row.name === OFFICIAL_GROUP_NAMES[1]);
  if (!group) return NextResponse.json({ eligible: false });

  const loadPoll = async () =>
    (
      await admin
        .from("weekly_group_polls")
        .select("id, group_id, week_key, poll_key, subject_title, question, intro, options")
        .eq("week_key", weekKey)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    ).data;

  let poll = await loadPoll();
  if (!poll) {
    // The weekly cron publishes on Wednesday at 18:00 Berlin and does nothing
    // on any other day, so a week it misses would leave this popup with
    // nothing to ask for seven days. Publishing it here catches that up: the
    // poll bank keeps its rotation either way.
    try {
      await ensureWeeklyGroupPollPost(admin, group.id, group.leader_user_id ?? null, new Date(), { force: true });
      poll = await loadPoll();
    } catch {
      // Nothing to ask this week; the prayer nudge still runs.
    }
  }
  if (!poll) return NextResponse.json({ eligible: false });

  const [{ data: votes }, { data: mine }] = await Promise.all([
    admin.from("weekly_group_poll_votes").select("option_key").eq("poll_id", poll.id),
    admin.from("weekly_group_poll_votes").select("option_key").eq("poll_id", poll.id).eq("user_id", userId).limit(1),
  ]);
  // Someone who already voted on the feed does not need to be asked again.
  if (mine?.length) return NextResponse.json({ eligible: false });

  const counts: Record<string, number> = {};
  for (const vote of votes || []) counts[vote.option_key] = (counts[vote.option_key] || 0) + 1;

  const pollPostId = await ensureWeeklyPollFeedPost(admin, {
    id: poll.id,
    question: poll.question,
    intro: poll.intro,
    subjectTitle: poll.subject_title,
    weekKey,
  });

  return NextResponse.json({
    eligible: true,
    kind,
    popupId,
    dayId,
    weekKey,
    pollPostId,
    poll: {
      id: poll.id,
      groupId: poll.group_id,
      pollKey: poll.poll_key,
      subjectTitle: poll.subject_title,
      question: poll.question,
      intro: poll.intro,
      options: poll.options,
      counts,
      totalVotes: votes?.length ?? 0,
    },
  });
}
