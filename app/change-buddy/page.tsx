"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChangeBuddyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/settings");
  }, [router]);

  return (
    <main className="min-h-screen bg-[var(--bb-app-bg,#0f172a)] px-4 py-10 text-[var(--bb-text-primary,#ffffff)]">
      <section className="mx-auto max-w-lg rounded-[28px] border border-[var(--bb-card-border,rgba(255,255,255,0.14))] bg-[var(--bb-card,rgba(15,23,42,0.92))] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#4b8cff)]">Bible Buddy</p>
        <h1 className="mt-3 text-2xl font-black">Buddy settings moved</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#cbd5e1)]">
          Buddy selection now lives in Settings. The old diamond shop flow has been retired.
        </p>
        <button
          type="button"
          onClick={() => router.replace("/settings")}
          className="mt-5 w-full rounded-2xl bg-[var(--bb-accent,#4b8cff)] px-4 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)]"
        >
          Open Settings
        </button>
      </section>
    </main>
  );
}
