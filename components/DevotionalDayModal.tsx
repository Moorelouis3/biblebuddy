"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import { enrichPlainText } from "../lib/bibleHighlighting";
import { BIBLE_PEOPLE_LIST } from "../lib/biblePeopleList";
import { ACTION_TYPE } from "../lib/actionTypes";
import CreditLimitModal from "./CreditLimitModal";

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
  showCreditBlocked: boolean;
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
  showCreditBlocked,
  onClose,
  onBibleReadingClick,
  onReadingComplete,
  onReflectionSave,
  onDayComplete,
}: DevotionalDayModalProps) {
  // User + progress state for “Mark as finished” buttons
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [completedPeople, setCompletedPeople] = useState<Set<string>>(new Set());
  const [completedPlaces, setCompletedPlaces] = useState<Set<string>>(new Set());
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [isAnimatingPerson, setIsAnimatingPerson] = useState(false);
  const [isAnimatingPlace, setIsAnimatingPlace] = useState(false);
  const [isAnimatingKeyword, setIsAnimatingKeyword] = useState(false);

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
  const [personCreditBlocked, setPersonCreditBlocked] = useState(false);
  const [viewedPeople, setViewedPeople] = useState<Set<string>>(new Set());
  const [placeCreditBlocked, setPlaceCreditBlocked] = useState(false);
  const [viewedPlaces, setViewedPlaces] = useState<Set<string>>(new Set());
  const [keywordCreditBlocked, setKeywordCreditBlocked] = useState(false);
  const [viewedKeywords, setViewedKeywords] = useState<Set<string>>(new Set());

  // Load user + existing progress so devotional popups share the same completion state as other pages
  useEffect(() => {
    async function loadUserAndProgress() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id);
        const meta: any = user.user_metadata || {};
        const extractedUsername =
          meta.firstName ||
          meta.first_name ||
          (user.email ? user.email.split("@")[0] : null) ||
          "User";
        setUsername(extractedUsername);

        const [peopleRes, placesRes, keywordsRes] = await Promise.all([
          supabase
            .from("people_progress")
            .select("person_name")
            .eq("user_id", user.id),
          supabase
            .from("places_progress")
            .select("place_name")
            .eq("user_id", user.id),
          supabase
            .from("keywords_progress")
            .select("keyword")
            .eq("user_id", user.id),
        ]);

        if (!peopleRes.error && peopleRes.data) {
          setCompletedPeople(
            new Set(
              peopleRes.data
                .map((row: any) => String(row.person_name || "").toLowerCase().trim())
                .filter(Boolean)
            )
          );
        }

        if (!placesRes.error && placesRes.data) {
          setCompletedPlaces(
            new Set(
              placesRes.data
                .map((row: any) => String(row.place_name || "").toLowerCase().trim())
                .filter(Boolean)
            )
          );
        }

        if (!keywordsRes.error && keywordsRes.data) {
          setCompletedKeywords(
            new Set(
              keywordsRes.data
                .map((row: any) => String(row.keyword || "").toLowerCase().trim())
                .filter(Boolean)
            )
          );
        }
      } catch (err) {
        console.error("[DEVOTIONAL_DAY_MODAL] Error loading user/progress:", err);
      }
    }

    loadUserAndProgress();
  }, []);

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
      // Check if clicked element or its parent has the bible-highlight class
      const highlightElement = el.closest(".bible-highlight") as HTMLElement;
      if (!highlightElement) return;

      // Stop propagation to prevent modal from closing
      e.stopPropagation();
      e.preventDefault();

      const type = highlightElement.dataset.type;
      const term = highlightElement.dataset.term;
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
      setPersonCreditBlocked(false);
      return;
    }

    async function generateNotes() {
      setLoadingNotes(true);
      setPersonNotes(null);
      setPersonCreditBlocked(false);

      try {
        if (!selectedPerson) return;
        
        // Resolve alias to primary name if needed
        const clickedTerm = selectedPerson.name;
        let primaryName = clickedTerm;
        
        // Check if clicked term matches an alias - if so, use primary name
        for (const person of BIBLE_PEOPLE_LIST) {
          if (person.aliases && person.aliases.some(alias => 
            alias.toLowerCase().trim() === clickedTerm.toLowerCase().trim()
          )) {
            primaryName = person.name;
            break;
          }
          // Also check if clicked term matches primary name (case-insensitive)
          if (person.name.toLowerCase().trim() === clickedTerm.toLowerCase().trim()) {
            primaryName = person.name;
            break;
          }
        }
        
        const personNameKey = primaryName.toLowerCase().trim();

        if (userId) {
          const isCompleted = completedPeople.has(personNameKey);
          const isViewed = viewedPeople.has(personNameKey);

          if (!isCompleted && !isViewed) {
            const creditResponse = await fetch("/api/consume-credit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                actionType: ACTION_TYPE.person_viewed,
              }),
            });

            if (!creditResponse.ok) {
              setPersonCreditBlocked(true);
              return;
            }

            const creditResult = (await creditResponse.json()) as {
              ok: boolean;
              reason?: string;
            };

            if (!creditResult.ok) {
              setPersonCreditBlocked(true);
              return;
            }

            setViewedPeople((prev) => {
              const next = new Set(prev);
              next.add(personNameKey);
              return next;
            });
          }
        }

        // STEP 1: Check Supabase FIRST (use person_name column, not person)
        const { data: existing, error: existingError } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        if (existingError && existingError.code !== "PGRST116") {
          console.error("Error checking existing notes:", existingError);
        }

        if (existing?.notes_text) {
          setPersonNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // STEP 2: Generate notes using OpenAI (same as Bible chapter page)
        // Determine gender for pronoun usage
        const isFemale = /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Delilah|Bathsheba|Jezebel|Lydia|Phoebe|Priscilla|Anna|Elizabeth|Joanna|Susanna|Judith|Vashti|Bernice|Drusilla|Euodia|Syntyche|Chloe|Nympha|Tryphaena|Tryphosa|Julia|Claudia|Persis)/i.test(primaryName);
        const pronoun = isFemale ? "Her" : "Him";
        const whoPronoun = isFemale ? "She" : "He";

        const prompt = `You are Little Louis. Generate Bible study style notes for ${primaryName} from Scripture using the EXACT markdown structure below.

CRITICAL RENDERING RULES (MANDATORY):
- Use ONLY markdown
- Use SINGLE # for all section headers
- INSERT TWO FULL LINE BREAKS AFTER EVERY SECTION
- INSERT TWO FULL LINE BREAKS AFTER EVERY PARAGRAPH GROUP
- DO NOT use markdown bullet characters (*, -, •)
- Use EMOJIS as bullets instead
- Emojis must start each bullet line
- No hyphens anywhere
- No compact spacing
- Spacing matters more than word count

The person's name is already shown in the UI. DO NOT include their name as a header.

---

TEMPLATE (FOLLOW EXACTLY):

# 👤 Who ${whoPronoun} Is

Write two short paragraphs explaining who this person is.



# 📖 Their Role in the Story

Write two to three short paragraphs explaining what role this person plays in the biblical narrative.



# 🔥 Key Moments

🔥 Short sentence describing a key moment.

🔥 Short sentence describing a key moment.

🔥 Short sentence describing a key moment.

🔥 Short sentence describing a key moment.



# 📍 Where You Find ${pronoun}

📖 Book Chapter range

📖 Book Chapter range

📖 Book Chapter range



# 🌱 Why This Person Matters

Write two to three short paragraphs explaining why this person is important and what we learn from them.



FINAL RULES:
- Every section must be separated by TWO blank lines
- Every paragraph block must be separated by TWO blank lines
- Do not compress content
- No lists without emojis
- Keep it cinematic, Bible study focused, and clear`;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: prompt,
            growMode: false,
          }),
        });

        if (!response.ok) throw new Error(`Failed to generate notes: ${response.statusText}`);
        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        // STEP 3: Race condition protection - check again before saving
        const { data: existingCheck } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        let notesText = "";
        if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
          notesText = existingCheck.notes_text;
        } else {
          // STEP 4: Upsert
          await supabase
            .from("bible_people_notes")
            .upsert({ person_name: personNameKey, notes_text: generated }, { onConflict: "person_name" });

          // STEP 5: Re-read from DB
          const { data: finalData } = await supabase
            .from("bible_people_notes")
            .select("notes_text")
            .eq("person_name", personNameKey)
            .single();
          notesText = finalData?.notes_text || generated;
        }

        setPersonNotes(notesText);
      } catch (err: any) {
        console.error("Error loading person notes:", err);
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedPerson, userId, completedPeople, viewedPeople]);

  // Load notes for selected place (reuse same logic as Bible chapter page)
  useEffect(() => {
    if (!selectedPlace) {
      setPlaceNotes(null);
      setPlaceCreditBlocked(false);
      return;
    }

    async function generateNotes() {
      setLoadingNotes(true);
      setPlaceNotes(null);
      setPlaceCreditBlocked(false);

      try {
        if (!selectedPlace) return;
        const normalizedPlace = selectedPlace.name.toLowerCase().trim().replace(/\s+/g, "_");

        if (userId) {
          const isCompleted = completedPlaces.has(normalizedPlace);

          if (!isCompleted) {
            const isViewed = viewedPlaces.has(normalizedPlace);

            if (!isViewed) {
              const creditResponse = await fetch("/api/consume-credit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  actionType: ACTION_TYPE.place_viewed,
                }),
              });

              if (!creditResponse.ok) {
                setPlaceCreditBlocked(true);
                return;
              }

              const creditResult = (await creditResponse.json()) as {
                ok: boolean;
                reason?: string;
              };

              if (!creditResult.ok) {
                setPlaceCreditBlocked(true);
                return;
              }

              setViewedPlaces((prev) => {
                const next = new Set(prev);
                next.add(normalizedPlace);
                return next;
              });
            }
          }
        }

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
  }, [selectedPlace, userId, completedPlaces, viewedPlaces]);

  // Load notes for selected keyword (reuse same logic as Bible chapter page)
  useEffect(() => {
    if (!selectedKeyword) {
      setKeywordNotes(null);
      setKeywordCreditBlocked(false);
      return;
    }

    async function generateNotes() {
      setLoadingNotes(true);
      setKeywordNotes(null);
      setKeywordCreditBlocked(false);

      try {
        if (!selectedKeyword) return;
        const keywordKey = selectedKeyword.name.toLowerCase().trim();

        if (userId) {
          const isCompleted = completedKeywords.has(keywordKey);

          if (!isCompleted) {
            const isViewed = viewedKeywords.has(keywordKey);

            if (!isViewed) {
              const creditResponse = await fetch("/api/consume-credit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  actionType: ACTION_TYPE.keyword_viewed,
                }),
              });

              if (!creditResponse.ok) {
                setKeywordCreditBlocked(true);
                return;
              }

              const creditResult = (await creditResponse.json()) as {
                ok: boolean;
                reason?: string;
              };

              if (!creditResult.ok) {
                setKeywordCreditBlocked(true);
                return;
              }

              setViewedKeywords((prev) => {
                const next = new Set(prev);
                next.add(keywordKey);
                return next;
              });
            }
          }
        }

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

          if (!response.ok) throw new Error(`Failed to generate notes: ${response.statusText}`);
          const json = await response.json();
          const generated = (json?.reply as string) ?? "";

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
  }, [selectedKeyword, userId, completedKeywords, viewedKeywords]);

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
          {showCreditBlocked ? null : (
            <>
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
            </>
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto"
          onClick={(e) => {
            // Only close this popup, not the parent devotional day modal
            e.stopPropagation();
            setSelectedPerson(null);
            setPersonNotes(null);
          }}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPerson(null);
                setPersonNotes(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedPerson.name}</h2>
            {personCreditBlocked ? null : loadingNotes ? (
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

                {/* MARK PERSON AS FINISHED (shares logic with People/Bible pages) */}
                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      // Resolve alias to a primary person name (same as notes generation)
                      const clickedTerm = selectedPerson.name;
                      let primaryName = clickedTerm;

                      for (const person of BIBLE_PEOPLE_LIST) {
                        if (
                          person.aliases &&
                          person.aliases.some(
                            (alias) =>
                              alias.toLowerCase().trim() ===
                              clickedTerm.toLowerCase().trim()
                          )
                        ) {
                          primaryName = person.name;
                          break;
                        }
                        if (
                          person.name.toLowerCase().trim() ===
                          clickedTerm.toLowerCase().trim()
                        ) {
                          primaryName = person.name;
                          break;
                        }
                      }

                      const personNameKey = primaryName.toLowerCase().trim();
                      const isCompleted = completedPeople.has(personNameKey);

                      return (
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            if (!userId || isCompleted) return;

                            try {
                              // Upsert into people_progress to mark learned
                              const { error } = await supabase
                                .from("people_progress")
                                .upsert(
                                  {
                                    user_id: userId,
                                    person_name: personNameKey,
                                  },
                                  {
                                    onConflict: "user_id,person_name",
                                  }
                                );

                              if (error) {
                                console.error("Error marking person as finished:", error);
                                alert("Failed to mark as finished. Please try again.");
                                return;
                              }

                              // ACTION TRACKING: log to master_actions and update profile_stats
                              try {
                                const { data: { user: authUser } } = await supabase.auth.getUser();
                                let actionUsername = username || "User";

                                if (authUser) {
                                  const meta: any = authUser.user_metadata || {};
                                  actionUsername =
                                    meta.firstName ||
                                    meta.first_name ||
                                    (authUser.email ? authUser.email.split("@")[0] : null) ||
                                    "User";
                                }

                                const formatPersonName = (name: string): string =>
                                  name
                                    .split(" ")
                                    .map((word) => {
                                      if (/^\d+$/.test(word)) return word;
                                      return (
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase()
                                      );
                                    })
                                    .join(" ");

                                const personDisplayName = formatPersonName(primaryName);

                                // Insert into master_actions
                                const { error: actionError } = await supabase
                                  .from("master_actions")
                                  .insert({
                                    user_id: userId,
                                    username: actionUsername ?? null,
                                    action_type: "person_learned",
                                    action_label: personDisplayName,
                                  });

                                if (actionError) {
                                  console.error(
                                    "Error logging action to master_actions:",
                                    actionError
                                  );
                                }

                                // Update profile_stats people_learned_count + total_actions
                                let statsUsername = username || actionUsername;
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

                                const { count, error: countError } = await supabase
                                  .from("people_progress")
                                  .select("*", { count: "exact", head: true })
                                  .eq("user_id", userId);

                                if (!countError && count !== null) {
                                  const { data: currentStats } = await supabase
                                    .from("profile_stats")
                                    .select(
                                      "username, chapters_completed_count, notes_created_count, places_discovered_count, keywords_mastered_count"
                                    )
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  const finalUsername =
                                    currentStats?.username || statsUsername || "User";

                                  const totalActions =
                                    (currentStats?.chapters_completed_count || 0) +
                                    (currentStats?.notes_created_count || 0) +
                                    (count || 0) +
                                    (currentStats?.places_discovered_count || 0) +
                                    (currentStats?.keywords_mastered_count || 0);

                                  await supabase.from("profile_stats").upsert(
                                    {
                                      user_id: userId,
                                      username: finalUsername,
                                      people_learned_count: count || 0,
                                      total_actions: totalActions,
                                      updated_at: new Date().toISOString(),
                                    },
                                    {
                                      onConflict: "user_id",
                                    }
                                  );
                                }
                              } catch (err) {
                                console.error(
                                  "[DEVOTIONAL_DAY_MODAL] Error updating stats for person:",
                                  err
                                );
                              }

                              // Local UI updates
                              setCompletedPeople((prev) => {
                                const next = new Set(prev);
                                next.add(personNameKey);
                                return next;
                              });

                              setIsAnimatingPerson(true);
                              setTimeout(() => {
                                setIsAnimatingPerson(false);
                                setSelectedPerson(null);
                                setPersonNotes(null);
                              }, 400);
                            } catch (err) {
                              console.error(
                                "[DEVOTIONAL_DAY_MODAL] Error marking person as finished:",
                                err
                              );
                              alert("Failed to mark as finished. Please try again.");
                            }
                          }}
                          disabled={isCompleted}
                          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          style={
                            isAnimatingPerson
                              ? { animation: "scale-down-bounce 0.4s ease-in-out" }
                              : undefined
                          }
                        >
                          {isCompleted
                            ? `✓ ${selectedPerson.name} marked as finished`
                            : `Mark ${selectedPerson.name} as finished`}
                        </button>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No notes available yet.</div>
            )}
          </div>
        </div>
      )}

      {/* PLACE OVERLAY MODAL (nested, higher z-index) */}
      {selectedPlace && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto"
          onClick={(e) => {
            // Only close this popup, not the parent devotional day modal
            e.stopPropagation();
            setSelectedPlace(null);
            setPlaceNotes(null);
          }}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlace(null);
                setPlaceNotes(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedPlace.name}</h2>
            {placeCreditBlocked ? null : loadingNotes ? (
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

                {/* MARK PLACE AS FINISHED */}
                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      const placeKey = selectedPlace.name
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, "_");
                      const isCompleted = completedPlaces.has(placeKey);

                      return (
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            if (!userId || isCompleted) return;

                            const placeNameKey = placeKey;

                            try {
                              const { error } = await supabase
                                .from("places_progress")
                                .upsert(
                                  {
                                    user_id: userId,
                                    place_name: placeNameKey,
                                  },
                                  {
                                    onConflict: "user_id,place_name",
                                  }
                                );

                              if (error) {
                                console.error(
                                  "Error marking place as finished:",
                                  error
                                );
                                alert("Failed to mark as finished. Please try again.");
                                return;
                              }

                              try {
                                const { data: { user: authUser } } = await supabase.auth.getUser();
                                let actionUsername = username || "User";

                                if (authUser) {
                                  const meta: any = authUser.user_metadata || {};
                                  actionUsername =
                                    meta.firstName ||
                                    meta.first_name ||
                                    (authUser.email ? authUser.email.split("@")[0] : null) ||
                                    "User";
                                }

                                const formatPlaceName = (name: string): string =>
                                  name
                                    .split(" ")
                                    .map((word) => {
                                      if (/^\d+$/.test(word)) return word;
                                      return (
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase()
                                      );
                                    })
                                    .join(" ");

                                const placeDisplayName = formatPlaceName(
                                  selectedPlace.name
                                );

                                const { error: actionError } = await supabase
                                  .from("master_actions")
                                  .insert({
                                    user_id: userId,
                                    username: actionUsername ?? null,
                                    action_type: "place_discovered",
                                    action_label: placeDisplayName,
                                  });

                                if (actionError) {
                                  console.error(
                                    "Error logging action to master_actions:",
                                    actionError
                                  );
                                }

                                let statsUsername = username || actionUsername;
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

                                const { count, error: countError } = await supabase
                                  .from("places_progress")
                                  .select("*", { count: "exact", head: true })
                                  .eq("user_id", userId);

                                if (!countError && count !== null) {
                                  const { data: currentStats } = await supabase
                                    .from("profile_stats")
                                    .select(
                                      "username, chapters_completed_count, notes_created_count, people_learned_count, keywords_mastered_count"
                                    )
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  const finalUsername =
                                    currentStats?.username || statsUsername || "User";

                                  const totalActions =
                                    (currentStats?.chapters_completed_count || 0) +
                                    (currentStats?.notes_created_count || 0) +
                                    (currentStats?.people_learned_count || 0) +
                                    (count || 0) +
                                    (currentStats?.keywords_mastered_count || 0);

                                  await supabase.from("profile_stats").upsert(
                                    {
                                      user_id: userId,
                                      username: finalUsername,
                                      places_discovered_count: count || 0,
                                      total_actions: totalActions,
                                      updated_at: new Date().toISOString(),
                                    },
                                    {
                                      onConflict: "user_id",
                                    }
                                  );
                                }
                              } catch (err) {
                                console.error(
                                  "[DEVOTIONAL_DAY_MODAL] Error updating stats for place:",
                                  err
                                );
                              }

                              setCompletedPlaces((prev) => {
                                const next = new Set(prev);
                                next.add(placeNameKey);
                                return next;
                              });

                              setIsAnimatingPlace(true);
                              setTimeout(() => {
                                setIsAnimatingPlace(false);
                                setSelectedPlace(null);
                                setPlaceNotes(null);
                              }, 400);
                            } catch (err) {
                              console.error(
                                "[DEVOTIONAL_DAY_MODAL] Error marking place as finished:",
                                err
                              );
                              alert("Failed to mark as finished. Please try again.");
                            }
                          }}
                          disabled={isCompleted}
                          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          style={
                            isAnimatingPlace
                              ? { animation: "scale-down-bounce 0.4s ease-in-out" }
                              : undefined
                          }
                        >
                          {isCompleted
                            ? `✓ ${selectedPlace.name} marked as finished`
                            : `Mark ${selectedPlace.name} as finished`}
                        </button>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No notes available yet.</div>
            )}
          </div>
        </div>
      )}

      {/* KEYWORD OVERLAY MODAL (nested, higher z-index) */}
      {selectedKeyword && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto"
          onClick={(e) => {
            // Only close this popup, not the parent devotional day modal
            e.stopPropagation();
            setSelectedKeyword(null);
            setKeywordNotes(null);
          }}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedKeyword(null);
                setKeywordNotes(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedKeyword.name}</h2>
            {keywordCreditBlocked ? null : loadingNotes ? (
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

                {/* MARK KEYWORD AS FINISHED */}
                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      const keywordKey = selectedKeyword.name.toLowerCase().trim();
                      const isCompleted = completedKeywords.has(keywordKey);

                      return (
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            if (!userId || isCompleted) return;

                            const keywordNameKey = keywordKey;

                            try {
                              const { error } = await supabase
                                .from("keywords_progress")
                                .upsert(
                                  {
                                    user_id: userId,
                                    keyword: keywordNameKey,
                                  },
                                  {
                                    onConflict: "user_id,keyword",
                                  }
                                );

                              if (error) {
                                console.error(
                                  "Error marking keyword as finished:",
                                  error
                                );
                                alert("Failed to mark as finished. Please try again.");
                                return;
                              }

                              try {
                                const { data: { user: authUser } } = await supabase.auth.getUser();
                                let actionUsername = username || "User";

                                if (authUser) {
                                  const meta: any = authUser.user_metadata || {};
                                  actionUsername =
                                    meta.firstName ||
                                    meta.first_name ||
                                    (authUser.email ? authUser.email.split("@")[0] : null) ||
                                    "User";
                                }

                                const formatKeywordName = (name: string): string =>
                                  name
                                    .split(" ")
                                    .map((word) => {
                                      if (/^\d+$/.test(word)) return word;
                                      return (
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase()
                                      );
                                    })
                                    .join(" ");

                                const keywordDisplayName = formatKeywordName(
                                  selectedKeyword.name
                                );

                                const { error: actionError } = await supabase
                                  .from("master_actions")
                                  .insert({
                                    user_id: userId,
                                    username: actionUsername ?? null,
                                    action_type: "keyword_mastered",
                                    action_label: keywordDisplayName,
                                  });

                                if (actionError) {
                                  console.error(
                                    "Error logging action to master_actions:",
                                    actionError
                                  );
                                }

                                let statsUsername = username || actionUsername;
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

                                const { count, error: countError } = await supabase
                                  .from("keywords_progress")
                                  .select("*", { count: "exact", head: true })
                                  .eq("user_id", userId);

                                if (!countError && count !== null) {
                                  const { data: currentStats } = await supabase
                                    .from("profile_stats")
                                    .select(
                                      "username, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count"
                                    )
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  const finalUsername =
                                    currentStats?.username || statsUsername || "User";

                                  const totalActions =
                                    (currentStats?.chapters_completed_count || 0) +
                                    (currentStats?.notes_created_count || 0) +
                                    (currentStats?.people_learned_count || 0) +
                                    (currentStats?.places_discovered_count || 0) +
                                    (count || 0);

                                  await supabase.from("profile_stats").upsert(
                                    {
                                      user_id: userId,
                                      username: finalUsername,
                                      keywords_mastered_count: count || 0,
                                      total_actions: totalActions,
                                      updated_at: new Date().toISOString(),
                                    },
                                    {
                                      onConflict: "user_id",
                                    }
                                  );
                                }
                              } catch (err) {
                                console.error(
                                  "[DEVOTIONAL_DAY_MODAL] Error updating stats for keyword:",
                                  err
                                );
                              }

                              setCompletedKeywords((prev) => {
                                const next = new Set(prev);
                                next.add(keywordNameKey);
                                return next;
                              });

                              setIsAnimatingKeyword(true);
                              setTimeout(() => {
                                setIsAnimatingKeyword(false);
                                setSelectedKeyword(null);
                                setKeywordNotes(null);
                              }, 400);
                            } catch (err) {
                              console.error(
                                "[DEVOTIONAL_DAY_MODAL] Error marking keyword as finished:",
                                err
                              );
                              alert("Failed to mark as finished. Please try again.");
                            }
                          }}
                          disabled={isCompleted}
                          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          style={
                            isAnimatingKeyword
                              ? { animation: "scale-down-bounce 0.4s ease-in-out" }
                              : undefined
                          }
                        >
                          {isCompleted
                            ? `✓ ${selectedKeyword.name} marked as finished`
                            : `Mark ${selectedKeyword.name} as finished`}
                        </button>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No notes available yet.</div>
            )}
          </div>
        </div>
      )}

      <CreditLimitModal
        open={showCreditBlocked}
        userId={userId}
        zIndexClassName="z-[60]"
        onClose={handleClose}
      />

      <CreditLimitModal
        open={personCreditBlocked}
        userId={userId}
        zIndexClassName="z-[60]"
        onClose={() => {
          setPersonCreditBlocked(false);
          setSelectedPerson(null);
          setPersonNotes(null);
        }}
      />

      <CreditLimitModal
        open={placeCreditBlocked}
        userId={userId}
        zIndexClassName="z-[60]"
        onClose={() => {
          setPlaceCreditBlocked(false);
          setSelectedPlace(null);
          setPlaceNotes(null);
        }}
      />

      <CreditLimitModal
        open={keywordCreditBlocked}
        userId={userId}
        zIndexClassName="z-[60]"
        onClose={() => {
          setKeywordCreditBlocked(false);
          setSelectedKeyword(null);
          setKeywordNotes(null);
        }}
      />
    </div>
  );
}
