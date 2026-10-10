"use client";

import Image from "next/image";
import Link from "next/link";
import { Caveat, Nunito } from "next/font/google";
import { useEffect, useRef, type ReactNode } from "react";
import { trackBlogPromoEvent } from "@/lib/blogViewTracking";
import { useSupabaseUser } from "@/lib/useSupabaseUser";

const heading = Nunito({ subsets: ["latin"], weight: ["700", "800", "900"], display: "swap" });
const script = Caveat({ subsets: ["latin"], weight: ["500", "600"], display: "swap" });

// End-of-post card (2026-09-17, replaces the "Written by Louis" box). Built
// natively from Louis's reference design so the CTA is a real button. Same
// /start destination and blog_promo_events tracking as PromoSlot, recorded
// as promo "end-card" so it can be compared with the in-article banners.
// Louis is still named as author in the BlogPosting schema.
//
// Louis, 2026-10-08: "for proverbs the bottom bible buddy promo should be for
// the wisdom of proverbs and no 3rd promo as that is the promo at the end." A
// Proverbs chapter post therefore ends on this card selling the 31-day study
// rather than the app in general, and the closing banner that used to sit
// above it is gone - the card is the closing ask. Same chrome either way, so
// there is one end-of-post design to look after rather than two.
const SLOT_INDEX = 99;

const ICONS: Record<string, ReactNode> = {
  book: <path d="M3 5.5c3-1 6-.6 9 1.5 3-2.1 6-2.5 9-1.5v13c-3-1-6-.6-9 1.5-3-2.1-6-2.5-9-1.5v-13ZM12 7v13" />,
  game: (
    <>
      <path d="M7 7h10a4.5 4.5 0 0 1 4.4 5.4l-.8 3.9a2.6 2.6 0 0 1-4.5 1.2L14.3 15H9.7l-1.8 2.5a2.6 2.6 0 0 1-4.5-1.2l-.8-3.9A4.5 4.5 0 0 1 7 7Z" />
      <path d="M8 10v3M6.5 11.5h3" />
      <circle cx="15.5" cy="10.5" r="0.4" fill="currentColor" />
      <circle cx="17" cy="12.5" r="0.4" fill="currentColor" />
    </>
  ),
  people: (
    <>
      <circle cx="12" cy="7.5" r="2.5" />
      <path d="M7.5 19v-1.5a4.5 4.5 0 0 1 9 0V19Z" />
      <circle cx="5.5" cy="10" r="1.8" />
      <path d="M2.5 18.5v-.8A3 3 0 0 1 6 14.8" />
      <circle cx="18.5" cy="10" r="1.8" />
      <path d="M21.5 18.5v-.8a3 3 0 0 0-3.5-2.9" />
    </>
  ),
  unlocked: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" />
      <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 6.8-1.2" />
      <path d="M12 14v2.5" />
    </>
  ),
};

type EndCardContent = {
  promoName: string;
  headline: string;
  subhead: string;
  body: ReactNode;
  features: Array<{ title: string; text: string; bubble: string; icon: keyof typeof ICONS }>;
  // Where a logged-out reader goes, before the tracking params are added.
  visitorPath: string;
  visitorLabel: string;
  // Where a reader who already has an account goes.
  memberPath: string;
  memberLabel: string;
  // Small print under the button. Null for the variants that have none.
  footnote: string | null;
  // Whether a signed-in reader is counted as an impression. The app card has
  // nothing left to sell a member; the study card does, because a member who
  // has not started the study has not seen it.
  trackMembers: boolean;
};

