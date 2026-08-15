# Bible Buddy Free Platform Migration Audit

**Date:** 2026-08-15
**Scope:** Full inspection of the Bible Buddy codebase ahead of the free-platform + publishing pivot.
**Status:** Audit only — no migration changes made.

---

## Executive summary

Six things matter more than everything else in this document:

1. **There is no single paywall. There are three independent ones**, and they were built at different times by different mechanisms. Turning off any one of them leaves the other two standing. They are: the **daily credit system** (5/day), the **`is_paid` feature locks** (382 references across 57 files), and the **"one free devotional + one day per 24 hours"** drip.

2. **The harshest limit is not the credit system — it's the devotional drip.** A free user picks *one* devotional, is walled out of the other ~25, and inside that one plan is limited to **one day per 24 hours** (`FREE_DEVOTIONAL_DAY_WINDOW_MS`). This is precisely the "16-year-old who wants to study 15 chapters on Saturday" case, and today Bible Buddy tells them to come back tomorrow.

3. **Anonymous study is already built.** `supabase.auth.signInAnonymously()` is live at `app/page.tsx:782`, `profile_stats` already carries `account_type` / `guest_started_at` / `converted_from_guest_at`, and guest→registered conversion preserves the same `user_id` — so progress survives signup with no data migration. All core *content* tables already grant `SELECT` to `anon`. Section 6 of the brief is closer to a routing problem than an architecture problem.

4. **Two gates have already been neutered and left in place** — `canFreeUserUnlockChapter()` returns `true` unconditionally and `checkStudyViewLimit()` always allows. Dead gating code is still imported and called. This is evidence the free direction has been drifting in already, and it is a hazard: it makes the codebase read as if more is gated than actually is.

5. **The Stripe webhook only handles `checkout.session.completed`.** There is no `customer.subscription.deleted` or `.updated` handling, and `proExpiresAt` is always `null`. **Consequence: every person who ever paid already has permanent Pro, and the app has never revoked access from anyone.** The customer migration is therefore far less painful than feared — nobody loses anything. But it also means **the app has no idea who is still being billed monthly by Stripe**, which is the single biggest risk in this whole pivot (see §J).

6. **There is more devotional content than assumed.** Louis estimated ~10. The real number is **26**: 8 standalone devotionals (7 × 21-day + 1 × 31-day) and 18 chapter-journey study series. The publishing pipeline has more raw material than the plan assumes.

---

## A. Current architecture

### Stack
| Layer | Technology |
|---|---|
| Framework | Next.js App Router (~388 `.tsx`, ~1,120 `.ts`) |
| Data / Auth | Supabase (Postgres + RLS + Auth + Storage) |
| Payments | Stripe (Checkout + one webhook) |
| Hosting | Vercel — **only builds commits containing `[deploy]`** |
| Analytics | Vercel Analytics + custom `master_actions` event table |
| Schema | 223 `.sql` files at repo root + `supabase/migrations/` |

**There is no `middleware.ts`.** No edge-level route protection exists. Every access decision is made either client-side inside a React component or server-side inside an individual API route. This is important for the migration: there is no single chokepoint to flip, but there is also no hidden gate outside the files listed below.

### Access control
Access is decided by `profile_stats`, which is the de-facto entitlement table:

| Column | Role |
|---|---|
| `is_paid` | **Primary access flag.** Drives every feature lock. |
| `membership_status` | `'free'` / `'pro'` — drives `UpgradeBanner` only |
| `payments` | Boolean, "has active paying Stripe subscription" |
| `pro_expires_at` | Time-limited Pro; `NULL` = permanent. **Always written as `NULL`.** |
| `daily_credits` | Remaining credits today (free users) |
| `last_credit_reset` | Date of last reset |
| `free_devotional_id` | The one devotional a free user has claimed |
| `paid_credits` | Legacy/unused in access paths |
| `account_type`, `guest_started_at`, `registered_at`, `converted_from_guest_at` | Guest/anonymous lifecycle |

