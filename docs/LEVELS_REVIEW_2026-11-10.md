# Bible Buddy — 20 levels: the structure to review

**10 November 2026. Nothing implemented. No migration run, no production row
written, no feature code changed.** This answers the four things Louis asked to
see before any code is written. It supersedes two sections of
`docs/LEVELS_PROPOSAL_2026-11-10.md`, and says so where it does.

**What changed since the proposal, and why:**

1. **The per-level user counts are now measured, not interpolated.** The
   proposal's "users there today" column was interpolated between threshold
   counts. §3 below is the real dry-run histogram over **7,195 users** —
   computed with the live scoring engine, writing nothing. **It replaces
   proposal §2.1's last column.**
2. **The ring colour tiers were re-banded to land on 5, 10, 15 and 20.** Louis
   asked for special celebrations at those four levels. The proposal's rings
   changed colour family at 5, 9, 13 and 17, so three of the four big moments
   would have had no visual change. The tiers are now **4 / 5 / 5 / 5 / 1**, so
   the ring changes colour family *exactly* when a milestone celebration fires.
   **This replaces proposal §2.4.**

Everything else in the proposal stands.

---

## 1. The complete XP requirements, Levels 1–20

| Lv | XP to reach | XP in this level | What it costs in real study |
|---:|---:|---:|---|
| 1 | 0 | 50 | Signing up |
| 2 | **50** | 100 | **One chapter read** (signup 25 + login 5 + chapter 25 = 55) |
| 3 | 150 | 150 | ~4 chapters, or a first week |
| 4 | 300 | 200 | ~2 weeks of light study |
| 5 | **500** | 300 | ~1 month light, or 1 week daily |
| 6 | 800 | 400 | ~6 weeks |
| 7 | 1,200 | 500 | ~2 months |
| 8 | 1,700 | 600 | ~10 weeks |
| 9 | 2,300 | 800 | ~3 months |
| 10 | **3,100** | 1,000 | ~4 months |
| 11 | 4,100 | 1,300 | ~5 months |
| 12 | 5,400 | 1,600 | ~6 months |
| 13 | 7,000 | 2,000 | ~8 months |
| 14 | 9,000 | 2,500 | ~10 months |
| 15 | **11,500** | 3,000 | **~1 year of daily study** |
| 16 | 14,500 | 3,500 | ~15 months |
| 17 | 18,000 | 4,000 | ~18 months |
| 18 | 22,000 | 4,000 | ~2 years |
| 19 | 26,000 | 4,000 | |
| 20 | **30,000** | — | **≈ the whole Bible once through** |

**Against today's live curve**, which is the reason 95% of users never move:

| | Level 2 | Level 5 | Level 10 | Level 20 |
|---|---:|---:|---:|---:|
| Live today | 250 | 1,800 | 8,300 | 36,300 |
| Proposed | **50** | **500** | **3,100** | **30,000** |

Level 2 drops from ten chapters to one. Level 20 drops below the highest score
anyone has actually reached (30,727), so the top of the ladder stops being
theoretical.

**Why the curve is shaped this way.** Three anchors:

- **Level 2 = your first chapter.** `chapter_completed` is worth 25 and signup
  is worth 25, so 50 is reached by reading once. This is the single most
  consequential number in the table.
- **Level 20 = a Bible's worth of study.** 1,189 chapters × 25 XP = 29,725,
  rounded to 30,000. A full Bible-in-One-Year run (365 days × 65 for reading +
  trivia + reflection) is 23,725 — Level 19. So the summit means something
  specific and true.
- **The gap grows, then flattens at 4,000.** Early levels arrive in days so the
  system is visible at all; the last three cost about two months of daily study
  each. A gap that kept doubling would make the top an unreachable horizon
  instead of a finish line.

---

## 2. The names and titles for all 20 levels

**These are not new. They are the existing `LEGACY_LEVEL_DEFINITIONS` in
`lib/levelSystem.ts`, used verbatim** — names, identity text and encouragement
text. The only thing changing is the XP thresholds. Levels 21–50 (the generated
filler: "Covenant Keeper", "Holy Flame", "Bible Buddy Legend" …) are deleted.

