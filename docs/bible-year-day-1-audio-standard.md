# Bible In One Year — Day 1 Audio Standard

This is the reference spec for every Bible-in-one-year day lesson, derived by
reading exactly what Day 1 does in
`scripts/generate-bible-year-day-one-audio.ts`.

Day 1 is not "days 2+ with better writing." It runs a **completely separate
code path** and produces a structurally different episode. Everything below is
what makes Day 1 Day 1.

---

## 0. The headline difference

`main()` branches on `dayNumber === 1`:

| | Day 1 | Days 2-70 |
|---|---|---|
| Script source | Hardcoded segments in the generator | `docs/bible-in-one-year-day-XX-narrator-script.md` |
| Unit of speech | **Segment** (many short TTS calls) | One flat text, chunked at 3400 chars |
| Pauses | **Authored per segment** (450-1200 ms) | Whatever the TTS model happens to do |
| Scripture | **Verse by verse**, God's speech split out | Whole block read as one run |
| Music bed | **None** | `mixVoiceWithBed()` synthesized pad |
| TTS persona | "warm, cinematic, personal… trusted guide" | "deep, warm, older male… documentary pacing" |
| Length | ~17.3 min | 15-36 min (drifts badly) |

**The production value in Day 1 is the segmentation and the authored silence,
not the writing alone.** That is the part that must be reproduced.

---

## 1. The segment model

```ts
type BibleYearAudioSegment = {
  role: "narrator" | "god" | "adam";
  scene: "void" | "light" | "water" | "life" | "humanity" | "rest" | "dust" | "eden" | "relationship";
  text: string;
  pauseAfterMs?: number;
};
```

Each segment is its own OpenAI TTS call. Segments are concatenated with
`pauseAfterMs` of true digital silence between them. That silence is authored,
not incidental — it is why Day 1 breathes.

### Known dead weight (do not copy forward blindly)

- `buildDayOneSingleNarratorSegments()` builds the full multi-voice segment
  list, then **flattens every role back to `"narrator"`**. The `god` and `adam`
  voices, `pitchDown()`, and `addDelayBody()` are all built and then discarded.
  Day 1 as shipped is single-voice.
- `scene` is carried through every segment but Day 1 never applies a bed, so
  scene currently has **zero audible effect** on Day 1.
- `synthesizeContinuousProductionBed()` and the `cursor` accumulator in
  `main()` are unreachable/unused.

Both facts matter: the scene tags and the God voice are *authored intent that
never reaches the listener*. Decide deliberately whether to switch them on
(see §6) rather than inheriting the dead code.

---

## 2. Script structure

### 2a. Cold open — 7 segments, no music, no title card

Day 1 ignores `lesson.opening` entirely and hardcodes this shape:

1. Direct personal greeting — `"Hey. I am really glad you are here."` (700 ms)
2. Name the day — `"Today is Day 1 of our journey through the Bible together."` (650)
3. **Negative-space list** placing the day in the whole story — "Before Abraham. Before Moses. Before David. Before Jesus. Before cities, war, pain, and shame. The story starts here." (800)
4. Short landing line (1000)
5. **Shortest line, longest pause** — "There was God." (1150)
6. What we are doing today, framed as walking together not learning facts (650)
7. **Invitation to settle** — "So take a breath. Let the noise settle for a moment." (900)

Rules that generalize:
- Second person, singular. One listener, never "everyone."
- No "welcome to episode N of…" branding. Day 1 never says the podcast name.
- Sentence fragments are correct here. The pauses do the grammar.
- The pause after a line scales with its weight, not its length.

### 2b. Body — per Scripture block

For each `section` in the lesson, in order:

1. **Spoken reference** — `"Genesis 1 verses 1 through 5."` (700 ms)
   Range only. Never announce individual verse numbers.
2. **Verse-by-verse Scripture**, WEB text, one segment per verse.
   Where God speaks, the verse is split into separate segments:
   `narrator("God said.")` → `god("Let there be light.")` → `narrator("And there was light.")`
   That three-beat split is the single most distinctive move in Day 1.
3. **Teaching lines**, 4-6 per block, 560 ms pause each.

### 2c. Teaching voice — the actual differentiator

Day 1 keeps two parallel teaching sets for the same verses. Compare:

> Days 2+ style: "The story starts with God already there. Not created. Not explained."

> **Day 1 style:** "Stay here for a second. Before anything exists, God is already there. He is not introduced like a character who walks onto the stage. He simply is."

The Day 1 set consistently:
- **Opens by directing attention** — "Stay here for a second." "Now the camera moves closer."
- **Turns to the listener's life** at least once per block — "Maybe you know what it feels like when life seems dark, unfinished, or hard to understand."
- **Says "you," and means one person** — "You are not an accident."
- **Ends the block on a resolved beat**, not a summary — "Before shame entered the story, there was peace."
- Uses cinematic framing language (camera, scene, stage) rather than lecture language (point, principle, application).

