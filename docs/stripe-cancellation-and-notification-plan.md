# Stripe Cancellation & Supporter Notification — Integration Findings and Plan

**Date:** 2026-08-15
**Status:** Audit + plan only. Nothing cancelled, nothing sent, nothing modified.
**Companion:** [`bible-buddy-active-stripe-subscriber-audit.md`](./bible-buddy-active-stripe-subscriber-audit.md) (report output)

---

## Step 1 — The existing Stripe integration

### Configuration
| Item | Value / Location |
|---|---|
| Stripe SDK | `stripe` npm package, API version `2025-12-15.clover` |
| Secret key | `STRIPE_SECRET_KEY` (env only; `.env*` is gitignored) |
| Webhook secret | `STRIPE_WEBHOOK_SECRET` |
| Live/test guard | `checkout/route.ts:154` verifies `price.livemode` matches key mode |

### Price IDs and — critically — checkout modes
Both hardcoded at `app/api/stripe/checkout/route.ts:13`:

| Plan | Price ID | Stripe mode | Recurring? |
|---|---|---|---|
| `monthly` | `price_1SzK8nGDyj3itMVLMk98v1iD` | `subscription` | **Yes** |
| `yearly` | `price_1TS1kMGDyj3itMVLMBLvYfK8` | **`payment`** | **No — one-time** |

`checkout/route.ts:152` — `const checkoutMode = plan === "yearly" ? "payment" : "subscription"`.
Metadata labels the yearly plan `"lifetime"` (`:137`). **The "yearly" plan is a
one-time lifetime purchase, not an annual subscription.** It cannot generate a
future charge and is out of scope for cancellation.

### Which plans are actually reachable
| Entry point | Plan |
|---|---|
| `app/upgrade/page.tsx:120` | `yearly` only |
| `components/CreditLimitModal.tsx:43` | `yearly` only (typed) |
| `components/UpgradeRequiredModal.tsx:52` | `yearly` only (typed) |
| `components/DashboardJourneyExperience.tsx:7342` | `monthly` \| `yearly` |
| `components/AppShell.tsx:1071` | `monthly` \| `yearly` |
| `components/FirstLoginOnboardingModal.tsx:9` | `monthly` \| `yearly` |

### A second, orphaned checkout route
`app/api/stripe/create-checkout-session/route.ts` also creates
`mode: "subscription"` sessions, tagged `plan: "pro"`, using a price from its own
input rather than `PRICE_IDS`. **It has no callers in the current codebase** —
grep for `create-checkout-session` returns only the route itself.

**Implication:** historical subscriptions may exist under a *different price ID*
with `metadata.plan === "pro"`. The audit script therefore queries
`status: "all"` with no price filter, so these are captured regardless.

### What Stripe metadata carries
Both routes set `metadata` **and** `subscription_data.metadata` to include
`user_id` (`checkout/route.ts:175-192`, `create-checkout-session/route.ts:163-173`).
**This is the strongest matching signal available** — it lives on the
subscription object itself.

### Where Bible Buddy stores Stripe identifiers
**Nowhere as a column.** No `stripe_customer_id` / `stripe_subscription_id`
column exists in any migration. They are written only into
`master_actions.event_metadata` JSONB by `webhook/route.ts:106-107` and
`confirm-upgrade/route.ts:98-99`.

And `lib/server/upgradeTracking.ts:80` guards that insert with
`if (!wasPaid || !alreadyTrackedUpgrade)` — **so repeat upgraders have only
their first Stripe ID stored.** Treat this index as incomplete by design.

### Payment-related tables
| Table | Relevance |
|---|---|
| `profile_stats` | `is_paid`, `membership_status`, `payments`, `pro_expires_at`, `paid_credits` — **not a reliable subscription source of truth** |
| `master_actions` | `action_type = 'user_upgraded'`, Stripe IDs in `event_metadata` |
| `user_store_purchases` | In-app cosmetic store (diamonds/skins) — **unrelated to Stripe** |

### Why `profile_stats` cannot be trusted
`app/api/stripe/webhook/route.ts:61` early-returns on anything that is not
`checkout.session.completed`. There is no handling of
`customer.subscription.deleted`, `.updated`, or `invoice.payment_failed`, and
`proExpiresAt` is always written `null`. Access has therefore never been revoked
from anyone, and `is_paid = true` says only "paid at some point", never "is
currently subscribed". **Stripe is the only source of truth.**

---

## Step 3 — Matching strategy (implemented in the script)

Applied in strict priority order; first hit wins.

| # | Method | Confidence | Source |
|---|---|---|---|
| 1 | `subscription.metadata.user_id` | **high** | Set on the subscription by both checkout routes |
| 2 | `master_actions.event_metadata.stripeSubscriptionId` → `user_id` | **high** | Exact ID match |
| 3 | `master_actions.event_metadata.stripeCustomerId` → `user_id` | **high** | Exact ID match |
| 4 | Stripe customer email → Supabase Auth email (exact, case-insensitive) | **medium** | Email can differ from billing email |
| 5 | — | — | **No fuzzy name matching.** Unmatched → group D. |

A high-confidence ID match with no corresponding `profile_stats` row is flagged
in the report rather than silently dropped.

---

## Step 4 — Classification

| Group | Definition | Action in step 2 |
|---|---|---|
| **A** | Matched, status active/trialing/incomplete/paused, not cancelling | **Cancel + DM** |
| **B** | Matched, `cancel_at_period_end = true` | **DM only** — already stopping |
| **C** | Matched, `past_due` / `unpaid` | **Cancel + DM** — Stripe is still retrying |
| **D** | Billable but unmatched | **Manual review. Do not auto-cancel.** |
| **E** | `is_paid = true`, no billable subscription | **Nothing.** Lifetime/historical — leave untouched |
| **Z** | Already `canceled` / `incomplete_expired` | Excluded — not billable |

