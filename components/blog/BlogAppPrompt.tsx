"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { APP_STORES, clientStorePlatform } from "@/lib/appDownload";
import { BETA_OPEN, androidDestination } from "@/lib/androidBeta";
import { isNativeApp } from "@/lib/nativeApp";
import {
  canAskForAppStore,
  canAskForPlayStore,
  recordAppStoreTap,
  recordPlayStoreTap,
  snoozeAppStoreAsk,
  snoozePlayStoreAsk,
} from "@/lib/appStoreAsk";
import { trackBlogPromoEvent } from "@/lib/blogViewTracking";
import { useSupabaseUser } from "@/lib/useSupabaseUser";

/**
 * The timed ask at the bottom of a blog post.
 *
 * Louis, 2026-11-08: "can we add a pop up to the blog for a blog post that
 * after like 10 seconds it pops up and offers the app?", then "the banner
 * needs to say more ... like download Bible buddy free on the playstore for
 * android and app store for ios".
 *
 * It is a bar across the bottom rather than a dialog in the middle, and that
 * is a ranking decision, not a styling one. Google demotes a mobile page whose
 * content is covered by an interstitial soon after the reader arrives from
 * search, and search is where nearly all of this blog's traffic comes from.
 * The exception Google names is a banner using a reasonable amount of screen
 * space that leaves the content readable, which is this.
 *
 * Three versions of the same bar:
 *
 *   iPhone     Download on the App Store
 *   Android    Get it on Google Play (our /android explainer during the beta)
 *   desktop    Start free on the web - there is no app to install here, and
 *              sending a laptop to a phone store is a dead end
 *
 * Nobody signed in sees any of it: the blog's download asks are for visitors,
 * the rule PromoSlot already follows, and members are asked by the popup after
 * sign-in instead. Neither does anyone already inside the native app.
 *
 * Which device this is comes from lib/appDownload's clientStorePlatform, which
 * reads client hints and navigator.platform as well as the user agent, because
 * most of this blog's phone traffic arrives inside Instagram, Facebook or
 * TikTok rather than in Safari or Chrome. scripts/verify-store-platform.ts
 * holds the captured user agents those apps actually send.
 *
 * Saying no goes through lib/appStoreAsk for the two store versions, so a
 * dismissal here also quiets the sign-in popup and the dashboard banner for a
 * few days, and tapping through quiets all of them for weeks (Louis,
 * 2026-11-02: "make sure it doesnt annoy people like if they hit ignore on one
 * then it should ignore all"). The web version keeps its own answer: declining
 * a signup at a laptop is not declining the app on a phone.
 */

/** Long enough that the reader has started the post, short enough to be seen. */
const DELAY_MS = 10_000;

/** Names in blog_promo_events, so each can be read against the banners. */
const STORE_PROMO = "app-popup";
const WEB_PROMO = "web-popup";
/** Promo slots in a post count from 1; these are not slots. */
const SLOT_INDEX = 98;

/** The web version's own "not now", kept apart from the store answers. */
const WEB_KEY = "bb:blog-web-ask";
const WEB_SNOOZE_DAYS = 7;

function canAskOnWeb(): boolean {
  try {
    const at = Number(window.localStorage.getItem(WEB_KEY) || 0);
    return !at || Date.now() - at >= WEB_SNOOZE_DAYS * 86_400_000;
  } catch {
    // Private mode or blocked storage. A prompt that silently stops working
    // is worse than one that occasionally repeats.
    return true;
  }
}

function snoozeWebAsk() {
  try {
    window.localStorage.setItem(WEB_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

type Variant = "ios" | "android" | "web";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" className="h-6 w-6 shrink-0 fill-current">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className="h-6 w-6 shrink-0 fill-current">
      <path d="M47 32C34 39 26 52 26 70v372c0 18 8 31 21 38l208-224L47 32zm294 165L89 23l-3-2 236 254 19-78zM439 233l-60-33-24 97 84-45c13-7 20-17 20-29s-7-22-20-29l-20 39zM86 489l3-2 252-174-19-78-236 254z" />
    </svg>
  );
}

function WebGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 20h20" />
    </svg>
  );
}

const COPY: Record<Variant, { headline: string; sub: string; button: string; glyph: () => React.JSX.Element }> = {
  ios: {
    headline: "Download Bible Buddy free",
    sub: "On the App Store for iPhone and iPad",
    button: "Download on the App Store",
    glyph: AppleGlyph,
  },
  android: {
    headline: "Download Bible Buddy free",
    sub: "On the Play Store for Android",
    button: "Get it on Google Play",
    glyph: PlayGlyph,
  },
  web: {
    headline: "Start Bible Buddy free",
    sub: "The whole Bible explained, in your browser",
    button: "Start Free on the Web",
    glyph: WebGlyph,
  },
};

