"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";

export default function ChapterNotesPage() {
  const params = useParams();
  const router = useRouter();
  const book = String(params.book);
  const chapter = Number(params.chapter);

  const [notesText, setNotesText] = useState<string>("");
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  // Get book display name (capitalize first letter of each word)
  const bookDisplayName = book
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  function goToChapter() {
    router.push(`/Bible/${book}/${chapter}`);
  }

  function goHome() {
    router.push("/dashboard");
  }

  function buildPrompt() {
    return `
You are Little Louis. Generate beginner friendly notes for ${bookDisplayName} chapter ${chapter} using this exact template and rules.

TEMPLATE
# 🧠 Big Idea of the Chapter
One short paragraph explaining the heart of the chapter in simple English.

# 🎬 What's Happening…
Include three or four cinematic story movements. Each movement follows:
[Emoji] **Story Moment Title** (ALWAYS bold the story moment title with **)
A short paragraph of three to four sentences explaining what happens and why it matters. Smooth, simple, friendly language. Do not use hyphens. Do not break the story into too many pieces. Keep it beginner friendly and emotional.
IMPORTANT: Every subsection title under "What's Happening" MUST be wrapped in **bold** markdown. Example: 🌳 **Family Tree of Jesus** (not just 🌳 Family Tree of Jesus).

# 📌 Key Themes
List two or three themes. Each theme is one short sentence.

# 🔗 Connections to the Bigger Story
List one or two simple connections to prophecy, covenant, or Jesus mission. Extremely beginner friendly.

# 🙌 Simple Life Application
A short paragraph of three to four sentences explaining what this chapter shows about God, about Jesus, and about what the reader is invited to believe or do.

# 🏁 One Sentence Summary
A final strong sentence that captures the message.

RULES
DO NOT include a top-level header like "${bookDisplayName} Chapter ${chapter} Notes" or any chapter title at the beginning. Start directly with "# 🧠 Big Idea of the Chapter".
Keep emojis in the headers. Use proper markdown formatting:
- "Big Idea of the Chapter" should be formatted as # (h1)
- "What's Happening" should be formatted as # (h1)
- "Key Themes" should be formatted as # (h1)
- "Connections to the Bigger Story" should be formatted as # (h1)
- "Simple Life Application" should be formatted as # (h1)
- "One Sentence Summary" should be formatted as # (h1)
No numbers in section headers. No hyphens anywhere in the text. No images. No Greek or Hebrew words. No deep theological commentary. Keep it cinematic, warm, simple. Do not overwhelm beginners.
    `;
  }

  // Clean up generated notes to remove ONLY the top-level chapter header
  // Preserves "What's Happening..." and all other section headers
  function cleanNotesText(text: string): string {
    let cleaned = text.trim();

    // Split by lines to process more carefully
    const lines = cleaned.split("\n");
    const cleanedLines: string[] = [];
    let foundBigIdea = false;
    let skipUntilBigIdea = true;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Skip empty lines at the start
      if (skipUntilBigIdea && !trimmedLine) {
        continue;
      }

      // Check if this is the top-level chapter header we want to remove
      const isChapterHeader =
        trimmedLine.match(
          new RegExp(`.*${bookDisplayName}.*[Cc]hapter.*${chapter}.*[Nn]otes.*`, "i")
        ) ||
        trimmedLine.match(/^🌟\s*.*[Cc]hapter.*[Nn]otes.*$/i) ||
        (trimmedLine.startsWith("#") &&
          trimmedLine.match(
            new RegExp(`.*${bookDisplayName}.*[Cc]hapter.*${chapter}.*`, "i")
          ));

      // If we find the Big Idea section (🧠), start including lines.
      // Support both:
      // - "🧠 Big Idea of the Chapter"
      // - "# 🧠 Big Idea of the Chapter"
      const isBigIdeaHeader =
        trimmedLine.startsWith("🧠") || /^#+\s*🧠/.test(trimmedLine);

      if (isBigIdeaHeader) {
        foundBigIdea = true;
        skipUntilBigIdea = false;
        cleanedLines.push(line);
        continue;
      }

      // Skip chapter header lines (only before Big Idea is found)
      if (skipUntilBigIdea && isChapterHeader) {
        continue;
      }

      // Once we've found Big Idea, include all lines (preserves What's Happening...)
      if (foundBigIdea || !skipUntilBigIdea) {
        cleanedLines.push(line);
      }
    }

    cleaned = cleanedLines.join("\n").trim();

    // Final safety check: ensure it starts with Big Idea
    if (!cleaned.startsWith("🧠") && !cleaned.startsWith("#")) {
      const bigIdeaIndex = cleaned.indexOf("🧠");
      if (bigIdeaIndex > 0) {
        cleaned = cleaned.substring(bigIdeaIndex);
      }
    }

    // Normalize the Big Idea header so it is always H1: "# 🧠 Big Idea of the Chapter"
    cleaned = cleaned.replace(
      /^#+\s*🧠/m,
      "# 🧠"
    );

    return cleaned.trim();
  }

  async function loadOrGenerateNotes() {
    // Prevent double execution in React Strict Mode
    if (loadingRef.current) {
      return;
    }
    loadingRef.current = true;

    try {
      setLoadingNotes(true);
      setNotesError(null);

      // 1) Check Supabase for existing notes FIRST
      const { data: existing, error: existingError } = await supabase
        .from("bible_notes")
        .select("id, notes_text")
        .eq("book", book)
        .eq("chapter", chapter)
        .maybeSingle();

      if (existingError) {
        console.warn("Error checking bible_notes", existingError);
      }

      if (existing?.notes_text && existing.notes_text.trim().length > 0) {
        // Found in Supabase - use it, DO NOT call OpenAI
        // Clean it in case it was generated with old format
        const cleaned = cleanNotesText(existing.notes_text);
        setNotesText(cleaned);
        setLoadingNotes(false);
        loadingRef.current = false;
        return;
      }

      // 2) Only generate if NOT found in Supabase
      const prompt = buildPrompt();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API response error:", errorText);
        throw new Error(`Failed to generate notes: ${response.statusText}. ${errorText}`);
      }

      const json = await response.json();
      let generated = (json?.reply as string) ?? "";

      if (!generated || generated.trim().length === 0) {
        throw new Error("Generated notes are empty. Please check your OpenAI API key.");
      }

      // Enforce the no-hyphen rule just in case
      generated = generated.replace(/-/g, " ");

      // Clean up: remove any top-level headers that AI might have generated
      generated = cleanNotesText(generated);

      // IMPORTANT: Display notes immediately after generation
      // Saving happens AFTER displaying - don't let save failures block rendering
      setNotesText(generated);
      setLoadingNotes(false); // Stop loading so notes display immediately

      // 3) Attempt to save to Supabase AFTER displaying notes:
      // - If a row exists (even with empty notes_text), UPDATE it
      // - Otherwise INSERT a new row
      if (existing?.id) {
        const { error: updateError } = await supabase
          .from("bible_notes")
          .update({ notes_text: generated })
          .eq("id", existing.id);

        if (updateError) {
          console.error("Error updating notes in bible_notes:", updateError);
        } else {
          console.log("Successfully updated notes in Supabase for existing row:", existing.id);
        }
      } else {
        const { error: insertError } = await supabase
          .from("bible_notes")
          .insert([
            {
              book,
              chapter,
              notes_text: generated,
            },
          ]);

        if (insertError) {
          console.error("Error saving notes to bible_notes:", insertError);
        } else {
          console.log("Successfully inserted notes into Supabase");
        }
      }

      // 4) Re-fetch from database after insert/update attempt to verify actual state
      // UI state should be derived from database, not from insert response
      const { data: savedRow, error: fetchError } = await supabase
        .from("bible_notes")
        .select("notes_text")
        .eq("book", book)
        .eq("chapter", chapter)
        .maybeSingle();

      if (fetchError) {
        console.warn("Error re-fetching notes after save:", fetchError);
      }

      // 5) If row exists in database after save attempt, use database state
      // This ensures UI is in sync with actual database state
      // Note: Verification failures are logged internally, not shown to users
      if (savedRow?.notes_text && savedRow.notes_text.trim().length > 0) {
        // Row exists in DB - use database state, clear any errors
        const cleaned = cleanNotesText(savedRow.notes_text);
        setNotesText(cleaned);
        setNotesError(null); // Clear error since row exists in DB
        console.log("Notes successfully saved and verified in database");
      } else {
        // Row doesn't exist in DB after save attempt - log internally only
        // Do NOT show warning to users - persistence is an internal concern
        console.warn("Notes verification failed: Row not found in database after save attempt", { book, chapter });
        // Keep the generated notes displayed - don't set an error
        // Verification failures will be visible to admins on Analytics page
      }
    } catch (err: any) {
      console.error("Error loading or generating notes", err);
      setNotesError(err?.message || "Failed to load notes");
    } finally {
      setLoadingNotes(false);
      loadingRef.current = false;
    }
  }

  useEffect(() => {
    loadOrGenerateNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, chapter]);

  return (
    <div className="fixed inset-0 z-40 bg-black/70 flex items-start justify-center overflow-y-auto p-4 py-10">
      {/* outer white card */}
      <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3 mb-10">
        {/* close button */}
        <button
          onClick={() => router.back()}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* inner light blue column */}
        <div className="rounded-3xl bg-blue-50 px-4 md:px-6 py-5 md:py-7">
          {/* header */}
          <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <span>⭐</span>
            <span>{bookDisplayName} Chapter {chapter} Notes</span>
          </h1>

          {/* NOTES CALL OUT */}
          <section className="mb-8 md:mb-10">
            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 md:p-6 max-h-[60vh] overflow-y-auto text-sm md:text-base leading-relaxed text-gray-800 space-y-4">
              {loadingNotes && (
                <p className="text-gray-600">Generating notes...</p>
              )}

              {/* Display notes if they exist - no persistence warnings shown to users */}
              {!loadingNotes && notesText && (
                <div className="prose prose-sm md:prose-base max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1 className="text-xl md:text-2xl font-bold mt-6 mb-4 text-gray-900" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-4 leading-relaxed" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-bold" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="ml-4" {...props} />
                        ),
                      }}
                    >
                      {notesText}
                    </ReactMarkdown>
                  </div>
                </>
              )}

              {/* Show error only if no notes are available */}
              {!loadingNotes && !notesText && notesError && (
                <p className="text-red-600">{notesError}</p>
              )}
            </div>
          </section>

          {/* FOOTER BUTTONS */}
          <div className="mt-8 pt-4 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={goToChapter}
              className="px-4 py-2 rounded-full text-sm md:text-base font-semibold bg-white text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-50 transition"
            >
              Go back to {bookDisplayName} {chapter}
            </button>

            <button
              type="button"
              onClick={goHome}
              className="text-sm md:text-base font-medium text-blue-700 hover:underline"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

