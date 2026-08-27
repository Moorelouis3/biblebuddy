# Bible in One Year Day Writer Agent

The scheduled agent that writes and ships **one day** of the Bible in One
Year series per run: the spoken script, then the audio, then the push.

This file is the complete job description. The trigger prompt is deliberately
short and points here, so the real instructions live in git where they can be
reviewed and corrected.

**Schedule:** hourly, until days 12 onward are done. It then idles.

**Output per run:** as many days as you can finish properly, in order,
**committing and pushing after each one**.

**Commit after every single day.** Not at the end of the run. A run that dies
half way through must leave every finished day safely pushed — otherwise the
work is lost and the next run repeats it. This is the single most important
rule in this file.

Keep going until days 12 onward all exist, or until you are running low on room,
whichever comes first. Quality does not drop for the later days in a run: if
you cannot give a day the same care as Day 11, stop and let the next run take
it. A short run that pushed three good days beats a long one that pushed ten
rushed ones.

---

## Step 0 — Setup

Run `npm install` in the repo root first. Every run is a fresh clone with no
`node_modules`, and skipping this makes `tsc` fail with false "cannot find
module" errors.

## Step 1 — Pick the day

The target is the **lowest day number from 12 to 30 that has no script yet**.
Check `DAY_SCRIPTS` in `scripts/render-bible-year-day.ts`: the keys present
there are the days already done. Take the first missing one.

If every day from 12 to 30 is present, there is nothing to do. Append a note
to `MARCUS_HANDOFF.md` saying the run range is complete, commit and push
without `[deploy]`, and stop. That is a correct run.

## Step 2 — Make sure the day exists in the plan

`lib/bibleInOneYearPlan.ts` defines days 1-21 (Genesis). **Days 22 and up do
not exist yet** — Genesis finishes on Day 21, so Day 22 begins Exodus.

If your target day has no entry, add one in day order, matching the shape of
the entries around it:

- `dayNumber`, `title` (what the day is *about*, not just the reference)
- `reference` — e.g. `"Exodus 1-2"`. Two to three chapters is the norm; three
  only when they are short.
- `estimatedTime` — `"about 35 min"` for two chapters, `"about 40 min"` for
  three
- `summary: BIBLE_YEAR_DAY_AUDIO_SUMMARIES[<day>]` — add the summary there too
- `coverImage: "/day<N>cover.png"` — these already exist through day 31
- `readings: buildReadingsFromReference("<Study Title>", "<reference>")` —
  use this for any book other than Genesis. `buildGenesisReadings` is
  Genesis-only.

Keep going in order. Do not skip ahead to a book you find more interesting.

## Step 3 — Read the standard before writing

Read all of these in full:

1. `docs/bible-year-day-1-audio-standard.md` — the standard.
2. `lib/bibleYearDayElevenScript.ts` — the cleanest recent example, and the
   closest to the shape you are writing.
3. `lib/bibleYearDaysSevenToTenScripts.ts` — four more, including how a
   heavier reading gets consolidated.

## Step 4 — Write the script

Create `lib/bibleYearDay<Word>Script.ts` (e.g. `bibleYearDayTwelveScript.ts`)
exporting `BIBLE_YEAR_DAY_<WORD>_SCRIPT: BibleYearDayScript`, with the same
local `g()` helper the other files use.

The shape:

- `opening` — 7 to 9 lines, each `[text, pauseMs]`. Greeting, the day number,
  the tension of the day in two or three short lines, then the reference, then
  "Take a breath. Let's go."
- `blocks` — **five to seven** `g(chapter, startVerse, endVerse, teaching)`
  entries covering the whole reading in order, no gaps. Each `teaching` is
  **four lines**. More than seven blocks pushes the runtime too long, because
  every block also speaks its reference aloud.
- `closing` — 8 to 10 lines. What the day was, what it means, one line
  pointing at tomorrow, then a short final image that lands.

The voice, which matters more than anything else here:

- Short sentences. One idea per line. Plain words.
- Speak to one person, never "everyone" or "we as believers".
- Concrete over abstract. Name the thing that happened.
- Quote Scripture inside the teaching where it hits, in plain speech.
- No sermon voice, no rhetorical questions stacked up, no "beloved".
- Do not moralise the characters. Say what they did and let it sit.
- Emotional honesty over tidy lessons. If the text is uncomfortable, say so.

**Scripture is non-negotiable.** The verses are read from the database by the
pipeline, not typed by you, so your teaching must match what the chapters
actually say. Read the chapters before writing about them. Never describe an
event that is not in the assigned chapters.

## Step 5 — Wire it in

In `scripts/render-bible-year-day.ts`: import the new script and add it to
`DAY_SCRIPTS` under its day number.

Then `npx tsc --noEmit` must be clean before you go any further.

## Step 6 — The audio

**This environment has no `OPENAI_API_KEY` and no Supabase service key**, so
you cannot render or upload. That is expected, not a failure. Do not try to
work around it, do not install anything, and do not spend a run debugging it.
The audio is rendered on a machine that has the keys, in one batch, with:

```
npx tsx scripts/render-pending-bible-year-days.ts
```

So: skip the render, and make sure `MARCUS_HANDOFF.md` carries **one** line
saying which days are waiting on a local render. Update that single entry as
you add days rather than appending a new block per day.

If the keys ever do appear in this environment, render each day as you write
it with `npx tsx scripts/render-bible-year-day.ts --day=<N> --upload`, and
then the cast check below is yours to do.

### The cast check (whoever renders)

The render prints the cast, e.g.
`[day 012] cast: jacob/alloy, laban/verse, rachel/sage, god/onyx`.

**Every name in it must be a person who actually speaks in those chapters.**
The caster derives speakers from the text, so it invents one from a
capitalised word now and then. Real examples it has produced: `food`,
`Rehoboth` (a well), `Laying` (a participle) and `mizpah` (the watchtower in
Genesis 31:49 — the verse that names a place reads exactly like an
attribution). Fix by adding the word to `NOT_A_PERSON` in
`lib/bibleYearAutoCast.ts` and rendering again.

Two rules the cast has to keep, both already enforced in code — just do not
work around them:

- God is always `onyx`. If God appears as any other voice, something is
  broken; fix it rather than shipping it.
- No two characters in one episode share a voice.

If a character recurs across several days and drifts between voices, add them
to `BIBLE_YEAR_CAST` in `lib/bibleYearAudioCast.ts` with a voice that is free
in every episode they appear in.

## Step 7 — Log, commit, push

Append to `SESSION_LOG.md`:

```
## <ISO timestamp> (bible year day writer run)
Day: <N> — <title> (<reference>) | Runtime: <M> min | Cast: <roles>
Next up: Day <N+1>
```

Commit everything with a message describing the one day. **Do not put
`[deploy]` in the message** — the audio lives in storage, not in the build, so
nothing about this needs a Vercel build. Push to `origin main` and confirm the
push succeeded.

Then stop. One day per run.

## Hard limits

- Commit and push after every day, before starting the next.
- Never touch a day that already has a script.
- Never invent Scripture, and never write about chapters outside the day's
  reading.
- Never commit code that fails `tsc`.
- Never ship a cast containing something that is not a person.
- If anything blocks you, log it to `MARCUS_HANDOFF.md` and stop cleanly
  rather than retrying forever.
