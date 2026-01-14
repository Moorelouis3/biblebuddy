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
  const [username, setUsername] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
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
        setUsername(name);
      }
    }
    loadUser();

    // Check if we're editing a note
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const editData = params.get("edit");
      
      if (editData) {
        try {
          const noteData = JSON.parse(decodeURIComponent(editData));
          setEditingNoteId(noteData.id);
          
          // Build context about the current note
          let noteContext = `Passage: ${noteData.book} ${noteData.chapter}:${noteData.verseFrom}${noteData.verseTo !== noteData.verseFrom ? `-${noteData.verseTo}` : ""}\n\n`;
          if (noteData.passage) {
            noteContext += `Current Passage Text:\n${noteData.passage}\n\n`;
          }
          if (noteData.research) {
            noteContext += `Current Questions & Research:\n${noteData.research}\n\n`;
          }
          if (noteData.write) {
            noteContext += `Current Reflection:\n${noteData.write}\n\n`;
          }
          
          // Start with edit message
          setMessages([
            {
              role: "assistant",
              content: `I see you want to edit your note for ${noteData.book} ${noteData.chapter}:${noteData.verseFrom}${noteData.verseTo !== noteData.verseFrom ? `-${noteData.verseTo}` : ""}.\n\nWhat would you like to change? You can ask me to rewrite your reflection, update your questions, or modify any part of your note.`,
            },
            {
              role: "user",
              content: `Here's my current note:\n\n${noteContext}`,
            },
          ]);
        } catch (e) {
          console.error("Error parsing edit data:", e);
          // Fall back to normal welcome
          setMessages([
            {
              role: "assistant",
              content:
                "Ready to dive into the Word? Tell me the passage, and we'll start your GROW process.",
            },
          ]);
        }
      } else {
        // Start with welcome message
        setMessages([
          {
            role: "assistant",
            content:
              "Ready to dive into the Word? Tell me the passage, and we'll start your GROW process.",
          },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function extractFormattedNote() {
    // Look for the final formatted GROW note in assistant messages
    // It should contain "GROW Study Notes" or the formatted structure
    // Check all assistant messages, not just the last one
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.role === "assistant") {
        const content = msg.content;
        // Check if this is the final formatted note (with or without pin emojis)
        // Look for the full structure with all three sections
        const hasPassageText = content.includes("**Passage Text**") || content.includes("Passage Text");
        const hasQuestions = content.includes("**Questions & Research**") || content.includes("Questions & Research");
        const hasReflection = content.includes("**Journal Reflection**") || content.includes("Journal Reflection");
        
        // Also check if message contains "Are you happy" which indicates W step completion
        const hasHappyQuestion = content.toLowerCase().includes("are you happy");
        
        if (
          content.includes("GROW Study Notes") ||
          content.includes("📖 GROW Study Notes") ||
          (hasPassageText && hasQuestions && hasReflection) ||
          (hasHappyQuestion && (hasReflection || content.length > 200))
        ) {
          return content;
        }
      }
    }
    return null;
  }

  // Simple function to extract note data from user messages without parsing
  function extractNoteData() {
    const userMessages = messages.filter((m) => m.role === "user");
    
    if (userMessages.length === 0) {
      return null;
    }
    
    let book = "";
    let chapter = 1;
    let verseFrom = 1;
    let verseTo = 1;
    let passageText = "";
    let research = "";
    let reflection = "";
    
    // Extract passage reference from first user message
      const firstMsg = userMessages[0].content;
      const passageMatch = firstMsg.match(/([A-Za-z\s]+?)\s+(\d+):(\d+)(?:-(\d+))?/);
      if (passageMatch) {
        book = passageMatch[1].trim();
        chapter = parseInt(passageMatch[2]) || 1;
        verseFrom = parseInt(passageMatch[3]) || 1;
        verseTo = parseInt(passageMatch[4]) || verseFrom;
    }
    
    // Find the "are you happy" message to identify where the reflection is
    let happyMessageIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant" && messages[i].content.toLowerCase().includes("are you happy")) {
        happyMessageIndex = i;
        break;
      }
    }
    
    // Extract reflection: the last user message before "are you happy" (if found)
    // Otherwise, use the last user message
    if (happyMessageIndex > 0) {
      for (let i = happyMessageIndex - 1; i >= 0; i--) {
        if (messages[i].role === "user" && messages[i].content.trim().length > 10) {
          reflection = messages[i].content.trim();
          break;
        }
      }
    } else if (userMessages.length > 1) {
      // Use the last user message as reflection
      reflection = userMessages[userMessages.length - 1].content.trim();
    }
    
    // Extract research: collect all user messages between first and last (questions/research)
    if (userMessages.length > 2) {
      const researchMessages = userMessages.slice(1, -1);
      research = researchMessages
        .map(m => m.content.trim())
        .filter(m => m.length > 0)
        .join("\n\n");
    }
    
    // Passage text: try to find it in assistant messages, otherwise leave empty
    // Look for verses with [01], [02] format
    for (const msg of messages) {
      if (msg.role === "assistant") {
        const verseLines = msg.content
          .split('\n')
          .filter(line => line.trim().match(/^\[\d+\]/))
          .join('\n');
        if (verseLines) {
          passageText = verseLines.trim();
          break;
        }
      }
    }
    
    return {
      book,
      chapter,
      verseFrom,
      verseTo,
      passage: passageText,
      research,
      observe: "", // O step is not saved separately
      write: reflection,
    };
  }

  function formatContent() {
    // Try to get the formatted note from AI
    const formattedNote = extractFormattedNote();
    if (formattedNote) {
      // Remove the "Would you like to save" question and equals sign lines
      return formattedNote
        .replace(/Would you like to save this as your GROW Note\?/gi, "")
        .replace(/^=+$/gm, "")
        .replace(/\n=+\s*$/g, "")
        .trim();
    }

    // Fallback: extract from conversation if formatted note not found
    const userMessages = messages.filter((m) => m.role === "user");
    const passage = userMessages[0]?.content || "";
    return `📖 GROW Study Notes\nPassage: ${passage}\n\nNote content from conversation.`;
  }

  function filterMessageForDisplay(content: string): string {
    // If the message contains the full formatted note structure, show only the reflection part
    // and the question, hiding the full note structure
    const hasFullNote = content.includes("📖 GROW Study Notes") || 
                        (content.includes("**Passage Text**") && 
                         content.includes("**Questions & Research**") && 
                         content.includes("**Journal Reflection**"));
    
    if (hasFullNote) {
      // Find where the full formatted note structure starts
      // Look for the pattern: "=====================================================================" followed by "📖 GROW Study Notes"
      const fullNotePattern = /(?:^|\n)={10,}\s*\n\s*📖 GROW Study Notes/i;
      const fullNoteMatch = content.match(fullNotePattern);
      
      if (fullNoteMatch && fullNoteMatch.index !== undefined) {
        // Return only the part before the full note structure (reflection + question)
        const visiblePart = content.substring(0, fullNoteMatch.index).trim();
        // Make sure we include the question
        if (visiblePart.includes("Are you happy") || visiblePart.includes("Save Note Now")) {
          return visiblePart;
        }
      }
      
      // Alternative: look for "**Passage Text**" as the start of the full structure
      const passageTextPattern = /\*\*Passage Text\*\*/i;
      const passageTextIndex = content.search(passageTextPattern);
      
      if (passageTextIndex > 0) {
        // Get everything before the full structure
        const beforeStructure = content.substring(0, passageTextIndex).trim();
        
        // Make sure we have the reflection and question
        if (beforeStructure.includes("Are you happy") || beforeStructure.length > 50) {
          return beforeStructure;
        }
      }
      
      // If we can't find the structure start, try to find "Are you happy" and show everything up to that plus a bit after
      const happyIndex = content.toLowerCase().indexOf("are you happy");
      if (happyIndex > 0) {
        // Get the question and a bit after it, but stop before the full structure
        const questionEnd = content.indexOf("=====================================================================", happyIndex);
        if (questionEnd > happyIndex) {
          return content.substring(0, questionEnd).trim();
        }
        // If no structure found after, get up to 500 chars after "are you happy"
        const endIndex = Math.min(happyIndex + 500, content.length);
        return content.substring(0, endIndex).trim();
      }
    }
    
    // If no full note structure, return content as-is
    return content;
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

      // Check if assistant is asking if user is happy with the formatted reflection
      const lowerContent = assistantMessage.content.toLowerCase();
      const isAskingIfHappy = 
        lowerContent.includes("are you happy") ||
        lowerContent.includes("click 'save note now'") ||
        lowerContent.includes("click \"save note now\"") ||
        lowerContent.includes("save note now") ||
        lowerContent.includes("no, keep editing");
      
      // Show save button when AI asks if they're happy
      if (isAskingIfHappy) {
        console.log("Showing save button - detected happy question");
        setShowSaveButton(true);
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
    if (!userId) {
      alert("You must be logged in to save notes.");
      return;
    }
    setSaving(true);

    try {
      console.log("Starting save process...");
      console.log("Total messages:", messages.length);
      console.log("Messages with 'are you happy':", messages.filter(m => m.content.toLowerCase().includes("are you happy")).length);
      
      // Extract note data from user messages (simple text extraction, no parsing)
      const noteData = extractNoteData();
      
      if (!noteData || !noteData.book) {
        console.error("Could not extract passage reference from messages");
        // Silently log and try to save with what we have
        if (!noteData) {
        setSaving(false);
        return;
        }
      }

      // Ensure we have at least reflection (required field)
      if (!noteData.write || noteData.write.trim().length === 0) {
        // If no reflection found, use the last user message as fallback
        const userMessages = messages.filter((m) => m.role === "user");
        if (userMessages.length > 0) {
          noteData.write = userMessages[userMessages.length - 1].content.trim();
        }
        
        // If still no reflection, log error but don't block saving
        if (!noteData.write || noteData.write.trim().length === 0) {
          console.error("No reflection found, but saving anyway with empty reflection");
          noteData.write = "";
        }
      }

      console.log("Saving to Supabase:", {
        user_id: userId,
        book: noteData.book,
        chapter: noteData.chapter,
        verse_from: noteData.verseFrom,
        verse_to: noteData.verseTo,
        passage: noteData.passage?.substring(0, 50) + "..." || "EMPTY",
        research: noteData.research?.substring(0, 50) + "..." || "EMPTY",
        write: noteData.write?.substring(0, 50) + "...",
      });

      // If editing, update existing note; otherwise insert new one
      if (editingNoteId) {
        const { data, error } = await supabase
          .from("notes")
          .update({
            book: noteData.book,
            chapter: noteData.chapter,
            verse_from: noteData.verseFrom,
            verse_to: noteData.verseTo,
            passage: noteData.passage || "",
            research: noteData.research || "",
            observe: noteData.observe || "",
            write: noteData.write || "",
          })
          .eq("id", Number(editingNoteId))
          .eq("user_id", userId)
          .select();

        if (error) {
          console.error("Error updating note:", error);
          // Silently log error, don't show alert
          setSaving(false);
          return;
        }

        console.log("Note updated successfully:", data);
        router.push("/notes");
      } else {
        const { data, error } = await supabase.from("notes").insert({
          user_id: userId,
          book: noteData.book,
          chapter: noteData.chapter,
          verse_from: noteData.verseFrom,
          verse_to: noteData.verseTo,
          passage: noteData.passage || "",
          research: noteData.research || "",
          observe: noteData.observe || "",
          write: noteData.write || "",
        }).select();

        if (error) {
          console.error("Error saving note:", error);
          // Silently log error, don't show alert
          setSaving(false);
          return;
        }

        console.log("Note saved successfully:", data);

        // ACTION TRACKING: Insert into master_actions
        // Always fetch username fresh from auth to ensure we have the correct value
        const { data: { user: authUser } } = await supabase.auth.getUser();
        let actionUsername = "User"; // Default fallback
        
        if (authUser) {
          const meta: any = authUser.user_metadata || {};
          actionUsername =
            meta.firstName ||
            meta.first_name ||
            (authUser.email ? authUser.email.split("@")[0] : null) ||
            "User";
        }

        // Insert into master_actions (note_created has no action_label)
        console.log("[MASTER_ACTIONS] inserting:", { action_type: "note_created", action_label: null });
        const { error: actionError } = await supabase
          .from("master_actions")
          .insert({
            user_id: userId,
            username: actionUsername ?? null,
            action_type: "note_created",
          });

        if (actionError) {
          console.error("Error logging action to master_actions:", actionError);
          console.error("Attempted username:", actionUsername);
          // Don't block the UI - continue even if action logging fails
        } else {
          console.log(`[MASTER_ACTIONS] Successfully logged note_created with username: ${actionUsername}`);
        }

        // UPDATE profile_stats: Count from notes table
        // Get username if not already loaded
        let statsUsername = username;
        if (!statsUsername && userId) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const meta: any = user.user_metadata || {};
            statsUsername =
              meta.firstName ||
              meta.first_name ||
              (user.email ? user.email.split("@")[0] : null) ||
              "User";
          }
        }

        // Count all notes rows for this user
        const { count, error: countError } = await supabase
          .from("notes")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId);

        if (countError) {
          console.error("Error counting notes:", countError);
          // Don't block UI - continue even if count fails
        } else {
          console.log(`[NOTES CREATED] Count from database: ${count}`);
          
          // Get existing username if available
          const { data: currentStats } = await supabase
            .from("profile_stats")
            .select("username, chapters_completed_count, people_learned_count, places_discovered_count, keywords_mastered_count")
            .eq("user_id", userId)
            .maybeSingle();

          const finalUsername = currentStats?.username || statsUsername || "User";
          
          // Calculate total_actions as sum of all counts
          const totalActions = 
            (currentStats?.chapters_completed_count || 0) +
            (count || 0) +
            (currentStats?.people_learned_count || 0) +
            (currentStats?.places_discovered_count || 0) +
            (currentStats?.keywords_mastered_count || 0);

          // Update profile_stats with the count
          const { error: statsError } = await supabase
            .from("profile_stats")
            .upsert(
              {
                user_id: userId,
                notes_created_count: count || 0,
                total_actions: totalActions,
                username: finalUsername,
                updated_at: new Date().toISOString(),
              },
              {
                onConflict: "user_id",
              }
            );

          if (statsError) {
            console.error("Error updating profile_stats:", statsError);
            // Don't block UI - continue even if stats update fails
          } else {
            console.log(`[PROFILE_STATS] Successfully updated notes_created_count to ${count}`);
          }
        }

        router.push("/notes");
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert(`Failed to save note: ${error.message || "Unknown error"}`);
      setSaving(false);
    }
  }

  if (showReview) {
    const formattedNote = extractFormattedNote();
    const noteContent = formattedNote || "No formatted note found. Please complete the GROW process.";

    // Parse the formatted note to display beautifully
    function renderFormattedNote(content: string) {
      // Clean up the content - remove "Would you like to save" question and equals signs
      let cleaned = content
        .replace(/Would you like to save this as your GROW Note\?/gi, "")
        .replace(/^=+$/gm, "")
        .replace(/\n=+\s*$/g, "")
        .trim();

      const elements: React.ReactElement[] = [];
      
      // Extract and render Passage Text section
      const passageMatch = cleaned.match(/\*\*Passage Text\*\*([\s\S]*?)(?=\*\*Questions|$)/i);
      if (passageMatch) {
        const passageContent = passageMatch[1].trim();
        elements.push(
          <div key="passage" className="mb-8">
            <h1 className="text-2xl font-bold mb-4">📖 Passage</h1>
            <div className="space-y-2">
              {passageContent.split("\n").filter(l => l.trim()).map((line, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        );
      }

      // Extract and render Questions & Research section
      const researchMatch = cleaned.match(/\*\*Questions & Research\*\*([\s\S]*?)(?=\*\*Journal|$)/i);
      if (researchMatch) {
        const researchContent = researchMatch[1].trim();
        elements.push(
          <div key="research" className="mb-8">
            <h1 className="text-2xl font-bold mb-4">❓ Questions</h1>
            <div className="space-y-4">
              {researchContent.split("\n").filter(l => l.trim()).map((line, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        );
      }

      // Extract and render Journal Reflection section (stop at equals signs)
      const reflectionMatch = cleaned.match(/\*\*Journal Reflection\*\*([\s\S]*?)(?=\n*=+|$)/i);
      if (reflectionMatch) {
        let reflectionContent = reflectionMatch[1].trim();
        // Remove any equals sign lines and trailing separators
        reflectionContent = reflectionContent.replace(/^=+$/gm, "").replace(/\n=+\s*$/g, "").trim();
        // Split into paragraphs for better formatting
        const paragraphs = reflectionContent.split(/\n\s*\n/).filter(p => p.trim());
        elements.push(
          <div key="reflection" className="mb-8">
            <h1 className="text-2xl font-bold mb-4">✍️ Reflection</h1>
            <div className="space-y-4">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </div>
        );
      }

      // If no sections found, render as plain text
      if (elements.length === 0) {
        return (
          <div className="text-gray-600">
            {cleaned.split("\n").map((line, idx) => (
              <p key={idx} className="mb-3 leading-relaxed whitespace-pre-line">
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        );
      }

      return elements;
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
          {messages.map((m, i) => {
            // Filter assistant messages to hide full formatted note structure
            const displayContent = m.role === "assistant" 
              ? filterMessageForDisplay(m.content)
              : m.content;
            
            return (
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
                  {displayContent}
                </span>
              </div>
            );
          })}
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
          {showSaveButton ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 flex items-center gap-2"
              >
                <span>←</span>
                <span>{saving ? "Saving..." : "Save Note Now"}</span>
              </button>
              <button
                onClick={() => setShowSaveButton(false)}
                className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700"
              >
                No, keep editing
              </button>
            </div>
          ) : (
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

