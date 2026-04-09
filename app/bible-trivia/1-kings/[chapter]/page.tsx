import { notFound } from "next/navigation";
import TriviaGamePlayer from "@/components/TriviaGamePlayer";
import { getTriviaBook, getTriviaChapter } from "@/lib/triviaGameData";

export default async function FirstKingsTriviaChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;
  const chapterNumber = Number(chapter);
  const book = getTriviaBook("1kings");
  const chapterPack = getTriviaChapter("1kings", chapterNumber);

  if (!book || !chapterPack || !Number.isInteger(chapterNumber)) {
    notFound();
  }

  return <TriviaGamePlayer bookName={book.name} bookSlug={book.routeSlug} chapter={chapterPack} />;
}
