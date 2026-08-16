---
name: bible-notes
description: The complete Bible Buddy process for writing chapter study notes (section cards and phrase cards) in the in-app Bible reader, from Genesis 1 through Revelation 22. Use whenever writing, rewriting, deepening, or auditing chapter notes for any book, so every single chapter — no matter how obscure — reads at the same depth and voice. This is the crown-jewel feature of the app; treat it accordingly.
---

# Bible Notes — the Bible Buddy process

## ⚠️ FORMAT UPDATE (2026-08-17) — read this first

Genesis 1 is now the standard for every chapter. Chapters are no longer built
as a few section boxes of phrase notes. They are built as **Insight Cards**:
two to three per verse, eighty or more per chapter, each tied to the exact KJV
words it explains.

Read **`docs/INSIGHT_CARDS_STANDARD.md`** in full before building or rewriting
any chapter. It covers the coverage bar, how to reuse notes that already
exist, where to write the ones that are missing, the per chapter data files,
and the two rules that must never be broken.

The note voice is still governed by `docs/bible-study-note-style.md`.

## ⚠️ STYLE UPDATE (2026-07-31) — read this before anything else below

Louis replaced the card-writing style with a stricter, hand-written spec:
**`docs/bible-study-note-style.md`**. Read that file in full and follow it
exactly for every card's voice, format, and rules (one idea per body line
with a blank line between every line, exactly four bullets per card, no
hyphens/em dashes/semicolons/contractions, four fixed opening moves, and
so on). It supersedes the density target, bullet-count range, and voice
guidance described further down in this file (Quick Summary bullets 3-4,
Part 2 Step 3, the "2-4 emoji bullets" rule, etc.) — wherever this file and
the new spec disagree on card *content and format*, the new spec wins.

Everything else in this file still applies as written: fetching real KJV
text, chunking into sections, the file/wiring/verification mechanics (Part
2 Steps 5-8), and Part 4's guidance on different chapter types.

`lib/genesisThirtyOneSource.ts` is the reference implementation of the new
style — read it to see the exact shape before writing. After writing, run
`python3 scripts/check_bible_note_style.py lib/<yourfile>Source.ts` and fix
everything it reports (it checks the mechanical rules only — line length,
exactly 4 bullets, banned words/punctuation, repeated emoji, duplicate
titles — it cannot judge whether a note actually teaches something instead
of reciting the verse, so also run the checklist in the spec's section 13
by eye).

### Which chapter is next — check the priority queue, then the redo backlog

Before anything else, read `data/bible-notes-priority-queue.json`. If its
`remaining` array is non-empty, your target chapter is the FIRST entry in
that array — this is a Louis-requested, out-of-canonical-order detour (for
example, "skip ahead and write all of Proverbs now"). Write it as a normal
brand new chapter (fetch KJV, write the source file, wire it into
`lib/bibleReaderStudyNotes.ts`, verify, log). Once verified and pushed,
remove its entry from the front of `remaining` as part of the same commit.
Leave the redo backlog and normal forward progress alone while this queue
has entries — no extra bookkeeping is needed to resume normal forward
progress afterward, since the canonical-order scan described below always
starts again from Genesis 1 and will land on whatever chapter was actually
next before the detour started.

Only once that queue is empty, read `data/bible-notes-style-redo-remaining.json`.
If its `remaining` array is non-empty, your target chapter is the FIRST
entry in that array, not whatever the normal canonical-order lookup would
find. These are chapters that already have an old-style file wired in
(written before this spec existed) and need to be regenerated from scratch
to match it — overwrite the existing file's content entirely, keeping the
same exported type, function, and const names so nothing else needs to
change (do not touch the wiring in `lib/bibleReaderStudyNotes.ts` for one
of these — it is already correct). Once you finish and verify that
chapter, remove its entry from the front of the `remaining` array as part
of the same commit.

Only fall back to the normal "first chapter in canonical order with no
existing wired-in file" lookup once both of the above are empty.

## Quick summary (read this first, details follow)

