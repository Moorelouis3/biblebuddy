import { permanentRedirect } from "next/navigation";
import { PLAY_LISTING_URL } from "@/lib/androidBeta";

/**
 * /android was the two-step tester explainer for the closed beta. Bible Buddy
 * is public on Google Play since 2026-11-22, so every link to it (old emails,
 * old posts) now goes straight to the listing. components/AndroidBetaPage.tsx
 * is no longer reached.
 */
export default function Page() {
  permanentRedirect(PLAY_LISTING_URL);
}
