"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import NewNoteModal from "../../components/NewNoteModal";

type Note = {
  id: string;
  book: string;
  chapter: number;
  verseFrom: number | null;
  verseTo: number | null;
  passage: string;
  research: string;
  observe: string;
  write: string;
  createdAt: string;
};

const BOOKS = [
  "All books",
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "Samuel",
  "Kings",
  "Psalms",
  "Proverbs",
  "Isaiah",
  "Jeremiah",
  "Ezekiel",
  "Daniel",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans"
];

const MAX_CHAPTER = 150;
const MAX_VERSE = 176;

const emptyForm = {
  book: "Matthew",
  chapter: 1,
  verseFrom: 1,
  verseTo: 1,
  passage: "",
  research: "",
  observe: "",
  write: ""
};

type ModalMode = "create" | "view" | "edit" | null;
type FormState = typeof emptyForm;

function formatReference(note: Note) {
  let ref = `${note.book} ${note.chapter}`;
  if (note.verseFrom) {
    if (note.verseTo && note.verseTo !== note.verseFrom) {
      ref += `: ${note.verseFrom}-${note.verseTo}`;
    } else {
      ref += `: ${note.verseFrom}`;
    }
  }
  return ref;
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

function formatDisplayDate(isoString: string) {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  const day = d.getDate();
  const suffix = getDaySuffix(day);
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();
  return `${month} ${day}${suffix}, ${year}`;
}

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [bookFilter, setBookFilter] = useState("All books");
  const [dateSort, setDateSort] = useState<"newest" | "oldest">("newest");

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [savingNote, setSavingNote] = useState(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);

  // LOAD USER + NOTES
  useEffect(() => {
    async function loadUserAndNotes() {
      try {
        const result = await supabase.auth.getUser();
        const user = result.data.user;

        if (!user) {
          setLoadingNotes(false);
          return;
        }

        setUserId(user.id);

        // Extract username from user metadata
        const meta: any = user.user_metadata || {};
        const extractedUsername =
          meta.firstName ||
          meta.first_name ||
          (user.email ? user.email.split("@")[0] : null) ||
          "User";
        setUsername(extractedUsername);

        const { data, error } = await supabase
          .from("notes")
          .select(
            "id, book, chapter, verse_from, verse_to, passage, research, observe, write, created_at"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading notes", error);
          setLoadingNotes(false);
          return;
        }

        const mapped =
          data?.map((row: any) => ({
            id: String(row.id),
            book: row.book,
            chapter: row.chapter,
            verseFrom: row.verse_from,
            verseTo: row.verse_to,
            passage: row.passage ?? "",
            research: row.research ?? "",
            observe: row.observe ?? "",
            write: row.write ?? "",
            createdAt: row.created_at
          })) ?? [];

        setNotes(mapped);
      } catch (err) {
        console.error("Error loading", err);
      } finally {
        setLoadingNotes(false);
      }
    }

    loadUserAndNotes();
  }, []);

  const notesByBook =
    bookFilter === "All books"
      ? notes
      : notes.filter((n) => n.book === bookFilter);

  const filteredNotes = [...notesByBook].sort((a, b) => {
    const da = new Date(a.createdAt).getTime();
    const db = new Date(b.createdAt).getTime();
    return dateSort === "newest" ? db - da : da - db;
  });

  function openNewNote() {
    setForm(emptyForm);
    setEditingNoteId(null);
    setCurrentNote(null);
    setModalMode("create");
  }

  function openExisting(note: Note) {
    setCurrentNote(note);
    setEditingNoteId(note.id);
    setForm({
      book: note.book,
      chapter: note.chapter,
      verseFrom: note.verseFrom ?? 1,
      verseTo: note.verseTo ?? 1,
      passage: note.passage,
      research: note.research,
      observe: note.observe,
      write: note.write
    });
    setModalMode("view");
  }

  function closeModal() {
    setModalMode(null);
    setCurrentNote(null);
  }

  function handleChange(field: keyof FormState, value: string | number) {
    setForm((prev) => ({
      ...prev,
      [field]: value as never
    }));
  }

  // ✅ FULL SAVE FUNCTION WITH DUPLICATE CHECK
  async function handleSave() {
    if (!userId) return;
    setSavingNote(true);

    try {

      // 🔎 DUPLICATE CHECK (ONLY FOR NEW NOTES)
      if (modalMode === "create") {
        const duplicate = notes.find(
          (n) =>
            n.book === form.book &&
            n.chapter === form.chapter &&
            n.verseFrom === form.verseFrom &&
            n.verseTo === form.verseTo
        );

        if (duplicate) {
          alert(
            `You already created a note for ${form.book} ${form.chapter}:${form.verseFrom}${
              form.verseTo !== form.verseFrom ? "-" + form.verseTo : ""
            }.`
          );
          setSavingNote(false);
          return;
        }
      }

      // EDIT
      if (modalMode === "edit" && editingNoteId) {
        const { data, error } = await supabase
          .from("notes")
          .update({
            book: form.book,
            chapter: form.chapter,
            verse_from: form.verseFrom,
            verse_to: form.verseTo,
            passage: form.passage,
            research: form.research,
            observe: form.observe,
            write: form.write
          })
          .eq("id", Number(editingNoteId))
          .eq("user_id", userId)
          .select()
          .single();

        if (error) {
          console.error(error);
          return;
        }

        const updated: Note = {
          id: String(data.id),
          book: data.book,
          chapter: data.chapter,
          verseFrom: data.verse_from,
          verseTo: data.verse_to,
          passage: data.passage ?? "",
          research: data.research ?? "",
          observe: data.observe ?? "",
          write: data.write ?? "",
          createdAt: data.created_at
        };

        setNotes((prev) =>
          prev.map((n) => (n.id === updated.id ? updated : n))
        );
      }

      // CREATE
      if (modalMode === "create") {
        const { data, error } = await supabase
          .from("notes")
          .insert([
            {
              user_id: userId,
              book: form.book,
              chapter: form.chapter,
              verse_from: form.verseFrom,
              verse_to: form.verseTo,
              passage: form.passage,
              research: form.research,
              observe: form.observe,
              write: form.write
            }
          ])
          .select()
          .single();

        if (error) {
          console.error(error);
          return;
        }

        const newNote: Note = {
          id: String(data.id),
          book: data.book,
          chapter: data.chapter,
          verseFrom: data.verse_from,
          verseTo: data.verse_to,
          passage: data.passage ?? "",
          research: data.research ?? "",
          observe: data.observe ?? "",
          write: data.write ?? "",
          createdAt: data.created_at
        };

        setNotes((prev) => [newNote, ...prev]);

        // ACTION TRACKING: Insert into master_actions
        // Always fetch username fresh from auth to ensure we have the correct value
        const { data: { user: authUser } } = await supabase.auth.getUser();
        let actionUsername = "User"; // Default fallback
        
        if (authUser) {
          const meta: any = authUser.user_metadata || {};
          actionUsername =
            meta.firstName ||
            meta.first_name ||
            (authUser.email ? authUser.email.split("@")[0] : null) ||
            "User";
        }

        console.log(`[MASTER_ACTIONS] Inserting note_created with username: ${actionUsername}, user_id: ${userId}`);

        const { error: actionError } = await supabase
          .from("master_actions")
          .insert({
            user_id: userId,
            username: actionUsername,
            action_type: "note_created",
          });

        if (actionError) {
          console.error("Error logging action to master_actions:", actionError);
          console.error("Attempted username:", actionUsername);
          // Don't block the UI - continue even if action logging fails
        } else {
          console.log(`[MASTER_ACTIONS] Successfully inserted note_created action with username: ${actionUsername}`);
        }

        // UPDATE profile_stats: Count from notes table
        // Get username if not already loaded
        let statsUsername = username;
        if (!statsUsername && userId) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const meta: any = user.user_metadata || {};
            statsUsername =
              meta.firstName ||
              meta.first_name ||
              (user.email ? user.email.split("@")[0] : null) ||
              "User";
          }
        }

        // Count all notes rows for this user
        const { count, error: countError } = await supabase
          .from("notes")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId);

        if (countError) {
          console.error("Error counting notes:", countError);
          // Don't block UI - continue even if count fails
        } else {
          console.log(`[NOTES CREATED] Count from database: ${count}`);
          
          // Get existing username if available
          const { data: currentStats } = await supabase
            .from("profile_stats")
            .select("username, chapters_completed_count, people_learned_count, places_discovered_count, keywords_mastered_count")
            .eq("user_id", userId)
            .maybeSingle();

          const finalUsername = currentStats?.username || statsUsername || "User";
          
          // Calculate total_actions as sum of all counts
          const totalActions = 
            (currentStats?.chapters_completed_count || 0) +
            (count || 0) +
            (currentStats?.people_learned_count || 0) +
            (currentStats?.places_discovered_count || 0) +
            (currentStats?.keywords_mastered_count || 0);

          // Update profile_stats with the count
          const { error: statsError } = await supabase
            .from("profile_stats")
            .upsert(
              {
                user_id: userId,
                notes_created_count: count || 0,
                total_actions: totalActions,
                username: finalUsername,
                updated_at: new Date().toISOString(),
              },
              {
                onConflict: "user_id",
              }
            );

          if (statsError) {
            console.error("Error updating profile_stats:", statsError);
            // Don't block UI - continue even if stats update fails
          } else {
            console.log(`[PROFILE_STATS] Successfully updated notes_created_count to ${count}`);
          }
        }
      }

      closeModal();
    } finally {
      setSavingNote(false);
    }
  }

  async function handleDelete() {
    if (!editingNoteId || !userId) return;
    await supabase
      .from("notes")
      .delete()
      .eq("id", Number(editingNoteId))
      .eq("user_id", userId);

    setNotes((prev) => prev.filter((n) => n.id !== editingNoteId));
    closeModal();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-4">
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-gray-600 text-sm">
            Save all your Bible notes in one place.
          </p>
        </header>

        {/* FILTERS */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <select
              value={bookFilter}
              onChange={(e) => setBookFilter(e.target.value)}
              className="rounded-full border px-3 py-1 text-sm bg-white shadow-sm"
            >
              {BOOKS.map((book) => (
                <option key={book}>{book}</option>
              ))}
            </select>

            <select
              value={dateSort}
              onChange={(e) =>
                setDateSort(e.target.value as "newest" | "oldest")
              }
              className="rounded-full border px-3 py-1 text-sm bg-white shadow-sm"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <button
            onClick={() => setShowNewNoteModal(true)}
            className="rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-blue-700"
          >
            + New Note
          </button>
        </div>

        {/* NOTES GRID */}
        {loadingNotes ? (
          <p>Loading…</p>
        ) : filteredNotes.length === 0 ? (
          <p className="text-sm text-gray-600 mt-4">
            No notes yet. Click New note to start.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => openExisting(note)}
                className="bg-white rounded-xl border p-3 shadow-sm text-left hover:shadow-md transition"
              >
                <div className="flex justify-center">
                  <Image
                    src="/note-guided.png"
                    width={50}
                    height={50}
                    alt="note"
                  />
                </div>
                <div className="mt-2 font-bold text-xs">
                  {formatReference(note)}
                </div>
                <div className="text-[10px] text-gray-500">
                  {formatDisplayDate(note.createdAt)}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* MODAL */}
        {modalMode && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative shadow-xl">
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 text-gray-500"
              >
                ✕
              </button>

              {/* VIEW MODE */}
              {modalMode === "view" && currentNote && (
                <>
                  <h2 className="text-xl font-bold mb-1">
                    {formatReference(currentNote)}
                  </h2>
                  <p className="text-xs text-gray-500 mb-4">
                    Saved {formatDisplayDate(currentNote.createdAt)}
                  </p>

                  <div className="space-y-6 text-sm">
                    {currentNote.passage && (
                      <section>
                        <h1 className="text-2xl font-bold mb-4">📖 Passage</h1>
                        <div className="space-y-2">
                          {currentNote.passage.split("\n").filter(l => l.trim()).map((line, idx) => (
                            <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {line}
                            </p>
                          ))}
                        </div>
                      </section>
                    )}

                    {currentNote.book !== "Advanced" && currentNote.research && (
                      <section>
                        <h1 className="text-2xl font-bold mb-4">❓ Questions</h1>
                        <div className="space-y-4">
                          {currentNote.research.split("\n").filter(l => l.trim()).map((line, idx) => (
                            <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {line}
                            </p>
                          ))}
                        </div>
                      </section>
                    )}

                    {currentNote.book !== "Advanced" && currentNote.observe && (
                      <section>
                        <h1 className="text-2xl font-bold mb-4">👀 Observe</h1>
                        <div className="space-y-4">
                          {currentNote.observe.split("\n").filter(l => l.trim()).map((line, idx) => (
                            <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {line}
                            </p>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Advanced Notes - render HTML content */}
                    {currentNote.write && /<[a-z][\s\S]*>/i.test(currentNote.write) && (
                      <section>
                        <div 
                          className="prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_p]:mb-4 [&_p]:text-gray-700 [&_img]:max-w-full [&_img]:rounded-lg [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_ol]:list-inside"
                          dangerouslySetInnerHTML={{ __html: currentNote.write }}
                        />
                      </section>
                    )}

                    {/* GROW Notes - render write field as text */}
                    {currentNote.write && !/<[a-z][\s\S]*>/i.test(currentNote.write) && (
                      <section>
                        <h1 className="text-2xl font-bold mb-4">✍️ Reflection</h1>
                        <div className="space-y-4">
                          {currentNote.write.split(/\n\s*\n/).filter(p => p.trim()).map((para, idx) => (
                            <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {para.trim()}
                            </p>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        // Try to store note data in sessionStorage for fast loading.
                        // If it fails (e.g., too large), still navigate and let the advanced
                        // editor load the content directly from Supabase by ID.
                        try {
                          const noteData = {
                            id: currentNote.id,
                            book: currentNote.book,
                            chapter: currentNote.chapter,
                            verseFrom: currentNote.verseFrom,
                            verseTo: currentNote.verseTo,
                            write: currentNote.write || "",
                          };
                          sessionStorage.setItem("editNoteData", JSON.stringify(noteData));
                        } catch (e) {
                          console.warn("Could not cache edit note data in sessionStorage:", e);
                        }

                        router.push("/notes/advanced?edit=" + currentNote.id);
                      }}
                      className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

              {/* CREATE / EDIT MODE */}
              {(modalMode === "create" || modalMode === "edit") && (
                <>
                  <h2 className="text-xl font-bold mb-1">
                    {modalMode === "edit" ? "Edit note" : "New note"}
                  </h2>
                  <p className="text-xs text-gray-500 mb-4">
                    Use the G R O W method to study Scripture.
                  </p>

                  <div className="space-y-4">
                    {/* BOOK */}
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">
                        Book
                      </label>
                      <select
                        value={form.book}
                        onChange={(e) =>
                          handleChange("book", e.target.value)
                        }
                        className="w-full rounded-xl border px-3 py-2 text-sm bg-white"
                      >
                        {BOOKS.filter((b) => b !== "All books").map(
                          (book) => (
                            <option key={book}>{book}</option>
                          )
                        )}
                      </select>
                    </div>

                    {/* CHAPTER */}
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">
                        Chapter
                      </label>
                      <select
                        value={form.chapter}
                        onChange={(e) =>
                          handleChange("chapter", Number(e.target.value))
                        }
                        className="w-full rounded-xl border px-3 py-2 text-sm bg-white"
                      >
                        {Array.from({ length: MAX_CHAPTER }).map(
                          (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* VERSES */}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-xs text-gray-600 block mb-1">
                          From
                        </label>
                        <select
                          value={form.verseFrom}
                          onChange={(e) =>
                            handleChange("verseFrom", Number(e.target.value))
                          }
                          className="w-full rounded-xl border px-3 py-2 text-sm bg-white"
                        >
                          {Array.from({ length: MAX_VERSE }).map(
                            (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="text-xs text-gray-600 block mb-1">
                          To
                        </label>
                        <select
                          value={form.verseTo}
                          onChange={(e) =>
                            handleChange("verseTo", Number(e.target.value))
                          }
                          className="w-full rounded-xl border px-3 py-2 text-sm bg-white"
                        >
                          {Array.from({ length: MAX_VERSE }).map(
                            (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>

                    {/* GROW FIELDS */}
                    <div>
                      <label className="text-xs font-semibold text-blue-700 block mb-1">
                        G – Get the passage
                      </label>
                      <textarea
                        value={form.passage}
                        onChange={(e) =>
                          handleChange("passage", e.target.value)
                        }
                        className="w-full min-h-[70px] rounded-xl border px-3 py-2 text-sm bg-white"
                        placeholder="Write the verse or short passage you are studying."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-blue-700 block mb-1">
                        R – Research
                      </label>
                      <textarea
                        value={form.research}
                        onChange={(e) =>
                          handleChange("research", e.target.value)
                        }
                        className="w-full min-h-[90px] rounded-xl border px-3 py-2 text-sm bg-white"
                        placeholder="Questions, context, who, what, when, where, why."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-blue-700 block mb-1">
                        O – Observe
                      </label>
                      <textarea
                        value={form.observe}
                        onChange={(e) =>
                          handleChange("observe", e.target.value)
                        }
                        className="w-full min-h-[90px] rounded-xl border px-3 py-2 text-sm bg-white"
                        placeholder="Patterns, big ideas, repeated words, connections."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-blue-700 block mb-1">
                        W – Write
                      </label>
                      <textarea
                        value={form.write}
                        onChange={(e) =>
                          handleChange("write", e.target.value)
                        }
                        className="w-full min-h-[110px] rounded-xl border px-3 py-2 text-sm bg-white"
                        placeholder="Write this like a journal entry."
                      />
                    </div>
                  </div>

                  {/* SAVE BUTTONS */}
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 rounded-full border bg-white text-sm text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={savingNote}
                      className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold disabled:opacity-60"
                    >
                      {savingNote ? "Saving…" : "Save note"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* New Note Modal */}
        <NewNoteModal
          isOpen={showNewNoteModal}
          onClose={() => setShowNewNoteModal(false)}
        />
      </div>
    </div>
  );
}
