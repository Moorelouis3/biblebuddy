import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

/**
 * Readable deep links from blog posts and social into a specific free study.
 *
 *   /study/women-of-the-bible  →  /devotionals/<uuid>
 *
 * Devotionals are stored with generated UUIDs, which are useless in an article,
 * an email or a printed QR code. This route resolves a stable, human-readable
 * slug to whatever id the devotional currently has, so links written today keep
 * working if content is reseeded.
 *
 * No login, no payment, no interstitial — straight into the study. A guest
 * account is created later, only if and when the reader actually starts a day
 * (see lib/guestSession.ts).
 *
 * Matching is done with ILIKE rather than equality because several devotionals
 * were seeded with longer titles than their canonical name
 * (e.g. "The Disciples of Jesus: A 21 Day Devotional — A Bible Buddy Study").
 */

export const dynamic = "force-dynamic";

/** slug → SQL ILIKE pattern matched against devotionals.title */
const STUDY_SLUGS: Record<string, string> = {
  // Flagship — also the first physical book. Both spellings resolve, because
  // the devotional is titled "Tempting" while the book is "Temptation".
  "temptation-of-jesus": "%Tempting of Jesus%",
  "tempting-of-jesus": "%Tempting of Jesus%",

  "women-of-the-bible": "Women of the Bible%",
  "disciples-of-jesus": "The Disciples of Jesus%",
  "faith-of-job": "The Faith of Job%",
  "heart-of-david": "The Heart of David%",
  "calling-of-moses": "The Calling of Moses%",
  "transforming-of-paul": "The Transforming of Paul%",
  "wisdom-of-proverbs": "The Wisdom of Proverbs%",
};

export default async function StudyDeepLinkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pattern = STUDY_SLUGS[slug?.toLowerCase?.() ?? ""];

  // Unknown slug — send them to the full list rather than a dead end.
  if (!pattern) redirect("/devotionals");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) redirect("/devotionals");

  // The anon key is correct here: devotionals grant SELECT to anon, so this
  // resolves without any session.
  const supabase = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabase
    .from("devotionals")
    .select("id")
    .ilike("title", pattern)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(`[STUDY_LINK] Lookup failed for "${slug}":`, error.message);
    redirect("/devotionals");
  }

  if (!data?.id) redirect("/devotionals");

  redirect(`/devotionals/${data.id}`);
}
