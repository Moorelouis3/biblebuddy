
"use client";
import Link from "next/link";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

const articleCards = [
  {
    href: "/bible-study-hub/character-studies/luke",
    emoji: "👤",
    title: "Luke",
    subtitle: "The Gentile doctor, Gospel writer, and companion of Paul."
  },
  {
    href: "/bible-study-hub/character-studies/moses",
    emoji: "🔥",
    title: "Moses",
    subtitle: "The man God drew out to draw His people out"
  },
  {
    href: "/bible-study-hub/character-studies/paul",
    emoji: "🧔",
    title: "Paul",
    subtitle: "From persecutor to missionary apostle."
  },
];

const questionCards = [
  {
    href: "/bible-study-hub/character-studies/favorite-bible-character",
    emoji: "👑",
    title: "Favorite Bible Character?",
    subtitle: "The person who inspires you.",
  },
  {
    href: "/bible-study-hub/character-studies/who-do-you-relate-to",
    emoji: "🪞",
    title: "Who Do You Relate To?",
    subtitle: "A story that mirrors yours.",
  },
  {
    href: "/bible-study-hub/character-studies/most-misunderstood-character",
    emoji: "🧐",
    title: "Most Misunderstood Character?",
    subtitle: "Someone people often misjudge.",
  },
];

export default function CharacterStudiesPage() {
  const [view, setView] = useState<"articles" | "questions">("articles");
  const router = useRouter();

  // Use indigo color scheme for both articles and questions cards/toggle
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Character Studies</h1>
        <p className="text-gray-600 mb-8">Explore the lives of key Bible characters.</p>

        {/* Toggle UI */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-indigo-200 bg-indigo-50 overflow-hidden shadow-sm">
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none ${view === "articles" ? "bg-indigo-100 text-indigo-900" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}`}
              onClick={() => setView("articles")}
              type="button"
              aria-pressed={view === "articles"}
            >
              Articles
            </button>
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none border-l border-indigo-200 ${view === "questions" ? "bg-indigo-100 text-indigo-900" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}`}
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
              <Link
                key={a.href}
                href={a.href}
                className="rounded-xl p-6 shadow-sm border border-indigo-200 bg-indigo-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
              >
                <span className="text-3xl mt-1 select-none">{a.emoji}</span>
                <div>
                  <div className="font-bold text-lg mb-1 text-indigo-900">{a.title}</div>
                  <div className="text-gray-700 text-sm">{a.subtitle}</div>
                </div>
              </Link>
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
                className="rounded-xl p-6 shadow-sm border border-indigo-200 bg-indigo-100 hover:shadow-md transition cursor-pointer flex items-start gap-4 text-left w-full"
                type="button"
              >
                <span className="text-3xl mt-1 select-none">{q.emoji}</span>
                <div>
                  <div className="font-bold text-lg mb-1 text-indigo-900">{q.title}</div>
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
