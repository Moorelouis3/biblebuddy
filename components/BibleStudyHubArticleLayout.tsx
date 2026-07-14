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

  useEffect(() => {
    try {
      setIsEmbed(window.self !== window.top);
    } catch {
      setIsEmbed(true);
    }
  }, []);

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
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${pageUrl}`)}`,
    },
  ];

  const sharePanel = (
    <section className="mb-6 rounded-[24px] border border-[#d9e5ff] bg-white px-5 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0056fd]">Share This Article</p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            Send it by text, copy the link, or share it on your usual apps.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleNativeShare}
            className="rounded-full bg-[#0056fd] px-4 py-2 text-sm font-black text-white shadow-[0_12px_30px_rgba(0,86,253,0.2)]"
          >
            Share
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="rounded-full border border-[#c9d8ff] bg-[#f8fbff] px-4 py-2 text-sm font-black text-[#0056fd]"
          >
            {copyState === "copied" ? "Copied" : copyState === "error" ? "Copy failed" : "Copy link"}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="rounded-full border border-[#d9e5ff] bg-[#f8fbff] px-3 py-1.5 text-xs font-black text-slate-700 transition hover:border-[#0056fd] hover:text-[#0056fd]"
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );

  if (isEmbed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6">
        {children}
        {(isHubArticlePage || isTipsArticlePage) && articleSlug && (
          <div className="mt-2">
            <CommentSection
              articleSlug={articleSlug}
              headingText="Answer the reflection question below"
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
              Understand the Bible one day at a time.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600">
              Listen through the Bible in one year, open study notes, test yourself with trivia, and join the discussion.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-full bg-[#0056fd] px-6 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(0,86,253,0.22)]"
              >
                Start Free
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-[#b7ccff] bg-white px-6 py-3 text-sm font-black text-[#0056fd]"
              >
                More Articles
              </Link>
            </div>
          </section>

          <div className="mt-2">
            <CommentSection
              articleSlug={articleSlug}
              headingText="Answer the reflection question below"
              placeholderText="Type your reflection answer here to join the discussion..."
              submitButtonText="Share My Reflection"
            />
          </div>
        </>
      )}
    </div>
  );
}
