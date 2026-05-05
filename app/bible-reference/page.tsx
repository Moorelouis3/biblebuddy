// app/bible-reference/page.tsx
"use client";
import Link from "next/link";

export default function BibleReferencePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      <nav className="text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
        <span className="mx-2">&gt;</span>
        <Link href="/guided-studies" className="hover:text-gray-700 transition">Bible Study Tools</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-800 font-medium">Bible References</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold mb-2">Bible References</h1>
        <p className="text-gray-700 mb-6">Tools to understand Scripture</p>
      </div>

      <div className="flex flex-col gap-4">
        <Link href="/people-in-the-bible">
          <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
            <h2 className="text-xl font-semibold">People in the Bible</h2>
            <p className="text-gray-700 mt-1">Meet the real people of the Bible</p>
          </div>
        </Link>
        <Link href="/places-in-the-bible">
          <div className="bg-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
            <h2 className="text-xl font-semibold">Places in the Bible</h2>
            <p className="text-gray-700 mt-1">Explore the important places of Scripture</p>
          </div>
        </Link>
        <Link href="/keywords-in-the-bible">
          <div className="bg-red-100 border border-red-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
            <h2 className="text-xl font-semibold">Keywords in the Bible</h2>
            <p className="text-gray-700 mt-1">Understand important Bible words and ideas</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
