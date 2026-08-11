# Bible-in-One-Year Production Agent — Audit & Plan

Audit date: 2026-08-11. Method: every number below was produced by running code
against the actual modules (`tsx` against `lib/bibleInOneYearPlan.ts`,
`lib/bibleYearDaysContent.ts`, `lib/bibleReaderStudyNotes.ts`) — not by reading
or estimating. No production data was modified.

---

## A. Current state

**Your estimates were wrong in your favour.** You guessed ~30 complete days,
scripts to ~50–75, nothing past 75. The reality:

| Asset | Real coverage |
|---|---|
| Reading plan | **365 / 365** — complete, no gaps, no duplicates |
| Lesson script (narration source) | **1–105** |
| Audio reference wired | **1–105** |
| Narrator script docs (`docs/*.md`) | **8–105** (102 files) |
| Custom cover art | **1–30** |
| Chapter study notes | all 1,189 wired, but mostly weak legacy notes being rewritten on a separate track — not this agent's scope |
| Video | **0 days** |

The plan lives in `lib/bibleInOneYearPlan.ts` as a pipe-delimited table
(`ADDITIONAL_BIBLE_YEAR_SCHEDULE_RAW`, days 22–365) plus 21 hand-written day
objects. It matches `docs/bible-in-one-year-master-plan.md` exactly — I diffed
all 344 rows, zero mismatches.

**There is no content database.** All Bible-in-One-Year content ships in the
TypeScript bundle and deploys via git. Supabase holds only user progress
(`bible_year_day_progress`) and the `tts-audio` storage bucket. That's simpler
than assumed and it means "database connection" is not a failure mode for
content — but it does mean every new day is a code change and a deploy.

---

## B. 365-day status

### Headline

| Status | Days | Count |
|---|---|---|
| **COMPLETE (no video)** — lesson + audio ref + custom cover + notes | 1–30 | 30 |
| **NEAR-COMPLETE** — lesson + audio ref + notes, generic cover | 31–105 | 75 |
| **PLAN + NOTES ONLY** — no lesson, no audio | 106–365 | 260 |
| **MISSING VIDEO** | 1–365 | 365 |

### Quality sub-findings

These matter more than the headline, because "exists" ≠ "good":

- **Days 79–125 are bulk-generated at the quality floor.** Every section has
  exactly 4 phrase cards (`min = max = 4`). The workflow doc's own bar is
  "prefer 7 per card" and "150+ cards for a full multi-chapter day." Day 100 has
  88 cards; Day 25 (the stated 9.5 standard) has 186. This is a uniform
  machine signature, not authored variation.
- **Days 37–75 have thin teaching scripts** — under 600 words of teaching each,
  against ~2,000 for Day 1 and ~1,750 for Days 76–97.
- **Days 76–105 have no hand-written summary** — they fall through to
  `buildFallbackSummary()`, which splits the one-line summary on commas and
  emoji-bullets the fragments. Functional, generic.
- **Days 94–95 and 359 have 20+ duplicated first explanation lines** — the exact
  filler the workflow doc bans.
- **Chapter notes: all 1,189 wired, but most are poor.** The legacy notes
  covering the whole Bible are low quality and are being replaced, not extended.
  Three tiers:
  - **Legacy** — the default state for ~800 chapters. Wired and rendering, but
    weak. Word count is not a quality signal here; ignore the median.
  - **Level 1** — the hourly agent's rewrite, ~390 chapters done (Genesis →
    2 Samuel 10), advancing ~1 chapter/hour. Bar is "a reader gets something
    real from it."
  - **Level 2** — Louis's own hand-written notes, around Genesis 40. Much
    slower, and the actual product standard.

  This is out of scope for the BIOY agent and needs nothing from it, but it
  constrains the plan — see the note in section F.

### Confirmed bug: 65 days of finished content are invisible

`getReaderAlignedStudyMarkdown()` in `lib/bibleYearDaysContent.ts:1857` opens
with `if (day.dayNumber < 1 || day.dayNumber > 300) return fallback ?? null;`.
Days 301–365 have no content-map entry, so `fallback` is null and the UI shows
**zero study notes** — even though the chapter notes exist:

| Day | Reading | Reader sections available | Shown in UI |
|---|---|---|---|
| 300 | Luke 19–21 | 45 | 122,510 chars |
| 301 | Luke 22–24 | 61 | **0** |
| 302 | John 1–3 | 38 | **0** |
| 365 | Revelation 20–22 | 60 | **0** |

