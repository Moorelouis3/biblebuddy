# Bible Buddy — 20-Level System: inventory and proposal

**10 November 2026. Nothing in the app was changed to produce this. No
migration was run, no production row was written.** Every number below was read
from the live database read-only, or computed in memory from rows read
read-only, on 10 November 2026. Where a number is inferred rather than read, it
says so.

Louis asked for two things: find what was already built and reuse it, and
propose a 20-level system on top of it. Part 1 is the inventory. Part 2 is the
proposal. Part 3 is the list of calls that are his.

---

## The one-paragraph version

**A complete points-and-levels system already exists, it works, and it is
already a 20-name system wearing a 50-level coat.** `lib/levelSystem.ts` holds
50 levels; the first 20 carry hand-written names and identity text
(Seeker → Ambassador) and levels 21–50 are filler generated from a name array.
The thresholds, however, were rebalanced upward at some point and never
re-checked against reality: **6,321 of 6,630 users — 95.3% — sit at Level 1**,
and the real ceiling anybody has reached is Level 18. So the honest shape of
this work is not "build a level system". It is **cut 50 back to 20, re-cut the
curve so the levels are reachable, give it a visible identity (rings), and fix
four concrete defects in the machinery that already exists.**

---

# Part 1 — Inventory

## 1.1 The table

| Piece | Where it lives | State | Proposal |
|---|---|---|---|
| **Level definitions** (50 levels, 20 named) | `lib/levelSystem.ts` — `LEVEL_DEFINITIONS`, built from `LEVEL_MIN_POINTS` (50 entries) + `LEVEL_NAMES` (50 entries) + `LEGACY_LEVEL_DEFINITIONS` (20 entries with real copy) | **Live** | **Extend** — keep the 20 legacy names and their `identityText`/`encouragementText` verbatim, cut `LEVEL_MIN_POINTS`/`LEVEL_NAMES` to 20, re-cut thresholds |
| **Points weights per action** | `lib/levelSystem.ts` — `ACTION_POINT_WEIGHTS` (49 keys), `SOCIAL_POINT_WEIGHTS` (4 keys) | **Live** | **Extend** — six weights are wrong or dead (§1.6) |
| **Scoring engine** (dedupe + daily caps) | `lib/pointsEngine.ts` — `computePointsFromActivity`, `UNIQUE_PER_LABEL` (18 types), `DAILY_CAPS` (24 types), `SOCIAL_DAILY_CAPS`, `streakBonusPointsFor` | **Live** | **Reuse as-is.** This is the anti-abuse layer and it is well built. Nothing in this proposal needs a second one |
| **XP task values** | `lib/progressionRewards.ts` — `TASK_XP` (7 keys) | **Live** | **Reuse** |
| **Diamond currency** | `lib/progressionRewards.ts` — `DIAMOND_REWARDS` (all 7 values are `0`), `STORE_PRICE_EXAMPLES`, `estimateDiamondStashFromActions` (returns `0`, ignores both arguments) | **Dead code.** `profile_stats` still carries `diamonds_count`, `total_diamonds_earned`, `diamonds_backfilled_at` | **Retire** — delete the module's diamond half; leave the three DB columns alone (dropping columns on a live table for tidiness is the wrong trade) |
| **Points API** | `app/api/points/summary/route.ts` | **Live.** Pages `master_actions` for one user, scores it, writes `profile_stats.current_level` and `total_points` | **Extend** — four defects (§1.7) |
| **Level progress card + level-up modal** | `components/LevelProgressCard.tsx`, mounted at `components/HomeScreen.tsx:362` | **Live** on `/dashboard` and `/home` | **Extend** — this *is* the celebration popup; it needs the ring, idempotency and `ModalShell` |
| **`LevelBadge` ("L7" chip + tooltip)** | `components/LevelBadge.tsx` | **Dormant-but-wired.** Imported at `components/DashboardJourneyExperience.tsx:25` and **never rendered** — there is no `<LevelBadge` anywhere in the repo | **Reuse** — this is the component that goes beside non-founder names. It already exists, styled, with a tap-to-explain popover |
| **`PointsPop` floating "+25"** | `components/PointsPop.tsx`, mounted at `app/layout.tsx:241`; `triggerPoints()` called from **19 call sites** | **Live** | **Reuse** |
| **Member badges incl. Founder Buddy** | `lib/userBadges.ts` (`resolveUserBadge`, 7 badge keys), `components/UserBadge.tsx`, stored in `profile_stats.member_badge` (created by `ADD_MEMBER_BADGES.sql`) | **Live.** 21 `founder_buddy`, 3 `moderator`, 2 `buddy_partner`, 2 `pro_buddy`, 1 `teacher`; 6,601 rows have no badge | **Reuse untouched** — see §2.7 |
| **Admin badge assignment** | `app/api/admin/member-badge/route.ts`, `SET_LOUIS_TEACHER_BADGE.sql` | **Live** | Reuse |
| **Streak** | `profile_stats.current_streak`, `components/StreakFlameBadge.tsx`, `app/api/streak/current/route.ts`, `app/api/cron/refresh-fire-streaks/route.ts`, `has_fire_streak_badge`, `selected_streak_flame`, `grace_days_count` | **Live.** 4,606 of 6,630 users have `current_streak > 0`, max 309 | **Reuse** — streak already feeds points via `streakBonusPointsFor` (+5/week, capped +50) |
| **Event log** | `master_actions` (`CREATE_MASTER_ACTIONS_TABLE.sql`, then widened by 8 `ADD_*_TO_MASTER_ACTIONS_CONSTRAINT.sql` / `UPDATE_MASTER_ACTIONS_ACTION_TYPE_CONSTRAINT.sql` files) | **Live.** 204,299 rows, 110 distinct `action_type` values | **Reuse** — source of truth for all scoring. No new table needed |
| **Cached counters** | `profile_stats` (`CREATE_PROFILE_STATS_TABLE.sql` + ~20 `ADD_*` files), 6,630 rows, 94 columns | **Live** | Extend (§1.3) |
| **Level floor repair** | `supabase/migrations/RESTORE_LEVEL_FLOOR_AFTER_XP_REBALANCE.sql` — adds `level_floor_restored_at`, hard-codes Louis to `current_level >= 12` | **Applied.** Louis is `current_level` 18 now | **Reuse the mechanism** (`getLevelInfoWithLevelFloor`), it is exactly the "nobody gets reset" rule Louis asked for |
| **Full recompute script** | `scripts/recompute-all-levels.ts` (`npx tsx scripts/recompute-all-levels.ts [--dry]`) | **Live, floor-protected** (can only raise a level) | **Reuse as the backfill** — with one fix (§2.3) |
| **Community milestone posts** | `lib/communityMilestones.ts` (`COMMUNITY_MILESTONES`, `milestoneSentence`, `readStudyActivity`, `postMilestoneToWall`, `MAX_MILESTONE_POSTS_PER_DAY = 2`), `app/api/cron/community-milestones/route.ts` (`*/15 * * * *`), `app/api/feed/milestones/self/route.ts` | **Live** | **Reuse** — this is the whole answer to "[member] reached Level 7" (§2.9) |
| **`feed_activity` table + `log_feed_activity` RPC** | 4 call sites: `app/bb-feed/page.tsx:482`, `app/devotionals/[id]/page.tsx:1704`, `app/profile/[userId]/page.tsx:666`, `components/AppShell.tsx:2140`. Columns: `id, user_id, activity_type, activity_data, group_id, group_name, feed_post_id, is_public, created_at` | **Dormant.** **2 rows in the whole table**, both `post_type = post_created` | **Retire for this purpose** — `postMilestoneToWall` writes a real `feed_posts` row instead, which gets likes/comments/report/block for free. `lib/communityMilestones.ts` documents why at length |
| **Progress ring around a profile photo** | — | **Does not exist.** `grep` for `ProgressRing`, `strokeDasharray`, `conic-gradient` near an avatar returns nothing; the only avatar-adjacent component is `components/LouisAvatar.tsx`. `STORE_PRICE_EXAMPLES.profileFrame = 300` is a price for a frame that was never built | **Build** (§2.4) — the only genuinely new visual in this proposal |
| **Premium skins / themes** | `profile_stats.active_premium_skin`, `app_theme`, `lib/appThemes.ts` (18 themes), `lib/premiumSkins.ts`; `skinId` is accepted and voided (`void _skinId`) by both `LevelBadge` and `UserBadge` | **Dormant-but-wired** | **Leave alone.** Do not couple rings to skins |

