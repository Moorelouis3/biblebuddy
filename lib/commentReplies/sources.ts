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
 * Live surfaces, measured 2026-11-02 over the previous 30 days:
 *
 *   group_posts         382 comments, 369 of them on Louis's own posts
 *   article_comments    631 comments (bible-chapter, bible-in-one-year, /bible)
 *   feed_post_comments   65 comments, only 15 on Louis's own posts
 *
 * group_series_post_comments and series_reflections both had zero: the study
 * groups are closed, so they are deliberately not wired up.
 */

export type SourceName = "article" | "feed" | "group";

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

// ---------------------------------------------------------------------------
// The group feed on the dashboard
// ---------------------------------------------------------------------------
// group_posts is one table holding both posts and their replies, nested through
// parent_post_id. Two conditions, and both matter:
//
//   * the parent must be a ROOT post (parent_post_id is null), so this is a
//     comment on a post rather than a reply to somebody else's comment;
//   * that root post must be Louis's.
//
// Together they mean we only ever answer someone who commented on Louis's own
// post. A reply underneath another member's comment is two people talking, and
// it is skipped before it is even read.
const groupSource: Source = {
  name: "group",
  async fetchOpen(db, louisId, cutoffIso, limit) {
    const { data: myRoots } = await db
      .from("group_posts")
      .select("id")
      .eq("user_id", louisId)
      .is("parent_post_id", null)
      .limit(2000);
    const roots = new Set((myRoots || []).map((p) => String(p.id)));
    if (roots.size === 0) return [];

    const { data } = await db
      .from("group_posts")
      .select("id, group_id, user_id, display_name, content, parent_post_id, created_at")
      .not("parent_post_id", "is", null)
      .neq("user_id", louisId)
      .lte("created_at", cutoffIso)
      .order("created_at", { ascending: false })
      .limit(limit);
    const answered = await answeredParents(db, "group_posts", "parent_post_id", louisId);
    return (data || [])
      .filter((c) => c.user_id && roots.has(String(c.parent_post_id)) && !answered.has(String(c.id)))
      .map((c) => ({
        source: "group" as const,
        id: String(c.id),
        authorId: String(c.user_id),
        authorName: (c.display_name as string) ?? null,
        content: String(c.content ?? ""),
        createdAt: String(c.created_at),
        // The root post, so a line is not repeated under one post - and the
        // group id travels with it, since a reply row needs it.
        context: `${c.group_id}:${c.parent_post_id}`,
      }));
  },
  async bodiesUsedHere(db, candidate, louisId) {
    const [, rootId] = candidate.context.split(":");
    const { data } = await db
      .from("group_posts")
      .select("content")
      .eq("parent_post_id", rootId)
      .eq("user_id", louisId)
      .limit(100);
    return (data || []).map((r) => String(r.content ?? ""));
  },
  async postReply(db, candidate, body, louis) {
    const [groupId] = candidate.context.split(":");
    const { error } = await db.from("group_posts").insert({
      group_id: groupId,
      user_id: louis.id,
      display_name: louis.name,
      content: body,
      // Hangs off the COMMENT, which is what makes it read as an answer to
      // that person rather than another comment on the post.
      parent_post_id: candidate.id,
    });
    return error?.message ?? null;
  },
};

export const SOURCES: Source[] = [articleSource, feedSource, groupSource];
