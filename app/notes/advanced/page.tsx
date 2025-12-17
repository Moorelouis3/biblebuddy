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

export default function AdvancedNotePage() {
  const router = useRouter();
  const [noteId, setNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
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
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4",
        'data-placeholder': 'Start typing your note here...',
      },
    },
  });

  // Load note data if editing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const editData = params.get("edit");
    
    if (editData) {
      try {
        const noteData = JSON.parse(decodeURIComponent(editData));
        setNoteId(noteData.id);
        setTitle(noteData.title || "");
        if (editor && noteData.content) {
          editor.commands.setContent(noteData.content);
        }
      } catch (err) {
        console.error("Error parsing edit data:", err);
      }
    }
  }, [editor]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  async function handleSave() {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    if (!editor) {
      setError("Editor not ready");
      return;
    }

    const content = editor.getHTML();
    if (!content || content === "<p></p>") {
      setError("Please add some content");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Not authenticated");
      }

      // Save or update advanced note
      if (noteId) {
        // Update existing note
        const { error: updateError } = await supabase
          .from("notes")
          .update({
            passage: title.trim(),
            write: content,
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
            book: "Advanced",
            chapter: 0,
            verse_from: null,
            verse_to: null,
            passage: title.trim(), // Store title in passage field
            research: "", // Empty for advanced notes
            observe: "", // Empty for advanced notes
            write: content, // Store HTML content in write field
          });

        if (saveError) {
          throw saveError;
        }
      }

      if (saveError) {
        throw saveError;
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

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Toolbar */}
        <div className="mb-2 bg-white border border-gray-200 rounded-t-xl p-2 flex flex-wrap gap-2">
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

          {/* Emoji button - opens emoji picker or allows pasting */}
          <button
            onClick={() => {
              // Insert emoji at cursor - user can type emojis or paste them
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

