# Publishing this — 21 Women of the Bible

> **State on 2026-10-18.** The hardcover draft exists in KDP (`Y6FDDBAVQMG`)
> with title, subtitle, author, description, keywords, the three categories,
> cream paper, 6 x 9, no bleed, matte, and both files uploaded. Steps 1 and 2
> below are done except for the three things under "What only Louis can do".

## What only Louis can do

1. **Assign the ISBN.** Content page → ISBN → *Get a free KDP ISBN* →
   **Assign ISBN**. It cannot be undone or reused, which is why it was left.
   Until it is assigned, KDP will not process the cover and the previewer stays
   greyed out.
2. **Answer the AI-Generated Content question.** It is a declaration about how
   the book was made, so it is Louis's to answer, not an agent's.
3. **Run the previewer, then price and publish.** Prices are in
   `listing-details.md`.

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