- One process, all 1,189 chapters, Genesis 1 to Revelation 22. No book gets a lower bar.
- Fetch the real KJV text before writing anything. Never write from memory.
- Split each chapter into sections of roughly 3-9 verses, one KJV heading each.
- Inside each section, write phrase cards. **Target about 2 phrase cards per verse.** One card per verse is the floor, only when a verse genuinely doesn't have two separate "wait, what does that mean" moments. Never go thinner than 1 per verse as a default — that was tried and rejected mid-project for being too shallow.
- Every card: short plain sentences (5th/6th grade reading level), explain the *meaning* of the phrase — not a recap of what the reader just read — grounded in real history/culture/word-definitions, ending in 2-4 short emoji bullets.
- You are the Bible Buddy standing next to the reader. Answer their question before they ask it.
- Build a dedicated `lib/<book><ChapterInWords>Source.ts` file, wire it into `lib/bibleReaderStudyNotes.ts`, verify with the parser check and `tsc --noEmit`, then check it renders in the browser.
- Log every finished chapter in `docs/BIBLE_BUDDY_NOTES_PROGRESS.md`.

---

## Part 1 — Why this feature exists (read this before writing a single card)

Bible Buddy has two main pieces: the Bible-in-one-year audio journey, and the chapter study notes. The notes are the crown jewel. They are the reason the app was built in the first place — not a nice-to-have, not one feature among many. If anyone works on this app, the notes are what deserves the attention above everything else.

Picture someone sitting down to read the Bible next to a friend who already knows the history, the culture, the original languages, and the whole story arc — someone patient enough to stop at every confusing word and quietly explain it before the reader even has to ask. That friend is Bible Buddy. The notes exist to be that friend, permanently, on every page.

That means the job is not to summarize a chapter. The reader already read the chapter — the plain verse text is sitting right there above the notes. Repeating "Joseph's brothers were jealous of him" back to someone who just read that sentence is worthless. The job is to answer the question the reader didn't know they had: *why is this word here, why does this detail matter, what would this have meant to the person who first heard it, and what does it mean for me now?*

### Who we're writing for

Assume the reader:

- Has little or no background in ancient Near Eastern culture, geography, or history.
- Doesn't know Hebrew, Greek, or Aramaic, and has never opened a concordance.
- Doesn't know basic Bible genealogy or timeline unless it's been explained to them before, in this app.
- Is coming to this text sincerely wanting to know God, not studying it as literature or trying to win an argument.
- Will quietly skip past a confusing word or custom rather than stop and Google it — which means if we don't explain it, they walk away with a gap in understanding and don't even know it.

Two concrete examples of the kind of thing that must never get skipped:

**The coat of many colors (Genesis 37:3).** A modern reader sees "coat of many colors" and thinks "pretty jacket, nice gift." They don't know that in this culture, a coat like that marked its wearer as someone who didn't have to do manual shepherd's labor — a symbol close to royalty or nobility, completely out of place for one son in a family of working shepherds. Without that explanation, the reader misses why this specific gift was such an obvious, public declaration that Jacob loved Joseph more than his brothers, and why the brothers' rage makes sense. The coat isn't a nice detail. It's the whole engine of the next ten chapters, and it only works if the reader understands what the coat *meant*, not just that it existed.

**Abraham's family tree.** A reader can easily get confused about who belongs to whom. To get it right: Abraham and Sarah have Isaac, the promised son. Isaac later has two sons of his own with Rebekah — Esau and Jacob — that's a full generation down from Abraham, not Abraham's own sons. Before Isaac was even born, Abraham also had Ishmael, through Sarah's handmaid Hagar, when Sarah doubted the promise and offered Hagar as a way to have an heir. Then, after Sarah dies, Abraham marries again — Keturah — and has several more sons through her (Zimran, Jokshan, Medan, Midian, Ishbak, and Shuah are named in Genesis 25). If a chapter touches any of this, the notes need to lay it out plainly, because a reader who doesn't already know this family tree will not follow the story otherwise, and won't say anything — they'll just quietly stay confused.

That's the standard: **assume nothing**, and explain anything a sincere first-time reader might silently not understand — a word, a place, a custom, a family relationship, a number, a measurement, a ritual, an idiom, a geographic direction, a name's meaning, anything.

