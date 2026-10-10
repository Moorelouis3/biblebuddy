import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import BlogPostingSchema from "@/components/BlogPostingSchema";
import RelatedPosts from "./RelatedPosts";
import BlogAuthorBox from "./BlogAuthorBox";
import ChapterNav from "./ChapterNav";
import BibleYearNotesNav from "./BibleYearNotesNav";
import BlogPostBreaker from "@/components/blog/BlogPostBreaker";
import BlogPostBottom from "@/components/blog/BlogPostBottom";
import BlogTopNav from "@/components/blog/BlogTopNav";
import BlogViewTracker from "@/components/blog/BlogViewTracker";
import PromoSlot from "@/components/blog/PromoSlot";
import BibleYearPromo from "@/components/blog/BibleYearPromo";
import ProverbsStudyPromo from "@/components/blog/ProverbsStudyPromo";
import { getArticleEngagementKey, getBlogArticle } from "@/lib/blogContent";

const SITE_URL = "https://www.mybiblebuddy.net";

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

/**
 * A Proverbs chapter post, by its slug: proverbs-1-explained to
 * proverbs-31-explained.
 *
 * Matched on the slug rather than kept as a list, so the thirty-one posts and
 * any later rewrite of them are covered without a list to maintain. The chapter
 * number is bounded so an unrelated post that happens to start with the word
 * cannot pick up the study's banner by accident.
 */
function isProverbsChapterPost(slug: string): boolean {
  const m = /^proverbs-(\d{1,2})-explained$/.exec(slug || "");
  if (!m) return false;
  const chapter = Number(m[1]);
  return chapter >= 1 && chapter <= 31;
}

/**
 * How many banners a Proverbs post carries, and where they go.
 *
 * Louis, 2026-10-08: "you gotta let the blog post cook some!!!" - so nothing
 * sits above the intro. The hero image is already there; a banner under it
 * stacks two pictures before a word has been read. The first invitation waits
 * until the reader is a few hundred words in and has decided to stay.
 * "i think this length post should have 3 promos" - at roughly one per 1,200
 * words, a 3,000 to 3,900 word chapter post gets two inside the article plus
 * the closing one, which is three.
 */
const WORDS_PER_INVITATION = 1200;
const MIN_INVITATIONS = 2;
const MAX_INVITATIONS = 5;
// Where the first one aims for: far enough in that the post has started, early
// enough that someone who gives up halfway has still been asked once.
const FIRST_INVITATION_AFTER = 500;
// A break this close to the end would read as part of the closing banner.
const CLOSING_CLEARANCE = 800;
// Two banners closer together than this crowd each other.
const MIN_INVITATION_GAP = 500;

/**
 * Where an invitation is allowed to go, and whether one goes there.
 *
 * Promos used to be spaced by counting whole top-level nodes, which on a
 * Proverbs post means counting seven section cards - and the verse-by-verse
 * card is 2,000 words of them. Nothing could be placed inside it, so the
 * first banner appeared two thirds of the way down the page.
 *
 * The legal breaks are decided by the caller: between two section cards, or in
 * front of an H3 inside a card. Never mid paragraph, never between a heading
 * and the text under it. The same walk runs twice. The first pass places
 * nothing and just records how many words in each break falls; planInvitations
 * then picks which of those breaks to use; the second pass inserts at them.
 *
 * Two passes rather than one greedy pass because greedy cannot look ahead: it
 * has to commit at the first break past its word budget, and on a post whose
 * next break is 600 words later it either lands badly or runs out of room and
 * drops a banner entirely. Picking the break nearest each target gets the
 * spacing right on every chapter without hand-tuning any of them.
 */
type InvitationBudget = {
  // Count words that have just been emitted into the article.
  spend: (node: ReactNode) => void;
  // Offer a legal break. Returns a banner when one belongs here.
  take: () => ReactNode | null;
};

