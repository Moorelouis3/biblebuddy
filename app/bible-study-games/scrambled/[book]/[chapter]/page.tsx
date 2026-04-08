import { notFound } from "next/navigation";
import ScrambledUpgradeGate from "@/components/ScrambledUpgradeGate";
import ScrambledGamePlayer from "@/components/ScrambledGamePlayer";
import { getScrambledBook, getScrambledChapter } from "@/lib/scrambledGameData";

export default async function ScrambledChapterPage({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book, chapter } = await params;
  const chapterNumber = Number(chapter);
  const bookPack = getScrambledBook(book);
  const chapterPack = getScrambledChapter(book, chapterNumber);

  if (!bookPack || !chapterPack || !Number.isInteger(chapterNumber)) {
    notFound();
  }

  return (
    <ScrambledUpgradeGate bookSlug={bookPack.slug}>
      <ScrambledGamePlayer
        bookName={bookPack.name}
        bookSlug={bookPack.slug}
        chapter={chapterPack}
      />
    </ScrambledUpgradeGate>
  );
}
