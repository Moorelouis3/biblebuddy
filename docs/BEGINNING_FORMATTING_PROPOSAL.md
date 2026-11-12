# The Beginning of Everything: why it reads as a wall of text

Investigation written 2026-11-12. **Louis approved option (a) the same day and
it is applied: all 21 rows are live.** The rest of this file is the
investigation as it was put to him, kept because it is the record of what the
problem was and why the fix is safe.

**What was done.** `scripts/build-beginning-formatting.ts` rebuilt the 21 days
from the print interior and proved, letters and digits only, that no word
changed. `scripts/apply-beginning-book-days.ts` backed the rows up to
`data/beginning-devotional-days-backup-2026-11-12.json` and wrote
`devotional_text` on all 21. `npm run verify:beginning` guards it.
Checked live afterwards on the guide page, all 21 days: 1-2 headings each,
3-14 Scripture quote cards, 45-66 paragraphs, bold and italic rendering, no
letter-spaced runs left, no raw markdown leaking as text, no horizontal
overflow, and the widest unbreakable word on any day still fits a 375px phone
column. Other studies untouched.

The renderer decision below, option (b), was **not** done and is still open.

## The short version

Nothing is broken in the parser or the renderer. The renderer already does
everything Proverbs of Wisdom shows — headings, Scripture quote cards, lists,
bold, italic, dividers. **The Beginning of Everything simply has no formatting
stored in it.** Not one `#`, `*`, `>` or `**` in any of the 21 days.

It is the only study in the app like that:

| | days with formatting markup |
|---|---|
| The Beginning of Everything | **0 of 21** |
| The Wisdom of Proverbs | 31 of 31 |
| every other study (24 of them, 377 days) | all of them |

The reason is an import that went wrong. The study's text was taken out of the
print book, and the print book letter-spaces its headings and its Scripture
references — `I N T H E B E G I N N I N G G O D`. The import carried those
spaces through as literal characters and threw away the structure around them.
So the headings are still in the text, sitting mid-sentence, spelled out one
letter at a time, glued to the paragraph that follows. There are 216 of them
across the 21 days, and zero in any other study.

Here is Day 1 exactly as it is stored today (one paragraph of 1,411
characters, the break marks are mine):

> …We have heard about God. Now we are going to read and understand for
> ourselves. This is where we begin. ⟨heading⟩ I N T H E B E G I N N I N G
> G O D ⟨/heading⟩ “In the beginning God created the heaven and the earth.”
> ⟨ref⟩ G E N E S I S 1 : 1 ⟨/ref⟩ Stop at the fourth word. In the beginning
> God. Before anything else is mentioned, God is already there…

A section heading, a Scripture quote card and its reference, all flattened into
the middle of a running paragraph. Every day looks like this.

## Root cause

Three separate things were lost in the import, and all three are why it reads
flat:

1. **Paragraph breaks.** The print book breaks these days into 35–54
   paragraphs. The stored text has **6 to 9** blocks per day, averaging
   1,200–1,900 characters each. That alone is the wall of text.
2. **Structure.** Section headings became letter-spaced prose. Scripture
   pull-quotes lost their quote blocks and their references became
   letter-spaced prose too. 3–14 quote cards per day disappeared this way.
3. **Emphasis.** The print book italicises the vocabulary it is teaching
   (*firmament*, *tohu and bohu*, *omniscient*) and bolds the KJV phrases it is
   pointing at. All of it was flattened. 6–28 bold runs and 2–20 italic runs
   per day, gone.

The renderer is not at fault, and no part of this is specific to Day 1 — all 21
days are affected identically.

## The words are all recoverable, and provably unchanged

`tmp/boe/print/The_Beginning_of_Everything_PRINT_READY.pdf` (271 pages) is the
print interior, and it carries the full structure: font 10.4 regular for body,
a bold face for Scripture, an italic face for vocabulary, centred letter-spaced
size-10 lines for section headings, right-aligned size-7.5 lines for
references, and real vertical gaps between paragraphs. It also keeps word
boundaries inside the letter-spaced runs as separate text items, so
`I N | T H E | B E G I N N I N G | G O D` reads back as "In the Beginning God"
with no guessing.

