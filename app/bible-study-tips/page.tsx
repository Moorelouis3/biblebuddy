import Link from "next/link";
import BibleStudyBreadcrumb from "@/components/BibleStudyBreadcrumb";

const tips = [
  {
    href: "/bible-study-tips/why-bible-study-is-hard",
    title: "Why Bible Study Is Hard",
    desc: "5 Reasons Studying the Bible Is Hard",
  },
  // Add other cards here if needed
];

export default function BibleStudyTipsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <BibleStudyBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Bible Study Tips" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-2">Bible Study Tips</h1>
      <p className="text-gray-600 mb-8">Practical advice and encouragement for your Bible study journey.</p>
      <div className="flex flex-col gap-5">
        {tips.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-xl p-6 shadow-sm border border-yellow-200 bg-yellow-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2"
          >
            <div className="font-bold text-lg text-yellow-900">{t.title}</div>
            <div className="text-gray-700 text-sm">{t.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