export default function BlogAppPrompt({ postSlug }: { postSlug: string }) {
  const { loading: authLoading, userId } = useSupabaseUser();
  const [variant, setVariant] = useState<Variant | null>(null);
  // Mounted but off-screen for one tick, so the bar slides up rather than
  // appearing. Two states, not one: `variant` decides whether it exists.
  const [shown, setShown] = useState(false);
  const impressionSent = useRef(false);

  useEffect(() => {
    // Wait for a real answer about who this is. Firing the timer during the
    // loading window would show the bar to a member for a moment.
    if (authLoading || userId || variant) return;
    if (isNativeApp()) return;

    const platform = clientStorePlatform();
    const next: Variant = platform === "ios" ? "ios" : platform === "android" ? "android" : "web";
    const allowed =
      next === "ios" ? canAskForAppStore() : next === "android" ? canAskForPlayStore() : canAskOnWeb();
    if (!allowed) return;

    const timer = window.setTimeout(() => setVariant(next), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [authLoading, userId, variant]);

  const promoName = variant === "web" ? WEB_PROMO : STORE_PROMO;

  useEffect(() => {
    if (!variant || impressionSent.current) return;
    impressionSent.current = true;
    trackBlogPromoEvent({ eventType: "impression", promo: promoName, postSlug, slotIndex: SLOT_INDEX });
    // A timer, not requestAnimationFrame. rAF does not run while the tab is
    // in the background, and a reader who opens a post in a background tab
    // and comes back to it would find the bar mounted off-screen for good,
    // with an impression already counted against a click that can never
    // happen. One tick is all this needs, and a timer always fires.
    const timer = window.setTimeout(() => setShown(true), 30);
    return () => window.clearTimeout(timer);
  }, [variant, promoName, postSlug]);

  const dismiss = useCallback(() => {
    if (variant === "android") snoozePlayStoreAsk();
    else if (variant === "ios") snoozeAppStoreAsk();
    else snoozeWebAsk();
    setShown(false);
    // Leave it mounted until the slide-down finishes, then drop it.
    window.setTimeout(() => setVariant(null), 250);
  }, [variant]);

  const onTap = useCallback(() => {
    if (variant === "android") recordPlayStoreTap();
    else if (variant === "ios") recordAppStoreTap();
    else snoozeWebAsk();

    trackBlogPromoEvent({ eventType: "click", promo: promoName, postSlug, slotIndex: SLOT_INDEX });

    if (variant !== "web") {
      try {
        void fetch("/api/landing-analytics", {
          method: "POST",
          keepalive: true,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_name: "clicked_app_store",
            session_id: window.localStorage.getItem("bb:landing-session-id") || "unknown",
            page_path: window.location.pathname,
            metadata: {
              clickedFrom: "blog_app_popup",
              store: variant === "android" ? "android" : "ios",
              post: postSlug,
            },
          }),
        });
      } catch {
        // Measurement never breaks the thing being measured.
      }
    }
    setShown(false);
  }, [variant, promoName, postSlug]);

  if (!variant) return null;

  const copy = COPY[variant];
  const Glyph = copy.glyph;

  // During the closed beta the Play link is our own /android explainer, which
  // is internal and must not open in a new tab. See lib/androidBeta.
  const href =
    variant === "android"
      ? androidDestination()
      : variant === "ios"
        ? APP_STORES.apple
        : `/signup?src=blog&promo=${WEB_PROMO}&post=${encodeURIComponent(postSlug)}`;
  const external = variant === "ios" || (variant === "android" && !BETA_OPEN);

  return (
    <div
      role="region"
      aria-label="Get Bible Buddy"
      className={`fixed inset-x-0 bottom-0 z-50 px-3 transition-transform duration-300 ease-out ${
        shown ? "translate-y-0" : "translate-y-[130%]"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto w-full max-w-[560px] rounded-[22px] border border-[#dce8ff] bg-white p-3.5 shadow-[0_14px_44px_rgba(7,22,47,0.26)]">
        <div className="flex items-start gap-3">
          <Image
            src="/icons/icon-192.png"
            alt=""
            width={52}
            height={52}
            className="h-[46px] w-[46px] shrink-0 rounded-[14px] shadow-[0_6px_16px_rgba(0,86,253,0.25)]"
          />

          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-black leading-tight text-[#0b1633]">{copy.headline}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[#3b4660]">{copy.sub}</p>
          </div>

          <button
            type="button"
            onClick={dismiss}
            aria-label="Not now"
            className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#8b94a6] transition hover:bg-[#f1f5fb] hover:text-[#3b4660]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" className="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* The button gets its own row so the store's name fits at 375px.
            Tried inline beside the text first: the column left for it was
            128px, which truncated "Download on the App Store" to "Get". */}
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "nofollow noopener" } : { rel: "nofollow" })}
          onClick={onTap}
          // Inline colour: the site's global unlayered `a { color: inherit }`
          // beats every Tailwind text utility on an anchor. See
          // docs/link-colour-root-fix.md.
          style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          className="mt-3 flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-[#1d2b4d] to-[#0b1633] px-4 text-[15px] font-black shadow-[0_8px_20px_rgba(11,22,51,0.28)] transition hover:brightness-110"
        >
          <Glyph />
          {copy.button}
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
