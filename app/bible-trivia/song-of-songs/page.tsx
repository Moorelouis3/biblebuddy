import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function SongOfSongsTriviaBookPage() {
  const book = getTriviaBook("songofsongs");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
