import crypto from "node:crypto";
import zlib from "node:zlib";

/**
 * Reads App Store download numbers, for the App tab of the admin analytics
 * page (Louis, 2026-11-02: "verse real downloads or what ever").
 *
 * Our own events can tell us how many people TAPPED a download button. Only
 * Apple knows how many actually installed, and this is the only way to get
 * that number into our dashboard next to the taps - otherwise the conversion
 * rate from tap to install is unknowable.
 *
 * Credentials live in .env.local (`APP_STORE_CONNECT_*`), never in the repo:
 * this one is public, and the .p8 Apple issues can be downloaded exactly
 * once. The key is a read-only "Sales and Reports" key created on
 * 2026-11-02, deliberately NOT the Admin key Codemagic builds with - an
 * analytics job should not be able to ship a release.
 */

const BASE = "https://api.appstoreconnect.apple.com/v1";

export type SalesDay = { date: string; units: number; byCountry: Record<string, number> };

function config() {
  const keyId = process.env.APP_STORE_CONNECT_KEY_ID;
  const issuerId = process.env.APP_STORE_CONNECT_ISSUER_ID;
  const privateKey = process.env.APP_STORE_CONNECT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const vendor = process.env.APP_STORE_CONNECT_VENDOR_NUMBER || "94979417";
  if (!keyId || !issuerId || !privateKey) return null;
  return { keyId, issuerId, privateKey, vendor };
}

/** True when the key is installed; lets callers show "not connected" rather than erroring. */
export function appStoreConnectConfigured() {
  return config() !== null;
}

function token(cfg: NonNullable<ReturnType<typeof config>>) {
  const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const input =
    `${b64({ alg: "ES256", kid: cfg.keyId, typ: "JWT" })}.` +
    `${b64({ iss: cfg.issuerId, iat: now, exp: now + 600, aud: "appstoreconnect-v1" })}`;
  // JWT needs the raw r||s pair. Node signs ECDSA as DER unless told otherwise,
  // and a DER signature is silently rejected as a bad token.
  const sig = crypto.sign("sha256", Buffer.from(input), {
    key: cfg.privateKey,
    dsaEncoding: "ieee-p1363",
  });
  return `${input}.${sig.toString("base64url")}`;
}

/**
 * One day of App Store units (first-time downloads plus redownloads).
 *
 * Returns null rather than throwing when Apple has no report for that day.
 * **Apple answers "Invalid vendor number specified" (HTTP 400) for a day it
 * has not generated a report for**, which is nothing to do with the vendor
 * number - confirmed 2026-11-02 against a vendor number read straight off
 * the Payments and Financial Reports page. Daily reports appear roughly a
 * day in arrears, so "today" and often "yesterday" legitimately have none.
 */
export async function fetchSalesDay(date: string): Promise<SalesDay | null> {
  const cfg = config();
  if (!cfg) return null;

  const qs = new URLSearchParams({
    "filter[frequency]": "DAILY",
    "filter[reportSubType]": "SUMMARY",
    "filter[reportType]": "SALES",
    "filter[vendorNumber]": cfg.vendor,
    "filter[reportDate]": date,
  });

  const res = await fetch(`${BASE}/salesReports?${qs}`, {
    headers: { Authorization: `Bearer ${token(cfg)}`, Accept: "application/a-gzip" },
    // Apple's numbers for a past day never change; let the platform cache them.
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const raw = Buffer.from(await res.arrayBuffer());
  let text: string;
  try {
    text = zlib.gunzipSync(raw).toString("utf8");
  } catch {
    text = raw.toString("utf8");
  }

  const lines = text.trim().split("\n");
  if (lines.length < 2) return { date, units: 0, byCountry: {} };

  const head = lines[0].split("\t");
  const iUnits = head.findIndex((h) => /^Units$/i.test(h.trim()));
  const iCountry = head.findIndex((h) => /Country Code/i.test(h));
  const iType = head.findIndex((h) => /Product Type Identifier/i.test(h));

  let units = 0;
  const byCountry: Record<string, number> = {};
  for (const line of lines.slice(1)) {
    const cells = line.split("\t");
    // Product type 1/1F/1T are app installs; IA/IAY etc. are in-app purchases
    // and updates, which are not downloads and must not be counted as them.
    const type = (cells[iType] || "").trim();
    if (iType >= 0 && !/^1/.test(type)) continue;
    const n = Number(cells[iUnits] || 0);
    if (!Number.isFinite(n)) continue;
    units += n;
    const country = (cells[iCountry] || "??").trim();
    byCountry[country] = (byCountry[country] || 0) + n;
  }
  return { date, units, byCountry };
}

/** The last `days` days of units, oldest first. Days Apple has no report for are omitted. */
export async function fetchRecentSales(days = 14): Promise<SalesDay[]> {
  if (!appStoreConnectConfigured()) return [];
  const out: SalesDay[] = [];
  const today = Date.now();
  const wanted: string[] = [];
  // Skip today: Apple has never generated it yet.
  for (let i = days; i >= 1; i--) wanted.push(new Date(today - i * 86_400_000).toISOString().slice(0, 10));
  const results = await Promise.all(wanted.map((d) => fetchSalesDay(d).catch(() => null)));
  for (const r of results) if (r) out.push(r);
  return out;
}
