export type BiblePopupKind = "people" | "places" | "keywords";

export function normalizePopupMarkdown(markdown: string): string {
  return markdown
    .replace(/^\s*[-\u2022*]\s+/gm, "")
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
  return kind === "people"
    ? extractPreferredSection(markdown, [/^# .*who .* is/i, /^# .*what this person/i])
    : kind === "places"
      ? extractPreferredSection(markdown, [/^# .*what this place is/i, /^# .*what this/i])
      : extractPreferredSection(markdown, [/^# .*what this keyword means/i, /^# .*what this/i]);
}

export function buildQuickPopupFallback(kind: BiblePopupKind, name: string): string {
  if (kind === "people") {
    return `${name} is a real person in the Bible story, and this moment in Scripture helps show who they are and why they matter.\n\nWatch how their life fits into God's bigger story, because even small details about a person can change how a passage reads.`;
  }

  if (kind === "places") {
    return `${name} is a real place in the Bible, and its setting often helps explain what is happening in the passage.\n\nWhere something happens in Scripture can add meaning to the story, the tension, and the message God is giving through it.`;
  }

  return `${name} is an important Bible word or idea, and it helps shape the meaning of the passage you are reading.\n\nPay attention to how it is being used here, because Bible keywords often carry the main point of the verse, note, or devotional.`;
}

export function ensureLouisPopupVoice(kind: BiblePopupKind, name: string, markdown: string): string {
  const normalized = normalizePopupMarkdown(markdown);
  if (!normalized) {
    return buildQuickPopupFallback(kind, name);
  }

  return normalized
    .replace(new RegExp(`^Hey, quick one about ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.\\s*`, "i"), "")
    .replace(new RegExp(`^Hey, here's the quick meaning of ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.\\s*`, "i"), "")
    .replace(/^Hey friend,\s*Little Louis here\s*[—-]\s*/i, "")
    .replace(/^Hey friend,\s*/i, "")
    .replace(/^Little Louis here\s*[—-]\s*/i, "")
    .trim();
}

export function isLegacyPopupNotes(kind: BiblePopupKind, markdown: string): boolean {
  const normalized = normalizePopupMarkdown(markdown);
  if (!normalized) return true;

  const headerMatches = normalized.match(/^# /gm) || [];
  if (headerMatches.length > 1) {
    return true;
  }

  if (
    /still being filled in|quick meaning|quick anchor|keep reading without getting stuck|fuller explanation/i.test(normalized)
  ) {
    return true;
  }

  if (kind === "people") {
    return /their role in the story|key moments|where you find .*|why this person matters/i.test(normalized);
  }

  if (kind === "places") {
    return /what happens at|why is .* significant|connect to jesus|where you find|why this place matters/i.test(normalized);
  }

  return /where it appears|key verses|where you find|why this keyword matters/i.test(normalized);
}

export function buildPopupMeaningPrompt(kind: BiblePopupKind, name: string): string {
  const subject =
    kind === "people"
      ? `the Bible person "${name}"`
      : kind === "places"
        ? `the Bible place "${name}"`
        : `the Bible keyword "${name}"`;

  return `You are Little Louis.

Generate a short Bible explanation for ${subject}.

Return plain markdown with only 3 to 6 warm, beginner friendly sentences in 1 to 3 short paragraphs.

Rules:
- Do not use any heading
- Do not include the name by itself as a title
- Do not add bullet points
- Do not add extra sections
- Do not say the explanation is still being written
- Keep it under 120 words
- Do not write in first person
- Do not mention Little Louis
- Do not greet the reader
- Sound clear, simple, warm, and natural
- Focus on what it means and why it matters in Scripture
- Make it easy to understand, not academic or robotic`;
}
