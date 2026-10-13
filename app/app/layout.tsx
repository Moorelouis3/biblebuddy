import type { ReactNode } from "react";
import { Playfair_Display } from "next/font/google";

/**
 * The welcome screen's serif (Louis, 2026-10-13).
 *
 * The rest of the site asks for "Playfair Display" in a plain font-family and
 * nothing ever loads it, so every one of those headings is really Georgia.
 * That is survivable on a web page and not on the first screen of the iPhone
 * app, where the wordmark is the brand. next/font self-hosts the file and
 * emits the @font-face rule, so it arrives with the page instead of after a
 * round trip to Google - which matters inside a WebView on a phone.
 *
 * Scoped to this route rather than the root layout: it is one screen, and
 * loading a display face for all of mybiblebuddy.net is not a change to make
 * in passing.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal"],
  variable: "--font-bb-serif",
  display: "swap",
});

export default function AppEntryLayout({ children }: { children: ReactNode }) {
  // display:contents so this wrapper defines the variable without becoming a
  // box in the layout - the page below it still owns the full viewport.
  return (
    <div className={playfair.variable} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