---

## Step 6 — How the in-app DM system works

### Schema
| Table | Shape |
|---|---|
| `conversations` | `id`, `user_id_1`, `user_id_2`, `last_message_at`, `last_message_preview` |
| `messages` | `id`, `conversation_id`, `sender_id`, `content`, `image_url`, `read_at`, `created_at` |
| `notifications` | `user_id`, `type`, `from_user_id`, `from_user_name`, `article_slug`, `message`, `is_read` |
| `onboarding_dm_sent` | `(user_id, day_number)` unique — **idempotency claim table** |

### There is no system/bot account — Louis's account is the sender
`app/api/send-welcome-dm/route.ts` is the working precedent and the exact
pattern to copy. It:

1. Resolves the founder ID via `LOUIS_USER_ID` env, falling back to an Auth
   admin lookup on `moorelouis3@gmail.com` (`:63-88`).
2. **Claims idempotency first** — upserts into `onboarding_dm_sent` with
   `ignoreDuplicates`, and bails if the row already existed (`:90-108`).
3. Orders participants deterministically: `louisId < userId ? [louisId, userId] : [userId, louisId]` (`:150`).
4. Finds or creates the conversation (`:152-172`).
5. Inserts the message with `sender_id = louisId`.
6. Updates `last_message_at` / `last_message_preview`.
7. Inserts (or refreshes) a `notifications` row of type `direct_message`
   pointing at `/messages/{conversationId}`.
8. **Releases the idempotency claim on any failure** (`releaseWelcomeClaim`) so a
   retry can succeed.

**Yes, a conversation is created automatically if none exists**, and the whole
flow runs on the service-role key, so no user session is required.

Note: `app/api/messages/send/route.ts` is the *user-facing* send route. It
requires a bearer token and rejects senders who are not conversation
participants — **it is not usable for this job.** Copy the welcome-DM pattern.

### Recommended sender
**Louis's real account.** The message is personal and thanks people for their
support; it should not come from a faceless system account. This also matches
what supporters already have in their inbox from the welcome DM.

---

## Recommended sequence for the SECOND command

> **Do not run any of this until Louis explicitly says to proceed.**

### Prerequisites
1. Run the read-only audit and **read the report**.
2. **Manually resolve every group-D subscription.** No auto-cancel on a guess.
3. Louis approves the final message wording.
4. Decide the cancellation mode — see below.

### The one real decision: cancel now, or at period end?

| Option | Behaviour | Trade-off |
|---|---|---|
| **`cancel_at_period_end = true`** *(recommended)* | Billing stops; access runs to the end of the period already paid for | Nobody loses time they paid for. Nothing to refund. Reads as generous. |
| `subscriptions.cancel()` immediate | Stops instantly, mid-period | Takes away days already paid for unless you also refund |

**Recommendation: `cancel_at_period_end`.** It guarantees no future charge —
which is the entire goal — without clawing back paid time. Since Bible Buddy is
becoming free, access continues regardless, so there is no downside.

For **group C (past_due / unpaid)** use immediate cancellation instead — there is
no paid period left to honour, and it stops Stripe's retry cycle now.

### Execution order (per user, resumable)
```
for each user in groups A and C:
  1. Re-fetch the subscription from Stripe        ← re-verify; state may have changed
  2. Skip if already canceled or cancel_at_period_end
  3. Claim idempotency row (supporter_notice_sent) ← BEFORE any side effect
  4. Cancel:
       group A → subscriptions.update(id, { cancel_at_period_end: true })
       group C → subscriptions.cancel(id)
  5. Verify the cancellation response
  6. Send the DM (welcome-DM pattern, sender = Louis)
  7. Insert the notification row
  8. Log to master_actions: action_type 'subscription_canceled_free_migration'
  9. On any failure after step 3 → release the claim, log, continue
```

### Non-negotiables for that run
- **Cancel before messaging.** Never tell someone they won't be charged until
  Stripe has confirmed it. If step 4 fails, no DM goes out.
- **Idempotency claimed before side effects**, released on failure — the
  `onboarding_dm_sent` pattern. A re-run must never double-message or
  double-cancel.
- **`--dry-run` by default**, requiring an explicit `--apply` flag (the existing
  `scripts/repair-lifetime-customers.ts` already uses this convention).
- **Never touch `is_paid`, `membership_status`, or payment history.** Supporters
  keep permanent access. That is the entire point.
- **No refunds** unless Louis separately decides on them.
- **Group D and E are excluded** from the run entirely.
- Add a new `master_actions` action type so the migration is auditable — note
  that `master_actions.action_type` has a **CHECK constraint** (see the several
  `ADD_*_TO_MASTER_ACTIONS_CONSTRAINT.sql` migrations), so the constraint must
  be extended first or the insert will fail.

### Draft message (wording to be refined by Louis)
> Hey! We wanted to let you know before the public announcement because you've
> been one of the people financially supporting Bible Buddy.
>
> Bible Buddy is now at a point where we're able to make the full Bible-study
> experience free for everyone.
>
> We've canceled your recurring payment, so you won't be charged again.
>
> Thank you so much for supporting Bible Buddy and helping us get to this
> point. 💛

Two suggestions: if using `cancel_at_period_end`, say *"you won't be charged
again — your current period runs to <date> and your access continues after that
either way"*, which is more accurate and more reassuring. And group B (already
cancelling) should get a variant that does **not** claim you cancelled something
on their behalf.
