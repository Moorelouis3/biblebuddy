# Holiday Blog Writer Agent

The scheduled agent that builds the **Christian Holidays** library: 60
articles on Christian holidays, Catholic feast days, saints, Advent,
Christmas, Epiphany and the church calendar. Louis, 2026-10-25: 4 a day,
written months before the days they are about, so Google has time to index
them.

**One article per run.** The routine fires 4 times a day, so the daily target
is met while every run stays small enough to research, write and check one
article properly. A failed run costs one article, not a whole day.

**Schedule:** cron `15 1,5,9,15 * * *` UTC. The 01:15 and 05:15 runs go live
with the 08:00 UTC Deploy routine; 09:15 and 15:15 go live with the 16:00 UTC
deploy. So the day's four articles publish in two waves instead of all at once.

**Louis does not review these before they publish.** The checks below are the
review. They are not optional.

---

## The one rule about state

You never decide which topic to write, whether it already exists, what its
status is, or whether today's quota is used up.
`scripts/holiday-blog-queue.mjs` does. It reads and writes
`data/holiday-blog/progress.json`. Do not edit that JSON by hand, and do not
edit the `TOPICS` list in the script.

Statuses: `generating` → `quality_check` → `committed` (pushed, waiting for
the Deploy routine) → `published` (confirmed live). On failure: `failed`
(retried first on the next run). After 3 failed attempts a topic becomes
`needs_louis` and the queue moves on without it.

### The 15 day stop

`claim` refuses to hand out work in four situations, and prints which one:

| Printed | Meaning | What you do |
|---|---|---|
| `paused` | Louis paused the series | Write nothing. Stop. This is a correct run. |
| `dayComplete` | 4 articles are already committed today, Berlin time | Write nothing. Stop. This is a correct run. |
| `done` | All 60 are written | Write nothing. Stop. Tell Louis the series is finished. |
| `stopped` | The 22 day ceiling is spent | Write nothing. Append one line to `MARCUS_HANDOFF.md`. |

The counter moves on `set <slug> committed` and nowhere else. A day is spent
when an article is actually on main, not when a run starts and not when one
fails. That is what makes a retry safe: retrying a failed topic on the same
day cannot inflate the count, and a run that crashes after claiming costs
nothing.

Target is 60 articles over 15 days. If a day only manages 3, the series simply
runs an extra day to reach 60, and `status` reports the short day under
`shortDays`. `MAX_DAYS` is the hard backstop at 22.

---

## Step 0 — Setup

```
npm install
git checkout main
git pull --rebase origin main
node scripts/holiday-blog-queue.mjs self-test
```

Never work on another branch. Never open a pull request.

## Step 1 — Confirm earlier articles went live

```
node scripts/holiday-blog-queue.mjs verify-live
```

This flips `committed` articles to `published` once they return from
mybiblebuddy.net. If an article has been `committed` for more than 24 hours
and is still not live, add a note to `MARCUS_HANDOFF.md` (the Deploy routine
may be broken). Commit the progress file if it changed:
`git commit -m "Christian Holidays: verify live"` (no `[deploy]`), push.

## Step 2 — Claim the next topic

```
node scripts/holiday-blog-queue.mjs claim
```

It prints the topic (`slug`, `title`, `track`, `length`, `shape`, `intent`,
`disputed`, `categorySlug`, `plannedDay`, `attempts`, `previousError`) or one
of the four stop reasons above. It already skips topics that have an article,
so a duplicate can never be claimed.

Commit and push the claim right away, **before writing**, so no other run can
take the same topic:

```
git add data/holiday-blog/progress.json
git commit -m "Christian Holidays: start <title>"
git push origin main
```

If `previousError` is set, this is a retry. Read the error and fix that
specific problem this time.

## Step 3 — Read the standard (every run)

1. `docs/blog-post-format.md` — voice, formatting and the nine sections. It
   has a **standard** structure and a **Character Study Variant** for posts
   about a person. The topic's `shape` field tells you which to use:
   `standard` or `character`.
2. `app/blog/what-does-the-bible-say-about-anxiety/page.tsx` (standard) and
   `app/blog/who-is-jezebel/page.tsx` (character study) — the reference
   implementations. Match their markup and rhythm. Do not copy their wording.
3. The **previous 3 articles in this series**. You will be checked for
   repeating them.
4. `lib/blogContent.ts` — the `BlogArticle` shape.

## Step 4 — Research the topic

This series is different from the chapter library in one way that matters:
**these articles make historical and doctrinal claims that are not in the
Bible**, so research is a real step, not a formality.

- **Scripture** comes from
  `https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/<BookNameWithoutSpaces>.json`,
  copied verbatim. Never from memory.
- **History, dates, church teaching and liturgical practice** come from a
  source you can name and link. Use the body that actually owns the thing you
  are describing: the Vatican's own site for Catholic doctrine and the General
  Roman Calendar, a national church for its own observances, a university or
  museum for history. Every article ends with an `ArticleSources` block listing
  at least 3, with `checkedOn` set to today.
