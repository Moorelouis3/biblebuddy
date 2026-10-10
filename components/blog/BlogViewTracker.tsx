"use client";

import { useEffect } from "react";
import { logBlogViewToMasterActions, trackBlogPageView } from "@/lib/blogViewTracking";

type BlogViewTrackerProps = {
  // Database key for views (legacy path for migrated posts).
  articleSlug: string;
  title: string;
};

// Page-view logging on its own, with nothing rendered.
//
// This used to live inside BlogPostBreaker, which was fine while every post
// carried that like/share row. The Proverbs chapter posts dropped it
// (Louis, 2026-10-08: the devotional invitation takes that spot instead), and
// a post losing its share row must not quietly stop counting readers - so the
// tracking moved out here and the breaker now renders this too.
export default function BlogViewTracker({ articleSlug, title }: BlogViewTrackerProps) {
  useEffect(() => {
    trackBlogPageView(articleSlug);
    void logBlogViewToMasterActions(articleSlug, title);
  }, [articleSlug, title]);

  return null;
}
