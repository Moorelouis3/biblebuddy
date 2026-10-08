import { createHmac } from "crypto";

/**
 * The one correct way to build an unsubscribe link (2026-10-08).
 *
 * There were two, and they did not agree. `lib/blogBroadcast.ts` signs with
 * `CRON_SECRET || SUPABASE_SERVICE_ROLE_KEY || "bb"` and points at
 * `/unsubscribe?email=…&t=…`, while `app/api/email/unsubscribe/route.ts`
 * verifies with `EMAIL_LINK_SECRET` and reads `?e=…&t=…`. Different secret,
 * different parameter name, different path - so a link made by one could never
 * be validated by the other.
 *
 * This matches the API route, which is the one that actually writes to
 * email_suppressions. The literal `"bb"` fallback in the other generator is
 * also worth avoiding: if both env vars were ever missing, every unsubscribe
 * token in the world would be forgeable.
 *
 * EMAIL_LINK_SECRET must be set. Without it the route rejects every token, so
 * unsubscribe links silently stop working - which is a legal problem, not just
 * a broken button.
 */

const SITE_URL = "https://www.mybiblebuddy.net";

export function unsubscribeToken(email: string) {
  const secret = process.env.EMAIL_LINK_SECRET;
  if (!secret) throw new Error("EMAIL_LINK_SECRET is required to sign unsubscribe links.");
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

export function unsubscribeUrl(email: string) {
  const address = email.trim().toLowerCase();
  const params = new URLSearchParams({ e: address, t: unsubscribeToken(address) });
  return `${SITE_URL}/api/email/unsubscribe?${params.toString()}`;
}
