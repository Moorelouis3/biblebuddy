// lib/featuredCharacters.ts
// Utility functions for Featured Bible Characters feature (Matthew only)

import { supabase } from "./supabaseClient";

export type FeaturedCharacter = {
  id: string;
  name: string;
  aliases: string[];
  short_description: string;
  long_description: string;
  era: string;
  role: string;
  key_verse: string;
};

/**
 * Fetch featured Bible characters for Matthew book only
 */
export async function getFeaturedCharactersForMatthew(): Promise<FeaturedCharacter[]> {
  try {
    const { data, error } = await supabase
      .from("featured_bible_characters")
      .select("*")
      .eq("book", "Matthew");

    if (error) {
      console.error("[FEATURED_CHARACTERS] Error fetching characters:", error);
      return [];
    }

    // Parse aliases from JSON string if needed
    return (data || []).map((char) => ({
      ...char,
      aliases: typeof char.aliases === "string" 
        ? JSON.parse(char.aliases) 
        : (char.aliases || []),
    }));
  } catch (err) {
    console.error("[FEATURED_CHARACTERS] Error in getFeaturedCharactersForMatthew:", err);
    return [];
  }
}

/**
 * Create a map of character names/aliases to character data for efficient lookup
 */
export function createCharacterMap(characters: FeaturedCharacter[]): Map<string, FeaturedCharacter> {
  const map = new Map<string, FeaturedCharacter>();
  
  for (const char of characters) {
    // Add the main name (case-insensitive key)
    map.set(char.name.toLowerCase(), char);
    
    // Add all aliases (case-insensitive keys)
    for (const alias of char.aliases || []) {
      map.set(alias.toLowerCase(), char);
    }
  }
  
  return map;
}

export type TextPart = 
  | { type: "text"; content: string }
  | { type: "character"; content: string; character: FeaturedCharacter; startIndex: number };

/**
 * Match character names in text and return an array of parts
 * Returns an array of text parts and character parts for rendering
 */
export function highlightCharactersInText(
  text: string,
  characterMap: Map<string, FeaturedCharacter>
): TextPart[] {
  if (!text || characterMap.size === 0) {
    return [{ type: "text", content: text }];
  }

  const result: TextPart[] = [];
  let lastIndex = 0;
  
  // Create a sorted array of all search terms (names + aliases) by length (longest first)
  // This ensures we match longer names before shorter ones (e.g., "John the Baptist" before "John")
  const searchTerms: Array<{ term: string; character: FeaturedCharacter }> = [];
  characterMap.forEach((char) => {
    searchTerms.push({ term: char.name, character: char });
    (char.aliases || []).forEach((alias) => {
      searchTerms.push({ term: alias, character: char });
    });
  });
  
  // Sort by length descending
  searchTerms.sort((a, b) => b.term.length - a.term.length);
  
  // Find all matches with their positions
  const matches: Array<{ start: number; end: number; character: FeaturedCharacter; term: string }> = [];
  
  for (const { term, character } of searchTerms) {
    const regex = new RegExp(`\\b${escapeRegex(term)}\\b`, "gi");
    let match;
    let searchText = text; // Create a copy for this search
    while ((match = regex.exec(searchText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      
      // Check if this match overlaps with an existing match (prefer longer matches)
      const overlaps = matches.some(
        (m) => (start >= m.start && start < m.end) || (end > m.start && end <= m.end) || (start <= m.start && end >= m.end)
      );
      
      if (!overlaps) {
        matches.push({ start, end, character, term: match[0] });
      }
    }
  }
  
  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);
  
  // Remove overlapping matches (keep first/longest)
  const nonOverlappingMatches: typeof matches = [];
  for (const match of matches) {
    const overlaps = nonOverlappingMatches.some(
      (m) => (match.start >= m.start && match.start < m.end) || (match.end > m.start && match.end <= m.end)
    );
    if (!overlaps) {
      nonOverlappingMatches.push(match);
    }
  }
  
  // Build result array
  for (const match of nonOverlappingMatches) {
    // Add text before match
    if (match.start > lastIndex) {
      result.push({ type: "text", content: text.substring(lastIndex, match.start) });
    }
    
    // Add character match
    result.push({
      type: "character",
      content: match.term,
      character: match.character,
      startIndex: match.start,
    });
    
    lastIndex = match.end;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    result.push({ type: "text", content: text.substring(lastIndex) });
  }
  
  return result.length > 0 ? result : [{ type: "text", content: text }];
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