Never: sermon cadence, three-point structure, rhetorical questions to a crowd,
"as we can see," "the text tells us."

### 2d. Close — 11 segments

The fixed shape, in order:
1. "So this is where the Bible begins." (700)
2. What it did **not** begin with — negative-space again (700)
3. Long verb-stack of what God did this day (800)
4. Why it matters for the rest of the Bible (700)
5. What is coming later, listed but deferred (800)
6. Three "You were…" lines (850)
7. **The one thing to carry** — explicitly flagged: "if you carry nothing else from Day 1, carry this" (900)
8. Tomorrow's tease, naming the next chapters and the emotional turn (850)
9-11. Three short landing lines, each shorter than the last, final pause 1200 ms:
   "For now, rest in the beginning." / "The world was made good." / "And you were made on purpose."

The descending-length ending is the signature. Do not end on a long sentence.

---

## 3. Narration settings

```
POST https://api.openai.com/v1/audio/speech
model:           gpt-4o-mini-tts
voice:           GENESIS_ONE_TTS_VOICE   (lib/genesisOneTtsAudio.ts)
response_format: pcm                     (raw 24 kHz s16le mono)
```

Day 1 narrator `instructions` (verbatim — this is the standard):

> Speak in a warm, cinematic, personal, emotionally grounded masculine voice.
> Sound like a trusted guide walking one listener through Scripture, not like a
> sermon, lecture, podcast, or generic audiobook. Use intimate pacing, soft
> dramatic pauses, and reflective emotional weight. Let Scripture readings feel
> reverent and spacious. Announce each Scripture range naturally, for example:
> Genesis 1 verses 1 through 5. Do not announce every individual verse number.
> Do not read markdown, headings, emojis, bullets, sound effect cues, or
> formatting labels. Speak directly to one person with calm hope, wonder, and
> presence. Do not sound robotic, theatrical, rushed, salesy, or overly polished.

