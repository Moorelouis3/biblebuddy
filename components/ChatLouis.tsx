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
        content:
          "Sorry, something went wrong. Please try again in a moment.",
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
          <LouisAvatar mood="bible" size={64} />
        </div>
      </button>

      {/* Chat panel - Facebook Messenger style */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-40 w-[420px] h-[600px] rounded-t-2xl bg-white border border-gray-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <LouisAvatar mood="bible" size={32} />
              <span className="text-base font-semibold text-gray-900">Chat with Louis</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-500 text-center">
                  Ask me a question about your Bible reading.
                </p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[75%] shadow-sm"
                      : "bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tl-sm max-w-[75%] shadow-sm"
                  }
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed break-words">
                    {m.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 rounded-b-2xl">
            <div className="flex gap-2 items-end">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isSending && handleSend()}
                placeholder="Ask a Bible question..."
                className="flex-1 text-sm border border-gray-300 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
              <button
                onClick={handleSend}
                disabled={isSending || !input.trim()}
                className="font-semibold bg-blue-600 text-white px-6 py-2.5 rounded-full disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
