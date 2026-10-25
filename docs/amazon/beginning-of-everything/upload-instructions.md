# Publishing this — The Beginning of Everything

> **Both formats were submitted on 2026-10-25 and are scheduled for 1 November
> 2026.** Hardcover $29.99, paperback $19.99, linked on one detail page, both
> showing "Scheduled release - in review" on the Bookshelf.

Written 2026-10-25 from the three files Louis supplied in `C:\Users\Moore\Downloads`:

| File | What it actually is |
|---|---|
| `The_Beginning_of_Everything_PRINT_READY.pdf` | The interior, used for both formats. **271 pages, 6 x 9in.** |
| `The_Beginning_of_Everything_Hardcover_COVER.pdf` | The hardcover wrap. One page, **14.443 x 10.417in**. |
| `The_Beginning_of_Everything_Paperback_COVER.pdf` | The paperback wrap. One page, **12.930 x 9.250in**. Supplied this time, so nothing had to be derived. |

All three measured from the files, not assumed.

## The paper is cream, and the wrap proves it

Nobody said which paper. The paperback wrap settles it, because the spine is
the only part of a wrap that depends on it:

```
12.930 = 0.125 bleed + 6 + spine + 6 + 0.125 bleed   ->   spine 0.680in
271 pages x 0.0025 (cream) = 0.678in   <- matches
271 pages x 0.002252 (white) = 0.610in  -> would make the wrap 12.860
```

The hardcover agrees: its spine zone is 1.026in, which leaves 0.174in a side
for the hinge on cream, the same hinge allowance every other Bible Buddy
hardcover uses. **Set cream on both formats.** KDP defaults to white and
accepted both files once cream was chosen.

## The checks

Both of the things that have caught defects on previous books passed here.

1. **The back cover's claims are true.** It promises a short reading, a clear
   explanation, reflection questions, an action step and a prayer. The interior
   carries exactly those sections on all 21 days, under the headings TODAY'S
   READING, BEFORE YOU READ, AS YOU READ NOTICE, GOD'S STORY, REFLECTION
   QUESTIONS, TODAY'S ACTION and TODAY'S PRAYER.
2. **The fold.** The hardcover wrap is 10.417in tall and 9 + (2 x 0.7085) =
   10.417 exactly, and in the previewer with guides on every element sits
   inside the safe area.

One thing worth knowing: **the mock-up PNG is wrong and the print file is
right.** `The Beginning of Everything_ Creation Study Guide.png` quotes
Genesis 1:1 as "the heavens and the earth" and labels it (NIV), which would
contradict a book whose copyright page says all Scripture is KJV. The actual
wraps quote "the heaven and the earth" with no translation label, which is
correct KJV. Do not use that PNG for anything printed.

## What actually happened on 2026-10-25

| | Hardcover | Paperback |
|---|---|---|
| Status | Scheduled release - in review | Scheduled release - in review |
| Release | 1 November 2026 | 1 November 2026 |
| ISBN (free KDP) | 9798165168970 | 9798165174193 |
| List price | $29.99 | $19.99 |
| Printing cost | $8.90 | $4.25 |
| Minimum list KDP allowed | $14.84 | $8.50 |
| Royalty at list | 60% → $9.09 | 60% → $7.74 |

KDP title id `GP31D2SK1WW`. Print options on both: B&W, **cream**, 6 x 9in, no
bleed, matte, 271 pages. Expanded Distribution was offered on the paperback and
left off, matching the rest of the shelf.

Categories, all three under Religion & Spirituality → Christian Books & Bibles:

1. Bible Study & Reference → **General** (there is no Old Testament placement)
2. Christian Living → **Devotionals**
3. Christian Living → **Spiritual Growth**

## Scheduling a release: the two traps

Both cost time here and will cost it again.

1. **The date must be picked from the calendar.** Setting the input's value any
   other way leaves it looking correct on screen while KDP still answers
   "Release Date: Please complete this before continuing." You know it has
   really registered when KDP adds a line of its own underneath: *"You can edit
   your title prior to release until October 26, 2026 11:59 PM GMT."*
2. **The schedule does not copy to the second format.** + Create paperback
   brings over the title, subtitle, description, keywords and categories, and
   leaves the release date empty. Set it again, or the paperback goes on sale
   immediately while the hardcover waits.

Also seen, and not an error: the Publication Date section greys out "My book
was previously published" and explains *"Scheduled release titles cannot be
previously published."* That is the reason the option is disabled, not a
complaint about your selection.

## Still to do

1. **The release.** Both go on sale 1 November. Edits are locked from 26
   October 11:59 PM GMT.
2. **Link it in the app** once the ASINs exist:
   `node --env-file=.env.local scripts/link-printed-edition.mjs "The Beginning of Everything" <paperback ASIN>`
   That fills in the buy section on /devotionals/beginning-of-everything and the
   PaperbackStrip on every day page. Both are already written and wait on the URL.
3. **A+ content** once the ASINs exist.

The print files are copied into `tmp/boe/print/` (gitignored) because the
browser upload tool can only read files inside the project, and this repo is
public.
