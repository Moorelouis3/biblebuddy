export default function ChristianHistoryPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Christian History</h1>
      <p className="text-gray-600 mb-8">Key moments and figures in Christian history.</p>
      <div className="flex flex-col gap-5">
        <a
          href="/bible-study-hub/christian-history/the-man-who-legalized-christianity"
          className="rounded-xl p-6 shadow-sm border border-orange-200 bg-orange-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
        >
          <span className="text-3xl mt-1 select-none">🏛️</span>
          <div>
            <div className="font-bold text-lg text-orange-900 mb-1">The Man Who Legalized Christianity</div>
            <div className="text-gray-700 text-sm">Constantine and the Turning Point of the Church</div>
          </div>
        </a>
      </div>
    </div>
  );
}
