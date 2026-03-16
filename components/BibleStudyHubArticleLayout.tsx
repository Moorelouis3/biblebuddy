"use client";

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