// First pass: record where every legal break falls, insert nothing.
function createBreakSurvey(startWords: number) {
  let cursor = startWords;
  const offsets: number[] = [];
  return {
    offsets,
    spend(node: ReactNode) {
      cursor += countWords(node);
    },
    take() {
      offsets.push(cursor);
      return null;
    },
  };
}

/**
 * Choose which of the surveyed breaks get a banner.
 *
 * Targets are the first one at FIRST_INVITATION_AFTER and the rest spread
 * evenly over what is left, so a three-banner post reads early, middle, end.
 * Each target takes the nearest break that is not already spoken for, is not
 * inside the closing banner's clearance, and is not crowding another banner.
 */
function planInvitations(offsets: number[], totalWords: number): Set<number> {
  const chosen = new Set<number>();
  if (offsets.length === 0) return chosen;

  const count = Math.min(
    MAX_INVITATIONS,
    Math.max(MIN_INVITATIONS, Math.round(totalWords / WORDS_PER_INVITATION)),
  );
  // One of the asks is the end-of-post card, which is not a break in the
  // article and is rendered separately.
  const interior = count - 1;
  const first = Math.min(FIRST_INVITATION_AFTER, totalWords);

  for (let i = 0; i < interior; i++) {
    const target = first + (i * (totalWords - first)) / interior;
    let best = -1;
    let bestDistance = Infinity;

    for (let index = 0; index < offsets.length; index++) {
      if (chosen.has(index)) continue;
      const offset = offsets[index];
      if (totalWords - offset < CLOSING_CLEARANCE) continue;
      let crowded = false;
      for (const taken of chosen) {
        if (Math.abs(offset - offsets[taken]) < MIN_INVITATION_GAP) crowded = true;
      }
      if (crowded) continue;
      const distance = Math.abs(offset - target);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    }

    if (best < 0) break;
    chosen.add(best);
  }

  return chosen;
}

// Second pass: insert a banner at each break the plan picked. Words no longer
// matter here, because the plan is already fixed and both passes walk the
// article in the same order.
function createInvitationPlacer(
  chosen: Set<number>,
  render: (slotIndex: number) => ReactNode,
): InvitationBudget {
  let breakIndex = -1;
  let placed = 0;
  return {
    spend() {},
    take() {
      breakIndex += 1;
      if (!chosen.has(breakIndex)) return null;
      placed += 1;
      // Slots count from 1 and pick the artwork, so no two banners in a post
      // show the same picture while the pool is big enough.
      return render(placed);
    },
  };
}

/**
 * Weave invitations into one section card's body.
 *
 * Allowed in front of any H3 except the card's first block, so a subheading
 * never gets separated from the text it introduces and an invitation never
 * lands directly under the card's own H2 row. Paragraphs, verse quotes and
 * lists are never broken into, because an H3 is the only break considered.
 */
function weaveSectionBody(body: ReactNode[], budget?: InvitationBudget): ReactNode[] {
  if (!budget) return body;

  const out: ReactNode[] = [];
  body.forEach((node, i) => {
    if (i > 0 && isValidElement(node) && node.type === "h3") {
      const invitation = budget.take();
      if (invitation) out.push(invitation);
    }
    out.push(node);
    budget.spend(node);
  });
  return out;
}

