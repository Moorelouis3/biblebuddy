import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function ColossiansTriviaBookPage() {
  const book = getTriviaBook("colossians");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
