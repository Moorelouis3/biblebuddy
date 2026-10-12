# Christian News Format

The third article structure on this blog, alongside the standard teaching post
and the Character Study Variant in `docs/blog-post-format.md`. Added
2026-10-12.

Read `docs/blog-post-format.md` first. **Every voice rule and formatting rule
in it still applies exactly as written**: short lines, one thought per line,
emoji markers, bold the key phrases, plain words, talk to one reader, no
hyphens in the prose, KJV for every verse, `ArticleLink` for internal links.
What changes here is the *shape* of the article and the *standard of proof*.

Use this structure when the subject is a discovery, an artefact, a piece of
research, or a claim that circulates among Christians. Category:
`christian-news`.

---

## The two rules that make this category worth having

**1. No old discovery is presented as breaking news.**

Most of these subjects are decades or centuries old. The Shroud has been
argued over since the 1350s. Laminin's cross shape came out of electron
micrographs in 1981. That history is the opening fact, not a buried one. The
article says plainly when the thing happened and what is new, if anything, right
now. Never "scientists have just discovered" about something from 1996.

**2. A disputed claim stays disputed in our wording.**

- Default verbs: "researchers say", "the team reports", "not yet confirmed".
- Every claim is attributed to a named person or institution. If we cannot
  name who said it, it does not go in the article.
- Never upgrade a hypothesis into a finding, in either direction. "Carbon
  dating has been proven wrong" and "the Ark has been found" are the same
  mistake wearing different clothes.
- When a source we are citing is advocating rather than reporting, say so.
- The closing honesty, in one line somewhere in the article: Christian faith
  does not depend on this being confirmed. Say it, because it is true and
  because it is the difference between teaching and marketing.

An article that cannot fill the "still uncertain" box is not news. It is
teaching, and it belongs in another category.

---

## Structure, in this exact order

### 1. Title
Plain and searchable. The real question a person types. No hype words, no
all-caps, no "SHOCKING" or "FINALLY". A question title is fine
("Have They Found Noah's Ark?") as long as the article actually answers it.

### 2. Intro (4 to 6 short paragraphs, 250 to 350 words)
Meet the reader where the claim reached them: a video, a reel, a group chat, a
sermon illustration. Then give the honest answer early, in a bolded 📌 line,
the same way the standard format front-loads the answer. Do not make a reader
scroll 1,200 words for the verdict. Say what the article will separate out:
what is established, what is claimed, what is still open.

### 3. The short version (3 to 5 lines, in a styled block)
The whole story for someone who reads nothing else. Written so it could be
lifted straight into the Tuesday newsletter.

### 4. What it actually is (200 to 350 words)
The object, the site, the molecule, the manuscript. Where it is, how big, how
old, who holds it. Plain description before any argument about it.

### 5. What is being claimed, and who is claiming it (300 to 500 words)
Names, institutions, dates. The strongest honest version of the claim, put the
way its own advocates would put it. Not a strawman.

### 6. What the evidence actually shows (400 to 700 words)
The research itself. Methods in plain words. Where findings point one way and
where they point the other. This is the section that earns the category.

### 7. ✅ Established / ⚠️ Still uncertain
Use `components/blog/ClaimStatus.tsx`. Both lists non-empty. One claim per
line, stated flatly. Nothing in the "established" list that a named source
could not be cited for.

### 8. What the Bible actually says (300 to 500 words)
Where Scripture speaks to this, quoted word-perfect KJV through `VerseQuote`,
read in context. Equally important: **where Scripture says nothing.** Genesis
does not name a modern mountain. Colossians is not about a protein. Saying so
is the article's credibility.

### 9. Where this goes next (150 to 250 words)
What would actually settle it, who is working on it, and when results are
expected. If the honest answer is "probably nothing will settle it", say that.

### 10. Frequently Asked Questions (5 to 8 questions, 400 to 600 words)
The exact questions people type. Answer each in 3 to 5 sentences, including
when the honest answer is "nobody knows" or "that part is a legend".

### 11. 🔑 Final Thoughts (150 to 250 words)
Two or three takeaways, then one clear next step inside Bible Buddy - a
chapter's study notes, a related article, a reading plan. One link, woven into
a sentence.

### 12. 📚 Sources
Use `components/blog/ArticleSources.tsx` with a `checkedOn` date. Prefer, in
order: the original paper, the university or museum or research organisation,
then reputable reporting clearly labelled as reporting. Include the sources
that disagree with the claim. A news article with only friendly sources is an
advert.

There is no CTA section. The page template renders the Bible Buddy end card,
same as every other post.

---

## Length

1,600 to 2,200 words. These are explainers, not pillar guides. If a subject
genuinely needs more, take it; never pad to reach a number.

---

## Dates

- `publishedAt` and `updatedAt` now render on the page, in the meta row under
  the title (`components/blog/BlogPostShell.tsx`). News without a visible date
  is not news.
- When research develops, **update the article rather than writing a second
  one**: bump `updatedAt` in `lib/blogContent.ts`, and add a dated line
  inside the section it affects:

  ```
  📌 <strong>Update, 14 March 2027:</strong> the lab results came back ...
  ```

- Never silently rewrite what the article previously said. The archive people
  can keep learning from is the whole point of the category, and an article
  that quietly changes its mind teaches nobody anything.

---

## Publishing gate

**Christian News does not auto-ship.** The blog writer agent publishes
teaching posts without review; a research article that misstates what a real
university found is a different class of mistake.

So:

1. Write the page and register it in `BLOG_ARTICLES` with
   `excludeFromGroupShare: true`. The page is live and reviewable, and
   `/api/cron/blog-group-post` will not share it.
2. Add no `groupPost` teaser yet.
3. Append a note to `MARCUS_HANDOFF.md` saying the article is waiting for
   Louis to read, and list anything still needing verification.
4. Commit **untagged**. It goes live at the next scheduled deploy.
5. Louis removes the flag and adds a `groupPost` teaser when he is happy with
   it. That is the approval.

Cadence: publish when there is something real. There is no weekly quota.
