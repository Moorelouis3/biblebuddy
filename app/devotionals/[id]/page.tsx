"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import DevotionalDayModal from "../../../components/DevotionalDayModal";
import BibleReadingModal from "../../../components/BibleReadingModal";

interface Devotional {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  total_days: number;
}

interface DevotionalDay {
  id: string;
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string | null;
}

interface DayProgress {
  day_number: number;
  is_completed: boolean;
  reading_completed: boolean;
  reflection_text: string | null;
}

export default function DevotionalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const devotionalId = params.id as string;

  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [days, setDays] = useState<DevotionalDay[]>([]);
  const [progress, setProgress] = useState<Map<number, DayProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<DevotionalDay | null>(null);
  const [showBibleModal, setShowBibleModal] = useState(false);
  const [bibleBook, setBibleBook] = useState<string>("");
  const [bibleChapter, setBibleChapter] = useState<number>(0);
  const [showReadingRequiredModal, setShowReadingRequiredModal] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    }
    loadUser();
  }, []);

  useEffect(() => {
    async function loadDevotional() {
      try {
        // Load devotional
        const { data: devotionalData, error: devotionalError } = await supabase
          .from("devotionals")
          .select("*")
          .eq("id", devotionalId)
          .single();

        if (devotionalError || !devotionalData) {
          console.error("Error loading devotional:", devotionalError);
          router.push("/devotionals");
          return;
        }

        setDevotional(devotionalData);

        // Load days
        const { data: daysData, error: daysError } = await supabase
          .from("devotional_days")
          .select("*")
          .eq("devotional_id", devotionalId)
          .order("day_number", { ascending: true });

        if (daysError) {
          console.error("Error loading days:", daysError);
          return;
        }

        setDays(daysData || []);

        // Load progress if user is logged in
        if (userId) {
          const { data: progressData, error: progressError } = await supabase
            .from("devotional_progress")
            .select("*")
            .eq("user_id", userId)
            .eq("devotional_id", devotionalId);

          if (!progressError && progressData) {
            const progressMap = new Map<number, DayProgress>();
            progressData.forEach((p) => {
              progressMap.set(p.day_number, {
                day_number: p.day_number,
                is_completed: p.is_completed,
                reading_completed: p.reading_completed,
                reflection_text: p.reflection_text,
              });
            });
            setProgress(progressMap);
          }
        }
      } catch (err) {
        console.error("Error loading devotional:", err);
      } finally {
        setLoading(false);
      }
    }

    if (devotionalId) {
      loadDevotional();
    }
  }, [devotionalId, userId, router]);

  // Calculate current day and progress
  const getCurrentDay = () => {
    if (!userId || progress.size === 0) {
      return 1; // Start with day 1
    }

    // Find the first incomplete day
    for (let i = 1; i <= (devotional?.total_days || 21); i++) {
      const dayProgress = progress.get(i);
      if (!dayProgress || !dayProgress.is_completed) {
        return i;
      }
    }

    // All days completed
    return devotional?.total_days || 21;
  };

  const currentDay = getCurrentDay();
  const completedDays = Array.from(progress.values()).filter((p) => p.is_completed).length;
  const progressPercent = devotional ? (completedDays / devotional.total_days) * 100 : 0;

  const isDayUnlocked = (dayNumber: number) => {
    if (dayNumber === 1) return true;
    const prevDayProgress = progress.get(dayNumber - 1);
    return prevDayProgress?.is_completed === true;
  };

  const handleDayClick = (day: DevotionalDay) => {
    if (isDayUnlocked(day.day_number)) {
      setSelectedDay(day);
    }
  };

  const handleBibleReadingClick = (book: string, chapter: number) => {
    setBibleBook(book);
    setBibleChapter(chapter);
    setShowBibleModal(true);
  };

  const handleDayComplete = async (dayNumber: number, reflectionText: string, readingCompleted: boolean) => {
    if (!userId) return;

    // ENFORCE: Bible reading must be completed before day can be marked complete
    if (!readingCompleted) {
      setShowReadingRequiredModal(true);
      return; // Do not proceed with completion
    }

    try {
      // Save everything in one transaction: reflection, reading status, and completion
      const { error } = await supabase
        .from("devotional_progress")
        .upsert(
          {
            user_id: userId,
            devotional_id: devotionalId,
            day_number: dayNumber,
            is_completed: true,
            reading_completed: readingCompleted,
            reflection_text: reflectionText || null,
            completed_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,devotional_id,day_number",
          }
        );

      if (error) {
        console.error("Error completing day:", error);
        alert("Failed to mark day as complete. Please try again.");
        return;
      }

      // Update local state with all values
      setProgress((prev) => {
        const next = new Map(prev);
        next.set(dayNumber, { 
          day_number: dayNumber, 
          is_completed: true, 
          reading_completed: readingCompleted,
          reflection_text: reflectionText || null,
        });
        return next;
      });

      // Close modal
      setSelectedDay(null);
    } catch (err) {
      console.error("Error completing day:", err);
      alert("Failed to mark day as complete. Please try again.");
    }
  };

  const handleReadingComplete = async (dayNumber: number) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("devotional_progress")
        .upsert(
          {
            user_id: userId,
            devotional_id: devotionalId,
            day_number: dayNumber,
            reading_completed: true,
          },
          {
            onConflict: "user_id,devotional_id,day_number",
          }
        );

      if (!error) {
        setProgress((prev) => {
          const next = new Map(prev);
          const existing = next.get(dayNumber) || { day_number: dayNumber, is_completed: false, reading_completed: false, reflection_text: null };
          next.set(dayNumber, { ...existing, reading_completed: true });
          return next;
        });
      }
    } catch (err) {
      console.error("Error updating reading status:", err);
    }
  };

  const handleReflectionSave = async (dayNumber: number, reflectionText: string) => {
    if (!userId || !reflectionText.trim()) return;

    try {
      const { error } = await supabase
        .from("devotional_progress")
        .upsert(
          {
            user_id: userId,
            devotional_id: devotionalId,
            day_number: dayNumber,
            reflection_text: reflectionText.trim(),
          },
          {
            onConflict: "user_id,devotional_id,day_number",
          }
        );

      if (!error) {
        setProgress((prev) => {
          const next = new Map(prev);
          const existing = next.get(dayNumber) || { day_number: dayNumber, is_completed: false, reading_completed: false, reflection_text: null };
          next.set(dayNumber, { ...existing, reflection_text: reflectionText.trim() });
          return next;
        });
      }
    } catch (err) {
      console.error("Error saving reflection:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-gray-500">Loading devotional...</div>
        </div>
      </div>
    );
  }

  if (!devotional) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-gray-500">Devotional not found.</div>
          <Link href="/devotionals" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Devotionals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* HEADER */}
        <Link href="/devotionals" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Devotionals
        </Link>

        <h1 className="text-3xl font-bold mb-2">{devotional.title}</h1>
        <p className="text-gray-600 mb-4">{devotional.subtitle}</p>

        {/* DEVOTIONAL COVER */}
        <div className="flex justify-center my-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <img
              src="/images/temptingofjesus.png"
              alt={`${devotional.title} cover`}
              className="rounded-lg w-[240px] h-auto object-contain"
            />
          </div>
        </div>

        {/* PROGRESS */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Day {currentDay} of {devotional.total_days}
            </span>
            <span className="text-sm text-gray-500">{completedDays} completed</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {devotional.description}
          </p>
        </div>

        {/* DAYS LIST */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Days</h2>
          <div className="space-y-2">
            {days.map((day) => {
              const dayProgress = progress.get(day.day_number);
              const isUnlocked = isDayUnlocked(day.day_number);
              const isCompleted = dayProgress?.is_completed === true;

              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  disabled={!isUnlocked}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                    isCompleted
                      ? "bg-green-50 border-green-300 hover:bg-green-100"
                      : isUnlocked
                      ? "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
                      : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">Day {day.day_number}</span>
                      <span className="text-gray-700">{day.day_title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isUnlocked && (
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      )}
                      {isCompleted && (
                        <span className="text-green-600 font-semibold">✓ Complete</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DAY MODAL */}
      {selectedDay && (
        <DevotionalDayModal
          day={selectedDay}
          dayProgress={progress.get(selectedDay.day_number)}
          onClose={() => setSelectedDay(null)}
          onBibleReadingClick={() => handleBibleReadingClick(selectedDay.bible_reading_book, selectedDay.bible_reading_chapter)}
          onReadingComplete={() => handleReadingComplete(selectedDay.day_number)}
          onReflectionSave={(text) => handleReflectionSave(selectedDay.day_number, text)}
          onDayComplete={(reflectionText, readingCompleted) => handleDayComplete(selectedDay.day_number, reflectionText, readingCompleted)}
        />
      )}

      {/* BIBLE READING MODAL (nested) */}
      {showBibleModal && (
        <BibleReadingModal
          book={bibleBook}
          chapter={bibleChapter}
          onClose={() => setShowBibleModal(false)}
        />
      )}

      {/* READING REQUIRED MODAL */}
      {showReadingRequiredModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4"
          onClick={() => setShowReadingRequiredModal(false)}
        >
          <div 
            className="relative w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowReadingRequiredModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl font-semibold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Bible Reading First</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              You must complete the assigned Bible reading before marking this day as complete.
            </p>
            
            <button
              type="button"
              onClick={() => setShowReadingRequiredModal(false)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

