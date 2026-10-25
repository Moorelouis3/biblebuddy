import type { MetadataRoute } from "next";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/lib/blogContent";

const SITE_URL = "https://www.mybiblebuddy.net";

function newestDate(dates: string[]): Date {
  const sorted = [...dates].sort();
  return new Date(sorted[sorted.length - 1]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = newestDate(BLOG_ARTICLES.map((a) => a.publishedAt));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: newestPost,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...BLOG_CATEGORIES.map((category) => {
      const posts = BLOG_ARTICLES.filter((a) => a.categorySlug === category.slug);
      return {
        url: `${SITE_URL}/blog/category/${category.slug}`,
        lastModified: posts.length ? newestDate(posts.map((a) => a.publishedAt)) : newestPost,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      };
    }),
    // updatedAt first, publishedAt otherwise (2026-10-12). This used to be
    // publishedAt only, which meant a post that got a real content overhaul -
    // or a Christian News article updated because the research moved - never
    // signalled a re-crawl. The article schema already preferred updatedAt for
    // dateModified; the sitemap disagreeing with it was the bug.
    ...BLOG_ARTICLES.map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // The shareable study entry pages. Proverbs was added on 2026-10-06, when
    // the sitemap listed only the homepage and the blog; the other two were
    // simply never added after it, so Google has never been told they exist
    // (noticed 2026-10-25). Every one of these is a real door into the app
    // for somebody who has never heard of it.
    ...[
      "/devotionals/wisdom-of-proverbs",
      "/devotionals/higher-hope",
      "/bible-in-one-year",
    ].map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
