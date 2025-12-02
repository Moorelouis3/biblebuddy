// components/ChatLouis.tsx
"use client";

import { useState } from "react";
import { LouisAvatar } from "./LouisAvatar";

type MessageRole = "user" | "assistant";

type Message = {
  role: MessageRole;
  content: string;
};

export function ChatLouis() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages: Message[] = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply ?? "Sorry, I did not understand that.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      {/* Floating avatar button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-40 rounded-full shadow-xl flex items-center justify-center"
        aria-label="Chat with Louis"
      >
        <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center">
          {/* avatar is already circular; we just size its container */}
          <LouisAvatar mood="bible" size={64} />
        </div>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-28 right-4 z-40 w-80 max-h-[70vh] rounded-2xl bg-white border border-gray-200 shadow-2xl flex flex-col">
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
              onKeyDown={(e) => e.key === "Enter" && !isSending && handleSend()}
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