Days 2+ use a different, weaker persona ("documentary pacing", "audio Bible
story companion"). **The Day 1 persona string is the standard.**

---

## 4. Audio chain

```
per segment:  text → TTS(pcm) → Float32 → [processVoiceForRole] → + silence(pauseAfterMs)
episode:      concat all → normalizeVoiceOnlyEpisode() → encodeMp3()
```

Constants:

| | |
|---|---|
| `SAMPLE_RATE` | 24000 |
| `MAX_TTS_CHUNK_LENGTH` | 3400 |
| `MP3_KBPS` | 96, mono, via `lamejs` |
| Normalize | ×0.98, then peak-limit to 0.98 |
| Output | `tmp/bible-in-one-year/day-NNN/day-NNN-audio.mp3` |
| Storage | `tts-audio` bucket, `bible-in-one-year/day-NNN/day-NNN-audio.mp3`, `upsert: true` |

Day 1 writes the identical file to both `-audio.mp3` and `-voices-only.mp3`
because there is no bed to differ.

---

## 5. Music bed — as it exists for days 2+

Day 1 has **no music**. Days 2+ call `mixVoiceWithBed()`, which uses
`synthesizePeacefulBed()` — a fully synthesized bed, not an audio file:

- Minor-7th pad, 4-chord loop, 8 s per bar, roots 98 / 82.41 / 116.54 / 87.31 Hz
- 2.4 s attack, 2.2 s release per bar; 0.055 Hz slow pulse at ±16%
- Filtered noise "rain" (one-pole, coeff 0.965) plus sparse 1300-1900 Hz drops
- Per-scene texture layers (`void` adds 34/51 Hz sub, `water` doubles rain, `life`/`eden` add bird-like chirps, `rest` cuts texture to 38%)
- `AMBIENCE_GAIN`: 0.112 for day 1 (unused), 0.129 for day 2, 0.088 everywhere else
- 1.5 s fade in, 2 s fade out, 2 s tail past the voice
- Voice at ×0.96 under the bed

There are also real music files in the repo root (`SangeetKiAatma.mp3`,
`WinAgain.mp3`) that are **not referenced by this pipeline**.

---

## 5b. Runtime standard (decided 2026-08-11)

**One version per day. Aim for 15-20 minutes. Never let a day run past ~25.**

A 4-chapter day running longer than a 2-chapter day is fine and expected - the
reading drives the length. This is a guide rail, not a formula.

Rough sizing, from the measured Day 1 rate of 818 characters per minute of
speech plus ~1.3 min of authored silence:

| Total script | Runtime |
|---|---|
| ~11,000 characters | ~15 min |
| ~15,000 characters | ~20 min |
| ~18,500 characters | ~25 min (hard ceiling) |

Scripture is never abridged; it is fixed by the master plan. Teaching absorbs
the difference:

| Reading | Days in year | Scripture alone |
|---|---|---|
| 2 chapters | 14 | ~7 min |
| 3 chapters | 243 | ~11 min |
| 4 chapters | 108 | ~14 min |

Two things the agent must respect:

- **Day 1's teaching density is not the year-wide norm.** Genesis 1-2 is one of
  the lightest readings in the plan, which is why Day 1 affords ~7,200
  characters of teaching and framing. Heavier days get less. Match Day 1's
  *voice and structure*, not its word count.
- **If a draft would push past ~25 min, cut teaching, never Scripture.**

## 6. Decisions made (2026-08-11)

All resolved by Louis. The v2 pipeline in
`scripts/render-bible-year-day.ts` implements these.

| Decision | Outcome |
|---|---|
| Scope | Redo days 2-70 in this style, then build 71-365 |
| Music | Real MP3 bed on every day, including Day 1 |
| Music level | `music-gain` 0.08, voice at 1.0 (~2.2 dB more voice than the first pass) |
| Track | `SangeetKiAatma.mp3`, crossfade-looped to episode length |
| Multi-voice | On. Roles reach the listener instead of being flattened |
| God | `onyx` + deep/boom/echo chain. Not the old `pitchDown(0.72)` resample |
| Serpent | `ballad`. Male, smooth, never hissing |
| Narrator / Adam / Eve | `onyx` / `verse` / `coral` |
| Runtime | One version, 15-20 min (see 5b) |
| Loudness | `loudnorm=I=-16:TP=-1.5:LRA=11` on every render |

### Two fixes the v2 pipeline makes

1. **Silence trimming.** Every TTS clip ships with head and tail silence -
   measured at 1.00 s on "God said." and 0.75 s on "And there was light."
   Left in, it stacks on top of `pauseAfterMs` and turns a 380 ms beat into a
   2+ second hole at exactly the voice-switch points. Trim first, then apply
   the authored pause, so the pause is the only gap.
2. **Loudness.** The first Day 1 render peaked at 0.611 - about 4 dB quiet.
   Normalizing to -16 LUFS keeps 364 episodes consistent with each other.

## 6b. Building a new day

1. **Get the reading** from `docs/bible-in-one-year-master-plan.md`. Do not
   guess it and do not abridge it.
2. **Write a `BibleYearDayScript`** (see `lib/bibleYearDayTwoScript.ts` for the
   reference implementation): `opening` and `closing` as `[text, pauseMs]`
   pairs, and one block per Scripture range with its teaching lines.
   - Cold open: personal, second person singular, no branding, one
     "shortest line, longest pause" beat.
   - Teaching: 4-5 lines on a light day, 1-2 on a heavy one. At least one turn
     to the listener's real life per block where there is room.
   - Close: name tomorrow's reading and its emotional turn; final three lines
     descend in length, last pause ~1200 ms.
3. **Dry-run before spending anything.** Build the segments and check the
   projected runtime and the cast list. Rendering a 28-minute day and then
   discovering it is too long costs real money.
4. **Run the casting suite** if `bibleYearAutoCast` changed:
   `npx tsx scripts/test-bible-year-autocast.ts`
5. **Render**: `npx tsx scripts/render-bible-year-day.ts --day=N`
   Add `--upload` only when the day is approved. It is off by default.
6. **Re-mix is free.** Segments are cached individually, so `--remix` re-levels
   and re-beds with no API calls. Only rewriting the script costs money.

### What automatic casting will and will not do

God always gets God's voice. Adam, Eve and the serpent are cast in the Eden
chapters. **Every other speaker - Cain, Noah, Abraham, Isaac, Rebekah - reads
in the narrator's voice**, though they still get their own segment, so the
`"Cain said."` / pause / line rhythm still works.

Casting is deliberately conservative and will miss lines rather than risk
getting one wrong. A missed cast sounds like a normal audio Bible; a miscast
puts Cain's words in God's voice. If a specific verse matters enough to force,
hand-author it the way `lib/bibleYearDayOneSegments.ts` does.

### Still open

- **Adam and Eve have not been auditioned.** Adam has one line in Day 1
  (Genesis 2:23); Eve first speaks on Day 2. Audition both before Day 2 locks.
- **Cost is computed, not billed.** The project API key lacks `api.usage.read`,
  so the ~$0.26/day figure comes from measured workload at the published
  ~$0.015/audio-minute rate. Confirm against the billing dashboard.

---

## 7. What "matches the Day 1 standard" means — checklist

- [ ] Cold open is personal, second-person singular, no branding
- [ ] A "shortest line, longest pause" beat in the open
- [ ] Scripture announced by range only, never verse-by-verse numbers
- [ ] Scripture read verse by verse as separate segments
- [ ] God's direct speech split into its own segment with its own pause
- [ ] 4-6 teaching lines per block, each its own segment at ~560 ms
- [ ] At least one turn to the listener's real life per block
- [ ] Close names tomorrow's reading and its emotional turn
- [ ] Final three lines descend in length, last pause ~1200 ms
- [ ] Day 1 narrator `instructions` string used verbatim
- [ ] 24 kHz → 96 kbps mono MP3, normalized to 0.98 peak
- [ ] Runtime 20-30 min (Day 1 itself is 17.3 min; Day 3 is 36 min — both miss)
