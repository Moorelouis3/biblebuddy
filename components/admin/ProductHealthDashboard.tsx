"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { DashboardWindow } from "@/lib/adminDashboard";
import { EVIDENCE_LABEL, type Evidence, type Metric, type OverviewData, type ProductHealthTab } from "@/lib/productHealth";
import type { TabData } from "@/lib/productHealthTabs";

/**
 * Product Health (Louis, 2026-10-26), built to the approved mockup.
 *
 * The mockup's numbers were illustrative and none of them are in here. Every
 * figure on this page is fetched, and every one carries the evidence state
 * the server gave it, so a blank is always labelled with why it is blank.
 *
 * Access is checked twice on purpose. This component hides itself from
 * anybody who is not Louis, and /api/admin/product-health refuses the request
 * anyway - the client check is a courtesy, the server one is the gate.
 */

const ADMIN_EMAIL = "moorelouis3@gmail.com";

const TABS: { key: ProductHealthTab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "acquisition", label: "Acquisition" },
  { key: "retention", label: "Retention" },
  { key: "devotionals", label: "Devotionals" },
  { key: "community", label: "Community" },
  { key: "releases", label: "Releases" },
  { key: "reports", label: "Reports" },
];

const WINDOWS: { key: DashboardWindow; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
];

const EVIDENCE_STYLE: Record<Evidence, { bg: string; dot: string; text: string }> = {
  live: { bg: "#E8F5EE", dot: "#1F9D55", text: "#15603A" },
  insufficient: { bg: "#EEF2F7", dot: "#64748B", text: "#44526A" },
  missing_tracking: { bg: "#FFF3E2", dot: "#D98324", text: "#8A5312" },
  not_applicable: { bg: "#EEF2F7", dot: "#94A3B8", text: "#64748B" },
  source_unavailable: { bg: "#FDECEC", dot: "#C8372D", text: "#8E241C" },
};

const CARD = "rounded-2xl border border-[#E2E9F2] bg-white shadow-[0_1px_2px_rgba(16,45,77,0.04)]";
const INK = "#0E1A3A";
const MUTED = "#55617A";

