import type { Metadata } from "next";
import ClueRoom from "@/components/clueGame/ClueRoom";

export const metadata: Metadata = { title: "Bible Trivia room | Bible Buddy", robots: { index: false } };

/** A private room. The share link lands here; signing in keeps the destination. */
export default async function ClueRoomPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <ClueRoom code={String(code).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8)} />;
}
