# Turnstile captcha setup (guest sign-ins)

The code is shipped and **inert**. Nothing happens until the keys exist, so the
app behaves exactly as it does now until you finish these steps.

## Why

Every guest is a real Supabase user and counts toward monthly active users. A
bot looping the landing page would create thousands of them and run up the bill.
Turnstile is free and usually invisible — real people never see a puzzle.

## Steps — order matters

**1. Get the keys (free, ~2 minutes)**
- Go to `dash.cloudflare.com` → **Turnstile** → **Add site**
- Domain: `mybiblebuddy.net`
- Widget type: **Managed** (or Invisible)
- You get a **Site key** (public) and a **Secret key** (private)

**2. Vercel FIRST**
- Vercel → Bible Buddy → Settings → Environment Variables
- Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = your **Site key**
- Redeploy

**3. Supabase SECOND**
- Supabase → Authentication → Settings → **Enable CAPTCHA protection**
- Provider: **Turnstile**
- Paste the **Secret key**
- Save

**Do not do step 3 before step 2.** Supabase would start demanding a token the
app is not yet sending, and guest sign-in would break in between.

## Checking it works

Open the site in a private window and click "Start Studying Now". It should
behave exactly as before — no visible puzzle. If it works, captcha is running
silently. Browser console shows `[CAPTCHA]` warnings only when something fails.

## How it fails

`getCaptchaToken()` never throws and never hangs — it gives up after 8 seconds
and returns nothing, so a slow or blocked Cloudflare cannot leave someone
staring at a dead button.

Note the interaction: if Cloudflare is unreachable **and** Supabase is enforcing
captcha, guest sign-in fails until Cloudflare recovers. That is the intended
trade — a temporary outage beats an open door.

## Turning it off

Remove `NEXT_PUBLIC_TURNSTILE_SITE_KEY` from Vercel **and** disable captcha in
Supabase. Same order caution applies: disable in Supabase first, then remove the
key.

## Files

- `lib/captcha.ts` — loads Turnstile, gets a token, fails open
- `lib/guestSession.ts` — passes the token on guest creation
- `app/page.tsx` — same, for the older landing questionnaire path
