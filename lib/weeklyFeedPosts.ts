import type { SupabaseClient } from "@supabase/supabase-js";
import { BIBLE_BUDDY_USER_ID } from "./bibleBuddyAccount";

/**
 * The two posts the weekly nudges point at: the prayer thread and the poll.
 *
 * Louis, 2026-10-19: "we have our can you pray for us post already posted,
 * people need to be commenting under that - I don't need 50 different posts
 * saying hey can you pray for me", and the poll should be "a full poll on the
 * feed" that the popup connects to. So both live as one post a week from the
 * Bible Buddy account, both pinned, and everything people say goes underneath.
 */

/** A poll post carries its poll id here, which is how the feed knows to draw it. */
export const POLL_POST_LINK_PREFIX = "bb-poll:";

export function pollIdFromPost(linkUrl: string | null | undefined) {
  if (!linkUrl || !linkUrl.startsWith(POLL_POST_LINK_PREFIX)) return null;
  return linkUrl.slice(POLL_POST_LINK_PREFIX.length) || null;
}

/** The newest prayer prompt the Bible Buddy account has posted. */
export async function findPrayerThreadPost(admin: SupabaseClient) {
  const { data } = await admin
    .from("feed_posts")
    .select("id, created_at")
    .eq("user_id", BIBLE_BUDDY_USER_ID)
    .eq("post_type", "thought")
    .ilike("content", "%pray%")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ?? null;
}

type PollSummary = {
  id: string;
  question: string;
  intro: string | null;
  subjectTitle: string | null;
  weekKey: string;
};

/**
 * One post per poll, created the first time anybody needs it. The post body is
 * the question, so the feed reads properly for anyone scrolling past; the
 * options are drawn from the poll itself.
 */
export async function ensureWeeklyPollFeedPost(admin: SupabaseClient, poll: PollSummary) {
  const link = `${POLL_POST_LINK_PREFIX}${poll.id}`;

  const { data: existing } = await admin
    .from("feed_posts")
    .select("id")
    .eq("link_url", link)
    .limit(1)
    .maybeSingle();
  if (existing?.id) return existing.id as string;

  const content = [
    poll.question,
    "",
    poll.intro?.trim() || "This week's question. Tap an answer below, then tell us why in the comments.",
  ].join("\n");

  const { data: created, error } = await admin
    .from("feed_posts")
    .insert({
      user_id: BIBLE_BUDDY_USER_ID,
      post_type: "thought",
      content,
      link_url: link,
      link_title: poll.subjectTitle || "Poll of the week",
      visibility: "community",
    })
    .select("id")
    .single();
  if (error) return null;
  return created.id as string;
}
