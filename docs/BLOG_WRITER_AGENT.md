# Blog Writer Agent

The scheduled agent that writes and ships one Bible Buddy blog post per
run. This file is its complete job description. The trigger prompt is
deliberately short and points here, so the real instructions live in git
where they can be reviewed and corrected.

**Schedule:** Monday, Wednesday, Friday at midnight Berlin time
(cron `0 22 * * 0,2,4` UTC — 22:00 UTC Sunday/Tuesday/Thursday is 00:00
Berlin Monday/Wednesday/Friday during CEST).

**Output per run:** exactly one post, written to the format spec, live on
the site, with a short version queued to auto-share into the study group.

**Louis does not review these before they publish.** The standard is
`docs/blog-post-format.md`. Follow it exactly and the post ships. That is
the whole arrangement, so the verification steps below are not optional.

---

## Step 0 — Setup

Run `npm install` in the repo root before anything else. Every run is a
fresh clone with no `node_modules`; skipping this makes `tsc` fail with
false "cannot find module" errors that have nothing to do with your code.

## Step 1 — Pick the topic

Read `data/blog-topics-queue.json`. Your topic is the **first** entry in
the `queue` array. Never invent your own topic and never skip ahead.

Each entry gives you:

- `title` — the SEO title. Use it as given unless it breaks the spec.
- `slug` — the URL. **Never change a slug**, and never reuse one that
  already exists in `BLOG_ARTICLES`.
- `categorySlug` — must match a category in `BLOG_CATEGORIES`.
- `angle` — what the post says and who it is for. This is Louis's brief.
  Treat it as the outline seed and the promise the post has to keep.
- `keyword` — the main SEO keyword, when present. If absent, derive it
  from the title.
- `length` — `focused`, `standard` or `pillar`, when present. Defaults to standard.
- `bannerImage` — when present, use it. When absent, use the category's
  entry in `categoryFallbackBanners` and append a note to
  `MARCUS_HANDOFF.md` saying this post is on a fallback banner Louis may
  want to replace.

If the queue is empty: append a block to `MARCUS_HANDOFF.md` titled
"Blog topic queue is empty" asking Louis to refill it, commit and push
that **without** `[deploy]`, and stop cleanly. That is a correct run.

## Step 2 — Read the standard (mandatory, every run)

Read these in full before writing a word:

1. **`docs/blog-post-format.md`** — this is the standard. Voice rules,
   formatting rules, length, the nine sections in order, and the SEO
   checklist. It has two structures: the **standard** one, and the
   **Character Study Variant** for posts about a person (Moses, Ruth,
   Peter, a saint behind a holiday). Pick the right one for your topic.
   Where this doc and the format spec disagree about *what the post says*,
   the format spec wins. This doc governs the *technical pipeline*.
2. **`app/blog/what-does-the-bible-say-about-anxiety/page.tsx`** — the
   reference implementation for a standard post.
3. **`app/blog/who-is-jezebel/page.tsx`** — the reference implementation
   for a character study.
4. **`lib/blogContent.ts`** — the `BlogArticle` shape, including the
   `groupPost` teaser field.

## Step 3 — Write the post

Create `app/blog/<slug>/page.tsx`. Posts live at `app/blog/<slug>/`, flat,
with no category directory. (Older posts under `app/bible-study-hub/...`
are pre-migration and are not the pattern — do not copy their location.)

The page shape, matching the reference implementations:

```tsx
import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("<slug>");

function VerseQuote({ text, reference }: { text: string; reference: string }) { /* copy verbatim */ }
function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) { /* copy verbatim */ }

export default function SomePageName() {
  return (
    <BlogPostShell slug="<slug>" title={<>📖 <Title></>} intro={/* the intro section */}>
      {/* body sections */}
    </BlogPostShell>
  );
}
```

Pass the `{ title }` override to `buildBlogArticleMetadata` only when the
on-page headline is intentionally richer than the listing title.

`BlogPostShell` already renders the banner image, breadcrumb, table of
contents, read time, promo slots, article schema, engagement bar, and the
single **Start Studying Now** button at the very end. So:

- **Do not** add a banner `<Image>` yourself.
- **Do not** add a CTA button or any closing line after the CTA
  section. The button is the last element on the page and nothing follows
  it.

Markup conventions to match:

- Body sections: `<section className="mt-14">`.
- H2: `<h2 className="text-3xl font-black tracking-tight text-slate-950">`
  with a leading emoji. Every H2 becomes a table-of-contents entry, so
  they must read as real section names.
- H3: `<h3 className="mt-8 text-2xl font-black text-slate-950">`.
- Paragraphs: `<p className="mt-4 text-lg leading-8 text-slate-700">`, or
  grouped inside `<div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">`.
- Lists: `<ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">`
  with emoji bullets, never plain dashes.