| Lv | Name | Identity ("you are…") | Encouragement (shown on level-up) |
|---:|---|---|---|
| 1 | **Seeker** | Just getting started, exploring Scripture and the app. | Every strong habit starts with one step. Keep showing up. |
| 2 | **Explorer** | Beginning to engage and discover more of the Bible. | Keep exploring. Clarity grows with each step you take. |
| 3 | **Listener** | Taking time to read and absorb God's Word. | Slow down and listen. The Word shapes you as you stay with it. |
| 4 | **Reader** | Consistently reading and interacting with Scripture. | Consistency matters. Keep building your rhythm in the Word. |
| 5 | **Learner** | Starting to understand and reflect on what is read. | Understanding comes little by little. Stay curious and keep going. |
| 6 | **Follower** | Applying what is learned and staying consistent. | Keep practicing what you are learning. Growth shows up in repetition. |
| 7 | **Disciple** | Committed to growing daily in the Word. | Daily faithfulness adds up. Your habits are shaping your walk. |
| 8 | **Rooted** | Building a strong foundation in Scripture. | Roots grow quietly. Stay planted and keep showing up. |
| 9 | **Grounded** | Stable and consistent in Bible study habits. | Stability is powerful. Keep building on what is already taking shape. |
| 10 | **Steady** | Showing discipline and regular engagement. | Steady progress matters. Keep moving one faithful step at a time. |
| 11 | **Faithful** | Reliable in daily study and spiritual growth. | Faithfulness is a strength. Keep returning to the Word each day. |
| 12 | **Equipped** | Gaining deeper understanding and context. | You are not just reading more. You are understanding more. |
| 13 | **Watchful** | Aware, intentional, and growing in discernment. | Discernment grows through attention. Stay alert and keep learning. |
| 14 | **Devoted** | Deep commitment to time in the Word. | Devotion deepens over time. Keep giving God your attention. |
| 15 | **Servant** | Living out what is learned through action. | What you are learning is showing up in how you live. Keep going. |
| 16 | **Builder** | Helping strengthen others through knowledge and example. | You are building something steady. Your example matters. |
| 17 | **Mentor** | Able to explain and share understanding clearly. | Clarity helps others grow too. Keep sharing what you have learned. |
| 18 | **Shepherd** | Guiding and supporting others in their journey. | Leadership grows out of faithfulness. Keep caring well for others. |
| 19 | **Watchman** | Spiritually alert, mature, and grounded in truth. | Stay watchful and grounded. Maturity is built through steady faithfulness. |
| 20 | **Ambassador** | Representing the Word with consistency, wisdom, and leadership. | You have built something lasting. Keep representing the Word well. |

**Level 17 was renamed from Teacher to Mentor** (Louis, 2026-11-10). The legacy
name collided with `member_badge = 'teacher'`, Louis's own badge (👨‍🏫 Teacher,
set by `SET_LOUIS_TEACHER_BADGE.sql`), so a member reaching Level 17 would have
shown "Teacher" beside but separate from the real Teacher badge. The **level**
was renamed, not the badge. This is the one change to the legacy names; the other
19 are untouched. Nobody is at Level 17 or close to it, so no live user sees a
name change.

### The five ring tiers

The colour family changes **exactly at 5, 10, 15 and 20** — the four milestone
levels.

| Tier | Levels | Family | Where the colour comes from |
|---|---|---|---|
| I | 1–4 | **Stone** | the app's existing greys (`--bb-text-muted`, `--bb-card-border`) |
| II | **5**–9 | **Water** | `--bb-accent` default `#2f7fe8` — Bible Buddy's own blue |
| III | **10**–14 | **Olive** | the Green theme family in `lib/appThemes.ts` |
| IV | **15**–19 | **Lamp** | the Gold theme family |
| V | **20** | **Crown** | `#6d5bd0`, the violet `LevelProgressCard` already uses for levels |

Level 20 is a tier of one. Ambassador is the summit and should not share its
colour with anything.

### The 20 rings

Two hexes per level — one for the 16 light themes (`card: #FFFFFF`) and one for
the Dark theme (`card: #0F1C2B`). **Contrast ratios are computed (WCAG 2.x
relative luminance), not estimated.**

