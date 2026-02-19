"use client";
const ARTICLES = [
  { title: "The Early Church", subtitle: "How Christianity spread in the first centuries." },
  { title: "Reformation 101", subtitle: "Key events and people in Church history." },
];
export default function ChristianHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-0">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Christian History</h1>
        <p className="text-gray-600 mb-8">Explore the story of the Church through time</p>
        <div className="flex flex-col gap-4">
          {ARTICLES.map((a, i) => (
            <div key={i} className="rounded-xl shadow-sm p-5 bg-orange-100 border border-orange-200 cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <div className="text-xl font-semibold text-gray-900">{a.title}</div>
              <div className="text-gray-700 mt-1 text-sm">{a.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
