"use client";

import type { MouseEvent, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { enrichPlainText } from "../lib/bibleHighlighting";

type ChapterNotesMarkdownProps = {
  children: string;
  onDatabaseTermClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onScriptureReferenceClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

const leadingEmojiPattern = /^[\s]*(?:[\p{Extended_Pictographic}\p{Emoji_Presentation}]|\d\uFE0F?\u20E3)/u;
const emojiTokenPattern =
  /(?:\d\uFE0F?\u20E3|[\p{Extended_Pictographic}\p{Emoji_Presentation}](?:\uFE0F|\uFE0E)?(?:\u200D[\p{Extended_Pictographic}\p{Emoji_Presentation}](?:\uFE0F|\uFE0E)?)*)/gu;

function getTextFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextFromNode).join("");
  if (node && typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: ReactNode } };
    return getTextFromNode(element.props?.children);
  }
  return "";
}

function splitInlineEmojiList(line: string): string[] {
  const trimmed = line.trim();
  if (!trimmed || /^[-*]\s+/.test(trimmed) || /^#{1,6}\s+/.test(trimmed)) return [];
  if (/[.!?:;]/.test(trimmed)) return [];

  const matches = Array.from(trimmed.matchAll(emojiTokenPattern));
  if (matches.length < 2) return [];

  const items = matches
    .map((match, index) => {
      const start = match.index ?? 0;
      const end = matches[index + 1]?.index ?? trimmed.length;
      return trimmed.slice(start, end).trim();
    })
    .filter((item) => item.length > 2 && item.length <= 80);

  const coveredText = items.join(" ").replace(/\s+/g, " ").trim();
  const originalText = trimmed.replace(/\s+/g, " ").trim();

  return items.length >= 2 && originalText.startsWith(items[0]) && coveredText.length >= originalText.length - 4
    ? items
    : [];
}

function normalizeEmojiLists(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const output: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const inlineItems = splitInlineEmojiList(lines[index]);
    if (inlineItems.length >= 2) {
      output.push(...inlineItems.map((item) => `- ${item}`));
      continue;
    }

    if (!leadingEmojiPattern.test(lines[index]) || /^[-*]\s+/.test(lines[index].trim())) {
      output.push(lines[index]);
      continue;
    }

    const run: string[] = [];
    let cursor = index;
    while (
      cursor < lines.length &&
      leadingEmojiPattern.test(lines[cursor]) &&
      !/^[-*]\s+/.test(lines[cursor].trim()) &&
      !/^#{1,6}\s+/.test(lines[cursor].trim())
    ) {
      run.push(lines[cursor].trim());
      cursor += 1;
    }

    if (run.length >= 2) {
      output.push(...run.map((item) => `- ${item}`));
      index = cursor - 1;
    } else {
      output.push(lines[index]);
    }
  }

  return output.join("\n");
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHtmlAttribute(text: string) {
  return escapeHtml(text).replace(/`/g, "&#096;");
}

function linkScriptureReferences(text: string) {
  const escaped = escapeHtml(text);

  return escaped.replace(
    /\b((?:[1-3]\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(\d+):(\d+)(?:\s*(?:-|to)\s*(\d+))?\b/g,
    (match) =>
      `<button type="button" class="scripture-ref-link inline font-black text-[var(--bb-accent,#2f7fe8)] underline decoration-[var(--bb-accent,#2f7fe8)]/55 underline-offset-2" data-scripture-ref="${escapeHtmlAttribute(match)}">${match}</button>`,
  );
}

function enrichMarkdownChildren(children: ReactNode, options: { enableTerms: boolean; enableScriptureRefs: boolean }): ReactNode {
  if (!options.enableTerms && !options.enableScriptureRefs) return children;

  if (typeof children === "string") {
    if (!options.enableTerms && options.enableScriptureRefs) {
      return (
        <span
          className="chapter-notes-scripture-ref-text"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: text is escaped before Bible reference buttons are inserted.
          dangerouslySetInnerHTML={{ __html: linkScriptureReferences(children) }}
        />
      );
    }

    return (
      <span
        className="chapter-notes-enriched-text"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Bible notes text is escaped by the highlighter before known database spans are inserted.
        dangerouslySetInnerHTML={{ __html: enrichPlainText(children) }}
      />
    );
  }

  if (Array.isArray(children)) {
    return children.map((child, index) => (
      <span key={index} className="contents">
        {enrichMarkdownChildren(child, options)}
      </span>
    ));
  }

  return children;
}

export default function ChapterNotesMarkdown({ children, onDatabaseTermClick, onScriptureReferenceClick }: ChapterNotesMarkdownProps) {
  const enableTermHighlighting = Boolean(onDatabaseTermClick) && children.length < 8000;
  const childRenderOptions = {
    enableTerms: enableTermHighlighting,
    enableScriptureRefs: Boolean(onScriptureReferenceClick),
  };

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    onScriptureReferenceClick?.(event);
    if (!event.defaultPrevented) {
      onDatabaseTermClick?.(event);
    }
  }

  return (
    <div className="chapter-notes-markdown max-w-none text-gray-800" onClick={handleClick}>
      <style>{`
        .chapter-notes-markdown .bible-highlight {
          color: inherit !important;
          text-decoration-color: color-mix(in srgb, var(--bb-accent, #dc2626) 72%, transparent) !important;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 3px;
        }
        .chapter-notes-markdown .bible-highlight:hover {
          color: var(--bb-accent, #dc2626) !important;
          text-decoration-color: var(--bb-accent, #dc2626) !important;
        }
      `}</style>
      <ReactMarkdown
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="mb-4 mt-7 text-2xl font-black leading-tight tracking-normal text-[var(--bb-text-primary,#111827)] first:mt-0 md:text-3xl" {...props}>
              {enrichMarkdownChildren(children, childRenderOptions)}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="mb-3 mt-8 border-b border-[var(--bb-card-border,#e5e7eb)] pb-2 text-xl font-black leading-tight tracking-normal text-[var(--bb-text-primary,#111827)] md:text-2xl" {...props}>
              {enrichMarkdownChildren(children, childRenderOptions)}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="mb-2 mt-6 text-lg font-extrabold leading-tight text-[var(--bb-text-primary,#111827)] md:text-xl" {...props}>
              {enrichMarkdownChildren(children, childRenderOptions)}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="mb-4 text-[15px] leading-relaxed text-[var(--bb-text-secondary,#374151)] md:text-base" {...props}>
              {enrichMarkdownChildren(children, childRenderOptions)}
            </p>
          ),
          strong: ({ ...props }) => <strong className="font-extrabold text-[var(--bb-text-primary,#111827)]" {...props} />,
          em: ({ ...props }) => <em className="italic text-[var(--bb-text-secondary,#374151)]" {...props} />,
          ul: ({ ...props }) => (
            <ul className="mb-5 ml-0 list-none space-y-1.5 text-[15px] leading-relaxed text-[var(--bb-text-secondary,#374151)] md:text-base" {...props} />
          ),
          li: ({ children, ...props }) => {
            const alreadyStartsWithEmoji = leadingEmojiPattern.test(getTextFromNode(children));

            return (
              <li className="flex gap-2 leading-relaxed" {...props}>
                {alreadyStartsWithEmoji ? null : (
                  <span className="mt-0.5 shrink-0 leading-relaxed" aria-hidden="true">
                    ✨
                  </span>
                )}
                <span className="min-w-0">{enrichMarkdownChildren(children, childRenderOptions)}</span>
              </li>
            );
          },
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-6 rounded-xl border-l-4 border-amber-400 bg-amber-100/75 px-5 py-4 text-gray-950 shadow-sm [&_p]:mb-0 [&_p]:font-medium [&_p]:text-gray-950"
              {...props}
            />
          ),
          img: ({ ...props }) => (
            <img className="my-5 w-full rounded-lg object-cover shadow-sm" {...props} alt={props.alt || "Bible study image"} />
          ),
          hr: ({ ...props }) => <hr className="my-7 border-gray-200" {...props} />,
        }}
      >
        {normalizeEmojiLists(children)}
      </ReactMarkdown>
    </div>
  );
}