### Authentication
- Supabase Auth: email/password, OAuth, **and anonymous sign-in**.
- `components/AppShell.tsx` boots the session, creates `profile_stats` on first login, and captures signup attribution (`signup_source`, UTM params, referrer).
- `HIDDEN_ROUTES` (`AppShell.tsx:72`) = `/`, `/login`, `/signup`, `/reset-password`, `/privacy`, `/terms`, `/contact` — these render without the app shell.
- Only ~12 pages hard-redirect to `/login` (settings, messages, study-groups, ambassador, upgrade). **Bible reading, notes, devotionals, blog and trivia do not.**

### Content model
Bible text, notes, devotionals and study content live in Supabase, seeded from `scripts/seed-*.ts` (~200 scripts). Large volumes of study prose additionally live as TypeScript modules in `lib/` (e.g. `lib/genesisOneSource.ts`, 51 `bibleYearDay*` files).

### Community
`study_groups`, `group_posts`, `group_members`, `group_series`, `series_reflections`, plus a substantial automated-posting layer: 14 `app/api/cron/*` routes drive weekly polls, trivia, questions, prayer-request Sundays, "who was this" Fridays, and carousel publishing. **This is the machinery §14 of the brief asks for — it already exists.**

### Blog
28 statically-coded pages under `app/blog/*` plus `lib/blogContent.ts` (474 lines) for indexing. Tracking via `api/blog/track-view`, `api/blog/like`, `api/blog/track-promo`.

### Email
`lib/emailFunnelTemplates.ts` — 14 templates on a day-1 / day-4 / day-8 conditional funnel, dispatched by cron routes.

---

## B. Every paywall / limitation

### Layer 1 — Daily credit system (5/day)

The hard numeric wall. Server-authoritative.

| File | Line | Behaviour |
|---|---|---|
| `lib/consumeCredit.ts` | 155 | `dailyCredits = 5` — hardcoded daily grant |
| `lib/consumeCredit.ts` | 186 | Returns `{ ok: false, reason: "no_credits" }` |
| `lib/consumeCredit.ts` | 116 | `if (profileStats.is_paid)` → bypass, log action, return |
| `app/api/consume-credit/route.ts` | 48–61 | Allowlist of 12 credit-gated action types |
| `app/api/consume-credit/route.ts` | 100 | **Returns 401 to unauthenticated callers** |
| `lib/creditClient.ts` | 82 | Client wrapper |
| `hooks/useCreditAction.tsx` | 43 | Shows `CreditLimitModal` on `no_credits` |

**The 12 credit-gated actions** — this is the precise answer to "who can access what":
`bible_in_one_year_day_viewed`, `chapter_notes_viewed`, `devotional_day_completed`, `devotional_day_started`, `devotional_day_viewed`, `keyword_viewed`, `note_started`, `person_viewed`, `place_viewed`, `study_notes_section_opened`, `trivia_started`, `verse_highlighted`.

That list *is* the core Bible-study experience. Five per day.

**Call sites (17 files):** `app/Bible/[book]/[chapter]/page.tsx`, `app/devotionals/[id]/page.tsx`, `app/keywords-in-the-bible/`, `app/people-in-the-bible/`, `app/places-in-the-bible/`, `app/reading-plans/bible-in-one-year/`, three `app/study-groups/[id]/*` pages, `components/BibleBuddyTvEpisodeModal.tsx`, `components/BibleReadingModal.tsx`, `components/DashboardDailyTaskCallout.tsx`, `components/DashboardJourneyExperience.tsx`, `components/DevotionalDayModal.tsx`, `components/VerseHighlighter.tsx`.

**Credit UI:** `CreditLimitModal`, `CreditEducationModal`, `CreditToast`, `CreditWarning`, `GlobalCreditFeedback`.
**Scheduled job:** `app/api/reset-daily-credits/route.ts`; also lazily reset inside `consumeCredit` itself.

### Layer 2 — `is_paid` feature locks

382 references across 57 files. The material ones:

