"use client";

import { useState, useMemo } from "react";

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

export default function KeywordsInTheBiblePage() {
  const [keywords] = useState<BibleKeyword[]>(createStaticKeywords());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<BibleKeyword | null>(null);

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
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-2">{selectedKeyword.name}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

