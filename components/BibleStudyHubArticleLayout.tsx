"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommentSection from "@/components/comments/CommentSection";

function toTitleCase(str: string) {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BibleStudyHubArticleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const [isEmbed, setIsEmbed] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    try {
      setIsEmbed(window.self !== window.top);
    } catch {
      setIsEmbed(true);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const reflectionHeading = Array.from(document.querySelectorAll("h2")).find(
      (heading) => heading.textContent?.trim().toLowerCase() === "reflection question",
    );
    const reflectionBlock = reflectionHeading?.closest("div");
    const reflectionSlot = document.getElementById("blog-reflection-slot");

    if (!reflectionBlock || !reflectionSlot || reflectionSlot.contains(reflectionBlock)) return;

    reflectionBlock.classList.add("blog-reflection-question-block");
    reflectionSlot.appendChild(reflectionBlock);
  }, [pathname, isEmbed]);

  const isHubArticlePage = segments[0] === "bible-study-hub" && segments.length === 3;
  const isTipsArticlePage = segments[0] === "bible-study-tips" && segments.length === 2;
  const articleSlug = isHubArticlePage
    ? `/bible-study-hub/${segments[1]}/${segments[2]}`
    : isTipsArticlePage
      ? `/bible-study-tips/${segments[1]}`
      : undefined;
  const pageUrl = `https://www.mybiblebuddy.net${pathname}`;
  const shareTitle =
    typeof document !== "undefined"
      ? document.title.replace(/\s*\|\s*Bible Buddy.*$/i, "").trim()
      : toTitleCase(segments[segments.length - 1] || "Bible Buddy");
  const shareText = `Check out this Bible Buddy article: ${shareTitle}`;

  async function handleNativeShare() {
    if (typeof navigator === "undefined" || !navigator.share) {
      await handleCopyLink();
      return;
    }

    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: pageUrl,
      });
    } catch {
      // User canceled or platform rejected share. No UI error needed here.
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
      href: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${pageUrl}`)}`,
      icon: "@",
      color: "text-[#0056fd]",
    },
  ];

  const sharePanel = (
    <section className="mb-8 rounded-[24px] border border-[#DCE8FF] bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-5">
      <button
        type="button"
        onClick={() => setIsShareOpen((open) => !open)}
        aria-expanded={isShareOpen}
        aria-controls="blog-share-panel-content"
        className="flex w-full items-center gap-4 text-left"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0056fd] text-white shadow-[0_14px_28px_rgba(0,86,253,0.24)]">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.6 10.7 6.8-4.4M8.6 13.3l6.8 4.4" />
          </svg>
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-[#0056fd]">Share this article</span>
          <span className="mt-1 block text-base font-black leading-tight text-slate-950 sm:text-lg">
            Help others discover God's Word.
          </span>
        </span>

        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-[#0056fd] transition ${isShareOpen ? "rotate-180" : ""}`}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {isShareOpen && (
        <div id="blog-share-panel-content" className="mt-5 border-t border-[#E7EEFF] pt-5">
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
    </section>
  );

  if (isEmbed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6">
        {children}
        {(isHubArticlePage || isTipsArticlePage) && articleSlug && (
          <div className="mt-2">
            <div id="blog-reflection-slot" className="mt-8" />
            <CommentSection
              articleSlug={articleSlug}
              headingText=""
              placeholderText="Type your reflection answer here to join the discussion..."
              submitButtonText="Share My Reflection"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {(isHubArticlePage || isTipsArticlePage) && sharePanel}
      {children}
      {(isHubArticlePage || isTipsArticlePage) && articleSlug && (
        <>
          <section className="my-8 rounded-[28px] border border-[#b7ccff] bg-[#eaf2ff] p-6 text-center shadow-[0_18px_48px_rgba(0,86,253,0.10)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0056fd]">
              Keep studying with Bible Buddy
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">
              Keep learning after this article.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600">
              Start Bible in One Year, listen to guided lessons, and use study notes to understand Scripture one day at a time.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-full bg-[#0056fd] px-6 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(0,86,253,0.22)]"
              >
                Start Studying Free
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-[#b7ccff] bg-white px-6 py-3 text-sm font-black text-[#0056fd]"
              >
                More Articles
              </Link>
            </div>
          </section>

          <div id="blog-reflection-slot" className="mt-8" />

          <div className="mt-2">
            <CommentSection
              articleSlug={articleSlug}
              headingText=""
              placeholderText="Type your reflection answer here to join the discussion..."
              submitButtonText="Share My Reflection"
            />
          </div>
        </>
      )}
    </div>
  );
}
