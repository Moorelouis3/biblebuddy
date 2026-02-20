export default function VerseBreakdownsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Verse Breakdowns</h1>
      <p className="text-gray-600 mb-8">In-depth breakdowns of key Bible verses for deeper understanding.</p>
      <div className="flex flex-col gap-5">
        <a
          href="/bible-study-hub/verse-breakdowns/your-body-is-a-temple"
          className="rounded-xl p-6 shadow-sm border border-blue-200 bg-blue-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
        >
          <span className="text-3xl mt-1 select-none">🏛️</span>
          <div>
            <div className="font-bold text-lg text-blue-900 mb-1">Your Body Is a Temple</div>
            <div className="text-gray-700 text-sm">1 Corinthians 6:19 to 20</div>
          </div>
        </a>
      </div>
    </div>
  );
}
