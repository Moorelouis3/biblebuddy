import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function NehemiahTriviaBookPage() {
  const book = getTriviaBook("nehemiah");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
