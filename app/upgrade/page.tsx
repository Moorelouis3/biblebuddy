"use client";

import Link from "next/link";

/**
 * Bible Buddy is free.
 *
 * This route used to be the Pro pricing page. It is kept (rather than deleted)
 * so every existing link, bookmark, email and in-app button that points at
 * /upgrade lands somewhere sensible instead of a 404.
 *
 * The Stripe checkout infrastructure it used to call is intentionally left in
 * place elsewhere in the codebase — it will be needed for physical books,
 * donations and bulk church orders. It is simply no longer used to sell access
 * to Bible study.
 *
 * The previous paid version of this page is in git history.
 */
export default function UpgradePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center shadow-sm md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          Good news
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-950 md:text-4xl">
          Bible Buddy is completely free
        </h1>
        <p className="mt-4 text-lg leading-7 text-gray-700">
          There is nothing to upgrade to any more. The full Bible-study
          experience is free for everyone — no credits, no daily limits, no
          locked plans.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          What that includes
        </h2>
        <ul className="mt-4 space-y-3 text-gray-700">
          <li>✓ The whole Bible, with study notes on every chapter</li>
          <li>✓ Every devotional and study plan — start as many as you like</li>
          <li>✓ Bible in One Year, with audio</li>
          <li>✓ People, places and keyword studies — unlimited</li>
          <li>✓ All trivia and Bible study games</li>
          <li>✓ Progress, streaks, saved notes and community</li>
        </ul>
        <p className="mt-6 text-sm leading-6 text-gray-600">
          Study as much as you want, for as long as you want. If you want to
          spend a whole Saturday going through fifteen chapters of Genesis,
          Bible Buddy will never stop you and ask for money.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8">
        <h2 className="text-lg font-bold text-amber-900">
          If you already supported Bible Buddy
        </h2>
        <p className="mt-3 text-sm font-medium leading-6 text-amber-900/90">
          Thank you — genuinely. Bible Buddy got here because people paid for it
          when it was not free. You keep everything you have, and you will not
          be charged again.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Start studying
        </Link>
        <Link
          href="/plans"
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Browse study plans
        </Link>
      </div>
    </div>
  );
}
