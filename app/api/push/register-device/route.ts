import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Store an APNs/FCM device token for the signed-in reader (2026-10-11).
 *
 * The browser cannot write native_push_tokens itself - the table is service
 * role only, because a device token is enough to send someone a
 * notification and nothing client-side should be able to read the list.
 *
 * Identity comes from the caller's own access token, never from the body. A
 * route that accepted a user id as JSON would let anyone register a token
 * against anyone else's account and receive their notifications.
 */

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !service) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const accessToken = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!accessToken) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const auth = createClient(url, anon, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: user, error: authError } = await auth.auth.getUser(accessToken);
  if (authError || !user.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token.trim() : "";
  const platform = body?.platform === "ios" || body?.platform === "android" ? body.platform : null;
  if (!token || !platform) {
    return NextResponse.json({ error: "token and platform are required." }, { status: 400 });
  }
  // APNs tokens are 64 hex characters; FCM's are longer and mixed. A loose
  // ceiling keeps junk out of a primary key without guessing at formats.
  if (token.length > 512) {
    return NextResponse.json({ error: "That token is not a device token." }, { status: 400 });
  }

  const db = createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });

  // The token is the primary key, so re-registering the same device updates
  // it rather than adding a row. A phone handed to someone else re-points
  // the token at the new account, which is the behaviour you want.
  const { error } = await db.from("native_push_tokens").upsert(
    {
      token,
      user_id: user.user.id,
      platform,
      last_seen_at: new Date().toISOString(),
    },
    { onConflict: "token" },
  );

  if (error) {
    if (/does not exist|schema cache/i.test(error.message)) {
      return NextResponse.json({ ok: false, error: "native_push_tokens table not created yet." }, { status: 503 });
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
