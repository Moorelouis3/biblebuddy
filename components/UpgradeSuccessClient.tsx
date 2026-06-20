"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  returnTo: string;
  sessionId: string;
};

export default function UpgradeSuccessClient({ returnTo, sessionId }: Props) {
  const [status, setStatus] = useState<"loading" | "done" | "error">(() => (sessionId ? "loading" : "done"));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function confirmUpgrade() {
      if (!sessionId) {
        setStatus("done");
        return;
      }

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const token = session?.access_token;
        if (!token) {
          throw new Error("Please sign in again so we can finish unlocking Pro.");
        }

        const response = await fetch("/api/stripe/confirm-upgrade", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId }),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload?.error || "Could not finish unlocking your Pro access.");
        }

        if (!cancelled) {
          setStatus("done");
        }
      } catch (error) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(error instanceof Error ? error.message : "Could not finish unlocking your Pro access.");
        }
      }
    }

    void confirmUpgrade();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const helperText = useMemo(() => {
    if (status === "loading") return "We are finishing your Pro upgrade now.";
    if (status === "error") return errorMessage || "Your payment went through, but we could not finish unlocking the app just yet.";
    return "Your journey is now fully connected.";
  }, [errorMessage, status]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Welcome to BibleBuddy Pro.</h1>
        <p className="mb-6 text-xl text-gray-600">{helperText}</p>
        <p className="mb-4 text-base text-gray-600">
          You now have full access to deeper study tools, notes, and Pro features built to help you keep growing in God&apos;s Word.
        </p>
        {status === "loading" ? (
          <p className="mb-10 text-sm text-gray-500">Unlocking your account...</p>
        ) : status === "error" ? (
          <p className="mb-10 text-sm text-red-500">{errorMessage}</p>
        ) : (
          <p className="mb-10 text-sm text-gray-500">Let&apos;s continue growing in God&apos;s Word.</p>
        )}
        <a
          href={returnTo}
          className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white transition ${
            status === "loading" ? "pointer-events-none bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "loading" ? "Finishing upgrade..." : "Continue"}
        </a>
      </div>
    </div>
  );
}
