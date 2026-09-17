import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { drainGroupPostBroadcasts } from "@/lib/groupPostBroadcast";

// Safety net for group post notifications: posts made by crons (weekly
// series, blog shares) or a post whose immediate send was cut short still get
// their notifications out within a few minutes.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  try {
    const results = await drainGroupPostBroadcasts(admin, 50_000);
    return NextResponse.json({ ok: true, results });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "failed" }, { status: 500 });
  }
}
