import { getBlogArticle } from "@/lib/blogContent";

const SITE_URL = "https://www.mybiblebuddy.net";

// BlogPosting JSON-LD for a blog article, built from the same
// lib/blogContent.ts entry that drives the page metadata. Rendered by
// every /blog/<slug> page so Google sees headline, author, dates, and
// image as structured data.
export default function BlogPostingSchema({ slug }: { slug: string }) {
  const article = getBlogArticle(slug);
  if (!article) return null;

  const url = `${SITE_URL}/blog/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}${article.image}`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: "Louis",
      jobTitle: "Founder of Bible Buddy",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Bible Buddy",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Biblebuddyicon.png`,
      },
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