const APP_CARD: EndCardContent = {
  promoName: "end-card",
  headline: "Enjoyed this blog post?",
  subhead: "You'll love what's waiting for you inside Bible Buddy.",
  body: (
    <>
      <strong className="font-bold text-[#26324d]">Bible</strong> Buddy is a{" "}
      <strong className="font-bold text-[#26324d]">free</strong> Bible study app with devotionals, trivia games, and a
      community where you can study the Bible with other believers.
    </>
  ),
  features: [
    { title: "Daily Devotionals", text: "Grow in God's Word", bubble: "#dff7ec", icon: "book" },
    { title: "Trivia Games", text: "Make learning fun", bubble: "#ece8fb", icon: "game" },
    { title: "A Supportive Community", text: "Study together", bubble: "#fdf1d8", icon: "people" },
  ],
  visitorPath: "/start",
  visitorLabel: "Start Using Bible Buddy for Free",
  memberPath: "/dashboard",
  memberLabel: "Open Bible Buddy",
  footnote: "Create your free account. No credit card. Completely free.",
  trackMembers: false,
};

/**
 * The Proverbs version.
 *
 * Only claims the study actually makes good on: free, 31 days, one full
 * chapter a day, every day unlocked from the start, read at your own pace, and
 * the reading/notes/trivia/reflection that each day carries. No member counts,
 * no testimonials, no deadlines.
 *
 * It introduces the app the way Louis asked the banners to, so a visitor who
 * landed here from a search knows what Bible Buddy is before being asked to
 * join anything.
 */
const PROVERBS_CARD: EndCardContent = {
  promoName: "proverbs-end-card",
  headline: "Want the whole book of Proverbs?",
  subhead: "The Wisdom of Proverbs is waiting for you inside Bible Buddy.",
  body: (
    <>
      This article covered one chapter.{" "}
      <strong className="font-bold text-[#26324d]">The Wisdom of Proverbs</strong> walks through all 31, a chapter a day,
      inside my <strong className="font-bold text-[#26324d]">free</strong> Bible study app, Bible Buddy.
    </>
  ),
  features: [
    { title: "31 Days, 31 Chapters", text: "One full chapter a day", bubble: "#dff7ec", icon: "book" },
    { title: "Trivia and Reflection", text: "Make it stick", bubble: "#ece8fb", icon: "game" },
    { title: "All 31 Days Unlocked", text: "Go at your own pace", bubble: "#fdf1d8", icon: "unlocked" },
  ],
  visitorPath: "/devotionals/wisdom-of-proverbs",
  visitorLabel: "Join the Free Proverbs Study",
  memberPath: "/devotionals/wisdom-of-proverbs",
  memberLabel: "Open the Proverbs Study",
  footnote: "Free. Every day open from the start. Nothing expires.",
  trackMembers: true,
};

function HeartMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M12 20.5c-.6-3.2-7.5-6.8-7.5-11.6A3.9 3.9 0 0 1 12 7.2a3.9 3.9 0 0 1 7.5 1.7c0 4.8-6.9 8.4-7.5 11.6Z" />
    </svg>
  );
}

