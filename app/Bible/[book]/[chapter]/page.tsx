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
import { ACTION_TYPE } from "../../../../lib/actionTypes";
import { resolveBibleReference } from "../../../../lib/bibleTermResolver";
import { consumeCreditAction } from "../../../../lib/creditClient";
import { findKeywordNotes, findPersonNotes, findPlaceNotes, saveKeywordNotes, savePersonNotes, savePlaceNotes } from "../../../../lib/bibleNotes";
import { trackNavigationActionOnce } from "../../../../lib/navigationActionTracker";
import { triggerPoints } from "../../../../components/PointsPop";
import CreditLimitModal from "../../../../components/CreditLimitModal";
import CommentSection from "../../../../components/comments/CommentSection";
import { LEVEL_DEFINITIONS } from "../../../../lib/levelSystem";
import { FeatureTourModal } from "../../../../components/FeatureTourModal";
import {
  DEFAULT_FEATURE_TOURS,
  normalizeFeatureTours,
  type FeatureToursState,
} from "../../../../lib/featureTours";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "../../../../lib/triviaCatalog";
import { getTriviaChapter } from "../../../../lib/triviaGameData";
import { getScrambledChapter } from "../../../../lib/scrambledGameData";
import type { TriviaChapterPack } from "../../../../lib/triviaGameData";
import type { ScrambledChapterPack } from "../../../../lib/scrambledGameData";
import TriviaGamePlayer from "../../../../components/TriviaGamePlayer";
import ScrambledGamePlayer from "../../../../components/ScrambledGamePlayer";

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

const ALL_BIBLE_BOOKS_SORTED = [
  "1 Chronicles","1 Corinthians","1 John","1 Kings","1 Peter",
  "1 Samuel","1 Thessalonians","1 Timothy","2 Chronicles",
  "2 Corinthians","2 John","2 Kings","2 Peter","2 Samuel",
  "2 Thessalonians","2 Timothy","3 John","Acts","Amos",
  "Colossians","Daniel","Deuteronomy","Ecclesiastes","Ephesians",
  "Esther","Exodus","Ezekiel","Ezra","Galatians","Genesis",
  "Habakkuk","Haggai","Hebrews","Hosea","Isaiah","James",
  "Jeremiah","Job","Joel","John","Jonah","Joshua","Jude",
  "Judges","Lamentations","Leviticus","Luke","Malachi","Mark",
  "Matthew","Micah","Nahum","Nehemiah","Numbers","Obadiah",
  "Philemon","Philippians","Proverbs","Psalms","Revelation",
  "Romans","Ruth","Song of Solomon","Titus","Zechariah","Zephaniah",
];

