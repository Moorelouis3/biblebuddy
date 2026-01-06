"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  getProfileStats,
  getHeatMapData,
  calculateStreakFromActions,
  getDayAbbr,
  type ProfileStats,
  type HeatMapDay,
  type StreakData,
} from "../../lib/profileStats";
import { syncNotesCount, shouldSyncNotesCount } from "../../lib/syncNotesCount";
import { syncChaptersCount, shouldSyncChaptersCount } from "../../lib/syncChaptersCount";
import { isBookComplete, getBookTotalChapters, getCompletedChapters } from "../../lib/readingProgress";

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [heatMapData, setHeatMapData] = useState<HeatMapDay[]>([]);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [booksCompleted, setBooksCompleted] = useState(0);
  const [bibleCompletion, setBibleCompletion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLog, setActionLog] = useState<Array<{ date: string; text: string; sortKey: number }>>([]);
  const [isActionLogOpen, setIsActionLogOpen] = useState(false);

  // Load user and all profile data
  useEffect(() => {
    async function loadProfileData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        setUserId(user.id);

        // Sync notes count if it's a new day or first time
        if (shouldSyncNotesCount(user.id)) {
          console.log("[PROFILE] Syncing notes count on profile load (new day detected)");
          await syncNotesCount(user.id);
        }

        // Sync chapters count if it's a new day or first time
        if (shouldSyncChaptersCount(user.id)) {
          console.log("[PROFILE] Syncing chapters count on profile load (new day detected)");
          await syncChaptersCount(user.id);
        }

        // Load profile stats
        const profileStats = await getProfileStats(user.id);
        setStats(profileStats);

        // Load heat map data
        const heatMap = await getHeatMapData(user.id);
        setHeatMapData(heatMap);

        // Load streak data
        const streakData = await calculateStreakFromActions(user.id);
        setStreak(streakData);

        // Calculate books completed and Bible completion
        // Query completed_chapters directly to get accurate counts
        const { data: completedChapters, error: chaptersError } = await supabase
          .from("completed_chapters")
          .select("book, chapter, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (!chaptersError && completedChapters) {
          // Get unique books that have at least one chapter completed
          const uniqueBooks = new Set(completedChapters.map((c) => c.book));
          
          // Check each book to see if ALL chapters are completed
          let completedBooksCount = 0;
          for (const book of uniqueBooks) {
            const isComplete = await isBookComplete(user.id, book);
            if (isComplete) {
              completedBooksCount++;
            }
          }
          
          setBooksCompleted(completedBooksCount);

          // Calculate Bible completion percentage
          const totalChapters = completedChapters.length;
          const totalBibleChapters = 1189;
          const completionPercent = totalChapters > 0
            ? Math.round((totalChapters / totalBibleChapters) * 100 * 10) / 10
            : 0;
          setBibleCompletion(completionPercent);

          // Build Action Log from existing data
          await buildActionLog(user.id, completedChapters);
        } else {
          setBooksCompleted(0);
          setBibleCompletion(0);
          setActionLog([]);
        }
      } catch (err) {
        console.error("Error loading profile data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, []);

  // Build Action Log from existing data
  async function buildActionLog(userId: string, completedChapters: Array<{ book: string; chapter: number; created_at: string }>) {
    const actions: Array<{ date: string; text: string; sortKey: number }> = [];

    try {
      // 1. Get all actions from master_actions
      const { data: masterActions, error: actionsError } = await supabase
        .from("master_actions")
        .select("action_type, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (actionsError) {
        console.error("Error fetching master_actions:", actionsError);
      } else if (masterActions) {
        // Track unique login dates (one per day)
        const loginDates = new Set<string>();

        for (const action of masterActions) {
          const actionDate = new Date(action.created_at);
          const dateKey = actionDate.toISOString().split('T')[0]; // YYYY-MM-DD
          const formattedDate = formatActionDate(actionDate);

          if (action.action_type === "chapter_completed") {
            actions.push({
              date: formattedDate,
              text: `On ${formattedDate}, you completed a chapter.`,
              sortKey: actionDate.getTime(),
            });
          } else if (action.action_type === "person_learned") {
            actions.push({
              date: formattedDate,
              text: `On ${formattedDate}, you learned about a new person.`,
              sortKey: actionDate.getTime(),
            });
          } else if (action.action_type === "place_discovered") {
            actions.push({
              date: formattedDate,
              text: `On ${formattedDate}, you discovered a new place.`,
              sortKey: actionDate.getTime(),
            });
          } else if (action.action_type === "keyword_mastered") {
            actions.push({
              date: formattedDate,
              text: `On ${formattedDate}, you mastered a new keyword.`,
              sortKey: actionDate.getTime(),
            });
          } else if (action.action_type === "user_login") {
            // Only show one login per day
            if (!loginDates.has(dateKey)) {
              loginDates.add(dateKey);
              actions.push({
                date: formattedDate,
                text: `On ${formattedDate}, you logged in.`,
                sortKey: actionDate.getTime(),
              });
            }
          }
        }
      }

      // 2. Detect book completions from completed_chapters
      // Group chapters by book and find when each book was completed
      const bookChapters = new Map<string, Array<{ chapter: number; created_at: string }>>();
      
      for (const chapter of completedChapters) {
        if (!bookChapters.has(chapter.book)) {
          bookChapters.set(chapter.book, []);
        }
        bookChapters.get(chapter.book)!.push({
          chapter: chapter.chapter,
          created_at: chapter.created_at,
        });
      }

      // For each book, check if it's complete and find the date of the last chapter
      for (const [book, chapters] of bookChapters.entries()) {
        const totalChapters = getBookTotalChapters(book);
        const completedChapterNumbers = chapters.map(c => c.chapter);
        const completedSet = new Set(completedChapterNumbers);

        // Check if all chapters are completed
        let allChaptersCompleted = true;
        for (let i = 1; i <= totalChapters; i++) {
          if (!completedSet.has(i)) {
            allChaptersCompleted = false;
            break;
          }
        }

        if (allChaptersCompleted && chapters.length > 0) {
          // Find the date when the book was completed
          // This is the latest created_at among all chapters (when the last chapter was added)
          const sortedChapters = [...chapters].sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          
          // The book completion date is when the most recently added chapter was completed
          const completionDate = new Date(sortedChapters[0].created_at);
          const formattedDate = formatActionDate(completionDate);
          
          // Capitalize book name properly
          const bookName = book.split(' ').map(word => {
            // Handle numbered books like "1 Samuel" -> "1 Samuel"
            if (/^\d+$/.test(word)) return word;
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }).join(' ');

          actions.push({
            date: formattedDate,
            text: `On ${formattedDate}, you completed ${bookName}.`,
            sortKey: completionDate.getTime(),
          });
        }
      }

      // Sort by date (newest first) and limit display
      actions.sort((a, b) => b.sortKey - a.sortKey);
      setActionLog(actions);
    } catch (err) {
      console.error("Error building action log:", err);
      setActionLog([]);
    }
  }

  // Format date for action log display
  function formatActionDate(date: Date): string {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }

  const getHeatMapColor = (actions: number) => {
    if (actions === 0) return "bg-gray-100";
    if (actions === 1) return "bg-green-200";
    if (actions >= 2 && actions <= 3) return "bg-green-400";
    if (actions >= 4 && actions <= 5) return "bg-green-600";
    return "bg-green-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center py-12 text-gray-500">Loading profile...</div>
        </div>
      </div>
    );
  }

  // Use real data or defaults
  const displayStats = stats || {
    total_actions: 0,
    chapters_completed_count: 0,
    notes_created_count: 0,
    people_learned_count: 0,
    places_discovered_count: 0,
    keywords_mastered_count: 0,
    last_active_date: null,
    current_streak: 0,
  };

  const displayStreak = streak || {
    currentStreak: 0,
    last7Days: [],
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

        {/* DAILY STREAK SECTION */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">
              {displayStreak.currentStreak} day streak
            </h2>
            <p className="text-sm text-gray-600">
              {displayStreak.currentStreak === 0
                ? "Start a streak by reading today"
                : "Read today to extend your streak"}
            </p>
          </div>

          {/* Day Indicators */}
          {displayStreak.last7Days.length > 0 ? (
            <div className="flex items-center gap-3">
              {displayStreak.last7Days.map((dayItem, index) => (
                <div key={dayItem.date} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-2">
                    {getDayAbbr(dayItem.date)}
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      dayItem.completed
                        ? "bg-green-500 text-white"
                        : index === displayStreak.last7Days.length - 1
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
                    ) : index === displayStreak.last7Days.length - 1 ? (
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
          ) : (
            <div className="text-sm text-gray-500 text-center py-2">
              No streak data available
            </div>
          )}
        </div>

        {/* DAILY ACTIVITY HEAT MAP */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
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

        {/* STATS ROW 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Actions */}
          <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.total_actions}</div>
            <div className="text-sm text-gray-700">Total Actions</div>
          </div>

          {/* Books Completed */}
          <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{booksCompleted}</div>
            <div className="text-sm text-gray-700">Books Completed</div>
          </div>

          {/* Chapters Read */}
          <div className="bg-green-100 border border-green-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.chapters_completed_count}</div>
            <div className="text-sm text-gray-700">Chapters Read</div>
          </div>

          {/* Bible Completion */}
          <div className="bg-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{bibleCompletion}%</div>
            <div className="text-sm text-gray-700">Bible Completion</div>
          </div>
        </div>

        {/* STATS ROW 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Notes Created */}
          <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.notes_created_count}</div>
            <div className="text-sm text-gray-700">Notes Created</div>
          </div>

          {/* People Learned About */}
          <div className="bg-pink-100 border border-pink-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.people_learned_count}</div>
            <div className="text-sm text-gray-700">People Learned About</div>
          </div>

          {/* Places Discovered */}
          <div className="bg-cyan-100 border border-cyan-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.places_discovered_count}</div>
            <div className="text-sm text-gray-700">Places Discovered</div>
          </div>

          {/* Keywords Mastered */}
          <div className="bg-indigo-100 border border-indigo-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.keywords_mastered_count}</div>
            <div className="text-sm text-gray-700">Keywords Mastered</div>
          </div>
        </div>

        {/* ACTION LOG SECTION */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mt-6">
          {/* Collapsible Header */}
          <button
            type="button"
            onClick={() => setIsActionLogOpen(!isActionLogOpen)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-150 active:scale-[0.99]"
          >
            <h2 className="text-xl font-semibold">Action Log</h2>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                isActionLogOpen ? "rotate-180" : ""
              }`}
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

          {/* Collapsible Content */}
          {isActionLogOpen && (
            <div className="px-6 pb-6">
              {actionLog.length === 0 ? (
                <p className="text-sm text-gray-500 py-4">
                  No actions yet. Start reading to see your activity history!
                </p>
              ) : (
                <div
                  className={`space-y-3 ${
                    actionLog.length > 10
                      ? "max-h-96 overflow-y-auto pr-2"
                      : ""
                  }`}
                >
                  {actionLog.map((action, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-700 py-1 border-b border-gray-100 last:border-0"
                    >
                      {action.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

