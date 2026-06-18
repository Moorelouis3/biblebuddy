"use client";

import { useEffect, useMemo, useState } from "react";

type DoomScrollValue = "10" | "20" | "40" | "60_plus";
type BibleExperienceValue = "beginner" | "intermediate" | "advanced" | "experienced";
type MainGoalValue = "understanding" | "consistency" | "completion" | "spiritual_growth";
type UpgradePlan = "monthly" | "yearly";

type FirstLoginOnboardingAnswers = {
  doomScrollMinutes: DoomScrollValue | "";
  bibleExperience: BibleExperienceValue | "";
  mainGoal: MainGoalValue | "";
  firstName: string;
};

type FinishPayload =
  | {
      answers: FirstLoginOnboardingAnswers;
      projectedDays: number;
      projectedLessonsPerDay: string;
      projectedMinutesLabel: string;
      path: "free";
    }
  | {
      answers: FirstLoginOnboardingAnswers;
      projectedDays: number;
      projectedLessonsPerDay: string;
      projectedMinutesLabel: string;
      path: "upgrade";
      plan: UpgradePlan;
    };

type FirstLoginOnboardingModalProps = {
  isOpen: boolean;
  initialFirstName?: string;
  submitting?: boolean;
  error?: string | null;
  onFinish: (payload: FinishPayload) => Promise<void> | void;
};

type SlideKey =
  | "welcome_intro"
  | "what_to_expect_daily"
  | "audio_first_vision"
  | "doom_scroll_question"
  | "doom_scroll_result"
  | "social_proof_usage"
  | "bible_history_question"
  | "bible_goal_question"
  | "name_screen"
  | "upgrade_or_start";

const SLIDE_ORDER: SlideKey[] = [
  "welcome_intro",
  "what_to_expect_daily",
  "audio_first_vision",
  "doom_scroll_question",
  "doom_scroll_result",
  "social_proof_usage",
  "bible_history_question",
  "bible_goal_question",
  "name_screen",
  "upgrade_or_start",
];

const DOOM_SCROLL_OPTIONS: Array<{
  value: DoomScrollValue;
  label: string;
  minutesLabel: string;
  projectedDays: number;
  lessonsPerDay: string;
}> = [
  { value: "10", label: "10 Minutes", minutesLabel: "10 minutes", projectedDays: 365, lessonsPerDay: "0.33" },
  { value: "20", label: "20 Minutes", minutesLabel: "20 minutes", projectedDays: 330, lessonsPerDay: "0.67" },
  { value: "40", label: "40 Minutes", minutesLabel: "40 minutes", projectedDays: 298, lessonsPerDay: "1.33" },
  { value: "60_plus", label: "More Than 1 Hour", minutesLabel: "1+ hour", projectedDays: 250, lessonsPerDay: "2.00" },
];

const EXPERIENCE_OPTIONS: Array<{ value: BibleExperienceValue; label: string }> = [
  { value: "beginner", label: "I'm brand new" },
  { value: "intermediate", label: "I've read some of the Bible" },
  { value: "advanced", label: "I've read most of it" },
  { value: "experienced", label: "I've finished the Bible before" },
];

const GOAL_OPTIONS: Array<{ value: MainGoalValue; label: string }> = [
  { value: "understanding", label: "Understand the Bible better" },
  { value: "consistency", label: "Build a daily habit" },
  { value: "completion", label: "Finish the Bible" },
  { value: "spiritual_growth", label: "Grow closer to God" },
];