## 1.2 Surfaces where a user's name appears next to content

These are the places a level number has to coexist with a name. Each already
renders `member_badge` and/or reads `profile_stats`.

| Surface | File | Reads `current_level` today? | Renders a badge today? |
|---|---|---|---|
| In-app study comments (`article_comments`, keyed by chapter slug) | `components/comments/CommentSection.tsx` | **Yes** — selected at line 255, carried to line 277, and **never rendered** | No `<UserBadge` in this file |
| Devotional/day threads (`group_posts`) | `components/GroupPostThread.tsx` — live at `app/devotionals/[id]/page.tsx:2762` and `app/devotionals/[id]/day/[dayNumber]/page.tsx:1231` | No — selects only `display_name, username, profile_image_url, member_badge` (line 230) | Moderator styling only |
| Community feed (`feed_posts`, `feed_post_comments`) | `app/bb-feed/page.tsx` | No | `<UserBadge>` present |
| Own profile / other profiles | `app/profile/[userId]/page.tsx:1090`, `:1824`; `components/profile/ProfileSummaryCard.tsx:192` | Via API | `<UserBadge>` present |
| Messages list and thread | `app/messages/page.tsx:393`, `app/messages/[conversationId]/page.tsx`, `components/AppShell.tsx:3523` | No | `<UserBadge>` present |
| Dashboard group posts | `components/DashboardJourneyExperience.tsx:5641` | **Yes** — selected and unused for level display | `<UserBadge>` present |
| Admin comment moderation | `app/api/comments/admin/route.ts:518` → `userLevel` | **Yes**, returned to the admin UI | — |

**Finding:** the level number is already being fetched on the two busiest
comment surfaces and thrown away. Placing it is wiring, not plumbing.

## 1.3 `profile_stats` — the 94 columns, and which matter here

Read from the live table. The level-relevant ones:

| Column | Written by | Read by | Note |
|---|---|---|---|
| `current_level` | `app/api/points/summary/route.ts:80` (upsert, **only when the level rises or is first assigned**), `scripts/recompute-all-levels.ts`, `RESTORE_LEVEL_FLOOR_AFTER_XP_REBALANCE.sql` | 15+ call sites (admin, buddies dashboard, top-buddies, comments admin, devotionals community progress, group analytics) | The cache everything else trusts |
| `total_points` | `app/api/points/summary/route.ts:86` (best-effort `update`, error swallowed if the message mentions `total_points`) | Nothing in the app reads it | Write-only cache |
| `current_streak` | streak cron | points engine (`streakBonusPointsFor`), many UIs | 4,606 rows > 0, max 309 |
| `member_badge` | `app/api/admin/member-badge/route.ts` | `resolveUserBadge` everywhere | 29 rows set |
| `total_actions` | action recorder | admin | 1,028 rows > 0, max 1,070 |
| `chapters_completed_count` | action recorder | `/people-in-the-bible`, admin | 763 rows > 0, max 691 |
| `notes_created_count`, `people_learned_count`, `places_discovered_count`, `keywords_mastered_count`, `trivia_questions_answered` | action recorder | admin, top-buddies | Counters, not scored directly — the engine scores from `master_actions` |
| `level_floor_restored_at` | the migration above | nothing | Audit column |
| `diamonds_count`, `total_diamonds_earned`, `diamonds_backfilled_at` | retired currency | nothing live | Leave in place, stop writing |
| `level_1_skipped_date` | daily recommendation popup | daily recommendation popup | **Not a user level.** `ADD_LEVEL1_SKIPPED_DATE.sql` — this is the *recommendation tier* ("Level 1 recommendation"), unrelated. Easy to confuse; do not touch it |

**No new column is needed for a 20-level system.** `current_level` and
`total_points` already exist. One nullable column is proposed in §2.6 for
celebration idempotency.

## 1.4 The real numbers (read 10 November 2026)

```
profile_stats            6,630 rows
master_actions         204,299 rows   (110 distinct action_type values)
article_comments         1,312 rows
group_posts              2,114 rows
group_post_likes         3,007 rows
feed_posts                 971 rows
feed_post_comments          94 rows
feed_activity                2 rows
notifications           34,715 rows
bible_year_day_progress  6,106 rows
```

**`current_level` distribution, as stored today:**

```
L1  6,321      L7  17      L13  1
L2    142      L8   9      L14  1
L3     64      L9   2      L15  1
L4     21      L10  2      L16  2
L5     24      L11  7      L18  1
L6     14      L12  1
```

95.3% at Level 1. Nobody at L17, L19 or L20. The top of a 50-level ladder is
not merely unreached — it is unreachable: the highest derived score in the
database is 30,727 and Level 21 begins at 40,200.

**Derived points (recomputed in memory with the live engine over all 6,630
profiles, writing nothing):**

```
zero = 2        >0 = 6,628        max = 30,727
aggregate:  study 782,466   social 8,824   bonus 325
p25 = 25   p50 = 30   p75 = 35   p80 = 41   p85 = 60
p90 = 105  p95 = 191  p97 = 394  p99 = 1,563  p99.5 = 3,678  p99.9 = 11,964
```

The median account has **30 points**: 25 for `user_signup` plus 5 for one
`user_login`. That is the whole story of the funnel, and no curve can fix it —
but a curve where the first chapter read moves you off Level 1 is a different
experience from one where it does not.

**Users at or above each points threshold** (the raw material for the curve):

```
>=1    6,628      >=900     107      >=13,000   6
>=25   6,549      >=1,300    78      >=17,000   5
>=50   1,181      >=1,800    63      >=22,000   4
>=100    733      >=2,500    48      >=28,000   1
>=150    413      >=3,500    37      >=36,000   0
>=250    276      >=5,000    23
>=400    197      >=7,000    17
>=600    143      >=9,500    14
```

**Social points are a rounding error, which is worth saying plainly:** 8,824
social points against 782,466 study points — **1.1%**. The anti-abuse design
already works. Nobody is levelling up by posting.

## 1.5 What people actually do (`master_actions` by `action_type`, top 20)

```
landing_page_visited             26,910     chapter_opened/viewed etc.  ~11,000
user_login                       17,855     bible_in_one_year_reading_completed  3,812
dashboard_viewed                 15,063     bible_in_one_year_day_viewed  3,787
chapter_completed                14,346     study_notes_section_opened    3,733
trivia_question_answered         13,149     devotional_opened             2,774
trivia_question_correct           9,522     devotional_day_completed      2,208
study_notes_viewed                7,345     bible_in_one_year_day_completed 2,108
user_signup                       7,330     study_group_feed_viewed       1,989
landing_cta_clicked               5,924     scrambled_word_answered       1,942
trivia_started                    5,886     trivia_chapter_completed      1,625
```

Note `user_signup` = 7,330 and `profile_stats` = 6,630. **7,192 users have at
least one `master_actions` row but only 6,630 have a `profile_stats` row — 562
users have activity and no stats row at all.** That matters for the backfill
(§2.3).

## 1.6 Weighting gaps found by checking `ACTION_POINT_WEIGHTS` against the log

**Weighted, but zero rows ever logged** — dead weights:

- `devotional_day_started` (weight 5)
- `series_week_started` (weight 8)
- `bible_topic_lesson_completed` (weight 20)
- `badge_earned` (weight 0)

**Logged in volume, but weight 0** — real study that scores nothing:

| Action | Rows | Weight |
|---|---|---|
| `trivia_question_answered` | 13,149 | 0 (deliberate — only `trivia_question_correct` scores, which is right) |
| `trivia_started` | 5,886 | 0 (right) |
| `trivia_chapter_completed` | **1,625** | **0 — a finished trivia chapter earns nothing** |
| `chapter_notes_viewed` | 1,130 | 0 (right — `chapter_notes_reviewed` is the scoring one) |
| `scrambled_chapter_completed` | **608** | **0** |
| `referral_signup_reward` | 44 | 0 (right — not study) |

