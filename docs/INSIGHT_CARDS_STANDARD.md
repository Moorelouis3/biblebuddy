# Insight Cards: the standard for every chapter

Genesis 1 is the reference implementation. Every chapter built from now on
matches it. This file is the spec. Read it in full before building a chapter,
alongside `docs/bible-study-note-style.md`, which governs how a single note is
written.

## What a chapter looks like when it is done

The reader opens as plain Scripture. Key phrases carry a faint dotted
underline. Tapping one opens a single **Insight Card** under that verse, with
its title, a one line preview, and the full note. A Study Mode switch lists
every card under its verse instead.

## Coverage bar

This is the part that is most often got wrong, so it is stated plainly.

* Aim for **two to three Insight Cards per verse**, not one per section.
* A full chapter should land at **eighty or more cards**, not thirty or forty.
  Genesis 1 has 87 across 31 verses.
* Every verse gets at least one card unless the verse genuinely carries
  nothing a reader would stumble on.
* Do not stretch. If a verse has one idea, it gets one card. The bar is
  coverage of what a reader does not understand, not a quota.
* The test for each phrase: **would someone who does not know the King James
  wording, and does not know the Bible, stop at this and not understand it?**
  If yes, it needs a card. That includes ordinary looking words like "meat",
  "cattle", "firmament", "fowl", "creepeth", "hath", "wherein", "after his
  kind".

## Where the words come from

* The card title is generated from the **underlined KJV words**, never from
  the note heading. That way a title can never drift from the verse.
* The `underline` string must appear in the verse **exactly**, character for
  character, or the underline will not render.
* Underlines within one verse must not overlap.
* The preview is the note's **own opening line**. It is then dropped from the
  expanded body so the reader never sees it twice.

## Using notes that already exist

Most chapters already have notes. Use them.

1. Read the chapter's existing notes source.
2. For every phrase note that exists, create a card entry pointing at it.
   `noteTitle` must match the heading in the source **exactly**, minus its
   emoji.
3. Then look for the gaps: verses with no note, and phrases within a verse
   that a beginner would not understand. Write new notes for those, to
   `docs/bible-study-note-style.md`, into the same source file.
4. If a chapter has no notes at all, write the whole set from scratch to the
   same standard.

Genesis 1 needed 27 new notes written this way, covering verses 7, 12, 15, 24,
25, 27 and 30, which had none, plus a whole missing 1:24-25 section.

## The data a chapter needs

Per chapter, mirroring Genesis 1:

* `lib/<book><chapter>StudyMode.ts` — the phrase map. One entry per card:
  * `verse` — which verse it sits under
  * `noteTitle` — the heading in the notes source, minus emoji
  * `icon` — that note's emoji, copied in so a card renders without the notes
  * `underline` — the exact KJV words
  * `preview` — the note's opening line
* `lib/<book><chapter>StudySections.ts` — builds that chapter's sections from
  its own notes file, never from `lib/bibleReaderStudyNotes`.

## Rules that are not negotiable

* **Never import `lib/bibleReaderStudyNotes` from anything the reader loads.**
  It aggregates 482 note files into a 32 MB JavaScript chunk. Genesis 1 was
  downloading all of it before a verse could appear. Read from the chapter's
  own notes file, or fetch `/api/study-notes`.
* **Never change the verse's plain text.** Highlights are saved as character
  offsets into the rendered verse text. Underlines are drawn by splitting that
  same text into spans. Adding, removing or reordering a single character
  breaks every highlight a reader has saved.
* Verify each `underline` really occurs in the verse before shipping. A
  generator that checks this is worth more than careful reading.

## Before this can be rolled out

The reader currently recognises Genesis 1 and nothing else
(`isGenesisOneStudyModeChapter`). Generalising it so that **any chapter with a
phrase map** gets Insight Cards is one job, done once, that serves every
chapter. It has to happen before per chapter data is worth producing.
