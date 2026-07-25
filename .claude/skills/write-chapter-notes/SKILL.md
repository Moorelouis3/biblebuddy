---
name: write-chapter-notes
description: Write deep, KJV-vocabulary-explaining "phrase card" study notes for a Bible chapter in this app (Bible Buddy), matching the exact depth and format used for Genesis 1-40 and Genesis 42. Use whenever asked to write, deepen, or redo chapter notes for the Bible reader — for any book, so every chapter reads at the same quality bar, whether it's Genesis 42 or Revelation 12.
---

# Writing deep chapter notes for the Bible reader

This skill is the exact recipe used to write Genesis 42's notes. Follow it
literally for any other chapter, in any book, so quality never drifts —
Revelation 12 should read exactly as deep as Genesis 42.

Do not skip straight to writing prose. Follow the steps in order: ground in
the real KJV text first, draft in the exact card format, build the source
file with the parser template, wire it in, then verify.

## 0. Never write from memory — fetch the real KJV text first

Before drafting anything, get the actual chapter text. Do not rely on
recalled Scripture — archaic word choices and verse boundaries must be exact.

```bash
curl -s "https://bible-api.com/<book>+<chapter>?translation=kjv"
```

(If rate-limited it returns `"Retry later"` — wait a few seconds and retry.)
Read through the whole chapter and list every archaic/KJV word that a modern
reader would stumble on (see the vocabulary list in step 2). This list drives
which phrases get their own card.

## 1. Chunk the chapter into sections

Split the chapter into 5-9 verse-range sections (not one card per verse).
Genesis 42 (38 verses) became 9 sections: 1-5, 6-9, 10-13, 14-17, 18-20,
21-24, 25-28, 29-34, 35-38. Each section gets one title and one emoji, and
becomes one collapsible block in the reader.

Each section then breaks into 3-6 individual phrase cards — one per KJV
phrase/verse-cluster worth unpacking. Genesis 42 averaged ~4-5 phrases per
section, ~35-45 phrases for the whole chapter.

## 2. The exact card format (do not deviate)

Every phrase card is:

```
## <emoji> <Phrase Heading In Title Case>

<Paragraph 1 — set up the verse: what's literally happening.>

<Paragraph 2 — go deeper: cross-reference, irony, character detail, or the
"why" behind the moment. Use **bold** to flag any archaic/KJV word and
define it inline, e.g. **"Thither"** is an old word simply meaning "to that
place.">

<Optional paragraph 3 — a further layer: theological point, pattern across
the book, or emotional weight.>

<emoji> <Short bullet — one clause, no period needed but fine either way>

<emoji> <Short bullet>

<emoji> <Short bullet — 3 to 4 total, one per blank-line-separated paragraph>

➡️ <One-line transition pointing to what happens next in the story>

---
```

Rules that must hold for every single card:
- **Define every archaic/hard word explicitly**, in bold, inline, in plain
  modern English. This is the #1 thing that was missing before the rewrite —
  don't skip it. Common KJV words to watch for across the whole Bible:
  thither, hither, hence, thence, peradventure, verily, wist, wot/wotteth,
  beseech/besought, wroth, holpen, laded, ward, provender, espied, traffick,
  bereaved, sojourn, betwixt, howbeit, nay, aught, naught, durst, chode,
  froward, subtilty, concourse, privily. Whenever one of these (or anything
  else archaic) shows up in the chapter, it needs its own **bold** definition
  in a card, not just a modern paraphrase.
- 3-4 emoji bullets per card, each its own paragraph (blank line between).
- One `➡️` transition line per card, except the very last card of the whole
  chapter (nothing to transition to).
