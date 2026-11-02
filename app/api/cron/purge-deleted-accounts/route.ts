import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { deleteUserAccount } from "@/lib/accountDeletion";
import { dueForPurge, markPurgeFailed, markPurged } from "@/lib/accountDeletionSchedule";
import { sendEmail } from "@/lib/email/sesSender";

/**
 * Finishes the deletions whose 30 day grace period has run out.
 *
 * /api/account/delete records the request and signs the person out; this is
 * what actually calls deleteUserAccount and wipes the roughly 60 tables. By
 * the time a row reaches here it has been unusable for a month and the user
 * has had a dated email telling them when it would happen.
 *
 * Deliberately small batches. The wipe takes minutes per account on this
 * database - Louis measured four when it ran inline - and a cron that tries
 * twenty at once would time out halfway through the eleventh and leave it
 * half deleted. Three an hour clears any realistic backlog.
 *
 * A failure is left as a failure. The row goes back to pending for two more
 * attempts and then to `failed`, and the data stays where it is. Half-deleted
 * and silently marked done is the one outcome worse than not deleting.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_PER_RUN = 3;

export async function GET(request: NextRequest) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "Server not configured." }, { status: 500 });

  const admin: SupabaseClient = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const dryRun = request.nextUrl.searchParams.get("dryRun") === "1";
  const due = await dueForPurge(admin, MAX_PER_RUN);

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      due: due.length,
      wouldPurge: due.map((d) => ({ user: d.userId.slice(0, 8), requested: d.requestedAt, dueSince: d.purgeAfter })),
    });
  }

  let purged = 0;
  const failures: string[] = [];

  for (const row of due) {
    let result;
    try {
      result = await deleteUserAccount(admin, row.userId);
    } catch (e) {
      result = { ok: false as const, error: e instanceof Error ? e.message : "threw", cleared: {}, warnings: [], storageFilesRemoved: 0 };
    }

    if (!result.ok) {
      failures.push(`${row.userId.slice(0, 8)}: ${result.error ?? "failed"}`);
      console.error("[PURGE] failed", row.userId, result.error, result.warnings);
      // attempts is incremented here rather than read-modify-written, because
      // this row is only ever touched by this single cron.
      await markPurgeFailed(admin, row.userId, result.error ?? "failed", 1);
      continue;
    }

    await markPurged(admin, row.userId);
    purged += 1;
    console.log("[PURGE] done", row.userId, result.cleared, result.storageFilesRemoved);

    if (!row.email) continue;
    await sendEmail({
      to: row.email,
      transactional: true,
      subject: "Your Bible Buddy account has been deleted",
      text:
        "The 30 days are up, and your Bible Buddy account and everything in it has now been " +
        "deleted. Your reading progress, notes, posts and photos are gone, and this is the last " +
        "email you will get from us.\n\n" +
        "If you ever want to come back you are welcome to - just sign up again at " +
        "https://www.mybiblebuddy.net. It will be a fresh start rather than your old account; " +
        "there is nothing left to restore.\n\n" +
        "Thank you for the time you spent in the Word with us.",
      html:
        "<p>The 30 days are up, and your Bible Buddy account and everything in it has now been " +
        "deleted. Your reading progress, notes, posts and photos are gone, and this is the last " +
        "email you will get from us.</p>" +
        "<p>If you ever want to come back you are welcome to - just " +
        '<a href="https://www.mybiblebuddy.net">sign up again</a>. It will be a fresh start ' +
        "rather than your old account; there is nothing left to restore.</p>" +
        "<p>Thank you for the time you spent in the Word with us.</p>",
      tags: { campaign_id: "account-deleted" },
    }).catch(() => undefined);
  }

  return NextResponse.json({ ok: true, due: due.length, purged, failures: failures.slice(0, 5) });
}
