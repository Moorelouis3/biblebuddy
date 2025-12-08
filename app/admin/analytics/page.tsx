"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AnalyticsPage() {
  const [onlineNow, setOnlineNow] = useState(0);
  const [last24h, setLast24h] = useState(0);
  const [last7d, setLast7d] = useState(0);
  const [last30d, setLast30d] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [noteCount, setNoteCount] = useState(0);

  // Admin logs
  const [logs, setLogs] = useState<any[]>([]);
  const [newLog, setNewLog] = useState("");
  const [savingLog, setSavingLog] = useState(false);

  useEffect(() => {
    loadStats();
    loadLogs();
  }, []);

  async function loadStats() {
    // Fetch users from API route
    const res = await fetch("/admin/list-users");
    const json = await res.json();

    if (!json.users) return;

    const users = json.users;

    function getCreatedAt(user: any) {
      if (user.created_at) return new Date(user.created_at);
      if (user.identities?.length > 0)
        return new Date(user.identities[0].created_at);
      return new Date(0);
    }

    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    setTotalUsers(users.length);
    setLast24h(users.filter((u: any) => getCreatedAt(u) > dayAgo).length);
    setLast7d(users.filter((u: any) => getCreatedAt(u) > weekAgo).length);
    setLast30d(users.filter((u: any) => getCreatedAt(u) > monthAgo).length);

    const { count: notesCount } = await supabase
      .from("notes")
      .select("*", { count: "exact", head: true });

    setNoteCount(notesCount ?? 0);
    setOnlineNow(1);
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
  async function addLog() {
    if (!newLog.trim() || savingLog) return;

    setSavingLog(true);

    await supabase.from("admin_logs").insert({
      message: newLog,
      admin_email: "moorelouis3@gmail.com",
    });

    setNewLog("");
    setSavingLog(false);
    loadLogs();
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Online Now" value={onlineNow} />
        <StatCard label="Last 24 Hours" value={last24h} />
        <StatCard label="Last 7 Days" value={last7d} />
        <StatCard label="Last 30 Days" value={last30d} />
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
      <textarea
        value={newLog}
        onChange={(e) => setNewLog(e.target.value)}
        className="w-full p-3 border rounded-xl mb-3"
        rows={3}
        placeholder="Write what you did today…"
      />

      <button
        onClick={addLog}
        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        disabled={savingLog}
      >
        {savingLog ? "Saving..." : "Add Log Entry"}
      </button>

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
