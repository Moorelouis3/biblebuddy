"use client";

/**
 * Your Notes, on the dashboard (Louis, 2026-10-25: "leave notes there!!! i
 * wanna add it to the dashboard somehow").
 *
 * The numbers behind this: 134 notes have ever been written, by 22 people,
 * and between May and October 2026 not one. The feature is not broken - the
 * pages work, the table is fine - it is simply two taps down a menu with
 * nothing anywhere that ever suggests writing one. So the fix is not inside
 * /notes. It is here, on the screen everybody opens.
 *
 * Two things, in this order:
 *
 *   1. A prompt tied to what you actually just read. Finishing a chapter is
 *      the one moment someone has something to say, and it was also the one
 *      moment the app said nothing. The box writes the note from here - no
 *      navigation, no form, no choosing verses - because every step between
 *      the thought and the saved note is where this died the first time.
 *
 *   2. Your last few notes underneath, so they accumulate somewhere visible
 *      instead of in a drawer.
 *
 * A note saved here is a chapter note: verse_from / verse_to are 0, which
 * app/notes/page.tsx:70 already reads as "no verse" and renders as plain
 * "Genesis 12". Nothing else had to change to make room for it.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/** Chapters finished longer ago than this no longer prompt. */
const PROMPT_WINDOW_DAYS = 7;
const EXCERPT_CHARS = 96;

type RecentNote = {
  id: string;
  book: string;
  chapter: number;
  excerpt: string;
};

type Prompt = { book: string; chapter: number };

/** completed_chapters stores "1 timothy"; notes store "1 Timothy". */
function toTitleCase(book: string) {
  return book
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

function excerptOf(row: { write?: string | null; observe?: string | null; research?: string | null; passage?: string | null }) {
  const body = [row.write, row.observe, row.research, row.passage]
    .map((value) => (value || "").replace(/\s+/g, " ").trim())
    .find((value) => value.length > 0);
  if (!body) return "";
  return body.length > EXCERPT_CHARS ? `${body.slice(0, EXCERPT_CHARS - 1).trimEnd()}…` : body;
}

export default function YourNotes({ userId }: { userId: string | null }) {
  const [loaded, setLoaded] = useState(false);
  const [notes, setNotes] = useState<RecentNote[]>([]);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoaded(false);
      return;
    }
    let cancelled = false;

    void (async () => {
      const [{ data: noteRows }, { data: chapterRows }] = await Promise.all([
        supabase
          .from("notes")
          .select("id, book, chapter, write, observe, research, passage, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("completed_chapters")
          .select("book, chapter, completed_at")
          .eq("user_id", userId)
          .order("completed_at", { ascending: false })
          .limit(1),
      ]);
      if (cancelled) return;

      setNotes(
        (noteRows || []).map((row) => ({
          id: String(row.id),
          book: String(row.book || "").trim(),
          chapter: Number(row.chapter) || 0,
          excerpt: excerptOf(row),
        })),
      );

      const latest = (chapterRows || [])[0] as
        | { book?: string | null; chapter?: number | null; completed_at?: string | null }
        | undefined;

      if (latest?.book && latest.chapter) {
        const finishedAt = latest.completed_at ? Date.parse(latest.completed_at) : NaN;
        const fresh =
          Number.isFinite(finishedAt) &&
          Date.now() - finishedAt < PROMPT_WINDOW_DAYS * 24 * 60 * 60 * 1000;

        if (fresh) {
          const book = toTitleCase(String(latest.book).trim());
          // Asked separately rather than inferred from the three notes above -
          // somebody with a lot of notes would otherwise be prompted again for
          // a chapter they already wrote about.
          const { count } = await supabase
            .from("notes")
            .select("id", { count: "exact", head: true })
            .eq("user_id", userId)
            .eq("chapter", latest.chapter)
            .ilike("book", book);
          if (!cancelled && !count) setPrompt({ book, chapter: Number(latest.chapter) });
        }
      }

      if (!cancelled) setLoaded(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function handleSave() {
    const text = draft.trim();
    if (!userId || !prompt || !text || saving) return;

    setSaving(true);
    setSaveError(null);

    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          user_id: userId,
          book: prompt.book,
          chapter: prompt.chapter,
          // A whole-chapter note. app/notes/page.tsx treats 0 as "no verse"
          // and shows the reference as "Genesis 12".
          verse_from: 0,
          verse_to: 0,
          passage: "",
          research: "",
          observe: "",
          write: text,
        },
      ])
      .select()
      .single();

    setSaving(false);

    if (error || !data) {
      setSaveError("That did not save. Try again in a moment.");
      return;
    }

    setNotes((current) =>
      [
        {
          id: String(data.id),
          book: prompt.book,
          chapter: prompt.chapter,
          excerpt: excerptOf({ write: text }),
        },
        ...current,
      ].slice(0, 3),
    );
    setPrompt(null);
    setDraft("");
  }

  if (!userId || !loaded) return null;

  const hasNothing = notes.length === 0 && !prompt;

  return (
    <section aria-labelledby="home-notes-heading">
      <div className="rounded-3xl border border-[#bfe4cd] bg-[#eafaf0] p-4 shadow-sm sm:p-5">
        <div className="flex items-end justify-between gap-3">
          <h2
            id="home-notes-heading"
            className="flex items-center gap-2 text-base font-black text-[#15321f] sm:text-xl"
          >
            <span aria-hidden>📝</span>
            Your Notes
          </h2>
          <Link href="/notes" className="shrink-0 text-sm font-bold text-[#1d7a46]">
            All notes
          </Link>
        </div>

        {prompt ? (
          <div className="mt-3">
            <label
              htmlFor="home-notes-draft"
              className="block text-sm font-black text-[#15321f] sm:text-[15px]"
            >
              You read {prompt.book} {prompt.chapter}. What stood out?
            </label>
            <textarea
              id="home-notes-draft"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={3}
              placeholder="One sentence is a note. It does not have to be tidy."
              className="mt-2 w-full resize-y rounded-2xl border border-[#bfe4cd] bg-white p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#1d7a46] focus:outline-none"
            />
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={!draft.trim() || saving}
                className="rounded-full bg-[#1d7a46] px-5 py-2 text-sm font-black text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save note"}
              </button>
              {saveError ? (
                <span className="text-sm font-bold text-red-700">{saveError}</span>
              ) : null}
            </div>
          </div>
        ) : null}

        {notes.length > 0 ? (
          <ul className={`space-y-2 ${prompt ? "mt-4" : "mt-3"}`}>
            {notes.map((note) => (
              <li key={note.id}>
                <Link
                  href="/notes"
                  className="block rounded-2xl border border-[#cfe9da] bg-white/70 px-3 py-2 transition hover:bg-white"
                >
                  <span className="block text-sm font-black text-[#15321f]">
                    {note.book} {note.chapter || ""}
                  </span>
                  {note.excerpt ? (
                    <span className="mt-0.5 block truncate text-sm text-[#3c5a49]">{note.excerpt}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {hasNothing ? (
          <p className="mt-2 text-sm text-[#3c5a49]">
            Notes are where a chapter stops being something you read and starts being
            something you keep.{" "}
            <Link href="/reading" className="font-bold text-[#1d7a46]">
              Read a chapter
            </Link>{" "}
            and this will ask you about it.
          </p>
        ) : null}
      </div>
    </section>
  );
}
