"use client";

import { useState, useEffect, useRef, useMemo, type ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import { enrichPlainText } from "../lib/bibleHighlighting";
import { ACTION_TYPE } from "../lib/actionTypes";
import { ensureBibleEntityLearned } from "../lib/bibleEntityProgress";
import { resolveBibleReference } from "../lib/bibleTermResolver";
import { consumeCreditAction } from "../lib/creditClient";
import { findKeywordNotes, findPersonNotes, findPlaceNotes, getKeywordPopupNotes, getPersonPopupNotes, getPlacePopupNotes, saveKeywordNotes, savePersonNotes, savePlaceNotes } from "../lib/bibleNotes";
import { getTriviaBook, getTriviaChapter } from "../lib/triviaGameData";
import { getScrambledBook, getScrambledChapter } from "../lib/scrambledGameData";
import CreditLimitModal from "./CreditLimitModal";
import ChapterNotesMarkdown from "./ChapterNotesMarkdown";
import { LouisAvatar } from "./LouisAvatar";
import CommentSection from "./comments/CommentSection";
import TriviaGamePlayer from "./TriviaGamePlayer";
import ScrambledGamePlayer from "./ScrambledGamePlayer";

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
  devotionalId?: string | null;
  devotionalTitle?: string | null;
  day: DevotionalDay;
  dayProgress: DayProgress | undefined;
  showCreditBlocked: boolean;
  onClose: () => void;
  onBibleReadingClick: (book: string, chapter: number) => void;
  onReadingComplete: () => void;
  onReflectionSave: (text: string) => void;
  onIntroComplete?: () => void;
  onDayComplete: (reflectionText: string, readingCompleted: boolean) => void; // Called with current modal state values
}

type DevotionalContentBlock =
  | { kind: "heading"; key: string; level: 1 | 2; html: string }
  | { kind: "paragraph"; key: string; html: string }
  | { kind: "quote"; key: string; html: string }
  | { kind: "list"; key: string; items: string[] }
  | { kind: "divider"; key: string };

function stripInlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^#+\s*/, "")
    .trim();
}

function normalizeBookKey(book: string) {
  const rawBookKey = book.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
  return rawBookKey === "songofsolomon" ? "songofsongs" : rawBookKey;
}

function StudySectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4 text-left">
        {eyebrow ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#4f8fb7]">{eyebrow}</p>
        ) : null}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div className="px-5 py-5">{children}</div>
    </section>
  );
}

