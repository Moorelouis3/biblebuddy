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
 */

export const NATIVE_AUTH_SCHEME = "net.mybiblebuddy.app";
export const NATIVE_AUTH_REDIRECT = `${NATIVE_AUTH_SCHEME}://auth-callback`;

type Provider = "google" | "apple";

let listenerAttached = false;

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
 * Start listening for the provider sending us back. Safe to call repeatedly -
 * it attaches once. Call it high in the tree so the listener exists before any
 * sign-in button can be pressed.
 */
export async function startNativeAuthListener(onSignedIn?: () => void) {
  if (!isNativeApp() || listenerAttached) return;
  listenerAttached = true;

  const App = await appPlugin();
  const Browser = await browserPlugin();

  await App.addListener("appUrlOpen", async ({ url }) => {
    if (!url || !url.startsWith(NATIVE_AUTH_SCHEME)) return;

    // The sheet has done its job either way - close it before anything that
    // can throw, so a failure never leaves a Safari sheet stuck on screen.
    try {
      await Browser.close();
    } catch {
      // Already closed. Not a problem.
    }

    try {
      // Supabase returns either ?code= (PKCE, what we ask for) or a
      // #access_token= fragment on older flows. Handle both rather than
      // assuming, because a silent failure here looks identical to a user
      // who simply gave up at the Google screen.
      const parsed = new URL(url);
      const code = parsed.searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw error;
      } else if (parsed.hash.includes("access_token")) {
        const params = new URLSearchParams(parsed.hash.replace(/^#/, ""));
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) throw error;
        }
      } else {
        // The provider sent us back with no credentials - usually "cancel".
        return;
      }
      onSignedIn?.();
    } catch (error) {
      console.error("[nativeAuth] could not finish sign-in:", error);
    }
  });
}

/**
 * Sign in with Google or Apple from inside the app.
 *
 * Returns false when this is not the native app, so callers can fall through
 * to the ordinary web redirect rather than branching at every call site.
 */
export async function signInWithProviderNatively(provider: Provider): Promise<boolean> {
  if (!isNativeApp()) return false;

  await startNativeAuthListener();

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
    throw error ?? new Error("Could not start sign-in.");
  }

  const Browser = await browserPlugin();
  await Browser.open({ url: data.url, presentationStyle: "popover" });
  return true;
}
