import { getBibleReaderStudySections } from "./bibleReaderStudyNotes";

export type BibleYearDeepStudySection = {
  reference: string;
  title: string;
  icon: string;
  summary: string;
  markdown: string;
};

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

function buildDayOneSections(): BibleYearDeepStudySection[] {
  return [...getBibleReaderStudySections("Genesis", 1), ...getBibleReaderStudySections("Genesis", 2)].map((section) => ({
    reference: section.reference,
    title: section.title,
    icon: section.icon,
    summary: section.summary ?? "",
    markdown: buildSectionMarkdown(section),
  }));
}

export const BIBLE_YEAR_DAY_ONE_STUDY_NOTES_FRAME = {
  intro: {
    eyebrow: "",
    title: "",
    paragraphs: [],
    callout: "",
  },
  closing: {
    title: "",
    paragraphs: [],
    prayerTitle: "",
    prayer: "",
  },
};

export const BIBLE_YEAR_DAY_ONE_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = buildDayOneSections();
