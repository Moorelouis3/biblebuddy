"use client";

export const dynamic = "force-dynamic";

import { Suspense, useState, useEffect, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter, useSearchParams } from "next/navigation";
import { LouisAvatar } from "../../components/LouisAvatar";
import { supabase } from "../../lib/supabaseClient";
import { BIBLE_PLACES_LIST } from "../../lib/biblePlacesList";
import { logStudyView } from "../../lib/studyViewLimit";
import { ACTION_TYPE } from "../../lib/actionTypes";
import { consumeCreditAction } from "../../lib/creditClient";
import { findPlaceNotes } from "../../lib/bibleNotes";
import { ensureBibleEntityLearned } from "../../lib/bibleEntityProgress";
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

function LoadingDots() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : `${prev}.`));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return <p className="pt-8 text-center text-2xl text-gray-900">Loading{dots}</p>;
}

function PlacesInTheBiblePageContent() {
  function extractCompactPlaceMeaning(markdown: string): string {
    const normalized = normalizePlaceMarkdown(markdown);
    const sections = normalized.split(/\n(?=# )/).map((section) => section.trim()).filter(Boolean);
    const preferred =
      sections.find((section) => /^# .*what this place is/i.test(section)) ||
      sections.find((section) => /^# .*what this/i.test(section)) ||
      sections[0] ||
      normalized;

    const withoutHeader = preferred.replace(/^#\s+[^\n]+\n*/i, "").trim();
    return `# 📍 What This Place Is\n\n${withoutHeader}`;
  }

  function isLegacyPlaceNotes(markdown: string): boolean {
    const normalized = normalizePlaceMarkdown(markdown);
    const headerMatches = normalized.match(/^# /gm) || [];
    return (
      headerMatches.length > 1 ||
      /where it appears|key moments|where you find|why this place matters/i.test(normalized) ||
      normalized.length > 420
    );
  }

  function buildPlacePrompt(place: string): string {
    return `You are Little Louis.

Generate a short Bible explanation for the place "${place}".

Return markdown with exactly this structure:

# 📍 What This Place Is

Then write only 2 to 5 warm, beginner friendly sentences in 1 to 3 short paragraphs.

Rules:
- Explain only what the place is and why it matters in simple terms
- No extra sections
- No bullet points
- No key moments list
- No where to find it section
- No applications list
- Keep it under 120 words
- Sound clear simple and pastoral`;
  }

  function buildQuickPlaceFallback(place: string): string {
    return `# 📍 What This Place Is

${place} is a Bible place, and Louis is still getting the full explanation ready.`;
  }

  const router = useRouter();
  const searchParams = useSearchParams();
  const [places] = useState<BiblePlace[]>(createStaticPlaces());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<BiblePlace | null>(null);
  const selectedPlaceNameRef = useRef<string | null>(null);
  const placePopupCacheRef = useRef<Map<string, string>>(new Map());
  const [placeNotes, setPlaceNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [generationProgress] = useState(0);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [placeCreditBlocked, setPlaceCreditBlocked] = useState(false);
  const [completedPlaces, setCompletedPlaces] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const incrementPlaceViewProfileStats = async (resolvedUserId: string) => {
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
      console.error("Error updating place view profile stats:", err);
    }
  };

  // Handle place selection with study view limit check
  const handlePlaceClick = async (place: BiblePlace) => {
    const placeKey = place.name.toLowerCase().trim().replace(/\s+/g, "_");
    const cachedNotes = placePopupCacheRef.current.get(placeKey);

    if (cachedNotes) {
      setPlaceNotes(cachedNotes);
      setNotesError(null);
      setLoadingNotes(false);
    }

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

  useEffect(() => {
    selectedPlaceNameRef.current = selectedPlace?.name.toLowerCase().trim().replace(/\s+/g, "_") || null;
  }, [selectedPlace]);

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
      setNotesError(null);
      setLoadingNotes(false);
      return;
    }

    if (userId && loadingProgress) {
      const cachedNotes = placePopupCacheRef.current.get(selectedPlace.name.toLowerCase().trim().replace(/\s+/g, "_"));
      setLoadingNotes(!cachedNotes);
      setNotesError(null);
      if (!cachedNotes) {
        setPlaceNotes(null);
      }
      setPlaceCreditBlocked(false);
      return;
    }

    async function generateNotes() {
      try {
        const place = selectedPlace;
        if (!place) {
          return;
        }

        // Normalize: lowercase, trim, replace spaces with underscores
        const normalizedPlace = place.name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "_");
        const cachedNotes = placePopupCacheRef.current.get(normalizedPlace);

        setLoadingNotes(!cachedNotes);
        setNotesError(null);
        if (!cachedNotes) {
          setPlaceNotes(null);
        }
        setPlaceCreditBlocked(false);

        if (userId) {
          const creditResult = await consumeCreditAction(ACTION_TYPE.place_viewed, {
            userId,
            actionLabel: selectedPlace.name,
          });
          if (!creditResult.ok) {
            setPlaceCreditBlocked(true);
            setLoadingNotes(false);
            return;
          }

          void incrementPlaceViewProfileStats(userId);
        }

        if (cachedNotes) {
          setPlaceNotes(cachedNotes);
          setLoadingNotes(false);

          if (userId && !completedPlaces.has(normalizedPlace)) {
            try {
              const result = await ensureBibleEntityLearned({
                kind: "places",
                name: selectedPlace.name,
                userId,
                username,
              });
              if (result.inserted) {
                triggerPoints(1);
                setCompletedPlaces((prev) => {
                  const next = new Set(prev);
                  next.add(result.normalizedKey);
                  return next;
                });
              }
            } catch (progressErr) {
              console.error("Error saving place progress:", progressErr);
            }
          }
          return;
        }

        const loadedNotes = await findPlaceNotes(selectedPlace.name);
        if (selectedPlaceNameRef.current !== normalizedPlace) {
          return;
        }

        if (!loadedNotes?.trim()) {
          setPlaceNotes(null);
          setNotesError("Couldn't load this place yet.");
          setLoadingNotes(false);
          return;
        }

        const normalizedNotes = normalizePlaceMarkdown(loadedNotes);
        placePopupCacheRef.current.set(normalizedPlace, normalizedNotes);
        setPlaceNotes(normalizedNotes);
        setNotesError(null);
        setLoadingNotes(false);

        if (userId && !completedPlaces.has(normalizedPlace)) {
          try {
            const result = await ensureBibleEntityLearned({
              kind: "places",
              name: selectedPlace.name,
              userId,
              username,
            });
            if (result.inserted) {
              triggerPoints(1);
              setCompletedPlaces((prev) => {
                const next = new Set(prev);
                next.add(result.normalizedKey);
                return next;
              });
            }
          } catch (progressErr) {
            console.error("Error saving place progress:", progressErr);
          }
        }
        return;

        /*
        // STEP 1: Check database FIRST (mandatory short-circuit)
        const { data: existing, error: existingError } = await supabase
          .from("places_in_the_bible_notes")
          .select("notes_text")
          .eq("normalized_place", normalizedPlace)
          .maybeSingle();

        if (existingError && existingError.code !== 'PGRST116') {
          console.error("[places_in_the_bible_notes] Error checking places_in_the_bible_notes:", existingError);
        }

        const generateAndStorePlaceNotes = async (updateVisible: boolean) => {
          if (generatingPlaceNotesRef.current.has(normalizedPlace)) return;
          generatingPlaceNotesRef.current.add(normalizedPlace);

          try {
            const generated = await requestLouisNotes(buildPlacePrompt(selectedPlace.name));
            const compactGenerated = extractCompactPlaceMeaning(generated);

            const { error: upsertError } = await supabase
              .from("places_in_the_bible_notes")
              .upsert(
                {
                  place: selectedPlace.name,
                  normalized_place: normalizedPlace,
                  notes_text: compactGenerated,
                },
                {
                  onConflict: "normalized_place",
                }
              );

            if (upsertError) {
              console.error("[places_in_the_bible_notes] Error upserting notes to places_in_the_bible_notes:", upsertError);
            }

            if (updateVisible && selectedPlaceNameRef.current === normalizedPlace) {
              setGenerationProgress(100);
              setPlaceNotes(compactGenerated);
              setNotesError(null);
              setLoadingNotes(false);
            }
          } catch (backgroundError: any) {
            console.error("Error generating place notes in background:", backgroundError);
            if (selectedPlaceNameRef.current === normalizedPlace) {
              setNotesError("Louis could not explain this place right now. Please try again.");
              setLoadingNotes(false);
            }
          } finally {
            generatingPlaceNotesRef.current.delete(normalizedPlace);
          }
        };

        if (existing?.notes_text && existing.notes_text.trim().length > 0) {
          console.log(`[places_in_the_bible_notes] Found existing notes for ${selectedPlace?.name ?? "this place"}, returning immediately (ChatGPT will NOT be called)`);
          setPlaceNotes(extractCompactPlaceMeaning(existing.notes_text));
          setLoadingNotes(false);

          if (isLegacyPlaceNotes(existing.notes_text)) {
            void generateAndStorePlaceNotes(false);
          }
          return;
        }

        setPlaceNotes(null);
        setGenerationProgress(7);
        void generateAndStorePlaceNotes(true);
        return;

        // MANDATORY SHORT-CIRCUIT: If notes exist, return immediately
        // DO NOT continue to generation - this prevents duplicate ChatGPT calls
        if ((existing?.notes_text?.trim().length || 0) > 0) {
          console.log(`[places_in_the_bible_notes] Found existing notes for ${selectedPlace?.name ?? "this place"}, returning immediately (ChatGPT will NOT be called)`);
          setPlaceNotes(existing?.notes_text || "");
          setLoadingNotes(false);
          return;
        }

        // GUARANTEE: If we reach here, notes do NOT exist in database
        // This is the ONLY path where ChatGPT should be called
        let notesText = "";

        // STEP 2: Generate notes using ChatGPT
        const prompt = `You are Little Louis.

Generate beginner friendly Bible notes about the PLACE: ${selectedPlace?.name ?? "this place"}.

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

        notesText = buildQuickPlaceFallback(selectedPlace?.name ?? "this place");
        setPlaceNotes(notesText);
        setLoadingNotes(false);

        if (!generatingPlaceNotesRef.current.has(normalizedPlace)) {
          generatingPlaceNotesRef.current.add(normalizedPlace);

          void (async () => {
            try {
              const generated = await requestLouisNotes(prompt);

              const { data: existingCheck, error: checkError } = await supabase
                .from("places_in_the_bible_notes")
                .select("notes_text")
                .eq("normalized_place", normalizedPlace)
                .maybeSingle();

              if (checkError && checkError.code !== 'PGRST116') {
                console.error("[places_in_the_bible_notes] Error checking for duplicates:", checkError);
              }

              let fullNotesText = generated;

              if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
                console.log(`[places_in_the_bible_notes] Notes were created by another request for ${selectedPlace?.name ?? "this place"}, using existing (skipping save)`);
                fullNotesText = existingCheck.notes_text;
              } else {
                console.log(`[places_in_the_bible_notes] Upserting notes for ${selectedPlace?.name ?? "this place"}`);
                const { error: upsertError } = await supabase
                  .from("places_in_the_bible_notes")
                  .upsert(
                    {
                      place: selectedPlace?.name ?? "this place",
                      normalized_place: normalizedPlace,
                      notes_text: generated,
                    },
                    {
                      onConflict: "normalized_place",
                    }
                  );

                if (upsertError) {
                  console.error("[places_in_the_bible_notes] Error upserting notes to places_in_the_bible_notes:", upsertError);
                } else {
                  const { data: savedData, error: readError } = await supabase
                    .from("places_in_the_bible_notes")
                    .select("notes_text")
                    .eq("normalized_place", normalizedPlace)
                    .maybeSingle();

                  if (readError) {
                    console.error("[places_in_the_bible_notes] Error re-reading notes:", readError);
                  } else if (savedData?.notes_text) {
                    fullNotesText = savedData.notes_text;
                  }
                }
              }

              if (selectedPlaceNameRef.current === normalizedPlace) {
                setPlaceNotes(fullNotesText);
                setNotesError(null);
              }
            } catch (backgroundError: any) {
              console.error("Error generating place notes in background:", backgroundError);
            } finally {
              generatingPlaceNotesRef.current.delete(normalizedPlace);
            }
          })();
        }
        */
      } catch (err: any) {
        console.error("Error loading or generating notes:", err);
        setNotesError(err?.message || "Failed to load notes");
      } finally {
        setLoadingNotes(false);
      }
    }

    generateNotes();
  }, [selectedPlace, userId, loadingProgress, completedPlaces]);

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
            <span className="text-gray-800 font-medium">Places</span>
          </nav>
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
          <div className="relative w-full max-w-2xl min-h-[300px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
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

            <div className="mb-4 flex justify-center">
              <LouisAvatar mood="wave" size={64} />
            </div>
            <h2 className="mb-4 text-center text-3xl font-bold">{selectedPlace.name}</h2>

            {placeCreditBlocked ? null : loadingNotes && !placeNotes ? (
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
                    setPlaceNotes(null);
                    setNotesError(null);
                    setSelectedPlace({ ...selectedPlace });
                  }}
                  className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : placeNotes ? (
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
                  {normalizePlaceMarkdown(placeNotes)}
                </ReactMarkdown>
              </div>
            ) : null}
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

