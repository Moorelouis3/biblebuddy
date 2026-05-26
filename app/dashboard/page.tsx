"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BibleYearLessonAudioPlayer from "../../components/BibleYearLessonAudioPlayer";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES, type GenesisBibleYearDay } from "../../lib/bibleInOneYearPlan";
import { getBibleYearDayContent } from "../../lib/bibleYearDaysContent";
import { supabase } from "../../lib/supabaseClient";

type BibleYearTaskKey = "reading" | "trivia" | "reflection";
type DayProgress = Partial<Record<BibleYearTaskKey, boolean>>;
type ProgressByDay = Record<number, DayProgress>;

const TASKS: Array<{ key: BibleYearTaskKey; label: string; detail: string }> = [
  { key: "reading", label: "Reading + Teaching", detail: "Read the chapters and listen or watch the day lesson." },
  { key: "trivia", label: "Review", detail: "Check what stuck from today's Scripture." },
  { key: "reflection", label: "Reflection", detail: "Answer the day question and close the loop." },
];

const LOCAL_PROGRESS_KEY = "bb:bible-year-dashboard-progress";

function emptyProgress(): ProgressByDay {
  return {};
}

function isDayDone(progress: DayProgress | undefined) {
  return Boolean(progress?.reading && progress?.trivia && progress?.reflection);
}

function getFirstIncompleteDay(progress: ProgressByDay) {
  return GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => !isDayDone(progress[day.dayNumber])) ?? GENESIS_BIBLE_IN_ONE_YEAR_SERIES[0];
}

function getCover(day: GenesisBibleYearDay) {
  return day.coverImage || `/bible-year/day-${String(day.dayNumber).padStart(2, "0")}.png`;
}

function readLocalProgress() {
  if (typeof window === "undefined") return emptyProgress();
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_PROGRESS_KEY) || "{}") as ProgressByDay;
  } catch {
    return emptyProgress();
  }
}

function saveLocalProgress(progress: ProgressByDay) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(progress));
}

