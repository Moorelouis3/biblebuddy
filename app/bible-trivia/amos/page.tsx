import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function AmosTriviaBookPage() {
  const book = getTriviaBook("amos");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
