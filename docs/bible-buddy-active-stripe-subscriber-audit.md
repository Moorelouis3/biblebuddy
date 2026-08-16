# Bible Buddy — Active Stripe Subscriber Audit

> ## ⏸ STATUS: NOT YET EXECUTED — NO STRIPE CREDENTIALS AVAILABLE
>
> This file is a placeholder. The live subscriber data cannot be pulled from the
> environment this audit was prepared in, because no Stripe or Supabase
> credentials are present.
>
> **To fill this report in, run:**
> ```bash
> npx tsx scripts/audit-active-stripe-subscribers.ts
> ```
> That script is **read-only** and will overwrite this file with real data.
> Methodology, integration findings and the cancellation plan live in
> [`stripe-cancellation-and-notification-plan.md`](./stripe-cancellation-and-notification-plan.md)
> and are **not** overwritten.

---

## What is missing

Checked in this environment — none are set, and no `.env` / `.env.local` file
exists (`.env*` is gitignored, so credentials correctly never reached the repo):

| Variable | Needed for | Status |
|---|---|---|
| `STRIPE_SECRET_KEY` | Reading subscriptions from Stripe | ❌ not set |
| `SUPABASE_SERVICE_ROLE_KEY` | Reading `profile_stats`, `master_actions`, Auth users | ❌ not set |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase endpoint | ❌ not set |

**Recommendation:** use a **restricted read-only Stripe key** (`rk_live_…` with
read permission on Subscriptions, Customers and Invoices) rather than the full
secret key. The audit needs nothing more, and a read-only key makes an
accidental write impossible at the API level.

---

## What the audit will produce once run

- **Summary** — total subscriptions inspected, counts per group A–D, and
  estimated monthly recurring exposure.
- **Group A** — confirmed active recurring subscribers (will be charged again).
- **Group B** — cancel-at-period-end, still active (already stopping).
- **Group C** — past_due / unpaid (Stripe still retrying).
- **Group D** — unmatched, for manual review. **No guessing.**
- **Group E** — count of historical paid users with no billable subscription.

Emails are partially redacted in the output and **no card data is read**.

---

## Read this before interpreting the numbers

Three findings from the code inspection change what you should expect to see.
Full detail in the companion plan document.

**1. Most Bible Buddy purchases create no subscription at all.**
`app/api/stripe/checkout/route.ts:152` sets
`checkoutMode = plan === "yearly" ? "payment" : "subscription"`. The "yearly"
price (`price_1TS1kMGDyj3itMVLMBLvYfK8`) is a **one-time payment** — Stripe
creates no subscription and will never charge again. It is internally labelled
`plan: "lifetime"`. Only the **monthly** price
(`price_1SzK8nGDyj3itMVLMk98v1iD`) creates recurring billing.

**Expect the billable count to be far smaller than the total paid-user count.**
That is correct, not a bug in the audit.

**2. The `/upgrade` page only ever sells the one-time plan.**
`app/upgrade/page.tsx:120` calls `handleCheckout("yearly")` exclusively, as do
`CreditLimitModal` and `UpgradeRequiredModal` (both typed `plan: "yearly"`).
Monthly is reachable only from `DashboardJourneyExperience.tsx:7342`,
`AppShell.tsx:1071` and `FirstLoginOnboardingModal.tsx`. So recurring
subscribers are likely a **narrow cohort from specific in-app upgrade prompts**,
not from the main pricing page.

**3. Bible Buddy never stores Stripe IDs in a column.**
There is no `stripe_customer_id` or `stripe_subscription_id` column anywhere.
Those IDs exist **only inside `master_actions.event_metadata`** (JSONB) on
`user_upgraded` rows. Worse, `lib/server/upgradeTracking.ts:80` only writes that
row `if (!wasPaid || !alreadyTrackedUpgrade)` — so **a user who upgraded more
than once has only their first Stripe ID recorded.**

This is why matching leans first on `subscription.metadata.user_id`, which both
checkout routes set via `subscription_data.metadata` and which is therefore the
most reliable link that exists.
