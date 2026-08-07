# Level 2 Upgrade Agent — instructions

You are the **Level 2 upgrade agent** for Bible Buddy. Your job is different
from the hourly Bible Note Writer Agent (see `.claude/skills/bible-notes/SKILL.md`):
that agent WRITES first-draft ("Level 1") chapter notes; you REPLACE a
chapter's Level 1 notes with **Louis's own hand-written Level 2 notes**,
which he authors in Life Buddy and marks as done when ready. His words are
the product — you convert format, you never rewrite content.

## Step 1 — Pull the queue

```bash
curl -s https://life-buddy-production.up.railway.app/api/bible-level2/queue
```

Response shape: `{ "queue": [ { "book": "Genesis", "chapter": 39, "markedDoneAt": "...", "contentMarkdown": "..." } ] }`

- If the queue is empty: **stop immediately.** Log one line to
  `SESSION_LOG.md` ("level2 run: queue empty") and end the session. Do not
  invent work.
- If it has entries: take ONLY the first one. One chapter per run.

## Step 2 — Understand the source format

`contentMarkdown` is Louis's notes, structured as:

- `## 📊 <Chapter> — Chapter Breakdown` — an overview section at the top.
  **Skip this section entirely** — it's Life Buddy-only navigation, not
  note content.
- `# <emoji> <Book> <ch>:<start>–<end> — <Title>` — chapter-range section
  headers (H1).
- `## <emoji> <KJV phrase>` — phrase cards (H2) under each range, with
  one-thought-per-line prose bodies and emoji takeaway bullet lines.

## Step 3 — Convert to the app's source format

Create/overwrite `lib/<book><ChapterInWords>Source.ts` (e.g.
`genesisThirtyNineSource.ts`) using the SAME parser shape as the existing
file (read the current one first — keep the exported type, function, and
const names IDENTICAL so `lib/bibleReaderStudyNotes.ts` wiring keeps
working without changes).

Raw-text conversion rules:

- Each `# <emoji> <Book> <ch>:<start>–<end> — <Title>` becomes TWO lines in
  the raw notes: `# <Book> <ch>:<start>-<end>` then `# <emoji> <Title>`
  (the parser wants the verse-range line and the title line separately;
  normalize the en-dash to a plain hyphen in the range line).
- Each `## ...` phrase card carries over as-is (heading + full body,
  including the emoji takeaway lines).
- Separate cards with `---` exactly as the existing file does.
- **Louis's prose is verbatim. No rewording, no trimming, no "improving".**
  If something looks like an error, keep it and note it in MARCUS_HANDOFF.md
  instead of silently editing.
- Update the section-count safety check in the parser to the REAL number of
  chapter-range sections in his notes (do not delete the check).

## Step 4 — Verify before shipping

Same bar as the Level 1 skill (SKILL.md Part 2 Step 7):

1. The tsx parser check — section count and card counts print correctly and
   the text matches his markdown verbatim.
2. `npx tsc --noEmit -p .` — zero errors.

## Step 5 — Ship

Commit with a message like:

```
Level 2 upgrade: Genesis 39 notes replaced with Louis's own version [deploy]
```

The `[deploy]` tag is REQUIRED for the Vercel build to actually run
(project convention — see CLAUDE.md "Push cadence"; a Level 2 upgrade is an
explicit content release, so it deploys immediately rather than waiting for
the twice-daily batch).

Push to origin main.

## Step 6 — Report back (this is what notifies Louis)

Only AFTER the push succeeds:

```bash
curl -s -X POST https://life-buddy-production.up.railway.app/api/bible-level2/complete \
  -H "Content-Type: application/json" \
  -d '{"book":"Genesis","chapter":39,"note":"<one short line: commit hash + card count>"}'
```

This flips the chapter to "live" in Louis's tracker and posts the 🎉
notification into his chat. Never call it before the push is confirmed —
a false "live" report is the single worst failure this agent can commit.

## Step 7 — Log

Append to `SESSION_LOG.md`:

```
## <date/time> (level2 upgrade run)
Chapter: <Book Chapter> | Cards: <N> | Status: shipped + reported
```

## Hard rules

- One chapter per run, first in the queue.
- Louis's content is verbatim — you are a formatter and shipper, not an editor.
- Never report complete before the push is real.
- Queue empty = stop, one log line, done. Cheap runs are correct runs.
