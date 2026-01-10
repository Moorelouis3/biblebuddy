"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import { enrichPlainText } from "../lib/bibleHighlighting";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DevotionalDay {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string | null;
}

interface DayProgress {
  day_number: number;
  is_completed: boolean;
  reading_completed: boolean;
  reflection_text: string | null;
}

interface DevotionalDayModalProps {
  day: DevotionalDay;
  dayProgress: DayProgress | undefined;
  onClose: () => void;
  onBibleReadingClick: () => void;
  onReadingComplete: () => void;
  onReflectionSave: (text: string) => void;
  onDayComplete: (reflectionText: string, readingCompleted: boolean) => void; // Called with current modal state values
}

// Helper functions for normalizing markdown (same as Bible chapter page)
function normalizePersonMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizePlaceMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeKeywordMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function DevotionalDayModal({
  day,
  dayProgress,
  onClose,
  onBibleReadingClick,
  onReadingComplete,
  onReflectionSave,
  onDayComplete,
}: DevotionalDayModalProps) {
  const [readingChecked, setReadingChecked] = useState(dayProgress?.reading_completed || false);
  const [reflectionText, setReflectionText] = useState(dayProgress?.reflection_text || "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Highlighting states
  const [enrichedText, setEnrichedText] = useState<string>("");
  const devotionalTextRef = useRef<HTMLDivElement>(null);
  
  // Modal states for people/places/keywords (same as Bible chapter page)
  const [selectedPerson, setSelectedPerson] = useState<{ name: string } | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{ name: string } | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<{ name: string } | null>(null);
  const [personNotes, setPersonNotes] = useState<string | null>(null);
  const [placeNotes, setPlaceNotes] = useState<string | null>(null);
  const [keywordNotes, setKeywordNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);

  useEffect(() => {
    setReadingChecked(dayProgress?.reading_completed || false);
    setReflectionText(dayProgress?.reflection_text || "");
    setHasUnsavedChanges(false);
  }, [dayProgress]);

  // Apply highlighting to devotional text when day changes
  useEffect(() => {
    if (day.devotional_text) {
      try {
        const enriched = enrichPlainText(day.devotional_text);
        setEnrichedText(enriched);
      } catch (error) {
        console.error("Error enriching devotional text:", error);
        // Fallback to plain text if enrichment fails
        setEnrichedText(day.devotional_text);
      }
    }
  }, [day.devotional_text]);

  // Event delegation for click handlers on enriched content (same as Bible chapter page)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.classList.contains("bible-highlight")) return;

      const type = el.dataset.type;
      const term = el.dataset.term;
      if (!type || !term) return;

      // Open overlay modal (same as clicking a card on People/Places/Keywords pages)
      if (type === "people") {
        setSelectedPerson({ name: term });
        setSelectedPlace(null);
        setSelectedKeyword(null);
      } else if (type === "places") {
        setSelectedPlace({ name: term });
        setSelectedPerson(null);
        setSelectedKeyword(null);
      } else if (type === "keywords") {
        setSelectedKeyword({ name: term });
        setSelectedPerson(null);
        setSelectedPlace(null);
      }
    };

    // Attach to the devotional text container to scope clicks to this modal
    const container = devotionalTextRef.current;
    if (container) {
      container.addEventListener("click", handler);
      return () => container.removeEventListener("click", handler);
    }
  }, []);

  // Load notes for selected person (reuse same logic as Bible chapter page)
  useEffect(() => {
    if (!selectedPerson) {
      setPersonNotes(null);
      return;
    }

    async function generateNotes() {
      setLoadingNotes(true);
      setPersonNotes(null);

      try {
        if (!selectedPerson) return;
        const personNameKey = selectedPerson.name.toLowerCase().trim();

        // STEP 1: Check Supabase FIRST
        const { data: existing, error: existingError } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person", personNameKey)
          .maybeSingle();

        if (existingError && existingError.code !== "PGRST116") {
          console.error("Error checking existing notes:", existingError);
        }

        if (existing?.notes_text) {
          setPersonNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // STEP 2: Generate notes using OpenAI
        const isFemale = /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Delilah|Bathsheba|Jezebel|Lydia|Phoebe|Priscilla|Anna|Elizabeth|Joanna|Susanna|Judith|Vashti|Bernice|Drusilla|Euodia|Syntyche|Chloe|Nympha|Tryphaena|Tryphosa|Julia|Claudia|Persis)/i.test(selectedPerson.name);

        const prompt = `You are Little Louis. Generate Bible study style notes for ${selectedPerson.name} from Scripture using the EXACT markdown structure below.

TEMPLATE
# Who is this person?
One short paragraph explaining who ${selectedPerson.name} ${isFemale ? "was" : "was"} in the Bible and why ${isFemale ? "she" : "he"} matters.

# Where do we see ${selectedPerson.name}?
Include two or three specific Bible references where ${selectedPerson.name} appears. Each reference should include the book, chapter, and verse (e.g., "Genesis 37:5-11"). After each reference, write one sentence explaining what happens in that passage related to ${selectedPerson.name}.

# What makes ${selectedPerson.name} significant?
List two or three key characteristics, actions, or lessons from ${selectedPerson.name}'s story. Each point should be one sentence. Keep it simple and beginner-friendly.

# How does ${selectedPerson.name}'s story point to Jesus?
One short paragraph connecting ${selectedPerson.name}'s story to Jesus, prophecy, or the bigger story of redemption. Keep it simple and clear.

# What can we learn from ${selectedPerson.name}?
One short paragraph with a simple, practical life application. Focus on faith, character, or following God.

RULES
DO NOT include a header like "${selectedPerson.name} Notes" or any title at the beginning. Start directly with "# Who is this person?".
Keep emojis in headers if helpful, but focus on clarity.
No images. No Greek or Hebrew words unless essential (and then explain simply).
Keep it cinematic, warm, simple. Do not overwhelm beginners.
Be accurate to Scripture.`;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: prompt,
            growMode: false,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate notes");
        }

        const data = await response.json();
        const generated = data.response || "";

        // STEP 3: Save to Supabase
        await supabase
          .from("bible_people_notes")
          .upsert({ person: personNameKey, notes_text: generated }, { onConflict: "person" });

        setPersonNotes(generated);
      } catch (err: any) {
        console.error("Error loading person notes:", err);
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedPerson]);

  // Load notes for selected place (reuse same logic as Bible chapter page)
  useEffect(() => {
    if (!selectedPlace) {
      setPlaceNotes(null);
      return;
    }

    async function generateNotes() {
      setLoadingNotes(true);
      setPlaceNotes(null);

      try {
        if (!selectedPlace) return;
        const normalizedPlace = selectedPlace.name.toLowerCase().trim().replace(/\s+/g, "_");

        // STEP 1: Check Supabase FIRST
        const { data: existing, error: existingError } = await supabase
          .from("places_in_the_bible_notes")
          .select("notes_text")
          .eq("normalized_place", normalizedPlace)
          .maybeSingle();

        if (existingError && existingError.code !== "PGRST116") {
          console.error("Error checking existing notes:", existingError);
        }

        if (existing?.notes_text) {
          setPlaceNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // STEP 2: Generate notes using OpenAI
        const prompt = `You are Little Louis. 
Generate beginner friendly Bible notes about the PLACE: ${selectedPlace.name}.

TEMPLATE
# Where is this place?
One short paragraph explaining where ${selectedPlace.name} is located (region, country, significance) and why it matters in the Bible.

# What happens at ${selectedPlace.name}?
Include two or three specific Bible references where ${selectedPlace.name} appears. Each reference should include the book, chapter, and verse (e.g., "Genesis 12:1-9"). After each reference, write one sentence explaining what happens in that passage at ${selectedPlace.name}.

# Why is ${selectedPlace.name} significant?
List two or three key reasons why ${selectedPlace.name} matters in the Bible story. Each point should be one sentence. Keep it simple and beginner-friendly.

# How does ${selectedPlace.name} connect to Jesus?
One short paragraph connecting ${selectedPlace.name} to Jesus, prophecy, or the bigger story of redemption. Keep it simple and clear.

# What can we learn from ${selectedPlace.name}?
One short paragraph with a simple, practical life application related to place, journey, or God's presence.

RULES
DO NOT include a header like "${selectedPlace.name} Notes" or any title at the beginning. Start directly with "# Where is this place?".
Keep emojis in headers if helpful, but focus on clarity.
No images. No Greek or Hebrew words unless essential (and then explain simply).
Keep it cinematic, warm, simple. Do not overwhelm beginners.
Be accurate to Scripture.`;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: prompt,
            growMode: false,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate notes");
        }

        const data = await response.json();
        const generated = data.response || "";

        // STEP 3: Save to Supabase
        await supabase
          .from("places_in_the_bible_notes")
          .upsert({ place: selectedPlace.name, normalized_place: normalizedPlace, notes_text: generated }, { onConflict: "normalized_place" });

        setPlaceNotes(generated);
      } catch (err: any) {
        console.error("Error loading place notes:", err);
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedPlace]);

  // Load notes for selected keyword (reuse same logic as Bible chapter page)
  useEffect(() => {
    if (!selectedKeyword) {
      setKeywordNotes(null);
      return;
    }

    async function generateNotes() {
      setLoadingNotes(true);
      setKeywordNotes(null);

      try {
        if (!selectedKeyword) return;
        const keywordKey = selectedKeyword.name.toLowerCase().trim();

        // STEP 1: Check Supabase FIRST
        const { data: existingCheck, error: existingError } = await supabase
          .from("keywords_in_the_bible")
          .select("notes_text")
          .eq("keyword", keywordKey)
          .maybeSingle();

        if (existingError && existingError.code !== "PGRST116") {
          console.error("Error checking existing notes:", existingError);
        }

        let notesText = "";
        if (existingCheck?.notes_text) {
          notesText = existingCheck.notes_text;
        } else {
          // STEP 2: Generate notes using OpenAI
          const prompt = `You are Little Louis. 
Generate beginner friendly Bible notes about the KEYWORD: ${selectedKeyword.name}.

TEMPLATE
# What is this concept?
One short paragraph explaining what ${selectedKeyword.name} means in the Bible in simple, everyday language.

# Where do we see ${selectedKeyword.name} in Scripture?
Include two or three specific Bible references where ${selectedKeyword.name} appears or is explained. Each reference should include the book, chapter, and verse (e.g., "Genesis 15:1-21"). After each reference, write one sentence explaining how ${selectedKeyword.name} is used or shown in that passage.

# Why does ${selectedKeyword.name} matter?
List two or three key reasons why understanding ${selectedKeyword.name} is important for reading the Bible. Each point should be one sentence. Keep it simple and beginner-friendly.

# How does ${selectedKeyword.name} connect to Jesus?
One short paragraph connecting ${selectedKeyword.name} to Jesus, the gospel, or the bigger story of redemption. Keep it simple and clear.

# What does ${selectedKeyword.name} mean for us today?
One short paragraph with a simple, practical life application. How can understanding ${selectedKeyword.name} help us follow God better?

RULES
DO NOT include a header like "${selectedKeyword.name} Notes" or any title at the beginning. Start directly with "# What is this concept?".
Keep emojis in headers if helpful, but focus on clarity.
No images. No Greek or Hebrew words unless essential (and then explain simply).
Keep it cinematic, warm, simple. Do not overwhelm beginners.
Be accurate to Scripture.`;

          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: prompt,
              growMode: false,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to generate notes");
          }

          const data = await response.json();
          const generated = data.response || "";

          await supabase
            .from("keywords_in_the_bible")
            .upsert({ keyword: selectedKeyword.name, notes_text: generated }, { onConflict: "keyword" });

          const { data: finalData } = await supabase
            .from("keywords_in_the_bible")
            .select("notes_text")
            .eq("keyword", keywordKey)
            .single();
          notesText = finalData?.notes_text || generated;
        }

        setKeywordNotes(notesText);
      } catch (err: any) {
        console.error("Error loading keyword notes:", err);
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedKeyword]);

  const handleReadingCheck = () => {
    setReadingChecked(!readingChecked);
    setHasUnsavedChanges(true);
  };

  const handleReflectionChange = (text: string) => {
    setReflectionText(text);
    setHasUnsavedChanges(true);
  };

  const handleMarkComplete = () => {
    // Pass current modal state directly to parent - parent will save everything in one transaction
    onDayComplete(reflectionText.trim(), readingChecked);
  };

  const handleClose = () => {
    // Close without saving - just discard any unsaved changes
    setReadingChecked(dayProgress?.reading_completed || false);
    setReflectionText(dayProgress?.reflection_text || "");
    setHasUnsavedChanges(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto" 
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white border border-gray-200 shadow-2xl overflow-hidden flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER SECTION - Fixed at top */}
        <div className="flex-shrink-0 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl font-semibold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            title="Close (don't save)"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⭐</span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Day {day.day_number}</h1>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 ml-11">{day.day_title}</h2>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
          {/* DEVOTIONAL CONTENT SECTION */}
          <div className="mb-8" ref={devotionalTextRef}>
            {enrichedText ? (
              <div 
                className="text-gray-700 leading-relaxed" 
                style={{ lineHeight: '1.8', fontSize: '1rem' }}
                dangerouslySetInnerHTML={{ __html: enrichedText }}
              />
            ) : (
              <div className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ lineHeight: '1.8', fontSize: '1rem' }}>
                {day.devotional_text}
              </div>
            )}
          </div>

          {/* BIBLE READING SECTION */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              📖 Bible Reading
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg -ml-2 transition">
                <input
                  type="checkbox"
                  checked={readingChecked}
                  onChange={handleReadingCheck}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={onBibleReadingClick}
                    className="text-blue-600 hover:text-blue-700 font-medium underline text-left"
                  >
                    Read {day.bible_reading_book} {day.bible_reading_chapter}
                  </button>
                </div>
              </label>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          {day.reflection_question && (
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                ✍️ Reflection
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                {day.reflection_question}
              </p>
              <textarea
                value={reflectionText}
                onChange={(e) => handleReflectionChange(e.target.value)}
                placeholder="Type your thoughts here, or use voice-to-text..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y text-gray-900 leading-relaxed"
                style={{ lineHeight: '1.6' }}
              />
              {hasUnsavedChanges && (
                <p className="text-xs text-gray-500 mt-2">Changes will be saved when you mark the day complete.</p>
              )}
            </div>
          )}
        </div>

        {/* ACTION BUTTONS - Fixed at bottom */}
        <div className="flex-shrink-0 px-6 sm:px-8 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-100 border border-gray-300 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleMarkComplete}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            ✓ Mark Day as Complete
          </button>
        </div>
      </div>

      {/* PERSON OVERLAY MODAL (nested, higher z-index) */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button
              type="button"
              onClick={() => {
                setSelectedPerson(null);
                setPersonNotes(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedPerson.name}</h2>
            {loadingNotes ? (
              <div className="text-center py-12 text-gray-500">Loading notes...</div>
            ) : personNotes ? (
              <div>
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => (
                      <h1 className="text-xl md:text-2xl font-bold mt-6 mb-4 text-gray-900" {...props} />
                    ),
                    p: ({ ...props }) => (
                      <p className="mb-4 leading-relaxed" {...props} />
                    ),
                    strong: ({ ...props }) => (
                      <strong className="font-bold" {...props} />
                    ),
                  }}
                >
                  {normalizePersonMarkdown(personNotes)}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No notes available yet.</div>
            )}
          </div>
        </div>
      )}

      {/* PLACE OVERLAY MODAL (nested, higher z-index) */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button
              type="button"
              onClick={() => {
                setSelectedPlace(null);
                setPlaceNotes(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedPlace.name}</h2>
            {loadingNotes ? (
              <div className="text-center py-12 text-gray-500">Loading notes...</div>
            ) : placeNotes ? (
              <div>
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => (
                      <h1 className="text-xl md:text-2xl font-bold mt-6 mb-4 text-gray-900" {...props} />
                    ),
                    p: ({ ...props }) => (
                      <p className="mb-4 leading-relaxed" {...props} />
                    ),
                    strong: ({ ...props }) => (
                      <strong className="font-bold" {...props} />
                    ),
                  }}
                >
                  {normalizePlaceMarkdown(placeNotes)}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No notes available yet.</div>
            )}
          </div>
        </div>
      )}

      {/* KEYWORD OVERLAY MODAL (nested, higher z-index) */}
      {selectedKeyword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button
              type="button"
              onClick={() => {
                setSelectedKeyword(null);
                setKeywordNotes(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedKeyword.name}</h2>
            {loadingNotes ? (
              <div className="text-center py-12 text-gray-500">Loading notes...</div>
            ) : keywordNotes ? (
              <div>
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => (
                      <h1 className="text-xl md:text-2xl font-bold mt-6 mb-4 text-gray-900" {...props} />
                    ),
                    p: ({ ...props }) => (
                      <p className="mb-4 leading-relaxed" {...props} />
                    ),
                    strong: ({ ...props }) => (
                      <strong className="font-bold" {...props} />
                    ),
                  }}
                >
                  {normalizeKeywordMarkdown(keywordNotes)}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No notes available yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
