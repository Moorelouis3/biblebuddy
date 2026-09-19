# Bible in One Year Study Notes Writer Agent

**NOT YET LIVE.** This doc describes a routine that does not exist in the
claude.ai Routines UI yet, and its queue is paused
(`data/bible-year-notes/progress.json` has `"paused": true`). Do not create
this Routine and do not flip `paused` to `false` until Louis has reviewed
Day 1 (`/blog/bible-in-one-year-day-1-study-notes`) live in production and
explicitly says to start the recurring job. This is his Notion prompt's own
gate (2026-09-18): "Do not turn on a recurring production job... until Day
1 has been verified." If `claim` ever prints `{ "paused": true, ... }`,
write and commit nothing, and stop - that is a success, not a failure.

Once Louis approves and this Routine is created, it builds the **Bible in
One Year Study Notes** series: one long form article per Bible in One Year
day, in Day order, Day 1 (already written) through Day 365. This replaces
the paused Chapter Blog Library (`docs/CHAPTER_BLOG_WRITER_AGENT.md`) as
the production priority.

**One day per run.** The target is 3 Study Notes a day, so this routine
should fire 3 times a day once created (mirror the chapter library's
`30 2,4,6 * * *` / `30 10,13 * * *` pattern, or a schedule Louis prefers).
A failed run costs one day, not all three.

**Louis does not review these before they publish**, except Day 1. The
checks below are the review from Day 2 onward. They are not optional.

---

## The one rule about state

You never decide which day to write, whether it already exists, or what
its status is. `scripts/bible-year-notes-queue.mjs` does. It reads and
writes `data/bible-year-notes/progress.json`. Do not edit that JSON by
hand, and never touch its `paused` field.

Statuses: `generating` → `quality_check` → `committed` (pushed, waiting for
the Deploy routine) → `published` (confirmed live). On failure: `failed`
(retried first on the next run). After 3 failed attempts a day becomes
`needs_louis` and the queue moves on without it.

---

## Step 0 - Setup

```
npm install
git checkout main
git pull --rebase origin main
node scripts/bible-year-notes-queue.mjs self-test
```

Never work on another branch. Never open a pull request.

## Step 1 - Confirm earlier days went live

```
node scripts/bible-year-notes-queue.mjs verify-live
```

Flips `committed` days to `published` once they return from
mybiblebuddy.net. If a day has been `committed` for more than 24 hours and
is still not live, add a note to `MARCUS_HANDOFF.md` (the Deploy routine
may be broken). Commit the progress file if it changed:
`git commit -m "Bible in One Year notes: verify live"` (no `[deploy]`),
push.

## Step 2 - Claim the next day

```
node scripts/bible-year-notes-queue.mjs claim
```

If it prints `{ "paused": true, "reason": "..." }`, stop immediately - see
the notice at the top of this file. Otherwise it prints the day (`day`,
`reading`, `themeTitle`, `slug`, `label`, `attempts`, `previousError`). It
already skips days that have an article, so a duplicate can never be
claimed. If it prints `{ "done": true }` all 365 days are finished: stop.

Commit and push the claim right away, **before writing**, so no other run
can take the same day:

```
git add data/bible-year-notes/progress.json
git commit -m "Bible in One Year notes: start Day <N>"
git push origin main
```

If `previousError` is set, this is a retry. Read the error and fix that
specific problem this time.

## Step 3 - Read the standard (every run)

1. `docs/blog-post-format.md` - voice and formatting rules (shared with
   every Bible Buddy blog post).
2. `app/blog/bible-in-one-year-day-1-study-notes/page.tsx` - the reference
   article. Match its markup, section rhythm, and voice. Do not copy its
   wording.
3. The **previous 2 Study Notes articles** in the series (whatever exists
   just before yours). Vary your openings and closings from them.
4. `lib/blogContent.ts` - the `BlogArticle` shape, specifically
   `bibleYearDay`, `bibleYearReading`, and `excludeFromGroupShare`.

## Step 4 - Build the day from the real material, in this order

This is Louis's source hierarchy, and it is not optional:

1. **The official Bible in One Year reading assigned to that day** - read
   the row for your day in `docs/bible-in-one-year-master-plan.md`
   (`reading` column). Do not assume every day is two chapters.
