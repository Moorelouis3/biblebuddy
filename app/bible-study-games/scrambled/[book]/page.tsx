import { notFound } from "next/navigation";
import ScrambledUpgradeGate from "@/components/ScrambledUpgradeGate";
import ScrambledBookClient from "@/components/ScrambledBookClient";
import { getScrambledBook } from "@/lib/scrambledGameData";

export default async function ScrambledBookPage({ params }: { params: Promise<{ book: string }> }) {
  const { book } = await params;
  const bookPack = getScrambledBook(book);

  if (!bookPack) {
    notFound();
  }

  return (
    <ScrambledUpgradeGate bookSlug={bookPack.slug}>
      <ScrambledBookClient book={bookPack} />
    </ScrambledUpgradeGate>
  );
}
