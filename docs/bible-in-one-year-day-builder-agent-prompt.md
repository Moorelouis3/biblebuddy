# BibleBuddy Bible in One Year Day Builder Prompt

Use this prompt when asking an agent to build the next Bible in One Year day.

## Prompt

You are working in the BibleBuddy repo. Build Bible in One Year Day `[DAY_NUMBER]` so it works like the latest Day 1 Bible in One Year dashboard experience.

Before editing, inspect the existing implementation. Do not guess the structure. Read these files and follow the local patterns:

- `lib/bibleInOneYearPlan.ts`
- `lib/bibleYearDailyLessons.ts`
- `lib/bibleYearDaysContent.ts`
- `lib/bibleYearAudio.ts`
- `lib/bibleYearGenesisVerses.ts`
- `lib/bibleYearDayOneDeepStudy.ts`
- `lib/bibleYearDayOneDeepNotes.ts`
- `lib/bibleYearDayThreeDeepNotes.ts`
- `lib/bibleYearDayFourDeepNotes.ts`
- `lib/bibleYearDayFiveDeepNotes.ts`
- `lib/bibleYearDaySixDeepNotes.ts`
- `lib/bibleYearDaySevenDeepNotes.ts`
- any existing deep notes file for the target day
- `components/DashboardJourneyExperience.tsx`
- `components/BibleYearLessonAudioPlayer.tsx`
- `components/BibleYearDeepStudySectionCards.tsx`
- `app/api/tts/bible-year/day/[dayNumber]/route.ts`
- `scripts/generate-bible-year-day-one-audio.ts`
- `docs/bible-in-one-year-master-plan.md`

The target day should feel like Day 1 in the app: same dashboard task flow, same completion behavior, same summary card behavior, same deep notes modal behavior, same trivia/reflection behavior, same audio/video player behavior, same follow-along Scripture behavior, and same inline Continue behavior after all required tasks are complete.

Current Day 1 behavior to preserve:

- The dashboard loads the user's real current Bible in One Year day in the study area.
- Clicking a Journey Map cover opens that day in the same study area, not a separate popup.
- Task 1 shows video if `videoSrc` exists, otherwise the Bible Year audio player if audio exists.
- Under the video/audio, the user can expand `Follow Along in Scripture`.
- The follow-along panel stays on the same task screen, uses no iframe, does not open the full Bible reader, and shows the assigned Scripture chapters with headings and verse numbers.
- The follow-along panel is collapsed by default, toggles open/closed, is scrollable, mobile-friendly, and its scrollbar matches the active Bible Buddy theme.
- Day completion uses the inline completion/reflection panel, not the large blue modal popup.
- Pressing Continue in the inline completion panel advances to the next day; on the final available day it returns to the Bible in One Year dashboard/study page.

## Inputs I Will Provide

- Target day number: `[DAY_NUMBER]`
- Day title/theme: `[DAY_TITLE]`
- Bible reading range from the master plan: `[BOOK CHAPTERS]`
- Cover image path, if available: `[COVER_IMAGE_PATH]`
- Approved narrator script, if available: `[SCRIPT_PATH_OR_SCRIPT_TEXT]`
- Video embed URL, if available: `[VIDEO_URL]`
- Audio file path or storage upload target, if available: `[AUDIO_FILE_PATH]`
- Background music choice, if generating audio: one of:
  - `public/audio/background/bible-reading-1.mp3`
  - `public/audio/background/bible-reading-2.mp3`
  - `public/audio/background/bible-reading-3.mp3`

If I only say "do Day `[DAY_NUMBER]`," use `docs/bible-in-one-year-master-plan.md` and `GENESIS_BIBLE_IN_ONE_YEAR_SERIES` to determine the reading range and title, then build the day using the existing patterns.

## Required Content Structure

Add or update the day in `lib/bibleInOneYearPlan.ts`:

- `dayNumber`
- `title`
- `reference`
- `estimatedTime`
- `summary`
- `coverImage`, when provided
- `readings`, using the correct book/chapter assignments

For Genesis days, use `buildGenesisReadings(...)` and make sure the study title/day number aligns with the existing Genesis devotional/chapter study mapping.

