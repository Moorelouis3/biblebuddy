import type { Metadata } from "next";
import AndroidBetaPage from "@/components/AndroidBetaPage";

export const metadata: Metadata = {
  title: "Bible Buddy on Android | Beta testing",
  description:
    "Bible Buddy is in closed beta on Android. Join the testing group, install it from Google Play, and keep it for 14 days to help us launch publicly.",
  // Not a page to rank - it is a step in a flow, it will be retired the day
  // the beta ends, and an indexed copy would outlive the links on it.
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AndroidBetaPage />;
}
