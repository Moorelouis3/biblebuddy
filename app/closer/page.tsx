"use client";

import { useCallback, useEffect, useState } from "react";

type CloserEvent = {
  id: string;
  platform: string;
  comment_id: string;
  commenter_handle: string | null;
  comment_text: string | null;
  matched_trigger: string | null;
  status: string;
  detail: string | null;
  dry_run: boolean;
  created_at: string;
};

type AdminPayload = {
  events: CloserEvent[];
  counts: { dmsSent: number; fallbacksPosted: number; publicReplies: number; errors: number; skipped: number; total: number };
  config: { dryRun: boolean; hourlyCap: number; triggerWords: string[] };
  missingEnv: string[];
};

const STATUS_STYLE: Record<string, string> = {
  dm_sent: "bg-green-100 text-green-800",
  public_reply_sent: "bg-green-100 text-green-800",
  dm_failed_fallback_posted: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
  processing: "bg-slate-200 text-slate-700",
};

export default function CloserStatusPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<AdminPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (pw: string) => {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/closer/admin", { headers: { "x-closer-password": pw } });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setError(body.error || "Could not load.");
        setAuthed(false);
        return;
      }
      setData((await response.json()) as AdminPayload);
      setAuthed(true);
      try {
        window.sessionStorage.setItem("bb:closer-pw", pw);
      } catch {
        // Not important enough to break on.
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    let saved = "";
    try {
      saved = window.sessionStorage.getItem("bb:closer-pw") || "";
    } catch {
      saved = "";
    }
    if (saved) {
      setPassword(saved);
      void load(saved);
    }
  }, [load]);

  async function toggleDryRun() {
    if (!data) return;
    const goingLive = data.config.dryRun;
    if (goingLive && !window.confirm("Go live? The Closer will start sending real DMs and comment replies.")) return;

    setBusy(true);
    try {
      await fetch("/api/closer/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-closer-password": password },
        body: JSON.stringify({ dryRun: !data.config.dryRun }),
      });
      await load(password);
    } finally {
      setBusy(false);
    }
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
        <h1 className="text-2xl font-black text-slate-900">The Closer</h1>
        <p className="mt-1 text-sm text-slate-600">Enter the admin password.</p>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") void load(password);
          }}
          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-base"
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => void load(password)}
          disabled={busy || !password}
          className="mt-3 w-full rounded-xl bg-[#0056fd] px-4 py-3 text-base font-bold text-white disabled:opacity-50"
        >
          {busy ? "Checking..." : "Open"}
        </button>
        {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-slate-900">The Closer</h1>
        <button
          type="button"
          onClick={() => void load(password)}
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold"
        >
          Refresh
        </button>
      </div>

      <div
        className={`mt-4 rounded-2xl px-4 py-4 ${data?.config.dryRun ? "bg-amber-50 text-amber-900" : "bg-green-50 text-green-900"}`}
      >
        <p className="text-base font-black">{data?.config.dryRun ? "DRY RUN - nothing is being sent" : "LIVE - real messages are going out"}</p>
        <p className="mt-1 text-sm">
          Triggers: {data?.config.triggerWords.join(", ")} · Cap: {data?.config.hourlyCap}/hour
        </p>
        <button
          type="button"
          onClick={() => void toggleDryRun()}
          disabled={busy}
          className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
        >
          {data?.config.dryRun ? "Go live" : "Back to dry run"}
        </button>
      </div>

      {data?.missingEnv.length ? (
        <div className="mt-4 rounded-2xl bg-red-50 px-4 py-4 text-red-900">
          <p className="text-sm font-black">Missing environment variables</p>
          <p className="mt-1 break-words text-sm">{data.missingEnv.join(", ")}</p>
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="DMs sent" value={data?.counts.dmsSent ?? 0} />
        <Stat label="Fallbacks" value={data?.counts.fallbacksPosted ?? 0} />
        <Stat label="Replies" value={data?.counts.publicReplies ?? 0} />
        <Stat label="Errors" value={data?.counts.errors ?? 0} />
      </div>
      <p className="mt-2 text-xs text-slate-500">Today, since midnight. {data?.counts.skipped ?? 0} skipped.</p>

      <h2 className="mt-6 text-lg font-black text-slate-900">Last 100 events</h2>
      <div className="mt-3 space-y-2">
        {(data?.events || []).map((event) => (
          <div key={event.id} className="rounded-2xl border border-slate-200 px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_STYLE[event.status] || "bg-slate-100 text-slate-700"}`}>
                {event.status}
              </span>
              <span className="text-xs font-semibold text-slate-500">{event.platform}</span>
              {event.dry_run ? <span className="text-xs font-semibold text-amber-700">dry run</span> : null}
              <span className="ml-auto text-xs text-slate-400">{new Date(event.created_at).toLocaleString()}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {event.commenter_handle ? `@${event.commenter_handle}` : "unknown"}
              {event.matched_trigger ? ` · ${event.matched_trigger}` : ""}
            </p>
            {event.comment_text ? <p className="mt-1 text-sm text-slate-600">{event.comment_text}</p> : null}
            {event.detail ? <p className="mt-1 break-words text-xs text-slate-500">{event.detail}</p> : null}
          </div>
        ))}
        {data && !data.events.length ? <p className="text-sm text-slate-500">No events yet.</p> : null}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 px-4 py-3">
      <p className="text-2xl font-black text-slate-900">{value}</p>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
}
