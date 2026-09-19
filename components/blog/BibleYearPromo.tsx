"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackBlogPromoEvent } from "@/lib/blogViewTracking";
import { useSupabaseUser } from "@/lib/useSupabaseUser";

/**
 * The promo inside Bible in One Year Study Notes posts.
 *
 * 2026-09-19: Louis supplied four banner versions for this series, so the
 * built-in card was replaced by his artwork. Each post rotates through the
 * four so a reader never sees the same banner twice on one page, and the
 * rotation is seeded by the day number, so a given day always shows the same
 * banners in the same order (clean data, not noise).
 *
 * Members are already inside the app, so their banner links to that day in
 * the plan instead of a sign up. Everything is logged to blog_promo_events
 * under the banner's own name, so the four versions can be compared.
 */

const VERSIONS = [
  { name: "bible-year-trivia", file: "bible-year-trivia.jpg", alt: "Read it. Remember it. Answer today's Bible trivia inside Bible Buddy." },
  { name: "bible-year-progress", file: "bible-year-progress.jpg", alt: "Save your Bible in One Year progress inside Bible Buddy." },
  { name: "bible-year-discussion", file: "bible-year-discussion.jpg", alt: "Join today's discussion with other Bible Buddies." },
  { name: "bible-year-experience", file: "bible-year-experience.jpg", alt: "The full Bible in One Year experience inside Bible Buddy." },
];

export default function BibleYearPromo({
  day,
  reading,
  postSlug,
  slotIndex = 0,
}: {
  day: number;
  reading?: string;
  postSlug: string;
  slotIndex?: number;
}) {
  void reading;
  const { loading, userId } = useSupabaseUser();
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const impressionSent = useRef(false);
  const version = VERSIONS[(day + slotIndex) % VERSIONS.length];

  useEffect(() => {
    if (loading || impressionSent.current) return;
    const el = linkRef.current;
    if (!el) return;
    const send = () => {
      impressionSent.current = true;
      trackBlogPromoEvent({ eventType: "impression", promo: version.name, postSlug, slotIndex: day });
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
  }, [loading, version.name, postSlug, day]);

  if (loading) return null;

  const isMember = Boolean(userId);
  const href = isMember
    ? `/dashboard?view=bible-year&day=${day}`
    : `/start?src=blog&promo=${version.name}&post=${encodeURIComponent(postSlug)}`;

  return (
    <Link
      ref={linkRef}
      href={href}
      rel={isMember ? undefined : "nofollow"}
      onClick={() => trackBlogPromoEvent({ eventType: "click", promo: version.name, postSlug, slotIndex: day })}
      aria-label={version.alt}
      className="my-10 block overflow-hidden rounded-[24px] shadow-[0_18px_48px_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,86,253,0.16)]"
    >
      <Image
        src={`/promos/${version.file}`}
        alt={version.alt}
        width={1536}
        height={1026}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 672px"
        className="h-auto w-full"
      />
    </Link>
  );
}