| Lv | Name | Light hex | vs white | Dark hex | vs dark | Ring geometry |
|---:|---|---|---:|---|---:|---|
| 1 | Seeker | `#7C8CA3` | 3.42 | `#94A3B8` | 6.71 | 2px solid |
| 2 | Explorer | `#64748B` | 4.76 | `#AEB9C7` | 8.65 | 3px solid |
| 3 | Listener | `#4A5768` | 7.36 | `#C6CFDA` | 10.92 | 3px + inner hairline |
| 4 | Reader | `#334155` | 10.35 | `#DCE3EB` | 13.29 | 3px + hairline + cap notch |
| 5 | **Learner** | `#4E93EC` | 3.13 | `#60A5FA` | 6.76 | 2px solid — **new tier** |
| 6 | Follower | `#2F7FE8` | 3.95 | `#86B8F6` | 8.35 | 3px solid |
| 7 | Disciple | `#1F63CE` | 5.62 | `#A5C8FA` | 10.02 | 3px + hairline |
| 8 | Rooted | `#1A4BA8` | 8.03 | `#C0D9FC` | 11.93 | 3px + hairline + notch |
| 9 | Grounded | `#15317A` | 11.98 | `#D9E6FD` | 13.66 | 4px double |
| 10 | **Steady** | `#19A67A` | 3.10 | `#2DB88A` | 6.82 | 2px solid — **new tier** |
| 11 | Faithful | `#0D8A66` | 4.33 | `#55D0A7` | 8.98 | 3px solid |
| 12 | Equipped | `#0C7059` | 6.04 | `#7BDCBC` | 10.49 | 3px + hairline |
| 13 | Watchful | `#0C5A47` | 8.17 | `#A3E7D2` | 12.22 | 3px + hairline + notch |
| 14 | Devoted | `#0B4336` | 11.23 | `#C9F2E4` | 14.17 | 4px double |
| 15 | **Servant** | `#C08A08` | 3.05 | `#E0A82E` | 8.03 | 2px solid — **new tier** |
| 16 | Builder | `#AA6A0A` | 4.40 | `#EEBE55` | 9.93 | 3px solid |
| 17 | Mentor | `#8E4A07` | 6.70 | `#F3CE7D` | 11.41 | 3px + hairline |
| 18 | Shepherd | `#73350A` | 9.36 | `#F7DEA6` | 13.06 | 3px + hairline + notch |
| 19 | Watchman | `#55250B` | 12.68 | `#FAEBC9` | 14.57 | 4px double |
| 20 | **Ambassador** | `#4C1D95` | 10.95 | `#C4B5FD` | 9.31 | **4px double + full gold inner hairline** |

**Minimum 3.05 against the light card, 6.71 against the dark card** — both clear
the 3:1 that WCAG 2.2 (1.4.11 Non-text Contrast) asks of a meaningful graphical
object. 20 distinct hexes in each set.

**Why colour is never the only signal.** Twenty hues cannot each be 3:1 distinct
from their neighbours — measured, the best within-tier separation reachable
while keeping every colour legible is **1.26–1.55:1**. So the ring carries the
*tier* in colour (five families, which genuinely are distinguishable) and the
*step within the tier* in geometry, and the exact number is carried by the
existing `LevelBadge` "L7" chip, which is text. A reader with deuteranopia sees
Olive and Lamp merge into similar yellow-browns, and still reads the level from
the lightness ladder, the geometry and the chip. A reader with total colour
blindness sees a lightness ladder repeating five times, and reads the chip. **The
chip ships wherever the ring ships.**

---

## 3. How many existing users land on each level

**Measured, not estimated.** A full dry run of
`scripts/recompute-all-levels.ts`'s logic over every user, with the proposed
thresholds, the three weight fixes, and the level floor applied. Read-only:
nothing was written.

**Scored 7,195 users** — that is every user with a `profile_stats` row (6,633)
**plus the 562 who have study history and no stats row at all** (defect D4). The
live script would have missed those 562 entirely.

