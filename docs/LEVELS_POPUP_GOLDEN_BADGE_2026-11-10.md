# Bible Buddy — the level-up popup: what exists, and the Golden Badge plan

**10 November 2026. Nothing implemented. No component changed, no migration run,
no production row written.** This answers the seven questions Louis asked before
the popup is built, and recommends an approach.

Companions: `docs/LEVELS_REVIEW_2026-11-10.md` (the 20-level structure, now
fully decided) and `docs/LEVELS_PROPOSAL_2026-11-10.md` (the inventory).
**§4 of the review describes the popup's *behaviour* — when it fires,
idempotency, read cost, reduced motion — and all of that stands.** This document
replaces only its *visual* description.

---

## The short answer

**Keep the machinery, replace the picture.** The existing popup is 40 lines of
markup inside `components/LevelProgressCard.tsx` — there is barely anything to
reuse *in it*. But the celebration *pattern* Bible Buddy needs already exists
and is good: `components/DevotionalDayCompletionModal.tsx` has the portal, the
entrance animation, `canvas-confetti`, reduced-motion handling and the
drawn-not-fetched SVG decoration. **Build the Golden Badge as one parameterised
component on that pattern, in pure SVG + CSS, with no image assets.** One
template, 20 levels, a full celebration at every one of them, and four
stronger milestone variants on top.

---

## 1. What the existing popup actually looks like

**Where it is:** `components/LevelProgressCard.tsx`, the `celebrating` branch —
40 lines of JSX. Mounted at `components/HomeScreen.tsx:362`, so it is live on
`/dashboard` and `/home`.

**A note on "screenshots".** I could not screenshot a real level-up in the
running app, and deliberately did not try: triggering one means a real account
crossing a real threshold, which would write `profile_stats.current_level` in
production. What was shown instead is the component's **exact markup and class
values rendered at phone width** — every hex, radius, weight and spacing lifted
from the source, nothing redesigned. It is a faithful render, not a photograph.

**What it is, in full.** A white card on a 60%-black scrim:

| Element | Exact values from source |
|---|---|
| Scrim | `fixed inset-0 z-[10000] bg-black/60 px-6`, flex-centred |
| Card | `w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl` |
| Badge | `h-20 w-20 rounded-full bg-[#6d5bd0]`, text `L7`, `text-2xl font-black text-white shadow-lg` |
| Eyebrow | `text-xs font-black uppercase tracking-widest text-[#6d5bd0]` — "Level up!" |
| Heading | `text-2xl font-black text-gray-950` — the level **name** only |
| Identity | `text-sm font-semibold text-gray-600` |
| Encouragement | `rounded-2xl bg-[#f5f2ff] px-4 py-3 text-sm font-bold text-gray-800` |
| Button | `w-full rounded-2xl bg-gray-950 px-5 py-3 text-sm font-black`, white text — "Keep going" |

**What it does not have.** No XP figure. No progress bar. No next-level name. No
ring. No level number as a heading — the number only appears as "L7" inside the
circle. No entrance animation. No confetti. **No milestone variant: Level 2 and
Level 20 are pixel-identical apart from the digits.** And it is a raw `fixed`
overlay rather than `ModalShell`, so no portal, no focus trap, no `Escape`, no
scroll lock.

**Verdict.** It is a competent notification. It is not an achievement. Louis's
instinct is right, and the gap is not styling — it is that the popup shows
almost none of what the API already returns. `/api/points/summary` hands back
`totalPoints`, `progressPercent`, `pointsToNextLevel`, `nextLevelName` and
`nextLevel`, and the popup uses **none** of the five.

---

## 2. What can be reused

**From the existing popup itself: the copy, the colour and the data — not the
layout.**

| Piece | Reuse? | Why |
|---|---|---|
| `identityText` / `encouragementText` for all 20 levels | **Yes, verbatim** | Already written, already good. `lib/levelSystem.ts` |
| The purple `#6d5bd0` | **Yes, as the Crown tier** | It becomes Level 20's tier colour rather than every level's |
| `rounded-[28px]`, one-button exit, centred layout | **Yes** | The card proportions are right |
| The `/api/points/summary` fetch and `localStorage` snapshot in `LevelProgressCard` | **Yes, untouched** | Already works, already cheap. The popup is a new child of this component, not a new fetch |
| The 40 lines of modal JSX | **No — replace** | Nothing in it survives the redesign |

