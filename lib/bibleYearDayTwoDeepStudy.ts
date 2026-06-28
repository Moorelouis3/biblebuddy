import { getBibleReaderStudySections } from "./bibleReaderStudyNotes";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

function buildSectionMarkdown(section: {
  reference: string;
  title: string;
  categories: Array<{ content: string[] }>;
}) {
  const blocks = section.categories
    .flatMap((category) => category.content)
    .map((content) => content.trim())
    .filter(Boolean);

  return [`## ${section.reference}`, `### ${section.title}`, ...blocks].join("\n\n").trim();
}

function buildDayTwoSections(): BibleYearDeepStudySection[] {
  return [...getBibleReaderStudySections("Genesis", 3), ...getBibleReaderStudySections("Genesis", 4)].map((section) => ({
    reference: section.reference,
    title: section.title,
    icon: section.icon,
    summary: section.summary ?? "",
    markdown: buildSectionMarkdown(section),
  }));
}

export const BIBLE_YEAR_DAY_TWO_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = buildDayTwoSections();
