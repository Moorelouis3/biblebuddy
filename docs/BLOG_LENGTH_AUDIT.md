# Blog post length audit

Louis's standing job: every published post should hit the standard length
bar in `docs/blog-post-format.md` (3,000-3,500 words standard, 4,500-5,000
pillar) and roughly 15+ min read time. Many older posts predate that bar
and are thin. This file is the persistent tracker for that cleanup so
progress survives between sessions — a prior attempt (2026-09-14) fixed 8
posts and was never logged here, so the next session had no way to see
what was already done and it looked like the work had vanished.

**Rule for whoever picks this up next: after every single post you fix,
commit it immediately with `[deploy]` and update this file's status in
the same commit (or the very next one). Never batch several posts into
one uncommitted working session — if the session ends before a commit,
the work is gone with no trace.**

Word counts below are from a crude script (`docs/count-blog-words.py`)
that strips JSX tags and therefore undercounts posts using the
`<VerseQuote text="..." reference="..." />` component, since that text
lives in an attribute, not tag content. Treat the numbers as a rough
triage signal, not a final judgment — always do a real count (verse text
included) before deciding a post is actually done.

## Done (verified 3,000+ words, matches blog-post-format.md structure)

Fixed 2026-09-14 (session `01WsZJrtQjax5tfadP1EhKoF`), all `[deploy]`:

- `armor-of-god-explained` (~3,278 words)
- `st-patrick` (~3,358 words)
- `why-so-many-bible-translations` (expanded)
- `5-things-holding-men-back-from-god` (expanded)
- `what-is-hell` (~3,735 words, restructured to BlogPostShell pattern)
- `who-was-joseph` (expanded)
- `genesis-2-explained` (expanded)
- `lessons-from-the-life-of-jesus` (restructured)
- `genesis-1-explained` (expanded)

Fixed 2026-09-17 (this session):

- `how-to-read-the-bible` (~3,172 words, rewritten in full to the
  BlogPostShell/VerseQuote pattern — was 284 words on an old pre-shell
  template)

## Still short — needs the same treatment

Ordered shortest (crude count) first. Most of these are also on the
**old pre-BlogPostShell template** (plain `<h2>`/`<p>` tags, a
"Reflection Question" widget instead of the CTA, no table of contents,
no article schema) — fixing the length means a full rewrite to the
current pattern (see `app/blog/what-does-the-bible-say-about-anxiety/page.tsx`
and `app/blog/who-is-jezebel/page.tsx` as references), not just adding
paragraphs to the old template.

- [ ] building-self-control (~647)
- [ ] why-bible-study-is-hard (~688)
- [ ] salt-and-light (~700)
- [ ] the-man-who-legalized-christianity (~702)
- [ ] what-is-the-bible (~783)
- [ ] how-to-defend-the-bible (~791)
- [ ] what-is-heaven (~860)
- [ ] your-body-is-a-temple (~956)
- [ ] who-is-god-as-a-father (~1,193)
- [ ] who-was-adam (~1,468)
- [ ] men-who-walked-with-god (~1,565)
- [ ] inspiring-biblical-characters (~1,708)
- [ ] biblical-numbers-meanings (~1,838)
- [ ] who-was-deborah (~2,298)
- [ ] who-was-hagar (~2,317)
- [ ] luke (~2,427)
- [ ] what-does-the-bible-say-about-fear (~2,459)
- [ ] what-is-the-fruit-of-the-spirit (~2,467)
- [ ] is-anxiety-a-sin (~2,497)
- [ ] who-was-rahab (~2,497)
- [ ] who-was-sarah (~2,503)
- [ ] who-was-hannah (~2,506)
- [ ] paul (~2,570)
- [ ] who-was-eve (~2,584)
- [ ] what-does-the-bible-say-about-zodiac-signs (~2,593)
- [ ] garden-of-eden-four-rivers (~2,601)
- [ ] what-does-selah-mean (~2,612)
- [ ] who-was-miriam (~2,615)
- [ ] who-was-the-samaritan-woman (~2,652)
- [ ] who-is-jezebel (~2,668 — NOTE: this is the reference implementation
      for character studies per the format doc; re-check by hand before
      touching, it may already be fine and just undercounted)
- [ ] is-it-a-sin-to-doubt-god (~2,674)
- [ ] who-was-mary-magdalene (~2,693)
- [ ] who-is-leah (~2,727)
- [ ] who-was-elizabeth (~2,737)
- [ ] how-to-spend-1-hour-with-god (~2,749)
- [ ] who-was-delilah (~2,751)
- [ ] who-was-rachel (~2,763)
- [ ] who-was-bathsheba (~2,767)
- [ ] who-was-tamar (~2,803)
- [ ] did-jesus-really-exist (~2,821)
- [ ] when-you-dont-feel-god-anymore (~2,827)
- [ ] moses (~2,838)
- [ ] who-was-mary-mother-of-jesus (~2,849)
- [ ] people-who-never-heard-of-jesus (~2,854)
- [ ] who-was-esther (~2,871)
- [ ] st-valentine (~2,913)
- [ ] who-was-ruth (~2,927)
- [ ] names-of-god-meanings (~2,931)
- [ ] who-were-martha-and-mary (~2,933)
- [ ] why-so-many-denominations (~2,964)
- [ ] why-does-god-feel-silent (~2,977)
- [ ] a-simple-bible-highlighting-system (~2,981)
- [ ] who-was-rebekah (~2,991)

62 were short as of 2026-09-14; 9 are now done; ~53 remain as of this
writing, though a handful in the 2,600-2,991 range above may turn out to
already clear 3,000 once verse-quote text is counted properly — verify
each individually before rewriting it.

## Already fine (3,000+, no action needed)

christian-and-science, can-you-lose-your-salvation,
what-does-the-bible-say-about-anxiety, is-wanting-money-a-sin,
how-god-heals-a-lust-damaged-heart, is-jesus-the-only-way-to-god,
are-there-contradictions-in-the-bible, genesis-1-1-2-explained,
why-does-god-allow-suffering, how-do-we-know-the-bible-is-true,
could-you-sacrifice-your-isaac, how-do-you-know-you-are-saved,
how-to-defend-your-faith-in-jesus.
