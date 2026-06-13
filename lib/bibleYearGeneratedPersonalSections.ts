import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type DeepNotesMap = Record<number, string | undefined>;

type GeneratedPersonalSectionOptions = {
  book: string;
  notes: DeepNotesMap;
  chapters: number[];
  icon: string;
  fallbackPhrases: string[];
};

type ParsedDeepSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  title: string;
  phrases: Array<[string, string]>;
};

const note = (lines: string[]) => lines.join("\n\n");

function titleCase(value: string) {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function stripLeadingIcon(value: string) {
  return value
    .replace(/^[^A-Za-z0-9'"]+/u, "")
    .replace(/\*\*/g, "")
    .trim();
}

function isGenericStudyHeading(value: string) {
  return /^(what this passage shows|what is happening here|why this matters|why this detail matters|beginner connection|watch this pattern|what this shows about people|what this shows about god|final thought|pause and reflect)$/i.test(
    stripLeadingIcon(value),
  );
}

function cleanBody(value: string) {
  return value
    .replace(/^>\s+\*\*\d+\*\*.*$/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/#{1,6}\s+/g, "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 7);
}

function explainPhrase(rawTitle: string, rawBody: string, book: string) {
  const title = stripLeadingIcon(rawTitle);
  const bodyLines = cleanBody(rawBody);
  const firstLine =
    bodyLines.find((line) => !/^[-*]/.test(line)) ||
    `${title} names a detail God included so the reader can understand this part of ${book}.`;

  const lines = [firstLine, ...bodyLines.filter((line) => line !== firstLine).slice(0, 4)];

  if (lines.length < 4) {
    lines.push(
      `${title} helps the reader slow down and understand the exact phrase.`,
      "The phrase is not just extra information.",
      "It helps explain worship, holiness, obedience, mercy, judgment, covenant, or belonging before the LORD.",
    );
  }

  return note(lines.slice(0, 7));
}

function parseDeepSections(book: string, chapter: number, markdown: string): ParsedDeepSection[] {
  const escapedBook = book.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sectionPattern = new RegExp(`## ${escapedBook} ${chapter}:(\\d+)(?:-| to )(\\d+)\\n([\\s\\S]*?)(?=\\n## ${escapedBook} ${chapter}:|\\n# The Big Lesson|\\n# Final Thought|\\n# Pause and Reflect|$)`, "g");
  const sections: ParsedDeepSection[] = [];

  for (const match of markdown.matchAll(sectionPattern)) {
    const startVerse = Number(match[1]);
    const endVerse = Number(match[2]);
    const body = match[3] || "";
    const phrases = [...body.matchAll(/### ([^\n]+)\n+([\s\S]*?)(?=\n### |\n## |$)/g)]
      .map((phraseMatch) => {
        const title = stripLeadingIcon(phraseMatch[1] || "");
        return [`📌 ${titleCase(title)}`, explainPhrase(title, phraseMatch[2] || "", book)] as [string, string];
      })
      .filter(([title]) => !isGenericStudyHeading(title))
      .filter(([title]) => title.replace(/^📌\s*/, "").length > 2);

    sections.push({
      chapter,
      startVerse,
      endVerse,
      title: `${book} ${chapter}:${startVerse}-${endVerse}`,
      phrases,
    });
  }

  return sections;
}

function makeFallbackPhrase(title: string, book: string, chapter: number): [string, string] {
  const cleanTitle = titleCase(stripLeadingIcon(title));
  return [
    `📌 ${cleanTitle}`,
    note([
      `${cleanTitle} gives the reader an important phrase to understand, not just skim past.`,
      `In ${book} ${chapter}, this wording helps explain how God is forming His people in the passage.`,
      "The phrase helps beginners see that the details are not random.",
      "It belongs to the way Scripture teaches worship, holiness, mercy, judgment, covenant, and faithful life before the LORD.",
    ]),
  ];
}

function chunkSection(section: ParsedDeepSection, book: string, icon: string, fallbackPhrases: string[]) {
  const chunks: PersonalLeviticusPhraseSectionInput[] = [];
  let phraseCursor = 0;

  for (let start = section.startVerse; start <= section.endVerse; start += 6) {
    const end = Math.min(section.endVerse, start + 5);
    const chunkPhrases = section.phrases.slice(phraseCursor, phraseCursor + 7);
    phraseCursor += Math.max(4, chunkPhrases.length);

    while (chunkPhrases.length < 4) {
      const fallback = fallbackPhrases[(chunks.length + chunkPhrases.length) % fallbackPhrases.length] || "The LORD Spake Unto Moses";
      chunkPhrases.push(makeFallbackPhrase(fallback, book, section.chapter));
    }

    const chunkTitle = chunkPhrases[0]?.[0]?.replace(/^📌\s*/, "") || section.title;

    chunks.push({
      chapter: section.chapter,
      startVerse: start,
      endVerse: end,
      reference: `${book} ${section.chapter}:${start}-${end}`,
      title: chunkTitle,
      icon,
      phrases: chunkPhrases.slice(0, 7),
    });
  }

  return chunks;
}

export function buildGeneratedPersonalSections({
  book,
  notes,
  chapters,
  icon,
  fallbackPhrases,
}: GeneratedPersonalSectionOptions): PersonalLeviticusPhraseSectionInput[] {
  const sections: PersonalLeviticusPhraseSectionInput[] = [];

  for (const chapter of chapters) {
    const markdown = notes[chapter - 1] || "";
    const parsed = parseDeepSections(book, chapter, markdown);

    for (const section of parsed) {
      sections.push(...chunkSection(section, book, icon, fallbackPhrases));
    }
  }

  return sections;
}