Raising that ceiling to 365 is a one-line change that lights up 65 days of
already-written content. This is the single highest-value fix in the audit and
it costs no API spend.

### RESOLVED: days 71–105 are broken in the app

The storage reconciliation ran (commit `b072b4c7`,
`data/bible-year-audio-inventory.json`, 365 records). Result:

| Days | Audio in `tts-audio` bucket | Code references audio |
|---|---|---|
| 1–70 | **Yes** — 6.4–26.4 MB, median 14.1 MB | Yes |
| 71–105 | **No — no folder at all** | **Yes** |
| 106–365 | No | No |

**Days 71–105 are the worst state in the whole system: they look finished and
are not.** The day renders, the audio player appears, the user presses play,
and `/api/tts/bible-year/day/N` returns 404 "Audio lesson is not available yet."
Days 106–365 at least fail honestly — they show no player.

So the real completion picture is:

| Status | Days | Count |
|---|---|---|
| Audio + lesson + custom cover | 1–30 | 30 |
| Audio + lesson, generic cover | 31–70 | 40 |
| **Lesson but NO audio — broken player** | **71–105** | **35** |
| Plan only | 106–365 | 260 |

Fixing 71–105 is now the first production job, ahead of Day 106. The scripts
already exist for those days, so it is a TTS-and-upload run, not a writing job —
the cheapest 35 days available and it stops users hitting a dead play button.

---

## C. How a day is actually created

Reverse-engineered from `docs/BIBLE_BUDDY_NEXT_DAY_WORKFLOW.md` plus the code.
Your assumed pipeline was close but wrong in two places.

```
docs/bible-in-one-year-master-plan.md  (reading for Day N)
   ↓
Add day object → lib/bibleYearDaysContent.ts BIBLE_YEAR_DAY_CONTENT[N]
   ↓  (lesson + audio + studyNotes + summary + discussionPrompt)
Write lesson → lib/bibleYearDay<N>DeepNotes.ts  (opening / sections[] / closing)
   ↓
Write narrator script → docs/bible-in-one-year-day-N-narrator-script.md
   ↓
npx tsx scripts/generate-bible-year-day-one-audio.ts --day=N [--voice-only]
   ├── interleaves KJV scripture + teaching into segments
   ├── OpenAI POST /v1/audio/speech, model gpt-4o-mini-tts
   ├── mixes a PROCEDURALLY SYNTHESIZED ambience bed (synthesizePeacefulBed)
   ├── encodes MP3 via lamejs @ 96kbps
   └── uploads to Supabase tts-audio/bible-in-one-year/day-NNN/day-NNN-audio.mp3
   ↓
Chapter notes for each reading → lib/<book><Range>PersonalNotes.ts
   ↓
Validate: tsc --noEmit && tsx scripts/audit-bible-year-reader-day.ts --day=N
   ↓
git commit + push (Vercel builds only on [deploy] tag)
```

**Two corrections to your assumed flow:**

1. **Study notes shown on a BIOY day do not come from the day's own notes.**
   They are pulled per-chapter from `bibleReaderStudyNotes.ts` — the same
   corpus the hourly chapter-notes agent writes. The day's own
   `studyNotesMarkdown` is only a fallback. So BIOY day quality is downstream
   of chapter-notes quality, and improving chapter notes improves BIOY days for
   free. These are not two separate content systems; they're one.

2. **Background music is synthesized, not sampled.** `synthesizePeacefulBed()`
   generates the pad in code with a per-scene tone and voice-ducking
   (`|voice| > 0.025 → bed × 0.58`). Separately, `public/audio/background/`
   holds five real MP3 tracks (`bible-reading-1..5.mp3`) used by the *player*
   via `backgroundMusicSrcs` for chapter reading — not by BIOY audio. So you
   have an approved-music library; the BIOY pipeline just doesn't use it.

Also note: `scripts/generate-bible-year-day-one-audio.ts` is 1,675 lines and
selects the lesson through a ~105-branch ternary chain, with a parallel chain of
`DAY_N_APPROVED_SCRIPT_PATH` constants. It works, but it is the main obstacle
to automation — every new day currently requires editing that chain by hand.

---

## D. Reusable code

Genuinely good, keep and build on:

