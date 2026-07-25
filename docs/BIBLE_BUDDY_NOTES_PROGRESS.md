# Bible Buddy Chapter Notes — Rewrite Progress Log

Tracks the chapter-by-chapter rewrite of Bible Reader study notes (section
cards / phrase cards) to match the Genesis 1-40 gold-standard voice, per
`.claude/skills/write-chapter-notes/SKILL.md`.

Total chapters in the Bible: 1,189.
Already at gold-standard quality before this log started: Genesis 1-40 (40 chapters).

## Log

| Date | Chapter | Cards | Notes |
|------|---------|-------|-------|
| 2026-07-24 | Genesis 41 | 37 cards / 11 sections | First chapter under this log. Voice calibrated this session (see below). Verified in-browser. Density: ~0.65 cards/verse (light — predates density standard below). |
| 2026-07-24 | Genesis 43 | 23 cards / 9 sections | Same voice. Verified in-browser. Density: ~0.68 cards/verse (light — predates density standard below). |
| 2026-07-25 | Genesis 44 | 34 cards / 8 sections | Density standard corrected mid-chapter after user feedback (was 17 cards, too shallow). Rebuilt to ~1 card/verse. Verified in-browser. Note: even this is below the ~2 cards/verse target formalized right after in the bible-notes skill — 44 may need a density pass later too. |
| 2026-07-25 | Genesis 45 | 31 cards / 7 sections | Written under the new `bible-notes` skill, autonomous pass (no chat draft step) per user request. Parser + tsc verified, then browser-verified live once auto-accept was enabled. ~1.1 cards/verse — candidate for a density pass later. |
| 2026-07-25 | Genesis 46 | 27 cards / 8 sections | Genealogy-heavy chapter (vv8-27 are family lists). Per skill Part 4, used fewer cards on pure name-lists but explained the four-mother structure, the 70-souls total, and callbacks (Er/Onan, Dinah). Parser + tsc verified. |
| 2026-07-25 | Genesis 47 | 27 cards / 8 sections | Land-for-bread economic system, Jacob's burial oath. Parser + tsc verified. |
| 2026-07-25 | Genesis 48 | 24 cards / 8 sections | Adoption of Ephraim/Manasseh, crossed-hands blessing. Also rebuilt `/admin/bible-notes-progress` UI for readability per user feedback (big headline number, progress bar, card-based chapter list instead of a dense table). Parser + tsc verified, browser-verified. |
| 2026-07-25 | Genesis 49 | 36 cards / 10 sections | Jacob's blessing over all 12 sons incl. the Judah "sceptre/Shiloh" messianic prophecy. Parser verified exactly. |
| 2026-07-25 | Genesis 50 | 28 cards / 9 sections | **MILESTONE: Genesis complete, all 50 chapters.** Parser verified exactly. |
| 2026-07-25 | Exodus 1 | 18 cards / 7 sections | First Exodus chapter — had no prior wiring at all (ch2-40 already existed thin, ch1 was uncovered). Parser verified exactly. |
| 2026-07-25 | Exodus 2 | 24 cards / 8 sections | Moses' birth, rescue, flight to Midian, marriage to Zipporah. Overrode previous thin content. Parser + tsc verified (clean), browser-verified. |
| 2026-07-25 | Exodus 3 | 21 cards / 7 sections | The burning bush, "I AM THAT I AM." Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 4 | 24 cards / 8 sections | The three signs, Aaron appointed, return to Egypt, "bridegroom of blood." Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 5 | 18 cards / 7 sections | First confrontation with Pharaoh, straw withheld, Moses' raw complaint to God. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 6 | 19 cards / 8 sections | God reveals the name JEHOVAH, seven "I will" promises, Levite genealogy naming Moses/Aaron's parents. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 7 | 16 cards / 6 sections | Rod-to-serpent sign, magicians' counterfeit, first plague (water to blood). Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 8 | 23 cards / 8 sections | Plagues of frogs, lice, flies; Goshen protected; magicians fail at lice ("finger of God"). Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 9 | 22 cards / 7 sections | Plagues of livestock murrain, boils, hail; Pharaoh's clearest confession yet. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 10 | 21 cards / 8 sections | Plagues of locusts and darkness; officials push back on Pharaoh; final breakdown. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 11 | 11 cards / 4 sections | Tenth plague announced (firstborn), jewels borrowed fulfilling Genesis 15. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 12 | 36 cards / 11 sections | Passover instituted, tenth plague strikes, Israel departs Egypt. Parser + tsc verified (clean). First chapter run under /loop. |
| 2026-07-25 | Exodus 13 | 20 cards / 8 sections | Firstborn sanctified/redeemed, Joseph's bones carried out, pillar of cloud/fire. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 14 | 26 cards / 10 sections | The Red Sea crossing, Pharaoh's army destroyed. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 15 | 24 cards / 8 sections | Song of Moses and Miriam, bitter water at Marah, Elim oasis. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 16 | 29 cards / 10 sections | Manna and quail, the omer, first Sabbath pattern established. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 17 | 16 cards / 5 sections | Water from the rock, battle with Amalek, Moses' hands held up, Joshua's first appearance. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 18 | 20 cards / 7 sections | Jethro's visit and advice, appointment of judges over thousands/hundreds/fifties/tens. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 19 | 21 cards / 8 sections | Israel arrives at Sinai, covenant proposal, theophany preparing for the Law. Parser + tsc verified (clean). |
| 2026-07-25 | Exodus 20 | 23 cards / 8 sections | The Ten Commandments, the people's fear, altar instructions. Parser + tsc verified (clean). Completes chapters 11-20 as fully rewritten. |
| 2026-07-25 | Exodus 21 | 23 cards / 8 sections | Case laws: servants, murder vs manslaughter, injury liability, "eye for eye", goring ox. Parser + tsc verified (clean). |