---

## Part 2 — The process, step by step

### Step 0 — Never write from memory. Fetch the real KJV text first.

```bash
curl -s "https://bible-api.com/<book>+<chapter>?translation=kjv"
```

(If it returns `"Retry later"`, it's rate-limited — wait a few seconds and retry.)

Read the whole chapter closely before drafting anything. Make a running list of:

- Every archaic/KJV word a modern reader would stumble on (see the word list below).
- Every place name, person name, number, measurement, or object that isn't self-explanatory.
- Every custom, ritual, or historical detail that needs context.
- Every idiom or figure of speech that doesn't mean what it sounds like literally.
- Every moment a first-time reader would think "wait, what does that mean?"

This list drives which phrases get their own card. Do this work before writing a single sentence of prose — guessing at the text from memory has caused real errors in this project before (misquoted verses, wrong verse boundaries). Always ground every claim in the actual fetched text.

### Step 1 — Chunk the chapter into sections

Split the chapter into sections of roughly 3-9 verses. Shorter, denser sections (3-5 verses) are usually better than long ones — they keep the reader from feeling buried, and they make it much easier to hit full phrase-card coverage per verse. A 34-verse chapter like Genesis 44 became 8 sections; a 57-verse chapter like Genesis 41 became 11.

Each section needs:
- A verse-range reference (`Genesis 44:1-5`)
- One short, specific title with one emoji (not a generic label — "Joseph Sets A Trap," not "The Story Continues")

### Step 2 — Identify phrase-card candidates: aim for 2 per verse

This is the step that was originally done wrong and had to be corrected mid-project — worth stating plainly so it never regresses.

For every verse in the section, ask: **what would a first-time reader stop and wonder about here?** Usually there are at least two separate things worth a card in any given verse — a word that needs defining, a custom that needs explaining, an emotional beat that needs unpacking, a name or number worth pausing on, a callback to something earlier in the book. Sometimes a verse is a short connector ("and it came to pass...") that genuinely doesn't have two things to unpack — that's fine, give it one card, or fold it into the card for the next meaningful phrase. But don't default to thin coverage. A 5-verse section landing at only 2 cards is under the bar. A 5-verse section landing at 8-10 cards, each teaching something distinct, is the target.

**If a phrase you're about to write a card for actually contains two separate beats, split it into two cards instead of one.** A real example of the mistake: a Genesis 45 card titled "I Am Joseph; Doth My Father Yet Live?" bundled two different moments — Joseph revealing his identity, and Joseph asking about his father — into one card. Those are two separate things a reader would stop and react to separately, so they need two separate cards, even though they're back-to-back in the same verse. Before finalizing a card, check: is this one idea, or is it actually two ideas wearing one heading? If it's two, split it.

Categories worth scanning every verse for:

- **Hard/archaic words** — anything a modern reader would misread or not know at all
- **People** — names, titles, family relationships, especially anything that could be confused with another figure
- **Places** — cities, regions, geographic directions ("went down to Egypt" is directional/theological, not just travel)
- **Objects and measurements** — coins, weights, containers, garments, whatever isn't a modern everyday item
- **Customs and rituals** — anything a reader in ancient Israel, Egypt, or the wider ancient Near East would understand instantly but a modern reader wouldn't
- **Numbers** — ages, counts, time spans; often carry meaning (seven years, forty days, three days)
- **Idioms** — phrases that don't mean what they sound like literally ("gray hairs to the grave," "set mine eyes upon him")
- **Emotional/character beats** — a character's motive, fear, grief, or growth that the plain text states but doesn't explain
- **Callbacks** — connections to earlier chapters, promises, or patterns the reader might not catch on their own
- **Theology** — what the passage reveals about God, sin, covenant, mercy, judgment, without turning into a sermon

### Step 3 — The exact card format

Every phrase card:

```
## <emoji> <Phrase Heading In Title Case>

<Sentence 1 — plain, direct explanation of what the phrase/word actually means.>

<Sentence(s) 2-4 — historical, cultural, or textual grounding: why this detail
mattered to the original audience, what a reader would otherwise miss.>

<Optional sentence(s) — a deeper layer: connects to another part of the book,
a character detail, or what it reveals about God, without becoming a sermon.>

<emoji> <short bullet, one clause>

<emoji> <short bullet>

<emoji> <short bullet — 2 to 4 total, one per line, blank line between>
```

Rules:

- **Short, plain sentences.** Most sentences are one line. Avoid words like "scarcity," "iniquitous," "divergent" — write at roughly a 5th/6th grade reading level. If a hard word is unavoidable because it's the KJV word itself (e.g. "wroth," "iniquity"), define it immediately in plain language.
- **Explain, don't recap.** Never restate what the verse says in different words as if that were the teaching. The reader already read the verse. Say what it *means* — the history behind it, the word definition, the emotional or theological weight, the thing they'd have to Google otherwise.
- **No inflated filler.** Cut sentences that sound smart but say nothing ("this represents the depth of human struggle against the backdrop of divine providence"). If a sentence doesn't teach something concrete, delete it.
- **2-4 emoji bullets per card**, each a genuinely separate point, not a restatement of the paragraph above it in list form.
- **Never repeat the same sentence, opening line, or structure across cards.** Each card should answer a different question. Scan a finished section for repeated first lines before calling it done.
- **Ground every claim in the actual text or well-established fact.** Don't invent psychology, don't invent historical claims that aren't reasonably well established, don't guess at a word's meaning — check it.
- No forced generic endings ("This teaches us that we should all try to be better people"). If there's a real, specific lesson, say it specifically. If there isn't, don't manufacture one.

### Step 4 — Section header format in the raw source text

```
# Genesis 44:1-5

# 🥤 Joseph Sets A Trap

---

## 🥤 Put My Cup, The Silver Cup, In The Sack's Mouth Of The Youngest

<card body>

---

## 🔮 Whereby Indeed He Divineth

<card body>

# Genesis 44:6-10

# ⚖️ The Accusation

---

...
```

The verse-range line and the title line are separate `#` lines, `---` follows the title, and each card is separated by `---`. Sections run back to back — the next section's `# Book C:V-V` line signals the previous section ended.

### Step 5 — Build the dedicated source file

Create `lib/<book><ChapterInWords>Source.ts` (e.g. `genesisFortyFourSource.ts`). Copy the exact parser shape from an already-shipped chapter — `lib/genesisFortyFourSource.ts` is the current best reference (highest density, most recent voice calibration). Only change:

- Type name and parser function internals for the new book/chapter
- The two verse-heading regexes (`^#\s*Genesis\s+44:` → your book/chapter, case-insensitive, allow `-`, `–`, `—`)
- `chapter: <N>` in the pushed object
- The expected section count in the `if (sections.length !== N) throw` safety check — **always keep this check**
- The raw text constant and the final export name

### Step 6 — Wire it into the reader

In `lib/bibleReaderStudyNotes.ts`:

1. Import the new sections constant near the other `genesis*Source`-style imports.
2. Extend the `preserveExactPhraseBodies` range/condition (inside `makePersonalPhraseSectionForBook`, search for that name) to include the new chapter. This flag makes your hand-formatted raw text render verbatim instead of being run through the generic auto-formatter built for thinner legacy content — skipping this step makes a correctly-written chapter look mangled in the app.
3. Add a `replaceStudySectionsForBookRange("<book>", <chapter>, <chapter>, YOUR_SECTIONS)` call in reading order with neighboring chapters of that book.

### Step 7 — Verify before calling it done

Never assume the parser or wiring worked:

```bash
npx tsx -e "
import('./lib/bibleReaderStudyNotes').then((m) => {
  const mod = m.default || m;
  const s = mod.getBibleReaderStudySections('<book>', <chapter>);
  console.log('sections:', s.length);
  let total = 0;
  for (const sec of s) { console.log(sec.reference, sec.title, sec.categories[0].content.length, 'cards'); total += sec.categories[0].content.length; }
  console.log('TOTAL CARDS', total);
}).catch(e => { console.error('ERROR', e); process.exit(1); });
"
```

(Note: depending on how tsx resolves the module, you may need `m.default || m` to reach the exports — check both if one comes back empty.)

Check for:
- Section count matches what you designed.
- Card count is close to 2x the verse count (never far below 1x).
- The printed text matches your raw markdown verbatim — no reformatting artifacts, no garbled emoji, no duplication.

Then run a full project type-check:

```bash
npx tsc --noEmit -p .
```

Zero errors, every time, before considering a chapter done.

Finally, if a browser preview is available, load `/Bible/<book>/<chapter>`, open the Notes/Chapter-notes view, click a section card to expand it, and confirm the phrase cards render with correct text. The Journey/Day view (`DashboardJourneyExperience.tsx`) pulls from the exact same `getBibleReaderStudySections` function, so verifying the standalone reader also confirms the Bible-in-one-year day view is correct — no separate wiring or verification needed there.

### Step 8 — Log it

Add a row to `docs/BIBLE_BUDDY_NOTES_PROGRESS.md`: date, chapter, section count, card count, any notes. Keep the running totals at the top of that file up to date.

Also add/update an entry in `data/bible-notes-progress-log.json` (book, chapter, startedAt, finishedAt, durationMinutes, sections, cards, verses, notes) — this feeds the private live dashboard at `/admin/bible-notes-progress` in the app itself (gated to the owner's account only). Get real timestamps with `date -u +"%Y-%m-%dT%H:%M:%SZ"` rather than guessing.

Also append a block to this project's `SESSION_LOG.md` containing the literal phrase `hourly chapter notes run` — this is what Louis's Life Buddy system (`second-brain/bibleBuddyWatch.js`) filters on to build its "recent runs" list for the cross-project executive report. Format:
```
## <date/time> (hourly chapter notes run)
Chapter: <Book Chapter> | Duration: <N> min | Sections: <N> | Cards: <N> | Status: pass
Next up: <Book Chapter>
```
This is the report the "Bible Note Writer Agent" sends up to Bible Buddy after every chapter — do this every single chapter, not just once per session, so Marcus never has to guess whether the agent is still alive.

### Step 8.5 — Track usage limits and blocks, permanently, every session

The user explicitly wants this watched every time this skill is used, not just once: log any usage/rate limit, block, throttling, or forced cooldown to `data/bible-notes-usage-events.json`. This is separate from the chapter progress log.

- If a chapter run is interrupted by an actual usage limit, block, or cooldown: log an event with `type: "block"`, the timestamp, how many chapters were completed before it happened, and whatever detail is available about the block itself.
- If work resumes after a wait: log a `type: "resumed"` event with the timestamp and how long the wait was, if knowable.
- Periodically (roughly every 10-20 chapters in a single running session) log a `type: "chapter_count_checkpoint"` event, just a marker of progress with no issue, so there's a real trail even if nothing goes wrong.
- Be honest in these logs about what's actually observable versus assumed — if the cause of a slowdown isn't clear, say that plainly rather than guessing a cause.

### Step 9 — Show the draft first, when asked

If the user wants to see notes before anything is written to disk, write the full raw markdown (steps 3-4) directly in chat, with a section/card-count breakdown table, and wait for approval before creating files. Once a working rhythm is established and the user says to proceed autonomously, this step can be skipped in favor of moving straight to implementation — but always still verify (step 7) and log (step 8) every chapter, and never skip the type-check.

---

## Part 3 — Word list to always watch for

Whenever any of these appear (or anything else archaic), it needs its own plain-English definition, inline, the moment the reader meets it — never a glossary at the end:

thither, hither, hence, thence, peradventure, verily, wist, wot/wotteth, beseech/besought, wroth, holpen, laded, ward, provender, espied, traffick, bereaved, sojourn, betwixt, howbeit, nay, aught, naught, durst, chode, froward, subtilty, concourse, privily, rent (torn), kine, leanfleshed/fatfleshed, rank (vigorous, not smelly), shew/shewed, discreet, surety, bondman, iniquity, divineth/divination, raiment, countenance, vagabond, estimation, jubile, sore (severe), abomination, mess (a portion of food), solemnly protest, gray hairs to the grave, and any Hebrew/Egyptian/Greek name whose meaning illuminates the story (Zaphnath-paaneah, Manasseh, Ephraim, On/Heliopolis, etc).

This list is a starting point, not exhaustive — the fetched KJV text for each chapter will surface its own set.

---

## Part 4 — Handling different chapter types

The core process (KJV first, chunk into sections, ~2 cards/verse, explain don't recap) is the same from Genesis 1 to Revelation 22. But different kinds of chapters need different emphasis inside that process:

**Narrative (most of Genesis–Esther, the Gospels, Acts):** scene-by-scene, watching for character motive, repeated words, emotional turns, and callbacks to earlier chapters.

**Law (much of Exodus, Leviticus, Deuteronomy):** don't summarize a block of laws in one card. Break down who the command is for, what's required, what words need defining, what cultural/ritual practice sits behind it, and what it teaches about God's holiness or Israel's identity — one law-cluster per card, not a whole chapter compressed into a paragraph.

**Genealogies (portions of Genesis, Chronicles, Matthew 1, Luke 3):** never filler. Explain why the names matter, what promise-line is being tracked, and call out any name or pattern worth noticing (an unexpected woman in Jesus's genealogy, a name meaning something significant, a generational gap).

**Poetry and Wisdom (Psalms, Proverbs, Song of Solomon, poetic sections of the prophets):** watch for parallelism (two lines saying the same thing two ways), metaphor, and repeated images — explain the image, don't flatten the poetry into bland prose.

**Prophecy (Isaiah–Malachi, Revelation):** ground every image in its historical situation first (who was this originally spoken to, and why), then note if/how it points forward. Don't skip straight to "end times" symbolism without first explaining what the original audience would have understood.

**Epistles (Romans–Jude):** these are arguments, not stories — trace the logical flow (therefore, but, so then), and explain first-century context (Roman customs, Jewish-Gentile tension, the specific church being addressed) wherever it changes what a phrase means.

---

## Part 5 — Forbidden patterns

Never use these as a crutch — they show up when a card is coasting instead of teaching:

- "This shows...", "This phrase explains...", "This verse teaches us that...", "This helps the reader..." as an opening line
- Repeating the phrase heading as the first words of the explanation ("Put My Cup In The Sack means Joseph put his cup in the sack") — say something new instead
- A takeaway line that tries to rescue a vague explanation — if the paragraphs don't teach the phrase on their own (with the bullets hidden), the card isn't done
- The same first sentence or paragraph shape repeated across a section
- Generic reading-tip or "pause and reflect" filler with no connection to the actual phrase
- Manufacturing a moral lesson that isn't really there just to end on something inspirational

---

## Part 6 — Quality checklist before shipping a chapter

- [ ] Fetched real KJV text, didn't write from memory
- [ ] Section count and verse ranges make sense, no verses skipped or double-covered
- [ ] Card count is at or near ~2x the verse count (never below ~1x)
- [ ] Every archaic word the chapter contains is defined in plain language, inline
- [ ] Every place, custom, number, and unfamiliar name is explained
- [ ] Every card explains meaning, not just recaps the verse
- [ ] No forbidden filler phrases (Part 5)
- [ ] No repeated first lines or structures across cards in the same section
- [ ] Sentences are short and plain (5th/6th grade level)
- [ ] Parser check passed — section/card counts match, text renders verbatim
- [ ] `npx tsc --noEmit -p .` is clean
- [ ] Logged in `docs/BIBLE_BUDDY_NOTES_PROGRESS.md`

## Reference implementation

`lib/genesisFortyFourSource.ts` is the current canonical example — highest card density, most recent voice calibration (short plain sentences, full near-2-per-verse coverage, real historical/cultural grounding). Read it whenever you need to see the complete pattern end to end.

Chapters written earlier in this project (Genesis 41 and 43) used a lighter, roughly 1-card-per-verse density before this standard was tightened. They're still good quality on voice, just thinner on coverage than the current bar — worth a density pass later, not urgent, noted in the progress log.
