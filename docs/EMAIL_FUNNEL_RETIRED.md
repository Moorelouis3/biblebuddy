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

## Systeme.io is gone too (same day)

Louis, 2026-11-10: *"we dont use sysmte.io anymore,... so its notimportant we
only use AWS"*

So the rest of the Systeme plumbing went with the funnel. Everything that
still talked to `api.systeme.io` is deleted:

- **`/api/systeme-sync`** — fired on **every signup** from
  `app/signup/page.tsx`, adding the address to the Systeme contact list and
  upserting `email_funnel_state`. It added no tag, so it triggered no Systeme
  automation and sent nothing, but it is why the 4,900-contact ceiling filled
  and it meant every Bible Buddy signup sat on a list whose scheduler we do
  not control. The call in the signup page is gone with it.
- **`/api/webhooks/systeme`** — the inbound webhook that wrote
  `email_funnel_events`. Nothing will post to it again.
- **`scripts/import-systeme-contacts.ts`** — the one-off contact import.
- **The newsletter poll inside `/api/cron/email-stats-sync`** — it hit
  `/api/mailing/newsletters` every six hours and created a `systeme-<id>` row
  for anything new. The rest of that cron is real work and stays: it is what
  copies SES delivery, open and click numbers into `email_campaign_stats`.

`SYSTEME_API_KEY` is now read by nothing. It can be deleted from the Vercel
environment whenever convenient; leaving it there does nothing.

### What is NOT Systeme, despite the name

**Do not delete the 27 `systeme-*` rows in `email_campaigns`.** That prefix is
only an id left over from importing the content. Those campaigns send through
**our own SES**, and two of them already have:

| Campaign | Subject | Our SES sends | SES events |
|---|---|---|---|
| `systeme-5302997` | Moses thought he was the wrong person | 5,208 | 8,162 |
| `systeme-5302999` | Is feeling anxious a sin? | 5,171 | 7,965 |

**They stay paused. Decided by Louis, 2026-11-10: "Leave them off."** Do not
arm them, individually or in a sweep, and do not treat "paused" here as an
oversight to tidy up. They are the Sunday half of the calendar; the list gets
the Friday email and nothing else. Un-pausing all 22 would put a second email
a week in front of ~5,000 people from 15 Nov 2026 to 11 Apr 2027, including
"Merry Christmas from Louis" on 20 Dec. If they are ever wanted back, that is
Louis's call to make out loud, not a cleanup.

The other 25 are Louis's forward content calendar — one armed for 18 Apr 2027,
the rest paused with dates from 15 Nov 2026 to 11 Apr 2027. They are the
"16 scheduled, 23 paused" on the Email tab. Deleting them would delete the
calendar.

The 13 `systeme-*` rows in `email_campaign_stats` are genuinely Systeme-era
history and also stay — they are the 11 unmatched subjects the Email tab
contributes from the legacy table, plus two that match campaigns.

### What this leaves

One sender: **AWS SES**. One place to read it: **`/admin/analytics` → Email**.
No code anywhere now calls Systeme.io.

`email_funnel_state` has no writer any more, which is correct — it was only
ever written to drive the funnel. It is still read by
`/api/admin/email-analytics` for the history, and still cleared by
`lib/accountDeletion.ts` when an account is deleted, which matters.
