
"use client";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

const articleCards = [
  {
    href: "/bible-study-hub/christian-history/the-man-who-legalized-christianity",
    emoji: "🏛️",
    title: "The Man Who Legalized Christianity",
    subtitle: "Constantine and the Turning Point of the Church",
  },
  {
    href: "/bible-study-hub/christian-history/st-patrick",
    emoji: "🍀",
    title: "St. Patrick",
    subtitle: "He Who Brought Christianity to Ireland",
  },
  {
    href: "/bible-study-hub/christian-history/st-valentine",
    emoji: "❤️",
    title: "St. Valentine",
    subtitle: "The Martyr Behind the Modern Holiday",
  },
];

const questionCards = [
  {
    href: "/bible-study-hub/christian-history/did-power-help-the-church",
    emoji: "👑",
    title: "Did Power Help the Church?",
    subtitle: "Faith and influence through history.",
  },
  {
    href: "/bible-study-hub/christian-history/most-surprising-church-history-moment",
    emoji: "📜",
    title: "Most Surprising Church History Moment?",
    subtitle: "Events that changed your perspective.",
  },
  {
    href: "/bible-study-hub/christian-history/does-persecution-strengthen-faith",
    emoji: "🔥",
    title: "Does Persecution Strengthen Faith?",
    subtitle: "Suffering and spiritual growth.",
  },
];

export default function ChristianHistoryPage() {
  const [view, setView] = useState<"articles" | "questions">("articles");
  const router = useRouter();

  // Use orange color scheme for both articles and questions cards/toggle
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Christian History</h1>
        <p className="text-gray-600 mb-8">Key moments and figures in Christian history.</p>

        {/* Toggle UI */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-orange-200 bg-orange-50 overflow-hidden shadow-sm">
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none ${view === "articles" ? "bg-orange-100 text-orange-900" : "bg-orange-50 text-orange-700 hover:bg-orange-100"}`}
              onClick={() => setView("articles")}
              type="button"
              aria-pressed={view === "articles"}
            >
              Articles
            </button>
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none border-l border-orange-200 ${view === "questions" ? "bg-orange-100 text-orange-900" : "bg-orange-50 text-orange-700 hover:bg-orange-100"}`}
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
                className="rounded-xl p-6 shadow-sm border border-orange-200 bg-orange-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
              >
                <span className="text-3xl mt-1 select-none">{a.emoji}</span>
                <div>
                  <div className="font-bold text-lg text-orange-900 mb-1">{a.title}</div>
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
                className="rounded-xl p-6 shadow-sm border border-orange-200 bg-orange-100 hover:shadow-md transition cursor-pointer flex items-start gap-4 text-left w-full"
                type="button"
              >
                <span className="text-3xl mt-1 select-none">{q.emoji}</span>
                <div>
                  <div className="font-bold text-lg text-orange-900 mb-1">{q.title}</div>
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
