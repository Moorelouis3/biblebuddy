
"use client";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

const articleCards = [
  {
    href: "/bible-study-hub/christian-foundations/what-is-hell",
    emoji: "🔥",
    title: "What Is Hell",
    subtitle: "Understanding Hell Biblically",
  },
  {
    href: "/bible-study-hub/christian-foundations/what-is-heaven",
    emoji: "✨",
    title: "What Is Heaven",
    subtitle: "Understanding Heaven Biblically",
  },
  {
    href: "/bible-study-hub/christian-foundations/why-so-many-denominations",
    emoji: "🌎",
    title: "Why So Many Denominations",
    subtitle: "Understanding Christian Divisions",
  },
];

const questionCards = [
  {
    href: "/bible-study-hub/christian-foundations/what-is-your-testimony",
    emoji: "📖",
    title: "What Is Your Testimony?",
    subtitle: "Share how faith changed you.",
  },
  {
    href: "/bible-study-hub/christian-foundations/what-does-being-christian-mean",
    emoji: "✝️",
    title: "What Does Being Christian Mean?",
    subtitle: "Faith is more than religion.",
  },
  {
    href: "/bible-study-hub/christian-foundations/what-does-following-jesus-look-like",
    emoji: "❤️",
    title: "What Does Following Jesus Look Like?",
    subtitle: "Faith lived out daily.",
  },
];

export default function ChristianFoundationsPage() {
  const [view, setView] = useState<"articles" | "questions">("articles");
  const router = useRouter();

  // Use purple color scheme for both articles and questions cards/toggle
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Christian Foundations</h1>
        <p className="text-gray-600 mb-8">Core beliefs and essential teachings for the Christian faith.</p>

        {/* Toggle UI */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-purple-200 bg-purple-50 overflow-hidden shadow-sm">
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none ${view === "articles" ? "bg-purple-100 text-purple-900" : "bg-purple-50 text-purple-700 hover:bg-purple-100"}`}
              onClick={() => setView("articles")}
              type="button"
              aria-pressed={view === "articles"}
            >
              Articles
            </button>
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none border-l border-purple-200 ${view === "questions" ? "bg-purple-100 text-purple-900" : "bg-purple-50 text-purple-700 hover:bg-purple-100"}`}
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
            {articleCards.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="rounded-xl p-6 shadow-sm border border-purple-200 bg-purple-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
              >
                <span className="text-3xl mt-1 select-none">{a.emoji}</span>
                <div>
                  <div className="font-bold text-lg text-purple-900 mb-1">{a.title}</div>
                  <div className="text-gray-700 text-sm">{a.subtitle}</div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Questions View */}
        {view === "questions" && (
          <div className="flex flex-col gap-5">
            {questionCards.map((q) => (
              <button
                key={q.href}
                onClick={() => router.push(q.href)}
                className="rounded-xl p-6 shadow-sm border border-purple-200 bg-purple-100 hover:shadow-md transition cursor-pointer flex items-start gap-4 text-left w-full"
                type="button"
              >
                <span className="text-3xl mt-1 select-none">{q.emoji}</span>
                <div>
                  <div className="font-bold text-lg text-purple-900 mb-1">{q.title}</div>
                  <div className="text-gray-700 text-sm">{q.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
