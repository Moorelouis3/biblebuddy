"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AnalyticsPage() {
  const [last24h, setLast24h] = useState(0);
  const [last7d, setLast7d] = useState(0);
  const [last30d, setLast30d] = useState(0);
  const [signups30d, setSignups30d] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [noteCount, setNoteCount] = useState(0);
  const [hasVerificationIssues, setHasVerificationIssues] = useState(false);

  // Admin logs
  const [logs, setLogs] = useState<any[]>([]);
  const [newLog, setNewLog] = useState("");
  const [savingLog, setSavingLog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
    loadLogs();
  }, []);

  async function loadStats() {
    // Fetch analytics from API route
    const res = await fetch("/api/admin/analytics");
    const json = await res.json();

    if (json.error) {
      console.error("Error loading analytics:", json.error);
      return;
    }

    setLast24h(json.logins_last_24h ?? 0);
    setLast7d(json.logins_last_7_days ?? 0);
    setLast30d(json.logins_last_30_days ?? 0);
    setSignups30d(json.signups_last_30_days ?? 0);
    setTotalUsers(json.total_users ?? 0);
    setNoteCount(json.total_notes ?? 0);
    setHasVerificationIssues(json.has_verification_issues ?? false);
  }

  // Load update logs
  async function loadLogs() {
    const { data, error } = await supabase
      .from("admin_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setLogs(data);
  }

  // Submit log
  async function addLog(e?: React.FormEvent) {
    e?.preventDefault();
    if (!newLog.trim() || savingLog) return;

    setSavingLog(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/admin/add-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newLog,
          admin_email: "moorelouis3@gmail.com",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to save log");
      }

      setNewLog("");
      setSavingLog(false);
      setErrorMessage(null);
      loadLogs();
    } catch (error: any) {
      console.error("Error saving log:", error);
      setErrorMessage(error.message || "Failed to save log. Please try again.");
      setSavingLog(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* VERIFICATION ISSUES WARNING */}
      {hasVerificationIssues && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-yellow-800 text-sm font-medium">
            Some generated notes could not be verified as persisted.
          </p>
        </div>
      )}

      {/* STATS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Logins in Last 24 Hours" value={last24h} />
        <StatCard label="Logins in Last 7 Days" value={last7d} />
        <StatCard label="Logins in Last 30 Days" value={last30d} />
        <StatCard label="Signups in Last 30 Days" value={signups30d} />
        <StatCard label="Total Users" value={totalUsers} />
        <StatCard label="Total Notes" value={noteCount} />
      </div>

      {/* UPDATE LOG SECTION */}
      <h2 className="text-2xl font-bold mb-4">Update Log</h2>

      {/* Log List */}
      <div className="space-y-3 mb-6 bg-white p-4 rounded-xl shadow">
        {logs.length === 0 && (
          <p className="text-gray-500 text-sm">No updates yet.</p>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className="border-b border-gray-200 pb-2 last:border-none"
          >
            <p className="text-sm text-gray-900">{log.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(log.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Add New Log */}
      <form onSubmit={addLog}>
        <textarea
          value={newLog}
          onChange={(e) => {
            setNewLog(e.target.value);
            setErrorMessage(null);
          }}
          className="w-full p-3 border rounded-xl mb-3"
          rows={3}
          placeholder="Write what you did today…"
        />

        {errorMessage && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={savingLog || !newLog.trim()}
        >
          {savingLog ? "Saving..." : "Add Log Entry"}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-6">
        Admin view only (moorelouis3@gmail.com)
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
