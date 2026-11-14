# Study guide format

The Wisdom of Proverbs is the approved template for every study guide, existing
and future (Louis, 2026-11-14). This is what that means, and how it is checked.

    npm run check:study-guides

reads every published study from the database and fails if a day breaks a rule
below. Run it after importing or editing a study and before publishing one. The
rules as code: `lib/studyGuideFormat.ts`.

## A study guide day has four parts

In this order, each one opened and completed on its own:

1. **The Big Picture** (called Overview on the study page). The day's teaching:
   `devotional_days.devotional_text`, drawn by `ChapterNotesMarkdown`.
2. **Today's Reading.** The chapter in `bible_reading_book` /
   `bible_reading_chapter`, opened in the Bible reader.
3. **Today's Trivia.** The trivia round for that same chapter.
4. **Discussion.** The day's comment thread, opened by `reflection_question`.

So a day needs a title, a reading and a reflection question as well as its
text. A day without a reading has no parts 2 and 3. The check reports that as a
missing section. Never invent content to fill one.

## How the text is written

Stored as Markdown. What the reader should see is what Proverbs looks like:

- **Short paragraphs.** One to three sentences, a blank line between them.
  Break where the thought turns, not by counting sentences. No paragraph over
  90 words (Proverbs' longest is 43). No single line breaks inside a paragraph.
- **Section headings.** `## Heading`, two to seven plain words, where the
  subject changes: about one for every 150 to 300 words. `###` only for a
  sub-heading directly under a `##`. Never two headings of the same level in a
  row, never a heading broken across two lines.
- **The opening hook has no heading.** The first few short paragraphs come
  before the first `##`.
- **Scripture quote cards.** A quotation that stands on its own, with its
  reference, is a blockquote: `> "Trust in Yahweh..." (Proverbs 3:5)`.
- **Emoji bullet lists.** A real list is `* 🧭 item`, one emoji per item.
  Numbered steps stay numbered. Do not turn prose into a list.
- **Bold, sparingly.** `**...**` for the few lines that carry the point.
- **Reflection questions** are numbered, question in bold, then the body:
  `1. **Which promise am I trying to make happen with my own hands?** Rebekah...`
- No HTML, no tables, no `#` h1 inside the text except a single opening title
  where the study already uses one.

## Formatting is not rewriting

Several studies are the text of a printed book. Reformatting one may add
section headings, emoji on list items and Markdown marks. It may not add,
remove, change or reorder the author's words. Prove it: compare the letters and
digits of each day before and after (`scripts/verify-beginning-formatting.ts`
does this for The Beginning of Everything), and keep a backup of the rows as
they stood (`data/study-guide-days-backup-2026-11-14.json`).

## What went wrong before

The Beginning of Everything and 21 Women of the Bible were imported from their
print interiors. The stored text, not the renderer, was at fault:

- one heading a day and opening paragraphs of up to 248 words;
- headings broken across two lines (`## The God Who Asked Her a` / `## Question`);
- Scripture as italic paragraphs instead of quote cards;
- lists as bare lines, or dropped a block or two below the sentence that
  introduces them;
- reflection questions cut in two (`**...with my own**` / `1. **hands?**`).

All 42 days were reformatted on 2026-11-14 with the wording unchanged.

## Importing a new study

1. Write each day to this format before it goes in. A print interior needs its
   structure rebuilt, not just its text extracted.
2. Fill the title, reading and reflection question on every day.
3. Run `npm run check:study-guides -- --all`. Publish only when it is clean.
