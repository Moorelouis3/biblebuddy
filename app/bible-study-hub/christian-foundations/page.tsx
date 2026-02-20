export default function ChristianFoundationsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Christian Foundations</h1>
      <p className="text-gray-600 mb-8">Core beliefs and essential teachings for the Christian faith.</p>
      <div className="flex flex-col gap-5">
        <a
          href="/bible-study-hub/christian-foundations/what-is-hell"
          className="rounded-xl p-6 shadow-sm border border-purple-200 bg-purple-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
        >
          <span className="text-3xl mt-1 select-none">🔥</span>
          <div>
            <div className="font-bold text-lg text-purple-900 mb-1">What Is Hell</div>
            <div className="text-gray-700 text-sm">Understanding Hell Biblically</div>
          </div>
        </a>
        <a
          href="/bible-study-hub/christian-foundations/what-is-heaven"
          className="rounded-xl p-6 shadow-sm border border-purple-200 bg-purple-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
        >
          <span className="text-3xl mt-1 select-none">✨</span>
          <div>
            <div className="font-bold text-lg text-purple-900 mb-1">What Is Heaven</div>
            <div className="text-gray-700 text-sm">Understanding Heaven Biblically</div>
          </div>
        </a>
        <a
          href="/bible-study-hub/christian-foundations/why-so-many-denominations"
          className="rounded-xl p-6 shadow-sm border border-purple-200 bg-purple-100 hover:shadow-md transition cursor-pointer flex items-start gap-4"
        >
          <span className="text-3xl mt-1 select-none">🌎</span>
          <div>
            <div className="font-bold text-lg text-purple-900 mb-1">Why So Many Denominations</div>
            <div className="text-gray-700 text-sm">Understanding Christian Divisions</div>
          </div>
        </a>
      </div>
    </div>
  );
}
