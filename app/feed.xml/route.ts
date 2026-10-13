import { BLOG_ARTICLES } from "@/lib/blogContent";

// RSS feed (2026-09-09 blog audit). WordPress ships one at /feed and we
// had nothing: no way for a reader to follow in Feedly, no way for an
// email digest or aggregator to pull new studies, and one fewer signal
// that this is a real publication. Newest 50 posts, rebuilt hourly.

export const revalidate = 3600;

const SITE_URL = "https://www.mybiblebuddy.net";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = [...BLOG_ARTICLES]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 50);

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${post.canonicalPath}`;
      // RFC-822 date, which is what RSS readers expect.
      const pubDate = new Date(`${post.updatedAt || post.publishedAt}T09:00:00Z`).toUTCString();
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <category>${escapeXml(post.category)}</category>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <enclosure url="${SITE_URL}${post.image}" type="image/jpeg" />`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bible Buddy Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Clear, practical Bible studies: verse breakdowns, character studies, and answers to the questions people actually ask.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