| Lv | Name | XP | **Users after** | Users now | Change |
|---:|---|---:|---:|---:|---:|
| 1 | Seeker | 0 | **6,002** | 6,886 | −884 |
| 2 | Explorer | 50 | **750** | 142 | +608 |
| 3 | Listener | 150 | **184** | 64 | +120 |
| 4 | Reader | 300 | **81** | 21 | +60 |
| 5 | Learner | 500 | **55** | 24 | +31 |
| 6 | Follower | 800 | **37** | 14 | +23 |
| 7 | Disciple | 1,200 | **21** | 17 | +4 |
| 8 | Rooted | 1,700 | **14** | 9 | +5 |
| 9 | Grounded | 2,300 | **8** | 2 | +6 |
| 10 | Steady | 3,100 | **10** | 2 | +8 |
| 11 | Faithful | 4,100 | **11** | 7 | +4 |
| 12 | Equipped | 5,400 | **4** | 1 | +3 |
| 13 | Watchful | 7,000 | **3** | 1 | +2 |
| 14 | Devoted | 9,000 | **3** | 1 | +2 |
| 15 | Servant | 11,500 | **5** | 1 | +4 |
| 16 | Builder | 14,500 | **3** | 2 | +1 |
| 17 | Mentor | 18,000 | **0** | 0 | 0 |
| 18 | Shepherd | 22,000 | **3** | 1 | +2 |
| 19 | Watchman | 26,000 | **0** | 0 | 0 |
| 20 | Ambassador | 30,000 | **1** | 0 | +1 |

**The headline numbers:**

- **Above Level 1: 309 → 1,193.** A 3.9× increase, and not one person is given a
  point they had not already earned.
- **1,153 users level up** the day this ships. **0 users level down.**
- **Level 20 is reached by exactly one person** — the account with 30,727 XP,
  which is Louis's. The summit is occupied and not crowded.
- **Levels 17 and 19 are empty.** That is correct and not a bug: 18,000 and
  26,000 XP are genuinely ahead of everyone except the three accounts already
  past 22,000.

**The honest part: 6,002 accounts stay at Level 1.** Not because the curve is
harsh — because the median account has **30 XP** (signup 25 + one login 5) and
has done four things ever. 5,799 of those 6,002 have never completed a single
chapter. That is a signup-funnel fact and no curve can fix it. What the new
curve does fix is that **the first chapter anybody reads now moves them**, which
is the only group this system can actually reach.

### Nobody loses XP or earned progress — here is the proof

Louis's condition, checked three ways.

**1. Nobody can lose XP, structurally.** XP is never stored as a balance. It is
re-derived from the `master_actions` log every time, by
`computePointsFromActivity`. `lib/progressionRewards.ts` says so at the top:
*"Points are always derived from master_actions … no stored balances to drift."*
Re-cutting thresholds does not touch a single XP value. And the three weight
fixes only ever **add** XP — `trivia_chapter_completed` 0 → 15 and
`scrambled_chapter_completed` 0 → 10. There is no weight in this proposal that
goes down. **Measured: 0 users lose XP.**

**2. Nobody can lose a level, because the floor already exists.**
`getLevelInfoWithLevelFloor(totalPoints, storedLevel)` treats the stored level as
a minimum, and `scripts/recompute-all-levels.ts` only writes when the new level
is *higher*. This is the mechanism built after the last rebalance briefly pushed
Louis from 12 to 8 (`RESTORE_LEVEL_FLOOR_AFTER_XP_REBALANCE.sql`). It is already
in the code and already proven.

**3. It was actually needed, and it caught every case.** Without the floor,
**5 users** would have dropped — all by exactly one level:

```
L2 -> L1 : 1 user       L5 -> L4 : 1 user
L3 -> L2 : 2 users      L7 -> L6 : 1 user
```

Those five sit in a pocket where the old *legacy* curve was more generous than
the new one (legacy L5 was 300 XP; proposed L5 is 500). **With the floor applied,
all five keep their level. Measured level falls: 0.**

---

## 4. How the level-up popup works

**Extends `components/LevelProgressCard.tsx`, which already has a level-up
modal.** No second popup is built. Per the repo's "search before you build"
rule: this component is authoritative for level display, it is mounted at
`components/HomeScreen.tsx:362`, and nothing else renders a level-up.

### Two tiers of celebration

**A. Standard level-up** — levels 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17,
18, 19. A centred modal card:

- The **new ring, drawn at 96px**, crossfading over the old one beneath it
- "**Level 7**" large, "**Disciple**" beneath it
- The `identityText` line: *"Committed to growing daily in the Word."*
- The `encouragementText` in a tinted panel: *"Daily faithfulness adds up…"*
- A progress bar reset to the start of the new level: "**500 XP to Rooted**"
- One button: "**Keep going**"

