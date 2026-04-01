import Link from "next/link";
import { LouisAvatar } from "@/components/LouisAvatar";

export default function BibleStudyGamesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Bible Study Games</h1>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="hands" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <p className="mb-2">
                Hey, these are the Bible study games we have to help you study and remember Scripture in a fun and interactive way.
              </p>
              <p>
                Pick the game that fits how you want to learn today, and let&apos;s keep Bible study active instead of passive.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Link href="/bible-trivia">
              <div className="bg-[#daf1e3] border border-[#bfe3cf] rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
                <h2 className="text-xl font-semibold text-gray-900">🎯 Bible Study Trivia</h2>
                <p className="text-gray-700 mt-1">How many questions can you get right?</p>
              </div>
            </Link>

            <Link href="/bible-study-games/scrambled">
              <div className="bg-[#f6dce1] border border-[#e8b9c1] rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
                <h2 className="text-xl font-semibold text-gray-900">🧩 Scrambled</h2>
                <p className="text-gray-700 mt-1">How many Bible Scripture words can you unscramble?</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
