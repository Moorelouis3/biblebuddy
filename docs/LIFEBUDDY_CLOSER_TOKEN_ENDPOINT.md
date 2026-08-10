# Life-Buddy prompt: token endpoint for The Closer

Paste everything between the lines into a Claude Code session on the
**Life-Buddy** repo. It is one endpoint, roughly forty lines.

Why this exists: The Closer runs in Bible Buddy on Vercel, because that is
where the public HTTPS webhook URL is. But the Meta credentials live in
Life-Buddy's SQLite (`facebook_auth`, `threads_auth`), and the Threads token
self-refreshes every ~60 days. Copying tokens into Vercel would go stale
silently, so The Closer asks for them at runtime instead.

---

Add one authenticated endpoint to this app so Bible Buddy's "Closer"
(comment to DM automation) can read the current Meta tokens at runtime
instead of holding stale copies.

Add `GET /api/social/tokens` to server.js, next to the other
CLAUDE_CODE_TOKEN-gated routes and following whatever auth pattern those
already use.

Auth: require an `Authorization: Bearer <token>` header. Compare against a
new env var `CLOSER_API_TOKEN` (add it to .env and to loadEnv.js if that
file enumerates keys). Reject with 401 if it is missing or wrong. Use a
constant-time comparison, the same way any other secret comparison in this
codebase does it. If there is no existing helper, `crypto.timingSafeEqual`
on equal-length buffers is fine.

Response shape, exactly this JSON:

```json
{
  "facebook": { "pageId": "...", "pageAccessToken": "..." },
  "instagram": { "userId": "..." },
  "threads":  { "userId": "...", "accessToken": "..." },
  "appSecret": "..."
}
```

Where each value comes from:

- `facebook` - `facebookAuth.getAuth()`, which returns `{ pageId,
  pageAccessToken }`. If Facebook is not connected it throws; catch that and
  return the `facebook` key as `null` rather than failing the whole request.
- `instagram.userId` - the Instagram business account id linked to the page.
  `instagram.js` already derives this via `getInstagramAccount()`. Reuse that
  rather than re-implementing the Graph call. If it is unavailable, return
  `null` for the `instagram` key. Do NOT return a separate Instagram token:
  Instagram runs on the Page token, and that is deliberate.
- `threads` - `threadsAuth.getValidAuth()`, which is async and refreshes the
  token when it is close to expiring. **Call that one, not `getAuthRow`.**
  Returning a fresh token is the entire point of this endpoint. Same
  null-on-not-connected handling.
- `appSecret` - the Meta app secret, if this app has one in env (something
  like `FACEBOOK_APP_SECRET` or `META_APP_SECRET`). Bible Buddy needs it to
  verify webhook signatures. If there is no such env var, return `null` and
  say so in your summary, and I will set it on the Bible Buddy side instead.

Constraints:

- Read only. This endpoint must never write, refresh-on-demand aside, and
  must never accept parameters that change what it returns.
- Do not log the token values.
- Do not add it to any public route list, dashboard page, or docs index.

When done, tell me the exact base URL I should give Bible Buddy as
`LIFEBUDDY_API_URL` (the origin only, no path), and confirm the endpoint
returns 200 with all four keys populated when called with a correct bearer
token, and 401 without one.

---

Then set on the Bible Buddy side, in Vercel:

- `LIFEBUDDY_API_URL` — the origin Life-Buddy reports back
- `LIFEBUDDY_API_TOKEN` — the same value as Life-Buddy's `CLOSER_API_TOKEN`

`/closer` will then show `credentialSource: "life-buddy"` and an empty
missing list.
