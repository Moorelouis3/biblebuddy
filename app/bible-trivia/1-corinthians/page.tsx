import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function FirstCorinthiansTriviaBookPage() {
  const book = getTriviaBook("1corinthians");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
