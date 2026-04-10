import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function LamentationsTriviaBookPage() {
  const book = getTriviaBook("lamentations");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
