"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { TOTAL_WEEKS, getSeriesWeekLesson } from "@/lib/seriesContent";

interface WeekCard {
  weekNumber: number;
  unlocked: boolean;
  unlockDate: string | null;
  lockedMessage: string | null;
  reading: boolean;
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
  const [weeks, setWeeks] = useState<WeekCard[]>([]);
  const [groupName, setGroupName] = useState("Group");
  const [nowTs, setNowTs] = useState(() => Date.now());

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

      const [scheduleRes, progressRes] = await Promise.all([
        supabase.from("series_schedules").select("start_date, start_at").eq("series_id", sid).maybeSingle(),
        supabase.from("series_week_progress")
          .select("week_number, reading_completed, trivia_completed, reflection_posted")
          .eq("user_id", user.id).eq("series_id", sid),
      ]);

      const sd = resolveSeriesStart(scheduleRes.data);
      setStartDate(sd);
      if (sd) setStartDateInput(toDateTimeLocalValue(sd));
      setEditingStartDate(!sd);

      const progMap: Record<number, { reading: boolean; trivia: boolean; reflection: boolean }> = {};
      (progressRes.data || []).forEach((p) => {
        progMap[p.week_number] = {
          reading: p.reading_completed,
          trivia: p.trivia_completed,
          reflection: p.reflection_posted,
        };
      });

      const isLeader = memberRes.data?.role === "leader";
      const cards: WeekCard[] = Array.from({ length: TOTAL_WEEKS }, (_, i) => {
        const wn = i + 1;
        const prog = progMap[wn] ?? { reading: false, trivia: false, reflection: false };
        const previousWeekComplete = wn === 1
          ? true
          : !!(progMap[wn - 1]?.reading && progMap[wn - 1]?.trivia && progMap[wn - 1]?.reflection);
        const lockState = getWeekLockState(sd, wn, isLeader, previousWeekComplete);
        return {
          weekNumber: wn,
          unlocked: lockState.unlocked,
          unlockDate: lockState.unlockDate,
          lockedMessage: lockState.lockedMessage,
          reading: prog.reading,
          trivia: prog.trivia,
          reflection: prog.reflection,
          complete: prog.reading && prog.trivia && prog.reflection,
        };
      });
      setWeeks(cards);
      setLoading(false);
    }
    init();
  }, [groupId, router]);

  useEffect(() => {
    const id = window.setInterval(() => setNowTs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  async function saveStartDate() {
    if (!startDateInput || !seriesId || !userId) return;
    setSavingDate(true);
    const startAtIso = new Date(startDateInput).toISOString();
    await supabase.from("series_schedules").upsert(
      { series_id: seriesId, group_id: groupId, start_date: startDateInput.slice(0, 10), start_at: startAtIso, created_by: userId },
      { onConflict: "series_id" }
    );
    setStartDate(startAtIso);
    setEditingStartDate(false);
    // Recompute unlock states
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

  if (loading) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
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

        {/* Leader schedule panel */}
        {userRole === "leader" && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">📅 Series Schedule</p>
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
                  Series starts in {formatCountdown(getUnlockTimestamp(startDate, 1), nowTs)}
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

        {/* Week cards */}
        <div className="flex flex-col gap-4">
          {weeks.map((w) => {
            const lesson = getSeriesWeekLesson(w.weekNumber);
            const done = [w.reading, w.trivia, w.reflection].filter(Boolean).length;
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
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">In Progress · {done}/3</span>
                        )
                      ) : !w.unlocked ? (
                        <span className="text-xs text-gray-400">🔒 Locked</span>
                      ) : null}
                    </div>
                  </div>

                  {/* Progress pills */}
                  {w.unlocked && hasContent && (
                    <div className="flex gap-2 mt-3">
                      {[
                        { label: "Reading", done: w.reading },
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

                  {/* Unlock date for locked weeks */}
                  {!w.unlocked && w.lockedMessage && (
                    <p className="text-xs text-gray-400 mt-2">{w.lockedMessage}</p>
                  )}
                </div>

                {/* CTA */}
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
                        : `🔒 Week ${w.weekNumber} Locked`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
