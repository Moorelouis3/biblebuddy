# Email buckets: audit before activation — 11 November 2026

**Nothing was changed. No campaign was armed, paused, edited or sent, and no
subscriber record was touched.** This is the inspection step the routing spec
asks for, against the live database and the running code.

---

## 1. Nothing sends tonight or tomorrow

The campaign sender (`/api/cron/email-campaign-send`, every 10 minutes) picks up
`kind='marketing' AND status='sending' AND (scheduled_for IS NULL OR
scheduled_for <= now())`. **That query currently returns 0 rows.** Nothing is
armed to fire immediately, and nothing at all is dated 12 November.

**But one legacy email sends in two days**, and the spec supersedes it:

| When | Campaign | Why it matters |
|---|---|---|
| **Fri 13 Nov 13:00** | `friday-03-study-guides` — "Not sure where to start? Try a Bible Buddy study guide" | A nonholiday legacy campaign. Spec §3 supersedes these. **It sends unless paused.** |
| Fri 20 Nov 13:00 | `friday-themed-thanksgiving-2026` | Thanksgiving is **26 Nov**. This lands six days early |
| Fri 27 Nov 13:00 | `friday-04-read-the-context` | **Same day as the approved Noah's Ark email** |

Sixteen legacy marketing campaigns are armed in total, running to **April 2027**
(twelve `friday-NN-*`, three `friday-themed-*`, and `systeme-5303010` dated
18 Apr 2027). All target `["active","quiet","inactive"]` — the whole list.

---

## 2. The Cain email has already been sent

**This is the most important finding.** The spec names
*"Who Was Cain Afraid Of After He Killed Abel? 🤯"* as the 12 November Bucket 2
campaign. That email already went out:

- `genesis-study-01-cain-afraid` — "🤯 Who was Cain afraid of?"
- Sent **28 October 2026**, status `done`
- **Delivered to 5,218 addresses** — effectively the whole eligible list

Sending it again on 12 November would be a near-total duplicate, and **the
existing duplicate protection would not stop it**: `marketing_recipients`
deduplicates on `(campaign_id, email)`, so a new row with a new id like
`nov-12-cain` is a different campaign as far as the database is concerned.

There is also a **Part 2 series already running** under the same theme, which
the spec presents as new. Four have gone out:

| Sent | Campaign | Subject |
|---|---|---|
| 28 Oct | `genesis-study-01-cain-afraid` | 🤯 Who was Cain afraid of? |
| 1 Nov | `genesis-study-02-genesis-2-contradiction` | 🤔 Does the Bible contradict itself in chapter 2? |
| 6 Nov | `genesis-study-03-noahs-ark-turkey` | 🪵 What exactly was gopher wood? |
| 8 Nov | `genesis-study-04-let-us-make-man` | 👀 Who was God talking to? |

Roughly a three-day cadence on the Genesis theme — the same shape the new
calendar describes. **This needs an editorial decision, not a technical one:**
whether the new seven are a continuation of this series or a replacement for it,
and what to do about Cain having already gone out. See §6.

---

## 3. Bucket 1 does not exist

The spec requires a five-email welcome funnel, one per day, tracked per
subscriber, with a transition to Bucket 2 after Email 5.

**What actually exists is a single welcome email.**

- One row, `campaign_id = 'welcome'`, `kind = transactional`, `status = sending`
- Subject: "Welcome to Bible Buddy 🎉 Your Bible, with help understanding it"
- Sent by `/api/cron/welcome-email`, every 15 minutes
- **387 sends recorded** since its cutover
- Cutover `started_at = 2026-10-10T19:00:40Z`

The five approved bodies in the spec (Days 1–5) are **not in the database at
all**. Neither are the seven approved November campaign bodies.

**One thing already works the way the spec wants.** The welcome cron only
considers people who signed up *after* `started_at`, so existing subscribers are
not re-welcomed. That is spec §1 and §"Existing subscribers are NOT
automatically put back into the welcome sequence", already implemented and
working — it does not need building, only preserving.

