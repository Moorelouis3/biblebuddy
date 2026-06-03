import { redirect } from "next/navigation";

type ReadingBookPageProps = {
  params: Promise<{ book: string }> | { book: string };
};

export default async function ReadingBookPage({ params }: ReadingBookPageProps) {
  const resolvedParams = await params;
  redirect(`/Bible/${encodeURIComponent(resolvedParams.book)}/1`);
}
