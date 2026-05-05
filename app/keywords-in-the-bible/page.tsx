"use client";

export const dynamic = "force-dynamic";

import { Suspense, useState, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { LouisAvatar } from "../../components/LouisAvatar";
import { supabase } from "../../lib/supabaseClient";
import { BIBLE_KEYWORDS_LIST } from "../../lib/bibleKeywordsList";
import { logStudyView } from "../../lib/studyViewLimit";
import { ACTION_TYPE } from "../../lib/actionTypes";
import { consumeCreditAction } from "../../lib/creditClient";
import { findKeywordNotes } from "../../lib/bibleNotes";
import { ensureBibleEntityLearned } from "../../lib/bibleEntityProgress";
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
    .replace(/^Hey friend,\s*Little Louis here\s*[—-]\s*/i, "")
    .replace(/^Hey friend,\s*/i, "")
    .replace(/^Little Louis here\s*[—-]\s*/i, "")
    .replace(/^\s*[-â€¢*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function LoadingDots() {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="mt-6 text-center text-sm font-medium text-gray-500">
      Loading{".".repeat(dotCount)}
    </p>
  );
}

function KeywordsInTheBiblePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keywords] = useState<BibleKeyword[]>(createStaticKeywords());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<BibleKeyword | null>(null);
  const selectedKeywordNameRef = useRef<string | null>(null);
  const keywordPopupCacheRef = useRef<Map<string, string>>(new Map());
  const [keywordNotes, setKeywordNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [keywordCreditBlocked, setKeywordCreditBlocked] = useState(false);
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const incrementKeywordViewProfileStats = async (resolvedUserId: string) => {
    try {
      const { data: currentStats } = await supabase
        .from("profile_stats")
        .select("username, total_actions, last_active_date")
        .eq("user_id", resolvedUserId)
        .maybeSingle();

      const today = new Date().toISOString().slice(0, 10);
      const finalUsername = currentStats?.username || username || "User";

      await supabase.from("profile_stats").upsert({
        user_id: resolvedUserId,
        username: finalUsername,
        total_actions: (currentStats?.total_actions || 0) + 1,
        last_active_date: today,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    } catch (err) {
      console.error("Error updating keyword view profile stats:", err);
    }
  };

  // Handle keyword selection with study view limit check
  const handleKeywordClick = async (keyword: BibleKeyword) => {
    const keywordKey = keyword.name.toLowerCase().trim();
    const cachedNotes = keywordPopupCacheRef.current.get(keywordKey);

    if (cachedNotes) {
      setKeywordNotes(cachedNotes);
      setNotesError(null);
      setLoadingNotes(false);
    }

    if (!userId) {
      setSelectedKeyword(keyword);
      return;
    }

    console.log("[KEYWORDS_PAGE] Keyword clicked:", keyword.name);

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

  // Load popup notes when a keyword is selected
  useEffect(() => {
    if (!selectedKeyword) {
      setKeywordNotes(null);
      setKeywordCreditBlocked(false);
      setNotesError(null);
      setLoadingNotes(false);
      return;
    }

    if (userId && loadingProgress) {
      setLoadingNotes(true);
      setNotesError(null);
      setKeywordCreditBlocked(false);
      return;
    }

    async function loadNotes() {
      const keyword = selectedKeyword;
      if (!keyword) {
        setLoadingNotes(false);
        return;
      }
      const keywordKey = keyword.name.toLowerCase().trim();

      try {
        setLoadingNotes(true);
        setNotesError(null);
        setKeywordCreditBlocked(false);

        if (userId) {
          const creditResult = await consumeCreditAction(ACTION_TYPE.keyword_viewed, {
            userId,
            actionLabel: keyword.name,
          });
          if (!creditResult.ok) {
            setKeywordCreditBlocked(true);
            setLoadingNotes(false);
            return;
          }

          void incrementKeywordViewProfileStats(userId);
        }

        const cachedNotes = keywordPopupCacheRef.current.get(keywordKey);
        if (cachedNotes) {
          setKeywordNotes(cachedNotes);
          setLoadingNotes(false);
          return;
        }

        const loadedNotes = await findKeywordNotes(keyword.name);

        if (selectedKeywordNameRef.current !== keywordKey) {
          return;
        }

        if (!loadedNotes?.trim()) {
          setKeywordNotes(null);
          setNotesError("Couldn't load this keyword yet.");
          setLoadingNotes(false);
          return;
        }

        const normalizedNotes = normalizeKeywordMarkdown(loadedNotes);
        keywordPopupCacheRef.current.set(keywordKey, normalizedNotes);
        setKeywordNotes(normalizedNotes);
        setNotesError(null);

        if (userId && !completedKeywords.has(keywordKey)) {
          const result = await ensureBibleEntityLearned({
            kind: "keywords",
            name: keyword.name,
            userId,
            username,
          });
          if (result.inserted) {
            triggerPoints(1);
            setCompletedKeywords((prev) => {
              const next = new Set(prev);
              next.add(result.normalizedKey);
              return next;
            });
          }
        }
      } catch (err: any) {
        console.error("Error loading keyword notes:", err);
        if (selectedKeywordNameRef.current === keywordKey) {
          setKeywordNotes(null);
          setNotesError(err?.message || "Failed to load notes");
        }
      } finally {
        if (selectedKeywordNameRef.current === keywordKey) {
          setLoadingNotes(false);
        }
      }
    }

    void loadNotes();
  }, [selectedKeyword, userId, loadingProgress]);

  // Mark keyword as complete (called automatically when notes load)
  const markKeywordAsComplete = async () => {
    if (!userId || !selectedKeyword) return;
    const keywordNameKey = selectedKeyword.name.toLowerCase().trim();
    if (completedKeywords.has(keywordNameKey)) return;

    try {
      const { error } = await supabase
        .from("keywords_progress")
        .upsert({ user_id: userId, keyword_name: keywordNameKey }, { onConflict: "user_id,keyword_name" });
      if (error) {
        console.error("Error auto-marking keyword:", error);
        return;
      }

      const { data: { user: authUser } } = await supabase.auth.getUser();
      let actionUsername = "User";
      if (authUser) {
        const meta: any = authUser.user_metadata || {};
        actionUsername = meta.firstName || meta.first_name || (authUser.email ? authUser.email.split("@")[0] : null) || "User";
      }

      const keywordDisplayName = selectedKeyword.name
        .split(" ")
        .map((w: string) => /^\d+$/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

      await supabase.from("master_actions").insert({
        user_id: userId,
        username: actionUsername,
        action_type: ACTION_TYPE.keyword_mastered,
        action_label: keywordDisplayName,
      });

      const { count } = await supabase
        .from("keywords_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);

      const { data: currentStats } = await supabase
        .from("profile_stats")
        .select("username, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count")
        .eq("user_id", userId)
        .maybeSingle();

      const finalUsername = currentStats?.username || username || "User";
      const totalActions =
        (currentStats?.chapters_completed_count || 0) +
        (currentStats?.notes_created_count || 0) +
        (currentStats?.people_learned_count || 0) +
        (currentStats?.places_discovered_count || 0) +
        (count || 0);

      await supabase.from("profile_stats").upsert({
        user_id: userId,
        username: finalUsername,
        keywords_mastered_count: count || 0,
        total_actions: totalActions,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

      setCompletedKeywords((prev) => {
        const next = new Set(prev);
        next.add(keywordNameKey);
        return next;
      });
    } catch (err) {
      console.error("Error auto-marking keyword:", err);
    }
  };

  // Auto-mark keyword as complete when notes finish loading
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (keywordNotes && userId && selectedKeyword) {
      markKeywordAsComplete();
    }
  }, [keywordNotes]);

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
          <nav className="mb-3 text-sm text-gray-500">
            <a href="/dashboard" className="hover:text-gray-700 transition">Dashboard</a>
            <span className="mx-2">&gt;</span>
            <a href="/guided-studies" className="hover:text-gray-700 transition">Bible Study Tools</a>
            <span className="mx-2">&gt;</span>
            <a href="/bible-references" className="hover:text-gray-700 transition">Bible References</a>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">Keywords</span>
          </nav>
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
          <div className="relative w-full max-w-2xl min-h-[300px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button
              type="button"
              onClick={() => {
                setSelectedKeyword(null);
                setKeywordNotes(null);
                setNotesError(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>

            <div className="mb-4 flex justify-center">
              <LouisAvatar mood="wave" size={64} />
            </div>
            <h2 className="mb-4 text-center text-3xl font-bold">{selectedKeyword.name}</h2>

            {keywordCreditBlocked ? null : loadingNotes && !keywordNotes ? (
              <div className="py-8">
                <div className="space-y-4">
                  <div className="mx-auto h-4 w-4/5 rounded-full bg-gray-100" />
                  <div className="mx-auto h-4 w-3/4 rounded-full bg-gray-100" />
                  <div className="mx-auto h-4 w-2/3 rounded-full bg-gray-100" />
                  <div className="mx-auto h-4 w-4/5 rounded-full bg-gray-100" />
                </div>
                <LoadingDots />
              </div>
            ) : notesError ? (
              <div className="py-8 text-center">
                <p className="mb-4 text-sm text-gray-500">{notesError}</p>
                <button
                  type="button"
                  onClick={() => {
                    setKeywordNotes(null);
                    setNotesError(null);
                    setSelectedKeyword({ ...selectedKeyword });
                  }}
                  className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Retry
                </button>
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
                  {normalizeKeywordMarkdown(keywordNotes)}
                </ReactMarkdown>
              </div>
            ) : null}
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



