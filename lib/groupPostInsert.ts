import type { SupabaseClient } from "@supabase/supabase-js";

function isStatementTimeoutError(message: string | null | undefined) {
  return typeof message === "string" && message.toLowerCase().includes("statement timeout");
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function insertGroupPostWithRetry(
  supabaseAdmin: SupabaseClient,
  payload: {
    id?: string;
    group_id: string;
    user_id: string;
    display_name: string;
    title: string | null;
    category: string;
    content: string;
    media_url?: string | null;
    link_url?: string | null;
  },
  options: {
    skipInsertNotifications?: boolean;
  } = {},
) {
  const postId = payload.id || crypto.randomUUID();
  let insertedPostId: string | null = null;
  let postErrorMessage: string | null = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { data: insertedPost, error: postError } = await supabaseAdmin
      .from("group_posts")
      .insert({
        id: postId,
        ...payload,
        // Recurring auto-posts do not need insert-time fanout notifications.
        // Using a temporary self-parent skips the root-post insert triggers,
        // then we immediately normalize it back to a root post after insert.
        parent_post_id: options.skipInsertNotifications ? postId : null,
      })
      .select("id")
      .single();

    if (!postError && insertedPost?.id) {
      if (options.skipInsertNotifications) {
        const { error: normalizeError } = await supabaseAdmin
          .from("group_posts")
          .update({ parent_post_id: null })
          .eq("id", postId);

        if (normalizeError) {
          postErrorMessage = normalizeError.message || "Could not normalize recurring group post.";
          break;
        }
      }

      insertedPostId = insertedPost.id;
      postErrorMessage = null;
      break;
    }

    postErrorMessage = postError?.message || "Could not create recurring group post.";

    const { data: existingPost } = await supabaseAdmin
      .from("group_posts")
      .select("id")
      .eq("id", postId)
      .maybeSingle();

    if (existingPost?.id) {
      insertedPostId = existingPost.id;
      postErrorMessage = null;
      break;
    }

    if (!isStatementTimeoutError(postErrorMessage) || attempt === 2) {
      break;
    }

    await delay(250 * (attempt + 1));
  }

  if (!insertedPostId || postErrorMessage) {
    throw new Error(
      isStatementTimeoutError(postErrorMessage)
        ? "Recurring post publish timed out while notifying the group."
        : (postErrorMessage || "Could not create recurring group post."),
    );
  }

  /**
   * And into the feed, which is the only place anybody looks now.
   *
   * Louis, 2026-10-18: "the group is gone, everything posts to the
   * community." Every automatic post Bible Buddy writes - the weekly trivia,
   * the poll, the question, the series, the blog post, the verse discussion -
   * comes through this one function, so mirroring here puts all of it in the
   * feed without rewriting eight crons.
   *
   * A real feed post, not a pointer: it carries its own replies and likes in
   * feed_post_comments and feed_post_reactions, so tapping one stays in the
   * feed instead of bouncing out to a group page that is no longer part of
   * the app.
   *
   * The group row is still written above, because the group's own machinery -
   * weekly series bookkeeping, moderation, the broadcast queue - keys off it.
   * That is storage now, not a destination.
   *
   * Best effort on purpose. A missing mirror costs one post in the feed; a
   * throw here would fail the cron that was publishing it.
   */
  try {
    await supabaseAdmin.from("feed_posts").insert({
      user_id: payload.user_id,
      post_type: payload.media_url ? "photo" : "thought",
      content: payload.content,
      media_url: payload.media_url ?? null,
      link_url: payload.link_url ?? null,
      visibility: "community",
      reaction_counts: {},
      comment_count: 0,
    });
  } catch {
    // The group post is already in; the feed copy is the optional half.
  }

  return insertedPostId;
}
