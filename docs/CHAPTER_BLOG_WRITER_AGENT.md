# Chapter Blog Writer Agent

**PAUSED 2026-09-18.** Louis moved the production priority to the Bible in
One Year Study Notes series (3/day, see
`docs/BIBLE_YEAR_STUDY_NOTES_WRITER_AGENT.md`). This library is preserved
exactly as it is, not deleted, and can resume later. If this routine fires
while paused: run `node scripts/chapter-blog-queue.mjs claim`. It will
print `{ "paused": true, "reason": "..." }` instead of a chapter. When you
see that, write and commit nothing, and stop. Do not treat a paused run as
a failure. Everything below this notice describes the routine as it runs
once Louis un-pauses it.

The scheduled agent that builds the **Bible Chapter Library**: one
"<Book> <N> Explained" article for every chapter of the Bible, in canonical
order, starting at Genesis 5 (Genesis 1 to 4 existed before this routine).
Louis, 2026-09-17: 5 chapters a day, no drop in quality.

**Order is not always canonical.** `progress.json` may carry
`priorityBooks`, which pulls whole books to the front of the queue — set on
2026-09-25 to `["Proverbs"]` so the Proverbs chapters publish during the
October community study. Never pick a chapter yourself: `claim` already
applies the priority, and when the priority book is finished the queue
resumes at the earliest unwritten chapter on its own (no bookmark to
restore). To change it:

```
node scripts/chapter-blog-queue.mjs priority Proverbs "why"   # set
node scripts/chapter-blog-queue.mjs priority --clear          # back to canonical
```

`status` shows `priorityBooks` and `priorityRemaining`.

**One chapter per run.** The routine fires 5 times a day, so the daily
target is met while every run stays small enough to research, write and
check one chapter properly. A failed run costs one chapter, not a whole day.

**Schedule:** cron `30 2,4,6 * * *` and `30 10,13 * * *` UTC. Runs at 02:30,
04:30 and 06:30 UTC go live with the 08:00 UTC Deploy routine; runs at 10:30
and 13:30 go live with the 16:00 UTC deploy. So the day's five articles are
published in two waves instead of all at once.

**Louis does not review these before they publish.** The checks below are
the review. They are not optional.

---

## The one rule about state

You never decide which chapter to write, whether it already exists, or what
its status is. `scripts/chapter-blog-queue.mjs` does. It reads and writes
`data/chapter-blog/progress.json`. Do not edit that JSON by hand.

Statuses: `generating` → `quality_check` → `committed` (pushed, waiting for
the Deploy routine) → `published` (confirmed live). On failure: `failed`
(retried first on the next run). After 3 failed attempts a chapter becomes
`needs_louis` and the queue moves on without it.

---

## Step 0 — Setup

```
npm install
git checkout main
git pull --rebase origin main
node scripts/chapter-blog-queue.mjs self-test
```

Never work on another branch. Never open a pull request.

## Step 1 — Confirm earlier chapters went live

```
node scripts/chapter-blog-queue.mjs verify-live
```

This flips `committed` chapters to `published` once they return from
mybiblebuddy.net. If a chapter has been `committed` for more than 24 hours
and is still not live, add a note to `MARCUS_HANDOFF.md` (the Deploy
routine may be broken). Commit the progress file if it changed:
`git commit -m "Chapter library: verify live"` (no `[deploy]`), push.

## Step 2 — Claim the next chapter

```
node scripts/chapter-blog-queue.mjs claim
```

It prints the chapter (`book`, `chapter`, `slug`, `label`, `kjvSourceUrl`,
`attempts`, `previousError`). It already skips chapters that have an
article, so a duplicate can never be claimed. If it prints `{ "done": true }`
the whole Bible is finished: stop.

Commit and push the claim right away, **before writing**, so no other run
can take the same chapter:

```
git add data/chapter-blog/progress.json
git commit -m "Chapter library: start <label>"
git push origin main
```

If `previousError` is set, this is a retry. Read the error and fix that
specific problem this time.