2. **The existing Bible in One Year script for that day** - this is the
   primary teaching foundation, not optional color. Find it via
   `DAY_SCRIPTS` in `scripts/render-bible-year-day.ts` (imports
   `lib/bibleYearDay<Word>Script.ts`, e.g. `bibleYearDayElevenScript.ts` for
   day 11; Day 1 itself is `lib/bibleYearDayOneSegments.ts`, a different
   shape - read it for the pattern, not as a file name template). Pull the
   `teaching` lines out of each `g(...)` block (or, for Day 1's shape, the
   `DAY_ONE_TEACHING_BY_REFERENCE` lines) and let them drive what your
   walkthrough sections actually say. **If a day's script is missing**
   (writing has reached day 332+, see `docs/BIBLE_YEAR_DAY_WRITER_AGENT.md`
   for where that stands), do not write the article ahead of it: run
   `node scripts/bible-year-notes-queue.mjs set <day> needs_louis "no BIOY script exists for this day yet"`
   and stop this run without committing anything.
3. **The Bible text itself** (KJV, same source as the chapter library:
   `https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/<Book>.json`)
   for the context needed to explain the reading accurately. Every verse
   you quote must be copied from that JSON, never from memory.
4. **Existing Bible Buddy blog posts** when they contain useful explanation
   or established wording for the same chapters (many early Genesis
   chapters already have a "<Book> <N> Explained" article - link to it,
   do not duplicate its walkthrough).

Do not take the day's title and ask an AI to independently generate a
generic Bible article. Convert the script from spoken material into a
natural written study; do not copy it mechanically.

## Step 5 - Write `app/blog/<slug>/page.tsx`

Same file shape as Day 1 (`BlogPostShell`, `VerseQuote`, `ArticleLink`,
`buildBlogArticleMetadata`). Category `Bible in One Year`
(`bible-in-one-year`). Slug is always `daySlug(day)` from the queue script:
`bible-in-one-year-day-<N>-study-notes`.

**Length:** a genuine 10 to 20 minute read (roughly 2,500 to 3,500+ words;
a multi-chapter day can run longer). The reading decides. Never pad to
reach a number, never cut a real point to stay under one.

**Structure** (use what the day needs; do not force empty headings):

1. Intro - meet the reader, name the day and the reading in the first 100
   words, say what the article will do for them.
2. The walkthrough - 4 to 7 H3 sections covering the day's reading **in
   order**, grounded in the script's teaching, quoting key verses with
   `VerseQuote`.
3. Hard questions - genuinely disputed or confusing points. Separate what
   the text says from how Christians interpret it; give the main views
   fairly, do not manufacture certainty.
4. Top verses from the day - 3 to 5 H3s, quote plus a short breakdown.
5. Frequently Asked Questions - only the questions this day's material
   actually raises, phrased how people search. Do not manufacture weak
   ones for SEO.
6. `🔑 Final Thoughts` - 2 or 3 takeaways specific to THIS day and one
   concrete next step.

**No CTA.** The template's end card (`BlogAuthorBox`) is the only CTA, and
`BibleYearNotesNav` (in `BlogPostShell`) adds the previous/next day links
automatically once both days' `BLOG_ARTICLES` entries exist - nothing to
wire by hand.

