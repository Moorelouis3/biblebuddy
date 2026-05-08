"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import { enrichPlainText } from "../lib/bibleHighlighting";
import { ACTION_TYPE } from "../lib/actionTypes";
import { ensureBibleEntityLearned } from "../lib/bibleEntityProgress";
import { resolveBibleReference } from "../lib/bibleTermResolver";
import { consumeCreditAction } from "../lib/creditClient";
import { findKeywordNotes, findPersonNotes, findPlaceNotes, getKeywordPopupNotes, getPersonPopupNotes, getPlacePopupNotes, saveKeywordNotes, savePersonNotes, savePlaceNotes } from "../lib/bibleNotes";
import CreditLimitModal from "./CreditLimitModal";
import { LouisAvatar } from "./LouisAvatar";

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
  onBibleReadingClick: (book: string, chapter: number) => void;
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
  const [learnedToast, setLearnedToast] = useState<string | null>(null);

  const [readingChecked, setReadingChecked] = useState(dayProgress?.reading_completed || false);
  const [reflectionText, setReflectionText] = useState(dayProgress?.reflection_text || "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
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

  const devotionalParagraphs = useMemo(
    () =>
      day.devotional_text
        ? day.devotional_text.split(/\n\s*\n/).map((para, idx) => ({
            key: `${day.day_number}-${idx}`,
            html: enrichPlainText(para),
          }))
        : [],
    [day.day_number, day.devotional_text]
  );

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
        setSelectedPerson({ name: resolveBibleReference("people", term) });
        setSelectedPlace(null);
        setSelectedKeyword(null);
      } else if (type === "places") {
        setSelectedPlace({ name: resolveBibleReference("places", term) });
        setSelectedPerson(null);
        setSelectedKeyword(null);
      } else if (type === "keywords") {
        setSelectedKeyword({ name: resolveBibleReference("keywords", term) });
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
        
        const primaryName = resolveBibleReference("people", selectedPerson!.name);
        
        const personNameKey = primaryName.toLowerCase().trim();

        if (userId) {
          const isCompleted = completedPeople.has(personNameKey);
          const creditResult = await consumeCreditAction(ACTION_TYPE.person_viewed, {
            userId,
            actionLabel: primaryName,
          });
          if (!creditResult.ok) {
            setPersonCreditBlocked(true);
            return;
          }

          setViewedPeople((prev) => {
            const next = new Set(prev);
            next.add(personNameKey);
            return next;
          });

          if (!isCompleted) {
            const result = await ensureBibleEntityLearned({ kind: "people", name: primaryName, userId, username });
            if (result.inserted) {
              triggerPoints(1);
              setCompletedPeople((prev) => new Set(prev).add(result.normalizedKey));
            }
          }
        }

        setPersonNotes(await getPersonPopupNotes(primaryName));
        return;

        const existingNotes = await findPersonNotes(personNameKey);
        if (existingNotes) {
          setPersonNotes(existingNotes);
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

        const notesText = await savePersonNotes(personNameKey, generated);
        setPersonNotes(notesText);
      } catch (err: any) {
        console.error("Error loading person notes:", err);
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedPerson, userId]);

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
        const normalizedPlace = selectedPlace!.name.toLowerCase().trim().replace(/\s+/g, "_");

        setPlaceNotes(await getPlacePopupNotes(selectedPlace!.name));
        if (userId) {
          void (async () => {
            const creditResult = await consumeCreditAction(ACTION_TYPE.place_viewed, { userId });
            if (!creditResult.ok) {
              setPlaceCreditBlocked(true);
              return;
            }

            if (!completedPlaces.has(normalizedPlace)) {
              const result = await ensureBibleEntityLearned({ kind: "places", name: selectedPlace!.name, userId, username });
              if (result.inserted) {
                triggerPoints(1);
                setCompletedPlaces((prev) => new Set(prev).add(result.normalizedKey));
              }
            }
          })();
        }
        return;

        const existingNotes = await findPlaceNotes(normalizedPlace);
        if (existingNotes) {
          setPlaceNotes(existingNotes);
          setLoadingNotes(false);
          return;
        }

        // STEP 2: Generate notes using OpenAI
        const prompt = `You are Little Louis. 
Generate beginner friendly Bible notes about the PLACE: ${selectedPlace!.name}.

TEMPLATE
# Where is this place?
One short paragraph explaining where ${selectedPlace!.name} is located (region, country, significance) and why it matters in the Bible.

# What happens at ${selectedPlace!.name}?
Include two or three specific Bible references where ${selectedPlace!.name} appears. Each reference should include the book, chapter, and verse (e.g., "Genesis 12:1-9"). After each reference, write one sentence explaining what happens in that passage at ${selectedPlace!.name}.

# Why is ${selectedPlace!.name} significant?
List two or three key reasons why ${selectedPlace!.name} matters in the Bible story. Each point should be one sentence. Keep it simple and beginner-friendly.

# How does ${selectedPlace!.name} connect to Jesus?
One short paragraph connecting ${selectedPlace!.name} to Jesus, prophecy, or the bigger story of redemption. Keep it simple and clear.

# What can we learn from ${selectedPlace!.name}?
One short paragraph with a simple, practical life application related to place, journey, or God's presence.

RULES
DO NOT include a header like "${selectedPlace!.name} Notes" or any title at the beginning. Start directly with "# Where is this place?".
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

        const notesText = await savePlaceNotes(normalizedPlace, generated);
        setPlaceNotes(notesText);
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
        const keywordKey = selectedKeyword!.name.toLowerCase().trim();

        if (userId) {
          const isCompleted = completedKeywords.has(keywordKey);

          if (!isCompleted) {
            const isViewed = viewedKeywords.has(keywordKey);

            if (!isViewed) {
              const creditResult = await consumeCreditAction(ACTION_TYPE.keyword_viewed, { userId });
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

          if (!isCompleted) {
            const result = await ensureBibleEntityLearned({ kind: "keywords", name: selectedKeyword!.name, userId, username });
            if (result.inserted) {
              triggerPoints(1);
              setCompletedKeywords((prev) => new Set(prev).add(result.normalizedKey));
            }
          }
        }

        setKeywordNotes(await getKeywordPopupNotes(selectedKeyword!.name));
        return;

        const existingNotes = await findKeywordNotes(selectedKeyword!.name);
        let notesText = "";
        if (existingNotes) {
          notesText = existingNotes ?? "";
        } else {
          // STEP 2: Generate notes using OpenAI
          const prompt = `You are Little Louis. 
