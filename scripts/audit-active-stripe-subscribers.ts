/**
 * READ-ONLY Stripe subscriber audit.
 *
 * Produces docs/bible-buddy-active-stripe-subscriber-audit.md by reconciling
 * every Stripe subscription against Bible Buddy user records.
 *
 * Run with:  npx tsx scripts/audit-active-stripe-subscribers.ts
 *
 * ============================ SAFETY ============================
 * This script performs NO writes of any kind.
 *
 *   - Stripe:   only .list() and .retrieve() are called. Never create,
 *               update, cancel or delete. No refunds. No payment changes.
 *   - Supabase: only .select() and auth.admin.listUsers(). Never insert,
 *               update, upsert or delete. is_paid is never touched.
 *   - Card data: never read or written. Only the last-4 of a card brand is
 *               available from Stripe and we deliberately do not fetch it.
 *
 * The only file written is the markdown report itself.
 * ================================================================
 */

import fs from "fs";
import path from "path";
import Stripe from "stripe";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------- env

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !(match[1] in process.env)) process.env[match[1]] = match[2];
  }
}

loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const missing: string[] = [];
if (!STRIPE_SECRET_KEY) missing.push("STRIPE_SECRET_KEY");
if (!SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL)");
if (!SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");

if (missing.length) {
  console.error("\n❌ Cannot run the audit. Missing credentials:\n");
  for (const key of missing) console.error(`   - ${key}`);
  console.error(
    "\nAdd them to .env.local in the project root, then re-run:\n" +
      "   npx tsx scripts/audit-active-stripe-subscribers.ts\n\n" +
      "A read-only Stripe key (rk_live_... with read access) is sufficient and safer\n" +
      "than the full secret key for this audit.\n",
  );
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY!, { apiVersion: "2025-12-15.clover" });
const supabase: SupabaseClient = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const LIVE_MODE = STRIPE_SECRET_KEY!.startsWith("sk_live_") || STRIPE_SECRET_KEY!.startsWith("rk_live_");

// Known price IDs from app/api/stripe/checkout/route.ts
const PRICE_MONTHLY = "price_1SzK8nGDyj3itMVLMk98v1iD";
const PRICE_LIFETIME = "price_1TS1kMGDyj3itMVLMBLvYfK8";

/** Statuses that could still result in a future charge. */
const BILLABLE_STATUSES = new Set([
  "active",
  "trialing",
  "past_due",
  "unpaid",
  "paused",
  "incomplete",
]);

// ---------------------------------------------------------------- types

type MatchConfidence = "high" | "medium" | "none";

type SubscriptionRecord = {
  subscriptionId: string;
  customerId: string | null;
  status: string;
  priceId: string | null;
  amount: number | null;
  currency: string | null;
  interval: string | null;
  intervalCount: number | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  cancelAt: string | null;
  endedAt: string | null;
  customerEmail: string | null;
  customerName: string | null;
  latestInvoiceStatus: string | null;
  latestInvoicePaidAt: string | null;
  metadataUserId: string | null;
  metadata: Record<string, string>;
  // resolved
  userId: string | null;
  matchConfidence: MatchConfidence;
  matchMethod: string;
  username: string | null;
  bbEmail: string | null;
  accountType: string | null;
  isPaid: boolean | null;
  membershipStatus: string | null;
  joinedAt: string | null;
  group: "A" | "B" | "C" | "D" | "Z";
};

// ---------------------------------------------------------------- helpers

const iso = (unix: number | null | undefined) =>
  typeof unix === "number" && unix > 0 ? new Date(unix * 1000).toISOString() : null;

const day = (value: string | null) => (value ? value.slice(0, 10) : "—");

function money(amount: number | null, currency: string | null) {
  if (amount == null) return "—";
  const symbol = currency === "gbp" ? "£" : currency === "eur" ? "€" : currency === "usd" ? "$" : "";
  return `${symbol}${(amount / 100).toFixed(2)}${symbol ? "" : ` ${(currency || "").toUpperCase()}`}`;
}

/** Redact an email for the report: l***s@gmail.com */
function safeEmail(email: string | null) {
  if (!email) return "—";
  const [local, domain] = email.split("@");
  if (!domain) return "—";
  const shown = local.length <= 2 ? local[0] : `${local[0]}***${local[local.length - 1]}`;
  return `${shown}@${domain}`;
}

/**
 * current_period_start/end moved onto subscription items in recent Stripe API
 * versions. Read whichever is present.
 */
function readPeriod(sub: Stripe.Subscription) {
  const anySub = sub as unknown as Record<string, unknown>;
  const item = sub.items?.data?.[0] as unknown as Record<string, unknown> | undefined;
  const start = (anySub.current_period_start ?? item?.current_period_start) as number | undefined;
  const end = (anySub.current_period_end ?? item?.current_period_end) as number | undefined;
  return { start: iso(start), end: iso(end) };
}

// ---------------------------------------------------------------- step 1: Stripe

async function fetchAllSubscriptions(): Promise<SubscriptionRecord[]> {
  const records: SubscriptionRecord[] = [];

  // status: "all" returns every subscription regardless of age or state, so
  // this is not limited to the last 30 days.
  for await (const sub of stripe.subscriptions.list({
    status: "all",
    limit: 100,
    expand: ["data.customer", "data.latest_invoice"],
  })) {
    const item = sub.items?.data?.[0];
    const price = item?.price ?? null;
    const customer = sub.customer as Stripe.Customer | Stripe.DeletedCustomer | string | null;
    const customerObj =
      customer && typeof customer === "object" && !("deleted" in customer && customer.deleted)
        ? (customer as Stripe.Customer)
        : null;
    const invoice = sub.latest_invoice as Stripe.Invoice | string | null;
    const invoiceObj = invoice && typeof invoice === "object" ? invoice : null;
    const period = readPeriod(sub);

    records.push({
      subscriptionId: sub.id,
      customerId: typeof customer === "string" ? customer : (customer?.id ?? null),
      status: sub.status,
      priceId: price?.id ?? null,
      amount: price?.unit_amount ?? null,
      currency: price?.currency ?? null,
      interval: price?.recurring?.interval ?? null,
      intervalCount: price?.recurring?.interval_count ?? null,
      currentPeriodStart: period.start,
      currentPeriodEnd: period.end,
      cancelAtPeriodEnd: sub.cancel_at_period_end === true,
      canceledAt: iso(sub.canceled_at),
      cancelAt: iso(sub.cancel_at),
      endedAt: iso(sub.ended_at),
      customerEmail: customerObj?.email ?? null,
      customerName: customerObj?.name ?? null,
      latestInvoiceStatus: invoiceObj?.status ?? null,
      latestInvoicePaidAt: iso(
        (invoiceObj as unknown as { status_transitions?: { paid_at?: number } })?.status_transitions?.paid_at,
      ),
      metadataUserId: sub.metadata?.user_id || null,
      metadata: (sub.metadata as Record<string, string>) || {},
      userId: null,
      matchConfidence: "none",
      matchMethod: "unmatched",
      username: null,
      bbEmail: null,
      accountType: null,
      isPaid: null,
      membershipStatus: null,
      joinedAt: null,
      group: "D",
    });
  }

  return records;
}

// ---------------------------------------------------------------- step 2: Bible Buddy lookups

/** Build stripeCustomerId / stripeSubscriptionId -> user_id from master_actions. */
async function buildStripeIdIndex() {
  const byCustomer = new Map<string, string>();
  const bySubscription = new Map<string, string>();

  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from("master_actions")
      .select("user_id, event_metadata")
      .eq("action_type", "user_upgraded")
      .range(from, from + pageSize - 1);

    if (error) throw new Error(`master_actions read failed: ${error.message}`);
    if (!data?.length) break;

    for (const row of data) {
      const meta = (row.event_metadata || {}) as Record<string, unknown>;
      const cid = typeof meta.stripeCustomerId === "string" ? meta.stripeCustomerId : null;
      const sid = typeof meta.stripeSubscriptionId === "string" ? meta.stripeSubscriptionId : null;
      if (cid && !byCustomer.has(cid)) byCustomer.set(cid, row.user_id);
      if (sid && !bySubscription.has(sid)) bySubscription.set(sid, row.user_id);
    }

    if (data.length < pageSize) break;
  }

  return { byCustomer, bySubscription };
}