## Step 3 — Read the standard (every run)

1. `docs/blog-post-format.md` — voice, formatting and SEO rules.
2. `app/blog/genesis-3-explained/page.tsx` and
   `app/blog/genesis-4-explained/page.tsx` — the reference chapter articles.
   Match their markup, section rhythm and voice. Do not copy their wording.
3. The **previous 3 chapter articles** in the library (whatever exists
   just before yours). You will be checked for repeating them.
4. `lib/blogContent.ts` — the `BlogArticle` shape.

## Step 4 — Research the chapter

- Fetch the book from `kjvSourceUrl` and read **the entire chapter**, plus
  the end of the previous chapter and the start of the next one.
- Every verse you quote must be copied from that JSON, never from memory.
  Other books you quote come from
  `https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/<BookNameWithoutSpaces>.json`.
- Hebrew or Greek word meanings, dates, places, archaeology and history:
  only include what you are confident is standard and widely accepted. If
  you are not sure, leave it out. Never invent a scholar, a quote, a
  statistic or a meaning. "Scholars disagree" is allowed only when that is
  genuinely true, and then say what the main views are.

## Step 5 — Write `app/blog/<slug>/page.tsx`

Same file shape as Genesis 3 and 4 (`BlogPostShell`, `VerseQuote`,
`ArticleLink`, `buildBlogArticleMetadata`). Category `Verse Breakdowns`
(`verse-breakdowns`).

**Length:** about 2,000 to 3,000 words of explanation. The chapter decides.
A short genealogy chapter may finish at 2,000; a dense chapter may need
more. Never pad to reach a number and never cut a real point to stay under
one.

**Structure** (use what the chapter needs; do not force empty headings):

1. Intro — meet the reader, say plainly what happens in this chapter,
   "<Label> explained" in the first 100 words.
2. What happened just before — short context so a beginner is not lost.
3. The walkthrough — 4 to 7 H3 sections covering the chapter **in order**,
   quoting the key verses with `VerseQuote` and explaining them in plain
   language: who the people are, where it is, what words mean, why it
   matters, how it connects to earlier and later Scripture.
4. Hard questions — where the chapter has difficult or disputed verses,
   explain them. Separate **what the text says** from **how Christians
   have interpreted it**. Give the main views fairly when it matters; do
   not manufacture certainty, and do not hedge where the text is clear.
5. Top verses from this chapter — 3 to 5 H3s, each quote with a short
   breakdown.