function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] px-4 py-8 text-[#111827]">
      <div className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center">
        <div className="rounded-[22px] border border-[#e6dfd3] bg-white px-6 py-5 text-center shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f7fe8]">Bible in One Year</p>
          <p className="mt-2 text-lg font-black">Opening your journey...</p>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("Bible Buddy");
  const [authChecked, setAuthChecked] = useState(false);
  const [progress, setProgress] = useState<ProgressByDay>({});
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [activeTask, setActiveTask] = useState<BibleYearTaskKey>("reading");
  const [completionDay, setCompletionDay] = useState<GenesisBibleYearDay | null>(null);
  const [reflectionText, setReflectionText] = useState("");

  const selectedDay = useMemo(
    () => GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => day.dayNumber === selectedDayNumber) ?? GENESIS_BIBLE_IN_ONE_YEAR_SERIES[0],
    [selectedDayNumber],
  );
  const selectedContent = useMemo(() => getBibleYearDayContent(selectedDay), [selectedDay]);
  const currentDay = useMemo(() => getFirstIncompleteDay(progress), [progress]);
  const completedDays = useMemo(
    () => GENESIS_BIBLE_IN_ONE_YEAR_SERIES.filter((day) => isDayDone(progress[day.dayNumber])).length,
    [progress],
  );
  const selectedProgress = progress[selectedDay.dayNumber] || {};
  const selectedDone = isDayDone(selectedProgress);
  const progressPercent = Math.round((completedDays / Math.max(1, GENESIS_BIBLE_IN_ONE_YEAR_SERIES.length)) * 100);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;
      if (!user) {
        router.replace("/");
        return;
      }

      const metadata = user.user_metadata || {};
      setUserId(user.id);
      setUserName(
        String(
          metadata.firstName ||
            metadata.first_name ||
            metadata.full_name ||
            metadata.name ||
            (user.email ? user.email.split("@")[0] : "Bible Buddy"),
        ),
      );
      setAuthChecked(true);
    }

    void loadUser();
    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    const localProgress = readLocalProgress();
    setProgress(localProgress);
    setSelectedDayNumber(getFirstIncompleteDay(localProgress).dayNumber);
  }, []);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    async function loadRemoteProgress() {
      const { data, error } = await supabase
        .from("bible_year_progress")
        .select("day_number,reading_completed,trivia_completed,reflection_completed")
        .eq("user_id", userId);

      if (cancelled || error || !data) return;
      const remoteProgress = { ...readLocalProgress() };
      data.forEach((row: any) => {
        remoteProgress[Number(row.day_number)] = {
          reading: Boolean(row.reading_completed),
          trivia: Boolean(row.trivia_completed),
          reflection: Boolean(row.reflection_completed),
        };
      });
      setProgress(remoteProgress);
      saveLocalProgress(remoteProgress);
      setSelectedDayNumber(getFirstIncompleteDay(remoteProgress).dayNumber);
    }

    void loadRemoteProgress();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function persistProgress(dayNumber: number, nextDayProgress: DayProgress) {
    const nextProgress = {
      ...progress,
      [dayNumber]: nextDayProgress,
    };
    setProgress(nextProgress);
    saveLocalProgress(nextProgress);

    if (userId) {
      await supabase.from("bible_year_progress").upsert(
        {
          user_id: userId,
          day_number: dayNumber,
          reading_completed: Boolean(nextDayProgress.reading),
          trivia_completed: Boolean(nextDayProgress.trivia),
          reflection_completed: Boolean(nextDayProgress.reflection),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,day_number" },
      );
    }

    const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((item) => item.dayNumber === dayNumber);
    if (day && isDayDone(nextDayProgress) && !isDayDone(progress[dayNumber])) {
      setCompletionDay(day);
    }
  }

  function completeTask(task: BibleYearTaskKey) {
    const nextDayProgress = {
      ...(progress[selectedDay.dayNumber] || {}),
      [task]: true,
    };
    void persistProgress(selectedDay.dayNumber, nextDayProgress);
  }

  function openDay(dayNumber: number) {
    setSelectedDayNumber(dayNumber);
    setActiveTask("reading");
    setReflectionText("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function continueAfterCompletion() {
    if (!completionDay) return;
    const nextDay = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => day.dayNumber === completionDay.dayNumber + 1);
    setCompletionDay(null);
    if (nextDay) {
      openDay(nextDay.dayNumber);
    } else {
      setSelectedDayNumber(GENESIS_BIBLE_IN_ONE_YEAR_SERIES[0].dayNumber);
    }
  }

  if (!authChecked) return <DashboardLoading />;

  return (
    <main className="min-h-screen bg-[#f7f4ed] pb-28 text-[#111827]">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        <header className="rounded-[26px] border border-[#e2dacd] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f7fe8]">Bible Buddy Dashboard</p>
              <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">Bible in One Year</h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#5f6368]">
                Welcome back, {userName}. Read, understand, reflect, and keep moving one day at a time.
              </p>
            </div>
            <div className="rounded-2xl bg-[#f4f8ff] px-4 py-3 text-left sm:text-right">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6b7280]">Progress</p>
              <p className="mt-1 text-2xl font-black">{completedDays}/{GENESIS_BIBLE_IN_ONE_YEAR_SERIES.length}</p>
              <p className="text-xs font-bold text-[#5f6368]">{progressPercent}% complete</p>
            </div>
          </div>
        </header>

        <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="overflow-hidden rounded-[26px] border border-[#e2dacd] bg-white shadow-sm">
            <div className="bg-[#fffaf1] px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Current Study</p>
              <h2 className="mt-1 text-2xl font-black">Day {selectedDay.dayNumber}: {selectedDay.title}</h2>
              <p className="mt-1 text-sm font-bold text-[#5f6368]">{selectedDay.reference} • {selectedDay.estimatedTime}</p>
            </div>

            <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
              <div className="bg-[#f4f8ff] p-5">
                <div className="aspect-[3/4] overflow-hidden rounded-[18px] bg-white shadow-sm">
                  <img
                    src={getCover(selectedDay)}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDayNumber(currentDay.dayNumber)}
                  className="mt-4 w-full rounded-2xl border border-[#dbe7f4] bg-white px-4 py-3 text-sm font-black text-[#111827]"
                >
                  Jump To Current Day
                </button>
              </div>

              <div className="p-5">
                <p className="text-sm font-semibold leading-6 text-[#4b5563]">{selectedDay.summary}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {TASKS.map((task) => {
                    const done = Boolean(selectedProgress[task.key]);
                    const active = activeTask === task.key;
                    return (
                      <button
                        key={task.key}
                        type="button"
                        onClick={() => setActiveTask(task.key)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                          active ? "border-[#2f7fe8] bg-[#eaf5ff] text-[#0f3664]" : "border-[#e2dacd] bg-white text-[#111827]"
                        }`}
                      >
                        <span className="block">{done ? "Done" : active ? "Open" : "Start"}</span>
                        <span className="mt-1 block text-xs font-bold text-[#5f6368]">{task.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-[22px] border border-[#e2dacd] bg-[#fffdf8] p-4">
                  {activeTask === "reading" ? (
                    <div>
                      <h3 className="text-xl font-black">Read and Listen</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedDay.readings.map((reading) => (
                          <Link
                            key={`${reading.book}-${reading.chapter}`}
                            href={`/Bible/${reading.book}/${reading.chapter}`}
                            className="rounded-full border border-[#dbe7f4] bg-white px-4 py-2 text-sm font-black text-[#111827]"
                          >
                            {reading.book} {reading.chapter}
                          </Link>
                        ))}
                      </div>
                      {selectedContent.audio ? (
                        <div className="mt-4">
                          <BibleYearLessonAudioPlayer
                            audioSrc={selectedContent.audio.apiSrc}
                            title={selectedContent.audio.title}
                            durationLabel={selectedContent.audio.estimatedDuration}
                            storagePath={selectedContent.audio.storagePath}
                            videoSrc={selectedContent.audio.videoSrc}
                            userId={userId}
                            videoId={`bible-year-day-${selectedDay.dayNumber}`}
                          />
                        </div>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => completeTask("reading")}
                        className="mt-4 rounded-2xl bg-[#2f7fe8] px-5 py-3 text-sm font-black text-white"
                      >
                        Mark Reading Complete
                      </button>
                    </div>
                  ) : null}

                  {activeTask === "trivia" ? (
                    <div>
                      <h3 className="text-xl font-black">Review</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#5f6368]">
                        Say the big idea back in your own words: {selectedContent.summary.takeaway}
                      </p>
                      <div className="mt-4 grid gap-2">
                        {selectedContent.summary.highlights.slice(0, 4).map((highlight, index) => (
                          <div key={index} className="rounded-2xl border border-[#e2dacd] bg-white px-4 py-3 text-sm font-bold text-[#374151]">
                            {highlight[1]}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => completeTask("trivia")}
                        className="mt-4 rounded-2xl bg-[#2f7fe8] px-5 py-3 text-sm font-black text-white"
                      >
                        Mark Review Complete
                      </button>
                    </div>
                  ) : null}

                  {activeTask === "reflection" ? (
                    <div>
                      <h3 className="text-xl font-black">Reflection</h3>
                      <p className="mt-2 rounded-2xl bg-[#eaf5ff] px-4 py-3 text-sm font-black leading-6 text-[#0f3664]">
                        {selectedContent.discussionPrompt}
                      </p>
                      <textarea
                        value={reflectionText}
                        onChange={(event) => setReflectionText(event.target.value)}
                        placeholder="Write your reflection..."
                        className="mt-4 min-h-32 w-full rounded-2xl border border-[#dbe7f4] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2f7fe8]"
                      />
                      <button
                        type="button"
                        onClick={() => completeTask("reflection")}
                        className="mt-3 rounded-2xl bg-[#2f7fe8] px-5 py-3 text-sm font-black text-white"
                      >
                        Mark Reflection Complete
                      </button>
                    </div>
                  ) : null}
                </div>

                {selectedDone ? (
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                    Day {selectedDay.dayNumber} is complete.
                  </div>
                ) : null}
              </div>
            </div>
          </article>

          <aside className="rounded-[26px] border border-[#e2dacd] bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Deep Notes</p>
            <h2 className="mt-1 text-xl font-black">What to remember</h2>
            <div className="mt-3 space-y-3">
              {selectedContent.summary.intro.map((line, index) => (
                <p key={index} className="text-sm font-semibold leading-6 text-[#4b5563]">{line}</p>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-[#fffaf1] px-4 py-3">
              <p className="text-sm font-black text-[#111827]">{selectedContent.summary.takeaway}</p>
              <p className="mt-2 text-xs font-bold leading-5 text-[#5f6368]">{selectedContent.summary.takeawaySupport}</p>
            </div>
          </aside>
        </section>

        <section className="mt-6 rounded-[26px] border border-[#e2dacd] bg-white p-5 shadow-sm">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Journey Map</p>
              <h2 className="mt-1 text-2xl font-black">Open Any Day</h2>
            </div>
            <p className="text-right text-xs font-bold text-[#6b7280]">Locked days can still be viewed.</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((day) => {
              const done = isDayDone(progress[day.dayNumber]);
              const current = day.dayNumber === currentDay.dayNumber;
              const selected = day.dayNumber === selectedDay.dayNumber;
              const status = done ? "Done" : current ? "Current Day" : "Locked";
              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => openDay(day.dayNumber)}
                  className={`overflow-hidden rounded-[20px] border bg-white text-left shadow-sm transition hover:-translate-y-0.5 ${
                    selected ? "border-[#2f7fe8] ring-2 ring-[#2f7fe8]/20" : "border-[#e2dacd]"
                  }`}
                >
                  <div className="aspect-[3/4] bg-[#f4f8ff]">
                    <img
                      src={getCover(day)}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase tracking-[0.12em] text-[#6b7280]">Day {day.dayNumber}</span>
                      <span className={`rounded-full px-2 py-1 text-[10px] font-black ${done ? "bg-emerald-100 text-emerald-700" : current ? "bg-[#eaf5ff] text-[#2f7fe8]" : "bg-[#f3f4f6] text-[#6b7280]"}`}>
                        {status}
                      </span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-sm font-black leading-5">{day.title}</h3>
                    <p className="mt-1 text-xs font-bold text-[#6b7280]">{day.reference}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {completionDay ? (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-black/55 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f7fe8]">Day Complete</p>
            <h2 className="mt-2 text-2xl font-black">Great job. Day {completionDay.dayNumber} is finished.</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#5f6368]">
              Press Continue to move forward.
            </p>
            <button
              type="button"
              onClick={continueAfterCompletion}
              className="mt-5 w-full rounded-2xl bg-[#2f7fe8] px-5 py-3 text-sm font-black text-white"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
