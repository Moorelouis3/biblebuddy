import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Pre-built admin analytics (2026-09-15). Computing /admin/analytics live
 * takes 20-40s (longer for All Time), so /api/cron/analytics-snapshots builds
 * each timeframe in the background and saves the JSON here; the page reads
 * the saved copy instantly. The refresh button still asks for live numbers.
 *
 * Stored as files in a private Storage bucket, not a table: a single
 * timeframe is ~2 MB of JSON.
 */

const BUCKET = "admin-analytics";

/** Older than this and the API computes live instead (the cron has stalled). */
export const SNAPSHOT_MAX_AGE_MS = 6 * 60 * 60 * 1000;

const pathFor = (key: string) => `snapshots/${key.replace(/[^a-z0-9_-]/gi, "-")}.json`;

export async function readAnalyticsSnapshot(admin: SupabaseClient, key: string) {
  try {
    const { data, error } = await admin.storage.from(BUCKET).download(pathFor(key));
    if (error || !data) return null;
    const body = JSON.parse(await data.text()) as Record<string, unknown>;
    const snapshotAt = typeof body.snapshotAt === "string" ? body.snapshotAt : null;
    if (!snapshotAt || Date.now() - new Date(snapshotAt).getTime() > SNAPSHOT_MAX_AGE_MS) return null;
    return body;
  } catch {
    return null;
  }
}

export async function writeAnalyticsSnapshot(admin: SupabaseClient, key: string, body: Record<string, unknown>) {
  const file = JSON.stringify(body);
  const upload = () =>
    admin.storage.from(BUCKET).upload(pathFor(key), file, { contentType: "application/json", upsert: true });
  let { error } = await upload();
  if (error && /bucket not found|not found/i.test(error.message)) {
    await admin.storage.createBucket(BUCKET, { public: false });
    ({ error } = await upload());
  }
  if (error) console.error("[ANALYTICS_SNAPSHOT] save failed:", key, error.message);
}
