"use client";

import dynamic from "next/dynamic";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { MouseEvent } from "react";
import type { MentionCatalogItem } from "@/lib/groupPostMentions";

const PostMentionSuggestions = dynamic(() => import("@/components/PostMentionSuggestions"), { ssr: false });

/**
 * The group post composer's rich-text box, split out of the group chat page on
 * 2026-10-06 so that TipTap is not downloaded by people who only came to read.
 *
 * The group page shipped 3.3 MB of JavaScript and took 8-12 seconds to open;
 * TipTap and ProseMirror were part of that for every visitor, even though the
 * composer only ever appears inside a modal that most people never open. This
 * component is loaded with next/dynamic, so the editor arrives when someone
 * actually taps to write.
 *
 * The page used to read the text back out of the editor with getHTML() at submit
 * time. It now owns the HTML in state instead and receives it through onChangeHtml,
 * because the editor instance no longer lives up there. `content` is only read
 * when the editor mounts, so the page gives this component a key that changes
 * between "new post" and "editing post N" to load the right starting text.
 */
export default function GroupPostEditor({
  content,
  onChangeHtml,
  mentionItems,
}: {
  content: string;
  onChangeHtml: (html: string) => void;
  mentionItems: MentionCatalogItem[];
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[220px] px-4 py-4 text-gray-800",
      },
    },
    onUpdate: ({ editor: instance }) => onChangeHtml(instance.getHTML()),
  });

  function runPostEditorCommand(command: () => boolean) {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      command();
    };
  }

  const buttonClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-semibold ${
      active ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"
    }`;

  return (
    <>
      <div className="rounded-3xl border border-[#ead8c4] overflow-hidden bg-[#fffaf4]">
        <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-[#efe5d9] bg-[#fffdf9]">
          <button
            type="button"
            onMouseDown={runPostEditorCommand(() => editor?.chain().focus().toggleBold().run() ?? false)}
            className={buttonClass(Boolean(editor?.isActive("bold")))}
          >
            Bold
          </button>
          <button
            type="button"
            onMouseDown={runPostEditorCommand(() => editor?.chain().focus().toggleItalic().run() ?? false)}
            className={buttonClass(Boolean(editor?.isActive("italic")))}
          >
            Italic
          </button>
          <button
            type="button"
            onMouseDown={runPostEditorCommand(() => editor?.chain().focus().toggleHeading({ level: 1 }).run() ?? false)}
            className={buttonClass(Boolean(editor?.isActive("heading", { level: 1 })))}
          >
            H1
          </button>
          <button
            type="button"
            onMouseDown={runPostEditorCommand(() => editor?.chain().focus().toggleHeading({ level: 2 }).run() ?? false)}
            className={buttonClass(Boolean(editor?.isActive("heading", { level: 2 })))}
          >
            H2
          </button>
          <button
            type="button"
            onMouseDown={runPostEditorCommand(() => editor?.chain().focus().toggleBulletList().run() ?? false)}
            className={buttonClass(Boolean(editor?.isActive("bulletList")))}
          >
            List
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
      <PostMentionSuggestions editor={editor} items={mentionItems} />
    </>
  );
}
