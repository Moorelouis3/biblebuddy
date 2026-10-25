# Listing details — Higher Hope

Everything KDP asks for, in the order it asks. Paste, do not retype: the
hardcover and the paperback only link into one detail page when the title,
subtitle and author match character for character.

## Metadata

| Field | Value |
|---|---|
| Title | Higher Hope |
| Subtitle | A 60 Day Journey Through Addiction With God's Word |
| Author | Louis Moore III |
| Series | none |
| Edition | first (leave blank) |
| Publisher | Bible Buddy |
| Language | English |

Taken from the book's own title page and cover, so it matches what is printed.

## Print options

| Field | Value |
|---|---|
| Interior | Black & white |
| Paper | **White** |
| Trim | 6 x 9 in |
| Bleed | No bleed (interior), bleed on the paperback cover only |
| Cover finish | Matte |
| Page count | 532 |

Trim and page count are measured from `Higher_Hope_Interior_KDP.pdf`, not
assumed. Paper is white because the supplied hardcover wrap only works on
white: its spine zone is 1.546in, and 532 pages of white paper is a 1.198in
spine leaving 0.174in a side for the hinge. Cream would need 1.330in of spine
and leave only 0.108in, which is tighter than KDP normally allows.

**If the interior is ever edited the page count changes, and both wraps have
to be rebuilt, because the spine moves.**

## Cover files

| File | Size | Notes |
|---|---|---|
| `Higher_Hope_Hardcover_Cover.pdf` | 14.963 x 10.417 in | Supplied by Louis. Height is 9 + 2 x 0.7085, so the board fold was allowed for. |
| `Higher_Hope_Paperback_13.448x9.250.pdf` | 13.448 x 9.250 in | Derived from the hardcover with `scripts/paperback-wrap-from-hardcover.mjs`. |

Both sizes are measured from the files, not assumed.

The paperback wrap did not exist and was derived rather than redrawn. The
script lifts the two 6in cover panels and the middle of the spine zone out of
the hardcover art and drops the two 0.174in hinge strips, which on this cover
are flat black. Nothing is stretched, so the spine type keeps its proportions.
Checked with guides before upload: spine text inside the spine, back cover copy
and the Bible Buddy logo clear of the trim, front title and author clear of the
trim, bleed filled with real artwork rather than mirrored.

## Price

| | US list price |
|---|---|
| Hardcover | **$29.99** |
| Paperback | **$19.99** |

The house price for every Bible Buddy title: Proverbs, The Tempting of Jesus,
21 Women of the Bible and Bible in One Year are all $29.99 hardcover and
$19.99 paperback. Read the printing cost and royalty off the KDP screen rather
than trusting an estimate; at 532 pages the print cost is high, and the
hardcover carries a higher minimum list price than the paperback. If KDP
refuses a price it names its minimum.

## Keywords

Seven slots, one phrase each. These avoid repeating words already in the title
and subtitle, which Amazon indexes anyway.

1. christian addiction recovery devotional
2. faith based recovery book for men
3. bible study for overcoming temptation
4. daily devotional for sobriety
5. breaking bad habits with scripture
6. christian help for porn addiction
7. hope for addicts and their families

On the paperback, change keyword 6's format word if one is used; otherwise
paste these unchanged so the two editions index the same way.

## Categories

Three placements, identical on both formats:

1. Religion & Spirituality → Christian Books & Bibles → Christian Living → **Devotionals**
2. Religion & Spirituality → Christian Books & Bibles → Christian Living → **Spiritual Growth**
3. Self-Help → **Substance Abuse & Addictions** (or the nearest recovery
   placement the form actually offers)

The third one is the reason this book reaches people who are not already
looking for a devotional, so take a recovery category rather than a third
Christian Living one. The form is the source of truth: the Bible in One Year
run proved the published category lists are out of date, so pick from what is
on screen.

## Age range and adult content

Age range: leave empty. Adult content: no.

The subject is addiction, handled for adults, with no graphic content. The
copyright page carries a line that the book is not a substitute for medical
care and gives the 988 crisis line, which is correct and should stay.
