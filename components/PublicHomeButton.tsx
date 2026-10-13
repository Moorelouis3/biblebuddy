"use client";

import { useRouter } from "next/navigation";
import { isNativeApp } from "@/lib/nativeApp";
import { homeButtonDestination } from "@/lib/appHome";

type PublicHomeButtonProps = {
  className: string;
};

/**
 * "Home" on the auth pages.
 *
 * On the website that means the marketing landing page, which is the point of
 * it. In the app it must not: this button used to hard-navigate every user to
 * /?landing=1, so tapping Home on the iPhone login screen left the app and
 * opened the advert for the app. See lib/appHome.ts.
 *
 * The native case also uses the router rather than window.location, so it is
 * an in-app transition with history rather than a full page load of the
 * remote site.
 */
export default function PublicHomeButton({ className }: PublicHomeButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        const destination = homeButtonDestination();
        if (isNativeApp()) {
          router.push(destination);
          return;
        }
        window.location.assign(destination);
      }}
      className={className}
    >
      Home
    </button>
  );
}
