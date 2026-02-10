"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import { enrichBibleVerses } from "../lib/bibleHighlighting";
import { BIBLE_PEOPLE_LIST } from "../lib/biblePeopleList";
import { ACTION_TYPE } from "../lib/actionTypes";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

type BibleApiVerse = {
  verse: number;
  text: string;
};

type BibleApiResponse = {
  reference: string;
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
  verses: BibleApiVerse[];
};

// Helper function to normalize book names for API
function normalizeBookName(book: string): string {
  return book.toLowerCase().replace(/\s+/g, "");
}

// Helper function to convert verses to sections
function convertToSections(verses: BibleApiVerse[], bookDisplay: string): Section[] {
  if (!verses || verses.length === 0) {
    return [];
  }
  
  return [{
    id: "main",
    emoji: "📖",
    title: `${bookDisplay}`,
    verses: verses.map(v => ({ num: v.verse, text: v.text })),
  }];
}

// Helper functions for normalizing markdown
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

export default function BibleReadingModal({ book, chapter, onClose }: BibleReadingModalProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrichedContent, setEnrichedContent] = useState<string | null>(null);
  const loadingRef = useRef(false);
  const verseContainerRef = useRef<HTMLDivElement>(null);
  
  // Modal states for people/places/keywords popups (nested modals)
  const [selectedPerson, setSelectedPerson] = useState<{ name: string } | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{ name: string } | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<{ name: string } | null>(null);
  const [personNotes, setPersonNotes] = useState<string | null>(null);
  const [placeNotes, setPlaceNotes] = useState<string | null>(null);
  const [keywordNotes, setKeywordNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [completedPeople, setCompletedPeople] = useState<Set<string>>(new Set());
  const [personCreditBlocked, setPersonCreditBlocked] = useState(false);
  const [viewedPeople, setViewedPeople] = useState<Set<string>>(new Set());
  const [completedPlaces, setCompletedPlaces] = useState<Set<string>>(new Set());
  const [placeCreditBlocked, setPlaceCreditBlocked] = useState(false);
  const [viewedPlaces, setViewedPlaces] = useState<Set<string>>(new Set());
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [keywordCreditBlocked, setKeywordCreditBlocked] = useState(false);
  const [viewedKeywords, setViewedKeywords] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadUserAndProgress() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id);

        const { data, error } = await supabase
          .from("people_progress")
          .select("person_name")
          .eq("user_id", user.id);

        if (error) {
          console.error("[BIBLE_READING_MODAL] Error loading people progress:", error);
          return;
        }

        const completedSet = new Set<string>();
        data?.forEach((row) => {
          completedSet.add(String(row.person_name || "").toLowerCase().trim());
        });
        setCompletedPeople(completedSet);

        const { data: placesData, error: placesError } = await supabase
          .from("places_progress")
          .select("place_name")
          .eq("user_id", user.id);

        if (placesError) {
          console.error("[BIBLE_READING_MODAL] Error loading places progress:", placesError);
          return;
        }

        const completedPlacesSet = new Set<string>();
        placesData?.forEach((row) => {
          completedPlacesSet.add(String(row.place_name || "").toLowerCase().trim());
        });
        setCompletedPlaces(completedPlacesSet);

        const { data: keywordsData, error: keywordsError } = await supabase
          .from("keywords_progress")
          .select("keyword_name")
          .eq("user_id", user.id);

        if (keywordsError) {
          console.error("[BIBLE_READING_MODAL] Error loading keywords progress:", keywordsError);
          return;
        }

        const completedKeywordsSet = new Set<string>();
        keywordsData?.forEach((row) => {
          completedKeywordsSet.add(String(row.keyword_name || "").toLowerCase().trim());
        });
        setCompletedKeywords(completedKeywordsSet);
      } catch (err) {
        console.error("[BIBLE_READING_MODAL] Error loading user:", err);
      }
    }

    loadUserAndProgress();
  }, []);

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

        // Normalize book name
        const bookParam = book.toLowerCase().trim();
        const bookDisplay = book
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");

        // Step A: Check Supabase table bible_chapters FIRST
        const { data: supabaseData, error: supabaseError } = await supabase
          .from("bible_chapters")
          .select("content_json, enriched_content")
          .eq("book", bookParam)
          .eq("chapter", chapter)
          .maybeSingle();

        if (supabaseData && !supabaseError) {
          // Step B: If enriched_content exists, use it directly
          if (supabaseData.enriched_content) {
            setEnrichedContent(supabaseData.enriched_content);
            const content = supabaseData.content_json as any;
            if (content && content.verses) {
              const verses = content.verses as BibleApiVerse[];
              setSections(convertToSections(verses, bookDisplay));
            }
            setLoading(false);
            loadingRef.current = false;
            return;
          }
          
          // Step C: If content_json exists but no enriched_content, generate it
          if (supabaseData.content_json) {
            const content = supabaseData.content_json as any;
            if (content && content.verses) {
              const verses = content.verses as BibleApiVerse[];
              setSections(convertToSections(verses, bookDisplay));
              
              // Generate enriched_content and save it
              const enriched = await enrichBibleVerses(verses);
              setEnrichedContent(enriched);
              
              // Update database with enriched_content
              await supabase
                .from("bible_chapters")
                .update({ enriched_content: enriched })
                .eq("book", bookParam)
                .eq("chapter", chapter);
              
              setLoading(false);
              loadingRef.current = false;
              return;
            }
          }
        }

        // Step D: If NOT found in Supabase, fetch from bible-api.com
        const normalizedBook = normalizeBookName(book);
        const apiUrl = `https://bible-api.com/${normalizedBook}+${chapter}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const apiData: BibleApiResponse = await response.json();

        // Step E: Generate enriched_content from verses
        const enriched = await enrichBibleVerses(apiData.verses);
        setEnrichedContent(enriched);

        // Step F: Save to Supabase (check first to prevent duplicates)
        const { data: existingCheck } = await supabase
          .from("bible_chapters")
          .select("id")
          .eq("book", bookParam)
          .eq("chapter", chapter)
          .maybeSingle();

        if (!existingCheck) {
          await supabase
            .from("bible_chapters")
            .insert([
              {
                book: bookParam,
                chapter: chapter,
                content_json: apiData,
                enriched_content: enriched,
              },
            ]);
        }

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

  // Event delegation for click handlers on enriched content (same as Bible chapter page)
  useEffect(() => {
    if (!enrichedContent) return;

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

    // Attach to the verse container to scope clicks
    // Use a small delay to ensure the DOM is ready after enrichedContent renders
    const attachHandler = () => {
      const container = verseContainerRef.current;
      if (container) {
        container.addEventListener("click", handler, true); // Use capture phase for better reliability
        return true;
      }
      return false;
    };

    // Try to attach immediately
    let attached = attachHandler();
    
    // If not attached yet, retry after a short delay
    let timeout: NodeJS.Timeout | null = null;
    if (!attached) {
      timeout = setTimeout(() => {
        attachHandler();
      }, 100);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      const container = verseContainerRef.current;
      if (container) {
        container.removeEventListener("click", handler, true);
      }
    };
  }, [enrichedContent]);

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
              headers: {
                "Content-Type": "application/json",
              },
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

        // STEP 1: Check Supabase FIRST (use person_name column)
        const { data: existing, error: existingError } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        if (existingError && existingError.code !== 'PGRST116') {
          console.error("Error checking existing notes:", existingError);
        }

        if (existing?.notes_text && existing.notes_text.trim().length > 0) {
          setPersonNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // STEP 2: Generate notes using OpenAI (same as Bible chapter page)
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

        // STEP 3: Race condition protection
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
                headers: {
                  "Content-Type": "application/json",
                },
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

        const { data: existing } = await supabase
          .from("places_in_the_bible_notes")
          .select("notes_text")
          .eq("normalized_place", normalizedPlace)
          .maybeSingle();

        if (existing?.notes_text && existing.notes_text.trim().length > 0) {
          setPlaceNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // Generate notes using OpenAI
        const prompt = `You are Little Louis.

