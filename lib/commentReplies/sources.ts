import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Everywhere in the app a person can leave a comment.
 *
 * Louis, 2026-11-02: "this means study guides, feed, bible in one year,
 * anywhere comments are - and i can comment for people except if its them
 * talking to another Buddy."
 *
 * That last clause is the rule the whole file is built around. Answering a
 * comment on a study is fine: the thing being commented on is a chapter, and
 * the host answering is normal. Answering a comment somebody left on another
 * member's post is barging into a conversation between two people. So each
 * source below decides for itself what "aimed at us" means, and nothing that
 * fails that test is ever looked at again.
 *
 * Two surfaces, and only two:
 *
 *   article_comments    the study guides - bible-chapter, bible-in-one-year,
 *                       /bible pages and blog posts. 631 comments in 30 days.
 *   feed_post_comments  the social feed. 65 comments in 30 days, of which 15
 *                       sit under Louis's own posts.
 *
 * NOT the groups. `group_posts` still has traffic in it and a first pass here
 * wired it up because of that - Louis, 2026-11-02: "we dont have a group feed
 * any more, i been said close that shit off. we only have the social feed."
 * The groups were closed and /study-groups redirects to the feed; rows still
 * arriving in that table do not make it a surface we post to. Same for
 * group_series_post_comments and series_reflections, both of which had zero
 * comments in 30 days anyway.
 */

export type SourceName = "article" | "feed";

export type Candidate = {
  source: SourceName;
  id: string;
  authorId: string;
  authorName: string | null;
  content: string;
  createdAt: string;
  /** Article slug or post id - used for logging and to avoid repeating a line in one place. */
  context: string;
};

export type Source = {
  name: SourceName;
  /** Newest first, older than the cutoff, not ours, and aimed at us. */
  fetchOpen(db: SupabaseClient, louisId: string, cutoffIso: string, limit: number): Promise<Candidate[]>;
  /** Reply bodies we have already posted in this thread, so one is not reused. */
  bodiesUsedHere(db: SupabaseClient, candidate: Candidate, louisId: string): Promise<string[]>;
  /** Posts the reply. Returns an error message, or null on success. */
  postReply(
    db: SupabaseClient,
    candidate: Candidate,
    body: string,
    louis: { id: string; name: string },
  ): Promise<string | null>;
};

/** Ids of comments that already carry a reply from Louis, for a parent column. */
async function answeredParents(db: SupabaseClient, table: string, parentCol: string, louisId: string) {
  const answered = new Set<string>();
  const { data } = await db.from(table).select(parentCol).eq("user_id", louisId).not(parentCol, "is", null).limit(20000);
  for (const row of data || []) {
    const parent = (row as unknown as Record<string, unknown>)[parentCol];
    if (parent) answered.add(String(parent));
  }
  return answered;
}

// ---------------------------------------------------------------------------
// Study articles: chapters, Bible in One Year days, /bible pages, blog posts
// ---------------------------------------------------------------------------
// No ownership test here. The thing being commented on is a study, not a
// person, so a comment under it is addressed to the study and to Louis.
const articleSource: Source = {
  name: "article",
  async fetchOpen(db, louisId, cutoffIso, limit) {
    const { data } = await db
      .from("article_comments")
      .select("id, article_slug, user_id, user_name, content, created_at")
      .eq("is_deleted", false)
      .is("parent_id", null)
      .neq("user_id", louisId)
      .lte("created_at", cutoffIso)
      .order("created_at", { ascending: false })
      .limit(limit);
    const answered = await answeredParents(db, "article_comments", "parent_id", louisId);
    return (data || [])
      .filter((c) => c.user_id && !answered.has(String(c.id)))
      .map((c) => ({
        source: "article" as const,
        id: String(c.id),
        authorId: String(c.user_id),
        authorName: (c.user_name as string) ?? null,
        content: String(c.content ?? ""),
        createdAt: String(c.created_at),
        context: String(c.article_slug ?? ""),
      }));
  },
  async bodiesUsedHere(db, candidate, louisId) {
    const { data } = await db
      .from("article_comments")
      .select("content")
      .eq("article_slug", candidate.context)
      .eq("user_id", louisId)
      .eq("is_auto", true)
      .limit(100);
    return (data || []).map((r) => String(r.content ?? ""));
  },
  async postReply(db, candidate, body, louis) {
    const { error } = await db.from("article_comments").insert({
      article_slug: candidate.context,
      user_id: louis.id,
      user_name: louis.name,
      content: body,
      parent_id: candidate.id,
      is_auto: true,
    });
    return error?.message ?? null;
  },
};

// ---------------------------------------------------------------------------
// The social feed
// ---------------------------------------------------------------------------
// Only comments on Louis's OWN posts. 53 of the 68 feed comments on record sit
// under other members' posts - those are people talking to each other, and we
// stay out of them.
const feedSource: Source = {
  name: "feed",
  async fetchOpen(db, louisId, cutoffIso, limit) {
    const { data: myPosts } = await db.from("feed_posts").select("id").eq("user_id", louisId).limit(2000);
    const mine = (myPosts || []).map((p) => String(p.id));
    if (mine.length === 0) return [];

    const { data } = await db
      .from("feed_post_comments")
      .select("id, post_id, user_id, content, created_at")
      .is("parent_comment_id", null)
      .in("post_id", mine)
      .neq("user_id", louisId)
      .lte("created_at", cutoffIso)
      .order("created_at", { ascending: false })
      .limit(limit);
    const answered = await answeredParents(db, "feed_post_comments", "parent_comment_id", louisId);
    return (data || [])
      .filter((c) => c.user_id && !answered.has(String(c.id)))
      .map((c) => ({
        source: "feed" as const,
        id: String(c.id),
        authorId: String(c.user_id),
        authorName: null,
        content: String(c.content ?? ""),
        createdAt: String(c.created_at),
        context: String(c.post_id),
      }));
  },
  async bodiesUsedHere(db, candidate, louisId) {
    const { data } = await db
      .from("feed_post_comments")
      .select("content")
      .eq("post_id", candidate.context)
      .eq("user_id", louisId)
      .limit(100);
    return (data || []).map((r) => String(r.content ?? ""));
  },
  async postReply(db, candidate, body, louis) {
    const { error } = await db.from("feed_post_comments").insert({
      post_id: candidate.context,
      user_id: louis.id,
      content: body,
      parent_comment_id: candidate.id,
    });
    return error?.message ?? null;
  },
};

export const SOURCES: Source[] = [articleSource, feedSource];