function parseDevotionalContent(text: string, dayNumber: number): DevotionalContentBlock[] {
  if (!text) return [];

  return text
    .split(/\n\s*\n/)
    .map((rawBlock, idx): DevotionalContentBlock | null => {
      const block = rawBlock.trim();
      if (!block) return null;
      const key = `${dayNumber}-${idx}`;

      if (/^-{3,}$/.test(block)) return { kind: "divider", key };

      const headingMatch = block.match(/^(#{1,2})\s+(.+)$/);
      if (headingMatch) {
        return {
          kind: "heading",
          key,
          level: headingMatch[1].length === 1 ? 1 : 2,
          html: enrichPlainText(stripInlineMarkdown(headingMatch[2])),
        };
      }

      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const isList = lines.length > 0 && lines.every((line) => /^[-*]\s+/.test(line));
      if (isList) {
        return {
          kind: "list",
          key,
          items: lines.map((line) => enrichPlainText(stripInlineMarkdown(line.replace(/^[-*]\s+/, "")))),
        };
      }

      const isQuote = lines.length > 0 && lines.every((line) => line.startsWith(">"));
      if (isQuote) {
        return {
          kind: "quote",
          key,
          html: enrichPlainText(stripInlineMarkdown(lines.map((line) => line.replace(/^>\s?/, "")).join(" "))),
        };
      }

      return {
        kind: "paragraph",
        key,
        html: enrichPlainText(stripInlineMarkdown(block.replace(/\n/g, " "))),
      };
    })
    .filter((block): block is DevotionalContentBlock => Boolean(block));
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
  devotionalId,
  devotionalTitle,
  day,
  dayProgress,
  showCreditBlocked,
  onClose,
  onBibleReadingClick,
  onReadingComplete,
  onReflectionSave,
  onIntroComplete,
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
  const [introCompleted, setIntroCompleted] = useState(dayProgress?.is_completed || false);
  const [reflectionText, setReflectionText] = useState(dayProgress?.reflection_text || "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showChapterNotesModal, setShowChapterNotesModal] = useState(false);
  const [chapterNotesText, setChapterNotesText] = useState("");
  const [chapterNotesLoading, setChapterNotesLoading] = useState(false);
  const [chapterNotesError, setChapterNotesError] = useState<string | null>(null);
  const [showTriviaModal, setShowTriviaModal] = useState(false);
  const [showScrambledModal, setShowScrambledModal] = useState(false);
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
  const primaryDayLabel =
    day.bible_reading_book && day.bible_reading_chapter
      ? `${day.bible_reading_book} ${day.bible_reading_chapter}`
      : `Day ${day.day_number}`;
  const isWisdomOfProverbs =
    (devotionalTitle || "").toLowerCase().includes("wisdom of proverbs") ||
    (devotionalId || "").toLowerCase().includes("wisdom-of-proverbs") ||
    (day.bible_reading_book || "").toLowerCase().trim() === "proverbs";
  const isTestingOfJoseph =
    (devotionalTitle || "").toLowerCase().includes("testing of joseph") ||
    (devotionalId || "").toLowerCase().includes("testing-of-joseph");
  const useSeriesLikeProverbsLayout = isWisdomOfProverbs || isTestingOfJoseph;
  const chapterLabel = `${day.bible_reading_book} ${day.bible_reading_chapter}`;
  const bookKey = normalizeBookKey(day.bible_reading_book || "");
  const triviaBook = useMemo(() => getTriviaBook(bookKey), [bookKey]);
  const triviaChapter = useMemo(
    () => getTriviaChapter(bookKey, day.bible_reading_chapter),
    [bookKey, day.bible_reading_chapter]
  );
  const scrambledBook = useMemo(() => getScrambledBook(bookKey), [bookKey]);
  const scrambledChapter = useMemo(
    () => getScrambledChapter(bookKey, day.bible_reading_chapter),
    [bookKey, day.bible_reading_chapter]
  );
  const chapterDiscussionSlug =
    day.bible_reading_book && day.bible_reading_chapter
      ? `bible-chapter-${day.bible_reading_book.toLowerCase().replace(/\s+/g, "-")}-${day.bible_reading_chapter}`
      : `devotional-${devotionalId || "study"}-day-${day.day_number}`;

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
    setIntroCompleted(dayProgress?.is_completed || false);
    setReflectionText(dayProgress?.reflection_text || "");
    setHasUnsavedChanges(false);
  }, [dayProgress]);

  const devotionalBlocks = useMemo(
    () => parseDevotionalContent(day.devotional_text || "", day.day_number),
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

  const handleIntroComplete = () => {
    setIntroCompleted(true);
    if (onIntroComplete) {
      onIntroComplete();
    }
  };

  async function handleOpenChapterNotes() {
    if (!day.bible_reading_book || !day.bible_reading_chapter) return;

    setShowChapterNotesModal(true);
    setChapterNotesLoading(true);
    setChapterNotesError(null);

    const reviewOpenedLabel = `${chapterLabel} Review Opened`;

    try {
      if (userId) {
        await supabase.from("master_actions").insert({
          user_id: userId,
          username,
          action_type: ACTION_TYPE.chapter_notes_viewed,
          action_label: reviewOpenedLabel,
        });

        const { data: existingReviewed } = await supabase
          .from("master_actions")
          .select("id")
          .eq("user_id", userId)
          .eq("action_type", ACTION_TYPE.chapter_notes_reviewed)
          .eq("action_label", reviewOpenedLabel)
          .limit(1)
          .maybeSingle();

        if (!existingReviewed) {
          const { error: reviewedError } = await supabase.from("master_actions").insert({
            user_id: userId,
            username,
            action_type: ACTION_TYPE.chapter_notes_reviewed,
            action_label: reviewOpenedLabel,
          });
          if (!reviewedError) triggerPoints(5);
        }
      }

      const { data, error } = await supabase
        .from("bible_notes")
        .select("notes_text")
        .eq("book", day.bible_reading_book.toLowerCase().trim())
        .eq("chapter", day.bible_reading_chapter)
        .maybeSingle();

      if (error) throw error;
      setChapterNotesText(data?.notes_text || "No notes are available for this chapter yet.");
    } catch (error: any) {
      setChapterNotesError(error?.message || "Could not load the chapter notes.");
    } finally {
      setChapterNotesLoading(false);
    }
  }

  const handleClose = () => {
    if (useSeriesLikeProverbsLayout && !introCompleted) {
      handleIntroComplete();
    }

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
            title="Close"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⭐</span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{primaryDayLabel}</h1>
          </div>
          {!useSeriesLikeProverbsLayout ? (
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 ml-11">{day.day_title}</h2>
          ) : null}
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
          {showCreditBlocked ? null : (
            <>
              {useSeriesLikeProverbsLayout ? (
                <>
                  <StudySectionCard title="Bible Study Intro" eyebrow="Task 1">
                    <h2 className="mb-5 text-2xl font-black leading-tight text-gray-950">{day.day_title}</h2>
                    <div ref={devotionalTextRef} className="text-gray-700" style={{ fontSize: "1rem" }}>
                      {devotionalBlocks.map((block) => {
                        if (block.kind === "divider") {
                          return <hr key={block.key} className="my-6 border-gray-200" />;
                        }

                        if (block.kind === "heading") {
                          const className =
                            block.level === 1
                              ? "mb-3 mt-6 text-2xl font-black leading-tight tracking-normal text-gray-950 first:mt-0"
                              : "mb-3 mt-7 border-b border-gray-200 pb-2 text-xl font-black leading-tight tracking-normal text-gray-950";
                          const HeadingTag = block.level === 1 ? "h2" : "h3";
                          return (
                            <HeadingTag
                              key={block.key}
                              className={className}
                              dangerouslySetInnerHTML={{ __html: block.html }}
                            />
                          );
                        }

                        if (block.kind === "quote") {
                          return (
                            <blockquote
                              key={block.key}
                              className="my-5 rounded-xl border-l-4 border-[#7BAFD4] bg-[#eef6fd] px-4 py-3 text-base font-semibold leading-relaxed text-gray-900"
                              dangerouslySetInnerHTML={{ __html: block.html }}
                            />
                          );
                        }

                        if (block.kind === "list") {
                          return (
                            <ul key={block.key} className="mb-5 ml-5 list-disc space-y-2 leading-relaxed text-gray-800">
                              {block.items.map((item, index) => (
                                <li key={`${block.key}-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
                              ))}
                            </ul>
                          );
                        }

                        return (
                          <p
                            key={block.key}
                            className="mb-4 leading-relaxed text-gray-800"
                            dangerouslySetInnerHTML={{ __html: block.html }}
                          />
                        );
                      })}
                    </div>
                  </StudySectionCard>

                  <StudySectionCard title={`Read "${chapterLabel}"`} eyebrow="Task 2">
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => onBibleReadingClick(day.bible_reading_book, day.bible_reading_chapter)}
                        className={`rounded-xl px-6 py-3 text-sm font-bold transition shadow-sm hover:opacity-90 ${
                          readingChecked ? "bg-emerald-100 text-emerald-700" : "text-slate-950"
                        }`}
                        style={readingChecked ? undefined : { backgroundColor: "#7BAFD4" }}
                      >
                        {readingChecked ? `✓ Read ${chapterLabel}` : `Read ${chapterLabel}`}
                      </button>
                    </div>
                  </StudySectionCard>

                  <StudySectionCard title="Chapter Notes" eyebrow="Task 3">
                    <div className="text-center">
                      <p className="mx-auto mb-4 max-w-md text-sm leading-relaxed text-gray-600">
                        Open the {chapterLabel} notes when you are ready to go deeper into the chapter.
                      </p>
                      <button
                        type="button"
                        onClick={() => void handleOpenChapterNotes()}
                        className="rounded-xl px-6 py-3 text-sm font-bold text-slate-950 transition hover:opacity-90"
                        style={{ backgroundColor: "#7BAFD4" }}
                      >
                        Open Chapter Notes
                      </button>
                    </div>
                  </StudySectionCard>

                  <StudySectionCard title="Trivia" eyebrow="Task 4">
                    <div className="text-center">
                      <p className="mx-auto mb-4 max-w-md text-sm leading-relaxed text-gray-600">
                        Test what is sticking from {chapterLabel} with a short trivia round.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowTriviaModal(true)}
                        disabled={!triviaBook || !triviaChapter}
                        className="rounded-xl px-6 py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{ backgroundColor: triviaBook && triviaChapter ? "#7BAFD4" : "#cbd5e1" }}
                      >
                        {triviaBook && triviaChapter ? "Start Trivia" : "Trivia Coming Soon"}
                      </button>
                    </div>
                  </StudySectionCard>

                  <StudySectionCard title="Scrambled" eyebrow="Task 5">
                    <div className="text-center">
                      <p className="mx-auto mb-4 max-w-md text-sm leading-relaxed text-gray-600">
                        Slow down with key words from {chapterLabel} and lock them into memory.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowScrambledModal(true)}
                        disabled={!scrambledBook || !scrambledChapter}
                        className="rounded-xl px-6 py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{ backgroundColor: scrambledBook && scrambledChapter ? "#7BAFD4" : "#cbd5e1" }}
                      >
                        {scrambledBook && scrambledChapter ? "Play Scrambled" : "Scrambled Coming Soon"}
                      </button>
                    </div>
                  </StudySectionCard>

                  <StudySectionCard title="Reflection" eyebrow="Task 6">
                    <p className="mb-4 text-xl font-black leading-snug text-gray-950">
                      {day.reflection_question || `What stood out to you most in ${primaryDayLabel}?`}
                    </p>
                    <CommentSection
                      articleSlug={chapterDiscussionSlug}
                      headingText=""
                      placeholderText="Start Typing Here"
                      submitButtonText="Post Reflection"
                      variant="plain"
                    />
                  </StudySectionCard>
                </>
              ) : (
                <>
              {/* DEVOTIONAL CONTENT SECTION */}
              <div className="mb-8" ref={devotionalTextRef}>
                <div className="text-gray-700" style={{ fontSize: '1rem' }}>
                  {devotionalBlocks.map((block) => {
                    if (block.kind === "divider") {
                      return <hr key={block.key} className="my-6 border-gray-200" />;
                    }

                    if (block.kind === "heading") {
                      const className =
                        block.level === 1
                          ? "mb-3 mt-6 text-2xl font-black leading-tight tracking-normal text-gray-950 first:mt-0"
                          : "mb-3 mt-7 border-b border-gray-200 pb-2 text-xl font-black leading-tight tracking-normal text-gray-950";
                      const HeadingTag = block.level === 1 ? "h2" : "h3";
                      return (
                        <HeadingTag
                          key={block.key}
                          className={className}
                          dangerouslySetInnerHTML={{ __html: block.html }}
                        />
                      );
                    }

                    if (block.kind === "quote") {
                      return (
                        <blockquote
                          key={block.key}
                          className="my-5 rounded-xl border-l-4 border-[#7BAFD4] bg-[#eef6fd] px-4 py-3 text-base font-semibold leading-relaxed text-gray-900"
                          dangerouslySetInnerHTML={{ __html: block.html }}
                        />
                      );
                    }

                    if (block.kind === "list") {
                      return (
                        <ul key={block.key} className="mb-5 ml-5 list-disc space-y-2 leading-relaxed text-gray-800">
                          {block.items.map((item, index) => (
                            <li key={`${block.key}-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p
                        key={block.key}
                        className="mb-4 leading-relaxed text-gray-800"
                        dangerouslySetInnerHTML={{ __html: block.html }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* BIBLE READING SECTION */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className={`${isWisdomOfProverbs ? "text-2xl md:text-3xl" : "text-lg md:text-xl"} font-bold text-gray-900 mb-4`}>
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
              {isWisdomOfProverbs ? (
                <div className="mb-6">
                  <p className="mb-4 text-xl font-black leading-snug text-gray-950">
                    {day.reflection_question || `What stood out to you most in ${primaryDayLabel}?`}
                  </p>
                  <CommentSection
                    articleSlug={chapterDiscussionSlug}
                    headingText=""
                    placeholderText="Start Typing Here"
                    submitButtonText="Post Reflection"
                    variant="plain"
                  />
                </div>
              ) : day.reflection_question ? (
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
              ) : null}
                </>
              )}
            </>
          )}
        </div>

        {/* ACTION BUTTONS - Fixed at bottom */}
        {!useSeriesLikeProverbsLayout ? (
        <div className="flex-shrink-0 px-6 sm:px-8 py-4 border-t border-gray-200 bg-gray-50 flex justify-center">
          <button
            type="button"
            onClick={handleMarkComplete}
            className="w-full max-w-sm px-6 py-3 rounded-lg font-semibold text-slate-950 transition shadow-sm"
            style={{ backgroundColor: "#7BAFD4" }}
          >
            ✓ Mark Day as Complete
          </button>
        </div>
        ) : null}
      </div>

      {showChapterNotesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4"
          onClick={() => setShowChapterNotesModal(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[86vh] overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f8fb7]">Chapter Notes</p>
                <h2 className="text-lg font-bold text-gray-900">{chapterLabel} Study Notes</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowChapterNotesModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                aria-label="Close notes"
              >
                x
              </button>
            </div>
            <div className="max-h-[74vh] overflow-y-auto px-6 py-5">
              {chapterNotesLoading ? (
                <p className="py-10 text-center text-sm text-gray-500">Loading notes...</p>
              ) : chapterNotesError ? (
                <p className="py-10 text-center text-sm text-red-500">{chapterNotesError}</p>
              ) : (
                <ChapterNotesMarkdown>{chapterNotesText}</ChapterNotesMarkdown>
              )}
            </div>
          </div>
        </div>
      )}

      {showTriviaModal && triviaBook && triviaChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4">
          <div className="my-6 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <TriviaGamePlayer
              bookName={triviaBook.name}
              bookSlug={triviaBook.routeSlug}
              chapter={triviaChapter}
              onClose={() => setShowTriviaModal(false)}
            />
          </div>
        </div>
      )}

      {showScrambledModal && scrambledBook && scrambledChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4">
          <div className="my-6 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <ScrambledGamePlayer
              bookName={scrambledBook.name}
              bookSlug={scrambledBook.slug}
              chapter={scrambledChapter}
              onClose={() => setShowScrambledModal(false)}
            />
          </div>
        </div>
      )}

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
