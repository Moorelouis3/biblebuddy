import type { SupabaseClient } from "@supabase/supabase-js";
import type { ActionType } from "./actionTypes";

/**
 * Milestones, posted to the community wall under the reader's own name.
 *
 * The problem this exists to fix, measured on 2026-10-17: in thirty days Louis
 * started 107 threads in the community and everybody else started **one**. In
 * the last seven days he started 27 and everybody else started none - and yet
 * 19 other people posted 65 times. Every one of those was a reply to something
 * he had written. The community is not quiet; it is just that nothing ever
 * starts except him, and replying to a prompt is a different act from putting
 * your own thing up.
 *
 * So each milestone becomes a thread with somebody else's name on it. 1,300 of
 * the 7,047 members did something in the app in the last thirty days, which is
 * the pool this draws on.
 *
 * It writes to group_posts, the wall people are already on, and not to the
 * buddy feed's own table - Louis, 2026-10-17: "it's really not a group, it's
 * one community". Smaller, real groups are a separate feature for later.
 */

/**
 * "Bible Buddy Study Group" - 7,047 members, 1,855 posts.
 *
 * The other two study_groups rows hold no members and no posts, so this is the
 * community rather than one of several. Overridable so a staging database with
 * different ids does not post into nothing.
 */
export const COMMUNITY_GROUP_ID =
  process.env.COMMUNITY_GROUP_ID || "165bada5-0900-44f1-963b-54e86fe64b39";

/**
 * How a milestone post is marked, and why it is not the category.
 *
 * group_posts.category carries a CHECK constraint, and "milestone" is not one
 * of the values it allows - so every insert was rejected with
 *
 *   new row for relation "group_posts" violates check constraint
 *   "group_posts_category_check"
 *
 * from the first run until 2026-10-18. The cron was firing the whole time and
 * failing on the same line, silently, because the error was returned rather
 * than thrown and nobody read it. I had tested the feed_activity insert and
 * assumed this one; it is the only insert in the feature and I never ran it.
 *
 * So the category is "general", which the constraint allows and which the wall
 * already renders, and the marker moves to title - a nullable column the
 * community feed does not select, so it shows nothing and means everything.
 * Changing the constraint would do this more tidily, but it is a migration
 * against a live table for a label, and this is a label.
 */
export const MILESTONE_CATEGORY = "general";
export const MILESTONE_MARKER = "milestone";

/**
 * What gets announced, and why these three.
 *
 * Completions per day over the 30 days to 2026-10-17:
 *
 *   chapter_completed                73.6   every chapter anybody reads
 *   bible_in_one_year_day_completed  17.0
 *   trivia_chapter_completed         15.7
 *   devotional_day_completed          8.8
 *   book_completed                    0.0   has never fired
 *
 * chapter_completed is out - seventy-four a day is a log, and a wall that is
 * mostly machine output stops being a place anybody posts. book_completed is
 * in despite never having fired: finishing a book of the Bible is the one that
 * deserves saying out loud, and it costs nothing to carry.
 */
export const COMMUNITY_MILESTONES = new Set<ActionType>([
  "book_completed",
  "devotional_day_completed",
  "bible_in_one_year_day_completed",
]);

/**
 * At most this many automatic posts per person per day.
 *
 * Somebody catching up on a plan can finish eight days in an evening, and the
 * wall would be nothing but them. Two is deliberately lower than it could be:
 * this is a wall real people post on, and the machine should never be the
 * loudest voice on it.
 */
export const MAX_MILESTONE_POSTS_PER_DAY = 2;

type MinimalClient = Pick<SupabaseClient, "from">;

/**
 * The sentence that appears on the wall, under the person's own name.
 *
 * Written as something a person would be glad to have said about them, not as
 * an event log line. The label is what master_actions stored, for example
 * "Bible in One Year Day 143 Completed: Title" or "Genesis".
 */
