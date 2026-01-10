/**
 * Bible highlighting utility - processes highlighting at save-time
 * 
 * Uses the SAME lists as the UI pages (people-in-the-bible, places-in-the-bible, keywords-in-the-bible)
 * Database is ONLY used when a word is clicked (for notes lookup), never for detection.
 * 
 * RULES:
 * - People: Highlight EVERY occurrence (BLUE)
 * - Places: Highlight EVERY occurrence, priority over people (GREEN)
 * - Keywords: 3-layer system (DARK RED)
 *   - Layer 1 (Narrative-Critical): Every occurrence
 *   - Layer 2 (Cultural/Historical): First per section
 *   - Layer 3 (Theological/Abstract): Once per chapter
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
 * Determine keyword layer (1, 2, or 3) based on keyword type
 * Layer 1: Narrative-Critical (pit, blood, silver, coat of many colors, flock, slave, dream)
 * Layer 2: Cultural/Historical (balm, myrrh, cistern, sackcloth, signet ring)
 * Layer 3: Theological/Abstract (covenant, redemption, inheritance)
 */
function getKeywordLayer(term: string): 1 | 2 | 3 {
  const termLower = term.toLowerCase().trim();
  
  // Layer 1: Narrative-Critical - concrete objects/actions in stories
  // Examples: pit, blood, silver, coat of many colors, flock, slave, dream
  const layer1Keywords = [
    "pit", "blood", "silver", "coat of many colors", "flock", "slave", "dream",
    "robe", "sheep", "goat", "donkey", "camel", "ox", "bull", "ram", "ewe",
    "lamb", "chariot", "sword", "bow", "arrow", "spear", "shield", "staff",
    "rod", "scepter", "crown", "ring", "seal", "scroll", "tablet", "stone",
    "altar", "tent", "house", "tower", "wall", "gate", "well", "spring",
    "river", "sea", "mountain", "hill", "valley", "field", "vineyard",
    "grain", "wheat", "barley", "bread", "wine", "oil", "water", "fire",
    "smoke", "cloud", "wind", "rain", "snow", "ice", "thunder", "lightning",
    "horse", "mule", "ass", "beast", "animal", "bird", "fish", "serpent",
    "lion", "wolf", "bear", "deer", "dove", "raven", "eagle", "vulture"
  ];
  
  // Layer 2: Cultural/Historical - cultural artifacts and practices
  // Examples: balm, myrrh, cistern, sackcloth, signet ring
  const layer2Keywords = [
    "balm", "myrrh", "frankincense", "cistern", "sackcloth", "signet ring",
    "ephod", "breastplate", "phylacteries", "mezuzah", "tallit", "yoke",
    "millstone", "threshing floor", "winepress", "granary", "storehouse",
    "temple treasury", "money changer", "denarius", "talent", "shekel",
    "cubit", "measure", "basket", "jar", "pot", "vessel", "lamp", "candle",
    "candlestick", "lampstand", "censer", "incense", "anointing oil",
    "burnt offering", "grain offering", "sin offering", "peace offering",
    "wave offering", "drink offering", "trespass offering", "thank offering",
    "dry cistern", "waterless pit", "sackcloth and ashes", "torn garments"
  ];
  
  // Layer 3: Theological/Abstract - abstract concepts
  // Examples: covenant, redemption, inheritance
  const layer3Keywords = [
    "covenant", "redemption", "inheritance", "atonement", "salvation",
    "justification", "sanctification", "regeneration", "propitiation",
    "expiation", "reconciliation", "adoption", "election", "predestination",
    "foreknowledge", "glorification", "resurrection", "transfiguration",
    "incarnation", "parousia", "millennium", "tribulation", "rapture"
  ];
  
  // Check exact matches first (most specific)
  if (layer1Keywords.includes(termLower)) {
    return 1;
  }
  if (layer2Keywords.includes(termLower)) {
    return 2;
  }
  if (layer3Keywords.includes(termLower)) {
    return 3;
  }
  
  // Check if term contains or is contained in any layer 1 keyword
  for (const keyword of layer1Keywords) {
    if (termLower.includes(keyword) || keyword.includes(termLower)) {
      return 1;
    }
  }
  
  // Check if term contains or is contained in any layer 2 keyword
  for (const keyword of layer2Keywords) {
    if (termLower.includes(keyword) || keyword.includes(termLower)) {
      return 2;
    }
  }
  
  // Check if term contains or is contained in any layer 3 keyword
  for (const keyword of layer3Keywords) {
    if (termLower.includes(keyword) || keyword.includes(termLower)) {
      return 3;
    }
  }
  
  // Default to Layer 3: Theological/Abstract (most keywords are abstract concepts)
  return 3;
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
 * 
 * PEOPLE: Highlight EVERY occurrence (BLUE)
 * PLACES: Highlight EVERY occurrence, priority over people (GREEN)
 * KEYWORDS: 3-layer system (DARK RED)
 */
export async function enrichBibleVerses(
  verses: Array<{ verse: number; text: string }>
): Promise<string> {
  // Get lists from UI pages (same source as people/places/keywords pages)
  const peopleNames = getPeopleNames();
  const placeNames = getPlaceNames();

  // Deduplicate keyword terms (case-insensitive)
  const keywordNamesSet = new Set<string>();
  const keywordNames: string[] = [];
  getKeywordNames().forEach((term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const key = trimmed.toLowerCase();
    if (keywordNamesSet.has(key)) return;
    keywordNamesSet.add(key);
    keywordNames.push(trimmed);
  });

  // Build separate lists with type information
  type HighlightTerm = {
    term: string;
    type: "people" | "places" | "keywords";
    layer?: 1 | 2 | 3; // For keywords only
  };

  const peopleTerms: HighlightTerm[] = [];
  const placeTerms: HighlightTerm[] = [];
  const keywordTerms: HighlightTerm[] = [];

  // Add people
  peopleNames.forEach((name) => {
    peopleTerms.push({ term: name.trim(), type: "people" });
  });

  // Add places (places take priority over people)
  const peopleSet = new Set(peopleNames.map((n) => n.toLowerCase().trim()));
  placeNames.forEach((name) => {
    const normalized = name.toLowerCase().trim();
    // Only add if not already a person (places take priority)
    if (!peopleSet.has(normalized)) {
      placeTerms.push({ term: name.trim(), type: "places" });
    }
  });

  // Add keywords (only if not already a person or place)
  const placesSet = new Set(placeNames.map((n) => n.toLowerCase().trim()));
  keywordNames.forEach((name) => {
    const normalized = name.toLowerCase().trim();
    if (!peopleSet.has(normalized) && !placesSet.has(normalized)) {
      const layer = getKeywordLayer(name);
      keywordTerms.push({ term: name.trim(), type: "keywords", layer });
    }
  });

  // Sort all terms by longest string first (prevents "David" matching inside "City of David")
  peopleTerms.sort((a, b) => b.term.length - a.term.length);
  placeTerms.sort((a, b) => b.term.length - a.term.length);
  keywordTerms.sort((a, b) => b.term.length - a.term.length);

  // Process each verse
  const enrichedVerses = verses.map((v, verseIndex) => {
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

    // Process PLACES first (they take priority)
    for (const highlightTerm of placeTerms) {
      const escapedTerm = highlightTerm.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedTerm}\\b`, "gi");
      
      // Find ALL matches in this verse (not just first)
      let match;
      regex.lastIndex = 0;
      while ((match = regex.exec(escapedText)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        
        // Check if this range overlaps with any existing highlight
        const overlaps = matches.some(
          (m) => !(end <= m.start || start >= m.end)
        );
        
        if (!overlaps) {
          matches.push({
            start,
            end,
            type: "places",
            term: highlightTerm.term,
            matchedText: match[0],
          });
        }
      }
    }

    // Process PEOPLE (every occurrence)
    for (const highlightTerm of peopleTerms) {
      const escapedTerm = highlightTerm.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedTerm}\\b`, "gi");
      
      // For people names, only match if capitalized (proper noun)
      const termLower = highlightTerm.term.toLowerCase();
      const shortCommonWords = ["on", "in", "at", "to", "of", "is", "it", "as", "an", "am", "be", "do", "go", "if", "my", "no", "or", "so", "up", "us", "we", "put"];
      
      // Find ALL matches in this verse
      let match;
      regex.lastIndex = 0;
      while ((match = regex.exec(escapedText)) !== null) {
        const matchedText = match[0];
        const firstChar = matchedText.charAt(0);
        
        // Capitalization check for people
        if (shortCommonWords.includes(termLower) && termLower.length <= 3) {
          const isUpperCaseLetter = /^[A-Z]/.test(firstChar);
          if (!isUpperCaseLetter) {
            continue; // Skip lowercase common words
          }
        } else {
          const isUpperCaseLetter = /^[A-Z]/.test(firstChar);
          if (!isUpperCaseLetter) {
            continue; // Skip - not capitalized, likely a common word
          }
        }
        
        const start = match.index;
        const end = start + match[0].length;
        
        // Check if this range overlaps with any existing highlight
        const overlaps = matches.some(
          (m) => !(end <= m.start || start >= m.end)
        );
        
        if (!overlaps) {
          matches.push({
            start,
            end,
            type: "people",
            term: highlightTerm.term,
            matchedText: match[0],
          });
        }
      }
    }

    // Process KEYWORDS (highlight EVERY occurrence)
    for (const highlightTerm of keywordTerms) {
      const escapedTerm = highlightTerm.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedTerm}\\b`, "gi");
      
      // Find ALL matches in this verse
      regex.lastIndex = 0;
      let match;
      while ((match = regex.exec(escapedText)) !== null) {
        const start = match.index;
        const end = start + match[0].length;

        // Check if this range overlaps with any existing highlight
        const overlaps = matches.some(
          (m) => !(end <= m.start || start >= m.end)
        );

        if (!overlaps) {
          matches.push({
            start,
            end,
            type: "keywords",
            term: highlightTerm.term,
            matchedText: match[0],
          });
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

/**
 * Process plain text and return enriched HTML (for devotionals, notes, etc.)
 * 
 * Same highlighting rules as enrichBibleVerses, but for plain text without verse numbers
 * PEOPLE: Highlight EVERY occurrence (BLUE)
 * PLACES: Highlight EVERY occurrence, priority over people (GREEN)
 * KEYWORDS: Highlight EVERY occurrence (DARK RED)
 * 
 * This function is synchronous and can be called client-side
 */
export function enrichPlainText(text: string): string {
  // Get lists from UI pages (same source as people/places/keywords pages)
  const peopleNames = getPeopleNames();
  const placeNames = getPlaceNames();

  // Deduplicate keyword terms (case-insensitive)
  const keywordNamesSet = new Set<string>();
  const keywordNames: string[] = [];
  getKeywordNames().forEach((term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const key = trimmed.toLowerCase();
    if (keywordNamesSet.has(key)) return;
    keywordNamesSet.add(key);
    keywordNames.push(trimmed);
  });

  // Build separate lists with type information
  type HighlightTerm = {
    term: string;
    type: "people" | "places" | "keywords";
    layer?: 1 | 2 | 3; // For keywords only
  };

  const peopleTerms: HighlightTerm[] = [];
  const placeTerms: HighlightTerm[] = [];
  const keywordTerms: HighlightTerm[] = [];

  // Add people
  peopleNames.forEach((name) => {
    peopleTerms.push({ term: name.trim(), type: "people" });
  });

  // Add places (places take priority over people)
  const peopleSet = new Set(peopleNames.map((n) => n.toLowerCase().trim()));
  placeNames.forEach((name) => {
    const normalized = name.toLowerCase().trim();
    // Only add if not already a person (places take priority)
    if (!peopleSet.has(normalized)) {
      placeTerms.push({ term: name.trim(), type: "places" });
    }
  });

  // Add keywords (only if not already a person or place)
  const placesSet = new Set(placeNames.map((n) => n.toLowerCase().trim()));
  keywordNames.forEach((name) => {
    const normalized = name.toLowerCase().trim();
    if (!peopleSet.has(normalized) && !placesSet.has(normalized)) {
      const layer = getKeywordLayer(name);
      keywordTerms.push({ term: name.trim(), type: "keywords", layer });
    }
  });

  // Sort all terms by longest string first (prevents "David" matching inside "City of David")
  peopleTerms.sort((a, b) => b.term.length - a.term.length);
  placeTerms.sort((a, b) => b.term.length - a.term.length);
  keywordTerms.sort((a, b) => b.term.length - a.term.length);

  // Escape HTML in the text
  const escapedText = escapeHtml(text);

  // Collect matches
  const matches: Array<{
    start: number;
    end: number;
    type: "people" | "places" | "keywords";
    term: string;
    matchedText: string;
  }> = [];

  // Process PLACES first (they take priority)
  for (const highlightTerm of placeTerms) {
    const escapedTerm = highlightTerm.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedTerm}\\b`, "gi");
    
    // Find ALL matches (not just first)
    let match;
    regex.lastIndex = 0;
    while ((match = regex.exec(escapedText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      
      // Check if this range overlaps with any existing highlight
      const overlaps = matches.some(
        (m) => !(end <= m.start || start >= m.end)
      );
      
      if (!overlaps) {
        matches.push({
          start,
          end,
          type: "places",
          term: highlightTerm.term,
          matchedText: match[0],
        });
      }
    }
  }

  // Process PEOPLE (every occurrence)
  for (const highlightTerm of peopleTerms) {
    const escapedTerm = highlightTerm.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedTerm}\\b`, "gi");
    
    // For people names, only match if capitalized (proper noun)
    const termLower = highlightTerm.term.toLowerCase();
    const shortCommonWords = ["on", "in", "at", "to", "of", "is", "it", "as", "an", "am", "be", "do", "go", "if", "my", "no", "or", "so", "up", "us", "we", "put"];
    
    // Find ALL matches
    let match;
    regex.lastIndex = 0;
    while ((match = regex.exec(escapedText)) !== null) {
      const matchedText = match[0];
      const firstChar = matchedText.charAt(0);
      
      // Capitalization check for people
      if (shortCommonWords.includes(termLower) && termLower.length <= 3) {
        const isUpperCaseLetter = /^[A-Z]/.test(firstChar);
        if (!isUpperCaseLetter) {
          continue; // Skip lowercase common words
        }
      } else {
        const isUpperCaseLetter = /^[A-Z]/.test(firstChar);
        if (!isUpperCaseLetter) {
          continue; // Skip - not capitalized, likely a common word
        }
      }
      
      const start = match.index;
      const end = start + match[0].length;
      
      // Check if this range overlaps with any existing highlight
      const overlaps = matches.some(
        (m) => !(end <= m.start || start >= m.end)
      );
      
      if (!overlaps) {
        matches.push({
          start,
          end,
          type: "people",
          term: highlightTerm.term,
          matchedText: match[0],
        });
      }
    }
  }

  // Process KEYWORDS (highlight EVERY occurrence)
  for (const highlightTerm of keywordTerms) {
    const escapedTerm = highlightTerm.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedTerm}\\b`, "gi");
    
    // Find ALL matches
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(escapedText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Check if this range overlaps with any existing highlight
      const overlaps = matches.some(
        (m) => !(end <= m.start || start >= m.end)
      );

      if (!overlaps) {
        matches.push({
          start,
          end,
          type: "keywords",
          term: highlightTerm.term,
          matchedText: match[0],
        });
      }
    }
  }

  // Sort matches by start position (descending) to replace from end to beginning
  matches.sort((a, b) => b.start - a.start);

  // Build the enriched text
  let enrichedText = escapedText;
  for (const match of matches) {
    const before = enrichedText.substring(0, match.start);
    const after = enrichedText.substring(match.end);
    // Use original cased term in data-term attribute
    const highlightSpan = `<span class="bible-highlight bible-highlight-${match.type}" data-type="${match.type}" data-term="${escapeHtml(match.term)}">${match.matchedText}</span>`;

    enrichedText = before + highlightSpan + after;
  }

  // Preserve paragraph structure from original text
  // Split by double newlines to preserve paragraphs, then join with proper HTML
  const paragraphs = enrichedText.split(/\n\s*\n/).filter(p => p.trim());
  if (paragraphs.length === 0) {
    // Single paragraph or no breaks - split by single newlines and create paragraphs
    // This improves readability for long blocks of text
    const lines = enrichedText.split(/\n/).filter(line => line.trim());
    if (lines.length === 0) {
      return `<p class="leading-relaxed">${enrichedText}</p>`;
    }
    // Group lines into paragraphs (each line becomes a paragraph if blank line before it)
    return lines.map(line => `<p class="leading-relaxed mb-4">${line.trim()}</p>`).join('\n');
  }
  // Multiple paragraphs - preserve structure with spacing
  return paragraphs.map(p => {
    // Within each paragraph, handle single line breaks
    const lines = p.split(/\n/).filter(line => line.trim());
    if (lines.length === 1) {
      return `<p class="leading-relaxed mb-4">${lines[0].trim()}</p>`;
    }
    // Multiple lines in a paragraph - join with space, wrap in single paragraph
    return `<p class="leading-relaxed mb-4">${lines.join(' ').trim()}</p>`;
  }).join('\n');
}