**From elsewhere in the repo — this is where the real reuse is.** Everything
below already exists, is already shipped, and needs no new dependency:

| Piece | Where | What it gives |
|---|---|---|
| **`ModalShell`** | `components/ModalShell.tsx` | `createPortal` to `document.body` (so the modal can never render off-screen inside the dashboard pager's `transform`), backdrop fade, panel swoop in **and out**, scroll lock via `useDocumentScrollLock`, backdrop-click close, z-index management |
| **Entrance animation** | `app/globals.css:4114-4135` — `modal-panel-in-kf` (`translateY(20px) scale(0.96)` → rest, 260ms `cubic-bezier(0.16,1,0.3,1)`), `modal-backdrop-in-kf` | The swoop is written, tuned and used by every other modal. Nothing to design |
| **`canvas-confetti`** | **already a dependency**, `^1.9.4` in `package.json` | No new package |
| **A complete confetti burst implementation** | `components/DevotionalDayCompletionModal.tsx:72-133` | A 1,000ms two-origin burst, a `MutationObserver` that styles the injected canvas (`position: fixed`, `z-index: 99999`, `pointer-events: none`), a fade-and-remove teardown, and `clearInterval`/`disconnect` cleanup on unmount. **This is the single most valuable thing to reuse** — it is the fiddly part and it is already debugged |
| **`prefersReducedMotion()`** | `components/DevotionalDayCompletionModal.tsx:51-58` | The gate that skips the burst entirely. Copy the helper (better: lift it to `lib/`) |
| **Global reduced-motion rule** | `app/globals.css:4080` and `:4281` | `*, *::before, *::after { animation-duration: 0.01ms !important }`. Blunt but effective — **every CSS animation in the Golden Badge is already covered by this**, so only the JS confetti needs an explicit gate |
| **Drawn-not-fetched SVG decoration** | `DevotionalDayCompletionModal.tsx:155-168` — the hills | The precedent for doing the shield and laurels in inline SVG. Its own comment: *"drawn rather than fetched — no new asset to ship, and it scales to any card width"* |
| **`LouisAvatar` breaking the card's top edge** | same file, `:225-233` | An optional flourish, and a solved layout problem (the avatar sits outside the `overflow-hidden` card so it is not clipped) |
| **`LEVEL_DEFINITIONS`** | `lib/levelSystem.ts` | Name, identity and encouragement for all 20, by level number. The template's entire data source |
| **`bbPointsFloat` / `PointsPop`** | `app/globals.css:4195`, `components/PointsPop.tsx` | The "+25" float already fires on study actions, mounted globally in `app/layout.tsx:241`. The popup should not duplicate it |

**Nothing needs to be built from scratch except the artwork itself.**

---

## 3. One reusable template for all 20 levels — yes

**Recommended: a single `components/LevelUpCelebration.tsx`, driven entirely by
props.** Louis's instinct is right and it is also the cheaper build.

```
<LevelUpCelebration
  level={10}                    // 1-20
  onDismiss={() => …}           // POSTs /api/points/celebrated
  displayName="Grace"           // for the personal line
/>
```

Everything else is **derived**, not passed:

| Shown | Derived from |
|---|---|
| Level number | `level` |
| Level name ("Steady") | `LEVEL_DEFINITIONS[level-1].levelName` |
| Identity + encouragement | `LEVEL_DEFINITIONS[level-1]` |
| Tier, tier name, shield core colour, ring colour | `level` → the 5-tier table in the review doc §2 |
| XP total, progress, next level name | the `/api/points/summary` payload the parent already has |
| Milestone or standard | `level === 5 \|\| 10 \|\| 15 \|\| 20` |

**Why one template rather than four.** A milestone is not a different popup —
it is the same popup with the dial turned up. Four files would drift: a copy fix
in one, a colour fix in another, and by month three Level 10 and Level 15 look
like different products. One component with a `milestone` boolean and a
`TIER_STYLE` lookup cannot drift.

**Two things the template must get right:**

1. **It must handle a level with no next level.** Level 20 has
   `maxPoints: null` and `pointsToNextLevel: 0`. The progress bar is replaced by
   the XP total, and the button reads differently. One conditional, but it is the
   one that crashes if forgotten.
2. **It must never show a reward it cannot deliver.** Per Louis's decision, no
   unlock is named until there is something to promise. The template should have
   no reward slot at all for now — an empty slot is an invitation to fill it
   carelessly.

---

## 4. CSS, SVG, or image assets — SVG + CSS, no images

**Recommendation: inline SVG for the artwork, CSS for the motion, zero image
files.** This is also what the repo already does for celebration decoration.

| Approach | Verdict |
|---|---|
| **Inline SVG** (shield, laurels, ribbon, rays, crown) | **Yes.** Crisp at every density — and phones are 2×/3×, where a raster badge is the difference between premium and cheap. Recolours per tier from one path set, so 20 levels cost one shape. Zero network requests, zero layout shift, nothing to deploy. Animatable (the glow, the rays) with CSS on SVG elements |
| **CSS** (gradients, the navy card, glow, entrance, pulse) | **Yes, for motion and surfaces.** The gold gradient is two `linearGradient` stops; the glow is one `radialGradient`. CSS `@keyframes` drive the shimmer and the ray rotation |
| **PNG / image assets** | **No.** A shield that looks right on a 3× phone is ~900×900 and ~120KB; 20 tier variants multiply that, it cannot recolour, it needs a deploy to change, and `/public` 404s until the next build — a trap this project has already hit with email images. The one thing images buy is painterly texture, which this design does not need |
| **Lottie / animation library** | **No.** A new dependency, a JSON asset per variant, and `canvas-confetti` plus CSS already cover every effect here |

**How premium is achieved without images** — five specifics, because "use SVG"
is not a design:

1. **The gold is a three-stop gradient, not a flat fill.** `#FBEFB4` → `#E3BA4E`
   → `#8A6410` top-to-bottom reads as a bevelled metal edge. A single `#FFD700`
   is what makes a badge look like a sticker.
2. **The shield is two nested paths**, not one. An outer gold plate and an inner
   dark core, so the gold reads as a *frame* with depth rather than a silhouette.
3. **The core carries the tier colour, stroked at 2.5px.** This is how the
   Golden Badge and the ring system coexist — see §5.
4. **A radial glow behind the shield**, gold at 55% fading to 0. Cheap, and it is
   the whole "glowing" impression.
5. **Light rays from behind the shield** on milestones only: 5 at Level 5, 7 at
   Level 10, 9 at Level 15, 13 at Level 20. Counting the rays is how the tiers
   escalate without new artwork.

**Mobile is the constraint that decides this.** At 390px the card is ~342px
wide, the shield ~96px. Every number in the preview was set at that width. SVG
paths scale to it exactly; a raster asset would be resampled.

---

## 5. How milestone celebrations work — same template, dial turned up

**Yes to Louis's proposal: one template, stronger effects at 5, 10, 15, 20.**
And there is a structural reason these four are the right ones, which is worth
stating because it was luck until the review doc fixed it: **5, 10, 15 and 20
are exactly where the ring changes colour family.** Tiers are 1–4 Stone, 5–9
Water, 10–14 Olive, 15–19 Lamp, 20 Crown. So a milestone is not an arbitrary
round number — it is the one moment the user's visible identity changes.

### Every level gets a full celebration, confetti included

**Louis, 2026-11-10: *"I want pop ups for each level. Each level is important
and can take months or maybe years to get from level 2 to level 5 then to level
10. Every level should be important to reach."*** An earlier draft of this
document withheld confetti from the 15 non-milestone levels. That was wrong, and
the data says so.

**Measured, not argued.** Replaying every user's `master_actions` log in time
order with the proposed thresholds and the live scoring rules gives the real
pacing. Median days between consecutive levels, counting only users who reached
both:

| Step | Median | Step | Median | Step | Median |
|---|---:|---|---:|---|---:|
| L2→L3 | 1 day | L8→L9 | 6 days | L14→L15 | **15 days** |
| L3→L4 | 2 days | L9→L10 | **10 days** | L15→L16 | 13 days |
| L4→L5 | 3 days | L10→L11 | 8 days | L16→L17 | 6 days |
| L5→L6 | 4 days | L11→L12 | 9 days | L17→L18 | 12 days |
| L6→L7 | 4 days | L12→L13 | 8 days | L18→L19 | **47 days** |
| L7→L8 | 5 days | L13→L14 | **14 days** | L19→L20 | **44 days** |

And total time from a user's first action to reaching the level:

| Level | Median | Level | Median | Level | Median |
|---|---:|---|---:|---|---:|
| L2 | same day | L10 | 43 days | L16 | 64 days |
| L5 | 13 days | L12 | 80 days | L18 | 75 days |
| L8 | 31 days | L15 | **115 days** | L20 | **159 days** |

**Louis is right, and the numbers are blunt about it.** Reaching Level 15 takes
a median of **115 days** and Level 20 **159 days**. The last two steps alone are
**47 and 44 days** each. A level that costs someone six weeks of showing up is
not a "standard" anything, and withholding confetti from it would have been
indefensible.

**What was true in my earlier concern, and how it is handled.** The fast band is
real but narrow: **729 of the 1,190 users who reach Level 2 do it on their first
day**, and 125 of 259 reach Level 4 within a week. So a keen beginner can stack
two or three popups in their first days. The fix is not to remove the
celebration — it is to make the early ones **shorter**, not absent. A 500ms
burst is still a celebration; it simply is not the 1,400ms Level 20 gets.

So **confetti fires at every one of the 20 levels**, and the escalation is
duration and density rather than presence:

| Band | Confetti | Why |
|---|---|---|
| Levels 2–4 | 500ms, 1 origin | The fast band — median 1–3 days apart |
| Levels 6–9, 11–14, 16–19 | 800ms, 2 origins | The real grind — 4 to 47 days each |
| Levels 5, 10, 15 | 1,100ms, 2 origins, tier colours | A new tier |
| Level 20 | 1,400ms, 3 origins, gold | 159 days, once |

**One thing worth watching rather than engineering around.** If someone crosses
two levels in a single session, they get one popup for the higher level, not two
— `level_celebrated` already handles that (review doc §4). Two popups in one day
is possible for a very fast beginner, and that is fine: they earned both.

| | Every other level | Level 5 | Level 10 | Level 15 | Level 20 |
|---|---|---|---|---|---|
| Card | navy `#0B1527` | same | same | same | deeper `#0A0F23` |
| Shield | gold, 2 paths | same | same | slightly larger | largest |
| Laurels | open pair | open pair | open pair | fuller pair | **closed wreath** |
| Crown above shield | — | — | — | — | **yes** |
| Light rays | none | 5 | 7 | 9 | 13 |
| Sparks | none | 6 | 8 | 10 | 12 |
| Tier banner | none | Tier II · Water | Tier III · Olive | Tier IV · Lamp | **Top level** |
| Ribbon | "LEVEL UP" | "LEVEL UP" | "LEVEL UP" | "LEVEL UP" | **"TOP OF THE LADDER"** |
| Confetti | **yes — 500ms (L2–4) or 800ms (L6+)** | 1,100ms, 2 origins | 1,100ms | 1,100ms | 1,400ms, 3 origins, gold |
| Shield entrance | scale-in 260ms | + glow pulse | + glow pulse | + glow pulse | + slow ray rotation |
| Button | "Keep going" | "Keep going" | "Keep going" | "Keep going" | **"Amen"** |
| Progress bar | yes | yes | yes | yes | **replaced by "30,000 XP"** |

**Every row above fires at every level** — the gold shield, the laurels, the
ribbon, the swoop and the confetti. The milestone columns add to that; they are
not the only levels that get a celebration.

**The reward row is deliberately absent** (Louis, 2026-11-10). The milestone
celebrates the level and nothing else until there is something real to promise.

---

## 6. What I need from Louis

**Nothing, to produce the design.** The whole thing is SVG and CSS I can write,
and the preview already shown is the real artwork at the real size, not a sketch.
No shield file, no background image, no laurel asset, no reference image is
required.

**Four things that would help, none blocking:**

1. **The original Golden Badge reference image**, if there is one to hand. Not
   needed to build, but useful to check against — Louis has a specific picture
   in mind and the preview is my reading of his description. If the real
   reference has a different shield silhouette or a warmer gold, matching it is a
   two-line change now and a redesign later. *(Searched the repo: no file
   mentioning "Golden Badge" exists, so if it is a mockup it lives outside this
   checkout.)*
2. **A yes or no on the personal line.** The preview uses "Well done, Grace." —
   first name from `profile_stats.display_name`. Worth confirming because
   **`display_name` is null for a lot of accounts** (onboarding was removed in
   October, so name and photo now come after the first completed action). The
   fallback is the line without the name, which reads fine — but it means some
   people get the personal version and some do not.
3. **A ruling on sound.** A short chime would add more to "this feels like an
   achievement" than any visual effect. It also needs an asset, an autoplay
   policy that browsers may refuse, a mute preference, and it is the kind of
   thing that annoys people in church. My recommendation is **no sound**, but it
   is Louis's call and it is cheaper to decide now than to retrofit.
4. **Which of the five previews is closest**, and what to change. "The Level 10
   one, but the gold is too yellow" is the most useful possible answer.

---

## 7. The preview

**Shown in the conversation**, not in this file: the current popup rendered from
its real markup at phone width, and the Golden Badge at **Levels 2, 5, 10, 15
and 20** inside a phone frame at the real 258px card width. Levels 2 and 5 show
the standard-vs-milestone difference; 10 and 15 show the tier colours; 20 shows
the wreath, crown and "Amen".

What the static preview cannot show, and what the real thing adds: the 260ms
swoop entrance, the glow pulse, the confetti, and the ray rotation at Level 20.

**If Louis wants a moving preview before implementation**, that is a
`tmp/`-only HTML page — a real browser, real animations, real confetti, no app
code touched and nothing committed. Worth doing if the motion is the part in
question; the next step otherwise is building the component for real.

---

## Making it feel like an achievement, not a notification

Louis's last line is the actual brief, so it is worth being concrete about what
delivers it. Ranked by how much each contributes, most first:

1. **Treating every level as earned.** The reason today's popup feels like a
   notification is not that it fires too often — it is that it fires *the same
   way* for a level that took a day and one that took six weeks. Measured
   medians: L19→L20 is 47 days, L14→L15 is 15, and reaching Level 15 takes 115
   days from a standing start. Every level gets the full celebration; the
   escalation is in how long and how loud, not in whether it happens.
2. **Showing the number.** "3,214 XP" and "886 to Faithful" turn a label into a
   standing. The API already returns both and the popup currently shows neither.
3. **Earned-ness in the words.** "You read your first chapter" and "A year of
   daily study" say what the level cost. "Level up!" says nothing.
4. **The visual weight of gold on navy.** A dark card is the one that reads as a
   trophy; every other popup in Bible Buddy is a light card, so this one will not
   be mistaken for a notice.
5. **Motion, last.** The swoop and the confetti are the smallest part, and the
   first thing to over-reach on. 260ms in, confetti only at milestones.

**And one thing that would quietly undo all of it:** firing the popup during the
backfill. 1,153 users level up the moment this ships, and 178 of them cross a
milestone. Setting `level_celebrated = current_level` in the backfill is what
stops 178 people receiving the grandest popup in the app for something they did
not just do. It is one `update` statement and it is the difference between an
achievement and spam.

---

## Build estimate for this piece

Replaces phase 5 in the proposal's plan. Build time, not calendar.

| Step | Work | Estimate |
|---|---|---|
| 1 | Lift `prefersReducedMotion()` and the confetti burst out of `DevotionalDayCompletionModal` into `lib/celebration.ts`, unchanged in behaviour | 2 hours |
| 2 | `components/LevelUpCelebration.tsx` — the SVG shield/laurel/ribbon set, `TIER_STYLE` lookup, standard variant | 1 day |
| 3 | The four milestone variants (rays, sparks, wreath, crown, confetti tiers) | half a day |
| 4 | Wire into `LevelProgressCard`, swap the raw overlay for `ModalShell`, add `level_celebrated` + `/api/points/celebrated` | half a day |
| 5 | `verify:level-modal-portal`, `verify:level-no-polling`, `verify:level-celebration-idempotent` | 2 hours |
| | **Total** | **~2.5 days** |

Still a step-3 change under the deploy rule, so it commits untagged and ships at
the next scheduled build.

---

## Appendix — what was read

**Read from source:** `components/LevelProgressCard.tsx` (137 lines),
`components/ModalShell.tsx`, `components/DevotionalDayCompletionModal.tsx` (244
lines), `components/BuddyCelebrationModal.tsx`, `lib/levelSystem.ts`,
`app/api/points/summary/route.ts`, `app/globals.css` (keyframes and
reduced-motion blocks), `package.json`.

**Verified by search:** `canvas-confetti` is a dependency at `^1.9.4` with four
call sites; no file in the repo mentions "Golden Badge"; `LevelBadge` is imported
at `DashboardJourneyExperience.tsx:25` and never rendered.

**Computed:** every hex in the preview; the ray and spark counts; the card
geometry at 390px phone width.

**Not done:** no component changed, nothing implemented, no screenshot taken of
a live level-up (which would have required writing a production row), no
migration run.
