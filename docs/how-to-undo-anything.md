# How to undo anything from the free-platform work

Everything shipped on 2026-08-15/16 can be reversed. Most of it without
touching code.

---

## 1. Put the paywalls back (the big one)

**Vercel → Bible Buddy → Settings → Environment Variables:**

```
NEXT_PUBLIC_CORE_STUDY_FREE = false
```

Redeploy. That restores the old paid gating **exactly** — credits, the
one-devotional limit, the 24-hour drip, trivia and Scrambled locks, the
server-side paywall, the Pro upsells. Nothing was deleted; it is all still
there behind that flag.

Set it back to `true` (or delete the variable) to go free again.

## 2. Turn off the captcha

Two steps, **in this order**, or guest sign-in breaks in between:

1. Supabase → Authentication → Settings → disable CAPTCHA protection
2. Vercel → remove `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

If you never set it up, there is nothing to undo — the code is inert without
the key.

## 3. Let guests back into the community, or lock them out again

**Lock guests out** (they can read and study, not post):
run `supabase/migrations/BLOCK_ANONYMOUS_COMMUNITY_WRITES.sql`

**Let guests comment again:**
run `supabase/migrations/ALLOW_GUEST_COMMENTS.sql`

Both are additive and safe to re-run. Direct messages and buddy requests stay
account-only in both.

## 4. Stop guests being created at all

Supabase → Authentication → Providers → turn **Anonymous** off.

The app degrades gracefully: "Start Studying Now" falls back to the signup
form, and nothing errors.

## 5. Undo a specific code change

Every change is one commit. To reverse one:

```
git revert <commit> && git push origin main
```

Add `[deploy]` to the revert commit message or Vercel will not rebuild.

Key commits:

| What | Commit |
|---|---|
| Made the app free | `ddb20ae` |
| Removed proxy.ts server paywall + Pro upsell | `41ced8c` |
| Landing page starts a guest journey | `873966b` |
| The /start chooser | `30c3e4a` |
| Guests comment after profile, not signup | `0a922ae` |
| Louis chat safety net | `b0d227a` |
| User count = registered + guests | `c824bed` |
| Turnstile captcha (inert) | `16de2b0` |
| Dashboard pass 1: study modes | `987149a` |
| Stopped pitching Pro to guests | `979ac58` |

## 6. Undo the database change

The only schema change was **additive** — four columns on `profile_stats`
(`account_type`, `guest_started_at`, `registered_at`, `converted_from_guest_at`).
Nothing was dropped or rewritten. To remove them:

```sql
ALTER TABLE public.profile_stats
  DROP COLUMN IF EXISTS account_type,
  DROP COLUMN IF EXISTS guest_started_at,
  DROP COLUMN IF EXISTS registered_at,
  DROP COLUMN IF EXISTS converted_from_guest_at;
```

You would lose the guest-conversion metric. Nothing else depends on them —
the user count reads Supabase Auth, not these columns.

## 7. Things that are NOT reversible from here

- **Stripe subscriptions you cancel.** Cancelling is permanent; the customer
  would have to re-subscribe.
- **The guest accounts already created.** Harmless, but they exist.

## Deploy gotcha, every time

Vercel only builds when the **newest** commit message contains `[deploy]`.
If you merge a tagged release, the merge commit itself needs the tag, or the
build silently never runs and the code sits on `main` doing nothing.

## Test account

There is one guest account (`496309d4-c078-4c90-a8ff-47646af1d3ab`,
"Claude Test") kept deliberately so Claude can log into the app. Delete it any
time; nothing depends on it.
