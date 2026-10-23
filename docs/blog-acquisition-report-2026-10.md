# Bible Buddy blog: acquisition report

**23 October 2026.** Revised to judge the blog on one job only: **bring people
in, and get them to join Bible Buddy.** What they do after they join is the
app's scorecard, not the blog's, and nothing downstream of registration is
counted here.

Sources: `blog_page_views`, `blog_promo_events` and `profile_stats` in
Supabase, plus Google Search Console. I investigated the existing promo system
before measuring it; I have not changed anything.

---

## What already exists (investigated, not rebuilt)

The acquisition path is already fully built and already instrumented. For the
record, because it is better than I assumed:

- **`components/blog/PromoSlot.tsx`** — inline banners woven into the body of
  every post, rotating through five images, deterministically chosen per post
  so the data stays clean. Shown only to logged-out readers.
- **`components/blog/BlogAuthorBox.tsx`** — the end card under every article.
  Tracked as slot 99.
- Both link to `/start?src=blog&promo=<banner>&post=<slug>` and write an
  `impression` or `click` row into **`blog_promo_events`**.
- **`app/signup/page.tsx`** stamps `signup_source`, `signup_source_detail`
  (`blog:<post>:<promo>`), referrer, UTMs, **and first-touch source**, so a
  Pinterest visitor who reads a post and then joins is recorded as both.

So there is an end-to-end funnel already: view → promo impression → promo
click → signup, attributed down to which banner on which post. Two defects
found in it are listed in section 3. Neither needs a redesign.

---

## 1. Growth since launch

First post 19 June 2026, so the blog is **four months old**. View tracking
began 21 July, so June and the first three weeks of July are not measured.
October is 23 days; run rate projects the full month.

| | Aug | Sep | Oct (23 days) | Oct run rate |
|---|---|---|---|---|
| **Visitors (sessions)** | 130 | 1,185 | 2,183 | **~2,942** |
| **Views** | 309 | 1,952 | 2,837 | ~3,824 |
| Views per day | 10 | 65 | 123 | — |
| Articles live | 30 | 123 | **229** | — |
| Articles read at least once | 25 | 121 | 224 | — |

**In four months, from nothing:** a 229-article library, ~2,900 monthly
visitors and growing about 2x a month, with 224 of 229 articles pulling at
least one reader in October. Only five posts have never been read.

That is the headline, and it is a good one. A typical new blog at four months
is somewhere between 500 and 2,000 monthly visitors with a few dozen posts.

---

## 2. Traffic acquisition, and how fast each channel is growing

Because October is a partial month, growth is measured **per day**, which is
the fair comparison.

| Channel | Aug | Sep | Oct (23d) | Sep→Oct per day |
|---|---|---|---|---|
| **Search** | 10 | 249 | 461 | **+141%** |
| Direct / referrer stripped | 138 | 712 | 1,515 | +178% |
| Social | 82 | 756 | 702 | +21% |
| Internal | 69 | 228 | 146 | −17% |

**Search is the real growth story.** 10 visits in August, 461 in 23 days of
October — a 46x increase in ten weeks, while total traffic grew 9x. It has
gone from 3% of traffic to 16%, and it is the only channel that compounds
without further work.

**Inside social, Pinterest is growing and Facebook is flat.** Per day,
Pinterest +67% Sep→Oct, Facebook +3%. Instagram, Threads and X are rounding
errors (under 10 visits each).

**On "direct":** this is not people typing the URL. It is referrer stripping
from in-app browsers and Facebook's mobile apps. Two referrers in the data
look like something they are not: `android-app://com.google.android.gm` is
the **Gmail app** (64 views), and `android-app://com.pinterest` (60) is
Pinterest. Most of "direct" is really social.

**Search by engine, October:** DuckDuckGo 147, Bing 120, Yahoo 55, **Google
29**. DuckDuckGo and Yahoo both run on Bing's index, so the blog is ranking
in Bing and not yet in Google. Section 5 covers why and what to do.

---

## 3. Blog to app conversion: what we actually know

This is the section where the data was being misread, including by me.

### The promo funnel

| | Aug | Sep | Oct (23d) |
|---|---|---|---|
| Sessions shown a promo | 25 | 364 | 1,165 |
| Sessions that clicked | 6 | 31 | 29 |
| Click rate | 24.0% | 8.5% | 2.5% |

