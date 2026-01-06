/**
 * Bible highlighting utility - processes highlighting at save-time
 * 
 * Uses the SAME lists as the UI pages (people-in-the-bible, places-in-the-bible, keywords-in-the-bible)
 * Database is ONLY used when a word is clicked (for notes lookup), never for detection.
 * 
 * CRITICAL: Each term is highlighted ONLY ONCE per chapter (first occurrence only).
 */

import { BIBLE_PEOPLE_LIST } from "./biblePeopleList";
import { BIBLE_PLACES_LIST } from "./biblePlacesList";
import { BIBLE_KEYWORDS_LIST } from "./bibleKeywordsList";

/**
 * Extract plain string arrays from the UI page lists
 */
function getPeopleNames(): string[] {
  const names: string[] = [];
  BIBLE_PEOPLE_LIST.forEach((person) => {
    names.push(person.name);
    // Include aliases
    if (person.aliases) {
      names.push(...person.aliases);
    }
  });
  return names;
}

function getPlaceNames(): string[] {
  return BIBLE_PLACES_LIST.map((place) => place.name);
}

function getKeywordNames(): string[] {
  return BIBLE_KEYWORDS_LIST.map((keyword) => keyword.term);
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Process verses array and return enriched HTML
 * CRITICAL: Each term is highlighted ONLY ONCE per chapter (first occurrence only)
 */
export async function enrichBibleVerses(
  verses: Array<{ verse: number; text: string }>
): Promise<string> {
  // Get lists from UI pages (same source as people/places/keywords pages)
  const peopleNames = getPeopleNames();
  const placeNames = getPlaceNames();
  const keywordNames = getKeywordNames();

  // Build unified list with type information
  type HighlightTerm = {
    term: string;
    type: "people" | "places" | "keywords";
  };

  const allTerms: HighlightTerm[] = [];

  // Add people first (priority: people > places > keywords)
  peopleNames.forEach((name) => {
    allTerms.push({ term: name.trim(), type: "people" });
  });

  // Add places (only if not already a person)
  const peopleSet = new Set(peopleNames.map((n) => n.toLowerCase().trim()));
  placeNames.forEach((name) => {
    const normalized = name.toLowerCase().trim();
    if (!peopleSet.has(normalized)) {
      allTerms.push({ term: name.trim(), type: "places" });
    }
  });

  // Add keywords (only if not already a person or place)
  const placesSet = new Set(placeNames.map((n) => n.toLowerCase().trim()));
  keywordNames.forEach((name) => {
    const normalized = name.toLowerCase().trim();
    if (!peopleSet.has(normalized) && !placesSet.has(normalized)) {
      allTerms.push({ term: name.trim(), type: "keywords" });
    }
  });

  // Sort by longest string first (prevents "David" matching inside "City of David")
  allTerms.sort((a, b) => b.term.length - a.term.length);

  // Track which terms have been highlighted (once per chapter)
  const usedTerms = new Set<string>();

  // Process each verse, but track highlights across all verses
  const enrichedVerses = verses.map((v) => {
    // Escape HTML in the verse text
    const escapedText = escapeHtml(v.text);

    // Collect matches for this verse
    const matches: Array<{
      start: number;
      end: number;
      type: "people" | "places" | "keywords";
      term: string;
      matchedText: string;
    }> = [];

    // Walk through each term (sorted longest first)
    for (const highlightTerm of allTerms) {
      // Check if this term already highlighted (once per chapter)
      const lookupKey = highlightTerm.term.toLowerCase().trim();
      if (usedTerms.has(lookupKey)) {
        continue; // Skip - already highlighted once in this chapter
      }

      // Create regex for whole-word matching (case-insensitive)
      // Escape special regex characters
      const escapedTerm = highlightTerm.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedTerm}\\b`, "gi");

      // Find first match in this verse
      regex.lastIndex = 0;
      const match = regex.exec(escapedText);

      if (match) {
        // For people names, only match if the matched text starts with a capital letter
        // This prevents common words like "on", "put", "in" from being highlighted as people
        if (highlightTerm.type === "people") {
          const matchedText = match[0];
          const firstChar = matchedText.charAt(0);
          // Only match if first character is uppercase (proper noun)
          // Skip if first character is lowercase (common word)
          if (firstChar !== firstChar.toUpperCase()) {
            continue; // Skip - not capitalized, likely a common word
          }
        }

        const start = match.index;
        const end = start + match[0].length;

        // Check if this range overlaps with any existing highlight in this verse
        const overlaps = matches.some(
          (m) => !(end <= m.start || start >= m.end)
        );

        if (!overlaps) {
          matches.push({
            start,
            end,
            type: highlightTerm.type,
            term: highlightTerm.term, // Original cased text
            matchedText: match[0], // Matched text from verse
          });

          // Mark as used (across all verses)
          usedTerms.add(lookupKey);
        }
      }
    }

    // Sort matches by start position (descending) to replace from end to beginning
    matches.sort((a, b) => b.start - a.start);

    // Build the enriched text for this verse
    let enrichedText = escapedText;
    for (const match of matches) {
      const before = enrichedText.substring(0, match.start);
      const after = enrichedText.substring(match.end);
      // Use original cased term in data-term attribute
      const highlightSpan = `<span class="bible-highlight bible-highlight-${match.type}" data-type="${match.type}" data-term="${escapeHtml(match.term)}">${match.matchedText}</span>`;

      enrichedText = before + highlightSpan + after;
    }

    // Match the existing verse number badge style
    return `<p class="leading-relaxed"><span class="inline-flex items-center justify-center rounded-md bg-blue-500 text-white text-[11px] font-semibold px-2 py-[2px] mr-3">${v.verse.toString().padStart(2, "0")}</span>${enrichedText}</p>`;
  });

  return enrichedVerses.join("\n");
}
