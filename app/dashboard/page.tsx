"use client";

import Link from "next/link";

export default function DashboardPage() {
  const userName = "Louis";

  // Mock data for now
  const streakDays = 3;
  const daysSinceLastReading = 0;
  const hasStartedPlan = true;
  const nextChapter = "Matthew 4";

  const readingSubtitle = hasStartedPlan
    ? `Continue ${nextChapter}`
    : "Start reading the Bible";

  let louisMessage = "";

  if (daysSinceLastReading === 0) {
    louisMessage = "You showed up yesterday. Let us keep the momentum going.";
  } else if (streakDays > 1) {
    louisMessage = `You are on a ${streakDays} day Bible reading streak.`;
  } else {
    louisMessage = `It has been ${daysSinceLastReading} days since your last reading with me. No shame, let us pick up where you left off.`;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* MAIN CONTENT – CENTERED COLUMN ONLY */}
      <div className="max-w-lg mx-auto px-4 mt-8">
        {/* GREETING (NO AVATAR) */}
        <div className="mb-4">
          <p className="text-2xl font-semibold text-center">
            Welcome back, {userName}!
          </p>
          <p className="text-sm text-gray-700 text-center mt-1">
            {louisMessage}
          </p>
        </div>

        {/* CTA TEXT */}
        <p className="text-sm text-gray-500 mt-4 mb-4 text-center">
          What do you want to focus on today? Choose one of the options below.
        </p>

        {/* DASHBOARD CARDS */}
        <div className="flex flex-col gap-4">
          {/* BIBLE LESSONS */}
          <Link href="/lessons">
            <div className="bg-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📘 Bible lessons</h2>
              <p className="text-gray-700 mt-1">
                Short lessons that help you understand Scripture deeper.
              </p>
            </div>
          </Link>

          {/* READING PLAN */}
          <Link href="/reading">
            <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📅 Reading plan</h2>
              <p className="text-gray-700 mt-1">{readingSubtitle}</p>
            </div>
          </Link>

          {/* NOTES */}
          <Link href="/notes">
            <div className="bg-green-100 border border-green-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📝 Notes</h2>
              <p className="text-gray-700 mt-1">
                All your Bible notes saved in one place.
              </p>
            </div>
          </Link>

          {/* BIBLE BUDDIES */}
          <Link href="/bible-buddies">
            <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">🤝 Bible Buddies</h2>
              <p className="text-gray-700 mt-1">
                Meet some of the Bible Buddies.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
