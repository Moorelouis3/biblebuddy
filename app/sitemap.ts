import type { MetadataRoute } from "next";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/lib/blogContent";

const SITE_URL = "https://www.mybiblebuddy.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...BLOG_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/blog/category/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...BLOG_ARTICLES.map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...BLOG_ARTICLES.map((article) => ({
      url: `${SITE_URL}${article.canonicalPath}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
