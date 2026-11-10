# The day 1–8 welcome funnel: retired 2026-11-10

Louis, 2026-11-10: *"what welxome funnel? 1–8 welcome funnel are u saying
people are getting daily emails the first week they join cause i dont remember
that at all.."*

He was right not to remember it. It had not sent anything since 21 October,
and the eight-email week had not run since 9 September. This note is here so
the next person reading `email_funnel_sends` does not conclude it is live, and
does not rebuild it.

## What it was

Eight emails over a new signup's first eight days, sent through Systeme.io by
tagging the contact (`bb-day1-…`) and letting a Systeme automation
("tag added → send email") do the actual sending. Written for the
subscription model: *"You're a pro, literally"*, *"ready to commit?"*

## When each part stopped

| Day | Sends ever | Last one |
|---|---|---|
| 1 | 5,043 | 20 Oct 2026 |
| 2 | 3,765 | 9 Sep 2026 |
| 3 | 3,763 | 9 Sep 2026 |
| 4 | 3,760 | 9 Sep 2026 |
| 5 | 3,758 | 9 Sep 2026 |
| 6 | 3,742 | 9 Sep 2026 |
| 7 | 3,760 | 9 Sep 2026 |
| 8 | 3,173 | 9 Sep 2026 |

- **9 Sep 2026** — days 2–8 switched off. The app went free; the copy was
  about a subscription that no longer existed.
- **20 Oct 2026** — our own welcome email went live on SES
  (`email_campaigns.campaign_id = 'welcome'`). Day 1 through Systeme stopped
  the same day.
- **21 Oct 2026 onwards** — nothing at all.

## What was actually still running, and why it mattered

Two crons survived in `vercel.json` long after the funnel stopped sending:

1. **`/api/cron/email-funnel-send-all`**, hourly. Harmless. It checked whether
   `email_campaigns.welcome` was `sending` first — it was — so it processed an
   empty list 24 times a day. That check was deliberate, so there was never a
   moment with two welcomes and never one with none.

2. **`/api/cron/enroll-remaining-signups`**, daily at 13:00 UTC. **Not
   harmless.** It pushed up to 500 older signups a day into Systeme.io with the
   day-1 tag, which fires Systeme's own automation — and unlike the hourly one,
   it had **no check for whether our own welcome was live**. It stopped on
   20 Oct only because it ran into its own guard: a safety ceiling of 4,900
   Systeme contacts. It was not finished. On 2026-11-10 it still had 854 of its
   4,800-contact campaign cap free and 828 signups not yet enrolled
   (5,508 signups vs 4,680 rows in `email_funnel_state`).

   So if Systeme's contact count had ever dropped back below 4,900 — someone
   tidying the list, a plan change, a bulk delete — this would have woken up
   and sent up to 500 people the subscription-era welcome, on top of the real
   one. Compare [`systeme-owns-its-own-schedule`]: Systeme sent to 4,211
   people after Louis believed he had stopped it.

   That is the reason this cleanup was worth doing rather than leaving the
   code to rot quietly.

## Deleted

- `app/api/cron/email-funnel-day1`, `-day4`, `-day8`, `-send-all`
- `app/api/cron/enroll-remaining-signups`
- `app/api/email-funnel/` — `analytics`, `backfill-30days`,
  `cron-send-pending`, `day-4-conditional`, `day-8-conditional`, `send-day`
  (`analytics` here was already orphaned: the admin page reads
  `/api/admin/email-analytics`, which is a different route and stays)
- `lib/emailFunnelHelpers.ts`, `lib/emailFunnelTemplates.ts`,
  `lib/systemeTagSender.ts`
- `EMAIL_FUNNEL_IMPLEMENTATION.md`, `FUNNEL_REVIEW_SUMMARY.md`,
  `FUNNEL_TESTING_GUIDE.md` — 1,081 lines of how-to for a system that no
  longer exists, which is exactly what gets something rebuilt or re-armed by
  mistake. Replaced by this note.
- Both cron entries in `vercel.json`.

**The eight emails' copy is not lost.** It is in git:

```
git show f47b3553:lib/emailFunnelTemplates.ts
```

## Kept

- **`email_funnel_sends`** — 30,764 rows. The record of every one of those
  sends. Not touched.
- **`email_funnel_state`** — 4,680 rows. Still written on every signup by
  `/api/systeme-sync`, and listed in `lib/accountDeletion.ts` so a deleted
  account is cleared from it.
- **`/admin/email-analytics`** and **`/api/admin/email-analytics`** — the only
  screen that can read that history. This is why the page stays, and the
  Email tab links to it as history, not as a live sender.
- **`CREATE_EMAIL_FUNNEL_TABLES.sql`** — the schema for the two tables above,
  which still hold data.

## Still live, and worth a decision one day

`/api/systeme-sync`, called from `app/signup/page.tsx` on every signup. It adds
the new address to Systeme.io as a contact and upserts `email_funnel_state`.

It adds **no tag**, so it triggers no Systeme automation and sends nothing. But
it is why the Systeme contact ceiling filled up, and it means every Bible Buddy
signup is sitting on a list whose scheduler we do not control. Left alone here
because it is live code doing what it was built to do, and whether we still
want that list is Louis's call, not a cleanup decision.
