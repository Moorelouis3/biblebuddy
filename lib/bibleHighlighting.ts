/**
 * Bible highlighting utility - processes highlighting at save-time
 * 
 * This function takes raw Bible text and applies highlights for people, places, and keywords.
 * It returns HTML with pre-applied highlight spans.
 */

import { BIBLE_PEOPLE_LIST } from "./biblePeopleList";
import { BIBLE_PLACES_LIST } from "./biblePlacesList";
import { BIBLE_KEYWORDS_LIST } from "./bibleKeywordsList";

export type HighlightTerm = {
  term: string;
  type: "person" | "place" | "keyword";
};

/**
 * Build unified list of highlight terms from all sources
 * Expands aliases and deduplicates
 */
function buildHighlightTerms(): HighlightTerm[] {
  const termMap = new Map<string, HighlightTerm>();
  
  // Add people (including aliases)
  BIBLE_PEOPLE_LIST.forEach((person) => {
    const normalizedName = person.name.toLowerCase().trim();
    if (!termMap.has(normalizedName)) {
      termMap.set(normalizedName, { term: person.name, type: "person" });
    }
    
    // Add aliases as person type
    if (person.aliases) {
      person.aliases.forEach((alias) => {
        const normalizedAlias = alias.toLowerCase().trim();
        if (!termMap.has(normalizedAlias)) {
          termMap.set(normalizedAlias, { term: alias, type: "person" });
        }
      });
    }
  });
  
  // Add places
  BIBLE_PLACES_LIST.forEach((place) => {
    const normalizedName = place.name.toLowerCase().trim();
    // Only add if not already present (person takes priority)
    if (!termMap.has(normalizedName)) {
      termMap.set(normalizedName, { term: place.name, type: "place" });
    }
  });
  
  // Add keywords
  BIBLE_KEYWORDS_LIST.forEach((keyword) => {
    const normalizedTerm = keyword.term.toLowerCase().trim();
    // Only add if not already present (person/place take priority)
    if (!termMap.has(normalizedTerm)) {
      termMap.set(normalizedTerm, { term: keyword.term, type: "keyword" });
    }
  });
  
  // Convert to array and sort by length (longest first) to match multi-word terms first
  return Array.from(termMap.values()).sort((a, b) => b.term.length - a.term.length);
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
 * Process Bible text and apply highlights
 * Returns HTML with highlight spans
 */
export function enrichBibleText(text: string): string {
  const terms = buildHighlightTerms();
  
  // Track which positions have been highlighted to prevent overlaps
  const highlightedRanges: Array<{ start: number; end: number; type: string; term: string; matchedText: string }> = [];
  
  // Sort terms by length (longest first) to match multi-word terms first
  const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);
  
  // Escape HTML in the original text
  const escapedText = escapeHtml(text);
  
  // Process each term and collect all matches
  for (const term of sortedTerms) {
    // Create regex for whole-word matching (case-insensitive)
    // Escape special regex characters in the term
    const escapedTerm = term.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedTerm}\\b`, "gi");
    
    // Find all matches in the original escaped text
    let match: RegExpExecArray | null;
    regex.lastIndex = 0;
    
    while ((match = regex.exec(escapedText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      
      // Check if this range overlaps with any existing highlight
      const overlaps = highlightedRanges.some(
        (range) => !(end <= range.start || start >= range.end)
      );
      
      if (!overlaps) {
        highlightedRanges.push({
          start,
          end,
          type: term.type,
          term: term.term,
          matchedText: match[0],
        });
      }
    }
  }
  
  // Sort all matches by start position (descending) to replace from end to beginning
  highlightedRanges.sort((a, b) => b.start - a.start);
  
  // Build the result by replacing matches from end to beginning
  let result = escapedText;
  for (const range of highlightedRanges) {
    const before = result.substring(0, range.start);
    const after = result.substring(range.end);
    const highlightSpan = `<span class="bible-highlight bible-highlight-${range.type}" data-type="${range.type}" data-term="${escapeHtml(range.term)}">${range.matchedText}</span>`;
    
    result = before + highlightSpan + after;
  }
  
  return result;
}

/**
 * Process verses array and return enriched HTML
 */
export function enrichBibleVerses(verses: Array<{ verse: number; text: string }>): string {
  const enrichedVerses = verses.map((v) => {
    const enrichedText = enrichBibleText(v.text);
    // Match the existing verse number badge style: rounded-md bg-blue-500 text-white text-[11px] font-semibold px-2 py-[2px] mr-3
    return `<p class="leading-relaxed"><span class="inline-flex items-center justify-center rounded-md bg-blue-500 text-white text-[11px] font-semibold px-2 py-[2px] mr-3">${v.verse.toString().padStart(2, "0")}</span>${enrichedText}</p>`;
  });
  
  return enrichedVerses.join("\n");
}

