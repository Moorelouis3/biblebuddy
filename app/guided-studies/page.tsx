// app/guided-studies/page.tsx
"use client";
import Link from "next/link";

const tools = [
  {
    href: "/devotionals",
    bg: "bg-teal-100 border-teal-200",
    emoji: "🌅",
    title: "Devotionals",
    desc: "Guided daily Bible reading and reflection",
  },
  {
    href: "/reading-plans",
    bg: "bg-yellow-100 border-yellow-200",
    emoji: "📋",
    title: "Bible Reading Plans",
    desc: "Different orders to read the Bible",
  },
  {
    href: "/bible-study-guides",
    bg: "bg-gray-100 border-gray-200",
    emoji: "📚",
    title: "Bible Study Guides",
    desc: "Coming soon",
  },
  {
    href: "/bible-references",
    bg: "bg-purple-100 border-purple-200",
    emoji: "🔎",
    title: "Bible References",
    desc: "Explanations of Bible keywords and concepts",
  },
  {
    href: "/notes",
    bg: "bg-indigo-100 border-indigo-200",
    emoji: "📝",
    title: "Bible Study Notes",
    desc: "Create and save your personal study notes",
  },
];

export default function GuidedStudiesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      <nav className="text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">Bible Study Hub</span>
      </nav>

      <div>
        <h1 className="text-3xl font-bold text-orange-800 mb-1">🧭 Bible Study Hub</h1>
        <p className="text-gray-600">A collection of Bible study tools</p>
      </div>

      <div className="flex flex-col gap-4">
        {tools.map((t) => (
          <Link key={t.href} href={t.href}>
            <div className={`border rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition ${t.bg}`}>
              <h2 className="text-xl font-semibold">{t.emoji} {t.title}</h2>
              <p className="text-gray-700 mt-1">{t.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