| Asset | Path | Why |
|---|---|---|
| Reading plan | `lib/bibleInOneYearPlan.ts` | Complete, verified, matches the doc |
| Per-day audit | `scripts/audit-bible-year-reader-day.ts` | 822 lines, already checks phrase minimums and card verse spans. This is the verification core — reuse directly |
| Chapter notes corpus | `lib/bibleReaderStudyNotes.ts` + ~90 `*PersonalNotes.ts` | 1,189 chapters. The most valuable asset in the repo |
| TTS engine | `scripts/generate-bible-year-day-one-audio.ts` | Chunking, multi-voice roles, ducking, lamejs encode, signed upload — all solved |
| Audio serving | `app/api/tts/bible-year/day/[dayNumber]/route.ts` | Folder-probing fallback already handles naming drift |
| Style specs | `docs/bible-study-note-style.md`, `BIBLE_BUDDY_NEXT_DAY_WORKFLOW.md`, `BIBLE_BUDDY_NOTE_STYLE_GUIDE.md` | Your voice, already written down. Do not invent a new prompt |
| Agent precedent | `docs/LEVEL2_UPGRADE_AGENT.md`, `BLOG_WRITER_AGENT.md` | Working pattern for queue → act → log → report |
| Cron infra | `vercel.json` (18 jobs) + `app/api/cron/*` | Scheduling is a solved problem here |
| Approved music | `public/audio/background/bible-reading-1..5.mp3` | Ready for video |
| Player video support | `components/BibleYearLessonAudioPlayer.tsx` | Already accepts `videoSrc` and renders a YouTube embed. The UI for video **already exists** |

## E. Missing pieces

1. **Storage reconciliation** — nothing verifies that a referenced MP3 exists.
2. **Data-driven day registry** — the 105-branch ternary must become a lookup
   before any agent can add days unattended.
3. **Per-day state file** — no machine-readable record of which steps passed.
4. **Days 106–365 lesson scripts** — 260 days, the actual content gap.
5. **Cover art for 31–365** — 335 days share one generic image.
6. **Video pipeline** — nothing exists. No Remotion, no ffmpeg, no
   `@remotion/*` in `package.json`. Verified absent, not assumed.
7. **YouTube upload** — nothing exists. No `googleapis`, no OAuth, no upload
   code anywhere. The only YouTube code reads embed IDs.
8. **B-roll library + index** — doesn't exist. `/exports/` and `*.mp4` are
   gitignored, so finished media deliberately lives outside the repo.

---

## F. Proposed agent

**One agent, one day per invocation, resumable at step granularity.** Not a
batch loop — a batch that dies at day 3 of 5 leaves ambiguous state.

State lives in `data/bible-year-production-state.json`, one record per day:

```jsonc
{
  "day": 106,
  "steps": {
    "lesson":    { "status": "done",   "at": "...", "evidence": "lib/bibleYearDay106DeepNotes.ts" },
    "script":    { "status": "done",   "at": "...", "evidence": "docs/...-day-106-narrator-script.md" },
    "validate":  { "status": "done",   "at": "...", "evidence": "sections=22 cards=147" },
    "audio":     { "status": "failed", "at": "...", "error": "TTS 429", "attempts": 2 },
    "upload":    { "status": "pending" },
    "verify":    { "status": "pending" }
  }
}
```

Each run: load state → pick the first day that is not `complete` → execute only
`pending`/`failed` steps in order → write state after **each** step → stop.
Re-running is safe because a `done` step with valid evidence is skipped, never
redone. That satisfies idempotency and "don't regenerate a good script just to
fix artwork."

Scheduling: **hourly, one day per run**, reusing the proven cron pattern rather
than 5-at-once. Same throughput (~5/day during work hours), but a failure costs
one day instead of five, and cost is naturally rate-limited by the clock. If
after two weeks it's clean, raise the batch size.

**Recommended order of work — this is where the plan diverges most from your
brief.** Don't start at Day 106.

| Phase | Work | Why first |
|---|---|---|
| 0 | Fix the `> 300` guard | 65 days of content, one line, zero API cost |
| 1 | Storage reconciliation for days 1–105 | Converts the biggest unknown into fact |
| 2 | Repair whatever Phase 1 finds broken | Never build on an unverified base |
| 3 | Days 106–365 lesson + audio | The real gap |
| 4 | Backfill quality: days 79–125 notes, 37–75 scripts, 31+ covers | Opportunistic |

### On 4–5 days/day

**Reasonable, and cheaper than a Day 76–105 build** — because the BIOY agent
does not write chapter notes at all. Days 106–365 already have *something*
wired for every reading, so the agent produces a lesson script and audio only,
roughly a fifth of the work. The notes those days display come from the
separate chapter-notes track and are not this agent's problem.