function StepIcon({ kind }: { kind: "audio" | "notes" | "trivia" | "discuss" | "drive" | "walk" | "lift" | "clean" | "chart" | "clock" | "goal" | "book" }) {
  if (kind === "audio") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 3v18" />
        <path d="M18 8v8" />
        <path d="M10 6v12" />
        <path d="M6 9v6" />
      </svg>
    );
  }
  if (kind === "notes" || kind === "book") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 17A2.5 2.5 0 0 0 4 14.5V5a2 2 0 0 1 2-2h14v18H6.5Z" />
      </svg>
    );
  }
  if (kind === "trivia" || kind === "goal") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }
  if (kind === "discuss") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
      </svg>
    );
  }
  if (kind === "drive") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 16H9m10-6-1.5-4.5A2 2 0 0 0 15.6 4H8.4a2 2 0 0 0-1.9 1.5L5 10" />
        <path d="M3 13h18" />
        <path d="M5 18v2" />
        <path d="M19 18v2" />
        <path d="M5 13a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2" />
      </svg>
    );
  }
  if (kind === "walk") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="5" r="1.5" />
        <path d="m10 22 1-6-2-3 2-3 2 2 3 1" />
        <path d="m12 10-1 3 2 2 1 5" />
      </svg>
    );
  }
  if (kind === "lift") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10v4" />
        <path d="M21 10v4" />
        <path d="M6 8v8" />
        <path d="M18 8v8" />
        <path d="M9 12h6" />
      </svg>
    );
  }
  if (kind === "clean") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m7 21 10-10" />
        <path d="m16 5 3 3" />
        <path d="M9 19 5 15" />
        <path d="M14 4 4 14" />
      </svg>
    );
  }
  if (kind === "chart") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m7 15 4-4 3 3 5-7" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function getProjectedStats(doomScrollMinutes: DoomScrollValue | "") {
  const option = DOOM_SCROLL_OPTIONS.find((item) => item.value === doomScrollMinutes) || DOOM_SCROLL_OPTIONS[1];
  return {
    projectedDays: option.projectedDays,
    projectedLessonsPerDay: option.lessonsPerDay,
    projectedMinutesLabel: option.minutesLabel,
  };
}

