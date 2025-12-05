"use client";

import { useState, useRef, useEffect } from "react";
import type React from "react";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";

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

  const [userId, setUserId] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [savingNote, setSavingNote] = useState(false);

  const advancedEditorRef = useRef<HTMLDivElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const lastSelectionRef = useRef<Range | null>(null);

  function saveSelection() {
    if (typeof window === "undefined") return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    lastSelectionRef.current = sel.getRangeAt(0);
  }

  function restoreSelection() {
    if (typeof window === "undefined") return;
    const sel = window.getSelection();
    if (!sel || !lastSelectionRef.current) return;
    sel.removeAllRanges();
    sel.addRange(lastSelectionRef.current);
  }

  // LOAD USER AND NOTES
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

        const mapped: Note[] =
          data?.map((row: any) => {
            const looksAdvanced =
              (!row.passage && !row.research && !row.observe && row.write) &&
              typeof row.write === "string" &&
              row.write.includes("<");

            const mode: NoteMode = looksAdvanced ? "advanced" : "guided";

            return {
              id: String(row.id),
              mode,
              book: row.book,
              chapter: row.chapter,
              verseFrom: row.verse_from,
              verseTo: row.verse_to,
              passage: row.passage ?? "",
              research: row.research ?? "",
              observe: row.observe ?? "",
              write: row.write ?? "",
              advancedBody: looksAdvanced ? row.write ?? "" : undefined,
              createdAt: row.created_at,
            };
          }) ?? [];

        setNotes(mapped);
      } catch (err) {
        console.error("Error getting supabase user or notes", err);
      } finally {
        setLoadingNotes(false);
      }
    }

    loadUserAndNotes();
  }, []);

  // FILTER AND SORT
  const notesByBook =
    bookFilter === "All books"
      ? notes
      : notes.filter((n) => n.book === bookFilter);

  const filteredNotes = [...notesByBook].sort((a, b) => {
    const da = new Date(a.createdAt).getTime();
    const db = new Date(b.createdAt).getTime();
    return dateSort === "newest" ? db - da : da - db;
  });

  function resetModalState() {
    // nothing yet
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

  // Set editor HTML when advanced editor opens or mode/body changes
  useEffect(() => {
    if (
      (modalMode === "create" || modalMode === "edit") &&
      form.mode === "advanced" &&
      advancedEditorRef.current
    ) {
      advancedEditorRef.current.innerHTML = form.advancedBody || "";
    }
  }, [modalMode, form.mode, form.advancedBody]); // constant length dependency array

  // ADVANCED EDITOR HELPERS

  function focusAdvancedEditor() {
    if (!advancedEditorRef.current) return;
    advancedEditorRef.current.focus();
  }

  function applyCommand(command: string, value?: string) {
    if (typeof document === "undefined") return;
    focusAdvancedEditor();
    restoreSelection();
    document.execCommand(command, false, value ?? "");
  }

  function applyUndo() {
    if (typeof document === "undefined") return;
    focusAdvancedEditor();
    restoreSelection();
    document.execCommand("undo");
  }

  function insertEmoji(emoji: string) {
    if (!emoji) return;
    if (typeof document === "undefined") return;
    focusAdvancedEditor();
    restoreSelection();
    document.execCommand("insertText", false, emoji);
  }

  // HEADINGS
  function toggleHeading(level: "normal" | "h1" | "h2" | "h3") {
    if (typeof window === "undefined" || !advancedEditorRef.current) return;

    focusAdvancedEditor();
    restoreSelection();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);

    const editor = advancedEditorRef.current;
    let node = range.startContainer as HTMLElement | null;
    while (
      node &&
      node !== editor &&
      !["P", "DIV", "H1", "H2", "H3"].includes(node.nodeName)
    ) {
      node = node.parentElement;
    }

    const doc = editor.ownerDocument;

    function styleBlock(el: HTMLElement, tag: string) {
      el.style.margin = "6px 0";
      if (tag === "H1") {
        el.style.fontSize = "1.5rem";
        el.style.fontWeight = "700";
      } else if (tag === "H2") {
        el.style.fontSize = "1.25rem";
        el.style.fontWeight = "700";
      } else if (tag === "H3") {
        el.style.fontSize = "1.1rem";
        el.style.fontWeight = "600";
      } else {
        el.style.fontSize = "1rem";
        el.style.fontWeight = "400";
      }
    }

    let newTag = "P";
    if (level === "h1") newTag = "H1";
    if (level === "h2") newTag = "H2";
    if (level === "h3") newTag = "H3";

    // CASE 1: selection directly inside editor
    if (!node || node === editor) {
      const newBlock = doc.createElement(newTag);
      const selectedContents = range.cloneContents();

      if (selectedContents && selectedContents.childNodes.length > 0) {
        newBlock.appendChild(selectedContents);
      } else {
        newBlock.innerHTML = "<br>";
      }

      styleBlock(newBlock, newTag);

      range.deleteContents();
      range.insertNode(newBlock);

      const newRange = doc.createRange();
      newRange.selectNodeContents(newBlock);
      newRange.collapse(false);
      sel.removeAllRanges();
      sel.addRange(newRange);
      saveSelection();
      return;
    }

    // CASE 2: we already have a block
    const currentBlock = node;

    if (level !== "normal" && currentBlock.nodeName === newTag) {
      newTag = "P";
    }

    const newBlock = doc.createElement(newTag);
    newBlock.innerHTML = currentBlock.innerHTML;
    styleBlock(newBlock, newTag);

    currentBlock.parentNode?.replaceChild(newBlock, currentBlock);

    const newRange = doc.createRange();
    newRange.selectNodeContents(newBlock);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
    saveSelection();
  }

  function applyCallout() {
    if (typeof window === "undefined" || !advancedEditorRef.current) return;

    focusAdvancedEditor();
    restoreSelection();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);

    const doc = advancedEditorRef.current.ownerDocument;

    const selectedHtml = range.cloneContents();
    const calloutWrapper = doc.createElement("div");
    calloutWrapper.className = "bb-callout";
    calloutWrapper.style.borderLeft = "4px solid rgb(59 130 246)";
    calloutWrapper.style.backgroundColor = "rgb(239 246 255)";
    calloutWrapper.style.padding = "8px 12px";
    calloutWrapper.style.borderRadius = "8px";
    calloutWrapper.style.margin = "8px 0";

    const inner = doc.createElement("p");
    inner.style.margin = "0";
    if (selectedHtml.childNodes.length > 0) {
      inner.appendChild(selectedHtml);
    } else {
      inner.textContent = "Callout text...";
    }
    calloutWrapper.appendChild(inner);

    const bottomP = doc.createElement("p");
    bottomP.innerHTML = "<br>";

    range.deleteContents();
    const fragment = doc.createDocumentFragment();
    fragment.appendChild(calloutWrapper);
    fragment.appendChild(bottomP);
    range.insertNode(fragment);

    const newRange = doc.createRange();
    newRange.selectNodeContents(bottomP);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);
    saveSelection();
  }

  function triggerImageUpload() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }

  function insertResizableImage(dataUrl: string) {
    if (!advancedEditorRef.current || typeof window === "undefined") return;

    focusAdvancedEditor();
    restoreSelection();

    const sel = window.getSelection();
    const range =
      sel && sel.rangeCount > 0
        ? sel.getRangeAt(0)
        : document.createRange();

    const doc = advancedEditorRef.current.ownerDocument;

    const wrapper = doc.createElement("div");
    wrapper.style.display = "inline-block";
    wrapper.style.maxWidth = "100%";
    wrapper.style.resize = "both";
    wrapper.style.overflow = "hidden";
    wrapper.style.margin = "8px 0";
    wrapper.style.borderRadius = "8px";

    const img = doc.createElement("img");
    img.src = dataUrl;
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.display = "block";

    wrapper.appendChild(img);

    range.deleteContents();
    range.insertNode(wrapper);

    range.setStartAfter(wrapper);
    range.setEndAfter(wrapper);
    sel?.removeAllRanges();
    sel?.addRange(range);
    saveSelection();
  }

  async function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      insertResizableImage(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  // SAVE OR UPDATE NOTE
  async function handleSave() {
    if (!form.book || form.chapter <= 0) return;

    if (!userId) {
      alert("You need to be logged in to save notes.");
      return;
    }

    setSavingNote(true);

    try {
      if (editingNoteId && modalMode === "edit") {
        const { data, error } = await supabase
          .from("notes")
          .update({
            book: form.book,
            chapter: form.chapter,
            verse_from: form.verseFrom,
            verse_to: form.verseTo,
            passage: form.mode === "guided" ? form.passage : "",
            research: form.mode === "guided" ? form.research : "",
            observe: form.mode === "guided" ? form.observe : "",
            write:
              form.mode === "guided"
                ? form.write
                : form.advancedBody || "",
          })
          .eq("id", Number(editingNoteId))
          .eq("user_id", userId)
          .select()
          .single();

        if (error) {
          console.error("Error updating note", error);
          return;
        }

        const looksAdvanced =
          (!data.passage && !data.research && !data.observe && data.write) &&
          typeof data.write === "string" &&
          data.write.includes("<");

        const mode: NoteMode = looksAdvanced ? "advanced" : "guided";

        const updated: Note = {
          id: String(data.id),
          mode,
          book: data.book,
          chapter: data.chapter,
          verseFrom: data.verse_from,
          verseTo: data.verse_to,
          passage: data.passage ?? "",
          research: data.research ?? "",
          observe: data.observe ?? "",
          write: data.write ?? "",
          advancedBody: looksAdvanced ? data.write ?? "" : undefined,
          createdAt: data.created_at,
        };

        setNotes((prev) =>
          prev.map((n) => (n.id === updated.id ? updated : n))
        );
      } else {
        const { data, error } = await supabase
          .from("notes")
          .insert([
            {
              user_id: userId,
              book: form.book,
              chapter: form.chapter,
              verse_from: form.verseFrom,
              verse_to: form.verseTo,
              passage: form.mode === "guided" ? form.passage : "",
              research: form.mode === "guided" ? form.research : "",
              observe: form.mode === "guided" ? form.observe : "",
              write:
                form.mode === "guided"
                  ? form.write
                  : form.advancedBody || "",
            },
          ])
          .select()
          .single();

        if (error) {
          console.error("Error inserting note", error);
          return;
        }

        const looksAdvanced =
          (!data.passage && !data.research && !data.observe && data.write) &&
          typeof data.write === "string" &&
          data.write.includes("<");

        const mode: NoteMode = looksAdvanced ? "advanced" : "guided";

        const newNote: Note = {
          id: String(data.id),
          mode,
          book: data.book,
          chapter: data.chapter,
          verseFrom: data.verse_from,
          verseTo: data.verse_to,
          passage: data.passage ?? "",
          research: data.research ?? "",
          observe: data.observe ?? "",
          write: data.write ?? "",
          advancedBody: looksAdvanced ? data.write ?? "" : undefined,
          createdAt: data.created_at,
        };

        setNotes((prev) => [newNote, ...prev]);
      }

      closeModal();
    } finally {
      setSavingNote(false);
    }
  }

  // DELETE NOTE
  async function handleDelete() {
    if (!editingNoteId) return;
    if (!userId) return;

    const yes = window.confirm("Delete this note? This cannot be undone.");
    if (!yes) return;

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", Number(editingNoteId))
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting note", error);
      return;
    }

    setNotes((prev) => prev.filter((n) => n.id !== editingNoteId));
    closeModal();
  }

  const isModalOpen = modalMode !== null;

  // RENDER
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-4">
          <h1 className="text-3xl font-bold mb-1">Notes</h1>
          <p className="text-gray-700 text-sm">
            Save all your Bible notes in one place.
          </p>
        </header>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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

            <div className="flex items-center gap-2">
              <div className="text-xs font-medium text-gray-600">
                Filter by date
              </div>
              <select
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value as DateSort)}
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
              New guided note
            </button>
            <button
              type="button"
              onClick={openNewAdvancedNote}
              className="inline-flex items-center justify-center rounded-full bg-white text-blue-700 border border-blue-300 text-xs sm:text-sm font-semibold px-4 py-2 shadow-sm hover:bg-blue-50 transition"
            >
              New advanced note
            </button>
          </div>
        </div>

        {loadingNotes ? (
          <div className="mt-6 text-sm text-gray-500">
            Loading your notes…
          </div>
        ) : filteredNotes.length === 0 ? (
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
                    alt={
                      note.mode === "advanced"
                        ? "Advanced note"
                        : "Guided note"
                    }
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
                {modalMode === "view" && currentNote && (
                  <>
                    {currentNote.mode === "advanced" ? (
                      <>
                        <h2 className="mb-1 text-2xl font-bold">
                          {currentNote.book} {currentNote.chapter}
                          {currentNote.verseFrom && (
                            <span className="text-base font-normal text-gray-600">
                              {" "}
                              verses {currentNote.verseFrom}
                              {currentNote.verseTo &&
                              currentNote.verseTo !==
                                currentNote.verseFrom
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
                              currentNote.advancedBody ||
                              currentNote.write,
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
                              verses {currentNote.verseFrom}
                              {currentNote.verseTo &&
                              currentNote.verseTo !==
                                currentNote.verseFrom
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
                        ? "Use this for long free form Bible breakdowns."
                        : "Use the G R O W method to study one passage deeply."}
                    </p>

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
                            placeholder="Questions context who what when where why."
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
                            placeholder="Patterns repeated words big ideas connections."
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
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] font-semibold hover:bg-gray-100"
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

                          <select
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px]"
                            onChange={(e) => {
                              const value = e.target.value as
                                | "normal"
                                | "h1"
                                | "h2"
                                | "h3";
                              toggleHeading(value);
                              e.target.value = "normal";
                            }}
                            defaultValue="normal"
                          >
                            <option value="normal">Normal</option>
                            <option value="h1">Heading 1</option>
                            <option value="h2">Heading 2</option>
                            <option value="h3">Heading 3</option>
                          </select>

                          <button
                            type="button"
                            onClick={applyCallout}
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] hover:bg-gray-100"
                          >
                            Callout
                          </button>

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

                          <button
                            type="button"
                            onClick={applyUndo}
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] hover:bg-gray-100"
                          >
                            Undo
                          </button>

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

                        {/* ADVANCED EDITOR */}
                        <div
                          ref={advancedEditorRef}
                          contentEditable
                          dir="ltr"
                          className="w-full min-h-[220px] whitespace-pre-wrap rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onInput={(e) =>
                            handleChange(
                              "advancedBody",
                              (e.currentTarget as HTMLDivElement).innerHTML
                            )
                          }
                          onMouseUp={saveSelection}
                          onKeyUp={saveSelection}
                          onBlur={saveSelection}
                          suppressContentEditableWarning={true}
                        />
                      </div>
                    )}

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
                        disabled={savingNote}
                        className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {savingNote ? "Saving…" : "Save note"}
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
