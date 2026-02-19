"use client";
const ARTICLES = [
  { title: "The Life of David", subtitle: "Lessons from Israel's shepherd king." },
  { title: "Mary Magdalene: Devotion and Witness", subtitle: "A look at a key New Testament figure." },
];
export default function CharacterStudiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-0">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Character Studies</h1>
        <p className="text-gray-600 mb-8">Learn from the lives of people in the Bible</p>
        <div className="flex flex-col gap-4">
          {ARTICLES.map((a, i) => (
            <div key={i} className="rounded-xl shadow-sm p-5 bg-pink-100 border border-pink-200 cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <div className="text-xl font-semibold text-gray-900">{a.title}</div>
              <div className="text-gray-700 mt-1 text-sm">{a.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
