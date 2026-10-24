import { NextResponse } from "next/server";
import { apnsConfigured } from "@/lib/apnsSender";

/**
 * Can this server actually send a notification to an iPhone?
 *
 * Getting permission is only half of it. The other half is APNS_KEY_ID,
 * APNS_TEAM_ID and APNS_PRIVATE_KEY existing in the environment -
 * /api/push/process silently skips every device token without them, which
 * looks exactly like notifications not working (Louis, 2026-10-24, after a
 * fortnight of exactly that kind of invisible failure).
 *
 * A boolean, never the values. Nothing here is a secret: it says whether
 * three environment variables are set, not what they are.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { apns: apnsConfigured() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
