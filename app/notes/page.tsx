"use client";

import { useState } from "react";
import { LouisAvatar } from "../../components/LouisAvatar";

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
  "Romans",
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
  write: "",
};

type ModalMode = "create" | "view" | "edit" | null;

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [bookFilter, setBookFilter] = useState<string>("All books");

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const filteredNotes =
    bookFilter === "All books"
      ? notes
      : notes.filter((n) => n.book === bookFilter);

  function openNewNote() {
    setEditingNoteId(null);
    setForm(emptyForm);
    setCurrentNote(null);
    setModalMode("create");
  }

  function openExistingNote(note: Note) {
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
      write: note.write,
    });
    setModalMode("view");
  }

  function closeModal() {
    setModalMode(null);
    setCurrentNote(null);
  }

  function handleChange(
    field: keyof typeof emptyForm,
    value: string | number
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSave() {
    if (!form.book || form.chapter <= 0) return;

    const now = new Date();
    const createdAt = now.toLocaleString();

    if (editingNoteId && modalMode === "edit") {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNoteId
            ? {
                ...n,
                book: form.book,
                chapter: form.chapter,
                verseFrom: form.verseFrom,
                verseTo: form.verseTo,
                passage: form.passage,
                research: form.research,
                observe: form.observe,
                write: form.write,
              }
            : n
        )
      );
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        book: form.book,
        chapter: form.chapter,
        verseFrom: form.verseFrom,
        verseTo: form.verseTo,
        passage: form.passage,
        research: form.research,
        observe: form.observe,
        write: form.write,
        createdAt,
      };

      setNotes((prev) => [newNote, ...prev]);
    }

    setModalMode(null);
    setCurrentNote(null);
  }

  function handleDelete() {
    if (!editingNoteId) return;
    const yes = window.confirm("Delete this note? This cannot be undone.");
    if (!yes) return;

    setNotes((prev) => prev.filter((n) => n.id !== editingNoteId));
    setModalMode(null);
    setCurrentNote(null);
  }

  const isModalOpen = modalMode !== null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE TITLE */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Notes</h1>
          <p className="text-gray-700 text-sm">
            Your GROW notes, sorted by book and chapter.
          </p>
        </header>

        {/* LOUIS CALLOUT + NEW NOTE BUTTON */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <LouisAvatar mood="bible" size={40} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <p className="font-semibold mb-1">
                Use this page like your Bible notebook.
              </p>
              <p className="text-[13px] leading-relaxed">
                Choose the book and chapter, fill out G R O W, then save the
                note. You can come back and read or edit any time.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openNewNote}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold px-5 py-2 shadow-sm hover:bg-blue-700 transition"
          >
            + New note
          </button>
        </div>

        {/* FILTERS */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-xs font-medium text-gray-600">
            Filter by book
          </div>
          <select
            value={bookFilter}
            onChange={(e) => setBookFilter(e.target.value)}
            className="w-full sm:w-56 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {BOOKS.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>
        </div>

        {/* NOTES GRID */}
        {filteredNotes.length === 0 ? (
          <div className="mt-6 text-sm text-gray-600">
            No notes yet. Click{" "}
            <button
              type="button"
              onClick={openNewNote}
              className="text-blue-600 font-semibold hover:underline"
            >
              New note
            </button>{" "}
            to start your first GROW note.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => openExistingNote(note)}
                className="bg-white border border-gray-200 rounded-2xl px-3 py-3 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition text-left"
              >
                <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                  {note.book} {note.chapter}
                </div>
                {note.verseFrom && (
                  <div className="text-xs text-gray-600 mb-1">
                    Verses {note.verseFrom}
                    {note.verseTo && note.verseTo !== note.verseFrom
                      ? `–${note.verseTo}`
                      : ""}
                  </div>
                )}
                <div className="text-xs text-gray-800 line-clamp-3">
                  {note.passage || note.research || note.observe || note.write
                    ? (note.passage ||
                        note.research ||
                        note.observe ||
                        note.write
                      ).slice(0, 120)
                    : "Empty note"}
                </div>
                <div className="mt-2 text-[10px] text-gray-400">
                  {note.createdAt}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-black/10 shadow-2xl p-6 sm:p-7">
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              {/* inner column to keep text narrow */}
              <div className="mx-auto max-w-xl">
                {/* VIEW MODE (READ ONLY) */}
                {modalMode === "view" && currentNote && (
                  <>
                    <h2 className="text-2xl font-bold mb-1">
                      {currentNote.book} {currentNote.chapter}
                      {currentNote.verseFrom && (
                        <span className="text-base font-normal text-gray-600">
                          {" "}
                          · verses {currentNote.verseFrom}
                          {currentNote.verseTo &&
                          currentNote.verseTo !== currentNote.verseFrom
                            ? `–${currentNote.verseTo}`
                            : ""}
                        </span>
                      )}
                    </h2>
                    <p className="text-xs text-gray-500 mb-4">
                      Saved {currentNote.createdAt}
                    </p>

                    <div className="space-y-5 text-sm leading-relaxed text-gray-800">
                      {currentNote.passage && (
                        <section>
                          <h3 className="text-[13px] font-semibold text-blue-700 mb-1">
                            G – Get the passage
                          </h3>
                          <p className="whitespace-pre-line">
                            {currentNote.passage}
                          </p>
                        </section>
                      )}

                      {currentNote.research && (
                        <section>
                          <h3 className="text-[13px] font-semibold text-blue-700 mb-1">
                            R – Research
                          </h3>
                          <p className="whitespace-pre-line">
                            {currentNote.research}
                          </p>
                        </section>
                      )}

                      {currentNote.observe && (
                        <section>
                          <h3 className="text-[13px] font-semibold text-blue-700 mb-1">
                            O – Observe
                          </h3>
                          <p className="whitespace-pre-line">
                            {currentNote.observe}
                          </p>
                        </section>
                      )}

                      {currentNote.write && (
                        <section>
                          <h3 className="text-[13px] font-semibold text-blue-700 mb-1">
                            W – Write
                          </h3>
                          <p className="whitespace-pre-line">
                            {currentNote.write}
                          </p>
                        </section>
                      )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setModalMode("edit")}
                        className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}

                {/* CREATE / EDIT MODE (FORM) */}
                {(modalMode === "create" || modalMode === "edit") && (
                  <>
                    <h2 className="text-xl font-bold mb-4">
                      {modalMode === "edit" ? "Edit note" : "New GROW note"}
                    </h2>

                    {/* META FIELDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Book
                        </label>
                        <select
                          value={form.book}
                          onChange={(e) =>
                            handleChange("book", e.target.value)
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {BOOKS.filter((b) => b !== "All books").map(
                            (book) => (
                              <option key={book} value={book}>
                                {book}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Chapter
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={MAX_CHAPTER}
                          value={form.chapter}
                          onChange={(e) =>
                            handleChange(
                              "chapter",
                              Number(e.target.value) || 1
                            )
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Verse from
                        </label>
                        <select
                          value={form.verseFrom}
                          onChange={(e) =>
                            handleChange(
                              "verseFrom",
                              Number(e.target.value) || 1
                            )
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {Array.from(
                            { length: MAX_VERSE },
                            (_, i) => i + 1
                          ).map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Verse to
                        </label>
                        <select
                          value={form.verseTo}
                          onChange={(e) =>
                            handleChange(
                              "verseTo",
                              Number(e.target.value) || 1
                            )
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {Array.from(
                            { length: MAX_VERSE },
                            (_, i) => i + 1
                          ).map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* G R O W FIELDS */}
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-blue-700 mb-1">
                          G – Get the passage
                        </div>
                        <textarea
                          value={form.passage}
                          onChange={(e) =>
                            handleChange("passage", e.target.value)
                          }
                          placeholder="Write the verse or short passage you are studying. Example: Matthew 2 verses 1 to 12, the visit of the wise men."
                          className="w-full min-h-[70px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-blue-700 mb-1">
                          R – Research
                        </div>
                        <textarea
                          value={form.research}
                          onChange={(e) =>
                            handleChange("research", e.target.value)
                          }
                          placeholder="Questions, context, who, what, when, where, why. What do you want to look up or learn?"
                          className="w-full min-h-[90px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-blue-700 mb-1">
                          O – Observe
                        </div>
                        <textarea
                          value={form.observe}
                          onChange={(e) =>
                            handleChange("observe", e.target.value)
                          }
                          placeholder="Patterns, repeated words, big ideas, connections to other stories, anything that stands out."
                          className="w-full min-h-[90px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-blue-700 mb-1">
                          W – Write
                        </div>
                        <textarea
                          value={form.write}
                          onChange={(e) =>
                            handleChange("write", e.target.value)
                          }
                          placeholder="Write this like a journal entry. What is God saying to you through this passage and how do you want to respond?"
                          className="w-full min-h-[110px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                      >
                        Save note
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