export default function FirstLoginOnboardingModal({
  isOpen,
  initialFirstName = "",
  submitting = false,
  error = null,
  onFinish,
}: FirstLoginOnboardingModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showPlans, setShowPlans] = useState(false);
  const [answers, setAnswers] = useState<FirstLoginOnboardingAnswers>({
    doomScrollMinutes: "",
    bibleExperience: "",
    mainGoal: "",
    firstName: initialFirstName,
  });

  useEffect(() => {
    if (!isOpen) return;
    setShowPlans(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setAnswers((current) => ({
      ...current,
      firstName: current.firstName || initialFirstName || "",
    }));
  }, [initialFirstName, isOpen]);

  const currentSlide = SLIDE_ORDER[stepIndex];
  const isLastSlide = stepIndex === SLIDE_ORDER.length - 1;
  const projected = useMemo(() => getProjectedStats(answers.doomScrollMinutes), [answers.doomScrollMinutes]);

  if (!isOpen) return null;

  function goNext() {
    if (isLastSlide) return;
    setStepIndex((current) => Math.min(current + 1, SLIDE_ORDER.length - 1));
  }

  function goBack() {
    if (stepIndex === 0) return;
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  function canContinue() {
    if (currentSlide === "doom_scroll_question") return Boolean(answers.doomScrollMinutes);
    if (currentSlide === "bible_history_question") return Boolean(answers.bibleExperience);
    if (currentSlide === "bible_goal_question") return Boolean(answers.mainGoal);
    if (currentSlide === "name_screen") return Boolean(answers.firstName.trim());
    return true;
  }

  async function handleFinishFree() {
    await onFinish({
      answers,
      projectedDays: projected.projectedDays,
      projectedLessonsPerDay: projected.projectedLessonsPerDay,
      projectedMinutesLabel: projected.projectedMinutesLabel,
      path: "free",
    });
  }

  async function handleFinishUpgrade(plan: UpgradePlan) {
    await onFinish({
      answers,
      projectedDays: projected.projectedDays,
      projectedLessonsPerDay: projected.projectedLessonsPerDay,
      projectedMinutesLabel: projected.projectedMinutesLabel,
      path: "upgrade",
      plan,
    });
  }

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-[rgba(15,23,42,0.46)] px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto flex min-h-full max-w-xl flex-col justify-center">
        <div className="overflow-hidden rounded-[30px] border border-[#e7dccb] bg-[#fffdf8] shadow-[0_28px_80px_rgba(15,23,42,0.24)]">
          <div className="border-b border-[#efe5d7] px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#b07a16]">Welcome to Bible Buddy</p>
                <h2 className="mt-1 text-2xl font-black text-[#0f1b33]">Your Day 1 journey starts here</h2>
              </div>
              <div className="rounded-full bg-[#f7f1e7] px-3 py-1 text-xs font-black text-[#4d5d77]">
                {stepIndex + 1} / {SLIDE_ORDER.length}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {SLIDE_ORDER.map((slide, index) => (
                <span
                  key={slide}
                  className={`h-1.5 flex-1 rounded-full ${index <= stepIndex ? "bg-[#2f7fe8]" : "bg-[#e7dccb]"}`}
                />
              ))}
            </div>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            {currentSlide === "welcome_intro" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">Most Bible apps help you read the Bible</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">Bible Buddy helps you understand it.</h3>
                <div className="mt-4 space-y-3 text-[15px] font-semibold leading-7 text-[#44536b]">
                  <p>Bible Buddy combines audio Bible lessons with study tools designed to help you actually understand what you are reading.</p>
                  <p>Every day includes guided audio, study notes, trivia, and discussion questions to help Scripture stick.</p>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Audio Bible lessons", "audio"],
                    ["Study notes", "notes"],
                    ["Trivia challenges", "trivia"],
                    ["Discussion questions", "discuss"],
                  ].map(([label, kind]) => (
                    <div key={label} className="flex items-center gap-3 rounded-2xl border border-[#ece1cf] bg-white px-4 py-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#edf4ff] text-[#2f7fe8]">
                        <StepIcon kind={kind as any} />
                      </span>
                      <span className="text-sm font-black text-[#0f1b33]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {currentSlide === "what_to_expect_daily" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">Your Daily Bible Buddy Routine</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">Simple. Consistent. Designed for real life.</h3>
                <div className="mt-4 space-y-3 text-[15px] font-semibold leading-7 text-[#44536b]">
                  <p>Every day follows the same easy-to-follow structure.</p>
                  <p>Small daily progress compounds into finishing the entire Bible.</p>
                </div>
                <div className="mt-6 grid gap-3">
                  {[
                    ["Listen to the audio lesson", "audio", "Hear the reading and guided explanation first."],
                    ["Review the notes", "notes", "See the key sections and phrases that matter most."],
                    ["Test yourself with trivia", "trivia", "Reinforce what you just learned."],
                    ["Discuss and respond", "discuss", "Share what stood out from today's reading."],
                  ].map(([title, kind, text], index) => (
                    <div key={title} className="flex items-start gap-3 rounded-2xl border border-[#ece1cf] bg-white px-4 py-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#edf4ff] text-[#2f7fe8]">
                        <StepIcon kind={kind as any} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#b07a16]">Step {index + 1}</p>
                        <p className="mt-1 text-sm font-black text-[#0f1b33]">{title}</p>
                        <p className="mt-1 text-sm font-semibold leading-6 text-[#536173]">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {currentSlide === "audio_first_vision" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">Scripture was meant to be heard</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">Learn while living your life.</h3>
                <div className="mt-4 space-y-3 text-[15px] font-semibold leading-7 text-[#44536b]">
                  <p>For most of history, many people experienced Scripture by hearing it rather than reading it.</p>
                  <p>Bible Buddy lets you listen while driving, walking, working out, cleaning, or getting ready for the day.</p>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Driving", "drive"],
                    ["Walking", "walk"],
                    ["Working out", "lift"],
                    ["Daily chores", "clean"],
                  ].map(([label, kind]) => (
                    <div key={label} className="flex items-center gap-3 rounded-2xl border border-[#ece1cf] bg-white px-4 py-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f2f8f3] text-[#18904a]">
                        <StepIcon kind={kind as any} />
                      </span>
                      <span className="text-sm font-black text-[#0f1b33]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {currentSlide === "doom_scroll_question" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">Quick Question</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">Be honest. No judgment.</h3>
                <div className="mt-4 space-y-3 text-[15px] font-semibold leading-7 text-[#44536b]">
                  <p>Most of us spend more time scrolling than we realize.</p>
                  <p>Let&apos;s see what that time could become.</p>
                </div>
                <p className="mt-6 text-sm font-black text-[#0f1b33]">How much doom scrolling do you think you do a day?</p>
                <div className="mt-4 grid gap-3">
                  {DOOM_SCROLL_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, doomScrollMinutes: option.value }))}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        answers.doomScrollMinutes === option.value
                          ? "border-[#2f7fe8] bg-[#eef5ff] shadow-[0_10px_26px_rgba(47,127,232,0.12)]"
                          : "border-[#ece1cf] bg-white hover:bg-[#fbf8f2]"
                      }`}
                    >
                      <span className="text-sm font-black text-[#0f1b33]">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {currentSlide === "doom_scroll_result" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">That Time Adds Up</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">You may be closer than you think.</h3>
                <div className="mt-6 rounded-[28px] border border-[#d8e8ff] bg-[#f6faff] px-5 py-6 text-center">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2f7fe8]">Personalized finish estimate</p>
                  <p className="mt-3 text-5xl font-black leading-none text-[#0f1b33]">{projected.projectedDays}</p>
                  <p className="mt-2 text-lg font-black text-[#0f1b33]">days</p>
                  <p className="mx-auto mt-4 max-w-md text-sm font-semibold leading-6 text-[#536173]">
                    If you replaced your daily scrolling with Bible Buddy, you could finish the Bible in about {projected.projectedDays} days.
                  </p>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#ece1cf] bg-white px-4 py-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#7b8799]">Time used</p>
                    <p className="mt-1 text-sm font-black text-[#0f1b33]">{projected.projectedMinutesLabel} a day</p>
                  </div>
                  <div className="rounded-2xl border border-[#ece1cf] bg-white px-4 py-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#7b8799]">Lesson pace</p>
                    <p className="mt-1 text-sm font-black text-[#0f1b33]">{projected.projectedLessonsPerDay} lessons per day</p>
                  </div>
                  <div className="rounded-2xl border border-[#ece1cf] bg-white px-4 py-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#7b8799]">What matters most</p>
                    <p className="mt-1 text-sm font-black text-[#0f1b33]">Consistency beats intensity</p>
                  </div>
                </div>
              </div>
            ) : null}

            {currentSlide === "social_proof_usage" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">Built For Consistency</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">Thousands of small moments become a finished Bible.</h3>
                <div className="mt-4 space-y-3 text-[15px] font-semibold leading-7 text-[#44536b]">
                  <p>Many Bible Buddy users fit Scripture into moments they already have.</p>
                  <p>The goal is not finding more time. It is using the time you already have.</p>
                </div>
                <div className="mt-6 rounded-[28px] border border-[#ece1cf] bg-white px-5 py-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#edf4ff] text-[#2f7fe8]">
                      <StepIcon kind="chart" />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7b8799]">Average active users</p>
                      <p className="text-xl font-black text-[#0f1b33]">20+ chapters each week</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Listen while driving", "drive"],
                      ["Listen while walking", "walk"],
                      ["Listen while cleaning", "clean"],
                      ["Listen while getting ready", "clock"],
                    ].map(([label, kind]) => (
                      <div key={label} className="flex items-center gap-3 rounded-2xl bg-[#faf7f1] px-4 py-3">
                        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-[#18904a]">
                          <StepIcon kind={kind as any} />
                        </span>
                        <span className="text-sm font-black text-[#0f1b33]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {currentSlide === "bible_history_question" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">Tell Us About Your Bible Journey</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">We&apos;ll personalize your experience.</h3>
                <div className="mt-4 space-y-3 text-[15px] font-semibold leading-7 text-[#44536b]">
                  <p>Everyone starts somewhere.</p>
                  <p>Choose the option that best describes you.</p>
                </div>
                <p className="mt-6 text-sm font-black text-[#0f1b33]">How would you describe your Bible experience?</p>
                <div className="mt-4 grid gap-3">
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, bibleExperience: option.value }))}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        answers.bibleExperience === option.value
                          ? "border-[#2f7fe8] bg-[#eef5ff] shadow-[0_10px_26px_rgba(47,127,232,0.12)]"
                          : "border-[#ece1cf] bg-white hover:bg-[#fbf8f2]"
                      }`}
                    >
                      <span className="text-sm font-black text-[#0f1b33]">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {currentSlide === "bible_goal_question" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">What&apos;s Your Main Goal?</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">Choose what matters most right now.</h3>
                <div className="mt-4 space-y-3 text-[15px] font-semibold leading-7 text-[#44536b]">
                  <p>Your answer helps us personalize encouragement and future recommendations.</p>
                  <p>There are no wrong answers.</p>
                </div>
                <p className="mt-6 text-sm font-black text-[#0f1b33]">What do you want most from Bible Buddy?</p>
                <div className="mt-4 grid gap-3">
                  {GOAL_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, mainGoal: option.value }))}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        answers.mainGoal === option.value
                          ? "border-[#2f7fe8] bg-[#eef5ff] shadow-[0_10px_26px_rgba(47,127,232,0.12)]"
                          : "border-[#ece1cf] bg-white hover:bg-[#fbf8f2]"
                      }`}
                    >
                      <span className="text-sm font-black text-[#0f1b33]">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {currentSlide === "name_screen" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">Almost Ready</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">We&apos;re getting your Day 1 journey ready.</h3>
                <div className="mt-4 space-y-3 text-[15px] font-semibold leading-7 text-[#44536b]">
                  <p>Let&apos;s make this experience a little more personal.</p>
                  <p>What should we call you?</p>
                </div>
                <label className="mt-6 block">
                  <span className="text-sm font-black text-[#0f1b33]">First name</span>
                  <input
                    type="text"
                    value={answers.firstName}
                    onChange={(event) => setAnswers((current) => ({ ...current, firstName: event.target.value }))}
                    placeholder="Enter your first name"
                    className="mt-3 w-full rounded-2xl border border-[#ece1cf] bg-white px-4 py-4 text-base font-semibold text-[#0f1b33] outline-none transition focus:border-[#2f7fe8] focus:ring-4 focus:ring-[#dbeafe]"
                    autoFocus
                  />
                </label>
              </div>
            ) : null}

            {currentSlide === "upgrade_or_start" ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b07a16]">Your Bible in One Year journey is ready</p>
                <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f1b33]">
                  Welcome{answers.firstName.trim() ? `, ${answers.firstName.trim()}` : ""}.
                </h3>
                <div className="mt-4 space-y-3 text-[15px] font-semibold leading-7 text-[#44536b]">
                  <p>Start with the free experience or unlock everything Bible Buddy offers.</p>
                  <p>Either way, your Day 1 journey starts now.</p>
                </div>

                <div className="mt-6 rounded-[28px] border border-[#ece1cf] bg-white px-5 py-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Full audio experience", "audio"],
                      ["Detailed study notes", "notes"],
                      ["Bible trivia", "trivia"],
                      ["Discussion questions", "discuss"],
                      ["Progress tracking", "chart"],
                      ["Bible completion journey", "goal"],
                    ].map(([label, kind]) => (
                      <div key={label} className="flex items-center gap-3 rounded-2xl bg-[#faf7f1] px-4 py-3">
                        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#edf4ff] text-[#2f7fe8]">
                          <StepIcon kind={kind as any} />
                        </span>
                        <span className="text-sm font-black text-[#0f1b33]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {showPlans ? (
                  <div className="mt-5 grid gap-3">
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => void handleFinishUpgrade("monthly")}
                      className="flex items-center justify-between rounded-2xl border border-[#c9ddfb] bg-white px-4 py-4 text-left transition hover:bg-[#f5f9ff] disabled:opacity-60"
                    >
                      <span>
                        <span className="block text-sm font-black text-[#0f1b33]">Monthly</span>
                        <span className="mt-1 block text-xs font-semibold text-[#536173]">Flexible access</span>
                      </span>
                      <span className="text-xl font-black text-[#2f7fe8]">$4.99</span>
                    </button>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => void handleFinishUpgrade("yearly")}
                      className="flex items-center justify-between rounded-2xl border border-[#f0cf8b] bg-[#f6b44b] px-4 py-4 text-left text-[#1d1200] transition hover:brightness-105 disabled:opacity-60"
                    >
                      <span>
                        <span className="block text-sm font-black">Full Access</span>
                        <span className="mt-1 block text-xs font-semibold opacity-80">Lifetime one-time payment</span>
                      </span>
                      <span className="text-xl font-black">$50</span>
                    </button>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => setShowPlans(false)}
                      className="rounded-2xl border border-[#d7e3f4] bg-white px-4 py-3 text-sm font-black text-[#0f1b33] transition hover:bg-[#f8fbff] disabled:opacity-60"
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 grid gap-3">
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => setShowPlans(true)}
                      className="rounded-2xl bg-[#2f7fe8] px-4 py-4 text-sm font-black text-white shadow-[0_16px_32px_rgba(47,127,232,0.22)] transition hover:brightness-105 disabled:opacity-60"
                    >
                      Unlock Full Experience
                    </button>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => void handleFinishFree()}
                      className="rounded-2xl border border-[#d7e3f4] bg-white px-4 py-4 text-sm font-black text-[#0f1b33] transition hover:bg-[#f8fbff] disabled:opacity-60"
                    >
                      Start Day 1 Free
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {error ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : null}
          </div>

          {!isLastSlide ? (
            <div className="flex items-center justify-between gap-3 border-t border-[#efe5d7] px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIndex === 0 || submitting}
                className="rounded-2xl border border-[#d7e3f4] bg-white px-4 py-3 text-sm font-black text-[#0f1b33] transition hover:bg-[#f8fbff] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue() || submitting}
                className="rounded-2xl bg-[#0f1b33] px-5 py-3 text-sm font-black text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
