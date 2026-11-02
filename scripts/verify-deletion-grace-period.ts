/**
 * Exercises the account-deletion grace period against the real table.
 *
 *   npx tsx scripts/verify-deletion-grace-period.ts
 *
 * Uses throwaway user ids that belong to nobody, so no real account is ever
 * touched, and removes its own rows at the end. What it proves is the part
 * that would be unforgivable to get wrong: that a request is recorded, that
 * it is NOT due for a month, that signing in cancels it, and that a cancelled
 * or already-purged row can never be picked up by the purge cron afterwards.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import fs from "node:fs";
import {
  GRACE_PERIOD_DAYS,
  cancelPendingDeletion,
  dueForPurge,
  markPurgeFailed,
  markPurged,
  purgeDateFrom,
  scheduleAccountDeletion,
} from "../lib/accountDeletionSchedule";

const env = fs.readFileSync(".env.local", "utf8");
const get = (k: string) => (env.match(new RegExp("^" + k + "=(.*)$", "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");
const db: SupabaseClient = createClient(get("NEXT_PUBLIC_SUPABASE_URL")!, get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});

// Fixed ids so a crashed run leaves something findable rather than litter.
const A = "00000000-dead-4000-8000-000000000001";
const B = "00000000-dead-4000-8000-000000000002";

let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

async function cleanup() {
  await db.from("account_deletions").delete().in("user_id", [A, B]);
}

async function main() {
  await cleanup();
  console.log(`\nGRACE PERIOD = ${GRACE_PERIOD_DAYS} days\n`);

  // 1. A request is recorded and dated a month out.
  const sched = await scheduleAccountDeletion(db, { id: A, email: "test-a@example.invalid", displayName: "Test A" });
  check("a deletion request is recorded", sched.ok, sched.ok ? "" : sched.error);
  if (sched.ok) {
    const days = Math.round((new Date(sched.purgeAfter).getTime() - Date.now()) / 86400000);
    check("it is dated 30 days out", days === GRACE_PERIOD_DAYS, `${days} days`);
  }

  // 2. It must not be purgeable today. This is the whole feature.
  let due = await dueForPurge(db, 50);
  check("not due for purge today", !due.some((d) => d.userId === A), `${due.length} due overall`);

  // 3. Asking twice does not create a second row or move the date.
  const again = await scheduleAccountDeletion(db, { id: A, email: "test-a@example.invalid", displayName: "Test A" });
  check("asking twice is harmless", again.ok);
  const { count: rowsForA } = await db
    .from("account_deletions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", A);
  check("still exactly one row", rowsForA === 1, `${rowsForA} rows`);

  // 4. Signing in cancels it.
  const cancelled = await cancelPendingDeletion(db, A);
  check("signing in cancels the deletion", Boolean(cancelled), cancelled ? "" : "returned null");
  const { data: afterCancel } = await db.from("account_deletions").select("status").eq("user_id", A).maybeSingle();
  check("status is cancelled", afterCancel?.status === "cancelled", String(afterCancel?.status));

  // 5. A cancelled account can never be purged later. If this ever fails,
  //    somebody who saved their account loses it a month afterwards.
  due = await dueForPurge(db, 50);
  check("a cancelled row is never due", !due.some((d) => d.userId === A));
  const secondCancel = await cancelPendingDeletion(db, A);
  check("cancelling twice reports nothing pending", secondCancel === null);

  // 6. An overdue row IS picked up.
  const past = new Date(Date.now() - 2 * 86400000).toISOString();
  await db.from("account_deletions").insert({
    user_id: B,
    email: "test-b@example.invalid",
    display_name: "Test B",
    purge_after: past,
    status: "pending",
  });
  due = await dueForPurge(db, 50);
  check("an overdue row is due for purge", due.some((d) => d.userId === B));

  // 7. A failure leaves the row recoverable, not silently finished.
  await markPurgeFailed(db, B, "simulated failure", 1);
  const { data: afterFail } = await db.from("account_deletions").select("status, last_error, attempts").eq("user_id", B).maybeSingle();
  check("one failure stays pending for a retry", afterFail?.status === "pending", String(afterFail?.status));
  check("the error is recorded", String(afterFail?.last_error || "").includes("simulated"));
  await markPurgeFailed(db, B, "simulated failure", 3);
  const { data: afterGiveUp } = await db.from("account_deletions").select("status").eq("user_id", B).maybeSingle();
  check("three failures stop the retries", afterGiveUp?.status === "failed", String(afterGiveUp?.status));

  // 8. Once purged it is never picked up again.
  await db.from("account_deletions").update({ status: "pending" }).eq("user_id", B);
  await markPurged(db, B);
  due = await dueForPurge(db, 50);
  check("a purged row is never due again", !due.some((d) => d.userId === B));

  // 9. Nothing real is sitting in here unnoticed.
  const { data: real } = await db
    .from("account_deletions")
    .select("user_id, status, purge_after")
    .not("user_id", "in", `(${A},${B})`);
  console.log(`\n  real rows in account_deletions: ${(real || []).length}`);
  for (const r of real || []) console.log(`    ${String(r.user_id).slice(0, 8)}  ${r.status}  due ${r.purge_after}`);

  await cleanup();
  const { count: leftover } = await db
    .from("account_deletions")
    .select("*", { count: "exact", head: true })
    .in("user_id", [A, B]);
  check("test rows cleaned up", leftover === 0, `${leftover} left`);

  console.log(`\n${failures === 0 ? "ALL PASS" : `${failures} FAILED`}  (purge date today would be ${purgeDateFrom().toISOString().slice(0, 10)})\n`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch(async (e) => {
  console.error(e);
  await cleanup();
  process.exit(1);
});
