"use client";

import { supabase } from "./supabaseClient";
import { isNativeApp } from "./nativeApp";

/**
 * Google and Apple sign-in inside the iOS/Android app (Louis, 2026-10-13).
 *
 * The web flow does not work in the shell, and the reason is not obvious.
 * Capacitor hands any navigation that leaves www.mybiblebuddy.net to the
 * system browser, so `signInWithOAuth` sent people to Chrome. They signed in
 * there perfectly well - and the session was written to Chrome's storage. The
 * app never heard about it. Build 5 on a real phone did exactly this.
 *
 * Allow-listing accounts.google.com so the webview keeps the navigation is the
 * obvious fix and it does not work either: Google deliberately refuses OAuth
 * inside embedded webviews (disallowed_useragent). That refusal is the whole
 * reason the pattern below exists.
 *
 * So: open the provider in an in-app Safari sheet, which is a real browser and
 * which Google accepts, and have the provider send the result back to a custom
 * URL scheme that only this app answers. The app catches the deep link,
 * exchanges the code for a session, and closes the sheet.
 *
 * Three things have to agree or this silently fails:
 *   1. CFBundleURLTypes in Info.plist registers the scheme (scripts/ios-info-plist.sh)
 *   2. Supabase > Authentication > URL Configuration allows REDIRECT_URL
 *   3. The scheme matches the bundle id, net.mybiblebuddy.app
 *
 * ---------------------------------------------------------------------------
 * Build 6 on Louis's phone span forever on "Signing in with Google", and the
 * reason it span rather than failed is the shape of the old code: it opened
 * the sheet, returned, and then waited for a deep link that was the ONLY thing
 * that could ever end the attempt. Everything else - the person tapping Done,
 * the provider sending back an error, the sheet never appearing - left the
 * button disabled for good.
 *
 * So an attempt is now a promise with four ways to finish, and the UI simply
 * awaits it:
 *   1. the deep link arrives with a code      -> signed in
 *   2. the deep link arrives with an error    -> that error, readably
 *   3. the Safari sheet closes with no session-> cancelled
 *   4. nothing happens for 90 seconds         -> timed out, try again
 * Plus: whenever the app comes back to the foreground we re-check the session,
 * because a sign-in that completed in a way we did not see still counts.
 */

export const NATIVE_AUTH_SCHEME = "net.mybiblebuddy.app";
export const NATIVE_AUTH_REDIRECT = `${NATIVE_AUTH_SCHEME}://auth-callback`;

/** How long to wait before calling an attempt dead. */
const ATTEMPT_TIMEOUT_MS = 45_000;

/**
 * The deep link and the sheet closing race each other: iOS often reports the
 * sheet dismissed a beat before the URL reaches the app. Give the URL that
 * beat before concluding the person cancelled.
 */
const DISMISS_GRACE_MS = 1_200;

/** How many of those grace periods to wait before calling it a cancellation. */
const RESUME_LOOKS = 8;

/** How long Supabase gets to turn the code into a session. */
const EXCHANGE_TIMEOUT_MS = 20_000;


type Provider = "google" | "apple";

export type NativeSignInResult =
  | { ok: true }
  | { ok: false; reason: "cancelled" | "timeout" | "error"; message?: string };

let listenerAttached = false;
/** Set while the app is in the background with a sign-in attempt live. */
let leftForBrowser = false;

/**
 * Why the last deep link failed, kept for the screen that comes back.
 *
 * iOS may relaunch the app to deliver the callback rather than resuming it. In
 * that case the page that started the sign-in is gone, there is no attempt to
 * settle and no error box to write into - so without this, a failed exchange
 * is indistinguishable from never having tried. Read it once on mount.
 */
let pendingAuthError: string | null = null;

/**
 * A running note of what the native sign-in actually did (Louis, 2026-10-14).
 *
 * Five rounds have been spent guessing at this from the outside, because a
 * button that spins tells you nothing about which of five steps it is stuck
 * on. The welcome screen prints this line in the app so the next test says
 * where it died instead of that it died.
 *
 * Nothing secret goes in here: a callback URL is recorded as the names of its
 * parameters, never their values.
 */
const trail: string[] = [];

