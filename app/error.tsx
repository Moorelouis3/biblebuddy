"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { reportCrash, tryAutoReload } from "../lib/crashRecovery";

// Replaces Next's raw "Application error: a client-side exception has
// occurred" screen for any page crash. Stale-deploy crashes reload on their
// own; everything else is reported to the bug tracker automatically.
export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const reloaded = tryAutoReload(error);
    setReloading(reloaded);
    void reportCrash(error, "page", reloaded);
  }, [error]);

  if (reloading) return null;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <p className="text-4xl" aria-hidden="true">
        🛠️
      </p>
      <h1 className="mt-3 text-xl font-black text-[var(--bb-text-primary,#111827)]">Something went wrong on this page</h1>
      <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
        Louis has already been sent the details, so you don&apos;t need to report it. Try again - it usually works on
        the second go.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)]"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          onClick={() => reset()}
          className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-white px-6 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)]"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
