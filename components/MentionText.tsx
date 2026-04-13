import Link from "next/link";
import { splitTextWithMentions, type MentionCatalogItem } from "@/lib/groupPostMentions";

type InlineSegment =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string };

function splitTextWithInlineLinks(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", text: text.slice(lastIndex, match.index) });
    }
    segments.push({ type: "link", text: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", text: text.slice(lastIndex) });
  }

  return segments;
}

export default function MentionText({
  text,
  items,
  className,
  linkClassName = "font-semibold text-[#8d5d38] underline underline-offset-2",
}: {
  text: string;
  items: MentionCatalogItem[];
  className?: string;
  linkClassName?: string;
}) {
  const segments = splitTextWithMentions(text, items);

  return (
    <span className={className}>
      {segments.map((segment, index) =>
        segment.type === "mention" ? (
          <Link key={`${segment.key}:${index}`} href={segment.href} className={linkClassName}>
            {segment.text}
          </Link>
        ) : (
          <span key={`text:${index}`}>
            {splitTextWithInlineLinks(segment.text).map((inlineSegment, inlineIndex) =>
              inlineSegment.type === "link" ? (
                <Link
                  key={`inline-link:${index}:${inlineIndex}`}
                  href={inlineSegment.href}
                  className={linkClassName}
                >
                  {inlineSegment.text}
                </Link>
              ) : (
                <span key={`inline-text:${index}:${inlineIndex}`}>{inlineSegment.text}</span>
              ),
            )}
          </span>
        ),
      )}
    </span>
  );
}
