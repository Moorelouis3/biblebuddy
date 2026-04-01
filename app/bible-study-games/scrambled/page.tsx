import Link from "next/link";
import { LouisAvatar } from "@/components/LouisAvatar";
import { SCRAMBLED_BOOKS } from "@/lib/scrambledGameData";

export default function ScrambledGamesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Scrambled</h1>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="think" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <p className="mb-2">
                Pick how you want to play Scrambled. You can work through books of the Bible or, later on, use people packs to strengthen key Bible names too.
              </p>
              <p>
                For now, Genesis is ready, and each chapter gives you ten KJV words to unscramble one at a time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Link href={`/bible-study-games/scrambled/${SCRAMBLED_BOOKS[0].slug}`}>
              <div className="bg-[#dae7f7] border border-[#bdd2ee] rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
                <h2 className="text-xl font-semibold text-gray-900">📚 Books of the Bible</h2>
                <p className="text-gray-700 mt-1">Play chapter by chapter through Scripture words.</p>
              </div>
            </Link>

            <Link href="/bible-study-games/scrambled/people">
              <div className="bg-[#efe7ff] border border-[#ddd0ff] rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
                <h2 className="text-xl font-semibold text-gray-900">👥 People of the Bible</h2>
                <p className="text-gray-700 mt-1">Build Bible character recall through word packs.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