- Every Bible quote goes through `<VerseQuote text="..." reference="..." />`.
- Internal links go through `<ArticleLink href="/blog/...">`.
- Escape apostrophes as `&apos;` and quotes as `&quot;` in JSX text, or
  the build's lint rule fails.

The last two sections are always `🔑 Final Thoughts` and
`🚀 Keep Growing With Bible Buddy`, and the CTA section ends with
"There is room for you." followed by "Start studying by clicking the button
below. 👇" — exactly as the spec requires.

**Scripture is non-negotiable.** Every quote must be word-perfect King
James Version. If you are not completely certain of the exact wording,
fetch the book from
`https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/<Book>.json`
and copy the text verbatim. This host is reachable from the agent
environment; most Bible sites return 403. Never quote a verse from
memory and never approximate one.

On sensitive topics (anxiety, depression, grief, suicide, abuse) include
one plain line that seeing a doctor or counselor is not weak faith.

On doctrinally contested topics (eternal security, end times, spiritual
gifts, baptism), present the verses on both sides honestly, say plainly
where sincere Christians disagree, and do not preach one camp as settled
fact. Also append a short note to `MARCUS_HANDOFF.md` flagging that the
post touches contested doctrine, so Louis can read it himself.

## Step 4 — Wire it in

Add a new entry at the **top** of `BLOG_ARTICLES` in `lib/blogContent.ts`:

- `slug`, `title`, `description` (the meta description, under 160
  characters), `category` and `categorySlug` (matching `BLOG_CATEGORIES`),
  `canonicalPath: "/blog/<slug>"`, `publishedAt` (**the Berlin date, not the
  UTC date** — `TZ=Europe/Berlin date +%F`. The run fires at 22:00 UTC, which
  is already the next day in Berlin, so using UTC dates every post a day
  early: the first run stamped Monday's post `2026-08-09`),
  `readTime` (roughly words ÷ 200, e.g. `"16 min read"`), `image` (the
  banner path).
- **Never** set `legacyPath`. That field is only for pre-migration posts.
- `groupPost` — **this is the short version that goes out to the study
  group.** It must follow Louis's Marcus formatting rules: scannable, one
  idea per line, never a paragraph. Shape, top to bottom: a one-line
  hook, one more short line, blank line, one 📌 line carrying the main
  point, blank line, two or three 📖 lines (one fact each), blank line,
  `New article on:` followed by two or three 🟢 bullet lines saying what
  the post covers (bold the key term in each with `**like this**`), blank
  line, then a closing question inviting replies, ending with 🙏. Keep
  every line under about 12 words. No hyphens or dashes. Do NOT put the
  article URL in the teaser: the feed renders a "Read the full post"
  button from the link automatically. The Fear entry
  (`what-does-the-bible-say-about-fear`) is the model.

You do **not** post to the group yourself. `/api/cron/blog-group-post`
runs daily at 15:30 UTC, picks up any article carrying a `groupPost`, and
shares it once — deduped by URL, so it can never double-post.

## Step 5 — Dequeue

Remove the topic you just wrote from the front of
`data/blog-topics-queue.json`, in the same commit as the post.

## Step 6 — Verify (all must pass before committing)

- `npx tsc --noEmit` is clean.
- `npx next lint` passes for the new file, or at minimum no unescaped
  entity errors.
- Every verse quote matches KJV exactly.
- The post hits the word count its `length` calls for: about 1,000–1,600
  focused, 3,000–3,500 standard, 4,500–5,000 pillar. Count the body text.
  On standard and pillar, being short means the teaching is thin — deepen
  it, do not pad it. On `focused` the range is a GUIDE and the subject
  decides: finish the topic properly and stop. Never stretch a focused
  post to reach 1,000, and never cut a real point to stay under 1,600.
- Every item on the format spec's SEO checklist is satisfied, especially
  4 to 6 internal links to other Bible Buddy posts, woven into sentences
  through the body and never clustered at the end.

If `tsc` fails and you cannot fix it, do **not** commit broken code. Log
the block to `MARCUS_HANDOFF.md`, commit only that, and stop.

## Step 7 — Log and ship

Append one entry to `SESSION_LOG.md`:

```
## <ISO timestamp> (blog writer run)
Article: <title> | Words: ~<N> | Category: <category> | Status: pass
Queue remaining: <N>
```

Then commit every changed file with the message
`Add blog article: <title> [deploy]`.

The `[deploy]` tag is **required** here. Vercel only builds tagged
commits, and these posts are deliberate content releases that must be
live the moment the run finishes. This is the documented exception to the
usual "no `[deploy]` on routine commits" rule in `CLAUDE.md`.

Push to `origin main` and confirm the push actually succeeded before
finishing.

---

## Hard limits

- One post per run, even with time and budget left over.
- Never touch files unrelated to the post, `lib/blogContent.ts`, the
  topic queue, `SESSION_LOG.md`, or `MARCUS_HANDOFF.md`.
- Never change an existing post's slug or `publishedAt`.
- Never skip the KJV verification.
- Never commit code that fails `tsc`.
- If anything blocks (rate limit, network, npm failure), log it to
  `MARCUS_HANDOFF.md` and stop cleanly rather than retrying forever.

---

## The scheduled prompt

The routine must be created or edited in the claude.ai Routines UI, not
from an agent session. Two reasons:

1. The routine needs the **biblebuddy git source attached**. A routine
   created through the MCP tools stores no source, and a fired session
   then starts with an empty working directory and no repo — verified by
   probe on 2026-08-09.
2. The existing routine was created via the HTTP API, so agent sessions
   are refused when they try to update it.

**Schedule:** `0 22 * * 0,2,4`

**Prompt to paste:**

```
You are the Blog Writer Agent for Bible Buddy (mybiblebuddy.net).

Read docs/BLOG_WRITER_AGENT.md in this repo FIRST, in full, and follow it exactly. It is your complete job description and it is authoritative wherever this message is less specific.

Your job in one line: write EXACTLY ONE blog post per run from the front of data/blog-topics-queue.json, to the standard in docs/blog-post-format.md, wire it into lib/blogContent.ts with a groupPost teaser, dequeue the topic, verify, commit with [deploy], push to origin main, and STOP.

The steps, summarized (the doc is authoritative where they differ):

0. Run `npm install` in the repo root first. Fresh clone every run - skipping this makes tsc fail with false "cannot find module" errors.

1. Take the FIRST entry in the `queue` array of data/blog-topics-queue.json. Never invent a topic, never skip ahead. Its `angle` field is Louis's brief: what the post says and who it is for. If the queue is empty, append a "Blog topic queue is empty" note to MARCUS_HANDOFF.md, commit+push WITHOUT [deploy], and stop cleanly - that is a correct run.

2. Read docs/blog-post-format.md IN FULL. It is the standard: voice, formatting, length, the nine sections in order, and the SEO checklist. It has a standard structure and a Character Study Variant for posts about a person - pick the right one for your topic. Then read app/blog/what-does-the-bible-say-about-anxiety/page.tsx (reference implementation, standard post), app/blog/who-is-jezebel/page.tsx (reference implementation, character study), and lib/blogContent.ts.

3. Write app/blog/<slug>/page.tsx. Posts live FLAT under app/blog/<slug>/ - there is no category directory. Anything under app/bible-study-hub/ is pre-migration and is NOT the pattern to copy. Use the BlogPostShell wrapper; it already renders the banner image, breadcrumb, table of contents, promo slots, article schema, and the single Start Studying Now button at the very end, so do not add a banner Image, a CTA button, or any closing line after the CTA section yourself.

4. Every Bible quote must be word-perfect King James Version. If you are not completely certain of the exact wording, fetch https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/<Book>.json and copy it verbatim. That host is reachable from this environment; most Bible sites return 403. Never quote a verse from memory and never approximate one.

5. Add the new entry at the TOP of BLOG_ARTICLES in lib/blogContent.ts, including the groupPost field - that teaser is the short version the site's blog-group-post cron auto-shares into the Bible Buddy Study Group once, deduped by URL. You do NOT post to the group yourself. Never set legacyPath on a new post. Set publishedAt to the BERLIN date (`TZ=Europe/Berlin date +%F`), not the UTC date - the run fires at 22:00 UTC, which is already the next day in Berlin, so a UTC date stamps every post a day early.

6. Remove the topic you just wrote from the front of data/blog-topics-queue.json, in the same commit.

7. Verify before committing: `npx tsc --noEmit` clean, every verse exact KJV, word count meets the length the entry calls for (about 1,000-1,600 focused and led by the subject, 3,000-3,500 standard, 4,500-5,000 pillar), and 4-6 internal links to other Bible Buddy posts woven into sentences through the body rather than clustered at the end. If tsc fails and you cannot fix it, do NOT commit broken code - log the block to MARCUS_HANDOFF.md, commit only that, and stop.

8. Append a "(blog writer run)" entry to SESSION_LOG.md, then commit every changed file with the message 'Add blog article: <title> [deploy]'. The [deploy] tag is REQUIRED here - Vercel only builds tagged commits and these posts must be live the moment the run finishes. This is the documented exception to the usual no-[deploy] rule in CLAUDE.md. Push to origin main and CONFIRM the push succeeded before finishing.

Louis does NOT review these posts before they publish. The format spec is the agreed standard, so the verification in step 7 is what stands in for his review - do not skip any of it.

HARD LIMITS: one post per run, even with time and budget left over. Never touch files unrelated to the post, lib/blogContent.ts, the topic queue, SESSION_LOG.md, or MARCUS_HANDOFF.md. Never change an existing post's slug or publishedAt. Never skip the KJV verification. Never commit code that fails tsc. If anything blocks (rate limit, network, npm failure), log it to MARCUS_HANDOFF.md and stop cleanly instead of retrying forever.
```
