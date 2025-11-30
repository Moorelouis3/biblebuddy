"use client";

import { useEffect, useRef, useState } from "react";
import { LouisAvatar } from "../../components/LouisAvatar";

type ChatMessage = {
  id: string;
  from: "louis" | "user";
  text: string;
};

const louisSteps: { mood: string; text: string }[] = [
  {
    mood: "wave",
    text:
      "Sooo, you just finished reading. Let us turn that into real notes together in here. We are going to walk through what you read one step at a time.",
  },
  {
    mood: "bible",
    text:
      "First, remind me what passage you were in. You can write something simple like Matthew 1 or John 3 or whatever you just read. If you want, add one short line about what this chapter was mainly about.",
  },
  {
    mood: "thinking",
    text:
      "Nice. Now let us talk about questions. What confused you, what names or phrases did not make sense, or what things do you want to look up or ask me about later from this chapter",
  },
  {
    mood: "wave",
    text:
      "Good stuff. Next part. When you think back on the chapter, what moments stood out to you What patterns or repeated ideas did you notice What felt heavy, encouraging, or surprising",
  },
  {
    mood: "pray",
    text:
      "Last step. In your own words, what do you think God is showing you through this chapter right now What does it say about God, about people, and about your own life in this season",
  },
  {
    mood: "sheesh",
    text:
      "That is it for now. Later I will help you format chats like this into one clean note so you can come back and read it again. For today, you can keep asking me more questions about this chapter or start a fresh note after you read the next one.",
  },
];

export default function NotesPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // on mount, drop the first Louis message
  useEffect(() => {
    const first = louisSteps[0];
    setMessages([
      {
        id: "louis-0",
        from: "louis",
        text: first.text,
      },
    ]);
    setStepIndex(1);
  }, []);

  // scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: `user-${Date.now()}`,
        from: "user",
        text: trimmed,
      },
    ];

    // decide if Louis should send the next guided message
    if (stepIndex < louisSteps.length) {
      const next = louisSteps[stepIndex];
      newMessages.push({
        id: `louis-${stepIndex}`,
        from: "louis",
        text: next.text,
      });
      setStepIndex(stepIndex + 1);
    }

    setMessages(newMessages);
    setInput("");
  }

  // pick mood for the last louis message so avatar matches the step
  function currentLouisMood() {
    const idx = Math.min(stepIndex, louisSteps.length - 1);
    return louisSteps[idx]?.mood || "bible";
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">Notes</h1>
        <p className="text-gray-700 mb-4">
          This is your space to talk through what you just read and turn it into
          real notes with me.
        </p>

        {/* LOUIS INTRO BUBBLE AT TOP */}
        <div className="mb-5 flex items-start gap-3">
          <LouisAvatar mood="wave" size={48} />
          <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
            <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
            <p className="mb-1">
              We are going to chat through your reading like we are texting.
            </p>
            <p className="text-[13px]">
              Answer my questions in the chat below and we will slowly build out
              your notes for this chapter together.
            </p>
          </div>
        </div>

        {/* BIG CHAT BOX */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6 flex flex-col min-h-[480px] max-h-[620px]">
          {/* chat header */}
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100 mb-3">
            <LouisAvatar mood={currentLouisMood()} size={40} />
            <div>
              <p className="text-sm font-semibold">Notes chat with Louis</p>
              <p className="text-[11px] text-gray-500">
                Type like you talk. I will guide you step by step.
              </p>
            </div>
          </div>

          {/* messages area */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            {messages.map((msg) =>
              msg.from === "louis" ? (
                <div key={msg.id} className="flex items-start gap-2 max-w-[80%]">
                  <LouisAvatar mood="bible" size={30} />
                  <div className="bg-gray-100 rounded-2xl px-3 py-2 text-[13px] text-gray-800 whitespace-pre-line">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id}
                  className="flex items-start gap-2 justify-end"
                >
                  <div className="bg-blue-600 text-white rounded-2xl px-3 py-2 text-[13px] max-w-[80%] whitespace-pre-line">
                    {msg.text}
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <form
            onSubmit={handleSubmit}
            className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your thoughts or questions here"
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 text-white text-xs px-4 py-2 hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* SMALL HINT UNDER CHAT */}
        <p className="mt-3 text-[11px] text-gray-500">
          Later we can save these chats as formatted notes for each chapter and
          connect this directly with the Study Buddy.
        </p>
      </div>
    </div>
  );
}