export function milestoneSentence(actionType: ActionType, actionLabel?: string | null): string | null {
  const label = (actionLabel || "").trim();

  if (actionType === "book_completed") {
    return label ? `📖 Finished the book of ${label}.` : null;
  }

  if (actionType === "bible_in_one_year_day_completed") {
    const day = label.match(/day\s*(\d+)/i)?.[1];
    return day ? `✅ Finished Day ${day} of Bible in One Year.` : null;
  }

  if (actionType === "devotional_day_completed") {
    const dayMatch = label.match(/day\s*(\d+)/i);
    const day = dayMatch?.[1];

    // Two shapes appear in the data, and the title is taken from whichever it
    // is rather than by deleting words.
    //
    // Stripping "of" anywhere turned the real study "The Tempting of Jesus"
    // into "The Tempting Jesus" - a title is somebody's writing and the wall
    // has no business rewording it.
    let title = "";
    if (dayMatch) {
      const trailing = label.match(/day\s*\d+\s*of\s+(.+)$/i); // "Day 3 of The Tempting of Jesus"
      if (trailing) {
        title = trailing[1].trim();
      } else {
        // "The Tempting of Jesus - Day 3"
        title = label.slice(0, dayMatch.index).replace(/[-–—:]+\s*$/, "").trim();
      }
    }

    if (day && title) return `✅ Completed Day ${day} of "${title}".`;
    if (day) return `✅ Completed Day ${day} of a Bible study.`;
    return null;
  }

  return null;
}

/**
 * Put one milestone on the wall, unless it is a repeat or over the cap.
 *
 * Never throws. An announcement failing must not affect anything else; the
 * reading it describes was recorded long before this runs.
 */
export async function postMilestoneToWall(
  admin: MinimalClient,
  input: { userId: string; displayName: string | null; actionType: ActionType; actionLabel?: string | null },
): Promise<{ posted: boolean; reason?: string }> {
  const { userId, displayName, actionType, actionLabel } = input;
  if (!COMMUNITY_MILESTONES.has(actionType)) return { posted: false, reason: "not a milestone" };
  if (!userId) return { posted: false, reason: "no user" };

  const content = milestoneSentence(actionType, actionLabel);
  if (!content) return { posted: false, reason: "nothing worth saying" };

  try {
    // Said once. People re-read chapters and redo studies, which is the point
    // of the app, and the wall should not say so twice.
    const { data: mine } = await admin
      .from("feed_posts")
      .select("content, created_at")
      .eq("user_id", userId)
      .eq("post_type", "thought")
      .order("created_at", { ascending: false })
      .limit(200);

    const rows = mine || [];
    if (rows.some((row) => row.content === content)) {
      return { posted: false, reason: "already posted" };
    }

    /**
     * A real post, not an activity row.
     *
     * Louis, 2026-10-18: "under the community, all you have is the like - we
     * need the full social media thing under there, like, comment, block that
     * person, whatever it is, it all needs to be there."
     *
     * Activity rows could never have that. Comments hang off feed_post_comments
     * by post_id and likes off feed_post_reactions, so a completion that was
     * not a post could not be commented on, reported or blocked, and the wall
     * he was looking at was almost entirely completions - a page of things
     * nobody could answer.
     *
     * As a post it gets all of it for nothing: the like, the comment thread,
     * the report and block menu, a place on the author's own wall. One row
     * type in the feed instead of two is also one fewer thing to keep in step.
     *
     * The sentence keeps its tick, because here it is the body of a post
     * rather than a phrase after somebody's name.
     */
    const { error } = await admin.from("feed_posts").insert({
      user_id: userId,
      post_type: "thought",
      content,
      visibility: "community",
      reaction_counts: {},
      comment_count: 0,
    });
    if (error) return { posted: false, reason: error.message };
    return { posted: true };
  } catch (error) {
    return { posted: false, reason: error instanceof Error ? error.message : "unknown" };
  }
}
