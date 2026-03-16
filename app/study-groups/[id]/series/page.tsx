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
  reading: boolean;
  trivia: boolean;
  reflection: boolean;
  complete: boolean;
}

function isWeekUnlocked(startDate: string | null, weekNum: number): boolean {
  if (!startDate) return false;
  const d = new Date(startDate);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return new Date() >= d;
}

function getUnlockDate(startDate: string, weekNum: number): string {
  const d = new Date(startDate);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
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
  const [weeks, setWeeks] = useState<WeekCard[]>([]);
  const [groupName, setGroupName] = useState("Group");

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
        supabase.from("series_schedules").select("start_date").eq("series_id", sid).maybeSingle(),
        supabase.from("series_week_progress")
          .select("week_number, reading_completed, trivia_completed, reflection_posted")
          .eq("user_id", user.id).eq("series_id", sid),
      ]);

      const sd = scheduleRes.data?.start_date ?? null;
      setStartDate(sd);
      if (sd) setStartDateInput(sd);

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
        const unlocked = isLeader || isWeekUnlocked(sd, wn);
        const prog = progMap[wn] ?? { reading: false, trivia: false, reflection: false };
        return {
          weekNumber: wn,
          unlocked,
          unlockDate: sd ? getUnlockDate(sd, wn) : null,
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

  async function saveStartDate() {
    if (!startDateInput || !seriesId || !userId) return;
    setSavingDate(true);
    await supabase.from("series_schedules").upsert(
      { series_id: seriesId, group_id: groupId, start_date: startDateInput, created_by: userId },
      { onConflict: "series_id" }
    );
    setStartDate(startDateInput);
    // Recompute unlock states
    setWeeks((prev) =>
      prev.map((w) => ({
        ...w,
        unlocked: userRole === "leader" || isWeekUnlocked(startDateInput, w.weekNumber),
        unlockDate: getUnlockDate(startDateInput, w.weekNumber),
      }))
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
            <p className="text-sm text-amber-800 mb-3">Set the Week 1 start date. Each week unlocks 7 days later automatically.</p>
            <div className="flex gap-2">
              <input
                type="date"
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
            {startDate && <p className="text-xs text-amber-600 mt-2">Week 1 starts: {getUnlockDate(startDate, 1)}</p>}
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
                className={`bg-white border rounded-xl shadow-sm overflow-hidden ${w.complete ? "border-green-200" : "border-gray-200"}`}
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
                  {!w.unlocked && w.unlockDate && (
                    <p className="text-xs text-gray-400 mt-2">Unlocks {w.unlockDate}</p>
                  )}
                  {!w.unlocked && !w.unlockDate && (
                    <p className="text-xs text-gray-400 mt-2">Start date not set yet</p>
                  )}
                </div>

                {/* CTA */}
                {(w.unlocked && hasContent) && (
                  <div className="px-5 pb-4">
                    <Link href={`/study-groups/${groupId}/series/week/${w.weekNumber}`}>
                      <button
                        className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
                        style={{ backgroundColor: "#4a9b6f" }}
                      >
                        {w.complete ? "Review Week" : done > 0 ? "Continue" : "Start Week"}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
