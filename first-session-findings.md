# Bible Buddy — First-Session / Return-Rate Findings

Read-only audit. Cohort: all `user_signups` in the last 90 days (window computed at time of audit: signups from ~2026-04-29 to 2026-07-28). All data pulled live from production Supabase (`master_actions`, `profile_stats`, `user_signups`, `landing_onboarding_responses`) via service-role read queries. No writes, migrations, or schema changes were made. Numbers and observations only — no recommendations.

## Methodology note (data integrity)

An early version of the Step 1 query produced inconsistent results across repeated runs (same total row count, different per-user grouping) because the underlying `.range()`-based pagination against `master_actions` had no explicit `ORDER BY`, and Postgres does not guarantee stable row order across paginated calls without one — especially on a table receiving live writes. This was caught via a duplicate-row check (comparing fetched row count to unique row-ID count) and fixed by adding `order('id')` to every paginated query. All numbers below are from the corrected, deterministic queries, verified by confirming fetched-row-count equals unique-ID count with zero duplicates.

## Cohort size

- **2,271** signup rows in the last 90 days in `user_signups`, but only **1,993 unique `user_id`s** — 278 duplicate signup rows for the same user.
- All group percentages below are out of these 1,993 unique users unless noted.

## Step 1 — Three-way split

| Group | Definition | Count | % |
|---|---|---|---|
| A | Zero `master_actions` events ever | 0 | 0.0% |
| B | Events on exactly one calendar date | 1,656 | 83.1% |
| C | Events on more than one calendar date | 337 | 16.9% |

Nobody signs up and generates zero activity. The dominant pattern is a single-day visit that never repeats (83.1%), not total non-engagement.

## Step 2 — Group A investigation

Not applicable — Group A is empty (0 people). No zero-activity cohort exists to investigate against auth/email-confirmation/traffic-source/`landing_page_events` data.

## Step 3 — Group B's only session (n=1,656)

- **First action:** `user_signup` for 100% of Group B (1,656/1,656) — an artifact of how the group is defined, not a behavioral signal.
- **Last action before disappearing** (top 10):
  1. `user_login` — 505 (30.5%)
  2. `dashboard_viewed` — 374 (22.6%)
  3. `user_signup` — 143 (8.6%) — no event fired after signup at all
  4. `louis_daily_message_shown` — 73
  5. `bible_chapter_viewed` — 59
  6. `study_group_feed_viewed` — 57
  7. `bible_in_one_year_day_viewed` — 53
  8. `chapter_completed` — 44
  9. `study_notes_section_opened` — 42
  10. `louis_opened` — 41
- **Session length** (first event to last event): median **1.19 minutes**, average 18.05 minutes (skewed by outliers).
- **Events per person:** median **3**, average 5.32.
- **139 of 1,656 (8.4%)** fired zero events beyond the signup event itself.
- Single largest concentration of "last thing they ever did" is `dashboard_viewed` (22.6%) plus `user_login` (30.5%) — over half of Group B's terminal event is a passive/navigational action, not content engagement.

## Step 4 — Onboarding drop points

The landing-page onboarding quiz (`onboarding_intro_viewed`, `onboarding_question_completed`, `onboarding_results_viewed`, `onboarding_journey_started`) is recorded with **`user_id = null` for 100% of these events** — they are anonymous/pre-signup. The only other join key, `session_id`, is populated for just **11 of 1,993** cohort users in `master_actions`. There is no reliable way to attribute a specific signed-up cohort member to a specific landing-quiz drop-off step with the data as currently instrumented.

**A. Aggregate landing-quiz funnel, last 90 days** (anonymous events in the same time window, not 1:1 tied to the cohort):

| Step | Count |
|---|---|
| Intro viewed | 37 |
| Intro started | 33 |
| Intro skipped | 7 |
| Question 1 completed | 30 |
| Question 2 completed | 31 |
| Question 3 completed | 29 |
| Question 4 completed | 30 |
| Question 5 completed | 30 |
| Results viewed | 59 |
| Journey started | 27 |

Question-to-question completion is flat (~30 each) — no single question is a disproportionate drop point. Question-completion volume exceeds intro-view volume, meaning many respondents never fire an intro-viewed event (consistent with ad deep-links landing mid-quiz). `results_viewed` (59) is more than double `journey_started` (27) — over half of people who reach their results screen never start the journey.

