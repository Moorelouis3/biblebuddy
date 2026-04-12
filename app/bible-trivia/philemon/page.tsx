import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function PhilemonTriviaBookPage() {
  const book = getTriviaBook("philemon");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
