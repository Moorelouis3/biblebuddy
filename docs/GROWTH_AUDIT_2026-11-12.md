# Bible Buddy growth audit — acquisition, conversion, retention, SEO

12 November 2026. This is the Bible Buddy half. Content Buddy owns the
platform-side numbers (reach, saves, follower counts, Facebook monetization,
Stories, per-format comparisons). Section 8 lists exactly what this half
could not see so the two reports slot together.

Nothing was changed, published or scheduled to produce this. Read-only
queries against the production database, Stripe, App Store Connect and
Google Search Console.

---

> **Correction, 12 Nov 2026.** Point 1 below originally led with a lifetime
> figure (7,217 accounts, 146 who studied seven or more days). That mixes
> Bible Buddy Beta (before 1 Oct 2026) with Bible Buddy Version 1.0 (1 Oct 2026
> on) and is not a measure of the current product. Retention is judged on
> Version 1.0 cohorts: see
> `BIBLE_BUDDY_BETA_VS_VERSION_1_RETENTION_AUDIT_2026-11-12.md`. The channel
> findings in this document are unaffected.

## 1. The short version

1. **Acquisition is not the bottleneck. Retention is.** In Version 1.0, one
   signup in four does a first study action within a week and one in ten
   comes back to study again that week, both well up on Beta. Across Beta, the group of people who study regularly sat at about 40 a
   month from January to August while monthly signups swung between 278 and
   1,363. More people at the top did not make that group bigger.
2. **Instagram is the only social channel that has produced lasting users in
   any number**, and it has faded: 254 signups in March, 99 in October, 6 in
   the first twelve days of November.
3. **Threads sends the most visitors and the fewest users.** About 6,600
   landing-page visits in 90 days, 5% clicked the button, 245 signed up, 8
   did any study, 3 are regulars today.
4. **Facebook signups are the lowest quality we have.** Since October: 40
   signups, 1 studied, 8% came back.
5. **The blog's traffic is real and compounding (129 → 3,001 sessions a month
   in three months), but it is not yet a user source.** About 46 signups in
   five weeks touched the blog, and 29 of those came from Pinterest, not
   Google. Google itself sent roughly 50 clicks to blog posts in three months.
6. **The App Store is already the largest single source of signups** — 98 of
   164 in November — with no content work at all.
7. **Revenue does not separate the channels.** Stripe has taken about $1,230
   plus €200 in total, and is now about $50 a month from legacy subscribers.

---

## 2. What the data covers, and what it does not

The brief asked for two years. Bible Buddy's own records are shorter:

| Record | Starts | Notes |
|---|---|---|
| Accounts (`profile_stats`) | 6 Jan 2026 | 7,217 rows |
| Landing page visits and button clicks | 25 May 2026 | 27,341 visits |
| Blog page views | 21 Jul 2026 | 8,499 views |
| Action log (`master_actions`) | Jan 2026 | 206,687 rows |
| Stripe charges | Aug 2025 | 151 successful |
| Search Console | last 3 months read | 11 Aug – 10 Nov |
| App Store downloads | 2 Nov 2026 | app went live 1 Nov |

**How far to trust attribution, by period:**

- **6 Oct – 12 Nov 2026: reliable.** Guests were off, every account has an
  email, first touch is recorded. 447 accounts. This is the cleanest window.
- **Aug – 5 Oct 2026: weak.** Most accounts were anonymous guests (1,981 of
  them), who rarely did anything and whose source was often lost.
- **Jan – Jul 2026: half blind.** 63% of accounts have no source at all. The
  rest is a self-reported "where did you hear about us" answer.

Two labelling faults I corrected for, both of which inflate "Google" on the
admin dashboard:

- A referrer of `accounts.google.com` is the Google sign-in button, not a
  search. 53 accounts in the clean window. Their true source is unknown.
- `com.google.android.gm` is the Gmail app. Those are email, not search.

---

## 3. Where users come from

### 3a. Clean window: 6 Oct – 12 Nov, 447 email accounts (confirmed)

| Source | Signups | Share | Did any study | Came back after 48h |
|---|---|---|---|---|
| iOS / Android app (source unknown) | 101 | 23% | 14% | 30% |
| Instagram | 62 | 14% | 13% | 21% |
| Direct / unknown | 56 | 13% | 14% | 36% |
| Unknown (Google sign-in hid it) | 53 | 12% | 19% | 34% |
| Threads | 44 | 10% | 11% | 14% |
| Pinterest | 43 | 10% | 9% | 35% |
| Facebook | 40 | 9% | 3% | 8% |
| Search (Google, Bing, DuckDuckGo) | 33 | 7% | 21% | 39% |
| Email | 14 | 3% | 21% | 29% |

"Did any study" is from profile counters (a chapter or devotional day
completed), which undercount; use it to compare rows, not as an absolute.

