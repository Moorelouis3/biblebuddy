"use client";

import { useEffect, useState } from "react";
import { calculateStreak, getDayAbbr, type StreakData } from "../lib/streakCalculator";

interface ReadingStreakCardProps {
  userId: string | null;
}

export function ReadingStreakCard({ userId }: ReadingStreakCardProps) {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      setStreakData({ currentStreak: 0, last7Days: [] });
      return;
    }

    async function loadStreak() {
      if (!userId) return; // Type guard
      try {
        setIsLoading(true);
        const data = await calculateStreak(userId);
        setStreakData(data);
      } catch (err) {
        console.error("[STREAK] Error loading streak:", err);
        setStreakData({ currentStreak: 0, last7Days: [] });
      } finally {
        setIsLoading(false);
      }
    }

    loadStreak();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">🔥 Reading Streak</h2>
            <p className="text-gray-500 text-sm mt-1">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentStreak = streakData?.currentStreak || 0;
  const last7Days = streakData?.last7Days || [];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* Collapsed Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <h2 className="text-xl font-semibold">🔥 Reading Streak</h2>
          <p className="text-gray-700 text-sm mt-1">
            {currentStreak === 0
              ? "Start a streak by reading one chapter today"
              : `You're on a ${currentStreak}-day streak`}
          </p>
        </div>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 transition-transform"
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
          {last7Days.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-600">Last 7 days</p>
              </div>
              <div className="flex items-center gap-2">
                {last7Days.map((day, index) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">
                      {getDayAbbr(day.date)}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        day.completed
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                      title={day.date}
                    >
                      {day.completed ? "✓" : ""}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">
              Start a streak by reading one chapter today
            </p>
          )}
        </div>
      )}
    </div>
  );
}

