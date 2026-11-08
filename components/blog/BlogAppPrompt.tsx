"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { APP_STORES, detectStorePlatform } from "@/lib/appDownload";
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
 * "Get the app" - the timed ask on a blog post.
 *
 * Louis, 2026-11-08: "can we add a pop up to the blog for a blog post that
 * after like 10 seconds it pops up and offers the app?"
 *
 * It is a bar across the bottom rather than a dialog in the middle, and that
 * is not a styling preference. Google demotes a mobile page whose content is
 * covered by an interstitial soon after the reader arrives from search, and
 * search is where almost all of this blog's traffic comes from. The exception
 * Google names is a banner that uses a reasonable amount of screen space and
 * leaves the content readable, which is this. A centred modal ten seconds
 * into the post would be the thing the guidance is about.
 *
 * Who sees it:
 *
 *   phone, logged out, not in the app   the bar
 *   desktop                             nothing - there is no app to install,
 *                                       and the end-of-post card already asks
 *                                       them to sign up on the web
 *   signed in                           nothing - the blog's download asks are
 *                                       for visitors (the same rule PromoSlot
 *                                       follows), and members are asked by the
 *                                       popup after sign-in instead
 *   inside the native app               nothing, obviously
 *
 * Saying no here is the same no as everywhere else: it goes through
 * lib/appStoreAsk, so dismissing this also quiets the sign-in popup and the
 * dashboard banner for a few days, and tapping through quiets all of them for
 * weeks. Louis, 2026-11-02: "make sure it doesnt annoy people like if they hit
 * ignore on one then it should ignore all."
 */

/** Long enough that the reader has started the post, short enough to be seen. */
const DELAY_MS = 10_000;

/** Its own name in blog_promo_events, so it can be read against the banners. */
const PROMO_NAME = "app-popup";
/** Promo slots in a post count from 1; this is not one of them. */
const SLOT_INDEX = 98;

type Store = "apple" | "google";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" className="h-5 w-5 shrink-0 fill-current">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className="h-5 w-5 shrink-0 fill-current">
      <path d="M47 32C34 39 26 52 26 70v372c0 18 8 31 21 38l208-224L47 32zm294 165L89 23l-3-2 236 254 19-78zM439 233l-60-33-24 97 84-45c13-7 20-17 20-29s-7-22-20-29l-20 39zM86 489l3-2 252-174-19-78-236 254z" />
    </svg>
  );
}

export default function BlogAppPrompt({ postSlug }: { postSlug: string }) {
  const { loading: authLoading, userId } = useSupabaseUser();
  const [store, setStore] = useState<Store | null>(null);
  // Mounted but off-screen for one frame, so the bar slides up rather than
  // appearing. Two states, not one: `store` decides whether it exists at all.
  const [shown, setShown] = useState(false);
  const impressionSent = useRef(false);

  useEffect(() => {
    // Wait for a real answer about who this is. Firing the timer during the
    // loading window would show the bar to a member for a moment.
    if (authLoading || userId || store) return;
    if (isNativeApp()) return;

    const platform = detectStorePlatform(navigator.userAgent, navigator.maxTouchPoints ?? 0);
    if (platform !== "ios" && platform !== "android") return;
    const next: Store = platform === "ios" ? "apple" : "google";
    if (next === "apple" ? !canAskForAppStore() : !canAskForPlayStore()) return;

    const timer = window.setTimeout(() => setStore(next), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [authLoading, userId, store]);

  useEffect(() => {
    if (!store || impressionSent.current) return;
    impressionSent.current = true;
    trackBlogPromoEvent({ eventType: "impression", promo: PROMO_NAME, postSlug, slotIndex: SLOT_INDEX });
    // A timer, not requestAnimationFrame. rAF does not run while the tab is
    // in the background, and a reader who opens a post in a background tab
    // and comes back to it would find the bar mounted off-screen for good,
    // with an impression already counted against a click that can never
    // happen. One frame's delay is all this needs, and a timer always fires.
    const timer = window.setTimeout(() => setShown(true), 30);
    return () => window.clearTimeout(timer);
  }, [store, postSlug]);

  const dismiss = useCallback(() => {
    if (store === "google") snoozePlayStoreAsk();
    else snoozeAppStoreAsk();
    setShown(false);
    // Leave it mounted until the slide-down finishes, then drop it.
    window.setTimeout(() => setStore(null), 250);
  }, [store]);

  const onTap = useCallback(() => {
    if (store === "google") recordPlayStoreTap();
    else recordAppStoreTap();
    trackBlogPromoEvent({ eventType: "click", promo: PROMO_NAME, postSlug, slotIndex: SLOT_INDEX });
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
            store: store === "google" ? "android" : "ios",
            post: postSlug,
          },
        }),
      });
    } catch {
      // Measurement never breaks the thing being measured.
    }
    setShown(false);
  }, [store, postSlug]);

  if (!store) return null;

  const isPlay = store === "google";
  // During the closed beta the Play link is our own /android explainer, which
  // is internal and must not open in a new tab. See lib/androidBeta.
  const href = isPlay ? androidDestination() : APP_STORES.apple;
  const external = isPlay ? !BETA_OPEN : true;

  return (
    <div
      role="region"
      aria-label="Get the Bible Buddy app"
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 transition-transform duration-300 ease-out ${
        shown ? "translate-y-0" : "translate-y-[120%]"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex w-full max-w-[560px] items-center gap-3 rounded-[20px] border border-[#dce8ff] bg-white p-3 shadow-[0_12px_40px_rgba(7,22,47,0.22)]">
        <Image
          src="/icons/icon-192.png"
          alt=""
          width={48}
          height={48}
          className="h-11 w-11 shrink-0 rounded-[13px]"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-black leading-tight text-[#0b1633]">Bible Buddy</p>
          {/* Two short lines, deliberately. Measured at 375px, the text column
              is 128px wide once the icon, the Get button and the close button
              have taken theirs, so anything longer than this wrapped to three
              lines and pushed the bar to 104px tall. Name, price, button - the
              same shape as iOS's own Smart App Banner, for the same reason. */}
          <p className="mt-0.5 text-[12.5px] leading-tight text-[#3b4660]">
            {isPlay ? "Free on Android" : "Free on iPhone"}
          </p>
        </div>

        <a
          href={href}
          {...(external ? { target: "_blank", rel: "nofollow noopener" } : { rel: "nofollow" })}
          onClick={onTap}
          // Inline colour: the site's global unlayered `a { color: inherit }`
          // beats every Tailwind text utility on an anchor. See
          // docs/link-colour-root-fix.md.
          style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          className="flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-b from-[#2a8cff] to-[#1672f3] px-4 text-[14px] font-black shadow-[0_8px_18px_rgba(22,114,243,0.3)] transition hover:brightness-105"
        >
          {isPlay ? <PlayGlyph /> : <AppleGlyph />}
          Get
        </a>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Not now"
          className="-mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#6d7789] transition hover:bg-[#f1f5fb]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" className="h-4 w-4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