function note(step: string) {
  trail.push(step);
  if (trail.length > 8) trail.shift();
}

export function nativeAuthTrail(): string {
  return trail.join(" > ");
}

/** Parameter names only - never a code, a token or an email. */
function shape(url: string): string {
  try {
    const parsed = new URL(url);
    const keys = [
      ...Array.from(parsed.searchParams.keys()),
      ...Array.from(new URLSearchParams(parsed.hash.replace(/^#/, "")).keys()),
    ];
    return `${parsed.protocol}//${parsed.host}[${keys.join(",")}]`;
  } catch {
    return "unparseable";
  }
}

export function consumeNativeAuthError(): string | null {
  const message = pendingAuthError;
  pendingAuthError = null;
  return message;
}

/** Load the plugin only on a device; importing it on the web pulls in nothing useful. */
async function browserPlugin() {
  const { Browser } = await import("@capacitor/browser");
  return Browser;
}

async function appPlugin() {
  const { App } = await import("@capacitor/app");
  return App;
}

/**
 * Is this plugin actually in the installed binary?
 *
 * It matters because the JS half of a Capacitor plugin ships with the website,
 * which updates the moment Vercel deploys, while the native half only changes
 * when a new build is installed. A plugin added today is therefore "present"
 * in the page and absent from the app someone is holding, and what that looks
 * like depends on the plugin: @capacitor/browser quietly falls back to its web
 * implementation (window.open, which does nothing inside a WebView), and
 * @capacitor-community/apple-sign-in has no web half at all, so it throws
 * `"SignInWithApple" plugin is not implemented on ios`.
 *
 * Both are the same situation and both deserve the same sentence, which is:
 * update the app.
 */
export function nativePluginAvailable(name: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const capacitor = (window as unknown as {
      Capacitor?: { isPluginAvailable?: (name: string) => boolean };
    }).Capacitor;
    return Boolean(capacitor?.isPluginAvailable?.(name));
  } catch {
    return false;
  }
}

export const OUT_OF_DATE_BUILD =
  "This version of the app cannot finish sign-in. Install the newest Bible Buddy build from TestFlight, then try again.";

/* -------------------------------------------------------------------------- */
/* One attempt at a time                                                      */
/* -------------------------------------------------------------------------- */

type Attempt = {
  settle: (result: NativeSignInResult) => void;
  timer: number | null;
  graceTimer: number | null;
};

let attempt: Attempt | null = null;

function finish(result: NativeSignInResult) {
  const current = attempt;
  if (!current) return;
  attempt = null;
  if (current.timer !== null) window.clearTimeout(current.timer);
  if (current.graceTimer !== null) window.clearTimeout(current.graceTimer);
  current.settle(result);
}

/** True when a session exists now. Used to rescue attempts we lost track of. */
async function hasSession(): Promise<boolean> {
  try {
    const { data } = await supabase.auth.getSession();
    return Boolean(data?.session);
  } catch {
    return false;
  }
}

async function closeSheet() {
  try {
    const Browser = await browserPlugin();
    await Browser.close();
  } catch {
    // Already closed, or no sheet. Not a problem.
  }
}

/* -------------------------------------------------------------------------- */
/* Listeners                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Start listening for the provider sending us back. Safe to call repeatedly -
 * it attaches once. Call it high in the tree so the listeners exist before any
 * sign-in button can be pressed.
 *
 * `onSignedIn` fires for a sign-in that completes with no attempt in flight,
 * which is how a session that arrives late still gets someone to the
 * dashboard.
 */
export async function startNativeAuthListener(onSignedIn?: () => void) {
  if (!isNativeApp() || listenerAttached) return;
  listenerAttached = true;

  note(`app=${nativePluginAvailable("App") ? "yes" : "NO"}`);

  let App;
  try {
    App = await appPlugin();
  } catch (error) {
    note(`import-failed:${describe(error)}`);
    listenerAttached = false;
    throw error;
  }

  // NOT awaited, and that is the whole fix.
  //
  // Louis's trail read "app=yes > opened" - the step between them, the one
  // that says the callback listener is registered, never happened. Awaiting
  // addListener was waiting on a confirmation from the native bridge that
  // never arrived, so this function hung here on page load, every time,
  // silently. Nothing downstream ran: no appUrlOpen handler, no foreground
  // check. Chrome did its half perfectly and sent the result back to an app
  // with nobody listening, which is why five rounds of this looked like
  // Google failing.
  //
  // Registering the handler is what matters; being told it was registered is
  // not worth blocking on.
  App.addListener("appUrlOpen", ({ url }: { url: string }) => {
    note(`url:${shape(url)}`);
    void handleAuthUrl(url, onSignedIn);
  })
    .then(() => note("listening"))
    .catch((error: unknown) => note(`listen-failed:${describe(error)}`));

  // Coming back to the foreground. If a sign-in finished in a way we did not
  // observe - the deep link consumed while the webview was suspended, say -
  // the session is already there and nobody should be left staring at a
  // spinner.
  App.addListener("appStateChange", ({ isActive }: { isActive: boolean }) => {
    if (!isActive) {
      if (attempt) leftForBrowser = true;
      note("background");
      return;
    }
    note("foreground");
    void (async () => {
      if (await hasSession()) {
        finish({ ok: true });
        onSignedIn?.();
        leftForBrowser = false;
        return;
      }
      if (!leftForBrowser || !attempt) return;
      leftForBrowser = false;
      let looks = 0;
      const poll = window.setInterval(() => {
        void (async () => {
          if (!attempt) {
            window.clearInterval(poll);
            return;
          }
          if (await hasSession()) {
            window.clearInterval(poll);
            finish({ ok: true });
            onSignedIn?.();
            return;
          }
          if (++looks >= RESUME_LOOKS) {
            window.clearInterval(poll);
            finish({ ok: false, reason: "cancelled" });
          }
        })();
      }, DISMISS_GRACE_MS);
    })();
  }).catch(() => note("state-listen-failed"));

  // Launched rather than resumed: iOS is free to relaunch the app to deliver
  // the callback, and then appUrlOpen has already fired before any of this
  // exists. Time-boxed for the same reason as above.
  void withTimeout(App.getLaunchUrl(), 3_000, "launch-url-timeout")
    .then((launch) => {
      if (launch?.url) void handleAuthUrl(launch.url, onSignedIn);
    })
    .catch(() => note("no-launch-url"));

  // The belt to those braces. Any route to a session at all ends the attempt.
  supabase.auth.onAuthStateChange((event) => {
    if (event !== "SIGNED_IN" && event !== "TOKEN_REFRESHED") return;
    note("session");
    finish({ ok: true });
    onSignedIn?.();
  });

  if (nativePluginAvailable("Browser")) {
    const Browser = await browserPlugin();
    // The sheet was dismissed. Either the deep link is a moment behind it, or
    // the person tapped Done - wait out the grace period and then decide.
    void Browser.addListener("browserFinished", () => {
      const current = attempt;
      if (!current) return;
      current.graceTimer = window.setTimeout(() => {
        void (async () => {
          if (!attempt) return;
          if (await hasSession()) {
            finish({ ok: true });
            onSignedIn?.();
            return;
          }
          finish({ ok: false, reason: "cancelled" });
        })();
      }, DISMISS_GRACE_MS);
    });
  }
}

async function handleAuthUrl(url: string | undefined, onSignedIn?: () => void) {
  if (!url || !url.startsWith(NATIVE_AUTH_SCHEME)) return;

  // The sheet, if there is one, has done its job either way. Not awaited:
  // nothing about dismissing a window should be able to delay the exchange.
  void closeSheet();

  try {
    const parsed = new URL(url);
    // Supabase puts a refusal in the query string and, on the implicit flow,
    // in the fragment. Reading both is the difference between a readable
    // message and the old silent spinner.
    const hash = new URLSearchParams(parsed.hash.replace(/^#/, ""));
    const failure =
      parsed.searchParams.get("error_description") ??
      parsed.searchParams.get("error") ??
      hash.get("error_description") ??
      hash.get("error");
    if (failure) {
      pendingAuthError = readable(failure);
      finish({ ok: false, reason: "error", message: pendingAuthError });
      return;
    }

    // Supabase returns either ?code= (PKCE, what we ask for) or a
    // #access_token= fragment on older flows. Handle both rather than
    // assuming, because a silent failure here looks identical to a user who
    // simply gave up at the Google screen.
    const code = parsed.searchParams.get("code");
    if (code) {
      // Name this step when it fails. Everything up to here is Google's side
      // and the phone's; from here on it is Supabase, and when Supabase is
      // slow this is where a sign-in dies - which is indistinguishable, from
      // the button, from Google never having answered at all.
      note("exchanging");
      const { error } = await withTimeout(
        supabase.auth.exchangeCodeForSession(code),
        EXCHANGE_TIMEOUT_MS,
        "Google signed you in, but Bible Buddy could not reach its database. Try again.",
      );
      if (error) throw error;
    } else {
      const access_token = hash.get("access_token");
      const refresh_token = hash.get("refresh_token");
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({ access_token, refresh_token });
        if (error) throw error;
      } else {
        // Came back with no credentials and no error - usually "cancel".
        finish({ ok: false, reason: "cancelled" });
        return;
      }
    }
    note("signed-in");
    finish({ ok: true });
    onSignedIn?.();
  } catch (error) {
    // describe() never returns a token or a code - only the message.
    console.error("[nativeAuth] could not finish sign-in:", describe(error));
    pendingAuthError = error instanceof Error ? error.message : "Sign-in could not be completed.";
    finish({ ok: false, reason: "error", message: pendingAuthError });
  }
}

/** Never let a token or a code reach the log. */
function describe(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "unknown error";
}

function readable(raw: string): string {
  const text = raw.replace(/\+/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/* -------------------------------------------------------------------------- */
/* Apple: the native sheet                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Sign in with Apple, natively.
 *
 * This is the real iOS sheet - the one with Face ID and the user's own Apple
 * account already filled in - not a web page in a browser. iOS hands back an
 * identity token and Supabase accepts it directly, so nothing leaves the app
 * and there is no redirect to come back from.
 *
 * It also sidesteps the thing Supabase warns about on its own Apple settings
 * page: the OAuth "Secret Key" expires every six months and has to be
 * regenerated by hand. signInWithIdToken needs no secret at all - only the
 * bundle id listed under Client IDs, which is already set.
 *
 * Requires the com.apple.developer.applesignin entitlement in the built app
 * (scripts/ios-entitlements.sh) AND the plugin's native half, which first
 * shipped in build 7. Without the entitlement iOS refuses to present the sheet
 * and the error says nothing useful; without the native half the call throws
 * `"SignInWithApple" plugin is not implemented on ios`, which is what build 6
 * did.
 */
export async function signInWithAppleNatively(): Promise<NativeSignInResult | false> {
  if (!isNativeApp()) return false;

  if (!nativePluginAvailable("SignInWithApple")) {
    return { ok: false, reason: "error", message: OUT_OF_DATE_BUILD };
  }

  const { SignInWithApple } = await import("@capacitor-community/apple-sign-in");

  // A nonce ties the token Apple issues to this one request. Supabase checks
  // it, so a token captured elsewhere cannot be replayed here.
  const rawNonce = cryptoRandom();
  const hashedNonce = await sha256Hex(rawNonce);

  let result;
  try {
    result = await SignInWithApple.authorize({
      clientId: NATIVE_AUTH_SCHEME,
      redirectURI: NATIVE_AUTH_REDIRECT,
      scopes: "name email",
      nonce: hashedNonce,
    });
  } catch (error) {
    const message = describe(error);
    // 1001 is ASAuthorizationError.canceled; the plugin surfaces it as text.
    if (/cancel|1001/i.test(message)) return { ok: false, reason: "cancelled" };
    if (/not implemented/i.test(message)) {
      return { ok: false, reason: "error", message: OUT_OF_DATE_BUILD };
    }
    return { ok: false, reason: "error", message };
  }

  const idToken = result?.response?.identityToken;
  if (!idToken) return { ok: false, reason: "cancelled" };

  const { error } = await supabase.auth.signInWithIdToken({
    provider: "apple",
    token: idToken,
    nonce: rawNonce,
  });
  if (error) return { ok: false, reason: "error", message: error.message };
  return { ok: true };
}

/** Reject with a sentence worth reading rather than hanging. */
function withTimeout<T>(work: Promise<T>, ms: number, message: string): Promise<T> {
  return Promise.race([
    work,
    new Promise<T>((_, reject) => window.setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

function cryptoRandom() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/* -------------------------------------------------------------------------- */
/* Google (and Apple on the web): the Safari sheet                            */
/* -------------------------------------------------------------------------- */

/**
 * Sign in with Google or Apple from inside the app.
 *
 * Returns false when this is not the native app, so callers can fall through
 * to the ordinary web redirect rather than branching at every call site.
 * Otherwise it resolves only when the attempt is genuinely over, one way or
 * another - which is what stops the button spinning for ever.
 */
export async function signInWithProviderNatively(
  provider: Provider,
  onSignedIn?: () => void,
): Promise<NativeSignInResult | false> {
  if (!isNativeApp()) return false;

  // No Browser-plugin check and no in-app sheet. Two builds were spent on
  // SFSafariViewController and neither ever put a Google page on screen, so
  // the sheet is out of the critical path entirely - see openSignInPage.
  await startNativeAuthListener(onSignedIn);

  // skipBrowserRedirect hands us the URL instead of navigating the webview to
  // it - which is the whole point, because that navigation is what escaped to
  // Chrome in the first place.
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: NATIVE_AUTH_REDIRECT,
      skipBrowserRedirect: true,
    },
  });

  if (error || !data?.url) {
    return {
      ok: false,
      reason: "error",
      message: error?.message ?? "Could not start sign-in.",
    };
  }

  // Anything already in flight is abandoned, not left to time out.
  finish({ ok: false, reason: "cancelled" });

  const settled = new Promise<NativeSignInResult>((resolve) => {
    attempt = {
      settle: resolve,
      graceTimer: null,
      timer: window.setTimeout(() => {
        void closeSheet();
        finish({
          ok: false,
          reason: "timeout",
          message: "Sign-in took too long. Check your connection and try again.",
        });
      }, ATTEMPT_TIMEOUT_MS),
    };
  });

  // Nothing here is awaited in line. Browser.open resolves in UIKit's present
  // completion, and if UIKit never presents - the bridge's view controller is
  // already presenting something, say - that completion never runs and the
  // promise never settles. Awaiting it meant the timeout below fired into the
  // void while the caller sat on the await, which is the shape of the endless
  // spinner. The attempt's own promise is the only clock now.
  note("opened");
  openSignInPage(data.url);
  return settled;
}

/**
 * Get the provider's page in front of the person.
 *
 * This is the system browser, deliberately, and it is the third attempt at
 * this. What is established:
 *
 *   - Supabase is fine. Its authorize endpoint answers 302 to
 *     accounts.google.com with the right client id and callback; checked by
 *     hand on 2026-10-13.
 *   - Google refuses OAuth inside an embedded webview, so the page cannot
 *     simply load here.
 *   - SFSafariViewController, via @capacitor/browser, never showed anything on
 *     Louis's phone across builds 6 and 7, with the plugin's native half
 *     linked in both. Two rounds of making that path more patient did not move
 *     it, so it is no longer the route.
 *   - The system browser DOES work. Build 5 proved it: Louis signed in
 *     perfectly well there. The only thing wrong in build 5 was the return
 *     trip - the session was written to the browser's storage and the app
 *     never heard about it.
 *
 * The return trip is exactly what has been built since: the custom scheme is
 * registered in Info.plist, and @capacitor/app's appUrlOpen catches the deep
 * link. So the browser finishes the sign-in, iOS hands the callback to the
 * app, and the code is exchanged here - in the webview whose storage holds
 * the PKCE verifier, which is the half build 5 was missing.
 *
 * Nothing in this function can hang the attempt: there is no native call to
 * wait on, and no promise that resolves in a UIKit completion handler.
 */
function openSignInPage(url: string) {
  // _system asks Capacitor's WKWebView delegate for the real browser. If the
  // delegate is not there, a plain assignment gets the same treatment: an
  // off-domain navigation is handed to the system browser because
  // server.allowNavigation does not list the provider.
  try {
    const opened = window.open(url, "_system");
    if (opened) return;
  } catch {
    // Fall through.
  }
  window.location.href = url;
}