- Every card ends with `---` **except** the very last card of a section —
  when the next thing in the raw text is the next section's `# Book C:V-V`
  header, no divider is needed (see step 3's parser, which tolerates both).
- Never repeat the same sentence in two places within one card — every
  sentence should say something new.
- Ground every claim in the actual text or well-established cross-references
  (other verses, earlier/later chapters). Don't invent psychology or facts
  the text doesn't support.

## 3. Section header format

Each section in the raw text looks like:

```
# Genesis 42:1-5

# 🌾 Jacob Sends His Sons To Egypt

---

## 🌾 Jacob Saw That There Was Corn In Egypt
...(first phrase card)...
```

The verse-range line (`# Book C:V-V`) and the title line are separate `#`
lines. A `---` follows the title before the first phrase card. Sections run
back-to-back — the next section's `# Book C:V-V` line is what tells the
parser the previous section ended, so you don't need a trailing `---` after
a section's last card.

## 4. Build the dedicated source file

Create `lib/<book><ChapterInWords>Source.ts` (e.g. `genesisFortyTwoSource.ts`,
`revelationTwelveSource.ts`). Copy the exact parser shape from
`lib/genesisFortyTwoSource.ts` or `lib/genesisThirtyNineSource.ts` — don't
redesign it. Only change:

- Type name (`Genesis<Word>PersonalSection` → `<Book><Word>PersonalSection`)
- Parser function name and its two regexes (`^#\s*Genesis\s+42:` → your
  book/chapter — case-insensitive, allow `-`, `–`, `—` in the verse range)
- `chapter: <N>` in the pushed object
- The expected section count in the `if (sections.length !== N) throw`
  safety check — **always keep this check**; it's what catches a malformed
  raw-text edit before it silently ships broken content.
- The raw text constant and the final export name

The raw markdown text (steps 2-3) goes into the `RAW_NOTES` template
literal verbatim. `icon: ""` on every pushed section (the emoji already
lives inside the title/heading text itself, this field is unused for
verbatim-preserved chapters).

## 5. Wire it into the reader

In `lib/bibleReaderStudyNotes.ts`:

1. Add the import near the other `genesis*Source` imports:
   ```ts
   import { GENESIS_FORTY_TWO_PERSONAL_SECTIONS } from "./genesisFortyTwoSource";
   ```

2. Find `preserveExactPhraseBodies` inside `makePersonalPhraseSectionForBook`
   (~line 417). This flag decides whether your raw card text is shown
   **verbatim** (what you want — you already formatted it by hand) versus
   run through the generic `formatBibleYearPhraseCard` reformatter (built for
   thinner, non-bulleted source content; it will mangle hand-formatted
   cards). Currently:
   ```ts
   const preserveExactPhraseBodies =
     normalizeBook(book) === "genesis" &&
     ((section.chapter >= 1 && section.chapter <= 40) || section.chapter === 42);
   ```
   Extend this — add your book/chapter to the condition. For a different
   book, add an `||` clause: `(normalizeBook(book) === "revelation" &&
   section.chapter === 12)`. Never widen an existing range to sweep in a
   chapter that still uses the old thin format — that chapter will lose its
   synthesized bullets and show raw unformatted paragraphs instead.

3. Add the wiring call, in reading order with the other chapters of that
   book, using its own `replaceStudySectionsForBookRange` call (don't fold
   it into a neighboring chapter's call unless that neighbor is also being
   freshly authored in the same raw format):
   ```ts
   replaceStudySectionsForBookRange(
     "genesis",
     42,
     42,
     GENESIS_FORTY_TWO_PERSONAL_SECTIONS,
   );
   ```

## 6. Verify before calling it done

Never assume the parser or wiring worked — check it:

```bash
npx tsx -e "
import('./lib/bibleReaderStudyNotes').then(({ getBibleReaderStudySections }) => {
  const s = getBibleReaderStudySections('genesis', 42);
  console.log('sections:', s.length);
  for (const sec of s) console.log(sec.reference, sec.title, sec.categories[0].content.length, 'cards');
  console.log(s[0].categories[0].content[0]);
});
"
```

Check for:
- Section count matches what you designed in step 1.
- The printed card text matches your raw markdown **verbatim** — no
  reformatting artifacts, no garbled emoji, no repeated sentences. (If you
  see duplication or mangled emoji, `preserveExactPhraseBodies` is false
  for this chapter — go back to step 5.2.)
- Run a quick regression check on a neighboring chapter and one other book
  to confirm nothing else broke:
  ```bash
  npx tsc --noEmit -p .
  ```

Then, if the user wants to see it rendered (not just the data), start the
dev server and screenshot the `/Bible/<book>/<chapter>` route with the
"Notes" tab open — see the `run` skill for the dev-server-in-sandbox
gotchas (background dev servers can die between tool calls here; combine
server start + curl warmup + screenshot into one shell invocation).

## 7. Show the draft before writing files, when asked

If the user asks to see the notes "before you do anything else," write the
full raw markdown (steps 2-3) directly in chat first, in the exact format
above, and wait for their go-ahead before creating the source file and
wiring it in.

## Reference implementation

`lib/genesisFortyTwoSource.ts` is the canonical, currently-shipped example —
read it whenever you need to see the complete pattern end to end, including
a full 9-section, ~40-card chapter done right.
