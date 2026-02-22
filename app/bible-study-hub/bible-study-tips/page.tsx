"use client";

import Link from "next/link";
import { useState } from "react";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";
import { useRouter } from "next/navigation";

const tipsArticles: { href: string; title: string; desc: string }[] = [];

export default function BibleStudyTipsPage() {
  const [view, setView] = useState<"articles" | "questions">("articles");
  const router = useRouter();

  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Bible Study Tips</h1>
        <p className="text-gray-600 mb-8">Practical advice for studying Scripture.</p>

        {/* Toggle UI */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-blue-200 bg-blue-50 overflow-hidden shadow-sm">
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none ${view === "articles" ? "bg-blue-100 text-blue-900" : "bg-blue-50 text-blue-500 hover:bg-blue-100"}`}
              onClick={() => setView("articles")}
              type="button"
              aria-pressed={view === "articles"}
            >
              Articles
            </button>
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none border-l border-blue-200 ${view === "questions" ? "bg-blue-100 text-blue-900" : "bg-blue-50 text-blue-500 hover:bg-blue-100"}`}
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
            {/* Render article cards here (unchanged) */}
            {tipsArticles.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="rounded-xl p-6 shadow-sm border border-blue-200 bg-blue-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2"
              >
                <div className="font-bold text-lg text-blue-900">{i.title}</div>
                <div className="text-gray-700 text-sm">{i.desc}</div>
              </Link>
            ))}
          </div>
        )}

        {/* Questions View */}
        {view === "questions" && (
          <div className="flex flex-col gap-5">
            <button
              onClick={() => router.push("/bible-study-hub/bible-study-tips/whats-your-best-study-tip")}
              className="rounded-xl p-6 shadow-sm border border-blue-200 bg-blue-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2 text-left w-full"
              type="button"
            >
              <div className="font-bold text-lg text-blue-900">💡 What’s Your Best Study Tip?</div>
              <div className="text-gray-700 text-sm">Share what helps you most.</div>
            </button>
            <button
              onClick={() => router.push("/bible-study-hub/bible-study-tips/how-do-you-take-notes")}
              className="rounded-xl p-6 shadow-sm border border-blue-200 bg-blue-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2 text-left w-full"
              type="button"
            >
              <div className="font-bold text-lg text-blue-900">📝 How Do You Take Notes?</div>
              <div className="text-gray-700 text-sm">Everyone studies a little differently.</div>
            </button>
            <button
              onClick={() => router.push("/bible-study-hub/bible-study-tips/what-keeps-you-consistent")}
              className="rounded-xl p-6 shadow-sm border border-blue-200 bg-blue-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2 text-left w-full"
              type="button"
            >
              <div className="font-bold text-lg text-blue-900">🔥 What Keeps You Consistent?</div>
              <div className="text-gray-700 text-sm">Staying disciplined is not easy.</div>
            </button>
          </div>
        )}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
