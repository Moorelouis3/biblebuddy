"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

interface BibleReadingModalProps {
  book: string;
  chapter: number;
  onClose: () => void;
}

interface Verse {
  num: number;
  text: string;
}

interface Section {
  id: string;
  emoji: string;
  title: string;
  verses: Verse[];
}

export default function BibleReadingModal({ book, chapter, onClose }: BibleReadingModalProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrichedContent, setEnrichedContent] = useState<string | null>(null);

  useEffect(() => {
    async function loadChapter() {
      setLoading(true);
      setError(null);

      try {
        // Normalize book name for API
        const bookDisplay = book;
        const bookParam = book.toLowerCase().replace(/\s+/g, "");

        // Try to fetch enriched_content from database first
        const { data: chapterData } = await supabase
          .from("bible_chapters")
          .select("enriched_content")
          .eq("book", bookParam)
          .eq("chapter", chapter)
          .maybeSingle();

        if (chapterData?.enriched_content) {
          setEnrichedContent(chapterData.enriched_content);
          setLoading(false);
          return;
        }

        // Fallback: Fetch from Bible API
        const apiUrl = `https://bible-api.com/${bookParam}+${chapter}?translation=kjv`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch chapter: ${response.statusText}`);
        }

        const apiData = await response.json();

        if (!apiData.verses || !Array.isArray(apiData.verses)) {
          throw new Error("Invalid API response");
        }

        // Convert to sections (simplified version)
        const verses: Verse[] = apiData.verses.map((v: any) => ({
          num: v.verse,
          text: v.text,
        }));

        // Group into sections (simple: one section for now)
        const section: Section = {
          id: "main",
          emoji: "📖",
          title: `${bookDisplay} ${chapter}`,
          verses: verses,
        };

        setSections([section]);
      } catch (err: any) {
        console.error("Error loading Bible chapter:", err);
        setError(err.message || "Failed to load Bible chapter");
      } finally {
        setLoading(false);
      }
    }

    if (book && chapter) {
      loadChapter();
    }
  }, [book, chapter]);

  // Handle clicks on highlighted terms (event delegation)
  useEffect(() => {
    if (!enrichedContent) return;

    function handleHighlightClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.classList.contains("bible-highlight")) {
        // Do nothing for now - just prevent default
        e.preventDefault();
      }
    }

    document.addEventListener("click", handleHighlightClick);
    return () => {
      document.removeEventListener("click", handleHighlightClick);
    };
  }, [enrichedContent]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 py-4 overflow-y-auto" onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {book} {chapter}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading chapter...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            {error}
            <div className="mt-4">
              <Link
                href={`/Bible/${encodeURIComponent(book)}/${chapter}`}
                className="text-blue-600 hover:underline"
              >
                Open in full page
              </Link>
            </div>
          </div>
        ) : enrichedContent ? (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: enrichedContent }}
          />
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  {section.emoji} {section.title}
                </h3>
                <div className="space-y-3">
                  {section.verses.map((verse) => (
                    <p key={verse.num} className="leading-relaxed">
                      <span className="font-semibold text-gray-600 mr-2">
                        {verse.num}
                      </span>
                      <span className="text-gray-900">{verse.text}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            href={`/Bible/${encodeURIComponent(book)}/${chapter}`}
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            Open in full page →
          </Link>
        </div>
      </div>
    </div>
  );
}

