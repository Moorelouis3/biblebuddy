import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function LeviticusTriviaBookPage() {
  const book = getTriviaBook("leviticus");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
