import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function JobTriviaBookPage() {
  const book = getTriviaBook("job");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
