export type BiblePopupKind = "people" | "places" | "keywords";

function normalizePopupMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractPreferredSection(markdown: string, preferredPatterns: RegExp[]): string {
  const normalized = normalizePopupMarkdown(markdown);
  const sections = normalized.split(/\n(?=# )/).map((section) => section.trim()).filter(Boolean);
  const preferred =
    preferredPatterns.map((pattern) => sections.find((section) => pattern.test(section))).find(Boolean) ||
    sections[0] ||
    normalized;

  return preferred.replace(/^#\s+[^\n]+\n*/i, "").trim();
}

export function extractCompactPopupMeaning(kind: BiblePopupKind, markdown: string): string {
  const body =
    kind === "people"
      ? extractPreferredSection(markdown, [/^# .*who .* is/i, /^# .*what this person/i])
      : kind === "places"
        ? extractPreferredSection(markdown, [/^# .*what this place is/i, /^# .*what this/i])
        : extractPreferredSection(markdown, [/^# .*what this keyword means/i, /^# .*what this/i]);

  if (kind === "people") {
    return `# Who This Person Is\n\n${body}`;
  }

  if (kind === "places") {
    return `# What This Place Is\n\n${body}`;
  }

  return `# What This Keyword Means\n\n${body}`;
}

export function buildQuickPopupFallback(kind: BiblePopupKind, name: string): string {
  if (kind === "people") {
    return `# Who This Person Is\n\n${name} is someone you meet in Scripture, and this short Bible explanation is still being filled in.\n\nFor now, this popup is here so you can keep reading without getting stuck when you tap a highlighted Bible name.`;
  }

  if (kind === "places") {
    return `# What This Place Is\n\n${name} is a Bible place that matters in the story of Scripture, and the fuller explanation is still being filled in.\n\nFor now, this popup gives you a quick anchor so the verse, notes, or devotional keeps making sense as you read.`;
  }

  return `# What This Keyword Means\n\n${name} is an important Bible word or idea, and the fuller explanation is still being filled in.\n\nFor now, this popup gives you a quick meaning so you can keep reading the verse, notes, or devotional without losing the point of the passage.`;
}
