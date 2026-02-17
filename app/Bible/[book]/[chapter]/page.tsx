"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LouisAvatar } from "../../../../components/LouisAvatar";
import { supabase } from "../../../../lib/supabaseClient";
import { markChapterDone, isChapterCompleted, getBookTotalChapters, getCompletedChapters, isBookComplete } from "../../../../lib/readingProgress";
import confetti from "canvas-confetti";
import { getFeaturedCharactersForMatthew, FeaturedCharacter } from "../../../../lib/featuredCharacters";
import { FeaturedCharacterModal } from "../../../../components/FeaturedCharacterModal";
import { useFeaturedCharacters } from "../../../../hooks/useFeaturedCharacters";
import ReactMarkdown from "react-markdown";
import { BIBLE_HIGHLIGHTING_VERSION_MARKER, enrichBibleVerses } from "../../../../lib/bibleHighlighting";
import { logStudyView } from "../../../../lib/studyViewLimit";
import { BIBLE_PEOPLE_LIST } from "../../../../lib/biblePeopleList";
import { BIBLE_PLACES_LIST } from "../../../../lib/biblePlacesList";
import { BIBLE_KEYWORDS_LIST } from "../../../../lib/bibleKeywordsList";
import { ACTION_TYPE } from "../../../../lib/actionTypes";
import CreditLimitModal from "../../../../components/CreditLimitModal";

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
  const bookParam = decodeURIComponent(String(params.book));
  const book = bookParam;
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
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [levelInfoForModal, setLevelInfoForModal] = useState<{
    level: number;
    chaptersNeededForNext: number;
    nextLevel: number;
    leveledUp: boolean;
  } | null>(null);
  
  // Featured Characters state (Matthew only)
  const [featuredCharacters, setFeaturedCharacters] = useState<FeaturedCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<FeaturedCharacter | null>(null);
  const verseContainerRef = useRef<HTMLDivElement>(null);
  
  // Enriched content (pre-highlighted HTML)
  const [enrichedContent, setEnrichedContent] = useState<string | null>(null);
  
  // Overlay modals state (reuse same pattern as People/Places/Keywords pages)
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
  const [translation, setTranslation] = useState<"web" | "asv" | "kjv">("web");
  const [plainTextMode, setPlainTextMode] = useState(false);
  
  // Completion tracking state (same as database pages)
  const [completedPeople, setCompletedPeople] = useState<Set<string>>(new Set());
  const [completedPlaces, setCompletedPlaces] = useState<Set<string>>(new Set());
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [isAnimatingPerson, setIsAnimatingPerson] = useState(false);
  const [isAnimatingPlace, setIsAnimatingPlace] = useState(false);
  const [isAnimatingKeyword, setIsAnimatingKeyword] = useState(false);
  const [fromReadingPlan, setFromReadingPlan] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("bible_plain_text_mode");
    if (storedValue !== null) {
      setPlainTextMode(storedValue === "1");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bible_plain_text_mode", plainTextMode ? "1" : "0");
  }, [plainTextMode]);

  // Normalize markdown functions (reused from People/Places/Keywords pages)
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

  // Helper function to resolve person name (handles aliases)
  function resolvePersonName(clickedName: string): string {
    const normalizedClicked = clickedName.toLowerCase().trim();
    
    // Search through BIBLE_PEOPLE_LIST to find matching name or alias
    for (const person of BIBLE_PEOPLE_LIST) {
      if (person.name.toLowerCase().trim() === normalizedClicked) {
        return person.name; // Return primary name
      }
      // Check aliases
      if (person.aliases) {
        for (const alias of person.aliases) {
          if (alias.toLowerCase().trim() === normalizedClicked) {
            return person.name; // Return primary name for alias
          }
        }
      }
    }
    
    // If not found, return the clicked name as-is
    return clickedName;
  }

  // Event delegation for click handlers on enriched content
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.classList.contains("bible-highlight")) return;

      const type = el.dataset.type;
      const term = el.dataset.term;
      if (!type || !term) return;

      // Resolve to database record name (handles aliases for people)
      if (type === "people") {
        const resolvedName = resolvePersonName(term);
        setSelectedPerson({ name: resolvedName });
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

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Load notes for selected person (reuse same logic as People page)
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
        const personNameKey = selectedPerson.name.toLowerCase().trim();

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

        // STEP 1: Check Supabase FIRST
        const { data: existing, error: existingError } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        if (existingError && existingError.code !== 'PGRST116') {
          console.error("[bible_people_notes] Error checking:", existingError);
        }

        if (existing?.notes_text && existing.notes_text.trim().length > 0) {
          setPersonNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // STEP 2: Generate notes using ChatGPT (same as People page)
        // Determine gender for pronoun usage (simple heuristic - can be improved)
        const isFemale = /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Delilah|Bathsheba|Jezebel|Lydia|Phoebe|Priscilla|Anna|Elizabeth|Joanna|Susanna|Judith|Vashti|Bernice|Drusilla|Euodia|Syntyche|Chloe|Nympha|Tryphaena|Tryphosa|Julia|Claudia|Persis)/i.test(selectedPerson.name);
        const pronoun = isFemale ? "Her" : "Him";
        const whoPronoun = isFemale ? "She" : "He";
        
        const prompt = `You are Little Louis. Generate Bible study style notes for ${selectedPerson.name} from Scripture using the EXACT markdown structure below.

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

  // Load notes for selected place (reuse same logic as Places page)
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

        // STEP 2: Generate notes using ChatGPT (same as Places page)
        const prompt = `You are Little Louis.

Generate beginner friendly Bible notes about the PLACE: ${selectedPlace.name}.

Follow this EXACT markdown template and rules.

TEMPLATE:

# 🧭 What This Place Is

(two short paragraphs)




# 🗺️ Where It Appears in the Story

(two to three short paragraphs)




# 🔑 Key Moments Connected to This Place

🔥 sentence  

🔥 sentence  

🔥 sentence  

🔥 sentence  




# 📖 Where You Find It in Scripture

📖 Book Chapter–Chapter  

📖 Book Chapter–Chapter  

📖 Book Chapter–Chapter  




# 🌱 Why This Place Matters

(two to three short paragraphs)



RULES:
- Use # for all section headers
- Double line breaks between sections
- No hyphens anywhere
- Use emoji bullets only
- No lists with dashes
- No meta commentary
- No deep theology
- Cinematic but simple
- Total length about 200–300 words
- Do NOT include the place name as a header`;
        
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

        if (!response.ok) throw new Error(`Failed to generate notes`);
        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        const { data: existingCheck } = await supabase
          .from("places_in_the_bible_notes")
          .select("notes_text")
          .eq("normalized_place", normalizedPlace)
          .maybeSingle();

        let notesText = "";
        if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
          notesText = existingCheck.notes_text;
        } else {
          await supabase
            .from("places_in_the_bible_notes")
            .upsert({ place: selectedPlace.name, normalized_place: normalizedPlace, notes_text: generated }, { onConflict: "normalized_place" });

          const { data: finalData } = await supabase
            .from("places_in_the_bible_notes")
            .select("notes_text")
            .eq("normalized_place", normalizedPlace)
            .single();
          notesText = finalData?.notes_text || generated;
        }

        setPlaceNotes(notesText);
      } catch (err: any) {
        console.error("Error loading place notes:", err);
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedPlace, userId, completedPlaces, viewedPlaces]);

  // Load notes for selected keyword (reuse same logic as Keywords page)
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

        const { data: existing } = await supabase
          .from("keywords_in_the_bible")
          .select("notes_text")
          .eq("keyword", keywordKey)
          .maybeSingle();

        if (existing?.notes_text && existing.notes_text.trim().length > 0) {
          setKeywordNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // STEP 2: Generate notes using ChatGPT (same as Keywords page)
        const prompt = `You are Little Louis.

Generate beginner friendly Bible notes about the KEYWORD: ${selectedKeyword.name}.

Follow this EXACT markdown template and rules.

TEMPLATE:

# 📖 What This Keyword Means

(two short paragraphs)




# 🔍 Where It Appears in Scripture

(two to three short paragraphs)




# 🔑 Key Verses Using This Keyword

🔥 sentence  

🔥 sentence  

🔥 sentence  

🔥 sentence  




# 📚 Where You Find It in the Bible

📖 Book Chapter–Chapter  

📖 Book Chapter–Chapter  

📖 Book Chapter–Chapter  




# 🌱 Why This Keyword Matters

(two to three short paragraphs)



RULES:
- Use # for all section headers
- Double line breaks between sections
- No hyphens anywhere
- Use emoji bullets only
- No lists with dashes
- No meta commentary
- No deep theology
- Cinematic but simple
- Total length about 200–300 words
- Do NOT include the keyword name as a header`;
        
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

        if (!response.ok) throw new Error(`Failed to generate notes`);
        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        const { data: existingCheck } = await supabase
          .from("keywords_in_the_bible")
          .select("notes_text")
          .eq("keyword", keywordKey)
          .maybeSingle();

        let notesText = "";
        if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
          notesText = existingCheck.notes_text;
        } else {
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


  useEffect(() => {
    async function loadChapter() {
      // Prevent double execution in React Strict Mode
      if (loadingRef.current) {
        return;
      }
      loadingRef.current = true;

      try {
        console.log("[CHAPTER_LOADING] start", { book, chapter, translation });
        setLoading(true);
        setError(null);

        const shouldUseSupabaseCache = translation === "web";

        // Step A: Check Supabase table bible_chapters FIRST (WEB only)
        const { data: supabaseData, error: supabaseError } = shouldUseSupabaseCache
          ? await supabase
              .from("bible_chapters")
              .select("content_json, enriched_content")
              .eq("book", book)
              .eq("chapter", chapter)
              .maybeSingle()
          : { data: null, error: null };

        if (supabaseData && !supabaseError) {
          // Step B: If enriched_content exists, use it directly when it matches the current highlighting version
          if (supabaseData.enriched_content) {
            const hasCurrentHighlightVersion = supabaseData.enriched_content.includes(BIBLE_HIGHLIGHTING_VERSION_MARKER);

            if (hasCurrentHighlightVersion) {
              setEnrichedContent(supabaseData.enriched_content);
              const content = supabaseData.content_json as any;
              if (content && content.verses) {
                const verses = content.verses as BibleApiVerse[];
                const bookDisplay = book
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ");
                setSections(convertToSections(verses, bookDisplay));
              }
              setLoading(false);
              loadingRef.current = false;
              return;
            }

            const content = supabaseData.content_json as any;
            if (content && content.verses) {
              const verses = content.verses as BibleApiVerse[];
              const bookDisplay = book
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
              setSections(convertToSections(verses, bookDisplay));

              const regeneratedEnrichedContent = await enrichBibleVerses(verses);
              setEnrichedContent(regeneratedEnrichedContent);

              await supabase
                .from("bible_chapters")
                .update({ enriched_content: regeneratedEnrichedContent })
                .eq("book", book)
                .eq("chapter", chapter);

              setLoading(false);
              loadingRef.current = false;
              return;
            }

            // Stale enriched_content exists but no cached verses available to regenerate.
            // Fall through to API fetch so we can rebuild highlights with current rules.
          }
          
          // Step C: If content_json exists but no enriched_content, use it and generate enriched_content
          if (supabaseData.content_json) {
            const content = supabaseData.content_json as any;
            if (content && content.verses) {
              const verses = content.verses as BibleApiVerse[];
              const bookDisplay = book
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
              setSections(convertToSections(verses, bookDisplay));
              
              // Generate enriched_content and save it
              const enriched = await enrichBibleVerses(verses);
              setEnrichedContent(enriched);
              
              // Update database with enriched_content
              await supabase
                .from("bible_chapters")
                .update({ enriched_content: enriched })
                .eq("book", book)
                .eq("chapter", chapter);
              
              setLoading(false);
              loadingRef.current = false;
              return;
            }
          }
        }

        // Step C: If NOT found in Supabase (or non-WEB translation), fetch from bible-api.com
        const normalizedBook = normalizeBookName(book);
        const apiUrl = `https://bible-api.com/${normalizedBook}+${chapter}?translation=${translation}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);
        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const apiData: BibleApiResponse = await response.json();

        // Step D: Generate enriched_content from verses
        const enriched = await enrichBibleVerses(apiData.verses);
        setEnrichedContent(enriched);

        // Step E: Save to Supabase ONCE - check first to prevent duplicates (WEB only)
        if (shouldUseSupabaseCache) {
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
                  enriched_content: enriched,
                },
              ]);

            if (insertError) {
              console.error("Error saving to Supabase:", insertError);
              // Continue anyway - we have the data
            }
          }
        }

        // Render verses
        const bookDisplay = book
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
        setSections(convertToSections(apiData.verses, bookDisplay));
        console.log("[CHAPTER_LOADING] success", { book, chapter, translation, source: "bible-api" });
      } catch (err) {
        console.error("Error loading chapter:", err);
        const errMessage = err instanceof Error ? err.message : "Failed to load chapter";
        setError(
          errMessage.includes("aborted") || errMessage.includes("AbortError")
            ? "Chapter request timed out. Please refresh and try again."
            : errMessage
        );
      } finally {
        console.log("[CHAPTER_LOADING] end", { book, chapter, translation, hasError: !!error });
        setLoading(false);
        loadingRef.current = false;
      }
    }

      if (book && Number.isFinite(chapter) && chapter > 0) {
        loadChapter();
      } else {
        setError("Invalid chapter route.");
        setLoading(false);
        loadingRef.current = false;
      }
    }, [book, chapter, translation]);

  // Get user ID and load completion progress (same as database pages)
  useEffect(() => {
    async function loadUserAndProgress() {
      try {
        setLoadingProgress(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          return;
        }

        setUserId(user.id);
        
        // Extract username from user metadata
        const meta: any = user.user_metadata || {};
        const extractedUsername =
          meta.firstName ||
          meta.first_name ||
          (user.email ? user.email.split("@")[0] : null) ||
          "User";
        setUsername(extractedUsername);

        // Fetch all completed people for this user (batch query)
        const { data: peopleData, error: peopleError } = await supabase
          .from("people_progress")
          .select("person_name")
          .eq("user_id", user.id);

        if (peopleError) {
          console.error("Error loading people progress:", peopleError);
        } else {
          const completedPeopleSet = new Set<string>();
          peopleData?.forEach((row) => {
            // Store normalized name (lowercase, trimmed) for matching
            completedPeopleSet.add(row.person_name.toLowerCase().trim());
          });
          setCompletedPeople(completedPeopleSet);
        }

        // Fetch all completed places for this user
        const { data: placesData, error: placesError } = await supabase
          .from("places_progress")
          .select("place_name")
          .eq("user_id", user.id);

        if (placesError) {
          console.error("Error loading places progress:", placesError);
        } else {
          const completedPlacesSet = new Set<string>();
          placesData?.forEach((row) => {
            // Store normalized name (lowercase, spaces to underscores) for matching
            completedPlacesSet.add(row.place_name.toLowerCase().trim());
          });
          setCompletedPlaces(completedPlacesSet);
        }

        // Fetch all completed keywords for this user
        const { data: keywordsData, error: keywordsError } = await supabase
          .from("keywords_progress")
          .select("keyword_name")
          .eq("user_id", user.id);

        if (keywordsError) {
          console.error("Error loading keywords progress:", keywordsError);
        } else {
          const completedKeywordsSet = new Set<string>();
          keywordsData?.forEach((row) => {
            // Store normalized name (lowercase, trimmed) for matching
            completedKeywordsSet.add(row.keyword_name.toLowerCase().trim());
          });
          setCompletedKeywords(completedKeywordsSet);
        }
      } catch (err) {
        console.error("Error loading user and progress:", err);
      } finally {
        setLoadingProgress(false);
      }
    }
    loadUserAndProgress();
  }, []);

  // Load featured characters for Matthew only
  useEffect(() => {
    async function loadFeaturedCharacters() {
      // Only load for Matthew book
      const bookLower = book.toLowerCase().trim();
      if (bookLower !== "matthew") {
        return;
      }

      try {
        const characters = await getFeaturedCharactersForMatthew();
        setFeaturedCharacters(characters);
      } catch (err) {
        console.error("[BIBLE_CHAPTER] Error loading featured characters:", err);
        // Fail silently - feature is optional
      }
    }

    loadFeaturedCharacters();
  }, [book]);

  // Apply featured character highlighting via DOM manipulation (Matthew only)
  const bookLower = book.toLowerCase().trim();
  useFeaturedCharacters({
    characters: featuredCharacters,
    containerRef: verseContainerRef,
    enabled: bookLower === "matthew" && featuredCharacters.length > 0,
    onCharacterClick: (character) => setSelectedCharacter(character),
  });

  // Check if chapter is already completed
  useEffect(() => {
    async function checkCompleted() {
      if (book && chapter && userId) {
        const completed = await isChapterCompleted(userId, book, chapter);
        setIsCompleted(completed);
      }
    }
    checkCompleted();
  }, [book, chapter, userId]);

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
      // CRITICAL: Check if notes exist in Supabase FIRST (BEFORE any ChatGPT call)
      // This is the ONLY source of truth - if notes exist, we MUST use them
      const bookKey = bookName.toLowerCase().trim();
      
      console.log(`[bible_notes] Checking for existing notes: book="${bookKey}", chapter=${chapterNum}`);
      
      const { data: existing, error: existingError } = await supabase
        .from("bible_notes")
        .select("notes_text")
        .eq("book", bookKey)
        .eq("chapter", chapterNum)
        .maybeSingle();

      if (existingError && existingError.code !== 'PGRST116') {
        console.error("[bible_notes] Error checking bible_notes:", existingError);
      }

      // MANDATORY SHORT-CIRCUIT: If notes exist, return immediately
      // DO NOT continue to generation - this prevents duplicate ChatGPT calls
      if (existing?.notes_text && existing.notes_text.trim().length > 0) {
        console.log(`[bible_notes] Found existing notes for ${bookKey} chapter ${chapterNum}, returning immediately (ChatGPT will NOT be called)`);
        const summary = extractBigIdeaSummary(existing.notes_text);
        return summary || "";
      }

      // GUARANTEE: If we reach here, notes do NOT exist in database
      // This is the ONLY path where ChatGPT should be called
      let notesText = "";
      
      // Notes don't exist - generate them
      const bookDisplayName = bookName
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");

        const prompt = `
You are Little Louis. Generate beginner friendly notes for ${bookDisplayName} chapter ${chapterNum} using this exact template and rules.

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
DO NOT include a top-level header like "${bookDisplayName} Chapter ${chapterNum} Notes" or any chapter title at the beginning. Start directly with "# 🧠 Big Idea of the Chapter".
Keep emojis in the headers. Use proper markdown formatting:
- "Big Idea of the Chapter" should be formatted as # (h1)
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

        // CRITICAL: Before saving, check ONE MORE TIME if row exists (race condition protection)
        // Another request might have created it while we were generating
        const { data: existingCheck, error: checkError } = await supabase
          .from("bible_notes")
          .select("notes_text")
          .eq("book", bookKey)
          .eq("chapter", chapterNum)
          .maybeSingle();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error("[bible_notes] Error checking for duplicates:", checkError);
        }

        // MANDATORY: If row exists now, use it and DO NOT save (another request created it)
        if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
          console.log(`[bible_notes] Notes were created by another request for ${bookKey} chapter ${chapterNum}, using existing (skipping save)`);
          notesText = existingCheck.notes_text;
        } else {
          // No row exists - upsert to handle race conditions gracefully
          console.log(`[bible_notes] Upserting notes for ${bookKey} chapter ${chapterNum}`);
          const { error: upsertError } = await supabase
            .from("bible_notes")
            .upsert(
              {
                book: bookKey,
                chapter: chapterNum,
                notes_text: generated,
              },
              {
                onConflict: "book,chapter",
              }
            );

          if (upsertError) {
            console.error("[bible_notes] Error upserting notes to bible_notes:", upsertError);
          }

          // MANDATORY: Always re-read from database after upsert
          // NEVER use in-memory generated text - database is single source of truth
          const { data: savedRow, error: fetchError } = await supabase
            .from("bible_notes")
            .select("notes_text")
            .eq("book", bookKey)
            .eq("chapter", chapterNum)
            .maybeSingle();

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error("[bible_notes] Error re-fetching notes after upsert:", fetchError);
          }

          if (savedRow?.notes_text && savedRow.notes_text.trim().length > 0) {
            notesText = savedRow.notes_text;
            console.log(`[bible_notes] Successfully loaded notes from database for ${bookKey} chapter ${chapterNum}`);
          } else {
            // This should never happen - log as error
            console.error(`[bible_notes] CRITICAL: Row not found in database after upsert`, { book: bookKey, chapter: chapterNum });
            // Do NOT use generated text - return empty string to indicate failure
            notesText = "";
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

  // Detect if this chapter was opened from a reading plan or devotional
  const [sourceContext, setSourceContext] = useState<{
    type: "reading-plan" | "devotional" | null;
    id: string | null;
    backLink: string | null;
    backText: string | null;
  }>({ type: null, id: null, backLink: null, backText: null });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const source = window.sessionStorage.getItem("bbFromReadingPlan");
    
    if (source) {
      // Parse the source to determine where to go back
      if (source === "bible-buddy") {
        setSourceContext({
          type: "reading-plan",
          id: "bible-buddy",
          backLink: "/reading-plans/bible-buddy",
          backText: "← Back to The Bible Buddy Reading Plan",
        });
        setFromReadingPlan(true); // Keep for backward compatibility
      } else if (source === "bible-in-one-year") {
        setSourceContext({
          type: "reading-plan",
          id: "bible-in-one-year",
          backLink: "/reading-plans/bible-in-one-year",
          backText: "← Back to Bible in One Year",
        });
        setFromReadingPlan(true);
      } else if (source.startsWith("devotional:")) {
        const devotionalId = source.replace("devotional:", "");
        setSourceContext({
          type: "devotional",
          id: devotionalId,
          backLink: `/devotionals/${devotionalId}`,
          backText: "← Back to Devotional",
        });
        setFromReadingPlan(true);
      } else if (source === "true") {
        // Legacy: just "true" means Bible Buddy
        setSourceContext({
          type: "reading-plan",
          id: "bible-buddy",
          backLink: "/reading-plans/bible-buddy",
          backText: "← Back to The Bible Buddy Reading Plan",
        });
        setFromReadingPlan(true);
      }
    }
  }, []);

  // Get book display name (capitalize first letter of each word)
  const bookDisplayName = book
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Determine back link:
  // - If opened from a reading plan or devotional, send users back there.
  // - Otherwise, send them to the normal book overview page.
  const backLink = sourceContext.backLink || `/reading/books/${encodeURIComponent(book.toLowerCase())}`;
  const backText = sourceContext.backText || `← Back to ${bookDisplayName} overview`;

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

  async function handleMarkFinished() {
    if (isSaving || isCompleted) return;

    if (!userId) {
      console.error("User ID not available");
      return;
    }

    setIsSaving(true);

    try {
      // Mark chapter as done in database - this will unlock the next chapter
      console.log(`[MARK_FINISHED] Attempting to mark ${book} chapter ${chapter} as done for user ${userId}`);
      
      await markChapterDone(userId, book, chapter);
      console.log(`[MARK_FINISHED] Successfully marked ${book} chapter ${chapter} as done`);
      
      setIsCompleted(true);

      // Trigger confetti animation immediately
      triggerConfetti();

      // Open congratulations modal after a brief delay to let confetti start
      setTimeout(() => {
        setShowCongratsModal(true);
        setIsSaving(false);
      }, 100);

      // ACTION TRACKING: Do this asynchronously after UI updates (fire-and-forget)
      // This doesn't block the UI from updating
      (async () => {
        try {
          // Insert into master_actions
          const { data: { user: authUser } } = await supabase.auth.getUser();
          let actionUsername = "User";
          
          if (authUser) {
            const meta: any = authUser.user_metadata || {};
            actionUsername =
              meta.firstName ||
              meta.first_name ||
              (authUser.email ? authUser.email.split("@")[0] : null) ||
              "User";
          }

          // Format book name for action_label (capitalize properly)
          const formatBookName = (bookName: string): string => {
            return bookName.split(' ').map(word => {
              // Handle numbered books like "1 Samuel" -> "1 Samuel"
              if (/^\d+$/.test(word)) return word;
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }).join(' ');
          };

          const bookDisplayName = formatBookName(book);
          const actionLabel = `${bookDisplayName} ${chapter}`;

          // Insert into master_actions with action_label
          console.log("[MASTER_ACTIONS] inserting:", { action_type: ACTION_TYPE.chapter_completed, action_label: actionLabel });
          const { error: actionError } = await supabase
            .from("master_actions")
            .insert({
              user_id: userId,
              username: actionUsername ?? null,
              action_type: ACTION_TYPE.chapter_completed,
              action_label: actionLabel,
            });

          if (actionError) {
            console.error("Error logging action to master_actions:", actionError);
          }

          // If this chapter was opened from a reading plan, also log reading_plan_chapter_completed
          if (sourceContext.type === "reading-plan" && sourceContext.id) {
            const readingPlanLabel = sourceContext.id === "bible-buddy" 
              ? "The Bible Buddy Reading Plan"
              : sourceContext.id === "bible-in-one-year"
              ? "Bible in One Year"
              : sourceContext.id;
            
            console.log("[MASTER_ACTIONS] inserting reading plan completion:", { 
              action_type: ACTION_TYPE.reading_plan_chapter_completed, 
              action_label: `${readingPlanLabel}: ${actionLabel}` 
            });
            const { error: readingPlanActionError } = await supabase
              .from("master_actions")
              .insert({
                user_id: userId,
                username: actionUsername ?? null,
                action_type: ACTION_TYPE.reading_plan_chapter_completed,
                action_label: `${readingPlanLabel}: ${actionLabel}`,
              });

            if (readingPlanActionError) {
              console.error("Error logging reading plan action to master_actions:", readingPlanActionError);
            }
          }

          // Check if book is now complete and log book_completed action
          try {
            const bookIsComplete = await isBookComplete(userId, book);
            if (bookIsComplete) {
              // Book is complete - log book_completed action
              console.log("[MASTER_ACTIONS] inserting:", { action_type: ACTION_TYPE.book_completed, action_label: bookDisplayName });
              const { error: bookActionError } = await supabase
                .from("master_actions")
                .insert({
                  user_id: userId,
                  username: actionUsername ?? null,
                  action_type: ACTION_TYPE.book_completed,
                  action_label: bookDisplayName,
                });

              if (bookActionError) {
                console.error("Error logging book_completed action to master_actions:", bookActionError);
              } else {
                console.log(`[MASTER_ACTIONS] Successfully logged book_completed: ${bookDisplayName}`);
              }
            }
          } catch (bookCheckError) {
            console.error("Error checking book completion:", bookCheckError);
            // Don't block - continue with profile stats update
          }

          // UPDATE profile_stats: Count from completed_chapters table
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

          const { count, error: countError } = await supabase
            .from("completed_chapters")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId);

          if (!countError && count !== null) {
            const { data: currentStats } = await supabase
              .from("profile_stats")
              .select("username, notes_created_count, people_learned_count, places_discovered_count, keywords_mastered_count")
              .eq("user_id", userId)
              .maybeSingle();

            const finalUsername = currentStats?.username || statsUsername || "User";
            
            // Calculate total_actions as sum of all counts
            const totalActions = 
              (count || 0) +
              (currentStats?.notes_created_count || 0) +
              (currentStats?.people_learned_count || 0) +
              (currentStats?.places_discovered_count || 0) +
              (currentStats?.keywords_mastered_count || 0);

            await supabase
              .from("profile_stats")
              .upsert(
                {
                  user_id: userId,
                  chapters_completed_count: count || 0,
                  total_actions: totalActions,
                  username: finalUsername,
                  updated_at: new Date().toISOString(),
                },
                {
                  onConflict: "user_id",
                }
              );
          }
        } catch (err) {
          console.error("Error in chapter tracking (non-blocking):", err);
        }
      })();
    } catch (err: any) {
      console.error(`[MARK_FINISHED] Error marking ${bookDisplayName} ${chapter} finished:`, err);
      const errorMessage = err?.message || err?.error?.message || JSON.stringify(err) || 'Unknown error';
      console.error(`[MARK_FINISHED] Full error details:`, JSON.stringify(err, null, 2));
      alert(`Failed to mark chapter as finished. Please try again. Error: ${errorMessage}`);
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
            {backText}
          </Link>
        </div>

        {/* PAGE HEADER */}
        <div className="mb-1 flex items-start justify-between gap-3">
          <h1 className="text-3xl font-bold">
            {bookDisplayName} {chapter}
          </h1>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={plainTextMode}
                onChange={(e) => setPlainTextMode(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Plain text mode
            </label>
            <select
              value={translation}
              onChange={(e) => setTranslation(e.target.value as "web" | "asv" | "kjv")}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select Bible translation"
            >
              <option value="web">WEB</option>
              <option value="asv">ASV</option>
              <option value="kjv">KJV</option>
            </select>
          </div>
        </div>
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
        <div 
          ref={verseContainerRef}
          className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6 max-h-[60vh] overflow-y-auto ${plainTextMode ? "plain-text-mode" : ""}`}
        >
          {sections.map((section) => (
            <div key={section.id} className="mb-8 last:mb-0">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">{section.emoji}</span>
                <span>{section.title}</span>
              </h2>
              <div className="space-y-5">
                {/* Always use VerseHighlighter for all chapters */}
                {section.verses && section.verses.length > 0 && (
                  <>
                    {(() => {
                      const VerseHighlighter = require("../../../../components/VerseHighlighter").VerseHighlighter;
                      // If enrichedContent is available, split it into per-verse HTML
                      let enrichedPerVerse: Record<number, string> = {};
                      if (enrichedContent) {
                        // Remove version marker and split by <p ...>...</p>
                        const html = enrichedContent.replace(/<!--.*?-->/, '').trim();
                        // Match all <p ...>...</p> blocks
                        const verseBlocks = Array.from(html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g));
                        verseBlocks.forEach((block, idx) => {
                          // Try to extract the verse number from the badge
                          const badgeMatch = block[1].match(/<span[^>]*>(\d+)<\/span>/);
                          const verseNum = badgeMatch ? parseInt(badgeMatch[1], 10) : idx + 1;
                          enrichedPerVerse[verseNum] = `<p>${block[1]}</p>`;
                        });
                      }
                      return (
                        <VerseHighlighter
                          book={book}
                          chapter={chapter}
                          verses={section.verses.map(v => ({
                            number: v.num,
                            text: v.text,
                            enrichedHtml: enrichedPerVerse[v.num]
                          }))}
                        />
                      );
                    })()}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* NAVIGATION BUTTONS ROW */}
        <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-stretch md:justify-center gap-3 mb-4">
          {/* Previous Chapter */}
          {chapter > 1 ? (
            <button
              type="button"
              onClick={() => router.push(`/Bible/${encodeURIComponent(book.toLowerCase())}/${chapter - 1}`)}
              className="w-full md:w-auto px-6 py-3 rounded-full text-base font-semibold bg-white text-blue-700 border-2 border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition text-center"
            >
              ← Previous Chapter
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="w-full md:w-auto px-6 py-3 rounded-full text-base font-semibold bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed transition text-center"
            >
              ← Previous Chapter
            </button>
          )}

          {/* Next Chapter */}
          {chapter < getBookTotalChapters(book) ? (
            <button
              type="button"
              onClick={() => router.push(`/Bible/${encodeURIComponent(book.toLowerCase())}/${chapter + 1}`)}
              className="w-full md:w-auto px-6 py-3 rounded-full text-base font-semibold bg-white text-blue-700 border-2 border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition text-center"
            >
              Next Chapter →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                // Find next book in biblical order
                const BOOKS_ORDER = [
                  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
                  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
                  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther",
                  "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
                  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
                  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
                  "Zephaniah", "Haggai", "Zechariah", "Malachi",
                  "Matthew", "Mark", "Luke", "John", "Acts",
                  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
                  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
                  "1 Timothy", "2 Timothy", "Titus", "Philemon",
                  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
                  "Revelation",
                ];
                const currentIndex = BOOKS_ORDER.findIndex(
                  (b) => b.toLowerCase() === book.toLowerCase()
                );
                if (currentIndex >= 0 && currentIndex < BOOKS_ORDER.length - 1) {
                  const nextBook = BOOKS_ORDER[currentIndex + 1];
                  router.push(`/Bible/${encodeURIComponent(nextBook.toLowerCase())}/1`);
                } else {
                  // Already at last book, go to first chapter of current book
                  router.push(`/Bible/${encodeURIComponent(book.toLowerCase())}/1`);
                }
              }}
              className="w-full md:w-auto px-6 py-3 rounded-full text-base font-semibold bg-white text-blue-700 border-2 border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition text-center"
            >
              Next Book →
            </button>
          )}
        </div>

        {/* ACTION BUTTONS ROW */}
        <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-stretch md:justify-between gap-3 mb-4">
          {/* LEFT: Read Notes */}
          <button
            type="button"
            onClick={() => router.push(`/reading-plan/${book}/${chapter}/notes`)}
            className="w-full md:w-auto px-4 py-3 rounded-full text-sm md:text-base font-semibold bg-white text-blue-700 border-2 border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition text-center"
          >
            Read {bookDisplayName} {chapter} Notes
          </button>

          {/* CENTER: Mark as Finished */}
          <button
            type="button"
            onClick={handleMarkFinished}
            disabled={isSaving || isCompleted}
            className={`w-full md:w-auto px-6 py-3 rounded-full text-base font-semibold shadow-sm transition ${
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

          {/* RIGHT: Take Notes */}
          <button
            type="button"
            onClick={() => router.push(`/notes?book=${book}&chapter=${chapter}`)}
            className="w-full md:w-auto px-4 py-3 rounded-full text-sm md:text-base font-semibold bg-white text-blue-700 border-2 border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition text-center"
          >
            Take Notes on {bookDisplayName} {chapter}
          </button>
        </div>

        {/* Go Back to Bible Books Button */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <Link
            href={backLink}
            className="text-sm text-blue-600 hover:underline"
          >
            Go Back to Bible Books
          </Link>
        </div>
      </div>

      {/* CONGRATULATIONS MODAL */}
      {showCongratsModal && (
        <CongratsModalWithConfetti levelInfo={levelInfoForModal ?? undefined} />
      )}

      {/* FEATURED CHARACTER MODAL */}
      <FeaturedCharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />

      {/* PERSON OVERLAY MODAL */}
      {selectedPerson && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
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

                {/* MARK AS FINISHED BUTTON (same as database pages) */}
                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      const personKey = selectedPerson.name.toLowerCase().trim();
                      const isCompleted = completedPeople.has(personKey);
                      return (
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            if (!userId) return;

                            const personNameKey = selectedPerson.name.toLowerCase().trim();

                            if (isCompleted) {
                              return;
                            }

                            try {
                              // Insert completion
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
                              } else {
                                // ACTION TRACKING: Insert into master_actions
                                const { data: { user: authUser } } = await supabase.auth.getUser();
                                let actionUsername = "User";
                                
                                if (authUser) {
                                  const meta: any = authUser.user_metadata || {};
                                  actionUsername =
                                    meta.firstName ||
                                    meta.first_name ||
                                    (authUser.email ? authUser.email.split("@")[0] : null) ||
                                    "User";
                                }

                                const formatPersonName = (name: string): string => {
                                  return name.split(' ').map(word => {
                                    if (/^\d+$/.test(word)) return word;
                                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                                  }).join(' ');
                                };

                                const personDisplayName = formatPersonName(selectedPerson.name);

                                const { error: actionError } = await supabase
                                  .from("master_actions")
                                  .insert({
                                    user_id: userId,
                                    username: actionUsername ?? null,
                                    action_type: ACTION_TYPE.person_learned,
                                    action_label: personDisplayName,
                                  });

                                if (actionError) {
                                  console.error("Error logging action to master_actions:", actionError);
                                }

                                // UPDATE profile_stats
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

                                const { count, error: countError } = await supabase
                                  .from("people_progress")
                                  .select("*", { count: "exact", head: true })
                                  .eq("user_id", userId);

                                if (!countError && count !== null) {
                                  const { data: currentStats } = await supabase
                                    .from("profile_stats")
                                    .select("username, chapters_completed_count, notes_created_count, places_discovered_count, keywords_mastered_count")
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  const finalUsername = currentStats?.username || statsUsername || "User";
                                  
                                  const totalActions = 
                                    (currentStats?.chapters_completed_count || 0) +
                                    (currentStats?.notes_created_count || 0) +
                                    (count || 0) +
                                    (currentStats?.places_discovered_count || 0) +
                                    (currentStats?.keywords_mastered_count || 0);

                                  await supabase
                                    .from("profile_stats")
                                    .upsert(
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

                                // Update local state
                                setCompletedPeople((prev) => {
                                  const next = new Set(prev);
                                  next.add(personNameKey);
                                  return next;
                                });
                                
                                // Trigger button animation
                                setIsAnimatingPerson(true);
                                
                                // Close the modal after animation completes
                                setTimeout(() => {
                                  setSelectedPerson(null);
                                  setPersonNotes(null);
                                  setIsAnimatingPerson(false);
                                }, 400); // Animation duration: 200ms scale down + 200ms scale up
                              }
                            } catch (err) {
                              console.error("Error marking person as finished:", err);
                              alert("Failed to mark as finished. Please try again.");
                            }
                          }}
                          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          style={isAnimatingPerson ? {
                            animation: 'scale-down-bounce 0.4s ease-in-out'
                          } : undefined}
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

      {/* PLACE OVERLAY MODAL */}
      {selectedPlace && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
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

                {/* MARK AS FINISHED BUTTON (same as database pages) */}
                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      // Normalize place name (same as database: lowercase, spaces to underscores)
                      const placeKey = selectedPlace.name.toLowerCase().trim().replace(/\s+/g, "_");
                      const isCompleted = completedPlaces.has(placeKey);
                      return (
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            if (!userId) return;

                            const placeNameKey = selectedPlace.name.toLowerCase().trim().replace(/\s+/g, "_");

                            if (isCompleted) {
                              return;
                            }

                            try {
                              // Insert completion
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
                                console.error("Error marking place as finished:", error);
                                alert("Failed to mark as finished. Please try again.");
                              } else {
                                // ACTION TRACKING: Insert into master_actions
                                const { data: { user: authUser } } = await supabase.auth.getUser();
                                let actionUsername = "User";
                                
                                if (authUser) {
                                  const meta: any = authUser.user_metadata || {};
                                  actionUsername =
                                    meta.firstName ||
                                    meta.first_name ||
                                    (authUser.email ? authUser.email.split("@")[0] : null) ||
                                    "User";
                                }

                                const formatPlaceName = (name: string): string => {
                                  return name.split(' ').map(word => {
                                    if (/^\d+$/.test(word)) return word;
                                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                                  }).join(' ');
                                };

                                const placeDisplayName = formatPlaceName(selectedPlace.name);

                                const { error: actionError } = await supabase
                                  .from("master_actions")
                                  .insert({
                                    user_id: userId,
                                    username: actionUsername ?? null,
                                    action_type: ACTION_TYPE.place_discovered,
                                    action_label: placeDisplayName,
                                  });

                                if (actionError) {
                                  console.error("Error logging action to master_actions:", actionError);
                                }

                                // UPDATE profile_stats
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

                                const { count, error: countError } = await supabase
                                  .from("places_progress")
                                  .select("*", { count: "exact", head: true })
                                  .eq("user_id", userId);

                                if (!countError && count !== null) {
                                  const { data: currentStats } = await supabase
                                    .from("profile_stats")
                                    .select("username, chapters_completed_count, notes_created_count, people_learned_count, keywords_mastered_count")
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  const finalUsername = currentStats?.username || statsUsername || "User";
                                  
                                  const totalActions = 
                                    (currentStats?.chapters_completed_count || 0) +
                                    (currentStats?.notes_created_count || 0) +
                                    (currentStats?.people_learned_count || 0) +
                                    (count || 0) +
                                    (currentStats?.keywords_mastered_count || 0);

                                  await supabase
                                    .from("profile_stats")
                                    .upsert(
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

                                // Update local state
                                setCompletedPlaces((prev) => {
                                  const next = new Set(prev);
                                  next.add(placeNameKey);
                                  return next;
                                });
                                
                                // Trigger button animation
                                setIsAnimatingPlace(true);
                                
                                // Close the modal after animation completes
                                setTimeout(() => {
                                  setSelectedPlace(null);
                                  setPlaceNotes(null);
                                  setIsAnimatingPlace(false);
                                }, 400); // Animation duration: 200ms scale down + 200ms scale up
                              }
                            } catch (err) {
                              console.error("Error marking place as finished:", err);
                              alert("Failed to mark as finished. Please try again.");
                            }
                          }}
                          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          style={isAnimatingPlace ? {
                            animation: 'scale-down-bounce 0.4s ease-in-out'
                          } : undefined}
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

      {/* KEYWORD OVERLAY MODAL */}
      {selectedKeyword && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
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

                {/* MARK AS FINISHED BUTTON (same as database pages) */}
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

                            if (!userId) return;

                            const keywordNameKey = selectedKeyword.name.toLowerCase().trim();

                            if (isCompleted) {
                              return;
                            }

                            try {
                              // Insert completion
                              const { error } = await supabase
                                .from("keywords_progress")
                                .upsert(
                                  {
                                    user_id: userId,
                                    keyword_name: keywordNameKey,
                                  },
                                  {
                                    onConflict: "user_id,keyword_name",
                                  }
                                );

                              if (error) {
                                console.error("Error marking keyword as finished:", error);
                                alert("Failed to mark as finished. Please try again.");
                              } else {
                                // ACTION TRACKING: Insert into master_actions
                                const { data: { user: authUser } } = await supabase.auth.getUser();
                                let actionUsername = "User";
                                
                                if (authUser) {
                                  const meta: any = authUser.user_metadata || {};
                                  actionUsername =
                                    meta.firstName ||
                                    meta.first_name ||
                                    (authUser.email ? authUser.email.split("@")[0] : null) ||
                                    "User";
                                }

                                const formatKeywordName = (name: string): string => {
                                  return name.split(' ').map(word => {
                                    if (/^\d+$/.test(word)) return word;
                                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                                  }).join(' ');
                                };

                                const keywordDisplayName = formatKeywordName(selectedKeyword.name);

                                const { error: actionError } = await supabase
                                  .from("master_actions")
                                  .insert({
                                    user_id: userId,
                                    username: actionUsername ?? null,
                                    action_type: ACTION_TYPE.keyword_mastered,
                                    action_label: keywordDisplayName,
                                  });

                                if (actionError) {
                                  console.error("Error logging action to master_actions:", actionError);
                                }

                                // UPDATE profile_stats
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

                                const { count, error: countError } = await supabase
                                  .from("keywords_progress")
                                  .select("*", { count: "exact", head: true })
                                  .eq("user_id", userId);

                                if (!countError && count !== null) {
                                  const { data: currentStats } = await supabase
                                    .from("profile_stats")
                                    .select("username, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count")
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  const finalUsername = currentStats?.username || statsUsername || "User";
                                  
                                  const totalActions = 
                                    (currentStats?.chapters_completed_count || 0) +
                                    (currentStats?.notes_created_count || 0) +
                                    (currentStats?.people_learned_count || 0) +
                                    (currentStats?.places_discovered_count || 0) +
                                    (count || 0);

                                  await supabase
                                    .from("profile_stats")
                                    .upsert(
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

                                // Update local state
                                setCompletedKeywords((prev) => {
                                  const next = new Set(prev);
                                  next.add(keywordNameKey);
                                  return next;
                                });
                                
                                // Trigger button animation
                                setIsAnimatingKeyword(true);
                                
                                // Close the modal after animation completes
                                setTimeout(() => {
                                  setSelectedKeyword(null);
                                  setKeywordNotes(null);
                                  setIsAnimatingKeyword(false);
                                }, 400); // Animation duration: 200ms scale down + 200ms scale up
                              }
                            } catch (err) {
                              console.error("Error marking keyword as finished:", err);
                              alert("Failed to mark as finished. Please try again.");
                            }
                          }}
                          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          style={isAnimatingKeyword ? {
                            animation: 'scale-down-bounce 0.4s ease-in-out'
                          } : undefined}
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
        open={personCreditBlocked}
        userId={userId}
        zIndexClassName="z-[80]"
        onClose={() => {
          setPersonCreditBlocked(false);
          setSelectedPerson(null);
          setPersonNotes(null);
        }}
      />

      <CreditLimitModal
        open={placeCreditBlocked}
        userId={userId}
        zIndexClassName="z-[80]"
        onClose={() => {
          setPlaceCreditBlocked(false);
          setSelectedPlace(null);
          setPlaceNotes(null);
        }}
      />

      <CreditLimitModal
        open={keywordCreditBlocked}
        userId={userId}
        zIndexClassName="z-[80]"
        onClose={() => {
          setKeywordCreditBlocked(false);
          setSelectedKeyword(null);
          setKeywordNotes(null);
        }}
      />

    </div>
  );
}

// Separate component to trigger confetti when modal mounts
function CongratsModalWithConfetti({
  levelInfo,
}: {
  levelInfo?: {
    level: number;
    chaptersNeededForNext: number;
    nextLevel: number;
    leveledUp: boolean;
  };
}) {
  const params = useParams();
  const router = useRouter();
  const book = String(params.book);
  const chapter = Number(params.chapter);

  const bookDisplayName = book
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const backLink = `/reading/books/${book.toLowerCase()}`;

  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showModal, setShowModal] = useState(true);

  // Show level-up overlay when levelInfo indicates a level up
  useEffect(() => {
    if (levelInfo?.leveledUp) {
      setShowLevelUpModal(true);
    }
  }, [levelInfo?.leveledUp]);

  // All 66 books for next book detection
  const BOOKS = [
    "Matthew", "Mark", "Luke", "John", "Acts",
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
    "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther",
    "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
    "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
    "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi",
    "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon",
    "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
    "Revelation",
  ];

  // Motivational messages with level progress
  const motivationalMessages = [
    "Just {chaptersRemaining} more chapters until you level up.",
    "You're closer than you think. {chaptersRemaining} chapters to go.",
    "Keep reading. Only {chaptersRemaining} chapters until the next level.",
    "Momentum matters. {chaptersRemaining} chapters left to level up.",
    "Stay consistent. {chaptersRemaining} chapters until your next milestone.",
    "You're building something real. {chaptersRemaining} chapters to go.",
    "Small steps add up. {chaptersRemaining} chapters until the next level.",
    "Don't stop now. {chaptersRemaining} chapters away from leveling up.",
    "You're making progress. {chaptersRemaining} chapters left.",
    "Keep showing up. {chaptersRemaining} chapters to reach the next level.",
    "Every chapter counts. {chaptersRemaining} more to level up.",
    "You're on a roll. {chaptersRemaining} chapters until the next level.",
    "Discipline beats motivation. {chaptersRemaining} chapters to go.",
    "You're walking it out. {chaptersRemaining} chapters remain.",
    "One chapter at a time. {chaptersRemaining} until you level up.",
    "Progress over perfection. {chaptersRemaining} chapters left.",
    "You didn't come this far to stop. {chaptersRemaining} chapters to go.",
    "Faithfulness compounds. {chaptersRemaining} chapters until the next level.",
    "You're closer today than yesterday. {chaptersRemaining} chapters left.",
    "Keep going. Your next level is {chaptersRemaining} chapters away.",
  ];

  // Calculate random message using props (instant, no async delay)
  const randomMessage = useMemo(() => {
    if (!levelInfo) {
      return "Great job — your consistency is paying off!";
    }
    if (levelInfo.level >= 10) {
      return "Great job — your consistency is paying off!";
    }
    const template = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    return template.replace("{chaptersRemaining}", levelInfo.chaptersNeededForNext.toString());
  }, [levelInfo]);

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
  const currentBookIndex = BOOKS.findIndex(b => b.toLowerCase() === book.toLowerCase());
  const nextBook = currentBookIndex >= 0 && currentBookIndex < BOOKS.length - 1 ? BOOKS[currentBookIndex + 1] : null;

  function handleContinueToNextChapter() {
    if (isLastChapter) {
      // Go to reading plan page to start next book
      router.push("/reading");
    } else {
      router.push(`/Bible/${encodeURIComponent(book.toLowerCase())}/${chapter + 1}`);
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
    <>
      {/* LEVEL UP OVERLAY */}
      {showLevelUpModal && levelInfo && (
        <LevelUpOverlay
          level={levelInfo.level}
          onClose={() => setShowLevelUpModal(false)}
        />
      )}

      {/* CONGRATULATIONS MODAL */}
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
                {levelInfo ? randomMessage : "Great job — your consistency is paying off!"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {/* Continue to Next Chapter or Start Next Book */}
              <button
                type="button"
                onClick={handleContinueToNextChapter}
                className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center"
              >
                {isLastChapter && nextBook ? `Start ${nextBook}` : "Continue to Next Chapter"}
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
    </>
  );
}

// Full-screen level-up overlay component
function LevelUpOverlay({
  level,
  onClose,
}: {
  level: number;
  onClose: () => void;
}) {
  useEffect(() => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
      <div className="relative text-center text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold transition"
          aria-label="Close"
        >
          ❌
        </button>

        {/* Level Up Content */}
        <div className="animate-in zoom-in duration-700">
          <h2 className="text-6xl md:text-7xl font-extrabold mb-4 animate-in zoom-in duration-1000">
            Level {level} Unlocked! 🎉
          </h2>
          <div className="text-2xl md:text-3xl font-semibold text-blue-300 animate-pulse">
            Amazing progress!
          </div>
        </div>
      </div>
    </div>
  );
}