Update `docs/bible-in-one-year-master-plan.md` if the day title, range, or structure changed.

## Daily Lesson Structure

Add or update the day lesson in `lib/bibleYearDailyLessons.ts` or the local file where the series has moved.

The lesson must follow the `BibleYearDailyLesson` shape:

```ts
{
  dayNumber,
  title,
  reference,
  estimatedListenTime,
  opening: string[],
  sections: [
    {
      heading,
      verseBlock: { reference, chapter, startVerse, endVerse },
      teaching: string[],
    }
  ],
  closing: string[],
}
```

The tone should match Day 1:

- calm
- clear
- warm
- Bible-centered
- enough context to understand what is happening
- not preachy
- not rushed
- connected to the larger Bible story

Verse sections in the lesson may be larger like existing app data, but the narrator script should use smaller sections when requested.

## Narrator Script Rules

If making or revising an audio script, first create the script and show it for approval before generating audio unless I explicitly say the script is already approved.

The script should:

- use the approved reading range for the target day
- use World English Bible wording for Scripture unless I ask for another translation
- read Scripture in natural sections
- keep each Scripture reading section to 5 verses or fewer when I request the full verse-by-verse narrator style
- explain the story between reading sections
- include light historical/cultural context where helpful
- sound calm, detailed, clear, and pastoral
- keep the focus more on what is happening in the passage than on motivational application
- target the requested length realistically

Important timing rule:

- Full verse-by-verse reading plus explanations for 3 chapters may exceed 20 minutes.
- If the requested runtime conflicts with reading every verse, tell me before generating audio and propose either a longer audio or tighter narration.

Save approved scripts under:

`docs/bible-in-one-year-day-[DAY_NUMBER]-narration-script.md`

## Audio Rules

The Bible in One Year media card works from `lib/bibleYearAudio.ts`.

Each day needs a `BibleYearAudioDay` entry:

```ts
export const BIBLE_YEAR_DAY_[NAME]_AUDIO: BibleYearAudioDay = {
  dayNumber: [DAY_NUMBER],
  title: "Day [DAY_NUMBER] - [DAY_TITLE]",
  storagePath: getBibleYearAudioStoragePath([DAY_NUMBER]),
  apiSrc: getBibleYearAudioApiSrc([DAY_NUMBER]),
  estimatedDuration: "about [N] min",
  videoSrc: "[VIDEO_URL]" // only if a video exists
};
```

If `videoSrc` exists, the app shows the embedded video player. If no `videoSrc` exists, the app shows the audio player using the signed Supabase URL from:

`app/api/tts/bible-year/day/[dayNumber]/route.ts`

Storage path format:

`tts-audio/bible-in-one-year/day-00X/day-00X-audio.mp3`

Use `getBibleYearAudioStoragePath(dayNumber)` rather than hardcoding paths when updating app metadata.

If generating audio:

- use the approved script only
- use the existing TTS/audio generation pattern in `scripts/generate-bible-year-day-one-audio.ts`
- use the requested voice/settings already used for Bible in One Year
- mix with one of the three approved background tracks if requested
- export MP3
- upload/copy to the expected Supabase storage path or provide the exact local file path if upload is not possible
- update `estimatedDuration`
- do not invent a video URL

## Deep Notes Rules

Each day needs deep notes that work in `BibleYearDeepStudySectionCards`.

For a new day, create or update a file like:

`lib/bibleYearDay[Word]DeepNotes.ts`

Export both:

```ts
export const BIBLE_YEAR_DAY_[WORD]_DEEP_NOTES = `...`;

export const BIBLE_YEAR_DAY_[WORD]_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = [
  {
    reference: "Genesis 18:1-5",
    title: "Short Section Title",
    icon: "emoji",
    summary: "One short sentence.",
    markdown: `## Genesis 18:1-5

> [Bible] **1** Full verse text...

## Emoji Teaching Header

Explanation...
`
  }
];
```

Deep notes must match the Day 1/Day 5-7 style:

- every section has a reference, title, emoji icon, summary, and markdown
- section references are small and readable
- no section should cover too many verses; prefer 1-5 verses
- include emojis in section icons and in teaching headers
- include the actual Bible verses in the markdown
- explain what is happening, why it matters, and how it connects to the larger Bible story
- add historical/cultural/word context where helpful
- do not make giant plain-text blocks

