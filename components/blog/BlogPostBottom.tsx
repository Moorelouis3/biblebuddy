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
// - Logged out: promo card, then the landing-page style "Start Studying Now"
//   button as the very last element. No comment section at all.
// - Logged in: the comment section. No promos.
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

  // Into the app, not a signup form. There is no account to create: /start
  // makes a guest and drops the reader straight into studying. Sending blog
  // readers to /signup asked them for an email the product does not need.
  const endCtaHref = `/start?src=blog&promo=end-cta&post=${encodeURIComponent(postSlug)}`;

  return (
    <div className="mt-10 text-center">
      <Link
        href={endCtaHref}
        onClick={() =>
          trackBlogPromoEvent({ eventType: "click", promo: "end-cta", postSlug, slotIndex: 99 })
        }
        className="inline-flex w-full items-center justify-center rounded-2xl bg-[#0056fd] px-8 py-4 text-base font-black uppercase tracking-wide text-white shadow-[0_24px_60px_rgba(0,86,253,0.25)] transition hover:-translate-y-0.5 sm:w-auto sm:min-w-[340px]"
      >
        Start Studying Now
      </Link>
      <p className="mt-3 text-sm font-bold text-[#40516b]">No account needed. Completely free. 🤍</p>
    </div>
  );
}