**Logged in volume and not in the weights table at all** — the worst one first:

| Action | Rows | Why it matters |
|---|---|---|
| **`bible_in_one_year_day_completed`** | **2,108** | **The finished-day event for Bible in One Year scores nothing.** The weighted key is `bible_in_one_year_reading_completed` (3,812 rows, 25 points). Both fire. The one the milestone poster treats as the completion (`COMMUNITY_MILESTONES` contains `bible_in_one_year_day_completed`) is the one the scorer ignores |
| `study_notes_viewed` | 7,345 | Opening study notes — arguably should score at a low cap |
| `louis_ai_message_sent` / `louis_user_message_sent` | 4,394 / 2,345 | Chat with Lil Louis. Should stay at 0 |
| `blog_post_viewed` | 1,005 | Public blog. Should stay at 0 |
| `landing_page_visited`, `dashboard_viewed`, `landing_cta_clicked`, `*_viewed`, `*_opened`, `upgrade_popup_*`, `install_banner_*` | ~60,000 combined | Navigation telemetry. Correctly unweighted — and this is the single best thing about the existing design: **you cannot earn a point by looking at a page** |

**61 of the 110 logged action types have no weight.** Almost all of that is
correct by design. Three are not: `bible_in_one_year_day_completed`,
`trivia_chapter_completed`, `scrambled_chapter_completed`.

## 1.7 Four defects in the existing machinery

These are verified from source, not inferred.

**D1 — The level-up celebration can be lost forever.**
`app/api/points/summary/route.ts` computes `leveledUp`, **writes the new
`current_level` to the database in the same request** (line 80), and returns
`leveledUp: true` to the client. If the client never shows the modal — the user
navigated away, the tab was backgrounded, the fetch resolved after unmount, the
app was killed — the level is already banked and `leveledUp` will be `false`
forever after. The celebration for that level never happens. There is no record
that it was owed.

**D2 — The celebration modal is not idempotent in the other direction either.**
`components/LevelProgressCard.tsx` sets `celebrating` from the API response. Two
tabs open on `/dashboard` both call the endpoint; whichever lands first banks
the level and the second sees `leveledUp: false`. That is accidentally correct
today, but it is luck, not design — there is no server-side "shown" record.

**D3 — One user's points are silently truncated.**
`MAX_ACTION_ROWS = 30000` in `app/api/points/summary/route.ts`. Actions per
user: p50 = 4, p90 = 22, p99 = 315, **max = 33,120**. One account exceeds the
cap, so its score is computed from the oldest 30,000 actions and the rest are
dropped without a warning.

**D4 — The full recompute misses 562 users.**
`scripts/recompute-all-levels.ts` iterates `profile_stats` rows. 7,192 users
have `master_actions` rows; 6,630 have `profile_stats` rows. The 562 with
activity and no stats row are never scored and never get a level.

**And one non-defect worth recording:** `components/ModalShell.tsx` already uses
`createPortal`, so any modal built on it escapes the dashboard pager's
`transform` by construction. The current celebration modal in
`LevelProgressCard.tsx` is a raw `fixed inset-0` div — it works today only
because `HomeScreen` is mounted at `/dashboard` and `/home` as its own route,
outside `DashboardJourneyExperience`'s transformed track. It would break the
moment it moved. **Inferred, not tested:** I did not render it inside the pager
to confirm the breakage; the conclusion comes from the transform containing
block and from this project's own prior experience of it.

---

# Part 2 — The proposal

## 2.1 The 20-level table

**Names, `identityText` and `encouragementText` are the existing
`LEGACY_LEVEL_DEFINITIONS` from `lib/levelSystem.ts`, unchanged.** Only the
thresholds move. Levels 21–50 go away: `LEVEL_MIN_POINTS` and `LEVEL_NAMES` cut
from 50 entries to 20, and `LEGACY_LEVEL_DEFINITIONS` becomes
`LEVEL_DEFINITIONS` directly — the `Math.min(index, …)` filler mapping is
deleted.

| Lv | Name | Points | Gap | Roughly what it takes | Users there today |
|---:|---|---:|---:|---|---:|
| 1 | Seeker | 0 | — | Signing up | 5,447 |
| 2 | Explorer | 50 | 50 | **One chapter read** (signup 25 + login 5 + chapter 25 = 55) | 768 |
| 3 | Listener | 150 | 100 | A first week of light study | 163 |
| 4 | Reader | 300 | 150 | ~2 weeks | 26 |
| 5 | Learner | 500 | 200 | ~1 month light, or 1 week daily | 27 |
| 6 | Follower | 800 | 300 | ~6 weeks | 33 |
| 7 | Disciple | 1,200 | 400 | ~2 months | 17 |
| 8 | Rooted | 1,700 | 500 | ~10 weeks | 13 |
| 9 | Grounded | 2,300 | 600 | ~3 months | 11 |
| 10 | Steady | 3,100 | 800 | ~4 months | 10 |
| 11 | Faithful | 4,100 | 1,000 | ~5 months | 9 |
| 12 | Equipped | 5,400 | 1,300 | ~6 months | 6 |
| 13 | Watchful | 7,000 | 1,600 | ~8 months | 3 |
| 14 | Devoted | 9,000 | 2,000 | ~10 months | 1 |
| 15 | Servant | 11,500 | 2,500 | **~1 year of daily study** | 1 |
| 16 | Builder | 14,500 | 3,000 | ~15 months | 1 |
| 17 | Teacher | 18,000 | 3,500 | ~18 months | 1 |
| 18 | Shepherd | 22,000 | 4,000 | ~2 years | 3 |
| 19 | Watchman | 26,000 | 4,000 | | 1 |
| 20 | Ambassador | 30,000 | 4,000 | **≈ the whole Bible once through** | 1 |

The "users there today" column is **interpolated from the threshold counts in
§1.4**, not read per-level; the thresholds themselves were read. The exact
per-level histogram comes out of the dry-run backfill (§2.3) before anything
ships.

**Why this curve.** Three anchors, in order of importance.

1. **Level 2 must be the first real study session.** `chapter_completed` is
   worth 25 and `user_signup` is 25. A threshold of 50 means *the first chapter
   you read moves you off Level 1*. The current threshold is 250, which is ten
   chapters, and the result is the 95.3% figure. This single number is the most
   consequential decision in the table.
2. **Level 20 is a Bible's worth of study.** The Bible has 1,189 chapters; at 25
   points a chapter that is 29,725 points. 30,000 is that, rounded. A full
   Bible-in-One-Year run (365 days × 65 points for reading + trivia +
   reflection) is 23,725 — Level 19. So the top of the ladder means something
   specific and true rather than being a big number.
3. **The gap grows, then flattens.** 50 → 4,000 over the first fifteen levels,
   then a flat 4,000 for the last five. Early levels should arrive in days so
   the system is visible at all; late levels should take months; but a gap that
   keeps doubling makes the top asymptotic and insulting. A flat top band means
   L18 → L19 → L20 each cost about two months of daily study, which is a finish
   line rather than a horizon.

**What this does to the population on day one:** 1,181 users (17.8%) above
Level 1, against 309 (4.7%) today — a 3.8× increase, from re-cutting the curve
alone, with nobody gaining a point they had not already earned.

**What it does not fix:** 5,447 accounts stay at Level 1 because the median
account has 30 points and has done four things ever. That is a funnel fact, not
a curve fact, and the proposal does not pretend otherwise.

## 2.2 How points are earned

**The engine is `lib/pointsEngine.ts` and it does not change.** What follows is
the weight table plus the six corrections from §1.6. Every rule in the
"anti-abuse" column is already implemented — the column says which mechanism
catches it.

### Scores — Bible reading

| Action | `action_type` | Points | Anti-abuse |
|---|---|---:|---|
| Read a Bible chapter | `chapter_completed` | 25 | `UNIQUE_PER_LABEL` — **once per chapter, ever.** Re-reading Genesis 3 never scores twice |
| Finish a book of the Bible | `book_completed` | 250 | `UNIQUE_PER_LABEL` — once per book |
| Reading-plan chapter | `reading_plan_chapter_completed` | 25 | `UNIQUE_PER_LABEL` |
| Review a chapter's study notes | `chapter_notes_reviewed` | 10 | `UNIQUE_PER_LABEL` — once per chapter |
| Open study notes | `chapter_notes_viewed` | 0 | Unscored. Looking is not studying |

