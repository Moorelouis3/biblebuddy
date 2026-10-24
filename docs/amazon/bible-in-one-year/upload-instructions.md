# Publishing this — Bible in One Year

> **Files are complete as of 2026-10-24. Nothing is blocked.**
>
> Paperback wrap: `Bible_in_One_Year_Paperback_Corrected_17.763x11.250.pdf`
> in Downloads - verified at 17.763 x 11.250in, one page, artwork 5329 x 3375px
> (exactly 300 DPI across the wrap).
>
> Its first version was rejected here before upload: the back cover promised
> "thought-provoking questions" the book does not contain, and quoted Psalm
> 119:105 in a modern translation while labelling it KJV. Both are fixed, and
> the paperback back now matches the hardcover word for word. If this cover is
> ever regenerated, check those two things again.
>
> **Old note, kept for the record: the paperback wrap did not exist.**
> Price is settled — $29.99 both formats (Louis, 2026-10-24). The wrap size to
> draw is **17.763 x 11.250 in** on white paper; see `listing-details.md` for
> the cream alternative and why white is the likelier answer.

Written 2026-10-24 from the two files Louis supplied in `C:\Users\Moore\Downloads`:

| File | What it actually is |
|---|---|
| `Bible_in_One_Year_Hardcover_PRINT_READY.pdf` | The interior. **450 pages, 8.25 x 11in.** No full-bleed background rectangle (so unlike 21 Women, it needs no stripping). |
| `Bible_in_One_Year_Hardcover_COVER.pdf` | The hardcover wrap. One page, **19.390 x 12.417in**. |

Both were measured from the files, not assumed.

---

## Blocker: there is no paperback wrap

Louis asked for hardcover *and* softcover. Only a hardcover wrap exists, and a
paperback cover is a different shape — no board fold, no hinge — so the
hardcover file cannot be reused or trimmed down.

**Draw it at 17.763 x 11.250 in** (white paper). On cream it is 17.875 x
11.250 in. The full working is in `listing-details.md`, along with why white
is the likelier answer for this book despite the other Bible Buddy titles
being cream.

Two things about that number:

- It is KDP's own formula — width = bleed + trim + spine + trim + bleed —
  applied to a measured 450 pages at a measured 8.25 x 11in trim. It is not an
  estimate of the trim or the page count.
- KDP still states the exact size it wants on the upload screen, and it has
  rejected a wrap for being 0.058in out before. If it names a different
  number, `scripts/resize-cover-wrap.mjs` redraws the wrap to it rather than
  anybody redrawing by hand.

Unlike the hardcover, only the 0.125in bleed is lost on a paperback, so the
art can run close to the edge without the 0.7085in fold problem.

Everything else is ready: price is set at $29.99 for both formats, and the
description, keywords and categories in this folder are written and ready to
paste.

---

## What the book is

Confirmed by reading the interior, not assumed:

- **Title page:** *Bible in One Year — A 365 Day Journey Through God's Word, A
  Bible Buddy Study, Written by Louis Moore III*
- **Copyright page:** © 2026 Bible Buddy Study, first edition 2026, Scripture
  from the King James Version (public domain)
- **Structure:** a contents page per testament listing all 66 books with page
  numbers, then intro pages, then a book-opener spread for each book of the
  Bible (*The Book of Genesis — The Book of Beginnings, Days 1–21, 50
  chapters*, with a "What to watch for" list), then one page per day
- **A day page:** a day number, a title, "Today's reading · Genesis 1–2", a
  walk through what was read, a pulled-out KJV verse in display type, and a
  short closing section

The running question through the whole book, stated in the intro, is *Where is
God in this story?*

---

## The hardcover wrap: one thing to check in the previewer

A KDP hardcover folds **0.7085in of every outer edge** around the board, so
anything drawn in that margin is lost on the printed book. This cost 21 Women
the N of WOMEN and the E of BIBLE, caught only after submission
(`docs/amazon/21-women-of-the-bible/upload-instructions.md`).

The supplied wrap is **12.417in tall, and 11 + (2 x 0.7085) = 12.417** exactly.
So whoever built this file *did* allow for the wrap. That is a good sign and
it is not proof: the allowance can be present in the page size while the
artwork still runs type into it.

**Check it in KDP's previewer before approving**, and if the title or the
author name sits inside the fold, `scripts/fit-hardcover-wrap.mjs` rebuilds a
wrap so the whole design lands inside what is actually seen.

---

## The AI declaration, as every Bible Buddy book answers it

Yes; Texts: entire work, with extensive editing (ChatGPT, Claude); Images: one
or a few AI-generated images, with minimal or no editing (ChatGPT);
Translations: none.

---

## 1. Create the hardcover

1. KDP → Bookshelf → **+ Create** → **Create Hardcover**.
2. Language English, Title **Bible in One Year**, Subtitle **A 365 Day Journey
   Through God's Word**.
3. Author: Louis Moore III. No series, no edition number — first edition.
4. Description: paste `description.html`. KDP accepts `<p>`, `<b>`, `<ul>` and
   `<li>`, which is all it uses. `description.txt` is the same words unmarked up.
