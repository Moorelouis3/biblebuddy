/**
 * Bible highlighting utility - processes highlighting at save-time
 * 
 * This function takes raw Bible text and applies highlights for people, places, and keywords.
 * It returns HTML with pre-applied highlight spans.
 * 
 * CRITICAL: Each entity is highlighted ONLY ONCE per chapter.
 */

import { supabase } from "./supabaseClient";
import { BIBLE_PEOPLE_LIST } from "./biblePeopleList";

export type HighlightEntity = {
  type: "person" | "place" | "keyword";
  primary: string;
  aliases: string[];
  normalized: string;
};

/**
 * Normalize text for matching (lowercase, trim, collapse whitespace, strip punctuation)
 */
function normalizeForMatching(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ") // collapse whitespace
    .replace(/[.,;:!?'"()[\]{}]/g, ""); // strip punctuation
}

/**
 * Normalize text but preserve original casing for display
 */
function preserveCase(text: string): string {
  return text.trim();
}

/**
 * Load all entities from database tables
 */
async function loadAllEntities(): Promise<HighlightEntity[]> {
  const entities: HighlightEntity[] = [];

  try {
    // Load people from bible_people_notes
    const { data: people, error: peopleError } = await supabase
      .from("bible_people_notes")
      .select("person_name");

    if (peopleError) {
      console.error("Error loading people for highlighting:", peopleError);
    } else if (people) {
      // Also include aliases from BIBLE_PEOPLE_LIST
      const peopleMap = new Map<string, string[]>();
      BIBLE_PEOPLE_LIST.forEach((person) => {
        const normalized = normalizeForMatching(person.name);
        if (!peopleMap.has(normalized)) {
          peopleMap.set(normalized, []);
        }
        if (person.aliases) {
          peopleMap.get(normalized)!.push(...person.aliases);
        }
      });

      people.forEach((p) => {
        if (p.person_name) {
          const normalized = normalizeForMatching(p.person_name);
          const aliases = peopleMap.get(normalized) || [];
          entities.push({
            type: "person",
            primary: preserveCase(p.person_name),
            aliases: aliases.map(preserveCase),
            normalized,
          });
        }
      });
    }

    // Load places from places_in_the_bible_notes
    const { data: places, error: placesError } = await supabase
      .from("places_in_the_bible_notes")
      .select("place, normalized_place");

    if (placesError) {
      console.error("Error loading places for highlighting:", placesError);
    } else if (places) {
      places.forEach((p) => {
        if (p.place) {
          const normalized = normalizeForMatching(p.place);
          // Only add if not already a person
          const isPerson = entities.some(
            (e) => e.type === "person" && e.normalized === normalized
          );
          if (!isPerson) {
            entities.push({
              type: "place",
              primary: preserveCase(p.place),
              aliases: [],
              normalized,
            });
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
          const normalized = normalizeForMatching(k.keyword);
          // Only add if not already a person or place
          const isPersonOrPlace = entities.some(
            (e) =>
              (e.type === "person" || e.type === "place") &&
              e.normalized === normalized
          );
          if (!isPersonOrPlace) {
            entities.push({
              type: "keyword",
              primary: preserveCase(k.keyword),
              aliases: [],
              normalized,
            });
          }
        }
      });
    }
  } catch (err) {
    console.error("Error loading entities for highlighting:", err);
  }

  return entities;
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
 * CRITICAL: Each entity is highlighted ONLY ONCE per chapter (across all verses)
 */
export async function enrichBibleVerses(
  verses: Array<{ verse: number; text: string }>
): Promise<string> {
  // Load all entities from database (once for entire chapter)
  const entities = await loadAllEntities();

  // Expand aliases into the same entity (do not duplicate)
  const expandedEntities: HighlightEntity[] = [];
  const seenNormalized = new Set<string>();

  entities.forEach((entity) => {
    // Add primary
    if (!seenNormalized.has(entity.normalized)) {
      expandedEntities.push(entity);
      seenNormalized.add(entity.normalized);
    }

    // Add aliases
    entity.aliases.forEach((alias) => {
      const normalizedAlias = normalizeForMatching(alias);
      if (!seenNormalized.has(normalizedAlias)) {
        expandedEntities.push({
          ...entity,
          primary: alias, // Use alias as primary for this match
          normalized: normalizedAlias,
        });
        seenNormalized.add(normalizedAlias);
      }
    });
  });

  // Sort by longest string first (prevents "David" matching inside "City of David")
  expandedEntities.sort((a, b) => b.primary.length - a.primary.length);

  // Track what's been highlighted per type (across ALL verses)
  const highlightedPeople = new Set<string>();
  const highlightedPlaces = new Set<string>();
  const highlightedKeywords = new Set<string>();

  // Process each verse, but track highlights across all verses
  const enrichedVerses = verses.map((v) => {
    // Escape HTML in the verse text
    const escapedText = escapeHtml(v.text);

    // Collect matches for this verse
    const matches: Array<{
      start: number;
      end: number;
      type: "person" | "place" | "keyword";
      primary: string;
      matchedText: string;
    }> = [];

    // Walk through each entity
    for (const entity of expandedEntities) {
      // Check if this entity type already highlighted this normalized term (across all verses)
      let alreadyHighlighted = false;
      if (entity.type === "person") {
        alreadyHighlighted = highlightedPeople.has(entity.normalized);
      } else if (entity.type === "place") {
        alreadyHighlighted = highlightedPlaces.has(entity.normalized);
      } else if (entity.type === "keyword") {
        alreadyHighlighted = highlightedKeywords.has(entity.normalized);
      }

      if (alreadyHighlighted) {
        continue; // Skip - already highlighted once in this chapter
      }

      // Create regex for whole-word matching (case-insensitive)
      // Escape special regex characters
      const escapedTerm = entity.primary.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
            type: entity.type,
            primary: entity.primary,
            matchedText: match[0],
          });

          // Mark as highlighted (across all verses)
          if (entity.type === "person") {
            highlightedPeople.add(entity.normalized);
          } else if (entity.type === "place") {
            highlightedPlaces.add(entity.normalized);
          } else if (entity.type === "keyword") {
            highlightedKeywords.add(entity.normalized);
          }
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
      const highlightSpan = `<span class="bible-highlight bible-highlight-${match.type}" data-type="${match.type}" data-term="${escapeHtml(match.primary)}">${match.matchedText}</span>`;

      enrichedText = before + highlightSpan + after;
    }

    // Match the existing verse number badge style
    return `<p class="leading-relaxed"><span class="inline-flex items-center justify-center rounded-md bg-blue-500 text-white text-[11px] font-semibold px-2 py-[2px] mr-3">${v.verse.toString().padStart(2, "0")}</span>${enrichedText}</p>`;
  });

  return enrichedVerses.join("\n");
}
