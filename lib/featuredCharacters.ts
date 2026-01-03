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
 * Create a map of all search terms (names + aliases) to character data
 */
export function createCharacterSearchMap(characters: FeaturedCharacter[]): Map<string, FeaturedCharacter> {
  const map = new Map<string, FeaturedCharacter>();
  
  for (const char of characters) {
    // Add the main name (lowercase key for case-insensitive matching)
    map.set(char.name.toLowerCase(), char);
    
    // Add all aliases (lowercase keys)
    for (const alias of char.aliases || []) {
      if (alias && alias.trim()) {
        map.set(alias.toLowerCase(), char);
      }
    }
  }
  
  return map;
}

/**
 * Get all search terms sorted by length (longest first) for proper matching
 */
export function getSearchTerms(characters: FeaturedCharacter[]): Array<{ term: string; character: FeaturedCharacter }> {
  const terms: Array<{ term: string; character: FeaturedCharacter }> = [];
  
  for (const char of characters) {
    terms.push({ term: char.name, character: char });
    for (const alias of char.aliases || []) {
      if (alias && alias.trim()) {
        terms.push({ term: alias, character: char });
      }
    }
  }
  
  // Sort by length descending (match longer names first, e.g., "John the Baptist" before "John")
  return terms.sort((a, b) => b.term.length - a.term.length);
}

/**
 * Escape special regex characters
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
