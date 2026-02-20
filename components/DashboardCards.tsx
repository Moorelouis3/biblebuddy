import Link from "next/link";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* 📖 The Bible */}
      <Link href="/bible" className="block">
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
          <h2 className="text-xl font-semibold flex items-center">📖 <span className="ml-2">The Bible</span></h2>
          <p className="text-gray-700 mt-1">Read the full Bible here</p>
        </div>
      </Link>

      {/* 🧭 Bible studies */}
      <Link href="/guided-studies" className="block">
        <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
          <h2 className="text-xl font-semibold flex items-center">🧭 <span className="ml-2">Bible studies</span></h2>
          <p className="text-gray-700 mt-1">Structured ways to study Scripture</p>
        </div>
      </Link>

      {/* 🗂️ Bible references */}
      <Link href="/bible-references" className="block">
        <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
          <h2 className="text-xl font-semibold flex items-center">🗂️ <span className="ml-2">Bible references</span></h2>
          <p className="text-gray-700 mt-1">A database to understand the people, places, and keywords of the Bible</p>
        </div>
      </Link>

      {/* 🎮 Bible games */}
      <Link href="/bible-trivia" className="block">
        <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
          <h2 className="text-xl font-semibold flex items-center">🎮 <span className="ml-2">Bible games</span></h2>
          <p className="text-gray-700 mt-1">Test your Bible knowledge</p>
        </div>
      </Link>

      {/* 📝 Bible study notes */}
      <Link href="/notes" className="block">
        <div className="bg-indigo-100 border border-indigo-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
          <h2 className="text-xl font-semibold flex items-center">📝 <span className="ml-2">Bible study notes</span></h2>
          <p className="text-gray-700 mt-1">Create and save your own Bible study notes</p>
        </div>
      </Link>
    </div>
  );
}
