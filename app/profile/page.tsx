"use client";

import { useState } from "react";

export default function ProfilePage() {
  // Mock data for UI only
  const stats = {
    totalActions: 247,
    booksCompleted: 12,
    chaptersRead: 342,
    bibleCompletion: 28.7,
    notesCreated: 89,
    peopleLearnedAbout: 45,
    placesDiscovered: 23,
    keywordsMastered: 67,
  };

  const streak = {
    currentStreak: 6,
    days: [
      { day: "Mon", completed: true },
      { day: "Tue", completed: true },
      { day: "Wed", completed: true },
      { day: "Thu", completed: true },
      { day: "Fri", completed: true },
      { day: "Sat", completed: true },
      { day: "Sun", completed: false },
    ],
  };

  // Mock heat map data (last 90 days)
  const generateHeatMapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      // Random mock data: 0-6 actions per day
      const actions = Math.floor(Math.random() * 7);
      data.push({
        date: date.toISOString().slice(0, 10),
        actions,
      });
    }
    return data;
  };

  const [heatMapData] = useState(generateHeatMapData());

  const getHeatMapColor = (actions: number) => {
    if (actions === 0) return "bg-gray-100";
    if (actions === 1) return "bg-green-200";
    if (actions >= 2 && actions <= 3) return "bg-green-400";
    if (actions >= 4 && actions <= 5) return "bg-green-600";
    return "bg-green-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Bible Study Stats</h1>
          <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* STATS ROW 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Actions */}
          <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.totalActions}</div>
            <div className="text-sm text-gray-700">Total Actions</div>
          </div>

          {/* Books Completed */}
          <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.booksCompleted}</div>
            <div className="text-sm text-gray-700">Books Completed</div>
          </div>

          {/* Chapters Read */}
          <div className="bg-green-100 border border-green-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.chaptersRead}</div>
            <div className="text-sm text-gray-700">Chapters Read</div>
          </div>

          {/* Bible Completion */}
          <div className="bg-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.bibleCompletion}%</div>
            <div className="text-sm text-gray-700">Bible Completion</div>
          </div>
        </div>

        {/* STATS ROW 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Notes Created */}
          <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.notesCreated}</div>
            <div className="text-sm text-gray-700">Notes Created</div>
          </div>

          {/* People Learned About */}
          <div className="bg-pink-100 border border-pink-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.peopleLearnedAbout}</div>
            <div className="text-sm text-gray-700">People Learned About</div>
          </div>

          {/* Places Discovered */}
          <div className="bg-cyan-100 border border-cyan-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.placesDiscovered}</div>
            <div className="text-sm text-gray-700">Places Discovered</div>
          </div>

          {/* Keywords Mastered */}
          <div className="bg-indigo-100 border border-indigo-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.keywordsMastered}</div>
            <div className="text-sm text-gray-700">Keywords Mastered</div>
          </div>
        </div>

        {/* DAILY ACTIVITY HEAT MAP */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Daily Activity</h2>
          
          {/* Legend */}
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-gray-100"></div>
              <div className="w-3 h-3 rounded bg-green-200"></div>
              <div className="w-3 h-3 rounded bg-green-400"></div>
              <div className="w-3 h-3 rounded bg-green-600"></div>
              <div className="w-3 h-3 rounded bg-green-800"></div>
            </div>
            <span>More</span>
            <div className="ml-4 flex items-center gap-2">
              <span>0</span>
              <span>1</span>
              <span>3</span>
              <span>5+</span>
            </div>
          </div>

          {/* Heat Map Grid */}
          <div className="overflow-x-auto">
            <div className="inline-flex gap-1">
              {heatMapData.map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded ${getHeatMapColor(day.actions)} hover:ring-2 hover:ring-blue-400 cursor-pointer`}
                  title={`${day.actions} actions on ${new Date(day.date).toLocaleDateString()}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* DAILY STREAK SECTION */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">
              {streak.currentStreak} day streak
            </h2>
            <p className="text-sm text-gray-600">
              Read today to extend your streak
            </p>
          </div>

          {/* Day Indicators */}
          <div className="flex items-center gap-3">
            {streak.days.map((dayItem, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-2">{dayItem.day}</div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    dayItem.completed
                      ? "bg-green-500 text-white"
                      : index === streak.days.length - 1
                      ? "bg-blue-100 text-blue-600 border-2 border-blue-300"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {dayItem.completed ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : index === streak.days.length - 1 ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

