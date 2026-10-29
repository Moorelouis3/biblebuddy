import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isNativeUserAgent } from "@/lib/nativeApp";

/**
 * Bible Buddy TV does not exist inside the store apps (2026-10-29).
 *
 * WHY: App Review rejected the iOS build under Guideline 5.2.3, which covers
 * third-party content. The TV section is a browsable catalogue of films,
 * series and documentaries that belong to other people - The Chosen, National
 * Geographic's Lost Treasures of the Bible and The Story of God, and several
 * feature films - played from YouTube and presented under a "Bible Buddy TV"
 * badge with our own posters and ratings. Embedding somebody's video is fine;
 * shipping a catalogue of their films inside an app is the exact thing 5.2.3
 * prohibits, and the badge makes it look like ours.
 *
 * WHY HERE, SERVER SIDE: the app is a Capacitor shell over this website, so
 * hiding the tab would still leave every /biblebuddy-tv URL reachable from a
 * deep link, a share, or the address bar. A layout redirect means the routes
 * are not merely hidden in the app - they do not resolve, which is what lets
 * us tell App Review the catalogue is not present rather than not linked.
 *
 * The website is untouched. Nothing is deleted. If the catalogue is ever
 * licensed, or rebuilt from Louis's own videos, delete this file.
 */
export default async function BibleBuddyTvLayout({ children }: { children: React.ReactNode }) {
  const userAgent = (await headers()).get("user-agent");
  if (isNativeUserAgent(userAgent)) redirect("/");
  return <>{children}</>;
}