6. FAQ — 6 to 10 questions phrased the way people search ("What does
   Genesis 5 mean?", "Why did people live so long in Genesis 5?").
7. `🔑 Final Thoughts` — the 2 or 3 takeaways that belong to THIS chapter
   and one concrete next step.

**No CTA.** No "Keep Growing With Bible Buddy" section, no sign-up pitch.
The page template's end card is the only CTA, and the template also adds
the previous/next chapter links automatically (`components/blog/ChapterNav.tsx`).

**Internal links:** 3 to 6 `ArticleLink`s woven into sentences, pointing
only at slugs that exist in `BLOG_ARTICLES`. The previous chapter article is
almost always one of them. Never link a chapter that does not exist yet.

**No AI slop.** Every paragraph must belong to this chapter. If a sentence
could be pasted into any other chapter article unchanged, cut it or make it
specific. Do not repeat the same lesson in different words. No generic
filler ("God has a plan", "this reminds us to trust God") unless the verse
in front of you actually says it, and then say it once. Vary openings and
closings from the previous chapters.

## Step 6 — Wire it in

Add an entry at the **top** of `BLOG_ARTICLES` in `lib/blogContent.ts`:

- `slug`, `canonicalPath: "/blog/<slug>"`
- `title`: `"<Label> Explained: <what the chapter is about>"` (under ~65 characters when possible)
- `description`: under 160 characters, natural, includes "<Label> explained"
- `category: "Verse Breakdowns"`, `categorySlug: "verse-breakdowns"`
- `publishedAt`: the Berlin date, `TZ=Europe/Berlin date +%F`
- `readTime`: words ÷ 200, e.g. `"12 min read"`
- `image`: use `"/blog-banners/<slug>.jpg"` when `public/blog-banners/<slug>.jpg`
  exists (Louis supplied Genesis 1-50, Exodus 1-40, Leviticus 1-27, Numbers
  1-36, Deuteronomy 1-34, Joshua 1-24 and Judges 1-21 by 2026-09-23). Check
  with `ls`.
  Otherwise use the verse-breakdowns fallback `"/Whatisthebiblebanner.png"`, and
  keep ONE line in `MARCUS_HANDOFF.md` listing the chapters waiting on a real
  banner, updating that same line rather than adding a block per chapter.
- `groupPost`: follow the rules in `docs/BLOG_WRITER_AGENT.md` Step 4. The
  group cron shares at most one article a night, so this never floods the group.

Metadata, canonical URL, Open Graph, article schema, breadcrumbs and the
sitemap entry all come from this entry automatically. Do not add them by hand.

## Step 7 — Quality gate (must pass)

```
node scripts/chapter-blog-queue.mjs set <slug> quality_check
node scripts/chapter-blog-queue.mjs check <slug>
npx tsc --noEmit
npx eslint app/blog/<slug>/page.tsx
```

`check` verifies every `VerseQuote` word for word against the KJV source,
the length, the internal links (and that none are broken), that at least 4
quotes come from the chapter itself, that there is no CTA section, filler
phrases, and how much of the text repeats the previous 6 chapter articles.
Fix every item under `problems` and re-run until `"ok": true`. Read the
`warnings` too and fix any that are real.

Then do your own read-through against this list:

- Any repeated paragraph or idea? Any lesson said twice?
- Any detail that belongs to a different chapter?
- Any claim (history, language, geography, dates) you are not sure of? Remove it.
- **Every number and count you state about the chapter** ("repeats eight times",
  "ten generations", ages, years, how many names): recount it from the KJV JSON
  with a quick script, not by eye. Genesis 5's first draft said "and he died"
  appears nine times; it appears eight.
- Any quote not taken from the KJV JSON? Replace it.
- Does the intro or ending sound like the previous chapters? Rewrite it.

## Step 8 — Ship

```
node scripts/chapter-blog-queue.mjs set <slug> committed
git add app/blog/<slug>/page.tsx lib/blogContent.ts data/chapter-blog/progress.json
git commit -m "Chapter library: <Label> Explained"
git pull --rebase origin main
git push origin main
```

**No `[deploy]` tag.** The Deploy routine (08:00 and 16:00 UTC) publishes
it, and the next run's Step 1 confirms it is live. Confirm the push
succeeded. If the rebase conflicts in `lib/blogContent.ts`, keep both
sides' entries.

## If anything fails

Research, writing, the quality gate or `tsc` cannot be fixed within the run:

```
git checkout -- lib/blogContent.ts
rm -rf app/blog/<slug>
node scripts/chapter-blog-queue.mjs set <slug> failed "<one plain sentence: what went wrong>"
git add data/chapter-blog/progress.json
git commit -m "Chapter library: <Label> failed, will retry"
git push origin main
```

Never commit a half-finished or failing article. The next run retries the
failed chapter before moving on. After 3 failures it becomes `needs_louis`:
also append a short note to `MARCUS_HANDOFF.md` saying which chapter and why.

If the run is out of usage/budget, or the network is down, do the same with
the reason as the note.

## Hard limits

- Exactly one chapter per run.
- Never rewrite or touch an existing article (Genesis 1 to 4 included).
- Never change an existing slug or `publishedAt`.
- Only touch: `app/blog/<slug>/`, `lib/blogContent.ts`,
  `data/chapter-blog/progress.json`, `MARCUS_HANDOFF.md`.
- Never add `[deploy]`. Never commit code that fails `tsc` or `check`.
