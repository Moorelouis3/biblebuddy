# Bible Buddy Next Day Workflow

Use this when the user says something like:

- "create the next day"
- "do day 34"
- "build day 35"
- "create day 34 with the normal prompt"

The goal is to build a complete Bible-in-one-year day the same way as the previous days: journey entry, script, audio, page wiring, and deep reader notes.

## Step 0: Identify The Day

1. Find the day number and reading range from `docs/bible-in-one-year-master-plan.md`.
2. Check nearby completed days for the current file patterns:
   - `docs/bible-in-one-year-day-XX-narrator-script.md`
   - `lib/bibleYearDayTwenty...DeepNotes.ts`
   - `lib/bibleYearDaysContent.ts`
   - `lib/bibleYearDailyLessons.ts`
   - `scripts/generate-bible-year-day-one-audio.ts`
   - relevant reader notes file, such as `lib/exodusThirtyOneToFortyPersonalNotes.ts`
3. Do not guess the range if the master plan or nearby files disagree. Resolve the mismatch in code before continuing.

## Step 1: Build The Day

Build the day page and journey-map entry first.

Checklist:

- Add the day to the Bible year journey/content map.
- Give the day a clear title that matches the reading's main movement.
- Add the daily lesson metadata, reading range, chapters, and section structure.
- Follow the previous completed day as the UI example.
- Add or update deep-study section exports for the day.
- Confirm the day appears in the journey map and routes/pages like nearby days.

Quality bar:

- The title should be literal and useful, not vague.
- The UI should feel like the existing Bible Buddy Bible-year days.
- The day should not be a landing page; it should be the usable day experience.

## Step 2: Build The Script And Audio

Create the narrator script next, then audio.

Checklist:

- Create/update `docs/bible-in-one-year-day-XX-narrator-script.md`.
- Use one narrator only.
- Scripture first, then warm plain-language explanation.
- Keep the tone clear enough for a beginner without talking down.
- Generate the voice-only local audio with the existing script pattern:
  - `npx tsx scripts/generate-bible-year-day-one-audio.ts --day=XX --voice-only`
- Then generate or attach the final mixed version with Bible Buddy background music using the existing audio workflow for nearby days.
- Save local outputs in the same folder/pattern as previous days.
- Wire the final mixed audio to the day page.

Audio quality bar:

- One narrator voice only.
- No extra opening/ending that does not belong in the Bible-year format.
- Final page should use the mixed music-under-narrator version, not only a dry draft, unless the user explicitly asks for voice-only.

## Step 3: Build Reader Notes

After the day and audio are set, build the reader notes for every chapter in that day.

Placement:

- Put notes in the appropriate personal notes file for the book/chapter range.
- For Genesis examples:
  - `lib/genesisFortyOneToFiftyPersonalNotes.ts`
- For Exodus examples:
  - `lib/exodusTwoToTenPersonalNotes.ts`
  - `lib/exodusElevenToTwentyPersonalNotes.ts`
  - `lib/exodusTwentyOneToThirtyPersonalNotes.ts`
  - `lib/exodusThirtyOneToFortyPersonalNotes.ts`
- If a chapter has inline notes in `lib/bibleReaderStudyNotes.ts`, replace or filter them so old broad cards do not duplicate the new cards.

Reader-note rules:

- Every card should cover about 6 verses or fewer.
- No card may have fewer than 4 key phrases.
- Prefer 7 key phrases per card where possible.
- If a split creates a thin card, add beginner-focused key phrases.
- Think like a Bible beginner:
  - What word is confusing?
  - What object, place, law, ritual, or name needs explanation?
  - What repeated Bible pattern is happening?
  - What would someone miss if they do not know Genesis/Exodus/Leviticus yet?
- Use emoji phrase headings where helpful.
- Do not add fake "openings" or "endings" inside Scripture notes.
- Notes should explain the Bible text, not pad it.

Beginner phrase cards that are acceptable when a card is thin:

- `🧭 What Is Happening Here?`
- `🔎 Why This Detail Matters`
- `🧠 Beginner Connection`
- `🧵 Watch The Pattern`
- `❤️ What This Shows About People`
- `🙌 What This Shows About God`

## Required Validation

Run these before saying the day is done:

```powershell
npx tsc --noEmit --pretty false
npx tsx scripts/audit-bible-year-reader-day.ts --day=XX
git diff --check
```

The audit must show:

- `Sections under 4 phrases: 0`
- `Cards over 6 verses: 0`
- Report the section and phrase totals to the user.

If the day spans multiple note files, audit the whole day, not just one file.

## Commit And Push

Do not push unless the user says `push`.

When pushing:

- Stage only files related to the day.
- Leave unrelated dirty worktree files alone.
- Commit message format:
  - `Build Bible year day XX`
  - or `Deepen Bible year day XX notes` if it was notes-only.

