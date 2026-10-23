# Bible Buddy blog: traffic report

**Measured 23 October 2026.** Two sources, and they answer different questions:

- `blog_page_views` in Supabase — every visit to a blog article, any source.
  Tracking started 21 July 2026. 5,102 rows.
- Google Search Console, property `https://www.mybiblebuddy.net/` — Google
  only, and the **whole site**, not just the blog. Window: 8 Aug to 21 Oct.

Where the two disagree, it is because of those different denominators, not
because one is wrong.

---

## The verdict in four lines

The blog is growing fast and is ahead of a normal blog its age on raw traffic.

Search is working, and working better every month: 3% of visits in August,
16% in October.

Google specifically is barely contributing, and Search Console says why: **128
of your pages have been discovered by Google and never crawled.** That is not
a penalty and not a bug. It is a young site publishing faster than Google has
decided to keep up with.

Nothing here needs panic. One thing here needs a decision.

---

## Where I was wrong yesterday

You pushed back on two things and you were right on both.

**"Isn't low Google traffic normal at this age?"** Yes. Ahrefs' study of ~2
million new pages found only about 5.7% reach the top 10 within a year, and
the average top-10 page is over two years old. A four month old site getting
little Google traffic is the expected curve, not a failure. I led with it as
if it were an alarm, and it is not one.

**"Search went 3% to 16%, that seems good."** It is good. In absolute terms it
went from 10 visits in August to 461 so far in October, a 46x increase in ten
weeks, while total traffic only grew 9x. Search is your fastest growing
channel by some distance. I buried that under the Google point.

What follows is the corrected picture.

---

## 1. Month by month, all sources

From `blog_page_views`. October is 23 days; the run rate column projects the
full month.

| | Aug | Sep | Oct (23 days) | Oct run rate |
|---|---|---|---|---|
| **Views** | 309 | 1,952 | 2,837 | ~3,824 |
| **Sessions** | 130 | 1,185 | 2,183 | ~2,942 |
| Views per day | 10 | 65 | **123** | — |
| Posts live | 30 | 123 | 229 | — |
| Views per post | 10.3 | 15.9 | 12.4 | — |
| Views per session | 2.38 | 1.65 | 1.30 | — |
| Distinct posts read | 25 | 121 | 224 | — |

Views: **6.3x** Aug→Sep, then **~2x** again Sep→Oct.
Sessions: **9.1x** Aug→Sep, then **~2.5x** Sep→Oct.

Two caveats on this table. The first post went up 19 June, but view tracking
only started 21 July, so June and early July are invisible. And October is a
partial month, so treat the run rate as an estimate, not a result.

### What the trend lines say

**Sessions are growing faster than views.** More people, each reading less.
Views per session fell 2.38 → 1.65 → 1.30. That is the normal signature of
traffic shifting from a small loyal audience to a larger one arriving on a
single page from search or social.

**Views per post peaked in September.** 10.3 → 15.9 → 12.4. The chapter
library is publishing faster than traffic is growing: 106 new posts in October
alone. That is not an argument against publishing them, but it means "views
per post" will keep falling for as long as the drip runs, and it is not a
signal that the writing got worse.

**Return visits are weak.** Of 3,427 sessions ever recorded, only 214 (6.2%)
came back on another day.

---

## 2. Where the traffic comes from

| | Aug | Sep | Oct |
|---|---|---|---|
| Search | 10 (3%) | 249 (13%) | **461 (16%)** |
| Social | 82 (27%) | 756 (39%) | 702 (25%) |
| Direct / no referrer | 138 (45%) | 712 (36%) | 1,515 (53%) |
| Internal | 69 (22%) | 228 (12%) | 146 (5%) |

Social is Facebook and Pinterest almost entirely — October: Pinterest 286,
Facebook 418 across its various domains. Instagram, X and Threads are
rounding errors.

**On that 53% "direct":** it is not people typing the URL. It is referrer
stripping — in-app browsers, Facebook's mobile apps, and link shorteners. Two
referrers in the data look like something they are not:
`android-app://com.google.android.gm` (64 views) is the **Gmail app**, not
Google search, and `android-app://com.pinterest` (60) is Pinterest. Anything
that string-matches "google" will miscount the first one.