The same window split in two shows how fast the mix changed when the app
launched:

| | Oct 6–31 | Nov 1–12 |
|---|---|---|
| App | 3 | **98** |
| Instagram | 56 | 6 |
| Facebook | 39 | 1 |
| Threads | 37 | 7 |
| Pinterest | 31 | 12 |
| Search | 27 | 6 |
| Direct / Google sign-in / unknown | 80 | 29 |
| Email | 10 | 4 |

**Uncertain:** app signups carry no referrer, so "App" is partly App Store
discovery and partly social visitors who were sent to the store and signed
up inside the app. The two cannot be separated with what we record. Apple
reports 194 downloads for 2–10 November (about 21 a day, 79% US).

### 3b. All time, best available label (estimate for anything before October)

"7+ days" means the person studied on at least seven different days, ever.

| Source | Signups | Studied 1+ day | 7+ days | 7+ per 100 signups |
|---|---|---|---|---|
| Unknown / direct | 3,920 | 904 | 60 | 1.5 |
| Instagram | 1,476 | 411 | 45 | 3.0 |
| Facebook | 868 | 160 | 14 | 1.6 |
| Threads | 298 | 47 | 4 | 1.3 |
| Pinterest | 124 | 36 | 1 | 0.8 |
| Search | 122 | 36 | 8 | 6.6 |
| Email | 120 | 28 | 4 | 3.3 |
| App | 103 | 43 | 2 | too new |
| Google (self-reported) | 66 | 28 | 3 | 4.5 |
| Word of mouth (self-reported) | 35 | 15 | 5 | 14.3 |
| YouTube | 5 | 2 | 0 | — |
| Skool (self-reported) | 4 | — | — | — |
| Substack | 0 recorded | | | |

Word of mouth was only an answer option until July, so 35 is a floor.

### 3c. Landing page: visits against button clicks (confirmed, from 25 May)

Unique sessions / sessions that clicked "start".

| Month | Instagram | Facebook | Threads | Google | Pinterest |
|---|---|---|---|---|---|
| Jun | 366 / 149 | 503 / 183 | 232 / 83 | 105 / 33 | — |
| Jul | 514 / 231 | 999 / 251 | 191 / 46 | 100 / 37 | — |
| Aug | 371 / 187 | 1,101 / 246 | 640 / 44 | 130 / 45 | — |
| Sep | 207 / 116 | 961 / 150 | 3,421 / 187 | 133 / 63 | 206 / 59 |
| Oct | 129 / 68 | 818 / 75 | 2,073 / 127 | 138 / 61 | 133 / 46 |
| Nov 1–12 | 33 / 9 | 65 / 0 | 477 / 11 | 66 / 13 | 32 / 6 |

Instagram visitors click at about 50%. Threads visitors click at about 5%.
Facebook fell from 25% to 9%. Instagram visits have dropped every month
since July.

### 3d. Who is studying right now

51 people studied on five or more days in the last 30. Where they came from:

| Unknown / direct | Search | Instagram | App | Email | Threads | Facebook | Pinterest | Other |
|---|---|---|---|---|---|---|---|---|
| 21 | 8 | 6 | 4 | 4 | 3 | 2 | 1 | 2 |

29 of the 51 signed up in September, October or November.

---

## 4. Retention

| | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov 1–12 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| New accounts | 278 | 643 | 809 | 630 | 502 | 876 | 727 | 752 | 1,363 | 473 | 164 |
| Studied at least once | 88 | 145 | 135 | 153 | 164 | 305 | 273 | 356 | 295 | 232 | 136 |
| Studied 3+ days that month | 41 | 40 | 38 | 43 | 42 | 35 | 38 | 37 | 59 | 65 | 50 |

The bottom row is the one that matters. It did not move for eight months
while signups tripled, then rose about 60% in September and October, and has
already reached 50 in twelve days of November. That rise lines up with the
product changes of those months (guests off, Bible in One Year, the app),
not with any increase in social traffic, which fell over the same stretch.

Confirmed: the rise. Uncertain: which product change caused it.

---

## 5. The blog and search

### Traffic (confirmed, own tracking)

| Month | Sessions | Search | of which Google | Pinterest | Facebook | No referrer |
|---|---|---|---|---|---|---|
| Aug | 129 | 6 | 2 | 22 | 41 | 44 |
| Sep | 1,170 | 151 | 14 | 136 | 429 | 338 |
| Oct | 3,001 | 434 | 43 | 307 | 558 | 1,593 |
| Nov 1–12 | 1,572 | 219 | 31 | 172 | 108 | 1,054 |

- Search visits went from 6 to 434 a month in two months. Nine in ten of
  them are **Bing, DuckDuckGo and Yahoo**, not Google.
