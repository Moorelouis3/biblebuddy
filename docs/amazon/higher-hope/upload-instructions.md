# Publishing this — Higher Hope

> **Both formats were submitted to KDP on 2026-10-25 and are in review.**
> Hardcover $29.99, paperback $19.99, linked on one detail page. Nothing is
> outstanding except Amazon's own review (up to 72 hours) and the in-app link
> that waits on the ASINs.

Written 2026-10-25 from the three files Louis supplied in `C:\Users\Moore\Downloads`:

| File | What it actually is |
|---|---|
| `Higher_Hope_Interior_KDP.pdf` | The interior, used for **both** formats. **532 pages, 6 x 9in.** |
| `Higher_Hope_Hardcover_Cover.pdf` | The hardcover wrap. One page, **14.963 x 10.417in**. |
| `Higher_Hope_with_Cover.pdf` | 533 pages at 6 x 9in: the interior with a cover page bound in front. A reading copy, **not** a KDP file. KDP wants the interior and the wrap separately, so this one was not used. |

All three were measured from the files, not assumed.

---

## The paperback wrap did not exist, so it was derived

Same gap as Bible in One Year the day before: a hardcover wrap arrives, the
paperback needs a different shape, and the softcover edition is blocked on
artwork nobody has drawn.

It is not a resize. A hardcover folds 0.7085in of every edge round the board
and carries a hinge gap either side of the spine; a paperback loses 0.125in of
bleed, has no hinge, and its spine is exactly pages x paper thickness. So
`scripts/paperback-wrap-from-hardcover.mjs` lifts the panels out instead of
squeezing them:

```
node scripts/paperback-wrap-from-hardcover.mjs \
  Higher_Hope_Hardcover_Cover.pdf \
  Higher_Hope_Paperback_13.448x9.250.pdf \
  532 --trim 6x9 --paper white
```

| | |
|---|---|
| Hardcover visible area | 13.546 x 9.000 in |
| Spine zone on the hardcover | 1.546 in (spine plus 0.174in of hinge a side) |
| Paperback spine at 532pp white | 1.198 in |
| **Paperback wrap produced** | **13.448 x 9.250 in** |

The two hinge strips are dropped, and on this cover they are flat black, so
nothing is lost. Nothing is stretched, so the spine type keeps its
proportions. KDP accepted the file without naming a different size, and its
own previewer put the spine text cleanly inside the spine.

**Check the render before uploading.** If a future cover has spine text wider
than the paperback spine, this script cannot save it and the cover has to be
redrawn.

## The two checks that caught problems on the last book

Both passed here.

1. **The back cover promises "thought provoking questions."** It is true: every
   day in `data/higher-hope/*.json` carries a `reflection_question`, and the
   interior prints them. On Bible in One Year the same claim was false and the
   wrap was thrown away.
2. **The hardcover fold.** The wrap is 10.417in tall and 9 + (2 x 0.7085) =
   10.417 exactly, so it was built for the fold, and in the previewer with
   guides on every element sits inside the safe area: back headline, feature
   panel, the 2 Corinthians 12:9 verse, the Bible Buddy logo, the spine text,
   the front title, the author block.

The barcode checkbox was left unchecked, as the house notes advise. KDP put
its own barcode on the back cover in clear space beside the logo, overlapping
nothing.

---

## What actually happened on 2026-10-25

Both formats went in. They share one detail page because the paperback was
created with **+ Create paperback** from the published hardcover, which copies
the metadata character for character.

| | Hardcover | Paperback |
|---|---|---|
| Status | In review | In review |
| ISBN (free KDP) | 9798165105036 | 9798165107221 |
| List price | $29.99 | $19.99 |
| Printing cost | $12.03 | $7.38 |
| Minimum list KDP allowed | $20.06 | $12.31 |
| Royalty at list | 60% → $5.96 | 60% → $4.61 |

KDP title id `6P7VAMRR3N8`. Imprint: Independently published. Print options on
both: B&W, white paper, 6 x 9in, no bleed, matte, 532 pages.

Expanded Distribution was offered on the paperback (40%, $0.61 a copy) and
left off, which matches every other Bible Buddy paperback.

## Categories

The third placement is deliberately outside Religion, because it is the one
that reaches somebody searching for help rather than for a devotional:

1. Religion & Spirituality → Christian Books & Bibles → Christian Living → **Devotionals**
2. Religion & Spirituality → Christian Books & Bibles → Christian Living → **Spiritual Growth**
3. Health, Fitness & Dieting → Addiction & Recovery → **General**

General rather than Substance Abuse on purpose: the book covers weed, alcohol,
pills, porn, gambling, food and the phone, so a single-substance placement
would describe it wrongly.

## Still to do

1. **Amazon's review.** Up to 72 hours, then both go Live and get ASINs.
2. **Link it in the app.** This is the only step that touches Bible Buddy, and
   it cannot be done before the ASIN exists:

   ```
   node --env-file=.env.local scripts/link-printed-edition.mjs "Higher Hope" <paperback ASIN>
   ```

   That sets `devotionals.paperback_url`, which is what makes
   `components/devotionals/PaperbackStrip.tsx` appear on the study page and on
   every one of the 60 day pages. `--list` shows which studies are linked.
3. **A+ content** once the ASINs exist, following the Proverbs folder's pattern.
4. **21 Women of the Bible is live and still unlinked** (paperback ASIN
   B0HNHF5NC8). Noticed while checking this; not changed, because it is a
   different book.
5. **Louis's tax profile.** KDP still shows the incomplete-profile banner.

The print files are copied into `tmp/hh/` (gitignored) because the browser
upload tool can only read files inside the project, and because this repo is
public.
