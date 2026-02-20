import Link from "next/link";
import BibleStudyBreadcrumb from "@/components/BibleStudyBreadcrumb";

const subjects = [
  {
    href: "/bible-study-hub/bible-insights",
    emoji: "💡",
    title: "Bible Insights",
    desc: "Fresh perspectives and commentary on Scripture.",
    bg: "bg-blue-100 border-blue-200",
    text: "text-blue-900"
  },
  {
    href: "/bible-study-tips",
    emoji: "🛠️",
    title: "Bible Study Tips",
    desc: "Helpful resources for deeper Bible study.",
    bg: "bg-yellow-100 border-yellow-200",
    text: "text-yellow-900"
  },
  {
    href: "/bible-study-hub/christian-foundations",
    emoji: "⛪",
    title: "Christian Foundations",
    desc: "Core beliefs and essential teachings.",
    bg: "bg-purple-100 border-purple-200",
    text: "text-purple-900"
  },
  {
    href: "/bible-study-hub/verse-breakdowns",
    emoji: "🔎",
    title: "Verse Breakdowns",
    desc: "In-depth explanations of key verses.",
    bg: "bg-emerald-100 border-emerald-200",
    text: "text-emerald-900"
  },
  {
    href: "/bible-study-hub/character-studies",
    emoji: "👤",
    title: "Character Studies",
    desc: "Explore the lives of Bible figures.",
    bg: "bg-indigo-100 border-indigo-200",
    text: "text-indigo-900"
  },
  {
    href: "/bible-study-hub/christian-history",
    emoji: "📜",
    title: "Christian History",
    desc: "Key moments and people in church history.",
    bg: "bg-orange-100 border-orange-200",
    text: "text-orange-900"
  }
];

export default function BibleStudyHubPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <BibleStudyBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Bible Study Hub" }
        ]}
      />
      <h1 className="text-3xl font-bold mb-2">Study Hub</h1>
      <p className="text-gray-600 mb-8">Join the discussion and explore the Bible by topic.</p>
      <div className="flex flex-col gap-5">
        {subjects.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`rounded-xl p-6 shadow-sm border hover:shadow-md transition cursor-pointer flex items-start gap-4 ${s.bg}`}
          >
            <span className="text-3xl mt-1 select-none">{s.emoji}</span>
            <div>
              <div className={`font-bold text-lg mb-1 ${s.text}`}>{s.title}</div>
              <div className="text-gray-700 text-sm">{s.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
