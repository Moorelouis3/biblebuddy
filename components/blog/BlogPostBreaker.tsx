"use client";

import { useEffect, useState } from "react";
import BlogArticleEngagementBar from "@/components/blog/BlogArticleEngagementBar";
import { logBlogViewToMasterActions, trackBlogPageView } from "@/lib/blogViewTracking";

type BlogPostBreakerProps = {
  // Database key for likes/comments/views (legacy path for migrated posts).
  articleSlug: string;
  // Public path readers see, e.g. /blog/what-is-heaven. Used for share URLs.
  path: string;
  title: string;
};

// Horizontal like + share breaker row, placed between a post's intro and
// the rest of the article.
export default function BlogPostBreaker({ articleSlug, path, title }: BlogPostBreakerProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    trackBlogPageView(articleSlug);
    void logBlogViewToMasterActions(articleSlug, title);
  }, [articleSlug, title]);

  const pageUrl = `https://www.mybiblebuddy.net${path}`;
  const shareText = `Check out this Bible Buddy article: ${title}`;

  async function handleNativeShare() {
    if (typeof navigator === "undefined" || !navigator.share) {
      await handleCopyLink();
      return;
    }
    try {
      await navigator.share({ title, text: shareText, url: pageUrl });
    } catch {
      // User canceled the share sheet. Nothing to do.
    }
  }

  async function handleCopyLink() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyState("error");
      return;
    }
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2000);
    }
  }

  const socialLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`,
      icon: "W",
      color: "text-[#25D366]",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      icon: "f",
      color: "text-[#1877F2]",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,
      icon: "X",
      color: "text-slate-950",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
      icon: "in",
      color: "text-[#0A66C2]",
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${pageUrl}`)}`,
      icon: "@",
      color: "text-[#0056fd]",
    },
  ];

  return (
    <div className="my-8 border-y border-[#E7EEFF] py-4">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 [&>div]:mb-0">
          <BlogArticleEngagementBar articleSlug={articleSlug} />
        </div>

        <button
          type="button"
          onClick={() => setIsShareOpen((open) => !open)}
          aria-expanded={isShareOpen}
          aria-controls="blog-share-panel-content"
          className="flex shrink-0 items-center gap-2 rounded-full bg-[#0056fd] px-5 py-3 text-sm font-black text-white shadow-[0_10px_28px_rgba(0,86,253,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0049d8]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.6 10.7 6.8-4.4M8.6 13.3l6.8 4.4" />
          </svg>
          Share
        </button>
      </div>

      <div>
        {isShareOpen && (
          <div id="blog-share-panel-content" className="mt-4 rounded-[24px] border border-[#DCE8FF] bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-5">
            <p className="text-sm font-semibold leading-6 text-slate-500 sm:text-base">
              Share this article by text, copy the link, or send it through your favorite apps.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#0056fd] px-4 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(0,86,253,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0049d8] active:translate-y-0"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copyState === "copied" ? "Copied" : copyState === "error" ? "Copy Failed" : "Copy Link"}
              </button>

              <button
                type="button"
                onClick={handleNativeShare}
                className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
                  <path d="M12 16V4" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
                Share
              </button>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-3 border-t border-[#E7EEFF] pt-5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="group flex flex-col items-center gap-2 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DCE8FF] bg-white text-base font-black shadow-[0_10px_24px_rgba(15,23,42,0.07)] transition group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_30px_rgba(0,86,253,0.12)]">
                    <span className={item.color}>{item.icon}</span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 sm:text-xs">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
