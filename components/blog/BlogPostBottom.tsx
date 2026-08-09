"use client";

import Link from "next/link";
import CommentSection from "@/components/comments/CommentSection";
import { trackBlogPromoEvent } from "@/lib/blogViewTracking";
import { useSupabaseUser } from "@/lib/useSupabaseUser";

type BlogPostBottomProps = {
  // Database key for comments (legacy path for migrated posts).
  articleSlug: string;
  // Public slug, used for signup tracking params.
  postSlug: string;
};

// Everything below the article body, gated by login state:
// - Logged out: signup CTA card, then the landing-page style
//   "Create Your Free Account" button as the very last element.
//   No comment section at all.
// - Logged in: the comment section. No signup CTAs.
export default function BlogPostBottom({ articleSlug, postSlug }: BlogPostBottomProps) {
  const { loading, userId } = useSupabaseUser();

  // Render nothing until auth resolves so visitors never see a flash of
  // comments and members never see a flash of signup CTAs.
  if (loading) return null;

  if (userId) {
    return (
      <div className="mt-8">
        <div id="blog-comments">
          <CommentSection
            articleSlug={articleSlug}
            headingText=""
            placeholderText="Type your reflection answer here to join the discussion..."
            submitButtonText="Share My Reflection"
          />
        </div>
      </div>
    );
  }

  const endCtaHref = `/signup?src=blog&promo=end-cta&post=${encodeURIComponent(postSlug)}`;

  return (
    <>
      <section className="my-8 rounded-[28px] border border-[#b7ccff] bg-[#eaf2ff] p-6 text-center shadow-[0_18px_48px_rgba(0,86,253,0.10)]">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0056fd]">
          Keep studying with Bible Buddy
        </p>
        <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">
          Keep learning after this article.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600">
          Start Bible in One Year, listen to guided lessons, and use study notes to understand Scripture one day at a time.
        </p>
      </section>

      <div className="mt-10 text-center">
        <Link
          href={endCtaHref}
          onClick={() =>
            trackBlogPromoEvent({ eventType: "click", promo: "end-cta", postSlug, slotIndex: 99 })
          }
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[#0056fd] px-8 py-4 text-base font-black uppercase tracking-wide text-white shadow-[0_24px_60px_rgba(0,86,253,0.25)] transition hover:-translate-y-0.5 sm:w-auto sm:min-w-[340px]"
        >
          Create Your Free Account
        </Link>
        <p className="mt-3 text-sm font-bold text-[#40516b]">It&apos;s free. It&apos;s easy. It&apos;s for you. 🤍</p>
      </div>
    </>
  );
}
