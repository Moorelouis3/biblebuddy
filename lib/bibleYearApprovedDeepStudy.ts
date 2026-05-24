import { BIBLE_YEAR_DAY_ONE_DEEP_STUDY_SECTIONS, type BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

type ApprovedBibleYearChapterLink = {
  dayNumber: number;
  book: string;
  chapter: number;
  sections: BibleYearDeepStudySection[];
};

function normalizeBook(book: string | null | undefined) {
  return String(book || "")
    .trim()
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function sectionBelongsToChapter(section: BibleYearDeepStudySection, book: string, chapter: number) {
  const normalizedBook = normalizeBook(book).replace(/\s+/g, "\\s+");
  const pattern = new RegExp(`^${normalizedBook}\\s+${chapter}:`, "i");
  return pattern.test(section.reference.trim());
}

export const APPROVED_BIBLE_YEAR_CHAPTER_LINKS: ApprovedBibleYearChapterLink[] = [
  {
    dayNumber: 1,
    book: "Genesis",
    chapter: 1,
    sections: BIBLE_YEAR_DAY_ONE_DEEP_STUDY_SECTIONS.filter((section) => sectionBelongsToChapter(section, "Genesis", 1)),
  },
  {
    dayNumber: 1,
    book: "Genesis",
    chapter: 2,
    sections: BIBLE_YEAR_DAY_ONE_DEEP_STUDY_SECTIONS.filter((section) => sectionBelongsToChapter(section, "Genesis", 2)),
  },
];

export function getApprovedBibleYearDeepStudySectionsForChapter(
  book: string | null | undefined,
  chapter: number | null | undefined,
) {
  const chapterNum = Number(chapter);
  if (!Number.isInteger(chapterNum) || chapterNum < 1) return [];

  const normalizedBook = normalizeBook(book);
  return (
    APPROVED_BIBLE_YEAR_CHAPTER_LINKS.find(
      (link) => normalizeBook(link.book) === normalizedBook && link.chapter === chapterNum,
    )?.sections ?? []
  );
}

export function getApprovedBibleYearDeepStudyMarkdownForChapter(book: string | null | undefined, chapter: number | null | undefined) {
  return getApprovedBibleYearDeepStudySectionsForChapter(book, chapter)
    .map((section) => section.markdown)
    .join("\n\n");
}
