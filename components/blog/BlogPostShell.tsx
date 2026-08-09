import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
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

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

// Strip leading emoji/symbols so TOC labels read clean.
function cleanHeadingLabel(text: string) {
  return text.replace(/^[^a-zA-Z0-9"']+/, "").replace(/\s+/g, " ").trim();
}

type TocEntry = { id: string; label: string };

// Give every H2 an id (jump target) and collect them for the table of
// contents. H2s live either at the top level (older posts) or one level
// down inside <section> blocks (newer posts).
function addHeadingAnchors(children: ReactNode, collector: TocEntry[]): ReactNode[] {
  const anchorH2 = (node: ReactNode): ReactNode => {
    if (!isValidElement(node) || node.type !== "h2") return node;
    const label = cleanHeadingLabel(textContent(node));
    const id = slugifyHeading(label);
    if (!label || !id) return node;
    collector.push({ id, label });
    return cloneElement(node as ReactElement<{ id?: string }>, { id });
  };

  return Children.toArray(children).map((node) => {
    const direct = anchorH2(node);
    if (direct !== node) return direct;
    if (!isValidElement(node)) return node;

    const props = node.props as { children?: ReactNode };
    if (!props.children) return node;
    let changed = false;
    const newKids = Children.toArray(props.children).map((kid) => {
      const anchored = anchorH2(kid);
      if (anchored !== kid) changed = true;
      return anchored;
    });
    return changed ? cloneElement(node as ReactElement, {}, ...newKids) : node;
  });
}

// Pull question/answer pairs out of the FAQ section (H3 question followed
// by a paragraph answer) for FAQPage structured data.
function extractFaqPairs(children: ReactNode): Array<{ question: string; answer: string }> {
  for (const node of Children.toArray(children)) {
    if (!isValidElement(node)) continue;
    if (!/frequently asked questions/i.test(textContent(node))) continue;

    const pairs: Array<{ question: string; answer: string }> = [];
    let currentQuestion: string | null = null;
    for (const kid of Children.toArray((node.props as { children?: ReactNode }).children)) {
      if (!isValidElement(kid)) continue;
      if (kid.type === "h3") {
        currentQuestion = textContent(kid).replace(/\s+/g, " ").trim();
      } else if (kid.type === "p" && currentQuestion) {
        pairs.push({ question: currentQuestion, answer: textContent(kid).replace(/\s+/g, " ").trim() });
        currentQuestion = null;
      }
    }
    return pairs;
  }
  return [];
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

  const tocEntries: TocEntry[] = [];
  const anchoredChildren = addHeadingAnchors(children, tocEntries);
  const totalWords = countWords(intro) + countWords(anchoredChildren);
  const readMinutes = Math.max(1, Math.round(totalWords / 200));
  const showToc = totalWords > 1500 && tocEntries.length >= 2;
  const faqPairs = extractFaqPairs(anchoredChildren);

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

        <p className="mt-3 text-sm font-bold text-[#6d7789]">⏱️ {readMinutes} min read</p>

        {showToc ? (
          <nav aria-label="Table of contents" className="mt-6 rounded-[22px] border border-[#DCE8FF] bg-[#f7faff] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0056fd]">In this guide</p>
            <ul className="mt-3 space-y-2 text-sm font-bold">
              {tocEntries.map((entry) => (
                <li key={entry.id}>
                  <a href={`#${entry.id}`} className="text-slate-700 transition hover:text-[#0056fd]">
                    {entry.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {intro}

        <BlogPostBreaker articleSlug={engagementKey} path={path} title={article.title} />

        <PromoSlot postSlug={article.slug} slotIndex={0} />

        {withPromoSlots(anchoredChildren, article.slug)}

        {faqPairs.length >= 2 ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqPairs.map((pair) => ({
                  "@type": "Question",
                  name: pair.question,
                  acceptedAnswer: { "@type": "Answer", text: pair.answer },
                })),
              }),
            }}
          />
        ) : null}
      </article>

      <BlogPostBottom articleSlug={engagementKey} postSlug={article.slug} />
    </div>
  );
}
