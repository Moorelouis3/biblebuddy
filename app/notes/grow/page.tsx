"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { LouisAvatar } from "../../../components/LouisAvatar";

type MessageRole = "user" | "assistant";

type Message = {
  role: MessageRole;
  content: string;
};

export default function GrowNotePage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
        const meta = data.user.user_metadata || {};
        const name =
          meta.first_name ||
          meta.firstName ||
          (data.user.email ? data.user.email.split("@")[0] : "User");
        setDisplayName(name);
      }
    }
    loadUser();

    // Start with welcome message
    setMessages([
      {
        role: "assistant",
        content:
          "Ready to dive into the Word? Tell me the passage, and we'll start your GROW process.",
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function extractGrowData() {
    let passage = "";
    let gText = "";
    let rText = "";
    let oText = "";
    let wText = "";

    // Extract passage from first user message (should be the passage reference)
    const userMessages = messages.filter((m) => m.role === "user");
    if (userMessages.length > 0) {
      passage = userMessages[0]?.content || "";
    }

    // Look for GROW step indicators in assistant messages and extract corresponding user responses
    let currentStep = "";
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (msg.role === "assistant") {
        const content = msg.content.toLowerCase();
        if (content.includes("get the passage") || content.includes("g –") || content.includes("g:")) {
          currentStep = "g";
        } else if (content.includes("research") && !content.includes("get")) {
          currentStep = "r";
        } else if (content.includes("observe")) {
          currentStep = "o";
        } else if (content.includes("write") && !content.includes("observe")) {
          currentStep = "w";
        }
      } else if (msg.role === "user" && currentStep && i > 0) {
        // This is a user response to a GROW step
        if (currentStep === "g") {
          gText = msg.content;
        } else if (currentStep === "r") {
          rText = msg.content;
        } else if (currentStep === "o") {
          oText = msg.content;
        } else if (currentStep === "w") {
          wText = msg.content;
        }
      }
    }

    // Fallback: if we can't extract properly, use sequential user messages
    if (!gText && userMessages.length > 1) {
      gText = userMessages[1]?.content || "";
    }
    if (!rText && userMessages.length > 2) {
      rText = userMessages[2]?.content || "";
    }
    if (!oText && userMessages.length > 3) {
      oText = userMessages[3]?.content || "";
    }
    if (!wText && userMessages.length > 4) {
      wText = userMessages[4]?.content || "";
    }

    return { passage, gText, rText, oText, wText };
  }

  function formatContent() {
    const { passage, gText, rText, oText, wText } = extractGrowData();
    return `📖 ${passage}

G – Get the Passage
${gText}

R – Research
${rText}

O – Observe
${oText}

W – Write
${wText}`;
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages: Message[] = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsSending(true);

    try {
      // Add GROW context to the messages
      const growContextMessage: Message = {
        role: "assistant",
        content:
          "You are helping the user create a GROW note. Guide them through G (Get the passage), R (Research), O (Observe), and W (Write) steps. After they complete all steps, help them review and save their note.",
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          growMode: true,
        }),
      });

      if (!res.ok) {
        let errorData: any = {};
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          try {
            errorData = await res.json();
          } catch (e) {
            console.error("Failed to parse error response as JSON:", e);
          }
        } else {
          const text = await res.text().catch(() => "");
          console.error("Non-JSON error response:", text);
        }
        
        console.error("API error response:", {
          status: res.status,
          statusText: res.statusText,
          error: errorData,
        });
        
        const errorMsg = errorData.error?.message || 
                        errorData.reply || 
                        errorData.error || 
                        res.statusText || 
                        "Internal Server Error";
        
        throw new Error(`HTTP ${res.status}: ${errorMsg}`);
      }

      const data = await res.json();
      console.log("API response:", data);

      if (data.error) {
        console.error("API returned error:", data.error);
        throw new Error(data.error.message || "API error");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply ?? "Sorry, I did not understand that.",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Check if assistant suggests review or we have enough content
      const lowerContent = assistantMessage.content.toLowerCase();
      if (
        lowerContent.includes("review") ||
        lowerContent.includes("save") ||
        newMessages.filter((m) => m.role === "user").length >= 5
      ) {
        // Don't auto-show, but allow manual review
      }
    } catch (err: any) {
      console.error("Error in handleSend:", err);
      const errorMessage: Message = {
        role: "assistant",
        content:
          err?.message?.includes("HTTP") || err?.message?.includes("API")
            ? `Error: ${err.message}`
            : "Sorry, something went wrong. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }

  async function handleSave() {
    if (!userId) return;
    setSaving(true);

    try {
      const content = formatContent();

      const { error } = await supabase.from("notes").insert({
        user_id: userId,
        display_name: displayName,
        content: content,
        note_type: "GROW",
      });

      if (error) {
        console.error("Error saving note:", error);
        alert("Failed to save note. Please try again.");
        setSaving(false);
        return;
      }

      router.push("/notes");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save note. Please try again.");
      setSaving(false);
    }
  }

  if (showReview) {
    const { passage, gText, rText, oText, wText } = extractGrowData();
    return (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review</h2>
                <p className="text-gray-600 text-sm">Review your GROW note</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">📖 {passage}</h3>
                </div>
                {gText && (
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1">
                      G – Get the Passage
                    </h4>
                    <p className="whitespace-pre-line text-gray-700">{gText}</p>
                  </div>
                )}
                {rText && (
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1">
                      R – Research
                    </h4>
                    <p className="whitespace-pre-line text-gray-700">{rText}</p>
                  </div>
                )}
                {oText && (
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1">
                      O – Observe
                    </h4>
                    <p className="whitespace-pre-line text-gray-700">{oText}</p>
                  </div>
                )}
                {wText && (
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1">
                      W – Write
                    </h4>
                    <p className="whitespace-pre-line text-gray-700">{wText}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowReview(false)}
                  className="px-6 py-3 border rounded-full font-semibold hover:bg-gray-50"
                >
                  ← Back to Chat
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LouisAvatar mood="bible" size={40} />
            <span className="text-lg font-semibold">Lil Louis</span>
          </div>
          <button
            onClick={() => router.push("/notes")}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start items-start gap-3"
              }
            >
              {m.role === "assistant" && (
                <LouisAvatar mood="bible" size={32} />
              )}
              <span
                className={
                  m.role === "user"
                    ? "inline-block bg-blue-600 text-white px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-line leading-relaxed"
                    : "inline-block bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-line leading-relaxed"
                }
              >
                {m.content}
              </span>
            </div>
          ))}
          {isSending && (
            <div className="flex justify-start items-start gap-3">
              <LouisAvatar mood="think" size={32} />
              <span className="inline-block bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl">
                Thinking...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !isSending && handleSend()
              }
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              disabled={isSending || !input.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Send
            </button>
            {messages.filter((m) => m.role === "user").length >= 2 && (
              <button
                onClick={() => setShowReview(true)}
                className="px-4 py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 text-sm"
              >
                Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

