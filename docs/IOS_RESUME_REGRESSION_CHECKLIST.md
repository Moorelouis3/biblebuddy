# iOS resume: what to check, and what froze

Reported 7 November 2026: the iPhone app stops responding after being left
open. Backgrounding the phone, or just letting it sit, and coming back later
leaves a screen that will not answer a tap. Force-quitting and reopening is
the only way back in.

## The cause

The app is the live site inside a WKWebView (`capacitor.config.ts` loads
`https://www.mybiblebuddy.net/app`), so iOS suspends the page every time the
phone locks or another app comes forward.

supabase-js serialises every auth call behind one exclusive Web Lock named
`lock:sb-<project-ref>-auth-token`, and asks for it with an acquire timeout of
`-1` — wait forever. `getSession`, `getUser`, `refreshSession` and `signOut`
all go through it, and this app calls those from 271 places, with most screens
refusing to render until one answers.

Suspend the page while a token refresh is in flight and that request never
settles, so the callback holding the lock never returns, so the lock is never
released. Every auth call made afterwards queues behind it and none of them
ever run. Nothing crashes and nothing errors — the screen simply stops
answering. Force-quitting works because a new page context gets a new
LockManager.

`components/AppShell.tsx` already carried a note about this and wrapped its own
`getSession` in an 8s timeout. That covered one call site out of 271. The fix
bounds the lock itself instead.

## Proved in a browser, both ways

Hold the lock and never release it — the same state a suspended page leaves
behind:

```js
window.__jam = new Promise(() => {});
navigator.locks.request('lock:sb-<project-ref>-auth-token', { mode: 'exclusive' }, () => window.__jam);
```

Then move around the app (client-side navigation only — a reload releases the
lock with the page) and watch `(await navigator.locks.query()).pending.length`.

| | Feed after 30s | Pending auth calls |
|---|---|---|
| Before the fix | grey skeletons, never loads | 17, and climbing, forever |
| After the fix | loads in full | drains to 0 and stays there |

## Manual checklist for an iOS build

Run signed in, on a real device, with the app left on the dashboard unless a
row says otherwise.

- [ ] Lock the phone, wait 2 minutes, unlock → the app responds to a tap at once.
- [ ] Lock the phone, wait 30+ minutes, unlock → same.
- [ ] Switch to another app, come back after 10 minutes → same.
- [ ] Leave it open and idle for an hour on the dashboard → still responds.
- [ ] Background and foreground ten times in a row → no slowdown, no freeze.
- [ ] Background it while the feed or a chapter is still loading, return → it finishes or fails visibly, never hangs.
- [ ] Turn airplane mode on, use the app, turn it off, background and return → recovers.
- [ ] Go through a tunnel / lose signal mid-request, then return → recovers.
- [ ] Leave it backgrounded past the access token's hour, return → still signed in, no re-login.
- [ ] Repeat the above on the Bible reader, the feed, messages and a devotional day, since each gates on auth separately.
- [ ] Check that signing out and back in still works.

## Still true after the fix

A single call can still fail — a request now aborts after 30 seconds rather
than hanging. That surfaces as a normal error path, not a freeze. If a screen
is found that shows a spinner forever on that error rather than a retry, that
screen needs its own handling; the lock is no longer the reason.

## Where the fix lives

- `lib/supabaseAuthLock.ts` — the bounded lock and the request timeout.
- `lib/supabaseClient.ts` — passes both to `createBrowserClient`.
- `scripts/verify-supabase-auth-lock.ts` — `npm run verify:auth-lock`, no network or database.

It is web code, so it ships with an ordinary deploy and fixes iOS, Android and
the website together. No new App Store build and no Apple review.