---

## 4. Nothing separates the two buckets

This is the structural gap. The Bucket 2 audience is
`public.marketing_recipients(campaign_id)`:

```sql
select ... from public.email_engagement e
join public.email_campaigns c on c.campaign_id = p_campaign_id
where e.eligible                                   -- suppression, absolute
  and (c.kind = 'transactional'
       or e.engagement_group = any (c.target_groups))
  and not exists (select 1 from public.email_campaign_sends s
                  where s.campaign_id = c.campaign_id and s.email = e.email)
order by e.email;
```

There is **no concept of "currently in the welcome funnel"**. A person who signs
up on 11 November is in `email_engagement`, is `eligible`, and is in the
`inactive`/`active` group like everybody else — so they would receive the
welcome email *and* any Part 2 broadcast that fires while they are in it.

**That fails the spec's own acceptance test**, which requires that an eligible
new 11 November signup does **not** get the 12 November Cain email.

Also missing: any `welcome_complete` marker, and any record of which bucket a
subscriber belongs to as of the 11 November cutoff. Spec §5 requires the cohort
to be "anchored to the Nov 11 cutoff, not recomputed later based only on current
list membership" — there is nowhere to anchor it today.

---

## 5. What is already right, and should be reused rather than rebuilt

| Piece | Where | Why it fits the spec |
|---|---|---|
| **Per-step idempotency, free** | `email_campaign_sends`, keyed `(campaign_id, email)` | Five welcome steps as `welcome-1`…`welcome-5` get "never twice, ever, even after re-subscription" from the existing key. Spec §Bucket 1 asks for exactly this |
| **Suppression is absolute** | `email_suppressions` (766 rows), checked in the queue *and* re-checked per address immediately before each send | Unsubscribe, hard bounce and complaint already stop mail and cannot be undone by app activity |
| **Date-based broadcast** | `email_campaigns.scheduled_for` + `status` | Bucket 2 is already a shared-calendar broadcast, not a per-person drip. Spec §Bucket 2's core requirement is already the design |
| **No backfill by construction** | A campaign sends to whoever is eligible when it fires | "NEVER backfill or replay earlier campaign emails" is already true — a subscriber who joins later simply is not in the send of a campaign that already ran |
| **Welcome cutover** | `welcome.started_at` | Existing subscribers are never re-welcomed |
| **Rate limiting and give-up** | `rate_per_second`, `max_per_run`, auto-pause after repeated failure | Keeps SES reputation safe |

### The audience today

| | |
|---|---|
| `email_subscribers` | **5,584** |
| Eligible to receive marketing | **5,058** |
| Suppressed | **766** |
| Engagement mix (sample of 1,000) | 125 active, 78 quiet, 797 inactive |
| Welcome emails sent to date | 387 |
| Total campaign sends on record | 68,188 |

---

## 6. Conflicts needing Louis's decision

Technical work cannot start until these are settled, because they change what
gets built.

1. **Cain was already sent to 5,218 people on 28 October.** Options: skip Cain
   and start the new calendar on 15 Nov with the Eden rivers email; send it
   anyway as a deliberate re-send; or replace the 12 Nov slot with a different
   approved topic. **Recommendation: skip it and start on 15 Nov.** The approved
   12 Nov copy is kept for a later slot.
2. **`friday-03-study-guides` sends this Friday, 13 November.** It is
   superseded editorially but it is armed. Pause it, or let it go?
3. **27 November has two emails on it** — legacy `friday-04-read-the-context`
   and the approved Noah's Ark campaign. One has to move or stop.
4. **`friday-themed-thanksgiving-2026` is dated 20 November**, six days before
   Thanksgiving. Keep, move to 26 Nov, or replace?
5. **The `genesis-study-NN` series is the same thing as Part 2.** Continue
   numbering it, or start a new `nov-NN-*` series and mark the old one closed?
