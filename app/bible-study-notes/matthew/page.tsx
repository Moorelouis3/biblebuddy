"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCompletedChapters, isChapterUnlocked, isChapterCompleted } from "@/lib/readingProgress";
import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";

const MATTHEW_CHAPTERS = 28;
const CHAPTERS_PER_PAGE = 12;

export default function MatthewBibleStudyNotesPage() {
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [chapterPage, setChapterPage] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [notesText, setNotesText] = useState<string>("");
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);

  useEffect(() => {
    // Get completed chapters for Matthew
    const completed = getCompletedChapters("matthew", MATTHEW_CHAPTERS);
    setCompletedChapters(completed);
  }, []);

  useEffect(() => {
    // Load notes when a chapter is selected
    if (selectedChapter === null) {
      setNotesText("");
      setNotesError(null);
      return;
    }

    async function loadNotes() {
      setLoadingNotes(true);
      setNotesError(null);

      try {
        const { data, error } = await supabase
          .from("bible_notes")
          .select("notes_text")
          .eq("book", "matthew")
          .eq("chapter", selectedChapter)
          .maybeSingle();

        if (error) {
          console.error("Error loading notes:", error);
          setNotesError("Failed to load notes for this chapter.");
          setLoadingNotes(false);
          return;
        }

        if (!data || !data.notes_text) {
          setNotesError("Notes not available for this chapter yet.");
          setNotesText("");
        } else {
          setNotesText(data.notes_text);
        }
      } catch (err: any) {
        console.error("Error loading notes:", err);
        setNotesError(err?.message || "Failed to load notes.");
      } finally {
        setLoadingNotes(false);
      }
    }

    loadNotes();
  }, [selectedChapter]);

  // chapter pagination - show all chapters 1-28
  const chapterStartIndex = chapterPage * CHAPTERS_PER_PAGE;
  const visibleChapterCount = Math.min(
    CHAPTERS_PER_PAGE,
    MATTHEW_CHAPTERS - chapterStartIndex
  );
  const visibleChapters = Array.from(
    { length: visibleChapterCount },
    (_, i) => chapterStartIndex + i + 1 // Start from chapter 1
  );
  const hasPrevChapterPage = chapterPage > 0;
  const hasNextChapterPage =
    chapterStartIndex + CHAPTERS_PER_PAGE < MATTHEW_CHAPTERS;

  if (selectedChapter !== null) {
    // Show notes modal/view
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-gray-900">
                <span>⭐</span>
                <span>Matthew Chapter {selectedChapter} Notes</span>
              </h1>
              <button
                onClick={() => setSelectedChapter(null)}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* NOTES CONTENT - Same format as chapter notes */}
            {loadingNotes ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                Loading notes...
              </div>
            ) : notesError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center text-red-600">
                {notesError}
              </div>
            ) : notesText ? (
              <div className="bg-blue-50 rounded-3xl px-4 md:px-6 py-5 md:py-7">
                <section className="mb-8 md:mb-10">
                  <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-4 md:p-6 max-h-[60vh] overflow-y-auto text-sm md:text-base leading-relaxed text-gray-800 space-y-4">
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
                  </div>
                </section>

                {/* FOOTER BUTTON */}
                <div className="mt-8 pt-4 border-t border-blue-100">
                  <button
                    onClick={() => setSelectedChapter(null)}
                    className="text-sm md:text-base font-medium text-blue-700 hover:underline"
                  >
                    ← Back to chapters
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                No notes available for this chapter
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">The Gospel of Matthew</h1>
        <p className="text-gray-700 mb-4">
          Review study notes for completed chapters.
        </p>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {/* CHAPTER GRID */}
          <div className="space-y-4 mt-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {visibleChapters.map((chapter) => {
                const unlocked = isChapterUnlocked("matthew", chapter);
                const done = isChapterCompleted("matthew", chapter) || completedChapters.includes(chapter);
                
                // Only allow clicking on completed chapters (green ones)
                const canViewNotes = done;

                let stateClasses =
                  "bg-gray-100 border-gray-300 text-gray-400 opacity-80 cursor-default";

                if (done) {
                  stateClasses =
                    "bg-green-100 border-green-300 text-green-800 cursor-pointer hover:shadow-md hover:scale-[1.01]";
                }

                const title = `Matthew ${chapter}`;
                const description = done
                  ? "Finished. Notes available."
                  : "Not completed yet.";

                const content = (
                  <>
                    <p className="font-semibold">{title}</p>
                    <p className="text-[11px] mt-1">{description}</p>
                    {!done && (
                      <div className="absolute right-2 top-2 text-black/70">
                        🔒
                      </div>
                    )}
                  </>
                );

                if (!canViewNotes) {
                  return (
                    <div
                      key={chapter}
                      className={`relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm ${stateClasses}`}
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <button
                    key={chapter}
                    onClick={() => setSelectedChapter(chapter)}
                    className={`relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm block ${stateClasses}`}
                  >
                    {content}
                  </button>
                );
              })}
            </div>

            {/* chapter pagination and bottom nav */}
            <div className="mt-2 flex items-center justify-between text-xs sm:text-sm text-blue-600">
              <button
                type="button"
                onClick={() =>
                  hasPrevChapterPage && setChapterPage((p) => p - 1)
                }
                disabled={!hasPrevChapterPage}
                className={`hover:underline ${
                  !hasPrevChapterPage ? "text-gray-300 cursor-default" : ""
                }`}
              >
                Previous chapters
              </button>

              <Link href="/dashboard" className="hover:underline">
                Home
              </Link>

              <button
                type="button"
                onClick={() =>
                  hasNextChapterPage && setChapterPage((p) => p + 1)
                }
                disabled={!hasNextChapterPage}
                className={`hover:underline ${
                  !hasNextChapterPage ? "text-gray-300 cursor-default" : ""
                }`}
              >
                Next chapters
              </button>
            </div>

            <Link
              href="/bible-study-notes"
              className="text-xs sm:text-sm text-blue-600 hover:underline mt-1 inline-block"
            >
              Change book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


