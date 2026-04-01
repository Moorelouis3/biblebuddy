import Link from "next/link";
import { LouisAvatar } from "@/components/LouisAvatar";

export default function ScrambledPeoplePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">People of the Bible</h1>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="wave" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <p className="mb-2">
                I am getting the People of the Bible Scrambled packs ready next.
              </p>
              <p>
                For now, Genesis is live under Books of the Bible, so that is the best place to start playing today.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Link href="/bible-study-games/scrambled">
              <div className="bg-[#dae7f7] border border-[#bdd2ee] rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
                <h2 className="text-xl font-semibold text-gray-900">?? Books of the Bible</h2>
                <p className="text-gray-700 mt-1">Go play the Genesis Scrambled packs.</p>
              </div>
            </Link>

            <div className="bg-[#efe7ff] border border-[#ddd0ff] rounded-xl p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">?? People of the Bible</h2>
              <p className="text-gray-700 mt-1">Coming next.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
