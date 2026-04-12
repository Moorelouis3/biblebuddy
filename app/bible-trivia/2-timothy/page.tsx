import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function SecondTimothyTriviaBookPage() {
  const book = getTriviaBook("2timothy");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
