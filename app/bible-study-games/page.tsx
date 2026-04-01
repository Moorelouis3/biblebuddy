import Link from "next/link";

export default function BibleStudyGamesPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] pb-14">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-[#eadfcf] bg-[#fff8ef] p-6 shadow-sm sm:p-8">
          <Link href="/dashboard" className="text-sm font-semibold text-[#8d5f2d] hover:text-[#6d461d]">
            &lt;- Back to Dashboard
          </Link>
          <div className="mt-4 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b37839]">Bible Buddy Games</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Bible Study Games</h1>
            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-[15px]">
              Use games to reinforce what you just studied. Trivia checks recall. Scrambled helps key chapter words stick.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Link href="/bible-trivia" className="rounded-[28px] border border-[#bfe3cf] bg-[#daf1e3] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Existing Mode</p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">Trivia</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Jump into the current Bible Trivia flow and test what you remember across books and people.
            </p>
            <div className="mt-6 rounded-2xl border border-[#cce8d8] bg-[#edf8f1] px-4 py-3 text-sm font-semibold text-emerald-700">
              Open Trivia -&gt;
            </div>
          </Link>

          <Link href="/bible-study-games/scrambled" className="rounded-[28px] border border-[#e8b9c1] bg-[#f6dce1] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b45b45]">New Test Mode</p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">Scrambled</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Solve one scrambled KJV word at a time, chapter by chapter, so Scripture details stay active in memory.
            </p>
            <div className="mt-6 rounded-2xl border border-[#efd0d5] bg-[#fbf1f3] px-4 py-3 text-sm font-semibold text-[#9b4d3b]">
              Play Scrambled -&gt;
            </div>
          </Link>
        </div>

        <div className="rounded-[28px] border border-[#e4e6ea] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">What is in this first test</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-[#f8fafc] px-4 py-4">
              <p className="text-sm font-semibold text-gray-900">Book-first structure</p>
              <p className="mt-2 text-sm leading-7 text-gray-600">Scrambled starts with books, then chapter packs, just like the rest of Bible Buddy stays rooted in Scripture.</p>
            </div>
            <div className="rounded-2xl bg-[#f8fafc] px-4 py-4">
              <p className="text-sm font-semibold text-gray-900">Genesis 1 to 3</p>
              <p className="mt-2 text-sm leading-7 text-gray-600">This first build focuses on creation, Eden, and the fall so the test pack feels coherent right away.</p>
            </div>
            <div className="rounded-2xl bg-[#f8fafc] px-4 py-4">
              <p className="text-sm font-semibold text-gray-900">Room to grow</p>
              <p className="mt-2 text-sm leading-7 text-gray-600">The structure is ready for more chapters, more books, and future themed game packs later.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
