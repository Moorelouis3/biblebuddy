/**
 * Where a chapter's static data lives on the CDN.
 *
 * - KJV text: public/kjv/<book-slug>/<chapter>.json, written once by
 *   scripts/fetch-kjv-static.ts from bible-api.com (same source the reader
 *   fetched live, so the text is identical and saved highlights keep their
 *   offsets).
 * - Study notes: public/study-notes/<book-slug>/<chapter>.json, regenerated
 *   on every build by scripts/generate-study-notes-static.ts.
 *
 * Both are plain files, so they arrive as fast as any image and need no
 * server function. The reader falls back to the live sources if a file is
 * missing.
 */

export function chapterSlug(book: string | null | undefined) {
  return String(book || "").trim().toLowerCase().replace(/\s+/g, "-");
}

export function kjvStaticUrl(book: string, chapter: number) {
  return `/kjv/${chapterSlug(book)}/${Number(chapter)}.json`;
}

export function studyNotesStaticUrl(book: string, chapter: number) {
  return `/study-notes/${chapterSlug(book)}/${Number(chapter)}.json`;
}

export async function fetchStaticJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