Generate beginner friendly Bible notes about the KEYWORD: ${selectedKeyword!.name}.

TEMPLATE
# What is this concept?
One short paragraph explaining what ${selectedKeyword!.name} means in the Bible in simple, everyday language.

# Where do we see ${selectedKeyword!.name} in Scripture?
Include two or three specific Bible references where ${selectedKeyword!.name} appears or is explained. Each reference should include the book, chapter, and verse (e.g., "Genesis 15:1-21"). After each reference, write one sentence explaining how ${selectedKeyword!.name} is used or shown in that passage.

# Why does ${selectedKeyword!.name} matter?
List two or three key reasons why understanding ${selectedKeyword!.name} is important for reading the Bible. Each point should be one sentence. Keep it simple and beginner-friendly.

# How does ${selectedKeyword!.name} connect to Jesus?
One short paragraph connecting ${selectedKeyword!.name} to Jesus, the gospel, or the bigger story of redemption. Keep it simple and clear.

# What does ${selectedKeyword!.name} mean for us today?
One short paragraph with a simple, practical life application. How can understanding ${selectedKeyword!.name} help us follow God better?

RULES
DO NOT include a header like "${selectedKeyword!.name} Notes" or any title at the beginning. Start directly with "# What is this concept?".
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

          notesText = await saveKeywordNotes(selectedKeyword!.name, generated);
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
                <div className="text-gray-700" style={{ fontSize: '1rem' }}>
                  {devotionalParagraphs.map((para) => (
                    <p
                      key={para.key}
                      className="mb-4 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: para.html }}
                    />
                  ))}
                </div>
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
                        onClick={() => onBibleReadingClick(day.bible_reading_book, day.bible_reading_chapter)}
                        className="text-blue-600 hover:text-blue-700 font-medium underline text-left"
                      >
                        {(() => {
                          const book = day.bible_reading_book;
                          const chapter = day.bible_reading_chapter;
                          const startVerse = (day as any).bible_reading_start_verse;
                          const endVerse = (day as any).bible_reading_end_verse;
                          if (
                            startVerse != null &&
                            endVerse != null &&
                            startVerse !== '' &&
                            endVerse !== ''
                          ) {
                            return `Read ${book} ${chapter}:${startVerse}-${endVerse}`;
                          }
                          return `Read ${book} ${chapter}`;
                        })()}
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
          onClick={(e) => e.stopPropagation()}
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
            {personCreditBlocked ? null : !personNotes ? (
              <div className="flex flex-col items-center py-10 gap-5">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-5/6" />
                  <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-3/4" />
                </div>
                <p className="text-sm text-gray-400 italic animate-pulse">{selectedPerson.name} is loading…</p>
              </div>
            ) : (
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
              </div>
            )}
          </div>
        </div>
      )}

      {/* PLACE OVERLAY MODAL (nested, higher z-index) */}
      {selectedPlace && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
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
            <div className="mb-4 flex justify-center">`r`n              <LouisAvatar mood="wave" size={64} />`r`n            </div>`r`n            <h2 className="mb-4 text-center text-3xl font-bold">{selectedPlace.name}</h2>
            {placeCreditBlocked ? null : !placeNotes ? (
              <div className="flex flex-col items-center py-10 gap-5">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-5/6" />
                  <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-3/4" />
                </div>
                <p className="text-sm text-gray-400 italic animate-pulse">{selectedPlace.name} is loading…</p>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}

      {/* KEYWORD OVERLAY MODAL (nested, higher z-index) */}
      {selectedKeyword && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
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
            {keywordCreditBlocked ? null : !keywordNotes ? (
              <div className="flex flex-col items-center py-10 gap-5">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-5/6" />
                  <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-3/4" />
                </div>
                <p className="text-sm text-gray-400 italic animate-pulse">{selectedKeyword.name} is loading…</p>
              </div>
            ) : (
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

      {/* ── Louis "learned" toast ──────────────────────────────────────────── */}
      {learnedToast && (
        <div
          className="fixed bottom-24 left-1/2 z-[70] flex items-center gap-3 bg-white border border-green-200 rounded-2xl shadow-2xl px-4 py-3"
          style={{ transform: "translateX(-50%)", animation: "slideUp 0.3s ease-out" }}
        >
          <LouisAvatar mood="stareyes" size={44} />
          <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{learnedToast}</p>
        </div>
      )}
    </div>
  );
}

import { triggerPoints } from "./PointsPop";
