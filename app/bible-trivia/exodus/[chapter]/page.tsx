import { notFound } from "next/navigation";
import TriviaGamePlayer from "@/components/TriviaGamePlayer";
import { getTriviaBook, getTriviaChapter } from "@/lib/triviaGameData";

export default async function ExodusTriviaChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;
  const chapterNumber = Number(chapter);
  const book = getTriviaBook("exodus");
  const chapterPack = getTriviaChapter("exodus", chapterNumber);

  if (!book || !chapterPack || !Number.isInteger(chapterNumber)) {
    notFound();
  }

  return <TriviaGamePlayer bookName={book.name} bookSlug={book.routeSlug} chapter={chapterPack} />;
}
