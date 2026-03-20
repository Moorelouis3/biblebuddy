import type { SupabaseClient } from "@supabase/supabase-js";

export type GroupFeedCarouselQueueItem = {
  id: string;
  group_id: string;
  created_by: string;
  post_style: "cover" | "text";
  title: string | null;
  caption: string | null;
  cover_image_url: string | null;
  scheduled_for: string | null;
  status: "draft" | "scheduled" | "published";
  published_post_id: string | null;
  published_at: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function captionToHtml(caption: string | null | undefined): string {
  const text = (caption || "").trim();
  if (!text) return "<p></p>";

  return text
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

async function resolveDisplayName(supabaseAdmin: SupabaseClient, userId: string) {
  const { data } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.display_name || data?.username || "Louis";
}

export async function publishGroupFeedCarouselItem(
  supabaseAdmin: SupabaseClient,
  item: GroupFeedCarouselQueueItem,
) {
  if (item.published_post_id || item.status === "published") {
    return {
      alreadyPublished: true,
      postId: item.published_post_id,
    };
  }

  const displayName = await resolveDisplayName(supabaseAdmin, item.created_by);
  const contentHtml = captionToHtml(item.caption);

  const { data: insertedPost, error: postError } = await supabaseAdmin
    .from("group_posts")
    .insert({
      group_id: item.group_id,
      user_id: item.created_by,
      display_name: displayName,
      title: item.title?.trim() || null,
      category: "general",
      content: contentHtml,
      media_url: item.post_style === "cover" ? item.cover_image_url : null,
      link_url: null,
    })
    .select("id")
    .single();

  if (postError || !insertedPost) {
    throw new Error(postError?.message || "Could not publish queued carousel post.");
  }

  const publishedAt = new Date().toISOString();
  const { error: updateError } = await supabaseAdmin
    .from("group_feed_carousel_queue")
    .update({
      status: "published",
      published_post_id: insertedPost.id,
      published_at: publishedAt,
      updated_at: publishedAt,
    })
    .eq("id", item.id);

  if (updateError) {
    throw new Error(updateError.message || "Could not update queued carousel post after publishing.");
  }

  return {
    alreadyPublished: false,
    postId: insertedPost.id,
    publishedAt,
  };
}

export async function publishDueGroupFeedCarouselItems(supabaseAdmin: SupabaseClient) {
  const nowIso = new Date().toISOString();
  const { data: dueItems, error } = await supabaseAdmin
    .from("group_feed_carousel_queue")
    .select("id, group_id, created_by, post_style, title, caption, cover_image_url, scheduled_for, status, published_post_id, published_at")
    .eq("status", "scheduled")
    .is("published_post_id", null)
    .lte("scheduled_for", nowIso)
    .order("scheduled_for", { ascending: true })
    .limit(50);

  if (error) {
    throw new Error(error.message || "Could not load scheduled carousel posts.");
  }

  const results: Array<{ id: string; postId: string | null; error?: string }> = [];

  for (const item of dueItems || []) {
    try {
      const result = await publishGroupFeedCarouselItem(
        supabaseAdmin,
        item as GroupFeedCarouselQueueItem,
      );
      results.push({ id: item.id, postId: result.postId || null });
    } catch (publishError) {
      results.push({
        id: item.id,
        postId: null,
        error: publishError instanceof Error ? publishError.message : "Unknown publish error.",
      });
    }
  }

  return {
    processed: results.length,
    published: results.filter((result) => !result.error).length,
    results,
  };
}
