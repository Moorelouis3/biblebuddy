# Friday emails

**One email, to everybody, every Friday at 8:00 a.m. America/New_York.**

It was a per-person drip until 2026-10-25 and is not any more. Each subscriber
used to walk the twelve lessons from their own position, so somebody joining in
January would have started at lesson 1 in January while everybody else was on
lesson 11. Louis killed it: *"just make the damn friday emails go out weekly
and that's it, nobody needs to get the first one if they weren't there, we have
more than enough content to have fresh emails."*

So a Friday is now a **date**, not a position. Everybody gets the same email on
the same morning, and somebody who joins in week nine starts at week nine having
missed weeks one to eight — exactly as they would have missed a newsletter.
Nobody receives anything twice: `email_campaign_sends` is still keyed
`(campaign_id, email)`, so the 917 people who got lesson 1 on 13 October are
skipped when it goes out to the rest of the list.

`/api/cron/friday-teaching` is **deleted**, along with the enrolment
arithmetic, the per-person position lookup, and the weekly paging over every
subscriber and every send row that it did. Every Friday email is an ordinary
dated campaign, posted by `/api/cron/email-campaign-send` like any other
broadcast.

Source copy: `Bible_Buddy_Friday_Emails_12.pdf`, approved 2026-10-12, plus the
four dated emails written on 2026-10-25 against that morning's blog posts.

## The calendar

Sixteen Fridays: the twelve lessons, with four dated emails at the fixed points
they are about. `--schedule` prints it.

| Date | Email |
|---|---|
| 2026-10-30 | Lesson 1 — How Bible Buddy helps you understand the Bible |
| 2026-11-06 | Lesson 2 — What actually is the Bible? |
| 2026-11-13 | Lesson 3 — Not sure where to start? |
| **2026-11-20** | **Thanksgiving — In every thing. Not for every thing.** |
| 2026-11-27 | Lesson 4 — Read the verses around it |
| 2026-12-04 | Lesson 5 — Will you remember why you highlighted that verse? |
| 2026-12-11 | Lesson 6 — Who is this person? Where is this place? |
| **2026-12-18** | **The card on your shelf is lying to you** |
| **2026-12-25** | **Christmas Day — Born unto you, this day** |
| **2027-01-01** | **New Year — Most reading plans die in February** |
| 2027-01-08 | Lesson 7 — Write down what finally made sense |
| 2027-01-15 | Lesson 8 — What do you remember from what you read? |
| 2027-01-22 | Lesson 9 — Make Bible study fit the life you actually have |
| 2027-01-29 | Lesson 10 — You don't have to study alone |
| 2027-02-05 | Lesson 11 — Ask the question you've been sitting with |
| 2027-02-12 | Lesson 12 — Let's put your Bible study routine together |

30 October is the only slot still in EDT, so it is 12:00 UTC; the rest are
13:00.

To add a Friday: write the email, add a row to `FRIDAY_CALENDAR`, re-run the
installer. To move one, change its date and re-run — a date change cannot
resend anything, because the record is keyed to the id.

## The pieces

| What | Where |
|---|---|
| The twelve lessons (generated — do not hand-edit) | `lib/email/fridayTeachingSeriesContent.ts` |
| The four dated emails | `lib/email/fridayThemedEmails.ts` |
| Calendar, template, rendering | `lib/email/fridayTeachingSeries.ts` |
| The sender | `app/api/cron/email-campaign-send/route.ts` (every 10 min) |
| Install / preview / test / arm | `scripts/install-friday-series.ts` |
| Regenerate the copy from the PDF | `scripts/friday-series/` |

## How to run it

```bash
npx tsx scripts/install-friday-series.ts             # install or refresh copy + dates
npx tsx scripts/install-friday-series.ts --schedule  # print the calendar
npx tsx scripts/install-friday-series.ts --preview   # write all 16 to tmp/friday-preview/
npx tsx scripts/install-friday-series.ts --test you@example.com --lesson 1
npx tsx scripts/install-friday-series.ts --arm       # go live
npx tsx scripts/install-friday-series.ts --disarm    # stop everything
```

## The decisions worth knowing

**Each email is its own campaign row.** That is what gives us duplicate
protection (`email_campaign_sends` keyed `(campaign_id, email)`), per-email open
and click numbers through `ses_campaign_stats`, a real date in the dashboard
schedule, and the existing `/admin/campaigns` editor — all already built.

**Never clear `scheduled_for` on a Friday row.** An armed marketing row with no
date reads to the batch sender as "send this to everybody right now". That is
exactly how lesson 1 reached 917 people on a Tuesday in October, before the
series had a calendar. The installer always writes a date, and `--arm` writes
the date in the same statement as the status for that reason.

**A missed Friday is missed.** There is no catch-up and no backfill: that is
the whole point of the change. If a send fails, fix it and re-arm that row —
the people already reached are recorded, so a retry only picks up the rest.

**There are no frequency caps.** They were removed on 2026-10-13 — see
`supabase/migrations/20261013_remove_frequency_caps.sql`. Everyone receives
every email. Unsubscribe, bounce/complaint suppression and duplicate protection
are all still enforced; the three engagement groups survive as a way of seeing
the list, not as a rule about who gets mail.

Keep an eye on the bounce rate regardless: the 10 October send to the whole
list bounced at 3.73%, and SES suspends an account above 5%. The 194 hard
bounces from it are now suppressed, so the next full send starts cleaner.

## Open items

**There is no email-preferences page.** The source copy had an
`{{email_preferences_link}}` in its footer; no such page exists anywhere in the
app, so the footer carries only the working one-click unsubscribe rather than a
link that would 404.

**Email 9 lost a glyph.** Its subject, its H1 and one paragraph each begin with
a character the PDF could not map (almost certainly a leading emoji — the
contents page shows the same gap). It is unrecoverable from the document and
has been stripped. If Louis wants an emoji there, add it to the generator's
source and regenerate.

**One wording change was made to email 1**, recorded in the generated file's
header: "explanations underneath each verse" → "explanations listed underneath
the verses they belong to". Study Mode only lists cards for verses that have
one, and chapters with no notes have no toggle at all. The document says to
preserve the wording but also says to verify every feature first and not to
claim every verse is clickable; where those collide, accuracy wins.
