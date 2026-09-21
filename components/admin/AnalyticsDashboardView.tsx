"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { DashboardData, DashboardWindow } from "@/lib/adminDashboard";

/**
 * Owner analytics (rebuilt 2026-09-21 from Louis's desktop + mobile mockups).
 * Only what he actually uses: growth, where people come from, what they do,
 * and whether they come back. The old page lives at /admin/analytics/legacy.
 */

export const WINDOWS: Array<{ key: DashboardWindow; label: string; short: string }> = [
  { key: "today", label: "Today", short: "Today" },
  { key: "yesterday", label: "Yesterday", short: "Yesterday" },
  { key: "7d", label: "Last 7 days", short: "7 days" },
  { key: "30d", label: "Last 30 days", short: "30 days" },
];

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));
const pct = (n: number) => `${Math.round(n * 10) / 10}%`;

function ago(iso?: string) {
  if (!iso) return "";
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.round(mins / 60);
  return `${h}h ago`;
}

// ---------------- small pieces ----------------

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-[#e3e9f2] bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.04)] ${className}`}>
      {children}
    </section>
  );
}

function CardTitle({ icon, children, right }: { icon: string; children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef4ff] text-lg">{icon}</span>
        <h2 className="text-[17px] font-black text-[#0b1633]">{children}</h2>
      </div>
      {right}
    </div>
  );
}

function Change({ value, suffix = "vs previous period", points = false }: { value: number; suffix?: string; points?: boolean }) {
  const up = value >= 0;
  return (
    <p className="mt-1 text-xs font-bold text-[#6b7589]">
      <span className={up ? "text-[#16a34a]" : "text-[#dc2626]"}>
        {up ? "▲" : "▼"} {points ? `${Math.abs(value)} pts` : pct(Math.abs(value))}
      </span>{" "}
      <span className="hidden sm:inline">{suffix}</span>
      <span className="sm:hidden">vs prev.</span>
    </p>
  );
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const w = 120;
  const h = 40;
  const max = Math.max(1, ...values);
  const step = values.length > 1 ? w / (values.length - 1) : w;
  const pts = values.map((v, i) => `${(i * step).toFixed(1)},${(h - 4 - (v / max) * (h - 8)).toFixed(1)}`).join(" ");
  const id = `spark-${color.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-9 w-full shrink-0 sm:h-10 sm:w-28" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function KpiCard({
  icon,
  label,
  value,
  change,
  spark,
  color,
  points,
}: {
  icon: string;
  label: string;
  value: string;
  change: number;
  spark: number[];
  color: string;
  points?: boolean;
}) {
  return (
    <Card className="!p-4 sm:!p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg text-base" style={{ background: `${color}18` }}>
          {icon}
        </span>
        <p className="text-sm font-bold text-[#334155]">{label}</p>
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[28px] font-black leading-none text-[#0b1633] sm:text-[32px]">{value}</p>
          <Change value={change} points={points} />
        </div>
        <Sparkline values={spark} color={color} />
      </div>
    </Card>
  );
}

function Bar({ value, max, color = "#2563eb" }: { value: number; max: number; color?: string }) {
  const width = max ? Math.max(2, (value / max) * 100) : 0;
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#eef2f8]">
      <div className="h-full rounded-full" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}

function LineChart({ points, height = 170 }: { points: Array<{ label: string; value: number }>; height?: number }) {
  const w = 640;
  const h = height;
  const padL = 28;
  const padB = 22;
  const max = Math.max(5, ...points.map((p) => p.value));
  const niceMax = Math.ceil(max / 10) * 10;
  const x = (i: number) => padL + (i * (w - padL - 8)) / Math.max(1, points.length - 1);
  const y = (v: number) => h - padB - (v / niceMax) * (h - padB - 8);
  const line = points.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const ticks = [0, niceMax / 2, niceMax];
  const labelEvery = Math.ceil(points.length / 7);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="New users per day">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={w - 8} y1={y(t)} y2={y(t)} stroke="#edf1f7" />
          <text x={padL - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
            {t}
          </text>
        </g>
      ))}
      <polygon points={`${x(0)},${h - padB} ${line} ${x(points.length - 1)},${h - padB}`} fill="#2563eb" fillOpacity="0.08" />
      <polyline points={line} fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={p.label}>
          <circle cx={x(i)} cy={y(p.value)} r="3" fill="#fff" stroke="#2563eb" strokeWidth="2">
            <title>{`${p.label}: ${p.value}`}</title>
          </circle>
          {i % labelEvery === 0 ? (
            <text x={x(i)} y={h - 6} textAnchor="middle" fontSize="10" fill="#94a3b8">
              {p.label}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

function RetentionChart({ points }: { points: Array<{ day: number; percent: number }> }) {
  const w = 320;
  const h = 130;
  const padL = 30;
  const padB = 20;
  const x = (i: number) => padL + (i * (w - padL - 10)) / Math.max(1, points.length - 1);
  const y = (v: number) => h - padB - (v / 100) * (h - padB - 8);
  const line = points.map((p, i) => `${x(i)},${y(p.percent)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Share of new users active each day after signing up">
      {[0, 50, 100].map((t) => (
        <g key={t}>
          <line x1={padL} x2={w - 10} y1={y(t)} y2={y(t)} stroke="#edf1f7" />
          <text x={padL - 5} y={y(t) + 3} textAnchor="end" fontSize="9" fill="#94a3b8">
            {t}%
          </text>
        </g>
      ))}
      <polygon points={`${x(0)},${h - padB} ${line} ${x(points.length - 1)},${h - padB}`} fill="#2563eb" fillOpacity="0.08" />
      <polyline points={line} fill="none" stroke="#2563eb" strokeWidth="2" />
      {points.map((p, i) => (
        <g key={p.day}>
          <circle cx={x(i)} cy={y(p.percent)} r="2.6" fill="#2563eb">
            <title>{`Day ${p.day}: ${p.percent}%`}</title>
          </circle>
          <text x={x(i)} y={h - 5} textAnchor="middle" fontSize="9" fill="#94a3b8">
            Day {p.day}
          </text>
        </g>
      ))}
    </svg>
  );
}

