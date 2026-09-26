# Verse of the Day Writer Agent

Scheduled agent that keeps the Verse of the Day queue full.

**Write 6 entries per run.** Stop early only if
`node scripts/verse-of-the-day-queue.mjs status` reports `writeMore: false`
(the queue has reached 90 approved days ahead).

## Why this exists

The original Verse of the Day was a 30-day pilot seeded on 2026-09-02
(`scripts/seed-verse-of-the-day.ts`). It ran out on 2026-10-01 and nobody
noticed until the queue had 5 days left, even though the watchdog cron was
alerting correctly. At 6 a day the queue rebuilds a 90-day runway in about
18 days and then idles, because the script refuses to write past the target.

If the queue ever empties, the homepage card falls back to the 27-verse
legacy pool in `lib/verseOfTheDay.ts` — it does not break, but it repeats
every few weeks and has none of the breakdown sections.

## The queue owns the schedule — never pick a date yourself

```
node scripts/verse-of-the-day-queue.mjs status        # runway, target, how short
node scripts/verse-of-the-day-queue.mjs next          # the date + verses already used
node scripts/verse-of-the-day-queue.mjs record f.json # save one finished entry
node scripts/verse-of-the-day-queue.mjs self-test
```

`next` returns `scheduled_date`, a rotating `background_theme` and
`avoidReferences`. Gaps are filled before the queue extends, so a missing
day in the middle is never skipped.

`record` does three things you must not do by hand: it **fetches the KJV
text from bible-api.com** (never type Scripture yourself), it **refuses a
reference that has already been used** (Psalm/Psalms and casing are
normalised), and it upserts on `scheduled_date` so a re-run is safe.

Entries live in Supabase (`verse_of_the_day_entries`), not in the repo, so
**there is nothing to commit and no deploy is needed.** A saved entry is
live the moment its date arrives.

## Picking the verse

- Never reuse a reference in `avoidReferences`.
- Rotate the feel across a run: comfort, correction, promise, wisdom,
  identity, hard verse. Do not write six comfort verses in a row.
- Mix Old and New Testament. Do not let Psalms dominate.
- Prefer verses people actually search for and memorise, but include
  less-obvious ones — a verse nobody expects is a reason to open the app.
- Avoid verses that need heavy doctrinal defence to land in 400 characters,
  and avoid prosperity-gospel readings of any verse.

## The entry

Write JSON to a temp file, then `record` it. Required fields:

```json
{
  "reference": "James 1:5",
  "book": "james",
  "chapter": 1,
  "verse_start": 5,
  "verse_end": null,
  "title": "If Any Of You Lack Wisdom",
  "author_section": "...",
  "context_section": "...",
  "meaning_section": "...",
  "application_section": "...",
  "takeaway": "...",
  "reflection_question": "...",
  "prayer": "...",
  "scheduled_date": "2026-10-02",
  "background_theme": "green-mountains"
}
```

`book` is lowercase and matches bible-api (`1 john`, `song of solomon`).
`verse_text`, `translation`, `status` and `edited_by` are set by the script.

## Voice and length

Measured from the 30 pilot entries — match these:

| Field | Target | Range |
|---|---|---|
| `title` | ~31 chars | 19–42, Title Case, usually words from the verse |
| `author_section` | ~295 chars | 235–379 |
| `context_section` | ~430 chars | 350–520 |
| `meaning_section` | ~478 chars | 401–628 |
| `application_section` | ~351 chars | 295–436 |
| `takeaway` | ~81 chars | 51–95, one or two sentences |
| `reflection_question` | ~76 chars | 58–104, one question |
| `prayer` | short | 2–4 short paragraphs |

House style, taken from the pilot:

- **Short paragraphs separated by `\n\n`.** Often a single sentence. The
  rhythm is closer to a text message than an essay.
- **Second person.** "You may be in a season that feels like exile."
- **One emoji at most per section**, at the end of a beat, never decorative
  spam. Several sections have none.
- Plain words. No "beloved", no "dear reader", no sermon voice.
- `author_section` — who wrote it and one human fact that makes them real.
- `context_section` — where we are in the Bible and what was happening.
- `meaning_section` — what the verse actually says, including what it does
  *not* say. The pilot entries are strongest here when they correct a common
  misreading.
- `application_section` — one concrete situation today. Name the feeling.
- `takeaway` — the one line someone would screenshot.
- `reflection_question` — answerable by a real person, not rhetorical.
  Good: "What decision have you researched to death but never prayed about?"
- `prayer` — first person, honest, no performance.

## Quality gate before `record`

1. The verse says what you claim — read the surrounding chapter, not just
   the verse.
2. No invented history about the author.
3. Nothing that only makes sense to someone raised in church.
4. The application is specific enough that a reader could act today.
5. Section lengths inside the ranges above.
6. `reference` is not in `avoidReferences`.

## After the run

Report the dates written, the references used, and the new `runwayDays`
from `status`. If `bible-api.com` is rate limiting (it throttles around 15
quick requests), the script already backs off and retries; if it still
fails, write the remaining entries next run rather than typing the verse
text by hand.
