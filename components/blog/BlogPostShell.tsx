import Image from "next/image";
import Link from "next/link";
import { Children, isValidElement, type ReactNode } from "react";
import BlogPostingSchema from "@/components/BlogPostingSchema";
import BlogPostBreaker from "@/components/blog/BlogPostBreaker";
import BlogPostBottom from "@/components/blog/BlogPostBottom";
import PromoSlot from "@/components/blog/PromoSlot";
import { getArticleEngagementKey, getBlogArticle } from "@/lib/blogContent";

// Words inside a rendered node, counting text children and the text prop
// that VerseQuote-style components take. Used to space promo slots.
function countWords(node: unknown): number {
  if (node == null || typeof node === "boolean" || typeof node === "number") return 0;
  if (typeof node === "string") return node.split(/\s+/).filter((w) => /[A-Za-z]/.test(w)).length;
  if (Array.isArray(node)) return node.reduce((sum: number, child) => sum + countWords(child), 0);
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode; text?: unknown };
    return countWords(props.children) + (typeof props.text === "string" ? countWords(props.text) : 0);
  }
  return 0;
}

function textContent(node: unknown): string {
  if (node == null || typeof node === "boolean" || typeof node === "number") return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(textContent).join(" ");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return textContent(props.children);
  }
  return "";
}

// Weave PromoSlots into the article body: one after roughly every 1,000
// words, plus one right before the FAQ section. Never inserts after the
// final content block (so nothing stacks against the end CTA), and stops
// entirely once the FAQ starts.
function withPromoSlots(children: ReactNode, postSlug: string): ReactNode[] {
  const nodes = Children.toArray(children);
  const out: ReactNode[] = [];
  let wordsSincePromo = 0;
  let slotIndex = 1; // slot 0 renders right after the share breaker
  let faqReached = false;

  nodes.forEach((node, i) => {
    const isFaqSection = !faqReached && /frequently asked questions/i.test(textContent(node));

    if (isFaqSection) {
      const previous = out[out.length - 1];
      const previousIsPromo = isValidElement(previous) && previous.type === PromoSlot;
      if (!previousIsPromo) {
        out.push(<PromoSlot key="promo-before-faq" postSlug={postSlug} slotIndex={slotIndex++} />);
      }
      faqReached = true;
      out.push(node);
      return;
    }

    out.push(node);
    if (faqReached) return;

    wordsSincePromo += countWords(node);
    const isLastNode = i === nodes.length - 1;
    if (wordsSincePromo >= 1000 && !isLastNode) {
      out.push(<PromoSlot key={`promo-${i}`} postSlug={postSlug} slotIndex={slotIndex++} />);
      wordsSincePromo = 0;
    }
  });

  return out;
}

type BlogPostShellProps = {
  slug: string;
  // The on-page H1. Defaults to the listing title with the 📖 prefix.
  title?: ReactNode;
  // Content shown between the title and the share/like breaker row.
  intro: ReactNode;
  // The rest of the article, shown after the breaker.
  children: ReactNode;
};

// Standard blog post page order: banner image, category breadcrumb, title,
// intro, share/like breaker, article body, then CTA + comments.
export default function BlogPostShell({ slug, title, intro, children }: BlogPostShellProps) {
  const article = getBlogArticle(slug);
  if (!article) return null;

  const engagementKey = getArticleEngagementKey(article);
  const path = `/blog/${article.slug}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <BlogPostingSchema slug={slug} />
      <article>
        <div className="mb-6">
          <Image
            src={article.image}
            alt={`${article.title} banner`}
            width={1600}
            height={1000}
            className="h-auto w-full rounded-[28px] object-cover shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
            priority
          />
        </div>

        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
          <Link href="/blog" className="text-[#0056fd] transition hover:text-[#0049d8]">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <Link href={`/blog/category/${article.categorySlug}`} className="text-[#0056fd] transition hover:text-[#0049d8]">
            {article.category}
          </Link>
          <span aria-hidden="true">›</span>
          <span className="min-w-0 flex-1 truncate normal-case tracking-normal">{article.title}</span>
        </nav>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {title ?? <>📖 {article.title}</>}
        </h1>

        {intro}

        <BlogPostBreaker articleSlug={engagementKey} path={path} title={article.title} />

        <PromoSlot postSlug={article.slug} slotIndex={0} />

        {withPromoSlots(children, article.slug)}
      </article>

      <BlogPostBottom articleSlug={engagementKey} postSlug={article.slug} />
    </div>
  );
}
