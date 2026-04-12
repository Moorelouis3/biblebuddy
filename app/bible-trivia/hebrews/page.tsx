import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function HebrewsTriviaBookPage() {
  const book = getTriviaBook("hebrews");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
