"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { trackBlogPromoEvent } from "@/lib/blogViewTracking";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import {
  APP_STORES,
  detectStorePlatform,
  showsBothStores,
  storeHref,
  type StorePlatform,
} from "@/lib/appDownload";
import { pickPromoBanner } from "@/lib/blogPromoBanners";

/**
 * The rotating banner inside blog posts.
 *
 * 2026-11-03: Louis supplied four finished designs and they replace the five
 * banners that were here. All four say "Download the Bible Buddy app", so the
 * destination changed with them: this used to sell a free account and point
 * at /signup, and now it points at the App Store listing. iOS 1.0 went live
 * on 2026-11-01 and the install is the ask.
 *
 * The artwork and the rotation live in lib/blogPromoBanners.ts; every
 * destination, including the Android URL when there is one, lives in
 * lib/appDownload.ts. Nothing about either is decided in this file.
 */

// The device never changes under a reader, so there is nothing to subscribe
// to - but reading navigator during render would differ between the server
// and the browser, so it goes through useSyncExternalStore: "other" on the
// server, the real device once hydrated. That is also the reason this is not
// a useEffect + setState, which costs a second render of every banner on the
// page for an answer that cannot change.
const subscribeToNothing = () => () => {};
const platformOnServer = (): StorePlatform => "other";
const platformInBrowser = (): StorePlatform =>
  detectStorePlatform(navigator.userAgent, navigator.maxTouchPoints);

type PromoSlotProps = {
  postSlug: string;
  // Position of this slot within the post (0 = first slot). Advances the
  // rotation so one post never repeats the same banner twice.
  slotIndex?: number;
};

export default function PromoSlot({ postSlug, slotIndex = 0 }: PromoSlotProps) {
  const { loading: authLoading, userId } = useSupabaseUser();
  const banner = pickPromoBanner(postSlug, slotIndex);
  const promoName = banner.name;

  // "other" on the server and on the first paint, which resolves to the App
  // Store - the same answer every device gets today, so there is nothing to
  // mismatch and no flash. Once Android is live this is what sends a phone
  // to its own store.
  const platform = useSyncExternalStore(subscribeToNothing, platformInBrowser, platformOnServer);

  const href = storeHref(platform);
  const bothStores = showsBothStores(platform);

  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const impressionSent = useRef(false);

  useEffect(() => {
    // Only count impressions from confirmed logged-out readers — members
    // never see promos, and the loading window should not log anything.
    if (authLoading || userId) return;
    const el = containerRef.current;
    if (!el || impressionSent.current) return;

    if (typeof IntersectionObserver === "undefined") {
      // Very old browser: count the render as the impression.
      impressionSent.current = true;
      trackBlogPromoEvent({ eventType: "impression", promo: promoName, postSlug, slotIndex });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (impressionSent.current) return;
        if (entries.some((entry) => entry.isIntersecting)) {
          impressionSent.current = true;
          trackBlogPromoEvent({ eventType: "impression", promo: promoName, postSlug, slotIndex });
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [authLoading, userId, promoName, postSlug, slotIndex]);

  // Members are already inside the app or one tap from it; the blog's download
  // ask is for visitors.
  if (userId) return null;

  const trackClick = (store: "apple" | "google" | "banner") =>
    trackBlogPromoEvent({
      eventType: "click",
      promo: store === "banner" ? promoName : `${promoName}-${store}`,
      postSlug,
      slotIndex,
    });

  return (
    <div className="my-8">
      {/* The whole banner is the link. A plain <a>, not next/link: this leaves
          the site now, and it opens in a new tab so the reader keeps their
          place in the article. */}
      <a
        ref={containerRef}
        href={href}
        target="_blank"
        rel="nofollow noopener"
        onClick={() => trackClick("banner")}
        aria-label={banner.alt}
        className="block overflow-hidden rounded-[24px] shadow-[0_18px_48px_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,86,253,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056fd] focus-visible:ring-offset-2"
      >
        <Image
          src={`/promos/${banner.file}`}
          alt={banner.alt}
          width={1536}
          height={1024}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 672px"
          className="h-auto w-full"
        />
      </a>

      {/* Dormant until lib/appDownload.ts has a Play URL. Then, and only on a
          device we could not place, the reader is offered both stores here
          rather than being guessed at. A phone never sees this - it has
          already been sent to its own store by the banner above. */}
      {bothStores && (
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a
            href={APP_STORES.apple}
            target="_blank"
            rel="nofollow noopener"
            onClick={() => trackClick("apple")}
            className="rounded-full bg-[#0056fd] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0049d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056fd] focus-visible:ring-offset-2"
          >
            Download on the App Store
          </a>
          {APP_STORES.google && (
            <a
              href={APP_STORES.google}
              target="_blank"
              rel="nofollow noopener"
              onClick={() => trackClick("google")}
              className="rounded-full bg-[#0056fd] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0049d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056fd] focus-visible:ring-offset-2"
            >
              Get it on Google Play
            </a>
          )}
        </div>
      )}
    </div>
  );
}
