import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function HoseaTriviaBookPage() {
  const book = getTriviaBook("hosea");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
