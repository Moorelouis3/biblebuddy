"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// The campaign list, replacing what Systeme's Newsletters screen did: every
// email, when it goes out, how many it reached, and the open and click rates.
// Nothing sends from this page - arming a campaign hands it to the cron,
// which posts it in rate-limited batches.

type Campaign = {
  campaign_id: string;
  subject: string;
  status: string;
  scheduled_for: string | null;
  started_at: string | null;
  completed_at: string | null;
  sent: number;
  failed: number;
  opens: number;
  clicks: number;
  bounces: number;
  complaints: number;
  open_rate: number;
  click_rate: number;
  notes?: string | null;
};

type Payload = {
  campaigns: Campaign[];
  audience: number;
  suppressed: number;
  senderReady: boolean;
  from: string;
};

const STATUS_STYLE: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700",
  sending: "bg-amber-100 text-amber-800",
  paused: "bg-orange-100 text-orange-800",
  done: "bg-emerald-100 text-emerald-800",
};

function whenLabel(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CampaignsPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, { subject?: string; scheduledFor?: string }>>({});

  const token = useCallback(
    async () => (await supabase.auth.getSession()).data.session?.access_token || "",
    [],
  );

  const load = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("/api/admin/campaigns", {
        headers: { authorization: `Bearer ${await token()}` },
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Could not load campaigns.");
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load campaigns.");
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  async function act(campaignId: string, op: string, extra: Record<string, unknown> = {}) {
    setBusy(campaignId + op);
    setNotice(null);
    setError(null);
    try {
      const response = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { authorization: `Bearer ${await token()}`, "content-type": "application/json" },
        body: JSON.stringify({ op, campaignId, ...extra }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "That did not work.");
      setNotice(
        op === "test"
          ? `Test sent to ${json.testedTo}.`
          : op === "schedule"
            ? "Armed. The cron will send it at its scheduled time."
            : "Saved.",
      );
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "That did not work.");
    } finally {
      setBusy(null);
    }
  }

  const totals = useMemo(() => {
    const rows = data?.campaigns || [];
    const sentRows = rows.filter((r) => r.sent > 0);
    const sent = sentRows.reduce((n, r) => n + r.sent, 0);
    const opens = sentRows.reduce((n, r) => n + r.opens, 0);
    const clicks = sentRows.reduce((n, r) => n + r.clicks, 0);
    return {
      queued: rows.filter((r) => r.status === "draft" || r.status === "sending").length,
      sent,
      openRate: sent ? ((100 * opens) / sent).toFixed(1) : "—",
      clickRate: sent ? ((100 * clicks) / sent).toFixed(1) : "—",
    };
  }, [data]);

  if (error && !data) {
    return <main className="mx-auto max-w-3xl p-6 text-red-600">{error}</main>;
  }
  if (!data) {
    return <main className="mx-auto max-w-3xl p-6 text-slate-500">Loading campaigns…</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-6">
      <h1 className="text-3xl font-black tracking-tight text-slate-950">Email campaigns</h1>
      <p className="mt-1 text-sm text-slate-600">
        Sent from {data.from} to {data.audience.toLocaleString()} subscribers
        {data.suppressed ? ` (${data.suppressed.toLocaleString()} unsubscribed or bounced)` : ""}.
      </p>

      {!data.senderReady && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          SES is not configured, so nothing can send.
        </p>
      )}
      {notice && (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{notice}</p>
      )}
      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Queued", String(totals.queued)],
          ["Delivered", totals.sent.toLocaleString()],
          ["Open rate", totals.openRate === "—" ? "—" : `${totals.openRate}%`],
          ["Click rate", totals.clickRate === "—" ? "—" : `${totals.clickRate}%`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {data.campaigns.map((c) => {
          const edit = edits[c.campaign_id] || {};
          const scheduledInput = (edit.scheduledFor ?? (c.scheduled_for ? c.scheduled_for.slice(0, 16) : "")) as string;
          return (
            <section key={c.campaign_id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <input
                  value={edit.subject ?? c.subject}
                  onChange={(e) =>
                    setEdits((p) => ({ ...p, [c.campaign_id]: { ...edit, subject: e.target.value } }))
                  }
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-base font-bold text-slate-950"
                />
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black uppercase ${STATUS_STYLE[c.status] || "bg-slate-100 text-slate-700"}`}
                >
                  {c.status}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                <span>
                  <strong className="text-slate-900">{c.sent.toLocaleString()}</strong> sent
                </span>
                <span>
                  <strong className="text-slate-900">{c.open_rate}%</strong> opens ({c.opens})
                </span>
                <span>
                  <strong className="text-slate-900">{c.click_rate}%</strong> clicks ({c.clicks})
                </span>
                {c.bounces > 0 && <span className="text-orange-700">{c.bounces} bounced</span>}
                {c.complaints > 0 && <span className="text-red-700">{c.complaints} complained</span>}
                {c.failed > 0 && <span className="text-red-700">{c.failed} failed</span>}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Goes out</label>
                <input
                  type="datetime-local"
                  value={scheduledInput}
                  onChange={(e) =>
                    setEdits((p) => ({ ...p, [c.campaign_id]: { ...edit, scheduledFor: e.target.value } }))
                  }
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                />
                <span className="text-sm text-slate-500">{whenLabel(c.scheduled_for)}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() =>
                    act(c.campaign_id, "update", {
                      subject: edit.subject ?? c.subject,
                      scheduledFor: scheduledInput || null,
                    })
                  }
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  type="button"
                  disabled={busy !== null || !data.senderReady}
                  onClick={() => act(c.campaign_id, "test")}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50"
                >
                  Send me a test
                </button>
                {c.status !== "sending" ? (
                  <button
                    type="button"
                    disabled={busy !== null || !data.senderReady}
                    onClick={() => act(c.campaign_id, "schedule")}
                    className="rounded-full bg-[#0056fd] px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                  >
                    Arm for its date
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() => act(c.campaign_id, "pause")}
                    className="rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                  >
                    Pause
                  </button>
                )}
              </div>

              {c.notes && <p className="mt-3 text-xs text-slate-400">{c.notes}</p>}
            </section>
          );
        })}
      </div>
    </main>
  );
}