/** Build lowercase email -> { userId, createdAt } from Supabase Auth. */
async function buildEmailIndex() {
  const byEmail = new Map<string, { userId: string; createdAt: string | null }>();

  for (let page = 1; ; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`auth.admin.listUsers failed: ${error.message}`);
    const users = data?.users ?? [];
    if (!users.length) break;

    for (const user of users) {
      if (!user.email) continue;
      const key = user.email.trim().toLowerCase();
      if (!byEmail.has(key)) byEmail.set(key, { userId: user.id, createdAt: user.created_at ?? null });
    }

    if (users.length < 1000) break;
  }

  return byEmail;
}

async function fetchProfiles(userIds: string[]) {
  const profiles = new Map<string, Record<string, unknown>>();
  const chunkSize = 200;

  for (let i = 0; i < userIds.length; i += chunkSize) {
    const chunk = userIds.slice(i, i + chunkSize);
    const { data, error } = await supabase
      .from("profile_stats")
      .select("user_id, username, display_name, is_paid, membership_status, account_type, created_at")
      .in("user_id", chunk);

    if (error) throw new Error(`profile_stats read failed: ${error.message}`);
    for (const row of data ?? []) profiles.set(row.user_id as string, row);
  }

  return profiles;
}

/** Count Bible Buddy users flagged paid (group E denominator). */
async function countPaidUsers() {
  const { count, error } = await supabase
    .from("profile_stats")
    .select("user_id", { count: "exact", head: true })
    .eq("is_paid", true);

  if (error) throw new Error(`paid-user count failed: ${error.message}`);
  return count ?? 0;
}