### Search, split by engine (October)

| Engine | Visits |
|---|---|
| DuckDuckGo | 147 |
| Bing | 120 |
| Yahoo | 55 |
| **Google** | **29** |

DuckDuckGo and Yahoo both run on Bing's index. So: Bing has indexed and ranked
the blog, Google largely has not. That is the thing worth explaining, and
Search Console explains it.

---

## 3. Google Search Console: the real search picture

Window 8 Aug – 21 Oct 2026. **Whole site**, app pages included.

| | Clicks | Impressions | CTR |
|---|---|---|---|
| Aug 8–31 | 108 | 887 | 12.2% |
| September | 140 | 12,983 | 1.1% |
| Oct 1–21 | 120 | 1,750 | 6.9% |
| **Total** | **368** | **15.6K** | **2.4%** |

Average position across the window: **7.2**.

### Three things in that table are misleading until you break them open

**a) The September impressions spike is junk.** One single query produced
**10,590 impressions and zero clicks**: a garbled, sentence-length string about
Margaret Sanger and birth control that has nothing to do with Bible Buddy. It
is 68% of all impressions in the whole window. Strip it out and September's
real impressions are around 2,400, and the Sep→Oct "collapse" mostly
disappears. Do not read that spike as lost traffic — there was never anything
there.

**b) Almost all the clicks are branded.** The top queries:

| Query | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| bible buddy | 143 | 536 | 26.7% | 1.4 |
| bible buddy app | 50 | 207 | 24.2% | 2.0 |
| my bible buddy | 11 | 176 | 4.7% | 1.8 |
| biblebuddy | 9 | 194 | 7.4% | 1.9 |

That is roughly 215 of 368 clicks from people who already know the name. You
rank #1-2 for your own brand, which is right and healthy, but it is not the
blog earning traffic.

**c) The homepage takes almost everything.**

| Page | Clicks | Impressions |
|---|---|---|
| / (homepage) | 344 | 1,777 |
| /login | 10 | 164 |
| /blog/men-who-walked-with-god | 6 | 289 |
| /blog/garden-of-eden-four-rivers | 3 | 722 |
| /blog/genesis-29-explained | 2 | 91 |
| /blog | 2 | 55 |
| /blog/who-was-rachel | 1 | 139 |
| /blog/who-is-leah | 1 | 126 |
| /blog/moses | 1 | 118 |

**The best performing blog post on Google earned six clicks in eleven weeks.**
Only 79 pages on the entire site have received a single Google impression.

### The pattern underneath it

The blog is not invisible to Google. It is *ranked just out of reach*.

Look at the non-branded queries. These are real searches with real intent, and
every one of them is a post you have already written:

| Query | Clicks | Impressions | Position |
|---|---|---|---|
| who was adam | 0 | 75 | 9.5 |
| who is adam in the bible | 0 | 31 | 9.4 |
| 4 rivers of eden map | 0 | 26 | 9.6 |
| who is leah | 0 | 14 | 10.6 |
| who was adam in the bible | 0 | 13 | 10.5 |
| garden of eden map with rivers | 0 | 7 | 13.9 |

Position 9 to 11 is the bottom of page one and the top of page two. It
produces impressions and almost no clicks. Hundreds more of your queries sit
at positions 40 to 90, which is pages four to nine — indexed, but effectively
invisible.

`garden-of-eden-four-rivers` is the clearest case: **722 impressions, 3
clicks.** Google is showing that page to people. They are not clicking it,
because it is sitting below nine other results.

---

## 4. The finding that actually matters

**Page indexing (last updated 16 Oct):**

| | Pages |
|---|---|
| **Indexed** | **85** |
| **Not indexed** | **191** |

And the reasons:

| Reason | Pages | What it means |
|---|---|---|
| **Discovered – currently not indexed** | **128** | Google knows the URL exists and has chosen not to crawl it |
| Alternate page with proper canonical tag | 53 | Expected and fine — the old `/bible-study-hub/` paths pointing at `/blog/` |
| Crawled – currently not indexed | 8 | Crawled, judged not worth indexing yet |
| Not found (404) | 2 | Worth a look, but trivial |

