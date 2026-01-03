// hooks/useFeaturedCharacters.ts
// Hook to apply featured character highlighting via DOM manipulation

import { useEffect, RefObject } from "react";
import { FeaturedCharacter, getSearchTerms, escapeRegex } from "../lib/featuredCharacters";

type UseFeaturedCharactersOptions = {
  characters: FeaturedCharacter[];
  containerRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  onCharacterClick: (character: FeaturedCharacter) => void;
};

export function useFeaturedCharacters({
  characters,
  containerRef,
  enabled,
  onCharacterClick,
}: UseFeaturedCharactersOptions) {
  useEffect(() => {
    if (!enabled || characters.length === 0 || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    
    // Get search terms sorted by length (longest first)
    const searchTerms = getSearchTerms(characters);
    if (searchTerms.length === 0) {
      return;
    }

    // Create a TreeWalker to traverse text nodes only
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip text nodes that are inside verse numbers, buttons, or other UI elements
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          // Skip if parent is a span with verse number styling
          if (parent.classList.contains("inline-flex") && parent.querySelector(".bg-blue-500")) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Skip if inside a button, link, or other interactive element
          if (parent.closest("button, a, [role='button']")) {
            return NodeFilter.FILTER_REJECT;
          }
          
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim()) {
        textNodes.push(node as Text);
      }
    }

    // Process each text node
    for (const textNode of textNodes) {
      const originalText = textNode.textContent || "";
      if (!originalText.trim()) continue;

      const parent = textNode.parentElement;
      if (!parent) continue;

      // Find all matches (with positions)
      const matches: Array<{
        start: number;
        end: number;
        character: FeaturedCharacter;
        matchedText: string;
      }> = [];

      for (const { term, character } of searchTerms) {
        // Use word boundary regex for whole-word matching
        const regex = new RegExp(`\\b${escapeRegex(term)}\\b`, "gi");
        let match;
        
        // Reset regex lastIndex for each search
        regex.lastIndex = 0;
        
        while ((match = regex.exec(originalText)) !== null) {
          const start = match.index;
          const end = start + match[0].length;
          const matchedText = match[0];

          // Check if this overlaps with existing matches
          const overlaps = matches.some(
            (m) =>
              (start >= m.start && start < m.end) ||
              (end > m.start && end <= m.end) ||
              (start <= m.start && end >= m.end)
          );

          if (!overlaps) {
            matches.push({ start, end, character, matchedText });
          }
        }
      }

      // Sort matches by position
      matches.sort((a, b) => a.start - b.start);

      // Remove overlapping matches (keep first/longest)
      const nonOverlappingMatches: typeof matches = [];
      for (const match of matches) {
        const overlaps = nonOverlappingMatches.some(
          (m) =>
            (match.start >= m.start && match.start < m.end) ||
            (match.end > m.start && match.end <= m.end)
        );
        if (!overlaps) {
          nonOverlappingMatches.push(match);
        }
      }

      // If we have matches, replace the text node with fragments
      if (nonOverlappingMatches.length > 0) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        for (const match of nonOverlappingMatches) {
          // Add text before match
          if (match.start > lastIndex) {
            const textBefore = originalText.substring(lastIndex, match.start);
            fragment.appendChild(document.createTextNode(textBefore));
          }

          // Create span for character name
          const span = document.createElement("span");
          span.className = "featured-character underline cursor-pointer text-blue-700 hover:text-blue-900";
          span.setAttribute("data-character-id", match.character.id);
          span.textContent = match.matchedText;
          span.style.cursor = "pointer";
          
          // Add click handler
          span.addEventListener("click", (e) => {
            e.stopPropagation();
            onCharacterClick(match.character);
          });

          fragment.appendChild(span);
          lastIndex = match.end;
        }

        // Add remaining text
        if (lastIndex < originalText.length) {
          fragment.appendChild(document.createTextNode(originalText.substring(lastIndex)));
        }

        // Replace the original text node with the fragment
        parent.replaceChild(fragment, textNode);
      }
    }

    // Cleanup function (though we won't need to restore original text nodes)
    return () => {
      // The DOM changes persist, but that's fine since this only runs once per render
    };
  }, [characters, containerRef, enabled, onCharacterClick]);
}

