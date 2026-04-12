import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function MatthewTriviaBookPage() {
  const book = getTriviaBook("matthew");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
