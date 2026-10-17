import type { SupabaseClient } from "@supabase/supabase-js";
import type { ActionType } from "./actionTypes";

/**
 * What the buddy feed announces by itself (Louis, 2026-10-17: "it automatically
 * posts things whenever they complete something, so other people can see it").
 *
 * The restraint here is the whole design, so the numbers that decided it are
 * written down. Completions in the 30 days to 2026-10-17, per day:
 *
 *   chapter_completed                73.6     every chapter anybody reads
 *   bible_in_one_year_day_completed  17.0
 *   trivia_chapter_completed         15.7
 *   devotional_day_completed          8.8
 *   scrambled_chapter_completed       2.4
 *   book_completed                    0.0     has never fired
 *
 * chapter_completed is out: seventy-four "X read a chapter" items a day, from
 * 58 daily actives, is a log rather than a feed, and a feed nobody reads
 * announces nothing. book_completed is in despite never having fired, because
 * finishing a book of the Bible is the one that deserves saying out loud - it
 * costs nothing to carry and it will fire eventually.
 *
 * The three chosen come to roughly 26 items a day between them, about one an
 * hour, which is a feed that looks alive without becoming wallpaper.
 */
export const FEED_MILESTONES = new Set<ActionType>([
  "book_completed",
  "devotional_day_completed",
  "bible_in_one_year_day_completed",
]);

/**
 * At most this many automatic items per person per day.
 *
 * Someone catching up on a plan can finish eight Bible in One Year days in an
 * evening, and the feed would be nothing but them. The cap is per person, so a
 * busy day still shows the first few and everybody else is still visible.
 */
export const MAX_AUTO_ACTIVITY_PER_DAY = 3;

export type MilestoneData = Record<string, string | number | null>;

type MinimalClient = Pick<SupabaseClient, "from">;

/**
 * Write one automatic feed item, unless it would be a repeat or over the cap.
 *
 * Takes the client rather than making one, so the HTTP route and any server
 * code that records a completion directly can both call it with their own
 * service-role client.
 *
 * Returns what it did, for the caller's logs. Never throws: an announcement
 * failing must not fail the completion it is announcing - the reading is the
 * thing that matters and it is already recorded by the time this runs.
 */
export async function insertFeedMilestone(
  admin: MinimalClient,
  userId: string,
  actionType: ActionType,
  data: MilestoneData,
): Promise<{ posted: boolean; reason?: string }> {
  if (!FEED_MILESTONES.has(actionType)) return { posted: false, reason: "not a milestone" };
  if (!userId) return { posted: false, reason: "no user" };

  try {
    // Same thing twice is not news. Day 5 of a study completed again after a
    // reset, or a chapter re-read, should not announce itself a second time -
    // and people do re-read, which is the point of the app.
    const fingerprint = JSON.stringify(data ?? {});
    const { data: mine } = await admin
      .from("feed_activity")
      .select("activity_data")
      .eq("user_id", userId)
      .eq("activity_type", actionType)
      .order("created_at", { ascending: false })
      .limit(200);

    const already = (mine || []).some((row) => JSON.stringify(row.activity_data ?? {}) === fingerprint);
    if (already) return { posted: false, reason: "already announced" };

    // The daily cap, counted from midnight UTC. Deliberately not the reader's
    // local midnight: this runs on the server, which does not know their
    // timezone, and being an hour out on a cap of three changes nothing.
    const midnight = new Date();
    midnight.setUTCHours(0, 0, 0, 0);
    const { count } = await admin
      .from("feed_activity")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", midnight.toISOString());
    if ((count ?? 0) >= MAX_AUTO_ACTIVITY_PER_DAY) return { posted: false, reason: "daily cap" };

    const { error } = await admin.from("feed_activity").insert({
      user_id: userId,
      activity_type: actionType,
      activity_data: data ?? {},
      is_public: true,
    });
    if (error) return { posted: false, reason: error.message };

    return { posted: true };
  } catch (error) {
    return { posted: false, reason: error instanceof Error ? error.message : "unknown" };
  }
}
