# The Closer v1 — build report

Comment-to-DM automation for Instagram, Facebook and Threads. Replaces ManyChat for Bible Buddy.

**Status: built, tested, and shipped in dry-run. Not deployed to Meta, and not wired to live credentials — see section 4, which is the honest part of this report.**

---

## 1. What was built and how it connects

A comment arrives → the webhook verifies it really came from Meta → the comment is normalized → if it contains a trigger word, the service claims it in the database, then sends.

```
Instagram ─┐
Facebook  ─┴─► POST /api/closer/webhook ──┐
                (signature verified)      │
                                          ├─► processComment()
Threads ──────► /api/cron/closer-threads-poll ──┘   │
                (polled every 15 min)               │
                                                    ├─ no trigger      → skipped_no_trigger
                                                    ├─ already seen    → skipped_duplicate
                                                    ├─ dry_run on      → skipped_dry_run
                                                    ├─ over hourly cap → skipped_rate_limited
                                                    ├─ IG/FB → private reply DM   → dm_sent
                                                    │        └ refused → public reply → dm_failed_fallback_posted
                                                    └─ Threads → public reply     → public_reply_sent
```

| File | Role |
| --- | --- |
| `app/api/closer/webhook/route.ts` | GET handshake + POST receiver for Instagram and Facebook |
| `app/api/cron/closer-threads-poll/route.ts` | Threads polling, every 15 min via `vercel.json` |
| `lib/closer/process.ts` | The decision tree. Claim, trigger, cap, DM, fallback |
| `lib/closer/meta.ts` | Every outbound call to Meta, isolated in one file |
| `lib/closer/config.ts` | Config loading from Supabase, trigger matching |
| `app/closer/page.tsx` | Password-protected status page |
| `app/api/closer/admin/route.ts` | Status data + the dry-run toggle |
| `CREATE_CLOSER_TABLES.sql` | `closer_events`, `closer_config` |
| `scripts/closer-simulate.ts` | Offline simulation |

---

## 2. Decisions I made on my own

**Built in Bible Buddy, not Life-Buddy.** You asked mid-build whether to move it to Life-Buddy since the API keys are there. I could not: `add_repo` for Life-Buddy was blocked by the permission classifier in this session. But the spec asks for Next.js API routes deploying to Vercel with Supabase storage — that *is* Bible Buddy. Life-Buddy is the Express service. Env vars are a copy-paste; the wrong stack is not. Copy the Meta values from Life-Buddy into Bible Buddy's Vercel environment.

**One webhook endpoint, not two.** Meta delivers every product's webhooks for an app to the same callback URL and identifies the product in the top-level `object` field. Two routes would mean registering one and wondering why the other never fired.

**Signature verification is mandatory, not optional.** The endpoint checks `X-Hub-Signature-256` against `META_APP_SECRET` and rejects anything that fails. Without it, the URL is a public trigger for sending DMs from your accounts to anyone an attacker names.

**Claim before send.** The row is written *before* the message goes out, and `(platform, comment_id)` is a unique index. A webhook retry, a redeploy mid-send, or two instances racing all lose the insert rather than send twice. This matters more than usual: Meta allows exactly **one** private reply per comment, ever — a duplicate doesn't just annoy someone, it burns the only chance to reach them.

**Transient DM failures do not fall back.** If the DM fails for a reason that might succeed later (network, 500, throttle), the event is logged as an error and *no* public comment is posted. Posting "just sent you the link in your DMs" when no DM went out would be a lie to the reader. Only permanent refusals (private account, no prior connection, policy) trigger the fallback.

**Word-boundary trigger matching.** Plain substring matching would fire "APP" on *happy*, "LINK" on *blinking*, "STUDY" on *studying*. Matching on word boundaries fixes that; it is verified in the simulation.

**Config fails closed.** If the config row can't be read, the service falls back to `dry_run: true`. A query hiccup should not mean sending live messages with default wording.

**Sequential sends with a 600ms gap.** Meta documents roughly 2 messaging calls/sec per account. A burst from one popular post is exactly how an app gets throttled.

**RLS enabled with no policy** on both tables. The service uses the service-role key which bypasses RLS; this means nothing reachable via the public anon key can read commenter handles or message history.

**Threads is polled, not pushed.** Threads webhook coverage for replies could not be confirmed (see section 4), so this takes the option that definitely works.

---

## 3. Simulation results

`npx tsx scripts/closer-simulate.ts` — no network calls. Real webhook parsing, real trigger matching, real claim/dedupe, real decision tree; only Supabase and the Meta senders are stubbed.

**Live mode:**

```
[skipped_no_trigger       ] instagram  ig_comment_plain     No trigger word in comment
[dm_sent                  ] instagram  ig_comment_trigger   DM sent (trigger: BIBLE)
[dm_failed_fallback_posted] instagram  ig_comment_private   DM refused (code 2534037: This person
                                                            cannot be messaged). Public fallback posted.
[dm_sent                  ] facebook   fb_comment_trigger   DM sent (trigger: APP)
[public_reply_sent        ] threads    threads_reply_1      Threads reply posted
```

**Webhook retry of an already-processed comment:** `skipped_duplicate — Already processed`. Nothing re-sent.

**Dry run:** all five became `skipped_dry_run`, each logging the exact message it would have sent. Nothing sent.

**Trigger matching:**

| Comment | Result |
| --- | --- |
| `BIBLE please` | BIBLE |
| `bible please` | BIBLE (case insensitive) |
| `Send the LINK!` | LINK (punctuation) |
| `I am so happy today` | none (correctly ignores *happy*) |
| `blinking lights` | none (correctly ignores *blinking*) |
| `studying tonight` | none (correctly ignores *studying*) |