**But be clear-eyed about what that means.** For most of days 106–365 the
displayed study notes will be the weak legacy ones until the Level 1 rewrite
reaches those books — currently 2 Samuel, ~390 of 1,189, at ~1 chapter/hour.
The BIOY agent should neither wait for that nor try to fix it; the two tracks
run independently and BIOY days improve automatically as Level 1 advances. The
only decision this forces is whether a day counts as shippable while its notes
are still legacy. My read: yes — the lesson and audio are the day's substance,
and holding 260 days hostage to a notes queue moving at 24 chapters/day would
cost roughly a year.

The real ceiling isn't cost, it's **review**. 5 days/day × 25 min of audio is
over 2 hours of narration daily that nobody is listening to. I'd run **3/day**
and actually spot-check them, rather than 5/day and rubber-stamp. At 3/day the
260-day gap closes in about 12 weeks; at 5/day, 7½ weeks. The difference is
five weeks — not worth shipping unheard content over.

---

## G. Quality control

The style is already documented; the agent must **use the existing specs**, not
a new prompt. Concretely:

- Prompt is assembled from `docs/bible-study-note-style.md` +
  `BIBLE_BUDDY_NEXT_DAY_WORKFLOW.md` + two full exemplar days (Day 1 and
  Day 25, the stated 9.5 standard) + the KJV text for that day's chapters.
- Mechanical gates, all already implemented or trivial, run before a day is
  marked done: `tsc --noEmit`; `audit-bible-year-reader-day.ts` showing
  `Sections under 4 phrases: 0` and `Cards over 6 verses: 0`;
  `scripts/check_bible_note_style.py`; zero duplicate first-explanation lines;
  no banned filler openings.
- **New gate worth adding:** reject uniform card counts. If every section in a
  day has exactly the same number of phrase cards, that's the days-79–125
  signature and it should fail rather than ship.
- Script length gate: target 20–30 min of finished audio per the workflow doc.
  Word count is a cheap proxy — flag anything under ~1,000 teaching words.
- **Louis approves the first 5 days by hand before the agent runs unattended.**

## H. Verification

You've been burned by agents claiming success. The rule here: **a step is
`done` only when a separate read-back proves it.**

| Step | Proof required |
|---|---|
| Lesson | File exists, exports parse, teaching word count ≥ threshold |
| Script | `docs/...-day-N-narrator-script.md` exists and is non-trivial |
| Validate | Audit script exits clean; totals recorded in state |
| Audio | Local MP3 exists, size > 1MB, decoded duration in 20–30 min |
| Upload | **Re-list the bucket and HEAD the object.** Never trust the upload response |
| Serve | `GET /api/tts/bible-year/day/N` returns 307 + signed URL, not 404 |
| Day live | Import the module fresh and assert `getBibleYearDayContent(day)` returns non-null lesson, audio, and study notes |
| Video | Output file exists, ffprobe reports expected duration and a video stream |
| YouTube | API returns a real video ID **and** a follow-up `videos.list` finds it |

Failure marks that step `failed` with the real error, leaves later steps
`pending`, and stops the day. It never cascades. Per-day step logs go to
`SESSION_LOG.md` in the existing format so Life Buddy picks them up.

## I. Cost controls

Model pricing (verified current): Opus 5 $5/M in, $25/M out; Sonnet 5 $3/M in,
$15/M out; Haiku 4.5 $1/M in, $5/M out. Cache reads ~0.1×, cache writes 1.25×.

Per day for 106–365 (lesson + script + audio only — notes already exist):

| Stage | Estimate |
|---|---|
| Lesson + narrator script (Opus 5, style guides cached) | $0.30 – $0.60 |
| Validation / repair pass | $0.10 – $0.30 |
| OpenAI `gpt-4o-mini-tts`, ~25 min audio | ~$0.35 **(unverified — see below)** |
| **Total** | **~$0.75 – $1.25 / day** |

At 3 days/day that's **~$3/day, and ~$200–330 to finish all 260 days.** At
5/day, ~$5/day. This is a small number, and it is small specifically because
the chapter-notes corpus already exists.

Caveat I want to be straight about: **I could not verify OpenAI TTS pricing from
this environment.** The $0.35 figure comes from a published ~$0.015/min
estimate. Confirm it against your actual OpenAI billing for a day already
generated before trusting the totals.

Controls to build in: max 1 day per run and a hard max per 24h; retry cap of 2
per step then stop the day; abort the whole run after 2 consecutive day-level
failures; never regenerate a step whose evidence still validates; a
`"paused": true` flag in the state file that the agent checks first; token
caps on generation calls; and per-run actual usage logged to the state file so
estimates can be replaced with measurements.

## J. Video pipeline

