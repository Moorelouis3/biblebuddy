function removeEmoji(input: string) {
  return input.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, " ");
}

function speakBibleReferences(input: string) {
  return input.replace(
    /\b((?:[1-3]\s*)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(\d+):(\d+)(?:\s*(?:-|–|—|to)\s*(\d+))?/g,
    (_match, book: string, chapter: string, firstVerse: string, lastVerse?: string) => {
      const bookName = book.replace(/\s+/g, " ").trim();
      if (lastVerse) return `${bookName} ${chapter} verses ${firstVerse} to ${lastVerse}`;
      return `${bookName} ${chapter} verse ${firstVerse}`;
    },
  );
}

export function cleanTextForTts(input: string) {
  return speakBibleReferences(removeEmoji(input))
    .replace(/<[^>]+>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#*_>`~[\]()]/g, " ")
    .replace(/!\s*/g, ". ")
    .replace(/\s+/g, " ")
    .trim();
}
