import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { deleteUserAccount, PROTECTED_ACCOUNT_EMAILS } from "@/lib/accountDeletion";

// Permanently deletes the signed-in user's account and data.
// Called from Settings -> Delete my account with the user's bearer token.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  const result = await deleteUserAccount(admin, user.id);

  if (!result.ok) {
    console.error("[ACCOUNT_DELETE] failed", user.id, result.error, result.warnings);
    return NextResponse.json(
      { error: "We couldn't delete your account right now. Please try again or email support@mybiblebuddy.net." },
      { status: 500 }
    );
  }

  console.log("[ACCOUNT_DELETE] deleted", user.id, result.cleared, result.storageFilesRemoved, result.warnings);
  return NextResponse.json({ ok: true });
}
