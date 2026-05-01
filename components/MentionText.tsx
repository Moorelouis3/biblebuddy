import Link from "next/link";
import { splitTextWithMentions, type MentionCatalogItem } from "@/lib/groupPostMentions";

type InlineSegment =
  | { type: "text"; text: string }
  | { type: "internal-link"; text: string; href: string }
  | { type: "external-link"; text: string; href: string };

function createTextSegment(text: string): InlineSegment {
  return { type: "text", text };
}

function normalizeExternalHref(rawHref: string): string {
  return rawHref.startsWith("www.") ? `https://${rawHref}` : rawHref;
}

function splitTextWithUrlLinks(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const pattern = /(?:https?:\/\/|www\.)[^\s<]+/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const matchedText = match[0];
    const cleanText = matchedText.replace(/[),.!?;:]+$/g, "");
    const trailingText = matchedText.slice(cleanText.length);

    if (match.index > lastIndex) {
      segments.push({ type: "text", text: text.slice(lastIndex, match.index) });
    }

    if (cleanText) {
      segments.push({
        type: "external-link",
        text: cleanText,
        href: normalizeExternalHref(cleanText),
      });
    }

    if (trailingText) {
      segments.push({ type: "text", text: trailingText });
    }

    lastIndex = match.index + matchedText.length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", text: text.slice(lastIndex) });
  }

  return segments;
}

function splitTextWithInlineLinks(text: string, enableUrlLinks = false): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(
        ...(enableUrlLinks
          ? splitTextWithUrlLinks(text.slice(lastIndex, match.index))
          : [createTextSegment(text.slice(lastIndex, match.index))]),
      );
    }
    segments.push({ type: "internal-link", text: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push(
      ...(enableUrlLinks
        ? splitTextWithUrlLinks(text.slice(lastIndex))
        : [createTextSegment(text.slice(lastIndex))]),
    );
  }

  return segments;
}

export default function MentionText({
  text,
  items,
  className,
  linkClassName = "font-semibold text-[#8d5d38] underline underline-offset-2",
  enableUrlLinks = false,
}: {
  text: string;
  items: MentionCatalogItem[];
  className?: string;
  linkClassName?: string;
  enableUrlLinks?: boolean;
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
            {splitTextWithInlineLinks(segment.text, enableUrlLinks).map((inlineSegment, inlineIndex) =>
              inlineSegment.type === "internal-link" ? (
                <Link
                  key={`inline-link:${index}:${inlineIndex}`}
                  href={inlineSegment.href}
                  className={linkClassName}
                >
                  {inlineSegment.text}
                </Link>
              ) : inlineSegment.type === "external-link" ? (
                <a
                  key={`external-link:${index}:${inlineIndex}`}
                  href={inlineSegment.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  {inlineSegment.text}
                </a>
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
