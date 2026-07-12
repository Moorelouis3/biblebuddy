"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommentSection from "@/components/comments/CommentSection";

function toTitleCase(str: string) {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BibleStudyHubArticleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const [isEmbed, setIsEmbed] = useState(false);

  useEffect(() => {
    try {
      setIsEmbed(window.self !== window.top);
    } catch {
      setIsEmbed(true);
    }
  }, []);

  const isHubArticlePage = segments[0] === "bible-study-hub" && segments.length === 3;
  const isTipsArticlePage = segments[0] === "bible-study-tips" && segments.length === 2;
  const articleSlug = isHubArticlePage
    ? `/bible-study-hub/${segments[1]}/${segments[2]}`
    : isTipsArticlePage
      ? `/bible-study-tips/${segments[1]}`
      : undefined;

  if (isEmbed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6">
        {children}
        {(isHubArticlePage || isTipsArticlePage) && articleSlug && (
          <div className="mt-2">
            <CommentSection
              articleSlug={articleSlug}
              headingText="Answer the reflection question below"
              placeholderText="Type your reflection answer here to join the discussion..."
              submitButtonText="Share My Reflection"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {children}
      {(isHubArticlePage || isTipsArticlePage) && articleSlug && (
        <>
          <section className="my-8 rounded-[28px] border border-[#b7ccff] bg-[#eaf2ff] p-6 text-center shadow-[0_18px_48px_rgba(0,86,253,0.10)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0056fd]">
              Keep studying with Bible Buddy
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">
              Understand the Bible one day at a time.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600">
              Listen through the Bible in one year, open study notes, test yourself with trivia, and join the discussion.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-full bg-[#0056fd] px-6 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(0,86,253,0.22)]"
              >
                Start Free
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
            <CommentSection
              articleSlug={articleSlug}
              headingText="Answer the reflection question below"
              placeholderText="Type your reflection answer here to join the discussion..."
              submitButtonText="Share My Reflection"
            />
          </div>
        </>
      )}
    </div>
  );
}
