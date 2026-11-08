/**
 * The file Android reads to decide that a mybiblebuddy.net link belongs to the
 * app. The Android half of Louis's "open the app, not Chrome" (2026-11-08).
 *
 * Google calls it an App Link. Same idea as Apple's Universal Links, with one
 * difference that matters: Android verifies by SIGNING KEY, not by team id.
 * The fingerprint below is the SHA-256 of the certificate Google Play signs
 * the app with - not the upload key, and not Codemagic's keystore. It lives in
 * Play Console under Test and release -> App integrity -> App signing key
 * certificate, and only Louis can read it.
 *
 * It comes from an environment variable rather than this file because it is
 * build configuration, not code, and because this repo is public (see
 * MEMORY: repo-is-public). A fingerprint is not a secret - it is published to
 * the world by design, right here - but keeping it in one place means the
 * debug and release keys cannot drift apart in the source.
 *
 * With no fingerprint configured this serves an empty array, which is valid
 * JSON meaning "no app is authorised for this domain". That is the honest
 * answer and it fails closed: links keep opening the browser exactly as they
 * do today, rather than half-working.
 *
 * See docs/DEEP_LINKS.md.
 */

export const revalidate = 3600;

const PACKAGE_NAME = "net.mybiblebuddy.app";

/**
 * Accepts one fingerprint or several, comma or whitespace separated, so the
 * Play signing key and an upload or debug key can coexist during testing.
 * Colons and case are normalised because Play Console and keytool disagree
 * about both.
 */
function fingerprints(): string[] {
  const raw = process.env.ANDROID_APP_LINK_SHA256 || "";
  return raw
    .split(/[\s,]+/)
    .map((value) => value.trim().toUpperCase())
    .filter((value) => /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(value));
}

export async function GET() {
  const certs = fingerprints();

  const body = certs.length
    ? [
        {
          relation: ["delegate_permission/common.handle_all_urls"],
          target: {
            namespace: "android_app",
            package_name: PACKAGE_NAME,
            sha256_cert_fingerprints: certs,
          },
        },
      ]
    : [];

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
