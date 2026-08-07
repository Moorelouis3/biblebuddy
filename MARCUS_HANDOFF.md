## Post-Deuteronomy books have old-style grouped note files, not per-chapter files
The Bible Note Writer Agent's normal fallback rule is "next chapter with no
existing wired-in lib file." Past Deuteronomy, that rule breaks down: Joshua
(and apparently Judges, spot-checked with the same shape) already has content
wired in via older grouped multi-chapter files
(`lib/joshuaOneToElevenPersonalNotes.ts`, `joshuaTwelveToNineteenPersonalNotes.ts`,
`joshuaTwentyToTwentyFourPersonalNotes.ts`, plus a separate `joshuaDeepNotes.ts`),
not the single-chapter `lib/<book><ChapterWord>Source.ts` files this pipeline
normally builds. Those grouped files only cover a handful of hand-picked verse
ranges per chapter (e.g. just two thin sections for all of Joshua 1) rather
than full near-2-cards-per-verse coverage, so they are not really equivalent
to a finished chapter even though something is technically wired in.

A run on 2026-08-07T11:49:58Z stopped cleanly and flagged this for a human
decision rather than guessing. This run (2026-08-07T12:56:40Z) resolved just
enough of it to keep moving: it wrote a real single-chapter Joshua 1 file and
added an override wiring call after the old aggregate's call, so Joshua 1 now
gets full new-style coverage while Joshua 2-24 (and Judges, and presumably
other post-Deuteronomy books) still render from the old thin grouped files,
completely untouched.

The still-open question: should Joshua 2-24, Judges, and any other book using
this same old grouped-file pattern be added to
`data/bible-notes-style-redo-remaining.json` for a proper one-file-per-chapter
regeneration (like the Genesis/Exodus/Numbers/Deuteronomy redo backlog
already did), or handled some other way? Until that's decided, the routine
will keep needing this same one-off judgment call every time it reaches a
chapter in one of these old grouped files.
