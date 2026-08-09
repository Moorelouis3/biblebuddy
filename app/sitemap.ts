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
    ...BLOG_ARTICLES.map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
