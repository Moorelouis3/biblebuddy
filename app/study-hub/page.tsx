"use client";
import Link from "next/link";

const TOPICS = [
  {
    key: "insights",
    title: "Bible Insights",
    subtitle: "Explore big questions and key themes from Scripture",
    emoji: "💡",
    color: "bg-blue-100 border border-blue-200"
  },
  {
    key: "tools",
    title: "Study Tools",
    subtitle: "Learn how to read, highlight, and understand the Bible",
    emoji: "🛠️",
    color: "bg-green-100 border border-green-200"
  },
  {
    key: "foundations",
    title: "Christian Foundations",
    subtitle: "Understand the core beliefs of the Christian faith",
    emoji: "⛪",
    color: "bg-purple-100 border border-purple-200"
  },
  {
    key: "verse-breakdowns",
    title: "Verse Breakdowns",
    subtitle: "Deep dive into Scripture, one passage at a time",
    emoji: "📖",
    color: "bg-yellow-100 border border-yellow-200"
  },
  {
    key: "character-studies",
    title: "Character Studies",
    subtitle: "Learn from the lives of people in the Bible",
    emoji: "🧑‍🦱",
    color: "bg-pink-100 border border-pink-200"
  },
  {
    key: "history",
    title: "Christian History",
    subtitle: "Explore the story of the Church through time",
    emoji: "📜",
    color: "bg-orange-100 border border-orange-200"
  }
];

export default function StudyHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-0">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Study Hub</h1>
        <p className="text-gray-600 mb-8">Join the discussion and explore the Bible by topic.</p>
        <div className="flex flex-col gap-4">
          {TOPICS.map((topic) => (
            <Link
              key={topic.key}
              href={`/study-hub/${topic.key}`}
              className={`rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md hover:scale-[1.01] transition flex items-center ${topic.color}`}
              style={{ background: undefined }}
            >
              <span className="text-2xl mr-4">{topic.emoji}</span>
              <div>
                <div className="text-xl font-semibold text-gray-900">{topic.title}</div>
                <div className="text-gray-700 mt-1 text-sm">{topic.subtitle}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
