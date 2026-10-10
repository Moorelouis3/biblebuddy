"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  ENGAGEMENT_GROUPS,
  GROUP_CADENCE,
  GROUP_LABEL,
  GROUP_RULE,
  GROUP_STYLE,
  type EngagementGroup,
  type EngagementSubscriber,
  type EngagementSummary,
} from "@/lib/email/engagementGroups";

// The campaign list, replacing what Systeme's Newsletters screen did: every
// email, when it goes out, how many it reached, and the open and click rates.
// Nothing sends from this page - arming a campaign hands it to the cron,
// which posts it in rate-limited batches.
//
// The three cards at the top are the engagement groups. Their counts, the
// drill-down behind each card, and the recipient count shown before a send all
// come from the same email_engagement view the sender reads, so the screen
// cannot promise one audience and the sender deliver another.

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
  kind?: string;
  target_groups?: EngagementGroup[];
};

type Payload = {
  campaigns: Campaign[];
  engagement: EngagementSummary | null;
  engagementError: string | null;
  audience: number;
  suppressed: number;
  senderReady: boolean;
  from: string;
};

type Recipients = {
  campaignId: string;
  eligibleNow: number;
  byGroup: Record<string, number>;
  targetGroups: EngagementGroup[];
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

function dayLabel(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function daysAgo(iso: string | null) {
  if (!iso) return null;
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function CampaignsPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, { subject?: string; scheduledFor?: string }>>({});
  const [preview, setPreview] = useState<{
    campaign_id: string;
    subject: string;
    html: string;
    status: string;
    scheduled_for: string | null;
    previewText: string | null;
  } | null>(null);
  const [previewLoading, setPreviewLoading] = useState<string | null>(null);
  const [recipients, setRecipients] = useState<Record<string, Recipients>>({});
  const [groupView, setGroupView] = useState<{
    group: EngagementGroup;
    total: number;
    people: EngagementSubscriber[];
  } | null>(null);
  const [groupLoading, setGroupLoading] = useState<EngagementGroup | null>(null);

  const token = useCallback(
    async () => (await supabase.auth.getSession()).data.session?.access_token || "",
    [],
  );

  const api = useCallback(
    async (query: string) => {
      const response = await fetch(`/api/admin/campaigns${query}`, {
        headers: { authorization: `Bearer ${await token()}` },
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "That did not work.");
      return json;
    },
    [token],
  );

  const load = useCallback(async () => {
    setError(null);
    try {
      setData(await api(""));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load campaigns.");
    }
  }, [api]);

  useEffect(() => {
    void load();
  }, [load]);

  const anyModalOpen = Boolean(preview || groupView);
  useEffect(() => {
    if (!anyModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPreview(null);
      setGroupView(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyModalOpen]);

  async function openPreview(campaignId: string) {
    setPreviewLoading(campaignId);
    setError(null);
    try {
      const json = await api(`?campaignId=${encodeURIComponent(campaignId)}`);
      setPreview(json.campaign);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open that draft.");
    } finally {
      setPreviewLoading(null);
    }
  }

  async function openGroup(group: EngagementGroup) {
    setGroupLoading(group);
    setError(null);
    try {
      const json = await api(`?group=${group}`);
      setGroupView({ group, total: json.total, people: json.people });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open that group.");
    } finally {
      setGroupLoading(null);
    }
  }

  async function loadRecipients(campaignId: string) {
    setBusy(campaignId + "recipients");
    setError(null);
    try {
      const json = (await api(`?recipients=${encodeURIComponent(campaignId)}`)) as Recipients;
      setRecipients((p) => ({ ...p, [campaignId]: json }));
      return json;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not count recipients.");
      return null;
    } finally {
      setBusy(null);
    }
  }

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
            ? `Armed. The cron will send it at its scheduled time, to ${Number(json.eligibleNow).toLocaleString()} people.`
            : op === "targets"
              ? `Saved. ${Number(json.eligibleNow).toLocaleString()} people are eligible right now.`
              : "Saved.",
      );
      // Targeting changes who gets it, so any cached count is now a lie.
      setRecipients((p) => {
        const next = { ...p };
        delete next[campaignId];
        return next;
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "That did not work.");
    } finally {
      setBusy(null);
    }
  }

  /** Arm, but never without showing the number first. */
  async function armWithCount(campaign: Campaign) {
    const counted = recipients[campaign.campaign_id] ?? (await loadRecipients(campaign.campaign_id));
    if (!counted) return;
    const parts = ENGAGEMENT_GROUPS.filter((g) => (counted.byGroup[g] ?? 0) > 0)
      .map((g) => `${(counted.byGroup[g] ?? 0).toLocaleString()} ${GROUP_LABEL[g].toLowerCase()}`)
      .join(", ");
    const ok = window.confirm(
      `Send "${campaign.subject}" to ${counted.eligibleNow.toLocaleString()} people?\n\n` +
        `${parts || "nobody"}\n\n` +
        "Anyone over their weekly limit, unsubscribed or bounced is already excluded.",
    );
    if (!ok) return;
    await act(campaign.campaign_id, "schedule");
  }

  async function toggleGroup(campaign: Campaign, group: EngagementGroup) {
    const current = campaign.target_groups ?? [...ENGAGEMENT_GROUPS];
    const next = current.includes(group) ? current.filter((g) => g !== group) : [...current, group];
    if (!next.length) {
      setError("A campaign has to target at least one group.");
      return;
    }
    await act(campaign.campaign_id, "targets", { targetGroups: next });
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

  const engagement = data.engagement;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-6">
      <h1 className="text-3xl font-black tracking-tight text-slate-950">Email campaigns</h1>
      <p className="mt-1 text-sm text-slate-600">
        Sent from {data.from} to {data.audience.toLocaleString()} subscribers
        {data.suppressed ? ` (${data.suppressed.toLocaleString()} suppressed addresses on record)` : ""}.
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

      {/* The engagement groups. One master list, three frequencies: these are
          subscriber counts, not emails sent, and they add up to the eligible
          total by construction. */}
      <section className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-black text-slate-950">Who is on the list</h2>
          {engagement && (
            <p className="text-xs text-slate-500">
              {engagement.eligible_total.toLocaleString()} can be emailed ·{" "}
              {engagement.suppressed_total.toLocaleString()} unsubscribed or bounced off it · tap a card to see who
            </p>
          )}
        </div>

        {data.engagementError && (
          <p className="mt-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Groups could not be read: {data.engagementError}
          </p>
        )}

        {engagement && (
          <>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {ENGAGEMENT_GROUPS.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => void openGroup(group)}
                  disabled={groupLoading !== null}
                  className={`rounded-2xl border px-4 py-4 text-left transition hover:shadow-md disabled:opacity-60 ${GROUP_STYLE[group]}`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-600">{GROUP_LABEL[group]}</p>
                  <p className="mt-1 text-3xl font-black text-slate-950">
                    {groupLoading === group ? "…" : engagement[group].toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-700">{GROUP_CADENCE[group]}</p>
                  <p className="mt-1 text-xs text-slate-600">{GROUP_RULE[group]}</p>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {engagement.active.toLocaleString()} + {engagement.quiet.toLocaleString()} +{" "}
              {engagement.inactive.toLocaleString()} = {engagement.eligible_total.toLocaleString()} emailable.{" "}
              {engagement.eligible_without_history > 0 && (
                <>
                  {engagement.eligible_without_history.toLocaleString()} of them have no activity on record and are
                  grouped on the date they registered — we never tracked what they did, which is not the same as them
                  ignoring us.
                </>
              )}
            </p>
          </>
        )}
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
      <p className="mt-2 text-xs text-slate-500">
        Open rate counts every fetch of the tracking pixel, and most of those are machines — Gmail&rsquo;s image proxy,
        Apple&rsquo;s privacy pre-fetch, spam scanners. Treat it as a trend, not a number of people. Clicks are the real
        signal, and they are the only email activity that moves anyone between the groups above.
      </p>

      <div className="mt-6 space-y-3">
        {data.campaigns.map((c) => {
          const edit = edits[c.campaign_id] || {};
          const scheduledInput = (edit.scheduledFor ?? (c.scheduled_for ? c.scheduled_for.slice(0, 16) : "")) as string;
          const targets = c.target_groups ?? [...ENGAGEMENT_GROUPS];
          const counted = recipients[c.campaign_id];
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
                <button
                  type="button"
                  onClick={() => void openPreview(c.campaign_id)}
                  disabled={previewLoading !== null}
                  className="rounded-full border border-[#0056fd] px-4 py-2 text-sm font-bold text-[#0056fd] disabled:opacity-50"
                >
                  {previewLoading === c.campaign_id ? "Opening…" : "View draft"}
                </button>
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

              {/* Who this one is allowed to reach. The weekly caps still apply
                  inside each group, so all three selected does not mean
                  everybody - it means everybody under their limit this week. */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Goes to</span>
                {ENGAGEMENT_GROUPS.map((group) => {
                  const on = targets.includes(group);
                  return (
                    <button
                      key={group}
                      type="button"
                      disabled={busy !== null}
                      onClick={() => void toggleGroup(c, group)}
                      className={`rounded-full border px-3 py-1 text-xs font-bold disabled:opacity-50 ${
                        on ? "border-[#0056fd] bg-[#0056fd] text-white" : "border-slate-300 bg-white text-slate-500"
                      }`}
                    >
                      {GROUP_LABEL[group]}
                    </button>
                  );
                })}
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => void loadRecipients(c.campaign_id)}
                  className="rounded-full border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700 disabled:opacity-50"
                >
                  {busy === c.campaign_id + "recipients" ? "Counting…" : "Who gets this?"}
                </button>
                {counted && (
                  <span className="text-xs font-semibold text-slate-700">
                    {counted.eligibleNow.toLocaleString()} eligible now (
                    {ENGAGEMENT_GROUPS.map((g) => `${counted.byGroup[g] ?? 0} ${GROUP_LABEL[g].toLowerCase()}`).join(
                      ", ",
                    )}
                    )
                  </span>
                )}
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
                    onClick={() => void armWithCount(c)}
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

      {groupView && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-3 sm:p-6"
          onClick={() => setGroupView(null)}
        >
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 p-4">
              <div>
                <p className="text-lg font-black text-slate-950">
                  {GROUP_LABEL[groupView.group]} · {groupView.total.toLocaleString()} subscribers
                </p>
                <p className="text-sm text-slate-600">
                  {GROUP_RULE[groupView.group]} · {GROUP_CADENCE[groupView.group]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGroupView(null)}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white"
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-2 font-bold">Subscriber</th>
                    <th className="px-4 py-2 font-bold">Last qualifying activity</th>
                    <th className="px-4 py-2 font-bold">Why they are here</th>
                    <th className="px-4 py-2 font-bold">This week</th>
                  </tr>
                </thead>
                <tbody>
                  {groupView.people.map((person) => (
                    <tr key={person.email} className="border-t border-slate-100 align-top">
                      <td className="px-4 py-2">
                        <p className="font-semibold text-slate-900">{person.first_name || "—"}</p>
                        <p className="text-xs text-slate-500">{person.email}</p>
                      </td>
                      <td className="px-4 py-2">
                        {person.last_qualifying_activity_at ? (
                          <>
                            <p className="text-slate-900">{dayLabel(person.last_qualifying_activity_at)}</p>
                            <p className="text-xs text-slate-500">{daysAgo(person.last_qualifying_activity_at)}</p>
                          </>
                        ) : (
                          <>
                            <p className="text-slate-500">None recorded</p>
                            <p className="text-xs text-slate-500">registered {dayLabel(person.registered_at)}</p>
                          </>
                        )}
                      </td>
                      <td className="px-4 py-2 text-slate-700">
                        {person.group_reason}
                        {person.opens_total > 0 && (
                          <span className="ml-1 text-xs text-slate-400">
                            ({person.opens_total} open{person.opens_total === 1 ? "" : "s"} recorded,{" "}
                            {person.opens_that_look_human} not automated — opens never count towards this)
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-slate-700">
                        {person.marketing_sends_7d} / {person.weekly_cap ?? "no cap"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {groupView.total > groupView.people.length && (
                <p className="px-4 py-3 text-xs text-slate-500">
                  Showing the {groupView.people.length.toLocaleString()} most recently active of{" "}
                  {groupView.total.toLocaleString()}.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-3 sm:p-6"
          onClick={() => setPreview(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 p-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Subject</p>
                <p className="text-lg font-black leading-snug text-slate-950">{preview.subject}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">Preview text</p>
                <p className="text-sm text-slate-700">{preview.previewText || "— none set —"}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${STATUS_STYLE[preview.status] || "bg-slate-100 text-slate-700"}`}>
                  {preview.status}
                </span>
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white"
                >
                  Close
                </button>
              </div>
            </div>
            <p className="px-4 pt-3 text-xs text-slate-500">
              {whenLabel(preview.scheduled_for)} · this is the saved draft, exactly as it would be sent. Opening it
              sends nothing.
            </p>
            {/* Sandboxed: campaign HTML is arbitrary markup and must not be able
                to touch the admin page it is being viewed inside. */}
            <iframe
              title="Email preview"
              sandbox=""
              className="mt-3 h-[65vh] w-full rounded-b-2xl border-0 bg-white"
              srcDoc={`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#1f2937;margin:0;padding:20px;max-width:600px}img{max-width:100%;height:auto}a{color:#0056fd}</style></head><body>${preview.html}</body></html>`}
            />
          </div>
        </div>
      )}
    </main>
  );
}