6. **Thirteen more legacy campaigns are armed into April 2027**, including
   `systeme-5303010`. Pause the lot, or keep the Christmas and New Year ones?

---

## 7. Proposed migration — nothing here has been done

### Phase 0 — stop the clock (needs approval, ~5 minutes)

Set `status = 'paused'` on the legacy nonholiday campaigns. Reversible: the rows,
their copy and their send history are untouched, and re-arming is one field.

- **Urgent, before Friday:** `friday-03-study-guides`
- Then: `friday-04-read-the-context`, and the nine other `friday-NN-*` rows
- **Hold for a separate decision:** the three `friday-themed-*` holiday rows and
  `systeme-5303010`

Nothing is deleted. Spec §6 and §Legacy: "Do not interpret 'all old emails are
gone' as deleting … live records without audit."

### Phase 1 — the bucket column

One nullable column, no backfill of behaviour:

```sql
alter table public.email_subscribers
  add column if not exists welcome_step smallint;      -- null = never enrolled
alter table public.email_subscribers
  add column if not exists welcome_completed_at timestamptz;
```

Then **anchor the cohort to the cutoff, once**: every subscriber that exists at
the 11 Nov cutoff gets `welcome_completed_at = cutoff` and
`welcome_step = 5` — they are Bucket 2, permanently, and can never be pulled
into the funnel by a later recomputation. That is spec §1 and §5.

### Phase 2 — Bucket separation in one line of SQL

Add to `marketing_recipients`:

```sql
and (e.welcome_completed_at is not null)
```

A subscriber in the funnel is then invisible to every Part 2 campaign, and
becomes visible for the **next** one after Welcome 5 — no backfill, because a
campaign that already ran is simply not re-run. This is the whole of spec §3 and
§4.

### Phase 3 — the five welcome steps

Five rows, `welcome-1` … `welcome-5`, `kind = transactional`, carrying the
approved bodies verbatim. The existing welcome cron grows a step pointer:
send step N+1 only if step N was sent and is at least a day old, then set
`welcome_completed_at` after step 5. `email_campaign_sends` provides the
"never twice" guarantee without new code.

**Blocked on two assets** the spec flags itself: the Day 1 Google Play URL (must
not be invented) and a publicly hosted URL for the Day 2 GIF and Day 3 image —
a Drive viewer link will not render in email. `/public` 404s until a deploy, so
these belong in Supabase storage as the existing email images do.

### Phase 4 — dry-run tests before anything is armed

The spec asks specifically for the 16 Nov → 18 Nov case.

| Test | Expected |
|---|---|
| Subscriber on the list before 11 Nov | `welcome_completed_at` set at cutoff → appears in the 15 Nov send |
| New signup on 11 Nov | `welcome_step` 1, `welcome_completed_at` null → **absent** from the 15 Nov recipient list |
| Same subscriber finishes Welcome 5 on 16 Nov | appears in the 18 Nov send, and **not** in any send dated before 16 Nov |
| Finishes on 19 Nov | first broadcast is 21 Nov, not 18 Nov |
| Any subscriber, any single date | appears at most once across both buckets |
| Unsubscribes mid-funnel | absent from both buckets immediately |
| Re-subscribes after completing | no welcome replay — `email_campaign_sends` already blocks it |

Each is a `SELECT` against `marketing_recipients` with a frozen date. No sends.
`sendCampaign` already takes a `dryRun` flag.

---

## 8. What I need from Louis

1. **The six decisions in §6**, starting with Friday's email — that one has a
   deadline of 13 November.
2. Approval to run **Phase 0** (pausing legacy rows) as a separate, reversible
   step, before any building.
3. The **Google Play URL** and permission to host the Day 2 GIF and Day 3 image
   in Supabase storage.

Nothing will be armed, scheduled, sent or migrated until each of these is
answered. The five welcome bodies and seven November bodies in the spec are
stored as approved copy and have not been written into the database.