// ---------------------------------------------------------------- step 3: matching

function classify(record: SubscriptionRecord): "A" | "B" | "C" | "D" | "Z" {
  if (!BILLABLE_STATUSES.has(record.status)) return "Z"; // canceled / incomplete_expired — not billable
  if (record.matchConfidence === "none") return "D";
  if (record.status === "past_due" || record.status === "unpaid") return "C";
  if (record.cancelAtPeriodEnd) return "B";
  return "A";
}

// ---------------------------------------------------------------- report

function buildReport(
  records: SubscriptionRecord[],
  paidUserCount: number,
  generatedAt: string,
): string {
  const billable = records.filter((r) => r.group !== "Z");
  const groupA = billable.filter((r) => r.group === "A");
  const groupB = billable.filter((r) => r.group === "B");
  const groupC = billable.filter((r) => r.group === "C");
  const groupD = billable.filter((r) => r.group === "D");
  const notBillable = records.filter((r) => r.group === "Z");

  // Monthly-equivalent exposure across everything that could still charge.
  const atRisk = [...groupA, ...groupC, ...groupD];
  const byCurrency = new Map<string, number>();
  for (const r of atRisk) {
    if (r.amount == null || !r.currency) continue;
    const perMonth =
      r.interval === "year"
        ? r.amount / 12
        : r.interval === "week"
          ? (r.amount * 52) / 12
          : r.interval === "day"
            ? (r.amount * 365) / 12
            : r.amount;
    byCurrency.set(r.currency, (byCurrency.get(r.currency) ?? 0) + perMonth / (r.intervalCount || 1));
  }
  const exposure =
    [...byCurrency.entries()].map(([cur, amt]) => money(Math.round(amt), cur)).join(" + ") || "—";

  const matchedUserIds = new Set(billable.filter((r) => r.userId).map((r) => r.userId as string));

  const row = (r: SubscriptionRecord) =>
    `| ${r.username || "—"} | ${safeEmail(r.customerEmail || r.bbEmail)} | ${r.userId || "—"} | ${r.customerId || "—"} | ${r.subscriptionId} | ${r.status}${r.cancelAtPeriodEnd ? " (cancels at period end)" : ""} | ${money(r.amount, r.currency)} | ${r.intervalCount && r.intervalCount > 1 ? `${r.intervalCount} ` : ""}${r.interval || "—"} | ${day(r.currentPeriodEnd)} | ${r.matchConfidence} (${r.matchMethod}) |`;

  const header =
    "| Bible Buddy Username | Email | User ID | Stripe Customer | Subscription ID | Status | Amount | Billing Interval | Next Billing Date | Match Confidence |\n" +
    "|---|---|---|---|---|---|---|---|---|---|";

  const section = (title: string, rows: SubscriptionRecord[], empty: string) =>
    rows.length ? `${title}\n\n${header}\n${rows.map(row).join("\n")}\n` : `${title}\n\n${empty}\n`;

  return `# Bible Buddy — Active Stripe Subscriber Audit

**Generated:** ${generatedAt}
**Stripe mode:** ${LIVE_MODE ? "LIVE" : "TEST"}
**Nature:** READ-ONLY. No subscription was canceled, no refund issued, no payment
record modified, no \`is_paid\` value changed, and no message sent.

${LIVE_MODE ? "" : "> ⚠️ **This ran against Stripe TEST mode.** These are not real customers. Re-run with a live key before acting on anything below.\n"}
---

## Summary

| Metric | Value |
|---|---|
| Total Stripe subscriptions inspected (all statuses) | **${records.length}** |
| Still billable (active / trialing / past_due / unpaid / paused / incomplete) | **${billable.length}** |
| A — Confirmed active recurring subscriber | **${groupA.length}** |
| B — Cancel-at-period-end, still active | **${groupB.length}** |
| C — Payment problem (past_due / unpaid) | **${groupC.length}** |
| D — No confident Bible Buddy match (manual review) | **${groupD.length}** |
| Already ended (canceled / expired — not billable) | ${notBillable.length} |
| **Estimated monthly recurring exposure** | **${exposure}** |

*Exposure covers groups A, C and D — everything that could still generate a
charge. Group B is excluded because it is already scheduled to stop. Annual
prices are divided by 12 to give a monthly-equivalent figure.*

---

## A. Confirmed active recurring subscribers

These are the people who will be charged again unless the subscription is canceled.

${section("", groupA, "_None._")}
---

## B. Cancel-at-period-end (still active)

Already scheduled to stop. They keep access until the period ends and will not be
charged again. **No action needed** — canceling again is harmless but unnecessary.

${section("", groupB, "_None._")}
---

## C. Payment problems (past_due / unpaid)

Stripe will keep retrying these. They must still be canceled, or retries continue.

${section("", groupC, "_None._")}
---

## D. Unmatched Stripe subscriptions — MANUAL REVIEW REQUIRED

No confident link to a Bible Buddy account. **Do not guess.** Resolve each one by
hand before any cancellation run.

${
  groupD.length
    ? groupD
        .map(
          (r) =>
            `- **${r.subscriptionId}** — customer \`${r.customerId ?? "unknown"}\`, status \`${r.status}\`, ` +
            `${money(r.amount, r.currency)} / ${r.interval ?? "?"}, next charge ${day(r.currentPeriodEnd)}\n` +
            `  - Stripe email: ${safeEmail(r.customerEmail)}\n` +
            `  - Stripe name: ${r.customerName || "—"}\n` +
            `  - Subscription metadata: ${Object.keys(r.metadata).length ? `\`${JSON.stringify(r.metadata)}\`` : "_(empty)_"}\n` +
            `  - Latest invoice: ${r.latestInvoiceStatus ?? "—"}`,
        )
        .join("\n")
    : "_None — every billable subscription matched a Bible Buddy user._"
}

---

## E. Historical paid users with no billable subscription

| Metric | Value |
|---|---|
| Bible Buddy users with \`is_paid = true\` | **${paidUserCount}** |
| Of those, holding a currently billable subscription | **${matchedUserIds.size}** |
| **Lifetime / historical — nothing recurring** | **${Math.max(paidUserCount - matchedUserIds.size, 0)}** |

These people keep permanent Pro and are **not** part of the cancellation run.
They are the "Founding Supporter" population. **Do not change their \`is_paid\`.**

---

## Notes

- Statuses queried: \`all\` — not limited to any recent window.
- Known price IDs: monthly \`${PRICE_MONTHLY}\`, lifetime (one-time) \`${PRICE_LIFETIME}\`.
- One-time "lifetime" purchases use Stripe \`mode: "payment"\` and create **no
  subscription**, so they correctly never appear above.
- Emails are partially redacted. No card data was read.
`;
}

