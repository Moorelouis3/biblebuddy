# Email: what exists, and which one is the real one

Louis, 2026-11-10: *"when I click an email from the current analytics dashboard,
it opens an older email page instead of displaying the information in the
current interface… I want ONE authoritative email management and analytics
system, not three different implementations competing with each other."*

This is the audit, before anything was changed. Phase 1 only — nothing in here
has been fixed yet.

---

## Six places touch email, not three

| # | Route | Built | What it actually is | Reads from |
|---|---|---|---|---|
| 1 | `/admin/analytics` → **Email** tab | 21 Sep | The list Louis reads. Rows for queued and sent. | `email_campaigns`, `email_campaign_stats`, `email_campaign_sends` |
| 2 | `/admin/campaigns` | 10 Oct | The email **manager**: arm, pause, reschedule, send, and a real HTML preview | `ses_campaign_stats`, `email_campaigns`, `email_engagement_summary`, `email_suppressions`, `email_arrivals` |
| 3 | `/admin/email-analytics` | **31 Jul** | The day 1–8 welcome funnel report | `email_funnel_sends`, `email_funnel_events`, `email_campaign_stats`, `user_signups` |
| 4 | `/admin/email-broadcasts` | 9 Sep | Composer for the twice-weekly studies email | `blog_email_broadcasts`, `email_campaigns` |
| 5 | `/admin/analytics/legacy` | 21 Sep | The old 7,401-line dashboard, with email panels inside it | mixed |
| 6 | `/admin/product-health` → Email | — | Deliverability: delivered, bounce rate, arrivals | `email_events`, `email_arrivals` |

