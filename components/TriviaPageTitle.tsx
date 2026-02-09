"use client";

import { usePathname } from "next/navigation";

const SMALL_WORDS = new Set(["of", "the", "and"]);

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part, index) => {
      if (/^\d+$/.test(part)) {
        return part;
      }
      const lower = part.toLowerCase();
      if (index > 0 && SMALL_WORDS.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

export default function TriviaPageTitle() {
  const pathname = usePathname() ?? "";
  const match = pathname.match(/^\/bible-trivia\/([^/]+)\/?$/);

  if (!match) {
    return null;
  }

  const slug = match[1];
  if (!slug || slug === "books") {
    return null;
  }

  const title = formatTitle(slug);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
    </div>
  );
}
