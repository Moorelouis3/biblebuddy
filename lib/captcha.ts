"use client";

/**
 * Cloudflare Turnstile — bot protection for guest account creation.
 *
 * Every guest is a real Supabase user and counts toward monthly active users,
 * so a bot hitting the landing page in a loop costs real money. Turnstile is
 * free, usually invisible to the user, and Supabase supports it natively.
 *
 * INERT UNTIL CONFIGURED. With no NEXT_PUBLIC_TURNSTILE_SITE_KEY set,
 * getCaptchaToken() returns undefined immediately and sign-in behaves exactly
 * as it does today. That means this can ship before the keys exist without
 * breaking anything.
 *
 * ORDER OF SETUP MATTERS:
 *   1. Add NEXT_PUBLIC_TURNSTILE_SITE_KEY in Vercel and redeploy.
 *   2. THEN turn captcha on in Supabase with the secret key.
 * Doing it the other way round breaks guest sign-in in between, because
 * Supabase would demand a token the app is not yet sending.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TIMEOUT_MS = 8000;

type Turnstile = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      size?: "invisible" | "normal" | "compact";
      callback?: (token: string) => void;
      "error-callback"?: () => void;
      "timeout-callback"?: () => void;
    },
  ) => string;
  execute: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let scriptPromise: Promise<boolean> | null = null;

function loadScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.turnstile) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<boolean>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(Boolean(window.turnstile)));
      existing.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(Boolean(window.turnstile));
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * Returns a Turnstile token, or undefined when captcha is not configured or
 * could not run.
 *
 * Never throws and never hangs: it resolves undefined after TIMEOUT_MS so a
 * slow or blocked Cloudflare cannot leave someone staring at a dead button.
 */
export async function getCaptchaToken(): Promise<string | undefined> {
  if (!SITE_KEY || typeof window === "undefined") return undefined;

  const ready = await loadScript();
  const turnstile = window.turnstile;
  if (!ready || !turnstile) {
    console.warn("[CAPTCHA] Turnstile did not load — continuing without a token");
    return undefined;
  }

  const host = document.createElement("div");
  host.style.display = "none";
  document.body.appendChild(host);

  let widgetId: string | null = null;

  const cleanup = () => {
    try {
      if (widgetId) turnstile.remove(widgetId);
    } catch {
      // Widget may already be gone; nothing to do.
    }
    host.remove();
  };

  return new Promise<string | undefined>((resolve) => {
    let settled = false;
    const finish = (token?: string) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(token);
    };

    const timer = window.setTimeout(() => {
      console.warn("[CAPTCHA] Timed out — continuing without a token");
      finish(undefined);
    }, TIMEOUT_MS);

    try {
      widgetId = turnstile.render(host, {
        sitekey: SITE_KEY,
        size: "invisible",
        callback: (token: string) => {
          window.clearTimeout(timer);
          finish(token);
        },
        "error-callback": () => {
          window.clearTimeout(timer);
          console.warn("[CAPTCHA] Turnstile reported an error");
          finish(undefined);
        },
        "timeout-callback": () => {
          window.clearTimeout(timer);
          finish(undefined);
        },
      });

      turnstile.execute(widgetId);
    } catch (err) {
      window.clearTimeout(timer);
      console.error("[CAPTCHA] Could not run Turnstile:", err);
      finish(undefined);
    }
  });
}

/** True when a site key is configured, so callers can log or branch if needed. */
export const CAPTCHA_ENABLED = Boolean(SITE_KEY);
