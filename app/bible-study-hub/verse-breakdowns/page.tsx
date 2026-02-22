
"use client";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

const articleCards = [
  {
    href: "/bible-study-hub/verse-breakdowns/your-body-is-a-temple",
    emoji: "🏛️",
    title: "Your Body Is a Temple",
    subtitle: "1 Corinthians 6:19 to 20",
  },
  {
    href: "/bible-study-hub/verse-breakdowns/building-self-control",
    emoji: "🧑‍🦱",
    title: "Building Self Control",
    subtitle: "Proverbs 25:28 Explained",
  },
  {
    href: "/bible-study-hub/verse-breakdowns/salt-and-light",
    emoji: "🧂",
    title: "Salt and Light",
    subtitle: "Matthew 5:13 to 16",
  },
];

const questionCards = [
  {
    href: "/bible-study-hub/verse-breakdowns/what-verse-do-you-lean-on",
    emoji: "🛡️",
    title: "What Verse Do You Lean On?",
    subtitle: "The scripture you return to.",
  },
  {
    href: "/bible-study-hub/verse-breakdowns/what-verse-has-challenged-you",
    emoji: "🔥",
    title: "What Verse Has Challenged You?",
    subtitle: "Growth often comes through conviction.",
  },
  {
    href: "/bible-study-hub/verse-breakdowns/what-verse-confuses-you",
    emoji: "🤔",
    title: "What Verse Confuses You?",
    subtitle: "Some passages require deeper study.",
  },
];

export default function VerseBreakdownsPage() {
  const [view, setView] = useState<"articles" | "questions">("articles");
  const router = useRouter();

  // Use blue color scheme for both articles and questions cards/toggle
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Verse Breakdowns</h1>
        <p className="text-gray-600 mb-8">In-depth breakdowns of key Bible verses for deeper understanding.</p>

        {/* Toggle UI */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-teal-200 bg-teal-50 overflow-hidden shadow-sm">
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none ${view === "articles" ? "bg-teal-100 text-teal-900" : "bg-teal-50 text-teal-700 hover:bg-teal-100"}`}
              onClick={() => setView("articles")}
              type="button"
              aria-pressed={view === "articles"}
            >
              Articles
            </button>
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none border-l border-teal-200 ${view === "questions" ? "bg-teal-100 text-teal-900" : "bg-teal-50 text-teal-700 hover:bg-teal-100"}`}
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
                className="rounded-xl p-6 shadow-sm border border-teal-200 bg-teal-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
              >
                <span className="text-3xl mt-1 select-none">{a.emoji}</span>
                <div>
                  <div className="font-bold text-lg text-teal-900 mb-1">{a.title}</div>
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
                className="rounded-xl p-6 shadow-sm border border-teal-200 bg-teal-100 hover:shadow-md transition cursor-pointer flex items-start gap-4 text-left w-full"
                type="button"
              >
                <span className="text-3xl mt-1 select-none">{q.emoji}</span>
                <div>
                  <div className="font-bold text-lg text-teal-900 mb-1">{q.title}</div>
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