**78 promo clicks lifetime.** The falling click rate is mostly a mix shift,
not a failing promo: August's readers were overwhelmingly warm traffic from
Louis's own channels, October's are cold search and Pinterest visitors.

### Where the clicks actually come from

| Placement | Impressions | Clicks | CTR |
|---|---|---|---|
| **End card (slot 99)** | 1,003 | 49 | **4.89%** |
| Inline slot 0 | 1,021 | 20 | 1.96% |
| Inline slot 2 | 202 | 4 | 1.98% |
| Inline slot 1 | 675 | 5 | 0.74% |

**The end card does roughly two thirds of the work at a quarter of the
placements.** Every one of the three confirmed real signups since 6 October
came from the end card.

### Registrations: the number is small but it is finally real

Lifetime, 97 signups carry blog attribution. 94 of them were created before
6 October, when anonymous guest accounts were still on, so they are guests —
which is why every previous look at this concluded the blog converts nobody.

Since guests were turned off on **6 October**, the attribution works properly
end to end:

| Date | Post | Promo | Account |
|---|---|---|---|
| 19 Oct | why-so-many-denominations | end-card | noralwood44 |
| 20 Oct | who-was-adam | end-card | sky Buddy User |
| 22 Oct | who-is-leah | end-card | lavoradcoley |

**Funnel since 6 October: 700 sessions shown a promo → 26 clicked (3.7%) → 3
registered (11.5% of clickers).**

For scale, Bible Buddy took **185 real named signups** in that same window.
Blog was 3 of them. The rest: Other 58, Facebook 30, Instagram 26, Threads
25, Google 24, Pinterest 14.

So the honest statement is: **the blog is currently a small but working and
now-measurable acquisition channel**, two and a half weeks into being
measurable at all. Three signups is not a result yet. It is a baseline.

### Two defects found, both small

**a) `account_type` is no longer stamped on signup.** `app/signup/page.tsx`
(line 55-61) builds its profile payload without `account_type`, so every real
signup since guests were turned off lands as `NULL` — 190 of October's 375
profiles. Any report filtering `account_type = 'registered'` returns **zero**
for October, which is exactly why this channel has looked dead. One field, one
line. This is the single highest-value fix in this document, because without
it nothing else here can be tracked next month.

**b) The `end-cta` promo records clicks but no impressions.** 27 clicks, 0
impressions, so its CTR is unmeasurable and the end card's real performance is
understated. A naming gap between the click handler and the impression
handler, not a design problem.

Working correctly, for the record: first-touch attribution is populated on
153 of 185 named signups since the cutover.

---

## 4. Top-performing articles

The two lists barely overlap, and that is the most useful finding in this
report.

### Articles that attract visitors (October views)

| Views | Article |
|---|---|
| 327 | names-of-god-meanings |
| 161 | moses |
| 144 | garden-of-eden-four-rivers |
| 117 | is-anxiety-a-sin |
| 60 | a-simple-bible-highlighting-system |
| 54 | who-is-leah |

### Articles that produce Join clicks (lifetime, promo CTR)

| Clicks | Impressions | CTR | Article |
|---|---|---|---|
| 8 | 42 | **19.0%** | when-you-dont-feel-god-anymore |
| 10 | 124 | **8.1%** | a-simple-bible-highlighting-system |
| 5 | 61 | **8.2%** | is-anxiety-a-sin |
| 6 | 88 | 6.8% | who-is-leah |
| 6 | 117 | 5.1% | moses |
| 5 | 208 | 2.4% | garden-of-eden-four-rivers |
| 4 | 292 | **1.4%** | names-of-god-meanings |

### Articles that produced signups (lifetime)

a-simple-bible-highlighting-system 8 · how-do-you-know-you-are-saved 6 ·
inspiring-biblical-characters 4 · when-you-dont-feel-god-anymore 4 ·
why-does-god-feel-silent 4

### The pattern

**Your biggest traffic posts are your worst converters, and the gap is 10x.**

`names-of-god-meanings` pulled 327 views and converts at 1.4%.
`when-you-dont-feel-god-anymore` pulled a fraction of that and converts at
19%.

