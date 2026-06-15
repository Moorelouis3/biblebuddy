# Bible Buddy Next Day Workflow

Use this when the user says something like:

- "create the next day"
- "do day 34"
- "build day 35"
- "create day 34 with the normal prompt"

The goal is to build a complete Bible-in-one-year day the same way as the previous days: journey entry, script, audio, page wiring, and deep reader notes.

## Batch Run Rule For Days 39-365

When the user asks for a range such as "do day 39 to day 44", treat it as a repeated day-production run, usually 5 days at a time unless the user says otherwise.

Use Days 37 and 38 as the current quality baseline and Day 1 Genesis 1 as the layout/format baseline.

For each day in the requested range, complete the full checklist before moving to the next day:

1. Check whether the day already exists.
   - If it exists, audit what is already there before changing it.
   - If it does not exist, build it from scratch using the master plan reading.
   - Do not assume an existing generated day is good enough.

2. Build or repair the day page and journey data.
   - Add the day to the journey map/content map if missing.
   - Use the actual reading from `docs/bible-in-one-year-master-plan.md`.
   - Keep the dashboard/player layout consistent with the published BibleBuddy day layout.

3. Build the narrator script and audio.
   - Use OpenAI / ChatGPT TTS for the narrator voice.
   - Use one narrator voice only.
   - Save the local narrator-only audio.
   - Create the final mixed music-under-narrator audio.
   - Wire the mixed audio to the day.
   - Target 20-30 minutes for the final day audio. If the audio is outside that range, revise the script and regenerate before calling the day done.

4. Build the Scripture notes.
   - Add notes for every chapter assigned to that day.
   - Section cards must have their own intentional emoji and heading.
   - Section-card emojis should not all repeat across the day.
   - Key phrases must be real phrases from the assigned King James Version text inside BibleBuddy.
   - Do not use single words, names, or topics as key phrases when the feature calls for phrases.
   - Every key phrase heading must include an emoji.
   - Every phrase explanation must follow the Genesis 1 / Day 37 / Day 38 explanation standard and the Day 25 9.5 standard: explain the exact phrase directly, define confusing words first, stay on topic, use short paragraphs, and avoid canned framework language.

5. Audit the notes before moving on.
   - No fake generated filler phrases.
   - No repeated fallback openings such as "These words...", "This phrase belongs...", or "A reader should connect...".
   - No repeated generic emoji lists across cards.
   - No repeated first explanation line across phrase cards in the day unless the exact phrase is intentionally repeated and the second use explains the repetition.
   - No opening paragraph should simply repeat the key phrase. It should define the hard word, explain the image, identify the object, name the action, or answer the natural reader question.
   - Hide the emoji list and takeaway sentence. The explanation paragraphs alone must teach the phrase well enough for a new Bible reader.
   - No section under 4 key phrases.
   - No card over 6 verses.
   - Prefer about 150+ phrase cards for a full multi-chapter day when the reading size supports it.

6. Validate the day.
   - Run TypeScript.
   - Run the reader-day audit for that day.
   - Run `git diff --check`.
   - Report section and phrase totals.

Only after all days in the requested range pass their own checks should the batch be considered done.

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
- Phrase cards only. Do not add broad commentary cards such as "What Is Happening Here?", "Why This Detail Matters", "Beginner Connection", "Watch The Pattern", "What This Shows About People", or "What This Shows About God".
- Use Exodus 1-4 Day 22 as the phrase-card explanation model. Each card must teach the exact phrase in front of the reader, the way Exodus 1:1-6 explains "These Are The Names", "Which Came Into Egypt", "Every Man And His Household", "Seventy Souls", "Joseph Was In Egypt Already", and "Joseph Died, And All His Brethren".
- Use the corrected Day 24 and Day 25 Exodus cards as the current formatting example for later Exodus days: start by explaining the phrase's meaning in plain language, then use short spaced teaching lines and emoji lists only when they help.
- Day 25 now sets the 9.5 explanation standard:
  - Explain like the reader does not already know the Bible word, object, place, ritual, measure, or idiom.
  - Define confusing KJV wording immediately: examples include "shew," "hath," "ye," "even," "flesh," "murmured," "wroth," "omer," "Sabbath," "sanctuary," "ordinance," and "leavened bread."
  - Answer the hidden question inside the phrase, such as "What is leavened bread, and why can it not be eaten?" or "What is an omer, and why keep one?"
  - Make each phrase card in a section teach something distinct. A seven-phrase section should not have seven cards saying the same broad idea.
  - The emoji list supports the explanation. It must not carry the teaching by itself.
  - The takeaway reinforces the exact phrase. It must not be generic recap padding.
- Use the Genesis 1-style Key Phrase format: explain the exact phrase directly, use short spaced lines, add emoji lists only for real listable ideas, and teach the phrase without announcing the framework.
- Do not start the first sentence by citing the section reference, such as "The Hand Of The LORD in Exodus 9:1-6...". The card title already anchors the phrase. Explain the phrase directly, such as "The Hand Of The LORD means..."
- Do not write bucket explanations where many cards begin the same way, such as "This verse shows...", "This phrase belongs to...", "is worth slowing down...", "this phrase comes directly...", "not filler...", "This phrase matters because...", "It connects to the larger Bible theme...", or the same recap paragraph repeated across cards.
- The first sentence of each phrase card should be specific to that exact phrase, not a reusable category label.
- Avoid openings that only repeat the key phrase, such as "No Leavened Bread Be Eaten means..." when a beginner needs the term explained. Prefer "Leavened bread is bread made with leaven, something like yeast that makes dough rise."
- Use short paragraph spacing and emoji lists when they genuinely help the reader see parts of the phrase.
- Think like a Bible beginner:
  - What word is confusing?
  - What object, place, law, ritual, or name needs explanation?
  - What repeated Bible pattern is happening?
  - What would someone miss if they do not know Genesis/Exodus/Leviticus yet?
- Use emoji phrase headings where helpful.
- Do not add fake "openings" or "endings" inside Scripture notes.
- Notes should explain the Bible text, not pad it.


## Required Validation

Run these before saying the day is done:

```powershell
npx tsc --noEmit --pretty false
npx tsx scripts/audit-bible-year-reader-day.ts --day=XX
git diff --check
```

For a 9.5 run-through, also perform a rendered phrase-card quality scan before final response:

- duplicate first explanation lines: 0
- title-repeat openings: 0, except intentional repeated phrases handled with different context
- filler hits: 0 for lines such as "This helps the reader...", "This gives a real detail...", "This phrase shows...", "This phrase explains...", "part of the passage means...", and other reusable padding
- section-level repetition review completed for every section in the requested day range

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