### Scores — plans and devotionals

| Action | `action_type` | Points | Anti-abuse |
|---|---|---:|---|
| Bible in One Year — reading | `bible_in_one_year_reading_completed` | 25 | `UNIQUE_PER_LABEL` — once per day number |
| Bible in One Year — trivia | `bible_in_one_year_trivia_completed` | 20 | `UNIQUE_PER_LABEL` |
| Bible in One Year — reflection | `bible_in_one_year_reflection_completed` | 20 | `UNIQUE_PER_LABEL` |
| **Bible in One Year — day complete** | **`bible_in_one_year_day_completed`** | **0 — keep at 0, but deliberately** | **Fix for §1.6.** Do *not* add a weight: the three parts above already pay 65 for a full day, and weighting the wrapper event would double-pay. Instead **add the key to `ACTION_POINT_WEIGHTS` with an explicit `0` and a comment**, so the next person does not read the gap as an oversight |
| Open a day | `bible_in_one_year_day_viewed` | 3 | `DAILY_CAPS` = 3/day |
| Devotional day complete | `devotional_day_completed` | 10 | `UNIQUE_PER_LABEL` |
| Devotional reflection saved | `devotional_reflection_saved` | 15 | `UNIQUE_PER_LABEL` |
| Open a devotional day | `devotional_day_viewed` | 1 | `DAILY_CAPS` = 5/day |

### Scores — games and discovery

| Action | `action_type` | Points | Anti-abuse |
|---|---|---:|---|
| Trivia answer correct | `trivia_question_correct` | 5 | `DAILY_CAPS` = 10/day → **50/day ceiling** |
| **Trivia chapter complete** | **`trivia_chapter_completed`** | **15 (new)** | **Fix.** `UNIQUE_PER_LABEL` — once per chapter. 1,625 finished trivia chapters currently pay nothing |
| Scrambled word answered | `scrambled_word_answered` | 5 | `DAILY_CAPS` = 10/day |
| **Scrambled chapter complete** | **`scrambled_chapter_completed`** | **10 (new)** | **Fix.** `UNIQUE_PER_LABEL` — once per chapter |
| Person / place / keyword learned | `person_learned`, `place_discovered`, `keyword_mastered` | 6 each | `UNIQUE_PER_LABEL` — once per person/place/word |
| Person / place / keyword viewed | `*_viewed` | 1 each | `DAILY_CAPS` = 10/day |
| Verse highlighted | `verse_highlighted` | 2 | `DAILY_CAPS` = 10/day |
| Verse of the Day understood | `understand_verse_of_the_day` | 3 | `DAILY_CAPS` = 1/day |
| Note written | `note_created` | 7 | `DAILY_CAPS` = 5/day |
| Note started | `note_started` | 1 | `DAILY_CAPS` = 5/day |

### Scores — showing up

| Action | Points | Anti-abuse |
|---|---:|---|
| Signup | 25 | `UNIQUE_PER_LABEL` — once |
| Daily login | 5 | `DAILY_CAPS` = 1/day |
| Streak bonus | +5 per full week of current streak, **capped at +50** | `streakBonusPointsFor`. Derived from `current_streak`, never accumulated |

### Social — capped to irrelevance, by design

| Action | Points | Daily cap |
|---|---:|---|
| Community post created | 5 | 3/day (`SOCIAL_DAILY_CAPS.groupPosts`) |
| Comment on a post | 3–4 | 5/day |
| Like given | 1–2 | 10/day |
| Like received | 2 | 20/day |

**Maximum social contribution is about 90 points a day against a realistic
study day of 70–140**, and in practice social is **1.1% of all points earned**
(§1.4). Three rules keep comment-spam pointless:

- **Comments are capped at 5/day.** Writing 200 comments earns the same as
  writing 5.
- **Replies are capped separately at 5/day** (`feed_post_replied`).
- **A deleted post keeps its points.** This is the current behaviour and I
  propose keeping it, because the alternative is worse: scoring from
  `master_actions` means the action row survives the content row, so points are
  stable and un-gameable by delete-and-repost. The anti-abuse here is the daily
  cap, not deletion accounting. **Recommended addition:** moderator-deleted
  content should subtract, via a `manualBonusPoints` negative —
  `calculateWeightedPoints` already accepts `manualBonusPoints` and nothing
  passes it. That hook exists and is unused.

### Three things that can never earn a point, and must stay that way

1. **Money.** The app is free and there is no paid tier. `is_paid` and
   `pro_expires_at` feed `resolveUserBadge` only; they appear nowhere in
   `ACTION_POINT_WEIGHTS`. Keep it that way: an acceptance test should assert
   that no payment-derived field reaches the points engine.
2. **Navigation.** 60,000-odd `*_viewed` / `*_opened` / `landing_*` rows are
   unweighted. Opening a page must never pay.
3. **Talking to Lil Louis.** `louis_ai_message_sent` (4,394 rows) is unweighted
   and should stay so — it costs real OpenAI money per call, and paying points
   for it would be paying users to spend Louis's money.

## 2.3 Backfill: nobody starts at Level 1

**The mechanism already exists and is already floor-protected.**
`getLevelInfoWithLevelFloor(totalPoints, storedLevel)` in `lib/levelSystem.ts`
treats the stored level as a floor: a recompute can raise a level and can never
lower one. `scripts/recompute-all-levels.ts` only writes when
`(profile.current_level ?? 0) < levelInfo.level`.

**How a level is derived from history:** the full `master_actions` log for the
user (every row, oldest first), scored by `computePointsFromActivity` with the
existing dedupe and daily caps applied retroactively, plus the streak bonus from
`profile_stats.current_streak`, then mapped through the new 20-level thresholds.
No history is re-interpreted; the same rows that score today score then.

**The backfill, in order:**

1. **Change the thresholds only** — `LEVEL_MIN_POINTS` to the 20 values in §2.1,
   `LEVEL_NAMES` to 20 entries, and the three weight fixes from §2.2. No DB
   change.
2. **Dry run.** `npx tsx scripts/recompute-all-levels.ts --dry`. It already
   prints the full level histogram and the would-update count, and writes
   nothing. **This is the number to look at before anything ships** — it
   replaces the interpolated column in §2.1 with the real one.
3. **Fix D4 first** (§1.7): the script iterates `profile_stats`, so the 562
   users with activity and no stats row get nothing. Change the driver to the
   distinct `user_id` set from `master_actions`, and `upsert` on `user_id`
   instead of `update`. Without this, 562 real users stay unlevelled.
4. **Fix D3**: raise or remove `MAX_ACTION_ROWS = 30000`. Max actions for one
   user is 33,120. Paging is already correct; the cap is the only problem.
5. **Live run.** `npx tsx scripts/recompute-all-levels.ts`. Levels can only rise.
6. **Spot-check the 21 `founder_buddy` accounts and Louis** before and after —
   Louis is `current_level` 18 and has the highest derived score (30,727), so he
   should land at Level 20 under the new curve. If he does not, the curve is
   wrong, not his history.

**PostgREST paging is already handled correctly and must stay that way.** Every
response is capped at 1,000 rows regardless of key. `scripts/recompute-all-levels.ts`
has a `fetchAll` helper that pages by `.range(from, from + 999)` and stops when a
page comes back short; `app/api/points/summary/route.ts` has the same loop. The
backfill reads 204,299 action rows, so it issues **~205 paged requests** for
`master_actions` plus 3 for posts, 4 for likes and 7 for profiles — about 220
requests for the whole run, once. Note the two `.limit(5000)` calls in
`app/api/points/summary/route.ts:52–53` for `group_posts` and
`group_post_likes`: those are **silently capped at 1,000 by PostgREST**, not
5,000. With 2,114 and 3,007 total rows across all users it affects nobody today,
but the limit is a lie and should be a paged read or an honest `.limit(1000)`.

