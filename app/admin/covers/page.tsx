"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";

type Candidate = {
  file: string;
  createdAt: string;
  prompt: string;
  quality: string;
  status: "pending" | "approved" | "rejected";
};
type DayRecord = {
  dayNumber: number;
  title: string;
  reference: string;
  candidates: Candidate[];
};
type Payload = {
  generatedAt: string;
  approvedDays: number[];
  days: DayRecord[];
  counts: { pending: number; approved: number };
};

type Filter = "pending" | "approved" | "all";

export default function AdminCoversPage() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("pending");

  const authedFetch = useCallback(async (input: string, init?: RequestInit) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) throw new Error("Sign in as the admin account to review covers.");
    return fetch(input, {
      ...init,
      headers: { ...(init?.headers || {}), Authorization: `Bearer ${token}` },
    });
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authedFetch("/api/admin/covers");
      if (!response.ok) throw new Error((await response.json()).error || "Failed to load.");
      setPayload(await response.json());
    } catch (loadError) {
      setError((loadError as Error).message);
    } finally {
      setLoading(false);
    }
  }, [authedFetch]);

  useEffect(() => {
    void load();
  }, [load]);

  async function act(action: "approve" | "reject", dayNumber: number, file: string) {
    setBusy(file);
    setError(null);
    try {
      const response = await authedFetch("/api/admin/covers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, dayNumber, file }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Action failed.");
      await load();
    } catch (actionError) {
      setError((actionError as Error).message);
    } finally {
      setBusy(null);
    }
  }

  const days = (payload?.days || []).filter((day) => {
    if (filter === "all") return true;
    const approved = day.candidates.some((c) => c.status === "approved");
    return filter === "approved" ? approved : !approved;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-black text-[#1B1B1B]">Bible in One Year — Cover Review</h1>
        <p className="mt-1 text-sm text-[#4A4A4A]">
          Approving a cover copies it to <code>public/dayNcover.png</code> and adds the day to{" "}
          <code>lib/bibleYearApprovedCovers.ts</code>. Commit and push afterwards to ship it.
        </p>
        {payload && (
          <p className="mt-2 text-sm font-semibold text-[#2f7fe8]">
            {payload.counts.approved} approved · {payload.counts.pending} awaiting review
          </p>
        )}
      </header>

      <div className="mb-6 flex gap-2">
        {(["pending", "approved", "all"] as Filter[]).map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold capitalize ${
              filter === value ? "bg-[#2f7fe8] text-white" : "bg-[#EEF2F7] text-[#4A4A4A]"
            }`}
          >
            {value}
          </button>
        ))}
        <button
          onClick={() => void load()}
          className="ml-auto rounded-full bg-[#EEF2F7] px-4 py-1.5 text-sm font-bold text-[#4A4A4A]"
        >
          Refresh
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}
      {loading && <p className="text-sm text-[#4A4A4A]">Loading…</p>}
      {!loading && !days.length && (
        <p className="text-sm text-[#4A4A4A]">
          Nothing here. Generate candidates with{" "}
          <code>npx tsx scripts/generate-bible-year-covers.ts --missing --limit=20</code>
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => (
          <section key={day.dayNumber} className="rounded-2xl border border-[#E3E9F0] p-3">
            <h2 className="text-sm font-black text-[#1B1B1B]">
              Day {day.dayNumber} — {day.title}
            </h2>
            <p className="mb-3 text-xs font-semibold text-[#4A4A4A]">{day.reference}</p>

            <div className="space-y-3">
              {day.candidates.map((candidate) => (
                <div key={candidate.file}>
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-black">
                    <Image
                      src={candidate.file}
                      alt={`Day ${day.dayNumber} cover candidate`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {candidate.status === "approved" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                        ✓ Approved &amp; live
                      </span>
                    ) : candidate.status === "rejected" ? (
                      <span className="rounded-full bg-[#EEF2F7] px-3 py-1 text-xs font-bold text-[#6B7280]">
                        Rejected
                      </span>
                    ) : (
                      <>
                        <button
                          disabled={busy === candidate.file}
                          onClick={() => void act("approve", day.dayNumber, candidate.file)}
                          className="rounded-full bg-green-600 px-4 py-1.5 text-xs font-black text-white disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          disabled={busy === candidate.file}
                          onClick={() => void act("reject", day.dayNumber, candidate.file)}
                          className="rounded-full bg-[#EEF2F7] px-4 py-1.5 text-xs font-bold text-[#4A4A4A] disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
