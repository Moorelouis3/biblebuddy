"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackBlogPromoEvent } from "@/lib/blogViewTracking";
import { useSupabaseUser } from "@/lib/useSupabaseUser";

/**
 * The promo inside Bible in One Year Study Notes posts (Louis, 2026-09-19:
 * "can we make special promos for the Bible in One Year pages").
 *
 * The rotating blog banners are generic and only ever shown to logged out
 * readers, so a Study Notes page had nothing in it pointing at the plan the
 * whole article is about. This one is specific: it names the day and the
 * reading, and it works for members too - they get a link straight into that
 * day in the app instead of a sign up pitch.
 *
 * Built natively (no image file) so every day gets its own promo without
 * anyone drawing 365 banners. Tracked as promo "bible-year-day-<N>" in
 * blog_promo_events, alongside the banner promos.
 */
export default function BibleYearPromo({
  day,
  reading,
  postSlug,
}: {
  day: number;
  reading?: string;
  postSlug: string;
}) {
  const { loading, userId } = useSupabaseUser();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const impressionSent = useRef(false);
  const promoName = `bible-year-day-${day}`;

  useEffect(() => {
    if (loading || impressionSent.current) return;
    const el = cardRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      impressionSent.current = true;
      trackBlogPromoEvent({ eventType: "impression", promo: promoName, postSlug, slotIndex: day });
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (impressionSent.current || !entries.some((entry) => entry.isIntersecting)) return;
        impressionSent.current = true;
        trackBlogPromoEvent({ eventType: "impression", promo: promoName, postSlug, slotIndex: day });
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, promoName, postSlug, day]);

  if (loading) return null;

  const isMember = Boolean(userId);
  const href = isMember
    ? `/dashboard?view=bible-year&day=${day}`
    : `/start?src=blog&promo=${promoName}&post=${encodeURIComponent(postSlug)}`;

  return (
    <div
      ref={cardRef}
      className="my-10 overflow-hidden rounded-[24px] border border-[#3a2c14] px-6 py-7 text-center"
      style={{ background: "linear-gradient(140deg, #0c1220 0%, #111f3a 55%, #0d1526 100%)" }}
    >
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#e8c877]">
        Bible in One Year · Day {day}
      </p>
      <p className="mt-3 text-2xl font-black leading-tight text-white sm:text-[28px]">
        {isMember ? `Open Day ${day} in Bible Buddy` : "Read the whole Bible, one day at a time"}
      </p>
      <p className="mt-3 text-sm font-semibold leading-6 text-[#c9d6ec] sm:text-base">
        {isMember
          ? `Today's reading${reading ? ` is ${reading}` : ""}, with the audio teaching, study notes, trivia and the daily reflection waiting for you.`
          : `Day ${day}${reading ? ` is ${reading}` : ""}. Every day has audio you can listen to, the reading itself, short trivia and a reflection you can share. It is free, and you can start at Day 1 whenever you want.`}
      </p>
      <Link
        href={href}
        rel={isMember ? undefined : "nofollow"}
        onClick={() => trackBlogPromoEvent({ eventType: "click", promo: promoName, postSlug, slotIndex: day })}
        // Inline: the site's global `a { color: inherit }` outranks utilities.
        style={{
          color: "#221503",
          WebkitTextFillColor: "#221503",
          background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)",
        }}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-black tracking-wide transition hover:brightness-95 sm:w-auto sm:min-w-[320px]"
      >
        {isMember ? `Go to Day ${day}` : "Start the Bible in One Year free"}
      </Link>
      {isMember ? null : (
        <p className="mt-3 text-xs font-semibold text-[#9fb2d1]">No account needed to start. Completely free.</p>
      )}
    </div>
  );
}
