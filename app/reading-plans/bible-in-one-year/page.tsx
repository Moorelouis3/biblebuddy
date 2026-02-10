"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { ACTION_TYPE } from "../../../lib/actionTypes";
import { getCompletedChapters, isChapterCompleted } from "../../../lib/readingProgress";
import {
  generateBibleInOneYearPlan,
  getCurrentDayNumber,
  getWeekNumber,
  getDayInWeek,
  type ChapterAssignment,
  type DayReading,
  type WeekReading,
} from "../../../lib/bibleInOneYearPlan";

type DayProgress = {
  completedChapters: Set<string>; // "book:chapter" format
  totalChapters: number;
};

type WeekProgress = {
  completedDays: number;
  totalDays: number;
};

export default function BibleInOneYearPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [plan, setPlan] = useState<ReturnType<typeof generateBibleInOneYearPlan> | null>(null);
  const [dayProgress, setDayProgress] = useState<Record<number, DayProgress>>({});
  const [weekProgress, setWeekProgress] = useState<Record<number, WeekProgress>>({});
  const [openWeek, setOpenWeek] = useState<number | null>(null);
  const [openMonth, setOpenMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayReading | null>(null);
  const [showCreditBlocked, setShowCreditBlocked] = useState(false);
  const [canViewSelectedDay, setCanViewSelectedDay] = useState(false);
  const [viewedDays, setViewedDays] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [currentDayNumber, setCurrentDayNumber] = useState(1);
  const [nextIncompleteDay, setNextIncompleteDay] = useState<number | null>(null);
  const weekRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const monthRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Month sections and colors
  const MONTHS = [
    { name: "Month 1", color: "blue" },
    { name: "Month 2", color: "indigo" },
    { name: "Month 3", color: "teal" },
    { name: "Month 4", color: "green" },
    { name: "Month 5", color: "yellow" },
    { name: "Month 6", color: "orange" },
    { name: "Month 7", color: "red" },
    { name: "Month 8", color: "pink" },
    { name: "Month 9", color: "purple" },
    { name: "Month 10", color: "blue" },
    { name: "Month 11", color: "indigo" },
    { name: "Month 12", color: "teal" },
  ];

  // Get month number for a week (1-12)
  const getMonthForWeek = (weekNumber: number): number => {
    // Approximately 4.33 weeks per month, so distribute 52 weeks across 12 months
    // Each month gets roughly 4-5 weeks
    if (weekNumber <= 4) return 1;      // January
    if (weekNumber <= 8) return 2;      // February
    if (weekNumber <= 13) return 3;     // March
    if (weekNumber <= 17) return 4;     // April
    if (weekNumber <= 22) return 5;     // May
    if (weekNumber <= 26) return 6;     // June
    if (weekNumber <= 30) return 7;     // July
    if (weekNumber <= 35) return 8;     // August
    if (weekNumber <= 39) return 9;     // September
    if (weekNumber <= 43) return 10;    // October
    if (weekNumber <= 48) return 11;    // November
    return 12;                           // December
  };

  // Group weeks by month
  const getWeeksByMonth = () => {
    if (!plan) return {};
    const months: Record<number, WeekReading[]> = {};
    plan.weeks.forEach((week) => {
      const month = getMonthForWeek(week.weekNumber);
      if (!months[month]) {
        months[month] = [];
      }
      months[month].push(week);
    });
    return months;
  };

  // Generate plan on mount
  useEffect(() => {
    const generatedPlan = generateBibleInOneYearPlan();
    setPlan(generatedPlan);
    setCurrentDayNumber(getCurrentDayNumber());
  }, []);

  // Load user and progress
  useEffect(() => {
    async function loadUserAndProgress() {
      if (!plan) return;

      try {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const uid = user.id;
        setUserId(uid);

        // Load all completed chapters for all books in the plan
        const allBooks = new Set<string>();
        plan.weeks.forEach((week) => {
          week.days.forEach((day) => {
            day.chapters.forEach((ch) => {
              allBooks.add(ch.book);
            });
          });
        });

        const bookKeys = Array.from(allBooks).map((b) => b.toLowerCase().trim());
        const { data, error } = await supabase
          .from("completed_chapters")
          .select("book, chapter")
          .eq("user_id", uid)
          .in("book", bookKeys);

        if (error) {
          console.error("[BIBLE_IN_ONE_YEAR] Error loading completed chapters:", error);
          setLoading(false);
          return;
        }

        // Build completion map: "book:chapter" -> true
        // Create a map from lowercase book keys to original book names
        const bookNameMap = new Map<string, string>();
        plan.weeks.forEach((week) => {
          week.days.forEach((day) => {
            day.chapters.forEach((ch) => {
              const key = ch.book.toLowerCase().trim();
              if (!bookNameMap.has(key)) {
                bookNameMap.set(key, ch.book);
              }
            });
          });
        });

        const completedSet = new Set<string>();
        (data || []).forEach((row: { book: string; chapter: number }) => {
          const rowBookKey = row.book.toLowerCase().trim();
          const originalBook = bookNameMap.get(rowBookKey);
          if (originalBook) {
            completedSet.add(`${originalBook}:${row.chapter}`);
          }
        });

        // Calculate day progress
        const dayProgressMap: Record<number, DayProgress> = {};
        plan.weeks.forEach((week) => {
          week.days.forEach((day) => {
            let completedCount = 0;
            day.chapters.forEach((ch) => {
              if (completedSet.has(`${ch.book}:${ch.chapter}`)) {
                completedCount++;
              }
            });
            dayProgressMap[day.dayNumber] = {
              completedChapters: new Set(
                day.chapters
                  .filter((ch) => completedSet.has(`${ch.book}:${ch.chapter}`))
                  .map((ch) => `${ch.book}:${ch.chapter}`)
              ),
              totalChapters: day.chapters.length,
            };
          });
        });

        setDayProgress(dayProgressMap);

        // Calculate week progress
        const weekProgressMap: Record<number, WeekProgress> = {};
        plan.weeks.forEach((week) => {
          let completedDays = 0;
          week.days.forEach((day) => {
            const progress = dayProgressMap[day.dayNumber];
            if (progress && progress.completedChapters.size === progress.totalChapters) {
              completedDays++;
            }
          });
          weekProgressMap[week.weekNumber] = {
            completedDays,
            totalDays: week.days.length,
          };
        });

        setWeekProgress(weekProgressMap);

        // Find first incomplete day
        let firstIncomplete = null;
        for (let dayNum = 1; dayNum <= plan.totalDays; dayNum++) {
          const progress = dayProgressMap[dayNum];
          if (!progress || progress.completedChapters.size < progress.totalChapters) {
            firstIncomplete = dayNum;
            break;
          }
        }
        setNextIncompleteDay(firstIncomplete);

        // Open week and month containing the next incomplete day (or current day if all complete)
        const targetDay = firstIncomplete || currentDayNumber;
        const targetWeek = getWeekNumber(targetDay);
        const targetMonth = getMonthForWeek(targetWeek);
        setOpenWeek(targetWeek);
        setOpenMonth(targetMonth);
      } catch (err) {
        console.error("[BIBLE_IN_ONE_YEAR] Error loading progress:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserAndProgress();
  }, [plan, currentDayNumber]);

  // Scroll to current month/week when it opens
  useEffect(() => {
    if (openMonth && monthRefs.current[openMonth]) {
      setTimeout(() => {
        monthRefs.current[openMonth]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (openWeek && weekRefs.current[openWeek]) {
      setTimeout(() => {
        weekRefs.current[openWeek]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [openWeek, openMonth]);

  const handleOpenChapter = (book: string, chapter: number) => {
    const slug = encodeURIComponent(book.toLowerCase().trim());
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("bbFromReadingPlan", "bible-in-one-year");
    }
    router.push(`/Bible/${slug}/${chapter}`);
  };

  const getDayState = (day: DayReading): "not-started" | "in-progress" | "completed" => {
    const progress = dayProgress[day.dayNumber];
    if (!progress) return "not-started";
    if (progress.completedChapters.size === 0) return "not-started";
    if (progress.completedChapters.size === progress.totalChapters) return "completed";
    return "in-progress";
  };

  const isCurrentDay = (dayNumber: number): boolean => {
    // Highlight the next incomplete day, or current day if all complete
    const targetDay = nextIncompleteDay || currentDayNumber;
    return dayNumber === targetDay;
  };

  const isDayCompleted = (day: DayReading): boolean => {
    const progress = dayProgress[day.dayNumber];
    return !!progress && progress.completedChapters.size === progress.totalChapters;
  };

  const isDayUnlocked = (dayNumber: number): boolean => {
    if (dayNumber === 1) return true;
    const prevProgress = dayProgress[dayNumber - 1];
    return !!prevProgress && prevProgress.completedChapters.size === prevProgress.totalChapters;
  };

  const handleDayClick = (day: DayReading) => {
    if (!isDayUnlocked(day.dayNumber)) {
      return;
    }

    setShowCreditBlocked(false);
    setCanViewSelectedDay(false);
    setSelectedDay(day);
  };

  useEffect(() => {
    if (!selectedDay) {
      setShowCreditBlocked(false);
      setCanViewSelectedDay(false);
      return;
    }

    const completed = isDayCompleted(selectedDay);
    if (completed) {
      setShowCreditBlocked(false);
      setCanViewSelectedDay(true);
      return;
    }

    if (viewedDays.has(selectedDay.dayNumber)) {
      setShowCreditBlocked(false);
      setCanViewSelectedDay(true);
      return;
    }

    const consume = async () => {
      const creditResponse = await fetch("/api/consume-credit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionType: ACTION_TYPE.bible_in_one_year_day_viewed,
        }),
      });

      if (!creditResponse.ok) {
        setShowCreditBlocked(true);
        setCanViewSelectedDay(false);
        return;
      }

      const creditResult = (await creditResponse.json().catch(() => ({}))) as {
        ok?: boolean;
        reason?: string;
      };

      if (creditResult.ok === false) {
        setShowCreditBlocked(true);
        setCanViewSelectedDay(false);
        return;
      }

      setViewedDays((prev) => {
        const next = new Set(prev);
        next.add(selectedDay.dayNumber);
        return next;
      });
      setShowCreditBlocked(false);
      setCanViewSelectedDay(true);
    };

    consume();
  }, [selectedDay, viewedDays, dayProgress]);

  if (loading || !plan) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Bible in One Year</h1>
          <div className="text-gray-500">Loading reading plan...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">Bible in One Year</h1>

        {/* COVER IMAGE (match devotional cover style) */}
        <div className="mb-6 flex justify-center">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 max-w-xs w-full">
            <img
              src="/images/bibleinoneyear.png"
              alt="Bible in One Year cover"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          Read through the entire Bible in 365 days, organized by weeks and days.
        </p>

        {/* PROGRESS SUMMARY */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm text-gray-600">
              Day {currentDayNumber} of 365
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-4">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${(currentDayNumber / 365) * 100}%` }}
            />
          </div>
          
          {/* Continue Button */}
          {nextIncompleteDay && plan.weeks.flatMap((w) => w.days).find((d) => d.dayNumber === nextIncompleteDay) && (
            <button
              type="button"
              onClick={() => {
                const day = plan.weeks.flatMap((w) => w.days).find((d) => d.dayNumber === nextIncompleteDay);
                if (day) {
                  handleDayClick(day);
                  const week = getWeekNumber(nextIncompleteDay!);
                  const month = getMonthForWeek(week);
                  setOpenWeek(week);
                  setOpenMonth(month);
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Continue with Day {nextIncompleteDay}
            </button>
          )}
        </div>

        {/* MONTHS */}
        <div className="space-y-6">
          {MONTHS.map((month, monthIndex) => {
            const monthNum = monthIndex + 1;
            const weeksInMonth = getWeeksByMonth()[monthNum] || [];
            const isMonthOpen = openMonth === monthNum;

            // Calculate month progress
            let monthCompletedDays = 0;
            let monthTotalDays = 0;
            weeksInMonth.forEach((week) => {
              const progress = weekProgress[week.weekNumber] || { completedDays: 0, totalDays: 7 };
              monthCompletedDays += progress.completedDays;
              monthTotalDays += progress.totalDays;
            });
            const monthPercent = monthTotalDays > 0
              ? (monthCompletedDays / monthTotalDays) * 100
              : 0;

            const colorClasses = {
              blue: "bg-blue-100 border-blue-200",
              indigo: "bg-indigo-100 border-indigo-200",
              teal: "bg-teal-100 border-teal-200",
              green: "bg-green-100 border-green-200",
              yellow: "bg-yellow-100 border-yellow-200",
              orange: "bg-orange-100 border-orange-200",
              red: "bg-red-100 border-red-200",
              pink: "bg-pink-100 border-pink-200",
              purple: "bg-purple-100 border-purple-200",
            };

            if (weeksInMonth.length === 0) return null;

            return (
              <div
                key={monthNum}
                ref={(el) => {
                  monthRefs.current[monthNum] = el;
                }}
                className={`${colorClasses[month.color as keyof typeof colorClasses]} border rounded-xl p-5 shadow-sm`}
              >
                {/* Month Header */}
                <button
                  type="button"
                  onClick={() => setOpenMonth(isMonthOpen ? null : monthNum)}
                  className="w-full flex items-center justify-between text-left mb-2"
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">{month.name}</h2>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-white/60 overflow-hidden max-w-xs">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${monthPercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-700">
                        {monthCompletedDays} / {monthTotalDays} days
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-600 text-lg">
                    {isMonthOpen ? "▴" : "▾"}
                  </span>
                </button>

                {/* Weeks in Month */}
                {isMonthOpen && (
                  <div className="mt-4 space-y-3">
                    {weeksInMonth.map((week) => {
                      const progress = weekProgress[week.weekNumber] || { completedDays: 0, totalDays: 7 };
                      const isOpen = openWeek === week.weekNumber;
                      const weekPercent = progress.totalDays > 0
                        ? (progress.completedDays / progress.totalDays) * 100
                        : 0;

                      return (
                        <div
                          key={week.weekNumber}
                          ref={(el) => {
                            weekRefs.current[week.weekNumber] = el;
                          }}
                          className="bg-white/60 rounded-lg overflow-hidden"
                        >
                          {/* Week Header */}
                          <button
                            type="button"
                            onClick={() => setOpenWeek(isOpen ? null : week.weekNumber)}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-white/80 transition"
                          >
                            <div className="flex-1">
                              <h3 className="text-base font-semibold mb-1">
                                Week {week.weekNumber}
                              </h3>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden max-w-xs">
                                  <div
                                    className="h-full bg-blue-500 rounded-full transition-all"
                                    style={{ width: `${weekPercent}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600">
                                  {progress.completedDays} / {progress.totalDays} days
                                </span>
                              </div>
                            </div>
                            <span className="ml-3 text-gray-500">
                              {isOpen ? "▴" : "▾"}
                            </span>
                          </button>

                          {/* Week Days */}
                          {isOpen && (
                            <div className="p-3 pt-0 border-t border-gray-200/50">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-2">
                                {week.days.map((day) => {
                                  const dayState = getDayState(day);
                                  const isCurrent = isCurrentDay(day.dayNumber);
                                  const progress = dayProgress[day.dayNumber];

                                  let stateClasses = "bg-gray-100 border-gray-300 text-gray-700";
                                  if (dayState === "completed") {
                                    stateClasses = "bg-green-100 border-green-300 text-green-800";
                                  } else if (dayState === "in-progress") {
                                    stateClasses = "bg-yellow-100 border-yellow-300 text-yellow-800";
                                  }

                                  if (isCurrent) {
                                    stateClasses += " ring-2 ring-blue-500 ring-offset-2";
                                  }

                                  const isUnlocked = isDayUnlocked(day.dayNumber);

                                  return (
                                    <button
                                      key={day.dayNumber}
                                      type="button"
                                      onClick={() => handleDayClick(day)}
                                      disabled={!isUnlocked}
                                      className={`rounded-lg border p-2 text-left transition hover:shadow-md text-sm ${stateClasses} ${
                                        isUnlocked ? "" : "opacity-60 cursor-not-allowed"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-xs">
                                          Day {day.dayNumber}
                                        </span>
                                        {isCurrent && (
                                          <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                                            Today
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-gray-600 mb-1">
                                        {day.chapters.length} chapter{day.chapters.length !== 1 ? "s" : ""}
                                      </p>
                                      {progress && (
                                        <div className="h-1 rounded-full bg-gray-200 overflow-hidden">
                                          <div
                                            className="h-full bg-blue-500 rounded-full transition-all"
                                            style={{
                                              width: `${(progress.completedChapters.size / progress.totalChapters) * 100}%`,
                                            }}
                                          />
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Day {selectedDay.dayNumber}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedDay.chapters.length} chapter{selectedDay.chapters.length !== 1 ? "s" : ""} to read
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {showCreditBlocked ? (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
                  <div className="text-3xl mb-3">🔒</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Out of Credits</h3>
                  <p className="text-gray-600 text-sm">
                    You've used all 5 daily credits available to free users.
                  </p>
                  <ul className="mt-4 space-y-1 text-left text-sm text-gray-600 list-disc pl-5">
                    <li>People/Places/Keywords</li>
                    <li>One round of trivia</li>
                    <li>Open devotionals</li>
                    <li>Start a new study action</li>
                  </ul>
                  <a
                    href="/upgrade"
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                  >
                    Upgrade to Bible Buddy Pro
                  </a>
                </div>
              ) : canViewSelectedDay ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedDay.chapters.map((chapter, idx) => {
                    const progress = dayProgress[selectedDay.dayNumber];
                    const isCompleted = progress?.completedChapters.has(`${chapter.book}:${chapter.chapter}`);

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          handleOpenChapter(chapter.book, chapter.chapter);
                          setSelectedDay(null);
                        }}
                        className={`rounded-xl border p-4 text-left transition hover:shadow-md ${
                          isCompleted
                            ? "bg-green-100 border-green-300 text-green-800"
                            : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                        }`}
                      >
                        <p className="font-semibold">
                          {chapter.book} {chapter.chapter}
                        </p>
                        <p className="text-xs mt-1 text-gray-600">
                          {isCompleted ? "Completed" : "Tap to read"}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