Each stored day turns out to be **one app-written opening paragraph, then the
print book's teaching section verbatim.** I rebuilt all 21 days from the PDF
and compared, letters and digits only, against what is in the database today:

```
21/21 days reconstruct with identical words.
```

That is the safeguard. The transform is deterministic — no model rewrites
anything — and the letters-only equality check is run per day and fails the
whole thing if a single character of content differs. Formatting changes;
wording cannot.

## What each day gains

Prototype output for all 21 days is in `tmp/boe-preview/day-01.md` …
`day-21.md` if you want to read them.

| | today | after |
|---|---|---|
| paragraphs per day | 6–9 | 35–54 |
| Scripture quote cards | 0 | 3–14 |
| section headings | 0 (buried in prose) | 1–2 |
| bold emphasis runs | 0 | 6–28 |
| italic emphasis runs | 0 | 2–20 |
| letter-spaced junk | 216 | 0 |

Day 1, after:

```markdown
We have heard about God. Now we are going to read and understand for
ourselves. This is where we begin.

## In the Beginning God

> “In the beginning God created the heaven and the earth.” (Genesis 1:1)

Stop at the fourth word. **In the beginning God**.

Before anything else is mentioned, God is already there. Not Abraham. Not
Moses. Not Adam. The first person in the Bible is God.

So the natural question is, where did He come from?
```

The conventions above are Proverbs' own, read off the live Proverbs rows:
`## Heading`, `> "quote" (Book C:V)`, `**bold**`, `*italic*`. Nothing new is
invented and no new sections are added.

## Exactly what changes

**Data (this is what actually fixes it):**

- `devotional_days`, the 21 rows where `devotional_id =
  486cff66-b50e-488d-9330-3951589e6fa8`. Only the `devotional_text` column.
  `day_title`, `reflection_question`, `bible_reading_*`, ids and timestamps are
  not touched.
- `data/beginning-of-everything/days-01-07.json`, `days-08-14.json`,
  `days-15-21.json` — the committed seed, updated to match so the repo and the
  database do not disagree. Nothing imports these at runtime; they are seed
  only.
- A full backup of the current 21 rows written first, to
  `data/beginning-devotional-days-backup-2026-11-12.json`, following the
  precedent of `data/proverbs-devotional-days-backup-2026-09-05.json`.

**New scripts (no existing one is replaced):**

- `scripts/build-beginning-formatting.ts` — the deterministic PDF→markdown
  transform, with the letters-only assertion per day.
- `scripts/apply-beginning-book-days.ts` — writes the rows. A copy of the
  idiom in the existing `scripts/apply-proverbs-book-days.ts`, which did this
  exact job for Proverbs on 2026-09-05: `--dry` first, backup, row count
  checks, refuses to run on an unexpected day count.
- `scripts/verify-beginning-formatting.ts` plus `npm run verify:beginning`,
  in the repo's existing `verify:*` idiom — offline, asserts the source.

**No component or renderer file changes in this step.** No `[deploy]`, and in
fact no build at all: these are database rows, so the fix is live the moment
the apply script runs. The seed-JSON commit goes in untagged and rides the next
scheduled build with nothing user-visible attached to it.

## The one thing that is a separate decision

There are two renderers for a devotional day, and they are not equal:

| screen | renderer | headings | quote cards | bold / italic |
|---|---|---|---|---|
| `/devotionals/[id]` guide page (`:2594`, `:2824`) | `ChapterNotesMarkdown` | ✅ h1/h2/h3 | ✅ | ✅ |
| dashboard day card (`DashboardDailyTaskCallout.tsx:1245`, `:1281`) | `ChapterNotesMarkdown` | ✅ | ✅ | ✅ |
| `DevotionalDayModal.tsx:104` | `parseDevotionalContent` | h1/h2 only | ✅ | ❌ stripped |
| `/devotionals/[id]/day/[dayNumber]/page.tsx:184` | `parseDevotionalContent` | h1/h2 only | ✅ | ❌ stripped |

