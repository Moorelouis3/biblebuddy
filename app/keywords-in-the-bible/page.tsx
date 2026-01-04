"use client";

import { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../lib/supabaseClient";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Static list of Bible keywords
const STATIC_KEYWORDS_NAMES = [
  "Abomination",
  "Altar",
  "Amen",
  "Anointing",
  "Apostle",
  "Ark",
  "Atonement",
  "Baptism",
  "Blessing",
  "Blood",
  "Born Again",
  "Bread",
  "Calling",
  "Census",
  "Cleansing",
  "Commandment",
  "Compassion",
  "Consecration",
  "Covenant",
  "Creation",
  "Curse",
  "Day of the Lord",
  "Decree",
  "Deliverance",
  "Demon",
  "Disciple",
  "Divination",
  "Doctrine",
  "Election",
  "End Times",
  "Eternal Life",
  "Exile",
  "Faith",
  "Fasting",
  "Fear of the Lord",
  "Fellowship",
  "Firstborn",
  "Forgiveness",
  "Fruit of the Spirit",
  "Gifts of the Spirit",
  "Glory",
  "Grace",
  "High Priest",
  "Holiness",
  "Idol",
  "Idolatry",
  "Inheritance",
  "Intercession",
  "Israelite",
  "Judge",
  "Judgment",
  "Justification",
  "Kingdom of God",
  "Law",
  "Levite",
  "Light",
  "Living Water",
  "Love",
  "Messiah",
  "Mercy",
  "Miracle",
  "Obedience",
  "Offering",
  "Oil",
  "Only Begotten",
  "Ordination",
  "Parable",
  "Passover",
  "Pentecost",
  "Pharisee",
  "Prayer",
  "Priest",
  "Prophecy",
  "Prophet",
  "Purification",
  "Ransom",
  "Redemption",
  "Regeneration",
  "Repentance",
  "Resurrection",
  "Righteousness",
  "Sabbath",
  "Sacrifice",
  "Salvation",
  "Sanctification",
  "Scribe",
  "Scripture",
  "Seed",
  "Servant",
  "Shepherd",
  "Sin",
  "Soul",
  "Spirit",
  "Synagogue",
  "Tabernacle",
  "Teacher",
  "Temple Worship",
  "Testament",
  "Testimony",
  "Torah",
  "Transgression",
  "Trinity",
  "Truth",
  "Unclean",
  "Vow",
  "Worship",
  "Wrath",
  "Yoke",
];

type BibleKeyword = {
  id: string;
  name: string;
  normalized_name: string;
};

// Convert names to BibleKeyword objects
function createStaticKeywords(): BibleKeyword[] {
  return STATIC_KEYWORDS_NAMES.map((name, index) => ({
    id: `static-${index}-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    name: name,
    normalized_name: name.toLowerCase().trim(),
  }));
}

function normalizeKeywordMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function KeywordsInTheBiblePage() {
  const [keywords] = useState<BibleKeyword[]>(createStaticKeywords());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<BibleKeyword | null>(null);
  const [keywordNotes, setKeywordNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);

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

  // Generate notes when a keyword is selected
  useEffect(() => {
    async function generateNotes() {
      if (!selectedKeyword) {
        setKeywordNotes(null);
        return;
      }

      try {
        setLoadingNotes(true);
        setNotesError(null);

        // Normalize: lowercase, trim
        const keywordKey = selectedKeyword.name.toLowerCase().trim();

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
  }, [selectedKeyword]);

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
                        {filteredKeywords.map((keyword) => (
                          <button
                            key={keyword.id}
                            type="button"
                            onClick={() => setSelectedKeyword(keyword)}
                            className="text-left px-3 py-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition text-sm"
                          >
                            {keyword.name}
                          </button>
                        ))}
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
                            {letterKeywords.map((keyword) => (
                              <button
                                key={keyword.id}
                                type="button"
                                onClick={() => setSelectedKeyword(keyword)}
                                className="text-left px-3 py-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition text-sm"
                              >
                                {keyword.name}
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

            {loadingNotes ? (
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

