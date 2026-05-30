"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { getSeriesTotalWeeks, getSeriesWeekLesson } from "@/lib/seriesContent";
import { countCompletedSeriesWeekSections, isSeriesWeekComplete, SERIES_WEEK_TOTAL_SECTIONS, toSeriesWeekProgressState } from "@/lib/seriesWeekProgress";
import { isSeriesWeekNotesActionEvent, parseSeriesWeekNotesWeekNumber } from "@/lib/seriesWeekNotesTracking";

interface AnalyticsUser {
  user_id: string;
  username: string;
  avatar_url?: string | null;
}

interface TriviaScore extends AnalyticsUser {
  score: number;
  total: number;
}

interface WeekAnalytics {
  starters: number;
  readers: AnalyticsUser[];
  triviaScores: TriviaScore[];
  reflectors: AnalyticsUser[];
}

interface WeekCard {
  weekNumber: number;
  unlocked: boolean;
  unlockDate: string | null;
  lockedMessage: string | null;
  reading: boolean;
  notes: boolean;
  trivia: boolean;
  reflection: boolean;
  complete: boolean;
}

function getUnlockDate(startDate: string, weekNum: number): string {
  const d = new Date(startDate);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function getUnlockTimestamp(startDate: string, weekNum: number): number {
  const d = new Date(startDate);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return d.getTime();
}

function formatCountdown(targetTs: number, nowTs: number): string {
  const diff = Math.max(0, targetTs - nowTs);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

function resolveSeriesStart(schedule: { start_at?: string | null; start_date?: string | null } | null | undefined): string | null {
  if (!schedule) return null;
  if (schedule.start_at) return schedule.start_at;
  if (schedule.start_date) return `${schedule.start_date}T00:00:00`;
  return null;
}

function formatDateTimeLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function toDateTimeLocalValue(dateStr: string): string {
  const date = new Date(dateStr);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function getWeekLockState(
  startDate: string | null,
  weekNum: number,
  isLeader: boolean,
  previousWeekComplete: boolean
): { unlocked: boolean; unlockDate: string | null; lockedMessage: string | null } {
  if (isLeader) {
    return {
      unlocked: true,
      unlockDate: startDate ? getUnlockDate(startDate, weekNum) : null,
      lockedMessage: null,
    };
  }

  if (!startDate) {
    return { unlocked: false, unlockDate: null, lockedMessage: "Start date not set yet" };
  }

  const unlockDate = getUnlockDate(startDate, weekNum);
  const unlockAt = new Date(startDate);
  unlockAt.setDate(unlockAt.getDate() + (weekNum - 1) * 7);

  if (new Date() < unlockAt) {
    return { unlocked: false, unlockDate, lockedMessage: `Unlocks ${unlockDate}` };
  }

  if (weekNum > 1 && !previousWeekComplete) {
    return { unlocked: false, unlockDate, lockedMessage: `Finish Week ${weekNum - 1} first` };
  }

  return { unlocked: true, unlockDate, lockedMessage: null };
}

export default function SeriesOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState("member");
  const [seriesId, setSeriesId] = useState<string | null>(null);
  const [seriesTitle, setSeriesTitle] = useState("The Temptation of Jesus");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [startDateInput, setStartDateInput] = useState("");
  const [savingDate, setSavingDate] = useState(false);
  const [editingStartDate, setEditingStartDate] = useState(false);
  const [showLeaderControls, setShowLeaderControls] = useState(false);
  const [weeks, setWeeks] = useState<WeekCard[]>([]);
  const [groupName, setGroupName] = useState("Group");
  const [nowTs, setNowTs] = useState(() => Date.now());
  const [weekAnalytics, setWeekAnalytics] = useState<Map<number, WeekAnalytics>>(new Map());
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsPopupUser, setAnalyticsPopupUser] = useState<AnalyticsUser | null>(null);
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const [memberRes, groupRes, seriesRes] = await Promise.all([
        supabase.from("group_members").select("role").eq("group_id", groupId).eq("user_id", user.id).maybeSingle(),
        supabase.from("study_groups").select("name").eq("id", groupId).maybeSingle(),
        supabase.from("group_series").select("id, title").eq("group_id", groupId).eq("is_current", true).maybeSingle(),
      ]);

      setUserRole(memberRes.data?.role ?? "member");
      if (groupRes.data?.name) setGroupName(groupRes.data.name);
      if (!seriesRes.data) { setLoading(false); return; }
      setSeriesId(seriesRes.data.id);
      if (seriesRes.data.title) setSeriesTitle(seriesRes.data.title);

      const sid = seriesRes.data.id;

      const [scheduleRes, progressRes, triviaRes, notesActionsRes] = await Promise.all([
        supabase.from("series_schedules").select("start_date, start_at").eq("series_id", sid).maybeSingle(),
        supabase.from("series_week_progress")
          .select("week_number, reading_completed, notes_completed, trivia_completed, reflection_posted")
          .eq("user_id", user.id).eq("series_id", sid),
        supabase.from("series_trivia_scores")
          .select("week_number, score")
          .eq("user_id", user.id).eq("series_id", sid),
        supabase.from("master_actions")
          .select("action_type, action_label")
          .eq("user_id", user.id)
          .in("action_type", [ACTION_TYPE.series_week_notes_opened, ACTION_TYPE.study_group_article_opened]),
      ]);

      const sd = resolveSeriesStart(scheduleRes.data);
      setStartDate(sd);
      if (sd) setStartDateInput(toDateTimeLocalValue(sd));
      setEditingStartDate(!sd);

      const progMap: Record<number, { reading: boolean; notes: boolean; trivia: boolean; reflection: boolean }> = {};
      (progressRes.data || []).forEach((p) => {
        progMap[p.week_number] = toSeriesWeekProgressState(p);
      });

      const triviaRepairWeeks = new Set<number>();
      const notesRepairWeeks = new Set<number>();
      (triviaRes.data || []).forEach((row) => {
        const existing = progMap[row.week_number] ?? toSeriesWeekProgressState();
        if (!existing.trivia) {
          triviaRepairWeeks.add(row.week_number);
        }
        progMap[row.week_number] = {
          ...existing,
          trivia: true,
        };
      });

      (notesActionsRes.data || []).forEach((row) => {
        if (!isSeriesWeekNotesActionEvent(row.action_type, row.action_label)) return;
        const weekNumber = parseSeriesWeekNotesWeekNumber(row.action_label, seriesRes.data?.title);
        if (!weekNumber) return;
        const existing = progMap[weekNumber] ?? toSeriesWeekProgressState();
        if (!existing.notes) {
          notesRepairWeeks.add(weekNumber);
        }
        progMap[weekNumber] = {
          ...existing,
          notes: true,
        };
      });

      const repairWeeks = new Set<number>([...triviaRepairWeeks, ...notesRepairWeeks]);
      if (repairWeeks.size > 0) {
        const repairRows = Array.from(repairWeeks).map((week_number) => ({
          user_id: user.id,
          series_id: sid,
          week_number,
          ...(triviaRepairWeeks.has(week_number) ? { trivia_completed: true } : {}),
          ...(notesRepairWeeks.has(week_number) ? { notes_completed: true } : {}),
        }));

        const { error: repairError } = await supabase
          .from("series_week_progress")
          .upsert(repairRows, { onConflict: "user_id,series_id,week_number" });

        if (repairError) {
          console.error("[SERIES_OVERVIEW] Failed to repair week completion flags", repairError);
        }
      }

      const isLeader = memberRes.data?.role === "leader";
      const totalWeeks = getSeriesTotalWeeks(seriesRes.data.title);
      const cards: WeekCard[] = Array.from({ length: totalWeeks }, (_, i) => {
        const wn = i + 1;
        const prog = progMap[wn] ?? toSeriesWeekProgressState();
        const previousWeekComplete = wn === 1
          ? true
          : isSeriesWeekComplete(progMap[wn - 1] ?? toSeriesWeekProgressState());
        const lockState = getWeekLockState(sd, wn, isLeader, previousWeekComplete);
        return {
          weekNumber: wn,
          unlocked: lockState.unlocked,
          unlockDate: lockState.unlockDate,
          lockedMessage: lockState.lockedMessage,
          reading: prog.reading,
          notes: prog.notes,
          trivia: prog.trivia,
          reflection: prog.reflection,
          complete: isSeriesWeekComplete(prog),
        };
      });
      setWeeks(cards);
      setLoading(false);
    }
    void init();
  }, [groupId, router]);

  useEffect(() => {
    const id = window.setInterval(() => setNowTs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  async function saveStartDate() {
    if (!startDateInput || !seriesId || !userId) return;
    setSavingDate(true);
    const startAtIso = new Date(startDateInput).toISOString();
    const scheduleResult = await supabase.from("series_schedules").upsert(
      { series_id: seriesId, group_id: groupId, start_date: startDateInput.slice(0, 10), start_at: startAtIso, created_by: userId },
      { onConflict: "series_id" }
    );
    if (scheduleResult.error) {
      setSavingDate(false);
      return;
    }

    const clearCurrentResult = await supabase
      .from("group_series")
      .update({ is_current: false })
      .eq("group_id", groupId);

    if (clearCurrentResult.error) {
      setSavingDate(false);
      return;
    }

    const setCurrentResult = await supabase
      .from("group_series")
      .update({ is_current: true, current_week: 1 })
      .eq("id", seriesId);

    if (setCurrentResult.error) {
      setSavingDate(false);
      return;
    }

    setStartDate(startAtIso);
    setEditingStartDate(false);
    setWeeks((prev) =>
      prev.map((w, index) => {
        const previousWeek = prev[index - 1];
        const lockState = getWeekLockState(
          startAtIso,
          w.weekNumber,
          userRole === "leader",
          w.weekNumber === 1 ? true : !!previousWeek?.complete
        );
        return {
          ...w,
          unlocked: lockState.unlocked,
          unlockDate: lockState.unlockDate,
          lockedMessage: lockState.lockedMessage,
        };
      })
    );
    setSavingDate(false);
  }

  async function loadSeriesAnalytics() {
    if (!seriesId) return;
    setLoadingAnalytics(true);

    const [progressRes, triviaRes, reflectionsRes] = await Promise.all([
      supabase
        .from("series_week_progress")
        .select("user_id, week_number, reading_completed, notes_completed, trivia_completed, reflection_posted")
        .eq("series_id", seriesId),
      supabase
        .from("series_trivia_scores")
        .select("user_id, week_number, score, total_questions")
        .eq("series_id", seriesId),
      supabase
        .from("series_reflections")
        .select("user_id, week_number, display_name, profile_image_url")
        .eq("series_id", seriesId),
    ]);

    const progressRows = progressRes.data || [];
    const triviaRows = triviaRes.data || [];
    const reflectionRows = reflectionsRes.data || [];

    // Collect all unique user IDs
    const allUserIds = [
      ...new Set([
        ...progressRows.map((r) => r.user_id),
        ...triviaRows.map((r) => r.user_id),
        ...reflectionRows.map((r) => r.user_id),
      ].filter(Boolean)),
    ];

    // Fetch profile stats for usernames + avatars
    const profileMap = new Map<string, { username: string; avatar_url?: string | null }>();
    if (allUserIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profile_stats")
        .select("user_id, username, avatar_url")
        .in("user_id", allUserIds);
      (profiles || []).forEach((p) => {
        if (p.user_id) profileMap.set(p.user_id, { username: p.username ?? "Unknown", avatar_url: p.avatar_url });
      });
    }

    function resolveUser(userId: string, displayName?: string | null, profileImage?: string | null): AnalyticsUser {
      const prof = profileMap.get(userId);
      return {
        user_id: userId,
        username: displayName ?? prof?.username ?? "Unknown",
        avatar_url: profileImage ?? prof?.avatar_url ?? null,
      };
    }

    const analyticsMap = new Map<number, WeekAnalytics>();
    const maxWeek = getSeriesTotalWeeks(seriesTitle);

    for (let wn = 1; wn <= maxWeek; wn++) {
      const weekProgress = progressRows.filter((r) => r.week_number === wn);
      const weekTrivia = triviaRows.filter((r) => r.week_number === wn);
      const weekReflections = reflectionRows.filter((r) => r.week_number === wn);

      const starters = weekProgress.length;
      const readers = weekProgress
        .filter((r) => r.reading_completed)
        .map((r) => resolveUser(r.user_id));
      const triviaScores: TriviaScore[] = weekTrivia.map((r) => ({
        ...resolveUser(r.user_id),
        score: r.score,
        total: r.total_questions,
      }));
      const reflectors = weekReflections.map((r) =>
        resolveUser(r.user_id, r.display_name, r.profile_image_url)
      );

      analyticsMap.set(wn, { starters, readers, triviaScores, reflectors });
    }

    setWeekAnalytics(analyticsMap);
    setLoadingAnalytics(false);
    setAnalyticsLoaded(true);
  }

  if (loading) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
          <span className="mx-2">›</span>
          <Link href={`/study-groups/${groupId}/chat`} className="hover:text-gray-700 transition">{groupName}</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">{seriesTitle}</span>
        </nav>

        <div className="mb-6">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">Bible Study Series</p>
          <h1 className="text-2xl font-bold text-gray-900">{seriesTitle}</h1>
          <p className="text-sm text-gray-500 mt-1">5-week series · New lesson every week</p>
        </div>

        <div className="flex flex-col gap-4">
          {weeks.map((w) => {
            const lesson = getSeriesWeekLesson(w.weekNumber, seriesTitle);
            const done = countCompletedSeriesWeekSections({
              reading: w.reading,
              notes: w.notes,
              trivia: w.trivia,
              reflection: w.reflection,
            });
            const hasContent = !!lesson;

            return (
              <div
                key={w.weekNumber}
                className={`border rounded-xl shadow-sm overflow-hidden transition-all ${
                  w.complete ? "border-green-200 bg-white" : w.unlocked ? "border-gray-200 bg-white" : "border-gray-200 bg-gray-50 opacity-55"
                }`}
              >
                <div className={`px-5 py-4 ${w.complete ? "bg-green-50" : ""}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-medium mb-1">Week {w.weekNumber}</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {lesson ? lesson.title : "Coming Soon"}
                      </p>
                      {lesson && <p className="text-xs text-gray-400 mt-0.5">{lesson.subtitle} · {lesson.readingReference}</p>}
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-1">
                      {w.complete ? (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">✓ Complete</span>
                      ) : w.unlocked && hasContent ? (
                        done === 0 ? (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">Not Started</span>
                        ) : (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">In Progress · {done}/{SERIES_WEEK_TOTAL_SECTIONS}</span>
                        )
                      ) : !w.unlocked ? (
                        <span className="text-xs text-gray-400">Locked</span>
                      ) : null}
                    </div>
                  </div>

                  {w.unlocked && hasContent && (
                    <div className="flex gap-2 mt-3">
                      {[
                        { label: "Reading", done: w.reading },
                        { label: "Read Notes", done: w.notes },
                        { label: "Trivia", done: w.trivia },
                        { label: "Reflection", done: w.reflection },
                      ].map((s) => (
                        <span
                          key={s.label}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}
                        >
                          {s.done ? "✓ " : ""}{s.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {!w.unlocked && w.lockedMessage && (
                    <p className="text-xs text-gray-400 mt-2">{w.lockedMessage}</p>
                  )}
                </div>

                <div className="px-5 pb-4">
                  {w.unlocked && hasContent ? (
                    <Link href={`/study-groups/${groupId}/series/week/${w.weekNumber}`}>
                      <button
                        className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
                        style={{ backgroundColor: "#4a9b6f" }}
                      >
                        {w.complete ? "Review Week" : done > 0 ? "Continue" : "Start Week"}
                      </button>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-400 cursor-not-allowed"
                    >
                      {w.weekNumber === 1 && startDate
                        ? `Starting Soon · ${formatCountdown(getUnlockTimestamp(startDate, 1), nowTs)}`
                        : `Week ${w.weekNumber} Locked`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {analyticsPopupUser && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={() => setAnalyticsPopupUser(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl p-6 max-w-xs w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {analyticsPopupUser.avatar_url ? (
                <img
                  src={analyticsPopupUser.avatar_url}
                  alt={analyticsPopupUser.username}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-gray-500">
                  {analyticsPopupUser.username.charAt(0).toUpperCase()}
                </div>
              )}
              <p className="text-lg font-bold text-gray-900">{analyticsPopupUser.username}</p>
              <button
                onClick={() => setAnalyticsPopupUser(null)}
                className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {userRole === "leader" && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setShowLeaderControls((prev) => !prev)}
              className="w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left transition hover:bg-amber-100"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Series Controls</p>
                  <p className="text-sm text-amber-900 mt-1">Manage the Week 1 release time for this study.</p>
                </div>
                <span className="text-amber-700 text-lg font-bold">{showLeaderControls ? "-" : "+"}</span>
              </div>
            </button>

            {showLeaderControls && (
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Series Schedule</p>
                <p className="text-sm text-amber-800 mb-3">Set the Week 1 start date and time. Each week unlocks 7 days later automatically.</p>
                {!startDate || editingStartDate ? (
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <input
                      type="datetime-local"
                      value={startDateInput}
                      onChange={(e) => setStartDateInput(e.target.value)}
                      className="flex-1 text-sm px-3 py-2 border border-amber-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <button
                      onClick={saveStartDate}
                      disabled={savingDate || !startDateInput}
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 transition"
                    >
                      {savingDate ? "Saving..." : "Save"}
                    </button>
                  </div>
                ) : (
                  <div className="rounded-xl border border-amber-200 bg-white px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">
                      Study starts in {formatCountdown(getUnlockTimestamp(startDate, 1), nowTs)}
                    </p>
                    <p className="text-xs text-amber-700 mt-1">{formatDateTimeLabel(startDate)}</p>
                    <button
                      onClick={() => setEditingStartDate(true)}
                      className="mt-3 text-xs font-semibold text-amber-700 hover:text-amber-900 transition"
                    >
                      Change start time
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {userRole === "leader" && (
          <div className="mt-5">
            <button
              type="button"
              onClick={async () => {
                const next = !showAnalytics;
                setShowAnalytics(next);
                if (next && !analyticsLoaded) await loadSeriesAnalytics();
              }}
              className="w-full rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-left transition hover:bg-indigo-100"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Series Analytics</p>
                  <p className="text-sm text-indigo-900 mt-1">See who&apos;s engaging with each week.</p>
                </div>
                <span className="text-indigo-700 text-lg font-bold">{showAnalytics ? "−" : "+"}</span>
              </div>
            </button>

            {showAnalytics && (
              <div className="mt-3 space-y-3">
                {loadingAnalytics ? (
                  <div className="text-center text-sm text-gray-400 py-6">Loading analytics...</div>
                ) : (
                  Array.from({ length: getSeriesTotalWeeks(seriesTitle) }, (_, i) => i + 1).map((wn) => {
                    const lesson = getSeriesWeekLesson(wn, seriesTitle);
                    const data = weekAnalytics.get(wn);
                    if (!data) return null;
                    const hasAny = data.starters > 0 || data.readers.length > 0 || data.triviaScores.length > 0 || data.reflectors.length > 0;
                    return (
                      <div key={wn} className="border border-indigo-100 rounded-xl bg-white overflow-hidden">
                        <div className="bg-indigo-50 px-4 py-3 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Week {wn}</p>
                            {lesson && <p className="text-sm font-semibold text-gray-800 mt-0.5">{lesson.title}</p>}
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                            {data.starters} started
                          </span>
                        </div>

                        {!hasAny ? (
                          <p className="text-xs text-gray-400 px-4 py-3">No activity yet.</p>
                        ) : (
                          <div className="px-4 py-3 space-y-4">
                            {/* Readers */}
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                Read the Reading ({data.readers.length})
                              </p>
                              {data.readers.length === 0 ? (
                                <p className="text-xs text-gray-400">No one yet.</p>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {data.readers.map((u) => (
                                    <button
                                      key={u.user_id}
                                      onClick={() => setAnalyticsPopupUser(u)}
                                      className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1 hover:bg-indigo-50 hover:border-indigo-200 transition"
                                    >
                                      {u.avatar_url ? (
                                        <img src={u.avatar_url} alt={u.username} className="w-5 h-5 rounded-full object-cover" />
                                      ) : (
                                        <div className="w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">
                                          {u.username.charAt(0).toUpperCase()}
                                        </div>
                                      )}
                                      <span className="text-xs font-medium text-gray-700">{u.username}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Trivia */}
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                Took the Quiz ({data.triviaScores.length})
                              </p>
                              {data.triviaScores.length === 0 ? (
                                <p className="text-xs text-gray-400">No one yet.</p>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {data.triviaScores.map((u) => (
                                    <button
                                      key={u.user_id}
                                      onClick={() => setAnalyticsPopupUser(u)}
                                      className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1 hover:bg-indigo-50 hover:border-indigo-200 transition"
                                    >
                                      {u.avatar_url ? (
                                        <img src={u.avatar_url} alt={u.username} className="w-5 h-5 rounded-full object-cover" />
                                      ) : (
                                        <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold text-purple-700">
                                          {u.username.charAt(0).toUpperCase()}
                                        </div>
                                      )}
                                      <span className="text-xs font-medium text-gray-700">{u.username}</span>
                                      <span className="text-xs font-bold text-green-600 ml-0.5">{u.score}/{u.total}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Reflections */}
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                Posted a Reflection ({data.reflectors.length})
                              </p>
                              {data.reflectors.length === 0 ? (
                                <p className="text-xs text-gray-400">No one yet.</p>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {data.reflectors.map((u) => (
                                    <button
                                      key={u.user_id}
                                      onClick={() => setAnalyticsPopupUser(u)}
                                      className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1 hover:bg-indigo-50 hover:border-indigo-200 transition"
                                    >
                                      {u.avatar_url ? (
                                        <img src={u.avatar_url} alt={u.username} className="w-5 h-5 rounded-full object-cover" />
                                      ) : (
                                        <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center text-xs font-bold text-green-700">
                                          {u.username.charAt(0).toUpperCase()}
                                        </div>
                                      )}
                                      <span className="text-xs font-medium text-gray-700">{u.username}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
                <button
                  onClick={() => { setAnalyticsLoaded(false); loadSeriesAnalytics(); }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 transition font-semibold"
                >
                  ↻ Refresh
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
