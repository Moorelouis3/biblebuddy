"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isExternalUrl, isNativeApp } from "@/lib/nativeApp";

/**
 * When iOS or Android hands the app a mybiblebuddy.net link, go to that page.
 *
 * Louis, 2026-11-08: "the emails open the web version of the app in chrome on
 * my iphone, can we make it open the app on ios or android instead of the
 * website?" The operating system half of that is Universal Links (iOS) and App
 * Links (Android), set up in scripts/ios-entitlements.sh,
 * scripts/android-deep-links.mjs and app/api/well-known/. This is the last
 * step: the OS opens the app and reports the URL, and somebody has to act on
 * it. Without this the app opens on whatever page it was last showing and the
 * link the reader actually tapped is lost - which looks more broken than
 * Chrome did.
 *
 * The shell loads the live site (capacitor.config.ts server.url), so the
 * webview is already on our own origin and "handling" a link is just a
 * client-side navigation to its path. No URL scheme parsing, no mapping table.
 *
 * Deliberately NOT part of lib/nativeAuth.ts, which has an appUrlOpen listener
 * of its own. That one is attached only while a sign-in is in flight and is
 * torn down with the attempt; this has to be listening for the whole life of
 * the app. They stay out of each other's way: anything that looks like an auth
 * callback is left alone here and handled there.
 *
 * Does nothing on the web.
 */
export default function NativeDeepLinks() {
  const router = useRouter();

  useEffect(() => {
    if (!isNativeApp()) return;

    let cancelled = false;
    // Capacitor's addListener resolves a handle; removing the listener on
    // unmount needs it, and it arrives after the listener is already live.
    let remove: (() => void) | null = null;

    /**
     * A sign-in finishing, not a link somebody tapped.
     *
     * Supabase puts its tokens in the URL and PKCE comes back with ?code=.
     * lib/nativeAuth.ts owns those; pushing the browser somewhere else
     * mid-exchange strands the sign-in. The association file already excludes
     * /login and friends so these should not arrive as universal links at
     * all, but getLaunchUrl below reports whatever opened the app, including
     * the custom-scheme OAuth callback.
     */
    const isAuthCallback = (url: string) =>
      url.includes("access_token") ||
      url.includes("refresh_token") ||
      url.includes("code=") ||
      /\/(login|signup|reset-password)(\/|\?|#|$)/.test(url);

    const go = (raw: string | null | undefined) => {
      if (cancelled || !raw) return;
      if (isAuthCallback(raw)) return;

      let target: URL;
      try {
        target = new URL(raw, window.location.href);
      } catch {
        return;
      }
      // Only our own https pages. Anything else is either the OAuth custom
      // scheme or a link that belongs in the system browser, and neither is
      // this component's business.
      if (target.protocol !== "https:") return;
      if (isExternalUrl(target.href)) return;

      const path = `${target.pathname}${target.search}${target.hash}`;
      // Already there - a cold start that landed on the right page anyway.
      if (path === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        return;
      }
      router.push(path);
    };

    void (async () => {
      let App;
      try {
        ({ App } = await import("@capacitor/app"));
      } catch {
        // The plugin is not in this build; nothing to listen to.
        return;
      }
      if (cancelled) return;

      // NOT awaited. Awaiting addListener is what silently hung native sign-in
      // for five rounds - see the comment in lib/nativeAuth.ts. Registering the
      // handler is what matters; being told it was registered is not worth
      // blocking on.
      App.addListener("appUrlOpen", ({ url }: { url: string }) => go(url))
        .then((handle) => {
          if (cancelled) {
            void handle.remove();
            return;
          }
          remove = () => void handle.remove();
        })
        .catch(() => {
          /* No listener; links keep opening the browser, as before. */
        });

      // Launched rather than resumed: the OS can start the app cold to deliver
      // the link, and then appUrlOpen has already fired before this existed.
      try {
        const launch = await App.getLaunchUrl();
        go(launch?.url);
      } catch {
        /* No launch URL - the ordinary way to open the app. */
      }
    })();

    return () => {
      cancelled = true;
      remove?.();
    };
  }, [router]);

  return null;
}
