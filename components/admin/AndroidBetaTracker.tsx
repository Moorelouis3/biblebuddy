"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { TESTERS_NEEDED, TESTER_DAYS } from "@/lib/androidBeta";
import type { BetaRun } from "@/lib/androidBetaRun";

/**
 * The running list of Android beta tester counts.
 *
 * Louis, 2026-11-04: "there has to be a way to checl or se if it resrarts or
 * something!!!" and then "we need to have a running list on the app anlytics
 * page where it has the users and all that so i know".
 *
 * There is no way, and that is the point of this. Google requires twelve
 * testers opted in for fourteen consecutive days, shows a single live number
 * on one Play Console screen, hides even that once it passes twelve, and
 * publishes no API for it. No countdown, no start date, no history. So the
 * number is read off that screen and typed in here once a day, and this
 * turns the column of readings into the answer Google will not give.
 *
 * Typed in rather than fetched for that reason alone - if it could be
 * fetched it would be. See lib/androidBetaRun for what the readings mean,
 * including why a day nobody checked is reported as unknown rather than
 * counted as a good day.
 */

const fmtDate = (iso: string | null) =>
  iso ? new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "-";

export default function AndroidBetaTracker() {
  const [run, setRun] = useState<BetaRun | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optedIn, setOptedIn] = useState("");
  const [groupMembers, setGroupMembers] = useState("");

  const call = useCallback(async (init?: RequestInit) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) throw new Error("Not signed in.");
    const res = await fetch("/api/admin/android-beta", {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
    return body.run as BetaRun;
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        setRun(await call());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load the tester history.");
      } finally {
        setLoading(false);
      }
    })();
  }, [call]);

  async function save() {
    if (!optedIn.trim()) return;
    setSaving(true);
    setError(null);
    try {
      setRun(
        await call({
          method: "POST",
          body: JSON.stringify({
            optedIn: Number(optedIn),
            groupMembers: groupMembers.trim() || null,
          }),
        }),
      );
      setOptedIn("");
      setGroupMembers("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save that reading.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="mt-3 text-sm font-semibold text-[#64748b]">Loading tester history...</p>;
  }

  const held = run?.daysHeld ?? 0;
  const pct = Math.min(100, Math.round((held / TESTER_DAYS) * 100));

  return (
    <div className="mt-4 rounded-xl border border-[#cfe0b4] bg-white px-4 py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-black text-[#4d7c0f]">The 14-day run</p>
        <p className="text-xs font-semibold text-[#64748b]">
          Google shows no countdown - this is the record we keep
        </p>
      </div>

      {run?.runStartedOn ? (
        <>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <p className="text-2xl font-black">
              Day {held} <span className="text-base font-bold text-[#64748b]">of {TESTER_DAYS}</span>
            </p>
            <p className="text-sm font-semibold text-[#64748b]">
              started {fmtDate(run.runStartedOn)} ·{" "}
              {run.daysLeft === 0 ? "ready to apply" : `${run.daysLeft} to go`}
              {run.completesOn ? ` · expect ${fmtDate(run.completesOn)}` : ""}
            </p>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e8eef0]">
            <div className="h-full rounded-full bg-[#4d7c0f]" style={{ width: `${pct}%` }} />
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm font-semibold text-[#8c2f2f]">
          Below {TESTERS_NEEDED} opted-in testers, so no run is counting yet.
        </p>
      )}

      {/* The two things that can quietly ruin the fortnight. */}
      {run?.dipped ? (
        <p className="mt-3 rounded-lg bg-[#fdf2f2] px-3 py-2 text-sm font-bold text-[#c62828]">
          It dropped below {TESTERS_NEEDED} earlier. The run above counts from the recovery, and
          Google may well count it from later still.
        </p>
      ) : null}
      {run && run.unchecked > 0 ? (
        <p className="mt-2 rounded-lg bg-[#fff8e6] px-3 py-2 text-sm font-semibold text-[#8a6d1f]">
          {run.unchecked} day{run.unchecked === 1 ? "" : "s"} in this run went unrecorded, so we
          cannot prove it held on those days. Google was still watching.
        </p>
      ) : null}
      {run?.staleToday ? (
        <p className="mt-2 text-xs font-semibold text-[#8a6d1f]">Not checked today yet.</p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-end gap-2">
        <label className="text-xs font-bold text-[#64748b]">
          Opted-in today
          <input
            value={optedIn}
            onChange={(e) => setOptedIn(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            placeholder="12"
            className="mt-1 block w-24 rounded-lg border border-[#d6dee2] px-3 py-2 text-base font-black"
          />
        </label>
        <label className="text-xs font-bold text-[#64748b]">
          In the group <span className="font-semibold">(optional)</span>
          <input
            value={groupMembers}
            onChange={(e) => setGroupMembers(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            placeholder="15"
            className="mt-1 block w-24 rounded-lg border border-[#d6dee2] px-3 py-2 text-base font-black"
          />
        </label>
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving || !optedIn.trim()}
          className="rounded-lg bg-[#07162f] px-4 py-2.5 text-sm font-black text-white disabled:opacity-40"
        >
          {saving ? "Saving..." : "Record"}
        </button>
        <a
          href="https://play.google.com/console/u/0/developers/7337921392900834938/app/4974767716805005449/app-dashboard"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0056FD" }}
          className="px-1 text-sm font-bold underline"
        >
          Where to read it
        </a>
      </div>

      {error ? <p className="mt-2 text-sm font-bold text-[#c62828]">{error}</p> : null}

      {run?.readings.length ? (
        <div className="mt-4 max-h-56 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white text-xs font-bold text-[#64748b]">
              <tr>
                <th className="py-1 text-left">Day</th>
                <th className="py-1 text-right">Opted in</th>
                <th className="py-1 text-right">In group</th>
              </tr>
            </thead>
            <tbody>
              {run.readings.map((r) => (
                <tr key={r.checked_on} className="border-t border-[#eef2f4]">
                  <td className="py-1.5 font-semibold">{fmtDate(r.checked_on)}</td>
                  <td
                    className={`py-1.5 text-right font-black ${
                      r.opted_in >= TESTERS_NEEDED ? "text-[#4d7c0f]" : "text-[#c62828]"
                    }`}
                  >
                    {r.opted_in}
                  </td>
                  <td className="py-1.5 text-right font-semibold text-[#64748b]">
                    {r.group_members ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-3 text-sm font-semibold text-[#64748b]">
          No readings yet. Put today&apos;s number in and the run starts recording.
        </p>
      )}
    </div>
  );
}