- Pinterest is the steadiest climber and is on pace for about 430 in November.
- "No referrer" is the largest bucket and is unknown: in-app browsers strip
  it, and some of it will be bots. Do not count it as direct loyalty.
- Instagram and Threads send essentially nothing to the blog (3 sessions in
  four months between them).

### Google Search Console, 11 Aug – 10 Nov (confirmed)

- 456 clicks, 23,700 impressions, average position 7.9. Daily clicks are
  flat at about 5 across the whole period.
- **396 of the 456 clicks went to the homepage.** The top four queries are
  all the brand name ("bible buddy", "bible buddy app", "my bible buddy",
  "biblebuddy") and account for 251 clicks.
- Every blog post combined earned roughly 50 Google clicks in three months.
  The best one, `men-who-walked-with-god`, earned 10.
- Posts sit at positions 7–11, which earns impressions and almost no clicks.
  `garden-of-eden-four-rivers`: 1,183 impressions, 6 clicks.
- Indexing: 172 pages indexed (85 on 23 October), 306 not indexed, of which
  187 are "Discovered – currently not indexed". Google is working through
  the backlog on its own; indexed pages doubled in three weeks.

### Blog to signup (confirmed for the clean window only)

- 46 of 447 signups (10%) entered on a blog post or clicked a blog promo.
- First touch of those 46: **Pinterest 29**, search 6, Facebook 4, unknown 7.
- Promo banners: 3,023 impressions and 79 clicks in October (2.6%).
- Of the 43 Pinterest-origin signups, 4 have studied and 1 is a regular.

### Top posts, last 90 days (views)

`names-of-god-meanings` 643 · `garden-of-eden-four-rivers` 342 ·
`a-simple-bible-highlighting-system` 270 · `is-anxiety-a-sin` 232 ·
`moses` 231 · `who-is-leah` 192 · `who-is-jezebel` 176 ·
`genesis-1-explained` 166 · `when-you-dont-feel-god-anymore` 163

From search specifically, three posts carry it: `names-of-god-meanings`
(169 search entries in 30 days), `garden-of-eden-four-rivers` (57),
`men-who-walked-with-god` (41). The chapter library is starting to register
(Genesis 10, 31, 49, 13, 14, 39, 33 each 5–10).

### Does the evidence support the blog as the primary investment?

Partly. Stated plainly:

- **Supported:** traffic is compounding without Louis's time; search is the
  fastest-growing referrer; search-origin users are the best we get per
  signup (6.6 long-term studiers per 100, against 3.0 for Instagram and 1.3
  for Threads); 8 of today's 51 regulars came from search.
- **Not yet supported:** that the blog brings users in volume. It produced
  about 9 signups a week in the clean window, most of them via Pinterest,
  and Google is delivering almost nothing to posts so far.
- **What is holding it back is Google's crawl of a young site, not effort.**
  Writing more will not speed that up.

---

## 6. Revenue

| | Successful charges | Gross |
|---|---|---|
| Aug 2025 – Jan 2026 | 6 | $123 |
| Feb – May 2026 | 70 | $374 + €200 |
| Jun – Jul 2026 (peak) | 39 | $510 |
| Aug – Oct 2026 | 34 | $215 |
| Nov 1–12 | 2 | $10 |
| **Total** | **151** | **about $1,230 + €200**, $37 refunded |

Of the 68 accounts that ever paid: Instagram 25, Facebook 8, word of mouth
5, Google 2, Threads 1, unknown 27. None came from the blog or Pinterest,
which did not exist as channels while paid plans were on sale.

Confirmed: the totals. Estimate: the split by channel (self-reported source).

---

## 7. Workload, from what this repo knows

| Activity | Louis's time | Evidence it brings studying users |
|---|---|---|
| Blog: daily post + 5 chapter posts a day | None. Cloud routines write and commit | Growing; small today |
| Email: welcome series + campaigns | Occasional oversight | 14 signups, 4 current regulars |
| App Store listing | None once live | 98 signups in 12 days |
| Auto comment replies, verse of the day, Bible Year days | None | Retention side, not measured here |
| Threads, Facebook, Pinterest, Instagram posting | Content Buddy to state | see sections 3 and 9 |

This repo has no record of hours spent on social production. Content Buddy
should supply which formats are manual.

---

## 8. What this half could not see

Hand these to Content Buddy:

- Reach, views, saves, shares, followers and per-format results on
  Instagram, Facebook, Threads and Pinterest.
- Facebook monetization revenue and its trend.
- Instagram Stories link clicks. Story links are not tagged, so they arrive
  here as plain "Instagram".
- Whether manual trending-audio carousels beat automated ones. Bible Buddy
  cannot tell one Instagram post from another: only 13 signups ever carried
  a post-level tag.
- Pinterest impressions and outbound clicks. This half only sees what
  arrived: 307 blog sessions and 133 landing visits in October.
