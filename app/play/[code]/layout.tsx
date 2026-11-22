import type { Metadata } from "next";
import type { ReactNode } from "react";
import { clueAdmin, roomInvite } from "@/lib/clueGame/server";

/**
 * The link preview for a Bible Clue invite (Louis, 2026-11-22: "don't we need
 * a banner so it shows up on Threads or Facebook or WhatsApp?"). Messaging
 * apps read these tags from the server, so they live here and not in the
 * client page. The picture is public/games/clue/og-invite.jpg (1200x630).
 */
const SITE = "https://www.mybiblebuddy.net";
const IMAGE = `${SITE}/games/clue/og-invite.jpg`;

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  let host = "A friend";
  try {
    const invite = await roomInvite(clueAdmin(), code);
    if (invite.found && invite.hostName) host = invite.hostName;
  } catch {
    // The preview still works without the name.
  }
  const title = `${host} invited you to play Bible Clue`;
  const description = "Follow the clues, guess the Bible person, place or thing. Free on Bible Buddy, up to 4 players.";
  const url = `${SITE}/play/${encodeURIComponent(code)}`;
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, url, siteName: "Bible Buddy", type: "website", images: [{ url: IMAGE, width: 1200, height: 630, alt: "Bible Clue: follow the clues, guess the answer" }] },
    twitter: { card: "summary_large_image", title, description, images: [IMAGE] },
    // The root layout sets these for the site banner; an invite shows its own.
    other: { "og:image:secure_url": IMAGE, "twitter:image:alt": "Bible Clue: follow the clues, guess the answer" },
  };
}

export default function PlayInviteLayout({ children }: { children: ReactNode }) {
  return children;
}
