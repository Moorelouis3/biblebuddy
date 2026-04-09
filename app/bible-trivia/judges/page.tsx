import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function JudgesTriviaBookPage() {
  const book = getTriviaBook("judges");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
