"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackBlogPromoEvent } from "@/lib/blogViewTracking";
import { useSupabaseUser } from "@/lib/useSupabaseUser";

/**
 * The invitation into the 31-day study, inside the Proverbs chapter posts.
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
 * Louis, 2026-10-08: the two banners used to land roughly 2,400 and 3,150 words
 * into a 3,700-word post, because the only place a promo could go was the gap
 * between two section cards - and the verse-by-verse card alone is 2,000 words.
 * Anyone who stopped reading halfway never saw the study. The first attempt at
 * fixing that put a banner directly under the title, which stacked two big
 * images on top of each other before a word of the article: "we already have
 * the big ass banner at the top then right under it u add anoter banner.. thats
 * bad! you gotta let the blog post cook some!" So nothing sits above the intro
 * now. The first invitation waits until the reader is about 500 words in, and
 * a post this length carries three asks in total. See BlogPostShell for the
 * spacing.
 *
 * The last of those three is not one of these banners. Louis, same day: "for
 * proverbs the bottom bible buddy promo should be for the wisdom of proverbs
 * and no 3rd promo as that is the promo at the end" - so the end-of-post card
 * in BlogAuthorBox carries the study, and nothing stacks above it. What is
 * left here are the two banners inside the article.
 */

/**
 * The banner pool.
 *
 * ADDING A NEW BANNER: drop the file in public/promos/ and add one entry here.
 * Nothing else needs to change - the posts rotate through whatever is in this
 * list, and a post never shows the same banner twice unless the list is shorter
 * than the number of slots.
 *
 * What a new banner has to be:
 *   - 1536 x 1024 (3:2 landscape), JPG, under about 350KB. Every existing promo
 *     on the blog is this size; a different shape makes the column jump.
 *   - Readable at 343px wide. That is the real width on a phone, and most of
 *     this traffic is phones. Headline text no smaller than roughly 1/12 of the
 *     image height, or it turns to mush.
 *   - Nothing important in the outer 6% - the card is rounded and clips corners.
 *   - It must say what the offer is: the book of Proverbs, 31 days, free. Do not
 *     put a button in the artwork; the real button is rendered underneath, so a
 *     painted one just looks broken next to it.
 *   - Only claims that are true: free, 31 days, one full chapter a day, every
 *     day unlocked from the start, read at your own pace. No member counts, no
 *     testimonials, no deadlines, no "join 10,000 others".
 *   - `name` is what lands in blog_promo_events, so keep it short, kebab-case
 *     and stable. Renaming it splits its history in the numbers.
 */
const BANNERS = [
  {
    name: "study-now",
    file: "proverbs-study-now.jpg",
    alt: "The Wisdom of Proverbs: a free 31-day Bible study inside Bible Buddy. Start studying now.",
  },
  {
    name: "next-31-days",
    file: "proverbs-next-31-days.jpg",
    alt: "Start your next 31 days with the book of Proverbs inside Bible Buddy.",
  },
];

const STUDY_PATH = "/devotionals/wisdom-of-proverbs";
const BUTTON_LABEL = "Join the Free Proverbs Study";

export default function ProverbsStudyPromo({
  postSlug,
  // Position in the post, counting from 1. Picks the banner and is stored on
  // the event row, so a slot's performance can be read per article.
  slotIndex = 1,
}: {
  postSlug: string;
  slotIndex?: number;
}) {
  const { loading, userId } = useSupabaseUser();
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const impressionSent = useRef(false);

  const banner = BANNERS[Math.max(0, slotIndex - 1) % BANNERS.length];
  const promoName = `proverbs-inline-${banner.name}`;

  useEffect(() => {
    if (loading || impressionSent.current) return;
    const el = linkRef.current;
    if (!el) return;
    const send = () => {
      impressionSent.current = true;
      trackBlogPromoEvent({ eventType: "impression", promo: promoName, postSlug, slotIndex });
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
  }, [loading, promoName, postSlug, slotIndex]);

  if (loading) return null;

  const isMember = Boolean(userId);
  const href = isMember
    ? STUDY_PATH
    : `${STUDY_PATH}?src=blog&promo=${promoName}&post=${encodeURIComponent(postSlug)}`;

  return (
    <Link
      ref={linkRef}
      href={href}
      rel={isMember ? undefined : "nofollow"}
      onClick={() => trackBlogPromoEvent({ eventType: "click", promo: promoName, postSlug, slotIndex })}
      aria-label={`${banner.alt} ${BUTTON_LABEL}.`}
      className="my-10 block overflow-hidden rounded-[24px] shadow-[0_18px_48px_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,86,253,0.16)]"
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
      <span className="flex items-center justify-center gap-2 bg-[#0056fd] px-4 py-4 text-center text-sm font-black text-white sm:text-base">
        {BUTTON_LABEL}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
