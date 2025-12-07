// app/lessons/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ActiveLesson = "intro" | "lesson1" | "lesson2" | null;
type LessonKey = "intro" | "lesson1" | "lesson2";

type LessonCompletion = Record<LessonKey, boolean>;

const STORAGE_KEY = "howToStudyBibleLessons";

export default function LessonsPage() {
  const [activeLesson, setActiveLesson] = useState<ActiveLesson>(null);
  const [completed, setCompleted] = useState<LessonCompletion>({
    intro: false,
    lesson1: false,
    lesson2: false,
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

  const introDone = completed.intro;
  const lesson1Done = completed.lesson1;
  const lesson2Done = completed.lesson2;

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
                How to Study the Bible
              </h1>
              <p className="text-sm text-slate-500">
                A short course to help you start reading the Bible with understanding.
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
            {/* Lesson 0 Intro */}
            <button
              type="button"
              onClick={() => setActiveLesson("intro")}
              className="w-full text-left group"
            >
              <div
                className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition ${
                  introDone
                    ? "bg-slate-50 border-slate-200 opacity-70"
                    : "bg-orange-50 border-orange-100 hover:shadow-md hover:bg-orange-100/60"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 0 • Intro
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Read this before starting the course. Check out this quick message first.
                  </p>
                </div>
                {introDone ? (
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

            {/* Lesson 1 What exactly is the Bible */}
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
                    Lesson 1 • What exactly is the Bible?
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    The Bible is not a normal book. Let us break down what it really is.
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

            {/* Lesson 2 Why study the Bible */}
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
                    Lesson 2 • Why study the Bible?
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    A real look at why serious Bible study matters for your peace, faith, and daily life.
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

            {/* Lesson 3 placeholder which Bible is best */}
            <button className="w-full text-left group" type="button">
              <div className="flex items-center justify-between rounded-2xl bg-pink-50 border border-pink-100 px-4 py-3 opacity-70">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lesson 3 • Which Bible is best for you?
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Coming soon. We will talk about different translations and how to choose one.
                  </p>
                </div>
                <span className="text-xs text-slate-400 border border-slate-300 rounded-full px-2 py-0.5">
                  Soon
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* INTRO MODAL */}
      {activeLesson === "intro" && (
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
              INTRO ✨
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Read this before starting the course.
            </p>

            {/* callout body */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-6 md:py-5 text-sm leading-relaxed text-slate-800 space-y-4">
              <p>
                Building your relationship with God starts with{" "}
                <span className="font-semibold">His Word</span>.
              </p>

              <p>
                No one can do that part for you. Your faith grows when{" "}
                <span className="italic">you</span> open the Bible and learn how
                to understand it.
              </p>

              <p>
                Many people struggle with Scripture because they were never
                shown <span className="italic">how</span> to read it. The Bible
                is deep, layered, and written in a world very different from
                ours, so feeling confused at first is completely normal.
              </p>

              <p>
                This course will give you a simple way to slow down, read with
                understanding, and begin seeing what God is saying to you
                personally. Every lesson in this course is designed to make the
                Bible clearer and more meaningful as you grow.
              </p>

              <div className="space-y-1">
                <p>Take your time.</p>
                <p>Read slowly.</p>
                <p>Take notes.</p>
                <p>Finish the course, and then begin your reading plan.</p>
              </div>

              <p className="font-semibold mt-2">
                Now let us begin with a simple but powerful question.
              </p>

              <p className="font-bold text-slate-900">
                What exactly is the Bible?
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
                onClick={() => markLessonDone("intro")}
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
              Lesson 1 • What exactly is the Bible?
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              The Bible is not a normal book. Let us break down what it really is.
            </p>

            {/* callout body */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-6 md:py-5 text-sm leading-relaxed text-slate-800 space-y-4">
              <p>
                The Bible is more than a book. It is{" "}
                <span className="font-semibold">God’s Word</span>, given to help
                us understand who He is, what He has done, and how He calls us
                to live. It is the foundation of the Christian faith and the
                primary way God speaks to His people today.
              </p>

              <p>
                The Bible was written over{" "}
                <span className="font-semibold">1500 years</span>, by more than{" "}
                <span className="font-semibold">40 authors</span>, across{" "}
                <span className="font-semibold">three continents</span>, in{" "}
                <span className="font-semibold">three languages</span>. These
                authors came from different backgrounds, kings, prophets,
                fishermen, shepherds, yet their writings come together as{" "}
                <span className="font-semibold">one united story</span>. That
                unity is not human skill. It is God’s plan.
              </p>

              <p>
                At the center of the Bible is a single message.
                <br />
                <span className="font-semibold">
                  God’s plan to rescue humanity.
                </span>
                <br />
                From Genesis to Revelation, Scripture shows God creating,
                redeeming, restoring, and inviting us into a relationship with
                Him through Jesus.
              </p>

              <div>
                <p className="mb-1">
                  The Bible contains many different types of writing.
                </p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>stories</li>
                  <li>poetry</li>
                  <li>laws</li>
                  <li>wisdom</li>
                  <li>letters</li>
                  <li>prophecy</li>
                </ul>
              </div>

              <p>
                Each part has a purpose. Some books teach us God’s commands.
                Some show us Israel’s history. Some give practical wisdom. The
                four Gospels reveal the life and ministry of Jesus Christ.
              </p>

              <p>
                What makes the Bible different from any other book is this.{" "}
                <span className="font-semibold">It is alive.</span> As you read,
                God uses His Word to guide you, convict you, encourage you, and
                shape your life. You can read the same passage at different
                times and see something new, because God meets you where you
                are.
              </p>

              <p>
                If you are looking for direction, peace, healing, or clarity,
                the Bible will speak to you. Not all at once and not instantly,
                but consistently as you return to it with an open heart.
              </p>

              <p className="mt-2">
                Now that you understand what the Bible is, we can move to the
                next step.
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
              Lesson 2 • Why study the Bible?
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Why going deep in Scripture matters for your peace, your faith, and your everyday life.
            </p>

            {/* callout body */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-6 md:py-5 text-sm leading-relaxed text-slate-800 space-y-4">
              <p>
                For a long time you carried loneliness, anxiety, and an empty feeling that nothing in this world could fix. When you gave your life to God and began to understand who He really is, that weight started to lift. The peace you had always chased finally became real.
              </p>

              <p>
                That is why serious Bible study matters. When God has done something for you that no person or achievement could ever do, you naturally want to know Him more. You want a real relationship, not just a quick prayer now and then. That relationship grows through His Word.
              </p>

              <p className="font-semibold">
                Reason one. To understand God’s story.
              </p>

              <p>
                If you want a relationship with God, you need to know who He is and what He has done. Podcasts, sermons, and videos can help, but they are highlights. The Bible is the full story. It is not a random collection of scenes. It is one connected story that reveals who God is, what He wants, and His plan for us.
              </p>

              <p>
                Imagine watching only a few clips from a movie instead of the whole thing. You would miss the big picture and have no context. In the same way, dipping in and out of random verses will never show you the full story of God. Studying the Bible from Genesis to Revelation shows how everything fits together and where your life fits in His plan.
              </p>

              <p className="font-semibold">
                Reason two. To know God’s Word, not just His story.
              </p>

              <p>
                The Bible is not only a story. It is God’s instruction, His wisdom, and His standard for how life is meant to be lived. Inside Scripture He shows you how to worship, how to treat people, how to handle money, sex, anger, forgiveness, and so much more.
              </p>

              <p>
                You cannot grow a real relationship with God while ignoring what He actually says. A pastor can point you in the right direction and a video can explain a passage, but nothing replaces you opening the Bible yourself and wrestling with His words. This book is God speaking directly to you, not through a manager or a middle man. Studying it shows you what matters to Him and what He expects from you as His child.
              </p>

              <p className="font-semibold">
                Reason three. To get guidance for real life.
              </p>

              <p>
                Giving your life to Jesus is not the finish line. It is the starting line. Old habits, temptations, and patterns do not disappear overnight. You will face pressure, pushback, and spiritual attack. You need more than motivation. You need guidance from God on how to think, how to respond, and how to keep walking with Him when it gets hard.
              </p>

              <p>
                Scripture gives that guidance. When you feel lost, angry, hurt, tempted, or ready to quit, the Bible shows you how to process those feelings in a way that honors God. It becomes the place you go first, instead of self help videos or random advice online. Over time you begin to see that there is always an answer in His Word, even when that answer is challenging.
              </p>

              <p className="mt-2">
                So why study the Bible. Because understanding God’s story gives your life meaning. Knowing His Word builds a real relationship with Him. And letting Scripture guide you day by day shapes how you live in every situation. This course will help you learn how to study that Word for yourself, not just listen to others talk about it.
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
    </div>
  );
}
