"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackBlogPromoEvent } from "@/lib/blogViewTracking";
import { useSupabaseUser } from "@/lib/useSupabaseUser";

/**
 * The promo inside the Proverbs chapter posts.
 *
 * Louis, 2026-10-06: "for all the proverbs blog posts please add the promos
 * for the devotional instead of the other promos, even when the person is
 * logged in they should see the proverbs promo." Someone reading Proverbs 14
 * is already interested in exactly the thing the 31-day study teaches, so the
 * rotating generic banners are the wrong offer on these pages.
 *
 * Shown to members too, which is the part that differs from every other promo
 * on the blog. PromoSlot returns nothing once a reader is signed in, on the
 * reasoning that there is nothing left to sell them - but a member who has not
 * started this study has not seen it, and the study is the thing being
 * advertised rather than the app. So the banner stays and only the destination
 * changes: a member goes to the study itself, a visitor to the same public page
 * the Threads campaign points at, which answers signed out.
 *
 * Two versions, alternating by slot so a reader never sees the same banner
 * twice on one page, logged under their own names in blog_promo_events so the
 * two can be compared like every other promo.
 */

const VERSIONS = [
  {
    name: "proverbs-study-now",
    file: "proverbs-study-now.jpg",
    alt: "The Wisdom of Proverbs: a free 31-day Bible study inside Bible Buddy. Start studying now.",
  },
  {
    name: "proverbs-next-31-days",
    file: "proverbs-next-31-days.jpg",
    alt: "Start your next 31 days with the book of Proverbs inside Bible Buddy.",
  },
];

const STUDY_PATH = "/devotionals/wisdom-of-proverbs";

export default function ProverbsStudyPromo({
  postSlug,
  slotIndex = 0,
}: {
  postSlug: string;
  slotIndex?: number;
}) {
  const { loading, userId } = useSupabaseUser();
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const impressionSent = useRef(false);
  const version = VERSIONS[slotIndex % VERSIONS.length];

  useEffect(() => {
    if (loading || impressionSent.current) return;
    const el = linkRef.current;
    if (!el) return;
    const send = () => {
      impressionSent.current = true;
      trackBlogPromoEvent({ eventType: "impression", promo: version.name, postSlug, slotIndex });
    };
    if (typeof IntersectionObserver === "undefined") {
      send();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (impressionSent.current || !entries.some((entry) => entry.isIntersecting)) return;
        send();
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, version.name, postSlug, slotIndex]);

  if (loading) return null;

  const isMember = Boolean(userId);
  const href = isMember
    ? STUDY_PATH
    : `${STUDY_PATH}?src=blog&promo=${version.name}&post=${encodeURIComponent(postSlug)}`;

  return (
    <Link
      ref={linkRef}
      href={href}
      rel={isMember ? undefined : "nofollow"}
      onClick={() => trackBlogPromoEvent({ eventType: "click", promo: version.name, postSlug, slotIndex })}
      aria-label={version.alt}
      className="my-10 block overflow-hidden rounded-[24px] shadow-[0_18px_48px_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,86,253,0.16)]"
    >
      <Image
        src={`/promos/${version.file}`}
        alt={version.alt}
        width={1536}
        height={1024}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 672px"
        className="h-auto w-full"
      />
    </Link>
  );
}