`parseDevotionalContent` calls `stripInlineMarkdown`, which deletes `**` and
`*` rather than rendering them. So after the content fix, the headings,
paragraphs and quote cards land on all four screens, but **bold and italic show
on two of the four.**

This is not new and it is not about this study: every other guide already
stores `**bold**` that those two screens throw away. Proverbs included. So the
options are:

- **(a) Content only.** Ship the fix. Bold and italic appear on the guide page
  and the dashboard card, are silently dropped on the modal and the standalone
  day page. Zero risk to other studies.
- **(b) Content, then the renderer.** Teach `parseDevotionalContent` to render
  emphasis instead of stripping it — about six lines. It would change how all
  25 guides look on those two screens, in the direction of matching the guide
  page. That one needs a build and its own look at Proverbs, Job, Higher Hope
  and the rest before it goes anywhere.

My recommendation is (a) now, (b) as a separate approval once you have seen (a)
land.

## Risks, and what I would check

- **Live study.** The Beginning of Everything opened 1 November and is on day
  12 today, so people are mid-study. The change is formatting only and does not
  touch `devotional_day_progress`, comments, reflections or completion rows, so
  nobody loses a tick or a note. Worth knowing it goes live immediately though,
  not at a build.
- **Comments.** Keyed by `bible-chapter-genesis-<n>` / `devotional-<id>-day-<n>`
  slugs, nothing to do with the text. Unaffected.
- **Audio.** `cleanTextForTts` strips `# * _ >` before speaking, so no markdown
  gets read aloud. The spoken text does change for the better — today the
  narrator spells out "G E N E S I S  1 : 1" letter by letter. But TTS files
  are cached on a hash of the text, so days 1–4 (Genesis 1, served by
  `/api/tts/genesis-one`) would re-render once. A few cents.
- **Paperback link, popups, the daily feed posts.** `BEGINNING_DAILY_POSTS` in
  `lib/beginningDailyPosts.ts` is hand-written and does not read
  `devotional_text`. Unaffected.
- **Other studies.** Untouched by (a). The apply script is pinned to the one
  `devotional_id` and refuses any other.

**Testing plan**

1. `--dry` run printing a per-day diff summary and the letters-only result for
   all 21 days. Nothing written until all 21 pass.
2. `npm run verify:beginning` — offline assertions: 21 days, letters identical
   to the committed backup, zero letter-spaced runs left, every quote block
   closed with a reference, every reference on our own books, no `undefined`,
   no stray `⟦⟧`.
3. `npx tsc --noEmit` clean.
4. All 21 days read on an iPhone-width viewport (375×812) in the dashboard day
   card and on the guide page: headings, quote cards, long days (Day 6 is the
   longest at 13,031 characters), scrolling, no overflow, no clash with the
   bottom nav.
5. Proverbs Day 1 and one other study checked on the same screens to prove
   nothing else moved.
6. Completion state and the comment box exercised on one day after the change.

## Decisions I need from you

1. Go ahead with (a), the content fix, or hold?
2. Section headings as `## In the Beginning God` (Title Case, matching
   Proverbs) or kept as the book has them, `## IN THE BEGINNING GOD`?
3. The opening paragraph of each day is app-written and is not in the print
   book, so it has no authoritative paragraph structure — it stays as the single
   1,000–1,300 character block it is today unless you want it broken up, which
   would be my judgement rather than the book's.
4. The print book also has **Reflection Questions, Today's Action and Today's
   Prayer** for every day, and none of it is in the app. That is real content
   sitting unused, but adding it is new content, not formatting, so it is not
   part of this. Say the word and it becomes its own piece of work.
