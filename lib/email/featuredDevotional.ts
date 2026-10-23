import type { SupabaseClient } from "@supabase/supabase-js";
import type { FeaturedDevotional } from "./weeklyNewsletter";

/**
 * Which devotional the newsletter is pushing this week (Louis, 2026-10-23).
 *
 * The newest one that is actually available: published, and past its
 * available_from date. "Higher Hope" was created on 18 October with
 * available_from 25 October, so a newsletter built on the 20th must not
 * announce it and one built on the 27th must.
 *
 * Newest-first rather than sort_order, because the point of the slot is "here
 * is the new thing". When nothing new has landed for months it simply keeps
 * showing the most recent one, which is still the right answer - that IS the
 * current devotional.
 */
export async function fetchFeaturedDevotional(
  db: SupabaseClient,
  now: Date = new Date(),
): Promise<FeaturedDevotional | null> {
  const today = now.toISOString().slice(0, 10);

  const { data, error } = await db
    .from("devotionals")
    .select("id, title, subtitle, description, total_days, cover_image, is_published, available_from")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) throw new Error(`devotionals: ${error.message}`);

  const available = (data ?? []).find((d: any) => !d.available_from || d.available_from <= today);
  if (!available) return null;

  return {
    id: available.id,
    title: available.title,
    subtitle: available.subtitle ?? null,
    description: available.description ?? null,
    totalDays: Number(available.total_days) || 0,
    coverImage: available.cover_image ?? null,
  };
}
