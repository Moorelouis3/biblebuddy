"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type NoteMode = "guided" | "advanced";

type Note = {
  id: string;
  mode: NoteMode;
  book: string;
  chapter: number;
  verseFrom: number | null;
  verseTo: number | null;
  passage: string;
  research: string;
  observe: string;
  write: string;
  advancedBody?: string;
  createdAt: string; // ISO string
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

const MAX_CHAPTER = 150; // Psalms
const MAX_VERSE = 176;

const emptyForm = {
  mode: "guided" as NoteMode,
  book: "Matthew",
  chapter: 1,
  verseFrom: 1,
  verseTo: 1,
  passage: "",
  research: "",
  observe: "",
  write: "",
  advancedBody: "",
};

type ModalMode = "create" | "view" | "edit" | null;
type FormState = typeof emptyForm;

const EMOJIS = [
  "🔥",
  "🙏",
  "😭",
  "✨",
  "❤️",
  "📖",
  "🙌",
  "😅",
  "🤯",
  "💔",
  "💭",
  "🕊️",
  "⛰️",
  "🌊",
  "🌅",
  "🌙",
  "⭐",
  "🕯️",
  "⚔️",
  "🛡️",
  "🏃‍♂️",
  "🎯",
  "👀",
  "🧎‍♂️",
  "🧎‍♀️",
  "🎵",
];

// Build the label under each icon, ex: "Matthew 1: 1-12"
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
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
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

type DateSort = "newest" | "oldest";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [bookFilter, setBookFilter] = useState<string>("All books");
  const [dateSort, setDateSort] = useState<DateSort>("newest");

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const advancedEditorRef = useRef<HTMLDivElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // Filter by book
  const notesByBook =
    bookFilter === "All books"
      ? notes
      : notes.filter((n) => n.book === bookFilter);

  // Sort by date
  const filteredNotes = [...notesByBook].sort((a, b) => {
    const da = new Date(a.createdAt).getTime();
    const db = new Date(b.createdAt).getTime();
    if (dateSort === "newest") {
      return db - da;
    } else {
      return da - db;
    }
  });

  function resetModalState() {
    // currently nothing special needed
  }

  function openNewGuidedNote() {
    setEditingNoteId(null);
    setForm({
      ...emptyForm,
      mode: "guided",
    });
    setCurrentNote(null);
    resetModalState();
    setModalMode("create");
  }

  function openNewAdvancedNote() {
    setEditingNoteId(null);
    setForm({
      ...emptyForm,
      mode: "advanced",
    });
    setCurrentNote(null);
    resetModalState();
    setModalMode("create");
  }

  function openExistingNote(note: Note) {
    setCurrentNote(note);
    setEditingNoteId(note.id);
    setForm({
      mode: note.mode ?? "guided",
      book: note.book,
      chapter: note.chapter,
      verseFrom: note.verseFrom ?? 1,
      verseTo: note.verseTo ?? 1,
      passage: note.passage,
      research: note.research,
      observe: note.observe,
      write: note.write,
      advancedBody: note.advancedBody ?? note.write ?? "",
    });
    resetModalState();
    setModalMode("view");
  }

  function closeModal() {
    setModalMode(null);
    setCurrentNote(null);
    resetModalState();
  }

  function handleChange(field: keyof FormState, value: string | number) {
    setForm((prev) => ({
      ...prev,
      [field]: value as never,
    }));
  }

  // When modal opens in advanced mode, set editor HTML ONCE
  useEffect(() => {
    if (
      (modalMode === "create" || modalMode === "edit") &&
      form.mode === "advanced" &&
      advancedEditorRef.current
    ) {
      advancedEditorRef.current.innerHTML = form.advancedBody || "";
    }
  }, [modalMode, form.mode]);

  // toolbar helpers
  function focusAdvancedEditor() {
    if (!advancedEditorRef.current) return;
    advancedEditorRef.current.focus();
  }

  function applyCommand(command: string, value?: string) {
    focusAdvancedEditor();
    if (typeof document !== "undefined") {
      document.execCommand(command, false, value ?? "");
    }
  }

  function insertEmoji(emoji: string) {
    if (!emoji) return;
    focusAdvancedEditor();
    if (typeof document !== "undefined") {
      document.execCommand("insertText", false, emoji);
    }
  }

  function applyHeading(level: "normal" | "h1" | "h2" | "h3") {
    if (level === "normal") {
      applyCommand("formatBlock", "p");
    } else {
      applyCommand("formatBlock", level.toUpperCase());
    }
  }

  function applyCallout() {
    applyCommand("formatBlock", "blockquote");
  }

  function triggerImageUpload() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }

  async function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      focusAdvancedEditor();
      if (typeof document !== "undefined" && advancedEditorRef.current) {
        document.execCommand("insertImage", false, dataUrl);

        // Make the last image not huge
        const imgs = advancedEditorRef.current.getElementsByTagName("img");
        const img = imgs[imgs.length - 1];
        if (img) {
          img.style.maxWidth = "100%";
          img.style.height = "auto";
          img.style.display = "block";
          img.style.margin = "8px 0";
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleSave() {
    if (!form.book || form.chapter <= 0) return;

    const now = new Date();
    const createdAt = now.toISOString(); // store ISO

    if (editingNoteId && modalMode === "edit") {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNoteId
            ? {
                ...n,
                mode: form.mode,
                book: form.book,
                chapter: form.chapter,
                verseFrom: form.verseFrom,
                verseTo: form.verseTo,
                passage: form.mode === "guided" ? form.passage : "",
                research: form.mode === "guided" ? form.research : "",
                observe: form.mode === "guided" ? form.observe : "",
                write:
                  form.mode === "guided"
                    ? form.write
                    : form.advancedBody || "",
                advancedBody:
                  form.mode === "advanced"
                    ? form.advancedBody || ""
                    : undefined,
                // keep original createdAt on edit
              }
            : n
        )
      );
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        mode: form.mode,
        book: form.book,
        chapter: form.chapter,
        verseFrom: form.verseFrom,
        verseTo: form.verseTo,
        passage: form.mode === "guided" ? form.passage : "",
        research: form.mode === "guided" ? form.research : "",
        observe: form.mode === "guided" ? form.observe : "",
        write:
          form.mode === "guided" ? form.write : form.advancedBody || "",
        advancedBody:
          form.mode === "advanced" ? form.advancedBody || "" : undefined,
        createdAt,
      };

      setNotes((prev) => [newNote, ...prev]);
    }

    closeModal();
  }

  function handleDelete() {
    if (!editingNoteId) return;
    const yes = window.confirm("Delete this note? This cannot be undone.");
    if (!yes) return;

    setNotes((prev) => prev.filter((n) => n.id !== editingNoteId));
    closeModal();
  }

  const isModalOpen = modalMode !== null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* TITLE */}
        <header className="mb-4">
          <h1 className="text-3xl font-bold mb-1">Notes</h1>
          <p className="text-gray-700 text-sm">
            Save all your Bible notes in one place.
          </p>
        </header>

        {/* FILTERS + BUTTONS ON SAME ROW */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* Filter by book */}
            <div className="flex items-center gap-2">
              <div className="text-xs font-medium text-gray-600">
                Filter by book
              </div>
              <select
                value={bookFilter}
                onChange={(e) => setBookFilter(e.target.value)}
                className="w-full sm:w-40 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {BOOKS.map((book) => (
                  <option key={book} value={book}>
                    {book}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by date (sort) */}
            <div className="flex items-center gap-2">
              <div className="text-xs font-medium text-gray-600">
                Filter by date
              </div>
              <select
                value={dateSort}
                onChange={(e) =>
                  setDateSort(e.target.value as DateSort)
                }
                className="w-full sm:w-40 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={openNewGuidedNote}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs sm:text-sm font-semibold px-4 py-2 shadow-sm hover:bg-blue-700 transition"
            >
              + New guided note
            </button>
            <button
              type="button"
              onClick={openNewAdvancedNote}
              className="inline-flex items-center justify-center rounded-full bg-white text-blue-700 border border-blue-300 text-xs sm:text-sm font-semibold px-4 py-2 shadow-sm hover:bg-blue-50 transition"
            >
              + New advanced note
            </button>
          </div>
        </div>

        {/* GRID OF ICONS */}
        {filteredNotes.length === 0 ? (
          <div className="mt-6 text-sm text-gray-600">
            No notes yet. Click{" "}
            <button
              type="button"
              onClick={openNewGuidedNote}
              className="text-blue-600 font-semibold hover:underline"
            >
              New guided note
            </button>{" "}
            or{" "}
            <button
              type="button"
              onClick={openNewAdvancedNote}
              className="text-blue-600 font-semibold hover:underline"
            >
              New advanced note
            </button>{" "}
            to start.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => openExistingNote(note)}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl px-3 py-4 text-center shadow-sm transition hover:-translate-y-[2px] hover:shadow-md"
              >
                <div className="mb-2 flex h-14 w-14 items-center justify-center">
                  <Image
                    src={
                      note.mode === "advanced"
                        ? "/note-advanced.png"
                        : "/note-guided.png"
                    }
                    alt={note.mode === "advanced" ? "Advanced note" : "Guided note"}
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                </div>
                <div className="text-xs font-bold text-gray-900">
                  {formatReference(note)}
                </div>
                <div className="mt-1 text-[10px] text-gray-400">
                  {formatDisplayDate(note.createdAt)}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-black/10 bg-white p-6 shadow-2xl sm:p-7">
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <div className="mx-auto max-w-xl">
                {/* VIEW */}
                {modalMode === "view" && currentNote && (
                  <>
                    {currentNote.mode === "advanced" ? (
                      <>
                        <h2 className="mb-1 text-2xl font-bold">
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
                        <p className="mb-4 text-xs text-gray-500">
                          Advanced note · Saved{" "}
                          {formatDisplayDate(currentNote.createdAt)}
                        </p>

                        <div
                          className="prose prose-sm max-w-none text-sm leading-relaxed text-gray-800"
                          dangerouslySetInnerHTML={{
                            __html:
                              currentNote.advancedBody || currentNote.write,
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <h2 className="mb-1 text-2xl font-bold">
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
                        <p className="mb-4 text-xs text-gray-500">
                          Guided GROW note · Saved{" "}
                          {formatDisplayDate(currentNote.createdAt)}
                        </p>

                        <div className="space-y-5 text-sm leading-relaxed text-gray-800">
                          {currentNote.passage && (
                            <section>
                              <h3 className="mb-1 text-[13px] font-semibold text-blue-700">
                                G – Get the passage
                              </h3>
                              <p className="whitespace-pre-line">
                                {currentNote.passage}
                              </p>
                            </section>
                          )}

                          {currentNote.research && (
                            <section>
                              <h3 className="mb-1 text-[13px] font-semibold text-blue-700">
                                R – Research
                              </h3>
                              <p className="whitespace-pre-line">
                                {currentNote.research}
                              </p>
                            </section>
                          )}

                          {currentNote.observe && (
                            <section>
                              <h3 className="mb-1 text-[13px] font-semibold text-blue-700">
                                O – Observe
                              </h3>
                              <p className="whitespace-pre-line">
                                {currentNote.observe}
                              </p>
                            </section>
                          )}

                          {currentNote.write && (
                            <section>
                              <h3 className="mb-1 text-[13px] font-semibold text-blue-700">
                                W – Write
                              </h3>
                              <p className="whitespace-pre-line">
                                {currentNote.write}
                              </p>
                            </section>
                          )}
                        </div>
                      </>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setModalMode("edit");
                        }}
                        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}

                {/* CREATE / EDIT */}
                {(modalMode === "create" || modalMode === "edit") && (
                  <>
                    <h2 className="mb-2 text-xl font-bold">
                      {form.mode === "advanced"
                        ? modalMode === "edit"
                          ? "Edit advanced note"
                          : "New advanced note"
                        : modalMode === "edit"
                        ? "Edit guided note"
                        : "New GROW note"}
                    </h2>
                    <p className="mb-4 text-[11px] text-gray-500">
                      {form.mode === "advanced"
                        ? "Use this for long, free-form Bible breakdowns."
                        : "Use the G R O W method to study one passage deeply."}
                    </p>

                    {/* META */}
                    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
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
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Chapter
                        </label>
                        <select
                          value={form.chapter}
                          onChange={(e) =>
                            handleChange(
                              "chapter",
                              Number(e.target.value) || 1
                            )
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {Array.from(
                            { length: MAX_CHAPTER },
                            (_, i) => i + 1
                          ).map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Starting verse
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
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Ending verse
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

                    {/* BODY */}
                    {form.mode === "guided" ? (
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 text-xs font-semibold text-blue-700">
                            G – Get the passage
                          </div>
                          <textarea
                            value={form.passage}
                            onChange={(e) =>
                              handleChange("passage", e.target.value)
                            }
                            placeholder="Write the verse or short passage you are studying."
                            className="w-full min-h-[70px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>

                        <div>
                          <div className="mb-1 text-xs font-semibold text-blue-700">
                            R – Research
                          </div>
                          <textarea
                            value={form.research}
                            onChange={(e) =>
                              handleChange("research", e.target.value)
                            }
                            placeholder="Questions, context, who, what, when, where, why."
                            className="w-full min-h-[90px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>

                        <div>
                          <div className="mb-1 text-xs font-semibold text-blue-700">
                            O – Observe
                          </div>
                          <textarea
                            value={form.observe}
                            onChange={(e) =>
                              handleChange("observe", e.target.value)
                            }
                            placeholder="Patterns, repeated words, big ideas, connections."
                            className="w-full min-h-[90px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>

                        <div>
                          <div className="mb-1 text-xs font-semibold text-blue-700">
                            W – Write
                          </div>
                          <textarea
                            value={form.write}
                            onChange={(e) =>
                              handleChange("write", e.target.value)
                            }
                            placeholder="Write this like a journal entry."
                            className="w-full min-h-[110px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {/* TOOLBAR */}
                        <div className="mb-1 flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                          <span className="mr-2 text-[11px] text-gray-500">
                            Advanced editor
                          </span>

                          <button
                            type="button"
                            onClick={() => applyCommand("bold")}
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] hover:bg-gray-100"
                          >
                            B
                          </button>
                          <button
                            type="button"
                            onClick={() => applyCommand("italic")}
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] italic hover:bg-gray-100"
                          >
                            I
                          </button>

                          {/* Heading dropdown */}
                          <select
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px]"
                            onChange={(e) => {
                              const value = e.target.value as
                                | "normal"
                                | "h1"
                                | "h2"
                                | "h3";
                              applyHeading(value);
                              e.target.value = "normal";
                            }}
                            defaultValue="normal"
                          >
                            <option value="normal">Normal</option>
                            <option value="h1">Heading 1</option>
                            <option value="h2">Heading 2</option>
                            <option value="h3">Heading 3</option>
                          </select>

                          {/* Callout */}
                          <button
                            type="button"
                            onClick={applyCallout}
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] hover:bg-gray-100"
                          >
                            Callout
                          </button>

                          {/* Image */}
                          <button
                            type="button"
                            onClick={triggerImageUpload}
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] hover:bg-gray-100"
                          >
                            Image
                          </button>
                          <input
                            type="file"
                            ref={imageInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageSelected}
                          />

                          {/* Emoji dropdown */}
                          <select
                            className="ml-auto rounded border border-gray-300 bg-white px-2 py-1 text-[11px]"
                            onChange={(e) => {
                              insertEmoji(e.target.value);
                              e.target.value = "";
                            }}
                            defaultValue=""
                          >
                            <option value="">Emoji</option>
                            {EMOJIS.map((emoji) => (
                              <option key={emoji} value={emoji}>
                                {emoji}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* EDITOR */}
                        <div
                          ref={advancedEditorRef}
                          contentEditable
                          className="w-full min-h-[220px] whitespace-pre-wrap rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onInput={(e) =>
                            handleChange(
                              "advancedBody",
                              (e.currentTarget as HTMLDivElement).innerHTML
                            )
                          }
                          suppressContentEditableWarning={true}
                        />
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
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
