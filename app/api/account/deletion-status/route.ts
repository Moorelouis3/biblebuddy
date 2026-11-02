import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cancelPendingDeletion, formatPurgeDate } from "@/lib/accountDeletionSchedule";
import { sendEmail } from "@/lib/email/sesSender";

/**
 * "You came back, so we kept it."
 *
 * Called once by AppShell when a signed-in session starts. For essentially
 * everyone it finds nothing and returns `{ pending: false }` - that is the
 * common path and it is one indexed lookup.
 *
 * For someone who asked to delete and then signed in again inside the 30 day
 * grace period, it cancels the deletion and says so, and AppShell shows them
 * a note. Signing back in IS the cancel: they had to type their password to
 * get here, which is a clearer signal than any button, and the alternative -
 * leaving a live session attached to an account still queued for destruction -
 * is the worse half-state.
 *
 * AppShell is the hook rather than the login page because there are several
 * ways in: the login form, native Apple and Google sign-in, and the OAuth
 * callback. AppShell runs for all of them.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!token) return NextResponse.json({ pending: false });

  const auth = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await auth.auth.getUser(token);
  const user = data?.user;
  if (error || !user) return NextResponse.json({ pending: false });

  const admin: SupabaseClient = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const cancelled = await cancelPendingDeletion(admin, user.id);
  if (!cancelled) return NextResponse.json({ pending: false });

  const when = formatPurgeDate(cancelled.purgeAfter);
  console.log("[ACCOUNT_DELETE] cancelled by sign-in", user.id, "was due", cancelled.purgeAfter);

  after(async () => {
    const email = cancelled.email || user.email;
    if (!email) return;
    // They asked for deletion and it is no longer happening. That is worth an
    // email on its own - if it was not them who signed in, this is how they
    // find out.
    await sendEmail({
      to: email,
      transactional: true,
      subject: "Your Bible Buddy account is no longer being deleted",
      text:
        `You signed in again, so we have cancelled the deletion. Your account and everything in ` +
        `it - your reading progress, notes, posts and photos - is exactly as you left it.\n\n` +
        `It would have been permanently deleted on ${when}. Nothing was lost.\n\n` +
        `If this was not you, change your password at https://www.mybiblebuddy.net and write to ` +
        `support@mybiblebuddy.net.`,
      html:
        `<p>You signed in again, so we have cancelled the deletion. Your account and everything ` +
        `in it - your reading progress, notes, posts and photos - is exactly as you left it.</p>` +
        `<p>It would have been permanently deleted on ${when}. Nothing was lost.</p>` +
        `<p>If this was not you, <a href="https://www.mybiblebuddy.net">change your password</a> ` +
        `and write to <a href="mailto:support@mybiblebuddy.net">support@mybiblebuddy.net</a>.</p>`,
      tags: { campaign_id: "account-deletion-cancelled" },
    }).catch(() => undefined);
  });

  return NextResponse.json({
    pending: true,
    cancelled: true,
    wouldHaveBeenDeletedOn: when,
    requestedAt: cancelled.requestedAt,
  });
}
