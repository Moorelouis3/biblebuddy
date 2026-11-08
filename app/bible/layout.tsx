import type { Metadata } from "next";

/**
 * The reader is not a web page any more, so it should not be in an index.
 *
 * Louis, 2026-11-08: "The only thing that should be on Google is the blog.
 * Everything else should be locked behind the app."
 *
 * components/RequireAccount already sends a signed-out visitor to /signup, so
 * a crawler would find nothing to index either way. This says so outright
 * instead of relying on that, and it is the directive that gets an already
 * indexed URL dropped - a crawler has to be allowed in to read a noindex, so
 * this is the right tool here rather than a robots.txt Disallow, which would
 * only stop the crawl and leave anything already listed where it is.
 *
 * It replaces a worse signal. Every one of these pages used to inherit the
 * root canonical, which pointed at the home page and told Google the chapter
 * was a duplicate of it. That kept them out of the index by accident while
 * also telling search engines something untrue about the site.
 *
 * The chapter pages are not in app/sitemap.ts and must not be added.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BibleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
