/**
 * Bible highlighting utility - processes highlighting at save-time
 * 
 * This function takes raw Bible text and applies highlights for people, places, and keywords.
 * It returns HTML with pre-applied highlight spans.
 * 
 * CRITICAL: Each entity is highlighted ONLY ONCE per chapter (first occurrence only).
 */

import { supabase } from "./supabaseClient";

export type HighlightTerm = {
  term: string;
  type: "person" | "place" | "keyword";
  lookupKey: string;
};

/**
 * Stop words that should NEVER be highlighted
 */
const STOP_WORDS = new Set([
  "house",
  "day",
  "night",
  "light",
  "darkness",
  "so",
  "on",
  "the",
  "and",
  "was",
  "is",
]);

/**
 * Normalize text to lowercase for matching and lookup
 */
function normalizeToLookupKey(text: string): string {
  return text.toLowerCase().trim();
}

/**
 * Load all highlight terms from database tables
 */
async function loadAllHighlightTerms(): Promise<HighlightTerm[]> {
  const terms: HighlightTerm[] = [];
  const usedLookupKeys = new Set<string>();

  try {
    // Load people from bible_people_notes
    const { data: people, error: peopleError } = await supabase
      .from("bible_people_notes")
      .select("person_name");

    if (peopleError) {
      console.error("Error loading people for highlighting:", peopleError);
    } else if (people) {
      people.forEach((p) => {
        if (p.person_name) {
          const lookupKey = normalizeToLookupKey(p.person_name);
          // Skip if already added or is a stop word
          if (!usedLookupKeys.has(lookupKey) && !STOP_WORDS.has(lookupKey)) {
            terms.push({
              term: p.person_name.trim(), // Preserve original casing
              type: "person",
              lookupKey,
            });
            usedLookupKeys.add(lookupKey);
          }
        }
      });
    }

    // Load places from places_in_the_bible_notes
    const { data: places, error: placesError } = await supabase
      .from("places_in_the_bible_notes")
      .select("place");

    if (placesError) {
      console.error("Error loading places for highlighting:", placesError);
    } else if (places) {
      places.forEach((p) => {
        if (p.place) {
          const lookupKey = normalizeToLookupKey(p.place);
          // Only add if not already a person (person beats place) and not a stop word
          if (!usedLookupKeys.has(lookupKey) && !STOP_WORDS.has(lookupKey)) {
            terms.push({
              term: p.place.trim(), // Preserve original casing
              type: "place",
              lookupKey,
            });
            usedLookupKeys.add(lookupKey);
          }
        }
      });
    }

    // Load keywords from keywords_in_the_bible
    const { data: keywords, error: keywordsError } = await supabase
      .from("keywords_in_the_bible")
      .select("keyword");

    if (keywordsError) {
      console.error("Error loading keywords for highlighting:", keywordsError);
    } else if (keywords) {
      keywords.forEach((k) => {
        if (k.keyword) {
          const lookupKey = normalizeToLookupKey(k.keyword);
          // Only add if not already a person or place (person/place beat keyword) and not a stop word
          if (!usedLookupKeys.has(lookupKey) && !STOP_WORDS.has(lookupKey)) {
            terms.push({
              term: k.keyword.trim(), // Preserve original casing
              type: "keyword",
              lookupKey,
            });
            usedLookupKeys.add(lookupKey);
          }
        }
      });
    }
  } catch (err) {
    console.error("Error loading highlight terms:", err);
  }

  return terms;
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
  // Load all highlight terms from database
  const allTerms = await loadAllHighlightTerms();

  // Sort by longest string first (prevents "David" matching inside "City of David")
  const sortedTerms = [...allTerms].sort((a, b) => b.term.length - a.term.length);

  // Track which lookup keys have been highlighted (once per chapter)
  const usedTerms = new Set<string>();

  // Process each verse, but track highlights across all verses
  const enrichedVerses = verses.map((v) => {
    // Escape HTML in the verse text
    const escapedText = escapeHtml(v.text);

    // Collect matches for this verse
    const matches: Array<{
      start: number;
      end: number;
      type: "person" | "place" | "keyword";
      term: string;
      matchedText: string;
    }> = [];

    // Walk through each term (sorted longest first)
    for (const highlightTerm of sortedTerms) {
      // Check if this term already highlighted (once per chapter)
      if (usedTerms.has(highlightTerm.lookupKey)) {
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
          usedTerms.add(highlightTerm.lookupKey);
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
