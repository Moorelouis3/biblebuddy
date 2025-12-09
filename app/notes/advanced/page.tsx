"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

const ALL_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah", "Lamentations",
  "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy",
  "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
  "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
  "Jude", "Revelation"
];

const MAX_CHAPTER = 150;
const MAX_VERSE = 176;

const EMOJIS = ["🙏", "❤️", "✨", "🌟", "💫", "🔥", "💪", "🎯", "📖", "✝️", "🕊️", "⭐", "💡", "🎉", "🙌", "😊", "😇", "🤗", "💯", "🎁"];

function AdvancedNotePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");
  
  const [userId, setUserId] = useState<string | null>(null);
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState(1);
  const [verseFrom, setVerseFrom] = useState(1);
  const [verseTo, setVerseTo] = useState(1);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (noteId && userId) {
      loadNote();
    } else {
      setLoading(false);
    }
  }, [noteId, userId]);

  useEffect(() => {
    // Add resize handlers to existing images when content loads
    if (editorRef.current) {
      const images = editorRef.current.querySelectorAll("img");
      images.forEach((img) => {
        img.classList.add("resizable-image");
        img.style.cursor = "pointer";
        img.addEventListener("mousedown", handleImageResize);
      });
    }
  }, [content]);

  async function loadNote() {
    if (!noteId || !userId) return;
    
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", noteId)
      .eq("user_id", userId)
      .single();

    if (data && !error) {
      setBook(data.book || "");
      setChapter(data.chapter || 1);
      setVerseFrom(data.verse_from || 1);
      setVerseTo(data.verse_to || 1);
      // For advanced notes, content is stored in a 'content' field (HTML)
      // If not available, check 'write' field as fallback
      setContent(data.content || data.write || "");
      
      // Load content into editor
      if (editorRef.current) {
        editorRef.current.innerHTML = data.content || data.write || "";
      }
    }
    setLoading(false);
  }

  function execCommand(command: string, value?: string) {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }

  function insertEmoji(emoji: string) {
    execCommand("insertText", emoji);
    setShowEmojiPicker(false);
  }

  function handleImageResize(e: MouseEvent) {
    const img = e.target as HTMLImageElement;
    if (!img || !img.classList.contains("resizable-image")) return;

    const startX = e.clientX;
    const startWidth = img.offsetWidth;
    const startHeight = img.offsetHeight;
    const aspectRatio = startWidth / startHeight;

    function onMouseMove(e: MouseEvent) {
      const diff = e.clientX - startX;
      const newWidth = Math.max(100, startWidth + diff);
      const newHeight = newWidth / aspectRatio;
      img.style.width = `${newWidth}px`;
      img.style.height = `${newHeight}px`;
      img.style.maxWidth = "100%";
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  }

  function insertImage() {
    const url = prompt("Enter image URL:");
    if (url) {
      const img = `<img src="${url}" style="max-width: 100%; height: auto; cursor: pointer;" contenteditable="false" class="resizable-image" />`;
      execCommand("insertHTML", img);
      
      // Add resize handlers after image is inserted
      setTimeout(() => {
        const images = editorRef.current?.querySelectorAll(".resizable-image");
        images?.forEach((img) => {
          (img as HTMLImageElement).addEventListener("mousedown", handleImageResize);
        });
      }, 100);
    }
  }

  function handleContentChange() {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  }

  async function handleSave() {
    if (!userId || !book) {
      alert("Please select a book");
      return;
    }

    setSaving(true);
    try {
      const htmlContent = editorRef.current?.innerHTML || content;

      if (noteId) {
        // Update existing note
        const { error } = await supabase
          .from("notes")
          .update({
            book,
            chapter,
            verse_from: verseFrom,
            verse_to: verseTo,
            content: htmlContent,
            note_type: "ADVANCED"
          })
          .eq("id", noteId)
          .eq("user_id", userId);

        if (error) throw error;
      } else {
        // Create new note
        const { error } = await supabase
          .from("notes")
          .insert({
            user_id: userId,
            book,
            chapter,
            verse_from: verseFrom,
            verse_to: verseTo,
            content: htmlContent,
            note_type: "ADVANCED"
          });

        if (error) throw error;
      }

      router.push("/notes");
    } catch (error: any) {
      console.error("Error saving note:", error);
      alert(`Failed to save note: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Advanced Note</h1>
          <button
            onClick={() => router.push("/notes")}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Book/Chapter/Verse Selectors */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Book</label>
              <select
                value={book}
                onChange={(e) => setBook(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select book</option>
                {ALL_BOOKS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chapter</label>
              <select
                value={chapter}
                onChange={(e) => setChapter(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Array.from({ length: MAX_CHAPTER }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Starting Verse</label>
              <select
                value={verseFrom}
                onChange={(e) => setVerseFrom(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Array.from({ length: MAX_VERSE }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Verse</label>
              <select
                value={verseTo}
                onChange={(e) => setVerseTo(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Array.from({ length: MAX_VERSE }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {/* Headers */}
            <button
              onClick={() => execCommand("formatBlock", "h1")}
              className="px-3 py-2 text-sm font-semibold border border-gray-300 rounded hover:bg-gray-50"
              title="Heading 1"
            >
              H1
            </button>
            <button
              onClick={() => execCommand("formatBlock", "h2")}
              className="px-3 py-2 text-sm font-semibold border border-gray-300 rounded hover:bg-gray-50"
              title="Heading 2"
            >
              H2
            </button>
            <button
              onClick={() => execCommand("formatBlock", "h3")}
              className="px-3 py-2 text-sm font-semibold border border-gray-300 rounded hover:bg-gray-50"
              title="Heading 3"
            >
              H3
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Text Formatting */}
            <button
              onClick={() => execCommand("bold")}
              className="px-3 py-2 text-sm font-bold border border-gray-300 rounded hover:bg-gray-50"
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => execCommand("italic")}
              className="px-3 py-2 text-sm italic border border-gray-300 rounded hover:bg-gray-50"
              title="Italic"
            >
              <em>I</em>
            </button>
            <button
              onClick={() => execCommand("underline")}
              className="px-3 py-2 text-sm underline border border-gray-300 rounded hover:bg-gray-50"
              title="Underline"
            >
              <u>U</u>
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Emoji Picker */}
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                title="Insert Emoji"
              >
                😊
              </button>
              {showEmojiPicker && (
                <>
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 w-64">
                    <div className="grid grid-cols-5 gap-2">
                      {EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => insertEmoji(emoji)}
                          className="text-2xl hover:bg-gray-100 rounded p-1"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowEmojiPicker(false)}
                  />
                </>
              )}
            </div>

            {/* Image */}
            <button
              onClick={insertImage}
              className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
              title="Insert Image"
            >
              🖼️
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-lg shadow-sm min-h-[500px] p-6">
          <div
            ref={editorRef}
            contentEditable
            onInput={handleContentChange}
            className="min-h-[500px] outline-none prose max-w-none"
            style={{
              lineHeight: "1.6",
            }}
            suppressContentEditableWarning
          />
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving || !book}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdvancedNotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <AdvancedNotePageContent />
    </Suspense>
  );
}
