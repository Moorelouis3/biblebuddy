/**
 * Calculate reading streak from completed_chapters data
 * 
 * Streak = consecutive days (starting from today, walking backward)
 * where at least one chapter was completed
 */

export interface StreakData {
  currentStreak: number;
  last7Days: Array<{ date: string; completed: boolean }>;
}

/**
 * Calculate streak from completed chapter timestamps
 */
export async function calculateStreak(userId: string): Promise<StreakData> {
  try {
    const { supabase } = await import("./supabaseClient");
    
    // Fetch all completed chapters with timestamps
    const { data, error } = await supabase
      .from("completed_chapters")
      .select("created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[STREAK] Error fetching completed chapters:", error);
      return { currentStreak: 0, last7Days: [] };
    }

    if (!data || data.length === 0) {
      return { currentStreak: 0, last7Days: generateLast7Days(false) };
    }

    // Convert timestamps to dates (YYYY-MM-DD) and deduplicate
    const completedDates = new Set<string>();
    data.forEach((row) => {
      if (row.created_at) {
        const date = new Date(row.created_at);
        const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD
        completedDates.add(dateStr);
      }
    });

    // Sort dates (newest first for easier processing)
    const sortedDates = Array.from(completedDates).sort((a, b) => b.localeCompare(a));

    // Calculate current streak (walk backward from today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().slice(0, 10);

    let currentStreak = 0;
    let checkDate = new Date(today);
    let checkDateStr = todayStr;

    // Walk backward day by day (starting from today)
    while (true) {
      if (completedDates.has(checkDateStr)) {
        currentStreak++;
        // Move to previous day
        checkDate.setDate(checkDate.getDate() - 1);
        checkDateStr = checkDate.toISOString().slice(0, 10);
      } else {
        // No completion on this day - streak breaks
        break;
      }
    }

    // Generate last 7 days view
    const last7Days = generateLast7Days(false);
    
    // Mark completed days in the last 7 days
    last7Days.forEach((day) => {
      if (completedDates.has(day.date)) {
        day.completed = true;
      }
    });

    return {
      currentStreak,
      last7Days: last7Days.reverse(), // Show oldest to newest (left to right)
    };
  } catch (err) {
    console.error("[STREAK] Error calculating streak:", err);
    return { currentStreak: 0, last7Days: generateLast7Days(false) };
  }
}

/**
 * Generate array of last 7 days (including today)
 */
function generateLast7Days(completed: boolean): Array<{ date: string; completed: boolean }> {
  const days: Array<{ date: string; completed: boolean }> = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const dateStr = date.toISOString().slice(0, 10);
    days.push({ date: dateStr, completed });
  }
  
  return days;
}

/**
 * Get day of week abbreviation (S, M, T, W, T, F, S)
 */
export function getDayAbbr(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const day = date.getDay();
  const abbrs = ["S", "M", "T", "W", "T", "F", "S"];
  return abbrs[day];
}

