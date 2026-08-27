import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import BlogPostingSchema from "@/components/BlogPostingSchema";
import BlogPostBreaker from "@/components/blog/BlogPostBreaker";
import BlogPostBottom from "@/components/blog/BlogPostBottom";
import BlogTopNav from "@/components/blog/BlogTopNav";
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
  let slotIndex = 0;
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

// Bible quotes in the body, so the meta row can say how many there are.
// VerseQuote is declared per post, so it is matched by its props rather
// than by identity: a component taking both text and reference is a verse.
function countVerses(node: unknown): number {
  if (Array.isArray(node)) return node.reduce((sum: number, child) => sum + countVerses(child), 0);
  if (!isValidElement(node)) return 0;
  const props = node.props as { children?: ReactNode; text?: unknown; reference?: unknown };
  const isVerse = typeof props.text === "string" && typeof props.reference === "string";
  return (isVerse ? 1 : 0) + countVerses(props.children);
}

// The emoji a section heading opens with, used as the card's icon.
function leadingEmoji(text: string) {
  const match = text.trim().match(/^([\p{Extended_Pictographic}](?:\uFE0F|\u200D[\p{Extended_Pictographic}]\uFE0F?)*)/u);
  return match?.[1] || null;
}

/**
 * Turn each H2 section into a collapsible card.
 *
 * The app shows a devotional as a stack of day cards you open one at a
 * time; a post reads the same way instead of as one long scroll. Native
 * <details> does the opening, so there is no JavaScript, nothing to
 * hydrate, and the whole article is still in the HTML for search engines
 * — the collapsed sections are hidden by the browser, not withheld.
 *
 * Open by default: the first section (so the page never looks empty), the
 * FAQ (its answers earn the rich result), and the closing CTA.
 */
function toSectionCards(children: ReactNode): ReactNode[] {
  let sectionIndex = 0;

  return Children.toArray(children).map((node) => {
    if (!isValidElement(node)) return node;
    const props = node.props as { children?: ReactNode };
    const kids = Children.toArray(props.children);
    const headingIndex = kids.findIndex((kid) => isValidElement(kid) && kid.type === "h2");
    if (headingIndex < 0) return node;

    const heading = kids[headingIndex] as ReactElement<{ id?: string; className?: string; children?: ReactNode }>;
    const headingText = textContent(heading);
    const label = cleanHeadingLabel(headingText);
    const icon = leadingEmoji(headingText);
    const body = kids.filter((_, i) => i !== headingIndex);

    const isFaq = /frequently asked questions/i.test(headingText);
    const isCta = /keep growing/i.test(headingText);
    const isFirst = sectionIndex === 0;
    sectionIndex += 1;

    return (
      <details
        key={heading.props.id || label}
        open={isFirst || isFaq || isCta}
        className="group mt-3 overflow-hidden rounded-[24px] border border-[#DCE8FF] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
      >
        <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 transition hover:bg-[#f7faff] [&::-webkit-details-marker]:hidden">
          {icon ? (
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-[#eaf2ff] text-xl">
              {icon}
            </span>
          ) : null}
          {cloneElement(heading, {
            className: "min-w-0 flex-1 text-lg font-black leading-snug tracking-tight text-slate-950 sm:text-xl",
            children: label,
          })}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-[#0056fd] transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="border-t border-[#eef3fb] px-4 pb-5 pt-1">{body}</div>
      </details>
    );
  });
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
  const verseCount = countVerses(anchoredChildren);
  const faqPairs = extractFaqPairs(anchoredChildren);

  return (
    <>
    <BlogTopNav />
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-4">
      <BlogPostingSchema slug={slug} />
      <article>
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
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

        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {title ?? <>📖 {article.title}</>}
        </h1>

        {/* The same meta row a devotional or a Bible in One Year day carries. */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-bold text-[#41506b]">
          <span className="rounded-full bg-[#f2f7ff] px-3 py-1.5">⏱️ {readMinutes} min read</span>
          {tocEntries.length >= 2 ? (
            <span className="rounded-full bg-[#f2f7ff] px-3 py-1.5">📑 {tocEntries.length} sections</span>
          ) : null}
          {verseCount > 0 ? (
            <span className="rounded-full bg-[#f2f7ff] px-3 py-1.5">📖 {verseCount} verses</span>
          ) : null}
        </div>

        {intro}

        <BlogPostBreaker articleSlug={engagementKey} path={path} title={article.title} />

        {withPromoSlots(toSectionCards(anchoredChildren), article.slug)}

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
    </>
  );
}
