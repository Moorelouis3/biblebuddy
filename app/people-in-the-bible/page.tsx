"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllPeople, getPersonNotes, savePersonNotes, type BiblePerson } from "../../lib/biblePeople";
import { supabase } from "../../lib/supabaseClient";
import ReactMarkdown from "react-markdown";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function PeopleInTheBiblePage() {
  const [people, setPeople] = useState<BiblePerson[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<BiblePerson | null>(null);
  const [personNotes, setPersonNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [loadingPeople, setLoadingPeople] = useState(true);

  // Load all people on mount
  useEffect(() => {
    async function loadPeople() {
      try {
        setLoadingPeople(true);
        const allPeople = await getAllPeople();
        setPeople(allPeople);
      } catch (err) {
        console.error("Error loading people:", err);
      } finally {
        setLoadingPeople(false);
      }
    }
    loadPeople();
  }, []);

  // Filter and sort people
  const filteredPeople = useMemo(() => {
    let filtered = people;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (person) =>
          person.name.toLowerCase().includes(query) ||
          person.normalized_name.includes(query)
      );
    }

    // Filter by selected letter
    if (selectedLetter) {
      filtered = filtered.filter((person) =>
        person.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    // Sort alphabetically
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [people, searchQuery, selectedLetter]);

  // Group people by first letter for alphabet index
  const peopleByLetter = useMemo(() => {
    const grouped: Record<string, BiblePerson[]> = {};
    people.forEach((person) => {
      const firstLetter = person.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(person);
    });
    return grouped;
  }, [people]);

  // Load or generate notes when a person is selected
  useEffect(() => {
    async function loadOrGenerateNotes() {
      if (!selectedPerson) {
        setPersonNotes(null);
        return;
      }

      try {
        setLoadingNotes(true);
        setNotesError(null);

        // Check if notes exist in database FIRST
        const existingNotes = await getPersonNotes(selectedPerson.id);

        if (existingNotes && existingNotes.trim().length > 0) {
          // Notes exist - use them
          setPersonNotes(existingNotes);
          setLoadingNotes(false);
          return;
        }

        // Notes don't exist - generate them
        const prompt = `You are Little Louis. Generate beginner-friendly notes about ${selectedPerson.name} from the Bible using this exact template and rules.

TEMPLATE
# ${selectedPerson.name}

## Overview
A short paragraph introducing who this person is and their significance in the Bible story.

## Story Summary
A clear, chronological summary of their life and key events. Keep it simple and easy to follow. Three to four paragraphs.

## Key Moments
List three to five important moments or events in their life. Each moment should be one to two sentences.

## Why This Person Matters
A paragraph explaining their role in the bigger story of the Bible and how they point to Jesus or God's plan.

RULES
- Use proper markdown formatting
- No emojis
- No cartoons or casual language
- Serious but beginner-friendly tone
- Clear, simple language
- No hyphens anywhere in the text
- No Greek or Hebrew words
- No deep theological commentary
- Keep it cinematic, warm, and simple
- Do not overwhelm beginners`;

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
        let generated = (json?.reply as string) ?? "";

        if (!generated || generated.trim().length === 0) {
          throw new Error("Generated notes are empty.");
        }

        // Enforce no-hyphen rule
        generated = generated.replace(/-/g, " ");

        // Before saving, check ONE MORE TIME if notes exist (race condition protection)
        const existingAfterGen = await getPersonNotes(selectedPerson.id);

        if (existingAfterGen && existingAfterGen.trim().length > 0) {
          // Another request created it - use existing
          setPersonNotes(existingAfterGen);
          setLoadingNotes(false);
          return; // EXIT - do not save, do not use generated text
        }

        // Save to database
        const saved = await savePersonNotes(selectedPerson.id, generated);

        if (!saved) {
          console.error("[BIBLE_PEOPLE] Failed to save notes");
        }

        // MANDATORY: Always re-read from database after upsert
        // NEVER use in-memory generated text - database is single source of truth
        const savedNotes = await getPersonNotes(selectedPerson.id);

        if (savedNotes && savedNotes.trim().length > 0) {
          setPersonNotes(savedNotes);
        } else {
          // This should never happen - log as error
          console.error("[BIBLE_PEOPLE] CRITICAL: Notes not found in database after save", { personId: selectedPerson.id });
          // Do NOT use generated text - this indicates a serious problem
          setNotesError("Notes could not be saved to database. Please try again.");
        }
      } catch (err: any) {
        console.error("Error loading or generating notes:", err);
        setNotesError(err?.message || "Failed to load notes");
      } finally {
        setLoadingNotes(false);
      }
    }

    loadOrGenerateNotes();
  }, [selectedPerson]);

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
          <h1 className="text-2xl sm:text-3xl font-bold">People in the Bible</h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Meet the real people of the Bible
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
              placeholder="Search for a name..."
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
                  const hasPeople = peopleByLetter[letter] && peopleByLetter[letter].length > 0;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => scrollToLetter(letter)}
                      className={`w-full py-1 text-xs text-center rounded transition ${
                        selectedLetter === letter
                          ? "bg-blue-500 text-white font-semibold"
                          : hasPeople
                          ? "text-blue-600 hover:bg-blue-50"
                          : "text-gray-300 cursor-default"
                      }`}
                      disabled={!hasPeople}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1">
              {loadingPeople ? (
                <div className="text-center py-12 text-gray-500">
                  Loading people...
                </div>
              ) : filteredPeople.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {searchQuery || selectedLetter
                    ? "No people found. Try a different search or letter."
                    : "No people available yet."}
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
                        {filteredPeople.map((person) => (
                          <button
                            key={person.id}
                            type="button"
                            onClick={() => setSelectedPerson(person)}
                            className="text-left px-3 py-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition text-sm"
                          >
                            {person.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Show all people grouped by letter
                    ALPHABET.map((letter) => {
                      const letterPeople = filteredPeople.filter((person) =>
                        person.name.toUpperCase().startsWith(letter)
                      );

                      if (letterPeople.length === 0) return null;

                      return (
                        <div key={letter} id={`letter-${letter}`}>
                          <h2 className="text-xl font-semibold mb-4">{letter}</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {letterPeople.map((person) => (
                              <button
                                key={person.id}
                                type="button"
                                onClick={() => setSelectedPerson(person)}
                                className="text-left px-3 py-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition text-sm"
                              >
                                {person.name}
                              </button>
                            ))}
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

      {/* PERSON PROFILE MODAL */}
      {selectedPerson && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button
              type="button"
              onClick={() => {
                setSelectedPerson(null);
                setPersonNotes(null);
                setNotesError(null);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-2">{selectedPerson.name}</h2>
            {selectedPerson.testament && (
              <p className="text-sm text-gray-600 mb-6">
                {selectedPerson.testament} Testament
              </p>
            )}

            {loadingNotes ? (
              <div className="text-center py-12 text-gray-500">
                Loading notes...
              </div>
            ) : notesError ? (
              <div className="text-center py-12 text-red-600">
                {notesError}
              </div>
            ) : personNotes ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{personNotes}</ReactMarkdown>
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