- **If you cannot source a claim, cut it.** Never invent a date, a pope, a
  council, a quotation or a tradition.

### Two hard rules for this category

1. **Do not turn a tradition into a fact.** "The church chose December 25 to
   replace a pagan festival" is a theory with real scholarly opposition. Say
   who argues it and what the counter argument is. The quality gate warns on
   phrases like "historians agree" and "proves that" for this reason.
2. **Catholicism is a Christian tradition and is covered respectfully and
   accurately.** Bible Buddy has Catholic and Protestant readers. Explain what
   the Catholic Church actually teaches, in its own terms, before explaining
   where Protestants differ. Never imply every denomination keeps every day the
   same way, and never present one side's position as the Christian position.

Topics marked `disputed: true` must carry a `ClaimStatus` block
(`components/blog/ClaimStatus.tsx`) separating what is established from what
is not. The gate enforces this.

## Step 5 — Write `app/blog/<slug>/page.tsx`

Same file shape as the reference implementations (`BlogPostShell`,
`VerseQuote`, `ArticleLink`, `buildBlogArticleMetadata`), plus
`ArticleSources` at the foot and `ClaimStatus` when the topic is disputed.

**Length** is set by the topic's `length` field:

| `length` | Words | Used for |
|---|---|---|
| `pillar` | 3,000 to 4,000 | the big guides (what is Christmas, the liturgical calendar) |
| `standard` | 3,000 to 3,500 | the Friday teaching anchors |
| `major` | 2,500 to 3,000 | holiday and church history guides |
| `profile` | 2,000 to 2,500 | saint biographies and single feast day guides |
| `focused` | 1,000 to 1,600 | short reads written to be read on the day |

Never pad to reach a number and never cut a real point to stay under one. If
an article comes in short, the fix is more research, not more words.

**Structure** follows `docs/blog-post-format.md`. For this category that means
the nine sections, with the body carrying history and dates, the Bible
passages explained in context, the denominational differences stated plainly,
and an FAQ of 8 to 10 questions phrased the way people actually search.

**No CTA.** The page template's end card is the only CTA.

**Internal links:** 4 to 6 `ArticleLink`s woven into sentences, pointing only
at slugs that exist in `BLOG_ARTICLES`. Earlier articles in this series are
the best targets, which is the whole reason the cluster exists. Never link a
topic that has not been written yet.

**No AI slop.** Every paragraph must belong to this topic. If a sentence could
be pasted into another holiday article unchanged, cut it or make it specific.

## Step 6 — Wire it in

Add an entry at the **top** of `BLOG_ARTICLES` in `lib/blogContent.ts`:

