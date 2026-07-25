"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ProgressEntry = {
  book: string;
  chapter: number;
  startedAt: string;
  finishedAt: string | null;
  durationMinutes: number | null;
  sections: number;
  cards: number;
  verses: number;
  notes: string;
};

type ProgressLog = {
  goalTotalChapters: number;
  preExistingGoldStandardChapters: number;
  preExistingGoldStandardNote: string;
  entries: ProgressEntry[];
};

function formatTimestamp(iso: string | null) {
  if (!iso) return "in progress";
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(minutes: number | null) {
  if (minutes === null) return "—";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

export default function BibleNotesProgressPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [log, setLog] = useState<ProgressLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkOwner() {
      const { data: userData } = await supabase.auth.getUser();
      setIsOwner(userData.user?.email === "moorelouis3@gmail.com");
      setAuthChecked(true);
    }
    void checkOwner();
  }, []);

  useEffect(() => {
    if (!authChecked || !isOwner) return;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/bible-notes-progress", { cache: "no-store" });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = (await res.json()) as ProgressLog;
        setLog(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [authChecked, isOwner]);

  if (!authChecked) {
    return (
      <div style={{ padding: 40, fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 18 }}>
        Checking access…
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div style={{ padding: 40, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <h1 style={{ fontSize: 28 }}>Not authorized</h1>
        <p style={{ fontSize: 16 }}>This page is private.</p>
      </div>
    );
  }

  const entries = log?.entries ?? [];
  const finished = entries.filter((e) => e.finishedAt !== null);
  const totalDone = (log?.preExistingGoldStandardChapters ?? 0) + finished.length;
  const goal = log?.goalTotalChapters ?? 1189;
  const remaining = goal - totalDone;
  const totalCardsWritten = finished.reduce((sum, e) => sum + e.cards, 0);
  const totalMinutes = finished.reduce((sum, e) => sum + (e.durationMinutes ?? 0), 0);
  const avgMinutesPerChapter = finished.length ? Math.round(totalMinutes / finished.length) : 0;
  const inProgress = entries.find((e) => e.finishedAt === null);
  const pctDone = goal ? Math.round((totalDone / goal) * 1000) / 10 : 0;
  const lastFinished = [...finished].sort((a, b) => (a.finishedAt! < b.finishedAt! ? 1 : -1))[0];

  return (
    <div
      style={{
        padding: "28px 20px 100px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: 820,
        margin: "0 auto",
        color: "#1a1a1a",
      }}
    >
      <h1 style={{ fontSize: 26, marginBottom: 6, fontWeight: 800 }}>📖 Bible Notes Progress</h1>
      <p style={{ color: "#666", marginBottom: 28, fontSize: 15 }}>
        Just look — no need to ask. This updates itself as chapters get finished.
      </p>

      {loading && <p style={{ fontSize: 16 }}>Loading…</p>}
      {error && (
        <p style={{ color: "#c00", fontSize: 16 }}>Something broke: {error}</p>
      )}

      {log && (
        <>
          {/* BIG HEADLINE NUMBER — the one thing to read at a glance */}
          <div
            style={{
              background: "#111",
              color: "#fff",
              borderRadius: 16,
              padding: "28px 24px",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1 }}>
              {totalDone} <span style={{ fontSize: 26, opacity: 0.6, fontWeight: 500 }}>/ {goal}</span>
            </div>
            <div style={{ fontSize: 16, opacity: 0.85, marginTop: 6 }}>chapters done</div>

            <div
              style={{
                marginTop: 18,
                height: 14,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pctDone}%`,
                  background: "linear-gradient(90deg, #4ade80, #22c55e)",
                  borderRadius: 999,
                }}
              />
            </div>
            <div style={{ fontSize: 14, opacity: 0.85, marginTop: 8 }}>
              {pctDone}% complete — {remaining.toLocaleString()} chapters left
            </div>
          </div>

          {inProgress && (
            <div
              style={{
                background: "#fff3cd",
                border: "2px solid #ffcc33",
                borderRadius: 12,
                padding: "14px 18px",
                marginBottom: 20,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              ⏳ Working on {inProgress.book} {inProgress.chapter} right now — started{" "}
              {formatTimestamp(inProgress.startedAt)}
            </div>
          )}

          {!inProgress && lastFinished && (
            <div
              style={{
                background: "#e8f9ee",
                border: "2px solid #4ade80",
                borderRadius: 12,
                padding: "14px 18px",
                marginBottom: 20,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              ✅ Last finished: {lastFinished.book} {lastFinished.chapter} — {formatTimestamp(lastFinished.finishedAt)}
            </div>
          )}

          {/* Quick-scan simple stats, big text, plain labels */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <SimpleStat label="Chapters written today" value={String(finished.length)} />
            <SimpleStat label="Total phrase cards written" value={totalCardsWritten.toLocaleString()} />
            <SimpleStat label="Avg time per chapter" value={formatDuration(avgMinutesPerChapter)} />
          </div>

          <h2 style={{ fontSize: 20, marginBottom: 12, fontWeight: 700 }}>Chapter by chapter</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[...entries].reverse().map((entry) => (
              <div
                key={`${entry.book}-${entry.chapter}`}
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: 12,
                  padding: "14px 16px",
                  background: entry.finishedAt ? "#fff" : "#fffbea",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 6,
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700 }}>
                    {entry.book} {entry.chapter}
                  </div>
                  <div style={{ fontSize: 13, color: "#888" }}>
                    {entry.finishedAt ? formatTimestamp(entry.finishedAt) : "in progress"}
                  </div>
                </div>
                <div style={{ fontSize: 14, color: "#555", marginBottom: 6 }}>
                  {entry.sections} sections · {entry.cards} cards · {entry.verses} verses · took{" "}
                  {formatDuration(entry.durationMinutes)}
                </div>
                <div style={{ fontSize: 13, color: "#777" }}>{entry.notes}</div>
              </div>
            ))}
          </div>

          {log.preExistingGoldStandardNote && (
            <p style={{ marginTop: 28, fontSize: 13, color: "#999" }}>{log.preExistingGoldStandardNote}</p>
          )}
        </>
      )}
    </div>
  );
}

function SimpleStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#f5f5f7",
        borderRadius: 12,
        padding: "16px 14px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 800 }}>{value}</div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{label}</div>
    </div>
  );
}
