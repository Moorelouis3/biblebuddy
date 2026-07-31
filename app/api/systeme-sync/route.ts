import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 10;

// Adds a new Bible Buddy signup to the Systeme.io email list so the same
// list that already has ~1,700 biblestudywithlouis.com subscribers becomes
// the real Bible Buddy list going forward - fired non-blocking from the
// signup page, same pattern as /api/send-welcome-dm. A failure here should
// never affect account creation.
export async function POST(request: NextRequest) {
  let email: string | undefined;
  let firstName: string | undefined;
  let userId: string | undefined;

  try {
    const body = await request.json();
    email = body.email;
    firstName = body.firstName;
    userId = body.userId;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "email is required." }, { status: 400 });
  }

  const apiKey = process.env.SYSTEME_API_KEY;
  if (!apiKey) {
    console.error("[SYSTEME_SYNC] SYSTEME_API_KEY not configured.");
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.systeme.io/api/contacts", {
      method: "POST",
      headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        fields: firstName ? [{ slug: "first_name", value: firstName }] : [],
      }),
    });

    // 422 with "already exists" is fine - they're already on the list.
    if (!res.ok && res.status !== 422) {
      const detail = await res.text();
      console.error("[SYSTEME_SYNC] Failed to add contact:", res.status, detail);
      return NextResponse.json({ error: "Systeme.io sync failed." }, { status: 502 });
    }

    // Initialize email funnel state if userId is provided
    if (userId) {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (supabaseUrl && serviceKey) {
          const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
            auth: { autoRefreshToken: false, persistSession: false },
          });

          await supabaseAdmin.from("email_funnel_state").upsert(
            {
              user_id: userId,
              signup_timestamp: new Date().toISOString(),
            },
            { onConflict: "user_id" },
          );
        }
      } catch (funnelError) {
        console.error("[SYSTEME_SYNC] Error initializing funnel state:", funnelError);
        // Non-blocking error - don't fail the signup
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[SYSTEME_SYNC] Request error:", err);
    return NextResponse.json({ error: "Systeme.io request failed." }, { status: 500 });
  }
}
