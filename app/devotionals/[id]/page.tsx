"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import DevotionalDayModal from "../../../components/DevotionalDayModal";
import DevotionalDayCompletionModal from "../../../components/DevotionalDayCompletionModal";
import { ACTION_TYPE } from "../../../lib/actionTypes";

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
  const [showCreditBlocked, setShowCreditBlocked] = useState(false);
  const [showReadingRequiredModal, setShowReadingRequiredModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedDayNumber, setCompletedDayNumber] = useState<number | null>(null);

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

  const handleDayClick = async (day: DevotionalDay) => {
    if (!isDayUnlocked(day.day_number)) {
      return;
    }

    const dayProgress = progress.get(day.day_number);
    const isCompleted = dayProgress?.is_completed === true;

    if (isCompleted) {
      setShowCreditBlocked(false);
      setSelectedDay(day);
      return;
    }

    const creditResponse = await fetch("/api/consume-credit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actionType: ACTION_TYPE.devotional_day_viewed,
      }),
    });

    if (!creditResponse.ok) {
      setShowCreditBlocked(true);
      setSelectedDay(day);
      return;
    }

    const creditResult = (await creditResponse.json().catch(() => ({}))) as {
      ok?: boolean;
      reason?: string;
    };

    if (creditResult.ok === false) {
      setShowCreditBlocked(true);
      setSelectedDay(day);
      return;
    }

    setShowCreditBlocked(false);
    setSelectedDay(day);
  };

  const handleBibleReadingClick = (book: string, chapter: number) => {
    // Set session storage to indicate we're coming from a devotional
    // This allows the Bible chapter page to show the correct back link
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("bbFromReadingPlan", `devotional:${devotionalId}`);
    }
    // Open the full Bible chapter overlay route so users see the exact same
    // experience as in the main Bible section (mark chapter done, notes, links, etc.).
    router.push(`/Bible/${encodeURIComponent(book)}/${chapter}`);
  };

  const handleDayComplete = async (dayNumber: number, reflectionText: string, readingCompleted: boolean) => {
    if (!userId) return;

    // ENFORCE: Bible reading must be completed before day can be marked complete
    if (!readingCompleted) {
      setShowReadingRequiredModal(true);
      return; // Do not proceed with completion
    }

    try {

      // Check if day was already completed in database to prevent duplicate logging
      const { data: existingProgressData } = await supabase
        .from("devotional_progress")
        .select("is_completed")
        .eq("user_id", userId)
        .eq("devotional_id", devotionalId)
        .eq("day_number", dayNumber)
        .maybeSingle();
      
      const wasAlreadyCompleted = existingProgressData?.is_completed === true;

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

      // Close day modal
      setSelectedDay(null);

      // Show celebration modal if this was a NEW completion (not already completed)
      if (!wasAlreadyCompleted && devotional) {
        setCompletedDayNumber(dayNumber);
        setShowCompletionModal(true);
      }

      // ACTION TRACKING: Only log if this is a NEW completion (not already completed)
      // Do this asynchronously after UI updates (fire-and-forget)
      // This matches the pattern used in chapter completion
      if (!wasAlreadyCompleted) {
        (async () => {
          try {
            console.log(`[DEVOTIONAL_DAY_COMPLETE] Starting tracking for day ${dayNumber}, devotional ${devotionalId}, user ${userId}`);
            
            // Get username for master_actions
            const { data: { user: authUser } } = await supabase.auth.getUser();
            let actionUsername = "User";
            
            if (authUser) {
              const meta: any = authUser.user_metadata || {};
              actionUsername =
                meta.firstName ||
                meta.first_name ||
                (authUser.email ? authUser.email.split("@")[0] : null) ||
                "User";
            }

            // Format action_label: "Devotional Title - Day X"
            const actionLabel = devotional ? `${devotional.title} - Day ${dayNumber}` : `Day ${dayNumber}`;

            // STEP 1: Insert into master_actions
            console.log("[MASTER_ACTIONS] inserting:", { 
              action_type: ACTION_TYPE.devotional_day_completed, 
              action_label: actionLabel,
              user_id: userId,
              username: actionUsername 
            });
            
            const { error: actionError, data: actionData } = await supabase
              .from("master_actions")
              .insert({
                user_id: userId,
                username: actionUsername ?? null,
                action_type: ACTION_TYPE.devotional_day_completed,
                action_label: actionLabel,
              })
              .select();

            if (actionError) {
              console.error("[MASTER_ACTIONS] Error logging devotional_day_completed action:", actionError);
              console.error("[MASTER_ACTIONS] Full error details:", JSON.stringify(actionError, null, 2));
            } else {
              console.log("[MASTER_ACTIONS] Successfully inserted devotional_day_completed action:", actionData);
            }

            // STEP 2: UPDATE profile_stats: Count from devotional_progress table
            let statsUsername = actionUsername;
            if (!statsUsername && userId) {
              const { data: { user } } = await supabase.auth.getUser();
              if (user) {
                const meta: any = user.user_metadata || {};
                statsUsername =
                  meta.firstName ||
                  meta.first_name ||
                  (user.email ? user.email.split("@")[0] : null) ||
                  "User";
              }
            }

            // Count all completed devotional days for this user
            console.log("[PROFILE_STATS] Counting completed devotional days for user:", userId);
            const { count, error: countError } = await supabase
              .from("devotional_progress")
              .select("*", { count: "exact", head: true })
              .eq("user_id", userId)
              .eq("is_completed", true);

            if (countError) {
              console.error("[PROFILE_STATS] Error counting devotional days:", countError);
              console.error("[PROFILE_STATS] Full error details:", JSON.stringify(countError, null, 2));
            } else {
              console.log("[PROFILE_STATS] Found", count, "completed devotional days");

              // Fetch other counts from profile_stats
              // Note: If column doesn't exist, this select will still work (returns null for missing column)
              const { data: currentStats, error: fetchStatsError } = await supabase
                .from("profile_stats")
                .select("username, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count, keywords_mastered_count, devotional_days_completed_count")
                .eq("user_id", userId)
                .maybeSingle();

              if (fetchStatsError) {
                console.error("[PROFILE_STATS] Error fetching current stats:", fetchStatsError);
                console.error("[PROFILE_STATS] Full error details:", JSON.stringify(fetchStatsError, null, 2));
                
                // If column doesn't exist, the select might fail - but we'll try the upsert anyway
                if (fetchStatsError.message?.includes("devotional_days_completed_count") || 
                    fetchStatsError.code === "42703") {
                  console.error("[PROFILE_STATS] ⚠️ CRITICAL: Column 'devotional_days_completed_count' does not exist!");
                  console.error("[PROFILE_STATS] ⚠️ Please run ADD_DEVOTIONAL_DAYS_COMPLETED_COLUMN.sql in Supabase SQL Editor");
                }
                return; // Don't proceed with update if fetch failed
              }

              console.log("[PROFILE_STATS] Current stats:", currentStats);

              const finalUsername = currentStats?.username || statsUsername || "User";
              
              // Calculate total_actions as sum of all counts including devotional_days_completed_count
              const totalActions = 
                (currentStats?.chapters_completed_count || 0) +
                (currentStats?.notes_created_count || 0) +
                (currentStats?.people_learned_count || 0) +
                (currentStats?.places_discovered_count || 0) +
                (currentStats?.keywords_mastered_count || 0) +
                (count || 0); // devotional_days_completed_count

              console.log("[PROFILE_STATS] Updating profile_stats with:", {
                user_id: userId,
                devotional_days_completed_count: count || 0,
                total_actions: totalActions,
                username: finalUsername
              });

              const { error: updateError, data: updateData } = await supabase
                .from("profile_stats")
                .upsert(
                  {
                    user_id: userId,
                    devotional_days_completed_count: count || 0,
                    total_actions: totalActions,
                    username: finalUsername,
                    updated_at: new Date().toISOString(),
                  },
                  {
                    onConflict: "user_id",
                  }
                )
                .select();

              if (updateError) {
                console.error("[PROFILE_STATS] Error updating profile_stats:", updateError);
                console.error("[PROFILE_STATS] Error code:", updateError.code);
                console.error("[PROFILE_STATS] Error message:", updateError.message);
                console.error("[PROFILE_STATS] Full error details:", JSON.stringify(updateError, null, 2));
                
                // Check if error is due to missing column
                if (updateError.message?.includes("devotional_days_completed_count") || 
                    updateError.code === "42703" ||
                    updateError.hint?.includes("devotional_days_completed_count")) {
                  console.error("[PROFILE_STATS] ⚠️ CRITICAL: Column 'devotional_days_completed_count' does not exist in database!");
                  console.error("[PROFILE_STATS] ⚠️ ACTION REQUIRED: Run ADD_DEVOTIONAL_DAYS_COMPLETED_COLUMN.sql in Supabase SQL Editor");
                  console.error("[PROFILE_STATS] ⚠️ This is preventing profile stats from updating!");
                }
              } else {
                console.log("[PROFILE_STATS] ✅ Successfully updated profile_stats:", updateData);
              }
            }
          } catch (err) {
            console.error("[DEVOTIONAL_DAY_TRACKING] Unexpected error in devotional day tracking:", err);
            console.error("[DEVOTIONAL_DAY_TRACKING] Full error details:", JSON.stringify(err, null, 2));
          }
        })();
      } else {
        console.log(`[DEVOTIONAL_DAY_COMPLETE] Day ${dayNumber} was already completed, skipping duplicate tracking`);
      }
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
        {devotional.title.includes("Tempting of Jesus") && (
          <div className="flex justify-center my-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <img
                src="/images/temptingofjesus.png"
                alt={`${devotional.title} cover`}
                className="rounded-lg w-[240px] h-auto object-contain"
              />
            </div>
          </div>
        )}

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
          showCreditBlocked={showCreditBlocked}
          onClose={() => setSelectedDay(null)}
          onBibleReadingClick={() => handleBibleReadingClick(selectedDay.bible_reading_book, selectedDay.bible_reading_chapter)}
          onReadingComplete={() => handleReadingComplete(selectedDay.day_number)}
          onReflectionSave={(text) => handleReflectionSave(selectedDay.day_number, text)}
          onDayComplete={(reflectionText, readingCompleted) => handleDayComplete(selectedDay.day_number, reflectionText, readingCompleted)}
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

      {/* DEVOTIONAL DAY COMPLETION CELEBRATION MODAL */}
      {showCompletionModal && completedDayNumber && devotional && (
        <DevotionalDayCompletionModal
          dayNumber={completedDayNumber}
          devotionalTitle={devotional.title}
          onClose={() => {
            setShowCompletionModal(false);
            setCompletedDayNumber(null);
          }}
        />
      )}
    </div>
  );
}