**Errors must be checked, not caught.** `supabase-js` does not throw on a
dropped connection — it resolves with `{ data: null, error }`. Every page read in
the backfill must test `error` and abort the run rather than treating a short
page as the end of the table. `fetchAll` already does this (`if (error) throw`).
A backfill that silently reads half the log would assign real users real levels
from half their history.

## 2.4 The 20 rings

**This is the only new visual.** No ring component exists today (§1.1).

### The design, in one sentence

A level is **a coloured ring around the profile photo, in one of five colour
families of four steps each, with the ring's geometry marking the step within
the family, and the existing `LevelBadge` "L7" chip always present.** Colour is
never the only signal.

### Why five families of four and not twenty colours

Twenty hues cannot be told apart on a 32px avatar, and twenty colours cannot
each be 3:1 distinct from their neighbours — I measured it: **the best
within-family separation I could reach while keeping every colour legible is
1.13–1.70:1**, far below the 3:1 that WCAG 1.4.11 asks of a graphical object
against an *adjacent colour*. So the ring carries **tier** in colour (five
families, which *are* distinguishable) and **step** in shape. The precise level
number is carried by the chip, which is text.

Each family maps to something already in Bible Buddy's palette:

| Tier | Levels | Family | Taken from |
|---|---|---|---|
| I | 1–4 | **Stone** (slate) | `--bb-text-muted` / `--bb-card-border` greys |
| II | 5–8 | **Water** (blue) | `--bb-accent` default `#2f7fe8`, the app's own blue |
| III | 9–12 | **Olive** (green-teal) | the Green theme family in `lib/appThemes.ts` |
| IV | 13–16 | **Lamp** (amber) | the Gold theme family; also the Founder Buddy amber |
| V | 17–20 | **Crown** (violet) | `#6d5bd0`, the colour `LevelProgressCard` already uses for levels |

### The 20 specs

Two hexes per level — one for light themes (`card: #FFFFFF`, which is 16 of the
18 themes in `lib/appThemes.ts`) and one for the Dark theme
(`card: #0F1C2B`). **Contrast ratios below are computed, not estimated:** WCAG
2.x relative luminance, ring colour against the card it sits on.

| Lv | Name | Light hex | vs `#FFFFFF` | Dark hex | vs `#0F1C2B` | Ring geometry |
|---:|---|---|---:|---|---:|---|
| 1 | Seeker | `#7C8CA3` | 3.42 | `#94A3B8` | 6.71 | 2px, solid |
| 2 | Explorer | `#64748B` | 4.76 | `#A8B4C4` | 8.18 | 3px, solid |
| 3 | Listener | `#475569` | 7.58 | `#C0CAD8` | 10.38 | 3px, solid + 1px inner hairline |
| 4 | Reader | `#334155` | 10.35 | `#D6DEE8` | 12.67 | 3px, solid + 1px inner hairline + top cap notch |
| 5 | Learner | `#4E93EC` | 3.13 | `#60A5FA` | 6.76 | 2px, solid |
| 6 | Follower | `#2F7FE8` | 3.95 | `#7FB4F5` | 7.98 | 3px, solid |
| 7 | Disciple | `#1D4ED8` | 6.70 | `#A5C8FA` | 10.02 | 3px + hairline |
| 8 | Rooted | `#1E3A8A` | 10.36 | `#C3DAFC` | 12.08 | 3px + hairline + notch |
| 9 | Grounded | `#19A67A` | 3.10 | `#2DB88A` | 6.82 | 2px, solid |
| 10 | Steady | `#0D8A66` | 4.33 | `#4ECCA3` | 8.59 | 3px, solid |
| 11 | Faithful | `#0F766E` | 5.47 | `#7BDCBC` | 10.49 | 3px + hairline |
| 12 | Equipped | `#115E4A` | 7.71 | `#A8E9D4` | 12.50 | 3px + hairline + notch |
| 13 | Watchful | `#C08A08` | 3.05 | `#E0A82E` | 8.03 | 2px, solid |
| 14 | Devoted | `#B45309` | 5.02 | `#EFBF55` | 10.03 | 3px, solid |
| 15 | Servant | `#8A3E05` | 7.58 | `#F3CE7D` | 11.41 | 3px + hairline |
| 16 | Builder | `#62280A` | 11.49 | `#F7DEA6` | 13.06 | 3px + hairline + notch |
| 17 | Teacher | `#8B6DF0` | 3.79 | `#A78BFA` | 6.32 | 2px, solid |
| 18 | Shepherd | `#6D5BD0` | 5.18 | `#B9A8FB` | 8.23 | 3px, solid |
| 19 | Watchman | `#5B3FC4` | 7.11 | `#CBBEFC` | 10.08 | 3px + hairline |
| 20 | Ambassador | `#4C1D95` | 10.95 | `#DCD3FD` | 12.10 | 3px + hairline + **full double ring** |

**Minimum ratio across all 20: 3.05 against the light card, 6.32 against the
dark card.** Both clear the 3:1 that WCAG 2.2 success criterion 1.4.11
(Non-text Contrast) requires of a meaningful graphical object. Verified by
computing relative luminance for every pair; the figures above are the output,
not a guess.

### What a colour-blind reader sees

This is the test the design has to pass, so it is stated concretely rather than
asserted.

- **Deuteranopia and protanopia (red-green, ~8% of men).** Tier III (olive) and
  Tier IV (lamp) are the collision: green and amber are exactly the pair that
  merges. A reader with deuteranopia sees Tier III and Tier IV as two sets of
  similar yellow-browns. **They are still told apart**, by three things that do
  not depend on hue: the **lightness ladder** (every tier runs light → dark, and
  the ratios above are luminance ratios, which red-green blindness does not
  affect), the **geometry step** (2px → 3px → hairline → notch), and the **"L13"
  chip**, which is text.
- **Tritanopia (blue-yellow, rare).** Tier II (water) and Tier IV (lamp) merge.
  Same three fallbacks.
- **Achromatopsia (total, very rare).** Every colour signal is gone. The reader
  sees twenty rings in a lightness ladder that repeats five times, plus the
  chip. **The chip is what carries the level**, which is why it is
  non-negotiable.

**The rule that follows: the ring is never the only indicator.** `LevelBadge`
ships wherever the ring ships. Every ring also carries
`aria-label="Level 13 — Watchful"` and `title` with the same text, and the ring
itself is `aria-hidden` where the chip beside it already announces the level, so
a screen reader hears it once.

### Where the ring is drawn

An SVG `<circle>` with `strokeDasharray`, not a `conic-gradient` — a gradient
cannot do the hairline or the notch, and SVG strokes scale cleanly from 24px to
96px. One new component, `components/LevelRing.tsx`, taking
`{ level, size, children }` and wrapping whatever avatar is passed in. **Also
worth doing:** the ring's *filled arc* can show progress to the next level
(`progressPercent` is already returned by `/api/points/summary`), with the
remainder of the circle in the same hue at 20% opacity. That makes the ring do
two jobs with one shape.

## 2.5 Placement

| Surface | What goes there | Cost |
|---|---|---|
| **Dashboard** (`components/HomeScreen.tsx:362`) | `LevelProgressCard` as today, plus the ring around the user's own avatar in the header and the level **name** beside the number — "Level 7 · Disciple" rather than "Level 7" | One `/api/points/summary` call, which already happens |
| **Own profile** (`components/profile/ProfileSummaryCard.tsx:192`) | Ring around the profile photo, level name + number, progress to next, and the `identityText` line. This is the one place the whole ladder should be browsable | Already fetches profile |
| **Other profiles** (`app/profile/[userId]/page.tsx:1090`) | Ring + `LevelBadge` beside the name, next to the existing `UserBadge` | Already fetches `current_level` |
| **In-app study comments** (`components/comments/CommentSection.tsx`) | `<LevelBadge currentLevel={comment.current_level} />` beside the name. **`current_level` is already selected at line 255 and carried to line 277** — this is a render, not a query | **Zero extra reads** |
| **Dashboard group posts** (`components/DashboardJourneyExperience.tsx:5641`) | Same. `current_level` already in the select | **Zero extra reads** |
| **Devotional threads** (`components/GroupPostThread.tsx:230`) | Add `current_level` to the existing `profile_stats` select, then `LevelBadge` | One extra column on a query that already runs |
| **Community feed** (`app/bb-feed/page.tsx:813`) | Add `current_level` to the existing `profile_stats` select, then `LevelBadge` + small ring on the post avatar | One extra column |
| **Messages** (`app/messages/page.tsx:393`, `components/AppShell.tsx:3523`) | `LevelBadge` only, no ring — these rows are dense and already carry a badge and a streak flame | One extra column |
| **Top Buddies** (`app/api/groups/[groupId]/top-buddies/route.ts`) | Already returns `currentLevel`. Render the ring | Zero |