// ---------------------------------------------------------------- main

async function main() {
  console.log(`\n🔍 Bible Buddy Stripe subscriber audit (READ-ONLY)`);
  console.log(`   Stripe mode: ${LIVE_MODE ? "LIVE" : "TEST"}\n`);

  console.log("→ Fetching all Stripe subscriptions (every status)...");
  const records = await fetchAllSubscriptions();
  console.log(`  found ${records.length}`);

  console.log("→ Indexing Stripe IDs from master_actions...");
  const { byCustomer, bySubscription } = await buildStripeIdIndex();
  console.log(`  ${byCustomer.size} customer IDs, ${bySubscription.size} subscription IDs`);

  console.log("→ Indexing Supabase Auth emails...");
  const byEmail = await buildEmailIndex();
  console.log(`  ${byEmail.size} emails`);

  // Match, in the priority order specified.
  for (const r of records) {
    if (r.metadataUserId) {
      r.userId = r.metadataUserId;
      r.matchConfidence = "high";
      r.matchMethod = "stripe metadata user_id";
    } else if (r.subscriptionId && bySubscription.has(r.subscriptionId)) {
      r.userId = bySubscription.get(r.subscriptionId)!;
      r.matchConfidence = "high";
      r.matchMethod = "master_actions subscription id";
    } else if (r.customerId && byCustomer.has(r.customerId)) {
      r.userId = byCustomer.get(r.customerId)!;
      r.matchConfidence = "high";
      r.matchMethod = "master_actions customer id";
    } else if (r.customerEmail && byEmail.has(r.customerEmail.trim().toLowerCase())) {
      const hit = byEmail.get(r.customerEmail.trim().toLowerCase())!;
      r.userId = hit.userId;
      r.joinedAt = hit.createdAt;
      r.matchConfidence = "medium";
      r.matchMethod = "exact email match";
    }
    // No fuzzy name matching, by design.
  }

  const userIds = [...new Set(records.map((r) => r.userId).filter(Boolean) as string[])];
  console.log(`→ Loading ${userIds.length} Bible Buddy profiles...`);
  const profiles = await fetchProfiles(userIds);

  for (const r of records) {
    if (r.userId) {
      const p = profiles.get(r.userId);
      if (p) {
        r.username = (p.display_name as string) || (p.username as string) || null;
        r.isPaid = (p.is_paid as boolean) ?? null;
        r.membershipStatus = (p.membership_status as string) ?? null;
        r.accountType = (p.account_type as string) ?? null;
        r.joinedAt = r.joinedAt || ((p.created_at as string) ?? null);
      } else if (r.matchConfidence === "high") {
        // Matched an ID that has no profile row — flag rather than assume.
        r.matchMethod += " (no profile_stats row)";
      }
    }
    r.group = classify(r);
  }

  console.log("→ Counting historical paid users...");
  const paidUserCount = await countPaidUsers();

  const generatedAt = new Date().toISOString();
  const report = buildReport(records, paidUserCount, generatedAt);

  const outPath = path.join(process.cwd(), "docs", "bible-buddy-active-stripe-subscriber-audit.md");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, report, "utf8");

  const billable = records.filter((r) => r.group !== "Z");
  console.log(`\n✅ Report written to ${outPath}`);
  console.log(`   Subscriptions inspected: ${records.length}`);
  console.log(`   Still billable:          ${billable.length}`);
  console.log(`     A active:              ${billable.filter((r) => r.group === "A").length}`);
  console.log(`     B cancel-at-end:       ${billable.filter((r) => r.group === "B").length}`);
  console.log(`     C payment problem:     ${billable.filter((r) => r.group === "C").length}`);
  console.log(`     D unmatched:           ${billable.filter((r) => r.group === "D").length}`);
  console.log(`\n   Nothing was modified. This was a read-only audit.\n`);
}

main().catch((err) => {
  console.error("\n❌ Audit failed:", err instanceof Error ? err.message : err);
  console.error("   No changes were made.\n");
  process.exit(1);
});
