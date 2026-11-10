# Bible Buddy — design backlog

Design problems found while building something else, recorded so they are not
lost and not silently fixed inside unrelated work. Nothing here is scheduled.
Each entry says what is wrong, how it was found, and why it was left alone.

---

## 1. The dashboard's stat cards ignore the theme system

**Found:** 10 November 2026, while auditing the theme system for the level-up
popup (`docs/LEVELS_POPUP_GOLDEN_BADGE_2026-11-10.md` §8).

**Status:** open. **Louis asked for this to be recorded as separate future work
and explicitly not changed as part of the levels work.**

**What is wrong.** The three stat cards in the dashboard header —
`components/HomeScreen.tsx`, roughly lines 311–365 — use **hardcoded pastel hex
values, not theme tokens**:

| Card | Background | Border | Text |
|---|---|---|---|
| Day Streak | `#fff3e6` | `#f4dcc8` | `#3d2417` / `#8a5c40` |
| of Bible | `#eefaf3` | `#cde9dc` | `#123f30` / `#3f7a63` |
| Level (`components/LevelProgressCard.tsx`) | `#f5f2ff` | `#ddd6f3` | `#2b2150` / `#7c68b4` |

Each also carries a fixed background photo (`/home-cards/bg-trivia.jpg`,
`bg-scrambled.jpg`, `bg-group.jpg`).

**The consequence.** On the **Dark** theme the page background is `#07111F` and
every other surface follows the theme, but these three cards stay peach, mint and
lavender with dark text on pale photos. They are the brightest objects on a dark
screen, directly under the greeting. The same mismatch, less violently, applies
to the Black theme and to any pastel theme whose own tint fights theirs.

**Why it was left alone.** It is pre-existing, it is on the most-visited screen
in the app, and the cards were deliberately designed as a pastel family that
matches the carousels below them (`lib/cardTints.ts` documents that intent at
length). Re-tinting them is a visual decision about the dashboard, not a
side-effect of a popup redesign, and doing it quietly inside the levels work is
exactly the kind of change that makes a screen drift.

**What a fix would involve, if taken on.** Either (a) give the three cards
theme-aware variants — keep the pastels on light themes, substitute
`--bb-surface-soft` plus an accent-tinted border on dark ones — or (b) move them
onto tokens entirely and lose the pastel family, which would also mean deciding
what happens to the three background photos. (a) is smaller and keeps the look
Louis signed off; (b) is tidier and is a redesign. Either way the three cards
must change together, and `CARD_TINTS` itself should probably stay as it is,
because the carousels that use it sit on cards, not on the page background.

---

## 2. Twelve of the seventeen themes are below WCAG AA on shared tokens

**Found:** 10 November 2026, computing contrast for the level-up popup across all
17 themes in `lib/appThemes.ts`.

**Status:** open. **Not caused by the levels work and not fixable inside it** —
these are the themes' own token values, used by every screen in the app.

**What is wrong.** Measured with WCAG 2.x relative luminance:

| Token pair | What it renders | Below threshold on |
|---|---|---|
| `buttonText` on `button` | **every primary button in the app** | **12 of 17** — Blue, Gold, Red, Green, Pink, Orange, Rose, Lavender, Mint, Sky, Peach, Butter (needs 4.5, worst 3.02 on Gold) |
| `progressFill` on `progressTrack` | every progress bar | **12 of 17** — same themes (needs 3.0, worst 1.97 on Orange) |
| `accent` as text on `card` | links such as "Psalm 119:105 →", "Read the Breakdown →" | **12 of 17** — same themes (needs 4.5, worst 3.02 on Gold) |
| `textMuted` on `card` | captions, the dashboard subtitle, XP labels | **8 of 17** — Blue, Gold, Rose, Lavender, Mint, Sky, Peach, Butter (needs 4.5, worst 3.39 on Mint) |

The pattern is consistent: the nine colour themes and six pastels were built as
palettes, and their `accent`/`button` value is a mid-tone chosen to look right
rather than to carry white text. Light, Dark, Purple, Gray and Black pass
everything.

**What passes on all 17**, for contrast: `textPrimary` on `card` (worst 12.35)
and `textSecondary` on `card` (worst 6.12). The type hierarchy is sound; it is
the accent and button colours that are not.

**Why it was left alone.** Changing `button` or `accent` on twelve themes
changes the look of every screen for everyone using them. That is a deliberate
design pass with Louis, not a correction to slip into a popup build. The level-up
popup inherits these values exactly as every other surface does — it neither
improves nor worsens them.

**What a fix would involve.** For each failing theme, darken `button` (or switch
`buttonText` to a dark value) until `buttonText`/`button` clears 4.5, and darken
`accent` for text use — possibly splitting `accent` into `accent` (for fills and
borders) and `accentText` (a darker variant for text on `card`), which is what
most design systems end up doing. `progressFill`/`progressTrack` needs the track
darkened rather than the fill lightened, or the bar gains a hairline. Roughly a
day of palette work plus a sweep of the screens.

---

## How to use this file

Add an entry when you find a design problem you are deliberately not fixing.
Say how it was found, what the consequence is, and why it was left — the "why"
is the part that stops someone re-finding it in three months and fixing it
inside unrelated work. Remove an entry when it is fixed, and name the commit.