const SOURCE_ICON: Record<string, string> = {
  Threads: "@",
  Facebook: "f",
  Instagram: "◎",
  Google: "G",
  Pinterest: "P",
  Email: "✉",
  YouTube: "▶",
  "Direct / unknown": "·",
};

/** On a phone the lower panels fold into rows; on desktop they are always open. */
function Section({ summary, children, className = "" }: { summary: ReactNode; children: ReactNode; className?: string }) {
  return (
    <>
      <details className={`group rounded-2xl border border-[#e3e9f2] bg-white shadow-[0_4px_18px_rgba(15,23,42,0.04)] lg:hidden ${className}`}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
          {summary}
          <span className="text-xl text-[#2563eb] transition group-open:rotate-90">›</span>
        </summary>
        <div className="border-t border-[#eef2f8] p-4">{children}</div>
      </details>
      <Card className={`hidden lg:block ${className}`}>{children}</Card>
    </>
  );
}

function SectionSummary({ icon, title, line }: { icon: string; title: string; line: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef4ff] text-lg">{icon}</span>
      <div>
        <p className="text-[16px] font-black text-[#0b1633]">{title}</p>
        <p className="text-xs font-semibold text-[#6b7589]">{line}</p>
      </div>
    </div>
  );
}

export default function AnalyticsDashboardView({
  data: d,
  windowKey,
  onWindow,
  onRefresh,
  loading,
  refreshing,
  error,
}: {
  data: (DashboardData & { snapshotAt?: string }) | null;
  windowKey: DashboardWindow;
  onWindow: (w: DashboardWindow) => void;
  onRefresh: () => void;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
}) {
  const windowLabel = WINDOWS.find((w) => w.key === windowKey)?.label || "";
  return (
    <div className="min-h-screen bg-[#f5f8fc] px-4 pb-28 pt-5 text-[#0b1633] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="flex items-center gap-2 whitespace-nowrap text-[21px] font-black sm:text-[32px]">
                <span className="text-[#2563eb]">📖</span> Bible Buddy <span className="text-[#cbd5e1]">|</span> Analytics
              </h1>
              <p className="mt-1 text-sm font-medium text-[#64748b]">Growth, engagement, and retention at a glance.</p>
            </div>
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              aria-label="Refresh with live numbers"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#dbe3ee] bg-white text-lg lg:hidden"
            >
              <span className={refreshing ? "animate-spin" : ""}>↻</span>
            </button>
          </div>
          <div className="flex flex-col items-stretch gap-1.5 lg:items-end">
            <div className="flex items-center gap-2">
              <div className="grid flex-1 grid-cols-4 rounded-xl border border-[#dbe3ee] bg-white p-1 text-sm font-bold lg:flex-none">
                {WINDOWS.map((w) => (
                  <button
                    key={w.key}
                    type="button"
                    onClick={() => onWindow(w.key)}
                    className={`rounded-lg px-3 py-2 transition ${
                      windowKey === w.key ? "bg-[#2563eb] text-white shadow" : "text-[#334155] hover:bg-[#f1f5fb]"
                    }`}
                  >
                    <span className="lg:hidden">{w.short}</span>
                    <span className="hidden lg:inline">{w.label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                aria-label="Refresh with live numbers"
                className="hidden h-11 w-11 items-center justify-center rounded-xl border border-[#dbe3ee] bg-white text-lg lg:flex"
              >
                <span className={refreshing ? "animate-spin" : ""}>↻</span>
              </button>
            </div>
            <p className="text-xs font-semibold text-[#64748b]">
              Berlin time · {refreshing ? "Refreshing…" : d?.snapshotAt ? `Updated ${ago(d.snapshotAt)}` : ""} ·{" "}
              <Link href="/admin/analytics/legacy" className="underline">
                old page
              </Link>
            </p>
          </div>
        </header>

        {error ? (
          <p className="mt-6 rounded-xl border border-[#fecaca] bg-[#fef2f2] p-4 text-sm font-bold text-[#b91c1c]">{error}</p>
        ) : null}

        {loading && !d ? (
          <p className="mt-10 text-center text-sm font-bold text-[#64748b]">Loading {windowLabel.toLowerCase()}…</p>
        ) : d ? (
          <div className={`mt-6 space-y-5 transition ${loading ? "opacity-50" : ""}`}>
            {/* KPI cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <KpiCard icon="👤" label="New users" value={fmt(d.topCards.newUsers.value)} change={d.topCards.newUsers.change} spark={d.topCards.newUsers.spark} color="#16a34a" />
              <KpiCard icon="👁" label="Visitors" value={fmt(d.topCards.visitors.value)} change={d.topCards.visitors.change} spark={d.topCards.visitors.spark} color="#2563eb" />
              <KpiCard icon="📄" label="Blog views" value={fmt(d.topCards.blogViews.value)} change={d.topCards.blogViews.change} spark={d.topCards.blogViews.spark} color="#7c3aed" />
              <KpiCard icon="%" label="Sign-up rate" value={pct(d.topCards.signupRate.value)} change={d.topCards.signupRate.change} spark={d.topCards.signupRate.spark} color="#e11d48" points />
            </div>

            {/* Over time + funnel */}
            <div className="grid gap-5 lg:grid-cols-[1.9fr_1fr]">
              <Card>
                <CardTitle
                  icon="👥"
                  right={
                    <div className="text-right">
                      <p className="text-[11px] font-bold text-[#64748b]">Total new users, 30 days</p>
                      <p className="text-xl font-black">
                        {fmt(d.newUsersOverTime.total)}{" "}
                        <span className={`text-xs ${d.newUsersOverTime.change >= 0 ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                          {d.newUsersOverTime.change >= 0 ? "▲" : "▼"} {pct(Math.abs(d.newUsersOverTime.change))}
                        </span>
                      </p>
                    </div>
                  }
                >
                  New users over time
                </CardTitle>
                <LineChart
                  points={d.newUsersOverTime.points.map((p) => ({
                    label: new Date(`${p.day}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    value: p.value,
                  }))}
                />
              </Card>

              <Card>
                <CardTitle icon="⏷">Sign-up funnel</CardTitle>
                <div className="space-y-3.5">
                  {d.funnel.map((step, i) => {
                    const top = d.funnel[0].value || 1;
                    const prev = i > 0 ? d.funnel[i - 1].value : 0;
                    return (
                      <div key={step.label}>
                        {i > 0 ? (
                          <p className="mb-1 text-[11px] font-bold text-[#94a3b8]">↓ {prev ? pct((step.value / prev) * 100) : "0%"} of the step above</p>
                        ) : null}
                        <div className="flex items-center justify-between text-sm font-bold">
                          <span>{step.label}</span>
                          <span>
                            {fmt(step.value)} <span className="ml-2 text-xs text-[#64748b]">{pct((step.value / top) * 100)}</span>
                          </span>
                        </div>
                        <div className="mt-1.5">
                          <Bar value={step.value} max={top} color={i === 0 ? "#2563eb" : "#3b82f6"} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {windowKey === "today" || windowKey === "yesterday" ? (
                  <p className="mt-3 text-[11px] font-semibold text-[#94a3b8]">
                    &quot;Returned next day&quot; only counts people whose next day has already happened.
                  </p>
                ) : null}
              </Card>
            </div>

            {/* Study paths / sources / returning */}
            <div className="grid gap-5 lg:grid-cols-3">
              <Card>
                <CardTitle icon="📖">Study paths picked</CardTitle>
                <div className="space-y-3">
                  {d.studyPaths.paths.map((p) => (
                    <div key={p.label} className="grid grid-cols-[1fr_1.1fr_auto_auto] items-center gap-3 text-sm font-bold">
                      <span>{p.label}</span>
                      <Bar value={p.value} max={d.studyPaths.total} />
                      <span className="w-8 text-right">{fmt(p.value)}</span>
                      <span className="w-10 text-right text-xs text-[#64748b]">{pct(d.studyPaths.total ? (p.value / d.studyPaths.total) * 100 : 0)}</span>
                    </div>
                  ))}
                </div>
                {d.studyPaths.devotionals.length ? (
                  <div className="mt-5 border-t border-[#eef2f8] pt-4">
                    <p className="mb-2 text-sm font-black">Devotional breakdown</p>
                    {d.studyPaths.devotionals.map((dv) => (
                      <div key={dv.title} className="flex justify-between py-1 text-sm">
                        <span className="text-[#334155]">{dv.title}</span>
                        <span className="font-bold">{dv.value}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </Card>

              <Section summary={<SectionSummary icon="🔗" title="Traffic sources" line={`Top source: ${d.trafficSources[0]?.source || "—"} (${d.trafficSources[0]?.newUsers ?? 0} new users)`} />}>
                <div className="hidden lg:block">
                  <CardTitle icon="🔗">Traffic sources</CardTitle>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">
                      <th className="pb-2">Source</th>
                      <th className="pb-2 text-right">Visitors</th>
                      <th className="pb-2 text-right">New users</th>
                      <th className="pb-2 text-right">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.trafficSources.map((s) => (
                      <tr key={s.source} className="border-t border-[#f1f4f9]">
                        <td className="py-1.5 font-semibold">
                          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded bg-[#f1f5fb] text-[11px] font-black text-[#475569]">
                            {SOURCE_ICON[s.source] || "·"}
                          </span>
                          {s.source}
                        </td>
                        <td className="py-1.5 text-right">{fmt(s.visitors)}</td>
                        <td className="py-1.5 text-right font-bold">{fmt(s.newUsers)}</td>
                        <td className="py-1.5 text-right text-[#64748b]">{s.rate === null ? "—" : pct(s.rate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 mb-2 text-sm font-black">First page they landed on (new users)</p>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {d.firstLandingPages.map((l) => (
                    <div key={l.page}>
                      <div className="flex justify-between text-xs font-bold">
                        <span>{l.page}</span>
                        <span>{pct(l.percent)}</span>
                      </div>
                      <div className="mt-1">
                        <Bar value={l.percent} max={100} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] font-semibold text-[#94a3b8]">
                  &quot;—&quot; means some of that source&apos;s clicks arrive without saying where they came from, so the rate can&apos;t be worked out.
                </p>
              </Section>

              <Card>
                <CardTitle icon="🔁">Returning people</CardTitle>
                <div className="grid grid-cols-3 divide-x divide-[#eef2f8] text-center">
                  <div className="px-2">
                    <p className="text-xs font-bold text-[#64748b]">Active today</p>
                    <p className="mt-1 text-2xl font-black sm:text-3xl">{fmt(d.returning.activeToday)}</p>
                  </div>
                  <div className="px-2">
                    <p className="text-xs font-bold text-[#64748b]">Next-day return</p>
                    <p className="mt-1 text-2xl font-black sm:text-3xl">{pct(d.returning.nextDayReturn)}</p>
                  </div>
                  <div className="px-2">
                    <p className="text-xs font-bold text-[#64748b]">Active after 7 days</p>
                    <p className="mt-1 text-2xl font-black sm:text-3xl">{pct(d.returning.activeAfter7)}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm font-black">User retention</p>
                <p className="text-[11px] font-semibold text-[#94a3b8]">
                  Share of people who signed up 7 to 37 days ago ({fmt(d.returning.cohortSize)}) who were active each day after signing up.
                </p>
                <RetentionChart points={d.returning.retention} />
              </Card>
            </div>

            {/* Blog / activities / right column */}
            <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr_1fr]">
              <Section summary={<SectionSummary icon="📝" title="Blog performance" line={`${fmt(d.blog.views)} views (${d.blog.change >= 0 ? "+" : "−"}${pct(Math.abs(d.blog.change))})`} />}>
                <div className="hidden lg:block">
                  <CardTitle icon="📝">Blog performance</CardTitle>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-3xl font-black">
                      {fmt(d.blog.views)} <span className="text-sm font-bold text-[#64748b]">views ({windowLabel.toLowerCase()})</span>
                    </p>
                    <Change value={d.blog.change} />
                  </div>
                  <div className="rounded-xl bg-[#eef4ff] px-4 py-2.5">
                    <p className="text-lg font-black text-[#2563eb]">{fmt(d.blog.newUsers)} new users</p>
                    <p className="text-xs font-semibold text-[#475569]">came in through a blog post</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-black">Top posts</p>
                    <ol className="space-y-1.5 text-sm">
                      {d.blog.topPosts.slice(0, 6).map((p, i) => (
                        <li key={p.slug} className="flex justify-between gap-3">
                          <Link href={`/blog/${p.slug}`} className="truncate text-[#334155] hover:text-[#2563eb]">
                            <span className="mr-1.5 text-[#94a3b8]">{i + 1}</span>
                            {p.title}
                          </Link>
                          <span className="shrink-0 font-bold">{fmt(p.views)}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-black">Where blog readers came from</p>
                    <div className="space-y-2">
                      {d.blog.sources.slice(0, 6).map((s) => (
                        <div key={s.source} className="grid grid-cols-[92px_1fr_auto] items-center gap-2 text-xs font-bold">
                          <span className="truncate">{s.source}</span>
                          <Bar value={s.percent} max={100} color="#2563eb" />
                          <span className="w-9 text-right">{pct(s.percent)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-[#f5f8fc] px-4 py-3 text-sm">
                  <span className="text-xs font-bold text-[#64748b]">Promo banners</span>
                  <span className="font-black">{fmt(d.blog.promo.impressions)} views</span>
                  <span className="font-black">{fmt(d.blog.promo.clicks)} clicks</span>
                  <span className="font-black">{pct(d.blog.promo.ctr)} click rate</span>
                </div>
              </Section>

              <Section summary={<SectionSummary icon="⚡" title="Popular activities" line={d.popularActivities[0] ? `${d.popularActivities[0].label}: ${fmt(d.popularActivities[0].value)}` : "Nothing yet"} />}>
                <div className="hidden lg:block">
                  <CardTitle icon="⚡">Popular activities</CardTitle>
                </div>
                <div className="space-y-2.5">
                  {d.popularActivities.map((a) => (
                    <div key={a.label} className="grid grid-cols-[1fr_0.9fr_auto] items-center gap-3 text-sm">
                      <span className="font-semibold text-[#334155]">{a.label}</span>
                      <Bar value={a.value} max={d.popularActivities[0]?.value || 1} />
                      <span className="w-10 text-right font-bold">{fmt(a.value)}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <div className="space-y-5">
                <Section
                  summary={<SectionSummary icon="✉️" title="Email" line={d.email ? `${fmt(d.email.opens)} opens · ${fmt(d.email.clicks)} clicks` : "No email recorded"} />}
                >
                  <div className="hidden lg:block">
                    <CardTitle icon="✉️">Email</CardTitle>
                  </div>
                  {d.email ? (
                    <>
                      <p className="text-xs font-bold text-[#64748b]">Last email · {new Date(d.email.sentAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                      <p className="font-black">&ldquo;{d.email.subject}&rdquo;</p>
                      <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                        {[
                          ["Sent", d.email.sent],
                          ["Opens", d.email.opens],
                          ["Clicks", d.email.clicks],
                          ["New users", d.email.newUsers],
                        ].map(([label, value]) => (
                          <div key={label as string}>
                            <p className="text-[11px] font-bold text-[#64748b]">{label}</p>
                            <p className="text-lg font-black">{fmt(value as number)}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-[#64748b]">No email recorded yet.</p>
                  )}
                </Section>

                <Section summary={<SectionSummary icon="👥" title="Community" line={`${fmt(d.community.proverbsTotal)} in Proverbs · ${fmt(d.community.proverbsJoined)} joined this period`} />}>
                  <div className="hidden lg:block">
                    <CardTitle icon="👥">Community</CardTitle>
                  </div>
                  <p className="text-xs font-black text-[#334155]">Wisdom of Proverbs</p>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-center">
                    {[
                      ["Total joined", d.community.proverbsTotal],
                      ["Joined", d.community.proverbsJoined],
                      ["Started, didn't finish", d.community.incompleteJoins],
                      ["Group posts", d.community.groupPosts],
                    ].map(([label, value]) => (
                      <div key={label as string}>
                        <p className="text-[11px] font-bold leading-tight text-[#64748b]">{label}</p>
                        <p className="mt-1 text-lg font-black">{fmt(value as number)}</p>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section summary={<SectionSummary icon="📚" title="Content progress" line={`${fmt(d.content.published)} / ${fmt(d.content.total)} chapter articles`} />}>
                  <div className="hidden lg:block">
                    <CardTitle icon="📚">Content progress</CardTitle>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#64748b]">Chapter articles published</p>
                      <p className="text-xl font-black">
                        {fmt(d.content.published)} / {fmt(d.content.total)}
                      </p>
                    </div>
                    {d.content.next ? (
                      <div className="text-right">
                        <p className="text-xs font-bold text-[#64748b]">Next</p>
                        <p className="font-black">{d.content.next}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-2">
                    <Bar value={d.content.published} max={d.content.total} color="#16a34a" />
                  </div>
                </Section>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
