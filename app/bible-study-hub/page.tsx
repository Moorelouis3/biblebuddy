import Link from "next/link";

const subjects = [
  {
    href: "/bible-study-hub/bible-insights",
    emoji: "💡",
    title: "Bible Insights",
    desc: "Fresh perspectives and commentary on Scripture."
  },
  {
    href: "/bible-study-hub/study-tools",
    emoji: "🛠️",
    title: "Study Tools",
    desc: "Helpful resources for deeper Bible study."
  },
  {
    href: "/bible-study-hub/christian-foundations",
    emoji: "⛪",
    title: "Christian Foundations",
    desc: "Core beliefs and essential teachings."
  },
  {
    href: "/bible-study-hub/verse-breakdowns",
    emoji: "🔎",
    title: "Verse Breakdowns",
    desc: "In-depth explanations of key verses."
  },
  {
    href: "/bible-study-hub/character-studies",
    emoji: "👤",
    title: "Character Studies",
    desc: "Explore the lives of Bible figures."
  },
  {
    href: "/bible-study-hub/christian-history",
    emoji: "📜",
    title: "Christian History",
    desc: "Key moments and people in church history."
  }
];

export default function BibleStudyHubPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Study Hub</h1>
      <p className="text-gray-600 mb-8">Join the discussion and explore the Bible by topic.</p>
      <div className="flex flex-col gap-5">
        {subjects.map((s) => (
          <Link key={s.href} href={s.href} className="rounded-xl p-6 shadow-sm border hover:shadow-md transition cursor-pointer bg-orange-50 flex items-start gap-4">
            <span className="text-3xl mt-1 select-none">{s.emoji}</span>
            <div>
              <div className="font-bold text-lg mb-1">{s.title}</div>
              <div className="text-gray-700 text-sm">{s.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
