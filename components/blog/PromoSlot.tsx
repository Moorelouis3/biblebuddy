"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackBlogPromoEvent } from "@/lib/blogViewTracking";

// The rotation pool. Add new banners here when they land in public/promos/.
const PROMO_BANNERS = [
  "promo-banner-1.png",
  "promo-banner-2.png",
  "promo-banner-3.png",
  "promo-banner-4.png",
  "promo-banner-5.png",
];

// Small stable hash so a given post always starts at the same point in the
// rotation. Deterministic on purpose: every reader of a post sees the same
// banner in the same slot, so promo performance per post is clean data
// instead of noise.
function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function pickPromoBanner(postSlug: string, slotIndex: number) {
  return PROMO_BANNERS[(hashString(postSlug) + slotIndex) % PROMO_BANNERS.length];
}

type PromoSlotProps = {
  postSlug: string;
  // Position of this slot within the post (0 = first slot). Advances the
  // rotation so one post never repeats the same banner twice.
  slotIndex?: number;
};

// A full-width signup promo banner for blog posts. The whole image is one
// link to /signup carrying tracking params so signups can be attributed to
// the post and the exact banner that converted. Logs an impression the
// first time it scrolls into view and a click event on tap.
export default function PromoSlot({ postSlug, slotIndex = 0 }: PromoSlotProps) {
  const file = pickPromoBanner(postSlug, slotIndex);
  const promoName = file.replace(/\.[a-z]+$/, "");
  const href = `/signup?src=blog&promo=${encodeURIComponent(promoName)}&post=${encodeURIComponent(postSlug)}`;

  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const impressionSent = useRef(false);

  useEffect(() => {
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
  }, [promoName, postSlug, slotIndex]);

  return (
    <Link
      ref={containerRef}
      href={href}
      onClick={() => trackBlogPromoEvent({ eventType: "click", promo: promoName, postSlug, slotIndex })}
      aria-label="Bible Buddy is a free Bible study app. Create your free account."
      className="my-8 block overflow-hidden rounded-[24px] shadow-[0_18px_48px_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,86,253,0.16)]"
    >
      <Image
        src={`/promos/${file}`}
        alt="Bible Buddy — a free Bible study app to study, save, and grow in God's Word. Create your free account."
        width={1536}
        height={1024}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 672px"
        className="h-auto w-full"
      />
    </Link>
  );
}
