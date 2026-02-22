"use client";

import Link from "next/link";
import { useState } from "react";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";
import { useRouter } from "next/navigation";

const tipsArticles: { href: string; emoji: string; title: string; desc: string; bg: string; text: string }[] = [
  {
    href: "/bible-study-tips/why-bible-study-is-hard",
    emoji: "🧠",
    title: "Why Bible Study Is Hard",
    desc: "5 Reasons Studying the Bible Is Hard",
    bg: "bg-yellow-100 border-yellow-200",
    text: "text-yellow-900",
  },
  {
    href: "/bible-study-tips/how-to-read-the-bible",
    emoji: "📖",
    title: "How to Read the Bible",
    desc: "A Simple Way to Study Scripture",
    bg: "bg-yellow-100 border-yellow-200",
    text: "text-yellow-900",
  },
  {
    href: "/bible-study-tips/a-simple-bible-highlighting-system",
    emoji: "🖍️",
    title: "A Simple Bible Highlighting System",
    desc: "How to Highlight With Purpose",
    bg: "bg-yellow-100 border-yellow-200",
    text: "text-yellow-900",
  },
];
export default function BibleStudyTipsPage() {
  const [view, setView] = useState<"articles" | "questions">("articles");
  const router = useRouter();

  return (
    <>
      <BibleStudyHubArticleLayout>
          <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-2">Bible Study Tips</h1>
            <p className="text-gray-600 mb-8">Practical advice and encouragement for your Bible study journey.</p>

            {/* Toggle UI */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border border-yellow-200 bg-yellow-50 overflow-hidden shadow-sm">
                <button
                  className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none ${view === "articles" ? "bg-yellow-100 text-yellow-900" : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"}`}
                  onClick={() => setView("articles")}
                  type="button"
                  aria-pressed={view === "articles"}
                >
                  Articles
                </button>
                <button
                  className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none border-l border-yellow-200 ${view === "questions" ? "bg-yellow-100 text-yellow-900" : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"}`}
                  onClick={() => setView("questions")}
                  type="button"
                  aria-pressed={view === "questions"}
                >
                  Questions
                </button>
              </div>
            </div>

            {/* Articles View */}
            {view === "articles" && (
              <div className="flex flex-col gap-5">
                {tipsArticles.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`rounded-xl p-6 shadow-sm border hover:shadow-md transition cursor-pointer flex items-start gap-4 ${t.bg}`}
                  >
                    <span className="text-3xl mt-1 select-none">{t.emoji}</span>
                    <div>
                      <div className={`font-bold text-lg mb-1 ${t.text}`}>{t.title}</div>
                      <div className="text-gray-700 text-sm">{t.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Questions View */}
            {view === "questions" && (
              <div className="flex flex-col gap-5">
                <button
                  onClick={() => router.push("/bible-study-tips/whats-your-best-study-tip")}
                  className="rounded-xl p-6 shadow-sm border bg-yellow-100 border-yellow-200 hover:shadow-md transition cursor-pointer flex flex-col gap-2 text-left w-full"
                  type="button"
                >
                  <div className="font-bold text-lg text-blue-900">💡 What’s Your Best Study Tip?</div>
                  <div className="text-gray-700 text-sm">Share what helps you most.</div>
                </button>
                <button
                  onClick={() => router.push("/bible-study-tips/how-do-you-take-notes")}
                  className="rounded-xl p-6 shadow-sm border bg-yellow-100 border-yellow-200 hover:shadow-md transition cursor-pointer flex flex-col gap-2 text-left w-full"
                  type="button"
                >
                  <div className="font-bold text-lg text-blue-900">📝 How Do You Take Notes?</div>
                  <div className="text-gray-700 text-sm">Everyone studies a little differently.</div>
                </button>
                <button
                  onClick={() => router.push("/bible-study-tips/what-keeps-you-consistent")}
                  className="rounded-xl p-6 shadow-sm border bg-yellow-100 border-yellow-200 hover:shadow-md transition cursor-pointer flex flex-col gap-2 text-left w-full"
                  type="button"
                >
                  <div className="font-bold text-lg text-blue-900">🔥 What Keeps You Consistent?</div>
                  <div className="text-gray-700 text-sm">Staying disciplined is not easy.</div>
                </button>
              </div>
            )}
	  </div>
        </BibleStudyHubArticleLayout>
      </>
    );
}
