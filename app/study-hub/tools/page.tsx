"use client";
const ARTICLES = [
  { title: "How to Highlight Effectively", subtitle: "Tips for marking key verses and ideas." },
  { title: "Reading Plans 101", subtitle: "Choosing a plan that fits your goals." },
];
export default function StudyToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-0">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Study Tools</h1>
        <p className="text-gray-600 mb-8">Learn how to read, highlight, and understand the Bible</p>
        <div className="flex flex-col gap-4">
          {ARTICLES.map((a, i) => (
            <div key={i} className="rounded-xl shadow-sm p-5 bg-green-100 border border-green-200 cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <div className="text-xl font-semibold text-gray-900">{a.title}</div>
              <div className="text-gray-700 mt-1 text-sm">{a.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