- App Store source breakdown (search vs browse vs web referral). The
  read-only key covers sales reports, not App Analytics.

---

## 9. Answers to the twelve questions, from this half's evidence

| # | Question | Answer | Confidence |
|---|---|---|---|
| 1 | Is Instagram worth significant personal effort? | It was the best social source (45 long-term users, 25 of 68 payers, 50% landing click rate). It now sends 33 visits in twelve days. The audience quality is real; the volume is gone. Not at current output. | Medium |
| 2 | Should Content Buddy run Instagram automatically? | Yes. Nothing here shows personal effort is what produced the good months. | Medium — needs Content Buddy's format data |
| 3 | Gold cinematic carousels worth it? | Cannot be answered here. | Content Buddy |
| 4 | Black text format better? | Cannot be answered here. | Content Buddy |
| 5 | Reels worth it for reach? | Reach is not visible here. What arrives from Facebook, where reels go, is the worst-retaining traffic we have. | Low |
| 6 | Stories worth Louis's time? | No evidence either way; untagged. | Content Buddy |
| 7 | Is Threads efficient? | Efficient at visits, poor at users. 6,600 visits → 245 signups → 8 studied → 3 regulars. | High |
| 8 | Facebook gets auto-repurposed reels only? | Yes. 868 signups, 14 long-term; since October 1 in 40 studied. Its case rests entirely on monetization revenue, which is Content Buddy's number. | High on users |
| 9 | Is Pinterest delivering meaningful traffic? | Meaningful to the blog (307 sessions in October, rising) and it is the origin of 29 of the 46 blog signups. Not yet meaningful in studying users: 1 regular. | High |
| 10 | Is the blog becoming a stronger source? | In traffic, clearly. In users, not yet. In Google specifically, barely started. | High |
| 11 | Which channels bring users? | Today: the App Store first, then Instagram, Pinterest-via-blog, Threads, search. By users who stay: search, word of mouth, Instagram, email. | High for Oct–Nov |
| 12 | What can Louis stop? | See section 10. | |

---

## 10. Recommended allocation

| Area | Verdict | Why |
|---|---|---|
| **Bible Buddy app and product** | **PRIORITIZE** | The regular-studier count ignored a tripling of signups for eight months, then rose 60% when the product changed. 98% of signups never become regulars. This is where an hour buys the most. |
| **Blog and SEO** | **PRIORITIZE, but it needs attention, not production** | It already runs itself. Search users are the best per signup. The constraint is Google's crawl, which time fixes. No more writing time is justified by the evidence. |
| **App Store presence** | **PRIORITIZE** (part of product) | 60% of November signups with zero content work, and the highest first-study rate of any source (42%). |
| **Email and community** | **MAINTAIN** | Automated. Small in signups, but email-origin users are among the better retained. |
| **Pinterest** | **AUTOMATE** | The one social channel that feeds the blog, and it is still climbing. Not worth hand work at 43 signups in five weeks. |
| **Instagram** | **AUTOMATE** | Best historical audience, collapsing volume. Keep it alive cheaply. Whether any manual format earns an exception is Content Buddy's call to evidence. |
| **Threads** | **MAINTAIN (automated only)** | Cheap to run, so no reason to switch it off, but 3 regulars from 6,600 visits does not justify personal time. |
| **Facebook** | **REDUCE to automated repurposing** | Worst user quality on record. Keep only if monetization revenue pays for itself. |
| **YouTube, Skool, Substack** | **STOP counting on them** | 5, 4 and 0 recorded signups. |

### What Louis can stop without losing much

- Daily personal posting on Threads and Facebook. Together they produced 5
  of today's 51 regulars.
- Any hand-made content whose purpose is sending people to the landing page.
  Social visits to it are down about 45% from October and signups moved to
  the app anyway.
- Writing or reviewing blog posts for volume. The library is ahead of what
  Google has crawled.

### What should keep running on its own

Blog routines, the chapter library, Pinterest, the welcome email series,
automated Threads and Instagram posting, auto comment replies.

### What deserves his personal attention

Why three in four Version 1.0 signups do not do a first study action in
their first week. That, not reach, is what limits the number of regulars.

---

## 11. Confidence summary

**Confirmed:** signup counts and sources from 6 October; landing visits and
click rates from 25 May; blog sessions and referrers; Search Console
figures; Stripe totals; App Store downloads; monthly studying users.

**Estimates:** anything by channel before October (63% of Jan–Jul accounts
have no source); revenue by channel; "did any study" percentages in 3a.

**Unknown:** where app signups first heard of Bible Buddy; the 1,593
no-referrer blog sessions; what caused the September–October rise in
regulars; everything in section 8.

*Scripts used are throwaway and were not added to the repo. Tables read:
`profile_stats`, `landing_page_events`, `blog_page_views`,
`blog_promo_events`, `master_actions`, `user_signups`.*
