"use client";

import { useEffect, useMemo, useState } from "react";
import {
  filterMentionCatalog,
  getActiveMentionQuery,
  getMentionCategoryLabel,
  insertMentionIntoEditor,
  type MentionCatalogItem,
} from "@/lib/groupPostMentions";

export default function PostMentionSuggestions({
  editor,
  items,
}: {
  editor: any;
  items: MentionCatalogItem[];
}) {
  const [activeMention, setActiveMention] = useState<{ from: number; to: number; query: string } | null>(null);

  useEffect(() => {
    if (!editor) return undefined;

    const syncMention = () => {
      setActiveMention(getActiveMentionQuery(editor));
    };

    syncMention();
    editor.on("update", syncMention);
    editor.on("selectionUpdate", syncMention);

    return () => {
      editor.off("update", syncMention);
      editor.off("selectionUpdate", syncMention);
    };
  }, [editor]);

  const suggestions = useMemo(() => {
    if (!activeMention) return [];
    return filterMentionCatalog(items, activeMention.query, 8);
  }, [activeMention, items]);

  if (!activeMention || suggestions.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#ead8c4] bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-2 border-b border-[#efe5d9] bg-[#fffaf4] text-xs font-semibold text-gray-500">
        Mention something
      </div>
      <div className="max-h-72 overflow-y-auto">
        {suggestions.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => insertMentionIntoEditor(editor, activeMention, item)}
            className="w-full px-4 py-3 text-left hover:bg-[#fffaf4] transition border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-gray-900 truncate">@{item.label}</p>
              <span className="text-[11px] uppercase tracking-wide text-[#8d5d38] flex-shrink-0">
                {getMentionCategoryLabel(item.kind)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
