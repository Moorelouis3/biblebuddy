import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function ActsTriviaBookPage() {
  const book = getTriviaBook("acts");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