The sitemap is not the problem. `/sitemap.xml` was submitted 9 August, was
last read **today**, reports **Success**, and lists all 239 pages. Google has
the full list.

So: 229 blog posts exist, Google has been handed every one of them, and it has
indexed 85 pages of the whole site. **128 posts have never been crawled at
all.**

"Discovered – currently not indexed" at this scale almost always means one
thing on a young domain: the site is publishing faster than Google has
allocated crawl budget for it, and Google is waiting to see whether the pages
are worth its time. It is a patience-and-authority problem, not a technical
one. Bing has no such reservation, which is exactly why Bing, DuckDuckGo and
Yahoo are sending four times what Google is.

---

## 5. Compared to a new blog the same age

The blog is **four months old** (first post 19 June 2026).

A caution on this section: there is no good public dataset for "normal traffic
for a 4 month old blog". Most figures circulating are vendor estimates, not
studies. These are the most commonly cited reference points, and they should
be read as rough bands.

| Measure | Bible Buddy | Typical new blog at 4 months |
|---|---|---|
| Monthly visitors | ~2,900 sessions | 500–2,000 (vendor benchmark band for months 4–6) |
| Month on month growth | ~96% | ~6% median for small blogs |
| Posts published | 229 in 4 months | commonly 4–20 |
| Google organic | negligible | negligible — expected at this age |
| Indexed in Google | 85 pages | n/a, but usually a far higher **share** of a smaller library |

**Ahead of the field:** total traffic, growth rate, and content volume by a
very wide margin. Nearly 3,000 monthly sessions at four months is above the
top of the usual band, and doubling monthly against a ~6% median is not close.

**Behind the field, and this is the honest half:** you have published roughly
20 to 50 times as many posts as a typical new blog, and have no more Google
organic traffic to show for it than a blog with 20 posts would have. On a
per-post basis the library is badly under-earning. That is not because the
posts are bad — Bing ranks them, which proves they are rankable — it is
because Google has only looked at a third of them.

**Where you are genuinely unusual:** most four month old blogs have nothing in
any search engine. You have a working search channel already, it is just
running on Bing's index instead of Google's. That is a better starting
position than it sounds, because the content has been independently judged
good enough to rank. You are waiting on one company's crawler, not on the
writing.

---

## 6. What I would actually do

In order, and only the first two are urgent.

**1. Stop adding to the crawl queue faster than Google empties it.** 106 posts
in October, with 128 already sitting uncrawled, is the single clearest thing
in this report. Slowing the chapter library drip — or batching it — would let
Google catch up on what exists instead of extending the backlog. This is a
judgement call about the library's purpose, not a straight SEO instruction, so
it is your call rather than mine.

**2. Pick the ten posts at position 9 to 15 and improve those, not new ones.**
`garden-of-eden-four-rivers`, `who-is-leah`, `who-was-rachel`, `moses`,
`men-who-walked-with-god` are all one or two positions away from the fold.
Moving a page from 10 to 6 is worth more than publishing ten new posts that
land at 60. Titles, meta descriptions, internal links to them from stronger
pages.

**3. Request indexing by hand for the best 20 uncrawled posts.** Search
Console's URL Inspection tool allows this, and on a site this young it
genuinely helps. Tedious, but a few minutes each.

**4. Fix the two 404s**, and check what they are.

**5. Leave the Google timeline alone otherwise.** Four months is early. The
trend in the indexing chart is upward. The right move is to make the existing
library easier to justify crawling, not to wait anxiously.

---

## Appendix: concentration and reach, October

- Top post = 12% of views; top 10 posts = 36%; top 25 = 50%. Not a one-hit
  blog.
- 224 of 229 posts were read at least once. Only 5 got nothing.
- 83 posts got 10 or more views. 40 posts got one or two.
- Best post: `names-of-god-meanings`, 327 views, over half from organic search
  — the one post genuinely earning its traffic, and almost all of it from
  Bing, DuckDuckGo and Yahoo.