5. Publishing rights: "I own the copyright".
6. Keywords and categories: `listing-details.md`, as written.
7. Age range: leave empty. Adult content: no.

## 2. Content

1. ISBN: **Get a free KDP ISBN** (the hardcover and the paperback each need
   their own; KDP issues both).
2. Print options: Black & white interior, **cream paper**, **8.25 x 11in**,
   bleed: **No bleed**, cover finish: **Matte**.
3. Upload `Bible_in_One_Year_Hardcover_PRINT_READY.pdf`.
4. Upload `Bible_in_One_Year_Hardcover_COVER.pdf`.
5. Run the previewer. It must report **450 pages** and raise no trim errors.
   Then do the fold check described above.
6. **Leave the barcode checkbox unchecked.** With it ticked the previewer hard
   errors on this kind of wrap; the barcode area is already allowed for.

> If KDP rejects the wrap size, it names the size it wants. Run
> `scripts/resize-cover-wrap.mjs` with that number rather than redrawing by hand.
> And note: re-uploading a file **re-opens the AI declaration**, with a confirm
> box under it that Save and Continue silently ignores until it is ticked.

## 3. Price

`listing-details.md` holds it: **$29.99**, hardcover and paperback, set by Louis
on 2026-10-24. Check the royalty KDP shows rather than assuming it clears -
at 450 pages the print cost is far above 21 Women's, and the hardcover has a
higher minimum list price than the paperback. If KDP refuses $29.99 it names
its minimum.

## 4. Then the paperback

Blocked until the wrap exists. When it does: repeat from step 1 with **Create
Paperback**, the same metadata word for word, the same interior, and the new
wrap. KDP links the two formats on one detail page automatically when title,
subtitle and author match exactly, so they must be pasted, not retyped.

## 5. After it is live

- Add A+ content, following the pattern in the Proverbs folder, once the ASIN
  exists.
- Point the app at it: the `devotionals` table has a `paperback_url` column,
  which is how a study links to its printed edition.

---

# What actually happened on 2026-10-24

The hardcover was built in KDP up to the final button and **saved as a draft,
not published**. Bookshelf shows: *Bible in One Year: A 365 Day Journey
Through God's Word* — Hardcover — Draft — $29.99.

| | |
|---|---|
| KDP title id | `6GJ3DH261ZR` |
| ISBN (free KDP) | **9798164849498** |
| Imprint | Independently published |
| Print options | B&W, **white paper**, 8.25 x 11in, no bleed, matte, 450 pages |

## The numbers, read off KDP rather than estimated

- **Printing cost: $13.30 per copy** on Amazon.com.
- **Minimum list price: $22.17.** $29.99 clears it.
- At $29.99 the royalty is **60% → $4.69 per copy** (UK £22.42 → £3.90, EU
  €26,77 → €4,21, all converted by KDP from the US price).

Worth knowing before repeating this price on other big books: 21 Women is 239
pages and earns far more per copy at the same $29.99, because this book's
print cost is nearly double. $29.99 works here; it is just a thinner margin
than the rest of the shelf.

## Two things the earlier notes got wrong about categories

Checked live in the form, so trust this over the older guesses:

- **There is no "Guides" placement** under Bible Study & Reference. Confirmed.
- **There IS a "Devotionals" placement** under Christian Living — it sits low
  in the left column and is easy to miss behind the fold.

The three placements actually used:

1. Books › Religion & Spirituality › Christian Books & Bibles › Bible Study & Reference › **General**
2. Books › Religion & Spirituality › Christian Books & Bibles › Christian Living › **Spiritual Growth**
3. Books › Religion & Spirituality › Christian Books & Bibles › Christian Living › **Devotionals**

## The fold check passed

This is the thing that cost 21 Women its cover. It is fine here.

In the previewer with guides on, every element sits inside the safe area: the
front title, the subtitle, the author block, the spine text, the back cover
copy, the feature panel, the verse and the Bible Buddy logo. The previewer
reported **450 pages and no issues**, and Approve was enabled without
argument.

The barcode checkbox was left unchecked, as the 21 Women notes advise. KDP
placed its own barcode on the back cover in clear space, not over any text.

## Description entry: use the Source button

The description field is a CKEditor. Clicking **Source** in its toolbar
switches it to HTML, so `description.html` goes in as real markup rather than
as literal tags. The character counter updating is how you know KDP registered
it.

## Still to do

1. **Publish the hardcover** — one click, pending Louis confirming $29.99
   against the $4.69 royalty.
2. **The paperback.** Repeat with Create Paperback, same metadata pasted not
   retyped, same interior, and
   `Bible_in_One_Year_Paperback_Corrected_17.763x11.250.pdf`. Note the house
   pattern is $19.99 for paperbacks; Louis said $29.99, which is worth
   confirming since every other Bible Buddy paperback is $19.99.
3. The three print files are copied into `tmp/` (gitignored) because the
   browser upload tool can only read files inside the project.
