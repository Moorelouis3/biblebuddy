import { createSign } from "crypto";
import http2 from "node:http2";

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
 * No dependency, but node:http2 rather than fetch (Louis, 2026-10-24).
 *
 * THE BUG. This said "Apple's API is an HTTP/2 POST and node's fetch does
 * it". It does not. APNs accepts HTTP/2 only, and node's fetch is undici,
 * which speaks HTTP/1.1 - so every call threw "fetch failed" before a byte
 * reached Apple. Not one notification has ever been delivered to an iPhone.
 *
 * It stayed invisible because /api/push/process marked a job "sent" if
 * EITHER channel worked and then erased the APNs error, and Louis had a
 * stale Safari web-push subscription that kept succeeding. He said it was
 * the web notifications within the first hour and he was right twice over:
 * the web path was both masking this and swallowing the evidence.
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

/**
 * One POST to APNs over an open HTTP/2 session.
 *
 * Written out by hand because node's http2 client is event-based and this is
 * the only place that needs it. Every path settles: a response, a stream
 * error, or the timeout - a push that hangs must not hold the cron open.
 */
function sendOne(
  session: http2.ClientHttp2Session,
  deviceToken: string,
  payload: string,
  jwt: string,
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const request = session.request({
      ":method": "POST",
      ":path": `/3/device/${deviceToken}`,
      authorization: `bearer ${jwt}`,
      "apns-topic": BUNDLE_ID,
      "apns-push-type": "alert",
      // 10 is "deliver now", which is what a message is.
      "apns-priority": "10",
      /**
       * Store it and keep trying for a day.
       *
       * Omitting this means an expiry of 0, and Apple's rule for 0 is
       * "attempt delivery only once and do not store it" - so a phone that
       * is briefly unreachable loses the notification outright.
       */
      "apns-expiration": String(Math.floor(Date.now() / 1000) + 86_400),
      "content-type": "application/json",
    });

    let status = 0;
    let body = "";
    const timer = setTimeout(() => {
      request.close();
      reject(new Error("APNs did not answer within 10s"));
    }, 10_000);

    request.on("response", (headers) => {
      status = Number(headers[":status"]) || 0;
    });
    request.setEncoding("utf8");
    request.on("data", (chunk: string) => {
      body += chunk;
    });
    request.on("end", () => {
      clearTimeout(timer);
      resolve({ status, body });
    });
    request.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });

    request.end(payload);
  });
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

  // One HTTP/2 session for every device this reader has, closed at the end.
  const session = http2.connect(APNS_HOST);
  const sessionFailed = new Promise<never>((_, reject) => {
    session.on("error", reject);
  });

  try {
    for (const deviceToken of deviceTokens) {
      try {
        const { status, body } = await Promise.race([
          sendOne(session, deviceToken, payload, token),
          sessionFailed,
        ]);

        if (status >= 200 && status < 300) {
          result.sent += 1;
          continue;
        }

        result.lastError = `${status} ${body}`;
        // 410 is the device token no longer being valid - app deleted, or the
        // reader turned notifications off. 400 BadDeviceToken means the same in
        // practice. Both are worth forgetting rather than retrying forever.
        if (status === 410 || /BadDeviceToken|Unregistered/.test(body)) {
          result.dead.push(deviceToken);
        }
      } catch (error) {
        result.lastError = error instanceof Error ? error.message : "APNs request failed";
      }
    }
  } finally {
    session.close();
  }

  return result;
}