export default function ProductHealthDashboard() {
  const [checked, setChecked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [tab, setTab] = useState<ProductHealthTab>("overview");
  const [windowKey, setWindowKey] = useState<DashboardWindow>("30d");
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [tabData, setTabData] = useState<Record<string, TabData>>({});
  const [meta, setMeta] = useState<{ generatedAt?: string; cached?: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      setIsOwner((data.user?.email || "").toLowerCase() === ADMIN_EMAIL);
      setChecked(true);
    });
  }, []);

  const load = useCallback(async (which: ProductHealthTab, win: DashboardWindow, fresh: boolean) => {
    if (which === "reports") {
      setLoading(false);
      return;
    }
    const { data: session } = await supabase.auth.getSession();
    const token = session.session?.access_token;
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/product-health?tab=${which}&window=${win}${fresh ? "&refresh=1" : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
      setMeta({ generatedAt: body.generatedAt, cached: body.cached });
      if (which === "overview") setOverview(body.overview);
      else setTabData((prev) => ({ ...prev, [`${which}:${win}`]: body[which] }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load Product Health.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOwner) void load(tab, windowKey, false);
  }, [isOwner, tab, windowKey, load]);

  if (!checked) return <div className="p-10 text-sm font-bold text-[#64748b]">Checking access…</div>;
  if (!isOwner) return <div className="p-10 text-sm font-bold text-[#64748b]">This page is private.</div>;

  const current = tab === "overview" ? null : tabData[`${tab}:${windowKey}`];

  return (
    <div className="min-h-screen bg-[#F3F7FC] pb-32" style={{ color: INK }}>
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6">
        <Header
          windowKey={windowKey}
          onWindow={setWindowKey}
          onRefresh={() => void load(tab, windowKey, true)}
          meta={meta}
          loading={loading}
        />

        <nav className={`${CARD} mt-5 flex gap-1 overflow-x-auto p-1.5`} aria-label="Product Health sections">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-current={tab === t.key ? "page" : undefined}
              className={`shrink-0 rounded-xl px-4 py-2 text-[13.5px] font-bold transition ${
                tab === t.key ? "bg-[#0056FD] text-white" : "text-[#44526A] hover:bg-[#EEF4FB]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {error ? (
          <div className={`${CARD} mt-5 border-[#F3C9C5] bg-[#FDECEC] p-5`}>
            <p className="text-sm font-black text-[#8E241C]">Could not load this section</p>
            <p className="mt-1 text-[13px] font-semibold text-[#8E241C]">{error}</p>
            <button type="button" onClick={() => void load(tab, windowKey, true)} className="mt-3 rounded-lg bg-[#0056FD] px-4 py-2 text-[13px] font-bold text-white">
              Try again
            </button>
          </div>
        ) : null}

        {loading && !overview && !current ? <Skeleton /> : null}

        {tab === "overview" && overview ? <Overview data={overview} onTab={setTab} /> : null}
        {tab === "reports" ? <Reports /> : null}
        {tab !== "overview" && tab !== "reports" && current ? <DetailTab data={current} /> : null}

        <Footnote />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Header({
  windowKey,
  onWindow,
  onRefresh,
  meta,
  loading,
}: {
  windowKey: DashboardWindow;
  onWindow: (w: DashboardWindow) => void;
  onRefresh: () => void;
  meta: { generatedAt?: string; cached?: boolean } | null;
  loading: boolean;
}) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="flex items-center gap-2.5 text-[26px] font-black tracking-[-0.02em] sm:text-[31px]">
          <span aria-hidden>📖</span>
          <span>Bible Buddy <span className="text-[#8DA0BC]">|</span> Product Health</span>
        </h1>
        <p className="mt-1 text-[14px] font-semibold" style={{ color: MUTED }}>
          Are our systems helping people study, return, and connect?
        </p>
      </div>
      <div className="flex flex-col items-start gap-2 lg:items-end">
        <div className="flex flex-wrap items-center gap-2">
          <div className={`${CARD} flex gap-1 p-1`}>
            {WINDOWS.map((w) => (
              <button
                key={w.key}
                type="button"
                onClick={() => onWindow(w.key)}
                className={`rounded-lg px-3 py-1.5 text-[13px] font-bold transition ${
                  windowKey === w.key ? "bg-[#0056FD] text-white" : "text-[#44526A] hover:bg-[#EEF4FB]"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Refresh"
            className={`${CARD} flex h-[38px] w-[42px] items-center justify-center text-[16px] disabled:opacity-50`}
          >
            <span className={loading ? "inline-block animate-spin" : ""} aria-hidden>↻</span>
          </button>
        </div>
        <p className="text-[12px] font-semibold" style={{ color: MUTED }}>
          Berlin time ·{" "}
          {meta?.generatedAt
            ? `Updated ${new Date(meta.generatedAt).toLocaleString("en-GB", { timeZone: "Europe/Berlin", dateStyle: "medium", timeStyle: "short" })}${meta.cached ? " (cached)" : ""}`
            : "Loading…"}{" "}
          ·{" "}
          <Link href="/admin/analytics" className="underline" style={{ color: "#0056FD" }}>
            Traffic and activity →
          </Link>
        </p>
      </div>
    </header>
  );
}

function Skeleton() {
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={`${CARD} h-[132px] animate-pulse p-5`} />
      ))}
    </div>
  );
}

function EvidencePill({ evidence }: { evidence: Evidence }) {
  const s = EVIDENCE_STYLE[evidence];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold" style={{ background: s.bg, color: s.text }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} aria-hidden />
      {EVIDENCE_LABEL[evidence]}
    </span>
  );
}

function formatValue(m: Metric) {
  if (m.value == null) return "—";
  if (m.unit === "percent") return `${m.value}%`;
  if (m.unit === "minutes") return `${m.value} min`;
  return m.value.toLocaleString("en-GB");
}

function Delta({ m }: { m: Metric }) {
  if (m.value == null || m.previous == null || m.evidence !== "live") return null;
  const diff = Math.round((m.value - m.previous) * 10) / 10;
  if (diff === 0) return <span className="text-[12.5px] font-bold" style={{ color: MUTED }}>level with previous period</span>;
  const up = diff > 0;
  return (
    <span className="text-[12.5px] font-bold" style={{ color: up ? "#1F9D55" : "#C8372D" }}>
      {up ? "▲" : "▼"} {Math.abs(diff)}
      {m.unit === "percent" ? " pts" : ""} <span style={{ color: MUTED }}>vs previous period</span>
    </span>
  );
}

function HeadlineCard({ m }: { m: Metric }) {
  return (
    <article className={`${CARD} p-5`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-black">{m.label}</h3>
        <EvidencePill evidence={m.evidence} />
      </div>
      <p className="mt-2 text-[34px] font-black leading-none tracking-[-0.02em]">{formatValue(m)}</p>
      {m.denominator != null ? (
        <p className="mt-1.5 text-[12.5px] font-semibold" style={{ color: MUTED }}>
          {m.value != null && m.unit === "percent"
            ? `${Math.round((m.value / 100) * m.denominator)} of ${m.denominator.toLocaleString("en-GB")}`
            : `of ${m.denominator.toLocaleString("en-GB")}`}
        </p>
      ) : null}
      <div className="mt-2"><Delta m={m} /></div>
      {m.note ? <p className="mt-2 text-[12px] font-semibold leading-snug" style={{ color: MUTED }}>{m.note}</p> : null}
    </article>
  );
}

/* ------------------------------------------------------------------ */

function Overview({ data, onTab }: { data: OverviewData; onTab: (t: ProductHealthTab) => void }) {
  return (
    <>
      <section className={`${CARD} mt-5 flex items-center gap-5 overflow-hidden p-5 sm:p-6`}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FDECEC] text-[22px]" aria-hidden>📣</div>
        <div className="min-w-0 flex-1">
          <h2 className="text-[19px] font-black leading-tight sm:text-[23px]">{data.banner.title}</h2>
          <p className="mt-1 text-[13.5px] font-semibold" style={{ color: MUTED }}>{data.banner.detail}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/louis-hero.webp" alt="" width={1330} height={1182} className="hidden h-[86px] w-auto shrink-0 object-contain lg:block" />
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.headline.map((m) => <HeadlineCard key={m.label} m={m} />)}
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <section className={`${CARD} p-5`}>
          <h2 className="text-[17px] font-black">Are our systems doing their jobs?</h2>
          <p className="mt-0.5 text-[13px] font-semibold" style={{ color: MUTED }}>Outcome measures, not just traffic.</p>
          <ul className="mt-4 divide-y divide-[#EEF2F7]">
            {data.systems.map((s) => (
              <li key={s.system} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-3">
                <span className="w-[108px] shrink-0 text-[14px] font-black">{s.system}</span>
                <span className="min-w-[150px] flex-1 text-[13px] font-semibold" style={{ color: MUTED }}>
                  {s.measure} · {formatValue(s.metric)}
                  {s.metric.denominator != null ? ` (of ${s.metric.denominator.toLocaleString("en-GB")})` : ""}
                </span>
                <EvidencePill evidence={s.metric.evidence} />
                <button type="button" onClick={() => onTab(s.detailTab as ProductHealthTab)} className="rounded-lg px-2 py-1 text-[13px] font-bold text-[#0056FD] hover:bg-[#EEF4FB]">
                  Details →
                </button>
                {s.metric.note ? <p className="w-full text-[12px] font-semibold leading-snug" style={{ color: MUTED }}>{s.metric.note}</p> : null}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-4">
          <section className={`${CARD} p-5`}>
            <h2 className="text-[17px] font-black">Do people come back?</h2>
            <p className="mt-0.5 text-[13px] font-semibold" style={{ color: MUTED }}>Day 7 study retention by signup week.</p>
            <CohortChart rows={data.retentionByCohort} />
          </section>

          <section className={`${CARD} flex items-center gap-4 p-5`}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FB] text-[20px]" aria-hidden>▶</div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-black">Google Play launch</h3>
              <p className="mt-0.5 text-[12.5px] font-semibold leading-snug" style={{ color: MUTED }}>{data.playStore.detail}</p>
            </div>
            <span className="shrink-0 rounded-full bg-[#FFF3E2] px-3 py-1.5 text-[12px] font-bold text-[#8A5312]">⚠ Blocked</span>
          </section>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className={`${CARD} p-5`}>
          <h2 className="text-[16px] font-black">Most-started devotionals</h2>
          {data.topDevotionals.length ? (
            <ol className="mt-3 space-y-2.5">
              {data.topDevotionals.map((d, i) => (
                <li key={d.title} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FB] text-[12px] font-black">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate text-[13.5px] font-bold">{d.title}</span>
                  <span className="shrink-0 text-[13px] font-bold" style={{ color: MUTED }}>{d.starts} starts</span>
                </li>
              ))}
            </ol>
          ) : (
            <Empty>Nobody started a study in this period.</Empty>
          )}
        </section>

        <section className={`${CARD} p-5`}>
          <h2 className="text-[16px] font-black">Feature adoption</h2>
          <ul className="mt-3 space-y-2.5">
            {data.featureAdoption.map((m) => (
              <li key={m.label}>
                <div className="flex items-center gap-3">
                  <span className="min-w-0 flex-1 truncate text-[13.5px] font-bold">{m.label}</span>
                  <span className="shrink-0 text-[13px] font-bold" style={{ color: MUTED }}>
                    {m.value == null ? EVIDENCE_LABEL[m.evidence] : `${m.value} users`}
                  </span>
                </div>
                {m.note ? <p className="mt-0.5 text-[11.5px] font-semibold leading-snug" style={{ color: MUTED }}>{m.note}</p> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className={`${CARD} p-5`}>
          <h2 className="text-[16px] font-black">This week&rsquo;s focus</h2>
          <ol className="mt-3 space-y-3">
            {data.focus.map((f, i) => (
              <li key={f.title} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FB] text-[12px] font-black">{i + 1}</span>
                <span className="min-w-0">
                  <span className="block text-[13.5px] font-black">{f.title}</span>
                  <span className="mt-0.5 block text-[12px] font-semibold leading-snug" style={{ color: MUTED }}>{f.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}

function CohortChart({ rows }: { rows: OverviewData["retentionByCohort"] }) {
  const max = Math.max(40, ...rows.map((r) => r.rate));
  return (
    <div className="mt-4">
      <div className="flex h-[150px] items-end gap-3">
        {rows.map((r) => (
          <div key={r.label} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-[12px] font-black">{r.eligible ? `${r.rate}%` : "—"}</span>
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${r.eligible ? Math.max((r.rate / max) * 110, 3) : 3}px`,
                background: r.eligible ? "#0056FD" : "#CBD6E6",
              }}
              aria-hidden
            />
            <span className="w-full truncate text-center text-[11px] font-bold" style={{ color: MUTED }}>{r.label.slice(5)}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11.5px] font-semibold leading-snug" style={{ color: MUTED }}>
        {rows.map((r) => `${r.label.slice(5)}: ${r.eligible ? `${r.retained}/${r.cohortSize}` : `${r.cohortSize} signups, not eligible yet`}`).join(" · ")}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function DetailTab({ data }: { data: TabData }) {
  return (
    <div className="mt-5 space-y-4">
      {data.sections.map((s) => (
        <section key={s.title} className={`${CARD} p-5`}>
          <h2 className="text-[17px] font-black">{s.title}</h2>
          {s.caption ? <p className="mt-0.5 text-[13px] font-semibold" style={{ color: MUTED }}>{s.caption}</p> : null}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {s.metrics.map((m) => <HeadlineCard key={m.label} m={m} />)}
          </div>
        </section>
      ))}
      {(data.tables || []).map((t) => (
        <section key={t.title} className={`${CARD} overflow-hidden p-5`}>
          <h2 className="text-[17px] font-black">{t.title}</h2>
          {t.rows.length ? (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr>
                    {t.columns.map((c) => (
                      <th key={c} className="border-b border-[#EEF2F7] pb-2 pr-4 text-[12px] font-black uppercase tracking-wide" style={{ color: MUTED }}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="border-b border-[#F4F7FB] py-2.5 pr-4 text-[13.5px] font-semibold">{cell ?? "—"}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty>Nothing recorded in this period.</Empty>
          )}
          {t.note ? <p className="mt-3 text-[12px] font-semibold leading-snug" style={{ color: MUTED }}>{t.note}</p> : null}
        </section>
      ))}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 rounded-xl bg-[#F7FAFD] px-4 py-6 text-center text-[13px] font-semibold" style={{ color: MUTED }}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */

function Reports() {
  const [busy, setBusy] = useState<string | null>(null);
  const [report, setReport] = useState<{ title: string; markdown: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function generate(period: "weekly" | "monthly") {
    const { data: session } = await supabase.auth.getSession();
    const token = session.session?.access_token;
    if (!token) return;
    setBusy(period);
    setError(null);
    try {
      const res = await fetch(`/api/admin/product-health?report=${period}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
      setReport(body.report);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate the report.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-5 space-y-4">
      <section className={`${CARD} p-5`}>
        <h2 className="text-[17px] font-black">Generate a report</h2>
        <p className="mt-0.5 text-[13px] font-semibold" style={{ color: MUTED }}>
          Built from the same figures as the dashboard, on demand.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => void generate("weekly")} disabled={busy !== null} className="rounded-xl bg-[#0056FD] px-4 py-2.5 text-[13.5px] font-bold text-white disabled:opacity-60">
            {busy === "weekly" ? "Generating…" : "Weekly report"}
          </button>
          <button type="button" onClick={() => void generate("monthly")} disabled={busy !== null} className="rounded-xl border border-[#D8E3F0] bg-white px-4 py-2.5 text-[13.5px] font-bold disabled:opacity-60">
            {busy === "monthly" ? "Generating…" : "Monthly review"}
          </button>
        </div>
        <p className="mt-3 rounded-xl bg-[#FFF3E2] px-4 py-3 text-[12.5px] font-semibold leading-snug text-[#8A5312]">
          These run only when you press the button. Nothing is scheduled and nothing is emailed to anyone. Wiring a
          weekly send would mean adding a cron entry and a destination, which has deliberately not been done.
        </p>
        {error ? <p className="mt-3 text-[13px] font-bold text-[#8E241C]">{error}</p> : null}
      </section>

      {report ? (
        <section className={`${CARD} p-5`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[17px] font-black">{report.title}</h2>
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText(report.markdown).then(() => {
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2000);
                });
              }}
              className="rounded-xl border border-[#D8E3F0] bg-white px-4 py-2 text-[13px] font-bold"
            >
              {copied ? "Copied" : "Copy markdown"}
            </button>
          </div>
          <pre className="mt-4 max-h-[560px] overflow-auto whitespace-pre-wrap rounded-xl bg-[#F7FAFD] p-4 text-[12.5px] font-semibold leading-relaxed" style={{ color: INK }}>
            {report.markdown}
          </pre>
        </section>
      ) : null}
    </div>
  );
}

function Footnote() {
  const [open, setOpen] = useState(false);
  const [defs, setDefs] = useState<{ term: string; meaning: string }[] | null>(null);

  useEffect(() => {
    if (!open || defs) return;
    void import("@/lib/productHealth").then((m) => setDefs(m.DEFINITIONS));
  }, [open, defs]);

  return (
    <section className={`${CARD} mt-4 p-5`}>
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-3 text-left">
        <span className="text-[15px] font-black">How these numbers are defined</span>
        <span className="text-[18px] font-bold" style={{ color: MUTED }} aria-hidden>{open ? "–" : "+"}</span>
      </button>
      {open ? (
        <dl className="mt-4 space-y-3">
          {(defs || []).map((d) => (
            <div key={d.term}>
              <dt className="text-[13.5px] font-black">{d.term}</dt>
              <dd className="mt-0.5 text-[12.5px] font-semibold leading-snug" style={{ color: MUTED }}>{d.meaning}</dd>
            </div>
          ))}
          {!defs ? <p className="text-[13px] font-semibold" style={{ color: MUTED }}>Loading…</p> : null}
        </dl>
      ) : null}
    </section>
  );
}
