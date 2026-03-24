"use client";

import { useMemo, useRef, type KeyboardEvent, type TextareaHTMLAttributes } from "react";
import {
  filterMentionCatalog,
  getActiveMentionQueryFromTextarea,
  getMentionCategoryLabel,
  insertMentionIntoTextarea,
  type MentionCatalogItem,
} from "@/lib/groupPostMentions";

interface TextareaMentionInputProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  mentionItems: MentionCatalogItem[];
  onEnterSubmit?: () => void;
}

/**
 * A plain <textarea> that shows a @-mention suggestion dropdown.
 * Drop-in replacement anywhere we have a reply textarea that needs mention support.
 */
export default function TextareaMentionInput({
  value,
  onChange,
  mentionItems,
  onEnterSubmit,
  className,
  ...rest
}: TextareaMentionInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeMention = useMemo(() => {
    const sel = textareaRef.current?.selectionStart ?? value.length;
    return getActiveMentionQueryFromTextarea(value, sel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const suggestions = useMemo(() => {
    if (!activeMention) return [];
    return filterMentionCatalog(mentionItems, activeMention.query, 8);
  }, [activeMention, mentionItems]);

  function handleSelect(item: MentionCatalogItem) {
    const sel = textareaRef.current?.selectionStart ?? value.length;
    const { newValue, newCursorPos } = insertMentionIntoTextarea(value, sel, item);
    onChange(newValue);
    // Restore cursor after React re-renders
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && onEnterSubmit) {
      if (suggestions.length === 0) {
        e.preventDefault();
        onEnterSubmit();
      }
    }
    rest.onKeyDown?.(e);
  }

  return (
    <div className="flex-1 relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        onKeyDown={handleKeyDown}
        {...rest}
      />
      {suggestions.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-1 rounded-2xl border border-[#ead8c4] bg-white shadow-lg overflow-hidden z-50">
          <div className="px-4 py-2 border-b border-[#efe5d9] bg-[#fffaf4] text-xs font-semibold text-gray-500">
            Mention something
          </div>
          <div className="max-h-52 overflow-y-auto">
            {suggestions.map((item) => (
              <button
                key={item.key}
                type="button"
                onMouseDown={(e) => {
                  // prevent textarea blur before click fires
                  e.preventDefault();
                  handleSelect(item);
                }}
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
      )}
    </div>
  );
}
