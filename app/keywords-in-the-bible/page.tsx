"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../lib/supabaseClient";
import { BIBLE_KEYWORDS_LIST } from "../../lib/bibleKeywordsList";
import { logStudyView } from "../../lib/studyViewLimit";
import { ACTION_TYPE } from "../../lib/actionTypes";

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

export default function KeywordsInTheBiblePage() {
  const router = useRouter();
  const [keywords] = useState<BibleKeyword[]>(createStaticKeywords());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<BibleKeyword | null>(null);
  const [keywordNotes, setKeywordNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
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

        // STEP 1: Check database FIRST (mandatory short-circuit)
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
          console.log(`[keywords_in_the_bible] Found existing notes for ${selectedKeyword.name}, returning immediately (ChatGPT will NOT be called)`);
          setKeywordNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // GUARANTEE: If we reach here, notes do NOT exist in database
        // This is the ONLY path where ChatGPT should be called
        let notesText = "";

        // STEP 2: Generate notes using ChatGPT
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

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to generate notes: ${response.statusText}. ${errorText}`);
        }

        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        if (!generated || generated.trim().length === 0) {
          throw new Error("Generated notes are empty.");
        }

        // STEP 3: Race condition protection - check again before saving
        const { data: existingCheck, error: checkError } = await supabase
          .from("keywords_in_the_bible")
          .select("notes_text")
          .eq("keyword", keywordKey)
          .maybeSingle();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error("[keywords_in_the_bible] Error checking for duplicates:", checkError);
        }

        // MANDATORY: If row exists now, use it and DO NOT save (another request created it)
        if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
          console.log(`[keywords_in_the_bible] Notes were created by another request for ${selectedKeyword.name}, using existing (skipping save)`);
          notesText = existingCheck.notes_text;
        } else {
          // No row exists - upsert to handle race conditions gracefully
          console.log(`[keywords_in_the_bible] Upserting notes for ${selectedKeyword.name}`);
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
            // Continue to use generated text even if save fails
            notesText = generated;
          } else {
            // STEP 4: Re-read from database (never trust in-memory generated text)
            const { data: savedData, error: readError } = await supabase
              .from("keywords_in_the_bible")
              .select("notes_text")
              .eq("keyword", keywordKey)
              .maybeSingle();

            if (readError) {
              console.error("[keywords_in_the_bible] Error re-reading notes:", readError);
              notesText = generated;
            } else if (savedData?.notes_text) {
              notesText = savedData.notes_text;
            } else {
              notesText = generated;
            }
          }
        }

        setKeywordNotes(notesText);
      } catch (err: any) {
        console.error("Error loading or generating notes:", err);
        setNotesError(err?.message || "Failed to load notes");
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedKeyword, userId, loadingProgress, completedKeywords, viewedKeywords]);

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
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
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
              <div className="text-center py-12 text-gray-500">
                Loading notes...
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
                      <h1 className="text-xl md:text-2xl font-bold mt-6 mb-4 text-gray-900" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-4 leading-relaxed" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold" {...props} />
                    ),
                  }}
                >
                  {normalizeKeywordMarkdown(keywordNotes)}
                </ReactMarkdown>

                {/* MARK AS FINISHED BUTTON */}
                {userId && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {(() => {
                      const keywordKey = selectedKeyword.name.toLowerCase().trim();
                      const isCompleted = completedKeywords.has(keywordKey);
                      return (
                        <button
                          type="button"
                          onClick={async (e) => {
                            // Prevent event from bubbling up
                            e.stopPropagation();
                            e.preventDefault();

                            if (!userId) return;

                            const keywordNameKey = selectedKeyword.name.toLowerCase().trim();

                            if (isCompleted) {
                              // Already completed - do nothing or allow unmarking if needed
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
                                // Always fetch username fresh from auth to ensure we have the correct value
                                const { data: { user: authUser } } = await supabase.auth.getUser();
                                let actionUsername = "User"; // Default fallback
                                
                                if (authUser) {
                                  const meta: any = authUser.user_metadata || {};
                                  actionUsername =
                                    meta.firstName ||
                                    meta.first_name ||
                                    (authUser.email ? authUser.email.split("@")[0] : null) ||
                                    "User";
                                }

                                console.log(`[MASTER_ACTIONS] Inserting keyword_mastered with username: ${actionUsername}, user_id: ${userId}`);

                                // Format keyword name for action_label (capitalize properly)
                                const formatKeywordName = (name: string): string => {
                                  return name.split(' ').map(word => {
                                    if (/^\d+$/.test(word)) return word; // Keep numbers as-is
                                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                                  }).join(' ');
                                };

                                const keywordDisplayName = formatKeywordName(selectedKeyword.name);

                                // Insert into master_actions with action_label
                                console.log("[MASTER_ACTIONS] inserting:", { action_type: ACTION_TYPE.keyword_mastered, action_label: keywordDisplayName });
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
                                  console.error("Attempted username:", actionUsername);
                                  // Don't block the UI - continue even if action logging fails
                                } else {
                                  console.log(`[MASTER_ACTIONS] Successfully logged keyword_mastered: ${keywordDisplayName}`);
                                }

                                // UPDATE profile_stats: Count from keywords_progress table
                                // Get username if not already loaded
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

                                // Count all keywords_progress rows for this user
                                const { count, error: countError } = await supabase
                                  .from("keywords_progress")
                                  .select("*", { count: "exact", head: true })
                                  .eq("user_id", userId);

                                if (countError) {
                                  console.error("Error counting keywords_progress:", countError);
                                  alert(`Failed to update stats: ${countError.message}`);
                                } else {
                                  console.log(`[KEYWORDS MASTERED] Count from database: ${count}`);
                                  
                                  // Get existing username if available
                                  const { data: currentStats } = await supabase
                                    .from("profile_stats")
                                    .select("username, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count")
                                    .eq("user_id", userId)
                                    .maybeSingle();

                                  const finalUsername = currentStats?.username || statsUsername || "User";
                                  
                                  // Calculate total_actions as sum of all counts
                                  const totalActions = 
                                    (currentStats?.chapters_completed_count || 0) +
                                    (currentStats?.notes_created_count || 0) +
                                    (currentStats?.people_learned_count || 0) +
                                    (currentStats?.places_discovered_count || 0) +
                                    (count || 0);

                                  // Update profile_stats with count from database
                                  const { error: statsUpdateError } = await supabase
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

                                  if (statsUpdateError) {
                                    console.error("Error updating profile_stats:", statsUpdateError);
                                    alert(`Failed to update profile stats: ${statsUpdateError.message}`);
                                  } else {
                                    console.log(`[KEYWORDS MASTERED] Successfully updated profile_stats.keywords_mastered_count to ${count}`);
                                    
                                    // Also update notes_created_count by counting from notes table
                                    const { count: notesCount, error: notesCountError } = await supabase
                                      .from("notes")
                                      .select("*", { count: "exact", head: true })
                                      .eq("user_id", userId);

                                    if (!notesCountError && notesCount !== null) {
                                      // Get all counts to calculate total_actions
                                      const { data: allStats } = await supabase
                                        .from("profile_stats")
                                        .select("chapters_completed_count, people_learned_count, places_discovered_count, keywords_mastered_count")
                                        .eq("user_id", userId)
                                        .maybeSingle();

                                      const totalActions = 
                                        (allStats?.chapters_completed_count || 0) +
                                        (notesCount || 0) +
                                        (allStats?.people_learned_count || 0) +
                                        (allStats?.places_discovered_count || 0) +
                                        (allStats?.keywords_mastered_count || 0);

                                      const { error: notesUpdateError } = await supabase
                                        .from("profile_stats")
                                        .update({
                                          notes_created_count: notesCount || 0,
                                          total_actions: totalActions,
                                        })
                                        .eq("user_id", userId);

                                      if (!notesUpdateError) {
                                        console.log(`[NOTES COUNT] Updated notes_created_count to ${notesCount}`);
                                      }
                                    }
                                  }
                                }

                                // Update local state
                                setCompletedKeywords((prev) => {
                                  const next = new Set(prev);
                                  next.add(keywordNameKey);
                                  return next;
                                });
                                // Close the modal after marking as finished
                                setSelectedKeyword(null);
                                setKeywordNotes(null);
                                setNotesError(null);
                              }
                            } catch (err) {
                              console.error("Error marking keyword as finished:", err);
                              alert("Failed to mark as finished. Please try again.");
                            }
                          }}
                          disabled={isCompleted}
                          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          style={isAnimating ? {
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
              <div className="text-center py-12 text-gray-500">
                No notes available yet.
              </div>
            )}
          </div>
        </div>
      )}


    </div>
  );
}