// ── Louis loading skeleton for database word overlays ────────────────────────
function LouisLoadingCard({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center py-10 gap-5">
      <div style={{ animation: "bounce 1s infinite" }}>
        <LouisAvatar mood="think" size={72} />
      </div>
      <div className="w-full space-y-3 px-2">
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-5/6" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-3/4" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-4/5" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-2/3" />
      </div>
      <p className="text-sm text-gray-400 italic animate-pulse">{name} is loading…</p>
    </div>
  );
}

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
  const [showChecklistModal, setShowChecklistModal] = useState(false);
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
  const [keywordNotesError, setKeywordNotesError] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [personCreditBlocked, setPersonCreditBlocked] = useState(false);
  const [viewedPeople, setViewedPeople] = useState<Set<string>>(new Set());
  const [placeCreditBlocked, setPlaceCreditBlocked] = useState(false);
  const [viewedPlaces, setViewedPlaces] = useState<Set<string>>(new Set());
  const [keywordCreditBlocked, setKeywordCreditBlocked] = useState(false);
  const [viewedKeywords, setViewedKeywords] = useState<Set<string>>(new Set());
  const [translation, setTranslation] = useState<"web" | "asv" | "kjv">("web");
  const [translationMenuOpen, setTranslationMenuOpen] = useState(false);
  const [plainTextMode, setPlainTextMode] = useState(false);
  const translationMenuRef = useRef<HTMLDivElement | null>(null);
  const [gamesMenuOpen, setGamesMenuOpen] = useState(false);
  const gamesMenuRef = useRef<HTMLDivElement | null>(null);
  const [featureTours, setFeatureTours] = useState<FeatureToursState>({ ...DEFAULT_FEATURE_TOURS });
  const [showBibleReaderTour, setShowBibleReaderTour] = useState(false);
  const [bibleReaderTourStep, setBibleReaderTourStep] = useState(-1);
  const [isSavingBibleTour, setIsSavingBibleTour] = useState(false);
  const [tourAnimationTick, setTourAnimationTick] = useState(0);
  
  // Completion tracking state (same as database pages)
  const [completedPeople, setCompletedPeople] = useState<Set<string>>(new Set());
  const [completedPlaces, setCompletedPlaces] = useState<Set<string>>(new Set());
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [isAnimatingPerson, setIsAnimatingPerson] = useState(false);
  const [isAnimatingPlace, setIsAnimatingPlace] = useState(false);
  const [isAnimatingKeyword, setIsAnimatingKeyword] = useState(false);
  const [learnedToast, setLearnedToast] = useState<string | null>(null);
  const [fromReadingPlan, setFromReadingPlan] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewNotesText, setReviewNotesText] = useState<string>("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const reviewLoadingRef = useRef(false);
  const [showTriviaModal, setShowTriviaModal] = useState(false);
  const [showScrambledModal, setShowScrambledModal] = useState(false);
  const [triviaChapterPack, setTriviaChapterPack] = useState<TriviaChapterPack | null>(null);
  const [scrambledChapterPack, setScrambledChapterPack] = useState<ScrambledChapterPack | null>(null);
  const [reviewDone, setReviewDone] = useState(false);
  const [triviaDone, setTriviaDone] = useState(false);
  const [scrambledDone, setScrambledDone] = useState(false);
  const [showBooksModal, setShowBooksModal] = useState(false);
  const [booksModalSelectedBook, setBooksModalSelectedBook] = useState<string | null>(null);
  const reflectionSectionRef = useRef<HTMLDivElement | null>(null);
  const [highlightReflectionSection, setHighlightReflectionSection] = useState(false);

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

  const BIBLE_READER_TOUR_STEPS = [
    {
      key: "translations",
      title: "Translations",
      body: "Pick WEB, ASV, or KJV to read this same chapter in different Bible translations.",
    },
    {
      key: "summary",
      title: "Louis Overview",
      body: "Louis gives you a quick overview of the chapter before you start reading.",
    },
    {
      key: "verses",
      title: "Read the Verses",
      body: "This is where you read the chapter verse by verse. Tap a verse number to highlight it.",
    },
    {
      key: "words",
      title: "Tap Underlined Words",
      body: "Underlined words open extra Bible context for people, places, and keywords right in the chapter.",
    },
    {
      key: "actions",
      title: "Track and Study",
      body: "Mark the chapter finished to track progress, open chapter notes, or take your own notes.",
    },
  ] as const;

  const currentBibleReaderTourStep =
    bibleReaderTourStep >= 0 ? BIBLE_READER_TOUR_STEPS[bibleReaderTourStep] : null;

  function getBibleTourClasses(target: (typeof BIBLE_READER_TOUR_STEPS)[number]["key"]) {
    if (!showBibleReaderTour || bibleReaderTourStep < 0 || !currentBibleReaderTourStep) return "";
    return currentBibleReaderTourStep.key === target
      ? "relative z-10 opacity-100 ring-[6px] ring-white ring-offset-4 ring-offset-[#9ebcee] shadow-[0_26px_80px_rgba(32,81,154,0.34)] scale-[1.02] brightness-[1.04] saturate-110 transition duration-300"
      : "opacity-50 saturate-90 transition duration-300";
  }

  // Event delegation for click handlers on enriched content
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.classList.contains("bible-highlight")) return;

      const type = el.dataset.type;
      const term = el.dataset.term;
      if (!type || !term) return;

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

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (!showBibleReaderTour || bibleReaderTourStep < 0 || !currentBibleReaderTourStep) return;

    const target = document.querySelector(`[data-bible-tour="${currentBibleReaderTourStep.key}"]`);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showBibleReaderTour, bibleReaderTourStep, currentBibleReaderTourStep]);

  useEffect(() => {
    if (!showBibleReaderTour || bibleReaderTourStep < 0 || !currentBibleReaderTourStep) return;

    let cleanup: (() => void) | undefined;

    if (currentBibleReaderTourStep.key === "verses") {
      const verseButton = verseContainerRef.current?.querySelector(".verse-line button");
      if (verseButton instanceof HTMLElement) {
        verseButton.classList.add("ring-4", "ring-yellow-300", "animate-pulse", "scale-110");
        cleanup = () => {
          verseButton.classList.remove("ring-4", "ring-yellow-300", "animate-pulse", "scale-110");
        };
      }
    }

    if (currentBibleReaderTourStep.key === "words") {
      const word = verseContainerRef.current?.querySelector(".bible-highlight");
      if (word instanceof HTMLElement) {
        word.classList.add("bg-yellow-100", "rounded", "px-1", "animate-pulse");
        cleanup = () => {
          word.classList.remove("bg-yellow-100", "rounded", "px-1", "animate-pulse");
        };
      }
    }

    return () => {
      cleanup?.();
    };
  }, [showBibleReaderTour, bibleReaderTourStep, currentBibleReaderTourStep, tourAnimationTick]);

  async function handleBibleTourUnderstand() {
    if (bibleReaderTourStep < 0) {
      setBibleReaderTourStep(0);
      setTourAnimationTick((current) => current + 1);
      return;
    }

    if (bibleReaderTourStep < BIBLE_READER_TOUR_STEPS.length - 1) {
      setBibleReaderTourStep((current) => current + 1);
      setTourAnimationTick((current) => current + 1);
      return;
    }

    if (!userId) {
      setShowBibleReaderTour(false);
      setBibleReaderTourStep(-1);
      return;
    }

    setIsSavingBibleTour(true);

    const mergedFeatureTours = {
      ...featureTours,
      bible: true,
    };

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        feature_tours: mergedFeatureTours,
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("[FEATURE_TOURS] Error updating Bible reader tour:", updateError);

      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            feature_tours: mergedFeatureTours,
          },
          { onConflict: "user_id" }
        );

      if (upsertError) {
        console.error("[FEATURE_TOURS] Error upserting Bible reader tour:", upsertError);
        setIsSavingBibleTour(false);
        return;
      }
    }

    setFeatureTours(mergedFeatureTours);
    setShowBibleReaderTour(false);
    setBibleReaderTourStep(-1);
    setIsSavingBibleTour(false);
  }

  function handleBibleTourClose() {
    setShowBibleReaderTour(false);
    setBibleReaderTourStep(-1);
  }

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
            const creditResult = await consumeCreditAction(ACTION_TYPE.person_viewed, {
              userId,
              actionLabel: selectedPerson.name,
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

            triggerPoints(1);
          }
        }

        const existingNotes = await findPersonNotes(personNameKey);
        if (existingNotes) {
          setPersonNotes(existingNotes);
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

        const notesText = await savePersonNotes(personNameKey, generated);
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
              const creditResult = await consumeCreditAction(ACTION_TYPE.place_viewed, {
                userId,
                actionLabel: selectedPlace.name,
              });
              if (!creditResult.ok) {
                setPlaceCreditBlocked(true);
                return;
              }

              setViewedPlaces((prev) => {
                const next = new Set(prev);
                next.add(normalizedPlace);
                return next;
              });

              triggerPoints(1);
            }
          }
        }

        const existingNotes = await findPlaceNotes(normalizedPlace);
        if (existingNotes) {
          setPlaceNotes(existingNotes);
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

  // Load notes for selected keyword (reuse same logic as Keywords page)
  useEffect(() => {
    if (!selectedKeyword) {
      setKeywordNotes(null);
      setKeywordNotesError(null);
      setKeywordCreditBlocked(false);
      return;
    }

    async function generateNotes() {
      setLoadingNotes(true);
      setKeywordNotes(null);
      setKeywordNotesError(null);
      setKeywordCreditBlocked(false);

      try {
        if (!selectedKeyword) return;
        const keywordKey = selectedKeyword.name.toLowerCase().trim();

        if (userId) {
          const isCompleted = completedKeywords.has(keywordKey);

          if (!isCompleted) {
            const isViewed = viewedKeywords.has(keywordKey);

            if (!isViewed) {
              const creditResult = await consumeCreditAction(ACTION_TYPE.keyword_viewed, {
                userId,
                actionLabel: selectedKeyword.name,
              });
              if (!creditResult.ok) {
                setKeywordCreditBlocked(true);
                return;
              }

              setViewedKeywords((prev) => {
                const next = new Set(prev);
                next.add(keywordKey);
                return next;
              });

              triggerPoints(1);
            }
          }
        }

        const existingNotes = await findKeywordNotes(selectedKeyword.name);
        if (existingNotes) {
          setKeywordNotes(existingNotes);
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

        const notesText = await saveKeywordNotes(selectedKeyword.name, generated);

        setKeywordNotes(notesText);
      } catch (err: any) {
        console.error("Error loading keyword notes:", err);
        setKeywordNotesError("Couldn't load this keyword yet.");
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

        const { data: profileStats, error: profileStatsError } = await supabase
          .from("profile_stats")
          .select("feature_tours")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profileStatsError) {
          console.error("[FEATURE_TOURS] Error loading Bible reader tour:", profileStatsError);
        } else if (!profileStats) {
          const { error: upsertError } = await supabase
            .from("profile_stats")
            .upsert(
              {
                user_id: user.id,
                feature_tours: { ...DEFAULT_FEATURE_TOURS },
              },
              { onConflict: "user_id" }
            );

          if (upsertError) {
            console.error("[FEATURE_TOURS] Error creating Bible reader tour profile row:", upsertError);
          } else {
            setFeatureTours({ ...DEFAULT_FEATURE_TOURS });
            setShowBibleReaderTour(true);
          }
        } else {
          const normalizedTours = normalizeFeatureTours(profileStats.feature_tours);
          setFeatureTours(normalizedTours);
          if (normalizedTours.bible !== true) {
            setShowBibleReaderTour(true);
          }
        }

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

  useEffect(() => {
    if (!userId || !chapter) return;

    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.bible_chapter_viewed,
      actionLabel: `${book} ${chapter}`,
      dedupeKey: `bible-chapter-viewed:${book.toLowerCase()}:${chapter}`,
    }).catch((error) => {
      console.error("[NAV] Failed to track Bible chapter view:", error);
    });
  }, [book, chapter, userId, username]);

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

  function buildChapterReflectionQuestion(bookName: string, chapterNum: number, summary: string): string {
    const fallback = `After reading ${bookName} ${chapterNum}, what stands out to you most, and why?`;
    const cleanedSummary = summary.replace(/\s+/g, " ").trim();
    if (!cleanedSummary) {
      return fallback;
    }

    let topic = cleanedSummary
      .replace(/^this chapter\s+(shows|is about|highlights|focuses on|emphasizes|reveals)\s+/i, "")
      .replace(/^in this chapter,\s*/i, "")
      .replace(/^we\s+(see|watch|follow)\s+/i, "")
      .replace(/^the chapter\s+(shows|highlights|focuses on|emphasizes)\s+/i, "")
      .split(/[.!?]/)[0]
      .trim()
      .replace(/^[,;:\-–—\s]+/, "")
      .replace(/[,;:\-–—\s]+$/, "");

    if (!topic) {
      return fallback;
    }

    if (topic.length > 120) {
      topic = `${topic.slice(0, 117).trim()}...`;
    }

    const normalizedTopic = topic.charAt(0).toLowerCase() + topic.slice(1);
    return `After reading ${bookName} ${chapterNum}, what stands out to you most about ${normalizedTopic}?`;
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

  // Load game chapter packs + completion state
  useEffect(() => {
    const bookKey = book.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
    const resolvedKey = bookKey === "songofsolomon" ? "songofsongs" : bookKey;
    const routeEntry = CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((e) => e.key === resolvedKey);
    const routeSlug = routeEntry?.routeSlug ?? resolvedKey;

    const trivia = getTriviaChapter(resolvedKey, chapter);
    if (trivia) setTriviaChapterPack(trivia);

    const scrambled = getScrambledChapter(resolvedKey, chapter);
    if (scrambled) setScrambledChapterPack(scrambled);

    // Check completion state from master_actions
    async function checkDone() {
      if (!userId) return;
      const chapterLabel = `${book.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")} ${chapter}`;
      const [reviewRes, triviaRes, scrambledRes] = await Promise.all([
        supabase.from("master_actions").select("id").eq("user_id", userId).eq("action_type", ACTION_TYPE.chapter_notes_reviewed).eq("action_label", chapterLabel).limit(1).maybeSingle(),
        supabase.from("master_actions").select("id").eq("user_id", userId).eq("action_type", ACTION_TYPE.trivia_chapter_completed).ilike("action_label", `${chapterLabel}%`).limit(1).maybeSingle(),
        supabase.from("master_actions").select("id").eq("user_id", userId).eq("action_type", ACTION_TYPE.scrambled_chapter_completed).ilike("action_label", `${chapterLabel}%`).limit(1).maybeSingle(),
      ]);
      setReviewDone(!!reviewRes.data);
      setTriviaDone(!!triviaRes.data);
      setScrambledDone(!!scrambledRes.data);
    }
    checkDone();
  }, [book, chapter, userId]);

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

  async function openReviewModal() {
    setShowReviewModal(true);
    if (reviewNotesText || reviewLoadingRef.current) return;
    reviewLoadingRef.current = true;
    setReviewLoading(true);
    setReviewError(null);
    try {
      const bookKey = book.toLowerCase().trim();
      const chapterNum = Number(chapter);

      // 1. Log view + award +2 points once per chapter
      if (userId) {
        const reviewedLabel = `${bookDisplayName} ${chapterNum}`;

        // Log chapter_notes_viewed (every time)
        await supabase.from("master_actions").insert({
          user_id: userId,
          action_type: ACTION_TYPE.chapter_notes_viewed,
          action_label: reviewedLabel,
        });

        // Award +2 points first time only (chapter_notes_reviewed)
        const { data: existingReviewed } = await supabase
          .from("master_actions")
          .select("id")
          .eq("user_id", userId)
          .eq("action_type", ACTION_TYPE.chapter_notes_reviewed)
          .eq("action_label", reviewedLabel)
          .limit(1)
          .maybeSingle();

        if (!existingReviewed) {
          const { error: insertErr } = await supabase.from("master_actions").insert({
            user_id: userId,
            action_type: ACTION_TYPE.chapter_notes_reviewed,
            action_label: reviewedLabel,
          });
          if (!insertErr) {
            triggerPoints(2);
            setReviewDone(true);
          }
        } else {
          setReviewDone(true);
        }
      }

      // 2. Check bible_notes cache first
      const { data: cached } = await supabase
        .from("bible_notes")
        .select("notes_text")
        .eq("book", bookKey)
        .eq("chapter", chapterNum)
        .maybeSingle();

      if (cached?.notes_text && cached.notes_text.trim().length > 0) {
        setReviewNotesText(cached.notes_text);
        return;
      }

      // 2. Not cached — generate via AI
      const prompt = `You are Little Louis. Generate beginner friendly notes for ${bookDisplayName} chapter ${chapter} using this exact template and rules.

TEMPLATE
# 🧠 Big Idea of the Chapter
One short paragraph explaining the heart of the chapter in simple English.

# 🎬 What's Happening…
Include three or four cinematic story movements. Each movement follows:
[Emoji] **Story Moment Title** (ALWAYS bold the story moment title with **)
A short paragraph of three to four sentences explaining what happens and why it matters. Smooth, simple, friendly language.

# 📌 Key Themes
List two or three themes. Each theme is one short sentence.

# 🔗 Connections to the Bigger Story
One or two simple connections to prophecy, covenant, or Jesus mission. Beginner friendly.

# 🙌 Simple Life Application
A short paragraph of three to four sentences explaining what this chapter shows about God and what the reader is invited to believe or do.

# 🏁 One Sentence Summary
A final strong sentence that captures the message.

RULES
DO NOT include a top-level header. Start directly with "# 🧠 Big Idea of the Chapter".
No hyphens anywhere. No deep theology. Keep it cinematic, warm, simple.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      if (!response.ok) throw new Error("Failed to generate review");
      const json = await response.json();
      let generated = (json?.reply as string) ?? "";
      if (!generated.trim()) throw new Error("Empty response from AI");

      // Clean hyphens to match existing notes format
      generated = generated.replace(/-/g, " ");

      // 3. Upsert to bible_notes
      await supabase.from("bible_notes").upsert(
        { book: bookKey, chapter: chapterNum, notes_text: generated },
        { onConflict: "book,chapter" }
      );

      // 4. Re-read from DB (single source of truth)
      const { data: saved } = await supabase
        .from("bible_notes")
        .select("notes_text")
        .eq("book", bookKey)
        .eq("chapter", chapterNum)
        .maybeSingle();

      setReviewNotesText(saved?.notes_text ?? generated);
    } catch (err: any) {
      console.error("Review modal error:", err);
      setReviewError("Couldn't load the chapter review. Please try again.");
    } finally {
      setReviewLoading(false);
      reviewLoadingRef.current = false;
    }
  }

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

  const chapterReflectionQuestion = useMemo(
    () => buildChapterReflectionQuestion(bookDisplayName, chapter, chapterSummary),
    [bookDisplayName, chapter, chapterSummary]
  );

  function openReflectionSection() {
    setHighlightReflectionSection(true);

    window.setTimeout(() => {
      reflectionSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);

    window.setTimeout(() => {
      setHighlightReflectionSection(false);
    }, 2600);
  }

  // Trivia/scrambled route slug for the current book
  const _triviaBookKey = book.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
  const _resolvedTriviaBookKey = _triviaBookKey === "songofsolomon" ? "songofsongs" : _triviaBookKey;
  const triviaRouteSlug = CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((e) => e.key === _resolvedTriviaBookKey)?.routeSlug ?? _resolvedTriviaBookKey;

  // Determine back link:
  // - If opened from a reading plan or devotional, send users back there.
  // - Otherwise, send them to the normal book overview page.
  const backLink = sourceContext.backLink || `/reading/books/${encodeURIComponent(book.toLowerCase())}`;
  const backText = sourceContext.backText || `← Back to ${bookDisplayName} overview`;

  const chapterDiscussionSlug = `bible-chapter-${book.toLowerCase().replace(/\s+/g, "-")}-${chapter}`;

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
      triggerPoints(10);
      setShowCongratsModal(true);
      setIsSaving(false);

      // Trigger confetti animation
      triggerConfetti();

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


  // Translation menu click-outside handler — must be before any early returns
  useEffect(() => {
    if (!translationMenuOpen) return;

    function onDocPointerDown(e: PointerEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      if (!translationMenuRef.current?.contains(target)) {
        setTranslationMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", onDocPointerDown, true);
    return () => document.removeEventListener("pointerdown", onDocPointerDown, true);
  }, [translationMenuOpen]);

  // Games menu click-outside handler — must be before any early returns
  useEffect(() => {
    if (!gamesMenuOpen) return;
    function onDocPointerDown(e: PointerEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      if (!gamesMenuRef.current?.contains(target)) {
        setGamesMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDocPointerDown, true);
    return () => document.removeEventListener("pointerdown", onDocPointerDown, true);
  }, [gamesMenuOpen]);

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

  const totalChaptersInBook = getBookTotalChapters(book);

  function goPrevChapter() {
    if (chapter <= 1) return;
    router.push(`/Bible/${encodeURIComponent(book.toLowerCase())}/${chapter - 1}`);
  }

  function goNextChapter() {
    if (chapter < totalChaptersInBook) {
      router.push(`/Bible/${encodeURIComponent(book.toLowerCase())}/${chapter + 1}`);
      return;
    }

    // Next book in biblical order (fallback to same book if already last).
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
    const currentIndex = BOOKS_ORDER.findIndex((b) => b.toLowerCase() === book.toLowerCase());
    const nextBook =
      currentIndex >= 0 && currentIndex < BOOKS_ORDER.length - 1
        ? BOOKS_ORDER[currentIndex + 1]
        : bookDisplayName;

    router.push(`/Bible/${encodeURIComponent(nextBook.toLowerCase())}/1`);
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
        </div>

        {/* LOUIS INSTRUCTION — above the control bar */}
        <div data-bible-tour="summary" className={`mb-4 flex items-start gap-3 ${getBibleTourClasses("summary")}`}>
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

        {/* READER CONTROL BAR */}
        <div className="relative z-20 mb-5">
          <div className="rounded-[26px] border-0 bg-transparent px-0 py-0 shadow-none backdrop-blur md:border md:border-blue-100 md:bg-white/90 md:px-3 md:py-2.5 md:shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              {/* Left: Previous + Book */}
              <div className="hidden md:flex items-center justify-between gap-2 md:justify-start">
                <div className="flex items-center gap-1.5">
                  <div className="group relative">
                    <button
                      type="button"
                      onClick={goPrevChapter}
                      disabled={chapter <= 1}
                      aria-label="Previous chapter"
                      className={`flex items-center justify-center rounded-xl border px-2.5 py-1.5 transition ${
                        chapter <= 1
                          ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                          : "border-gray-200 bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-200"
                      }`}
                    >
                      <span className="text-sm font-bold">←</span>
                      <span className="ml-1.5 hidden sm:inline text-xs font-semibold">Prev</span>
                    </button>
                    <div className="pointer-events-none absolute left-0 top-full mt-2 z-50 hidden w-max rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md group-hover:block">
                      Previous chapter
                    </div>
                  </div>

                  <div className="group relative">
                    <button
                      type="button"
                      onClick={() => setShowBooksModal(true)}
                      aria-label="Browse all Bible books"
                      className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-gray-800 transition hover:bg-blue-50 hover:border-blue-200"
                    >
                      <span className="text-base">📖</span>
                      <span className="ml-1.5 hidden sm:inline text-xs font-semibold">Books</span>
                    </button>
                    <div className="pointer-events-none absolute left-0 top-full mt-2 z-50 hidden w-max rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md group-hover:block">
                      Browse all Bible books
                    </div>
                  </div>
                </div>

                {/* Right-side on mobile: Next */}
                <div className="md:hidden group relative">
                  <button
                    type="button"
                    onClick={goNextChapter}
                    aria-label="Next chapter"
                    className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-gray-800 transition hover:bg-blue-50 hover:border-blue-200"
                  >
                    <span className="hidden sm:inline text-xs font-semibold">Next</span>
                    <span className="ml-1.5 text-sm font-bold">→</span>
                  </button>
                  <div className="pointer-events-none absolute right-0 top-full mt-2 z-50 hidden w-max rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md group-hover:block">
                    Next chapter
                  </div>
                </div>
              </div>

              {/* Center: Plain text toggle + Mark finished / checklist */}
              <div className="hidden md:flex items-center justify-center gap-2">
                <label className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 transition hover:bg-blue-50 hover:border-blue-200 select-none">
                  <input
                    type="checkbox"
                    checked={plainTextMode}
                    onChange={(e) => setPlainTextMode(e.target.checked)}
                    className="h-3.5 w-3.5 accent-blue-600"
                  />
                  <span className="text-xs font-semibold text-gray-800">Plain text</span>
                </label>
                <div className="group relative">
                  <button
                    type="button"
                    onClick={() => {
                      if (isSaving) return;
                      if (isCompleted) {
                        setShowChecklistModal(true);
                        return;
                      }
                      void handleMarkFinished();
                    }}
                    aria-label={isCompleted ? "Open chapter checklist" : "Mark chapter completed"}
                    className={`relative flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-bold transition ${
                      isCompleted
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : isSaving
                          ? "bg-blue-300 text-white cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700 bb-mark-pulse"
                    }`}
                  >
                    <span className="text-base">{isCompleted ? "✅" : "☑️"}</span>
                    <span className="text-xs font-bold">
                      {isCompleted ? "Chapter Checklist" : "Mark Chapter Completed"}
                    </span>
                  </button>
                  <div className="pointer-events-none absolute left-1/2 top-full mt-2 z-50 hidden -translate-x-1/2 w-max rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md group-hover:block">
                    {isCompleted ? "Open your chapter checklist" : "Mark this chapter as completed"}
                  </div>
                </div>
              </div>

              {/* Right: Translation + Review + Trivia + Scrambled + Next */}
              <div className="hidden md:flex items-center justify-end gap-1.5">
                <div ref={translationMenuRef} className="group relative" data-bible-tour="translations">
                  <button
                    type="button"
                    onClick={() => setTranslationMenuOpen((value) => !value)}
                    aria-haspopup="menu"
                    aria-expanded={translationMenuOpen}
                    className={`flex items-center justify-center rounded-xl border bg-white px-2.5 py-1.5 text-gray-800 transition hover:bg-blue-50 hover:border-blue-200 ${getBibleTourClasses("translations")}`}
                  >
                    <span className="text-base">🌐</span>
                    <span className="ml-1.5 text-xs font-semibold">{translation.toUpperCase()}</span>
                  </button>
                  {!translationMenuOpen && (
                    <div className="pointer-events-none absolute right-0 top-full mt-2 z-50 hidden w-max rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md group-hover:block">
                      Translation
                    </div>
                  )}

                  {translationMenuOpen ? (
                    <div
                      role="menu"
                      className="absolute right-0 top-full mt-2 z-50 w-40 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
                    >
                      {([
                        { value: "web", label: "WEB" },
                        { value: "asv", label: "ASV" },
                        { value: "kjv", label: "KJV" },
                      ] as const).map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setTranslation(option.value);
                            setTranslationMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold transition ${
                            translation === option.value ? "bg-blue-600 text-white" : "text-gray-800 hover:bg-blue-50"
                          }`}
                        >
                          <span>{option.label}</span>
                          {translation === option.value ? <span>Selected</span> : null}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="group relative">
                  <button
                    type="button"
                    onClick={openReviewModal}
                    aria-label="Chapter review"
                    className={`flex items-center justify-center rounded-xl border px-2.5 py-1.5 transition ${
                      reviewDone
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "border-gray-200 bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-200"
                    }`}
                  >
                    <span className="text-base">{reviewDone ? "✅" : "📝"}</span>
                    <span className="ml-1.5 hidden lg:inline text-xs font-semibold">Review</span>
                  </button>
                  <div className="pointer-events-none absolute right-0 top-full mt-2 z-50 hidden w-max rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md group-hover:block">
                    {reviewDone ? "Review done ✓" : "Chapter review"}
                  </div>
                </div>

                {triviaChapterPack && (
                  <div className="group relative">
                    <button
                      type="button"
                      onClick={() => setShowTriviaModal(true)}
                      aria-label="Trivia"
                      className={`flex items-center justify-center rounded-xl border px-2.5 py-1.5 transition ${
                        triviaDone
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "border-gray-200 bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-200"
                      }`}
                    >
                      <span className="text-base">{triviaDone ? "✅" : "🧠"}</span>
                      <span className="ml-1.5 text-xs font-semibold">Trivia</span>
                    </button>
                    <div className="pointer-events-none absolute right-0 top-full mt-2 z-50 hidden w-max rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md group-hover:block">
                      {triviaDone ? "Trivia done ✓" : "Chapter trivia"}
                    </div>
                  </div>
                )}

                {scrambledChapterPack && (
                  <div className="group relative">
                    <button
                      type="button"
                      onClick={() => setShowScrambledModal(true)}
                      aria-label="Scrambled"
                      className={`flex items-center justify-center rounded-xl border px-2.5 py-1.5 transition ${
                        scrambledDone
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "border-gray-200 bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-200"
                      }`}
                    >
                      <span className="text-base">{scrambledDone ? "✅" : "🔀"}</span>
                      <span className="ml-1.5 text-xs font-semibold">Scrambled</span>
                    </button>
                    <div className="pointer-events-none absolute right-0 top-full mt-2 z-50 hidden w-max rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md group-hover:block">
                      {scrambledDone ? "Scrambled done ✓" : "Scrambled game"}
                    </div>
                  </div>
                )}

                <div className="group relative">
                  <button
                    type="button"
                    onClick={goNextChapter}
                    aria-label="Next chapter"
                    className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-gray-800 transition hover:bg-blue-50 hover:border-blue-200"
                  >
                    <span className="text-xs font-semibold">Next</span>
                    <span className="ml-1.5 text-sm font-bold">→</span>
                  </button>
                  <div className="pointer-events-none absolute right-0 top-full mt-2 z-50 hidden w-max rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md group-hover:block">
                    Next chapter
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile quick actions */}
            <div className="mt-3 md:hidden" ref={gamesMenuRef}>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isSaving) return;
                    if (isCompleted) {
                      setShowChecklistModal(true);
                      return;
                    }
                    void handleMarkFinished();
                  }}
                  aria-label={isCompleted ? "Open chapter checklist" : "Mark chapter completed"}
                  className={`flex min-h-[5.5rem] w-full items-center justify-between rounded-2xl border px-4 py-4 text-left text-white shadow-lg transition ${
                    isCompleted
                      ? "border-emerald-500 bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700"
                      : isSaving
                        ? "border-blue-300 bg-blue-300 cursor-not-allowed shadow-blue-100"
                        : "border-blue-500 bg-blue-600 shadow-blue-200 hover:bg-blue-700 bb-mark-pulse"
                  }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-extrabold uppercase tracking-[0.08em]">
                        {isCompleted ? "Checklist" : "Mark Complete"}
                      </span>
                      <span className="mt-1 text-xs font-medium text-blue-100">
                        {isCompleted ? "Open chapter tasks" : "Finish this chapter"}
                      </span>
                    </div>
                    <span className="text-lg font-bold">{isCompleted ? "✓" : "☑"}</span>
                  </button>

                <button
                  type="button"
                  onClick={() => {
                    setGamesMenuOpen((value) => !value);
                    setTranslationMenuOpen(false);
                  }}
                  aria-expanded={gamesMenuOpen}
                  aria-label="Bible menu, click here"
                  className="flex w-full items-center justify-between rounded-2xl border border-gray-300 bg-gray-100 px-4 py-3 text-left text-gray-800 shadow-sm transition hover:border-gray-400 hover:bg-gray-200"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold uppercase tracking-[0.14em]">Bible Menu</span>
                    <span className="text-xs font-medium text-gray-500">Click here</span>
                  </div>
                  <span className="text-xl font-bold">{gamesMenuOpen ? "-" : "+"}</span>
                </button>
              </div>

              {gamesMenuOpen && (
                <div className="relative z-50 mt-2 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-100">
                  <div className="border-b border-blue-50 bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">Chapter tools</p>
                    <p className="text-xs text-gray-600">Browse books and chapters, switch translations, or jump into chapter tools.</p>
                  </div>

                  <div className="space-y-2 p-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowBooksModal(true);
                        setGamesMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <span>Browse Books and Chapters</span>
                      <span>Open</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        openReviewModal();
                        setGamesMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${reviewDone ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-white text-gray-800 hover:border-blue-200 hover:bg-blue-50"}`}
                    >
                      <span>Chapter Review</span>
                      <span>{reviewDone ? "Done" : "Open"}</span>
                    </button>

                    <div className="rounded-2xl border border-gray-200 bg-white" ref={translationMenuRef}>
                      <button
                        type="button"
                        onClick={() => setTranslationMenuOpen((value) => !value)}
                        aria-expanded={translationMenuOpen}
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <span>Translation</span>
                        <span>{translation.toUpperCase()}</span>
                      </button>

                      {translationMenuOpen ? (
                        <div className="border-t border-gray-100">
                          {([
                            { value: "web", label: "WEB" },
                            { value: "asv", label: "ASV" },
                            { value: "kjv", label: "KJV" },
                          ] as const).map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setTranslation(option.value);
                                setTranslationMenuOpen(false);
                                setGamesMenuOpen(false);
                              }}
                              className={`flex w-full items-center justify-between px-4 py-3 text-sm font-semibold transition ${
                                translation === option.value ? "bg-blue-600 text-white" : "text-gray-800 hover:bg-blue-50"
                              }`}
                            >
                              <span>{option.label}</span>
                              {translation === option.value ? <span>Selected</span> : null}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {triviaChapterPack ? (
                      <button
                        type="button"
                        onClick={() => {
                          setShowTriviaModal(true);
                          setGamesMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${triviaDone ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-white text-gray-800 hover:border-blue-200 hover:bg-blue-50"}`}
                      >
                        <span>Trivia Quiz</span>
                        <span>{triviaDone ? "Done" : "Play"}</span>
                      </button>
                    ) : null}

                    {scrambledChapterPack ? (
                      <button
                        type="button"
                        onClick={() => {
                          setShowScrambledModal(true);
                          setGamesMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${scrambledDone ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-white text-gray-800 hover:border-blue-200 hover:bg-blue-50"}`}
                      >
                        <span>Scrambled</span>
                        <span>{scrambledDone ? "Done" : "Play"}</span>
                      </button>
                    ) : null}

                    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-200 hover:bg-blue-50 select-none">
                      <span>Plain Text Mode</span>
                      <input
                        type="checkbox"
                        checked={plainTextMode}
                        onChange={(e) => setPlainTextMode(e.target.checked)}
                        className="h-5 w-5 accent-blue-600"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* VERSE BLOCK */}
        <div 
          data-bible-tour={currentBibleReaderTourStep?.key === "words" ? "words" : "verses"}
          ref={verseContainerRef}
          className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6 max-h-[60vh] overflow-y-auto ${
            plainTextMode ? "plain-text-mode" : ""
          } ${
            currentBibleReaderTourStep?.key === "words"
              ? getBibleTourClasses("words")
              : getBibleTourClasses("verses")
          }`}
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


        <div className="mb-10" ref={reflectionSectionRef}>
          <div className={`mx-auto mb-4 max-w-2xl rounded-2xl border bg-gradient-to-br from-white via-blue-50 to-sky-50 p-5 shadow-sm transition-all duration-500 ${
            highlightReflectionSection
              ? "border-blue-400 ring-4 ring-blue-200 shadow-[0_0_0_6px_rgba(191,219,254,0.55)]"
              : "border-blue-100"
          }`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Chapter Reflection
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Answer this question
            </h2>
            <p className="mt-3 text-base font-semibold leading-relaxed text-gray-900">
              {chapterReflectionQuestion}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Share your answer below and join the reflection for {bookDisplayName} {chapter}.
            </p>
          </div>

          <div className={`rounded-2xl transition-all duration-500 ${
            highlightReflectionSection ? "ring-4 ring-blue-200/80" : ""
          }`}>
            <CommentSection
              articleSlug={chapterDiscussionSlug}
              headingText={`${bookDisplayName} ${chapter} Reflection Answers`}
              placeholderText={`Answer the reflection question for ${bookDisplayName} ${chapter}...`}
              submitButtonText="Post Reflection"
            />
          </div>
        </div>
      </div>

      {/* CHAPTER REVIEW MODAL */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-lg">📝</div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Chapter Review</p>
                  <h2 className="text-base font-bold text-gray-900">{bookDisplayName} {chapter}</h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                aria-label="Close review"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 pb-8">
              {reviewLoading ? (
                <div className="flex flex-col items-center gap-4 py-12">
                  <div style={{ animation: "bounce 1s infinite" }}>
                    <LouisAvatar mood="think" size={60} />
                  </div>
                  <p className="text-sm text-gray-400 italic animate-pulse">Little Louis is preparing your review…</p>
                </div>
              ) : reviewError ? (
                <div className="py-10 text-center">
                  <p className="text-sm text-red-500">{reviewError}</p>
                  <button
                    type="button"
                    onClick={() => { reviewLoadingRef.current = false; openReviewModal(); }}
                    className="mt-3 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="max-w-none space-y-5 text-gray-800">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mt-6 mb-2 text-xl font-bold text-gray-900 first:mt-0">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mt-5 mb-2 text-lg font-bold text-gray-900">{children}</h2>
                      ),
                      p: ({ children }) => (
                        <p className="text-[15px] leading-relaxed text-gray-700">{children}</p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-gray-900">{children}</strong>
                      ),
                      li: ({ children }) => (
                        <li className="ml-4 list-disc text-[15px] leading-relaxed text-gray-700">{children}</li>
                      ),
                    }}
                  >
                    {reviewNotesText}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TRIVIA MODAL */}
      {showTriviaModal && triviaChapterPack && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        >
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-gray-50 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowTriviaModal(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
              aria-label="Close trivia"
            >
              ✕
            </button>
            <TriviaGamePlayer
              bookName={bookDisplayName}
              bookSlug={triviaRouteSlug}
              chapter={triviaChapterPack}
              onClose={() => {
                setShowTriviaModal(false);
                // Refresh trivia done state
                if (userId) {
                  const chapterLabel = `${bookDisplayName} ${chapter}`;
                  supabase.from("master_actions").select("id").eq("user_id", userId).eq("action_type", ACTION_TYPE.trivia_chapter_completed).ilike("action_label", `${chapterLabel}%`).limit(1).maybeSingle().then(({ data }) => setTriviaDone(!!data));
                }
              }}
            />
          </div>
        </div>
      )}

      {/* SCRAMBLED MODAL */}
      {showScrambledModal && scrambledChapterPack && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        >
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#f5f7fb] shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setShowScrambledModal(false);
                // Refresh scrambled done state
                if (userId) {
                  const chapterLabel = `${bookDisplayName} ${chapter}`;
                  supabase.from("master_actions").select("id").eq("user_id", userId).eq("action_type", ACTION_TYPE.scrambled_chapter_completed).ilike("action_label", `${chapterLabel}%`).limit(1).maybeSingle().then(({ data }) => setScrambledDone(!!data));
                }
              }}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
              aria-label="Close scrambled"
            >
              ✕
            </button>
            <ScrambledGamePlayer
              bookName={bookDisplayName}
              bookSlug={triviaRouteSlug}
              chapter={scrambledChapterPack}
              onClose={() => {
                setShowScrambledModal(false);
                if (userId) {
                  const chapterLabel = `${bookDisplayName} ${chapter}`;
                  supabase.from("master_actions").select("id").eq("user_id", userId).eq("action_type", ACTION_TYPE.scrambled_chapter_completed).ilike("action_label", `${chapterLabel}%`).limit(1).maybeSingle().then(({ data }) => setScrambledDone(!!data));
                }
              }}
            />
          </div>
        </div>
      )}

      {/* CONGRATULATIONS MODAL */}
      {showCongratsModal && (
        <CongratsModalWithConfetti
          levelInfo={levelInfoForModal ?? undefined}
          withConfetti={true}
          onRequestClose={() => setShowCongratsModal(false)}
          reviewDone={reviewDone}
          triviaDone={triviaDone}
          scrambledDone={scrambledDone}
          onOpenReview={() => {
            setShowCongratsModal(false);
            openReviewModal();
          }}
          onOpenTrivia={() => {
            setShowCongratsModal(false);
            setShowTriviaModal(true);
          }}
          onOpenScrambled={() => {
            setShowCongratsModal(false);
            setShowScrambledModal(true);
          }}
          onOpenReflection={() => {
            setShowCongratsModal(false);
            openReflectionSection();
          }}
        />
      )}

      {showChecklistModal && (
        <CongratsModalWithConfetti
          withConfetti={false}
          onRequestClose={() => setShowChecklistModal(false)}
          reviewDone={reviewDone}
          triviaDone={triviaDone}
          scrambledDone={scrambledDone}
          onOpenReview={() => {
            setShowChecklistModal(false);
            openReviewModal();
          }}
          onOpenTrivia={() => {
            setShowChecklistModal(false);
            setShowTriviaModal(true);
          }}
          onOpenScrambled={() => {
            setShowChecklistModal(false);
            setShowScrambledModal(true);
          }}
          onOpenReflection={() => {
            setShowChecklistModal(false);
            openReflectionSection();
          }}
        />
      )}

      {showBibleReaderTour && (
        <FeatureTourModal
          isOpen={true}
          title={
            bibleReaderTourStep < 0
              ? "This is the Bible Reader"
              : currentBibleReaderTourStep?.title ?? "Bible Reader"
          }
          body={
            bibleReaderTourStep < 0
              ? "This is where you can interact with and read through the Bible chapter by chapter. Do you want to take the tour to learn how to use the Bible reader?"
              : currentBibleReaderTourStep?.body ?? ""
          }
          primaryButtonText={bibleReaderTourStep < 0 ? "Yes" : bibleReaderTourStep === BIBLE_READER_TOUR_STEPS.length - 1 ? "Done" : "Next"}
          secondaryButtonText={bibleReaderTourStep < 0 ? "Later" : undefined}
          onSecondary={handleBibleTourClose}
          variant={bibleReaderTourStep < 0 ? "prompt" : "speech-bubble"}
          canAdvance={true}
          closeOnBackdrop={bibleReaderTourStep < 0}
          isSaving={isSavingBibleTour}
          onClose={handleBibleTourClose}
          onUnderstand={handleBibleTourUnderstand}
        />
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
            {personCreditBlocked ? null : !personNotes ? (
              <LouisLoadingCard name={selectedPerson.name} />
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

                {/* MARK AS FINISHED BUTTON (same as database pages) */}
                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      const personKey = selectedPerson.name.toLowerCase().trim();
                      const isCompleted = completedPeople.has(personKey);
                      return (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (!userId || isCompleted) return;

                            const personNameKey = selectedPerson.name.toLowerCase().trim();
                            const personDisplayName = selectedPerson.name.split(" ").map((w) => {
                              if (/^\d+$/.test(w)) return w;
                              return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
                            }).join(" ");

                            // Immediately animate, close modal, show Louis toast
                            setIsAnimatingPerson(true);
                            setTimeout(() => {
                              setSelectedPerson(null);
                              setPersonNotes(null);
                              setIsAnimatingPerson(false);
                              setLearnedToast(`${personDisplayName} has been learned! 🙌`);
                              setTimeout(() => setLearnedToast(null), 3500);
                            }, 250);

                            // Background DB work (fire-and-forget)
                            (async () => {
                              try {
                                const { error } = await supabase
                                  .from("people_progress")
                                  .upsert({ user_id: userId, person_name: personNameKey }, { onConflict: "user_id,person_name" });

                                if (!error) {
                                  setCompletedPeople((prev) => { const n = new Set(prev); n.add(personNameKey); return n; });

                                  const { data: { user: authUser } } = await supabase.auth.getUser();
                                  const meta: any = authUser?.user_metadata || {};
                                  const actionUsername = meta.firstName || meta.first_name || (authUser?.email?.split("@")[0]) || "User";

                                  await supabase.from("master_actions").insert({
                                    user_id: userId, username: actionUsername,
                                    action_type: ACTION_TYPE.person_learned, action_label: personDisplayName,
                                  });

                                  const { count } = await supabase.from("people_progress").select("*", { count: "exact", head: true }).eq("user_id", userId);
                                  if (count !== null) {
                                    const { data: stats } = await supabase.from("profile_stats").select("username, chapters_completed_count, notes_created_count, places_discovered_count, keywords_mastered_count").eq("user_id", userId).maybeSingle();
                                    await supabase.from("profile_stats").upsert({
                                      user_id: userId,
                                      username: stats?.username || actionUsername,
                                      people_learned_count: count,
                                      total_actions: (stats?.chapters_completed_count || 0) + (stats?.notes_created_count || 0) + count + (stats?.places_discovered_count || 0) + (stats?.keywords_mastered_count || 0),
                                      updated_at: new Date().toISOString(),
                                    }, { onConflict: "user_id" });
                                  }
                                }
                              } catch (err) {
                                console.error("Error saving person progress:", err);
                              }
                            })();
                          }}
                          className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                          }`}
                          style={isAnimatingPerson ? { transform: "scale(0.92)", opacity: 0.7 } : undefined}
                        >
                          {isCompleted
                            ? `✓ ${selectedPerson.name} learned`
                            : `Mark ${selectedPerson.name} as Learned`}
                        </button>
                      );
                    })()}
                  </div>
                )}
              </div>
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
            {placeCreditBlocked ? null : !placeNotes ? (
              <LouisLoadingCard name={selectedPlace.name} />
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

                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      const placeKey = selectedPlace.name.toLowerCase().trim().replace(/\s+/g, "_");
                      const isCompleted = completedPlaces.has(placeKey);
                      const placeDisplayName = selectedPlace.name.split(" ").map((w) => {
                        if (/^\d+$/.test(w)) return w;
                        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
                      }).join(" ");
                      return (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (!userId || isCompleted) return;

                            setIsAnimatingPlace(true);
                            setTimeout(() => {
                              setSelectedPlace(null); setPlaceNotes(null); setIsAnimatingPlace(false);
                              setLearnedToast(`${placeDisplayName} has been learned! 🙌`);
                              setTimeout(() => setLearnedToast(null), 3500);
                            }, 250);

                            (async () => {
                              try {
                                const { error } = await supabase.from("places_progress").upsert(
                                  { user_id: userId, place_name: placeKey }, { onConflict: "user_id,place_name" }
                                );
                                if (!error) {
                                  setCompletedPlaces((prev) => { const n = new Set(prev); n.add(placeKey); return n; });
                                  const { data: { user: authUser } } = await supabase.auth.getUser();
                                  const meta: any = authUser?.user_metadata || {};
                                  const actionUsername = meta.firstName || meta.first_name || (authUser?.email?.split("@")[0]) || "User";
                                  await supabase.from("master_actions").insert({
                                    user_id: userId, username: actionUsername,
                                    action_type: ACTION_TYPE.place_discovered, action_label: placeDisplayName,
                                  });
                                  const { count } = await supabase.from("places_progress").select("*", { count: "exact", head: true }).eq("user_id", userId);
                                  if (count !== null) {
                                    const { data: stats } = await supabase.from("profile_stats").select("username, chapters_completed_count, notes_created_count, people_learned_count, keywords_mastered_count").eq("user_id", userId).maybeSingle();
                                    await supabase.from("profile_stats").upsert({
                                      user_id: userId, username: stats?.username || actionUsername,
                                      places_discovered_count: count,
                                      total_actions: (stats?.chapters_completed_count || 0) + (stats?.notes_created_count || 0) + (stats?.people_learned_count || 0) + count + (stats?.keywords_mastered_count || 0),
                                      updated_at: new Date().toISOString(),
                                    }, { onConflict: "user_id" });
                                  }
                                }
                              } catch (err) { console.error("Error saving place progress:", err); }
                            })();
                          }}
                          className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            isCompleted ? "bg-green-100 text-green-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                          }`}
                          style={isAnimatingPlace ? { transform: "scale(0.92)", opacity: 0.7 } : undefined}
                        >
                          {isCompleted ? `✓ ${selectedPlace.name} learned` : `Mark ${selectedPlace.name} as Learned`}
                        </button>
                      );
                    })()}
                  </div>
                )}
              </div>
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
                setKeywordNotesError(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedKeyword.name}</h2>
            {keywordCreditBlocked ? null : loadingNotes && !keywordNotes ? (
              <LouisLoadingCard name={selectedKeyword.name} />
            ) : !keywordNotes ? (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-500 mb-4">{keywordNotesError || "Couldn't load this keyword yet."}</p>
                <button
                  type="button"
                  onClick={() => {
                    setKeywordNotes(null);
                    setKeywordNotesError(null);
                    setSelectedKeyword({ name: selectedKeyword.name });
                  }}
                  className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Retry
                </button>
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

                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      const keywordKey = selectedKeyword.name.toLowerCase().trim();
                      const isCompleted = completedKeywords.has(keywordKey);
                      const kwDisplayName = selectedKeyword.name.split(" ").map((w) => {
                        if (/^\d+$/.test(w)) return w;
                        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
                      }).join(" ");
                      return (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (!userId || isCompleted) return;

                            setIsAnimatingKeyword(true);
                            setTimeout(() => {
                              setSelectedKeyword(null); setKeywordNotes(null); setIsAnimatingKeyword(false);
                              setLearnedToast(`${kwDisplayName} has been learned! 🙌`);
                              setTimeout(() => setLearnedToast(null), 3500);
                            }, 250);

                            (async () => {
                              try {
                                const { error } = await supabase.from("keywords_progress").upsert(
                                  { user_id: userId, keyword_name: keywordKey }, { onConflict: "user_id,keyword_name" }
                                );
                                if (!error) {
                                  setCompletedKeywords((prev) => { const n = new Set(prev); n.add(keywordKey); return n; });
                                  const { data: { user: authUser } } = await supabase.auth.getUser();
                                  const meta: any = authUser?.user_metadata || {};
                                  const actionUsername = meta.firstName || meta.first_name || (authUser?.email?.split("@")[0]) || "User";
                                  await supabase.from("master_actions").insert({
                                    user_id: userId, username: actionUsername,
                                    action_type: ACTION_TYPE.keyword_mastered, action_label: kwDisplayName,
                                  });
                                  const { count } = await supabase.from("keywords_progress").select("*", { count: "exact", head: true }).eq("user_id", userId);
                                  if (count !== null) {
                                    const { data: stats } = await supabase.from("profile_stats").select("username, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count").eq("user_id", userId).maybeSingle();
                                    await supabase.from("profile_stats").upsert({
                                      user_id: userId, username: stats?.username || actionUsername,
                                      keywords_mastered_count: count,
                                      total_actions: (stats?.chapters_completed_count || 0) + (stats?.notes_created_count || 0) + (stats?.people_learned_count || 0) + (stats?.places_discovered_count || 0) + count,
                                      updated_at: new Date().toISOString(),
                                    }, { onConflict: "user_id" });
                                  }
                                }
                              } catch (err) { console.error("Error saving keyword progress:", err); }
                            })();
                          }}
                          className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            isCompleted ? "bg-green-100 text-green-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                          }`}
                          style={isAnimatingKeyword ? { transform: "scale(0.92)", opacity: 0.7 } : undefined}
                        >
                          {isCompleted ? `✓ ${selectedKeyword.name} learned` : `Mark ${selectedKeyword.name} as Learned`}
                        </button>
                      );
                    })()}
                  </div>
                )}
              </div>
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

      {/* ── Louis "learned" toast ──────────────────────────────────────────── */}
      {learnedToast && (
        <div
          className="fixed bottom-24 left-1/2 z-50 flex items-center gap-3 bg-white border border-green-200 rounded-2xl shadow-2xl px-4 py-3"
          style={{ transform: "translateX(-50%)", animation: "slideUp 0.3s ease-out" }}
        >
          <LouisAvatar mood="stareyes" size={44} />
          <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{learnedToast}</p>
        </div>
      )}

      {/* ── Books modal ───────────────────────────────────────────────────── */}
      {showBooksModal && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start justify-center overflow-y-auto p-4 py-8">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl p-6">
            <button
              type="button"
              onClick={() => { setShowBooksModal(false); setBooksModalSelectedBook(null); }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            >✕</button>

            {!booksModalSelectedBook ? (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select a Book</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_BIBLE_BOOKS_SORTED.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBooksModalSelectedBook(b)}
                      className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-800 text-left transition hover:bg-blue-50 hover:border-blue-300"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setBooksModalSelectedBook(null)}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >← Books</button>
                  <h2 className="text-xl font-bold text-gray-900">{booksModalSelectedBook}</h2>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: getBookTotalChapters(booksModalSelectedBook) }, (_, i) => i + 1).map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => {
                        setShowBooksModal(false);
                        setBooksModalSelectedBook(null);
                        router.push(`/Bible/${encodeURIComponent(booksModalSelectedBook)}/${ch}`);
                      }}
                      className="aspect-square rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-gray-800 transition hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center"
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

