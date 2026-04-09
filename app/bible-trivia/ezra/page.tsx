import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function EzraTriviaBookPage() {
  const book = getTriviaBook("ezra");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
