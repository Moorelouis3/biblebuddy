import Link from "next/link";
import BibleStudyBreadcrumb from "@/components/BibleStudyBreadcrumb";

const insights = [
  {
    href: "/bible-study-hub/bible-insights/how-to-defend-the-bible",
    title: "How to Defend the Bible",
    desc: "How to respond when people say it was changed, written by men, or fake.",
  },
  // ...other cards can be added here...
];

export default function BibleInsightsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <BibleStudyBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Bible Study Hub", href: "/bible-study-hub" },
          { label: "Bible Insights" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-2">Bible Insights</h1>
      <p className="text-gray-600 mb-8">Explore insights and commentary on Scripture.</p>
      <div className="flex flex-col gap-5">
        {insights.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="rounded-xl p-6 shadow-sm border border-blue-200 bg-blue-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2"
          >
            <div className="font-bold text-lg text-blue-900">{i.title}</div>
            <div className="text-gray-700 text-sm">{i.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
