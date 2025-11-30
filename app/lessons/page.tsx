import Link from "next/link";

export default function LessonsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      {/* dimmed background */}
      <div className="absolute inset-0 bg-slate-900/20" />

      {/* modal card */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          {/* header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Bible Lessons
              </h1>
              <p className="text-sm text-slate-500">
                Short lessons that help you understand the Bible step by step.
              </p>
            </div>

            {/* close button back to dashboard */}
            <Link
              href="/dashboard"
              className="text-sm text-slate-400 hover:text-slate-600 transition"
            >
              Close
            </Link>
          </div>

          {/* lesson cards */}
          <div className="space-y-4">
            {/* Lesson 1 */}
            <Link href="/lessons/how-to-use" className="block group">
              <div className="flex items-center justify-between rounded-2xl bg-orange-50 border border-orange-100 px-4 py-3 hover:shadow-md hover:bg-orange-100/60 transition">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 1 • How to use The Bible Study Buddy
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    I walk you through the app and show you how to use each part
                    of the system.
                  </p>
                </div>
                <span className="text-slate-400 text-lg group-hover:text-slate-600">
                  ›
                </span>
              </div>
            </Link>

            {/* Lesson 2 placeholder */}
            <button className="w-full text-left group">
              <div className="flex items-center justify-between rounded-2xl bg-blue-50 border border-blue-100 px-4 py-3 opacity-70">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 2 • Why we start with Matthew
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Coming soon. This will explain the Bible reading path and
                    why we follow it in this order.
                  </p>
                </div>
                <span className="text-xs text-slate-400 border border-slate-300 rounded-full px-2 py-0.5">
                  Soon
                </span>
              </div>
            </button>

            {/* Lesson 3 placeholder */}
            <button className="w-full text-left group">
              <div className="flex items-center justify-between rounded-2xl bg-purple-50 border border-purple-100 px-4 py-3 opacity-70">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 3 • How to take GROW notes
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Coming soon. A simple guide to using the GROW method while
                    you read.
                  </p>
                </div>
                <span className="text-xs text-slate-400 border border-slate-300 rounded-full px-2 py-0.5">
                  Soon
                </span>
              </div>
            </button>
          </div>

          {/* footer link */}
          <div className="mt-6 text-center text-sm text-slate-500">
            <span className="mr-1">Ready to read</span>
            <Link href="/dashboard" className="text-blue-600 font-medium">
              go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
