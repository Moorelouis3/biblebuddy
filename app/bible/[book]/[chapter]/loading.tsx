import ChapterReaderSkeleton from "../../../../components/ChapterReaderSkeleton";

/**
 * Shown from the server while the chapter page's JavaScript is still on its
 * way, so navigating into a chapter no longer lands on a white screen.
 */
export default function ChapterLoading() {
  return <ChapterReaderSkeleton />;
}