**Ordering beside a name, everywhere, left to right:** avatar (with ring) →
display name → `UserBadge` (Founder Buddy, Teacher, Moderator…) → `LevelBadge`
("L7"). **The identity badge always comes before the level number.** See §2.7.

## 2.6 The level-up celebration

**Extend `components/LevelProgressCard.tsx`. Do not build a second modal.**

### What it shows

Level number and name ("Level 7 — Disciple"), the **new ring drawn large** with
the old ring crossfading out beneath it, the existing `identityText` and
`encouragementText` (already written for all 20 levels), the progress bar reset
to the start of the new level with "X points to Shepherd", and — if anything was
unlocked at that level (§2.8) — one line naming it. One button, "Keep going".

### The two traps, addressed

**Trap 1 — the pager transform.** Rebuild the modal on
`components/ModalShell.tsx`, which already uses `createPortal` to render into
`document.body`. The current raw `fixed inset-0` div works only because
`HomeScreen` is its own route, outside `DashboardJourneyExperience`'s
transformed track. Using `ModalShell` makes that accident unnecessary and lets
the popup be triggered from anywhere later — including inside the pager, where
a `position: fixed` element inside a `transform` containing block renders
thousands of pixels off-screen.

**Trap 2 — polling.** **The popup adds no polling and no new request.** It
triggers off the `/api/points/summary` response that `LevelProgressCard`
*already* fetches once per `HomeScreen` mount. Concretely, per dashboard page
load:

- 1 call to `/api/points/summary`
- which issues: **1** paged `master_actions` read for the median user (p50 = 4
  actions, p90 = 22, p99 = 315 — all one page), plus 1 `group_posts`, 1
  `group_post_likes`, 1 `profile_stats` = **4 database requests**
- **23 users of 7,192 have more than 1,000 actions** and cost one extra read per
  1,000; 10 users exceed 2,000. The worst account (33,120 actions) costs 34
  reads — once per dashboard load, for one person.

That is the whole budget. For comparison, the October outages came from an 8s
`setInterval` in `AppShell` generating ~147k requests a day from ~25 open tabs.
**Nothing in this proposal introduces an interval, a `setInterval`, a
`setTimeout` loop, or a realtime subscription.** The level is computed when the
dashboard is opened and at no other time. An acceptance test should assert that
(§2.10).

### Accessibility

- The ring crossfade, the number count-up and the confetti are all wrapped in
  `@media (prefers-reduced-motion: reduce)` → no transition, final state
  immediately. `prefers-reduced-motion` is already handled in `app/globals.css`,
  `components/AppShell.tsx`, `components/BottomNav.tsx`,
  `components/DevotionalDayCompletionModal.tsx` and four other files — follow
  that existing idiom rather than inventing one.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the
  heading. Focus moves to the dialog on open and returns to the trigger on
  close. `Escape` closes. `ModalShell` already does the scroll lock.
- Nothing is announced by colour alone: the heading reads "Level 7 — Disciple".

### Dismiss, replay and idempotency

This fixes **D1** and **D2** from §1.7, which is the most important part of this
section.

**The defect:** today the server banks the new `current_level` *and* returns
`leveledUp: true` in the same request. If the modal never renders, the
celebration is lost forever and there is no record that it was owed.

**The fix — one nullable column, no new table:**

```
alter table public.profile_stats
  add column if not exists level_celebrated integer;
```

- The server writes `current_level` as it does now, and **does not** write
  `level_celebrated`.
- `leveledUp` becomes `current_level > coalesce(level_celebrated, 0)` — a
  question about durable state, not about what happened in this request. A level
  that was never celebrated stays owed across reloads, devices, app restarts and
  server retries.
- The **client** acknowledges: on dismiss, `POST /api/points/celebrated` with
  the level it showed, which sets `level_celebrated = greatest(coalesce(level_celebrated, 0), :level)`.
  `greatest` makes the write idempotent — a retry, a double-tap or two tabs
  racing all land on the same value.
- **Two tabs:** both see `leveledUp: true` and both show it. Whichever is
  dismissed first acknowledges; the other's acknowledgement is a no-op. Showing
  the same good news twice is a far better failure than never showing it.
- **Skipping levels:** a user who jumps L4 → L7 in one recompute sees **one**
  popup for L7, naming L7, and `level_celebrated` goes to 7. Three modals in a
  row is a worse experience than one.
- **Replay:** the level ladder lives on the profile page (§2.5) and is always
  browsable. A "see it again" control is not needed; `level_celebrated` is also
  the mechanism that could allow one if Louis wants it later.
- **Backfill interaction:** the §2.3 recompute will raise thousands of levels at
  once. Set `level_celebrated = current_level` **for every existing row as part
  of the backfill**, so nobody is greeted by a popup for a level they were
  silently given. First celebration is for the first level earned *after* the
  system ships. This is one `update` and it is not optional.

## 2.7 Founder treatment

**Founder Buddy is an identity. A level is a measurement. They are different
things and must never compete.** 21 accounts carry `member_badge = 'founder_buddy'`.

**In the data: nothing changes.** `profile_stats.member_badge` stays exactly as
it is, `resolveUserBadge` in `lib/userBadges.ts` is not touched, and
`current_level` is a separate column that already coexists with it. There is no
migration, no merge, no precedence table to write. A founder's level rises and
falls with their study like anyone's; their badge does not move.

**In the UI, three rules:**

1. **Founder Buddy renders first and keeps its own styling.** Order beside a
   name is always: avatar → name → `UserBadge` → `LevelBadge`. The amber
   ⭐ Founder Buddy pill appears before the level chip, at its current size and
   colour. A founder at Level 3 shows **⭐ Founder Buddy · L3**, in that order,
   and the badge is the visually dominant element.
2. **The ring is a founder's level ring, not a founder ring.** Giving founders a
   distinct ring colour would replace their identity with a cosmetic and make
   their ring lie about their study. They get the ring their level earns.
3. **One exception, and only one.** The Tier IV amber family (L13–16) is the same
   hue as the Founder Buddy pill. Where a founder is at L13–16, the ring and the
   pill will read as one amber object. The ring's **inner hairline uses the card
   colour** rather than a tint, which separates the two shapes. Cheap, and it
   keeps the pill reading as a pill.

**What must not happen:** no founder-only level, no level that outranks the
badge, no replacing the badge with a level chip at high levels, and no "Founder"
appearing in `LEVEL_NAMES`. The 20 names stay as they are.

## 2.8 Rewards that are not pay-to-win

Graded honestly. The app is free, there is no paid tier, and nothing below costs
money or can be bought.

**Feasible now, cheap:**

| Level | Reward | Why it is feasible |
|---|---|---|
| 2 | The ring appears at all, and the level ladder unlocks on the profile | Pure UI |
| 3 | **Themes** — `lib/appThemes.ts` has 18 themes and `profile_stats.app_theme` already stores the choice. Gate a handful behind levels | Built, dormant. `STORE_PRICE_EXAMPLES.theme = 200` is a price for a store that does not exist; a level gate is better than a price |
| 5 | **Streak flames** — `selected_streak_flame` and `components/StreakFlameBadge.tsx` exist | Built |
| 7 | **Buddy avatars** — `selected_buddy_avatar` exists | Built |
| 10 | Level name shown in full beside the name everywhere ("Disciple") rather than just "L10" | One conditional |
| 12 | **Premium skins** — `active_premium_skin` and `lib/premiumSkins.ts` exist and are dormant | Built |

**Feasible, needs real work:**

