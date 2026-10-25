# Why a new study comes out looking wrong

Written 2026-10-25, after Higher Hope launched the same morning wearing the
wrong layout and no cover, and Louis had to be the one who noticed: *"this
higher hope layout doesn't have the cover on there and make sure it follows the
proverbs study guide — I shouldn't have to check everything."*

He is right, and the two faults had the same cause.

## The pattern

A study's appearance is decided in several places by **matching its title
against a hand-kept list in code**, not by reading anything off its row. Add a
study to the database and it works; forget to add its title to every list and
it silently renders as something else. Nothing errors, nothing warns, and the
only way to catch it is to open the study and look.

It has now bitten twice in one day:

| | What broke | Cause | Fixed |
|---|---|---|---|
| Cover | Emoji placeholder everywhere, though `cover_image` was set and the file existed | three cover lookups keyed off a title list | `06ca1948` - the row is now the fallback under the list |
| Layout | Old layout: Complete/Current/Left tiles, "0/60 sections", subtitle where the day count belongs | `isModernStudyPlanTitle` is a title list | this doc's commit, for Higher Hope only |

## The three layouts, and who gets which

`app/devotionals/[id]/page.tsx` sorts every study into one of three buckets by
title:

- **Modern study plan** (`isModernStudyPlanTitle`) - the Proverbs look. Day
  count under the title, progress across four tasks per day (overview, Bible
  reading, that chapter's trivia, that chapter's reflection), no stat tiles.
- **Chapter journey** (`isChapterJourneyStudyTitle`) - the Genesis/Exodus
  series. Scripture range under the title, six tasks per day.
- **Neither** - the fallback, and nobody chose it. Stat tiles, units called
  "sections", subtitle where the day count should be.

## Where they actually land, 2026-10-25

**Modern (2):** The Wisdom of Proverbs, Higher Hope *(added today)*

**Chapter journey (16):** The Creation of the World, The Fall of Man, The Flood
of Noah, The Promise Through Isaac, The Obedience of Abraham, The Wrestling of
Jacob, The Testing of Joseph, The Deliverance of Moses, The Covenant at Sinai,
The Presence of God, Holiness Before God, The Wilderness Journey, The Rebellion
in the Wilderness, The Promised Land Ahead, The Rise of Esther, The Courage of
Daniel

**Neither - still wearing the fallback (7):**

| Study | Days | Note |
|---|---|---|
| 21 Women of the Bible | 21 | `isWomenOfTheBibleTitle` matches "women of the bible", and the title is "**21** Women of the Bible". `getStudyScriptureRange` already has a "21 Days" line waiting for it, so this one is plainly meant to be modern and the rename broke it. |
| The Tempting of Jesus | 21 | opens 2026-11-01 |
| The Faith of Job | 40 | |
| The Heart of David | 21 | |
| The Calling of Moses | 21 | |
| The Disciples of Jesus | 21 | |
| The Transforming of Paul | 21 | |

## Why those seven were left alone

Not because they look right. Because moving a study between buckets changes how
its **progress is calculated** - four tasks a day versus six - so every reader
part-way through one of them would see their percentage jump the moment it
shipped. That is a visible change to live studies and it is Louis's call, not a
side effect of fixing Higher Hope.

21 Women is the one where the intent is not in doubt.

## The real fix

Stop keying layout off titles. Two options, in order of preference:

1. **A column on `devotionals`** - `layout` or `study_kind`, defaulting to the
   modern plan. A new study then picks its layout the same way it picks its
   cover: by setting a field. This is the same move the cover fix made, and it
   is the one that actually ends the pattern.
2. **Invert the default** - treat anything not named in the chapter-journey
   list as modern. One line, no migration, and new studies are right by
   default. It changes all seven above at once, which is the thing to decide
   before doing it.

Until one of those lands, **adding a study means editing these lists**, and
this file is the checklist:

- `getCoverImage` in `app/devotionals/page.tsx` and `app/devotionals/[id]/page.tsx`
  (now optional - the row is the fallback)
- `getDashboardStudyCover` in `components/DashboardJourneyExperience.tsx`
  (also now optional)
- `isModernStudyPlanTitle` / `isChapterJourneyStudyTitle` in `app/devotionals/[id]/page.tsx`
- `getStudyScriptureRange` in the same file
- `devotionals.category` on the row - Higher Hope shipped with it NULL while
  every other study has one. Nothing in the devotional pages reads it today, so
  it is cosmetic, but it is one more thing that is set by hand and easy to miss.
