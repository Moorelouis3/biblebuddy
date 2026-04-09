import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function JoshuaTriviaBookPage() {
  const book = getTriviaBook("joshua");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