Generate beginner friendly Bible notes about the PLACE: ${selectedPlace.name}.

Follow this EXACT markdown template and rules.

TEMPLATE:

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
                headers: {
                  "Content-Type": "application/json",
                },
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
        ) : (
          <div 
            ref={verseContainerRef}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6 max-h-[60vh] overflow-y-auto"
          >
            {enrichedContent ? (
              // Use pre-rendered enriched content if available
              <div 
                className="space-y-5"
                dangerouslySetInnerHTML={{ __html: enrichedContent }}
              />
            ) : (
              // Fallback to regular rendering (for chapters without enriched_content yet)
              sections.map((section) => (
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
              ))
            )}
          </div>
        )}
      </div>

      {/* PERSON OVERLAY MODAL (nested, higher z-index) */}
      {selectedPerson && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto"
          onClick={(e) => {
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
            {personCreditBlocked ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Out of Credits</h3>
                <p className="text-gray-600 text-sm">
                  You've used all 5 daily credits available to free users.
                </p>
                <ul className="mt-4 space-y-1 text-left text-sm text-gray-600 list-disc pl-5">
                  <li>People/Places/Keywords</li>
                  <li>One round of trivia</li>
                  <li>Open devotionals</li>
                  <li>Start a new study action</li>
                </ul>
                <a
                  href="/upgrade"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Upgrade to Bible Buddy Pro
                </a>
              </div>
            ) : loadingNotes ? (
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
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto"
          onClick={(e) => {
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
            {placeCreditBlocked ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Out of Credits</h3>
                <p className="text-gray-600 text-sm">
                  You've used all 5 daily credits available to free users.
                </p>
                <ul className="mt-4 space-y-1 text-left text-sm text-gray-600 list-disc pl-5">
                  <li>People/Places/Keywords</li>
                  <li>One round of trivia</li>
                  <li>Open devotionals</li>
                  <li>Start a new study action</li>
                </ul>
                <a
                  href="/upgrade"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Upgrade to Bible Buddy Pro
                </a>
              </div>
            ) : loadingNotes ? (
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
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto"
          onClick={(e) => {
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
            {keywordCreditBlocked ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Out of Credits</h3>
                <p className="text-gray-600 text-sm">
                  You've used all 5 daily credits available to free users.
                </p>
                <ul className="mt-4 space-y-1 text-left text-sm text-gray-600 list-disc pl-5">
                  <li>People/Places/Keywords</li>
                  <li>One round of trivia</li>
                  <li>Open devotionals</li>
                  <li>Start a new study action</li>
                </ul>
                <a
                  href="/upgrade"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Upgrade to Bible Buddy Pro
                </a>
              </div>
            ) : loadingNotes ? (
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