| Location | Lock |
|---|---|
| `components/TriviaCreditGate.tsx` (via `app/bible-trivia/layout.tsx`) | Blocks **the entire `/bible-trivia` section** when `daily_credits <= 0` and not paid — bounces to `/dashboard` |
| `app/bible-trivia/books/page.tsx:194`, `people/page.tsx`, `components/TriviaGamePlayer.tsx:150` | Only `FREE_TRIVIA_BOOK_KEYS` = **genesis, exodus, leviticus, numbers** playable free |
| `components/ScrambledUpgradeGate.tsx` | Only `FREE_SCRAMBLED_BOOK_KEYS` (same 4 books) + 4 people free; all 66 books otherwise locked |
| `app/reading-plans/page.tsx:108,211` | `isLocked = isPaid === false` on reading plans |
| `app/devotionals/[id]/page.tsx:1662` | `PRO_DEVOTIONAL_UUID` — one devotional hard-locked to Pro |
| `components/UpgradeBanner.tsx` | Persistent bottom banner for `membership_status === 'free'` |

**Allowlist definitions:** `lib/bibleStudyGameCatalog.ts:127–135`.
**Upgrade UI:** `UpgradeRequiredModal`, `UpgradeBanner`, `UpgradeSuccessClient`, `app/upgrade/page.tsx` (422 lines).

### Layer 3 — One free devotional + 24-hour day drip

**The most restrictive limit in the product.** All in `app/devotionals/[id]/page.tsx`:

| Line | Behaviour |
|---|---|
| 1095–1117 | Free user: if `free_devotional_id === devotionalId` → open. If `null` → prompt to claim. **Else → upgrade wall.** |
| 155 | `FREE_DEVOTIONAL_DAY_WINDOW_MS = 24 * 60 * 60 * 1000` |
| 861 | `shouldBlockFreeWisdomDay()` — blocks the next day if the previous one was completed <24h ago |
| 920 | `isDayUnlocked()` — day N requires day N-1 complete (**applies to paid users too**) |
| 2512 | Copy: *"As a free user, you're gifted one complete plan"* |
| 1184 | `handleConfirmFreeChoice()` writes `free_devotional_id` — **a one-way choice** |

`free_devotional_id` is also written from `app/page.tsx:359`, `components/AppShell.tsx:1006`, and six places in `components/DashboardJourneyExperience.tsx`.

### Layer 4 — Authentication as a gate
`/api/consume-credit` returning **401** for unauthenticated users means every credit-gated action — i.e. the whole study experience — is unavailable to a true anonymous visitor. Reading content works; *studying* does not.

### Already-dead gates (remove during cleanup, not before)
| File | Line | State |
|---|---|---|
| `lib/freePlanGating.ts` | 60 | `canFreeUserUnlockChapter()` — `return true` unconditionally (params unused) |
| `lib/studyViewLimit.ts` | 19 | `checkStudyViewLimit()` — always `{ allowed: true }` |

---

## C. Free migration plan

Design principle: **reversible, server-first, one flag.**

### Step 1 — Introduce a kill switch (no behaviour change)
Add `lib/accessPolicy.ts`:
```ts
export const CORE_STUDY_IS_FREE = process.env.NEXT_PUBLIC_CORE_STUDY_FREE === "true";
export function hasStudyAccess() { return CORE_STUDY_IS_FREE || /* legacy checks */; }
```
Ship with the flag off. Zero user-visible change, fully reversible by env var.

### Step 2 — Neutralise credits at the server (one file)
In `lib/consumeCredit.ts`, when the flag is on, take the existing `is_paid` branch for **everyone**: still insert into `master_actions` (analytics must not regress), never decrement, never return `no_credits`. `previewCredit()` returns `{ ok: true, isPaid: true }`.

This one change disables Layer 1 everywhere, because all 17 call sites route through it. **Do not delete the call sites** — they are the analytics instrumentation.

