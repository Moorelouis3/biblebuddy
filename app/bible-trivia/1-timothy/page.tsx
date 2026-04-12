import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function FirstTimothyTriviaBookPage() {
  const book = getTriviaBook("1timothy");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
