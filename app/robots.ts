import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/settings", "/messages"],
    },
    sitemap: "https://www.mybiblebuddy.net/sitemap.xml",
  };
}
