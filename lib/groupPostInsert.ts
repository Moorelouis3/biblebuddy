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

  return insertedPostId;
}
