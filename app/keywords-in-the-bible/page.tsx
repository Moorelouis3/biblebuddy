"use client";

export const dynamic = "force-dynamic";

import { Suspense, useState, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../lib/supabaseClient";
import { BIBLE_KEYWORDS_LIST } from "../../lib/bibleKeywordsList";
import { logStudyView } from "../../lib/studyViewLimit";
import { ACTION_TYPE } from "../../lib/actionTypes";
import { consumeCreditAction } from "../../lib/creditClient";
import { requestLouisNotes } from "../../lib/requestLouisNotes";
import { triggerPoints } from "../../components/PointsPop";
import CreditLimitModal from "../../components/CreditLimitModal";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type BibleKeyword = {
  id: string;
  name: string;
  normalized_name: string;
};

// Convert names to BibleKeyword objects
function createStaticKeywords(): BibleKeyword[] {
  const seen = new Set<string>();
  const result: BibleKeyword[] = [];

  BIBLE_KEYWORDS_LIST.forEach((keywordEntry, index) => {
    const term = (keywordEntry.term || "").trim();
    if (!term) return;
    const normalized = term.toLowerCase();
    if (seen.has(normalized)) return;
    seen.add(normalized);

    result.push({
      id: `static-${index}-${normalized.replace(/[^a-z0-9]/g, "-")}`,
      name: term,
      normalized_name: normalized,
    });
  });

  return result;
}

function normalizeKeywordMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function KeywordsInTheBiblePageContent() {
  function extractCompactKeywordMeaning(markdown: string): string {
    const normalized = normalizeKeywordMarkdown(markdown);
    const sections = normalized.split(/\n(?=# )/).map((section) => section.trim()).filter(Boolean);
    const preferred =
      sections.find((section) => /^# .*what this keyword means/i.test(section)) ||
      sections.find((section) => /^# .*what this/i.test(section)) ||
      sections[0] ||
      normalized;

    const withoutHeader = preferred.replace(/^#\s+[^\n]+\n*/i, "").trim();
    return `# 📖 What This Keyword Means\n\n${withoutHeader}`;
  }

  function isLegacyKeywordNotes(markdown: string): boolean {
    const normalized = normalizeKeywordMarkdown(markdown);
    const headerMatches = normalized.match(/^# /gm) || [];
    return (
      headerMatches.length > 1 ||
      /where it appears|key verses|where you find|why this keyword matters/i.test(normalized) ||
      normalized.length > 420
    );
  }

  function buildKeywordPrompt(keyword: string): string {
    return `You are Little Louis.

Generate a short Bible explanation for the keyword "${keyword}".

Return markdown with exactly this structure:

# 📖 What This Keyword Means

Then write only 2 to 5 warm, beginner friendly sentences in 1 to 3 short paragraphs.

Rules:
- Explain only the meaning
- No extra sections
- No bullet points
- No key verses
- No where it appears section
- No applications list
- Keep it under 120 words
- Sound clear simple and pastoral`;
  }

  function buildQuickKeywordFallback(keyword: string): string {
    return `# 📖 What This Keyword Means

${keyword} is an important Bible word or idea in Scripture. Louis is still getting the full meaning ready.`;
  }

  const router = useRouter();
  const searchParams = useSearchParams();
  const [keywords] = useState<BibleKeyword[]>(createStaticKeywords());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<BibleKeyword | null>(null);
  const selectedKeywordNameRef = useRef<string | null>(null);
  const generatingKeywordNotesRef = useRef<Set<string>>(new Set());
  const [keywordNotes, setKeywordNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [keywordCreditBlocked, setKeywordCreditBlocked] = useState(false);
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewedKeywords, setViewedKeywords] = useState<Set<string>>(new Set());

  // Handle keyword selection with study view limit check
  const handleKeywordClick = async (keyword: BibleKeyword) => {
    if (!userId) {
      setSelectedKeyword(keyword);
      return;
    }

    console.log("[KEYWORDS_PAGE] Keyword clicked:", keyword.name);

    // Log study view for analytics (no restrictions)
    const insertSuccess = await logStudyView(userId, username, "keyword");
    if (!insertSuccess) {
      console.error("[KEYWORDS_PAGE] Failed to log study_view, but allowing access anyway");
    }

    setSelectedKeyword(keyword);
  };

  useEffect(() => {
    const requestedKeyword = searchParams.get("keyword")?.trim().toLowerCase();
    if (!requestedKeyword) return;

    const matchedKeyword = keywords.find((keyword) => keyword.name.toLowerCase() === requestedKeyword);
    if (!matchedKeyword) return;

    setSearchQuery(matchedKeyword.name);
    setSelectedLetter(null);
    setSelectedKeyword(matchedKeyword);
  }, [keywords, searchParams]);

  useEffect(() => {
    selectedKeywordNameRef.current = selectedKeyword?.name.toLowerCase().trim() || null;
  }, [selectedKeyword]);

  useEffect(() => {
    if (!loadingNotes || keywordNotes || !selectedKeyword) {
      if (!loadingNotes) setGenerationProgress(0);
      return;
    }

    setGenerationProgress(7);
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 95) return prev;
        if (prev < 25) return prev + 10;
        if (prev < 50) return prev + 7;
        if (prev < 75) return prev + 4;
        return prev + 2;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [loadingNotes, keywordNotes, selectedKeyword]);

  // Filter and sort keywords
  const filteredKeywords = useMemo(() => {
    let filtered = keywords;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (keyword) =>
          keyword.name.toLowerCase().includes(query) ||
          keyword.normalized_name.includes(query)
      );
    }

    // Filter by selected letter
    if (selectedLetter) {
      filtered = filtered.filter((keyword) =>
        keyword.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    // Sort alphabetically
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [keywords, searchQuery, selectedLetter]);

  // Group keywords by first letter for alphabet index
  const keywordsByLetter = useMemo(() => {
    const grouped: Record<string, BibleKeyword[]> = {};
    keywords.forEach((keyword) => {
      const firstLetter = keyword.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(keyword);
    });
    return grouped;
  }, [keywords]);

  // Load user ID and completion state
  useEffect(() => {
    async function loadUserAndProgress() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoadingProgress(false);
          return;
        }

        setUserId(user.id);

        // Extract username from user metadata (same pattern as dashboard)
        const meta: any = user.user_metadata || {};
        const extractedUsername =
          meta.firstName ||
          meta.first_name ||
          (user.email ? user.email.split("@")[0] : null) ||
          "User";
        setUsername(extractedUsername);

        // Fetch all completed keywords for this user (batch query)
        const { data, error } = await supabase
          .from("keywords_progress")
          .select("keyword_name")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error loading keywords progress:", error);
        } else {
          const completedSet = new Set<string>();
          data?.forEach((row) => {
            // Store normalized name (lowercase, trimmed) for matching
            const normalized = row.keyword_name.toLowerCase().trim();
            completedSet.add(normalized);
          });
          setCompletedKeywords(completedSet);
        }
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setLoadingProgress(false);
      }
    }

    loadUserAndProgress();
  }, []);

  // Generate notes when a keyword is selected
  useEffect(() => {
    if (!selectedKeyword) {
      setKeywordNotes(null);
      setKeywordCreditBlocked(false);
      return;
    }

    if (userId && loadingProgress) {
      setLoadingNotes(true);
      setNotesError(null);
      setKeywordNotes(null);
      setKeywordCreditBlocked(false);
      return;
    }

    async function generateNotes() {
      try {
        setLoadingNotes(true);
        setNotesError(null);
        setKeywordNotes(null);
        setKeywordCreditBlocked(false);

        const keyword = selectedKeyword;
        if (!keyword) {
          return;
        }

        // Normalize: lowercase, trim
        const keywordKey = keyword.name.toLowerCase().trim();

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

        // STEP 1: Check database FIRST (mandatory short-circuit)
        const generateAndStoreKeywordNotes = async (updateVisible: boolean) => {
          if (generatingKeywordNotesRef.current.has(keywordKey)) return;
          generatingKeywordNotesRef.current.add(keywordKey);

          try {
            const generated = await requestLouisNotes(buildKeywordPrompt(selectedKeyword.name));
            const compactGenerated = extractCompactKeywordMeaning(generated);

            const { error: upsertError } = await supabase
              .from("keywords_in_the_bible")
              .upsert(
                {
                  keyword: keywordKey,
                  notes_text: compactGenerated,
                },
                {
                  onConflict: "keyword",
                }
              );

            if (upsertError) {
              console.error("[keywords_in_the_bible] Error upserting notes to keywords_in_the_bible:", upsertError);
            }

            if (updateVisible && selectedKeywordNameRef.current === keywordKey) {
              setGenerationProgress(100);
              setKeywordNotes(compactGenerated);
              setNotesError(null);
              setLoadingNotes(false);
            }
          } catch (backgroundError: any) {
            console.error("Error generating keyword notes in background:", backgroundError);
            if (selectedKeywordNameRef.current === keywordKey) {
              setNotesError("Louis could not explain this keyword right now. Please try again.");
              setLoadingNotes(false);
            }
          } finally {
            generatingKeywordNotesRef.current.delete(keywordKey);
          }
        };

        const { data: existing, error: existingError } = await supabase
          .from("keywords_in_the_bible")
          .select("notes_text")
          .eq("keyword", keywordKey)
          .maybeSingle();

        if (existingError && existingError.code !== 'PGRST116') {
          console.error("[keywords_in_the_bible] Error checking keywords_in_the_bible:", existingError);
        }

        // MANDATORY SHORT-CIRCUIT: If notes exist, return immediately
        // DO NOT continue to generation - this prevents duplicate ChatGPT calls
        if (existing?.notes_text && existing.notes_text.trim().length > 0) {
          console.log(`[keywords_in_the_bible] Found existing notes for ${selectedKeyword?.name ?? "this keyword"}, returning immediately (ChatGPT will NOT be called)`);
          setKeywordNotes(extractCompactKeywordMeaning(existing.notes_text));
          setLoadingNotes(false);
          if (isLegacyKeywordNotes(existing.notes_text)) {
            void generateAndStoreKeywordNotes(false);
          }
          return;
        }

        setKeywordNotes(null);
        setGenerationProgress(7);
        void generateAndStoreKeywordNotes(true);
        return;

        // GUARANTEE: If we reach here, notes do NOT exist in database
        // This is the ONLY path where ChatGPT should be called
        let notesText = "";

        // STEP 2: Generate notes using ChatGPT
        const prompt = `You are Little Louis.

Generate beginner friendly Bible notes about the KEYWORD: ${selectedKeyword?.name ?? "this keyword"}.

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

        notesText = buildQuickKeywordFallback(selectedKeyword?.name ?? "this keyword");
        setKeywordNotes(notesText);
        setLoadingNotes(false);

        if (!generatingKeywordNotesRef.current.has(keywordKey)) {
          generatingKeywordNotesRef.current.add(keywordKey);

          void (async () => {
            try {
              const generated = await requestLouisNotes(prompt);

              const { data: existingCheck, error: checkError } = await supabase
                .from("keywords_in_the_bible")
                .select("notes_text")
                .eq("keyword", keywordKey)
                .maybeSingle();

              if (checkError && checkError.code !== "PGRST116") {
                console.error("[keywords_in_the_bible] Error checking for duplicates:", checkError);
              }

              let fullNotesText = generated;

              if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
                fullNotesText = existingCheck.notes_text;
              } else {
                const { error: upsertError } = await supabase
                  .from("keywords_in_the_bible")
                  .upsert(
                    {
                      keyword: keywordKey,
                      notes_text: generated,
                    },
                    {
                      onConflict: "keyword",
                    }
                  );

                if (upsertError) {
                  console.error("[keywords_in_the_bible] Error upserting notes to keywords_in_the_bible:", upsertError);
                } else {
                  const { data: savedData, error: readError } = await supabase
                    .from("keywords_in_the_bible")
                    .select("notes_text")
                    .eq("keyword", keywordKey)
                    .maybeSingle();

                  if (readError) {
                    console.error("[keywords_in_the_bible] Error re-reading notes:", readError);
                  } else if (savedData?.notes_text) {
                    fullNotesText = savedData.notes_text;
                  }
                }
              }

              if (selectedKeywordNameRef.current === keywordKey) {
                setKeywordNotes(fullNotesText);
                setNotesError(null);
              }
            } catch (backgroundError: any) {
              console.error("Error generating keyword notes in background:", backgroundError);
            } finally {
              generatingKeywordNotesRef.current.delete(keywordKey);
            }
          })();
        }
      } catch (err: any) {
        console.error("Error loading or generating notes:", err);
        setNotesError(err?.message || "Failed to load notes");
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedKeyword, userId, loadingProgress, completedKeywords, viewedKeywords]);

  // Mark keyword as complete (called automatically when notes load)
  const markKeywordAsComplete = async () => {
    if (!userId || !selectedKeyword) return;
    const keywordNameKey = selectedKeyword.name.toLowerCase().trim();
    if (completedKeywords.has(keywordNameKey)) return;

    try {
      const { error } = await supabase
        .from("keywords_progress")
        .upsert({ user_id: userId, keyword_name: keywordNameKey }, { onConflict: "user_id,keyword_name" });
      if (error) { console.error("Error auto-marking keyword:", error); return; }

      const { data: { user: authUser } } = await supabase.auth.getUser();
      let actionUsername = "User";
      if (authUser) {
        const meta: any = authUser.user_metadata || {};
        actionUsername = meta.firstName || meta.first_name || (authUser.email ? authUser.email.split("@")[0] : null) || "User";
      }
      const keywordDisplayName = selectedKeyword.name.split(" ").map((w: string) => /^\d+$/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
      await supabase.from("master_actions").insert({ user_id: userId, username: actionUsername, action_type: ACTION_TYPE.keyword_mastered, action_label: keywordDisplayName });

      const { count } = await supabase.from("keywords_progress").select("*", { count: "exact", head: true }).eq("user_id", userId);
      const { data: currentStats } = await supabase.from("profile_stats").select("username, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count").eq("user_id", userId).maybeSingle();
      const finalUsername = currentStats?.username || username || "User";
      const totalActions = (currentStats?.chapters_completed_count || 0) + (currentStats?.notes_created_count || 0) + (currentStats?.people_learned_count || 0) + (currentStats?.places_discovered_count || 0) + (count || 0);
      await supabase.from("profile_stats").upsert({ user_id: userId, username: finalUsername, keywords_mastered_count: count || 0, total_actions: totalActions, updated_at: new Date().toISOString() }, { onConflict: "user_id" });

      setCompletedKeywords((prev) => { const next = new Set(prev); next.add(keywordNameKey); return next; });
    } catch (err) {
      console.error("Error auto-marking keyword:", err);
    }
  };

  // Auto-mark keyword as complete when notes finish loading
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (keywordNotes && userId && selectedKeyword) { markKeywordAsComplete(); } }, [keywordNotes]);

  // Scroll to letter section
  const scrollToLetter = (letter: string) => {
    setSelectedLetter(letter);
    setSearchQuery(""); // Clear search when selecting a letter
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLetter(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* HEADER */}
      <header className="w-full pt-4 pb-4 border-b border-gray-200 bg-white/60 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Keywords in the Bible</h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Important words and ideas to understand while reading Scripture
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
          {/* SEARCH BAR */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for a keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLetter(null); // Clear letter filter when searching
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-6">
            {/* ALPHABET INDEX (LEFT SIDE) */}
            <div className="hidden md:block w-12 flex-shrink-0">
              <div className="sticky top-4 space-y-1">
                {ALPHABET.map((letter) => {
                  const hasKeywords = keywordsByLetter[letter] && keywordsByLetter[letter].length > 0;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => scrollToLetter(letter)}
                      className={`w-full py-1 text-xs text-center rounded transition ${
                        selectedLetter === letter
                          ? "bg-blue-500 text-white font-semibold"
                          : hasKeywords
                          ? "text-blue-600 hover:bg-blue-50"
                          : "text-gray-300 cursor-default"
                      }`}
                      disabled={!hasKeywords}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1">
              {filteredKeywords.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {searchQuery || selectedLetter
                    ? "No keywords found. Try a different search or letter."
                    : "No keywords available yet."}
                  {(searchQuery || selectedLetter) && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="block mx-auto mt-2 text-blue-600 hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedLetter ? (
                    // Show only selected letter section
                    <div id={`letter-${selectedLetter}`}>
                      <h2 className="text-xl font-semibold mb-4">{selectedLetter}</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {filteredKeywords.map((keyword) => {
                          const keywordKey = keyword.name.toLowerCase().trim();
                          const isCompleted = completedKeywords.has(keywordKey);
                          return (
                            <button
                              key={keyword.id}
                              type="button"
                              onClick={() => handleKeywordClick(keyword)}
                              className={`text-left px-3 py-2 border rounded-lg transition text-sm ${
                                isCompleted
                                  ? "bg-green-50 border-green-300 hover:bg-green-100"
                                  : "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                              }`}
                            >
                              {keyword.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    // Show all keywords grouped by letter
                    ALPHABET.map((letter) => {
                      const letterKeywords = filteredKeywords.filter((keyword) =>
                        keyword.name.toUpperCase().startsWith(letter)
                      );

                      if (letterKeywords.length === 0) return null;

                      return (
                        <div key={letter} id={`letter-${letter}`}>
                          <h2 className="text-xl font-semibold mb-4">{letter}</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {letterKeywords.map((keyword) => {
                              const keywordKey = keyword.name.toLowerCase().trim();
                              const isCompleted = completedKeywords.has(keywordKey);
                              return (
                                <button
                                  key={keyword.id}
                                  type="button"
                                  onClick={() => handleKeywordClick(keyword)}
                                  className={`text-left px-3 py-2 border rounded-lg transition text-sm ${
                                    isCompleted
                                      ? "bg-green-50 border-green-300 hover:bg-green-100"
                                      : "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                                  }`}
                                >
                                  {keyword.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* KEYWORD MODAL */}
      {selectedKeyword && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl min-h-[420px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button
              type="button"
              onClick={() => {
                setSelectedKeyword(null);
                setKeywordNotes(null);
                setNotesError(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-2">{selectedKeyword.name}</h2>

            {keywordCreditBlocked ? null : loadingNotes && !keywordNotes ? (
              <div className="py-10">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-4xl shadow-sm ring-1 ring-amber-100">
                    🤔
                  </div>
                  <div className="text-lg font-semibold text-gray-900">Louis is checking this one for you</div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600">
                    <span className="font-semibold text-gray-900">{selectedKeyword.name}</span> has never been opened before.
                    Please allow up to 20 seconds while Louis generates a short meaning for it.
                  </p>
                  <div className="mt-5 w-full max-w-md">
                    <div className="h-3 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 transition-all duration-500"
                        style={{ width: `${generationProgress}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                      {Math.min(generationProgress, 100)}%
                    </div>
                  </div>
                </div>
              </div>
            ) : notesError ? (
              <div className="text-center py-12 text-red-600">
                {notesError}
              </div>
            ) : keywordNotes ? (
              <div>
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-lg md:text-xl font-bold mt-3 mb-3 text-gray-900" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-4 text-[15px] leading-relaxed text-gray-700" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold" {...props} />
                    ),
                  }}
                >
                  {extractCompactKeywordMeaning(keywordNotes)}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No notes available yet.
              </div>
            )}
          </div>
        </div>
      )}

      <CreditLimitModal
        open={keywordCreditBlocked}
        userId={userId}
        onClose={() => {
          setKeywordCreditBlocked(false);
          setSelectedKeyword(null);
          setKeywordNotes(null);
          setNotesError(null);
        }}
      />

    </div>
  );
}

export default function KeywordsInTheBiblePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f6ef]" />}>
      <KeywordsInTheBiblePageContent />
    </Suspense>
  );
}
