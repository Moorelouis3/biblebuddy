import Link from "next/link";
import { SCRAMBLED_BOOKS } from "@/lib/scrambledGameData";

export default function ScrambledGamesPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] pb-14">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-[#eadfcf] bg-[#fff8ef] p-6 shadow-sm sm:p-8">
          <Link href="/bible-study-games" className="text-sm font-semibold text-[#8d5f2d] hover:text-[#6d461d]">
            &lt;- Back to Bible Study Games
          </Link>
          <div className="mt-4 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b37839]">Scrambled</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Books of the Bible</h1>
            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-[15px]">
              Pick a book, choose a chapter, and solve one Scripture word at a time. This first test pack is based on KJV words from Genesis 1 through 3.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SCRAMBLED_BOOKS.map((book) => (
            <Link
              key={book.slug}
              href={`/bible-study-games/scrambled/${book.slug}`}
              className={`rounded-[28px] border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${book.accentClassName}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b45b45]">Test Book</p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900">{book.name}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">{book.shortDescription}</p>
              <div className="mt-6 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-sm">
                <p className="font-semibold text-gray-900">{book.chapters.length} chapter packs</p>
                <p className="mt-1 text-gray-600">10 scrambled words in each chapter</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