Nothing exists — verified, not assumed. But two pieces are already in place:
the player accepts `videoSrc` and renders a YouTube embed, and there are five
approved music tracks. So the app side is essentially ready.

Proposed, deliberately boring: **ffmpeg, not Remotion.** Remotion is a React
renderer priced for animated compositions; these videos are a still or slow
b-roll under narration with captions. ffmpeg does that in one command, has no
browser dependency, and runs anywhere. Introduce Remotion only if you later want
motion graphics.

```
approved b-roll in /broll (gitignored, indexed by broll-index.json:
   filename, duration, tags, orientation)
   ↓ select clips by day theme tags, enough to cover narration length
narration MP3 (already produced by the existing pipeline)
   ↓ captions from the narrator script — timed via whisper, or approximated
     from the segment boundaries the TTS script already knows
   ↓ ffmpeg: concat + loop b-roll to duration, overlay captions + Bible Buddy
     title card, mix narration over approved bed
   ↓ validate with ffprobe (duration, streams present)
   ↓ YouTube Data API v3 upload, privacy=private, then videos.list to confirm
   ↓ write videoSrc into the day's audio object — the player picks it up
```

The b-roll index is the reusable piece: drop files in, re-run the indexer, new
footage is available to every future render.

## K. Shorts pipeline

Same infrastructure, different output profile. Design for it now by keeping the
renderer's aspect ratio, caption style, and duration as parameters rather than
constants — that's the only architectural decision needed today.

```
source: existing approved Threads/social posts
   ↓ select + adapt to 30–50s spoken form
   ↓ same TTS engine, same voice
   ↓ same b-roll library, vertical clips (indexed by orientation)
   ↓ same ffmpeg renderer at 1080×1920, larger caption style
   ↓ same validate → upload → confirm chain
```

2–3/day is realistic once the long-form renderer works, because everything
except framing is shared. Build it second, not first.

## L. Implementation order

| # | Step | Effort | Risk |
|---|---|---|---|
| 1 | Fix `> 300` guard | 15 min | None |
| 2 | Storage reconciliation script (read-only) | half day | None |
| 3 | Repair gaps found in step 2 | unknown until 2 runs | — |
| 4 | Refactor day→lesson ternary into a registry map | 1 day | Medium — touches working code, needs care |
| 5 | State file + step runner + verification harness | 2 days | Low |
| 6 | Generate days 106–110 **manually via the agent, Louis reviews each** | 1 day | Low |
| 7 | Enable hourly cron, 1 day/run | half day | Low |
| 8 | Quality backfill (79–125 notes, 37–75 scripts, covers) | ongoing | Low |
| 9 | B-roll index + ffmpeg renderer | 3–4 days | Medium |
| 10 | YouTube upload + confirm | 1–2 days | Medium — OAuth setup is fiddly |
| 11 | Shorts profile | 1–2 days | Low, once 9–10 exist |

Steps 1–3 are worth doing regardless of whether you approve the rest.

## M. Build effort

Grounded in what I actually read:

- **Easy.** Guard fix; storage reconciliation; state file; step runner; cron
  wiring (18 working crons to copy).
- **Moderate.** The ternary refactor — mechanical but it's the spine of a
  1,675-line file that currently works, so it needs care and a clean tsc.
  Lesson generation prompt assembly. Caption timing.
- **Harder.** ffmpeg renderer that reliably produces watchable video (the
  render is easy; *good* pacing and caption sync are not). YouTube OAuth in a
  headless cron context.
- **Cheapest win by a wide margin.** The `> 300` guard: one line, 65 days.

## N. Questions / blockers

Only things I genuinely could not determine from the repo:

1. **Do the MP3s for days 1–105 actually exist in the `tts-audio` bucket?**
   No credentials here. Blocks any "days 1–105 are done" claim. Step 2 answers it.
2. **Actual OpenAI TTS cost per day** — needs a real billing line from a
   generated day to replace my estimate.
3. **Where is the approved b-roll?** `/exports/` and `*.mp4` are gitignored, so
   if footage exists it's outside the repo. I need a path and rough inventory.
4. **Do you have a YouTube channel + Google Cloud project with the Data API
   enabled?** Determines whether step 10 is 1 day or 3.
5. **Are days 31–105 considered shippable as-is** (generic cover, fallback
   summary for 76–105), or should the agent backfill those before moving to 106?
6. **Cover art**: how were days 1–30 produced? If it was manual image
   generation, automating covers for 335 days is its own project and I'd leave
   the generic image rather than ship 335 mediocre ones.

---

*No production data was modified during this audit. No content was generated.*
