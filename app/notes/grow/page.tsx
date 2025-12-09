"use client";

import React, { useState, useEffect, useRef } from "react";
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

  function extractFormattedNote() {
    // Look for the final formatted GROW note in assistant messages
    // It should contain "GROW Study Notes" or the formatted structure
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.role === "assistant") {
        const content = msg.content;
        // Check if this is the final formatted note
        if (
          content.includes("GROW Study Notes") ||
          content.includes("📖 GROW Study Notes") ||
          (content.includes("📌 **Passage Text**") &&
            content.includes("📌 **Questions & Research**") &&
            content.includes("📌 **Journal Reflection**"))
        ) {
          return content;
        }
      }
    }
    return null;
  }

  function formatContent() {
    // Try to get the formatted note from AI
    const formattedNote = extractFormattedNote();
    if (formattedNote) {
      // Remove the "Would you like to save" question if present
      return formattedNote
        .replace(/Would you like to save this as your GROW Note\?/gi, "")
        .trim();
    }

    // Fallback: extract from conversation if formatted note not found
    const userMessages = messages.filter((m) => m.role === "user");
    const passage = userMessages[0]?.content || "";
    return `📖 GROW Study Notes\nPassage: ${passage}\n\nNote content from conversation.`;
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
    const formattedNote = extractFormattedNote();
    const noteContent = formattedNote || "No formatted note found. Please complete the GROW process.";

    // Parse the formatted note to display beautifully
    function renderFormattedNote(content: string) {
      // Clean up the content - remove "Would you like to save" question
      let cleaned = content
        .replace(/Would you like to save this as your GROW Note\?/gi, "")
        .trim();

      // Split into paragraphs (double line breaks)
      const paragraphs = cleaned.split(/\n\s*\n/).filter(p => p.trim());
      
      const elements: React.ReactElement[] = [];
      let currentSection: string[] = [];
      let inSection = false;

      for (const para of paragraphs) {
        const trimmed = para.trim();
        
        // Skip separator lines
        if (trimmed.match(/^=+$/)) {
          if (currentSection.length > 0) {
            elements.push(
              <div key={elements.length} className="mb-8">
                {currentSection.map((text, idx) => (
                  <p key={idx} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">
                    {text}
                  </p>
                ))}
              </div>
            );
            currentSection = [];
          }
          continue;
        }

        // Detect main title
        if (trimmed.includes("GROW Study Notes") || trimmed.includes("📖 GROW Study Notes")) {
          if (currentSection.length > 0) {
            elements.push(
              <div key={elements.length} className="mb-8">
                {currentSection.map((text, idx) => (
                  <p key={idx} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">
                    {text}
                  </p>
                ))}
              </div>
            );
            currentSection = [];
          }
          const title = trimmed.replace(/📖\s*/, "").replace(/\*\*/g, "");
          elements.push(
            <div key={elements.length} className="mb-6">
              <h3 className="text-2xl font-bold">{title}</h3>
            </div>
          );
          continue;
        }

        // Detect section headers
        if (trimmed.includes("📌 **Passage Text**") || 
            trimmed.includes("📌 **Questions & Research**") || 
            trimmed.includes("📌 **Journal Reflection**")) {
          if (currentSection.length > 0) {
            elements.push(
              <div key={elements.length} className="mb-8">
                {currentSection.map((text, idx) => (
                  <p key={idx} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">
                    {text}
                  </p>
                ))}
              </div>
            );
            currentSection = [];
          }
          const header = trimmed.replace(/📌\s*/, "").replace(/\*\*/g, "");
          elements.push(
            <div key={elements.length} className="mb-4 mt-6">
              <h4 className="font-semibold text-lg">{header}</h4>
            </div>
          );
          inSection = true;
          continue;
        }

        // Regular content
        if (trimmed) {
          currentSection.push(trimmed);
        }
      }

      // Add remaining content
      if (currentSection.length > 0) {
        elements.push(
          <div key={elements.length} className="mb-8">
            {currentSection.map((text, idx) => (
              <p key={idx} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">
                {text}
              </p>
            ))}
          </div>
        );
      }

      return elements.length > 0 ? elements : (
        <div className="text-gray-600 italic">
          {cleaned.split("\n").map((line, idx) => (
            <p key={idx} className="mb-3 leading-relaxed">{line || "\u00A0"}</p>
          ))}
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review</h2>
                <p className="text-gray-600 text-sm">Review your GROW note</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="prose prose-sm max-w-none">
                  {renderFormattedNote(noteContent)}
                </div>
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

