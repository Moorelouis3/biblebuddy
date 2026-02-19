"use client";
const ARTICLES = [
  { title: "John 3:16 Explained", subtitle: "A closer look at the most famous verse." },
  { title: "Psalm 23: The Lord is My Shepherd", subtitle: "Exploring comfort and trust in God." },
];
export default function VerseBreakdownsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-0">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Verse Breakdowns</h1>
        <p className="text-gray-600 mb-8">Deep dive into Scripture, one passage at a time</p>
        <div className="flex flex-col gap-4">
          {ARTICLES.map((a, i) => (
            <div key={i} className="rounded-xl shadow-sm p-5 bg-yellow-100 border border-yellow-200 cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <div className="text-xl font-semibold text-gray-900">{a.title}</div>
              <div className="text-gray-700 mt-1 text-sm">{a.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