Then wire the new deep notes into `lib/bibleYearDaysContent.ts` by importing the new exports and returning them from `getBibleYearDayDeepNotes` / `getBibleYearDayContent` patterns already in that file.

If chapters need to show approved Bible in One Year notes inside the normal Bible chapter page, also update `lib/bibleYearApprovedDeepStudy.ts`. Currently Day 1 is wired there, so inspect before changing.

## Summary Content Rules

Update `lib/bibleYearDaysContent.ts` with a summary object for the day:

```ts
const dayXSummary: BibleYearSummaryContent = {
  intro: [
    "...",
    "...",
    "..."
  ],
  highlights: [
    ["emoji", "Highlight sentence."],
    ["emoji", "Highlight sentence."],
    ["emoji", "Highlight sentence."],
    ["emoji", "Highlight sentence."],
    ["emoji", "Highlight sentence."]
  ],
  takeaway: "...",
  takeawaySupport: "..."
};
```

The summary task is the second dashboard task. It must read like Day 1:

- 3 short intro paragraphs
- 5 highlights
- a strong big takeaway
- support paragraph
- Study Notes CTA if needed

## Trivia Rules

Update `components/DashboardJourneyExperience.tsx` where `bibleYearTriviaByDay` is defined.

Each day should have 5 trivia questions:

```ts
{
  id: "day9-isaac-born",
  question: "...?",
  options: ["Correct", "Wrong", "Wrong"],
  answer: "Correct",
  verse: "Genesis 21:1-3",
  explanation: "Short explanation tied to the reading."
}
```

Rules:

- 5 questions per day
- IDs start with `day[DAY_NUMBER]-`
- options are simple and clear
- answer exactly matches one option
- explanation ties back to Scripture
- cover the whole reading range, not only the first chapter

## Reflection and Discussion Rules

Update `bibleYearReflectionPromptByDay` in `components/DashboardJourneyExperience.tsx`.

Each day needs one reflection prompt:

```ts
[DAY_NUMBER]: "A reflective question tied to the day theme?"
```

This powers the reflection/discussion experience and completion sync through `article_comments`.

The reflection slug is generated by:

`bible-in-one-year-day-[DAY_NUMBER]-[slugified-title]`

Do not change slug logic unless necessary.

## Dashboard Task Flow Rules

The dashboard day has three required tasks:

1. Reading/video task
2. Summary task
3. Trivia task

These are controlled in `components/DashboardJourneyExperience.tsx`.

Important behavior to preserve:

- Users can open any Bible in One Year day in the dashboard, even if visually locked.
- Visual locked status should say `Locked`, not `Unlocked`.
- The current day shows progress like `0/3 tasks done`, `summary left`, or `trivia left`.
- Completing each task writes to `bible_year_day_progress`.
- Completing each task logs a real `master_actions` row.
- Each task action label should look like:
  - `Bible in One Year Day X Video: Title`
  - `Bible in One Year Day X Summary: Title`
  - `Bible in One Year Day X Trivia: Title`
- XP rewards:
  - reading/video: +25 XP
  - summary/reflection: +20 XP
  - trivia: +20 XP
- When all required tasks are complete, show the inline completed-day panel in the study area.
- The inline completed-day panel should include the reflection/discussion prompt area, because the reflection question belongs with the completed day flow.
- Do not use the old large blue completion modal popup for Bible in One Year day completion.
- Pressing Continue in the inline completed-day panel advances to the next day.
- On the final available day, Continue returns to the study page/dashboard.
- Guest/local usage should still work visually even when no logged-in `userId` exists, unless database persistence is required.
- The dashboard should default to the user's current Bible in One Year day on load; stale selected days or URL leftovers should not override the current study area.
- If the user intentionally clicks a day cover in the Journey Map, that clicked day may load in the study area for review.
- `profile_stats.bible_year_started_at` should be preserved for pacing. If missing, backfill it from the earliest `bible_year_day_progress.created_at` when possible.

If the day task flow breaks, compare against Day 1 behavior first.

## Reading/Video Task Rules

The first task label in the UI currently appears as video/reading depending on helper labels. Preserve the existing flow unless I ask to rename it.

