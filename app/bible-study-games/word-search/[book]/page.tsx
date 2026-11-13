import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WordSearchGame from "@/components/wordsearch/WordSearchGame";
import { getWordSearchBook } from "@/lib/wordSearchData";

type Params = { params: Promise<{ book: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { book } = await params;
  const entry = getWordSearchBook(decodeURIComponent(book));
  return { title: entry ? `${entry.book} Word Search | Bible Buddy` : "Bible Word Search | Bible Buddy" };
}

/**
 * One book's puzzle. The slug is the reader's own ("1-samuel"). A slug that
 * is not one of the 66 books is a real 404, not a blank game.
 */
export default async function WordSearchBookPage({ params }: Params) {
  const { book } = await params;
  const entry = getWordSearchBook(decodeURIComponent(book));
  if (!entry) notFound();
  return <WordSearchGame book={entry} />;
}