| Level | Reward | Honest cost |
|---|---|---|
| 8 | **A named place on a study leaderboard.** `app/api/groups/[groupId]/top-buddies/route.ts` already computes and ranks this | A page, not an engine |
| 15 | **Comment flair** — a one-line self-description under the name in study comments | A `profile_stats` column and a render; moderation burden is the real cost |
| 20 | **A real certificate** — a generated, downloadable "read the Bible" page with the date | Doable; a PDF route and a design |

**Not feasible, or a bad idea — said plainly:**

- **Anything that gates Bible content behind a level.** The study notes are the
  app. Locking Leviticus behind Level 6 would be the single worst thing this
  system could do.
- **Moderator powers by level.** Moderation is trust, not points.
  `member_badge = 'moderator'` is assigned by hand and should stay that way.
- **A points store.** The diamond currency was already built and retired
  (`DIAMOND_REWARDS` is all zeroes, §1.1). Rebuilding it would be re-walking a
  road this project already turned back from.
- **Early access to new features by level.** Tempting and wrong: it makes the
  level a queue position, and the people who would benefit most from a new
  feature are the ones with the lowest levels.

**The honest summary:** the valuable reward here is not an unlock. It is that a
number beside your name goes up because you read your Bible, and other people
can see it. Six of the eight feasible rewards above are dormant features that
already exist and need a reason to be switched on — which is the best argument
for this whole piece of work.

## 2.9 Feed activity — "[member] reached Level 7"

**Reuse `lib/communityMilestones.ts` exactly.** It already solves every problem
this requirement raises, and its source comments record why each decision was
made. Do not build a second announcer.

### How

Add one entry to `COMMUNITY_MILESTONES` and one branch to `milestoneSentence`:

```
"🎖️ Reached Level 7 — Disciple."
```

and the matching pattern in `STUDY_ACTIVITY_SHAPES` so `readStudyActivity`
recognises it and the feed renders it as a milestone card rather than a
"Thought". The existing comment in that file — *"These live next to
milestoneSentence on purpose: change one, change both"* — is the instruction.

`postMilestoneToWall` then writes a real `feed_posts` row under the member's own
name, which means the announcement gets likes, a comment thread, report and
block, and a place on the author's own wall, for free. This is why the dormant
`feed_activity` table (2 rows) is the wrong home: an activity row cannot be
commented on.

### Anti-spam, already built

- **`MAX_MILESTONE_POSTS_PER_DAY = 2`** — at most two automatic posts per person
  per day, across all milestone types.
- **Said once, ever.** `postMilestoneToWall` reads the member's last 200
  `feed_posts` and skips when the exact `content` already appears. Since the
  sentence contains the level number, **"Reached Level 7" can be posted exactly
  once** — that is the idempotency, and it comes for free from the existing
  dedupe.
- **Only milestone levels.** Twenty announcements per member over two years
  would be noise. Announce **Levels 5, 10, 15 and 20 only** — four posts per
  member for a complete journey. The curve makes this natural: those are the
  week, the quarter, the year and the Bible.
- **Never throws.** The function returns `{ posted, reason }` and swallows
  everything. A failed announcement cannot affect the level, which was banked
  long before.

### Aggregation

The `*/15 * * * *` cron (`app/api/cron/community-milestones/route.ts`) already
batches: it reads recent completions and posts up to the per-person cap. A
level-up found in the same sweep as a book completion is subject to the same cap
of 2, so a member who finishes a book and hits Level 10 in one evening gets two
posts, not two plus. **No new aggregation logic is needed.**

### Privacy and opt-out

This is the one genuine gap. `postMilestoneToWall` has **no opt-out check** —
it posts for anyone who hits a milestone. That is a pre-existing condition of
the current milestone feature, not something levels introduce, but levels make
it more visible because a level is about the person rather than about a chapter.

**Proposal:** one nullable column,
`profile_stats.milestone_posts_enabled boolean` (null and true both meaning
enabled, so existing behaviour is unchanged and no backfill is needed), checked
once at the top of `postMilestoneToWall`, with a toggle in
`app/settings/page.tsx` reading *"Share my study milestones with the
community"*. It covers level-ups and the three existing milestone types
together, because a member who does not want their reading announced does not
want their level announced either. **This should ship with the level
announcement, not after it.**

## 2.10 Migration, cost, tests, phases

### Database changes — two nullable columns, no new table

```sql
-- Celebration idempotency (§2.6). Nullable; existing rows are backfilled
-- to current_level so nobody is greeted for a level they were given.
alter table public.profile_stats
  add column if not exists level_celebrated integer;

-- Milestone opt-out (§2.9). Null and true both mean enabled, so no backfill.
alter table public.profile_stats
  add column if not exists milestone_posts_enabled boolean;
```

That is all. `current_level` and `total_points` already exist; `master_actions`
is already the source of truth; `LEVEL_DEFINITIONS` is code, not data, so
re-cutting the curve is a code change that re-scores everyone on the next
recompute — which is exactly what the header comment in `lib/progressionRewards.ts`
promises ("no stored balances to drift").

### API changes

| Route | Change |
|---|---|
| `app/api/points/summary/route.ts` | `leveledUp` from `level_celebrated`, not from the stored level (D1/D2). Raise/remove `MAX_ACTION_ROWS` (D3). Page `group_posts`/`group_post_likes` instead of the misleading `.limit(5000)`. Return `levelName` for the next level too |
| `app/api/points/celebrated/route.ts` | **New.** `POST { level }` → `level_celebrated = greatest(coalesce(level_celebrated,0), level)`. Idempotent. One write, no read |
| `app/api/cron/community-milestones/route.ts` | Respects `milestone_posts_enabled`; handles the new level milestone type |
| Comment/feed/thread selects | Add `current_level` where it is missing (§2.5) |

### Cost and read volume

- **Per dashboard load:** 4 database requests (unchanged from today — the
  endpoint already runs). 23 of 7,192 users cost one extra read per extra 1,000
  actions; the worst costs 34.
- **Per comment thread / feed page:** **zero extra requests.** Every level
  number comes from a `profile_stats` select that already runs; two surfaces
  already select `current_level` and discard it.
- **No new interval, no new subscription, no new cron.** The level-up
  announcement rides the existing `*/15` milestone cron.
- **One-off backfill:** ~220 paged requests, run once from a terminal.
- **Vercel build cost:** this is a code change, so it costs one build. ~80% of
  the Vercel bill is Build CPU, which is the argument for shipping §2.1–§2.6 as
  **one** commit at a scheduled deploy rather than six.

### Acceptance tests — this repo's idiom

There is no Jest, Vitest or Playwright. The suite is offline
`scripts/verify-*.ts` run via `npm run verify:*`, asserting against source text
and `react-dom/server`, with no network. 19 such scripts exist. These follow
that idiom exactly.

