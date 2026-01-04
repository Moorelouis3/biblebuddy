import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export type HighlightTerm = {
  term: string;
  type: "person" | "place" | "keyword";
};

export function useBibleHighlights() {
  const [highlightTerms, setHighlightTerms] = useState<HighlightTerm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHighlightTerms() {
      try {
        // Fetch people names
        const { data: people, error: peopleError } = await supabase
          .from("bible_people_notes")
          .select("person_name");

        if (peopleError) {
          console.error("Error fetching people names:", peopleError);
        }

        // Fetch place names
        const { data: places, error: placesError } = await supabase
          .from("places_in_the_bible_notes")
          .select("place");

        if (placesError) {
          console.error("Error fetching place names:", placesError);
        }

        // Fetch keywords
        const { data: keywords, error: keywordsError } = await supabase
          .from("keywords_in_the_bible")
          .select("keyword");

        if (keywordsError) {
          console.error("Error fetching keywords:", keywordsError);
        }

        // Combine into single array
        const terms: HighlightTerm[] = [];

        if (people) {
          people.forEach((p) => {
            if (p.person_name) {
              terms.push({ term: p.person_name, type: "person" });
            }
          });
        }

        if (places) {
          places.forEach((p) => {
            if (p.place) {
              terms.push({ term: p.place, type: "place" });
            }
          });
        }

        if (keywords) {
          keywords.forEach((k) => {
            if (k.keyword) {
              terms.push({ term: k.keyword, type: "keyword" });
            }
          });
        }

        setHighlightTerms(terms);
      } catch (err) {
        console.error("Error fetching highlight terms:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHighlightTerms();
  }, []);

  return { highlightTerms, loading };
}

