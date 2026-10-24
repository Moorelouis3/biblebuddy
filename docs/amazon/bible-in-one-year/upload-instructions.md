# Publishing this — Bible in One Year

> **Both formats were submitted to KDP on 2026-10-24 and are in review.**
> Hardcover $29.99, paperback $19.99, linked on one detail page. Nothing is
> outstanding except Amazon's own review (up to 72 hours).
>
> Everything below is the record of how it was done, kept for the next book.

Written 2026-10-24 from the three files Louis supplied in `C:\Users\Moore\Downloads`:

| File | What it actually is |
|---|---|
| `Bible_in_One_Year_Hardcover_PRINT_READY.pdf` | The interior, used for **both** formats. **450 pages, 8.25 x 11in.** No full-bleed background rectangle (so unlike 21 Women, it needs no stripping). |
| `Bible_in_One_Year_Hardcover_COVER.pdf` | The hardcover wrap. One page, **19.390 x 12.417in**. |
| `Bible_in_One_Year_Paperback_Corrected_17.763x11.250.pdf` | The paperback wrap, drawn after the hardcover went in. One page, **17.763 x 11.250in**, artwork 5329 x 3375px = exactly 300 DPI. |

All three were measured from the files, not assumed.

---

## The paperback wrap was rejected once, before it was ever uploaded

Worth reading before any future cover goes near KDP. The first version had
three defects, all caught by reading it against the book rather than by KDP:

1. It promised "thought-provoking questions". The book does not contain them —
   checked by scanning all 450 pages; the phrase appears on 15 pages, scattered,
   as ordinary prose.
2. Its feature tiles did not match the hardcover's.
3. It quoted Psalm 119:105 as "Your word is a lamp to my feet" while labelling
   it (KJV). The KJV reads "Thy word is a lamp unto my feet, and a light unto
   my path."

The corrected wrap fixes all three and the paperback back now matches the
hardcover word for word. **If either cover is ever regenerated, check those
three things again** — a cover is the one artefact nobody proofreads twice.

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
2. Print options: Black & white interior, **white paper**, **8.25 x 11in**,
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

`listing-details.md` holds the four numbers, all read off the KDP screen:
hardcover **$29.99** (prints at $13.30, royalty $4.69), paperback **$19.99**
(prints at $8.65, royalty $3.34). Set the US price and let KDP convert the rest.
At 450 pages the print cost is far above 21 Women's, so check the royalty on
screen rather than assuming; if KDP refuses a price it names its minimum.

## 4. Then the paperback

Do **not** start it from + Create. Open the published hardcover's row and use
**+ Create paperback**: that copies the metadata character for character, which
is the only reliable way to get the two formats onto one Amazon detail page.
Then:

1. Change keyword 6 from "hardcover gift" to "paperback gift". Everything else
   stays as pasted.
2. Get its own free KDP ISBN — the formats cannot share one.
3. Trim: **Custom**, 8.25 x 11 (it is not in the paperback preset list).
4. Same interior PDF, and the paperback wrap
   `Bible_in_One_Year_Paperback_Corrected_17.763x11.250.pdf`.
5. Previewer must report 450 pages and no issues before Approve.

## 5. After it is live

- Add A+ content, following the pattern in the Proverbs folder, once the ASIN
  exists.
- Point the app at it: the `devotionals` table has a `paperback_url` column,
  which is how a study links to its printed edition.

---

# What actually happened on 2026-10-24

Both formats went in. They share one detail page because the paperback was
created with **+ Create paperback** from the published hardcover, which copies
the metadata character for character — the only reliable way to get KDP to
link them.

| | Hardcover | Paperback |
|---|---|---|
| Status | In review | In review |
| ISBN (free KDP) | 9798164849498 | 9798164860127 |
| List price | $29.99 | $19.99 |
| Printing cost | $13.30 | $8.65 |
| Minimum list KDP allowed | $22.17 | $14.42 |
| Royalty at list | 60% → $4.69 | 60% → $3.34 |

KDP title id `6GJ3DH261ZR`. Imprint: Independently published. Print options on
both: B&W, **white paper**, 8.25 x 11in, no bleed, matte, 450 pages.

## Six things the form does that are not obvious

Every one of these cost time today. They apply to the next book too.

1. **The description field is a CKEditor.** Click **Source** in its toolbar and
   `description.html` goes in as real markup. The character counter moving is
   how you know KDP registered it.
2. **8.25 x 11 is not in the paperback trim list** — only the hardcover's. Pick
   **Custom** and type 8.25 x 11.
3. **The trim-size and AI-declaration dropdowns are DIVs, not `<select>`s.**
   Setting them programmatically does nothing; they have to be clicked open and
   the option clicked.
4. **Leave the barcode checkbox unchecked.** With it ticked the previewer hard
   errors on this kind of wrap. KDP placed its own barcode in clear space on
   the back.
5. **Re-uploading a file re-opens the AI declaration**, with a confirm box under
   it that Save and Continue silently ignores until it is ticked.
6. **There is no "Guides" placement** under Bible Study & Reference, and there
   **is** a "Devotionals" placement under Christian Living, low in the left
   column behind the fold.

## The fold check passed on the hardcover

This is the thing that cost 21 Women the N of WOMEN and the E of BIBLE. It is
fine here. A KDP hardcover folds 0.7085in of every outer edge around the board,
and this wrap is 12.417in tall where 11 + (2 x 0.7085) = 12.417 exactly — so it
was built for the fold. In the previewer with guides on, every element sits
inside the safe area: front title, subtitle, author block, spine text, back
copy, feature panel, verse, logo. 450 pages, no issues, Approve enabled.

The paperback previewer also reported 450 pages and no issues, and a zoom
confirmed all three cover corrections are live in KDP's own render.

## Still to do

1. **Amazon's review.** Up to 72 hours, then both go Live and get ASINs.
2. **A+ content** once the ASINs exist, following the Proverbs folder's pattern.
3. **Point the app at it.** The `devotionals` table has a `paperback_url`
   column, which is how a study links to its printed edition.
4. **Louis's tax profile.** KDP shows a banner on the Bookshelf saying it is
   incomplete and that this may delay payment. Nothing to do with these books,
   but it affects every title on the shelf.

The three print files are copied into `tmp/` (gitignored) because the browser
upload tool can only read files inside the project.