`npx tsc --noEmit` clean.

---

## 4. What I could NOT complete, and exactly why

You asked me to find the credentials, deploy, and complete the Meta dashboard setup in Chrome myself. **None of those three were possible from this session.** I searched thoroughly before concluding it.

**Credentials do not exist in this project.** I checked: no `.env` file (gitignored, and this is a fresh clone), no Meta-related environment variables set in the container, and no reference to any Meta/Instagram/Facebook/Threads token anywhere in the codebase. The only env vars this project uses are Supabase, Stripe, OpenAI, Bunny, Systeme, VAPID and cron secrets. You then said they're in Life-Buddy — and `add_repo` for that repo was blocked by the permission classifier, so I could not read them either.

**I cannot deploy or do the Meta dashboard setup.** Both need credentials I don't have and shouldn't have: a Vercel token, and your Meta login with 2FA. Driving a browser through your Meta account is not something I should attempt even with a browser available.

**Meta's documentation is blocked here.** `developers.facebook.com` is refused by this environment's egress proxy, as are the third-party mirrors I tried. I built the endpoint shapes from what search results could confirm about Meta's documented behaviour, and isolated **every** outbound call in `lib/closer/meta.ts` with that caveat written at the top. The shapes follow standard Graph API conventions, but **treat the first live call as the real verification.** Dry-run defaults to on precisely so that first call happens under supervision.

**So there is no live webhook event row to show you.** Section 5 is what produces it.

### Where the credentials actually live (updated after reading Life-Buddy)

Life-Buddy was attached read-only and inspected. The Meta credentials are **not in any file you could have copied** — they are rows in Life-Buddy's SQLite database:

- `facebook_auth` → `page_id`, `page_access_token` (`facebookAuth.js`)
- `threads_auth` → `access_token`, `user_id` (`threadsAuth.js`)

Two findings changed the design:

1. **There is no separate Instagram credential.** `instagram.js` derives the IG business account from the linked Page and calls the Graph API with that same Page token. One token covers both.
2. **The Threads token self-refreshes every ~60 days** inside Life-Buddy, off the current token via the `th_refresh_token` grant. A copy pasted into Vercel would go stale silently and Threads replies would stop with no obvious cause.

So The Closer **asks Life-Buddy for the tokens at runtime** rather than holding copies (`lib/closer/credentials.ts`), cached 5 minutes. Direct env vars still take priority, which keeps local testing and an emergency override simple.

### Environment variables to set in Vercel

| Variable | What it is |
| --- | --- |
| `LIFEBUDDY_API_URL` | Life-Buddy's base URL |
| `LIFEBUDDY_API_TOKEN` | Shared secret for the token endpoint |
| `META_APP_SECRET` | App secret, for webhook signature verification |
| `META_WEBHOOK_VERIFY_TOKEN` | Any string you choose; paste the same one into Meta's dashboard |
| `CLOSER_ADMIN_PASSWORD` | Password for `/closer` |
| `THREADS_USERNAME` | Your handle, so it never replies to itself |
| `META_GRAPH_API_VERSION` | Optional, defaults to `v21.0` |

That is **five values instead of eight**, and none of them is a token that expires.

The override path (`FACEBOOK_PAGE_ID`, `FACEBOOK_PAGE_ACCESS_TOKEN`, `INSTAGRAM_BUSINESS_ACCOUNT_ID`, `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN`) still works if ever needed.

`/closer` lists whatever is still missing and shows whether credentials resolved from `env`, `life-buddy`, or `none`.

### The one thing Life-Buddy needs

Life-Buddy could only be attached read-only, so the endpoint had to be specified rather than written. `docs/LIFEBUDDY_CLOSER_TOKEN_ENDPOINT.md` is a prompt to paste into a Life-Buddy Claude Code session; it adds `GET /api/social/tokens`, gated by a bearer token, returning the current Facebook page token and id, the derived Instagram user id, and a **freshly refreshed** Threads token.

---

## 5. Your go-live checklist

1. **Run `CREATE_CLOSER_TABLES.sql`** in Supabase. Ships with `dry_run = true`.
2. **Set the environment variables** above in Vercel, copying the Meta values from Life-Buddy. Redeploy.
3. **Open `/closer`** and confirm it loads and reports no missing variables.
4. **Register the webhook** in the Meta dashboard: callback `https://www.mybiblebuddy.net/api/closer/webhook`, verify token matching `META_WEBHOOK_VERIFY_TOKEN`. Subscribe Instagram to the `comments` field and the Facebook page to `feed`.
5. **Comment on one of your own posts** from a second account with the word BIBLE. A row should appear at `/closer` within seconds, status `skipped_dry_run`, showing the message it would have sent. **This is the step that verifies the endpoint shapes I could not confirm against the docs.**
6. **Leave it in dry-run for a day.** Read the log. Check the triggers are firing on the comments you'd want and not on ones you wouldn't.
7. **Flip dry-run off** with the button on `/closer`. It asks for confirmation.
8. **Do one live test** from the second account and confirm the DM actually arrives.
9. Watch the first hour. The cap is 100 actions/hour; raise it in `closer_config` once you trust it.

If step 5 produces nothing, the likely causes in order: webhook not verified in the dashboard, `META_APP_SECRET` wrong so the signature check rejects it (logged as `[CLOSER] Rejected webhook`), or the page not subscribed to the right field.