If a `videoSrc` is present in `lib/bibleYearAudio.ts`, the card should show the embedded video.

If no `videoSrc` is present but audio exists in Supabase storage, the card should show `BibleYearLessonAudioPlayer`.

If neither exists, the card shows the fallback "being prepared" message.

### Follow Along in Scripture Panel

Every built Bible in One Year day should be prepared to support the Day 1 follow-along Scripture feature.

Current implementation:

- `components/DashboardJourneyExperience.tsx`
- state: `bibleYearFollowAlongOpenByDay`
- helper: `getBibleYearFollowAlongChapters(day)`
- renderer: `renderBibleYearFollowAlongScripture(day)`
- CSS class for themed scrollbar: `bible-year-follow-along-scroll`

Behavior:

- Button text: `Follow Along in Scripture`
- Placement: directly under the video/audio player and before `VideoHelpfulPoll`
- Collapsed by default
- Click button once to expand
- Click again to collapse
- Show chapter headings, verse numbers, and readable Bible text
- Scroll inside the panel when the assigned reading is long
- Do not use an iframe
- Do not open `BibleReadingModal`
- Do not route away to the full Bible reader
- Keep the user on the same Task 1 screen
- Match the active Bible Buddy theme, including the scrollbar
- Do not sync verses to video timestamps yet
- Do not autoscroll

Data source:

- Use the day's `readings` assignments from `GENESIS_BIBLE_IN_ONE_YEAR_SERIES`.
- Pull verse text from existing Bible-year Scripture data when available, currently `BIBLE_YEAR_GENESIS_WEB_VERSES` from `lib/bibleYearGenesisVerses.ts`.
- For future non-Genesis days, add or connect an equivalent structured Bible text source rather than hardcoding verses in the component.
- Days 1-8 are wired as the live Genesis test range; future days should follow this same reusable shape as the Scripture data becomes available.

When the user presses complete:

- mark the reading task complete
- log the action
- award XP
- close the active card if needed

## Master Actions Rules

Bible in One Year tasks must be treated as real actions.

The relevant action types are mapped by:

`BIBLE_YEAR_CARD_ACTION_TYPE`

Do not add task completion that only updates local UI. It must also:

- upsert `bible_year_day_progress`
- insert/check `master_actions`
- increment profile total actions when a new action row is inserted
- mark covered Bible chapters as read when the full day is complete

If Supabase constraints block action types, add or update a migration to allow the current action types.

## Offline Rules

If day content changes, check `lib/bibleYearOfflinePack.ts`.

The offline pack pulls from:

- `GENESIS_BIBLE_IN_ONE_YEAR_SERIES`
- `getBibleYearDayContent(day)`

If the offline cache version needs bumping after content changes, update:

`BIBLE_YEAR_OFFLINE_TEXT_PACK_VERSION`

## Cover Image Rules

If I provide a cover:

- place it in `public/` or the existing image folder pattern
- reference it from `coverImage` in `lib/bibleInOneYearPlan.ts`
- do not break existing covers
- keep the dashboard card readable on mobile

If no cover is provided:

- use the existing fallback style
- do not invent a fake path

## Verification Checklist

After implementation, run:

```bash
npx tsc --noEmit --pretty false
```

If the app has a usable local test flow, also verify:

- Bible in One Year dashboard opens
- target day appears with correct title/reference/cover
- target day opens from dashboard
- media card renders video or audio correctly
- Study Notes open
- Summary task can complete
- Trivia questions render and complete
- all three tasks trigger the inline completed-day panel
- inline completed-day panel includes the reflection/discussion prompt area
- Continue opens next day
- final-day behavior still routes back to dashboard/study page
- no "Unlocked" label appears on locked covers
- Day 1 style `Follow Along in Scripture` panel opens under media, uses no iframe, and stays on the same task screen when available

## Output Expected From Agent

When finished, report:

- files changed
- day title and reading range
- whether video or audio is connected
- audio storage path or video URL
- whether deep notes were added
- whether summary/trivia/reflection were added
- whether inline completion/reflection/Continue behavior was preserved
- whether follow-along Scripture behavior was added or prepared
- test command result

Do not push unless I explicitly say `push`.
