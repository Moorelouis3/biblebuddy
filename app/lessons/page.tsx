// app/lessons/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ActiveLesson = "lesson0" | "lesson1" | "lesson2" | "lesson3" | "lesson4" | "lesson5" | null;
type LessonKey = "lesson0" | "lesson1" | "lesson2" | "lesson3" | "lesson4" | "lesson5";

type LessonCompletion = Record<LessonKey, boolean>;

const STORAGE_KEY = "howToUseBibleBuddyLessons";

export default function LessonsPage() {
  const [activeLesson, setActiveLesson] = useState<ActiveLesson>(null);
  const [completed, setCompleted] = useState<LessonCompletion>({
    lesson0: false,
    lesson1: false,
    lesson2: false,
    lesson3: false,
    lesson4: false,
    lesson5: false,
  });

  // load completion state from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as LessonCompletion;
      setCompleted((prev) => ({ ...prev, ...parsed }));
    } catch {
      // ignore parse errors
    }
  }, []);

  // helper to mark a lesson as done
  function markLessonDone(key: LessonKey) {
    setCompleted((prev) => {
      const next = { ...prev, [key]: true };
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
    setActiveLesson(null);
  }

  const lesson0Done = completed.lesson0;
  const lesson1Done = completed.lesson1;
  const lesson2Done = completed.lesson2;
  const lesson3Done = completed.lesson3;
  const lesson4Done = completed.lesson4;
  const lesson5Done = completed.lesson5;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      {/* dimmed background */}
      <div className="absolute inset-0 bg-slate-900/20" />

      {/* modal card */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          {/* header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                How to Use BibleBuddy
              </h1>
              <p className="text-sm text-slate-500">
                A simple guide to help you learn BibleBuddy and grow in your Bible habit.
              </p>
            </div>

            {/* close button back to dashboard */}
            <Link
              href="/dashboard"
              className="text-sm text-slate-400 hover:text-slate-600 transition"
            >
              Close
            </Link>
          </div>

          {/* lesson cards */}
          <div className="space-y-4">
            {/* Lesson 0 Welcome! Meet Little Louis */}
            <button
              type="button"
              onClick={() => setActiveLesson("lesson0")}
              className="w-full text-left group"
            >
              <div
                className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition ${
                  lesson0Done
                    ? "bg-slate-50 border-slate-200 opacity-70"
                    : "bg-orange-50 border-orange-100 hover:shadow-md hover:bg-orange-100/60"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 0 • Welcome to BibleBuddy
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Meet your Bible Buddy and learn how this app guides you.
                  </p>
                </div>
                {lesson0Done ? (
                  <span className="text-xs text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full px-2 py-0.5">
                    Done
                  </span>
                ) : (
                  <span className="text-slate-400 text-lg group-hover:text-slate-600">
                    ›
                  </span>
                )}
              </div>
            </button>

            {/* Lesson 1 Your Bible Reading Plan */}
            <button
              type="button"
              onClick={() => setActiveLesson("lesson1")}
              className="w-full text-left group"
            >
              <div
                className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition ${
                  lesson1Done
                    ? "bg-slate-50 border-slate-200 opacity-70"
                    : "bg-blue-50 border-blue-100 hover:shadow-md hover:bg-blue-100/60"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 1 • Your Bible Reading Plan
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    The easiest way to read the Bible without getting overwhelmed.
                  </p>
                </div>
                {lesson1Done ? (
                  <span className="text-xs text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full px-2 py-0.5">
                    Done
                  </span>
                ) : (
                  <span className="text-slate-400 text-lg group-hover:text-slate-600">
                    ›
                  </span>
                )}
              </div>
            </button>

            {/* Lesson 2 Bible Chapter Notes */}
            <button
              type="button"
              onClick={() => setActiveLesson("lesson2")}
              className="w-full text-left group"
            >
              <div
                className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition ${
                  lesson2Done
                    ? "bg-slate-50 border-slate-200 opacity-70"
                    : "bg-purple-50 border-purple-100 hover:shadow-md hover:bg-purple-100/60"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 2 • Bible Chapter Notes
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Understand what you read with simple explanations.
                  </p>
                </div>
                {lesson2Done ? (
                  <span className="text-xs text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full px-2 py-0.5">
                    Done
                  </span>
                ) : (
                  <span className="text-slate-400 text-lg group-hover:text-slate-600">
                    ›
                  </span>
                )}
              </div>
            </button>

            {/* Lesson 3 Taking Notes With GROW */}
            <button
              type="button"
              onClick={() => setActiveLesson("lesson3")}
              className="w-full text-left group"
            >
              <div
                className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition ${
                  lesson3Done
                    ? "bg-slate-50 border-slate-200 opacity-70"
                    : "bg-green-50 border-green-100 hover:shadow-md hover:bg-green-100/60"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 3 • The GROW Notes Method
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Take meaningful Bible notes — even as a beginner.
                  </p>
                </div>
                {lesson3Done ? (
                  <span className="text-xs text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full px-2 py-0.5">
                    Done
                  </span>
                ) : (
                  <span className="text-slate-400 text-lg group-hover:text-slate-600">
                    ›
                  </span>
                )}
              </div>
            </button>

            {/* Lesson 4 Ask Little Louis (AI Helper) */}
            <button
              type="button"
              onClick={() => setActiveLesson("lesson4")}
              className="w-full text-left group"
            >
              <div
                className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition ${
                  lesson4Done
                    ? "bg-slate-50 border-slate-200 opacity-70"
                    : "bg-pink-50 border-pink-100 hover:shadow-md hover:bg-pink-100/60"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 4 • Ask Little Louis (Bible AI Helper)
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Your personal biblical assistant.
                  </p>
                </div>
                {lesson4Done ? (
                  <span className="text-xs text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full px-2 py-0.5">
                    Done
                  </span>
                ) : (
                  <span className="text-slate-400 text-lg group-hover:text-slate-600">
                    ›
                  </span>
                )}
              </div>
            </button>

            {/* Lesson 5 Building a Daily Bible Habit */}
            <button
              type="button"
              onClick={() => setActiveLesson("lesson5")}
              className="w-full text-left group"
            >
              <div
                className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition ${
                  lesson5Done
                    ? "bg-slate-50 border-slate-200 opacity-70"
                    : "bg-indigo-50 border-indigo-100 hover:shadow-md hover:bg-indigo-100/60"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 5 • Building Your Daily Bible Habit
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    A simple 20–30 minute routine that helps you grow.
                  </p>
                </div>
                {lesson5Done ? (
                  <span className="text-xs text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full px-2 py-0.5">
                    Done
                  </span>
                ) : (
                  <span className="text-slate-400 text-lg group-hover:text-slate-600">
                    ›
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* LESSON 0 MODAL */}
      {activeLesson === "lesson0" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl p-6 md:p-8">
            {/* close button */}
            <button
              type="button"
              onClick={() => setActiveLesson(null)}
              className="absolute right-4 top-3 text-sm text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              ✨ Lesson 0 • Welcome to BibleBuddy
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Meet your Bible Buddy and learn how this app guides you.
            </p>

            {/* callout body */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-6 md:py-5 text-sm leading-relaxed text-slate-800 space-y-4">
              <h3 className="font-semibold text-slate-900 mt-4 mb-2">👋🏾 Welcome to BibleBuddy</h3>
              
              <p>
                I'm <strong>Little Louis — your Bible Buddy</strong>, here to help you build a strong, simple, consistent Bible reading habit.
              </p>

              <p>
                Most people want to read Scripture, but they get overwhelmed:
              </p>

              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Where do I start?</li>
                <li>What do I read first?</li>
                <li>How do I understand what I'm reading?</li>
                <li>How do I stay consistent?</li>
              </ul>

              <p>
                BibleBuddy removes all that confusion.
              </p>

              <p>
                I sit beside you, guide you step-by-step, and help you grow closer to God — one chapter at a time.
              </p>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">✨ What You'll Learn in This Short Guide</h3>

              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>how your daily Bible reading plan works</li>
                <li>how Bible chapter notes help you understand what you read</li>
                <li>how to take meaningful notes with the GROW method</li>
                <li>how to use Little Louis AI anytime you're stuck</li>
                <li>how to build a habit that actually lasts</li>
              </ul>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">🙌 You're Not Doing This Alone</h3>

              <p>
                I'm here with you every day.
              </p>

              <p>
                Tap <strong>Next Lesson</strong> to continue.
              </p>
            </div>

            {/* actions */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Exit
              </Link>

              <button
                type="button"
                onClick={() => markLessonDone("lesson0")}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Mark as done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LESSON 1 MODAL */}
      {activeLesson === "lesson1" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl p-6 md:p-8">
            {/* close button */}
            <button
              type="button"
              onClick={() => setActiveLesson(null)}
              className="absolute right-4 top-3 text-sm text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              ✨ Lesson 1 • Your Bible Reading Plan
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              The easiest way to read the Bible without getting overwhelmed.
            </p>

            {/* callout body */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-6 md:py-5 text-sm leading-relaxed text-slate-800 space-y-4">
              <h3 className="font-semibold text-slate-900 mt-4 mb-2">📘 Your Bible Reading Plan</h3>

              <p>
                Most people get stuck because they don't know where to start.
              </p>

              <p>
                BibleBuddy removes the guesswork with a simple path:
              </p>

              <p className="font-semibold">
                <strong>Matthew → Mark → Luke → John → Acts → Romans → Genesis → Exodus → Leviticus → Numbers → Deuteronomy → the rest of the Bible</strong>
              </p>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">🧠 Why This Order Works</h3>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>1. You start with Jesus — the foundation of everything.</strong></h4>
              <p>
                His life helps you understand the entire Bible.
              </p>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>2. Then you learn how the church began (Acts)</strong></h4>
              <p>
                And how to live out your faith (Romans).
              </p>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>3. THEN the Old Testament becomes much clearer.</strong></h4>
              <p>
                Once you understand Jesus, the history leading up to Him makes sense.
              </p>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">🟦 How to Use It</h3>

              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tap <strong>Continue Reading</strong></li>
                <li>Read <strong>one chapter</strong></li>
                <li>Go slow</li>
                <li>Let it sink in</li>
                <li>Keep moving forward</li>
              </ul>

              <p>
                You'll never wonder "What should I read today?" again.
              </p>
            </div>

            {/* actions */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Back to lessons
              </button>

              <button
                type="button"
                onClick={() => markLessonDone("lesson1")}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Mark as done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LESSON 2 MODAL */}
      {activeLesson === "lesson2" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl p-6 md:p-8">
            {/* close button */}
            <button
              type="button"
              onClick={() => setActiveLesson(null)}
              className="absolute right-4 top-3 text-sm text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              ✨ Lesson 2 • Bible Chapter Notes
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Understand what you read with simple explanations.
            </p>

            {/* callout body */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-6 md:py-5 text-sm leading-relaxed text-slate-800 space-y-4">
              <h3 className="font-semibold text-slate-900 mt-4 mb-2">📚 Bible Chapter Notes</h3>

              <p>
                Every Bible chapter in BibleBuddy includes simple, clear notes to help you understand what you read — written in everyday language.
              </p>

              <p>
                I break each chapter down so you see:
              </p>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2">💡 The Main Idea</h4>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2">🎬 What's Happening</h4>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2">❤️ Why It Matters</h4>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2">🔗 How It Connects to the Big Story of Scripture</h4>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">🤝 How to Use It</h3>

              <p>
                After you finish reading a chapter:
              </p>

              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Tap <strong>Read Notes</strong></li>
                <li>I'll walk you through the meaning step-by-step</li>
                <li>Scripture becomes clearer, deeper, and easier to understand</li>
              </ol>

              <p>
                It's like having a Bible study friend sitting next to you.
              </p>
            </div>

            {/* actions */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Back to lessons
              </button>

              <button
                type="button"
                onClick={() => markLessonDone("lesson2")}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Mark as done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LESSON 3 MODAL */}
      {activeLesson === "lesson3" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl p-6 md:p-8">
            {/* close button */}
            <button
              type="button"
              onClick={() => setActiveLesson(null)}
              className="absolute right-4 top-3 text-sm text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              ✨ Lesson 3 • The GROW Notes Method
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Take meaningful Bible notes — even as a beginner.
            </p>

            {/* callout body */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-6 md:py-5 text-sm leading-relaxed text-slate-800 space-y-4">
              <h3 className="font-semibold text-slate-900 mt-4 mb-2">🌱 The GROW Bible Notes Method</h3>

              <p>
                Most people never learned how to take Bible study notes, so they feel unorganized or unsure.
              </p>

              <p>
                BibleBuddy fixes that with a simple, beginner-friendly system.
              </p>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">✍🏾 The GROW Method</h3>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>G — Get the Passage</strong></h4>
              <p>
                What stood out.
              </p>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>R — Research</strong></h4>
              <p>
                Any questions you have.
              </p>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>O — Observe</strong></h4>
              <p>
                Connections or insights you notice.
              </p>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>W — Write</strong></h4>
              <p>
                What God is teaching you personally.
              </p>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">📒 How It Works</h3>

              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tap <strong>Take Notes</strong></li>
                <li>Answer the guided questions</li>
                <li>I format everything neatly</li>
                <li>All your notes stay organized forever</li>
              </ul>

              <p>
                This helps your faith grow deeper every time you read.
              </p>
            </div>

            {/* actions */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Back to lessons
              </button>

              <button
                type="button"
                onClick={() => markLessonDone("lesson3")}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Mark as done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LESSON 4 MODAL */}
      {activeLesson === "lesson4" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl p-6 md:p-8">
            {/* close button */}
            <button
              type="button"
              onClick={() => setActiveLesson(null)}
              className="absolute right-4 top-3 text-sm text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              ✨ Lesson 4 • Ask Little Louis (Bible AI Helper)
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Your personal biblical assistant.
            </p>

            {/* callout body */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-6 md:py-5 text-sm leading-relaxed text-slate-800 space-y-4">
              <h3 className="font-semibold text-slate-900 mt-4 mb-2">🤖 Ask Little Louis</h3>

              <p>
                Anytime you're confused, curious, or stuck — just ask me.
              </p>

              <p>
                I explain the Bible in simple, clear, beginner-friendly ways.
              </p>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">💬 You Can Ask Things Like:</h3>

              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>"What does this verse mean?"</li>
                <li>"Why did Jesus say this?"</li>
                <li>"Who is this person in the Old Testament?"</li>
                <li>"Why was this important?"</li>
                <li>"How do I deal with temptation or fear?"</li>
              </ul>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">🧡 Why It Helps</h3>

              <p>
                You don't need to Google random answers or hope someone explains it correctly.
              </p>

              <p>
                You already have a Bible helper inside the app — me.
              </p>

              <p>
                I'm here whenever you need clarity or guidance.
              </p>
            </div>

            {/* actions */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Back to lessons
              </button>

              <button
                type="button"
                onClick={() => markLessonDone("lesson4")}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Mark as done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LESSON 5 MODAL */}
      {activeLesson === "lesson5" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl p-6 md:p-8">
            {/* close button */}
            <button
              type="button"
              onClick={() => setActiveLesson(null)}
              className="absolute right-4 top-3 text-sm text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              ✨ Lesson 5 • Building Your Daily Bible Habit
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              A simple 20–30 minute routine that helps you grow.
            </p>

            {/* callout body */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-6 md:py-5 text-sm leading-relaxed text-slate-800 space-y-4">
              <h3 className="font-semibold text-slate-900 mt-4 mb-2">🔥 Building Your Daily Habit</h3>

              <p>
                Your spiritual life grows through consistency — not perfection.
              </p>

              <p>
                BibleBuddy gives you a simple routine that's easy to follow.
              </p>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">📅 Your Daily Routine</h3>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>1. Read one chapter</strong></h4>
              <p>
                Use the Continue Reading button.
              </p>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>2. Read my notes</strong></h4>
              <p>
                Understand the meaning and context.
              </p>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>3. Take your own notes (optional but powerful)</strong></h4>
              <p>
                The GROW method helps you process what God is teaching you.
              </p>

              <h4 className="font-semibold text-slate-800 mt-3 mb-2"><strong>4. If you're confused… ask me.</strong></h4>
              <p>
                I'm here anytime.
              </p>

              <hr className="my-4 border-slate-300" />

              <h3 className="font-semibold text-slate-900 mt-4 mb-2">🌱 The Goal</h3>

              <p>
                Not speed.
              </p>

              <p>
                Not perfection.
              </p>

              <p>
                Just showing up daily and letting God shape you through His Word.
              </p>

              <p>
                I'll be with you every step of the way.
              </p>
            </div>

            {/* actions */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Back to lessons
              </button>

              <button
                type="button"
                onClick={() => markLessonDone("lesson5")}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Mark as done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


