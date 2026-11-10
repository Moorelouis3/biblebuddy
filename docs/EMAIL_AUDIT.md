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
4. **`/admin/email-analytics` (31 July) is retired** — redirected into the Email
   tab once the funnel numbers it shows have a home there.
5. **`/admin/email-broadcasts` is left alone.** It writes emails, it does not
   report on them, and nothing in the complaint is about it.

Nothing in this document has been implemented. Phases 2–6 follow.
