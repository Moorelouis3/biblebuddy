"use client";

import { useState } from "react";

type Slide = {
  title: string;
  text: string;
};

const slides: Slide[] = [
  {
    title: "Welcome to The Bible Study Buddy",
    text: "I built this to be the Bible study coach I wish I had when I started. In the next few cards I will show you how everything works.",
  },
  {
    title: "A Bible study system",
    text: "This is not just another Bible app, it is a simple system that walks you through Scripture with a coach beside you. We focus on clarity, consistency, and real understanding, not just checking boxes.",
  },
  {
    title: "Bible Lessons",
    text: "Here you will find short lessons that help you understand the Bible and how to study it. We start with basics like how the story fits together, how to highlight, and how to read with purpose.",
  },
  {
    title: "Bible Reading Plan",
    text: "This is not a random reading list that throws the whole Bible at you. We go chapter by chapter in a clear path that starts in Matthew and slowly opens the rest of the Bible.",
  },
  {
    title: "One chapter at a time",
    text: "You read one chapter, finish it, then unlock the next. No guilt if you miss a day, you always just continue where you stopped last time.",
  },
  {
    title: "Notes",
    text: "Every time you study you can write notes using the GROW method inside the app. All your questions, insights, and cross references stay in one place so you can return to them any time.",
  },
  {
    title: "Meet your study buddy",
    text: "This is where I live inside the app. I am Louis, your Bible study buddy, and my job is to help you understand what you read, ask good questions, and connect passages together.",
  },
  {
    title: "Ask me anything",
    text: "If you feel confused, tempted, or lost while reading, you can talk to me like you would text a friend. I will point you back to Scripture and help you keep moving.",
  },
  {
    title: "Watch your progress grow",
    text: "As you read the Bible the app tracks how much you have finished and shows your percent so far. One percent at a time you will see real progress instead of feeling stuck at the start line.",
  },
  {
    title: "Ready to start",
    text: "That is it. No pressure and no perfect plan, just one chapter at a time with a buddy in your corner. When you are ready, tap the button and we will start reading the Bible together.",
  },
];

export default function HowToUseLessonPage() {
  const [index, setIndex] = useState(0);

  const current = slides[index];
  const isLast = index === slides.length - 1;

  function handleNext() {
    if (!isLast) setIndex((i) => i + 1);
    // later you can redirect here when it is the last slide
    // for example: router.push("/dashboard")
  }

  function handleBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Progress text */}
        <p className="text-sm text-slate-500 mb-4 text-center">
          Lesson 1 of 1 • Card {index + 1} of {slides.length}
        </p>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          {/* Text side */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              {current.title}
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {current.text}
            </p>
          </div>

          {/* Louis avatar side */}
          <div className="flex justify-center md:justify-end flex-1">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100 flex items-center justify-center shadow-md">
              {/* Replace this emoji with your real avatar image later */}
              <span className="text-4xl md:text-5xl">🧢</span>
            </div>
          </div>
        </div>

        {/* Dots and buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {/* Dots */}
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <span
                key={i}
                className={
                  "h-2 w-2 rounded-full " +
                  (i === index ? "bg-blue-600" : "bg-slate-300")
                }
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              disabled={index === 0}
              className={`px-4 py-2 text-sm rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition ${
                index === 0 ? "opacity-40 cursor-default" : ""
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2.5 text-sm rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              {isLast ? "Start reading the Bible" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
