"use client";

import CommentSection from "@/components/comments/CommentSection";
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

  // Logged out: nothing. The Bible Buddy end card (BlogAuthorBox) is the one
  // end-of-post CTA since 2026-09-17 (Louis).
  return null;
}
