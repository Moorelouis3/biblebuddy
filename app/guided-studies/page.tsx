// app/guided-studies/page.tsx
"use client";
import Link from "next/link";

export default function GuidedStudiesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Guided Studies</h1>
      <p className="text-gray-700 mb-6">Structured ways to study Scripture</p>
      <div className="flex flex-col gap-4">
        <Link href="/reading-plans">
          <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
            <h2 className="text-xl font-semibold">Bible Reading Plans</h2>
            <p className="text-gray-700 mt-1">Different orders to read the Bible</p>
          </div>
        </Link>
        <Link href="/devotionals">
          <div className="bg-teal-100 border border-teal-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
            <h2 className="text-xl font-semibold">Devotionals</h2>
            <p className="text-gray-700 mt-1">Guided daily Bible reading and reflection</p>
          </div>
        </Link>
        <Link href="/bible-study-guides">
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
            <h2 className="text-xl font-semibold">Bible Study Guides</h2>
            <p className="text-gray-700 mt-1">(Coming soon)</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