// Separate component to trigger confetti when modal mounts
function CongratsModalWithConfetti({
  levelInfo,
  withConfetti = true,
  onRequestClose,
  onOpenReview,
  onOpenTrivia,
  onOpenScrambled,
  onOpenReflection,
  reviewDone,
  triviaDone,
  scrambledDone,
}: {
  levelInfo?: {
    level: number;
    chaptersNeededForNext: number;
    nextLevel: number;
    leveledUp: boolean;
  };
  withConfetti?: boolean;
  onRequestClose?: () => void;
  onOpenReview?: () => void;
  onOpenTrivia?: () => void;
  onOpenScrambled?: () => void;
  onOpenReflection?: () => void;
  reviewDone?: boolean;
  triviaDone?: boolean;
  scrambledDone?: boolean;
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

  function closeModal() {
    setShowModal(false);
    onRequestClose?.();
  }

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

  // Chapter completion messages that drive the next step (Trivia).
  const motivationalMessages = [
    "Now that you read {chapterLabel}, let's test your understanding with a quick trivia quiz.",
    "Great job finishing {chapterLabel}. Want to take the trivia quiz for this chapter?",
    "You just finished {chapterLabel}. Ready to test what you remember with trivia?",
    "Nice work on {chapterLabel}. Let's lock it in with a quick trivia quiz.",
  ];

  // Calculate random message using props (instant, no async delay)
  const randomMessage = useMemo(() => {
    if (!levelInfo) {
      return "Great job — your consistency is paying off!";
    }
    const topLevel = LEVEL_DEFINITIONS[LEVEL_DEFINITIONS.length - 1]?.level ?? 20;
    if (levelInfo.level >= topLevel) {
      return "Great job — your consistency is paying off!";
    }
    const template = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    return template.replace("{chapterLabel}", `${bookDisplayName} ${chapter}`);
  }, [levelInfo]);

  // Trigger confetti when component mounts (only for the "just finished" moment).
  useEffect(() => {
    if (!withConfetti) {
      return;
    }

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
  }, [withConfetti]);

  const [modalUserId, setModalUserId] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<{
    notesReviewed: boolean;
    triviaDone: boolean;
    scrambledDone: boolean;
  }>({
    notesReviewed: false,
    triviaDone: false,
    scrambledDone: false,
  });
  const effectiveChecklist = {
    notesReviewed: reviewDone ?? checklist.notesReviewed,
    triviaDone: triviaDone ?? checklist.triviaDone,
    scrambledDone: scrambledDone ?? checklist.scrambledDone,
  };
  const [loadingChecklist, setLoadingChecklist] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      setModalUserId(data.user?.id ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const triviaBookKey = book.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
  const resolvedTriviaBookKey = triviaBookKey === "songofsolomon" ? "songofsongs" : triviaBookKey;
  const triviaRouteSlug =
    CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((entry) => entry.key === resolvedTriviaBookKey)?.routeSlug ?? resolvedTriviaBookKey;

  async function refreshChecklist() {
    if (!modalUserId) {
      return;
    }

    setLoadingChecklist(true);

    try {
      const chapterLabel = `${bookDisplayName} ${chapter}`;

      const [notesRes, triviaRes, scrambledRes] = await Promise.all([
        supabase
          .from("master_actions")
          .select("id")
          .eq("user_id", modalUserId)
          .eq("action_type", ACTION_TYPE.chapter_notes_reviewed)
          .eq("action_label", chapterLabel)
          .limit(1)
          .maybeSingle(),
        supabase
          .from("master_actions")
          .select("id")
          .eq("user_id", modalUserId)
          .eq("action_type", ACTION_TYPE.trivia_chapter_completed)
          .ilike("action_label", `${bookDisplayName} ${chapter}%`)
          .limit(1)
          .maybeSingle(),
        supabase
          .from("master_actions")
          .select("id")
          .eq("user_id", modalUserId)
          .eq("action_type", ACTION_TYPE.scrambled_chapter_completed)
          .ilike("action_label", `${bookDisplayName} ${chapter}%`)
          .limit(1)
          .maybeSingle(),
      ]);

      setChecklist({
        notesReviewed: !!notesRes.data,
        triviaDone: !!triviaRes.data,
        scrambledDone: !!scrambledRes.data,
      });
    } finally {
      setLoadingChecklist(false);
    }
  }

  useEffect(() => {
    if (!showModal || !modalUserId) {
      return;
    }

    void refreshChecklist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, modalUserId, bookDisplayName, chapter]);

  function handleContinueToNextChapter() {
    onOpenTrivia?.();
    closeModal();
  }

  function handleReadNotes() {
    onOpenReview?.();
    closeModal();
  }

  function handlePlayScrambled() {
    onOpenScrambled?.();
    closeModal();
  }

  function handleOpenReflection() {
    onOpenReflection?.();
    closeModal();
  }

  function handleTakeNotes() {
    router.push(`/notes?book=${book}&chapter=${chapter}`);
    closeModal();
  }

  function handleGoHome() {
    router.push("/dashboard");
    closeModal();
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
            onClick={closeModal}
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
                Congratulations! You just finished {bookDisplayName} {chapter}!
              </h1>
              <p className="text-base md:text-lg text-gray-700 mt-3 text-center">
                {levelInfo ? randomMessage : `Now that you read ${bookDisplayName} ${chapter}, let's test your understanding with a quick trivia quiz.`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mb-6">
              <div className="mx-auto max-w-2xl rounded-3xl border border-blue-100 bg-white/80 p-4 md:p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Next Steps (Earn Points)
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  Pick any of these to lock in what you just read. Each one moves your level forward.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={handleReadNotes}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                      effectiveChecklist.notesReviewed
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-bold text-gray-900">
                          Review {bookDisplayName} {chapter} Notes
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          Quick recap so you know what you just read meant.
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                          +2 pts
                        </span>
                        <span className={`text-xs font-semibold ${effectiveChecklist.notesReviewed ? "text-emerald-700" : "text-gray-500"}`}>
                          {effectiveChecklist.notesReviewed ? "Completed" : "Not done"}
                        </span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleContinueToNextChapter}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                      effectiveChecklist.triviaDone
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-bold text-gray-900">Take the Trivia Quiz</p>
                        <p className="mt-1 text-sm text-gray-700">
                          Earn up to 5 points based on how many you get right.
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                          Up to +5
                        </span>
                        <span className={`text-xs font-semibold ${effectiveChecklist.triviaDone ? "text-emerald-700" : "text-gray-500"}`}>
                          {effectiveChecklist.triviaDone ? "Completed" : "Not done"}
                        </span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlayScrambled}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                      effectiveChecklist.scrambledDone
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-bold text-gray-900">Play Scrambled</p>
                        <p className="mt-1 text-sm text-gray-700">
                          Earn up to 5 points by solving the chapter words.
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                          Up to +5
                        </span>
                        <span className={`text-xs font-semibold ${effectiveChecklist.scrambledDone ? "text-emerald-700" : "text-gray-500"}`}>
                          {effectiveChecklist.scrambledDone ? "Completed" : "Not done"}
                        </span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenReflection}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-bold text-gray-900">Post a Reflection</p>
                        <p className="mt-1 text-sm text-gray-700">
                          Scroll to this chapter's reflection question and answer it below.
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                          Open
                        </span>
                      </div>
                    </div>
                  </button>
                </div>

                {loadingChecklist ? (
                  <p className="mt-3 text-xs text-gray-500">Checking your progress...</p>
                ) : null}
              </div>
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
  const levelDefinition = LEVEL_DEFINITIONS.find((definition) => definition.level === level);

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
          {levelDefinition ? (
            <p className="text-2xl md:text-3xl font-semibold text-white">
              {levelDefinition.levelName}
            </p>
          ) : null}
          <div className="text-2xl md:text-3xl font-semibold text-blue-300 animate-pulse">
            {levelDefinition?.identityText ?? "Amazing progress!"}
          </div>
        </div>
      </div>
    </div>
  );
}




