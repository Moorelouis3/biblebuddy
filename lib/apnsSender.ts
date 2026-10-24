import { createSign } from "crypto";

/**
 * Send a push to an iPhone (Louis, 2026-10-17: "I don't get notifications when
 * I get a new DM").
 *
 * He was right, and the reason was simple: nothing in this codebase ever
 * talked to Apple. /api/push/process sends web push, which reaches browsers.
 * The store app has no browser push - iOS delivers through APNs - so
 * native_push_tokens collected device tokens that nothing ever read.
 *
 * Token-based authentication, so there is no certificate to renew: a short
 * ES256 JWT signed with the .p8 key from the developer account, reused for an
 * hour (Apple rejects a token refreshed more often than every 20 minutes, and
 * expects a new one at least once a day).
 *
 * No dependency. Apple's API is an HTTP/2 POST and node's fetch does it.
 *
 * Needs three values in the environment:
 *   APNS_KEY_ID     the ten characters Apple shows beside the key
 *   APNS_TEAM_ID    Q8TDSF2RP2
 *   APNS_PRIVATE_KEY  the contents of AuthKey_XXXXXXXXXX.p8, newlines and all
 */

const APNS_HOST = "https://api.push.apple.com";
const BUNDLE_ID = "net.mybiblebuddy.app";
/** Apple refuses a token minted more often than every 20 minutes. */
const TOKEN_TTL_MS = 50 * 60 * 1000;

let cachedToken: { value: string; madeAt: number } | null = null;

export function apnsConfigured(): boolean {
  return Boolean(process.env.APNS_KEY_ID && process.env.APNS_TEAM_ID && process.env.APNS_PRIVATE_KEY);
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function authToken(): string {
  if (cachedToken && Date.now() - cachedToken.madeAt < TOKEN_TTL_MS) return cachedToken.value;

  const keyId = process.env.APNS_KEY_ID!;
  const teamId = process.env.APNS_TEAM_ID!;
  // Vercel's environment strips real newlines, so the key is usually stored
  // with \n written out. Accept both.
  const privateKey = process.env.APNS_PRIVATE_KEY!.replace(/\\n/g, "\n");

  const header = base64url(JSON.stringify({ alg: "ES256", kid: keyId }));
  const claims = base64url(JSON.stringify({ iss: teamId, iat: Math.floor(Date.now() / 1000) }));
  const signer = createSign("SHA256");
  signer.update(`${header}.${claims}`);
  const signature = base64url(signer.sign({ key: privateKey, dsaEncoding: "ieee-p1363" }));

  const value = `${header}.${claims}.${signature}`;
  cachedToken = { value, madeAt: Date.now() };
  return value;
}

export type ApnsResult = {
  sent: number;
  /** Tokens Apple says are dead. The caller deletes these rows. */
  dead: string[];
  lastError: string | null;
};

/**
 * Deliver one notification to every device a reader has.
 *
 * `url` rides along as custom data so tapping the notification opens the right
 * page - the app reads it in the pushNotificationActionPerformed listener.
 */
export async function sendApnsPush(
  deviceTokens: string[],
  notification: { title: string; body: string; url?: string | null; badge?: number },
): Promise<ApnsResult> {
  const result: ApnsResult = { sent: 0, dead: [], lastError: null };
  if (!apnsConfigured() || deviceTokens.length === 0) return result;

  const payload = JSON.stringify({
    aps: {
      alert: { title: notification.title, body: notification.body },
      sound: "default",
      ...(typeof notification.badge === "number" ? { badge: notification.badge } : {}),
    },
    url: notification.url || "/dashboard",
  });

  const token = authToken();

  for (const deviceToken of deviceTokens) {
    try {
      const response = await fetch(`${APNS_HOST}/3/device/${deviceToken}`, {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
          "apns-topic": BUNDLE_ID,
          "apns-push-type": "alert",
          // 10 is "deliver now", which is what a message is.
          "apns-priority": "10",
          /**
           * Store it and keep trying for a day (Louis, 2026-10-24).
           *
           * Omitting this means an expiry of 0, and Apple's rule for 0 is
           * "attempt delivery only once and do not store it". APNs still
           * answers 200 - it accepted the notification - so a push that is
           * dropped because the phone's push connection was not live at that
           * exact second is indistinguishable, from here, from one that was
           * delivered. Three notifications were accepted for Louis's phone
           * and none of them ever appeared, not even in Notification Centre,
           * which is what that looks like.
           *
           * APNs keeps its own long-lived connection on port 5223, and
           * plenty of home routers and ISPs block it while every other kind
           * of traffic works. With an expiry set, Apple holds the
           * notification and delivers it when the phone reconnects, instead
           * of throwing it away.
           */
          "apns-expiration": String(Math.floor(Date.now() / 1000) + 86_400),
          "content-type": "application/json",
        },
        body: payload,
      });

      if (response.ok) {
        result.sent += 1;
        continue;
      }

      const text = await response.text();
      result.lastError = `${response.status} ${text}`;
      // 410 is the device token no longer being valid - app deleted, or the
      // reader turned notifications off. 400 BadDeviceToken means the same in
      // practice. Both are worth forgetting rather than retrying forever.
      if (response.status === 410 || /BadDeviceToken|Unregistered/.test(text)) {
        result.dead.push(deviceToken);
      }
    } catch (error) {
      result.lastError = error instanceof Error ? error.message : "APNs request failed";
    }
  }

  return result;
}
