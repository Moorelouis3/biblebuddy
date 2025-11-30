"use client";

import { useState, useEffect } from "react";
import { LouisAvatar } from "./LouisAvatar";

type StudyBuddyWidgetProps = {
  onClose: () => void;
};

export function StudyBuddyWidget({ onClose }: StudyBuddyWidgetProps) {
  const [visible, setVisible] = useState(false);

  // trigger the pop up animation on mount
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    // dark overlay on the whole screen
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
      {/* Chat card */}
      <div
        className={`w-full max-w-sm rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-200 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-blue-50">
          <div className="flex items-center gap-2">
            <LouisAvatar mood="thinking" size={32} />
            <div className="leading-tight">
              <p className="text-xs font-semibold">Bible Buddy</p>
              <p className="text-[11px] text-gray-600">
                Quick Bible questions with Louis
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-gray-500 hover:text-gray-700 px-2"
          >
            ✕
          </button>
        </div>

        {/* MESSAGES */}
        <div className="max-h-[260px] overflow-y-auto px-3 py-3 space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <LouisAvatar mood="wave" size={28} />
            <div className="bg-gray-100 rounded-2xl px-3 py-2">
              <p className="text-[13px] text-gray-800">
                I am here if you get stuck or have questions while you study.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="ml-auto bg-blue-600 text-white rounded-2xl px-3 py-2 max-w-[80%]">
              <p className="text-[13px]">
                How can I use this app to study the Bible better
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <LouisAvatar mood="bible" size={28} />
            <div className="bg-gray-100 rounded-2xl px-3 py-2">
              <p className="text-[13px] text-gray-800">
                Follow the reading plan, take notes, and use this chat when you
                want help. Start with Matthew and we will walk through it
                together.
              </p>
            </div>
          </div>
        </div>

        {/* INPUT */}
        <div className="border-top border-gray-200 px-3 py-2 bg-white">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your question here"
              className="flex-1 text-xs sm:text-[13px] rounded-full border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 text-white text-xs px-3 py-2 hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
