import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function EzekielTriviaBookPage() {
  const book = getTriviaBook("ezekiel");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
