"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "@tiptap/extension-image";

// Custom Image extension with resizing
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: attributes => {
          if (!attributes.width) {
            return {};
          }
          return {
            width: attributes.width,
          };
        },
        parseHTML: element => element.getAttribute('width'),
      },
      height: {
        default: null,
        renderHTML: attributes => {
          if (!attributes.height) {
            return {};
          }
          return {
            height: attributes.height,
          };
        },
        parseHTML: element => element.getAttribute('height'),
      },
    };
  },
});

// Complete Bible books with chapter counts
const BIBLE_BOOKS: Record<string, number> = {
  "Genesis": 50,
  "Exodus": 40,
  "Leviticus": 27,
  "Numbers": 36,
  "Deuteronomy": 34,
  "Joshua": 24,
  "Judges": 21,
  "Ruth": 4,
  "1 Samuel": 31,
  "2 Samuel": 24,
  "1 Kings": 22,
  "2 Kings": 25,
  "1 Chronicles": 29,
  "2 Chronicles": 36,
  "Ezra": 10,
  "Nehemiah": 13,
  "Esther": 10,
  "Job": 42,
  "Psalms": 150,
  "Proverbs": 31,
  "Ecclesiastes": 12,
  "Song of Solomon": 8,
  "Isaiah": 66,
  "Jeremiah": 52,
  "Lamentations": 5,
  "Ezekiel": 48,
  "Daniel": 12,
  "Hosea": 14,
  "Joel": 3,
  "Amos": 9,
  "Obadiah": 1,
  "Jonah": 4,
  "Micah": 7,
  "Nahum": 3,
  "Habakkuk": 3,
  "Zephaniah": 3,
  "Haggai": 2,
  "Zechariah": 14,
  "Malachi": 4,
  "Matthew": 28,
  "Mark": 16,
  "Luke": 24,
  "John": 21,
  "Acts": 28,
  "Romans": 16,
  "1 Corinthians": 16,
  "2 Corinthians": 13,
  "Galatians": 6,
  "Ephesians": 6,
  "Philippians": 4,
  "Colossians": 4,
  "1 Thessalonians": 5,
  "2 Thessalonians": 3,
  "1 Timothy": 6,
  "2 Timothy": 4,
  "Titus": 3,
  "Philemon": 1,
  "Hebrews": 13,
  "James": 5,
  "1 Peter": 5,
  "2 Peter": 3,
  "1 John": 5,
  "2 John": 1,
  "3 John": 1,
  "Jude": 1,
  "Revelation": 22,
};

const BOOK_NAMES = Object.keys(BIBLE_BOOKS);
const MAX_CHAPTER = 150; // Psalms has 150 chapters, the highest in any book
const MAX_VERSE = 176; // Psalms 119 has 176 verses, the highest in any chapter

