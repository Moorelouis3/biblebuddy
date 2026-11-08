import type { Metadata } from "next";

/**
 * Same rule as app/bible/layout.tsx: the reader is the app, not a web page,
 * so it is not for an index. See that file for why noindex rather than a
 * robots.txt Disallow.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