**Video embed (optional, never guessed):** check
`getBibleYearDayYoutubeVideoId(day)` from `lib/bibleYearDayYoutubeVideos.ts`.
If it returns an id, embed it near the top of the article body (right after
the intro) with `BlogVideoEmbed` (`components/blog/BlogVideoEmbed.tsx`),
same as `app/blog/who-is-jezebel/page.tsx` does. **If it returns null,
do not embed anything and do not invent an id.** Instead keep ONE line in
`MARCUS_HANDOFF.md` listing days waiting on a real video (same pattern as
the chapter library's banner line), updating that same line rather than
adding a block per day. Never change a YouTube video's privacy setting as
part of this routine.

**Internal links:** 2 to 5 `ArticleLink`s, pointing only at slugs that
exist in `BLOG_ARTICLES` - the matching "<Book> <N> Explained" chapter
article is often a natural one when it exists, plus the previous day's
Study Notes.

**No AI slop.** Every paragraph must belong to this specific day's reading.
No generic filler ("God has a plan," "this reminds us to trust God")
unless the verse in front of you actually says it. Vary openings and
closings from the previous days.

## Step 6 - Wire it in

Add an entry at the **top** of `BLOG_ARTICLES` in `lib/blogContent.ts`:

- `slug`, `canonicalPath: "/blog/<slug>"`
- `title`: `"Bible in One Year Day <N> Study Notes: <Reading>"` (the
  `reading` exactly as it reads in `docs/bible-in-one-year-master-plan.md`,
  e.g. "Genesis 3-4")
- `description`: under 160 characters, natural
- `category: "Bible in One Year"`, `categorySlug: "bible-in-one-year"`
- `publishedAt`: the Berlin date, `TZ=Europe/Berlin date +%F`
- `readTime`: words ÷ 200
- `image`: use the day's existing Bible in One Year cover if one exists
  (`coverImage` on that day's entry in `lib/bibleInOneYearPlan.ts`,
  e.g. `/Day1cover.png`, `/day2cover.png`); otherwise fall back to
  `/genericcoverforBIOY.png`. Do not generate new artwork - Louis said he
  will supply Study Notes specific banners later; keep the article
  compatible with the existing hero system in the meantime.
- `bibleYearDay: <N>`, `bibleYearReading: "<Reading>"`
- `groupPost`: DO NOT SET IT, and always set `excludeFromGroupShare: true`.
  Bible in One Year Study Notes never go to the Study Group - not on Day 1,
  not after Louis approves Day 1, not ever. Louis, 2026-09-19: "i dont want
  any of these day post going to the damn group... we will be making 3 a day
  i dont want to flood the group". At 3 posts a day for 365 days this series
  would bury every other thing in the group, which is exactly what he does
  not want.
  The nightly group cron
  (`app/api/cron/blog-group-post/route.ts`) independently skips anything
  with a `bibleYearDay` or the "Bible in One Year" category, so a forgotten
  flag cannot cause a flood - but set the flag anyway. Two locks, because
  this one is not recoverable: a post shared into the group is shared once
  and forever in `blog_article_shares`, and deleting the group post does not
  undo it.
  If Louis ever asks for a single specific day to be shared, he will say so
  explicitly for that day. Never infer it.

Metadata, canonical URL, Open Graph, article schema, breadcrumbs, the
sitemap entry, and previous/next day navigation all come from this entry
automatically. Do not add them by hand.

## Step 7 - Quality gate (must pass)

```
node scripts/bible-year-notes-queue.mjs set <day> quality_check
node scripts/bible-year-notes-queue.mjs check <slug>
npx tsc --noEmit
npx eslint app/blog/<slug>/page.tsx
```

`check` verifies every `VerseQuote` word for word against the KJV source,
the length, that internal links are not broken, that there is no CTA
section, that a Frequently Asked Questions section exists, that the
`BLOG_ARTICLES` entry carries the right `bibleYearDay`, and that any
`videoId` used actually traces back to `lib/bibleYearDayYoutubeVideos.ts`.
Fix every item under `problems` and rerun until `"ok": true`. Read the
`warnings` too and fix any that are real.

Then do your own read-through against this list:

- Does the article actually teach the script's material, not a generic
  rewrite of the chapter?
- Any claim (history, language, geography, dates) you are not sure of?
  Remove it.
- Any quote not taken from the KJV JSON? Replace it.
- Does the intro or ending sound like the previous days? Rewrite it.
- Did you invent a video, a banner, or a fact that is not in the source
  material? Undo it.

## Step 8 - Ship

```
node scripts/bible-year-notes-queue.mjs set <day> committed
git add app/blog/<slug>/page.tsx lib/blogContent.ts data/bible-year-notes/progress.json
git commit -m "Bible in One Year notes: Day <N> Study Notes"
git pull --rebase origin main
git push origin main
```

**No `[deploy]` tag.** The Deploy routine publishes it, and the next run's
Step 1 confirms it is live. If the rebase conflicts in `lib/blogContent.ts`,
keep both sides' entries.

## If anything fails

Research, writing, the quality gate, or `tsc` cannot be fixed within the
run:

```
git checkout -- lib/blogContent.ts
rm -rf app/blog/<slug>
node scripts/bible-year-notes-queue.mjs set <day> failed "<one plain sentence: what went wrong>"
git add data/bible-year-notes/progress.json
git commit -m "Bible in One Year notes: Day <N> failed, will retry"
git push origin main
```

Never commit a half finished or failing article. The next run retries the
failed day before moving on. After 3 failures it becomes `needs_louis`:
also append a short note to `MARCUS_HANDOFF.md` saying which day and why.

If the run is out of usage/budget, or the network is down, do the same
with the reason as the note.

## Hard limits

- Exactly one day per run.
- Never rewrite or touch an existing article, Day 1 included.
- Never change an existing slug or `publishedAt`.
- Never write a day ahead of its script (Step 4, item 2).
- Never touch `data/chapter-blog/progress.json` or its `paused` flag - the
  chapter library is a separate, preserved system.
- Only touch: `app/blog/<slug>/`, `lib/blogContent.ts`,
  `data/bible-year-notes/progress.json`, `MARCUS_HANDOFF.md`.
- Never add `[deploy]`. Never commit code that fails `tsc` or `check`.
- Never flip `paused` to `false` and never create this Routine in the
  Routines UI - that is Louis's call after he reviews Day 1.