export default function BlogAuthorBox({
  postSlug,
  variant = "app",
}: {
  postSlug: string;
  variant?: "app" | "proverbs";
}) {
  const { loading: authLoading, userId } = useSupabaseUser();
  const cardRef = useRef<HTMLElement | null>(null);
  const impressionSent = useRef(false);

  const content = variant === "proverbs" ? PROVERBS_CARD : APP_CARD;
  const { promoName, trackMembers } = content;

  useEffect(() => {
    // Same rule as PromoSlot: a logged-out reader is always an impression, a
    // signed-in one only on a card that still has something to offer them.
    if (authLoading || impressionSent.current) return;
    if (userId && !trackMembers) return;
    const el = cardRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      impressionSent.current = true;
      trackBlogPromoEvent({ eventType: "impression", promo: promoName, postSlug, slotIndex: SLOT_INDEX });
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (impressionSent.current || !entries.some((entry) => entry.isIntersecting)) return;
        impressionSent.current = true;
        trackBlogPromoEvent({ eventType: "impression", promo: promoName, postSlug, slotIndex: SLOT_INDEX });
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [authLoading, userId, postSlug, promoName, trackMembers]);

  const isMember = Boolean(userId);
  const href = isMember
    ? content.memberPath
    : `${content.visitorPath}?src=blog&promo=${promoName}&post=${encodeURIComponent(postSlug)}`;

  return (
    <section
      ref={cardRef}
      aria-labelledby="blog-end-card-heading"
      className="mt-10 rounded-[22px] border border-[#e3e8f0] bg-[#fbfcfe] px-5 pb-5 pt-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] sm:px-8 sm:pb-6 sm:pt-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Image
            src="/TherealiconforBB.png"
            alt="Bible Buddy logo"
            width={72}
            height={72}
            className="h-14 w-14 shrink-0 rounded-[16px] shadow-[0_8px_20px_rgba(0,86,253,0.25)] sm:h-[72px] sm:w-[72px] sm:rounded-[20px]"
          />
          <div className="min-w-0">
            <p className={`${heading.className} text-[26px] font-black leading-none tracking-tight text-[#0b1633] sm:text-[34px]`}>
              Bible Buddy
            </p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3b4660] sm:text-[11px]">
              Read · Understand · Grow
            </p>
          </div>
        </div>
        <div
          className={`${script.className} hidden shrink-0 -rotate-[8deg] text-right text-[22px] leading-[0.95] text-[#1f5fd6] sm:block`}
          aria-hidden="true"
        >
          <p>Same God.</p>
          <p className="pl-3">More Together.</p>
          <HeartMark className="ml-auto mr-2 mt-0.5 h-5 w-5" />
        </div>
      </div>

      <h2
        id="blog-end-card-heading"
        className={`${heading.className} mt-6 text-[28px] font-black leading-[1.1] tracking-tight text-[#0b1633] sm:mt-7 sm:text-[38px]`}
      >
        {content.headline}
      </h2>
      <p className={`${heading.className} mt-1.5 text-[17px] font-extrabold leading-snug text-[#26324d] sm:text-[20px]`}>
        {content.subhead}
      </p>
      <p className="mt-3 text-[15px] leading-[1.6] text-[#3b4660] sm:text-[16px]">{content.body}</p>

      <ul className="mt-6 grid grid-cols-3 sm:mt-7">
        {content.features.map((feature, index) => (
          <li
            key={feature.title}
            className={`flex flex-col items-center px-1 text-center ${index > 0 ? "border-l border-[#e3e8f0]" : ""}`}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full text-[#1c2440] sm:h-14 sm:w-14"
              style={{ background: feature.bubble }}
            >
              <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[feature.icon]}
              </svg>
            </span>
            <p className={`${heading.className} mt-2.5 text-[13px] font-extrabold leading-tight text-[#0b1633] sm:text-[15px]`}>
              {feature.title}
            </p>
            <p className="mt-1 text-[12px] leading-tight text-[#3b4660] sm:text-[13px]">{feature.text}</p>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        rel={isMember ? undefined : "nofollow"}
        // Inline because the site's global `a { color: inherit }` outranks utilities.
        style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
        onClick={() => {
          if (!isMember || trackMembers) {
            trackBlogPromoEvent({ eventType: "click", promo: promoName, postSlug, slotIndex: SLOT_INDEX });
          }
        }}
        className={`${heading.className} mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-b from-[#2a8cff] to-[#1672f3] px-3 text-center text-[14.5px] min-[400px]:text-[16px] sm:px-5 font-extrabold text-white shadow-[0_10px_24px_rgba(22,114,243,0.28)] transition hover:-translate-y-0.5 hover:brightness-105 sm:mt-7 sm:min-h-[56px] sm:text-[19px]`}
      >
        {isMember ? content.memberLabel : content.visitorLabel}
        <svg className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
      {content.footnote && !isMember ? (
        <p className="mt-2.5 text-center text-[12px] leading-snug text-[#3b4660] sm:text-[13px]">{content.footnote}</p>
      ) : null}

      <div className="mt-4 flex items-center gap-3 sm:mt-5" aria-hidden="true">
        <span className="h-px flex-1 bg-[#dfe5ee]" />
        <span className={`${script.className} flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[17px] text-[#26324d] sm:text-[22px]`}>
          Real People. Real Questions. A Stronger You.
          <HeartMark className="h-5 w-5 text-[#1f5fd6]" />
        </span>
        <span className="h-px flex-1 bg-[#dfe5ee]" />
      </div>
    </section>
  );
}
