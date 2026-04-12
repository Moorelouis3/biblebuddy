import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function MicahTriviaBookPage() {
  const book = getTriviaBook("micah");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
