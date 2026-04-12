"use client";

export const dynamic = "force-dynamic";

import { Suspense, useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { BIBLE_PLACES_LIST } from "../../lib/biblePlacesList";
import { logStudyView } from "../../lib/studyViewLimit";
import { ACTION_TYPE } from "../../lib/actionTypes";
import { consumeCreditAction } from "../../lib/creditClient";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";
import { triggerPoints } from "../../components/PointsPop";
import CreditLimitModal from "../../components/CreditLimitModal";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type BiblePlace = {
  id: string;
  name: string;
  normalized_name: string;
};

// Convert names to BiblePlace objects
function createStaticPlaces(): BiblePlace[] {
  return BIBLE_PLACES_LIST.map((placeEntry, index) => ({
    id: `static-${index}-${placeEntry.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    name: placeEntry.name,
    normalized_name: placeEntry.name.toLowerCase().trim(),
  }));
}

function normalizePlaceMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function PlacesInTheBiblePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [places] = useState<BiblePlace[]>(createStaticPlaces());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<BiblePlace | null>(null);
  const [placeNotes, setPlaceNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [placeCreditBlocked, setPlaceCreditBlocked] = useState(false);
  const [completedPlaces, setCompletedPlaces] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewedPlaces, setViewedPlaces] = useState<Set<string>>(new Set());

  // Handle place selection with study view limit check
  const handlePlaceClick = async (place: BiblePlace) => {
    if (!userId) {
      setSelectedPlace(place);
      return;
    }

    console.log("[PLACES_PAGE] Place clicked:", place.name);

    // Log study view for analytics (no restrictions)
    const insertSuccess = await logStudyView(userId, username, "place");
    if (!insertSuccess) {
      console.error("[PLACES_PAGE] Failed to log study_view, but allowing access anyway");
    }

    setSelectedPlace(place);
  };

  useEffect(() => {
    const requestedPlace = searchParams.get("place")?.trim().toLowerCase();
    if (!requestedPlace) return;

    const matchedPlace = places.find((place) => place.name.toLowerCase() === requestedPlace);
    if (!matchedPlace) return;

    setSearchQuery(matchedPlace.name);
    setSelectedLetter(null);
    setSelectedPlace(matchedPlace);
  }, [places, searchParams]);

  // Filter and sort places
  const filteredPlaces = useMemo(() => {
    let filtered = places;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (place) =>
          place.name.toLowerCase().includes(query) ||
          place.normalized_name.includes(query)
      );
    }

    // Filter by selected letter
    if (selectedLetter) {
      filtered = filtered.filter((place) =>
        place.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    // Sort alphabetically
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [places, searchQuery, selectedLetter]);

  // Group places by first letter for alphabet index
  const placesByLetter = useMemo(() => {
    const grouped: Record<string, BiblePlace[]> = {};
    places.forEach((place) => {
      const firstLetter = place.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(place);
    });
    return grouped;
  }, [places]);

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

        // Fetch all completed places for this user (batch query)
        const { data, error } = await supabase
          .from("places_progress")
          .select("place_name")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error loading places progress:", error);
        } else {
          const completedSet = new Set<string>();
          data?.forEach((row) => {
            // Store normalized name (lowercase, trimmed, spaces to underscores) for matching
            const normalized = row.place_name.toLowerCase().trim();
            completedSet.add(normalized);
          });
          setCompletedPlaces(completedSet);
        }
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setLoadingProgress(false);
      }
    }

    loadUserAndProgress();
  }, []);

  // Generate notes when a place is selected
  useEffect(() => {
    if (!selectedPlace) {
      setPlaceNotes(null);
      setPlaceCreditBlocked(false);
      return;
    }

    if (userId && loadingProgress) {
      setLoadingNotes(true);
      setNotesError(null);
      setPlaceNotes(null);
      setPlaceCreditBlocked(false);
      return;
    }

    async function generateNotes() {
      try {
        setLoadingNotes(true);
        setNotesError(null);
        setPlaceNotes(null);
        setPlaceCreditBlocked(false);

        const place = selectedPlace;
        if (!place) {
          return;
        }

        // Normalize: lowercase, trim, replace spaces with underscores
        const normalizedPlace = place.name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "_");

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

              void trackNavigationActionOnce({
                userId,
                username,
                actionType: ACTION_TYPE.place_viewed,
                actionLabel: selectedPlace.name,
                dedupeKey: `place-viewed:${normalizedPlace}`,
              })
                .then((logged) => {
                  if (logged) triggerPoints(1);
                })
                .catch((error) => console.error("[NAV] Failed to track place_viewed:", error));
            }
          }
        }

        // STEP 1: Check database FIRST (mandatory short-circuit)
        const { data: existing, error: existingError } = await supabase
          .from("places_in_the_bible_notes")
          .select("notes_text")
          .eq("normalized_place", normalizedPlace)
          .maybeSingle();

        if (existingError && existingError.code !== 'PGRST116') {
          console.error("[places_in_the_bible_notes] Error checking places_in_the_bible_notes:", existingError);
        }

        // MANDATORY SHORT-CIRCUIT: If notes exist, return immediately
        // DO NOT continue to generation - this prevents duplicate ChatGPT calls
        if (existing?.notes_text && existing.notes_text.trim().length > 0) {
          console.log(`[places_in_the_bible_notes] Found existing notes for ${selectedPlace.name}, returning immediately (ChatGPT will NOT be called)`);
          setPlaceNotes(existing.notes_text);
          setLoadingNotes(false);
          return;
        }

        // GUARANTEE: If we reach here, notes do NOT exist in database
        // This is the ONLY path where ChatGPT should be called
        let notesText = "";

        // STEP 2: Generate notes using ChatGPT
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
          .from("places_in_the_bible_notes")
          .select("notes_text")
          .eq("normalized_place", normalizedPlace)
          .maybeSingle();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error("[places_in_the_bible_notes] Error checking for duplicates:", checkError);
        }

        // MANDATORY: If row exists now, use it and DO NOT save (another request created it)
        if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
          console.log(`[places_in_the_bible_notes] Notes were created by another request for ${selectedPlace.name}, using existing (skipping save)`);
          notesText = existingCheck.notes_text;
        } else {
          // No row exists - upsert to handle race conditions gracefully
          console.log(`[places_in_the_bible_notes] Upserting notes for ${selectedPlace.name}`);
          const { error: upsertError } = await supabase
            .from("places_in_the_bible_notes")
            .upsert(
              {
                place: selectedPlace.name,
                normalized_place: normalizedPlace,
                notes_text: generated,
              },
              {
                onConflict: "normalized_place",
              }
            );

          if (upsertError) {
            console.error("[places_in_the_bible_notes] Error upserting notes to places_in_the_bible_notes:", upsertError);
            // Continue to use generated text even if save fails
            notesText = generated;
          } else {
            // STEP 4: Re-read from database (never trust in-memory generated text)
            const { data: savedData, error: readError } = await supabase
              .from("places_in_the_bible_notes")
              .select("notes_text")
              .eq("normalized_place", normalizedPlace)
              .maybeSingle();

            if (readError) {
              console.error("[places_in_the_bible_notes] Error re-reading notes:", readError);
              notesText = generated;
            } else if (savedData?.notes_text) {
              notesText = savedData.notes_text;
            } else {
              notesText = generated;
            }
          }
        }

        setPlaceNotes(notesText);
      } catch (err: any) {
        console.error("Error loading or generating notes:", err);
        setNotesError(err?.message || "Failed to load notes");
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedPlace, userId, loadingProgress, completedPlaces, viewedPlaces]);

  // Mark place as complete (called automatically when notes load)
  const markPlaceAsComplete = async () => {
    if (!userId || !selectedPlace) return;
    const placeNameKey = selectedPlace.name.toLowerCase().trim().replace(/\s+/g, "_");
    if (completedPlaces.has(placeNameKey)) return;

    try {
      const { error } = await supabase
        .from("places_progress")
        .upsert({ user_id: userId, place_name: placeNameKey }, { onConflict: "user_id,place_name" });
      if (error) { console.error("Error auto-marking place:", error); return; }

      const { data: { user: authUser } } = await supabase.auth.getUser();
      let actionUsername = "User";
      if (authUser) {
        const meta: any = authUser.user_metadata || {};
        actionUsername = meta.firstName || meta.first_name || (authUser.email ? authUser.email.split("@")[0] : null) || "User";
      }
      const placeDisplayName = selectedPlace.name.split(" ").map((w: string) => /^\d+$/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
      await supabase.from("master_actions").insert({ user_id: userId, username: actionUsername, action_type: ACTION_TYPE.place_discovered, action_label: placeDisplayName });

      const { count } = await supabase.from("places_progress").select("*", { count: "exact", head: true }).eq("user_id", userId);
      const { data: currentStats } = await supabase.from("profile_stats").select("username, chapters_completed_count, notes_created_count, people_learned_count, keywords_mastered_count").eq("user_id", userId).maybeSingle();
      const finalUsername = currentStats?.username || username || "User";
      const totalActions = (currentStats?.chapters_completed_count || 0) + (currentStats?.notes_created_count || 0) + (currentStats?.people_learned_count || 0) + (count || 0) + (currentStats?.keywords_mastered_count || 0);
      await supabase.from("profile_stats").upsert({ user_id: userId, username: finalUsername, places_discovered_count: count || 0, total_actions: totalActions, updated_at: new Date().toISOString() }, { onConflict: "user_id" });

      setCompletedPlaces((prev) => { const next = new Set(prev); next.add(placeNameKey); return next; });
    } catch (err) {
      console.error("Error auto-marking place:", err);
    }
  };

  // Auto-mark place as complete when notes finish loading
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (placeNotes && userId && selectedPlace) { markPlaceAsComplete(); } }, [placeNotes]);

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
          <h1 className="text-2xl sm:text-3xl font-bold">Places in the Bible</h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Explore the important places of Scripture
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
              placeholder="Search for a place..."
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
                  const hasPlaces = placesByLetter[letter] && placesByLetter[letter].length > 0;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => scrollToLetter(letter)}
                      className={`w-full py-1 text-xs text-center rounded transition ${
                        selectedLetter === letter
                          ? "bg-blue-500 text-white font-semibold"
                          : hasPlaces
                          ? "text-blue-600 hover:bg-blue-50"
                          : "text-gray-300 cursor-default"
                      }`}
                      disabled={!hasPlaces}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1">
              {filteredPlaces.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {searchQuery || selectedLetter
                    ? "No places found. Try a different search or letter."
                    : "No places available yet."}
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
                        {filteredPlaces.map((place) => {
                          // Normalize place name for matching (same as database: lowercase, spaces to underscores)
                          const placeKey = place.name.toLowerCase().trim().replace(/\s+/g, "_");
                          const isCompleted = completedPlaces.has(placeKey);
                          return (
                            <button
                              key={place.id}
                              type="button"
                              onClick={() => handlePlaceClick(place)}
                              className={`text-left px-3 py-2 border rounded-lg transition text-sm ${
                                isCompleted
                                  ? "bg-green-50 border-green-300 hover:bg-green-100"
                                  : "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                              }`}
                            >
                              {place.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    // Show all places grouped by letter
                    ALPHABET.map((letter) => {
                      const letterPlaces = filteredPlaces.filter((place) =>
                        place.name.toUpperCase().startsWith(letter)
                      );

                      if (letterPlaces.length === 0) return null;

                      return (
                        <div key={letter} id={`letter-${letter}`}>
                          <h2 className="text-xl font-semibold mb-4">{letter}</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {letterPlaces.map((place) => {
                              // Normalize place name for matching (same as database: lowercase, spaces to underscores)
                              const placeKey = place.name.toLowerCase().trim().replace(/\s+/g, "_");
                              const isCompleted = completedPlaces.has(placeKey);
                              return (
                                <button
                                  key={place.id}
                                  type="button"
                                  onClick={() => handlePlaceClick(place)}
                                  className={`text-left px-3 py-2 border rounded-lg transition text-sm ${
                                    isCompleted
                                      ? "bg-green-50 border-green-300 hover:bg-green-100"
                                      : "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                                  }`}
                                >
                                  {place.name}
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

      {/* PLACE MODAL */}
      {selectedPlace && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button
              type="button"
              onClick={() => {
                setSelectedPlace(null);
                setPlaceNotes(null);
                setNotesError(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-2">{selectedPlace.name}</h2>

            {placeCreditBlocked ? null : loadingNotes ? (
              <div className="text-center py-12 text-gray-500">
                Loading notes...
              </div>
            ) : notesError ? (
              <div className="text-center py-12 text-red-600">
                {notesError}
              </div>
            ) : placeNotes ? (
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
                  {normalizePlaceMarkdown(placeNotes)}
                </ReactMarkdown>

                {/* COMPLETION STATUS */}
                {userId && completedPlaces.has(selectedPlace.name.toLowerCase().trim().replace(/\s+/g, "_")) && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="w-full px-6 py-3 rounded-lg font-medium bg-green-100 text-green-700 text-center">
                      ✓ {selectedPlace.name} completed
                    </div>
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

      <CreditLimitModal
        open={placeCreditBlocked}
        userId={userId}
        onClose={() => {
          setPlaceCreditBlocked(false);
          setSelectedPlace(null);
          setPlaceNotes(null);
          setNotesError(null);
        }}
      />

    </div>
  );
}

export default function PlacesInTheBiblePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f6ef]" />}>
      <PlacesInTheBiblePageContent />
    </Suspense>
  );
}