export default function AdvancedNotePage() {
  const router = useRouter();
  const [noteId, setNoteId] = useState<string | null>(null);
  const [book, setBook] = useState("Matthew");
  const [chapter, setChapter] = useState(1);
  const [verseFrom, setVerseFrom] = useState(1);
  const [verseTo, setVerseTo] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      ResizableImage.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: "",
    immediatelyRender: false, // Required for SSR to avoid hydration mismatches
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4",
        'data-placeholder': 'Start typing your note here...',
      },
    },
  });

  // When book changes, reset chapter if it exceeds that book's max
  useEffect(() => {
    const bookMaxChapters = BIBLE_BOOKS[book] || 28;
    if (chapter > bookMaxChapters) {
      setChapter(1);
    }
  }, [book, chapter]);

  // When chapter changes, reset verses if they exceed max
  useEffect(() => {
    if (verseFrom > MAX_VERSE) {
      setVerseFrom(1);
    }
    if (verseTo > MAX_VERSE) {
      setVerseTo(1);
    }
    // Ensure verseTo >= verseFrom
    if (verseTo < verseFrom) {
      setVerseTo(verseFrom);
    }
  }, [chapter, verseFrom, verseTo]);

  // Store note data when editing
  const [editNoteData, setEditNoteData] = useState<any>(null);

  // Load note data if editing
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const editId = params.get("edit");

    if (!editId) return;

    async function loadNote() {
      try {
        // 1) Try sessionStorage (fast path from Notes page)
        const storedData = sessionStorage.getItem("editNoteData");
        if (storedData) {
          const noteData = JSON.parse(storedData);
          sessionStorage.removeItem("editNoteData");
          setEditNoteData(noteData);
          setNoteId(noteData.id);
          if (noteData.book) setBook(noteData.book);
          if (noteData.chapter) setChapter(noteData.chapter);
          if (noteData.verseFrom) setVerseFrom(noteData.verseFrom);
          if (noteData.verseTo) setVerseTo(noteData.verseTo);
          return;
        }

        // 2) Fallback: fetch from Supabase by ID (for live app / direct links)
        const { data, error } = await supabase
          .from("notes")
          .select("id, book, chapter, verse_from, verse_to, write")
          .eq("id", Number(editId))
          .single();

        if (error || !data) {
          console.error("Error loading note for editing:", error);
          return;
        }

        const normalized = {
          id: data.id,
          book: data.book,
          chapter: data.chapter,
          verseFrom: data.verse_from,
          verseTo: data.verse_to,
          write: data.write || "",
        };

        setEditNoteData(normalized);
        setNoteId(normalized.id);
        if (normalized.book) setBook(normalized.book);
        if (normalized.chapter) setChapter(normalized.chapter);
        if (normalized.verseFrom) setVerseFrom(normalized.verseFrom);
        if (normalized.verseTo) setVerseTo(normalized.verseTo);
      } catch (err) {
        console.error("Error loading edit note data:", err);
      }
    }

    loadNote();
  }, []);

  // Set editor content when editor is ready and note data is loaded
  useEffect(() => {
    if (!editor || !editNoteData) return;

    const content: string = editNoteData.write || "";
    if (!content) return;

    const isHtml = /<[a-z][\s\S]*>/i.test(content);
    if (isHtml) {
      editor.commands.setContent(content);
    } else {
      const paragraphs = content
        .split(/\n\s*\n/)
        .filter((p: string) => p.trim());
      const htmlContent = paragraphs
        .map((p: string) => `<p>${p.trim().split("\n").join("<br>")}</p>`)
        .join("");
      editor.commands.setContent(htmlContent || "<p></p>");
    }
  }, [editor, editNoteData]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  async function handleSave() {
    if (!editor) {
      setError("Editor not ready");
      return;
    }

    const content = editor.getHTML();
    if (!content || content === "<p></p>") {
      setError("Please add some content");
      return;
    }

    if (!book) {
      setError("Please select a book");
      return;
    }

    if (!chapter || chapter < 1) {
      setError("Please select a chapter");
      return;
    }

    if (!verseFrom || verseFrom < 1) {
      setError("Please select a verse");
      return;
    }

    if (verseTo < verseFrom) {
      setError("Verse 'to' must be greater than or equal to verse 'from'");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Not authenticated");
      }

      // Save or update note - same structure as GROW notes
      if (noteId) {
        // Update existing note
        const { error: updateError } = await supabase
          .from("notes")
          .update({
            book: book,
            chapter: chapter,
            verse_from: verseFrom,
            verse_to: verseTo,
            passage: "", // Empty for advanced notes
            research: "", // Empty for advanced notes
            observe: "", // Empty for advanced notes
            write: content, // HTML content from editor
          })
          .eq("id", Number(noteId))
          .eq("user_id", user.id);

        if (updateError) {
          throw updateError;
        }
      } else {
        // Create new note
        const { error: saveError } = await supabase
          .from("notes")
          .insert({
            user_id: user.id,
            book: book,
            chapter: chapter,
            verse_from: verseFrom,
            verse_to: verseTo,
            passage: "", // Empty for advanced notes
            research: "", // Empty for advanced notes
            observe: "", // Empty for advanced notes
            write: content, // HTML content from editor
          });

        if (saveError) {
          throw saveError;
        }
      }

      router.push("/notes");
    } catch (err: any) {
      console.error("Error saving note:", err);
      setError(err.message || "Failed to save note");
    } finally {
      setSaving(false);
    }
  }

  function handleImageUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !editor) return;

      // Convert to base64 for simplicity
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  if (!editor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Advanced Note</h1>
          <button
            onClick={() => router.push("/notes")}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back to Notes
          </button>
        </div>

        {/* Dropdowns */}
        <div className="mb-4 bg-white rounded-xl border border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Book Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Book
            </label>
            <select
              value={book}
              onChange={(e) => setBook(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {BOOK_NAMES.map((bookName) => (
                <option key={bookName} value={bookName}>
                  {bookName}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Chapter
            </label>
            <select
              value={chapter}
              onChange={(e) => setChapter(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {Array.from({ length: MAX_CHAPTER }, (_, i) => i + 1).map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>

          {/* Verse From Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Verse From
            </label>
            <select
              value={verseFrom}
              onChange={(e) => {
                const newFrom = Number(e.target.value);
                setVerseFrom(newFrom);
                if (verseTo < newFrom) {
                  setVerseTo(newFrom);
                }
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {Array.from({ length: MAX_VERSE }, (_, i) => i + 1).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Verse To Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Verse To
            </label>
            <select
              value={verseTo}
              onChange={(e) => setVerseTo(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {Array.from({ length: MAX_VERSE }, (_, i) => i + 1).map((v) => (
                <option key={v} value={v} disabled={v < verseFrom}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Toolbar - Sticky at top */}
        <div className="sticky top-0 z-50 mb-2 bg-white border border-gray-200 rounded-t-xl p-2 flex flex-wrap gap-2 shadow-sm">
          {/* Text formatting */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`px-3 py-1.5 rounded text-sm font-semibold ${
              editor.isActive("bold")
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`px-3 py-1.5 rounded text-sm font-semibold italic ${
              editor.isActive("italic")
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-3 py-1.5 rounded text-sm font-semibold underline ${
              editor.isActive("underline")
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            U
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Headers */}
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1.5 rounded text-sm font-semibold ${
              editor.isActive("heading", { level: 1 })
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-1.5 rounded text-sm font-semibold ${
              editor.isActive("heading", { level: 2 })
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-1.5 rounded text-sm font-semibold ${
              editor.isActive("heading", { level: 3 })
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            H3
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Quote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 rounded text-sm ${
            editor.isActive("blockquote")
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          ❝ Quote
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1.5 rounded text-sm ${
              editor.isActive("bulletList")
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            • List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1.5 rounded text-sm ${
              editor.isActive("orderedList")
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            1. List
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Image */}
          <button
            onClick={handleImageUpload}
            className="px-3 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            📷 Image
          </button>

          {/* Emoji button */}
          <button
            onClick={() => {
              const emoji = prompt("Type or paste an emoji:");
              if (emoji && editor) {
                editor.chain().focus().insertContent(emoji).run();
              }
            }}
            className="px-3 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            😀 Emoji
          </button>
        </div>

        {/* Editor */}
        <div className="bg-white border border-gray-200 rounded-b-xl shadow-sm min-h-[500px]">
          <EditorContent editor={editor} />
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Save buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => router.push("/notes")}
            className="px-5 py-2.5 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .ProseMirror li {
          margin: 0.25rem 0;
        }
        .ProseMirror p {
          margin: 0.5rem 0;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
