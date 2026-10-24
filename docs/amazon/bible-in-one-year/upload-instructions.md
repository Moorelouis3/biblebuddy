# Publishing this — Bible in One Year

> **NOT SUBMITTED. One thing blocks it: the paperback wrap does not exist.**
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