| Script | npm script | Asserts |
|---|---|---|
| `scripts/verify-level-curve.ts` | `verify:level-curve` | `LEVEL_DEFINITIONS.length === 20`; `minPoints` strictly increasing; `LEVEL_DEFINITIONS[19].maxPoints === null`; every level has a non-empty `levelName`, `identityText`, `encouragementText`; `getLevelInfoFromPoints(0).level === 1`, `(49).level === 1`, `(50).level === 2`, `(30000).level === 20`; `progressPercent` within 0–100 for a sweep of inputs |
| `scripts/verify-level-floor.ts` | `verify:level-floor` | `getLevelInfoWithLevelFloor(0, 12).level === 12` — **nobody is ever demoted**. Sweep every level 1–20 with 0 points and assert the floor holds |
| `scripts/verify-points-not-payable.ts` | `verify:points-not-payable` | `ACTION_POINT_WEIGHTS` contains no key matching `/paid|pro|stripe|purchase|subscri|diamond|premium/i`; `lib/pointsEngine.ts` source contains no reference to `is_paid`, `pro_expires_at` or `membership_status`. **This is the pay-to-win guard and it should be the first test written** |
| `scripts/verify-points-anti-abuse.ts` | `verify:points-anti-abuse` | Synthetic rows through `computePointsFromActivity`: 500 `feed_post_commented` rows on one day score exactly `5 × weight`; the same `chapter_completed` label 50 times scores once; 100 `trivia_question_correct` on one day score 10; every `UNIQUE_PER_LABEL` member has a weight; every `DAILY_CAPS` member has a weight |
| `scripts/verify-level-no-polling.ts` | `verify:level-no-polling` | `components/LevelProgressCard.tsx` and `components/LevelRing.tsx` sources contain no `setInterval`, no `setTimeout(` inside a fetch path, and no `.channel(` / `realtime`. **The October-outage guard** |
| `scripts/verify-level-modal-portal.ts` | `verify:level-modal-portal` | `components/LevelProgressCard.tsx` imports and uses `ModalShell`; it contains no bare `fixed inset-0` backdrop. **The pager-transform guard** |
| `scripts/verify-level-ring-contrast.ts` | `verify:level-ring-contrast` | Computes WCAG relative luminance for all 20 light hexes against `#FFFFFF` and all 20 dark hexes against `#0F1C2B`; asserts **every ratio ≥ 3.0**; asserts 20 distinct hexes in each set; asserts each ring exports a non-empty `aria-label` containing both the number and the name |
| `scripts/verify-level-celebration-idempotent.ts` | `verify:level-celebration-idempotent` | `app/api/points/summary/route.ts` derives `leveledUp` from `level_celebrated`; `app/api/points/celebrated/route.ts` uses `greatest(`; neither route writes `level_celebrated` from the summary path |
| `scripts/verify-milestone-levels.ts` | `verify:milestone-levels` | `milestoneSentence` returns a non-null string for the level milestone and `readStudyActivity` round-trips it (parses back to the right title); announces only levels 5, 10, 15, 20; `MAX_MILESTONE_POSTS_PER_DAY` is still ≤ 2; `postMilestoneToWall` source checks `milestone_posts_enabled` |
| `scripts/verify-level-paging.ts` | `verify:level-paging` | No `.limit(` above 1000 in `app/api/points/summary/route.ts` or `scripts/recompute-all-levels.ts`; both page by `.range(`; every paged read tests `error` before using `data` (**`supabase-js` resolves with `{data:null,error}` rather than throwing**) |
| `scripts/verify-founder-order.ts` | `verify:founder-order` | Renders a comment row through `react-dom/server` with `member_badge='founder_buddy'` and `current_level=3`; asserts "Founder Buddy" appears **before** "L3" in the output; asserts `resolveUserBadge` is unchanged for all 7 badge keys |

### Phases

Each phase is independently shippable and leaves the app working. Estimates are
build time, not calendar.

| Phase | Work | Estimate | Deploy |
|---|---|---|---|
| **0** | Fix D3 and D4 in `scripts/recompute-all-levels.ts` and `points/summary`. Dry-run the backfill and read the real histogram | half a day | code only, untagged |
| **1** | Cut 50 → 20. New thresholds, three weight fixes, delete the diamond half of `progressionRewards.ts`. `verify:level-curve`, `verify:level-floor`, `verify:points-not-payable`, `verify:points-anti-abuse` | 1 day | untagged, scheduled build |
| **2** | Run the live backfill; set `level_celebrated = current_level` for all rows | 1 hour | script only, no build |
| **3** | `components/LevelRing.tsx` + the 20 specs. Place on dashboard and both profile surfaces. `verify:level-ring-contrast` | 1–2 days | untagged |
| **4** | `LevelBadge` on the five name surfaces (two are zero-query). `verify:founder-order` | half a day | untagged |
| **5** | Celebration popup: `ModalShell`, `level_celebrated`, the new `/api/points/celebrated` route, reduced-motion. `verify:level-celebration-idempotent`, `verify:level-no-polling`, `verify:level-modal-portal` | 1–2 days | untagged |
| **6** | Level milestones in the feed + `milestone_posts_enabled` opt-out and its settings toggle. `verify:milestone-levels` | 1 day | untagged |
| **7** | Switch on two or three dormant rewards behind level gates (§2.8) | 1 day | untagged |

**Total: roughly 7–9 days of build.** Every phase is a step-3 change under the
deploy rule — a better page, not a breakage — so each commits untagged and goes
out at the next scheduled build. Nothing here is broken-for-many and nothing
here is timed.

**Nothing in this proposal needs a new app build.** Levels, rings, the popup and
the feed posts are all live-site behaviour that the Capacitor shells pick up on
the next site deploy. No entitlement, link handler, permission, plugin or icon
is involved, so no entry on `NEXT_BUILD.md`.

---

# Part 3 — Decisions for Louis

Eleven calls. Everything else above is a recommendation I am confident in.

1. **Cut 50 levels to 20, or keep 50 and rename this a "20 named levels"
   system?** I recommend cutting. Levels 21–50 are generated filler, the top 30
   are unreachable (highest score 30,727; L21 starts at 40,200), and twenty
   named identities are the thing that was actually designed.

2. **Level 2 at 50 points — is one chapter the right price for the first
   level-up?** This is the most consequential number in the document. At 50, the
   first chapter you read moves you. At today's 250 it takes ten, and 95.3% of
   users never get there.

3. **Level 20 at 30,000 ≈ the whole Bible once through.** Louis is at 30,727
   today, so he lands on Level 20 on day one and the top of the ladder is
   occupied by one person. Is that right, or should L20 sit above everyone so it
   is still ahead of him?

4. **Announce level-ups at 5, 10, 15, 20 only — or every level?** Twenty posts
   per member over two years is noise; four is a journey. My recommendation is
   four.

5. **The milestone opt-out.** Shipping `milestone_posts_enabled` means admitting
   in the settings page that the app has been posting on people's behalf since
   October without asking. I think that is the right thing to do and it should
   ship with the level announcement. It is a judgement call about how it reads.

6. **Rings in the dense rows — messages and feed comments — or only on
   dashboard, profiles and study comments?** I recommend chips only in the dense
   rows; a ring at 24px next to a badge and a streak flame is clutter.

7. **Founder Buddy ordering: badge before level chip, always.** I have proposed
   it and tested the ordering idea but it is Louis's identity call: does a
   founder at Level 3 show "⭐ Founder Buddy · L3", or should the level be hidden
   for founders entirely?

8. **Which dormant rewards to switch on, and at which levels** (§2.8: themes,
   streak flames, buddy avatars, premium skins are all built and parked). The
   background photos behind the themes are noted as parked until after the
   stores — this may need to wait for that.

9. **Retire the diamond code?** `DIAMOND_REWARDS` is all zeroes and
   `estimateDiamondStashFromActions` returns 0 while ignoring both arguments.
   Deleting it is tidy-up, not a feature, and it touches a live module.

10. **D1 is a real bug with real users behind it: level-ups that were earned and
    never celebrated.** The `level_celebrated` fix cannot recover the ones
    already lost. Do nothing about the past, or send one "here's where you are"
    message to the 309 users above Level 1 when this ships?

11. **Does any of this want a page of its own** — a browsable "the 20 levels"
    page showing all twenty rings, names and what each takes — or does the
    ladder live only on the profile?

---

## Appendix — what was read, and what was inferred

**Read from the live database on 10 November 2026, read-only:** all row counts
in §1.4; the 94 `profile_stats` column names; the `current_level` distribution;
`member_badge` counts; `total_points`, `chapters_completed_count`,
`current_streak`, `total_actions` summaries; the `master_actions` `action_type`
histogram (110 values); actions-per-user percentiles; `feed_activity` row count
and columns.

**Computed in memory from rows read read-only, writing nothing:** the derived
points distribution and all threshold counts in §1.4, produced by running the
live `computePointsFromActivity` over every profile.

**Read from source:** every file, line number, column name, weight, cap and
constant cited in Part 1.

**Computed arithmetically:** all WCAG contrast ratios in §2.4 (relative
luminance per WCAG 2.x), and the chapter-count anchor for Level 20
(1,189 × 25 = 29,725).

**Inferred, and flagged as such in the text:** the "users there today" column in
§2.1 (interpolated between measured thresholds — the dry-run backfill in §2.3
replaces it with the real histogram); the "roughly what it takes" column in
§2.1 (derived from weights and caps, not from observed user timelines); and the
claim that the current celebration modal would break inside the dashboard
pager's transform (reasoned from the containing-block rule and this project's
prior experience, not reproduced).

**Not done, deliberately:** no production row was written, no migration was run,
no feature code was changed, and the backfill was not executed — only its inputs
were read.
