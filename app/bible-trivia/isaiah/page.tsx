import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function IsaiahTriviaBookPage() {
  const book = getTriviaBook("isaiah");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
