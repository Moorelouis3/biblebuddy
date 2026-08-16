# Guest study & deep links (Phase 5)

**Goal:** someone reads a blog post, clicks through, and starts studying
immediately. No payment, no signup, no onboarding wall.

---

## The flow

```
Google / Pinterest / YouTube
   ↓
Blog article ("Who Was Leah?")
   ↓  <StudyCta slug="women-of-the-bible" />
/study/women-of-the-bible          ← readable slug, resolves to the real UUID
   ↓
/devotionals/<uuid>                ← content loads with NO session (anon RLS)
   ↓  reader taps Day 1
guest account created              ← only now, on a real study action
   ↓
progress saves normally
   ↓  later, optionally
signs up → SAME user id → keeps everything
```

## What was already there

Most of this existed before Phase 5 and was simply unreachable:

- `supabase.auth.signInAnonymously()` — but only from the landing questionnaire.
- Guest lifecycle columns on `profile_stats`: `account_type`, `guest_started_at`,
  `converted_from_guest_at`, `registered_at`.
- Guest → registered conversion in `components/DashboardJourneyExperience.tsx`,
  which calls `supabase.auth.updateUser()` and therefore keeps the **same user
  id**. Nothing needs migrating when someone signs up.
- Anonymous `SELECT` on all core content: `devotionals`, `devotional_days`,
  `bible_chapters`, `bible_notes`, `bible_people_notes`,
  `places_in_the_bible_notes`, `keywords_in_the_bible`.

## What Phase 5 added

| File | Purpose |
|---|---|
| `lib/guestSession.ts` | `ensureGuestSession()` — callable from any page |
| `app/study/[slug]/page.tsx` | Readable slug → devotional UUID redirect |
| `components/StudyCta.tsx` | Drop-in blog CTA pointing at a free study |
| `supabase/migrations/BLOCK_ANONYMOUS_COMMUNITY_WRITES.sql` | Keeps guests out of community writes |

Wired into `app/devotionals/[id]/page.tsx` (day click) and
`app/Bible/[book]/[chapter]/page.tsx` (person/place/keyword study cards).

## Design decisions

**Guests are created on the first study action, never on page view.** A bounced
visitor or a crawler must not create database rows. Someone who reads and leaves
costs nothing.

**Concurrent calls share one promise.** A double tap cannot create two guests.

**A guest is a real Supabase user, not localStorage.** RLS, progress writes and
analytics all work unchanged, and signup is a no-migration upgrade of the same
account. This is better than the localStorage approach originally proposed.

**Failure degrades to read-only.** If anonymous sign-in is disabled in Supabase,
`ensureGuestSession()` returns `{ ok: false, reason: "disabled" }`, logs a clear
warning, and the reader still gets the full study content — just untracked.
Nothing breaks.

## Available slugs

`/study/<slug>` — add more in `STUDY_SLUGS` in `app/study/[slug]/page.tsx`.

| Slug | Study |
|---|---|
| `temptation-of-jesus` *(or `tempting-of-jesus`)* | The Tempting of Jesus — 21 days |
| `women-of-the-bible` | Women of the Bible — 21 days |
| `disciples-of-jesus` | The Disciples of Jesus — 21 days |
| `faith-of-job` | The Faith of Job — 21 days |
| `heart-of-david` | The Heart of David — 21 days |
| `calling-of-moses` | The Calling of Moses — 21 days |
| `transforming-of-paul` | The Transforming of Paul — 21 days |
| `wisdom-of-proverbs` | The Wisdom of Proverbs — 31 days |

Slugs are matched with `ILIKE`, so they survive the longer seeded titles and
the "Tempting" vs "Temptation" naming split.

Wired into two articles so far: `who-is-leah` → Women of the Bible,
`building-self-control` → The Temptation of Jesus. The remaining 26 articles are
copy work, not engineering.

---

## ⚠️ Two things needed before this goes live

**1. Enable anonymous sign-ins in Supabase.**
Dashboard → Authentication → Providers → **Anonymous**. Without it, guest study
silently degrades to read-only. There is an explicit error path for this, so it
will not crash — but the funnel will not work either.

**2. Run `BLOCK_ANONYMOUS_COMMUNITY_WRITES.sql`.**
Supabase anonymous users hold the `authenticated` role, so every community write
policy (`TO authenticated`) currently accepts them. The migration adds
RESTRICTIVE policies that block guests from posting, commenting, liking and
messaging, without dropping or modifying any existing policy.

It is safe to re-run, skips tables that do not exist, and does not affect the
cron jobs that post to groups — those use the service role, which bypasses RLS.

## Known follow-up

**Community actions fail silently for guests.** Once the migration is applied, a
guest who tries to comment will hit an RLS rejection with no friendly
explanation. The right fix is a "Create a free account to join the conversation"
prompt on community actions when `isGuestUser()` is true — `lib/guestSession.ts`
exports that helper ready to use. Not built yet: it touches many components and
could not be tested in this environment.
