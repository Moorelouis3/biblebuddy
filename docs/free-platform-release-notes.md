# Bible Buddy is free — release notes

**Released:** 2026-08-15
**Branch:** `claude/bible-buddy-free-audit-5tbtau`
**Revert:** set `NEXT_PUBLIC_CORE_STUDY_FREE=false` in Vercel and redeploy.
No code revert needed.

---

## What changed for users

The core Bible-study experience is free. No credits, no daily limits, no locked
plans, no Pro tier.

| Before | After |
|---|---|
| 5 study credits per day | Unlimited |
| One devotional claimed, other 25 locked | All 26 open |
| One devotional day per 24 hours | As many as you like, back to back |
| Trivia: Genesis/Exodus/Leviticus/Numbers only | All 66 books |
| Scrambled: 4 books, 4 people | Everything |
| Reading plans locked | Open |
| Bible in One Year credit-gated | Open |
| Study-group series notes: Pro only | Open |
| Bible Buddy TV notes: Pro only | Open |
| Landing page → signup form | "Start Studying Now" → Bible in One Year Day 1 |
| Blog → "create an account" | Blog → deep link into the relevant free study |

## Environment flags

| Variable | Value | Effect |
|---|---|---|
| `NEXT_PUBLIC_CORE_STUDY_FREE` | unset *(default)* | Everything free |
| `NEXT_PUBLIC_CORE_STUDY_FREE` | `false` | Restores the old paid gating exactly |

## Required manual steps

**1. Supabase → Authentication → Providers → enable Anonymous.**
Without it, "Start Studying Now" falls back to `/signup`. Not broken, but the
no-account funnel does not work.

**2. Run `supabase/migrations/BLOCK_ANONYMOUS_COMMUNITY_WRITES.sql`.**
Supabase anonymous users hold the `authenticated` role, so community write
policies accept them. This adds RESTRICTIVE policies keeping guests out of
posting, commenting, liking and messaging. Additive — drops nothing. Only
matters once step 1 is done.

**3. Cancel the remaining active Stripe subscriptions.**
16 were found in the Stripe dashboard. Handled manually. Use "cancel at end of
current period" so nobody loses time they paid for. Nothing in this release
touches billing.

## What was deliberately NOT changed

- Stripe checkout, webhook and all payment routes — needed for physical books,
  donations and bulk orders.
- All payment history, `is_paid`, `membership_status`, `user_store_purchases`.
- Existing accounts, progress, streaks, notes, community.
- Gate components are hollowed out rather than deleted, so the change stays
  revertible.

## Verification at release

- `npx tsc --noEmit` — clean, no errors
- `npm run build` — exit 0
- Production server boots; `/`, `/upgrade`, `/devotionals`, blog posts and
  `/study/[slug]` all return 200
- No stale upgrade or credit copy on the landing page

**Not verified end to end:** guest account creation, devotional slug lookup
against real data, and landing on Day 1 rather than a welcome screen. Those
need real Supabase credentials and should be the first things checked after
deploy.

## Two gates that nearly shipped

Both were found by running a real build, after a client-side-only sweep missed
them:

1. **`proxy.ts`** — Next 16 renames `middleware.ts` to `proxy.ts`. It enforced a
   server-side paywall redirecting non-paying users away from most trivia decks
   and `/reading-plans/bible-buddy`. Pages would have looked unlocked, then
   redirected on click.
2. **`lib/dailyRecommendation.ts`** — Louis would have kept pitching Pro to the
   most engaged users.

## Still open

- Guests hitting community actions fail silently — needs a "create a free
  account to join in" prompt (`isGuestUser()` in `lib/guestSession.ts` is ready).
- 26 of 28 blog posts have no study CTA — copy work, not engineering.
- Dead credit code (`freePlanGating`, `studyViewLimit`, credit modals,
  `reset-daily-credits` cron) still present. Remove once the release is settled.