**B. Milestone celebration** — **Levels 5, 10, 15 and 20.** Same card, four
additions, and the reason these four are special is structural rather than
decorative: **each one is the level where the ring changes colour family.**

| | Level 5 | Level 10 | Level 15 | Level 20 |
|---|---|---|---|---|
| Name | Learner | Steady | Servant | Ambassador |
| Ring moves to | **Water** (blue) | **Olive** (green) | **Lamp** (amber) | **Crown** (violet) |
| Headline | "A new tier" | "A new tier" | "A new tier" | "**The top of the ladder**" |
| Milestone line | "You've read your first month." | "Four months in the Word." | "A year of daily study." | "A Bible's worth of study." |
| Posted to the feed | yes | yes | yes | yes |

**No reward is named in the popup** (Louis, 2026-11-10). The milestone
celebrates the level itself and nothing else until there is something real to
promise. A popup that names an unlock we have not committed to is worse than one
that names none.

The four extras on a milestone popup:

1. **The old tier's ring visibly becomes the new tier's** — the one moment the
   colour change is worth animating, because it is the only moment it happens.
2. **A tier banner**: "Tier II — Water" above the level name.
3. **The milestone line** from the table above, which says in plain words what
   the number means in Bible study.
4. **"Shared with the community"**, with the sentence that will appear on the
   wall shown inline so nobody is surprised by it — and a link to turn it off.

**Level 20 is different again.** It is a tier of one, it is the end of the
ladder, there is no "XP to next level", and the progress bar is replaced by
"**You've read a Bible's worth. 30,000 XP.**" The button reads "**Amen**"
instead of "Keep going".

### Reach, measured

How many existing users would ever see each milestone, from §3:

- **Level 5 or above: 178 users.** Of those, 55 are exactly at Level 5.
- **Level 10 or above: 43.**
- **Level 15 or above: 12.**
- **Level 20: 1.**

### The firing rule, and why no popup fires at the backfill

**The backfill will raise 1,153 levels in one run. Not one of them pops.** As
part of the backfill, `level_celebrated` is set equal to `current_level` for
every row. **The first celebration anybody sees is for the first level they earn
after this ships.** That is one `update` statement and it is not optional —
without it, 1,153 people get a popup for something they were silently given, and
178 of them get a milestone takeover.

### Idempotency: a retry cannot fire it twice, and a missed popup is not lost

This fixes defects **D1** and **D2**. Today the server banks the new level *and*
reports the level-up in the same request — so if the modal never renders (user
navigated away, tab backgrounded, app killed), **that celebration is gone
forever and nothing records that it was owed.**

One nullable column:

```sql
alter table public.profile_stats
  add column if not exists level_celebrated integer;
```

- `leveledUp` becomes `current_level > coalesce(level_celebrated, 0)` — a
  question about durable state, not about what happened in this request. An
  uncelebrated level **stays owed** across reloads, devices, app restarts and
  server retries.
- The **client** acknowledges on dismiss: `POST /api/points/celebrated { level }`
  sets `level_celebrated = greatest(coalesce(level_celebrated,0), :level)`.
  `greatest` makes it idempotent — a retry, a double-tap and two tabs racing all
  land on the same value. **A retry cannot fire it twice and cannot move the
  value backwards.**
- **Two tabs open:** both show it; the first dismiss acknowledges, the second is
  a no-op. Showing good news twice is a far better failure than never showing it.
- **Skipping levels:** someone who jumps Level 4 → Level 7 sees **one** popup,
  for Level 7. Three modals in a row is worse than one. If the jump crosses a
  milestone — Level 4 → Level 11 crosses 5 and 10 — the popup is the **milestone
  version for the highest milestone crossed**, naming the level actually reached.
- **Replay:** the full ladder lives on the profile page and is always browsable,
  so there is no "see it again" button. `level_celebrated` is the mechanism that
  could allow one later.

### The two traps that already cost this project time

**Off-screen modals.** The popup is rebuilt on `components/ModalShell.tsx`,
which already uses `createPortal` into `document.body`. The current modal is a
raw `fixed inset-0` div and works only by accident — `HomeScreen` is its own
route at `/dashboard`, outside `DashboardJourneyExperience`'s transformed track.
A `position: fixed` element inside a `transform` renders thousands of pixels
off-screen, so the moment this popup is triggered from inside the pager it would
vanish. `ModalShell` makes that impossible by construction.

