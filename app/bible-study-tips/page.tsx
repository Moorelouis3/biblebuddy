import Link from "next/link";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

const tips = [
  {
    href: "/bible-study-tips/why-bible-study-is-hard",
    emoji: "🧠",
    title: "Why Bible Study Is Hard",
    desc: "5 Reasons Studying the Bible Is Hard",
  },
  {
    href: "/bible-study-tips/how-to-read-the-bible",
    emoji: "📖",
    title: "How to Read the Bible",
    desc: "A Simple Way to Study Scripture",
  },
  {
    href: "/bible-study-tips/a-simple-bible-highlighting-system",
    emoji: "🖍️",
    title: "A Simple Bible Highlighting System",
    desc: "How to Highlight With Purpose",
  },
];

export default function BibleStudyTipsPage() {
  return (
    <BibleStudyHubArticleLayout>
      <h1 className="text-3xl font-bold mb-2">Bible Study Tips</h1>
      <p className="text-gray-600 mb-8">Practical advice and encouragement for your Bible study journey.</p>
      <div className="flex flex-col gap-5">
        {tips.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-xl p-6 shadow-sm border border-yellow-200 bg-yellow-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
          >
            <span className="text-3xl mt-1 select-none">{t.emoji}</span>
            <div>
              <div className="font-bold text-lg text-yellow-900 mb-1">{t.title}</div>
              <div className="text-gray-700 text-sm">{t.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
