"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCompletedChapters } from "@/lib/readingProgress";
import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";

const MATTHEW_CHAPTERS = 28;

export default function BibleStudyNotesPage() {
  const router = useRouter();
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
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

  if (completedChapters.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-4">Bible Study Notes</h1>
            <p className="text-gray-600 mb-6">
              You haven't completed any chapters yet. Complete chapters in your reading plan to access study notes here.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">Bible Study Notes</h1>
        <p className="text-gray-700 mb-4">
          Review study notes for chapters you've completed.
        </p>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {selectedChapter === null ? (
            <>
              {/* CHAPTER GRID */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {completedChapters.map((chapter) => (
                    <button
                      key={chapter}
                      onClick={() => setSelectedChapter(chapter)}
                      className="relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm bg-green-100 border-green-300 text-green-800 cursor-pointer hover:shadow-md hover:scale-[1.01]"
                    >
                      <p className="font-semibold">Matthew {chapter}</p>
                      <p className="text-[11px] mt-1">Finished.</p>
                    </button>
                  ))}
                </div>

                <Link
                  href="/dashboard"
                  className="text-xs sm:text-sm text-blue-600 hover:underline inline-block"
                >
                  ← Back to Dashboard
                </Link>
              </div>
            </>
          ) : loadingNotes ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-500">
              Loading notes...
            </div>
          ) : notesError ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center text-red-600">
              {notesError}
            </div>
          ) : notesText ? (
            <div>
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

