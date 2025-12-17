"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LouisAvatar } from "../../../../components/LouisAvatar";
import { supabase } from "../../../../lib/supabaseClient";
import { markChapterDone, isChapterCompleted } from "../../../../lib/readingProgress";
import confetti from "canvas-confetti";

type Verse = {
  num: number;
  text: string;
};

type Section = {
  id: string;
  emoji: string;
  title: string;
  verses: Verse[];
};

type BibleApiVerse = {
  verse: number;
  text: string;
};

type BibleApiResponse = {
  reference: string;
  verses: BibleApiVerse[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
};

export default function BibleChapterPage() {
  const params = useParams();
  const router = useRouter();
  const book = String(params.book);
  const chapter = Number(params.chapter);

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [chapterSummary, setChapterSummary] = useState<string>("");
  const summaryLoadingRef = useRef(false);

  // Normalize book name for API (e.g., "1 Samuel" -> "1samuel", "Matthew" -> "matthew")
  function normalizeBookName(bookName: string): string {
    // Remove spaces and convert to lowercase
    // The API expects: matthew, mark, luke, john, acts, romans, etc.
    return bookName.toLowerCase().replace(/\s+/g, "");
  }

  // Convert Bible API response to sections format
  function convertToSections(verses: BibleApiVerse[], bookDisplay: string): Section[] {
    // For now, we'll create a single section with all verses
    // You can enhance this later to split into multiple sections based on content
    return [
      {
        id: "verses",
        emoji: "📖",
        title: `${bookDisplay} ${chapter}`,
        verses: verses.map((v) => ({
          num: v.verse,
          text: v.text,
        })),
      },
    ];
  }

  useEffect(() => {
    async function loadChapter() {
      // Prevent double execution in React Strict Mode
      if (loadingRef.current) {
        return;
      }
      loadingRef.current = true;

      try {
        setLoading(true);
        setError(null);

        // Step A: Check Supabase table bible_chapters FIRST
        const { data: supabaseData, error: supabaseError } = await supabase
          .from("bible_chapters")
          .select("content_json")
          .eq("book", book)
          .eq("chapter", chapter)
          .maybeSingle();

        if (supabaseData && !supabaseError && supabaseData.content_json) {
          // Step B: Use content_json to render verses - DO NOT call API
          const content = supabaseData.content_json as any;
          if (content && content.verses) {
            const verses = content.verses as BibleApiVerse[];
            const bookDisplay = book
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ");
            setSections(convertToSections(verses, bookDisplay));
            setLoading(false);
            loadingRef.current = false;
            return;
          }
        }

        // Step C: If NOT found in Supabase, fetch from bible-api.com
        const normalizedBook = normalizeBookName(book);
        const apiUrl = `https://bible-api.com/${normalizedBook}+${chapter}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const apiData: BibleApiResponse = await response.json();

        // Step D: Save to Supabase ONCE - check first to prevent duplicates
        const { data: existingCheck } = await supabase
          .from("bible_chapters")
          .select("id")
          .eq("book", book)
          .eq("chapter", chapter)
          .maybeSingle();

        if (!existingCheck) {
          // Only insert if it doesn't exist
          const { error: insertError } = await supabase
            .from("bible_chapters")
            .insert([
              {
                book: book,
                chapter: chapter,
                content_json: apiData,
              },
            ]);

          if (insertError) {
            console.error("Error saving to Supabase:", insertError);
            // Continue anyway - we have the data
          }
        }

        // Render verses
        const bookDisplay = book
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
        setSections(convertToSections(apiData.verses, bookDisplay));
      } catch (err) {
        console.error("Error loading chapter:", err);
        setError(err instanceof Error ? err.message : "Failed to load chapter");
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    }

    if (book && chapter) {
      loadChapter();
    }
  }, [book, chapter]);

  // Check if chapter is already completed
  useEffect(() => {
    if (book && chapter) {
      const completed = isChapterCompleted(book, chapter);
      setIsCompleted(completed);
    }
  }, [book, chapter]);

  // Extract Big Idea summary from notes text
  function extractBigIdeaSummary(notesText: string): string {
    if (!notesText || !notesText.trim()) {
      return "";
    }

    // Find the "🧠 **Big Idea of the Chapter**" section
    // Match variations: "🧠 **Big Idea of the Chapter**" or "🧠 Big Idea of the Chapter"
    // Extract text until the next emoji header (🎬, 📌, 🔗, 🙌, 🏁)
    const patterns = [
      /🧠\s*\*\*Big Idea of the Chapter\*\*\s*\n([\s\S]*?)(?=\n#\s*🎬|\n#\s*📌|\n#\s*🔗|\n#\s*🙌|\n#\s*🏁|🎬|📌|🔗|🙌|🏁|$)/i,
      /🧠\s*Big Idea of the Chapter\s*\n([\s\S]*?)(?=\n#\s*🎬|\n#\s*📌|\n#\s*🔗|\n#\s*🙌|\n#\s*🏁|🎬|📌|🔗|🙌|🏁|$)/i,
      /\*\*🧠\s*Big Idea of the Chapter\*\*\s*\n([\s\S]*?)(?=\n#\s*🎬|\n#\s*📌|\n#\s*🔗|\n#\s*🙌|\n#\s*🏁|🎬|📌|🔗|🙌|🏁|$)/i,
      /Big Idea of the Chapter\s*\n([\s\S]*?)(?=\n#\s*🎬|\n#\s*📌|\n#\s*🔗|\n#\s*🙌|\n#\s*🏁|🎬|📌|🔗|🙌|🏁|$)/i,
    ];

    let summary = "";
    for (const pattern of patterns) {
      const match = notesText.match(pattern);
      if (match && match[1]) {
        summary = match[1].trim();
        break;
      }
    }

    if (!summary) {
      return "";
    }

    // Strip markdown formatting
    summary = summary
      .replace(/#{1,6}\s+/g, "") // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/\*(.*?)\*/g, "$1") // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links
      .replace(/`(.*?)`/g, "$1") // Remove code
      .replace(/^\s*[-*+]\s+/gm, "") // Remove list markers
      .replace(/^\s*\d+\.\s+/gm, "") // Remove numbered list markers
      .replace(/🧠/g, "") // Remove emoji if present
      .replace(/Big Idea of the Chapter/gi, "") // Remove header text if present
      .trim();

    // Extract first 1-2 sentences (up to 2 sentences)
    const sentences = summary.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length > 0) {
      // Take first 1-2 sentences
      const selectedSentences = sentences.slice(0, 2);
      summary = selectedSentences.join(" ").trim();
    } else if (summary.length > 0) {
      // If no sentence-ending punctuation, take first 200 characters
      summary = summary.substring(0, 200).trim();
    }

    return summary || "";
  }

  // Get chapter summary from notes (generate if needed)
  async function getChapterSummary(bookName: string, chapterNum: number): Promise<string> {
    if (summaryLoadingRef.current) {
      return "";
    }
    summaryLoadingRef.current = true;

    try {
      // Step 1: Check if notes exist in Supabase
      // IMPORTANT: Use lowercase book name for query
      const bookKey = bookName.toLowerCase().trim();
      
      console.log(`Checking bible_notes for book="${bookKey}", chapter=${chapterNum}`);
      
      const { data: existing, error: existingError } = await supabase
        .from("bible_notes")
        .select("notes_text")
        .eq("book", bookKey)
        .eq("chapter", chapterNum)
        .maybeSingle();

      if (existingError) {
        if (existingError.code === 'PGRST116') {
          // No rows found - this is expected if notes don't exist
          console.log(`No notes found for ${bookKey} chapter ${chapterNum}`);
        } else {
          console.error("Error checking bible_notes:", existingError);
        }
      }

      let notesText = "";

      if (existing?.notes_text) {
        // Notes exist - use them
        console.log(`Found existing notes for ${bookKey} chapter ${chapterNum}`);
        notesText = existing.notes_text;
      } else {
        // Notes don't exist - generate them
        const bookDisplayName = bookName
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");

        const prompt = `
You are Little Louis. Generate beginner friendly notes for ${bookDisplayName} chapter ${chapterNum} using this exact template and rules.

TEMPLATE
🧠 Big Idea of the Chapter
One short paragraph explaining the heart of the chapter in simple English.

🎬 What's Happening…
Include three or four cinematic story movements. Each movement follows:
[Emoji] **Story Moment Title** (ALWAYS bold the story moment title with **)
A short paragraph of three to four sentences explaining what happens and why it matters. Smooth, simple, friendly language. Do not use hyphens. Do not break the story into too many pieces. Keep it beginner friendly and emotional.
IMPORTANT: Every subsection title under "What's Happening" MUST be wrapped in **bold** markdown. Example: 🌳 **Family Tree of Jesus** (not just 🌳 Family Tree of Jesus).

📌 Key Themes
List two or three themes. Each theme is one short sentence.

🔗 Connections to the Bigger Story
List one or two simple connections to prophecy, covenant, or Jesus mission. Extremely beginner friendly.

🙌 Simple Life Application
A short paragraph of three to four sentences explaining what this chapter shows about God, about Jesus, and about what the reader is invited to believe or do.

🏁 One Sentence Summary
A final strong sentence that captures the message.

RULES
DO NOT include a top-level header like "${bookDisplayName} Chapter ${chapterNum} Notes" or any chapter title at the beginning. Start directly with "🧠 Big Idea of the Chapter".
Keep emojis in the headers. Use proper markdown formatting:
- "Big Idea of the Chapter" should be **bold** (not h1)
- "What's Happening" should be formatted as # (h1)
- "Key Themes" should be formatted as # (h1)
- "Connections to the Bigger Story" should be formatted as # (h1)
- "Simple Life Application" should be formatted as # (h1)
- "One Sentence Summary" should be formatted as # (h1)
No numbers in section headers. No hyphens anywhere in the text. No images. No Greek or Hebrew words. No deep theological commentary. Keep it cinematic, warm, simple. Do not overwhelm beginners.
        `;

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
          throw new Error(`Failed to generate notes: ${response.statusText}`);
        }

        const json = await response.json();
        let generated = (json?.reply as string) ?? "";

        if (!generated || generated.trim().length === 0) {
          throw new Error("Generated notes are empty.");
        }

        // Enforce the no-hyphen rule
        generated = generated.replace(/-/g, " ");

        notesText = generated;

        // Save to Supabase (check first to prevent duplicates)
        // IMPORTANT: Use lowercase book name for insert
        const { data: existingCheck, error: checkError } = await supabase
          .from("bible_notes")
          .select("id")
          .eq("book", bookKey)
          .eq("chapter", chapterNum)
          .maybeSingle();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error("Error checking for duplicates:", checkError);
        }

        if (!existingCheck) {
          console.log(`Saving new notes for ${bookKey} chapter ${chapterNum}`);
          const { error: insertError } = await supabase
            .from("bible_notes")
            .insert([
              {
                book: bookKey,
                chapter: chapterNum,
                notes_text: generated,
              },
            ]);

          if (insertError) {
            console.error("Error saving notes to bible_notes:", insertError);
          } else {
            console.log(`Successfully saved notes for ${bookKey} chapter ${chapterNum}`);
          }
        } else {
          console.log(`Notes already exist for ${bookKey} chapter ${chapterNum}, skipping insert`);
        }
      }

      // Extract Big Idea summary
      const summary = extractBigIdeaSummary(notesText);
      if (!summary) {
        console.warn(`Could not extract Big Idea summary from notes for ${bookKey} chapter ${chapterNum}`);
        console.warn("Notes text preview:", notesText.substring(0, 200));
      } else {
        console.log(`Successfully extracted summary for ${bookKey} chapter ${chapterNum}`);
      }
      return summary;
    } catch (err: any) {
      console.error("Error getting chapter summary:", err);
      return "";
    } finally {
      summaryLoadingRef.current = false;
    }
  }

  // Load chapter summary
  useEffect(() => {
    async function loadSummary() {
      if (book && chapter) {
        const summary = await getChapterSummary(book, chapter);
        setChapterSummary(summary);
      }
    }
    loadSummary();
  }, [book, chapter]);

  // Get book display name (capitalize first letter of each word)
  const bookDisplayName = book
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Determine back link - try to go back to reading plan for this book
  const backLink = `/reading/books/${book.toLowerCase()}`;

  function triggerConfetti() {
    const duration = 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

    // Style confetti canvas to appear above everything
    const styleConfettiCanvas = (canvas: HTMLCanvasElement) => {
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '99999';
      canvas.style.pointerEvents = 'none';
    };

    // Use MutationObserver to catch new canvas elements as they're created
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'CANVAS') {
            styleConfettiCanvas(node as HTMLCanvasElement);
          }
        });
      });
    });

    // Start observing the document body for new canvas elements
    observer.observe(document.body, { childList: true, subtree: true });

    // Also style any existing canvases
    document.querySelectorAll('canvas').forEach(styleConfettiCanvas);

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        // Stop observing
        observer.disconnect();
        
        // Clean up canvas after animation ends
        setTimeout(() => {
          document.querySelectorAll('canvas').forEach((canvas) => {
            const htmlCanvas = canvas as HTMLCanvasElement;
            // Only remove confetti canvases (those with our z-index)
            if (htmlCanvas.style.zIndex === '99999') {
              // Fade out and remove
              htmlCanvas.style.opacity = '0';
              htmlCanvas.style.transition = 'opacity 0.5s';
              setTimeout(() => {
                htmlCanvas.remove();
              }, 500);
            }
          });
        }, 500);
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }

  function handleMarkFinished() {
    if (isSaving || isCompleted) return;

    try {
      setIsSaving(true);
      setIsCompleted(true);

      // Mark chapter as done - this will unlock the next chapter
      markChapterDone(book, chapter);

      // Trigger confetti animation immediately
      triggerConfetti();

      // Open congratulations modal after a brief delay to let confetti start
      setTimeout(() => {
        setShowCongratsModal(true);
        setIsSaving(false);
      }, 100);
    } catch (err) {
      console.error(`Error marking ${bookDisplayName} ${chapter} finished`, err);
      setIsSaving(false);
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <p className="text-gray-600">Loading chapter...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <p className="text-red-600">Error: {error}</p>
            <Link
              href={backLink}
              className="text-blue-600 hover:underline mt-4 inline-block"
            >
              ← Back to {bookDisplayName}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* BACK LINK */}
        <div className="mb-4 text-xs sm:text-sm text-blue-600">
          <Link href={backLink} className="hover:underline">
            ← Back to {bookDisplayName} overview
          </Link>
        </div>

        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">
          {bookDisplayName} {chapter}
        </h1>
        <p className="text-gray-700 mb-4">
          Reading {bookDisplayName} chapter {chapter}.
        </p>

        {/* LOUIS INSTRUCTION */}
        <div className="mb-5 flex items-start gap-3">
          <LouisAvatar mood="bible" size={40} />
          <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
            <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
            <p className="mb-2 font-semibold">
              Now let us read {bookDisplayName} chapter {chapter}.
            </p>
            {chapterSummary ? (
              <p className="text-[13px] leading-relaxed">
                {chapterSummary}
              </p>
            ) : (
              <p className="text-[13px] leading-relaxed text-gray-500 italic">
                Loading chapter summary...
              </p>
            )}
          </div>
        </div>

        {/* VERSE BLOCK */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6 max-h-[60vh] overflow-y-auto">
          {sections.map((section) => (
            <div key={section.id} className="mb-8 last:mb-0">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">{section.emoji}</span>
                <span>{section.title}</span>
              </h2>

              <div className="space-y-5">
                {section.verses.map((verse) => (
                  <p key={verse.num} className="leading-relaxed">
                    <span className="inline-flex items-center justify-center rounded-md bg-blue-500 text-white text-[11px] font-semibold px-2 py-[2px] mr-3">
                      {verse.num.toString().padStart(2, "0")}
                    </span>
                    {verse.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* MARK AS FINISHED BUTTON */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <button
            type="button"
            onClick={handleMarkFinished}
            disabled={isSaving || isCompleted}
            className={`px-6 py-3 rounded-full text-base font-semibold shadow-sm transition ${
              isCompleted
                ? "bg-gray-400 text-white cursor-not-allowed"
                : isSaving
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isCompleted
              ? "Completed"
              : isSaving
              ? "Saving..."
              : `Mark ${bookDisplayName} ${chapter} as finished`}
          </button>

          {/* Go Back to Bible Books Button */}
          <Link
            href={backLink}
            className="text-sm text-blue-600 hover:underline"
          >
            Go Back to Bible Books
          </Link>
        </div>
      </div>

      {/* CONGRATULATIONS MODAL */}
      {showCongratsModal && <CongratsModalWithConfetti />}
    </div>
  );
}

// Separate component to trigger confetti when modal mounts
function CongratsModalWithConfetti() {
  const params = useParams();
  const router = useRouter();
  const book = String(params.book);
  const chapter = Number(params.chapter);

  const bookDisplayName = book
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const backLink = `/reading/books/${book.toLowerCase()}`;

  // Motivational messages
  const motivationalMessages = [
    "Great job — your consistency is paying off!",
    "Another chapter down! Keep going!",
    "God sees your effort. Stay committed!",
    "Amazing progress! Let's keep moving.",
    "You're building something beautiful, one chapter at a time.",
    "Every chapter brings you closer. Well done!",
    "Your dedication is inspiring. Keep it up!",
    "One more step forward. You've got this!",
    "Progress over perfection. You're doing great!",
    "Each chapter is a victory. Celebrate this one!",
    "You're growing stronger with every chapter.",
    "Consistency is key, and you're showing it!",
    "God is proud of your commitment.",
    "You're on the right path. Keep walking!",
    "Every chapter matters. This one counts!",
  ];

  const [randomMessage] = useState(() => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  });

  const [showModal, setShowModal] = useState(true);

  // Trigger confetti when component mounts
  useEffect(() => {
    function triggerConfetti() {
      const duration = 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

      // Style confetti canvas to appear above everything
      const styleConfettiCanvas = (canvas: HTMLCanvasElement) => {
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '99999';
        canvas.style.pointerEvents = 'none';
      };

      // Use MutationObserver to catch new canvas elements as they're created
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'CANVAS') {
              styleConfettiCanvas(node as HTMLCanvasElement);
            }
          });
        });
      });

      // Start observing the document body for new canvas elements
      observer.observe(document.body, { childList: true, subtree: true });

      // Also style any existing canvases
      document.querySelectorAll('canvas').forEach(styleConfettiCanvas);

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          // Stop observing
          observer.disconnect();
          
          // Clean up canvas after animation ends
          setTimeout(() => {
            document.querySelectorAll('canvas').forEach((canvas) => {
              const htmlCanvas = canvas as HTMLCanvasElement;
              // Only remove confetti canvases (those with our z-index)
              if (htmlCanvas.style.zIndex === '99999') {
                // Fade out and remove
                htmlCanvas.style.opacity = '0';
                htmlCanvas.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                  htmlCanvas.remove();
                }, 500);
              }
            });
          }, 500);
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }

    triggerConfetti();
  }, []);

  const totalChapters = getBookTotalChapters(book);
  const isLastChapter = chapter >= totalChapters;
  
  // Get next book name
  const BOOKS = ["Matthew", "Mark", "Luke", "John", "Acts", "Romans"];
  const currentBookIndex = BOOKS.findIndex(b => b.toLowerCase() === book.toLowerCase());
  const nextBook = currentBookIndex >= 0 && currentBookIndex < BOOKS.length - 1 ? BOOKS[currentBookIndex + 1] : null;

  function handleContinueToNextChapter() {
    if (isLastChapter) {
      // Go to reading plan page to start next book
      router.push("/reading");
    } else {
      router.push(`/Bible/${book}/${chapter + 1}`);
    }
    setShowModal(false);
  }

  function handleReadNotes() {
    router.push(`/reading-plan/${book}/${chapter}/notes`);
    setShowModal(false);
  }

  function handleTakeNotes() {
    router.push(`/notes?book=${book}&chapter=${chapter}`);
    setShowModal(false);
  }

  function handleGoHome() {
    router.push("/dashboard");
    setShowModal(false);
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center overflow-y-auto p-4 py-10">
      <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3 mb-10 mt-10">
        {/* Close button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Inner light blue column */}
        <div className="rounded-3xl bg-blue-50 px-4 md:px-6 py-5 md:py-7">
          {/* Header with Louis */}
          <div className="flex flex-col items-center mb-6">
            <LouisAvatar mood="stareyes" size={80} />
            <h1 className="text-2xl md:text-3xl font-bold mt-4 text-center text-gray-900">
              Congratulations! You just finished another chapter!
            </h1>
            <p className="text-base md:text-lg text-gray-700 mt-3 text-center">
              {randomMessage}
            </p>
          </div>

          {/* Three Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* LEFT: Read Notes */}
            <button
              type="button"
              onClick={handleReadNotes}
              className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-white text-blue-700 border-2 border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition text-center"
            >
              Read {bookDisplayName} {chapter} Notes
            </button>

            {/* CENTER: Continue to Next Chapter or Start Next Book */}
            <button
              type="button"
              onClick={handleContinueToNextChapter}
              className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center"
            >
              {isLastChapter && nextBook ? `Start ${nextBook}` : "Continue to Next Chapter"}
            </button>

            {/* RIGHT: Take Notes */}
            <button
              type="button"
              onClick={handleTakeNotes}
              className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-white text-blue-700 border-2 border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition text-center"
            >
              Take Notes on {bookDisplayName} {chapter}
            </button>
          </div>

          {/* Go Back Home Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleGoHome}
              className="text-sm md:text-base font-medium text-blue-700 hover:underline"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

