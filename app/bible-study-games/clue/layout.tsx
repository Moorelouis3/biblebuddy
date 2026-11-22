import { redirect } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Bible Clue is off the live site for now (Louis, 2026-11-22: "I really want
 * to focus on Bible Buddy Match first... the new Clue will replace Bible
 * Trivia as an upgrade later"). Every Clue page, rooms and challenges
 * included, goes back to the Games page in production; it still runs on a
 * developer's machine. To bring it back: delete this file and the redirect
 * in app/play/[code]/layout.tsx, and put its card back on the Games page.
 */
export default function ClueLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") redirect("/bible-study-games");
  return children;
}
