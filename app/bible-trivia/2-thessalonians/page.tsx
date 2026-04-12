import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function SecondThessaloniansTriviaBookPage() {
  const book = getTriviaBook("2thessalonians");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
