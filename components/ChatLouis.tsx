"use client";

import { useState } from "react";
import { LouisAvatar } from "./LouisAvatar";

export function ChatLouis() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      {/* FLOATING AVATAR BUTTON */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="
          fixed bottom-4 right-4 z-50 
          rounded-full shadow-xl 
          hover:scale-105 transition
        "
        style={{
          width: 120,
          height: 120,
          padding: 0,
          border: "none",
          background: "transparent",
        }}
      >
        <LouisAvatar mood="smile" size={120} />
      </button>

      {/* CHAT PANEL */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 z-50 w-80 max-h-[70vh] rounded-2xl bg-white border border-gray-200 shadow-2xl flex flex-col">
          <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-semibold">Chat with Louis</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-500"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm">
            {messages.length === 0 && (
              <p className="text-xs text-gray-500">
                Ask me a question about your Bible reading.
              </p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <span
                  className={
                    m.role === "user"
                      ? "inline-block bg-blue-600 text-white px-3 py-2 rounded-2xl text-xs"
                      : "inline-block bg-gray-100 text-gray-800 px-3 py-2 rounded-2xl text-xs"
                  }
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 px-3 py-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a Bible question..."
              className="flex-1 text-xs border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              disabled={isSending}
              className="text-xs font-semibold bg-blue-600 text-white px-3 py-2 rounded-full disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