The difference is what the reader came for. **Reference posts** — names of
God, the four rivers, who was Adam — answer a lookup question. The reader gets
the answer and leaves satisfied; there is nothing left to want. **Felt-need
posts** — when you don't feel God anymore, is anxiety a sin, how do you know
you are saved, a highlighting system — leave the reader with an unfinished
problem, and Bible Buddy is the obvious next step.

Both kinds earn their place. Reference posts are how search finds you.
Felt-need posts are how visitors become members. The library needs both, and
right now the publishing mix is heavily weighted to the first.

---

## 5. Search opportunity, without changing the publishing schedule

Google Search Console, 8 Aug – 21 Oct, whole site.

**The blocker:** 85 pages indexed, 191 not — and **128 of those are
"Discovered – currently not indexed"**. Google has every URL (the sitemap
reports Success, 239 pages, read today) and has chosen not to crawl them yet.
On a four month old domain publishing 106 posts a month, that is a crawl
budget and trust question, not a penalty and not a bug. Bing has no such
hesitation, which is why it sends four times more traffic.

**The nearest win:** several posts already rank at positions 9 to 15 — the
bottom of page one — where they collect impressions and almost no clicks.

| Page | Impressions | Clicks | Position |
|---|---|---|---|
| garden-of-eden-four-rivers | 722 | 3 | ~10 |
| men-who-walked-with-god | 289 | 6 | — |
| who-was-rachel | 139 | 1 | — |
| who-is-leah | 126 | 1 | ~10.6 |
| moses | 118 | 1 | — |

Four things that help without touching the schedule:

1. **Internal links from the ~10 crawled pages to the 128 uncrawled ones.**
   The cheapest crawl signal there is, and it is a writing task, not an
   infrastructure one.
2. **Rewrite titles and meta descriptions on the position 9-15 pages.** Moving
   one page from 10 to 6 is worth more than ten new posts landing at 60.
3. **Manually request indexing** for the best 20 uncrawled posts in Search
   Console's URL Inspection tool. Tedious, effective on a young site.
4. **Keep publishing.** The backlog is a Google pacing problem, not a reason
   to stop building the library. Worth revisiting only if the uncrawled count
   is still climbing in December.

Note the realistic timeline: Ahrefs' study of ~2 million new pages found only
about 5.7% reach the top 10 within a year, and the average top-10 page is over
two years old. Four months in, having Bing ranking the content already is
ahead of schedule, not behind it.

---

## 6. Next priorities

Five actions, ordered. All serve visitors-in and signups-out.

**1. Add `account_type: "registered"` to the signup payload.**
`app/signup/page.tsx:55`. One line. Without it, every conversion number in
this report reads zero next month and the channel looks dead when it is not.
This is the only item here that is strictly a bug fix.

**2. Put the end card's offer on the high-traffic reference posts.** The end
card converts at 4.89% against 0.74-1.98% for the inline banners, and it
produced all three real signups. `names-of-god-meanings`,
`garden-of-eden-four-rivers`, `who-was-adam` and `moses` are where the
visitors already are and where conversion is worst. Strengthening what is
offered on those specific posts, rather than adding more placements, is the
highest-leverage change available.

**3. Shift some publishing weight toward felt-need titles.** The 19% and 8%
converters all leave the reader with an unresolved problem. The chapter
library should keep running — it is what search finds — but a felt-need post
is worth roughly ten reference posts in signups. One a week would change the
mix materially.

**4. Internal-link the uncrawled 128 from the crawled pages, and re-title the
position 9-15 posts.** Search is already the fastest-growing channel at +141%
a month; this is how it keeps compounding.

**5. Fix the `end-cta` impression tracking.** Small, but it is currently
hiding the true performance of the best-converting placement, and that is the
placement every decision above depends on.

---

## How to read this in a month

The blog's scorecard is four numbers, and they are now all measurable:

| Metric | Today |
|---|---|
| Monthly visitors | ~2,900 |
| Promo click rate | 3.7% of readers shown one |
| Registrations attributed to blog | 3 since 6 October |
| Share of all new signups | 1.6% |

Three signups is a baseline, not an outcome — the attribution has only worked
properly for 17 days. The right question in late November is whether that
number moved, and the five actions above are the ones most likely to move it.
