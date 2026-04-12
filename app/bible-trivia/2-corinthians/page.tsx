import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function SecondCorinthiansTriviaBookPage() {
  const book = getTriviaBook("2corinthians");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
