"use client";

import Link from "next/link";
import CommentSection from "@/components/comments/CommentSection";

type BlogPostBottomProps = {
  // Database key for comments (legacy path for migrated posts).
  articleSlug: string;
};

// Everything below the article body: the keep-studying CTA and comments.
export default function BlogPostBottom({ articleSlug }: BlogPostBottomProps) {
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
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-full bg-[#0056fd] px-6 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(0,86,253,0.22)]"
          >
            Start Studying Free
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-[#b7ccff] bg-white px-6 py-3 text-sm font-black text-[#0056fd]"
          >
            More Articles
          </Link>
        </div>
      </section>

      <div className="mt-2">
        <div id="blog-comments">
          <CommentSection
            articleSlug={articleSlug}
            headingText=""
            placeholderText="Type your reflection answer here to join the discussion..."
            submitButtonText="Share My Reflection"
          />
        </div>
      </div>
    </>
  );
}