// Weave PromoSlots into the article body: one after roughly every 1,000
// words, plus one right before the FAQ section. Never inserts after the
// final content block (so nothing stacks against the end CTA), and stops
// entirely once the FAQ starts.
function withPromoSlots(
  children: ReactNode,
  postSlug: string,
  bibleYear?: { day: number; reading?: string },
): ReactNode[] {
  // Bible in One Year Study Notes get their own promo for that day instead of
  // the rotating generic banners (Louis, 2026-09-19). The Proverbs chapter
  // posts are not routed through here at all - they weave the 31-day study
  // invitation themselves, on a tighter word budget that can reach inside a
  // long section card. See weaveStudyInvitations below.
  const promo = (key: string, slotIndex: number) => {
    if (bibleYear) {
      return <BibleYearPromo key={key} day={bibleYear.day} reading={bibleYear.reading} postSlug={postSlug} slotIndex={slotIndex} />;
    }
    return <PromoSlot key={key} postSlug={postSlug} slotIndex={slotIndex} />;
  };
  const nodes = Children.toArray(children);
  const out: ReactNode[] = [];
  let wordsSincePromo = 0;
  let slotIndex = 0;
  let faqReached = false;

  nodes.forEach((node, i) => {
    const isFaqSection = !faqReached && /frequently asked questions/i.test(textContent(node));

    if (isFaqSection) {
      const previous = out[out.length - 1];
      const previousIsPromo = isValidElement(previous)
        && (previous.type === PromoSlot || previous.type === BibleYearPromo);
      if (!previousIsPromo) {
        out.push(promo("promo-before-faq", slotIndex++));
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
      out.push(promo(`promo-${i}`, slotIndex++));
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
 * Turn each H2 section into a card - always open, never collapsed.
 *
 * These were <details> cards you tapped open one at a time, mirroring the
 * devotional day stack. Louis, 2026-09-09: the blog is the funnel now, so
 * every post reads as one flat scroll. (The collapsed version was already
 * fully crawlable - native <details> keeps its text in the HTML - but a
 * reader arriving from Google should never have to tap to start reading,
 * and bounce is what actually costs rankings.) The card framing stays:
 * the heading row with its emoji, body below.
 */
function toSectionCards(children: ReactNode, budget?: InvitationBudget): ReactNode[] {
  const out: ReactNode[] = [];
  let sectionIndex = 0;
  // The heading whose card is still collecting its body, for flat posts.
  let openHeading: ReactElement<{ id?: string; className?: string; children?: ReactNode }> | null = null;
  let openBody: ReactNode[] = [];

  function card(
    heading: ReactElement<{ id?: string; className?: string; children?: ReactNode }>,
    body: ReactNode[],
  ) {
    const headingText = textContent(heading);
    const label = cleanHeadingLabel(headingText);
    const icon = leadingEmoji(headingText);
    sectionIndex += 1;

    budget?.spend(heading);
    const wovenBody = weaveSectionBody(body, budget);

    return (
      <section
        key={heading.props.id || label || `section-${sectionIndex}`}
        className="mt-3 overflow-hidden rounded-[24px] border border-[#DCE8FF] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
      >
        <div className="flex items-center gap-3 px-4 pb-3 pt-4">
          {icon ? (
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-[#eaf2ff] text-xl">
              {icon}
            </span>
          ) : null}
          {cloneElement(heading, {
            className: "min-w-0 flex-1 text-lg font-black leading-snug tracking-tight text-slate-950 sm:text-xl",
            children: label,
          })}
        </div>
        <div className="border-t border-[#eef3fb] px-4 pb-5 pt-3">{wovenBody}</div>
      </section>
    );
  }

  function flush() {
    if (!openHeading) return;
    out.push(card(openHeading, openBody));
    openHeading = null;
    openBody = [];
  }

  // The gap between two section cards is the other legal reading break.
  // Never before the first card, which would put it above the article.
  function breakBetweenCards() {
    if (!budget || out.length === 0) return;
    const invitation = budget.take();
    if (invitation) out.push(invitation);
  }

  Children.toArray(children).forEach((node) => {
    if (!isValidElement(node)) {
      if (openHeading) openBody.push(node);
      else {
        out.push(node);
        budget?.spend(node);
      }
      return;
    }

    // Flat posts: a bare H2 starts a card that runs to the next heading.
    if (node.type === "h2") {
      flush();
      breakBetweenCards();
      openHeading = node as ReactElement<{ id?: string; className?: string; children?: ReactNode }>;
      return;
    }

    // Newer posts: a <section> that carries its own H2 becomes one card.
    const props = node.props as { children?: ReactNode };
    const kids = Children.toArray(props.children);
    const headingIndex = kids.findIndex((kid) => isValidElement(kid) && kid.type === "h2");
    if (headingIndex >= 0) {
      flush();
      breakBetweenCards();
      out.push(
        card(
          kids[headingIndex] as ReactElement<{ id?: string; className?: string; children?: ReactNode }>,
          kids.filter((_, i) => i !== headingIndex),
        ),
      );
      return;
    }

    if (openHeading) openBody.push(node);
    else {
      out.push(node);
      budget?.spend(node);
    }
  });

  flush();
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
//
// A Proverbs chapter post reads in a different order (Louis, 2026-10-08): the
// like/share breaker is gone, two study banners are woven through the body at
// reading breaks, and the end-of-post card sells the 31-day study instead of
// the app in general. Three asks on a post this long - early, middle, end - so
// a reader who stops partway has already been asked at least once.
export default function BlogPostShell({ slug, title, intro, children }: BlogPostShellProps) {
  const article = getBlogArticle(slug);
  if (!article) return null;

  const engagementKey = getArticleEngagementKey(article);
  const path = `/blog/${article.slug}`;

  const tocEntries: TocEntry[] = [];
  const anchoredChildren = addHeadingAnchors(children, tocEntries);
  const introWords = countWords(intro);
  const totalWords = introWords + countWords(anchoredChildren);
  const readMinutes = Math.max(1, Math.round(totalWords / 200));
  const verseCount = countVerses(anchoredChildren);
  const faqPairs = extractFaqPairs(anchoredChildren);

  const isProverbsStudyPost = isProverbsChapterPost(article.slug);
  const studyInvitation = (slotIndex: number) => (
    <ProverbsStudyPromo key={`proverbs-study-${slotIndex}`} postSlug={article.slug} slotIndex={slotIndex} />
  );
  // Two passes over the same walk: survey the legal breaks, pick the ones that
  // get a banner, then build the body for real. The intro counts as words
  // already read, so the first banner lands a few hundred words into the
  // article proper rather than straight under the title.
  const breakSurvey = isProverbsStudyPost ? createBreakSurvey(introWords) : undefined;
  if (breakSurvey) toSectionCards(anchoredChildren, breakSurvey);
  const invitationBudget = breakSurvey
    ? createInvitationPlacer(planInvitations(breakSurvey.offsets, totalWords), studyInvitation)
    : undefined;
  const body = isProverbsStudyPost
    ? toSectionCards(anchoredChildren, invitationBudget)
    : withPromoSlots(
        toSectionCards(anchoredChildren),
        article.slug,
        article.bibleYearDay
          ? { day: article.bibleYearDay, reading: article.bibleYearReading }
          : undefined,
      );

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

        {/* The like/comment/share breaker used to sit under the meta row on
            these posts, earning almost nothing that high up. It is gone, and
            nothing replaces it: a banner there would stack straight onto the
            post's own hero image before a word had been read. So only the view
            tracking that lived inside the breaker stays. */}
        {isProverbsStudyPost ? (
          <BlogViewTracker articleSlug={engagementKey} title={article.title} />
        ) : null}

        {intro}

        {isProverbsStudyPost ? null : (
          <BlogPostBreaker articleSlug={engagementKey} path={path} title={article.title} />
        )}

        {body}

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

        {/* BreadcrumbList: turns the bare URL in a Google result into
            "Bible Buddy > Character Studies > Who Was Jezebel", which is
            both clearer and measurably better for click-through. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: article.category,
                  item: `${SITE_URL}/blog/category/${article.categorySlug}`,
                },
                { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}${path}` },
              ],
            }),
          }}
        />
      </article>

      <ChapterNav slug={article.slug} />
      <BibleYearNotesNav slug={article.slug} />
      <BlogAuthorBox postSlug={article.slug} variant={isProverbsStudyPost ? "proverbs" : "app"} />
      <RelatedPosts slug={article.slug} />

      <BlogPostBottom articleSlug={engagementKey} postSlug={article.slug} />
    </div>
    </>
  );
}
