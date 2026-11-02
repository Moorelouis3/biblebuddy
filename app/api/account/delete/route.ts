import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PROTECTED_ACCOUNT_EMAILS } from "@/lib/accountDeletion";
import { formatPurgeDate, scheduleAccountDeletion } from "@/lib/accountDeletionSchedule";
import { sendEmail } from "@/lib/email/sesSender";

// Schedules deletion of the signed-in user's account and data.
// Called from Settings -> Delete my account with the user's bearer token.
//
// What the person experiences is unchanged: every session is revoked before
// this responds, so they are signed out everywhere and the account cannot be
// used from the moment they ask.
//
// What changed on 2026-11-02 is what happens next. This used to run the full
// wipe straight away on after(). It is now recorded in account_deletions and
// purged by /api/cron/purge-deleted-accounts once the 30 day grace period is
// up, so signing in again before then simply cancels it.
//
// The reason is a real case: Jessica had used the app since 2025-12-06,
// deleted her account, and signed up again days later on the same email.
// Eleven months of reading history. Supabase keeps 7 daily backups; she was
// outside the window, and neither the live database nor the oldest backup had
// anything left. Nothing could be given back. See
// lib/accountDeletionSchedule.ts.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!token) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });

  const auth = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await auth.auth.getUser(token);
  const user = data?.user;
  if (error || !user) {
    return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  }

  if (PROTECTED_ACCOUNT_EMAILS.includes((user.email || "").toLowerCase())) {
    return NextResponse.json({ error: "This account cannot be deleted from the app." }, { status: 403 });
  }

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  // The email has to be read now - in a few seconds there will be no user row
  // to read it from.
  const email = (user.email || "").trim();
  const userId = user.id;

  // Signed out everywhere, on every device, before this responds. From here
  // the account cannot be used, whatever happens to the purge below.
  try {
    await admin.auth.admin.signOut(token, "global");
  } catch (signOutError) {
    // Not fatal: deleting the login shortly ends every session anyway.
    console.warn("[ACCOUNT_DELETE] could not revoke sessions", userId, signOutError);
  }

  // Their display name, read now for the same reason as the email: so the
  // record stands on its own once the auth user is gone.
  const { data: profile } = await admin
    .from("profile_stats")
    .select("display_name")
    .eq("user_id", userId)
    .maybeSingle();

  const scheduled = await scheduleAccountDeletion(admin, {
    id: userId,
    email: email || null,
    displayName: (profile?.display_name as string) ?? null,
  });

  if (!scheduled.ok) {
    // Could not record it. Say so rather than silently doing nothing - and do
    // NOT fall back to the old immediate wipe, because an unrecorded hard
    // delete is exactly the hole this replaced.
    console.error("[ACCOUNT_DELETE] could not schedule", userId, scheduled.error);
    return NextResponse.json(
      { error: "We could not process that just now. Please try again, or write to support@mybiblebuddy.net." },
      { status: 500 },
    );
  }

  const when = formatPurgeDate(scheduled.purgeAfter);
  console.log("[ACCOUNT_DELETE] scheduled", userId, "purge after", scheduled.purgeAfter);

  after(async () => {
    if (!email) return;
    await sendEmail({
      to: email,
      transactional: true,
      subject: "Your Bible Buddy account is scheduled for deletion",
      text:
        `You asked us to delete your Bible Buddy account. You have been signed out everywhere and ` +
        `the account can no longer be used.\n\n` +
        `Everything in it will be permanently deleted on ${when} - your reading progress, notes, ` +
        `posts and photos. After that it cannot be recovered by us or by anyone else.\n\n` +
        `Changed your mind? Sign in again before ${when} at https://www.mybiblebuddy.net and your ` +
        `account carries on exactly as it was. Nothing has been lost yet.\n\n` +
        `Thank you for the time you spent in the Word with us.`,
      html:
        `<p>You asked us to delete your Bible Buddy account. You have been signed out everywhere ` +
        `and the account can no longer be used.</p>` +
        `<p>Everything in it will be <strong>permanently deleted on ${when}</strong> - your reading ` +
        `progress, notes, posts and photos. After that it cannot be recovered by us or by anyone ` +
        `else.</p>` +
        `<p>Changed your mind? <a href="https://www.mybiblebuddy.net">Sign in again</a> before ` +
        `${when} and your account carries on exactly as it was. Nothing has been lost yet.</p>` +
        `<p>Thank you for the time you spent in the Word with us.</p>`,
      tags: { campaign_id: "account-deletion-scheduled" },
    }).catch(() => undefined);
  });

  return NextResponse.json({ ok: true, scheduled: true, purgeAfter: scheduled.purgeAfter, purgeDate: when }, { status: 202 });
}