**B. Per-user completion flags for the real cohort** (`profile_stats`, 1,983/1,993 matched):

| Flag | % true |
|---|---|
| `onboarding_completed` (in-app) | 71.0% |
| `landing_onboarding_completed` (landing quiz) | 30.4% |
| `feed_onboarding_completed` | 0.0% (0 of 1,983) |
| `groups_onboarding_completed` | 0.0% (0 of 1,983) |

## Step 5 — Did Group B finish anything?

**175 of 1,656 (10.6%)** completed at least one chapter, devotional day, or trivia round during their single session. Completion events among those 175:

| Event | Count |
|---|---|
| `chapter_completed` | 482 |
| `bible_in_one_year_trivia_completed` | 38 |
| `devotional_day_completed` | 14 |
| `trivia_chapter_completed` | 6 |
| `reading_plan_chapter_completed` | 0 |

## Step 6 — Group C's day-1 session vs. Group B's only session

| Metric | Group C, day 1 (n=337) | Group B, only session (n=1,656) |
|---|---|---|
| Completed something | 21.4% (72/337) | 10.6% (175/1,656) |
| Session length, median | 2.50 min | 1.19 min |
| Session length, average | 63.05 min | 18.05 min |
| Events fired, median | 4 | 3 |
| Distinct features touched, median | 4 | 3 |

Largest single gap by percentage-point, feature touched during that first session:

| Action | Group C % | Group B % | Gap |
|---|---|---|---|
| `user_upgraded` | 29.7% | 0.6% | +29.1 |
| `dashboard_viewed` | 80.4% | 70.0% | +10.4 |
| `chapter_completed` | 19.0% | 9.3% | +9.7 |
| `bible_in_one_year_reading_completed` | 16.9% | 7.6% | +9.3 |
| `study_notes_section_opened` | 12.2% | 7.1% | +5.1 |
| `bible_in_one_year_trivia_completed` | 5.3% | 1.8% | +3.6 |
| `devotional_day_completed` | 3.9% | 0.8% | +3.1 |
| `study_group_feed_viewed` | 10.1% | 7.4% | +2.7 |
| `dashboard_card_opened` | 3.9% | 1.2% | +2.6 |
| `devotionals_viewed` | 10.1% | 7.5% | +2.5 |
| `louis_opened` | 11.9% | 9.4% | +2.4 |
| `bible_in_one_year_day_completed` | 5.9% | 3.5% | +2.4 |
| `louis_ai_message_sent` | 11.6% | 9.3% | +2.3 |
| `devotional_opened` | 4.7% | 2.8% | +1.9 |
| `trivia_started` | 4.5% | 3.0% | +1.5 |

## Step 7 — Stated intent vs. outcome

`landing_onboarding_responses` matches only **2 of 1,993** cohort users — effectively unused for this cohort.

On `profile_stats`, the onboarding-answer fields have very different population rates:

| Field | Populated | % |
|---|---|---|
| `bible_experience_level` | 838 / 1,983 | 42.3% |
| `onboarding_goal` | 837 / 1,983 | 42.2% |
| `onboarding_time_commitment` | 2 / 1,983 | 0.1% |
| `onboarding_difficulty` | 2 / 1,983 | 0.1% |

Time-commitment and difficulty answers are essentially absent from the data — no comparison is possible for those two questions.

`bible_experience_level` vs. group outcome:

| Stated experience | n | Group B % | Group C % |
|---|---|---|---|
| (no answer given) | 1,155 | 88.1% | 11.9% |
| beginner | 347 | 78.4% | 21.6% |
| brand_new | 87 | 82.8% | 17.2% |
| Just starting | 65 | 84.6% | 15.4% |
| Just getting started | 34 | 73.5% | 26.5% |
| intermediate | 105 | 75.2% | 24.8% |
| 3+ years | 20 | 80.0% | 20.0% |
| 1–3 years | 38 | 73.7% | 26.3% |
| Been studying for a while | 39 | 66.7% | 33.3% |
| 10+ years | 33 | 69.7% | 30.3% |
| experienced | 62 | 59.7% | 40.3% |
| Studying deeply for years | 8 | 75.0% | 25.0% |

Self-identified "experienced" users return at roughly double the rate of self-identified "beginner" users (40.3% vs. 21.6%). The largest cohort segment — the 1,155 people (58%) who never answered the experience question at all — has the lowest return rate of any group, 11.9%, lower than every answered category including "beginner."
