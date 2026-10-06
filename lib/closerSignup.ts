/**
 * Credits the comment reply that brought someone here, when they sign up.
 *
 * Every link Content Buddy's commenter posts carries `?r=<code>`, and it counts
 * the clicks. Nothing ever told it what happened next, because the half of the
 * loop that reports a signup back was designed and never built - so the Closer
 * screen read 7,238 clicks against zero signups in every window, and the only
 * number Louis judges that work by was always a flat zero.
 *
 * Shared by the landing page and the signup page because an account can be
 * created from either.
 */

const CLOSER_CODE_KEY = "bb:closer-code";

/**
 * The code that brought this visitor, remembered across the visit.
 *
 * localStorage rather than sessionStorage: people read for a while, wander off
 * and come back in a new tab before signing up, and that is still the same
 * reply that brought them. A fresh code replaces an older one, because if
 * someone arrives again through a newer reply, that is the one that worked.
 */
export function rememberCloserCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("r");
    if (fromUrl) {
      const code = fromUrl.trim().toUpperCase();
      window.localStorage.setItem(CLOSER_CODE_KEY, code);
      return code;
    }
    return window.localStorage.getItem(CLOSER_CODE_KEY);
  } catch {
    return null;   // private browsing or blocked storage: not worth an error
  }
}

/**
 * Reports the signup, then forgets the code so it is only counted once.
 *
 * Deliberately silent on failure: someone who has just created an account must
 * never see an error because a statistic could not be filed.
 */
export function reportCloserSignup(): void {
  const code = rememberCloserCode();
  if (!code) return;
  void fetch("/api/closer-signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
    keepalive: true,       // survives the redirect that follows a signup
  })
    .then(() => {
      try { window.localStorage.removeItem(CLOSER_CODE_KEY); } catch { /* nothing to clean up */ }
    })
    .catch(() => { /* a statistic must never break a signup */ });
}
