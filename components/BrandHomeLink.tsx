"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isNativeApp } from "@/lib/nativeApp";
import { homeDestination } from "@/lib/appHome";

/**
 * The Bible Buddy wordmark in an auth page header.
 *
 * It points at "/" because on the website that is right: the marketing page is
 * where someone browsing should land. In the app it was taking Louis out of
 * the app and onto that marketing page - promo video, "Start Studying Now" -
 * from the login screen.
 *
 * The href stays "/" so the server and the client render the same markup, and
 * the app's destination is decided in the click handler, where reading the
 * user agent is safe. See lib/appHome.ts for what the destinations are and
 * why "/" is not one of them inside the app.
 */
export default function BrandHomeLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <Link
      href="/"
      className={className}
      onClick={(event) => {
        if (!isNativeApp()) return;
        event.preventDefault();
        router.push(homeDestination());
      }}
    >
      {children}
    </Link>
  );
}
