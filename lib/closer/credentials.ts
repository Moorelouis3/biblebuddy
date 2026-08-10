// Where The Closer gets its Meta tokens.
//
// Life Buddy is the system of record. It holds them in SQLite (facebook_auth,
// threads_auth), not in env vars, which is why they cannot simply be copied
// here. Two facts drove this design:
//
//   1. The Facebook PAGE token also covers Instagram. instagram.js in Life
//      Buddy derives the IG business account from the linked page using that
//      same token, so there is no separate Instagram credential to chase.
//   2. The Threads token self-refreshes roughly every 60 days, in Life
//      Buddy's database. A copy pasted into Vercel would go stale silently
//      and The Closer would stop answering Threads with no obvious cause.
//
// So this fetches from Life Buddy instead of holding copies, and caches
// briefly so a busy post does not hammer it. Direct env vars still work and
// take priority, which keeps local testing and an emergency override simple.

export type CloserCredentials = {
  facebookPageId: string;
  pageAccessToken: string;
  instagramUserId: string;
  threadsUserId: string;
  threadsToken: string;
  appSecret: string;
  source: "env" | "life-buddy" | "none";
};

const CACHE_MS = 5 * 60 * 1000;
let cached: { at: number; value: CloserCredentials } | null = null;

function fromEnv(): CloserCredentials {
  return {
    facebookPageId: process.env.FACEBOOK_PAGE_ID || "",
    pageAccessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "",
    instagramUserId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || "",
    threadsUserId: process.env.THREADS_USER_ID || "",
    threadsToken: process.env.THREADS_ACCESS_TOKEN || "",
    appSecret: process.env.META_APP_SECRET || "",
    source: "env",
  };
}

function isComplete(credentials: CloserCredentials) {
  return Boolean(credentials.pageAccessToken && credentials.facebookPageId);
}

export async function getCloserCredentials(): Promise<CloserCredentials> {
  const envCredentials = fromEnv();
  if (isComplete(envCredentials)) return envCredentials;

  const baseUrl = process.env.LIFEBUDDY_API_URL;
  const token = process.env.LIFEBUDDY_API_TOKEN;
  if (!baseUrl || !token) return { ...envCredentials, source: "none" };

  if (cached && Date.now() - cached.at < CACHE_MS) return cached.value;

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/social/tokens`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[CLOSER] Life Buddy token fetch failed:", response.status, (await response.text()).slice(0, 200));
      return { ...envCredentials, source: "none" };
    }

    const data = (await response.json()) as {
      facebook?: { pageId?: string; pageAccessToken?: string };
      instagram?: { userId?: string };
      threads?: { userId?: string; accessToken?: string };
      appSecret?: string;
    };

    const value: CloserCredentials = {
      facebookPageId: data.facebook?.pageId || envCredentials.facebookPageId,
      pageAccessToken: data.facebook?.pageAccessToken || envCredentials.pageAccessToken,
      instagramUserId: data.instagram?.userId || envCredentials.instagramUserId,
      threadsUserId: data.threads?.userId || envCredentials.threadsUserId,
      threadsToken: data.threads?.accessToken || envCredentials.threadsToken,
      // The app secret is app level rather than per account, so it may come
      // from either side. Whichever has it wins.
      appSecret: envCredentials.appSecret || data.appSecret || "",
      source: "life-buddy",
    };

    cached = { at: Date.now(), value };
    return value;
  } catch (error) {
    console.error("[CLOSER] Life Buddy token fetch threw:", error);
    return { ...envCredentials, source: "none" };
  }
}

export function clearCredentialCache() {
  cached = null;
}