**Polling.** **The popup adds no polling and no new request.** It fires off the
`/api/points/summary` response `LevelProgressCard` *already* fetches once per
dashboard mount. Per dashboard page load:

- 1 call to `/api/points/summary`
- which issues **4 database requests** for the typical user (1 paged
  `master_actions` read — p50 is 4 actions, p90 is 22, p99 is 315, all one page
  — plus `group_posts`, `group_post_likes`, `profile_stats`)
- 23 users of 7,195 have over 1,000 actions and cost one extra read per extra
  1,000; the worst account (33,120 actions) costs 34 reads, once, for one person
- the dismiss adds **1 write**, once per level ever

**No `setInterval`, no `setTimeout` loop, no realtime subscription, no new
cron.** For scale: the three October outages came from an 8-second interval in
`AppShell` producing ~147k requests a day from ~25 open tabs.
`scripts/verify-level-no-polling.ts` will assert the absence in source.

### Accessibility

- Ring crossfade, number count-up and the milestone flourish are all inside
  `@media (prefers-reduced-motion: reduce)` → no transition, final state
  immediately. This follows the existing idiom in `app/globals.css`,
  `components/AppShell.tsx`, `components/DevotionalDayCompletionModal.tsx` and
  four other files.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on the heading. Focus
  moves in on open and returns to the trigger on close. `Escape` closes.
  `ModalShell` already handles the scroll lock.
- Nothing is announced by colour alone — the heading reads "Level 10 — Steady",
  and the tier banner reads "Tier III — Olive" as text.

---

## Decisions — all settled

**Settled 2026-11-10. Nothing on this list is open any more.**

| Decision | Louis's call |
|---|---|
| 20 levels, not 50 | **Yes** |
| Level 2 at 50 XP | **Yes** |
| The four defects (D1–D4) get fixed | **Yes** |
| Founder Buddy stays separate, renders before the level chip | **Yes** |
| Milestone opt-out ships with the announcement | **Yes** |
| Nobody loses XP or a level | **Yes** — verified three ways in §3 |
| **Level 17 name** | **Renamed Teacher → Mentor**, so it cannot collide with the personal Teacher badge |
| **Level 20 threshold** | **Stays at 30,000 XP.** Louis: *"I'm fine with already being Level 20. I earned those points, and I don't want to move the goalposts."* |
| **Milestone rewards** | **Not promised yet.** The four milestone celebrations still happen; they name no specific unlock until Louis decides what is on offer. The "Unlock named" row has been removed from §4's milestone table and the §2.8 reward list in the proposal is now a menu to choose from, not a plan |
| **Rings vs chips** | **Chips** in comments, messages and crowded rows; **full rings** on profiles, dashboards and larger displays |

**The popup design is a separate decision and is still being reviewed** —
see `docs/LEVELS_POPUP_GOLDEN_BADGE_2026-11-10.md`. §4 above describes the
*behaviour* (when it fires, idempotency, reduced motion, read cost), all of
which stands. The *visual* is being replaced with the Golden Badge direction, so
treat §4's layout description as superseded by that document.

---

## Appendix — what was measured

**Read read-only from the live database, 10 November 2026:** 204,299
`master_actions` rows, 6,633 `profile_stats` rows, 2,114 `group_posts`, 3,007
`group_post_likes`. Nothing written.

**Computed in memory, writing nothing:** the per-level histograms in §3, using
the live `lib/pointsEngine.ts` rules (`UNIQUE_PER_LABEL`, `DAILY_CAPS`,
`SOCIAL_DAILY_CAPS`, `streakBonusPointsFor`) with the proposed thresholds, the
three weight fixes, and the level floor; the level-fall count and the five
floor-protected cases; the milestone reach counts.

**Computed arithmetically:** every contrast ratio in §2 (WCAG 2.x relative
luminance), the within-tier separation range, and the Level 20 anchor
(1,189 chapters × 25 XP = 29,725).

**Inferred, and flagged as such:** the "what it costs in real study" column in
§1, derived from the weight table and daily caps rather than from observed user
timelines; and the claim that the current modal would break inside the pager
transform, reasoned from the CSS containing-block rule rather than reproduced.

**Not done:** nothing implemented, no migration run, no production row written,
no feature code changed. The backfill was not executed — only its inputs were
read.
