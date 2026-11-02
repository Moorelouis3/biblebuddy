// No `server-only` here, matching ./accountDeletion.ts: both are reached only
// from API routes, and the guard would stop scripts/verify-deletion-grace-period.ts
// from exercising these functions for real.
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * The 30 day grace period in front of account deletion.
 *
 * `deleteUserAccount` in ./accountDeletion.ts is unchanged and still does the
 * real work - roughly 60 tables, then the auth user. What changed on
 * 2026-11-02 is when it runs: asking to delete now writes a row here, and a
 * cron calls the wipe once the grace period is up.
 *
 * Why: the old flow was instant and irreversible, and Supabase keeps only 7
 * daily backups. Jessica had eleven months of reading history, deleted her
 * account, and signed up again days later. Both the live database and the
 * oldest backup were checked and there was nothing to give back. A grace
 * period makes that a one-line fix instead of an apology.
 *
 * From the user's side nothing is slower: they are signed out of every device
 * before the request returns, exactly as before, so the account is unusable
 * the moment they ask. The only difference is that signing in again inside 30
 * days puts it all back.
 */

export const GRACE_PERIOD_DAYS = 30;

export type PendingDeletion = {
  userId: string;
  email: string | null;
  displayName: string | null;
  requestedAt: string;
  purgeAfter: string;
};

export function purgeDateFrom(now = new Date()) {
  return new Date(now.getTime() + GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000);
}

/** Human-friendly, for the email and the "we kept it" screen. */
export function formatPurgeDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Records the request. Returns the date the purge becomes due.
 *
 * Upserts rather than inserts: asking twice should move nothing, not error.
 * A row that was previously cancelled is reopened, since this is a fresh
 * request.
 */
export async function scheduleAccountDeletion(
  admin: SupabaseClient,
  user: { id: string; email: string | null; displayName: string | null },
): Promise<{ ok: true; purgeAfter: string } | { ok: false; error: string }> {
  const purgeAfter = purgeDateFrom().toISOString();
  const now = new Date().toISOString();

  const { error } = await admin.from("account_deletions").upsert(
    {
      user_id: user.id,
      email: user.email,
      display_name: user.displayName,
      requested_at: now,
      purge_after: purgeAfter,
      status: "pending",
      cancelled_at: null,
      purged_at: null,
      last_error: null,
      updated_at: now,
    },
    { onConflict: "user_id" },
  );

  if (error) return { ok: false, error: error.message };
  return { ok: true, purgeAfter };
}

/**
 * Called when a user turns up again. If they had a deletion pending it is
 * cancelled and their account carries on untouched.
 *
 * Returns the row that was cancelled, so the caller can tell them, or null if
 * there was nothing pending - which is the case for essentially every sign-in,
 * so this has to be cheap and silent.
 */
export async function cancelPendingDeletion(
  admin: SupabaseClient,
  userId: string,
): Promise<PendingDeletion | null> {
  const { data, error } = await admin
    .from("account_deletions")
    .select("user_id, email, display_name, requested_at, purge_after")
    .eq("user_id", userId)
    .eq("status", "pending")
    .maybeSingle();

  if (error || !data) return null;

  const { error: updateError } = await admin
    .from("account_deletions")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("status", "pending");

  // If the update lost a race with the purge cron, say nothing happened
  // rather than telling someone their account is safe when it is not.
  if (updateError) return null;

  return {
    userId: data.user_id as string,
    email: (data.email as string) ?? null,
    displayName: (data.display_name as string) ?? null,
    requestedAt: data.requested_at as string,
    purgeAfter: data.purge_after as string,
  };
}

/** Everything whose grace period has run out. */
export async function dueForPurge(admin: SupabaseClient, limit = 25): Promise<PendingDeletion[]> {
  const { data, error } = await admin
    .from("account_deletions")
    .select("user_id, email, display_name, requested_at, purge_after")
    .eq("status", "pending")
    .lte("purge_after", new Date().toISOString())
    .order("purge_after", { ascending: true })
    .limit(limit);

  if (error || !data) return [];
  return data.map((r) => ({
    userId: r.user_id as string,
    email: (r.email as string) ?? null,
    displayName: (r.display_name as string) ?? null,
    requestedAt: r.requested_at as string,
    purgeAfter: r.purge_after as string,
  }));
}

export async function markPurged(admin: SupabaseClient, userId: string) {
  const now = new Date().toISOString();
  await admin
    .from("account_deletions")
    .update({ status: "purged", purged_at: now, updated_at: now, last_error: null })
    .eq("user_id", userId);
}

/**
 * Left as `failed`, not retried forever and not quietly marked done. The data
 * is still there, which is the safe end of the two - someone can finish it by
 * hand, and nobody has been told their account is gone when it is not.
 */
export async function markPurgeFailed(admin: SupabaseClient, userId: string, message: string, attempts: number) {
  const now = new Date().toISOString();
  await admin
    .from("account_deletions")
    .update({
      status: attempts >= 3 ? "failed" : "pending",
      last_error: message.slice(0, 500),
      attempts,
      updated_at: now,
    })
    .eq("user_id", userId);
}
