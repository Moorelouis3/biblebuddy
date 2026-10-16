import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { deleteUserAccount, PROTECTED_ACCOUNT_EMAILS } from "@/lib/accountDeletion";
import { sendEmail } from "@/lib/email/sesSender";

// Permanently deletes the signed-in user's account and data.
// Called from Settings -> Delete my account with the user's bearer token.
//
// The deletion itself is thorough - child rows first across every table that
// references the user, then their files, then the login - and on a small
// database that takes minutes. It used to run with the person watching a
// spinner the whole time: Louis measured four. Nobody should sit through that
// to leave, and a reviewer watching a spinner for four minutes reasonably
// concludes the feature is broken.
//
// So the part that matters to them happens immediately - every session is
// revoked, so they are signed out everywhere before this responds - and the
// purge runs on after(), which Next keeps alive past the response. An email
// confirms it when it is done. Nothing about the account is usable in between.

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

  after(async () => {
    const result = await deleteUserAccount(admin, userId);

    if (!result.ok) {
      console.error("[ACCOUNT_DELETE] failed", userId, result.error, result.warnings);
      if (email) {
        await sendEmail({
          to: email,
          transactional: true,
          subject: "We could not finish deleting your Bible Buddy account",
          text:
            "You asked us to delete your Bible Buddy account. You have been signed out and the " +
            "account can no longer be used, but something went wrong while removing the rest of " +
            "your data and we have not finished.\n\n" +
            "We have been alerted and will finish it by hand. If you would like confirmation, or " +
            "you would rather we stopped, reply to this email or write to " +
            "support@mybiblebuddy.net.",
          html:
            "<p>You asked us to delete your Bible Buddy account. You have been signed out and the " +
            "account can no longer be used, but something went wrong while removing the rest of " +
            "your data and we have not finished.</p>" +
            "<p>We have been alerted and will finish it by hand. If you would like confirmation, " +
            "or you would rather we stopped, reply to this email or write to " +
            "<a href=\"mailto:support@mybiblebuddy.net\">support@mybiblebuddy.net</a>.</p>",
          tags: { campaign_id: "account-deleted-failed" },
        }).catch(() => undefined);
      }
      return;
    }

    console.log("[ACCOUNT_DELETE] deleted", userId, result.cleared, result.storageFilesRemoved, result.warnings);

    if (!email) return;
    await sendEmail({
      to: email,
      transactional: true,
      subject: "Your Bible Buddy account has been deleted",
      text:
        "Your Bible Buddy account and everything in it has been deleted. Your reading progress, " +
        "notes, posts and photos are gone, and this is the last email you will get from us.\n\n" +
        "If you ever want to come back, you are welcome to - just sign up again at " +
        "https://www.mybiblebuddy.net. It will be a fresh start rather than your old account; " +
        "there is nothing left to restore.\n\n" +
        "Thank you for the time you spent in the Word with us.",
      html:
        "<p>Your Bible Buddy account and everything in it has been deleted. Your reading progress, " +
        "notes, posts and photos are gone, and this is the last email you will get from us.</p>" +
        "<p>If you ever want to come back, you are welcome to - just " +
        "<a href=\"https://www.mybiblebuddy.net\">sign up again</a>. It will be a fresh start " +
        "rather than your old account; there is nothing left to restore.</p>" +
        "<p>Thank you for the time you spent in the Word with us.</p>",
      tags: { campaign_id: "account-deleted" },
    }).catch(() => undefined);
  });

  return NextResponse.json({ ok: true, background: true }, { status: 202 });
}