- `slug`, `canonicalPath: "/blog/<slug>"`, `title` (the topic's title)
- `description`: under 160 characters, natural, carrying the search intent
- `category: "Christian Holidays"`, `categorySlug: "christian-holidays"`
  (unless the topic carries its own `categorySlug`)
- `publishedAt`: the Berlin date, `TZ=Europe/Berlin date +%F`
- `readTime`: the gate's word count ÷ 200, e.g. `"13 min read"`
- `image`: `"/blog-banners/<slug>.jpg"` when it exists, otherwise the nearest
  sensible existing banner. Keep ONE line in `MARCUS_HANDOFF.md` listing the
  articles waiting on real artwork, updating that same line rather than adding
  a block per article.
- `groupPost`: **required.** The weekly newsletter renders it as the lead
  read, so an article without one lands in the email as a bare title and meta
  description. Follow the shape in `docs/BLOG_WRITER_AGENT.md` Step 4 exactly:
  hook line, second short line, blank, one 📌 line, blank, two or three 📖
  lines, blank, `New article on:` and two or three 🟢 bullets with the key term
  bolded, blank, a closing question ending 🙏. No URL in the teaser.

Metadata, canonical URL, Open Graph, article schema, breadcrumbs and the
sitemap entry all come from this entry automatically. Do not add them by hand.

## Step 7 — Quality gate (must pass)

```
node scripts/holiday-blog-queue.mjs set <slug> quality_check
node scripts/holiday-blog-queue.mjs check <slug>
npx tsc --noEmit
npx eslint app/blog/<slug>/page.tsx
```

`check` verifies every `VerseQuote` word for word against the KJV source, the
word count against the topic's band, 4 to 6 working internal links, the
sources block, the `ClaimStatus` block on disputed topics, the heading
structure, the FAQ, the absence of a CTA, the `groupPost` teaser's shape, the
meta description length, and how much of the text repeats the previous 6
articles in the series. Fix every item under `problems` and re-run until
`"ok": true`. Read the `warnings` too and fix any that are real, especially
the overclaiming ones.

Then do your own read-through:

- Any claim about history, doctrine or practice that is not in your sources?
- Any date, council, pope or quotation you did not verify? Remove it.
- Does the article state a Catholic teaching in a way a Catholic would
  recognise, and a Protestant objection in a way a Protestant would?
- Any repeated paragraph or idea? Does the intro sound like the last three?

## Step 8 — Ship

```
node scripts/holiday-blog-queue.mjs set <slug> committed
git add app/blog/<slug>/page.tsx lib/blogContent.ts data/holiday-blog/progress.json
git commit -m "Christian Holidays: <title>"
git pull --rebase origin main
git push origin main
```

**No `[deploy]` tag.** The Deploy routine (08:00 and 16:00 UTC) publishes it,
and the next run's Step 1 confirms it is live. Confirm the push succeeded. If
the rebase conflicts in `lib/blogContent.ts`, keep both sides' entries.

## If anything fails

Research, writing, the quality gate, `tsc` or `eslint` cannot be fixed within
the run:

```
git checkout -- lib/blogContent.ts
rm -rf app/blog/<slug>
node scripts/holiday-blog-queue.mjs set <slug> failed "<one plain sentence: what went wrong>"
git add data/holiday-blog/progress.json
git commit -m "Christian Holidays: <title> failed, will retry"
git push origin main
```

Never commit a half-finished or failing article. The next run retries the
failed topic before moving on. After 3 failures it becomes `needs_louis`:
also append a short note to `MARCUS_HANDOFF.md`.

If the run is out of usage or budget, or the network is down, do the same with
the reason as the note.

## Hard limits

- Exactly one article per run, even with time and budget left over.
- Never rewrite or touch an existing article.
- Never change an existing slug or `publishedAt`.
- Only touch: `app/blog/<slug>/`, `lib/blogContent.ts`,
  `data/holiday-blog/progress.json`, `MARCUS_HANDOFF.md`.
- Never add `[deploy]`. Never commit code that fails `tsc` or `check`.

---

## Day one was written by hand

The four Friday email anchors are recorded in the queue as day one, committed
2026-10-25, but they were written by Louis's session rather than by this
routine, because the Friday teaching emails are written against their URLs and
could not wait for the queue to reach them:

| Slug | Friday it anchors |
|---|---|
| `thanksgiving-when-the-year-has-been-hard` | 2026-11-20 |
| `what-the-first-christmas-actually-looked-like` | 2026-12-18 |
| `christmas-day-one-thing-to-carry` | 2026-12-25 |
| `how-to-read-the-bible-in-a-year-without-quitting` | 2027-01-01 |

They are teaching posts in Christian Foundations and Bible Study Tips, not
holiday explainers, so they carry their own `categorySlug` and are exempt from
the sources requirement (`sourced: false`). Everything else in the queue is a
Christian Holidays article.

The routine's first run is **day two**, which starts with Reformation Day.

## The scheduled prompt

**Schedule:** `15 1,5,9,15 * * *`

```
You are the Holiday Blog Writer Agent for Bible Buddy (mybiblebuddy.net).

Read docs/HOLIDAY_BLOG_WRITER_AGENT.md in this repo FIRST, in full. It is your complete job description and is authoritative. Follow it exactly.

Your job in one line: write EXACTLY ONE Christian Holidays article, the next one given by `node scripts/holiday-blog-queue.mjs claim`, to the standard in docs/blog-post-format.md, pass `node scripts/holiday-blog-queue.mjs check <slug>`, tsc and eslint, commit WITHOUT [deploy] on main, push, and STOP.

Quick summary (the doc wins if anything differs):
0. npm install; git checkout main; git pull --rebase origin main; run the queue self-test.
1. verify-live, commit the progress file if it changed.
2. claim. If it prints paused, dayComplete, done or stopped, write NOTHING and stop - that is a correct run, not a failure. Otherwise commit and push the claim BEFORE writing.
3. Read docs/blog-post-format.md and the previous 3 articles in this series.
4. Research. Scripture comes from the KJV JSON source, copied verbatim, never from memory. History and doctrine come from a source you can name and link, and every article ends with an ArticleSources block of at least 3 with checkedOn set to today. If you cannot source a claim, cut it. Never invent a date, a council, a pope, a quotation or a tradition.
5. Write to the word band the topic's `length` field gives you. Cover Catholic observances respectfully and accurately and say plainly where Christians differ. Topics marked disputed MUST carry a ClaimStatus block. Never dress an old discovery or a contested theory up as settled fact.
6. Add the BLOG_ARTICLES entry at the top of lib/blogContent.ts, including the groupPost teaser - the weekly newsletter renders it as the lead read and the gate rejects an article without one.
7. Quality gate must say ok:true; fix problems and re-run. Read the warnings too.
8. set committed, commit, pull --rebase, push. No [deploy].
On any failure: discard the article files, `set <slug> failed "reason"`, commit and push only the progress file.

HARD LIMITS: one article per run; never touch existing articles; never add [deploy]; only touch app/blog/<slug>/, lib/blogContent.ts, data/holiday-blog/progress.json, MARCUS_HANDOFF.md.
```