## Standing process doc

The full process is now written up as a proper skill: `.claude/skills/bible-notes/SKILL.md`.
Read that first for anything chapter-notes related — this log is just the running
tracker, not the process doc.

## Live dashboard

A private, timestamped, per-chapter log now lives inside the app itself:
`/admin/bible-notes-progress` (gated to moorelouis3@gmail.com only). Data source:
`data/bible-notes-progress-log.json`, served via `app/api/admin/bible-notes-progress/route.ts`.
Update that JSON file (add a new entry with startedAt/finishedAt/sections/cards/verses/notes)
every time a chapter is finished — this markdown file and that JSON log should stay in sync.

## Running totals

- **GENESIS IS COMPLETE — all 50 chapters at gold standard.**
- Done under this log: 30 chapters (Genesis 41, 43, 44, 45, 46, 47, 48, 49, 50; Exodus 1-21)
- Done before this log (pre-existing gold standard): 41 chapters (Genesis 1-40, 42)
- Total done: 71 / 1,189
- Remaining: 1,118
- Currently on: Exodus (40 chapters total, 21 done, 19 to go)
- Running under /loop (dynamic self-pacing) starting 2026-07-25 ~13:53 UTC
- Known follow-up: Genesis 41, 43, and 44 were written before the ~2-cards/verse
  density standard was locked in (see skill Part 2, Step 2). They're solid on voice
  and accuracy, just thinner on coverage than the current bar. Worth a density pass
  later — not blocking, not urgent.

## Pace notes

- 2026-07-24: First session included voice calibration (drafts revised twice
  before Genesis 41 was approved). Actual writing pace once the voice is
  locked in should be faster than this session's — treat day 1 as an outlier,
  not a baseline.

## Voice standard (locked in 2026-07-24)

- Short, plain sentences. Avoid words like "scarcity" — aim for a 5th/6th
  grade reading level.
- Explain the *meaning* of a phrase, not a recap of what already happened in
  the verse (reader already read it).
- Favor historical/cultural grounding: what would this have meant to the
  original audience, and why (Egyptian customs, geography, real KJV word
  definitions), over generic inspirational commentary.
- Full phrase coverage per section — do not skip verses/phrases for pacing.
  Genesis 41 sections ran 5-9 verses each with 2-6 phrase cards.
- No `➡️` transition lines (dropped from the original skill spec per user
  feedback on 2026-07-24) — cards end after the emoji bullets.
- Reference implementation: `lib/genesisFortyOneSource.ts`.
