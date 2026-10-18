# Publishing this - 21 Women of the Bible

> **Both formats were submitted on 2026-10-18 and are In review at Amazon.**
> Hardcover `Y6FDDBAVQMG`, ISBN 9798163402304, $29.99. Paperback `2YXFBBE31ZF`,
> ISBN 9798163408092, $19.99. Free KDP ISBNs, worldwide rights, cream 6 x 9,
> matte. Amazon normally takes up to 72 hours to put them on sale.

## What KDP would not accept, and what fixed it

These will bite the next book too.

1. **Both wraps were the wrong width.** KDP wanted 14.361 x 10.417in for the
   hardcover (the file was 14.303) and 12.847 x 9.250 for the paperback (it was
   12.787). `scripts/resize-cover-wrap.mjs` redraws a wrap at the size KDP names.
2. **Every interior page carried a full-bleed background rectangle**
   (`1 .996078 .984314 rg` then `n -2 -2 436 652 re f*`). The previewer reads it
   as an object sitting in the margins, marks it an ERROR and leaves Approve
   greyed out - so the book cannot be published. The paper is cream anyway, so
   `scripts/strip-pdf-page-background.mjs` removes it and changes nothing else.
   Scaling the pages down does not help; the rectangle scales with them.
3. **Re-uploading a file re-opens the AI declaration.** A confirm box appears
   under it and Save and Continue silently does nothing until it is ticked.

The files Amazon actually accepted are in Downloads as
`21_Women_Interior_KDP.pdf`, `21_Women_Cover_Hardcover_KDP.pdf` and
`21_Women_Cover_Paperback_KDP.pdf`.


## The hardcover cover has to be fixed before it prints

Caught 2026-10-18, after submission: a hardcover folds **0.7085in of every outer
edge** round the board. The art was drawn flat to the edge, so the printed book
loses the N of WOMEN, the E of BIBLE and the end of the subtitle. The paperback
is fine - it only loses the 0.125in bleed.

`scripts/fit-hardcover-wrap.mjs` rebuilds a wrap so the whole design lands
inside what is seen: it scales the art to the surviving width, takes 0.21in off
the top and bottom (sky and steps, never type), and mirrors the edge outwards to
fill the fold. The corrected file is `21_Women_Cover_Hardcover_KDP_v2.pdf` in
Downloads.

**It could not be uploaded yet.** KDP locks a title while it is In review and
sends the edit page back to the Bookshelf. As soon as the hardcover goes live
(or the review ends), upload v2 under Edit hardcover content and submit again;
the live edition keeps selling while the new cover is reviewed.

## The AI declaration, as every Bible Buddy book answers it

Yes; Texts: entire work, with extensive editing (ChatGPT, Claude); Images: one
or a few AI-generated images, with minimal or no editing (ChatGPT);
Translations: none.

A new title, not an edit of an existing one: hardcover first, then paperback
linked to it. The three print files are the ones built on 2026-10-18.

| | |
|---|---|
| Interior | `21_Women_of_the_Bible_Interior.pdf` — 239 pages, 6 x 9in |
| Hardcover wrap | `21_Women_Cover_Hardcover_FINAL.pdf` — 14.303 x 10.417in |
| Paperback wrap | `21_Women_Cover_Paperback_FINAL.pdf` — 12.787 x 9.250in |

All three are in `C:\Users\Moore\Downloads`. The wraps already carry the right
spine for 239 pages, so the page count must not change before upload — any edit
to the interior means both wraps get rebuilt.

## 1. Create the hardcover

1. KDP → Bookshelf → **+ Create** → **Create Hardcover**.
2. Language English, Title **21 Women of the Bible**, Subtitle
   **A 21-Day Study of the Remarkable Women God Used to Shape His Story**.
3. Author: Louis Moore III. No series, no edition number — this is a first
   edition.
4. Description: paste `description.html`. KDP accepts `<p>`, `<b>`, `<ul>` and
   `<li>`, which is all it uses. `description.txt` is the same words unmarked up.
5. Publishing rights: "I own the copyright".
6. Keywords and categories: `listing-details.md`, as written.
7. Age range: leave empty. Adult content: no.

## 2. Content

1. ISBN: **Get a free KDP ISBN** (a hardcover and its paperback each need their
   own; KDP issues both).
2. Print options: Black & white interior, **cream paper**, 6 x 9 in, bleed:
   **No bleed**, cover finish: **Matte**.
3. Upload `21_Women_of_the_Bible_Interior.pdf`.
4. Upload `21_Women_Cover_Hardcover_FINAL.pdf`.
5. Run the previewer. It must report 239 pages and raise no trim errors.
   Expect it to flag nothing else — the interior has no images and no bleed.
6. **Leave the barcode checkbox unchecked.** With it ticked the previewer hard
   errors on this wrap; the barcode area is already allowed for.

## 3. Price

`listing-details.md` holds the list prices. Set the US price first and let KDP
convert the rest, then check that the printing cost leaves the royalty in the
same shape as The Wisdom of Proverbs.

## 4. Then the paperback

Repeat from step 1 with **Create Paperback**, the same metadata word for word,
the same interior, and `21_Women_Cover_Paperback_FINAL.pdf`. KDP links the two
formats on one detail page automatically when title, subtitle and author match
exactly, so they must be pasted, not retyped.

## 5. After it is live

- Add the A+ content from the Proverbs folder's pattern once the ASIN exists.
- Tell the app: the study is already live at
  `/devotionals/0a6d6ab9-03a3-4ac6-8a72-44f24f3be254`, and the book page at
  `/books/wisdom-of-proverbs` is the model for a 21 Women equivalent.
