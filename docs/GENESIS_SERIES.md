# Genesis chapter-by-chapter blog series

Louis asked (2026-09-17, live) to keep writing "Genesis N Explained" blog
posts, matching the pattern of the existing Genesis 1 and 2 posts, at
roughly 2 chapters per session. This file is the persistent tracker so
progress survives between sessions — see docs/BLOG_LENGTH_AUDIT.md for
why that matters; the same rule applies here.

**Rule: commit and push each chapter individually the moment it's done
and verified. Never batch multiple chapters into one uncommitted
session.**

Pattern to match exactly (reference files):
- `app/blog/genesis-1-explained/page.tsx`
- `app/blog/genesis-2-explained/page.tsx`
- `app/blog/genesis-3-explained/page.tsx`

Category: Verse Breakdowns (`verse-breakdowns`). Standard length
(3,000-3,500 words). Slug pattern: `genesis-N-explained`. Verse-by-verse
walkthrough structure (not the character-study variant), 4-7 H3 sections
covering the chapter in order, Practical Tips, Top 5 Verses, FAQ,
Final Thoughts, standard CTA. Every quote fetched from
`https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/Genesis.json`
and verified against the source before publishing, never from memory.

No custom banners exist yet for chapters beyond Genesis 1 and 2 — each
new one uses the verse-breakdowns fallback (`/Whatisthebiblebanner.png`)
until Louis provides real ones. Flagged once in MARCUS_HANDOFF.md; no
need to re-flag per chapter, just note it in this file's log below.

## Progress log

- Genesis 1 — done (published 2026-09-01, expanded 2026-09-14)
- Genesis 2 — done (published 2026-09-01, expanded 2026-09-14)
- Genesis 3 — done (published 2026-09-17). The Fall, the serpent's
  temptation, the curses, the protoevangelium (3:15), the first
  sacrifice (coats of skins).
- Genesis 4 — done (published 2026-09-17). Cain and Abel, the two
  offerings, God's warning at the door, the first murder, the mark of
  Cain, Cain's line vs. the birth of Seth.
- Genesis 5 — next up. The genealogy from Adam to Noah, Enoch walking
  with God and being taken, the long lifespans.
- Genesis 6 onward — not started.

Genesis runs 50 chapters total. At ~2 a session this series is a
multi-week project, not a one-shot one — keep this file current so
whoever picks it up next (including a future instance of this same
session) knows exactly where it left off.
