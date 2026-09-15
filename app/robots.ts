import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /start creates an account when someone picks a path - crawlers have
      // no business there (they made dozens of empty accounts, 2026-09-15).
      disallow: ["/admin", "/api", "/settings", "/messages", "/start"],
    },
    sitemap: "https://www.mybiblebuddy.net/sitemap.xml",
  };
}