Two of these are doors in the app's own menu: **Analytics** (#1) and **Email**
(#2). That alone is why it feels like two systems — it is two systems.

### The click Louis hit

`components/AnalyticsDashboardView.tsx`, in `EmailScheduleTable`:

```
href={`/admin/campaigns?open=${campaignId}`}
```

It is deliberate — there is a comment above it saying a second editor would be
a second place for the two to disagree. But the effect is what he describes:
clicking a row in the current dashboard throws you out to another page.

Worth correcting one assumption: `/admin/campaigns` is **newer** than the
analytics tab, not older. The genuinely old one is `/admin/email-analytics`
(31 July), which nothing links to any more except the legacy dashboard.

---

## The real problem is underneath: two sets of numbers for the same email

The Email tab reads **`email_campaign_stats`**. The campaigns page reads
**`ses_campaign_stats`**. They are different tables with different keys:

- `email_campaign_stats` — **24 rows**, keyed by **subject** (`name`), filled by
  the `email-stats-sync` cron every six hours. Systeme-era.
- `ses_campaign_stats` — **58 rows**, keyed by **campaign_id**, a live view over
  what we actually sent through SES.

So the list Louis reads is built from a 24-row table while the system holds 58
campaigns.

**13 of those 24 are the same emails as campaigns.** `sent` and `clicks` match
exactly. `opens` do not:

| Subject | opens (Email tab) | opens (campaigns page) |
|---|---|---|
| Moses thought he was the wrong person | 994 | 2,324 |
| 🤯 Who was Cain afraid of? | 1,496 | 2,203 |
| 🪵 What exactly was gopher wood? | 1,361 | 2,066 |
| Bible Buddy is on Android! | 656 | 1,265 |

Same email, two different open counts, depending on which page you are on.

There is also a straight duplicate inside the legacy table: **"60 days through
Higher Hope" appears twice** (5,241 and 5,218 recipients), so it shows as two
separate emails.

**What this means for the merge:** `ses_campaign_stats` is the source of truth.
The legacy table may only contribute rows whose subject has **no** campaign —
11 of the 24, the genuine Systeme-only sends. Merging on subject without that
rule double-counts thirteen emails.

---

## Statuses do not mean what the words say

`ses_campaign_stats` by status today: **paused 25, sending 22, done 11.**

"sending" does not mean twenty-two emails are going out right now. It is how a
recurring automation is stored — the Friday teaching series, the per-person
triggers (`(per-person) you finished a devotional`). A row that is armed with no
`scheduled_for` means *send to whoever is due, forever*, not *one send in
progress*.

The dashboard already works around this in `lib/adminDashboard.ts` with a
`stateOf()` function that re-derives `sending / armed / scheduled / paused /
missed / draft` from status + date + live send counts. That logic is sound and
should be kept — but it currently runs only on the queued half, never on the
sent half, and it is not applied on the campaigns page at all.

A recurring automation should not be shown with a single fixed send date. There
are 53 marketing and 5 transactional campaigns; the per-person ones are the
automations.

---

## What already exists and should be reused, not rebuilt

- **`GET /api/admin/campaigns?campaignId=<id>`** already returns one campaign
  with its full `html` body, placeholders swapped for working stand-ins. The
  campaigns page renders it in an `<iframe srcDoc>`, which is the safe way to
  show a real email. The inline expander needs exactly this and should call it.
- **`stateOf()`** in `lib/adminDashboard.ts` — the status logic above.
- **`email_campaign_sends`** — live per-address counts, current to the second,
  which is what stops a mid-send campaign reading "not sent yet" for six hours.
- The **arrivals** column added on 2026-11-09, which is what replaced SES click
  tracking after it was turned off so email links could open the app.

---

## Recommendation

1. **`/admin/analytics` → Email becomes the one place to read email.** One
   chronological list, filters, and the detail expanding inline — including the
   real HTML preview, fetched from the endpoint that already serves it.
2. **One source of truth: `ses_campaign_stats` + `email_campaigns` +
   `email_campaign_sends`.** `email_campaign_stats` contributes only
   subjects with no matching campaign, and is labelled as the Systeme-era
   record it is.
3. **`/admin/campaigns` stays, but only as the place to *act*** — arm, pause,
   reschedule, send. Reached by an explicit button inside an expanded row, never
   by clicking the row itself. It is the newer page and it holds real sending
   controls; deleting it would lose function Louis uses.
4. ~~**`/admin/email-analytics` (31 July) is retired**~~ — **it stays, but not
   for the reason first given.** I wrote that the day 1–8 funnel was "a live
   system of its own". Louis asked whether people really get daily emails in
   their first week, and the database says no. Checked 2026-11-10:

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

   **Nothing at all since 21 October.** Days 2–8 were switched off on
   2026-09-09 — they were written for the subscription model ("ready to
   commit?"), which is not the business any more. Day 1 kept going through
   Systeme until our own SES welcome took over on 2026-10-20.

   The cron is still scheduled hourly, and it still runs, but it asks whether
   `email_campaigns.welcome` is `sending` first — it is — so `daysToProcess`
   is an empty array and it sends nothing. That is deliberate: it means there
   is never a moment with two welcomes going out and never a moment with none.

   So the page reports **history**, not a live sender, and that is why it
   stays: 30,764 recorded sends and this is the only screen that can read
   them. The Email tab links to it as history.

   **Cleaned up the same day** (Louis: "Clean it up"). The senders, both
   crons and 1,081 lines of how-to docs for a system that no longer exists
   are gone; the two tables, the page and its live endpoint stay. One of the
   two crons was not harmless — it could still have mailed 500 people the
   subscription-era welcome. Full account, and where the copy lives in git:
   **`docs/EMAIL_FUNNEL_RETIRED.md`**.

   **What a new signup actually gets in week one:** the welcome email, from
   our own server, once. Plus the twice-weekly studies broadcast if one goes
   out that week (it goes to the whole list, not to new people specially).
   `study-nudge` can reach them later, but only if they start a devotional and
   then go quiet for four to fourteen days, and only once per person ever.
   Nothing daily.
5. **`/admin/email-broadcasts` is left alone.** It writes emails, it does not
   report on them, and nothing in the complaint is about it.

---

## What was actually done (2026-11-10)

- One chronological list on the Email tab, built from `ses_campaign_stats`.
  **69 emails** where the old panel showed a 24-row table.
- The Systeme table now contributes only its 11 unmatched subjects. The
  thirteen duplicates are gone.
- A row opens **in place**. The detail comes from
  `/api/admin/campaigns?campaignId=`, extended to return the sender, the live
  stats, per-link clicks and arrivals in one request.
- The preview renders the real saved HTML in a `sandbox=""` iframe — no
  scripts, no forms, no navigation.
- The menu's **Email** entry now opens the Email tab, not `/admin/campaigns`.
  Editing and sending are one click further in, from inside an expanded row.
- Clicks after 2026-11-09 read as **"not counted"**, never as a zero.
- `npm run verify:email-list` checks all of this against the live database.

**Still separate, on purpose:** the welcome funnel (its own system, see above),
the broadcast composer (writing, not reporting), and the product-health email
panel (deliverability, not campaigns).

**Not verified:** the screen itself. The admin pages are behind Louis's
account and signing in as him is not something an agent should do, so the list,
the filters and the expander have been proven at the data layer and in a
production build, but nobody has looked at them yet.
