import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Sends queued "Louis posted in the group" notifications in small batches
 * (2026-09-17). The group_posts trigger used to write ~6,000 notifications
 * inside the post insert, which blew PostgREST's 8s statement limit and threw
 * the post away. The trigger now only queues it; this drains the queue. Called
 * right after a post is created and by /api/cron/group-post-broadcasts.
 */
export async function drainGroupPostBroadcasts(admin: SupabaseClient, budgetMs = 50_000) {
  const startedAt = Date.now();
  const { data: pending, error } = await admin
    .from("group_post_broadcast_queue")
    .select("post_id")
    .is("processed_at", null)
    .order("created_at", { ascending: true })
    .limit(10);
  if (error) throw new Error(error.message);

  const results: Array<{ postId: string; sent: number; done: boolean }> = [];
  for (const row of pending || []) {
    let sent = 0;
    let done = false;
    while (Date.now() - startedAt < budgetMs) {
      const { data, error: rpcError } = await admin.rpc("process_group_post_broadcast", {
        p_post_id: row.post_id,
        p_batch: 400,
      });
      if (rpcError) throw new Error(rpcError.message);
      const count = Number(data) || 0;
      if (count === 0) {
        done = true;
        break;
      }
      sent += count;
    }
    results.push({ postId: row.post_id, sent, done });
    if (!done) break;
  }
  return results;
}
