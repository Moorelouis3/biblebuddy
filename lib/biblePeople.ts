// lib/biblePeople.ts
// Helper functions for People in the Bible feature
// Matches the pattern of readingProgress.ts

import { supabase } from "./supabaseClient";

export interface BiblePerson {
  id: string;
  name: string;
  normalized_name: string;
  testament?: string;
  created_at?: string;
}

export interface BiblePersonNotes {
  id: string;
  person_id: string;
  notes_text: string;
  created_at?: string;
}

/**
 * Get all people from the database
 */
export async function getAllPeople(): Promise<BiblePerson[]> {
  try {
    const { data, error } = await supabase
      .from("bible_people")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("[BIBLE_PEOPLE] Error fetching people:", error);
      return [];
    }

    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      normalized_name: row.normalized_name,
      testament: row.testament,
      created_at: row.created_at,
    }));
  } catch (err) {
    console.error("[BIBLE_PEOPLE] Error in getAllPeople:", err);
    return [];
  }
}

/**
 * Get a person by ID
 */
export async function getPersonById(personId: string): Promise<BiblePerson | null> {
  try {
    const { data, error } = await supabase
      .from("bible_people")
      .select("*")
      .eq("id", personId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error("[BIBLE_PEOPLE] Error fetching person:", error);
      return null;
    }

    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      normalized_name: data.normalized_name,
      testament: data.testament,
      created_at: data.created_at,
    };
  } catch (err) {
    console.error("[BIBLE_PEOPLE] Error in getPersonById:", err);
    return null;
  }
}

/**
 * Get a person by normalized name
 */
export async function getPersonByName(normalizedName: string): Promise<BiblePerson | null> {
  try {
    const normalized = normalizedName.toLowerCase().trim();
    const { data, error } = await supabase
      .from("bible_people")
      .select("*")
      .eq("normalized_name", normalized)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error("[BIBLE_PEOPLE] Error fetching person by name:", error);
      return null;
    }

    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      normalized_name: data.normalized_name,
      testament: data.testament,
      created_at: data.created_at,
    };
  } catch (err) {
    console.error("[BIBLE_PEOPLE] Error in getPersonByName:", err);
    return null;
  }
}

/**
 * Get notes for a person (if they exist)
 */
export async function getPersonNotes(personId: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("bible_people_notes")
      .select("notes_text")
      .eq("person_id", personId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error("[BIBLE_PEOPLE] Error fetching notes:", error);
      return null;
    }

    return data?.notes_text || null;
  } catch (err) {
    console.error("[BIBLE_PEOPLE] Error in getPersonNotes:", err);
    return null;
  }
}

/**
 * Save notes for a person (upsert to handle race conditions)
 */
export async function savePersonNotes(personId: string, notesText: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("bible_people_notes")
      .upsert(
        {
          person_id: personId,
          notes_text: notesText,
        },
        {
          onConflict: "person_id",
        }
      );

    if (error) {
      console.error("[BIBLE_PEOPLE] Error saving notes:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[BIBLE_PEOPLE] Error in savePersonNotes:", err);
    return false;
  }
}

