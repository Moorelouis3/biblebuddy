# Friday teaching series

Twelve lessons, one every Friday at **8:00 a.m. America/New_York**, starting
**Friday 16 October 2026**. Everyone moves through the same twelve in order,
from wherever they are.

Source copy: `Bible_Buddy_Friday_Emails_12.pdf`, the document Louis approved on
2026-10-12. That document is the spec for everything below.

**Nothing sends until it is armed.** All twelve are installed as `paused`
campaign rows.

## The pieces

| What | Where |
|---|---|
| The copy (generated — do not hand-edit) | `lib/email/fridayTeachingSeriesContent.ts` |
| Template, dates, rendering | `lib/email/fridayTeachingSeries.ts` |
| The sender | `app/api/cron/friday-teaching/route.ts` |
| Install / preview / test / arm | `scripts/install-friday-series.ts` |
| Regenerate the copy from the PDF | `scripts/friday-series/` |
| Cron schedule | `vercel.json` → `*/15 12-16 * * 5` |

## How to run it

```bash
npx tsx scripts/install-friday-series.ts            # install or refresh the copy (never arms)
npx tsx scripts/install-friday-series.ts --preview  # write all 12 to tmp/friday-preview/
npx tsx scripts/install-friday-series.ts --test you@example.com --lesson 1
npx tsx scripts/install-friday-series.ts --arm      # go live
npx tsx scripts/install-friday-series.ts --disarm   # stop everything
```

Check what a given Friday would do, without sending anything:

```
/api/cron/friday-teaching?dry=1&force=1&asof=2026-10-16
```

`asof` is refused on a live run — it decides who is due, so honouring it while
sending would be a way to mail the whole list early.

## The decisions worth knowing

**Each lesson is its own campaign row.** That is what gives us duplicate
protection (`email_campaign_sends` is keyed `(campaign_id, email)`), per-lesson
open and click numbers through `ses_campaign_stats`, and the existing
`/admin/campaigns` editor — all already built. It is also what satisfies the
requirement that *edits or reordering must not resend*: the send record is keyed
to the lesson's **stable id**, never its position.

**Enrollment is derived, not stored.** A subscriber's first Friday is the first
Friday *strictly after* they signed up, never earlier than the series start.
That single rule gives all three of the document's requirements at once — a
Thursday signup starts the next day, a **Friday signup skips that day** and
waits a week, and everyone else starts on the coming Friday. No enrollment
table, no backfill, no hook in the signup path, and nothing that can drift out
of sync with the subscriber list.

**Position is derived too.** Someone's next lesson is the first one with no row
in `email_campaign_sends`. So a lesson missed through a failure or a pause is
received the following Friday rather than lost.

**The 8 a.m. gate honours daylight saving.** Vercel cron is UTC only, so the job
fires every 15 minutes across 12:00–16:00 UTC on Fridays and the route itself
decides, via `Intl` in `America/New_York`, whether it is the right hour. 8 a.m.
Eastern is 12:00 UTC in October and 13:00 UTC in November; both are covered and
exactly one matches. Sending continues in batches until noon Eastern so a list
of 5,000 clears comfortably.

**The engagement caps are untouched.** This cron does not consult
`marketing_recipients()` — it has its own eligibility, and suppression is still
enforced inside `sendEmail`. Unsubscribe, bounce/complaint suppression and
duplicate protection all still apply.

## Open items

**The caps will need raising before Tuesday newsletters are armed.** Today
`quiet` is capped at 2 marketing emails per rolling 7 days and `inactive` at 1.
The Tuesday + Friday plan is two a week for everyone, so an `inactive`
subscriber has room for only one of them and would receive Tuesday one week and
Friday the next, at random — falling permanently behind in an ordered course.
Raising `quiet` to 3 and `inactive` to 2 fixes it. Not done yet because nothing
Tuesday is armed, so it changes nothing today. Worth knowing when it is done:
`inactive` means no sign of life in over 90 days, and doubling what that group
receives is the usual way a sender's complaint rate climbs.

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