### Step 3 — Remove the devotional drip
In `app/devotionals/[id]/page.tsx`: `shouldBlockFreeWisdomDay()` → `false`; free-user branch at 1095 → always `openDay()`. Keep writing `free_devotional_id` (it now means "primary plan", and Louis's daily-task engine reads it).

### Step 4 — Open the `is_paid` feature locks
Widen `FREE_TRIVIA_BOOK_KEYS` / `FREE_SCRAMBLED_*` to all books; `ScrambledUpgradeGate` and `TriviaCreditGate` become pass-throughs; `isLocked = false` on reading plans; retire `PRO_DEVOTIONAL_UUID`. **Keep the components** — hollow them out rather than deleting, so the diff stays revertible.

### Step 5 — Copy and UI sweep
`/upgrade` becomes a supporter/publishing page; retire `UpgradeBanner`; remove "5 credits per day" copy from `app/upgrade/page.tsx:77`, `CreditEducationModal`, `CreditLimitModal`, onboarding modals.

### Step 6 — Delete dead code (only after a stable period)
`freePlanGating.ts`, `studyViewLimit.ts`, credit modals, `reset-daily-credits` cron.

### What must NOT be touched
Stripe routes, webhook, `profile_stats` payment columns, `user_store_purchases`, `master_actions` history, `lib/server/upgradeTracking.ts`, `scripts/repair-lifetime-customers.ts`. All of it is needed for physical products, donations and supporter recognition.

---

## D. Anonymous usage plan

**Finding: this is ~70% built already.**

### What already works
| Capability | Evidence |
|---|---|
| Anonymous auth | `app/page.tsx:782` — `supabase.auth.signInAnonymously()` |
| Guest lifecycle columns | `account_type`, `guest_started_at`, `converted_from_guest_at`, `registered_at` |
| **Lossless conversion** | `components/DashboardJourneyExperience.tsx:4545+` — `supabase.auth.updateUser()` attaches email/password to the *same* `user_id`. **All progress survives. No merge logic needed.** |
| Guest analytics | `started_guest_journey` tracked throughout `api/admin/onboarding-analytics` |
| Anon-readable content | `devotionals`, `devotional_days`, `bible_chapters`, `bible_notes`, `bible_people_notes`, `places_in_the_bible_notes`, `keywords_in_the_bible` all grant `SELECT TO anon` |

This is a *better* architecture than the localStorage approach the brief proposed: a guest is a real Supabase user, so progress writes work unchanged, and RLS stays intact.

### What blocks the funnel today
1. **Guest mode is only reachable through the landing questionnaire at `/`.** A visitor deep-linked from a blog post to `/devotionals/<id>` has no way to become a guest. **This is the actual blocker for §6/§7 of the brief.**
2. `/api/consume-credit` 401s unauthenticated users (moot once §C Step 2 lands).
3. Anonymous sign-in must be enabled in the Supabase dashboard — the code has an explicit error path for it being off (`app/page.tsx:794`), which suggests it may currently be disabled in production. **Verify before planning around it.**
4. Guests are silently disposable — clearing browser storage loses the account. Needs honest messaging, not a dark pattern.

### Recommended approach
Add a lightweight `ensureGuestSession()` helper callable from any entry point, then let deep links auto-provision a guest on first study action (not on page view — don't create junk users from bounced traffic). Keep community/messaging/profile registration-gated: those genuinely need identity. Gate nothing else.

**Security note:** anonymous users are real `auth.users` rows. Confirm existing RLS policies scope on `auth.uid()` rather than `role = 'authenticated'`, and rate-limit guest creation to prevent row-flooding.

---

## E. Devotional inventory

### Standalone devotionals — `devotionals` table (8)

| # | Title | Days | Seed | Digital | Audio | Cover | Publishing readiness | Priority |
|---|---|---|---|---|---|---|---|---|
| 1 | **The Tempting of Jesus** | 21 | `seed-tempting-of-jesus.ts` (1,667 ln) | ✅ Live | ❌ | ⚠️ none dedicated | **Highest — KDP book exists** | **1** |
| 2 | Women of the Bible | 21 | `seed-women-of-the-bible.ts` (1,581 ln) | ✅ Live | ❌ | ❌ | High — SEO tie-in via Leah article | **2** |
| 3 | The Wisdom of Proverbs | 31 | `seed-wisdom-of-proverbs.ts` (10,355 ln) | ✅ Live | ❌ | ✅ ×2 | High — deepest content in repo | **3** |
| 4 | The Faith of Job | 21 | `seed-faith-of-job.ts` (911 ln) | ✅ Live | ❌ | ❌ | Medium | 5 |
| 5 | The Calling of Moses | 21 | `seed-calling-of-moses.ts` (1,007 ln) | ✅ Live | ❌ | ✅ | Medium-high | 4 |
| 6 | The Disciples of Jesus | 21 | `seed-disciples-of-jesus.ts` (1,329 ln) | ✅ Live | ❌ | ❌ | Medium | 6 |
| 7 | The Heart of David | 21 | `seed-heart-of-david.ts` (640 ln) | ✅ Live | ❌ | ❌ | Medium — thinner | 7 |
| 8 | The Transforming of Paul | 21 | `seed-transforming-of-paul.ts` (435 ln) | ✅ Live | ❌ | ✅ banner | **Lowest — thinnest seed, likely needs rewrite** | 8 |

All 8 carry `reflection_question` on every day. **None has audio.** Reformat SQL exists for 5 of 8 (`scripts/reformat-*.sql`), implying a schema/format migration that was applied unevenly — **verify format consistency in the DB before treating any as print-ready.**

### Chapter-journey study series — `BIBLE_STUDY_SERIES_CATALOG` (18)

`lib/bibleStudiesCatalog.ts`. These are group/weekly studies, distinct from the above.

| Key | Title | Weeks | Cover |
|---|---|---|---|
| `wisdom_of_proverbs` | The Wisdom of Proverbs | 31 | ✅ |
| `creation_of_the_world` | The Creation of the World | 2 | ✅ |
| `fall_of_man` | The Fall of Man | 2 | ✅ |
| `flood_of_noah` | The Flood of Noah | 6 | ✅ |
| `obedience_of_abraham` | The Obedience of Abraham | 15 | ✅ |
| `promise_through_isaac` | The Promise Through Isaac | 2 | ✅ |
| `wrestling_of_jacob` | The Wrestling of Jacob | 9 | ✅ |
| `testing_of_joseph` | The Testing of Joseph | 14 | ✅ |
| `deliverance_of_moses` | The Deliverance of Moses | 18 | ✅ |
| `covenant_at_sinai` | The Covenant at Sinai | 6 | ✅ |
| `presence_of_god` | The Presence of God | 16 | ✅ |
| `holiness_before_god` | Holiness Before God | 27 | ⚠️ |
| `wilderness_journey` | The Wilderness Journey | 14 | ✅ |
| `rebellion_in_the_wilderness` | The Rebellion in the Wilderness | 11 | ✅ |
| `promised_land_ahead` | The Promised Land Ahead | 11 | ✅ |
| `rise_of_esther` | The Rise of Esther | 10 | ✅ |
| `courage_of_daniel` | The Courage of Daniel | 6 | ✅ |
| `temptation_of_jesus` | **The Temptation of Jesus** | 5 | ⚠️ |

`testing_of_joseph` has the deepest supporting material — 15 dedicated `lib/testingOfJosephWeek*Notes.ts` files.

**Total devotional/study assets: 26.** Materially more than the ~10 assumed.

---

## F. The Temptation of Jesus

### What exists
| Asset | Location | State |
|---|---|---|
| 21-day devotional | `scripts/seed-tempting-of-jesus.ts` (1,667 ln) | ✅ Complete, transcribed from the PDF/book |
| Format migration | `scripts/reformat-tempting-of-jesus.sql` | ✅ Exists |
| **Legacy 5-day stub** | `scripts/seed-devotionals.ts` (142 ln) | ⚠️ **Duplicate risk** |
| 5-week group series | `lib/bibleStudiesCatalog.ts:167` (`temptation_of_jesus`) | ✅ In catalog |
| Blog tie-ins | `building-self-control`, `5-things-holding-men-back-from-god`, `your-body-is-a-temple`, `what-does-the-bible-say-about-zodiac-signs` | ✅ 4 articles |
| Physical book | Amazon KDP | ✅ Published (external) |
| TV/sermon assets | `public/TemptationDrDavidJeremiah.png`, `scripts/JackieHillPerryResistingTemptation.png` | Third-party media, **not usable as product covers** |

### What's missing
1. **Naming collision — fix this first.** The devotional is *"The Tempting of Jesus"*; the book and the group series are *"The Temptation of Jesus"*. Three names for one product family. Pick one (the book's — "The Temptation of Jesus") and migrate the DB title, catalog key and all references together.
2. **Duplicate-seed hazard.** `seed-devotionals.ts` creates a 5-day *"The Tempting of Jesus"*; `seed-tempting-of-jesus.ts` creates the real 21-day version. **Audit the production `devotionals` table for both rows before anything else.**
3. No dedicated cover art, no audio, no product/landing page, no stored Amazon link, no QR/deep-link scheme.

### To make it the first complete example
Free digital 21-day study (already built, just unwall it) → rename to match the book → commission cover art → add a "Get the book" module on the devotional page linking to KDP → add QR codes in the print edition pointing at `/devotionals/<id>?day=N` → run the 4 existing blog articles as the acquisition funnel. **This is the shortest path to proving the whole model, and most of it is content work, not engineering.**

---

## G. Publishing pipeline proposal

What already exists that can be reused:

| Stage | Existing asset | Automatable? |
|---|---|---|
| Source content | 26 devotionals/series in DB + `lib/` | — |
| Digital devotional | `devotionals` / `devotional_days` schema + seed-script pattern | ✅ Already a repeatable pattern |
| Audio | `scripts/generate-bible-year-day-one-audio.ts`, `lib/bibleChapterTts.ts`, `api/tts/devotional-overview`, Supabase `tts-audio` bucket | ✅ **TTS infrastructure exists and works** — point it at devotionals |
| E-book | — | ⚠️ Nothing exists. Add a `devotional → Markdown/EPUB` exporter reading from the DB |
| Print-ready | — | ⚠️ Nothing exists. Manual design, but text export is automatable |
| Product page | — | ❌ Needs building |
| Blog content | 28 articles + `lib/blogContent.ts` | Partially |
| Community study | 14 cron routes already schedule group content | ✅ **Strongest existing piece** |
| Social/media | `data/shorts-queue.json`, `shorts-schedule.json`, `bible-year-cover-briefs.json` | ✅ Queue pattern exists |

**Recommended build order:** (1) devotional → Markdown/EPUB exporter, (2) point existing TTS at devotional days, (3) product-page component + `products` table, (4) reuse the cron scheduler for monthly community studies. Steps 1–2 are small because the hard parts already exist.

**Note:** the brief's §10 suggests Content Buddy may eventually handle distribution. Keep the exporter's output format generic (Markdown + JSON manifest) so it can feed either system. **Do not couple the codebases.**

---

## H. Bible in One Year — publishing / podcast assessment

### Current state
| Asset | State |
|---|---|
| Plan structure | `lib/bibleInOneYearPlan.ts` (772 ln) — all 365 days |
| Day content | `lib/bibleYearDaysContent.ts` (2,692 ln) |
| Deep notes | **51** `lib/bibleYearDay*DeepNotes.ts` files |
| Audio | **70 of 365 days** (`data/bible-year-audio-inventory.json`, 2026-08-11) — **295 missing** |
| Audio pipeline | `lib/bibleYearAudio.ts` (897 ln), `lib/bibleYearAudioCast.ts`, `bibleYearAutoCast.ts`; per-day npm scripts wired to day 23 |
| Storage | Supabase `tts-audio`, path `bible-in-one-year/day-NNN/` |
| Covers | `lib/bibleYearApprovedCovers.ts`, `data/bible-year-cover-briefs.json` |
| Offline | `lib/bibleYearOfflinePack.ts` |
| Progress | `bible_year_day_progress` table, `api/bible-year/progress` |
| **Podcast/RSS** | ❌ **Nothing** |
| YouTube pipeline | Only indirectly — `data/shorts-*.json` |

### Assessment
- **Podcast is genuinely close for the first ~70 days.** Audio exists in a predictable bucket path. What's missing is an RSS feed generator and per-episode metadata — a small, well-defined piece of work. Spotify ingests standard RSS.
- **The 295-day audio gap is the real constraint** on both podcast and any premium BIOY product. The generation pipeline works; this is throughput, not engineering.
- **Physical BIOY companion is viable** — plan structure, notes and covers all exist; QR codes would deep-link to `/reading-plans/bible-in-one-year?day=N`.
- **Currently credit-gated:** `bible_in_one_year_day_viewed` is in the allowlist, and `app/reading-plans/bible-in-one-year/page.tsx:419` sets `isCreditLocked`. A podcast CTA saying "continue free in Bible Buddy" would today hit a credit wall. **§C Step 2 is a hard prerequisite for the podcast strategy.**

---

## I. Analytics migration

### What's tracked today
`master_actions` with **128 action types** (`lib/actionTypes.ts`) — genuinely comprehensive. Plus Vercel Analytics, `landing_analytics`, `blog_page_views`, `bible_year_day_progress`, `devotional_progress`, `email_funnel_state`/`_sends`, and a large `api/admin/*` analytics surface (retention, journey, onboarding, cohort drilldown).

### Can we measure the new metrics?
| Metric | Today |
|---|---|
| Anonymous visitors | ✅ `landing_analytics` (`account_status: "anonymous"`) |
| Study starts / chapters studied | ✅ `chapter_completed`, `bible_chapter_viewed` |
| Notes opened | ✅ `chapter_notes_viewed`, `study_notes_section_opened` |
| Trivia activity | ✅ Multiple action types |
| Devotional start / completion | ✅ `devotional_day_started` / `_completed` |
| BIOY progress | ✅ `bible_year_day_progress` |
| D1/D7/D30 retention | ✅ `api/admin/retention` |
| Referrals | ✅ `referral_signup_reward`, ambassador tables |
| Anon → account conversion | ✅ `converted_from_guest_at` |
| Product clicks / physical purchases | ❌ **Missing — needs new action types** |

**Verdict: the analytics foundation is strong and needs almost no migration.** Two changes:
1. **Preserve `master_actions` writes when removing credits.** `consumeCredit()` is currently doing double duty as gate *and* instrumentation. If it's deleted rather than short-circuited, a large share of study analytics dies with it. This is the single biggest analytics risk in the migration.
2. Add product/publishing action types (`product_page_viewed`, `book_link_clicked`, `donation_started`) and demote upgrade-conversion metrics from the primary dashboard.

Retire as primary KPIs: `upgrade_popup_viewed`, `upgrade_popup_cta_clicked`, `trial_started`, `trial_converted`, `user_upgraded`. **Keep the event types** — they remain valid for publishing/donation funnels.

---

## J. Existing customer migration

### What the code actually shows
1. **Price IDs:** monthly `price_1SzK8nGDyj3itMVLMk98v1iD`, yearly/lifetime `price_1TS1kMGDyj3itMVLMBLvYfK8` (`app/api/stripe/checkout/route.ts:14`).
2. `scripts/repair-lifetime-customers.ts` treats the yearly price ID as **lifetime**.
3. **The webhook handles only `checkout.session.completed`** (`app/api/stripe/webhook/route.ts:61`). No `customer.subscription.deleted`/`.updated`.
4. It always writes `proExpiresAt: null` → **permanent Pro**.

### Consequences
**Good news:** nobody loses anything. Every past payer already holds permanent access. There is no cliff, no downgrade event, no data to preserve that isn't already preserved. The feared "existing customers get hurt" scenario largely does not exist in the data model.

**The real risk — and it is serious:** because the app never processes subscription lifecycle events, **it does not know who Stripe is still billing.** If active monthly subscriptions exist, Stripe will keep charging people for a product that has become free, and Bible Buddy's own database cannot tell you who they are.

**This must be resolved in Stripe, not in the codebase, and it should happen before or at the moment of the public free announcement.** Charging someone for free access — even accidentally — is the one outcome that would damage trust more than the paywall ever did.

### Recommended sequence
1. **Before any code ships:** pull the live list of active subscriptions from the Stripe dashboard/API. This is read-only and safe. *(Not performed during this audit — no destructive or account-affecting action was taken, per the brief.)*
2. **Decide, then act in Stripe:** cancel-at-period-end for active subscriptions (no mid-period surprise), or cancel immediately with pro-rated refunds. Recommend **cancel at period end + email explaining why** — it reads as generous rather than abrupt.
3. **Do not delete anything** in `profile_stats`, `master_actions`, or `user_store_purchases`.
4. **Supporter recognition — options, not a decision:**
   - *(a)* `founding_supporter` boolean derived from existing payment history + a profile badge. Cheapest; uses `member_badge`, which already exists.
   - *(b)* Founding Supporter badge + first physical book free/discounted. Ties the thank-you to the new business model.
   - *(c)* Badge + permanent name listing on a supporters page. Highest emotional value, most ongoing maintenance.
   - **Recommendation: (b)**, because it converts a sunk subscription into the first customer of the publishing arm — it thanks people *and* seeds the new model.
5. **Communication:** "Bible Buddy is becoming completely free. You helped make that possible." Frame past supporters as the reason it's possible — not as people who backed the wrong horse.

---

## K. Implementation phases

| Phase | Work | Complexity | Risk | Dependencies | Systems | Tests |
|---|---|---|---|---|---|---|
| **0** | Stripe subscription audit + decision; verify anon sign-in enabled; check duplicate Tempting-of-Jesus rows | Low | **High** (billing) | — | Stripe, Supabase | Manual verification |
| **1** | Access-policy flag + neutralise credits server-side (`consumeCredit.ts`) | Low | Medium | 0 | Credits, analytics | **Assert `master_actions` still writes**; free & paid user paths; flag on/off revert |
| **2** | Remove devotional drip + one-free-plan wall | Medium | Medium | 1 | Devotionals, Louis daily tasks | Multi-devotional access; >1 day/24h; `free_devotional_id` still drives recommendations |
| **3** | Open `is_paid` feature locks (trivia, scrambled, reading plans, `PRO_DEVOTIONAL_UUID`) | Medium | Low | 1 | Games, plans | All 66 books playable; gates pass through |
| **4** | Copy/UI sweep — `/upgrade` → supporter page, retire banner, purge credit copy | Medium | Low | 1–3 | Marketing surfaces | Visual review; no "credits" strings remain |
| **5** | Deep-link guest provisioning (`ensureGuestSession()`) — blog → devotional with no wall | Medium | **Medium** (RLS, guest flooding) | 1, 0 | Auth, RLS, analytics | Anon study→signup preserves progress; RLS scoping; rate limiting |
| **6** | Devotional cleanup — resolve Tempting/Temptation naming, dedupe seeds, format consistency, covers | Medium | Medium (data) | 0 | Content, DB | Row-count & format checks pre/post |
| **7** | Temptation of Jesus publishing integration — cover, product module, KDP link, QR deep links | Medium | Low | 6 | Devotionals, products | Deep-link routing; product click tracking |
| **8** | Publishing pipeline — devotional→Markdown/EPUB exporter; devotional TTS | High | Low | 6 | Scripts, TTS, storage | Export fidelity; audio generation |
| **9** | Podcast/RSS for BIOY + continue audio backfill (295 days) | High | Low | 1, 8 | BIOY, storage | RSS validation; Spotify ingest |
| **10** | Analytics migration — product/donation action types, new primary dashboard | Medium | Low | 1 | Admin analytics | Event capture; dashboard accuracy |
| **11** | Dead-code removal (`freePlanGating`, `studyViewLimit`, credit modals, reset cron) | Low | Low | 1–4 stable | Cleanup | Full regression |

**Critical path to "Bible Buddy is free": Phases 0 → 1 → 2 → 3 → 4.** That is the announcement. Everything else can follow.

**Phase 0 is non-negotiable and comes first** — it is the only phase with real financial and trust consequences.

---

## Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Stripe keeps billing subscribers for a now-free product | **Critical** | Phase 0 before announcement |
| Deleting `consumeCredit()` silently destroys study analytics | **High** | Short-circuit, never delete; assert `master_actions` writes in Phase 1 tests |
| Duplicate "Tempting of Jesus" rows corrupt the flagship launch | Medium | Audit `devotionals` in Phase 0 |
| Guest-user row flooding from bot traffic | Medium | Provision on first *study action*, not page view; rate limit |
| Anonymous sign-in disabled in Supabase production | Medium | Verify in Phase 0 — code path at `app/page.tsx:794` suggests it may be off |
| 382 `is_paid` references — a missed lock leaves a confusing dead wall | Medium | Phases 3–4 sweep; grep audit before announcing |
| Naming: 3 names for one product family | Low | Resolve in Phase 6, before publishing work |

---

## Preserved by design

Untouched by every phase above: Stripe infrastructure, payment history, `profile_stats` payment columns, `user_store_purchases`, all `master_actions` history, existing user accounts and progress, Bible content, study notes, audio, blog, SEO, community, cron automation, ambassador system, and all Bible in One Year work.

**This is a pivot, not a rewrite.** The migration is largely *subtractive at four chokepoints* and *additive around the edges* — not a rebuild.

---

*Audit complete. No migration changes have been made.*
