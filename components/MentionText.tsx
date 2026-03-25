import Link from "next/link";
import { splitTextWithMentions, type MentionCatalogItem } from "@/lib/groupPostMentions";

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
          <span key={`text:${index}`}>{segment.text}</span>
        ),
      )}
    </span>
  );
}
